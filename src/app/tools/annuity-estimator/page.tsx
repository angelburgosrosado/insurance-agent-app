import { AnnuityEstimator } from "@/components/tools/AnnuityEstimator";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guaranteed Lifetime Annuity Income Estimator | AB Global Consulting",
  description: "Calculate your guaranteed lifetime monthly retirement paycheck and protect your 401(k) / IRA rollover from market volatility and longevity risk.",
};

export default function AnnuityEstimatorPage() {
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

      <AnnuityEstimator isStandalone={true} />

      <div className="max-w-5xl mx-auto mt-8 text-center text-xs text-slate-500 space-y-2">
        <p>
          *Annuity guarantees are backed solely by the financial strength and claims-paying ability of the issuing insurance carrier. Payout rates vary by age, contract riders, and deferral periods.
        </p>
        <p>© {new Date().getFullYear()} AB Global Consulting LLC • State Licensed 0215 Practitioner • Orlando, FL</p>
      </div>
    </main>
  );
}
