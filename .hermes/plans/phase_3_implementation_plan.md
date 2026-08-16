# Phase 3: Lead Operations Implementation Plan

The objective of Phase 3 is to replace the mock data and placeholder behaviors in the admin dashboard with real server queries to PostgreSQL using Prisma, and to build out a robust, production-ready lead management interface.

## Proposed Changes

### Task 3.1: Server-driven Admin Metrics
- **[NEW]** `src/lib/server/admin-metrics.ts`: Database queries using Prisma to calculate total leads, new leads this week, conversion rate, etc.
- **[MODIFY]** `src/app/admin/page.tsx`: Update the main dashboard to fetch live metrics instead of using hardcoded mock data.

### Task 3.2: Lead List Filtering and Pagination
- **[NEW]** `src/components/lead-filters.tsx`: A robust filter bar allowing searches by name/email, status filtering, and date range filtering.
- **[MODIFY]** `src/components/leads-table.tsx`: Introduce stable server-side pagination and robust table rendering.
- **[MODIFY]** `src/app/admin/leads/page.tsx`: Fetch paginated and filtered data using server components to feed into the table.

### Task 3.3: Lead Detail View, Notes, and Tasks
- **[NEW]** `src/app/admin/leads/[id]/page.tsx`: An isolated detail page for a specific lead.
- **[NEW]** `src/components/lead-detail.tsx`: Display lead information, status change dropdown, and consent records.
- **[NEW]** `src/components/lead-notes.tsx`: A timeline of notes left by admins.
- **[NEW]** `src/components/follow-up-task-form.tsx`: UI for creating tasks related to following up with a lead.
- **[NEW]** `src/app/api/admin/leads/[id]/route.ts`: API route for patching lead statuses and assigning users.

### Task 3.4: Consent and Retention Controls
- **[NEW]** `src/lib/server/retention.ts`: Business logic to identify leads past their retention period.
- **[NEW]** `scripts/retention-report.ts`: A script to generate a report on leads that should be anonymized or deleted.

## User Review Required

> [!WARNING]
> This phase will replace the existing visual mocks in `/admin` with real database connections. If there are any specific layout requests for the lead detail view (e.g. side-by-side vs stacked), please let me know.

## Open Questions

> [!IMPORTANT]
> 1. **Data Export:** Do you require the ability to export the lead table to CSV in this phase?
> 2. **Retention Policy:** Do you have a specific time period (e.g. 1 year, 3 years) after which leads should be considered "expired" for data retention purposes?

## Verification Plan
### Automated Tests
- We will add automated tests using `tsx --test` to ensure the metrics calculations and lead updates function correctly.

### Manual Verification
- We will log in to `/admin` as `angelburgosrosado@gmail.com`.
- We will view the dashboard metrics and confirm they reflect the seeded SQLite leads that were migrated to Postgres.
- We will click on a lead, add a note, and change its status.
