import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "./ui/AppText";
import type { Assignment, Course } from "@/src/types";
import { colors, radius } from "@/src/theme";

export function AssignmentRow({
  assignment,
  course,
  onToggle,
  onPress,
}: {
  assignment: Assignment;
  course?: Course;
  onToggle?: () => void;
  onPress?: () => void;
}) {
  const overdue =
    new Date(assignment.dueAt) < new Date() && !assignment.completed;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.row}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: assignment.completed }}
        accessibilityLabel={`Mark ${assignment.title} ${assignment.completed ? "incomplete" : "complete"}`}
        onPress={onToggle}
        hitSlop={8}
        style={[styles.check, assignment.completed && styles.checked]}
      >
        {assignment.completed ? (
          <Ionicons name="checkmark" color={colors.ink} size={15} />
        ) : null}
      </Pressable>
      <View style={styles.copy}>
        <AppText variant="h3" style={assignment.completed && styles.done}>
          {assignment.title}
        </AppText>
        <AppText variant="small" color={overdue ? colors.coral : colors.muted}>
          {course?.name ?? "Course"} ·{" "}
          {overdue
            ? "Overdue"
            : new Date(assignment.dueAt).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
        </AppText>
      </View>
      <View
        style={[
          styles.priority,
          {
            backgroundColor:
              assignment.priority === 3 ? colors.gold : colors.violet,
          },
        ]}
      />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  row: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.faint,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: { backgroundColor: colors.mint, borderColor: colors.mint },
  copy: { flex: 1, gap: 3 },
  done: { color: colors.faint, textDecorationLine: "line-through" },
  priority: { width: 7, height: 7, borderRadius: radius.pill },
});
