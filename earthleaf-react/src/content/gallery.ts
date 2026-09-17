import { resolvePhotos, type Photo } from './photos';
import type { SiteContent } from './types';

export interface GalleryPhoto extends Photo {
  alt: string;
  openLabel: string;
}

/**
 * Zips photos.ts's locale-independent `Photo` records (paths + intrinsic
 * dimensions) with this locale's translated alt text and open-button
 * label, matched by `id`. This is the connection the source made with a
 * `data-full` attribute read by JS — it never had a typed equivalent
 * until this file (plan §12.1, the gap that started this whole audit).
 *
 * `ids` is derived directly from `content.gallery.items`, so there's no
 * separate length to get out of sync — `resolvePhotos` throws on any id
 * content references that assets.ts doesn't have, catching drift at
 * build/dev time instead of a runtime broken image.
 */
export function galleryPhotos(content: SiteContent): GalleryPhoto[] {
  const items = content.gallery.items;
  const photos = resolvePhotos(items.map((item) => item.id));

  return photos.map((photo, index) => ({
    ...photo,
    alt: items[index].alt,
    openLabel: items[index].openLabel,
  }));
}
