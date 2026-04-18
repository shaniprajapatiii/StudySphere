# StudySphere - Your Sphere of Study
---

**StudySphere** is a premier **AI-powered educational platform** designed to transform passive video watching into an interactive learning experience. By leveraging advanced AI, StudySphere converts YouTube videos into comprehensive study guides, complete with transcripts, summaries, and interactive quizzes.

It brings together **video learning**, **AI analysis**, **progress tracking**, and **distraction-free viewing** in a clean, modern interface.

- **Tech Stack:** React, Tailwind CSS, Node.js, Express, MongoDB, Google Gemini AI, Docker

---

## 🎯 Problem Statement

In the age of endless content, **retention** is the real challenge. Students and professionals watch hours of tutorials but often struggle to recall key concepts or test their understanding.

**StudySphere solves this by:**

1.  **Removing Distractions**: No sidebar recommendations or ads.
2.  **Active Recall**: AI-generated quizzes force you to test your knowledge immediately.
3.  **Quick Review**: Summaries and transcripts allow for rapid revision without re-watching.

If you support this mission, leaving a ⭐ helps others discover the project!

---

## 🚀 Key Features

| Feature                 | Description                                |
| ----------------------- | ------------------------------------------ |
| **AI Transcripts**      | Accurate, time-synced video transcripts    |
| **Smart Summaries**     | AI-generated concise summaries of content  |
| **Interactive Quizzes** | Auto-generated quizzes to test retention   |
| **Distraction Free**    | Clean player interface focused on learning |
| **Progress Tracking**   | Track watched videos and quiz scores       |
| **Playlist Support**    | Import entire YouTube playlists            |
| **Secure Auth**         | Google OAuth & Local Authentication        |
| **Responsive Design**   | Works seamlessly on desktop and mobile     |

---

## 🧪 Tech & Architecture

This project is built as a **Monorepo** containing both the Frontend and Backend.

### **Frontend**

- **Framework:** React
- **Styling:** Tailwind CSS, Framer Motion
- **Icons:** Lucide React
- **State/Routing:** React Router, Context API
- **SEO:** React Helmet Async

### **Backend**

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **AI Engine:** Google Gemini API
- **Authentication:** Passport.js (Google OAuth)
- **Video Processing:** youtube-transcript, ytdl-core

### **Let's Connect**
- **Containerization:** Docker
- **Version Control:** Git & GitHub
- **CI/CD:** GitHub Actions

---

## Local Setup

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas (or local MongoDB)
- Google OAuth credentials
- Gemini API key
- YouTube Data API key
- Python 3 (optional, for transcript fallback scripts)

### 1. Clone and move into the project

```bash
git clone <your-repo-url>
cd "Study Sphere"
```

### 2. Create environment files

Use these templates:

- [server/.env.example](server/.env.example)
- [frontend/.env.example](frontend/.env.example)

Windows PowerShell:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item frontend/.env.example frontend/.env
```

macOS/Linux:

```bash
cp server/.env.example server/.env
cp frontend/.env.example frontend/.env
```

Minimum values you must set in `server/.env`:

- `MONGO_URI`
- `SESSION_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SUMMARY_API_KEY`
- `QUIZ_API_KEY`
- `YOUTUBE_API_KEY`

### 3. Install dependencies

```bash
cd server && npm install
cd ../frontend && npm install
```

### 4. Run in development

Start backend (Terminal 1):

```bash
cd server
npm run dev
```

Start frontend (Terminal 2):

```bash
cd frontend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Health check: `http://localhost:4000/health`

### 5. Verify everything works

1. Open the frontend URL.
2. Call backend health check (`/health`) and confirm `{ "ok": true }`.
3. Test login flow.
4. Confirm API calls are successful from the browser network tab.

### 6. Run with Docker Compose (optional)

```bash
docker compose up --build
```

This starts:

- Backend on `http://localhost:4000`
- Frontend on `http://localhost:5173`

## Local Security Notes

- Backend only allows configured frontend origins via `CLIENT_URL` or `CLIENT_ORIGINS`.
- Session cookie is secure in production and SameSite is environment-aware.
- API and auth routes are rate-limited.

## Deployment (Vercel Frontend + Node Backend)

1. Deploy backend to a Node host (Render, Railway, VM, etc.).

- Use [server/.env.production.example](server/.env.production.example)
- Set NODE_ENV=production
- Set SERVER_URL to backend public URL
- Set CLIENT_URL to Vercel frontend URL
- Optional for preview URLs: set CLIENT_ORIGIN_REGEX, for example: ^https://[a-z0-9-]+-your-project\.vercel\.app$

2. Deploy frontend to Vercel from [frontend](frontend).

- Build command: npm run build
- Output directory: dist
- Keep [frontend/vercel.json](frontend/vercel.json) for SPA rewrites
- Set VITE_API_BASE_URL to backend public URL

3. Google OAuth configuration:

- Authorized origin: frontend URL
- Callback URL: SERVER_URL/auth/google/callback

4. Post-deploy checks:

- Open /health on backend
- Test Google login flow
- Verify protected endpoints return 401 when not authenticated and 200 when logged in

## Security Checklist

- Never commit secrets in .env files.
- Rotate any key that was ever exposed.
- Use strong SESSION_SECRET (32+ chars).
- Keep NODE_ENV=production in deployed backend.
