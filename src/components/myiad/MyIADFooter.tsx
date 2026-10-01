"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export function MyIADFooter() {
  return (
    <footer className="bg-[#071324] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Licensing */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white">
                My<span className="text-[#14B8A6]">IAD</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Intelligent Insurance Advisory & Protection platform engineered for consumers, producers, and brokerage leadership across all 50 US states.
            </p>
            <div className="pt-2 text-slate-300 font-semibold space-y-1">
              <p>MyIAD National Insurance Solutions</p>
              <p className="text-[#14B8A6] font-mono text-[11px]">Licensed Nationwide 50-State Network</p>
            </div>
          </div>

          {/* Col 2: Core Offerings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Core Offerings
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#offerings" className="hover:text-white transition-colors">
                  Indexed Universal Life (IUL)
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-white transition-colors">
                  Living Benefits Term Architecture
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-white transition-colors">
                  Health & Medicare Advantage / Medigap
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-white transition-colors">
                  Variable Annuity Guaranteed Income
                </a>
              </li>
              <li>
                <Link href="/tools/iul-calculator" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Interactive IUL Calculator</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialized Platforms */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Advisory Segments
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#ai-assessment" className="hover:text-white transition-colors">
                  Interactive AI Needs Calculator
                </a>
              </li>
              <li>
                <a href="#business-design" className="hover:text-white transition-colors">
                  The MyIAD Business Design
                </a>
              </li>
              <li>
                <a href="#producers" className="hover:text-white transition-colors">
                  Agency Principals & IMO Distribution
                </a>
              </li>
              <li>
                <a href="#veterans" className="hover:text-white transition-colors">
                  Veteran Asset Shield
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white transition-colors">
                  FINRA Rule 2330 Supervisory Protocols
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Territory */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Direct Contact & Toll-Free
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <a href="tel:18888873585" className="flex items-center gap-2 hover:text-[#14B8A6] transition-colors">
                <Phone className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <span className="font-bold text-white">Toll-Free: (888) 887-3585</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <span>support@myiad.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>Nationwide Coverage Across All 50 US States & Territories</span>
              </div>
            </div>
            <div className="pt-2">
              <a
                href="#ai-assessment"
                className="inline-block px-4 py-2 rounded-lg bg-slate-800 hover:bg-[#2563EB] text-white font-bold text-xs transition-colors"
              >
                Launch AI Need Assessment
              </a>
            </div>
          </div>
        </div>

        {/* Regulatory & FINRA 2330 Legal Text */}
        <div className="pt-8 border-t border-slate-800 space-y-4 text-[11px] leading-relaxed text-slate-400">
          <p>
            <strong>Regulatory & Compliance Disclosure:</strong> MyIAD (myiad.com) is an insurance advisory, technology, and case modeling platform. Insurance quotes, policy design, and consultative reviews are performed by licensed life, health, and annuity insurance professionals operating across all 50 US states. Not affiliated with or endorsed by the federal government, the Department of Veterans Affairs, CMS, or Medicare.
          </p>
          <p>
            <strong>Variable Annuity Risk Warning:</strong> Deferred variable annuities are long-term investment vehicles designed for retirement planning and are subject to market fluctuations and investment risk, including potential loss of principal. Guarantees are backed solely by the financial strength and claims-paying ability of the issuing life insurance company. Withdrawals prior to age 59½ may trigger a 10% IRS penalty tax and surrender charges. Contract fees, subaccount management fees, and mortality & expense (M&E) charges apply. Review full prospectus materials carefully prior to purchasing.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 border-t border-slate-800/80">
            <p>
              &copy; {new Date().getFullYear()} MyIAD National Insurance Solutions. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors underline">
                Terms of Service
              </Link>
              <Link href="/disclosures" className="hover:text-white transition-colors underline">
                Statutory Disclosures
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
