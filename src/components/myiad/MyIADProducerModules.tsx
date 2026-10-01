"use client";

import React from "react";
import { AUDIENCE_MODULES } from "./tokens";
import { Briefcase, Building, Shield, CheckCircle2, ArrowRight } from "lucide-react";

interface MyIADProducerModulesProps {
  onSelectSegment?: (segmentId: string) => void;
}

export function MyIADProducerModules({ onSelectSegment }: MyIADProducerModulesProps) {
  const segmentIcons = {
    producers: <Briefcase className="w-7 h-7 text-[#2563EB]" />,
    principals: <Building className="w-7 h-7 text-[#14B8A6]" />,
    veterans: <Shield className="w-7 h-7 text-amber-500" />,
  };

  return (
    <section id="producers" className="py-20 md:py-28 bg-[#0B1F3A] text-white border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/20 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
            Enterprise & Producer Enablement
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Engineered for Producers, Leaders & Specialized Advisors
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether closing high-net-worth IUL cases, managing a multi-tier brokerage agency, or safeguarding veteran retirement pensions, MyIAD provides institutional infrastructure.
          </p>
        </div>

        {/* Audience Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {AUDIENCE_MODULES.map((module) => {
            const icon = segmentIcons[module.id as keyof typeof segmentIcons];

            return (
              <div
                key={module.id}
                id={module.id === "veterans" ? "veterans" : undefined}
                className="flex flex-col justify-between rounded-3xl bg-slate-900/80 border border-slate-700/80 hover:border-slate-500 p-8 shadow-xl transition-all duration-300 relative group"
              >
                <div className="space-y-6">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
                      {icon}
                    </div>
                    <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase tracking-wider">
                      {module.badge}
                    </span>
                  </div>

                  {/* Audience Label */}
                  <span className="text-xs font-bold uppercase tracking-wider text-[#14B8A6]">
                    {module.audience}
                  </span>

                  {/* Core Hook Headline */}
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight">
                    &ldquo;{module.headline}&rdquo;
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {module.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-3 pt-2">
                    {module.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="pt-8 mt-8 border-t border-slate-800">
                  <a
                    href="#lead-intake"
                    onClick={() => onSelectSegment?.(module.id)}
                    className="inline-flex items-center justify-center w-full gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-[#2563EB] text-white text-xs sm:text-sm font-bold border border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
                  >
                    <span>{module.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
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
