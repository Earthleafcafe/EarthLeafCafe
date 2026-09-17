import { useEffect } from 'react';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import Section from '../components/ui/Section';
import { useLocale } from '../context/LocaleProvider';
import { useContent } from '../hooks/useContent';
import { setJsonLd, setMetaDescription, setRobots } from '../lib/domHead';
import { localeHome } from '../lib/routes';
import styles from './NotFoundPage.module.css';

/**
 * The catch-all — matched by App.tsx's per-locale `path="*"`, plus a
 * top-level `path="*"` for a path that doesn't even match a locale
 * prefix (see App.tsx for why that one defaults to English).
 *
 * Deliberately doesn't use useDocumentHead.ts: that hook computes a
 * canonical URL and hreflang alternates for a real, indexable page,
 * and a 404 is neither — it sets `<title>` and `noindex` directly
 * instead. Prerendered to dist/404.html, the filename most static
 * hosts (Netlify, Cloudflare Pages, GitHub Pages) serve automatically
 * for any unmatched path.
 */
export default function NotFoundPage() {
  const locale = useLocale();
  const content = useContent();

  useEffect(() => {
    document.title = content.notFound.heading;
    setMetaDescription(content.notFound.body);
    setRobots('noindex');
    // A stale Restaurant entity from whatever page was open before
    // client-side navigating here would otherwise linger on a page
    // that's explicitly noindex.
    setJsonLd(null);
    return () => setRobots(null);
  }, [content.notFound.heading, content.notFound.body]);

  return (
    <Section>
      <Container className={styles.inner}>
        <Eyebrow>{content.notFound.eyebrow}</Eyebrow>
        <h1>{content.notFound.heading}</h1>
        <p>{content.notFound.body}</p>
        <Button href={localeHome(locale)}>{content.notFound.backHomeLabel}</Button>
      </Container>
    </Section>
  );
}
