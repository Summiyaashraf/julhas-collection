"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/components/cart/cart-provider";
import { FreeShippingProgress } from "@/components/cart/free-shipping-progress";
import { buttonStyles } from "@/components/ui/button-styles";
import { getCartLineTotal } from "@/lib/cart/selectors";
import { formatPrice } from "@/lib/catalog/format";

const PREVIEW_ITEM_LIMIT = 3;

export interface MiniCartPreviewProps {
  open: boolean;
  onClose: () => void;
}

export function MiniCartPreview({
  open,
  onClose,
}: MiniCartPreviewProps) {
  const { items, count, subtotal, isOpen } = useCart();

  if (!open || isOpen || items.length === 0) {
    return null;
  }

  const previewItems = items.slice(0, PREVIEW_ITEM_LIMIT);
  const remaining = items.length - previewItems.length;

  return (
    <div className="absolute right-0 top-full z-20 mt-2 hidden w-80 border border-stone-300 bg-stone-50 p-4 shadow-menu lg:block">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-600">
          In your bag ({count})
        </p>
        <Link
          href="/cart"
          onClick={onClose}
          className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold transition-colors hover:text-ink"
        >
          View all
        </Link>
      </div>

      <ul className="mt-3 space-y-3">
        {previewItems.map((item) => {
          const variantLabel = [item.color, item.size]
            .filter(Boolean)
            .join(" · ");

          return (
            <li key={item.variantId} className="flex items-start gap-3">
              <Link
                href={`/products/${item.slug}`}
                onClick={onClose}
                className="shrink-0"
              >
                <Image
                  src={item.image}
                  alt=""
                  width={48}
                  height={62}
                  className="h-[62px] w-12 object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${item.slug}`}
                  onClick={onClose}
                  className="block truncate text-sm font-medium text-ink transition-colors hover:text-gold"
                >
                  {item.title}
                </Link>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-stone-500">
                  {variantLabel ? `${variantLabel} · ` : ""}
                  Qty {item.quantity}
                </p>
              </div>
              <span className="shrink-0 text-sm text-stone-700">
                {formatPrice(getCartLineTotal(item))}
              </span>
            </li>
          );
        })}
      </ul>

      {remaining > 0 ? (
        <p className="mt-3 text-xs text-stone-500">
          +{remaining} more {remaining === 1 ? "item" : "items"}
        </p>
      ) : null}

      <FreeShippingProgress
        subtotal={subtotal}
        className="mt-4 border-t border-stone-200 pt-3"
      />

      <div className="mt-4 grid gap-2">
        <Link
          href="/cart"
          onClick={onClose}
          className={buttonStyles({
            variant: "secondary",
            size: "sm",
            fullWidth: true,
          })}
        >
          View Bag
        </Link>
        <Link
          href="/checkout"
          onClick={onClose}
          className={buttonStyles({ size: "sm", fullWidth: true })}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
