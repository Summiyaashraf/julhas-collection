import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { RelatedProducts } from "@/components/product/related-products";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/catalog/queries";
import {
  getPillarCategory,
  getSubcategoryCategory,
} from "@/lib/catalog/categories";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.title,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const pillarCategory = getPillarCategory(product.pillar);
  const subcategoryCategory = getSubcategoryCategory(
    product.pillar,
    product.subcategory,
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
  ];

  if (pillarCategory) {
    breadcrumbs.push({
      label: pillarCategory.label,
      href: pillarCategory.href,
    });
  }

  if (subcategoryCategory) {
    breadcrumbs.push({
      label: subcategoryCategory.label,
      href: subcategoryCategory.href,
    });
  }

  breadcrumbs.push({ label: product.title });

  return (
    <>
      <div className="border-b border-stone-200 bg-stone-100">
        <Container size="page" className="py-6">
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </div>
      <Container size="page" className="py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} title={product.title} />
          <div>
            <ProductPurchase product={product} />
            <ProductAccordion product={product} />
          </div>
        </div>
      </Container>
      <RelatedProducts products={getRelatedProducts(product, 4)} />
    </>
  );
}
