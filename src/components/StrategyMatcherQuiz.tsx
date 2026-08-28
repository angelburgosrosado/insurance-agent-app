"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface QuizState {
  priority: "iul" | "military" | "annuity" | "funeral" | "";
  ageRange: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export function StrategyMatcherQuiz() {
  const { lang } = useLanguage();
  const isSpanish = lang === "es";

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitting, setSubmitting] = useState(false);
  const [quizData, setQuizData] = useState<QuizState>({
    priority: "",
    ageRange: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: true,
  });

  const priorities = [
    {
      id: "iul",
      icon: "📊",
      title: isSpanish ? "IUL en Florida y Retiro Libre de Impuestos" : "Florida IUL & Tax-Free Retirement",
      desc: isSpanish ? "Piso del 0% contra caídas de bolsa y retiros libres de impuestos bajo IRS 7702." : "0% Downside floor protection and tax-free distributions under IRS Section 7702.",
      recommendedType: "iul",
    },
    {
      id: "military",
      icon: "🎖️",
      title: isSpanish ? "Escudo Patrimonial para Militares y Veteranos" : "Military & Veteran Asset Shield",
      desc: isSpanish ? "Evitar la trampa de costo de VGLI y maximizar el 100% de la pensión militar (Pension Max)." : "Bypass the escalating VGLI rate cliff and preserve 100% of military pension (Pension Max).",
      recommendedType: "military",
    },
    {
      id: "annuity",
      icon: "📈",
      title: isSpanish ? "Transferencia de 401(k)/IRA a Anualidad Vitalicia" : "401(k)/IRA Annuity Lifetime Paycheck",
      desc: isSpanish ? "Cheque mensual garantizado de por vida que nunca se agota, con bonificación de entrada." : "Guaranteed monthly lifetime income you can never outlive, with upfront rollover bonus.",
      recommendedType: "annuity",
    },
    {
      id: "funeral",
      icon: "🕊️",
      title: isSpanish ? "Everest Funeral Concierge y Gastos Finales" : "Everest Funeral Concierge & Final Expense",
      desc: isSpanish ? "Ahorro promedio de $3,500+ con desembolso de fondos garantizado en 24 a 48 horas." : "Average $3,500+ negotiation savings with expedited 24-48 hr claim disbursements.",
      recommendedType: "funeral",
    },
  ];

  const ageRanges = [
    {
      id: "20-39",
      title: isSpanish ? "20 a 39 Años" : "Age 20 to 39",
      desc: isSpanish ? "Foco en acumulación agresiva, tarifas fijas de por vida y protección familiar." : "Focus on compound growth, locked-in lifetime low rates, and family defense.",
    },
    {
      id: "40-54",
      title: isSpanish ? "40 a 54 Años" : "Age 40 to 54",
      desc: isSpanish ? "Años de mayores ingresos, blindaje contra caídas bursátiles y beneficios en vida." : "Peak earning years, market downside shielding, and accelerated living benefits.",
    },
    {
      id: "55-plus",
      title: isSpanish ? "55+ Años" : "Age 55+",
      desc: isSpanish ? "Preservación estricta de capital, cero riesgo bursátil e ingresos de retiro vitalicios." : "Strict wealth preservation, 0% market risk, and guaranteed lifetime paychecks.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizData.firstName || !quizData.email || !quizData.phone) {
      alert(isSpanish ? "Por favor complete todos los campos obligatorios." : "Please complete all required contact fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: quizData.firstName,
          lastName: quizData.lastName || "Prospect",
          email: quizData.email,
          phone: quizData.phone,
          service: `Strategy Matcher: ${quizData.priority.toUpperCase()} (Age: ${quizData.ageRange})`,
          message: `Interactive Strategy Matcher Submission\nPriority: ${quizData.priority}\nAge Bracket: ${quizData.ageRange}\n[Lang: ${lang}]`,
          consent: quizData.consent,
          consentText: "Affirmative consent provided via Strategy Matcher Quiz",
          consentVersion: "v1-quiz",
        }),
      });

      if (res.ok) {
        setStep(4);
      } else {
        alert(isSpanish ? "Error al procesar. Intente nuevamente." : "Error processing request. Please try again.");
      }
    } catch {
      alert(isSpanish ? "Error de conexión." : "Network connection error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-10 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            {isSpanish ? "Diagnóstico Inteligente en 3 Pasos" : "3-Step Interactive Strategy Matcher"}
          </div>
          <span className="text-xs font-mono text-slate-400">
            {step <= 3 ? `${isSpanish ? "Paso" : "Step"} ${step} ${isSpanish ? "de" : "of"} 3` : (isSpanish ? "Completado" : "Complete")}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black tracking-tight">
          {step === 1 && (isSpanish ? "¿Cuál es su prioridad financiera principal?" : "What is your primary financial priority?")}
          {step === 2 && (isSpanish ? "¿Cuál es su rango de edad y horizonte?" : "What is your age range & retirement horizon?")}
          {step === 3 && (isSpanish ? "¿A dónde enviamos su diagnóstico personalizado?" : "Where should we deliver your custom diagnostic?")}
          {step === 4 && (isSpanish ? "¡Su Diagnóstico Personalizado está Listo!" : "Your Custom Strategy Diagnostic is Ready!")}
        </h3>
        <p className="text-xs md:text-sm text-slate-300">
          {isSpanish
            ? "Reciba una recomendación precisa estructurada por el asesor licenciado 0215 Angel Burgos."
            : "Receive an institutional recommendation structured by licensed practitioner Angel Burgos."}
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5">
        <div
          className="bg-amber-500 h-1.5 transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-8">
        {/* STEP 1: Select Priority */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {priorities.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setQuizData({ ...quizData, priority: item.id as any });
                    setStep(2);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer group ${
                    quizData.priority === item.id
                      ? "border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-500/20"
                      : "border-slate-200 hover:border-amber-400 hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <span className="text-3xl block mb-2">{item.icon}</span>
                    <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-700">
                    <span>{isSpanish ? "Seleccionar esta opción" : "Select this priority"}</span>
                    <ChevronRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Select Age Range */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ageRanges.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setQuizData({ ...quizData, ageRange: item.id });
                    setStep(3);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer group ${
                    quizData.ageRange === item.id
                      ? "border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-500/20"
                      : "border-slate-200 hover:border-amber-400 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-2xl block mb-2">🎯</span>
                  <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-700">
                    <span>{isSpanish ? "Continuar" : "Continue"}</span>
                    <ChevronRight size={14} />
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>{isSpanish ? "Regresar al paso anterior" : "Back to previous step"}</span>
            </button>
          </div>
        )}

        {/* STEP 3: Contact Details & Delivery */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isSpanish ? "Nombre *" : "First Name *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isSpanish ? "Ej. Carlos" : "e.g. John"}
                  value={quizData.firstName}
                  onChange={(e) => setQuizData({ ...quizData, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-inner"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isSpanish ? "Apellido" : "Last Name"}
                </label>
                <input
                  type="text"
                  placeholder={isSpanish ? "Ej. Rivera" : "e.g. Miller"}
                  value={quizData.lastName}
                  onChange={(e) => setQuizData({ ...quizData, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isSpanish ? "Correo Electrónico *" : "Email Address *"}
                </label>
                <input
                  type="email"
                  required
                  placeholder={isSpanish ? "su.email@ejemplo.com" : "you@example.com"}
                  value={quizData.email}
                  onChange={(e) => setQuizData({ ...quizData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-inner"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isSpanish ? "Teléfono Celular *" : "Mobile Phone *"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(386) 333-1482"
                  value={quizData.phone}
                  onChange={(e) => setQuizData({ ...quizData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-inner"
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-600 leading-relaxed">
              <input
                type="checkbox"
                required
                checked={quizData.consent}
                onChange={(e) => setQuizData({ ...quizData, consent: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 h-4 w-4 shrink-0"
              />
              <span>
                {isSpanish
                  ? "Doy mi consentimiento afirmativo para recibir mi informe y comunicarme con el asesor Angel Burgos por correo o SMS."
                  : "I grant affirmative consent to receive my customized report and connect with advisor Angel Burgos via email or SMS."}
              </span>
            </label>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>{isSpanish ? "Atrás" : "Back"}</span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting
                  ? (isSpanish ? "Procesando..." : "Generating...")
                  : (isSpanish ? "Generar Mi Diagnóstico →" : "Generate My Diagnostic →")}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success & Instant Action Hub */}
        {step === 4 && (
          <div className="text-center py-6 space-y-6 max-w-xl mx-auto">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-900">
                {isSpanish ? `¡Excelente, ${quizData.firstName}!` : `Great choice, ${quizData.firstName}!`}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isSpanish
                  ? "Hemos registrado sus prioridades y enviado un mensaje de confirmación a su teléfono y correo electrónico."
                  : "Your strategic preferences have been recorded. A confirmation alert has been delivered to your phone and email."}
              </p>
            </div>

            {/* Direct 1-Click Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* PDF Report Download */}
              <a
                href={`/api/reports/download?type=${quizData.priority || "iul"}&name=${encodeURIComponent(quizData.firstName)}&lang=${lang}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-2xl text-left transition-all flex items-center gap-3 shadow-sm group"
              >
                <span className="text-2xl">📄</span>
                <div>
                  <p className="text-xs font-bold text-amber-950 group-hover:text-amber-700">
                    {isSpanish ? "Descargar Reporte PDF" : "Download PDF Report"}
                  </p>
                  <p className="text-[10px] text-amber-800/80">
                    {isSpanish ? "Ilustración ejecutiva" : "Executive carrier summary"}
                  </p>
                </div>
              </a>

              {/* Calendly Booking */}
              <a
                href="https://calendly.com/abglobalconsulting/15-min-consultation-abglobalceo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#001c38] hover:bg-[#002850] text-white rounded-2xl text-left transition-all flex items-center gap-3 shadow-sm group"
              >
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-xs font-bold text-amber-400 group-hover:text-amber-300">
                    {isSpanish ? "Agendar 15 Minutos" : "Schedule 15 Minutes"}
                  </p>
                  <p className="text-[10px] text-slate-300">
                    {isSpanish ? "Hablar con Angel Burgos" : "Direct with Angel Burgos"}
                  </p>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                href="/"
                className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                ← {isSpanish ? "Volver a la página principal" : "Return to home page"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
