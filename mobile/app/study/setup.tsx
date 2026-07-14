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
import { audioTracks } from "@/src/data/audioTracks";
import { studyMethods } from "@/src/data/studyMethods";
import { createActiveSession } from "@/src/lib/timer";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import type { StudyMethodId } from "@/src/types";
import { colors } from "@/src/theme";

const examples: Record<string, string> = {
  Mathematics: "Solve ten practice problems and mark any confusing step",
  Science: "Recall the process, then complete five practice questions",
  English: "Draft one paragraph with a clear claim and evidence",
  "History & Social Science": "Explain causes and effects without notes",
  "Computer Science & Technology": "Build one feature and test the edge cases",
  "World Languages": "Recall twenty words, then use five in sentences",
  "Arts & Other": "Finish one concrete stage of the project",
};
export default function StudySetupScreen() {
  const params = useLocalSearchParams<{
    assignmentId?: string;
    reviewId?: string;
    methodId?: StudyMethodId;
    courseId?: string;
  }>();
  const { courses, assignments, reviews, profile, settings, setActiveSession } =
    useOrbitStore();
  const selectedAssignment = assignments.find(
    (item) => item.id === params.assignmentId,
  );
  const selectedReview = reviews.find((item) => item.id === params.reviewId);
  const [courseId, setCourseId] = useState(
    selectedAssignment?.courseId ??
      selectedReview?.courseId ??
      params.courseId ??
      courses[0]?.id ??
      "",
  );
  const [assignmentId, setAssignmentId] = useState(
    selectedAssignment?.id ?? "",
  );
  const [topic, setTopic] = useState(selectedReview?.topic ?? "");
  const [goal, setGoal] = useState(selectedAssignment?.title ?? "");
  const [methodId, setMethodId] = useState<StudyMethodId>(
    params.methodId ?? (selectedReview ? "spaced-review" : "pomodoro"),
  );
  const method = studyMethods.find((item) => item.id === methodId)!;
  const [minutes, setMinutes] = useState(
    methodId === "pomodoro" ? 25 : profile.preferredMinutes,
  );
  const [audioId, setAudioId] = useState(settings.defaultAudioId);
  const course = courses.find((item) => item.id === courseId);
  const courseAssignments = assignments.filter(
    (item) => item.courseId === courseId && !item.completed,
  );
  const start = () => {
    if (!course || !goal.trim()) return;
    const pomodoro =
      methodId === "pomodoro"
        ? {
            round: 1,
            totalRounds: 4,
            phase: "focus" as const,
            focusSeconds: minutes * 60,
            breakSeconds: 5 * 60,
            longBreakSeconds: 15 * 60,
          }
        : undefined;
    const totalSeconds = pomodoro?.focusSeconds ?? minutes * 60;
    setActiveSession(
      createActiveSession({
        courseId,
        assignmentId: assignmentId || undefined,
        topic: topic.trim(),
        goal: goal.trim(),
        methodId,
        plannedMinutes: pomodoro ? minutes * pomodoro.totalRounds : minutes,
        totalSeconds,
        demo: false,
        audioId,
        pomodoro,
      }),
    );
    router.replace("/study/timer");
  };
  return (
    <Screen>
      <View style={styles.form}>
        <AppText variant="eyebrow">One clear mission</AppText>
        <AppText variant="h1">What will “done” look like?</AppText>
        <AppText variant="small" style={styles.label}>
          Course
        </AppText>
        <View style={styles.wrap}>
          {courses.map((item) => (
            <Pill
              key={item.id}
              label={item.name}
              selected={courseId === item.id}
              color={item.color}
              onPress={() => {
                setCourseId(item.id);
                setAssignmentId("");
                setGoal("");
              }}
            />
          ))}
        </View>
        {courseAssignments.length ? (
          <>
            <AppText variant="small" style={styles.label}>
              Connect to schoolwork (optional)
            </AppText>
            <View style={styles.wrap}>
              {courseAssignments.map((item) => (
                <Pill
                  key={item.id}
                  label={item.title}
                  selected={assignmentId === item.id}
                  onPress={() => {
                    setAssignmentId(item.id);
                    setGoal(item.title);
                  }}
                />
              ))}
            </View>
          </>
        ) : null}
        <Field
          label="Topic (optional)"
          value={topic}
          onChangeText={setTopic}
          placeholder="Unit 4: Cell communication"
        />
        <Field
          label="Concrete goal"
          value={goal}
          onChangeText={setGoal}
          placeholder={
            course ? examples[course.category] : "Choose a specific finish line"
          }
          multiline
        />
        <Card style={styles.example}>
          <Ionicons name="create-outline" color={colors.gold} size={20} />
          <AppText variant="small" style={styles.flex}>
            {course
              ? examples[course.category]
              : "A useful goal starts with a verb: solve, explain, draft, recall, debug, compare."}
          </AppText>
        </Card>
        <AppText variant="small" style={styles.label}>
          Study method
        </AppText>
        <View style={styles.wrap}>
          {studyMethods.slice(0, 5).map((item) => (
            <Pill
              key={item.id}
              label={item.name}
              selected={methodId === item.id}
              onPress={() => {
                setMethodId(item.id);
                setMinutes(item.id === "pomodoro" ? 25 : item.minutes[0]);
              }}
              color={colors.violet}
            />
          ))}
        </View>
        <Card style={styles.method}>
          <AppText variant="h3">{method.name}</AppText>
          <AppText variant="small">{method.explanation}</AppText>
          <AppText variant="small" color={colors.mint}>
            Often useful for: {method.bestFor}
          </AppText>
        </Card>
        <AppText variant="small" style={styles.label}>
          {methodId === "pomodoro"
            ? "Focus interval (4 rounds, 5-minute breaks)"
            : "Session length"}
        </AppText>
        <View style={styles.wrap}>
          {(methodId === "pomodoro" ? [25] : method.minutes).map((item) => (
            <Pill
              key={item}
              label={`${item} min`}
              selected={minutes === item}
              onPress={() => setMinutes(item)}
            />
          ))}
        </View>
        <AppText variant="small" style={styles.label}>
          Optional study sound
        </AppText>
        <View style={styles.audio}>
          {audioTracks.map((track) => (
            <Pill
              key={track.id}
              label={track.name}
              selected={audioId === track.id}
              onPress={() => setAudioId(track.id)}
              color={colors.blue}
            />
          ))}
        </View>
        <AppText variant="small">
          Audio starts only after you tap Begin and can be muted at any time.
        </AppText>
        <AppButton
          disabled={!goal.trim() || !courseId}
          onPress={start}
          icon={<Ionicons name="play" size={17} color={colors.ink} />}
        >
          Begin {method.name}
        </AppButton>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  form: { gap: 16 },
  label: { color: colors.cream, fontWeight: "700", marginBottom: -8 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  audio: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  example: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "rgba(243,200,117,.06)",
  },
  flex: { flex: 1 },
  method: { gap: 5, backgroundColor: "rgba(157,145,232,.07)" },
});
