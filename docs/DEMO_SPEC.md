# MARKET EMPIRE

## Demo Spec — Seven-Screen Playable Vertical Slice

*The approved current build direction for the playable demo. Companion to the Project Foundation.*

> **START HERE**
>
> Status: Approved Provisional Direction — the new seven-screen experience has not yet been usability-tested.
>
> This document replaces the former six-screen specification as the proposed current build direction.
>
> The original six-screen Figma prototype remains preserved as tested design evidence — Anant tested it and completed it without questions or blocked actions. This result covered basic clarity only.
>
> No claim is made that the new seven-screen version has passed usability, accessibility, or automatic testing.
>
> If a teammate or an AI tool is unsure what to build, this document — not memory, not a chat — is the answer.

## 1. Purpose, Authority and Status

This document is the complete specification for the seven-screen playable vertical slice of Market Empire — the currently approved direction for the one-round demo.

**Authority**

Approved by Bora, Product Lead, on 2026-07-28, exercising delegated authority while the rest of the team was unavailable. Pankuri's own alternative design direction may still be compared later; that comparison does not block this document from controlling the current build.

**Status**

Approved Provisional Direction. This is a design direction the team has approved to build and evaluate — it is not a usability-tested final specification.

**This document is:**

- The current, single source of truth for the seven-screen demo, screen by screen.
- What any AI coding tool or teammate reads before building or reviewing this direction.
- Still open to change — but only through a written Decision Record, never a quiet edit.

**This document is not:**

- Usability-tested. No one has clicked through this seven-screen version yet.
- A finance document — `docs/finance/source-ledger.md` is still the real source for numbers. That file belongs to the unmerged Finance PR #4 and is not present on this branch (see §16).
- A replacement for the six-screen prototype's test results, which still apply only to the six-screen version.

## 2. Replacement and Version History

This document supersedes the original six-screen, ten-step Demo Spec as the controlling build specification. Nothing from that earlier work is discarded.

The six-screen prototype's screen goals, notice-order, and plain-language explanations carry forward directly into the matching screens below as design choices — not as tested or confirmed strengths (see the recorded result below). What is new is the persistent city map, the tutorial screen, and three market indicators instead of one.

> **PRESERVED AS EVIDENCE**
>
> Tester: Anant. Date: 2026-07-28.
>
> Prototype tested: the original six-screen desktop prototype (pre-DEC-001).
>
> Recorded result: he completed the original six-screen prototype without questions or blocked actions. This result covered basic clarity only.
>
> This is the only claim the test result supports. It does not confirm specific design strengths, and it is not evidence that the seven-screen direction is understandable — it is not described as such anywhere in this document.

Controlling decisions DEC-001 through DEC-008 are recorded in `docs/DECISIONS.md`. This specification became the official GitHub build record once those decisions were recorded.

## 3. Demo Goal and Educational Purpose

The goal is to demonstrate the core loop — reading market information, allocating cash, seeing outcomes, and participating in a sealed-bid auction — as a deterministic, single-round, desktop-first experience for a beginner audience: museum visitors and students.

**A player should come away understanding:**

- The difference between cash that is invested and cash that is still available.
- That market indicators are clues, not guarantees.
- The basic idea of diversification, concentration, and liquidity — in plain language, with no numeric risk score attached.
- How a sealed-bid auction works, and that a bid requires enough available cash.

## 4. Exact Current Scope

- One deterministic, seven-screen, single-round demo.
- Single-player only, with one scripted (non-live) opponent for the auction.
- One interactive city district containing four sector landmarks and one auction property.
- A persistent visual shell (HUD, map, right panel) across Screens 2–7.
- A scripted, non-generative Market Coach.
- All calculations performed by the deterministic engine; the interface only displays results.

## 5. Explicit Non-Goals

Do not build or imply any of the following:

- Accounts, logins, or player-stat tracking of any kind.
- Real-time multiplayer, chat, or rival-activity feeds.
- Generative or live AI in the Coach or Market Intelligence.
- Additional property types, foot-traffic calculations, ROI metrics, synergy bonuses, or saturation percentages.
- Scoring, leaderboards, a working "Unlock Next District," or a second round.
- Free camera, open-world navigation, or live market data feeds.
- A numeric or labeled sector "risk profile" — none is currently sourced or decided.
- A "Claim Profits" action — the result is already applied by the time Screen 5 renders.

## 6. Seven-Screen Sequence

These are the seven screens of the one deterministic round, in order.

| Screen | Time of Day (visual only) / Player Action |
|---|---|
| 1. Start | Morning — Start Demo |
| 2. Coach Tutorial | Daytime — Next / Back / Skip Tutorial |
| 3. Market Intelligence | Afternoon — Analyze City |
| 4. City Investment Decision | Dusk — Confirm Investments |
| 5. Market Result | Early Evening — Continue to Auction |
| 6. Property Opportunity & Sealed Bid | Night — Submit Bid → Continue |
| 7. Round Summary | Late Night — Play Again / Exit |

## 7. Persistent Interface Shell

Screens 2 through 7 share the same frame:

- Main area: one fixed isometric city district (no free camera).
- Top HUD: Available Cash, current stage, time-of-day indicator.
- Right panel: whichever decision, information, or result is relevant right now.
- Market Coach: visible or one click away, on every screen.
- On the map: four sector landmarks, one auction property, and one locked future district (visible, never clickable — a teaser only).

**Visual direction (reference only, not a rule)**

Isometric strategy-game aesthetic; dark navy/slate base; gold for primary actions; teal for gains; muted red for losses. Colour is never the only way information is shown.

> **REFERENCE ART IS NOT AUTHORITATIVE**
>
> Generated (Gemini / Nano-Banana) reference images are visual inspiration only — style, layout, and the navy/teal/gold palette.
>
> Any mechanic, number, or term shown in a reference image is excluded unless separately researched and decided, including: "Credits," foot-traffic calculations, saturation percentages, ROI, synergy bonuses, live rival activity, a working "Unlock Next District," and account functionality.
>
> Terminology is normalized to "Available Cash" — never "Credits."

## 8. City-Map Behaviour

- One fixed district — no zooming or free-roaming navigation required.
- Only the hotspots relevant to the current step are interactive.
- Hover, focus, and selected states must be visually distinct from one another.
- The four landmarks open Screen 4's panel. The property site becomes a hotspot for Screen 6, and shows an owned/illuminated state on Screen 7 if won.
- The locked future district is visible but never clickable.
- Map animation (buildings illuminating or dimming) only displays engine-decided outcomes; it never calculates a result itself.
- Every interactive hotspot must be keyboard-reachable and text-labelled.

## 9. Market Coach Behaviour

The Coach:

- Is scripted — never generative, never a live AI call.
- Is visible or immediately accessible on every screen after Start.
- Explains the current concept and the next action.
- Explains confirmed results only after the engine has calculated them.
- Never changes a number.
- Never predicts an outcome with certainty.
- Never recommends a specific allocation or bid amount.
- Never states that one decision is universally correct.
- Never gives personalized financial advice.
- Uses approved beginner terminology only — exact wording is a finance dependency (see §16).

## 10. Day-to-Night Visual Progression

Purely visual; never affects any calculation. Deterministic and linear:

| Screen | Time of Day |
|---|---|
| 1. Start | Morning |
| 2. Coach Tutorial | Daytime |
| 3. Market Intelligence | Afternoon |
| 4. City Investment Decision | Dusk |
| 5. Market Result | Early Evening |
| 6. Property Opportunity & Sealed Bid | Night |
| 7. Round Summary | Late Night |

## 11. Detailed Screen Requirements

### Screen 1 — Start

Shows: Market Empire title; one short beginner-facing description; morning city background; starting cash shown only if appropriate — this is an open design choice, not something any controlling document currently requires either way.

Action: START DEMO.

Behaviour: Resets all demo state and proceeds to Screen 2.

### Screen 2 — Coach Tutorial

Shows: daytime city; the persistent shell already visible. One screen with several scripted Coach steps, each highlighting the relevant shell element:

- Available Cash may be invested or kept.
- Market indicators are clues, not guarantees.
- Investments may gain or lose.
- Remaining cash may be needed for the property auction.

Actions: NEXT, BACK, secondary SKIP TUTORIAL.

Constraints: no live AI; no open text entry.

### Screen 3 — Market Intelligence

Shows: afternoon city; right panel with three scripted indicator cards — one wider economic indicator, one business/sector-activity indicator, one counter-signal/risk indicator. Each card has a headline, a plain-language meaning, a status/source reference, and an inspected/viewed state.

No flip-card or face-down animation is required — an open/inspected state is sufficient. The exact interaction is a design choice, not a spec requirement.

Constraint: indicators must not name an obviously correct sector or promise an outcome. Exact wording, meanings, and any sector mapping are Provisional (§16).

Action: ANALYZE CITY, enabled once all three indicators have been opened.

### Screen 4 — City Investment Decision

Shows: dusk city; four clickable landmarks — Technology, Health Care, Everyday Goods, Energy. Selecting one opens, in the right panel: sector name, its Provisional one-sentence description (`docs/finance/source-ledger.md` FIN-DEC-CAND-003 — cross-branch, Provisional; see §16), an allocation slider, current allocation, and a relevant indicator reminder. No risk-profile label or score is shown — none is sourced.

Live display: total allocated; cash remaining.

Rules: allocation cannot exceed available cash; cash cannot go negative; unallocated cash is permitted; confirmation locks the decision; this screen does not calculate returns.

Coach: may explain concentration, diversification, and liquidity in neutral terms; must never prescribe an allocation.

Action: CONFIRM INVESTMENTS.

### Screen 5 — Market Result

Shows: early-evening city; engine-calculated total gain/loss and per-sector results; map buildings illuminate or dim to match; Available Cash updates; gain/loss shown with sign, word, icon, and colour together.

Coach: scripted explanation matching the confirmed result.

Action: CONTINUE TO AUCTION. No "Claim Profits" — the result is already applied.

### Screen 6 — Property Opportunity and Sealed Bid

Shows: night city; one highlighted property hotspot. This screen has two internal states.

**Pre-submission state**

Property name and type; Provisional asking price; available cash; documented income/operating-cost information (`docs/finance/source-ledger.md` FIN-DEMO-03 — cross-branch, Provisional; see §16); bid control; sealed-bid explanation; opponent labelled "Scripted Opponent" (opponent's bid hidden).

Validation: bid cannot exceed available cash; invalid input shows a clear explanation.

Action: SUBMIT BID.

**Post-submission state**

Player bid; scripted opponent bid; won/not won; cash after bid; property added/not added; property income/cost result if won; scripted Coach explanation.

Required deterministic branches (`docs/finance/source-ledger.md` FIN-DEC-CAND-006/007 — cross-branch, Provisional; see §16):

- Player bid below opponent — player loses, no deduction.
- Player bid equals opponent — opponent wins, no deduction.
- Player bid above opponent — player wins and pays the submitted bid.

Action: CONTINUE.

### Screen 7 — Round Summary

Shows: late-night city; owned property illuminated if won, unowned if not; locked future district visible as a non-interactive teaser labelled "Future Game Content"; starting cash; total market change; property result; ending cash; property carrying value where applicable; ending financial position (`docs/finance/source-ledger.md` FIN-DEC-CAND-004 — cross-branch, Provisional; see §16); round change; one neutral scripted Coach lesson.

Actions: PLAY AGAIN (resets all state and map, restarts at Screen 1); EXIT.

Constraint: no second round; no working "Unlock Next District."

## 12. Screen and State Transition Table

| From → Action | Goes To |
|---|---|
| 1 — Start Demo | 2 |
| 2 — Finish steps or Skip Tutorial | 3 |
| 3 — Analyze City (after all 3 indicators opened) | 4 |
| 4 — Confirm Investments | 5 |
| 5 — Continue to Auction | 6 (pre-submission) |
| 6 (pre) — Submit Bid | 6 (post-submission) |
| 6 (post) — Continue | 7 |
| 7 — Play Again | 1 (full reset) |
| 7 — Exit | End of demo |

## 13. Required Application State

At minimum, the application must track:

`currentScreen`, `currentScreenState`, `tutorialStep`, `tutorialCompletedForSession`, `viewedIndicatorIds`, `startingCash`, `availableCash`, `sectorAllocations`, `totalAllocated`, `unallocatedCash`, `scriptedSectorRates`, `sectorResults`, `totalMarketChange`, `cashAfterMarket`, `playerBid`, `scriptedOpponentBid`, `propertyWon`, `winningBid`, `grossPropertyIncome`, `operatingCost`, `netPropertyResult`, `endingCash`, `propertyCarryingValue`, `endingPosition`, `roundChange`, `coachMessageId`, `timeOfDayState`

No value listed as unresolved in §16 may be pre-assigned.

## 14. Engine and Interface Responsibility Boundary

**The engine alone decides:**

Allocation validity; sector changes; total market change; cash after market; bid winner; cash after bid; property result; carrying value; ending position; and which summary category is shown.

**The interface only handles:**

Input controls; map selection; animation; display formatting; Coach presentation; navigation.

No screen or map component may independently recalculate an official result. Map animations must match engine results exactly.

## 15. Input Validation and Boundary Behaviour

- Total sector allocation cannot exceed available cash; cash cannot go negative.
- Unallocated cash is permitted.
- A bid cannot exceed available cash at the moment of submission; invalid input is rejected with a clear explanation, never silently corrected.
- Confirming an allocation or submitting a bid locks that input.

## 16. Finance Dependencies (Provisional / TBD)

None of the following are resolved by this document. All require Hanyu's review or an explicit team decision recorded in `docs/DECISIONS.md` before becoming non-Provisional.

> **CROSS-BRANCH DEPENDENCY**
>
> `docs/finance/source-ledger.md` belongs to the unmerged Finance PR #4 (`1-finance-evidence-for-the-one-round-demo`) and is not present on this branch. Every FIN-DEC-CAND-* and FIN-DEMO-* reference in this document is a cross-branch, Provisional dependency — it cites content that has not yet merged and has not been independently verified from this branch.

| Input | Status |
|---|---|
| Three market-indicator texts and meanings | Provisional — not yet written |
| Indicator-to-sector mapping | Provisional — not yet defined |
| Sector return rates (4) | Provisional — not yet defined |
| Permitted sector-rate ranges | Provisional — not yet defined |
| Starting cash (exact, approved) | Provisional — $10,000 placeholder only |
| Property name, type, asking price | Provisional — placeholder only |
| Gross property income / operating cost | Provisional — placeholder only |
| Scripted opponent bid | Provisional — placeholder only |
| Coach financial terminology | Provisional — not yet approved |

## 17. Content and Design Dependencies

| Content | Status |
|---|---|
| Final artwork and animation | Not yet produced |
| Audio | Not yet decided |
| Reduced-motion behaviour | Not yet specified beyond §18 |
| "Future Game Content" locked-district label wording | Provisional placeholder text |

## 18. Accessibility Requirements

- Readable desktop typography; strong text/background contrast.
- Full keyboard navigation; visible focus states on all interactive elements, including map hotspots.
- Large, identifiable click targets for landmarks and buttons.
- No information conveyed by colour alone — gain/loss uses sign, word, icon, and colour together.
- Reduced-motion support for map and day/night transitions; essential information available without relying on animation.
- Coach text in short, readable blocks; replayable where appropriate.

## 19. Testing and Acceptance Criteria

> **NOT YET DONE**
>
> None of the tests listed below have been executed. Do not treat this section as a report of completed testing — it is a requirement list.

**Engine / logic**

- Known-answer tests for every formula.
- Allocation boundary tests (zero, max, over-allocation).
- Deterministic repeat test with identical inputs.
- Bid-below / bid-equal / bid-above-opponent tests.
- Bid-exceeds-cash validation test.
- Property win/loss summary tests.

**Interface / functional**

- Full seven-screen walkthrough without error.
- Start resets all state.
- Tutorial Next / Back / Skip all function.
- All three indicators must be opened before Analyze City unlocks.
- Correct landmark-to-panel mapping.
- HUD updates correctly after Screens 5 and 7.
- Day/night states progress without affecting calculations.
- Play Again fully resets state and map.

**End-to-end**

- One complete Playwright browser walkthrough.
- One manual accessibility walkthrough.
- Working Vercel preview link.

**Carried over from the original acceptance gate**

- Understandable start without instructions.
- Understandable market information.
- Confirmed allocation.
- Documented engine output.
- Correct bid resolution.
- Matching explanations.
- Uninterrupted complete round.
- Visible Provisional labels.
- Passing automated tests.
- Browser walkthrough.
- Working preview link.

## 20. Known Limitations

- Desktop-first; mobile/responsive behaviour not yet verified.
- No sound implementation.
- Market-intelligence indicator content is a Provisional placeholder.
- Scripted-opponent behaviour is fully predictable by design (a deterministic demo).
- This seven-screen direction has not been usability-tested with anyone; only the prior six-screen prototype has been.
- No sector risk profile exists; none is currently sourced.

> **ONE-LINE SUMMARY OF THIS WHOLE DOCUMENT**
>
> Seven screens, one round, still a proposed direction — not yet tested with anyone. The six-screen version stays on record as what was actually tested. Every dollar figure, rate, and Coach line stays Provisional until Hanyu or the team formally signs off. The engine decides; the screen only shows.
