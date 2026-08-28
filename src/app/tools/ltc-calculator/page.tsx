import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { LtcCalculator } from "@/components/tools/LtcCalculator";
import { FloatingMobileBar } from "@/components/FloatingMobileBar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";

export const metadata: Metadata = {
  title: "Nationwide CareMatters LTC Estimator | AB Global Consulting",
  description: "Calculate tax-free monthly cash benefits ($4,000–$12,000/mo) and couples shared benefit pool protection under Nationwide CareMatters Together.",
};

export default function LtcPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <LtcCalculator />
      </div>
      <FloatingMobileBar />
      <ComplianceDisclosure />
    </main>
  );
}
