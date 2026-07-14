import {
  createActiveSession,
  restoreRemaining,
  transitionPomodoro,
} from "@/src/lib/timer";

test("restores a backgrounded timer from its timestamp", () => {
  const active = createActiveSession(
    {
      courseId: "c",
      topic: "",
      goal: "study",
      methodId: "deep",
      plannedMinutes: 1,
      totalSeconds: 60,
      demo: false,
      audioId: "none",
    },
    1000,
  );
  expect(restoreRemaining(active, 31000)).toBe(30);
});
test("paused timers preserve their stored seconds", () => {
  const active = {
    ...createActiveSession(
      {
        courseId: "c",
        topic: "",
        goal: "study",
        methodId: "deep",
        plannedMinutes: 1,
        totalSeconds: 60,
        demo: false,
        audioId: "none",
      },
      1000,
    ),
    paused: true,
    remainingSeconds: 42,
    endAt: null,
  };
  expect(restoreRemaining(active, 999999)).toBe(42);
});
test("Pomodoro moves from focus to break and advances rounds", () => {
  const state = {
    round: 1,
    totalRounds: 4,
    phase: "focus" as const,
    focusSeconds: 1500,
    breakSeconds: 300,
    longBreakSeconds: 900,
  };
  const onBreak = transitionPomodoro(state);
  expect(onBreak.phase).toBe("break");
  expect(transitionPomodoro(onBreak)).toMatchObject({
    phase: "focus",
    round: 2,
  });
});
