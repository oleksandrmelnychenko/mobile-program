import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { api } from '@/api';
import { ListRow } from '@/components/ListRow';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState, Screen, Spacer, Text } from '@/components/ui';
import { formatMoney } from '@/lib/format';
import { useTheme } from '@/theme';
import { CLIENT_STATUS_TONE } from '@/types';

export default function SalesScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['clients', query],
    queryFn: () => api.listClients(query),
  });

  return (
    <Screen>
      <Text variant="title2">Sales</Text>
      <Text color="textSecondary">Clients & pipeline</Text>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search clients…" />

      {isLoading ? (
        <ActivityIndicator color={theme.colors.brand} style={{ marginTop: theme.spacing.xl }} />
      ) : !data || data.length === 0 ? (
        <EmptyState icon="↗" title="No clients found" />
      ) : (
        <View style={{ gap: theme.spacing.md }}>
          {data.map((c) => (
            <ListRow
              key={c.id}
              title={c.name}
              subtitle={`Owner: ${c.owner}`}
              trailing={c.mrr.amount > 0 ? `${formatMoney(c.mrr)}/mo` : undefined}
              badge={c.status}
              badgeTone={CLIENT_STATUS_TONE[c.status]}
            />
          ))}
        </View>
      )}
      <Spacer size={theme.spacing.md} />
    </Screen>
  );
}
