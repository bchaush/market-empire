# components/

Reusable, screen-independent UI, per the engine/content/interface
separation described in Issue #7.

`AppShell.tsx` (added in Phase 2A) provides the persistent structural
regions required by `docs/DEMO_SPEC.md` §7 — HUD, city-map area, right
panel, and Coach area — hydrated from the Approved Provisional DEC-010
configuration (`src/content/gameConfig.ts`, `docs/DECISIONS.md` DEC-010).

`format.ts` provides presentation-only helpers (currency/label
formatting) shared across screens.

Screen-specific interactive content (indicator cards, allocation
controls, the bid form, gain/loss display, etc.) is implemented directly
in `src/screens/` (Phase 2B) and slotted into `AppShell`'s content
regions, rather than as separate reusable components — each screen's
content is specific enough to that screen that extracting shared
sub-components did not pay for itself yet.
