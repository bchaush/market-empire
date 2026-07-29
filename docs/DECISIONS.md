# Market Empire Decision Log

This file records approved decisions that change the project scope, architecture, core game rules, financial rules or working process.

## How to use this file

- Add new decisions at the bottom.
- Never silently delete or rewrite an earlier decision.
- If a decision is replaced, keep the original and mark it as `Replaced`.
- Do not record an AI suggestion as an approved decision.
- The person with authority over that area must approve the decision.

## Decision record template

### DEC-[number] — [short decision title]

**Decision:**  
[What was agreed]

**Date:**  
[YYYY-MM-DD]

**Who approved:**  
[Name and role]

**Why:**  
[Why this choice was made]

**Alternatives considered:**  
[Other options and why they were not selected]

**What this changes:**  
[Files, rules, scope or process affected]

**Status:**  
Active / Replaced by DEC-[number]

---

## Recorded decisions

### DEC-001 — Replace six-screen click-through with seven-screen playable vertical slice

**Decision:**  
Replace the six-screen Demo Spec as the controlling build specification with the seven-screen playable vertical slice: Start, Coach Tutorial, Market Intelligence, City Investment Decision, Market Result, Property Opportunity & Sealed Bid, Round Summary. The original six-screen Figma prototype is preserved as historical evidence and applies only to the six-screen version — not to the seven-screen direction. Anant completed the original six-screen prototype without questions or blocked actions. This result covered basic clarity only.

**Date:**  
2026-07-28

**Who approved:**  
Bora, Product Lead (exercising delegated authority while the rest of the team was unavailable)

**Why:**  
To add a persistent city map, a tutorial screen, and three market indicators instead of one.

**Alternatives considered:**  
Keep the six-screen spec as the controlling build. Pankuri's own alternative design direction may still be compared later; that comparison does not block this decision.

**What this changes:**  
`docs/DEMO_SPEC.md` (full replacement), `docs/ux/beginner-flow.md`, `AGENTS.md` (Current demo boundaries).

**Status:**  
Active

---

### DEC-002 — Use one persistent interactive city district

**Decision:**  
Screens 2–7 share one persistent interface shell: a single fixed isometric city district (no free camera or zoom), a top HUD (Available Cash, current stage, time-of-day indicator), a right panel for whichever decision/information/result is relevant, four sector landmarks, one auction property, and one locked future district that is visible but never clickable (a teaser only). Only the hotspots relevant to the current step are interactive; every interactive hotspot must be keyboard-reachable and text-labelled.

**Date:**  
2026-07-28

**Who approved:**  
Bora, Product Lead

**Why:**  
To give the demo a persistent spatial frame instead of disconnected screens, and to visually preview future content without building it.

**Alternatives considered:**  
Not documented in source material.

**What this changes:**  
`docs/DEMO_SPEC.md` §7–§8 (Persistent Interface Shell, City-Map Behaviour); map component requirements for Screens 2–7.

**Status:**  
Active

---

### DEC-003 — Provide scripted Market Coach guidance

**Decision:**  
A scripted, non-generative Market Coach is visible or one click away on every screen after Start. It explains the current concept and the next action, and explains confirmed results only after the engine has calculated them. It never changes a number, never predicts an outcome with certainty, never recommends a specific allocation or bid amount, never states that one decision is universally correct, and never gives personalized financial advice. It uses approved beginner terminology only (exact wording remains a finance dependency).

**Date:**  
2026-07-28

**Who approved:**  
Bora, Product Lead

**Why:**  
To keep all gameplay explanations confirmed and scripted rather than generated, consistent with the project's permanent rules.

**Alternatives considered:**  
Live or generative AI coaching — explicitly excluded as a non-goal.

**What this changes:**  
`docs/DEMO_SPEC.md` §9 (Market Coach Behaviour) and Screen 2 (Coach Tutorial).

**Status:**  
Active

---

### DEC-004 — Use three scripted market-intelligence indicators

**Decision:**  
Screen 3 (Market Intelligence) presents three scripted indicator cards in place of the original single market signal: one wider economic indicator, one business/sector-activity indicator, and one counter-signal/risk indicator. Each card has a headline, a plain-language meaning, a status/source reference, and an inspected/viewed state. Indicators must not name an obviously correct sector or promise an outcome.

**Date:**  
2026-07-28

**Who approved:**  
Bora, Product Lead

**Why:**  
To replace the original single Market Signal step with a three-indicator system as part of the seven-screen direction.

**Alternatives considered:**  
Keep the single market signal from the original six-screen spec — superseded by DEC-001.

**What this changes:**  
`docs/DEMO_SPEC.md` Screen 3; `docs/ux/beginner-flow.md`. Exact wording, meanings, and any sector mapping remain Provisional pending Hanyu's review.

**Status:**  
Active

---

### DEC-005 — Use visual day-to-night progression

**Decision:**  
A deterministic, linear day-to-night visual progression accompanies the seven screens: Morning (Start), Daytime (Coach Tutorial), Afternoon (Market Intelligence), Dusk (City Investment Decision), Early Evening (Market Result), Night (Property Opportunity & Sealed Bid), Late Night (Round Summary). This is purely visual and never affects any calculation.

**Date:**  
2026-07-28

**Who approved:**  
Bora, Product Lead

**Why:**  
Not documented beyond its stated purpose as a visual progression tied to the persistent city-map shell.

**Alternatives considered:**  
Not documented in source material.

**What this changes:**  
`docs/DEMO_SPEC.md` §10 (Day-to-Night Visual Progression). Visual/animation implementation only; no engine impact.

**Status:**  
Active

---

### DEC-006 — Retain one scripted opponent and exclude real multiplayer

**Decision:**  
The demo remains single-player, with one scripted (non-live) opponent for the sealed-bid auction on Screen 6. Real-time multiplayer, chat, and rival-activity feeds are excluded. Required deterministic bid-resolution branches: player bid below opponent (player loses, no deduction); player bid equals opponent (opponent wins, no deduction); player bid above opponent (player wins and pays the submitted bid).

**Date:**  
2026-07-28

**Who approved:**  
Bora, Product Lead

**Why:**  
To keep the demo deterministic and testable.

**Alternatives considered:**  
Real-time multiplayer bidding — explicitly listed as a non-goal.

**What this changes:**  
`docs/DEMO_SPEC.md` Screen 6 (Property Opportunity and Sealed Bid). The scripted opponent bid amount remains a Provisional placeholder pending finance review.

**Status:**  
Active

---

### DEC-007 — Treat generated reference art as non-authoritative

**Decision:**  
Generated (Gemini / Nano-Banana) reference images are visual inspiration only — for style, layout, and the navy/teal/gold palette. Any mechanic, number, or term shown in a reference image (including "Credits," foot-traffic calculations, saturation percentages, ROI, synergy bonuses, live rival activity, a working "Unlock Next District," or account functionality) is excluded unless separately researched and decided. Terminology is normalized to "Available Cash" — never "Credits."

**Date:**  
2026-07-28

**Who approved:**  
Bora, Product Lead

**Why:**  
To prevent AI-generated concept art from silently introducing unapproved mechanics or terminology into the build.

**Alternatives considered:**  
Treat reference art as authoritative — rejected, since no mechanic shown in it has been separately researched or approved.

**What this changes:**  
`docs/DEMO_SPEC.md` §7 (Reference Art Is Not Authoritative); any future art/UI implementation guidance.

**Status:**  
Active

---

### DEC-008 — Keep unresolved financial inputs Provisional

**Decision:**  
The following inputs remain Provisional/TBD until Hanyu's review or an explicit team decision recorded in this file: the three market-indicator texts and meanings; indicator-to-sector mapping; the four sector return rates and permitted rate ranges; exact starting cash (the $10,000 figure is a placeholder only); property name, type, and asking price; gross property income and operating cost; the scripted opponent bid amount; and Coach financial terminology. None of these values may be pre-assigned or treated as approved.

**Date:**  
2026-07-28

**Who approved:**  
Bora, Product Lead

**Why:**  
To prevent unverified placeholder financial values from being treated as final, consistent with `AGENTS.md`'s permanent rule against inventing formulas or sources.

**Alternatives considered:**  
Not documented in source material.

**What this changes:**  
`docs/DEMO_SPEC.md` §16 (Finance Dependencies); `docs/ux/beginner-flow.md` financial references; required application state must not pre-assign any of these values.

**Status:**  
Active

---

### DEC-009 — Accept seven-screen Figma prototype as provisional foundation; move remaining clarity work to the coded demo

**Decision:**  
Figma iteration is complete. No more Figma polishing is required before coding begins. The seven-screen prototype (https://www.figma.com/design/JNrhuxNqawLvcGTtFqJMHU/Market-Empire---Beginner-One-Round-Prototype) is accepted as the Provisional design and flow foundation for implementation. Alexandra completed a second informal walkthrough on 2026-07-29 and reported the same previously recorded clarity issues — this is not a formal usability or accessibility pass. Remaining clarity and presentation work moves to the coded React/TypeScript demo. Required coded improvements include: Coach popup access on every applicable screen; building and sector information popups; clearer market-result and auction explanations; larger readable text; and improved spacing and responsive content panels. Final usability and accessibility validation must occur on the coded demo, not on Figma. This decision does not approve any financial value, formula, or gameplay rule.

**Date:**  
2026-07-29

**Who approved:**  
Bora, Product Lead

**Why:**  
To stop further Figma iteration and move remaining clarity and presentation work into the coded implementation, where it can be built and validated directly, rather than continuing to revise static mockups against the same recurring findings.

**Alternatives considered:**  
Continue iterating in Figma until all of Alexandra's findings are resolved there — rejected, since the remaining issues (Coach access, information popups, explanation clarity, text size, spacing) are implementation-level concerns better solved and validated in the coded demo itself.

**What this changes:**  
`docs/ux/beginner-flow.md` (Figma prototype record, Usability walkthrough record, and a new Figma-iteration-closed section recording the required coded improvements). Does not change `docs/DEMO_SPEC.md`, financial values, formulas, or gameplay rules.

**Status:**  
Active
