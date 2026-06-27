# LEGENDS UNITED

> Building the Future Through Technology.

A premium technology platform focused on AI, Cybersecurity, Developer Resources, Automation, Educational Content, Open Source and future SaaS products.

This is a **monorepo**:

```
/
├── frontend/   → React 19 (CRA + craco) + Tailwind + shadcn/ui + Framer Motion
├── backend/    → FastAPI + MongoDB (motor)
└── README.md
```

---

## Local development

### Prerequisites
- Node.js 20+ and **Yarn 1.x** (never npm)
- Python 3.11+
- MongoDB (local or Atlas)

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # then edit MONGO_URL / DB_NAME
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend
```bash
cd frontend
yarn install
cp .env.example .env   # then set REACT_APP_BACKEND_URL
yarn start
```

---

## Deploying on Railway

You can deploy **two ways**:

### Option A — Frontend only (simplest, recommended for now)

The frontend is fully self-contained. If the backend is not deployed, the **Cyber News** page falls back to a curated static reading list, and the **Contact form** opens the user's email client. The site looks and works perfectly.

1. Push this repo to GitHub.
2. Railway → **+ New → GitHub Repo** → select repo.
3. **Settings → Root Directory**: `frontend`
4. Railway auto-detects Node. The included `frontend/railway.json` runs `yarn install && yarn build` then `yarn serve`.
5. Add one variable (optional — only if you also deploy the backend later):
   | Key | Value |
   | --- | --- |
   | `REACT_APP_BACKEND_URL` | `https://<your-backend>.up.railway.app` (or leave unset for static-only) |
6. **Settings → Networking → Generate Domain**. Done.

### Option B — Full stack (frontend + backend + MongoDB)

Create **two services + the MongoDB plugin** in the same Railway project.

#### B.1 MongoDB plugin
1. **+ New → Database → Add MongoDB** → copy `MONGO_URL`.

#### B.2 Backend service (FastAPI)
1. **+ New → GitHub Repo** → pick this repo.
2. In service **Settings → Root Directory**: `backend`
3. Railway will auto-detect Python via `requirements.txt`. The included `backend/railway.json` and `backend/Procfile` provide the start command:
   ```
   uvicorn server:app --host 0.0.0.0 --port $PORT
   ```
4. Add these **Variables**:
   | Key | Value |
   | --- | --- |
   | `MONGO_URL` | (paste from MongoDB plugin) |
   | `DB_NAME` | `legends_united` |
   | `CORS_ORIGINS` | `https://<your-frontend-domain>.up.railway.app` |
5. **Settings → Networking → Generate Domain** to expose a public URL, e.g. `https://lu-api.up.railway.app`.

#### B.3 Frontend service (React)
1. **+ New → GitHub Repo** → same repo.
2. **Settings → Root Directory**: `frontend`
3. Railway auto-detects Node via `package.json`. The included `frontend/railway.json` configures:
   - **Build command:** `yarn install && yarn build`
   - **Start command:** `yarn serve` (serves `build/` on `$PORT` via `serve`)
4. Add this **Variable**:
   | Key | Value |
   | --- | --- |
   | `REACT_APP_BACKEND_URL` | `https://lu-api.up.railway.app` (from Step 2.5) |
5. **Generate Domain** to expose the site.

#### B.4 Update backend CORS
Go back to the backend service and set `CORS_ORIGINS` to the frontend's generated domain. Redeploy the backend.

---

## Environment variables

### `backend/.env.example`
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=legends_united
CORS_ORIGINS=*
```

### `frontend/.env.example`
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## What you get

- **13 routes** — Home, About, Developer Resources, Cyber News, Future Tools, Projects, Roadmap, Changelog, Join Team, Community, Contact, Privacy, Terms + 404
- **Live Cyber News** aggregating The Hacker News, Krebs, BleepingComputer, Dark Reading, Schneier + curated Ethical Hacking spotlight
- **Real Contact form** persisted to MongoDB with honeypot + rate limiting (5 req / 10 min / IP)
- **Dark + Light themes** (user-selectable, persisted)
- **Scalable architecture** — add a tool to `frontend/src/config/site.js` and it shows up automatically

---

## Tech stack

React 19 · FastAPI · MongoDB · Tailwind CSS · Framer Motion · shadcn/ui · TanStack Query · React Hook Form · Zod · Sonner · Lucide

---

© LEGENDS UNITED
