/**
 * Mirrors the required application state listed in docs/DEMO_SPEC.md §13.
 *
 * Financial and content-dependent fields are typed as nullable and
 * initialised to `null`/empty, not to a placeholder number or string.
 * Phase 2 populates them from an approved GameConfig
 * (src/content/gameConfig.ts) — no fallback values are assigned here,
 * per DEC-008.
 */

export type ScreenId =
  | 'start'
  | 'coachTutorial'
  | 'marketIntelligence'
  | 'cityInvestmentDecision'
  | 'marketResult'
  | 'propertyOpportunity'
  | 'roundSummary'

export type PropertyScreenState = 'pre-submission' | 'post-submission'

export interface GameState {
  currentScreen: ScreenId
  currentScreenState: PropertyScreenState | null
  tutorialStep: number
  tutorialCompletedForSession: boolean
  viewedIndicatorIds: string[]
  startingCashCents: number | null
  availableCashCents: number | null
  sectorAllocationsCents: Record<string, number>
  totalAllocatedCents: number
  unallocatedCashCents: number | null
  scriptedSectorRates: Record<string, number> | null
  sectorResultsCents: Record<string, number> | null
  totalMarketChangeCents: number | null
  cashAfterMarketCents: number | null
  playerBidCents: number | null
  scriptedOpponentBidCents: number | null
  propertyWon: boolean | null
  winningBidCents: number | null
  grossPropertyIncomeCents: number | null
  operatingCostCents: number | null
  netPropertyResultCents: number | null
  endingCashCents: number | null
  propertyCarryingValueCents: number | null
  endingPositionCents: number | null
  roundChangeCents: number | null
  coachMessageId: string | null
  timeOfDayState: string
}

export const initialGameState: GameState = {
  currentScreen: 'start',
  currentScreenState: null,
  tutorialStep: 0,
  tutorialCompletedForSession: false,
  viewedIndicatorIds: [],
  startingCashCents: null,
  availableCashCents: null,
  sectorAllocationsCents: {},
  totalAllocatedCents: 0,
  unallocatedCashCents: null,
  scriptedSectorRates: null,
  sectorResultsCents: null,
  totalMarketChangeCents: null,
  cashAfterMarketCents: null,
  playerBidCents: null,
  scriptedOpponentBidCents: null,
  propertyWon: null,
  winningBidCents: null,
  grossPropertyIncomeCents: null,
  operatingCostCents: null,
  netPropertyResultCents: null,
  endingCashCents: null,
  propertyCarryingValueCents: null,
  endingPositionCents: null,
  roundChangeCents: null,
  coachMessageId: null,
  timeOfDayState: 'morning',
}
