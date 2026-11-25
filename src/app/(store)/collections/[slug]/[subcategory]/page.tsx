import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CollectionHero } from "@/components/collection/collection-hero";
import { CollectionResults } from "@/components/collection/collection-results";
import { ListingSkeleton } from "@/components/collection/listing-skeleton";
import { Container } from "@/components/ui/container";
import {
  SUBCATEGORY_CATEGORIES,
  getSubcategoryCategory,
} from "@/lib/catalog/categories";
import { getCategory } from "@/lib/catalog/queries";

export const instant = false;

export function generateStaticParams() {
  return SUBCATEGORY_CATEGORIES.map((category) => ({
    slug: category.pillar,
    subcategory: category.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/collections/[slug]/[subcategory]">,
): Promise<Metadata> {
  const { slug, subcategory } = await props.params;
  const pillar = getCategory(slug);
  const category = getSubcategoryCategory(slug, subcategory);

  if (!pillar || !category) {
    return {};
  }

  const title = `${category.label} — ${pillar.label}`;

  return {
    title,
    description: category.description,
    alternates: { canonical: category.href },
    openGraph: {
      title,
      description: category.description,
      images: [{ url: category.image }],
    },
  };
}

export default async function SubcategoryCollectionPage(
  props: PageProps<"/collections/[slug]/[subcategory]">,
) {
  const { slug, subcategory } = await props.params;
  const pillar = getCategory(slug);
  const category = getSubcategoryCategory(slug, subcategory);

  if (!pillar || !category) {
    notFound();
  }

  const siblings = SUBCATEGORY_CATEGORIES.filter(
    (item) => item.pillar === pillar.pillar,
  );

  return (
    <>
      <CollectionHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: pillar.label, href: pillar.href },
          { label: category.label },
        ]}
        eyebrow={pillar.label}
        title={category.label}
        description={category.description}
        productCount={category.productCount}
      />
      <Container size="page" className="py-10 md:py-14">
        <Suspense fallback={<ListingSkeleton />}>
          <CollectionResults
            pathname={category.href}
            scope={{ pillar: pillar.pillar, subcategory: category.slug }}
            categoryLinks={siblings}
            searchParams={props.searchParams}
          />
        </Suspense>
      </Container>
    </>
  );
}
