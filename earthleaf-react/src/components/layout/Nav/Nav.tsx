import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { useLocale } from '../../../context/LocaleProvider';
import { useContent } from '../../../hooks/useContent';
import { classNames } from '../../../lib/classNames';
import { isRouteHref } from '../../../lib/href';
import { homeAnchor } from '../../../lib/routes';
import LanguageSwitch from '../LanguageSwitch';
import ThemeSwitch from '../ThemeSwitch';
import styles from './Nav.module.css';

interface NavProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * The `id="primary-nav"` nav. Now a mix of route links (Menu, Photos)
 * and homepage anchors (Visit, Order) — `isRouteHref` picks the element
 * per link so the two forms can coexist in one content array.
 *
 * ⚠️ Deliberately does NOT use a bare `.nav a { … }` selector like the
 * source does. CSS doesn't know about component boundaries: a selector
 * that broad would reach into Button's "Order" CTA and the anchors
 * inside LanguageSwitch/ThemeSwitch, since they render as real DOM
 * descendants of this <nav>. Scoping to `.navLink` on only the 5 plain
 * links sidesteps a real specificity leak instead of patching it with
 * `!important` downstream (the source needs `!important` in a few of
 * those places for exactly this reason).
 */
export default function Nav({ isOpen, onClose }: NavProps) {
  const content = useContent();
  const locale = useLocale();

  return (
    <nav className={classNames(styles.nav, isOpen && styles.open)} id="primary-nav">
      {content.header.nav.map((link) =>
        isRouteHref(link.href) ? (
          <Link key={link.href} className={styles.navLink} to={link.href} onClick={onClose}>
            {link.label}
          </Link>
        ) : (
          <a key={link.href} className={styles.navLink} href={link.href} onClick={onClose}>
            {link.label}
          </a>
        ),
      )}

      <Button href={homeAnchor(locale, 'order')} size="small" onClick={onClose}>
        {content.header.orderCta}
      </Button>

      <LanguageSwitch />
      <ThemeSwitch />
    </nav>
  );
}
