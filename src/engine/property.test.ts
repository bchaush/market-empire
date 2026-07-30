import { describe, expect, it } from 'vitest'
import { dollarsToCents } from './money'
import { cashAfterProperty, netPropertyResult, resolveBid } from './property'

// Test fixtures below are copied verbatim from
// docs/finance/source-ledger.md FIN-EX-003, FIN-EX-007, FIN-EX-008 and
// FIN-EX-010. They are synthetic known-answer test inputs, not approved
// game constants (gross_property_income, operating_cost and opponent_bid
// in FIN-EX-010 do match the Approved Provisional property configuration
// in docs/DECISIONS.md DEC-010, per that example's own note).

describe('CALC-003 (FIN-EX-003): positive property operating result', () => {
  it('subtracts operating cost from gross rental income', () => {
    const result = netPropertyResult(dollarsToCents(600), dollarsToCents(200))
    expect(result).toBe(dollarsToCents(400))
  })
})

describe('CALC-007 (FIN-EX-007): losing bid leaves cash unchanged', () => {
  it('deducts nothing and applies no property result when the player loses', () => {
    const cashBeforeBidCents = dollarsToCents(7000)
    const outcome = resolveBid(dollarsToCents(2000), dollarsToCents(2500))

    expect(outcome.propertyWon).toBe(false)

    const cashAfterPropertyCents = cashAfterProperty(
      cashBeforeBidCents,
      outcome,
      dollarsToCents(2000),
      0,
    )
    expect(cashAfterPropertyCents).toBe(dollarsToCents(7000))
  })
})

describe('CALC-008 (FIN-EX-008): tied bid is awarded to the scripted opponent', () => {
  it('awards a tie to the opponent and leaves cash unchanged', () => {
    const cashBeforeBidCents = dollarsToCents(7000)
    const outcome = resolveBid(dollarsToCents(2500), dollarsToCents(2500))

    expect(outcome.propertyWon).toBe(false)

    const cashAfterPropertyCents = cashAfterProperty(
      cashBeforeBidCents,
      outcome,
      dollarsToCents(2500),
      0,
    )
    expect(cashAfterPropertyCents).toBe(dollarsToCents(7000))
  })
})

describe('BOUND-BID-05 (FIN-EX-010): winning bid above opponent', () => {
  it('wins the property, pays the submitted bid, and applies the net property result', () => {
    const cashBeforeBidCents = dollarsToCents(10800)
    const outcome = resolveBid(dollarsToCents(4500), dollarsToCents(4250))

    expect(outcome.propertyWon).toBe(true)

    const netResultCents = netPropertyResult(dollarsToCents(350), dollarsToCents(100))
    expect(netResultCents).toBe(dollarsToCents(250))

    const cashAfterPropertyCents = cashAfterProperty(
      cashBeforeBidCents,
      outcome,
      dollarsToCents(4500),
      netResultCents,
    )
    expect(cashAfterPropertyCents).toBe(dollarsToCents(6550))
  })
})
