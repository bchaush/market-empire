# components/

Reusable, screen-independent UI, per the engine/content/interface
separation described in Issue #7.

`AppShell.tsx` (added in Phase 2A) provides the persistent structural
regions required by `docs/DEMO_SPEC.md` §7 — HUD, city-map area, right
panel, and Coach area — hydrated from the Approved Provisional DEC-010
configuration (`src/content/gameConfig.ts`, `docs/DECISIONS.md` DEC-010).

Screen-specific components (map landmarks, indicator cards, allocation
sliders, the bid form, gain/loss indicator, etc.) are not yet implemented —
deferred to Phase 2B.
