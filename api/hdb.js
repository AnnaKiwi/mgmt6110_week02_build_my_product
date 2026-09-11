// api/hdb.js
// Vercel Serverless Function: Singapore HDB Resale Data Aggregator (Simulated Daily Closing View)

const DATA_GOV_ENDPOINT = 'https://data.gov.sg/api/action/datastore_search';
const RESOURCE_ID = 'd_8b84c4ee58e3cfc0ece0d773c8ca6abc';
const SQM_TO_SQFT = 10.7639;
const DEFAULT_SIMULATED_DAY = 15;
const DAYS_IN_CYCLE = 28;

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
  // Support optional query params: `town=` and `day=`
  let townQuery = '';
  let dayQuery = '';
  try {
    const url = new URL(req.url || '', 'http://localhost');
    townQuery = (req.query?.town || url.searchParams.get('town') || '').trim();
    dayQuery = (req.query?.day || url.searchParams.get('day') || '').trim();
  } catch {
    townQuery = '';
    dayQuery = '';
  }

  // Parse simulated day (defaults to fixed simulated day 15 if omitted)
  let simulatedDay = DEFAULT_SIMULATED_DAY;
  if (dayQuery) {
    const parsed = parseInt(dayQuery, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= DAYS_IN_CYCLE) {
      simulatedDay = parsed;
    }
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
        simulatedDay,
        totalUnits: 0,
        totalValue: 0,
        avgPsf: 0,
        mostActiveTown: 'N/A',
        townRanking: [],
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

  // Step 4: Filter to simulated single day slice (CHANGE 1)
  const dayRecords = parsedRecords.filter(
    (_, idx) => (idx % DAYS_IN_CYCLE) + 1 === simulatedDay
  );

  // Step 5: Derive computed metrics ONLY from this simulated single day subset (CHANGE 4)
  const totalUnits = dayRecords.length;
  const totalValue = dayRecords.reduce((sum, r) => sum + r.resale_price, 0);
  const totalSqft = dayRecords.reduce(
    (sum, r) => sum + r.floor_area_sqm * SQM_TO_SQFT,
    0
  );
  const avgPsf = totalSqft > 0 ? Math.round(totalValue / totalSqft) : 0;

  // Town-level aggregation computed ONLY from this same simulated single day subset
  const dayTownMap = {};
  for (const r of dayRecords) {
    const t = r.town || 'OTHER';
    if (!dayTownMap[t]) {
      dayTownMap[t] = {
        town: t,
        units: 0,
        totalValue: 0,
        totalSqft: 0,
      };
    }
    dayTownMap[t].units += 1;
    dayTownMap[t].totalValue += r.resale_price;
    dayTownMap[t].totalSqft += r.floor_area_sqm * SQM_TO_SQFT;
  }

  // CHANGE 3: Rank towns based on that day's total sales amount and limit to TOP 10 towns
  const townRanking = Object.values(dayTownMap)
    .map((t) => ({
      town: t.town,
      units: t.units,
      totalValue: t.totalValue,
      avgPsf: t.totalSqft > 0 ? Math.round(t.totalValue / t.totalSqft) : 0,
    }))
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 10);

  const mostActiveTown = townRanking[0]?.town || 'N/A';

  // Step 6: Filter transactions if `town=` query param is present
  let filteredRecords = dayRecords;
  if (townQuery) {
    filteredRecords = dayRecords.filter(
      (r) => r.town.toUpperCase() === townQuery.toUpperCase()
    );
  }

  // Sort daily transaction records highest-price first so top deal is on top
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
      simulatedDay,
      totalUnits,
      totalValue,
      avgPsf,
      mostActiveTown,
      townRanking,
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
