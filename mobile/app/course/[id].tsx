import { useState } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Card } from "@/src/components/ui/Card";
import { Pill } from "@/src/components/ui/Pill";
import { AssignmentRow } from "@/src/components/AssignmentRow";
import { apCourses, officialAPCatalogNote } from "@/src/data/apCourses";
import { generateStudyPlan } from "@/src/lib/studyPlan";
import { scheduleReview } from "@/src/lib/review";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors, radius } from "@/src/theme";

export default function CourseHubScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    courses,
    assignments,
    sessions,
    reviews,
    addReview,
    toggleAssignment,
  } = useOrbitStore();
  const course = courses.find((item) => item.id === id);
  const ap = apCourses.find((item) => item.title === course?.name);
  const [plan, setPlan] = useState<ReturnType<typeof generateStudyPlan>>([]);
  if (!course)
    return (
      <Screen>
        <AppText variant="h2">Course not found</AppText>
      </Screen>
    );
  const courseAssignments = assignments
    .filter((item) => item.courseId === course.id && !item.completed)
    .slice(0, 4);
  const minutes = sessions
    .filter((item) => item.courseId === course.id && !item.demo)
    .reduce((sum, item) => sum + item.actualMinutes, 0);
  const activeReviews = reviews.filter(
    (item) => item.courseId === course.id && item.status === "active",
  );
  const addTopic = (topic: string) => {
    if (activeReviews.some((item) => item.topic === topic)) return;
    addReview({
      id: `review-${Date.now()}`,
      courseId: course.id,
      topic,
      createdAt: new Date().toISOString(),
      nextReviewAt: scheduleReview(new Date(), "tomorrow"),
      confidence: 3,
      notes: "",
      history: [],
      status: "active",
    });
  };
  return (
    <Screen>
      <View style={styles.hero}>
        <View style={[styles.icon, { backgroundColor: `${course.color}25` }]}>
          <Ionicons
            name={course.icon as keyof typeof Ionicons.glyphMap}
            color={course.color}
            size={30}
          />
        </View>
        <View style={styles.flex}>
          <AppText variant="eyebrow">{course.level} course</AppText>
          <AppText variant="h1">{course.name}</AppText>
          <AppText variant="small">
            {course.teacher || "Teacher not added"}
            {course.period ? ` · ${course.period}` : ""}
          </AppText>
        </View>
      </View>
      <View style={styles.stats}>
        <Card style={styles.stat}>
          <AppText variant="h2">{minutes}</AppText>
          <AppText variant="small">minutes studied</AppText>
        </Card>
        <Card style={styles.stat}>
          <AppText variant="h2">{courseAssignments.length}</AppText>
          <AppText variant="small">upcoming</AppText>
        </Card>
        <Card style={styles.stat}>
          <AppText variant="h2">{activeReviews.length}</AppText>
          <AppText variant="small">reviews</AppText>
        </Card>
      </View>
      <AppButton
        onPress={() =>
          router.push({
            pathname: "/study/setup",
            params: { courseId: course.id },
          })
        }
        icon={<Ionicons name="play" size={17} color={colors.ink} />}
      >
        Study {course.name}
      </AppButton>
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <AppText variant="h2">Upcoming work</AppText>
          <Pressable onPress={() => router.push("/add-assignment")}>
            <AppText variant="small" color={colors.mint}>
              Add
            </AppText>
          </Pressable>
        </View>
        <Card>
          {courseAssignments.length ? (
            courseAssignments.map((item) => (
              <AssignmentRow
                key={item.id}
                assignment={item}
                course={course}
                onToggle={() => toggleAssignment(item.id)}
              />
            ))
          ) : (
            <AppText variant="muted">
              No unfinished assignments for this course.
            </AppText>
          )}
        </Card>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <View>
            <AppText variant="h2">Topics & review</AppText>
            <AppText variant="small">
              Tap a topic to add it to tomorrow’s review queue.
            </AppText>
          </View>
        </View>
        <View style={styles.topics}>
          {course.topics.length ? (
            course.topics.map((topic) => (
              <Pill
                key={topic.id}
                label={`${activeReviews.some((item) => item.topic === topic.title) ? "✓ " : ""}${topic.title}`}
                selected={activeReviews.some(
                  (item) => item.topic === topic.title,
                )}
                onPress={() => addTopic(topic.title)}
                color={course.color}
              />
            ))
          ) : (
            <Card style={styles.flex}>
              <AppText variant="muted">
                Add topics manually through a review item, or choose an AP
                course to receive an editable starter unit framework.
              </AppText>
            </Card>
          )}
        </View>
      </View>
      {ap ? (
        <View style={styles.section}>
          <AppText variant="h2">Official AP hub</AppText>
          <AppText variant="small">{officialAPCatalogNote}</AppText>
          <Card style={styles.links}>
            {[
              [
                ap.courseUrl,
                "Official course page",
                "Course overview and exam information",
              ],
              [
                ap.classroomUrl,
                "AP Classroom",
                "Requires College Board sign-in and class access",
              ],
              [
                ap.frqUrl,
                "Released free-response questions",
                "Official past questions and scoring materials",
              ],
            ].map(([url, title, copy]) =>
              url ? (
                <Pressable
                  key={title}
                  onPress={() => Linking.openURL(url)}
                  accessibilityRole="link"
                  style={styles.link}
                >
                  <View style={styles.linkIcon}>
                    <Ionicons
                      name="open-outline"
                      color={colors.mint}
                      size={18}
                    />
                  </View>
                  <View style={styles.flex}>
                    <AppText variant="h3">{title}</AppText>
                    <AppText variant="small">{copy}</AppText>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    color={colors.faint}
                    size={18}
                  />
                </Pressable>
              ) : null,
            )}
          </Card>
          <AppButton
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: "/resources",
                params: { course: course.name },
              })
            }
          >
            Open mapped resources
          </AppButton>
          <AppButton
            variant="ghost"
            onPress={() => {
              const exam = new Date();
              exam.setMonth(exam.getMonth() + 2);
              setPlan(generateStudyPlan(exam, 140, [0]));
            }}
          >
            Generate sample AP review plan
          </AppButton>
          {plan.length ? (
            <Card style={styles.plan}>
              <AppText variant="h3">Editable starter plan</AppText>
              {plan.slice(0, 6).map((block) => (
                <View key={block.id} style={styles.planRow}>
                  <Ionicons name="ellipse" size={8} color={colors.gold} />
                  <AppText variant="small" style={styles.flex}>
                    {new Date(block.scheduledAt).toLocaleDateString()} ·{" "}
                    {block.title} · {block.minutes} min
                  </AppText>
                </View>
              ))}
              <AppText variant="small">
                This is a rule-based draft, not official College Board guidance
                or a score guarantee.
              </AppText>
            </Card>
          ) : null}
        </View>
      ) : null}
      <View style={styles.section}>
        <AppText variant="h2">Course tools</AppText>
        <View style={styles.toolRow}>
          <AppButton
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: "/review",
                params: { courseId: course.id },
              })
            }
          >
            Review queue
          </AppButton>
          <AppButton
            variant="secondary"
            onPress={() => router.push("/journal")}
          >
            Journal
          </AppButton>
          <AppButton
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: "/resources",
                params: { course: course.name },
              })
            }
          >
            Resources
          </AppButton>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: { flexDirection: "row", gap: 14, alignItems: "center" },
  icon: {
    width: 62,
    height: 62,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1 },
  stats: { flexDirection: "row", gap: 9, marginVertical: 18 },
  stat: { flex: 1, padding: 13, gap: 2 },
  section: { marginTop: 27, gap: 11 },
  sectionHead: { flexDirection: "row", justifyContent: "space-between" },
  topics: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  links: { gap: 3, paddingVertical: 5 },
  link: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 10,
  },
  linkIcon: {
    width: 35,
    height: 35,
    borderRadius: radius.sm,
    backgroundColor: "rgba(143,215,181,.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  plan: { gap: 9 },
  planRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  toolRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});
