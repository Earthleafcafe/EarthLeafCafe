import { useEffect } from 'react';

/**
 * Calls `onEscape` when Escape is pressed, only while `active`. Replaces
 * the source's always-on global `keydown` listener (plan §6.3/§6.4) —
 * this one detaches itself when the thing listening for Escape isn't open.
 */
export function useEscapeKey(onEscape: () => void, active: boolean = true): void {
  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, active]);
}
