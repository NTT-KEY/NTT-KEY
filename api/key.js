
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/Key', (req, res) => {
  const filePath = req.query.file;

  if (!filePath) {
    return res.status(400).json({ error: 'Thiếu ?file=path' });
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Không đọc được file hoặc không tồn tại' });
    }

    res.json({ content: data });
  });
});

app.listen(port, () => {
  console.log(`API đang chạy tại http://localhost:${port}`);
});
