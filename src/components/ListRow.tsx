import { View } from 'react-native';

import { Avatar, Badge, Card, SpaceBetween, Text, type BadgeTone } from '@/components/ui';
import { useTheme } from '@/theme';

/** Generic list row used for employees / clients / invoices in lists & search. */
export function ListRow({
  title,
  subtitle,
  badge,
  badgeTone = 'neutral',
  trailing,
  avatarName,
  onPress,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeTone?: BadgeTone;
  trailing?: string;
  avatarName?: string;
  onPress?: () => void;
}) {
  const theme = useTheme();

  return (
    <Card onPress={onPress} style={{ paddingVertical: theme.spacing.md }}>
      <SpaceBetween>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, flex: 1 }}>
          {avatarName ? <Avatar name={avatarName} size={40} /> : null}
          <View style={{ flex: 1 }}>
            <Text weight="semibold" numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? (
              <Text variant="footnote" color="textSecondary" numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          {trailing ? (
            <Text weight="semibold" numberOfLines={1}>
              {trailing}
            </Text>
          ) : null}
          {badge ? <Badge label={badge} tone={badgeTone} /> : null}
        </View>
      </SpaceBetween>
    </Card>
  );
}
