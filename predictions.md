## 1. My product
- Live address: https://mgmt6110-week02-build-my-product.vercel.app
- Who it is for, and the one job it does for them: For agents and managers
  at a multi-branch property agency, it gives a one-screen monthly overview
  of the Singapore HDB resale market — total units sold, prices and town
  rankings.
- Health check from Step 1, on Friday 25 September 2026 at [TIME]:
  /api/health returned {"status":"ok","upstreamStatus":200,
  "latestMonth":"2026-09","latestMonthRecordCount":1788}.
- Devices and browsers I used for this evaluation: Laptop (macOS) Chrome
  only. I did not open or test the dashboard on a phone.

## 2.My findings

### Finding 1

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), in the Monthly Transactions table.
- What I did, what I saw: I clicked a town name in the table (BISHAN, for example) to filter the list. The browser sent a new request to /api/hdb?town=BISHAN, but the screen didn't change while it loaded. No spinner, no "loading" text, and the button still looked clickable. On fast Wi-Fi the new table appeared in under a second, so I only noticed because I was watching for it. On a slow connection I would have no idea whether the click had worked.
- Which heuristic: 1, Visibility of System Status.
- Screen or system: Screen. The page already knows when the request starts and finishes. It just doesn't show it.
- Severity, and why: 2. It happens every time anyone filters, so it is very common. The wait is short on good networks, which keeps the score down, but people on slow connections may click again because nothing seems to happen.
- The repair: As soon as a town is clicked, the table shows that results are loading, and the same filter can't be clicked a second time before the first one finishes.

### Finding 2

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), first load of the page on a 3G connection.
- What I did, what I saw: I set the network to 3G in DevTools and reloaded. The screen was completely blank for about 7–8 seconds before anything appeared. There was no logo, no text and no skeleton in the meantime.
- Which heuristic: 1, Visibility of System Status.
- Screen or system: Screen. The blank HTML is sent before any data exists, so a simple loading message can be written straight into it.
- Severity, and why: 3. Everyone opening the site for the first time on a phone or slow Wi-Fi gets this. Some people will think the link is broken and close the tab before anything appears.
- The repair: The page that first arrives in the browser already shows the dashboard name and a loading message, or a simple outline of the layout, so the screen is never just blank.

### Finding 3

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), in the Monthly Transactions table, at the AREA(SQM) column.
- What I did, what I saw: I read the flat sizes in the table. They are only shown in square metres (107, 120 and so on). In Singapore, people usually talk about flat size in square feet.
- Which heuristic: 2, Match Between the System and the Real World.
- Screen or system: Screen. The numbers are correct, because HDB publishes them in square metres. The page only needs to show square feet as well, and that can be worked out from the same figure.
- Severity, and why: 1. People can get around it, and the S$ PSF column already works in square feet, so it doesn't block anyone. It is simply not the unit locals use.
- The repair: The area column shows square feet, with square metres next to it if needed.

### Finding 4

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), after applying a town filter in the Monthly Transactions table.
- What I did, what I saw: I clicked a town name (TAMPINES) to filter, then pressed the browser back button to undo it. The browser left the site instead of returning to the full list. Filtering doesn't change the URL, so the browser has no earlier state to go back to.
- Which heuristic: 3, User Control and Freedom.
- Screen or system: Screen. The filter state is only kept inside the page and needs to be added to browser history. The server doesn't need to change.
- Severity, and why: 3. Pressing back to undo something is a normal habit, and here it throws users off the dashboard. They have to reopen the link and start over, and nothing on the page tells them to use "Show All Towns" instead.
- The repair: Each filter change adds a step to browser history, so the back button undoes the filter and keeps the user on the page.

### Finding 5

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), in the Monthly Transactions table, at the S$ PSF column.
- What I did, what I saw: I compared how money is written across the page. The PSF cells say "$1,493" and "$1,477", but everywhere else the currency starts with "S$" (S$1,720,000, S$650 psf, S$1.22B).
- Which heuristic: 4, Consistency and Standards.
- Screen or system: Screen. This is only how the page formats numbers. The data itself is fine.
- Severity, and why: 1. Nobody is likely to misread the currency in context, so it is cosmetic, but the same kind of value is written two different ways on one screen.
- The repair: Every currency value on the page uses the same format, and the PSF numbers start with S$ too.

### Finding 6

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), reloading the dashboard after a filter was applied.
- What I did, what I saw: I filtered by a town and then reloaded the page. The filter was gone. The table went back to showing 15 of 1788 transactions, and I had to pick the town again.
- Which heuristic: 7, Flexibility and Efficiency of Use.
- Screen or system: Screen. The page knows which town was selected. It simply forgets it on reload.
- Severity, and why: 2. It doesn't stop anyone doing their job and only takes a couple of clicks to fix, but anyone who comes back every day has to redo it every time.
- The repair: After a reload, the dashboard opens on the town the user was looking at last.

### Finding 7

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), in the response from /api/hdb.
- What I did, what I saw: I looked at what the API returns. All 1788 records contain the same "month":"2026-09" value, even though the month is already given once at the top. Each record also has an id that the page never displays. The whole response is about 305KB.
- Which heuristic: 8, Aesthetic and Minimalist Design.
- Screen or system: System. The API decides which fields come back, and the page can't leave out data the server sends.
- Severity, and why: 1. Users never see these fields, but the extra text makes every download a little bigger and adds to the slow load in Finding 2.
- The repair: The API sends only the fields the page uses, and the month appears once for the whole set instead of on every record.

### Finding 8

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), in the Monthly Transactions table, with the network switched off.
- What I did, what I saw: I made the network fail, then clicked a town name to filter. The request failed, but nothing on the screen changed. No error message, no warning, no retry button. It looked as if I had never clicked.
- Which heuristic: 9, Help Users Recognize, Diagnose, and Recover from Errors.
- Screen or system: Screen. The failed request comes back to the page, but the page does nothing with it.
- Severity, and why: 3. Phone connections drop often enough that this will happen, and users will believe they are looking at filtered data that never loaded. They have no way to spot it or try again.
- The repair: When a filter fails to load, the page says so in plain words, makes clear it is a connection problem rather than "no results", and gives a way to retry.

### Finding 9

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), in the filter banner above the Monthly Transactions table.
- What I did, what I saw: With the network failing, I clicked BISHAN. The banner changed to "Filtered by Town: BISHAN (1788 of 1788 units)", but the table below still showed all 1788 records from every town (CENTRAL AREA, CLEMENTI, BEDOK and others). The banner said one thing and the data said another.
- Which heuristic: 9, Help Users Recognize, Diagnose, and Recover from Errors.
- Screen or system: Screen. The page changes the banner before it knows whether the request worked. The banner has to match the data on screen.
- Severity, and why: 3. On a data dashboard this is worse than a missing message. An agent could read or send someone a "BISHAN" view that actually contains the whole market, and the mistake is hard to catch later.
- The repair: The banner only changes once the filtered data has actually loaded. If the request fails, the page stays in, or returns to, a state where the banner and the table agree.

### Finding 10

- Where: [https://mgmt6110-week02-build-my-product.vercel.app](https://mgmt6110-week02-build-my-product.vercel.app), at the source note near the top and the open-data notice in the footer.
- What I did, what I saw: I looked for information about how fresh the data is. The page shows the month (2026-09) and the source (data.gov.sg, with the Singapore Open Data Licence in the footer), but it never says how often the data is updated or which day of the month a new set appears.
- Which heuristic: 10, Help and Documentation.
- Screen or system: Screen. The update schedule is known to whoever runs the data pipeline. The page only needs to say it next to the source.
- Severity, and why: 1. The month label already gives a rough sense of how fresh the data is, so the cost is small, but people making decisions cannot tell whether this month's update has happened yet.
- The repair: The source note says how often and when the data is updated, so people know when to expect new figures.

## 3.My predictions

The three findings I expect my groupmates to raise:
- Finding 9 (filter label contradicts the data after a failed request), expected severity 3 
- Finding 4 (browser back leaves the site instead of undoing the filter), expected severity 3
- Finding 2 (blank screen for several seconds on a 3G reload), expected severity 3 

## 4.Findings I had already heard in the studio
NONE
```
