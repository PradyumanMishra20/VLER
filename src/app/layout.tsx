import type { Metadata } from "next";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import { IntroLoader } from "@/components/intro-loader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BRAND } from "@/lib/constants";
import { BRAND_ASSETS } from "@/lib/brand";
import { AuthProvider } from "@/components/providers/auth-provider";

import "./globals.css";

const siteDescription =
  "VELR — contemporary luxury streetwear. Layered silhouettes, muted palettes, and editorial construction for long-term wear.";

export const metadata: Metadata = {
  metadataBase: new URL("https://velr.studio"),

  title: {
    default: `${BRAND.name} — Contemporary Streetwear`,
    template: `%s · ${BRAND.name}`,
  },

  description: siteDescription,

  keywords: [
    "VELR",
    "luxury streetwear",
    "editorial fashion",
    "minimal clothing",
    "contemporary streetwear",
  ],

  authors: [{ name: BRAND.name }],

  icons: {
    icon: BRAND_ASSETS.favicon,
    shortcut: BRAND_ASSETS.favicon,
  },

  openGraph: {
    title: `${BRAND.name} — Contemporary Streetwear`,
    description: siteDescription,
    type: "website",
    url: "https://velr.studio",
    siteName: BRAND.name,
    locale: "en_US",
    images: [
      {
        url: BRAND_ASSETS.ogImage,
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — editorial campaign`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Contemporary Streetwear`,
    description: siteDescription,
    images: [BRAND_ASSETS.ogImage],
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <IntroLoader />
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
