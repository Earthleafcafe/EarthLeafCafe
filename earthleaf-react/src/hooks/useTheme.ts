import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from '../context/ThemeProvider';

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error('useTheme must be called within a <ThemeProvider>');
  }
  return ctx;
}
