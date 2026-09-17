import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '../../../context/LocaleProvider';
import { useContent } from '../../../hooks/useContent';
import type { Locale } from '../../../content';
import styles from './LanguageSwitch.module.css';

/**
 * Maps the current path to its equivalent in the other locale, preserving
 * any hash — `/#menu` → `/si#menu`, not just `/si` (plan §13, gap G3: more
 * useful than the source's "preserve scroll position", since the same
 * section sits at a different height in two languages with different
 * text lengths). Handles only `/` and `/si` today; phase 18 extends this
 * when `/events` and `/si/events` are added.
 */
function otherLocalePath(pathname: string, currentLocale: Locale): string {
  if (currentLocale === 'si') {
    const withoutSi = pathname.replace(/^\/si/, '');
    return withoutSi === '' ? '/' : withoutSi;
  }
  return pathname === '/' ? '/si' : `/si${pathname}`;
}

/** `.language-switch` — current locale as an inert pill, a `<Link>` to the other. */
export default function LanguageSwitch() {
  const locale = useLocale();
  const content = useContent();
  const location = useLocation();

  const otherLocale: Locale = locale === 'en' ? 'si' : 'en';
  const target = otherLocalePath(location.pathname, locale) + location.hash;

  return (
    <div className={styles.languageSwitch} aria-label={content.header.langSwitchAriaLabel}>
      {locale === 'si' && (
        <Link
          className={styles.link}
          to={target}
          lang={otherLocale}
          hrefLang={otherLocale}
          aria-label={content.header.otherLangAriaLabel}
        >
          <span>{content.header.otherLangLabel}</span>
        </Link>
      )}
      <span className={styles.current} aria-current="page">
        {content.header.langCurrentLabel}
      </span>
      {locale === 'en' && (
        <Link
          className={styles.link}
          to={target}
          lang={otherLocale}
          hrefLang={otherLocale}
          aria-label={content.header.otherLangAriaLabel}
        >
          🇱🇰 <span>{content.header.otherLangLabel}</span>
        </Link>
      )}
    </div>
  );
}
