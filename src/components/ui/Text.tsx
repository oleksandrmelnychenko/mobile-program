import { Platform, Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useTheme } from '@/theme';
import type { ThemeColors } from '@/theme';

type Variant =
  | 'display'
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
  mono?: boolean;
};

export function Text({
  variant = 'body',
  weight,
  color = 'text',
  center,
  mono = false,
  style,
  ...rest
}: TextProps) {
  const theme = useTheme();

  const defaultWeight: Weight =
    variant === 'display' || variant === 'title1' || variant === 'title2'
      ? 'regular'
      : variant === 'title3' || variant === 'callout'
        ? 'medium'
        : 'regular';

  const tracking =
    variant === 'display'
      ? -1.2
      : variant === 'title1' || variant === 'title2'
        ? theme.letterSpacing.tight
        : variant === 'caption' || variant === 'footnote'
          ? theme.letterSpacing.wide
          : theme.letterSpacing.normal;

  return (
    <RNText
      style={[
        {
          fontSize: theme.fontSize[variant],
          fontWeight: theme.fontWeight[weight ?? defaultWeight],
          color: theme.colors[color],
          letterSpacing: tracking,
          textAlign: center ? 'center' : undefined,
          fontFamily: mono
            ? Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' })
            : undefined,
        },
        style,
      ]}
      {...rest}
    />
  );
}
