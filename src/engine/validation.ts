import type { Cents } from './money'

/**
 * docs/DEMO_SPEC.md §15: total allocation cannot exceed available cash;
 * cash cannot go negative; unallocated cash is permitted; invalid input is
 * rejected, never silently corrected.
 */
export interface AllocationValidationResult {
  valid: boolean
  totalAllocatedCents: Cents
  cashRemainingCents: Cents
  reason?: 'exceeds-available-cash' | 'negative-allocation'
}

export function validateAllocation(
  availableCashCents: Cents,
  sectorAllocationsCents: Cents[],
): AllocationValidationResult {
  const totalAllocatedCents = sectorAllocationsCents.reduce((sum, allocation) => sum + allocation, 0)
  const cashRemainingCents = availableCashCents - totalAllocatedCents

  if (sectorAllocationsCents.some((allocation) => allocation < 0)) {
    return { valid: false, totalAllocatedCents, cashRemainingCents, reason: 'negative-allocation' }
  }
  if (totalAllocatedCents > availableCashCents) {
    return { valid: false, totalAllocatedCents, cashRemainingCents, reason: 'exceeds-available-cash' }
  }
  return { valid: true, totalAllocatedCents, cashRemainingCents }
}

export interface BidValidationResult {
  valid: boolean
  reason?: 'exceeds-available-cash' | 'negative-bid'
}

export function validateBid(availableCashCents: Cents, bidCents: Cents): BidValidationResult {
  if (bidCents < 0) {
    return { valid: false, reason: 'negative-bid' }
  }
  if (bidCents > availableCashCents) {
    return { valid: false, reason: 'exceeds-available-cash' }
  }
  return { valid: true }
}
