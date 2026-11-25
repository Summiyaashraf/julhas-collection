"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import type { ReactNode } from "react";

import type { CartPromo } from "@/lib/cart/promo";
import {
  getCartItemCount,
  getCartSubtotal,
} from "@/lib/cart/selectors";
import {
  cartReducer,
  initialCartState,
} from "@/lib/cart/reducer";
import {
  CART_STORAGE_KEY,
  readCartStorage,
  writeCartStorage,
} from "@/lib/cart/storage";
import type {
  CartItem,
  RemovedCartItem,
} from "@/lib/cart/types";

export interface CartContextValue {
  items: readonly CartItem[];
  count: number;
  subtotal: number;
  promo: CartPromo | null;
  isOpen: boolean;
  isHydrated: boolean;
  lastRemoved: RemovedCartItem | null;
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  restoreRemoved: () => void;
  clearCart: () => void;
  applyPromo: (promo: CartPromo) => void;
  removePromo: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    const storedCart = readCartStorage();
    const timer = window.setTimeout(() => {
      dispatch({
        type: "hydrate",
        items: storedCart.items,
        promo: storedCart.promo,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!state.isHydrated) {
      return;
    }

    writeCartStorage(state.items, state.promo);
  }, [state.items, state.promo, state.isHydrated]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== CART_STORAGE_KEY) {
        return;
      }

      const storedCart = readCartStorage();
      dispatch({
        type: "sync",
        items: storedCart.items,
        promo: storedCart.promo,
      });
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "add", item });
  }, []);

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      dispatch({ type: "updateQuantity", variantId, quantity });
    },
    [],
  );

  const removeItem = useCallback((variantId: string) => {
    dispatch({ type: "remove", variantId });
  }, []);

  const restoreRemoved = useCallback(() => {
    dispatch({ type: "restoreRemoved" });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const applyPromo = useCallback((promo: CartPromo) => {
    dispatch({ type: "applyPromo", promo });
  }, []);

  const removePromo = useCallback(() => {
    dispatch({ type: "removePromo" });
  }, []);

  const openDrawer = useCallback(() => {
    dispatch({ type: "openDrawer" });
  }, []);

  const closeDrawer = useCallback(() => {
    dispatch({ type: "closeDrawer" });
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      count: getCartItemCount(state.items),
      subtotal: getCartSubtotal(state.items),
      promo: state.promo,
      isOpen: state.isOpen,
      isHydrated: state.isHydrated,
      lastRemoved: state.lastRemoved,
      addItem,
      updateQuantity,
      removeItem,
      restoreRemoved,
      clearCart,
      applyPromo,
      removePromo,
      openDrawer,
      closeDrawer,
    }),
    [
      state.items,
      state.promo,
      state.isOpen,
      state.isHydrated,
      state.lastRemoved,
      addItem,
      updateQuantity,
      removeItem,
      restoreRemoved,
      clearCart,
      applyPromo,
      removePromo,
      openDrawer,
      closeDrawer,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
