import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getSiteUrl, shareMetadata } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: shareMetadata.pageTitle,
  description: shareMetadata.description,
  keywords: [
    "wedding invitation",
    "Ayusha weds Deepak",
    "Ayusha and Deepak wedding",
    "Shubh Vivah",
    "Greater Noida West wedding",
    "Indian wedding website",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: shareMetadata.ogTitle,
    description: shareMetadata.ogDescription,
    url: "/",
    siteName: shareMetadata.siteName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: shareMetadata.image.url,
        width: shareMetadata.image.width,
        height: shareMetadata.image.height,
        alt: shareMetadata.image.alt,
        type: shareMetadata.image.type,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: shareMetadata.ogTitle,
    description: shareMetadata.ogDescription,
    images: [
      {
        url: shareMetadata.image.url,
        alt: shareMetadata.image.alt,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf3e6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      
    >
      <body className="bg-cream font-body text-ink antialiased">{children}</body>
    </html>
  );
}
