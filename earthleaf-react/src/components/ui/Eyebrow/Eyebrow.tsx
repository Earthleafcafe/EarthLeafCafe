import type { ReactNode } from 'react';
import { classNames } from '../../../lib/classNames';
import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
  /** `light` = `.eyebrow.light` in the source, used on dark section backgrounds (e.g. OrderBand). */
  tone?: 'default' | 'light';
  className?: string;
}

/** The small uppercase label above most section headings. */
export default function Eyebrow({ children, tone = 'default', className }: EyebrowProps) {
  return <p className={classNames(styles.eyebrow, tone === 'light' && styles.light, className)}>{children}</p>;
}
