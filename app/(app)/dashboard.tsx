import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { api } from '@/api';
import { useAuthStore, useUser } from '@/auth';
import { MetricCard } from '@/components/MetricCard';
import { NotificationItem } from '@/components/NotificationItem';
import { SectionHeader } from '@/components/SectionHeader';
import {
  Badge,
  Button,
  Card,
  Divider,
  Screen,
  Spacer,
  SpaceBetween,
  Text,
} from '@/components/ui';
import { usePermission } from '@/auth';
import { useTheme } from '@/theme';
import { ROLE_LABELS } from '@/types';

export default function DashboardScreen() {
  const theme = useTheme();
  const user = useUser();
  const logout = useAuthStore((s) => s.logout);
  const canApprove = usePermission('approvals.act');

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['dashboard', user?.role],
    queryFn: () => api.getDashboard(user!.role),
    enabled: !!user,
  });

  if (!user) return null;

  return (
    <Screen refreshing={isRefetching} onRefresh={refetch}>
      <SpaceBetween>
        <View>
          <Text color="textSecondary">Welcome back</Text>
          <Text variant="title2">{ROLE_LABELS[user.role]}</Text>
        </View>
        <Badge label={user.role.toUpperCase()} tone="info" />
      </SpaceBetween>

      {isLoading || !data ? (
        <View style={{ paddingVertical: theme.spacing.xxl, alignItems: 'center' }}>
          <ActivityIndicator color={theme.colors.brand} />
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
            {data.metrics.map((m) => (
              <MetricCard key={m.key} metric={m} />
            ))}
          </View>

          {canApprove && data.pendingApprovals > 0 ? (
            <Card variant="brand">
              <SpaceBetween>
                <View style={{ flex: 1 }}>
                  <Text variant="callout" weight="semibold">
                    {data.pendingApprovals} pending approvals
                  </Text>
                  <Text variant="footnote" color="textSecondary">
                    Payouts, contracts and invoices awaiting your decision
                  </Text>
                </View>
              </SpaceBetween>
              <Spacer size={theme.spacing.md} />
              <Button
                label="Review approvals"
                onPress={() => router.push('/(app)/approvals')}
              />
            </Card>
          ) : null}

          <View>
            <SectionHeader title="Notifications" />
            <Spacer size={theme.spacing.md} />
            <Card variant="elevated">
              {data.notifications.map((n, idx) => (
                <View key={n.id}>
                  {idx > 0 ? (
                    <View style={{ paddingVertical: theme.spacing.md }}>
                      <Divider />
                    </View>
                  ) : null}
                  <NotificationItem item={n} />
                </View>
              ))}
              {data.notifications.length === 0 ? (
                <Text color="textSecondary">You're all caught up.</Text>
              ) : null}
            </Card>
          </View>

          <Button label="Sign out" variant="ghost" onPress={logout} />
        </>
      )}
    </Screen>
  );
}
