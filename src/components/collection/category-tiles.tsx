import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { CatalogCategory } from "@/lib/catalog/categories";

export interface CategoryTilesProps {
  categories: readonly CatalogCategory[];
  label?: string;
}

export function CategoryTiles({
  categories,
  label = "Shop by category",
}: CategoryTilesProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section aria-label={label} className="border-b border-stone-200 bg-stone-100">
      <Container size="page" className="py-10 md:py-12">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((category) => (
            <li key={category.href}>
              <Link
                href={category.href}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-sm font-medium text-stone-50">
                      {category.label}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-stone-200/80">
                      {category.productCount}{" "}
                      {category.productCount === 1 ? "piece" : "pieces"}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
