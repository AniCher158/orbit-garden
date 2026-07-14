import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Card } from "@/src/components/ui/Card";
import { studyMethods } from "@/src/data/studyMethods";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors, radius } from "@/src/theme";

const methodIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  pomodoro: "timer-outline",
  "active-recall": "flash-outline",
  "practice-testing": "document-text-outline",
  sprint: "rocket-outline",
  deep: "moon-outline",
};
export default function StudyTab() {
  const courses = useOrbitStore((state) => state.courses);
  return (
    <Screen>
      <AppText variant="eyebrow">Choose how to learn</AppText>
      <AppText variant="h1">Study with a purpose</AppText>
      <AppText variant="muted" style={styles.intro}>
        Start with a concrete goal. The method is a tool—not a rule.
      </AppText>
      <AppButton
        disabled={!courses.length}
        onPress={() => router.push("/study/setup")}
        icon={<Ionicons name="play" size={17} color={colors.ink} />}
      >
        {courses.length ? "Plan a study session" : "Add a course first"}
      </AppButton>
      <View style={styles.header}>
        <AppText variant="h2">Suggested methods</AppText>
        <Pressable onPress={() => router.push("/methods")}>
          <AppText variant="small" color={colors.mint}>
            View all
          </AppText>
        </Pressable>
      </View>
      <View style={styles.grid}>
        {studyMethods.slice(0, 5).map((method) => (
          <Pressable
            key={method.id}
            onPress={() =>
              router.push({
                pathname: "/study/setup",
                params: { methodId: method.id },
              })
            }
            style={styles.methodWrap}
          >
            <Card style={styles.method}>
              <View style={styles.methodIcon}>
                <Ionicons
                  name={methodIcons[method.id] ?? "sparkles-outline"}
                  color={colors.violet}
                  size={22}
                />
              </View>
              <AppText variant="h3">{method.name}</AppText>
              <AppText variant="small">{method.explanation}</AppText>
              <AppText variant="small" color={colors.mint}>
                {method.minutes.join(" / ")} min
              </AppText>
            </Card>
          </Pressable>
        ))}
      </View>
      <Card style={styles.reminder}>
        <Ionicons name="heart-outline" color={colors.pink} size={23} />
        <View style={styles.flex}>
          <AppText variant="h3">Short sessions count</AppText>
          <AppText variant="small">
            Five focused minutes can be exactly the right next step. Orbit
            Garden never takes rewards away for missed days.
          </AppText>
        </View>
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({
  intro: { marginTop: 6, marginBottom: 18 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 12,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  methodWrap: { width: "48%", minWidth: 150, flexGrow: 1 },
  method: { height: 196, gap: 8, padding: 15 },
  methodIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: "rgba(157,145,232,.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  reminder: { marginTop: 20, flexDirection: "row", gap: 12 },
  flex: { flex: 1, gap: 3 },
});
