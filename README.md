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
  true intersection, foot or tangency. Settings can show figures on the card faces too (off,
  curated, or every one), and long write-ups place further figures inside the text, next to the
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
  spacing of the whole app), card size (regular, two across on a laptop, or large, one across with every form of
  a formula shown), text size, scroll speed (Slow, Normal or Fast: how far one wheel step moves a
  page; Normal leaves the browser's own scrolling alone), subject pages (cards or a wiki-style A-Z index), card
  order, keyword chips, figures on card faces (off, curated, or on), and **notation**: in the expanded form, every formula
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
  `Special:Unclassified` (problems still waiting for a card), and `Special:Recent`.
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
  importance: "high",                        // high | medium | low | lower | lowest
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

## Changelog

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
