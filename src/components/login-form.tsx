"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function signInWithGoogle() {
    setBusy(true);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setMessage(error.message);
    setBusy(false);
  }

  async function signInWithEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const { error } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setMessage(error ? error.message : "Check your email for a sign-in link.");
    setBusy(false);
  }

  return (
    <div className="mt-6 space-y-4">
      <button className="w-full border border-[var(--ink)] px-4 py-3 text-sm font-medium" disabled={busy} onClick={signInWithGoogle} type="button">Continue with Google</button>
      <div className="flex items-center gap-3 text-xs text-[var(--ink-soft)]"><span className="h-px flex-1 bg-[var(--line)]" />or<span className="h-px flex-1 bg-[var(--line)]" /></div>
      <form className="space-y-3" onSubmit={signInWithEmail}>
        <label className="block text-sm" htmlFor="email">Work email</label>
        <input className="w-full border border-[var(--line)] px-3 py-3" id="email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
        <button className="w-full bg-[var(--ink)] px-4 py-3 text-sm font-medium text-white" disabled={busy} type="submit">Send sign-in link</button>
      </form>
      {message && <p className="text-sm text-[var(--ink-soft)]" role="status">{message}</p>}
    </div>
  );
}
