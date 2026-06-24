import {
  ActivityIndicator,
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/theme';
import { Text } from './Text';

type Variant = 'primary' | 'ink' | 'secondary' | 'outline' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const HEIGHT: Record<Size, number> = { sm: 36, md: 44, lg: 48 };

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  icon,
  style,
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const height = HEIGHT[size];
  const isLight = theme.scheme === 'light';

  const fg: Record<Variant, keyof typeof theme.colors> = {
    primary: 'textOnBrand',
    ink: 'textOnInk',
    secondary: 'text',
    outline: 'text',
    danger: 'textOnBrand',
    ghost: 'brand',
  };

  const bg: Record<Variant, string | undefined> = {
    primary: theme.colors.brand,
    ink: isLight ? theme.colors.ink : theme.colors.surfaceAlt,
    secondary: theme.colors.surface,
    outline: 'transparent',
    danger: theme.colors.danger,
    ghost: 'transparent',
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          borderRadius: theme.radius.md,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          paddingHorizontal: size === 'sm' ? theme.spacing.md : theme.spacing.lg,
          backgroundColor: bg[variant],
          opacity: isDisabled ? 0.45 : pressed ? 0.88 : 1,
        },
        variant === 'outline' && {
          borderWidth: 1,
          borderColor: theme.colors.borderStrong,
          backgroundColor: pressed ? theme.colors.brandSoft : theme.colors.surface,
        },
        variant === 'secondary' && {
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        variant === 'ghost' && pressed && { backgroundColor: theme.colors.brandSoft },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors[fg[variant]]} />
      ) : (
        <View style={styles.content}>
          {icon}
          <Text
            variant={size === 'sm' ? 'footnote' : 'body'}
            weight="medium"
            color={fg[variant]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = {
  base: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  content: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
};
