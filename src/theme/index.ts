import { useColorScheme } from 'react-native';

import {
  darkColors,
  fontSize,
  fontWeight,
  lightColors,
  radius,
  spacing,
  type Theme,
} from './tokens';

export * from './tokens';

/** Resolve the active theme from the OS colour scheme. */
export function useTheme(): Theme {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return {
    scheme,
    colors: scheme === 'dark' ? darkColors : lightColors,
    spacing,
    radius,
    fontSize,
    fontWeight,
  };
}
