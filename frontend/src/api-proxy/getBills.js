export default async function handler(req, res) {
  const { q } = req.query;

  try {
    const apiRes = await fetch(`http://119.93.33.254:8447/inquiry-api/public/api/get-latest-bills?q=${q}`);
    if (!apiRes.ok) throw new Error("Bills fetch failed");
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
