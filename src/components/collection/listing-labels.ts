import type { ProductSort, ProductTag } from "@/lib/catalog/types";

export const TAG_LABELS: Record<ProductTag, string> = {
  "new-arrival": "New Arrivals",
  sale: "Sale",
  bestseller: "Bestseller",
};

export const SORT_LABELS: Record<ProductSort, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "best-selling": "Best Selling",
};
