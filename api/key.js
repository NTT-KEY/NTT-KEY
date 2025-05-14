export default async function handler(req, res) {
  try {
    const file = req.query.file;

    if (!file) {
      return res.status(400).json({ error: 'Thiếu tham số ?file=' });
    }

    // Lưu ý: KHÔNG có "refs/heads" trong URL raw GitHub
    const url = `https://raw.githubusercontent.com/NTT-KEY/NTT-KEY/main/Key/${file}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(404).json({ error: 'Không tìm thấy file' });
    }

    const text = await response.text();
        res.setHeader("Content-Type", "text/plain");
        res.send(text);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server', message: err.message });
  }
}
