// Use your deployed backend URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.vercel.app' 
  : 'http://localhost:5000';

export async function fetchAccountDetails(accountNumber) {
  const response = await fetch(`${API_BASE_URL}/api/account-details?acctNo=${accountNumber}`);
  if (!response.ok) throw new Error("Failed to fetch account details");
  return await response.json();
}

export async function fetchBillingHistory(accountNumber) {
  const response = await fetch(`${API_BASE_URL}/api/billing-history?q=${accountNumber}`);
  if (!response.ok) throw new Error("Failed to fetch billing history");
  return await response.json();
}