import { findPromoCode } from "@/lib/cart/promo";
import type { CartPromo } from "@/lib/cart/promo";
import type { CartItem } from "@/lib/cart/types";

export const CART_STORAGE_KEY = "julhas.cart.v1";
export const CART_STORAGE_VERSION = 1;

export interface StoredCart {
  items: CartItem[];
  promo: CartPromo | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toStringValue(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function toNumberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : null;
}

function parseCartItem(value: unknown): CartItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const productId = toStringValue(value.productId);
  const variantId = toStringValue(value.variantId);
  const slug = toStringValue(value.slug);
  const title = toStringValue(value.title);
  const image = toStringValue(value.image);
  const size = toStringValue(value.size);
  const unitPrice = toNumberValue(value.unitPrice);
  const quantity = toNumberValue(value.quantity);
  const maxQuantity = toNumberValue(value.maxQuantity);

  if (
    !productId ||
    !variantId ||
    !slug ||
    !title ||
    !image ||
    !size ||
    unitPrice === null ||
    quantity === null ||
    maxQuantity === null ||
    unitPrice < 0 ||
    maxQuantity < 1
  ) {
    return null;
  }

  const safeMax = Math.max(1, Math.floor(maxQuantity));
  const safeQuantity = Math.min(
    Math.max(1, Math.floor(quantity)),
    safeMax,
  );
  const color =
    typeof value.color === "string" && value.color.length > 0
      ? value.color
      : null;

  return {
    productId,
    variantId,
    slug,
    title,
    image,
    size,
    color,
    unitPrice,
    quantity: safeQuantity,
    maxQuantity: safeMax,
  };
}

function mergeStoredItems(items: readonly CartItem[]): CartItem[] {
  const byVariant = new Map<string, CartItem>();

  for (const item of items) {
    const existing = byVariant.get(item.variantId);

    if (!existing) {
      byVariant.set(item.variantId, item);
      continue;
    }

    byVariant.set(item.variantId, {
      ...item,
      quantity: Math.min(
        existing.quantity + item.quantity,
        item.maxQuantity,
      ),
    });
  }

  return Array.from(byVariant.values());
}

const EMPTY_CART: StoredCart = { items: [], promo: null };

export function readCartStorage(): StoredCart {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
      return EMPTY_CART;
    }

    const parsed: unknown = JSON.parse(raw);

    if (
      !isRecord(parsed) ||
      parsed.version !== CART_STORAGE_VERSION ||
      !Array.isArray(parsed.items)
    ) {
      return EMPTY_CART;
    }

    const items = parsed.items
      .map(parseCartItem)
      .filter((item): item is CartItem => item !== null);

    const promo =
      typeof parsed.promoCode === "string" && parsed.promoCode.length > 0
        ? findPromoCode(parsed.promoCode)
        : null;

    return { items: mergeStoredItems(items), promo };
  } catch {
    return EMPTY_CART;
  }
}

export function writeCartStorage(
  items: readonly CartItem[],
  promo: CartPromo | null,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload = JSON.stringify({
      version: CART_STORAGE_VERSION,
      items,
      promoCode: promo === null ? null : promo.code,
    });

    if (window.localStorage.getItem(CART_STORAGE_KEY) === payload) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, payload);
  } catch {
    return;
  }
}
