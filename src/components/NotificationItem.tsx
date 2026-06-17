import { View } from 'react-native';

import { Row, Text } from '@/components/ui';
import { useTheme } from '@/theme';
import type { AppNotification, NotificationSeverity } from '@/types';
import { timeAgo } from '@/lib/format';

const SEVERITY_COLOR: Record<NotificationSeverity, keyof ReturnType<typeof useTheme>['colors']> = {
  critical: 'danger',
  warning: 'warning',
  info: 'info',
};

export function NotificationItem({ item }: { item: AppNotification }) {
  const theme = useTheme();
  const color = theme.colors[SEVERITY_COLOR[item.severity]];

  return (
    <Row style={{ alignItems: 'flex-start', gap: theme.spacing.md }}>
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginTop: 6,
          backgroundColor: item.read ? theme.colors.border : color,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text weight="semibold">{item.title}</Text>
        <Text variant="footnote" color="textSecondary">
          {item.body}
        </Text>
        <Text variant="caption" color="textMuted" style={{ marginTop: 2 }}>
          {timeAgo(item.createdAt)}
        </Text>
      </View>
    </Row>
  );
}
