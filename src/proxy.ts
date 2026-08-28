import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/env";

export async function proxy(request: NextRequest) {
  // 1. Check for Direct Staff Admin Session Cookie
  const staffCookie = request.cookies.get("ab_staff_session")?.value;
  const isStaffSession = staffCookie === "authorized_superadmin" || (staffCookie && staffCookie.startsWith("staff_"));

  // If user has a valid staff session
  if (isStaffSession) {
    if (request.nextUrl.pathname === "/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  const config = getSupabaseConfig();

  // If Supabase is not configured, redirect protected routes to login
  if (!config.configured) {
    if (request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/portal")) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });
  
  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.email?.toLowerCase() === "angelburgosrosado@gmail.com" || user?.email?.toLowerCase() === "admin@abglco.com";

  // Protect /admin and /portal routes from unauthenticated users
  if (!user && (request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/portal"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Admin Role check - for /admin routes, we must ensure they are an admin
  if (user && request.nextUrl.pathname.startsWith("/admin")) {
    if (!isAdmin) {
       const url = request.nextUrl.clone();
       url.pathname = "/portal";
       return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users from /login to their respective dashboards
  if (user && request.nextUrl.pathname === "/login") {
     const url = request.nextUrl.clone();
     url.pathname = isAdmin ? "/admin" : "/portal";
     return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
