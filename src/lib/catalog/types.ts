import type { PillarSlug } from "@/lib/constants/collections";

export type { PillarSlug };

export const PRODUCT_TAGS = ["new-arrival", "sale", "bestseller"] as const;

export type ProductTag = (typeof PRODUCT_TAGS)[number];

export const PRODUCT_SORT_OPTIONS = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "best-selling",
] as const;

export type ProductSort = (typeof PRODUCT_SORT_OPTIONS)[number];

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  color: string | null;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  description: string;
  pillar: PillarSlug;
  subcategory: string;
  subcategoryLabel: string;
  price: number;
  compareAtPrice?: number;
  currency: "PKR";
  tags: readonly ProductTag[];
  images: readonly ProductImage[];
  sizes: readonly string[];
  colors: readonly ProductColor[];
  variants: readonly ProductVariant[];
  fabric: string;
  care: string;
  shipping: string;
  sizeGuide?: string;
  featured: boolean;
  createdAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export type ProductSummary = Pick<
  Product,
  | "id"
  | "slug"
  | "title"
  | "subtitle"
  | "price"
  | "compareAtPrice"
  | "currency"
  | "tags"
  | "images"
  | "sizes"
  | "colors"
  | "variants"
  | "pillar"
  | "subcategory"
  | "subcategoryLabel"
  | "featured"
  | "createdAt"
>;

export interface ProductFilters {
  pillar?: PillarSlug;
  subcategory?: string;
  tags?: readonly ProductTag[];
  sizes?: readonly string[];
  colors?: readonly string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  search?: string;
  sort?: ProductSort;
  page?: number;
}

export interface ProductFacets {
  sizes: readonly string[];
  colors: readonly ProductColor[];
  tags: readonly ProductTag[];
  minPrice: number;
  maxPrice: number;
}

export interface PaginatedProducts {
  products: readonly Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
