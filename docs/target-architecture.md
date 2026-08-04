# Approved target architecture

## Deployment

- Google Cloud project: `abglobal-insurance-app`
- Runtime target: Google Cloud Run
- Secrets: Google Secret Manager
- Logs: Google Cloud Logging
- Scheduled work: Google Cloud Scheduler or Cloud Run Jobs

## Database

- PostgreSQL provider: Supabase
- Application database access: server-side PostgreSQL client or Prisma through a protected server connection
- Supabase Auth is the authentication authority
- Production credentials and project reference are not configured in this repository
- The local Supabase CLI is not currently installed
- No remote infrastructure changes are authorized by this architecture record

## Authentication and authorization

- Authentication methods: Google OAuth and email-based authentication through Supabase Auth
- Staff roles: `superadmin`, `admin`, and `user`
- Authorization data must be stored in Supabase app metadata or a server-owned role table, never user-editable metadata
- Private admin routes require server-side session validation and role checks
- Prospect access is deferred until its scope is explicitly approved

## Google integrations

- Email: Google-based service, implementation boundary to be selected during integration work
- CRM: Google-based service, implementation boundary to be selected during integration work
- Calendar: Google Calendar
- Analytics and content measurement: Google Analytics 4
- Vendor credentials must be stored in Secret Manager and must never be sent to browser code

## Data policy

- Retention: standard policy, pending formal retention duration and legal/privacy approval
- Consent version, timestamp, and source must be stored with lead intake
- Audit events are required for private lead mutations and administrative actions
- The application remains limited to marketing, intake, prospect management, content, and analytics
- Insurance quoting, underwriting, policy issuance, claims, carrier operations, and coverage decisions remain out of scope

## Current implementation status

This is the approved target architecture. The current draft app still uses local SQLite and unauthenticated admin routes. Phase 1 must add the production data model without cutting over the draft until migrations, authentication, authorization, and deployment verification are complete.

The GCP project was verified as active using the configured Google account. Supabase project credentials, URL, database connection, and OAuth configuration have not been supplied or configured.

## Required next gates

1. Create or identify the Supabase project and provide its non-secret project reference and URL through the approved secret/configuration channel
2. Configure Supabase Auth Google provider and email provider settings
3. Confirm the exact Google email, CRM, calendar, and Analytics services
4. Approve the standard retention duration and privacy disclosures
5. Complete the Prisma schema and migration review before production cutover
6. Implement authentication and server-side staff role enforcement before exposing any admin route
7. Deploy only after secrets, database migrations, backups, and rollback procedures are verified

No production credentials are stored in this repository.

.