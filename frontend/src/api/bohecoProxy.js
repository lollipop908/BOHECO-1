const http = require('http');

module.exports = (req, res) => {
  // Define allowed origins
  const allowedOrigins = [
    'https://boheco-1.vercel.app',
    'https://boheco-1-jndyqlql1-lollipop908s-projects.vercel.app', // Preview domain
    // Add other preview domains as needed
  ];

  // Get the origin from the request headers
  const origin = req.headers.origin;

  // Check if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.status(403).json({ error: 'CORS policy: Origin not allowed' });
    return;
  }

  // Set additional CORS headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Process the API request
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
        res.status(500).json({ error: 'Failed to parse API response', details: err.message });
      }
    });
  }).on('error', (err) => {
    res.status(500).json({ error: 'Failed to fetch from API', details: err.message });
  });
};