"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function FloatingMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating bar after scrolling down 100px
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto text-center">
        {/* Call Direct */}
        <a
          href="tel:3863331482"
          className="flex flex-col items-center justify-center py-2 px-1 bg-slate-900 text-white rounded-xl font-bold text-[10px] shadow-sm active:scale-95 transition-transform"
        >
          <span className="text-base mb-0.5">📞</span>
          <span>Call</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/13863331482?text=Hello%20Angel,%20I%20visited%20AB%20Global%20Consulting%20and%20would%20like%20information."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-600 text-white rounded-xl font-bold text-[10px] shadow-sm active:scale-95 transition-transform"
        >
          <span className="text-base mb-0.5">💬</span>
          <span>WhatsApp</span>
        </a>

        {/* Text SMS */}
        <a
          href="sms:3863331482?&body=Hello%20Angel,%20I%20visited%20your%20website%20and%20would%20like%20to%20request%20information%20regarding%20insurance/annuities."
          className="flex flex-col items-center justify-center py-2 px-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl font-bold text-[10px] shadow-sm active:scale-95 transition-transform"
        >
          <span className="text-base mb-0.5">📱</span>
          <span>SMS Text</span>
        </a>

        {/* Book Consultation */}
        <Link
          href="/#consultation"
          className="flex flex-col items-center justify-center py-2 px-1 bg-secondary text-white rounded-xl font-bold text-[10px] shadow-sm active:scale-95 transition-transform"
        >
          <span className="text-base mb-0.5">📅</span>
          <span>Quote</span>
        </Link>
      </div>
    </div>
  );
}
