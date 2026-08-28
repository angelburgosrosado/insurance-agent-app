"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Lock, FileText, Phone, Mail, CheckCircle2 } from "lucide-react";

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
              {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {lang === "es"
                ? "Cómo AB Global Consulting recopila, protege y utiliza la información enviada a través de este portal para consultas de seguros y planificación financiera."
                : "How AB Global Consulting collects, protects, and uses information submitted through this portal for insurance consultations and financial planning."}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span>{lang === "es" ? "Última actualización: Agosto 2026" : "Last Updated: August 2026"}</span>
              <span>•</span>
              <button
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="text-secondary font-bold hover:underline"
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
                  <span><strong>{lang === "es" ? "Cero Venta de Datos:" : "Zero Data Selling:"}</strong> {lang === "es" ? "Nunca vendemos, alquilamos ni transferimos su información a agentes externos o empresas de telemercadeo." : "We never sell, rent, or lease your personal information to third-party lead brokers or telemarketers."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>{lang === "es" ? "Uso Exclusivo:" : "Exclusive Consultation Purpose:"}</strong> {lang === "es" ? "Su información se utiliza únicamente para atender su solicitud de consulta o entregar las guías y calculadoras solicitadas." : "Your data is strictly used to evaluate your insurance options, prepare custom illustrations, and deliver requested guides."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>{lang === "es" ? "Control Total:" : "Full Control & Opt-Out:"}</strong> {lang === "es" ? "Puede cancelar comunicaciones en cualquier momento respondiendo STOP a cualquier SMS o enviando un correo." : "You can unsubscribe or opt out of SMS/email communications at any time with one click."}</span>
                </li>
              </ul>
            </div>

            {/* 1. Information Collected */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-secondary font-black">1.</span>
                {lang === "es" ? "Información que Recopilamos" : "Information We Collect"}
              </h2>
              <p>
                {lang === "es"
                  ? "Cuando usted interactúa con este sitio web, solicita una consulta o descarga una guía informativa (por ejemplo, The Protection Planning Checklist o el Simulador IUL), podemos recopilar:"
                  : "When you interact with this website, request an insurance consultation, or download consumer guides (such as The Protection Planning Checklist or IUL tools), we may collect:"}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
                <li><strong>{lang === "es" ? "Datos de Contacto:" : "Contact Information:"}</strong> {lang === "es" ? "Nombre, apellido, correo electrónico y número de teléfono." : "First name, last name, email address, and phone number."}</li>
                <li><strong>{lang === "es" ? "Preferencias de Consulta:" : "Consultation Preferences:"}</strong> {lang === "es" ? "Servicios de interés (Seguro de Vida/IUL, Anualidades, Escudo Militar SGLI/SBP, Gastos Finales) y horario preferido de contacto." : "Services of interest (Life Insurance/IUL, Annuities, Military Asset Shield, Final Expense) and preferred contact hours."}</li>
                <li><strong>{lang === "es" ? "Datos Técnicos y de Atribución:" : "Technical & Attribution Data:"}</strong> {lang === "es" ? "Dirección IP anonimizada, tipo de navegador y parámetros de campaña publicitaria (UTM) para evaluar la efectividad de nuestros canales educativos." : "Anonymized IP addresses, browser type, and marketing campaign parameters (UTM tags) to measure educational outreach."}</li>
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
                  ? "La información suministrada se procesa con los siguientes fines exclusivos:"
                  : "Information submitted through this portal is processed exclusively for the following purposes:"}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
                <li>{lang === "es" ? "Analizar su perfil y preparar comparaciones educativas sobre opciones de seguro y retiro." : "Analyzing your profile and preparing educational illustrations regarding insurance options and retirement strategies."}</li>
                <li>{lang === "es" ? "Contactarle directamente por llamada telefónica, mensaje de texto (SMS) o correo electrónico para coordinar su sesión diagnóstica." : "Directly contacting you via telephone, text message (SMS), or email to coordinate your consultation session."}</li>
                <li>{lang === "es" ? "Enviar copias digitales y enlaces de descarga de guías, listas de verificación o cálculos interactivos solicitados." : "Sending digital copies and download links for requested checklists, guides, or personalized calculator scenarios."}</li>
                <li>{lang === "es" ? "Mantener un registro interno seguro de seguimiento en nuestro sistema de atención al cliente (CRM)." : "Maintaining secure client relationship records in our CRM system for ongoing advisory follow-up."}</li>
              </ul>
            </div>

            {/* 3. TCPA & Communications Policy */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-secondary font-black">3.</span>
                {lang === "es" ? "Consentimiento de Comunicaciones (TCPA)" : "Telephone & SMS Communications (TCPA Compliance)"}
              </h2>
              <p>
                {lang === "es"
                  ? "Al marcar la casilla de consentimiento y presionar 'Solicitar Consulta' o 'Descargar Guía', usted autoriza a AB Global Consulting y al agente Angel Burgos a comunicarse con usted mediante llamadas telefónicas, correos electrónicos y mensajes de texto (SMS/MMS) al número y correo provistos. Las tarifas estándar de mensajes y datos pueden aplicar."
                  : "By submitting a consultation request or downloading a guide with affirmative consent, you authorize AB Global Consulting and licensed agent Angel Burgos to contact you via telephone calls, emails, and SMS text messages regarding insurance consultation services. Standard message and data rates may apply."}
              </p>
              <p className="text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <strong>{lang === "es" ? "Opción de Cancelación (Opt-Out):" : "Opt-Out Option:"}</strong>{" "}
                {lang === "es"
                  ? "Puede cancelar las comunicaciones por mensaje de texto en cualquier momento respondiendo 'STOP' a cualquier SMS, o enviar un correo a angelburgosrosado@gmail.com solicitando la baja de su registro."
                  : "You may opt out of text communications at any time by replying 'STOP' to any SMS received, or by emailing angelburgosrosado@gmail.com to request record removal."}
              </p>
            </div>

            {/* 4. Security & Third-Party Service Providers */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-secondary font-black">4.</span>
                {lang === "es" ? "Proveedores de Infraestructura y Seguridad" : "Infrastructure Providers & Security"}
              </h2>
              <p>
                {lang === "es"
                  ? "Para operar este portal de manera segura y eficiente, utilizamos proveedores de tecnología de primer nivel que cumplen con estrictos estándares de encriptación y protección de datos:"
                  : "To operate this application securely, we utilize enterprise-grade infrastructure providers adhering to strict encryption and compliance standards:"}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
                <li><strong>Supabase & PostgreSQL:</strong> {lang === "es" ? "Base de datos en la nube con encriptación SSL/TLS en reposo y en tránsito." : "Cloud database with SSL/TLS encryption in transit and at rest."}</li>
                <li><strong>HubSpot CRM:</strong> {lang === "es" ? "Gestión confidencial de contactos y registro de citas de asesoría." : "Confidential client management and consultation appointment tracking."}</li>
                <li><strong>Resend:</strong> {lang === "es" ? "Envío transaccional seguro de confirmaciones y guías en formato PDF." : "Secure transactional email delivery of confirmations and PDF guides."}</li>
              </ul>
            </div>

            {/* 5. Consumer Rights */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="text-secondary font-black">5.</span>
                {lang === "es" ? "Sus Derechos y Control de Datos" : "Your Rights & Data Control"}
              </h2>
              <p>
                {lang === "es"
                  ? "Usted tiene derecho a consultar qué información personal tenemos archivada, corregir inexactitudes o solicitar la eliminación total de sus registros de nuestras bases de datos."
                  : "You have the right to review what personal information is on file, request corrections, or request complete deletion of your records from our databases."}
              </p>
            </div>

            {/* 6. Contact Information */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText size={18} className="text-secondary" />
                {lang === "es" ? "Contacto de Privacidad y Oficial de Cumplimiento" : "Privacy & Compliance Contact"}
              </h2>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs md:text-sm">
                <p className="font-bold text-slate-900">AB Global Consulting LLC</p>
                <p><strong>{lang === "es" ? "Asesor Principal:" : "Principal Advisor:"}</strong> Angel Burgos • Licenciado Estatal 0215 (FL Lic. #G328926 / WFG Code: F6D9U)</p>
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-secondary" />
                  <a href="mailto:angelburgosrosado@gmail.com" className="text-secondary font-bold hover:underline">angelburgosrosado@gmail.com</a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-secondary" />
                  <span>(386) 333-1482 / (407) 930-6226</span>
                </p>
                <p>📍 9501 Satellite Blvd, Suite 105, Orlando, FL 32837</p>
              </div>
            </div>

            <div className="text-center pt-6">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-slate-900 hover:bg-secondary text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                ← {lang === "es" ? "Regresar al Portal Principal" : "Return to Home Page"}
              </Link>
            </div>

          </div>
        </section>
      </div>

      <ComplianceDisclosure />
    </main>
  );
}