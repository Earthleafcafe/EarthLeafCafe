import { useState } from 'react';
import Container from '../../ui/Container';
import Lightbox from '../../ui/Lightbox';
import Section from '../../ui/Section';
import SectionHead from '../../ui/SectionHead';
import { galleryPhotos } from '../../../content';
import { useContent } from '../../../hooks/useContent';
import styles from './Gallery.module.css';

/**
 * `.section#gallery` — the photo grid + lightbox. Consumes the phase-10
 * gallery/lightbox contract built specifically to close this gap.
 *
 * Note: the source's first button carries a `.large` class with zero
 * matching CSS rules anywhere in the stylesheet — dead code
 * (docs/CLAUDE.md "Dead code" table); not ported.
 *
 * The grid uses `repeat(auto-fit, minmax(300px, 1fr))` rather than a
 * fixed column split — the source only ever had exactly 2 photos, but
 * this gallery grew to 3 on 2026-09-18, and a hardcoded 2-column split
 * left the 3rd tile stranded next to an empty gap (same lesson as the
 * Menu section's restructure the day before). Auto-fit handles any
 * count without a special case.
 */
export default function Gallery() {
  const content = useContent();
  const photos = galleryPhotos(content);
  const [openId, setOpenId] = useState<string | null>(null);
  const openPhoto = photos.find((photo) => photo.id === openId) ?? null;

  return (
    <Section id="gallery">
      <Container>
        <SectionHead
          eyebrow={content.gallery.eyebrow}
          heading={content.gallery.heading}
          sub={content.gallery.sub}
          centered
        />

        <div className={styles.gallery}>
          {photos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              className={styles.galleryItem}
              aria-label={photo.openLabel}
              onClick={() => setOpenId(photo.id)}
            >
              <img src={photo.thumb} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </Container>

      <Lightbox
        photo={openPhoto}
        onClose={() => setOpenId(null)}
        ariaLabel={content.gallery.lightboxAriaLabel}
        closeLabel={content.gallery.lightboxCloseLabel}
      />
    </Section>
  );
}
