import { useCallback, useEffect, useState } from 'react';
import type { FocusSession } from '../types';
import { loadSessions, saveSessions } from '../lib/storage';

export function useGarden() {
  const [sessions, setSessions] = useState<FocusSession[]>(() => loadSessions());
  useEffect(() => saveSessions(sessions), [sessions]);
  const addSession = useCallback((session: FocusSession) => setSessions((items) => [session, ...items]), []);
  const deleteSession = useCallback((id: string) => setSessions((items) => items.filter((item) => item.id !== id)), []);
  const updateNote = useCallback((id: string, note: string) => setSessions((items) => items.map((item) => item.id === id ? { ...item, planet: { ...item.planet, note } } : item)), []);
  return { sessions, addSession, deleteSession, updateNote };
}
