/**
 * Mirrors the required application state listed in docs/DEMO_SPEC.md §13.
 *
 * Fields that docs/DECISIONS.md DEC-010 now resolves (starting cash,
 * available cash, unallocated cash, scripted sector rates, scripted
 * opponent bid, gross property income, operating cost) are hydrated from
 * the Approved Provisional configuration in src/content/gameConfig.ts —
 * see src/state/initialState.ts. Fields determined only by player action
 * or engine calculation during the round remain null/empty until then.
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

/**
 * The seven documented time-of-day values (docs/DEMO_SPEC.md §10). Kept
 * here as the single canonical definition — src/content/timeOfDay.ts
 * imports this type rather than duplicating the union.
 */
export type TimeOfDay = 'morning' | 'daytime' | 'afternoon' | 'dusk' | 'early evening' | 'night' | 'late night'

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
  timeOfDayState: TimeOfDay
  /** True once EXIT has been applied from Round Summary ("End of demo"). */
  hasEnded: boolean
}
