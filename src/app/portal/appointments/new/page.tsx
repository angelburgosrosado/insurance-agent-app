import { AppointmentRequest } from "@/components/appointment-request";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewAppointmentPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <header className="border-b border-[var(--line)] pb-6 flex items-center gap-4">
        <Link href="/portal" className="text-[var(--ink-soft)] hover:text-[var(--ink)]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request Consultation</h1>
          <p className="mt-1 text-[var(--ink-soft)]">Schedule a time with our advisory team.</p>
        </div>
      </header>

      <div className="bg-blue-50 border border-blue-200 p-6 text-sm text-blue-900 rounded-sm mb-6">
        <p>
          Select a preferred date and time block. Our system integrates with Google Calendar and our team will 
          send you a final confirmation and meeting link based on availability.
        </p>
      </div>

      <AppointmentRequest />
    </div>
  );
}
