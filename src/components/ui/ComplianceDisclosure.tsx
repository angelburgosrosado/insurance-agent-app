import React from 'react';
import Link from 'next/link';

export const ComplianceDisclosure: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 mt-20 pt-12 pb-16 bg-slate-100 text-slate-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <img 
              src="/images/ab-global-logo.png" 
              alt="AB Global Consulting Logo" 
              className="h-14 w-auto object-contain"
            />
            <div>
              <p className="font-bold text-slate-900 text-base">AB Global Consulting</p>
              <p className="text-xs text-secondary font-semibold">Life • Health • Variable Annuity Planning</p>
              <p className="text-xs text-slate-500 mt-0.5">Angel Burgos • State Licensed 0215 Practitioner (G328926 / F6D9U)</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600">
              <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
              <Link href="/about" className="hover:text-secondary transition-colors">About Angel Burgos</Link>
              <Link href="/services/life-insurance" className="hover:text-secondary transition-colors">Life & IUL</Link>
              <Link href="/services/variable-annuities" className="hover:text-secondary transition-colors">Annuities</Link>
              <Link href="/services/final-expense" className="hover:text-secondary transition-colors">Final Expense</Link>
              <Link href="/tools/iul-calculator" className="hover:text-secondary transition-colors">IUL Simulator</Link>
              <Link href="/#consultation" className="text-secondary font-bold hover:underline">Schedule Consultation</Link>
            </div>

            {/* Social & Messaging Channels */}
            <div className="flex items-center gap-3 text-xs font-bold">
              <a 
                href="https://www.linkedin.com/in/angelburgos" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-700 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://www.facebook.com/abglco" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-700 transition-colors"
              >
                Facebook
              </a>
              <a 
                href="https://wa.me/13863331482?text=Hello%20Angel,%20I%20visited%20AB%20Global%20Consulting%20and%20would%20like%20information." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
              >
                WhatsApp
              </a>
              <a 
                href="https://t.me/+13863331482" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2.5 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded transition-colors"
              >
                Telegram
              </a>
              <a 
                href="https://agents.worldfinancialgroup.com/Angel-Burgos-F6D9U" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors"
              >
                WFG Directory ↗
              </a>
            </div>
          </div>
        </div>

        <div className="text-[11px] leading-relaxed text-slate-500 space-y-3">
          <p>
            <strong>Compliance Disclosure:</strong> AB Global Consulting and licensed professional Angel Burgos (FL License #G328926 / WFG Agent Code: F6D9U) are licensed to offer life insurance, health insurance, fixed annuities, variable annuities, and funeral concierge services in approved jurisdictions. The information on this website is for educational and illustrative purposes only and does not constitute individual tax, investment, or legal advice. 
          </p>
          <p>
            All guarantees and cash value projections are backed solely by the financial strength and claims-paying ability of the issuing insurance carriers (including Nationwide, Transamerica, Pacific Life, Mutual of Omaha, and Everest Funeral Concierge). Indexed Universal Life (IUL) policies participate in index performance up to a stated cap rate and are protected by a guaranteed minimum 0% floor against market decline.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 border-t border-slate-200/80 text-[10px] text-slate-400">
            <p>© {new Date().getFullYear()} AB Global Consulting LLC. All rights reserved. 9501 Satellite Blvd, Suite 105, Orlando, FL 32837.</p>
            <p>Direct: (386) 333-1482 • Office: (407) 930-6226</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
