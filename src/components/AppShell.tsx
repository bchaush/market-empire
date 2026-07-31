import type { ReactNode } from 'react'
import './AppShell.css'
import { formatCentsAsDollars } from './format'
import { DisclosurePopover } from './DisclosurePopover'
import { coachCloseButtonLabel, coachPanelHeading, coachTriggerLabel } from '../content/issue11Guidance'

/**
 * Persistent structural shell required by docs/DEMO_SPEC.md §7: a fixed
 * HUD, city-map area, right-side panel, Coach area, and an approval
 * status/limitations region, at the 1440x900 desktop baseline
 * (docs/DECISIONS.md DEC-010). Structural only — no map landmarks, screen
 * copy, or gameplay logic live here; those are Phase 2B.
 *
 * The Coach section (docs/DECISIONS.md DEC-011) renders a persistent
 * DisclosurePopover trigger whenever the shell renders (Screens 2-7 —
 * Screen 1 never renders AppShell, so it never shows the trigger). Its
 * open/closed state and body content (`coachGuidance`) are owned by the
 * caller as local interface state, never GameState. `coachContent` is
 * unchanged and still carries Screen 2's full interactive tutorial panel.
 */
export interface AppShellProps {
  currentStage: string
  timeOfDay: string
  availableCashCents: number | null
  provisionalStatusLabel: string
  pendingReviews: string[]
  balanceLimitation: string
  cityMapContent?: ReactNode
  rightPanelContent?: ReactNode
  coachContent?: ReactNode
  coachGuidance: ReactNode
  isCoachOpen: boolean
  onCoachOpen: () => void
  onCoachClose: () => void
}

export function AppShell({
  currentStage,
  timeOfDay,
  availableCashCents,
  provisionalStatusLabel,
  pendingReviews,
  balanceLimitation,
  cityMapContent,
  rightPanelContent,
  coachContent,
  coachGuidance,
  isCoachOpen,
  onCoachOpen,
  onCoachClose,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-shell__hud" aria-label="Heads-up display">
        <span className="app-shell__hud-item">
          Available Cash: <strong>{formatCentsAsDollars(availableCashCents)}</strong>
        </span>
        <span className="app-shell__hud-item">Stage: {currentStage}</span>
        <span className="app-shell__hud-item">Time of day: {timeOfDay}</span>
        <span className="app-shell__provisional-badge" role="status">
          {provisionalStatusLabel}
        </span>
      </header>

      <section className="app-shell__city-map" aria-label="City map">
        {cityMapContent ?? (
          <p className="app-shell__placeholder">City map area — landmarks not yet implemented.</p>
        )}
      </section>

      <aside className="app-shell__right-panel" aria-label="Decision and result panel">
        {rightPanelContent ?? (
          <p className="app-shell__placeholder">Right panel area — screen content not yet implemented.</p>
        )}
      </aside>

      <section className="app-shell__coach" aria-label="Market Coach">
        <DisclosurePopover
          panelId="coach-panel"
          triggerLabel={coachTriggerLabel}
          panelHeading={coachPanelHeading}
          closeButtonLabel={coachCloseButtonLabel}
          isOpen={isCoachOpen}
          onOpen={onCoachOpen}
          onClose={onCoachClose}
        >
          {coachGuidance}
        </DisclosurePopover>
        {coachContent}
      </section>

      <section className="app-shell__status" aria-label="Approval status and limitations">
        <p className="app-shell__status-badge">{provisionalStatusLabel}</p>

        <h2 className="app-shell__status-heading">Pending reviews</h2>
        <ul className="app-shell__status-list">
          {pendingReviews.map((review) => (
            <li key={review}>{review}</li>
          ))}
        </ul>

        <h2 className="app-shell__status-heading">Balance limitation</h2>
        <p className="app-shell__status-limitation">{balanceLimitation}</p>
      </section>
    </div>
  )
}
