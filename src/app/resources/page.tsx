import { getPrismaClient } from "@/lib/server/db";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource Center | AB Global Consulting",
  description: "Educational resources and insights to help scale your operations.",
  alternates: {
    canonical: "/resources",
  }
};

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const prisma = getPrismaClient();
  const resources = await prisma.contentEntry.findMany({
    where: {
      status: "published",
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  return (
    <main className="min-h-[100dvh] bg-[#eef1ef] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <Link href="/" className="text-sm font-semibold hover:underline">AB Global Consulting</Link>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Resource Center</p>
          </div>
          <Link href="/#consultation" className="text-sm text-[var(--accent-deep)] hover:underline">Request Consultation</Link>
        </div>
      </header>
      
      <section className="mx-auto max-w-4xl p-5 lg:p-10">
        <div className="border-b border-[var(--line)] pb-8 mb-10">
          <h1 className="text-4xl font-semibold tracking-[-0.06em]">Resources & Insights</h1>
          <p className="mt-4 text-sm text-[var(--ink-soft)]">Explore our latest articles and educational materials.</p>
        </div>
        
        {resources.length === 0 ? (
          <p className="text-[var(--ink-soft)]">No resources available at this time.</p>
        ) : (
          <div className="grid gap-6">
            {resources.map((entry) => (
              <article key={entry.id} className="bg-white p-6 border border-[var(--line)] hover:border-sentinel-navy transition-colors">
                <Link href={`/resources/${entry.slug}`} className="block">
                  <h2 className="text-xl font-semibold mb-2">{entry.title}</h2>
                  <p className="text-sm text-[var(--ink-soft)] line-clamp-3 mb-4">
                    {/* A proper implementation would use an excerpt field, but we can fallback to the body for now */}
                    {entry.body.substring(0, 150)}...
                  </p>
                  <span className="text-xs font-medium text-[var(--accent-deep)]">Read article &rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
