import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Card } from "@/src/components/ui/Card";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors, radius } from "@/src/theme";

export default function CoursesScreen() {
  const { courses, assignments, sessions } = useOrbitStore();
  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <AppText variant="eyebrow">Your schedule</AppText>
          <AppText variant="h1">Course hubs</AppText>
        </View>
        <AppButton
          onPress={() => router.push("/add-course")}
          icon={<Ionicons name="add" size={18} color={colors.ink} />}
        >
          Course
        </AppButton>
      </View>
      <View style={styles.list}>
        {courses
          .filter((course) => !course.archived)
          .map((course) => {
            const upcoming = assignments.filter(
              (item) => item.courseId === course.id && !item.completed,
            ).length;
            const minutes = sessions
              .filter((item) => item.courseId === course.id && !item.demo)
              .reduce((sum, item) => sum + item.actualMinutes, 0);
            return (
              <Pressable
                key={course.id}
                onPress={() =>
                  router.push({
                    pathname: "/course/[id]",
                    params: { id: course.id },
                  })
                }
              >
                <Card style={styles.course}>
                  <View
                    style={[
                      styles.icon,
                      { backgroundColor: `${course.color}25` },
                    ]}
                  >
                    <Ionicons
                      name={
                        (course.icon ||
                          "book") as keyof typeof Ionicons.glyphMap
                      }
                      color={course.color}
                      size={23}
                    />
                  </View>
                  <View style={styles.flex}>
                    <AppText variant="h2">{course.name}</AppText>
                    <AppText variant="small">
                      {course.level}
                      {course.period ? ` · Period ${course.period}` : ""}
                    </AppText>
                    <View style={styles.meta}>
                      <AppText variant="small">{upcoming} upcoming</AppText>
                      <AppText variant="small">{minutes} min studied</AppText>
                      {course.currentGrade ? (
                        <AppText variant="small">
                          Grade {course.currentGrade}
                        </AppText>
                      ) : null}
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    color={colors.faint}
                    size={20}
                  />
                </Card>
              </Pressable>
            );
          })}
        {courses.length === 0 ? (
          <Card style={styles.empty}>
            <Ionicons name="library-outline" color={colors.violet} size={38} />
            <AppText variant="h2">Build your schedule</AppText>
            <AppText variant="muted" style={{ textAlign: "center" }}>
              Search the high-school catalog or add a custom course. School
              names and private details are never required.
            </AppText>
            <AppButton onPress={() => router.push("/add-course")}>
              Add first course
            </AppButton>
          </Card>
        ) : null}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  list: { gap: 12, marginTop: 20 },
  course: { flexDirection: "row", alignItems: "center", gap: 13 },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1, gap: 2 },
  meta: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 6 },
  empty: { alignItems: "center", gap: 12, padding: 28 },
});
