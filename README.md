# Updated June 28, 2026

# AUF Website

This repository contains the AUF public website built with Next.js (App Router) and TypeScript.

## Quick start

Install dependencies, start a local Postgres database, and run the development server:

```bash
npm install
cp .env.example .env

# start a local Postgres container (credentials match .env.example)
docker compose up -d

# create the schema in the local database
npm run db:push

npm run dev
```

Open http://localhost:3000 in your browser.

If you have access to a hosted database instead (e.g. your team's Vercel/Neon/Supabase instance), skip `docker compose up -d` and put that connection string in `.env` instead.

## Important scripts

Run these from the project root:

- `npm run dev` — start Next.js dev server
- `npm run build` — runs `prisma generate` then builds Next.js for production
- `npm run start` — start the production server after `npm run build`
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript type checks

Prisma / database tasks:

- `npm run db:generate` — `prisma generate`
- `npm run db:migrate` — `prisma migrate dev`
- `npm run db:deploy` — `prisma migrate deploy`
- `npm run db:push` — `prisma db push`
- `npm run db:studio` — `prisma studio`
- `npm run db:seed` — run `prisma/seed.ts` (via `tsx`)

## Project overview

High-level layout (key folders):

- `src/app` — Next.js App Router pages and layouts
- `src/components` — UI components (public, admin, editor, etc.)
- `src/data` — JSON and helper modules used to populate pages
- `src/lib` — utilities, environment helpers, and Prisma client wrapper
- `src/server` — server-side actions, services, repositories, and validators
- `prisma` — Prisma schema and seed script
- `public` — static assets (images, icons, slider images)

Look at `src/components/public/chatbot/chatbot-widget.tsx` for the site chatbot implementation.

## Prisma

The repo uses Prisma (see `prisma/schema.prisma`). Typical workflow:

```bash
# generate client
npm run db:generate

# run migrations (dev)
npm run db:migrate

# open Studio
npm run db:studio

# seed the database
npm run db:seed
```

Database connection and other environment variables are expected in a `.env` file at the project root.

## Contributing

- Follow existing code patterns (Tailwind, shadcn components, `src/app` layout structure).
- Run `npm run lint` and `npm run typecheck` before opening a PR.

## Notes

- This project targets Next.js 16+ and React 19.
- See `package.json` for the full list of dependencies and devDependencies.

If you want, I can expand this README with deployment steps, CI examples, or a short developer onboarding checklist.
