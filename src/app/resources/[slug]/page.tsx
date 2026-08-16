import { getPrismaClient } from "@/lib/server/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const prisma = getPrismaClient();
  const resource = await prisma.contentEntry.findUnique({
    where: { slug }
  });
  
  if (!resource || resource.status !== "published") {
    return { title: "Resource Not Found" };
  }

  return {
    title: `${resource.title} | AB Global Consulting`,
    // Use the first 160 chars of the body if there isn't a dedicated summary field,
    // though the DB schema might just use the body for now.
    description: resource.body.substring(0, 160),
    alternates: {
      canonical: `/resources/${slug}`,
    }
  };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const prisma = getPrismaClient();
  
  const resource = await prisma.contentEntry.findUnique({
    where: { slug }
  });

  if (!resource || resource.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-[100dvh] bg-[#eef1ef] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <Link href="/" className="text-sm font-semibold hover:underline">AB Global Consulting</Link>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Resource Center</p>
          </div>
          <Link href="/resources" className="text-sm text-[var(--accent-deep)] hover:underline">&larr; Back to Resources</Link>
        </div>
      </header>
      
      <article className="mx-auto max-w-3xl p-5 lg:p-10 my-10 bg-white border border-[var(--line)]">
        <header className="mb-8 border-b border-[var(--line)] pb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] leading-tight mb-4">{resource.title}</h1>
          {resource.publishedAt && (
            <time className="text-xs text-[var(--ink-soft)] uppercase tracking-wider font-mono">
              Published on {resource.publishedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          )}
        </header>
        
        <div className="prose max-w-none text-[var(--ink-soft)] leading-relaxed">
          {/* In a real app we'd parse markdown or HTML safely. For now we output text with basic formatting. */}
          {resource.body.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
