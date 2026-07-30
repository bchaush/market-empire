import { gameConfig } from '../content/gameConfig'
import { formatCentsAsDollars } from '../components/format'
import { roundChangeCategory } from '../engine'
import type { GameState } from '../state/types'

/**
 * Screen 7 — Round Summary (docs/DEMO_SPEC.md §11). Every figure is read
 * from state (populated by the engine via `continueFromBid`); the
 * increased/unchanged/decreased category is computed at render time via
 * the engine's own `roundChangeCategory`, not reimplemented here. No
 * approved Round Summary Coach lesson text exists anywhere in the
 * repository, so none is rendered (see the implementation report).
 * "Future Game Content" is plain, non-interactive text — no click
 * handler, no tabIndex, no button.
 *
 * `state.hasEnded` (set by the state layer's EXIT transition, not
 * React-local component state) drives the disabled buttons and the
 * "End of demo." status — the disabled buttons are never the only
 * feedback that the demo has ended.
 */
export interface RoundSummaryScreenProps {
  state: GameState
  onPlayAgain: () => void
  onExit: () => void
}

export function RoundSummaryScreen({ state, onPlayAgain, onExit }: RoundSummaryScreenProps) {
  const category = state.roundChangeCents !== null ? roundChangeCategory(state.roundChangeCents) : null
  const won = state.propertyWon ?? false
  const hasEnded = state.hasEnded

  return (
    <div className="screen-panel">
      <h2>Round Summary</h2>
      <p>Starting cash: {formatCentsAsDollars(state.startingCashCents)}</p>
      <p>Total market change: {formatCentsAsDollars(state.totalMarketChangeCents)}</p>
      <p>Property result: {won ? formatCentsAsDollars(state.netPropertyResultCents) : 'Not won'}</p>
      <p>Ending cash: {formatCentsAsDollars(state.endingCashCents)}</p>
      {won && <p>Property carrying value: {formatCentsAsDollars(state.propertyCarryingValueCents)}</p>}
      <p>Ending position: {formatCentsAsDollars(state.endingPositionCents)}</p>
      <p>
        Round change: {formatCentsAsDollars(state.roundChangeCents)}
        {category ? ` (${category})` : ''}
      </p>
      <p>Property ownership: {won ? `${gameConfig.property.name} — Owned` : 'Not owned'}</p>

      <p className="locked-district">Future Game Content</p>

      <div role="group" aria-label="Round Summary actions">
        <button type="button" onClick={onPlayAgain} disabled={hasEnded}>
          Play Again
        </button>
        <button type="button" onClick={onExit} disabled={hasEnded}>
          Exit
        </button>
      </div>

      {hasEnded && <p role="status">End of demo.</p>}
    </div>
  )
}
