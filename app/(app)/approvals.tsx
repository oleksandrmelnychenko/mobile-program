import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';

import { api, type ApprovalDecision } from '@/api';
import { usePermission } from '@/auth';
import { ApprovalCard } from '@/components/ApprovalCard';
import { EmptyState, Screen, Spacer, Text } from '@/components/ui';
import { useTheme } from '@/theme';

export default function ApprovalsScreen() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const canAct = usePermission('approvals.act');

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['approvals'],
    queryFn: () => api.listApprovals(),
  });

  const mutation = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: ApprovalDecision }) =>
      api.decideApproval(id, decision),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return (
    <Screen refreshing={isRefetching} onRefresh={refetch}>
      <Text variant="title2">Approvals</Text>
      <Text color="textSecondary">Confirm or reject critical operations</Text>

      {isLoading ? (
        <View style={{ paddingVertical: theme.spacing.xxl, alignItems: 'center' }}>
          <ActivityIndicator color={theme.colors.brand} />
        </View>
      ) : !data || data.length === 0 ? (
        <EmptyState
          icon="✓"
          title="Nothing to approve"
          subtitle="New payouts, contracts and invoices will show up here."
        />
      ) : (
        <View style={{ gap: theme.spacing.lg }}>
          {data.map((approval) => (
            <ApprovalCard
              key={approval.id}
              approval={approval}
              canAct={canAct}
              busy={mutation.isPending && mutation.variables?.id === approval.id}
              onDecide={(decision) => mutation.mutate({ id: approval.id, decision })}
            />
          ))}
        </View>
      )}
      <Spacer size={theme.spacing.md} />
    </Screen>
  );
}
