import type { ThemeMode } from '../../../context/ThemeProvider';
import { useContent } from '../../../hooks/useContent';
import { useTheme } from '../../../hooks/useTheme';
import styles from './ThemeSwitch.module.css';

// The source never translates this control at all (main.js hardcodes
// "🌙 Dark" / "☀ Light" in English on both pages) — kept as literal
// English here too, matching content/si.ts's themeSwitchAriaLabel
// decision to leave this one alone rather than guess a translation.
const NEXT_MODE: Record<ThemeMode, ThemeMode> = { auto: 'light', light: 'dark', dark: 'auto' };
const MODE_LABEL: Record<ThemeMode, string> = { light: '☀ Light', dark: '🌙 Dark', auto: '🌓 Auto' };

/** `.theme-switch` — shows the current mode, button advances the Auto → Light → Dark → Auto cycle. */
export default function ThemeSwitch() {
  const { mode, cycle } = useTheme();
  const content = useContent();
  const next = NEXT_MODE[mode];

  return (
    <div className={styles.themeSwitch} aria-label={content.header.themeSwitchAriaLabel}>
      <span className={styles.current} aria-live="polite">
        {mode.toUpperCase()}
      </span>
      <button type="button" className={styles.link} onClick={cycle} aria-label={`Switch to ${next} theme`}>
        {MODE_LABEL[next]}
      </button>
    </div>
  );
}
