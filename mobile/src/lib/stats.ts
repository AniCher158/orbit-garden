import type { Statistics, StudySession } from "@/src/types";

const key = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
export function calculateStatistics(
  sessions: StudySession[],
  reviewsCompleted = 0,
  now = new Date(),
): Statistics {
  const real = sessions.filter((session) => !session.demo);
  const byCourse: Record<string, number> = {};
  const byMethod: Statistics["byMethod"] = {};
  real.forEach((session) => {
    byCourse[session.courseId] =
      (byCourse[session.courseId] ?? 0) + session.actualMinutes;
    byMethod[session.methodId] =
      (byMethod[session.methodId] ?? 0) + session.actualMinutes;
  });
  const dates = [
    ...new Set(real.map((session) => key(new Date(session.completedAt)))),
  ]
    .map((value) => new Date(value.replace(/-/g, "/")))
    .sort((a, b) => a.getTime() - b.getTime());
  let longestStreak = dates.length ? 1 : 0;
  let run = longestStreak;
  for (let i = 1; i < dates.length; i += 1) {
    const gap = Math.round(
      (dates[i].getTime() - dates[i - 1].getTime()) / 86400000,
    );
    run = gap === 1 ? run + 1 : 1;
    longestStreak = Math.max(longestStreak, run);
  }
  let currentStreak = 0;
  const daySet = new Set(
    real.map((session) => key(new Date(session.completedAt))),
  );
  const cursor = new Date(now);
  cursor.setHours(0, 0, 0, 0);
  if (!daySet.has(key(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (daySet.has(key(cursor))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 6);
  weekAgo.setHours(0, 0, 0, 0);
  const totalMinutes = real.reduce(
    (sum, session) => sum + session.actualMinutes,
    0,
  );
  return {
    totalMinutes,
    weeklyMinutes: real
      .filter((session) => new Date(session.completedAt) >= weekAgo)
      .reduce((sum, session) => sum + session.actualMinutes, 0),
    sessions: real.length,
    averageMinutes: real.length ? Math.round(totalMinutes / real.length) : 0,
    byCourse,
    byMethod,
    currentStreak,
    longestStreak,
    reviewsCompleted,
    questionsAttempted: real.reduce(
      (sum, session) => sum + (session.attempted ?? 0),
      0,
    ),
  };
}
