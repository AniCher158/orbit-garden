import { describe, expect, it } from 'vitest';
import { getAchievements } from '../lib/achievements';
import { generatePlanet } from '../lib/planetGenerator';
import type { FocusSession } from '../types';

const session = (id: number, category: 'School' | 'Coding', durationMinutes = 25): FocusSession => {
  const base = { taskName: `Task ${id}`, category, durationMinutes, completedAt: `2026-07-${String(id + 1).padStart(2, '0')}T12:00:00Z` };
  return { id: String(id), ...base, planet: generatePlanet(base, id) };
};

describe('getAchievements', () => {
  it('unlocks first session and category milestones', () => {
    const achievements = getAchievements(Array.from({ length: 5 }, (_, i) => session(i, 'School')));
    expect(achievements.find((a) => a.id === 'first-light')?.unlocked).toBe(true);
    expect(achievements.find((a) => a.id === 'scholar')?.unlocked).toBe(true);
    expect(achievements.find((a) => a.id === 'code-comet')?.unlocked).toBe(false);
  });

  it('unlocks deep focus at 45 minutes', () => {
    expect(getAchievements([session(1, 'Coding', 45)]).find((a) => a.id === 'deep-focus')?.unlocked).toBe(true);
  });
});
