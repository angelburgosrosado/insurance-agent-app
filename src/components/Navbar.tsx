"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";
import { LanguageToggle } from "@/components/LanguageToggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const { lang } = useLanguage();
  const t = dictionary[lang];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 w-full z-50 transition-all">
      {/* Top micro-bar */}
      <div className="bg-[#001428] text-white/85 text-xs py-1.5 px-6 lg:px-10 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>FL License: <strong className="text-secondary">#G328926</strong> (0215 Practitioner)</span>
            <span>•</span>
            <span>WFG Agent Code: <strong className="text-secondary">F6D9U</strong></span>
            <span>•</span>
            <span>📍 {t.nav_office}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3 pr-2 border-r border-white/20">
              <a 
                href="https://www.linkedin.com/in/angelburgos" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="LinkedIn Profile" 
                className="text-white/70 hover:text-white transition-colors text-xs font-semibold"
              >
                LinkedIn
              </a>
              <span className="text-white/30">•</span>
              <a 
                href="https://www.facebook.com/abglco" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Facebook Page" 
                className="text-white/70 hover:text-white transition-colors text-xs font-semibold"
              >
                Facebook
              </a>
              <span className="text-white/30">•</span>
              <a 
                href="https://wa.me/13863331482?text=Hello%20Angel,%20I%20would%20like%20to%20learn%20more%20about%20AB%20Global%20Consulting%20services." 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Chat on WhatsApp" 
                className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs flex items-center gap-1"
              >
                WhatsApp
              </a>
            </div>

            <LanguageToggle />

            <a href="tel:3863331482" className="text-white hover:text-secondary font-bold transition-colors">
              📞 (386) 333-1482
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="flex justify-between items-center px-6 lg:px-10 w-full max-w-7xl mx-auto h-20">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group py-1">
          <img 
            src="/images/ab-global-logo.png" 
            alt="AB Global Consulting Logo" 
            className="h-12 md:h-14 w-auto object-contain"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight group-hover:text-secondary transition-colors">
              AB Global Consulting
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary -mt-0.5">
              {t.footer_tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-secondary transition-colors py-2">
              {t.nav_solutions}
              <svg className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid gap-1.5 animate-in fade-in slide-in-from-top-2">
                <Link 
                  href="/services/life-insurance" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-xs">{t.pillar_1_title}</p>
                  <p className="text-[11px] text-slate-500">{lang === "es" ? "Piso garantizado del 0% y retiros libres de impuestos" : "Living benefits & tax-free compounding"}</p>
                </Link>
                <Link 
                  href="/services/variable-annuities" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-xs">{t.pillar_2_title}</p>
                  <p className="text-[11px] text-slate-500">{lang === "es" ? "Cheque mensual garantizado de por vida" : "Guaranteed lifetime monthly paychecks"}</p>
                </Link>
                <Link 
                  href="/services/final-expense" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-xs">{t.pillar_3_title}</p>
                  <p className="text-[11px] text-slate-500">{lang === "es" ? "Negociación de precios funerarios 24/7" : "24/7 professional funeral negotiation"}</p>
                </Link>
                <Link 
                  href="/services/health-insurance" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-xs">{t.pillar_4_title}</p>
                  <p className="text-[11px] text-slate-500">{lang === "es" ? "Subsidios ACA y Suplementos Medicare G/N" : "ACA marketplace & Medicare supplements"}</p>
                </Link>
                <Link 
                  href="/services/long-term-care" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-xs">{t.pillar_5_title}</p>
                  <p className="text-[11px] text-slate-500">{lang === "es" ? "Desembolso mensual en efectivo sin facturas" : "Cash-indemnity monthly payouts"}</p>
                </Link>
              </div>
            )}
          </div>

          {/* Interactive Tools Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-secondary transition-colors py-2">
              <span className="text-secondary font-bold">⚡</span> {t.nav_tools}
              <svg className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid gap-1.5 animate-in fade-in slide-in-from-top-2">
                <Link 
                  href="/tools/iul-calculator" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">📊</span>
                    <p className="font-bold text-slate-900 text-xs">{t.tool_iul_title}</p>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{lang === "es" ? "Simule el piso del 0% contra caídas de bolsa" : "Model 0% floor and tax-free retirement loan payouts"}</p>
                </Link>

                <Link 
                  href="/tools/annuity-estimator" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">📈</span>
                    <p className="font-bold text-slate-900 text-xs">{t.tool_annuity_title}</p>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{lang === "es" ? "Calcule su cheque garantizado de 401k/IRA" : "Estimate lifetime guaranteed income from 401k/IRA rollovers"}</p>
                </Link>

                <Link 
                  href="/tools/funeral-cost-savings" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🕊️</span>
                    <p className="font-bold text-slate-900 text-xs">{t.tool_funeral_title}</p>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{lang === "es" ? "Ahorro de $3,500+ con negociación Everest" : "Compare Everest negotiated rates vs retail mortuary costs"}</p>
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="hover:text-secondary transition-colors">
            {t.nav_about}
          </Link>
          <Link href="/resources" className="hover:text-secondary transition-colors">
            {t.nav_resources}
          </Link>
          <Link href="/portal" className="hover:text-secondary transition-colors">
            {t.nav_portal}
          </Link>
        </div>

        {/* CTA & Language in Main Nav */}
        <div className="hidden sm:flex items-center gap-3">
          <Button href="/#consultation" variant="primary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-5 py-2.5 shadow-md">
            {t.nav_consultation}
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageToggle className="scale-90" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-5 animate-in slide-in-from-top-3">
          <div className="flex justify-center pb-2 border-b border-slate-100">
            <LanguageToggle />
          </div>

          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-xs uppercase font-bold text-secondary tracking-wider">{t.nav_solutions}</p>
            <Link href="/services/life-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary text-sm">
              {t.pillar_1_title}
            </Link>
            <Link href="/services/variable-annuities" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary text-sm">
              {t.pillar_2_title}
            </Link>
            <Link href="/services/final-expense" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary text-sm">
              {t.pillar_3_title}
            </Link>
            <Link href="/services/health-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary text-sm">
              {t.pillar_4_title}
            </Link>
            <Link href="/services/long-term-care" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary text-sm">
              {t.pillar_5_title}
            </Link>
          </div>

          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-xs uppercase font-bold text-secondary tracking-wider">{t.nav_tools}</p>
            <Link href="/tools/iul-calculator" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary text-sm">
              📊 {t.tool_iul_title}
            </Link>
            <Link href="/tools/annuity-estimator" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary text-sm">
              📈 {t.tool_annuity_title}
            </Link>
            <Link href="/tools/funeral-cost-savings" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary text-sm">
              🕊️ {t.tool_funeral_title}
            </Link>
          </div>

          <div className="space-y-2 pb-4 border-b border-slate-100 text-sm">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              {t.nav_about}
            </Link>
            <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              {t.nav_resources}
            </Link>
            <Link href="/portal" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              {t.nav_portal}
            </Link>
          </div>

          <div className="pt-2 space-y-2">
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
              <a 
                href="https://wa.me/13863331482?text=Hello%20Angel,%20I%20would%20like%20information%20regarding%20insurance/annuities."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100"
              >
                WhatsApp
              </a>
              <a 
                href="https://www.linkedin.com/in/angelburgos"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-200"
              >
                LinkedIn
              </a>
              <a 
                href="https://www.facebook.com/abglco"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-200"
              >
                Facebook
              </a>
            </div>

            <a href="tel:3863331482" className="block text-center py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm">
              📞 {t.nav_call}
            </a>
            <Button href="/#consultation" onClick={() => setMobileMenuOpen(false)} variant="primary" className="w-full py-3 text-sm font-bold !bg-secondary !text-white !border-secondary">
              {t.nav_consultation}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
