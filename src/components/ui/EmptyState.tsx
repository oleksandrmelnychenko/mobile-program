import { View } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from './Text';

export function EmptyState({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
}) {
  const theme = useTheme();
  return (
    <View style={{ alignItems: 'center', paddingVertical: theme.spacing.xxl, gap: theme.spacing.sm }}>
      {icon ? <Text style={{ fontSize: 40 }}>{icon}</Text> : null}
      <Text variant="callout" weight="semibold" center>
        {title}
      </Text>
      {subtitle ? (
        <Text color="textSecondary" center>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
