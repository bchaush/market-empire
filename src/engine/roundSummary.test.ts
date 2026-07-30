import { describe, expect, it } from 'vitest'
import { dollarsToCents } from './money'
import { cashAfterProperty, netPropertyResult } from './property'
import { endingPosition, propertyCarryingValue, roundChange, roundChangeCategory } from './roundSummary'

// Test fixtures below are copied verbatim from
// docs/finance/source-ledger.md FIN-EX-004, FIN-EX-005 and FIN-EX-006.
// They are synthetic known-answer test inputs, not approved game
// constants.

describe('CALC-004 (FIN-EX-004): property win produces an increased financial position', () => {
  it('matches every documented figure and the increased category', () => {
    const startingPositionCents = dollarsToCents(10000)
    const cashBeforeBidCents = dollarsToCents(10000)
    const winningBidCents = dollarsToCents(2500)
    const netResultCents = netPropertyResult(dollarsToCents(600), dollarsToCents(200))

    const endingCashCents = cashAfterProperty(
      cashBeforeBidCents,
      { propertyWon: true },
      winningBidCents,
      netResultCents,
    )
    const carryingValueCents = propertyCarryingValue(true, winningBidCents)
    const endingPositionCents = endingPosition(endingCashCents, carryingValueCents)
    const roundChangeCents = roundChange(endingPositionCents, startingPositionCents)

    expect(endingCashCents).toBe(dollarsToCents(7900))
    expect(carryingValueCents).toBe(dollarsToCents(2500))
    expect(endingPositionCents).toBe(dollarsToCents(10400))
    expect(roundChangeCents).toBe(dollarsToCents(400))
    expect(roundChangeCategory(roundChangeCents)).toBe('increased')
  })
})

describe('CALC-005 (FIN-EX-005): property win produces an unchanged financial position', () => {
  it('matches every documented figure and the unchanged category', () => {
    const startingPositionCents = dollarsToCents(10000)
    const cashBeforeBidCents = dollarsToCents(10000)
    const winningBidCents = dollarsToCents(2500)
    const netResultCents = netPropertyResult(dollarsToCents(200), dollarsToCents(200))

    const endingCashCents = cashAfterProperty(
      cashBeforeBidCents,
      { propertyWon: true },
      winningBidCents,
      netResultCents,
    )
    const carryingValueCents = propertyCarryingValue(true, winningBidCents)
    const endingPositionCents = endingPosition(endingCashCents, carryingValueCents)
    const roundChangeCents = roundChange(endingPositionCents, startingPositionCents)

    expect(endingCashCents).toBe(dollarsToCents(7500))
    expect(carryingValueCents).toBe(dollarsToCents(2500))
    expect(endingPositionCents).toBe(dollarsToCents(10000))
    expect(roundChangeCents).toBe(dollarsToCents(0))
    expect(roundChangeCategory(roundChangeCents)).toBe('unchanged')
  })
})

describe('CALC-006 (FIN-EX-006): property win produces a decreased financial position', () => {
  it('matches every documented figure and the decreased category', () => {
    const startingPositionCents = dollarsToCents(10000)
    const cashBeforeBidCents = dollarsToCents(10000)
    const winningBidCents = dollarsToCents(2500)
    const netResultCents = netPropertyResult(dollarsToCents(100), dollarsToCents(300))

    const endingCashCents = cashAfterProperty(
      cashBeforeBidCents,
      { propertyWon: true },
      winningBidCents,
      netResultCents,
    )
    const carryingValueCents = propertyCarryingValue(true, winningBidCents)
    const endingPositionCents = endingPosition(endingCashCents, carryingValueCents)
    const roundChangeCents = roundChange(endingPositionCents, startingPositionCents)

    expect(endingCashCents).toBe(dollarsToCents(7300))
    expect(carryingValueCents).toBe(dollarsToCents(2500))
    expect(endingPositionCents).toBe(dollarsToCents(9800))
    expect(roundChangeCents).toBe(dollarsToCents(-200))
    expect(roundChangeCategory(roundChangeCents)).toBe('decreased')
  })
})
