// Automatically detect environment
const getApiBaseUrl = () => {
  // If we're in production (deployed), use HTTPS
  if (process.env.NODE_ENV === 'production') {
    return 'https://119.93.33.254:8447';
  }
  // If we're in development (local), use HTTP
  return 'http://119.93.33.254:8447';
};

const API_BASE_URL = getApiBaseUrl();

export async function fetchAccountDetails(accountNumber) {
  const response = await fetch(
    `${API_BASE_URL}/inquiry-api/public/api/get-account-by-account-number?acctNo=${accountNumber}`
  );
  if (!response.ok) throw new Error("Failed to fetch account details");
  return await response.json();
}

export async function fetchBillingHistory(accountNumber) {
  const response = await fetch(
    `${API_BASE_URL}/inquiry-api/public/api/get-latest-bills?q=${accountNumber}`
  );
  if (!response.ok) throw new Error("Failed to fetch billing history");
  return await response.json();
}