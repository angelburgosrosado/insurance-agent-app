import React from 'react';

export const ComplianceDisclosure: React.FC = () => {
  return (
    <div className="w-full border-t border-slate-200 mt-16 pt-8 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[11px] leading-[14px] text-slate-500 font-sans text-justify">
          <strong>Compliance Disclosure:</strong> AB Global Consulting and Angel Burgos are licensed to sell insurance products in approved jurisdictions. The information provided on this website is for educational and informational purposes only and does not constitute financial, tax, or legal advice. Insurance and annuity product guarantees are subject to the claims-paying ability of the issuing insurance company. Please consult with a qualified professional before making any financial decisions. 
          <br /><br />
          For detailed information regarding licensing, specific product features, and potential fees, please refer to the official policy documents provided during your consultation. "Hablo Español" services are provided to ensure complete clarity of terms, but binding legal documents may be provided in English as required by law.
        </p>
      </div>
    </div>
  );
};
