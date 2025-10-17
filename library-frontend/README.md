# Library Frontend

Simple React + Vite frontend for the eLibrary demo.

Run:

```bash
cd library-frontend
npm install
npm run dev
```

The frontend expects the backend running on http://localhost:4000

Upload books

From the UI: open /library and use the upload form to send PDF/EPUB files to the backend.

Alternatively use curl:

```bash
curl -F "book=@/path/to/book.pdf" -F "title=My Book" -F "author=Me" http://localhost:4000/api/books/upload
```

EPUB support

The frontend includes epub.js via CDN to render `.epub` files in the reader. If you upload an EPUB it will attempt to render inside the app; otherwise it will be available for download.

Docker
------

Build and run frontend with Docker:

```bash
cd library-frontend
docker build -t elibrary-frontend .
docker run -p 5173:5173 elibrary-frontend
```
