export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const businessDetails = {
  name: "AB Global Consulting",
  phone: "+1 386 333 1482",
  serviceAreas: [
    "Florida",
    "Virginia",
    "Massachusetts",
    "North Carolina",
    "South Carolina",
    "Georgia",
    "Puerto Rico"
  ]
};

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: businessDetails.name,
    url: SITE_URL,
    telephone: businessDetails.phone,
    areaServed: businessDetails.serviceAreas.map(state => ({
      "@type": "State",
      name: state
    })),
    // Expand with logo and social links once available
  };
}

export function getBreadcrumbSchema(items: { name: string, item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.item}`
    }))
  };
}

export function getFAQSchema(faqs: { question: string, answer: string }[]) {
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
