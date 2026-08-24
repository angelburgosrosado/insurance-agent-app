"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { resourceArticles } from "@/lib/content/resources";
import { Button } from "@/components/ui/Button";

export default function ResourcesPage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: lang === "es" ? "Todos los Recursos" : "All Resources" },
    { id: "Life Insurance", label: lang === "es" ? "Seguros de Vida e IUL" : "Life Insurance & IUL" },
    { id: "Military & Veterans", label: lang === "es" ? "Militar y Veteranos" : "Military & Veterans" },
    { id: "Retirement", label: lang === "es" ? "Jubilación y Anualidades" : "Retirement & Annuities" },
    { id: "Final Expense", label: lang === "es" ? "Gastos Finales y Everest" : "Final Expense & Everest" },
  ];

  const filteredArticles = resourceArticles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const title = lang === "es" ? article.titleEs : article.title;
    const summary = lang === "es" ? article.summaryEs : article.summary;
    const matchesSearch =
      searchQuery === "" ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#001c38] text-white py-16 md:py-20 px-6 lg:px-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span>📚</span> {lang === "es" ? "Centro de Recursos y Guías Educativas" : "Resource Center & Planning Guides"}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white max-w-3xl">
            {lang === "es" 
              ? "Guías de Protección Patrimonial, Impuestos y Retiro" 
              : "Institutional Wealth, Tax & Retirement Planning Guides"}
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            {lang === "es"
              ? "Artículos técnicos, estrategias de reducción de impuestos bajo el Código IRS 7702, optimización de pensiones militares y análisis de transferencias de 401(k)."
              : "Institutional-grade research, IRS Section 7702 tax strategies, military pension maximization, and 401(k) rollover blueprints authored by 0215 licensed advisor Angel Burgos."}
          </p>
        </div>
      </section>

      {/* Search & Category Filter Bar */}
      <section className="py-8 px-6 lg:px-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-slate-200">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-secondary text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder={lang === "es" ? "Buscar recursos..." : "Search resources..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => {
            const title = lang === "es" ? article.titleEs : article.title;
            const summary = lang === "es" ? article.summaryEs : article.summary;
            const categoryLabel = lang === "es" ? article.categoryEs : article.category;
            const toolName = lang === "es" ? article.relatedToolNameEs : article.relatedToolName;

            return (
              <article
                key={article.slug}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{article.icon}</span>
                      <span className="text-xs uppercase font-bold tracking-wider text-secondary">
                        {categoryLabel}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ⏱️ {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-secondary transition-colors">
                    {title}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {summary}
                  </p>

                  {/* Key Takeaways Box */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2 mb-6">
                    <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                      {lang === "es" ? "Puntos Clave:" : "Key Takeaways:"}
                    </p>
                    <ul className="space-y-1.5 text-slate-600">
                      {(lang === "es" ? article.keyTakeawaysEs : article.keyTakeaways).slice(0, 2).map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Link
                    href={`/resources/${article.slug}`}
                    className="w-full sm:w-auto text-xs font-bold text-slate-900 hover:text-secondary flex items-center justify-center sm:justify-start gap-1 py-2"
                  >
                    <span>{lang === "es" ? "Leer Guía Completa" : "Read Full Guide"}</span>
                    <span>→</span>
                  </Link>

                  {article.relatedToolUrl && (
                    <Link
                      href={article.relatedToolUrl}
                      className="w-full sm:w-auto px-3.5 py-1.5 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-xl text-xs font-bold transition-colors text-center"
                    >
                      ⚡ {toolName}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="bg-slate-900 text-white mt-16 py-12 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">
              {lang === "es" ? "¿Desea un Análisis Personalizado?" : "Need a Custom Institutional Analysis?"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {lang === "es"
                ? "Converse con el asesor licenciado 0215 Angel Burgos para cotizaciones oficiales de aseguradoras."
                : "Schedule a confidential consultation with State Licensed 0215 Practitioner Angel Burgos."}
            </p>
          </div>
          <a href="/#consultation">
            <Button variant="primary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-6 py-3 shadow-md">
              {lang === "es" ? "Solicitar Consulta Gratis →" : "Request Free Consultation →"}
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
