import type { Cents } from './money'

/**
 * docs/DECISIONS.md DEC-012: engine-owned Screen 6 post-submission display
 * branch. Introduces no new bid rule — it only names the three qualitative
 * outcomes `resolveBid` (./property.ts) already implements per DEC-006, so
 * approved interface content can be selected without an interface-side
 * bid comparison. Performs no cash deduction and no property calculation.
 */
export type BidResultCategory = 'win' | 'belowOpponent' | 'tie'

export function bidResultCategory(playerBidCents: Cents, opponentBidCents: Cents): BidResultCategory {
  if (playerBidCents > opponentBidCents) return 'win'
  if (playerBidCents < opponentBidCents) return 'belowOpponent'
  return 'tie'
}
