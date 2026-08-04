# Private Insurance Acquisition App Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Advance the current AB Global Consulting draft into a secure private marketing and lead-management application without expanding into policy administration, underwriting, claims, or coverage issuance

**Architecture:** Retain the Next.js App Router application and existing visual system. Replace draft-only infrastructure progressively with authenticated server-side admin routes, a production PostgreSQL database, database-backed content, and explicit integration boundaries. Keep the public acquisition surface separate from private operations

**Tech Stack:** Next.js 16.3.0, React 19, TypeScript, Tailwind CSS 4, PostgreSQL, Prisma, secure cookie-based authentication, transactional email provider, GA4, CRM/webhook adapters, automated tests, deployment platform selected during infrastructure phase

---

## CURRENT BASELINE

- Project: `/Volumes/MacAI/ABGlobalCEO/insurance-agent-app`
- Public homepage, consultation form, thank-you page, sitemap, robots, and metadata exist
- Draft SQLite persistence uses Node 22 `node:sqlite` in `src/lib/db.ts`
- `/admin` and `/admin/leads` exist but are not authenticated
- Lead status updates and note API exist
- No production authentication, role enforcement, PostgreSQL, CMS, prospect portal, email delivery, CRM integration, analytics event layer, or deployment configuration exists
- Existing working-tree changes are uncommitted and must be preserved
- Do not expose or commit `.env` files, application passwords, API keys, or production records

## OPERATING RULES

- Work in explicit phases
- Do not begin code generation for a phase until its architecture and acceptance criteria are approved
- Use TDD for behavior changes: failing test, expected failure, minimal implementation, passing test, regression suite
- Do not commit, push, or rewrite history without explicit instruction
- Keep the insurance scope limited to marketing, intake, prospect management, content, and analytics
- Do not add real policy processing, underwriting, claims, contract issuance, or coverage decisions
- Treat the current SQLite database as local draft infrastructure only
- Preserve migration and rollback paths before deleting draft functionality

---

# PHASE 0 — BASELINE AND PRODUCT CONTROL

### Task 0.1: Freeze and document the current draft baseline

**Objective:** Create a reproducible starting point before production work begins

**Files:**
- Create: `docs/architecture.md`
- Create: `docs/local-development.md`
- Create: `docs/scope.md`

**Actions:**
- Record current routes, data fields, environment variables, local commands, and known limitations
- Document that `/admin` is not production-safe until authentication is complete
- Mark SQLite as local-only

**Validation:**
- `pnpm run test`
- `pnpm run lint`
- `pnpm run build`

### Task 0.2: Establish CI quality gates

**Objective:** Run the same verification commands on every change

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `package.json`

**Actions:**
- Define Node and pnpm versions
- Run install, test, lint, typecheck, and build
- Add dependency audit without printing secrets

**Validation:**
- Run the workflow locally where possible
- Confirm a deliberate test failure causes CI failure

---

# PHASE 1 — PRODUCTION DATA FOUNDATION

### Task 1.1: Define the production entity model

**Objective:** Establish the minimum normalized schema for leads, attribution, notes, tasks, users, content, and audit records

**Files:**
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Create: `src/lib/server/db.ts`
- Create: `tests/domain/lead-model.test.ts`

**Entities:**
- `User`: id, email, name, role, password hash or external auth id, timestamps
- `Lead`: contact data, service, consent, status, follow-up date, timestamps
- `LeadAttribution`: source, medium, campaign, landing page, referrer
- `LeadNote`: lead, author, body, timestamp
- `FollowUpTask`: lead, assignee, due date, status, priority
- `ContentEntry`: type, slug, title, summary, body, SEO metadata, status, published timestamp
- `Campaign`: name, channel, status, dates
- `AuditEvent`: actor, action, entity, entity id, metadata, timestamp

**Validation:**
- Schema validation passes
- Test verifies valid lead statuses, required consent, and attribution normalization

### Task 1.2: Add migrations and environment validation

**Objective:** Make database startup explicit and fail safely when production configuration is incomplete

**Files:**
- Create: `prisma/migrations/*`
- Create: `src/lib/server/env.ts`
- Create: `.env.example`
- Modify: `.gitignore`
- Modify: `package.json`

**Actions:**
- Add `DATABASE_URL`
- Add separate `DIRECT_URL` only if the selected hosted PostgreSQL provider requires it
- Validate environment variables at server startup
- Keep `.data/` SQLite path limited to local draft mode

**Validation:**
- Missing required environment variables produce a clear startup error
- Migration applies to an empty test database
- No secrets appear in logs

### Task 1.3: Migrate draft leads into PostgreSQL

**Objective:** Preserve current demo and locally submitted lead records during the infrastructure transition

**Files:**
- Create: `scripts/migrate-draft-leads.ts`
- Modify: `src/lib/db.ts`
- Modify: `src/app/api/leads/route.ts`
- Modify: `src/app/api/admin/leads/route.ts`
- Modify: `src/app/api/admin/leads/notes/route.ts`

**Validation:**
- Export/import count matches
- Duplicate handling is deterministic
- API behavior remains unchanged for valid and invalid submissions
- SQLite remains read-only fallback until PostgreSQL cutover is approved

---

# PHASE 2 — SECURITY AND PRIVATE ACCESS

### Task 2.1: Select and document the authentication boundary

**Objective:** Choose one supported auth approach before implementing protected routes

**Decision required:** Managed auth provider versus self-hosted credentials. Preferred default is a managed provider with secure HTTP-only session cookies and documented role claims

**Files:**
- Modify: `docs/architecture.md`
- Create: `docs/security-model.md`

**Roles:**
- `admin`: user and system configuration
- `marketing`: leads, campaigns, content, analytics
- `advisor`: assigned leads, notes, follow-up tasks
- `prospect`: own portal data only

### Task 2.2: Implement server-side sessions and role checks

**Objective:** Prevent unauthenticated access to private routes and APIs

**Files:**
- Create: `src/lib/server/auth.ts`
- Create: `src/lib/server/authorization.ts`
- Create: `src/middleware.ts` if required by the selected auth implementation
- Create: `src/app/login/page.tsx`
- Create: `src/app/api/auth/*`
- Create: `tests/security/auth.test.ts`
- Create: `tests/security/authorization.test.ts`

**Validation:**
- Anonymous users cannot access `/admin`, `/admin/leads`, or admin APIs
- Users cannot invoke APIs outside their role
- Session cookies are HTTP-only, secure in production, same-site, and bounded by expiry
- Logout invalidates the session
- Rate limiting and lockout behavior is tested for login endpoints

### Task 2.3: Add audit logging and security controls

**Objective:** Make private lead operations traceable and resilient

**Files:**
- Create: `src/lib/server/audit.ts`
- Create: `src/lib/server/rate-limit.ts`
- Modify: all mutating admin route handlers
- Create: `tests/security/audit.test.ts`

**Controls:**
- Audit lead reads only where required by policy
- Audit status, note, assignment, and deletion changes
- Validate payload size and field lengths
- Sanitize logs
- Add CSRF protection if the auth design requires it
- Add security headers and restrictive content security policy after verifying Next.js compatibility

---

# PHASE 3 — LEAD OPERATIONS

### Task 3.1: Replace admin overview mock behavior with server queries

**Objective:** Display live PostgreSQL metrics and recent leads

**Files:**
- Modify: `src/app/admin/page.tsx`
- Create: `src/lib/server/admin-metrics.ts`
- Create: `tests/admin/admin-metrics.test.ts`

**Acceptance criteria:**
- Counts are derived from the database
- Date windows use the server timezone policy
- Empty states are explicit
- No static demo metrics remain in production mode

### Task 3.2: Complete lead list filtering and pagination

**Objective:** Provide usable lead operations for marketing and advisor roles

**Files:**
- Modify: `src/app/admin/leads/page.tsx`
- Modify: `src/components/leads-table.tsx`
- Create: `src/components/lead-filters.tsx`
- Modify: `src/app/api/admin/leads/route.ts`
- Create: `tests/admin/leads-api.test.ts`

**Features:**
- Search by name and email
- Filter by status, service, source, assignee, and date range
- Stable pagination
- CSV export with authorization and audit event

### Task 3.3: Add lead detail, notes, assignments, and follow-up tasks

**Objective:** Complete the internal prospect workflow

**Files:**
- Create: `src/app/admin/leads/[id]/page.tsx`
- Create: `src/components/lead-detail.tsx`
- Create: `src/components/lead-notes.tsx`
- Create: `src/components/follow-up-task-form.tsx`
- Create: `src/app/api/admin/leads/[id]/route.ts`
- Create: `src/app/api/admin/tasks/route.ts`
- Create: `tests/admin/lead-detail.test.ts`

**Acceptance criteria:**
- Status changes are role-restricted and audited
- Notes are append-only or explicitly editable with audit history
- Tasks support assignee, due date, priority, completion, and overdue state
- Private contact data is not rendered to unauthorized users

### Task 3.4: Add consent and retention controls

**Objective:** Make lead records operationally safe for privacy review

**Files:**
- Create: `src/lib/server/retention.ts`
- Create: `scripts/retention-report.ts`
- Modify: lead schema and detail pages
- Create: `tests/security/retention.test.ts`

**Actions:**
- Store consent text/version and timestamp
- Support correction and deletion requests
- Define retention period with business/legal approval
- Never silently delete records without an audit event

---

# PHASE 4 — PUBLIC ACQUISITION AND SEO

### Task 4.1: Build service page architecture

**Objective:** Create indexable, reusable pages for each approved insurance guidance area

**Files:**
- Create: `src/app/services/[slug]/page.tsx`
- Create: `src/lib/content/services.ts`
- Create: `src/components/service-page.tsx`
- Create: `tests/seo/service-pages.test.ts`

**Acceptance criteria:**
- Each page has one H1, canonical metadata, descriptive title, description, CTA, FAQ block, and internal links
- Copy avoids unsupported financial or insurance promises
- Pages are excluded from indexing until content approval is complete

### Task 4.2: Add content and resource center foundations

**Objective:** Support approved educational content without introducing an uncontrolled CMS

**Files:**
- Create: `src/app/resources/page.tsx`
- Create: `src/app/resources/[slug]/page.tsx`
- Create: `src/lib/content/*`
- Create: `src/app/api/admin/content/route.ts`
- Create: `tests/content/content-workflow.test.ts`

**Decision required:** Database-driven content in the private admin versus a headless CMS. Use database-driven content for the first release unless editorial volume requires a CMS

### Task 4.3: Complete structured data and technical SEO

**Objective:** Make approved public pages search-ready and measurable

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`
- Create: `src/lib/seo/schema.ts`
- Create: `tests/seo/metadata.test.ts`

**Actions:**
- Add Organization or ProfessionalService schema only after factual business details are supplied
- Add BreadcrumbList and FAQPage schema where content qualifies
- Add canonical and alternate metadata rules
- Add redirects and not-found handling
- Verify sitemap excludes private routes and draft content

---

# PHASE 5 — PROSPECT EXPERIENCE

### Task 5.1: Define the prospect account boundary

**Objective:** Confirm what the prospect portal may contain without becoming a policy-processing system

**Decision required:** Portal scope must be limited to profile, communication preferences, consultation requests, appointment status, and approved documents or messages

**Files:**
- Create: `docs/prospect-portal-scope.md`
- Modify: `docs/scope.md`

### Task 5.2: Implement prospect registration and profile

**Objective:** Allow prospects to manage their own intake information securely

**Files:**
- Create: `src/app/portal/*`
- Create: `src/components/portal/*`
- Create: `src/app/api/portal/*`
- Create: `tests/portal/profile.test.ts`

**Validation:**
- Prospect can access only their own record
- Staff roles cannot accidentally inherit prospect-only UI assumptions
- Consent preferences are versioned
- Password reset and account deletion flows are tested if password auth is selected

### Task 5.3: Add consultation scheduling boundary

**Objective:** Support a consultation request without implementing coverage or policy decisions

**Files:**
- Create: `src/app/api/portal/appointments/route.ts`
- Create: `src/components/appointment-request.tsx`
- Create: `tests/portal/appointments.test.ts`

**Integration:** Use a calendar provider adapter. Keep provider-specific code out of domain logic

---

# PHASE 6 — MARKETING INTEGRATIONS AND ANALYTICS

### Task 6.1: Add first-party event tracking

**Objective:** Define reliable conversion events before adding vendor scripts

**Files:**
- Create: `src/lib/analytics/events.ts`
- Create: `src/components/analytics-provider.tsx`
- Modify: `src/components/consultation-form.tsx`
- Create: `tests/analytics/events.test.ts`

**Events:**
- `page_view`
- `cta_view`
- `cta_click`
- `form_start`
- `form_step_complete`
- `lead_submit_success`
- `lead_submit_error`
- `consultation_request`

**Controls:** Consent-aware loading, no raw sensitive fields, stable event names, UTM preservation

### Task 6.2: Add GA4 and ad platform adapters

**Objective:** Integrate analytics without coupling the application to one vendor

**Files:**
- Create: `src/lib/analytics/providers/ga4.ts`
- Create: `src/lib/analytics/providers/meta.ts`
- Create: `src/lib/analytics/dispatcher.ts`
- Create: `docs/analytics-events.md`

**Validation:**
- Scripts load only after required consent
- Events are observable in local debug mode
- Production identifiers are environment variables

### Task 6.3: Add email and CRM webhook delivery

**Objective:** Deliver new lead notifications and optional CRM records with retries and observability

**Files:**
- Create: `src/lib/integrations/email.ts`
- Create: `src/lib/integrations/crm.ts`
- Create: `src/lib/server/jobs.ts`
- Create: `src/app/api/webhooks/*`
- Create: `tests/integrations/lead-delivery.test.ts`

**Requirements:**
- Idempotency keys
- Retry with bounded backoff
- Dead-letter or failure record
- No blocking lead creation on vendor outage
- Redacted structured logs

---

# PHASE 7 — CAMPAIGNS, CONTENT, AND INTERNAL ANALYTICS

### Task 7.1: Add campaign and landing page models

**Objective:** Make campaign traffic and landing pages manageable by authorized staff

**Files:**
- Create: `src/app/admin/campaigns/*`
- Create: `src/app/admin/content/*`
- Modify: Prisma schema and migrations
- Create: `tests/admin/campaigns.test.ts`

**Acceptance criteria:**
- Draft, review, publish, archive states
- Preview links do not expose unpublished content publicly
- Campaign attribution maps to leads
- Slugs and redirects are controlled

### Task 7.2: Add internal analytics summaries

**Objective:** Display actionable funnel metrics without fabricating attribution

**Files:**
- Create: `src/app/admin/analytics/page.tsx`
- Create: `src/lib/server/analytics-queries.ts`
- Create: `tests/admin/analytics-queries.test.ts`

**Metrics:**
- Visits and CTA interactions where available
- Form starts and completions
- Leads by source, medium, campaign, service, and status
- Follow-up completion
- Time-to-contact

---

# PHASE 8 — DEPLOYMENT, COMPLIANCE, AND RELEASE

### Task 8.1: Select deployment topology and secrets management

**Objective:** Define a production environment that protects private data

**Decision required:** Cloud Run, Vercel, or another approved platform. The choice must support PostgreSQL, secrets, scheduled jobs, logs, and rollback

**Files:**
- Create: `docs/deployment.md`
- Create: `Dockerfile` or platform configuration
- Create: `.github/workflows/deploy.yml`
- Create: `infra/*` only if infrastructure-as-code is approved

**Validation:**
- Preview and production environments are isolated
- Secrets are injected by the platform
- Database backups and restore procedure are documented
- Health check and rollback are tested

### Task 8.2: Run security and privacy review

**Objective:** Confirm the private app is safe for real users and staff

**Files:**
- Create: `docs/security-review.md`
- Create: `docs/privacy-data-map.md`
- Create: `docs/incident-response.md`

**Checklist:**
- Authentication and authorization
- Input validation and output encoding
- Rate limits
- Security headers
- Dependency audit
- Data retention and deletion
- Consent and disclosure text
- Log redaction
- Backup encryption
- Access review
- Vulnerability response

### Task 8.3: Release candidate verification

**Objective:** Prove the system works end to end in a production-like environment

**Files:**
- Create: `tests/e2e/public-lead-flow.spec.ts`
- Create: `tests/e2e/admin-lead-flow.spec.ts`
- Create: `docs/release-checklist.md`

**Commands:**
- `pnpm run test`
- `pnpm run lint`
- `pnpm exec tsc --noEmit`
- `pnpm run build`
- Browser smoke test for public submission
- Browser smoke test for unauthorized admin access
- Browser smoke test for authorized status and note updates
- Database migration and rollback test
- Vendor failure and retry test

---

# REQUIRED DECISIONS BEFORE PHASE 1 EXECUTION

1. Production deployment target
2. PostgreSQL provider
3. Authentication provider and whether prospects need accounts in v1
4. Approved staff roles and administrator list
5. Business name, domain, phone, service area, disclosures, licensing, and privacy policy content
6. Lead retention period and deletion process
7. Email provider and notification recipients
8. CRM provider or webhook destination
9. Calendar provider, if scheduling is required
10. Analytics and advertising consent requirements
11. Whether resources and service pages launch in v1 or remain private drafts

# DEFINITION OF DONE

- Public acquisition flow works on desktop and mobile
- Leads persist in production PostgreSQL
- Admin routes and APIs are authenticated and role-restricted
- Lead status, notes, assignment, follow-up, consent, and audit history work
- Prospect portal scope is implemented or explicitly deferred
- Approved service/resource pages have complete metadata and schema
- Analytics and integrations are consent-aware, retryable, and observable
- No private route or sensitive lead data is publicly accessible
- CI, tests, lint, typecheck, build, migration, backup, and rollback procedures pass
- Compliance and security review is documented
- Deployment and release checklist is complete
- No policy administration, underwriting, claims, contract issuance, or coverage decision logic has been introduced

# HANDOFF ORDER

Execute in this order:

1. Phase 0 baseline and CI
2. Phase 1 production data foundation
3. Phase 2 security and private access
4. Phase 3 lead operations
5. Phase 4 public acquisition and SEO
6. Phase 5 prospect experience if approved
7. Phase 6 analytics and integrations
8. Phase 7 campaigns and internal analytics
9. Phase 8 deployment and release

Plan complete and saved. Execute only after the required decisions are approved, using strict TDD for each implementation task
