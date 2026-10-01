"use client";

import React from "react";
import { FINRA_2330_COMPLIANCE_DISCLOSURE } from "./tokens";
import { ShieldCheck, AlertTriangle, FileCheck, CheckCircle2, Lock, Award } from "lucide-react";

export function MyIADTrustAndCompliance() {
  return (
    <section id="compliance" className="py-20 md:py-28 bg-[#0B1F3A] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Regulatory Rigor & Trust Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Institutional Trust & FINRA Rule 2330 Standards
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every annuity and life insurance recommendation is backed by strict supervisory suitability gating, complete expense disclosures, and state-level licensing transparency.
          </p>
        </div>

        {/* 4 Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">50-State Network Licensing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Supervised network of licensed insurance professionals operating across all 50 US states and approved jurisdictions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-[#14B8A6] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">100% Independent</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero captive proprietary quotas. We survey top-tier A+ institutional carriers to secure optimal contract terms for clients.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">SEC & FINRA 2330</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mandatory supervisory checklists, liquidity profiles, replacement audits, and principal sign-off on variable annuity contracts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Bank-Grade Encryption</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              256-bit SSL encryption, SOC2-aligned database architecture, and granular Row-Level Security on all client records.
            </p>
          </div>
        </div>

        {/* Detailed FINRA Rule 2330 Disclosure Panel */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/95 border border-slate-700 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {FINRA_2330_COMPLIANCE_DISCLOSURE.ruleTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  Mandatory Supervisory Review Standards for Deferred Variable Annuities
                </p>
              </div>
            </div>
            <span className="self-start md:self-auto px-3 py-1 text-[11px] font-mono font-bold uppercase rounded-md bg-slate-800 text-amber-400 border border-slate-700">
              Regulatory Protocol Active
            </span>
          </div>

          {/* Standard Text */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            &ldquo;{FINRA_2330_COMPLIANCE_DISCLOSURE.supervisoryStandard}&rdquo;
          </div>

          {/* Suitability Points */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider">
              Mandatory Public Risk & Product Disclosures
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FINRA_2330_COMPLIANCE_DISCLOSURE.suitabilityDisclosures.map((disclosure, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">&bull;</span>
                  <span>{disclosure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supervisory Checklist */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Supervisory Due Diligence & Suitability Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FINRA_2330_COMPLIANCE_DISCLOSURE.supervisoryChecklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
