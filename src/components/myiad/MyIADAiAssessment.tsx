"use client";

import React, { useState, useId } from "react";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Phone,
  Calendar,
  AlertCircle,
  Zap,
  MessageSquare,
} from "lucide-react";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";
import { generateScenarioDiagnostic, type AssessmentScenario } from "@/lib/myiad-ai-copilot";
import { useLanguage } from "@/context/LanguageContext";
import { myiadDict } from "@/lib/i18n/myiad-dict";

export function MyIADAiAssessment() {
  const { lang, t } = useLanguage();
  const d = myiadDict[lang];
  const isSpanish = lang === "es";
  const goalId = useId();
  const ageId = useId();
  const incomeId = useId();
  const dependentsId = useId();
  const debtId = useId();
  const [goal, setGoal] = useState<"iul_wealth" | "lifetime_annuity" | "family_protection" | "health_living">("iul_wealth");
  const [age, setAge] = useState<number>(38);
  const [annualIncome, setAnnualIncome] = useState<number>(110000);
  const [dependents, setDependents] = useState<number>(2);
  const [debt, setDebt] = useState<number>(250000);

  // Contact capture state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [blueprintUrl, setBlueprintUrl] = useState<string>("");

  // Dynamic calculations based on D.I.M.E. & institutional IUL math
  const incomeReplacement = annualIncome * Math.min(10, Math.max(5, 65 - age));
  const educationFund = dependents * 75000;
  const finalExpense = 25000;
  const calculatedCoverageNeed = debt + incomeReplacement + educationFund + finalExpense;

  // IUL projected tax-free retirement annual payout (illustrative at 6.8% historical S&P cap w/ 0% floor)
  const yearsToRetirement = Math.max(5, 65 - age);
  const estimatedMonthlySavings = Math.round((annualIncome * 0.12) / 12);
  const projectedCashValueAt65 = Math.round(
    estimatedMonthlySavings * 12 * ((Math.pow(1 + 0.068, yearsToRetirement) - 1) / 0.068)
  );
  const estimatedAnnualTaxFreeIncome = Math.round(projectedCashValueAt65 * 0.075);

  const scenarioData: AssessmentScenario = {
    goal,
    age,
    annualIncome,
    dependents,
    debt,
    calculatedCoverageNeed,
    projectedCashValueAt65,
    estimatedAnnualTaxFreeIncome,
  };
  const diagnostic = generateScenarioDiagnostic(scenarioData, isSpanish ? "es" : "en");

  const handleAskCopilot = (customQuery?: string) => {
    const event = new CustomEvent("open-myiad-copilot", {
      detail: {
        query: customQuery || diagnostic.suggestedPrompt,
        scenario: scenarioData,
      },
    });
    window.dispatchEvent(event);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedZip = zipCode.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedZip) {
      setErrorMessage(isSpanish ? "Por favor complete todos los campos obligatorios." : "Please complete all required fields.");
      return;
    }

    if (!consent) {
      setErrorMessage(isSpanish ? "Por favor confirme el consentimiento de comunicación TCPA." : "Please confirm TCPA communication consent.");
      return;
    }

    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "Client";

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: trimmedName,
        applicantName: trimmedName,
        name: trimmedName,
        applicantFirstName: firstName,
        applicantLastName: lastName,
        firstName,
        lastName,
        applicantEmail: trimmedEmail,
        email: trimmedEmail,
        applicantPhone: trimmedPhone,
        phone: trimmedPhone,
        zipCode: trimmedZip,
        category: goal === "lifetime_annuity" ? "variable_annuity" : goal === "health_living" ? "health" : "life",
        coverageAmount: calculatedCoverageNeed,
        source: "myiad.com/ai-assessment",
        consent: true,
        consentTimestamp: new Date().toISOString(),
        consentVersion: "myiad_tcpa_v2.0",
        quoteParameters: {
          category: goal === "lifetime_annuity" ? "variable_annuity" : goal === "health_living" ? "health" : "life",
          productSubtype: goal === "lifetime_annuity" ? "fixed_index_annuity" : goal === "health_living" ? "medicare_living" : "iul_wealth",
          coverageOrInvestmentAmount: `$${Math.round(calculatedCoverageNeed).toLocaleString("en-US")}`,
          age,
          annualIncome,
          dependents,
          debt,
          recommendedCoverage: calculatedCoverageNeed,
          estimatedTaxFreeIncome: estimatedAnnualTaxFreeIncome,
          selectedGoal: goal,
        },
      };

      const res = await fetch("/api/leads/quote-routing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || (isSpanish ? "No se pudo enviar la evaluación. Intente nuevamente." : "Unable to submit assessment. Please try again."));
      }

      if (data?.blueprintUrl) {
        setBlueprintUrl(data.blueprintUrl);
      } else {
        setBlueprintUrl(
          `/api/reports/download?type=myiad_blueprint&name=${encodeURIComponent(trimmedName)}&coverage=${calculatedCoverageNeed}&income=${annualIncome}&debt=${debt}&age=${age}&dependents=${dependents}&taxFreeIncome=${estimatedAnnualTaxFreeIncome}`
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : (isSpanish ? "Error al conectar con la central de asesores." : "Error connecting to advisor dispatch.");
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="ai-assessment" className="py-16 md:py-24 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-600/10 via-[#14B8A6]/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#14B8A6] animate-pulse" />
            <span>{d.assessment_badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {d.assessment_title}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-[#14B8A6] to-teal-300 bg-clip-text text-transparent">
              {d.assessment_title_highlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {d.assessment_desc}
          </p>
        </div>

        {/* Assessment Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#2563EB]/30 text-[#14B8A6] flex items-center justify-center font-bold">
                  <Calculator size={18} />
                </div>
                <h3 className="text-lg font-black text-white">{d.assessment_params_title}</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{d.assessment_step_1}</span>
            </div>

            {/* Goal Selector */}
            <div className="space-y-2.5">
              <label htmlFor={goalId} className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                {d.assessment_primary_obj}
              </label>
              <div id={goalId} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setGoal("iul_wealth")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    goal === "iul_wealth"
                      ? "bg-[#2563EB]/25 border-[#14B8A6] text-white shadow-md shadow-teal-500/10"
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{d.assessment_goal_iul}</span>
                    <TrendingUp size={16} className={goal === "iul_wealth" ? "text-[#14B8A6]" : "text-slate-500"} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {d.assessment_goal_iul_desc}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setGoal("family_protection")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    goal === "family_protection"
                      ? "bg-[#2563EB]/25 border-[#14B8A6] text-white shadow-md shadow-teal-500/10"
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{d.assessment_goal_family}</span>
                    <ShieldCheck size={16} className={goal === "family_protection" ? "text-[#14B8A6]" : "text-slate-500"} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {d.assessment_goal_family_desc}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setGoal("lifetime_annuity")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    goal === "lifetime_annuity"
                      ? "bg-[#2563EB]/25 border-[#14B8A6] text-white shadow-md shadow-teal-500/10"
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{d.assessment_goal_annuity}</span>
                    <Zap size={16} className={goal === "lifetime_annuity" ? "text-[#14B8A6]" : "text-slate-500"} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {d.assessment_goal_annuity_desc}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setGoal("health_living")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    goal === "health_living"
                      ? "bg-[#2563EB]/25 border-[#14B8A6] text-white shadow-md shadow-teal-500/10"
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{d.assessment_goal_health}</span>
                    <CheckCircle2 size={16} className={goal === "health_living" ? "text-[#14B8A6]" : "text-slate-500"} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {d.assessment_goal_health_desc}
                  </p>
                </button>
              </div>
            </div>

            {/* Slider Inputs */}
            <div className="space-y-5 pt-2">
              {/* Age Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label htmlFor={ageId} className="text-slate-300 uppercase tracking-wider">{d.assessment_age_label}</label>
                  <span className="font-mono text-base font-bold text-[#14B8A6]">{age} {d.assessment_age_years}</span>
                </div>
                <input
                  id={ageId}
                  type="range"
                  min="21"
                  max="72"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
                />
              </div>

              {/* Annual Household Income Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label htmlFor={incomeId} className="text-slate-300 uppercase tracking-wider">{d.assessment_income_label}</label>
                  <span className="font-mono text-base font-bold text-[#14B8A6]">
                    ${annualIncome.toLocaleString()}
                  </span>
                </div>
                <input
                  id={incomeId}
                  type="range"
                  min="35000"
                  max="450000"
                  step="5000"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
                />
              </div>

              {/* Dependents & Debt Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <label htmlFor={dependentsId} className="text-slate-300 uppercase tracking-wider">{d.assessment_dependents_label}</label>
                    <span className="font-mono text-sm font-bold text-white">{dependents}</span>
                  </div>
                  <input
                    id={dependentsId}
                    type="range"
                    min="0"
                    max="6"
                    value={dependents}
                    onChange={(e) => setDependents(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <label htmlFor={debtId} className="text-slate-300 uppercase tracking-wider">{d.assessment_debt_label}</label>
                    <span className="font-mono text-sm font-bold text-white">${debt.toLocaleString("en-US")}</span>
                  </div>
                  <input
                    id={debtId}
                    type="range"
                    min="0"
                    max="1000000"
                    step="25000"
                    value={debt}
                    onChange={(e) => setDebt(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
                  />
                </div>
              </div>

              {/* Live AI Scenario Diagnostic Box */}
              <div className="pt-6 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-[#14B8A6] flex items-center justify-center">
                      <Sparkles size={14} className="animate-pulse" />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                      {d.assessment_diag_title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded">
                    {d.assessment_diag_statutory}
                  </span>
                </div>

                {/* Executive Brief */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 leading-relaxed space-y-2">
                  <p className="font-bold text-white text-sm">{diagnostic.headline}</p>
                  <p>{diagnostic.executiveSummary}</p>
                </div>

                {/* Identified Vulnerabilities */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {d.assessment_vulns_prefix} ({diagnostic.vulnerabilityGaps.length}):
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {diagnostic.vulnerabilityGaps.map((gap, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300"
                      >
                        <AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-100 block">{gap.title}</span>
                          <span className="text-[11px] text-slate-400 mt-0.5 block">{gap.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategic Solution Pillars */}
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {d.assessment_chassis_prefix}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {diagnostic.strategicPillars.map((pillar, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/70 text-[11px] text-slate-300"
                      >
                        <span className="text-[#14B8A6] font-bold block truncate">{pillar.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          {pillar.statutoryRef}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ask Copilot Button Bridge */}
                <button
                  type="button"
                  onClick={() => handleAskCopilot()}
                  className="w-full py-3 px-4 rounded-xl bg-[#2563EB]/20 hover:bg-[#2563EB]/35 border border-blue-500/40 text-blue-200 hover:text-white text-xs font-bold transition-all flex items-center justify-between cursor-pointer group shadow"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-[#14B8A6]" />
                    <span>{d.assessment_ask_copilot_btn}</span>
                  </div>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#14B8A6]" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: AI Output & Instant Lead Capture (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-[#0c1f38] border border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-teal-950/40 relative">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-400">
                  <Sparkles size={14} />
                  <span>{d.assessment_proj_badge}</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {d.assessment_proj_status}
                </span>
              </div>

              {/* Projections Highlight Card */}
              <div className="bg-slate-800/80 rounded-2xl p-4.5 border border-slate-700 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400 font-medium">{d.assessment_floor_label}</span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white">
                    ${Math.round(calculatedCoverageNeed).toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400 font-medium">{d.assessment_taxfree_label}</span>
                  <span className="font-mono text-lg font-black text-[#14B8A6]">
                    ${estimatedAnnualTaxFreeIncome.toLocaleString("en-US")}{d.assessment_yr_suffix}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{d.assessment_volatility_label}</span>
                  <strong className="text-emerald-400 font-bold">{d.assessment_volatility_val}</strong>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleAskCopilot(
                      isSpanish
                        ? `¿Cómo se calcula el piso de protección recomendado de $${Math.round(calculatedCoverageNeed).toLocaleString("en-US")} para mi edad y deuda?`
                        : `How is the recommended $${Math.round(calculatedCoverageNeed).toLocaleString("en-US")} protection floor calculated for my age and debt?`
                    )
                  }
                  className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles size={12} className="text-[#14B8A6]" />
                  <span>{d.assessment_explain_btn}</span>
                </button>
              </div>

              {/* Lead Unlock Form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {d.assessment_form_intro}
                  </p>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-start gap-2">
                      <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <input
                      id="assessment-full-name"
                      name="fullName"
                      autoComplete="name"
                      type="text"
                      placeholder={d.assessment_name_ph}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="email"
                      placeholder={d.assessment_email_ph}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                    <input
                      type="tel"
                      placeholder={d.assessment_phone_ph}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder={d.assessment_zip_ph}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                  </div>

                  {/* TCPA Checkbox */}
                  <label className="flex items-start gap-2.5 pt-1 text-[11px] text-slate-300 leading-snug cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 text-[#14B8A6] focus:ring-0 accent-[#14B8A6]"
                    />
                    <span>
                      {d.assessment_tcpa}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{d.assessment_submit_loading}</span>
                    ) : (
                      <>
                        <span>{d.assessment_submit_btn}</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-slate-800/90 rounded-2xl p-6 text-center space-y-4 border border-teal-500/40">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white">{d.assessment_success_title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {d.assessment_success_desc}
                  </p>
                  <div className="space-y-2.5 pt-2">
                    {blueprintUrl && (
                      <a
                        href={blueprintUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <TrendingUp size={14} />
                        <span>{d.assessment_dl_blueprint}</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Calendar size={14} />
                      <span>{d.assessment_lock_call}</span>
                    </button>
                    <a
                      href="tel:18888873585"
                      className="w-full py-2.5 rounded-xl border border-teal-500/40 text-teal-300 hover:bg-teal-500/10 font-bold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Phone size={14} />
                      <span>{d.assessment_call_tollfree}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isBookingOpen && (
        <CalendarBookingModal
          isModal={true}
          isOpenModal={isBookingOpen}
          onCloseModal={() => setIsBookingOpen(false)}
        />
      )}
    </section>
  );
}
