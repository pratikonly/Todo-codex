# Nimbus Tasks

Nimbus Tasks is a smart to-do and tracking experience with a modern glassmorphism UI, dark/light theme toggle, and a Vercel-ready Next.js App Router setup.

## Features
- Glassmorphism UI with light/dark theme toggle.
- Filterable task list (status, priority, tags).
- Smart focus insights and upcoming timeline preview.
- Vercel-ready Next.js App Router build.

## Vercel deployment

1. **Create a Vercel project**
   - Import this repository in Vercel.
   - Framework preset: **Next.js**.

2. **Environment variables**
   - Add the values from `.env.example` in the Vercel project settings.
   - If you choose Vercel Postgres, Vercel can auto-inject the `POSTGRES_URL` and `POSTGRES_PRISMA_URL` envs.

3. **Build & deploy**
   - Build command: `npm run build`
   - Output: Next.js default (handled by Vercel).

## Database recommendations

### Recommended: Vercel Postgres
- Tightest integration with Vercel.
- Managed Postgres with serverless-friendly scaling.
- Use with Prisma or Drizzle.

### Alternative: Supabase
- Postgres + Auth + Storage in one platform.
- Great for multi-device sync and user auth.

### Alternative: Neon
- Serverless Postgres with branching.
- Works well with Prisma/Drizzle on Vercel.

## Suggested data model (minimal)
- `Task`
  - `id` (uuid)
  - `title` (string)
  - `description` (text)
  - `priority` (enum: low/medium/high)
  - `status` (enum: todo/in-progress/blocked/done)
  - `tags` (string[])
  - `dueDate` (date)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)
  - `userId` (uuid) — if using auth

## Local development

```bash
npm install
npm run dev
```

## Production checklist
- ✅ Add a database provider (Vercel Postgres recommended).
- ✅ Add API routes (`/app/api/tasks`) for CRUD.
- ✅ Add auth if you want per-user tasks (NextAuth or Supabase Auth).
- ✅ Set env variables in Vercel project settings.
