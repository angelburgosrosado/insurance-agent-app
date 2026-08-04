import assert from "node:assert/strict";
import test from "node:test";
import { getSupabaseConfig } from "../src/lib/supabase/env";
import { hasStaffAccess, isStaffRole, resolveStaffAuthorization } from "../src/lib/auth/authorization";

test("reports the Supabase configuration blocker without throwing", () => {
  assert.deepEqual(
    getSupabaseConfig({
      NEXT_PUBLIC_SUPABASE_URL: undefined,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: undefined,
    }),
    {
      configured: false,
      missing: [
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      ],
    },
  );
});

test("accepts a valid Supabase URL and publishable key", () => {
  assert.deepEqual(
    getSupabaseConfig({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
    }),
    {
      configured: true,
      url: "https://example.supabase.co",
      publishableKey: "sb_publishable_test",
    },
  );
});

test("rejects malformed or secret-looking public configuration", () => {
  const result = getSupabaseConfig({
    NEXT_PUBLIC_SUPABASE_URL: "not-a-url",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "service_role_secret",
  });

  assert.equal(result.configured, false);
  if (!result.configured) {
    assert.deepEqual(result.missing, []);
    assert.deepEqual(result.invalid, [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    ]);
  }
});

test("recognizes only the approved staff roles", () => {
  assert.equal(isStaffRole("superadmin"), true);
  assert.equal(isStaffRole("admin"), true);
  assert.equal(isStaffRole("user"), true);
  assert.equal(isStaffRole("owner"), false);
  assert.equal(isStaffRole(undefined), false);
});

test("allows authenticated staff roles but not anonymous or unknown roles", () => {
  assert.equal(hasStaffAccess({ id: "staff-1", role: "admin" }), true);
  assert.equal(hasStaffAccess({ id: "staff-2", role: "user" }), true);
  assert.equal(hasStaffAccess({ id: "staff-3", role: "superadmin" }), true);
  assert.equal(hasStaffAccess({ id: "user-1", role: undefined }), false);
  assert.equal(hasStaffAccess(null), false);
});

// This slice deliberately does not infer roles from user-editable metadata.
// A server-backed role source is required before role-based enforcement ships.
 test("does not treat user metadata as an authorization source", () => {
  assert.equal(
    hasStaffAccess({ id: "user-1", user_metadata: { role: "admin" } }),
    false,
  );
});

test("authorizes only a Prisma User record whose id matches the Supabase user id", async () => {
  const repository = {
    user: {
      findUnique: async ({ where }: { where: { id: string } }) =>
        where.id === "staff-1" ? { role: "admin" } : null,
    },
  };

  assert.deepEqual(await resolveStaffAuthorization({ id: "staff-1" }, repository), {
    authenticated: true,
    authorized: true,
    role: "admin",
  });
  assert.deepEqual(await resolveStaffAuthorization({ id: "missing" }, repository), {
    authenticated: true,
    authorized: false,
    reason: "staff_record_missing",
  });
});

test("authorizes every approved Prisma role and rejects invalid roles", async () => {
  for (const role of ["superadmin", "admin", "user"] as const) {
    const repository = { user: { findUnique: async () => ({ role }) } };
    assert.equal((await resolveStaffAuthorization({ id: "staff" }, repository)).authorized, true);
  }

  const invalid = { user: { findUnique: async () => ({ role: "owner" }) } };
  assert.deepEqual(await resolveStaffAuthorization({ id: "staff" }, invalid), {
    authenticated: true,
    authorized: false,
    reason: "invalid_staff_role",
  });
});

test("rejects anonymous authorization without querying Prisma", async () => {
  let queried = false;
  const repository = { user: { findUnique: async () => { queried = true; return { role: "admin" }; } } };
  assert.deepEqual(await resolveStaffAuthorization(null, repository), {
    authenticated: false,
    authorized: false,
    reason: "anonymous",
  });
  assert.equal(queried, false);
});
