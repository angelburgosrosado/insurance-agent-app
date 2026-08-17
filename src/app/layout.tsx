import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abglco.com"),
  title: {
    default: "AB Global Consulting | Insurance guidance with clarity",
    template: "%s | AB Global Consulting",
  },
  description:
    "AB Global Consulting helps individuals, families, and businesses evaluate insurance options with clear guidance and practical next steps.",
  applicationName: "AB Global Consulting",
  authors: [{ name: "Angel Burgos" }],
  creator: "AB Global Consulting",
  keywords: ["insurance consulting", "insurance guidance", "insurance consultation"],
  openGraph: {
    type: "website",
    siteName: "AB Global Consulting",
    title: "Insurance guidance with clarity",
    description:
      "Clear insurance guidance for individuals, families, and businesses.",
    url: "https://abglco.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { getOrganizationSchema } from "@/lib/seo/schema";
import { missingEnvVars } from "@/lib/server/env";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const isDev = process.env.NODE_ENV === "development";
  const needsSetup = isDev && missingEnvVars && missingEnvVars.length > 0;

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
        />
        {needsSetup && (
          <div className="bg-[var(--accent)] text-white text-center py-2 text-sm font-medium sticky top-0 z-50">
            Welcome to development! Some environment variables are missing. <a href="/setup" className="underline font-bold hover:text-[#eef1ef]">Go to Setup Wizard</a>
          </div>
        )}
        <LanguageProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
