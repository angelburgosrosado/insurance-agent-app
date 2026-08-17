export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://abglco.com";

export const businessDetails = {
  name: "AB Global Consulting",
  legalName: "AB Global Consulting LLC",
  founder: "Angel Burgos",
  license: "Florida 0215 Life, Health & Variable Annuities #G328926",
  agentCode: "WFG Agent F6D9U",
  phone: "+1-386-333-1482",
  officePhone: "+1-407-930-6226",
  address: {
    streetAddress: "9501 Satellite Blvd, Suite 105",
    addressLocality: "Orlando",
    addressRegion: "FL",
    postalCode: "32837",
    addressCountry: "US"
  },
  geo: {
    latitude: 28.4312,
    longitude: -81.3965
  },
  serviceAreas: [
    "Florida",
    "Orlando",
    "Kissimmee",
    "Tampa",
    "Miami",
    "Jacksonville",
    "Puerto Rico"
  ],
  services: [
    "Life Insurance",
    "Indexed Universal Life (IUL)",
    "Variable Annuities",
    "Fixed Indexed Annuities",
    "Final Expense Insurance",
    "Everest Funeral Concierge Planning",
    "Medicare Supplements & Advantage",
    "Long-Term Care Planning (LTC)"
  ]
};

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["InsuranceAgency", "FinancialService", "LocalBusiness"],
    name: businessDetails.name,
    legalName: businessDetails.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/ab-global-logo.png`,
    image: `${SITE_URL}/images/financial-hero.jpg`,
    telephone: businessDetails.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: businessDetails.address.streetAddress,
      addressLocality: businessDetails.address.addressLocality,
      addressRegion: businessDetails.address.addressRegion,
      postalCode: businessDetails.address.postalCode,
      addressCountry: businessDetails.address.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessDetails.geo.latitude,
      longitude: businessDetails.geo.longitude
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "19:00"
      }
    ],
    areaServed: businessDetails.serviceAreas.map(loc => ({
      "@type": "Place",
      name: loc
    })),
    knowsLanguage: ["en", "es"],
    employee: {
      "@type": "Person",
      name: "Angel Burgos",
      jobTitle: "Founder & Licensed Financial Advisor",
      image: `${SITE_URL}/images/angel-burgos.png`,
      identifier: "FL License #G328926"
    }
  };
}

export function getWebApplicationSchema(toolName: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: toolName,
    description: description,
    url: `${SITE_URL}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    author: {
      "@type": "Organization",
      name: "AB Global Consulting"
    }
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
