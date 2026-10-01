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
  Send,
  AlertCircle,
  Briefcase,
  FileCheck2,
} from "lucide-react";

export function MyIADBusinessDesign() {
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
            <span>Platform & Distribution Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            The MyIAD Business Design:{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Built for Modern Distribution
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            MyIAD is not just a consumer portal—it is an autonomous operating system designed for modern insurance agencies, brokerages, and IMOs seeking institutional growth.
          </p>
        </div>

        {/* 4 Pillars of the Business Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3.5 hover:border-blue-500/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Omnichannel AI Intake</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Responsive self-service calculators match prospect needs on mobile and desktop, pre-qualifying leads with D.I.M.E. math before producer interaction.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3.5 hover:border-teal-500/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center font-bold">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Sub-Second CRM Routing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Encrypted lead payloads dispatch instantly into <code>crm.myiad.net</code> with real-time advisor SMS alerts and automated case tracking.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3.5 hover:border-emerald-500/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Compliance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Programmatic FINRA Rule 2330 suitability review, statutory TCPA consent logging, and SEC Reg BI disclaimers embedded at every customer touchpoint.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3.5 hover:border-purple-500/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Agency White-Labeling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Turnkey deployment for downline agencies, complete with bilingual (EN/ES) quoting engines and multi-carrier comparative tables.
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
                <span>Enterprise & Agency Inquiries</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Deploy MyIAD Across Your Agency or Practice
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect your brokerage with our bilingual AI quoting architecture, compliant disclosures, and instant CRM pipeline. Request a private technology walkthrough with our enterprise platform team.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#14B8A6]" />
                  <span>Custom domain & subdomain white-labeling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#14B8A6]" />
                  <span>Direct webhook ingestion into existing AMS/CRM systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#14B8A6]" />
                  <span>Strict supervisory FINRA 2330 suitability controls</span>
                </div>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-700 rounded-2xl p-6 sm:p-8">
              {!isSuccess ? (
                <form onSubmit={handlePartnerSubmit} className="space-y-3.5">
                  <h4 className="text-base font-bold text-white mb-2">Request Agency Technology Walkthrough</h4>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-200 flex items-start gap-2">
                      <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Principal / Broker Name *"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Agency / Firm Name"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      placeholder="Work Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="National Producer # (NPN)"
                      value={npn}
                      onChange={(e) => setNpn(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                    />
                    <select
                      value={producerCount}
                      onChange={(e) => setProducerCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
                    >
                      <option value="Solo">Solo Producer</option>
                      <option value="2-5">2 - 5 Producers</option>
                      <option value="6-20">6 - 20 Producers</option>
                      <option value="21-50">21 - 50 Producers</option>
                      <option value="50+">50+ Enterprise / IMO</option>
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
                      I authorize MyIAD to contact me regarding enterprise platform deployment and distribution design walkthroughs.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Agency Inquiry...</span>
                    ) : (
                      <>
                        <span>Request Technology Walkthrough</span>
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
                  <h4 className="text-base font-bold text-white">Agency Inquiry Transmitted</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your request has been routed to our enterprise team. A MyIAD enterprise onboarding specialist will contact you directly with platform integration specifications.
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
