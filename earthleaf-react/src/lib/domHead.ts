/**
 * Small imperative `<head>` mutators shared by hooks/useDocumentHead.ts
 * and pages/NotFoundPage.tsx. Every tag either of them touches carries
 * `data-managed-head` so it's unambiguous which tags in the prerendered
 * `<head>` are safe to update/remove on client-side navigation and
 * which (fonts, favicon, the anti-FOUC script) are not.
 *
 * `<title>` needs no marker — there's only ever one, and
 * `document.title = …` doesn't touch anything else.
 */

import type { PageOpenGraph } from './seo';

const MARKER = 'data-managed-head';

export function setMetaDescription(content: string): void {
  let tag = document.head.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', 'description');
    tag.setAttribute(MARKER, '');
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function setRobots(content: string | null): void {
  const existing = document.head.querySelector(`meta[name="robots"][${MARKER}]`);
  if (content === null) {
    existing?.remove();
    return;
  }
  const tag = existing ?? document.createElement('meta');
  tag.setAttribute('name', 'robots');
  tag.setAttribute(MARKER, '');
  tag.setAttribute('content', content);
  if (!existing) document.head.appendChild(tag);
}

export function setCanonical(href: string): void {
  let tag = document.head.querySelector(`link[rel="canonical"][${MARKER}]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    tag.setAttribute(MARKER, '');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

/**
 * Replaces every managed `hreflang` alternate at once, since the set
 * changes shape with the page (not just its `href`) and there is no
 * single element to update in place.
 */
export function setAlternates(alternates: { hrefLang: string; href: string }[]): void {
  document.head.querySelectorAll(`link[rel="alternate"][${MARKER}]`).forEach((el) => el.remove());
  for (const { hrefLang, href } of alternates) {
    const tag = document.createElement('link');
    tag.setAttribute('rel', 'alternate');
    tag.setAttribute('hreflang', hrefLang);
    tag.setAttribute('href', href);
    tag.setAttribute(MARKER, '');
    document.head.appendChild(tag);
  }
}

/** Property → value pairs, in the order they're written. `og:` prefix added here, not by the caller. */
const OG_PROPERTIES = [
  ['type', 'og:type'],
  ['locale', 'og:locale'],
  ['localeAlternate', 'og:locale:alternate'],
  ['title', 'og:title'],
  ['description', 'og:description'],
  ['url', 'og:url'],
  ['siteName', 'og:site_name'],
  ['image', 'og:image'],
  ['imageAlt', 'og:image:alt'],
] as const;

/**
 * Replaces every managed `og:*` tag at once, same reasoning as
 * setAlternates. No `twitter:*` counterpart — the business has no
 * Twitter/X presence, and Open Graph already covers Facebook and
 * WhatsApp link previews, its two actual sharing channels.
 */
export function setOpenGraph(og: PageOpenGraph): void {
  document.head.querySelectorAll(`meta[property^="og:"][${MARKER}]`).forEach((el) => el.remove());
  for (const [key, property] of OG_PROPERTIES) {
    const tag = document.createElement('meta');
    tag.setAttribute('property', property);
    tag.setAttribute('content', og[key]);
    tag.setAttribute(MARKER, '');
    document.head.appendChild(tag);
  }
}

/** `data` is `null` on pages with no structured data of their own (menu, events, 404) — see useDocumentHead.ts. */
export function setJsonLd(data: Record<string, unknown> | null): void {
  const existing = document.head.querySelector(`script[type="application/ld+json"][${MARKER}]`);
  if (!data) {
    existing?.remove();
    return;
  }
  const tag = existing ?? document.createElement('script');
  tag.setAttribute('type', 'application/ld+json');
  tag.setAttribute(MARKER, '');
  tag.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(tag);
}
