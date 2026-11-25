"use client";

import Link from "next/link";

import { CartEmptyState } from "@/components/cart/cart-empty-state";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { CartSkeleton } from "@/components/cart/cart-skeleton";
import { CartTotals } from "@/components/cart/cart-totals";
import { FreeShippingProgress } from "@/components/cart/free-shipping-progress";
import { useCart } from "@/components/cart/cart-provider";
import { useToast } from "@/components/ui/toast-provider";
import { buttonStyles } from "@/components/ui/button-styles";

export function CartView() {
  const {
    items,
    count,
    subtotal,
    isHydrated,
    updateQuantity,
    removeItem,
    restoreRemoved,
    clearCart,
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
      action: { label: "Undo", onClick: restoreRemoved },
    });
  };

  const handleClear = () => {
    clearCart();
    showToast({ title: "Your bag has been cleared" });
  };

  if (!isHydrated) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
      <div>
        <p
          aria-live="polite"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500"
        >
          {count} {count === 1 ? "item" : "items"}
        </p>
        <FreeShippingProgress
          subtotal={subtotal}
          className="mt-3 border-b border-stone-200 pb-5"
        />
        <ul aria-label="Items in your bag" className="divide-y divide-stone-200">
          {items.map((item) => (
            <CartItemRow
              key={item.variantId}
              item={item}
              onQuantityChange={updateQuantity}
              onRemove={handleRemove}
            />
          ))}
        </ul>
      </div>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <CartTotals
          footer={
            <div className="grid gap-2">
              <Link
                href="/checkout"
                className={buttonStyles({ size: "lg", fullWidth: true })}
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/collections"
                className={buttonStyles({
                  variant: "secondary",
                  fullWidth: true,
                })}
              >
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={handleClear}
                className={buttonStyles({
                  variant: "ghost",
                  size: "sm",
                  fullWidth: true,
                })}
              >
                Clear Bag
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}
