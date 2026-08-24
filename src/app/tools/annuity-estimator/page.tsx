import { AnnuityEstimator } from "@/components/tools/AnnuityEstimator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guaranteed Lifetime Annuity Income Estimator | AB Global Consulting",
  description: "Calculate your guaranteed lifetime monthly retirement paycheck and protect your 401(k) / IRA rollover from market volatility and longevity risk.",
};

export default function AnnuityEstimatorPage() {
  return (
    <ToolPageLayout toolType="annuity">
      <AnnuityEstimator isStandalone={true} />
    </ToolPageLayout>
  );
}

