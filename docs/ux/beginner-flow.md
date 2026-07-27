# Market Empire Beginner Flow

**Status:** Provisional working document  
**Related issue:** #2 — Beginner clickable flow for the one-round demo  
**Owner:** Bora, temporarily completing work assigned to Pankuri  
**Review required:** Pankuri or explicit team approval

## Purpose

This document defines the proposed beginner journey, information hierarchy, usability tasks, accessibility checks and untested assumptions for the one-round Market Empire clickable prototype.

It covers only the six screens defined in `docs/DEMO_SPEC.md`.

It does not approve the interface, financial wording, game values or final visual design.

## Scope rules

- The prototype contains exactly six screens.
- The first Figma prototype is desktop-first. The selected desktop frame size is Provisional pending Pankuri's review or explicit team approval. Phone adaptation will be considered after the desktop flow is complete.
- The screen order must match `docs/DEMO_SPEC.md`.
- No additional screen, game rule or step may be added without an approved Decision Record.
- The existing AI-generated interface is treated only as an untested design hypothesis.
- Financial values and outcomes remain Provisional unless approved through the finance process.
- The interface displays results calculated by the engine; it does not calculate official results itself.
- Final branding, visual polish, React code and the Advanced Experience are outside this issue.

## Confirmed screen sequence

| Order | Screen | Demo steps |
|---|---|---|
| 1 | Start | Step 1 |
| 2 | Market Signal | Step 2 |
| 3 | Investment Decision | Steps 3 and 4 |
| 4 | Market Result | Steps 5, 6 and 9 |
| 5 | Property Bid | Steps 7 and 8 |
| 6 | Round Summary | Step 10 |

**Sequence status:** Confirmed against `docs/DEMO_SPEC.md`.

## Beginner journey and information hierarchy

### Screen 1 — Start

**Player goal:**  
Understand that this is the beginning of one short Market Empire demo round and start the experience.

**What the player should notice first:**  
The `Market Empire` game title.

**What the player should notice second:**  
One short sentence explaining what the player is about to do.

**What the player should notice last:**  
The single `Start` button.

**Available action:**  
Start.

**Untested assumptions:**  

- The game title and one introductory sentence provide enough context for a first-time player.
- The `Start` button clearly communicates the only available action.
- The player does not need login, settings, detailed rules or financial explanations before beginning.
- Not displaying the starting cash before the player clicks `Start` will not cause confusion.

### Screen 2 — Market Signal

**Player goal:**  
Read and understand the single market clue before making an investment decision.

**What the player should notice first:**  
The `Market Signal` screen heading.

**What the player should notice second:**  
The one short, scripted market-signal message.

**What the player should notice last:**  
The `Continue` button.

**Available action:**  
Continue.

**Untested assumptions:**  

- A first-time player can understand the scripted signal without additional financial definitions.
- One signal is enough information for the player to continue confidently.
- The player understands that `Continue` moves to the investment decision.
- Keeping the signal visible or summarized on the next screen will help the player remember it.
- The exact signal wording has not yet been usability-tested.

### Screen 3 — Investment Decision

**Player goal:**  
Decide how to split available cash across the four sectors, then confirm the decision.

**What the player should notice first:**  
The player's current cash amount.

**What the player should notice second:**  
The four sector input fields and a running total of cash allocated vs. cash remaining.

**What the player should notice last:**  
The `Confirm` button.

**Available actions:**  

- Type or adjust an amount for each of the four sectors.
- View the running total of cash allocated vs. cash remaining.
- Click Confirm.

**Untested assumptions:**  

- A running total is enough feedback for a beginner to avoid over-allocating.
- The four sector names and one-sentence descriptions (see `docs/finance/source-ledger.md`, FIN-DEC-CAND-003 — still Provisional) are understandable without financial background.
- The player understands that Confirm locks in the decision and cannot be undone.
- Numeric input alone (vs. sliders or presets) is the clearest interaction for this age/experience group.
- The player does not need to see a sector's individual risk level before allocating.

### Screen 4 — Market Result

**Player goal:**  
Understand what happened to their cash after the investment decision, and why.

**What the player should notice first:**  
The total gain or loss for the round.

**What the player should notice second:**  
The gain or loss broken down per sector.

**What the player should notice last:**  
The short, plain-language explanation and the `Continue` button.

**Available action:**  
Continue.

**Untested assumptions:**  

- Showing the total change first, before the per-sector breakdown, helps a beginner process the result.
- The scripted explanation sentence (from `content/explanations.ts`, per `docs/DEMO_SPEC.md`) is understandable without further financial vocabulary.
- The player can tell that these are official, engine-calculated results and not a live estimate.
- One combined screen for result + explanation (rather than two separate screens) does not overwhelm a first-time player.
- All displayed numbers are exactly what the engine in `docs/finance/source-ledger.md` calculated — this screen does not perform its own calculation, per `docs/DEMO_SPEC.md` section 4 and `AGENTS.md`.

### Screen 5 — Property Bid

**Player goal:**  
Decide how much of their remaining cash to bid on the one available property, then submit the bid.

**What the player should notice first:**  
The property's name and asking price.

**What the player should notice second:**  
The single bid input field and their remaining cash.

**What the player should notice last:**  
The `Submit Bid` button.

**Available action:**  
Submit Bid.

**Untested assumptions:**  

- Showing the asking price (even though the bid is sealed and doesn't have to match it) does not mislead the player into thinking it's the required amount.
- The player understands the bid is sealed — they cannot see or react to the opponent's bid before submitting.
- The player does not need the losing-bid or tied-bid rules explained in advance on this screen; the result and reason appear afterward.
- One single numeric field is sufficient for entering a bid, with no additional confirmation step before Submit Bid.
- The player does not need to be told in advance that a losing or tied bid costs them nothing (per `docs/finance/source-ledger.md`, FIN-DEC-CAND-006 and FIN-DEC-CAND-007 — both still Provisional).

### Screen 6 — Round Summary

**Player goal:**  
See the overall result of the round and choose to play again or exit.

**What the player should notice first:**  
The one overall line describing how the round went (increased, unchanged or decreased).

**What the player should notice second:**  
Starting cash, ending cash and whether the property was won.

**What the player should notice last:**  
The `Play Again` and `Exit` buttons.

**Available actions:**  

- Play Again.
- Exit.

**Untested assumptions:**  

- Leading with the one overall summary line, before the individual numbers, matches how a beginner wants to process a final result.
- The player understands this is the end of the one-round demo, with no second round in this version.
- "Play Again" restarting the same one-round demo (rather than suggesting new content) does not disappoint or confuse the player.
- The player does not need a comparison to other players' scores, per `docs/DEMO_SPEC.md` Screen 6 exclusions.
- The end-of-round financial-position method behind this summary line (`docs/finance/source-ledger.md`, FIN-DEC-CAND-004 — still Provisional) is understandable without further explanation of "carrying value."

## Cross-screen untested assumptions

- A first-time player can complete all six screens in order without needing outside instructions, per `docs/PROJECT_FOUNDATION.md` acceptance gate item 1.
- Consistent placement of the primary action button (bottom or clearly separated) across all six screens reduces confusion between screens.
- The player does not need a persistent cash display on every screen; showing it contextually (Screens 3, 5, 6) is sufficient.
- The player correctly distinguishes provisional/scripted content (signal text, explanation text) from something they are expected to research or verify themselves.
- No screen needs a back button; the Demo Spec's ten-step flow is intentionally linear.

## Accessibility checklist

- [ ] Body text is large enough to read comfortably without zooming (target: 16px minimum equivalent).
- [ ] Text and background color combinations meet a readable contrast level on all six screens.
- [ ] All buttons (Start, Continue, Confirm, Submit Bid, Play Again, Exit) are large enough to tap or click without precision difficulty.
- [ ] No information is conveyed by color alone (e.g., gain/loss must also use text or icons, not just green/red).
- [ ] All six desktop frames remain readable and usable at the selected desktop width.
- [ ] A later responsive and mobile-width review is required before phone support is claimed.

**Status:** Checklist defined; not yet executed against the Figma prototype, per Issue #2 acceptance criteria.

## Usability walkthrough tasks

Reused from `Market Empire Research Guide`, Track B (Pankuri), five test tasks, unmodified:

1. Start the demo.
2. Explain, in your own words, what the market signal just told you.
3. Make an investment decision and confirm it.
4. Find out how much cash you have left.
5. Place a property bid and explain the result.

**Status:** Tasks defined; no tester has attempted them yet.

## Figma prototype record

**Prototype target:** Desktop-first; exact viewport size remains Provisional.  
**Prototype link:** Not yet created.  
**Six screens created:** No.  
**Screens linked from Start to Round Summary:** No.  
**Prototype status:** Not yet tested.

## Usability walkthrough record

**Tester:** Not yet selected.  
**Date:** Not yet completed.  
**Method:** One observed walkthrough with a person unfamiliar with the project.  
**Result:** Not yet completed.

No usability test, review or approval is claimed in this document yet.

## Known limitations

- Pankuri has not reviewed this document.
- No unfamiliar-person walkthrough has occurred.
- No accessibility check has been executed.
- The Figma prototype has not been created.
- Financial values and wording may change following finance review.
- All information-hierarchy choices remain untested design hypotheses.
