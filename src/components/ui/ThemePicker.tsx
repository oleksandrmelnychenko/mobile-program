import { Pressable, View } from 'react-native';

import { useSetThemePreference, useTheme, useThemePreference, type ThemePreference } from '@/theme';
import { Text } from './Text';

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function ThemePicker() {
  const theme = useTheme();
  const preference = useThemePreference();
  const setPreference = useSetThemePreference();
  const isLight = theme.scheme === 'light';

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: theme.spacing.xs,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.xs,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      {OPTIONS.map((opt) => {
        const selected = preference === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => setPreference(opt.value)}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: theme.radius.sm,
              paddingVertical: theme.spacing.sm,
              backgroundColor: selected
                ? isLight
                  ? theme.colors.brandSoft
                  : theme.colors.surfaceElevated
                : pressed
                  ? theme.colors.brandSoft
                  : 'transparent',
            })}
          >
            <Text
              variant="footnote"
              weight={selected ? 'medium' : 'regular'}
              color={selected ? 'brand' : 'textSecondary'}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
