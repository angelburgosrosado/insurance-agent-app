import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "./env";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export type Role = "admin" | "marketing" | "advisor" | "prospect";

export async function getUserRole(email?: string): Promise<Role> {
  if (!email) return "prospect";
  
  if (email.toLowerCase() === "angelburgosrosado@gmail.com") {
    return "admin";
  }

  // TODO: Add database lookup for other roles
  return "prospect";
}

export async function getSession() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) return null;

  return {
    user,
    role: await getUserRole(user.email)
  };
}
