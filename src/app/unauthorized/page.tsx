"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default function UnauthorizedPage() {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-gradient-to-br from-white to-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center space-y-8">
        <div>
          <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-sentinel-navy mb-2">
            Access Denied
          </h1>
          <p className="text-gray-500">
            You do not have permission to view this page. If you believe this is an error, please contact your administrator.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full bg-sentinel-navy hover:bg-sentinel-navy/90 text-white font-medium">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={handleLogout} className="w-full">
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
