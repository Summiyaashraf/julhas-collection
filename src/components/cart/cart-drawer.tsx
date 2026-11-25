"use client";

import { useRef } from "react";

import type { RefObject } from "react";

import { CartLineItem } from "@/components/cart/cart-line-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCart } from "@/components/cart/empty-cart";
import { FreeShippingProgress } from "@/components/cart/free-shipping-progress";
import { useCart } from "@/components/cart/cart-provider";
import { CloseIcon } from "@/components/ui/icons";
import { Drawer } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/toast-provider";

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export function CartDrawer({
  open,
  onClose,
  returnFocusRef,
}: CartDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const {
    items,
    count,
    subtotal,
    updateQuantity,
    removeItem,
    restoreRemoved,
  } = useCart();
  const { showToast } = useToast();

  const handleRemove = (variantId: string) => {
    const item = items.find(
      (cartItem) => cartItem.variantId === variantId,
    );

    if (!item) {
      return;
    }

    removeItem(variantId);
    showToast({
      title: "Removed from your bag",
      description: item.title,
      variant: "undo",
      duration: 5000,
      action: {
        label: "Undo",
        onClick: restoreRemoved,
      },
    });
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      id="cart-drawer"
      labelledBy="cart-drawer-title"
      side="right"
      widthClassName="w-full sm:max-w-[420px]"
      returnFocusRef={returnFocusRef}
      initialFocusRef={closeButtonRef}
    >
      <div className="flex items-center justify-between gap-4 border-b border-stone-300 px-5 py-4">
        <h2
          id="cart-drawer-title"
          className="font-display text-2xl text-ink"
        >
          Your Bag ({count})
        </h2>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close bag"
          className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold"
        >
          <CloseIcon />
        </button>
      </div>

      {items.length > 0 ? (
        <FreeShippingProgress
          subtotal={subtotal}
          className="border-b border-stone-200 px-5 py-4"
        />
      ) : null}

      {items.length === 0 ? (
        <EmptyCart onClose={onClose} />
      ) : (
        <>
          <ul
            aria-label="Items in your bag"
            className="flex-1 overflow-y-auto px-5"
          >
            {items.map((item) => (
              <CartLineItem
                key={item.variantId}
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={handleRemove}
                onNavigate={onClose}
              />
            ))}
          </ul>
          <CartSummary subtotal={subtotal} onClose={onClose} />
        </>
      )}
    </Drawer>
  );
}
