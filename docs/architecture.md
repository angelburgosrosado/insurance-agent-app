# Architecture baseline

This document describes the current implementation of the private insurance-agent app at Phase 0.1. It is an inventory of the repository as inspected; it is not a target-state design.

## Stack and runtime

- Next.js `16.3.0` App Router with React `19.2.8` and TypeScript.
- `pnpm@10.33.2` is the declared package manager. The checked-out runtime is Node `v22.22.2`; the database module requires a Node runtime that provides `node:sqlite`.
- Tailwind CSS 4 is integrated through `@tailwindcss/postcss`; global styles are in `src/app/globals.css`.
- The TypeScript alias `@/*` resolves to `src/*`.
- There is no external database package. `src/lib/db.ts` uses synchronous `node:sqlite` access through `DatabaseSync`.

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
| `/admin` | Server-rendered dashboard metrics and recent leads from SQLite. **Not production-safe until authentication is complete.** |
| `/admin/leads` | Server-rendered lead list with client-side status updates. **Not production-safe until authentication is complete.** |
| `POST /api/leads` | Public lead intake endpoint. `GET` is explicitly rejected with 405. |
| `GET /api/admin/leads` | Returns all leads as JSON. **No authentication or authorization is implemented.** |
| `PATCH /api/admin/leads` | Updates a lead's status and optionally follow-up date. **No authentication or authorization is implemented.** |
| `GET /api/admin/leads/notes?leadId=<id>` | Returns notes for one lead. **No authentication or authorization is implemented.** |
| `POST /api/admin/leads/notes` | Adds a note for a lead; defaults the author to `Marketing team`. **No authentication or authorization is implemented.** |
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

Only two application environment variables are referenced by the current source:

- `DATABASE_PATH` — optional SQLite filename. If absent, the relative path `.data/leads.sqlite` is used.
- `SEED_DEMO_DATA` — when exactly `true`, seeds four demo leads if the database is empty.

Environment files are ignored by Git. No environment file was read for this baseline. `next.config.ts` has no project-specific options. Metadata and sitemap URLs are hard-coded to `https://abglobalconsulting.com` in the current source.

## Security boundary

The current implementation has no authentication, authorization, session handling, or admin middleware. The public site exposes the `/admin` UI through an “Internal access” link, and the admin API handlers do not check the caller. Treat `/admin` and all `/api/admin/*` endpoints as development-only until authentication and authorization are implemented. SQLite is local-only in this baseline; it is not a production database or a shared multi-instance persistence layer.

## Testing surface

The repository includes `tests/db.test.mjs`, which exercises in-memory lead creation/status updates and lead notes. The package scripts provide `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm dev`, and `pnpm start`.

## Current limitations

- The SQLite database is local-only and file-backed; there is no hosted database, migration system, backup process, or multi-instance coordination.
- Admin pages and admin APIs lack authentication and authorization.
- Lead intake has basic required-field/email/consent validation only; there is no documented rate limiting, spam protection, or CSRF strategy.
- The admin UI currently changes status only; follow-up dates and notes are supported by the database/API but are not surfaced in the existing leads table.
- Several linked or navigational pages are not implemented yet, including privacy, disclosures, follow-up tasks, campaigns, content, and analytics.
- The implementation uses synchronous SQLite calls in server code and depends on the local Node `node:sqlite` runtime.
- No production deployment configuration is present in the inspected source.

This baseline deliberately does not change application code.

