import { describe, it, expect } from 'vitest';
import { verifyViewingKey, generateScopedViewingKey, DEMO_VIEWING_KEY } from '@/lib/viewingKey';

describe('DEMO_VIEWING_KEY', () => {
  it('has the expected format', () => {
    expect(DEMO_VIEWING_KEY).toMatch(/^UMBRA-VIEW-KEY-/);
  });

  it('is the known demo value', () => {
    expect(DEMO_VIEWING_KEY).toBe('UMBRA-VIEW-KEY-2026');
  });
});

describe('verifyViewingKey', () => {
  it('accepts the demo viewing key', () => {
    expect(verifyViewingKey(DEMO_VIEWING_KEY)).toBe(true);
  });

  it('accepts the hardcoded string value', () => {
    expect(verifyViewingKey('UMBRA-VIEW-KEY-2026')).toBe(true);
  });

  it('rejects an incorrect key', () => {
    expect(verifyViewingKey('WRONG-KEY')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(verifyViewingKey('')).toBe(false);
  });

  it('rejects a key with incorrect suffix', () => {
    expect(verifyViewingKey('UMBRA-VIEW-KEY-2025')).toBe(false);
  });
});

describe('generateScopedViewingKey', () => {
  it('returns a valid key that passes verification', () => {
    const key = generateScopedViewingKey({ employeeFilter: ['Alice'], periodStart: '2026-01-01' });
    expect(verifyViewingKey(key)).toBe(true);
  });

  it('returns the same key with no options', () => {
    const key = generateScopedViewingKey();
    expect(key).toBe(DEMO_VIEWING_KEY);
  });
});
