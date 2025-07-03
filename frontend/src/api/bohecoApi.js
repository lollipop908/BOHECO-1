export async function fetchAccountDetails(accountNumber) {
  const response = await fetch(
    `http://119.93.33.254:8447/inquiry-api/public/api/get-account-by-account-number?acctNo=${accountNumber}`
  );
  if (!response.ok) throw new Error("Failed to fetch account details");
  return await response.json();
}

export async function fetchBillingHistory(accountNumber) {
  const response = await fetch(
    `http://119.93.33.254:8447/inquiry-api/public/api/get-latest-bills?q=${accountNumber}`
  );
  if (!response.ok) throw new Error("Failed to fetch billing history");
  return await response.json();
}