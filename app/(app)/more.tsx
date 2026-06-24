import { Alert, View } from 'react-native';

import { useAuthStore, useRole, useUser } from '@/auth';
import { ListRow } from '@/components/ListRow';
import { SectionHeader } from '@/components/SectionHeader';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Row,
  Screen,
  Spacer,
  Text,
  ThemePicker,
} from '@/components/ui';
import { ROLE_PERMISSIONS } from '@/rbac';
import { useTheme } from '@/theme';
import { ROLE_LABELS } from '@/types';

/** Sections from the web project not yet in the MVP — surfaced as "coming soon". */
const UPCOMING = [
  { title: 'CV Library', icon: '◰' },
  { title: 'Contracts', icon: '▤' },
  { title: 'Interview calendar', icon: '◷' },
  { title: 'Payroll & timesheets', icon: '⊞' },
  { title: 'Documents', icon: '❏' },
  { title: 'Learning health', icon: '✦' },
];

export default function MoreScreen() {
  const theme = useTheme();
  const user = useUser();
  const role = useRole();
  const logout = useAuthStore((s) => s.logout);

  if (!user || !role) return null;

  const permissions = ROLE_PERMISSIONS[role];

  return (
    <Screen>
      <Text variant="title2">More</Text>

      <Card>
        <Row style={{ gap: theme.spacing.lg }}>
          <Avatar name={user.name} size={52} />
          <View style={{ flex: 1 }}>
            <Text variant="callout" weight="semibold">
              {user.name}
            </Text>
            <Text variant="footnote" color="textSecondary">
              {user.email}
            </Text>
          </View>
          <Badge label={role.toUpperCase()} tone="info" />
        </Row>
      </Card>

      <View>
        <SectionHeader title="Appearance" />
        <Spacer size={theme.spacing.md} />
        <Card variant="outlined">
          <Text variant="footnote" color="textSecondary" style={{ marginBottom: theme.spacing.md }}>
            Choose light, dark, or follow your device setting.
          </Text>
          <ThemePicker />
        </Card>
      </View>

      <View>
        <SectionHeader title="Coming soon" />
        <Spacer size={theme.spacing.md} />
        <View style={{ gap: theme.spacing.md }}>
          {UPCOMING.map((s) => (
            <ListRow
              key={s.title}
              title={`${s.icon}  ${s.title}`}
              badge="soon"
              badgeTone="neutral"
              onPress={() =>
                Alert.alert(s.title, 'Planned for a later release of the admin app.')
              }
            />
          ))}
        </View>
      </View>

      <View>
        <SectionHeader title={`Access (${ROLE_LABELS[role]})`} />
        <Spacer size={theme.spacing.md} />
        <Card>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            {permissions.map((p) => (
              <Badge key={p} label={p} tone="neutral" />
            ))}
          </View>
        </Card>
      </View>

          <Button label="Sign out" variant="ghost" onPress={logout} />
      <Text variant="caption" color="textMuted" center>
        Horizon Console · MVP build
      </Text>
    </Screen>
  );
}
