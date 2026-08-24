"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";
import { LanguageToggle } from "@/components/LanguageToggle";

interface ToolPageLayoutProps {
  children: React.ReactNode;
  toolType: "iul" | "annuity" | "funeral" | "military";
}

export function ToolPageLayout({ children, toolType }: ToolPageLayoutProps) {
  const { lang } = useLanguage();
  const t = dictionary[lang];

  const disclaimer =
    toolType === "iul"
      ? t.iul_disclaimer
      : toolType === "annuity"
      ? t.annuity_disclaimer
      : toolType === "military"
      ? t.mil_disclaimer
      : t.funeral_disclaimer;

  return (
    <main className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb, Language Toggle & Branding */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <Link href="/" className="font-bold text-slate-900 hover:text-secondary flex items-center gap-1.5 self-start sm:self-auto">
          {t.tool_page_back}
        </Link>
        <div className="flex items-center gap-3 flex-wrap justify-end self-end sm:self-auto">
          <LanguageToggle />
          <span className="hidden sm:inline">•</span>
          <span>
            {t.tool_page_advisor}: <strong>Angel Burgos (0215 / G328926)</strong>
          </span>
          <span>•</span>
          <a href="tel:3863331482" className="text-secondary font-bold hover:underline">
            (386) 333-1482
          </a>
        </div>
      </div>

      {children}

      {/* Trust & Compliance Footer */}
      <div className="max-w-5xl mx-auto mt-8 text-center text-xs text-slate-500 space-y-2">
        <p>{disclaimer}</p>
        <p>© {new Date().getFullYear()} AB Global Consulting LLC • {t.tool_page_rights}</p>
      </div>
    </main>
  );
}
