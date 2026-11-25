import type { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export interface CollectionHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description?: string;
  productCount: number;
}

export function CollectionHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  productCount,
}: CollectionHeroProps) {
  return (
    <header className="border-b border-stone-200 bg-stone-100">
      <Container size="page" className="py-10 md:py-14">
        <Breadcrumbs items={breadcrumbs} />
        <p className="eyebrow mt-6 text-gold">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600">
            {description}
          </p>
        ) : null}
        <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500">
          {productCount} {productCount === 1 ? "piece" : "pieces"}
        </p>
      </Container>
    </header>
  );
}
