# Questions for the previous chat

This app moved here from an earlier conversation. The repository's history only starts on
2026-10-02, with files uploaded in bulk, so anything decided before that lives only in the old chat.
These are the questions whose answers would help most. Paste the answers back (or into this file)
and I will fold them into `CONVENTIONS.md`, `PLAN.md`, or the README.

Most useful first.

## 1. How problem statements and tags were sourced

1. **How did the old chat reach LIVE (`live.poshenloh.com`)?** From this container it returns 403
   at the network proxy. Was it fetched from your Mac, with a logged-in browser session, with
   cookies or an API endpoint, or through a particular URL pattern? `tools/fetch-live-statements.py`
   is in the repo, but not how and where it was run.
2. **Where did LIVE's concept tags come from, and what did they look like?** The plan mentions
   adding LIVE concepts on top of the hand tags. Was there ever a downloaded concept cache, and
   was it a list per problem, a fixed vocabulary, or free text?
3. **How exactly were the 1,365 tagged problems tagged?** `tools/RETAG-NOTES.md` says tags follow
   the best AoPS solution. Was every problem checked that way, or only the retagged ones? Were
   some tagged from memory?
4. **Which papers were tagged in which order**, and were any left half-done on purpose?
5. **What is the `trick` / `trickFormulas` field on a problem for**, and when should a new
   entry carry one? Only 13 problems have it.
6. **The Fall 2021 AMC 12A and 12B:** were the PDFs ever supplied, or is that gap known and
   accepted?

## 2. The cards' history

7. **The order in which cards were added, with rough dates**, from the first card up to the
   start of `js/data/new-cards.js` (2026-10-11). Even batch-level notes would let
   `Special:NewCards/All` show the full history.
8. **Cards that were deleted or merged, and where their content went.** `tools/link-aliases.json`
   holds some old names. A list of removed ids with "merged into X" or "dropped because Y"
   would stop me from proposing them again. Pentagon and icosahedron patterns are already
   known to be dropped.
9. **Cards or topics you said no to before**, besides MATHCOUNTS and Perfect Numbers, and why.
10. **How the first tiers and importances were assigned**: `tools/tier-proposal.md` and
    `tools/importance-proposal.md` hold the tables. Were they reviewed card by card, or in
    bulk with spot checks?
11. **Why levels (`MATHCOUNTS`, `AMC10`, …) were kept in the data** after they stopped being
    shown or filtered. Is there a plan for them, or can they eventually go?

## 3. Search

12. **How the semantic search index is rebuilt.** CONVENTIONS points to
    `~/Downloads/competition-math-buildenv/bin/python tools/build-search-index.py` on your Mac.
    Which embedding model, which Python packages and versions? Could it run in this cloud
    container? The newest ~130 cards are found by lexical search only until it is rebuilt.
13. **Where the 187 labelled search queries came from**, and whether the probe sets
    (`probe-queries.json`, `probe2-queries.json`) were written by you or by the old chat.
14. **The search numbers to hold**: is 170/185 warm (MRR 0.950) still the target, or was there
    a later full run?

## 4. Style and preferences not written down

15. **Style rules you gave the old chat that never made it into `CONVENTIONS.md`**: wording you
    dislike, the em-dash budget, how formal the write-ups should be, the reading level aimed for,
    and how long an example may be.
16. **Figure preferences**: colors you like or dislike, label sizes, when a card should have two
    panels, and which existing figures you consider the best models.
17. **Which parts of the app you are happiest with, and which you think are weakest.**
18. **Who uses the app**: you alone, a team, students? Which contests are you preparing for,
    and when? That decides which cards and which problems come first.

## 5. Running and publishing

19. **How the app is published and opened**: GitHub Pages, a local server on your Mac, or a file
    opened directly? Does anything besides `index.html` need to stay in sync when files move?
20. **The MAA permission email** (CC BY-NC-SA, October 2026): are there conditions beyond the
    credit line, such as where the app may be shared or a link back to the MAA?
21. **The `lab/` pages** (formula web, quiz, flashcards): are they in use, kept as experiments,
    or meant to be finished or retired?
22. **Known bugs or wishes** you mentioned to the old chat that never reached `PLAN.md`.

## 6. Small things worth confirming

23. The five `check-labels.py` "far-move" findings treated as a font baseline (`thales-theorem`,
    `radical-axis`, `weierstrass-substitution`, `harmonic-addition`, and the vertex-form body
    figure): were these accepted on purpose?
24. `CONVENTIONS.md` mentions a CONTRIBUTING note about narrowing a card's keywords so it stops
    outranking the general card it specializes. Are there other cases like that to know about?
25. Any decision the old chat made that you later reversed, so the earlier version isn't revived.
