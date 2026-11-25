import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export const BADGE_VARIANTS = [
  "new",
  "sale",
  "sold-out",
  "bestseller",
] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  new: "bg-ink text-stone-50",
  sale: "bg-sale text-white",
  "sold-out": "bg-stone-300 text-stone-700",
  bestseller: "bg-gold-soft text-ink",
};

const VARIANT_LABELS: Record<BadgeVariant, string> = {
  new: "New Arrival",
  sale: "Sale",
  "sold-out": "Sold Out",
  bestseller: "Bestseller",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
}

export function Badge({
  variant,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center justify-center px-2 py-1 text-[10px] font-medium uppercase leading-none tracking-[0.18em]",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children ?? VARIANT_LABELS[variant]}
    </span>
  );
}
