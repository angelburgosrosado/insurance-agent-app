# Local development

These instructions describe the current repository and scripts. They assume a checkout at `/Volumes/MacAI/ABGlobalCEO/insurance-agent-app` or an equivalent local path.

## Prerequisites

- Node.js with `node:sqlite` available. The inspected environment is Node `v22.22.2`.
- pnpm `10.33.2`, matching the `packageManager` field in `package.json`.
- A local checkout of the repository.

Do not read or commit `.env*` files. They are ignored by Git. The SQLite application flow currently reads only `DATABASE_PATH` and `SEED_DEMO_DATA`; neither is required for the default local flow. Prisma validation and client generation require `DATABASE_URL`, even offline; use a non-secret placeholder such as `postgresql://placeholder:placeholder@localhost:5432/placeholder` when no real Supabase URL is configured.

## Install dependencies

From the repository root:

```bash
pnpm install
```

The lockfile is present and should be used for reproducible installs.

## Run the development server

```bash
pnpm dev
```

Open `http://localhost:3000`. The public homepage is `/`; the confirmation page is `/thank-you`; the current internal pages are `/admin` and `/admin/leads`.

The first database access creates `.data/leads.sqlite` and its parent directory. `/.data/` is ignored by Git. **SQLite is local-only in this baseline**: it is suitable for local development and tests, not for shared production persistence or horizontally scaled deployments.

## Optional local configuration

The default database path is `.data/leads.sqlite`. To use another local SQLite file, set `DATABASE_PATH` for the command:

```bash
DATABASE_PATH=.data/alternate.sqlite pnpm dev
```

To seed four demo leads into an empty database, set `SEED_DEMO_DATA=true`:

```bash
SEED_DEMO_DATA=true pnpm dev
```

Seeding is conditional on the database being empty; it does not reset or overwrite existing records. Keep demo data out of any environment containing real prospect information.

## Verify the project

Run the repository's current scripts from the root:

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm test` runs both the in-memory SQLite tests in `tests/db.test.mjs` and the domain tests in `tests/domain/lead-model.test.ts` with Node's test runner and `tsx`. The tests cover lead creation, status/follow-up updates, internal notes, consent validation, attribution normalization, and Prisma-client lifecycle behavior. To validate or generate Prisma artifacts without a real database, set the placeholder URL before the command:

```bash
DATABASE_URL='postgresql://placeholder:placeholder@localhost:5432/placeholder' pnpm exec prisma validate
DATABASE_URL='postgresql://placeholder:placeholder@localhost:5432/placeholder' pnpm exec prisma generate
```

The migration files under `prisma/migrations/` are checked in for reproducibility but are not applied by these instructions or by Phase 1.1. Do not run migration or seed commands against remote infrastructure without explicit authorization. The active production deployment is Cloud Run revision `insurance-agent-app-00004-xv8` with 100% traffic; the Supabase RLS migration is pending application. `pnpm start` starts the previously generated production build:

```bash
pnpm start
```

A production start requires a successful `pnpm build` first.

## Supabase schema and RLS verification

The application schema is server-only. Prisma uses the protected server-side PostgreSQL connection; `anon` and `authenticated` must not directly read or mutate application tables through the Supabase Data API. The migration created with `supabase migration new harden_application_schema_rls` enables RLS on `User`, `Lead`, `LeadAttribution`, `LeadNote`, `FollowUpTask`, `ContentEntry`, `Campaign`, and `AuditEvent`, revokes their table privileges from both Data API roles, and adds no direct-access policies. The migration is local and pending application; this slice does not mutate Supabase.

Without secrets, inspect and verify the linked remote state with:

```bash
supabase migration list --linked
supabase db lint --linked
```

After explicit approval to apply the pending migration, run:

```bash
supabase db push --linked
supabase db lint --linked
supabase migration list --linked
```

`supabase db push --linked` changes the linked database and is not part of ordinary local development. Never print or commit credentials, connection strings, or environment files.

## Current local endpoints

- `POST /api/leads` accepts JSON lead intake and returns HTTP 201 with a lead ID on success.
- `GET /api/admin/leads` lists local leads.
- `PATCH /api/admin/leads` updates a lead status and can accept a follow-up date.
- `GET /api/admin/leads/notes?leadId=<id>` lists local notes.
- `POST /api/admin/leads/notes` adds a local note.

The admin pages and `/api/admin/*` endpoints now require a server-validated Supabase Auth session and redirect anonymous browser requests to `/login` (API requests receive HTTP 401). The existing SQLite data path is unchanged. Role enforcement is intentionally not complete: no server-backed staff-role source is configured yet, so this slice must not be treated as a role authorization boundary.

### Local authentication configuration

Authentication is wired with `@supabase/ssr` and `@supabase/supabase-js`. The local runtime provides `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` through the ignored `.env.local` file. Google OAuth and email magic-link sign-in are enabled in the live Supabase Auth project.

The login page sends both methods to `${window.location.origin}/auth/callback`; `/auth/callback` exchanges the authorization code and `/auth/signout` clears the server session. Configure these Supabase Auth URL settings:

- Local Site URL: `http://localhost:3000`
- Local Redirect URL: `http://localhost:3000/auth/callback`
- Eventual production Site URL: `https://<approved-production-domain>`
- Eventual production Redirect URL: `https://<approved-production-domain>/auth/callback`

Replace `<approved-production-domain>` only after the production domain is approved; no production domain is configured by this repository.

## Reset local data

Stop the development server before removing the local database. The default database uses SQLite WAL mode, so remove the database sidecar files together with the main file when resetting:

```bash
rm -f .data/leads.sqlite .data/leads.sqlite-shm .data/leads.sqlite-wal
```

This permanently deletes local leads and notes. Do not run the reset command against a path containing data that must be retained.

## Known local limitations

- The project assumes a Node runtime that exposes `node:sqlite`; an older Node version may fail when loading `src/lib/db.ts`.
- The checked-in Prisma migration is not applied locally; the active production deployment is Cloud Run revision `insurance-agent-app-00004-xv8`. The Supabase RLS migration is prepared but pending application.
- Supabase Google OAuth and email authentication are enabled and locally wired. Staff role enforcement still requires a server-backed role source.
- Intake validation is basic and does not provide rate limiting, spam protection, or a documented CSRF strategy.
- `/privacy` and `/disclosures` are linked and included in the generated sitemap but do not currently have route files. Admin navigation also includes placeholder links for tasks, campaigns, content, and analytics without corresponding route files.
- The current admin table exposes status changes, while database/API support for notes and follow-up dates is not fully represented in the UI.

