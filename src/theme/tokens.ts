/**
 * Cursor-inspired design tokens.
 *
 * Warm editorial light mode (parchment + espresso ink) and IDE dark mode
 * (charcoal + cream text). Single accent voltage: Cursor Orange (#f54e00).
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/** Cursor CTAs top out at 8px — keep radii tight and confident. */
export const radius = {
  sm: 4,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 16,
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
  display: 36,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const letterSpacing = {
  tight: -0.8,
  normal: 0,
  wide: 0.4,
  caps: 1,
} as const;

/** Cursor brand + semantic colours. */
export const cursor = {
  orange: '#f54e00',
  orangeDark: '#d94400',
  orangeSoftLight: 'rgba(245, 78, 0, 0.08)',
  orangeSoftDark: 'rgba(245, 78, 0, 0.16)',
  orangeMutedLight: 'rgba(245, 78, 0, 0.22)',
  orangeMutedDark: 'rgba(245, 78, 0, 0.38)',
  ink: '#26251e',
  parchment: '#f7f7f4',
  stone: '#e6e5e0',
  sand: '#d9d5cf',
  clay: '#7a7974',
  smoke: '#a1a19f',
  charcoal: '#141414',
  panel: '#1e1e1e',
  cream: '#ebeae5',
  danger: '#cf2d56',
  dangerSoftLight: 'rgba(207, 45, 86, 0.1)',
  dangerSoftDark: 'rgba(207, 45, 86, 0.18)',
  success: '#34785c',
  successBright: '#4ade80',
  successSoftLight: 'rgba(52, 120, 92, 0.1)',
  successSoftDark: 'rgba(74, 222, 128, 0.12)',
  warning: '#c08532',
  warningSoftLight: 'rgba(192, 133, 50, 0.12)',
  warningSoftDark: 'rgba(192, 133, 50, 0.16)',
  info: '#5b7fa5',
  infoSoftLight: 'rgba(91, 127, 165, 0.12)',
  infoSoftDark: 'rgba(91, 127, 165, 0.18)',
} as const;

export type ThemeColors = {
  brand: string;
  brandStrong: string;
  brandSoft: string;
  brandMuted: string;
  accent: string;
  accentSoft: string;
  ink: string;
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceAlt: string;
  surfaceElevated: string;
  border: string;
  borderStrong: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textOnBrand: string;
  textOnInk: string;
  overlay: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  danger: string;
  dangerSoft: string;
  info: string;
  infoSoft: string;
  neutral: string;
  neutralSoft: string;
  gradientStart: string;
  gradientMid: string;
  gradientEnd: string;
};

/** Light — airy white surfaces, warm ink text, minimal gray. */
export const lightColors: ThemeColors = {
  brand: cursor.orange,
  brandStrong: cursor.orangeDark,
  brandSoft: 'rgba(245, 78, 0, 0.06)',
  brandMuted: 'rgba(245, 78, 0, 0.18)',
  accent: cursor.orange,
  accentSoft: 'rgba(245, 78, 0, 0.06)',
  ink: cursor.ink,
  background: '#fcfcfb',
  backgroundAlt: '#ffffff',
  surface: '#ffffff',
  surfaceAlt: '#ffffff',
  surfaceElevated: '#ffffff',
  border: 'rgba(38, 37, 30, 0.07)',
  borderStrong: 'rgba(38, 37, 30, 0.14)',
  text: cursor.ink,
  textSecondary: '#5c5b55',
  textMuted: '#9c9b96',
  textOnBrand: '#ffffff',
  textOnInk: cursor.parchment,
  overlay: 'rgba(38, 37, 30, 0.35)',
  success: cursor.success,
  successSoft: 'rgba(52, 120, 92, 0.08)',
  warning: cursor.warning,
  warningSoft: 'rgba(192, 133, 50, 0.08)',
  danger: cursor.danger,
  dangerSoft: cursor.dangerSoftLight,
  info: cursor.info,
  infoSoft: 'rgba(91, 127, 165, 0.08)',
  neutral: '#8a8984',
  neutralSoft: 'rgba(38, 37, 30, 0.04)',
  gradientStart: '#fcfcfb',
  gradientMid: '#fcfcfb',
  gradientEnd: '#fcfcfb',
};

/** Dark — warm IDE charcoal (Cursor editor). */
export const darkColors: ThemeColors = {
  brand: cursor.orange,
  brandStrong: '#ff6a1a',
  brandSoft: cursor.orangeSoftDark,
  brandMuted: cursor.orangeMutedDark,
  accent: cursor.orange,
  accentSoft: cursor.orangeSoftDark,
  ink: cursor.cream,
  background: cursor.charcoal,
  backgroundAlt: '#181818',
  surface: cursor.panel,
  surfaceAlt: '#262626',
  surfaceElevated: '#2a2a2a',
  border: 'rgba(235, 234, 229, 0.08)',
  borderStrong: 'rgba(235, 234, 229, 0.16)',
  text: cursor.cream,
  textSecondary: '#8f8e89',
  textMuted: '#6b6a65',
  textOnBrand: '#ffffff',
  textOnInk: cursor.cream,
  overlay: 'rgba(0, 0, 0, 0.65)',
  success: cursor.successBright,
  successSoft: cursor.successSoftDark,
  warning: '#e5a845',
  warningSoft: cursor.warningSoftDark,
  danger: '#f07198',
  dangerSoft: cursor.dangerSoftDark,
  info: '#8cb4d9',
  infoSoft: cursor.infoSoftDark,
  neutral: '#8f8e89',
  neutralSoft: '#262626',
  gradientStart: cursor.charcoal,
  gradientMid: cursor.charcoal,
  gradientEnd: cursor.charcoal,
};

export type Theme = {
  scheme: 'light' | 'dark';
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  letterSpacing: typeof letterSpacing;
};
