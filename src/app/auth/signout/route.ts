import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function signOut(request: Request) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Keep logout idempotent when local Supabase configuration is incomplete.
  }
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set("ab_staff_session", "", {
    maxAge: 0,
    path: "/",
  });
  return response;
}

export async function GET(request: Request) {
  return signOut(request);
}

export async function POST(request: Request) {
  return signOut(request);
}
