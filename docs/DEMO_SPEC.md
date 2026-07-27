MARKET EMPIRE

DEMO SPEC

The exact one-round demo we are building — nothing more, nothing less. Companion to the Project Foundation.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>START HERE</strong></p>
<p>This document describes one thing only: the first clickable demo. It does not describe the full game.</p>
<p>Every number in this document (cash, prices, percentages) is a placeholder until Hanyu confirms it with real research. That is written on every page it appears.</p>
<p>If a teammate or an AI tool is unsure what to build, this document — not memory, not a chat — is the answer.</p></td>
</tr>
</tbody>
</table>

1. What this document is — and isn't

This is the exact, agreed shape of the first playable slice of Market Empire: one round, six screens, ten steps. If a change would add a screen, a rule, or a step not listed here, it needs a Decision Record first (see Work Templates) — not a quiet edit to the code.

THIS DOCUMENT IS

The single source of truth for what the first demo does, screen by screen.

What Claude Code, Cursor, and Gemini are told to read before building or reviewing anything.

What a tester checks the finished demo against.

THIS DOCUMENT IS NOT

The full game design. Six rounds, the Advanced Experience, and real multiplayer come later.

A finance document. Hanyu's formulas.md and scoring.md are the real source for numbers — this spec only borrows placeholders so the demo can be clicked through.

Final. It can change — but only through a written Decision Record, never silently.

2. The one round, from start to finish

These are the same ten steps from the Project Foundation, now mapped onto six real screens. Each screen is detailed on its own page after this one.

Demo step (Foundation, section 2)

Screen in this spec

1. Start the demo

Screen 1 — Start

2. Read one market signal

Screen 2 — Market Signal

3. Allocate cash across four sectors

Screen 3 — Investment Decision

4. Confirm the decision

Screen 3 — Investment Decision

5. Engine calculates the result

Screen 4 — Market Result

6. See gain or loss, explained

Screen 4 — Market Result

7. Bid on one property

Screen 5 — Property Bid

8. See who won the bid and why

Screen 5 — Property Bid

9. Read the round's short explanation

Screen 4 — same explanation panel

10. See the round summary

Screen 6 — Round Summary

Screen 1 — Start

Covers demo step(s): Step 1

WHAT THE PLAYER SEES

A simple welcome screen: the game's name, one short sentence about what you're about to do, and a single button to begin.

WHAT THE PLAYER CAN DO — NOTHING ELSE IS POSSIBLE HERE

Click one button: Start

WHAT HAPPENS NEXT

The game loads the player's starting cash and moves straight to the Market Signal screen.

DATA THIS SCREEN NEEDS

Starting cash amount (placeholder: $10,000 — provisional, pending Hanyu)

One line of welcome text

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Not included on this screen</strong></p>
<p>Login, accounts, or player names</p>
<p>Settings or difficulty choices</p>
<p>Any explanation of game rules beyond one sentence</p></td>
</tr>
</tbody>
</table>

Screen 2 — Market Signal

Covers demo step(s): Step 2

WHAT THE PLAYER SEES

One short, plain-language clue about what might happen in the market this round — for example, a hint that one sector may be about to do well or badly.

WHAT THE PLAYER CAN DO — NOTHING ELSE IS POSSIBLE HERE

Read the signal

Click Continue

WHAT HAPPENS NEXT

The player moves to the Investment Decision screen, carrying the signal they just read in mind (the signal text stays visible or summarized there).

DATA THIS SCREEN NEEDS

One scripted signal text, pulled from content/signals.ts

No real market data or live AI — the text is fixed for this demo

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Not included on this screen</strong></p>
<p>Multiple signals in one round</p>
<p>Any signal the player can interact with or dismiss incorrectly</p>
<p>Real-time or AI-generated signal text</p></td>
</tr>
</tbody>
</table>

Screen 3 — Investment Decision

Covers demo step(s): Steps 3 and 4

WHAT THE PLAYER SEES

The player's starting cash and four sectors, each with a simple input for how much cash to put into it.

WHAT THE PLAYER CAN DO — NOTHING ELSE IS POSSIBLE HERE

Type or adjust an amount for each of the four sectors

See a running total of cash allocated vs. cash remaining

Click Confirm once the split feels right

WHAT HAPPENS NEXT

The engine locks in the decision and calculates the result — the player cannot change the split after confirming.

DATA THIS SCREEN NEEDS

Four sector names (placeholder names, pending Hanyu/Pankuri)

Starting cash amount (same placeholder as Screen 1)

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Not included on this screen</strong></p>
<p>Borrowing or going into debt</p>
<p>Undoing a confirmed decision</p>
<p>More than four sectors</p></td>
</tr>
</tbody>
</table>

Screen 4 — Market Result

Covers demo step(s): Steps 5, 6, and 9

WHAT THE PLAYER SEES

What happened to the player's cash after the decision: how much was gained or lost, per sector and in total, followed by a short, plain-language explanation of why.

WHAT THE PLAYER CAN DO — NOTHING ELSE IS POSSIBLE HERE

Read the result

Read the explanation

Click Continue

WHAT HAPPENS NEXT

The player moves to the Property Bid screen.

DATA THIS SCREEN NEEDS

A deterministic result from the engine (same input always gives the same output)

One scripted explanation sentence per outcome, from content/explanations.ts

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Not included on this screen</strong></p>
<p>Randomness that can't be reproduced for testing</p>
<p>Explanations written live by an AI during the game — all explanations are scripted and pre-approved</p></td>
</tr>
</tbody>
</table>

Screen 5 — Property Bid

Covers demo step(s): Steps 7 and 8

WHAT THE PLAYER SEES

One property, its asking price, and a single field to enter a sealed bid using remaining cash.

WHAT THE PLAYER CAN DO — NOTHING ELSE IS POSSIBLE HERE

Enter one bid amount

Click Submit Bid

WHAT HAPPENS NEXT

The engine resolves the bid (against a scripted opponent bid for this demo) and shows who won and why, in one short sentence.

DATA THIS SCREEN NEEDS

One property with a name and price (placeholder, pending Hanyu)

One scripted opponent bid amount, so the demo is testable and repeatable

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Not included on this screen</strong></p>
<p>Multiple properties or a city map</p>
<p>Real other players bidding live</p>
<p>Negotiation or counter-offers</p></td>
</tr>
</tbody>
</table>

Screen 6 — Round Summary

Covers demo step(s): Step 10

WHAT THE PLAYER SEES

A short summary of the whole round: starting cash, ending cash, whether the property was won, and one overall line about how the round went.

WHAT THE PLAYER CAN DO — NOTHING ELSE IS POSSIBLE HERE

Read the summary

Click Play Again or Exit (either just restarts or ends the demo — no further rounds are built yet)

WHAT HAPPENS NEXT

The one-round demo ends. There is no round two in this version.

DATA THIS SCREEN NEEDS

The final numbers already produced by the engine in Screens 4 and 5

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Not included on this screen</strong></p>
<p>A second round</p>
<p>Score comparison against other players</p>
<p>Any save or history of past demo runs</p></td>
</tr>
</tbody>
</table>

3. The numbers used in this demo — all provisional

Every value below exists only so the demo can be clicked through end to end. None of them are validated game balance. Each one needs a Research Source or Decision Record (see Work Templates) before it can be called final.

<table>
<colgroup>
<col style="width: 36%" />
<col style="width: 63%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Item</strong></th>
<th><strong>Current placeholder value</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Starting cash</strong></td>
<td>$10,000 (placeholder)</td>
</tr>
<tr class="even">
<td><strong>Number of sectors</strong></td>
<td>4 (placeholder names, pending Hanyu/Pankuri)</td>
</tr>
<tr class="odd">
<td><strong>Number of market signals</strong></td>
<td>1 per round, scripted</td>
</tr>
<tr class="even">
<td><strong>Number of properties</strong></td>
<td>1, fixed price (placeholder)</td>
</tr>
<tr class="odd">
<td><strong>Opponent bid</strong></td>
<td>1 scripted amount, not a real player</td>
</tr>
<tr class="even">
<td><strong>Property income/cost model</strong></td>
<td>Flat placeholder rate — see Foundation, Decision Record example</td>
</tr>
<tr class="odd">
<td colspan="2"><p><strong>Rule for this whole section</strong></p>
<p>If it's in this table, it is provisional by definition. Nobody needs to ask — check here first before assuming a number is final.</p></td>
</tr>
</tbody>
</table>

4. What the engine decides vs. what the screen shows

This rule applies to every screen in this document, without exception.

The engine (src/engine/) calculates every result: gains, losses, bid outcomes, and the final summary.

The interface (src/screens/, src/components/) only displays what the engine has already decided.

No screen is allowed to calculate its own result independently, even for something that looks simple.

Explanation text is scripted and pre-approved — never generated live by an AI during play.

5. Explicitly out of scope for this demo

These are deliberately not part of this version. Building any of them now would be scope creep, not progress.

Real online multiplayer, player accounts, or logins

More than one round — the full game is planned for six rounds later

The Advanced Experience (the faster, denser version for experienced players)

A full city map or more than one property

Any live AI calls during gameplay — all game text is scripted for this version

Saved progress, accounts, or history between sessions

6. Acceptance checklist — same gate as the Foundation

This is the exact checklist from the Project Foundation, section 3. The demo is only "done" when every line here is true — repeated here so it sits next to the spec it's judging.

☐ A user can start the demo without needing instructions.

☐ The market signal is understandable on its own.

☐ A player can allocate cash and confirm the choice.

☐ The engine produces the documented, expected result.

☐ The property bid resolves correctly.

☐ The explanation shown matches the confirmed result.

☐ The full round can be completed without a broken screen.

☐ Provisional formulas are visibly labelled as provisional.

☐ Automatic unit tests pass.

☐ One full browser walkthrough test passes.

☐ The demo is reachable through a working preview link.

☐ Known limitations are written down, not just remembered.

How this fits with the other documents

<table>
<colgroup>
<col style="width: 36%" />
<col style="width: 63%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Document</strong></th>
<th><strong>What it's for</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Project Foundation</strong></td>
<td>Why this project exists, and the rules that never change.</td>
</tr>
<tr class="even">
<td><strong>Getting Started Guide</strong></td>
<td>How to set up your computer to actually build any of this.</td>
</tr>
<tr class="odd">
<td><strong>Work Templates</strong></td>
<td>The forms used to write an issue, a decision, or a research source for anything in this spec.</td>
</tr>
<tr class="even">
<td><strong>This document (Demo Spec)</strong></td>
<td>Exactly what the first playable round contains — screen by screen.</td>
</tr>
<tr class="odd">
<td colspan="2"><p><strong>One-line summary of this whole document</strong></p>
<p>Six screens, ten steps, one round. Every number is a labeled placeholder. The engine decides, the screen displays. Nothing outside this list gets built yet.</p></td>
</tr>
</tbody>
</table>
