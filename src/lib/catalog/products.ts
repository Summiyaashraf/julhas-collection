import type {
  Product,
  ProductColor,
  ProductImage,
  ProductTag,
  ProductVariant,
} from "./types";

type ProductInput = Omit<Product, "currency" | "images" | "variants">;

const STOCK_PATTERN = [8, 5, 0, 3, 6, 2, 0, 4, 7, 1] as const;

function buildImages(
  slug: string,
  title: string,
  subtitle?: string,
): ProductImage[] {
  return [1, 2, 3].map((index) => {
    const view = String(index).padStart(2, "0");
    const label = subtitle ? `${title} in ${subtitle}` : title;

    return {
      src: `/images/products/${slug}/${view}.jpg`,
      alt: `${label} — view ${index}`,
    };
  });
}

function buildVariants(
  productId: string,
  sizes: readonly string[],
  colors: readonly ProductColor[],
): ProductVariant[] {
  const colorOptions: readonly (ProductColor | null)[] =
    colors.length > 0 ? colors : [null];

  return sizes.flatMap((size, sizeIndex) =>
    colorOptions.map((color, colorIndex) => {
      const index = sizeIndex * colorOptions.length + colorIndex;
      const stock = STOCK_PATTERN[index % STOCK_PATTERN.length];
      const colorSuffix = color
        ? `-${color.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
        : "";

      return {
        id: `${productId}-${index + 1}${colorSuffix}`,
        sku: `JL-${productId.replace("prd-", "")}-${String(index + 1).padStart(2, "0")}`,
        size,
        color: color?.name ?? null,
        stock,
      };
    }),
  );
}

function createProduct(input: ProductInput): Product {
  return {
    ...input,
    currency: "PKR",
    images: buildImages(input.slug, input.title, input.subtitle),
    variants: buildVariants(input.id, input.sizes, input.colors),
  };
}

const ivory: ProductColor = { name: "Ivory", hex: "#F3EBDD" };
const cream: ProductColor = { name: "Cream", hex: "#F6F0E6" };
const sand: ProductColor = { name: "Sand", hex: "#D8C3A5" };
const sage: ProductColor = { name: "Sage", hex: "#A8B5A2" };
const blush: ProductColor = { name: "Blush", hex: "#E8C9C4" };
const mocha: ProductColor = { name: "Mocha", hex: "#8B6F5A" };
const gold: ProductColor = { name: "Gold", hex: "#C6A15B" };
const ochre: ProductColor = { name: "Ochre", hex: "#C58B3D" };
const midnight: ProductColor = { name: "Midnight", hex: "#232B3A" };
const plum: ProductColor = { name: "Deep Plum", hex: "#4A2C3D" };
const rose: ProductColor = { name: "Rose", hex: "#C98F8F" };
const emerald: ProductColor = { name: "Emerald", hex: "#2F5D50" };
const black: ProductColor = { name: "Black", hex: "#1C1A18" };
const charcoal: ProductColor = { name: "Charcoal", hex: "#3A3A3A" };
const navy: ProductColor = { name: "Navy", hex: "#24324A" };
const blue: ProductColor = { name: "Blue", hex: "#6E8FA8" };

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"] as const;
const MENS_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
const KIDS_SIZES = ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] as const;
const FRAGRANCE_SIZES = ["50ml", "100ml"] as const;
const ONE_SIZE = ["One Size"] as const;
const UNSTITCHED_SIZE = ["Unstitched"] as const;

const CLOTHING_CARE =
  "Dry clean recommended. Do not bleach. Iron on low heat. Store on a padded hanger.";
const SHIPPING_COPY =
  "Ships within 2–4 working days across Pakistan. Delivery timelines may vary for remote areas.";

export const PRODUCTS: readonly Product[] = [
  createProduct({
    id: "prd-001",
    slug: "3-piece-unstitched-printed-lawn-ivory",
    title: "3 Piece Unstitched Printed Lawn",
    subtitle: "Ivory",
    shortDescription:
      "A breathable three-piece lawn set finished with a delicate all-over print.",
    description:
      "Cut from premium printed lawn, this unstitched three-piece set is designed for warm days and easy tailoring. The shirt, trouser, and dupatta pair a soft ivory ground with a fine botanical print for an effortless everyday look.",
    pillar: "women",
    subcategory: "unstitched",
    subcategoryLabel: "Unstitched",
    price: 3899,
    compareAtPrice: 3990,
    tags: ["sale", "bestseller"],
    sizes: UNSTITCHED_SIZE,
    colors: [ivory, sand],
    fabric: "Premium printed lawn",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Unstitched fabric — shirt, trouser, and dupatta included.",
    featured: true,
    createdAt: "2026-08-12",
  }),
  createProduct({
    id: "prd-002",
    slug: "3-piece-unstitched-embroidered-lawn-sage",
    title: "3 Piece Unstitched Embroidered Lawn",
    subtitle: "Sage",
    shortDescription:
      "Soft sage lawn with tonal embroidery and a coordinating printed dupatta.",
    description:
      "An unstitched three-piece set in a muted sage tone, detailed with tonal embroidery across the front and finished with a gently printed dupatta. Designed to be tailored exactly to you.",
    pillar: "women",
    subcategory: "unstitched",
    subcategoryLabel: "Unstitched",
    price: 4299,
    tags: ["new-arrival"],
    sizes: UNSTITCHED_SIZE,
    colors: [sage, cream],
    fabric: "Embroidered lawn",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Unstitched fabric — shirt, trouser, and dupatta included.",
    featured: true,
    createdAt: "2026-10-10",
  }),
  createProduct({
    id: "prd-003",
    slug: "2-piece-unstitched-embroidered-lawn-blush",
    title: "2 Piece Unstitched Embroidered Lawn",
    subtitle: "Blush",
    shortDescription:
      "A two-piece unstitched lawn set with fine embroidery in a soft blush palette.",
    description:
      "Delicate embroidery and a calm blush ground make this two-piece lawn set an easy choice for daytime occasions. The shirt and trouser are ready to be tailored to your preferred silhouette.",
    pillar: "women",
    subcategory: "unstitched",
    subcategoryLabel: "Unstitched",
    price: 3199,
    tags: ["new-arrival", "bestseller"],
    sizes: UNSTITCHED_SIZE,
    colors: [blush, ivory],
    fabric: "Embroidered lawn",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Unstitched fabric — shirt and trouser included.",
    featured: false,
    createdAt: "2026-09-28",
  }),
  createProduct({
    id: "prd-004",
    slug: "3-piece-unstitched-jacquard-suit-mocha",
    title: "3 Piece Unstitched Jacquard Suit",
    subtitle: "Mocha",
    shortDescription:
      "Textured jacquard in a warm mocha tone with a tonal embroidered finish.",
    description:
      "A rich jacquard weave brings quiet texture to this three-piece unstitched suit. The warm mocha palette is lifted by tonal embroidery and a soft coordinating dupatta.",
    pillar: "women",
    subcategory: "unstitched",
    subcategoryLabel: "Unstitched",
    price: 4990,
    compareAtPrice: 5490,
    tags: ["sale"],
    sizes: UNSTITCHED_SIZE,
    colors: [mocha, gold],
    fabric: "Jacquard",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Unstitched fabric — shirt, trouser, and dupatta included.",
    featured: false,
    createdAt: "2026-07-15",
  }),
  createProduct({
    id: "prd-005",
    slug: "2-piece-stitched-embroidered-suit-ochre",
    title: "2 Piece Stitched Embroidered Suit",
    subtitle: "Ochre",
    shortDescription:
      "A ready-to-wear two-piece suit with intricate embroidery and a relaxed drape.",
    description:
      "An easy, polished silhouette in a warm ochre tone. The embroidered shirt is paired with a comfortable straight trouser for a look that moves from day to evening.",
    pillar: "women",
    subcategory: "ready-to-wear",
    subcategoryLabel: "Ready To Wear",
    price: 7490,
    compareAtPrice: 7990,
    tags: ["sale"],
    sizes: CLOTHING_SIZES,
    colors: [ochre, ivory],
    fabric: "Embroidered cotton silk",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Relaxed fit. Model wears size S.",
    featured: true,
    createdAt: "2026-09-22",
  }),
  createProduct({
    id: "prd-006",
    slug: "ready-to-wear-silk-kurta-set-ivory",
    title: "Ready To Wear Silk Kurta Set",
    subtitle: "Ivory",
    shortDescription:
      "A fluid silk kurta set with a clean neckline and effortless movement.",
    description:
      "Cut from soft silk in a warm ivory shade, this kurta set is designed for understated occasions. A clean neckline and fluid drape keep the look refined and comfortable.",
    pillar: "women",
    subcategory: "ready-to-wear",
    subcategoryLabel: "Ready To Wear",
    price: 6490,
    tags: ["new-arrival"],
    sizes: CLOTHING_SIZES,
    colors: [ivory, sand],
    fabric: "Silk",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Relaxed fit. Model wears size S.",
    featured: false,
    createdAt: "2026-10-18",
  }),
  createProduct({
    id: "prd-007",
    slug: "ready-to-wear-embroidered-chiffon-suit-midnight",
    title: "Ready To Wear Embroidered Chiffon Suit",
    subtitle: "Midnight",
    shortDescription:
      "A deep midnight chiffon suit with delicate silver-toned embroidery.",
    description:
      "An occasion-ready three-piece in deep midnight chiffon. Fine embroidery catches the light across the shirt, while the flowing dupatta adds a soft finish.",
    pillar: "women",
    subcategory: "ready-to-wear",
    subcategoryLabel: "Ready To Wear",
    price: 8990,
    tags: ["bestseller"],
    sizes: ["S", "M", "L", "XL"],
    colors: [midnight, plum],
    fabric: "Embroidered chiffon",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Relaxed fit. Model wears size S.",
    featured: true,
    createdAt: "2026-08-05",
  }),
  createProduct({
    id: "prd-008",
    slug: "luxury-3-piece-embroidered-formal-suit-gold",
    title: "Luxury 3 Piece Embroidered Formal Suit",
    subtitle: "Gold",
    shortDescription:
      "An heirloom-inspired formal suit with layered gold embroidery.",
    description:
      "Our most detailed formal offering, built around layered gold embroidery and a softly structured silhouette. Designed for weddings, celebrations, and evenings that deserve something special.",
    pillar: "women",
    subcategory: "luxury",
    subcategoryLabel: "Luxury",
    price: 14990,
    tags: ["new-arrival"],
    sizes: ["S", "M", "L", "XL"],
    colors: [gold, ivory],
    fabric: "Embroidered organza and silk",
    care: "Dry clean only. Store in the supplied garment bag.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Tailored fit. Model wears size S.",
    featured: true,
    createdAt: "2026-10-01",
  }),
  createProduct({
    id: "prd-009",
    slug: "luxury-3-piece-organza-suit-rose",
    title: "Luxury 3 Piece Organza Suit",
    subtitle: "Rose",
    shortDescription:
      "Airy organza layers in a muted rose with hand-finished detailing.",
    description:
      "Soft organza layers and a muted rose palette give this formal three-piece a romantic, weightless feel. Hand-finished details add depth without losing the lightness.",
    pillar: "women",
    subcategory: "luxury",
    subcategoryLabel: "Luxury",
    price: 12990,
    compareAtPrice: 13990,
    tags: ["sale"],
    sizes: ["S", "M", "L", "XL"],
    colors: [rose, blush],
    fabric: "Embroidered organza",
    care: "Dry clean only. Store in the supplied garment bag.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Tailored fit. Model wears size S.",
    featured: false,
    createdAt: "2026-07-20",
  }),
  createProduct({
    id: "prd-010",
    slug: "luxury-3-piece-velvet-suit-emerald",
    title: "Luxury 3 Piece Velvet Suit",
    subtitle: "Emerald",
    shortDescription:
      "Deep emerald velvet with tonal embroidery and a statement dupatta.",
    description:
      "A rich velvet three-piece in deep emerald, finished with tonal embroidery and a statement dupatta. Designed for evening celebrations and cooler months.",
    pillar: "women",
    subcategory: "luxury",
    subcategoryLabel: "Luxury",
    price: 13990,
    tags: ["new-arrival"],
    sizes: ["S", "M", "L", "XL"],
    colors: [emerald, black],
    fabric: "Embroidered velvet",
    care: "Dry clean only. Store in the supplied garment bag.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Tailored fit. Model wears size S.",
    featured: false,
    createdAt: "2026-10-12",
  }),
  createProduct({
    id: "prd-011",
    slug: "oud-royale-eau-de-parfum",
    title: "Oud Royale Eau De Parfum",
    subtitle: "Oud, rose, amber",
    shortDescription:
      "A warm, resinous oud softened with rose and a base of amber.",
    description:
      "Oud Royale opens with rose and saffron before settling into a warm heart of oud and amber. A long-wearing fragrance for evenings and special occasions.",
    pillar: "women",
    subcategory: "fragrances",
    subcategoryLabel: "Fragrances",
    price: 5490,
    tags: ["bestseller"],
    sizes: FRAGRANCE_SIZES,
    colors: [],
    fabric: "Eau de parfum",
    care: "Store away from direct sunlight. Keep the cap closed when not in use.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Available in 50ml and 100ml.",
    featured: true,
    createdAt: "2026-06-18",
  }),
  createProduct({
    id: "prd-012",
    slug: "amber-musk-eau-de-parfum",
    title: "Amber Musk Eau De Parfum",
    subtitle: "Amber, musk, vanilla",
    shortDescription:
      "A soft amber-musk scent with a warm, skin-like finish.",
    description:
      "A quiet, comforting fragrance built around amber, white musk, and a touch of vanilla. Designed to sit close to the skin and linger through the day.",
    pillar: "women",
    subcategory: "fragrances",
    subcategoryLabel: "Fragrances",
    price: 3990,
    compareAtPrice: 4490,
    tags: ["sale"],
    sizes: FRAGRANCE_SIZES,
    colors: [],
    fabric: "Eau de parfum",
    care: "Store away from direct sunlight. Keep the cap closed when not in use.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Available in 50ml and 100ml.",
    featured: false,
    createdAt: "2026-08-30",
  }),
  createProduct({
    id: "prd-013",
    slug: "mens-classic-shalwar-kameez-charcoal",
    title: "Men's Classic Shalwar Kameez",
    subtitle: "Charcoal",
    shortDescription:
      "A clean, classic shalwar kameez in a versatile charcoal wash.",
    description:
      "A well-cut classic in a soft charcoal fabric. The relaxed silhouette and clean detailing make it an easy choice for everyday wear and informal occasions.",
    pillar: "men",
    subcategory: "clothes",
    subcategoryLabel: "Clothes",
    price: 5990,
    tags: ["bestseller"],
    sizes: MENS_SIZES,
    colors: [charcoal, ivory],
    fabric: "Cotton blend",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Classic fit. Model wears size M.",
    featured: true,
    createdAt: "2026-05-10",
  }),
  createProduct({
    id: "prd-014",
    slug: "mens-embroidered-kurta-ivory",
    title: "Men's Embroidered Kurta",
    subtitle: "Ivory",
    shortDescription:
      "An ivory kurta with subtle tonal embroidery along the placket.",
    description:
      "A refined kurta in warm ivory, finished with subtle tonal embroidery along the placket and cuffs. Pair with tailored trousers or a classic shalwar.",
    pillar: "men",
    subcategory: "clothes",
    subcategoryLabel: "Clothes",
    price: 6990,
    tags: ["new-arrival"],
    sizes: MENS_SIZES,
    colors: [ivory, sand],
    fabric: "Cotton silk",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Regular fit. Model wears size M.",
    featured: false,
    createdAt: "2026-10-16",
  }),
  createProduct({
    id: "prd-015",
    slug: "mens-waistcoat-sand",
    title: "Men's Waistcoat",
    subtitle: "Sand",
    shortDescription:
      "A softly structured waistcoat in a warm sand tone.",
    description:
      "Cut with a clean, modern line, this sand waistcoat adds definition to kurtas and shirts alike. A versatile layer for festive and formal dressing.",
    pillar: "men",
    subcategory: "clothes",
    subcategoryLabel: "Clothes",
    price: 4990,
    tags: ["new-arrival"],
    sizes: MENS_SIZES,
    colors: [sand, charcoal],
    fabric: "Textured cotton",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Tailored fit. Model wears size M.",
    featured: false,
    createdAt: "2026-09-12",
  }),
  createProduct({
    id: "prd-016",
    slug: "mens-cotton-kurta-sage",
    title: "Men's Cotton Kurta",
    subtitle: "Sage",
    shortDescription:
      "A breathable cotton kurta in a muted sage green.",
    description:
      "An easy everyday kurta in soft, breathable cotton. The muted sage shade and simple silhouette make it a versatile warm-weather staple.",
    pillar: "men",
    subcategory: "clothes",
    subcategoryLabel: "Clothes",
    price: 3990,
    compareAtPrice: 4490,
    tags: ["sale"],
    sizes: MENS_SIZES,
    colors: [sage, ivory],
    fabric: "Cotton",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Regular fit. Model wears size M.",
    featured: false,
    createdAt: "2026-07-08",
  }),
  createProduct({
    id: "prd-017",
    slug: "mens-formal-kurta-set-navy",
    title: "Men's Formal Kurta Set",
    subtitle: "Navy",
    shortDescription:
      "A tonal navy kurta set with a clean, occasion-ready finish.",
    description:
      "A polished two-piece set in deep navy. The tailored kurta and matching trouser are finished with minimal detailing for an understated formal look.",
    pillar: "men",
    subcategory: "clothes",
    subcategoryLabel: "Clothes",
    price: 8990,
    tags: ["bestseller"],
    sizes: MENS_SIZES,
    colors: [navy, black],
    fabric: "Cotton silk",
    care: CLOTHING_CARE,
    shipping: SHIPPING_COPY,
    sizeGuide: "Tailored fit. Model wears size M.",
    featured: false,
    createdAt: "2026-06-25",
  }),
  createProduct({
    id: "prd-018",
    slug: "mens-oud-noir-eau-de-parfum",
    title: "Men's Oud Noir Eau De Parfum",
    subtitle: "Oud, leather, spice",
    shortDescription:
      "A dark, smoky oud with leather and a measured spice trail.",
    description:
      "Oud Noir is built around smoky oud, soft leather, and a measured spice blend. A confident evening fragrance with a deep, lasting finish.",
    pillar: "men",
    subcategory: "fragrances",
    subcategoryLabel: "Fragrances",
    price: 5990,
    tags: ["new-arrival"],
    sizes: FRAGRANCE_SIZES,
    colors: [],
    fabric: "Eau de parfum",
    care: "Store away from direct sunlight. Keep the cap closed when not in use.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Available in 50ml and 100ml.",
    featured: false,
    createdAt: "2026-10-05",
  }),
  createProduct({
    id: "prd-019",
    slug: "mens-amber-wood-eau-de-parfum",
    title: "Men's Amber Wood Eau De Parfum",
    subtitle: "Amber, cedar, vetiver",
    shortDescription:
      "Warm amber and cedar grounded with a clean vetiver base.",
    description:
      "A warm woody fragrance that balances amber and cedar with a clean vetiver base. Easy to wear through the day and into the evening.",
    pillar: "men",
    subcategory: "fragrances",
    subcategoryLabel: "Fragrances",
    price: 4990,
    compareAtPrice: 5490,
    tags: ["sale"],
    sizes: FRAGRANCE_SIZES,
    colors: [],
    fabric: "Eau de parfum",
    care: "Store away from direct sunlight. Keep the cap closed when not in use.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Available in 50ml and 100ml.",
    featured: false,
    createdAt: "2026-08-18",
  }),
  createProduct({
    id: "prd-020",
    slug: "mens-citrus-musk-eau-de-toilette",
    title: "Men's Citrus Musk Eau De Toilette",
    subtitle: "Citrus, neroli, musk",
    shortDescription:
      "A fresh citrus opening softened by neroli and clean musk.",
    description:
      "Bright citrus and neroli open this everyday fragrance, settling into a clean musk base. Light, refreshing, and easy to layer.",
    pillar: "men",
    subcategory: "fragrances",
    subcategoryLabel: "Fragrances",
    price: 2990,
    tags: ["bestseller"],
    sizes: FRAGRANCE_SIZES,
    colors: [],
    fabric: "Eau de toilette",
    care: "Store away from direct sunlight. Keep the cap closed when not in use.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Available in 50ml and 100ml.",
    featured: false,
    createdAt: "2026-05-22",
  }),
  createProduct({
    id: "prd-021",
    slug: "kids-festive-embroidered-suit-gold",
    title: "Kids Festive Embroidered Suit",
    subtitle: "Gold",
    shortDescription:
      "A celebration-ready kids suit with soft gold embroidery.",
    description:
      "Designed for little celebrations, this festive suit pairs a softly embroidered shirt with a comfortable trouser. The gold detailing adds a special finish without feeling fussy.",
    pillar: "children",
    subcategory: "kids-festive",
    subcategoryLabel: "Kids Festive",
    price: 5990,
    tags: ["new-arrival"],
    sizes: KIDS_SIZES,
    colors: [gold, ivory],
    fabric: "Embroidered cotton silk",
    care: "Gentle hand wash or dry clean. Do not bleach.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Comfort fit. See size chart for age ranges.",
    featured: true,
    createdAt: "2026-10-14",
  }),
  createProduct({
    id: "prd-022",
    slug: "kids-festive-lawn-suit-rose",
    title: "Kids Festive Lawn Suit",
    subtitle: "Rose",
    shortDescription:
      "A soft rose lawn suit with delicate festive detailing.",
    description:
      "A lightweight festive suit in a soft rose lawn, finished with delicate embroidery and a comfortable cut for all-day wear.",
    pillar: "children",
    subcategory: "kids-festive",
    subcategoryLabel: "Kids Festive",
    price: 4490,
    tags: ["bestseller"],
    sizes: KIDS_SIZES,
    colors: [rose, blush],
    fabric: "Embroidered lawn",
    care: "Gentle hand wash or dry clean. Do not bleach.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Comfort fit. See size chart for age ranges.",
    featured: false,
    createdAt: "2026-08-26",
  }),
  createProduct({
    id: "prd-023",
    slug: "kids-festive-kurta-set-ivory",
    title: "Kids Festive Kurta Set",
    subtitle: "Ivory",
    shortDescription:
      "An ivory kurta set with tonal embroidery for special occasions.",
    description:
      "A clean ivory kurta set with tonal embroidery and a comfortable, breathable finish. Designed for Eid, family gatherings, and celebrations.",
    pillar: "children",
    subcategory: "kids-festive",
    subcategoryLabel: "Kids Festive",
    price: 4990,
    compareAtPrice: 5490,
    tags: ["sale"],
    sizes: KIDS_SIZES,
    colors: [ivory, sand],
    fabric: "Cotton silk",
    care: "Gentle hand wash or dry clean. Do not bleach.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Comfort fit. See size chart for age ranges.",
    featured: false,
    createdAt: "2026-07-30",
  }),
  createProduct({
    id: "prd-024",
    slug: "kids-casual-cotton-suit-sage",
    title: "Kids Casual Cotton Suit",
    subtitle: "Sage",
    shortDescription:
      "A soft cotton two-piece made for easy everyday wear.",
    description:
      "Breathable cotton and a relaxed fit make this two-piece suit an everyday favourite. The muted sage shade works easily with sandals and sneakers.",
    pillar: "children",
    subcategory: "casuals",
    subcategoryLabel: "Casuals",
    price: 2990,
    tags: ["new-arrival"],
    sizes: KIDS_SIZES,
    colors: [sage, blue],
    fabric: "Cotton",
    care: "Machine wash cold with similar colours. Do not bleach.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Comfort fit. See size chart for age ranges.",
    featured: false,
    createdAt: "2026-09-30",
  }),
  createProduct({
    id: "prd-025",
    slug: "kids-casual-printed-kurta-blue",
    title: "Kids Casual Printed Kurta",
    subtitle: "Blue",
    shortDescription:
      "A lightweight printed kurta in a soft, wearable blue.",
    description:
      "An easy printed kurta in breathable cotton. The soft blue tone and simple shape make it a versatile piece for school breaks and weekend plans.",
    pillar: "children",
    subcategory: "casuals",
    subcategoryLabel: "Casuals",
    price: 2490,
    tags: ["bestseller"],
    sizes: KIDS_SIZES,
    colors: [blue, ivory],
    fabric: "Printed cotton",
    care: "Machine wash cold with similar colours. Do not bleach.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Comfort fit. See size chart for age ranges.",
    featured: false,
    createdAt: "2026-06-12",
  }),
  createProduct({
    id: "prd-026",
    slug: "kids-embroidered-cap-ivory",
    title: "Kids Embroidered Cap",
    subtitle: "Ivory",
    shortDescription:
      "A soft embroidered cap for finishing festive and casual looks.",
    description:
      "A light, comfortable cap with subtle embroidery. An easy finishing touch for Eid outfits, family photos, and everyday wear.",
    pillar: "children",
    subcategory: "accessories",
    subcategoryLabel: "Accessories",
    price: 1990,
    tags: ["new-arrival"],
    sizes: ONE_SIZE,
    colors: [ivory, rose],
    fabric: "Cotton",
    care: "Spot clean with a damp cloth. Air dry.",
    shipping: SHIPPING_COPY,
    sizeGuide: "One size with an adjustable back.",
    featured: false,
    createdAt: "2026-10-08",
  }),
  createProduct({
    id: "prd-027",
    slug: "kids-beaded-hair-accessory-set",
    title: "Kids Beaded Hair Accessory Set",
    subtitle: "Gold and rose",
    shortDescription:
      "A set of hand-finished beaded hair accessories for little celebrations.",
    description:
      "A small set of beaded hair accessories in warm gold and rose tones. Designed to add a delicate finishing touch to festive and everyday looks.",
    pillar: "children",
    subcategory: "accessories",
    subcategoryLabel: "Accessories",
    price: 2190,
    compareAtPrice: 2490,
    tags: ["sale"],
    sizes: ONE_SIZE,
    colors: [gold, rose],
    fabric: "Beaded fabric",
    care: "Wipe gently with a soft dry cloth. Store in the supplied pouch.",
    shipping: SHIPPING_COPY,
    sizeGuide: "Set of three hair accessories.",
    featured: false,
    createdAt: "2026-08-02",
  }),
];

export const PRODUCT_TAGS_IN_USE = Array.from(
  new Set(PRODUCTS.flatMap((product) => product.tags)),
) as ProductTag[];

export const PRODUCT_SLUGS: readonly string[] = PRODUCTS.map(
  (product) => product.slug,
);

export const FEATURED_PRODUCTS: readonly Product[] = PRODUCTS.filter(
  (product) => product.featured,
);
