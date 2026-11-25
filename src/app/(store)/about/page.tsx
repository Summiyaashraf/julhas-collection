import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ABOUT_CONTENT } from "@/content/about";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button-styles";
import {
  ArrowRightIcon,
  EyeIcon,
  TargetIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About Us",
  description: ABOUT_CONTENT.intro,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us",
    description: ABOUT_CONTENT.intro,
    images: [{ url: ABOUT_CONTENT.journey.image.src }],
  },
};

export default function AboutPage() {
  const { hero, journey, founder, visionMission, cta } = ABOUT_CONTENT;

  return (
    <>
      <section className="relative overflow-hidden bg-stone-950 text-stone-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 border border-stone-50/10 sm:inset-6 md:inset-8"
        />
        <Container
          size="page"
          className="relative flex min-h-[72vh] flex-col items-center justify-center py-24 text-center md:min-h-[76vh] md:py-32"
        >
          <p className="eyebrow text-gold-soft">{hero.eyebrow}</p>
          <span aria-hidden="true" className="mt-6 h-px w-14 bg-gold/70" />
          <h1 className="mt-6 font-display text-5xl leading-none tracking-[0.12em] text-stone-50 sm:text-7xl sm:tracking-[0.18em] md:text-8xl lg:text-[7.5rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-balance font-display text-xl italic leading-snug text-stone-300 md:text-2xl">
            {hero.tagline}
          </p>
          <div
            aria-hidden="true"
            className="mt-10 flex items-center gap-3 text-gold/70"
          >
            <span className="h-px w-8 bg-current" />
            <span className="h-1.5 w-1.5 rotate-45 border border-current" />
            <span className="h-px w-8 bg-current" />
          </div>
        </Container>
      </section>

      <section className="bg-stone-100">
        <Container size="page" className="py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
                <Image
                  src={journey.image.src}
                  alt={journey.image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 ring-1 ring-inset ring-stone-950/10"
                />
              </div>
              <div className="absolute -bottom-6 right-4 hidden max-w-[15rem] border border-stone-300 bg-stone-50 px-6 py-5 shadow-menu sm:block lg:-right-6">
                <p className="eyebrow text-gold">{journey.image.badge}</p>
                <p className="mt-2 font-display text-lg leading-snug text-ink">
                  {journey.image.caption}
                </p>
              </div>
            </div>

            <div>
              <p className="eyebrow text-gold">{journey.eyebrow}</p>
              <h2 className="mt-4 text-balance font-display text-4xl leading-tight text-ink md:text-5xl">
                {journey.title}
              </h2>
              <div className="mt-6 space-y-5">
                {journey.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-stone-700 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <Link
                href={cta.href}
                className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-ink underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                Discover the collection
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-stone-200 bg-stone-50">
        <Container size="page" className="py-20 md:py-28">
          <figure className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-gold">{founder.eyebrow}</p>
            <span
              aria-hidden="true"
              className="mt-8 block font-display text-7xl leading-none text-gold/40"
            >
              &ldquo;
            </span>
            <blockquote className="-mt-4">
              <p className="text-balance font-display text-2xl italic leading-relaxed text-ink md:text-3xl">
                {founder.quote}
              </p>
            </blockquote>
            <figcaption className="mt-8">
              <span
                aria-hidden="true"
                className="mx-auto block h-px w-12 bg-gold/60"
              />
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-ink">
                {founder.name}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-stone-500">
                {founder.role}
              </p>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="bg-stone-100">
        <Container size="page" className="py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold">{visionMission.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">
              {visionMission.title}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="border border-stone-300 bg-stone-50 p-8 transition-colors hover:border-gold/60 md:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-stone-100 text-gold">
                  <EyeIcon size={20} />
                </span>
                <span className="font-display text-3xl text-stone-300">
                  01
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-ink">
                {visionMission.vision.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {visionMission.vision.description}
              </p>
            </article>

            <article className="border border-stone-300 bg-stone-50 p-8 transition-colors hover:border-gold/60 md:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-stone-100 text-gold">
                  <TargetIcon size={20} />
                </span>
                <span className="font-display text-3xl text-stone-300">
                  02
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-ink">
                {visionMission.mission.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {visionMission.mission.description}
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-stone-950 text-stone-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 border border-stone-50/10 sm:inset-6 md:inset-8"
        />
        <Container size="page" className="relative py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-soft">{cta.eyebrow}</p>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              {cta.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-stone-300 md:text-base">
              {cta.description}
            </p>
            <Link
              href={cta.href}
              className={buttonStyles({
                variant: "gold",
                size: "lg",
                className: "mt-8",
              })}
            >
              {cta.label}
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
