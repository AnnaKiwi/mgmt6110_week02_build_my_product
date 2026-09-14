// api/hdb.js
// Vercel Serverless Function: Singapore HDB Resale Data Aggregator (Monthly Market Intelligence View)

const DATA_GOV_ENDPOINT = 'https://data.gov.sg/api/action/datastore_search';
const RESOURCE_ID = 'd_8b84c4ee58e3cfc0ece0d773c8ca6abc';
const SQM_TO_SQFT = 10.7639;

function sendJson(res, statusCode, data, headers = {}) {
  res.statusCode = statusCode;
  for (const [key, val] of Object.entries(headers)) {
    res.setHeader(key, val);
  }
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(statusCode).json(data);
    return;
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  // Support optional query param: `town=`
  let townQuery = '';
  try {
    const url = new URL(req.url || '', 'http://localhost');
    townQuery = (req.query?.town || url.searchParams.get('town') || '').trim();
  } catch {
    townQuery = '';
  }

  // Step 1: Detect latest available month (DO NOT use q= free-text search)
  let latestMonthRes;
  try {
    latestMonthRes = await fetch(
      `${DATA_GOV_ENDPOINT}?resource_id=${RESOURCE_ID}&sort=month%20desc&limit=1`
    );
  } catch (err) {
    return sendJson(res, 502, {
      success: false,
      errorType: 'unreachable',
      error: 'Market data source cannot be reached at this moment. Please try again.',
      detail: err.message,
    });
  }

  if (!latestMonthRes.ok) {
    return sendJson(res, latestMonthRes.status, {
      success: false,
      errorType: 'rejected',
      error: 'External data service rejected request, please retry later.',
      status: latestMonthRes.status,
    });
  }

  let latestMonthData;
  try {
    latestMonthData = await latestMonthRes.json();
  } catch {
    return sendJson(res, 502, {
      success: false,
      errorType: 'unreachable',
      error: 'Market data source cannot be reached at this moment. Please try again.',
    });
  }

  const latestRecord = latestMonthData?.result?.records?.[0];
  const latestMonth = latestRecord?.month;

  if (!latestMonth) {
    return sendJson(res, 404, {
      success: false,
      errorType: 'empty',
      error: 'No matching HDB resale records found. Try selecting a different town or month.',
    });
  }

  // Step 2: Fetch full records of that month with limit=10000 using explicit filters
  const explicitFilters = { month: latestMonth };
  const monthDataUrl = `${DATA_GOV_ENDPOINT}?resource_id=${RESOURCE_ID}&limit=10000&filters=${encodeURIComponent(
    JSON.stringify(explicitFilters)
  )}`;

  let monthRes;
  try {
    monthRes = await fetch(monthDataUrl);
  } catch (err) {
    return sendJson(res, 502, {
      success: false,
      errorType: 'unreachable',
      error: 'Market data source cannot be reached at this moment. Please try again.',
      detail: err.message,
    });
  }

  if (!monthRes.ok) {
    return sendJson(res, monthRes.status, {
      success: false,
      errorType: 'rejected',
      error: 'External data service rejected request, please retry later.',
      status: monthRes.status,
    });
  }

  let monthPayload;
  try {
    monthPayload = await monthRes.json();
  } catch {
    return sendJson(res, 502, {
      success: false,
      errorType: 'unreachable',
      error: 'Market data source cannot be reached at this moment. Please try again.',
    });
  }

  const rawRecords = monthPayload?.result?.records || [];

  if (rawRecords.length === 0) {
    return sendJson(
      res,
      200,
      {
        success: true,
        month: latestMonth,
        totalUnits: 0,
        totalValue: 0,
        avgPsf: 0,
        mostActiveTown: 'N/A',
        townRanking: [],
        regionalSummaries: [],
        records: [],
        filterTown: townQuery || null,
        filteredCount: 0,
        filteredTotalValue: 0,
      },
      {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=7200',
      }
    );
  }

  // Step 3: Convert string-typed numeric fields (resale_price, floor_area_sqm) to Number() immediately
  const parsedRecords = rawRecords.map((r, idx) => {
    const resale_price = Number(r.resale_price) || 0;
    const floor_area_sqm = Number(r.floor_area_sqm) || 0;
    const floor_area_sqft = floor_area_sqm * SQM_TO_SQFT;
    const psf = floor_area_sqft > 0 ? Math.round(resale_price / floor_area_sqft) : 0;

    return {
      id: r._id || idx + 1,
      month: r.month,
      town: r.town,
      flat_type: r.flat_type,
      block: r.block,
      street_name: r.street_name,
      floor_area_sqm,
      resale_price,
      psf,
    };
  });

  // Step 4: Derive computed monthly metrics across FULL month of records
  const totalUnits = parsedRecords.length;
  const totalValue = parsedRecords.reduce((sum, r) => sum + r.resale_price, 0);
  const totalSqft = parsedRecords.reduce(
    (sum, r) => sum + r.floor_area_sqm * SQM_TO_SQFT,
    0
  );
  const avgPsf = totalSqft > 0 ? Math.round(totalValue / totalSqft) : 0;

  // Town-level aggregation computed from the full month
  const townMap = {};
  for (const r of parsedRecords) {
    const t = r.town || 'OTHER';
    if (!townMap[t]) {
      townMap[t] = {
        town: t,
        units: 0,
        totalValue: 0,
        totalSqft: 0,
      };
    }
    townMap[t].units += 1;
    townMap[t].totalValue += r.resale_price;
    townMap[t].totalSqft += r.floor_area_sqm * SQM_TO_SQFT;
  }

  // Rank towns based on monthly total sales amount and limit to TOP 10 towns
  const townRanking = Object.values(townMap)
    .map((t) => ({
      town: t.town,
      units: t.units,
      totalValue: t.totalValue,
      avgPsf: t.totalSqft > 0 ? Math.round(t.totalValue / t.totalSqft) : 0,
    }))
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 10);

  const mostActiveTown = townRanking[0]?.town || 'N/A';

  // Regional Aggregation (CCR, RCR, OCR)
  const CCR_SET = new Set([
    'BUKIT TIMAH', 'MARINE PARADE', 'BISHAN', 'TOA PAYOH', 'KALLANG/WHAMPOA',
    'QUEENSTOWN', 'GEYLANG', 'CLEMENTI', 'SERANGOON', 'NOVENA'
  ]);
  const OCR_SET = new Set([
    'SEMBAWANG', 'SENGKANG', 'PUNGGOL', 'TAMPINES', 'WOODLANDS', 'YISHUN',
    'BUKIT BATOK', 'CHOA CHU KANG', 'JURONG WEST', 'LIM CHU KANG', 'MANDRAI', 'TENGAH'
  ]);
  const RCR_SET = new Set([
    'ANG MO KIO', 'BEDOK', 'BUKIT MERAH', 'BUKIT PANJANG', 'HOUGANG', 'JURONG EAST', 'PASIR RIS'
  ]);

  function getRegion(town) {
    const t = (town || '').trim().toUpperCase();
    if (CCR_SET.has(t)) return 'CCR';
    if (OCR_SET.has(t)) return 'OCR';
    if (RCR_SET.has(t)) return 'RCR';
    return 'OCR';
  }

  const regionData = {
    CCR: { units: 0, totalValue: 0, totalSqft: 0 },
    RCR: { units: 0, totalValue: 0, totalSqft: 0 },
    OCR: { units: 0, totalValue: 0, totalSqft: 0 },
  };

  for (const r of parsedRecords) {
    const reg = getRegion(r.town);
    regionData[reg].units += 1;
    regionData[reg].totalValue += r.resale_price;
    regionData[reg].totalSqft += r.floor_area_sqm * SQM_TO_SQFT;
  }

  const regionalSummaries = [
    {
      region: 'CCR',
      name: 'CCR',
      fullName: 'Core Central Region',
      units: regionData.CCR.units,
      totalValue: regionData.CCR.totalValue,
      avgPsf: regionData.CCR.totalSqft > 0 ? Math.round(regionData.CCR.totalValue / regionData.CCR.totalSqft) : 0,
    },
    {
      region: 'RCR',
      name: 'RCR',
      fullName: 'Rest of Central Region',
      units: regionData.RCR.units,
      totalValue: regionData.RCR.totalValue,
      avgPsf: regionData.RCR.totalSqft > 0 ? Math.round(regionData.RCR.totalValue / regionData.RCR.totalSqft) : 0,
    },
    {
      region: 'OCR',
      name: 'OCR',
      fullName: 'Outside Central Region',
      units: regionData.OCR.units,
      totalValue: regionData.OCR.totalValue,
      avgPsf: regionData.OCR.totalSqft > 0 ? Math.round(regionData.OCR.totalValue / regionData.OCR.totalSqft) : 0,
    },
  ];

  // Step 5: Filter transactions if optional `town=` query param is present
  let filteredRecords = parsedRecords;
  if (townQuery) {
    filteredRecords = parsedRecords.filter(
      (r) => r.town.toUpperCase() === townQuery.toUpperCase()
    );
  }

  // Sort monthly transaction records highest-price first so top deal is on top
  filteredRecords.sort((a, b) => b.resale_price - a.resale_price);

  const filteredTotalValue = filteredRecords.reduce(
    (sum, r) => sum + r.resale_price,
    0
  );

  return sendJson(
    res,
    200,
    {
      success: true,
      month: latestMonth,
      totalUnits,
      totalValue,
      avgPsf,
      mostActiveTown,
      townRanking,
      regionalSummaries,
      records: filteredRecords,
      filterTown: townQuery || null,
      filteredCount: filteredRecords.length,
      filteredTotalValue,
    },
    {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=7200',
    }
  );
}
