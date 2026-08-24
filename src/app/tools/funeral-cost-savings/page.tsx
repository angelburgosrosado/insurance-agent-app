import { FuneralCostCalculator } from "@/components/tools/FuneralCostCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Everest Funeral Concierge Savings & Pre-Planning Calculator | AB Global Consulting",
  description: "Calculate mortuary cost savings through Everest Funeral Concierge independent price negotiation and explore guaranteed-issue final expense life insurance.",
};

export default function FuneralCostSavingsPage() {
  return (
    <ToolPageLayout toolType="funeral">
      <FuneralCostCalculator isStandalone={true} />
    </ToolPageLayout>
  );
}

