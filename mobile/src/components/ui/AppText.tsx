import { Text, type TextProps, StyleSheet } from "react-native";
import { colors } from "@/src/theme";

export function AppText({
  variant = "body",
  color,
  style,
  ...props
}: TextProps & { variant?: keyof typeof styles; color?: string }) {
  return (
    <Text
      {...props}
      style={[styles[variant], color ? { color } : undefined, style]}
    />
  );
}
const styles = StyleSheet.create({
  display: {
    color: colors.cream,
    fontSize: 36,
    lineHeight: 41,
    fontWeight: "800",
    letterSpacing: -1.2,
  },
  h1: {
    color: colors.cream,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: -0.6,
  },
  h2: { color: colors.cream, fontSize: 20, lineHeight: 26, fontWeight: "700" },
  h3: { color: colors.cream, fontSize: 16, lineHeight: 22, fontWeight: "700" },
  body: { color: colors.cream, fontSize: 15, lineHeight: 22 },
  muted: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  small: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  eyebrow: {
    color: colors.mint,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  tabular: {
    color: colors.cream,
    fontSize: 54,
    lineHeight: 64,
    fontWeight: "800",
    letterSpacing: -2,
    fontVariant: ["tabular-nums"],
  },
});
