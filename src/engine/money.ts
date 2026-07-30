/**
 * Deterministic monetary representation for the engine.
 *
 * All monetary amounts inside the engine are integer cents. Rates are
 * applied using exact rational (BigInt) arithmetic rather than
 * floating-point multiplication, so results do not depend on
 * floating-point rounding behaviour for any given rate.
 */
export type Cents = number

const RATE_PRECISION = 1_000_000_000n

export function roundHalfAwayFromZero(value: number): number {
  return value >= 0 ? Math.floor(value + 0.5) : Math.ceil(value - 0.5)
}

export function dollarsToCents(dollars: number): Cents {
  return roundHalfAwayFromZero(dollars * 100)
}

export function centsToDollars(cents: Cents): number {
  return cents / 100
}

function divideRoundHalfAwayFromZero(numerator: bigint, denominator: bigint): bigint {
  const negative = numerator < 0n
  const absNumerator = negative ? -numerator : numerator
  const quotient = absNumerator / denominator
  const remainder = absNumerator % denominator
  const roundedAbs = remainder * 2n >= denominator ? quotient + 1n : quotient
  return negative ? -roundedAbs : roundedAbs
}

/**
 * Applies a decimal rate (e.g. 0.05 for 5%, -0.05 for -5%) to a cents
 * amount and rounds the result to the nearest cent, half-away-from-zero
 * (docs/finance/source-ledger.md "Cent-level rounding rule", FIN-EX-009).
 */
export function applyRateToCents(cents: Cents, rate: number): Cents {
  if (!Number.isInteger(cents)) {
    throw new Error('applyRateToCents requires an integer cents amount')
  }
  const rateScaled = BigInt(Math.round(rate * Number(RATE_PRECISION)))
  const numerator = BigInt(cents) * rateScaled
  return Number(divideRoundHalfAwayFromZero(numerator, RATE_PRECISION))
}
