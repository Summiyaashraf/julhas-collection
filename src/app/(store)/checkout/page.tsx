import type { Metadata } from "next";

import { CheckoutView } from "@/components/checkout/checkout-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Review your order summary and confirm your order with us on WhatsApp.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <header className="border-b border-stone-200 bg-stone-100">
        <Container size="page" className="py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shopping Bag", href: "/cart" },
              { label: "Checkout" },
            ]}
          />
          <h1 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
            Checkout
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600">
            Review your order summary and confirm your order with
            us on WhatsApp.
          </p>
        </Container>
      </header>
      <Container size="page" className="py-10 md:py-14">
        <div
          role="note"
          className="flex gap-4 border border-stone-300 bg-stone-50 p-5"
        >
          <span
            className="w-1 shrink-0 bg-gold"
            aria-hidden="true"
          />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
              Demo preview
            </p>
            <p className="mt-1 text-sm leading-relaxed text-stone-700">
              Online checkout is in development. No payment is
              collected on this page — place your order via
              WhatsApp and our team will confirm the details with
              you.
            </p>
          </div>
        </div>
        <CheckoutView />
      </Container>
    </>
  );
}
