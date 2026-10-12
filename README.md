# Competition Math Reference

A searchable reference for MATHCOUNTS, AMC 10/12, AIME and olympiad training. 557 cards
covering formulas, methods, and patterns, plus a database of
1367 past contest problems cross-linked to the cards their solutions run through.

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
- **Problem pages** (`#/problem/<slug>`): the statement first (AMC and AIME problems; other contests link out),
  with its credit line, then the strategy, and near the bottom the chain of cards the problem uses
  (Pattern → Method → Formulas). A problem with a figure says so and points to AoPS.

## Credits

AMC and AIME problems are © the Mathematical Association of America and are shown under
the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) licence the MAA confirmed
by email (Oct 2026). The statements and their figures are read from [LIVE by Po-Shen Loh](https://live.poshenloh.com/past-contests),
which publishes every AMC and AIME problem with the MAA's permission; each problem page carries a one-line credit
under the statement. This app is non-commercial. `tools/fetch-live-statements.py` fetches them (statements and
answer choices only, never solutions or hints) into `js/data/problems/statements/<year>.js` and `js/data/problems/figures/`.
(AoPS blocks scripts with a Cloudflare check, so it is not used.)
- **Practice** (`#/practice`): a random problem by contest (or any) and optional difficulty, your lists
  (and a box to make one), every year of every contest, and the study lists. A contest year
  (`#/problems/aime/2024`) and a single list (`#/list/<id>`) open as plain pages with a link back.
- **Search** results are one list in order of relevance (formulas, methods, patterns, problems
  and study lists, each labelled), shown full width with no space highlighted. So are tag pages
  and special pages.

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

`tools/search-eval.html` runs 185 labelled queries against the live app and diffs every one
against `tools/eval-baseline.json`. Current: 170/185 top-1, MRR 0.950 (warm run), with the two
probe sets at 64/78 and 48/77.
**Wait for the semantic vectors to load before reading results**, or the run under-reports
by a point or two; compare warm runs to warm runs.

## Other features

- **Contest tiers** label every card with where it is first needed: AMC (AMC 10 and 12 problems 1 to
  25), AIME Early (AIME 1 to 10), AIME Late (AIME 11 to 15), or Olympiad. Tier and level filters
  narrow any section; Settings switches the label to importance (`high` down to
  `lowest`), and cards are ordered by tier by default.
- **Problems**, reached from Practice by contest and year, each linked to the cards its
  solution uses, with a pattern, method and formula chain and a strategy that stays hidden until asked for.
- **Study lists**, also on Practice, hold 31 curated sets alongside your own. Twelve contest routes
  (tier x subject) plus four olympiad ones are *complete by construction* — every card
  carrying that level and subject is in them, which `tools/check-lists.py` enforces. A list
  you build yourself is grouped into sections automatically, by matching its cards against
  the hand-written section headings already used across the built-in lists.
- **Diagrams** are computed from exact geometry rather than sketched, so every point is a
  true intersection, foot or tangency. Settings can show figures on the card faces too (off or on), and long write-ups place further figures inside the text, next to the
  paragraph each one illustrates (152 on 130 cards).
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
js/data/problems/*.js          contest problem database
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
```

Run every checker before committing (the seven in CONVENTIONS §7); each exits non-zero on a
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

Longer content goes in the id-keyed side files: `## Why it works`, `## How to use it` and
`## On contests` in `js/data/details/`, a `{ q, s }` pair in `examples-supplement.js`. On a
method or pattern card a leading `## Key forms` block is pulled out and rendered under the
description; each bullet may carry an explanation after a ` — `, shown as gray subtext.

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
- **Gates run on Linux too.** The gates hard-coded macOS paths. They now read `JSC` and `CHROME` from the environment, falling back to the Mac paths. `tools/jsc-node` is a small Node stand-in for `jsc` (`load`, `print`, `read`, `quit`), and `check-labels.py` passes `--no-sandbox` when it runs as root. On Linux, `check-labels.py` reports five far-move labels (`thales-theorem`, `radical-axis`, `weierstrass-substitution`, `harmonic-addition`, `vertex-form`) that come from different font widths; on the Mac they pass. The semantic search index (`tools/build-search-index.py`) cannot be rebuilt from a cloud session, because its model download from HuggingFace is blocked there. Rebuild it on the Mac after pulling; until then, new cards rank by the lexical search alone.

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
