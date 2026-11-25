import type { Metadata } from "next";
import { Suspense } from "react";

import { CategoryTiles } from "@/components/collection/category-tiles";
import { CollectionHero } from "@/components/collection/collection-hero";
import { CollectionResults } from "@/components/collection/collection-results";
import { ListingSkeleton } from "@/components/collection/listing-skeleton";
import { Container } from "@/components/ui/container";
import {
  PILLAR_CATEGORIES,
  SUBCATEGORY_CATEGORIES,
} from "@/lib/catalog/categories";
import { getAllProducts } from "@/lib/catalog/queries";

export const metadata: Metadata = {
  title: "All Collections",
  description:
    "Browse every piece from the Julhas Collection atelier — unstitched fabrics, festive wear, everyday silhouettes, and signature fragrances for the whole family.",
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "All Collections",
    description:
      "Browse every piece from the Julhas Collection atelier — unstitched fabrics, festive wear, everyday silhouettes, and signature fragrances for the whole family.",
  },
};

export default async function CollectionsPage(
  props: PageProps<"/collections">,
) {
  return (
    <>
      <CollectionHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections" },
        ]}
        eyebrow="The Collections"
        title="All Collections"
        description="Every piece from our atelier in one place — filter by category, size, colour, and price to find your next favourite."
        productCount={getAllProducts().length}
      />
      <CategoryTiles categories={SUBCATEGORY_CATEGORIES} />
      <Container size="page" className="py-10 md:py-14">
        <Suspense fallback={<ListingSkeleton />}>
          <CollectionResults
            pathname="/collections"
            categoryLinks={PILLAR_CATEGORIES}
            searchParams={props.searchParams}
          />
        </Suspense>
      </Container>
    </>
  );
}
