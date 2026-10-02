import type { Metadata } from "next";
import { MyIADNavbar } from "@/components/myiad/MyIADNavbar";
import { MyIADHero } from "@/components/myiad/MyIADHero";
import { MyIADAiHub } from "@/components/myiad/MyIADAiHub";
import { MyIADAiAssessment } from "@/components/myiad/MyIADAiAssessment";
import { MyIADOfferings } from "@/components/myiad/MyIADOfferings";
import { MyIADBusinessDesign } from "@/components/myiad/MyIADBusinessDesign";
import { MyIADProducerModules } from "@/components/myiad/MyIADProducerModules";
import { MyIADLeadForm } from "@/components/myiad/MyIADLeadForm";
import { MyIADTrustAndCompliance } from "@/components/myiad/MyIADTrustAndCompliance";
import { MyIADFooter } from "@/components/myiad/MyIADFooter";
import { MyIADCopilot } from "@/components/myiad/MyIADCopilot";
import { MyIADVoiceModal } from "@/components/myiad/MyIADVoiceModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://myiad.com"),
  title: "MyIAD - Intelligent Insurance Advisory & Protection | AI Voice Agent & Needs Assessment",
  description:
    "MyIAD delivers precision financial protection: conversational Deepgram AI voice diagnostics, FINRA Rule 2330 advisory copilot, responsive AI insurance need assessment, 0% floor Indexed Universal Life (IUL), comprehensive Health & Medicare solutions, and FINRA Rule 2330 compliant variable annuities.",
  applicationName: "MyIAD",
  authors: [{ name: "MyIAD National Insurance Solutions", url: "https://myiad.com" }],
  creator: "MyIAD National Insurance Solutions",
  keywords: [
    "MyIAD",
    "Deepgram voice AI",
    "conversational insurance voice agent",
    "AI insurance copilot",
    "AI insurance assessment",
    "intelligent insurance advisory",
    "insurance need calculator",
    "life insurance",
    "indexed universal life",
    "IUL",
    "health insurance",
    "medicare advantage",
    "variable annuities",
    "FINRA Rule 2330",
    "guaranteed lifetime withdrawal benefit",
    "veteran asset shield",
    "agency distribution engine",
  ],
  openGraph: {
    type: "website",
    siteName: "MyIAD",
    title: "MyIAD - Intelligent Insurance Advisory & Protection",
    description:
      "Interactive AI insurance need assessment, institutional wealth preservation, and modern agency distribution design.",
    url: "https://myiad.com",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MyIADLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": "https://myiad.com/#organization",
        name: "MyIAD - Intelligent Insurance Advisory & Protection",
        alternateName: "MyIAD",
        description:
          "Dependable nationwide insurance advisory firm specializing in AI Insurance Need Assessment, Life Insurance (IUL, Term, Living Benefits), Health Insurance, and FINRA Rule 2330 Variable Annuities across all 50 US states.",
        url: "https://myiad.com",
        telephone: "+1-888-887-3585",
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
        },
        areaServed: ["All 50 US States", "Puerto Rico", "United States"],
        sameAs: [
          "https://abglco.com",
          "https://myiad.net",
          "https://calendly.com/abglobalconsulting/15-min-consultation-abglobalceo",
        ],
        knowsAbout: [
          "Indexed Universal Life (IUL)",
          "0% Downside Market Floor Protection",
          "Internal Revenue Code §7702",
          "FINRA Rule 2330 Suitability Protocol",
          "Guaranteed Lifetime Withdrawal Benefits (GLWB)",
          "Medicare Advantage & Supplemental Advisory",
          "Accelerated Living Benefits for Critical Illness",
          "Veteran Asset Shield",
        ],
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#ai-suite h2", "#ai-suite p"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Insurance & Advisory Solutions",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Interactive AI Insurance Need Assessment & Gap Analysis",
                url: "https://myiad.com/#ai-assessment",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Indexed Universal Life & Permanent Life Protection (0% Floor)",
                url: "https://myiad.com/#offerings",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Comprehensive Health & Medicare Advisory",
                url: "https://myiad.com/#offerings",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "FINRA Rule 2330 Variable Annuities & Guaranteed Lifetime Income",
                url: "https://myiad.com/#compliance",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://myiad.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does the 0% floor protect an Indexed Universal Life (IUL) policy during a market crash?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An IUL contract features a guaranteed 0% downside floor. When equity market indices drop (such as in 2008 or 2020), your policy crediting rate is guaranteed never to drop below 0.00%. Previous cash value and credited gains remain locked in, eliminating portfolio loss.",
            },
          },
          {
            "@type": "Question",
            name: "How do tax-free policy loans work under IRC §7702?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Internal Revenue Code §7702 and §72(e), cash value accumulated within a properly funded life insurance policy can be accessed through policy loans without triggering federal income tax, capital gains tax, or IRS early withdrawal penalties.",
            },
          },
          {
            "@type": "Question",
            name: "What suitability standards apply to variable annuities under FINRA Rule 2330?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "FINRA Rule 2330 requires rigorous supervisory evaluation to ensure a deferred variable annuity is suitable based on the client's liquidity needs, investment objectives, age, tax status, and surrender charge horizon before recommending an exchange or purchase.",
            },
          },
          {
            "@type": "Question",
            name: "Does MyIAD provide bilingual insurance advisory across all US states?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. MyIAD provides licensed, independent brokerage and AI-guided case design across all 50 US States and Puerto Rico in both English and Spanish.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Navigation */}
      <MyIADNavbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <MyIADHero />

        {/* The MyIAD AI Intelligence Suite: Deepgram Voice, Copilot & Predictive Assessment */}
        <MyIADAiHub />

        {/* Interactive AI Insurance Need Assessment Wizard (Web & Mobile) */}
        <MyIADAiAssessment />

        {/* Three Core Offerings Architecture */}
        <MyIADOfferings />

        {/* The MyIAD Business Design: Agency Distribution Engine */}
        <MyIADBusinessDesign />

        {/* Producer & Audience Modules */}
        <MyIADProducerModules />

        {/* Streamlined Quote & Consultation Lead Routing Form */}
        <MyIADLeadForm />

        {/* FINRA Rule 2330 Compliance Protocol & Trust Signals */}
        <MyIADTrustAndCompliance />
      </main>

      {/* Site Footer & Mandatory Disclosures */}
      <MyIADFooter />

      {/* Floating Interactive AI Advisory Copilot */}
      <MyIADCopilot />

      {/* Real-Time Deepgram Voice Agent Consultation Modal */}
      <MyIADVoiceModal />
    </div>
  );
}
