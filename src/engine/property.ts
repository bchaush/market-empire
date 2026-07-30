import type { Cents } from './money'

/**
 * FIN-DEMO-03 (docs/finance/source-ledger.md): property income/cost model.
 * Provisional pending Hanyu's review or explicit team approval.
 */
export function netPropertyResult(grossRentalIncomeCents: Cents, operatingCostCents: Cents): Cents {
  return grossRentalIncomeCents - operatingCostCents
}

export interface BidOutcome {
  propertyWon: boolean
}

/**
 * DEC-006 / FIN-DEC-CAND-006 / FIN-DEC-CAND-007: the player wins only with
 * a strictly higher bid than the scripted opponent. A tied bid is awarded
 * to the scripted opponent.
 */
export function resolveBid(playerBidCents: Cents, opponentBidCents: Cents): BidOutcome {
  return { propertyWon: playerBidCents > opponentBidCents }
}

/**
 * A losing or tied bid deducts nothing and applies no property income or
 * operating cost (FIN-DEC-CAND-006, FIN-DEC-CAND-007).
 */
export function cashAfterProperty(
  cashBeforeBidCents: Cents,
  outcome: BidOutcome,
  winningBidCents: Cents,
  netPropertyResultCents: Cents,
): Cents {
  if (!outcome.propertyWon) {
    return cashBeforeBidCents
  }
  return cashBeforeBidCents - winningBidCents + netPropertyResultCents
}
