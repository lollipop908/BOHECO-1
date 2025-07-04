const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your React app
app.use(cors({
  origin: ['http://localhost:3000', 'https://boheco-1.vercel.app']
}));

app.use(express.json());

// Proxy endpoint for account details
app.get('/api/account-details', async (req, res) => {
  const { acctNo } = req.query;
  
  if (!acctNo) {
    return res.status(400).json({ message: 'Account number is required' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(
      `http://119.93.33.254:8447/inquiry-api/public/api/get-account-by-account-number?acctNo=${acctNo}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch account details');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch account details' });
  }
});

// Proxy endpoint for billing history
app.get('/api/billing-history', async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ message: 'Account number is required' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(
      `http://119.93.33.254:8447/inquiry-api/public/api/get-latest-bills?q=${q}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch billing history');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch billing history' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});