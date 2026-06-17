import { View } from 'react-native';

import { Card, Row, Text } from '@/components/ui';
import { useTheme } from '@/theme';
import type { Metric } from '@/types';

const TREND_ICON: Record<NonNullable<Metric['trend']>, string> = {
  up: '↑',
  down: '↓',
  flat: '→',
};

export function MetricCard({ metric }: { metric: Metric }) {
  const theme = useTheme();
  const tone = metric.tone ?? 'neutral';

  return (
    <Card style={{ flex: 1, minWidth: 150 }}>
      <Text variant="footnote" color="textSecondary">
        {metric.label}
      </Text>
      <View style={{ height: theme.spacing.sm }} />
      <Text variant="title2">{metric.value}</Text>
      {metric.delta ? (
        <Row style={{ marginTop: theme.spacing.xs }}>
          <Text variant="footnote" weight="semibold" style={{ color: theme.colors[tone] }}>
            {metric.trend ? `${TREND_ICON[metric.trend]} ` : ''}
            {metric.delta}
          </Text>
        </Row>
      ) : null}
    </Card>
  );
}
