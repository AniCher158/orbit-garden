import type { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/theme";

export function Screen({
  children,
  scroll = true,
  contentStyle,
  ...props
}: {
  children: ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle;
} & ScrollViewProps) {
  const content = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.content, contentStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.flex, contentStyle]}>{children}</View>
  );
  return (
    <LinearGradient
      colors={[colors.ink, "#0C1024", colors.ink]}
      style={styles.flex}
    >
      <SafeAreaView style={styles.flex} edges={["top"]}>
        {content}
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    padding: 20,
    paddingBottom: 110,
    width: "100%",
    maxWidth: 920,
    alignSelf: "center",
  },
});
