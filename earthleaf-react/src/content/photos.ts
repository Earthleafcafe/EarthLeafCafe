/**
 * The photo registry — locale-independent paths + intrinsic dimensions,
 * shared by Gallery today and by Menu (phase 17) / Events (phase 19)
 * once they're built. This is `Photo`, the type
 * docs/REACT-MIGRATION-PLAN.md §14.2 (in earthleaf.lk) introduced to
 * replace phase 10's originally-sketched `GalleryPhoto` — built now
 * because generalizing later would mean a rewrite, not an addition.
 *
 * Alt text is deliberately NOT here — it's per-locale, so it lives in
 * content/{en,si}.ts and gets zipped in by `id` at the call site (see
 * content/gallery.ts).
 *
 * ⚠️ width/height currently describe BOTH `thumb` and `full` because,
 * today, every gallery item's `thumb` and `full` point at the same file
 * (see docs/IMPLEMENTATION-GAPS.md gap C1 — a `-1600`-suffixed filename
 * doesn't actually mean a separately-sized file exists). Phase 12
 * generates real differently-sized thumbnails; when it does, this needs
 * separate thumbWidth/thumbHeight fields, and this comment should be
 * deleted along with the assumption.
 */

import { assets } from './assets';

export interface Photo {
  id: string;
  thumb: string;
  full: string;
  width: number;
  height: number;
}

/**
 * Intrinsic dimensions, measured from the actual file headers — not
 * trusted from filenames (docs/CLAUDE.md "Asset facts" table in
 * earthleaf.lk records how these were read).
 */
const DIMENSIONS: Record<string, { width: number; height: number }> = {
  'counter-2': { width: 1600, height: 1200 },
  'interior-counter': { width: 1280, height: 960 },
  'interior-seating': { width: 1280, height: 960 },
};

// Only assets.gallery feeds this registry today. Phases 17/19 extend
// assets.ts with their own `menu`/`events` photo lists and should merge
// them in here too, each with their own DIMENSIONS entries.
const REGISTRY: Record<string, Photo> = Object.fromEntries(
  assets.gallery.map((item) => {
    const dims = DIMENSIONS[item.id];
    if (!dims) {
      throw new Error(`content/photos.ts: no intrinsic dimensions recorded for photo id "${item.id}"`);
    }
    return [item.id, { id: item.id, thumb: item.thumb, full: item.full, ...dims }];
  }),
);

/**
 * Resolves photo ids to full `Photo` records, in order. Throws on any id
 * absent from the registry — a mismatch here is an authoring mistake (a
 * typo'd id, or content referencing a photo never added to assets.ts),
 * not a runtime condition to paper over with a broken `<img>` (plan §12.1).
 */
export function resolvePhotos(ids: readonly string[]): Photo[] {
  return ids.map((id) => {
    const photo = REGISTRY[id];
    if (!photo) {
      throw new Error(`content/photos.ts: unknown photo id "${id}" — is it missing from assets.ts?`);
    }
    return photo;
  });
}
