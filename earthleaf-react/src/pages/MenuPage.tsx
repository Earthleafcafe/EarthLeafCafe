import Menu from '../components/sections/Menu';
import { useDocumentHead } from '../hooks/useDocumentHead';

/**
 * `/menu` and `/si/menu`. Menu is still the text-only three-card shape;
 * the per-card photo variant is phase 17's job, blocked on real menu
 * items and photos (docs/CLAUDE.md "Known placeholders").
 */
export default function MenuPage() {
  useDocumentHead('menu');

  return <Menu />;
}
