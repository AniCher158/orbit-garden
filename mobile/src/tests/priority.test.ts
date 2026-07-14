import { prioritizeWork } from "@/src/lib/priority";
import type { Assignment, Course } from "@/src/types";

const course = {
  id: "c1",
  name: "Chemistry",
  category: "Science",
  level: "Honors",
  color: "#fff",
  icon: "flask",
  archived: false,
  isAP: false,
  topics: [],
  createdAt: "2026-01-01",
} as Course;
const assignment = (
  id: string,
  dueAt: string,
  priority: 1 | 2 | 3,
): Assignment => ({
  id,
  title: id,
  courseId: "c1",
  type: "Homework",
  dueAt,
  estimatedMinutes: 30,
  priority,
  difficulty: 2,
  notes: "",
  subtasks: [],
  completed: false,
  createdAt: "2026-01-01",
});
test("prioritizes urgent schoolwork and explains why", () => {
  const now = new Date("2026-07-13T12:00:00Z");
  const result = prioritizeWork(
    [
      assignment("later", "2026-07-20T12:00:00Z", 3),
      assignment("tomorrow", "2026-07-14T12:00:00Z", 2),
    ],
    [],
    [course],
    now,
  );
  expect(result?.assignment?.id).toBe("tomorrow");
  expect(result?.reason).toContain("Chemistry");
});
