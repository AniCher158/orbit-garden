import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Field } from "@/src/components/ui/Field";
import { Pill } from "@/src/components/ui/Pill";
import { Sprig } from "@/src/components/Sprig";
import { defaultProfile, useOrbitStore } from "@/src/store/useOrbitStore";
import type { GradeLevel } from "@/src/types";
import { colors } from "@/src/theme";

export default function OnboardingScreen() {
  const finish = useOrbitStore((state) => state.finishOnboarding);
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState<GradeLevel>("9");
  const [minutes, setMinutes] = useState(25);
  const [goals, setGoals] = useState<string[]>([]);
  const complete = () => {
    finish({
      ...defaultProfile,
      nickname: nickname.trim(),
      grade,
      preferredMinutes: minutes,
      goals,
      onboarded: true,
    });
    router.replace("/(tabs)/home");
  };
  const toggleGoal = (goal: string) =>
    setGoals((items) =>
      items.includes(goal)
        ? items.filter((item) => item !== goal)
        : [...items, goal],
    );
  return (
    <Screen contentStyle={styles.content}>
      <Pressable onPress={complete} style={styles.skip}>
        <AppText variant="small">Skip setup</AppText>
      </Pressable>
      <View style={styles.hero}>
        <Sprig size={142} state={step === 2 ? "celebrating" : "reading"} />
        <View style={styles.steps}>
          {[0, 1, 2].map((item) => (
            <View
              key={item}
              style={[styles.dot, item === step && styles.dotActive]}
            />
          ))}
        </View>
      </View>
      {step === 0 ? (
        <View style={styles.block}>
          <AppText variant="eyebrow">Meet Sprig</AppText>
          <AppText variant="display">Welcome to your study planet.</AppText>
          <AppText variant="muted">
            Plan schoolwork, choose a useful study method, and grow a cozy
            garden—without an account or judgmental reminders.
          </AppText>
          <Field
            label="Nickname (optional)"
            value={nickname}
            onChangeText={setNickname}
            placeholder="What should Sprig call you?"
            autoCapitalize="words"
          />
          <AppButton
            onPress={() => setStep(1)}
            icon={
              <Ionicons name="arrow-forward" size={17} color={colors.ink} />
            }
          >
            Make it mine
          </AppButton>
        </View>
      ) : null}
      {step === 1 ? (
        <View style={styles.block}>
          <AppText variant="eyebrow">A quick fit</AppText>
          <AppText variant="h1">What does school look like right now?</AppText>
          <AppText variant="muted">This stays only on your device.</AppText>
          <AppText variant="small" style={styles.label}>
            Grade
          </AppText>
          <View style={styles.wrap}>
            {(["8", "9", "10", "11", "12", "Other"] as GradeLevel[]).map(
              (item) => (
                <Pill
                  key={item}
                  label={item === "Other" ? item : `Grade ${item}`}
                  selected={grade === item}
                  onPress={() => setGrade(item)}
                />
              ),
            )}
          </View>
          <AppText variant="small" style={styles.label}>
            A comfortable study session
          </AppText>
          <View style={styles.wrap}>
            {[15, 25, 35, 45].map((item) => (
              <Pill
                key={item}
                label={`${item} min`}
                selected={minutes === item}
                onPress={() => setMinutes(item)}
                color={colors.violet}
              />
            ))}
          </View>
          <AppButton onPress={() => setStep(2)}>Continue</AppButton>
        </View>
      ) : null}
      {step === 2 ? (
        <View style={styles.block}>
          <AppText variant="eyebrow">Your direction</AppText>
          <AppText variant="h1">What would make studying feel better?</AppText>
          <AppText variant="muted">
            Choose any that matter. You can change these later.
          </AppText>
          <View style={styles.goalList}>
            {[
              "Stay ahead of assignments",
              "Prepare calmly for exams",
              "Remember what I learn",
              "Find better resources",
              "Build a study routine",
            ].map((goal) => (
              <Pill
                key={goal}
                label={goal}
                selected={goals.includes(goal)}
                onPress={() => toggleGoal(goal)}
              />
            ))}
          </View>
          <AppButton onPress={complete}>Enter Orbit Garden</AppButton>
        </View>
      ) : null}
    </Screen>
  );
}
const styles = StyleSheet.create({
  content: { justifyContent: "center", minHeight: "100%", paddingTop: 20 },
  skip: { alignSelf: "flex-end", padding: 10 },
  hero: { alignItems: "center" },
  steps: { flexDirection: "row", gap: 7 },
  dot: { width: 7, height: 7, borderRadius: 7, backgroundColor: colors.faint },
  dotActive: { width: 24, backgroundColor: colors.mint },
  block: { gap: 18, marginTop: 18 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  goalList: { gap: 9, alignItems: "flex-start" },
  label: { color: colors.cream, fontWeight: "700", marginBottom: -8 },
});
