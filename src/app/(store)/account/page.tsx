import type { Metadata } from "next";
import Link from "next/link";

import { AccountForms } from "@/components/forms/account-forms";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ACCOUNT_CONTENT } from "@/content/account";
import { buttonStyles } from "@/components/ui/button-styles";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Sign in to Julhas Collection or create an account to keep your orders and details close.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Account",
    description:
      "Sign in to Julhas Collection or create an account to keep your orders and details close.",
  },
};

export default function AccountPage() {
  const {
    eyebrow,
    title,
    intro,
    asideEyebrow,
    asideTitle,
    asideDescription,
    benefits,
    support,
  } = ACCOUNT_CONTENT;

  return (
    <>
      <header className="border-b border-stone-200 bg-stone-100">
        <Container size="page" className="py-10 md:py-14">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Account" }]}
          />
          <p className="mt-6 eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl leading-tight text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600">
            {intro}
          </p>
        </Container>
      </header>

      <Container size="page" className="py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          <div>
            <section
              aria-labelledby="account-membership-heading"
              className="relative overflow-hidden bg-ink p-7 text-stone-50 md:p-10"
            >
              <span
                aria-hidden="true"
                className="absolute right-0 top-0 h-24 w-24 border-b border-l border-white/10"
              />
              <p className="eyebrow text-gold">{asideEyebrow}</p>
              <h2
                id="account-membership-heading"
                className="mt-3 max-w-md text-balance font-display text-3xl leading-tight text-stone-50 md:text-4xl"
              >
                {asideTitle}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-300">
                {asideDescription}
              </p>

              <ol className="mt-9 space-y-px border-t border-white/15">
                {benefits.map((benefit, index) => (
                  <li
                    key={benefit.title}
                    className="flex gap-5 border-b border-white/15 py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="w-6 shrink-0 pt-1 text-[11px] font-medium tracking-[0.16em] text-gold"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-stone-50">
                        {benefit.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-stone-300">
                        {benefit.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-6 grid gap-6 border border-stone-300 bg-stone-50 p-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-stone-500">Customer Care</p>
                <h2 className="mt-2 font-display text-xl text-ink">
                  {support.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {support.description}
                </p>
                <Link
                  href="/contact"
                  className={`${buttonStyles({
                    variant: "secondary",
                    size: "sm",
                  })} mt-4`}
                >
                  Contact Us
                </Link>
              </div>
              <div className="sm:border-l sm:border-stone-200 sm:pl-6">
                <p className="eyebrow text-stone-500">New Here?</p>
                <h2 className="mt-2 font-display text-xl text-ink">
                  Start with the collection.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  Browse new arrivals, unstitched fabrics, and
                  occasion pieces at your own pace.
                </p>
                <Link
                  href="/collections"
                  className={`${buttonStyles({
                    variant: "ghost",
                    size: "sm",
                  })} mt-4 px-0`}
                >
                  Explore Collections
                </Link>
              </div>
            </div>
          </div>

          <section
            aria-labelledby="account-form-heading"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 id="account-form-heading" className="sr-only">
              Sign in or create an account
            </h2>
            <AccountForms />
          </section>
        </div>
      </Container>
    </>
  );
}
