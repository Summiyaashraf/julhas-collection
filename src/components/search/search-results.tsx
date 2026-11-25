import { CollectionResults } from "@/components/collection/collection-results";
import { SearchForm } from "@/components/search/search-form";
import { SearchPrompt } from "@/components/search/search-prompt";
import { PILLAR_CATEGORIES } from "@/lib/catalog/categories";
import {
  omitCategoryFilters,
  parseFilterParams,
} from "@/lib/filters/params";

export interface SearchResultsProps {
  searchParams: Promise<
    Readonly<Record<string, string | string[] | undefined>>
  >;
}

export async function SearchResults({
  searchParams,
}: SearchResultsProps) {
  const filters = omitCategoryFilters(
    parseFilterParams(await searchParams),
  );

  if (!filters.search) {
    return <SearchPrompt />;
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-stone-200 pb-8">
        <p className="eyebrow text-stone-500">Showing results for</p>
        <p className="mt-2 truncate font-display text-2xl text-ink">
          &ldquo;{filters.search}&rdquo;
        </p>
        <div className="mt-5 max-w-xl">
          <SearchForm initialQuery={filters.search} />
        </div>
      </div>
      <CollectionResults
        pathname="/search"
        categoryLinks={PILLAR_CATEGORIES}
        searchParams={searchParams}
      />
    </div>
  );
}
