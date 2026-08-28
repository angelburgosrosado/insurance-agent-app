"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, Calendar, MessageSquare, X, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function SpeedDialConcierge() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const isSpanish = lang === "es";
  const whatsappMsg = encodeURIComponent(
    isSpanish
      ? "Hola Angel, estoy visitando su sitio web abglco.com y deseo una consulta sobre seguros y planificación patrimonial."
      : "Hello Angel, I am browsing your website abglco.com and would like a consultation on insurance and wealth planning."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 print:hidden">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-3xl p-4 shadow-2xl space-y-2.5 w-72 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-400" />
              <div>
                <p className="text-xs font-bold text-slate-200">Angel Burgos • 0215</p>
                <p className="text-[10px] text-slate-400">FL Lic. #G328926 &bull; WFG: F6D9U</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X size={14} />
            </button>
          </div>

          <p className="text-[11px] text-slate-300 px-1">
            {isSpanish ? "¿Cómo prefiere comunicarse?" : "How would you like to connect?"}
          </p>

          <div className="space-y-1.5">
            {/* 1. Direct Call */}
            <a
              href="tel:3863331482"
              className="flex items-center gap-3 p-2.5 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 rounded-xl text-xs font-bold text-white transition-all group"
            >
              <div className="h-7 w-7 rounded-lg bg-blue-600 group-hover:bg-white text-white group-hover:text-blue-600 flex items-center justify-center shrink-0 transition-colors">
                <Phone size={13} />
              </div>
              <div className="text-left">
                <p className="leading-none">{isSpanish ? "Llamar Directo" : "Direct Phone Call"}</p>
                <p className="text-[10px] text-blue-300 group-hover:text-blue-100 mt-0.5">(386) 333-1482</p>
              </div>
            </a>

            {/* 2. WhatsApp Direct Chat */}
            <a
              href={`https://wa.me/13863331482?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 rounded-xl text-xs font-bold text-white transition-all group"
            >
              <div className="h-7 w-7 rounded-lg bg-emerald-600 group-hover:bg-white text-white group-hover:text-emerald-600 flex items-center justify-center shrink-0 transition-colors">
                <MessageCircle size={14} />
              </div>
              <div className="text-left">
                <p className="leading-none">{isSpanish ? "Chat por WhatsApp" : "WhatsApp Direct Chat"}</p>
                <p className="text-[10px] text-emerald-300 group-hover:text-emerald-100 mt-0.5">{isSpanish ? "Respuesta en minutos" : "Fast mobile reply"}</p>
              </div>
            </a>

            {/* 3. Direct SMS Text */}
            <a
              href={`sms:+13863331482?body=${whatsappMsg}`}
              className="flex items-center gap-3 p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-white transition-all group"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-700 group-hover:bg-white text-white group-hover:text-slate-900 flex items-center justify-center shrink-0 transition-colors">
                <MessageSquare size={13} />
              </div>
              <div className="text-left">
                <p className="leading-none">{isSpanish ? "Enviar Mensaje de Texto" : "Send SMS Text"}</p>
                <p className="text-[10px] text-slate-400 group-hover:text-slate-200 mt-0.5">(386) 333-1482</p>
              </div>
            </a>

            {/* 4. Book 15-Min Calendly Session */}
            <a
              href="https://calendly.com/abglobalconsulting/15-min-consultation-abglobalceo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 rounded-xl text-xs font-bold text-white group-hover:text-slate-950 transition-all group"
            >
              <div className="h-7 w-7 rounded-lg bg-amber-500 group-hover:bg-slate-950 text-slate-950 group-hover:text-amber-400 flex items-center justify-center shrink-0 transition-colors">
                <Calendar size={13} />
              </div>
              <div className="text-left">
                <p className="leading-none text-amber-300 group-hover:text-slate-950">{isSpanish ? "Agendar 15 Minutos" : "Book 15-Min Call"}</p>
                <p className="text-[10px] text-amber-400/80 group-hover:text-slate-900 mt-0.5">{isSpanish ? "Calendario en vivo" : "Live Calendly scheduler"}</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-full shadow-2xl flex items-center gap-2.5 border-2 border-white/80 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Open Advisor Contact Menu"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
        </span>
        <span className="text-xs font-extrabold tracking-wide uppercase">
          {isOpen ? (isSpanish ? "Cerrar" : "Close") : (isSpanish ? "💬 Contactar Asesor" : "💬 Connect with Advisor")}
        </span>
      </button>
    </div>
  );
}
