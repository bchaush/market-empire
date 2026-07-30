import { dollarsToCents } from '../engine/money'

/**
 * Approved Provisional demo configuration (docs/DECISIONS.md DEC-010,
 * 2026-07-30). These are project-authored implementation choices for the
 * one-round demo, informed by general financial relationships already
 * recorded in docs/finance/source-ledger.md — they are not verified
 * historical returns, market forecasts, valuations, or final balance
 * values.
 *
 * Financial-formula and terminology review remains pending Hanyu's or
 * explicit team approval. Beginner-facing wording review remains pending
 * Pankuri's or explicit team approval. The BOUND-BID-05 known-answer
 * example remains pending Leo's/Hanyu's review. Final usability,
 * accessibility and balance validation have not been completed.
 */

export type SectorKey = 'technology' | 'healthCare' | 'everydayGoods' | 'energy'

export interface SectorConfig {
  label: string
  description: string
  /** Only present where DEC-010 records a label-sourcing clarification. */
  labelNote?: string
  /** Project-authored active base rate for this scripted round (decimal, e.g. 0.12 = 12%). */
  baseRate: number
  /** Mathematically derived: base rate plus applicable scripted indicator modifiers. */
  resolvedRate: number
}

export interface IndicatorEffect {
  sector: SectorKey | 'all'
  /** Decimal modifier, e.g. 0.02 = +2%. */
  modifier: number
}

export interface IndicatorConfig {
  id: string
  headline: string
  meaning: string
  sourceLabel: string
  effects: IndicatorEffect[]
}

export interface PropertyConfig {
  name: string
  type: string
  askingPriceCents: number
  grossRentalIncomeCents: number
  operatingCostCents: number
  scriptedOpponentBidCents: number
}

export interface CoachConfig {
  introduction: string
  permittedTerms: string[]
  prohibitedTerms: string[]
}

export interface DesktopBaselineConfig {
  widthPx: number
  heightPx: number
  description: string
}

export interface SectorRateRange {
  minRate: number
  maxRate: number
}

export interface ConfigStatus {
  label: 'Approved Provisional'
  decisionId: 'DEC-010'
  approvedDate: string
  approvedBy: string
  pendingReviews: string[]
  balanceLimitation: string
}

export interface GameConfig {
  status: ConfigStatus
  startingCashCents: number
  sectors: Record<SectorKey, SectorConfig>
  sectorRateRange: SectorRateRange
  indicators: IndicatorConfig[]
  property: PropertyConfig
  coach: CoachConfig
  desktopBaseline: DesktopBaselineConfig
}

export const gameConfig: GameConfig = {
  status: {
    label: 'Approved Provisional',
    decisionId: 'DEC-010',
    approvedDate: '2026-07-30',
    approvedBy: 'Bora, Product Lead',
    pendingReviews: [
      "Hanyu — financial-formula and terminology review",
      "Pankuri — beginner-facing wording review",
      "Leo — BOUND-BID-05 known-answer example review",
    ],
    balanceLimitation:
      'All four resolved final rates are positive, and Energy has the highest scripted rate at +20% — the top of the permitted range. With no separate risk penalty, allocating the maximum permitted amount to Energy produces the largest market-stage gain in this configuration. This configuration is not balance-validated and must not be claimed to prove that diversification is always the highest-return choice.',
  },

  startingCashCents: dollarsToCents(10000),

  sectors: {
    technology: {
      label: 'Technology',
      description:
        'Companies that provide software and information-technology services or make technology hardware, electronic equipment and semiconductors.',
      baseRate: 0.12,
      resolvedRate: 0.19, // +12% base + 2% macro + 5% boost
    },
    healthCare: {
      label: 'Health Care',
      description:
        'Companies providing health services, medicines, biotechnology products, medical equipment and health-related supplies. Demand may be less sensitive to economic cycles than in some other sectors, but returns are not guaranteed.',
      baseRate: 0.05,
      resolvedRate: 0.07, // +5% base + 2% macro
    },
    everydayGoods: {
      label: 'Everyday Goods',
      description:
        'Companies making or selling frequently purchased products such as food, drinks, household goods and personal-care products. These businesses are often described as relatively defensive, but their investments may still gain or lose value.',
      labelNote:
        '"Everyday Goods" is Market Empire\'s beginner-facing project label based on the GICS "Consumer Staples" sector; it is not an official GICS sector name (see docs/finance/source-ledger.md FIN-SRC-005).',
      baseRate: 0.03,
      resolvedRate: 0.01, // +3% base + 2% macro - 4% drag
    },
    energy: {
      label: 'Energy',
      description:
        'Companies involved in producing, processing, transporting or supporting oil, gas and other consumable fuels.',
      baseRate: 0.14,
      resolvedRate: 0.2, // +14% base + 2% macro + 4% boost
    },
  },

  sectorRateRange: {
    minRate: -0.15,
    maxRate: 0.2,
  },

  indicators: [
    {
      id: 'macro-trend',
      headline: 'Inflation Cools and Consumer Outlook Improves',
      meaning:
        'In this fictional demo round, this positive macro signal applies a project-authored +2% modifier to all four sectors; it is a scripted game mechanic, not a market forecast.',
      sourceLabel:
        'Scripted Demo Signal — informed by BLS inflation reporting, Federal Reserve inflation guidance, and The Conference Board Consumer Confidence Survey (general context only; the exact +2% modifier is project-authored and not sourced from these institutions).',
      effects: [{ sector: 'all', modifier: 0.02 }],
    },
    {
      id: 'sector-boost',
      headline: 'Enterprise Cloud and Digital Infrastructure Spending Accelerates',
      meaning:
        'In this fictional demo round, increased technology spending applies a project-authored +5% modifier to Technology; it does not guarantee that technology investments generally earn this return.',
      sourceLabel:
        'Scripted Demo Signal — informed by Gartner and IDC technology-spending research (general context only; the exact +5% modifier is project-authored).',
      effects: [{ sector: 'technology', modifier: 0.05 }],
    },
    {
      id: 'risk-counter-signal',
      headline: 'Global Crude Supply Bottlenecks Raise Fuel Costs',
      meaning:
        'In this fictional demo round, a fuel-supply disruption applies a project-authored +4% modifier to Energy and a -4% modifier to Everyday Goods; these exact effects are not real-world forecasts.',
      sourceLabel:
        'Scripted Demo Signal — informed by U.S. Energy Information Administration reporting (general context only; the exact modifiers are project-authored).',
      effects: [
        { sector: 'energy', modifier: 0.04 },
        { sector: 'everydayGoods', modifier: -0.04 },
      ],
    },
  ],

  property: {
    name: 'Metro Tech Hub Plaza',
    type: 'Commercial Real Estate (Office & Retail Space)',
    askingPriceCents: dollarsToCents(4000),
    grossRentalIncomeCents: dollarsToCents(350),
    operatingCostCents: dollarsToCents(100),
    scriptedOpponentBidCents: dollarsToCents(4250),
  },

  coach: {
    introduction:
      'Welcome to Market Empire. You begin this demo with $10,000 in Available Cash. Market indicators provide clues, not guarantees. You can spread your investment across sectors, keep cash available for later, and then decide whether to bid on one fictional property. I will explain each step and every confirmed result without choosing an amount for you.',
    permittedTerms: ['Available Cash', 'Liquidity', 'Diversification', 'Concentration Risk', 'Net Property Result'],
    prohibitedTerms: [
      '"Credits" (always use "Available Cash" instead)',
      'Arbitrary numeric risk scores',
      'Guaranteed-return promises or claims that defensive sectors cannot lose value',
      'Advanced mechanics (short selling, leverage, margin calls, options)',
    ],
  },

  desktopBaseline: {
    widthPx: 1440,
    heightPx: 900,
    description:
      '1440 × 900 baseline resolution, with a fixed isometric district viewport, a persistent top HUD (Available Cash, current stage, time-of-day state), and a right-side interactive panel.',
  },
}
