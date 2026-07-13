import { describe, expect, it } from 'vitest';
import { generatePlanet } from '../lib/planetGenerator';
import { calculateStatistics } from '../lib/stats';
import type { FocusSession } from '../types';

const makeSession = (id: string, date: string, minutes: number, category: 'School' | 'Coding' = 'School'): FocusSession => {
  const base = { taskName: id, category, durationMinutes: minutes, completedAt: date };
  return { id, ...base, planet: generatePlanet(base, Number(id)) };
};

describe('calculateStatistics', () => {
  it('totals minutes, categories, and streaks', () => {
    const sessions = [makeSession('1', '2026-07-11T12:00:00Z', 25), makeSession('2', '2026-07-12T12:00:00Z', 45, 'Coding'), makeSession('3', '2026-07-13T12:00:00Z', 15)];
    const stats = calculateStatistics(sessions, new Date('2026-07-13T18:00:00Z'));
    expect(stats.totalMinutes).toBe(85);
    expect(stats.byCategory.Coding).toBe(45);
    expect(stats.currentStreak).toBe(3);
    expect(stats.longestStreak).toBe(3);
  });

  it('does not count demo sessions', () => {
    const demo = { ...makeSession('4', '2026-07-13T12:00:00Z', 60), demo: true };
    expect(calculateStatistics([demo]).totalSessions).toBe(0);
  });
});
