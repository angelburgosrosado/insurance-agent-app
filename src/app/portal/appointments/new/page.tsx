"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";
import { AppointmentRequest } from "@/components/appointment-request";

export default function NewAppointmentPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <header className="border-b border-slate-200 pb-6 flex items-center gap-4">
        <Link href="/portal" className="text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            Schedule Diagnostic Consultation
          </h1>
          <p className="mt-1 text-xs md:text-sm text-slate-500">
            Select a live date & time directly with Angel Burgos via our interactive calendar.
          </p>
        </div>
      </header>

      {/* Live Calendly Scheduler */}
      <CalendarBookingModal />

      <div className="pt-8 border-t border-slate-200">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Or submit a manual schedule request below:
        </p>
        <AppointmentRequest />
      </div>
    </div>
  );
}
