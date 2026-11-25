import Image from "next/image";
import Link from "next/link";

import { QuickAddButton } from "@/components/cart/quick-add-button";
import { Badge } from "@/components/ui/badge";
import type { BadgeVariant } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import type { ProductSummary } from "@/lib/catalog/types";

export interface ProductCardProps {
  product: ProductSummary;
}

function getBadgeVariant(product: ProductSummary): BadgeVariant | null {
  const soldOut = product.variants.every((variant) => variant.stock <= 0);

  if (soldOut) {
    return "sold-out";
  }

  if (product.tags.includes("sale")) {
    return "sale";
  }

  if (product.tags.includes("new-arrival")) {
    return "new";
  }

  if (product.tags.includes("bestseller")) {
    return "bestseller";
  }

  return null;
}

export function ProductCard({ product }: ProductCardProps) {
  const badgeVariant = getBadgeVariant(product);
  const primaryImage = product.images[0];
  const hoverImage = product.images[1];
  const visibleColors = product.colors.slice(0, 4);
  const remainingColors = product.colors.length - visibleColors.length;

  if (!primaryImage) {
    return null;
  }

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-200">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.title}`}
          className="absolute inset-0 z-10"
        >
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-[1.03]"
          />
          {hoverImage ? (
            <Image
              src={hoverImage.src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : null}
        </Link>

        {badgeVariant ? (
          <div className="pointer-events-none absolute left-3 top-3 z-20">
            <Badge variant={badgeVariant} />
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex justify-end opacity-100 transition-opacity duration-300 md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
          <div className="pointer-events-auto bg-stone-50/95 p-0.5 backdrop-blur-sm">
            <QuickAddButton product={product} />
          </div>
        </div>
      </div>

      <div className="pt-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500">
          {product.subcategoryLabel}
        </p>
        <h3 className="mt-1.5 min-h-10 text-sm font-medium leading-snug text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="line-clamp-2 transition-colors hover:text-gold"
          >
            {product.title}
          </Link>
        </h3>

        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          size="sm"
          className="mt-2"
        />

        {visibleColors.length > 0 ? (
          <ul
            aria-label="Available colours"
            className="mt-3 flex items-center gap-1.5"
          >
            {visibleColors.map((color) => (
              <li
                key={color.name}
                className="h-3.5 w-3.5 rounded-full border border-stone-300"
                style={{ backgroundColor: color.hex }}
              >
                <span className="sr-only">{color.name}</span>
              </li>
            ))}
            {remainingColors > 0 ? (
              <li className="text-[10px] text-stone-500">
                +{remainingColors}
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
