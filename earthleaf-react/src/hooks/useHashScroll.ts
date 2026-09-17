import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores the browser behaviour react-router drops: navigating to
 * `/#visit` does not scroll to `#visit` on its own, because the router
 * changes location without a document load. Without this, every
 * cross-page anchor link (nav "Visit", footer links, the order CTA)
 * would land at the top of the homepage instead of the right section.
 *
 * Scrolling to the top on a hash-less navigation is the other half of
 * the same behaviour — otherwise moving from a scrolled homepage to
 * /menu would keep the old scroll offset.
 *
 * Pairs with `scroll-padding-top` in reset.css, which keeps the target
 * clear of the sticky header.
 */
export function useHashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [pathname, hash]);
}
