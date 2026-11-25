import type { Metadata } from "next";

import { CartView } from "@/components/cart/cart-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description:
    "Review the pieces in your bag, update quantities, and apply a promo code before checkout.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      <header className="border-b border-stone-200 bg-stone-100">
        <Container size="page" className="py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shopping Bag" },
            ]}
          />
          <h1 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
            Your Bag
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600">
            Review your pieces, update quantities, apply a promo
            code, and proceed to checkout.
          </p>
        </Container>
      </header>
      <Container size="page" className="py-10 md:py-14">
        <CartView />
      </Container>
    </>
  );
}
