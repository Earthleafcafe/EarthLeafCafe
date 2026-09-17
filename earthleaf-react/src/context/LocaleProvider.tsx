import { createContext, useContext, useEffect, type ReactNode } from 'react';
import type { Locale } from '../content';

const LocaleContext = createContext<Locale | null>(null);

interface LocaleProviderProps {
  locale: Locale;
  children: ReactNode;
}

/**
 * Locale is derived from the ROUTE — App.tsx passes it in explicitly per
 * <Route>, never from client-side state alone — so `/si` stays linkable
 * and indexable (docs/REACT-MIGRATION-PLAN.md §7.1 in earthleaf.lk).
 *
 * Sets `lang` and `data-locale` on <html>. `data-locale` is what
 * styles/locale/typography.css keys off (the phase-1 token layer) —
 * mounting this is what turns that CSS from "works when I toggle the
 * attribute by hand in DevTools" into "works because the app set it".
 */
export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** The raw locale value. Most components want `useContent()` instead — this is
 *  for the few (LanguageSwitch) that need to know the locale itself, e.g. to
 *  compute the *other* locale's route. */
export function useLocale(): Locale {
  const locale = useContext(LocaleContext);
  if (locale === null) {
    throw new Error('useLocale must be called within a <LocaleProvider>');
  }
  return locale;
}
