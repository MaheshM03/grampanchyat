# Run Grampanchyat Fullstack App

## Backend Server (port 5000)
```bash
cd server
npm install
npm run dev
```
Expected: `Server running on port 5000`

## Frontend Client (port 3000)
```bash
cd client
npm start
```
Expected: Browser opens http://localhost:3000, proxy forwards /api/* to backend.

## Verify Fix
1. Backend logs: No errors, in-memory news API ready.
2. Client console: No fetch errors, News loads (empty array OK).
3. News.jsx component shows no loading/errors.

**Note:** Backend news in-memory (resets on restart). Restart client after proxy add to apply.
