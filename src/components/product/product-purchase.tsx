"use client";

import { useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, TruckIcon } from "@/components/ui/icons";
import { Price } from "@/components/ui/price";
import { useToast } from "@/components/ui/toast-provider";
import { createCartItem } from "@/lib/cart/create-item";
import { formatPrice } from "@/lib/catalog/format";
import type { Product } from "@/lib/catalog/types";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

const MAX_QUANTITY = 10;

function getBadgeVariant(product: Product): BadgeVariant | null {
  const soldOut = product.variants.every((variant) => variant.stock <= 0);

  if (soldOut) {
    return "sold-out";
  }

  if (product.tags.includes("sale")) {
    return "sale";
  }

  if (product.tags.includes("new-arrival")) {
    return "new";
  }

  if (product.tags.includes("bestseller")) {
    return "bestseller";
  }

  return null;
}

export interface ProductPurchaseProps {
  product: Product;
}

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();

  const soldOut = product.variants.every((variant) => variant.stock <= 0);
  const badgeVariant = getBadgeVariant(product);

  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors.length === 1 ? product.colors[0].name : null,
  );
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants.find(
    (item) =>
      item.size === selectedSize &&
      (item.color ?? null) === (selectedColor ?? null),
  );
  const variantStock = variant?.stock ?? 0;
  const maxQuantity = variant
    ? Math.min(variantStock, MAX_QUANTITY)
    : MAX_QUANTITY;

  const sizeAvailable = (size: string) =>
    product.variants.some(
      (item) =>
        item.size === size &&
        (selectedColor === null || item.color === selectedColor) &&
        item.stock > 0,
    );

  const colorAvailable = (color: string) =>
    product.variants.some(
      (item) =>
        item.color === color &&
        (selectedSize === null || item.size === selectedSize) &&
        item.stock > 0,
    );

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    setQuantity(1);
  };

  const handleAddToBag = () => {
    if (soldOut) {
      return;
    }

    const missingSize = product.sizes.length > 1 && selectedSize === null;
    const missingColor = product.colors.length > 1 && selectedColor === null;

    if (missingSize || missingColor) {
      showToast({
        title: "Select options",
        description: "Choose a size and colour before adding to your bag.",
        variant: "error",
      });
      return;
    }

    if (!variant || variant.stock <= 0) {
      showToast({
        title: "Unavailable",
        description: "That combination is currently sold out.",
        variant: "error",
      });
      return;
    }

    const safeQuantity = Math.min(quantity, Math.max(1, maxQuantity));

    addItem(createCartItem(product, variant, safeQuantity));
    openDrawer();
    showToast({
      title: "Added to your bag",
      description: product.title,
      variant: "success",
    });
    setQuantity(1);
  };

  return (
    <div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500">
          {product.subcategoryLabel}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">
          {product.title}
        </h1>
        {product.subtitle ? (
          <p className="mt-1.5 text-sm text-stone-500">{product.subtitle}</p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
        {badgeVariant ? <Badge variant={badgeVariant} /> : null}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-stone-600">
        {product.shortDescription}
      </p>

      {product.sizes.length > 1 ? (
        <fieldset className="mt-8">
          <legend className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
            Size{selectedSize ? `: ${selectedSize}` : ""}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const available = sizeAvailable(size);
              const active = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  disabled={!available}
                  aria-pressed={active}
                  onClick={() => handleSelectSize(size)}
                  className={cn(
                    "min-h-11 min-w-11 border px-4 text-xs font-medium tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                    active
                      ? "border-ink bg-ink text-stone-50"
                      : available
                        ? "border-stone-300 text-ink hover:border-ink"
                        : "cursor-not-allowed border-stone-200 text-stone-300 line-through",
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : product.sizes.length === 1 ? (
        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
          Size: {product.sizes[0]}
        </p>
      ) : null}

      {product.colors.length > 0 ? (
        <fieldset className="mt-6">
          <legend className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
            Colour{selectedColor ? `: ${selectedColor}` : ""}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((color) => {
              const available = colorAvailable(color.name);
              const active = selectedColor === color.name;

              return (
                <button
                  key={color.name}
                  type="button"
                  disabled={!available}
                  aria-pressed={active}
                  title={color.name}
                  onClick={() => handleSelectColor(color.name)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                    active
                      ? "border-gold"
                      : available
                        ? "border-stone-300 hover:border-stone-500"
                        : "cursor-not-allowed border-stone-200 opacity-40",
                  )}
                >
                  <span
                    className="h-5 w-5 rounded-full border border-stone-300/50"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="sr-only">{color.name}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center border border-stone-300">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="inline-flex h-12 w-12 items-center justify-center text-ink transition-colors hover:text-gold disabled:cursor-not-allowed disabled:text-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <MinusIcon size={14} aria-hidden="true" />
          </button>
          <span
            aria-live="polite"
            className="inline-flex min-w-10 items-center justify-center text-sm font-medium text-ink"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
            disabled={quantity >= maxQuantity}
            aria-label="Increase quantity"
            className="inline-flex h-12 w-12 items-center justify-center text-ink transition-colors hover:text-gold disabled:cursor-not-allowed disabled:text-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <PlusIcon size={14} aria-hidden="true" />
          </button>
        </div>
        {variantStock > 0 && variantStock <= 3 ? (
          <p className="text-xs font-medium text-sale">
            Only {variantStock} left
          </p>
        ) : null}
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={soldOut}
        onClick={handleAddToBag}
        className="mt-4"
      >
        {soldOut
          ? "Sold Out"
          : `Add to Bag — ${formatPrice(product.price * quantity)}`}
      </Button>

      <ul className="mt-6 space-y-2 text-xs text-stone-500">
        <li className="flex items-center gap-2">
          <TruckIcon size={14} className="text-gold" aria-hidden="true" />
          Free delivery on orders over {formatPrice(siteConfig.freeShippingThreshold)}
        </li>
      </ul>
    </div>
  );
}
