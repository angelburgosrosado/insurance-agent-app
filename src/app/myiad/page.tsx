import type { Metadata } from "next";
import { MyIADNavbar } from "@/components/myiad/MyIADNavbar";
import { MyIADHero } from "@/components/myiad/MyIADHero";
import { MyIADOfferings } from "@/components/myiad/MyIADOfferings";
import { MyIADProducerModules } from "@/components/myiad/MyIADProducerModules";
import { MyIADLeadForm } from "@/components/myiad/MyIADLeadForm";
import { MyIADTrustAndCompliance } from "@/components/myiad/MyIADTrustAndCompliance";
import { MyIADFooter } from "@/components/myiad/MyIADFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://myiad.com"),
  title: "MyIAD - Intelligent Insurance Advisory & Protection | Life, Health & Variable Annuities",
  description:
    "MyIAD delivers precision financial protection: 0% floor Indexed Universal Life (IUL), comprehensive Health & Medicare solutions, and FINRA Rule 2330 compliant variable annuities.",
  applicationName: "MyIAD",
  authors: [{ name: "Angel Burgos", url: "https://myiad.com" }],
  creator: "MyIAD & AB Global Consulting LLC",
  keywords: [
    "MyIAD",
    "intelligent insurance advisory",
    "life insurance",
    "indexed universal life",
    "IUL",
    "health insurance",
    "medicare advantage",
    "variable annuities",
    "FINRA Rule 2330",
    "guaranteed lifetime withdrawal benefit",
    "veteran asset shield",
    "Florida insurance broker",
    "Puerto Rico insurance broker",
  ],
  openGraph: {
    type: "website",
    siteName: "MyIAD",
    title: "MyIAD - Intelligent Insurance Advisory & Protection",
    description:
      "Institutional life insurance, comprehensive health coverage, and FINRA-supervised variable annuity solutions with licensed advisor consultation.",
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
      "Licensed insurance advisory and wealth preservation firm specializing in Life Insurance (IUL, Term), Health Insurance, and FINRA Rule 2330 Variable Annuity solutions.",
    url: "https://myiad.com",
    telephone: "+1-386-333-1482",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orlando",
      addressRegion: "FL",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: "Angel Burgos",
      jobTitle: "Principal Advisor & Broker (0215)",
    },
    areaServed: ["Florida", "Puerto Rico", "United States"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Insurance & Advisory Solutions",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Indexed Universal Life & Permanent Life Protection",
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

      {/* Hero Section */}
      <main className="flex-1">
        <MyIADHero />

        {/* Three Core Offerings Architecture */}
        <MyIADOfferings />

        {/* Producer & Audience Modules (ABGA-3) */}
        <MyIADProducerModules />

        {/* Streamlined Quote & Consultation Lead Routing Form (ABGA-5) */}
        <MyIADLeadForm />

        {/* FINRA Rule 2330 Compliance Protocol & Trust Signals (ABGA-4) */}
        <MyIADTrustAndCompliance />
      </main>

      {/* Site Footer & Mandatory Disclosures */}
      <MyIADFooter />
    </div>
  );
}
