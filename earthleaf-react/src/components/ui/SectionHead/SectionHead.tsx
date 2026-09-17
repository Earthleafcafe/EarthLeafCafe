import { classNames } from '../../../lib/classNames';
import Eyebrow from '../Eyebrow';
import styles from './SectionHead.module.css';

interface SectionHeadProps {
  eyebrow: string;
  heading: string;
  sub?: string;
  centered?: boolean;
  className?: string;
}

/** The eyebrow + h2 + optional description that opens most sections (`.section-head`). */
export default function SectionHead({ eyebrow, heading, sub, centered = false, className }: SectionHeadProps) {
  return (
    <div className={classNames(styles.sectionHead, centered && styles.centered, className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{heading}</h2>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}
