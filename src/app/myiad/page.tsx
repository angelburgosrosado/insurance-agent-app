import type { Metadata } from "next";
import { MyIADNavbar } from "@/components/myiad/MyIADNavbar";
import { MyIADHero } from "@/components/myiad/MyIADHero";
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
  title: "MyIAD - Intelligent Insurance Advisory & Protection | AI Needs Assessment",
  description:
    "MyIAD delivers precision financial protection: responsive AI insurance need assessment, 0% floor Indexed Universal Life (IUL), comprehensive Health & Medicare solutions, and FINRA Rule 2330 compliant variable annuities.",
  applicationName: "MyIAD",
  authors: [{ name: "MyIAD National Insurance Solutions", url: "https://myiad.com" }],
  creator: "MyIAD National Insurance Solutions",
  keywords: [
    "MyIAD",
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
    "@type": "FinancialService",
    name: "MyIAD - Intelligent Insurance Advisory & Protection",
    description:
      "Dependable nationwide insurance advisory firm specializing in AI Insurance Need Assessment, Life Insurance (IUL, Term, Living Benefits), Health Insurance, and FINRA Rule 2330 Variable Annuities across all 50 US states.",
    url: "https://myiad.com",
    telephone: "+1-888-887-3585",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    areaServed: ["All 50 US States", "Puerto Rico", "United States"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Insurance & Advisory Solutions",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interactive AI Insurance Need Assessment & Gap Analysis",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Indexed Universal Life & Permanent Life Protection (0% Floor)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Comprehensive Health & Medicare Advisory",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "FINRA Rule 2330 Variable Annuities & Guaranteed Lifetime Income",
          },
        },
      ],
    },
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
