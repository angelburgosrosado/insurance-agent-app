"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Phone, Menu, X, ArrowRight, Sparkles, Mic } from "lucide-react";

export function MyIADNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
                Intelligent Insurance Advisory & Protection
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-200">
            <a href="#ai-suite" className="flex items-center gap-1.5 text-[#14B8A6] font-bold hover:text-teal-300 transition-colors">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI Suite</span>
            </a>
            <a href="#offerings" className="hover:text-[#14B8A6] transition-colors">
              Three Core Offerings
            </a>
            <a href="#producers" className="hover:text-[#14B8A6] transition-colors">
              Producer & IMO Platform
            </a>
            <a href="#veterans" className="hover:text-[#14B8A6] transition-colors">
              Veteran Shield
            </a>
            <a href="#compliance" className="hover:text-[#14B8A6] transition-colors">
              FINRA Rule 2330
            </a>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-myiad-voice", { detail: {} }));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#14B8A6]/20 to-[#2563EB]/25 hover:from-[#14B8A6]/30 hover:to-[#2563EB]/35 border border-[#14B8A6]/60 text-white hover:text-white transition-all text-xs font-bold cursor-pointer shadow-sm"
            >
              <Mic className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Voice Agent</span>
            </button>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-myiad-copilot", { detail: {} }));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white transition-all text-xs font-bold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>AI Copilot</span>
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:18888873585"
              className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>(888) 887-3585</span>
            </a>
            <a
              href="#lead-intake"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-900/30 transition-all cursor-pointer"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#lead-intake"
              className="sm:hidden px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-bold"
            >
              Quote
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
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
          <div className="flex flex-col gap-3 text-sm font-semibold text-slate-200">
            <a
              href="#ai-suite"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-[#14B8A6] font-bold flex items-center gap-2 hover:text-teal-300"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>MyIAD AI Intelligence Suite</span>
            </a>
            <a
              href="#offerings"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#14B8A6]"
            >
              Three Core Offerings (Life, Health, Annuities)
            </a>
            <a
              href="#producers"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#14B8A6]"
            >
              High-Performing Producers & IMOs
            </a>
            <a
              href="#veterans"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#14B8A6]"
            >
              Veteran Asset Shield
            </a>
            <a
              href="#compliance"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#14B8A6]"
            >
              FINRA Rule 2330 Compliance Protocol
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
              <span>Launch Deepgram Voice Agent</span>
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
              <span>Launch MyIAD AI Copilot</span>
            </button>
          </div>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="tel:18888873585"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/80 text-white font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-[#14B8A6]" />
              <span>Toll-Free: (888) 887-3585</span>
            </a>
            <a
              href="#lead-intake"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white font-bold text-sm"
            >
              <span>Request Quote / Schedule Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
