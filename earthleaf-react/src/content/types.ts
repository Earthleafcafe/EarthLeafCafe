/**
 * The content contract. en.ts and si.ts both declare
 * `export const X: SiteContent = { … }` — a field present in one but
 * missing in the other is a TypeScript build error, not a silent gap
 * (docs/REACT-MIGRATION-PLAN.md §4.1 in earthleaf.lk).
 *
 * Locale-independent values (image paths, the WhatsApp number, email)
 * do NOT live here — see content/assets.ts and config/site.ts. A field
 * only belongs in SiteContent if it is genuinely different EN vs SI.
 */

/**
 * A nav/footer destination. `href` starting with `/` is an in-app route
 * (rendered as a react-router `<Link>`), `#` is a same-page anchor
 * (a plain `<a>`) — see lib/href.ts. Both forms coexist now that Menu
 * and the gallery live on their own pages.
 */
export interface NavLink {
  href: string;
  label: string;
}

/** `<h1>{lead} <span>{highlight}</span>{tail}</h1>` */
export interface HeroTitle {
  lead: string;
  highlight: string;
  tail: string;
}

/** Matched positionally by `id` against content/assets.ts's `gallery` list. */
export interface GalleryItemContent {
  id: string;
  alt: string;
  openLabel: string;
}

/** Matched by `id` to a content/menu.ts item for its price and (once supplied) image. */
export interface MenuListItem {
  id: string;
  name: string;
}

/** Matched by `id` to a content/menu.ts category for its icon and items. */
export interface MenuCard {
  id: string;
  title: string;
  items: MenuListItem[];
}

/**
 * One line of a Visit card, e.g. "**Mon–Sat:** 11.00 – 16.00" or a plain
 * second line with no leading label ("Ratmalana, Colombo 10370").
 */
export interface VisitRow {
  label: string;
  value: string;
  href?: string;
}

export interface VisitCard {
  kicker: string;
  title: string;
  rows: VisitRow[];
}

/** `<title>` + `<meta name="description">` for one page. */
export interface PageMeta {
  title: string;
  description: string;
}

export interface SiteContent {
  /**
   * One entry per route (plan §7.2), keyed by page — not a single flat
   * object like the source had, since /menu and /events need their own
   * `<title>`/description rather than inheriting the homepage's. Read by
   * both hooks/useDocumentHead.ts (client-side nav) and
   * entry-server.tsx (prerendering) — lib/seo.ts is the shared source
   * for the canonical/hreflang half of the same job.
   */
  meta: {
    home: PageMeta;
    menu: PageMeta;
    events: PageMeta;
  };

  skipLink: string;

  header: {
    brandName: string;
    brandSub: string;
    brandHomeAriaLabel: string;
    logoAlt: string;
    navOpenLabel: string;
    /**
     * The source never actually translates this (main.js hardcodes
     * "Close menu" in both locales) — translated here as a deliberate
     * fix, using vocabulary the source already uses elsewhere for
     * "close" (see gallery.lightboxCloseLabel).
     */
    navCloseLabel: string;
    nav: NavLink[];
    orderCta: string;
    langSwitchAriaLabel: string;
    /** Current-language pill, e.g. "EN" or "🇱🇰 සිංහල". */
    langCurrentLabel: string;
    /** Label for the link to the *other* language. */
    otherLangLabel: string;
    /**
     * The source only sets this on the English page's Sinhala link, not
     * the reverse — added on both here as an accessibility fix.
     */
    otherLangAriaLabel: string;
    themeSwitchAriaLabel: string;
  };

  hero: {
    eyebrow: string;
    title: HeroTitle;
    lead: string;
    ctaPrimary: string;
    /** Links to /events. Owner-supplied label, 2026-09-15. */
    ctaSecondary: string;
    chipsAriaLabel: string;
    chips: string[];
    imageAlt: string;
    floatingCard: {
      title: string;
      sub: string;
    };
  };

  gallery: {
    eyebrow: string;
    heading: string;
    sub: string;
    items: GalleryItemContent[];
    lightboxAriaLabel: string;
    lightboxCloseLabel: string;
  };

  menu: {
    eyebrow: string;
    heading: string;
    sub: string;
    cards: MenuCard[];
  };

  order: {
    eyebrow: string;
    heading: string;
    body: string;
    ctaLabel: string;
    /** Labels used to build the pre-filled WhatsApp order message — see lib/whatsappOrder.ts. */
    form: {
      title: string;
      welcome: string;
      nameLabel: string;
      deliveryLabel: string;
    };
  };

  visit: {
    eyebrow: string;
    heading: string;
    sub: string;
    cards: VisitCard[];
    callout: {
      heading: string;
      body: string;
      ctaLabel: string;
    };
  };

  footer: {
    brandName: string;
    brandSub: string;
    logoAlt: string;
    links: NavLink[];
    /** Facebook/Instagram — brand names, so identical (untranslated) in both locales, like "WhatsApp" already is. */
    social: NavLink[];
    /** Takes the current year so it isn't baked into static content. */
    copyright: (year: number) => string;
    backToTop: string;
  };

  /** The catch-all route — no page key of its own in `meta`, since a 404 is deliberately non-canonical and non-indexable (see pages/NotFoundPage.tsx). */
  notFound: {
    eyebrow: string;
    heading: string;
    body: string;
    backHomeLabel: string;
  };
}
