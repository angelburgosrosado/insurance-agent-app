"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { useLanguage } from "@/context/LanguageContext";
import { 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Lock, 
  HelpCircle, 
  ArrowRight,
  ExternalLink,
  Smartphone,
  Check
} from "lucide-react";

export default function OptInCompliancePage() {
  const { lang, setLang } = useLanguage();

  // Interactive Demo Form state
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [demoStatus, setDemoStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      setErrorMessage(
        lang === "es"
          ? "Debe marcar la casilla de verificación afirmativa para demostrar el consentimiento."
          : "You must affirmatively check the consent box to demonstrate opt-in consent."
      );
      setDemoStatus("error");
      return;
    }
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setErrorMessage(
        lang === "es"
          ? "Por favor ingrese un número de teléfono válido de 10 dígitos."
          : "Please enter a valid 10-digit telephone number."
      );
      setDemoStatus("error");
      return;
    }

    setDemoStatus("success");
    setErrorMessage("");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="bg-[#001c38] text-white py-16 px-6 lg:px-10 border-b border-slate-800">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 border border-teal-500/40 rounded-full text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Smartphone size={14} className="text-teal-400" />
              {lang === "es" ? "Cumplimiento Regulatorio de Mensajería SMS & TCPA" : "SMS & TCPA Toll-Free Verification Compliance"}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {lang === "es" 
                ? "Centro de Consentimiento y Verificación Toll-Free" 
                : "SMS Opt-In & Toll-Free Verification Center"}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {lang === "es"
                ? "Documentación de cumplimiento estatutario para la línea gratuita 1-888-887-3585 de MyIAD National Insurance Solutions (myiad.com) y AB Global Consulting, en apego a los estándares de la CTIA, TCPA y The Campaign Registry."
                : "Statutory compliance documentation and opt-in disclosure verification for Toll-Free number 1-888-887-3585 operated by MyIAD National Insurance Solutions (myiad.com) and AB Global Consulting under CTIA, TCPA, and carrier verification guidelines."}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span>{lang === "es" ? "Línea Verificada: 1-888-887-3585 (Toll-Free)" : "Verified Toll-Free Line: 1-888-887-3585"}</span>
              <span>•</span>
              <button
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="text-secondary font-bold hover:underline cursor-pointer"
              >
                {lang === "es" ? "Read in English (EN)" : "Leer en Español (ES)"}
              </button>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-12 leading-relaxed text-sm text-slate-700">
            
            {/* Carrier Verification Summary Badge */}
            <div className="p-6 bg-teal-50 rounded-2xl border border-teal-200 space-y-4">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-base">
                <ShieldCheck size={20} className="text-teal-600" />
                <span>
                  {lang === "es" 
                    ? "Resumen de Identificación de Campaña de Telecomunicaciones" 
                    : "Carrier Toll-Free Campaign Verification Details"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="space-y-1">
                  <p><strong>{lang === "es" ? "Nombre de la Marca:" : "Brand / Organization:"}</strong> MyIAD National Insurance Solutions (AB Global Consulting)</p>
                  <p><strong>{lang === "es" ? "Dominio Oficial:" : "Official Domain:"}</strong> <a href="https://myiad.com" className="text-teal-700 hover:underline">myiad.com</a></p>
                  <p><strong>{lang === "es" ? "Número Toll-Free:" : "Toll-Free Number:"}</strong> <span className="font-mono font-bold text-teal-900">1-888-887-3585</span></p>
                  <p><strong>{lang === "es" ? "Línea Directa / Asesor:" : "Direct Office Line:"}</strong> (386) 333-1482</p>
                </div>
                <div className="space-y-1">
                  <p><strong>{lang === "es" ? "Tipo de Mensajería:" : "Messaging Use Case:"}</strong> Conversational, Customer Care & Advisory Alerts</p>
                  <p><strong>{lang === "es" ? "Frecuencia:" : "Message Frequency:"}</strong> {lang === "es" ? "Varía según consulta (1 a 4 mensajes por cotización)" : "Message frequency varies (1 to 4 messages per inquiry)"}</p>
                  <p><strong>{lang === "es" ? "Tarifas:" : "Rates:"}</strong> Message & data rates may apply</p>
                  <p><strong>{lang === "es" ? "Palabras Clave:" : "Standard Keywords:"}</strong> STOP, HELP, START, UNSTOP</p>
                </div>
              </div>
            </div>

            {/* Strict Non-Sharing Statement Callout */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider">
                <Lock size={16} className="text-secondary" />
                <span>
                  {lang === "es" ? "Cláusula Mandatoria de Privacidad Móvil (CTIA / Portadores)" : "Mandatory Carrier Mobile Privacy & Non-Sharing Statement"}
                </span>
              </div>
              <blockquote className="border-l-4 border-secondary pl-4 py-1 text-xs md:text-sm font-medium text-slate-200 italic leading-relaxed">
                "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."
              </blockquote>
              <p className="text-xs text-slate-400">
                {lang === "es"
                  ? "Esta garantía aplica sin excepción a todos los números móviles, marcas de tiempo de consentimiento y registros de mensajería recopilados a través de myiad.com o de nuestra línea 1-888-887-3585."
                  : "This commitment applies unconditionally to all telephone numbers, consent records, and communication metadata collected via myiad.com or received at 1-888-887-3585."}
              </p>
            </div>

            {/* Section 1: How Consumers Opt-In */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-teal-600 font-black">1.</span>
                {lang === "es" ? "Métodos Autorizados de Suscripción (Opt-In Workflow)" : "Authorized Opt-In Workflows"}
              </h2>
              <p>
                {lang === "es"
                  ? "Los clientes y solicitantes pueden suscribirse a nuestras comunicaciones por mensaje de texto SMS únicamente a través de los siguientes métodos afirmativos:"
                  : "Consumers and prospective clients may subscribe to conversational SMS notifications solely through the following affirmative opt-in mechanisms:"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <FileText size={16} className="text-teal-600" />
                    <span>{lang === "es" ? "A. Formulario Web" : "A. Web Intake Forms"}</span>
                  </div>
                  <p className="text-slate-600">
                    {lang === "es"
                      ? "Al solicitar una cotización o el informe MyIAD AI Protection Blueprint en myiad.com, el usuario ingresa su teléfono y marca activamente una casilla de verificación desmarcada por defecto."
                      : "When requesting a quote or blueprint on myiad.com, the consumer inputs their phone number and affirmatively checks an unchecked-by-default consent checkbox."}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Phone size={16} className="text-teal-600" />
                    <span>{lang === "es" ? "B. Voz Telefónica" : "B. Verbal Inbound Voice"}</span>
                  </div>
                  <p className="text-slate-600">
                    {lang === "es"
                      ? "Al llamar a la línea 1-888-887-3585, el usuario solicita verbalmente recibir por SMS el enlace a su simulación, confirmación de cita o contacto del asesor Angel Burgos."
                      : "When calling 1-888-887-3585, the caller verbally requests SMS delivery of their customized illustration link, calendar invite, or advisor contact card."}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <MessageSquare size={16} className="text-teal-600" />
                    <span>{lang === "es" ? "C. Palabra Clave START" : "C. Mobile Keyword START"}</span>
                  </div>
                  <p className="text-slate-600">
                    {lang === "es"
                      ? "Enviando voluntariamente la palabra clave START al 1-888-887-3585 para reactivar notificaciones de póliza previamente canceladas."
                      : "Texting START directly to 1-888-887-3585 to initiate or reactivate advisory communications."}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Exact Verbatim Opt-In Language */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-teal-600 font-black">2.</span>
                {lang === "es" ? "Texto Exacto de Divulgación y Consentimiento en Formularios" : "Verbatim Opt-In Consent Disclosure Text"}
              </h2>
              <p>
                {lang === "es"
                  ? "A continuación se presenta el texto estatutario exacto que acompaña cada casilla de verificación de consentimiento en los formularios de captura de prospectos de myiad.com:"
                  : "Below is the exact statutory disclosure presented adjacent to every affirmative consent checkbox on myiad.com:"}
              </p>

              <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs md:text-sm text-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <CheckCircle2 size={16} className="text-amber-700" />
                  <span>{lang === "es" ? "Texto de Consentimiento Requerido:" : "Required Consent Language (English & Spanish):"}</span>
                </div>
                <p className="italic bg-white p-3 rounded-lg border border-amber-200/80 leading-relaxed font-mono text-xs">
                  "By checking this box and providing your telephone number, you agree to receive conversational and informational SMS text messages from MyIAD National Insurance Solutions (AB Global Consulting) regarding your quote request, policy illustrations, and consultation reminders. Message frequency varies. Message and data rates may apply. Reply STOP to cancel at any time. Reply HELP for help, or call toll-free 1-888-887-3585. Consent is not a condition of purchase. View our Privacy Policy (myiad.com/privacy) and Terms of Service (myiad.com/terms)."
                </p>
              </div>
            </div>

            {/* Section 3: Interactive Demo Verification Form */}
            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border-2 border-teal-600/30">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <Smartphone size={20} className="text-teal-600" />
                  <span>
                    {lang === "es" ? "Demostración Interactiva de Consentimiento y Verificación" : "Interactive Verification Workflow Demonstration"}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">
                  {lang === "es" ? "Demostración de Portadores" : "Carrier Audit Demo"}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {lang === "es"
                  ? "Este componente interactivo ilustra el flujo exacto de suscripción con la casilla de consentimiento desmarcada, la confirmación de bienvenida y la instrucción para cancelar mediante STOP:"
                  : "This interactive module demonstrates the live intake flow with the mandatory unchecked checkbox, welcoming auto-responder confirmation, and instant opt-out functionality:"}
              </p>

              <form onSubmit={handleDemoSubmit} className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {lang === "es" ? "Nombre Completo:" : "Full Name:"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {lang === "es" ? "Número de Teléfono Móvil (EE.UU. / PR):" : "Mobile Phone (US / PR):"}
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Mandated Unchecked Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 shrink-0 cursor-pointer"
                    />
                    <span className="text-[11px] leading-relaxed text-slate-700">
                      <strong>[Mandatory Unchecked Consent]</strong>{" "}
                      {lang === "es"
                        ? "Deseo recibir mensajes de texto (SMS) informativos y de seguimiento sobre mi cotización de seguro y recordatorios de MyIAD National Insurance Solutions al número provisto. Frecuencia variable. Tarifas estándar aplican. Responda STOP para cancelar, HELP para ayuda o llame al 1-888-887-3585. El consentimiento no es condición de compra. Ver Política de Privacidad y Términos."
                        : "I agree to receive conversational and informational SMS text messages from MyIAD National Insurance Solutions (AB Global Consulting) regarding my quote request, policy illustrations, and consultation reminders. Message frequency varies. Message and data rates may apply. Reply STOP to cancel at any time. Reply HELP for help, or call toll-free 1-888-887-3585. Consent is not a condition of purchase. View Privacy Policy and Terms."}
                    </span>
                  </label>
                </div>

                {demoStatus === "error" && errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow cursor-pointer flex items-center gap-2"
                  >
                    <span>{lang === "es" ? "Probar Flujo de Suscripción" : "Test Opt-In Flow"}</span>
                    <ArrowRight size={14} />
                  </button>

                  <span className="text-[11px] text-slate-500">
                    {lang === "es" ? "Simulación interactiva para auditores" : "Interactive carrier audit simulator"}
                  </span>
                </div>

                {demoStatus === "success" && (
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                      <Check size={16} className="text-emerald-600" />
                      <span>{lang === "es" ? "Mensaje de Bienvenida Generado Exitosamente:" : "Initial Confirmation Message Auto-Generated:"}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-emerald-200 font-mono text-xs text-slate-800">
                      "MyIAD: Thank you for contacting MyIAD National Insurance Solutions. You are subscribed to advisory updates & illustrations. Msg frequency varies. Msg&data rates may apply. Reply STOP to cancel, HELP for help (1-888-887-3585)."
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      ✓ Opt-in timestamp logged • ✓ Attribution: Web-Consent-V2026 • ✓ Carrier compliant
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Section 4: Opt-Out & Customer Support Instructions */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-teal-600 font-black">3.</span>
                {lang === "es" ? "Instrucciones de Cancelación (STOP) y Soporte (HELP)" : "Opt-Out (STOP) & Support (HELP) Procedures"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <AlertCircle size={16} className="text-rose-600" />
                    <span>{lang === "es" ? "Cómo Darse de Baja (STOP):" : "Immediate Opt-Out (STOP):"}</span>
                  </div>
                  <p className="text-slate-600">
                    {lang === "es"
                      ? "En cualquier momento, usted puede responder 'STOP' o 'CANCEL' a cualquier mensaje SMS recibido del 1-888-887-3585. Nuestro sistema automatizado procesa la baja de inmediato y le enviará un único mensaje de confirmación notificando que no recibirá más comunicaciones."
                      : "You may opt out of SMS messaging at any time by replying 'STOP', 'CANCEL', or 'UNSUBSCRIBE' to 1-888-887-3585. You will receive a single confirmation message confirming your unsubscription, and no further messages will be sent unless re-initiated."}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <HelpCircle size={16} className="text-teal-600" />
                    <span>{lang === "es" ? "Solicitar Ayuda (HELP):" : "Assistance & Help (HELP):"}</span>
                  </div>
                  <p className="text-slate-600">
                    {lang === "es"
                      ? "Si tiene dudas o necesita asistencia, responda 'HELP' a cualquier mensaje de texto o llame directamente a nuestra línea gratuita 1-888-887-3585 o por correo a info@abglco.com."
                      : "For assistance, reply 'HELP' to any message or contact our team directly toll-free at 1-888-887-3585 or via email at info@abglco.com."}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5: Direct Verification Contacts */}
            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Phone size={18} className="text-secondary" />
                {lang === "es" ? "Contactos de Cumplimiento y Supervisión" : "Compliance Contacts & Toll-Free Registry Support"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                <div>
                  <p className="font-bold text-slate-900">AB Global Consulting / MyIAD</p>
                  <p>{lang === "es" ? "Supervisado por:" : "Supervised by:"} Angel Burgos (FL Lic #G328926 / WFG Code F6D9U)</p>
                  <p>{lang === "es" ? "Sitio Web Principal:" : "Primary Website:"} <a href="https://myiad.com" className="text-teal-700 hover:underline">myiad.com</a></p>
                  <p>{lang === "es" ? "Portal de Clientes / CRM:" : "CRM & Dispatch:"} <a href="https://crm.myiad.com" className="text-teal-700 hover:underline">crm.myiad.com</a></p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">{lang === "es" ? "Líneas de Atención:" : "Communication Lines:"}</p>
                  <p>{lang === "es" ? "Línea Gratuita:" : "Toll-Free Line:"} <a href="tel:18888873585" className="text-primary font-bold hover:underline">1-888-887-3585</a></p>
                  <p>{lang === "es" ? "Línea Directa:" : "Direct Office:"} <a href="tel:13863331482" className="text-primary font-bold hover:underline">(386) 333-1482</a></p>
                  <p>Email: <a href="mailto:info@abglco.com" className="text-primary font-bold hover:underline">info@abglco.com</a></p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <Link
                href="/"
                className="w-full sm:w-auto text-center px-6 py-3 bg-slate-900 hover:bg-secondary text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                ← {lang === "es" ? "Volver al Inicio" : "Back to Home"}
              </Link>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <Link href="/privacy" className="text-slate-600 hover:text-primary hover:underline">
                  {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
                </Link>
                <span>•</span>
                <Link href="/terms" className="text-slate-600 hover:text-primary hover:underline">
                  {lang === "es" ? "Términos de Servicio" : "Terms of Service"}
                </Link>
                <span>•</span>
                <Link href="/disclosures" className="text-slate-600 hover:text-primary hover:underline">
                  {lang === "es" ? "Divulgaciones Estatutarias" : "Statutory Disclosures"}
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>

      <ComplianceDisclosure />
    </main>
  );
}
