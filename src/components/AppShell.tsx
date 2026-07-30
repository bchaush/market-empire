import type { ReactNode } from 'react'
import './AppShell.css'
import { formatCentsAsDollars } from './format'

/**
 * Persistent structural shell required by docs/DEMO_SPEC.md §7: a fixed
 * HUD, city-map area, right-side panel, Coach area, and an approval
 * status/limitations region, at the 1440x900 desktop baseline
 * (docs/DECISIONS.md DEC-010). Structural only — no map landmarks, screen
 * copy, or gameplay logic live here; those are Phase 2B.
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
        {coachContent ?? <p className="app-shell__placeholder">Coach area — content not yet implemented.</p>}
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
