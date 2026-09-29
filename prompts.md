# PROMPTS.md - Daily Sales Dashboard 

**Student:** Zhang Chenxi · **Course:** MGMT 6110 · **Problem Set 1**

**User sentence:** A property sales manager opens this screen to review daily closing sales results for their condominium sales team, and knows it worked when they see accurate end‑of‑day performance figures on mobile.

**Live link:** https://mgmt6110-week02-build-my-product.vercel.app/

---

## Prompt 1 - the master prompt

ROLE: You are a senior front-end developer building a React web app.

GOAL: Build the front end of DailySalesDashboard, a web product for a property sales manager who runs the sales team of a single condominium development in Singapore. The team has 10 salespeople. The manager checks sales data on their phone throughout the day, but the most important check is at 8pm after the daily sales closing, when they confirm the day's final results. Reviewing monthly performance is part of their routine, but this product focuses on the daily dashboard only — no monthly pages.
Their job on this product is to quickly grasp the day's sales situation: how many units were sold today, who the top performer is, where their development ranks among all developments in the company, and how far they are from the monthly target.
Screens:
 1) Daily Sales Dashboard — a single page divided into three sections (top, middle, bottom):
  [TOP SECTION — Daily Transaction Details]
  Shows the development name and a list of every transaction closed today. Each row contains:
  - Unit number (format: #block-floor-unit, e.g. #3-12-1203)
  - Salesperson name
  - Transaction time (time of day, e.g. 14:32)
  - Area (sqft, square feet)
  - Unit price (S$ psf, Singapore dollars per square foot)
  - Total price (S$, displayed as e.g. S$1,250,000)
  The transaction list is sorted by total price from highest to lowest by default.
  Below the list, show the daily totals: total units sold today (units) and total sales amount today (S$, displayed as e.g. S$8,500,000).
  [MIDDLE SECTION — Salesperson Daily Ranking]
  A ranking of salespeople based on their aggregated daily performance. Each row shows:
  - Rank (1, 2, 3...)
  - Salesperson name
  - Number of units sold today
  - Total sales amount today (S$, displayed as e.g. S$2,400,000)
  The #1 ranked salesperson (sales champion, highest total amount) is highlighted with a gold background or champion icon.
  Salespeople with zero transactions today also appear in the list, showing 0 units and S$0, ranked at the bottom.
  The user can tap column headers to toggle sorting (by amount / by units), and can filter by salesperson name to view a specific person's transactions.
  [BOTTOM SECTION — Development Group Ranking & Monthly Progress]
  Shows the daily sales ranking of this development among 6 fictional developments in the company, sorted by daily sales amount from highest to lowest. Each row shows:
  - Rank
  - Development name (fictional Singapore-style English names)
  - Daily sales amount (S$, displayed as e.g. S$8,500,000)
  - Monthly target progress bar (showing monthly completed amount / monthly target amount, e.g. S$32,000,000 / S$50,000,000, with the progress bar filled by percentage)
  The row for the manager's own development is highlighted so they can find their position at a glance.
  The progress bar lets the manager see how much more they need to reach the monthly target.
  Overall success criteria: all three sections' core information is readable on a phone screen without horizontal scrolling; data is consistent across all three sections and totals are correct (sum of transaction amounts = sum of each salesperson's amount = the development's daily amount); the sales champion row and the manager's own development row have clear visual highlighting.
 2) none
 3) none
    
OUTPUT: A running app. Keep every invented value in ONE data file of its own. The data file contains two datasets:
(a) at least 8 rows of daily transaction records (some salespeople have multiple sales, some have zero; zero-sale sellers still appear in the ranking section), with realistic Singaporean names (a mix of Chinese, Malay, and Indian names common in Singapore), plausible Singapore condo prices (units in sqft, prices in S$ psf ranging from S$1,800 to S$3,500 psf, total prices ranging from S$1.2M to S$4M per unit), and timestamps spread across a business day between 9am and 8pm;
(b) 6 fictional property developments for the group ranking section, each with a Singapore-style English name, daily sales amount in S$, monthly target in S$, and monthly completed amount in S$.
One component per screen section. Move between screens without reloading the page. Readable on a phone at arm's length. When you are done, list the files you created and what each one holds.

GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API or any other model. Do NOT call any outside service or fetch from any URL. No database, no login, no user accounts, no analytics. No features I did not list. No real company's name, logo, or trademark. Invented names and numbers only, nothing confidential.
CONTEXT: Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU. Built in Google AI Studio, shared as a link, and opened on a phone by classmates in Week 3. I am not a programmer: when you make a choice I did not specify, say so in one line rather than burying it.

**What came back:** A functional dashboard prototype was generated. It generally matched the core requirements for the property sales manager use‑case.

**What I changed next and why:** Applied visual updates, including compact table layout and unified color palette, to enhance readability for mobile users. 

---

## Prompt 2：Visual changes
I have two visual changes. Apply both, change nothing else.

MIDDLE SECTION (Salesperson Ranking): Currently it is a long card list. Change it to a COMPACT TABLE format so all 10 salespeople fit in less vertical space. Each row shows: rank number, name, units sold, total amount. Keep the #1 champion row highlighted in gold. Keep the column header tap-to-sort functionality (by amount / by units). Keep the filter-by-name functionality. Make it readable on a phone.

COLOR SYSTEM: The current palette is inconsistent (slate, emerald, amber, blue all competing). Redesign with a unified luxury real-estate color scheme:

Primary: deep navy blue (#1B2A4A) for headers, key cards, and the "your development" highlight

Accent: warm gold (#C9A961) for the sales champion highlight, top deal badge, and progress bar fill

Neutrals: white backgrounds, light gray (#F5F5F5) for alternating rows, dark gray (#333) for text

Remove the emerald green and bright blue accents entirely. The "8pm Confirmed" badge can use navy instead of green.

The monthly progress bars use gold fill on light gray track.

Keep all data, logic, interactions, and the three-section structure exactly the same. Only the visual styling changes.
Also fix: the "75.4% monthly target" in the top KPI card is hardcoded. Calculate it dynamically from the current development's monthly completed amount divided by monthly target.

**What came back:** Partial visual updates took effect. The monthly‑target percentage value remained hard‑coded, and several color‑scheme adjustments were not fully applied.

**What I changed next and why:** Re‑issued the visual‑update prompt to enforce full execution of color palette replacement and dynamic calculation for monthly‑target progress.

---

## Prompt 3：Revise UI layout
Apply the following changes. Change nothing else.

CHANGE 1 — Top transaction list becomes a compact table:
The "Daily Transaction Details" list is currently card-style. Convert it to a compact data table with 5 columns: Unit | Salesperson | Area (sqft) | $psf | Amount (right-aligned, bold). One row per transaction, minimal vertical padding, small but readable font (11-12px), no horizontal scrolling on phone. The Top Deal row keeps a gold left border or small gold badge. Table header has navy text. Alternating row colors (white / light gray). Keep the total summary row at the bottom. Remove the transaction timestamp to save space.

CHANGE 2 — Salesperson monthly detail on name tap (inline expand):

Currently tapping a salesperson name filters the top transaction list. Keep that filter behavior. ADD the following:

When a salesperson is selected/filtered:

The page scrolls to the top transaction section (existing behavior, keep it)

Below the section title "Daily Transaction Details" and above the table, an expandable detail card automatically opens for that salesperson

The detail card shows:

Salesperson name as header

Today: units sold, total amount

This month: month-to-date units, month-to-date total amount, monthly rank among the 10 salespeople (by amount)

Monthly target progress bar (completed / target, with percentage)

The detail card has a collapse/expand toggle so the manager can hide it if they only want to see transactions

When filter is cleared (tap "Show All" or clear filter), the detail card closes

Add these fields to each salesperson in the data file (all invented, realistic values): monthlyUnitsSold, monthlyTotalAmount, monthlyRank, monthlyTarget.

The detail card uses the same navy + gold color scheme. Navy background for the card header, gold for the progress bar fill.

Do NOT add a modal/bottom sheet. This is an inline expandable card within the top transaction section. Do NOT change the middle ranking table, bottom group ranking, or KPI summary cards. Only change the top transaction section as described.

**What came back:** Compact tables rendered, yet the top‑deal badge got overlapped / cut off by surrounding UI elements. The "Area" column lacked clear definition in requirements.

**What I changed next and why:** Add fixes for overlapping top‑deal badge, and add explicit definition for the Area column to remove requirement ambiguity.

---

## Prompt 4：Adjust table style
Two small fixes to the top transaction table only. Change nothing else.

Column header: change "AREA" to "AREA (sqft)" so the unit is clear.

Top Deal indicator is currently overlapping with the unit number and getting cut off. Remove the "Top Deal" text badge from the unit column. Instead, indicate the top deal (most expensive transaction) with:

A gold left border on that entire row (3-4px wide, same gold #C9A961 used elsewhere in the app)

A small crown icon (👑 or a lucide Crown icon) immediately before the amount value in the AMOUNT column for that row only

This way the top deal is visually clear without taking extra horizontal space or overlapping text.

Keep everything else the same: the 5-column table structure, alternating row colors, navy header, totals row, filter behavior, and all other sections.

---

# prompt.md - HDB Resale Market Dashboard 

**Student:** Zhang Chenxi · **Course:** MGMT 6110 · **Problem Set 2**

**Live link:** https://mgmt6110-week02-build-my-product.vercel.app/

---

## Prompt 1 -First attempt at the API function

ROLE: Modify ONLY the data filtering & display logic in this existing React + Vercel serverless project. Keep all existing UI styling, color palette, table layout, town ranking UI, health api, hdb api, mobile responsive design UNCHANGED, unless explicitly instructed below.
BACKGROUND:
The public HDB resale dataset from data.gov.sg is released MONTHLY and does NOT contain real daily API data. We will simulate a single day's transaction view by filtering the full monthly dataset to ONE SINGLE DAY of records, to meet the manager’s requirement to review daily closing sales.
APPLY THESE CHANGES ONLY:
CHANGE 1 — Backend api/hdb.js adjustment:
Keep the existing logic to fetch the latest month's full dataset.
Add an optional query parameter day= to the api/hdb.js endpoint.
When day parameter exists, filter the full monthly records and return ONLY transactions matching that simulated day slice.
If day param is omitted, default to use a fixed simulated day subset from within that month.
Keep all existing numeric conversion, SQM to SQFT calculation, psf calculation, cache header unchanged.
CHANGE 2 — Frontend top transaction table section:
The table currently loads all transactions of the entire month, which creates an overly long table.
Change it: only render the single simulated day’s HDB resale transactions, NOT the whole month.
Keep all existing table rules: compact table layout, columns Town | Flat Type | Block-Street | Area(sqm) | S
.
Keep gold left border + crown 👑 icon for highest-price transaction of THIS DAY only.
Keep the total summary row at table bottom, calculated only for this day’s records.
Update the section title from "Official HDB Resale Data (YYYY-MM)" → "Official HDB Resale Daily Data (simulated single day within YYYY-MM)".
Keep loading/empty/error text states unchanged.
CHANGE 3 — Bottom Town Ranking section:
Currently it ranks towns by total monthly transaction volume.
Revise ranking calculation: compute metrics ONLY from this same simulated single day subset, NOT the whole month.
Show ranking of towns based on that day’s total sales amount.
Limit the ranking list to show only TOP 10 towns of that day.
Keep navy highlight for top-ranked town, existing table styling unchanged.
CHANGE 4 — Data consistency rule (CRITICAL):
All numbers across the dashboard must be computed from the SAME single day subset:
Transaction table total sum
KPI cards metrics
Town ranking amounts
All must match, all derived only from the simulated day records, not full month.
GUARDRAILS:
Do NOT change the api/health.js file.
Do NOT modify color scheme, font, table compact layout, mobile layout.
Do NOT remove any error/loading states.
Do NOT rewrite existing components unless required for this filter logic.
No new npm packages. No extra UI features.
If you make any assumption not specified, state it in one line.
CONTEXT:
Google AI Studio preview cannot run Vercel serverless api. Final test on deployed Vercel live site.
List all modified files after generating the updates.

**Came back with:** The HDB resale API is a public, unauthenticated open data endpoint. No API key or credential is required, so the environment variable key configuration steps are not applicable to this project. So after checking the output of the prompt, I found that everything in the API folder is normal. However, after observing the logic of the page adjustment, it seems that the logic is not correct because the data was forcibly added on the basis of Set1.

**Action:** Decide to make another front-end interface correction prompt

---

## Prompt 2 - Data logic correction and UI visual optimization

Only update the 3 UI text labels marked in screenshot, to make wording consistent. Keep all code, data, styling, API unchanged.
1. Top right badge: change "Month: 2026-09" → "Simulated Day within 2026-09"
2. Inside KPI card area: change "2026-09" badge → "Simulated Daily Closing"
3. Table header text: change "day within 2026-09" → "Simulated Daily Closing | Source: HDB 2026-09 Monthly Dataset" Also fix the small description line below HDB Resale Transaction Details: Current: Live Singapore public housing daily resale records for branch estate advisory. Replace with: Simulated daily subset extracted from official HDB monthly resale dataset, for branch estate advisory.
Rule: Do NOT touch api files, filtering logic, table data, colours, layout, KPI numbers, town ranking. Only edit these text strings for consistency.

**Came back with:** I found that if you want to really help users improve their work efficiency and help them formulate marketing strategies. I need to really make this dashboard have some calculated results, so I decided to add data on the regional performance of real estate in Singapore;

**Action:** Increase the content of the regional sales results section

---

## Prompt 3 - Debugging 1

ROLE: Product-focused frontend + backend revision for existing HDB resale dashboard. Keep all existing navy/gold styling, responsive layout, error states, api folder structure, and /api/health endpoint UNCHANGED. Only modify the parts specified below.
BACKGROUND: The HDB resale dataset from data.gov.sg is officially published monthly, not daily. The previous simulated daily view was a product compromise. We are now revising the dashboard to a monthly market intelligence view for multi-branch property agency marketing managers. This is more truthful to the actual data source and more useful for real-world branch decision-making.
CORE CHANGES:
1. BACKEND: api/hdb.js
* Remove the simulated daily subset logic entirely. Return the FULL latest month of HDB resale records.
* Keep all existing numeric conversion, psf calculation, error handling, and town ranking logic.
* Keep the optional town query parameter.
* The endpoint must still return: full records list, town ranking, total units, total value, average psf, latest month.
1. TOP KPI OVERVIEW SECTION
* Rename all "Daily" labels to "Monthly".
* KPI cards:
    * Monthly Total Sold Units
    * Monthly Transaction Value
    * Average Price PSF (monthly volume-weighted)
    * Top Monthly Sales Town
* Add a NEW row of 3 regional summary cards below the main KPIs, for Singapore's 3 official property regions:
    * CCR (Core Central Region)
    * RCR (Rest of Central Region)
    * OCR (Outside Central Region)
* Each regional card shows: total units sold, total transaction value, average psf for that region.
* Use the standard HDB town-to-region mapping below to aggregate records by region: CCR: BUKIT TIMAH, MARINE PARADE, BISHAN, TOA PAYOH, KALLANG/WHAMPOA, QUEENSTOWN, GEYLANG, CLEMENTI, SERANGOON, NOVENA RCR: ANG MO KIO, BEDOK, BUKIT BATOK, BUKIT MERAH, BUKIT PANJANG, CHOA CHU KANG, HOUGANG, JURONG EAST, JURONG WEST, PASIR RIS, PUNGGOL, SENGKANG, TAMPINES, WOODLANDS, YISHUN OCR: SEMBAWANG, SENGKANG, PUNGGOL, TAMPINES, WOODLANDS, YISHUN, BUKIT BATOK, CHOA CHU KANG, JURONG WEST, LIM CHU KANG, MANDRAI, TENGAH
* If a town is not in the list, classify as OCR.
* Keep all existing styling for cards.
1. TRANSACTION TABLE SECTION
* Rename section title from "HDB Resale Transaction Details" → "Top HDB Resale Transactions"
* Remove all references to "simulated single day" and "daily closing" in this section.
* Subtitle: "Official HDB monthly resale records, sorted by total price. Source: data.gov.sg"
* By default, show only the TOP 15 transactions sorted by total price (high to low).
* Add a "Show all transactions" button at the bottom of the table.
    * Default state: shows top 15, button says "Show all transactions"
    * On click: expands to show the full monthly dataset, button text changes to "Show top 15 only"
    * Click again: collapses back to top 15
* Keep all existing table columns, crown icon for highest price, and total summary row.
* The summary row numbers must always match the currently visible dataset (top 15 or full month).
1. TOWN RANKING SECTION
* Remove the "Bottom Section" label entirely.
* Remove the phrase "simulated single day" and "guide branch manpower deployment".
* Section title: "Town-Level Resale Volume Ranking"
* Subtitle: "Ranked by total monthly sales amount. Data: HDB 2026-09 monthly dataset."
* Keep the top 10 towns ranking, existing styling, navy highlight for #1 town.
* Ranking metrics: total units, total value, average psf per town.
1. HEADER & PAGE WIDE TEXT
* Top right badge: change "Simulated Day within 2026-09" → "Month: 2026-09"
* Page subtitle: "Multi-Branch Property Agency Market Intelligence"
* Remove all mentions of "simulated", "daily closing", "manpower deployment" across the entire page.
* Keep the data source attribution clear and visible.
1. CONSISTENCY RULES
* All numbers across KPIs, regional cards, table, and ranking must be calculated from the same full monthly dataset.
* All error / loading / empty / unreachable states remain; update their text to match monthly wording.
* Do NOT break mobile responsiveness.
* Do NOT add new npm packages.
* Do NOT modify /api/health.js.
GUARDRAILS:
* Do not rewrite the whole project. Only modify the parts required for this monthly view and regional aggregation.
* Keep all existing error handling in api/hdb.js.
* Keep the same visual design language, spacing, and color palette.
List all modified files after generating the changes.

---

## Prompt 4 - Debugging 2

ROLE: Incremental UI revision for existing monthly HDB resale dashboard. Keep ALL existing logic, data, styling, color palette, error states, API endpoints, 15-row table toggle, and responsive behavior UNCHANGED. Only fix the 3 issues below.
CHANGES TO MAKE:
1. Regional Market Performance section — vertical stack + expandable cards
* Change the 3 regional cards from horizontal 3-column layout to vertical stacked layout (top to bottom: CCR, RCR, OCR). Each card takes full width. This fixes text truncation and works better on mobile.
* Make each regional card clickable to expand/collapse.
    * Default state: collapsed, shows only region code, full region name, total units, total value, average psf.
    * Expanded state: reveals the top 5 towns within that region, each with units sold, total value, and average psf, ranked by total sales amount.
    * Clicking a card toggles its own expanded state.
* Keep the existing CCR / RCR / OCR town mapping and aggregated numbers exactly as they are.
* Card styling remains consistent with the existing navy/gold design system.
1. Transaction table — restore standard HDB columns, remove region column
* Remove the region/area column from the transaction table entirely. Regional analysis only lives in the Regional Market Performance section above.
* Restore the table columns in this exact order:
    1. Town
    2. Flat Type
    3. Block-Street
    4. Area(sqm)
    5. S$ PSF
    6. Total S$
* Keep the default top 15 rows + "Show all transactions" toggle.
* Keep the crown icon for the highest-priced transaction, and the total summary row.
* Keep sorting by total price high → low.
1. Town Ranking section — keep town-level top 10 ranking
* The ranking remains town-level ranking only, not regional ranking.
* Show only the Top 10 towns, ranked by total monthly sales amount.
* Keep the existing columns: town name, units sold, total transaction value, average psf.
* Keep the navy highlight card for the #1 town and the existing list styling.
* Section title remains "Town-Level Resale Volume Ranking".
GUARDRAILS:
* Do NOT modify api/hdb.js or api/health.js. All changes are frontend only.
* Do NOT change the monthly dataset, total numbers, or town-to-region mapping.
* Do NOT break mobile responsiveness.
* Do NOT add new packages.
* Keep all existing loading / empty / error state texts.
List all modified files after generating the changes.

**Came back with:** A dashboard that can clearly display the total number of sales, total sales amount, total sales price, average house price, and sales situation of each region in a month, and this dashboard can also view the specific sales situation of each region.


P## Problem Set 4

### Blind arbiter exchanges

Both exchanges were run in new temporary chats with memory off, outside the project, so the agent could not see the repository or the conversation in which the product was built. A coin toss decided which finding was Reviewer A. Note: the temporary chats could not be reopened afterwards, so the answers below were transcribed from screenshots taken at the time; tables are reproduced as they appeared.

### Blind arbiter 1: data freshness (fourth row)

**Prompt:**

```
ROLE: You are a neutral arbiter between two usability reviewers who rated the same problem differently. You do not know which of them built the product. Do not try to work it out.

CONTEXT: The product is an AI-augmented web app. It is for managers at a multi-branch property agency, and it turns the monthly data.gov.sg HDB resale dataset into a one-screen market overview by region and town, so they can see which areas are selling without reading the raw official records.
Both reviewers inspected it against Nielsen's ten usability heuristics and rated the problem on this severity scale:
0 I don't agree that this is a usability problem at all.
1 Cosmetic problem only. Need not be fixed unless extra time is available.
2 Minor usability problem. Fixing this should be given low priority.
3 Major usability problem. Important to fix, so should be given high priority.
4 Usability catastrophe. Imperative to fix before the product can be released.
A rating rests on four factors: how often the problem happens, what it costs when it does, whether the person can learn around it, and whether it damages the product's standing out of proportion.

REVIEWER A:
- Where: Main page, at the top, under the month box.
- What they did, what they saw: I scrolled through the whole page looking for when the sales data was last updated. The page shows "Month: 2026-09" but no "Last updated" date or time anywhere, so I could not tell whether I was looking at today's figures or older ones. For a daily property-sales dashboard, users need to know this straight away.
- Which heuristic: 1, Visibility of System Status.
- Screen or system: Both. The screen needs to show the last refresh time under the month, and the system needs to record when the data was last successfully updated so the screen can show it.
- Severity, and why: 3. Timeliness matters for a sales dashboard. Without a visible update time, users cannot judge whether the transactions and totals are current, which lowers confidence in the product's core job, although they can still use it.
- The repair: The page shows "Last updated: [date and time]" prominently, and says whether the data is current, still loading or unavailable.

REVIEWER B:
- Where: Main page, at the source note near the top ("Month: 2026-09, Source: data.gov.sg") and the open-data notice in the footer.
- What they did, what they saw: I looked for how fresh the data is. The page shows the month (2026-09) and the source (data.gov.sg, with the Singapore Open Data Licence in the footer), but it never says how often the data is updated or on which day of the month a new set appears.
- Which heuristic: 10, Help and Documentation.
- Screen or system: Screen. The update schedule is known to whoever runs the data pipeline. The page only needs to state it next to the source.
- Severity, and why: 1. The month label already gives a rough sense of how fresh the data is, so the cost is small, but people making decisions cannot tell whether this month's update has happened yet.
- The repair: The source note says how often and when the data is updated, so people know when to expect new figures.

EVIDENCE NEITHER REVIEWER CONTROLS:
- Reviewers who raised this problem independently, counting A and B: 2 out of 4
- Severities that reviewers other than A and B gave this problem: NONE

GOAL: Judge the evidence, not the reviewers.
1. Say whether A and B describe the same problem. If they do not, say so and stop.
2. For each of the four factors, say what the evidence shows and what it cannot show.
3. Give the severity the evidence supports, and name the factor that decided it.
4. Name the one observation that would change your rating, and say how it could be collected quickly.

GUARDRAILS: Do not split the difference between A and B unless the evidence puts the rating there. If the evidence is too thin to decide, say so plainly instead of inventing a reason. Do not ask which reviewer built the product.
```
**Arbiter's answer:**

**1. Do A and B describe the same problem?**

Yes. Both describe the same underlying usability problem: **the interface does not give users enough information to judge the freshness of the displayed HDB resale data**.

They emphasize different missing signals-A wants the **actual last successful refresh time/status**, while B wants the **expected update schedule**-and they assign different Nielsen heuristics. Those are different diagnoses/repairs of the same user uncertainty, not separate problems.

**2. What the evidence shows for each severity factor**

| Factor | What the evidence shows | What it cannot show |
|---|---|---|
| Frequency | 2 of 4 reviewers independently noticed the freshness problem. The missing information appears to be persistent on the main page rather than an intermittent state. | Reviewer detection is not user incidence. We do not know how often actual managers need to establish freshness, or how often uncertainty affects a real task. |
| Cost when it happens | Both reviewers agree that a user cannot determine freshness precisely. A says this affects confidence in whether transactions/totals are current; B says the month provides at least a rough freshness cue. | There is no observed evidence of a wrong decision, delayed task, abandoned task, incorrect report, or other material consequence. Calling the dashboard "daily" comes only from A and is not established by the supplied product context. |
| Learnability / ability to work around it | The month and source are visible, so users have partial context. A searched the entire page and still could not obtain the missing freshness information from the interface. | We do not know whether managers already understand data.gov.sg's publication cycle, can infer freshness reliably, or routinely verify it elsewhere. No repeated-use evidence is supplied. |
| Disproportionate reputational damage | A reports reduced confidence in the product's core job. Independent detection by 2/4 reviewers suggests the omission is noticeable. | There is no user evidence showing loss of trust in the product, complaints, abandonment, or reputational harm disproportionate to the immediate task cost. |

**3. Severity supported by the evidence**

**Severity 2 - Minor usability problem; low-priority fix.**

The deciding factor is **cost when the problem occurs**. The evidence establishes a genuine information gap, but it does not establish the substantial task consequence needed to support A's severity 3. At the same time, this is more than purely cosmetic: users seeking freshness information cannot obtain it, and two independent reviewers detected that gap.

This is therefore not an arithmetic compromise between 3 and 1. On the supplied evidence, **2 is supported because the problem affects users' ability to interpret the data, while evidence of major consequences is absent**.

**4. The one observation that would change the rating**

The most consequential observation would be: **a representative manager makes or is about to make a materially different business decision because they incorrectly believe the displayed month's figures are current.**

That would directly supply the missing evidence about **cost**, and would support reconsidering the problem as severity 3.

It can be collected quickly with a short task-based usability test: give several representative managers the dashboard at a point when the underlying dataset's freshness is deliberately known, ask them to use it for a realistic branch/market decision, and observe whether they correctly determine how current the figures are **without prompting them about freshness**. Record both their conclusion about freshness and whether it changes the decision they make.

### Blind arbiter 2: summary KPIs (second row)

Coin toss: heads, so my reading is Reviewer A and the groupmate's finding is Reviewer B.
Ratings before the arbiter: mine (tempted) 0, groupmates 3 and 2. Arbiter: 0, conditional.

**Prompt:**

```
ROLE: You are a neutral arbiter between two usability reviewers who rated the same problem differently. You do not know which of them built the product. Do not try to work it out.

CONTEXT: The product is an AI-augmented web app. It is for managers at a multi-branch property agency, and it turns the monthly data.gov.sg HDB resale dataset into a one-screen market overview by region and town, so they can see which areas are selling without reading the raw official records.
Both reviewers inspected it against Nielsen's ten usability heuristics and rated the problem on this severity scale:
0 I don't agree that this is a usability problem at all.
1 Cosmetic problem only. Need not be fixed unless extra time is available.
2 Minor usability problem. Fixing this should be given low priority.
3 Major usability problem. Important to fix, so should be given high priority.
4 Usability catastrophe. Imperative to fix before the product can be released.
A rating rests on four factors: how often the problem happens, what it costs when it does, whether the person can learn around it, and whether it damages the product's standing out of proportion.

REVIEWER A:
- Where: Main page, at the top, directly under the header.
- What they did, what they saw: I opened the page and looked at the top section. Right under the header there are four summary cards: Monthly Total Sold Units (1,894 units), Monthly Transaction Value (S$1.29B), Average Price PSF (S$644 psf) and Top Monthly Sales Town (TAMPINES, 162 units). Below them are three region cards (OCR, RCR, CCR), each with units sold, total value and average psf.
- Which heuristic: 6, Recognition Rather Than Recall.
- Screen or system: Screen. The figures are already calculated and shown on the page.
- Severity, and why: 0. The summary figures asked for are already at the top of the page, so users do not have to work out the overall market from the detailed tables.
- The repair: No change is needed, because the page already opens with a summary of the month's market.

REVIEWER B:
- Where: Main page, missing summary KPIs at the top of the page.
- What they did, what they saw: I looked for summary KPIs for the resale data and found none. I had to understand the market by mentally combining the results from several charts, when I should have been able to see it at a glance.
- Which heuristic: 6, Recognition Rather Than Recall.
- Screen or system: Screen. The resale data is already on the page but the key figures are not summarised prominently.
- Severity, and why: 3. Users must examine several charts and combine the information in their heads to understand the overall market, which takes effort and slows down the dashboard's main job of giving a quick overview.
- The repair: The top of the page shows summary cards for total transactions, median sale price, median psf, the highest transaction and the most active district.

EVIDENCE NEITHER REVIEWER CONTROLS:
- Reviewers who raised this problem independently: 2 out of 3 groupmates who reviewed the product
- Severities that reviewers other than A and B gave this problem: 2

GOAL: Judge the evidence, not the reviewers.
1. Say whether A and B describe the same problem. If they do not, say so and stop.
2. For each of the four factors, say what the evidence shows and what it cannot show.
3. Give the severity the evidence supports, and name the factor that decided it.
4. Name the one observation that would change your rating, and say how it could be collected quickly.

GUARDRAILS: Do not split the difference between A and B unless the evidence puts the rating there. If the evidence is too thin to decide, say so plainly instead of inventing a reason. Do not ask which reviewer built the product.
```

**Arbiter's answer:**

**1. Same problem?**

Yes. A and B are describing the same underlying usability question under **Heuristic 6: Recognition Rather Than Recall**: whether the main page provides prominent summary KPIs so managers can understand the monthly resale market without mentally combining lower-level information.

The disagreement is primarily factual. A reports that summary cards are already present at the top; B reports that they are absent.

**2. Four severity factors**

| Factor | What the evidence shows | What it cannot show |
|---|---|---|
| Frequency | The issue was independently raised by **2 of 3 groupmates**, so the concern was not unique to B. | This does not establish how often actual managers encounter the problem during normal use. More importantly, it does not resolve whether those reviewers saw the same product state/version. |
| Impact / cost | If the KPIs really are absent, users would need to synthesize several charts, adding effort to a dashboard whose purpose is rapid overview. If A's observation is accurate, that cost largely disappears because overall figures are directly visible. | There is no task-time, error-rate, or user-testing evidence showing how much extra effort the alleged problem actually causes. |
| Persistence / learnability | If the cards are absent, users could probably learn where relevant information appears in the charts, but they would still have to perform some synthesis repeatedly. If the cards shown by A are present, there is essentially nothing to learn around for this particular issue. | The evidence does not show whether users become substantially faster with repeated use or continue struggling. |
| Disproportionate reputational effect | Nothing supplied demonstrates unusually severe damage to trust or perceived product quality. | We cannot infer such damage merely because the dashboard's overview could be slower to interpret. |

**3. Severity supported: 0, conditional on the described current screen being the product being rated.**

The **deciding factor is impact/cost**. A provides concrete screen-level evidence: four top-level summary cards with specific displayed values, followed by three regional cards. That directly contradicts the factual premise underlying B's severity-3 rating-that users must combine several charts because no summary KPIs exist.

The independent evidence that 2 of 3 groupmates raised the issue, including another severity of **2**, increases confidence that there may have been a discoverability problem or a different product state. It does **not**, by itself, establish that the summary is absent. Severity should follow the observed interface condition rather than reviewer voting.

There is also a small mismatch between **what exists** and B's proposed repair: B asks for somewhat different metrics (median price, median psf, highest transaction, most active district), whereas A observes total units, total value, average psf and top sales town. That could support a *different* problem about whether the **right KPIs** are shown, but the supplied evidence does not establish that problem.

**4. The one observation that would change the rating**

The decisive observation is: **When a manager opens the same current version of the main page in its normal initial state, are the summary KPI cards immediately visible and recognizable as the market overview?**

This can be collected quickly with a **fresh-load observation**: give one or two people the current production URL, ask them to open it without guidance and say where they would look for the month's overall market figures, while recording the screen. If the reported cards are present and immediately found, **0 remains supported** for the specific "missing summary KPIs" problem. If the cards are genuinely absent, hidden in the normal initial state, or consistently not recognized as the summary, the factual basis changes and severity should be reassessed from that observation rather than from A/B's disagreement.

### Repair 1: filter by town, flat type and price
Commit: 7585c4c

**Prompt (argue against my repair):**

```
ROLE: You are a sceptical senior developer and usability reviewer working in my existing project. Before you write any code, your job is to argue against the repair I propose.

CONTEXT:
- Live address: https://mgmt6110-week02-build-my-product.vercel.app
- Who the product is for, and what it does for them: For managers at a multi-branch property agency, it turns the monthly data.gov.sg HDB resale dataset into a one-screen market overview by region and town, so they can see which areas are selling without reading the raw official records.
- The finding, in its six lines:
  - Where: Main page, the Transactions table and the Town Rankings list that filters it.
  - What they did, what they saw: Reviewers wanted to narrow the Transactions table to the part of the market they care about. The only way to filter is to click a town in the Town Rankings list, and that list shows only the top 10 towns. BISHAN appears many times in the table (273A BISHAN ST 24, 134 BISHAN ST 12) but cannot be filtered, so a user interested in Bishan has to read all 1,894 rows in price order. There is also no way to narrow by region, price range or flat type.
  - Which heuristic: 7, Flexibility and Efficiency of Use.
  - Screen or system: Screen. Every transaction is already on the page with its town, region, flat type and price, and the town filter already works for the top 10.
  - Severity, and why: 3. Narrowing to a relevant area is a core task for this dashboard, and users outside the top 10 towns get no route at all.
  - The repair: A user can narrow the Transactions table to any town in the data, not only the top 10, and sees the same "Filtered by Town: ... (N of 1894 units)" line.
- The evidence behind it: 3 of 3 groupmates raised it (severities 3, 3 and 2).
- The repair I propose: Above the Transactions table there is a town selector listing every town in the dataset, plus a region selector (OCR / RCR / CCR). Choosing one filters the table and the summary card below it, shows the existing "Filtered by Town" line, and "Show All Towns" clears it. The Top 10 ranking click still works as a shortcut.

GOAL: Argue against my repair.
1. Does it solve the problem the finding describes, or a problem I already believed I had? Say which, and why.
2. Does the problem belong to the screen or to the system, and does my repair sit in the right half?
3. Name one heuristic this repair could break while it serves the one above, and how.
4. Propose the smallest alternative that would make the same thing true.
5. Tell me exactly what to do on the live address to check that the repair worked.

OUTPUT: Your arguments first, as a numbered list. Then stop. Write no code until I reply with the repair I have chosen.

GUARDRAILS: Do not tell me the repair is good. If you have no strong reason to doubt it, say so plainly instead of inventing one. When I do ask you to build, change only what the repair needs. Do not remove Disqus or the privacy notice, and do not break /api/health.
```

**Agent's arguments:**

1. Does it solve the problem the finding describes, or a problem you already believed you had?
It solves a problem you already believed you had by bundling unrequested features. The finding specifically identified that Bishan (and other non-top-10 towns) cannot be filtered, leaving users stranded with 1,894 rows. However, your proposal adds a full Region selector (OCR / RCR / CCR) on top of the town selector. The reviewers did mention in passing that region/price/flat type filters are absent, but the core task failure and severity 3 rating were solely about town-level discoverability. Introducing multi-dimensional filtering (region vs. town interactions) before addressing universal town access over-engineers the solution.

2. Does the problem belong to the screen or to the system, and does your repair sit in the right half?
The problem belongs squarely to the screen, and your repair sits in the right half. The full dataset (1,894 records) is already fetched and resident in memory on the client side; all towns, flat types, and prices exist in the records. No backend schema, database migration, or new endpoint is required. However, placing a redundant standalone region filter duplicates the interactive Regional Market Performance cards directly above the table that already visually represent CCR, RCR, and OCR.

3. Which heuristic could this repair break while serving Heuristic 7 (Flexibility and Efficiency of Use)?
It risks breaking Heuristic 8: Aesthetic and Minimalist Design and Heuristic 4: Consistency and Standards. Adding two separate dropdown menus (Region + Town) creates state conflict and visual clutter:
- What happens when a user selects region "CCR" and town "WOODLANDS" (an OCR town)? Does the town selector filter dynamically, reset silently, or produce an empty table?
- The top section of the dashboard already has an interactive visual region breakdown and a top-10 town leaderboard. Adding an isolated filter bar above the table introduces duplicate controls for the exact same dimensions without clear visual priority.

4. The smallest alternative that makes the same thing true:
Add a single searchable/alphabetical native <select> dropdown (or compact combobox) for "All Towns (26 Towns)" directly adjacent to the table search/filter header, while leaving the existing town ranking and regional cards intact.
- Selecting any town from this single dropdown updates the existing selectedTown state.
- It reuses the exact same "Filtered by Town: [NAME] (N of 1894 units)" feedback banner and "Show All Towns" reset button that already exist.
- It requires zero new filter state logic, creates zero cross-filter conflicts with regions, and completely resolves the Bishan problem in under 15 lines of UI code.

5. Exactly what to do on the live address to check that the repair worked:
1. Open the live address.
2. Confirm Bishan is not visible in the Top 10 Town Rankings list.
3. Open the town filter dropdown above the Transactions table and select BISHAN.
4. Verify that the banner displays "Filtered by Town: BISHAN (X of 1,894 units)", every transaction visible in the table shows BISHAN in the Town column, and the bottom summary totals recalculate to reflect only Bishan units.
5. Click "Show All Towns" (or select "All Towns" in the dropdown) and verify the table returns to the full dataset of 1,894 units.

**My decision and build instruction:**

```
Thanks. I have read your arguments and decided:

1. Partly rejected. Two of the three reviewers who rated this 3 asked specifically for flat type and price filters, not only for towns outside the top 10. So the repair covers town, flat type and price, not town alone.
2. Accepted. The problem is on the screen and all the data is already on the page, so no backend change is needed. I also accept that a Region filter would duplicate the Regional Market Performance cards.
3. Accepted. A Region filter would conflict with the Town filter (e.g. CCR + WOODLANDS), so I will NOT add a Region filter.
4. Partly accepted. I keep your idea of reusing the existing selectedTown state, banner and reset button, but I add Flat Type and Price dropdowns, because they apply together (AND) and cannot conflict with Town the way Region would.
5. Accepted. I will use your check steps on the live address, and I have added checks for the Flat Type and Price filters.

Build this repair only:

1. Directly above the Transactions table, add three dropdowns in one row:
   - Town: "All Towns" (default), then every town in the dataset in alphabetical order.
   - Flat Type: "All Flat Types" (default), then every flat type in the dataset.
   - Price: "All Prices" (default), "Under S$500,000", "S$500,000 - S$800,000", "S$800,000 - S$1,000,000", "Over S$1,000,000".
2. The three filters apply together (AND) to the table and to the summary card below it.
3. Town uses the existing selectedTown state. Clicking a town in the Top 10 ranking still works and updates the Town dropdown to match, and the FILTERED badge still appears on that ranking row.
4. The existing banner lists every active filter and the count, e.g. "Filtered by Town: BISHAN - 5 ROOM - Over S$1,000,000 (N of 1894 units)". "Show All Towns" becomes "Clear filters" and resets all three dropdowns.
5. If no transactions match, the table says so in plain words ("No transactions match these filters") instead of showing an empty table.
6. On a phone the three dropdowns stack vertically and stay fully visible.

Change nothing else. Do not add a Region filter. Do not remove Disqus or the privacy notice, and do not break /api/health. When you finish, list the files you changed.
```

**Result:** the agent changed src/App.tsx and src/components/TopTransactionsSection.tsx and added the Town, Flat Type and Price filters, the combined banner, Clear filters and the "No transactions match these filters" message.

### Repairs 2, 3 and 4: table width, S$ on PSF, monthly dataset label
Commits: 4192714 (table width), c564319 (S$ on PSF), b21101d (monthly dataset label and tab title)

**Prompt (argue against my repairs):**

```
ROLE: You are a sceptical senior developer and usability reviewer working in my existing project. Before you write any code, your job is to argue against each of the three repairs I propose below. Treat them separately.

CONTEXT:
- Live address: https://mgmt6110-week02-build-my-product.vercel.app
- Who the product is for, and what it does for them: For managers at a multi-branch property agency, it turns the monthly data.gov.sg HDB resale dataset into a one-screen market overview by region and town, so they can see which areas are selling without reading the raw official records.

=== REPAIR A: table width ===
- The finding, in its six lines:
  - Where: Transactions table, on desktop Safari/Chrome and on an iPhone.
  - What they did, what they saw: The table is cut off horizontally. The table needs 580px but its container is fixed at 542px at every window size, even at full screen with hundreds of pixels of empty margin. When TOWN is visible, TOTAL S$ is cut; when TOTAL S$ is visible, TOWN is cut ("CENTRAL AREA" becomes "TRAL AREA"). "KALLANG/WHAMPOA" overprints the "5 ROOM" cell, and the AREA(SQM) and S$ PSF headers run into each other. On a phone only Town, Flat Type and Block-Street are visible.
  - Which heuristic: 6, Recognition Rather Than Recall (a price is never on screen with its town).
  - Screen or system: Screen. The layout width is fixed by the page.
  - Severity, and why: 3. Every visitor meets it on every row of the main table, and scrolling sideways has to be repeated for every row.
  - The repair: In a normal desktop window every column of a row is visible at once with no sideways scrolling and no overlapping text. On a phone the Town column stays in view while the other columns scroll.
- The evidence behind it: 1 of 3 groupmates raised it (severity 3).
- The repair I propose: Widen the page's maximum width so the table fits on desktop, give the Town column enough width (truncate long names with the full name on hover), and make the Town column sticky on small screens.

=== REPAIR B: currency format ===
- The finding, in its six lines:
  - Where: Transactions table, S$ PSF column.
  - What they did, what they saw: PSF cells show "$1,493" while every other amount on the page is written "S$" (S$1,720,000, S$644 psf).
  - Which heuristic: 4, Consistency and Standards.
  - Screen or system: Screen. Only the display format.
  - Severity, and why: 1. Cosmetic; nobody is likely to misread the currency.
  - The repair: Every currency value on the page uses the same S$ format.
- The evidence behind it: only I raised it in my own evaluation.
- The repair I propose: Show the PSF column as "S$1,493".

=== REPAIR C: data freshness ===
- The finding, in its six lines:
  - Where: Top of the main page, under the month, and the browser tab title.
  - What they did, what they saw: The page shows "Month: 2026-09" but no "Last updated" date or time, so users cannot tell how current the figures are. The browser tab title is "DailySalesDashboard - Singapore Property Sales", which suggests the data is daily when it is a monthly dataset.
  - Which heuristic: 1, Visibility of System Status.
  - Screen or system: Both. The screen must show it; the system must supply when the data was last successfully fetched.
  - Severity, and why: 2 (after a blind arbiter; reviewers gave 3 and 1). Users cannot judge freshness, but there is no evidence of a wrong decision yet.
  - The repair: The page says when the data was last updated and that it is a monthly dataset, and the tab title no longer says "Daily".
- The evidence behind it: 1 of 3 groupmates raised it, and I raised a related finding.
- The repair I propose: Under the month, show "Monthly dataset - Last updated: [date and time]" using a real timestamp from the data or the API response (not an invented one), and change the tab title to "HDB Resale Market Dashboard".

GOAL: For EACH of A, B and C separately:
1. Does it solve the problem the finding describes, or a problem I already believed I had? Say which, and why.
2. Does the problem belong to the screen or to the system, and does my repair sit in the right half?
3. Name one heuristic this repair could break while it serves the one above, and how.
4. Propose the smallest alternative that would make the same thing true.
5. Tell me exactly what to do on the live address to check that the repair worked.

OUTPUT: Your arguments first, as three numbered lists (A, B, C). Then stop. Write no code until I reply with the repair I have chosen.

GUARDRAILS: Do not tell me a repair is good. If you have no strong reason to doubt one, say so plainly instead of inventing one. When I do ask you to build, change only what that repair needs. Do not remove Disqus or the privacy notice, and do not break /api/health.
```

**Agent's arguments:**

REPAIR A: Table Width & Column Truncation

1. It solves the problem the finding describes, but the proposal over-prescribes a fragile implementation. The problem is that the container restricts the width artificially (max-w-xl / fixed ~542px width in parent layout) while the table demands 580px+, causing desktop cutoffs and text collisions. However, adding CSS sticky positioning to the first column on mobile introduces layout fragility (table cells with borders/backgrounds desyncing across horizontal scrolls in standard HTML <table> elements).
2. It belongs entirely to the screen, and the repair sits in the right half. No backend data changes are required; this is purely CSS container max-width and table layout styling.
3. It risks breaking Heuristic 8: Aesthetic and Minimalist Design and Heuristic 1: Visibility of System Status. If the main page container is widened indiscriminately, the other cards (Executive Overview, Regional Performance, Town Rankings) may stretch too thin and look sparse on 1440px+ screens. On mobile, sticky table columns in native HTML tables often overlap adjacent cells or clip subpixel borders unless explicit z-indices and solid background colors are enforced, creating visual artifacts and occluded headers.
4. Smallest alternative: change the container layout in App.tsx from max-w-xl (approx. 576px) to max-w-3xl or max-w-4xl on desktop. In TopTransactionsSection.tsx, remove table-fixed in favor of natural table flow with whitespace-nowrap on numeric columns, or adjust the column widths so all 6 columns fit without horizontal scroll on desktop. On small screens, keep the standard horizontal scroll container (overflow-x-auto) with a subtle fade cue or standard scrollbar instead of complex sticky table columns.
5. Check: open the live address on a desktop browser at 1280px or wider; scroll to the Top HDB Resale Transactions table; verify that all 6 headers and all cells are visible simultaneously without horizontal scrollbars; verify that KALLANG/WHAMPOA and CENTRAL AREA do not collide with adjacent Flat Type cells.

REPAIR B: Currency Format

1. I have no strong reason to doubt this repair. It directly solves the exact inconsistency identified in the finding. In TopTransactionsSection.tsx the PSF cell currently renders ${tx.psf.toLocaleString('en-SG')} (e.g., $1,493), whereas the header says S$ PSF and all other currency values render via formatCurrency() or formatPsf() with S$.
2. It belongs to the screen, and the repair sits in the right half. It is a single-string template prefix change (or calling the existing formatPsf helper).
3. It could break Heuristic 8: Aesthetic and Minimalist Design (character overflow). Prefixing S$ adds characters, which in narrow columns can cause wrapping or push the table width out by 10-15px if column widths are rigid. Since the column header already says S$ PSF, standardizing the cell content is straightforward if the width allows it.
4. Smallest alternative: replace ${tx.psf.toLocaleString('en-SG')} with S$${tx.psf.toLocaleString('en-SG')} (or use the existing helper formatPsf(tx.psf)).
5. Check: open the live address, scroll to the Transactions table, and verify that each S$ PSF value is formatted as S$1,493 with the leading S$, matching the format of Total S$.

REPAIR C: Data Freshness & Browser Tab Title

1. It partly solves the problem, but risks solving a problem you already believed you had regarding the "Last updated" timestamp. Fixing the tab title directly resolves the misleading "Daily" mismatch. For the timestamp: if the upstream data.gov.sg API does not return a record-level update timestamp, displaying the client's fetch execution time can mislead managers into believing new official government data was published at that second, when it is actually an unchanging monthly batch.
2. It belongs to both, but the repair risks sitting in the wrong half unless the API already supplies the real timestamp. If /api/hdb sends a fetchedAt or lastModified timestamp from data.gov.sg, the screen merely presents it. If not, adding a timestamp on the client side would represent "screen time" rather than "data freshness".
3. It risks breaking Heuristic 2: Match Between System and the Real World. Property managers understand HDB resale records as monthly government releases. If the dashboard shows "Last updated: Sep 28, 2026, 07:59 AM", a manager could infer that transactions are streaming live or that transactions from that morning have been included.
4. Smallest alternative: update the <title> in index.html to "HDB Resale Market Dashboard - Singapore Property Sales"; label the dataset frequency and release month explicitly, e.g. "Official HDB Monthly Resale Dataset - Month: [YYYY-MM]"; if a fetch timestamp is exposed by the API, label it "Data refreshed: [timestamp]" rather than an unqualified "Last updated".
5. Check: verify the browser tab title reads "HDB Resale Market Dashboard" and no longer contains "Daily"; verify the page clearly says the data is the monthly dataset.

**My decisions and build instruction for Repair 2:**

```
Thanks. My decisions:

REPAIR A:
- Accepted: widen the page container to max-w-3xl (not wider, so the other cards do not stretch too thin), and adjust the table column widths so all six columns fit on desktop with no sideways scrolling and no overlapping text.
- Rejected: keeping plain horizontal scroll on phones. The finding was made on an iPhone, where a price is never on screen with its town, so the Town column must stay in view. I accept your warning about sticky cells, so make the sticky Town cells (header and body) use a solid background matching each row and a z-index so they never overlap or show through.

REPAIR B:
- Accepted with no change: prefix the PSF cell with "S$" (e.g. "S$1,493"). Do not use formatPsf, because it adds "psf", which the column header already says.

REPAIR C:
- Accepted: change the <title> in index.html to "HDB Resale Market Dashboard - Singapore Property Sales".
- Accepted: do NOT show the page-load time as "Last updated". Label the data clearly as "Official HDB Monthly Resale Dataset - Month: [YYYY-MM]". Only if /api/hdb already returns a real timestamp from data.gov.sg, show it as "Data refreshed: [timestamp]"; if it does not, show no timestamp. Tell me which case applies.

Build REPAIR A only now. Change nothing else. Do not remove Disqus or the privacy notice, and do not break /api/health. When you finish, list the files you changed.
```

**Build instruction for Repair 3:**

```
Now build REPAIR B only, as decided above. Change nothing else. List the files you changed.
```

**Build instruction for Repair 4:**

```
Now build REPAIR C only, as decided above. Change nothing else. List the files you changed, and tell me whether /api/hdb returns a real timestamp.
```

**Agent's answer on the timestamp:** /api/hdb does not return a timestamp from data.gov.sg (it returns only month, records, totalUnits, totalValue, avgPsf and townRanking), so no timestamp is shown and the data is labelled "Official HDB Monthly Resale Dataset - Month: 2026-09".

**Note on Repair 4:** the agent's version of index.html did not contain the Disqus, Clarity and privacy-notice code that is in the repository, so I did not copy it. I changed only the <title> and og:title lines in the repository's index.html by hand.
