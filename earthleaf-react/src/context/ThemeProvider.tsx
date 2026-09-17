import { createContext, useCallback, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  /** What's selected/stored — 'auto' is a real, persistent state, not just "no preference yet". */
  mode: ThemeMode;
  /** What's actually applied to the page right now. */
  resolved: ResolvedTheme;
  /** Auto → Light → Dark → Auto. See the AUTO correction below. */
  cycle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = 'earthleaf:theme';

/**
 * Absence of the key means 'auto' — matching the source's own semantics,
 * so a returning visitor's stored 'light'/'dark' preference is read
 * exactly as before (docs/REACT-MIGRATION-PLAN.md §6.2 in earthleaf.lk:
 * "keep the same storage key").
 */
function readStoredMode(): ThemeMode {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : 'auto';
  } catch {
    return 'auto';
  }
}

function subscribeToSystemTheme(callback: () => void): () => void {
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  // Modern addEventListener only — the plan explicitly drops the source's
  // addEventListener/addListener fallback branch for old Safari (§6.2).
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function readSystemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/** Assume light for a server-rendered snapshot; the anti-FOUC inline script in
 *  index.html is what actually prevents a flash in real browsers — this is
 *  only relevant once phase 7 adds SSG. */
function readServerPrefersDark(): boolean {
  return false;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(readStoredMode);
  const systemPrefersDark = useSyncExternalStore(
    subscribeToSystemTheme,
    readSystemPrefersDark,
    readServerPrefersDark,
  );

  const resolved: ResolvedTheme = mode === 'auto' ? (systemPrefersDark ? 'dark' : 'light') : mode;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  /**
   * ⚠️ Correction from the plan (§6.2): the source's toggle is a one-way
   * door — AUTO is only ever the *initial* state, and the first click
   * persists 'light' or 'dark' permanently with no way back. This is the
   * real 3-state cycle recommended there: Auto → Light → Dark → Auto,
   * clearing the storage key on return to Auto (so "auto" isn't just
   * "any value the visitor happened to have").
   */
  const cycle = useCallback(() => {
    setMode((current) => {
      const next: ThemeMode = current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto';
      try {
        if (next === 'auto') {
          localStorage.removeItem(THEME_KEY);
        } else {
          localStorage.setItem(THEME_KEY, next);
        }
      } catch {
        // localStorage unavailable (private browsing, etc.) — mode still
        // updates for this session, it just won't persist across reloads.
      }
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({ mode, resolved, cycle }), [mode, resolved, cycle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
