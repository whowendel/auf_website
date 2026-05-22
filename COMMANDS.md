# AUF Website — Command Reference

## First-time setup

```bash
npm install
```
Installs all dependencies.

---

## Daily development (run in order, each in its own terminal)

### Terminal 1 — local Postgres server
```bash
npx prisma dev
```
Starts the local Postgres database server on port `51214`. **Must stay running** while you develop or use Studio. Press `q` to quit.

> **Note:** `prisma dev` always serves the `template1` database, regardless of the database name in your `DATABASE_URL`. The `.env` is already configured for this.

### Terminal 2 — Next.js dev server
```bash
npm run dev
```
Starts the Next.js app at [http://localhost:3000](http://localhost:3000).

---

## Database

```bash
npx prisma db push
```
Applies schema changes to the local database without creating a migration file. Use during early development.

```bash
npm run db:migrate
```
Creates a new migration file and applies it. Use when schema changes are ready to be tracked.

```bash
npm run db:deploy
```
Applies existing migration files to the database (used in CI/production, not locally).

```bash
npm run db:generate
```
Regenerates the Prisma client after schema changes (runs automatically after `migrate` and `push`).

```bash
npm run db:seed
```
Populates the database with initial data defined in `prisma/seed.ts`.

```bash
npm run db:studio
```
Opens Prisma Studio at [http://localhost:5555](http://localhost:5555) — a GUI to browse and edit database records.
> **Requires Terminal 1 (`npx prisma dev`) to be running first.**
> The URL does not open automatically; navigate to it manually.

---

## Code quality

```bash
npm run typecheck
```
Runs TypeScript type checking without emitting files.

```bash
npm run lint
```
Runs ESLint across the codebase.

---

## Production build

```bash
npm run build
```
Builds the Next.js app for production.

```bash
npm run start
```
Starts the production build (run `npm run build` first).
