"use client";

import React from "react";
import { getFinraDisclosure } from "./tokens";
import { ShieldCheck, AlertTriangle, FileCheck, CheckCircle2, Lock, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function MyIADTrustAndCompliance() {
  const { lang } = useLanguage();
  const finraDisclosure = getFinraDisclosure(lang);

  return (
    <section id="compliance" className="py-20 md:py-28 bg-[#0B1F3A] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            {lang === "es" ? "Rigor Regulatorio y Arquitectura de Confianza" : "Regulatory Rigor & Trust Architecture"}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            {lang === "es" ? "Confianza Institucional y Estándares FINRA 2330" : "Institutional Trust & FINRA Rule 2330 Standards"}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {lang === "es"
              ? "Cada recomendación de seguro de vida y anualidad está respaldada por filtros estrictos de supervisión de idoneidad, divulgación de gastos y transparencia de licencias estatales."
              : "Every annuity and life insurance recommendation is backed by strict supervisory suitability gating, complete expense disclosures, and state-level licensing transparency."}
          </p>
        </div>

        {/* 4 Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              {lang === "es" ? "Licencia en los 50 Estados" : "50-State Network Licensing"}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === "es"
                ? "Red supervisada de profesionales de seguros con licencia operando en los 50 estados de EE. UU. y Puerto Rico."
                : "Supervised network of licensed insurance professionals operating across all 50 US states and approved jurisdictions."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-[#14B8A6] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              {lang === "es" ? "100% Independiente" : "100% Independent"}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === "es"
                ? "Cero cuotas cautivas ni productos propios obligatorios. Comparamos aseguradoras institucionales A+ para asegurar las mejores condiciones."
                : "Zero captive proprietary quotas. We survey top-tier A+ institutional carriers to secure optimal contract terms for clients."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              {lang === "es" ? "Supervisión SEC y FINRA 2330" : "SEC & FINRA 2330"}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === "es"
                ? "Listas de verificación de supervisión obligatoria, perfiles de liquidez, auditorías de reemplazo y aprobación del principal en contratos variables."
                : "Mandatory supervisory checklists, liquidity profiles, replacement audits, and principal sign-off on variable annuity contracts."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              {lang === "es" ? "Seguridad Criptográfica" : "Cryptographic Security"}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === "es"
                ? "Cifrado bancario AES-256-GCM, firmas de webhook HMAC SHA-256 y cumplimiento con HIPAA y TCPA en el manejo de datos."
                : "AES-256-GCM encrypted data transit, HMAC SHA-256 webhook signatures, and HIPAA/TCPA-compliant intake workflows."}
            </p>
          </div>
        </div>

        {/* FINRA 2330 Deep Dive Box */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-700/80 p-8 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {lang === "es" ? "Divulgación Legal y Regulatoria Obligatoria" : "Mandatory Supervisory Disclosure"}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                {finraDisclosure.ruleTitle}
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
              <span>FINRA Regulatory Compliance Standard</span>
            </div>
          </div>

          {/* Supervisory Standard Definition */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 font-bold mb-1">
                {lang === "es" ? "Estándar de Supervisión:" : "Supervisory Standard:"}
              </strong>
              {finraDisclosure.supervisoryStandard}
            </div>
          </div>

          {/* Disclosures & Checklist Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* Left: Suitability Disclosures */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-400" />
                {lang === "es" ? "Divulgaciones Obligatorias al Consumidor" : "Mandatory Customer Disclosures"}
              </h4>
              <ul className="space-y-3">
                {finraDisclosure.suitabilityDisclosures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Supervisory Checklist */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                {lang === "es" ? "Verificación de Supervisión de Idoneidad" : "Supervisory Review Checklist"}
              </h4>
              <div className="space-y-3 p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                {finraDisclosure.supervisoryChecklist.map((check, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
