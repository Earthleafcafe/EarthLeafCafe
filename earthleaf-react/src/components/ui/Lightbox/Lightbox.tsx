import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { GalleryPhoto } from '../../../content/gallery';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import styles from './Lightbox.module.css';

interface LightboxProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  ariaLabel: string;
  closeLabel: string;
}

/**
 * `.lightbox` — rendered via `createPortal` into `document.body` (plan
 * §6.3), not inline inside Gallery. `photo === null` renders nothing.
 *
 * Two things the source never had, both required by the plan's phase 10
 * "done when" criteria: a focus trap while open, and focus returned to
 * the button that opened it on close.
 */
export default function Lightbox({ photo, onClose, ariaLabel, closeLabel }: LightboxProps) {
  const isOpen = photo !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useLockBodyScroll(isOpen);
  useEscapeKey(onClose, isOpen);

  // Capture whichever element opened the lightbox (the Gallery button
  // that was just clicked/activated), and hand focus back to it on close.
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();
    } else if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  // Minimal focus trap. The close button is the dialog's only focusable
  // element today, so this just keeps Tab from leaving it — written
  // generally (queries focusable descendants) so it keeps working if a
  // later phase adds prev/next controls.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!photo) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={(event) => {
        // Close on backdrop click only — not on clicks inside the image/button.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button ref={closeButtonRef} type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
        ×
      </button>
      <img className={styles.img} src={photo.full} alt={photo.alt} width={photo.width} height={photo.height} />
    </div>,
    document.body,
  );
}
