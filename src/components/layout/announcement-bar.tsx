"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { siteConfig } from "@/lib/constants/site";

const DISMISS_KEY = "julhas.announcement.dismissed.v1";
const DISMISS_EVENT = "julhas:announcement-dismissed";
const ROTATION_INTERVAL = 5000;

let memoryDismissed = false;

function readDismissed() {
  try {
    return (
      memoryDismissed ||
      window.sessionStorage.getItem(DISMISS_KEY) === "true"
    );
  } catch {
    return memoryDismissed;
  }
}

function writeDismissed() {
  memoryDismissed = true;

  try {
    window.sessionStorage.setItem(DISMISS_KEY, "true");
  } catch {
    return;
  }
}

function subscribeToDismissal(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(DISMISS_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(DISMISS_EVENT, onStoreChange);
  };
}

export function AnnouncementBar() {
  const messages = siteConfig.announcementMessages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dismissed = useSyncExternalStore(
    subscribeToDismissal,
    readDismissed,
    () => false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || dismissed || reducedMotion || messages.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % messages.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(timer);
  }, [paused, dismissed, reducedMotion, messages.length]);

  if (dismissed) {
    return null;
  }

  const dismiss = () => {
    writeDismissed();
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return (
    <section
      aria-label="Store announcements"
      className="relative bg-ink text-stone-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container-page flex h-9 items-center justify-center md:h-10">
        <p
          key={activeIndex}
          className="animate-fade-in truncate px-10 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-stone-50 sm:tracking-[0.18em]"
        >
          {messages[activeIndex]}
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-1 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center text-stone-300 transition-colors hover:text-gold-soft md:right-2"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="h-4 w-4"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </section>
  );
}
