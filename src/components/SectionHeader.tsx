import { Pressable } from 'react-native';

import { SpaceBetween, Text } from '@/components/ui';

export function SectionHeader({
  title,
  action,
  onPressAction,
}: {
  title: string;
  action?: string;
  onPressAction?: () => void;
}) {
  return (
    <SpaceBetween>
      <Text variant="title3">{title}</Text>
      {action ? (
        <Pressable onPress={onPressAction} hitSlop={8}>
          <Text variant="footnote" weight="semibold" color="brand">
            {action}
          </Text>
        </Pressable>
      ) : null}
    </SpaceBetween>
  );
}
