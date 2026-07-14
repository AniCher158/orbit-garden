import type { StudyBlock } from "@/src/types";

const stages = [
  "Diagnose",
  "Review weak content",
  "Practice by unit",
  "Mixed practice",
  "Timed practice",
  "Analyze errors",
  "Final review",
];
export function generateStudyPlan(
  examDate: Date,
  minutesPerWeek: number,
  restDays: number[] = [0],
  now = new Date(),
): StudyBlock[] {
  const days = Math.max(
    1,
    Math.ceil((examDate.getTime() - now.getTime()) / 86400000),
  );
  const sessionsPerWeek = Math.max(
    2,
    Math.min(6, Math.ceil(minutesPerWeek / 35)),
  );
  const count = Math.max(2, Math.floor((days / 7) * sessionsPerWeek));
  const blocks: StudyBlock[] = [];
  for (let i = 0; i < count; i += 1) {
    const date = new Date(now);
    date.setDate(
      now.getDate() + Math.max(1, Math.round(((i + 1) * days) / (count + 1))),
    );
    while (restDays.includes(date.getDay())) date.setDate(date.getDate() + 1);
    blocks.push({
      id: `plan-${date.getTime()}-${i}`,
      title:
        stages[
          Math.min(stages.length - 1, Math.floor((i / count) * stages.length))
        ],
      scheduledAt: date.toISOString(),
      minutes: Math.max(
        20,
        Math.min(50, Math.round(minutesPerWeek / sessionsPerWeek)),
      ),
      completed: false,
    });
  }
  return blocks;
}
