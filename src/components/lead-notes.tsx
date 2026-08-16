"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function LeadNotes({ notes, leadId }: { notes: any[]; leadId: string }) {
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_note", body: draft }),
      });
      if (res.ok) {
        setDraft("");
        router.refresh();
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 border border-[var(--line)] shadow-sm">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-4 border-b border-[var(--line)] pb-4">Internal Notes</h3>
      
      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-sm text-[var(--ink-soft)]">No notes recorded yet.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="pb-4 border-b border-[var(--line)] last:border-0 last:pb-0">
              <p className="text-sm">{note.body}</p>
              <div className="mt-2 text-xs text-[var(--ink-soft)] flex items-center gap-2">
                <span className="font-medium text-[var(--ink)]">{note.author?.name || "Unknown"}</span>
                <span>&bull;</span>
                <span>{new Date(note.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={addNote} className="flex flex-col gap-3">
        <textarea 
          className="w-full border border-[var(--line)] p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-sentinel-navy"
          rows={3}
          placeholder="Add a new note..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={isSaving}
        />
        <Button 
          type="submit" 
          disabled={!draft.trim() || isSaving}
          className="self-end bg-sentinel-navy hover:bg-sentinel-navy/90 text-white"
        >
          {isSaving ? "Saving..." : "Add Note"}
        </Button>
      </form>
    </div>
  );
}
