import type { Metadata } from "next";
import { Suspense } from "react";

import { ListingSkeleton } from "@/components/collection/listing-skeleton";
import { SearchResults } from "@/components/search/search-results";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search the Julhas Collection catalog — unstitched fabrics, ready-to-wear, fragrances, and more.",
  robots: { index: false, follow: true },
};

export default function SearchPage(
  props: PageProps<"/search">,
) {
  return (
    <>
      <header className="border-b border-stone-200 bg-stone-100">
        <Container size="page" className="py-10 md:py-14">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Search" }]}
          />
          <h1 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
            Search
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600">
            Find your next favourite piece by colour, fabric,
            category, or occasion.
          </p>
        </Container>
      </header>
      <Container size="page" className="py-10 md:py-14">
        <Suspense fallback={<ListingSkeleton />}>
          <SearchResults searchParams={props.searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
