import { gameConfig } from '../content/gameConfig'
import { createInitialGameState } from './initialState'
import type { GameState, PropertyScreenState, ScreenId } from './types'

/**
 * Implements the Screen and State Transition Table in docs/DEMO_SPEC.md
 * §12. Pure navigation graph only — no financial calculation and no
 * screen UI. Screen interfaces (Phase 2B) call this to decide where a
 * confirmed action leads; they do not encode the graph themselves.
 */
export type TransitionAction =
  | 'START_DEMO'
  | 'FINISH_TUTORIAL'
  | 'SKIP_TUTORIAL'
  | 'ANALYZE_CITY'
  | 'CONFIRM_INVESTMENTS'
  | 'CONTINUE_TO_AUCTION'
  | 'SUBMIT_BID'
  | 'CONTINUE_TO_SUMMARY'
  | 'PLAY_AGAIN'
  | 'EXIT'

export interface ScreenPosition {
  screen: ScreenId
  screenState: PropertyScreenState | null
}

export function nextScreenPosition(current: ScreenPosition, action: TransitionAction): ScreenPosition {
  switch (current.screen) {
    case 'start':
      if (action === 'START_DEMO') return { screen: 'coachTutorial', screenState: null }
      break
    case 'coachTutorial':
      if (action === 'FINISH_TUTORIAL' || action === 'SKIP_TUTORIAL') {
        return { screen: 'marketIntelligence', screenState: null }
      }
      break
    case 'marketIntelligence':
      if (action === 'ANALYZE_CITY') return { screen: 'cityInvestmentDecision', screenState: null }
      break
    case 'cityInvestmentDecision':
      if (action === 'CONFIRM_INVESTMENTS') return { screen: 'marketResult', screenState: null }
      break
    case 'marketResult':
      if (action === 'CONTINUE_TO_AUCTION') {
        return { screen: 'propertyOpportunity', screenState: 'pre-submission' }
      }
      break
    case 'propertyOpportunity':
      if (current.screenState === 'pre-submission' && action === 'SUBMIT_BID') {
        return { screen: 'propertyOpportunity', screenState: 'post-submission' }
      }
      if (current.screenState === 'post-submission' && action === 'CONTINUE_TO_SUMMARY') {
        return { screen: 'roundSummary', screenState: null }
      }
      break
    case 'roundSummary':
      if (action === 'PLAY_AGAIN') return { screen: 'start', screenState: null }
      if (action === 'EXIT') return current
      break
  }
  throw new Error(
    `Invalid transition: action "${action}" is not valid from screen "${current.screen}"` +
      `${current.screenState ? ` (state: ${current.screenState})` : ''}.`,
  )
}

/**
 * Applies a transition action to the full game state.
 *
 * Every action, including PLAY_AGAIN, is first validated through
 * `nextScreenPosition` — PLAY_AGAIN is only a valid transition from
 * `roundSummary` (docs/DEMO_SPEC.md §12), so attempting it from any other
 * screen throws the same "Invalid transition" error as any other
 * out-of-order action, rather than silently resetting.
 *
 * Once validated, PLAY_AGAIN performs the documented full reset
 * (docs/DEMO_SPEC.md §11 Screen 7 "resets all state and map"; §12) by
 * replacing the entire state with a freshly hydrated
 * `createInitialGameState(gameConfig)`, rather than only moving the
 * screen pointer — every tracked field (tutorial progress, viewed
 * indicators, allocations, results, bid/property state, Coach message,
 * time-of-day, etc.) is restored, not just the screen.
 *
 * Every other action only moves the screen position via the already
 * validated `position`; it does not yet apply any other gameplay effect
 * (allocation, settlement, bidding, etc.) — that remains Phase 2B
 * screen-implementation work.
 */
export function applyTransition(state: GameState, action: TransitionAction): GameState {
  const position = nextScreenPosition(
    { screen: state.currentScreen, screenState: state.currentScreenState },
    action,
  )

  if (action === 'PLAY_AGAIN') {
    return createInitialGameState(gameConfig)
  }

  return {
    ...state,
    currentScreen: position.screen,
    currentScreenState: position.screenState,
  }
}
