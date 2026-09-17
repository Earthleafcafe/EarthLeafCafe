import { en } from './en';
import { si } from './si';
import type { SiteContent } from './types';

export const locales = { en, si } as const;

export type Locale = keyof typeof locales;

export const localeList = Object.keys(locales) as Locale[];

export function isLocale(value: string): value is Locale {
  return value in locales;
}

export type { SiteContent };
export { assets } from './assets';
export { galleryPhotos } from './gallery';
export type { GalleryPhoto } from './gallery';
export { resolvePhotos } from './photos';
export type { Photo } from './photos';
