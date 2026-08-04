export const STAFF_ROLES = ["superadmin", "admin", "user"] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

type AuthenticatedIdentity = {
  id: string;
  role?: unknown;
  user_metadata?: unknown;
};

export type StaffUserRepository = {
  user: {
    findUnique(args: { where: { id: string }; select: { role: true } }): Promise<{ role: unknown } | null>;
  };
};

export type StaffAuthorization =
  | { authenticated: false; authorized: false; reason: "anonymous" }
  | { authenticated: true; authorized: false; reason: "staff_record_missing" | "invalid_staff_role" }
  | { authenticated: true; authorized: true; role: StaffRole };

export function isStaffRole(value: unknown): value is StaffRole {
  return typeof value === "string" && STAFF_ROLES.includes(value as StaffRole);
}

export function hasStaffAccess(identity: AuthenticatedIdentity | null): boolean {
  return identity !== null && typeof identity.id === "string" && isStaffRole(identity.role);
}

export async function resolveStaffAuthorization(
  identity: { id: string } | null,
  repository: StaffUserRepository,
): Promise<StaffAuthorization> {
  if (!identity) return { authenticated: false, authorized: false, reason: "anonymous" };

  const staffUser = await repository.user.findUnique({
    where: { id: identity.id },
    select: { role: true },
  });
  if (!staffUser) return { authenticated: true, authorized: false, reason: "staff_record_missing" };
  if (!isStaffRole(staffUser.role)) return { authenticated: true, authorized: false, reason: "invalid_staff_role" };
  return { authenticated: true, authorized: true, role: staffUser.role };
}

export function isAuthenticatedIdentity(value: unknown): value is { id: string } {
  return typeof value === "object" && value !== null && "id" in value && typeof value.id === "string";
}
