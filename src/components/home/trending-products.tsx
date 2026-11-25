import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { buttonStyles } from "@/components/ui/button-styles";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { HOME_TRENDING_SECTION } from "@/content/home";
import { getBestsellers, getProductSummaries } from "@/lib/catalog/queries";

export function TrendingProducts() {
  const products = getProductSummaries(getBestsellers(8));

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="trending-products-heading"
      className="section-padding bg-stone-100"
    >
      <Container>
        <SectionHeading
          id="trending-products-heading"
          eyebrow={HOME_TRENDING_SECTION.eyebrow}
          title={HOME_TRENDING_SECTION.title}
          description={HOME_TRENDING_SECTION.description}
          action={
            <Link
              href={HOME_TRENDING_SECTION.href}
              className={buttonStyles({ variant: "ghost", size: "sm" })}
            >
              {HOME_TRENDING_SECTION.cta}
              <ArrowRightIcon size={16} />
            </Link>
          }
        />

        <div className="mt-10 md:mt-12">
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
}
