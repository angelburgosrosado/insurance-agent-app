import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abglobalconsulting.com"),
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
    url: "https://abglobalconsulting.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { getOrganizationSchema } from "@/lib/seo/schema";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
        />
        {children}
      </body>
    </html>
  );
}
