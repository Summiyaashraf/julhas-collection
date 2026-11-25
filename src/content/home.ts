import type { PillarSlug } from "@/lib/constants/collections";

export interface ContentLink {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  imageAlt: string;
  primaryCta: ContentLink;
  secondaryCta?: ContentLink;
}

export interface CampaignTile {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
}

export interface IntroBlock {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface PillarSpotlight {
  pillar: PillarSlug;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
}

export interface JourneyBlock {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
}

export const HOME_HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "festive-edit",
    eyebrow: "The Festive Edit",
    title: "A celebration, softly told.",
    description:
      "Layered embroideries and quiet gold details for the moments that matter most.",
    desktopImage: "/images/hero/hero-1-desktop.jpg",
    mobileImage: "/images/hero/hero-1-mobile.jpg",
    imageAlt:
      "Warm editorial portrait in an embroidered occasion outfit against a stone backdrop",
    primaryCta: {
      label: "Shop Women",
      href: "/collections/women/luxury",
    },
    secondaryCta: {
      label: "Shop Children",
      href: "/collections/children/kids-festive",
    },
  },
  {
    id: "new-arrivals",
    eyebrow: "New Arrivals",
    title: "The new season, in focus.",
    description:
      "Fresh silhouettes, considered fabrics, and pieces made for the everyday.",
    desktopImage: "/images/hero/hero-2-desktop.jpg",
    mobileImage: "/images/hero/hero-2-mobile.jpg",
    imageAlt:
      "Editorial portrait of a new-season outfit in warm neutral tones",
    primaryCta: {
      label: "Shop New In",
      href: "/collections?tag=new-arrival",
    },
    secondaryCta: {
      label: "Explore Collections",
      href: "/collections",
    },
  },
  {
    id: "fragrance",
    eyebrow: "Fragrance, Reimagined",
    title: "A signature that lingers.",
    description:
      "Warm oud, soft amber, and clean musk for everyday rituals and late evenings.",
    desktopImage: "/images/hero/hero-3-desktop.jpg",
    mobileImage: "/images/hero/hero-3-mobile.jpg",
    imageAlt:
      "Still-life composition of a fragrance bottle in warm light and stone tones",
    primaryCta: {
      label: "Shop Women's Fragrances",
      href: "/collections/women/fragrances",
    },
    secondaryCta: {
      label: "Shop Men's Fragrances",
      href: "/collections/men/fragrances",
    },
  },
];

export const HOME_CATEGORY_SECTION = {
  eyebrow: "Shop By Category",
  title: "Find your next favourite.",
  description:
    "From everyday ease to occasion dressing, explore the collections made for every chapter.",
} as const;

export const HOME_TRENDING_SECTION = {
  eyebrow: "Most Loved",
  title: "Trending this season.",
  description:
    "The pieces our community keeps coming back to — elevated essentials and occasion favourites, chosen by you.",
  href: "/collections?sort=best-selling",
  cta: "View All Bestsellers",
} as const;

export const HOME_CAMPAIGN_TILES: readonly CampaignTile[] = [
  {
    id: "luxury-edit",
    eyebrow: "The Occasion Edit",
    title: "Heirloom details, modern ease.",
    description:
      "Rich textures and hand-finished embroidery for evenings that deserve more.",
    image: "/images/editorial/campaign-1.jpg",
    imageAlt:
      "Close editorial crop of gold embroidery on a warm neutral fabric",
    href: "/collections/women/luxury",
    cta: "Explore Luxury",
  },
  {
    id: "everyday-edit",
    eyebrow: "The Everyday Edit",
    title: "Quiet pieces, worn often.",
    description:
      "Clean lines and comfortable fabrics for the pace of now.",
    image: "/images/editorial/campaign-2.jpg",
    imageAlt:
      "Editorial detail of relaxed everyday tailoring in soft stone tones",
    href: "/collections/men/clothes",
    cta: "Shop Men",
  },
];

export const HOME_INTRO: IntroBlock = {
  eyebrow: "Introducing",
  title: "New arrivals",
  description:
    "A new chapter of soft neutrals, delicate embroidery, and pieces designed to move with you — from the first celebration of the season to the quiet days in between.",
  href: "/collections?tag=new-arrival",
  cta: "View All New Arrivals",
};

export const HOME_PILLAR_SPOTLIGHTS: readonly PillarSpotlight[] = [
  {
    pillar: "women",
    eyebrow: "For Her",
    title: "Softly stated, never overlooked.",
    description:
      "Unstitched fabrics, ready-to-wear ease, and occasion pieces with an heirloom feel.",
    image: "/images/categories/women-luxury.jpg",
    imageAlt:
      "Woman in an embroidered luxury outfit photographed in warm editorial light",
    href: "/collections/women",
    cta: "Explore Women",
  },
  {
    pillar: "men",
    eyebrow: "For Him",
    title: "Considered essentials, quietly confident.",
    description:
      "Clean tailoring, comfortable fabrics, and a measured approach to occasion dressing.",
    image: "/images/categories/men-clothes.jpg",
    imageAlt:
      "Man in a tailored kurta and waistcoat against a muted stone background",
    href: "/collections/men",
    cta: "Explore Men",
  },
  {
    pillar: "children",
    eyebrow: "For Little Ones",
    title: "Made for celebration and play.",
    description:
      "Festive favourites and easy everyday pieces designed for little moments and big days.",
    image: "/images/categories/children-kids-festive.jpg",
    imageAlt:
      "Child in a festive embroidered outfit photographed in soft natural light",
    href: "/collections/children",
    cta: "Explore Children",
  },
];

export const HOME_JOURNEY: JourneyBlock = {
  eyebrow: "Join Our Journey",
  title: "Where tradition meets modern elegance.",
  description:
    "Julhas Collection is built around a simple idea: clothes should feel as considered as they look. Explore the full collection and find the pieces that feel like you.",
  image: "/images/editorial/journey.jpg",
  imageAlt:
    "Editorial still life of draped fabric, embroidery, and warm stone textures",
  href: "/collections",
  cta: "Explore Collection",
};

export const HOME_MARQUEE_PHRASE =
  "Premium Quality, Responsibly Sourced";
