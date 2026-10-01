"use client";

import React, { useState, useId } from "react";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Lock,
  Phone,
  Calendar,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useQuoteAndLeadRouting } from "@/lib/hooks/useQuoteAndLeadRouting";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";

export function MyIADAiAssessment() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !phone.trim() || !zipCode.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!consent) {
      setErrorMessage("Please confirm TCPA communication consent.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: name,
        email,
        phone,
        zipCode,
        category: goal === "lifetime_annuity" ? "variable_annuity" : goal === "health_living" ? "health" : "life",
        coverageAmount: calculatedCoverageNeed,
        source: "myiad.com/ai-assessment",
        consent: true,
        consentTimestamp: new Date().toISOString(),
        consentVersion: "myiad_tcpa_v2.0",
        quoteParameters: {
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

      if (!res.ok) {
        throw new Error("Unable to submit assessment. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error connecting to advisor dispatch.";
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
            <span>Interactive Assessment Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Determine Your Exact Protection Need with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-[#14B8A6] to-teal-300 bg-clip-text text-transparent">
              Clinical Precision
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate guesswork. Our responsive AI model calculates your family income protection gap, tax-advantaged accumulation floor, and guaranteed retirement income trajectory in seconds.
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
                <h3 className="text-lg font-black text-white">Your Financial Parameters</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Step 1 of 2</span>
            </div>

            {/* Goal Selector */}
            <div className="space-y-2.5">
              <label htmlFor={goalId} className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Primary Wealth & Protection Objective
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
                    <span className="text-sm font-bold">IUL Wealth & 0% Floor</span>
                    <TrendingUp size={16} className={goal === "iul_wealth" ? "text-[#14B8A6]" : "text-slate-500"} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Tax-free cash growth under IRS §7702 with 0% downside floor.
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
                    <span className="text-sm font-bold">Family Income Shield</span>
                    <ShieldCheck size={16} className={goal === "family_protection" ? "text-[#14B8A6]" : "text-slate-500"} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Debt replacement and living benefits for family security.
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
                    <span className="text-sm font-bold">Guaranteed Lifetime Annuity</span>
                    <Zap size={16} className={goal === "lifetime_annuity" ? "text-[#14B8A6]" : "text-slate-500"} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    401(k)/IRA rollover into guaranteed lifetime paycheck.
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
                    <span className="text-sm font-bold">Health & Medicare Strategy</span>
                    <CheckCircle2 size={16} className={goal === "health_living" ? "text-[#14B8A6]" : "text-slate-500"} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Comprehensive ACA, Medicare Advantage, and Critical Illness.
                  </p>
                </button>
              </div>
            </div>

            {/* Slider Inputs */}
            <div className="space-y-5 pt-2">
              {/* Age Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label htmlFor={ageId} className="text-slate-300 uppercase tracking-wider">Current Age</label>
                  <span className="font-mono text-base font-bold text-[#14B8A6]">{age} years old</span>
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
                  <label htmlFor={incomeId} className="text-slate-300 uppercase tracking-wider">Annual Household Income</label>
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
                    <label htmlFor={dependentsId} className="text-slate-300 uppercase tracking-wider">Dependents</label>
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
                    <label htmlFor={debtId} className="text-slate-300 uppercase tracking-wider">Mortgage & Total Debt</label>
                    <span className="font-mono text-sm font-bold text-white">${(debt / 1000).toFixed(0)}k</span>
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
            </div>
          </div>

          {/* Right Column: AI Output & Instant Lead Capture (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-[#0c1f38] border border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-teal-950/40 relative">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-400">
                  <Sparkles size={14} />
                  <span>Real-Time AI Projection</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Calculated Instantly
                </span>
              </div>

              {/* Projections Highlight Card */}
              <div className="bg-slate-800/80 rounded-2xl p-4.5 border border-slate-700 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400 font-medium">Recommended Protection Floor:</span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white">
                    ${(calculatedCoverageNeed / 1000).toFixed(0)},000
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400 font-medium">Est. Annual Tax-Free Income at 65:</span>
                  <span className="font-mono text-lg font-black text-[#14B8A6]">
                    ${estimatedAnnualTaxFreeIncome.toLocaleString()}/yr
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Downside Volatility Risk:</span>
                  <strong className="text-emerald-400 font-bold">Guaranteed 0% Floor</strong>
                </div>
              </div>

              {/* Lead Unlock Form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Unlock your personalized, confidential <strong>AI Protection Blueprint</strong> and receive direct carrier-matched quotes across your state:
                  </p>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-start gap-2">
                      <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#14B8A6]"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="ZIP Code (FL / PR / US) *"
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
                      I authorize MyIAD Insurance Services and its network of licensed insurance professionals to contact me via phone, email, or SMS regarding my personalized blueprint and coverage options. Consent is not a condition of purchase.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Blueprint Parameters...</span>
                    ) : (
                      <>
                        <span>Get My Custom Blueprint</span>
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
                  <h4 className="text-base font-bold text-white">Assessment Parameters Logged</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your parameters have been logged into our secure nationwide underwriting pipeline. A licensed insurance specialist has been matched to your state.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full py-3 rounded-xl bg-[#14B8A6] hover:bg-teal-500 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Calendar size={14} />
                    <span>Lock in Diagnostic Call Now</span>
                  </button>
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
