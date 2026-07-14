import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from "react-native";
import { colors, radius } from "@/src/theme";

export function AppButton({
  children,
  variant = "primary",
  icon,
  style,
  ...props
}: PressableProps & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        typeof style === "function" ? style({ pressed }) : style,
      ]}
    >
      <View style={styles.row}>
        {icon}
        <Text
          style={[
            styles.label,
            variant === "primary" && styles.primaryLabel,
            variant === "danger" && styles.dangerLabel,
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  primary: { backgroundColor: colors.mint },
  secondary: {
    backgroundColor: "rgba(255,255,255,0.055)",
    borderColor: colors.border,
  },
  ghost: { backgroundColor: "transparent" },
  danger: {
    backgroundColor: "rgba(236,141,123,0.1)",
    borderColor: "rgba(236,141,123,0.3)",
  },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  label: { color: colors.cream, fontWeight: "700", fontSize: 14 },
  primaryLabel: { color: colors.ink },
  dangerLabel: { color: colors.coral },
});
