import { categories, type FocusSession, type UserStatistics } from '../types';
import { rarityOrder } from './planetGenerator';

const dayKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export function calculateStatistics(sessions: FocusSession[], now = new Date()): UserStatistics {
  const real = sessions.filter((s) => !s.demo);
  const byCategory = Object.fromEntries(categories.map((c) => [c, 0])) as UserStatistics['byCategory'];
  real.forEach((s) => { byCategory[s.category] += s.durationMinutes; });
  const uniqueDays = [...new Set(real.map((s) => dayKey(new Date(s.completedAt))))].map((key) => {
    const [year, month, day] = key.split('-').map(Number); return new Date(year, month, day);
  }).sort((a, b) => a.getTime() - b.getTime());
  let longestStreak = uniqueDays.length ? 1 : 0;
  let run = longestStreak;
  for (let i = 1; i < uniqueDays.length; i += 1) {
    const gap = Math.round((uniqueDays[i].getTime() - uniqueDays[i - 1].getTime()) / 86400000);
    run = gap === 1 ? run + 1 : 1;
    longestStreak = Math.max(longestStreak, run);
  }
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let currentStreak = 0;
  for (let i = uniqueDays.length - 1; i >= 0; i -= 1) {
    const expected = new Date(today); expected.setDate(today.getDate() - currentStreak);
    const gap = Math.round((expected.getTime() - uniqueDays[i].getTime()) / 86400000);
    if (gap === 0) currentStreak += 1;
    else if (currentStreak === 0 && gap === 1) { currentStreak = 1; today.setDate(today.getDate() - 1); }
    else break;
  }
  const weeklyMinutes = Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(now); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - (6 - offset));
    return real.filter((s) => dayKey(new Date(s.completedAt)) === dayKey(date)).reduce((sum, s) => sum + s.durationMinutes, 0);
  });
  const rarestPlanet = [...real].sort((a, b) => rarityOrder.indexOf(b.planet.rarity) - rarityOrder.indexOf(a.planet.rarity))[0]?.planet;
  return { totalMinutes: real.reduce((sum, s) => sum + s.durationMinutes, 0), totalSessions: real.length, planets: real.length, currentStreak, longestStreak, byCategory, weeklyMinutes, rarestPlanet };
}
