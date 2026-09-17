import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../../content';
import { useLocale } from '../../../context/LocaleProvider';
import { useContent } from '../../../hooks/useContent';
import { localeHome } from '../../../lib/routes';
import Container from '../../ui/Container';
import Nav from '../Nav';
import NavToggle from '../NavToggle';
import styles from './Header.module.css';

/** `.site-header` — sticky bar with brand, mobile toggle, and Nav. Owns open/close state. */
export default function Header() {
  const content = useContent();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleHashChange = () => setIsOpen(false);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <header className={styles.siteHeader} id="top">
      <Container className={styles.headerInner}>
        {/* Was `href="#top"` when the site was one page; now a real link home,
            since the brand is also clicked from /menu and /events. */}
        <Link className={styles.brand} to={localeHome(locale)} aria-label={content.header.brandHomeAriaLabel}>
          <img className={styles.brandLogo} src={assets.logo} alt={content.header.logoAlt} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>{content.header.brandName}</span>
            <span className={styles.brandSub}>{content.header.brandSub}</span>
          </div>
        </Link>

        <NavToggle isOpen={isOpen} onToggle={() => setIsOpen((open) => !open)} />

        <Nav isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Container>
    </header>
  );
}
