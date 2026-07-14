import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Field } from "@/src/components/ui/Field";
import { Pill } from "@/src/components/ui/Pill";
import {
  highSchoolCourses,
  type CatalogCourse,
} from "@/src/data/highSchoolCourses";
import { apCourses } from "@/src/data/apCourses";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import type { Course, CourseLevel } from "@/src/types";
import { colors, radius } from "@/src/theme";

const palette = [
  "#77B892",
  "#7EB5D6",
  "#B292D7",
  "#D38C78",
  "#E3B866",
  "#70CFC3",
];
export default function AddCourseScreen() {
  const addCourse = useOrbitStore((state) => state.addCourse);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CatalogCourse | null>(null);
  const [customName, setCustomName] = useState("");
  const [level, setLevel] = useState<CourseLevel>("Regular");
  const [color, setColor] = useState(palette[0]);
  const [teacher, setTeacher] = useState("");
  const [period, setPeriod] = useState("");
  const results = useMemo(
    () =>
      highSchoolCourses
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 24),
    [query],
  );
  const save = () => {
    const chosen =
      selected ??
      (customName.trim()
        ? { name: customName.trim(), category: "Arts & Other" as const }
        : null);
    if (!chosen) return;
    const ap = apCourses.find((item) => item.title === chosen.name);
    const now = new Date().toISOString();
    const course: Course = {
      id: `course-${Date.now()}`,
      name: chosen.name,
      category: chosen.category,
      level: chosen.isAP ? "AP" : level,
      color,
      icon: chosen.category.includes("Math")
        ? "calculator"
        : chosen.category.includes("Science")
          ? "flask"
          : chosen.category.includes("Computer")
            ? "code"
            : "book",
      teacher: teacher.trim() || undefined,
      period: period.trim() || undefined,
      archived: false,
      isAP: Boolean(chosen.isAP),
      topics:
        ap?.units.map((title, index) => ({
          id: `topic-${Date.now()}-${index}`,
          title,
          confidence: 3,
          completed: false,
        })) ?? [],
      createdAt: now,
    };
    addCourse(course);
    router.back();
  };
  return (
    <Screen>
      <AppText variant="muted">
        Search the starter catalog or use any name your school uses.
      </AppText>
      <Field
        label="Search courses"
        value={query}
        onChangeText={setQuery}
        placeholder="Try AP Biology or Algebra II"
        autoFocus
      />
      {!selected ? (
        <View style={styles.results}>
          {results.map((item) => (
            <Pressable
              key={`${item.category}-${item.name}`}
              onPress={() => {
                setSelected(item);
                if (item.isAP) setLevel("AP");
              }}
              style={styles.result}
            >
              <View style={styles.resultIcon}>
                <Ionicons
                  name={item.isAP ? "star" : "book-outline"}
                  color={item.isAP ? colors.gold : colors.mint}
                  size={17}
                />
              </View>
              <View style={styles.flex}>
                <AppText variant="h3">{item.name}</AppText>
                <AppText variant="small">
                  {item.category}
                  {item.isAP ? " · Official AP catalog" : ""}
                </AppText>
              </View>
              <Ionicons
                name="add-circle-outline"
                color={colors.faint}
                size={21}
              />
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={styles.form}>
          <Pressable onPress={() => setSelected(null)} style={styles.selected}>
            <Ionicons name="checkmark-circle" color={colors.mint} size={22} />
            <View style={styles.flex}>
              <AppText variant="h2">{selected.name}</AppText>
              <AppText variant="small">Tap to choose another</AppText>
            </View>
          </Pressable>
          <AppText variant="small" style={styles.label}>
            Course level
          </AppText>
          <View style={styles.wrap}>
            {(
              ["Regular", "Honors", "AP", "Elective", "Other"] as CourseLevel[]
            ).map((item) => (
              <Pill
                key={item}
                label={item}
                selected={level === item}
                onPress={() => setLevel(item)}
              />
            ))}
          </View>
          <AppText variant="small" style={styles.label}>
            Color
          </AppText>
          <View style={styles.palette}>
            {palette.map((item) => (
              <Pressable
                key={item}
                accessibilityLabel={`Choose ${item} course color`}
                onPress={() => setColor(item)}
                style={[
                  styles.color,
                  { backgroundColor: item },
                  color === item && styles.colorSelected,
                ]}
              />
            ))}
          </View>
          <Field
            label="Teacher (optional)"
            value={teacher}
            onChangeText={setTeacher}
            placeholder="Ms. Rivera"
          />
          <Field
            label="Class period or room (optional)"
            value={period}
            onChangeText={setPeriod}
            placeholder="Period 3"
          />
          <AppButton onPress={save}>Add {selected.name}</AppButton>
        </View>
      )}
      {!selected ? (
        <View style={styles.custom}>
          <AppText variant="h3">Can’t find it?</AppText>
          <Field
            label="Custom course name"
            value={customName}
            onChangeText={setCustomName}
            placeholder="My school’s course name"
          />
          <AppButton
            variant="secondary"
            disabled={!customName.trim()}
            onPress={save}
          >
            Add custom course
          </AppButton>
        </View>
      ) : null}
    </Screen>
  );
}
const styles = StyleSheet.create({
  results: { marginTop: 10 },
  result: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultIcon: {
    width: 35,
    height: 35,
    borderRadius: radius.sm,
    backgroundColor: "rgba(255,255,255,.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1, gap: 2 },
  form: { gap: 16, marginTop: 20 },
  selected: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    padding: 15,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(143,215,181,.35)",
    backgroundColor: "rgba(143,215,181,.07)",
  },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  label: { color: colors.cream, fontWeight: "700", marginBottom: -8 },
  palette: { flexDirection: "row", gap: 12 },
  color: { width: 38, height: 38, borderRadius: 19 },
  colorSelected: { borderWidth: 3, borderColor: colors.cream },
  custom: {
    gap: 12,
    marginTop: 26,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
