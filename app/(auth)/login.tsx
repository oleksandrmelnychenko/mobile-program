import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { useAuthStore } from '@/auth';
import { Box, Button, Card, Input, Screen, Spacer, Text } from '@/components/ui';
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
  const isDark = theme.scheme === 'dark';

  return (
    <Screen contentStyle={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: theme.spacing.xxl }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: theme.radius.md,
            backgroundColor: isDark ? theme.colors.surfaceAlt : theme.colors.ink,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text
            variant="title3"
            weight="medium"
            style={{ color: isDark ? theme.colors.brand : theme.colors.textOnInk }}
          >
            H
          </Text>
        </View>

        <Spacer size={theme.spacing.lg} />
        <Text variant="display" center>
          Horizon Console
        </Text>
        <Spacer size={theme.spacing.sm} />
        <Text color="textSecondary" center>
          Admin cockpit
        </Text>
      </View>

      <Card variant="outlined">
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@horizon.io"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Spacer size={theme.spacing.lg} />
        <Text
          variant="footnote"
          weight="medium"
          color="textSecondary"
          style={{ letterSpacing: theme.letterSpacing.caps, textTransform: 'uppercase' }}
        >
          Role
        </Text>
        <Spacer size={theme.spacing.sm} />
        <View style={{ gap: theme.spacing.sm }}>
          {ROLES.map((r) => {
            const selected = role === r;
            return (
              <Pressable
                key={r}
                onPress={() => setRole(r)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: theme.radius.md,
                  borderWidth: 1,
                  borderColor: selected ? theme.colors.brand : theme.colors.border,
                  backgroundColor: selected
                    ? theme.colors.brandSoft
                    : pressed
                      ? theme.colors.brandSoft
                      : theme.colors.surface,
                  paddingHorizontal: theme.spacing.md,
                  paddingVertical: theme.spacing.md,
                })}
              >
                <Text weight={selected ? 'medium' : 'regular'} color={selected ? 'brand' : 'text'}>
                  {ROLE_LABELS[r]}
                </Text>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 1.5,
                    borderColor: selected ? theme.colors.brand : theme.colors.borderStrong,
                    backgroundColor: selected ? theme.colors.brand : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selected ? (
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: theme.colors.textOnBrand,
                      }}
                    />
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        {error ? (
          <Box variant="brand" padding={theme.spacing.md} style={{ marginTop: theme.spacing.md }}>
            <Text color="danger" variant="footnote">
              {error}
            </Text>
          </Box>
        ) : null}

        <Spacer size={theme.spacing.xl} />
        <Button label="Sign in" size="lg" loading={signingIn} onPress={() => login({ email, role })} />
      </Card>

      <Text variant="caption" color="textMuted" center style={{ marginTop: theme.spacing.lg }}>
        Stub auth — real SSO/JWT wires into the same store later.
      </Text>
    </Screen>
  );
}
