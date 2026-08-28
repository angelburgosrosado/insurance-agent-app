"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";
import { LanguageToggle } from "@/components/LanguageToggle";

export const ComplianceDisclosure: React.FC = () => {
  const { lang } = useLanguage();
  const t = dictionary[lang];

  return (
    <footer className="w-full border-t border-slate-200 mt-20 pt-12 pb-16 bg-slate-100 text-slate-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <img 
              src="/images/ab-global-logo.png" 
              alt="AB Global Consulting Logo" 
              className="h-14 w-auto object-contain"
            />
            <div>
              <p className="font-bold text-slate-900 text-base">AB Global Consulting</p>
              <p className="text-xs text-secondary font-semibold">{t.footer_tagline}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.footer_licensure}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-secondary transition-colors">
              {lang === "es" ? "Inicio" : "Home"}
            </Link>
            <Link href="/about" className="hover:text-secondary transition-colors">
              {t.nav_about}
            </Link>
            <Link href="/services/life-insurance" className="hover:text-secondary transition-colors">
              {lang === "es" ? "Seguro de Vida e IUL" : "Life & IUL"}
            </Link>
            <Link href="/services/variable-annuities" className="hover:text-secondary transition-colors">
              {lang === "es" ? "Anualidades" : "Annuities"}
            </Link>
            <Link href="/services/final-expense" className="hover:text-secondary transition-colors">
              {lang === "es" ? "Gastos Finales" : "Final Expense"}
            </Link>
            <Link href="/tools/iul-calculator" className="hover:text-secondary transition-colors">
              {lang === "es" ? "Simulador IUL" : "IUL Simulator"}
            </Link>
            <Link href="/#consultation" className="text-secondary font-bold hover:underline">
              {t.nav_consultation}
            </Link>
          </div>

          {/* Social & Messaging Channels */}
          <div className="flex items-center gap-3 text-xs font-bold">
            <a 
              href="https://www.linkedin.com/in/angelburgos" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-700 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://www.facebook.com/abglco" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-700 transition-colors"
            >
              Facebook
            </a>
            <a 
              href={
                lang === "es"
                  ? "https://wa.me/13863331482?text=Hola%20Angel,%20visite%20su%20sitio%20web%20y%20deseo%20informacion."
                  : "https://wa.me/13863331482?text=Hello%20Angel,%20I%20visited%20AB%20Global%20Consulting%20and%20would%20like%20information."
              }
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
            >
              WhatsApp
            </a>
            <a 
              href="https://t.me/+13863331482" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2.5 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded transition-colors"
            >
              Telegram
            </a>
            <a 
              href="https://agents.worldfinancialgroup.com/Angel-Burgos-F6D9U" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors"
            >
              WFG Directory ↗
            </a>
          </div>
        </div>

        <div className="text-[11px] leading-relaxed text-slate-500 space-y-3">
          <p>
            <strong>{t.footer_compliance_title}</strong> {t.footer_compliance_text}
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} AB Global Consulting LLC. {t.footer_rights}</p>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <Link href="/privacy" className="text-slate-600 hover:text-secondary underline transition-colors">
                {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
              </Link>
              <span>•</span>
              <Link href="/terms" className="text-slate-600 hover:text-secondary underline transition-colors">
                {lang === "es" ? "Términos de Uso" : "Terms of Service"}
              </Link>
              <span>•</span>
              <Link href="/disclosures" className="text-slate-600 hover:text-secondary underline transition-colors">
                {lang === "es" ? "Divulgaciones Legales" : "Disclosures"}
              </Link>
              <span>•</span>
              <Link href="/login" className="text-amber-800 font-bold hover:text-amber-900 underline transition-colors flex items-center gap-1">
                <span>🔐</span> {lang === "es" ? "Portal de Asesor / Staff" : "Staff Portal Login"}
              </Link>
            </div>
            <p className="text-[10px] text-slate-400">Direct / WhatsApp: (386) 333-1482 • Office: (407) 930-6226</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
