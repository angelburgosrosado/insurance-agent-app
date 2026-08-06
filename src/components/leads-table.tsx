"use client";

import { Fragment, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/db";
import type { LeadId } from "@/lib/server/leads";

type LeadNote = { id: LeadId; leadId: LeadId; body: string; author: string; createdAt: string };

const statuses: LeadStatus[] = ["new", "reviewing", "assigned", "contacted", "qualified", "closed"];
const labels: Record<LeadStatus, string> = { new: "New", reviewing: "Reviewing", assigned: "Assigned", contacted: "Contacted", qualified: "Qualified", closed: "Closed" };

function serviceLabel(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [expandedLead, setExpandedLead] = useState<LeadId | null>(null);
  const [notes, setNotes] = useState<Record<string, LeadNote[]>>({});
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [savingNote, setSavingNote] = useState<LeadId | null>(null);
  const [error, setError] = useState("");

  async function updateLead(id: LeadId, changes: { status?: LeadStatus; followUpDate?: string }) {
    setError("");
    const response = await fetch("/api/admin/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: changes.status ?? leads.find((lead) => lead.id === id)?.status, followUpDate: changes.followUpDate }) });
    if (!response.ok) { setError("Unable to update lead"); return; }
    const payload = await response.json() as { lead: Lead };
    setLeads((current) => current.map((lead) => lead.id === id ? payload.lead : lead));
  }

  async function toggleNotes(id: LeadId) {
    setError("");
    if (expandedLead === id) { setExpandedLead(null); return; }
    setExpandedLead(id);
    if (notes[String(id)]) return;
    const response = await fetch(`/api/admin/leads/notes?leadId=${encodeURIComponent(String(id))}`);
    if (!response.ok) { setError("Unable to load notes"); return; }
    const payload = await response.json() as { notes: LeadNote[] };
    setNotes((current) => ({ ...current, [String(id)]: payload.notes }));
  }

  async function addNote(id: LeadId) {
    const body = noteDrafts[String(id)]?.trim();
    if (!body) return;
    setSavingNote(id);
    setError("");
    const response = await fetch("/api/admin/leads/notes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ leadId: id, body }) });
    if (!response.ok) { setError("Unable to add note"); setSavingNote(null); return; }
    const payload = await response.json() as { note: LeadNote };
    setNotes((current) => ({ ...current, [String(id)]: [payload.note, ...(current[String(id)] ?? [])] }));
    setNoteDrafts((current) => ({ ...current, [String(id)]: "" }));
    setSavingNote(null);
  }

  return <div className="overflow-x-auto border-y border-[var(--line)]">
    {error && <p role="alert" className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--accent-deep)]">{error}</p>}
    <table className="w-full min-w-[980px] text-left text-sm"><thead className="border-b border-[var(--line)] text-xs uppercase tracking-[0.14em] text-[var(--ink-soft)]"><tr><th className="px-4 py-4 font-mono font-normal">Prospect</th><th className="px-4 py-4 font-mono font-normal">Service</th><th className="px-4 py-4 font-mono font-normal">Source</th><th className="px-4 py-4 font-mono font-normal">Received</th><th className="px-4 py-4 font-mono font-normal">Follow-up</th><th className="px-4 py-4 font-mono font-normal">Status</th><th className="px-4 py-4 font-mono font-normal">Notes</th></tr></thead><tbody className="divide-y divide-[var(--line)]">{leads.map((lead) => <Fragment key={lead.id}>
      <tr><td className="px-4 py-5"><p className="font-medium">{lead.firstName} {lead.lastName}</p><p className="mt-1 text-xs text-[var(--ink-soft)]">{lead.email}<br />{lead.phone}</p></td><td className="px-4 py-5 text-[var(--ink-soft)]">{serviceLabel(lead.service)}</td><td className="px-4 py-5 text-[var(--ink-soft)]">{lead.source || "Direct"}</td><td className="px-4 py-5 text-[var(--ink-soft)]">{new Date(lead.createdAt).toLocaleDateString()}</td><td className="px-4 py-5"><input aria-label={`Follow-up date for ${lead.firstName} ${lead.lastName}`} type="date" value={lead.followUpDate} onChange={(event) => updateLead(lead.id, { followUpDate: event.target.value })} className="border border-[var(--line)] bg-transparent px-2 py-2 text-sm" /></td><td className="px-4 py-5"><select aria-label={`Status for ${lead.firstName} ${lead.lastName}`} value={lead.status} onChange={(event) => updateLead(lead.id, { status: event.target.value as LeadStatus })} className="border border-[var(--line)] bg-transparent px-3 py-2 text-sm">{statuses.map((status) => <option key={status} value={status}>{labels[status]}</option>)}</select></td><td className="px-4 py-5"><button type="button" onClick={() => toggleNotes(lead.id)} className="border border-[var(--line)] px-3 py-2 text-xs font-medium hover:border-[var(--ink)]">{expandedLead === lead.id ? "Close" : "View"}</button></td></tr>
      {expandedLead === lead.id && <tr key={`${lead.id}-notes`}><td colSpan={7} className="bg-[#f7f8f7] px-4 py-5"><div className="max-w-3xl"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">Internal notes</p>{(notes[String(lead.id)] ?? []).map((note) => <article key={note.id} className="border-b border-[var(--line)] py-3"><p>{note.body}</p><p className="mt-1 text-xs text-[var(--ink-soft)]">{note.author} · {new Date(note.createdAt).toLocaleString()}</p></article>)}{notes[String(lead.id)]?.length === 0 && <p className="py-3 text-sm text-[var(--ink-soft)]">No notes recorded</p>}<div className="mt-4 flex gap-2"><input aria-label={`New note for ${lead.firstName} ${lead.lastName}`} value={noteDrafts[String(lead.id)] ?? ""} onChange={(event) => setNoteDrafts((current) => ({ ...current, [String(lead.id)]: event.target.value }))} placeholder="Add an internal note" className="min-w-0 flex-1 border border-[var(--line)] bg-white px-3 py-2 text-sm" /><button type="button" disabled={savingNote === lead.id} onClick={() => addNote(lead.id)} className="bg-[var(--ink)] px-4 py-2 text-xs font-medium text-white disabled:opacity-50">{savingNote === lead.id ? "Saving" : "Add note"}</button></div></div></td></tr>}
    </Fragment>)}</tbody></table>
    {leads.length === 0 && <p className="px-4 py-8 text-sm text-[var(--ink-soft)]">No leads have been received</p>}
  </div>;
}
