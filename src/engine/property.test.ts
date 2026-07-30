import { describe, expect, it } from 'vitest'
import { dollarsToCents } from './money'
import { cashAfterProperty, netPropertyResult, resolveBid } from './property'

// Test fixtures below are copied verbatim from
// docs/finance/source-ledger.md FIN-EX-003, FIN-EX-007 and FIN-EX-008.
// They are synthetic known-answer test inputs, not approved game
// constants.

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
