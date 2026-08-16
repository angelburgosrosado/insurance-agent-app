# Phase 1 Completion & Phase 2 Kickoff (Security & Private Access)

We are continuing with the **Private Insurance Acquisition App Implementation Plan**. Phase 0 has been completed, and Phase 1 is partially complete (the Prisma schema and database connection are in place).

The goal of this phase is to finalize the production data foundation and immediately start implementing authenticated server-side routes to secure the `/admin` area.

## Proposed Changes

### Finish Phase 1: Production Data Foundation

#### [NEW] `src/lib/server/env.ts`

Implement environment variable validation at server startup (ensuring `DATABASE_URL` is present and falling back safely if not).

#### [NEW] `scripts/migrate-draft-leads.ts`

Create a script to migrate any existing local SQLite leads into the production PostgreSQL database to preserve them during the cutover.

#### [MODIFY] `src/lib/server/leads.ts` & `src/app/api/leads/route.ts`

Ensure the backend seamlessly falls back to PostgreSQL, effectively finalizing the cutover away from local SQLite.

---

### Start Phase 2: Security & Private Access

Once the auth provider is chosen (see open questions below), we will:

1. Implement server-side sessions and role checks (`admin`, `marketing`, `advisor`, `prospect`).
2. Protect all `/admin` routes.
3. Build the `src/app/login/page.tsx` page.
4. Implement audit logging for sensitive lead data access.

## User Review Required

> [!WARNING]
> We cannot proceed with Phase 2 without selecting an Authentication Provider. The master implementation plan requires a decision on this before continuing.

## Open Questions

> [!IMPORTANT]
> **1. Authentication Provider:** Which authentication provider would you like to use for securing the application?
Answer:  Google
>
> - **Supabase Auth:** Recommended since you are already using PostgreSQL (likely on Supabase based on typical Next.js stacks).
> - **Auth.js (NextAuth):** Good for self-hosted or OAuth (Google, Microsoft) integrations.
Answer:  Ok
> - **Clerk:** Fastest drop-in UI, but requires a 3rd-party SaaS subscription.

Answer:  Create the necessary changes that will allow for this part to be run wisely.
>
> **2. Admin Users:** Do you want a default initial administrator account created (e.g., your email), or should we build an invite/setup flow?
 Setup invite/flow but add my email in case of any changes that I did not read.  

## Verification Plan

### Automated Tests

- Run `npm run test` to verify auth boundaries.
- Ensure the migration script successfully exports/imports mock leads without data loss.

### Manual Verification

- Attempt to access `/admin` while logged out (should redirect to `/login`).
- Verify that a logged-in user with the `admin` role can access the dashboard.
