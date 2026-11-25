import type { CartPromo } from "@/lib/cart/promo";

export interface CartItem {
  productId: string;
  variantId: string;
  slug: string;
  title: string;
  image: string;
  size: string;
  color: string | null;
  unitPrice: number;
  quantity: number;
  maxQuantity: number;
}

export interface RemovedCartItem {
  item: CartItem;
  index: number;
}

export interface CartState {
  items: readonly CartItem[];
  promo: CartPromo | null;
  isOpen: boolean;
  isHydrated: boolean;
  lastRemoved: RemovedCartItem | null;
}

export type CartAction =
  | { type: "hydrate"; items: readonly CartItem[]; promo: CartPromo | null }
  | { type: "sync"; items: readonly CartItem[]; promo: CartPromo | null }
  | { type: "add"; item: CartItem }
  | { type: "updateQuantity"; variantId: string; quantity: number }
  | { type: "remove"; variantId: string }
  | { type: "restoreRemoved" }
  | { type: "clear" }
  | { type: "applyPromo"; promo: CartPromo }
  | { type: "removePromo" }
  | { type: "openDrawer" }
  | { type: "closeDrawer" };
