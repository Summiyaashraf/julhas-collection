import Link from "next/link";

import { BagIcon } from "@/components/ui/icons";
import { buttonStyles } from "@/components/ui/button-styles";
import { PILLAR_CATEGORIES } from "@/lib/catalog/categories";

export function CartEmptyState() {
  return (
    <div className="flex flex-col items-center py-16 text-center md:py-24">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 text-stone-500">
        <BagIcon size={26} />
      </span>
      <h2 className="mt-6 font-display text-3xl text-ink">
        Your bag is empty
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-600">
        Explore our latest pieces and find something to love.
      </p>
      <Link
        href="/collections"
        className={buttonStyles({ size: "lg", className: "mt-8" })}
      >
        Start Shopping
      </Link>
      <ul className="mt-10 flex flex-wrap justify-center gap-2">
        {PILLAR_CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              href={category.href}
              className="inline-block border border-stone-300 px-4 py-2 text-xs text-stone-700 transition-colors hover:border-gold hover:text-ink"
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
