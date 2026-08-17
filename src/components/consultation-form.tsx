"use client";

import { FormEvent, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAnalytics } from "./analytics-provider";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  contactTime: "",
  message: "",
  consent: false,
};

export function ConsultationForm() {
  const router = useRouter();
  const { track } = useAnalytics();
  const { lang } = useLanguage();
  const t = dictionary[lang];

  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const formStartTracked = useRef(false);

  function update(field: keyof typeof initialForm, value: string | boolean) {
    if (!formStartTracked.current) {
      track("form_start", { form_name: "consultation_form" });
      formStartTracked.current = true;
    }
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const params = new URLSearchParams(window.location.search);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        source: params.get("utm_source") ?? "",
        medium: params.get("utm_medium") ?? "",
        campaign: params.get("utm_campaign") ?? "",
      }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      const errorMessage = payload?.error ?? (lang === "es" ? "Por favor revise el formulario e intente de nuevo" : "Review the form and try again");
      setError(errorMessage);
      setState("error");
      track("lead_submit_error", { form_name: "consultation_form", error_message: errorMessage });
      return;
    }

    track("lead_submit_success", { form_name: "consultation_form", service: form.service });
    router.push("/thank-you");
  }

  const selectStyles = "w-full px-4 py-3 rounded border border-slate-300 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 text-sm";

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input 
          label={t.form_fname}
          required 
          value={form.firstName} 
          onChange={(e) => update("firstName", e.target.value)} 
        />
        <Input 
          label={t.form_lname}
          required 
          value={form.lastName} 
          onChange={(e) => update("lastName", e.target.value)} 
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input 
          label={t.form_email}
          type="email"
          required 
          value={form.email} 
          onChange={(e) => update("email", e.target.value)} 
        />
        <Input 
          label={t.form_phone}
          type="tel"
          required 
          value={form.phone} 
          onChange={(e) => update("phone", e.target.value)} 
        />
      </div>
      
      <div className="flex flex-col gap-2 w-full">
        <label className="text-primary font-semibold text-sm">
          {t.form_service_label}
        </label>
        <select required value={form.service} onChange={(e) => update("service", e.target.value)} className={selectStyles}>
          <option value="">{t.form_service_select}</option>
          <option value="life-insurance">{t.form_service_iul}</option>
          <option value="annuities">{t.form_service_annuity}</option>
          <option value="final-expense">{t.form_service_funeral}</option>
          <option value="health-medicare">{t.form_service_health}</option>
          <option value="long-term-care">{t.form_service_ltc}</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-primary font-semibold text-sm">
          {t.form_time_label}
        </label>
        <select value={form.contactTime} onChange={(e) => update("contactTime", e.target.value)} className={selectStyles}>
          <option value="">{lang === "es" ? "Sin preferencia de horario" : "No preference"}</option>
          <option value="morning">{t.form_time_morning}</option>
          <option value="afternoon">{t.form_time_afternoon}</option>
          <option value="evening">{t.form_time_evening}</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-primary font-semibold text-sm">
          {t.form_message_label} <span className="font-normal text-slate-500 text-xs">({lang === "es" ? "opcional" : "optional"})</span>
        </label>
        <textarea 
          value={form.message} 
          onChange={(e) => update("message", e.target.value)} 
          rows={3} 
          className="w-full px-4 py-3 rounded border border-slate-300 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-none text-sm"
        />
      </div>

      <label className="flex gap-3 text-xs leading-5 text-slate-600 items-start">
        <input required type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
        <span>{t.form_consent}</span>
      </label>
      
      {state === "error" && <p role="alert" className="text-sm font-medium text-[#ba1a1a]">{error}</p>}
      
      <Button 
        type="submit" 
        fullWidth
        disabled={state === "submitting"}
        className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 py-3.5 text-sm font-bold shadow-lg"
      >
        {state === "submitting" ? t.form_submitting : t.form_submit}
      </Button>
      
      <p className="text-[11px] leading-relaxed text-slate-400 text-center">
        {lang === "es" 
          ? "🔒 Esta solicitud es exclusivamente para una consulta inicial sin compromiso ni decisiones de cobertura automáticas."
          : "🔒 This request is for an initial conversation only. It is not an application for insurance or a coverage decision."}
      </p>
    </form>
  );
}
