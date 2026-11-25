import { PILLARS } from "@/lib/constants/collections";
import { PRODUCTS } from "./products";
import type { PillarSlug } from "./types";

export interface CatalogCategory {
  slug: string;
  label: string;
  href: string;
  image: string;
  description: string;
  pillar: PillarSlug;
  type: "pillar" | "subcategory";
  productCount: number;
}

function countProducts(pillar: PillarSlug, subcategory?: string): number {
  return PRODUCTS.filter(
    (product) =>
      product.pillar === pillar &&
      (subcategory === undefined || product.subcategory === subcategory),
  ).length;
}

export const PILLAR_CATEGORIES: readonly CatalogCategory[] = PILLARS.map(
  (pillar) => ({
    slug: pillar.slug,
    label: pillar.label,
    href: pillar.href,
    image: pillar.image,
    description: pillar.description,
    pillar: pillar.slug,
    type: "pillar",
    productCount: countProducts(pillar.slug),
  }),
);

export const SUBCATEGORY_CATEGORIES: readonly CatalogCategory[] =
  PILLARS.flatMap((pillar) =>
    pillar.subcategories.map((subcategory) => ({
      slug: subcategory.slug,
      label: subcategory.label,
      href: subcategory.href,
      image: subcategory.image,
      description: subcategory.description,
      pillar: pillar.slug,
      type: "subcategory" as const,
      productCount: countProducts(pillar.slug, subcategory.slug),
    })),
  );

export const CATALOG_CATEGORIES: readonly CatalogCategory[] = [
  ...PILLAR_CATEGORIES,
  ...SUBCATEGORY_CATEGORIES,
];

export function getPillarCategory(
  pillarSlug: string,
): CatalogCategory | undefined {
  return PILLAR_CATEGORIES.find((category) => category.slug === pillarSlug);
}

export function getSubcategoryCategory(
  pillarSlug: string,
  subcategorySlug: string,
): CatalogCategory | undefined {
  return SUBCATEGORY_CATEGORIES.find(
    (category) =>
      category.pillar === pillarSlug && category.slug === subcategorySlug,
  );
}

export function getCategoryByHref(
  href: string,
): CatalogCategory | undefined {
  return CATALOG_CATEGORIES.find((category) => category.href === href);
}
