# Execution Tasks: Phase 3

- `[x]` **Task 3.1: Server-driven Admin Metrics**
  - `[x]` Create `src/lib/server/admin-metrics.ts` to query DB metrics.
  - `[x]` Modify `src/app/admin/page.tsx` to use live metrics.
- `[x]` **Task 3.2: Lead List Filtering and Pagination**
  - `[x]` Create `src/components/lead-filters.tsx`.
  - `[x]` Modify `src/components/leads-table.tsx` to support real data/pagination.
  - `[x]` Modify `src/app/admin/leads/page.tsx` for server-side fetching.
- `[x]` **Task 3.3: Lead Detail View, Notes, and Tasks**
  - `[x]` Create `src/app/admin/leads/[id]/page.tsx`.
  - `[x]` Create `src/components/lead-detail.tsx`.
  - `[x]` Create `src/components/lead-notes.tsx`.
  - `[x]` Create `src/components/follow-up-task-form.tsx`.
  - `[x]` Create `src/app/api/admin/leads/[id]/route.ts`.
- `[x]` **Task 3.4: Consent and Retention Controls**
  - `[x]` Create `src/lib/server/retention.ts` (1 year rule).
  - `[x]` Create `scripts/retention-report.ts`.
