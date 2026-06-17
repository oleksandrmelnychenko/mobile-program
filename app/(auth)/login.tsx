import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { useAuthStore } from '@/auth';
import { Button, Card, Screen, Spacer, Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { ROLE_LABELS, type Role } from '@/types';

const ROLES: Role[] = ['admin', 'sales', 'hr'];

export default function LoginScreen() {
  const theme = useTheme();
  const login = useAuthStore((s) => s.login);
  const signingIn = useAuthStore((s) => s.signingIn);
  const error = useAuthStore((s) => s.error);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('admin');

  return (
    <Screen contentStyle={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: theme.spacing.xxl }}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: theme.radius.lg,
            backgroundColor: theme.colors.brand,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text variant="title1" style={{ color: theme.colors.textOnBrand }}>
            H
          </Text>
        </View>
        <Spacer size={theme.spacing.lg} />
        <Text variant="title1">Horizon Console</Text>
        <Text color="textSecondary">Admin cockpit</Text>
      </View>

      <Card>
        <Text variant="footnote" weight="semibold" color="textSecondary">
          EMAIL
        </Text>
        <Spacer size={theme.spacing.sm} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@horizon.io"
          placeholderTextColor={theme.colors.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: theme.colors.surfaceAlt,
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing.lg,
            height: 48,
            color: theme.colors.text,
            fontSize: theme.fontSize.body,
          }}
        />

        <Spacer size={theme.spacing.lg} />
        <Text variant="footnote" weight="semibold" color="textSecondary">
          ROLE (MVP STUB)
        </Text>
        <Spacer size={theme.spacing.sm} />
        <View style={{ gap: theme.spacing.sm }}>
          {ROLES.map((r) => {
            const selected = role === r;
            return (
              <Pressable
                key={r}
                onPress={() => setRole(r)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: theme.radius.md,
                  borderWidth: 1,
                  borderColor: selected ? theme.colors.brand : theme.colors.border,
                  backgroundColor: selected ? `${theme.colors.brand}14` : 'transparent',
                  paddingHorizontal: theme.spacing.lg,
                  paddingVertical: theme.spacing.md,
                }}
              >
                <Text weight={selected ? 'semibold' : 'regular'}>{ROLE_LABELS[r]}</Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: selected ? theme.colors.brand : theme.colors.border,
                    backgroundColor: selected ? theme.colors.brand : 'transparent',
                  }}
                />
              </Pressable>
            );
          })}
        </View>

        {error ? (
          <Text color="danger" variant="footnote" style={{ marginTop: theme.spacing.md }}>
            {error}
          </Text>
        ) : null}

        <Spacer size={theme.spacing.xl} />
        <Button
          label="Sign in"
          loading={signingIn}
          onPress={() => login({ email, role })}
        />
      </Card>

      <Text variant="caption" color="textMuted" center style={{ marginTop: theme.spacing.lg }}>
        Stub auth — real SSO/JWT wires into the same store later.
      </Text>
    </Screen>
  );
}
