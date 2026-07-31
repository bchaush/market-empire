# Issue #11 Final Acceptance Evidence

**Status:** Evidence record — not a claim that Issue #7 or Issue #11 is complete.
**Related:** GitHub Issue #11 (`Complete remaining seven-screen demo acceptance criteria`), parent Issue #7, PR #12.
**Controlling decisions:** `docs/DECISIONS.md` DEC-009, DEC-010, DEC-011, DEC-012.
**Recorded by:** automated agent audit (Claude Code), not a human tester unless explicitly stated otherwise below.

## Commit history and re-verification (2026-07-30 update)

This evidence spans four distinct commits on `11-complete-remaining-demo-acceptance`. They are not interchangeable, and this section states plainly what was actually done at each one:

| Commit | What it changed | Was the test suite executed at this commit? |
|---|---|---|
| `0652c62df2975c29fc8a570274fce338b58c47ad` | The original Issue #11 implementation (popovers, explanations, desktop readability). | **Yes.** This is the implementation commit the "Evidence matrix" below was originally produced against, at 2026-07-30 22:35–22:40 local time. |
| `8dadb11c8dbbd84139b69bbecb29fba5d8e024b2` | Documentation and evidence only — added this file and two qualifying notes to `docs/testing/initial-test-plan.md`. No application, engine, test, or CSS file changed. | No code changed, so the suite was not re-run for this commit; it carries the same code as `0652c62`. |
| `295fb75f3e6472629d82fd256a33e7ee9baf8d06` | Independent-review correction: removed trailing whitespace from DEC-011/DEC-012 metadata lines in `docs/DECISIONS.md` (wording unchanged), and corrected the explanatory comment above the `.first()` disambiguation in `e2e/e2e-001-full-walkthrough.spec.ts` (assertion unchanged). No application, engine, CSS, or test-assertion behaviour changed. | **Yes.** The complete suite was independently re-executed at this exact commit — see "Re-verification at the correction commit" below. |
| *(this commit, "Align Issue 11 review evidence")* | Documentation only — this file, updated to add this section and align commit references. No code changed. | No — documentation-only, consistent with the commit before it. |

**The human Vercel-preview walkthrough remains pending** and will be performed against the final PR #12 head after this correction is deployed, not against `0652c62` or `295fb75` individually.

## Purpose

This file records the actual, dated, executed evidence supporting (or not yet supporting) Issue #11's acceptance criteria and the related requirement/test IDs in `docs/testing/initial-test-plan.md`. It follows that document's own requirement-table shape, extended with an "Actual result" column, per this task's instructions.

It does not modify, weaken, or delete any test. It does not mark a check Pass without direct executed evidence for that exact pass rule. Manual/Accessibility-typed requirements are left `Not Yet Executed` even where strong automated or agent-performed browser evidence exists, per this audit's explicit rules — that evidence is recorded as partial support, not converted into a Pass.

## Complete test-suite results at the original implementation commit (`0652c62`)

| Command | Exit code | Files | Tests | Result |
|---|---|---|---|---|
| `npx vitest run --reporter=verbose` | 0 | 7 passed | 32 passed | Pass |
| `npm run e2e` (Playwright) | 0 | 3 spec files, 6 tests | 6 passed | Pass |
| `npm run build` (`tsc -b && vite build`) | 0 | — | — | Pass |
| `git diff --check` | 0 | — | — | Clean |

No warnings were emitted by any command beyond Vite's normal build summary output. The evidence matrix below reflects this execution.

## Re-verification at the correction commit (`295fb75`, 2026-07-30, 23:20 local time)

The independent-review correction (trailing-whitespace removal in `docs/DECISIONS.md`; comment-only correction in `e2e-001-full-walkthrough.spec.ts`) changed no application, engine, CSS, or test-assertion behaviour. The complete suite was nonetheless independently re-executed in full at this new commit, not merely assumed unchanged:

| Command | Exit code | Files | Tests | Result |
|---|---|---|---|---|
| `npx vitest run --reporter=verbose` | 0 | 7 passed | 32 passed | Pass — identical to `0652c62` |
| `npm run e2e` (Playwright) | 0 | 3 spec files, 6 tests | 6 passed | Pass — identical to `0652c62` |
| `npm run build` (`tsc -b && vite build`) | 0 | — | — | Pass — identical to `0652c62` |
| `git diff --check origin/main...HEAD` | 0 | — | — | Clean (previously exit 2 due to the DEC-011/DEC-012 trailing whitespace; now resolved) |

No warnings were emitted beyond Vite's normal build summary output. Results are unchanged in substance from `0652c62` — as expected, since no executable code changed — with the sole difference being that the PR-range diff-check now passes.

## Evidence matrix

Evidence types: **Unit** (Vitest), **Browser** (Playwright, checked into the repo), **Agent-browser** (this audit's own temporary, out-of-repo Playwright script driving the coded demo — an automated check performed by the agent, not a human or assistive-technology user), **Manual/Human** (not performed in this task).

| ID | Exact expected result / pass rule | Evidence type | Evidence source | Actual result | Status | Limitation / reason |
|---|---|---|---|---|---|---|
| REQ-01-01 | Screen 2 loads with every tracked state field (§13) reset | Browser | `e2e-001-full-walkthrough.spec.ts` Screen 7 block (Play Again → Start Demo re-verification) | Available Cash, Stage, Time of day, and tutorial intro text confirmed reset | Not Yet Executed | Only 4 of ~25 `GameState` fields are re-checked via the DOM (most have no visible UI surface). Full-object reset is proven at the **Unit** level (`transitions.test.ts`, `toEqual(createInitialGameState(...))`), a different Type than this Browser-typed requirement specifies. |
| REQ-01-02 | Start Demo is the only focusable/reachable control, keyboard-reachable | Agent-browser | This audit's temporary script: single Tab press from page load lands directly on "Start Demo" | Confirmed — first Tab reaches Start Demo | Not Yet Executed | Agent-performed automated check, not a human keyboard-only accessibility walkthrough. `StartScreen.tsx` renders exactly one interactive element (confirmed by source), consistent with the result. |
| REQ-02-01 | Next/Back/Skip each produce the documented transition on every step | Browser | `e2e-001-full-walkthrough.spec.ts` Screen 2 block; `reachPreSubmissionAuction()` in `e2e-011-disclosure-popovers.spec.ts` (Skip Tutorial path) | Next/Back cycle through all tutorial steps correctly; Back disabled at step 0; Skip advances directly to Screen 3 | Pass | — |
| REQ-02-02 | Coach intro present; Coach popup reachable on every applicable screen | Manual | — | `e2e-011-disclosure-popovers.spec.ts` "Coach disclosure popover…" test verifies trigger absence on Screen 1 and presence/functional content on Screens 2–7 | Not Yet Executed | Strong automated Browser evidence exists (see source), but this ID is typed Manual in the original plan and is not auto-converted to Pass. |
| REQ-03-01 | Analyze City disabled for 0/1/2 opened indicators, enabled at 3 | Browser | `e2e-001-full-walkthrough.spec.ts` Screen 3 block | Disabled before any indicator opened; enabled after all 3 opened | Pass | The 1-opened and 2-opened intermediate disabled states are not separately asserted — only the 0- and 3-opened boundary states are. |
| REQ-04-01 | Each landmark opens its own panel; over-allocation attempt is rejected | Browser | `e2e-001-full-walkthrough.spec.ts` Screen 4 block (landmark→description mapping only) | All 4 landmark→description mappings confirmed | Not Yet Executed | Over-allocation rejection is not exercised via the browser in any Playwright spec — only at the **Unit** level (`BOUND-ALLOC-02`, `validation.test.ts`). |
| REQ-04-02 | Each of the 4 sectors has a reachable, readable information popup | Manual | — | `e2e-011-disclosure-popovers.spec.ts` "Sector-information disclosure popovers…" test covers all 4 sectors: trigger, `aria-expanded`/`aria-controls`, heading, exact description, Everyday-Goods-only label note, one-open-at-a-time, Escape+focus restoration | Not Yet Executed | Strong automated Browser evidence exists; ID typed Manual, not auto-converted to Pass. |
| REQ-05-01 | Displayed total/per-sector results equal engine-calculated values; no interface recalculation | Unit + Browser | `e2e-001-full-walkthrough.spec.ts` Screen 5 block — expected values computed by calling the real `src/engine/` functions, then asserted against rendered DOM text | All per-sector and total figures matched exactly | Pass | — |
| REQ-05-02 | Mixed/Net Gain/Net Loss each produce a distinct, correctly matched explanation | Manual | — | `e2e-011-disclosure-popovers.spec.ts` computes the real `marketResultCategory` result and asserts the matching DEC-011 heading+message is visible in **both** the Coach popover and the main Screen 5 panel, at ≥16px | Not Yet Executed | Very strong automated Browser evidence (category derived from the real engine function, not hardcoded); ID typed Manual, not auto-converted to Pass. Only the category produced by the fixed $2,500-per-sector fixture is exercised — the other 3 categories are not separately driven through the browser in this commit. |
| REQ-06-01 | Bid above available cash is rejected with a visible message, not recorded | Browser | — | Not exercised by any Playwright spec | Not Yet Executed | Only Unit-tested (`BOUND-BID-02`, `validation.test.ts`). |
| REQ-06-02 | Win/lose/tie outcome and cash treatment match FIN-DEC-CAND-006/007/FIN-EX-010 for each case | Unit | `property.test.ts` (CALC-007, CALC-008, BOUND-BID-05); `bidResultCategory.test.ts` (same 3 fixtures, new display classifier) | All 3 branches match documented figures exactly | Pass | — |
| REQ-06-03 | Pre- and post-submission states each state what happened and what to do next | Manual | — | `e2e-011-disclosure-popovers.spec.ts` verifies the exact DEC-011 pre-submission message and the win/below-opponent/tie post-submission messages are visible in **both** the Coach popover and the main Screen 6 panel, at ≥16px, via the real seven-screen flow | Not Yet Executed | Very strong automated Browser evidence (all 3 post-submission branches genuinely exercised); ID typed Manual, not auto-converted to Pass. |
| REQ-07-01 | Play Again fully resets state/map; locked district produces no action | Browser | `e2e-001-full-walkthrough.spec.ts` Screen 7 block | Locked district text is present but is neither a `button` nor a `link` role (confirmed non-interactive); reset partially re-verified (see REQ-01-01) | Not Yet Executed | Same field-coverage limitation as REQ-01-01 for the reset half of this rule. |
| Cross-screen — full walkthrough | All 7 screens reached in order per §12; no broken step; every displayed value matches engine output | Browser | `e2e-001-full-walkthrough.spec.ts` (test ID **E2E-001**) | 1/1 passed | Pass | — |
| REQ-CS-01 / A11Y-05 | Every gain/loss instance shows sign, word, and icon in addition to color | Browser + Agent-browser | `e2e-001-full-walkthrough.spec.ts` asserts sign+word text directly (not color) for every sector/total line; this audit's script confirmed an `aria-hidden` icon element is also present alongside the same text (e.g. `"▲ Technology: +$475.00 (Gain)"`, `"▲ Won"`) | Sign, word, and icon all confirmed present with color on every sampled row | Not Yet Executed | ID typed Accessibility in the original plan; per this audit's rules, not auto-converted to Pass despite the check being structurally objective and directly evidenced. |
| REQ-CS-02 / A11Y-04 | Every interactive hotspot/button keyboard-reachable, visible focus, text-labelled | Agent-browser | This audit's script: Tab-order trace on Screens 1–2 (Start Demo → Coach → Next → Skip Tutorial, in DOM order; disabled Back correctly excluded); Enter-key Coach/sector-popover activation on Screens 2 and 4; Escape dismissal and focus restoration confirmed; global `:focus-visible` outline confirmed present (3px solid `rgb(212,175,55)`) | All checked elements are native `<button>`/`<input>` elements with visible text as their accessible name; keyboard operation and focus-visible confirmed on the sampled screens | Not Yet Executed | This is an **automated browser check performed by the agent**, explicitly distinct from testing by a real assistive-technology user (e.g., a screen reader), which has not been performed. Not every element on every one of the 7 screens was individually re-traced — Screens 1, 2, and 4 were directly exercised; Screens 3, 5, 6, 7 rely on the same native-element/global-CSS pattern rather than a separate per-screen trace. |
| A11Y-01 | Body/important text meets the 16px-equivalent target | Agent-browser | This audit's script: computed `font-size` sampled across Screens 1–7 (HUD, body, buttons, Coach popover, sector-info popover, Screen 5/6 explanations, Round Summary body) | All sampled text ≥16px (16px for nearly all body/explanation text; 17.6px Start Demo button; 32px Screen 1 title) | Pass | A defined threshold (16px-equivalent) exists in Issue #11/DEC-009/the original test plan, so a Pass/Fail determination was made against it. |
| A11Y-02 | Text/background contrast meets a readable threshold | — | — | No numerical contrast threshold is defined in `AGENTS.md`, `docs/DEMO_SPEC.md`, `docs/ux/beginner-flow.md`, `docs/testing/initial-test-plan.md`, or `docs/DECISIONS.md` (checked directly) | Not Yet Executed — blocked by undefined pass threshold | No WCAG or other threshold was invented, per instruction. No contrast ratio was calculated. This is an unresolved gap, not a passed or failed check. |
| A11Y-03 | Buttons/click targets meet a stated minimum size | Agent-browser (measurement only, no threshold applied) | This audit's script: bounding-box measurements | Representative sizes: most buttons 36px tall (widths 60–320px); Start Demo 47×139px; bid number input 21×318px | Not Yet Executed — blocked by undefined pass threshold | No numerical minimum is defined in any controlling document, so no pass/fail was assigned. Actual measurements are recorded for future evaluation once (if) a threshold is adopted. |
| A11Y-04 | (see REQ-CS-02 above) | | | | Not Yet Executed | See REQ-CS-02 row. |
| A11Y-05 | (see REQ-CS-01 above) | | | | Not Yet Executed | See REQ-CS-01 row. |
| A11Y-06 | Reduced-motion support exists for map/day-night transitions; essential information available with animation disabled | Agent-browser (CSS/DOM inspection) | This audit's script scanned every loaded stylesheet for `transition`/`animation`/`@keyframes`/`prefers-reduced-motion` rules | Exactly one motion-related rule exists in the whole application: `@media (prefers-reduced-motion: reduce) { .app-shell * { animation: none !important; transition: none !important; } }` (`src/components/AppShell.css`). No other transition, animation, or keyframe rule exists anywhere in the codebase. The city map itself remains an unimplemented placeholder (`"City map area — landmarks not yet implemented."`) and no day/night visual transition exists yet. | Not Yet Executed | There is currently no real map or day/night motion in the coded demo for this requirement to meaningfully apply against. The existing `prefers-reduced-motion` rule is a reasonable structural placeholder but cannot be verified as satisfying A11Y-06's pass rule until real motion exists to test it against. This is **not** recorded as a Pass merely because no animation exists, per instruction, and is **not** described as "moot" — it is Not Yet Executed because the precondition for a meaningful test (real motion) does not yet exist. |
| A11Y-07 | Panel content does not overflow, clip, or overlap at the 1440×900 desktop baseline | Browser | `e2e-011-disclosure-popovers.spec.ts` "Desktop baseline (1440x900)…" test | No horizontal document overflow; shell width ≤1440px; decision panel and primary action visible; Screen 5/6 explanation elements have nonzero size, are not `overflow:hidden`-clipped, and do not overlap the primary action button — all confirmed on Screens 2–7 | Pass | The Playwright default project viewport is not 1440×900; it was set explicitly in this test rather than assumed, per DEC-010's approved baseline. |
| Issue #11 E2E-011 suite (overall) | All Issue #11-specific popover/explanation/layout behavior functions as implemented | Browser | `e2e-011-disclosure-popovers.spec.ts` (5 tests) | 5/5 passed | Pass | This is a result of the test suite itself, not a substitute Pass for the Manual/Accessibility-typed requirement IDs it partially supports (see rows above). |
| Engine/interface separation (Issue #11 criterion 6) | No screen or map component recalculates an official result independently of the engine | Code inspection | Direct `grep` audit of every screen file changed in this branch (recorded during implementation) | No screen file calls `marketResultCategory`/`bidResultCategory`/any settlement or bid-resolution function directly, and no `>`/`<`/`===` comparison of sector or bid values exists in any screen file | Pass | Verified by direct source inspection, not a dedicated automated test; re-confirmed as part of this audit by re-running the same grep. |
| Issue #11 criterion 7 (existing commands continue to pass) | `npx vitest run`, `npm run e2e`, `npm run build` all succeed | Unit + Browser + Build | See "Complete test-suite results" above | 32/32 Vitest, 6/6 Playwright, build succeeded | Pass | — |

## Accessibility and manual-check summary

- **A11Y-01 (text size):** Pass — threshold defined, measured, met.
- **A11Y-02 (contrast):** Not Yet Executed — no threshold defined anywhere in the controlling documents; none was invented. No formal contrast measurement is claimed.
- **A11Y-03 (click-target size):** Not Yet Executed — no threshold defined; actual measurements recorded.
- **A11Y-04 / REQ-CS-02 (keyboard/focus):** Not Yet Executed — extensive agent-performed automated browser evidence recorded; **no real assistive-technology user has tested this demo**.
- **A11Y-05 / REQ-CS-01 (color-independent meaning):** Not Yet Executed per the Manual/Accessibility rule — automated evidence is effectively conclusive but is recorded as partial support only, per instruction.
- **A11Y-06 (reduced motion):** Not Yet Executed — no real motion exists yet in the coded demo to test against; not claimed as a Pass, not described as moot.
- **A11Y-07 (desktop panel layout):** Pass — automated, real Playwright evidence at the approved 1440×900 baseline.
- **REQ-02-02, REQ-04-02, REQ-05-02, REQ-06-03 (all Manual-typed Issue #11 criteria):** Not Yet Executed for a formal human/Manual pass, despite strong automated Browser evidence for each, per this audit's explicit rule that Manual/Accessibility requirements are not auto-converted to Pass.

**No real assistive-technology user testing was performed.** All keyboard/focus evidence above was produced by an automated script driven by this agent, not a human, and not a screen reader or other assistive technology.

**No formal contrast or reduced-motion certification is claimed.**

**No mobile/responsive support is claimed.**

**All financial values remain Approved Provisional** per `docs/DECISIONS.md` DEC-010; nothing in this audit changes, approves, or re-evaluates any financial value, rate, or formula. `FIN-DEC-CAND-004` remains Provisional.

## Limitations

- This audit was performed entirely by an automated agent (browser automation and source inspection). It is not a substitute for human usability testing, a real assistive-technology pass, formal contrast certification, or formal reduced-motion certification.
- Several Browser-typed requirements (REQ-01-01, REQ-04-01, REQ-06-01, REQ-07-01) have only partial automated coverage; the specific gaps are recorded per row above.
- This document does not claim that Issue #7 or Issue #11 is complete. Several of Issue #11's own stated acceptance criteria (the Manual-typed ones, plus A11Y-02/A11Y-03/A11Y-06) remain Not Yet Executed or blocked by an undefined threshold.
