import type { ReactNode } from 'react';
import { classNames } from '../../../lib/classNames';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  /** `.section.soft` — the cream background variant Menu uses. */
  soft?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * `.section` — the shared outer-padding wrapper used by Gallery, Menu,
 * and Visit (Promise and Video have their own distinct backgrounds and
 * don't use this). Flagged as a gap in
 * docs/RESPONSIVE-INVENTORY.md (phase 11) — built now that phase 5
 * actually needs it, the same way Container was built in phase 3 for
 * the equivalent `.container` utility class.
 */
export default function Section({ id, soft, className, children }: SectionProps) {
  return (
    <section id={id} className={classNames(styles.section, soft && styles.soft, className)}>
      {children}
    </section>
  );
}
