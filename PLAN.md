# Competition Math Reference: status and plan

**A new chat starts here.** Read "Current state", then "The road ahead". This file says what to do and in what order, and nothing else:
- how things are done: `CONVENTIONS.md` (§13 holds the rules that used to live here);
- what changed and when: [the project changelog](CHANGELOG.md);
- approvals waiting on the owner: `QUESTIONS.md`;
- what each Learn book, chapter and lesson contains: `LEARN-OUTLINE.md`;
- the topic tree draft and its plan: `TOPIC-TREE.md`.

**The handoff rule.** After every major change, every finished step, and the start of every new step: update "Current state", add an entry to `CHANGELOG.md`, commit and push.

## Current state (updated 2026-11-07)

Who edits what: Claude keeps the shared Markdown (this file, `CHANGELOG.md`, `CONVENTIONS.md`, `README.md`, `LEARN-OUTLINE.md`, `TOPIC-TREE.md`, `QUESTIONS.md`, `TEXTBOOK-REVISION.md`) and works on cards, problems, the topic tree and `js/app.js`; Codex revises the textbooks (`js/data/learn/**`, `tools/build-book-notes.cjs`, `tools/build-learn-shelf.py`, `tests/book-search.cjs`) on `codex/textbook-revision` and reports each batch for Claude to record. Both bump asset versions in `index.html`; keep both sets of bumps when merging.

- **Where things stand.** Reference and Practice are finished. All 13 Learn books are initially written; their content revision is a separate, ongoing step. The topic tree (Step T) is the active step, with T3, the tagging pass, under way.
- **Counts (from the tools, 2026-11-07):** 771 cards (552 formulas, 170 methods, 49 patterns); 37 built-in lists; 4,725 problems, every one with a strategy, 4,276 citing at least one card (449 cite none); 4,715 statements and 4,715 answer keys, one of them voided; 346 figures drawn for the app (counted by `check-statements.py`). Check with `$JSC tools/validate-problem-db.js`.
- **Step T checkpoint.** T1 and T2 are done: `TOPIC-TREE.md` holds the tree (500 nodes; TQ6 added `cp.basic.perm.cycle`, TQ7 `cp.basic.comb.pairs` and TQ8 `alg.word.rates.motion.speeds`), `js/data/topic-tree.js` is generated from it, and `js/data/topic-homes.js` gives every card a home (740 with a home, 30 general methods with none). T3 is under way: 340 problems are filed with `tree` fields, namely the 2026 AMC 10A and 12A, the 2026 AIME I and II, the 2025 AMC 10A, 12A, 10B and 12B, the 2025 AIME I and II, the 2024 AMC 10A, 12A, 10B and 12B, and the 2024 AIME I and II, every answer re-checked by computation and every wrong strategy or tag fixed (`CHANGELOG.md` has each). No candidate is open (TQ7, TQ8 and P60 were approved and done, 2026-11-07); the next ids are P61 and TQ9. The helper `node tools/tag-review.js "<paper>" [first] [last]` prints a paper for the pass, with any Alternatively route and its cards shown separately. Planned, not started: T4 (the Practice picker on the tree), T4b (tentative: topic chips from tree nodes, and a way to see a problem's filings), T5 and T6. Nothing in the app reads `tree` yet.
- **Next action (Claude):** T3 continues with the 2023 AMC 10A and 12A, the 2023 AMC 10B and 12B and the 2023 AIME I and II, by "The tagging pass (T3)". The 2026 AMC 10B and 12B come out on 13 November.
- **Codex is active (2026-11-07, at the owner's word):** it is revising AMC Number Theory M1 and M2 (uncommitted; not revised until its commit or PR arrives), then M3. The file division above applies: Claude does not edit `js/data/learn/**` or the generated notes. Codex left `js/app.js`, `tests/book-search.cjs` and `tools/build-book-notes.cjs` to Claude for search work.
- **Reference:** card candidates through P60 are resolved and written (P54, P55, P57, P59, P60 as cards; P56 and P58 as Key forms on existing cards); none is open, and the next is P61. Lab migration (Stage 5, LQ9) is on hold (owner, 2026-10-25).
- **Practice:** Mixed first, then the four subjects; topic search uses Settings-style suggestions. Sets are saved locally, untimed, with AMC choices or AIME integer entry, review flags, and automatic grading from the answer keys on Finish and review; completed sets open a score overview with per-problem review links. A problem with no key is shown as Answer unavailable and is never guessed; new sets require a key. A problem the MAA voided (now 2025 AMC 12A #25) keeps its official letter in the keys' `voided` list, is never drawn into a new set, and is shown as Voided, not graded, in a saved set. Progress export and import preserve sets.
- **Learn:** 13 books (eight AMC and AIME, five Olympiad); 103 teaching chapters with 593 teaching pages (Introductions and Summaries included; Review Problems and Challenge Problems are separate problem sets), plus one reference chapter per book, End-of-book Notes (Overview, Index, Glossary, References and Credits; 52 sections, no difficulty tags, not counted with the teaching material). `build-learn-shelf.py --check` reports 116 chapter files and 645 lesson records because it includes the reference sections. Every teaching chapter runs X.1 Introduction, lessons, Summary, Review Problems, Challenge Problems; lessons carry Core, Core II or Extension (CONVENTIONS §14).
- **Textbook content revision (step 2; Codex; `TEXTBOOK-REVISION.md`):** completed for AMC Algebra L1 to L14 (the latest batch, L12 to L14, merged through PR #224). In progress: AMC Number Theory from M1, not marked revised until its batch is committed. The other books still need the pass.
- **Search:** the main search puts cards first, then strong title matches among lessons and chapters (they lead when the query says "lesson" or "chapter" or is a lesson code), and a CONTEST result for a named paper. Book search (Search this book...) is scoped to the current book and lists chapters, single lessons and glossary terms in one ranked list (2026-11-07); a glossary result opens the Glossary at its definition, and an exact chapter title still ranks first.
- **Open, minor:** `check-labels.py` on Linux Chromium reports 10 far-move and 11 on-stroke findings in unchanged figures, font differences from the Mac baseline of 7.
- **For the owner to try now:** Search this book... with a lesson title or a glossary term; a practice set; the app on a phone.

## The road ahead: the Learn track

The model (the owner's blueprint, "Learn + Practice for Competition Math Reference"): **Reference** (the cards) stores the mathematics, **Learn** organizes how a student acquires it, and **Practice** is for solving problems on your own.

**Limits every step keeps (standing preferences):**
- no global problem search, no general in-app find, no hints, no level filter; the explicitly requested book-scoped chapter search is implemented;
- one fact, one home for the reference: the cards stay the compact statement of each fact; a lesson may define, derive and prove what a coherent explanation needs, links the canonical card, and never copies its text;
- every number checked by computation;
- a lesson problem is chosen because its written route uses the lesson's cards, never because of tags alone or LIVE's concepts.

### Done (2026-10-31; `CHANGELOG.md` has the detail)
- **L0 to L4:** the plan trimmed; the owner's decisions (LQ1 to LQ10 in `QUESTIONS.md`); the shelf outline (`LEARN-OUTLINE.md`); the content model and addresses (CONVENTIONS §14); the Learn button and the Lists move.
- **L5, the shell:** routes `#/learn/<book>`, `.../how-to-use`, `.../<chapter>`, `.../<n>`, `.../review`, `.../challenge`; the gate `tools/check-learn.js` (run by `build-learn-shelf.py --check`, in `gates.sh`); progress in `mq-learn`, carried by Export and Import.
- **L6 and L9, the writing:** every planned book written. The owner's later decisions replaced parts of the first design: LQ5's typed checks and math keyboard were dropped for problems with worked solutions; the lesson standard became one flowing explanation; the chapter structure above replaced the overview page and chapter review.
- **L10, the home page:** redesigned twice; done.

### The order of work

1. **Step T, the topic tree and the problem-tagging pass: the immediate priority (owner, 2026-11-06).** Replace Practice's topic list (every card name and keyword) with one classification of contest mathematics in four trees, one per subject, each Subject › Area › Topic › Subtopic (owner: topics need subtopics). Every problem files under at least one node (usually one or two, at most three). The tree then serves Practice sets (pick any node; the set draws from its whole subtree), problem labels (topic breadcrumbs on a problem's page and in practice review) and contest profiles. The draft and its rules are in `TOPIC-TREE.md`.
   - T1, draft the tree for the owner's review (done; decisions in `TOPIC-TREE.md`);
   - T2, the data (done 2026-11-07): `js/data/topic-tree.js`, built from `TOPIC-TREE.md` by `tools/build-topic-tree.py`; `js/data/topic-homes.js`, a home node for every formula and pattern card and for the 139 methods that belong to one area (30 general methods have `null`); the gate `tools/check-topic-tree.js`, in `gates.sh`, which also checks problems' `tree` fields; documented in CONVENTIONS §15;
   - T3, the tagging pass: every problem read and tagged by the procedure below;
   - T4, the Practice topic picker uses the tree only (card names are not topics for now);
   - T4b (tentative, owner, 2026-11-07; a small nice-to-have, not a big change): tree nodes give problems their topic chips automatically, so a problem filed under "Similar triangles" shows a "similar triangles" chip; this would replace, or sit beside, the chips now derived from card topics, which can mislead (2026 AMC 10A #3 shows "angles" only because the similarity card is filed under angles). Also a way to see a problem's tree filings in the app; how is to be decided later;
   - T5, topic labels on problems;
   - T6, the tree in contest profiles.
2. **Review and revise the written content (started 2026-11-07 on `codex/textbook-revision`; `TEXTBOOK-REVISION.md`).** Each lesson should read like a textbook someone learns from: a connected explanation that defines ideas before using them, develops and justifies each step, and states where an identity or model stops working, not a question followed by a list of cards with a line each. Olympiad Geometry O3 to O7 are the model. Review the mathematics and worked solutions in all 13 textbooks, add diagrams where they explain a construction, reveal why a step works or make a relationship easier to see, and reconcile the outline, status notes and documentation with the app. Every book ends with End-of-book Notes (done).
3. **Polish the experience.** Review search, navigation, readability and mobile usability across Learn, Formulas, Methods, Patterns and Practice. Follow real study paths between spaces, including a reader returning to an open solution or following a card to its lesson.
4. **Consider small study features.** Practice a topic now has locally saved sessions and a problem-by-problem review interface, with automatic grading and no timer. Remaining possibilities include reviewing study history and sharing lists. Practice sets should help readers choose and work through problems at their own pace. Competitive contests, rankings and account systems are outside this roadmap.

### The tagging pass (T3): the procedure (owner, 2026-11-06)

**Be critical, not passive (owner, 2026-11-07).** Look for errors in every problem's strategy, tags and filing. When nothing really fits, say so (a `QUESTIONS.md` row) rather than settle for the best-fitting tag or node; a near miss is recorded, never hidden.

One problem at a time, a paper at a time, newest papers first (they are the most practised), the AMC 10 and 12 twins of a year together, then the AIME, then the AMC 8. For each problem:

1. **Read** the statement and the written strategy. If the strategy is wrong or a number in it is off, fix it (every number checked by computation).
2. **File it in the tree.** `tools/tag-review.js` shows the problem's cards and their home nodes as proposals; never accept a proposal without reading the problem. Choose one to three nodes, the most specific that describe it; twins on the AMC 10 and 12 get the same nodes. The nodes go in a `tree` field on the problem's entry in `problem-db.js`.
   - If no node fits and the kind of problem clearly recurs (the archetype rule, about five or more problems), add a row to `QUESTIONS.md`, "Topic-tree candidates from the tagging pass" (next TQ-number), and file the problem under the nearest broader node meanwhile. A kind seen once is not a candidate.
3. **Check the card tags** (`formulas`, `trickFormulas`): a card goes on only where the written route really uses it (standing rule), and a wrong tag comes off.
   - A formula, method or pattern the route uses that **is** in the app but not tagged: add the tag (on both twins).
   - One that is **not** in the app: add a row to `QUESTIONS.md`, "Candidate new cards from the practice pass" (next P-number, at the top), even when it is a somewhat fringe configuration (pattern) or step (method), so the owner can judge its importance (owner, 2026-11-06; for this pass this replaces the earlier pre-filtering by importance). The row names every problem seen so far that needs it, which is the evidence for its importance, and states the fact or move without referring to the problem (CONTRIBUTING, "Recording missing coverage": one problem's move is a worked example, not a card). Results never used in contests (Dirac, the Prime Number Theorem estimate) still stay out. The problem cites the nearest card meanwhile.
4. **Draw a missing figure.** When the statement shows no figure and one would really help, mostly geometry and geometric probability (the region whose area is the probability), draw it in `js/data/diagrams/problem-diagrams.js` with the geometry kit: every point constructed from the problem's own numbers and an `ok` self-check. Be reasonable: a short computation that needs no picture gets none, and a statement that already prints a figure never gets a second (the statements gate enforces it).
5. **Audit the paper** with `node tools/tree-audit.js "<paper>"`: it lists filings on a broad parent node and card homes the filing does not cover. Read each prompt against the problem; most are tools used in passing, some are a missing topic. It cannot see a central idea that no cited card points to, so the reading in steps 1 to 3 stays the main check (an outside review found such a miss, symmetry in 2025 AMC 10B #21).
6. **Hand off** about every 25 problems (standing preference): run the gates, update "Current state" and `CHANGELOG.md`, commit and push. `QUESTIONS.md` rows are batched for the owner, never asked one at a time.

Revisions to the request, and why: the topic nodes live on the problem entries (one fact, one home) rather than in the tree file; proposals from card homes make filing fast but are always read, because a card's home is only a guess about a problem; and a fringe candidate is written down rather than filtered, but with its list of problems, so the owner sees at once whether it recurs.

The lab migration remains on hold. Lessons and chapters are in the main search (owner, 2026-11-06), strong title matches only; book-scoped chapter search stays separate.

## Where things are

- Project: the current repository checkout, on the branch the session names. Paths vary by environment; `~/Downloads/competition-math-reference` is the previously recorded Mac location.
- Code and data: a static JS site with `js/app.js`, `css/styles.css`, data in `js/data/`, write-ups in `js/data/details/`, and the gates in `tools/` (`./tools/gates.sh` runs them; the list is in `CLAUDE.md`).
- Recorded deployment addresses (availability is not checked by repository gates): https://almond200.github.io/CompMath2.0/ (repo `Almond200/CompMath2.0`) and https://competition-math-reference.vercel.app/.
- Helpers: `tools/learn-coverage.js` (the outline's coverage), `tools/add-cards.py`, `tools/add-to-list.py`, `tools/add-tag.js`, `tools/bump-versions.py --changed`, `tools/check-pages.js`, `tools/practice-scan.js`, `tools/show.js` (README, Structure).
- LIVE's concept tags are in `tools/live-cache/`. Use them as hints only.
- Plain writing goes ahead without asking. The owner is asked only about new cards, judgment calls in `QUESTIONS.md`, and real choices.
