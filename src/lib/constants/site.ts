export const siteConfig = {
  name: "Julhas Collection",
  shortName: "Julhas",
  tagline: "Where Tradition Meets Modern Elegance",
  description:
    "Premium Pakistani fashion, ready-to-wear, unstitched collections, fragrances, and kidswear.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://julhascollection.com",
  logo: "/images/brand/logo.svg",
  logoLight: "/images/brand/logo-light.svg",
  ogImage: "/images/brand/og-default.jpg",
  email: "info@julhascollection.com",
  phone: "+92 328 2718018",
  phoneHref: "tel:+923282718018",
  whatsapp: "https://wa.me/923282718018",
  workingHours: "Monday – Saturday, 10 AM – 8 PM",
  currency: "PKR",
  freeShippingThreshold: 5000,
  copyrightYear: 2026,
  announcementMessages: [
    "Free delivery on orders over PKR 5,000",
    "New arrivals just dropped — shop the latest",
    "Nationwide delivery across Pakistan",
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61570762864262",
    instagram: "https://www.instagram.com/julhaas_collection/",
    whatsapp: "https://wa.me/923282718018",
  },
} as const;

export type SiteConfig = typeof siteConfig;
