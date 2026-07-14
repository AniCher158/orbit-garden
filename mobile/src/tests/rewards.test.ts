import {
  completeSessionReward,
  purchaseReward,
  stardustForMinutes,
} from "@/src/lib/rewards";
import type { GardenState, StudySession } from "@/src/types";
const garden: GardenState = {
  stardust: 0,
  level: 1,
  inventory: [],
  equipped: {},
};
const session = (demo: boolean): StudySession => ({
  id: "s1",
  courseId: "c1",
  topic: "",
  goal: "Review",
  methodId: "active-recall",
  plannedMinutes: 25,
  actualMinutes: 25,
  completedAt: "2026-07-13",
  notes: "",
  stardustEarned: 0,
  demo,
});
test("real sessions earn Stardust and inventory", () => {
  const result = completeSessionReward(session(false), garden);
  expect(result.garden.stardust).toBe(stardustForMinutes(25));
  expect(result.garden.inventory).toHaveLength(1);
});
test("demo sessions are completely isolated", () => {
  const result = completeSessionReward(session(true), garden);
  expect(result.garden).toBe(garden);
  expect(result.garden.inventory).toHaveLength(0);
});
test("shop purchases require enough Stardust", () => {
  expect(purchaseReward(garden, "x", 10)).toBe(garden);
  const rich = { ...garden, stardust: 20 };
  expect(purchaseReward(rich, "x", 10).stardust).toBe(10);
});
