import { getServiceBySlug, services } from "@/lib/content/services";
import { ServicePageLayout } from "@/components/service-page";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | AB Global Consulting`,
    description: service.shortDescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
    // The master plan says service pages are noindex until content is approved
    robots: {
      index: false,
      follow: false,
    }
  };
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageLayout service={service} />;
}
