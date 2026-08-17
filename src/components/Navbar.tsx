"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 w-full z-50 transition-all">
      {/* Top micro-bar */}
      <div className="bg-[#001428] text-white/85 text-xs py-1.5 px-6 lg:px-10 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>FL License: <strong className="text-secondary">#G328926</strong> (0215 Practitioner)</span>
            <span>•</span>
            <span>WFG Agent Code: <strong className="text-secondary">F6D9U</strong></span>
            <span>•</span>
            <span>📍 Orlando, FL</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3 pr-2 border-r border-white/20">
              <a 
                href="https://www.linkedin.com/in/angelburgos" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="LinkedIn Profile" 
                className="text-white/70 hover:text-white transition-colors text-xs font-semibold"
              >
                LinkedIn
              </a>
              <span className="text-white/30">•</span>
              <a 
                href="https://www.facebook.com/abglco" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Facebook Page" 
                className="text-white/70 hover:text-white transition-colors text-xs font-semibold"
              >
                Facebook
              </a>
              <span className="text-white/30">•</span>
              <a 
                href="https://wa.me/13863331482?text=Hello%20Angel,%20I%20would%20like%20to%20learn%20more%20about%20AB%20Global%20Consulting%20services." 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Chat on WhatsApp" 
                className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs flex items-center gap-1"
              >
                WhatsApp
              </a>
            </div>

            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Hablo Español
            </span>
            <span>•</span>
            <a href="tel:3863331482" className="text-white hover:text-secondary font-bold transition-colors">
              📞 (386) 333-1482
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="flex justify-between items-center px-6 lg:px-10 w-full max-w-7xl mx-auto h-20">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group py-1">
          <img 
            src="/images/ab-global-logo.png" 
            alt="AB Global Consulting Logo" 
            className="h-12 md:h-14 w-auto object-contain"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight group-hover:text-secondary transition-colors">
              AB Global Consulting
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary -mt-0.5">
              Life • Health • Variable Annuity
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-secondary transition-colors py-2">
              Solutions & Insurance
              <svg className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid gap-1.5 animate-in fade-in slide-in-from-top-2">
                <Link 
                  href="/services/life-insurance" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-sm">Life Insurance & IUL</p>
                  <p className="text-xs text-slate-500">0% floor market upside & living benefits</p>
                </Link>
                <Link 
                  href="/services/variable-annuities" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-sm">Variable & Indexed Annuities</p>
                  <p className="text-xs text-slate-500">Guaranteed lifetime retirement income</p>
                </Link>
                <Link 
                  href="/services/final-expense" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-sm">Final Expense & Everest Concierge</p>
                  <p className="text-xs text-slate-500">24/7 funeral negotiation & express payouts</p>
                </Link>
                <Link 
                  href="/services/health-insurance" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-sm">Health & Medicare Coverage</p>
                  <p className="text-xs text-slate-500">ACA marketplace, Medigap & Advantage</p>
                </Link>
                <Link 
                  href="/services/long-term-care" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  <p className="font-bold text-slate-900 text-sm">Long-Term Care (LTC)</p>
                  <p className="text-xs text-slate-500">Cash-Indemnity hybrid asset protection</p>
                </Link>
              </div>
            )}
          </div>

          {/* Interactive Tools Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-secondary transition-colors py-2">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Interactive Mini-Apps
              <svg className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid gap-1.5 animate-in fade-in slide-in-from-top-2">
                <Link 
                  href="/tools/iul-calculator" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 text-sm">📊 IUL Wealth Simulator</p>
                    <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded">Shareable</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Simulate tax-free retirement loan payouts</p>
                </Link>
                <Link 
                  href="/tools/annuity-estimator" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 text-sm">📈 Annuity Paycheck Estimator</p>
                    <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded">Shareable</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Calculate guaranteed monthly pension checks</p>
                </Link>
                <Link 
                  href="/tools/funeral-cost-savings" 
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 text-sm">🕊️ Funeral Concierge Savings</p>
                    <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded">Shareable</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Compare retail vs Everest negotiated rates</p>
                </Link>
              </div>
            )}
          </div>

          <Link className="hover:text-secondary transition-colors" href="/about">About Angel Burgos</Link>
          <Link className="hover:text-secondary transition-colors" href="/resources">Resources</Link>
          <Link className="hover:text-secondary transition-colors" href="/portal">Client Portal</Link>
        </div>

        {/* Action Button & Contact */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/#consultation">
            <Button variant="primary" className="px-5 py-2.5 text-xs md:text-sm font-bold !bg-secondary !text-white !border-secondary hover:!bg-secondary/90 shadow-md">
              Schedule Consultation
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-sm font-semibold text-slate-800 shadow-2xl animate-in fade-in">
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-xs uppercase font-bold text-secondary tracking-wider">Solutions & Insurance</p>
            <Link href="/services/life-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              Life Insurance & IUL
            </Link>
            <Link href="/services/variable-annuities" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              Variable & Indexed Annuities
            </Link>
            <Link href="/services/final-expense" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              Final Expense & Everest Concierge
            </Link>
            <Link href="/services/health-insurance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              Health & Medicare Solutions
            </Link>
            <Link href="/services/long-term-care" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              Long-Term Care Planning (LTC)
            </Link>
          </div>

          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-xs uppercase font-bold text-secondary tracking-wider">Interactive Mini-Apps</p>
            <Link href="/tools/iul-calculator" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              📊 IUL Retirement Calculator
            </Link>
            <Link href="/tools/annuity-estimator" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              📈 Annuity Paycheck Estimator
            </Link>
            <Link href="/tools/funeral-cost-savings" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              🕊️ Funeral Concierge Savings
            </Link>
          </div>

          <div className="space-y-2 pb-4 border-b border-slate-100">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              About Angel Burgos
            </Link>
            <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              Resources & Articles
            </Link>
            <Link href="/portal" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-secondary">
              Client Portal
            </Link>
          </div>

          <div className="pt-2 space-y-2">
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
              <a 
                href="https://wa.me/13863331482?text=Hello%20Angel,%20I%20would%20like%20information%20regarding%20insurance/annuities."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100"
              >
                WhatsApp
              </a>
              <a 
                href="https://www.linkedin.com/in/angelburgos"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-200"
              >
                LinkedIn
              </a>
              <a 
                href="https://www.facebook.com/abglco"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-200"
              >
                Facebook
              </a>
            </div>

            <a href="tel:3863331482" className="block text-center py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm">
              📞 Direct Call: (386) 333-1482
            </a>
            <Link href="/#consultation" onClick={() => setMobileMenuOpen(false)} className="block w-full">
              <Button variant="primary" className="w-full py-3 text-sm font-bold !bg-secondary !text-white !border-secondary">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
