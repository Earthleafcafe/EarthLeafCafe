import Button from '../../ui/Button';
import Container from '../../ui/Container';
import Eyebrow from '../../ui/Eyebrow';
import { useContent } from '../../../hooks/useContent';
import { buildWhatsappOrderUrl } from '../../../lib/whatsappOrder';
import styles from './OrderBand.module.css';

/** `.order-band#order` — the WhatsApp order CTA, pre-filled with the menu. */
export default function OrderBand() {
  const content = useContent();

  return (
    <section className={styles.orderBand} id="order">
      <Container className={styles.orderInner}>
        <div>
          <Eyebrow tone="light">{content.order.eyebrow}</Eyebrow>
          <h2 className={styles.heading}>{content.order.heading}</h2>
          <p className={styles.body}>{content.order.body}</p>
        </div>
        <Button href={buildWhatsappOrderUrl(content)} variant="light" target="_blank" rel="noopener">
          {content.order.ctaLabel}
        </Button>
      </Container>
    </section>
  );
}
