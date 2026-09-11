// api/health.js
// Vercel Serverless Function: Health & Upstream Reachability Check

const DATA_GOV_ENDPOINT = 'https://data.gov.sg/api/action/datastore_search';
const RESOURCE_ID = 'd_8b84c4ee58e3cfc0ece0d773c8ca6abc';

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(statusCode).json(data);
    return;
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  try {
    const upstreamRes = await fetch(
      `${DATA_GOV_ENDPOINT}?resource_id=${RESOURCE_ID}&sort=month%20desc&limit=1`
    );

    if (!upstreamRes.ok) {
      return sendJson(res, upstreamRes.status, {
        status: 'error',
        upstreamStatus: upstreamRes.status,
        message: 'External data service rejected request, please retry later.',
      });
    }

    const data = await upstreamRes.json();
    const latestRecord = data?.result?.records?.[0];
    const latestMonth = latestRecord?.month || null;

    let latestMonthRecordCount = 0;
    if (latestMonth) {
      const countRes = await fetch(
        `${DATA_GOV_ENDPOINT}?resource_id=${RESOURCE_ID}&limit=1&filters=${encodeURIComponent(
          JSON.stringify({ month: latestMonth })
        )}`
      );
      if (countRes.ok) {
        const countData = await countRes.json();
        latestMonthRecordCount = countData?.result?.total || 0;
      }
    }

    return sendJson(res, 200, {
      status: 'ok',
      upstreamStatus: upstreamRes.status,
      latestMonth,
      latestMonthRecordCount,
    });
  } catch (err) {
    return sendJson(res, 502, {
      status: 'error',
      upstreamStatus: 502,
      message: 'Market data source cannot be reached at this moment. Please try again.',
      detail: err.message,
    });
  }
}
