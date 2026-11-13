# Competition Math Reference

A searchable reference for AMC 10/12, AIME and olympiad training. 774 cards
covering formulas, methods, and patterns (553 formulas, 172 methods, 49 patterns), plus a database
of 4,725 past contest problems (4,715 with their full statements), every one with a written
strategy and 4,276 cross-linked to the cards their solutions run through (counts checked 2026-11-08).
Mock contests also have ten separately attributed author-restated HMMT prompts and verified answer values.

Static, with no application backend or required build step. KaTeX 0.16.11 and its fonts are
vendored under `vendor/katex/`; statement scripts and semantic vectors load on demand from
the same site. A complete local copy can be served offline. A hosted page is not guaranteed
to work offline merely because it was visited once; external AoPS links require a connection.

## Practice a topic

Search for a subject or technique, choose a question count and difficulty, then generate an
untimed practice set. Difficulty offers **Any**, **Very easy**, **Easy**, **Medium**, **Hard** and
**Very hard**, using Elo ratings to select roughly a fifth of the chosen contest or topic
at each level. Any applies no difficulty restriction. Generated sets run from lowest to highest Elo. Ratings come from LIVE, with clearly
recorded manual estimates for problems it has not rated; [rating data and refresh details](DIFFICULTY-RATINGS.md).
Choose **Mixed** to draw from all topics; it appears first, followed by the four
default subjects when the topic search is empty. AMC problems use A–E choices; AIME problems accept integers from 000 to
999. Answers save automatically on this device. Double-click a selected choice to clear it.
Save and exit and Back to Practice both preserve progress. **Resume a set** and **Completed sets**, below Contests,
contain unfinished and finished practice and mock sets respectively. Each group shows at most two rows,
with its own full-width **Show all / Show less** control.

Finish and review grades against imported answer keys and opens a results overview with your
score and correct, incorrect and unanswered totals. Each result links to its detailed review. Review keeps your submitted selection,
shows Correct, Incorrect or Unanswered, and separates the problem statement from the result
and explanation. On review pages, **Back to Results overview** above **Back to Practice**,
and the **Results overview** button in the header, return to that set's results. How this problem works uses the same strategy, Pattern/Method/Formulas chain
and textbook links as the problem page. Answer keys come from LIVE by Po-Shen Loh and are
matched to the local problem statements before import. New sets only draw problems with a key.
Older saved problems without a matching key are explicitly labeled Answer unavailable: the key is
missing, so the answer is not guessed. A problem the MAA voided (now 2025 AMC 12A #25) is a
different case: its official letter is kept in the keys' `voided` list, new sets never draw it,
and a saved set shows it as Voided, not graded.

Topic practice sets have no timer or timer setting. Export progress and Import progress include
saved practice and mock sets, keeping the newest version of each. Clearing browser data removes the local copy.

## Practice a contest

A separate panel below Practice a topic lets you take a **past contest** or **generate a mock**
for AMC 8, AMC 10, AMC 12 or AIME. Past papers retain their original question order. Generated
mocks match the average recent difficulty curve using older problems from any contest, with
the 2019 HMMT Geometry round explicitly allowed too, and run from lowest to highest Elo. Each
question retains its original answer format; sources appear during review.

Mock sets have a countdown (40 minutes for AMC 8, 75 for AMC 10/12, 180 for historical AIME),
which pauses when you leave or hide the page and resumes when you return. At zero, the mock
automatically finishes and grades. Results show the target contest's scoring, time used and
per-problem review. [Mock generation, scoring and source details](MOCK-CONTESTS.md).

## Four content kinds, five spaces

> Formulas tell you what is true; Methods tell you what you can do; Patterns tell you what you
> are looking at; Problems teach you to connect the three.

Cards are formulas, methods or patterns; problems are separate database entries. Learn organizes
the material into textbooks and lists. The top bar switches between five spaces:

| Space | Kind | Subtitle | Colour |
|---|---|---|---|
| **Formulas** | one fact: a theorem, identity or standard result | Theorems and identities | blue |
| **Methods** | one reusable move, made once you are inside a problem | Moves that make progress | teal |
| **Patterns** | one recurring problem shape, recognizable from the statement | Problem shapes to recognize | amber |
| **Learn** | textbooks (books, chapters, lessons) and the study lists | Textbooks, lesson by lesson | green |
| **Practice** | real contest problems | Real contest problems | purple |

A pattern *suggests* methods, a method *uses* formulas, and problems practise all three
(derived from their tags). The test that separates the middle two: a pattern describes a whole
problem you can recognize from its statement, a method describes a move you make inside one.
CONVENTIONS §0 has the full model.

**Pages.**

- **Front page** (no hash): the top bar, a one-line title, a strip of the five spaces, then a main
  column (Recently opened, the Problem of the day with its statement, Newest cards, Practice at a glance
  with See all) and a rail (Textbooks with See all, the Card of the day, Did you know?, your
  library), divided by hairlines. On a phone it is one column in its own order: Recently opened, Did you
  know?, your library, the Problem of the day, the Card of the day, Newest cards, the contests,
  Textbooks.
- **No main page for Formulas, Methods or Patterns.** `#/formulas`, `#/methods` and `#/patterns`
  (and the switcher buttons) open the subject last visited in that space, Geometry the first
  time. The small "i" beside the space's name in the sidebar opens a centered dialog, like
  Filters, with what the space is for and what was recently opened in it.
- **Subject pages** (`#/formulas/geometry`, `#/methods/algebra`): one scrolling page, every group
  (a formula topic, a method group, a pattern family) under its own heading and one-line
  `blurb`. A group's address (`#/formulas/geometry/circles`) opens the subject at that heading;
  so do the sidebar's group links. The sidebar shows only the current space; clicking the open
  subject's header folds it.
- **Problem pages** (`#/problem/<slug>`): a subject chip and topic chips, the statement with its
  figures (AMC and AIME problems; other contests link out), then "How this problem
  works", opened and closed with "+ Show" / "− Hide" beside its heading, which holds any figure we
  drew, the strategy, and the chain of cards the problem uses (Pattern → Method → Formulas).
- **Learn** (`#/learn`) opens with 13 textbooks across the AMC, AIME and Olympiad tracks.
  The shelf comes from `js/data/learn/shelf.js`, generated from `LEARN-OUTLINE.md`. Below it,
  Lists holds your own lists and the built-in study lists. Use the green + to create a list.
  On its page (`#/list/<id>`), you can add a description under the title and search for cards.
  With eight or more cards, **Auto group** organizes the list automatically; later additions wait under
  **New cards** until **Regroup**. **Custom group** opens the section editor, with drag/move, search,
  selection and Undo/Redo. **Edit groups** reopens it; **Ungroup** sets its sections aside for reuse.
  **Export** saves a list, including its sections; the green + also imports exported lists.
  A list with named sections has an **On this list**
  sidebar. Its page tools follow the same setting as card pages. A book's contents (`#/learn/<book>`) open with Contents and
  Introduction and How to Use This Book (`.../how-to-use`), where the Core, Core II and Extension
  tags are explained with visible badges. **Search this book...**, below the book subtitle and
  in the right half of desktop chapter navigation (a separate field on mobile), lists chapters,
  single lessons, glossary terms and actual Index entries in one ranked list, from titles, lesson
  headings, related concepts, indexed terms and lesson text. One Index result per matching term
  opens its complete list of lesson locations in that book, below the first two other relevant
  results when available. Index and Glossary results scroll to, focus and briefly highlight the
  exact entry; reduced-motion readers get a static highlight. A lesson code such as R3.4 opens that lesson. It supports prefixes, synonyms and small typos,
  with keyboard-selectable suggestions scoped to the current book. A lesson (`.../c5/2`) shows its cards,
  one flowing explanation, related cards, its own problems with worked solutions, contest
  problems, and a drawer for the cards it links. The 13 books have 103 teaching chapters, which open on
  an Introduction and close with a Summary, Review Problems and Challenge Problems (CONVENTIONS §14);
  the 593 teaching pages count the Introductions and Summaries, not the Review and Challenge sets.
  Each book ends with End-of-book Notes, reference sections rather than a teaching chapter:
  Overview, an Index whose entries link to lessons, a Glossary, and References and Credits. They
  are 13 reference chapters with 52 sections, not counted with the teaching pages (the shelf gate's
  116 chapters and 645 lesson records include them), and they carry no difficulty tags.
- **Practice** (`#/practice`): four matching panels for a random problem, untimed topic sets, timed past-paper/generated mocks, and browsing contest years, followed by Resume a set and Completed sets. Topic options come from the topic tree; a branch includes every subtopic, with available counts and difficulty-based set-size limits. Finish and review confirms only when non-voided questions remain unanswered; fully answered sets submit directly. Active answers have a small Clear answer button. A contest year (`#/problems/aime/2024`) opens as a plain page with a link
  back; on a phone its years are a menu between arrows, with a toggle between the year's papers.
- **Search** results are one list in order of relevance (formulas, methods, patterns, problems
  and study lists, each labelled), shown full width with no space highlighted. So are tag pages
  and special pages. A query naming a paper without a problem number ("2025 AIME I") leads with
  a CONTEST result that opens that paper (`#/problems/aime/2025/aime-i`). A textbook named in
  full ("AMC Algebra", or "AMC 10 Algebra") is a BOOK result listing its first four chapters. Lessons and chapters
  matching the query's title words are a second tier: after the cards named for the query,
  ahead of loosely related cards, or first when the query says "lesson" or "chapter" (or is a
  lesson code such as C5.3). Book, chapter and lesson results show their place as a breadcrumb
  ("Textbooks › AMC Algebra", "AMC Geometry › Chapter 5 › S5.5"), as cards do.

## Credits

AMC and AIME problems are © the Mathematical Association of America and are shown under
the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) licence the MAA confirmed
by email (Oct 2026). The statements and their figures are read from [LIVE by Po-Shen Loh](https://live.poshenloh.com/past-contests),
which publishes every AMC and AIME problem with the MAA's permission; Settings → Credits and attribution holds the shared credit and source links. This app is non-commercial. `tools/fetch-live-statements.py` fetches them (statements and
answer choices only, never solutions or hints) into `js/data/problems/statements/<year>.js` and `js/data/problems/figures/`.
Some manually imported statements retain their recorded PDF or AoPS provenance; see
`tools/manual_statements.py`. The 2026 AMC 10A and 12A, added before LIVE published them, come
from the [Random Math wiki](https://wiki.randommath.com/), with their answer keys checked against
[Think Academy](https://www.thethinkacademy.com/)'s published keys (CONVENTIONS §11). AoPS remains a linked source for additional solutions.

Addresses are real, so Back, Forward and bookmarks work; a revisited history entry returns to
where it was left, a fresh click opens at the top. The first redesign's addresses
(`#/reference/...`, `#/solving/...`, `#/lists`, `#/problems`) redirect.

In the data, Methods and Patterns are one section each in `js/data/patterns.js` (group
`"tools"`), with the subjects as subsections and `groups` (each with a `blurb`) inside them;
formula topics carry their `blurb` on the subsection. `bookOf`, `SPACES`, `sectionHash` and
`getRoute` in `js/app.js` map all of it to the spaces and addresses above.

## Search

Hybrid retrieval, rebuilt from scratch and measured rather than tuned by eye.

- **Lexical**: BM25F over eight weighted fields (name, keywords, concepts, latex,
  description, section context, glossary, body), with fields combined as *strongest plus a
  fraction of the rest* rather than summed.
- **Phrase matching**: adjacent word pairs indexed with their own document-frequency
  table, including pairs from a spoken rendering of each formula, so "two pi r" finds
  the circumference.
- **Semantic**: static distilled embeddings (256-dim int8, ~17k words, four vectors per
  card), lazily fetched on first search and degrading silently to lexical-only if absent.
- **Fusion**: reciprocal rank fusion, gated on query length, lexical margin and semantic
  confidence, so short exact queries are left alone and paraphrases get help.
- **Spelling correction** resolves an unknown token to its nearest corpus word. Distance is
  optimal string alignment, so a swapped pair of letters ("descrates") costs one edit, not two.

Press `/` to focus the box, `Esc` to clear. A query that starts with `Special:` is a command
instead of a search (see Special pages below).

`tools/search-eval.html` runs 187 labelled queries against the live app and diffs every one
against `tools/eval-baseline.json`. Latest warm run (2026-11-08, full 774-card rebuild): **160/187 top-1, 181/187 top-3, MRR 0.910**. The preceding stale 765-card index also scored 160/187 against the current app; rebuilding restores coverage of nine newer cards while preserving that top-1 result. The baseline records the refreshed index. `tests/book-search.cjs` now checks exact corpus coverage and agreement between the JSON, binary and script fallback.

The index can be rebuilt in the cloud or on the Mac (CONVENTIONS §13). Historical runs used different app/corpus snapshots: 157/187, MRR 0.906 for 765 cards on 2026-10-30, and a best recorded Mac run of 170/185, MRR 0.950 on an older query set. Those are historical comparisons, not the latest result.
**Wait for the semantic vectors to load before reading results**, or the run under-reports
by a point or two; compare warm runs to warm runs.

## Other features

- **Contest tiers** label every card with where it is first needed: AMC (AMC 10 and 12 problems 1 to
  25), AIME Early (AIME 1 to 10), AIME Late (AIME 11 to 15), or Olympiad, and with its importance
  within its subsection (`high` down to `lowest`); the card's split tag shows both. One filter,
  behind the funnel in the top bar, narrows every list by tier and importance.
- **Problems**, reached from Practice by contest and year (AMC 8, AMC 10, AMC 12, then AIME), each
  linked to the cards its solution uses, with a pattern, method and formula chain and a strategy,
  closed until Show is pressed by default, or open at once (Settings, Practice).
- **Study lists**, under Learn, hold 37 built-in sets alongside your own. The twelve study
  routes (AMC, AIME and Olympiad, each by subject) are *complete by construction*: every card
  of that tier and subject is in its route, which `tools/check-lists.py` enforces; the other 25
  are study lists on one theme (the four By Contest lists were removed on 2026-10-31). A list
  you build yourself offers **Auto group** at eight cards and **Custom group** for your own named sections.
  Automatic matching uses the hand-written sections in built-in lists; later additions wait for **Regroup**.
  The custom editor supports descriptions, drag/move, add/remove, Undo/Redo and list import/export.
- **Diagrams** are computed from exact geometry rather than sketched, so every point is a
  true intersection, foot or tangency. Settings can show figures on the card faces too (off or on), and long write-ups place further figures inside the text, next to the
  paragraph each one illustrates (210 on 182 cards). Problems printed without a figure get one
  drawn for the app (350 so far), shown only inside How this problem works, since a contestant
  would not have it.
- **Connected formulas.** A few broad cards (auxiliary lines, p-adic valuation, the mean chain,
  modular basics and fourteen more; 18 hubs, 96 links) end with a hand-picked row of the cards that are part of the
  same idea: LTE, Legendre and Kummer under p-adic valuation, the construction cards under
  auxiliary lines. It is curated and means "these belong to this card". Like Used by methods, it is
  a row of blue links that open a hover preview. The list is
  `js/data/connected.js`. (A computed "Related" row of nearby cards used to sit beside it; it was
  removed in October 2026 as more noise than help.)
- **Interactive widgets** on selected cards (75 geometry widgets you drag, 39 others you set): drag
  the vertices and watch the invariant hold.
- **Browse by Tag** (the button beside the search box) picks one tag or several and opens the
  tag page, the same page a card's topic chips open (`#/tag/<label>`): every card carrying them,
  cards matching more of the chosen tags first.
- **Settings** (`#/settings`, the gear in the top bar), in panels:
  - Appearance: theme, density (Comfortable, Spacious or Compact: the spacing of the whole app), card
    size (regular, or large, one across), and text size.
  - Reading the math: **formula lines** (1, 2, 3, or All: the most rows of a card's formulas a
    browsing card shows; a card's own page always shows all), keyword tags, **notation** (in the
    expanded form, every formula box and Key forms bullet with a sigma or product sign shows its
    terms written out), figures on card faces, the page-tools column, and scroll speed.
  - Browsing: subject pages (cards or a wiki-style A-Z index), card order (Curated or Most used),
    and where the app opens.
  - Learn: what a card's name does in a lesson (opens in the lesson, or opens its page).
  - Practice: the strategy on a problem page (Click to show, the default, or Shown).
  - Commands, and **Your progress**: Export writes everything the app keeps in this browser
    (lists, stars, settings, theme, recent pages, flashcard and quiz progress, Learn notes
    and progress, and saved practice sets) to one versioned
    JSON file (`competition-math-reference/progress`, version 1); Import merges its lists into
    yours, keeps the newest version of each practice set, and replaces other imported keys.

  Every setting lists its default first. A search box under the title finds a setting by its
  name or everyday words ("dark mode", "font size", "export data") and underlines it once
  scrolled to. On a wide window, a fixed preview panel on the right, behind a line midway between
  the settings and the screens, shows three of five screens at a time (cards while browsing, a
  card's page, a subject page, a problem page, a lesson), drawn by the pages' own code, with an
  arrow on each side; pointing at a setting brings the screen it changes into view.
- **Special pages**, run from the search box or from Settings → Commands, in the style of
  Wikipedia's: `Special:Random`, `Special:RandomProblem/<contest>`, `Special:RandomStarred`,
  `Special:WhatLinksHere/<card>`, `Special:AllPages` (an A-Z index with a letter bar),
  `Special:LonelyPages`, `Special:Statistics`, `Special:Search/<query>`,
  `Special:Browse/<filters>` (every card of a kind, subject, contest tier, or level, given in any
  order, as in `Special:Browse/Method/Geometry`), `Special:ProblemsUsing/<card>`,
  `Special:Unclassified` (problems still waiting for a card), `Special:Recent`, and `Special:NewCards`
  (the latest batch of new cards, in the order written; `Special:NewCards/All` lists every batch).
  `Special:Random` takes the same filters as Browse. Typing `Special:`
  opens a dropdown of the best matches, commands first and then their arguments (a contest, a
  card), which closes when you click away; every special page links back to the command list.
- **Experimental** pages, linked only from Settings, in `lab/`, opening in their own tab and loading only the data
  files so they cannot destabilise the app: a **Formula Web** that draws every card as a
  node and traces the shortest chain of authored links between any two, a **Quiz** that
  shows a statement and figure and asks you to name it, and **Flashcards**, a spaced-repetition
  review (a small SM-2: Again, Hard, Good, Easy) over any section or list, name to statement,
  statement to name, or both, scheduled separately per direction and kept in this browser, and the **Topic tree**, the draft classification of contest mathematics (`TOPIC-TREE.md`, read live), as an outline or a drawn tree per subject.
- Light and dark themes; KaTeX throughout. Card faces carry the star and add-to-list buttons;
  Copy LaTeX and Copy Asymptote are on each card's own page.

## Running

```sh
python3 -m http.server 8688
```

then open `http://localhost:8688`. A local HTTP server is the recommended way to test the app.
Opening `index.html` directly uses a script fallback for semantic vectors (`search-vectors.js`)
instead of `fetch`. If neither vector source loads, search degrades to lexical-only.
Keep the complete asset tree when copying the site for offline use.

## Structure

Start with `CLAUDE.md` and `PLAN.md` (`LEARN-OUTLINE.md` holds the current Learn shelf and historical curriculum rationale; `TOPIC-TREE.md` holds the topic tree, its rules and its test filings). `PLAN.md` opens with "Current state": what is finished, what is in progress, and the next action. It is updated after every major change, so a new chat can pick up from it.

```
index.html                     page shell and script order
css/styles.css                 theme, layout, card and diagram styling
js/app.js                      routing, rendering, and the search engine
js/ui-icons.js                 shared font-independent SVG UI symbols
js/accessibility.js            shared radio/tab keyboard behavior, skip navigation and motion helpers
js/data/geometry.js            formula cards, one file per subject
js/data/algebra.js
js/data/number-theory.js
js/data/counting.js
js/data/patterns.js            the Methods and Patterns books, one section each
js/data/details/*.js           long write-ups, keyed by card id
js/data/examples-supplement.js worked examples, keyed by card id
js/data/diagrams/*.js          computed SVG figures, keyed by card id
js/data/problems/problem-db.js contest problem database: tags, strategies and topic-tree nodes
js/data/problems/difficulty-ratings.js  all 4,725 Elo values, with LIVE/manual provenance
js/problem-difficulty.js       contextual rank quintiles and uniform random selection
js/mock-contests.js            full-paper catalog, recent Elo curves, generation and scoring
js/practice-sessions.js        saved topic/mock sets, answer grading and active-time clocks
js/data/problems/mock-extras.js  ten separately attributed HMMT prompts/answer values
js/data/topic-tree.js          the topic tree, generated from TOPIC-TREE.md by tools/build-topic-tree.py
js/data/topic-homes.js         every card's home node in the topic tree (hand-written)
js/data/problems/*-problems.js per-card practice questions and contest references
js/data/problems/statements/   problem statements by year, loaded on demand
js/data/problems/figures/      the statements' SVG figures
js/data/new-cards.js           the batches Special:NewCards lists
js/data/did-you-know.js        facts written for the Did you know? panel, each tied to its card
js/math-tools.js               the interactive "play with it" widgets on non-geometry cards
js/geo-interactive.js          draggable geometry widgets
js/search-semantic.js          semantic channel (loads js/data/search-vectors.*)
js/data/built-in-lists.js      curated study lists: routes, configurations, curiosities
js/data/connected.js           the Connected formulas rows on broad cards
lab/                           experimental pages (formula web, quiz, flashcards, topic tree) + their shared loader
tools/build-search-index.py    offline: rebuilds the embeddings and glossary
tools/search-eval.html         search relevance harness
tools/validate-problem-db.js   checks every problem's card and topic ids resolve
tools/scan-conventions.py      the census behind CONVENTIONS.md; fails on a broken rule
tools/check-diagrams.py        every figure fits its canvas and no two labels collide
tools/check-labels.py          as rendered in Chrome: no label sits on a dot, a line or another label
tools/check-accessibility.cjs  browser checks for keyboard access, contrast, motion and target sizes
tools/check-book-search.cjs    browser checks for Index/Glossary jumps, focus and highlights
tools/check-ui-icons.cjs       browser checks for SVG centering and icon interactions
tools/check-practice-actions.cjs browser checks for finish confirmation and answer clearing
tools/label-audit.html         the page check-labels drives; #show draws every offending figure
tools/check-lists.py           list ids resolve, every route is complete, Connected formulas resolve
tools/check-topics.py          every card carries a topic chip, and no subsection title awards a wrong one
tools/check-lab.sh             parse-checks the inline script of each lab page
tools/build-topic-tree.py      builds js/data/topic-tree.js from TOPIC-TREE.md (--check: in step)
tools/check-topic-tree.js      the tree is well formed, every card has a home, problems' tree tags are valid
tools/check-statements.py      every statement key and figure resolves, the credit header is present
tools/find-duplicate-forms.py  lists formulas stated on two cards (a report for rule 17)
tools/jsc-node                 stands in for macOS jsc under Node, for the JS checks
tools/gates.sh                 runs every gate above but check-labels, in order, stopping at the first failure
tools/bump-versions.py         bumps ?v= in index.html for changed files (--changed) and syncs the lab pages
tools/check-pages.js           browser check of pages: KaTeX errors, broken links, overflow, at 1280 and 375, light and dark
tools/add-cards.py             inserts a batch of new cards with write-ups, examples and registrations
tools/add-to-list.py           adds cards to a section of a built-in list and keeps its blurb's count true
tools/untagged.js              step D: the next problems without a write-up, newest paper first
tools/near-twins.js            step D: AMC 12 problems whose statement nearly matches a written AMC 10 one
tools/show.js                  prints problem statements by slug
tools/practice-set.js          writes problem entries from a JSON file of edits
tools/add-tag.js               adds a card to problems and to their AMC 10/12 twins
tools/few-tags.js              the tag pass: problems by number of cards cited, with strategies and LIVE hints
tools/practice-gaps.js         cards under two practice problems (--check is a gate)
tools/live-cache/              LIVE's concept tags for every paper (hints only, never a source of tags)
```

Run every checker before committing (the list in CONVENTIONS §7); each gate exits non-zero on a
finding.

A card's write-up, examples and diagram are all keyed by its id in flat maps, so **moving a
card between files only moves the card object**; nothing else needs to follow it.

## Adding a card

```js
{
  id: "unique-kebab-case-id",
  name: "Display Name",
  type: "method",                            // omit for a formula; "method" or "pattern"
  subject: "geometry",                       // required on method/pattern cards
  latex: String.raw`a^2 + b^2 = c^2`,        // String.raw: no backslash-escaping needed
  description: String.raw`Prose; inline math with $...$ works.`,
  keywords: ["search", "terms", "here"],
  importance: "high",                        // high | medium | low | lower | lowest  (lowest = never used on a contest; lower = marginal use)
  tier: "AMC",                               // AMC | AIME Early | AIME Late | Olympiad
  level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME", "Olympiad"]   // any subset
}
```

Drop it into the appropriate subsection's `formulas` array and reload; nav counts, search
index and filters pick it up automatically. Multi-formula `latex` separated by `\qquad`
(or `,`/`;` plus `\quad`) is stacked onto separate lines automatically, and
`\begin{cases}` / `\begin{gathered}` work for explicit layout.

The `subject` field matters: topic chips and the symbol-to-concept rules are gated on it,
so a method filed under Methods or Patterns still resolves against its home subject.

Longer content goes in the id-keyed side files: the write-up in `js/data/details/`, whose
headings depend on the card's kind (CONVENTIONS §2), and a `{ q, s }` pair in
`examples-supplement.js`. A leading `## Key forms` block is pulled out and rendered under the
description; each bullet may carry an explanation after a ` — `, shown as gray subtext. Register
the card in `tools/rewrite-register.json` and in a batch of `js/data/new-cards.js`
(CONVENTIONS, "New cards are registered").

If the `latex` uses `\sum` or `\prod`, add a `latexPlain` right after it with the terms written
out ($a_1 + a_2 + \cdots + a_n$); a Key forms bullet with a sigma writes both forms as
`\alt{sigma form}{written-out form}`. The notation setting picks one, and `scan-conventions.py`
- C5.1's Exercises are basic rather than easy (owner: basic means simple techniques, not an easy problem): 2023 AMC 10A #20 (a 3 x 3 coloring the first squares force), 2023 AIME II #10 (a grid filled by residues), 2026 AIME II #7 (states of a race of coins), replacing three AMC 8 problems. The books stay high level (a standing preference in CLAUDE.md, and CONVENTIONS §14).
- Learn: a lesson's contest problems are headed Exercises (was Contest practice problems), and C5.1 Introduction has Exercises too (1986 AJHSME #9, 2014 AMC 8 #11, 2024 AMC 8 #7: a backward route table, paths avoiding a corner, a tiling invariant); How to Use This Book and the docs say so.
- Docs: PLAN's Current state records the bug-report fixes; CONVENTIONS §13 adds the rules for dialogs, import, and the lab pages' keys and storage.
- Fixes from a user's report, each confirmed first: Import progress is all or nothing (everything staged and the old values kept; on a failed write every key is put back, and the message says whether that worked); the answer parser caps ± at three per item and 24 answers in all (sixteen ± signs had made 65,536); Quiz and Flashcards leave Enter and Space to a focused link or button, and say once when the browser is not saving; Flashcards' Forget this deck clears both directions, its empty session says why (no cards for the direction, new cards set to 0, or all scheduled later) with the next due date from this deck only, its labels are tied to their controls, the setup counts update in place, and the first rating takes the focus after a reveal; Formula Web's search lists its matches with Start and End, so a route can be chosen from the keyboard.
- Accessibility (a user's report): Filters, Browse by tag and a space's "i" box are real modal dialogs: opening one moves the focus into it, Tab and Shift+Tab stay inside, the "/" shortcut is off while it is open, and closing returns the focus to what opened it (not after following a link to a new page). The dialogs say aria-modal, and each filter chip says aria-pressed.
- Docs, a full pass: PLAN's Current state and road ahead rewritten (finished steps folded into one Done list, what replaced the checks and the overview pages, the remaining work in order); LEARN-OUTLINE's status, levels and lesson standard brought to the current format; CONVENTIONS §14 (the C5 chapter shape, the addresses, the rail and the phone view); the README's overview (front page, problem pages, Learn, Practice, Settings); QUESTIONS marks LQ4, LQ5 and LQ8 as later changed; CLAUDE.md notes the phone exception to sticky headers.
fails on a sigma with no written-out twin. To give a broad card a Connected formulas row, add it
to `js/data/connected.js` (CONVENTIONS §12).

## Uploading to GitHub

The app folder is already a git clone of `Almond200/CompMath2.0`, so the steps are the same as in `CONTRIBUTING.md`: open it in GitHub Desktop (File, Add Local Repository), commit, and push; or run `git add -A && git commit -m "..." && git push` in Terminal. Do not drag files into a second folder (Finder moves them), and do not use the web uploader once there are more than 100 files.

## Changelog

[Read the project changelog](CHANGELOG.md).
