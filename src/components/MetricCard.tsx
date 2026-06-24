import { View } from 'react-native';

import { Card, Text } from '@/components/ui';
import { useTheme } from '@/theme';
import type { Metric } from '@/types';

const TREND_ICON: Record<NonNullable<Metric['trend']>, string> = {
  up: '↑',
  down: '↓',
  flat: '→',
};

const ACCENT: Record<NonNullable<Metric['tone']>, keyof import('@/theme').ThemeColors> = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  neutral: 'textSecondary',
};

export function MetricCard({ metric }: { metric: Metric }) {
  const theme = useTheme();
  const tone = metric.tone ?? 'neutral';
  const accent = theme.colors[ACCENT[tone]];

  return (
    <Card style={{ flex: 1, minWidth: 148, padding: theme.spacing.md }}>
      <Text
        variant="caption"
        color="textSecondary"
        weight="medium"
        style={{ letterSpacing: theme.letterSpacing.caps, textTransform: 'uppercase' }}
      >
        {metric.label}
      </Text>
      <View style={{ height: theme.spacing.sm }} />
      <Text variant="title2">{metric.value}</Text>
      {metric.delta ? (
        <Text variant="footnote" weight="medium" style={{ color: accent, marginTop: theme.spacing.xs }}>
          {metric.trend ? `${TREND_ICON[metric.trend]} ` : ''}
          {metric.delta}
        </Text>
      ) : null}
    </Card>
  );
}
