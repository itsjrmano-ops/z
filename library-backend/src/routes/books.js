const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('../utils/db');

const router = express.Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT id, title, author, format, filename FROM books ORDER BY id DESC').all();
  res.json(rows);
});

router.post('/upload', (req, res) => {
  if (!req.files || !req.files.book) return res.status(400).json({ error: 'no file' });
  const file = req.files.book;
  const title = req.body.title || file.name;
  const author = req.body.author || 'Unknown';
  const format = path.extname(file.name).substring(1).toLowerCase();
  const storageDir = path.join(__dirname, '..', '..', 'storage');
  if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir, { recursive: true });
  const filename = `${Date.now()}_${file.name.replace(/\s+/g,'_')}`;
  const savePath = path.join(storageDir, filename);
  file.mv(savePath, (err) => {
    if (err) return res.status(500).json({ error: 'save_failed' });
    const info = db.prepare('INSERT INTO books (title, author, format, filename) VALUES (?, ?, ?, ?)').run(title, author, format, filename);
    res.json({ id: info.lastInsertRowid, title, author, format, filename });
  });
});

router.get('/:id', (req, res) => {
  const book = db.prepare('SELECT id, title, author, format, filename FROM books WHERE id = ?').get(req.params.id);
  if (!book) return res.status(404).json({ error: 'not_found' });
  const filePath = path.join(__dirname, '..', '..', 'storage', book.filename);
  res.sendFile(filePath);
});

module.exports = router;
