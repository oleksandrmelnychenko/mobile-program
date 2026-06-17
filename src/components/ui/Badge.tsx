import { View } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from './Text';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

/** Blend a hex colour with the surface to get a soft tinted background. */
function tint(hex: string, alpha = '22') {
  return `${hex}${alpha}`;
}

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const theme = useTheme();
  const color = theme.colors[tone];

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: tint(color),
        borderRadius: theme.radius.pill,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
      }}
    >
      <Text variant="caption" weight="semibold" style={{ color }}>
        {label}
      </Text>
    </View>
  );
}
