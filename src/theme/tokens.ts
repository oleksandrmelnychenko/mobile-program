/**
 * Design tokens for Horizon Console.
 *
 * The palette is navy-based to read as a focused "admin cockpit". Two schemes
 * (light/dark) share the same semantic keys so components never branch on the
 * raw scheme — they read `useTheme()` and use semantic names.
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const fontSize = {
  caption: 12,
  footnote: 13,
  body: 15,
  callout: 17,
  title3: 20,
  title2: 24,
  title1: 30,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/** Status colours are scheme-independent (consistent meaning across modes). */
export const status = {
  success: '#16A34A',
  warning: '#D97706',
  danger: '#DC2626',
  info: '#2563EB',
  neutral: '#64748B',
} as const;

const palette = {
  brand: '#3B82F6',
  brandDark: '#2563EB',
} as const;

export type ThemeColors = {
  brand: string;
  brandStrong: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textOnBrand: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  neutral: string;
};

export const lightColors: ThemeColors = {
  brand: palette.brand,
  brandStrong: palette.brandDark,
  background: '#F4F6FB',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF2F9',
  border: '#E2E8F0',
  text: '#0B1220',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textOnBrand: '#FFFFFF',
  ...status,
};

export const darkColors: ThemeColors = {
  brand: '#60A5FA',
  brandStrong: palette.brand,
  background: '#0B1220',
  surface: '#131C2E',
  surfaceAlt: '#1B2740',
  border: '#243149',
  text: '#F8FAFC',
  textSecondary: '#AEBCD3',
  textMuted: '#6B7A96',
  textOnBrand: '#0B1220',
  ...status,
};

export type Theme = {
  scheme: 'light' | 'dark';
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
};
