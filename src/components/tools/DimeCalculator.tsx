"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";
import { ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

export function DimeCalculator() {
  const { lang } = useLanguage();
  const t = dictionary[lang];
  const isSpanish = lang === "es";

  // State for D.I.M.E. variables
  const [debt, setDebt] = useState<number>(25000);
  const [annualIncome, setAnnualIncome] = useState<number>(85000);
  const [incomeYears, setIncomeYears] = useState<number>(10);
  const [mortgage, setMortgage] = useState<number>(280000);
  const [childrenCount, setChildrenCount] = useState<number>(2);
  const [costPerChild, setCostPerChild] = useState<number>(75000);
  const [existingCoverage, setExistingCoverage] = useState<number>(100000);

  // Calculations
  const incomeReplacement = annualIncome * incomeYears;
  const educationTotal = childrenCount * costPerChild;
  const grossNeed = debt + incomeReplacement + mortgage + educationTotal;
  const netShortfall = Math.max(0, grossNeed - existingCoverage);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const emailSubject = encodeURIComponent(
    isSpanish ? "Análisis de Necesidades D.I.M.E. - AB Global" : "D.I.M.E. Family Protection Analysis - AB Global"
  );
  const emailBody = encodeURIComponent(
    isSpanish
      ? `Resultados del Análisis D.I.M.E.:\n- Deudas: ${formatCurrency(debt)}\n- Reemplazo de Ingresos (${incomeYears} años): ${formatCurrency(incomeReplacement)}\n- Hipoteca: ${formatCurrency(mortgage)}\n- Educación (${childrenCount} hijos): ${formatCurrency(educationTotal)}\n- Necesidad Total Bruta: ${formatCurrency(grossNeed)}\n- Cobertura Existente: ${formatCurrency(existingCoverage)}\n- Brecha Neta Desprotegida: ${formatCurrency(netShortfall)}\n\nConsulte con Angel Burgos en abglco.com.`
      : `D.I.M.E. Analysis Results:\n- Debt: ${formatCurrency(debt)}\n- Income Replacement (${incomeYears} yrs): ${formatCurrency(incomeReplacement)}\n- Mortgage: ${formatCurrency(mortgage)}\n- Education (${childrenCount} kids): ${formatCurrency(educationTotal)}\n- Total Gross Need: ${formatCurrency(grossNeed)}\n- Existing Coverage: ${formatCurrency(existingCoverage)}\n- Net Unprotected Shortfall: ${formatCurrency(netShortfall)}\n\nConsultation with Angel Burgos at abglco.com.`
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          {isSpanish ? "Metodología Científica D.I.M.E." : "Scientific D.I.M.E. Framework"}
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          {isSpanish ? "Calculadora de Necesidades de Protección Familiar" : "D.I.M.E. Family Protection Needs Calculator"}
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {isSpanish
            ? "Calcule con exactitud matemática cuánta cobertura de seguro de vida requiere su familia evaluando Deudas, Reemplazo de Ingresos, Hipoteca y Educación universitaria."
            : "Calculate exact life insurance coverage needs using the four core pillars: Debt, Income replacement, Mortgage balance, and Education funds."}
        </p>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* D - Debt */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                <span className="h-5 w-5 rounded bg-blue-600 text-white flex items-center justify-center text-[11px]">D</span>
                {isSpanish ? "Deudas y Préstamos Personales" : "Debt & Final Obligations"}
              </label>
              <span className="text-sm font-black text-blue-700">{formatCurrency(debt)}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {isSpanish ? "Tarjetas de crédito, préstamos de autos, gastos médicos y deudas no hipotecarias." : "Credit cards, auto loans, personal loans, and consumer balances."}
            </p>
            <input
              type="range"
              min={0}
              max={150000}
              step={5000}
              value={debt}
              onChange={(e) => setDebt(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* I - Income Replacement */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                <span className="h-5 w-5 rounded bg-emerald-600 text-white flex items-center justify-center text-[11px]">I</span>
                {isSpanish ? "Reemplazo de Ingresos Anuales" : "Income Replacement"}
              </label>
              <span className="text-sm font-black text-emerald-700">{formatCurrency(incomeReplacement)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">{isSpanish ? "Ingreso Anual Actual:" : "Annual Gross Income:"}</span>
                <input
                  type="number"
                  step={5000}
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">{isSpanish ? "Años de Reemplazo:" : "Years to Replace:"}</span>
                <select
                  value={incomeYears}
                  onChange={(e) => setIncomeYears(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                >
                  <option value={5}>5 {isSpanish ? "Años" : "Years"}</option>
                  <option value={10}>10 {isSpanish ? "Años (Recomendado)" : "Years (Standard)"}</option>
                  <option value={15}>15 {isSpanish ? "Años" : "Years"}</option>
                  <option value={20}>20 {isSpanish ? "Años" : "Years"}</option>
                </select>
              </div>
            </div>
          </div>

          {/* M - Mortgage */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                <span className="h-5 w-5 rounded bg-amber-600 text-white flex items-center justify-center text-[11px]">M</span>
                {isSpanish ? "Saldo Hipotecario de la Vivienda" : "Mortgage Payoff Balance"}
              </label>
              <span className="text-sm font-black text-amber-700">{formatCurrency(mortgage)}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {isSpanish ? "Monto restante para liquidar por completo la casa familiar y evitar ejecuciones." : "Remaining mortgage balance to keep your family in their primary residence."}
            </p>
            <input
              type="range"
              min={0}
              max={800000}
              step={10000}
              value={mortgage}
              onChange={(e) => setMortgage(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          {/* E - Education */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                <span className="h-5 w-5 rounded bg-purple-600 text-white flex items-center justify-center text-[11px]">E</span>
                {isSpanish ? "Fondo de Educación Universitaria" : "Education & College Fund"}
              </label>
              <span className="text-sm font-black text-purple-700">{formatCurrency(educationTotal)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">{isSpanish ? "Número de Hijos:" : "Number of Children:"}</span>
                <select
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                >
                  <option value={0}>0</option>
                  <option value={1}>1 {isSpanish ? "Hijo" : "Child"}</option>
                  <option value={2}>2 {isSpanish ? "Hijos" : "Children"}</option>
                  <option value={3}>3 {isSpanish ? "Hijos" : "Children"}</option>
                  <option value={4}>4+ {isSpanish ? "Hijos" : "Children"}</option>
                </select>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">{isSpanish ? "Presupuesto por Hijo:" : "Fund per Child:"}</span>
                <select
                  value={costPerChild}
                  onChange={(e) => setCostPerChild(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                >
                  <option value={50000}>$50,000 (In-State FL)</option>
                  <option value={75000}>$75,000 (Standard)</option>
                  <option value={120000}>$120,000 (Private University)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Current Existing Coverage */}
          <div className="bg-slate-100 p-4 rounded-2xl border border-slate-300 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700">
                {isSpanish ? "Cobertura de Seguro de Vida Existente (Póliza de Trabajo o Privada):" : "Existing Life Insurance in Place (Work/Private):"}
              </label>
              <span className="text-xs font-black text-slate-800">{formatCurrency(existingCoverage)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1000000}
              step={25000}
              value={existingCoverage}
              onChange={(e) => setExistingCoverage(Number(e.target.value))}
              className="w-full accent-slate-700"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-[#001c38] text-white p-6 md:p-8 rounded-3xl space-y-6 shadow-xl border border-slate-700">
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {isSpanish ? "Resumen de Protección D.I.M.E." : "Executive D.I.M.E. Summary"}
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-white mt-1">
                {formatCurrency(grossNeed)}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                {isSpanish ? "Capital total necesario para blindar a su familia" : "Total capital required to fully insulate family obligations"}
              </p>
            </div>

            {/* Breakdown Stack */}
            <div className="space-y-2.5 text-xs border-t border-b border-slate-800 py-4">
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  {isSpanish ? "Deudas (D)" : "Debts (D)"}
                </span>
                <span className="font-bold">{formatCurrency(debt)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  {isSpanish ? "Reemplazo de Ingreso (I)" : "Income (I)"}
                </span>
                <span className="font-bold">{formatCurrency(incomeReplacement)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  {isSpanish ? "Hipoteca (M)" : "Mortgage (M)"}
                </span>
                <span className="font-bold">{formatCurrency(mortgage)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  {isSpanish ? "Educación (E)" : "Education (E)"}
                </span>
                <span className="font-bold">{formatCurrency(educationTotal)}</span>
              </div>
            </div>

            {/* Net Shortfall Alert */}
            <div className={`p-4 rounded-2xl border ${netShortfall > 0 ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"}`}>
              <div className="flex items-center gap-2">
                {netShortfall > 0 ? <ShieldAlert size={18} className="text-amber-400 shrink-0" /> : <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">
                    {netShortfall > 0 ? (isSpanish ? "Brecha Neta Desprotegida" : "Net Unfunded Shortfall") : (isSpanish ? "¡Completamente Protegido!" : "Fully Covered!")}
                  </p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    {formatCurrency(netShortfall)}
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-slate-300 mt-2 leading-relaxed">
                {netShortfall > 0
                  ? (isSpanish
                    ? "Esta es la cantidad que su familia tendría que pagar de su propio bolsillo si no cuenta con una póliza adecuada."
                    : "This represents the exact capital shortfall your loved ones would inherit without supplemental coverage.")
                  : (isSpanish
                    ? "Su cobertura actual cubre sus necesidades bajo el modelo D.I.M.E."
                    : "Your current insurance meets or exceeds your baseline D.I.M.E. obligations.")}
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>✉️</span> {t.tool_share_email}
              </a>

              {/* 1-Click PDF Report Download */}
              <a
                href={`/api/reports/download?type=dime&lang=${lang}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>📄</span> {isSpanish ? "Descargar Reporte PDF" : "Download PDF Report"}
              </a>
            </div>

            <a href="/#consultation" className="block">
              <Button variant="primary" className="w-full !bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold py-3.5 shadow-md">
                {isSpanish ? "Solicitar Cotización sin Compromiso con Angel Burgos →" : "Request Free Custom Illustration with Angel Burgos →"}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
