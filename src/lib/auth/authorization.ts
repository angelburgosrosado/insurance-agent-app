export const STAFF_ROLES = ["superadmin", "admin", "user"] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

type AuthenticatedIdentity = {
  id: string;
  role?: unknown;
  user_metadata?: unknown;
};

export function isStaffRole(value: unknown): value is StaffRole {
  return typeof value === "string" && STAFF_ROLES.includes(value as StaffRole);
}

export function hasStaffAccess(identity: AuthenticatedIdentity | null): boolean {
  return identity !== null && typeof identity.id === "string" && isStaffRole(identity.role);
}

export function isAuthenticatedIdentity(value: unknown): value is { id: string } {
  return typeof value === "object" && value !== null && "id" in value && typeof value.id === "string";
}
