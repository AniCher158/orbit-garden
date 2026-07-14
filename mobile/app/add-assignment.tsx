import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Field } from "@/src/components/ui/Field";
import { Pill } from "@/src/components/ui/Pill";
import { Card } from "@/src/components/ui/Card";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import type { Assignment, AssignmentType, Subtask } from "@/src/types";
import { colors, radius } from "@/src/theme";

const types: AssignmentType[] = [
  "Homework",
  "Project",
  "Essay",
  "Reading",
  "Quiz",
  "Test",
  "Presentation",
  "Lab",
  "Custom",
];
const templates: Partial<Record<AssignmentType, string[]>> = {
  Essay: [
    "Understand prompt",
    "Choose topic",
    "Gather sources",
    "Make outline",
    "Draft introduction",
    "Draft body",
    "Revise",
    "Proofread",
    "Submit",
  ],
  Project: [
    "Read requirements",
    "Choose direction",
    "Gather materials",
    "Create first version",
    "Get feedback",
    "Revise",
    "Submit",
  ],
  Test: [
    "List exam topics",
    "Review weak units",
    "Complete practice questions",
    "Review mistakes",
    "Complete timed practice",
    "Make final summary",
  ],
};
export default function AddAssignmentScreen() {
  const { courses, addAssignment } = useOrbitStore();
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [type, setType] = useState<AssignmentType>("Homework");
  const [days, setDays] = useState(2);
  const [minutes, setMinutes] = useState(30);
  const [priority, setPriority] = useState<1 | 2 | 3>(2);
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(2);
  const [notes, setNotes] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const applyTemplate = () =>
    setSubtasks(
      (templates[type] ?? ["First step", "Work session", "Final check"]).map(
        (item, index) => ({
          id: `sub-${Date.now()}-${index}`,
          title: item,
          completed: false,
        }),
      ),
    );
  const save = () => {
    if (!title.trim() || !courseId) return;
    const due = new Date();
    due.setDate(due.getDate() + days);
    due.setHours(16, 0, 0, 0);
    const assignment: Assignment = {
      id: `assignment-${Date.now()}`,
      title: title.trim(),
      courseId,
      type,
      dueAt: due.toISOString(),
      estimatedMinutes: minutes,
      priority,
      difficulty,
      notes: notes.trim(),
      subtasks,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    addAssignment(assignment);
    router.back();
  };
  if (!courses.length)
    return (
      <Screen>
        <Card style={styles.empty}>
          <AppText variant="h2">Add a course first</AppText>
          <AppText variant="muted">
            Every assignment belongs to a class so Orbit Garden can prioritize
            and recommend resources accurately.
          </AppText>
          <AppButton onPress={() => router.replace("/add-course")}>
            Add a course
          </AppButton>
        </Card>
      </Screen>
    );
  return (
    <Screen>
      <View style={styles.form}>
        <Field
          label="Assignment, quiz, or exam"
          value={title}
          onChangeText={setTitle}
          placeholder="Chemistry lab report"
          autoFocus
        />
        <AppText variant="small" style={styles.label}>
          Course
        </AppText>
        <View style={styles.wrap}>
          {courses.map((course) => (
            <Pill
              key={course.id}
              label={course.name}
              selected={courseId === course.id}
              color={course.color}
              onPress={() => setCourseId(course.id)}
            />
          ))}
        </View>
        <AppText variant="small" style={styles.label}>
          Type
        </AppText>
        <View style={styles.wrap}>
          {types.map((item) => (
            <Pill
              key={item}
              label={item}
              selected={type === item}
              onPress={() => {
                setType(item);
                setSubtasks([]);
              }}
            />
          ))}
        </View>
        <AppText variant="small" style={styles.label}>
          Due
        </AppText>
        <View style={styles.wrap}>
          {[
            [0, "Today"],
            [1, "Tomorrow"],
            [2, "In 2 days"],
            [7, "In a week"],
          ].map(([value, label]) => (
            <Pill
              key={String(label)}
              label={String(label)}
              selected={days === value}
              onPress={() => setDays(Number(value))}
            />
          ))}
        </View>
        <AppText variant="small" style={styles.label}>
          Estimated study time
        </AppText>
        <View style={styles.wrap}>
          {[15, 30, 45, 60, 90].map((item) => (
            <Pill
              key={item}
              label={`${item} min`}
              selected={minutes === item}
              onPress={() => setMinutes(item)}
              color={colors.violet}
            />
          ))}
        </View>
        <View style={styles.two}>
          <View style={styles.flex}>
            <AppText variant="small" style={styles.label}>
              Priority
            </AppText>
            <View style={styles.wrap}>
              {([1, 2, 3] as const).map((item) => (
                <Pill
                  key={item}
                  label={String(item)}
                  selected={priority === item}
                  onPress={() => setPriority(item)}
                />
              ))}
            </View>
          </View>
          <View style={styles.flex}>
            <AppText variant="small" style={styles.label}>
              Difficulty
            </AppText>
            <View style={styles.wrap}>
              {([1, 2, 3] as const).map((item) => (
                <Pill
                  key={item}
                  label={String(item)}
                  selected={difficulty === item}
                  onPress={() => setDifficulty(item)}
                />
              ))}
            </View>
          </View>
        </View>
        <Field
          label="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="Topics, instructions, or links"
          multiline
        />
        <Card style={styles.breakdown}>
          <View style={styles.breakdownHeader}>
            <View style={styles.flex}>
              <AppText variant="h3">Break it into steps</AppText>
              <AppText variant="small">
                A deterministic template you can edit completely.
              </AppText>
            </View>
            <AppButton variant="secondary" onPress={applyTemplate}>
              Generate
            </AppButton>
          </View>
          {subtasks.map((subtask, index) => (
            <TextInput
              key={subtask.id}
              accessibilityLabel={`Step ${index + 1}`}
              value={subtask.title}
              onChangeText={(value) =>
                setSubtasks((items) =>
                  items.map((item) =>
                    item.id === subtask.id ? { ...item, title: value } : item,
                  ),
                )
              }
              style={styles.subtask}
              placeholderTextColor={colors.faint}
            />
          ))}
        </Card>
        <AppButton disabled={!title.trim()} onPress={save}>
          Save to my plan
        </AppButton>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  form: { gap: 17 },
  label: { color: colors.cream, fontWeight: "700", marginBottom: -8 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  two: { flexDirection: "row", gap: 20 },
  flex: { flex: 1, gap: 10 },
  breakdown: { gap: 9 },
  breakdownHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  subtask: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,.03)",
    borderRadius: radius.sm,
    color: colors.cream,
    paddingHorizontal: 12,
  },
  empty: { gap: 14 },
});
