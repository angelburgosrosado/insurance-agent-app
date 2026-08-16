# Phase 5 Implementation Plan: Prospect Experience

This phase introduces a dedicated, secure portal where prospects can manage their own intake information, view consultation statuses, and update communication preferences. 

## User Review Required
> [!IMPORTANT]
> The prospect portal is explicitly bounded to prevent "scope creep" into policy administration. Prospects will only be able to view their profile, communication preferences, and consultation appointment statuses. No coverage details, claims, or contract issuances will be handled here.

## Open Questions
1. **Authentication:** Currently, we are using Supabase for authentication (with Google as the main provider for admin). Do you want prospects to sign up using standard Email/Password, or should they also use Google OAuth to access the portal?
2. **Scheduling Adapter:** For consultation scheduling, what calendar provider do you intend to use? (e.g., Calendly, Google Calendar API, or just an internal form request?)

## Proposed Changes

### Task 5.1: Define Prospect Account Boundary
Clearly document the boundaries of what the portal will provide.

#### [NEW] `docs/prospect-portal-scope.md`
A document explicitly outlining what is allowed (intake, appointments, profile) and what is strictly forbidden (policy processing, claims, underwriting).

---

### Task 5.2: Prospect Registration and Profile
Build the secure user interface and API for prospects to manage their data.

#### [NEW] `src/app/portal/layout.tsx` & `src/app/portal/page.tsx`
The primary dashboard for prospects after logging in.

#### [NEW] `src/app/portal/profile/page.tsx`
A page allowing prospects to update their contact details, versioned consent preferences, and request account deletion.

#### [NEW] `src/app/api/portal/profile/route.ts`
Protected API endpoints where prospects can only read/update their own `Lead` record based on the authenticated user ID.

---

### Task 5.3: Consultation Scheduling Boundary
Provide a clear path for booking without leaking into policy specifics.

#### [NEW] `src/components/appointment-request.tsx`
A UI component embedding the calendar adapter or scheduling form.

#### [NEW] `src/app/api/portal/appointments/route.ts`
API for handling appointment requests and updating the `Lead` status or triggering an internal `FollowUpTask` for the assigned advisor.

## Verification Plan

### Automated Tests
- Build verification via `npm run build`.

### Manual Verification
- Test registration/login as a "Prospect" role.
- Ensure prospects cannot access `/admin` routes.
- Ensure a prospect can only retrieve their specific Lead ID through the portal APIs.
- Validate that consent updates are correctly logged with timestamps.
