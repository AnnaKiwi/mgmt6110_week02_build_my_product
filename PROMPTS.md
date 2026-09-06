# Prompts Log‑Daily Sales Dashboard
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

## Prompt 1：Initial generation
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

## Prompt 2：Revise UI layout
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

## Prompt 3：Adjust table style
Two small fixes to the top transaction table only. Change nothing else.

Column header: change "AREA" to "AREA (sqft)" so the unit is clear.

Top Deal indicator is currently overlapping with the unit number and getting cut off. Remove the "Top Deal" text badge from the unit column. Instead, indicate the top deal (most expensive transaction) with:

A gold left border on that entire row (3-4px wide, same gold #C9A961 used elsewhere in the app)

A small crown icon (👑 or a lucide Crown icon) immediately before the amount value in the AMOUNT column for that row only

This way the top deal is visually clear without taking extra horizontal space or overlapping text.

Keep everything else the same: the 5-column table structure, alternating row colors, navy header, totals row, filter behavior, and all other sections.
