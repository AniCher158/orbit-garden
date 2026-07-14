import { useEffect, useRef, useState } from "react";
import { Alert, AppState, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Svg, { Circle } from "react-native-svg";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Sprig } from "@/src/components/Sprig";
import { SessionAudio } from "@/src/components/SessionAudio";
import { restoreRemaining, transitionPomodoro } from "@/src/lib/timer";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors } from "@/src/theme";

export default function TimerScreen() {
  const active = useOrbitStore((state) => state.activeSession);
  const update = useOrbitStore((state) => state.updateActiveSession);
  const setActive = useOrbitStore((state) => state.setActiveSession);
  const settings = useOrbitStore((state) => state.settings);
  const courses = useOrbitStore((state) => state.courses);
  const [remaining, setRemaining] = useState(() =>
    active ? restoreRemaining(active) : 0,
  );
  const completing = useRef(false);
  useEffect(() => {
    if (!active?.id || completing.current) return;
    const tick = () => {
      const current = useOrbitStore.getState().activeSession;
      if (!current || current.id !== active.id) return;
      const next = restoreRemaining(current);
      setRemaining(next);
      if (next === 0 && !completing.current) {
        if (current.pomodoro) {
          const nextPhase = transitionPomodoro(current.pomodoro);
          const finalBreakFinished = current.pomodoro.phase === "long-break";
          if (!finalBreakFinished) {
            const seconds =
              nextPhase.phase === "focus"
                ? nextPhase.focusSeconds
                : nextPhase.phase === "break"
                  ? nextPhase.breakSeconds
                  : nextPhase.longBreakSeconds;
            update({
              pomodoro: nextPhase,
              totalSeconds: seconds,
              remainingSeconds: seconds,
              endAt: Date.now() + seconds * 1000,
            });
            setRemaining(seconds);
            if (settings.haptics)
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );
            return;
          }
        }
        completing.current = true;
        if (settings.haptics)
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace("/study/complete");
      }
    };
    tick();
    const timer = setInterval(tick, 250);
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") tick();
    });
    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, [
    active?.endAt,
    active?.id,
    active?.paused,
    active?.pomodoro?.phase,
    active?.pomodoro?.round,
    settings.haptics,
    update,
  ]);
  if (!active)
    return (
      <Screen contentStyle={styles.center}>
        <AppText variant="h2">No session is running.</AppText>
        <AppButton onPress={() => router.replace("/(tabs)/study")}>
          Choose a study session
        </AppButton>
      </Screen>
    );
  const course = courses.find((item) => item.id === active.courseId);
  const progress = 1 - remaining / active.totalSeconds;
  const circumference = 2 * Math.PI * 88;
  const time = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  const togglePause = () => {
    if (active.paused)
      update({ paused: false, endAt: Date.now() + remaining * 1000 });
    else update({ paused: true, endAt: null, remainingSeconds: remaining });
  };
  const cancel = () =>
    Alert.alert(
      "End this session?",
      "Canceled sessions do not create journal entries or rewards.",
      [
        { text: "Keep studying", style: "cancel" },
        {
          text: "End session",
          style: "destructive",
          onPress: () => {
            setActive(null);
            router.replace("/(tabs)/study");
          },
        },
      ],
    );
  return (
    <Screen scroll={false} contentStyle={styles.center}>
      <View style={styles.meta}>
        <AppText variant="eyebrow">
          {active.demo
            ? "10-second demo"
            : active.pomodoro
              ? `${active.pomodoro.phase.replace("-", " ")} · round ${active.pomodoro.round}/${active.pomodoro.totalRounds}`
              : "Focus in progress"}
        </AppText>
        <AppText variant="h2" style={styles.centerText}>
          {active.goal}
        </AppText>
        <AppText variant="small">
          {course?.name ?? "Demo course"}
          {active.topic ? ` · ${active.topic}` : ""}
        </AppText>
      </View>
      <View style={styles.ring}>
        <Svg width="240" height="240" viewBox="0 0 200 200">
          <Circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="rgba(255,255,255,.07)"
            strokeWidth="4"
          />
          <Circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke={
              active.pomodoro?.phase.includes("break")
                ? colors.violet
                : colors.mint
            }
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform="rotate(-90 100 100)"
          />
        </Svg>
        <View style={styles.ringInner}>
          <AppText variant="tabular">{time}</AppText>
          <AppText variant="small">
            {active.paused ? "orbit paused" : "remaining"}
          </AppText>
        </View>
      </View>
      <Sprig
        size={150}
        state={
          active.pomodoro?.phase.includes("break")
            ? "idle"
            : active.methodId === "coding"
              ? "typing"
              : active.methodId === "writing"
                ? "writing"
                : "reading"
        }
      />
      <AppText variant="muted" style={styles.message}>
        {active.paused
          ? "Take your time. Resume when you’re ready."
          : active.pomodoro?.phase.includes("break")
            ? "Look away, stretch, and let your mind reset."
            : "Stay with this one clear goal. Sprig is studying beside you."}
      </AppText>
      <SessionAudio trackId={active.audioId} active={!active.paused} />
      <View style={styles.controls}>
        <AppButton
          onPress={togglePause}
          icon={
            <Ionicons
              name={active.paused ? "play" : "pause"}
              size={18}
              color={colors.ink}
            />
          }
        >
          {active.paused ? "Resume" : "Pause"}
        </AppButton>
        <AppButton variant="secondary" onPress={cancel}>
          Cancel
        </AppButton>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", paddingBottom: 24 },
  meta: { alignItems: "center", gap: 5, maxWidth: 500 },
  centerText: { textAlign: "center" },
  ring: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  ringInner: { position: "absolute", alignItems: "center" },
  message: { textAlign: "center", maxWidth: 360, marginBottom: 16 },
  controls: { flexDirection: "row", gap: 10, marginTop: 18 },
});
