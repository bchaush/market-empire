import { describe, expect, it } from 'vitest'
import { dollarsToCents } from './money'
import { cashAfterMarket, settleSector, totalMarketChange, unallocatedCash } from './settlement'
import { validateAllocation } from './validation'

// Test fixtures below are copied verbatim from
// docs/finance/source-ledger.md FIN-EX-001 through FIN-EX-009. They are
// synthetic known-answer test inputs, not approved game constants
// (docs/testing/initial-test-plan.md).

describe('CALC-001 (FIN-EX-001): unallocated cash remains unchanged', () => {
  it('leaves cash after market equal to starting cash when nothing is allocated', () => {
    const startingCashCents = dollarsToCents(10000)
    const totalAllocatedCents = dollarsToCents(0)

    const unallocatedCashCents = unallocatedCash(startingCashCents, totalAllocatedCents)
    expect(unallocatedCashCents).toBe(dollarsToCents(10000))

    const cashAfterMarketCents = cashAfterMarket(unallocatedCashCents, [])
    expect(cashAfterMarketCents).toBe(dollarsToCents(10000))
  })
})

describe('CALC-002 (FIN-EX-002): allocation may equal available cash', () => {
  it('accepts an allocation that exactly exhausts available cash', () => {
    const startingCashCents = dollarsToCents(10000)
    const allocations = [2500, 2500, 2500, 2500].map(dollarsToCents)

    const result = validateAllocation(startingCashCents, allocations)

    expect(result.valid).toBe(true)
    expect(result.totalAllocatedCents).toBe(dollarsToCents(10000))
    expect(result.cashRemainingCents).toBe(dollarsToCents(0))
  })
})

describe('CALC-009 (FIN-EX-009): half-cent results round away from zero', () => {
  it('rounds a positive half-cent result up (away from zero)', () => {
    const allocationCents = dollarsToCents(100.1)
    const settlement = settleSector(allocationCents, 0.05)

    expect(settlement.sectorChangeCents).toBe(dollarsToCents(5.01))
    expect(settlement.settledValueCents).toBe(dollarsToCents(105.11))
  })

  it('rounds a negative half-cent result down (away from zero)', () => {
    const allocationCents = dollarsToCents(100.1)
    const settlement = settleSector(allocationCents, -0.05)

    expect(settlement.sectorChangeCents).toBe(dollarsToCents(-5.01))
    expect(settlement.settledValueCents).toBe(dollarsToCents(95.09))
  })
})

describe('totalMarketChange', () => {
  it('sums per-sector changes, rounded before summation', () => {
    const changes = [dollarsToCents(5.01), dollarsToCents(-5.01)]
    expect(totalMarketChange(changes)).toBe(dollarsToCents(0))
  })
})
