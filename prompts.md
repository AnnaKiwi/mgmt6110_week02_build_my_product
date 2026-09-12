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
