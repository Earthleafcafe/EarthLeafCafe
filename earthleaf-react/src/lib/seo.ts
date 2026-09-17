import { assets } from '../content/assets';
import { site } from '../config/site';
import { localeList, type Locale } from '../content';
import type { PageMeta } from '../content/types';
import { localeHome, pagePath, type PageKey } from './routes';

/**
 * Canonical URL + hreflang alternates for one page — the half of
 * per-route SEO that depends on knowing every locale's URL for the
 * same page, not just the content strings (`SiteContent['meta']` holds
 * the title/description half). Pure data, no React: used by both
 * hooks/useDocumentHead.ts (client-side nav) and entry-server.tsx
 * (prerendering), so the two can't compute different URLs for the same
 * page.
 */

const origin = `https://${site.domain}`;
const SITE_NAME = 'Earth Leaf';

/** schema.org/Open Graph locale codes — there's no per-locale content field for these, they're derived from the locale itself. */
const OG_LOCALE: Record<Locale, string> = { en: 'en_US', si: 'si_LK' };

export interface PageAlternate {
  hrefLang: Locale | 'x-default';
  href: string;
}

export interface PageSeo {
  canonical: string;
  alternates: PageAlternate[];
}

export function pageSeo(locale: Locale, page: PageKey): PageSeo {
  const alternates: PageAlternate[] = localeList.map((l) => ({
    hrefLang: l,
    href: `${origin}${pagePath(l, page)}`,
  }));

  // x-default points at English — the site's unprefixed locale, and the
  // one a language-less visitor (or a crawler with no locale signal)
  // should land on.
  alternates.push({ hrefLang: 'x-default', href: `${origin}${pagePath('en', page)}` });

  return {
    canonical: `${origin}${pagePath(locale, page)}`,
    alternates,
  };
}

export interface PageOpenGraph {
  type: 'restaurant' | 'website';
  locale: string;
  localeAlternate: string;
  title: string;
  description: string;
  url: string;
  siteName: string;
  image: string;
  imageAlt: string;
}

/**
 * `imageAlt` is passed in rather than invented here: `og:image` is a
 * crop of the same hero photo, so it reuses `content.hero.imageAlt`
 * (already translated) instead of a new, unreviewed string.
 */
export function pageOpenGraph(locale: Locale, page: PageKey, meta: PageMeta, heroImageAlt: string): PageOpenGraph {
  const [otherLocale] = localeList.filter((l) => l !== locale);
  return {
    type: page === 'home' ? 'restaurant' : 'website',
    locale: OG_LOCALE[locale],
    localeAlternate: OG_LOCALE[otherLocale],
    title: meta.title,
    description: meta.description,
    url: `${origin}${pagePath(locale, page)}`,
    siteName: SITE_NAME,
    image: `${origin}${assets.ogImage}`,
    imageAlt: heroImageAlt,
  };
}

/**
 * schema.org `Restaurant` — the highest-leverage structured data a local
 * restaurant can ship (plan §12.4). Built entirely from config/site.ts's
 * confirmed contact facts; never invent a value here (an address or
 * phone number Google can't verify is worse than none).
 */
export function restaurantJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: SITE_NAME,
    url: `${origin}${localeHome(locale)}`,
    image: `${origin}${assets.ogImage}`,
    telephone: site.whatsappDisplay,
    servesCuisine: 'Sri Lankan',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: site.hours.openDays,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    sameAs: [site.facebookUrl, site.instagramUrl],
  };
}
