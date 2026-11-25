export const PKR_PREFIX = "Rs.";

const pkrFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;

  return `${PKR_PREFIX} ${pkrFormatter.format(Math.round(safeAmount))}`;
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) {
    return formatPrice(min);
  }

  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

export function formatDiscountPercent(
  price: number,
  compareAtPrice?: number,
): number | null {
  if (
    compareAtPrice === undefined ||
    compareAtPrice <= price ||
    compareAtPrice <= 0
  ) {
    return null;
  }

  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
