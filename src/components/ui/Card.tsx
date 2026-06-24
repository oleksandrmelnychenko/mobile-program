import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { shadow, useTheme } from '@/theme';

export type CardVariant = 'elevated' | 'outlined' | 'inset' | 'brand';

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  variant?: CardVariant;
};

export function Card({
  children,
  onPress,
  style,
  padded = true,
  variant = 'outlined',
}: CardProps) {
  const theme = useTheme();
  const isLight = theme.scheme === 'light';

  const variantStyle: Record<CardVariant, ViewStyle> = {
    elevated: {
      backgroundColor: theme.colors.surface,
      borderWidth: isLight ? 1 : StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
      ...(isLight ? {} : shadow('sm', theme.scheme)),
    },
    outlined: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    inset: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    brand: {
      backgroundColor: theme.colors.brandSoft,
      borderWidth: 1,
      borderColor: theme.colors.brandMuted,
    },
  };

  const cardStyle: StyleProp<ViewStyle> = [
    {
      borderRadius: theme.radius.md,
      padding: padded ? theme.spacing.lg : 0,
      overflow: 'hidden',
    },
    variantStyle[variant],
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [cardStyle, pressed && { opacity: 0.85 }]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}
