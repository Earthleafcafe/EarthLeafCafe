import Container from '../../ui/Container';
import Section from '../../ui/Section';
import SectionHead from '../../ui/SectionHead';
import { formatPrice, menu as menuConfig } from '../../../content/menu';
import { useContent } from '../../../hooks/useContent';
import styles from './Menu.module.css';

/**
 * `.section.soft#menu` — one full-width section per content/{en,si}.ts
 * category (zipped by `id` with content/menu.ts for its icon, prices,
 * and item photos), stacked vertically rather than sitting side-by-side
 * as narrow cards.
 *
 * That's a deliberate change from the original layout, made once a
 * second and third item got photos: a narrow (~260px) per-category
 * card forces every item — photographed or not — into a single
 * cramped column, so a 6-item category (Hot Coffee & Drinks) ends up
 * dramatically taller than a 1-item one (Fried Rice) sitting right
 * beside it, and photos get squeezed to column-width instead of
 * reading at a useful size. Checked how fast-casual/healthy-bowl menu
 * pages handle this (sweetgreen: full-width section, wide item grid,
 * not a narrow sidebar) and matched that instead: each category is a
 * heading over its own `.itemGrid`, which lets item cards flow several
 * per row at a real size and lets categories of any length coexist
 * without a lopsided grid.
 */
export default function Menu() {
  const content = useContent();

  return (
    <Section soft id="menu">
      <Container>
        <SectionHead eyebrow={content.menu.eyebrow} heading={content.menu.heading} sub={content.menu.sub} centered />

        <div className={styles.categories}>
          {content.menu.cards.map((card) => {
            const category = menuConfig.find((c) => c.id === card.id);
            if (!category) return null;

            const items = card.items.map((item) => ({ item, configItem: category.items.find((i) => i.id === item.id) }));

            return (
              <section key={card.id} className={styles.categorySection}>
                <div className={styles.categoryHead}>
                  <div className={styles.menuIcon}>{category.icon}</div>
                  <h3>{card.title}</h3>
                </div>

                <div className={styles.itemGrid}>
                  {items.map(({ item, configItem }) =>
                    configItem?.image ? (
                      <figure key={item.id} className={styles.itemCardPhoto}>
                        <img
                          className={styles.itemCardPhotoImg}
                          src={configItem.image}
                          alt={item.name}
                          width={320}
                          height={240}
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption>
                          <strong>{item.name}</strong>
                          <span className={styles.menuPrice}> — {formatPrice(configItem.price)}</span>
                        </figcaption>
                      </figure>
                    ) : (
                      <div key={item.id} className={styles.itemCardText}>
                        <strong>{item.name}</strong>
                        {configItem && <span className={styles.menuPrice}> — {formatPrice(configItem.price)}</span>}
                      </div>
                    ),
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
