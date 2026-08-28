"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAnalytics } from "./analytics-provider";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";
import { getStoredAttribution } from "@/lib/analytics/attribution";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "life-insurance",
  contactTime: "",
  message: "",
  consent: true,
};

export function ConsultationForm() {
  const router = useRouter();
  const { track } = useAnalytics();
  const { lang } = useLanguage();
  const t = dictionary[lang];

  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [serverError, setServerError] = useState("");
  const formStartTracked = useRef(false);

  // Pre-select service if passed via URL parameters (e.g. ?service=annuities or ?service=military)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        setForm((prev) => ({ ...prev, service: serviceParam }));
      }
    }
  }, []);

  function update(field: keyof typeof initialForm, value: string | boolean) {
    if (!formStartTracked.current) {
      track("form_start", { form_name: "consultation_form" });
      formStartTracked.current = true;
    }
    setForm((current) => ({ ...current, [field]: value }));
    // Clear field-level error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    setServerError("");
  }

  function validateClientSide(): boolean {
    const errors: Record<string, string> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.firstName.trim()) {
      errors.firstName = lang === "es" ? "Por favor ingrese su nombre" : "Please enter your first name";
    }

    if (!form.email.trim()) {
      errors.email = lang === "es" ? "Por favor ingrese su correo electrónico" : "Please enter your email";
    } else if (!emailPattern.test(form.email.trim())) {
      errors.email = lang === "es" ? "Ingrese un correo electrónico válido" : "Please enter a valid email address";
    }

    if (!form.phone.trim()) {
      errors.phone = lang === "es" ? "Por favor ingrese su número de teléfono" : "Please enter your phone number";
    }

    if (!form.service) {
      errors.service = lang === "es" ? "Seleccione un servicio de interés" : "Please select a service";
    }

    if (!form.consent) {
      errors.consent = lang === "es" ? "Debe autorizar el contacto para enviar la consulta" : "Consent is required to submit your request";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateClientSide()) {
      setState("error");
      setServerError(
        lang === "es"
          ? "Por favor complete los campos requeridos marcados en rojo."
          : "Please complete the required fields highlighted in red."
      );
      return;
    }

    setState("submitting");
    setServerError("");

    // Auto-split first/last name if user typed their full name in firstName and left lastName empty
    let finalFirstName = form.firstName.trim();
    let finalLastName = form.lastName.trim();
    if (finalFirstName.includes(" ") && !finalLastName) {
      const parts = finalFirstName.split(/\s+/);
      finalFirstName = parts[0];
      finalLastName = parts.slice(1).join(" ");
    } else if (!finalLastName) {
      finalLastName = "Client";
    }

    const currentParams = new URLSearchParams(window.location.search);
    const stored = getStoredAttribution();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: finalFirstName,
          lastName: finalLastName,
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.service,
          contactTime: form.contactTime,
          message: form.message,
          consent: form.consent,
          source: currentParams.get("utm_source") || stored.source || "direct",
          medium: currentParams.get("utm_medium") || stored.medium || "web",
          campaign: currentParams.get("utm_campaign") || stored.campaign || "consultation_form",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        let errorMsg = payload?.error;
        if (!errorMsg || errorMsg === "Invalid request") {
          errorMsg = lang === "es" 
            ? "Por favor revise los datos del formulario e intente nuevamente." 
            : "Please review the form information and try again.";
        }
        setServerError(errorMsg);
        setState("error");
        track("lead_submit_error", { form_name: "consultation_form", error_message: errorMsg });
        return;
      }

      setState("success");
      track("lead_submit_success", { form_name: "consultation_form", service: form.service });
      router.push("/thank-you");
    } catch (err) {
      console.error("[Consultation Form Error]", err);
      setServerError(
        lang === "es"
          ? "Error de conexión. Verifique su conexión a internet e intente de nuevo."
          : "Connection error. Please check your internet connection and try again."
      );
      setState("error");
    }
  }

  const selectStyles = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-sm font-medium";

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      {/* Global Error Banner */}
      {state === "error" && serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-semibold flex items-start gap-2.5">
          <AlertCircle size={17} className="shrink-0 mt-0.5 text-red-600" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Name Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Input 
            label={t.form_fname}
            required 
            placeholder="e.g. Maria"
            value={form.firstName} 
            onChange={(e) => update("firstName", e.target.value)}
            className={fieldErrors.firstName ? "!border-red-500 ring-1 ring-red-500" : ""}
          />
          {fieldErrors.firstName && (
            <p className="text-[11px] text-red-600 font-semibold mt-1">{fieldErrors.firstName}</p>
          )}
        </div>

        <div>
          <Input 
            label={t.form_lname}
            placeholder={lang === "es" ? "e.g. Rodriguez (opcional)" : "e.g. Rodriguez (optional)"}
            value={form.lastName} 
            onChange={(e) => update("lastName", e.target.value)} 
          />
        </div>
      </div>

      {/* Email & Phone Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Input 
            label={t.form_email}
            type="email"
            required 
            placeholder="e.g. maria@example.com"
            value={form.email} 
            onChange={(e) => update("email", e.target.value)}
            className={fieldErrors.email ? "!border-red-500 ring-1 ring-red-500" : ""}
          />
          {fieldErrors.email && (
            <p className="text-[11px] text-red-600 font-semibold mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <Input 
            label={t.form_phone}
            type="tel"
            required 
            placeholder="e.g. (407) 555-0199"
            value={form.phone} 
            onChange={(e) => update("phone", e.target.value)}
            className={fieldErrors.phone ? "!border-red-500 ring-1 ring-red-500" : ""}
          />
          {fieldErrors.phone && (
            <p className="text-[11px] text-red-600 font-semibold mt-1">{fieldErrors.phone}</p>
          )}
        </div>
      </div>
      
      {/* Service Selection */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-slate-900 font-bold text-xs uppercase tracking-wider">
          {t.form_service_label} <span className="text-red-500">*</span>
        </label>
        <select 
          required 
          value={form.service} 
          onChange={(e) => update("service", e.target.value)} 
          className={`${selectStyles} ${fieldErrors.service ? "!border-red-500 ring-1 ring-red-500" : ""}`}
        >
          <option value="life-insurance">{t.form_service_iul}</option>
          <option value="annuities">{t.form_service_annuity}</option>
          <option value="military-asset-shield">{lang === "es" ? "Escudo Patrimonial Militar / Veteranos (SGLI/SBP)" : "Military & Veteran Asset Shield (SGLI/SBP)"}</option>
          <option value="final-expense">{t.form_service_funeral}</option>
          <option value="health-medicare">{t.form_service_health}</option>
          <option value="long-term-care">{t.form_service_ltc}</option>
        </select>
        {fieldErrors.service && (
          <p className="text-[11px] text-red-600 font-semibold">{fieldErrors.service}</p>
        )}
      </div>

      {/* Preferred Contact Time */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-slate-900 font-bold text-xs uppercase tracking-wider">
          {t.form_time_label}
        </label>
        <select 
          value={form.contactTime} 
          onChange={(e) => update("contactTime", e.target.value)} 
          className={selectStyles}
        >
          <option value="">{lang === "es" ? "Sin preferencia de horario (Cualquier hora)" : "No preference (Anytime)"}</option>
          <option value="morning">{t.form_time_morning} (9am - 12pm)</option>
          <option value="afternoon">{t.form_time_afternoon} (12pm - 5pm)</option>
          <option value="evening">{t.form_time_evening} (5pm - 8pm)</option>
        </select>
      </div>

      {/* Message / Scenario */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-slate-900 font-bold text-xs uppercase tracking-wider">
          {t.form_message_label} <span className="font-normal text-slate-400 text-[11px] lowercase">({lang === "es" ? "opcional" : "optional"})</span>
        </label>
        <textarea 
          value={form.message} 
          onChange={(e) => update("message", e.target.value)} 
          placeholder={lang === "es" ? "Describa brevemente sus objetivos o preguntas..." : "Briefly describe your goals or questions..."}
          rows={3} 
          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all resize-none text-sm"
        />
      </div>

      {/* TCPA Consent Checkbox */}
      <div className="space-y-1">
        <label className="flex gap-3 text-xs leading-5 text-slate-600 items-start cursor-pointer">
          <input 
            type="checkbox" 
            checked={form.consent} 
            onChange={(e) => update("consent", e.target.checked)} 
            className="mt-1 h-4 w-4 rounded border-slate-300 text-secondary focus:ring-secondary cursor-pointer" 
          />
          <span>
            {t.form_consent}{" "}
            <Link href="/privacy" className="text-secondary font-semibold underline hover:text-secondary/80">
              {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
            </Link>{" "}
            &{" "}
            <Link href="/terms" className="text-secondary font-semibold underline hover:text-secondary/80">
              {lang === "es" ? "Términos" : "Terms"}
            </Link>.
          </span>
        </label>
        {fieldErrors.consent && (
          <p className="text-[11px] text-red-600 font-semibold pl-7">{fieldErrors.consent}</p>
        )}
      </div>
      
      {/* Submit Button */}
      <Button 
        type="submit" 
        fullWidth
        disabled={state === "submitting"}
        className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 py-4 text-sm font-bold shadow-lg rounded-xl transition-all"
      >
        {state === "submitting" ? t.form_submitting : t.form_submit}
      </Button>
      
      <p className="text-[11px] leading-relaxed text-slate-400 text-center">
        {lang === "es" 
          ? <span>🔒 Respetamos su privacidad. Asesoría confidencial con el Licenciado Angel Burgos. Consulte nuestra <Link href="/privacy" className="underline hover:text-secondary">Política de Privacidad</Link>.</span>
          : <span>🔒 We respect your privacy. Confidential consultation with licensed advisor Angel Burgos. See our <Link href="/privacy" className="underline hover:text-secondary">Privacy Policy</Link>.</span>}
      </p>
    </form>
  );
}
