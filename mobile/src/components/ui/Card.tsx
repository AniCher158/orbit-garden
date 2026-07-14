import type { ReactNode } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import { colors, radius, shadows } from "@/src/theme";

export function Card({
  children,
  style,
  ...props
}: ViewProps & { children: ReactNode }) {
  return (
    <View {...props} style={[styles.card, style]}>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 18,
    ...shadows.card,
  },
});
