import Image from "next/image";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/button-styles";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  HOME_CATEGORY_SECTION,
  HOME_PILLAR_SPOTLIGHTS,
} from "@/content/home";
import { getPillarCategory } from "@/lib/catalog/categories";
import { PILLARS } from "@/lib/constants/collections";

const CATEGORY_CARDS = PILLARS.map((pillar) => {
  const spotlight = HOME_PILLAR_SPOTLIGHTS.find(
    (entry) => entry.pillar === pillar.slug,
  );
  const category = getPillarCategory(pillar.slug);

  return {
    pillar,
    eyebrow: spotlight?.eyebrow ?? pillar.label,
    image: spotlight?.image ?? pillar.image,
    imageAlt: spotlight?.imageAlt ?? pillar.description,
    productCount: category?.productCount ?? 0,
  };
});

export function CategoryShowcase() {
  return (
    <section
      aria-labelledby="category-showcase-heading"
      className="section-padding bg-stone-50"
    >
      <Container>
        <SectionHeading
          id="category-showcase-heading"
          eyebrow={HOME_CATEGORY_SECTION.eyebrow}
          title={HOME_CATEGORY_SECTION.title}
          description={HOME_CATEGORY_SECTION.description}
          action={
            <Link
              href="/collections"
              className={buttonStyles({ variant: "ghost", size: "sm" })}
            >
              View All Collections
              <ArrowRightIcon size={16} />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {CATEGORY_CARDS.map(
            ({ pillar, eyebrow, image, imageAlt, productCount }) => (
              <article
                key={pillar.slug}
                className="group relative aspect-[4/5] overflow-hidden bg-ink"
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/5" />

                <Link
                  href={pillar.href}
                  className="absolute inset-0 z-10"
                  aria-label={`Shop ${pillar.label}`}
                />

                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 text-stone-50 md:p-8">
                  <p className="eyebrow text-gold-soft">{eyebrow}</p>

                  <div>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-4xl leading-none md:text-5xl">
                          {pillar.label}
                        </h3>
                        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-stone-200/80">
                          {productCount}{" "}
                          {productCount === 1 ? "piece" : "pieces"}
                        </p>
                      </div>
                      <span className="mb-1 inline-flex h-11 w-11 shrink-0 items-center justify-center border border-stone-50/45 transition-colors duration-300 group-hover:border-stone-50 group-hover:bg-stone-50 group-hover:text-ink">
                        <ArrowRightIcon
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>

                    <ul
                      aria-label={`${pillar.label} subcategories`}
                      className="pointer-events-auto mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-stone-50/25 pt-4"
                    >
                      {pillar.subcategories.map((subcategory) => (
                        <li key={subcategory.slug}>
                          <Link
                            href={subcategory.href}
                            className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-100/85 transition-colors hover:text-gold-soft"
                          >
                            {subcategory.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
