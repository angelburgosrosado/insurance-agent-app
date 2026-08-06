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

Phase 1.1 adds the production entity schema, an idempotent non-personal seed, and a lazy Prisma server abstraction while preserving the existing SQLite draft data layer and routes. The active production deployment is Cloud Run service `insurance-agent-app`, revision `insurance-agent-app-00004-xv8`, with 100% traffic. Its image is in Artifact Registry and `DATABASE_URL` is bound from Secret Manager. The Supabase RLS hardening migration is prepared locally and is pending application; no remote database objects or cloud infrastructure are changed by this slice.

## Stack and runtime

- Next.js `16.3.0` App Router with React `19.2.8` and TypeScript.
- `pnpm@10.33.2` is the declared package manager. The checked-out runtime is Node `v22.22.2`; the database module requires a Node runtime that provides `node:sqlite`.
- Tailwind CSS 4 is integrated through `@tailwindcss/postcss`; global styles are in `src/app/globals.css`.
- The TypeScript alias `@/*` resolves to `src/*`.
- No external SQLite database package. `src/lib/db.ts` uses synchronous `node:sqlite` access through `DatabaseSync`.
- Prisma `6.19.0` and `@prisma/client` `6.19.0` are now included for the production model. Prisma validation and generation require `DATABASE_URL` to be present, but do not connect to a database; offline checks use a non-secret placeholder such as `postgresql://placeholder:placeholder@localhost:5432/placeholder`. The checked-in migration is documentation/reproducibility for the schema and has not been applied; migration and seed execution require an explicitly configured real database.

## Request and data flow

1. The public homepage renders the consultation form from `src/components/consultation-form.tsx`.
2. The browser adds `utm_source`, `utm_medium`, and `utm_campaign` query parameters to the submitted payload as `source`, `medium`, and `campaign`.
3. `POST /api/leads` validates the JSON object, required contact fields, a basic email pattern, and `consent === true`.
4. The handler normalizes string input in `leadInputFromUnknown`, inserts the record into SQLite, and returns `{ ok: true, leadId }` with HTTP 201.
5. The browser navigates to `/thank-you` after a successful submission.
6. The server-rendered admin pages read the shared database instance. The leads table calls `PATCH /api/admin/leads` to change status and follow-up date; notes are loaded and created through the authenticated notes endpoints.

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

The homepage links to `/privacy` and `/disclosures`, and those route files exist. `/admin/tasks` and `/api/admin/tasks` are implemented against the repository boundary. The admin navigation links to `/admin/campaigns`, `/admin/content`, and `/admin/analytics`, but no corresponding route files currently exist in `src/app`. `/portal` is also named in `robots.ts` but has no current route file.

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

Phase 1.1 also defines `DATABASE_URL` for Prisma's PostgreSQL datasource. The publishable key value and database credentials are intentionally not documented or committed. Prisma validation/generation can use a non-secret placeholder value. The Supabase CLI is installed locally and the linked project's current remote state can be linted without applying the pending migration. The migration files are checked in but the new RLS migration is not applied in this phase.

## Security boundary

- The admin layout and admin API handlers validate a Supabase Auth JWT with `auth.getClaims()`, then resolve the authenticated Supabase user ID against the Prisma `User.id` field. Prisma `User.role` is authoritative; only `superadmin`, `admin`, and `user` authorize staff access. Anonymous page requests redirect to `/login`, authenticated users without a staff record or with an invalid role receive a safe `/login?error=forbidden` redirect, anonymous APIs receive 401, and authenticated non-staff API callers receive 403. User-editable metadata and claims are never used for authorization. The application schema is server-only: `anon` and `authenticated` have no table privileges and no direct-access RLS policies; server-side Prisma remains the intended access path as `postgres`. Apply and verify the pending migration only through the documented Supabase CLI workflow. SQLite is local-only in this baseline; it remains the active local draft data path and is not a production database or a shared multi-instance persistence layer.

## Supabase RLS migration gate

The migration `supabase/migrations/20260804173903_harden_application_schema_rls.sql` enables RLS on all eight application tables, revokes table privileges from `anon` and `authenticated`, and closes future tables by default. It is pending application to the linked production project. From the repository root, review and apply it only after explicit authorization:

```bash
supabase migration list --linked
supabase db lint --linked
supabase db push --linked
supabase db lint --linked
supabase migration list --linked
```

`supabase db push --linked` is the apply operation and is intentionally not run by this slice. Do not place a database URL, password, or key in documentation or shell history.

## Testing surface

The repository includes `tests/db.test.mjs`, `tests/domain/lead-model.test.ts`, and `tests/auth.test.ts`. The auth tests cover safe missing/malformed environment handling and the approved role helper behavior. The package scripts provide `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm dev`, and `pnpm start`.

## Current limitations

- The SQLite database is local-only and file-backed; there is no hosted database, migration system, backup process, or multi-instance coordination.
- Staff role enforcement is implemented against the server-side Prisma role source; production readiness still requires verified staff records and database connectivity.
- Lead intake includes required-field, email-pattern, consent, and bounded in-process rate-limit validation. Spam protection, CSRF strategy, and external abuse monitoring remain incomplete.
- The admin UI supports status updates, follow-up-date editing, lazy note loading, and note creation. Full follow-up task management remains unimplemented.
- Several linked or navigational pages are not implemented yet, including follow-up tasks, campaigns, content, and analytics. Privacy and disclosure routes are implemented.
- The implementation uses synchronous SQLite calls in server code and depends on the local Node `node:sqlite` runtime.
- Dockerfile and Cloud Build deployment configuration are present; production deployment verification remains a separate gate.

The existing SQLite implementation remains the active draft path. The Prisma schema is production-oriented but is not connected to routes or deployed infrastructure in this phase.

