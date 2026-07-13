import { categories, type Achievement, type FocusSession } from '../types';

export function getAchievements(sessions: FocusSession[]): Achievement[] {
  const real = sessions.filter((s) => !s.demo);
  const count = (category: string) => real.filter((s) => s.category === category).length;
  const definitions: Array<[string, string, string, boolean]> = [
    ['first-light', 'First Light', 'Complete your first focus session', real.length >= 1],
    ['scholar', 'Planetary Scholar', 'Complete five School sessions', count('School') >= 5],
    ['code-comet', 'Code Comet', 'Complete five Coding sessions', count('Coding') >= 5],
    ['gardener', 'Solar Gardener', 'Collect ten planets', real.length >= 10],
    ['deep-focus', 'Deep Focus', 'Complete a session of at least 45 minutes', real.some((s) => s.durationMinutes >= 45)],
    ['variety', 'Cosmic Variety', 'Focus in every category', categories.every((c) => count(c) > 0)],
  ];
  return definitions.map(([id, title, description, unlocked]) => ({ id, title, description, unlocked }));
}
