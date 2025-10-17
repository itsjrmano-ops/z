const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const auth = require('./routes/auth');
const books = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/api/auth', auth);
app.use('/api/books', books);

app.use('/storage', express.static(path.join(__dirname, '..', 'storage')));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Library backend listening on ${port}`));
