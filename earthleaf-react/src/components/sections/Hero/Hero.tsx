import Button from '../../ui/Button';
import Chip from '../../ui/Chip';
import Container from '../../ui/Container';
import Eyebrow from '../../ui/Eyebrow';
import { assets } from '../../../content';
import { useLocale } from '../../../context/LocaleProvider';
import { useContent } from '../../../hooks/useContent';
import { localeRoute } from '../../../lib/routes';
import styles from './Hero.module.css';

/**
 * `.hero` — the page-opening band. No `id`; it's just the top of `<main>`.
 *
 * Two CTAs, both now route links rather than the source's hash anchors:
 * primary → /menu, secondary → /events. The secondary replaces the
 * source's walkthrough-video button, which went with the Video section.
 */
export default function Hero() {
  const content = useContent();
  const locale = useLocale();

  return (
    <section className={styles.hero}>
      <Container className={styles.heroShell}>
        <div className={styles.heroCopy}>
          <Eyebrow>{content.hero.eyebrow}</Eyebrow>
          <h1>
            {content.hero.title.lead} <span>{content.hero.title.highlight}</span>
            {content.hero.title.tail}
          </h1>
          <p className={styles.lead}>{content.hero.lead}</p>

          <div className={styles.heroCta}>
            <Button href={localeRoute(locale, 'menu')}>{content.hero.ctaPrimary}</Button>
            <Button href={localeRoute(locale, 'events')} variant="outline">
              {content.hero.ctaSecondary}
            </Button>
          </div>

          <div className={styles.chips} aria-label={content.hero.chipsAriaLabel}>
            {content.hero.chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
        </div>

        <div className={styles.heroImageWrap}>
          <img
            className={styles.heroImage}
            src={assets.heroImage}
            alt={content.hero.imageAlt}
            width={1600}
            height={1200}
            // LCP element for this route — eager + high priority (plan §14.3).
            loading="eager"
            fetchPriority="high"
          />
          <div className={styles.floatingCard}>
            <strong>{content.hero.floatingCard.title}</strong>
            <span>{content.hero.floatingCard.sub}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
