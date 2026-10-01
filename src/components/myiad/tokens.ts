/**
 * MyIAD Brand Tokens and Core Specifications
 * Issue: ABGA-1 / ABGA-7
 * Domain: myiad.com
 */

export const MYIAD_TOKENS = {
  colors: {
    primaryNavy: "#0B1F3A", // Primary trust navy
    techBlue: "#2563EB",    // Technology blue
    growthTeal: "#14B8A6",  // Growth accent teal
    cleanBg: "#F8FAFC",     // Clean background
    contrastCharcoal: "#111827", // Text/contrast charcoal
    cardBorder: "#E2E8F0",
    mutedText: "#4B5563",
  },
  typography: {
    headline: "MyIAD - Intelligent Insurance Advisory & Protection",
    tagline: "Institutional Precision. Fiduciary Clarity. Modern Protection Architecture.",
  },
  licensing: {
    provider: "MyIAD National Insurance Solutions",
    service: "Dependable Nationwide Insurance Services",
    tollFree: "1-888-887-3585",
    phoneNumeric: "18888873585",
    territories: ["Licensed Across All 50 US States", "Nationwide Advisory Network"],
  },
} as const;

export interface CoreOffering {
  id: "life" | "health" | "annuity";
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  benefits: string[];
  ctaText: string;
  routeAnchor: string;
}

export const CORE_OFFERINGS: CoreOffering[] = [
  {
    id: "life",
    title: "Life Insurance & Wealth Accumulation",
    badge: "Asset Preservation",
    subtitle: "Term, Indexed Universal Life (IUL), Living Benefits & Estate Liquidity",
    description: "Architect permanent death benefit protection engineered with downside market immunity (0% floor) and tax-exempt accumulation under IRC Section 7702.",
    benefits: [
      "Institutional 0% floor downside protection with uncapped/participating S&P 500 index allocations",
      "Living Benefits riders for critical, chronic, and terminal illness protection with accelerated payout",
      "Executive bonus, key person insurance, and premium-financed estate liquidity planning",
      "Tax-free policy loans and distributions for private retirement income stream engineering",
    ],
    ctaText: "Explore Life Architecture",
    routeAnchor: "#lead-intake",
  },
  {
    id: "health",
    title: "Health Insurance & Medical Coverage",
    badge: "Comprehensive Care",
    subtitle: "Individual, Family, Group Health & Medicare Advisory",
    description: "Navigate private carrier networks, ACA subsidies, group health programs, and Medicare supplements with certified bilingual insurance specialists.",
    benefits: [
      "Individual & Family marketplace optimization with maximum advance premium tax credit (APTC) capture",
      "Group health architectures for SMBs, commercial teams, and independent contractor pools",
      "Medicare Advantage & Supplement (Medigap) plans matching preferred hospital and provider networks",
      "Supplemental health, hospital indemnity, and high-deductible cushion policies",
    ],
    ctaText: "Compare Health Options",
    routeAnchor: "#lead-intake",
  },
  {
    id: "annuity",
    title: "Variable Annuity & Guaranteed Retirement Income",
    badge: "FINRA Rule 2330 Supervised",
    subtitle: "Deferred Variable Annuities, Downside Buffers & Lifetime Withdrawal Benefits",
    description: "Deploy institutionally managed subaccounts with guaranteed lifetime withdrawal benefit (GLWB) riders designed to combat longevity and inflation risk.",
    benefits: [
      "Guaranteed lifetime income streams that you cannot outlive, regardless of market volatility",
      "Subaccount asset allocation across top-quartile institutional asset managers",
      "Tax-deferred compounding growth maximizing capital accumulation prior to annuitization",
      "Full supervisory suitability reviews conducted strictly in accordance with FINRA Rule 2330 protocols",
    ],
    ctaText: "Evaluate Annuity Suitability",
    routeAnchor: "#lead-intake",
  },
];

export interface AudienceSegmentModule {
  id: string;
  audience: string;
  badge: string;
  headline: string;
  description: string;
  bulletPoints: string[];
  actionLabel: string;
}

export const AUDIENCE_MODULES: AudienceSegmentModule[] = [
  {
    id: "producers",
    audience: "High-Performing Independent Producers",
    badge: "Producer Execution",
    headline: "Show prospects their 0% floor tax-free retirement with institutional math in 30 seconds.",
    description: "Eliminate spreadsheet friction. Leverage algorithmic illustration stress-testing, side-by-side IRC 7702 tax comparisons, and direct underwriting access across premier carriers.",
    bulletPoints: [
      "Algorithmic Monte Carlo stress-testing against market volatility",
      "Direct top-tier carrier contracts and accelerated underwriting lines",
      "Client-ready clinical comparative visual reports generated in real time",
    ],
    actionLabel: "Access Producer Toolkit",
  },
  {
    id: "principals",
    audience: "Agency Principals & IMO Leaders",
    badge: "Enterprise Infrastructure",
    headline: "Equip your entire brokerage with bilingual AI quoting, compliant disclosures, and instant CRM routing.",
    description: "Standardize supervisory compliance across multi-state agent pools. Deliver turnkey bilingual lead capture, automated FINRA 2330 documentation, and zero-leakage routing straight to your CRM pipeline.",
    bulletPoints: [
      "Direct lead ingestion hook into crm.myiad.net pipeline",
      "Automated territory matching (Central FL, South FL, Puerto Rico, National)",
      "Strict supervision audit trails satisfying FINRA Rule 2330 recordkeeping requirements",
    ],
    actionLabel: "Deploy Brokerage Gateway",
  },
  {
    id: "veterans",
    audience: "Veteran & Military-Focused Advisors",
    badge: "Military Asset Shield",
    headline: "The Veteran Asset Shield: How to lock in permanent pension protection before the rate cliff.",
    description: "Help military families and transitioning service members replace expiring SGLI/VGLI coverage, hedge against Survivor Benefit Plan (SBP) reduction cliffs, and preserve civilian wealth.",
    bulletPoints: [
      "Permanent cash-value alternatives before VGLI age-banded premium escalations strike",
      "SBP vs. Private Pension Maximization comparative mathematical audits",
      "Guaranteed insurability riders safeguarding military members post-separation",
    ],
    actionLabel: "Run Veteran Pension Audit",
  },
];

export const FINRA_2330_COMPLIANCE_DISCLOSURE = {
  ruleTitle: "FINRA Rule 2330 & SEC Regulation Best Interest Compliance Notice",
  supervisoryStandard: "Members and associated persons recommending the purchase or exchange of a deferred variable annuity must have a reasonable basis to believe that the transaction is suitable for the customer in light of the customer's financial situation, insurance needs, and investment objectives.",
  suitabilityDisclosures: [
    "Deferred variable annuities are long-term financial products intended primarily for retirement planning and wealth accumulation.",
    "Variable annuities are subject to investment risk, including the possible loss of principal. Investment returns and account values will fluctuate with market conditions.",
    "Early withdrawals prior to age 59½ may be subject to a 10% federal IRS tax penalty in addition to ordinary income tax.",
    "Surrender charges typically apply during early policy years (commonly 5 to 10 years) for withdrawals exceeding the contractual free-withdrawal allowance.",
    "Variable contracts carry underlying fund fees, mortality and expense (M&E) charges, administrative expenses, and optional rider fees (such as GLWB or enhanced death benefits).",
    "Guarantees are based solely on the financial strength and claims-paying ability of the issuing life insurance carrier and do not apply to the performance of underlying investment subaccounts.",
    "Variable annuities are NOT bank deposits, NOT insured by the FDIC or any government agency, and NOT guaranteed by any financial institution.",
  ],
  supervisoryChecklist: [
    "Documented customer investment objective, risk profile, and liquidity needs",
    "Comprehensive disclosure of surrender charge schedule and duration",
    "Written analysis of existing policy replacement costs, tax basis, and benefits foregone",
    "Independent principal supervisory review and written approval prior to application submission",
  ],
};
