"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Phone, Menu, X, ArrowRight, Sparkles, Mic, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { myiadDict } from "@/lib/i18n/myiad-dict";

export function MyIADNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const d = myiadDict[lang];

  const toggleLanguage = () => {
    setLang(lang === "en" ? "es" : "en");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B1F3A]/95 backdrop-blur-md border-b border-slate-700/60 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <Link href="/myiad" className="flex items-center gap-3.5 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  My<span className="text-[#14B8A6]">IAD</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-[#2563EB]/25 text-blue-200 border border-blue-400/30">
                  Advisory OS
                </span>
              </div>
              <span className="text-[11px] text-slate-300 font-medium tracking-tight">
                {lang === "es"
                  ? "Asesoría y Protección de Seguros Inteligente"
                  : "Intelligent Insurance Advisory & Protection"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-slate-200">
            <a href="#ai-suite" className="flex items-center gap-1.5 text-[#14B8A6] font-bold hover:text-teal-300 transition-colors">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{d.nav_ai_suite}</span>
            </a>
            <a href="#offerings" className="hover:text-[#14B8A6] transition-colors">
              {d.nav_offerings}
            </a>
            <a href="#producers" className="hover:text-[#14B8A6] transition-colors">
              {d.nav_producers}
            </a>
            <a href="#veterans" className="hover:text-[#14B8A6] transition-colors">
              {d.nav_veterans}
            </a>
            <a href="#compliance" className="hover:text-[#14B8A6] transition-colors">
              {d.nav_compliance}
            </a>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-myiad-voice", { detail: {} }));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#14B8A6]/20 to-[#2563EB]/25 hover:from-[#14B8A6]/30 hover:to-[#2563EB]/35 border border-[#14B8A6]/60 text-white hover:text-white transition-all text-xs font-bold cursor-pointer shadow-sm"
            >
              <Mic className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>{d.nav_voice_agent}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-myiad-copilot", { detail: {} }));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white transition-all text-xs font-bold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>{d.nav_copilot}</span>
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
              title={lang === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              <Globe className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>{lang === "en" ? "🇵🇷 ES" : "🇺🇸 EN"}</span>
            </button>

            <a
              href="tel:18888873585"
              className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white px-2.5 py-2 rounded-lg hover:bg-white/5 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>(888) 887-3585</span>
            </a>
            <a
              href="#lead-intake"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-900/30 transition-all cursor-pointer"
            >
              <span>{d.nav_consultation}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger & Language toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-200 flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-[#14B8A6]" />
              <span>{lang === "en" ? "ES" : "EN"}</span>
            </button>
            <a
              href="#lead-intake"
              className="sm:hidden px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-bold"
            >
              {d.nav_quote}
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0B1F3A] px-6 py-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-medium">
              {lang === "es" ? "Idioma Seleccionado:" : "Select Language:"}
            </span>
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-600 text-xs font-bold text-[#14B8A6] flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "🇵🇷 Cambiar a Español" : "🇺🇸 Switch to English"}</span>
            </button>
          </div>

          <div className="flex flex-col gap-3 text-sm font-semibold text-slate-200">
            <a
              href="#ai-suite"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-[#14B8A6] font-bold flex items-center gap-2 hover:text-teal-300"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{d.nav_ai_suite}</span>
            </a>
            <a
              href="#offerings"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#14B8A6]"
            >
              {d.nav_offerings}
            </a>
            <a
              href="#producers"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#14B8A6]"
            >
              {d.nav_producers}
            </a>
            <a
              href="#veterans"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#14B8A6]"
            >
              {d.nav_veterans}
            </a>
            <a
              href="#compliance"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#14B8A6]"
            >
              {d.nav_compliance}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new CustomEvent("open-myiad-voice", { detail: {} }));
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#14B8A6]/25 to-[#2563EB]/30 border border-[#14B8A6]/60 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Mic className="w-4 h-4 text-[#14B8A6]" />
              <span>{d.nav_voice_agent} (Deepgram)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new CustomEvent("open-myiad-copilot", { detail: {} }));
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/40 text-[#14B8A6] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#14B8A6]" />
              <span>{d.nav_copilot}</span>
            </button>
          </div>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="tel:18888873585"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/80 text-white font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-[#14B8A6]" />
              <span>(888) 887-3585</span>
            </a>
            <a
              href="#lead-intake"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white font-bold text-sm"
            >
              <span>{d.nav_consultation}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
