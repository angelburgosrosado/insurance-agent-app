import { FuneralCostCalculator } from "@/components/tools/FuneralCostCalculator";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Everest Funeral Concierge Savings & Pre-Planning Calculator | AB Global Consulting",
  description: "Calculate mortuary cost savings through Everest Funeral Concierge independent price negotiation and explore guaranteed-issue final expense life insurance.",
};

export default function FuneralCostSavingsPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between text-xs text-slate-600">
        <Link href="/" className="font-bold text-slate-900 hover:text-secondary flex items-center gap-1.5">
          ← Back to AB Global Consulting
        </Link>
        <div className="flex items-center gap-3">
          <span>Advisor: <strong>Angel Burgos (0215 / G328926)</strong></span>
          <span>•</span>
          <a href="tel:3863331482" className="text-secondary font-bold hover:underline">(386) 333-1482</a>
        </div>
      </div>

      <FuneralCostCalculator isStandalone={true} />

      <div className="max-w-5xl mx-auto mt-8 text-center text-xs text-slate-500 space-y-2">
        <p>
          *Everest Funeral Concierge services are provided in partnership with WSG (World Settlement Group). Everest is an independent consumer advocate and does not own or operate funeral homes.
        </p>
        <p>© {new Date().getFullYear()} AB Global Consulting LLC • State Licensed 0215 Practitioner • Orlando, FL</p>
      </div>
    </main>
  );
}
