import React from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#eef1ef] text-[var(--ink)] flex flex-col">
      <header className="border-b border-[var(--line)] bg-white sticky top-0 z-30 shadow-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-base font-bold text-slate-900">AB Global Consulting</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">
                Admin Console
              </p>
            </div>

            <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-600 pl-6 border-l border-slate-200">
              <Link href="/admin" className="hover:text-secondary transition-colors">
                Overview
              </Link>
              <Link href="/admin/leads" className="hover:text-secondary transition-colors">
                Leads
              </Link>
              <Link href="/admin/content" className="hover:text-secondary transition-colors">
                Content
              </Link>
              <Link href="/admin/analytics" className="hover:text-secondary transition-colors">
                Analytics
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-secondary hover:underline hidden sm:inline-block"
            >
              View Live Site ↗
            </Link>
            <LogoutButton className="text-xs font-bold text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-all">
              Sign Out
            </LogoutButton>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-[1400px] w-full p-5 lg:p-10">
        {children}
      </main>
    </div>
  );
}
