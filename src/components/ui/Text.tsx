import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useTheme } from '@/theme';
import type { ThemeColors } from '@/theme';

type Variant =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'callout'
  | 'body'
  | 'footnote'
  | 'caption';

type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

export type TextProps = RNTextProps & {
  variant?: Variant;
  weight?: Weight;
  color?: keyof ThemeColors;
  center?: boolean;
};

export function Text({
  variant = 'body',
  weight,
  color = 'text',
  center,
  style,
  ...rest
}: TextProps) {
  const theme = useTheme();
  const defaultWeight: Weight =
    variant === 'title1' || variant === 'title2'
      ? 'bold'
      : variant === 'title3' || variant === 'callout'
        ? 'semibold'
        : 'regular';

  return (
    <RNText
      style={[
        {
          fontSize: theme.fontSize[variant],
          fontWeight: theme.fontWeight[weight ?? defaultWeight],
          color: theme.colors[color],
          textAlign: center ? 'center' : undefined,
        },
        style,
      ]}
      {...rest}
    />
  );
}
