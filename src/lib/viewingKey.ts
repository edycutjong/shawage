export const DEMO_VIEWING_KEY = 'UMBRA-VIEW-KEY-2026';

export function verifyViewingKey(key: string): boolean {
  return key === DEMO_VIEWING_KEY;
}

// In production this would derive a cryptographic key scoped to the given parameters.
// For the demo it returns the universal key — the scoping metadata is recorded but not enforced cryptographically.
export function generateScopedViewingKey(opts?: {
  employeeFilter?: string[];
  periodStart?: string;
  periodEnd?: string;
}): string {
  void opts;
  return DEMO_VIEWING_KEY;
}
