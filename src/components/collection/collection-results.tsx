import { ActiveFilters } from "@/components/collection/active-filters";
import { EmptyResults } from "@/components/collection/empty-results";
import { FilterPanel } from "@/components/collection/filter-panel";
import { Pagination } from "@/components/collection/pagination";
import { SortSelect } from "@/components/collection/sort-select";
import { ProductGrid } from "@/components/product/product-grid";
import {
  getAllProducts,
  getProductSummaries,
} from "@/lib/catalog/queries";
import type { ProductFilters } from "@/lib/catalog/types";
import { filterProducts, getProductListing } from "@/lib/filters/apply";
import { getProductFacets } from "@/lib/filters/facets";
import {
  omitCategoryFilters,
  parseFilterParams,
} from "@/lib/filters/params";

export interface CollectionResultsProps {
  pathname: string;
  scope?: ProductFilters;
  categoryLinks?: readonly { label: string; href: string }[];
  searchParams: Promise<
    Readonly<Record<string, string | string[] | undefined>>
  >;
}

export async function CollectionResults({
  pathname,
  scope = {},
  categoryLinks = [],
  searchParams,
}: CollectionResultsProps) {
  const queryFilters = omitCategoryFilters(
    parseFilterParams(await searchParams),
  );
  const filters: ProductFilters = { ...queryFilters, ...scope };
  const allProducts = getAllProducts();
  const scopedProducts = filterProducts(allProducts, scope);
  const facets = getProductFacets(scopedProducts);
  const listing = getProductListing(allProducts, filters);
  const products = getProductSummaries(listing.products);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <FilterPanel
        pathname={pathname}
        filters={queryFilters}
        facets={facets}
        categoryLinks={categoryLinks}
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-stone-200 pb-5">
          <p
            aria-live="polite"
            className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500"
          >
            {listing.total} {listing.total === 1 ? "piece" : "pieces"}
          </p>
          <SortSelect pathname={pathname} filters={queryFilters} />
        </div>
        <ActiveFilters pathname={pathname} filters={queryFilters} />
        {listing.total === 0 ? (
          <EmptyResults
            pathname={pathname}
            filters={queryFilters}
            suggestions={categoryLinks}
          />
        ) : (
          <>
            <div className="mt-8">
              <ProductGrid products={products} />
            </div>
            <Pagination
              pathname={pathname}
              filters={queryFilters}
              page={listing.page}
              totalPages={listing.totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
}
