export type ServiceInfo = {
  slug: string;
  title: string;
  category: "Insurance" | "Retirement" | "Health" | "Concierge";
  shortDescription: string;
  tagline: string;
  heroImage?: string;
  featuredCarriers: { name: string; highlight: string; link?: string }[];
  keyBenefits: string[];
  detailedSections: {
    heading: string;
    content: string;
    subPoints?: string[];
  }[];
  externalTools?: {
    name: string;
    description: string;
    url: string;
    isExternal: boolean;
  }[];
  faqs: { question: string; answer: string }[];
};

export const services: ServiceInfo[] = [
  {
    slug: "life-insurance",
    title: "Life Insurance & Indexed Universal Life (IUL)",
    category: "Insurance",
    tagline: "Tax-Advantaged Wealth Preservation & Income Protection",
    shortDescription: "Protecting families and business continuity with Term, Permanent Whole Life, and Indexed Universal Life (IUL) featuring downside market protection and living benefits.",
    featuredCarriers: [
      { name: "Nationwide", highlight: "Nationwide Heritage® & Effortless Life", link: "https://www.nationwide.com/personal/insurance/life/" },
      { name: "Transamerica", highlight: "Trendsetter® & Financial Foundation IUL", link: "https://www.transamerica.com/individual/products/life-insurance" },
      { name: "Pacific Life", highlight: "Pacific Indexed Accumulator & Horizon", link: "https://www.pacificlife.com/home/individuals-families/life-insurance.html" },
      { name: "Corebridge Financial", highlight: "QoL Flex Term with Accelerated Living Benefits" }
    ],
    keyBenefits: [
      "Tax-Free Death Benefit transfer directly to named beneficiaries without probate delays.",
      "Living Benefits riders covering Chronic, Critical, and Terminal illnesses without extra cost.",
      "Indexed Universal Life (IUL) cash value growth linked to market indices with a guaranteed 0% floor against market loss.",
      "Tax-free policy loans and withdrawals for supplemental retirement income or college funding.",
      "Business solutions including Key Person Insurance and Buy-Sell Agreement funding."
    ],
    detailedSections: [
      {
        heading: "Indexed Universal Life (IUL) vs. Traditional Term",
        content: "While term insurance provides affordable temporary protection, Indexed Universal Life (IUL) combines permanent life insurance with flexible cash value accumulation. Your money participates in market index upside (like the S&P 500) up to an annual cap, but is shielded with a guaranteed 0% annual minimum floor when markets decline.",
        subPoints: [
          "Zero Downside Market Risk: Your principal and previously locked-in gains are never lost due to market corrections.",
          "Tax-Favored Accumulation: Cash value grows tax-deferred under IRS Section 7702.",
          "Flexible Premium Payments: Adjust funding amounts as your personal or business cash flow evolves."
        ]
      },
      {
        heading: "Accelerated Living Benefits",
        content: "Modern life insurance isn't just about what you leave behind—it's about what you can access while you are alive. Through our premier carrier network (Nationwide, Transamerica, Corebridge), policies include living benefit riders that allow you to advance up to 100% of the death benefit if diagnosed with a qualifying illness (cancer, heart attack, stroke, Alzheimer's, or loss of ADLs)."
      }
    ],
    externalTools: [
      {
        name: "Indexed Universal Life (IUL) Guide",
        description: "Official WFG guide covering IUL interest caps, floor rates, and tax advantages.",
        url: "https://agents.worldfinancialgroup.com/Angel-Burgos-F6D9U",
        isExternal: true
      },
      {
        name: "Personalized Quote Request",
        description: "Request an illustration tailored to your age, health status, and legacy goals.",
        url: "/#consultation",
        isExternal: false
      }
    ],
    faqs: [
      {
        question: "How does the 0% floor in an Indexed Universal Life (IUL) policy work?",
        answer: "When you allocate cash value to an index strategy (such as the S&P 500), your returns are calculated based on index performance over a 1-year segment. If the index increases, you receive interest credited up to a predetermined cap (typically 8%-11%). If the index finishes negative, your credited return is 0%, meaning market losses do not reduce your accumulated cash value."
      },
      {
        question: "What medical underwriting is required for Effortless Life or Simplified Issue?",
        answer: "Simplified issue programs like Nationwide Effortless Life utilize automated digital underwriting (prescription history, MIB database, motor vehicle records) allowing qualifying applicants to secure coverage in minutes without needle sticks or medical exams."
      },
      {
        question: "Can I convert my Term policy into Permanent insurance later?",
        answer: "Yes, our tier-1 carriers offer contractual conversion privileges, enabling you to convert term policies into permanent Indexed Universal Life or Whole Life without re-taking medical exams, regardless of changes in your health."
      }
    ]
  },
  {
    slug: "variable-annuities",
    title: "Variable & Indexed Annuities",
    category: "Retirement",
    tagline: "Guaranteed Lifetime Income & Market Growth Participation",
    shortDescription: "Structured retirement solutions engineered to eliminate longevity risk, protect your principal from market downturns, and guarantee income you cannot outlive.",
    featuredCarriers: [
      { name: "Pacific Life", highlight: "Pacific Choice & Pacific Index Edge Annuities", link: "https://www.pacificlife.com/home/individuals-families/annuities.html" },
      { name: "Nationwide", highlight: "Nationwide Peak® & Destination Variable Annuities", link: "https://www.nationwide.com/personal/investing/annuities/" },
      { name: "Transamerica", highlight: "Transamerica Principal Optimizer & Income Edge" },
      { name: "Athene / Corebridge", highlight: "Fixed Indexed Accumulation & High-Bonus FIA Solutions" }
    ],
    keyBenefits: [
      "Guaranteed Lifetime Withdrawal Benefits (GLWB) that pay reliable monthly or annual income for life.",
      "Tax-deferred growth for non-qualified investments and seamless IRA / 401(k) rollovers.",
      "Fixed Indexed Annuities (FIA) offering 100% principal protection with index participation.",
      "Built-in death benefits guaranteeing that your remaining account value passes directly to heirs.",
      "Inflation protection riders designed to step up your income baseline over time."
    ],
    detailedSections: [
      {
        heading: "Solving the 3 Great Risks of Retirement",
        content: "Modern retirees face three compounding threats: Longevity Risk (outliving their savings), Sequence of Returns Risk (retiring during a market downswing), and Healthcare Inflation. Annuities are the only financial contracts created specifically to transform accumulated assets into private pensions with contractually guaranteed paychecks.",
        subPoints: [
          "Sequence of Returns Buffer: Create a guaranteed income stream so you never have to sell equities at a loss during bear markets.",
          "Lifetime Income Riders: Income continues uninterrupted even if the underlying investment cash balance reaches zero."
        ]
      },
      {
        heading: "401(k), 403(b), and Traditional IRA Rollovers",
        content: "When leaving an employer or approaching age 59½, transferring retirement funds into a fixed indexed or variable annuity can lock in lifetime income while avoiding early withdrawal penalties and maintaining tax deferral."
      }
    ],
    externalTools: [
      {
        name: "Retirement Income Assessment",
        description: "Calculate your projected income gap and evaluate annuity payout rates.",
        url: "/#consultation",
        isExternal: false
      },
      {
        name: "WFG Financial Platform Overview",
        description: "Explore our institutional carrier network and independent product spectrum.",
        url: "https://agents.worldfinancialgroup.com/Angel-Burgos-F6D9U",
        isExternal: true
      }
    ],
    faqs: [
      {
        question: "What is the difference between a Fixed Indexed Annuity (FIA) and a Variable Annuity?",
        answer: "A Fixed Indexed Annuity links interest credits to an index without direct market investment, guaranteeing zero loss of principal. A Variable Annuity invests directly in sub-accounts (mutual funds), offering higher potential returns and market upside along with optional guaranteed income riders."
      },
      {
        question: "Will I lose control of my principal if I buy an annuity?",
        answer: "No. Modern deferred annuities with Guaranteed Lifetime Withdrawal Benefit (GLWB) riders allow you to withdraw lifetime income while retaining access to your remaining contract account value for emergencies or legacy transfer."
      },
      {
        question: "How do annuity rollovers work from a previous 401(k)?",
        answer: "We execute direct custodian-to-custodian transfers, ensuring zero taxable events, no withholding penalties, and uninterrupted tax-deferred status."
      }
    ]
  },
  {
    slug: "final-expense",
    title: "Final Expense & Funeral Concierge Services",
    category: "Concierge",
    tagline: "Complete End-of-Life Peace of Mind with Everest & WSG Concierge",
    shortDescription: "Shielding your loved ones from sudden end-of-life expenses with guaranteed-issue life coverage combined with 24/7 Everest Funeral Concierge Planning.",
    featuredCarriers: [
      { name: "Everest Funeral Concierge", highlight: "24/7 Concierge Planning & Price Negotiation Assistance", link: "https://www.everestfuneral.com/" },
      { name: "WSG / World Settlement Group", highlight: "Comprehensive Funeral Planning & Legacy Services" },
      { name: "Mutual of Omaha", highlight: "Living Promise Whole Life Final Expense" },
      { name: "Transamerica", highlight: "Immediate Solution Final Expense Whole Life" }
    ],
    keyBenefits: [
      "Everest Funeral Concierge 24/7 Advisory: Professional funeral advisors who negotiate costs on your family's behalf, saving an average of thousands of dollars.",
      "Expedited Payout: Claims processed and funded directly within 24 to 48 hours to meet immediate mortuary and cemetery demands.",
      "Guaranteed Issue & Simplified Acceptance: No medical exams, blood tests, or invasive health screenings.",
      "Fixed Lifetime Premiums: Rates never increase with age, and coverage never expires as long as premiums are paid.",
      "Online Will & Estate Planning Prep tools included for policyholders."
    ],
    detailedSections: [
      {
        heading: "Beyond Just Insurance: The Everest & WSG Concierge Advantage",
        content: "The loss of a loved one is emotionally overwhelming. When family members are grieving, they often face dozens of urgent decisions and inflated mortuary costs. Through our partnership with WSG and Everest Funeral Concierge, your family receives a dedicated, licensed funeral advisor who handles everything.",
        subPoints: [
          "24/7 Worldwide Support: Dedicated advisors step in immediately upon passing to assist your family.",
          "Funeral Price Comparison & Negotiation: Advisors compare prices across local funeral homes and negotiate fair rates, ensuring family members are not pressured into unnecessary expenses.",
          "Express Payouts: Insurance funds are released in 24-48 hours directly for funeral expenses, bypassing months of probate."
        ]
      },
      {
        heading: "Who Benefits Most From Final Expense Coverage?",
        content: "Final expense policies are specially designed for adults aged 50-85 who want to ensure their burial, cremation, medical bills, and memorial costs do not become a financial emergency for their children or spouse."
      }
    ],
    externalTools: [
      {
        name: "Everest Concierge Overview",
        description: "Learn how the Everest Funeral Concierge program assists families during critical moments.",
        url: "https://www.everestfuneral.com/",
        isExternal: true
      },
      {
        name: "Schedule a Funeral Pre-Planning Consultation",
        description: "Speak with Angel Burgos about pre-planning and final expense structures.",
        url: "/#consultation",
        isExternal: false
      }
    ],
    faqs: [
      {
        question: "How does Everest Funeral Concierge help my family negotiate prices?",
        answer: "Everest is an independent consumer advocate that is not owned by any funeral home chain. When a death occurs, Everest advisors compare itemized General Price Lists (GPL) of mortuaries in your area, negotiate transparent package pricing, and present clear options to your family."
      },
      {
        question: "Can I get approved if I have pre-existing health conditions?",
        answer: "Yes. Final expense whole life plans feature simplified issue underwriting with basic medical questions, and guaranteed-issue options are available for those with serious health conditions."
      },
      {
        question: "How quickly do final expense claims pay out?",
        answer: "While standard life insurance claims can take 30-60 days to clear paperwork, Everest-assisted final expense payouts are expedited to deliver funds within 24 to 48 hours to cover immediate expenses."
      }
    ]
  },
  {
    slug: "health-insurance",
    title: "Health Insurance & Medicare Solutions",
    category: "Health",
    tagline: "Customized Medical Protection for Families, Self-Employed & Seniors",
    shortDescription: "Expert navigation across ACA Marketplace plans, Private Underwritten Health Coverage, Medicare Advantage (Part C), and Medicare Supplement (Medigap) plans.",
    featuredCarriers: [
      { name: "Florida Blue / Blue Cross Blue Shield", highlight: "Extensive Florida Network & Medicare Advantage" },
      { name: "UnitedHealthcare / AARP", highlight: "Nationwide PPO Networks & Medicare Supplements" },
      { name: "Humana", highlight: "Comprehensive Part C Medicare Advantage & Rx Plans" },
      { name: "Ambetter / Oscar Health", highlight: "ACA Affordable Care Act Marketplace with Subsidies" }
    ],
    keyBenefits: [
      "Access to Top Florida & Nationwide PPO/HMO Doctor and Hospital Networks.",
      "ACA Marketplace subsidy optimization to minimize monthly premiums based on household income.",
      "Private health plans for independent contractors, small business owners, and 1099 professionals.",
      "Medicare Advantage & Supplement (Medigap) side-by-side comparison to eliminate out-of-pocket gaps.",
      "Prescription Drug (Part D) formulary review to ensure all vital medications are covered at lowest tier cost."
    ],
    detailedSections: [
      {
        heading: "Medicare Guidance: Advantage vs. Supplement (Medigap)",
        content: "Turning 65 or qualifying for Medicare involves choosing between Medicare Advantage (Part C) all-in-one plans and Original Medicare with a Medigap Supplement (such as Plan G or Plan N) plus Part D prescription coverage. We evaluate your doctors, prescriptions, and travel habits to pinpoint the exact plan that keeps your costs low and access broad.",
        subPoints: [
          "Medigap Plan G/N: See any doctor nationwide who accepts Medicare with zero network restrictions.",
          "Medicare Advantage: Low-to-$0 premium options with included dental, vision, hearing, and OTC allowances."
        ]
      },
      {
        heading: "Individual & Self-Employed Health Insurance",
        content: "If you are self-employed, an independent agent, or not covered by an employer plan, navigating healthcare exchanges can be daunting. We audit whether you qualify for Advance Premium Tax Credits (APTC) or private PPO coverage tailored to your budget."
      }
    ],
    externalTools: [
      {
        name: "Health & Medicare Consultation",
        description: "Schedule a 1-on-1 review of your doctors, prescriptions, and health budget.",
        url: "/#consultation",
        isExternal: false
      }
    ],
    faqs: [
      {
        question: "When is my Initial Enrollment Period (IEP) for Medicare?",
        answer: "Your Initial Enrollment Period is a 7-month window that begins 3 months before the month you turn 65, includes your birth month, and ends 3 months after your birth month. Enrolling on time avoids lifelong Part B and Part D late-enrollment penalties."
      },
      {
        question: "Do I qualify for ACA premium tax credits (subsidies)?",
        answer: "Subsidies are calculated based on your estimated modified adjusted gross income (MAGI) and household size relative to the Federal Poverty Level. We help calculate your exact eligibility during consultation."
      },
      {
        question: "Can I keep my current primary care physician?",
        answer: "Yes, we cross-reference your doctors and specialist network with carrier directories before recommending any health or Medicare plan."
      }
    ]
  },
  {
    slug: "long-term-care",
    title: "Long-Term Care (LTC) Planning",
    category: "Insurance",
    tagline: "Asset-Based & Hybrid LTC Solutions to Protect Family Estates",
    shortDescription: "Modern hybrid life and LTC policies with Cash-Indemnity benefits (Nationwide CareMatters®) ensuring your assets are shielded from escalating assisted living and nursing care costs.",
    featuredCarriers: [
      { name: "Nationwide", highlight: "Nationwide CareMatters Together® (Cash-Indemnity)", link: "https://www.nationwide.com/personal/insurance/long-term-care/" },
      { name: "Mutual of Omaha", highlight: "MutualCare Custom & Secure Solutions" },
      { name: "Securian Financial", highlight: "SecureCare Universal Life with LTC Benefits" },
      { name: "Transamerica", highlight: "TransCity / Life with Long-Term Care Riders" }
    ],
    keyBenefits: [
      "Cash-Indemnity Payout Model: Receive 100% of your monthly LTC benefit in cash with zero receipt submission or restrictions on who provides care (including family members).",
      "Couples Benefit Sharing: Nationwide CareMatters Together allows spouses to share a joint pool of LTC benefits.",
      "Asset-Based Guarantee: If care is never needed, 100% of your initial premium passes as a tax-free death benefit to your beneficiaries.",
      "Protection from Nursing Home & Assisted Living Inflation.",
      "Tax Deductibility options for business owners and individuals."
    ],
    detailedSections: [
      {
        heading: "The Breakdown: Cash-Indemnity vs. Reimbursement LTC",
        content: "Traditional LTC policies operate on a 'reimbursement' model: you must pay out of pocket first, submit itemized receipts every month, and only receive payments for state-licensed third-party facilities. In contrast, Nationwide CareMatters provides 100% Cash-Indemnity: you receive monthly cash payments directly, allowing you to pay informal caregivers, family members, or stay comfortably in your own home with no receipt audits.",
        subPoints: [
          "Freedom of Care: Pay a spouse, adult child, or trusted friend to care for you at home.",
          "Guaranteed Premium: Rates on asset-based hybrid LTC policies are locked and can never increase."
        ]
      }
    ],
    externalTools: [
      {
        name: "Nationwide CareMatters Comparison",
        description: "Review cash-indemnity vs reimbursement structures.",
        url: "https://www.nationwide.com/personal/insurance/long-term-care/",
        isExternal: true
      },
      {
        name: "LTC Asset Protection Consultation",
        description: "Schedule a personalized asset protection analysis with Angel Burgos.",
        url: "/#consultation",
        isExternal: false
      }
    ],
    faqs: [
      {
        question: "What triggers long-term care benefits?",
        answer: "Benefits are triggered when a licensed healthcare practitioner certifies that you cannot perform at least 2 of the 6 Activities of Daily Living (ADLs: bathing, dressing, eating, transferring, toileting, continence) for at least 90 days, or if you suffer from severe cognitive impairment (such as Alzheimer's or dementia)."
      },
      {
        question: "What happens to the money if I never need long-term care?",
        answer: "Unlike traditional 'use-it-or-lose-it' LTC insurance, asset-based hybrid policies guarantee that if you never need care, a full tax-free life insurance death benefit is paid out to your heirs."
      }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceInfo | undefined {
  return services.find(s => s.slug === slug);
}

