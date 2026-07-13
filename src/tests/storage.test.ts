import { describe, expect, it } from 'vitest';
import { parseStoredData } from '../lib/storage';

describe('parseStoredData', () => {
  it('falls back safely for corrupt JSON', () => expect(parseStoredData('{nope')).toEqual({ version: 1, sessions: [] }));
  it('falls back for unsupported versions', () => expect(parseStoredData(JSON.stringify({ version: 7, sessions: [] }))).toEqual({ version: 1, sessions: [] }));
  it('keeps valid versioned data', () => {
    const data = { version: 1 as const, sessions: [] };
    expect(parseStoredData(JSON.stringify(data))).toEqual(data);
  });
});
