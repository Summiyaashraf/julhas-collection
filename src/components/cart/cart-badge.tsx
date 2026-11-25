"use client";

import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils/cn";

export interface CartBadgeProps {
  className?: string;
}

export function CartBadge({ className }: CartBadgeProps) {
  const { count, isHydrated } = useCart();
  const visible = isHydrated && count > 0;

  return (
    <>
      {visible ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium leading-none text-ink",
            className,
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {isHydrated
          ? count > 0
            ? `${count} ${count === 1 ? "item" : "items"} in bag`
            : "Bag is empty"
          : ""}
      </span>
    </>
  );
}
