export default async function handler(req, res) {
  const file = req.query.file;
  if (!file) return res.status(400).send("-- Thiếu file");

  const apiUrl = `https://ntt-key.pages.dev/Key/${file}`;

  try {
    const githubRes = await fetch(apiUrl);
    if (!githubRes.ok) return res.status(404).send("-- Không tìm thấy file");

    const json = await githubRes.json();
    const { time1, time2, key } = json;

    if (!time1 || !time2 || !key) {
      return res.status(400).send("-- Thiếu nội dung JSON");
    }

    const lua = `if os.time() >= ${time1} and os.time() <= ${time2} then\n  _G.index_key = "${key}"\nend`;

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(lua);
  } catch (err) {
    res.status(500).send("-- Lỗi xử lý nội dung");
  }
                                  }
