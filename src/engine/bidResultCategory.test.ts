import { describe, expect, it } from 'vitest'
import { dollarsToCents } from './money'
import { bidResultCategory } from './bidResultCategory'

// Fixtures below are copied verbatim from docs/finance/source-ledger.md
// FIN-EX-007, FIN-EX-008 and FIN-EX-010 (see also
// src/engine/property.test.ts CALC-007, CALC-008, BOUND-BID-05) — no
// additional bid fixture is introduced.

describe('bidResultCategory', () => {
  it('returns "belowOpponent" for CALC-007 (FIN-EX-007): player bid below opponent', () => {
    expect(bidResultCategory(dollarsToCents(2000), dollarsToCents(2500))).toBe('belowOpponent')
  })

  it('returns "tie" for CALC-008 (FIN-EX-008): player bid equals opponent', () => {
    expect(bidResultCategory(dollarsToCents(2500), dollarsToCents(2500))).toBe('tie')
  })

  it('returns "win" for BOUND-BID-05 (FIN-EX-010): player bid above opponent', () => {
    expect(bidResultCategory(dollarsToCents(4500), dollarsToCents(4250))).toBe('win')
  })
})
