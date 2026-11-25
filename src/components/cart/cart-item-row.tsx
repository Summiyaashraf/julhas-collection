import Image from "next/image";
import Link from "next/link";

import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/ui/icons";
import { Price } from "@/components/ui/price";
import type { CartItem } from "@/lib/cart/types";
import { getCartLineTotal } from "@/lib/cart/selectors";
import { formatPrice } from "@/lib/catalog/format";

export interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (variantId: string, quantity: number) => void;
  onRemove: (variantId: string) => void;
}

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  const variantLabel = [item.color, item.size]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="flex gap-4 py-6 sm:gap-6">
      <Link
        href={`/products/${item.slug}`}
        className="shrink-0"
      >
        <Image
          src={item.image}
          alt=""
          width={120}
          height={160}
          className="h-40 w-30 object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${item.slug}`}
              className="block truncate font-display text-lg leading-snug text-ink transition-colors hover:text-gold"
            >
              {item.title}
            </Link>
            {variantLabel ? (
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-stone-500">
                {variantLabel}
              </p>
            ) : null}
            <p className="mt-1 text-xs text-stone-500">
              {formatPrice(item.unitPrice)} each
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.variantId)}
            aria-label={`Remove ${item.title} from bag`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-stone-500 transition-colors hover:text-sale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <TrashIcon size={16} />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="inline-flex items-center border border-stone-300">
            <button
              type="button"
              onClick={() =>
                onQuantityChange(item.variantId, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity for ${item.title}`}
              className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold disabled:cursor-not-allowed disabled:text-stone-400"
            >
              <MinusIcon size={14} />
            </button>
            <span
              aria-live="polite"
              className="inline-flex min-w-8 items-center justify-center text-sm text-ink"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                onQuantityChange(item.variantId, item.quantity + 1)
              }
              disabled={item.quantity >= item.maxQuantity}
              aria-label={`Increase quantity for ${item.title}`}
              className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold disabled:cursor-not-allowed disabled:text-stone-400"
            >
              <PlusIcon size={14} />
            </button>
          </div>
          <Price price={getCartLineTotal(item)} size="md" />
        </div>
      </div>
    </li>
  );
}
