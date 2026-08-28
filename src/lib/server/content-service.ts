import { getPrismaClient } from "@/lib/server/db";
import { resourceArticles } from "@/lib/content/resources";
import { services } from "@/lib/content/services";

export interface UnifiedContentItem {
  id: string;
  title: string;
  slug: string;
  type: "resource" | "service" | "article";
  status: "published" | "draft" | "archived";
  summary: string | null;
  body: string;
  seoMetadata?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  isDatabaseRecord: boolean;
}

/**
 * Returns static fallback catalog
 */
export function getStaticDefaultContent(): UnifiedContentItem[] {
  const resourceItems: UnifiedContentItem[] = resourceArticles.map((res) => ({
    id: `static-res-${res.slug}`,
    title: res.title,
    slug: res.slug,
    type: "resource",
    status: "published",
    summary: res.summary,
    body: res.sections.map((s) => `## ${s.heading}\n\n${s.body}`).join("\n\n"),
    seoMetadata: JSON.stringify({
      category: res.category,
      readTime: res.readTime,
      icon: res.icon,
      relatedToolUrl: res.relatedToolUrl,
    }),
    createdAt: new Date(res.publishedAt || Date.now()),
    updatedAt: new Date(res.publishedAt || Date.now()),
    publishedAt: new Date(res.publishedAt || Date.now()),
    isDatabaseRecord: false,
  }));

  const serviceItems: UnifiedContentItem[] = services.map((srv) => ({
    id: `static-srv-${srv.slug}`,
    title: srv.title,
    slug: srv.slug,
    type: "service",
    status: "published",
    summary: srv.shortDescription,
    body: srv.detailedSections.map((s) => `## ${s.heading}\n\n${s.content}`).join("\n\n"),
    seoMetadata: JSON.stringify({
      category: srv.category,
      tagline: srv.tagline,
      keyBenefits: srv.keyBenefits,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    isDatabaseRecord: false,
  }));

  return [...resourceItems, ...serviceItems];
}

/**
 * Seeds default resources & services into Prisma if table is empty
 */
export async function seedDefaultContentIfEmpty(): Promise<void> {
  if (!process.env.DATABASE_URL) return;

  try {
    const prisma = getPrismaClient();
    const count = await prisma.contentEntry.count();
    if (count > 0) return;

    // Seed Resources
    for (const res of resourceArticles) {
      const bodyContent = res.sections
        .map((s) => `## ${s.heading}\n\n${s.body}\n`)
        .join("\n");

      await prisma.contentEntry.create({
        data: {
          slug: res.slug,
          title: res.title,
          type: "resource",
          status: "published",
          summary: res.summary,
          body: bodyContent,
          seoMetadata: JSON.stringify({
            category: res.category,
            readTime: res.readTime,
            icon: res.icon,
            relatedToolUrl: res.relatedToolUrl,
          }),
          publishedAt: new Date(res.publishedAt || Date.now()),
        },
      });
    }

    // Seed Services
    for (const srv of services) {
      const bodyContent = srv.detailedSections
        .map((s) => `## ${s.heading}\n\n${s.content}\n`)
        .join("\n");

      await prisma.contentEntry.create({
        data: {
          slug: srv.slug,
          title: srv.title,
          type: "service",
          status: "published",
          summary: srv.shortDescription,
          body: bodyContent,
          seoMetadata: JSON.stringify({
            category: srv.category,
            tagline: srv.tagline,
            keyBenefits: srv.keyBenefits,
          }),
          publishedAt: new Date(),
        },
      });
    }
  } catch {
    // Graceful fallback if database connection is pending
  }
}

/**
 * Retrieves all content entries (combining database with fallbacks)
 */
export async function getAllContent(
  typeFilter?: string,
  statusFilter?: string
): Promise<UnifiedContentItem[]> {
  if (!process.env.DATABASE_URL) {
    let items = getStaticDefaultContent();
    if (typeFilter) items = items.filter((i) => i.type === typeFilter);
    if (statusFilter) items = items.filter((i) => i.status === statusFilter);
    return items;
  }

  try {
    const prisma = getPrismaClient();
    await seedDefaultContentIfEmpty();

    const dbEntries = await prisma.contentEntry.findMany({
      where: {
        ...(typeFilter ? { type: typeFilter as any } : {}),
        ...(statusFilter ? { status: statusFilter as any } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    if (dbEntries.length === 0) {
      let items = getStaticDefaultContent();
      if (typeFilter) items = items.filter((i) => i.type === typeFilter);
      if (statusFilter) items = items.filter((i) => i.status === statusFilter);
      return items;
    }

    return dbEntries.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      type: item.type as any,
      status: item.status as any,
      summary: item.summary,
      body: item.body,
      seoMetadata: item.seoMetadata || "{}",
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      isDatabaseRecord: true,
    }));
  } catch {
    let items = getStaticDefaultContent();
    if (typeFilter) items = items.filter((i) => i.type === typeFilter);
    if (statusFilter) items = items.filter((i) => i.status === statusFilter);
    return items;
  }
}

/**
 * Retrieves a single content item by slug
 */
export async function getContentBySlug(
  slug: string,
  type?: string
): Promise<UnifiedContentItem | null> {
  if (!process.env.DATABASE_URL) {
    const staticItem = getStaticDefaultContent().find(
      (i) => i.slug === slug && (!type || i.type === type)
    );
    return staticItem || null;
  }

  try {
    const prisma = getPrismaClient();
    await seedDefaultContentIfEmpty();

    const dbEntry = await prisma.contentEntry.findUnique({
      where: { slug },
    });

    if (dbEntry) {
      if (type && dbEntry.type !== type) return null;
      return {
        id: dbEntry.id,
        title: dbEntry.title,
        slug: dbEntry.slug,
        type: dbEntry.type as any,
        status: dbEntry.status as any,
        summary: dbEntry.summary,
        body: dbEntry.body,
        seoMetadata: dbEntry.seoMetadata || "{}",
        createdAt: dbEntry.createdAt,
        updatedAt: dbEntry.updatedAt,
        publishedAt: dbEntry.publishedAt,
        isDatabaseRecord: true,
      };
    }
  } catch {
    // Fall back to static
  }

  const staticItem = getStaticDefaultContent().find(
    (i) => i.slug === slug && (!type || i.type === type)
  );
  return staticItem || null;
}
