import { Link } from 'react-router-dom';
import { assets } from '../../../content';
import { useContent } from '../../../hooks/useContent';
import { isRouteHref } from '../../../lib/href';
import Container from '../../ui/Container';
import styles from './Footer.module.css';

/**
 * `.site-footer` — brand, section links, copyright. Links mix routes and
 * homepage anchors exactly as Nav does, via the same `isRouteHref`.
 */
export default function Footer() {
  const content = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.siteFooter}>
      <Container className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <img src={assets.logo} alt={content.footer.logoAlt} />
          <div>
            <strong className={styles.brandStrong}>{content.footer.brandName}</strong>
            <span className={styles.brandSpan}>{content.footer.brandSub}</span>
            <div className={styles.footerSocial}>
              {content.footer.social.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerLinks}>
          {content.footer.links.map((link) =>
            isRouteHref(link.href) ? (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ),
          )}
        </div>

        <div className={styles.footerMeta}>
          <p>{content.footer.copyright(year)}</p>
          <a href="#top">{content.footer.backToTop}</a>
        </div>
      </Container>
    </footer>
  );
}
