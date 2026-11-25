import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { getCategory } from "@/lib/catalog/queries";

export const instant = false;

export function generateStaticParams() {
  return PILLAR_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata(
  props: PageProps<"/collections/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const category = getCategory(slug);

  if (!category) {
    return {};
  }

  return {
    title: category.label,
    description: category.description,
    alternates: { canonical: category.href },
    openGraph: {
      title: category.label,
      description: category.description,
      images: [{ url: category.image }],
    },
  };
}

export default async function PillarCollectionPage(
  props: PageProps<"/collections/[slug]">,
) {
  const { slug } = await props.params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const subcategories = SUBCATEGORY_CATEGORIES.filter(
    (item) => item.pillar === category.pillar,
  );

  return (
    <>
      <CollectionHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: category.label },
        ]}
        eyebrow="Collections"
        title={category.label}
        description={category.description}
        productCount={category.productCount}
      />
      <CategoryTiles categories={subcategories} />
      <Container size="page" className="py-10 md:py-14">
        <Suspense fallback={<ListingSkeleton />}>
          <CollectionResults
            pathname={category.href}
            scope={{ pillar: category.pillar }}
            categoryLinks={subcategories}
            searchParams={props.searchParams}
          />
        </Suspense>
      </Container>
    </>
  );
}
