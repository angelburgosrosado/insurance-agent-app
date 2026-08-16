"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LeadDetail({ lead }: { lead: any }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [isUpdating, setIsUpdating] = useState(false);

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

  return (
    <div className="bg-white p-6 border border-[var(--line)] shadow-sm">
      <div className="flex justify-between items-start mb-6 pb-6 border-b border-[var(--line)]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{lead.firstName} {lead.lastName}</h2>
          <p className="text-[var(--ink-soft)] mt-1">{lead.email} &bull; {lead.phone}</p>
        </div>
        <div className="flex flex-col items-end">
           <select 
            className="border border-[var(--line)] px-3 py-2 text-sm bg-white cursor-pointer disabled:opacity-50"
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={isUpdating}
          >
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="assigned">Assigned</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-2">Request Information</h3>
          <dl className="space-y-4">
             <div>
               <dt className="text-[var(--ink-soft)]">Service Requested</dt>
               <dd className="font-medium mt-1">{lead.service}</dd>
             </div>
             <div>
               <dt className="text-[var(--ink-soft)]">Best Time to Contact</dt>
               <dd className="font-medium mt-1">{lead.contactTime || "Not specified"}</dd>
             </div>
             <div>
               <dt className="text-[var(--ink-soft)]">Message</dt>
               <dd className="font-medium mt-1 whitespace-pre-wrap">{lead.message || "No message provided."}</dd>
             </div>
          </dl>
        </div>
        
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-2">Acquisition Data</h3>
          <dl className="space-y-4">
             <div>
               <dt className="text-[var(--ink-soft)]">Source / Medium</dt>
               <dd className="font-medium mt-1">{lead.attribution?.source || "Direct"} {lead.attribution?.medium ? `/ ${lead.attribution.medium}` : ""}</dd>
             </div>
             <div>
               <dt className="text-[var(--ink-soft)]">Campaign</dt>
               <dd className="font-medium mt-1">{lead.attribution?.campaign || "-"}</dd>
             </div>
             <div>
               <dt className="text-[var(--ink-soft)]">Consent</dt>
               <dd className="font-medium mt-1">
                 {lead.consent ? "Granted" : "Not granted"}
                 <div className="text-xs text-[var(--ink-soft)] mt-1">Version: {lead.consentVersion}</div>
                 <div className="text-xs text-[var(--ink-soft)]">Timestamp: {new Date(lead.consentAt).toLocaleString()}</div>
               </dd>
             </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
