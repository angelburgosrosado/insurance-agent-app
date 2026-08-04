import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");
  const redirectPath = next?.startsWith("/") && !next.startsWith("//") ? next : "/admin";

  if (!code) return NextResponse.redirect(new URL("/login?error=missing_code", url));

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(new URL("/login?error=auth_callback", url));
    return NextResponse.redirect(new URL(redirectPath, url));
  } catch {
    return NextResponse.redirect(new URL("/login?error=auth_not_configured", url));
  }
}
