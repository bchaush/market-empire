/**
 * Gameplay content and financial constants required to render Screens
 * 2-7. None of these are approved yet:
 *
 * - Starting cash, sector return rates, indicator-to-sector mapping,
 *   property values and the scripted opponent bid remain Provisional
 *   (docs/DEMO_SPEC.md §16, docs/DECISIONS.md DEC-008).
 * - Market-indicator wording and Coach financial terminology have not
 *   been written/approved.
 *
 * This module intentionally exports no concrete GameConfig instance.
 * Phase 2 must supply an approved value before any gameplay screen can
 * render; no fallback numbers or placeholder text are assigned here.
 */

export type SectorKey = 'technology' | 'healthCare' | 'everydayGoods' | 'energy'

export interface SectorConfig {
  label: string
  descriptionProvisional: string
  returnRate: number
}

export interface IndicatorConfig {
  id: string
  headline: string
  meaning: string
  sourceReference: string
}

export interface PropertyConfig {
  name: string
  type: string
  askingPriceCents: number
  grossRentalIncomeCents: number
  operatingCostCents: number
  scriptedOpponentBidCents: number
}

export type CoachScript = Record<string, string>

export interface GameConfig {
  startingCashCents: number
  sectors: Record<SectorKey, SectorConfig>
  indicators: IndicatorConfig[]
  property: PropertyConfig
  coachScript: CoachScript
}

/**
 * Throws rather than returning a default. See module comment above:
 * every field of GameConfig is currently unresolved, so there is no
 * fallback value that would not violate DEC-008.
 */
export function requireGameConfig(): GameConfig {
  throw new Error(
    'GameConfig is not yet available. Starting cash, sector rates, indicator ' +
      'text, property values, opponent bid and Coach terminology remain ' +
      'Provisional/unresolved (docs/DEMO_SPEC.md §16, docs/DECISIONS.md ' +
      'DEC-008). Do not assign fallback values here.',
  )
}
