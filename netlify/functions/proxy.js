// netlify/functions/proxy.js
import fetch from "node-fetch";

export async function handler(event) {
  const { endpoint, acctNo, q } = event.queryStringParameters;

  console.log("📩 Incoming Request:", { endpoint, acctNo, q });

  if (!endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'endpoint' query parameter." }),
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

  console.log("🌐 Fetching from external API:", apiUrl);

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "NetlifyProxy/1.0",
      },
    });

    const contentType = response.headers.get("content-type");
    const body =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    console.log("✅ Response received");

    return {
      statusCode: 200,
      body: typeof body === "string" ? body : JSON.stringify(body),
    };
  } catch (err) {
    console.error("❌ Fetch failed:", err.message); // log full error to terminal
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Proxy fetch failed",
        details: err.message,
      }),
    };
  }
}
