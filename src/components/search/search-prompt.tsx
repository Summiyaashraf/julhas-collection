import Link from "next/link";

import { SearchForm } from "@/components/search/search-form";
import { SearchIcon } from "@/components/ui/icons";
import { PILLAR_CATEGORIES } from "@/lib/catalog/categories";

const TRENDING_SEARCHES = [
  "Lawn",
  "Luxury",
  "Kurta",
  "Fragrance",
  "Kids Festive",
] as const;

export function SearchPrompt() {
  return (
    <div className="mx-auto max-w-xl py-8 text-center md:py-12">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-400">
        <SearchIcon size={20} />
      </span>
      <h2 className="mt-6 font-display text-2xl text-ink">
        What are you looking for?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-600">
        Search across unstitched fabrics, ready-to-wear pieces,
        fragrances, and more — or browse by category.
      </p>
      <div className="mt-8 text-left">
        <SearchForm />
      </div>
      <div className="mt-10">
        <p className="eyebrow text-stone-500">Popular searches</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {TRENDING_SEARCHES.map((term) => (
            <li key={term}>
              <Link
                href={`/search?q=${encodeURIComponent(term)}`}
                className="inline-block border border-stone-300 px-4 py-2 text-xs text-stone-700 transition-colors hover:border-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {term}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <p className="eyebrow text-stone-500">Browse by category</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {PILLAR_CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link
                href={category.href}
                className="inline-block border border-stone-300 px-4 py-2 text-xs text-stone-700 transition-colors hover:border-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
