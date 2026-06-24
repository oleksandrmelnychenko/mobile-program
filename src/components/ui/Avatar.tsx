import { View } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from './Text';

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const theme = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: theme.colors.brandSoft,
        borderWidth: 1,
        borderColor: theme.colors.brandMuted,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text weight="medium" color="brand" style={{ fontSize: size * 0.36 }}>
        {initials(name)}
      </Text>
    </View>
  );
}
