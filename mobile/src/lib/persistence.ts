import type { AppData } from "@/src/types";

export function isValidAppData(value: unknown): value is AppData {
  return Boolean(
    value &&
    typeof value === "object" &&
    Number((value as AppData).version) >= 1 &&
    Array.isArray((value as AppData).courses) &&
    Array.isArray((value as AppData).assignments) &&
    Array.isArray((value as AppData).sessions),
  );
}
export function parseAppData(raw: string): AppData | null {
  try {
    const value = JSON.parse(raw);
    return isValidAppData(value) ? value : null;
  } catch {
    return null;
  }
}
export function migrateAppData(
  value: Partial<AppData>,
  defaults: AppData,
): AppData {
  return {
    ...defaults,
    ...value,
    version: 2,
    profile: { ...defaults.profile, ...(value.profile ?? {}) },
    garden: {
      ...defaults.garden,
      ...(value.garden ?? {}),
      equipped: {
        ...defaults.garden.equipped,
        ...(value.garden?.equipped ?? {}),
      },
    },
    settings: { ...defaults.settings, ...(value.settings ?? {}) },
    activeSession: value.activeSession ?? null,
  };
}
