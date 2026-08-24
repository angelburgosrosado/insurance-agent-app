import { MilitaryAssetShield } from "@/components/tools/MilitaryAssetShield";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Military & Veteran Asset Protection & Wealth Simulator | AB Global Consulting",
  description: "Evaluate SGLI to VGLI cost escalation, Survivor Benefit Plan (SBP) pension maximization, and TSP 0% floor tax-free wealth transition strategies for active duty and retired service members.",
};

export default function MilitaryAssetShieldPage() {
  return (
    <ToolPageLayout toolType="military">
      <MilitaryAssetShield isStandalone={true} />
    </ToolPageLayout>
  );
}
