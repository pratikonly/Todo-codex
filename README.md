# EduPilot

**Navigate Your Learning Journey**

EduPilot is a production-focused full-stack Student Productivity and Study Management SaaS built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Neon Postgres via Prisma**.

## Core Highlights
- Rounded glass dashboard shell with sticky top navigation, desktop side nav, mobile bottom nav, and utility sidebar.
- Dashboard widgets for study time, streaks, productivity, analytics tabs, and lower secondary widgets.
- Study tracker with add/edit/delete sessions, offline draft autosave, and Pomodoro focus timer.
- Protected app routes via middleware and secure cookie-backed session gate.
- Neon-ready Prisma schema covering users, study logs, streaks, achievements, friends, and notifications.
- CI workflow for typecheck/build.

## Tech Stack
- Next.js 14 + App Router + TypeScript
- Tailwind CSS
- Prisma ORM
- Neon Postgres

## Local Setup
```bash
npm install
cp .env.example .env.local
npm run db:generate
npm run dev
```

## Environment Variables
Use `.env.example` and configure:
- `DATABASE_URL`
- `DIRECT_URL` (optional)
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PORTFOLIO_URL`

## Database Setup (Neon)
```bash
npm run db:push
```

## Quality Checks
```bash
npm run typecheck
npm run build
```

## Deployment (Vercel)
1. Import the repo into Vercel.
2. Add env vars from `.env.example`.
3. Deploy with build command `npm run build`.

## Footer Credit
The app footer includes a prominent **Made by Pratik** button that links to `NEXT_PUBLIC_PORTFOLIO_URL`.
