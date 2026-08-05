"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  function update(field: keyof typeof initialForm, value: string | boolean) {
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
      setError(payload?.error ?? "Review the form and try again");
      setState("error");
      return;
    }

    router.push("/thank-you");
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          First name
          <input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="w-full border-b border-[var(--line)] bg-transparent px-0 py-3 outline-none transition-colors focus:border-[var(--accent)]" />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Last name
          <input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="w-full border-b border-[var(--line)] bg-transparent px-0 py-3 outline-none transition-colors focus:border-[var(--accent)]" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Email
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full border-b border-[var(--line)] bg-transparent px-0 py-3 outline-none transition-colors focus:border-[var(--accent)]" />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Phone
          <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full border-b border-[var(--line)] bg-transparent px-0 py-3 outline-none transition-colors focus:border-[var(--accent)]" />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-medium">
        What would you like to discuss?
        <select required value={form.service} onChange={(e) => update("service", e.target.value)} className="w-full border-b border-[var(--line)] bg-transparent py-3 outline-none focus:border-[var(--accent)]">
          <option value="">Select a service area</option>
          <option value="personal-insurance">Personal insurance</option>
          <option value="business-insurance">Business insurance</option>
          <option value="life-insurance">Life insurance</option>
          <option value="health-insurance">Health insurance</option>
          <option value="not-sure">I am not sure yet</option>
        </select>
      </label>
      <label className="block space-y-2 text-sm font-medium">
        Preferred contact timing
        <select value={form.contactTime} onChange={(e) => update("contactTime", e.target.value)} className="w-full border-b border-[var(--line)] bg-transparent py-3 outline-none focus:border-[var(--accent)]">
          <option value="">No preference</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </label>
      <label className="block space-y-2 text-sm font-medium">
        Additional context <span className="font-normal text-[var(--ink-soft)]">optional</span>
        <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={3} className="w-full resize-none border-b border-[var(--line)] bg-transparent py-3 outline-none focus:border-[var(--accent)]" />
      </label>
      <label className="flex gap-3 text-sm leading-6 text-[var(--ink-soft)]">
        <input required type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 accent-[var(--accent)]" />
        <span>I agree to be contacted about this request and acknowledge the <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--ink)]">privacy notice</Link></span>
      </label>
      {state === "error" && <p role="alert" className="text-sm text-[var(--accent-deep)]">{error}</p>}
      <button disabled={state === "submitting"} className="w-full bg-[var(--ink)] px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-wait disabled:opacity-60">
        {state === "submitting" ? "Submitting request" : "Request a consultation"}
      </button>
      <p className="text-xs leading-5 text-[var(--ink-soft)]">This request is for an initial conversation only. It is not an application for insurance or a coverage decision</p>
    </form>
  );
}
