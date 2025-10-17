# Library Backend

Simple Express backend for the electronic library demo.

Quick start:

1. Install:

```bash
cd library-backend
npm install
npm run migrate
npm run dev
```

2. Endpoints:
- `GET /api/books` - list books
- `POST /api/books/upload` - upload a file (form field `book`)
- `GET /api/books/:id` - download the file
- `POST /api/auth/register` - register {username,password}
- `POST /api/auth/login` - login {username,password}

Storage served at `/storage`
