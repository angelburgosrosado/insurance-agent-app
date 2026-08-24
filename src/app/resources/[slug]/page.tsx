import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { resourceArticles } from "@/lib/content/resources";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return resourceArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = resourceArticles.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Resource Not Found | AB Global Consulting" };
  }

  return {
    title: `${article.title} | AB Global Consulting`,
    description: article.summary,
    alternates: {
      canonical: `/resources/${slug}`,
    },
  };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = resourceArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      {/* Top Header */}
      <section className="bg-[#001c38] text-white py-12 md:py-16 px-6 lg:px-10 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-bold transition-colors mb-2"
          >
            ← Back to Resources & Planning Guides
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-2xl">{article.icon}</span>
            <span className="px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-slate-400">⏱️ {article.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            {article.summary}
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
            <span>Author: <strong>Angel Burgos (0215 / G328926)</strong></span>
            <span>•</span>
            <span>Orlando, FL & Puerto Rico</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 w-full space-y-10">
        {/* Key Takeaways Card */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-2">
            <span>⚡</span> Executive Summary & Key Takeaways
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-amber-950 font-medium">
            {article.keyTakeaways.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-amber-100">
                <span className="text-emerald-600 font-bold text-sm">✓</span>
                <span className="leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {article.sections.map((section, idx) => (
            <section key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                {section.heading}
              </h2>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {/* Related Interactive Tool Banner */}
        {article.relatedToolUrl && (
          <div className="bg-[#001c38] rounded-3xl p-6 md:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                Interactive Companion Tool
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                {article.relatedToolName}
              </h3>
              <p className="text-xs text-slate-300 max-w-md">
                Model your personalized numbers with our interactive simulator and share your scenario.
              </p>
            </div>
            <Link href={article.relatedToolUrl} className="shrink-0">
              <Button variant="primary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-5 py-3 shadow-md">
                Launch Simulator →
              </Button>
            </Link>
          </div>
        )}

        {/* Consultation Callout */}
        <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200 text-center space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Request an Official Carrier Illustration
          </h3>
          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            Get personalized rate comparisons, IRS Section 7702 modeling, or military pension maximization illustrations tailored to your age, state, and retirement goals.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a href="/#consultation">
              <Button variant="primary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-6 py-3 shadow-md">
                Book Free Consultation →
              </Button>
            </a>
            <a href="tel:3863331482" className="px-5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors">
              📞 (386) 333-1482
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
