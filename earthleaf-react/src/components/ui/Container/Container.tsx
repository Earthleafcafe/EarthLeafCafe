import type { ReactNode } from 'react';
import { classNames } from '../../../lib/classNames';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  /** Merged in alongside the container's own width/centering class — see plan §5 on Container. */
  className?: string;
}

/** The site's max-width content wrapper. Ported from `.container` in earthleaf.lk/css/styles.css. */
export default function Container({ children, className }: ContainerProps) {
  return <div className={classNames(styles.container, className)}>{children}</div>;
}
