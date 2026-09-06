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

Augmented — weeks of cross-department work compressed into one afternoon. I had never built a sales dashboard. In a real company this takes weeks of meetings across sales, operations and IT. With AI I had a working, deployable mobile dashboard in an afternoon, and almost all of that time went to information architecture rather than implementation: what does the manager care about most at 8pm, which metric goes first, how does the menu stay simple on a phone. The build did not make me a better developer. It moved my time to product definition.

Constrained — I can only describe symptoms. After Prompt 3 the top-deal badge was overlapped and cut off. All I could say was "the badge is covered, not fully shown", then wait. I could not tell whether the fix touched the right line, and I could not do it myself. I know the click path, not the code, so anything the chat panel cannot fix leaves me stuck.

Constrained — verification could not keep up with generation. AI wrote hundreds of lines at once and I checked only my Goal list: is the component there, does data show. Never the logic. Few tasks can be fully delegated, not because the model cannot do them, but because I cannot check them as fast as it produces them.

---

# Q3: In the loop, on the loop, out of the loop

### Reading back through my PROMPTS.md, two kinds of moment.

My judgment changed the outcome. In Prompt 3 I added the salesperson monthly-performance module. It was not in my spec, but a manager needs history to decide on motivation or reassignment — that came from the business, not the model.

I was nominally in the loop and added nothing. When the top-deal badge broke I could only describe the symptom and accept whatever came back. And I approved the entire first version without reading a line of it — the hardcoded monthly percentage sat there through my visual check.

Walking the real product, judged on reversibility, stakes, checkability and who bears the error:

Entering deal data — in the loop. Every other number derives from it, and a wrong figure is hard to spot downstream.
Auto-calculating summaries — out of the loop. Pure arithmetic, instantly re-runnable, cheap to check.
Rendering the dashboard — out of the loop. Display only, no stakes.
Abnormal progress alerts — on the loop. High volume; it runs itself while people watch totals and sample outputs.
Adjusting discount strategy — in the loop. A signed discount cannot be undone and the company bears the loss.

I would sign off step 2 as out of the loop on three conditions: cross-check rules that flag totals which do not reconcile, a daily sampled data-quality report, and logs complete enough to trace any figure months later.

Step 5 stays in the loop however expensive. Market sentiment, team morale and brand judgment do not reduce to the data on this screen, and the decision cannot be undone.

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



