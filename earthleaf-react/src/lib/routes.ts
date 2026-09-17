import type { Locale } from '../content';

/**
 * One place that knows the URL shape, so content files, Nav, Header and
 * Hero can't drift apart on it. English is unprefixed (`/menu`), every
 * other locale carries its code (`/si/menu`) — matching the two-route
 * scheme the static site established.
 *
 * `import type` above is erased at compile time, so importing the Locale
 * union from content/ here creates no runtime cycle even though the
 * content files import this module back.
 */

/** The three pages, matching `SiteContent['meta']`'s keys and App.tsx's route list. */
export type PageKey = 'home' | 'menu' | 'events';

/** `/` for en, `/si` for si. */
export function localeHome(locale: Locale): string {
  return locale === 'en' ? '/' : `/${locale}`;
}

/** `/menu` for en, `/si/menu` for si. */
export function localeRoute(locale: Locale, page: 'menu' | 'events'): string {
  return locale === 'en' ? `/${page}` : `/${locale}/${page}`;
}

/** `localeHome`/`localeRoute` unified over `PageKey` — for callers (lib/seo.ts,
 *  entry-server.tsx) that iterate all three pages generically. */
export function pagePath(locale: Locale, page: PageKey): string {
  return page === 'home' ? localeHome(locale) : localeRoute(locale, page);
}

/**
 * A link to a homepage-only section from anywhere in the app:
 * `/#visit`, `/si#order`. The path matters — Visit and OrderBand render
 * only on the homepage, so a bare `#visit` would be a dead link on
 * /menu and /events.
 */
export function homeAnchor(locale: Locale, anchor: string): string {
  return `${localeHome(locale)}#${anchor}`;
}
