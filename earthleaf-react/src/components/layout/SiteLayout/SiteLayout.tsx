import { Outlet } from 'react-router-dom';
import { useHashScroll } from '../../../hooks/useHashScroll';
import Footer from '../Footer';
import Header from '../Header';
import SkipLink from '../SkipLink';

/**
 * The chrome every route shares: skip link, header, `<main id="main">`,
 * footer. Mounted as a react-router layout route so the three pages
 * render into the `<Outlet>` rather than each repeating this shell —
 * which also keeps `id="main"` (the skip link's target) defined in
 * exactly one place instead of three that could drift.
 */
export default function SiteLayout() {
  useHashScroll();

  return (
    <>
      <SkipLink />
      <Header />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
