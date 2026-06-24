import { useColorScheme } from 'react-native';

import {
  darkColors,
  fontSize,
  fontWeight,
  letterSpacing,
  lightColors,
  radius,
  spacing,
  type Theme,
} from './tokens';
import { resolveScheme } from './resolve';
import { useThemeStore } from './store';

export * from './tokens';
export { shadow, type ShadowLevel } from './shadows';
export { resolveScheme, type ColorScheme, type ThemePreference } from './resolve';
export { useThemeStore } from './store';

function buildTheme(scheme: 'light' | 'dark'): Theme {
  return {
    scheme,
    colors: scheme === 'dark' ? darkColors : lightColors,
    spacing,
    radius,
    fontSize,
    fontWeight,
    letterSpacing,
  };
}

/** Active theme — respects user preference (system / light / dark). */
export function useTheme(): Theme {
  const preference = useThemeStore((s) => s.preference);
  const systemScheme = useColorScheme();
  const scheme = resolveScheme(preference, systemScheme);
  return buildTheme(scheme);
}

/** Stored preference before override (system follows OS). */
export function useThemePreference() {
  return useThemeStore((s) => s.preference);
}

export function useSetThemePreference() {
  return useThemeStore((s) => s.setPreference);
}
