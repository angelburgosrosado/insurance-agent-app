"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";

const testimonialsEn = [
  {
    quote: "Angel analyzed our retirement portfolio with an engineer's attention to detail. He showed us how an IUL with a 0% floor gave us peace of mind during market drops while keeping our retirement income tax-free under IRS 7702.",
    client: "Carlos & Elena M.",
    role: "Business Owners in Orlando, FL",
    highlight: "$62,000/yr Projected Tax-Free Income",
    rating: 5,
    tag: "Life & IUL Planning"
  },
  {
    quote: "When I retired, sequence of returns risk was my biggest worry. Angel helped me roll over my 401(k) into an indexed annuity that contractually guarantees my monthly check for the rest of my life. Zero stress.",
    client: "David S.",
    role: "Retired Engineer, Kissimmee, FL",
    highlight: "Guaranteed Lifetime Monthly Paycheck",
    rating: 5,
    tag: "Annuity Rollover"
  },
  {
    quote: "When my father passed, the Everest Concierge team stepped in immediately. They negotiated directly with the funeral home, saved our family over $4,200, and our policy funded within 36 hours. A true blessing.",
    client: "Sofia R.",
    role: "Teacher, Tampa, FL & San Juan, PR",
    highlight: "Saved $4,200 on Funeral Costs in 36 hrs",
    rating: 5,
    tag: "Everest Final Expense"
  }
];

const testimonialsEs = [
  {
    quote: "Angel analizó nuestro portafolio de retiro con la precisión de un ingeniero. Nos demostró cómo un IUL con piso del 0% nos da total tranquilidad ante caídas de la bolsa mientras genera ingresos 100% libres de impuestos bajo el Código IRS 7702.",
    client: "Carlos y Elena M.",
    role: "Empresarios en Orlando, FL",
    highlight: "$62,000/año de Ingreso Proyectado Libre de Impuestos",
    rating: 5,
    tag: "Seguro de Vida e IUL"
  },
  {
    quote: "Al jubilarme, el riesgo de una caída del mercado era mi mayor temor. Angel me asesoró en transferir mi 401(k) a una anualidad indexada que me garantiza por contrato un cheque mensual para toda la vida. Cero estrés.",
    client: "David S.",
    role: "Ingeniero Retirado, Kissimmee, FL",
    highlight: "Cheque Mensual Vitalicio Garantizado",
    rating: 5,
    tag: "Transferencia de Anualidad"
  },
  {
    quote: "Cuando mi padre falleció, el equipo de Everest Concierge intervino de inmediato. Negociaron directamente con la funeraria, le ahorraron a nuestra familia más de $4,200 y la póliza pagó en 36 horas. Una verdadera bendición.",
    client: "Sofía R.",
    role: "Maestra, Tampa, FL y San Juan, PR",
    highlight: "Ahorro de $4,200 en Gastos Funerarios en 36 hrs",
    rating: 5,
    tag: "Gastos Finales Everest"
  }
];

export function TestimonialsSection() {
  const { lang } = useLanguage();
  const t = dictionary[lang];
  const items = lang === "es" ? testimonialsEs : testimonialsEn;

  return (
    <section className="py-24 px-6 lg:px-10 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider">
            {t.testimonials_badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.testimonials_title}
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            {t.testimonials_desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-sm">
                    {"★".repeat(item.rating)}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-1">
                <p className="font-bold text-slate-900 text-sm">{item.client}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
                <p className="text-xs font-semibold text-emerald-600 pt-1">
                  ✓ {item.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
