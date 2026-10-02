"use client";

import React, { useState } from "react";
import {
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { myiadDict } from "@/lib/i18n/myiad-dict";

export function MyIADBusinessDesign() {
  const { lang } = useLanguage();
  const d = myiadDict[lang] || myiadDict.en;
  const [partnerName, setPartnerName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [npn, setNpn] = useState("");
  const [producerCount, setProducerCount] = useState("1-5");
  const [partnerConsent, setPartnerConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!partnerName.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!partnerConsent) {
      setError("Please confirm contact authorization.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: partnerName,
        email,
        phone,
        category: "strategic_advisory",
        source: "myiad.com/business-design",
        notes: `Agency Partner Inquiry: ${agencyName || "Independent"} | Producers: ${producerCount} | NPN: ${npn || "N/A"}`,
        consent: true,
        consentTimestamp: new Date().toISOString(),
        consentVersion: "myiad_partner_v2.0",
        quoteParameters: {
          agencyName,
          producerCount,
          npn,
          inquiryType: "platform_distribution_partnership",
        },
      };

      const res = await fetch("/api/leads/quote-routing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Unable to submit partnership request. Please try again.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error connecting to partner pipeline.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="business-design" className="py-20 md:py-28 bg-[#071324] text-white border-t border-slate-800 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14B8A6]/15 border border-[#14B8A6]/30 text-[#14B8A6] text-xs font-bold uppercase tracking-wider">
            <Layers size={14} />
            <span>{d.biz_badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {d.biz_title}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              {d.biz_title_highlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {d.biz_desc}
          </p>
        </div>

        {/* 4 Pillars of the Business Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3.5 hover:border-blue-500/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">{d.biz_p1_title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {d.biz_p1_desc}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3.5 hover:border-teal-500/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center font-bold">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">{d.biz_p2_title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {d.biz_p2_desc}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3.5 hover:border-emerald-500/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">{d.biz_p3_title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {d.biz_p3_desc}
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3.5 hover:border-purple-500/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">{d.biz_p4_title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {d.biz_p4_desc}
            </p>
          </div>
        </div>

        {/* Agency Lead Capture Box */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0B1F3A] to-slate-900 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column info */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Building2 size={13} />
                <span>{d.biz_agency_badge}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {d.biz_agency_title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {d.biz_agency_desc}
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#14B8A6]" />
                  <span>{d.biz_agency_b1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#14B8A6]" />
                  <span>{d.biz_agency_b2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#14B8A6]" />
                  <span>{d.biz_agency_b3}</span>
                </div>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-700 rounded-2xl p-6 sm:p-8">
              {!isSuccess ? (
                <form onSubmit={handlePartnerSubmit} className="space-y-3.5">
                  <h4 className="text-base font-bold text-white mb-2">{d.biz_form_title}</h4>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-200 flex items-start gap-2">
                      <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={d.biz_form_name_ph}
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                    <input
                      type="text"
                      placeholder={d.biz_form_firm_ph}
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      placeholder={d.biz_form_email_ph}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                    <input
                      type="tel"
                      placeholder={d.biz_form_phone_ph}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={d.biz_form_npn_ph}
                      value={npn}
                      onChange={(e) => setNpn(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                    />
                    <select
                      value={producerCount}
                      onChange={(e) => setProducerCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
                    >
                      <option value="Solo">{d.biz_opt_solo}</option>
                      <option value="2-5">{d.biz_opt_2_5}</option>
                      <option value="6-20">{d.biz_opt_6_20}</option>
                      <option value="21-50">{d.biz_opt_21_50}</option>
                      <option value="50+">{d.biz_opt_50plus}</option>
                    </select>
                  </div>

                  <label className="flex items-start gap-2 pt-1 text-[11px] text-slate-300 leading-snug cursor-pointer">
                    <input
                      type="checkbox"
                      checked={partnerConsent}
                      onChange={(e) => setPartnerConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 text-[#14B8A6] focus:ring-0 accent-[#14B8A6]"
                    />
                    <span>
                      {d.biz_form_consent}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{d.biz_form_loading}</span>
                    ) : (
                      <>
                        <span>{d.biz_form_btn}</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white">{d.biz_success_title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {d.biz_success_desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
