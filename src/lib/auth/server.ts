import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getPrismaClient } from "@/lib/server/db";
import {
  resolveStaffAuthorization,
  type StaffAuthorization,
  type StaffUserRepository,
} from "@/lib/auth/authorization";

export async function getAuthenticatedUser(): Promise<{ id: string; email?: string; role?: string } | null> {
  const cookieStore = await cookies();
  
  // 1. Check for Direct Staff Admin Session Cookie
  const adminSession = cookieStore.get("ab_staff_session")?.value;
  if (adminSession === "authorized_superadmin" || adminSession?.startsWith("staff_")) {
    return {
      id: "admin_angel_burgos",
      email: "angelburgosrosado@gmail.com",
      role: "superadmin"
    };
  }

  // 2. Check Supabase Auth
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return { id: user.id, email: user.email, role: user.user_metadata?.role };
  } catch {
    return null;
  }
}

export async function requireAuthenticatedUser() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/login");
  return user;
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
