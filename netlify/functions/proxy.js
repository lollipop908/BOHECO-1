import fetch from "node-fetch";

export async function handler(event) {
  const { endpoint, acctNo, q } = event.queryStringParameters;

  if (!endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'endpoint' parameter." }),
    };
  }

  let apiUrl = "";

  if (endpoint === "get-account-by-account-number" && acctNo) {
    apiUrl = `http://119.93.33.254:8447/inquiry-api/public/api/${endpoint}?acctNo=${acctNo}`;
  } else if (endpoint === "get-latest-bills" && q) {
    apiUrl = `http://119.93.33.254:8447/inquiry-api/public/api/${endpoint}?q=${q}`;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required parameters." }),
    };
  }

  console.log("🌐 Fetching:", apiUrl);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "NetlifyProxy/1.0",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const contentType = response.headers.get("content-type");
    const data =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    return {
      statusCode: 200,
      body: typeof data === "string" ? data : JSON.stringify(data),
    };
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "Failed to reach backend",
        details: err.message,
      }),
    };
  }
}
