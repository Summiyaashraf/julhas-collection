import {
  ALL_SUBCATEGORIES,
  getSubcategory,
  PILLAR_SLUGS,
  type PillarSlug,
} from "@/lib/constants/collections";
import {
  PRODUCT_SORT_OPTIONS,
  PRODUCT_TAGS,
  type ProductFilters,
  type ProductSort,
  type ProductTag,
} from "@/lib/catalog/types";

export type SearchParamsInput =
  | URLSearchParams
  | Readonly<Record<string, string | readonly string[] | undefined>>;

const IN_STOCK_VALUES = new Set(["in-stock", "in_stock", "instock"]);
const MAX_SEARCH_LENGTH = 120;

function splitValues(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function readValues(input: SearchParamsInput, key: string): string[] {
  if (input instanceof URLSearchParams) {
    return input.getAll(key).flatMap(splitValues);
  }

  const raw = input[key];

  if (raw === undefined) {
    return [];
  }

  const values = typeof raw === "string" ? [raw] : raw;

  return values.flatMap(splitValues);
}

function readFirst(
  input: SearchParamsInput,
  key: string,
): string | undefined {
  if (input instanceof URLSearchParams) {
    return input.get(key) ?? undefined;
  }

  const raw = input[key];

  if (raw === undefined) {
    return undefined;
  }

  return typeof raw === "string" ? raw : raw[0];
}

function uniqueValues(values: readonly string[]): string[] {
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

function parsePillar(value?: string): PillarSlug | undefined {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return undefined;
  }

  return PILLAR_SLUGS.find((slug) => slug === normalized);
}

function isKnownSubcategory(
  pillar: PillarSlug | undefined,
  subcategory: string,
): boolean {
  if (pillar) {
    return getSubcategory(pillar, subcategory) !== undefined;
  }

  return ALL_SUBCATEGORIES.some((item) => item.slug === subcategory);
}

function parseInteger(
  value: string | undefined,
  minimum = 0,
): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!/^\d+$/.test(trimmed)) {
    return undefined;
  }

  const parsed = Number.parseInt(trimmed, 10);

  return parsed >= minimum ? parsed : undefined;
}

export function parseFilterParams(
  input: SearchParamsInput,
): ProductFilters {
  const filters: ProductFilters = {};
  const pillar = parsePillar(readFirst(input, "pillar"));
  const subcategory = readFirst(input, "subcategory")
    ?.trim()
    .toLowerCase();

  if (pillar) {
    filters.pillar = pillar;
  }

  if (subcategory && isKnownSubcategory(pillar, subcategory)) {
    filters.subcategory = subcategory;
  }

  const tags = uniqueValues(
    [...readValues(input, "tag"), ...readValues(input, "tags")].map((tag) =>
      tag.toLowerCase(),
    ),
  ).filter((tag): tag is ProductTag =>
    PRODUCT_TAGS.includes(tag as ProductTag),
  );

  if (tags.length > 0) {
    filters.tags = tags;
  }

  const sizes = uniqueValues(readValues(input, "size"));

  if (sizes.length > 0) {
    filters.sizes = sizes;
  }

  const colors = uniqueValues(readValues(input, "color"));

  if (colors.length > 0) {
    filters.colors = colors;
  }

  const minPrice = parseInteger(readFirst(input, "minPrice"));
  const maxPrice = parseInteger(readFirst(input, "maxPrice"));
  const hasBothPrices =
    minPrice !== undefined && maxPrice !== undefined;

  if (minPrice !== undefined) {
    filters.minPrice = minPrice;
  }

  if (maxPrice !== undefined) {
    filters.maxPrice = maxPrice;
  }

  if (
    hasBothPrices &&
    minPrice !== undefined &&
    maxPrice !== undefined &&
    minPrice > maxPrice
  ) {
    filters.minPrice = maxPrice;
    filters.maxPrice = minPrice;
  }

  const stock =
    readFirst(input, "stock") ?? readFirst(input, "availability");

  if (stock && IN_STOCK_VALUES.has(stock.trim().toLowerCase())) {
    filters.inStockOnly = true;
  }

  const search = readFirst(input, "q")?.trim().slice(0, MAX_SEARCH_LENGTH);

  if (search) {
    filters.search = search;
  }

  const sort = readFirst(input, "sort")?.trim().toLowerCase();

  if (
    sort &&
    PRODUCT_SORT_OPTIONS.includes(sort as ProductSort)
  ) {
    filters.sort = sort as ProductSort;
  }

  const page = parseInteger(readFirst(input, "page"), 1);

  if (page !== undefined) {
    filters.page = page;
  }

  return filters;
}

export function toFilterSearchParams(
  filters: ProductFilters,
): URLSearchParams {
  const params = new URLSearchParams();

  function appendValues(key: string, values?: readonly string[]): void {
    if (!values) {
      return;
    }

    for (const value of uniqueValues(values)) {
      params.append(key, value);
    }
  }

  if (filters.pillar) {
    params.set("pillar", filters.pillar);
  }

  if (filters.subcategory) {
    params.set("subcategory", filters.subcategory);
  }

  appendValues("tag", filters.tags);

  if (filters.sizes) {
    appendValues("size", filters.sizes);
  }

  if (filters.colors) {
    appendValues("color", filters.colors);
  }

  if (filters.minPrice !== undefined) {
    params.set("minPrice", String(filters.minPrice));
  }

  if (filters.maxPrice !== undefined) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  if (filters.inStockOnly) {
    params.set("stock", "in-stock");
  }

  if (filters.search) {
    params.set("q", filters.search.trim());
  }

  if (filters.sort && filters.sort !== "featured") {
    params.set("sort", filters.sort);
  }

  if (filters.page !== undefined && filters.page > 1) {
    params.set("page", String(filters.page));
  }

  return params;
}

export function serializeFilterParams(filters: ProductFilters): string {
  return toFilterSearchParams(filters).toString();
}

export function buildFilterHref(
  pathname: string,
  filters: ProductFilters,
): string {
  const query = serializeFilterParams(filters);

  return query ? `${pathname}?${query}` : pathname;
}

export function resetPage(filters: ProductFilters): ProductFilters {
  return { ...filters, page: 1 };
}

export function omitCategoryFilters(
  filters: ProductFilters,
): ProductFilters {
  const rest = { ...filters };

  delete rest.pillar;
  delete rest.subcategory;

  return rest;
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return Boolean(
    filters.pillar ||
      filters.subcategory ||
      filters.tags?.length ||
      filters.sizes?.length ||
      filters.colors?.length ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined ||
      filters.inStockOnly ||
      filters.search,
  );
}

export function countActiveFilters(filters: ProductFilters): number {
  return (
    (filters.pillar ? 1 : 0) +
    (filters.subcategory ? 1 : 0) +
    (filters.tags?.length ?? 0) +
    (filters.sizes?.length ?? 0) +
    (filters.colors?.length ?? 0) +
    (filters.minPrice !== undefined || filters.maxPrice !== undefined
      ? 1
      : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.search ? 1 : 0)
  );
}

export interface ClearFilterOptions {
  preserveSearch?: boolean;
  preserveCategory?: boolean;
}

export function clearFilters(
  filters: ProductFilters,
  options: ClearFilterOptions = {},
): ProductFilters {
  const cleared: ProductFilters = { page: 1 };

  if (options.preserveSearch && filters.search) {
    cleared.search = filters.search;
  }

  if (options.preserveCategory) {
    if (filters.pillar) {
      cleared.pillar = filters.pillar;
    }

    if (filters.subcategory) {
      cleared.subcategory = filters.subcategory;
    }
  }

  if (filters.sort) {
    cleared.sort = filters.sort;
  }

  return cleared;
}
