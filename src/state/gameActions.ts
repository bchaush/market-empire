import type { SectorKey } from '../content/gameConfig'
import { tutorialTopics } from '../content/tutorialSteps'
import {
  cashAfterMarket,
  cashAfterProperty,
  endingPosition,
  netPropertyResult,
  propertyCarryingValue,
  resolveBid,
  roundChange,
  settleSector,
  totalMarketChange,
  unallocatedCash,
  validateAllocation,
  validateBid,
} from '../engine'
import { applyTransition } from './transitions'
import type { GameState } from './types'

/**
 * Screen-facing action functions. Every calculation here delegates to the
 * engine (src/engine/) or the transition layer (src/state/transitions.ts)
 * — this module only assembles their results into the next GameState. It
 * never recomputes an official result independently (docs/DEMO_SPEC.md
 * §14).
 */

export const SECTOR_KEYS: SectorKey[] = ['technology', 'healthCare', 'everydayGoods', 'energy']
export const TUTORIAL_STEP_COUNT = 1 + tutorialTopics.length

export interface ActionResult {
  state: GameState
  error: string | null
}

export function startDemo(state: GameState): GameState {
  return applyTransition(state, 'START_DEMO')
}

export function tutorialNext(state: GameState): GameState {
  if (state.tutorialStep >= TUTORIAL_STEP_COUNT - 1) {
    return { ...applyTransition(state, 'FINISH_TUTORIAL'), tutorialCompletedForSession: true }
  }
  return { ...state, tutorialStep: state.tutorialStep + 1 }
}

export function tutorialBack(state: GameState): GameState {
  return { ...state, tutorialStep: Math.max(0, state.tutorialStep - 1) }
}

export function tutorialSkip(state: GameState): GameState {
  return { ...applyTransition(state, 'SKIP_TUTORIAL'), tutorialCompletedForSession: true }
}

export function viewIndicator(state: GameState, indicatorId: string): GameState {
  if (state.viewedIndicatorIds.includes(indicatorId)) {
    return state
  }
  return { ...state, viewedIndicatorIds: [...state.viewedIndicatorIds, indicatorId] }
}

export function analyzeCity(state: GameState): GameState {
  return applyTransition(state, 'ANALYZE_CITY')
}

/**
 * Validates and applies a sector allocation via the engine's
 * `validateAllocation`. Invalid input (negative, or over available cash)
 * is rejected with an error and the state is returned unchanged — never
 * silently capped or corrected (docs/DEMO_SPEC.md §15).
 */
export function setAllocation(state: GameState, sector: SectorKey, allocationCents: number): ActionResult {
  if (!Number.isFinite(allocationCents) || allocationCents < 0) {
    return { state, error: 'Allocation cannot be negative.' }
  }

  const nextAllocations = { ...state.sectorAllocationsCents, [sector]: allocationCents }
  const availableCash = state.startingCashCents ?? 0
  const validation = validateAllocation(availableCash, Object.values(nextAllocations))

  if (!validation.valid) {
    return {
      state,
      error:
        validation.reason === 'negative-allocation'
          ? 'Allocation cannot be negative.'
          : 'This allocation would exceed your available cash. Lower the amount and try again.',
    }
  }

  return {
    state: {
      ...state,
      sectorAllocationsCents: nextAllocations,
      totalAllocatedCents: validation.totalAllocatedCents,
      unallocatedCashCents: validation.cashRemainingCents,
    },
    error: null,
  }
}

/**
 * Settles all four sectors via the engine's `settleSector`, sums the
 * result via `totalMarketChange`, and recombines unallocated cash with
 * the settled sector values via `cashAfterMarket` — matching
 * docs/finance/source-ledger.md's documented settlement relationship
 * exactly. `availableCashCents` becomes the post-market cash pool, which
 * is what Screen 6 bids against.
 */
export function confirmInvestments(state: GameState): GameState {
  const rates = state.scriptedSectorRates ?? {}
  const sectorResultsCents: Record<string, number> = {}
  const settledValues: number[] = []

  for (const sector of SECTOR_KEYS) {
    const allocationCents = state.sectorAllocationsCents[sector] ?? 0
    const rate = rates[sector] ?? 0
    const settlement = settleSector(allocationCents, rate)
    sectorResultsCents[sector] = settlement.sectorChangeCents
    settledValues.push(settlement.settledValueCents)
  }

  const totalMarketChangeCents = totalMarketChange(Object.values(sectorResultsCents))
  const unallocatedCashCents = unallocatedCash(state.startingCashCents ?? 0, state.totalAllocatedCents)
  const cashAfterMarketCents = cashAfterMarket(unallocatedCashCents, settledValues)

  const next = applyTransition(state, 'CONFIRM_INVESTMENTS')

  return {
    ...next,
    sectorResultsCents,
    totalMarketChangeCents,
    unallocatedCashCents,
    cashAfterMarketCents,
    availableCashCents: cashAfterMarketCents,
  }
}

export function continueToAuction(state: GameState): GameState {
  return applyTransition(state, 'CONTINUE_TO_AUCTION')
}

/**
 * Validates the bid via the engine's `validateBid`, resolves the outcome
 * via `resolveBid` (win only on a strictly higher bid than the scripted
 * opponent), and computes the resulting cash and property figures via
 * `netPropertyResult` and `cashAfterProperty` — covering all three
 * documented branches (below/equal/above) without reproducing any of
 * that arithmetic here.
 */
export function submitBid(state: GameState, bidCents: number): ActionResult {
  if (!Number.isFinite(bidCents) || bidCents < 0) {
    return { state, error: 'Bid cannot be negative.' }
  }

  const availableCash = state.availableCashCents ?? 0
  const validation = validateBid(availableCash, bidCents)

  if (!validation.valid) {
    return {
      state,
      error:
        validation.reason === 'negative-bid'
          ? 'Bid cannot be negative.'
          : 'This bid exceeds your available cash. Lower the amount and try again.',
    }
  }

  const opponentBidCents = state.scriptedOpponentBidCents ?? 0
  const outcome = resolveBid(bidCents, opponentBidCents)
  const grossIncome = state.grossPropertyIncomeCents ?? 0
  const operatingCost = state.operatingCostCents ?? 0
  const netResultCents = outcome.propertyWon ? netPropertyResult(grossIncome, operatingCost) : 0
  const cashBeforeBidCents = state.availableCashCents ?? 0
  const cashAfterPropertyCents = cashAfterProperty(cashBeforeBidCents, outcome, bidCents, netResultCents)

  const next = applyTransition(state, 'SUBMIT_BID')

  return {
    state: {
      ...next,
      playerBidCents: bidCents,
      propertyWon: outcome.propertyWon,
      winningBidCents: outcome.propertyWon ? bidCents : null,
      netPropertyResultCents: netResultCents,
      endingCashCents: cashAfterPropertyCents,
      availableCashCents: cashAfterPropertyCents,
    },
    error: null,
  }
}

/**
 * Computes the end-of-round figures via the engine's
 * `propertyCarryingValue`, `endingPosition` and `roundChange` — the
 * category shown on Screen 7 is derived at render time via the engine's
 * own `roundChangeCategory`, not stored or recomputed here.
 */
export function continueFromBid(state: GameState): GameState {
  const next = applyTransition(state, 'CONTINUE_TO_SUMMARY')

  const propertyWon = state.propertyWon ?? false
  const winningBidCents = state.winningBidCents ?? 0
  const propertyCarryingValueCents = propertyCarryingValue(propertyWon, winningBidCents)
  const endingCashCents = state.endingCashCents ?? state.availableCashCents ?? 0
  const endingPositionCents = endingPosition(endingCashCents, propertyCarryingValueCents)
  const startingPositionCents = state.startingCashCents ?? 0
  const roundChangeCents = roundChange(endingPositionCents, startingPositionCents)

  return {
    ...next,
    propertyCarryingValueCents,
    endingPositionCents,
    roundChangeCents,
  }
}

export function playAgain(state: GameState): GameState {
  return applyTransition(state, 'PLAY_AGAIN')
}

export function exitDemo(state: GameState): GameState {
  return applyTransition(state, 'EXIT')
}
