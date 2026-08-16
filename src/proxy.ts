import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/env";

export async function proxy(request: NextRequest) {
  const config = getSupabaseConfig();

  // If Supabase is not configured, we cannot perform auth checks.
  // We'll let the user access the site, but they won't be able to log in.
  // If they try to access /admin, we can redirect them to a setup page or just block them.
  if (!config.configured) {
    if (request.nextUrl.pathname.startsWith("/admin")) {
      // Allow access to admin if no auth is configured just for dev, or block it?
      // Since it's a private agent app, we should block it or show a configuration warning.
      // But for local testing without Supabase, we might want to redirect.
      // Let's redirect to login, and login can show the configuration error.
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

  if (!user && request.nextUrl.pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Admin Role check - for /admin routes, we must ensure they are an admin
  if (user && request.nextUrl.pathname.startsWith("/admin")) {
    if (user.email?.toLowerCase() !== "angelburgosrosado@gmail.com") {
       const url = request.nextUrl.clone();
       url.pathname = "/unauthorized";
       return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in admins from /login directly to /admin
  if (user && request.nextUrl.pathname === "/login") {
     const url = request.nextUrl.clone();
     url.pathname = "/admin";
     return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
