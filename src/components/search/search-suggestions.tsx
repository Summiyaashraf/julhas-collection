"use client";

import Image from "next/image";

import { formatPrice } from "@/lib/catalog/format";
import type { SearchIndexEntry } from "@/lib/catalog/search-index";
import { cn } from "@/lib/utils/cn";

export const SEARCH_LISTBOX_ID = "search-suggestions";

export function getSearchOptionId(index: number) {
  return `${SEARCH_LISTBOX_ID}-option-${index}`;
}

interface SearchSuggestionsProps {
  query: string;
  results: readonly SearchIndexEntry[];
  activeIndex: number;
  onHover: (index: number) => void;
  onSelect: (entry: SearchIndexEntry) => void;
  onViewAll: () => void;
}

export function SearchSuggestions({
  query,
  results,
  activeIndex,
  onHover,
  onSelect,
  onViewAll,
}: SearchSuggestionsProps) {
  if (results.length === 0) {
    return (
      <div role="status" className="py-10 text-center">
        <p className="font-display text-2xl text-ink">
          No pieces found for &ldquo;{query}&rdquo;
        </p>
        <p className="mt-2 text-sm text-stone-600">
          Try a different spelling or browse our collections.
        </p>
      </div>
    );
  }

  return (
    <ul
      id={SEARCH_LISTBOX_ID}
      role="listbox"
      aria-label="Search suggestions"
      className="divide-y divide-stone-200 border-y border-stone-200"
    >
      {results.map((entry, index) => (
        <li
          key={entry.id}
          id={getSearchOptionId(index)}
          role="option"
          aria-selected={activeIndex === index}
          onMouseEnter={() => onHover(index)}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(entry)}
          className={cn(
            "flex cursor-pointer items-center gap-4 px-2 py-3 transition-colors",
            activeIndex === index ? "bg-stone-200" : "bg-transparent",
          )}
        >
          <Image
            src={entry.thumbnail}
            alt=""
            width={48}
            height={64}
            className="h-16 w-12 shrink-0 object-cover"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-ink">
              {entry.title}
            </span>
            <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-stone-500">
              {entry.category} · {entry.subcategory}
            </span>
          </span>
          <span className="ml-auto whitespace-nowrap text-sm text-stone-700">
            {formatPrice(entry.price)}
          </span>
        </li>
      ))}
      <li
        id={getSearchOptionId(results.length)}
        role="option"
        aria-selected={activeIndex === results.length}
        onMouseEnter={() => onHover(results.length)}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onViewAll}
        className={cn(
          "cursor-pointer px-2 py-4 text-sm font-medium text-gold transition-colors",
          activeIndex === results.length ? "bg-stone-200" : "bg-transparent",
        )}
      >
        View all results for &ldquo;{query}&rdquo;
      </li>
    </ul>
  );
}
