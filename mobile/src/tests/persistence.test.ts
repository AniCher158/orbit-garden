import { migrateAppData, parseAppData } from "@/src/lib/persistence";
import type { AppData } from "@/src/types";
const profile = {
  nickname: "",
  grade: "9" as const,
  preferredMinutes: 25,
  goals: [],
  tests: [],
  onboarded: false,
};
const defaults: AppData = {
  version: 2,
  profile,
  courses: [],
  assignments: [],
  sessions: [],
  activeSession: null,
  reviews: [],
  mistakes: [],
  bookmarks: [],
  garden: { stardust: 0, level: 1, inventory: [], equipped: {} },
  settings: {
    reducedMotion: false,
    highContrast: false,
    haptics: true,
    defaultAudioId: "none",
    volume: 0.45,
    continueAudioOnBreak: true,
  },
};
test("corrupted data safely falls back", () =>
  expect(parseAppData("{broken")).toBeNull());
test("storage migration fills new settings and keeps data", () => {
  const migrated = migrateAppData(
    {
      version: 1 as never,
      courses: [],
      assignments: [],
      sessions: [],
      profile: { ...profile, nickname: "Nova" },
    },
    defaults,
  );
  expect(migrated.version).toBe(2);
  expect(migrated.profile.nickname).toBe("Nova");
  expect(migrated.settings.defaultAudioId).toBe("none");
});
