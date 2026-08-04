import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-[100dvh] items-center bg-[var(--paper)] px-5 py-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-deep)]">Request received</p>
        <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.07em]">The next conversation starts here</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">Your request has been recorded. AB Global Consulting will review the information and follow up using your preferred contact details</p>
        <Link href="/" className="mt-10 inline-block bg-[var(--ink)] px-6 py-4 text-sm font-semibold text-white">Return to AB Global Consulting</Link>
      </div>
    </main>
  );
}
