import type { MarketResultCategory } from '../engine'

/**
 * Scripted Coach and sector-popup wording approved by docs/DECISIONS.md
 * DEC-011. Copied verbatim — do not revise punctuation, terms,
 * capitalization or meaning here. Screen 2's Coach content is not
 * duplicated in this module; it is read directly from the existing
 * tutorial source of truth (src/content/gameConfig.ts, src/content/
 * tutorialSteps.ts) via `state.tutorialStep`.
 */

export const coachTriggerLabel = 'Coach'
export const coachPanelHeading = 'Coach'
export const coachCloseButtonLabel = 'Close Coach panel'

export const screen3CoachMessage =
  'These market indicators are clues, not guarantees. Open each one to see what it means. Analyze City unlocks once all three have been reviewed.'

export const screen4CoachMessage =
  'Choose how much Available Cash to allocate to each sector. Your total cannot exceed your Available Cash. Cash left unallocated remains available for the property auction. I will not choose an amount for you.'

export const screen7CoachMessage =
  'This is the end of the one-round demo. Review your ending cash, property result, and overall round change. Play Again resets the demo to the beginning.'

export interface MarketResultCoachContent {
  heading: string
  message: string
}

/**
 * Maps the engine-owned MarketResultCategory (src/engine/
 * marketResultCategory.ts) to its approved DEC-011 heading/message pair.
 * The sign-classification logic itself is never reproduced here.
 */
export const marketResultCoachContent: Record<MarketResultCategory, MarketResultCoachContent> = {
  netGain: {
    heading: 'Net Gain',
    message:
      'At least one sector gained and none lost this round. Review the per-sector breakdown and total market change below.',
  },
  netLoss: {
    heading: 'Net Loss',
    message:
      'At least one sector lost and none gained this round. Review the per-sector breakdown and total market change below.',
  },
  mixed: {
    heading: 'Mixed',
    message: 'Some sectors gained and others lost this round. Review the per-sector breakdown and total market change below.',
  },
  noChange: {
    heading: 'No Change',
    message: 'No sector gained or lost this round. Review the per-sector breakdown and total market change below.',
  },
}

export const sealedBidPreSubmissionMessage =
  'This is a sealed bid. The Scripted Opponent\'s bid stays hidden until you submit yours. A bid above the Scripted Opponent\'s bid wins, and the winner pays the amount submitted. Your bid cannot exceed your Available Cash.'

export const bidWonMessage =
  'You bid above the Scripted Opponent and won the property. Your submitted bid was deducted from Available Cash, and the displayed net property result was then applied.'

export const bidBelowOpponentMessage =
  'Your bid was below the Scripted Opponent\'s bid, so you did not win the property. Your bid was not deducted from Available Cash.'

export const bidTieMessage =
  'Your bid matched the Scripted Opponent\'s bid. The Scripted Opponent wins a tie, and your bid was not deducted from Available Cash.'

/**
 * Sector-information popup trigger label. DEC-011 approves an exact
 * close-button template ("Close {sector label} information") but does not
 * separately specify an open-trigger label. This mirrors that approved
 * template with its natural counterpart verb ("Show" in place of "Close"),
 * using only the already-approved sector label (DEC-010) and the word
 * "information" already present in the DEC-011 template, rather than
 * inventing unrelated wording. Leading with "Show " (instead of the bare
 * sector label) also keeps this trigger's accessible name distinct from
 * the existing Screen 4 landmark-selection button, which starts with the
 * sector label itself and is matched by name in e2e-001-full-walkthrough.
 */
export function sectorInfoTriggerLabel(sectorLabel: string): string {
  return `Show ${sectorLabel} information`
}

export function sectorInfoCloseButtonLabel(sectorLabel: string): string {
  return `Close ${sectorLabel} information`
}
