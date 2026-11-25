import type {
  PaginatedProducts,
  Product,
  ProductFilters,
  ProductSort,
} from "@/lib/catalog/types";

export const DEFAULT_PAGE_SIZE = 12;

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function timestamp(value: string): number {
  return new Date(value).getTime();
}

function newestFirst(a: Product, b: Product): number {
  return timestamp(b.createdAt) - timestamp(a.createdAt);
}

function hasAvailableStock(product: Product): boolean {
  return product.variants.some((variant) => variant.stock > 0);
}

function matchesSelectedValues(
  available: readonly string[],
  selected: readonly string[],
): boolean {
  const normalizedAvailable = available.map(normalize);

  return selected.some((value) =>
    normalizedAvailable.includes(normalize(value)),
  );
}

function matchesSearch(product: Product, query: string): boolean {
  const tokens = normalize(query).split(" ").filter(Boolean);

  if (tokens.length === 0) {
    return true;
  }

  const haystack = normalize(
    [
      product.title,
      product.subtitle ?? "",
      product.shortDescription,
      product.description,
      product.pillar,
      product.subcategory,
      product.subcategoryLabel,
      product.fabric,
      ...product.tags,
      ...product.sizes,
      ...product.colors.map((color) => color.name),
    ].join(" "),
  );

  return tokens.every((token) => haystack.includes(token));
}

export function filterProducts(
  products: readonly Product[],
  filters: ProductFilters,
): readonly Product[] {
  return products.filter((product) => {
    if (filters.pillar && product.pillar !== filters.pillar) {
      return false;
    }

    if (
      filters.subcategory &&
      product.subcategory !== filters.subcategory
    ) {
      return false;
    }

    if (
      filters.tags?.length &&
      !filters.tags.some((tag) => product.tags.includes(tag))
    ) {
      return false;
    }

    if (
      filters.sizes?.length &&
      !matchesSelectedValues(product.sizes, filters.sizes)
    ) {
      return false;
    }

    if (
      filters.colors?.length &&
      !matchesSelectedValues(
        product.colors.flatMap((color) => [color.name, color.hex]),
        filters.colors,
      )
    ) {
      return false;
    }

    if (
      filters.minPrice !== undefined &&
      product.price < filters.minPrice
    ) {
      return false;
    }

    if (
      filters.maxPrice !== undefined &&
      product.price > filters.maxPrice
    ) {
      return false;
    }

    if (filters.inStockOnly && !hasAvailableStock(product)) {
      return false;
    }

    if (filters.search && !matchesSearch(product, filters.search)) {
      return false;
    }

    return true;
  });
}

export function sortProducts(
  products: readonly Product[],
  sort: ProductSort = "featured",
): readonly Product[] {
  const sorted = [...products];

  sorted.sort((a, b) => {
    switch (sort) {
      case "newest":
        return newestFirst(a, b) || a.title.localeCompare(b.title);

      case "price-asc":
        return a.price - b.price || newestFirst(a, b);

      case "price-desc":
        return b.price - a.price || newestFirst(a, b);

      case "best-selling": {
        const bestsellerDifference =
          Number(b.tags.includes("bestseller")) -
          Number(a.tags.includes("bestseller"));

        return (
          bestsellerDifference ||
          Number(b.featured) - Number(a.featured) ||
          newestFirst(a, b)
        );
      }

      case "featured":
      default:
        return (
          Number(b.featured) - Number(a.featured) || newestFirst(a, b)
        );
    }
  });

  return sorted;
}

export function paginateProducts(
  products: readonly Product[],
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): PaginatedProducts {
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0
      ? Math.floor(pageSize)
      : DEFAULT_PAGE_SIZE;
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const safePage = Number.isFinite(page)
    ? Math.min(Math.max(1, Math.floor(page)), totalPages)
    : 1;
  const start = (safePage - 1) * safePageSize;

  return {
    products: products.slice(start, start + safePageSize),
    total,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
  };
}

export function getProductListing(
  products: readonly Product[],
  filters: ProductFilters,
  pageSize = DEFAULT_PAGE_SIZE,
): PaginatedProducts {
  const filtered = filterProducts(products, filters);
  const sorted = sortProducts(filtered, filters.sort);

  return paginateProducts(sorted, filters.page ?? 1, pageSize);
}
