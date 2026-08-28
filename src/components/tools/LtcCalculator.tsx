"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function LtcCalculator() {
  const { lang } = useLanguage();
  const t = dictionary[lang];
  const isSpanish = lang === "es";

  // State
  const [coverageType, setCoverageType] = useState<"individual" | "couple">("couple");
  const [age, setAge] = useState<number>(55);
  const [monthlyBenefit, setMonthlyBenefit] = useState<number>(6000);
  const [benefitYears, setBenefitYears] = useState<number>(6);

  // Calculations
  // Total maximum pool available for care:
  const monthsOfCare = benefitYears * 12;
  const totalLtcPool = monthlyBenefit * monthsOfCare * (coverageType === "couple" ? 1.5 : 1);
  const deathBenefitGuarantee = totalLtcPool * 0.40; // Asset-based death benefit if care never needed

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const emailSubject = encodeURIComponent(
    isSpanish ? "Análisis de Cuidado Prolongado Nationwide CareMatters - AB Global" : "Nationwide CareMatters LTC Analysis - AB Global"
  );
  const emailBody = encodeURIComponent(
    isSpanish
      ? `Estimación de Cuidado Prolongado (LTC):\n- Tipo de Cobertura: ${coverageType === "couple" ? "Pareja (Fondo Compartido)" : "Individual"}\n- Edad: ${age} años\n- Beneficio Mensual en Efectivo: ${formatCurrency(monthlyBenefit)}/mes\n- Fondo Total Disponible para Cuidados: ${formatCurrency(totalLtcPool)}\n- Garantía de Beneficio por Fallecimiento (si no se usa): ${formatCurrency(deathBenefitGuarantee)}\n\nConsulte con Angel Burgos en abglco.com.`
      : `Long-Term Care (LTC) Summary:\n- Coverage Type: ${coverageType === "couple" ? "Couple (Shared Pool)" : "Individual"}\n- Age: ${age}\n- Monthly Cash Benefit: ${formatCurrency(monthlyBenefit)}/mo\n- Total LTC Benefit Pool: ${formatCurrency(totalLtcPool)}\n- Guaranteed Return of Premium / Death Benefit (if care unused): ${formatCurrency(deathBenefitGuarantee)}\n\nConsultation with Angel Burgos at abglco.com.`
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          {isSpanish ? "Modelo de Efectivo Directo (Cash-Indemnity)" : "100% Cash-Indemnity Model"}
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          {isSpanish ? "Estimador de Cuidado Prolongado Nationwide CareMatters Together®" : "Nationwide CareMatters Together® LTC Cash Estimator"}
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {isSpanish
            ? "Calcule su fondo mensual de dinero en efectivo para pagar a cuidadores familiares o atención en casa sin tener que presentar recibos mensuales. Si nunca necesita cuidado, el 100% del dinero pasa libre de impuestos a sus herederos."
            : "Model tax-free monthly cash benefits for home health or family caregivers without submitting receipts. If you never need care, your principal passes 100% tax-free to your family."}
        </p>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Coverage Type: Couple vs Individual */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <label className="text-xs font-black text-slate-900 uppercase block">
              {isSpanish ? "Estructura de Cobertura:" : "Coverage Structure:"}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCoverageType("couple")}
                className={`py-3 px-4 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                  coverageType === "couple"
                    ? "bg-[#001c38] text-amber-400 border-[#001c38] shadow"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                👥 {isSpanish ? "Pareja (Fondo Compartido)" : "Couple (Shared Pool)"}
              </button>

              <button
                type="button"
                onClick={() => setCoverageType("individual")}
                className={`py-3 px-4 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                  coverageType === "individual"
                    ? "bg-[#001c38] text-amber-400 border-[#001c38] shadow"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                👤 {isSpanish ? "Individual" : "Individual"}
              </button>
            </div>
          </div>

          {/* Age */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-900 uppercase">
                {isSpanish ? "Edad del Asegurado:" : "Insured Age:"}
              </label>
              <span className="text-sm font-black text-slate-900">{age} {isSpanish ? "Años" : "Years"}</span>
            </div>
            <input
              type="range"
              min={40}
              max={75}
              step={1}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-[#001c38]"
            />
          </div>

          {/* Desired Monthly Cash Benefit */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-900 uppercase">
                {isSpanish ? "Beneficio Mensual Deseado en Efectivo:" : "Desired Monthly Cash Benefit:"}
              </label>
              <span className="text-sm font-black text-emerald-700">{formatCurrency(monthlyBenefit)}/mo</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {isSpanish
                ? "El costo promedio de atención en casa en Florida oscila entre $4,500 y $6,500/mes."
                : "Average in-home health aide costs in Florida range from $4,500 to $6,500/month."}
            </p>
            <input
              type="range"
              min={3000}
              max={12000}
              step={500}
              value={monthlyBenefit}
              onChange={(e) => setMonthlyBenefit(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Benefit Period */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <label className="text-xs font-black text-slate-900 uppercase block">
              {isSpanish ? "Duración de Beneficios Garantizados:" : "Guaranteed Benefit Duration:"}
            </label>
            <select
              value={benefitYears}
              onChange={(e) => setBenefitYears(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
            >
              <option value={4}>4 {isSpanish ? "Años de Cuidados" : "Years of Care"}</option>
              <option value={6}>6 {isSpanish ? "Años de Cuidados (Recomendado)" : "Years of Care (Standard)"}</option>
              <option value={8}>8 {isSpanish ? "Años de Cuidados" : "Years of Care"}</option>
            </select>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-[#001c38] text-white p-6 md:p-8 rounded-3xl space-y-6 shadow-xl border border-slate-700">
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {isSpanish ? "Fondo Total de Cuidado Prolongado" : "Total LTC Protection Pool"}
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-white mt-1">
                {formatCurrency(totalLtcPool)}
              </h3>
              <p className="text-xs text-emerald-400 font-bold mt-1">
                {formatCurrency(monthlyBenefit)} {isSpanish ? "/ mes en efectivo directo" : "/ mo in liquid cash payments"}
              </p>
            </div>

            {/* Nationwide CareMatters Advantages */}
            <div className="space-y-2.5 text-xs border-t border-b border-slate-800 py-4">
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{isSpanish ? "Desembolso 100% en Efectivo:" : "100% Cash-Indemnity:"}</strong>{" "}
                  {isSpanish
                    ? "Pague directamente a sus hijos o familiares para que lo cuiden en su propio hogar."
                    : "Pay family members or informal caregivers to assist you at home without receipts."}
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{isSpanish ? "Fondo Compartido para Cónyuges:" : "Shared Couples Pool:"}</strong>{" "}
                  {isSpanish
                    ? "Cualquiera de los dos cónyuges puede utilizar el fondo sin pagar doble póliza."
                    : "Either spouse can draw from the combined pool, maximizing protection efficiency."}
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{isSpanish ? "Garantía de Devolución de Capital:" : "Asset-Based Death Benefit:"}</strong>{" "}
                  {isSpanish
                    ? `Si nunca necesita cuidados, se pagan ${formatCurrency(deathBenefitGuarantee)} libres de impuestos a sus herederos.`
                    : `If care is never triggered, ${formatCurrency(deathBenefitGuarantee)} passes tax-free to beneficiaries.`}
                </span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>✉️</span> {t.tool_share_email}
            </a>

            {/* 1-Click PDF Report Download */}
            <a
              href={`/api/reports/download?type=ltc&lang=${lang}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>📄</span> {isSpanish ? "Descargar Reporte PDF" : "Download PDF Report"}
            </a>
          </div>

          <a href="/#consultation" className="block pt-2">
            <Button variant="primary" className="w-full !bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold py-3.5 shadow-md">
              {isSpanish ? "Consultar Plan Nationwide CareMatters con Angel Burgos →" : "Request Nationwide CareMatters Proposal with Angel Burgos →"}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
