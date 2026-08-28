import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { DimeCalculator } from "@/components/tools/DimeCalculator";
import { FloatingMobileBar } from "@/components/FloatingMobileBar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";

export const metadata: Metadata = {
  title: "D.I.M.E. Life Insurance Needs Calculator | AB Global Consulting",
  description: "Calculate your family's exact life insurance coverage needs using the scientific D.I.M.E. methodology: Debt, Income replacement, Mortgage, and Education.",
};

export default function LifeNeedsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <DimeCalculator />
      </div>
      <FloatingMobileBar />
      <ComplianceDisclosure />
    </main>
  );
}
