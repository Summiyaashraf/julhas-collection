import type { CartAction, CartItem, CartState } from "@/lib/cart/types";

export const initialCartState: CartState = {
  items: [],
  promo: null,
  isOpen: false,
  isHydrated: false,
  lastRemoved: null,
};

function clampQuantity(item: CartItem, quantity: number): number {
  const max = Number.isFinite(item.maxQuantity)
    ? Math.max(1, Math.floor(item.maxQuantity))
    : 1;
  const safeQuantity = Number.isFinite(quantity)
    ? Math.floor(quantity)
    : 1;

  return Math.min(Math.max(1, safeQuantity), max);
}

function mergeItems(
  existing: readonly CartItem[],
  incoming: readonly CartItem[],
): CartItem[] {
  const byVariant = new Map<string, CartItem>();

  for (const item of [...existing, ...incoming]) {
    const current = byVariant.get(item.variantId);

    if (!current) {
      byVariant.set(item.variantId, item);
      continue;
    }

    byVariant.set(item.variantId, {
      ...current,
      ...item,
      quantity: clampQuantity(item, current.quantity + item.quantity),
    });
  }

  return Array.from(byVariant.values());
}

export function cartReducer(
  state: CartState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case "hydrate":
      return {
        ...state,
        items: mergeItems(state.items, action.items),
        promo: action.promo,
        isHydrated: true,
      };

    case "sync":
      return {
        ...state,
        items: mergeItems([], action.items),
        promo: action.promo,
        isHydrated: true,
      };

    case "add": {
      if (action.item.maxQuantity <= 0) {
        return state;
      }

      const existing = state.items.find(
        (item) => item.variantId === action.item.variantId,
      );

      if (!existing) {
        return {
          ...state,
          items: [
            ...state.items,
            {
              ...action.item,
              quantity: clampQuantity(action.item, action.item.quantity),
            },
          ],
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.variantId === action.item.variantId
            ? {
                ...item,
                ...action.item,
                quantity: clampQuantity(
                  action.item,
                  item.quantity + action.item.quantity,
                ),
              }
            : item,
        ),
      };
    }

    case "updateQuantity":
      return {
        ...state,
        items: state.items.map((item) =>
          item.variantId === action.variantId
            ? {
                ...item,
                quantity: clampQuantity(item, action.quantity),
              }
            : item,
        ),
      };

    case "remove": {
      const index = state.items.findIndex(
        (item) => item.variantId === action.variantId,
      );

      if (index === -1) {
        return state;
      }

      return {
        ...state,
        items: state.items.filter(
          (item) => item.variantId !== action.variantId,
        ),
        lastRemoved: { item: state.items[index], index },
      };
    }

    case "restoreRemoved": {
      if (!state.lastRemoved) {
        return state;
      }

      const alreadyPresent = state.items.some(
        (item) =>
          item.variantId === state.lastRemoved?.item.variantId,
      );

      if (alreadyPresent) {
        return { ...state, lastRemoved: null };
      }

      const nextItems = [...state.items];
      nextItems.splice(
        Math.min(state.lastRemoved.index, nextItems.length),
        0,
        state.lastRemoved.item,
      );

      return { ...state, items: nextItems, lastRemoved: null };
    }

    case "clear":
      return { ...state, items: [], promo: null, lastRemoved: null };

    case "applyPromo":
      return { ...state, promo: action.promo };

    case "removePromo":
      return { ...state, promo: null };

    case "openDrawer":
      return { ...state, isOpen: true };

    case "closeDrawer":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}
