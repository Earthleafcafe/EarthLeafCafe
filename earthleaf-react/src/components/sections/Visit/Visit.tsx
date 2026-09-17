import { Fragment } from 'react';
import Button from '../../ui/Button';
import Container from '../../ui/Container';
import Section from '../../ui/Section';
import SectionHead from '../../ui/SectionHead';
import { useContent } from '../../../hooks/useContent';
import styles from './Visit.module.css';

/**
 * `.section#visit` — location/hours/contact cards + the "get in touch"
 * callout. Each card's rows render as one `<p>` with `<br>` between
 * lines, matching the source's actual markup — not separate `<p>` tags.
 */
export default function Visit() {
  const content = useContent();

  return (
    <Section id="visit">
      <Container>
        <SectionHead eyebrow={content.visit.eyebrow} heading={content.visit.heading} sub={content.visit.sub} centered />

        <div className={styles.visitGrid}>
          {content.visit.cards.map((card) => (
            <article key={card.kicker} className={styles.visitCard}>
              <span className={styles.visitKicker}>{card.kicker}</span>
              <h3>{card.title}</h3>
              <p>
                {card.rows.map((row, index) => {
                  const isExternal = row.href?.startsWith('http');
                  return (
                    <Fragment key={index}>
                      {index > 0 && <br />}
                      {row.label && <strong>{row.label}</strong>}
                      {row.label && row.value ? ' ' : null}
                      {row.href ? (
                        <a href={row.href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener' : undefined}>
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </Fragment>
                  );
                })}
              </p>
            </article>
          ))}
        </div>

        <div className={styles.callout}>
          <div>
            <h3>{content.visit.callout.heading}</h3>
            <p>{content.visit.callout.body}</p>
          </div>
          <Button href="#visit" variant="outline">
            {content.visit.callout.ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
