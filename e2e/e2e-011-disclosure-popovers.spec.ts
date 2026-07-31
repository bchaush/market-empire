import { expect, test, type Page } from '@playwright/test'
import { gameConfig } from '../src/content/gameConfig'
import { tutorialTopics } from '../src/content/tutorialSteps'
import { formatCentsAsDollars } from '../src/components/format'
import {
  bidBelowOpponentMessage,
  bidTieMessage,
  bidWonMessage,
  coachCloseButtonLabel,
  coachPanelHeading,
  coachTriggerLabel,
  marketResultCoachContent,
  screen3CoachMessage,
  screen4CoachMessage,
  screen7CoachMessage,
  sealedBidPreSubmissionMessage,
  sectorInfoCloseButtonLabel,
  sectorInfoTriggerLabel,
} from '../src/content/issue11Guidance'
import { SECTOR_KEYS } from '../src/state/gameActions'
import { centsToDollars, dollarsToCents, marketResultCategory, settleSector } from '../src/engine'

// Approved Provisional desktop baseline (docs/DECISIONS.md DEC-010) — not
// invented differently here.
const DESKTOP_BASELINE_VIEWPORT = { width: 1440, height: 900 }

async function expectMinimumFontSize(locator: ReturnType<Page['locator']>, minPx = 16) {
  const fontSizePx = await locator.evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize))
  expect(fontSizePx).toBeGreaterThanOrEqual(minPx)
}

type Rect = { x: number; y: number; width: number; height: number }

function rectsOverlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}

async function requireBoundingBox(locator: ReturnType<Page['locator']>): Promise<Rect> {
  const box = await locator.boundingBox()
  expect(box).not.toBeNull()
  return box as Rect
}

/**
 * Focused coverage for the DEC-011/DEC-012 disclosure-popover wiring
 * (Coach access, Screens 2-7; sector information, Screen 4). E2E-001
 * remains the complete seven-screen golden-path walkthrough and is
 * unmodified — this spec only exercises the new popover interactions,
 * reusing already-approved fixtures (docs/finance/source-ledger.md
 * FIN-EX-002, FIN-EX-007, FIN-EX-008, FIN-EX-010; docs/DECISIONS.md
 * DEC-010's approved asking price and scripted opponent bid) rather than
 * inventing new inputs. All three Screen 6 post-submission branches (win,
 * below-opponent, tie) are exercised via the real browser flow below.
 */

const ALLOCATION_PER_SECTOR_CENTS = dollarsToCents(2500) // FIN-EX-002 / CALC-002 / BOUND-ALLOC-01
const PLAYER_BID_CENTS = dollarsToCents(4500) // FIN-EX-010 / BOUND-BID-05

const COACH_PANEL_ID = 'coach-panel'

async function setRangeValue(locator: ReturnType<Page['getByLabel']>, value: number) {
  await locator.evaluate((el, v) => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
    setter.call(el, String(v))
    el.dispatchEvent(new Event('input', { bubbles: true }))
  }, value)
}

/** Reaches Screen 6 pre-submission via the real seven-screen flow, using
 * the same already-approved $2,500-per-sector allocation as E2E-001. */
async function reachPreSubmissionAuction(page: Page) {
  await page.goto('/')
  await page.getByRole('button', { name: 'Start Demo' }).click()
  await page.getByRole('button', { name: 'Skip Tutorial' }).click()
  for (const indicator of gameConfig.indicators) {
    await page.getByRole('button', { name: new RegExp(`^${indicator.headline}`) }).click()
  }
  await page.getByRole('button', { name: 'Analyze City' }).click()
  for (const key of SECTOR_KEYS) {
    const label = gameConfig.sectors[key].label
    await page.getByRole('button', { name: new RegExp(`^${label} \\(`) }).click()
    await setRangeValue(page.getByLabel(`Allocation for ${label}`), ALLOCATION_PER_SECTOR_CENTS)
  }
  await page.getByRole('button', { name: 'Confirm Investments' }).click()
  await page.getByRole('button', { name: 'Continue to Auction' }).click()
  await expect(page.getByRole('heading', { name: gameConfig.property.name })).toBeVisible()
}

test('Coach disclosure popover: absent on Start, wired and functional on Screens 2-7', async ({ page }) => {
  // ---- Precompute the real, engine-owned Screen 5 category and its
  // approved Coach content, exactly as the application does. ----
  const sectorResultsCents: Record<string, number> = {}
  for (const key of SECTOR_KEYS) {
    const rate = gameConfig.sectors[key].resolvedRate
    sectorResultsCents[key] = settleSector(ALLOCATION_PER_SECTOR_CENTS, rate).sectorChangeCents
  }
  const expectedCategory = marketResultCategory(Object.values(sectorResultsCents))
  const expectedMarketResultContent = marketResultCoachContent[expectedCategory]

  // ---- Screen 1: Start — no Coach trigger at all. ----
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Market Empire' })).toBeVisible()
  await expect(page.getByRole('button', { name: coachTriggerLabel, exact: true })).toHaveCount(0)

  await page.getByRole('button', { name: 'Start Demo' }).click()
  await expect(page.getByRole('heading', { name: 'Coach Tutorial' })).toBeVisible()

  const coachTrigger = page.getByRole('button', { name: coachTriggerLabel, exact: true })
  const coachPanel = page.locator(`#${COACH_PANEL_ID}`)
  const resultPanel = page.getByLabel('Decision and result panel')

  // ---- Screen 2: full interaction contract exercised once here; later
  // screens re-verify only content + placeholder absence to avoid
  // duplicating the same interaction assertions seven times. ----
  await expect(coachTrigger).toBeVisible()
  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await expect(coachTrigger).toHaveAttribute('aria-controls', COACH_PANEL_ID)

  // Keyboard (Enter) activation; focus stays on the trigger on open.
  await coachTrigger.focus()
  await coachTrigger.press('Enter')
  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'true')
  await expect(coachTrigger).toBeFocused()
  await expect(coachPanel).toBeVisible()
  await expect(coachPanel.getByRole('heading', { name: coachPanelHeading })).toBeVisible()
  await expect(coachPanel).toContainText(gameConfig.coach.introduction)
  expect(await coachPanel.getAttribute('role')).toBeNull()
  expect(await coachPanel.getAttribute('aria-modal')).toBeNull()

  // Escape closes; focus returns to the trigger.
  await page.keyboard.press('Escape')
  await expect(coachPanel).toBeHidden()
  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await expect(coachTrigger).toBeFocused()

  // Reopen; close via the close button; focus returns to the trigger.
  await coachTrigger.click()
  await expect(coachPanel).toBeVisible()
  await page.getByRole('button', { name: coachCloseButtonLabel }).click()
  await expect(coachPanel).toBeHidden()
  await expect(coachTrigger).toBeFocused()

  // Re-clicking the (closed) trigger opens it; re-clicking again toggles
  // it closed — neither navigates nor changes game state.
  await coachTrigger.click()
  await expect(coachPanel).toBeVisible()
  await coachTrigger.click()
  await expect(coachPanel).toBeHidden()
  await expect(page.getByRole('heading', { name: 'Coach Tutorial' })).toBeVisible()
  await expect(page.getByText('Step 1 of')).toBeVisible()

  await expect(page.getByText('Coach area — content not yet implemented.')).toHaveCount(0)

  // ---- Advance through the tutorial (existing controls, unmodified) to
  // Screen 3, confirming the popover survives navigation without stale
  // content. ----
  const nextButton = page.getByRole('button', { name: 'Next' })
  for (let i = 0; i < tutorialTopics.length + 1; i += 1) {
    await nextButton.click()
  }
  await expect(page.getByRole('heading', { name: 'Market Intelligence' })).toBeVisible()

  // The popover reset on navigation, and the placeholder never reappears.
  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await expect(coachPanel).toBeHidden()
  await coachTrigger.click()
  await expect(coachPanel).toContainText(screen3CoachMessage)
  await expect(page.getByText('Coach area — content not yet implemented.')).toHaveCount(0)
  await coachTrigger.click()

  // ---- Screen 3 -> Screen 4. ----
  for (const indicator of gameConfig.indicators) {
    await page.getByRole('button', { name: new RegExp(`^${indicator.headline}`) }).click()
  }
  await page.getByRole('button', { name: 'Analyze City' }).click()
  await expect(page.getByRole('heading', { name: 'City Investment Decision' })).toBeVisible()

  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await coachTrigger.click()
  await expect(coachPanel).toContainText(screen4CoachMessage)
  await expect(page.getByText('Coach area — content not yet implemented.')).toHaveCount(0)
  await coachTrigger.click()

  // ---- Allocate $2,500 to each sector and confirm -> Screen 5. ----
  for (const key of SECTOR_KEYS) {
    const label = gameConfig.sectors[key].label
    await page.getByRole('button', { name: new RegExp(`^${label} \\(`) }).click()
    await setRangeValue(page.getByLabel(`Allocation for ${label}`), ALLOCATION_PER_SECTOR_CENTS)
  }
  await page.getByRole('button', { name: 'Confirm Investments' }).click()
  await expect(page.getByRole('heading', { name: 'Market Result' })).toBeVisible()

  // ---- Screen 5: Coach content matches the real engine-owned category. ----
  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await coachTrigger.click()
  await expect(coachPanel.getByRole('heading', { name: expectedMarketResultContent.heading })).toBeVisible()
  await expect(coachPanel).toContainText(expectedMarketResultContent.message)
  await expect(page.getByText('Coach area — content not yet implemented.')).toHaveCount(0)
  await coachTrigger.click()

  // The same approved explanation is also visible directly in the main
  // decision/result panel (docs/DECISIONS.md DEC-011), not only the Coach
  // popover, and meets the 16px-equivalent readability target.
  await expect(resultPanel.getByRole('heading', { name: expectedMarketResultContent.heading, exact: true })).toBeVisible()
  const marketResultExplanationText = resultPanel.getByText(expectedMarketResultContent.message, { exact: true })
  await expect(marketResultExplanationText).toBeVisible()
  await expectMinimumFontSize(marketResultExplanationText)

  // ---- Screen 6 pre-submission. ----
  await page.getByRole('button', { name: 'Continue to Auction' }).click()
  await expect(page.getByRole('heading', { name: gameConfig.property.name })).toBeVisible()

  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await coachTrigger.click()
  await expect(coachPanel).toContainText(sealedBidPreSubmissionMessage)
  await expect(page.getByText('Coach area — content not yet implemented.')).toHaveCount(0)
  await coachTrigger.click()

  // Visible in the main panel too; old placeholder gone; opponent bid
  // still hidden pre-submission.
  const preSubmissionExplanationText = resultPanel.getByText(sealedBidPreSubmissionMessage, { exact: true })
  await expect(preSubmissionExplanationText).toBeVisible()
  await expectMinimumFontSize(preSubmissionExplanationText)
  await expect(page.getByText('Sealed-bid explanation: content pending approval.')).toHaveCount(0)
  await expect(page.getByText(formatCentsAsDollars(gameConfig.property.scriptedOpponentBidCents))).toHaveCount(0)

  // ---- Submit the FIN-EX-010 winning bid -> Screen 6 post-submission (win). ----
  await page.getByLabel('Your bid ($)').fill('4500')
  await page.getByRole('button', { name: 'Submit Bid' }).click()
  await expect(page.getByRole('heading', { name: `${gameConfig.property.name} — Result` })).toBeVisible()

  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await coachTrigger.click()
  await expect(coachPanel).toContainText(bidWonMessage)
  await coachTrigger.click()

  const wonExplanationText = resultPanel.getByText(bidWonMessage, { exact: true })
  await expect(wonExplanationText).toBeVisible()
  await expectMinimumFontSize(wonExplanationText)

  // ---- Screen 7. ----
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.getByRole('heading', { name: 'Round Summary' })).toBeVisible()

  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await coachTrigger.click()
  await expect(coachPanel).toContainText(screen7CoachMessage)
  await expect(page.getByText('Coach area — content not yet implemented.')).toHaveCount(0)
})

test('Sector-information disclosure popovers on Screen 4', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Start Demo' }).click()
  await page.getByRole('button', { name: 'Skip Tutorial' }).click()
  for (const indicator of gameConfig.indicators) {
    await page.getByRole('button', { name: new RegExp(`^${indicator.headline}`) }).click()
  }
  await page.getByRole('button', { name: 'Analyze City' }).click()
  await expect(page.getByRole('heading', { name: 'City Investment Decision' })).toBeVisible()

  const availableCashLine = page.getByLabel('Heads-up display').getByText('Available Cash:')

  for (const key of SECTOR_KEYS) {
    const sector = gameConfig.sectors[key]
    const trigger = page.getByRole('button', { name: sectorInfoTriggerLabel(sector.label), exact: true })
    const panelId = `sector-info-${key}`
    const panel = page.locator(`#${panelId}`)

    await expect(trigger).toBeVisible()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toHaveAttribute('aria-controls', panelId)

    await trigger.click()
    await expect(panel).toBeVisible()
    await expect(panel.getByRole('heading', { name: sector.label, exact: true })).toBeVisible()
    await expect(panel).toContainText(sector.description)
    expect(await panel.getAttribute('role')).toBeNull()
    expect(await panel.getAttribute('aria-modal')).toBeNull()

    if (sector.labelNote) {
      await expect(panel).toContainText(sector.labelNote)
    } else {
      await expect(panel.locator('.sector-note')).toHaveCount(0)
    }

    // Opening/closing information never changes the displayed allocation.
    await expect(page.getByRole('button', { name: new RegExp(`^${sector.label} \\(`) })).toHaveText(
      `${sector.label} ($0.00)`,
    )

    await page.getByRole('button', { name: sectorInfoCloseButtonLabel(sector.label), exact: true }).click()
    await expect(panel).toBeHidden()
    await expect(trigger).toBeFocused()
  }

  // Only one sector-information popup open at a time.
  const technology = gameConfig.sectors.technology
  const healthCare = gameConfig.sectors.healthCare
  const technologyTrigger = page.getByRole('button', { name: sectorInfoTriggerLabel(technology.label), exact: true })
  const healthCareTrigger = page.getByRole('button', { name: sectorInfoTriggerLabel(healthCare.label), exact: true })
  const technologyPanel = page.locator('#sector-info-technology')
  const healthCarePanel = page.locator('#sector-info-healthCare')

  await technologyTrigger.click()
  await expect(technologyPanel).toBeVisible()
  await healthCareTrigger.click()
  await expect(healthCarePanel).toBeVisible()
  await expect(technologyPanel).toBeHidden()
  await expect(technologyTrigger).toHaveAttribute('aria-expanded', 'false')

  // Escape closes the active sector popup and restores focus to its trigger.
  await page.keyboard.press('Escape')
  await expect(healthCarePanel).toBeHidden()
  await expect(healthCareTrigger).toBeFocused()

  await expect(availableCashLine).toContainText('$10,000.00')
})

test('Screen 6 below-opponent bid: engine-owned branch selects the approved DEC-011 message', async ({ page }) => {
  await reachPreSubmissionAuction(page)

  // The property's own approved asking price ($4,000, DEC-010) is below
  // the shipped scripted opponent bid ($4,250) and within available cash
  // at this point — an existing approved value, not an invented bid.
  const belowOpponentBidDollars = centsToDollars(gameConfig.property.askingPriceCents)
  expect(belowOpponentBidDollars).toBeLessThan(centsToDollars(gameConfig.property.scriptedOpponentBidCents))

  const availableCashBefore = await page.getByText(/^Available cash: \$/).innerText()
  const availableCashValue = availableCashBefore.replace('Available cash: ', '')

  await page.getByLabel('Your bid ($)').fill(String(belowOpponentBidDollars))
  await page.getByRole('button', { name: 'Submit Bid' }).click()
  await expect(page.getByRole('heading', { name: `${gameConfig.property.name} — Result` })).toBeVisible()

  await expect(page.getByText('Not won')).toBeVisible()
  await expect(page.getByText(`Cash after property: ${availableCashValue}`)).toBeVisible()

  // Visible directly in the main decision/result panel, not only the
  // Coach popover, and meets the 16px-equivalent readability target.
  const resultPanel = page.getByLabel('Decision and result panel')
  const belowOpponentExplanationText = resultPanel.getByText(bidBelowOpponentMessage, { exact: true })
  await expect(belowOpponentExplanationText).toBeVisible()
  await expectMinimumFontSize(belowOpponentExplanationText)

  const coachTrigger = page.getByRole('button', { name: coachTriggerLabel, exact: true })
  const coachPanel = page.locator(`#${COACH_PANEL_ID}`)

  await coachTrigger.click()
  await expect(coachPanel).toBeVisible()
  await expect(coachTrigger).toBeFocused()
  await expect(coachPanel).toContainText(bidBelowOpponentMessage)

  await page.getByRole('button', { name: coachCloseButtonLabel }).click()
  await expect(coachPanel).toBeHidden()
  await expect(coachTrigger).toBeFocused()
})

test('Screen 6 tied bid: Scripted Opponent wins and the approved DEC-011 message appears', async ({ page }) => {
  await reachPreSubmissionAuction(page)

  // The player's bid exactly matches the shipped scripted opponent bid
  // (DEC-010) — an existing approved configuration value, not an
  // invented bid.
  const tiedBidDollars = centsToDollars(gameConfig.property.scriptedOpponentBidCents)

  const availableCashBefore = await page.getByText(/^Available cash: \$/).innerText()
  const availableCashValue = availableCashBefore.replace('Available cash: ', '')

  await page.getByLabel('Your bid ($)').fill(String(tiedBidDollars))
  await page.getByRole('button', { name: 'Submit Bid' }).click()
  await expect(page.getByRole('heading', { name: `${gameConfig.property.name} — Result` })).toBeVisible()

  await expect(page.getByText('Not won')).toBeVisible()
  await expect(page.getByText(`Cash after property: ${availableCashValue}`)).toBeVisible()

  // Visible directly in the main decision/result panel, not only the
  // Coach popover, and meets the 16px-equivalent readability target.
  const resultPanel = page.getByLabel('Decision and result panel')
  const tieExplanationText = resultPanel.getByText(bidTieMessage, { exact: true })
  await expect(tieExplanationText).toBeVisible()
  await expectMinimumFontSize(tieExplanationText)

  const coachTrigger = page.getByRole('button', { name: coachTriggerLabel, exact: true })
  const coachPanel = page.locator(`#${COACH_PANEL_ID}`)

  await coachTrigger.click()
  await expect(coachPanel).toBeVisible()
  await expect(coachTrigger).toBeFocused()
  await expect(coachPanel).toContainText(bidTieMessage)

  await page.getByRole('button', { name: coachCloseButtonLabel }).click()
  await expect(coachPanel).toBeHidden()
  await expect(coachTrigger).toBeFocused()
})

test('Desktop baseline (1440x900): no overflow, panel/action visible, explanations unclipped on Screens 2-7', async ({
  page,
}) => {
  // Approved Provisional 1440x900 desktop baseline (docs/DECISIONS.md
  // DEC-010) — the Playwright project default viewport is not this size,
  // so it is set explicitly rather than assumed.
  await page.setViewportSize(DESKTOP_BASELINE_VIEWPORT)

  const resultPanel = page.getByLabel('Decision and result panel')

  async function assertNoOverflowAndShellFits() {
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth)

    const shellBox = await requireBoundingBox(page.locator('.app-shell'))
    expect(shellBox.width).toBeLessThanOrEqual(DESKTOP_BASELINE_VIEWPORT.width)
  }

  async function assertExplanationUnclippedAndClearOfButton(
    explanationLocator: ReturnType<Page['locator']>,
    buttonLocator: ReturnType<Page['locator']>,
  ) {
    const explanationBox = await requireBoundingBox(explanationLocator)
    expect(explanationBox.width).toBeGreaterThan(0)
    expect(explanationBox.height).toBeGreaterThan(0)

    const clipped = await explanationLocator.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.overflowY === 'hidden' && el.scrollHeight > el.clientHeight
    })
    expect(clipped).toBe(false)

    const buttonBox = await requireBoundingBox(buttonLocator)
    expect(rectsOverlap(explanationBox, buttonBox)).toBe(false)
  }

  // ---- Screen 1 -> Screen 2. ----
  await page.goto('/')
  await page.getByRole('button', { name: 'Start Demo' }).click()
  await expect(page.getByRole('heading', { name: 'Coach Tutorial' })).toBeVisible()
  await assertNoOverflowAndShellFits()
  await expect(page.getByRole('button', { name: 'Skip Tutorial' })).toBeVisible()
  await page.getByRole('button', { name: 'Skip Tutorial' }).click()

  // ---- Screen 3. ----
  await expect(page.getByRole('heading', { name: 'Market Intelligence' })).toBeVisible()
  await assertNoOverflowAndShellFits()
  await expect(resultPanel).toBeVisible()
  for (const indicator of gameConfig.indicators) {
    await page.getByRole('button', { name: new RegExp(`^${indicator.headline}`) }).click()
  }
  const analyzeCityButton = page.getByRole('button', { name: 'Analyze City' })
  await expect(analyzeCityButton).toBeVisible()
  await analyzeCityButton.click()

  // ---- Screen 4. ----
  await expect(page.getByRole('heading', { name: 'City Investment Decision' })).toBeVisible()
  await assertNoOverflowAndShellFits()
  await expect(resultPanel).toBeVisible()
  for (const key of SECTOR_KEYS) {
    const label = gameConfig.sectors[key].label
    await page.getByRole('button', { name: new RegExp(`^${label} \\(`) }).click()
    await setRangeValue(page.getByLabel(`Allocation for ${label}`), ALLOCATION_PER_SECTOR_CENTS)
  }
  const confirmInvestmentsButton = page.getByRole('button', { name: 'Confirm Investments' })
  await expect(confirmInvestmentsButton).toBeVisible()
  await confirmInvestmentsButton.click()

  // ---- Screen 5: explanation unclipped and clear of the primary action. ----
  await expect(page.getByRole('heading', { name: 'Market Result' })).toBeVisible()
  await assertNoOverflowAndShellFits()
  await expect(resultPanel).toBeVisible()
  const continueToAuctionButton = page.getByRole('button', { name: 'Continue to Auction' })
  await expect(continueToAuctionButton).toBeVisible()
  await assertExplanationUnclippedAndClearOfButton(resultPanel.locator('.screen-explanation'), continueToAuctionButton)
  await continueToAuctionButton.click()

  // ---- Screen 6 pre-submission: explanation unclipped and clear of Submit Bid. ----
  await expect(page.getByRole('heading', { name: gameConfig.property.name })).toBeVisible()
  await assertNoOverflowAndShellFits()
  await expect(resultPanel).toBeVisible()
  const submitBidButton = page.getByRole('button', { name: 'Submit Bid' })
  await expect(submitBidButton).toBeVisible()
  await assertExplanationUnclippedAndClearOfButton(resultPanel.locator('.screen-explanation'), submitBidButton)

  await page.getByLabel('Your bid ($)').fill('4500')
  await submitBidButton.click()

  // ---- Screen 6 post-submission (win): explanation unclipped and clear of Continue. ----
  await expect(page.getByRole('heading', { name: `${gameConfig.property.name} — Result` })).toBeVisible()
  await assertNoOverflowAndShellFits()
  await expect(resultPanel).toBeVisible()
  const continueButton = page.getByRole('button', { name: 'Continue' })
  await expect(continueButton).toBeVisible()
  await assertExplanationUnclippedAndClearOfButton(resultPanel.locator('.screen-explanation'), continueButton)
  await continueButton.click()

  // ---- Screen 7. ----
  await expect(page.getByRole('heading', { name: 'Round Summary' })).toBeVisible()
  await assertNoOverflowAndShellFits()
  await expect(resultPanel).toBeVisible()
  await expect(page.getByRole('button', { name: 'Play Again' })).toBeVisible()
})
