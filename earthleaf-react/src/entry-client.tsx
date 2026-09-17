import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeProvider';
import './styles/reset.css';
import './styles/tokens/index.css';
import './styles/locale/typography.css';
import './styles/base.css';
import './styles/typography.css';
import './styles/breakpoints.css';

/**
 * The browser entry — was main.tsx before phase 7 added prerendering.
 * `hydrateRoot` instead of `createRoot(...).render(...)`: every page is
 * now prerendered static HTML (see entry-server.tsx, scripts/prerender.mjs),
 * so there is real server-rendered markup to attach to, not an empty
 * `<div id="root">` to render into from scratch.
 *
 * ThemeProvider is global (not route-scoped, unlike LocaleProvider — see
 * App.tsx), so it mounts here rather than inside <Routes>.
 */
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
