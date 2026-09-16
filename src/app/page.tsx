import { TuklasClone } from "@/components/sites/count-label-48987147-figma-site/tuklas-clone";
import { siteConfig } from "./seo";

const travelAgencyJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  logo: `${siteConfig.url}/opengraph-image`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Tuklas Building, Ermita",
    addressLocality: "Manila",
    addressCountry: "PH",
    postalCode: "1000",
  },
  areaServed: {
    "@type": "Country",
    name: "Philippines",
  },
  knowsAbout: [
    "El Nido island hopping",
    "Boracay beach tours",
    "Cebu and Bohol travel packages",
    "Siargao surf trips",
    "Custom Philippine itineraries",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "El Nido Island Hopping",
      price: "8500",
      priceCurrency: "PHP",
    },
    {
      "@type": "Offer",
      name: "Boracay Beach Escape",
      price: "12000",
      priceCurrency: "PHP",
    },
    {
      "@type": "Offer",
      name: "Cebu-Bohol Combo",
      price: "15500",
      priceCurrency: "PHP",
    },
    {
      "@type": "Offer",
      name: "Siargao Surf & Explore",
      price: "11000",
      priceCurrency: "PHP",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencyJsonLd) }}
        type="application/ld+json"
      />
      <TuklasClone />
    </>
  );
}
