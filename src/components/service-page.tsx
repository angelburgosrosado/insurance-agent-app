import type { ServiceInfo } from "@/lib/content/services";
import Link from "next/link";

export function ServicePageLayout({ service }: { service: ServiceInfo }) {
  return (
    <main className="min-h-screen bg-[#eef1ef] text-[var(--ink)]">
      {/* Hero Section */}
      <section className="bg-sentinel-navy text-white py-20 px-5 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{service.title}</h1>
          <p className="text-lg text-[var(--line)] max-w-2xl mx-auto">{service.shortDescription}</p>
          <div className="mt-8">
            <Link 
              href="/#consultation" 
              className="inline-block bg-[var(--accent)] text-white px-8 py-4 font-semibold hover:bg-[var(--accent-deep)] transition-colors"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-5 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 border border-[var(--line)] shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">About this Service</h2>
          <div className="prose max-w-none text-[var(--ink-soft)] leading-relaxed">
            <p>{service.description}</p>
          </div>
        </div>

        {/* FAQs */}
        {service.faqs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {service.faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 border border-[var(--line)]">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-[var(--ink-soft)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
