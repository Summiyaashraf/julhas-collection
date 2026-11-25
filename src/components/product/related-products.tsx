import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProductSummaries } from "@/lib/catalog/queries";
import type { Product } from "@/lib/catalog/types";

export interface RelatedProductsProps {
  products: readonly Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="You may also like"
      className="border-t border-stone-200 bg-stone-100"
    >
      <Container size="page" className="py-12 md:py-16">
        <SectionHeading
          eyebrow="Complete the Look"
          title="You May Also Like"
          level={2}
        />
        <div className="mt-8">
          <ProductGrid products={getProductSummaries(products)} />
        </div>
      </Container>
    </section>
  );
}
