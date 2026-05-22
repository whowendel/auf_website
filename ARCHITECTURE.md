# AUF Website — System Architecture

> Re-development of the Angeles University Foundation website.
> Single Next.js application serving the university site and per-college microsites,
> a unified admin panel with role-based access, and an approval workflow for content.

---

## 1. Goals

| # | Goal | How it's met |
|---|------|--------------|
| 1 | Two account types: **University Admin (OUR)** and **College Admins** | `Role` enum: `SUPER_ADMIN`, `COLLEGE_ADMIN`, `COLLEGE_EDITOR`. RBAC in `src/lib/rbac/permissions.ts`. |
| 2 | Each college has its own microsite | Path-based at `/c/<slug>` resolved by `College.slug`. Middleware is structured to switch to subdomains later without schema changes. |
| 3 | Colleges post news/blogs **with approval**; University posts publish directly | Single `Post` model with a `PostStatus` state machine. SUPER_ADMIN bypasses `PENDING_REVIEW`. |
| 4 | University posts can be **tagged to specific colleges** | `PostCollegeTag` join table. College feed query: `originCollegeId = X OR tagged = X`. |
| 5 | **Dynamic / no-code** site config, with creating colleges/programs as the MVP knob | Admin UI creates `College` + `Program` rows. `SiteSetting` / `CollegeSetting` (JSON values) and `NavigationItem` / `Page` are in the schema so future no-code knobs are additive — no migrations required. |
| 6 | **Strengthen branding** | `College.brandColor` / `accentColor` / `logoUrl` / `bannerUrl` drive theme tokens injected via CSS variables. Three frontend variants will share the same backend and theme tokens. |

---

## 2. Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Runtime | **Next.js 15 (App Router)** + React 19 | Server Components + Server Actions = no separate API tier; SEO-friendly for public pages. |
| Language | **TypeScript strict** | Catches RBAC and state-machine mistakes at compile time. |
| DB | **PostgreSQL** | JSON columns for Tiptap content, mature, hostable anywhere (Neon, Supabase, RDS). |
| ORM | **Prisma 7** | Best DX for a 3-day build, generates types from `schema.prisma`. |
| Auth | **Auth.js v5 (NextAuth)** with Credentials + Google-provider-ready | Free, self-hosted, supports adding `@auf.edu.ph` Google SSO with a single env-flag flip. |
| Validation | **Zod** | One schema validates server-actions input and types React Hook Form. |
| Editor | **Tiptap** | Stores content as JSON (`Post.content`); plain-text mirror in `contentText` for search. |
| Styling | **Tailwind 4** + CSS variables | Lets 3 design variants share components but swap tokens. |

---

## 3. Multi-tenancy model

```
auf.edu.ph/                          ← university homepage (variants under /preview/v1..v3)
auf.edu.ph/posts/<slug>              ← university-wide post
auf.edu.ph/c/<collegeSlug>           ← college microsite (homepage)
auf.edu.ph/c/<collegeSlug>/posts/... ← college post
auf.edu.ph/admin/...                 ← unified admin (gated by middleware)
```

**Tenant resolution**: today the slug is taken from the URL segment.
The `middleware.ts` hook is the future home of subdomain detection
(e.g. `cca.auf.edu.ph`); flipping the strategy will only need a rewrite
to `/c/<slug>` — no schema changes.

**"Open in new tab" requirement**: college logos on the university homepage
render as `<a target="_blank" rel="noopener noreferrer" href="/c/<slug>">`.

---

## 4. Domain model (ER summary)

```
User ─┬─< Account / Session                (Auth.js standard)
      ├─ collegeId ──> College             (nullable; required at app layer for COLLEGE_* roles)
      ├─< authoredPosts (Post.authorId)
      ├─< reviewedPosts (Post.reviewedById)
      └─< approvals, auditLogs

College ─┬─< Program
         ├─< Post (originCollegeId)        (null = university-wide)
         ├─< PostCollegeTag                (a post can appear on many colleges)
         ├─< CollegeSetting, NavigationItem, Page, Media
         └─< User (members)

Post ─┬─< Approval        (history: SUBMIT, APPROVE, REJECT, REQUEST_CHANGES, PUBLISH, ...)
      ├─< PostRevision    (snapshot before each content edit)
      └─< PostCollegeTag  (M:N with College)
```

Index strategy (for the hottest queries):

| Query | Index |
|-------|-------|
| Public college feed | `Post(originCollegeId, status, publishedAt)` + tag join on `PostCollegeTag(collegeId)` |
| University feed | `Post(status, publishedAt)` |
| Admin pending queue | `Post(status, publishedAt)` filtered by `status = PENDING_REVIEW` |
| Audit search | `AuditLog(entityType, entityId)` |

---

## 5. Roles & permissions

| Capability | SUPER_ADMIN | COLLEGE_ADMIN | COLLEGE_EDITOR |
|------------|:-----------:|:-------------:|:--------------:|
| Manage colleges & programs | ✅ | — (own college info only, future) | — |
| Manage users & roles | ✅ | — | — |
| Create university-wide post | ✅ | — | — |
| Create college post | ✅ (any) | ✅ (own) | ✅ (own, draft only) |
| Submit for review | n/a (auto-publishes) | ✅ | — |
| Approve / Reject / Request Changes | ✅ | — | — |
| Edit a published post | ✅ | — | — |
| Tag a post to other colleges | ✅ | — | — |

Implemented in [src/lib/rbac/permissions.ts](src/lib/rbac/permissions.ts) as small pure functions called by every service.

---

## 6. Post approval state machine

```
                  ┌──────────────── recall ─────────────────┐
                  │                                          │
                  ▼                                          │
   DRAFT ──submit─▶ PENDING_REVIEW ──approve──▶ PUBLISHED ──┘
                          │                       ▲
                          ├── reject ──▶ REJECTED │
                          └── request_changes ──▶ CHANGES_REQUESTED ──resubmit─┘

   SUPER_ADMIN may also: DRAFT ──publish──▶ PUBLISHED   (bypasses review)
                         APPROVED  ──publish──▶ PUBLISHED (scheduled posts)
                         PUBLISHED ──archive──▶ ARCHIVED
```

Allowed transitions per actor are encoded in `allowedNextStatuses()`.
Every transition writes an `Approval` row (immutable history) and an `AuditLog` entry.

---

## 7. Folder structure

```
auf-website/
├── prisma/
│   ├── schema.prisma           single source of truth
│   ├── seed.ts                 super admin + 8 colleges + sample posts
│   └── migrations/             generated by `prisma migrate dev`
├── src/
│   ├── app/
│   │   ├── (public)/           public site (university + microsites)
│   │   │   ├── page.tsx
│   │   │   ├── posts/[slug]/
│   │   │   └── c/[slug]/       college microsite (resolved by College.slug)
│   │   │       └── posts/[postSlug]/
│   │   ├── (auth)/login/
│   │   ├── (admin)/admin/      unified admin (gated by middleware)
│   │   │   ├── dashboard/
│   │   │   ├── posts/          list + new + [id] editor
│   │   │   ├── approvals/      OUR review queue
│   │   │   ├── colleges/       list + new + [id]
│   │   │   ├── programs/
│   │   │   ├── users/
│   │   │   ├── media/
│   │   │   └── settings/
│   │   ├── preview/{v1,v2,v3}/ three design variants
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       └── health/route.ts
│   ├── server/
│   │   ├── auth/               Auth.js config + session helpers
│   │   ├── validators/         Zod schemas (single source of truth)
│   │   ├── services/           business logic — *the only layer that talks to Prisma*
│   │   └── actions/            thin "use server" wrappers + revalidatePath()
│   ├── lib/
│   │   ├── prisma.ts           singleton client
│   │   ├── env.ts              Zod-validated env
│   │   ├── utils.ts            cn(), toSlug(), formatDate()
│   │   └── rbac/permissions.ts
│   ├── components/
│   │   ├── ui/                 shadcn-style primitives
│   │   ├── admin/              admin-only components
│   │   ├── public/             public-site components
│   │   └── editor/             Tiptap wrapper
│   ├── themes/{classic,modern,bold}/   theme tokens per variant
│   ├── types/next-auth.d.ts    session augmentation (role, collegeId)
│   └── middleware.ts           gates /admin + reserves subdomain hook
```

**Rule:** UI components never `import { prisma }`.
They call **server actions** (`src/server/actions/*`), which call **services**
(`src/server/services/*`), which are the only layer that touches Prisma.
This boundary makes RBAC checks impossible to forget — every mutation flows
through one service function that calls `canX(actor)` first.

---

## 8. Request flows

### 8.a College admin submits a news post

```
[Editor UI] ──submit──▶ submitPostForReviewAction(postId)         // src/server/actions/posts.ts
                          │
                          ▼
                        postsSvc.submitForReview(actor, postId)    // src/server/services/posts.ts
                          │  RBAC: canSubmitForReview(actor)
                          │  state: DRAFT → PENDING_REVIEW   (allowedNextStatuses)
                          ▼
                        prisma.$transaction:
                           UPDATE Post SET status, submittedAt
                           INSERT Approval (action = SUBMIT)
                          │
                          ▼
                        AuditLog INSERT
                          │
                          ▼
                        revalidatePath("/admin/approvals")
```

### 8.b OUR approves the post

```
reviewPostAction({ postId, action: "APPROVE" })
   → postsSvc.reviewPost(actor, …)
       RBAC: canApprovePosts(actor)
       if post.scheduledFor > now:  status → APPROVED  (waits)
       else:                        status → PUBLISHED  (live)
       Approval (action = APPROVE)
       revalidatePath("/", "/c/<slug>", "/admin/...")
```

### 8.c University-wide post tagged to colleges

```
SUPER_ADMIN creates Post { originCollegeId: null, collegeTagIds: [cca, csm] }
   → postsSvc.createPost  inserts Post + PostCollegeTag rows
   → status starts at DRAFT; SUPER_ADMIN can publishDirectly() in one click
   → appears on:
        /                         (university feed)
        /c/cca, /c/csm            (tagged colleges)
```

---

## 9. Dynamic config strategy

The schema already supports no-code knobs **without future migrations**:

- `SiteSetting(key, value: Json)` — university-wide (e.g. `hero.title`, `social.facebook`).
- `CollegeSetting(collegeId, key, value: Json)` — per-college overrides.
- `NavigationItem` — configurable menus (university nav and per-college nav).
- `Page` — generic CMS pages (About, Programs, etc.) with `slug` scoped per college.

**MVP scope (3 days):** the admin UI exposes only **Create / Edit Colleges**
and **Create / Edit Programs**. The other tables are seeded with sane
defaults so we don't ship empty UI screens, but the API surface is ready
when AUF wants to expose more knobs.

---

## 10. Security

- **Server actions** validate every input with Zod before touching the DB.
- **RBAC checks** live inside service functions, not in route handlers — so
  the same check runs whether the call comes from a form, a fetch, or a
  background job.
- **Audit log** records actor, action, entity, IP, user-agent, and a JSON
  metadata payload for every mutation that crosses a permission boundary.
- **Sessions** are JWT-based; `role` and `collegeId` are baked into the JWT
  so the middleware can authorize requests without a DB round-trip.
- **Google SSO** is gated to a configurable domain (`AUTH_GOOGLE_ALLOWED_DOMAIN`,
  defaults to `auf.edu.ph`); new Google users are created **inactive** and
  must be activated by the SUPER_ADMIN.
- **Passwords** are bcrypt-hashed (cost 10).
- **Soft delete** for colleges (`isActive = false`); we never CASCADE-drop
  content. Posts use a `PostStatus.ARCHIVED` terminal state.

---

## 11. Deployment

- **Database**: Neon or Supabase Postgres (free tier OK for staging).
- **App**: Vercel (one project, automatic preview deployments per PR).
- **Commands**:
  ```
  npm install
  npm run db:migrate         # creates schema
  npm run db:seed            # super admin + 8 colleges + samples
  npm run dev
  ```
- **CI**: `npm run typecheck && npm run lint && npm run build`.
- **Migrations**: `prisma migrate deploy` in the release pipeline.

---

## 12. What's intentionally deferred (out of 3-day scope)

| Deferred | Why it's safe | Where the seam is |
|----------|---------------|-------------------|
| Subdomain microsites | Path-based ships same day; switch is a middleware-only change. | `src/middleware.ts` |
| File uploads to S3 / Cloudinary | Schema already has `Media`; we hard-code one provider behind a service. | `src/server/services/media.ts` (todo) |
| Email notifications on approval | Approval row exists; a worker can read and send. | `src/server/services/notifications.ts` (todo) |
| Public full-text search | `Post.contentText` is already populated. | Add Postgres `tsvector` later. |
| AD / Microsoft Entra SSO | Auth.js makes this a 10-line `Microsoft Entra ID` provider addition. | `src/server/auth/auth.config.ts` |
| No-code page builder | `Page.content` is JSON; reuse the Tiptap editor when needed. | `src/components/editor/` |

---

## 13. Three frontend variants

All three variants render the **same data** from the same server components
and call the **same server actions**. They differ only in:

- **Theme tokens** (CSS variables seeded per `College.brandColor` / `accentColor`).
- **Layout components** under `src/themes/{classic,modern,bold}/`.
- **Hero / news-card / footer treatments**.

Variants live under `/preview/v1`, `/preview/v2`, `/preview/v3` so the client
can review all three side-by-side before choosing one to promote to `/`.
