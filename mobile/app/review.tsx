import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Field } from "@/src/components/ui/Field";
import { Pill } from "@/src/components/ui/Pill";
import { Card } from "@/src/components/ui/Card";
import { scheduleReview } from "@/src/lib/review";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors } from "@/src/theme";

export default function ReviewScreen() {
  const params = useLocalSearchParams<{ courseId?: string }>();
  const { courses, reviews, addReview, completeReview } = useOrbitStore();
  const [courseId, setCourseId] = useState(
    params.courseId ?? courses[0]?.id ?? "",
  );
  const [topic, setTopic] = useState("");
  const active = reviews.filter((item) => item.status === "active");
  const add = () => {
    if (!topic.trim() || !courseId) return;
    addReview({
      id: `review-${Date.now()}`,
      courseId,
      topic: topic.trim(),
      createdAt: new Date().toISOString(),
      nextReviewAt: scheduleReview(new Date(), "tomorrow"),
      confidence: 3,
      notes: "",
      history: [],
      status: "active",
    });
    setTopic("");
  };
  return (
    <Screen>
      <AppText variant="muted">
        Return to ideas after time has passed. Confidence is a reflection
        prompt, not a grade.
      </AppText>
      <Card style={styles.add}>
        <AppText variant="h3">Add a topic</AppText>
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
        <Field
          label="Topic"
          value={topic}
          onChangeText={setTopic}
          placeholder="Cell signaling pathways"
        />
        <AppButton variant="secondary" disabled={!topic.trim()} onPress={add}>
          Schedule for tomorrow
        </AppButton>
      </Card>
      <View style={styles.list}>
        {active.length ? (
          active.map((review) => {
            const course = courses.find((item) => item.id === review.courseId);
            const overdue = new Date(review.nextReviewAt) <= new Date();
            return (
              <Card key={review.id} style={styles.review}>
                <View style={styles.reviewHead}>
                  <View
                    style={[
                      styles.courseDot,
                      { backgroundColor: course?.color ?? colors.violet },
                    ]}
                  />
                  <View style={styles.flex}>
                    <AppText variant="h2">{review.topic}</AppText>
                    <AppText
                      variant="small"
                      color={overdue ? colors.gold : colors.muted}
                    >
                      {course?.name} ·{" "}
                      {overdue
                        ? "Ready to review"
                        : new Date(review.nextReviewAt).toLocaleDateString()}
                    </AppText>
                  </View>
                </View>
                <View style={styles.actions}>
                  <AppButton
                    onPress={() =>
                      router.push({
                        pathname: "/study/setup",
                        params: {
                          reviewId: review.id,
                          methodId: "spaced-review",
                        },
                      })
                    }
                  >
                    Start review
                  </AppButton>
                  <AppButton
                    variant="secondary"
                    onPress={() =>
                      completeReview(
                        review.id,
                        scheduleReview(new Date(), "three-days"),
                      )
                    }
                  >
                    Snooze 3 days
                  </AppButton>
                  <AppButton
                    variant="ghost"
                    onPress={() => completeReview(review.id)}
                  >
                    Complete
                  </AppButton>
                </View>
              </Card>
            );
          })
        ) : (
          <Card style={styles.empty}>
            <Ionicons
              name="checkmark-circle-outline"
              color={colors.mint}
              size={35}
            />
            <AppText variant="h3">Review queue clear</AppText>
            <AppText variant="muted">
              Add a topic from here or from an AP course hub.
            </AppText>
          </Card>
        )}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  add: { marginTop: 16, gap: 12 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  list: { gap: 11, marginTop: 18 },
  review: { gap: 13 },
  reviewHead: { flexDirection: "row", alignItems: "center", gap: 11 },
  courseDot: { width: 9, height: 42, borderRadius: 5 },
  flex: { flex: 1 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  empty: { alignItems: "center", gap: 8 },
});
