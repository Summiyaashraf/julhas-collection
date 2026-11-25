"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { TAG_LABELS } from "@/components/collection/listing-labels";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDownIcon, FilterIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { formatPriceRange } from "@/lib/catalog/format";
import type {
  ProductFacets,
  ProductFilters,
  ProductTag,
} from "@/lib/catalog/types";
import {
  buildFilterHref,
  clearFilters,
  countActiveFilters,
  hasActiveFilters,
  resetPage,
} from "@/lib/filters/params";
import { slugify } from "@/lib/utils/slug";
import { cn } from "@/lib/utils/cn";

export interface FilterPanelProps {
  pathname: string;
  filters: ProductFilters;
  facets: ProductFacets;
  categoryLinks?: readonly { label: string; href: string }[];
}

function toggleValue<T extends string>(
  values: readonly T[] | undefined,
  value: T,
): T[] | undefined {
  if (!values) {
    return [value];
  }

  const next = values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];

  return next.length > 0 ? next : undefined;
}

function toggleTagFilter(
  filters: ProductFilters,
  tag: ProductTag,
): ProductFilters {
  return { ...filters, tags: toggleValue(filters.tags, tag) };
}

function toggleSizeFilter(
  filters: ProductFilters,
  size: string,
): ProductFilters {
  return { ...filters, sizes: toggleValue(filters.sizes, size) };
}

function toggleColorFilter(
  filters: ProductFilters,
  color: string,
): ProductFilters {
  return { ...filters, colors: toggleValue(filters.colors, color) };
}

function parsePriceInput(value: string): number | undefined {
  const trimmed = value.trim();

  if (!/^\d+$/.test(trimmed)) {
    return undefined;
  }

  return Number.parseInt(trimmed, 10);
}

export function FilterPanel({
  pathname,
  filters,
  facets,
  categoryLinks = [],
}: FilterPanelProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [minPriceInput, setMinPriceInput] = useState(
    filters.minPrice !== undefined ? String(filters.minPrice) : "",
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    filters.maxPrice !== undefined ? String(filters.maxPrice) : "",
  );

  const applyFilters = (next: ProductFilters) => {
    router.push(buildFilterHref(pathname, resetPage(next)));
  };

  const handlePriceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let min = parsePriceInput(minPriceInput);
    let max = parsePriceInput(maxPriceInput);

    if (min !== undefined && max !== undefined && min > max) {
      [min, max] = [max, min];
      setMinPriceInput(String(min));
      setMaxPriceInput(String(max));
    }

    applyFilters({ ...filters, minPrice: min, maxPrice: max });
  };

  const clearPrice = () => {
    setMinPriceInput("");
    setMaxPriceInput("");
    applyFilters({ ...filters, minPrice: undefined, maxPrice: undefined });
  };

  const hasPrice = filters.minPrice !== undefined || filters.maxPrice !== undefined;
  const activeCount = countActiveFilters(filters);

  return (
    <aside aria-label="Product filters" className="lg:sticky lg:top-28 lg:self-start">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="filter-panel-body"
        className="flex min-h-12 w-full items-center justify-between gap-3 border border-stone-300 bg-stone-50 px-4 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden"
      >
        <span className="inline-flex items-center gap-2">
          <FilterIcon size={16} aria-hidden="true" />
          Filters
          {activeCount > 0 ? ` (${activeCount})` : ""}
        </span>
        <ChevronDownIcon
          size={14}
          aria-hidden="true"
          className={cn("transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <div
        id="filter-panel-body"
        className={cn(
          "mt-6 space-y-8 border-b border-stone-200 pb-8 lg:mt-0 lg:block lg:border-b-0 lg:pb-0",
          !open && "hidden",
        )}
      >
        {hasActiveFilters(filters) ? (
          <Link
            href={buildFilterHref(pathname, clearFilters(filters))}
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500 underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Clear all ({activeCount})
          </Link>
        ) : null}

        {categoryLinks.length > 0 ? (
          <section aria-label="Category">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
              Category
            </h2>
            <ul className="mt-4 space-y-2">
              {categoryLinks.map((link) => {
                const isCurrent = link.href === pathname;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn(
                        "text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                        isCurrent
                          ? "font-medium text-gold"
                          : "text-stone-600 hover:text-ink",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <section aria-label="Price">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
            Price
          </h2>
          <form onSubmit={handlePriceSubmit} className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="filter-min-price"
                label="Min (Rs.)"
                type="number"
                inputMode="numeric"
                min={0}
                value={minPriceInput}
                placeholder={String(facets.minPrice)}
                onChange={(event) => setMinPriceInput(event.target.value)}
              />
              <Input
                id="filter-max-price"
                label="Max (Rs.)"
                type="number"
                inputMode="numeric"
                min={0}
                value={maxPriceInput}
                placeholder={String(facets.maxPrice)}
                onChange={(event) => setMaxPriceInput(event.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Apply
              </button>
              {hasPrice ? (
                <button
                  type="button"
                  onClick={clearPrice}
                  className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500 underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <p className="text-xs text-stone-500">
              Prices from {formatPriceRange(facets.minPrice, facets.maxPrice)}
            </p>
          </form>
        </section>

        <section aria-label="Availability">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
            Availability
          </h2>
          <div className="mt-4">
            <Checkbox
              id="filter-in-stock"
              label="In stock only"
              checked={filters.inStockOnly ?? false}
              onChange={() =>
                applyFilters({ ...filters, inStockOnly: !filters.inStockOnly })
              }
            />
          </div>
        </section>

        {facets.sizes.length > 0 ? (
          <section aria-label="Size">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
              Size
            </h2>
            <ul className="mt-4 space-y-2">
              {facets.sizes.map((size) => (
                <li key={size}>
                  <Checkbox
                    id={`filter-size-${slugify(size)}`}
                    label={size}
                    checked={filters.sizes?.includes(size) ?? false}
                    onChange={() => applyFilters(toggleSizeFilter(filters, size))}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {facets.colors.length > 0 ? (
          <section aria-label="Colour">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
              Colour
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {facets.colors.map((color) => {
                const active = filters.colors?.includes(color.name) ?? false;

                return (
                  <li key={color.name}>
                    <button
                      type="button"
                      onClick={() => applyFilters(toggleColorFilter(filters, color.name))}
                      aria-pressed={active}
                      title={color.name}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                        active
                          ? "border-gold"
                          : "border-stone-300 hover:border-stone-500",
                      )}
                    >
                      <span
                        className="h-5 w-5 rounded-full border border-stone-300/50"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="sr-only">{color.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {facets.tags.length > 0 ? (
          <section aria-label="Collections">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
              Collections
            </h2>
            <ul className="mt-4 space-y-2">
              {facets.tags.map((tag) => (
                <li key={tag}>
                  <Checkbox
                    id={`filter-tag-${tag}`}
                    label={TAG_LABELS[tag]}
                    checked={filters.tags?.includes(tag) ?? false}
                    onChange={() => applyFilters(toggleTagFilter(filters, tag))}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </aside>
  );
}
