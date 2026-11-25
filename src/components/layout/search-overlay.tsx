"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  RefObject,
} from "react";

import {
  SEARCH_LISTBOX_ID,
  SearchSuggestions,
  getSearchOptionId,
} from "@/components/search/search-suggestions";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import { Modal } from "@/components/ui/modal";
import {
  searchCatalogIndex,
  type SearchIndexEntry,
} from "@/lib/catalog/search-index";

const RECENT_SEARCHES_KEY = "julhas.recent-searches.v1";
const MAX_RECENT_SEARCHES = 5;
const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_DELAY = 250;

const TRENDING_SEARCHES = [
  "Lawn",
  "Luxury",
  "Kurta",
  "Fragrance",
  "Kids Festive",
] as const;

function readRecentSearches(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(RECENT_SEARCHES_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is string => typeof item === "string")
      .slice(0, MAX_RECENT_SEARCHES);
  } catch {
    return [];
  }
}

function writeRecentSearches(values: readonly string[]) {
  try {
    window.localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify(values),
    );
  } catch {
    return;
  }
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export function SearchOverlay({
  open,
  onClose,
  returnFocusRef,
}: SearchOverlayProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] =
    useState<string[]>(readRecentSearches);
  const [renderedOpen, setRenderedOpen] = useState(open);

  if (renderedOpen !== open) {
    setRenderedOpen(open);

    if (open) {
      setActiveIndex(-1);
    }
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, DEBOUNCE_DELAY);

    return () => window.clearTimeout(timer);
  }, [open, query]);

  useEffect(() => {
    if (activeIndex < 0) {
      return;
    }

    const option = document.getElementById(getSearchOptionId(activeIndex));
    option?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const trimmedQuery = query.trim();
  const isDebouncing =
    trimmedQuery.length >= MIN_QUERY_LENGTH &&
    debouncedQuery !== trimmedQuery;
  const shouldShowResults = trimmedQuery.length >= MIN_QUERY_LENGTH;
  const results =
    shouldShowResults && !isDebouncing
      ? searchCatalogIndex(debouncedQuery)
      : [];
  const optionCount =
    !isDebouncing && results.length > 0 ? results.length + 1 : 0;
  const listboxVisible = optionCount > 0;
  const activeDescendant =
    activeIndex >= 0 && activeIndex < optionCount
      ? getSearchOptionId(activeIndex)
      : undefined;

  const addRecentSearch = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    const next = [
      trimmed,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase(),
      ),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(next);
    writeRecentSearches(next);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    writeRecentSearches([]);
  };

  const submitSearch = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    addRecentSearch(trimmed);
    onClose();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const selectProduct = (entry: SearchIndexEntry) => {
    addRecentSearch(query.trim() || entry.title);
    onClose();
    router.push(`/products/${entry.slug}`);
  };

  const applySearchTerm = (term: string) => {
    setQuery(term);
    setDebouncedQuery(term);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const clearQuery = () => {
    setQuery("");
    setDebouncedQuery("");
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setActiveIndex(-1);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch(query);
  };

  const handleInputKeyDown = (
    event: ReactKeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (optionCount === 0) {
        return;
      }

      event.preventDefault();
      setActiveIndex((current) => {
        if (event.key === "ArrowDown") {
          return current >= optionCount - 1 ? 0 : current + 1;
        }

        return current <= 0 ? optionCount - 1 : current - 1;
      });
      return;
    }

    if (
      event.key === "Enter" &&
      activeIndex >= 0 &&
      activeIndex < optionCount
    ) {
      event.preventDefault();

      if (activeIndex < results.length) {
        selectProduct(results[activeIndex]);
        return;
      }

      submitSearch(trimmedQuery);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      id="search-overlay"
      labelledBy="search-title"
      align="top"
      initialFocusRef={inputRef}
      returnFocusRef={returnFocusRef}
      panelClassName="h-[100dvh] animate-fade-in md:h-auto md:max-h-[85dvh]"
    >
      <div className="container-page w-full py-6 md:py-10">
          <div className="flex items-center justify-between gap-4">
            <h2 id="search-title" className="eyebrow text-stone-500">
              Search
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold"
            >
              <CloseIcon />
            </button>
          </div>

          <form role="search" onSubmit={handleFormSubmit} className="mt-6">
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <div className="flex items-center gap-2 border-b border-ink/25 transition-colors focus-within:border-gold">
              <button
                type="submit"
                aria-label="Search"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-stone-500 transition-colors hover:text-gold"
              >
                <SearchIcon />
              </button>
              <input
                ref={inputRef}
                id="site-search"
                type="text"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleInputKeyDown}
                role="combobox"
                aria-expanded={listboxVisible}
                aria-controls={SEARCH_LISTBOX_ID}
                aria-autocomplete="list"
                aria-activedescendant={activeDescendant}
                placeholder="Search for pieces, collections, fragrances…"
                className="w-full min-w-0 bg-transparent py-2 font-display text-3xl text-ink outline-none placeholder:text-stone-400 focus-visible:outline-none md:text-5xl"
              />
              {query.length > 0 ? (
                <button
                  type="button"
                  onClick={clearQuery}
                  aria-label="Clear search"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-stone-500 transition-colors hover:text-gold"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </form>

          <div className="mt-8">
            {shouldShowResults ? (
              isDebouncing ? (
                <p
                  role="status"
                  className="py-10 text-center text-sm text-stone-500"
                >
                  Searching…
                </p>
              ) : (
                <SearchSuggestions
                  query={trimmedQuery}
                  results={results}
                  activeIndex={activeIndex}
                  onHover={setActiveIndex}
                  onSelect={selectProduct}
                  onViewAll={() => submitSearch(trimmedQuery)}
                />
              )
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="eyebrow text-stone-500">Trending</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {TRENDING_SEARCHES.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => applySearchTerm(term)}
                          className="inline-flex min-h-10 items-center border border-stone-300 px-3 text-sm text-stone-700 transition-colors hover:border-gold hover:text-ink"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow text-stone-500">
                      Recent searches
                    </p>
                    {recentSearches.length > 0 ? (
                      <button
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500 transition-colors hover:text-gold"
                      >
                        Clear
                      </button>
                    ) : null}
                  </div>
                  {recentSearches.length > 0 ? (
                    <ul className="mt-4 space-y-1">
                      {recentSearches.map((term) => (
                        <li key={term}>
                          <button
                            type="button"
                            onClick={() => applySearchTerm(term)}
                            className="flex min-h-10 w-full items-center text-left text-sm text-stone-700 transition-colors hover:text-gold"
                          >
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-stone-500">
                      Your recent searches will appear here.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
      </div>
    </Modal>
  );
}
