"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";

import { CartBadge } from "@/components/cart/cart-badge";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCart } from "@/components/cart/cart-provider";
import { MiniCartPreview } from "@/components/cart/mini-cart-preview";
import { MegaMenuPanel } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchOverlay } from "@/components/layout/search-overlay";
import {
  BagIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { MAIN_NAVIGATION } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

const HOVER_DELAY = 150;

function getMenuId(label: string) {
  return `mega-menu-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

function getTriggerId(label: string) {
  return `nav-trigger-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const {
    isOpen: cartOpen,
    count: cartCount,
    openDrawer,
    closeDrawer,
  } = useCart();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const cartPreviewRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const cartPreviewTimerRef = useRef<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [renderedPathname, setRenderedPathname] = useState(pathname);

  const clearOpenTimer = useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const clearMenuTimers = useCallback(() => {
    clearOpenTimer();
    clearCloseTimer();
  }, [clearOpenTimer, clearCloseTimer]);

  const closeMegaMenu = useCallback(() => {
    clearMenuTimers();
    setActiveMenu(null);
  }, [clearMenuTimers]);

  const openMegaMenu = useCallback(
    (label: string) => {
      clearMenuTimers();
      setActiveMenu(label);
    },
    [clearMenuTimers],
  );

  const scheduleOpen = useCallback(
    (label: string) => {
      clearMenuTimers();
      openTimerRef.current = window.setTimeout(() => {
        setActiveMenu(label);
        openTimerRef.current = null;
      }, HOVER_DELAY);
    },
    [clearMenuTimers],
  );

  const scheduleClose = useCallback(() => {
    clearOpenTimer();
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveMenu(null);
      closeTimerRef.current = null;
    }, HOVER_DELAY);
  }, [clearOpenTimer, clearCloseTimer]);

  const cancelScheduledClose = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const closeMobileMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const clearCartPreviewTimer = useCallback(() => {
    if (cartPreviewTimerRef.current !== null) {
      window.clearTimeout(cartPreviewTimerRef.current);
      cartPreviewTimerRef.current = null;
    }
  }, []);

  const closeCartPreview = useCallback(() => {
    clearCartPreviewTimer();
    setCartPreviewOpen(false);
  }, [clearCartPreviewTimer]);

  const showCartPreview = useCallback(() => {
    clearCartPreviewTimer();

    if (
      cartOpen ||
      cartCount === 0 ||
      searchOpen ||
      menuOpen ||
      activeMenu !== null
    ) {
      return;
    }

    setCartPreviewOpen(true);
  }, [
    activeMenu,
    cartCount,
    cartOpen,
    clearCartPreviewTimer,
    menuOpen,
    searchOpen,
  ]);

  const scheduleCartPreviewClose = useCallback(() => {
    clearCartPreviewTimer();
    cartPreviewTimerRef.current = window.setTimeout(() => {
      setCartPreviewOpen(false);
      cartPreviewTimerRef.current = null;
    }, HOVER_DELAY);
  }, [clearCartPreviewTimer]);

  const openSearch = useCallback(() => {
    closeCartPreview();
    setMenuOpen(false);
    closeMegaMenu();
    closeDrawer();
    setSearchOpen(true);
  }, [closeCartPreview, closeDrawer, closeMegaMenu]);

  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
    setCartPreviewOpen(false);
    setActiveMenu(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (openTimerRef.current !== null) {
        window.clearTimeout(openTimerRef.current);
      }
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
      if (cartPreviewTimerRef.current !== null) {
        window.clearTimeout(cartPreviewTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!cartPreviewOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!cartPreviewRef.current?.contains(event.target as Node)) {
        closeCartPreview();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCartPreview();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [cartPreviewOpen, closeCartPreview]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key !== "/" ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        searchOpen ||
        menuOpen ||
        cartOpen ||
        activeMenu !== null
      ) {
        return;
      }

      const target = event.target;

      if (target instanceof HTMLElement) {
        const tagName = target.tagName;

        if (
          target.isContentEditable ||
          tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          tagName === "SELECT"
        ) {
          return;
        }
      }

      event.preventDefault();
      openSearch();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeMenu, cartOpen, menuOpen, openSearch, searchOpen]);

  useEffect(() => {
    if (!activeMenu) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeMegaMenu();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      const trigger = document.getElementById(getTriggerId(activeMenu));
      closeMegaMenu();
      trigger?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeMenu, closeMegaMenu]);

  const focusMenuLink = (label: string, position: "first" | "last") => {
    window.requestAnimationFrame(() => {
      const panel = document.getElementById(getMenuId(label));
      const links = panel
        ? Array.from(panel.querySelectorAll<HTMLAnchorElement>("a[href]"))
        : [];

      if (links.length === 0) {
        return;
      }

      const target = position === "first" ? links[0] : links[links.length - 1];
      target.focus();
    });
  };

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    label: string,
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMegaMenu(label);
      focusMenuLink(label, event.key === "ArrowDown" ? "first" : "last");
    }
  };

  const handleTriggerClick = (
    event: ReactMouseEvent<HTMLButtonElement>,
    label: string,
  ) => {
    if (activeMenu === label) {
      closeMegaMenu();
      return;
    }

    openMegaMenu(label);

    if (event.detail === 0) {
      focusMenuLink(label, "first");
    }
  };

  const handleTriggerEnter = (label: string) => {
    clearCloseTimer();

    if (activeMenu === label) {
      clearOpenTimer();
      return;
    }

    scheduleOpen(label);
  };

  const isHome = pathname === "/";
  const solid =
    scrolled ||
    !isHome ||
    menuOpen ||
    cartPreviewOpen ||
    activeMenu !== null;

  const isCurrent = (href: string) =>
    pathname === href ||
    (href !== "/" && pathname.startsWith(`${href}/`));

  const activeNavItem = MAIN_NAVIGATION.find(
    (item) => item.label === activeMenu,
  );

  return (
    <header
      ref={headerRef}
      onMouseLeave={scheduleClose}
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        solid
          ? "border-stone-300 bg-stone-100/95 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[76px]">
          <div className="flex items-center justify-start">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                closeMegaMenu();
                closeDrawer();
                closeCartPreview();
                setSearchOpen(false);
                setMenuOpen((open) => !open);
              }}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold lg:hidden"
            >
              <MenuIcon />
            </button>
            <Link
              href="/"
              aria-label={`${siteConfig.name} home`}
              className="hidden items-center lg:inline-flex"
            >
              <Logo priority />
            </Link>
          </div>

          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="inline-flex items-center justify-center lg:hidden"
          >
            <Logo size="sm" priority />
          </Link>

          <nav aria-label="Primary" className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-8 xl:gap-10">
              {MAIN_NAVIGATION.map((item) => (
                <li
                  key={item.label}
                  onMouseEnter={
                    item.menu
                      ? () => handleTriggerEnter(item.label)
                      : closeMegaMenu
                  }
                  onMouseLeave={item.menu ? scheduleClose : undefined}
                >
                  {item.menu ? (
                    <button
                      id={getTriggerId(item.label)}
                      type="button"
                      aria-expanded={activeMenu === item.label}
                      aria-controls={getMenuId(item.label)}
                      aria-haspopup="true"
                      onClick={(event) =>
                        handleTriggerClick(event, item.label)
                      }
                      onKeyDown={(event) =>
                        handleTriggerKeyDown(event, item.label)
                      }
                      onFocus={() => {
                        if (activeMenu && activeMenu !== item.label) {
                          closeMegaMenu();
                        }
                      }}
                      className={cn(
                        "inline-flex h-11 items-center text-[13px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-gold",
                        isCurrent(item.href) ? "text-gold" : "text-ink",
                      )}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMegaMenu}
                      onFocus={closeMegaMenu}
                      aria-current={
                        isCurrent(item.href) ? "page" : undefined
                      }
                      className={cn(
                        "inline-flex h-11 items-center text-[13px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-gold",
                        isCurrent(item.href) ? "text-gold" : "text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <button
              ref={searchButtonRef}
              type="button"
              onClick={openSearch}
              aria-label="Search"
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              aria-controls="search-overlay"
              className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold"
            >
              <SearchIcon />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold sm:inline-flex"
            >
              <UserIcon />
            </Link>
            <div
              ref={cartPreviewRef}
              className="relative"
              onMouseEnter={showCartPreview}
              onMouseLeave={scheduleCartPreviewClose}
            >
              <button
                ref={cartButtonRef}
                type="button"
                onClick={() => {
                  closeCartPreview();
                  setMenuOpen(false);
                  setSearchOpen(false);
                  closeMegaMenu();
                  openDrawer();
                }}
                aria-label="Open bag"
                aria-haspopup="dialog"
                aria-expanded={cartOpen}
                aria-controls="cart-drawer"
                className="relative inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold"
              >
                <BagIcon />
                <CartBadge />
              </button>
              <MiniCartPreview
                open={cartPreviewOpen}
                onClose={closeCartPreview}
              />
            </div>
          </div>
        </div>
      </div>

      {activeNavItem?.menu ? (
        <MegaMenuPanel
          id={getMenuId(activeNavItem.label)}
          menu={activeNavItem.menu}
          onNavigate={closeMegaMenu}
          onMouseEnter={cancelScheduledClose}
          onMouseLeave={scheduleClose}
        />
      ) : null}

      <MobileMenu
        open={menuOpen}
        onClose={closeMobileMenu}
        returnFocusRef={menuButtonRef}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={closeSearch}
        returnFocusRef={searchButtonRef}
      />

      <CartDrawer
        open={cartOpen}
        onClose={closeDrawer}
        returnFocusRef={cartButtonRef}
      />
    </header>
  );
}
