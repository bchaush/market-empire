/**
 * Presentation-only formatting helpers. No financial calculation happens
 * here — values are already computed by the engine (src/engine/) before
 * they reach these functions.
 */

export function formatCentsAsDollars(cents: number | null): string {
  if (cents === null) {
    return '—'
  }
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

/** Turns a camelCase identifier (e.g. a ScreenId) into a readable label, e.g. 'coachTutorial' -> 'Coach Tutorial'. */
export function humanizeIdentifier(value: string): string {
  const spaced = value.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}
