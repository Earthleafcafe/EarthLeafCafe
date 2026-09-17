import Hero from '../components/sections/Hero';
import OrderBand from '../components/sections/OrderBand';
import Visit from '../components/sections/Visit';
import { useDocumentHead } from '../hooks/useDocumentHead';

/**
 * `/` and `/si`. A lean landing page: the pitch, the order CTA, and how
 * to find the place. Menu moved to /menu and the photo gallery to
 * /events; Promise and the walkthrough video were removed outright.
 *
 * The shared chrome (header, footer, skip link, `<main>`) lives in
 * SiteLayout, not here.
 */
export default function HomePage() {
  useDocumentHead('home');

  return (
    <>
      <Hero />
      <OrderBand />
      <Visit />
    </>
  );
}
