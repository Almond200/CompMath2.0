# Competition Math Reference

A searchable reference for AMC 10/12, AIME and olympiad training. 701 cards
covering formulas, methods, and patterns, plus a database of 4,675 past contest problems
(4,616 with their full statements), of which 1,367 have a written strategy and 1,365 are
cross-linked to the cards their solutions run through.

Fully static and fully offline: no build step, no server, and nothing fetched at runtime. KaTeX
0.16.11 is vendored under `vendor/katex/` (its CSS, its JS, and the twenty woff2 faces the CSS
asks for), so the app renders the same on a plane or behind a network that blocks CDNs. It used to
load KaTeX from jsdelivr, where a block meant every formula in the library showed as raw LaTeX.

## Four kinds, four spaces

> Formulas tell you what is true; Methods tell you what you can do; Patterns tell you what you
> are looking at; Problems teach you to connect the three.

Every card is one of four kinds, and each kind has its own space, switched from the top bar:

| Space | Kind | Question | Colour |
|---|---|---|---|
| **Formulas** | one fact: a theorem, identity or standard result | What is true? | blue |
| **Methods** | one reusable move, made once you are inside a problem | What can I do? | teal |
| **Patterns** | one recurring problem shape, recognizable from the statement | What am I looking at? | amber |
| **Practice** | real contest problems, plus the study lists | Can I use it? | purple |

A pattern *suggests* methods, a method *uses* formulas, and problems practise all three
(derived from their tags). The test that separates the middle two: a pattern describes a whole
problem you can recognize from its statement, a method describes a move you make inside one.
CONVENTIONS §0 has the full model.

**Pages.**

- **Front page** (no hash): search, the four spaces, the Pattern → Method → Formula → Problem
  chain that says how they fit, links to every subject of every space, then where you left off,
  the problem and card of the day, and your library. The top bar is hidden here; Settings is
  reached from the gear in the top bar on every other page.
- **No main page for Formulas, Methods or Patterns.** `#/formulas`, `#/methods` and `#/patterns`
  (and the switcher buttons) open the subject last visited in that space, Geometry the first
  time. The small "i" beside the space's name in the sidebar opens a centered dialog, like
  Filters, with what the space is for and what was recently opened in it.
- **Subject pages** (`#/formulas/geometry`, `#/methods/algebra`): one scrolling page, every group
  (a formula topic, a method group, a pattern family) under its own heading and one-line
  `blurb`. A group's address (`#/formulas/geometry/circles`) opens the subject at that heading;
  so do the sidebar's group links. The sidebar shows only the current space; clicking the open
  subject's header folds it.
- **Problem pages** (`#/problem/<slug>`): a subject chip and the contest, the statement with its
  figures and credit line (AMC and AIME problems; other contests link out), then "How this problem
  works", which holds the strategy and the chain of cards the problem uses (Pattern → Method → Formulas).
- **Practice** (`#/practice`): a random problem by contest (or any) and optional difficulty, your lists
  (and a box to make one), every year of every contest, and the study lists. A contest year
  (`#/problems/aime/2024`) and a single list (`#/list/<id>`) open as plain pages with a link back.
- **Search** results are one list in order of relevance (formulas, methods, patterns, problems
  and study lists, each labelled), shown full width with no space highlighted. So are tag pages
  and special pages.

## Credits

AMC and AIME problems are © the Mathematical Association of America and are shown under
the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) licence the MAA confirmed
by email (Oct 2026). The statements and their figures are read from [LIVE by Po-Shen Loh](https://live.poshenloh.com/past-contests),
which publishes every AMC and AIME problem with the MAA's permission; each problem page carries a one-line credit
under the statement. This app is non-commercial. `tools/fetch-live-statements.py` fetches them (statements and
answer choices only, never solutions or hints) into `js/data/problems/statements/<year>.js` and `js/data/problems/figures/`.
(AoPS blocks scripts with a Cloudflare check, so it is not used.)

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
against `tools/eval-baseline.json`. Last run (2026-10-12, from the cloud session): 160/187 top-1,
MRR 0.918. That session cannot rebuild the semantic index, so the newest cards are found by the
lexical search alone until `tools/build-search-index.py` is run on the Mac; the last full warm
run there gave 170/185, MRR 0.950, with the two probe sets at 64/78 and 48/77.
**Wait for the semantic vectors to load before reading results**, or the run under-reports
by a point or two; compare warm runs to warm runs.

## Other features

- **Contest tiers** label every card with where it is first needed: AMC (AMC 10 and 12 problems 1 to
  25), AIME Early (AIME 1 to 10), AIME Late (AIME 11 to 15), or Olympiad, and with its importance
  within its subsection (`high` down to `lowest`); the card's split tag shows both. One filter,
  behind the funnel in the top bar, narrows every list by tier and importance.
- **Problems**, reached from Practice by contest and year, each linked to the cards its
  solution uses, with a pattern, method and formula chain and a strategy that is always shown.
- **Study lists**, also on Practice, hold 36 curated sets alongside your own. The twelve study
  routes (AMC, AIME and Olympiad, each by subject) are *complete by construction*: every card
  of that tier and subject is in its route, which `tools/check-lists.py` enforces; the other 24
  are study lists on one theme. A list
  you build yourself is grouped into sections automatically, by matching its cards against
  the hand-written section headings already used across the built-in lists.
- **Diagrams** are computed from exact geometry rather than sketched, so every point is a
  true intersection, foot or tangency. Settings can show figures on the card faces too (off or on), and long write-ups place further figures inside the text, next to the
  paragraph each one illustrates (210 on 183 cards).
- **Connected formulas.** A few broad cards (auxiliary lines, p-adic valuation, the mean chain,
  modular basics and eleven more) end with a hand-picked row of the cards that are part of the
  same idea: LTE, Legendre and Kummer under p-adic valuation, the construction cards under
  auxiliary lines. It is curated and means "these belong to this card". The list is
  `js/data/connected.js`. (A computed "Related" row of nearby cards used to sit beside it; it was
  removed in October 2026 as more noise than help.)
- **Interactive widgets** on selected cards: drag the vertices and watch the invariant hold.
- **Advanced search** builds a query from tag chips across the whole library.
- **Settings** (`#/settings`, the gear in the top bar) cover theme, density (Comfortable, Spacious or Compact: the
  spacing of the whole app), card size (regular, two across on a laptop, or large, one across), **formula lines** (1, 2, 3, or All: the most rows of a card's formulas a browsing card shows; a card's own page always shows all), text size, scroll speed (Slow, Normal or Fast: how far one wheel step moves a
  page; Normal leaves the browser's own scrolling alone), subject pages (cards or a wiki-style A-Z index), card
  order, keyword chips, figures on card faces (off or on), and **notation**: in the expanded form, every formula
  box and Key forms bullet that uses a sigma or a product sign shows its terms written out. On a
  wide window, a fixed preview panel on the right, behind a dividing line, shows cards while
  browsing, a card's page and a subject page as each setting changes, scaled so all three always
  fit.
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
  statement to name, or both, scheduled separately per direction and kept in this browser.
- Light and dark themes; KaTeX throughout. Card faces carry the star and add-to-list buttons;
  Copy LaTeX and Copy Asymptote are on each card's own page.

## Running

```sh
python3 -m http.server 8688
```

then open `http://localhost:8688`. Opening `index.html` directly also works, except that
the semantic search index cannot be fetched from a `file://` page, so search falls back to
lexical-only. KaTeX is vendored, so math renders offline either way.

## Structure

Start with `CLAUDE.md` and `PLAN.md`. `PLAN.md` opens with "Current state": what is finished, what is in progress, and the next action. It is updated after every major change, so a new chat can pick up from it.

```
index.html                     page shell and script order
css/styles.css                 theme, layout, card and diagram styling
js/app.js                      routing, rendering, and the search engine
js/data/geometry.js            formula cards, one file per subject
js/data/algebra.js
js/data/number-theory.js
js/data/counting.js
js/data/patterns.js            the Methods and Patterns books, one section each
js/data/details/*.js           long write-ups, keyed by card id
js/data/examples-supplement.js worked examples, keyed by card id
js/data/diagrams/*.js          computed SVG figures, keyed by card id
js/data/problems/problem-db.js contest problem database: tags and strategies
js/data/problems/*-problems.js per-card practice questions and contest references
js/data/problems/statements/   problem statements by year, loaded on demand
js/data/problems/figures/      the statements' SVG figures
js/data/new-cards.js           the batches Special:NewCards lists
js/math-tools.js               the interactive "play with it" widgets on non-geometry cards
js/geo-interactive.js          draggable geometry widgets
js/search-semantic.js          semantic channel (loads js/data/search-vectors.*)
js/data/built-in-lists.js      curated study lists: routes, configurations, curiosities
js/data/connected.js           the Connected formulas rows on broad cards
lab/                           experimental pages (formula web, quiz, flashcards) + their shared loader
tools/build-search-index.py    offline: rebuilds the embeddings and glossary
tools/search-eval.html         search relevance harness
tools/validate-problem-db.js   checks every problem's card and topic ids resolve
tools/scan-conventions.py      the census behind CONVENTIONS.md; fails on a broken rule
tools/check-diagrams.py        every figure fits its canvas and no two labels collide
tools/check-labels.py          as rendered in Chrome: no label sits on a dot, a line or another label
tools/label-audit.html         the page check-labels drives; #show draws every offending figure
tools/check-lists.py           list ids resolve, every route is complete, Connected formulas resolve
tools/check-topics.py          every card carries a topic chip, and no subsection title awards a wrong one
tools/check-lab.sh             parse-checks the inline script of each lab page
tools/check-statements.py      every statement key and figure resolves, the credit header is present
tools/find-duplicate-forms.py  lists formulas stated on two cards (a report for rule 17)
tools/jsc-node                 stands in for macOS jsc under Node, for the JS checks
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
fails on a sigma with no written-out twin. To give a broad card a Connected formulas row, add it
to `js/data/connected.js` (CONVENTIONS §12).

## Uploading to GitHub

The app folder is already a git clone of `Almond200/CompMath2.0`, so the steps are the same as in `CONTRIBUTING.md`: open it in GitHub Desktop (File, Add Local Repository), commit, and push; or run `git add -A && git commit -m "..." && git push` in Terminal. Do not drag files into a second folder (Finder moves them), and do not use the web uploader once there are more than 100 files.

## Changelog

**2026-10-12**

- **The plan lives in the repo.** `PLAN.md` holds the app's philosophy, the standing rules, what is finished, and what is left in order (2.4d, 2.4b with a new Olympiad Triangle Lemmas subsection, a scan of the five card files for errors and missing advanced lemmas, a figure line audit, the formula-box audit, the rest of the UI scan, tagging, practice expansion, proof depth, and, not a priority, moving the flashcards and the lab into Practice).
- **`Special:NewCards`.** A new command lists the latest batch of new cards with each card's kind, subject, and group; `Special:NewCards/All` lists every batch, newest first. The batches are recorded in `js/data/new-cards.js`, and `tools/check-lists.py` fails on an id there that is not a card (CONVENTIONS, "New cards are registered").
- **Iran Lemma figure redrawn.** The bisector $BI$ and the contact chord $EF$ stopped short of the point $K$ where they meet. Now the bisector, the chord, and the midline all run to $K$, solid inside the triangle and dashed where they are extended outside it. Tick marks on the two halves of $CA$ and of $CB$ show that the green line joins midpoints. The triangle was reshaped so that $K$ sits clearly outside it, and the self-check now also tests that $K$ lies on all three lines. New shared helpers in `geometry-diagrams.js`: `segIn` (solid inside a shape, dashed outside) and `ticksOn` (equal-segment marks). The rule is in CONVENTIONS, "Lines in figures run to where they meet".
- **The exterior-angle card's zigzag.** The figure of a path bending between two parallel lines followed the triangle proof with no word of introduction. Why it works now explains it: the same move, a parallel through the vertex of the angle, splits the bend into copies of the two end angles, $\angle APB = \angle(\ell, AP) + \angle(m, BP)$. It says how this repeats the exterior-angle argument, and the rule is a Key form. The Useful-observations bullet that restated it is gone.
- **Examples rule amended (Stanley).** Two cards may use the same lengths (the 13-14-15 triangle) when their questions and nuances differ; only a copied question is banned. The scanner gate now fails on shared numbers together with a near-copy question, and lists pairs that share only the numbers.
- **Olympiad geometry, batch 1 (2.4b; written 2026-10-11).** Three new formula cards in Advanced Triangle Theorems, all Olympiad tier, in the Deeper Configurations list:
  - **Perpendicularity Lemma** (medium): $AB \perp CD \iff AC^2 - AD^2 = BC^2 - BD^2$, with the quadrilateral form.
  - **Carnot's Perpendicularity Theorem** (low): perpendiculars at $D, E, F$ concur exactly when $BD^2 - DC^2 + CE^2 - EA^2 + AF^2 - FB^2 = 0$. The older Carnot card is renamed **Carnot's Theorem (Distances to the Sides)** so the two cannot be confused; its id, links, and old name as an alias are kept.
  - **Iran Lemma** (low): $BI$, the contact chord $EF$, and the midline parallel to $AB$ meet at the foot of the perpendicular from $C$ to $BI$.

  Each card has a computed figure with a self-check, a verified example, and a full proof.
- **Olympiad geometry, batch 2 (2.4b).** Three new formula cards, all Olympiad tier and low importance, placed in the Olympiad geometry route:
  - **Steiner's Ratio Theorem for Isogonal Cevians** (Advanced Triangle Theorems): $\frac{BD}{DC} \cdot \frac{BE}{EC} = \frac{AB^2}{AC^2}$ for isogonal cevians, with the converse and the directed form, proved from the Ratio Lemma.
  - **Isogonal Line Lemma** (Derived Triangles & Conjugates): $P = BX \cap CY$ and $Q = BY \cap CX$ give isogonal lines $AP$, $AQ$ whenever $AX$, $AY$ are isogonal, and isogonal conjugates go to isogonal conjugates. Proved by Trigonometric Ceva through the identity $s(P)s(Q) = s(X)s(Y)$.
  - **Linearity of Power of a Point** (Circles): the difference of two powers is linear, equal to $2\,O_1O_2$ times the signed distance to the radical axis, with the weighted-average form, the three-circle identity, and the pencil of circles.

  Each statement was checked numerically on random configurations (2,000 triangles for the first two, 500 circle pairs for the third). The examples are verified by coordinates: $BE = \frac{147}{31}$ for the line $AO$ in a 7-8-9 triangle, $80^\circ$ for the crossing points of $BH$, $CO$, $BO$, $CH$, and the distance $\frac73$ from two tangent lengths. Each card has a computed figure with a self-check.
- **Olympiad geometry, batch 3 (2.4b).** Two new formula cards, Olympiad tier, lower importance:
  - **Humpty and Queue Points** (Triangle Centers & the Euler Line): the foot $X$ of the perpendicular from $H$ to the median lies on $(BHC)$, with $MX \cdot MA = MB^2$, $XB : XC = AB : AC$, and $\angle XBC = \angle MAB$; the second intersection $Q$ of line $MH$ with the circumcircle has $\angle AQH = 90^\circ$. Proved by reflecting in the midpoint $M$.
  - **Desargues Involution Theorem and Its Dual** (Projective Geometry & Cross-Ratio): the conics through four points cut a line in pairs of one involution, with the dual for tangents from a point. Proved through pencils of quadratics and polar reciprocation, with the fixed-point form $\frac1{MQ} - \frac1{MP} = \frac1{MX} - \frac1{MY}$ that generalizes the butterfly.

  Every stated property was checked on thousands of random triangles or configurations; one candidate property (a spiral similarity at $X$) failed the check and was left out. The examples are verified by coordinates ($AX = \frac{6\sqrt{10}}{5}$; $MQ = \frac{30}{19}$ from an explicit circle and chords). The Desargues figure draws each side and diagonal solid inside the circle and dashed out to $\ell$.
- **New Geometry subsection, Olympiad Triangle Lemmas (2.4g, approved).** It sits right after Advanced Triangle Theorems and holds the Incenter–Excenter Lemma, the Iran Lemma, Steiner's Ratio Theorem for Isogonal Cevians, the Isogonal Line Lemma, Humpty and Queue Points, and Carnot's Perpendicularity Theorem (ids unchanged). The Olympiad geometry route has a matching section, 44 cards across 11 sections in all. The Isogonal Line Lemma's formula now stacks on two lines so it fits its box.
- **Card error scan, first findings (2.4c).** Each fix below was checked first:
  - **Euler's Quadrilateral Theorem:** the description used $a, b, c, d$ without saying they are the sides, and said "convex" where the identity holds for every quadrilateral.
  - **Incircle to Excircle Homothety:** used $D$ and $E$ without saying which touch points they are.
  - **Orthic Triangle:** the thumbnail's side, perimeter, and area formulas hold for an acute triangle only, and now say so.
  - **Routh's Theorem:** the description named $x$, $y$, $z$ without their direction. The formula is exact only for $x = \frac{DC}{BD}$, $y = \frac{EA}{CE}$, $z = \frac{FB}{AF}$ (checked on random triangles; the opposite direction is off), which the write-up already used.
  - **De Gua's Theorem:** the description now defines $A_0, \dots, A_3$, $h$, and $a, b, c$ (checked numerically).
  - **Hexagonal Pick:** the sentence that mixed cell unions with center-lattice polygons now says that $k$ cells are $2k$ unit triangles.
  - **More Factorizations Worth Knowing** and **Product of Pairwise Sums:** each restated the other's identity; each identity now stays on its own card, with a pointer from the other.
  - **One home for the triangle-angle identities (rule 17).** Each fact now lives on one card and the others point to it:
    - $a\sin\theta + b\cos\theta$ as one wave: Harmonic Addition (no longer a Key form of Angle Addition);
    - $\tan\frac A2 = \frac{r}{s-a}$ and the half-angle tangent sum: the Half-Angle Tangent Identity (removed from Half Angle, the Squared-Angle Identities, and the R, r & s Identities);
    - the product of three sines $60^\circ$ apart: Evenly-Spaced Angle Products (removed from Triple Angle, whose description now explains the formulas);
    - $\log_a b = \frac{1}{\log_b a}$: Change of Base (removed from the Exponent–Log Swap);
    - $\cos A + \cos B + \cos C = 1 + \frac rR$ and the sine sum: Identities for Angles Summing to $180^\circ$ (removed from Carnot's thumbnail and the R, r & s Identities, which point to it).

    `tools/find-duplicate-forms.py` now also reads $\frac A2$ and $\frac{A}{2}$ as one fraction.
  - **Number theory, counting, methods, and patterns (the rest of the scan).** Every formula was checked, numerically where it is arithmetic. Fixes:
    - **Rule 17 duplicates:** Consecutive Integers Are Coprime (the $k!$ divisibility, pointer added); Vandermonde's Identity and the alternating squared sum (the squared binomial sum, pointer added); Row Sums (the $3^n$ count, pointer added).
    - **Rule 1:** Waiting for Success opened with "E.g."; it now explains $\frac1p$ and the coupon collector first.
    - **Symbols defined:** Tangent Lines from a Point (the center $(h, k)$, the point $(p, q)$, the slope $m$); Vieta Jumping (the equation $a^2 + b^2 = k(ab + 1)$ behind its formula); Circle Inscribed in an Angle ($r$, $d$, $\theta$); Ellipse Tangent to a Line ($F_1'$); A Folded Sheet of Paper ($x$, $y$, $s$).

    No false formula turned up in these files.
  - **Descriptions no longer repeat the formula box (Stanley, approved).** On 47 cards the description restated the thumbnail's formula, usually while defining its symbols. Each now defines the symbols and explains the formula in words, keeping the extra facts that were there, and the finder reports none left. Conditional Probability's thumbnail also dropped Bayes' formula, which is the Bayes card's own; its second form is now the multiplication rule. All 47 pages render with no KaTeX errors.
- **Back keeps its place (Stanley).** Pressing the browser's Back button used to leave the page shifted a little. The saved pixel offset was restored before the math, fonts, and a problem's statement had finished laying out, and the browser's own scroll anchoring then moved it again. Each history entry now also saves an anchor (the element at the top of the view and its distance below the bar), and on Back the app puts that element back in place on every frame for a moment, stopping at the reader's first input. Checked on subject pages and problem pages: the anchor returns to within a pixel.
- **Figures on cards: Off or On (Stanley).** The Curated choice is gone, along with its hand-picked card list (`CARD_DIAGRAM_IDS` in `js/app.js`); a browser that had Curated saved now shows every figure (On).
- **Six cards from the LIVE concept tags (approved 2026-10-11).** All are AMC tier and low importance, judged from the number of LIVE problems tagged with each concept (`tools/importance-proposal.md`):
  - **A Newly Defined Operation** (algebra pattern, Equations with Hidden Structure);
  - **Logical Deduction and Truth-Tellers** (counting pattern, in a new group Logic & Probability Setups);
  - **Making an Organized List** and **Simulating the Process** (counting methods, in a new group Working It Out by Hand);
  - **Coins and Prices** (number-theory pattern, in a new group Whole-Number Totals);
  - **Drawing Without Replacement** (counting pattern).

  Each follows the pattern or method anatomy and has an original example whose answer was confirmed by brute force: $9! + 1$ for a shifted-product operation, three liars, seven integer triangles of perimeter $15$, person $4$ in a circle of ten, eight pencils, and $\frac16$ with $\frac25$ by symmetry. Five of them have a figure of their example; the defined operation is pure algebra and has none. They are placed in the AMC routes.
- **Same Remainder merged (approved 2026-10-11).** The pattern Same Remainder is now part of the method Subtracting Equal Remainders, which carries its keyword; the old id redirects (`MERGED_IDS`).
- **2.4d duplicates finished.**
  - The cotangent identity $\cot A\cot B + \cot B\cot C + \cot C\cot A = 1$ lives only on Identities for Angles Summing to $180^\circ$; The Cotangent Rule points to it.
  - The two-term Brahmagupta–Fibonacci identity left Lagrange's Identity (thumbnail, expanded form, Key forms) for its own card.
  - `tools/find-duplicate-forms.py` now finds no plain duplicate between two cards. The method/formula twins it lists (`lte` and `lte-lemma`, `poly-divisible-linear` and `reduce-divisibility-constant`, `cycle-hunting` and `periodic-sequences`, `area-method` and `cevian-area-ratio`) wait for Stanley, as do the 39 cards whose description restates a thumbnail formula while defining its symbols.
- **Figure line audit (2.4f).** `check-diagrams.py` gained two gates: a line that stops short of a dot on its extension fails (the Iran Lemma defect; 15 reviewed panels where the dot only happens to be near a line's extension are allowlisted), and raw TeX in a label or caption (`d_b`, `I_A`, `e^(iθ)`, `ω^k`) fails. All 584 figures were then reviewed on contact sheets, with every number in a caption recomputed. Fixes:
  - lines run to their points: the Power of a Point secant now reaches C; Desargues's Theorem redrawn with two separate triangles whose sides run (dashed) to the three points on the axis;
  - wrong drawings: the Poncelet triangles never touched the inner circle (the tangent angle used arccos instead of arcsin), now fixed with a self-check on the closing side; the domino board drew its two removed dark corners as light squares;
  - legibility: tick marks on the Midsegment and Centroid figures, mass-point badges moved off the vertex labels, the Miquel quadrilateral fitted so no circle is cut off by the frame, the Pappus centroid label moved off its dot, and about fifteen labels and captions given real subscripts and superscripts;
  - the Pythagorean Theorem's lead figure is now the squares on the three sides of a 3-4-5 triangle instead of a bare triangle.
- **New cards from the card-file scan, batch 1 (approved by Stanley 2026-10-12).** All Olympiad tier, registered for `Special:NewCards`:
  - **Shooting Lemma** (formula, Olympiad Triangle Lemmas, low): a circle tangent to a chord $BC$ at $D$ and to the circle at $T$ has $TD$ through the midpoint $M$ of the far arc, with $MD \cdot MT = MB^2$. The card is explicit about which arc, the one not containing $T$, since that is the usual slip.
  - **The Dumpty Point** (formula, Olympiad Triangle Lemmas, lower): the midpoint of the symmedian chord, on $(BOC)$, center of the spiral similarity $B \to A$, $A \to C$, with $DA^2 = DB \cdot DC$ and $AM \cdot AK = bc$.
  - **$\sqrt{bc}$ Inversion** (method, Transformations & Inversion, low): inversion at $A$ with radius $\sqrt{bc}$ followed by reflection in the bisector, with its dictionary ($B \leftrightarrow C$, circumcircle $\leftrightarrow BC$, $I \leftrightarrow I_A$, altitude foot $\leftrightarrow$ antipode, $M \leftrightarrow K$), each pair proved.

  Every statement was checked numerically on 2,000 random triangles, and the examples were confirmed by coordinates ($DT = 3\sqrt5$; $AK = 11$, $DB = \frac72$, $DC = \frac{121}{14}$ in the 7-11-12 triangle; $AI_A = \frac{20\sqrt3}{3}$). Each card has a computed figure with a self-check. The Circle Inversion method's example was a copy of the Inversion Facts example (the same distances and question); it now asks for the image of a circle through the center instead.
- **New cards from the card-file scan, batch 2.** AIME Late tier, registered for `Special:NewCards`:
  - **Van Aubel's Theorem for Cevians** (formula, Advanced Triangle Theorems, low): $\frac{AP}{PD} = \frac{AF}{FB} + \frac{AE}{EC}$, proved by areas, with the companion $\sum \frac{PD}{AD} = 1$ and the mass-point reading. The quadrilateral Van Aubel card keeps its name; each points to the other.
  - **Archimedes' Broken Chord Theorem** (formula, Circles, lower): the foot from the arc midpoint bisects the broken chord, with $MC^2 - MB^2 = AB \cdot BC$ and the sum-to-product form.
  - **Nesbitt's Inequality** (formula, Inequalities, low): three proofs (AM–HM, Titu, rearrangement), the triangle upper bound $\lt 2$, and the $n$-variable form; the Jensen proof stays on Homogenization, which the card points to.

  Each statement was checked numerically (2,000 random configurations; 100,000 random triples for Nesbitt and its triangle bound), and the examples were confirmed by coordinates ($AP : PD = 7 : 8$; $BF = 3$, $MF = 3\sqrt3$, $MB = 6$).
- **New cards from the card-file scan, batch 3**, registered for `Special:NewCards`:
  - **Injectivity and Surjectivity in Functional Equations** (method, Working with Functions, Olympiad, medium): proving the function one-to-one or onto, then cancelling $f$ or plugging in a zero of $f$. It sits beside Functional Equation Substitution, which covers plugging in values, and gets its own section in the Olympiad Algebra route. The example is an original equation, $f(f(x) + y) = 3x + f(f(y) - 2x)$, solved by surjectivity alone ($f(x) = x + c$).
  - **Cyclotomic Polynomials** (formula, Special Numbers & Sequences, Olympiad, low): the factorization of $x^n - 1$, integer coefficients, the Möbius form, the prime divisors of $\Phi_n(a)$ (proved by the double-root argument), and infinitely many primes $\equiv 1 \pmod n$. The degree identity points to the Totient Divisor Sum instead of restating it. Irreducibility for composite $n$ is stated as a fact without proof, and said so.
  - **Gambler's Ruin** (formula, Probability, AIME Early, low): $\frac kN$ and $\frac{1 - r^k}{1 - r^N}$, the expected durations, and the unbounded game, all from the first-step recurrence. Its example is a biased game ($p = \frac23$: $\frac89$ and $7$ rounds), so it does not repeat the fair walk on the Markov-chain method.

  Checked by computer algebra: the cyclotomic identities for $n \lt 40$, the prime-divisor rule for $n \lt 30$ and $a \lt 40$, the residue class of every prime factor of $n^4 - n^2 + 1$ for $n \lt 3000$, and the gambler's probabilities and durations by solving the first-step systems exactly.
- **New cards from the card-file scan, batch 4** (the last of the twelve approved), registered for `Special:NewCards`:
  - **Strategy Stealing and Symmetry Strategies** (method, Existence Arguments, low): mirroring after taking the center, and the stealing argument, illustrated on Chomp. It joins the AMC Games & Placement section beside labeling positions backward.
  - **Erdős–Ko–Rado Theorem** (formula, Symmetry, Partitions & Posets, Olympiad, lower): $\binom{n - 1}{k - 1}$ for intersecting families with $n \ge 2k$, proved in full by Katona's circle and double counting, with the $n = 2k$ and $n \lt 2k$ cases.
  - **Tiling a Board** (pattern, Strings & Sequences with a Rule, AMC, low): recognizing a covering problem and choosing between a recursion on the end of the board and a coloring argument.

  Checked by exhaustive search: the coin-row game is a first-player win for every length up to $80$, Chomp is a first-player win on every board up to $4 \times 5$ other than one square, the largest intersecting families match $\binom{n - 1}{k - 1}$ for $(n, k)$ up to $(8, 3)$, and the $2 \times 8$ board has $171$ tilings by dominoes and squares.
- **Subject chip on problem pages (2.5a).** Every problem page now opens its chip row with the problem's subject, Algebra, Combinatorics, Geometry, or Number Theory, and more than one when it spans subjects (the subject most of its tags belong to first). The same chip leads the chip row of each problem in a contest's list. The chip is derived, never typed by hand: from the subjects of the problem's tagged cards (Counting & Probability shows as Combinatorics; the proof-method cards carry no subject), then from a round that names its subject (HMMT Geometry), and an entry may override it with `subjects`. A problem with nothing to go on shows no chip until it is tagged, so today 1,365 of the 4,675 problems carry one. `tools/validate-problem-db.js` checks that an override names only the four subjects and keeps the subject of every tagged card, and reports the coverage. The plan also called for LIVE's concept tags as a source for untagged problems, but the LIVE cache lives on the Mac and the site is not reachable from the cloud session, so that source waits for a run there.
- **Formula-box audit (2.4e), approved by Stanley.** Every box was measured at 1280 and 375 px. Nine crowded boxes were trimmed, with each removed row kept in Key forms (Newton's Sums gained $p_4$ there): Order Statistics on $[0, 1]$, Binet's Formula, Sums of Powers of Integers, Vieta's Formulas (Quadratic), Hyperbola Properties, Excentral Triangle, Eccentricity (the four conics now share one row), Polar Coordinates, and Newton's Sums. Twenty-two boxes that ran past three phone widths now break at their natural point inside one `gathered` block, with nothing removed; the Twelvefold Way table is a table and stays as it is. Four boxes that ended a row with a dangling colon were fixed first. Three descriptions that restated their now-shorter box were reworded to define the symbols instead.
- **Consistency scan, first findings (2.1).** Six route and list blurbs stated the wrong number of cards (AMC Algebra, AMC Counting, AIME Geometry, Deeper Configurations, the Area Toolkit, Solid Geometry); they are corrected, and `tools/check-lists.py` now fails when a blurb's stated card or section count differs from the list. The README's opening line still said 557 cards (now 680, and 4,675 problems), CONVENTIONS quoted the 557-card counts as current, and the search-eval line quoted an older run; all are updated. Every purely numeric equation in the cards, write-ups, examples, and strategies (1,246 of them) was evaluated by computer algebra, and none is wrong.
- **Consistency scan, second findings (2.1).** Three geometry cards (Golden Ratio & the Regular Pentagon, Isosceles Tetrahedron, Tetrahedron Centroid & Medians) still had the old write-up headings (How to use it, On contests) and were missing from the conversion register; they now have the formula layout, with their old sections recorded in the migration ledger. Sum of Largest Odd Divisors had no Conditions or Contest profile, and the Chinese Remainder Theorem for Polynomials no Applications or Contest profile; both are added. The README no longer names MATHCOUNTS, says the strategy is always shown, describes the one tier-and-importance filter, counts 36 study lists with 12 routes, lists the problem page in its current order, and its Structure list names the statements, new-cards, widget, and checker files that were missing. CONVENTIONS §2 lists the headings each kind of card uses (it still showed the old three), and §7 adds `check-statements.py` and `find-duplicate-forms.py`. A caption in the divisor-sum widget and one search keyword no longer carry raw TeX.
- **Wording left from removed features.** Empty pages said no cards matched "the selected level filters" (levels are no longer a filter; it now says the current filters); the tag-search page said "formulas" where it lists every kind of card; the list editor's search box said "Search formulas to add"; and an empty list told you to press "+ list", a button that is now a plain "+".
- **UI scan fixes (2.4).** Three statements (2010 AMC 8 #24, 2011 AMC 8 #4, 2020 AMC 10B #16) had answer choices with `&lt;` and `&gt;` left inside the maths, a KaTeX error on the page: the importer now decodes entities in the choices as it does in the body, and `tools/check-statements.py` fails on any entity left in a statement. Inline maths that ran past the right edge on a phone is fitted after rendering: maths held to its punctuation gets its own line breaks back, and a formula that still cannot fit (a long root or a run of text, which KaTeX cannot break) scrolls sideways by itself. The sweeps at 375 px are now clean: all 680 card pages in dark mode with Larger text, all 680 in the wiki layout, and all 4,616 statements, with the money check no longer mistaking a dollar sign for maths.
- **A Solution section on problem pages (groundwork for 2.5b).** Below "How this problem works" a problem can now show a complete written solution, loaded from `js/data/problems/solutions/<year>.js` like the statements, with figures placed by the same `{{figure:name}}` marker the write-ups use. No solutions are published yet.
- **Gap scan, batch 1: five geometry cards** (approved in `QUESTIONS.md`). Orthogonal Circles (Circles), the Weitzenböck and Hadwiger–Finsler Inequalities and the Steiner–Lehmus Theorem (Advanced Triangle Theorems), the Cevian Nest Theorem (Derived Triangles & Conjugates), and the Regular Dodecahedron & Icosahedron (Solid Geometry). Each has its write-up, an example checked by computation, and a computed figure: the right angle between the radii of orthogonal circles, the tangent lengths behind Hadwiger–Finsler, the two bisectors of the example's 4-5-6 triangle, a nest of cevian triangles, and an icosahedron with its vertices colored by distance from the top. They are in the Olympiad and AMC geometry routes and the 3D Toolkit, and registered for `Special:NewCards`.
- **Gap scan, batch 2: four cards.** Integer-Valued Polynomials (the binomial basis, with coefficients read off as finite differences), Dirichlet's Theorem on Primes in Progressions (with the Euclid-style proofs for $1$ and $3$ modulo $4$), and two methods: Partial Fractions (the cover-up rule, in Factoring & Rewriting) and Working Backwards (undoing a process from its end, beside Simulating the Process). Perfect Numbers was not approved and is not written. The examples are checked by computation, and the cards are in their routes and registered for `Special:NewCards`.
- **Cutting a Solid with a Plane.** A new method in Working in Three Dimensions: find the plane through three points with a cross product, write its equation, and substitute each edge, written as a moving point, to find where the plane crosses it; the corners give the cross-section, and its area comes from triangles or from a projection. The example cuts a 4-cube with $x + 2y - 2z = 6$ and gets a trapezoid of area $12$, confirmed by computation; the figure draws it. It links the cross product, the intercept form, and the projected-area card, and is in the AMC geometry route and the 3D Toolkit.
- **Pressing "/" no longer moves the page.** Focusing the search box made the browser scroll by the page's scroll padding even though the box sits in the sticky top bar; the page now stays still when the box is on screen, and on a narrow screen, where the bar scrolls away, the page goes to the top so the box is visible.
- **Patterns show a Practice Problems section even when they have none yet.** The 24 patterns with no tagged problems show the heading with "No practice problems for this pattern yet", so the place for them is visible.
- The app's files no longer name a person: the new-card batch label and three code comments were reworded.
- **Gap scan, batch 3: five olympiad cards.** The Combinatorial Nullstellensatz (with its proof, and the Cauchy–Davenport write-up now points to it instead of restating it), Schur's Theorem on one-color solutions of $x + y = z$ (through the difference graph and the multicolor Ramsey bound), Euler's Pentagonal Number Theorem (Franklin's pairing and the partition recurrence), the Hook Length Formula (with a figure of the hooks), and Projective Transformations as a method (send a line to infinity, or a conic to a circle; the figure is the complete quadrilateral of its example). Every number in the examples is checked by computation, including the Schur numbers 4 and 13 by exhaustive search.
- **Gap scan, batch 4: five AMC patterns.** Age Problems (the difference of two ages never changes), Calendar and Day-of-the-Week Problems (days modulo $7$, the leap-year rules, the $400$-year cycle), Painted Cubes (corner, edge, face, and core cubes, with a paragraph extending the counts to an $a \times b \times c$ box and to slabs, and a figure of a painted $4 \times 4 \times 4$ cube colored by painted faces), Round-Robin Tournaments (fixed totals of games, wins, and points), and Magic Squares (the magic sum and the center of a $3 \times 3$ square). The counts and the examples are checked by computation, including every painted-face count by brute force. This finishes the 19 approved gap-scan cards plus the plane card: 700 cards in all.
- **A handoff file for new chats.** `PLAN.md` now opens with "Current state": the counts, what was last finished, what is in progress, the next action, and the blockers. `CLAUDE.md` sends every new session there first, and a rule in `CLAUDE.md` and CONVENTIONS §7 says to update it and push after every major change. The previous chat's answers about the app's history are in `MIGRATION-NOTES.md`, which replaces the list of questions, and the style rules among them are now in CONVENTIONS.
- **Vieta Jumping moved to Proof Methods** (Induction & Descent, beside Infinite Descent), since it is a descent argument rather than a number theory fact. The number theory group it left is renamed Lifting to Prime Powers (Lifting the Exponent and Hensel lifting). It leaves the Olympiad number theory route and joins the proof-methods study list.
- **New card: Angle Bisectors of Two Lines** (Coordinate & Grid Geometry). It covers the bisector equations from equal signed distances; the slope $\frac{\sqrt{1 + m^2} - 1}{m}$ of the bisector of the $x$-axis and a line of slope $m$, with the Pythagorean pairs $\frac34 \to \frac13$, $\frac43 \to \frac12$, $\frac{5}{12} \to \frac15$, and $\frac{12}{5} \to \frac23$; and the two bisectors of any two slopes, checked numerically. The example and the figure place a circle tangent to $y = 0$ and $y = \frac34x$ at $(6, 2)$.
- **Hover previews match the card's figure and fill the box.** The preview's thumbnail never got the label-untangling and centering pass the card page gives its figures (`tidyDiagrams` looked only inside `.diagram`), so its labels could sit differently. It now gets the same pass. Its drawing is also cropped to its own extent, inside the original canvas, and drawn as large as the fixed 230 px box allows, so a figure on a roomy canvas fills most of the box instead of half of it.
- **The Pythagoras widget drags freely.** A and B slide along their legs anywhere in the frame, and the squares may run past its edge (the frame clips them, and the caption keeps the exact sums). The square labels now sit just inside each square, beside its side of the triangle, so they stay in view; A and B are labelled. Geometry widgets are a little smaller (400 px wide at most, from 460).
- **The lab pages show every card.** Quiz, Flashcards, and Formula Web loaded the data files with no version, so a browser could keep serving copies from before the newest cards; they also never loaded the proof-methods write-ups. They now load the same versions as `index.html` (`tools/sync-lab-versions.py`, checked by `tools/check-lab.sh`) and all 701 write-ups.
- **A front page that does not repeat itself.** The "How the four fit together" chain and the "Jump to" grid restated the four spaces a third time (after the tiles and the sidebar) and are gone. Instead, each tile says in one line what its space holds. The main column has Did you know (a fact from the curiosity lists, chosen by the day, with Another to see the next), Newest cards (the six most recent, linking to every new card), and Practice at a glance (each main contest's problems, years, and how many are written up, opening its latest year). The right column is unchanged: continue where you left off, problem and card of the day, your library. On a phone, a row's subject label is hidden instead of overlapping a long card name.
- **Page tools, as on Wikipedia (Settings → Browsing → Page tools, off by default).** When on, a card's page gets a right-hand column, which drops below the page on narrower windows. It has three parts. Tools: What links here and Problems using this card, each with its count, a permanent link that is copied to the clipboard, Print, Random card, and Hide page tools. Page information: the id, kind, subject, tier, importance, the size of the write-up in words and sections, the figures, the examples, the links out and in, and the date the card was added if it is in a NewCards batch. Appearance: text size and theme, the same settings as the Settings page. Printing hides the tools, the sidebar, and the top bar.
- **An angle-chasing puzzle on the Angle Chasing card.** It draws a random cyclic quadrilateral with both diagonals. Its arcs are even numbers of degrees, so every angle is a whole number, and half the puzzles make two adjacent sides equal. One angle is given; the reader clicks every angle equal to it and presses Check. The result shows found, missed, and wrongly marked angles, with the reason for each equal one: inscribed angles on the same chord, on equal chords, or an angle between the diagonals as half a sum of arcs. New puzzle draws another.
- **The angle-chasing puzzle has three difficulties and its markings.** Easy is a plain cyclic quadrilateral. Medium adds either a pair of equal sides or a tangent at one vertex. Hard has equal sides (one pair, or two, which makes a diagonal a diameter) and a tangent. Equal sides carry tick marks. The tangent runs across the frame with its two tangent-chord angles, labelled E and F. The given angle always has at least one equal partner. Neighbouring wedges at a point alternate between two radii, so they no longer overlap. Each reason names the chord an angle stands on: the same chord, a tangent and a chord, or equal chords marked with the same ticks.
- **Hard angle-chasing puzzles chain several theorems.** Hard now adds the whole interior angle at each vertex (a thin clickable band around the small wedges), one side extended past a vertex to X (whose exterior angle equals the interior angle at the opposite vertex), and the tangent, together with equal sides: either AB = AD or three equal sides AB = BC = DA. The given angle always has at least three equal partners, and it is chosen to mix kinds: inscribed, tangent-chord, exterior, and whole interior angles. A right angle is never the given one. Over 40 random Hard puzzles the given angle had 3.9 partners on average; the exterior-angle theorem was needed in 28 of them, tangent-chord in 11, and equal chords in 24. A streak counts puzzles solved perfectly in a row, with a star from three on.
- **The angle-chasing puzzle's difficulty buttons sit above the figure**, and Check and New puzzle sit below it. Every arc of the circle is now between 40° and 150°, so no single huge arc squeezes the other points together.
- **The page tools column runs the full height of the page.** Its divider now starts at the top bar and runs to the bottom. Only the column's contents stick while scrolling, so the line no longer stops short or jumps when the page bounces. The Page width setting (Full or Readable) is removed.
- **Interactives audit.** All 117 widgets mount without errors or NaN values. The 40 calculator-style tools had a title and inputs but nothing saying what they show, so each now opens with one line on what it computes and what to try (`WIDGET_INTROS` in `js/app.js`). Geometry widgets whose hint was the generic "Drag the highlighted points" now name the points that move. The Euler's distance widget starts on a clearly scalene triangle, so O and I no longer sit on top of each other, and its vertices are labelled.
- **Nine olympiad lemmas you can drag.** The Incenter–Excenter Lemma, the Iran Lemma, the Humpty point, the Dumpty point, the Shooting Lemma, Archimedes' Broken Chord, the Perpendicularity Lemma, the Isogonal Conjugate, and Miquel's Theorem each get a widget. You move the triangle (or the points on the circle or the sides), and the caption shows the invariant holding as numbers: MB = MC = MI = MIₐ, ∠BKC = 90°, MX · MA = MB², DA² = DB · DC, T, D, M collinear, the two halves of the broken chord, the two differences of squares against the angle, the equal angles at each vertex, and the third circle passing through the Miquel point.
- **Gates run on Linux too.** The gates hard-coded macOS paths. They now read `JSC` and `CHROME` from the environment, falling back to the Mac paths. `tools/jsc-node` is a small Node stand-in for `jsc` (`load`, `print`, `read`, `quit`), and `check-labels.py` passes `--no-sandbox` when it runs as root. On Linux, `check-labels.py` reports five far-move labels (`thales-theorem`, `radical-axis`, `weierstrass-substitution`, `harmonic-addition`, `vertex-form`) that come from different font widths; on the Mac they pass. The semantic search index (`tools/build-search-index.py`) cannot be rebuilt from a cloud session, because its model download from HuggingFace is blocked there. Rebuild it on the Mac after pulling; until then, new cards rank by the lexical search alone.
- **The practice pass begins (2.7a), with two things problem pages lacked.** A problem's second good route (the `trick` field) is now printed on its page as an "Alternatively, ..." paragraph under the strategy, and its cards join the Pattern, Method and Formulas columns with a dashed outline; the 14 existing ones were reworded to open that way, and the validator requires it. A geometry problem printed without a figure can now have one drawn for the app (`js/data/diagrams/problem-diagrams.js`, built with the geometry helpers that `geometry-diagrams.js` now shares as `GEO_KIT`), shown under the statement and labelled as not part of the original problem; `check-diagrams.py`, `check-labels.py` and `check-statements.py` cover them (a drawn figure must belong to a known problem whose statement has none). First card, Pythagorean Theorem: its first 18 problems (2026 AIME I #3 to 2000 AIME II #8) were re-solved and their numbers checked by script. Pythagoras was dropped where the best route never uses it (1983 #4, 1999 #4) and replaced by Length of a Chord where the step is exactly a chord at a distance from the center (1983 #12, 1983 #14, 1995 #4). 1985 #2 now cites the volume card instead of Cone Surface Area, and 1997 #4 loses Special Right Triangles. 1983 #14 was rewritten around the midpoint of the centers, with the angle route as the alternative; 1991 #12, 1993 #14 (the sides denest to $2\sqrt7\pm2$) and 2000 II #8 got corrected or complete strategies. Ten of these problems have new figures.
- **Practice pass, Pythagorean Theorem problems 19 to 26** (2000 AIME II #12 to 2004 AIME I #14). Re-solved and checked by script. Pythagoras gave way to the specific card where that is the step: Distance in Three Dimensions (2002 I #11, #15, II #2), the 13-14-15 Triangle (2000 II #12, replacing Heron), Equilateral Triangle of Side $s$ for the offset rows of circles (2002 I #2). 2002 I #11 is now an unfolding by reflection, not an lcm (the gcd-lcm card is gone from it), and 2004 I #14 adds Unfolding a Surface, which its rope argument needs. 2002 I #15's strategy now fixes $G$ from the flat face $ADEG$ and says why $E$ stands over the square; 2003 II #11 drops Median to the Hypotenuse, which its route never used, for the altitude relation it does use. Five new figures, three of them solids with hidden edges dashed by a new ray-casting helper (`solidEdges`).
- **Practice pass, Pythagorean Theorem problems 27 to 35** (2004 AIME II #7 to 2009 AMC 12A #19). 2004 II #7 is now tagged with the Folded Paper pattern instead of the coordinate reflection formula it never uses; 2005 II #8 follows the same route as 1995 #4 and gets the same cards (Length of a Chord, no similarity); 2006 II #1 uses Special Right Triangles; 2006 II #15 gains Heron's formula, which its route needs; 2008 II #10 is the distance formula plus working backwards, with its count checked by brute force; 2009 12A #19 drops Regular Polygon Area, which its own strategy said it never used. 2006 II #6 gets the 15° angle route as its alternative. Seven new figures.
- **Practice pass, Pythagorean Theorem problems 36 to 43** (2010 AIME I #8 to 2013 AIME II #8). 2010 I #8 now cites Lattice Points on a Circle and the distance formula; 2010 II #14 finishes by power of a point ($AP\cdot PB=CP\cdot PD=2$) instead of projecting the center, so it drops Pythagoras, and its strategy now says why $\angle BAC<45^\circ$ picks the configuration; 2012 II #4 adds Vieta for the sum-and-product step; 2013 I #7 uses the 3D distance formula and gets an alternative through the medial triangle and De Gua's theorem; 2013 II #8 says why the long diagonal is a diameter and gets Ptolemy with Thales as its alternative. Seven new figures.
- **Practice pass, Pythagorean Theorem problems 44 to 51** (2014 AIME I #1 to 2016 AIME I #4), and 2026 AIME I #3 now cites Joining the Centers of Tangent Circles. 2014 I #13 now gives the whole route: the equal sums put $EG$ through the center, the two trapezoids of the strip give the offset of $FH$ and of $P$, and a triangle similar to $EG$'s slope triangle gives $sw=510$, so $s^2=850$. 2014 I #15 drops Pythagoras and similar figures: Thales, equal inscribed angles (so $F$ is the bisector foot and $G$ the midpoint of the hypotenuse), the angle bisector theorem and the extended law of sines give $DE=\tfrac{25\sqrt2}{14}$. 2014 II #8 is written out in coordinates; 2015 I #7 shows both levels of squares and cites Triangle Similarity; 2015 II #4 fixes a wrong claim about base 2 and cites the isosceles trapezoid pattern; 2016 I #4 is the dihedral-angle method with two 30-60-90 triangles, dropping Pythagoras and the Law of Cosines. Four figures drawn: 2014 I #15, 2014 II #8, 2015 II #4 and the 2016 I #4 prism. The card now cites 60 problems.
- **Practice pass, Pythagorean Theorem problems 52 to 60** (2017 AIME I #4 to 2022 AIME II #3). Every strategy that only sketched a route now carries it through. 2017 I #4 finds the circumradius by one more Pythagorean step instead of the law of sines; 2017 II #15 says why the minimum is at the box's center (the three half-turns and convexity) and cites the space diagonal instead of Pythagoras; 2021 I #2 is pure similarity (ratio $3:7$, which the old text had wrong), so Pythagoras is dropped; 2021 I #9 gets the route $18\,AB=15\,BC=10\,BD$, then Heron's formula on the $5$-$6$-$9$ triangle; 2021 II #10 uses the half-angle similar triangles in the bisecting plane instead of a cross-section; 2022 I #10 gets the difference-of-squares step. Eight figures drawn, with a new `sphereOutline` helper that draws a sphere's true outline (an ellipse) under the oblique projection. The card now cites 58 problems.
- **Practice pass: the Pythagorean Theorem card is finished** (problems 61 to 76, 2023 AMC 10A #11 to 2019 HMMT February Geometry #5). 2025 AMC 10A #10 cites Length of a Chord instead of Pythagoras; 2024 AIME I #14 gets the face area from De Gua's theorem; 2025 AMC 10A #23 and 12A #16 lead with the Law of Cosines, the projection and the half-angle formula, with the angle bisector theorem and Pythagoras as the alternative; 2025 AMC 10A #15 gets the alternative through the $45$-$45$-$90$ triangle $ADE$ and $\tan(\angle BAE-45^\circ)=\tfrac34$; 2025 AIME II #6 drops the angle chasing it never used and is written out in coordinates; 2019 HMMT Feb Geometry #5 gets its first strategy (the reflected side is tangent, so $BC=\sqrt2$), giving both answers the official key accepts. Six figures drawn (one shared by the 10A and 12A copy). The card cites 55 problems, down from 76.
- **Practice pass, Special Right Triangles problems 1 to 10** (2026 AIME II #3 to 2014 AIME II #11). 2007 AIME II #11 now counts the big tube's turning, $\tfrac{8\pi}9$ while it is on the small tube, so the ground carries it $80\pi$, and the answer $179$ is actually derived; 2008 AIME I #15 gets the fold worked out ($h^2=2s\sqrt{17}-17=\sqrt{867}$); 2012 AIME I #12 is the angle bisector theorem and one $30$-$60$-$90$ triangle ($\tan B=\tfrac{4\sqrt3}{11}$); 1995 AIME #12 cites the dihedral-angle method; 2014 AIME II #11 computes $CD$ in coordinates on the altitude; 2026 AIME II #3 drops a parallel-line citation it did not use; 1994 AIME #15 cites the folded-paper pattern; 2005 AIME I #11 explains the optimal position. Eight figures drawn.
- **Practice pass: the Special Right Triangles card is finished** (problems 11 to 24). 2014 AIME II #14 explains why $AP=HM$ (the bisector meets $BC$ at $60^\circ$); 2014 AMC 10A #22 finishes on the $30$-$60$-$90$ triangle $ADE$; 2018 AIME I #8 computes all three widths and cites the equiangular polygon pattern; 2018 AIME II #4 places CAROLINE on the grid and adds the six triangles ($\tfrac{17}6$); 2021 AIME II #2 is carried through to $AF=336$; 2019 HMMT February Geometry #2 and #3 get their first strategies ($BD=\sqrt3$; area $\sqrt3+\tfrac{2\pi}3$). Five figures drawn.
- **Practice pass: the Altitude to the Hypotenuse card is finished** (5 problems). 2009 AIME I #12 now says why $\omega$ is the incircle of $ABI$ and finds the third tangent length $\tfrac{37}3$ from $r^2s=xyz$; 2016 AIME II #5 sums the series to $\tfrac{ab}{c-a}$ and derives $7a=6b+6c$, hence 13-84-85; 2019 AIME I #6 is the two similarities giving $KO\cdot KM=KL^2$. Three figures drawn.
- **Practice pass: the Median to the Hypotenuse card is finished** (4 problems, one done earlier). 2008 AIME II #5 now says why $E$, $M$, $N$ are collinear. Three figures drawn.
- **Practice pass: the Triangle Inequality card is finished** (12 problems; AMC first, then AIME, then HMMT). 2023 AIME I #15 had applied the triangle inequality to the wrong three numbers: it now uses $\operatorname{Re}z^3$, $\operatorname{Im}z^3$ and $p$, with $|\operatorname{Re}z^3-\operatorname{Im}z^3|=(a+b)|a^2-4ab+b^2|$; 2008 AIME I #10 squeezes $AD$ between the triangle inequality and the Law of Sines; 2021 AIME II #5 drops the triangle inequality, which it never needs; 2022 AIME II #12 pairs the foci and finds the crossing point; 2001 AIME II #5 lists the extremal set; 2019 HMMT February Geometry #6 gets its first strategy. AMC 10/12 brute-force checks confirm 2024 AMC 12B #24. Two figures drawn.
- **Practice pass: Triangle Similarity (already covered) and Perpendicular Bisector as a Locus finished.** 2023 AMC 10A #22 and AMC 12A #18 are the same problem and now share one strategy and one card list; 2000 AIME II #11 explains why $D$'s reflection in line $AB$ must be a lattice point and lists the eight slopes ($\tfrac{119}{12}$); 2017 AIME II #3 said closer to $A$ when the question asks about $B$, and is now worked out ($\tfrac{109}{300}$); 2022 AIME II #15 is carried through (diagonal $15$, height $12$, $r_1r_2=40$, area $140$) and drops Ptolemy; 2013 AIME I #9 and 2025 AIME I #8 get their numbers.
- **Practice pass, Similar Figures: the 13 AMC problems.** AA similarities now cite Triangle Similarity, keeping Similar Figures for scaling (2022 AMC 10A #13, 2024 AMC 10B #10, 2024 AMC 10B #11 / 12B #7); 2015 AMC 10B #22 is worked through the golden triangles ($2\varphi=1+\sqrt5$); 2023 AMC 10B #25 / 12B #25 gets the apothem ratio $\tfrac1\varphi$ and cites the folded-paper pattern; 2022 AMC 10A #13 cites the perpendicular-to-an-angle-bisector pattern.
- **Practice pass, Similar Figures: AIME problems 1984 #3 to 2004 II #13 (24).** AA similarities moved to Triangle Similarity (1992 #9, 1998 #6, 2001 II #13); 1985 #4 and 1987 #15 drop Similar Figures, which they never used; 1993 AIME #13 replaces an unsound similar-triangles step with the tangency computation ($15t^2=800t$); 1996 #4 fixes the ratio ($\tfrac{x+1}x=7$); 1995 #11 derives $b^2=ac$; 2001 II #15 computes the surface ($372+39\sqrt6$); 2004 I #9 gets its casework ($k=\tfrac18$); 2004 II #13 builds $[EBD]=(k^2+2k)[ABC]$. Twelve figures drawn. `CONVENTIONS.md` §11 now records the work order (AMC 10/12, then AMC 8, then HMMT), the AA-versus-scaling rule and no \"Carried through\" strategies; §11 also records `sphereOutline`.
- **Practice pass, Similar Figures: AIME problems 2006 I #7 to 2013 II #10 (11).** Every sketch is now a full route: 2006 I #7 puts the vertex at $a=\tfrac56$; 2006 II #9 finds $x=19-3\sqrt5$ (Similar Figures dropped); 2006 II #12 gets $AF^2=433$; 2008 I #14 maximizes $405+162s-243s^2$; 2010 II #9 finds the inner side $\tfrac4{\sqrt7}$; 2011 I #8 explains the bound $h\le\tfrac{2K}{b+c}$; 2013 I #13 sums the series to $\tfrac{90\cdot336}{961}$; 2013 II #10 uses the constant height ratio. AA similarities cite Triangle Similarity. Seven figures drawn.
- **Practice pass: the Similar Figures card is finished** (the last 11 AIME problems). 2016 AIME II #7 is worked out ($[IJKL]^2=[ABCD]\cdot[EFGH]$, multiples of $168$, $840$); 2018 AIME I #4 is the Law of Cosines alone; 2018 AIME II #7 counts $k=6m^2$; 2019 AIME II #7 scales by $\tfrac{11}8$ (Barycentric Coordinates added); 2022 AIME II #7 is the homothety center and a 6-8-10 triangle; 2023 AIME II #3 finds $\triangle APB\sim\triangle BPC$; 2024 AIME I #8 writes $BC=\rho u+2\rho(n-1)$ and cites Circle Inscribed in an Angle; 2024 AIME II #5 derives $\tfrac1s=\tfrac1a+\tfrac1b+\tfrac1c$. Nine figures drawn.
- **Practice pass: Midsegment Theorem, Intercept Theorem and Centroid Divides Medians finished.** 2018 AIME II #9 had a wrong alternative (the centroids are a $\tfrac23$ copy of the side midpoints, not of the vertices, so $\tfrac49$ of the octagon is not the answer); it is removed and the main route now uses the correct homothety ($\tfrac49\cdot414=184$). 2002 AIME I #13 never uses the centroid: it is now the median lengths, power of a point and the Law of Cosines ($8\sqrt{55}$). 2025 AIME II #5 gets its arcs ($72+48+216$); 2003 AIME II #6 explains the $\tfrac13$ corner triangles; 2012 AIME I #14 states the centroid identity. Three figures drawn.
- **Practice pass: Cevian Area Ratio, Polygon Angle Sums and Regular Polygon Area finished.** 1985 AIME #6 now solves for the two unknown regions ($56$ and $70$); 1992 AIME #14 shows product $=$ sum $+2$; 2019 AIME II #13 gets a full route through the distances to opposite sides ($n=504$); 2002 AIME II #4 and 2021 Fall AMC 10B #11 cite Regular Hexagon Area, the specific card; 1997 #6, 2011 II #3 and 2019 HMMT February Geometry #1 get explicit steps. Four figures drawn.
- **Practice pass: the Equilateral Triangle Facts card is finished** (17 problems). 1998 AIME #12 gets a full route (the bisector split gives $x^2+x-1=0$, then $PQ^2=7-3\sqrt5$); 2003 AIME I #10 finishes with two congruences and now cites Triangle Congruence, which had no problems before; 2007 AIME I #15 uses $\triangle AFE\sim\triangle CED$, which is much shorter; 2010 AIME I #13 computes $h^2=\tfrac{27}2$; 2016 AIME II #14 replaces a cross-section claim with $pq=R^2$ and the tangent addition formula; 2022 AIME I #8 locates the intersection points correctly ($\sqrt{117}\mp3$ from the center); 2013 II #4 and 2014 II #10 state their numbers. Ten figures drawn.
- **Practice pass: Regular Hexagon, Regular Octagon, Quadrilateral Areas, the Four Mean Segments and Quadrilateral Area from Diagonals finished.** 2019 HMMT February Geometry #4 gets its first strategy (the shared center forces $BC\parallel AD$, then $42\lambda^2-37\lambda+5=0$ and $196$); 2018 AIME I #15 shows the area $2\sin(a+b)\sin(b+c)\sin(a+c)$ is the same for all three quadrilaterals; 2021 AIME II #12 derives $d_1d_2\cos\theta=\tfrac{21}2$; 2022 AIME I #3 drops the wrong perpendicular-bisector citation (it is the midline, $575-333$); 1994 #6 counts $600+60$; 2000 II #6 and 2023 AMC 12B #11 state their numbers. Four figures drawn.
- **Practice pass: the Standard Triangle Area card is finished** (13 problems, 7 done under earlier cards). 2025 AIME I #12 gets its full route (the inequalities factor as $(x-y)(1+z)\lt0$ and $(y-z)(1+x)\lt0$; the bounded triangle has area $507\sqrt3$ by the cross product); 1984 #9 and 1992 #7 cite the dihedral-angle method; 2023 AMC 12B #17 shows $d^2+2d-24=0$ and drops the arithmetic-series tag. Four figures drawn. A duplicate figure for 1998 AIME #10 was removed (the gate caught it).
- **Practice pass: the Area of a Triangle Using Sine card is finished** (24 problems, 9 done earlier). 2007 AIME I #12 now builds the overlap as $[AB'P_3]-[P_1B'P_2]$; 2018 AIME I #13 fixes a slip ($AI_1=\tfrac{c\sin\frac B2}{\cos\frac\alpha2}$) and computes $bc\sin\tfrac A2\sin\tfrac B2\sin\tfrac C2=126$; 1999 AIME #14 gets a Pythagorean route ($13z+14x+15y=295$) and the Brocard angle as the alternative, as does 2023 AIME II #3; 2012 AIME I #14 cites Leibniz's formula; 2025 AIME II #12 and #14, 1997 #15, 2001 I #4, 2013 I #12 and 2024 AMC 12A #20 / 12B #19 are carried through; 2019 HMMT February Geometry #10 gets its first strategy. Ten figures drawn. Four missing cards found on the way are proposed in `QUESTIONS.md` (P1 to P4).
- **Practice pass: the Heron's Formula card is finished** (15 problems). 2013 AIME II #13 is two lines of coordinates and drops Stewart and Heron; 1992 AIME #13 is the Apollonius circle alone ($820$); 2005 AIME I #15 uses the power of both ends of the median ($b=10$, $a=26$) and the median formula; 2007 AIME II #15 is a homothety about the incenter ($2r=R\cdot\tfrac{4-r}4$); 2024 AMC 12A #24 says why the faces must be acute; 1999 #12 and 2010 II #12 state their numbers. Seven figures drawn.
- **Practice pass: the Inradius, Circumradius, Right-Triangle Inradius, Incircle Tangent Lengths, Shared-Angle, Same-Base and Exradii cards are finished.** 2020 AIME II #13 had the wrong tangent lengths: they are $3,2,4,2,4$, and $r=4$ is found from the angles at the center; 2026 AIME II #8 finds the root $w=\tfrac75$ (sides $245,245,10$); 2019 AIME I #11 reduces to $a:b=2:9$; 1996 AIME #13 replaces a vague step with the projection $AD=\tfrac{81}{2\sqrt{57}}$; 2010 I #15, 2026 I #10, 2003 II #7, 2001 I #9 and 2018 AMC 10A #24 are carried through; 2019 HMMT February Geometry #7 gets its first strategy (the circle is the anticomplementary circumcircle, radius $2R=\tfrac{65}4$). Eight figures drawn.
- **Practice pass, Law of Sines: strategies for all 15 problems.** 2016 AIME II #10 gets a short route (similar triangles give $\tfrac{CA}{CQ}=\tfrac56$, the area ratio gives $\tfrac{\sin\alpha}{\sin\beta}=\tfrac85$, so $ST=\tfrac{35}8$) and loses an alternative that claimed a one-line cross-ratio but needed lengths the problem does not give; 2018 AIME II #14 is set up as the $A$-excircle of $APQ$ ($a=\tfrac{33}5$, $AQ=\tfrac{168}{59}$); 1996 #15, 2000 I #14, 2005 II #14, 2013 II #15 and 2024 AMC 12B #22 are carried through; 2019 HMMT February Geometry #8 gets its first strategy (a hyperbola and an ellipse, area $\tfrac67$). Seven figures drawn: 1996 #15, 2000 I #14, 2005 II #14, 2011 II #13, 2016 II #10 (the circle and $C$ solved numerically so that $AS=7$, $BT=5$), 2018 II #14, 2024 AMC 12B #22.
- **Four new cards from the practice pass (2026-10-17):** Angle Between the Diagonals from the Sides ($2d_1d_2\cos\theta=|a^2+c^2-b^2-d^2|$, so $\tan\theta=\tfrac{4K}{|a^2+c^2-b^2-d^2|}$), Flank Triangles of the Squares on a Triangle (each gap has the triangle's area and a third side of $2m_a$), Equilateral Hexagon with Opposite Sides Parallel ($\tfrac1s=\tfrac1a+\tfrac1b+\tfrac1c$), and Product of Two Uniform Variables ($P(XY\le c)=c-c\ln c$). Each has a write-up, an example, and a figure, and joins its route; the four problems that needed them now cite them. A fifth candidate, conjugating both sides of a complex equation, is proposed in QUESTIONS.md.
- **Practice pass, Law of Cosines, AMC problems:** 2024 AMC 12A #19 now finds $AB=8$ before Ptolemy uses it, and 2024 AMC 12B #22 rules out $c=a$ and bounds the search ($a+b+c=b+\tfrac{b^2}a\gt2a$, so only $a\le7$). Figures drawn for 2024 AMC 12A #19 and 2025 AMC 12A #8.
- **New method card, Conjugating Both Sides (2026-10-17):** take the conjugate of an equation to get a second one, with $\bar z=\tfrac1z$ on the unit circle and $w=\bar w$ for a real $w$. Three problems now cite it. 2018 AIME I #6 factors as $(z^{840}+1)(z^{600}-1)=0$, giving $1440$. 2001 AIME II #14 reduces to $z^{12}=-1$ and $z^4=\operatorname{cis}(\pm60^\circ)$, giving $840$. 2020 AMC 12B #23 is tagged for the first time.
- **Practice pass, Law of Cosines, AIME problems (first eight):** 2026 AIME I #5 now has a full route: reflect $A$ in $B$ to $C$, and $\overrightarrow{CB'}=\overrightarrow{BA'}$, so $AB'^2=5-4\cos\theta$ and $\cos\theta=\tfrac{29}{36}$. 2026 AIME I #14 is worked in full: the closed side vectors give $K\cos36^\circ=246$ and the diagonals give $J\cos72^\circ=92$, so the perimeter squared is $676\sqrt5$. Figures drawn for 2026 I #5, 2026 I #14 and 1989 #10. Angle Between the Diagonals from the Sides moved from low to lower importance. A sixth candidate card, P6, closing a polygon with side vectors, is proposed in QUESTIONS.md.
- **Practice pass, Law of Cosines, AIME 2002 to 2009:** four strategies completed. 2005 I #7 now extends $AD$ and $BC$ to an equilateral triangle, giving $s^2-18s-60=0$ and $AB=9+\sqrt{141}$. 2009 I #15 finishes the area: $\angle BPC=150^\circ$, so the largest area is $98-49\sqrt3$. 2009 II #5 solves $20p=28$, giving $r=\tfrac{27}5$. 2004 II #11 shows the numbers. Figures drawn for 2003 I #12, 2004 II #11, 2005 I #7 and 2009 I #15.
- **Practice pass, Law of Cosines, AIME 2010 to 2018:** three strategies completed. 2012 II #15 finds $AF$ by the extended Law of Sines, $AF=2R\cdot\tfrac{DF}{DE}$, with $F$, $D$ and the antipode of $E$ collinear; $AF^2=\tfrac{900}{19}$. 2014 II #12 uses $\cos3A+\cos3B+\cos3C=1-4\prod\sin\tfrac{3A}2$, which forces a $120^\circ$ angle. 2018 II #12 reduces the area condition to $(p-q)(r-t)=0$, and the Heron form gives $AC^2=128$ and area $112$. Figures drawn for 2012 II #13, 2012 II #15 and 2018 II #12.
- **Practice pass, Law of Cosines, AIME 2019 to 2021:** six vague strategies replaced with full solutions, and six figures drawn.
  - 2019 I #13: the radical axis $CF$ and the ratio lemma give $XD:XE=5:21$, and equal powers give $BE=\tfrac{5+21\sqrt2}4$.
  - 2019 II #11: $KBA\sim KAC$, so $AK=\tfrac92$.
  - 2019 II #15: two powers of a point and $u=bc\cos A=1400$ give $bc=560\sqrt{14}$.
  - 2020 I #13: $E$ and $F$ are arc midpoints, so the area is $\tfrac{15\sqrt7}{14}$.
  - 2020 II #15: $\cos(B-C)=\tfrac{85}{88}$ gives $XY^2=717$.
  - 2021 I #11: the perimeter is $22\cos\theta$, with $\cos\theta=\tfrac{11}{59}$ from the new Angle Between the Diagonals card and Ptolemy.
- **New method card, Closing a Polygon with Side Vectors (2026-10-17):** the side vectors of a closed polygon add to zero. For an equiangular polygon this is $\sum a_k\omega^k=0$; its components give the linear relations, and dotting the sum with itself gives the side products. 2026 AIME I #14 cites it. QUESTIONS.md now lists the newest section first, with the newest rows at the top of each table.
- **Practice pass, Law of Cosines finished:**
  - 2023 I #12 now goes through feet of perpendiculars: $BX+CY+AZ=\tfrac{165}2$ and Viviani's sum give $\cot\theta=\tfrac1{5\sqrt3}$, so $\tan^2\theta=75$.
  - 2024 I #10: $DB=\tfrac{225}{22}$ and $AD=\tfrac{325}{22}$, and the power of $D$ gives $AP=\tfrac{100}{13}$.
  - Figures drawn for 2021 II #5, 2023 I #12 and 2024 I #10.
- **Angle markers that run past their arms, root cause and gate (2026-10-17):** `angleArc` used a fixed radius without looking at the arms. `check-diagrams.py` now fails an angle arc that does not end on a drawn line. It found two: 2023 AIME I #12, now drawn with a ray past the short arm $FP$, and `roots-of-unity`, now with the radius to $\omega$ drawn. The rule is in CONVENTIONS §4.
- **Practice pass: Law of Cosines at 60° and 120° finished (2026-10-17).**
  - 2017 AMC 10B #19 and its twin 2017 AMC 12B #15 (untagged until now) share one entry: $\angle B'BC'=120^\circ$ gives $B'C'^2=37$. The alternative cuts off three corner triangles of $12$ times the area each (Shared-Angle Area Ratio).
  - 1987 AIME #9 drops Fermat Point: the route uses only the three $120^\circ$ angles, never the minimizing property.
  - 1995 AIME #14 adds Special Right Triangles and Area of a Triangle Using Sine, and states each step ($FP=9$, pieces $48$ and $30$, third side $42$).
  - 2022 AIME I #14 is written in full: each splitting line is parallel to an angle bisector (Angle Bisector Theorem and the Intercept Theorem), $\angle BIC=90^\circ+\tfrac A2$ forces $A=120^\circ$, and a mod 9 argument reduces $b^2+bc+c^2=219^2$ to $x^2+xy+y^2=73^2$, so the perimeter is $459$. The alternative solves it with Eisenstein integers. Casework is dropped.
  - Figures drawn for 2017 AMC 10B #19 (shared with 12B #15), 1995 AIME #14 and 2022 AIME I #14.
- **Practice pass: Special Triangles from the Law of Cosines finished (2026-10-17).** 2013 AIME II #5 cites the $60^\circ$ form instead of the general Law of Cosines, and Area Ratios from a Cevian instead of the same-base card (the three triangles share the apex $A$ and have equal bases); the strategy names the $2$-$3$-$\sqrt7$ triangle.
- **Practice pass, Angle Bisector Theorem, first ten problems (2026-10-17):**
  - 2018 AMC 12A #18, the twin of 10A #24, gets the same entry and figure. 2025 AMC 12A #8 cites the $60^\circ$ Law of Cosines.
  - 2026 AIME II #10 is worked in full: $BE=\tfrac{8y^2}{25}$ and $CF=\tfrac{9y^2}{25}$ force $y=5t$ with $t\le4$, so $BC=340$.
  - 2002 AIME I #10 gets its first strategy ($[ADC]-[AGF]=\tfrac{1110}7-\tfrac{5250}{481}\approx147.66$), adding Area Ratios from a Cevian.
  - 2003 AIME I #15 is now a vector route along the bisector ($D=k(u+v)$, $F=2kv$, $t=\tfrac{49}{289}$), citing Vector Bashing instead of mass points.
  - 2009 AIME I #5: $CP:PL=5:2$ by mass points and $AMCP$ a parallelogram give $LP=72$.
  - Figures drawn for 2022 AMC 10A #13, 2026 AIME II #10, 1992 AIME #9 and 2009 AIME I #5.
- **Practice pass: the Angle Bisector Theorem card is finished (2026-10-17):**
  - 2009 AIME II #10 is a coordinate route ($D=\left(\tfrac{120}{23},-\tfrac{65}{23}\right)$, $AD=\tfrac{60\sqrt{13}}{23}$); Stewart's Theorem is dropped.
  - 2009 AIME II #15: the Ratio Lemma gives $MW=\tfrac{3x}{3x+4y}$, and AM-GM gives $\tfrac1d\ge7+4\sqrt3$, so $d=7-4\sqrt3$.
  - 2010 AIME II #15 had a radical-axis sketch that does not reach the answer. It now uses the spiral similarity at $P$ and the Ratio Lemma: $\tfrac{BQ}{CQ}=\tfrac{15}{13}\cdot\tfrac{5/18}{13/58}=\tfrac{725}{507}$.
  - 2011 AIME II #4 states Menelaus with its numbers ($\tfrac{CP}{PA}=\tfrac{31}{20}$).
  - Figures drawn for all four. The 2010 II #15 figure's self-check caught a triangle drawn with $AB$ and $AC$ swapped before it was committed.
- **Practice pass: Length of an Angle Bisector, Stewart's Theorem, Ceva's Theorem and Menelaus' Theorem finished (2026-10-17):**
  - 1989 AIME #15: mass points give $m_A=2$, $m_B=m_C=1$, so $CP=15$; doubling the median $PD$ gives a $9$-$12$-$15$ right triangle, $[PBC]=54$ and $[ABC]=108$. Stewart and Ceva are dropped.
  - 1988 AIME #12: the three triangles at $P$ give $\sum\tfrac3{a+3}=1$, so $abc=9\cdot43+54=441$; Ceva is dropped, so Ceva's Theorem cites no problem now.
  - 2003 AIME I #7 lists the factor pairs and excludes $m=15$ (the degenerate one); the alternative uses the foot at the midpoint of $AC$.
  - 2023 AIME II #12: $Q$ is $P$ reflected in $M$ (opposite angles of the parallelogram $BPCQ$), so $AQ=2\sqrt{37}-\tfrac{49}{2\sqrt{37}}=\tfrac{99}{\sqrt{148}}$.
  - New candidate card P7 in QUESTIONS.md: the Cevian Ratio Sum $\tfrac{PD}{AD}+\tfrac{PE}{BE}+\tfrac{PF}{CF}=1$.
  - Figures drawn for 2003 AIME I #7 and 2023 AIME II #12.
- **Practice pass: Apollonius's Theorem, Viviani's Theorem, the Ratio Lemma, the Cotangent Rule, the Projection Formula and the Incenter-Excenter Lemma finished (2026-10-17):**
  - The seven Apollonius problems were re-checked by computation and needed no change.
  - 2007 AMC 12B #14 and its twin 10B #17 (untagged until now) share one entry: the height is $1+2+3=6$, so $AB=4\sqrt3$.
  - 2005 AIME II #14 now names the identity it derives as Steiner's Ratio Theorem ($q=463$).
  - 2016 AIME I #6 is written in full: $DI=DA=5$, $DA^2=DL\cdot DC$ gives $DC=\tfrac{25}3$, so $IC=\tfrac{10}3$. Angle chasing and the cyclic-quadrilateral card are dropped for Triangle Similarity.
  - Figures drawn for 2007 AMC 12B #14 (shared with 10B #17) and 2016 AIME I #6.
- **Practice pass: the triangle-center cards finished, Steiner's Ratio Theorem through Angles at the Triangle Centers (2026-10-17):**
  - 2024 AIME II #10: $OI\perp AI$ makes $I$ the midpoint of the chord $AM$, the power of $I$ gives $AI=\sqrt{156}$, and $AB\cdot AC=AI\cdot AI_A=468$.
  - 2020 AIME I #15: $HD=2$, the tangent at $H$ is perpendicular to $AO$ (parallelogram $AHO'O$), $R=\tfrac{21}{2\sqrt5}$ and the area is $3\sqrt{55}$.
  - 2025 AIME I #14 had a garbled strategy. Now: two $30$-$60$-$90$ corners, Ptolemy's inequality twice, and $BE=38$, so the minimum is $38+19\sqrt3$ (checked by numerical minimization). Fermat Point is dropped, so that card cites no problem now.
  - Figures drawn for all three; the pentagon figure's self-check caught a wrong vertex before it was committed.
- **Practice pass: Circle Area, Circumference, Arcs & Sectors finished (2026-10-17):**
  - 1983 AIME #15 gets a full route: the midpoints of chords from $A$ lie on the circle with diameter $AO$, which must touch $BC$; with $BC$ on $y=-4$ this gives $A=(-4,-3)$ and $\sin=\tfrac7{25}$. Circle basics and power of a point are dropped.
  - 2000 AIME I #13: the line through $(5,0)$ of slope $-\tfrac7{24}$ is tangent to every reachable disc, so the region is $\tfrac{700}{31}$.
  - 2014 AIME I #10: the disk turns $6\alpha$, so $\alpha=60^\circ$, $B=(2,3\sqrt3)$ and $\sin^2=\tfrac{27}{31}$.
  - 2022 AMC 10A #15 shows why $AC=25$ ($\cos B=0$ from the two Law of Cosines equations) and cites the Law of Cosines. 2025 AMC 10A #25 replaces its integrals with a $60^\circ$ sector and a $30$-$60$-$90$ triangle (checked by simulation).
  - 2008 AIME I #5 and 2003 AIME I #2 state their numbers in place of "carried through".
  - Figures drawn for 2022 AMC 10A #15, 2014 AIME I #10 and 2008 AIME I #5.
- **Practice pass: Circular Segment & Lens Areas finished (2026-10-17).** 2015 AIME I #15 stopped before its answer. It now finds the projection, the disc minus two $120^\circ$ segments ($12\pi+18\sqrt3$), and divides by $\cos\theta=\tfrac35$, giving $20\pi+30\sqrt3$ and $53$. Affine Transformations is dropped; Projected Area is the step. A cylinder figure shows the cut. The other six problems were re-checked and needed no change.
- **Practice pass: Power of a Point finished (2026-10-17):** five vague strategies written in full.
  - 2001 AIME II #6: the chord through $F$ perpendicular to $CD$ gives $s(1+s)=\tfrac{(1-s)(1+s)}4$, so $s=\tfrac15$. The quadratic formula tag is dropped.
  - 2016 AIME I #15: tangent-chord angles and the circle $ABCD$ make $ADY$, $YAB$, $YCB$ similar, so $YC\cdot YD=AB^2$; $XY$ bisects $\angle CXD$, and the bisector length gives $AB^2=67\cdot37-47^2=270$ (found and checked on a numerical model).
  - 2022 AIME I #11: tangent lengths $6$ and $20$, and the diameter between the parallel sides gives $\cos A=\tfrac{6-x}{6+x}$; with $AC=28$, $x=\tfrac92$ and the area is $147\sqrt3$.
  - 2023 AIME II #9: $A$ and $B$ sit over the midpoints of $XP$ and $PY$, so $AB=12$; $MP(MP+5)=36$ gives $h=\sqrt{15}$ and area $18\sqrt{15}$.
  - 2024 AIME I #5: the power of $E$ gives $e(e+184)=17\cdot33$, so $CE=104$. Ptolemy is dropped.
  - Figures drawn for 2001 AIME II #6, 2016 AIME I #15 and 2023 AIME II #9.
- **Practice pass: Length of a Chord finished (2026-10-17):**
  - 2023 AIME I #5 is now Thales and areas: $P$ is $\tfrac{56}d$ and $\tfrac{90}d$ from the diagonals, so $d^4=44944$ and the area is $106$. Ptolemy and the chord card are dropped.
  - 1985 AIME #9 states $k^2=\tfrac{256}{15}$ and the two cosines $\tfrac{11}{16}$, $\tfrac{14}{16}$.
  - 2023 AMC 12B #20 explains the answer correctly: the start lies on the second circle, and the good points form an arc of $2\theta$, $\theta=2\arcsin\tfrac14$.
  - Figures drawn for 1985 AIME #9 and 2023 AIME I #5; the second figure's self-check caught a misplaced $P$ before commit.
- **Practice pass: Equal Chords, Arcs & Distances and the Inscribed Angle Theorem finished (2026-10-17):**
  - 2011 AIME I #10 counts obtuse triangles from their first vertex: $\tfrac{3(k-1)}{2(2k-1)}$ for $n=2k+1$ and $\tfrac{3(k-2)}{2(2k-1)}$ for $n=2k$, giving $127+376=503$.
  - 2015 AIME I #6: $\tfrac32(m-a)=12^\circ$ and $5m=180^\circ-2a$ give $a=20^\circ$, $m=28^\circ$, so $\angle BAG=10^\circ+48^\circ=58^\circ$.
  - 2017 AIME I #6: $2u^2+(1-2u)^2=\tfrac{11}{25}$ gives $x=84^\circ$ or $36^\circ$.
  - 2021 AIME II #14: $AXOG$ and $OGMY$ are cyclic, so $\angle XOY=\angle XAM+\angle AMY=180^\circ-(B-C)=A+2C$ (checked on three triangles), giving $A=\tfrac{585}7$. The cyclic-quadrilateral tag is replaced by the tangent-chord angle.
  - Figures drawn for 1991 AIME #14 and 2021 AIME II #14.
- **Practice pass: Thales' Theorem, Angles from Chords and Tangent Line Facts finished (2026-10-17):**
  - 2017 AIME I #8: $QR=200\sin|a-b|$, so $QR\le100$ means $|a-b|\le30$ and the probability is $\tfrac{16}{25}$ (checked by simulation).
  - 2000 AIME II #10: $\tan(\alpha+\beta)=-\tan(\gamma+\delta)$ gives $105r^2=67935$, $r^2=647$.
  - 2002 AIME II #15: the radii are the roots of $k^2r^2-(18k+12)r+117=0$, so $\tfrac{117}{k^2}=68$ and $m=\tfrac{12\sqrt{221}}{49}$ (Vieta and the double angle formula).
  - 2007 AIME I #9: tangent lengths $\tfrac r4$ and $\tfrac{3r}5$, so $\tfrac{57r}{20}=34$.
  - 2007 AIME II #9: $EP=378-364=14$ and $EQ=378-105=273$, so $PQ=259$; it cites Incircle Tangent Lengths.
  - 2023 AIME I #8: $r=\tfrac{25}2$, the projections $\tfrac72$ and $\tfrac{15}2$ give $\cos A=\tfrac35$, and the perimeter is $125$.
  - 2025 AMC 10A #20 cites the distance method for tangent lines.
  - Figures drawn for 2017 AIME I #8, 2025 AMC 10A #20, 2000 AIME II #10, 2007 AIME I #9, 2007 AIME II #9 and 2023 AIME I #8.
- **Practice pass: the tangent-chord angle, radical axis, Apollonius circle, Descartes, tangent circles and common tangents cards finished (2026-10-17):**
  - 2019 AIME I #15: the homotheties at $A$ and $B$ make $OO_1PO_2$ a parallelogram, so $OQ\perp PQ$, $Q$ is the midpoint of $XY$, and $PQ^2=\tfrac{121-60}4=\tfrac{61}4$.
  - 2021 AIME I #13: linearity of power gives $672r=2d\cdot\tfrac r2$, so $d=672$.
  - 2015 AIME II #15: in coordinates $\ell$ has slope $\tfrac32$, $AD=\tfrac4{\sqrt{13}}$, and the area is $\tfrac{64}{65}$; the common-tangent card is dropped (not used).
  - 2005 AIME II #15: the centers lie on $\tfrac{x^2}{100}+\tfrac{(y-12)^2}{75}=1$, and tangency gives $a^2=\tfrac{69}{100}$.
  - 2023 AMC 12B #10 states the slopes ($-\tfrac52$, so $\tfrac25$).
  - Figures drawn for 2019 AIME I #15 and 2021 AIME I #13.
- **Practice pass: cyclic-quadrilateral cards, Ptolemy, Pitot and Distance & Midpoint finished (2026-10-17):**
  - 2001 AIME I #13: Ptolemy on the trapezoid gives $(c+20)^2=484+22c$, so $c=-9+\sqrt{165}$.
  - 2020 AIME II #4: a $90^\circ$ clockwise turn about $(21,-3)$, so the answer is $108$.
  - 2021 AIME I #6: $BP^2+CP^2+DP^2-GP^2=2AP^2$, so $AP=192$ (the old text had a garbled scaling step).
  - 2022 AIME I #1: $P+Q$ is the line through $(16,108)$ and $(20,106)$, so it cites Forms of a Line, not distance and midpoint.
  - Figure drawn for 2001 AIME I #13.
- **Practice pass: Forms of a Line, Angle Between Lines, Shoelace and Pick's Theorem finished (2026-10-17):**
  - 2005 AIME I #10: $|980-56p|=140$ gives $p=15$ and $p+q=47$.
  - 2009 AIME I #11: the determinant is $2009(x_1-x_2)$, so the count is $2\binom{25}2=600$.
  - 2017 AIME II #10: $O=(12,24)$, $[BCON]=2184$, $P=(32,29)$, $[CDP]=546$.
  - 2019 AIME I #3 is now the sine area formula on the three corners ($150-10-7.5-12.5=120$), and 2025 AMC 12A #17 is base times height; neither cites the shoelace formula.
  - The AMC 10A/12A/12B line and angle problems state their numbers.
  - Figures drawn for 2017 AIME II #10 and 2019 AIME I #3.
- **Practice pass: point-line distance through rotations finished (2026-10-17):** ten vague strategies written in full and checked by computation.
  - 2024 AIME I #9: $\tfrac1{OA^2}+\tfrac1{OB^2}=\tfrac1{120}$, so $BD^2\gt480$.
  - 2020 AIME II #7: $r=\tfrac{15}{\sqrt{73}}$.
  - 2025 AIME I #9: the image is the reflection in $y=-\sqrt3x$ (two reflections make the rotation), so the point is on that line; it cites Composing Two Reflections.
  - 2021 AIME I #15: the combination $2(\text{first})+(\text{second})$ is a circle of radius$^2$ $\tfrac{325}{16}+\tfrac{3k}2$, so $k\le280$, with four intersections from $k=5$.
  - 2011 AIME I #3: the signed distances give $\alpha+\beta=\tfrac{403}{13}=31$.
  - 2000 AIME I #2: the area is $u(u+3v)=11\cdot41$, so $u+v=21$ (the old text had a placeholder).
  - 2005 AIME I #14: equal perpendicular segments in a square give $E=(2,-2)$ and $K=\tfrac{1936}{10}$.
  - 2010 AIME I #11: two cones, volume $\tfrac{343\pi}{12\sqrt{10}}$.
  - 2017 AIME II #12: $B=\tfrac{1-r}{1-ri}$, $|B|=\tfrac{49}{61}$ (checked by simulation).
  - 2017 AIME I #15: the third vertex on the hypotenuse is $\tfrac7{20}p+\tfrac{11\sqrt3}{60}q=1$, so the side squared is $\tfrac{300}{67}$.

**2026-10-10**

- One tag per card: the contest tier and the card's importance in one split oval (tier on the
  left, HIGH / MED / LOW / LOWER on the right). Importance is now judged inside each card's own
  subsection and no longer depends on the tier; all 644 cards were reassigned (`tools/importance-proposal.md`).
  The "Card labels" setting is gone. The level text (MATHCOUNTS, Olympiad) no longer appears beside the tag.
- One global filter (tier and importance) replaces the per-section filters. It applies to subject,
  group, and topic pages and to cards listed in two subjects, and the sidebar counts and greyed links follow it.
- Text size gains Larger. Card headers put the name, tag, and star on one centered line.
- Back links typeset math in card names; a card opened from a problem has a "Back to <problem>" link.
- Integrals use an upright, thin-spaced differential; the scanner flags the old form.
- Thumbnails show every case form on `triangle-type-by-sides`, `pythagorean-theorem`,
  `triangle-inequality`, `quadratic-formula`, `jensens-inequality`, `am-gm`, `erdos-mordell`,
  `ptolemys-inequality`, `menelaus-theorem`, and `eulers-criterion`.
- Nested Subset Pairs gained the membership-pattern extension to any number of subsets.
- A problem page reached from a card you opened from it no longer offers "Back to <card>" (the card is one click away where you opened it).
- Card headers: the tag drops to a second line, instead of squeezing the name, when there is no room; the star and add buttons stay top right.
- Worked examples are no longer reused between cards (the 13-14-15 triangle was in thirteen cards); a gate keeps converted cards' triangle examples distinct.
- AMC and AIME problem statements and figures (1,355 of 1,357 problems, 119 SVG figures) now appear on the problem page, with the MAA credit line; they are fetched from LIVE by Po-Shen Loh by `tools/fetch-live-statements.py` and checked by `tools/check-statements.py`.
- Problem figures are drawn at one consistent size: each is scaled, up or down, to fit a 420 by 280 box.
- Formula conversion in priority order (importance, then tier): the 36 most-used HIGH cards (series, probability, logarithms, factoring identities, quadratics, floors, complex numbers, counting basics, averages, the binomial theorem and Pascal's rule, trigonometric identities, relative motion, coordinate formulas, the conics, AM-GM, Cauchy–Schwarz, expected value, volumes, and more) are in the new template, with fresh examples; 226 of 484 formula cards are converted.
- Formula conversion batch P5 and P6 (HIGH importance): non-adjacent selection, pigeonhole, lattice points and gcd, space diagonal, handshake lemma, sphere and cone formulas, Eulerian paths, point-plane distance; then Burnside's Lemma, permutation cycle structure, orthocenter reflections and distances, the determinant as signed area, counting surjections, the Incenter–Excenter Lemma, small determinants, the cross-ratio, and addendo/componendo/dividendo. Each has Key forms, Conditions, a verified fresh example, and a figure where one helps.
- Formula conversion batch P7: the last HIGH card (stars and bars) and the first MED cards in order: De Moivre's Theorem (now with the $n$th-root formula), roots of unity, change of base, linear recurrences, Thales' Theorem, power sums, rotating a point, and product-to-sum.
- Formula conversion batch P8 (MED, AMC): handshakes and diagonals, the radical axis, conjugate root theorems, absolute value rules, work rates, binomial probability, triangular numbers, Binet's formula, and exponent laws.
- Formula conversion batch P9 (MED, AMC): numbers worth recognizing, circular arrangements, lattice grid paths, the Multinomial Theorem, Descartes' Circle Theorem, common tangent lengths, the equation of a circle, the Rational Root Theorem, and the sum-zero identities.
- Formula conversion batch P10 (MED, AMC): average speed, Vandermonde's Identity, partitions and compositions, Bayes' Theorem, equal chords and arcs, Euler's Polyhedron Formula, the 15-75-90 triangle, the 13-14-15 triangle, and the Fundamental Theorem of Algebra. The cotangent-rule example moved to its own triangle so the 13-14-15 triangle belongs to its own card.
- Formula conversion batch P11 (MED, AMC): coefficient sums, the vertex of a parabola, $a^3+b^3+c^3-3abc$, arithmetico-geometric sums, the first-order recurrence, common angle values, harmonic addition, the hockey stick identity, and regions from lines and circles.
- Formula conversion batch P12 (MED, AMC): the hypergeometric distribution, Pitot's Theorem, the angle between lines, Pick's Theorem, the British Flag Theorem, the section formula, the parabola's focus and directrix, eccentricity, and distance in three dimensions.
- Formula conversion batch P13 (MED, AMC): $a^n \pm b^n$, Euler's Formula and polar form, rectangles in a grid, the committee–chair identity, derangements, the angles at the triangle centers (with the obtuse-triangle cases stated), Brahmagupta's Formula, Cavalieri's Principle, and the volume of a frustum.
- Formula conversion batch P14 (MED): the SOS identity, maximizing a product with a fixed sum, the QM–AM–GM–HM chain, special trigonometric values, stars and bars with upper bounds, Newton's Sums, composing reflections, the dot product, and symmedians. The upper-bound example now lives only on its own card and Stars and Bars points to it.
- Formula conversion batch P15 (MED, AIME Early): triple angle formulas, arctangent telescoping, inverse trigonometric identities and ranges, Catalan numbers, tests for a cyclic quadrilateral, center coordinates as weighted averages, rotation and reflection matrices, the cross product, and the Rearrangement Inequality.
- Formula conversion batch P16 (MED, AIME): nested subset pairs, the sum of squared binomial coefficients, the Law of Total Expectation, expected fixed points, the insphere radius, a plane from its intercepts, the Fermat point, area under orthogonal projection, and sums of sines in arithmetic progression.
- Formula conversion batch P17 (MED, AIME Late): the Apollonius circle, Ptolemy's Inequality, classifying a second-degree equation, the tail-sum formula, cyclic quadrilaterals with perpendicular diagonals, matrix multiplication, Cramer's Rule, more factorizations, and Bernoulli's Inequality.
- Formula conversion batch P18 (MED, AIME Late and Olympiad): Jensen's Inequality, the Power Mean Inequality, Zeckendorf's Theorem, Stirling and Bell numbers, Ramsey $R(3,3)$, the planar graph edge bound, Pascal's Theorem, pole and polar, and harmonic bundles.
- Formula conversion batch P19 (end of MED, start of LOW): Hall's Marriage Theorem, Kőnig's Theorem, the square inscribed in a triangle, counting functions, waiting for success, turn-based games, the angle between two tangents, the common chord of two circles, and polar coordinates.
- Formula conversion batch P20 (LOW, AMC): isoperimetric facts, the product of pairwise sums, factorial telescoping, reduction identities, absolute value identities, subset-sum facts, the twelvefold way, Moser's circle, and Pappus's centroid theorems. All MED cards are now converted except four figure-specific ones held for the Common Figures merge.
- Problem statements: formula-shrinking size commands (`\tiny`, `\small`, ...) from LIVE are stripped (2023 AMC 12A #25's fraction was unreadably small); answer choices that are long now sit one per line (`tools/choice_layout.py`, also run by the importer); the table in 2024 AMC 10B #19 is typeset as a real table; the brick figure for 2024 AMC 10B #25 was redrawn (the new 2 by 2 by 7 block is a tall column, as the problem's "1 unit taller" requires). `tools/check-statements.py` rejects size commands and long inline choices. Statement and figure URLs carry `STATEMENTS_V`, so a browser reloads them.
- Settings: "When the app opens" (Front page, Formulas, or Where I left off) lets the front page be skipped; the logo still goes to it.
- Search-box commands: typing `Special:Random` or `Special:Browse` now offers High, Medium, Low, Lower, and Lowest after the kind, subject, tier, and level, so `Special:Random/Formula/Geometry/Medium` is suggested step by step; a command typed in full lists what can follow the slash. `Special:RandomProblem` and `Special:RandomStarred` became `Special:Random/Problem[/contest[/difficulty]]` and `Special:Random/Starred` for consistency (the old names still work but are no longer listed).
- Formula conversion batch P21 (LOW): Descartes' Rule of Signs, Weighted AM–GM, distance products over roots of unity, Miquel's Theorem, the reflective property of the conics, the distance between skew lines, distances between triangle centers, the Lemoine point, and the Gergonne and Nagel points. (The Lemoine example previously used an impossible triangle area; it now uses a real triangle.)
- Formula conversion batch P22 (LOW): Ptolemy's Second Theorem, the diagonals of a cyclic quadrilateral (the two cards now divide the work: the ratio and its proof, then the explicit diagonals), Pick's Theorem on any lattice, on a triangular grid, and with holes, vector projection, harmonic quadrilaterals, Cauchy's functional equations, and Chebyshev polynomials. Candidate to merge later: Ptolemy's Second Theorem and Cyclic Quadrilateral Diagonals state the same fact.
- Formula conversion batch P23 (LOW): antisymmetric factorizations, powers of $x + 1/x$, the generalized binomial series, the exponent–log swap, high-power sine and cosine sums, identities for angles summing to $180^\circ$, squared-angle identities, Gaussian and Eisenstein integers, and the alternating sum of squared binomials.
- Formula conversion batch P24 (LOW): odd entries in a row of Pascal's triangle, the ballot problem, order statistics on $[0,1]$, graph coloring bounds, Eisenstein's irreducibility criterion, Schur's, Muirhead's, and Hölder's inequalities, and Dilworth's Theorem.
- Contest profiles are roles, not examples: 62 profiles that carried a worked example, a quoted sample problem, or a computed value now describe the role in words, and `tools/scan-conventions.py` rejects the pattern (CONVENTIONS, last section).
- Formula conversion batch P25 (LOW, then LOWER): Sperner's Theorem, Erdős–Szekeres, Turán's Theorem, base-10 curiosities, lattice points on a circle, the arbelos, circles inscribed in a corner, Ptolemy on an equilateral triangle, and the circumradius of a cyclic quadrilateral.
- Formula conversion batch P26 (LOWER): De Gua's Theorem, the Brahmagupta–Fibonacci identity, finite sums of squared cosecants and cotangents, telescoping cosine products, evenly spaced angle products, cotangent–tangent telescoping, Hermite's Identity, Golden and Ramanujan nested radicals, and Pisano periods.
- Lucas' Theorem and Odd Entries in a Row of Pascal's Triangle now prove everything they claim: the divisibility lemma for $\binom pj$, the freshman's dream and its iteration, the digit-by-digit expansion, the uniqueness of base-$p$ digits, each corollary (divisibility, the count $\prod(m_i+1)$, the binary case), and the special rows and Sierpiński self-similarity. A proof-depth pass over all thin cards is planned (CONVENTIONS, last section).
- Break up big paragraphs: a long explanation is split by centered display equations (the key line of each step on its own line), by a figure where one helps, and by plain lead-ins such as "Step 1, the lemma." Applied first to the Why it works proofs of Lucas' Theorem and Odd Entries in a Row of Pascal's Triangle, which now run as numbered steps with centered key lines; the second card gained a computed Sierpiński figure (rows 0 to 15 mod 2, odd counts checked against $2^{s_2(n)}$). The same guideline holds for every card from now on (CONVENTIONS, last section).
- New formula card **Brocard's Theorem** (Geometry, Projective Geometry & Cross-Ratio; Olympiad, lower): the circumcenter of a cyclic quadrilateral is the orthocenter of its diagonal triangle, with a proof from Ceva, Menelaus, and the polar, a computed figure, and a fresh example. The method card "Drawing the Bisector to Compare Distances to Two Sides" is now "Drawing the Angle Bisector to Compare Distances to Two Sides".
- **New importance level, Lowest** (Stanley, 2026-10-10). Lower means marginal use, needed perhaps once in ten years; Lowest means confidently never used on a contest, kept for completeness or beauty. Added to the tag (LOWEST, fainter than LOWER), the Filters popup, the `Special:Random` and `Special:Browse` suggestions and parser, the sort order, and the scanner. A saved filter that shows Lower now shows Lowest too. 21 of the 95 Lower cards moved down: Cardano's Cubic Formula, Morley's Trisector Theorem, Mollweide's Formula, Soddy–Gosset (3D Descartes), the Cayley–Menger Determinant, Möbius Transformations, Pappus's Hexagon Theorem, Pick's Theorem on hexagonal grids, the Japanese Theorem, Poncelet Closure, Eigenvalues & the Characteristic Polynomial, Resultant & Discriminant, Wolstenholme's Theorem, Pisano Periods, Carmichael Numbers, Floor-Sum Reciprocity, Dirichlet Convolution, Stirling Numbers of the First Kind, the Coprime Probability, Probability Generating Functions, and Markov's Inequality. Chebyshev's Sum Inequality stays Lower. Counts now: High 137, Medium 278, Low 136, Lower 74, Lowest 21.
- Formula conversion batch P28 (LOWER): Feuerbach's Theorem (proved by vectors from Apollonius, the distance formulas, and Heron), the Leibniz Point-Mass Formula (with the general weighted proof and the British Flag Theorem as a case), the Orthocentric System (with the circumcenters shown to be the point reflection through the nine-point center), the Spieker Point (full barycentric proof of the Nagel line), the Butterfly Theorem (a short coordinate proof), Reim's Theorem (directed angles, both directions), Casey's Theorem (proved from the tangent-length formula and Ptolemy), the Sawayama–Thébault Lemma (proved from Casey, Menelaus, and the angle bisector theorem), and the Mixtilinear Incircle (proved from Casey: $AE = \frac{bc}{s}$, the radius, $I$ as midpoint, and the $T, I, M_A$ collinearity). Reim's card latex and the mixtilinear homothety statement were also corrected. 444 of 486 formula cards are now converted.
- Formula conversion batches P29 to P31 (the rest of the queue, format only, proofs deferred to the proof-depth pass): Japanese Theorem, Poncelet Closure, Newton–Gauss Line, Pick's Theorem on hexagonal grids, Points in Convex Position, Sylvester–Gallai, Helly, Minkowski's Lattice Point Theorem, Soddy–Gosset, Cayley–Menger, Brianchon, Pappus's Hexagon Theorem (P29); Desargues, Möbius Transformations, the Miquel Point of a Complete Quadrilateral, Resultant & Discriminant, Eigenvalues, Lagrange's Identity, Abel Summation, Maclaurin, Chebyshev's Sum Inequality, Karamata, Fermat Numbers, Carmichael Numbers (P30); Farey Sequences, Beatty's Theorem, Floor-Sum Reciprocity, EGFs, Pólya Enumeration, Stirling Numbers of the First Kind, Sprague–Grundy, Markov's Inequality, the coprime probability, PGFs, the Matrix–Tree Theorem, LGV (P31). Each now has Key forms, Conditions, Why it works, Useful observations, Applications, and a role-only Contest profile, and keeps its existing example. **480 of 486 formula cards are converted; the 6 left are the figure-specific cards held for the Common Figures merge.**
- **Problem text for every AMC problem (2026-10-11).** The database now lists every AMC 8 (1985 to 2025 except 2021, called the AJHSME until 1998), AMC 10 and AMC 12 (2000 to 2025; 2000 and 2001 are single sittings) problem LIVE publishes, 4,567 problems with text in all (it was 1,357), each added as a text-only entry with no tags; its page says "Not classified yet" until it is tagged. `tools/fetch-live-statements.py --all` finds the sittings and adds the entries; sittings LIVE lacks are in `tools/live-missing.md`. The importer now also turns a bare money dollar sign, sub- and superscripts, and list items into safe text, and answer choices that are pictures (marked `@@ci:...@@`) show small beside their letter.
- **Statement display.** Each answer choice is its own block with vertical room, so fraction choices no longer overlap (2017 AMC 12A #25); 2024 AMC 10B #25 shows the correct two-view brick image (a PNG supplied by Stanley); the two 2021 Fall AMC statements (10B #11, 12B #23) come from the AoPS Wiki and the page says so. The contest box on a problem page is centered in its heading and wide enough for 25 problem numbers on one line.
- **Contests box.** The number beside a contest reads "N problems written", the number that have their solution in the app (a strategy or tagged cards), not the number that only have their text (HMMT February shows "10 problems written"). Contests still to come (HMMT November, MATHCOUNTS, ARML, AHSME, BMT, PUMaC, CMIMC, SMT, CHMMC, DMM, MMATHS) are listed in `js/data/problems/contests-planned.js` and shown only after pressing Show unwritten contests; AMC 8 now sits after AIME.
- **Problem search deleted (2026-10-11).** The Practice-page problem search was built, then shelved, and is now deleted for good at Stanley's request: `tools/shelved/` is gone and nothing in the app refers to it. The card search is unchanged.
- **New cards: the Functions cluster (2026-10-11).** Three cards, all medium: **Odd and Even Functions** and **Properties of Inverse Functions** (formulas, AMC, in a new Algebra subsection *Functions & Symmetry* and a new AMC algebra route section of the same name), and **Writing a Function's Symmetry as an Equation** (a method, AIME Early, in a new method group *Working with Functions* and the AIME algebra route). Each has a verified example (parity trick on a degree-7 polynomial; the inverse of a cubic and its crossing with its inverse; an axis plus a center giving period 8) and a figure. Proofs are in the cards; deeper ones wait for step R.
- **New cards: N1, N2, N6, N7 and the Functions & Symmetry list (2026-10-11).** **Distance Between Parallel Lines** (formula, lower, AMC; the parallel-lines form moved off Point-to-Line Distance so nothing is stated twice), **Vector Bashing** (method, low, AIME Early; beside the coordinate, trig, and complex bashes), **Tangent Lines to a Circle from a Point (Distance Method)** (method, low, AMC; deliberately not linked to Exactly One Common Solution), and **Minimizing $\frac{y-a}{x-b}$ as a Slope** (method, low, AMC; under Inequalities & Optimization). Each has a verified example (checked numerically) and a figure, a route placement, aliases, and search ranks first for its natural name. A new configuration list, **Functions & Symmetry**, gathers the function cards. Writing a Function's Symmetry as an Equation also gained a top-of-card diagram of the three symmetry kinds.
- **Figure reference cards (2026-10-11).** Shapes are reference formula cards, not pattern cards, because a shape is too broad to say what to do. The nine pattern cards first built for a "Common Figures" group were removed, and the group with them. Kept as reference formula cards: **Regular Hexagon of Side $s$** (now also holds Diagonals of a Regular Hexagon, whose id redirects), the new **Regular Octagon of Side $s$**, **Regular Dodecagon of Side $s$** (with the chord table), and **Equilateral Triangle of Side $s$** (moved out of Ratios & Constants), all in Polygons & Quadrilaterals; **Regular Tetrahedron of Side $s$**, **Regular Octahedron of Side $s$**, and the new **Cube of Side $s$** in Solid Geometry (3D), rewritten so no fact is on two cards. **An Isosceles Trapezoid** stays a pattern, now in Polygon Configurations. New cards **Parallelogram Area** (height form and sine form) and **Parallelogram Vertices Using Vectors** ($A + C = B + D$); **Quadrilateral Areas** lost its parallelogram form; **Euler's Quadrilateral Theorem** has a second line and an explanation for the parallelogram law; **Right Triangle Inradius** is now **Right Triangle Inradius and Circumradius**; the **Right Triangle with the Altitude to the Hypotenuse** thumbnail shows all four relations. Deleted without a replacement: An Isosceles Triangle, A Right Triangle, A Parallelogram, A Rhombus or Kite, A Rectangle or Square (their facts were already on other cards, and the rhombus inradius was added to Quadrilateral Areas).
- **Card content review, second list (2026-10-11).** **Distance Between Skew Lines**: the volume route said $d = 3V/[\cdot]$, which is half the distance (and $3V$ over a face area is a vertex-to-face distance); the correct form is $d = \frac{6V}{AB \cdot CD \cdot \sin\theta}$ for a tetrahedron with edge $AB$ on one line and $CD$ on the other (checked numerically). **Special Triangles from the Law of Cosines**: dropped the keyword "four five six triangle", which matched nothing on the card. **Weighted Binomial Sums**: the weight-$k$ sum $n \cdot 2^{n-1}$ lives only on the Committee-Chair card now. **Hexagonal Pick**: thumbnail shortened so it no longer scrolls at 1280.
- **Card content review, 2026-10-11 (Stanley's lists; about 26 items, each checked against the text and by computation first).** Fixed: **British Flag Theorem** (the 3D identity is $2PA^2 + PG^2 = PB^2 + PD^2 + PE^2$ with the three neighbors of $A$; the example relabeled), **Ptolemy's Second Theorem** (mnemonic corrected, and **merged** with Cyclic Quadrilateral Diagonals, whose explicit $p^2$ and $q^2$ formulas, proof, and figure it now carries; the old id redirects), **Cayley-Menger** (the triangle version is the $4 \times 4$ determinant, equal to $-16[\triangle]^2$; d, e, f named), **Isosceles Tetrahedron** (a disphenoid is not orthocentric: keyword removed), **hexagonal Pick** (the unit is a triangle of the center lattice, two per cell), **Pick on Any Lattice** (wording only; the worked example already existed), the undefined $P$, $E$, and Reim's collinearity, **Brahmagupta's Formula** (circumradius now only on its own card), **Regular Polygon Area** (octagon and dodecagon results left to their cards), eight cards with a repeated keyword (new gate), **Order Statistics** (with and without replacement), **Squared Binomial Sum** (the sum counts outcomes; the probability is $\binom{2n}{n}/4^n$), **the Twelvefold Way** (the missing at-most-one column; all twelve cells brute-force checked), **Max Product with Fixed Sum** ($n \ge 2$), **Zsigmondy's Theorem** (spelling), **Wald's identity** (hypothesis and a counterexample), **Arctangent Telescoping** ($ab > -1$), **the determinant as signed area** (absolute value on the area), **Bertrand**, **Eisenstein norm**, **Zeckendorf**, the cube formula on An-minus-Bn, the triangle angle identities, and the sine product (one home: Evenly-Spaced Angle Products); the three-cotangent relation now lives only on the angle-sum identities card and the two-term Lagrange case only on the Brahmagupta-Fibonacci card. New checks: `scan-conventions.py` fails on a repeated keyword and on a tab; `tools/find-duplicate-forms.py` lists formulas stated on two cards or twice on one. Rule 17 in the plan and a section in CONVENTIONS.
- **Dark mode, popups, tabs, problem text (2026-10-11).** The selected chips in the Filters window, the topic chips and the apply button in Browse by Tag, the window titles, the selected year tab, and the problem statement (text and math) now draw one step below white (#d3dae9, heading shade, or #cdd5e8 for the statement). Dark only. `css/styles.css` v248.
- **Dark mode, front page (2026-10-11).** The front page's "How the four fit together" and "Jump to" section (heading, the four questions, the chain sentence, the jump links, the Search button) drew near-white; it now uses #b3bcd5 (buttons #d3dae9), dark only. `css/styles.css` v246.
- **Dark mode, second pass; the 13-14-15 card; UI scanner (2026-10-11).** In dark mode only, the Related chips now use the heading shade, the random-problem buttons (and the selected contest button beside them) draw in #d3dae9 instead of pure white, and the math in formula boxes draws in #cdd5e8; light mode is unchanged (checked). The **13-14-15 Triangle** card had four literal tab characters where `\tfrac` belonged (the String.raw text was pasted through something that expanded `\t`), so the circumradius, exradii, and cosines showed as `frac{65}{8}` and so on; fixed, and `tools/scan-conventions.py` now fails if any data file under `js/data` holds a tab or other control character. `tools/ui-scan.js` is the reusable page scanner from the UI pass (page overflow, off-edge elements, clipped text, scrolling formulas, KaTeX errors, broken images); the whole-app UI scan is on hold after its first pass (all 656 card pages at 1280 and 375, 201 other routes at 375, the popups; four phone overflows fixed: the Descartes sphere key form, the arctan example, the mass-points hint, and the table wrapper). `css/styles.css` v244.
- **Dark mode: softer headings (2026-10-11).** Headings, labels, table cells, and names drew in the same near-white as body text and glared. New dark-only tokens `--text-head` (#c3cce2) and `--text-table` (#aeb8d1) now colour: the HIGH/MED/LOW half of the tag, Overview, the sidebar subject buttons, card, group, and section headings, the Contest profile labels (Problems:, Contests:, Difficulty:, Role:), Example 1. and the other example headers, the practice-problem rows and the Problem N cards, study-list titles, contest names, and table cells. Every rule is scoped to `data-theme="dark"`, so light mode is unchanged (checked: the same elements read #1b2333 in light). `css/styles.css` v242.
- **Figure audit (2026-10-11).** All 853 problem figures were checked: 710 statement figures and 144 answer-choice pictures (a few figures are shared), every one referenced by a statement, every file used, none missing, all load in the app. Every statement figure was rendered to a contact sheet at the size the app draws it (AIME 1983 to 2026, AMC 8 1985 to 2025, AMC 10 and AMC 12 2000 to 2025, the Fall 2021 PDF crops) and every choice picture to a second set; none was the wrong picture for its problem, cropped, blank, or drawn over by its labels (the SVGs are cut to their drawn content, so nothing is clipped). The older LIVE PNGs (AMC 8 1989 to 2008, AMC 10 and 12 around 2005 to 2012) are low resolution and look soft when enlarged; the sources have no better copy. One fix: a very thin strip (the rows of numbered cards in AMC 10 2022A 22, AMC 12 2022A 19, and AMC 12 2021B 22) used to shrink to under 40 pixels tall with digits too small to read, so a figure that would come out under 60 pixels tall now may run up to 600 pixels wide (on a phone it still fits the screen). `js/app.js` v408.
- **Methods and patterns audit, first pass (2026-10-11).** All 30 patterns and all 135 methods were read against the anatomy. *Patterns:* every pattern's Distinguishing clues is now a list of at most five clues with a near-miss ("Not this pattern: ..."). *Methods:* about 85 got one added sentence in When to use naming the lookalike where the move is the wrong tool (with a link to the right one where a card exists), the three methods with five traps were cut to four (Vector Bashing, Writing a Function's Symmetry as an Equation, First-Step Analysis), and the typo "The sign is" for "The signal is" was fixed in three cards. No pattern or method was split. One merge is proposed and waits for Stanley: the pattern **Same Remainder** into the method Subtracting Equal Remainders (the pattern suggests only that one move). The check of the practice problems found no recurring idea missing from the cards; the LIVE concept tags list six small candidates (a newly defined operation, logical deduction, organized listing, simulating a process, coins and prices, drawing without replacement), recorded with their evidence in `tools/live-missing.md` and waiting for approval.
- **Pattern and method anatomy, and three pilot cards (2026-10-11).** CONVENTIONS has a new section, *Pattern and method anatomy*: a pattern has a one-sentence opening, at most five clues in a list with one near-miss, at most four methods and four traps; a method has When to use with its lookalikes, at most six How steps, a Why it works that says where the move stops, and at most four traps. The scanner reports clue counts, trap counts, and non-list clues as warnings. Rewritten as pilots, ids kept: **Point Inside an Equilateral Triangle** (clues as a list with a near-miss, the worked example taken out of a formula bullet), **Quadrilateral Inscribed in a Circle** (clues as a list with a near-miss, formulas ordered from proving the circle to using it), and **Angle Chasing** (the lookalike where it is the wrong first step, and where the chase stops being valid).
- **Fall 2021 AMC 10A and 10B text (2026-10-11).** The statements and answer choices of all 25 problems of each paper (the 10B #11 already had its text) were typed from the two PDFs Stanley supplied, the MAA's official Fall 2021 AMC 10A solutions booklet and a copy of the Fall 2021 AMC 10B paper with its answer key. Only the problems were used, never the solutions. Every answer was re-derived by computation against the published answer, and seven figures were cropped from the PDF pages into `figures/amc10/2021FallA` and `2021FallB`. The statements live in `tools/manual_statements.py` and are written into `statements/2021.js` by the importer; the credit line says the text comes from the PDF copy. Fall 12A and 12B still have no text.
- **2021 Spring and Fall AMC (2021 had two seasons, each with an A and a B test).** The 2021 AMC 10A, 10B, 12A, and 12B from LIVE are the Spring papers, so they are now named "2021 Spring AMC 10A" and so on (problem references, statement slugs, and the importer; the AoPS link still uses the wiki's season-less name, and old links such as `2021-amc-10a-5` still open). The four Fall papers (10A, 10B, 12A, 12B) are added as sittings with all 25 problem numbers and no text yet, apart from Fall 10B #11 and 12B #23 which already had theirs; the contest page lists Spring before Fall within the year.
- **Inradius Formula and loose ends (2026-10-11).** Inradius Formula has a new figure showing the idea for polygons: a pentagon with an inscribed circle cut into five triangles of height $r$, so $A = rs$ for any polygon with an inscribed circle (with a note on Pitot's Theorem). Connected-formula rows were added on four hub cards (Odd and Even Functions, Point-to-Line Distance, Parallelogram Area, Regular Polygon Area), and `tools/importance-proposal.md` lists Brocard's Theorem, the Lowest and Lower moves, and the new cards. The three old-template cards (Golden Ratio & the Regular Pentagon, Isosceles Tetrahedron, Tetrahedron Centroid & Medians) were left as they are.
- **Formula lines setting (2026-10-11).** Settings has a new row, Formula lines (1, 2, 3, or All, default 1), the most rows of a card's formulas that a browsing card shows. A row is one form or one row of a stacked thumbnail; the card's own page shows everything. It replaces the old rule that large cards showed every form.
- **Pick's Theorem on a Triangular Grid merged into Pick's Theorem on Any Lattice (2026-10-11).** The triangular-grid case is now a worked example in the general card's explanation (the lattice basis, the fundamental rhombus as two unit triangles, $A = 2I + B - 2$ in unit triangles, the small-case checks, the trapezoid, and the hexagon figure), with its keywords, aliases, and levels carried over. The old id `picks-triangular-lattice` redirects (`MERGED_IDS`); the lists, links, register, and importance proposal were retargeted. Pick's Theorem on Any Lattice is now an AMC route card and left the additive AIME route.
- **Study lists (2026-10-11).** Eight new lists, 39 in all: **Proof Methods** (the 17 proof cards that sat in no list, in four sections), four **Starting Points** lists, one per subject, holding every High-importance card of Geometry (56), Algebra (36), Number Theory (19), and Counting & Probability (22) by topic and contest tier, a **Trigonometry Sheet** (25), a **Modular Arithmetic Toolkit** (16), and an **Inequalities Ladder** (16). A new list kind, Starting Points, appears beside the study routes; every card is now in at least one list; Brocard's Theorem joined Deeper Configurations. Lists still to come: a Functions and Symmetry list after those cards are written, a Common Figures cheat sheet with that group, and per-contest lists once the new problems are tagged.
- **Additive study routes (2026-10-11).** The MATHCOUNTS routes are gone (the app no longer has MATHCOUNTS), and the study-lists grid has three rows. Each route now builds on the one above: AMC 10/12 holds every card carrying an AMC level, AIME only the cards that are new beyond AMC, and Olympiad only what is new beyond AIME. A card appears in a higher route only when `tools/route-repeats.json` names it because that level uses it more broadly (AIME repeats three, Olympiad 26, such as the pigeonhole principle, invariants, Cauchy–Schwarz, and inversion). Sizes now: AMC 160, 115, 57, 66 (Geometry, Algebra, Number Theory, Counting & Probability, plus clock angle and base-10 curiosities, whose level tag was MATHCOUNTS only and is now AMC 10 and 12); AIME 79, 33, 29, 22; Olympiad 36, 24, 16, 19. `tools/check-lists.py` enforces it.
- **Find in page removed (2026-10-11).** The app's own Ctrl or Cmd+F find bar (added earlier the same day) was taken out at Stanley's request; the browser's own find is back. The code, styles, and CONVENTIONS section are gone.
- **Ramsey Number $R(3,3) = 6$ is Lowest (2026-10-11).** A fact that is never needed on a contest; it joins Cardano's Cubic Formula and Morley's Trisector Theorem at the bottom of the scale.
- **Landing page and Practice wording (2026-10-11).** The Practice tile reads "1,367 problems written", the number with their solution in the app (a strategy or tagged cards), the same number the Contests box shows per contest. The landing-page start setting, command search without a dropdown, and the Lowest filter chip were re-checked and work.
- Formula conversion batch P27 (LOWER): weighted binomial sums (now with the general Stirling formula), the necklace formula, variance and independence, Cayley's Formula (with the full Prüfer bijection), Cardano's cubic, Minkowski's Inequality (with the $p=2$ proof), continued fraction convergents, the Steiner line, and the Brocard angle.
- A command typed into the front page's search box now simply runs (no suggestion list there, where the header search is hidden).
- Search-box commands no longer offer the MATHCOUNTS / AMC 10 / AMC 12 / AIME "level" filter (levels left the app earlier, and combinations such as AMC tier plus AIME level made no sense); `Special:Random` and `Special:Browse` take a kind, a subject, a contest tier, and an importance.
- Problem statement files are versioned (`STATEMENTS_V` in `js/app.js`, bumped by `tools/fetch-live-statements.py`), so a browser that cached an older file reloads it.
- Problem statements: long displayed equations are no longer broken into odd lines. Root cause: LIVE writes its equations for a phone screen and cuts long ones by hand with `\\` inside `aligned`/`gathered` (continuations indented with `\quad {}`), which looks arbitrary on a wide page; the importer now joins a cut that only continues the line above, keeps real multi-line displays (systems, cases, matrices), and `check-statements.py` fails if a hand-cut continuation survives.
- The "Recently opened" chips keep their side room in compact and spacious density (the row padding had squeezed them); the 2025 AMC 10A #19 array is typeset with even columns.
- The folder was restored from GitHub (`Almond200/CompMath2.0`), is a git clone again, and has a `.gitignore`.
- The AIME-L tier tag is a soft violet instead of the muddy gold.
- The sidebar follows scrolling on every subject page, marking the topic or group in view and keeping its link visible.
- New card: Stretching One Axis Scales Area (`axis-stretch-area`), with a figure and the largest-inscribed-triangle example.
- Formula conversion: batches G7 and G8 (cotangent rule through Simson line); Euler line figure redrawn to show the three line families.
- Formula conversion continued: 56 cards converted (batches through G6), with new figures for
  `median-triangle-area` and `law-of-tangents`.

**2026-09-27**

- Connected formulas: a curated row on 15 broad cards (83 links), drawn in Related's chip
  style, gated by `check-lists.py`.
- Special pages and commands, with a Wikipedia-style dropdown of suggestions under the search
  box; a Commands group in Settings, collapsed behind "Show all commands".
- Flashcards joined the lab. A setting hides figure captions on card faces.
- Expanded notation now covers all 93 cards whose formula uses a sigma or product sign, and the
  Key forms bullets that use one, through `latexPlain` and `\alt{..}{..}`.
- New gate `tools/check-labels.py`: renders every figure in Chrome and fails on a label that
  touches a dot, a line or another label, leaves its canvas, was moved more than 14px by the
  tidy pass, or has an arrowhead running into it.
- Typo tolerance counts a transposition as one edit.
- Cards merged: `digit-sum-mod-9` into `divisibility-rules` (with the $101$, $1001$ extension of
  the rule for $11$), `vp-factorial` into `legendres-formula`, `angle-bisector-reflection` into
  `perp-to-angle-bisector`. Cards added: `linear-change-of-variables` and `polar-coordinates`.
  Card count 556.
- Two write-ups lost to a merge script (`recognition-numbers`, `gcd-substitution`) were restored,
  and `scan-conventions.py` now fails on any card without a write-up (CONVENTIONS §6).
- Cross-links: each card is linked at its first mention on the page, once (212 links moved, 154
  of them into descriptions, which now carry links on the card page), and linking never lowers
  capitals: named results keep them everywhere (417 fixed). Both are gated by
  `scan-conventions.py`.
- The sidebar became three books, Formulas, Methods, and Patterns, each listing the four
  subjects; a Methods or Patterns subject opens on a page of its own ("Geometry Methods").
- New card: Odd Number of Divisors (Patterns › Number Theory), with a divisor-pairing figure and
  the locker puzzle. Card count 557.
- Primes Are $6k \pm 1$ now shows $p^2 \equiv 1 \pmod{24}$ in its formula box, rewritten with a
  residue-grid figure. Handshake Lemma gained a figure of edge ends and a section on polyhedra
  (vertex degrees and face sides both sum to $2E$). Ramsey Number $R(3,3) = 6$ gained a widget:
  random colorings of the 15 pairs, the one-color triangle drawn bold, and the five-person
  coloring with none.
- Linear Change of Variables now answers "mapping one plane to another" (its intro never said
  "map" or "plane"; it ranked nowhere, and now ranks first).
- The Oxford comma everywhere (303 series fixed by hand review).
- Rewritten to the teaching standard: 212 of 557 cards.
