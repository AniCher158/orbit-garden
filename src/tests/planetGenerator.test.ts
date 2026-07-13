import { describe, expect, it } from 'vitest';
import { generatePlanet } from '../lib/planetGenerator';

describe('generatePlanet', () => {
  it('returns the exact same planet for the same seed', () => {
    const session = { taskName: 'Learn fractions', category: 'School' as const, durationMinutes: 25, completedAt: '2026-07-13T12:00:00.000Z' };
    expect(generatePlanet(session, 42)).toEqual(generatePlanet(session, 42));
  });

  it('uses duration to make longer focus sessions larger', () => {
    const base = { taskName: 'Read', category: 'Reading' as const, completedAt: '2026-07-13T12:00:00.000Z' };
    expect(generatePlanet({ ...base, durationMinutes: 60 }, 99).traits.size).toBeGreaterThan(generatePlanet({ ...base, durationMinutes: 5 }, 99).traits.size);
  });
});
