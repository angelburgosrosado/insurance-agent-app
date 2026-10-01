"use client";

import React from "react";
import {
  Shield,
  HeartPulse,
  TrendingUp,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Phone,
  AlertCircle,
  Lock,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useQuoteAndLeadRouting } from "@/lib/hooks/useQuoteAndLeadRouting";
import { MyIADProductCategory } from "@/lib/integrations/crm-myiad";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";

interface QuoteSelectorFormProps {
  className?: string;
  defaultCategory?: MyIADProductCategory;
}

export function QuoteSelectorForm({
  className = "",
  defaultCategory,
}: QuoteSelectorFormProps) {
  const {
    step,
    category,
    quoteParams,
    contact,
    fieldErrors,
    submissionState,
    serverError,
    leadId,
    territoryInfo,
    isCalendarModalOpen,
    selectCategory,
    updateQuoteParam,
    updateContact,
    nextStep,
    prevStep,
    goToStep,
    submitLead,
    reset,
    openCalendarModal,
    closeCalendarModal,
  } = useQuoteAndLeadRouting();

  // If default category provided and at step 1, sync
  React.useEffect(() => {
    if (defaultCategory && defaultCategory !== category && step === 1) {
      selectCategory(defaultCategory);
    }
  }, [defaultCategory, category, step, selectCategory]);

  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${className}`}
      style={{
        boxShadow: "0 20px 40px -15px rgba(11, 31, 58, 0.08), 0 0 1px 1px rgba(11, 31, 58, 0.04)",
      }}
    >
      {/* Top Header & Quick Schedule Action */}
      <div className="bg-[#0B1F3A] text-white p-6 md:p-8 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={12} className="text-teal-400" />
              <span>Intelligent Lead Routing &bull; crm.myiad.net</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Instant Advisory Quote Selector
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Compare institutional solutions across Florida & Puerto Rico. Fast, confidential, and directly connected to licensed fiduciary advisors.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={openCalendarModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-teal-300 border border-teal-500/30 transition-all cursor-pointer shadow-sm hover:border-teal-400"
              aria-label="Skip to calendar consultation booking"
            >
              <Calendar size={14} className="text-teal-400" />
              <span>Skip Form &bull; Book Meeting</span>
            </button>
          </div>
        </div>

        {/* Step Progress Indicator */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="grid grid-cols-4 gap-2 text-xs font-medium">
            {[
              { num: 1, label: "Coverage" },
              { num: 2, label: "Parameters" },
              { num: 3, label: "Advisory Intake" },
              { num: 4, label: "Confirmation" },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex flex-col gap-1 transition-all ${
                  step >= s.num ? "text-white" : "text-slate-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s.num
                        ? "bg-[#2563EB] text-white ring-4 ring-blue-500/30"
                        : step > s.num
                        ? "bg-teal-500 text-slate-950 font-extrabold"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {step > s.num ? "✓" : s.num}
                  </span>
                  <span className="hidden sm:inline font-semibold">{s.label}</span>
                </div>
                <div
                  className={`h-1 w-full rounded-full transition-all mt-1 ${
                    step > s.num
                      ? "bg-teal-500"
                      : step === s.num
                      ? "bg-[#2563EB]"
                      : "bg-slate-800"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content Area */}
      <div className="p-6 md:p-8 bg-[#F8FAFC]">
        {/* Global Error Banner */}
        {serverError && (
          <div
            role="alert"
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-semibold flex items-start gap-3 shadow-sm"
          >
            <AlertCircle size={18} className="shrink-0 text-red-600 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Submission Alert</p>
              <p>{serverError}</p>
            </div>
          </div>
        )}

        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center max-w-lg mx-auto space-y-1">
              <h4 className="text-xl font-extrabold text-[#0B1F3A]">
                Select Inquiring Protection or Wealth Category
              </h4>
              <p className="text-xs text-slate-600">
                Choose the program that matches your immediate financial objectives.
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              role="radiogroup"
              aria-label="Product Category Selection"
            >
              {/* Option 1: Life Insurance & IUL */}
              <button
                type="button"
                role="radio"
                aria-checked={category === "life"}
                onClick={() => selectCategory("life")}
                className={`p-6 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  category === "life"
                    ? "bg-white border-[#2563EB] shadow-lg ring-2 ring-blue-500/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                    <Shield size={24} />
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 mb-2">
                    Tax-Free Growth &amp; Protection
                  </div>
                  <h5 className="text-base font-bold text-slate-900 mb-1">
                    Life Insurance &amp; IUL
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Term life, whole life, and IRS Section 7702 Indexed Universal Life with 0% market floor and tax-free retirement loans.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span>Custom Quote &bull; Instant Rates</span>
                  <ChevronRight size={16} />
                </div>
              </button>

              {/* Option 2: Health Insurance & Medicare */}
              <button
                type="button"
                role="radio"
                aria-checked={category === "health"}
                onClick={() => selectCategory("health")}
                className={`p-6 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  category === "health"
                    ? "bg-white border-[#14B8A6] shadow-lg ring-2 ring-teal-500/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-teal-50 text-[#14B8A6] flex items-center justify-center mb-4">
                    <HeartPulse size={24} />
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 mb-2">
                    Marketplace &amp; Senior Solutions
                  </div>
                  <h5 className="text-base font-bold text-slate-900 mb-1">
                    Health &amp; Medicare
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ACA individual and family exchange plans, Medicare Advantage (Part C), Medigap supplements, and dental/vision riders.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600">
                  <span>Subsidy Check &bull; Plan Comparison</span>
                  <ChevronRight size={16} />
                </div>
              </button>

              {/* Option 3: Variable Annuity & Wealth Transfer */}
              <button
                type="button"
                role="radio"
                aria-checked={category === "variable_annuity"}
                onClick={() => selectCategory("variable_annuity")}
                className={`p-6 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  category === "variable_annuity"
                    ? "bg-white border-[#C5A059] shadow-lg ring-2 ring-amber-500/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#C5A059] flex items-center justify-center mb-4">
                    <TrendingUp size={24} />
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 mb-2">
                    FINRA 2330 / Wealth Shield
                  </div>
                  <h5 className="text-base font-bold text-slate-900 mb-1">
                    Variable Annuities
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tax-deferred market-linked investment portfolios, 401(k)/IRA rollovers, guaranteed lifetime withdrawal benefits, and legacy preservation.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-800">
                  <span>Institutional Math &bull; Rollovers</span>
                  <ChevronRight size={16} />
                </div>
              </button>

              {/* Option 4: Strategic Advisory & Producer Partnership */}
              <button
                type="button"
                role="radio"
                aria-checked={category === "strategic_advisory" || category === "strategic-portfolio"}
                onClick={() => selectCategory("strategic_advisory")}
                className={`p-6 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  category === "strategic_advisory" || category === "strategic-portfolio"
                    ? "bg-white border-indigo-600 shadow-lg ring-2 ring-indigo-500/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                    <Briefcase size={24} />
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-900 mb-2">
                    B2B &amp; HNW Advisory
                  </div>
                  <h5 className="text-base font-bold text-slate-900 mb-1">
                    Strategic Advisory
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Independent producer contracting, high-net-worth wealth architecture, and executive succession planning.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-700">
                  <span>Agency Portal &bull; Fiduciary Review</span>
                  <ChevronRight size={16} />
                </div>
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Step 2: Configure Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DYNAMIC PARAMETERS BASED ON CATEGORY */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-blue-600">
                  Step 2 of 4 &bull; Customizing {category === "life" ? "Life Insurance" : category === "health" ? "Health & Medicare" : category === "variable_annuity" ? "Variable Annuities" : "Strategic Advisory"}
                </span>
                <h4 className="text-xl font-black text-[#0B1F3A]">
                  Tailor Your Strategy Requirements
                </h4>
              </div>
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
              >
                Change Category
              </button>
            </div>

            {/* DYNAMIC FIELDS: LIFE INSURANCE */}
            {category === "life" && (
              <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Product Architecture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "indexed_universal_life", label: "Indexed Universal Life (IUL)", desc: "0% Floor, Tax-Free Income" },
                      { id: "term_life", label: "Term Life Protection", desc: "10-30 Yr Pure Death Benefit" },
                      { id: "whole_life", label: "Whole Life / Final Expense", desc: "Guaranteed Cash Value" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateQuoteParam("productSubtype", opt.id)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          quoteParams.productSubtype === opt.id
                            ? "bg-blue-50/70 border-blue-500 text-blue-900 font-bold ring-1 ring-blue-500"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <p className="font-bold text-slate-900">{opt.label}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Target Protection Amount
                    </label>
                    <select
                      value={quoteParams.coverageOrInvestmentAmount}
                      onChange={(e) => updateQuoteParam("coverageOrInvestmentAmount", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="$250,000">$250,000 (Starter Protection)</option>
                      <option value="$500,000">$500,000 (Recommended Family Baseline)</option>
                      <option value="$1,000,000">$1,000,000 (Executive / Asset Shield)</option>
                      <option value="$2,000,000+">$2,000,000+ (High Net Worth / Estate Plan)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Term Horizon / Duration
                    </label>
                    <select
                      value={quoteParams.termLengthYears || "20 years"}
                      onChange={(e) => updateQuoteParam("termLengthYears", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="15 years">15 Years</option>
                      <option value="20 years">20 Years (Most Common)</option>
                      <option value="30 years">30 Years</option>
                      <option value="Permanent / Age 100">Permanent / Age 100 (IUL/Whole Life)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Age Bracket
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["18-29", "30-45", "46-59", "60+"].map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => updateQuoteParam("ageRange", age)}
                          className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quoteParams.ageRange === age
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Tobacco / Nicotine Use
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: "no", label: "Non-Tobacco (Preferred)" },
                        { val: "yes", label: "Tobacco / Vaping" },
                      ].map((tob) => (
                        <button
                          key={tob.val}
                          type="button"
                          onClick={() => updateQuoteParam("tobaccoUse", tob.val)}
                          className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quoteParams.tobaccoUse === tob.val
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {tob.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC FIELDS: HEALTH & MEDICARE */}
            {category === "health" && (
              <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Program Classification
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "aca_individual_family", label: "ACA Marketplace (Under 65)", desc: "Tax Subsidies & Comprehensive Care" },
                      { id: "medicare_advantage_part_c", label: "Medicare Advantage / Medigap", desc: "Age 65+ or Qualifying Disability" },
                      { id: "supplemental_dental_vision", label: "Small Group / Dental & Vision", desc: "Business & Supplemental Riders" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateQuoteParam("productSubtype", opt.id)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          quoteParams.productSubtype === opt.id
                            ? "bg-teal-50/70 border-teal-500 text-teal-900 font-bold ring-1 ring-teal-500"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <p className="font-bold text-slate-900">{opt.label}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Household Enrollees
                    </label>
                    <select
                      value={quoteParams.householdMembers || "2-3"}
                      onChange={(e) => updateQuoteParam("householdMembers", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="1">1 Person (Individual)</option>
                      <option value="2-3">2-3 Persons (Couple / Small Family)</option>
                      <option value="4+">4+ Persons (Large Family)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Current Coverage Status
                    </label>
                    <select
                      value={quoteParams.currentPlanStatus || "Exploring better options"}
                      onChange={(e) => updateQuoteParam("currentPlanStatus", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="Uninsured / No active plan">Uninsured / No active plan</option>
                      <option value="Job Change / COBRA Expiring">Job Change / COBRA Expiring</option>
                      <option value="Turning 65 soon (Medicare Initial Enrollment)">Turning 65 soon (Medicare Initial Enrollment)</option>
                      <option value="Exploring better rates or broader network">Exploring better rates or broader network</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC FIELDS: VARIABLE ANNUITY & RETIREMENT */}
            {category === "variable_annuity" && (
              <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Annuity &amp; Rollover Strategy
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "deferred_variable_annuity", label: "Deferred Variable Annuity", desc: "Market-Linked Subaccounts + Death Benefit" },
                      { id: "fixed_indexed_annuity", label: "Fixed Indexed Annuity (FIA)", desc: "100% Principal Protection + S&P Cap" },
                      { id: "401k_ira_rollover", label: "401(k) / IRA Direct Rollover", desc: "Transfer Without Tax Penalty" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateQuoteParam("productSubtype", opt.id)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          quoteParams.productSubtype === opt.id
                            ? "bg-amber-50/70 border-amber-500 text-amber-900 font-bold ring-1 ring-amber-500"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <p className="font-bold text-slate-900">{opt.label}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Estimated Rollover or Allocation
                    </label>
                    <select
                      value={quoteParams.coverageOrInvestmentAmount}
                      onChange={(e) => updateQuoteParam("coverageOrInvestmentAmount", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                      <option value="$100,000 - $250,000">$100,000 - $250,000 (Standard)</option>
                      <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                      <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                      <option value="$1,000,000+">$1,000,000+ (Institutional Tier)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Target Retirement Horizon
                    </label>
                    <select
                      value={quoteParams.targetRetirementAge || "60-65"}
                      onChange={(e) => updateQuoteParam("targetRetirementAge", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="Already Retired (Immediate Income)">Already Retired (Immediate Income)</option>
                      <option value="Under 5 Years">Within Next 5 Years</option>
                      <option value="5 to 10 Years">5 to 10 Years</option>
                      <option value="10+ Years">10+ Years (Accumulation Focus)</option>
                    </select>
                  </div>
                </div>

                {/* FINRA Rule 2330 Compliance Notice */}
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-[11px] text-amber-900 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-amber-950">
                    <Shield size={14} className="text-amber-700" />
                    <span>FINRA Rule 2330 Compliance &amp; Supervisory Disclosure</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">
                    Variable annuities are long-term contracts designed for retirement savings and are subject to market fluctuations, surrender charges, mortality/expense fees, and tax consequences upon early withdrawal. All annuity proposals undergo formal supervisory suitability reviews by registered principals prior to execution.
                  </p>
                  <div className="pt-2 border-t border-amber-500/20">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(quoteParams.finraDisclosureAcknowledged)}
                        onChange={(e) => updateQuoteParam("finraDisclosureAcknowledged", e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                      <span className="font-semibold text-amber-950">
                        I acknowledge the FINRA Rule 2330 investment risk disclosure and supervisory suitability review requirements prior to policy illustration.
                      </span>
                    </label>
                    {fieldErrors.finraDisclosureAcknowledged && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1">
                        {fieldErrors.finraDisclosureAcknowledged}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC FIELDS: STRATEGIC ADVISORY & PRODUCER PARTNERSHIP */}
            {(category === "strategic_advisory" || category === "strategic-portfolio") && (
              <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Advisory &amp; Partnership Track
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "producer_partnership", label: "Independent Producer / Agency", desc: "MyIAD AI suite, bilingual quoting & top tier contracts" },
                      { id: "hnw_wealth_architecture", label: "HNW Wealth Architecture", desc: "Private family office, 0% floor tax-sheltered vaults" },
                      { id: "executive_succession", label: "Executive & Key-Person Plan", desc: "Business succession funding & retention covenants" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateQuoteParam("productSubtype", opt.id)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          quoteParams.productSubtype === opt.id
                            ? "bg-indigo-50/70 border-indigo-500 text-indigo-900 font-bold ring-1 ring-indigo-500"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <p className="font-bold text-slate-900">{opt.label}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Target Scale / Production Tier
                    </label>
                    <select
                      value={quoteParams.coverageOrInvestmentAmount}
                      onChange={(e) => updateQuoteParam("coverageOrInvestmentAmount", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="$250,000 - $500,000">$250,000 - $500,000 (Emerging Practice / Estate)</option>
                      <option value="$500,000 - $1,000,000">$500,000 - $1,000,000 (Established Advisory)</option>
                      <option value="$1,000,000 - $5,000,000+">$1,000,000 - $5,000,000+ (Institutional / Principal)</option>
                      <option value="Enterprise / Multi-Advisor Production Pool">Enterprise / Agency Production Pool</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Practice / Client Structure
                    </label>
                    <select
                      value={quoteParams.currentPlanStatus || "Independent Practice / Expansion"}
                      onChange={(e) => updateQuoteParam("currentPlanStatus", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Independent Practice / Solo Producer">Independent Practice / Solo Producer</option>
                      <option value="Boutique Agency / IMO Affiliate (2-10 Advisors)">Boutique Agency / IMO Affiliate (2-10 Advisors)</option>
                      <option value="Enterprise Brokerage / Multi-State Firm">Enterprise Brokerage / Multi-State Firm</option>
                      <option value="Private HNW Family / Corporate Principal">Private HNW Family / Corporate Principal</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-[11px] text-indigo-950 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Sparkles size={14} className="text-indigo-600" />
                    <span>Fiduciary Partnership &amp; High-Volume Protocol</span>
                  </p>
                  <p className="leading-relaxed text-slate-600">
                    Submissions route directly to Angel Burgos for principal-to-principal onboarding, contract validation, and proprietary quoting engine enablement.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Step 3: Contact Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT & ROUTING INTAKE */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-blue-600">
                  Step 3 of 4 &bull; Intake Verification
                </span>
                <h4 className="text-xl font-black text-[#0B1F3A]">
                  Where Should We Deliver Your Strategy Analysis?
                </h4>
              </div>
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
              >
                Edit Parameters
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria"
                    value={contact.firstName}
                    onChange={(e) => updateContact("firstName", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      fieldErrors.firstName
                        ? "border-red-500 ring-1 ring-red-500 bg-red-50/20"
                        : "border-slate-300 focus:ring-blue-500"
                    }`}
                  />
                  {fieldErrors.firstName && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Santos"
                    value={contact.lastName}
                    onChange={(e) => updateContact("lastName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      fieldErrors.email
                        ? "border-red-500 ring-1 ring-red-500 bg-red-50/20"
                        : "border-slate-300 focus:ring-blue-500"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Mobile Phone <span className="text-red-600">*</span>
                    </label>
                    {contact.phone.replace(/\D/g, "").length >= 3 && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {territoryInfo.flag} {territoryInfo.label}
                      </span>
                    )}
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="(386) 333-1482"
                    value={contact.phone}
                    onChange={(e) => updateContact("phone", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      fieldErrors.phone
                        ? "border-red-500 ring-1 ring-red-500 bg-red-50/20"
                        : "border-slate-300 focus:ring-blue-500"
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* ZIP Code & Preferred Window & Preferred Method */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    5-Digit ZIP Code <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="32837 or 00901"
                    value={contact.zipCode}
                    onChange={(e) => updateContact("zipCode", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      fieldErrors.zipCode
                        ? "border-red-500 ring-1 ring-red-500 bg-red-50/20"
                        : "border-slate-300 focus:ring-blue-500"
                    }`}
                  />
                  {fieldErrors.zipCode && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">
                      {fieldErrors.zipCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Preferred Contact Window
                  </label>
                  <select
                    value={contact.preferredTimeOfDay}
                    onChange={(e) => updateContact("preferredTimeOfDay", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="morning">Morning (9:00 AM - 12:00 PM EST)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 5:00 PM EST)</option>
                    <option value="evening">Evening (5:00 PM - 8:00 PM EST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Preferred Contact Method
                  </label>
                  <select
                    value={contact.preferredContactMethod || "phone"}
                    onChange={(e) => updateContact("preferredContactMethod", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="phone">Phone Call</option>
                    <option value="text">SMS Text Message</option>
                    <option value="video_consultation">Video Consultation</option>
                    <option value="email">Email Report First</option>
                  </select>
                </div>
              </div>

              {/* Consent Box */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={contact.consent}
                    onChange={(e) => updateContact("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-600 leading-relaxed">
                    By checking this box and clicking &apos;Submit &amp; Route Inbound Quote&apos;, I provide express affirmative written consent for Angel Burgos and AB Global Consulting / MyIAD representatives to contact me at the phone number and email provided regarding insurance and financial advisory solutions. I understand consent is not required as a condition of purchase and message/data rates may apply. You may opt out at any time.
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {fieldErrors.consent}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={submissionState === "submitting"}
                onClick={submitLead}
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submissionState === "submitting" ? (
                  <span>Routing to crm.myiad.net...</span>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Submit &amp; Route Inbound Quote</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUBMISSION CONFIRMATION & CALENDLY / CAL.COM SCHEDULING */}
        {step === 4 && (
          <div className="space-y-6 text-center py-6">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-inner">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                Routed to CRM Pipeline &bull; Tracking ID: {leadId || "MYIAD-2026-X89K2"}
              </span>
              <h4 className="text-2xl font-black text-[#0B1F3A]">
                Quote Request Successfully Processed!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you, <strong>{contact.firstName}</strong>. Your scenario has been routed to our regional advisory team in{" "}
                <strong>{territoryInfo.label}</strong>. A licensed specialist is preparing your figures.
              </p>
            </div>

            {/* Direct Consultation Embed / Trigger */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 max-w-2xl mx-auto text-left space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <Calendar size={22} className="text-teal-400 shrink-0" />
                <div>
                  <h5 className="text-base font-bold text-white">
                    Step 2: Lock In a 15-Minute Video or Phone Session
                  </h5>
                  <p className="text-xs text-slate-400">
                    Bypass waiting. Choose an exact time directly on Angel Burgos&apos;s live calendar.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={openCalendarModal}
                  className="px-6 py-3 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar size={14} />
                  <span>Open Real-Time Scheduler</span>
                  <ArrowRight size={14} />
                </button>

                <a
                  href="tel:3863331482"
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
                >
                  <Phone size={14} className="text-teal-400" />
                  <span>Call (386) 333-1482</span>
                </a>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={reset}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Submit another quote or change details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating or Pop-up Consultation Modal with Prospect Prefill */}
      <CalendarBookingModal
        isModal={true}
        isOpenModal={isCalendarModalOpen}
        onCloseModal={closeCalendarModal}
        prefillName={contact.firstName ? `${contact.firstName} ${contact.lastName}`.trim() : undefined}
        prefillEmail={contact.email || undefined}
      />
    </div>
  );
}
