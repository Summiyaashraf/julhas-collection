import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  POLICY_CONTENT,
  type PolicyContent as Policy,
} from "@/content/policies";
import {
  POLICY_SLUGS,
  type PolicySlug,
} from "@/lib/constants/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button-styles";
import { ChevronRightIcon } from "@/components/ui/icons";

type PolicyParams = PageProps<"/policies/[slug]">["params"];

function getPolicy(slug: string): Policy | undefined {
  return POLICY_SLUGS.includes(slug as PolicySlug)
    ? POLICY_CONTENT[slug as PolicySlug]
    : undefined;
}

export function generateStaticParams() {
  return POLICY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/policies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const policy = getPolicy(slug);

  if (!policy) {
    notFound();
  }

  return {
    title: policy.title,
    description: policy.description,
    alternates: { canonical: `/policies/${policy.slug}` },
    openGraph: {
      title: policy.title,
      description: policy.description,
    },
  };
}

export default function PolicyPage({
  params,
}: PageProps<"/policies/[slug]">) {
  return (
    <Suspense fallback={<PolicyFallback />}>
      <PolicyDetail params={params} />
    </Suspense>
  );
}

async function PolicyDetail({ params }: { params: PolicyParams }) {
  const { slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) {
    notFound();
  }

  const otherPolicies = POLICY_SLUGS.filter(
    (other) => other !== policy.slug,
  ).map((other) => ({
    slug: other,
    policy: POLICY_CONTENT[other],
  }));

  return (
    <>
      <header className="border-b border-sand bg-cream">
        <Container size="page" className="py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Customer Care" },
              { label: policy.title },
            ]}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:items-end">
            <div>
              <p className="eyebrow text-gold">{policy.eyebrow}</p>
              <h1 className="mt-4 text-balance font-display text-4xl leading-tight text-charcoal md:text-5xl lg:text-6xl">
                {policy.title}
              </h1>
            </div>
            <div className="border-t border-sand pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="text-sm leading-relaxed text-stone-600">
                {policy.description}
              </p>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
                Last updated: {policy.lastUpdated}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section className="bg-cream">
        <Container size="page" className="py-12 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
            <article className="max-w-3xl border border-sand bg-stone-50 p-6 md:p-10">
              {policy.isPlaceholder ? (
                <aside
                  role="note"
                  className="border-l-2 border-gold bg-gold-soft/10 py-3 pl-5 pr-4"
                >
                  <p className="eyebrow text-gold">Prototype Note</p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">
                    {policy.disclaimer}
                  </p>
                </aside>
              ) : null}

              <div className="mt-10 space-y-12">
                {policy.sections.map((section, index) => (
                  <section
                    key={section.heading}
                    id={`section-${index + 1}`}
                    className="scroll-mt-28 border-t border-sand pt-10 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="font-display text-lg text-gold/60"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-[1.75rem] leading-snug text-charcoal md:text-[2rem]">
                        {section.heading}
                      </h2>
                    </div>
                    {section.paragraphs?.length ? (
                      <div className="mt-4 space-y-4">
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-[15px] leading-8 text-stone-700"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : null}
                    {section.bullets?.length ? (
                      <ul className="mt-4 space-y-2.5">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-[15px] leading-8 text-stone-700"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <nav
                aria-label="On this page"
                className="border border-sand bg-stone-50 p-6"
              >
                <p className="eyebrow text-gold">On This Page</p>
                <ol className="mt-4 space-y-3">
                  {policy.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a
                        href={`#section-${index + 1}`}
                        className="group flex items-start gap-3 text-xs leading-relaxed text-stone-600 transition-colors hover:text-charcoal"
                      >
                        <span
                          aria-hidden="true"
                          className="font-display text-sm text-gold/70"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="underline-offset-4 group-hover:underline">
                          {section.heading}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="border border-sand bg-stone-50 p-6">
                <p className="eyebrow text-gold">Other Policies</p>
                <ul className="mt-4 space-y-3">
                  {otherPolicies.map(
                    ({ slug: otherSlug, policy: other }) => (
                      <li key={otherSlug}>
                        <Link
                          href={`/policies/${otherSlug}`}
                          className="group flex items-center justify-between gap-3 text-sm text-stone-700 transition-colors hover:text-gold"
                        >
                          <span>{other.title}</span>
                          <ChevronRightIcon
                            size={14}
                            className="text-stone-400 transition-colors group-hover:text-gold"
                          />
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="bg-charcoal p-6 text-stone-50">
                <p className="eyebrow text-gold-soft">Customer Care</p>
                <h2 className="mt-3 font-display text-2xl leading-snug">
                  Questions about this policy?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  Our team is happy to clarify anything that is not covered
                  here.
                </p>
                <Link
                  href="/contact"
                  className={buttonStyles({
                    variant: "gold",
                    size: "md",
                    className: "mt-5",
                  })}
                >
                  Contact Our Team
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function PolicyFallback() {
  return (
    <>
      <div role="status" className="sr-only">
        Loading policy
      </div>
      <header className="border-b border-sand bg-cream">
        <Container size="page" className="py-12 md:py-16">
          <div
            aria-hidden="true"
            className="h-3 w-56 animate-pulse rounded-full bg-stone-200"
          />
          <div
            aria-hidden="true"
            className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:items-end"
          >
            <div>
              <div className="h-3 w-24 animate-pulse rounded-full bg-stone-200" />
              <div className="mt-4 h-11 w-3/4 animate-pulse rounded bg-stone-200 md:h-14" />
            </div>
            <div className="border-t border-sand pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div className="h-3 w-full animate-pulse rounded-full bg-stone-200" />
              <div className="mt-2 h-3 w-4/5 animate-pulse rounded-full bg-stone-200" />
              <div className="mt-4 h-3 w-40 animate-pulse rounded-full bg-stone-200" />
            </div>
          </div>
        </Container>
      </header>

      <section className="bg-cream">
        <Container size="page" className="py-12 md:py-20">
          <div
            aria-hidden="true"
            className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20"
          >
            <div className="max-w-3xl space-y-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="border-t border-sand pt-8 first:border-t-0 first:pt-0"
                >
                  <div className="h-7 w-1/2 animate-pulse rounded bg-stone-200" />
                  <div className="mt-4 space-y-3">
                    <div className="h-3 w-full animate-pulse rounded-full bg-stone-200" />
                    <div className="h-3 w-11/12 animate-pulse rounded-full bg-stone-200" />
                    <div className="h-3 w-3/4 animate-pulse rounded-full bg-stone-200" />
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden space-y-6 lg:block">
              <div className="h-64 animate-pulse border border-sand bg-stone-50" />
              <div className="h-40 animate-pulse border border-sand bg-stone-50" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
