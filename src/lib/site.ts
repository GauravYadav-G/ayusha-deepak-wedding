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
    "With our families' blessings, join us on 8–9 Dec 2026 in Greater Noida West for Haldi, Mehndi, Sangeet & Shubh Vivah. View schedule, venues & send blessings.",
  ogDescription:
    "With our families' blessings, join us on 8–9 Dec 2026 in Greater Noida West for Haldi, Mehndi, Sangeet & Shubh Vivah. View venues & share blessings.",
  image: {
    url: "/images/og-share.jpg",
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: "Ayusha weds Deepak — Shubh Vivah, 8–9 December 2026, Greater Noida West",
  },
} as const;

