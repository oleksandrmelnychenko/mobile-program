import { Tabs } from 'expo-router';
import { Platform, Text as RNText } from 'react-native';

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
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 60,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          letterSpacing: 0.3,
        },
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
              href: visible ? undefined : null,
              tabBarIcon: ({ color, focused }) => (
                <RNText
                  style={{
                    color,
                    fontSize: focused ? 17 : 16,
                    opacity: focused ? 1 : 0.7,
                  }}
                >
                  {tab.icon}
                </RNText>
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
