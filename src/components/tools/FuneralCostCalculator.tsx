"use client";

import React, { useState, useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";

interface FuneralCostCalculatorProps {
  isStandalone?: boolean;
}

export function FuneralCostCalculator({ isStandalone = false }: FuneralCostCalculatorProps) {
  const { lang } = useLanguage();
  const t = dictionary[lang];

  const [serviceType, setServiceType] = useState<"burial" | "cremation">("burial");
  const [tier, setTier] = useState<"essential" | "standard" | "premium">("standard");
  const [copied, setCopied] = useState(false);

  const costData = useMemo(() => {
    let retailBase = serviceType === "burial" ? 11500 : 7200;
    if (tier === "essential") retailBase *= 0.85;
    if (tier === "premium") retailBase *= 1.35;

    // Everest Concierge saves ~30% - 35% on average through independent price negotiation
    const everestNegotiated = Math.round(retailBase * 0.68);
    const savings = Math.round(retailBase - everestNegotiated);
    const recommendedCoverage = Math.round(retailBase * 1.15 / 1000) * 1000;

    const chartData = [
      { name: t.funeral_chart_retail, amount: Math.round(retailBase), fill: "#ef4444" },
      { name: t.funeral_chart_everest, amount: everestNegotiated, fill: "#10b981" },
    ];

    return {
      retail: Math.round(retailBase),
      everest: everestNegotiated,
      savings,
      recommendedCoverage,
      chartData,
    };
  }, [serviceType, tier, t]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/tools/funeral-cost-savings?type=${serviceType}&tier=${tier}`;
  }, [serviceType, tier]);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const smsText = encodeURIComponent(
    t.funeral_sms_text
      .replace("{savings}", `$${costData.savings.toLocaleString()}`)
      .replace("{url}", shareUrl)
  );

  const emailSubject = encodeURIComponent(
    lang === "es" 
      ? "Estimado de Ahorro con Everest Funeral Concierge" 
      : "Everest Funeral Concierge Savings Estimate"
  );

  const emailBody = encodeURIComponent(
    (lang === "es"
      ? `Estimado/a,\n\nAquí tiene su estimado de ahorro en gastos funerarios con Everest Funeral Concierge:\n\n` +
        `• Servicio: ${serviceType === "burial" ? "Entierro Tradicional" : "Cremación y Memorial"}\n` +
        `• Nivel de Servicio: ${tier === "essential" ? "Básico" : tier === "standard" ? "Estándar" : "Premium"}\n` +
        `• Costo Funerario Regular (Sin Negociar): $${costData.retail.toLocaleString()}\n` +
        `• Costo Negociado con Everest Concierge: $${costData.everest.toLocaleString()}\n` +
        `• Ahorro Estimado para su Familia: $${costData.savings.toLocaleString()}\n` +
        `• Póliza de Gastos Finales Recomendada: $${costData.recommendedCoverage.toLocaleString()}\n\n` +
        `Consulte el desglose interactivo aquí:\n${shareUrl}\n\n` +
        `Atentamente,\nAngel Burgos - Asesor Licenciado del Estado 0215\n(386) 333-1482 | Orlando, FL y Puerto Rico`
      : `Hello,\n\nHere is your custom Everest Funeral Concierge planning and savings estimate:\n\n` +
        `• Service Type: ${serviceType === "burial" ? "Traditional Burial" : "Cremation & Memorial"}\n` +
        `• Package Tier: ${tier.charAt(0).toUpperCase() + tier.slice(1)}\n` +
        `• Standard Mortuary Retail Cost: $${costData.retail.toLocaleString()}\n` +
        `• Everest Negotiated Cost: $${costData.everest.toLocaleString()}\n` +
        `• Estimated Family Savings: $${costData.savings.toLocaleString()}\n` +
        `• Recommended Coverage Amount: $${costData.recommendedCoverage.toLocaleString()}\n\n` +
        `Explore the live interactive calculator here:\n${shareUrl}\n\n` +
        `Best regards,\nAngel Burgos - State Licensed Financial Advisor (0215)\n(386) 333-1482 | Orlando, FL`)
  );

  const tierLabels: Record<"essential" | "standard" | "premium", string> = {
    essential: t.funeral_tier_essential,
    standard: t.funeral_tier_standard,
    premium: t.funeral_tier_premium,
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${isStandalone ? "max-w-5xl mx-auto my-8" : "w-full"}`}>
      {/* Header */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            {t.funeral_badge}
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            {t.funeral_title}
          </h3>
          <p className="text-white/80 text-sm mt-1 max-w-xl">
            {t.funeral_desc}
          </p>
        </div>
        <div className="text-left md:text-right shrink-0 bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/30">
          <p className="text-xs text-emerald-400 uppercase font-bold tracking-wider">{t.funeral_savings_label}</p>
          <p className="text-3xl md:text-4xl font-extrabold text-emerald-300">
            ${costData.savings.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-200/70 mt-0.5">{t.funeral_savings_sub}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">{t.funeral_pref_title}</h4>

            {/* Service Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t.funeral_disposition_label}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setServiceType("burial")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    serviceType === "burial" ? "bg-secondary text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
                  }`}
                >
                  {t.funeral_disp_burial}
                </button>
                <button
                  onClick={() => setServiceType("cremation")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    serviceType === "cremation" ? "bg-secondary text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
                  }`}
                >
                  {t.funeral_disp_cremation}
                </button>
              </div>
            </div>

            {/* Package Tier */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t.funeral_tier_label}</label>
              <div className="grid grid-cols-3 gap-2">
                {(["essential", "standard", "premium"] as const).map((tk) => (
                  <button
                    key={tk}
                    onClick={() => setTier(tk)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                      tier === tk ? "bg-secondary text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    {tierLabels[tk]}
                  </button>
                ))}
              </div>
            </div>

            {/* Concierge Benefits Checklist */}
            <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
              <p className="font-bold text-slate-900">{t.funeral_inc_title}</p>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <span>✓</span> {t.funeral_inc_1}
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <span>✓</span> {t.funeral_inc_2}
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <span>✓</span> {t.funeral_inc_3}
              </div>
            </div>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-50/50 p-4 md:p-6 rounded-2xl border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-1">{t.funeral_chart_title}</h4>
            <p className="text-xs text-slate-500 mb-4">{t.funeral_chart_desc}</p>

            <div className="h-[240px] md:h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costData.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tickLine={false} tick={{ fontSize: 12, fill: "#334155" }} />
                  <YAxis tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `$${val.toLocaleString()}`} />
                  <Tooltip
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, t.funeral_tooltip_total]}
                    contentStyle={{ backgroundColor: "#001c38", color: "#fff", borderRadius: "12px", border: "none", fontSize: "12px" }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-200 shadow-sm">
              <p className="text-xs text-red-600 uppercase font-semibold">{t.funeral_metric_retail}</p>
              <p className="text-xl font-bold text-red-700 mt-1">${costData.retail.toLocaleString()}</p>
              <p className="text-[11px] text-red-500">{t.funeral_metric_retail_sub}</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
              <p className="text-xs text-emerald-700 uppercase font-bold">{t.funeral_metric_everest}</p>
              <p className="text-xl font-bold text-emerald-800 mt-1">${costData.everest.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-600">{t.funeral_metric_everest_sub}</p>
            </div>

            <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20 shadow-sm">
              <p className="text-xs text-secondary uppercase font-bold">{t.funeral_metric_rec}</p>
              <p className="text-xl font-bold text-secondary mt-1">${costData.recommendedCoverage.toLocaleString()}</p>
              <p className="text-[11px] text-secondary/80">{t.funeral_metric_rec_sub}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share / Export */}
      <div className="bg-slate-100 border-t border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h5 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-2">
            <span>🕊️</span> {t.funeral_export_title}
          </h5>
          <p className="text-xs text-slate-600">{t.funeral_export_desc}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            {copied ? <span className="text-emerald-600 font-bold">✓ {t.tool_share_copied}</span> : <span>🔗 {t.tool_share_copy}</span>}
          </button>
          <a href={`sms:?&body=${smsText}`} className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2">
            <span>📱</span> {t.tool_share_sms}
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(t.funeral_sms_text.replace("{savings}", `$${costData.savings.toLocaleString()}`).replace("{url}", shareUrl))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 shadow-sm transition-all flex items-center gap-2"
          >
            <span>💬</span> {t.tool_share_whatsapp}
          </a>
          <a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2">
            <span>✉️</span> {t.tool_share_email}
          </a>
          {/* Download Official Branded Report */}
          <a
            href={`/api/reports/download?type=funeral&lang=${lang}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-bold text-amber-900 shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>📄</span> {lang === "es" ? "Descargar Reporte PDF" : "Download PDF Report"}
          </a>
          <a href="/#consultation">
            <Button variant="primary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-5 py-2.5 shadow-md">
              {t.funeral_cta_quote}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
