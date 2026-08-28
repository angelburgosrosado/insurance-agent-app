"use client";

import React, { useState } from "react";
import { Calendar, Clock, Phone, CheckCircle2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CalendarBookingProps {
  calendlyUrl?: string;
  className?: string;
}

export function CalendarBookingModal({
  calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/angelburgosrosado/15min",
  className = "",
}: CalendarBookingProps) {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${className}`}>
      {/* Header Banner */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Calendar size={13} />
          {lang === "es" ? "Paso 2: Reserve Su Horario en Línea" : "Step 2: Lock In Your Consultation Time"}
        </div>
        <h3 className="text-2xl md:text-3xl font-black tracking-tight">
          {lang === "es" ? "Agende su Consulta Diagnóstica de 15 Minutos" : "Schedule Your 15-Minute Diagnostic Session"}
        </h3>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl">
          {lang === "es"
            ? "Seleccione el día y la hora que mejor le convenga. El Asesor Licenciado Angel Burgos preparará sus números y lo contactará puntualmente."
            : "Select the date and time that fits your schedule. Licensed advisor Angel Burgos will prepare your personalized figures and call you promptly."}
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-slate-50 border-b border-slate-200 text-xs text-slate-700">
        <div className="flex items-center gap-2.5">
          <Clock size={16} className="text-amber-600 shrink-0" />
          <span><strong>15 {lang === "es" ? "Minutos" : "Minutes"}</strong> &bull; {lang === "es" ? "Directo y al grano" : "Direct & focused"}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone size={16} className="text-emerald-600 shrink-0" />
          <span><strong>{lang === "es" ? "Llamada o Zoom" : "Phone or Zoom"}</strong> &bull; {lang === "es" ? "Su preferencia" : "Your choice"}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
          <span><strong>100% {lang === "es" ? "Confidencial" : "Confidential"}</strong> &bull; {lang === "es" ? "Sin presión" : "Zero pressure"}</span>
        </div>
      </div>

      {/* Embedded Calendar Container */}
      <div className="p-6 md:p-8">
        {!isOpen ? (
          <div className="text-center py-8 space-y-5">
            <div className="h-16 w-16 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-3xl flex items-center justify-center mx-auto text-2xl">
              📅
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">
                {lang === "es" ? "Calendario en Vivo Disponible" : "Live Advisor Calendar Available"}
              </h4>
              <p className="text-xs text-slate-500">
                {lang === "es" ? "Haga clic para abrir el selector de citas en tiempo real" : "Click below to open the real-time appointment scheduler"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{lang === "es" ? "Abrir Calendario Interactivo" : "Open Live Booking Calendar"}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="w-full h-[650px] rounded-2xl border border-slate-200 overflow-hidden relative">
            <iframe
              src={calendlyUrl}
              className="w-full h-full border-0"
              title="Schedule a consultation with Angel Burgos"
            />
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            {lang === "es" ? "¿Prefiere hablar de inmediato?" : "Prefer to speak right away?"}{" "}
            <a href="tel:3863331482" className="text-amber-800 font-bold hover:underline">
              📞 (386) 333-1482
            </a>
          </p>
          <p>
            {lang === "es" ? "Atención directa en Orlando, FL y Puerto Rico" : "Direct coverage across Florida & Puerto Rico"}
          </p>
        </div>
      </div>
    </div>
  );
}
