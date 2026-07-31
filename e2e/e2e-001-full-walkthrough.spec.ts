import { expect, test, type Page } from '@playwright/test'
import { gameConfig } from '../src/content/gameConfig'
import { tutorialTopics } from '../src/content/tutorialSteps'
import { formatCentsAsDollars } from '../src/components/format'
import { SECTOR_KEYS } from '../src/state/gameActions'
import {
  cashAfterMarket,
  cashAfterProperty,
  dollarsToCents,
  endingPosition,
  netPropertyResult,
  propertyCarryingValue,
  resolveBid,
  roundChange,
  roundChangeCategory,
  settleSector,
  totalMarketChange,
  unallocatedCash,
} from '../src/engine'

/**
 * E2E-001 (docs/testing/initial-test-plan.md): one deterministic
 * seven-screen walkthrough, per the transition table in
 * docs/DEMO_SPEC.md §12.
 *
 * Every numeric input used below traces to an existing, approved source
 * — none is invented for this test:
 *
 * - Sector allocation ($2,500 to each of the four sectors, fully
 *   allocating the $10,000 starting cash) — docs/finance/source-ledger.md
 *   FIN-EX-002, src/engine/settlement.test.ts CALC-002, and
 *   docs/testing/initial-test-plan.md BOUND-ALLOC-01.
 * - Player bid ($4,500) — docs/finance/source-ledger.md FIN-EX-010 and
 *   src/engine/property.test.ts BOUND-BID-05 (FIN-EX-010). The opponent
 *   bid ($4,250), gross income ($350) and operating cost ($100) that
 *   fixture uses are the same values already in `gameConfig` (DEC-010),
 *   so this step uses only already-approved configuration plus the
 *   FIN-EX-010 bid amount.
 *
 * Every other displayed figure (per-sector/total market change, cash
 * after market, cash after property, ending position, round change) is
 * computed below by calling the real engine functions (src/engine/) with
 * those two inputs and the real `gameConfig` — the same functions the
 * application itself calls — never hand-calculated or hardcoded.
 */

const ALLOCATION_PER_SECTOR_CENTS = dollarsToCents(2500) // FIN-EX-002 / CALC-002 / BOUND-ALLOC-01
const PLAYER_BID_CENTS = dollarsToCents(4500) // FIN-EX-010 / BOUND-BID-05

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Range inputs aren't fillable via locator.fill(); set the value via the
 * native setter and dispatch a real 'input' event so React's onChange fires. */
async function setRangeValue(locator: ReturnType<Page['getByLabel']>, value: number) {
  await locator.evaluate((el, v) => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
    setter.call(el, String(v))
    el.dispatchEvent(new Event('input', { bubbles: true }))
  }, value)
}

test('E2E-001: full seven-screen deterministic walkthrough', async ({ page }) => {
  // ---- Precompute every expected engine-produced figure up front, using
  // only the real engine functions and the two approved inputs above. ----
  const startingCashCents = gameConfig.startingCashCents

  const sectorResultsCents: Record<string, number> = {}
  const settledValuesCents: number[] = []
  for (const key of SECTOR_KEYS) {
    const rate = gameConfig.sectors[key].resolvedRate
    const settlement = settleSector(ALLOCATION_PER_SECTOR_CENTS, rate)
    sectorResultsCents[key] = settlement.sectorChangeCents
    settledValuesCents.push(settlement.settledValueCents)
  }
  const totalAllocatedCents = ALLOCATION_PER_SECTOR_CENTS * SECTOR_KEYS.length
  const totalMarketChangeCents = totalMarketChange(Object.values(sectorResultsCents))
  const unallocatedCashCents = unallocatedCash(startingCashCents, totalAllocatedCents)
  const cashAfterMarketCents = cashAfterMarket(unallocatedCashCents, settledValuesCents)

  const opponentBidCents = gameConfig.property.scriptedOpponentBidCents
  const bidOutcome = resolveBid(PLAYER_BID_CENTS, opponentBidCents)
  const netPropertyResultCents = netPropertyResult(
    gameConfig.property.grossRentalIncomeCents,
    gameConfig.property.operatingCostCents,
  )
  const cashAfterPropertyCents = cashAfterProperty(
    cashAfterMarketCents,
    bidOutcome,
    PLAYER_BID_CENTS,
    netPropertyResultCents,
  )
  const propertyCarryingValueCents = propertyCarryingValue(bidOutcome.propertyWon, PLAYER_BID_CENTS)
  const endingPositionCents = endingPosition(cashAfterPropertyCents, propertyCarryingValueCents)
  const roundChangeCents = roundChange(endingPositionCents, startingCashCents)
  const category = roundChangeCategory(roundChangeCents)

  // ---- Screen 1: Start (docs/DEMO_SPEC.md §11) ----
  await test.step('Screen 1 — Start', async () => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Market Empire' })).toBeVisible()
    const startButton = page.getByRole('button', { name: 'Start Demo' })
    await expect(startButton).toBeVisible()
    await startButton.click()
    await expect(page.getByRole('heading', { name: 'Coach Tutorial' })).toBeVisible()
  })

  // ---- Screen 2: Coach Tutorial ----
  await test.step('Screen 2 — Coach Tutorial', async () => {
    const totalSteps = tutorialTopics.length + 1

    await expect(page.getByText(gameConfig.coach.introduction)).toBeVisible()
    await expect(page.getByText(`Step 1 of ${totalSteps}`)).toBeVisible()

    const nextButton = page.getByRole('button', { name: 'Next' })
    const backButton = page.getByRole('button', { name: 'Back' })
    await expect(backButton).toBeDisabled()

    await nextButton.click()
    await expect(page.getByText(tutorialTopics[0])).toBeVisible()
    await expect(page.getByText(`Step 2 of ${totalSteps}`)).toBeVisible()

    await backButton.click()
    await expect(page.getByText(gameConfig.coach.introduction)).toBeVisible()
    await expect(page.getByText(`Step 1 of ${totalSteps}`)).toBeVisible()

    for (let i = 0; i < tutorialTopics.length; i += 1) {
      await nextButton.click()
      await expect(page.getByText(tutorialTopics[i])).toBeVisible()
    }
    // One more Next from the final step finishes the tutorial
    // (§12: "Finish steps or Skip Tutorial" -> 3).
    await nextButton.click()
    await expect(page.getByRole('heading', { name: 'Market Intelligence' })).toBeVisible()
  })

  // ---- Screen 3: Market Intelligence ----
  await test.step('Screen 3 — Market Intelligence', async () => {
    const analyzeButton = page.getByRole('button', { name: 'Analyze City' })
    await expect(analyzeButton).toBeDisabled()

    for (const indicator of gameConfig.indicators) {
      const indicatorButton = page.getByRole('button', {
        name: new RegExp(`^${escapeRegExp(indicator.headline)}`),
      })
      await expect(indicatorButton).toBeVisible()
      await indicatorButton.click()
      await expect(page.getByText(indicator.meaning)).toBeVisible()
    }

    await expect(analyzeButton).toBeEnabled()
    await analyzeButton.click()
    await expect(page.getByRole('heading', { name: 'City Investment Decision' })).toBeVisible()
  })

  // ---- Screen 4: City Investment Decision ----
  await test.step('Screen 4 — City Investment Decision', async () => {
    for (const key of SECTOR_KEYS) {
      const label = gameConfig.sectors[key].label
      const landmarkButton = page.getByRole('button', { name: new RegExp(`^${escapeRegExp(label)}`) })
      await expect(landmarkButton).toBeVisible()
      await landmarkButton.click()

      await expect(page.getByText(gameConfig.sectors[key].description)).toBeVisible()

      const slider = page.getByLabel(`Allocation for ${label}`)
      await expect(slider).toBeVisible()
      await setRangeValue(slider, ALLOCATION_PER_SECTOR_CENTS)

      await expect(landmarkButton).toHaveText(`${label} (${formatCentsAsDollars(ALLOCATION_PER_SECTOR_CENTS)})`)
    }

    await expect(page.getByText(`Total allocated: ${formatCentsAsDollars(totalAllocatedCents)}`)).toBeVisible()
    await expect(page.getByText(`Cash remaining: ${formatCentsAsDollars(unallocatedCashCents)}`)).toBeVisible()

    await page.getByRole('button', { name: 'Confirm Investments' }).click()
    await expect(page.getByRole('heading', { name: 'Market Result' })).toBeVisible()
  })

  // ---- Screen 5: Market Result ----
  await test.step('Screen 5 — Market Result', async () => {
    for (const key of SECTOR_KEYS) {
      const change = sectorResultsCents[key]
      const word = change > 0 ? 'Gain' : change < 0 ? 'Loss' : 'No change'
      const sign = change > 0 ? '+' : change < 0 ? '−' : ''
      // Sign + word text asserted directly — not colour alone (§18).
      await expect(
        page.getByText(`${gameConfig.sectors[key].label}: ${sign}${formatCentsAsDollars(Math.abs(change))} (${word})`),
      ).toBeVisible()
    }

    const totalWord = totalMarketChangeCents > 0 ? 'Gain' : totalMarketChangeCents < 0 ? 'Loss' : 'No change'
    const totalSign = totalMarketChangeCents > 0 ? '+' : totalMarketChangeCents < 0 ? '−' : ''
    await expect(
      page.getByText(
        `Total market change: ${totalSign}${formatCentsAsDollars(Math.abs(totalMarketChangeCents))} (${totalWord})`,
      ),
    ).toBeVisible()
    // "Available Cash: $X" also appears in the persistent HUD with the
    // same value at this point — scope to the result panel to disambiguate.
    await expect(
      page.getByLabel('Decision and result panel').getByText(`Available Cash: ${formatCentsAsDollars(cashAfterMarketCents)}`),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Continue to Auction' }).click()
    await expect(page.getByRole('heading', { name: gameConfig.property.name })).toBeVisible()
  })

  // ---- Screen 6: Property Opportunity & Sealed Bid ----
  await test.step('Screen 6 — Property Opportunity & Sealed Bid', async () => {
    await expect(page.getByText(gameConfig.property.type)).toBeVisible()
    await expect(page.getByText(`Asking price: ${formatCentsAsDollars(gameConfig.property.askingPriceCents)}`)).toBeVisible()
    await expect(
      page.getByText(`Gross income: ${formatCentsAsDollars(gameConfig.property.grossRentalIncomeCents)}`),
    ).toBeVisible()
    await expect(
      page.getByText(`Operating cost: ${formatCentsAsDollars(gameConfig.property.operatingCostCents)}`),
    ).toBeVisible()

    // Exact opponent label — no parenthetical.
    await expect(page.getByText('Opponent: Scripted Opponent', { exact: true })).toBeVisible()
    // Opponent bid must not be visible before submission.
    await expect(page.getByText(formatCentsAsDollars(opponentBidCents))).toHaveCount(0)

    await page.getByLabel('Your bid ($)').fill('4500')
    await page.getByRole('button', { name: 'Submit Bid' }).click()

    await expect(page.getByRole('heading', { name: `${gameConfig.property.name} — Result` })).toBeVisible()
    await expect(page.getByText(`Your bid: ${formatCentsAsDollars(PLAYER_BID_CENTS)}`)).toBeVisible()
    // Opponent bid becomes visible after submission.
    await expect(page.getByText(`Scripted Opponent bid: ${formatCentsAsDollars(opponentBidCents)}`)).toBeVisible()
    // getByText() matches case-insensitively by default, so this search
    // for "Won" also matches the lowercase "won" inside the approved
    // Issue #11 win explanation (docs/DECISIONS.md DEC-011/DEC-012),
    // which is now legitimately visible elsewhere on this same screen.
    // .first() disambiguates back to the original won/not-won indicator
    // element; the assertion itself is unchanged.
    await expect(page.getByText('Won').first()).toBeVisible()
    await expect(page.getByText(`Cash after property: ${formatCentsAsDollars(cashAfterPropertyCents)}`)).toBeVisible()
    await expect(page.getByText(`Net property result: ${formatCentsAsDollars(netPropertyResultCents)}`)).toBeVisible()

    await page.getByRole('button', { name: 'Continue' }).click()
    await expect(page.getByRole('heading', { name: 'Round Summary' })).toBeVisible()
  })

  // ---- Screen 7: Round Summary ----
  await test.step('Screen 7 — Round Summary', async () => {
    await expect(page.getByText(`Starting cash: ${formatCentsAsDollars(startingCashCents)}`)).toBeVisible()
    await expect(page.getByText(`Ending cash: ${formatCentsAsDollars(cashAfterPropertyCents)}`)).toBeVisible()
    await expect(page.getByText(`Property result: ${formatCentsAsDollars(netPropertyResultCents)}`)).toBeVisible()
    await expect(
      page.getByText(`Round change: ${formatCentsAsDollars(roundChangeCents)} (${category})`),
    ).toBeVisible()
    await expect(
      page
        .getByLabel('Decision and result panel')
        .getByText(`Total market change: ${formatCentsAsDollars(totalMarketChangeCents)}`),
    ).toBeVisible()
    await expect(
      page
        .getByLabel('Decision and result panel')
        .getByText(`Property carrying value: ${formatCentsAsDollars(propertyCarryingValueCents)}`),
    ).toBeVisible()
    await expect(
      page
        .getByLabel('Decision and result panel')
        .getByText(`Ending position: ${formatCentsAsDollars(endingPositionCents)}`),
    ).toBeVisible()
    await expect(
      page
        .getByLabel('Decision and result panel')
        .getByText(`Property ownership: ${gameConfig.property.name} — Owned`),
    ).toBeVisible()

    await expect(page.getByText('Future Game Content')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Future Game Content' })).toHaveCount(0)
    await expect(page.getByRole('link', { name: 'Future Game Content' })).toHaveCount(0)

    await page.getByRole('button', { name: 'Play Again' }).click()

    // Full reset back to Start.
    await expect(page.getByRole('heading', { name: 'Market Empire' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Start Demo' })).toBeVisible()

    // Confirm the reset actually restored initial state, not just the screen.
    await page.getByRole('button', { name: 'Start Demo' }).click()
    await expect(page.getByText(`Available Cash: ${formatCentsAsDollars(startingCashCents)}`)).toBeVisible()
    await expect(page.getByText('Stage: Coach Tutorial')).toBeVisible()
    await expect(page.getByText('Time of day: Daytime')).toBeVisible()
    // Prove the tutorial content itself reset to step 1, not just the stage label.
    await expect(page.getByText(gameConfig.coach.introduction)).toBeVisible()
  })
})
