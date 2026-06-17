import { StyleSheet, View, type ViewProps } from 'react-native';

import { useTheme } from '@/theme';

/** Horizontal flex row with vertical centering. */
export function Row({ style, ...rest }: ViewProps) {
  return <View style={[styles.row, style]} {...rest} />;
}

/** Row that pushes children to opposite ends. */
export function SpaceBetween({ style, ...rest }: ViewProps) {
  return <View style={[styles.between, style]} {...rest} />;
}

/** Fixed-size gap. */
export function Spacer({ size = 8 }: { size?: number }) {
  return <View style={{ height: size, width: size }} />;
}

/** 1px hairline separator. */
export function Divider() {
  const theme = useTheme();
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: theme.colors.border,
      }}
    />
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
