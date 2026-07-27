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
| FIN-DEMO-03 | One property income or cost model | Provisional — property model, losing-bid and tied-bid relationships documented; exact values and approval remain pending |
| FIN-DEMO-04 | One end-of-round evaluation method | Provisional — two sources recorded; method requires review |
| FIN-DEMO-05 | Known-input and known-output examples | Provisional — formula examples, settlement relationship, bid boundaries and cent-level rounding documented; sector rates and signal mapping remain unresolved |

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

- If the player's bid is lower than the scripted opponent bid, the player does not win the property.
- A losing bid is not deducted from cash.
- The player receives no property income or operating cost after losing.
- For a losing bid:

`property_won = false`

`net_property_result = 0`

`cash_after_property = cash_before_bid`

- If the player's bid equals the scripted opponent bid, the scripted opponent wins.
- The player does not acquire the property.
- A tied bid is not deducted from the player's cash.
- The player receives no property income or operating cost.
- For a tied bid:

`property_won = false`

`net_property_result = 0`

`cash_after_property = cash_before_bid`

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

#### FIN-SRC-011 — MIT first-price sealed-bid auction

**Claim:**  
In a first-price sealed-bid auction, bidders submit sealed bids, the highest bidder wins and the winner pays their own bid.

**Source:**  
Alexander Wolitzky, Massachusetts Institute of Technology OpenCourseWare, “Lecture 21: Auctions and Incomplete Information,” 14.15 / 6.207 Networks, Spring 2022.

**URL:**  
https://ocw.mit.edu/courses/14-15-networks-spring-2022/mit14_15s22_lec21.pdf

**Date checked:**  
2026-07-27

**Relevant section:**  
Page 24, “Auction Formats”; page 36, “First-Price Auction.”

**What it supports:**  
The source states that the highest bidder wins a first-price sealed-bid auction and pays their own bid. It also describes a bidder who loses the auction as receiving a payoff of zero.

**What it does not support:**  
It does not define Market Empire's scripted opponent bid, tied-bid rule, property values, entry fees, deposits or penalties.

**Project simplification:**  
The one-round demo has no auction-entry fee, deposit or losing-bid penalty. Therefore, a player who loses does not acquire the property and keeps the full amount they offered.

**Status:**  
Verified for the standard first-price sealed-bid winner-payment relationship. The exact Market Empire rule remains Provisional pending review or explicit team approval.

#### FIN-SRC-012 — EconPort first-price sealed-bid auction

**Claim:**  
In a first-price sealed-bid auction, the highest bidder wins and pays their submitted bid.

**Source:**  
EconPort, Georgia State University, “First-Price Sealed-Bid Auction.”

**URL:**  
https://www.econport.org/econport/request?page=man_auctions_firstpricesealed

**Date checked:**  
2026-07-27

**Relevant section:**  
Opening definition of the first-price sealed-bid auction.

**What it supports:**  
The source states that the high bidder wins the auction and pays their own bid.

**What it does not support:**  
It does not define Market Empire's opponent bid, tied-bid rule, property values, entry fees, deposits or losing-bid penalties.

**Project simplification:**  
Market Empire uses a first-price sealed-bid structure with no fee or deposit. Only the winning player's bid is deducted from cash.

**Status:**  
Verified for the standard first-price sealed-bid winner-payment relationship. The exact Market Empire rule remains Provisional pending review or explicit team approval.

### Known limitations

- The model represents one fictional property and does not represent the full property market.
- Exact income, operating-cost, asking-price and opponent-bid values remain unresolved.
- Real rental property may involve vacancy, repairs, insurance, taxes, financing, depreciation, management costs and other expenses.
- The demo does not model mortgages or debt service.
- The demo treats income and cost as scripted values instead of values derived from a real location or property.
- Subtracting the winning bid changes cash but does not by itself measure the player's total wealth because the player also owns the property.
- The tied-bid rule is a deterministic project choice and is not established by FIN-SRC-011 or FIN-SRC-012.
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

These examples use synthetic test inputs chosen only to prove the arithmetic and boundary behaviour of rules already written in this ledger.

They are not approved game constants, market forecasts, balance targets, property valuations or source-backed real-world values.

The deterministic sector-settlement relationship is documented below.

No sector gain-or-loss example using actual demo values is recorded yet because the ledger does not currently define:

- a scripted signal-to-sector mapping;
- sector result rates;
- permitted sector-return ranges;

### Deterministic sector-settlement relationship

For each sector, the engine receives:

- the amount allocated to that sector; and
- one scripted return rate for that sector.

The return rate must be represented as a decimal during calculation:

- `5% = 0.05`
- `-5% = -0.05`

For each sector:

`sector_change = sector_allocation × sector_return_rate`

`settled_sector_value = sector_allocation + sector_change`

Across the four sectors:

`total_market_change = technology_change + health_care_change + everyday_goods_change + energy_change`

The unallocated cash amount is:

`unallocated_cash = starting_cash - total_allocated`

The cash available after market settlement is:

`cash_after_market = unallocated_cash + technology_settled_value + health_care_settled_value + everyday_goods_settled_value + energy_settled_value`

A mathematically equivalent check is:

`cash_after_market = starting_cash + total_market_change`

The equivalent check applies only when:

- total allocation does not exceed starting cash;
- no borrowing is used;
- unallocated cash changes by `0%`;
- no fee, tax or separate sector-income amount is added; and
- all four sector changes are calculated from the same confirmed allocation.

The engine must calculate each sector result separately so Screen 4 can show the gain or loss per sector as required by the Demo Spec.

**Status:** Provisional pending Hanyu's review or explicit team approval.

The weighted-return relationship is supported by the recorded sources below. The exact sector rates, signal mapping and permitted rate ranges remain unresolved. Cent-level rounding is documented separately below as a Provisional project convention.

### Sources supporting the settlement relationship

#### FIN-SRC-009 — CFA Institute portfolio-return relationship

**Claim:**  
A portfolio return can be aggregated from the returns of its individual holdings according to the weight of each holding in the portfolio.

**Source:**  
CFA Institute, “Portfolio Mathematics,” 2026 CFA Program Level I Quantitative Methods.

**URL:**  
https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/portfolio-mathematics

**Date checked:**  
2026-07-27

**Relevant section:**  
“Introduction,” specifically the statement that expected portfolio return is a weighted average of the expected returns on the securities in the portfolio.

**What it supports:**  
The general mathematical relationship that each holding contributes to portfolio return according to its portfolio weight.

**What it does not support:**  
It does not provide Market Empire's four sector rates, scripted signal, one-round timeframe, rounding rule or educational balance parameters. It discusses expected portfolio return and does not validate any particular scripted realized outcome.

**Project simplification:**  
Market Empire applies one scripted return rate to each confirmed sector allocation and sums the resulting dollar changes.

**Status:**  
Verified for the weighted portfolio-return relationship. The exact game rates and signal mapping remain Provisional.

#### FIN-SRC-010 — FINRA investment-return calculation

**Claim:**  
An investment's percent return relates its change in value and income to the amount invested.

**Source:**  
Financial Industry Regulatory Authority, “Evaluating Performance.”

**URL:**  
https://www.finra.org/investors/investing/investing-basics/evaluating-performance

**Date checked:**  
2026-07-27

**Relevant section:**  
“Performance Measures” → “Rate of Return.”

**What it supports:**  
FINRA gives the relationship:

`(change in value + income) / investment amount = percent return`

When no separate income component exists, the relationship can be rearranged to calculate the change in value from the invested amount and return rate.

**What it does not support:**  
It does not provide a return rate for any Market Empire sector. It also does not support ignoring fees, taxes, inflation or holding-period differences in a complete real-world investment calculation.

**Project simplification:**  
The one-round demo uses one scripted sector rate, no separate sector income, and no transaction fees or taxes. Each sector's dollar change is calculated from its confirmed allocation.

**Status:**  
Verified for the general investment-return relationship. The exact game implementation remains Provisional.

### Calculation conventions for these examples

- All amounts are expressed in dollars.
- Every input used by a calculation is written explicitly.
- FIN-EX-001 through FIN-EX-008 primarily use whole-dollar amounts. FIN-EX-009 explicitly tests the documented cent-level rounding rule.
- A future automated test must not infer a value that is not written in its example.
- The examples test the provisional relationships only; they do not validate game balance.

### Cent-level rounding rule

For the one-round demo:

- Monetary inputs may include dollars and cents.
- Percentage calculations may initially produce fractions smaller than one cent.
- Each sector's calculated dollar change is rounded to the nearest cent before it is added to the settled sector value or total market change.
- An amount exactly halfway between two cents is rounded away from zero:
  - `$5.005` becomes `$5.01`.
  - `-$5.005` becomes `-$5.01`.
- Amounts already expressed to the nearest cent are added or subtracted without further rounding.
- Ending cash and the end-of-round financial position are calculated from the already-rounded component amounts.
- The interface displays monetary amounts using two decimal places.

This means the engine must not calculate the total from unrounded sector changes and then round only once at the end.

**Status:** Provisional pending Hanyu's review or explicit team approval.

This is a deterministic project convention. It is not presented as a universal accounting or financial-market rule.

### FIN-EX-001 — Unallocated cash remains unchanged

**Inputs:**

- `starting_cash = 10000`
- `total_allocated = 0`
- `unallocated_cash = 10000`
- `cash_return_rate = 0%`

**Expected calculation:**

`cash_change = 10000 × 0 = 0`

`cash_after_market = 10000 + 0 = 10000`

**Expected output:**

- Cash after the market result is `$10,000`.
- No gain or loss is attributed to unallocated cash.

**Rule tested:**

Unallocated cash changes by 0% during the one-round demo.

**Status:** Provisional synthetic test example.

### FIN-EX-002 — Allocation may equal available cash

**Inputs:**

- `starting_cash = 10000`
- `technology_allocation = 2500`
- `health_care_allocation = 2500`
- `everyday_goods_allocation = 2500`
- `energy_allocation = 2500`

**Expected calculation:**

`total_allocated = 2500 + 2500 + 2500 + 2500 = 10000`

`cash_remaining = 10000 - 10000 = 0`

**Expected output:**

- The allocation is valid because it does not exceed available cash.
- Total allocated cash is `$10,000`.
- Cash remaining before market settlement is `$0`.

**Rule tested:**

Total allocation may equal, but may not exceed, available cash.

**Known limitation:**

No gain or loss is calculated because sector settlement rates have not been defined.

**Status:** Provisional synthetic boundary example.

### FIN-EX-003 — Positive property operating result

**Inputs:**

- `gross_rental_income = 600`
- `operating_cost = 200`

**Expected calculation:**

`net_property_result = 600 - 200 = 400`

**Expected output:**

The net property result is a `$400` gain.

**Rule tested:**

`net_property_result = gross_rental_income - operating_cost`

**Status:** Provisional synthetic test example.

### FIN-EX-004 — Property win produces an increased financial position

**Inputs:**

- `starting_position = 10000`
- `cash_before_bid = 10000`
- `property_won = true`
- `winning_bid = 2500`
- `gross_rental_income = 600`
- `operating_cost = 200`

**Expected calculation:**

`net_property_result = 600 - 200 = 400`

`ending_cash = 10000 - 2500 + 400 = 7900`

`property_carrying_value = 2500`

`ending_position = 7900 + 2500 = 10400`

`round_change = 10400 - 10000 = 400`

**Expected output:**

- Ending cash is `$7,900`.
- Property carrying value is `$2,500`.
- Ending financial position is `$10,400`.
- Display: `Your financial position increased by $400 this round.`

**Rules tested:**

- Property cash-flow calculation.
- Winning-bid cash treatment.
- Property carrying-value treatment.
- Positive end-of-round summary.

**Status:** Provisional synthetic test example.

### FIN-EX-005 — Property win produces an unchanged financial position

**Inputs:**

- `starting_position = 10000`
- `cash_before_bid = 10000`
- `property_won = true`
- `winning_bid = 2500`
- `gross_rental_income = 200`
- `operating_cost = 200`

**Expected calculation:**

`net_property_result = 200 - 200 = 0`

`ending_cash = 10000 - 2500 + 0 = 7500`

`property_carrying_value = 2500`

`ending_position = 7500 + 2500 = 10000`

`round_change = 10000 - 10000 = 0`

**Expected output:**

- Ending cash is `$7,500`.
- Property carrying value is `$2,500`.
- Ending financial position is `$10,000`.
- Display: `Your financial position was unchanged this round.`

**Rules tested:**

- Zero property operating result.
- Zero-change end-of-round summary.

**Status:** Provisional synthetic test example.

### FIN-EX-006 — Property win produces a decreased financial position

**Inputs:**

- `starting_position = 10000`
- `cash_before_bid = 10000`
- `property_won = true`
- `winning_bid = 2500`
- `gross_rental_income = 100`
- `operating_cost = 300`

**Expected calculation:**

`net_property_result = 100 - 300 = -200`

`ending_cash = 10000 - 2500 - 200 = 7300`

`property_carrying_value = 2500`

`ending_position = 7300 + 2500 = 9800`

`round_change = 9800 - 10000 = -200`

**Expected output:**

- Ending cash is `$7,300`.
- Property carrying value is `$2,500`.
- Ending financial position is `$9,800`.
- Display: `Your financial position decreased by $200 this round.`

**Rules tested:**

- Negative property operating result.
- Negative-change end-of-round summary.

**Status:** Provisional synthetic test example.

### FIN-EX-007 — Losing bid leaves cash unchanged

**Inputs:**

- `cash_before_bid = 7000`
- `player_bid = 2000`
- `opponent_bid = 2500`

**Expected calculation:**

`player_bid < opponent_bid`

`property_won = false`

`bid_amount_deducted = 0`

`net_property_result = 0`

`cash_after_property = 7000 - 0 + 0 = 7000`

**Expected output:**

- The player does not win the property.
- No bid amount is deducted.
- No property income or operating cost is applied.
- Cash after the property bid is `$7,000`.

**Rule tested:**

A losing bid does not reduce the player's cash balance.

**Known limitation:**

The example uses synthetic amounts and does not establish the actual demo opponent bid or property price.

**Status:** Provisional synthetic test example.

### FIN-EX-008 — Tied bid is awarded to the scripted opponent

**Inputs:**

- `cash_before_bid = 7000`
- `player_bid = 2500`
- `opponent_bid = 2500`

**Expected calculation:**

`player_bid = opponent_bid`

`property_won = false`

`bid_amount_deducted = 0`

`net_property_result = 0`

`cash_after_property = 7000 - 0 + 0 = 7000`

**Expected output:**

- The scripted opponent wins the tied bid.
- The player does not acquire the property.
- No bid amount is deducted.
- No property income or operating cost is applied.
- Cash after the property bid is `$7,000`.

**Rule tested:**

When the player's bid equals the scripted opponent bid, the scripted opponent wins and the player's cash remains unchanged.

**Known limitation:**

This is a deterministic project choice and is not presented as a universal auction rule.

**Status:** Provisional synthetic test example.

### FIN-EX-009 — Half-cent results round away from zero

**Inputs — positive result:**

- `sector_allocation = 100.10`
- `sector_return_rate = 5%`

**Expected calculation:**

`unrounded_sector_change = 100.10 × 0.05 = 5.005`

`rounded_sector_change = 5.01`

`settled_sector_value = 100.10 + 5.01 = 105.11`

**Expected output — positive result:**

- The sector change is displayed and stored as a `$5.01` gain.
- The settled sector value is `$105.11`.

**Inputs — negative result:**

- `sector_allocation = 100.10`
- `sector_return_rate = -5%`

**Expected calculation:**

`unrounded_sector_change = 100.10 × -0.05 = -5.005`

`rounded_sector_change = -5.01`

`settled_sector_value = 100.10 - 5.01 = 95.09`

**Expected output — negative result:**

- The sector change is displayed and stored as a `$5.01` loss.
- The settled sector value is `$95.09`.

**Rule tested:**

A calculated amount exactly halfway between two cents is rounded away from zero before it is used in later totals.

**Known limitation:**

The inputs are synthetic and do not establish an approved sector return rate or demo allocation.

**Status:** Provisional synthetic test example.
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

### FIN-DEC-CAND-005 — Allocation-weighted sector settlement

**Proposed decision:**  
For the one-round demo, calculate each sector's dollar change by multiplying the confirmed allocation by that sector's scripted return rate.

The engine then sums the four sector changes and adds the result to starting cash. Unallocated cash changes by `0%`.

**Why this is being proposed:**  
The method makes the effect of each investment visible, produces deterministic results and allows Screen 4 to display both per-sector and total outcomes.

**Evidence status:**  
FIN-SRC-009 supports aggregating portfolio returns according to the weights of the individual holdings. FIN-SRC-010 supports relating an investment's change in value to the amount invested and its percentage return.

Neither source supplies the game's exact sector rates, scripted signal mapping, return ranges or rounding rule.

**Status:**  
Provisional — awaiting Hanyu's review or explicit team approval.

**Decision Log status:**  
Not yet recorded in `docs/DECISIONS.md`.

### FIN-DEC-CAND-006 — Losing-bid cash treatment

**Proposed decision:**  
A player who loses the property auction keeps the full bid amount. No cash is deducted, no property is acquired and no property income or operating cost is applied.

**Why this is being proposed:**  
This follows the standard first-price sealed-bid winner-payment structure, avoids introducing an unsupported penalty or deposit and produces a simple deterministic result for the one-round demo.

**Evidence status:**  
FIN-SRC-011 and FIN-SRC-012 support the standard relationship that the highest bidder wins and pays their own bid.

The sources do not approve Market Empire's opponent bid, tied-bid rule, property values or the absence of every possible auction fee. The no-fee and no-deposit treatment remains a project simplification.

**Status:**  
Provisional — awaiting Hanyu's review or explicit team approval.

**Decision Log status:**  
Not yet recorded in `docs/DECISIONS.md`.

### FIN-DEC-CAND-007 — Tied-bid resolution

**Proposed decision:**  
When the player's bid equals the scripted opponent bid, the scripted opponent wins. The player keeps the full bid amount, does not acquire the property and receives no property income or operating cost.

**Why this is being proposed:**  
A fixed tied-bid outcome keeps the one-round demo deterministic and testable without adding randomness or another tie-breaking step.

**Evidence status:**  
FIN-SRC-011 and FIN-SRC-012 support the standard relationship that the highest bidder wins and pays their own bid.

They do not define how equal bids must be resolved. The proposed tied-bid treatment is therefore a project choice, not a verified financial relationship.

**Status:**  
Provisional — awaiting Hanyu's review or explicit team approval.

**Decision Log status:**  
Not yet recorded in `docs/DECISIONS.md`.

### FIN-DEC-CAND-008 — Cent-level monetary rounding

**Proposed decision:**  
For the one-round demo, round each calculated sector dollar change to the nearest cent before using it in settled values or totals.

An amount exactly halfway between two cents is rounded away from zero. All later cash and financial-position calculations use the already-rounded component amounts.

**Why this is being proposed:**  
The rule produces deterministic cent-level results and prevents displayed sector amounts from disagreeing with the displayed total.

**Evidence status:**  
This is an implementation and game-calculation convention rather than a claim established by the financial sources currently recorded in this ledger.

No source is being used to present it as a universal accounting or financial-market rule.

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
- Known-answer examples are currently partial; sector-result and complete end-to-end examples remain unresolved.
- The deterministic sector-settlement relationship is documented, but it remains Provisional pending review.
- None of the resulting relationships will be treated as balance-validated.
- The known-answer numbers in FIN-EX-001 through FIN-EX-009 are synthetic test inputs, not approved demo constants.
- The losing-bid treatment assumes that the demo has no auction-entry fee, deposit or losing-bid penalty.
- The cent-level rounding rule remains Provisional pending review or explicit team approval.
- No sector rates, permitted return ranges or scripted signal-to-sector mapping have been approved.
- The current settlement relationship omits transaction fees, taxes, inflation and separate sector income.
- A complete end-to-end known-answer example remains blocked until the sector rates, scripted signal-to-sector mapping and actual demo constants are approved.
