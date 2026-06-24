import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

export type BoxVariant = 'surface' | 'inset' | 'bordered' | 'brand' | 'ghost';

type BoxProps = {
  children: ReactNode;
  variant?: BoxVariant;
  padding?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

/** Light surface container — white fill, hairline border. */
export function Box({
  children,
  variant = 'surface',
  padding,
  radius,
  style,
}: BoxProps) {
  const theme = useTheme();

  const variantStyle: Record<BoxVariant, ViewStyle> = {
    surface: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    inset: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    bordered: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
    },
    brand: {
      backgroundColor: theme.colors.brandSoft,
      borderWidth: 1,
      borderColor: theme.colors.brandMuted,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  };

  return (
    <View
      style={[
        {
          borderRadius: radius ?? theme.radius.md,
          padding: padding ?? theme.spacing.lg,
        },
        variantStyle[variant],
        style,
      ]}
    >
      {children}
    </View>
  );
}
