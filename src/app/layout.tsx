import type { Metadata, Viewport } from "next";
import { El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { content } from "@/content/ar";

import "@/styles/globals.css";

/** Headings — El Messiri (same pairing as moneeb.sa). */
const messiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-messiri",
  display: "swap",
});

/** Body & UI — IBM Plex Sans Arabic, per the brand guide. */
const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const { meta } = content;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: meta.title,
  description: meta.description,
  keywords: [...meta.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: meta.title,
    description: meta.description,
    images: [{ url: "/haseen-logo.svg", alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#12001f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${messiri.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  );
}
