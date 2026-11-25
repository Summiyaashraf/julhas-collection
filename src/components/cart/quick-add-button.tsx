"use client";

import { useId, useRef, useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { CloseIcon, PlusIcon } from "@/components/ui/icons";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast-provider";
import { createCartItem } from "@/lib/cart/create-item";
import type { CartProductSource } from "@/lib/cart/create-item";
import type { ProductVariant } from "@/lib/catalog/types";
import { cn } from "@/lib/utils/cn";

export interface QuickAddProduct extends CartProductSource {
  variants: readonly ProductVariant[];
}

export interface QuickAddButtonProps {
  product: QuickAddProduct;
  className?: string;
}

export function QuickAddButton({
  product,
  className,
}: QuickAddButtonProps) {
  const titleId = useId();
  const dialogId = `${titleId}-dialog`;
  const firstVariantRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();

  const firstAvailableIndex = product.variants.findIndex(
    (variant) => variant.stock > 0,
  );

  const handleOpen = () => {
    if (firstAvailableIndex === -1) {
      showToast({
        title: "Currently unavailable",
        description: "This piece is sold out. Check back soon.",
        variant: "error",
      });
      return;
    }

    setOpen(true);
  };

  const handleSelect = (variant: ProductVariant) => {
    addItem(createCartItem(product, variant));
    setOpen(false);
    openDrawer();
    showToast({
      title: "Added to your bag",
      description: product.title,
      variant: "success",
    });
  };

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        className={className}
      >
        <PlusIcon size={14} />
        Quick Add
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        id={dialogId}
        labelledBy={titleId}
        initialFocusRef={firstVariantRef}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id={titleId}
                className="font-display text-2xl text-ink"
              >
                Select an option
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                {product.title}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close variant selection"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-stone-500 transition-colors hover:text-ink"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2">
            {product.variants.map((variant, index) => {
              const label = [variant.color, variant.size]
                .filter(Boolean)
                .join(" · ");
              const soldOut = variant.stock <= 0;

              return (
                <li key={variant.id}>
                  <button
                    ref={
                      index === firstAvailableIndex
                        ? firstVariantRef
                        : undefined
                    }
                    type="button"
                    onClick={() => handleSelect(variant)}
                    disabled={soldOut}
                    className={cn(
                      "flex w-full flex-col items-start gap-1 border px-3 py-3 text-left transition-colors",
                      soldOut
                        ? "cursor-not-allowed border-stone-200 text-stone-400"
                        : "border-stone-300 text-ink hover:border-gold hover:text-gold",
                    )}
                  >
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-stone-500">
                      {soldOut ? "Sold out" : `${variant.stock} in stock`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </>
  );
}
