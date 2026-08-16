# Execution Tasks: Phase 1 & 2

- `[x]` **Phase 1: Production Data Foundation**
  - `[x]` Create `src/lib/server/env.ts` for environment validation.
  - `[x]` Create `scripts/migrate-draft-leads.ts` to migrate SQLite data.
  - `[x]` Update `src/lib/server/leads.ts` to enforce PostgreSQL.
- `[x]` **Phase 2: Security & Private Access**
  - `[x]` Install `next-auth` packages (Chose Supabase Auth natively instead).
  - `[x]` Update Prisma schema with NextAuth models (Not needed for Supabase).
  - `[x]` Implement `src/lib/server/auth.ts` with Google Provider.
  - `[x]` Ensure `angelburgosrosado@gmail.com` defaults to `superadmin` or `admin`.
  - `[x]` Implement `middleware.ts` to protect `/admin` routes.
  - `[x]` Create `src/app/login/page.tsx`.
  - `[x]` Add audit logging utility `src/lib/server/audit.ts`.
