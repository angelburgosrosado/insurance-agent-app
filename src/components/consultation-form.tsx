"use client";

import { FormEvent, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAnalytics } from "./analytics-provider";

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
      const errorMessage = payload?.error ?? "Review the form and try again";
      setError(errorMessage);
      setState("error");
      track("lead_submit_error", { form_name: "consultation_form", error_message: errorMessage });
      return;
    }

    track("lead_submit_success", { form_name: "consultation_form", service: form.service });
    router.push("/thank-you");
  }

  const selectStyles = "w-full px-4 py-3 rounded border border-slate-300 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200";

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input 
          label="First name"
          required 
          value={form.firstName} 
          onChange={(e) => update("firstName", e.target.value)} 
        />
        <Input 
          label="Last name"
          required 
          value={form.lastName} 
          onChange={(e) => update("lastName", e.target.value)} 
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input 
          label="Email"
          type="email"
          required 
          value={form.email} 
          onChange={(e) => update("email", e.target.value)} 
        />
        <Input 
          label="Phone"
          type="tel"
          required 
          value={form.phone} 
          onChange={(e) => update("phone", e.target.value)} 
        />
      </div>
      
      <div className="flex flex-col gap-2 w-full">
        <label className="text-primary font-semibold text-sm">
          What would you like to discuss?
        </label>
        <select required value={form.service} onChange={(e) => update("service", e.target.value)} className={selectStyles}>
          <option value="">Select a service area</option>
          <option value="life-insurance">Life insurance & Heritage®</option>
          <option value="ltc-planning">LTC Planning & CareMatters</option>
          <option value="retirement">Retirement & Annuities</option>
          <option value="business">Business Strategies (Buy-Sell, Key Person)</option>
          <option value="not-sure">I am not sure yet</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-primary font-semibold text-sm">
          Preferred contact timing
        </label>
        <select value={form.contactTime} onChange={(e) => update("contactTime", e.target.value)} className={selectStyles}>
          <option value="">No preference</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-primary font-semibold text-sm">
          Additional context <span className="font-normal text-slate-500">optional</span>
        </label>
        <textarea 
          value={form.message} 
          onChange={(e) => update("message", e.target.value)} 
          rows={3} 
          className="w-full px-4 py-3 rounded border border-slate-300 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-none"
        />
      </div>

      <label className="flex gap-3 text-sm leading-6 text-slate-600 items-start">
        <input required type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
        <span>I agree to be contacted about this request and acknowledge the <Link href="/privacy" className="underline underline-offset-2 hover:text-primary font-medium">privacy notice</Link></span>
      </label>
      
      {state === "error" && <p role="alert" className="text-sm font-medium text-[#ba1a1a]">{error}</p>}
      
      <Button 
        type="submit" 
        fullWidth
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Submitting request..." : "Request a consultation"}
      </Button>
      
      <p className="text-xs leading-5 text-slate-500 text-center">This request is for an initial conversation only. It is not an application for insurance or a coverage decision.</p>
    </form>
  );
}
