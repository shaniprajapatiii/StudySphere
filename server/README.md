# Study Sphere Server

Node.js + Express backend for Study Sphere. It provides authentication, playlist/feed APIs, AI quiz/summary endpoints, transcript services, and user profile endpoints.

## Quick Setup

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas (or local MongoDB)
- Google OAuth app credentials
- Gemini API key
- YouTube Data API key
- Python 3 (optional fallback for transcript script)

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Create environment file

Use the template at [server/.env.example](.env.example).

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Required values in `.env`:

- `MONGO_URI`
- `SESSION_SECRET`
- `CLIENT_URL`
- `SERVER_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SUMMARY_API_KEY`
- `QUIZ_API_KEY`
- `YOUTUBE_API_KEY`

Use `CLIENT_ORIGINS` only if you need to allow more than one frontend origin.

### 3. Run in development

```bash
npm run dev
```

Server runs on `PORT` from `.env` (default: `4000`).

Health check:

```bash
curl http://localhost:4000/health
```

## Scripts

- `npm run dev`: start with nodemon
- `npm start`: start with node

## API Base Paths

- `/auth`: authentication routes
- `/api/playlists`: playlist CRUD
- `/api/feed`: feed/discovery
- `/api/videos`: transcript and video endpoints
- `/api/ai`: summary and quiz endpoints
- `/api/user`: user profile/progress endpoints

## Important Runtime Notes

- CORS allow-list comes from `CLIENT_URL`, with `CLIENT_ORIGINS` available for multi-origin setups.
- Session cookies are `httpOnly`; `secure` is enabled in production.
- In production, `TRUST_PROXY` should match your reverse-proxy hop count.
- Auth and API routes are rate-limited.

## Project Structure

```
server/
  api/
    index.js
  vercel.json
  server.js
  src/
    config/
    middleware/
    models/
    routes/
    services/
    utils/
  scripts/
```

## Deployment Notes

- Use [server/.env.example](.env.example) as a template.
- Set `NODE_ENV=production` and `TRUST_PROXY=1` (or your actual proxy hops).
- Ensure `SERVER_URL` and `CLIENT_URL` use HTTPS.
- This repo includes Vercel serverless support via `api/index.js` and `vercel.json`.
- Google OAuth callback URL should be:
  - `https://<your-server-domain>/auth/google/callback`

## Troubleshooting

### MongoDB connection fails

- Check `MONGO_URI` and Atlas network allow-list.
- Confirm DB user credentials and database name.

### CORS blocked requests

- Verify frontend origin in `CLIENT_URL`, or add `CLIENT_ORIGINS` if you allow multiple origins.
- Confirm frontend is sending credentials where required.

### OAuth login fails

- Ensure Google OAuth Authorized JavaScript origin matches frontend URL.
- Ensure redirect URI matches `SERVER_URL/auth/google/callback` exactly.

### Session not persisting

- Confirm `SESSION_SECRET` is set.
- In production, confirm HTTPS and correct `TRUST_PROXY`.
