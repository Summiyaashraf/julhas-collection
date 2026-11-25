import Link from "next/link";

import { TAG_LABELS } from "@/components/collection/listing-labels";
import { CloseIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/catalog/format";
import type { ProductFilters } from "@/lib/catalog/types";
import {
  buildFilterHref,
  clearFilters,
  resetPage,
} from "@/lib/filters/params";

export interface ActiveFiltersProps {
  pathname: string;
  filters: ProductFilters;
}

function withoutValue<T extends string>(
  values: readonly T[] | undefined,
  value: T,
): T[] | undefined {
  if (!values) {
    return undefined;
  }

  const next = values.filter((item) => item !== value);

  return next.length > 0 ? next : undefined;
}

function getPriceChipLabel(filters: ProductFilters): string | null {
  const { minPrice, maxPrice } = filters;

  if (minPrice !== undefined && maxPrice !== undefined) {
    return `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`;
  }

  if (minPrice !== undefined) {
    return `From ${formatPrice(minPrice)}`;
  }

  if (maxPrice !== undefined) {
    return `Up to ${formatPrice(maxPrice)}`;
  }

  return null;
}

export function ActiveFilters({ pathname, filters }: ActiveFiltersProps) {
  const chips: { key: string; label: string; href: string }[] = [];
  const removeHref = (next: ProductFilters) =>
    buildFilterHref(pathname, resetPage(next));

  for (const tag of filters.tags ?? []) {
    chips.push({
      key: `tag-${tag}`,
      label: TAG_LABELS[tag],
      href: removeHref({ ...filters, tags: withoutValue(filters.tags, tag) }),
    });
  }

  for (const size of filters.sizes ?? []) {
    chips.push({
      key: `size-${size}`,
      label: `Size: ${size}`,
      href: removeHref({ ...filters, sizes: withoutValue(filters.sizes, size) }),
    });
  }

  for (const color of filters.colors ?? []) {
    chips.push({
      key: `color-${color}`,
      label: color,
      href: removeHref({
        ...filters,
        colors: withoutValue(filters.colors, color),
      }),
    });
  }

  const priceLabel = getPriceChipLabel(filters);

  if (priceLabel) {
    chips.push({
      key: "price",
      label: priceLabel,
      href: removeHref({ ...filters, minPrice: undefined, maxPrice: undefined }),
    });
  }

  if (filters.inStockOnly) {
    chips.push({
      key: "in-stock",
      label: "In stock",
      href: removeHref({ ...filters, inStockOnly: undefined }),
    });
  }

  if (filters.search) {
    chips.push({
      key: "search",
      label: `“${filters.search}”`,
      href: removeHref({ ...filters, search: undefined }),
    });
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <ul aria-label="Active filters" className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <li key={chip.key}>
          <Link
            href={chip.href}
            className="inline-flex items-center gap-1.5 border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs text-stone-700 transition-colors hover:border-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span className="max-w-48 truncate">{chip.label}</span>
            <CloseIcon size={12} aria-hidden="true" />
            <span className="sr-only">Remove filter</span>
          </Link>
        </li>
      ))}
      <li>
        <Link
          href={buildFilterHref(pathname, clearFilters(filters))}
          className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500 underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Clear all
        </Link>
      </li>
    </ul>
  );
}
