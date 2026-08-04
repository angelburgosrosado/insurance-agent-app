-- RLS hardening for the insurance application schema
--
-- The application uses server-side Prisma with the protected PostgreSQL
-- connection as its only database data path. Browser clients use Supabase Auth
-- for identity/session handling, not the Data API for application-table CRUD.
-- Therefore anon and authenticated receive no table privileges and no RLS
-- policies are created for them. PostgreSQL's server role remains functional.

BEGIN;

-- Keep future application tables closed to Data API roles by default.
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  REVOKE ALL ON TABLES FROM anon, authenticated;

-- Every current application table is defense-in-depth protected. With no
-- policies for anon/authenticated, RLS denies row access even if a privilege is
-- accidentally reintroduced later.
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LeadAttribution" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LeadNote" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."FollowUpTask" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ContentEntry" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Campaign" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AuditEvent" ENABLE ROW LEVEL SECURITY;

-- These tables contain staff identities, prospect PII, attribution, internal
-- notes/tasks, content controls, campaign configuration, and audit records.
-- None are directly exposed to anon/authenticated through the Supabase Data
-- API; route authorization and all CRUD remain server-side in this phase.
REVOKE ALL PRIVILEGES ON TABLE
  public."User",
  public."Lead",
  public."LeadAttribution",
  public."LeadNote",
  public."FollowUpTask",
  public."ContentEntry",
  public."Campaign",
  public."AuditEvent"
FROM anon, authenticated;

COMMENT ON TABLE public."User" IS
  'Server-only application table. Data API roles have no privileges; Prisma uses the protected PostgreSQL connection.';
COMMENT ON TABLE public."Lead" IS
  'Server-only application table. Prospect PII is not directly exposed to anon/authenticated.';
COMMENT ON TABLE public."LeadAttribution" IS
  'Server-only application table. Attribution data is accessed through server-side Prisma.';
COMMENT ON TABLE public."LeadNote" IS
  'Server-only application table. Internal notes are not directly exposed through the Data API.';
COMMENT ON TABLE public."FollowUpTask" IS
  'Server-only application table. Internal task data is accessed through server-side Prisma.';
COMMENT ON TABLE public."ContentEntry" IS
  'Server-only application table. Content administration remains behind server authorization.';
COMMENT ON TABLE public."Campaign" IS
  'Server-only application table. Campaign administration remains behind server authorization.';
COMMENT ON TABLE public."AuditEvent" IS
  'Server-only application table. Audit records are never directly exposed through the Data API.';

COMMIT;
