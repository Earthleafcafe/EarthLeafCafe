import { useLocale } from '../context/LocaleProvider';
import { locales, type SiteContent } from '../content';

/**
 * The active locale's full content dictionary. Section components call
 * this themselves — they take no content props (plan §5) — so phase 5
 * can build every section without threading `content` through props.
 */
export function useContent(): SiteContent {
  const locale = useLocale();
  return locales[locale];
}
