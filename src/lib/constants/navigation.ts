import { PILLARS, type PillarSlug } from "./collections";

export interface NavigationLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: readonly NavigationLink[];
}

export interface MegaMenuPromo {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
}

export interface MegaMenu {
  columns: readonly MegaMenuColumn[];
  promo: MegaMenuPromo;
}

export interface MainNavItem extends NavigationLink {
  menu?: MegaMenu;
}

const DISCOVER_LINKS: readonly NavigationLink[] = [
  { label: "New Arrivals", href: "/collections?tag=new-arrival" },
  { label: "Sale", href: "/collections?tag=sale" },
];

const MEGA_MENU_PROMOS: Record<PillarSlug, MegaMenuPromo> = {
  women: {
    eyebrow: "The New Edit",
    title: "Festive, reimagined",
    description:
      "Layered embroideries, soft neutrals, and occasion pieces made to be remembered.",
    image: "/images/editorial/campaign-1.jpg",
    href: "/collections/women/luxury",
    cta: "Explore Luxury",
  },
  men: {
    eyebrow: "Considered Essentials",
    title: "Everyday refinement",
    description:
      "Clean lines, comfortable fabrics, and finishing details for a quietly confident look.",
    image: "/images/categories/men.jpg",
    href: "/collections/men/clothes",
    cta: "Shop Men",
  },
  children: {
    eyebrow: "Little Celebrations",
    title: "Festive for little ones",
    description:
      "Soft, joyful pieces designed for celebrations, play, and everything in between.",
    image: "/images/categories/children.jpg",
    href: "/collections/children/kids-festive",
    cta: "Shop Kids Festive",
  },
};

function getPillarSubcategoryLinks(slug: PillarSlug): NavigationLink[] {
  const pillar = PILLARS.find((item) => item.slug === slug);

  if (!pillar) {
    return [];
  }

  return pillar.subcategories.map((subcategory) => ({
    label: subcategory.label,
    href: subcategory.href,
  }));
}

function buildMegaMenu(slug: PillarSlug, shopAllLabel: string): MegaMenu {
  return {
    columns: [
      {
        title: "Collections",
        links: getPillarSubcategoryLinks(slug),
      },
      {
        title: "Discover",
        links: [
          {
            label: shopAllLabel,
            href: `/collections/${slug}`,
          },
          ...DISCOVER_LINKS,
        ],
      },
    ],
    promo: MEGA_MENU_PROMOS[slug],
  };
}

export const MAIN_NAVIGATION: readonly MainNavItem[] = [
  {
    label: "Women",
    href: "/collections/women",
    menu: buildMegaMenu("women", "Shop All Women"),
  },
  {
    label: "Men",
    href: "/collections/men",
    menu: buildMegaMenu("men", "Shop All Men"),
  },
  {
    label: "Children",
    href: "/collections/children",
    menu: buildMegaMenu("children", "Shop All Children"),
  },
  {
    label: "New Arrivals",
    href: "/collections?tag=new-arrival",
  },
  {
    label: "Sale",
    href: "/collections?tag=sale",
  },
];

export const MOBILE_SECONDARY_LINKS: readonly NavigationLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Track Order", href: "/track-order" },
  { label: "Account", href: "/account" },
];

export const FOOTER_NAVIGATION = {
  shop: [
    { label: "All Products", href: "/collections" },
    { label: "Women", href: "/collections/women" },
    { label: "Men", href: "/collections/men" },
    { label: "Children", href: "/collections/children" },
    { label: "New Arrivals", href: "/collections?tag=new-arrival" },
    { label: "Sale", href: "/collections?tag=sale" },
  ],
  customerCare: [
    { label: "Privacy Policy", href: "/policies/privacy-policy" },
    { label: "Return & Refund Policy", href: "/policies/refund-policy" },
    { label: "Terms & Conditions", href: "/policies/terms-conditions" },
  ],
  information: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Track Order", href: "/track-order" },
    { label: "Search", href: "/search" },
  ],
} as const satisfies Record<string, readonly NavigationLink[]>;

export const POLICY_SLUGS = [
  "privacy-policy",
  "refund-policy",
  "terms-conditions",
] as const;

export type PolicySlug = (typeof POLICY_SLUGS)[number];
