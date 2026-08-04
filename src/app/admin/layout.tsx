import type { ReactNode } from "react";
import { requireStaffUser } from "@/lib/auth/server";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireStaffUser();
  return children;
}
