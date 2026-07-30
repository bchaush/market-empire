import { useState } from 'react'
import { gameConfig } from '../content/gameConfig'
import { formatCentsAsDollars } from '../components/format'
import { dollarsToCents } from '../engine'
import type { GameState } from '../state/types'

/**
 * Screen 6 — Property Opportunity and Sealed Bid (docs/DEMO_SPEC.md §11).
 * Both documented internal states. The opponent's bid is never rendered
 * pre-submission. Bid validation and the below/equal/above outcome are
 * both produced entirely by the state layer's `submitBid` (which calls
 * the engine's `validateBid`, `resolveBid`, `netPropertyResult` and
 * `cashAfterProperty`) — this screen only formats the result.
 *
 * DEMO_SPEC §11 requires a "sealed-bid explanation," but no approved
 * player-facing sentence for it exists anywhere in the repository (the
 * only prior candidate was evidence-ledger text, which is not player
 * dialogue and has been removed). That content slot is left visibly
 * unresolved below rather than filled with invented copy — see the
 * implementation report.
 */
export interface PropertyOpportunityScreenProps {
  state: GameState
  onSubmitBid: (bidCents: number) => string | null
  onContinue: () => void
}

export function PropertyOpportunityScreen({ state, onSubmitBid, onContinue }: PropertyOpportunityScreenProps) {
  const [bidInput, setBidInput] = useState('')
  const [bidError, setBidError] = useState<string | null>(null)
  const property = gameConfig.property

  const handleSubmit = () => {
    const parsed = Number(bidInput)
    if (bidInput.trim() === '' || Number.isNaN(parsed)) {
      setBidError('Enter a numeric bid amount.')
      return
    }
    const error = onSubmitBid(dollarsToCents(parsed))
    setBidError(error)
  }

  if (state.currentScreenState === 'pre-submission') {
    return (
      <div className="screen-panel">
        <h2>{property.name}</h2>
        <p>{property.type}</p>
        <p>Asking price: {formatCentsAsDollars(property.askingPriceCents)}</p>
        <p>Available cash: {formatCentsAsDollars(state.availableCashCents)}</p>
        <p>
          Gross income: {formatCentsAsDollars(state.grossPropertyIncomeCents)} · Operating cost:{' '}
          {formatCentsAsDollars(state.operatingCostCents)}
        </p>
        <p className="content-pending" role="note">
          Sealed-bid explanation: content pending approval.
        </p>
        <p>Opponent: Scripted Opponent</p>

        <label htmlFor="bid-input">Your bid ($)</label>
        <input
          id="bid-input"
          type="number"
          min={0}
          step="1"
          value={bidInput}
          onChange={(event) => setBidInput(event.target.value)}
        />
        {bidError && (
          <p role="alert" className="error-message">
            {bidError}
          </p>
        )}
        <button type="button" onClick={handleSubmit}>
          Submit Bid
        </button>
      </div>
    )
  }

  const won = state.propertyWon ?? false

  return (
    <div className="screen-panel">
      <h2>{property.name} — Result</h2>
      <p>Your bid: {formatCentsAsDollars(state.playerBidCents)}</p>
      <p>Scripted Opponent bid: {formatCentsAsDollars(state.scriptedOpponentBidCents)}</p>
      <p className={won ? 'gain' : ''}>
        <span aria-hidden="true">{won ? '▲' : '–'}</span> {won ? 'Won' : 'Not won'}
      </p>
      <p>Cash after property: {formatCentsAsDollars(state.endingCashCents)}</p>
      {won && <p>Net property result: {formatCentsAsDollars(state.netPropertyResultCents)}</p>}
      <button type="button" onClick={onContinue}>
        Continue
      </button>
    </div>
  )
}
