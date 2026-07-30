import type { GameConfig } from '../content/gameConfig'
import { gameConfig } from '../content/gameConfig'
import { unallocatedCash } from '../engine'
import type { GameState } from './types'

/**
 * Hydrates the initial game state from the Approved Provisional DEC-010
 * configuration (docs/DECISIONS.md DEC-010). Only fields DEC-010 actually
 * resolves are pre-assigned here; everything determined by player action
 * or engine calculation during the round remains null/empty, per
 * docs/DEMO_SPEC.md §13.
 *
 * `unallocatedCashCents` reuses the engine's own `unallocatedCash`
 * function rather than duplicating the subtraction — the engine remains
 * the only owner of financial calculations.
 */
export function createInitialGameState(config: GameConfig): GameState {
  return {
    currentScreen: 'start',
    currentScreenState: null,
    tutorialStep: 0,
    tutorialCompletedForSession: false,
    viewedIndicatorIds: [],
    startingCashCents: config.startingCashCents,
    availableCashCents: config.startingCashCents,
    sectorAllocationsCents: {},
    totalAllocatedCents: 0,
    unallocatedCashCents: unallocatedCash(config.startingCashCents, 0),
    scriptedSectorRates: {
      technology: config.sectors.technology.resolvedRate,
      healthCare: config.sectors.healthCare.resolvedRate,
      everydayGoods: config.sectors.everydayGoods.resolvedRate,
      energy: config.sectors.energy.resolvedRate,
    },
    sectorResultsCents: null,
    totalMarketChangeCents: null,
    cashAfterMarketCents: null,
    playerBidCents: null,
    scriptedOpponentBidCents: config.property.scriptedOpponentBidCents,
    propertyWon: null,
    winningBidCents: null,
    grossPropertyIncomeCents: config.property.grossRentalIncomeCents,
    operatingCostCents: config.property.operatingCostCents,
    netPropertyResultCents: null,
    endingCashCents: null,
    propertyCarryingValueCents: null,
    endingPositionCents: null,
    roundChangeCents: null,
    coachMessageId: 'coach-intro',
    timeOfDayState: 'morning',
  }
}

export const initialGameState: GameState = createInitialGameState(gameConfig)
