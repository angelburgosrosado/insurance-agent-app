"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export function AppointmentRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    preferredDate: "",
    preferredTime: "",
    reason: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit request.");
      }

      setSuccess(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 p-6 rounded-sm text-center">
        <h3 className="text-green-800 font-bold text-lg mb-2">Request Received</h3>
        <p className="text-green-700 text-sm">
          Your consultation request has been securely sent. Our team will coordinate with your Google Calendar directly to confirm the exact time.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 border border-[var(--line)] shadow-sm max-w-md">
      <h2 className="font-semibold text-lg border-b border-[var(--line)] pb-3 mb-5">Schedule a Consultation</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
            <CalendarIcon size={14} className="text-[var(--ink-soft)]" /> Preferred Date
          </label>
          <input 
            type="date" 
            required
            value={formData.preferredDate}
            onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
            <Clock size={14} className="text-[var(--ink-soft)]" /> Preferred Time
          </label>
          <select 
            required
            value={formData.preferredTime}
            onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
            className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)] text-sm"
          >
            <option value="">Select a time...</option>
            <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
            <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
            <option value="Evening (4PM - 6PM)">Evening (4PM - 6PM)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Reason for Consultation (Optional)</label>
          <textarea 
            value={formData.reason}
            onChange={e => setFormData({ ...formData, reason: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)] text-sm"
            placeholder="Briefly describe what you'd like to discuss..."
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[var(--accent-deep)] text-white px-4 py-2.5 font-semibold hover:bg-opacity-90 disabled:opacity-50 transition-opacity text-sm"
        >
          {isSubmitting ? "Submitting..." : "Request Appointment"}
        </button>
      </form>
    </div>
  );
}
