# Market Empire Beginner Flow

**Status:** Provisional working document  
**Related issue:** #2 — Beginner clickable flow for the one-round demo  
**Owner:** Bora, temporarily completing work assigned to Pankuri  
**Review required:** Pankuri or explicit team approval

## Purpose

This document defines the proposed beginner journey, information hierarchy, usability tasks, accessibility checks and untested assumptions for the one-round Market Empire clickable prototype.

It covers the seven screens defined in `docs/DEMO_SPEC.md`, per the seven-screen direction approved in `docs/DECISIONS.md` DEC-001.

It does not approve the interface, financial wording, game values or final visual design.

> **Six-screen prototype preserved as evidence**
>
> The original six-screen prototype was tested by Anant on 2026-07-28, for basic clarity only, and completed without questions or blocked actions. That result applies only to the six-screen prototype. One informal observed walkthrough of the seven-screen direction described below occurred on 2026-07-29, but formal usability, accessibility and validation testing remain incomplete.

## Scope rules

- The prototype contains exactly seven screens.
- The first Figma prototype is desktop-first. The selected desktop frame size is Provisional pending Pankuri's review or explicit team approval. Phone adaptation will be considered after the desktop flow is complete.
- The screen order must match `docs/DEMO_SPEC.md`.
- No additional screen, game rule or step may be added without an approved Decision Record.
- The existing AI-generated interface is treated only as an untested design hypothesis. Generated reference art is not authoritative for mechanics, numbers, or terminology (`docs/DECISIONS.md` DEC-007).
- Financial values and outcomes remain Provisional unless approved through the finance process (`docs/DECISIONS.md` DEC-008).
- The interface displays results calculated by the engine; it does not calculate official results itself.
- Final branding, visual polish, React code and the Advanced Experience are outside this issue.

## Confirmed screen sequence

| Order | Screen | Time of day (visual only) |
|---|---|---|
| 1 | Start | Morning |
| 2 | Coach Tutorial | Daytime |
| 3 | Market Intelligence | Afternoon |
| 4 | City Investment Decision | Dusk |
| 5 | Market Result | Early Evening |
| 6 | Property Opportunity & Sealed Bid | Night |
| 7 | Round Summary | Late Night |

**Sequence status:** Confirmed against `docs/DEMO_SPEC.md` §6 and §10.

## Beginner journey and information hierarchy

### Screen 1 — Start

**Player goal:**  
Understand that this is the beginning of one short Market Empire demo round and start the experience.

**What the player should notice first:**  
The `Market Empire` game title.

**What the player should notice second:**  
One short sentence explaining what the player is about to do.

**What the player should notice last:**  
The single `Start Demo` button.

**Available action:**  
Start Demo.

**Untested assumptions:**

- The game title and one introductory sentence provide enough context for a first-time player.
- The `Start Demo` button clearly communicates the only available action.
- The player does not need login, settings, detailed rules or financial explanations before beginning.
- Whether to show starting cash before Start remains an open design choice per `docs/DEMO_SPEC.md` Screen 1 — neither showing nor hiding it has been decided or tested.

### Screen 2 — Coach Tutorial

**Player goal:**  
Understand, through a short scripted walkthrough, the meaning of Available Cash, market indicators, investment gains/losses, and the property auction, before making any decision.

**What the player should notice first:**  
The persistent shell already visible (map, HUD), with the first Coach step highlighting Available Cash.

**What the player should notice second:**  
The subsequent Coach steps, each highlighting a different shell element — market indicators are clues, not guarantees; investments may gain or lose; remaining cash may be needed for the auction.

**What the player should notice last:**  
The `Next` / `Back` / `Skip Tutorial` controls.

**Available actions:**

- Next.
- Back.
- Skip Tutorial.

**Untested assumptions:**

- The scripted tutorial steps are sufficient for a first-time player to understand the persistent shell before Screen 3. Informally challenged by Alexandra's 2026-07-29 walkthrough (see Usability walkthrough record below) — not yet re-tested.
- Highlighting shell elements in place, rather than using a separate walkthrough screen, helps the player connect the explanation to where it will matter later.
- Presenting `Skip Tutorial` as a secondary action does not encourage most players to skip content they need.
- The player does not need to interact with the map or indicators during the tutorial itself — only view the Coach's scripted steps.

**Observed findings (Alexandra, 2026-07-29 informal walkthrough):**

- The Coach needs a proper introduction before the current scripted steps begin: who he is, what the game is, what the player will do, and how he will help.
- The Coach should remain visible or accessible throughout the round. This is already required by `docs/DEMO_SPEC.md` §9 and `docs/DECISIONS.md` DEC-002/DEC-003 — this finding indicates a possible gap between the built prototype and that existing requirement, not a new requirement.

### Screen 3 — Market Intelligence

**Player goal:**  
Inspect all three scripted market indicators before proceeding to the investment decision.

**What the player should notice first:**  
The Market Intelligence panel heading and the three indicator cards.

**What the player should notice second:**  
Each card's headline and plain-language meaning as the player opens it.

**What the player should notice last:**  
The `Analyze City` button, enabled once all three indicators have been opened.

**Available actions:**

- Open each indicator card.
- Analyze City (enabled once all three are opened).

**Untested assumptions:**

- Three indicators (economic, business/sector-activity, counter-signal/risk) are not too many for a beginner to process before deciding.
- Requiring all three to be opened before `Analyze City` unlocks does not frustrate or confuse a first-time player.
- Indicator wording, still Provisional (`docs/DEMO_SPEC.md` §16), can be understood without additional financial definitions.
- The player carries forward, from the Screen 2 tutorial, the understanding that indicators are clues, not guarantees.
- An open/inspected card state, rather than a flip animation, is sufficient feedback that a card has been read.

### Screen 4 — City Investment Decision

**Player goal:**  
Select each of the four sector landmarks on the map, decide how much cash to allocate to each, then confirm.

**What the player should notice first:**  
The player's current Available Cash in the HUD.

**What the player should notice second:**  
The four clickable landmarks on the map (Technology, Health Care, Everyday Goods, Energy) and, once one is selected, its right-panel allocation slider and current allocation.

**What the player should notice last:**  
The live total-allocated / cash-remaining display and the `Confirm Investments` button.

**Available actions:**

- Select a landmark.
- Adjust its allocation slider.
- View the running total of cash allocated vs. cash remaining.
- Click Confirm Investments.

**Untested assumptions:**

- Selecting a landmark on the map, rather than a plain list of sectors, is an intuitive way for a beginner to open a sector's allocation panel.
- A slider is clearer than a numeric field for this age/experience group. This replaces the six-screen prototype's numeric-input approach and is itself untested.
- A running allocated/remaining total is enough feedback for a beginner to avoid over-allocating.
- The one-sentence sector descriptions (`docs/finance/source-ledger.md`, FIN-DEC-CAND-003 — still Provisional; cross-branch, Provisional; see finance dependency note) are understandable without financial background.
- The player understands that `Confirm Investments` locks in the decision and cannot be undone.
- The player does not need to see a sector's individual risk level before allocating — none is sourced (`docs/DECISIONS.md` DEC-008; no risk-profile label exists).
- Unallocated cash being permitted is understood as a valid choice, not an error.

**Observed findings (Alexandra, 2026-07-29 informal walkthrough):**

- Sector selection on this screen needs clearer beginner explanations and clues — the tester's confusion about the four sectors was observed here specifically, not on Screen 3.

### Screen 5 — Market Result

**Player goal:**  
Understand what happened to their cash after the investment decision, and why, then continue to the auction.

**What the player should notice first:**  
The total gain or loss for the round, shown with sign, word, icon, and colour together.

**What the player should notice second:**  
The gain or loss broken down per sector, matched by the map's illuminated/dimmed buildings.

**What the player should notice last:**  
The scripted Coach explanation and the `Continue to Auction` button.

**Available action:**  
Continue to Auction.

**Untested assumptions:**

- Showing the total change first, before the per-sector breakdown, helps a beginner process the result.
- The map's illuminate/dim animation reinforces, rather than distracts from, the numeric result.
- The scripted explanation sentence is understandable without further financial vocabulary.
- The player can tell that these are official, engine-calculated results and not a live estimate.
- All displayed numbers are exactly what the engine calculated — this screen does not perform its own calculation, per `docs/DEMO_SPEC.md` §14 and `AGENTS.md`.
- The absence of a "Claim Profits" action, because the result is already applied, is understood by the player rather than read as a missing step.

**Observed findings (Alexandra, 2026-07-29 informal walkthrough):**

- The market-result explanations on this screen need more clarity.

### Screen 6 — Property Opportunity and Sealed Bid

**Player goal:**  
Decide how much of their remaining cash to bid on the one available property, submit the sealed bid, then understand the result.

**What the player should notice first (pre-submission):**  
The property's name, type, and Provisional asking price on its map hotspot.

**What the player should notice second (pre-submission):**  
Available cash, documented income/operating-cost information, and the bid input field.

**What the player should notice last (pre-submission):**  
The `Submit Bid` button.

**What the player should notice first (post-submission):**  
The won/not-won result, shown with sign, word, icon, and colour together.

**What the player should notice second (post-submission):**  
Their bid vs. the scripted opponent's bid, and cash after the bid.

**What the player should notice last (post-submission):**  
The scripted Coach explanation and the `Continue` button.

**Available actions:**

- Enter a bid amount.
- Submit Bid.
- Continue (after submission).

**Untested assumptions:**

- Highlighting the property as a map hotspot, rather than presenting it as a standalone panel, is at least as easy to find as the six-screen version's dedicated screen.
- Showing the asking price does not mislead the player into thinking it is the required or matching bid amount.
- The player understands the bid is sealed — the opponent's bid stays hidden until after submission.
- The player does not need the losing-bid or tied-bid rules explained in advance; the result and reason appear afterward.
- A single numeric bid field, with no additional confirmation step before Submit Bid, is sufficient.
- The player does not need to be told in advance that a losing or tied bid costs them nothing (`docs/finance/source-ledger.md`, FIN-DEC-CAND-006 and FIN-DEC-CAND-007 — both still Provisional; cross-branch, Provisional; see finance dependency note).

**Observed findings (Alexandra, 2026-07-29 informal walkthrough):**

- This screen caused confusion about what to do. No formal defect severity is assigned to this finding — it is recorded as an observed, unverified note from a single informal walkthrough.

### Screen 7 — Round Summary

**Player goal:**  
See the overall result of the round, including the map's final owned/unowned state, and choose to play again or exit.

**What the player should notice first:**  
The one overall line describing how the round went (increased, unchanged or decreased).

**What the player should notice second:**  
Starting cash, ending cash, property result, and the map showing the owned property illuminated (if won) alongside the non-interactive "Future Game Content" locked district.

**What the player should notice last:**  
The `Play Again` and `Exit` buttons.

**Available actions:**

- Play Again.
- Exit.

**Untested assumptions:**

- Leading with the one overall summary line, before the individual numbers, matches how a beginner wants to process a final result.
- The player understands this is the end of the one-round demo, with no second round in this version.
- The visible-but-non-interactive locked future district reads as a teaser, not as a broken or missing feature.
- "Play Again" restarting the same one-round demo, rather than suggesting new content, does not disappoint or confuse the player.
- The end-of-round financial-position method behind this summary line (`docs/finance/source-ledger.md`, FIN-DEC-CAND-004 — still Provisional; cross-branch, Provisional; see finance dependency note) is understandable without further explanation of "carrying value."

## Cross-screen untested assumptions

- A first-time player can complete all seven screens in order without needing outside instructions, per `docs/PROJECT_FOUNDATION.md` acceptance gate item 1. This has only been observed for the six-screen prototype, not the seven-screen direction.
- The persistent city-map shell (HUD, map, right panel, Coach) staying visible across Screens 2–7, rather than resetting per screen, helps rather than distracts from each screen's task.
- Consistent placement of the primary action button across all seven screens reduces confusion between screens.
- The player correctly distinguishes provisional/scripted content (indicator text, Coach explanation text) from something they are expected to research or verify themselves.
- No screen needs a back button beyond the tutorial's own Back control; the seven-screen flow is intentionally linear after Screen 2.
- Reference-quality generated art (`docs/DECISIONS.md` DEC-007) does not lead a player to expect mechanics — such as "Credits," ROI, or a working unlockable district — that are not actually built.

**Observed findings (Alexandra, 2026-07-29 informal walkthrough):**

- Every screen should clearly explain what happened, what to do next, and why it matters. The existing "player goal" / "what the player should notice" fields in this document attempt this; this finding indicates they may not be sufficient as built.
- Important text needs to be larger, across screens generally (not isolated to one screen).

## Accessibility checklist

- [ ] Body text is large enough to read comfortably without zooming (target: 16px minimum equivalent). Alexandra's 2026-07-29 informal walkthrough noted important text needs to be larger generally, not only body text — this checklist item remains unchecked and unverified.
- [ ] Text and background color combinations meet a readable contrast level on all seven screens.
- [ ] All buttons (Start Demo, Next/Back/Skip Tutorial, Analyze City, Confirm Investments, Continue, Submit Bid, Play Again, Exit) are large enough to click without precision difficulty.
- [ ] All interactive map hotspots (landmarks, property, and their hover/focus/selected states) are keyboard-reachable, text-labelled, and visually distinct from one another, per `docs/DEMO_SPEC.md` §8.
- [ ] No information is conveyed by color alone (e.g., gain/loss must also use sign, word, and icon, not just green/red).
- [ ] Reduced-motion support exists for the map and day/night transitions, with essential information available without relying on animation.
- [ ] All seven desktop frames remain readable and usable at the selected desktop width.
- [ ] A later responsive and mobile-width review is required before phone support is claimed.

**Status:** Checklist defined; not yet executed against a seven-screen prototype, per Issue #2 acceptance criteria. The clickable seven-screen Figma prototype exists (see below).

## Usability walkthrough tasks

Updated from the original five-task set (`Market Empire Research Guide`, Track B, Pankuri) to cover the seven-screen flow. This update has not been reviewed by Pankuri or the team.

1. Start the demo.
2. Move through the Coach Tutorial using Next, Back, and Skip Tutorial.
3. Inspect all three market-intelligence indicators.
4. Select a city landmark and view its sector panel.
5. Allocate cash across sectors and confirm the investment decision.
6. Explain, in your own words, what the market result screen just showed.
7. Submit a property bid and explain the result.
8. Read the round summary.

**Status:** Tasks updated for the seven-screen flow; no longer identical to the original six-screen task set. Alexandra informally attempted the seven-screen flow on 2026-07-29, but the eight tasks listed above were not run or recorded as a formal structured test, and this task list itself requires Pankuri or team review before use.

## Figma prototype record

Two distinct prototypes are tracked here. They must not be conflated.

**Original six-screen prototype (tested, historical baseline)**

**Prototype target:** Desktop-first; exact viewport size remains Provisional.  
**Prototype link:** Not recorded in this document.  
**Six screens created:** Yes.  
**Screens linked from Start to Round Summary:** Yes.  
**Tested by Anant on 2026-07-28:** Yes, for basic clarity only.  
**Result:** Completed without questions or blocked actions.

**Seven-screen prototype (current direction)**

**Prototype target:** Desktop-first; exact viewport size remains Provisional.  
**Prototype link:** https://www.figma.com/design/JNrhuxNqawLvcGTtFqJMHU/Market-Empire---Beginner-One-Round-Prototype  
**Seven screens created:** Yes.  
**Screens linked from Start to Round Summary:** Yes, clickable.  
**Prototype status:** One informal observed walkthrough completed (Alexandra, 2026-07-29; see Usability walkthrough record below). Formal usability testing, accessibility testing, and automated/browser validation have not been completed.

## Usability walkthrough record

**Tester:** Anant (original six-screen prototype only; see `docs/DECISIONS.md` DEC-001).  
**Date:** 2026-07-28.  
**Method:** One observed walkthrough with a person unfamiliar with the project, for basic clarity only.  
**Result:** Completed the six-screen prototype without questions or blocked actions. This result applies only to the six-screen prototype and only to basic clarity — it is not a usability, accessibility, or automated test result.

**Tester:** Alexandra.  
**Date:** 2026-07-29.  
**Prototype tested:** The current seven-screen Figma prototype (https://www.figma.com/design/JNrhuxNqawLvcGTtFqJMHU/Market-Empire---Beginner-One-Round-Prototype).  
**Method:** One informal observed walkthrough. The tester's prior familiarity with the project was not formally recorded and is not assumed either way. This was not a formal usability pass, not an accessibility test, and not a final validation. This record is separate from, and is not claimed to carry the same evidentiary weight as, Anant's six-screen walkthrough above.  
**Observed findings:**

- The Coach needs a proper introduction explaining who he is, what the game is, what the player will do, and how he will help (see Screen 2 above).
- The Coach should remain visible or accessible throughout the round (see Screen 2 above).
- Sector selection on Screen 4 (City Investment Decision) needs clearer beginner explanations and clues (see Screen 4 above).
- Market-result explanations on Screen 5 need more clarity (see Screen 5 above).
- Important text needs to be larger (see Accessibility checklist and cross-screen assumptions above).
- The property-auction screen (Screen 6) caused confusion about what to do (see Screen 6 above). No formal defect severity is assigned.
- Every screen should clearly explain what happened, what to do next, and why it matters (see cross-screen assumptions above).
- The visual design was received positively.

**Result:** These are informal, unverified observations from a single walkthrough by one tester of unrecorded familiarity. No formal defect severity is assigned to any finding. This record does not confirm or rule out any usability, accessibility, or design strength, and does not satisfy any item in `docs/DEMO_SPEC.md` §19's testing and acceptance criteria.

One informal observed walkthrough of the seven-screen direction has occurred (Alexandra, 2026-07-29). No formal usability test, accessibility test, review, approval, or final validation of the seven-screen direction is claimed in this document.

## Known limitations

- Pankuri has not reviewed this document.
- One informal observed walkthrough of the seven-screen direction has occurred (Alexandra, 2026-07-29); no formal usability or accessibility test of the seven-screen direction has been executed. The six-screen prototype was separately tested by Anant on 2026-07-28.
- Alexandra's familiarity with the project prior to the walkthrough was not formally recorded and should not be assumed.
- No formal defect severity has been assigned to any finding from Alexandra's walkthrough.
- No accessibility check has been executed.
- A seven-screen Figma prototype now exists and is clickable (link in Figma prototype record above); it has not undergone formal usability, accessibility, or automated testing.
- The usability walkthrough tasks were updated for seven screens in this pass and have not been re-approved by Pankuri or the team.
- `docs/finance/source-ledger.md` (cited throughout for FIN-DEC-CAND-003/004/006/007 and FIN-DEMO-03) does not exist on this branch; it is expected from the unmerged finance branch/PR. Citations to it remain unverified until that work merges.
- Financial values and wording may change following finance review.
- All information-hierarchy choices remain untested design hypotheses.

## Future hypotheses (not in scope, not approved)

This section records ideas raised during walkthroughs that are explicitly out of scope for the current one-round demo. Recording a hypothesis here is not a decision, an approval, or a scope change — none of the below may be built without a recorded Decision Record in `docs/DECISIONS.md`, and none may be added to `docs/DEMO_SPEC.md` without one either.

- **Paid Coach clues (multiplayer, future only).** Raised during Alexandra's 2026-07-29 walkthrough: a later multiplayer version might charge a small in-game cost for optional extra Coach clues. This is a Provisional future hypothesis only. It is not approved, not designed, and not part of the current seven-screen demo. It requires UX, finance, and balance review before any decision is made.
