import { View } from 'react-native';

import { Badge, Button, Card, Row, SpaceBetween, Text } from '@/components/ui';
import { useTheme } from '@/theme';
import type { Approval, ApprovalKind } from '@/types';
import { formatMoney, timeAgo } from '@/lib/format';

const KIND_LABEL: Record<ApprovalKind, string> = {
  payout: 'Payout',
  contract: 'Contract',
  invoice: 'Invoice',
  timesheet: 'Timesheet',
};

export function ApprovalCard({
  approval,
  onDecide,
  busy,
  canAct,
}: {
  approval: Approval;
  onDecide?: (decision: 'approve' | 'reject') => void;
  busy?: boolean;
  canAct: boolean;
}) {
  const theme = useTheme();

  return (
    <Card>
      <SpaceBetween>
        <Badge label={KIND_LABEL[approval.kind]} tone="info" />
        {approval.amount ? (
          <Text variant="callout" weight="bold">
            {formatMoney(approval.amount)}
          </Text>
        ) : null}
      </SpaceBetween>

      <View style={{ height: theme.spacing.md }} />
      <Text variant="callout" weight="semibold">
        {approval.title}
      </Text>
      <Text variant="footnote" color="textSecondary">
        {approval.subtitle}
      </Text>
      <Text variant="caption" color="textMuted" style={{ marginTop: 4 }}>
        {approval.requestedBy} · {timeAgo(approval.requestedAt)}
      </Text>

      {canAct ? (
        <Row style={{ marginTop: theme.spacing.lg, gap: theme.spacing.md }}>
          <Button
            label="Reject"
            variant="secondary"
            onPress={() => onDecide?.('reject')}
            disabled={busy}
            style={{ flex: 1 }}
          />
          <Button
            label="Approve"
            onPress={() => onDecide?.('approve')}
            loading={busy}
            style={{ flex: 1 }}
          />
        </Row>
      ) : null}
    </Card>
  );
}
