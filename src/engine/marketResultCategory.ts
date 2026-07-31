import type { Cents } from './money'

/**
 * docs/DECISIONS.md DEC-011: engine-owned Market Result (Screen 5) display
 * category. Distinct from the whole-round `roundChangeCategory` — this
 * classifies only the sign pattern across the four per-sector results, not
 * any cash or round-level figure. Introduces no percentage, threshold or
 * financial value.
 */
export type MarketResultCategory = 'mixed' | 'netGain' | 'netLoss' | 'noChange'

export function marketResultCategory(sectorResultsCents: Cents[]): MarketResultCategory {
  const hasPositive = sectorResultsCents.some((resultCents) => resultCents > 0)
  const hasNegative = sectorResultsCents.some((resultCents) => resultCents < 0)

  if (hasPositive && hasNegative) return 'mixed'
  if (hasPositive) return 'netGain'
  if (hasNegative) return 'netLoss'
  return 'noChange'
}
