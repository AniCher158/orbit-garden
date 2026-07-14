import { Pressable, StyleSheet, Text, type PressableProps } from "react-native";
import { colors, radius } from "@/src/theme";

export function Pill({
  label,
  selected,
  color = colors.mint,
  ...props
}: PressableProps & { label: string; selected?: boolean; color?: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      {...props}
      style={[
        styles.pill,
        selected && {
          backgroundColor: `${color}22`,
          borderColor: `${color}99`,
        },
      ]}
    >
      <Text style={[styles.text, selected && { color }]}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  pill: {
    minHeight: 40,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.025)",
  },
  text: { color: colors.muted, fontSize: 13, fontWeight: "600" },
});
