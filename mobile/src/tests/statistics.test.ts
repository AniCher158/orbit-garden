import { calculateStatistics } from "@/src/lib/stats";
import type { StudySession } from "@/src/types";
const session = (
  id: string,
  completedAt: string,
  demo = false,
): StudySession => ({
  id,
  courseId: "c1",
  topic: "",
  goal: "Study",
  methodId: "pomodoro",
  plannedMinutes: 25,
  actualMinutes: 25,
  completedAt,
  notes: "",
  attempted: 10,
  stardustEarned: 60,
  demo,
});
test("statistics calculate totals and streaks without demos", () => {
  const stats = calculateStatistics(
    [
      session("1", "2026-07-11T12:00:00Z"),
      session("2", "2026-07-12T12:00:00Z"),
      session("3", "2026-07-13T12:00:00Z"),
      session("d", "2026-07-13T12:00:00Z", true),
    ],
    2,
    new Date("2026-07-13T18:00:00Z"),
  );
  expect(stats.totalMinutes).toBe(75);
  expect(stats.currentStreak).toBe(3);
  expect(stats.longestStreak).toBe(3);
  expect(stats.questionsAttempted).toBe(30);
});
