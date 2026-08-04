# Architecture and implementation status

This document describes the current implementation of the private insurance-agent app and the approved Phase 1.1 target architecture.

## Approved target architecture

- Deployment target: GCP project `abglobal-insurance-app`.
- Production database: Supabase-hosted PostgreSQL, represented locally by Prisma in `prisma/schema.prisma`.
- Authentication: Supabase Auth with Google OAuth and email-based auth. The local Phase 2 slice wires SSR clients, code exchange, sign-out, and server-validated session boundaries; the live project reports both providers enabled.
- Staff roles: `superadmin`, `admin`, and `user`.
- Retention policy: standard.
- Planned Google services: email, CRM, and calendar integrations; Google Analytics for analytics and content measurement.
- Policy, underwriting, and claims entities are intentionally excluded from this model.

Phase 1.1 adds the production entity schema, an idempotent non-personal seed, and a lazy Prisma server abstraction while preserving the existing SQLite draft data layer and routes. No remote database objects or cloud infrastructure are changed.

## Stack and runtime

- Next.js `16.3.0` App Router with React `19.2.8` and TypeScript.
- `pnpm@10.33.2` is the declared package manager. The checked-out runtime is Node `v22.22.2`; the database module requires a Node runtime that provides `node:sqlite`.
- Tailwind CSS 4 is integrated through `@tailwindcss/postcss`; global styles are in `src/app/globals.css`.
- The TypeScript alias `@/*` resolves to `src/*`.
- There is no external database package. `src/lib/db.ts` uses synchronous `node:sqlite` access through `DatabaseSync`.
- Prisma `6.19.0` and `@prisma/client` `6.19.0` are now included for the production model. Prisma validation and generation require `DATABASE_URL` to be present, but do not connect to a database; offline checks use a non-secret placeholder such as `postgresql://placeholder:placeholder@localhost:5432/placeholder`. The checked-in migration is documentation/reproducibility for the schema and has not been applied; migration and seed execution require an explicitly configured real database.

## Request and data flow

1. The public homepage renders the consultation form from `src/components/consultation-form.tsx`.
2. The browser adds `utm_source`, `utm_medium`, and `utm_campaign` query parameters to the submitted payload as `source`, `medium`, and `campaign`.
3. `POST /api/leads` validates the JSON object, required contact fields, a basic email pattern, and `consent === true`.
4. The handler normalizes string input in `leadInputFromUnknown`, inserts the record into SQLite, and returns `{ ok: true, leadId }` with HTTP 201.
5. The browser navigates to `/thank-you` after a successful submission.
6. The server-rendered admin pages read the shared database instance. The leads table calls `PATCH /api/admin/leads` to change status; the admin APIs also expose list and note operations.

## Current routes

| Route | Current implementation and behavior |
|---|---|
| `/` | Public marketing homepage with service areas, approach, resources copy, and consultation form. |
| `/thank-you` | Static confirmation page shown after a successful consultation submission. |
| `/admin` | Server-rendered dashboard metrics and recent leads from SQLite; requires a server-validated Supabase Auth session. |
| `/admin/leads` | Server-rendered lead list with client-side status updates; requires a server-validated Supabase Auth session. |
| `POST /api/leads` | Public lead intake endpoint. `GET` is explicitly rejected with 405. |
| `GET /api/admin/leads` | Returns all leads as JSON for an authenticated session; anonymous callers receive 401. |
| `PATCH /api/admin/leads` | Updates a lead's status and optionally follow-up date for an authenticated session. |
| `GET /api/admin/leads/notes?leadId=<id>` | Returns notes for one lead for an authenticated session. |
| `POST /api/admin/leads/notes` | Adds a note for a lead for an authenticated session; defaults the author to `Marketing team`. |
| `/robots.txt` | Generated metadata route allowing `/` and disallowing `/admin`, `/portal`, and `/api/`; points to the production sitemap URL. |
| `/sitemap.xml` | Generated metadata route listing `/`, `/privacy`, and `/disclosures` under `https://abglobalconsulting.com`. |

The homepage links to `/privacy` and `/disclosures`, and the admin navigation links to `/admin/tasks`, `/admin/campaigns`, `/admin/content`, and `/admin/analytics`, but no corresponding route files currently exist in `src/app`. `/portal` is also named in `robots.ts` but has no current route file.

## Persistence model

`src/lib/db.ts` creates the database at `process.env.DATABASE_PATH` when set, otherwise `.data/leads.sqlite`. It creates the parent directory, enables SQLite WAL mode, and creates tables if absent. The repository ignores `/.data/`.

The `leads` table contains:

- `id` — auto-increment integer primary key.
- `first_name`, `last_name`, `email`, `phone`, `service` — required text fields.
- `contact_time`, `message`, `source`, `medium`, `campaign` — required text columns with empty-string defaults.
- `consent` — required integer representation of a boolean.
- `status` — required text, default `new`; valid application values are `new`, `reviewing`, `assigned`, `contacted`, `qualified`, and `closed`.
- `follow_up_date` — required text column with an empty-string default.
- `created_at` — required ISO timestamp text.

The `lead_notes` table contains `id`, `lead_id` (foreign key with cascade delete), `body`, `author`, and `created_at`. Notes are listed newest first. The current database API exposes create, list, get, update, note-add, note-list, and close operations; there is no delete route.

## Configuration assumptions

Application environment variables currently referenced by source include:

- `DATABASE_PATH` — optional SQLite filename. If absent, the relative path `.data/leads.sqlite` is used.
- `SEED_DEMO_DATA` — when exactly `true`, seeds four demo leads if the database is empty.
- `NEXT_PUBLIC_SUPABASE_URL` — optional during local build/test; required to use Supabase Auth.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — optional during local build/test; required to use Supabase Auth.

Environment files are ignored by Git. The local `.env.local` supplies the Supabase URL and publishable key; no key value is documented or committed. `next.config.ts` has no project-specific options. Metadata and sitemap URLs are hard-coded to `https://abglobalconsulting.com` in the current source.

Phase 1.1 also defines `DATABASE_URL` for Prisma's PostgreSQL datasource, but no Supabase project reference or credentials are configured. The Supabase CLI is not installed locally. No credentials or environment files were read. Prisma validation/generation can use a non-secret placeholder value; no remote connection is required. The migration files are checked in but are not applied in this phase.

## Security boundary

The admin layout and admin API handlers validate a Supabase Auth JWT with `auth.getClaims()`; anonymous page requests redirect to `/login` and anonymous API requests receive 401. Next.js 16 Proxy refreshes cookies when Supabase is configured. The approved roles are represented in a pure helper, but role enforcement is not claimed complete because no server-backed role source has been configured. User-editable metadata is never used for authorization. SQLite is local-only in this baseline; it is not a production database or a shared multi-instance persistence layer.

## Testing surface

The repository includes `tests/db.test.mjs`, `tests/domain/lead-model.test.ts`, and `tests/auth.test.ts`. The auth tests cover safe missing/malformed environment handling and the approved role helper behavior. The package scripts provide `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm dev`, and `pnpm start`.

## Current limitations

- The SQLite database is local-only and file-backed; there is no hosted database, migration system, backup process, or multi-instance coordination.
- Staff role enforcement is not complete; it requires a server-backed role table/claim source and policy design in the next slice.
- Lead intake has basic required-field/email/consent validation only; there is no documented rate limiting, spam protection, or CSRF strategy.
- The admin UI currently changes status only; follow-up dates and notes are supported by the database/API but are not surfaced in the existing leads table.
- Several linked or navigational pages are not implemented yet, including privacy, disclosures, follow-up tasks, campaigns, content, and analytics.
- The implementation uses synchronous SQLite calls in server code and depends on the local Node `node:sqlite` runtime.
- No production deployment configuration is present in the inspected source.

The existing SQLite implementation remains the active draft path. The Prisma schema is production-oriented but is not connected to routes or deployed infrastructure in this phase.

