import {
  getPillarCategory,
  getSubcategoryCategory,
  type CatalogCategory,
} from "./categories";
import { PRODUCTS, PRODUCT_SLUGS } from "./products";
import type {
  PillarSlug,
  Product,
  ProductSummary,
  ProductTag,
} from "./types";

function newestFirst(a: Product, b: Product): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function applyLimit(
  products: readonly Product[],
  limit?: number,
): readonly Product[] {
  if (limit === undefined) {
    return products;
  }

  if (!Number.isFinite(limit)) {
    return [];
  }

  return products.slice(0, Math.max(0, Math.floor(limit)));
}

export function getAllProducts(): readonly Product[] {
  return PRODUCTS;
}

export function getAllProductSlugs(): readonly string[] {
  return PRODUCT_SLUGS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getProductsByPillar(pillar: PillarSlug): readonly Product[] {
  return PRODUCTS.filter((product) => product.pillar === pillar);
}

export function getProductsBySubcategory(
  pillar: PillarSlug,
  subcategory: string,
): readonly Product[] {
  return PRODUCTS.filter(
    (product) =>
      product.pillar === pillar && product.subcategory === subcategory,
  );
}

export function getProductsByTag(tag: ProductTag): readonly Product[] {
  return PRODUCTS.filter((product) => product.tags.includes(tag));
}

export function getFeaturedProducts(limit?: number): readonly Product[] {
  return applyLimit(
    PRODUCTS.filter((product) => product.featured),
    limit,
  );
}

export function getNewArrivals(limit?: number): readonly Product[] {
  return applyLimit(
    PRODUCTS.filter((product) => product.tags.includes("new-arrival")).sort(
      newestFirst,
    ),
    limit,
  );
}

export function getSaleProducts(limit?: number): readonly Product[] {
  return applyLimit(
    PRODUCTS.filter((product) => product.tags.includes("sale")),
    limit,
  );
}

export function getBestsellers(limit?: number): readonly Product[] {
  return applyLimit(
    PRODUCTS.filter((product) => product.tags.includes("bestseller")),
    limit,
  );
}

export function getRelatedProducts(
  productOrSlug: Product | string,
  limit = 4,
): readonly Product[] {
  const product =
    typeof productOrSlug === "string"
      ? getProductBySlug(productOrSlug)
      : productOrSlug;

  if (!product) {
    return [];
  }

  const scored = PRODUCTS.filter((candidate) => candidate.id !== product.id)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) =>
        product.tags.includes(tag),
      ).length;

      return {
        product: candidate,
        score:
          (candidate.subcategory === product.subcategory ? 5 : 0) +
          (candidate.pillar === product.pillar ? 2 : 0) +
          (candidate.fabric === product.fabric ? 1 : 0) +
          sharedTags,
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort(
      (a, b) => b.score - a.score || newestFirst(a.product, b.product),
    );

  return applyLimit(
    scored.map((candidate) => candidate.product),
    limit,
  );
}

export function getCategory(
  pillarSlug: string,
  subcategorySlug?: string,
): CatalogCategory | undefined {
  return subcategorySlug
    ? getSubcategoryCategory(pillarSlug, subcategorySlug)
    : getPillarCategory(pillarSlug);
}

export function getCategoryProducts(
  pillarSlug: string,
  subcategorySlug?: string,
): readonly Product[] {
  const category = getCategory(pillarSlug, subcategorySlug);

  if (!category) {
    return [];
  }

  return PRODUCTS.filter(
    (product) =>
      product.pillar === category.pillar &&
      (category.type === "pillar" ||
        product.subcategory === category.slug),
  );
}

export function toProductSummary(product: Product): ProductSummary {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    subtitle: product.subtitle,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    currency: product.currency,
    tags: product.tags,
    images: product.images,
    sizes: product.sizes,
    colors: product.colors,
    variants: product.variants,
    pillar: product.pillar,
    subcategory: product.subcategory,
    subcategoryLabel: product.subcategoryLabel,
    featured: product.featured,
    createdAt: product.createdAt,
  };
}

export function getProductSummaries(
  products: readonly Product[] = PRODUCTS,
): readonly ProductSummary[] {
  return products.map(toProductSummary);
}
