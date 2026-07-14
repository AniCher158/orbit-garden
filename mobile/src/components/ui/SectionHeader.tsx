import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import { colors } from "@/src/theme";

export function SectionHeader({
  title,
  subtitle,
  action,
  onAction,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <AppText variant="h2">{title}</AppText>
        {subtitle ? <AppText variant="small">{subtitle}</AppText> : null}
      </View>
      {action ? (
        <Pressable onPress={onAction} hitSlop={10}>
          <AppText variant="small" color={colors.mint} style={styles.action}>
            {action}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
  },
  copy: { gap: 2, flex: 1 },
  action: { fontWeight: "700" },
});
