/**
 * Shared SEO, Open Graph, and social-sharing configuration.
 */
export function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_ENV === "preview" ? process.env.VERCEL_URL : undefined,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const raw of candidates) {
    const trimmed = raw?.trim().replace(/\/+$/, "");
    if (!trimmed) continue;
    const withProtocol =
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? trimmed
        : `https://${trimmed}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      continue;
    }
  }

  return "http://localhost:3000";
}

export const shareMetadata = {
  siteName: "Ayusha weds Deepak",
  pageTitle: "Ayusha weds Deepak | Shubh Vivah — 9 December 2026",
  ogTitle: "Ayusha weds Deepak | Wedding Invitation — 9 Dec 2026",
  description:
    "Join us for Haldi, Mehndi & Sangeet (8 Dec) at D-496, Sector 11, Pratap Vihar, Ghaziabad, and Shubh Vivah (9 Dec) at Amaatra Banquet, Greater Noida West.",
  ogDescription:
    "Join us for Haldi, Mehndi & Sangeet (8 Dec) at D-496, Sector 11, Pratap Vihar, Ghaziabad, and Shubh Vivah (9 Dec) at Amaatra Banquet, Greater Noida West.",
  image: {
    url: "/images/og-share.jpg",
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: "Ayusha weds Deepak — Shubh Vivah, 8–9 December 2026, Ghaziabad & Greater Noida West",
  },
} as const;

