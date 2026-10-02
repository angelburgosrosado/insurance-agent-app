"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, ArrowRight, Calendar, Lock, Sparkles } from "lucide-react";

interface MyIADHeroProps {
  onScheduleClick?: () => void;
}

export function MyIADHero({ onScheduleClick }: MyIADHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0B1F3A] text-white pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span>Nationwide 50-State Coverage &bull; Top-Rated Carriers</span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="hidden sm:inline text-[#14B8A6] font-bold">Toll-Free (888) 887-3585</span>
            </div>

            {/* Core Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                MyIAD <br />
                <span className="bg-gradient-to-r from-blue-400 via-[#14B8A6] to-teal-300 bg-clip-text text-transparent">
                  Intelligent Insurance Advisory & Protection
                </span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                Precision financial architecture uniting institutional <strong>Life Insurance</strong> (0% floor IUL & Living Benefits), comprehensive <strong>Health & Medicare</strong> coverage, and strictly supervised <strong>FINRA Rule 2330 Variable Annuity</strong> solutions.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  <strong>0% Floor Market Protection</strong> &mdash; Tax-advantaged growth under IRC §7702.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  <strong>Full Suitability Supervision</strong> &mdash; Structured under FINRA 2330 protocols.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  <strong>100% Independent Brokerage</strong> &mdash; Access to top-tier A-rated national carriers.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  <strong>Direct CRM Routing Hook</strong> &mdash; Instant case analysis with licensed advisors.
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <a
                href="#lead-intake"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-900/40 transition-all cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-myiad-copilot", { detail: {} }));
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#14B8A6]/20 to-[#2563EB]/25 hover:from-[#14B8A6]/30 hover:to-[#2563EB]/35 border border-[#14B8A6]/60 text-white font-bold text-sm sm:text-base transition-all cursor-pointer shadow-lg shadow-teal-950/30"
              >
                <Sparkles className="w-4 h-4 text-[#14B8A6] animate-pulse" />
                <span>Ask AI Copilot</span>
              </button>

              <button
                type="button"
                onClick={onScheduleClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm sm:text-base transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#14B8A6]" />
                <span>15-Min Call</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#14B8A6]" />
                Bank-Grade 256-Bit SSL Protection
              </span>
              <span>&bull;</span>
              <span>Bilingual Consultation (English / Español)</span>
              <span>&bull;</span>
              <span>Zero-Pressure Clinical Analysis</span>
            </div>
          </div>

          {/* Right Column: Strategic Advisory Blueprint Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Three-Tier Architecture</h3>
                    <p className="text-xs text-slate-400">Integrated Consumer Coverage Matrix</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Live Engine
                </span>
              </div>

              {/* Three Offerings Visual Stack */}
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-[#14B8A6]/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider">
                      Tier 1: Life Architecture
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">IRC §7702</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">
                    Indexed Universal Life (IUL) & Term
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    0% downside floor, tax-free death benefit liquidity, and living benefit access for critical illness.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-[#2563EB]/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Tier 2: Health Advisory
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">ACA & Medicare</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">
                    Comprehensive Health & Medicare Coverage
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Network-matched health plans, subsidy optimization, and Medicare Advantage / Medigap navigation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-400/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Tier 3: Variable Annuities
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">FINRA 2330</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">
                    Guaranteed Lifetime Income Solutions
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Tax-deferred market accumulation paired with guaranteed lifetime withdrawal benefits and strict suitability gating.
                  </p>
                </div>
              </div>

              {/* Direct Advisor Callout */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div>
                  <p className="font-bold text-white">MyIAD National Insurance Solutions</p>
                  <p className="text-slate-400">Direct Carrier Access Across All 50 US States</p>
                </div>
                <a
                  href="#lead-intake"
                  className="text-xs font-bold text-[#14B8A6] hover:underline flex items-center gap-1"
                >
                  Consult Now &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
