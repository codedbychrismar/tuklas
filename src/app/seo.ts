import type { Metadata } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuklastravels.ph";

export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: "Tuklas Travel & Tour",
  title: "Tuklas Travel & Tour - Discover the Philippines",
  description:
    "Discover and book unforgettable Philippine travel experiences, island hopping tours, beach escapes, and custom itineraries with Tuklas Travel & Tour.",
  url: siteUrl,
  email: "hello@tuklastravels.ph",
  phone: "+63 917 123 4567",
  address: "123 Tuklas Building, Ermita, Manila, Philippines 1000",
  locale: "en_PH",
};

export const seoKeywords = [
  "Tuklas Travel and Tour",
  "Philippines travel agency",
  "Philippines tour packages",
  "El Nido island hopping",
  "Boracay travel package",
  "Cebu Bohol tour",
  "Siargao surf package",
  "Philippine island tours",
  "custom Philippines itinerary",
];

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: seoKeywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
