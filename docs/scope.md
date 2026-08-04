# Phase 0.1 scope baseline

This document records the current scope and the boundary for the approved private app plan. It is intentionally limited to marketing, intake, prospect management, content, and analytics. It does not authorize application-code changes in Phase 0.1.

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
- Authentication, authorization, roles, sessions, or production access controls are not implemented in the current code. They remain a required prerequisite before treating internal features as deployable.
- Production database infrastructure, cloud storage, backups, migrations, replication, or multi-instance persistence.
- New application pages or APIs beyond documenting the current repository.

## Security and data handling warning

**`/admin` is not production-safe until authentication is complete.** The current `/admin` and `/admin/leads` pages are reachable without an authentication check, and every `/api/admin/*` handler lacks authentication and authorization. The public homepage also contains a link to `/admin` labeled “Internal access.” Treat the admin UI and admin APIs as development-only until the access-control work is finished.

**SQLite is local-only.** The current database is a file-backed SQLite database at `DATABASE_PATH` or `.data/leads.sqlite`. It is not a shared production datastore, does not provide the required deployment, backup, or multi-instance guarantees, and should not be treated as the final persistence architecture.

## Current gaps and limitations

- `/privacy` and `/disclosures` are linked from the homepage and emitted in the sitemap, but route files are not present.
- Admin links for `/admin/tasks`, `/admin/campaigns`, `/admin/content`, and `/admin/analytics` are present in the dashboard markup, but those route files are not present.
- The current UI does not expose the notes or follow-up-date capabilities that exist in the database and admin API.
- Lead intake has basic required-field, email-pattern, and consent validation only. There is no documented rate limiting, spam protection, or CSRF strategy.
- There is no production deployment configuration in the inspected source.
- The current test coverage is limited to the SQLite data layer tests in `tests/db.test.mjs`.

## Phase 0.1 deliverable

The Phase 0.1 deliverable is baseline documentation only:

- `docs/architecture.md` — current structure, routes, persistence, configuration, and limitations.
- `docs/local-development.md` — prerequisites, commands, local configuration, verification, and data-reset guidance.
- `docs/scope.md` — current scope, boundaries, explicit security/database warnings, and known gaps.

No application code, tests, configuration, lockfiles, or existing working-tree changes are modified by this documentation phase, and no commit or push is part of the deliverable.

