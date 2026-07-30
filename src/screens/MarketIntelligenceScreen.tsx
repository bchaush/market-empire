import { gameConfig } from '../content/gameConfig'
import type { GameState } from '../state/types'

/**
 * Screen 3 — Market Intelligence (docs/DEMO_SPEC.md §11). Renders the
 * three Approved Provisional indicators from config; each card is a
 * native <button> (keyboard-accessible by default) that reveals its
 * meaning/source and marks itself inspected via `aria-expanded` and
 * visible text — never colour alone. `Analyze City` stays disabled until
 * `viewedIndicatorIds` (state layer) covers all three.
 */
export interface MarketIntelligenceScreenProps {
  state: GameState
  onViewIndicator: (indicatorId: string) => void
  onAnalyzeCity: () => void
}

export function MarketIntelligenceScreen({ state, onViewIndicator, onAnalyzeCity }: MarketIntelligenceScreenProps) {
  const allViewed = gameConfig.indicators.every((indicator) => state.viewedIndicatorIds.includes(indicator.id))

  return (
    <div className="screen-panel">
      <h2>Market Intelligence</h2>
      <ul className="indicator-list">
        {gameConfig.indicators.map((indicator) => {
          const viewed = state.viewedIndicatorIds.includes(indicator.id)
          return (
            <li key={indicator.id}>
              <button type="button" aria-expanded={viewed} onClick={() => onViewIndicator(indicator.id)}>
                {indicator.headline}
                {viewed ? ' — Inspected' : ''}
              </button>
              {viewed && (
                <div className="indicator-detail">
                  <p>{indicator.meaning}</p>
                  <p className="indicator-source">{indicator.sourceLabel}</p>
                </div>
              )}
            </li>
          )
        })}
      </ul>
      <button type="button" onClick={onAnalyzeCity} disabled={!allViewed}>
        Analyze City
      </button>
    </div>
  )
}
