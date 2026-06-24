import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from './Text';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

const SOFT_KEY = {
  success: 'successSoft',
  warning: 'warningSoft',
  danger: 'dangerSoft',
  info: 'infoSoft',
  neutral: 'neutralSoft',
} as const satisfies Record<BadgeTone, keyof import('@/theme').ThemeColors>;

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const theme = useTheme();
  const color = theme.colors[tone];
  const bg = theme.colors[SOFT_KEY[tone]];

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: bg,
        borderRadius: theme.radius.pill,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.sm + 2,
        paddingVertical: theme.spacing.xs,
      }}
    >
      <Text
        variant="caption"
        weight="medium"
        style={{ color, letterSpacing: theme.letterSpacing.wide }}
      >
        {label}
      </Text>
    </View>
  );
}
