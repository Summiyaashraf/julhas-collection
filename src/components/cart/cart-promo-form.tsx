"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloseIcon } from "@/components/ui/icons";
import { useToast } from "@/components/ui/toast-provider";
import {
  findPromoCode,
  isPromoEligible,
} from "@/lib/cart/promo";
import { formatPrice } from "@/lib/catalog/format";

export function CartPromoForm() {
  const { promo, subtotal, applyPromo, removePromo } = useCart();
  const { showToast } = useToast();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = code.trim();

    if (!trimmed) {
      setError("Enter a promo code.");
      return;
    }

    const found = findPromoCode(trimmed);

    if (!found) {
      setError("That promo code isn't valid.");
      return;
    }

    if (!isPromoEligible(subtotal, found)) {
      const remaining =
        (found.minSubtotal ?? 0) - subtotal;
      setError(
        `Add ${formatPrice(remaining)} more to use ${found.code}.`,
      );
      return;
    }

    applyPromo(found);
    setCode("");
    setError(null);
    showToast({
      title: "Promo applied",
      description: found.label,
      variant: "success",
    });
  };

  const handleRemove = () => {
    if (!promo) {
      return;
    }

    removePromo();
    showToast({
      title: "Promo removed",
      description: promo.code,
      variant: "success",
    });
  };

  if (promo) {
    return (
      <div className="flex items-center justify-between gap-3 border border-gold/40 bg-gold-soft px-4 py-3">
        <p className="min-w-0 text-xs">
          <span className="font-medium uppercase tracking-[0.14em] text-ink">
            {promo.code}
          </span>
          <span className="text-stone-600">
            {" "}
            &mdash; {promo.label}
          </span>
        </p>
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove promo ${promo.code}`}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-stone-500 transition-colors hover:text-sale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <CloseIcon size={12} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-end gap-2">
        <Input
          id="promo-code"
          label="Promo code"
          placeholder="e.g. WELCOME10"
          value={code}
          autoComplete="off"
          onChange={(event) => {
            setCode(event.target.value);
            setError(null);
          }}
          containerClassName="min-w-0 flex-1"
        />
        <Button type="submit" variant="secondary">
          Apply
        </Button>
      </div>
      {error ? (
        <p
          role="alert"
          className="text-xs font-medium text-sale"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
