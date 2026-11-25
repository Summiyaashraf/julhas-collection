"use client";

import Image from "next/image";
import Link from "next/link";

import { CartSkeleton } from "@/components/cart/cart-skeleton";
import { CartTotals } from "@/components/cart/cart-totals";
import { useCart } from "@/components/cart/cart-provider";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buttonStyles } from "@/components/ui/button-styles";
import type { CartItem } from "@/lib/cart/types";
import { getCartLineTotal, getCartTotal } from "@/lib/cart/selectors";
import { formatPrice } from "@/lib/catalog/format";
import { siteConfig } from "@/lib/constants/site";

function getVariantLabel(item: CartItem): string {
  return [item.color, item.size].filter(Boolean).join(" · ");
}

function buildWhatsAppMessage(
  items: readonly CartItem[],
  subtotal: number,
  total: number,
  promoCode: string | null,
): string {
  const lines = items.map((item) => {
    const variantLabel = getVariantLabel(item);

    return `- ${item.title}${variantLabel ? ` (${variantLabel})` : ""} x${item.quantity} — ${formatPrice(getCartLineTotal(item))}`;
  });

  return [
    "Hello Julhas Collection! I'd like to place an order:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    ...(promoCode ? [`Promo code: ${promoCode}`] : []),
    `Total: ${formatPrice(total)}`,
  ].join("\n");
}

export function CheckoutView() {
  const { items, subtotal, promo, isHydrated } = useCart();

  if (!isHydrated) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center md:py-24">
        <h2 className="font-display text-3xl text-ink">
          Your bag is empty
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-600">
          Add pieces to your bag before checking out.
        </p>
        <Link
          href="/collections"
          className={buttonStyles({ size: "lg", className: "mt-8" })}
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const total = getCartTotal(subtotal, promo);
  const whatsappHref = `${siteConfig.whatsapp}?text=${encodeURIComponent(
    buildWhatsAppMessage(items, subtotal, total, promo?.code ?? null),
  )}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
      <div>
        <ul
          aria-label="Items in your order"
          className="divide-y divide-stone-200 border-b border-stone-200"
        >
          {items.map((item) => {
            const variantLabel = getVariantLabel(item);

            return (
              <li
                key={item.variantId}
                className="flex items-start gap-4 py-4"
              >
                <Image
                  src={item.image}
                  alt=""
                  width={64}
                  height={84}
                  className="h-[84px] w-16 shrink-0 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {item.title}
                  </p>
                  {variantLabel ? (
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-stone-500">
                      {variantLabel}
                    </p>
                  ) : null}
                  <p className="mt-1 text-xs text-stone-500">
                    Qty {item.quantity}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-stone-700">
                  {formatPrice(getCartLineTotal(item))}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 border border-stone-300 bg-stone-100 p-5 md:p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
            Order via WhatsApp
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink">
            Prefer to order personally?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Send us your bag on WhatsApp and our team will confirm
            your order, delivery, and payment directly with you.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles({
              variant: "gold",
              className: "mt-5",
            })}
          >
            <WhatsAppIcon size={16} />
            Order on WhatsApp
          </a>
          <p className="mt-3 text-xs text-stone-500">
            {siteConfig.workingHours}
          </p>
        </div>
      </div>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <CartTotals
          footer={
            <Link
              href="/cart"
              className={buttonStyles({
                variant: "secondary",
                fullWidth: true,
              })}
            >
              Return to Bag
            </Link>
          }
        />
      </div>
    </div>
  );
}
