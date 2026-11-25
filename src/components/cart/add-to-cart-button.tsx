"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import type { ButtonSize, ButtonVariant } from "@/components/ui/button-styles";
import { createCartItem } from "@/lib/cart/create-item";
import type { CartProductSource } from "@/lib/cart/create-item";
import type { ProductVariant } from "@/lib/catalog/types";

export interface AddToCartButtonProps {
  product: CartProductSource;
  variant?: ProductVariant | null;
  onRequireVariant?: () => void;
  variantStyle?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  variant,
  onRequireVariant,
  variantStyle = "primary",
  size = "md",
  fullWidth = false,
  className,
}: AddToCartButtonProps) {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();
  const soldOut = variant !== null && variant !== undefined && variant.stock <= 0;

  const handleClick = () => {
    if (!variant) {
      if (onRequireVariant) {
        onRequireVariant();
        return;
      }

      showToast({
        title: "Select a size",
        description: "Choose a size and colour before adding to your bag.",
        variant: "error",
      });
      return;
    }

    addItem(createCartItem(product, variant));
    openDrawer();
    showToast({
      title: "Added to your bag",
      description: product.title,
      variant: "success",
    });
  };

  return (
    <Button
      variant={variantStyle}
      size={size}
      fullWidth={fullWidth}
      onClick={handleClick}
      disabled={soldOut}
      className={className}
    >
      {soldOut ? "Sold Out" : "Add to Bag"}
    </Button>
  );
}
