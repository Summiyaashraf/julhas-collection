import Link from "next/link";

import { SearchIcon } from "@/components/ui/icons";
import { buildFilterHref, clearFilters } from "@/lib/filters/params";
import type { ProductFilters } from "@/lib/catalog/types";

export interface EmptyResultsProps {
  pathname: string;
  filters: ProductFilters;
  suggestions?: readonly { label: string; href: string }[];
}

export function EmptyResults({
  pathname,
  filters,
  suggestions = [],
}: EmptyResultsProps) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-400">
        <SearchIcon size={20} />
      </span>
      <h2 className="mt-6 font-display text-2xl text-ink">
        No pieces found
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
        Nothing in the current collection matches your filters. Try removing a
        filter or exploring another category.
      </p>
      <Link
        href={buildFilterHref(pathname, clearFilters(filters))}
        className="mt-8 border border-ink bg-ink px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-50 transition-colors hover:bg-transparent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Clear all filters
      </Link>
      {suggestions.length > 0 ? (
        <div className="mt-12">
          <p className="eyebrow text-stone-500">Explore</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <li key={suggestion.href}>
                <Link
                  href={suggestion.href}
                  className="border border-stone-300 px-4 py-2 text-xs text-stone-700 transition-colors hover:border-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {suggestion.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
