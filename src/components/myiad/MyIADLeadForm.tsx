"use client";

import React, { useState } from "react";
import { Calendar, Sparkles, Send } from "lucide-react";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";
import { QuoteSelectorForm } from "@/components/QuoteSelectorForm";
import { MyIADProductCategory } from "@/lib/integrations/crm-myiad";
import { useLanguage } from "@/context/LanguageContext";

interface MyIADLeadFormProps {
  initialService?: string;
}

export function MyIADLeadForm({ initialService = "life-insurance" }: MyIADLeadFormProps) {
  const { language, t } = useLanguage();
  const isSpanish = language === "es";
  const [activeTab, setActiveTab] = useState<"quote" | "calendar">("quote");

  const defaultCategory: MyIADProductCategory =
    initialService === "health-medicare"
      ? "health"
      : initialService === "variable-annuities"
      ? "variable_annuity"
      : initialService === "strategic-portfolio"
      ? "strategic_advisory"
      : "life";

  return (
    <section id="lead-intake" className="py-20 md:py-28 bg-[#F8FAFC] text-[#111827]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-200 text-[#0f766e] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} className="text-[#14B8A6]" />
            <span>{isSpanish ? "Enrutamiento a Asesores Licenciados" : "Licensed Advisory Routing"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1F3A] tracking-tight">
            {isSpanish ? "Solicite una Cotización o Agende su Consulta" : "Request a Quote or Schedule Your Consultation"}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {isSpanish
              ? "Elija su opción preferida: complete una consulta rápida a través de nuestro flujo interactivo, o llame sin costo a nuestra línea de asesoría al (888) 887-3585 para hablar directamente con un especialista en seguros de su estado."
              : "Choose your preferred approach: submit a quick quote inquiry through our progressive intake flow, or call our toll-free advisory line at (888) 887-3585 to speak directly with a licensed insurance specialist in your state."}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300 max-w-md mx-auto mt-4">
            <button
              type="button"
              onClick={() => setActiveTab("quote")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "quote"
                  ? "bg-[#0B1F3A] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Send className="w-4 h-4 text-[#14B8A6]" />
              <span>{t("lead_tab_quote")}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("calendar")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "calendar"
                  ? "bg-[#0B1F3A] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-4 h-4 text-[#14B8A6]" />
              <span>{t("lead_tab_calendar")}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 4-Step Interactive Quote Selector Engine */}
        {activeTab === "quote" && (
          <QuoteSelectorForm defaultCategory={defaultCategory} />
        )}

        {/* Tab 2: Live Calendar Scheduler */}
        {activeTab === "calendar" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8">
            <CalendarBookingModal />
          </div>
        )}
      </div>
    </section>
  );
}
