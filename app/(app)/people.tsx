import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { api } from '@/api';
import { ListRow } from '@/components/ListRow';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState, Screen, Spacer, Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { EMPLOYEE_STATUS_TONE } from '@/types';

export default function PeopleScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['employees', query],
    queryFn: () => api.listEmployees(query),
  });

  return (
    <Screen>
      <Text variant="title2">People</Text>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search employees…" />

      {isLoading ? (
        <ActivityIndicator color={theme.colors.brand} style={{ marginTop: theme.spacing.xl }} />
      ) : !data || data.length === 0 ? (
        <EmptyState icon="◍" title="No employees found" />
      ) : (
        <View style={{ gap: theme.spacing.md }}>
          {data.map((e) => (
            <ListRow
              key={e.id}
              avatarName={e.name}
              title={e.name}
              subtitle={`${e.title} · ${e.department}`}
              badge={e.status}
              badgeTone={EMPLOYEE_STATUS_TONE[e.status]}
            />
          ))}
        </View>
      )}
      <Spacer size={theme.spacing.md} />
    </Screen>
  );
}
