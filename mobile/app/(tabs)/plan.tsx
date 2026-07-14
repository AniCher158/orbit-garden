import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Card } from "@/src/components/ui/Card";
import { Pill } from "@/src/components/ui/Pill";
import { AssignmentRow } from "@/src/components/AssignmentRow";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors } from "@/src/theme";

const views = ["Today", "This week", "Overdue", "Completed"] as const;
export default function PlanScreen() {
  const [view, setView] = useState<(typeof views)[number]>("This week");
  const { assignments, courses, toggleAssignment } = useOrbitStore();
  const filtered = useMemo(() => {
    const now = new Date();
    const week = new Date(now);
    week.setDate(now.getDate() + 7);
    return assignments
      .filter((item) =>
        view === "Completed"
          ? item.completed
          : item.completed
            ? false
            : view === "Overdue"
              ? new Date(item.dueAt) < now
              : view === "Today"
                ? new Date(item.dueAt).toDateString() === now.toDateString()
                : new Date(item.dueAt) <= week,
      )
      .sort((a, b) => +new Date(a.dueAt) - +new Date(b.dueAt));
  }, [assignments, view]);
  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <AppText variant="eyebrow">Academic planner</AppText>
          <AppText variant="h1">What’s ahead</AppText>
        </View>
        <AppButton
          onPress={() => router.push("/add-assignment")}
          icon={<Ionicons name="add" size={18} color={colors.ink} />}
        >
          Add
        </AppButton>
      </View>
      <View style={styles.filters}>
        {views.map((item) => (
          <Pill
            key={item}
            label={item}
            selected={view === item}
            onPress={() => setView(item)}
          />
        ))}
      </View>
      <Card style={styles.list}>
        {filtered.length ? (
          filtered.map((assignment) => (
            <AssignmentRow
              key={assignment.id}
              assignment={assignment}
              course={courses.find(
                (course) => course.id === assignment.courseId,
              )}
              onToggle={() => toggleAssignment(assignment.id)}
              onPress={() =>
                router.push({
                  pathname: "/study/setup",
                  params: { assignmentId: assignment.id },
                })
              }
            />
          ))
        ) : (
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" color={colors.faint} size={34} />
            <AppText variant="h3">Nothing in this view</AppText>
            <AppText variant="muted" style={styles.center}>
              Add homework, a project, or an upcoming test when you’re ready.
            </AppText>
          </View>
        )}
      </Card>
      <Card style={styles.buffer}>
        <Ionicons name="cafe-outline" color={colors.mint} size={22} />
        <View style={styles.flex}>
          <AppText variant="h3">Schedules need breathing room</AppText>
          <AppText variant="small">
            Orbit Garden keeps suggested plans below your available time so
            breaks and surprises still fit.
          </AppText>
        </View>
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 20,
  },
  list: { paddingVertical: 6 },
  empty: { alignItems: "center", padding: 30, gap: 8 },
  center: { textAlign: "center" },
  buffer: { marginTop: 18, flexDirection: "row", gap: 12 },
  flex: { flex: 1, gap: 3 },
});
