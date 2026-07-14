import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { Card } from "@/src/components/ui/Card";
import { calculateStatistics } from "@/src/lib/stats";
import { studyMethods } from "@/src/data/studyMethods";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors, radius } from "@/src/theme";

export default function JournalScreen() {
  const { sessions, courses, reviews } = useOrbitStore();
  const stats = calculateStatistics(
    sessions,
    reviews.filter((item) => item.status === "completed").length,
  );
  return (
    <Screen>
      <AppText variant="muted">
        A record for reflection, not a scorecard.
      </AppText>
      <View style={styles.stats}>
        <Card style={styles.stat}>
          <Ionicons name="time-outline" color={colors.mint} size={20} />
          <AppText variant="h2">{stats.totalMinutes}m</AppText>
          <AppText variant="small">total study</AppText>
        </Card>
        <Card style={styles.stat}>
          <Ionicons name="calendar-outline" color={colors.violet} size={20} />
          <AppText variant="h2">{stats.weeklyMinutes}m</AppText>
          <AppText variant="small">this week</AppText>
        </Card>
        <Card style={styles.stat}>
          <Ionicons name="sparkles-outline" color={colors.gold} size={20} />
          <AppText variant="h2">{stats.sessions}</AppText>
          <AppText variant="small">sessions</AppText>
        </Card>
      </View>
      <View style={styles.list}>
        {sessions
          .filter((item) => !item.demo)
          .map((session) => {
            const course = courses.find((item) => item.id === session.courseId);
            const method = studyMethods.find(
              (item) => item.id === session.methodId,
            );
            return (
              <Card key={session.id} style={styles.entry}>
                <View
                  style={[
                    styles.icon,
                    { backgroundColor: `${course?.color ?? colors.violet}20` },
                  ]}
                >
                  <Ionicons
                    name="checkmark"
                    color={course?.color ?? colors.violet}
                    size={20}
                  />
                </View>
                <View style={styles.flex}>
                  <AppText variant="h3">{session.goal}</AppText>
                  <AppText variant="small">
                    {course?.name} · {method?.name} · {session.actualMinutes}{" "}
                    min
                  </AppText>
                  <AppText variant="small">
                    {new Date(session.completedAt).toLocaleDateString(
                      undefined,
                      { weekday: "short", month: "short", day: "numeric" },
                    )}
                  </AppText>
                  {session.notes ? (
                    <AppText variant="muted" style={styles.note}>
                      {session.notes}
                    </AppText>
                  ) : null}
                  {session.attempted !== undefined ? (
                    <AppText variant="small" color={colors.gold}>
                      {session.correct}/{session.attempted} practice questions
                      correct
                    </AppText>
                  ) : null}
                </View>
              </Card>
            );
          })}
        {stats.sessions === 0 ? (
          <Card style={styles.empty}>
            <Ionicons name="journal-outline" color={colors.faint} size={35} />
            <AppText variant="h3">Your first entry is ahead</AppText>
            <AppText variant="muted">
              Complete and collect a real study session to record it here.
            </AppText>
          </Card>
        ) : null}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  stats: { flexDirection: "row", gap: 8, marginVertical: 18 },
  stat: { flex: 1, padding: 13, gap: 4 },
  list: { gap: 10 },
  entry: { flexDirection: "row", gap: 12 },
  icon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1, gap: 3 },
  note: { marginTop: 7 },
  empty: { alignItems: "center", gap: 8 },
});
