const fs = require('fs');
const path = require('path');
const db = require('../utils/db');

const sql = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT,
  format TEXT,
  filename TEXT NOT NULL
);
`;

function migrate(){
  db.exec(sql);
  console.log('migrations applied');
}

migrate();
