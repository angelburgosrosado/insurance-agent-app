"use client";

import { useState } from "react";
import type { Lead, LeadStatus } from "@/lib/db";

const statuses: LeadStatus[] = ["new", "reviewing", "assigned", "contacted", "qualified", "closed"];
const labels: Record<LeadStatus, string> = { new: "New", reviewing: "Reviewing", assigned: "Assigned", contacted: "Contacted", qualified: "Qualified", closed: "Closed" };

function serviceLabel(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [error, setError] = useState("");

  async function updateStatus(id: number, status: LeadStatus) {
    setError("");
    const response = await fetch("/api/admin/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    if (!response.ok) { setError("Unable to update lead"); return; }
    const payload = await response.json() as { lead: Lead };
    setLeads((current) => current.map((lead) => lead.id === id ? payload.lead : lead));
  }

  return <div className="overflow-x-auto border-y border-[var(--line)]">
    {error && <p role="alert" className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--accent-deep)]">{error}</p>}
    <table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-[var(--line)] text-xs uppercase tracking-[0.14em] text-[var(--ink-soft)]"><tr><th className="px-4 py-4 font-mono font-normal">Prospect</th><th className="px-4 py-4 font-mono font-normal">Service</th><th className="px-4 py-4 font-mono font-normal">Source</th><th className="px-4 py-4 font-mono font-normal">Received</th><th className="px-4 py-4 font-mono font-normal">Status</th></tr></thead><tbody className="divide-y divide-[var(--line)]">{leads.map((lead) => <tr key={lead.id}><td className="px-4 py-5"><p className="font-medium">{lead.firstName} {lead.lastName}</p><p className="mt-1 text-xs text-[var(--ink-soft)]">{lead.email}<br />{lead.phone}</p></td><td className="px-4 py-5 text-[var(--ink-soft)]">{serviceLabel(lead.service)}</td><td className="px-4 py-5 text-[var(--ink-soft)]">{lead.source || "Direct"}</td><td className="px-4 py-5 text-[var(--ink-soft)]">{new Date(lead.createdAt).toLocaleDateString()}</td><td className="px-4 py-5"><select aria-label={`Status for ${lead.firstName} ${lead.lastName}`} value={lead.status} onChange={(event) => updateStatus(lead.id, event.target.value as LeadStatus)} className="border border-[var(--line)] bg-transparent px-3 py-2 text-sm">{statuses.map((status) => <option key={status} value={status}>{labels[status]}</option>)}</select></td></tr>)}</tbody></table>
    {leads.length === 0 && <p className="px-4 py-8 text-sm text-[var(--ink-soft)]">No leads have been received</p>}
  </div>;
}
