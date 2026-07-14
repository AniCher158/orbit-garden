import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Card } from "@/src/components/ui/Card";
import { SectionHeader } from "@/src/components/ui/SectionHeader";
import { AssignmentRow } from "@/src/components/AssignmentRow";
import { GardenScene } from "@/src/components/GardenScene";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { prioritizeWork } from "@/src/lib/priority";
import { colors, radius } from "@/src/theme";

const tips = [
  "Try writing what you remember before reopening your notes.",
  "A concrete goal is easier to start than “study biology.”",
  "After practice questions, spend time on why each mistake happened.",
  "A short, honest session still counts.",
];
export default function HomeScreen() {
  const { profile, courses, assignments, reviews, garden, toggleAssignment } =
    useOrbitStore();
  const recommendation = prioritizeWork(assignments, reviews, courses);
  const due = assignments
    .filter((item) => !item.completed)
    .sort((a, b) => +new Date(a.dueAt) - +new Date(b.dueAt))
    .slice(0, 3);
  const nickname = profile.nickname ? `, ${profile.nickname}` : "";
  return (
    <Screen>
      <View style={styles.top}>
        <View>
          <AppText variant="eyebrow">Today in orbit</AppText>
          <AppText variant="h1">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 18
                ? "afternoon"
                : "evening"}
            {nickname}
          </AppText>
        </View>
        <Ionicons
          name="settings-outline"
          size={24}
          color={colors.muted}
          onPress={() => router.push("/settings")}
          accessibilityLabel="Open settings"
        />
      </View>
      <View style={styles.garden}>
        <GardenScene garden={garden} compact />
        <View style={styles.level}>
          <AppText variant="small" color={colors.gold}>
            LEVEL {garden.level}
          </AppText>
          <AppText variant="h3">
            {
              [
                "Empty Orbit",
                "First Sprout",
                "Scholar’s Garden",
                "Blooming Observatory",
                "Cosmic Study Sanctuary",
              ][garden.level - 1]
            }
          </AppText>
          <AppText variant="small">{garden.stardust} Stardust</AppText>
        </View>
      </View>
      {courses.length === 0 ? (
        <Card style={styles.welcome}>
          <Ionicons name="sparkles" color={colors.gold} size={25} />
          <AppText variant="h2">Let’s add your first class</AppText>
          <AppText variant="muted">
            A course connects your assignments, study sessions, resources, and
            reviews.
          </AppText>
          <AppButton onPress={() => router.push("/add-course")}>
            Add a course
          </AppButton>
        </Card>
      ) : (
        <>
          <Card style={styles.recommend}>
            <View style={styles.recommendIcon}>
              <Ionicons name="navigate" color={colors.ink} size={19} />
            </View>
            <View style={styles.flex}>
              <AppText variant="eyebrow">Recommended next</AppText>
              <AppText variant="h2">
                {recommendation?.assignment?.title ??
                  recommendation?.review?.topic ??
                  "Choose a small win"}
              </AppText>
              <AppText variant="muted">
                {recommendation?.reason ??
                  "You’re caught up. Pick a topic that would make tomorrow easier."}
              </AppText>
            </View>
            <AppButton
              onPress={() =>
                router.push({
                  pathname: "/study/setup",
                  params: {
                    assignmentId: recommendation?.assignment?.id,
                    reviewId: recommendation?.review?.id,
                  },
                })
              }
            >
              Start study
            </AppButton>
          </Card>
          <View style={styles.section}>
            <SectionHeader
              title="Due soon"
              action="Open plan"
              onAction={() => router.push("/(tabs)/plan")}
            />
            {due.length ? (
              <Card>
                {due.map((assignment) => (
                  <AssignmentRow
                    key={assignment.id}
                    assignment={assignment}
                    course={courses.find(
                      (course) => course.id === assignment.courseId,
                    )}
                    onToggle={() => toggleAssignment(assignment.id)}
                  />
                ))}
              </Card>
            ) : (
              <Card>
                <AppText variant="muted">
                  Nothing urgent is waiting. A rare and lovely sight.
                </AppText>
              </Card>
            )}
          </View>
        </>
      )}
      <View style={styles.quick}>
        <Card style={styles.quickCard}>
          <Ionicons name="library-outline" color={colors.violet} size={22} />
          <AppText variant="h3">Resources</AppText>
          <AppText variant="small">
            Official links and carefully labeled study tools.
          </AppText>
          <AppButton variant="ghost" onPress={() => router.push("/resources")}>
            Explore
          </AppButton>
        </Card>
        <Card style={styles.quickCard}>
          <Ionicons name="refresh-outline" color={colors.mint} size={22} />
          <AppText variant="h3">Review queue</AppText>
          <AppText variant="small">
            {reviews.filter((item) => item.status === "active").length} topics
            waiting
          </AppText>
          <AppButton variant="ghost" onPress={() => router.push("/review")}>
            Review
          </AppButton>
        </Card>
      </View>
      <Card style={styles.tip}>
        <Ionicons name="bulb-outline" color={colors.gold} size={21} />
        <View style={styles.flex}>
          <AppText variant="small" color={colors.gold}>
            PRACTICAL STUDY TIP
          </AppText>
          <AppText>{tips[new Date().getDate() % tips.length]}</AppText>
        </View>
      </Card>
      <AppButton
        variant="secondary"
        onPress={() => router.push("/demo")}
        icon={
          <Ionicons name="play-circle-outline" size={19} color={colors.cream} />
        }
      >
        Try the 10-second reviewer demo
      </AppButton>
    </Screen>
  );
}
const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  garden: { position: "relative" },
  level: { position: "absolute", left: 16, top: 16, gap: 2, maxWidth: 180 },
  welcome: { marginTop: 16, gap: 13, alignItems: "flex-start" },
  recommend: { marginTop: 16, gap: 12 },
  recommendIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.mint,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1, gap: 4 },
  section: { marginTop: 28, gap: 12 },
  quick: { flexDirection: "row", gap: 12, marginTop: 24 },
  quickCard: { flex: 1, gap: 8, padding: 15 },
  tip: {
    marginVertical: 24,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
});
