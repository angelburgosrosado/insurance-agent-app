"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Lock, Mail, Key, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"passcode" | "otp" | "google">("passcode");
  const [passcode, setPasscode] = useState("");
  const [email, setEmail] = useState("angelburgosrosado@gmail.com");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 1. Passcode Direct Login
  const handlePasscodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/staff-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "passcode", passcode }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid staff passcode. Please try again.");
        return;
      }

      setSuccessMsg("Authenticated! Redirecting to Admin Dashboard...");
      setTimeout(() => {
        router.push("/admin");
      }, 500);
    } catch {
      setError("Network error connecting to login service.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Request OTP Code to Email
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/staff-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request_otp", email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send verification code.");
        return;
      }

      setOtpSent(true);
      setSuccessMsg("6-Digit code sent to your email!");
    } catch {
      setError("Failed to send verification email.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Verify OTP Code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/staff-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_otp", otpCode }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid verification code.");
        return;
      }

      setSuccessMsg("Verification successful! Opening Admin Dashboard...");
      setTimeout(() => {
        router.push("/admin");
      }, 500);
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Google OAuth Fallback
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(`Google OAuth Error: ${error.message}`);
        setLoading(false);
      }
    } catch {
      setError("Google sign-in could not be initiated.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        {/* Institutional Branding Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            AB Global Staff Portal
          </h1>
          <p className="text-xs text-slate-400">
            Secure administrative access for licensed advisor & staff
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setTab("passcode"); setError(null); }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              tab === "passcode"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Key size={13} />
            Passcode
          </button>

          <button
            type="button"
            onClick={() => { setTab("otp"); setError(null); }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              tab === "otp"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Mail size={13} />
            Email OTP
          </button>

          <button
            type="button"
            onClick={() => { setTab("google"); setError(null); }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              tab === "google"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck size={13} />
            Google
          </button>
        </div>

        {/* Alert Banners */}
        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-start gap-2">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ================= TAB 1: PASSCODE LOGIN ================= */}
        {tab === "passcode" && (
          <form onSubmit={handlePasscodeLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Staff Master Security Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter Passcode / Agent Code (e.g. F6D9U)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Accepts WFG Agent Code (<code>F6D9U</code>), FL Lic (<code>G328926</code>), or master password.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || !passcode}
              className="w-full !bg-amber-500 !text-slate-950 hover:!bg-amber-400 py-3 text-sm font-bold shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : "Sign In to Admin Portal"}
              <ArrowRight size={16} />
            </Button>
          </form>
        )}

        {/* ================= TAB 2: EMAIL OTP LOGIN ================= */}
        {tab === "otp" && (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                    Staff Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full !bg-amber-500 !text-slate-950 hover:!bg-amber-400 py-3 text-sm font-bold shadow-lg"
                >
                  {loading ? "Sending Code..." : "Send 6-Digit Code to Email"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                    Enter 6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-center text-xl tracking-widest font-mono text-amber-400 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5 text-center">
                    Check your inbox at <strong>{email}</strong>
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading || otpCode.length < 6}
                  className="w-full !bg-amber-500 !text-slate-950 hover:!bg-amber-400 py-3 text-sm font-bold shadow-lg"
                >
                  {loading ? "Verifying..." : "Verify & Access Admin"}
                </Button>

                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtpCode(""); }}
                  className="w-full text-center text-xs text-slate-400 hover:text-amber-400"
                >
                  ← Use a different email or resend
                </button>
              </form>
            )}
          </div>
        )}

        {/* ================= TAB 3: GOOGLE SSO ================= */}
        {tab === "google" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              Sign in with your authorized Google Workspace account (<code>angelburgosrosado@gmail.com</code>).
            </p>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full !bg-white !text-slate-900 hover:!bg-slate-100 py-3 text-sm font-bold shadow-md flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {loading ? "Redirecting..." : "Sign In with Google"}
            </Button>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            Advisor: <strong>Angel Burgos</strong> • FL Lic: #G328926 / WFG: F6D9U
          </p>
          <a href="/" className="inline-block mt-2 text-xs text-amber-400/80 hover:text-amber-400 hover:underline">
            ← Return to Public Website
          </a>
        </div>
      </div>
    </main>
  );
}
