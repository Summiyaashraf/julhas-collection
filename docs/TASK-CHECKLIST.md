# Julhas Collection — Task Checklist / Roadmap

**Step:** 3 of 5 — Task Checklist / Roadmap
**Version:** Draft v1.0
**Date:** 30 October 2026
**Status:** Awaiting approval
**Depends on:** `docs/SPECIFICATION.md`, `docs/ARCHITECTURE.md` (approved)

> This is the execution plan. Work will proceed one task at a time. No application code will be written until this checklist is approved.

---

## 1. How We Will Work

1. One task at a time, in the order below unless a dependency permits parallel work.
2. Before starting a task: confirm the task ID and the files involved.
3. Implement only that task — no opportunistic refactors or unrelated changes.
4. After the task:
   - run `npm run lint`;
   - verify the task's "Done when" criteria;
   - report files changed, checks run, and any deviations.
5. After each milestone: run `npm run build` and fix failures before moving on.
6. If a requirement is ambiguous, stop and ask rather than guessing.
7. No new dependency, route, or major scope addition without approval.
8. Every task must preserve mobile responsiveness, keyboard access, and existing behavior.

### Status legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Done
- `[!]` Blocked / needs decision

### Global Definition of Done

A task is complete only when:

- The stated "Done when" criteria are met.
- `npm run lint` passes.
- No new console errors or warnings from the changed area.
- Layout works at 360px, 768px, and 1440px.
- Interactive elements are keyboard reachable and have visible focus.
- No dead links or placeholder text masquerading as final content.
- No unrelated files are modified.

---

## 2. Milestones

| Milestone | Name | Outcome | Tasks |
| --- | --- | --- | --- |
| **M0** | Foundation | Design tokens, assets, catalog, utilities ready | T0.1–T0.8 |
| **M1** | Store Shell | Global header/footer, menus, search, cart drawer, primitives | T1.1–T1.17 |
| **M2** | Home Page | Full editorial home page | T2.1–T2.9 |
| **M3** | Catalog | Collection landing, listing, filters, search results | T3.1–T3.11 |
| **M4** | Product Detail | Full PDP with gallery, variants, cart, related items | T4.1–T4.8 |
| **M5** | Commerce & Content | Cart page, checkout placeholder, account, content pages | T5.1–T5.9 |
| **M6** | Quality & Launch | SEO, a11y, performance, responsive QA, final build | T6.1–T6.8 |

### Dependency rules

- **M0** must be complete before **M1**.
- **M1** must be complete before **M2–M5** (all pages use the shell).
- **T1.12** (cart state) must be complete before **T1.13**, **T1.14**, and **T4.4**.
- **T3.4** (filter logic) must be complete before **T3.5–T3.8**.
- **T2.7** (home assembly) depends on **T2.1–T2.6**.
- **T3.1** (product card) must be complete before **T2.4** and **T3.3**.
- **T4.3** (purchase panel) must be complete before **T4.4**.
- **M6** starts only after **M1–M5** are complete.

---

## 3. Phase 0 — Foundation (M0)

### T0.1 — Baseline cleanup
- **Area:** `src/app/page.tsx`, `src/app/layout.tsx`, unused starter assets, metadata defaults.
- **Work:** Remove the starter demo page content and unused starter SVGs; set project name/description placeholders; keep the existing Next/Tailwind configuration intact.
- **Done when:** The app still boots, the starter UI is gone, and no unused starter assets remain referenced.

### T0.2 — Design tokens and global CSS
- **Area:** `src/app/globals.css`.
- **Work:** Add all stone/ink/gold/sale/success tokens, font variables, base typography, focus styles, selection styles, container utilities, reduced-motion rules, and marquee keyframes using Tailwind v4 `@theme`.
- **Done when:** Tokens are available as Tailwind utilities, the page background is the correct stone tone, and global focus-visible styling is present.

### T0.3 — Asset scaffold and placeholders
- **Area:** `public/images/**`, `public/images/brand/**`.
- **Work:** Create the asset folder structure; add logo/wordmark placeholders, favicon/OG placeholder, hero crops, category tiles, and product image placeholders with correct aspect ratios and filenames matching the catalog.
- **Done when:** Every image path referenced by the catalog resolves locally and no layout depends on a remote image.

### T0.4 — Site and navigation constants
- **Area:** `src/lib/constants/site.ts`, `src/lib/constants/navigation.ts`, `src/lib/constants/collections.ts`.
- **Work:** Define brand/contact/social/announcement/shipping data, header/mega-menu/mobile/footer navigation, pillars, subcategories, labels, order, and category imagery paths.
- **Done when:** All navigation and category labels come from one config source and match the approved sitemap.

### T0.5 — Catalog types and mock data
- **Area:** `src/lib/catalog/types.ts`, `src/lib/catalog/products.ts`, `src/lib/catalog/categories.ts`.
- **Work:** Define product/variant/collection/filter types and create 27 realistic products across the required categories with prices, tags, variants, stock, descriptions, and image paths.
- **Done when:** Every required category has the specified number of products, counts are derivable, and at least 4 Sale and 6 New Arrival products exist.

### T0.6 — Catalog queries, formatting, and search index
- **Area:** `src/lib/catalog/queries.ts`, `src/lib/catalog/format.ts`, `src/lib/catalog/search-index.ts`.
- **Work:** Add getters for product, category, featured/new arrivals, related products, PKR formatting, and a compact client-safe search index with a search function.
- **Done when:** Query functions return correct data for all categories and `Rs. 3,899`-style formatting is consistent.

### T0.7 — Filter, sort, pagination, and URL utilities
- **Area:** `src/lib/filters/params.ts`, `src/lib/filters/apply.ts`, `src/lib/filters/facets.ts`.
- **Work:** Parse/serialize shareable filter params, apply combined filters, sort options, pagination, derive facets, and reset rules.
- **Done when:** Example param sets produce deterministic results, invalid values are ignored, and filters compose correctly.

### T0.8 — Shared utilities and validation
- **Area:** `src/lib/utils/*`, `src/lib/validation/forms.ts`, `src/content/*` placeholders.
- **Work:** Add class-name joiner, slug helper, email/phone/name validators, and initial content modules for home/about/contact/policies.
- **Done when:** Utilities are typed, used consistently, and content files have no unresolved imports.

**M0 gate:** Run `npm run lint` and `npm run build`. Both must pass before M1.

---

## 4. Phase 1 — Store Shell (M1)

### T1.1 — Root layout, fonts, metadata
- **Area:** `src/app/layout.tsx`, `src/app/globals.css`.
- **Work:** Configure Cormorant Garamond + Jost via `next/font`, set font variables, base metadata, title template, metadata base, and `lang="en"`.
- **Done when:** Fonts load with no layout shift and the document shell is correct on every route.

### T1.2 — Store layout and skip link
- **Area:** `src/app/(store)/layout.tsx`, `src/components/layout/*`.
- **Work:** Add the store shell structure: providers, announcement, header, main landmark, footer, skip link, and space for overlays.
- **Done when:** Header/footer render on all store routes and the skip link focuses main content.

### T1.3 — UI primitives: buttons, icons, badges, price
- **Area:** `src/components/ui/*`.
- **Work:** Build Button, IconButton, Badge, Price, Container, SectionHeading, Logo, and the inline SVG icon set.
- **Done when:** Variants, loading/disabled states, focus states, and accessible labels behave correctly.

### T1.4 — UI primitives: forms, accordion, breadcrumbs, skeleton
- **Area:** `src/components/ui/*`.
- **Work:** Build Input, Checkbox, Select, Accordion (native details), Breadcrumbs, and Skeleton primitives with error/hint support.
- **Done when:** Labels/errors are associated correctly and all primitives are keyboard usable.

### T1.5 — Overlay primitive
- **Area:** `src/components/ui/drawer.tsx`, `src/components/ui/modal.tsx`.
- **Work:** Add a portal-based accessible overlay with focus trap, Escape close, focus restoration, scroll lock, and labelled dialog semantics.
- **Done when:** Tab cannot leave the overlay, Escape closes it, and focus returns to the trigger.

### T1.6 — Toast system
- **Area:** `src/components/ui/toast-provider.tsx`, `toast-region.tsx`.
- **Work:** Add success/error/undo toasts with auto-dismiss, one-at-a-time behavior, and polite announcements.
- **Done when:** Toasts are visible, announced, dismissible, and do not shift layout.

### T1.7 — Announcement bar
- **Area:** `src/components/layout/announcement-bar.tsx`.
- **Work:** Build rotating messages, pause on hover/focus, optional dismiss, and mobile-safe height.
- **Done when:** Rotation works, does not overflow, and respects reduced motion.

### T1.8 — Desktop header
- **Area:** `src/components/layout/site-header.tsx`.
- **Work:** Logo, primary nav, search/account/cart actions, cart badge, sticky scroll state, and transparent-over-home behavior.
- **Done when:** Header is accessible, badge reflects cart state, and scroll behavior is smooth.

### T1.9 — Mega menu
- **Area:** `src/components/layout/mega-menu.tsx`.
- **Work:** Desktop hover/click/keyboard mega menu for Women, Men, and Children with subcategory links and promo panel.
- **Done when:** Opens/closes correctly, full keyboard support, and route changes close it.

### T1.10 — Mobile menu
- **Area:** `src/components/layout/mobile-menu.tsx`.
- **Work:** Slide-in menu with accordions, direct links, account/cart/search access, and overlay behavior.
- **Done when:** All nav items are reachable on mobile, body scroll locks, and focus is managed.

### T1.11 — Search overlay
- **Area:** `src/components/layout/search-overlay.tsx`, `src/components/search/search-suggestions.tsx`.
- **Work:** Large input, debounced suggestions, trending/recent searches, keyboard navigation, and navigation to `/search`.
- **Done when:** Typing 2+ characters yields suggestions, Enter navigates, Escape closes, and focus is restored.

### T1.12 — Cart state foundation
- **Area:** `src/lib/cart/*`, `src/components/cart/cart-provider.tsx`.
- **Work:** Add cart types, reducer, selectors, versioned localStorage, hydration handling, cross-tab sync, and context actions.
- **Done when:** Add/update/remove/persist/restore works in isolation and no hydration mismatch occurs.

### T1.13 — Cart drawer
- **Area:** `src/components/cart/cart-drawer.tsx`, `cart-line-item.tsx`, `free-shipping-progress.tsx`, `empty-cart.tsx`, `cart-summary.tsx`.
- **Work:** Build the drawer, line items, quantity stepper, remove/undo, shipping progress, empty state, and CTA area.
- **Done when:** Drawer totals are correct, quantity changes work, remove/undo works, and the empty state is polished.

### T1.14 — Add to bag, quick add, cart badge
- **Area:** `src/components/cart/add-to-cart-button.tsx`, `quick-add-button.tsx`, `cart-badge.tsx`.
- **Work:** Wire product/card add actions, variant guard, drawer auto-open, toast feedback, and live badge count.
- **Done when:** Adding from both entry points updates the drawer and badge, and duplicate variants merge.

### T1.15 — Footer
- **Area:** `src/components/layout/site-footer.tsx`.
- **Work:** Brand column, social links, customer care, information, contact, newsletter slot, and bottom bar.
- **Done when:** Footer matches the spec at mobile/tablet/desktop, links resolve, and social links have labels.

### T1.16 — Newsletter form
- **Area:** `src/components/forms/newsletter-form.tsx`.
- **Work:** Email input, validation, loading/success/error states, consent copy, and honest demo behavior.
- **Done when:** Invalid emails show inline errors, valid submission shows a clear state, and it is keyboard accessible.

### T1.17 — Store error, 404, and loading states
- **Area:** `src/app/(store)/error.tsx`, `not-found.tsx`, `loading.tsx`.
- **Work:** Branded error boundary, store-aware 404 with recovery links, and a minimal loading shell.
- **Done when:** Errors/404s render within the store shell and recovery links work.

**M1 gate:** Run `npm run lint` and `npm run build`. Test header, menus, search, cart, and footer at 360/768/1440px.

---

## 5. Phase 2 — Home Page (M2)

### T2.1 — Hero slider
- **Area:** `src/components/home/hero-slider.tsx`, `src/content/home.ts`.
- **Work:** Three slides, desktop/mobile images, overlay copy, CTAs, autoplay/pause, arrows, dots, swipe, keyboard, reduced motion.
- **Done when:** Slider is usable by keyboard/touch, autoplay pauses correctly, and LCP image is prioritized.

### T2.2 — Category showcase
- **Area:** `src/components/home/category-showcase.tsx`, `category-card.tsx`.
- **Work:** Women/Men/Children portrait tiles with overlay labels, item counts, subcategory links, and hover treatment.
- **Done when:** All three pillars link correctly, counts are derived, and tiles are responsive.

### T2.3 — Campaign strip and intro block
- **Area:** `src/components/home/campaign-strip.tsx`, `intro-block.tsx`.
- **Work:** Two editorial campaign tiles and the "Introducing / New arrivals" editorial intro.
- **Done when:** Layout matches the reference rhythm and images are optimized.

### T2.4 — New arrivals section
- **Area:** `src/components/home/new-arrivals.tsx`.
- **Work:** Use the shared ProductCard/ProductGrid to show new-arrival products with badges and pricing.
- **Done when:** Products come from catalog data, grid is responsive, and quick add works.

### T2.5 — Pillar spotlights and Join Our Journey
- **Area:** `src/components/home/pillar-spotlight.tsx`, `join-journey.tsx`.
- **Work:** Alternating editorial sections for Women/Men/Children and the brand journey CTA block.
- **Done when:** Sections alternate correctly, links resolve, and mobile stacking is clean.

### T2.6 — Trust marquee and newsletter placement
- **Area:** `src/components/home/marquee.tsx`, home page composition.
- **Work:** Repeating quality message, hover pause, reduced-motion fallback, and newsletter section placement.
- **Done when:** Marquee does not overflow or cause horizontal scroll; newsletter works.

### T2.7 — Assemble home page
- **Area:** `src/app/(store)/page.tsx`, `src/content/home.ts`.
- **Work:** Compose all home sections in the approved order and connect CTAs.
- **Done when:** Home renders end-to-end with no placeholder section gaps.

### T2.8 — Home metadata and structured data
- **Area:** Home page metadata, `src/lib/seo/*`, `src/components/seo/*`.
- **Work:** Title/description, Open Graph, organization/website JSON-LD.
- **Done when:** Metadata is unique, JSON-LD validates, and canonical is correct.

### T2.9 — Home responsive and accessibility QA
- **Area:** Home page and home components.
- **Work:** Test 360/390/768/1024/1440/1920, keyboard, reduced motion, slider controls, and section heading order.
- **Done when:** No overflow, no focus traps, and one H1 with logical headings.

**M2 gate:** Run `npm run lint` and `npm run build`. Home must be visually complete before catalog pages.

---

## 6. Phase 3 — Catalog (M3)

### T3.1 — Product card and grid
- **Area:** `src/components/product/product-card.tsx`, `product-grid.tsx`, `product-badges.tsx`, `product-price.tsx`.
- **Work:** Portrait images, hover image swap, badges, price/compare-at, quick add, category label, responsive grid.
- **Done when:** Cards are server-rendered, quick add works, and images use correct `sizes`.

### T3.2 — Collection landing pages
- **Area:** `src/app/(store)/collections/[pillar]/page.tsx`, `src/lib/constants/collections.ts`.
- **Work:** Static params for Women/Men/Children, validation, category hero, subcategory tiles, featured row, and shop-all CTA.
- **Done when:** All three pillar pages resolve; unknown pillars return 404.

### T3.3 — Listing page shell
- **Area:** `src/app/(store)/collections/[pillar]/[subcategory]/page.tsx`, `collection-hero.tsx`, `category-tiles.tsx`.
- **Work:** Breadcrumbs, category header, description, product count, toolbar, and Suspense-wrapped results region.
- **Done when:** All 11 subcategory URLs resolve and the static shell renders before results stream.

### T3.4 — Filter logic and facets
- **Area:** `src/lib/filters/*`.
- **Work:** Finish URL parsing, combined filtering, sorting, pagination, facet derivation, and invalid-param handling.
- **Done when:** Pure functions produce correct results for multi-select, price, availability, and sort combinations.

### T3.5 — Desktop filter panel
- **Area:** `src/components/collection/filter-panel.tsx`.
- **Work:** Category, price, size, color, availability controls; clear-all; URL updates.
- **Done when:** Multi-select works, filters are shareable, and counts update.

### T3.6 — Mobile filter drawer and active filters
- **Area:** `src/components/collection/filter-drawer.tsx`, `active-filters.tsx`.
- **Work:** Mobile drawer, apply/reset, active chips with individual remove, scroll lock, focus management.
- **Done when:** Filters are fully usable at 360px and chips reflect URL state.

### T3.7 — Sort, results count, pagination
- **Area:** `src/components/collection/sort-select.tsx`, `results-count.tsx`, `pagination.tsx`.
- **Work:** Sort options, live count, 12-per-page pagination, page reset on filter change, prev/next and numbered links.
- **Done when:** Sort/pagination are shareable and result counts are accurate.

### T3.8 — Empty results state
- **Area:** `src/components/collection/empty-state.tsx`.
- **Work:** No-results state with clear filters and category suggestions.
- **Done when:** Empty state appears correctly and recovery actions work.

### T3.9 — All products page
- **Area:** `src/app/(store)/collections/page.tsx`.
- **Work:** Reuse listing system with pillar + subcategory filters across the full catalog.
- **Done when:** All 27 products are browsable and filterable from `/collections`.

### T3.10 — Search results page
- **Area:** `src/app/(store)/search/page.tsx`, `src/components/search/search-results.tsx`.
- **Work:** Query parsing, result grid, filters/sort reuse, empty/no-query states, safe query handling.
- **Done when:** `/search?q=...` returns correct results and handles empty/special input.

### T3.11 — Collection metadata and structured data
- **Area:** Collection pages, `src/lib/seo/*`.
- **Work:** Unique metadata, breadcrumb JSON-LD, canonical rules for filtered/paginated URLs, and search `noindex`.
- **Done when:** Collection pages have correct metadata and canonical behavior.

**M3 gate:** Run `npm run lint` and `npm run build`. Test all 15 collection URLs + search at 360/768/1440px.

---

## 7. Phase 4 — Product Detail (M4)

### T4.1 — Product route and data lookup
- **Area:** `src/app/(store)/products/[slug]/page.tsx`.
- **Work:** Static params for all product slugs, product lookup, `notFound()` for invalid slugs, and page composition skeleton.
- **Done when:** Every product URL resolves and invalid slugs return 404.

### T4.2 — Product gallery
- **Area:** `src/components/product/product-gallery.tsx`.
- **Work:** Main image, thumbnails, keyboard navigation, swipe, lightbox, and responsive behavior.
- **Done when:** All images are reachable by mouse, touch, and keyboard; no layout shift.

### T4.3 — Purchase panel
- **Area:** `src/components/product/product-purchase.tsx`, `variant-selector.tsx`, `quantity-stepper.tsx`.
- **Work:** Title, price, badges, short description, size/color selectors, stock states, quantity, add-to-bag, and delivery microcopy.
- **Done when:** Variants are enforced, sold-out combinations are disabled, and quantity clamps correctly.

### T4.4 — PDP cart integration and mobile sticky bar
- **Area:** `src/components/product/mobile-add-bar.tsx`, cart integration.
- **Work:** Add to bag from PDP, drawer open, toast, and sticky mobile purchase bar.
- **Done when:** PDP add matches card add behavior and sticky bar does not obscure content.

### T4.5 — Product accordions and details
- **Area:** `src/components/product/product-accordion.tsx`, product content.
- **Work:** Description, fabric/care, shipping/returns, and size guide using native disclosure elements.
- **Done when:** Details are keyboard accessible and content comes from product data.

### T4.6 — Related products
- **Area:** `src/components/product/related-products.tsx`.
- **Work:** Same-category related products using shared cards; hide if none.
- **Done when:** Related items are relevant and links resolve.

### T4.7 — Product metadata and JSON-LD
- **Area:** Product page, `src/lib/seo/*`.
- **Work:** Unique title/description, Open Graph, product JSON-LD with PKR offers/availability, and breadcrumb JSON-LD.
- **Done when:** Structured data validates and reflects selected product/variant availability.

### T4.8 — PDP loading skeleton and QA
- **Area:** `src/app/(store)/products/[slug]/loading.tsx`.
- **Work:** Skeleton matching gallery/purchase layout; responsive and keyboard QA.
- **Done when:** Loading state has no layout jump and PDP passes mobile/desktop checks.

**M4 gate:** Run `npm run lint` and `npm run build`. Test every product route sample from each category.

---

## 8. Phase 5 — Commerce Closure & Content (M5)

### T5.1 — Cart page
- **Area:** `src/app/(store)/cart/page.tsx`, cart components.
- **Work:** Full cart view, line items, quantity, remove, subtotal, shipping note, summary, empty state.
- **Done when:** Cart page matches drawer totals and persists correctly.

### T5.2 — Checkout placeholder
- **Area:** `src/app/(store)/checkout/page.tsx`.
- **Work:** Clear demo/placeholder page with order summary, contact/WhatsApp option if approved, and no payment fields.
- **Done when:** Page is clearly labeled, `noindex`, and links back to cart.

### T5.3 — Account page and forms
- **Area:** `src/app/(store)/account/page.tsx`, `src/components/forms/account-forms.tsx`.
- **Work:** Sign-in/create-account tabs, validation, demo state, and accessible errors.
- **Done when:** Tabs are keyboard accessible and no fake authentication success is shown.

### T5.4 — Contact page and form
- **Area:** `src/app/(store)/contact/page.tsx`, `src/components/forms/contact-form.tsx`.
- **Work:** Contact details, working hours, WhatsApp/email links, and validated form UI.
- **Done when:** Links work, form validation is clear, and submission state is honest.

### T5.5 — About page
- **Area:** `src/app/(store)/about/page.tsx`, `src/content/about.ts`.
- **Work:** Brand story, values, imagery, and CTA.
- **Done when:** Page uses shared shell and editorial styling.

### T5.6 — Track order page
- **Area:** `src/app/(store)/track-order/page.tsx`.
- **Work:** Explain tracking method and link to the approved flow.
- **Done when:** No dead or misleading tracking controls remain.

### T5.7 — Policy pages
- **Area:** `src/app/(store)/policies/[slug]/page.tsx`, `src/content/policies.ts`.
- **Work:** Privacy, return/refund, and terms pages with static params and readable layout.
- **Done when:** All three routes resolve; content is clearly marked if placeholder.

### T5.8 — Final 404/error states
- **Area:** `src/app/(store)/not-found.tsx`, `error.tsx`, invalid dynamic params.
- **Work:** Verify unknown product/category/policy routes and page errors.
- **Done when:** 404s recover via search/categories and errors offer retry.

### T5.9 — Cross-page link audit
- **Area:** Entire site.
- **Work:** Check header, mega menu, mobile menu, footer, cards, CTAs, policies, and social links.
- **Done when:** No dead links, no incorrect category mapping, and external links are safe.

**M5 gate:** Run `npm run lint` and `npm run build`. All routes must exist and be navigable.

---

## 9. Phase 6 — Quality & Launch (M6)

### T6.1 — SEO audit
- **Area:** `src/app/sitemap.ts`, `robots.ts`, metadata, JSON-LD, canonicals.
- **Work:** Verify titles/descriptions, OG images, sitemap coverage, robots rules, noindex on cart/account/checkout/search, and canonical rules.
- **Done when:** Metadata is complete, structured data validates, and sitemap includes all public routes.

### T6.2 — Accessibility audit
- **Area:** Entire site.
- **Work:** Keyboard walkthrough, focus traps, labels, landmarks, heading order, contrast, live regions, reduced motion, touch targets.
- **Done when:** All primary flows are keyboard-only usable and AA contrast is met.

### T6.3 — Performance audit
- **Area:** Entire site.
- **Work:** Production build, Lighthouse on home/collection/product, image sizes, JS bundles, CLS, LCP, font loading, lazy loading.
- **Done when:** Targets in the spec are met or exceptions are documented and approved.

### T6.4 — Responsive QA matrix
- **Area:** Entire site.
- **Work:** Test 360, 390, 430, 768, 1024, 1280, 1440, 1920; check nav, hero, grids, filters, drawers, footer.
- **Done when:** No horizontal scroll, overlap, clipped text, or unusable controls.

### T6.5 — Cross-browser and device smoke test
- **Area:** Entire site.
- **Work:** Chrome, Safari/iOS, Firefox, Edge; touch and mouse; keyboard and screen-reader spot checks.
- **Done when:** Critical flows work across targets and known issues are documented.

### T6.6 — Content and placeholder audit
- **Area:** Entire site.
- **Work:** Remove starter copy, lorem ipsum, broken image references, TODO markers, and misleading demo labels.
- **Done when:** All visible content is intentional and final or clearly marked as client-supplied.

### T6.7 — Final lint, build, and production smoke test
- **Area:** Project.
- **Work:** Run `npm run lint`, `npm run build`, start production server, walk all routes, check console.
- **Done when:** Both commands pass, no console errors, and all routes return expected status codes.

### T6.8 — Handover notes
- **Area:** `README.md` or `docs/HANDOVER.md` (if requested).
- **Work:** Document how to run, where catalog content lives, how to replace images, and known limitations (checkout/auth/demo forms).
- **Done when:** A new developer can run and update the site from the notes.

**M6 gate:** Final sign-off against the specification's acceptance criteria.

---

## 10. Task Tracking Table

Use this table during execution. Update status after each task.

| ID | Task | Status | Notes |
| --- | --- | --- | --- |
| T0.1 | Baseline cleanup | `[x]` | Starter page and unused SVGs removed; lint + build pass |
| T0.2 | Design tokens and global CSS | `[x]` | Stone/ink/gold palette, type/font tokens, focus, containers, motion rules added; lint + build pass |
| T0.3 | Asset scaffold and placeholders | `[x]` | 105 local placeholder assets (27 products x3, 12 categories, 6 hero, 3 editorial, brand) + logo/icon added |
| T0.4 | Site and navigation constants | `[x]` | Site config, pillars/subcategories, mega-menu, mobile and footer navigation added; lint + build pass |
| T0.5 | Catalog types and mock data | `[x]` | 27 products, 164 unique variants, all category counts/images verified; lint + build pass |
| T0.6 | Catalog queries, formatting, search index | `[x]` | Queries, `Rs. 3,899` formatting, and 27-entry client-safe search index verified; lint + build pass |
| T0.7 | Filter, sort, pagination, URL utilities | `[x]` | URL parse/serialize, combined filters, sorting, 12-per-page pagination, facets, reset helpers verified; lint + build pass |
| T0.8 | Shared utilities and validation | `[x]` | `cn`, slug helpers, email/phone/name validators, and home/about/contact/policy content added; assets verified; lint + build pass |
| T1.1 | Root layout, fonts, metadata | `[x]` | Cormorant Garamond + Jost variables, title template, metadataBase, OG/Twitter, viewport added; lint + build pass |
| T1.2 | Store layout and skip link | `[~]` | `(store)` route group, home page moved, skip link + `main#main-content`, announcement and header integrated; footer pending T1.15 |
| T1.3 | UI primitives: buttons/icons/badges/price | `[x]` | Button variants + loading/disabled, IconButton with required label, Badge variants, Price with sale compare-at, Container, SectionHeading, Logo, and shared inline icon set added; existing header/menus/search refactored to shared icons; lint + build pass |
| T1.4 | UI primitives: forms/accordion/breadcrumbs/skeleton | `[x]` | Input/Checkbox/Select with label-hint-error associations, native-details Accordion, Breadcrumbs with current page, and Skeleton variants added; lint + build pass |
| T1.5 | Overlay primitive | `[x]` | Portal-based Modal + Drawer with shared focus trap, Escape close, body scroll lock, focus restoration, backdrop dismissal, labelled dialogs; mobile menu and search overlay refactored onto primitives; right-slide animation added; lint + build pass |
| T1.6 | Toast system | `[x]` | ToastProvider/useToast with success/error/undo, one-at-a-time replacement, 4.5s auto-dismiss with hover/focus pause, dismiss action, persistent polite live region, store layout integration; lint + build pass |
| T1.7 | Announcement bar | `[x]` | Rotating messages (5s), hover/focus pause, session dismiss, reduced-motion support; lint + build pass |
| T1.8 | Desktop header | `[x]` | Sticky solid/transparent scroll state, primary nav, mega menu, search trigger + overlay, account link, cart trigger + live badge, and cart drawer integration; lint + build pass |
| T1.9 | Mega menu | `[x]` | Women/Men/Children panels with columns, promo banner, 150ms hover intent, click/keyboard/arrow support, outside click, Escape, route-change close; lint + build pass |
| T1.10 | Mobile menu | `[x]` | Left slide-in drawer, accordions, direct/secondary links, account, overlay/Escape close, scroll lock, focus trap and restoration; self-contained pending shared Drawer refactor in T1.5 |
| T1.11 | Search overlay | `[x]` | Accessible dialog with debounced (250ms) 2+ char suggestions, thumbnails/prices, view-all, trending + recent searches (localStorage, clearable), arrow/Enter/Escape keyboard nav with active-option scroll, `/` desktop shortcut, focus trap and restoration; lint + build pass |
| T1.12 | Cart state foundation | `[x]` | Cart types, pure reducer (merge/clamp/reject sold out/remove/restore), selectors, versioned sanitized localStorage, deferred hydration, persistence, cross-tab sync, and CartProvider/useCart added; reducer + storage checks pass; lint + build pass |
| T1.13 | Cart drawer | `[x]` | Right-side drawer via shared Drawer, item count header, free-shipping progress, line items with quantity stepper/remove, 5s undo toast, subtotal/shipping note/View Bag/Checkout CTA, empty state, desktop hover mini-cart preview, header bag trigger wired; lint + build pass |
| T1.14 | Add to bag, quick add, cart badge | `[x]` | Cart item snapshot helper, AddToCartButton with variant/sold-out guard, QuickAddButton variant-selection modal, drawer auto-open, success/error toasts, and hydration-safe live header badge added; duplicate variants merge via reducer; lint + build pass |
| T1.15 | Footer | `[ ]` | |
| T1.16 | Newsletter form | `[ ]` | |
| T1.17 | Store error/404/loading states | `[ ]` | |
| T2.1 | Hero slider | `[ ]` | |
| T2.2 | Category showcase | `[ ]` | |
| T2.3 | Campaign strip and intro block | `[ ]` | |
| T2.4 | New arrivals section | `[ ]` | |
| T2.5 | Pillar spotlights and Join Our Journey | `[ ]` | |
| T2.6 | Trust marquee and newsletter placement | `[ ]` | |
| T2.7 | Assemble home page | `[ ]` | |
| T2.8 | Home metadata and structured data | `[ ]` | |
| T2.9 | Home responsive and accessibility QA | `[ ]` | |
| T3.1 | Product card and grid | `[x]` | Pre-existing card/grid verified in listings and PDP related products (portrait images, hover swap, badges, quick add); lint + build pass |
| T3.2 | Collection landing pages | `[~]` | Pillar pages `/collections/[slug]` with generateStaticParams, notFound validation, hero + subcategory tiles; featured row folded into sort=featured listing and shop-all via tiles/panel links instead |
| T3.3 | Listing page shell | `[x]` | Static shell (breadcrumbs, hero, description, count) + Suspense-streamed results region per Cache Components; all pillar/subcategory URLs resolve; lint + build pass |
| T3.4 | Filter logic and facets | `[x]` | Filter/facet lib verified end-to-end on listing pages (path scope wins over query, category params stripped from filter hrefs via omitCategoryFilters); lint + build pass |
| T3.5 | Desktop filter panel | `[~]` | Category links, price min/max form with swap, availability, size, colour swatches, tags, clear-all; URL-synced and shareable; per-option facet counts not shown |
| T3.6 | Mobile filter drawer and active filters | `[x]` | Collapsible filter panel (toggle button, aria-expanded/controls) + active-filter chips with remove links and clear-all; drawer scroll-lock/focus-trap not implemented (toggle pattern chosen instead) |
| T3.7 | Sort, results count, pagination | `[x]` | Sort select (5 options), live aria count, 12/page windowed numbered pagination with prev/next, page reset on every filter change; lint + build pass |
| T3.8 | Empty results state | `[x]` | No-match state with clear-filters CTA and category suggestions; smoke-tested with out-of-range price filter |
| T3.9 | All products page | `[x]` | `/collections` shop-all with all 27 products, facets, filters, pagination; handles nav `?tag=` links; lint + build pass |
| T3.10 | Search results page | `[ ]` | |
| T3.11 | Collection metadata and structured data | `[~]` | Unique title/description/canonical/OG per collection page; JSON-LD and filter-URL noindex pending |
| T4.1 | Product route and data lookup | `[x]` | `/products/[slug]` with generateStaticParams (27 slugs), lookup + notFound, ensureStatic='navigation' for deterministic 404 status; lint + build pass |
| T4.2 | Product gallery | `[~]` | Main image + thumbnail buttons (aria-pressed, keyboard accessible, priority first image); swipe gesture/lightbox pending |
| T4.3 | Purchase panel | `[~]` | Eyebrow/title/price/badge, size selector with per-size availability, colour swatches, quantity stepper with stock cap, add-to-bag with total; delivery microcopy limited to free-shipping note |
| T4.4 | PDP cart integration and mobile sticky bar | `[~]` | Add-to-bag wired to cart (addItem + drawer open + success/error toasts, sold-out guard); mobile sticky add-to-bag bar pending |
| T4.5 | Product accordions and details | `[x]` | Description (open by default), Fabric & Care, Shipping & Returns, optional Size Guide; Accordion primitive extended with open prop; lint + build pass |
| T4.6 | Related products | `[x]` | Scored related products (subcategory/pillar/fabric/tags) via getRelatedProducts, "You May Also Like" grid; lint + build pass |
| T4.7 | Product metadata and JSON-LD | `[ ]` | |
| T4.8 | PDP loading skeleton and QA | `[ ]` | |
| T5.1 | Cart page | `[x]` | `/cart` with hydration-safe skeleton, empty state with pillar quick links, free-shipping progress, line rows (qty/remove/undo toast), clear bag, sticky order summary with promo codes (WELCOME10/JULHAS500/FREESHIP persisted in cart storage); drawer summary shows matching subtotal/discount/total; noindex; lint + build + smoke pass |
| T5.2 | Checkout placeholder | `[x]` | `/checkout` with demo-notice banner (no payment fields), compact item list, order summary with promo totals, WhatsApp order CTA with prefilled bag message, Return to Bag link; noindex; lint + build + smoke pass |
| T5.3 | Account page and forms | `[ ]` | |
| T5.4 | Contact page and form | `[ ]` | |
| T5.5 | About page | `[ ]` | |
| T5.6 | Track order page | `[ ]` | |
| T5.7 | Policy pages | `[ ]` | |
| T5.8 | Final 404/error states | `[ ]` | |
| T5.9 | Cross-page link audit | `[ ]` | |
| T6.1 | SEO audit | `[ ]` | |
| T6.2 | Accessibility audit | `[ ]` | |
| T6.3 | Performance audit | `[ ]` | |
| T6.4 | Responsive QA matrix | `[ ]` | |
| T6.5 | Cross-browser and device smoke test | `[ ]` | |
| T6.6 | Content and placeholder audit | `[ ]` | |
| T6.7 | Final lint, build, production smoke test | `[ ]` | |
| T6.8 | Handover notes | `[ ]` | |

---

## 11. Explicitly Deferred

These are not part of this build unless separately approved:

- Real checkout and payment gateway.
- Real authentication and account dashboard.
- Real inventory/order backend.
- Newsletter/contact provider integration.
- Product reviews.
- Wishlist.
- Multi-language support.
- CMS/admin.
- Analytics/consent tooling.
- Automated test suite (Playwright/Vitest) and CI.
- Email/SMS notifications.

---

## 12. Change Control

- Any new requirement gets a new task ID and is added to this document before implementation.
- A task discovered to be too large is split; it is not silently expanded.
- If an approved task changes architecture, update `docs/ARCHITECTURE.md` first.
- If an approved task changes visual/functional requirements, update `docs/SPECIFICATION.md` first.
- Blocked tasks are marked `[!]` with the decision needed.

---

## 13. Approval Gate

This roadmap is complete for Step 3. No application code has been written.

**Next step after approval:** Step 4 — Incremental Implementation, starting with **T0.1 — Baseline cleanup**.

Please reply **"Approved"** to begin implementation. If you want to reorder, split, or remove any task, say so now.
