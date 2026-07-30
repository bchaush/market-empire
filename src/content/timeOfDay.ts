import type { ScreenId, TimeOfDay } from '../state/types'

/**
 * Deterministic, purely visual day-to-night progression, copied verbatim
 * from docs/DEMO_SPEC.md §10. Never affects any calculation.
 *
 * This is the single, shared source of truth for these values — do not
 * duplicate them elsewhere. `src/state/transitions.ts` uses this map to
 * set `GameState.timeOfDayState` on every successful transition, and
 * `src/state/initialState.ts` uses it for the Start-screen default. The
 * shell displays the stored `GameState.timeOfDayState`, never a value
 * derived independently from `currentScreen`.
 */
export const screenTimeOfDay: Record<ScreenId, TimeOfDay> = {
  start: 'morning',
  coachTutorial: 'daytime',
  marketIntelligence: 'afternoon',
  cityInvestmentDecision: 'dusk',
  marketResult: 'early evening',
  propertyOpportunity: 'night',
  roundSummary: 'late night',
}
