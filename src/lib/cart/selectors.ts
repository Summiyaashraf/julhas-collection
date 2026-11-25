import {
  getPromoDiscount,
  isFreeShippingPromo,
} from "@/lib/cart/promo";
import type { CartPromo } from "@/lib/cart/promo";
import type { CartItem } from "@/lib/cart/types";
import { siteConfig } from "@/lib/constants/site";

export function getCartLineTotal(item: CartItem): number {
  return item.unitPrice * item.quantity;
}

export function getCartItemCount(items: readonly CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items: readonly CartItem[]): number {
  return items.reduce(
    (total, item) => total + getCartLineTotal(item),
    0,
  );
}

export function getCartDiscount(
  subtotal: number,
  promo: CartPromo | null,
): number {
  return getPromoDiscount(subtotal, promo);
}

export function getCartTotal(
  subtotal: number,
  promo: CartPromo | null,
): number {
  return Math.max(0, subtotal - getPromoDiscount(subtotal, promo));
}

export function isFreeShippingUnlocked(
  subtotal: number,
  promo: CartPromo | null,
): boolean {
  return (
    subtotal >= siteConfig.freeShippingThreshold ||
    isFreeShippingPromo(promo)
  );
}

export function getFreeShippingRemaining(
  subtotal: number,
  threshold: number = siteConfig.freeShippingThreshold,
): number {
  if (threshold <= 0) {
    return 0;
  }

  return Math.max(0, threshold - subtotal);
}

export function getFreeShippingProgress(
  subtotal: number,
  threshold: number = siteConfig.freeShippingThreshold,
): number {
  if (threshold <= 0) {
    return 100;
  }

  return Math.min(100, Math.round((subtotal / threshold) * 100));
}
