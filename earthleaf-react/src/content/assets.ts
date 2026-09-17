/**
 * Static asset paths — locale-independent, so they live here once
 * instead of being duplicated inside content/en.ts and content/si.ts
 * (docs/REACT-MIGRATION-PLAN.md §4 in earthleaf.lk). Paths are absolute
 * from the site root; the files themselves live in public/assets/
 * (only the actually-referenced assets — see plan §8; the walkthrough
 * video, its poster, and the old feature image became unreferenced
 * when the Video and Promise sections were removed).
 *
 * Gallery's second and third photos (counter-1's replacements) are
 * owner-supplied Interior shots, 2026-09-18 — thumb and full point at
 * the same file since these weren't cropped to two sizes (matches the
 * existing counter-2/counter-1 files' own "the -1600 suffix is a lie"
 * situation documented in CLAUDE.md; real responsive sizing is phase
 * 12's job, not fixed here).
 *
 * Gallery items carry an `id` so content/{en,si}.ts's alt text and
 * open-label can be matched to the right image positionally without
 * repeating the file path in each locale.
 *
 * Prefixed with `import.meta.env.BASE_URL` (Vite's build-time constant
 * for vite.config.ts's `base`), not a hardcoded `/` — these are plain
 * runtime strings, not `import`ed modules, so Vite's own asset-path
 * rewriting for the JS/CSS bundle never touches them. Resolves to `/`
 * automatically when `base` is `/`, so this is a no-op locally.
 */

const path = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;

export const assets = {
  logo: path('earthleaf-logo.png'),
  favicon: path('earthleaf-favicon.png'),
  heroImage: path('earthleaf-counter-2-1600.jpg'),
  /**
   * 1200×630 for og:image/twitter:image (phase 13) — a deliberate center
   * crop of the same counter-2 photo heroImage uses (full-width, cropped
   * to 1.91:1 vertically), not a separately shot image. Swap this file
   * for a purpose-shot photo whenever one exists; nothing else needs to
   * change since lib/seo.ts only ever references the path.
   */
  ogImage: path('earthleaf-og-1200x630.jpg'),
  gallery: [
    { id: 'counter-2', thumb: path('earthleaf-counter-2.jpg'), full: path('earthleaf-counter-2-1600.jpg') },
    { id: 'interior-counter', thumb: path('earthleaf-interior-counter.jpg'), full: path('earthleaf-interior-counter.jpg') },
    { id: 'interior-seating', thumb: path('earthleaf-interior-seating.jpg'), full: path('earthleaf-interior-seating.jpg') },
  ],
} as const;
