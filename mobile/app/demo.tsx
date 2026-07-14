import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Card } from "@/src/components/ui/Card";
import { Pill } from "@/src/components/ui/Pill";
import { GardenScene } from "@/src/components/GardenScene";
import { demoCourses, demoData } from "@/src/data/demoData";
import { audioTracks } from "@/src/data/audioTracks";
import { createActiveSession } from "@/src/lib/timer";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors } from "@/src/theme";

export default function DemoScreen() {
  const active = useOrbitStore((state) => state.activeSession);
  const setActive = useOrbitStore((state) => state.setActiveSession);
  const [courseId, setCourseId] = useState(demoCourses[0].id);
  const [methodId, setMethodId] = useState<"pomodoro" | "active-recall">(
    "active-recall",
  );
  const [audioId, setAudioId] = useState("quiet-observatory");
  const start = () => {
    setActive(
      createActiveSession({
        courseId,
        topic: "Cell signaling pathways",
        goal: "Recall the steps of a signal transduction pathway",
        methodId,
        plannedMinutes: 1,
        totalSeconds: 10,
        demo: true,
        audioId,
      }),
    );
    router.replace("/study/timer");
  };
  return (
    <Screen>
      <View style={styles.banner}>
        <Ionicons name="sparkles" color={colors.gold} size={18} />
        <View style={styles.flex}>
          <AppText variant="h3">Demo Student</AppText>
          <AppText variant="small">
            Sample data is clearly isolated and never changes your real
            progress.
          </AppText>
        </View>
      </View>
      <GardenScene garden={demoData.garden!} compact demo />
      <AppText variant="eyebrow" style={styles.top}>
        Reviewer quick loop
      </AppText>
      <AppText variant="h1">Grow a study reward in 10 seconds</AppText>
      <AppText variant="muted">
        Choose a course, method, and original soundscape. You’ll watch Sprig
        study, earn an item, and preview it in the developed demo garden.
      </AppText>
      <View style={styles.block}>
        <AppText variant="small" style={styles.label}>
          Example course
        </AppText>
        <View style={styles.wrap}>
          {demoCourses.slice(0, 4).map((course) => (
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
          Method
        </AppText>
        <View style={styles.wrap}>
          <Pill
            label="Pomodoro"
            selected={methodId === "pomodoro"}
            onPress={() => setMethodId("pomodoro")}
          />
          <Pill
            label="Active Recall"
            selected={methodId === "active-recall"}
            onPress={() => setMethodId("active-recall")}
          />
        </View>
        <AppText variant="small" style={styles.label}>
          Sound
        </AppText>
        <View style={styles.wrap}>
          {audioTracks
            .filter((track) => track.asset)
            .map((track) => (
              <Pill
                key={track.id}
                label={track.name}
                selected={audioId === track.id}
                onPress={() => setAudioId(track.id)}
                color={colors.blue}
              />
            ))}
        </View>
        <AppButton
          disabled={Boolean(active && !active.demo)}
          onPress={start}
          icon={<Ionicons name="play" size={17} color={colors.ink} />}
        >
          {active && !active.demo
            ? "Finish your real session first"
            : "Start 10-second demo"}
        </AppButton>
      </View>
      <Card style={styles.profile}>
        <AppText variant="h3">Demo profile includes</AppText>
        <AppText variant="small">
          6 courses · 2 AP classes · 3 upcoming assignments · 1 review topic ·
          curated resources · level 4 garden
        </AppText>
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(243,200,117,.25)",
    backgroundColor: "rgba(243,200,117,.07)",
    borderRadius: 16,
    marginBottom: 14,
  },
  flex: { flex: 1, gap: 2 },
  top: { marginTop: 20 },
  block: { gap: 14, marginTop: 22 },
  label: { color: colors.cream, fontWeight: "700", marginBottom: -7 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  profile: { marginTop: 22, gap: 5 },
});
