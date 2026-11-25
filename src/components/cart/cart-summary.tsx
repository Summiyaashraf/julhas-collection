"use client";

import Link from "next/link";

import { useCart } from "@/components/cart/cart-provider";
import { buttonStyles } from "@/components/ui/button-styles";
import {
  getCartDiscount,
  getCartTotal,
} from "@/lib/cart/selectors";
import { formatPrice } from "@/lib/catalog/format";

export interface CartSummaryProps {
  subtotal: number;
  onClose: () => void;
}

export function CartSummary({ subtotal, onClose }: CartSummaryProps) {
  const { promo } = useCart();
  const discount = getCartDiscount(subtotal, promo);
  const total = getCartTotal(subtotal, promo);

  return (
    <div className="border-t border-stone-300 px-5 py-5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-600">
          Subtotal
        </span>
        <span className="text-base font-medium text-ink">
          {formatPrice(subtotal)}
        </span>
      </div>
      {discount > 0 && promo ? (
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-600">
            Promo ({promo.code})
          </span>
          <span className="text-base font-medium text-sale">
            &minus;{formatPrice(discount)}
          </span>
        </div>
      ) : null}
      {discount > 0 && promo ? (
        <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-stone-200 pt-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
            Total
          </span>
          <span className="text-base font-medium text-ink">
            {formatPrice(total)}
          </span>
        </div>
      ) : null}
      <p className="mt-2 text-xs text-stone-500">
        Shipping calculated at checkout.
      </p>
      <div className="mt-5 grid gap-2">
        <Link
          href="/checkout"
          onClick={onClose}
          className={buttonStyles({ fullWidth: true })}
        >
          Checkout
        </Link>
        <Link
          href="/cart"
          onClick={onClose}
          className={buttonStyles({ variant: "secondary", fullWidth: true })}
        >
          View Bag
        </Link>
      </div>
    </div>
  );
}
