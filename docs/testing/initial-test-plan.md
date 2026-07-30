# Market Empire Initial Test Plan

**Status:** Provisional working document
**Related issue:** #3 — Initial test plan for the one-round demo
**Review required:** Leo or explicit team approval

## Purpose

This plan defines the testing strategy for the seven-screen one-round Market Empire demo: defect severity levels, a requirement-to-test mapping for all seven screens, known-answer tests, allocation and bidding boundary tests, one complete browser walkthrough, and basic accessibility checks.

It is a plan only. It does not execute any test, and it does not claim any test has passed.

## Scope and constraints

- Covers all seven screens under `docs/DECISIONS.md` DEC-001: Start, Coach Tutorial, Market Intelligence, City Investment Decision, Market Result, Property Opportunity & Sealed Bid, Round Summary. The original GitHub Issue #3 text referred to "six demo screens" — that wording predates DEC-001 and is superseded here; this plan is seven-screen throughout.
- No application (React/TypeScript) code exists in this repository yet. Every test below is therefore **Not Yet Executed**. No test in this document may be marked as passed until implementation exists and the test has actually been run against it, per `AGENTS.md`.
- Known-answer test inputs and expected outputs are taken only from `docs/finance/source-ledger.md` FIN-EX-001 through FIN-EX-009. No additional numbers, evidence, results, or approvals are invented.
- Out of scope for this plan (per Issue #3): writing actual Vitest/Playwright code, executing tests against nonexistent code, regression testing, multiplayer/load testing, automated visual-design testing, and Advanced Experience coverage.
- Evidence storage locations are named for future use only; `docs/testing/evidence/` is not created by this plan.
- Final usability and accessibility validation must occur against the coded demo, not Figma, per `docs/DECISIONS.md` DEC-009.

## Defect severity definitions

| Severity | Definition |
|---|---|
| **Blocks everything** | The round cannot be completed, an engine/calculation result is wrong, or a screen is impassable. The engine-vs-interface boundary in `docs/DEMO_SPEC.md` §14 is violated. |
| **Annoying but workable** | A correct engine result is displayed incorrectly or unclearly, a control misbehaves, input validation is not enforced, or an accessibility barrier makes a task harder without fully blocking it. The player can still finish the round. |
| **Minor** | Cosmetic, wording, or clarity issues that do not block or meaningfully hinder task completion (for example, the text-size and clarity findings already recorded in `docs/ux/beginner-flow.md`). |

## Requirement-to-test table (all seven screens)

Test types: **Unit** (engine logic, no UI), **Browser** (Playwright), **Accessibility** (manual, against coded demo), **Manual** (manual review).

| Screen | Requirement (source) | Test ID | Type | Expected result | Pass/fail rule | Evidence location | Status |
|---|---|---|---|---|---|---|---|
| 1 — Start | Resets all demo state and proceeds to Screen 2 (`DEMO_SPEC.md` §11) | REQ-01-01 | Browser | Screen 2 loads with all state reset to initial values | Pass only if every tracked state field (§13) equals its reset value | `docs/testing/evidence/req-01-01.md` (not yet created) | Not Yet Executed |
| 1 — Start | Start Demo is the only available action (`beginner-flow.md` Screen 1) | REQ-01-02 | Accessibility | Start Demo is reachable by keyboard and is the only focusable action | Pass only if keyboard-only navigation reaches Start Demo and no other control | (not yet created) | Not Yet Executed |
| 2 — Coach Tutorial | Next / Back / Skip Tutorial all function; no live AI; no open text entry (`DEMO_SPEC.md` §11) | REQ-02-01 | Browser | Each control moves to the correct tutorial step or exits to Screen 3 | Pass only if all three controls produce the documented transition on every step | (not yet created) | Not Yet Executed |
| 2 — Coach Tutorial | Coach introduces itself before existing steps; remains visible/accessible on every later screen (DEC-002, DEC-003, DEC-009 required coded improvement) | REQ-02-02 | Manual | Coach introduction is present; Coach popup is reachable on every applicable screen | Pass only if both conditions hold on the coded demo | (not yet created) | Not Yet Executed |
| 3 — Market Intelligence | All three indicators must be opened before Analyze City unlocks (`DEMO_SPEC.md` §11) | REQ-03-01 | Browser | Analyze City is disabled until all three cards are opened, then enabled | Pass only if the button is disabled for 0/1/2 opened cards and enabled at 3 | (not yet created) | Not Yet Executed |
| 4 — City Investment Decision | Correct landmark-to-panel mapping; allocation cannot exceed available cash; cash cannot go negative (`DEMO_SPEC.md` §11, §15) | REQ-04-01 | Browser | Selecting a landmark opens its own sector panel; over-allocation is rejected | Pass only if each of the four landmarks opens its own named panel and an over-allocation attempt is rejected, not silently corrected | (not yet created) | Not Yet Executed |
| 4 — City Investment Decision | Clearer beginner sector-selection explanations and neutral Coach guidance (`beginner-flow.md` Screen 4 observed finding; DEC-009 required coded improvement) | REQ-04-02 | Manual | Sector information popup is present and readable for each of the four sectors | Pass only if all four sectors have a reachable information popup on the coded demo | (not yet created) | Not Yet Executed |
| 5 — Market Result | HUD updates correctly; displayed numbers match engine output exactly (`DEMO_SPEC.md` §14, §19) | REQ-05-01 | Unit + Browser | Displayed total and per-sector results equal engine-calculated values | Pass only if every displayed figure equals the engine's returned value with no interface-side recalculation | (not yet created) | Not Yet Executed |
| 5 — Market Result | Distinct Mixed / Net Gain / Net Loss explanations (DEC-009 required coded improvement) | REQ-05-02 | Manual | The explanation shown matches the actual result category | Pass only if Mixed, Net Gain, and Net Loss each produce a visibly distinct, correctly matched explanation | (not yet created) | Not Yet Executed |
| 6 — Property Opportunity & Sealed Bid | Bid cannot exceed available cash; invalid input rejected with explanation, not silently corrected (`DEMO_SPEC.md` §15) | REQ-06-01 | Browser | Submitting a bid above available cash is rejected with a visible message | Pass only if the bid is rejected and an explanation is shown, and no bid is recorded | (not yet created) | Not Yet Executed |
| 6 — Property Opportunity & Sealed Bid | Correct bid resolution for below/equal/above opponent (`DEMO_SPEC.md` §11, DEC-006) | REQ-06-02 | Unit | Win/lose/tie outcome and cash treatment match the documented rule for each case | Pass only if outcome and cash-after-bid match `docs/finance/source-ledger.md` FIN-DEC-CAND-006, FIN-DEC-CAND-007, FIN-EX-010, and `DEMO_SPEC.md` §11 for each case (see known-answer tests below, including FIN-EX-010 for the above-opponent case, added via `docs/DECISIONS.md` DEC-010, 2026-07-30) | (not yet created) | Not Yet Executed |
| 6 — Property Opportunity & Sealed Bid | Screen explains the sealed bid, the exact next action, and the transition to Round Summary (`beginner-flow.md` Screen 6 observed finding; DEC-009 required coded improvement) | REQ-06-03 | Manual | Pre- and post-submission states each state what happened and what to do next | Pass only if both states are present and readable on the coded demo | (not yet created) | Not Yet Executed |
| 7 — Round Summary | Play Again fully resets state and map; no working "Unlock Next District" (`DEMO_SPEC.md` §11, §19) | REQ-07-01 | Browser | Play Again returns to Screen 1 with all state and map reset; locked district remains non-interactive | Pass only if state matches REQ-01-01's reset values and the locked district produces no action when activated | (not yet created) | Not Yet Executed |
| Cross-screen | Full seven-screen walkthrough without error (`DEMO_SPEC.md` §19) | See E2E-001 below | Browser | The complete seven-screen round reaches Round Summary without a broken screen | Pass only when every required transition and assertion in E2E-001 succeeds; otherwise Fail | — | Not Yet Executed |
| Cross-screen | No information conveyed by color alone; gain/loss uses sign, word, icon, and color together (`DEMO_SPEC.md` §18) | REQ-CS-01 | Accessibility | Every gain/loss display includes sign, word, and icon in addition to color | Pass only if all three non-color signals are present on every gain/loss instance | (not yet created) | Not Yet Executed |
| Cross-screen | Every interactive hotspot is keyboard-reachable and text-labelled (`DEMO_SPEC.md` §8) | REQ-CS-02 | Accessibility | All map hotspots and buttons are reachable via keyboard with visible focus and a text label | Pass only if every interactive element passes keyboard-only navigation with a visible focus state | (not yet created) | Not Yet Executed |

## Known-answer tests (FIN-EX-001 through FIN-EX-009 only)

Inputs and expected outputs are copied exactly from `docs/finance/source-ledger.md`. No additional values are introduced.

| Test ID | Source | Inputs | Expected output | Pass/fail rule | Status |
|---|---|---|---|---|---|
| CALC-001 | FIN-EX-001 | `starting_cash=10000`, `total_allocated=0`, `unallocated_cash=10000`, `cash_return_rate=0%` | `cash_after_market=10000`; no gain/loss on unallocated cash | Pass only if the calculated value equals `10000` exactly | Not Yet Executed |
| CALC-002 | FIN-EX-002 | `starting_cash=10000`, four sector allocations of `2500` each | `total_allocated=10000`; `cash_remaining=0`; allocation valid | Pass only if `total_allocated` and `cash_remaining` equal these values exactly and the allocation is accepted | Not Yet Executed |
| CALC-003 | FIN-EX-003 | `gross_rental_income=600`, `operating_cost=200` | `net_property_result=400` | Pass only if the calculated value equals `400` exactly | Not Yet Executed |
| CALC-004 | FIN-EX-004 | `starting_position=10000`, `cash_before_bid=10000`, `property_won=true`, `winning_bid=2500`, `gross_rental_income=600`, `operating_cost=200` | `ending_cash=7900`; `property_carrying_value=2500`; `ending_position=10400`; `round_change=400`; "Your financial position increased by $400 this round." | Pass only if all four figures and the displayed summary line match exactly | Not Yet Executed |
| CALC-005 | FIN-EX-005 | Same shape as FIN-EX-004 with `gross_rental_income=200`, `operating_cost=200` | `ending_cash=7500`; `property_carrying_value=2500`; `ending_position=10000`; `round_change=0`; "Your financial position was unchanged this round." | Pass only if all figures and the displayed summary line match exactly | Not Yet Executed |
| CALC-006 | FIN-EX-006 | Same shape with `gross_rental_income=100`, `operating_cost=300` | `ending_cash=7300`; `property_carrying_value=2500`; `ending_position=9800`; `round_change=-200`; "Your financial position decreased by $200 this round." | Pass only if all figures and the displayed summary line match exactly | Not Yet Executed |
| CALC-007 | FIN-EX-007 | `cash_before_bid=7000`, `player_bid=2000`, `opponent_bid=2500` | `property_won=false`; no deduction; `cash_after_property=7000` | Pass only if `property_won` is `false` and cash is unchanged at `7000` | Not Yet Executed |
| CALC-008 | FIN-EX-008 | `cash_before_bid=7000`, `player_bid=2500`, `opponent_bid=2500` | Opponent wins tie; `property_won=false`; no deduction; `cash_after_property=7000` | Pass only if `property_won` is `false` and cash is unchanged at `7000` | Not Yet Executed |
| CALC-009 | FIN-EX-009 | `sector_allocation=100.10`, `sector_return_rate=±5%` | Positive case: `rounded_sector_change=5.01`, `settled_sector_value=105.11`. Negative case: `rounded_sector_change=-5.01`, `settled_sector_value=95.09` | Pass only if both the positive and negative cases round exactly as stated (half-cent rounds away from zero) | Not Yet Executed |

## Allocation and bidding boundary tests

| Test ID | Boundary | Basis | Expected result | Pass/fail rule | Status |
|---|---|---|---|---|---|
| BOUND-ALLOC-01 | Total allocation exactly equals available cash | FIN-EX-002 | Allocation accepted; `cash_remaining=0` | Pass only if accepted with `cash_remaining=0` | Not Yet Executed |
| BOUND-ALLOC-02 | Total allocation exceeds available cash by any amount | `DEMO_SPEC.md` §15 | Allocation rejected with a visible explanation | Pass only if rejected, not silently capped or corrected | Not Yet Executed |
| BOUND-ALLOC-03 | Zero allocation (all cash unallocated) | `DEMO_SPEC.md` §11 (unallocated cash permitted) | Allocation accepted as a valid choice | Pass only if accepted with no error state shown | Not Yet Executed |
| BOUND-BID-01 | Bid exactly equals available cash | `DEMO_SPEC.md` §15 | Bid accepted | Pass only if accepted | Not Yet Executed |
| BOUND-BID-02 | Bid exceeds available cash by any amount | `DEMO_SPEC.md` §15 | Bid rejected with a visible explanation | Pass only if rejected, not silently capped or corrected | Not Yet Executed |
| BOUND-BID-03 | Player bid below opponent | FIN-EX-007 (CALC-007) | Player loses, no deduction | Pass only if `property_won=false` and cash unchanged | Not Yet Executed |
| BOUND-BID-04 | Player bid equal to opponent | FIN-EX-008 (CALC-008) | Opponent wins, no deduction | Pass only if `property_won=false` and cash unchanged | Not Yet Executed |
| BOUND-BID-05 | Player bid above opponent | FIN-EX-010 (`docs/finance/source-ledger.md`, added via `docs/DECISIONS.md` DEC-010, 2026-07-30) | `property_won=true`; `winning_bid=4500`; `net_property_result=250`; `cash_after_property=6550` (`player_bid=4500` > `opponent_bid=4250`) | Pass only if `property_won` is `true`, `winning_bid` equals `4500`, `net_property_result` equals `250`, and `cash_after_property` equals `6550` | Not Yet Executed |

## One complete seven-screen Playwright walkthrough

| Test ID | Scope | Expected result | Pass/fail rule | Status |
|---|---|---|---|---|
| E2E-001 | Start → Coach Tutorial → Market Intelligence → City Investment Decision → Market Result → Property Opportunity & Sealed Bid → Round Summary, in one deterministic run, per the transition table in `DEMO_SPEC.md` §12 | The full round completes with every screen transition matching §12, HUD values matching engine output at each step, and no screen left in a broken state | Pass only if all seven screens are reached in order, no step throws an error, and every displayed value matches the engine's returned value at that step; any deviation is a fail | Not Yet Executed |

## Basic accessibility checks

Per `docs/DECISIONS.md` DEC-009, these must be run against the coded demo, not Figma.

| Test ID | Check | Basis | Pass/fail rule | Status |
|---|---|---|---|---|
| A11Y-01 | Body and important text meet the 16px-equivalent readability target | `beginner-flow.md` accessibility checklist; DEC-009 required improvement (larger readable text) | Pass only if measured text size meets or exceeds the target on the coded demo | Not Yet Executed |
| A11Y-02 | Text/background contrast is readable on all seven screens | `beginner-flow.md` accessibility checklist | Pass only if contrast meets a stated readable threshold on every screen | Not Yet Executed |
| A11Y-03 | All buttons and click targets are large enough to activate without precision difficulty | `beginner-flow.md` accessibility checklist | Pass only if every listed button/control meets the stated target size | Not Yet Executed |
| A11Y-04 | All interactive map hotspots are keyboard-reachable, text-labelled, and visually distinct in hover/focus/selected states | `DEMO_SPEC.md` §8 | Pass only if all three states are keyboard-reachable and visually distinguishable from one another | Not Yet Executed |
| A11Y-05 | No information is conveyed by color alone | `DEMO_SPEC.md` §18 | Pass only if every gain/loss instance also shows sign, word, and icon | Not Yet Executed |
| A11Y-06 | Reduced-motion support exists for map and day/night transitions | `DEMO_SPEC.md` §18 | Pass only if essential information remains available with animation disabled | Not Yet Executed |
| A11Y-07 | Improved spacing and responsive content panels (DEC-009 required coded improvement) | DEC-009 | Pass only if panel content does not overflow, clip, or overlap at the selected desktop width | Not Yet Executed |

## Final usability and accessibility validation

Per `docs/DECISIONS.md` DEC-009, Figma iteration is closed and all remaining usability and accessibility validation — including the checks above and any repeat of Alexandra's two informal walkthrough findings (`beginner-flow.md`) — must be performed against the coded React/TypeScript demo. No usability or accessibility result recorded against Figma may be treated as satisfying any test in this plan.

## Unresolved gaps and Provisional dependencies

- No application code exists in this repository yet. Every test in this plan is Not Yet Executed, and none may be marked passed until implementation exists and the test is actually run, per `AGENTS.md`.
- **BOUND-BID-05 (player bid above opponent) now has known-answer coverage.** `docs/finance/source-ledger.md` FIN-EX-010, added via `docs/DECISIONS.md` DEC-010 (2026-07-30), provides a concrete winning-bid example (`player_bid=4500`, `opponent_bid=4250`, `property_won=true`, `winning_bid=4500`, `net_property_result=250`, `cash_after_property=6550`). The corresponding Vitest test has not yet been implemented or executed — status remains Not Yet Executed.
- Sector return rates, indicator-to-sector mapping, and permitted sector-rate ranges are now Approved Provisional via `docs/DECISIONS.md` DEC-010 (2026-07-30) (`DEMO_SPEC.md` §16); Hanyu's review remains pending.
- Starting cash, property name/type/asking price, gross property income/cost, and the scripted opponent bid amount are now Approved Provisional via `docs/DECISIONS.md` DEC-010 (2026-07-30), superseding the corresponding placeholders noted in DEC-008 (`DEMO_SPEC.md` §16).
- Coach financial terminology and introduction script are now Approved Provisional via `docs/DECISIONS.md` DEC-010 (2026-07-30) (`DEMO_SPEC.md` §16); Pankuri's review remains pending.
- Evidence storage locations named in this plan (e.g. `docs/testing/evidence/...`) do not yet exist and are not created by this document.
- Hanyu has not reviewed the financial ledger; Pankuri has not reviewed the beginner-facing wording; Leo has not reviewed this test plan.
- This plan does not itself constitute usability, accessibility, or final validation of anything — it only defines what must later be checked and how.
