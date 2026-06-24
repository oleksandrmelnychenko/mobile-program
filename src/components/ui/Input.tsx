import { useState } from 'react';
import {
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/theme';
import { Text } from './Text';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Input({
  label,
  error,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={[{ gap: theme.spacing.sm }, containerStyle]}>
      {label ? (
        <Text
          variant="footnote"
          weight="medium"
          color="textSecondary"
          style={{ letterSpacing: theme.letterSpacing.caps, textTransform: 'uppercase' }}
        >
          {label}
        </Text>
      ) : null}

      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: error
              ? theme.colors.danger
              : focused
                ? theme.colors.brand
                : theme.colors.border,
            paddingHorizontal: theme.spacing.md,
            height: 44,
            color: theme.colors.text,
            fontSize: theme.fontSize.body,
            fontWeight: theme.fontWeight.regular,
          },
          style,
        ]}
        {...rest}
      />

      {error ? (
        <Text variant="caption" color="danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
