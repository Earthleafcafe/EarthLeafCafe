import type { ReactNode } from 'react';
import { classNames } from '../../../lib/classNames';
import styles from './Chip.module.css';

interface ChipProps {
  children: ReactNode;
  className?: string;
}

/**
 * A single pill in Hero's "Key promises" row (`.chips span` in the source).
 * The wrapping flex row is Hero's own layout concern, not this primitive's
 * — Hero renders `<Chip>` for each item.
 */
export default function Chip({ children, className }: ChipProps) {
  return <span className={classNames(styles.chip, className)}>{children}</span>;
}
