import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeProvider';
import { locales, localeList, type Locale } from './content';
import { pagePath, type PageKey } from './lib/routes';
import { pageOpenGraph, pageSeo, restaurantJsonLd } from './lib/seo';

/**
 * The Node/SSR entry (`vite build --ssr src/entry-server.tsx`, see
 * package.json). Everything scripts/prerender.mjs needs is exported
 * from here rather than imported separately, because this is the only
 * module Vite's SSR build actually bundles into plain, Node-runnable
 * JS — the prerender script is a hand-written .mjs file that can't
 * import .tsx/.css directly.
 *
 * `render` mirrors entry-client.tsx's tree with `StaticRouter` instead
 * of `BrowserRouter` (StaticRouter takes a fixed `location` and never
 * navigates — exactly what rendering one known URL at build time
 * needs) and `renderToString` instead of `hydrateRoot`.
 */
const PAGE_KEYS: PageKey[] = ['home', 'menu', 'events'];

export interface PrerenderRoute {
  path: string;
  locale: Locale;
  page: PageKey;
}

/** Every route this site has, generated the same way App.tsx generates
 *  its <Route> tree — so a locale or page added there is prerendered
 *  here without a second list to remember. */
export function getPrerenderRoutes(): PrerenderRoute[] {
  return localeList.flatMap((locale) => PAGE_KEYS.map((page) => ({ path: pagePath(locale, page), locale, page })));
}

export function getPageMeta(locale: Locale, page: PageKey) {
  return locales[locale].meta[page];
}

/**
 * Mirrors what pages/NotFoundPage.tsx sets client-side (`document.title
 * = content.notFound.heading`, description = `.body`) — so
 * scripts/prerender.mjs's static dist/404.html carries the exact same
 * `<title>` React sets on hydration. Using anything else here would be
 * a title flash on the very first paint after JS loads.
 */
export function getNotFoundMeta(locale: Locale) {
  const { heading, body } = locales[locale].notFound;
  return { title: heading, description: body };
}

export { pageSeo };

export function getPageOpenGraph(locale: Locale, page: PageKey) {
  return pageOpenGraph(locale, page, locales[locale].meta[page], locales[locale].hero.imageAlt);
}

/** Only the homepage carries the Restaurant entity — see useDocumentHead.ts's client-side counterpart. */
export function getRestaurantJsonLd(locale: Locale, page: PageKey): Record<string, unknown> | null {
  return page === 'home' ? restaurantJsonLd(locale) : null;
}

export function render(url: string): string {
  // Unlike BrowserRouter (which reads the real browser URL and strips
  // `basename` itself), StaticRouter's `location` must already include
  // it — there's no real URL to read during SSR. `url` here is always
  // basename-relative (from lib/routes.ts, e.g. "/menu"), so it's joined
  // with BASE_URL here rather than baked into every caller.
  const basename = import.meta.env.BASE_URL;
  const location = basename.replace(/\/$/, '') + url;

  return renderToString(
    <StrictMode>
      <StaticRouter basename={basename} location={location}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StaticRouter>
    </StrictMode>,
  );
}
