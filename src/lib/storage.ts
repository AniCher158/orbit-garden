import type { ActiveTimerState, FocusSession, StoredData } from '../types';

export const STORAGE_KEY = 'orbit-garden:v1';
export const TIMER_KEY = 'orbit-garden:active-timer:v1';
const empty: StoredData = { version: 1, sessions: [] };

export function parseStoredData(raw: string | null): StoredData {
  if (!raw) return empty;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredData>;
    if (parsed.version !== 1 || !Array.isArray(parsed.sessions)) return empty;
    return { version: 1, sessions: parsed.sessions as FocusSession[] };
  } catch { return empty; }
}

export function loadSessions() { return parseStoredData(localStorage.getItem(STORAGE_KEY)).sessions; }
export function saveSessions(sessions: FocusSession[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, sessions })); }

export function loadTimer(): ActiveTimerState | null {
  try {
    const value = localStorage.getItem(TIMER_KEY);
    return value ? (JSON.parse(value) as ActiveTimerState) : null;
  } catch { return null; }
}
export function saveTimer(timer: ActiveTimerState | null) {
  if (timer) localStorage.setItem(TIMER_KEY, JSON.stringify(timer));
  else localStorage.removeItem(TIMER_KEY);
}
