import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host =
    request.headers.get("host") ||
    request.headers.get("x-forwarded-host") ||
    request.nextUrl.hostname ||
    "";
  const { pathname, searchParams } = request.nextUrl;

  // Support test environment simulation via query parameter or header
  const isCrmDomain =
    host.includes("crm.myiad.net") ||
    searchParams.get("domain") === "crm.myiad.net" ||
    request.headers.get("x-mock-host") === "crm.myiad.net";

  // 1. Direct crm.myiad.net traffic to the CRM Showcase & Portal
  if (isCrmDomain) {
    // Preserve API routes, static assets, and favicon
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname === "/favicon.ico" ||
      pathname === "/icon.png" ||
      pathname.startsWith("/crm")
    ) {
      return NextResponse.next();
    }

    // Rewrite root or portal paths to /crm
    if (pathname === "/" || pathname === "/pipeline" || pathname === "/leads") {
      const url = request.nextUrl.clone();
      url.pathname = "/crm";
      return NextResponse.rewrite(url);
    }
  }

  // 2. Rewrite myiad.com root to /myiad landing page
  const isMyIADDomain =
    host.includes("myiad.com") ||
    searchParams.get("domain") === "myiad.com" ||
    request.headers.get("x-mock-host") === "myiad.com";

  if (isMyIADDomain && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/myiad";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default proxy;



