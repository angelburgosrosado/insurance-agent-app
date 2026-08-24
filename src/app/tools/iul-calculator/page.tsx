import { IulCalculator } from "@/components/tools/IulCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive IUL Growth & Tax-Free Retirement Simulator | AB Global Consulting",
  description: "Simulate your Indexed Universal Life (IUL) cash accumulation, guaranteed 0% downside market protection, and projected tax-free retirement income stream.",
};

export default function IulCalculatorPage() {
  return (
    <ToolPageLayout toolType="iul">
      <IulCalculator isStandalone={true} />
    </ToolPageLayout>
  );
}

