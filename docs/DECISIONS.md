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
Partially superseded by DEC-010 (2026-07-30) — see note below. This decision's original text above is preserved unchanged, per this file's rule against rewriting recorded decisions.

**Superseded-by-DEC-010 note (added 2026-07-30):**  
DEC-010 supplies Approved Provisional values for every input this decision listed as unresolved: the three market-indicator texts and meanings; indicator-to-sector mapping; the four sector return rates and permitted rate range; exact starting cash ($10,000); property name, type, and asking price; gross property income and operating cost; the scripted opponent bid amount; and Coach financial terminology. These items are no longer unassigned, but none of them is final — Hanyu's financial-formula and terminology review and Pankuri's beginner-wording review remain pending exactly as this decision originally required, and none of these values is balance-, usability-, or accessibility-validated.

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

---

### DEC-010 — Approve provisional demo configuration and scripted content (sectors, rates, indicators, property, Coach, viewport)

**Decision:**

The following Provisional demo inputs, required to make the seven-screen playable demo (Issue #7) run end-to-end, are approved as **Approved Provisional** project-authored implementation choices for this one-round demo. They are informed by general, externally documented financial relationships already recorded in `docs/finance/source-ledger.md`, but the exact numbers themselves are project-authored — not verified historical returns, market forecasts, valuations, historical benchmarks, or final balance values.

**Four sector labels and definitions** (confirms FIN-DEC-CAND-003):
- Technology — companies that provide software and information-technology services or make technology hardware, electronic equipment and semiconductors.
- Health Care — companies providing health services, medicines, biotechnology products, medical equipment and health-related supplies. Demand may be less sensitive to economic cycles than in some other sectors, but returns are not guaranteed.
- Everyday Goods — companies making or selling frequently purchased products such as food, drinks, household goods and personal-care products. These businesses are often described as relatively defensive, but their investments may still gain or lose value. `Everyday Goods` is Market Empire's beginner-facing project label based on the GICS `Consumer Staples` sector; it is not an official GICS sector name (see `docs/finance/source-ledger.md` FIN-SRC-005).
- Energy — companies involved in producing, processing, transporting or supporting oil, gas and other consumable fuels.

**Starting cash:** $10,000 exact.

**Sector return rates and round configuration** (confirms FIN-DEC-CAND-005; applies the externally-supported weighted-return relationship documented in FIN-SRC-009 and FIN-SRC-010 — those sources support the general method only, not these exact numbers):
- Project-authored active base rates for this scripted demo round: Technology +12%; Health Care +5%; Everyday Goods +3%; Energy +14%.
- Project-authored permitted demo rate range: -15% to +20%.
- Single-round scripted modifiers applied (see indicators below): Macro Boost (Indicator 1) +2% to all sectors; Tech Spending Boost (Indicator 2) +5% to Technology; Energy Shock / Transport Drag (Indicator 3) +4% to Energy, -4% to Everyday Goods.
- Resolved final rates for this demo round (mathematically derived: base rate plus applicable modifiers): Technology +19% (+12% base + 2% macro + 5% boost); Health Care +7% (+5% base + 2% macro); Everyday Goods +1% (+3% base + 2% macro − 4% drag); Energy +20% (+14% base + 2% macro + 4% boost).
- **Known balance limitation:** all four resolved final rates are positive, and Energy has the highest scripted rate at +20% — the top of the permitted range. With no separate risk penalty, allocating the maximum permitted amount to Energy produces the largest market-stage gain in this configuration. This configuration is not balance-validated and must not be claimed to prove that diversification is always the highest-return choice.

**Indicator-to-sector relationship:** the scripted indicators below apply the predetermined modifiers listed above to the demo's sector rates. The same confirmed inputs always produce the same resolved rates (deterministic).

**Three market-intelligence indicators** (Screen 3; supplies the exact wording DEC-004 left open):
- Indicator 1 (wider economic indicator) — Headline: "Inflation Cools and Consumer Outlook Improves." Plain-language meaning: in this fictional demo round, this positive macro signal applies a project-authored +2% modifier to all four sectors; it is a scripted game mechanic, not a market forecast. Status/source label: Scripted Demo Signal — informed by BLS inflation reporting, Federal Reserve inflation guidance, and The Conference Board Consumer Confidence Survey (general context only; the exact +2% modifier is project-authored and not sourced from these institutions).
- Indicator 2 (business/sector-activity indicator) — Headline: "Enterprise Cloud and Digital Infrastructure Spending Accelerates." Plain-language meaning: in this fictional demo round, increased technology spending applies a project-authored +5% modifier to Technology; it does not guarantee that technology investments generally earn this return. Status/source label: Scripted Demo Signal — informed by Gartner and IDC technology-spending research (general context only; the exact +5% modifier is project-authored).
- Indicator 3 (counter-signal/risk indicator) — Headline: "Global Crude Supply Bottlenecks Raise Fuel Costs." Plain-language meaning: in this fictional demo round, a fuel-supply disruption applies a project-authored +4% modifier to Energy and a -4% modifier to Everyday Goods; these exact effects are not real-world forecasts. Status/source label: Scripted Demo Signal — informed by U.S. Energy Information Administration reporting (general context only; the exact modifiers are project-authored).

**Property configuration** (confirms FIN-DEC-CAND-002's application and supplies the exact values FIN-DEMO-03 left as placeholders):
- Property name: Metro Tech Hub Plaza. Property type: Commercial Real Estate (Office & Retail Space).
- Asking price: $4,000.
- Gross property income: $350 / round (mathematically derived context only: this equals 8.75% of the $4,000 asking price for this scripted round — a description of the chosen numbers, not an annualized yield or capitalization-rate claim).
- Operating cost: $100 / round.
- Net property result (mathematically derived, per FIN-DEC-CAND-002 / FIN-DEMO-03: gross income minus operating cost): $250 / round. Simplified expense ratio (mathematically derived: operating cost ÷ gross income): approximately 28.57%.
- Scripted opponent bid: $4,250.

**Winning-bid known-answer example:** a new example (`docs/finance/source-ledger.md` FIN-EX-010) is added using `cash_before_bid = $10,800`, `player_bid = $4,500`, `opponent_bid = $4,250`, `gross_property_income = $350`, `operating_cost = $100`, resolving (mathematically derived) to `property_won = true`, `winning_bid = $4,500`, `net_property_result = $250`, `cash_after_property = $6,550`. This supplies the previously missing numeric coverage for BOUND-BID-05 (`docs/testing/initial-test-plan.md`). It is a synthetic known-answer test fixture, not a market forecast or property valuation, and it does not itself constitute a passed or executed test.

**Coach introduction and terminology:**
- Coach introduction script: "Welcome to Market Empire. You begin this demo with $10,000 in Available Cash. Market indicators provide clues, not guarantees. You can spread your investment across sectors, keep cash available for later, and then decide whether to bid on one fictional property. I will explain each step and every confirmed result without choosing an amount for you."
- Permitted beginner financial terms: Available Cash; Liquidity; Diversification; Concentration Risk; Net Property Result.
- Prohibited or avoided terms: "Credits" (always use "Available Cash" instead); arbitrary numeric risk scores; guaranteed-return promises or claims that defensive sectors cannot lose value; advanced mechanics (short selling, leverage, margin calls, options).

**Desktop layout baseline:** 1440 × 900 baseline resolution, with a fixed isometric district viewport, a persistent top HUD (Available Cash, current stage, time-of-day state), and a right-side interactive panel.

**Status of every item above:** Approved Provisional. These are project-authored demo choices, informed by documented general financial relationships already recorded in `docs/finance/source-ledger.md` (including FIN-SRC-005, FIN-SRC-009 and FIN-SRC-010), but they are not verified historical returns, market forecasts, final balance values, property valuations, or complete-game constants.

**Date:**  
2026-07-30

**Who approved:**  
Bora, Product Lead — approval recorded in GitHub Issue #8 comment `5131661033` (2026-07-30). Comment identity confirmed by Bora in a follow-up clarification comment `5131794197` (2026-07-30), addressing a heading typo in the original comment without changing, withdrawing or weakening any recorded content.

**Why:**  
Issue #7 Phase 1 built and tested the deterministic engine without assigning any unresolved gameplay defaults (per DEC-008). The seven-screen interface and E2E-001 cannot be completed honestly until the required financial values and scripted content are explicitly selected and recorded, per `AGENTS.md`'s permanent rules against inventing formulas, sources, or approvals.

**Alternatives considered:**  
Not documented in source material beyond the approval record itself.

**What this changes:**  
`docs/finance/source-ledger.md` (research-status table; FIN-DEC-CAND-002, -003, -005, -006, -007 status and Decision Log fields; new FIN-EX-010); `docs/DEMO_SPEC.md` §16 (Finance Dependencies table and inline FIN-DEC-CAND/FIN-DEMO citations) and §9 (Coach terminology reference); `docs/ux/beginner-flow.md` (Scope rules desktop baseline, Screen 4/6/7 finance citations, Known limitations); `docs/testing/initial-test-plan.md` (BOUND-BID-05, REQ-06-02, Unresolved gaps); this file's DEC-008 (partially superseded — see DEC-008's updated status note). Does not change the qualitative DEC-006 bid-resolution branches, the engine implementation, or any Issue #7 application code.

**Status:**  
Active — Approved Provisional. Financial-formula and terminology review remains pending Hanyu's or explicit team approval. Beginner-facing wording review remains pending Pankuri's or explicit team approval. The BOUND-BID-05 known-answer example remains pending Leo's/Hanyu's review per the approval record. Final usability, accessibility and balance validation have not been completed.
