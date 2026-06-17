import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { api } from '@/api';
import { ListRow } from '@/components/ListRow';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState, Screen, Spacer, Text } from '@/components/ui';
import { formatDate, formatMoney } from '@/lib/format';
import { useTheme } from '@/theme';
import { INVOICE_STATUS_TONE } from '@/types';

export default function FinanceScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['invoices', query],
    queryFn: () => api.listInvoices(query),
  });

  return (
    <Screen>
      <Text variant="title2">Finance</Text>
      <Text color="textSecondary">Invoices</Text>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search invoices…" />

      {isLoading ? (
        <ActivityIndicator color={theme.colors.brand} style={{ marginTop: theme.spacing.xl }} />
      ) : !data || data.length === 0 ? (
        <EmptyState icon="$" title="No invoices found" />
      ) : (
        <View style={{ gap: theme.spacing.md }}>
          {data.map((i) => (
            <ListRow
              key={i.id}
              title={i.number}
              subtitle={`${i.client} · due ${formatDate(i.dueDate)}`}
              trailing={formatMoney(i.amount)}
              badge={i.status}
              badgeTone={INVOICE_STATUS_TONE[i.status]}
            />
          ))}
        </View>
      )}
      <Spacer size={theme.spacing.md} />
    </Screen>
  );
}
