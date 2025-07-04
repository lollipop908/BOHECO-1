// export async function fetchAccountDetails(accountNumber) {
//   const cleanedAccountNumber = accountNumber.trim();
//   const response = await fetch(
//     `/.netlify/functions/proxy?endpoint=get-account-by-account-number&acctNo=${cleanedAccountNumber}`
//   );
//   if (!response.ok) throw new Error("Failed to fetch account details");
//   return await response.json();
// }

// export async function fetchBillingHistory(accountNumber) {
//   const cleanedAccountNumber = accountNumber.trim();
//   const response = await fetch(
//     `/.netlify/functions/proxy?endpoint=get-latest-bills&q=${cleanedAccountNumber}`
//   );
//   if (!response.ok) throw new Error("Failed to fetch billing history");
//   return await response.json();
// }
