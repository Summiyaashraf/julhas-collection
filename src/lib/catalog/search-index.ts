import type { PillarSlug, ProductTag } from "./types";

export interface SearchIndexEntry {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  pillar: PillarSlug;
  tags: readonly ProductTag[];
  keywords: readonly string[];
  thumbnail: string;
  price: number;
}

export const DEFAULT_SEARCH_LIMIT = 5;

export const SEARCH_INDEX: readonly SearchIndexEntry[] = [
  {
    id: "prd-001",
    slug: "3-piece-unstitched-printed-lawn-ivory",
    title: "3 Piece Unstitched Printed Lawn",
    category: "Women",
    subcategory: "Unstitched",
    pillar: "women",
    tags: ["sale", "bestseller"],
    keywords: [
      "lawn",
      "unstitched",
      "printed",
      "three piece",
      "summer",
      "floral",
      "ivory",
      "women",
    ],
    thumbnail: "/images/products/3-piece-unstitched-printed-lawn-ivory/01.jpg",
    price: 3899,
  },
  {
    id: "prd-002",
    slug: "3-piece-unstitched-embroidered-lawn-sage",
    title: "3 Piece Unstitched Embroidered Lawn",
    category: "Women",
    subcategory: "Unstitched",
    pillar: "women",
    tags: ["new-arrival"],
    keywords: [
      "lawn",
      "unstitched",
      "embroidered",
      "sage",
      "three piece",
      "women",
    ],
    thumbnail:
      "/images/products/3-piece-unstitched-embroidered-lawn-sage/01.jpg",
    price: 4299,
  },
  {
    id: "prd-003",
    slug: "2-piece-unstitched-embroidered-lawn-blush",
    title: "2 Piece Unstitched Embroidered Lawn",
    category: "Women",
    subcategory: "Unstitched",
    pillar: "women",
    tags: ["new-arrival", "bestseller"],
    keywords: [
      "lawn",
      "unstitched",
      "embroidered",
      "blush",
      "two piece",
      "women",
    ],
    thumbnail:
      "/images/products/2-piece-unstitched-embroidered-lawn-blush/01.jpg",
    price: 3199,
  },
  {
    id: "prd-004",
    slug: "3-piece-unstitched-jacquard-suit-mocha",
    title: "3 Piece Unstitched Jacquard Suit",
    category: "Women",
    subcategory: "Unstitched",
    pillar: "women",
    tags: ["sale"],
    keywords: [
      "jacquard",
      "unstitched",
      "mocha",
      "three piece",
      "formal",
      "women",
    ],
    thumbnail: "/images/products/3-piece-unstitched-jacquard-suit-mocha/01.jpg",
    price: 4990,
  },
  {
    id: "prd-005",
    slug: "2-piece-stitched-embroidered-suit-ochre",
    title: "2 Piece Stitched Embroidered Suit",
    category: "Women",
    subcategory: "Ready To Wear",
    pillar: "women",
    tags: ["sale"],
    keywords: [
      "stitched",
      "embroidered",
      "ochre",
      "ready to wear",
      "two piece",
      "women",
    ],
    thumbnail:
      "/images/products/2-piece-stitched-embroidered-suit-ochre/01.jpg",
    price: 7490,
  },
  {
    id: "prd-006",
    slug: "ready-to-wear-silk-kurta-set-ivory",
    title: "Ready To Wear Silk Kurta Set",
    category: "Women",
    subcategory: "Ready To Wear",
    pillar: "women",
    tags: ["new-arrival"],
    keywords: ["silk", "kurta", "ivory", "ready to wear", "women"],
    thumbnail: "/images/products/ready-to-wear-silk-kurta-set-ivory/01.jpg",
    price: 6490,
  },
  {
    id: "prd-007",
    slug: "ready-to-wear-embroidered-chiffon-suit-midnight",
    title: "Ready To Wear Embroidered Chiffon Suit",
    category: "Women",
    subcategory: "Ready To Wear",
    pillar: "women",
    tags: ["bestseller"],
    keywords: [
      "chiffon",
      "embroidered",
      "midnight",
      "ready to wear",
      "formal",
      "women",
    ],
    thumbnail:
      "/images/products/ready-to-wear-embroidered-chiffon-suit-midnight/01.jpg",
    price: 8990,
  },
  {
    id: "prd-008",
    slug: "luxury-3-piece-embroidered-formal-suit-gold",
    title: "Luxury 3 Piece Embroidered Formal Suit",
    category: "Women",
    subcategory: "Luxury",
    pillar: "women",
    tags: ["new-arrival"],
    keywords: [
      "luxury",
      "formal",
      "embroidered",
      "gold",
      "wedding",
      "women",
    ],
    thumbnail:
      "/images/products/luxury-3-piece-embroidered-formal-suit-gold/01.jpg",
    price: 14990,
  },
  {
    id: "prd-009",
    slug: "luxury-3-piece-organza-suit-rose",
    title: "Luxury 3 Piece Organza Suit",
    category: "Women",
    subcategory: "Luxury",
    pillar: "women",
    tags: ["sale"],
    keywords: ["luxury", "organza", "rose", "formal", "wedding", "women"],
    thumbnail: "/images/products/luxury-3-piece-organza-suit-rose/01.jpg",
    price: 12990,
  },
  {
    id: "prd-010",
    slug: "luxury-3-piece-velvet-suit-emerald",
    title: "Luxury 3 Piece Velvet Suit",
    category: "Women",
    subcategory: "Luxury",
    pillar: "women",
    tags: ["new-arrival"],
    keywords: ["luxury", "velvet", "emerald", "winter", "formal", "women"],
    thumbnail: "/images/products/luxury-3-piece-velvet-suit-emerald/01.jpg",
    price: 13990,
  },
  {
    id: "prd-011",
    slug: "oud-royale-eau-de-parfum",
    title: "Oud Royale Eau De Parfum",
    category: "Women",
    subcategory: "Fragrances",
    pillar: "women",
    tags: ["bestseller"],
    keywords: ["oud", "rose", "amber", "perfume", "fragrance", "women"],
    thumbnail: "/images/products/oud-royale-eau-de-parfum/01.jpg",
    price: 5490,
  },
  {
    id: "prd-012",
    slug: "amber-musk-eau-de-parfum",
    title: "Amber Musk Eau De Parfum",
    category: "Women",
    subcategory: "Fragrances",
    pillar: "women",
    tags: ["sale"],
    keywords: ["amber", "musk", "vanilla", "perfume", "fragrance", "women"],
    thumbnail: "/images/products/amber-musk-eau-de-parfum/01.jpg",
    price: 3990,
  },
  {
    id: "prd-013",
    slug: "mens-classic-shalwar-kameez-charcoal",
    title: "Men's Classic Shalwar Kameez",
    category: "Men",
    subcategory: "Clothes",
    pillar: "men",
    tags: ["bestseller"],
    keywords: ["shalwar kameez", "charcoal", "classic", "mens", "cotton"],
    thumbnail: "/images/products/mens-classic-shalwar-kameez-charcoal/01.jpg",
    price: 5990,
  },
  {
    id: "prd-014",
    slug: "mens-embroidered-kurta-ivory",
    title: "Men's Embroidered Kurta",
    category: "Men",
    subcategory: "Clothes",
    pillar: "men",
    tags: ["new-arrival"],
    keywords: ["kurta", "embroidered", "ivory", "mens", "festive"],
    thumbnail: "/images/products/mens-embroidered-kurta-ivory/01.jpg",
    price: 6990,
  },
  {
    id: "prd-015",
    slug: "mens-waistcoat-sand",
    title: "Men's Waistcoat",
    category: "Men",
    subcategory: "Clothes",
    pillar: "men",
    tags: ["new-arrival"],
    keywords: ["waistcoat", "sand", "mens", "formal", "layer"],
    thumbnail: "/images/products/mens-waistcoat-sand/01.jpg",
    price: 4990,
  },
  {
    id: "prd-016",
    slug: "mens-cotton-kurta-sage",
    title: "Men's Cotton Kurta",
    category: "Men",
    subcategory: "Clothes",
    pillar: "men",
    tags: ["sale"],
    keywords: ["kurta", "cotton", "sage", "mens", "casual"],
    thumbnail: "/images/products/mens-cotton-kurta-sage/01.jpg",
    price: 3990,
  },
  {
    id: "prd-017",
    slug: "mens-formal-kurta-set-navy",
    title: "Men's Formal Kurta Set",
    category: "Men",
    subcategory: "Clothes",
    pillar: "men",
    tags: ["bestseller"],
    keywords: ["kurta set", "navy", "mens", "formal"],
    thumbnail: "/images/products/mens-formal-kurta-set-navy/01.jpg",
    price: 8990,
  },
  {
    id: "prd-018",
    slug: "mens-oud-noir-eau-de-parfum",
    title: "Men's Oud Noir Eau De Parfum",
    category: "Men",
    subcategory: "Fragrances",
    pillar: "men",
    tags: ["new-arrival"],
    keywords: ["oud", "leather", "spice", "perfume", "mens", "fragrance"],
    thumbnail: "/images/products/mens-oud-noir-eau-de-parfum/01.jpg",
    price: 5990,
  },
  {
    id: "prd-019",
    slug: "mens-amber-wood-eau-de-parfum",
    title: "Men's Amber Wood Eau De Parfum",
    category: "Men",
    subcategory: "Fragrances",
    pillar: "men",
    tags: ["sale"],
    keywords: ["amber", "cedar", "vetiver", "perfume", "mens", "fragrance"],
    thumbnail: "/images/products/mens-amber-wood-eau-de-parfum/01.jpg",
    price: 4990,
  },
  {
    id: "prd-020",
    slug: "mens-citrus-musk-eau-de-toilette",
    title: "Men's Citrus Musk Eau De Toilette",
    category: "Men",
    subcategory: "Fragrances",
    pillar: "men",
    tags: ["bestseller"],
    keywords: [
      "citrus",
      "neroli",
      "musk",
      "mens",
      "perfume",
      "fragrance",
    ],
    thumbnail: "/images/products/mens-citrus-musk-eau-de-toilette/01.jpg",
    price: 2990,
  },
  {
    id: "prd-021",
    slug: "kids-festive-embroidered-suit-gold",
    title: "Kids Festive Embroidered Suit",
    category: "Children",
    subcategory: "Kids Festive",
    pillar: "children",
    tags: ["new-arrival"],
    keywords: ["kids", "festive", "embroidered", "gold", "eid", "children"],
    thumbnail: "/images/products/kids-festive-embroidered-suit-gold/01.jpg",
    price: 5990,
  },
  {
    id: "prd-022",
    slug: "kids-festive-lawn-suit-rose",
    title: "Kids Festive Lawn Suit",
    category: "Children",
    subcategory: "Kids Festive",
    pillar: "children",
    tags: ["bestseller"],
    keywords: ["kids", "festive", "lawn", "rose", "eid", "children"],
    thumbnail: "/images/products/kids-festive-lawn-suit-rose/01.jpg",
    price: 4490,
  },
  {
    id: "prd-023",
    slug: "kids-festive-kurta-set-ivory",
    title: "Kids Festive Kurta Set",
    category: "Children",
    subcategory: "Kids Festive",
    pillar: "children",
    tags: ["sale"],
    keywords: ["kids", "festive", "kurta", "ivory", "eid", "children"],
    thumbnail: "/images/products/kids-festive-kurta-set-ivory/01.jpg",
    price: 4990,
  },
  {
    id: "prd-024",
    slug: "kids-casual-cotton-suit-sage",
    title: "Kids Casual Cotton Suit",
    category: "Children",
    subcategory: "Casuals",
    pillar: "children",
    tags: ["new-arrival"],
    keywords: ["kids", "casual", "cotton", "sage", "everyday", "children"],
    thumbnail: "/images/products/kids-casual-cotton-suit-sage/01.jpg",
    price: 2990,
  },
  {
    id: "prd-025",
    slug: "kids-casual-printed-kurta-blue",
    title: "Kids Casual Printed Kurta",
    category: "Children",
    subcategory: "Casuals",
    pillar: "children",
    tags: ["bestseller"],
    keywords: ["kids", "casual", "kurta", "blue", "printed", "children"],
    thumbnail: "/images/products/kids-casual-printed-kurta-blue/01.jpg",
    price: 2490,
  },
  {
    id: "prd-026",
    slug: "kids-embroidered-cap-ivory",
    title: "Kids Embroidered Cap",
    category: "Children",
    subcategory: "Accessories",
    pillar: "children",
    tags: ["new-arrival"],
    keywords: ["kids", "cap", "embroidered", "accessory", "ivory", "children"],
    thumbnail: "/images/products/kids-embroidered-cap-ivory/01.jpg",
    price: 1990,
  },
  {
    id: "prd-027",
    slug: "kids-beaded-hair-accessory-set",
    title: "Kids Beaded Hair Accessory Set",
    category: "Children",
    subcategory: "Accessories",
    pillar: "children",
    tags: ["sale"],
    keywords: ["kids", "hair accessory", "beaded", "gold", "rose", "children"],
    thumbnail: "/images/products/kids-beaded-hair-accessory-set/01.jpg",
    price: 2190,
  },
];

export function normalizeSearchQuery(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getSearchFields(entry: SearchIndexEntry): readonly string[] {
  return [
    entry.title,
    entry.category,
    entry.subcategory,
    ...entry.tags,
    ...entry.keywords,
  ].map(normalizeSearchQuery);
}

function scoreEntry(
  entry: SearchIndexEntry,
  phrase: string,
  tokens: readonly string[],
): number {
  const title = normalizeSearchQuery(entry.title);
  const category = normalizeSearchQuery(
    `${entry.category} ${entry.subcategory}`,
  );
  const tags = entry.tags.map(normalizeSearchQuery);
  const keywords = entry.keywords.map(normalizeSearchQuery);

  let score = 0;

  if (title === phrase) {
    score += 100;
  } else if (title.startsWith(phrase)) {
    score += 40;
  } else if (title.includes(phrase)) {
    score += 20;
  }

  for (const token of tokens) {
    if (title.split(" ").includes(token)) {
      score += 8;
    } else if (title.includes(token)) {
      score += 4;
    }

    if (tags.some((tag) => tag.includes(token))) {
      score += 3;
    }

    if (keywords.some((keyword) => keyword.includes(token))) {
      score += 2;
    }

    if (category.includes(token)) {
      score += 1;
    }
  }

  if (entry.tags.includes("bestseller")) {
    score += 1;
  }

  return score;
}

export function searchCatalogIndex(
  query: string,
  limit = DEFAULT_SEARCH_LIMIT,
): readonly SearchIndexEntry[] {
  const phrase = normalizeSearchQuery(query);

  if (!phrase) {
    return [];
  }

  const tokens = phrase.split(" ").filter(Boolean);
  const safeLimit = Number.isFinite(limit)
    ? Math.max(0, Math.floor(limit))
    : DEFAULT_SEARCH_LIMIT;

  if (safeLimit === 0) {
    return [];
  }

  return SEARCH_INDEX.filter((entry) => {
    const fields = getSearchFields(entry);

    return tokens.every((token) =>
      fields.some((field) => field.includes(token)),
    );
  })
    .map((entry) => ({
      entry,
      score: scoreEntry(entry, phrase, tokens),
    }))
    .sort(
      (a, b) =>
        b.score - a.score || a.entry.title.localeCompare(b.entry.title),
    )
    .slice(0, safeLimit)
    .map((result) => result.entry);
}
