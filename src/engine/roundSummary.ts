import type { Cents } from './money'

/**
 * FIN-DEMO-04 / FIN-DEC-CAND-004 (docs/finance/source-ledger.md):
 * end-of-round financial-position summary. Provisional pending Hanyu's
 * review or explicit team approval.
 */
export function propertyCarryingValue(propertyWon: boolean, winningBidCents: Cents): Cents {
  return propertyWon ? winningBidCents : 0
}

export function endingPosition(endingCashCents: Cents, propertyCarryingValueCents: Cents): Cents {
  return endingCashCents + propertyCarryingValueCents
}

export function roundChange(endingPositionCents: Cents, startingPositionCents: Cents): Cents {
  return endingPositionCents - startingPositionCents
}

export type RoundChangeCategory = 'increased' | 'unchanged' | 'decreased'

/**
 * The engine alone decides which summary category applies
 * (docs/DEMO_SPEC.md §14). The exact display sentence is content, not
 * engine, and is intentionally not produced here.
 */
export function roundChangeCategory(roundChangeCents: Cents): RoundChangeCategory {
  if (roundChangeCents > 0) return 'increased'
  if (roundChangeCents < 0) return 'decreased'
  return 'unchanged'
}
