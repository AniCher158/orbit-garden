import type { ActiveSession, PomodoroState } from "@/src/types";

export function restoreRemaining(session: ActiveSession, now = Date.now()) {
  if (session.paused || !session.endAt) return session.remainingSeconds;
  return Math.max(0, Math.ceil((session.endAt - now) / 1000));
}

export function transitionPomodoro(state: PomodoroState): PomodoroState {
  if (state.phase === "focus") {
    const isLast = state.round >= state.totalRounds;
    return { ...state, phase: isLast ? "long-break" : "break" };
  }
  return {
    ...state,
    phase: "focus",
    round: Math.min(state.totalRounds, state.round + 1),
  };
}

export function createActiveSession(
  input: Omit<
    ActiveSession,
    "id" | "startedAt" | "endAt" | "paused" | "remainingSeconds"
  >,
  now = Date.now(),
): ActiveSession {
  return {
    ...input,
    id: `active-${now}`,
    startedAt: now,
    endAt: now + input.totalSeconds * 1000,
    paused: false,
    remainingSeconds: input.totalSeconds,
  };
}
