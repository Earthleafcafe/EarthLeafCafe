import { useContent } from '../../../hooks/useContent';
import styles from './NavToggle.module.css';

interface NavToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * The mobile hamburger button. `aria-label` switches with state — the
 * source's `navCloseLabel` is never actually localized (main.js hardcodes
 * "Close menu" even on the Sinhala page); content/si.ts fixes that.
 */
export default function NavToggle({ isOpen, onToggle }: NavToggleProps) {
  const content = useContent();

  return (
    <button
      type="button"
      className={styles.navToggle}
      aria-label={isOpen ? content.header.navCloseLabel : content.header.navOpenLabel}
      aria-expanded={isOpen}
      aria-controls="primary-nav"
      onClick={onToggle}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
