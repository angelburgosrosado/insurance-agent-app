import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/env";
import { getPrismaClient } from "@/lib/server/db";
import {
  resolveStaffAuthorization,
  type StaffAuthorization,
  type StaffUserRepository,
} from "@/lib/auth/authorization";

export async function requireAuthenticatedUser() {
  if (!getSupabaseConfig().configured) redirect("/login");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) redirect("/login");
  return { id: data.claims.sub, claims: data.claims };
}

export async function getAuthenticatedUser() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims?.sub) return null;
    return { id: data.claims.sub, claims: data.claims };
  } catch {
    return null;
  }
}

export async function getStaffAuthorization(
  repository?: StaffUserRepository,
): Promise<StaffAuthorization> {
  const identity = await getAuthenticatedUser();
  if (!identity) return resolveStaffAuthorization(null, repository ?? ({} as StaffUserRepository));
  const staffRepository = repository ?? (getPrismaClient() as unknown as StaffUserRepository);
  return resolveStaffAuthorization(identity, staffRepository);
}

export async function requireStaffUser() {
  const authorization = await getStaffAuthorization();
  if (!authorization.authenticated) redirect("/login");
  if (!authorization.authorized) redirect("/login?error=forbidden");
  return authorization;
}

export async function requireApiStaffAccess(
  repository?: StaffUserRepository,
): Promise<StaffAuthorization> {
  return getStaffAuthorization(repository);
}

/** @deprecated Use requireApiStaffAccess for admin APIs. */
export async function requireApiAuthentication() {
  return getAuthenticatedUser();
}
