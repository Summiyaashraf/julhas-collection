"use client";

import type { ReactNode } from "react";

import { CartPromoForm } from "@/components/cart/cart-promo-form";
import { useCart } from "@/components/cart/cart-provider";
import {
  getCartDiscount,
  getCartTotal,
  isFreeShippingUnlocked,
} from "@/lib/cart/selectors";
import { isPromoEligible } from "@/lib/cart/promo";
import { formatPrice } from "@/lib/catalog/format";
import { siteConfig } from "@/lib/constants/site";

export interface CartTotalsProps {
  footer?: ReactNode;
}

export function CartTotals({ footer }: CartTotalsProps) {
  const { count, subtotal, promo } = useCart();
  const discount = getCartDiscount(subtotal, promo);
  const total = getCartTotal(subtotal, promo);
  const freeShipping = isFreeShippingUnlocked(subtotal, promo);
  const promoIneligible =
    promo !== null && !isPromoEligible(subtotal, promo);
  const promoRemaining = promo?.minSubtotal
    ? promo.minSubtotal - subtotal
    : 0;

  return (
    <section
      aria-label="Order summary"
      className="border border-stone-300 bg-stone-50"
    >
      <div className="border-b border-stone-200 px-5 py-4">
        <h2 className="font-display text-xl text-ink">
          Order Summary
        </h2>
        <p className="mt-1 text-xs text-stone-500">
          {count} {count === 1 ? "item" : "items"}
        </p>
      </div>
      <div className="space-y-4 px-5 py-5">
        <CartPromoForm />
        <dl className="space-y-2 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-stone-600">Subtotal</dt>
            <dd className="font-medium text-ink">
              {formatPrice(subtotal)}
            </dd>
          </div>
          {discount > 0 && promo ? (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-stone-600">
                Promo ({promo.code})
              </dt>
              <dd className="font-medium text-sale">
                &minus;{formatPrice(discount)}
              </dd>
            </div>
          ) : null}
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-stone-600">Shipping</dt>
            <dd className="font-medium text-ink">
              {freeShipping ? "Free" : "Calculated at checkout"}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-stone-300 pt-3">
            <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
              Total
            </dt>
            <dd className="text-base font-medium text-ink">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>
        {promoIneligible ? (
          <p className="text-xs text-stone-500">
            Spend {formatPrice(promoRemaining)} more to use{" "}
            {promo?.code}. The discount applies once you reach the
            minimum.
          </p>
        ) : null}
        {!freeShipping ? (
          <p className="text-xs text-stone-500">
            Free delivery on orders over{" "}
            {formatPrice(siteConfig.freeShippingThreshold)}.
          </p>
        ) : null}
      </div>
      {footer ? (
        <div className="border-t border-stone-200 px-5 py-5">
          {footer}
        </div>
      ) : null}
    </section>
  );
}
