# Market Empire Finance Source Ledger

**Status:** Provisional working document  
**Related issue:** #1 — Finance evidence for the one-round demo  
**Owner:** Bora, temporarily completing work assigned to Hanyu  
**Review required:** Hanyu or explicit team approval

## Purpose

This ledger records the evidence, simplifications, limitations and known-answer examples used for the financial relationships required by the one-round Market Empire demo.

It does not define final formulas for the complete game.

## Evidence rules

- AI output is not accepted as research evidence.
- A claim is `Verified` only when a named source directly supports it.
- An exact game value remains `Provisional` when the source supports only a general relationship.
- Every source record must state what the source supports and what it does not support.
- Unsupported information must remain visible rather than being silently completed.
- Any approved change to a core financial rule must be recorded in `docs/DECISIONS.md`.

## Research status

| ID | Required output | Current status |
|---|---|---|
| FIN-DEMO-01 | Four simple sector definitions | Provisional — research not yet recorded |
| FIN-DEMO-02 | Cash behaviour | Provisional — two sources recorded; Hanyu or explicit team approval pending |
| FIN-DEMO-03 | One property income or cost model | Provisional — two sources recorded; model and exact values require review |
| FIN-DEMO-04 | One end-of-round evaluation method | Provisional — research not yet recorded |
| FIN-DEMO-05 | Known-input and known-output examples | Provisional — dependent on the rules above |

---

## FIN-DEMO-01 — Sector definitions

### Research question

Which four broad sector categories can be described clearly to a beginner and used in the one-round demo without implying that they represent every real-world investment sector?

### Proposed game rule

Not yet proposed.

### Sources

No sources recorded yet.

### Known limitations

- The final sector names have not been approved.
- The four-sector limit belongs to the current Demo Spec and is not a claim about real financial markets.
- Any descriptions produced here will be educational simplifications.

---

## FIN-DEMO-02 — Cash behaviour

### Research question

How should unallocated cash behave in the one-round demo, including whether it may become negative and whether it earns interest?

### Current project constraint

The Demo Spec excludes borrowing and going into debt.

The player may allocate only available cash and may place the property bid only using cash available at that point in the round.

### Proposed game rule

For the one-round demo:

- The player's cash balance cannot become negative.
- Total investment allocation cannot exceed the cash available when the decision is confirmed.
- A property bid cannot exceed the cash available when the bid is submitted.
- Cash that is not invested remains available for later use in the round.
- Unallocated cash earns 0% during this one-round demo.

**Status:** Provisional pending Hanyu's review or explicit team approval.

The no-debt boundary comes from the current Demo Spec. The exact 0% treatment is a project simplification and is not presented as a verified real-world rate.

### Sources

#### FIN-SRC-001 — Investor.gov asset-allocation guide

**Claim:**  
Cash and cash equivalents generally have lower risk and lower expected return than stocks and bonds.

**Source:**  
U.S. Securities and Exchange Commission, Investor.gov, “Beginners’ Guide to Asset Allocation, Diversification, and Rebalancing.”

**URL:**  
https://www.investor.gov/additional-resources/general-resources/publications-research/info-sheets/beginners-guide-asset

**Date checked:**  
2026-07-26

**Relevant section:**  
“Investment Choices” → “Cash.”

**What it supports:**  
Cash and cash equivalents are generally lower-risk and lower-return than the other major asset categories described by the source.

**What it does not support:**  
It does not support an exact 0% return, one-round timing, or the rule that all unallocated game cash must remain unchanged.

**Project simplification:**  
Market Empire keeps unallocated cash unchanged during the single demo round so the player can understand the trade-off between holding available cash and investing it.

**Status:**  
Verified for the stated general relationship. The exact game simplification remains Provisional.

#### FIN-SRC-002 — FINRA risk guide

**Claim:**  
Investment risk and potential return are generally related, and cash or cash equivalents have historically produced lower returns than stocks and bonds.

**Source:**  
Financial Industry Regulatory Authority, “Risk.”

**URL:**  
https://www.finra.org/investors/investing/investing-basics/risk

**Date checked:**  
2026-07-26

**Relevant section:**  
“Risk and Reward.”

**What it supports:**  
The general relationship between higher potential return and higher risk, and the comparatively lower historical return associated with cash or cash equivalents.

**What it does not support:**  
It does not prove that cash always has no risk, that it always earns the same return, or that the Market Empire demo should use exactly 0%.

**Project simplification:**  
The demo uses a 0% change for unallocated cash during its single short round. This avoids introducing interest calculations before they are researched and approved.

**Status:**  
Verified for the stated general relationship. The exact game simplification remains Provisional.

### Known limitations

- The 0% game treatment is not claimed to represent every real cash account or cash-equivalent product.
- Real cash and cash equivalents may earn interest or experience inflation risk.
- The demo does not model bank accounts, deposit insurance, taxes, fees or inflation.
- The no-debt rule is a current demo boundary, not a claim that borrowing never exists in real finance.
- The proposed rule has not yet been reviewed by Hanyu.

---

## FIN-DEMO-03 — Property income or cost model

### Research question

What simple relationship can show property income, operating costs and the resulting property cash flow in one deterministic demo round?

### Proposed game rule

For the one-round demo:

- The property has one scripted gross rental-income amount.
- The property has one scripted operating-cost amount.
- If the player wins the property, the engine calculates:

`net_property_result = gross_rental_income - operating_cost`

- If the player does not win the property, the player's net property result is `0`.
- The winning bid is handled separately from operating income and operating cost.
- If the player wins, the provisional cash calculation is:

`cash_after_property = cash_before_bid - winning_bid + net_property_result`

- Exact income, cost and property values have not yet been selected.

**Status:** Provisional pending Hanyu's review or explicit team approval.

The sources support calculating a property result from income and expenses. They do not verify the exact game values, timing or simplified cash treatment.

### Sources

#### FIN-SRC-003 — IRS residential rental-property guide

**Claim:**  
Rental property can produce rental income while also creating expenses, and those amounts contribute to a net rental income or loss.

**Source:**  
Internal Revenue Service, Publication 527, “Residential Rental Property.”

**URL:**  
https://www.irs.gov/publications/p527

**Date checked:**  
2026-07-27

**Relevant section:**  
Chapter 1, “Rental Income and Expenses”; Chapter 3, “Reporting Rental Income, Expenses, and Losses”; worked examples calculating net rental income or loss.

**What it supports:**  
Rental activity involves both income and expenses, and a net rental result can be calculated after relevant expenses are deducted.

**What it does not support:**  
It does not support one exact fictional property value, one-round timing, a scripted opponent bid, or omitting every real-world expense and tax consideration.

**Project simplification:**  
Market Empire uses one fixed rental-income value and one fixed operating-cost value for a single fictional property. It does not model taxes, depreciation, insurance, financing or detailed maintenance categories in this demo.

**Status:**  
Verified for the stated general income-and-expense relationship. The exact game model and values remain Provisional.

#### FIN-SRC-004 — Freddie Mac Net Operating Income definition

**Claim:**  
A property's operating result is based on income from its operations after vacancy and operating expenses are deducted, excluding debt service.

**Source:**  
Freddie Mac, “Multifamily Seller/Servicer Guide — Glossary and List of Commonly Used Acronyms.”

**URL:**  
https://mf.freddiemac.com/docs/mf_guide_glossary.pdf

**Date checked:**  
2026-07-27
 
**Relevant section:**  
Glossary entry “Net Operating Income,” PDF page 26; footer: “Glossary – Page 26.”

**What it supports:**  
Property operating income must be considered together with operating expenses rather than treating gross rental income as pure profit.

**What it does not support:**  
It does not verify the demo's exact values, the length of a game round, the property bid rule or the removal of vacancy from the simplified calculation.

**Project simplification:**  
The one-round demo uses one scripted income value minus one scripted operating-cost value. Vacancy, debt service and other detailed calculations are omitted and recorded as limitations.

**Status:**  
Verified for the stated general operating-income relationship. The exact game simplification remains Provisional.

### Known limitations

- The model represents one fictional property and does not represent the full property market.
- Exact income, operating-cost, asking-price and opponent-bid values remain unresolved.
- Real rental property may involve vacancy, repairs, insurance, taxes, financing, depreciation, management costs and other expenses.
- The demo does not model mortgages or debt service.
- The demo treats income and cost as scripted values instead of values derived from a real location or property.
- Subtracting the winning bid changes cash but does not by itself measure the player's total wealth because the player also owns the property.
- The proposed rule has not yet been reviewed by Hanyu.
---

## FIN-DEMO-04 — End-of-round evaluation

### Research question

What provisional method can summarize how the player performed without presenting a full-game scoring system as validated?

### Proposed game rule

Not yet proposed.

### Sources

No sources recorded yet.

### Known limitations

- The complete game's final scoring system is outside this issue.
- The method produced here will not be considered balance-validated.

---

## FIN-DEMO-05 — Known-answer examples

Known-answer examples will be added only after the relevant provisional rules are written clearly.

| Example ID | Inputs | Expected output | Rule tested | Status |
|---|---|---|---|---|
| To be added | — | — | — | Provisional |

---

## Research Source record

Copy one block for every source used.

### FIN-SRC-[number] — [short source name]

**Claim:**  
[Exact claim being assessed]

**Source:**  
[Author or organization, title and checkable location]

**Date checked:**  
[YYYY-MM-DD]

**Relevant section:**  
[Exact page, heading, table or paragraph]

**What it supports:**  
[What the source directly establishes]

**What it does not support:**  
[What cannot honestly be concluded from the source]

**Project simplification:**  
[How Market Empire simplifies the real relationship]

**Status:**  
Verified / Provisional

---

## Decision candidates

### FIN-DEC-CAND-001 — Unallocated cash treatment

**Proposed decision:**  
For the one-round demo, unallocated cash remains available and changes by 0% during the round.

**Why this is being proposed:**  
This keeps the demo deterministic and avoids introducing an unresearched interest calculation.

**Evidence status:**  
FIN-SRC-001 and FIN-SRC-002 support the general relationship that cash and cash equivalents typically involve lower risk and lower expected return than stocks and bonds. They do not verify the exact 0% game value.

**Status:**  
Provisional — awaiting Hanyu's review or explicit team approval.

**Decision Log status:**  
Not yet recorded in `docs/DECISIONS.md`.

### FIN-DEC-CAND-002 — Simplified property cash-flow model

**Proposed decision:**  
For the one-round demo, a won property produces one scripted gross rental-income amount and one scripted operating-cost amount. The engine calculates the net property result by subtracting the operating cost from the gross rental income.

**Why this is being proposed:**  
The relationship is simple, deterministic and explainable to a beginner while preserving the distinction between gross income and the amount remaining after costs.

**Evidence status:**  
FIN-SRC-003 and FIN-SRC-004 support the general relationship between property income, expenses and a resulting net amount. They do not verify the exact game values or one-round timing.

**Status:**  
Provisional — awaiting Hanyu's review or explicit team approval.

**Decision Log status:**  
Not yet recorded in `docs/DECISIONS.md`.

## Unresolved risks

- Hanyu has not reviewed this working document.
- Two sources have been recorded for cash behaviour.
- Two sources have been recorded for the property cash-flow relationship.
- No sources have yet been recorded for the sector definitions or end-of-round evaluation method.
- No exact financial values have been verified.
- The 0% treatment of unallocated cash remains Provisional.
- Exact property income, cost, asking-price and opponent-bid values remain unresolved.
- Ending cash alone does not represent total wealth when the player owns a property.
- Known-answer examples have not yet been written.
- None of the resulting relationships will be treated as balance-validated.
