# Julhas Collection — Architecture & File Plan

**Step:** 2 of 5 — Architecture & File Plan
**Version:** Draft v1.0
**Date:** 30 October 2026
**Status:** Awaiting approval
**Depends on:** `docs/SPECIFICATION.md` (approved)

> This document defines the technical architecture, routing, component boundaries, data flow, and file organization. No application code will be written until this plan is approved.

---

## 1. Architecture Goals

1. **Server-first rendering** with small, deliberate client islands.
2. **Static-first catalog** that works with the project's enabled Cache Components and Partial Prefetching.
3. **Clear separation** between routing, presentation, catalog data, cart state, and formatting utilities.
4. **No unnecessary dependencies** — use the existing Next.js, React, TypeScript, and Tailwind stack.
5. **Replaceable data layer** so the local mock catalog can later become a CMS/Shopify/API source without rewriting pages.
6. **Mobile-first, accessible interaction primitives** shared across menus, search, filters, cart, and galleries.
7. **Predictable folder structure** that keeps Step 3 tasks small and independently verifiable.

---

## 2. Confirmed Stack & Constraints

| Concern | Decision |
| --- | --- |
| Framework | Next.js 16.4.3, App Router |
| React | 19.3 |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 via `@tailwindcss/turbopack` |
| Compiler | React Compiler enabled |
| Caching | `cacheComponents: true`, `partialPrefetching: true` |
| Images | `next/image` |
| Fonts | `next/font` |
| Icons | Local inline SVG components |
| Animation | CSS transitions/keyframes + small React state; no animation library |
| State | React Context + reducer for cart/toasts; URL state for filters |
| Catalog | Local typed TypeScript data module |
| Dependencies | None added in the initial build |
| Deployment | Vercel or Node.js |
| Browser target | Current Chrome, Safari, Firefox, Edge; iOS Safari 15.4+ |

### Assumed defaults from the approved specification

Because the open questions were not individually answered, the architecture assumes:

1. Local neutral placeholder assets until final images are supplied.
2. Cormorant Garamond + Jost via `next/font/google`.
3. Checkout CTA points to a clearly labeled placeholder page.
4. Account area is UI-only.
5. Forms are demo-only with honest success/error states.
6. Wishlist is omitted from this phase.
7. Analytics is documented but not implemented.
8. Product catalog is realistic mock data.

These can be changed before implementation without affecting the architecture.

---

## 3. High-Level Architecture

```text
Browser
  │
  ├── Static shell (HTML + RSC payload)
  │     ├── Root layout (html, body, fonts, metadata)
  │     └── Store layout
  │           ├── Announcement bar (client island)
  │           ├── Site header (client island)
  │           ├── Page content (mostly server components)
  │           └── Footer (server component)
  │
  ├── Client islands
  │     ├── CartProvider / CartDrawer / CartBadge
  │     ├── SearchOverlay
  │     ├── MobileMenu / MegaMenu
  │     ├── HeroSlider
  │     ├── ProductGallery / ProductPurchase
  │     ├── FilterPanel / SortSelect
  │     └── Forms / Toasts
  │
  └── Local persistence
        └── localStorage: cart + (optional) recent searches
```

### Rendering model

- **Default:** Server Components for pages, catalog queries, product grids, metadata, and SEO.
- **Client:** Only components that need state, effects, browser APIs, or event handlers.
- **Static:** Home, collection shells, product pages, and content pages from local data.
- **Dynamic:** Filtered/paginated results and search results read `searchParams` inside a `<Suspense>` boundary so the surrounding shell can still prerender.
- **Future API:** Catalog query functions are async-ready. When a real API is introduced, add `use cache` + `cacheLife` + `cacheTag` at the data layer, not in page components.

---

## 4. Routing Plan

### 4.1 Route tree

```text
src/app/
  layout.tsx                                  Root layout: html, body, fonts, metadata
  globals.css                                 Tailwind import, theme tokens, base styles
  not-found.tsx                               Root fallback 404
  error.tsx                                   Root error boundary
  sitemap.ts                                  Generated sitemap
  robots.ts                                   Generated robots file

  (store)/
    layout.tsx                                Store shell + providers
    page.tsx                                  Home
    not-found.tsx                             Store-aware 404
    error.tsx                                 Store error boundary
    loading.tsx                               Optional global store loading state

    collections/
      page.tsx                                All products
      [pillar]/
        page.tsx                              Women / Men / Children landing
        [subcategory]/
          page.tsx                            Subcategory listing

    products/
      [slug]/
        page.tsx                              Product detail
        loading.tsx                           Product skeleton

    search/
      page.tsx                                Search results

    cart/
      page.tsx                                Full cart page

    checkout/
      page.tsx                                Placeholder checkout entry (noindex)

    account/
      page.tsx                                Sign in / create account UI

    about/
      page.tsx                                About Us

    contact/
      page.tsx                                Contact

    track-order/
      page.tsx                                Track order information

    policies/
      [slug]/
        page.tsx                              Privacy / Refund / Terms
```

### 4.2 URL mapping

| Route | Page |
| --- | --- |
| `/` | Home |
| `/collections` | All products |
| `/collections/women` | Women landing |
| `/collections/women/unstitched` | Women → Unstitched |
| `/collections/women/ready-to-wear` | Women → Ready To Wear |
| `/collections/women/luxury` | Women → Luxury |
| `/collections/women/fragrances` | Women → Fragrances |
| `/collections/men` | Men landing |
| `/collections/men/clothes` | Men → Clothes |
| `/collections/men/fragrances` | Men → Fragrances |
| `/collections/children` | Children landing |
| `/collections/children/kids-festive` | Children → Kids Festive |
| `/collections/children/casuals` | Children → Casuals |
| `/collections/children/accessories` | Children → Accessories |
| `/products/[slug]` | Product detail |
| `/search?q=` | Search |
| `/cart` | Cart fallback |
| `/checkout` | Placeholder |
| `/account` | Account UI |
| `/about` | About |
| `/contact` | Contact |
| `/track-order` | Track order |
| `/policies/[slug]` | Policies |

### 4.3 Route decisions

- Use a route group `(store)` so every customer-facing page shares the header/footer shell without affecting URLs.
- Use `[pillar]` and `[subcategory]` dynamic segments with central validation against the collection configuration; unknown values call `notFound()`.
- Use `generateStaticParams` for pillars, subcategories, product slugs, and policy slugs.
- Keep search and filtered listing results in `<Suspense>` so the static shell is not blocked by `searchParams`.
- Root `layout.tsx` owns `<html>`, `<body>`, fonts, and global metadata only. It does not render the store header.
- `(store)/layout.tsx` owns announcement, header, main, footer, providers, drawers, and toasts.

---

## 5. Directory & File Plan

### 5.1 Top-level

```text
src/
  app/                    Routing only
  components/             Shared presentation + interactive components
  content/                Static page/copy data
  lib/                    Catalog, cart, SEO, formatting, URL utilities
  fonts/                  Local font files if supplied later
public/
  images/
    brand/
    hero/
    categories/
    products/
    editorial/
  icons/                  Only if static icon files are needed
docs/
  SPECIFICATION.md
  ARCHITECTURE.md
  TASK-CHECKLIST.md       Created in Step 3
```

### 5.2 Application routes

```text
src/app/
  layout.tsx
  globals.css
  not-found.tsx
  error.tsx
  sitemap.ts
  robots.ts

  (store)/
    layout.tsx
    page.tsx
    not-found.tsx
    error.tsx
    loading.tsx

    collections/
      page.tsx
      loading.tsx
      [pillar]/
        page.tsx
        loading.tsx
        [subcategory]/
          page.tsx
          loading.tsx

    products/
      [slug]/
        page.tsx
        loading.tsx

    search/
      page.tsx

    cart/
      page.tsx

    checkout/
      page.tsx

    account/
      page.tsx

    about/
      page.tsx

    contact/
      page.tsx

    track-order/
      page.tsx

    policies/
      [slug]/
        page.tsx
```

### 5.3 Components

```text
src/components/
  layout/
    announcement-bar.tsx        client
    site-header.tsx             client
    mega-menu.tsx               client
    mobile-menu.tsx             client
    search-overlay.tsx          client
    site-footer.tsx             server
    skip-link.tsx               server
    container.tsx               server

  home/
    hero-slider.tsx             client
    category-showcase.tsx       server
    category-card.tsx           server
    campaign-strip.tsx          server
    intro-block.tsx             server
    new-arrivals.tsx            server
    pillar-spotlight.tsx        server
    join-journey.tsx            server
    marquee.tsx                 server (CSS animation)

  product/
    product-card.tsx            server
    product-grid.tsx            server
    product-badges.tsx          server
    product-price.tsx           server
    product-gallery.tsx         client
    product-purchase.tsx        client
    variant-selector.tsx        client
    quantity-stepper.tsx        client
    product-accordion.tsx       server (native details)
    related-products.tsx        server
    mobile-add-bar.tsx          client
    product-json-ld.tsx         server

  collection/
    collection-hero.tsx         server
    category-tiles.tsx          server
    filter-panel.tsx            client
    filter-drawer.tsx           client
    active-filters.tsx          client
    sort-select.tsx             client
    results-grid.tsx            server
    results-count.tsx           server
    pagination.tsx              server
    empty-state.tsx             server

  search/
    search-suggestions.tsx      client (used inside SearchOverlay)
    search-results.tsx          server

  cart/
    cart-provider.tsx           client
    cart-drawer.tsx             client
    cart-line-item.tsx          client
    cart-badge.tsx              client
    add-to-cart-button.tsx      client
    quick-add-button.tsx        client
    free-shipping-progress.tsx  client
    cart-summary.tsx            client
    empty-cart.tsx              client

  forms/
    newsletter-form.tsx         client
    contact-form.tsx            client
    account-forms.tsx           client

  ui/
    button.tsx                  server-safe
    icon-button.tsx             server-safe
    badge.tsx                   server
    price.tsx                   server
    input.tsx                   server-safe
    checkbox.tsx                server-safe
    select.tsx                  server-safe
    drawer.tsx                  client primitive
    modal.tsx                   client primitive
    accordion.tsx               server native details
    breadcrumbs.tsx             server
    section-heading.tsx         server
    skeleton.tsx                server
    toast-provider.tsx          client
    toast-region.tsx            client
    icons.tsx                   server-safe SVG components
    logo.tsx                    server
```

### 5.4 Library layer

```text
src/lib/
  constants/
    site.ts                     Brand, contact, social, announcement, shipping threshold
    navigation.ts               Header, mega menu, mobile menu, footer link groups
    collections.ts              Pillar/subcategory definitions, labels, order, imagery

  catalog/
    types.ts                    Product, variant, collection, filters, price types
    products.ts                 Mock product catalog
    categories.ts               Category metadata and derived counts
    queries.ts                  Get, filter, sort, paginate, related, facets
    search-index.ts             Compact client-safe search index
    format.ts                   PKR formatting helpers

  cart/
    types.ts                    Cart item, cart state, action types
    reducer.ts                  Pure cart reducer
    storage.ts                  Versioned localStorage read/write/sanitize
    selectors.ts                Count, subtotal, shipping progress

  filters/
    params.ts                   Parse/serialize search params
    apply.ts                    Filter and sort products
    facets.ts                   Derive available sizes/colors/price bounds

  seo/
    metadata.ts                 Page metadata builders
    jsonld.ts                   Product, breadcrumb, organization JSON-LD

  validation/
    forms.ts                    Email/phone/name validation helpers

  utils/
    cn.ts                       Small class-name joiner
    format.ts                   General formatting
    slug.ts                     Slug helpers
```

### 5.5 Content layer

```text
src/content/
  home.ts                       Hero slides, editorial blocks, marquee copy
  about.ts                      About page copy
  contact.ts                    Contact details/copy
  policies.ts                   Privacy, refund, terms content
  navigation.ts                 Re-export or compose nav content if needed
```

### 5.6 Public assets

```text
public/images/
  brand/logo.svg
  brand/logo-light.svg
  brand/og-default.jpg

  hero/hero-1-desktop.webp
  hero/hero-1-mobile.webp
  hero/hero-2-desktop.webp
  hero/hero-2-mobile.webp
  hero/hero-3-desktop.webp
  hero/hero-3-mobile.webp

  categories/women.webp
  categories/men.webp
  categories/children.webp
  categories/women-unstitched.webp
  categories/women-ready-to-wear.webp
  categories/women-luxury.webp
  categories/women-fragrances.webp
  categories/men-clothes.webp
  categories/men-fragrances.webp
  categories/children-kids-festive.webp
  categories/children-casuals.webp
  categories/children-accessories.webp

  products/[product-slug]/01.webp
  products/[product-slug]/02.webp
  products/[product-slug]/03.webp

  editorial/campaign-1.webp
  editorial/campaign-2.webp
  editorial/journey.webp
```

Asset rules:

- Prefer local WebP/AVIF assets.
- Use consistent 3:4 product and 4:5 category crops.
- Hero images need separate desktop and mobile crops.
- If final assets are unavailable, use neutral local placeholders with the correct aspect ratios; no broken images.
- Remote reference images require explicit approval and `images.remotePatterns` in `next.config.ts`.
- Do not hotlink the live site in production.

---

## 6. Rendering & Caching Strategy

| Page | Data source | Rendering | Notes |
| --- | --- | --- | --- |
| Home | Local catalog + content | Static | New arrivals computed at build |
| Collection landing | Local category config | Static | `generateStaticParams` for 3 pillars |
| Subcategory listing | Local catalog + `searchParams` | Static shell + streamed results | Results inside `<Suspense>` |
| All products | Local catalog + `searchParams` | Static shell + streamed results | Same listing system |
| Product detail | Local catalog | Static | `generateStaticParams` for all slugs |
| Search | Local search index + `searchParams` | Static shell + streamed results | Query awaited inside Suspense |
| Cart | Local storage | Server shell + client content | No server cart |
| Account / forms | None | Static shell + client forms | Demo only |
| Policies / About / Contact | Local content | Static | `generateStaticParams` for policies |

### Cache Components guidance

- Do not await `searchParams` at the page top level. Pass the promise into a child wrapped in `<Suspense>`.
- Keep static sections (hero, header, footer, category intro) outside the Suspense boundary.
- Local synchronous data is prerendered automatically; no `use cache` is required for the mock catalog.
- When the catalog becomes async, add `use cache` + `cacheLife` + `cacheTag('catalog')` to query functions.
- Use `generateStaticParams` for all known dynamic segments.
- Unknown dynamic params should render `notFound()` and not be treated as valid collections.
- No `force-dynamic` or `no-store` unless a real integration requires it.

### Partial Prefetching

- Use `next/link` for all internal navigation.
- Default App Shell prefetch is sufficient for most links.
- Use `prefetch={true}` only on high-intent links whose content depends on `searchParams`/params (for example, category links) if profiling shows a benefit.
- Do not over-prefetch product grids.

---

## 7. Component Boundaries

### Server Components

- Root and store layouts.
- Home page sections except the hero slider.
- Category landing content.
- Product card, grid, badges, price, accordions, related products.
- Collection hero, results grid, count, pagination, empty state.
- Search results.
- Footer, breadcrumbs, section headings, static content blocks.
- Product JSON-LD and metadata.

### Client Components

- Announcement bar (rotation/dismissal).
- Header (scroll state, menus, search overlay, cart badge).
- Mega menu and mobile menu.
- Cart provider, drawer, line items, add/quick-add, free-shipping progress, toasts.
- Hero slider.
- Product gallery and purchase panel (variants, quantity, add).
- Mobile add-to-cart bar.
- Filter panel, filter drawer, active filters, sort select.
- Newsletter, contact, and account forms.
- Search suggestions.

### Boundary rules

- Client components receive **serializable, minimal props**.
- Do not pass full catalog objects into client components when only an ID, title, price, image, and variants are needed.
- Keep `CartProvider` as low in the tree as possible while still wrapping both the header and page content. In this app, that means the store layout.
- Server children passed through a client provider remain server-rendered; do not import server-only modules into client components.
- No server secrets exist in this phase, but keep future API keys out of client modules.

---

## 8. Data Flow

### 8.1 Catalog

```text
Request
  → route page (server)
  → lib/catalog/queries
  → local product data
  → serializable product summaries
  → ProductCard / ProductGrid / ProductPurchase
```

- Product cards receive a `ProductSummary`-style object: id, slug, title, image(s), price, compare-at price, badges, category label, available variants summary.
- Product detail receives the full product.
- Category counts and facets are derived from data, never hardcoded.

### 8.2 Cart

```text
Add to bag
  → client action (AddToCartButton / QuickAddButton)
  → CartProvider reducer
  → localStorage sync
  → badge + drawer + totals update
  → toast announcement
```

- Cart state is client-only and browser-persisted.
- No server action or API is needed.
- The cart drawer is global to the store shell.
- Cart storage is versioned and sanitized on read.
- Hydration renders a neutral state first, then restores the cart after mount to avoid mismatches.

### 8.3 Filters and sorting

```text
Filter control
  → build URLSearchParams
  → router navigation
  → server page reads searchParams inside Suspense
  → filter/sort/paginate products
  → streamed results grid
```

- URL is the source of truth.
- Filter changes reset pagination to page 1.
- Active filters are derived from parsed params.
- Facets come from the current pillar/subcategory, not the filtered subset (so users can broaden their selection).
- Invalid or unknown params are ignored safely.

### 8.4 Search

```text
Header search icon
  → SearchOverlay opens
  → local compact search index
  → debounced suggestions
  → Enter → /search?q=...
  → server search results
```

- The client bundle imports only the compact index, not the full catalog.
- Search matches title, category, tags, and keywords.
- Suggestions are limited to 5.

### 8.5 Forms

- Client-side validation only in this phase.
- No network requests unless a provider is approved later.
- Success states must clearly indicate demo behavior where applicable.

---

## 9. Cart State Design

### State shape (conceptual)

- `items`: product id, variant id, title, image, unit price snapshot, quantity, max quantity.
- `isOpen`: drawer visibility.
- `isHydrated`: whether localStorage has been read.
- `lastAdded`: optional for toast/undo.

### Actions

- `hydrate`
- `add`
- `updateQuantity`
- `remove`
- `clear`
- `openDrawer`
- `closeDrawer`
- `restoreRemoved`

### Rules

- Merge duplicate variant lines.
- Clamp quantity to stock.
- Reject sold-out variants.
- Subtotal is derived, never stored.
- Free-shipping progress is derived from subtotal.
- Storage key is versioned (for example `julhas.cart.v1`).
- Malformed storage data is discarded.
- `storage` events may sync cart across tabs (optional; recommended).
- Undo removal keeps a snapshot for 5 seconds.

---

## 10. Navigation & Menu State

- Header uses pathname to decide transparent-over-hero behavior on `/`.
- Scroll listener toggles the solid header after a small threshold; listener is passive and cleaned up.
- Mega menu uses hover intent on desktop and click/keyboard on touch/keyboard.
- Only one overlay (mega menu, mobile menu, search, cart) is open at a time.
- Opening any overlay locks body scroll and returns focus to its trigger on close.
- Route change closes all overlays.
- Nav configuration lives in `lib/constants/navigation.ts`, shared by desktop and mobile menus.

---

## 11. Styling Architecture

- Tailwind v4 is configured through `@theme` tokens in `globals.css`; no `tailwind.config.js`.
- Design tokens:
  - Colors: stone, ink, gold, amber, sale, success.
  - Fonts: `--font-display`, `--font-sans`.
  - Type scale and tracking tokens where useful.
  - Container/gutter values.
- Use utility classes directly; extract a component only when the pattern repeats or carries behavior.
- Shared variants for buttons, badges, inputs, and links live in small UI components.
- Avoid inline hex values outside the theme except for one-off image overlays.
- Use CSS `clamp()` for fluid display typography.
- Use CSS keyframes for marquee and subtle reveals; no animation library.
- Respect `prefers-reduced-motion`.
- No dark mode toggle in this phase; the brand palette is fixed.

---

## 12. Image & Font Plan

### Images

- `next/image` everywhere.
- Local assets via static imports where possible to get automatic dimensions/blur.
- Otherwise use explicit `width`/`height` or `fill` inside a fixed aspect-ratio wrapper.
- Product cards: `sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"`.
- Hero: `priority` on the first slide only; remaining slides lazy.
- Category tiles: responsive `sizes`.
- Below-the-fold images use native lazy loading via `next/image`.
- Provide meaningful `alt` text from catalog data.

### Fonts

- `next/font/google` for Cormorant Garamond and Jost.
- Expose CSS variables and map them in `@theme`.
- Limit weights to those actually used.
- Use `display: "swap"`.
- If local font files are supplied, switch to `next/font/local` without changing component code.

---

## 13. Accessibility Architecture

- Shared `Drawer`/`Modal` primitive:
  - Rendered in a portal.
  - Focus trap while open.
  - Escape closes.
  - Focus returns to trigger.
  - `aria-modal`, labelled by a heading.
  - Body scroll lock.
  - Optional initial focus target.
- Shared `IconButton` requires an accessible label.
- Shared `Input` supports label, hint, and error association.
- Live regions for cart count, toasts, and filter result counts.
- Skip link at the top of the store layout.
- Semantic landmarks and one H1 per page.
- Menus use proper disclosure patterns with `aria-expanded`.
- Slider controls have labels and keyboard support.
- Native `<details>` for product accordions where possible.
- Reduced-motion handling in CSS and the hero slider.

---

## 14. SEO Architecture

- Root metadata: title template, description, metadata base, Open Graph defaults.
- Page-level `generateMetadata`:
  - Collection pages use category title/description/image.
  - Product pages use product SEO fields, price, image.
  - Policies use policy titles.
- JSON-LD:
  - Organization/website on home.
  - Product on product pages.
  - BreadcrumbList on collection and product pages.
- `sitemap.ts` enumerates static pages, pillars, subcategories, products, and policies.
- `robots.ts` allows the public site and disallows `/checkout`, `/account`, and `/cart` if appropriate.
- Canonicals:
  - Filtered/paginated collection URLs canonicalize to the base collection.
  - Search results are `noindex`.
  - Checkout and account are `noindex`.
- Use stable slugs and no duplicate route aliases.

---

## 15. Performance Architecture

- Keep catalog data server-side; only a compact search index reaches the client.
- Avoid making the entire page a client component because of the cart provider; use server children.
- Load the hero image with priority; lazy-load everything below the fold.
- Use fixed aspect ratios to prevent CLS.
- Keep third-party scripts at zero.
- Use CSS transitions rather than JS animation loops where possible.
- Avoid autoplay video on mobile.
- Split heavy overlays into client components only; they are still code-split by route.
- Use `content-visibility` cautiously for long grids, only after measuring.
- Measure with production build, not dev mode.
- Budget: initial route JS should stay lean; no icon or carousel libraries.

---

## 16. Error, Loading & Empty States

- Global error boundary with a branded fallback and "Try again".
- Store-level error boundary for page errors.
- Product/collection loading skeletons matching final layout dimensions.
- 404 page with search and category links.
- Empty cart, empty search, and empty filter results each have distinct copy and recovery actions.
- Missing product or category calls `notFound()`.
- Image fallback for missing assets (neutral branded placeholder).
- Form errors are inline and announced.

---

## 17. Implementation Conventions

- File names: kebab-case.
- Component names: PascalCase.
- One primary export per component file.
- Client components declare `"use client"` at the top.
- Server components do not import client-only modules.
- Use the `@/*` path alias.
- Prefer named constants over magic numbers.
- Price values are stored as integers in PKR.
- Use a single `formatPrice` helper everywhere.
- No `any`; use explicit types and discriminated unions where useful.
- No comments unless they explain non-obvious behavior.
- Keep components small enough to test visually and reason about.
- Follow existing project formatting and ESLint rules.
- Use `PageProps<'/route'>` / `LayoutProps<'/route'>` helpers where applicable.
- Run `npm run lint` after each task and `npm run build` at milestones.

---

## 18. Testing & Verification Strategy

No test framework is currently installed.

For this phase:

1. `npm run lint` after every task.
2. `npm run build` after each major layer (shell, catalog, cart, filters, pages).
3. Manual responsive QA at 360, 390, 768, 1024, 1440, and 1920px.
4. Keyboard-only walkthrough of header, menus, search, filters, gallery, and cart.
5. localStorage persistence test across reloads.
6. Production-mode Lighthouse checks on home, collection, and product pages.
7. Verify all routes return 200/404 correctly and no console errors.

If approved later, add Playwright for critical flows and Vitest for cart/filter pure functions. No test dependency will be added without approval.

---

## 19. Risks & Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Final imagery unavailable | Visual fidelity suffers | Use correct-ratio local placeholders; swap via data layer |
| Reference fonts differ | Brand mismatch | Use agreed Cormorant + Jost; switch to local fonts if supplied |
| Men/Children content absent from reference | Inconsistent look | Reuse the same editorial components and art direction |
| Cart hydration mismatch | Flicker/wrong count | Hydrate after mount; render neutral badge until ready |
| `searchParams` blocks prerender | Slow route shell | Await inside `<Suspense>`; static header/hero outside |
| Filter URL complexity | Bugs/shareability issues | Central parse/serialize module + pure tests if approved |
| Drawer focus management | Accessibility failures | One shared primitive with focus trap/restore |
| Too many client components | Bundle bloat | Server-first boundaries; compact search index only |
| Image CLS | Poor Core Web Vitals | Explicit ratios and `sizes` on every image |
| Hotlinked reference assets | Legal/availability risk | Prefer supplied/local assets; require approval for remote |
| Placeholder checkout | User confusion | Clear "demo" labeling and documented limitation |

---

## 20. Architecture Decisions Summary

| # | Decision | Rationale |
| --- | --- | --- |
| 1 | Use `(store)` route group | Shared shell without URL changes |
| 2 | Dynamic `[pillar]/[subcategory]` routes | Avoid duplicate page files; central validation |
| 3 | Local typed catalog | Fast, static, replaceable later |
| 4 | Client-only cart with localStorage | No backend required; real UX |
| 5 | URL as filter/sort source of truth | Shareable, server-renderable, back-button friendly |
| 6 | Server-first components | Performance and smaller client bundles |
| 7 | One accessible overlay primitive | Consistent focus/escape/scroll behavior |
| 8 | Tailwind v4 `@theme` tokens | Single source for brand design tokens |
| 9 | No new dependencies | Lower risk and bundle size |
| 10 | Suspense around `searchParams` | Preserves static shell with Cache Components |

---

## 21. Approval Gate

This architecture is complete for Step 2. No application code has been written.

**Next step after approval:** Step 3 — Task Checklist / Roadmap.

Please reply **"Approved"** to proceed. If you want changes to routing, folder structure, state management, or any assumed default, list them now.
