// Runs after `vite build` (client → dist/) and `vite build --ssr
// src/entry-server.tsx --outDir dist-ssr` (server → dist-ssr/). Reads
// the client build's index.html as a template, renders each known
// route through the SSR bundle, and writes the result to dist/<route>/
// index.html — real static HTML per page, not the empty
// `<div id="root"></div>` a plain Vite React build would ship.
//
// Hand-written rather than using a prerendering package: vite-react-ssg
// (the obvious choice, and what docs/REACT-MIGRATION-PLAN.md §7.3
// names) caps its react-router-dom peer dependency at ^6.14.1, and this
// app is on v7. This script is the same two-build-plus-stitch approach
// Vite's own SSR guide documents, just without a package whose peer
// range doesn't cover the router version already in use.
//
// react-helmet-async was also considered for the per-route <title>/meta
// half of this, and deliberately skipped: with a small, fully static set
// of six known routes (no per-request/dynamic data), a flat lookup table
// (content meta[] + lib/seo.ts) does the same job without a runtime
// dependency neither the server nor the client actually needs.

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(rootDir, 'dist');
const ssrEntry = path.join(rootDir, 'dist-ssr', 'entry-server.js');

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function outputPathFor(routePath) {
  return routePath === '/' ? path.join(distDir, 'index.html') : path.join(distDir, routePath, 'index.html');
}

// Must match lib/domHead.ts's MARKER exactly. Without it, useDocumentHead's
// setCanonical/setAlternates can't find these prerendered tags to update in
// place on the first client-side navigation — they'd look for a tag with
// this attribute, find none, and create new ones alongside the stale
// prerendered pair instead of replacing them. Caught by testing a real
// client-side nav against a `vite preview` build, not just reading the
// prerendered HTML: the static output looks correct either way.
const HEAD_MARKER = 'data-managed-head';

/** Inserted right before `</head>`: canonical + hreflang, or nothing for a non-indexable page. */
function seoLinkTags(seo) {
  if (!seo) return '';
  const canonical = `    <link rel="canonical" href="${escapeHtml(seo.canonical)}" ${HEAD_MARKER} />\n`;
  const alternates = seo.alternates
    .map((a) => `    <link rel="alternate" hreflang="${a.hrefLang}" href="${escapeHtml(a.href)}" ${HEAD_MARKER} />\n`)
    .join('');
  return canonical + alternates;
}

// Order/keys must match lib/domHead.ts's setOpenGraph — that's the
// client-side code that has to find these same tags on first nav.
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
];

function openGraphTags(og) {
  if (!og) return '';
  return OG_PROPERTIES.map(
    ([key, property]) => `    <meta property="${property}" content="${escapeHtml(og[key])}" ${HEAD_MARKER} />\n`,
  ).join('');
}

// `<` is escaped so a literal "</script>" inside the JSON can't
// prematurely close the tag — JSON.stringify has no reason to ever
// produce one, but the input is our own data either way, not user input.
function jsonLdScript(data) {
  if (!data) return '';
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `    <script type="application/ld+json" ${HEAD_MARKER}>${json}</script>\n`;
}

function stitchPage(template, { lang, appHtml, title, description, robots, seo, og, jsonLd }) {
  let html = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);

  let head = seoLinkTags(seo) + openGraphTags(og) + jsonLdScript(jsonLd);
  if (robots) head += `    <meta name="robots" content="${robots}" ${HEAD_MARKER} />\n`;
  html = html.replace('</head>', `${head}  </head>`);

  return html;
}

async function main() {
  const template = await readFile(path.join(distDir, 'index.html'), 'utf-8');
  const { render, getPrerenderRoutes, getPageMeta, getNotFoundMeta, pageSeo, getPageOpenGraph, getRestaurantJsonLd } =
    await import(pathToFileUrl(ssrEntry));

  for (const route of getPrerenderRoutes()) {
    const meta = getPageMeta(route.locale, route.page);
    const html = stitchPage(template, {
      lang: route.locale,
      appHtml: render(route.path),
      title: meta.title,
      description: meta.description,
      robots: null,
      seo: pageSeo(route.locale, route.page),
      og: getPageOpenGraph(route.locale, route.page),
      jsonLd: getRestaurantJsonLd(route.locale, route.page),
    });

    const outPath = outputPathFor(route.path);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html);
    console.log('prerendered', route.path, '→', path.relative(rootDir, outPath));
  }

  // 404.html: the filename Netlify, Cloudflare Pages, and GitHub Pages
  // all serve automatically for an unmatched path — see plan §7.4. The
  // URL rendered doesn't matter beyond "matches nothing", which lands on
  // the English chrome per App.tsx's routing-ranking (verified live: an
  // unprefixed unmatched path falls through to en's `/*`, the least
  // specific of the two locale-scoped wildcards).
  const notFoundMeta = getNotFoundMeta('en');
  const notFoundHtml = stitchPage(template, {
    lang: 'en',
    appHtml: render('/this-page-does-not-exist'),
    title: notFoundMeta.title,
    description: notFoundMeta.description,
    robots: 'noindex',
    seo: null,
  });
  await writeFile(path.join(distDir, '404.html'), notFoundHtml);
  console.log('prerendered 404 → dist/404.html');

  await rm(path.join(rootDir, 'dist-ssr'), { recursive: true, force: true });
}

function pathToFileUrl(p) {
  return new URL(`file://${p.replace(/\\/g, '/')}`).href;
}

await main();
