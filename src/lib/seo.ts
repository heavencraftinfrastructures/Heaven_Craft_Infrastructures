// Central SEO configuration — one place to update once the real domain is
// live. Currently using a placeholder based on the domain Mr Bharadwaj
// plans to purchase (heavencraft.in). Swap SITE_URL below the moment the
// domain is confirmed/purchased, and everything (sitemap, robots.txt,
// canonical URLs, Open Graph, JSON-LD) picks it up automatically.
export const SITE_URL = "https://www.heavencraft.in";

export const SITE_NAME = "Heaven Craft Infrastructure & Interiors";

export const SITE_DESCRIPTION =
  "Heaven Craft Infrastructure & Interiors delivers civil construction, interior design, exterior architecture, structural planning, and government infrastructure projects in Hassan, Karnataka. Trusted builders for residential, commercial, and civil works.";

export const SITE_KEYWORDS = [
  "civil construction company Hassan",
  "civil contractor Hassan Karnataka",
  "interior designer Hassan",
  "building construction company Karnataka",
  "construction company near me",
  "house construction contractor Hassan",
  "structural planning and design",
  "government civil works contractor",
  "road construction company Karnataka",
  "interior and exterior design Hassan",
  "best civil engineers Hassan",
  "Heaven Craft Infrastructure",
  "villa construction Hassan",
  "commercial construction Karnataka",
];

export const BUSINESS_PHONE = "+919880102797";
export const BUSINESS_PHONE_DISPLAY = "+91 98801 02797";
export const BUSINESS_EMAIL = "hello@heavencraft.in";

export const BUSINESS_GEO = {
  latitude: 13.0263128,
  longitude: 76.1037195,
};

export const BUSINESS_ADDRESS = {
  streetAddress: "Ground Floor, 24/2, BM Rd, Vidhya Nagar",
  addressLocality: "Hassan",
  addressRegion: "Karnataka",
  postalCode: "573201",
  addressCountry: "IN",
};

/**
 * JSON-LD structured data describing Heaven Craft as a local
 * GeneralContractor business. Search engines (and AI answer engines like
 * Google's AI Overviews / ChatGPT / Perplexity) use this to understand
 * exactly what the business does, where it is, and what services it
 * offers — this is what makes a business eligible to surface in Google's
 * local pack / "near me" results and knowledge panels, on top of ordinary
 * blue-link ranking.
 */
export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Heaven Craft",
    url: SITE_URL,
    logo: `${SITE_URL}/media/brand/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    description: SITE_DESCRIPTION,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Hassan" },
      { "@type": "State", name: "Karnataka" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction & Design Services",
      itemListElement: [
        "Interior Design",
        "Exterior Architecture",
        "Building Construction",
        "Road Construction",
        "Government Civil Projects",
        "Structural Planning & Simulation",
      ].map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
  };
}
