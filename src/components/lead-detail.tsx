"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone, Mail, MessageSquare, Check, Copy } from "lucide-react";

export function LeadDetail({ lead }: { lead: any }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true);
    setStatus(newStatus);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        console.error("Failed to update status");
        setStatus(lead.status); // revert on failure
      } else {
        router.refresh();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // Clean phone number for tel/wa.me links
  const rawPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, "") : "";
  const phoneWithCountry = rawPhone.length === 10 ? `1${rawPhone}` : rawPhone;

  const defaultGreeting = `Hello ${lead.firstName}, this is Angel Burgos with AB Global Consulting following up on your request for ${lead.service}. I have your numbers and guides ready. When is a good time for a quick 5-minute call?`;
  const encodedMessage = encodeURIComponent(defaultGreeting);

  const handleCopyDetails = () => {
    const text = `Lead: ${lead.firstName} ${lead.lastName}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nService: ${lead.service}\nSource: ${lead.attribution?.source || "Direct"}\nMessage: ${lead.message || "N/A"}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 border border-[var(--line)] shadow-sm rounded-2xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              {lead.firstName} {lead.lastName}
            </h2>
            <button
              onClick={handleCopyDetails}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium flex items-center gap-1 transition-colors"
              title="Copy lead contact info"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy Info"}
            </button>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            <strong>{lead.email}</strong> &bull; <strong>{lead.phone}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase">Status:</label>
          <select 
            className="border border-slate-300 rounded-xl px-3 py-2 text-sm bg-white font-semibold cursor-pointer disabled:opacity-50 shadow-sm focus:outline-none focus:border-amber-500"
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={isUpdating}
          >
            <option value="new">🟢 New Lead</option>
            <option value="reviewing">🟡 Reviewing</option>
            <option value="assigned">🔵 Assigned</option>
            <option value="contacted">🟣 Contacted</option>
            <option value="qualified">⭐ Qualified</option>
            <option value="closed">✔️ Closed / Bound</option>
          </select>
        </div>
      </div>

      {/* 1-Click Fast Action Bar for Advisor Outreach */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          ⚡ 1-Click Customer Outreach Actions:
        </p>
        <div className="flex flex-wrap gap-2.5">
          {phoneWithCountry && (
            <a
              href={`https://wa.me/${phoneWithCountry}?text=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <MessageCircle size={15} />
              Open WhatsApp Chat
            </a>
          )}

          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Phone size={15} />
              Call Phone
            </a>
          )}

          {lead.phone && (
            <a
              href={`sms:${lead.phone}?body=${encodedMessage}`}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <MessageSquare size={15} />
              Open Phone App SMS
            </a>
          )}

          {lead.email && (
            <a
              href={`mailto:${lead.email}?subject=${encodeURIComponent(`Your Consultation & Guide • Angel Burgos`)}&body=${encodedMessage}`}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Mail size={15} />
              Draft Email
            </a>
          )}
        </div>

        {/* Cloud SMS Auto-Sender */}
        {lead.phone && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={`Type direct SMS to ${lead.firstName}...`}
                id="cloud-sms-input"
                className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-amber-500 shadow-inner"
              />
              <button
                type="button"
                onClick={async () => {
                  const input = document.getElementById("cloud-sms-input") as HTMLInputElement;
                  if (!input || !input.value.trim()) return;
                  const text = input.value.trim();
                  input.disabled = true;
                  try {
                    const res = await fetch(`/api/admin/leads/${lead.id}/sms`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ message: text }),
                    });
                    if (res.ok) {
                      input.value = "";
                      alert("✅ SMS dispatched successfully and logged to client notes!");
                      router.refresh();
                    } else {
                      const err = await res.json().catch(() => ({}));
                      alert(`❌ Error: ${err.error || "Failed to dispatch SMS"}`);
                    }
                  } catch {
                    alert("❌ Network error dispatching SMS.");
                  } finally {
                    input.disabled = false;
                  }
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow transition-all shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📲</span> Send Cloud SMS
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Information Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-3 font-bold">
            Request Details
          </h3>
          <dl className="space-y-3">
             <div>
               <dt className="text-xs text-slate-500">Service Requested</dt>
               <dd className="font-bold text-slate-900 mt-0.5">{lead.service}</dd>
             </div>
             <div>
               <dt className="text-xs text-slate-500">Best Time to Contact</dt>
               <dd className="font-medium text-slate-800 mt-0.5">{lead.contactTime || "Not specified"}</dd>
             </div>
             <div>
               <dt className="text-xs text-slate-500">Prospect Message / Scenario</dt>
               <dd className="font-medium text-slate-800 mt-0.5 whitespace-pre-wrap bg-white p-3 rounded-lg border border-slate-200 text-xs">
                 {lead.message || "No message provided."}
               </dd>
             </div>
          </dl>
        </div>
        
        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-3 font-bold">
            Acquisition & Social Attribution
          </h3>
          <dl className="space-y-3">
             <div>
               <dt className="text-xs text-slate-500">Traffic Source / Medium</dt>
               <dd className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                 <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-semibold text-xs">
                   {lead.attribution?.source || "Direct Website"}
                 </span>
                 {lead.attribution?.medium && (
                   <span className="text-slate-500 text-xs font-normal">/ {lead.attribution.medium}</span>
                 )}
               </dd>
             </div>
             <div>
               <dt className="text-xs text-slate-500">Campaign Name</dt>
               <dd className="font-medium text-slate-800 mt-0.5">{lead.attribution?.campaign || "Organic / None"}</dd>
             </div>
             <div>
               <dt className="text-xs text-slate-500">Compliance & Consent</dt>
               <dd className="font-medium text-slate-800 mt-0.5 text-xs">
                 {lead.consent ? "✅ Consent Granted" : "❌ Not granted"}
                 <div className="text-[11px] text-slate-400 mt-0.5">Version: {lead.consentVersion}</div>
                 <div className="text-[11px] text-slate-400">Timestamp: {new Date(lead.consentAt).toLocaleString()}</div>
               </dd>
             </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
