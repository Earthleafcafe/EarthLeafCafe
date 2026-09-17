import { useContent } from '../../../hooks/useContent';
import styles from './SkipLink.module.css';

/** `.skip-link` — hidden until focused, jumps past the header to `#main`. */
export default function SkipLink() {
  const content = useContent();
  return (
    <a className={styles.skipLink} href="#main">
      {content.skipLink}
    </a>
  );
}
