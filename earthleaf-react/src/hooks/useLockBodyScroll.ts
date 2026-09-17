import { useEffect } from 'react';

/**
 * Toggles `body[data-scroll-locked]` (styled in styles/base.css) while
 * `active` is true. Replaces the source's direct
 * `document.body.style.overflow = 'hidden'` mutation, which is inline
 * CSS from JS and could clobber another scroll lock (plan §6.3).
 */
export function useLockBodyScroll(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    document.body.dataset.scrollLocked = 'true';
    return () => {
      delete document.body.dataset.scrollLocked;
    };
  }, [active]);
}
