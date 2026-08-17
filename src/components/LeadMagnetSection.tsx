"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";

export function LeadMagnetSection() {
  const { lang } = useLanguage();
  const t = dictionary[lang];

  const [selectedGuide, setSelectedGuide] = useState<"iul" | "funeral">("iul");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    try {
      setLoading(true);
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.split(" ")[0] || name,
          lastName: name.split(" ").slice(1).join(" ") || "Prospect",
          email,
          phone,
          service: selectedGuide === "iul" ? "IUL Guide Download" : "Funeral Pre-Planning Checklist",
          message: `Requested downloadable guide: ${selectedGuide === "iul" ? "Florida 2026 IUL Retirement Guide" : "Everest Funeral Pre-Planning Checklist"} [Lang: ${lang}]`,
          consent: true,
          source: "lead_magnet_section",
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 lg:px-10 bg-[#001c38] text-white relative overflow-hidden" id="guides">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-secondary text-xs font-bold uppercase tracking-wider">
            {t.guides_badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            {t.guides_title}
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl">
            {t.guides_desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => { setSelectedGuide("iul"); setSubmitted(false); }}
              className={`p-5 rounded-2xl border text-left transition-all ${
                selectedGuide === "iul"
                  ? "bg-secondary/20 border-secondary shadow-lg ring-2 ring-secondary/50"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <span className="text-2xl mb-2 block">📘</span>
              <h4 className="font-bold text-sm text-white">{t.guide_1_btn}</h4>
              <p className="text-xs text-white/70 mt-1">{t.guide_1_desc}</p>
            </button>

            <button
              onClick={() => { setSelectedGuide("funeral"); setSubmitted(false); }}
              className={`p-5 rounded-2xl border text-left transition-all ${
                selectedGuide === "funeral"
                  ? "bg-secondary/20 border-secondary shadow-lg ring-2 ring-secondary/50"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <span className="text-2xl mb-2 block">🕊️</span>
              <h4 className="font-bold text-sm text-white">{t.guide_2_btn}</h4>
              <p className="text-xs text-white/70 mt-1">{t.guide_2_desc}</p>
            </button>
          </div>
        </div>

        {/* Right download form */}
        <div className="lg:col-span-5 bg-white text-slate-900 p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {lang === "es" ? "¡Su Guía está en Camino!" : "Your Guide is On Its Way!"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === "es" 
                  ? <>Hemos enviado el enlace de descarga a <strong>{email}</strong>. El asesor Angel Burgos está a su disposición para cualquier escenario o pregunta.</>
                  : <>We have sent your download link to <strong>{email}</strong>. Angel Burgos is available if you have specific scenario questions.</>}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-secondary underline hover:text-slate-900"
              >
                {lang === "es" ? "Solicitar otra guía" : "Request another guide"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                  {lang === "es" ? "Descarga Inmediata" : "Instant Download"}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedGuide === "iul" ? t.guide_1_btn : t.guide_2_btn}
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.form_fname} & {t.form_lname}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Rodriguez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.form_email} ({lang === "es" ? "Para recibir el PDF" : "To Receive PDF"})
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maria@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.form_phone} ({lang === "es" ? "Opcional para copia por SMS" : "Optional for SMS copy"})
                </label>
                <input
                  type="tel"
                  placeholder="e.g. (407) 555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-full !bg-secondary !text-white !border-secondary hover:!bg-secondary/90 py-3.5 text-sm font-bold shadow-lg"
                >
                  {loading ? (lang === "es" ? "Enviando..." : "Sending...") : t.guide_download_btn}
                </Button>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                {lang === "es" 
                  ? "🔒 Respetamos su privacidad. Sin spam. Cero compromisos."
                  : "🔒 We respect your privacy. No spam. Unsubscribe at any time."}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
