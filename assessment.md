**Student:** Zhang Chenxi· **Course:** MGMT 6110 · **Problem Set 1**

---

# Q1: Who are your users, and what changes for them?

My users are internal users — marketing managers of a single condominium project in a real estate developer group. They work at the project site office. The group has 10 such managers, each leading a team of 10 salespeople. Their main job is to track daily sales, monthly progress, and annual target completion.

Before this dashboard, each manager had a dedicated data clerk using Excel as the ledger. The daily flow was: salespeople report deals all day → the clerk works overtime after 8pm closing to aggregate data → manually calculates all metrics → sends a report → the manager reviews only the next day. Manual work often caused errors: reading the wrong row, entering wrong amounts, or missing entries. Clerks had to work overtime every day, especially at month-end. Managers could not see real-time data and had to wait for the report. If the group expanded, each new project needed another clerk, and labor cost grew linearly.

My dashboard removes the manual aggregation step (the clerk's nightly Excel work) and reorders the process from "wait for report → review" to "real-time data → immediate decision." Now only 1 to 2 clerks manage multiple projects with no overtime. Data is calculated automatically after entry, so human errors are gone. Managers can check anytime how many units sold at what time, and the monthly progress bar shows target completion clearly. They can adjust strategy immediately — increase discounts when behind, or tighten promotions when ahead to protect profit.

---

# Q2: Augmented capacity and constrained capacity

### Augmented capacity

**1. Cross-department work compressed into one afternoon**

I had never built a sales dashboard before. In a real company, this takes weeks of meetings across sales, operations, and IT, plus significant budget. With AI, I built a working, deployable mobile dashboard in one afternoon. I spent the time on product thinking instead of cross-department communication.

**2. Time shifted from coding to product thinking**

Most of my time went to information architecture, not technical implementation. I thought about: what data does the manager care most about at 8pm? Which metrics go on the first screen? What format helps them decide fast? How to keep the menu simple on a phone? AI handled the front-end, so I focused on product definition and user experience — which is what a product person should do.

### Constrained capacity

**1. Cannot read code, can only describe symptoms**

I could only see the front-end visual result. When the top-deal badge was blocked after Prompt 3, I could only say "the badge is covered, not fully shown" and wait for AI to fix it. I could not tell if AI changed the right line of code, and I could not fix it myself. If a problem cannot be fixed through the chat panel, I am completely stuck — I know the click path, not the code.

**2. AI's defaults became my product's defaults**

Without precise color instructions, the first version had messy, inconsistent colors across modules. It was purely the model's own default choice. If I do not specify every visual detail, the product carries the model's aesthetic bias, not my design judgment. I felt this when I saw the first version, then had to start Prompt 2 to force unified colors and layout.

**3. Verification became the bottleneck**

AI generated hundreds of lines at once. I only checked my Goal list — "is this component there?" "does the data show?" — not the code logic. The monthly percentage was hardcoded, but I saw a number and thought it worked. I only found out later it did not change with data. This shows AI can do a lot of development, but few tasks can be fully delegated, because verification cannot keep up with generation.

---

# Q3: In the loop, on the loop, out of the loop

### Two kinds of moments in my PROMPTS.md

**My judgment changed the outcome:**

- I found the monthly percentage was hardcoded. I saw a number and passed the visual check, but later found it did not change with new data. I asked AI to make it dynamic. Without this deep check, the error would have shipped.
- I added the salesperson historical performance module. It was not in the original requirements, but I knew managers need this to judge employee performance and decide on motivation or reassignment. This came from my business understanding, which AI cannot replace.

**I was nominally in the loop but added nothing:**

- When the top-deal badge was blocked, I could only describe the symptom and wait for AI. I could not evaluate whether the fix was correct.
- After the first version, I accepted it without reading the code. I only checked the Goal list, not the logic. The hardcoded percentage is proof I "accepted without reading."

### Five steps if the product goes live

1. **Entering deal data — in the loop.** Raw data accuracy is high stakes. A person must confirm after entry.
2. **Auto-calculating summaries — out of the loop.** Pure math, high reversibility, can be auto-checked with cross-check rules.
3. **Rendering the dashboard — out of the loop.** Pure display, no risk, no human intervention needed.
4. **Abnormal progress alerts — on the loop.** System runs automatically. People watch totals and sample-check outputs.
5. **Adjusting discount strategy — in the loop.** Signed discounts cannot be undone. Directly affects profit. A human must decide.

**One step can be out of the loop: auto-calculation of summaries.** I would sign off if three conditions are met: the system has built-in cross-check rules that flag errors; it generates a daily data quality report with sampling; and all calculation logic has complete logs for tracing.

**One step must stay in the loop: discount strategy adjustment.** It directly affects profit and cannot be reversed. Market sentiment, team morale, and brand judgment cannot be reduced to data. No matter how good AI gets at recommending discounts, a human must make the final call.

---

# Q4: What did it build that you never sketched?

Three kinds of gaps between my sketch and the final product:

**1. It added what I never asked for.** The monthly progress percentage (75.4%) appeared on its own — I only asked to "show monthly progress." AI also decided card shapes, font sizes, and spacing without my input.

**2. It decided things I did not know were decisions.** The color scheme (messy in version 1), the top-deal badge style, the default sorting of the ranking list, how long property names affect layout, and the blank loading state — I never specified these, so the model chose, and its choice became my product's behavior.

**3. It was right where I was wrong.** The dropdown showing a salesperson's specific deal details was an interaction I never thought of. AI built it automatically, and it inspired me to add monthly historical performance. My spec seemed complete but missed this valuable interaction.

**Most important gap: the monthly percentage was hardcoded.** I noticed it only after multiple iterations, not during the build or at deployment. I saw a number on the screen and passed visual check. I should have written in the Goal list that the percentage must be dynamically calculated as daily sales divided by monthly target. And during verification, I should have changed a test deal to see if the number moved. I thought "show monthly progress" was a complete requirement, but "where the number comes from" is itself a decision I failed to specify. This is the hidden risk of AI products — it decides for you in places you did not realize were decisions.

---

# Q5: Learning pointers for the organisational context

Thinking from "where decisions live" and "what the build exposed," and based on my own build experience, here are three pointers for a hundred-person organization using these tools weekly:

**Pointer 1** (traced to: the hardcoded percentage passed my visual check because I did not read the code):

> 
> The department head should require a data behavior test before deploying any AI-generated app — a second person separate from the prompt author changes test input and verifies the output changes, instead of only checking the visual interface.

**Pointer 2** (traced to: the first version had messy colors because I did not specify; a hundred people would produce a hundred styles):

> 
> The department head should inject the company's design standards and component library as default settings in AI tools, so that "not specifying" still produces brand-consistent interfaces — defaults shape the product far more than policies published afterward.

**Pointer 3** (traced to: I cannot read code, so when the top-deal badge broke I could only describe symptoms; if I leave, the app becomes a black box):

> 
> The department head should require complete prompt iteration logs and code version history for all AI-generated apps, and assign a second maintainer who is not the original author, so the app survives when the author transfers or leaves.

---



**Student:** Zhang Chenxi· **Course:** MGMT 6110 · **Problem Set 2**

# 1. Product Overview & Data Claims 
The following metrics were removed entirely, because there is no public, verifiable data source to support them:
- Individual salesperson rankings and performance metrics
- Fictional property project comparison data
- Arbitrary monthly sales targets

Because these data are completely internal data, they need to be manually updated by employees in the company every day.

## 2. Acceptance Criteria

### 2.1 Frontend Criteria

1. **A stranger can tell what this is within a few seconds.**
- Result: Met
- Check: The very top of the page has the title, month label, and data source. You don’t have to scroll to work out this is a monthly HDB resale market dashboard for property agency teams.

2. **The main job works without an instruction manual.**
- Result: Met
- Check: Regional cards say “Tap card to expand”, the table has a “Show all transactions” button at the bottom, and the tab switch between Transactions and Rankings is obvious. You don’t need someone to explain how to use it.

3. **Every claim on the screen is actually supported by the product.**
- Result: Met
- Check: All numbers come from the `/api/hdb` endpoint, nothing is hardcoded or made up. I removed all the metrics from PS1 that had no public data source, like individual salesperson rankings. That matches what the lecture said: a product that claims less, and delivers on everything it does claim, is a better product.

4. **The things most likely to go wrong have a clear way back.**
- Result: Met
- Check: Loading, empty results, upstream refusal and no internet each show a different line of text telling the user what’s happening. It doesn’t just show a spinner or go blank.

### 2.2 Backend Criteria

1. **Someone who didn’t build this can tell if the service is up.**
- Result: Met
- Check: The `/api/health` endpoint is public. Anyone can open it in a browser and see if the upstream source is working, what month the data is from, and how many records there are. You don’t need to read any code.

2. **Credentials can’t be reached from the page and aren’t in the repository.**
- Result: N/A
- Check: The HDB open data API doesn’t need an API key at all, so there’s nothing to leak. There are no secrets hardcoded anywhere in the code or the public GitHub history.

3. **It doesn’t ask for new data more often than the source actually changes.**
- Result: Not met
- Check: HDB data only updates once a month, but right now the endpoint pulls fresh data every single time someone loads the page. There’s no caching at all. It’s unnecessary load and could run into rate limits eventually. This is the biggest gap I noticed.


# 3. Validation & Error State Testing 

# 4. Reflection: 

## Q1: Where did the agent make you faster, and by how much?

1. Backend API interface development: from 0 to writing api/hdb. js, api/health. js, including requests,Data cleaning, error handling, and ranking aggregation—areas entirely unfamiliar to me, given my lack of a computer science background. Attempting to build this on my own would have been impossible and left me with no clear starting point. Yet, AI generated a functional basic version in just ten minutes.

2. Front-end components and styles: generate transaction tables, area cards, KPI cards, For a responsive layout, if AI is not used, as the developer of this dashboard, I would need to engage a graphic design firm, interact with them, and specify the desired color scheme and module layout.Details such as font size, as well as the specific placement of dropdown menus, require a week to complete—from initial communication through design and revisions—based on my past work experience. In contrast, AI can accomplish this within just a few rounds of prompts.

3. The saved time was used to make product decisions (switching from daily to monthly, removing indicators without data sources, designing incorrect copy), manually verifying data, and adjusting business logic, rather than spending it on writing basic code.

4. It's faster to handle small adjustments yourself: simply remove or edit certain content. If you directly delete or modify things, it feels more natural. Communicating with AI and giving it instructions to make changes can actually be more cumbersome.

---

## Q2: Where did it cost you time, and whose fault was that?

1. The most time-wasting time: simulated daily → monthly rework, mainly my own fault, the requirement was not clear. Initially, to align with the "daily" concept, we had the AI perform a simulated single-day sampling. Later, we realized that HDB only publishes monthly public data, and forcing a daily approach compromised data authenticity. We then reverted to using full-month data, resulting in wasted development and deployment efforts for one iteration.

2. Time wasted due to AI: The region summary logic generated by AI defaults to calculating only the first 15 rows displayed in the table, rather than the full dataset. While the numbers appear reasonable, they are actually incorrect; the discrepancy is only discovered when verifying the total.

**Conclusion:** Rework caused by unclear requirements far exceeds errors inherent to AI itself. Most AI errors are subtle mistakes that appear correct on the surface and require verification using domain-specific knowledge.

---

## Q3: Did it ever hand you something that looked right and was not?

**The most typical one:** simulating daily sampling data
The AI-generated simulation showed 31 transactions for a single day; the numbers, fields, and rankings all appeared reasonable, and the page rendered correctly, so I initially accepted it without question. After verification, it was discovered that the data was inaccurate: it is impossible for a full month's data to consist of only 31 records, as AI had silently performed sampling without clear labeling.

**Reflection:** Content generated by AI appears "correct" as long as the grammar is accurate and the page runs without errors. However, the authenticity of the data, business logic, and platform rules must be verified by human domain knowledge, not just by whether the page can be opened or not.

---

## Q4: What did you have to know in order to supervise it?

1. Business knowledge: When I learned that the resale data of HDB in Singapore is released on a monthly basis and there is no official daily transaction data, I found that "simulating daily closing prices" is not rigorous in essence, which is the basis for my decision to return to monthly data.

2. Data verification knowledge: I know that the total must be equal to the sum of the sub-items, so I will use the totalUnits interface to verify the sum of the trading volume of the three regions, and found that the regional aggregation only calculated the first 15 items.

I haven't identified the knowledge gaps that need to be filled: the logic of the backend code and the file storage locations. Due to this lack of knowledge, I cannot understand the code, and without understanding its execution logic, I am unable to technically verify AI errors.

---

## Q5: Which decisions did you keep, and should you have kept more or fewer?

1.I clearly reserve the right to make decisions:

**Product positioning:** change from daily simulation to monthly market intelligence dashboard, adhere to the principle of "less commitment, full fulfillment".

**Data selection:** remove salesperson rankings without public data sources, fictional project comparisons, and do not fabricate data.

**Regional classification criteria:** Based on Singapore's official CCR/RCR/OCR standards, not arbitrary divisions made by AI.

**Data source annotation:** All data are clearly annotated as coming from data.gov.sg and explicitly stated to be monthly data.
The default display of the table is 15 items, and the interaction logic of expanding all items is supported.

2.Decisions that AI quietly made on my behalf:

The table is sorted by total price in descending order by default; the AI handled this directly. Later, I requested to change the sorting to be based on the number of units in descending order.
The crown icon next to the first-place item and the highlighted price styling were added proactively by the AI.

**Conclusion:** It is essential to retain: product positioning, data authenticity, and data sources—these must never be entrusted to AI.
It's suitable to delegate to AI: specific component layout and pure code implementation details—AI can handle these more quickly without affecting the product's core functionality.
**I should keep more:** the definition of data scope. AI can easily perform sampling and apply default sorting without informing you, which undermines the product's credibility.

---

## Q6：Now scale it up: what does this mean for a team of thirty? 

When everyone only looks at their own module, it is easy to make the mistake of "locally correct but globally incorrect", which will cause the data interface of each part to be unable to connect, resulting in the product not working normally.

If a 30-person team collaborates on developing a core product using AI, I would establish three non-negotiable rules and require the project lead to sign off before implementation.
First, all code and copy generated by AI must undergo human business validation before submission: data definitions must align with official data sources, and erroneous copy or user statements must be confirmed by product managers. Under no circumstances should AI-generated content be deployed directly without this review.

Second, establish a daily code review mechanism, requiring employees to move data and code, Check for existing risks, such as whether secrets and sensitive information appear in the code, whether API file locations and deployment configurations are correct, and whether any undisclosed logic has been quietly introduced by AI (e.g., default sampling or default sorting). 

Third, all prompts and iteration records must be archived, and each function must have a clear human decision-maker; Decisions related to product positioning, data authenticity, compliance requirements, and user right to know must not be made autonomously by AI. 


