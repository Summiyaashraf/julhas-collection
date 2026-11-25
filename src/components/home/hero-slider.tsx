"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

import { buttonStyles } from "@/components/ui/button-styles";
import { Container } from "@/components/ui/container";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { HOME_HERO_SLIDES } from "@/content/home";
import { cn } from "@/lib/utils/cn";

const AUTOPLAY_DELAY = 6000;
const SWIPE_THRESHOLD = 48;

export function HeroSlider() {
  const slideCount = HOME_HERO_SLIDES.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const swipeStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % slideCount);
  }, [slideCount]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slideCount < 2) {
      return;
    }

    const timer = window.setInterval(goToNext, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [goToNext, paused, reducedMotion, slideCount]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") {
      return;
    }

    swipeStartX.current = event.clientX;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if (swipeStartX.current === null) {
      return;
    }

    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD) {
      return;
    }

    if (distance > 0) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  const handlePointerCancel = () => {
    swipeStartX.current = null;
  };

  const activeSlide = HOME_HERO_SLIDES[activeIndex];

  return (
    <section
      aria-label="Featured collections"
      aria-roledescription="carousel"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className="relative isolate overflow-hidden bg-ink focus-visible:outline-none"
    >
      <div className="relative h-[calc(100svh-6.25rem)] min-h-[540px] max-h-[760px] w-full md:h-[72vh] md:min-h-[560px] md:max-h-[760px] xl:aspect-[16/7] xl:h-auto xl:min-h-[600px] xl:max-h-[820px]">
        {HOME_HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slideCount}`}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-luxe)]",
                isActive
                  ? "opacity-100"
                  : "pointer-events-none opacity-0",
              )}
            >
              <Image
                src={slide.desktopImage}
                alt={slide.imageAlt}
                fill
                sizes="100vw"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                className="hidden object-cover object-center md:block"
              />
              <Image
                src={slide.mobileImage}
                alt={slide.imageAlt}
                fill
                sizes="100vw"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                className="object-cover object-center md:hidden"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/5" />
              <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/85 via-ink/35 to-transparent md:block" />

              <Container className="relative z-10 flex h-full items-end pb-28 pt-20 md:items-center md:pb-24 md:pt-20">
                <div className="max-w-2xl text-stone-50">
                  <p className="eyebrow text-gold-soft">{slide.eyebrow}</p>
                  <h1 className="mt-4 max-w-xl text-balance font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[0.98] tracking-[-0.01em]">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-stone-100/85 md:text-base">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={slide.primaryCta.href}
                      tabIndex={isActive ? 0 : -1}
                      className={buttonStyles({
                        variant: "gold",
                        size: "md",
                        className: "w-full sm:w-auto",
                      })}
                    >
                      {slide.primaryCta.label}
                      <ArrowRightIcon size={16} />
                    </Link>
                    {slide.secondaryCta ? (
                      <Link
                        href={slide.secondaryCta.href}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control border border-stone-50/60 px-6 text-xs font-medium uppercase tracking-[0.16em] text-stone-50 transition-colors hover:bg-stone-50 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-soft sm:w-auto"
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </Container>
            </div>
          );
        })}

        <Container className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-between gap-4 md:bottom-7">
          <div
            className="flex items-center gap-2"
            aria-label="Slide navigation"
          >
            {HOME_HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={cn(
                  "h-1.5 transition-all duration-300",
                  index === activeIndex
                    ? "w-10 bg-stone-50"
                    : "w-5 bg-stone-50/45 hover:bg-stone-50/80",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="mr-2 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-stone-200/80 sm:inline"
            >
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slideCount).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous slide"
              className="inline-flex h-11 w-11 items-center justify-center border border-stone-50/35 text-stone-50 transition-colors hover:bg-stone-50 hover:text-ink"
            >
              <ArrowLeftIcon size={18} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next slide"
              className="inline-flex h-11 w-11 items-center justify-center border border-stone-50/35 text-stone-50 transition-colors hover:bg-stone-50 hover:text-ink"
            >
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </Container>

        <p className="sr-only" aria-live="polite">
          Slide {activeIndex + 1} of {slideCount}
          {activeSlide ? `: ${activeSlide.title}` : ""}
        </p>
      </div>
    </section>
  );
}
