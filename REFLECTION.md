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

## Q4: What did it build that you never sketched?

Three kinds of gaps between my sketch and the final product:

**1. It added what I never asked for.** The monthly progress percentage (75.4%) appeared on its own — I only asked to "show monthly progress." AI also decided card shapes, font sizes, and spacing without my input.

**2. It decided things I did not know were decisions.** The color scheme (messy in version 1), the top-deal badge style, the default sorting of the ranking list, how long property names affect layout, and the blank loading state — I never specified these, so the model chose, and its choice became my product's behavior.

**3. It was right where I was wrong.** The dropdown showing a salesperson's specific deal details was an interaction I never thought of. AI built it automatically, and it inspired me to add monthly historical performance. My spec seemed complete but missed this valuable interaction.

**Most important gap: the monthly percentage was hardcoded.** I noticed it only after multiple iterations, not during the build or at deployment. I saw a number on the screen and passed visual check. I should have written in the Goal list that the percentage must be dynamically calculated as daily sales divided by monthly target. And during verification, I should have changed a test deal to see if the number moved. I thought "show monthly progress" was a complete requirement, but "where the number comes from" is itself a decision I failed to specify. This is the hidden risk of AI products — it decides for you in places you did not realize were decisions.

---

## Q5: Learning pointers for the organisational context

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



