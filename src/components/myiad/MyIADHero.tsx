"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Calendar,
  Lock,
  Sparkles,
  Mic,
  Radio,
  MessageSquare,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { myiadDict } from "@/lib/i18n/myiad-dict";
import { getCoreOfferings } from "./tokens";

interface MyIADHeroProps {
  onScheduleClick?: () => void;
}

export function MyIADHero({ onScheduleClick }: MyIADHeroProps) {
  const [activeConsoleTab, setActiveConsoleTab] = useState<"voice" | "copilot" | "tiers">("voice");
  const { lang } = useLanguage();
  const d = myiadDict[lang];
  const offerings = getCoreOfferings(lang);

  const openVoiceAgent = (scenarioPrompt?: string) => {
    window.dispatchEvent(
      new CustomEvent("open-myiad-voice", {
        detail: scenarioPrompt ? { prompt: scenarioPrompt } : {},
      })
    );
  };

  const openCopilot = (queryText: string) => {
    window.dispatchEvent(
      new CustomEvent("open-myiad-copilot", {
        detail: { query: queryText },
      })
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#0B1F3A] text-white pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#14B8A6]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Top AI & Trust Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#2563EB]/25 via-[#14B8A6]/30 to-teal-400/20 border border-[#14B8A6]/60 text-xs font-bold text-teal-300 shadow-md shadow-teal-950/40">
                <Sparkles className="w-3.5 h-3.5 text-[#14B8A6] animate-pulse" />
                <span className="tracking-wide uppercase font-extrabold">
                  {d.hero_badge}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{d.hero_coverage}</span>
                <span className="hidden sm:inline text-slate-500">&bull;</span>
                <span className="hidden sm:inline text-[#14B8A6] font-bold">(888) 887-3585</span>
              </div>
            </div>

            {/* Core Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                MyIAD <br />
                <span className="bg-gradient-to-r from-blue-400 via-[#14B8A6] to-teal-300 bg-clip-text text-transparent">
                  {d.hero_title}
                </span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                {d.hero_desc}
              </p>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>{d.hero_pillar_1}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>{d.hero_pillar_2}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>{d.hero_pillar_3}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>{d.hero_pillar_4}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => openVoiceAgent()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#2563EB] hover:opacity-95 text-white font-black text-sm transition-all cursor-pointer shadow-xl shadow-teal-950/60 ring-2 ring-[#14B8A6]/40 hover:scale-[1.02] active:scale-95"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Mic className="w-3.5 h-3.5 text-white animate-pulse" />
                </div>
                <span>{d.hero_cta_voice}</span>
              </button>

              <button
                type="button"
                onClick={() => openCopilot(lang === "es" ? "¿Cómo puede ayudarme el Copiloto IA de MyIAD?" : "How can MyIAD AI Copilot assist with my insurance case today?")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-100 hover:text-white font-bold text-sm transition-all cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                <span>{d.hero_cta_copilot}</span>
              </button>

              <a
                href="#lead-intake"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all cursor-pointer"
              >
                <span>{d.hero_cta_quote}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onScheduleClick}
                className="hidden sm:inline-flex items-center justify-center gap-2 px-3 py-3.5 text-xs text-slate-300 hover:text-white font-medium hover:underline transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>{d.hero_cta_call}</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#14B8A6]" />
                {d.hero_trust_ssl}
              </span>
              <span>&bull;</span>
              <span>{d.hero_trust_bilingual}</span>
              <span>&bull;</span>
              <a href="#ai-suite" className="text-[#14B8A6] font-semibold hover:underline flex items-center gap-1">
                {d.hero_trust_explore}
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Live AI Console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900/95 border border-slate-700/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
              {/* Console Header & Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white shadow-md">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white tracking-tight">
                      {d.console_title}
                    </h3>
                    <p className="text-[11px] text-slate-400">{d.console_subtitle}</p>
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center p-1 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("voice")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activeConsoleTab === "voice"
                        ? "bg-[#14B8A6] text-slate-950 shadow"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {d.console_tab_voice}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("copilot")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activeConsoleTab === "copilot"
                        ? "bg-[#2563EB] text-white shadow"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {d.console_tab_copilot}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("tiers")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activeConsoleTab === "tiers"
                        ? "bg-slate-700 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {d.console_tab_tiers}
                  </button>
                </div>
              </div>

              {/* Tab 1: Live Voice AI Console */}
              {activeConsoleTab === "voice" && (
                <div className="mt-5 space-y-4 animate-in fade-in duration-150">
                  {/* Visualizer Display Box */}
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-[#071324] to-[#0B1F3A] border border-slate-800/80 flex flex-col items-center text-center space-y-4">
                    <div className="flex items-center justify-between w-full text-[10px] uppercase tracking-wider font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        {d.console_voice_ready}
                      </span>
                      <span>{d.console_voice_latency}</span>
                    </div>

                    {/* Animated Frequency Bars Simulation */}
                    <div className="flex items-center justify-center gap-1.5 h-10 w-full px-4">
                      {[35, 60, 25, 80, 45, 95, 70, 30, 85, 50, 100, 65, 40, 75, 55, 30].map(
                        (height, i) => (
                          <div
                            key={i}
                            className="w-1.5 rounded-full bg-gradient-to-t from-[#2563EB] to-[#14B8A6] animate-pulse"
                            style={{
                              height: `${Math.max(15, height * 0.35)}px`,
                              animationDelay: `${i * 75}ms`,
                              animationDuration: "1.2s",
                            }}
                          />
                        )
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-white">
                        {d.console_voice_headline}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        {d.console_voice_sub}
                      </p>
                    </div>

                    {/* Main Voice Activation Button */}
                    <button
                      type="button"
                      onClick={() => openVoiceAgent()}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#2563EB] hover:opacity-95 text-white font-black text-xs shadow-lg shadow-teal-950/60 transition-all cursor-pointer hover:scale-[1.01] active:scale-95"
                    >
                      <Mic className="w-4 h-4 text-white animate-bounce" />
                      <span>{d.console_voice_btn}</span>
                    </button>
                  </div>

                  {/* Quick Voice Topics */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {d.console_voice_samples}
                    </span>
                    <button
                      type="button"
                      onClick={() => openVoiceAgent(lang === "es" ? "¿Cómo protege el piso del 0% en un IUL?" : "How does the 0% floor protect against market drops?")}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-[#14B8A6]/15 border border-slate-700/60 hover:border-[#14B8A6]/50 text-xs text-slate-200 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>🎙️ &ldquo;{d.console_voice_q1}&rdquo;</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openVoiceAgent(lang === "es" ? "¿Cómo retiro dinero libre de impuestos bajo IRC §7702?" : "How do tax-free policy loans work under IRC §7702?")}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-[#14B8A6]/15 border border-slate-700/60 hover:border-[#14B8A6]/50 text-xs text-slate-200 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>🎙️ &ldquo;{d.console_voice_q2}&rdquo;</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: AI Copilot Prompts */}
              {activeConsoleTab === "copilot" && (
                <div className="mt-5 space-y-3 animate-in fade-in duration-150">
                  <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/50 text-xs text-blue-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{d.console_copilot_notice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openCopilot(
                        lang === "es"
                          ? "Explique cómo una póliza de Vida Universal Indexada (IUL) ofrece un piso del 0% para proteger el capital durante caídas bursátiles."
                          : "Explain how an Indexed Universal Life (IUL) policy provides a 0% floor to protect cash value during a stock market crash."
                      )
                    }
                    className="w-full text-left p-3 rounded-2xl bg-slate-800/70 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/60 text-xs text-slate-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between font-bold text-blue-400 text-xs">
                      <span>{d.console_copilot_card1_title}</span>
                      <span className="font-mono text-[10px]">IRC §7702</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {d.console_copilot_card1_desc}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openCopilot(
                        lang === "es"
                          ? "¿Cómo funcionan los préstamos de póliza libres de impuestos bajo el Código IRC §7702 para generar ingresos de retiro?"
                          : "How do tax-free policy loans work under IRC §7702 to provide retirement income without IRS penalties?"
                      )
                    }
                    className="w-full text-left p-3 rounded-2xl bg-slate-800/70 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/60 text-xs text-slate-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between font-bold text-teal-400 text-xs">
                      <span>{d.console_copilot_card2_title}</span>
                      <span className="font-mono text-[10px]">No-MEC Loan</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {d.console_copilot_card2_desc}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openCopilot(
                        lang === "es"
                          ? "¿Cuáles son los estándares de idoneidad y liquidez para Anualidades Variables según la Regla FINRA 2330?"
                          : "What suitability standards and liquidity tests apply to Variable Annuities under FINRA Rule 2330?"
                      )
                    }
                    className="w-full text-left p-3 rounded-2xl bg-slate-800/70 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/60 text-xs text-slate-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between font-bold text-amber-400 text-xs">
                      <span>{d.console_copilot_card3_title}</span>
                      <span className="font-mono text-[10px]">FINRA 2330</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {d.console_copilot_card3_desc}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => openCopilot(lang === "es" ? "¿Qué escenario de protección patrimonial le gustaría modelar hoy?" : "What protection scenario would you like to model today?")}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-600"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#14B8A6]" />
                    <span>{d.console_copilot_open_btn}</span>
                  </button>
                </div>
              )}

              {/* Tab 3: Three Tiers Architecture */}
              {activeConsoleTab === "tiers" && (
                <div className="mt-5 space-y-3 animate-in fade-in duration-150">
                  {offerings.map((tier) => (
                    <div key={tier.id} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider">
                          {tier.badge}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {tier.id === "life" ? "IRC §7702" : tier.id === "health" ? "ACA & Medicare" : "FINRA 2330"}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">
                        {tier.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1">
                        {tier.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Direct Advisor Callout Footer */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] text-slate-400">Deepgram Voice &bull; FINRA 2330 Ready</span>
                </div>
                <button
                  type="button"
                  onClick={() => openVoiceAgent()}
                  className="text-xs font-bold text-[#14B8A6] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === "es" ? "Iniciar Voz →" : "Launch Voice →"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
