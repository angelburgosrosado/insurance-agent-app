import { getSupabaseConfig, SUPABASE_CONFIGURATION_BLOCKER } from "@/lib/supabase/env";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  const configured = getSupabaseConfig().configured;

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#eef1ef] px-5 text-[var(--ink)]">
      <section className="w-full max-w-md border border-[var(--line)] bg-white p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-deep)]">AB Global Consulting</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">Staff sign in</h1>
        {configured ? <LoginForm /> : <p className="mt-6 border-l-2 border-[var(--accent)] bg-[#eef1ef] p-4 text-sm">{SUPABASE_CONFIGURATION_BLOCKER}</p>}
        <Link className="mt-8 inline-block text-sm text-[var(--accent-deep)]" href="/">Return to public site</Link>
      </section>
    </main>
  );
}
