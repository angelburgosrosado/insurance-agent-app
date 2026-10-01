"use client";

import { useState } from "react";
import { QuoteSelectorForm } from "@/components/QuoteSelectorForm";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";
import { Calculator, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ConsultationForm() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"quote" | "schedule">("quote");

  return (
    <div className="w-full space-y-6">
      {/* High-Level Switcher: Quote Selector vs Direct Booking */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("quote")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "quote"
              ? "bg-[#0B1F3A] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Calculator size={16} className={activeTab === "quote" ? "text-teal-400" : "text-slate-500"} />
          <span>{lang === "es" ? "Selector de Cotización Interactivo" : "Multi-Option Quote Selector"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("schedule")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "schedule"
              ? "bg-[#0B1F3A] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Calendar size={16} className={activeTab === "schedule" ? "text-teal-400" : "text-slate-500"} />
          <span>{lang === "es" ? "Agendar Cita en Vivo" : "Schedule 15-Min Meeting"}</span>
        </button>
      </div>

      {/* Render Active View */}
      {activeTab === "quote" ? (
        <QuoteSelectorForm />
      ) : (
        <CalendarBookingModal />
      )}
    </div>
  );
}
