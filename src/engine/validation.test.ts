import { describe, expect, it } from 'vitest'
import { dollarsToCents } from './money'
import { validateAllocation, validateBid } from './validation'

// Boundary cases from docs/testing/initial-test-plan.md. BOUND-BID-05
// (player bid above opponent) is intentionally not covered here: the test
// plan records it as blocked because no FIN-EX known-answer example
// exists for it yet (docs/finance/source-ledger.md has no worked example
// for a winning bid amount). It stays blocked pending a team decision.

describe('BOUND-ALLOC-01: total allocation exactly equals available cash', () => {
  it('is accepted with zero cash remaining', () => {
    const result = validateAllocation(dollarsToCents(10000), [2500, 2500, 2500, 2500].map(dollarsToCents))
    expect(result.valid).toBe(true)
    expect(result.cashRemainingCents).toBe(dollarsToCents(0))
  })
})

describe('BOUND-ALLOC-02: total allocation exceeds available cash', () => {
  it('is rejected, not silently capped', () => {
    const result = validateAllocation(dollarsToCents(10000), [dollarsToCents(10000.01)])
    expect(result.valid).toBe(false)
    expect(result.reason).toBe('exceeds-available-cash')
  })
})

describe('BOUND-ALLOC-03: zero allocation is a valid choice', () => {
  it('is accepted with no error state', () => {
    const result = validateAllocation(dollarsToCents(10000), [0, 0, 0, 0])
    expect(result.valid).toBe(true)
    expect(result.cashRemainingCents).toBe(dollarsToCents(10000))
  })
})

describe('BOUND-BID-01: bid exactly equals available cash', () => {
  it('is accepted', () => {
    const result = validateBid(dollarsToCents(7000), dollarsToCents(7000))
    expect(result.valid).toBe(true)
  })
})

describe('BOUND-BID-02: bid exceeds available cash', () => {
  it('is rejected, not silently capped', () => {
    const result = validateBid(dollarsToCents(7000), dollarsToCents(7000.01))
    expect(result.valid).toBe(false)
    expect(result.reason).toBe('exceeds-available-cash')
  })
})
