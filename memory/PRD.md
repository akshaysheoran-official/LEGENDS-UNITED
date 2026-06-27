# LEGENDS UNITED — PRD

## Problem statement
Build LEGENDS UNITED — a premium, multi-page technology platform (not a portfolio/landing page) that
serves as the digital headquarters for an ecosystem covering AI, Cybersecurity, Developer Resources,
Automation, Education, Open Source and future SaaS. Must communicate professionalism, trust, innovation.
Must be Railway-deployable as a monorepo (frontend + backend).

## User personas
- Engineers and security researchers looking for tools and news
- Aspiring developers learning ethical hacking / dev practices
- Potential team members applying via Google Form
- Brand partners / collaborators contacting via the Contact form

## Architecture
- Monorepo: `/frontend` (React 19, CRA via craco, Tailwind, framer-motion, shadcn/ui) and `/backend` (FastAPI + MongoDB via motor)
- Single source of truth for navigation, social links, tools, roadmap, FAQ: `frontend/src/config/site.js`
- Theme: next-themes (dark default, system + light supported)
- Routing: react-router-dom v7, 13 routes + 404
- Smooth scroll, motion-driven page transitions, scroll progress bar, cursor-tracking spotlight, rotating hero phrase

## Core requirements (static)
- 13 routes: Home, About, Developer Resources, Cyber News, Future Tools, Projects, Roadmap, Changelog, Join Team, Community, Contact, Privacy, Terms + 404
- Live cybersecurity news (RSS aggregation) + curated Ethical Hacking spotlight
- Real Contact form (MongoDB persistence, honeypot, IP-based rate limiting)
- Dark + Light theme toggle with user preference
- Future Tools registry — adding to config makes new tools appear automatically
- Premium animations: noise overlay, mesh gradient, animated grid, scroll progress, rotating phrase, spotlight hover, marquee, FAQ accordion

## Implemented (2026-02-12)
- Backend endpoints: GET /api/, GET /api/health, GET /api/news/cyber, POST /api/contact, POST/GET /api/status
- Frontend: 13 pages + RootLayout + Navbar (mobile menu + theme toggle) + Footer (6 socials)
- Railway monorepo configs: backend (railway.json, Procfile, runtime.txt, .env.example) + frontend (railway.json, .env.example, serve script in package.json)
- README with full Railway deployment walkthrough
- Production build verified: 210 kB gzipped main bundle
- Testing subagent: all backend endpoints pass, all frontend flows pass

## Backlog (P0/P1/P2)

### P0 — next iteration
- Optional: pagination on GET /api/status (warn from deployment_agent)
- Optional: email notifications for new contact messages (SMTP/Resend/SendGrid hook ready in server.py)

### P1
- User accounts + bookmarks (Q2)
- Open-source repository hub (Q2)
- Header Inspector (cybersecurity tool, beta) (Q2)

### P2
- AI Summarizer + Prompt Forge (Q3)
- PDF utilities (Q3)
- LU Pro premium membership (Q4)
- Public API + Admin Dashboard (Q4)

## Deployment
See `/app/README.md` for step-by-step Railway monorepo deployment (two services: frontend + backend + MongoDB plugin).
