# Phase 1.1 scope and implementation status

This document records the approved private app scope and Phase 1.1 implementation status. It is intentionally limited to marketing, intake, prospect management, content, and analytics.

## Approved platform architecture

- GCP deployment project: `abglobal-insurance-app`.
- Supabase-hosted PostgreSQL with Prisma production entities.
- Supabase Auth with Google OAuth and email-based auth is implemented for the local private-app sign-in boundary.
- Staff roles: `superadmin`, `admin`, `user`.
- Standard retention policy.
- Google services are planned for email, CRM, and calendar; Google Analytics is planned for analytics and content measurement.
- No policy, underwriting, or claims entities are in scope.

Phase 1.1 adds the Prisma schema, local server database abstraction, domain tests, and a non-personal idempotent seed. Existing SQLite routes remain unchanged. No GCP/Supabase infrastructure or remote database objects are mutated.

## In scope

### Marketing

- Public AB Global Consulting homepage at `/`.
- Current service messaging for personal insurance, business insurance, and life/health guidance.
- Anchor sections for services, approach, resources, and consultation.
- Basic metadata, Open Graph metadata, organization JSON-LD, robots rules, and sitemap generation.

### Intake

- Consultation form on the homepage.
- Required intake fields: first name, last name, email, phone, and service.
- Optional intake fields: preferred contact time and additional message.
- Required consent checkbox.
- Attribution fields captured from URL parameters: `utm_source` → `source`, `utm_medium` → `medium`, and `utm_campaign` → `campaign`.
- `POST /api/leads` validation, SQLite persistence, and redirect to `/thank-you` after success.

### Prospect management

- Local lead records with contact, service, contact timing, message, consent, attribution, status, follow-up date, and creation timestamp.
- Lead statuses: `new`, `reviewing`, `assigned`, `contacted`, `qualified`, and `closed`.
- `/admin` overview metrics and recent leads.
- `/admin/leads` list with status updates.
- Admin API support for listing leads, updating status/follow-up date, and listing/creating lead notes.

### Content and analytics boundary

- The homepage currently contains static resource-card copy for a guide, article, and FAQ.
- The planned boundary may include content and analytics work, but the current implementation has no content-management or analytics routes. Admin navigation links to `/admin/content` and `/admin/analytics` are placeholders at present.
- Attribution storage is currently limited to the three UTM-derived fields listed above; no reporting or analytics pipeline is implemented in the inspected source.

## Explicitly out of scope for this baseline

- Insurance quoting, underwriting, applications, policy issuance, claims, carrier integrations, or coverage decisions.
- A customer portal, client self-service, agent licensing/compliance workflow, or payment processing.
- Email, SMS, CRM, calendar, ad-platform, or other third-party integrations.
- Authentication, authorization, roles, and sessions are implemented for the local private-app boundary. Production readiness still requires verified production configuration, staff records, migration state, and deployment checks.
- Production database infrastructure, cloud storage, backups, migrations, replication, or multi-instance persistence.
- New application pages or APIs beyond documenting the current repository.

## Security and data handling warning

**`/admin` remains deployment-gated.** The `/admin` and `/admin/leads` pages and the current `/api/admin/*` handlers perform server-side Supabase session validation and staff-role resolution. They must not be treated as production-ready until the production database, staff role source, RLS migration, secrets, and endpoint behavior are verified together.

**SQLite is local-only.** The current database is a file-backed SQLite database at `DATABASE_PATH` or `.data/leads.sqlite`. It is not a shared production datastore, does not provide the required deployment, backup, or multi-instance guarantees, and should not be treated as the final persistence architecture.

## Current gaps and limitations

- `/privacy` and `/disclosures` are implemented as public routes, linked from the homepage, and emitted in the sitemap.
- `/admin/tasks` and `/api/admin/tasks` now provide the initial follow-up task slice. Admin links for `/admin/campaigns`, `/admin/content`, and `/admin/analytics` remain placeholders without route files.
- The current admin UI exposes follow-up-date editing and lazy internal-note retrieval/creation. Full task management remains unimplemented.
- Lead intake has required-field, email-pattern, consent, and bounded in-process rate-limit validation. Spam protection, CSRF strategy, and external abuse monitoring remain incomplete.
- Local Cloud Run deployment configuration is present. Production deployment, migration, secret, traffic, rollback, and endpoint verification remain separate gates.
- Supabase project credentials/reference are intentionally not documented or committed. Prisma schema validation and client generation require `DATABASE_URL`; use a non-secret placeholder such as `postgresql://placeholder:***@localhost:5432/placeholder` for offline checks. The checked-in migration is reproducible but is not applied by this phase; seed execution and migration application require an explicitly configured real database and remain outside this deliverable.
- The test suite includes in-memory SQLite data-layer tests and domain tests for lead status, consent, attribution normalization, and Prisma-client lifecycle behavior.

## Phase 1.1 deliverable

The Phase 1.1 deliverable includes:

- `docs/architecture.md` — current structure, routes, persistence, configuration, and limitations.
- `docs/local-development.md` — prerequisites, commands, local configuration, verification, and data-reset guidance.
- `docs/scope.md` — approved scope, boundaries, implementation status, explicit security/database warnings, and known gaps.
- `prisma/schema.prisma` — PostgreSQL production entity model.
- `prisma/migrations/` — checked-in initial PostgreSQL migration generated from the current schema; it is not applied to any database in this phase.
- `prisma/seed.ts` — idempotent seed containing no real personal data.
- `src/lib/server/db.ts` — lazy Prisma server abstraction and lead-domain normalization helpers.
- `tests/domain/lead-model.test.ts` — lead status, consent, and attribution tests.

- No remote infrastructure change, commit, or push is part of this deliverable. Staff role enforcement is implemented against the server-side Prisma `User.role` source, but production use remains gated on verified database connectivity and staff records.

