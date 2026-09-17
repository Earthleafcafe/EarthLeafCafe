import { useEffect } from 'react';
import { useLocale } from '../context/LocaleProvider';
import { setAlternates, setCanonical, setJsonLd, setMetaDescription, setOpenGraph, setRobots } from '../lib/domHead';
import { pageOpenGraph, pageSeo, restaurantJsonLd } from '../lib/seo';
import type { PageKey } from '../lib/routes';
import { useContent } from './useContent';

/**
 * Keeps `<title>`, the description meta, the canonical link, and the
 * hreflang alternates in sync with the current page. Each page
 * component calls this once with its own key.
 *
 * Exists for the same reason useHashScroll.ts does: the prerendered
 * HTML for each route already carries the right tags (see
 * entry-server.tsx), but react-router's client-side navigation doesn't
 * reload the document — so without this, clicking from / to /menu
 * would leave the tab titled "Earth Leaf | Healthy Lunch in Ratmalana"
 * and the canonical link pointing at the homepage.
 */
export function useDocumentHead(page: PageKey): void {
  const locale = useLocale();
  const content = useContent();
  const meta = content.meta[page];
  const heroImageAlt = content.hero.imageAlt;

  useEffect(() => {
    document.title = meta.title;
    setMetaDescription(meta.description);
    setRobots(null);

    const { canonical, alternates } = pageSeo(locale, page);
    setCanonical(canonical);
    setAlternates(alternates);

    setOpenGraph(pageOpenGraph(locale, page, meta, heroImageAlt));
    // The Restaurant entity belongs on the homepage only — Menu/Events
    // don't need their own copy of the same business data.
    setJsonLd(page === 'home' ? restaurantJsonLd(locale) : null);
  }, [locale, page, meta.title, meta.description, heroImageAlt]);
}
