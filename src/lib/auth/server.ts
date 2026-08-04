import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/env";

export async function requireAuthenticatedUser() {
  if (!getSupabaseConfig().configured) redirect("/login");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect("/login");
  }

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

export async function requireApiAuthentication() {
  return getAuthenticatedUser();
}
