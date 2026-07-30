import { applyRateToCents, type Cents } from './money'

/**
 * FIN-DEMO-05 / FIN-DEC-CAND-005 (docs/finance/source-ledger.md):
 * allocation-weighted sector settlement. Provisional pending Hanyu's
 * review or explicit team approval — this module implements the
 * documented relationship, not an approved game constant.
 */
export interface SectorSettlement {
  allocationCents: Cents
  returnRate: number
  sectorChangeCents: Cents
  settledValueCents: Cents
}

export function settleSector(allocationCents: Cents, returnRate: number): SectorSettlement {
  const sectorChangeCents = applyRateToCents(allocationCents, returnRate)
  return {
    allocationCents,
    returnRate,
    sectorChangeCents,
    settledValueCents: allocationCents + sectorChangeCents,
  }
}

export function totalMarketChange(sectorChangesCents: Cents[]): Cents {
  return sectorChangesCents.reduce((sum, change) => sum + change, 0)
}

export function unallocatedCash(startingCashCents: Cents, totalAllocatedCents: Cents): Cents {
  return startingCashCents - totalAllocatedCents
}

export function cashAfterMarket(unallocatedCashCents: Cents, settledValuesCents: Cents[]): Cents {
  return settledValuesCents.reduce((sum, value) => sum + value, unallocatedCashCents)
}
