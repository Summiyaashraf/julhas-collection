import type { Metadata } from "next";

import { TrackOrderForm } from "@/components/forms/track-order-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button-styles";
import {
  SearchIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { TRACK_ORDER_CONTENT } from "@/content/track-order";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: TRACK_ORDER_CONTENT.intro,
  alternates: { canonical: "/track-order" },
  openGraph: {
    title: "Track Your Order",
    description: TRACK_ORDER_CONTENT.intro,
  },
};

export default function TrackOrderPage() {
  const { eyebrow, title, intro, help } = TRACK_ORDER_CONTENT;

  return (
    <>
      <header className="border-b border-sand/70 bg-cream">
        <Container size="page" className="py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Track Your Order" },
            ]}
            className="flex justify-center"
          />
          <div className="mt-8 text-center">
            <p className="eyebrow text-gold">{eyebrow}</p>
            <span
              aria-hidden="true"
              className="mx-auto mt-6 block h-px w-14 bg-gold/70"
            />
            <h1 className="mt-5 text-balance font-display text-3xl leading-none tracking-[0.08em] text-charcoal sm:text-5xl sm:tracking-[0.12em] md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
              {intro}
            </p>
          </div>
        </Container>
      </header>

      <section className="bg-cream">
        <Container size="page" className="py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
            <TrackOrderForm />

            <aside className="space-y-6">
              <div className="border border-sand bg-stone-50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-cream text-gold">
                  <SearchIcon size={18} />
                </div>
                <p className="mt-5 eyebrow text-gold">
                  {help.orderId.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-xl leading-snug text-charcoal">
                  {help.orderId.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">
                  {help.orderId.description}
                </p>
              </div>

              <div className="border border-sand bg-stone-50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-cream text-gold">
                  <TruckIcon size={18} />
                </div>
                <p className="mt-5 eyebrow text-gold">
                  {help.delivery.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-xl leading-snug text-charcoal">
                  {help.delivery.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">
                  {help.delivery.description}
                </p>
              </div>

              <div className="bg-charcoal p-6 text-stone-50">
                <p className="eyebrow text-gold-soft">
                  {help.support.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-2xl leading-snug">
                  {help.support.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  {help.support.description}
                </p>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonStyles({
                    variant: "gold",
                    size: "md",
                    className: "mt-5",
                  })}
                >
                  <WhatsAppIcon size={16} />
                  {help.support.label}
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
