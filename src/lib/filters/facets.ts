import {
  PRODUCT_TAGS,
  type Product,
  type ProductColor,
  type ProductFacets,
} from "@/lib/catalog/types";

const STANDARD_SIZE_ORDER = new Map<string, number>([
  ["XS", 10],
  ["S", 20],
  ["M", 30],
  ["L", 40],
  ["XL", 50],
  ["XXL", 60],
]);

function sizeRank(size: string): number {
  const trimmed = size.trim();
  const standard = STANDARD_SIZE_ORDER.get(trimmed.toUpperCase());

  if (standard !== undefined) {
    return standard;
  }

  const ageRange = /^(\d+)\s*-\s*(\d+)\s*Y$/i.exec(trimmed);

  if (ageRange) {
    return 100 + Number.parseInt(ageRange[1], 10);
  }

  const volume = /^(\d+)\s*ml$/i.exec(trimmed);

  if (volume) {
    return 200 + Number.parseInt(volume[1], 10);
  }

  if (/^one size$/i.test(trimmed)) {
    return 900;
  }

  if (/^unstitched$/i.test(trimmed)) {
    return 910;
  }

  return 500;
}

function compareSizes(a: string, b: string): number {
  return sizeRank(a) - sizeRank(b) || a.localeCompare(b);
}

function uniqueStrings(values: readonly string[]): string[] {
  const seen = new Set<string>();

  return values.filter((value) => {
    const key = value.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function uniqueColors(colors: readonly ProductColor[]): ProductColor[] {
  const seen = new Set<string>();
  const unique: ProductColor[] = [];

  for (const color of colors) {
    const key = color.name.toLowerCase();

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(color);
    }
  }

  return unique;
}

export function getProductFacets(
  products: readonly Product[],
): ProductFacets {
  const prices = products.map((product) => product.price);

  return {
    sizes: uniqueStrings(
      products.flatMap((product) => product.sizes),
    ).sort(compareSizes),
    colors: uniqueColors(
      products.flatMap((product) => product.colors),
    ),
    tags: PRODUCT_TAGS.filter((tag) =>
      products.some((product) => product.tags.includes(tag)),
    ),
    minPrice: prices.length > 0 ? Math.min(...prices) : 0,
    maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
  };
}
