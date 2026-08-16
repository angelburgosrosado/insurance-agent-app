import type { MetadataRoute } from "next";
import { getPrismaClient } from "@/lib/server/db";
import { services } from "@/lib/content/services";
import { SITE_URL } from "@/lib/seo/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const prisma = getPrismaClient();
  const routes = ["", "/privacy", "/disclosures", "/resources"];

  const staticEntries = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceEntries = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // In production, we'd only query published entries.
  const publishedResources = await prisma.contentEntry.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true },
  });

  const resourceEntries = publishedResources.map((resource) => ({
    url: `${SITE_URL}/resources/${resource.slug}`,
    lastModified: resource.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...resourceEntries];
}
