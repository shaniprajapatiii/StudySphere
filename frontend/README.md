# Study Sphere Frontend

React + Vite frontend for Study Sphere. It provides feed browsing, playlists, video player experience, dashboard analytics, authentication UI, and profile screens.

## Quick Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Backend server running (local or deployed)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Create environment file

Use template [frontend/.env.example](.env.example).

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

### 3. Configure environment

Local development (recommended):

- Set `VITE_API_BASE_URL=http://localhost:4000`

This value is used by the frontend and the Vite dev proxy.

Production:

- Set `VITE_API_BASE_URL=https://your-backend-domain.com`

Production template: [frontend/.env.production.example](.env.production.example)

### 4. Run in development

```bash
npm run dev
```

App runs at `http://localhost:5173`.

## Scripts

- `npm run dev`: start Vite dev server
- `npm start`: alias of dev server
- `npm run build`: production build
- `npm run preview`: preview production build locally
- `npm run lint`: run ESLint

## Build and Preview

```bash
npm run build
npm run preview
```

## Deployment (Vercel)

1. Deploy the frontend directory.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Keep [frontend/vercel.json](vercel.json) for SPA rewrites.
5. Set `VITE_API_BASE_URL` to your backend public URL.

## Backend Integration

- During dev, Vite proxy routes `/api` and `/auth` to `VITE_API_BASE_URL`.
- Backend must allow the frontend origin in `CLIENT_URL` or `CLIENT_ORIGINS`.
- If using cookie auth, ensure requests are sent with credentials in frontend code.

## Key Folders

```
frontend/
  src/
    components/
    context/
    hooks/
    pages/
    constants/
```

## Troubleshooting

### Frontend cannot reach backend

- Confirm backend is running on `http://localhost:4000`.
- Verify `VITE_API_BASE_URL` value in `.env`.
- Restart Vite after changing environment files.

### CORS or auth cookie issues

- Verify backend `CLIENT_URL` / `CLIENT_ORIGINS` includes frontend origin.
- In production, ensure frontend and backend use HTTPS.

### Build fails

- Run `npm run lint` to identify source issues.
- Delete `node_modules` and reinstall dependencies.
