import { Platform, type ViewStyle } from 'react-native';

export type ShadowLevel = 'none' | 'sm' | 'md';

/** Cursor uses flat surfaces — shadows are barely there, warm when visible. */
export function shadow(level: ShadowLevel, scheme: 'light' | 'dark'): ViewStyle {
  if (level === 'none') return {};

  const isDark = scheme === 'dark';
  if (isDark) return {};

  return Platform.select({
    ios: {
      shadowColor: '#26251e',
      shadowOffset: { width: 0, height: level === 'sm' ? 1 : 3 },
      shadowOpacity: level === 'sm' ? 0.04 : 0.07,
      shadowRadius: level === 'sm' ? 4 : 10,
    },
    android: { elevation: level === 'sm' ? 1 : 2 },
    default: {},
  })!;
}
