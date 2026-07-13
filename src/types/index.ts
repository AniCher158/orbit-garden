export const categories = ['School', 'Coding', 'Reading', 'Creative', 'Exercise', 'Personal'] as const;
export type Category = (typeof categories)[number];
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Cosmic';

export interface PlanetTraits {
  size: number;
  palette: [string, string, string];
  pattern: 'bands' | 'spots' | 'continents' | 'craters' | 'waves';
  rings: boolean;
  moons: number;
  atmosphere: boolean;
  aurora: boolean;
  vegetation: boolean;
  rotationSpeed: number;
}

export interface Planet {
  id: string;
  seed: number;
  name: string;
  rarity: Rarity;
  traits: PlanetTraits;
  createdAt: string;
  note?: string;
}

export interface FocusSession {
  id: string;
  taskName: string;
  category: Category;
  durationMinutes: number;
  completedAt: string;
  planet: Planet;
  demo?: boolean;
}

export interface ActiveTimerState {
  taskName: string;
  category: Category;
  durationMinutes: number;
  totalSeconds: number;
  remainingSeconds: number;
  isPaused: boolean;
  endTime: number | null;
  isDemo: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface UserStatistics {
  totalMinutes: number;
  totalSessions: number;
  planets: number;
  currentStreak: number;
  longestStreak: number;
  byCategory: Record<Category, number>;
  weeklyMinutes: number[];
  rarestPlanet?: Planet;
}

export interface StoredData { version: 1; sessions: FocusSession[] }
