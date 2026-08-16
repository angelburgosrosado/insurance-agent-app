export type ServiceInfo = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  faqs: { question: string; answer: string }[];
};

// Based on AB Global Consulting scope
export const services: ServiceInfo[] = [
  {
    slug: "marketing-strategy",
    title: "Marketing Strategy",
    shortDescription: "Data-driven marketing strategies tailored for growth.",
    description: "Our marketing strategy services focus on identifying your ideal audience and building campaigns that convert. We leverage data and proven methodologies to optimize your marketing spend and increase ROI.",
    faqs: [
      { question: "How do you measure success?", answer: "We define clear KPIs before launching any campaign, tracking metrics like cost per acquisition, conversion rate, and overall ROI." },
      { question: "Do you offer full-service marketing?", answer: "Yes, we can handle everything from strategy development to campaign execution and analytics." }
    ]
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    shortDescription: "High-quality lead generation systems for your business.",
    description: "We build automated lead generation pipelines that capture, qualify, and route prospects directly to your sales team. Focus on closing deals while we keep your pipeline full.",
    faqs: [
      { question: "What channels do you use?", answer: "We utilize a mix of inbound marketing, paid advertising, and targeted outreach depending on your specific industry and goals." },
      { question: "Are the leads exclusive?", answer: "Yes, all leads generated through our systems are exclusive to your business." }
    ]
  },
  {
    slug: "business-consulting",
    title: "Business Consulting",
    shortDescription: "Strategic consulting to scale your operations efficiently.",
    description: "Our business consulting services help you identify operational bottlenecks, optimize workflows, and implement systems that support sustainable growth.",
    faqs: [
      { question: "What industries do you work with?", answer: "We specialize in professional services, insurance, and B2B SaaS, but our methodologies apply across various sectors." }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceInfo | undefined {
  return services.find(s => s.slug === slug);
}
