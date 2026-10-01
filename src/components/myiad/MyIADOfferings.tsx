"use client";

import React from "react";
import { CORE_OFFERINGS } from "./tokens";
import { ShieldCheck, HeartPulse, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

interface MyIADOfferingsProps {
  onSelectOffering?: (offeringId: "life" | "health" | "annuity") => void;
}

export function MyIADOfferings({ onSelectOffering }: MyIADOfferingsProps) {
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
            Architecture Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1F3A] tracking-tight">
            Three Core Protection Pillars
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Engineered to replace fragmented retail policies with an integrated portfolio of wealth preservation, healthcare security, and longevity income guarantees.
          </p>
        </div>

        {/* Core Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_OFFERINGS.map((offering) => {
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
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#0B1F3A] tracking-tight">
                      {offering.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {offering.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {offering.description}
                  </p>

                  {/* Benefits Checklist */}
                  <ul className="space-y-3 pt-2">
                    {offering.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                        <CheckCircle className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action */}
                <div className="pt-8 mt-8 border-t border-slate-100">
                  <a
                    href="#lead-intake"
                    onClick={() => onSelectOffering?.(offering.id)}
                    className="inline-flex items-center justify-center w-full gap-2 px-5 py-3.5 rounded-xl bg-[#0B1F3A] hover:bg-[#2563EB] text-white text-xs sm:text-sm font-bold shadow-md transition-all group-hover:shadow-lg"
                  >
                    <span>{offering.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carrier Alignment Footer Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-[#0B1F3A]">
              Carrier Agnostic &bull; Institutional Brokerage Standards
            </h4>
            <p className="text-xs text-slate-500 max-w-xl">
              We represent you, not an insurance company. Direct contracting across Allianz, National Life Group, Ameritas, Mutual of Omaha, Lincoln Financial, Prudential, and top regional carriers.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-700">
            <span className="px-3 py-1.5 bg-slate-100 rounded-lg">A+ Best Rated</span>
            <span className="px-3 py-1.5 bg-slate-100 rounded-lg">Zero Proprietary Quotas</span>
            <span className="px-3 py-1.5 bg-slate-100 rounded-lg">Independent Fiduciary Lens</span>
          </div>
        </div>
      </div>
    </section>
  );
}
