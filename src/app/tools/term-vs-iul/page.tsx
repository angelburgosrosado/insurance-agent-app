import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { TermVsIulSimulator } from "@/components/tools/TermVsIulSimulator";
import { FloatingMobileBar } from "@/components/FloatingMobileBar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";

export const metadata: Metadata = {
  title: "Buy Term vs. IUL Head-to-Head Simulator | AB Global Consulting",
  description: "Model how the 0% downside floor and IRS Section 7702 tax-free policy loans outperform taxable stock portfolios during market crashes.",
};

export default function TermVsIulPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <TermVsIulSimulator />
      </div>
      <FloatingMobileBar />
      <ComplianceDisclosure />
    </main>
  );
}
