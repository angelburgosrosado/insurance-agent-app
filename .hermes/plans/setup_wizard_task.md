# Execution Tasks: Setup Wizard

- `[x]` **Task 1: Server Actions for Setup**
  - `[x]` Create `src/app/setup/actions.ts` to read and write `.env.local`.
- `[x]` **Task 2: Setup Route & Wizard UI**
  - `[x]` Create `src/app/setup/page.tsx`.
  - `[x]` Implement the multi-step form (Supabase, Sendgrid/CRM, Deployment Summary).
- `[x]` **Task 3: Global Notification Banner**
  - `[x]` Modify `src/lib/server/env.ts` to export a `hasMissingEnv` flag.
  - `[x]` Modify `src/app/layout.tsx` to conditionally render a link to `/setup` if in dev mode and missing envs.
