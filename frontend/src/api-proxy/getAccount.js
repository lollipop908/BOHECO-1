export default async function handler(req, res) {
  const { acctNo } = req.query;

  try {
    const apiRes = await fetch(`http://119.93.33.254:8447/inquiry-api/public/api/get-account-by-account-number?acctNo=${acctNo}`);
    if (!apiRes.ok) throw new Error("Account fetch failed");
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
