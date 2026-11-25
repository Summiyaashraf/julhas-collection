import Link from "next/link";

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { ProductFilters } from "@/lib/catalog/types";
import { buildFilterHref } from "@/lib/filters/params";

export interface PaginationProps {
  pathname: string;
  filters: ProductFilters;
  page: number;
  totalPages: number;
}

function buildPageList(
  page: number,
  totalPages: number,
): (number | "gap")[] {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages]
    .filter((item) => item >= 1 && item <= totalPages)
    .sort((a, b) => a - b);
  const list: (number | "gap")[] = [];
  let previous = 0;

  for (const item of sorted) {
    if (item - previous > 1) {
      list.push("gap");
    }

    list.push(item);
    previous = item;
  }

  return list;
}

export function Pagination({
  pathname,
  filters,
  page,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hrefFor = (target: number) =>
    buildFilterHref(pathname, {
      ...filters,
      page: target > 1 ? target : undefined,
    });
  const items = buildPageList(page, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1)}
          rel="prev"
          aria-label="Previous page"
          className="inline-flex h-11 w-11 items-center justify-center border border-stone-300 text-ink transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <ArrowLeftIcon size={16} aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 items-center justify-center border border-stone-200 text-stone-300"
        >
          <ArrowLeftIcon size={16} />
        </span>
      )}

      {items.map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} aria-hidden="true" className="px-1 text-sm text-stone-400">
            …
          </span>
        ) : item === page ? (
          <span
            key={item}
            aria-current="page"
            className="inline-flex h-11 w-11 items-center justify-center border border-ink bg-ink text-xs font-medium text-stone-50"
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={hrefFor(item)}
            aria-label={`Page ${item}`}
            className="inline-flex h-11 w-11 items-center justify-center border border-stone-300 text-xs font-medium text-ink transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={hrefFor(page + 1)}
          rel="next"
          aria-label="Next page"
          className="inline-flex h-11 w-11 items-center justify-center border border-stone-300 text-ink transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 items-center justify-center border border-stone-200 text-stone-300"
        >
          <ArrowRightIcon size={16} />
        </span>
      )}
    </nav>
  );
}
