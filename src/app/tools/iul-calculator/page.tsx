import { IulCalculator } from "@/components/tools/IulCalculator";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive IUL Growth & Tax-Free Retirement Simulator | AB Global Consulting",
  description: "Simulate your Indexed Universal Life (IUL) cash accumulation, guaranteed 0% downside market protection, and projected tax-free retirement income stream.",
};

export default function IulCalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Branding */}
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

      <IulCalculator isStandalone={true} />

      {/* Trust & Compliance Footer */}
      <div className="max-w-5xl mx-auto mt-8 text-center text-xs text-slate-500 space-y-2">
        <p>
          *Illustrations are hypothetical models based on assumed index performance cap rates and IRS Section 7702 guidelines. Actual policy performance varies based on carrier underwriting, cap rates, and policy loans. For personalized legal and financial illustrations, request a formal carrier quote.
        </p>
        <p>© {new Date().getFullYear()} AB Global Consulting LLC • State Licensed 0215 Practitioner • Orlando, FL</p>
      </div>
    </main>
  );
}
