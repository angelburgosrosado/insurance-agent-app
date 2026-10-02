"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Lock, FileText, Phone, Mail, CheckCircle2, MessageSquare, AlertTriangle, ExternalLink } from "lucide-react";

export default function PrivacyPage() {
  const { lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="bg-[#001c38] text-white py-16 px-6 lg:px-10 border-b border-slate-800">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-secondary text-xs font-bold uppercase tracking-wider">
              <Shield size={14} className="text-secondary" />
              {lang === "es" ? "Transparencia y Seguridad Legal" : "Transparency & Legal Security"}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {lang === "es" ? "Política de Privacidad de MyIAD" : "MyIAD Privacy Policy"}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {lang === "es"
                ? "Cómo MyIAD National Insurance Solutions (myiad.com) y AB Global Consulting recopilan, protegen y gestionan la información en este portal, nuestras calculadoras interactivas, nuestro agente de voz con IA y canales de mensajería SMS."
                : "How MyIAD National Insurance Solutions (myiad.com) and AB Global Consulting collect, protect, and manage information across this portal, interactive simulators, conversational AI voice agents, and SMS messaging channels."}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span>{lang === "es" ? "Vigencia: 2026 • Versión Cumplimiento myiad.com" : "Effective: 2026 • myiad.com Compliance Edition"}</span>
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

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-12 leading-relaxed text-sm text-slate-700">
            
            {/* Summary Box */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Lock size={18} className="text-secondary" />
                <span>{lang === "es" ? "Compromiso de Privacidad en Breve" : "Privacy Commitment at a Glance"}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{lang === "es" ? "Cero Venta de Datos:" : "Zero Data Selling:"}</strong>{" "}
                    {lang === "es"
                      ? "Nunca vendemos, alquilamos ni comercializamos su información personal ni sus números de teléfono a intermediarios de prospectos o empresas externas de telemercadeo."
                      : "We never sell, rent, or lease your personal information or mobile numbers to third-party lead brokers or marketing aggregators."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{lang === "es" ? "Protección Absoluta de Datos SMS:" : "Strict Mobile Data Protection:"}</strong>{" "}
                    {lang === "es"
                      ? "Los datos de consentimiento y números móviles para mensajería de texto nunca se comparten con terceros ni afiliados para fines de mercadeo."
                      : "Mobile information and text messaging originator opt-in data will not be shared with third parties or affiliates for marketing/promotional purposes."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{lang === "es" ? "Uso Exclusivo de Asesoría:" : "Exclusive Advisory Purpose:"}</strong>{" "}
                    {lang === "es"
                      ? "Su información se utiliza estrictamente para evaluar necesidades de protección, preparar ilustraciones de IUL/Anualidades y coordinar su consulta con Angel Burgos o asesores autorizados."
                      : "Your data is strictly used to analyze financial protection gaps, engineer IUL/Annuity case designs, and coordinate advisory sessions with Angel Burgos or licensed network practitioners."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{lang === "es" ? "Control y Cancelación Inmediata:" : "Instant Opt-Out Control:"}</strong>{" "}
                    {lang === "es"
                      ? "Puede cancelar comunicaciones en cualquier momento respondiendo STOP a cualquier SMS o llamando al (888) 887-3585."
                      : "You can unsubscribe or opt out of SMS communications at any time by replying STOP to any text or calling toll-free (888) 887-3585."}
                  </span>
                </li>
              </ul>
            </div>

            {/* 1. Information Collected */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-secondary font-black">1.</span>
                {lang === "es" ? "Información que Recopilamos en myiad.com" : "Information We Collect Across myiad.com"}
              </h2>
              <p>
                {lang === "es"
                  ? "Cuando usted interactúa con la plataforma MyIAD, utiliza nuestras calculadoras interactivas, conversa con nuestro agente de voz o solicita una cotización, recopilamos las siguientes categorías de datos:"
                  : "When you interact with the MyIAD platform, utilize our interactive calculators, speak with our AI voice agent, or request an advisory quote, we collect the following categories of information:"}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm">
                <li>
                  <strong>{lang === "es" ? "Datos de Contacto e Identificación:" : "Contact & Identity Information:"}</strong>{" "}
                  {lang === "es"
                    ? "Nombre completo, dirección de correo electrónico, número de teléfono móvil y código postal para determinar la jurisdicción regulatoria aplicable."
                    : "Full name, email address, mobile telephone number, and ZIP code to determine applicable state licensing and regulatory jurisdiction."}
                </li>
                <li>
                  <strong>{lang === "es" ? "Parámetros de Evaluación y Diseño de Pólizas:" : "Assessment & Policy Modeling Parameters:"}</strong>{" "}
                  {lang === "es"
                    ? "Edad, ingresos aproximados, nivel de deuda familiar, número de dependientes y objetivos financieros (ej. Piso del 0% en IUL, Beneficios en Vida, Retiro Libre de Impuestos IRC §7702, Anualidades con regla FINRA 2330)."
                    : "Age, estimated annual income, family debt obligations, number of dependents, and strategic objectives (e.g. 0% Floor IUL growth, Living Benefits, IRC §7702 Tax-Free Income, FINRA Rule 2330 Lifetime Annuities)."}
                </li>
                <li>
                  <strong>{lang === "es" ? "Interacciones de Voz e Inteligencia Artificial:" : "Voice & AI Interaction Transcripts:"}</strong>{" "}
                  {lang === "es"
                    ? "En llamadas a nuestra línea gratuita (888) 887-3585 o sesiones de navegador, las transcripciones de voz procesadas por Deepgram y Google se utilizan exclusivamente para responder sus preguntas en tiempo real y facilitar la transferencia hacia Angel Burgos."
                    : "When calling our toll-free line (888) 887-3585 or using web audio, speech transcripts processed via Deepgram and Google are used solely to generate real-time answers and facilitate warm live transfers to Angel Burgos."}
                </li>
                <li>
                  <strong>{lang === "es" ? "Metadatos de Consentimiento y Registro Técnico:" : "Technical & Consent Verification Metadata:"}</strong>{" "}
                  {lang === "es"
                    ? "Marca de tiempo de consentimiento TCPA, versión de divulgación aprobada, dirección IP y parámetros de campaña para cumplir con las normas de portadores telefónicos y verificación de líneas gratuitas."
                    : "TCPA consent timestamps, disclosure policy versions, IP addresses, and campaign attribution to ensure carrier verification compliance for toll-free messaging."}
                </li>
              </ul>
            </div>

            {/* 2. How We Use Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-secondary font-black">2.</span>
                {lang === "es" ? "Cómo Utilizamos su Información" : "How We Use Your Information"}
              </h2>
              <p>
                {lang === "es"
                  ? "La información suministrada a través de myiad.com se procesa con los siguientes fines exclusivos:"
                  : "Information submitted through myiad.com is processed exclusively for the following advisory purposes:"}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
                <li>{lang === "es" ? "Generar el informe personalizado MyIAD AI Protection Blueprint y cálculos matemáticos D.I.M.E." : "Generating personalized MyIAD AI Protection Blueprints and D.I.M.E. insurance needs mathematical models."}</li>
                <li>{lang === "es" ? "Contactarle directamente por llamada telefónica, mensaje de texto (SMS) o correo para coordinar su sesión diagnóstica." : "Contacting you directly via phone, SMS text messages, or email to coordinate your consultation session."}</li>
                <li>{lang === "es" ? "Enrutar su solicitud de forma segura a través de nuestro pipeline cifrado hacia crm.myiad.net para seguimiento por un asesor licenciado." : "Securely routing your request through our encrypted pipeline into crm.myiad.net for follow-up by a licensed professional."}</li>
                <li>{lang === "es" ? "Verificar la idoneidad estatutaria conforme a la Regla FINRA 2330 en recomendaciones de anualidades." : "Conducting supervisory suitability review in compliance with FINRA Rule 2330 for variable annuity inquiries."}</li>
              </ul>
            </div>

            {/* 3. Strict Toll-Free & TCPA SMS Messaging Policy */}
            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border-2 border-teal-500/30">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-base">
                <MessageSquare size={18} className="text-teal-600" />
                <span>{lang === "es" ? "Política de Mensajería SMS y Verificación de Línea Gratuita (888-887-3585)" : "SMS Messaging & Toll-Free Verification Policy (888-887-3585)"}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700">
                {lang === "es"
                  ? "MyIAD National Insurance Solutions opera el número gratuito 1-888-887-3585 bajo estrictos estándares de la Asociación Celular de Telecomunicaciones (CTIA), normas TCPA y directrices de registro de operadores móviles en EE. UU."
                  : "MyIAD National Insurance Solutions operates toll-free line 1-888-887-3585 in strict accordance with Cellular Telecommunications Industry Association (CTIA) guidelines, TCPA regulations, and mobile carrier verification standards."}
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <p>
                  <strong>{lang === "es" ? "Cláusula de No Cesión de Datos Móviles:" : "Non-Sharing of Mobile Data:"}</strong>{" "}
                  <span className="font-semibold text-slate-900">
                    {lang === "es"
                      ? "Ninguna información móvil será compartida con terceros o afiliados para fines de mercadeo o promoción. Todas las demás categorías excluyen los datos y el consentimiento de suscripción del originador de mensajes de texto; esta información no será compartida con terceros."
                      : "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."}
                  </span>
                </p>
                <p>
                  <strong>{lang === "es" ? "Frecuencia de Mensajes:" : "Message Frequency:"}</strong>{" "}
                  {lang === "es" ? "La frecuencia de mensajes varía según el estado de su cotización o citas programadas." : "Message frequency varies based on your inquiry or scheduled consultations."}
                </p>
                <p>
                  <strong>{lang === "es" ? "Tarifas de Mensajes y Datos:" : "Message & Data Rates:"}</strong>{" "}
                  {lang === "es" ? "Se pueden aplicar tarifas estándar de mensajes y datos según su operador móvil." : "Message and data rates may apply depending on your wireless carrier."}
                </p>
                <p>
                  <strong>{lang === "es" ? "Instrucciones de Ayuda (HELP):" : "Help Instructions (HELP):"}</strong>{" "}
                  {lang === "es"
                    ? "Para recibir asistencia inmediata, responda HELP a cualquier mensaje, llame sin costo al (888) 887-3585 o escriba a support@myiad.com."
                    : "For immediate assistance, reply HELP to any message, call toll-free at (888) 887-3585, or email support@myiad.com."}
                </p>
                <p>
                  <strong>{lang === "es" ? "Cancelación Inmediata (STOP):" : "Opt-Out (STOP):"}</strong>{" "}
                  {lang === "es"
                    ? "Puede cancelar en cualquier momento respondiendo STOP a cualquier mensaje de texto recibido."
                    : "You may opt out of SMS communications at any time by replying STOP to any text message."}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/opt-in"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 underline"
                >
                  <span>{lang === "es" ? "Ver Página Oficial de Verificación y Consentimiento SMS (/opt-in) →" : "View Official SMS Opt-In & Compliance Verification Page (/opt-in) →"}</span>
                </Link>
              </div>
            </div>

            {/* 4. Security & Infrastructure */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-secondary font-black">4.</span>
                {lang === "es" ? "Infraestructura, Cifrado y Proveedores" : "Infrastructure, Encryption & Providers"}
              </h2>
              <p>
                {lang === "es"
                  ? "Para operar myiad.com de forma confiable, utilizamos socios de infraestructura con certificación SOC 2 y cifrado de grado institucional:"
                  : "To operate myiad.com securely, we employ SOC 2 compliant enterprise infrastructure partners with institutional-grade encryption:"}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
                <li><strong>crm.myiad.net & Supabase:</strong> {lang === "es" ? "Almacenamiento en bases de datos PostgreSQL cifradas en reposo (AES-256) y en tránsito (TLS 1.3)." : "PostgreSQL database storage encrypted at rest (AES-256) and in transit (TLS 1.3)."}</li>
                <li><strong>Twilio & Deepgram:</strong> {lang === "es" ? "Red de telecomunicaciones y transcripción en tiempo real protegida con autenticación criptográfica HMAC SHA-256." : "Real-time speech-to-text and telephony networks secured with HMAC SHA-256 cryptographic signatures."}</li>
                <li><strong>Google Cloud (Cloud Run & Vertex/Gemini):</strong> {lang === "es" ? "Entorno de ejecución aislado y seguro para el enrutamiento de llamadas y razonamiento del copilot." : "Isolated, secure container runtime and reasoning pipeline for advisor call routing."}</li>
              </ul>
            </div>

            {/* 5. Contact Information */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText size={18} className="text-secondary" />
                {lang === "es" ? "Oficina de Cumplimiento y Contacto Legal" : "Compliance Office & Legal Contact"}
              </h2>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs md:text-sm">
                <p className="font-bold text-slate-900">MyIAD National Insurance Solutions • AB Global Consulting LLC</p>
                <p>
                  <strong>{lang === "es" ? "Asesor Principal:" : "Principal Advisor:"}</strong> Angel Burgos • Licencia 0215 de Florida #G328926 (WFG Code: F6D9U)
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-secondary" />
                  <span><strong>{lang === "es" ? "Línea Gratuita Nacional:" : "Toll-Free National Line:"}</strong> (888) 887-3585 / Direct: (386) 333-1482</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-secondary" />
                  <span><strong>Email:</strong> support@myiad.com / angelburgosrosado@gmail.com</span>
                </p>
                <p>📍 9501 Satellite Blvd, Suite 105, Orlando, FL 32837 • <strong>Web:</strong> myiad.com</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Link
                href="/myiad"
                className="px-6 py-3 bg-[#0B1F3A] hover:bg-[#2563EB] text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                ← {lang === "es" ? "Regresar al Portal MyIAD" : "Return to MyIAD Platform"}
              </Link>
              <Link
                href="/opt-in"
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                {lang === "es" ? "Ver Política de Consentimiento SMS (/opt-in)" : "View SMS Opt-In Policy (/opt-in)"}
              </Link>
            </div>

          </div>
        </section>
      </div>

      <ComplianceDisclosure />
    </main>
  );
}