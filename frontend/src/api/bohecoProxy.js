const http = require('http');

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your domains)
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { endpoint, acctNo, q } = req.query;
  let apiUrl;

  if (endpoint === 'account') {
    if (!acctNo) return res.status(400).json({ error: 'Missing account number' });
    apiUrl = `http://119.93.33.254:8447/inquiry-api/public/api/get-account-by-account-number?acctNo=${acctNo}`;
  } else if (endpoint === 'bills') {
    if (!q) return res.status(400).json({ error: 'Missing query parameter' });
    apiUrl = `http://119.93.33.254:8447/inquiry-api/public/api/get-latest-bills?q=${q}`;
  } else {
    return res.status(400).json({ error: 'Invalid endpoint' });
  }

  http.get(apiUrl, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => { data += chunk; });
    apiRes.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      try {
        const parsedData = JSON.parse(data);
        res.status(apiRes.statusCode).json(parsedData);
      } catch (err) {
        res.status(500).json({ error: 'Failed to parse API response' });
      }
    });
  }).on('error', (err) => {
    res.status(500).json({ error: 'Failed to fetch from API', details: err.message });
  });
};