import { scheduleReview } from "@/src/lib/review";
import { generateStudyPlan } from "@/src/lib/studyPlan";
test("spaced review schedules a stable interval", () => {
  expect(scheduleReview(new Date("2026-07-13T12:00:00Z"), "week")).toBe(
    "2026-07-20T12:00:00.000Z",
  );
});
test("study plan stages progress and avoid selected rest days", () => {
  const blocks = generateStudyPlan(
    new Date("2026-09-13"),
    140,
    [0],
    new Date("2026-07-13"),
  );
  expect(blocks.length).toBeGreaterThan(3);
  expect(
    blocks.every((block) => new Date(block.scheduledAt).getDay() !== 0),
  ).toBe(true);
  expect(blocks[0].title).toBe("Diagnose");
});
