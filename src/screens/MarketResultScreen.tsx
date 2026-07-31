import { gameConfig } from '../content/gameConfig'
import { formatCentsAsDollars } from '../components/format'
import { SECTOR_KEYS } from '../state/gameActions'
import type { GameState } from '../state/types'

function signWordIcon(changeCents: number): { sign: string; word: string; icon: string; className: string } {
  if (changeCents > 0) return { sign: '+', word: 'Gain', icon: '▲', className: 'gain' }
  if (changeCents < 0) return { sign: '−', word: 'Loss', icon: '▼', className: 'loss' }
  return { sign: '', word: 'No change', icon: '–', className: '' }
}

/**
 * Screen 5 — Market Result (docs/DEMO_SPEC.md §11). Every figure shown
 * is read directly from state, which was populated only by the engine
 * (via the state layer's `confirmInvestments`) — this screen performs no
 * calculation. Gain/loss uses sign + word + icon + colour together, not
 * colour alone (§18). `resultHeading`/`resultMessage` are the approved
 * DEC-011 explanation for the engine-owned `marketResultCategory`,
 * derived once in `App.tsx` — this screen never inspects sector values or
 * reproduces that classification itself.
 */
export interface MarketResultScreenProps {
  state: GameState
  onContinueToAuction: () => void
  resultHeading: string
  resultMessage: string
}

export function MarketResultScreen({ state, onContinueToAuction, resultHeading, resultMessage }: MarketResultScreenProps) {
  const sectorResults = state.sectorResultsCents ?? {}
  const totalChangeCents = state.totalMarketChangeCents ?? 0
  const total = signWordIcon(totalChangeCents)

  return (
    <div className="screen-panel">
      <h2>Market Result</h2>
      <div className="screen-explanation">
        <h3>{resultHeading}</h3>
        <p>{resultMessage}</p>
      </div>
      <p className={total.className}>
        <span aria-hidden="true">{total.icon}</span> Total market change: {total.sign}
        {formatCentsAsDollars(Math.abs(totalChangeCents))} ({total.word})
      </p>
      <ul>
        {SECTOR_KEYS.map((key) => {
          const changeCents = sectorResults[key] ?? 0
          const sector = signWordIcon(changeCents)
          return (
            <li key={key} className={sector.className}>
              <span aria-hidden="true">{sector.icon}</span> {gameConfig.sectors[key].label}: {sector.sign}
              {formatCentsAsDollars(Math.abs(changeCents))} ({sector.word})
            </li>
          )
        })}
      </ul>
      <p>Available Cash: {formatCentsAsDollars(state.availableCashCents)}</p>
      <button type="button" onClick={onContinueToAuction}>
        Continue to Auction
      </button>
    </div>
  )
}
