"use client";

import React from "react";
import { getCoreOfferings } from "./tokens";
import { ShieldCheck, HeartPulse, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { myiadDict } from "@/lib/i18n/myiad-dict";

interface MyIADOfferingsProps {
  onSelectOffering?: (offeringId: "life" | "health" | "annuity") => void;
}

export function MyIADOfferings({ onSelectOffering }: MyIADOfferingsProps) {
  const { lang } = useLanguage();
  const d = myiadDict[lang];
  const offerings = getCoreOfferings(lang);

  const icons = {
    life: <ShieldCheck className="w-8 h-8 text-[#2563EB]" />,
    health: <HeartPulse className="w-8 h-8 text-[#14B8A6]" />,
    annuity: <TrendingUp className="w-8 h-8 text-amber-500" />,
  };

  const badgeColors = {
    life: "bg-blue-50 text-[#2563EB] border-blue-200",
    health: "bg-teal-50 text-[#0f766e] border-teal-200",
    annuity: "bg-amber-50 text-amber-800 border-amber-200",
  };

  return (
    <section id="offerings" className="py-20 md:py-28 bg-[#F8FAFC] text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
            {d.offerings_badge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1F3A] tracking-tight">
            {d.offerings_title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {d.offerings_desc}
          </p>
        </div>

        {/* Core Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((offering) => {
            const icon = icons[offering.id];
            const badgeClass = badgeColors[offering.id];

            return (
              <div
                key={offering.id}
                className="group relative flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 p-8"
              >
                <div className="space-y-6">
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                      {icon}
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${badgeClass}`}>
                      {offering.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl font-black text-[#0B1F3A] tracking-tight">
                      {offering.title}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 mt-1">
                      {offering.subtitle}
                    </p>
                  </div>

                  {/* Core Proposition */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {offering.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {lang === "es" ? "Ventajas de Arquitectura" : "Key Architectural Benefits"}
                    </span>
                    <ul className="space-y-2.5">
                      {offering.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Action */}
                <div className="pt-8 mt-6 border-t border-slate-100">
                  <a
                    href={offering.routeAnchor}
                    onClick={() => onSelectOffering && onSelectOffering(offering.id)}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0B1F3A] font-bold text-sm border border-slate-200 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all cursor-pointer shadow-xs"
                  >
                    <span>{offering.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
