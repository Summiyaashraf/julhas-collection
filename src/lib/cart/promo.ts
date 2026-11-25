import { formatPrice } from "@/lib/catalog/format";

export interface CartPromo {
  code: string;
  label: string;
  kind: "percent" | "fixed" | "shipping";
  value: number;
  minSubtotal?: number;
}

export const PROMO_CODES: readonly CartPromo[] = [
  {
    code: "WELCOME10",
    label: "10% off your order",
    kind: "percent",
    value: 10,
  },
  {
    code: "JULHAS500",
    label: `${formatPrice(500)} off orders over ${formatPrice(4000)}`,
    kind: "fixed",
    value: 500,
    minSubtotal: 4000,
  },
  {
    code: "FREESHIP",
    label: "Free delivery on your order",
    kind: "shipping",
    value: 0,
  },
];

export function normalizePromoCode(input: string): string {
  return input.trim().toUpperCase();
}

export function findPromoCode(input: string): CartPromo | null {
  const code = normalizePromoCode(input);
  const promo = PROMO_CODES.find((item) => item.code === code);

  return promo ?? null;
}

export function isPromoEligible(
  subtotal: number,
  promo: CartPromo,
): boolean {
  if (promo.minSubtotal === undefined) {
    return true;
  }

  return subtotal >= promo.minSubtotal;
}

export function getPromoDiscount(
  subtotal: number,
  promo: CartPromo | null,
): number {
  if (!promo || !isPromoEligible(subtotal, promo)) {
    return 0;
  }

  if (promo.kind === "percent") {
    return Math.min(subtotal, Math.round((subtotal * promo.value) / 100));
  }

  if (promo.kind === "fixed") {
    return Math.min(subtotal, promo.value);
  }

  return 0;
}

export function isFreeShippingPromo(promo: CartPromo | null): boolean {
  return promo !== null && promo.kind === "shipping";
}
