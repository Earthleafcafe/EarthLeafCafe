import Gallery from '../components/sections/Gallery';
import { useDocumentHead } from '../hooks/useDocumentHead';

/**
 * `/events` and `/si/events`. Hosts the photo gallery + lightbox.
 *
 * ⚠️ Currently shows the two café-interior photos this gallery has
 * always held, under its existing translated copy ("Photos" / "ඡායාරූප").
 * Real per-event photos and the Sinhala event copy are still unsupplied
 * — documented as the blocker for phases 16–19 — so nothing here invents
 * event names or dates.
 */
export default function EventsPage() {
  useDocumentHead('events');

  return <Gallery />;
}
