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
| FIN-DEMO-01 | Four simple sector definitions | Provisional — two sources recorded; labels require Hanyu and Pankuri review |
| FIN-DEMO-02 | Cash behaviour | Provisional — two sources recorded; Hanyu or explicit team approval pending |
| FIN-DEMO-03 | One property income or cost model | Provisional — two sources recorded; model and exact values require review |
| FIN-DEMO-04 | One end-of-round evaluation method | Provisional — two sources recorded; method requires review |
| FIN-DEMO-05 | Known-input and known-output examples | Provisional — dependent on the rules above |

---

## FIN-DEMO-01 — Sector definitions

### Research question

Which four broad sector categories can be described clearly to a beginner and used in the one-round demo without implying that they represent every real-world investment sector?

### Proposed game rule

The one-round demo uses these four investment choices:

1. **Technology** — businesses that provide software and technology services or make products such as computers, electronic equipment and semiconductors.
2. **Health Care** — businesses that provide health services or make medicines, biotechnology products, medical equipment and health-related supplies.
3. **Everyday Goods** — businesses that make or sell frequently used products such as food, drinks, household goods and personal-care products.
4. **Energy** — businesses involved in producing, processing, transporting or supporting oil, gas and other consumable fuels.

The labels are intended as beginner-facing educational simplifications:

- `Technology` is a shortened label based on the GICS `Information Technology` sector.
- `Everyday Goods` is a simplified display label based on the GICS `Consumer Staples` sector.
- `Health Care` and `Energy` retain the standard GICS sector names.

**Status:** Provisional pending Hanyu's financial review, Pankuri's beginner-language review or explicit team approval.

No sector has an approved gain, loss, risk level or expected return yet.

### Sources

#### FIN-SRC-005 — S&P Global sector definitions

**Claim:**  
Investment classification systems can group companies into sectors based on their principal business activities, including Information Technology, Health Care, Consumer Staples and Energy.

**Source:**  
S&P Dow Jones Indices, “Sectors — Investment Themes” and “Global Industry Classification Standard Methodology.”

**URL:**  
https://www.spglobal.com/spdji/en/landing/investment-themes/sectors/

**Methodology URL:**  
https://www.spglobal.com/spdji/en/documents/methodologies/methodology-gics.pdf

**Date checked:**  
2026-07-27

**Relevant section:**  
“Sectors — Investment Themes” → “Sector Definitions”; GICS Methodology, “Overview,” “GICS Classification” and “GICS Structure.”

**What it supports:**  
GICS is a hierarchical investment classification system based primarily on a company's principal business activity. It identifies and defines Information Technology, Health Care, Consumer Staples and Energy as sectors.

**What it does not support:**  
It does not support limiting a financial game to exactly four sectors, replacing the standard label `Consumer Staples` with `Everyday Goods`, or assigning any particular gain, loss or risk level to these sectors.

**Project simplification:**  
Market Empire selects four distinct GICS-based categories for one demo round. Two labels are simplified for beginner readability, and the remaining GICS sectors are omitted from this version.

**Status:**  
Verified for the existence and general definitions of the referenced GICS sectors. The selected four-sector set and beginner labels remain Provisional.

#### FIN-SRC-006 — U.S. Census industry-classification guidance

**Claim:**  
A sector is a broad level within a hierarchical system used to classify businesses according to related economic or production activity.

**Source:**  
U.S. Census Bureau, “Economic Census: NAICS Codes & Understanding Industry Classification Systems.”

**URL:**  
https://www.census.gov/programs-surveys/economic-census/year/2022/guidance/understanding-naics.html

**Date checked:**  
2026-07-27

**Relevant section:**  
“Industry Classification,” “NAICS Structure” and “Sector Definitions.”

**What it supports:**  
NAICS groups establishments according to similarities in the processes used to produce goods or services. It uses a hierarchy beginning with broad sectors and then moving into narrower categories.

**What it does not support:**  
NAICS is not an investment-sector system and does not validate the four GICS-based labels chosen for Market Empire. It also does not support any expected sector return or game outcome.

**Project simplification:**  
Market Empire uses four investment-style categories rather than reproducing either the complete GICS structure or the complete NAICS structure.

**Status:**  
Verified for the general purpose and hierarchical nature of sector classification. The game's exact four-sector selection remains Provisional.

### Known limitations

- GICS currently contains more sectors than the four used in this demo.
- NAICS and GICS classify economic activity for different purposes and do not use identical categories.
- `Everyday Goods` is a beginner-facing project label, not the official GICS name.
- A company may conduct several business activities even when a classification system places it in one principal category.
- The four labels do not represent every type of company or investment.
- No sector-specific return, volatility, signal effect or risk value has been researched or approved.
- The labels have not yet been tested with an unfamiliar beginner.
- Hanyu has not reviewed the financial descriptions.
- Pankuri has not reviewed the beginner-facing wording.

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

What provisional method can summarize the player's end-of-round financial position without treating ending cash alone as the complete result or presenting a final full-game score?

### Proposed game rule

The one-round demo evaluates the player's change in financial position.

At the start of the round:

`starting_position = starting_cash`

At the end of the round:

`property_carrying_value = winning_bid` if the player won the property.

`property_carrying_value = 0` if the player did not win the property.

The engine then calculates:

`ending_position = ending_cash + property_carrying_value`

`round_change = ending_position - starting_position`

The overall summary line is determined as follows:

- If `round_change > 0`, display: `Your financial position increased by $X this round.`
- If `round_change = 0`, display: `Your financial position was unchanged this round.`
- If `round_change < 0`, display: `Your financial position decreased by $X this round.`

The Round Summary must still show ending cash and whether the property was won as separate information.

**Status:** Provisional pending Hanyu's review or explicit team approval.

This method is an end-of-round summary only. It is not the complete game's final score, a property appraisal or a claim about the player's real-world net worth.

### Sources

#### FIN-SRC-007 — Investor.gov net-worth guidance

**Claim:**  
A financial position can consider both assets owned and liabilities owed rather than looking only at available cash.

**Source:**  
U.S. Securities and Exchange Commission, Investor.gov, “Figure Out Your Finances.”

**URL:**  
https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/figure-out-your-finances

**Date checked:**  
2026-07-27

**Relevant section:**  
The section describing a net-worth statement, assets, liabilities and subtracting liabilities from assets.

**What it supports:**  
Financial position includes assets a person owns and liabilities a person owes. Looking only at cash can omit other owned assets.

**What it does not support:**  
It does not support using a winning bid as the property's current market value, omitting all liabilities in a real financial situation, or using net worth as the final Market Empire scoring system.

**Project simplification:**  
The demo has no borrowing or debt, so liabilities are zero. It combines ending cash with a provisional carrying value for the one property the player may own.

**Status:**  
Verified for the general assets-minus-liabilities relationship. The exact game calculation remains Provisional.

#### FIN-SRC-008 — IRS basis-of-assets guidance

**Claim:**  
The basis of property acquired through a purchase is generally its cost, meaning the amount paid for it, subject to possible additions and adjustments.

**Source:**  
Internal Revenue Service, Publication 551, “Basis of Assets,” and Tax Topic No. 703, “Basis of Assets.”

**URL:**  
https://www.irs.gov/publications/p551

**Summary URL:**  
https://www.irs.gov/taxtopics/tc703

**Date checked:**  
2026-07-27

**Relevant section:**  
Publication 551, “Introduction” and “Cost Basis”; Tax Topic No. 703, opening section describing the basis of an asset.

**What it supports:**  
Purchase cost is a documented starting measure of a person's investment in acquired property.

**What it does not support:**  
Cost basis is not necessarily current market value. The sources do not support the demo's scoring method, one-round timeframe, omission of purchase expenses or assumption that the winning bid always equals the property's economic value.

**Project simplification:**  
Market Empire uses the winning bid as the property's temporary carrying value because the demo has no appraisal, resale market, closing costs, depreciation or later valuation step.

**Status:**  
Verified for the general cost-basis relationship. The exact game treatment remains Provisional.

### Known limitations

- The method is not a final scoring system for the complete game.
- The winning bid may differ from the property's real or perceived market value.
- The property carrying value is based on acquisition cost, not an independent appraisal.
- The method does not assess whether the player overpaid or underpaid for the property.
- The method does not model liabilities because borrowing and debt are outside the current demo.
- Taxes, transaction fees, depreciation, resale value and future property income are not included.
- A positive round change does not automatically mean that every individual decision was good.
- The summary method has not yet been reviewed by Hanyu.
- No numeric game values have yet been approved.

---
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

### FIN-DEC-CAND-003 — Four demo sector labels

**Proposed decision:**  
Use Technology, Health Care, Everyday Goods and Energy as the four investment choices in the one-round demo.

`Technology` is based on the GICS Information Technology sector. `Everyday Goods` is a simplified beginner-facing label based on the GICS Consumer Staples sector.

**Why this is being proposed:**  
The four categories cover distinct types of business activity and can each be explained in one sentence. Limiting the demo to four choices follows the current Demo Spec and avoids presenting the complete market-classification system during one beginner round.

**Evidence status:**  
FIN-SRC-005 supports the existence and definitions of the four underlying GICS categories. FIN-SRC-006 supports the general use of hierarchical sector classifications and demonstrates that classification systems can organize activity differently. Neither source verifies this exact four-sector selection or the simplified display labels.

**Status:**  
Provisional — awaiting Hanyu's financial review, Pankuri's beginner-language review or explicit team approval.

**Decision Log status:**  
Not yet recorded in `docs/DECISIONS.md`.

### FIN-DEC-CAND-004 — End-of-round financial-position summary

**Proposed decision:**  
Evaluate the one-round result using the player's ending cash plus the acquisition cost of any property won, then compare that ending position with starting cash.

The winning bid is used only as the property's provisional carrying value. It is not presented as verified market value.

**Why this is being proposed:**  
Ending cash alone does not include the property the player owns. Adding a property carrying value prevents the purchase from appearing as a complete financial loss while keeping the calculation deterministic.

**Evidence status:**  
FIN-SRC-007 supports considering assets and liabilities when describing financial position. FIN-SRC-008 supports purchase cost as a starting basis for acquired property. Neither source verifies this exact game calculation or treats acquisition cost as current market value.

**Status:**  
Provisional — awaiting Hanyu's review or explicit team approval.

**Decision Log status:**  
Not yet recorded in `docs/DECISIONS.md`.

## Unresolved risks

- Hanyu has not reviewed this working document.
- Pankuri has not reviewed or usability-tested the proposed sector labels.
- Two sources have been recorded for cash behaviour.
- Two sources have been recorded for the property cash-flow relationship.
- Two sources have been recorded for sector classification and definitions.
- Two sources have been recorded for the end-of-round financial-position method.
- No exact financial values have been verified.
- The 0% treatment of unallocated cash remains Provisional.
- The exact four-sector selection and the label `Everyday Goods` remain Provisional.
- No gain, loss, risk or market-signal effect has been assigned to any sector.
- Exact property income, cost, asking-price and opponent-bid values remain unresolved.
- The winning bid is not a verified property market value.
- The end-of-round method does not evaluate whether the player overpaid or underpaid.
- Known-answer examples have not yet been written.
- The deterministic sector-result relationship still requires definition before all known-answer examples can be completed.
- None of the resulting relationships will be treated as balance-validated.
