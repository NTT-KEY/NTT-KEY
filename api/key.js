import { readFileSync } from "fs";
import { join } from "path";

export default async function handler(req, res) {
  try {
    const file = req.query.file;

    if (!file) {
      return res.status(400).json({ error: 'Thiếu tham số ?file=' });
    }

    const fakePath = join(process.cwd(), "Key", `${file}`);
    try {
      const content = readFileSync(fakePath, "utf8");
      res.setHeader("Content-Type", "text/plain");
      return res.send(content);
    } catch (err) {
      return res.status(404).json({ error: "Không tìm thấy file" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server" });
  }
}
