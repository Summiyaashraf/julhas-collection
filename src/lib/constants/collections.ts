export type PillarSlug = "women" | "men" | "children";

export interface Subcategory {
  slug: string;
  label: string;
  href: string;
  image: string;
  description: string;
}

export interface Pillar {
  slug: PillarSlug;
  label: string;
  title: string;
  href: string;
  image: string;
  description: string;
  subcategories: readonly Subcategory[];
}

export const PILLARS: readonly Pillar[] = [
  {
    slug: "women",
    label: "Women",
    title: "Women",
    href: "/collections/women",
    image: "/images/categories/women.jpg",
    description:
      "Timeless silhouettes, considered details, and effortless elegance for every occasion.",
    subcategories: [
      {
        slug: "unstitched",
        label: "Unstitched",
        href: "/collections/women/unstitched",
        image: "/images/categories/women-unstitched.jpg",
        description:
          "Premium fabrics and embroidered pieces, made to be tailored to you.",
      },
      {
        slug: "ready-to-wear",
        label: "Ready To Wear",
        href: "/collections/women/ready-to-wear",
        image: "/images/categories/women-ready-to-wear.jpg",
        description:
          "Ready-to-wear pieces designed for ease, movement, and modern dressing.",
      },
      {
        slug: "luxury",
        label: "Luxury",
        href: "/collections/women/luxury",
        image: "/images/categories/women-luxury.jpg",
        description:
          "Occasion wear with intricate embroidery and elevated finishes.",
      },
      {
        slug: "fragrances",
        label: "Fragrances",
        href: "/collections/women/fragrances",
        image: "/images/categories/women-fragrances.jpg",
        description:
          "Warm, layered scents for everyday rituals and special evenings.",
      },
    ],
  },
  {
    slug: "men",
    label: "Men",
    title: "Men",
    href: "/collections/men",
    image: "/images/categories/men.jpg",
    description:
      "Refined essentials, classic tailoring, and signature fragrances.",
    subcategories: [
      {
        slug: "clothes",
        label: "Clothes",
        href: "/collections/men/clothes",
        image: "/images/categories/men-clothes.jpg",
        description:
          "Kurtas, waistcoats, and tailored sets for everyday and occasion wear.",
      },
      {
        slug: "fragrances",
        label: "Fragrances",
        href: "/collections/men/fragrances",
        image: "/images/categories/men-fragrances.jpg",
        description:
          "Deep woods, amber, and oud for a confident signature.",
      },
    ],
  },
  {
    slug: "children",
    label: "Children",
    title: "Children",
    href: "/collections/children",
    image: "/images/categories/children.jpg",
    description:
      "Festive favourites and easy everyday pieces for little ones.",
    subcategories: [
      {
        slug: "kids-festive",
        label: "Kids Festive",
        href: "/collections/children/kids-festive",
        image: "/images/categories/children-kids-festive.jpg",
        description:
          "Embroidered occasion wear for celebrations big and small.",
      },
      {
        slug: "casuals",
        label: "Casuals",
        href: "/collections/children/casuals",
        image: "/images/categories/children-casuals.jpg",
        description:
          "Soft, breathable everyday pieces made for play.",
      },
      {
        slug: "accessories",
        label: "Accessories",
        href: "/collections/children/accessories",
        image: "/images/categories/children-accessories.jpg",
        description: "Finishing touches for little looks.",
      },
    ],
  },
];

export const PILLAR_SLUGS: readonly PillarSlug[] = PILLARS.map(
  (pillar) => pillar.slug,
);

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((pillar) => pillar.slug === slug);
}

export function getSubcategory(
  pillarSlug: string,
  subcategorySlug: string,
): Subcategory | undefined {
  return getPillar(pillarSlug)?.subcategories.find(
    (subcategory) => subcategory.slug === subcategorySlug,
  );
}

export const ALL_SUBCATEGORIES: readonly Subcategory[] = PILLARS.flatMap(
  (pillar) => pillar.subcategories,
);

export const COLLECTION_PATHS: readonly string[] = [
  "/collections",
  ...PILLARS.map((pillar) => pillar.href),
  ...ALL_SUBCATEGORIES.map((subcategory) => subcategory.href),
];
