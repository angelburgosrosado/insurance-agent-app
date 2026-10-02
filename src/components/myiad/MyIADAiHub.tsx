"use client";

import React from "react";
import {
  Mic,
  Sparkles,
  Calculator,
  Radio,
  ArrowRight,
  ShieldCheck,
  Zap,
  Volume2,
  Lock,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { myiadDict } from "@/lib/i18n/myiad-dict";

export function MyIADAiHub() {
  const { lang } = useLanguage();
  const d = myiadDict[lang];

  const triggerVoiceModal = (scenarioQuery?: string) => {
    window.dispatchEvent(
      new CustomEvent("open-myiad-voice", {
        detail: scenarioQuery ? { initialQuery: scenarioQuery } : {},
      })
    );
  };

  const triggerCopilot = (queryText: string) => {
    window.dispatchEvent(
      new CustomEvent("open-myiad-copilot", {
        detail: { query: queryText },
      })
    );
  };

  const scrollToAssessment = () => {
    const el = document.getElementById("ai-assessment");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="ai-suite"
      className="relative overflow-hidden bg-[#071324] text-white py-16 sm:py-24 border-b border-slate-800"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#2563EB]/15 via-[#14B8A6]/20 to-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#2563EB]/20 via-[#14B8A6]/25 to-teal-400/20 border border-[#14B8A6]/40 text-xs font-bold text-teal-300 shadow-lg shadow-teal-950/40">
            <Sparkles className="w-3.5 h-3.5 text-[#14B8A6] animate-pulse" />
            <span className="tracking-wide uppercase">{d.hub_badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {d.hub_title_1}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-[#14B8A6] to-teal-300 bg-clip-text text-transparent">
              {d.hub_title_highlight}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {d.hub_desc}
          </p>
        </div>

        {/* 3 Core AI Engines Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Deepgram Conversational Voice AI */}
          <div className="relative group rounded-3xl bg-slate-900/90 border border-slate-700/80 hover:border-[#14B8A6] p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-teal-500/10 hover:-translate-y-1">
            {/* Top Accent Pill */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {d.hub_card1_badge}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {d.hub_card1_sub}
              </span>
            </div>

            {/* Icon + Title */}
            <div className="mt-5 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white shadow-lg shadow-teal-500/25 group-hover:scale-105 transition-transform">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {d.hub_card1_title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {d.hub_card1_desc}
              </p>
            </div>

            {/* Specs & Capabilities */}
            <div className="mt-6 py-4 border-y border-slate-800 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> {d.hub_card1_spec1_label}
                </span>
                <span className="font-mono font-bold text-teal-400">{d.hub_card1_spec1_val}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#14B8A6]" /> {d.hub_card1_spec2_label}
                </span>
                <span className="font-mono font-semibold text-slate-200">{d.hub_card1_spec2_val}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> {d.hub_card1_spec3_label}
                </span>
                <span className="font-mono font-semibold text-slate-200">{d.hub_card1_spec3_val}</span>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => triggerVoiceModal()}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white font-extrabold text-xs shadow-lg shadow-teal-950/50 cursor-pointer transition-all active:scale-[0.98]"
              >
                <Mic className="w-4 h-4 text-white animate-pulse" />
                <span>{d.hub_card1_btn}</span>
              </button>
              <p className="text-[10px] text-center text-slate-400">
                {d.hub_card1_perm}
              </p>
            </div>
          </div>

          {/* Card 2: FINRA 2330 Compliant Advisory Copilot */}
          <div className="relative group rounded-3xl bg-slate-900/90 border border-slate-700/80 hover:border-blue-500 p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-1">
            {/* Top Accent Pill */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                {d.hub_card2_badge}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {d.hub_card2_sub}
              </span>
            </div>

            {/* Icon + Title */}
            <div className="mt-5 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {d.hub_card2_title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {d.hub_card2_desc}
              </p>
            </div>

            {/* Quick Prompt Chips */}
            <div className="mt-6 py-4 border-y border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {d.hub_card2_prompts_title}
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => triggerCopilot(lang === "es" ? "¿Cómo funciona el piso del 0% en caídas del mercado en un IUL?" : "How does the 0% floor protect against market drops in an IUL?")}
                  className="text-left text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-400/50 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="truncate">&rarr; {lang === "es" ? "¿Cómo funciona el piso 0%?" : "How does the 0% floor work?"}</span>
                  <ArrowRight className="w-3 h-3 text-blue-400 shrink-0 ml-1" />
                </button>
                <button
                  type="button"
                  onClick={() => triggerCopilot(lang === "es" ? "¿Cómo retiro dinero libre de impuestos bajo IRC §7702?" : "How do tax-free policy loans work under IRC §7702?")}
                  className="text-left text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-400/50 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="truncate">&rarr; {lang === "es" ? "Préstamos libres de impuestos IRC §7702" : "IRC §7702 tax-free loans"}</span>
                  <ArrowRight className="w-3 h-3 text-blue-400 shrink-0 ml-1" />
                </button>
                <button
                  type="button"
                  onClick={() => triggerCopilot(lang === "es" ? "¿Cuáles son los criterios de idoneidad para anualidades de la Regla FINRA 2330?" : "What are the suitability criteria for FINRA Rule 2330 variable annuities?")}
                  className="text-left text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-400/50 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="truncate">&rarr; {lang === "es" ? "Idoneidad de Anualidades FINRA 2330" : "FINRA 2330 Annuity Suitability"}</span>
                  <ArrowRight className="w-3 h-3 text-blue-400 shrink-0 ml-1" />
                </button>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => triggerCopilot(lang === "es" ? "¡Hola! ¿Cómo puede ayudarme a estructurar mi póliza?" : "Welcome to MyIAD! How can you help me structure my policy?")}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-blue-400 text-white font-extrabold text-xs shadow-md cursor-pointer transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-[#14B8A6]" />
                <span>{d.hub_card2_btn}</span>
              </button>
              <p className="text-[10px] text-center text-slate-400">
                {d.hub_card2_footer}
              </p>
            </div>
          </div>

          {/* Card 3: Algorithmic Multi-Vector Gap Assessment */}
          <div className="relative group rounded-3xl bg-slate-900/90 border border-slate-700/80 hover:border-purple-500 p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-purple-500/10 hover:-translate-y-1">
            {/* Top Accent Pill */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                {d.hub_card3_badge}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {d.hub_card3_sub}
              </span>
            </div>

            {/* Icon + Title */}
            <div className="mt-5 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {d.hub_card3_title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {d.hub_card3_desc}
              </p>
            </div>

            {/* Formula Metrics */}
            <div className="mt-6 py-4 border-y border-slate-800 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> {d.hub_card3_spec1_label}
                </span>
                <span className="font-mono font-bold text-slate-200">{d.hub_card3_spec1_val}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> {d.hub_card3_spec2_label}
                </span>
                <span className="font-mono font-bold text-slate-200">{d.hub_card3_spec2_val}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> {d.hub_card3_spec3_label}
                </span>
                <span className="font-mono font-bold text-slate-200">{d.hub_card3_spec3_val}</span>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={scrollToAssessment}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs shadow-md cursor-pointer transition-all active:scale-[0.98]"
              >
                <span>{d.hub_card3_btn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-400">
                {d.hub_card3_footer}
              </p>
            </div>
          </div>
        </div>

        {/* Institutional Trust Footprint */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#14B8A6]" />
            <span>Deepgram Nova-3 & Aura Voice Engine</span>
          </div>
          <span className="hidden sm:inline text-slate-700">&bull;</span>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#14B8A6]" />
            <span>FINRA Rule 2330 Suitability Guardrails</span>
          </div>
          <span className="hidden sm:inline text-slate-700">&bull;</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            <span>50-State Licensed Carrier Distribution</span>
          </div>
          <span className="hidden sm:inline text-slate-700">&bull;</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#14B8A6]" />
            <span>Bilingual Case Modeling (English / Español)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
