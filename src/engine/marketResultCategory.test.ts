import { describe, expect, it } from 'vitest'
import { dollarsToCents } from './money'
import { marketResultCategory } from './marketResultCategory'

// Amounts below are synthetic sign-classification fixtures only — chosen
// to demonstrate each sign condition, not approved game constants, market
// values, financial evidence or balance inputs (docs/DECISIONS.md DEC-011).

describe('marketResultCategory', () => {
  it('returns "mixed" when at least one sector is positive and at least one is negative', () => {
    const sectorResultsCents = [dollarsToCents(1), dollarsToCents(-1), dollarsToCents(0), dollarsToCents(0)]
    expect(marketResultCategory(sectorResultsCents)).toBe('mixed')
  })

  it('returns "netGain" when at least one sector is positive and none is negative', () => {
    const sectorResultsCents = [dollarsToCents(1), dollarsToCents(0), dollarsToCents(0), dollarsToCents(0)]
    expect(marketResultCategory(sectorResultsCents)).toBe('netGain')
  })

  it('returns "netLoss" when at least one sector is negative and none is positive', () => {
    const sectorResultsCents = [dollarsToCents(-1), dollarsToCents(0), dollarsToCents(0), dollarsToCents(0)]
    expect(marketResultCategory(sectorResultsCents)).toBe('netLoss')
  })

  it('returns "noChange" when every sector result is zero', () => {
    const sectorResultsCents = [dollarsToCents(0), dollarsToCents(0), dollarsToCents(0), dollarsToCents(0)]
    expect(marketResultCategory(sectorResultsCents)).toBe('noChange')
  })
})
