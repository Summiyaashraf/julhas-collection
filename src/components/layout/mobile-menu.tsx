"use client";

import Link from "next/link";
import { useRef } from "react";

import type { RefObject } from "react";

import { Drawer } from "@/components/ui/drawer";
import {
  ChevronDownIcon,
  CloseIcon,
} from "@/components/ui/icons";
import {
  MAIN_NAVIGATION,
  MOBILE_SECONDARY_LINKS,
} from "@/lib/constants/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({
  open,
  onClose,
  returnFocusRef,
}: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      id="mobile-menu"
      labelledBy="mobile-menu-title"
      returnFocusRef={returnFocusRef}
      initialFocusRef={closeButtonRef}
      widthClassName="w-[88vw] max-w-sm"
      overlayClassName="lg:hidden"
    >
      <div className="flex items-center justify-between border-b border-stone-300 px-5 py-4">
        <h2 id="mobile-menu-title" className="font-display text-2xl text-ink">
          Menu
        </h2>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold"
        >
          <CloseIcon />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
        <ul className="flex flex-col">
          {MAIN_NAVIGATION.map((item) => {
            if (!item.menu) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-12 items-center border-b border-stone-200 text-sm font-medium uppercase tracking-[0.14em] text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            const subcategoryLinks = item.menu.columns[0]?.links ?? [];
            const shopAllLink = item.menu.columns[1]?.links[0];

            return (
              <li key={item.label}>
                <details className="group border-b border-stone-200">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-sm font-medium uppercase tracking-[0.14em] text-ink [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <ul className="pb-4 pl-4">
                    {shopAllLink ? (
                      <li>
                        <Link
                          href={shopAllLink.href}
                          onClick={onClose}
                          className="flex min-h-10 items-center text-sm font-medium text-gold"
                        >
                          {shopAllLink.label}
                        </Link>
                      </li>
                    ) : null}
                    {subcategoryLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex min-h-10 items-center text-sm text-stone-700"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          })}

          {MOBILE_SECONDARY_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex min-h-12 items-center border-b border-stone-200 text-sm text-stone-700 last:border-b-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  );
}
