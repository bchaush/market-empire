import { describe, expect, it } from 'vitest'
import { gameConfig } from '../content/gameConfig'
import { createInitialGameState } from './initialState'
import { applyTransition } from './transitions'
import type { GameState } from './types'

describe('applyTransition PLAY_AGAIN: full reset', () => {
  it('replaces a fully populated end-of-round state with a fresh createInitialGameState(gameConfig)', () => {
    const populatedState: GameState = {
      currentScreen: 'roundSummary',
      currentScreenState: 'post-submission',
      tutorialStep: 4,
      tutorialCompletedForSession: true,
      viewedIndicatorIds: ['macro-trend', 'sector-boost', 'risk-counter-signal'],
      startingCashCents: gameConfig.startingCashCents,
      availableCashCents: 650000,
      sectorAllocationsCents: {
        technology: 250000,
        healthCare: 250000,
        everydayGoods: 250000,
        energy: 250000,
      },
      totalAllocatedCents: 1000000,
      unallocatedCashCents: 0,
      scriptedSectorRates: { technology: 0.19, healthCare: 0.07, everydayGoods: 0.01, energy: 0.2 },
      sectorResultsCents: { technology: 47500, healthCare: 17500, everydayGoods: 2500, energy: 50000 },
      totalMarketChangeCents: 117500,
      cashAfterMarketCents: 1117500,
      playerBidCents: 450000,
      scriptedOpponentBidCents: gameConfig.property.scriptedOpponentBidCents,
      propertyWon: true,
      winningBidCents: 450000,
      grossPropertyIncomeCents: gameConfig.property.grossRentalIncomeCents,
      operatingCostCents: gameConfig.property.operatingCostCents,
      netPropertyResultCents: 25000,
      endingCashCents: 692500,
      propertyCarryingValueCents: 450000,
      endingPositionCents: 1142500,
      roundChangeCents: 142500,
      coachMessageId: 'round-summary-lesson',
      timeOfDayState: 'late night',
      hasEnded: true,
    }

    const result = applyTransition(populatedState, 'PLAY_AGAIN')

    expect(result).toEqual(createInitialGameState(gameConfig))
    expect(result).not.toBe(populatedState)

    // Spot-check that this is a genuine reset, not a superficial match.
    expect(result.currentScreen).toBe('start')
    expect(result.currentScreenState).toBeNull()
    expect(result.tutorialStep).toBe(0)
    expect(result.tutorialCompletedForSession).toBe(false)
    expect(result.viewedIndicatorIds).toEqual([])
    expect(result.availableCashCents).toBe(gameConfig.startingCashCents)
    expect(result.sectorAllocationsCents).toEqual({})
    expect(result.totalAllocatedCents).toBe(0)
    expect(result.sectorResultsCents).toBeNull()
    expect(result.playerBidCents).toBeNull()
    expect(result.propertyWon).toBeNull()
    expect(result.winningBidCents).toBeNull()
    expect(result.endingCashCents).toBeNull()
    expect(result.endingPositionCents).toBeNull()
    expect(result.roundChangeCents).toBeNull()
    expect(result.coachMessageId).toBe('coach-intro')
    expect(result.timeOfDayState).toBe('morning')
    expect(result.hasEnded).toBe(false)
  })
})

describe('applyTransition PLAY_AGAIN: invalid origin', () => {
  it('throws when the current screen is not roundSummary, and does not reset state', () => {
    const midRoundState: GameState = {
      ...createInitialGameState(gameConfig),
      currentScreen: 'cityInvestmentDecision',
      currentScreenState: null,
      availableCashCents: 700000,
      sectorAllocationsCents: { technology: 300000 },
      totalAllocatedCents: 300000,
    }

    expect(() => applyTransition(midRoundState, 'PLAY_AGAIN')).toThrow(/Invalid transition/)

    // The rejected attempt must not have silently reset (or otherwise
    // mutated) the state that was passed in.
    expect(midRoundState.currentScreen).toBe('cityInvestmentDecision')
    expect(midRoundState.availableCashCents).toBe(700000)
    expect(midRoundState.sectorAllocationsCents).toEqual({ technology: 300000 })
  })
})

describe('applyTransition: timeOfDayState follows the destination screen (docs/DEMO_SPEC.md §10)', () => {
  it('updates timeOfDayState on every successful transition through the full seven-screen sequence', () => {
    let state = createInitialGameState(gameConfig)
    expect(state.timeOfDayState).toBe('morning')

    state = applyTransition(state, 'START_DEMO')
    expect(state.currentScreen).toBe('coachTutorial')
    expect(state.timeOfDayState).toBe('daytime')

    state = applyTransition(state, 'SKIP_TUTORIAL')
    expect(state.currentScreen).toBe('marketIntelligence')
    expect(state.timeOfDayState).toBe('afternoon')

    state = applyTransition(state, 'ANALYZE_CITY')
    expect(state.currentScreen).toBe('cityInvestmentDecision')
    expect(state.timeOfDayState).toBe('dusk')

    state = applyTransition(state, 'CONFIRM_INVESTMENTS')
    expect(state.currentScreen).toBe('marketResult')
    expect(state.timeOfDayState).toBe('early evening')

    state = applyTransition(state, 'CONTINUE_TO_AUCTION')
    expect(state.currentScreen).toBe('propertyOpportunity')
    expect(state.currentScreenState).toBe('pre-submission')
    expect(state.timeOfDayState).toBe('night')

    state = applyTransition(state, 'SUBMIT_BID')
    expect(state.currentScreenState).toBe('post-submission')
    expect(state.timeOfDayState).toBe('night')

    state = applyTransition(state, 'CONTINUE_TO_SUMMARY')
    expect(state.currentScreen).toBe('roundSummary')
    expect(state.timeOfDayState).toBe('late night')
  })

  it('resets timeOfDayState to morning on PLAY_AGAIN', () => {
    const roundSummaryState: GameState = {
      ...createInitialGameState(gameConfig),
      currentScreen: 'roundSummary',
      timeOfDayState: 'late night',
    }

    const result = applyTransition(roundSummaryState, 'PLAY_AGAIN')

    expect(result.timeOfDayState).toBe('morning')
  })

  it('does not alter timeOfDayState when a transition is invalid', () => {
    const state: GameState = {
      ...createInitialGameState(gameConfig),
      currentScreen: 'marketIntelligence',
      timeOfDayState: 'afternoon',
    }

    expect(() => applyTransition(state, 'CONFIRM_INVESTMENTS')).toThrow(/Invalid transition/)
    expect(state.timeOfDayState).toBe('afternoon')
  })
})

describe('applyTransition EXIT: represented in state, not React-local state', () => {
  it('sets hasEnded to true when EXIT is applied from roundSummary', () => {
    const state: GameState = { ...createInitialGameState(gameConfig), currentScreen: 'roundSummary' }

    const result = applyTransition(state, 'EXIT')

    expect(result.hasEnded).toBe(true)
    expect(result.currentScreen).toBe('roundSummary')
  })

  it('throws when EXIT is attempted from a non-roundSummary screen, and does not set hasEnded', () => {
    const state = createInitialGameState(gameConfig)

    expect(() => applyTransition(state, 'EXIT')).toThrow(/Invalid transition/)
    expect(state.hasEnded).toBe(false)
  })

  it('PLAY_AGAIN resets hasEnded to false even after Exit', () => {
    const endedState: GameState = {
      ...createInitialGameState(gameConfig),
      currentScreen: 'roundSummary',
      hasEnded: true,
    }

    const result = applyTransition(endedState, 'PLAY_AGAIN')

    expect(result.hasEnded).toBe(false)
  })
})
