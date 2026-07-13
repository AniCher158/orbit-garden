import type { Category, FocusSession, Planet, PlanetTraits, Rarity } from '../types';

const themes: Record<Category, [string, string, string][]> = {
  School: [['#274c9b', '#7a8fe7', '#9ee7ed'], ['#253266', '#536ecb', '#d2d9ff']],
  Coding: [['#071c2d', '#0c7c86', '#49f2d0'], ['#161539', '#6a4de6', '#65e3ff']],
  Reading: [['#5b315b', '#b06787', '#f2c98d'], ['#432b56', '#8660a8', '#e8c4dc']],
  Creative: [['#703c83', '#ef6976', '#ffc868'], ['#1f6f78', '#e15b86', '#f4cf75']],
  Exercise: [['#285a48', '#61b95b', '#f09a43'], ['#843a32', '#de6e3d', '#ffd15c']],
  Personal: [['#35536a', '#70a6a1', '#e4c6b6'], ['#4c456b', '#9a8fc0', '#d4e4d2']],
};

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const prefixes = ['Aurelia', 'Nova', 'Cinder', 'Moss', 'Lumen', 'Velvet', 'Solis', 'Echo', 'Iris', 'Juniper'];
const suffixes = ['Prime', 'Bloom', 'Vale', 'Drift', 'Haven', 'Minor', 'Fern', 'Glimmer', 'Arc', 'Song'];
const rarityRank: Rarity[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Cosmic'];

export function generatePlanet(input: Pick<FocusSession, 'taskName' | 'category' | 'durationMinutes' | 'completedAt'>, forcedSeed?: number): Planet {
  const seed = forcedSeed ?? hashString(`${input.taskName}|${input.category}|${input.durationMinutes}|${input.completedAt}`);
  const random = mulberry32(seed);
  const complexity = Math.min(input.durationMinutes / 60, 1);
  const paletteList = themes[input.category];
  const palette = paletteList[Math.floor(random() * paletteList.length)];
  const patterns: PlanetTraits['pattern'][] = ['bands', 'spots', 'continents', 'craters', 'waves'];
  const traits: PlanetTraits = {
    size: Math.round(72 + Math.min(input.durationMinutes, 60) * 0.72 + random() * 12),
    palette,
    pattern: patterns[Math.floor(random() * patterns.length)],
    rings: random() < 0.18 + complexity * 0.48,
    moons: random() < 0.25 + complexity * 0.45 ? 1 + (random() < complexity * 0.42 ? 1 : 0) : 0,
    atmosphere: random() < 0.48 + complexity * 0.35,
    aurora: random() < 0.04 + complexity * 0.25,
    vegetation: random() < 0.08 + complexity * 0.28,
    rotationSpeed: Number((8 + random() * 14).toFixed(2)),
  };
  const featureScore = Number(traits.rings) + traits.moons + Number(traits.atmosphere) + Number(traits.aurora) * 2 + Number(traits.vegetation);
  const score = complexity * 3 + featureScore * 0.55 + random();
  const rarity = rarityRank[score >= 6 ? 4 : score >= 4.5 ? 3 : score >= 3.1 ? 2 : score >= 1.7 ? 1 : 0];
  return {
    id: `planet-${seed}`,
    seed,
    name: `${prefixes[Math.floor(random() * prefixes.length)]} ${suffixes[Math.floor(random() * suffixes.length)]}`,
    rarity,
    traits,
    createdAt: input.completedAt,
  };
}

export const rarityOrder = rarityRank;
