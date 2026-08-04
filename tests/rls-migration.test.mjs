import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationPath = new URL("../supabase/migrations/20260804173903_harden_application_schema_rls.sql", import.meta.url);
const sql = await readFile(migrationPath, "utf8");
const applicationTables = [
  "User",
  "Lead",
  "LeadAttribution",
  "LeadNote",
  "FollowUpTask",
  "ContentEntry",
  "Campaign",
  "AuditEvent",
];

test("RLS migration protects every application table", () => {
  for (const table of applicationTables) {
    assert.match(sql, new RegExp(`ALTER TABLE public\\."${table}" ENABLE ROW LEVEL SECURITY;`));
  }
});

test("RLS migration revokes Data API table access", () => {
  assert.match(sql, /REVOKE ALL PRIVILEGES ON TABLE[\s\S]+FROM anon, authenticated;/);
  assert.match(sql, /ALTER DEFAULT PRIVILEGES IN SCHEMA public[\s\S]+REVOKE ALL ON TABLES FROM anon, authenticated;/);
  assert.doesNotMatch(sql, /CREATE POLICY/i);
});

test("RLS migration documents server-only access and is transactional", () => {
  assert.match(sql, /^BEGIN;/m);
  assert.match(sql, /^COMMIT;/m);
  assert.match(sql, /server-side Prisma/i);
  assert.match(sql, /server-only application table/i);
});

console.log(`Validated ${applicationTables.length} application tables in the pending RLS migration`);
