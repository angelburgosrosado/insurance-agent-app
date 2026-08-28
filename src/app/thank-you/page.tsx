"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, FileText, ArrowLeft } from "lucide-react";

export default function ThankYouPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Confirmation Banner */}
        <section className="bg-[#001c38] text-white py-16 px-6 lg:px-10 border-b border-slate-800">
          <div className="max-w-4xl mx-auto space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 size={14} />
              {lang === "es" ? "Solicitud Recibida con Éxito" : "Request Successfully Received"}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {lang === "es" ? "¡Gracias por contactar a AB Global!" : "Thank You for Contacting AB Global!"}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {lang === "es"
                ? "Hemos registrado su solicitud. El Asesor Licenciado Angel Burgos revisará su información para preparar sus cálculos personalizados."
                : "Your request has been recorded. State Licensed Practitioner Angel Burgos will review your submission and prepare your custom figures."}
            </p>
          </div>
        </section>

        {/* Main Content & Calendar Scheduler */}
        <section className="max-w-4xl mx-auto px-6 lg:px-10 py-12 space-y-10">
          
          {/* Quick Access Card to PDF Guides */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <FileText size={16} className="text-secondary" />
                <span>{lang === "es" ? "Su Guía Digital en PDF está Lista" : "Your Digital PDF Guide is Ready"}</span>
              </div>
              <p className="text-xs text-slate-500 max-w-md">
                {lang === "es"
                  ? "Acceda a la lista de verificación completa de 4 páginas y guías de retiro libre de impuestos mientras espera su sesión."
                  : "Access the full 4-page protection checklist and retirement blueprints while you wait."}
              </p>
            </div>

            <Link
              href="/guides/protection-planning-checklist"
              className="px-5 py-2.5 bg-slate-900 hover:bg-secondary text-white text-xs font-bold rounded-xl shadow transition-all shrink-0"
            >
              📄 {lang === "es" ? "Abrir Lista de Verificación" : "Open Planning Checklist"} →
            </Link>
          </div>

          {/* Step 2: Interactive Calendar Booking */}
          <CalendarBookingModal />

          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>{lang === "es" ? "Regresar al Portal Principal" : "Return to Home Page"}</span>
            </Link>
          </div>
        </section>
      </div>

      <ComplianceDisclosure />
    </main>
  );
}
