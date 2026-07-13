import { generatePlanet } from '../lib/planetGenerator';
import type { Category, FocusSession } from '../types';

const samples: Array<[string, Category, number, string, number]> = [
  ['Build a tiny game', 'Coding', 45, '2026-07-07T15:00:00.000Z', 21001],
  ['Read The Hobbit', 'Reading', 25, '2026-07-08T19:00:00.000Z', 21002],
  ['Algebra practice', 'School', 60, '2026-07-09T14:00:00.000Z', 21003],
  ['Sketch character ideas', 'Creative', 35, '2026-07-10T20:00:00.000Z', 21004],
  ['Evening yoga', 'Exercise', 15, '2026-07-11T22:00:00.000Z', 21005],
  ['Journal and reset', 'Personal', 25, '2026-07-12T16:00:00.000Z', 21006],
];

export const demoSessions: FocusSession[] = samples.map(([taskName, category, durationMinutes, completedAt, seed], index) => ({
  id: `demo-${index}`,
  taskName, category, durationMinutes, completedAt, demo: true,
  planet: generatePlanet({ taskName, category, durationMinutes, completedAt }, seed),
}));
