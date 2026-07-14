import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Field } from "@/src/components/ui/Field";
import { Card } from "@/src/components/ui/Card";
import { Sprig } from "@/src/components/Sprig";
import { shopItems } from "@/src/data/shopItems";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import type { StudySession } from "@/src/types";
import { colors, radius } from "@/src/theme";

export default function CompleteScreen() {
  const storeActive = useOrbitStore((state) => state.activeSession);
  const [active] = useState(storeActive);
  const complete = useOrbitStore((state) => state.completeStudySession);
  const courses = useOrbitStore((state) => state.courses);
  const [notes, setNotes] = useState("");
  const [recall, setRecall] = useState("");
  const [attempted, setAttempted] = useState("");
  const [correct, setCorrect] = useState("");
  const [collected, setCollected] = useState(false);
  const [rewardId, setRewardId] = useState("");
  const [earned, setEarned] = useState(0);
  if (!active)
    return (
      <Screen contentStyle={styles.center}>
        <AppText variant="h2">This session has already been collected.</AppText>
        <AppButton onPress={() => router.replace("/(tabs)/home")}>
          Return home
        </AppButton>
      </Screen>
    );
  const course = courses.find((item) => item.id === active.courseId);
  const collect = () => {
    const session: StudySession = {
      id: `session-${Date.now()}`,
      courseId: active.courseId,
      assignmentId: active.assignmentId,
      topic: active.topic,
      goal: active.goal,
      methodId: active.methodId,
      plannedMinutes: active.plannedMinutes,
      actualMinutes: active.demo ? 1 : active.plannedMinutes,
      completedAt: new Date().toISOString(),
      notes: notes.trim(),
      recallNotes: recall.trim() || undefined,
      attempted: attempted ? Number(attempted) : undefined,
      correct: correct ? Number(correct) : undefined,
      stardustEarned: 0,
      demo: active.demo,
    };
    const result = complete(session);
    setRewardId(result.rewardId ?? "");
    setEarned(result.earned);
    setCollected(true);
  };
  if (collected) {
    const reward =
      shopItems.find((item) => item.id === rewardId) ?? shopItems[0];
    return (
      <Screen contentStyle={styles.center}>
        <Sprig size={180} state="celebrating" />
        <AppText variant="eyebrow">Session complete</AppText>
        <AppText variant="display" style={styles.centerText}>
          Your garden grew.
        </AppText>
        <Card style={styles.reward}>
          <View
            style={[
              styles.rewardIcon,
              { backgroundColor: `${reward.color}25` },
            ]}
          >
            <Ionicons name="leaf" color={reward.color} size={34} />
          </View>
          <View style={styles.flex}>
            <AppText variant="h2">{reward.name}</AppText>
            <AppText variant="muted">{reward.description}</AppText>
            <AppText variant="h3" color={colors.gold}>
              +{earned} Stardust
            </AppText>
          </View>
        </Card>
        {active.demo ? (
          <>
            <AppText variant="muted" style={styles.centerText}>
              Demo rewards are previews only. Your real garden and statistics
              were not changed.
            </AppText>
            <AppButton
              onPress={() =>
                router.replace({
                  pathname: "/place-reward",
                  params: { demo: "true", rewardId: reward.id },
                })
              }
            >
              Preview in demo garden
            </AppButton>
          </>
        ) : (
          <AppButton onPress={() => router.replace("/place-reward")}>
            Place item in my garden
          </AppButton>
        )}
        <AppButton
          variant="ghost"
          onPress={() => router.replace("/(tabs)/home")}
        >
          Return home
        </AppButton>
      </Screen>
    );
  }
  return (
    <Screen>
      <View style={styles.hero}>
        <Sprig size={145} state="celebrating" />
        <View style={styles.flex}>
          <AppText variant="eyebrow">You showed up</AppText>
          <AppText variant="h1">How did it go?</AppText>
          <AppText variant="muted">
            {course?.name ?? "Demo course"} · {active.goal}
          </AppText>
        </View>
      </View>
      <View style={styles.form}>
        <Field
          label="Session note (optional)"
          value={notes}
          onChangeText={setNotes}
          multiline
          placeholder="What worked? What should future-you remember?"
        />
        {active.methodId === "active-recall" ||
        active.methodId === "spaced-review" ? (
          <Field
            label="What could you recall?"
            value={recall}
            onChangeText={setRecall}
            multiline
            placeholder="Write the answer from memory, then note gaps."
          />
        ) : null}
        {active.methodId === "practice-testing" ? (
          <View style={styles.scores}>
            <Field
              label="Questions attempted"
              value={attempted}
              onChangeText={setAttempted}
              keyboardType="number-pad"
              style={styles.flex}
            />
            <Field
              label="Correct"
              value={correct}
              onChangeText={setCorrect}
              keyboardType="number-pad"
              style={styles.flex}
            />
          </View>
        ) : null}
        <AppButton onPress={collect}>Collect study reward</AppButton>
        <AppText variant="small" style={styles.centerText}>
          This creates a journal entry only after you collect. Canceled sessions
          never count.
        </AppText>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", gap: 16 },
  centerText: { textAlign: "center" },
  hero: { flexDirection: "row", alignItems: "center", gap: 12 },
  flex: { flex: 1, gap: 5 },
  form: { gap: 16, marginTop: 16 },
  scores: { flexDirection: "row", gap: 12 },
  reward: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "100%",
    maxWidth: 500,
  },
  rewardIcon: {
    width: 76,
    height: 76,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
});
