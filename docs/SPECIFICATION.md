# Julhas Collection — Website Recreation Specification

**Step:** 1 of 5 — Detailed Specification
**Version:** Draft v1.0
**Date:** 30 October 2026
**Status:** Awaiting approval
**Reference:** https://julhascollection.com/

> This document defines what will be built and how it should look, feel, and behave. No application code will be written until this specification is approved.

---

## 1. Purpose & Success Criteria

Recreate the Julhas Collection storefront as a fast, responsive, accessible e-commerce front end using Next.js App Router, TypeScript, and Tailwind CSS.

The finished site must:

1. Visually match the reference's earthy, editorial, premium South Asian fashion aesthetic.
2. Preserve the requested category flow: **Men**, **Women**, and **Children**, with the specified subcategories.
3. Reproduce the key commerce journey: discover → browse category → view product → add to cart → cart drawer → checkout entry point.
4. Feel authentic to a Pakistani fashion label, with PKR pricing, local shipping messaging, and WhatsApp/social contact.
5. Work beautifully from 360px mobile through 1920px desktop.
6. Pass the acceptance criteria in Section 16.

### Non-goals for this build

- Real payment gateway integration.
- Real inventory, order, or customer database.
- Admin dashboard or CMS.
- Production authentication.
- Email/SMS automation.
- Multi-language localization (unless requested later).

These can be layered on after the storefront is complete.

---

## 2. Reference Analysis

### 2.1 Observed visual language

- Warm, stone/cream background rather than pure white.
- Dark, warm brown/charcoal text.
- Gold/amber used sparingly for emphasis.
- Editorial serif display typography mixed with clean sans-serif UI text.
- Large, image-led hero and category tiles.
- Uppercase, letter-spaced small labels.
- Minimal borders, sharp or very lightly rounded corners, restrained shadows.
- Generous white space and magazine-like section pacing.
- Product cards with portrait imagery, hover image swap, and quick add.
- Announcement bar, search, account, and cart in a compact top navigation.
- Footer with brand story, customer care, information links, contact details, and copyright bar.

### 2.2 Reference vs. requested structure

The live reference currently focuses mainly on women's collections (Unstitched, Ready To Wear, Luxury). The requested structure adds Men and Children. The visual language, typography, spacing, and component behavior from the reference will be retained, while the category architecture will follow the client's requested structure below.

| Requested pillar | Subcategories |
| --- | --- |
| Men | Clothes, Perfumes / Fragrances |
| Women | Unstitched, Ready To Wear, Luxury, Fragrances |
| Children | Kids Festive, Casuals, Accessories |

---

## 3. Scope

### 3.1 In scope

- Global shell: announcement bar, header, navigation, mega menu, mobile menu, search overlay, account entry, cart drawer, footer, newsletter.
- Home page with hero slider, category highlights, campaign strip, new arrivals, editorial story, trust marquee, newsletter.
- Collection listing pages for every pillar and subcategory.
- All-products listing.
- Product detail pages.
- Search results page.
- Cart page fallback in addition to the drawer.
- Account page UI (login/register tabs, no real auth).
- About, Contact, Track Order, Privacy Policy, Return & Refund Policy, Terms & Conditions pages.
- Mock catalog with realistic products, PKR prices, tags, variants, and imagery.
- SEO metadata, structured data, sitemap, robots.
- Accessibility, responsive behavior, performance budgets.
- Lint and production build verification.

### 3.2 Out of scope (unless separately approved)

- Checkout form submission and payment.
- Real cart/order persistence beyond the browser.
- Customer authentication and account dashboard.
- Wishlist persistence (may be shown as a non-functional or local-only enhancement later).
- Product reviews with backend.
- Live inventory sync.
- Analytics integration beyond a documented event plan.
- Blog.

---

## 4. Brand & Visual Direction

### 4.1 Design principles

1. **Editorial first** — layouts should feel like a fashion lookbook, not a generic template.
2. **Quiet luxury** — restrained color, fine lines, generous negative space.
3. **Warmth** — cream, stone, sand, and umber instead of cold greys.
4. **Gold as accent only** — CTAs, hover states, small labels, dividers; never large gold blocks.
5. **Image confidence** — large, high-quality product and campaign imagery with minimal decoration.
6. **Mobile elegance** — the same editorial feel must survive on a 360px screen.

### 4.2 Color tokens

| Token | Hex | Usage |
| --- | --- | --- |
| `stone-50` | `#FBF8F3` | Cards, drawer surfaces, elevated panels |
| `stone-100` | `#F6F0E6` | Primary page background |
| `stone-200` | `#EFE5D6` | Alternate section background |
| `stone-300` | `#E2D3BE` | Borders, dividers, inactive chips |
| `stone-400` | `#C9B49A` | Muted decorative lines, disabled text |
| `stone-500` | `#A68F74` | Secondary text on dark surfaces |
| `stone-600` | `#7C6A56` | Muted body copy |
| `stone-700` | `#5A4B3C` | Strong secondary text |
| `ink` | `#241E19` | Primary text, dark header/footer |
| `ink-soft` | `#3A312A` | Dark hover states |
| `gold` | `#B68A3E` | Primary accent, links, focus ring |
| `gold-soft` | `#D9B877` | Subtle accent on dark backgrounds |
| `amber` | `#C98A2E` | Sale/urgency highlights |
| `sale` | `#9B3D2E` | Sale badge, compare-at emphasis |
| `success` | `#3F6249` | Success messages, in-stock |
| `white` | `#FFFFFF` | Image surfaces, inverse text |

Rules:

- Page background is `stone-100`, not white.
- Dark sections use `ink` with `stone-50` text.
- Gold is not used for long body text.
- Sale price uses `sale`; compare-at price uses muted text with a line-through.
- Focus rings use `gold` with sufficient offset.
- All text/background combinations must meet WCAG AA.

### 4.3 Typography

| Role | Font | Weights | Notes |
| --- | --- | --- | --- |
| Display / headings | **Cormorant Garamond** | 300, 400, 500, 600 + italic | Serif, editorial, slightly tight tracking |
| Body / UI | **Jost** | 300, 400, 500, 600 | Clean geometric sans |
| Fallbacks | Georgia / Times New Roman; system sans | — | Used only if web font fails |

If the client supplies the exact reference font files, they will replace these after approval. Typography hierarchy:

| Style | Desktop | Mobile | Treatment |
| --- | --- | --- | --- |
| Hero display | 72–96px | 40–52px | Serif, 300–400, line-height 0.95–1.05 |
| H1 | 48–56px | 34–40px | Serif, 400 |
| H2 / section title | 40–48px | 30–34px | Serif, 400 |
| H3 | 28–32px | 24–26px | Serif, 400 |
| Card title | 18–20px | 16–18px | Sans, 400–500 |
| Body | 16px | 15–16px | Sans, 400, line-height 1.7 |
| Small / meta | 14px | 13–14px | Sans, 400 |
| Eyebrow / label | 11–12px | 10–11px | Sans, 500, uppercase, tracking 0.18–0.24em |

Italic serif is reserved for editorial words such as "*Introducing*", "*New arrivals*", or collection names.

### 4.4 Layout, spacing, and grid

- Max content width: **1440px**.
- Inner content width: **1320px**.
- Page gutters: 20px mobile, 32px tablet, 48px desktop, 64px wide desktop.
- Base spacing unit: **4px**.
- Section vertical padding: 64px mobile, 96px tablet, 112–120px desktop.
- Product grid gap: 16px mobile, 24px tablet/desktop.
- Header height: 64px mobile, 76px desktop.
- Announcement bar: 36px mobile, 40px desktop.
- Category grid: 1 column mobile, 3 columns from tablet.
- Product grid: 2 columns mobile, 3 columns tablet, 4 columns desktop.
- Use `svh`/`dvh` for full-height hero behavior on mobile.

### 4.5 Shape, borders, and elevation

- Corners: 0–2px for images and cards; 2px for buttons; pills only for filter chips and quantity controls.
- Borders: 1px `stone-300` or `white/15` on dark sections.
- Shadows: nearly none. Drawers may use a soft large shadow; cards use border/overlay instead of shadow.
- Buttons: rectangular with generous horizontal padding; primary dark, secondary outlined, ghost text link with underline on hover.
- No glossy gradients except subtle image overlays.

### 4.6 Motion

- Standard duration: 200–350ms.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for reveals, ease-out for hovers.
- Hero slider: 6-second autoplay, pause on hover/focus, visible prev/next controls and dots.
- Product card: image crossfade/swap on hover, slight scale (max 1.03).
- Drawers/modals: slide/fade with overlay.
- Marquee: slow continuous scroll, paused on hover.
- Respect `prefers-reduced-motion`: disable autoplay, marquee animation, and non-essential transforms.
- No animation may block interaction or cause layout shift.

### 4.7 Imagery art direction

- Campaign imagery: warm, natural light, South Asian occasion wear, editorial crops.
- Product imagery: consistent portrait ratio **3:4**, clean neutral background.
- Category tiles: portrait **4:5**, strong subject, room for overlay text.
- Hero: desktop **16:7** to **2.2:1**; mobile **4:5**.
- Every image must have a meaningful `alt`; decorative images use empty alt.
- Images are served through `next/image` with explicit dimensions or `fill` + sizes.
- Preferred source: client-supplied local assets in `public/images/`. Reference CDN assets may be used only with approval.

### 4.8 Responsive breakpoints

| Name | Width |
| --- | --- |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

QA widths: 360, 390, 430, 768, 1024, 1280, 1440, 1920.

---

## 5. Information Architecture & Navigation

### 5.1 Sitemap

```text
/                                   Home
/collections                        All products
/collections/women                  Women landing
/collections/women/unstitched       Women → Unstitched
/collections/women/ready-to-wear    Women → Ready To Wear
/collections/women/luxury           Women → Luxury
/collections/women/fragrances       Women → Fragrances
/collections/men                    Men landing
/collections/men/clothes            Men → Clothes
/collections/men/fragrances         Men → Fragrances
/collections/children               Children landing
/collections/children/kids-festive  Children → Kids Festive
/collections/children/casuals       Children → Casuals
/collections/children/accessories   Children → Accessories
/products/[slug]                    Product detail
/search?q=                          Search results
/cart                               Cart page fallback
/account                            Account UI (login/register tabs)
/about                              About Us
/contact                            Contact
/track-order                        Order tracking information
/policies/privacy-policy            Privacy Policy
/policies/refund-policy             Return & Refund Policy
/policies/terms-conditions          Terms & Conditions
```

### 5.2 Announcement bar

- Dark `ink` background, `stone-50`/`gold-soft` text.
- Rotating messages every 5 seconds with a subtle fade.
- Messages (default, editable):
  - "Free delivery on orders over PKR 5,000"
  - "New arrivals just dropped — shop the latest"
  - "Nationwide delivery across Pakistan"
- Desktop: centered single line with optional left/right links.
- Mobile: single short message, no overflow, 36px height.
- Optional dismiss control; if included, dismissal persists for the session.
- Pauses rotation on hover/focus.

### 5.3 Header

Desktop layout:

- Left: logo (image or wordmark).
- Center: primary navigation.
- Right: search, account, cart (with item count badge).
- Sticky on scroll; starts transparent over the hero and becomes `stone-100` with a fine bottom border after scrolling. On non-home pages it is solid from the start.
- Search opens a full-width overlay.
- Account links to `/account`.
- Cart opens the drawer.

Navigation items:

- **Women** → mega menu
- **Men** → mega menu
- **Children** → mega menu
- **New Arrivals**
- **Sale**

Mega menu columns:

| Pillar | Column 1 | Column 2 | Promo |
| --- | --- | --- | --- |
| Women | Unstitched, Ready To Wear, Luxury, Fragrances | Shop All Women | Campaign image + "The New Edit" CTA |
| Men | Clothes, Fragrances | Shop All Men | Campaign image + CTA |
| Children | Kids Festive, Casuals, Accessories | Shop All Children | Campaign image + CTA |

Behavior:

- Opens on hover (desktop) with 150ms intent delay, and on click/keyboard.
- Closes on Escape, outside click, or route change.
- Fully keyboard navigable; focus returns to the trigger.
- Promo image hidden below `lg`.

Mobile:

- 64px header: hamburger, centered logo, search + cart icons.
- Account available inside the menu.
- Drawer navigation with accordion groups for Women, Men, Children.
- Direct links for New Arrivals, Sale, About, Contact.
- Body scroll locks while open.
- Close button, overlay click, and Escape all close it.

### 5.4 Search

- Trigger: header search icon and `/` keyboard shortcut on desktop.
- Full-screen overlay on mobile; wide panel from the top on desktop.
- Large search input with visible label for screen readers.
- Minimum 2 characters before showing suggestions.
- Debounced live suggestions (250ms), max 5 product results with thumbnail, title, and price.
- "View all results" action and trending searches.
- Enter navigates to `/search?q=...`.
- Recent searches stored locally; clearable.
- Empty and no-results states with helpful copy.

### 5.5 Account

- `/account` with two tabs: **Sign In** and **Create Account**.
- Fields: email, password; registration adds first name, last name, phone.
- Validation with inline errors.
- Submit shows a clearly labeled demo/coming-soon state; no fake success that implies a real account.
- Link to "Continue shopping."
- Real authentication is out of scope and will be documented as such.

### 5.6 Cart drawer

- Slides in from the right; width 100% mobile, 420px tablet/desktop.
- Overlay dims the page; body scroll locks.
- Header: "Your Bag (n)" + close button.
- Free-shipping progress bar toward PKR 5,000 (configurable).
- Line items: image, title, variant, unit price, quantity stepper, remove, line total.
- Quantity changes update totals immediately.
- Remove shows an undo toast for 5 seconds.
- Footer: subtotal, shipping note, "View Bag", primary "Checkout" CTA.
- Empty state: editorial illustration/icon, copy, "Continue Shopping".
- Focus trap while open; Escape closes; focus returns to cart trigger.
- Announced to screen readers via a polite live region.

---

## 6. Global Component Specification

### 6.1 Buttons

| Variant | Appearance | Usage |
| --- | --- | --- |
| Primary | `ink` background, `stone-50` text | Add to bag, checkout, main CTAs |
| Secondary | Transparent, 1px `ink` border | Alternate CTAs |
| Gold | `gold` background or gold text | Accent CTAs, newsletter submit |
| Ghost/link | Text with underline on hover | "View all", tertiary actions |
| Icon | 40–44px square, accessible label | Search, cart, close, arrows |

States: default, hover, active, focus-visible, disabled, loading. Minimum touch target 44px.

### 6.2 Badges

- **NEW ARRIVAL** — ink or gold-on-dark.
- **SALE** — `sale` background with white text.
- **SOLD OUT** — muted stone.
- **BESTSELLER** — optional.
- Uppercase, 10–11px, letter-spaced, placed top-left of product image or below title.

### 6.3 Product card

Contents:

- Portrait image, 3:4.
- Secondary image on hover (desktop) with crossfade.
- Badge top-left; wishlist control top-right (local-only or hidden until approved).
- Quick-add control on hover desktop; always visible icon button on mobile.
- Category/collection label (small, muted).
- Product title (max 2 lines).
- Price in PKR; compare-at price if on sale.
- Color swatches if variants exist.
- "Add to Bag" text action in the reference style.

Behavior:

- Entire card is a link to the product.
- Quick-add opens variant selection if variants exist; otherwise adds default variant and opens the cart drawer.
- Hover/focus states are visible and not color-only.
- Images lazy-load below the fold; first row may be eager on category pages.

### 6.4 Price display

- Currency: PKR.
- Format: `Rs. 3,899` (no decimals for whole amounts).
- Sale: `Rs. 3,499` in `sale` color, with `Rs. 3,999` struck through in muted text.
- Cart/checkout summaries may label the currency as `PKR`.
- Structured data uses `PKR`.

### 6.5 Toasts

- Bottom center mobile, bottom right desktop.
- Success, error, and undo variants.
- Max one visible at a time; auto-dismiss after 4–5 seconds.
- Announced with `aria-live="polite"`.

### 6.6 Newsletter form

- Heading, short supporting copy, email input, submit button.
- Client-side validation for required email format.
- Consent microcopy.
- Success message replaces form or appears inline.
- No real subscription backend unless approved; demo state must be honest.

### 6.7 Footer

Structure:

1. Brand column: logo, tagline, social icons (Facebook, Instagram, WhatsApp).
2. Customer Care: Privacy Policy, Return & Refund Policy, Terms & Conditions.
3. Information: About Us, Contact, Track Order, Search.
4. Contact: email, working hours, WhatsApp/phone.
5. Newsletter block.
6. Bottom bar: copyright, "Developed by", payment/shipping note if approved.

Styling:

- Dark `ink` background with `stone-50` text; gold hover accents.
- 4 columns desktop, 2 columns tablet, stacked accordions or stacked lists mobile.
- Fine 1px dividers at `white/15`.
- Social icons are inline SVG with accessible labels.

---

## 7. Page Specifications

### 7.1 Home page

Section order:

1. **Announcement bar**
2. **Header**
3. **Hero slider**
   - 3 slides.
   - Full-bleed imagery with warm dark overlay for legibility.
   - Eyebrow, serif headline, one-line supporting copy, up to two CTAs.
   - Example slides:
     - "The Festive Edit" → Shop Women / Shop Children
     - "New Arrivals" → Shop New In
     - "Fragrance, Reimagined" → Shop Fragrances
   - Autoplay, arrows, dots, swipe, keyboard controls, pause on hover/focus.
4. **Shop by Category**
   - Section eyebrow "Shop By Category" + serif heading.
   - Three large portrait tiles: Women, Men, Children.
   - Each tile: image, overlay gradient, category name, item count, "Shop Now", subcategory quick links.
   - Hover: image scale + arrow motion.
5. **Campaign / motion strip**
   - Two editorial tiles (or video posters) as in the reference.
   - Optional video lightbox if assets are provided; otherwise static links.
6. **Introducing / New Arrivals intro**
   - Italic serif eyebrow "Introducing", large serif "New arrivals", short brand paragraph.
   - Link to all new arrivals.
7. **New Arrivals product grid**
   - 4 products desktop, 2 mobile, with badges and PKR pricing.
   - "View All New Arrivals" CTA.
8. **Pillar spotlights**
   - Alternating editorial split sections for Women, Men, Children, each with image, copy, and CTA.
   - Optional but recommended to support the expanded category structure.
9. **Join Our Journey**
   - Centered or split editorial block with serif heading, paragraph, "Explore Collection" CTA.
10. **Trust marquee**
    - Repeating "Premium Quality, Responsibly Sourced" in uppercase with gold separators.
    - Paused on hover; static under reduced motion.
11. **Newsletter**
    - Warm stone panel with heading and email capture.
12. **Footer**

Home page must not feel like a list of unrelated blocks; section rhythm alternates stone tones and image-led/full-bleed moments.

### 7.2 Collection landing pages

For `/collections/women`, `/collections/men`, `/collections/children`:

- Breadcrumb: Home / Women.
- Editorial hero: category image or split layout, serif title, short description.
- Subcategory tiles/cards linking to each subcategory.
- Featured collection or bestseller row.
- Link to shop all in that pillar.
- Newsletter/footer shared shell.

### 7.3 Subcategory / product listing pages

For example `/collections/women/unstitched`:

- Breadcrumb: Home / Women / Unstitched.
- Page header: title, description, product count.
- Toolbar: result count, sort dropdown, mobile "Filter" button.
- Desktop filter sidebar, sticky below header:
  - Category (pillar/subcategory).
  - Price range (min/max inputs or preset ranges).
  - Size (multi-select).
  - Color (swatches with labels).
  - Availability (in stock).
  - Clear all.
- Active filter chips with individual remove.
- Product grid: 2 / 3 / 4 columns responsive.
- Pagination: 12 products per page, numbered pagination with previous/next; URL reflects page and filters.
- Empty state with clear filters.
- Mobile: filter drawer from the bottom/left, apply/reset controls, scroll lock.
- Sort options: Featured, Newest, Price: Low to High, Price: High to Low, Best Selling.
- Filters and sort are shareable through URL query parameters.
- Category description below the grid for SEO, collapsible on mobile.

### 7.4 All products page

`/collections`:

- Same listing system as subcategories.
- Filters include pillar (Women/Men/Children), subcategory, price, size, color, availability.
- Default sort: Featured.
- Result count and active filters.

### 7.5 Product detail page

Layout:

- Breadcrumb.
- Desktop: 55–60% gallery, 40–45% purchase panel, sticky panel on scroll.
- Mobile: swipeable gallery, then details.
- Gallery: main image + thumbnails; hover zoom optional; lightbox on click; keyboard arrows.
- Purchase panel:
  - Collection label.
  - Product title (H1).
  - Price and compare-at price.
  - Badges (New / Sale / Bestseller).
  - Short description.
  - Variant selectors: size, color; disabled unavailable combinations.
  - Quantity stepper.
  - "Add to Bag" primary CTA; "Buy It Now" optional and routed to cart/checkout entry.
  - Stock status ("In stock", "Only 3 left", "Sold out").
  - Delivery/returns microcopy.
  - Accordions: Description, Fabric & Care, Shipping & Returns, Size Guide.
- Below:
  - Complete the look / related products.
  - Recently viewed (local-only, optional).
- Mobile sticky bottom bar with price and Add to Bag.
- Product structured data (JSON-LD).
- Out-of-stock state disables add to cart and explains next steps.

### 7.6 Search results page

- Search input prefilled from `q`.
- Result count and query summary.
- Same product grid/card system.
- Filters and sort reuse listing components.
- Suggested/trending searches when the query is empty.
- No-results state with popular categories and search tips.
- Handles special characters safely.

### 7.7 Cart page

- Fallback/full-page version of the drawer.
- Line items, quantity controls, remove, subtotal, shipping note.
- Order summary panel with subtotal, estimated shipping, total.
- Promo code field (UI only unless a rule set is approved).
- "Continue Shopping" and "Checkout" CTAs.
- Empty state.
- Cart persists across reloads via local storage.

### 7.8 Checkout entry

- Out of scope for full implementation.
- "Checkout" leads to a clearly labeled placeholder page or an approved external flow (e.g. WhatsApp order). This requires client decision.
- No payment fields will be collected in the initial build.

### 7.9 Content pages

- About Us: brand story, values, imagery.
- Contact: email, WhatsApp, working hours, contact form UI with validation.
- Track Order: explanatory copy and link to the approved tracking method.
- Policies: readable long-form layout, table of contents optional, last-updated date.
- All content pages use the shared header/footer and a consistent editorial page header.

---

## 8. Catalog & Data Model

The initial build uses a local, typed mock catalog. It must be structured so it can later be replaced by a CMS or commerce API without rewriting the UI.

### 8.1 Conceptual entities

**Product**

- id, slug, title, short description, long description
- pillar (Women / Men / Children)
- category and subcategory
- price, compare-at price, currency (PKR)
- images (ordered, 2–3 per product)
- variants (size, color, SKU, stock)
- tags (New Arrival, Sale, Bestseller)
- featured flag, created date, stock status
- fabric/care/shipping details
- SEO title/description

**Category**

- id, slug, title, parent, description, image, display order, item count

**Cart line**

- product id, variant id, quantity, unit price snapshot

**Search index**

- product id, title, category, tags, keywords, thumbnail, price

### 8.2 Mock catalog requirements

- Minimum **24 products**, ideally 27:
  - Women: 12 (Unstitched 4, Ready To Wear 3, Luxury 3, Fragrances 2)
  - Men: 8 (Clothes 5, Fragrances 3)
  - Children: 7 (Kids Festive 3, Casuals 2, Accessories 2)
- At least 4 products tagged **SALE** with compare-at prices.
- At least 6 products tagged **NEW ARRIVAL**.
- Realistic Pakistani fashion product names and PKR price points.
- 2–3 images per product with consistent aspect ratio.
- At least 3 size options for clothing and appropriate fragrance volumes.
- Some sold-out variants to exercise disabled states.
- Categories must show accurate counts derived from data, not hardcoded.

Suggested price bands:

- Women Unstitched: PKR 3,199–4,990
- Women Ready To Wear: PKR 5,499–8,990
- Women Luxury: PKR 7,990–14,990
- Women Fragrances: PKR 2,490–6,990
- Men Clothes: PKR 3,990–9,990
- Men Fragrances: PKR 2,990–7,990
- Children: PKR 1,990–5,990

---

## 9. Functional Behavior & State

### 9.1 Cart

- Add to cart from card quick-add and product page.
- If variants exist and none selected, open variant selection instead of adding.
- Duplicate variant lines merge and increment quantity.
- Quantity clamps to available stock.
- Remove item; undo for 5 seconds.
- Persist to `localStorage` under a versioned key (e.g. `julhas.cart.v1`).
- Hydration-safe: do not render stale/incorrect cart counts before restore; avoid layout shift.
- Open drawer automatically after add (unless reduced-motion preference suggests immediate focus-only behavior).
- Subtotal, item count, and free-shipping progress derive from state.
- Cart count badge updates live and is announced politely.
- Corrupt/invalid stored data is discarded safely.

### 9.2 Free shipping

- Threshold: PKR 5,000 (configurable).
- Progress bar and remaining-amount message.
- If threshold met: "You've unlocked free delivery."
- Shipping cost display is a static estimate until checkout rules are approved.

### 9.3 Filters and sorting

- State lives in the URL for shareability.
- Multi-select values use repeated query params or comma-separated values consistently.
- Filters combine with AND across types and OR within a type.
- Clearing filters preserves sort.
- Invalid params fall back gracefully.
- Result count reflects active filters.
- Filter drawer applies on mobile; desktop updates immediately.

### 9.4 Search

- Local search over title, category, tags, and keywords.
- Case-insensitive, diacritic-tolerant where practical.
- Debounced suggestions.
- Keyboard navigation in suggestion list (arrow keys, Enter, Escape).
- Recent searches (optional, local only).

### 9.5 Forms

- Newsletter, contact, and account forms validate on submit and show inline errors.
- Email format validation.
- Required fields are marked and described for assistive technology.
- Success/error messaging is announced.
- No form claims a real backend action unless one exists.

### 9.6 Wishlist (optional)

- If approved: local-only, heart toggle, header count, `/wishlist` page.
- If not approved: omit the heart to avoid a dead control.

---

## 10. Content & Copy

- Language: English (Pakistan), with PKR currency and local delivery language.
- Tone: warm, refined, understated; short sentences; no hard-sell language.
- Use "Bag" consistently (matching the reference) rather than mixing "Cart" and "Bag" in the UI. Route may remain `/cart`.
- Announcement, hero, category, story, and footer copy will be drafted to match the reference's tone.
- Placeholder copy is acceptable during build but must be clearly marked and replaced before launch.
- Legal pages require client-approved text; placeholder legal copy must not be treated as final.

---

## 11. SEO & Metadata

- Unique title and meta description per page.
- Open Graph and Twitter card metadata.
- Canonical URLs.
- Semantic heading hierarchy (one H1 per page).
- Product JSON-LD: name, image, description, SKU, brand, offers (PKR), availability.
- Breadcrumb JSON-LD on category and product pages.
- Organization/website JSON-LD on home.
- `sitemap.ts` and `robots.ts`.
- Descriptive alt text for product and campaign imagery.
- Clean, stable URLs.
- Pagination and filter URLs handled without duplicate-content issues (canonical to the base collection where appropriate).

---

## 12. Accessibility

Target: **WCAG 2.1 AA**.

- Skip-to-content link.
- Landmarks: header, nav, main, footer.
- Visible focus styles on all interactive elements.
- Keyboard support for menus, search, filters, gallery, drawer, and slider.
- Focus trap and focus restoration for drawers/dialogs.
- Escape closes overlays.
- Body scroll lock while overlays are open.
- `aria-expanded`, `aria-controls`, `aria-current`, and labels where appropriate.
- Cart updates announced via live region.
- Form errors linked with `aria-describedby`.
- Color contrast AA; never rely on color alone for states.
- Touch targets at least 44×44px.
- Reduced-motion support.
- Images have alt text; decorative elements are hidden from assistive technology.
- Video (if used) has captions or is decorative with no essential audio.

---

## 13. Performance

Targets (mobile, production build):

- LCP < 2.5s on a mid-range mobile connection.
- CLS < 0.1.
- INP < 200ms.
- No horizontal scroll at any QA width.
- Hero image optimized and prioritized; below-the-fold images lazy-loaded.
- Responsive image `sizes` configured for every grid.
- Fonts self-hosted via `next/font` with `display: swap` and limited weights.
- Minimal client JavaScript; interactive islands only.
- No heavy animation or carousel dependency unless justified.
- Avoid layout shift from late-loading badges, fonts, or cart hydration.
- Bundle review before launch.

---

## 14. Technical Constraints

- **Framework:** Next.js 16.4.3, App Router.
- **React:** 19.3.
- **Language:** TypeScript, strict mode.
- **Styling:** Tailwind CSS v4 via the existing Turbopack setup.
- **Compiler:** React Compiler is enabled; avoid unnecessary manual memoization.
- **Caching:** The project has `cacheComponents` enabled. Static catalog pages should remain static/pre-rendered where possible; dynamic behavior is isolated to client islands and search params.
- **Prefetching:** `partialPrefetching` is enabled; use `next/link` for internal navigation.
- **Images:** `next/image`; local assets preferred; remote patterns only for approved domains.
- **Fonts:** `next/font` (Google or local).
- **Icons:** Inline SVG set; no icon package unless approved.
- **State:** React Context + reducer for cart; local component state for UI; URL state for filters/search.
- **Data:** Local typed catalog module for the first iteration; structured for future API replacement.
- **No new dependencies** without explicit approval.
- **Browser support:** latest two versions of Chrome, Safari, Firefox, Edge; iOS Safari 15+.
- **Deployment target:** Vercel or Node.js hosting.

### Rendering strategy

- Home, collection, and product pages: server components, pre-rendered from local catalog data.
- Search results: server-rendered from query params with Suspense boundaries.
- Header, drawers, slider, filters, forms: client components.
- No full-page client-side rendering.
- No `force-dynamic` unless a concrete need arises.

---

## 15. Analytics & Tracking (documented, optional to implement)

If approved, define events without adding third-party scripts yet:

- `view_item_list`
- `select_item`
- `view_item`
- `add_to_cart`
- `remove_from_cart`
- `view_cart`
- `begin_checkout`
- `search`
- `newsletter_signup`

No analytics vendor will be integrated without approval and a consent strategy.

---

## 16. Acceptance Criteria

The build is accepted only when all of the following pass:

### Visual

- [ ] Matches the reference's earthy stone palette, warm dark accents, and restrained gold highlights.
- [ ] Serif display + sans UI typography is consistent across all pages.
- [ ] Announcement bar, header, hero, category tiles, product cards, and footer visually match the agreed direction.
- [ ] Home page section rhythm feels editorial, not like a generic template.
- [ ] Product cards show correct badges, titles, and PKR prices.
- [ ] Mobile layouts look intentionally designed, not merely stacked desktop.

### Navigation & content

- [ ] Women, Men, and Children each expose every requested subcategory.
- [ ] All navigation, footer, and CTA links resolve correctly.
- [ ] Breadcrumbs are correct on collection and product pages.
- [ ] Mega menu and mobile menu are keyboard accessible.
- [ ] Search overlay and `/search` results work.

### Commerce behavior

- [ ] Add to bag works from cards and product pages.
- [ ] Variant selection is enforced when required.
- [ ] Cart drawer opens, updates quantities, removes items, and calculates totals.
- [ ] Cart persists across reloads.
- [ ] Free-shipping progress is accurate.
- [ ] Empty cart state is polished.
- [ ] Filters, sort, and pagination work and are shareable via URL.
- [ ] Out-of-stock variants are disabled with clear messaging.

### Quality

- [ ] No horizontal overflow at 360, 390, 768, 1024, 1440, 1920px.
- [ ] Keyboard-only navigation covers all primary flows.
- [ ] Focus is trapped/restored correctly in overlays.
- [ ] Reduced-motion preference is respected.
- [ ] Color contrast meets AA.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] No console errors in production build.
- [ ] Metadata, JSON-LD, sitemap, and robots are present.
- [ ] Performance targets in Section 13 are met or a documented exception is approved.

---

## 17. Assumptions & Open Questions

### Assumptions

1. The requested Men and Children categories are new additions and will use the reference's visual language.
2. The site is English-only for this phase.
3. Product data and imagery can be mocked initially.
4. Checkout, authentication, and backend services are not required for this phase.
5. "Bag" is the customer-facing term; `/cart` remains the route.
6. Free-shipping threshold defaults to PKR 5,000.
7. The existing Next.js 16 project is the base; no migration from another framework is needed.

### Open questions requiring approval

1. **Assets:** Will the client provide logo, hero, category, product, and video assets? May we use the reference CDN images for the prototype, or should we use neutral placeholders until final assets arrive?
2. **Fonts:** Should we use Cormorant Garamond + Jost, or does the client have the exact reference font files?
3. **Men & Children:** Confirm these are new sections with the same aesthetic; the live reference currently emphasizes women's collections.
4. **Checkout:** Should "Checkout" open a placeholder page, a WhatsApp order flow, or an external checkout?
5. **Authentication:** Is the account area UI-only for now, or is real authentication planned?
6. **Product data:** Use a realistic mock catalog, or wait for the client's actual product list and prices?
7. **Newsletter/contact:** Demo-only forms, or integrate a provider (e.g. Mailchimp, Shopify, Formspree)?
8. **Wishlist:** Include it, or omit it?
9. **Analytics:** Any required analytics/consent tooling?
10. **Legal copy:** Will the client supply final policy and contact text?
11. **Announcement copy:** Confirm the three default messages and shipping threshold.
12. **Brand logo:** Is the reference logo file available in vector format?

---

## 18. Approval Gate

This specification is complete for Step 1. No code has been written.

**Next step after approval:** Step 2 — Architecture & File Plan.

Please reply with:

- **"Approved"** to proceed to Step 2, and
- Answers to the open questions above (or approval to use the stated defaults).

Any requested changes will be folded into this document before moving forward.
