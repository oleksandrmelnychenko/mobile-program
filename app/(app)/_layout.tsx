import { Tabs } from 'expo-router';
import { Text as RNText } from 'react-native';

import { useRole } from '@/auth';
import { canAny } from '@/rbac';
import { TABS } from '@/navigation/tabs';
import { useTheme } from '@/theme';

export default function AppLayout() {
  const theme = useTheme();
  const role = useRole();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.brand,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      {TABS.map((tab) => {
        const visible = tab.anyOf.length === 0 || canAny(role, tab.anyOf);
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              // Hide tabs the current role cannot access.
              href: visible ? undefined : null,
              tabBarIcon: ({ color }) => (
                <RNText style={{ color, fontSize: 18 }}>{tab.icon}</RNText>
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
