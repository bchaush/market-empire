import { expect, test, type Page } from '@playwright/test'
import { gameConfig } from '../src/content/gameConfig'
import { tutorialTopics } from '../src/content/tutorialSteps'
import {
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
import { dollarsToCents, marketResultCategory, settleSector } from '../src/engine'

/**
 * Focused coverage for the DEC-011 disclosure-popover wiring (Coach
 * access, Screens 2-7; sector information, Screen 4). E2E-001 remains the
 * complete seven-screen golden-path walkthrough and is unmodified — this
 * spec only exercises the new popover interactions, reusing the same
 * already-approved fixtures (docs/finance/source-ledger.md FIN-EX-002 /
 * FIN-EX-010) rather than inventing new inputs.
 *
 * Screen 6 below-opponent and tied-bid Coach messages are approved
 * content but are not exercised here (see docs/testing/initial-test-plan.md
 * — covering them would require a second full seven-screen setup); they
 * are not claimed as browser-covered by this spec.
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

  // ---- Screen 6 pre-submission. ----
  await page.getByRole('button', { name: 'Continue to Auction' }).click()
  await expect(page.getByRole('heading', { name: gameConfig.property.name })).toBeVisible()

  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await coachTrigger.click()
  await expect(coachPanel).toContainText(sealedBidPreSubmissionMessage)
  await expect(page.getByText('Coach area — content not yet implemented.')).toHaveCount(0)
  await coachTrigger.click()

  // ---- Submit the FIN-EX-010 winning bid -> Screen 6 post-submission (win). ----
  await page.getByLabel('Your bid ($)').fill('4500')
  await page.getByRole('button', { name: 'Submit Bid' }).click()
  await expect(page.getByRole('heading', { name: `${gameConfig.property.name} — Result` })).toBeVisible()

  await expect(coachTrigger).toHaveAttribute('aria-expanded', 'false')
  await coachTrigger.click()
  await expect(coachPanel).toContainText(bidWonMessage)
  await coachTrigger.click()

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
