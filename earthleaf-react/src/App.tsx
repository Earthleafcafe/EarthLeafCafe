import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import { LocaleProvider } from './context/LocaleProvider';
import { localeList } from './content';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Six routes: three pages × two locales. Locale is derived from the
 * route, never from state alone (plan §7.1) — so each locale gets its
 * own layout route whose LocaleProvider wraps every page beneath it,
 * and the pages themselves stay locale-agnostic.
 *
 * Generated from `localeList` rather than written out twice, so adding
 * a third locale can't leave one page behind. ThemeProvider is global
 * and mounts in main.tsx instead, since it isn't route-scoped.
 */
const pages = [
  { path: '', element: <HomePage /> },
  { path: 'menu', element: <MenuPage /> },
  { path: 'events', element: <EventsPage /> },
];

export default function App() {
  return (
    <Routes>
      {localeList.map((locale) => (
        <Route
          key={locale}
          path={locale === 'en' ? '/' : `/${locale}`}
          element={
            <LocaleProvider locale={locale}>
              <SiteLayout />
            </LocaleProvider>
          }
        >
          {pages.map((page) => (
            <Route key={page.path} index={page.path === ''} path={page.path || undefined} element={page.element} />
          ))}
          {/*
            A wildcard scoped to this locale's own tree, e.g. `/si/*`. React
            Router ranks a static path segment above a splat regardless of
            which top-level branch it comes from, so `/si` and `/si/menu`
            still resolve to their own routes above — this only ever catches
            what nothing more specific under `/si` matched. That ranking
            also means `/anything-outside-any-locale` falls through to en's
            `/*` (the least specific splat of the two), which is why one
            entry per locale is enough — no separate top-level fallback
            Route is needed to default unprefixed 404s to English.
          */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      ))}
    </Routes>
  );
}
