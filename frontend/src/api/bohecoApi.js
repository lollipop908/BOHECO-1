export async function fetchAccountDetails(accountNumber) {
  const response = await fetch(
    `https://boheco-1.vercel.app/api/bohecoProxy?endpoint=account&acctNo=${accountNumber}`
  );
  if (!response.ok) throw new Error("Failed to fetch account details");
  return await response.json();
}

export async function fetchBillingHistory(accountNumber) {
  const response = await fetch(
    `https://boheco-1.vercel.app/api/bohecoProxy?endpoint=bills&q=${accountNumber}`
  );
  if (!response.ok) throw new Error("Failed to fetch billing history");
  return await response.json();
}