import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";
import { AppText } from "./AppText";
import { colors, radius } from "@/src/theme";

export function Field({
  label,
  multiline,
  style,
  ...props
}: TextInputProps & { label: string }) {
  return (
    <View style={styles.wrap}>
      <AppText variant="small" style={styles.label}>
        {label}
      </AppText>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.faint}
        multiline={multiline}
        {...props}
        style={[styles.input, multiline && styles.multiline, style]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { gap: 7 },
  label: { color: colors.cream, fontWeight: "700" },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.035)",
    color: colors.cream,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
  },
  multiline: { minHeight: 100, textAlignVertical: "top" },
});
