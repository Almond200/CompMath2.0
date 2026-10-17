# Competition Math Reference: status and plan

**A new chat starts here.** Read "Current state" first, then the open work in section 2. The rules for how things are done are in `CONVENTIONS.md`; what changed and when is in the `README.md` changelog. `CLAUDE.md` points every new session to this file.

**The handoff rule.** After every major change, every finished step, and the start of every new step, update "Current state" below and push. Credits can run out at any moment, so this block must always say exactly where the work stands and what the next action is.

## Current state (updated 2026-10-17, fourth cloud chat)

- **Counts:** 707 cards (522 formulas, 146 methods, 39 patterns). 4,675 problems, 4,616 with statements, 1,370 with strategies, 1,369 tagged. 213 problems have figures drawn for the app.
- **Last finished:**
  - 2.7a groundwork: the "Alternatively, ..." paragraph (`trick`) and its dashed cards now show on problem pages; app-drawn problem figures (`js/data/diagrams/problem-diagrams.js`, `GEO_KIT`), covered by `check-diagrams.py`, `check-labels.py` and `check-statements.py`;
  - 2.7a, card 1 (Pythagorean Theorem): **finished**, all 76 problems re-solved, retagged and checked; 21 citations dropped, so the card cites 55 (a trick-only citation still counts).
  - 2026 AIME I #3 now cites the method `triangle-of-centers` (Joining the Centers of Tangent Circles), asked by Stanley.
  - 2.7a, card 2 (Special Right Triangles): **finished**, all 24 problems checked (5 of them were already done under card 1).
  - 2.7a, card 3 (Altitude to the Hypotenuse): **finished**, all 5 problems.
  - 2.7a, card 4 (Median to the Hypotenuse): **finished**.
  - 2.7a, card 5 (Triangle Inequality): **finished**.
  - 2.7a, cards 6 and 7 (Triangle Similarity, all 12 already covered by earlier cards; Perpendicular Bisector as a Locus): **finished**.
  - 2.7a, card 8 (Similar Figures, 59 problems): **finished**; many AA similarities moved to `triangle-similarity`.
  - 2.7a, cards 9 to 11 (Midsegment, Intercept, Centroid): **finished**.
  - 2.7a, cards 12 to 14 (Cevian Area Ratio, Polygon Angle Sums, Regular Polygon Area): **finished**.
  - 2.7a, card 15 (Equilateral Triangle Facts): **finished**.
  - 2.7a, cards 16 to 20 (regular hexagon and octagon, quadrilateral areas, trapezoid segments, diagonal area): **finished**.
  - 2.7a, card 21 (Standard Triangle Area): **finished**.
  - 2.7a, card 22 (`trig-area`): **finished**.
  - 2.7a, card 23 (Heron's Formula): **finished**.
  - 2.7a, cards 24 to 30 (inradius, circumradius, right-triangle inradius, incircle tangent lengths, shared-angle and same-base ratios, exradii): **finished**.
  - Missing cards P1 to P4 (QUESTIONS.md) **approved and written**: `diagonal-angle-from-sides`, `squares-on-triangle-flanks`, `parallel-sided-hexagon`, `product-of-uniforms`, each with a write-up, an example, a figure, routes and a new-cards batch; 2021 AIME II #12, 2019 HMMT February Geometry #10, 2024 AIME II #5 and 2024 AMC 12A #20 cite them.
  - P6 **approved and written**: the method `closing-polygon-vectors`, cited by 2026 AIME I #14.
  - P5 **approved and written**: the method `conjugate-both-sides`, cited by 2018 AIME I #6, 2001 AIME II #14 (both rewritten in full) and 2020 AMC 12B #23 (first strategy).
  - 2.7a, card 31 (`law-of-sines`): **finished**, 15 strategies and 7 figures (2018 AIME II #14 now cites the ratio lemma and the Law of Cosines instead, and got its figure too).
  - 2.7a, card 32 (`law-of-cosines`, 46 problems): **finished**; 27 strategies completed or rewritten, 24 figures drawn.
  - 2.7a, card 33 (`law-cosines-60-120`, 5 problems): **finished**; 2017 AMC 12B #15 (the twin of 10B #19) tagged, 1987 AIME #9 drops `fermat-point`, 2022 AIME I #14 written in full, three figures drawn.
  - 2.7a, card 34 (`law-of-cosines-special-triangles`, 2 problems): **finished**; 2013 AIME II #5 now cites the $60^\circ$ form and Area Ratios from a Cevian.
  - 2.7a, card 35 (`angle-bisector-theorem`, 20 problems): **finished**; 2010 AIME II #15 rewritten (spiral similarity and the ratio lemma replace a radical-axis sketch that did not work), eleven strategies completed, eight figures drawn.
  - 2.7a, card 36 (`angle-bisector-length`, 1 problem, already done under the Law of Cosines): **finished**.
  - 2.7a, cards 37 to 39 (`stewarts-theorem`, `cevas-theorem`, `menelaus-theorem`): **finished**. 1989 AIME #15 is now mass points and a doubled median (no Stewart, no Ceva); 1988 AIME #12 cites the area method (no Ceva), so Ceva's Theorem now cites no problem; 2023 AIME II #12 finds $Q$ as the reflection of $P$ in $M$ (no Stewart). Missing card P7 (Cevian Ratio Sum) proposed in QUESTIONS.md.
  - 2.7a, cards 40 to 45 (`apollonius-theorem`, `vivianis-theorem`, `ratio-lemma`, `cotangent-rule`, `projection-formula`, `incenter-excenter-lemma`): **finished**. Apollonius's seven problems were all already right; 2007 AMC 10B #17 (twin of 12B #14) tagged; 2005 AIME II #14 adds Steiner's Ratio Theorem; 2016 AIME I #6 written in full.
  - 2.7a, cards 46 to 57 (`steiner-ratio-theorem` through `triangle-center-angles`: Carnot's perpendicularity, anticomplementary, orthic and medial triangles, Euler's distance, nine-point circle, Brocard angle, orthocenter properties, Fermat point, Leibniz): **finished**. 2024 AIME II #10, 2020 AIME I #15 and 2025 AIME I #14 written in full with figures; 2025 I #14 is Ptolemy's inequality, not the Fermat point, so `fermat-point` now cites no problem. 2019 HMMT Feb Geometry #7 has no statement text, so it gets no figure.
  - 2.7a, card `circle-basics` (20 problems): **finished**. Full routes for 1983 AIME #15 (coordinates, $\sin=\tfrac7{25}$), 2000 AIME I #13 (the envelope line of slope $-\tfrac7{24}$, $\tfrac{700}{31}$) and 2014 AIME I #10 ($B=(2,3\sqrt3)$); 2022 AMC 10A #15 shows the cosine step; 2025 AMC 10A #25 uses a sector instead of integrals. Figures for 2022 AMC 10A #15, 2014 AIME I #10 and 2008 AIME I #5.
  - 2.7a, card `circular-segment` (7 problems): **finished**; 2015 AIME I #15 now reaches its answer ($\tfrac53(12\pi+18\sqrt3)$, $53$) and has a cylinder figure.
  - 2.7a, card `power-of-a-point` (17 problems): **finished**. Five vague strategies written in full: 2001 AIME II #6 ($s(1+s)=\tfrac{(1-s)(1+s)}4$), 2016 AIME I #15 ($YC\cdot YD=AB^2$ by two similarities, then the bisector length, $270$), 2022 AIME I #11 ($x=\tfrac92$, $147\sqrt3$), 2023 AIME II #9 ($MP=4$, $18\sqrt{15}$), 2024 AIME I #5 ($e(e+184)=561$). Figures for 2001 II #6, 2016 I #15 and 2023 II #9.
  - 2.7a, card `chord-length` (18 problems): **finished**. 2023 AIME I #5 rewritten without Ptolemy (distances $\tfrac{56}d$, $\tfrac{90}d$ to the diagonals, area $106$); 1985 AIME #9 states $k^2=\tfrac{256}{15}$; 2023 AMC 12B #20 explains the arc of $2\theta$. Figures for 1985 AIME #9 and 2023 AIME I #5.
  - 2.7a, cards `equal-chords-arcs` and `inscribed-angle-theorem`: **finished**. Four vague strategies written in full: 2011 AIME I #10 ($n=127$ and $376$), 2015 AIME I #6 ($a=20^\circ$, $m=28^\circ$), 2017 AIME I #6 ($x=84^\circ$ or $36^\circ$), 2021 AIME II #14 ($\angle XOY=A+2C$, checked numerically). Figures for 1991 AIME #14 and 2021 AIME II #14.
  - 2.7a, cards `thales-theorem`, `angle-chord-secant`, `tangent-facts`: **finished**. Seven strategies written in full (2017 AIME I #8, 2000 AIME II #10, 2002 AIME II #15, 2007 AIME I #9, 2007 AIME II #9, 2023 AIME I #8; 2025 AMC 10A #20 retagged); six figures.
  - 2.7a, cards `tangent-chord-angle`, `radical-axis`, `apollonius-circle`, `descartes-circle-theorem`, `tangent-circles`, `common-tangent-lengths`: **finished**. Five strategies written in full (2023 AMC 12B #10, 2005 AIME II #15, 2019 AIME I #15, 2015 AIME II #15, 2021 AIME I #13); figures for 2019 AIME I #15 and 2021 AIME I #13. 1992 AIME #13 gets no figure (at true scale $A$ and $B$ sit on top of each other).
  - 2.7a, cards `cyclic-opposite-angles` through `distance-midpoint` (cyclic angles, Ptolemy, Pitot, Ptolemy's inequality, distance and midpoint): **finished**. Four strategies written in full (2001 AIME I #13, 2020 AIME II #4, 2021 AIME I #6, 2022 AIME I #1, which now cites Forms of a Line); figure for 2001 AIME I #13.
- **Progress in `js/data/geometry.js` (245 cards):** the first 156 or so cards are done, through `distance-midpoint`; 81 of them cite problems and every one of those is checked. About 42 geometry cards that cite problems remain (the coordinate-geometry and solid-geometry cards).
- **In progress:** 2.7a, `line-forms`, then `angle-between-lines`, `shoelace-formula`, `picks-theorem`, ... **Last problem done: 2022 AIME I #1.** A problem whose strategy says "Carried through", "The requested value is" or only names relations is still unchecked.
- **Overnight runs (2026-10-18):** a scheduled task starts a fresh session at 12:35, 2:35 and 4:35 AM Central. Each one reads this block, works on from "Next", and pushes to `claude/zen-wozniak-agipdc` after every batch. A run stops if the newest commit is under 25 minutes old. It proposes missing cards in QUESTIONS.md but does not write them.
- **Missing cards found while tagging** go to `QUESTIONS.md`, "Candidate new cards from the practice pass" (P1 to P6 all written; P7 open; a new one goes at the top of the table as P8; the file is newest first), for approval before they are written.
- **Priority (Stanley, 2026-10-17):** within a card, do the AMC 10 and AMC 12 problems first, then AMC 8, then HMMT, with AIME alongside the AMC 10/12 as before.
- **Next action (hand-off for the next chat):**
  1. Read CLAUDE.md, this block, and CONVENTIONS §11 ("Tagging a problem": the trick is the "Alternatively, ..." paragraph, tag the specific card, figures for problems).
  2. `node tools/practice-card.js pythagorean-theorem` prints every problem citing the card, with statement, tags, strategy and trick. Find the "Next is" problem above and go on in that order.
  3. For each problem: re-solve it; keep or drop each tag (drop Pythagoras where the step is really a named card: chord length, 3D distance, a special triangle, a triple); write the strategy, plus `trick`/`trickFormulas` ("Alternatively, ...") when a second good route exists; check every number, intermediate ones too, with a Python/sympy script (a fresh cloud container needs `pip install sympy scipy` first); draw a figure in `js/data/diagrams/problem-diagrams.js` if the statement has none (setup only, `ok` self-check, `MM(ok)` in the caption; 3D solids with `projector` and `solidEdges`).
  4. Write entries with `node tools/practice-set.js edits.json`, building the JSON from Python raw strings. No raw `<` (use `\lt`).
  5. Every 8 to 10 problems: gates (CLAUDE.md list), a browser check of the touched pages (`#/problem/<slug>`), bump `?v=` for `problem-db.js` and `problem-diagrams.js` in `index.html` and run `tools/sync-lab-versions.py`, update this block and the README changelog, commit and push.
  6. When Pythagorean Theorem is finished, move to the next card in `js/data/geometry.js` order (`special-right-triangles`, then `altitude-hypotenuse`, ...). A problem already done under an earlier card needs only a check that the new card's citation is right.
- **Decisions made in this pass (keep applying them):**
  - commit only after every gate passes: chain the commit after the gates with `&&`, never `;` (a figure file that failed to load was committed once that way and fixed at once);
  - a statement that is only about a triangle's angles or a trigonometric identity, with no construction, gets no figure (2013 AIME II #15, 2014 AIME II #12);
  - a chord at a distance from the center cites `chord-length`, not `pythagorean-theorem`;
  - AA similarity cites `triangle-similarity`; `similar-figures-ratios` is for scaling lengths, areas and volumes;
  - a distance between points in space cites `distance-3d`; a 13-14-15 triangle cites `triangle-13-14-15`; a hexagonal row offset cites `equilateral-triangle-facts`;
  - a problem given only in coordinates (2002 AIME II #2) or with nothing to picture beyond its answer gets no figure; 3D figures use `solidEdges` in `problem-diagrams.js`, which dashes hidden edges by ray casting;
  - a fold cites the `folded-paper` pattern; a 45-45-90 diagonal cites `special-right-triangles`; grid distances cite `distance-midpoint`;
  - lattice points on a circle cite `lattice-points-circle`; a product of chord pieces cites `power-of-a-point` (2010 AIME II #14 needs no Pythagoras);
  - a strategy never holds a raw `<`: write `\lt`;
  - verify every intermediate value written in a strategy, not just the answer (a wrong quadratic in 2004 AIME II #12 was caught this way);
  - a dihedral angle cites the `dihedral-angle` method; an isosceles trapezoid cut by its altitudes cites the `isosceles-trapezoid` pattern; corner triangles similar by angles cite `triangle-similarity`, with `similar-figures-ratios` only for the area scaling;
  - spheres in space that touch cite `triangle-of-centers` too (join the centers); `cross-section-method` only where one plane through an axis or the centers holds the whole picture; a sphere's outline in a 3D figure is drawn with `sphereOutline`, not a circle;
  - lattice points on a circle cite `lattice-points-circle` (2000 AIME II #11 too);
  - before drawing a figure, check `PROB["<slug>"]` does not exist already (`check-statements.py` fails on a duplicate);
  - a cone's volume cites `prism-pyramid-volumes`. (`cone-formulas` also states $V = \tfrac13\pi r^2h$, a fact whose home is the volume card: one to fix in the card-file re-check.)
- **Blockers and caveats:**
  - LIVE (`live.poshenloh.com`) returns 403 from the cloud container. Fetching works on the Mac with `tools/fetch-live-statements.py`, which caches pages in `~/aops-cache/live/`. Stanley will upload that cache to `tools/live-cache/` for concept hints.
  - The semantic search index must be rebuilt on the Mac (`tools/build-search-index.py`; model2vec 0.9.0 distilling `BAAI/bge-base-en-v1.5`, 256 dimensions). The newest ~150 cards are found by lexical search only until then.

## Where things are

- Project: the clone `/home/user/CompMath2.0` in the cloud session, on the branch the session names (this chat: `claude/zealous-keller-4gb8cj`; before it `claude/zen-wozniak-agipdc`, earlier: `claude/epic-curie-8tpif0`, `claude/inspiring-curie-svp5pr`); on the Mac, `~/Downloads/competition-math-reference`.
- Code and data: a static JS site with `js/app.js`, `css/styles.css`, data in `js/data/`, write-ups in `js/data/details/`, and gates in `tools/`.
- Published: https://almond200.github.io/CompMath2.0/ (repo `Almond200/CompMath2.0`). Served locally with `python3 -m http.server 8642`.
- Upload: GitHub Desktop on the Mac, or `git add -A && git commit && git push` here.
- Most steps are plain writing and go ahead without asking. Stanley is asked only for new-card approval, judgment calls listed in `QUESTIONS.md`, and real choices.

---

## 0. The philosophy (keep this at the top)

> **Formulas tell you what is true. Methods tell you what you can do. Patterns tell you what you are looking at. Problems teach you to connect the three.**
> Recognize → Choose → Use → Solve, that is, **Pattern → Method → Formula → Problem**.

| Kind | Question it answers | One card is | Test |
|---|---|---|---|
| **Formula** | What is true? | one fact (theorem, identity, definition, standard result) | something you **remember**; reads as reference with every example removed |
| **Method** | What can I do? | one reusable move | something you **do**; still makes sense with every equation removed |
| **Pattern** | What am I looking at? | one recurring problem archetype | you can say "this is a ___ problem" **before** solving it |
| **Problem** | Can I use it? | one contest problem | it is a real problem; its page shows Pattern → Method → Formulas |

How they connect: a pattern **suggests** methods, a method **uses** formulas, and problems are the evidence for all three (derived from problem tags). Every link is shown from both ends.

**What does not belong where:**
- A formula page never says "when you see X, do Y" (that is method content). Applications is one descriptive line.
- A method is never several unrelated techniques, and never a formula with a process attached.
- A pattern never contains the solution and never re-explains a method. It names clues and points to methods.
- A problem page shows the three connecting; it never teaches a theorem.

**The app's purpose:** it must be **explanatory, useful, and helpful**.
- Each card explains why the fact or move works, in teaching prose.
- It has a figure wherever a picture helps.
- It covers the idea with the depth and breadth it really has.
- Nothing redundant appears anywhere in the app (Stanley: "I don't want redundant things in this app").

### Standing rules for every card and every change
1. **Paragraphs begin with explanation, never with an example.** An example may be woven into the explanation after it has started.
2. **Explanatory first:** say what the thing is, why it holds, and when it matters. One idea per card; no card tries to be several things at once.
3. **Depth and breadth review:** while converting a card, check it for missing cases, variants, converses, and the places where it fails. Add them (Key forms, Useful observations, Full proof).
4. **Several forms per thumbnail when the card has several case forms.** Forms are separated by `\qquad` and stack in one `gathered` block.
5. **Diagrams where they help, and no diagram that shows less than the fact** (no bare triangle). Every geometry figure is rendered to a contact sheet and redrawn if weak. Figures carry `ok` self-checks.
6. **One tag, no redundancy:** a card shows its kind and one split-oval tag (tier left, importance right). Level text is never repeated beside it.
7. **Every number is verified by computation** before it is written. **Examples are never copied between cards.**
   - Two examples may use the same lengths (the 13-14-15 triangle, 3-4-5), as long as they ask a different question and show a different nuance.
   - A copied question with the same numbers is what is banned. *Amended 2026-10-12.*
   - The gate in `scan-conventions.py` fails only on shared numbers plus a near-copy question.
8. **Math typesets everywhere a card name appears.** Calculus uses an upright, thin-spaced differential, `\int A(h)\,\mathrm{d}h`.
9. **Mark every change in the markdown files:** a dated README changelog entry, CONVENTIONS updated wherever a rule changes, and memory (and this plan) updated.
10. A general method is never written as if it belonged to one pattern. A hyper-specific pattern may have a matching hyper-specific method.
11. **Nothing already established breaks:** every step ends with all gates at 0, a browser check, and a backup. Here the backup is a commit and push to the branch; on Stanley's Mac it is the rsync copy.
12. **Every new card gets an importance (and tier) judged on evidence:** problem tags and how often the idea is used. It is proposed to Stanley in a short table before the card is written, never assigned by feel. (N1 to N7 were approved and are written.)
13. **The Contest profile is a role, not an example.**
    - It says in words how the card shows up in contests and what it pairs with.
    - It never holds a worked example, a quoted sample problem, or a computed value (gate in `scan-conventions.py`).
    - Inline links follow the words: named results capitalized, one link per card at its first mention.
14. **Every claim a card makes is proved, or points to the card that proves it.** A Key form or a named corollary with no proof in Why it works is a gap; fill it with a complete argument (lemma, steps, conclusion). (The P29 to P31 cards are format only; their proofs wait for step R.)
15. **Break up big paragraphs of explanation** with centered display equations (own paragraph) and figures where they help. Use plain lead-ins ("Step 1, ..."), no markdown bold or italics.
16. **Importance has five values:** high, medium, low, lower (marginal use, once in ten years), lowest (confidently never used; completeness or beauty only).
17. **A card's thumbnail and description stand on their own** (from Stanley's reviews of 2026-10-11):
    - Every symbol in the thumbnail is defined there or in the description, not only in the write-up.
    - A formula that needs a hypothesis states it beside the formula (replacement or not, $ab > -1$, $N$ independent, $n \ge 2$, absolute value for an area).
    - Units are named when two counts could be confused.
    - No `\gg` or `\ll` for "at least 2 apart".
    - No keyword is repeated inside one card. No fact is stated in both the thumbnail and the description of the same card, or on two cards. (The keyword-repeat and tab gates are in `scan-conventions.py`; the rule is in CONVENTIONS.)
18. **Lines in figures run to where they meet, and extensions are dashed** *(new, 2026-10-12)*.
    - A line that passes through a point of the figure is drawn all the way to that point, never cut short and never far past it.
    - The part inside the triangle (or the main shape) is solid; the part extended outside is dashed, ending at the point it reaches.
    - A midline or a midpoint carries equal-segment tick marks so the reader can see what it is.
19. **Every batch of new cards is registered for `Special:NewCards`** *(new, 2026-10-12)*. Add it to `js/data/new-cards.js`, so the latest additions can be reviewed in the app.

---

## 1. Finished; details are in the README changelog

**Earlier (2026-10-11)**
- [x] Formula conversion: 480 of 486 formula cards. Three keep the old template on purpose (Stanley: fine as they are): Golden Ratio & the Regular Pentagon, Isosceles Tetrahedron, Tetrahedron Centroid & Medians.
- [x] Brocard's Theorem; the five-level importance scale (Lowest: Cardano, Morley, Ramsey $R(3,3)$); landing-page settings and command suggestions.
- [x] Problem text for every AMC 8, AMC 10, AMC 12, and AIME problem from LIVE, with:
  - every display fix;
  - the Contests box (planned contests hidden behind Show unwritten contests);
  - GitHub upload instructions.
- [x] Study lists: 8 new lists, additive AIME and Olympiad routes, MATHCOUNTS routes removed, the Functions & Symmetry list.
- [x] New cards N1 to N7:
  - Vector Bashing;
  - Distance Between Parallel Lines (its form moved off Point-to-Line Distance);
  - Writing a Function's Symmetry as an Equation;
  - Odd and Even Functions;
  - Properties of Inverse Functions;
  - Tangent Lines from a Point;
  - Minimizing a Slope.

  Each has a verified example, a figure, a route placement, aliases, and connected-formula rows where natural.
- [x] Pick's Theorem on a Triangular Grid merged into Pick's Theorem on Any Lattice, as a worked example in its explanation (the old id redirects).
- [x] The 2021 Spring/Fall AMC split. Spring is renamed; Fall A and B are added as sittings with all 25 numbers. Fall 2021 AMC 10A and 10B text and figures were imported from Stanley's PDFs (`tools/manual_statements.py`; credit to the MAA, source a PDF copy).
- [x] **Figure audit (2.3):** all 853 problem figures checked.
  - That is 710 statement figures and 144 choice pictures, checked on contact sheets and by a load test.
  - None was wrong, cropped, or blank.
  - One fix: thin strips may run up to 600 px wide.
  - The old LIVE PNGs are soft because the sources are low resolution.
- [x] **Methods and patterns rewrite (2.2):**
  - The anatomy is written into CONVENTIONS, with 3 pilots.
  - All 30 patterns and 135 methods were audited, with no splits.
  - Both of Stanley's approvals are given (the Same Remainder merge, the six LIVE-concept cards). They are scheduled in 2.4b.
  - The practice-problem scan found no other recurring missing idea.
- [x] Dark mode softening (Stanley's list of 9 items, plus item 10). Dark-only tokens `--text-head` and `--text-table`; light mode is unchanged. Stanley: dark mode is done (`css/styles.css` v248).
- [x] **UI scan, first pass:**
  - All 656 card pages at 1280 light and at 375; 201 other routes at 375; popups at 375.
  - Four phone overflows fixed (the Descartes sphere key form, the arctan example, the mass-points hint, the table wrapper).
  - `tools/ui-scan.js` is kept as the reusable scanner.
- [x] The 13-14-15 card fixed (four literal tabs became `\tfrac`), with a scanner gate so a tab in any `js/data` file fails.
- [x] Problem search deleted and the in-app Ctrl/Cmd+F find removed (Stanley: never add either back).
- [x] Figure reference cards (2A): shapes filed as reference formula cards (table below). The Formula lines setting was added (Settings: 1, 2, 3, All; default 1).
- [x] Inradius Formula: a new figure showing the idea for polygons (a pentagon around a circle, cut into five triangles of height $r$).
- [x] Loose ends:
  - Brocard's Theorem and the Lowest and Lower moves are in `tools/importance-proposal.md`.
  - The new cards have connected-formula rows.
  - The Cavalieri bullet is fine (Stanley).
  - The figures cheat-sheet list is **dropped** (not wanted).

**2.4d content-error fixes (Stanley's review lists, 26 items)**
- [x] Rows 1 to 26: every claim was checked against the card text and, where it is arithmetic, by computation. Fixes include:
  - the British Flag 3D form;
  - the Ptolemy mnemonic, with **Cyclic Quadrilateral Diagonals merged into Ptolemy's Second Theorem**;
  - Cayley-Menger;
  - the Isosceles Tetrahedron keyword;
  - the hexagonal Pick unit;
  - undefined $P$ and $E$, and Reim's collinearity;
  - the Brahmagupta / circumradius split;
  - regular-polygon-area pointers;
  - keyword dedupes on 8 cards, with a new scanner gate;
  - order statistics with and without replacement;
  - the squared binomial sum wording;
  - the twelvefold way's third column;
  - $n \ge 2$ for the max product;
  - the Zsigmondy spelling;
  - Wald's hypothesis;
  - arctangent's $ab > -1$;
  - the absolute value for the determinant area;
  - Bertrand's one form;
  - the Eisenstein norm;
  - Zeckendorf without `\gg`;
  - $a^n + b^n$ for odd $n$;
  - the triangle-angle-identities companions;
  - one home for the sine product.
- [x] `tools/find-duplicate-forms.py` written. Its two plain duplicates are fixed:
  - the cotangent identity now lives on `triangle-angle-identities`, with a pointer from `cotangent-rule`;
  - Brahmagupta-Fibonacci is gone from the `lagranges-identity` thumbnail, `latexPlain`, and Key forms.
- [x] CONVENTIONS section "A card's thumbnail and description stand on their own" (rule 17).

**2.4b new cards, batch 1**
- [x] Perpendicularity Lemma, Carnot's Perpendicularity Theorem, Iran Lemma. The old Carnot card is renamed "Carnot's Theorem (Distances to the Sides)", with its id and links unchanged and the old name kept as an alias.

**2026-10-12 (this session; details in the README changelog)**
- [x] **2.0** Gates run on Linux (`tools/jsc-node`, `JSC`/`CHROME` variables); `PLAN.md` in the repo; Iran Lemma figure redrawn (rule 18); the exterior-angle zigzag lead-in; `Special:NewCards` (rule 19); rule 7 amended (same lengths allowed when the nuance differs).
- [x] **2.4d** All 26 review rows fixed; plain duplicates at 0; the twins stay (Stanley: LTE is both a formula and a method).
- [x] **2.4b** All approved new cards (Perpendicularity Lemma through the six LIVE-concept cards), the Same Remainder merge.
- [x] **2.4g** The Olympiad Triangle Lemmas subsection, placed after Advanced Triangle Theorems.
- [x] **2.4c** Scan of the five card files: findings fixed, 47 descriptions rewritten to define symbols without restating the box, and all 12 approved candidate cards written (Shooting Lemma, Dumpty Point, √bc Inversion, Van Aubel for Cevians, Broken Chord, Nesbitt, Injectivity/Surjectivity, Cyclotomic Polynomials, Gambler's Ruin, Strategy Stealing, Erdős–Ko–Rado, Tiling a Board).
- [x] **2.4f** Figure line audit: two new gates (line gaps, raw TeX in figure text), all 584 panels reviewed, wrong figures fixed (Poncelet, domino board, Desargues, Miquel).
- [x] **2.4e** Formula-box audit on the detail page, approved by Stanley: nine crowded boxes trimmed into Key forms, 22 wide boxes broken at natural points, four dangling colons fixed.
- [x] **2.5a** Subject chip on problem pages and contest lists, derived from the tagged cards (1,365 problems). The LIVE-concept source waits for LIVE access.
- [x] **2.4** Whole-app UI scan finished: the three statement KaTeX errors fixed at the importer and gated; inline maths that overflowed on a phone fitted after rendering; every sweep at 375, 768, 1280, and 1920, light, dark, and Larger, in both layouts, and over all 4,616 statements, now reports nothing.
- [x] **2.1** Content and consistency scan: stale README, CONVENTIONS, and app wording fixed; three old-layout write-ups converted; 19 of the 20 candidate cards approved (not Perfect Numbers), written in four batches.

**2026-10-12 to 2026-10-16**
- [x] **2.1** Content and consistency scan, the 20 gap-scan cards in four batches, and Cutting a Solid with a Plane (700 cards).
- [x] **2.4** UI scan finished, the "/" fix, and the empty Practice Problems section on patterns.

### How the figure reference cards were sorted out (2026-10-11)
| Where | Cards |
|---|---|
| Polygons & Quadrilaterals (formulas) | Regular Hexagon of Side $s$ (absorbed Diagonals of a Regular Hexagon), Regular Octagon of Side $s$ (new), Regular Dodecagon of Side $s$ (chord table added), Equilateral Triangle of Side $s$ (moved from Ratios & Constants), Parallelogram Area (new: height form and sine form), Parallelogram Vertices Using Vectors (new: $A + C = B + D$), Quadrilateral Areas (parallelogram form removed, rhombus inradius added), Euler's Quadrilateral Theorem (second line and an explanation for the parallelogram law) |
| Solid Geometry (3D) | Cube of Side $s$ (new), Regular Tetrahedron of Side $s$ and Regular Octahedron of Side $s$ (rewritten as references, no overlap) |
| Triangle Areas & Radii | Right Triangle Inradius and Circumradius (renamed; $R = \frac c2$ lives here and Median to the Hypotenuse links to it) |
| Ratios & Constants to Memorize | Golden Ratio & the Regular Pentagon, Isosceles Tetrahedron, Tetrahedron Centroid & Medians stay as they are |
| Patterns | An Isosceles Trapezoid (Polygon Configurations); the Right Triangle with the Altitude to the Hypotenuse thumbnail shows $h^2 = pq$, $a^2 = pc$, $b^2 = qc$, $h = \frac{ab}{c}$ |
| Deleted | An Isosceles Triangle, A Right Triangle, A Parallelogram, A Rhombus or Kite, A Rectangle or Square (their facts were restored onto the cards above); no "Common Figures" group; no pentagon, icosahedron, or dodecahedron pattern |

**Known gaps (listed in `tools/live-missing.md`):**
- AMC 8 2021 is not on LIVE.
- LIVE has no Fall 2021 AMC. Fall 10A and 10B were imported from Stanley's PDFs; Fall 12A and 12B have no text except 12B #23.
- HMMT February Geometry shows 10 linked problems with no text.

---

## 2. What is left, in order (the 2026-10-16 plan)

### 2.1 Handoff system
- [x] This file restructured with "Current state" at the top; `CLAUDE.md`; the handoff rule in CONVENTIONS §7 and the README.
- [x] The old chat's answers recorded in `MIGRATION-NOTES.md` and folded in here and in CONVENTIONS.

### 2.2 Small fixes and one new card
- [x] Vieta Jumping moves from Number Theory methods to Proof Methods (it is fundamentally a proof method).
- [x] New card: Angle Bisectors of Two Lines. It gives the bisector equation and the slope rules: the x-axis and slope $\frac34$ give $\frac13$, and the other Pythagorean-triple pairs.
- [x] Hover previews:
  - find why the preview figure sometimes differs from the card's figure;
  - make the figure fill about three quarters of the box height.
- [x] Pythagoras widget: the vertices drag freely, with the squares allowed to leave the frame; the widget gets smaller.
- [x] Lab pages (quiz, flashcards, formula web) load the data files with the same `?v=` as `index.html`, so new cards appear; a gate checks it.

### 2.3 Home page (done 2026-10-16)
Remove the third repetition of the four spaces ("How the four fit together" and "Jump to"). Give each of the four tiles a line more of explanation. Use the space for things that are not repeated elsewhere: Problem of the day, Continue where you left off, Did you know, Newest cards, and a small practice summary.

### 2.4 Page tools panel (a setting) (done 2026-10-16)
A Wikipedia-style right-hand column on card pages:
- **Tools:** What links here, Problems using this card, Related cards, Permanent link, Print, Random card.
- **Page information:** id, kind, tier, importance, size of the write-up, counts of figures, examples, and links in and out, and the NewCards batch.
- **Appearance:** text size, page width, and theme.

It is off by default and turned on in Settings.

### 2.5 Angle-chasing game (done 2026-10-16)
On the Angle Chasing card: a random cyclic quadrilateral configuration with equal chords and one given angle. The reader marks every angle equal to it, presses Check, and sees the reason for each.

### 2.6 Interactives audit, then drag-the-triangle widgets (done 2026-10-16)
- **The audit:** every widget in `js/geo-interactive.js` and `js/math-tools.js` has a title naming the fact, a line saying what to drag and what stays true, labels on every point and quantity, live values, sensible limits, and no errors.
- **The new widgets:** olympiad lemmas with a draggable triangle, such as Incenter–Excenter, Iran, Humpty, Dumpty, Shooting, Broken Chord, Perpendicularity, Isogonal Conjugate, and Miquel.

### 2.7 Practice pass (long; slow and careful; cards first, then papers)
- **2.7a, card by card:** check every problem a card cites. Remove citations whose best solution does not use the card; Stanley has found many false examples. Fix the problem's whole entry at the same time.
- **2.7b, paper by paper,** newest first, over the untagged problems and then the rest.
- **Per problem, everything in one edit:**
  1. check the statement and its figures;
  2. tag the pattern, method, and formulas of the best route;
  3. if a second good route exists (an intended and a faster one), tag its cards too;
  4. write a strategy paragraph explaining how the listed cards apply, and an "Alternatively, ..." paragraph for the second route;
  5. draw a geometry diagram where the problem has none;
  6. verify every number by script.
- **No written solutions for now** (Stanley, 2026-10-16: too costly in tokens). The Solution section code stays unused.
- **LIVE concepts** from `tools/live-cache/`, once uploaded, are hints only and never copied.
- Commit per card group or per paper, and update "Current state" each time.

### Later
- 2.4e-ii: prose formula boxes on card faces. Measure, propose rewrites in `QUESTIONS.md`, and apply after approval.
- The card-file re-check after tagging.
- Stage R: proof depth.
- Stage 5: flashcards and the experimental features moved into Practice.
- Per-contest lists, once enough problems are tagged.
- Card topic lists that over-reach: Rationalizing carries complex numbers and sequences, so 2002 AIME I #2 shows those chips. Check every card's `topics` in the card-file re-check.
- The twin cards the duplicate finder flagged (lte and lte-lemma, and three others) are undecided.

## 3. Housekeeping after every step
- **Gates:**
  - `scan-conventions.py`, `check-topics.py`, `check-lists.py`, `check-labels.py`, `check-diagrams.py`, `check-statements.py`;
  - `sh tools/check-lab.sh`;
  - `tools/validate-problem-db.js` (jsc, or here the Node shim);
  - the card-search eval after content or tag changes.
- **Search index:** rebuild it with `tools/build-search-index.py` (on the Mac, the `~/Downloads/competition-math-buildenv` python).
- **Versions:** bump `?v=` on every touched asset (`conv/bump.py` on the Mac; by hand in `index.html` here), and bump `STATEMENTS_V` when statement files change.
- **Browser check** of every touched page: 0 KaTeX errors, no overflow, light and dark.
- **Markdown:** README changelog entry, CONVENTIONS where a rule changes, CONTRIBUTING where the workflow changes, the memory files, and this plan (`PLAN.md`).
- **Backup:** commit and `git push -u origin <the session's branch>` here. On the Mac, `rsync` to `~/Documents/CompMath-backup/` (done by `conv/gates.sh`).
- **Never** edit a source file with a slice-and-replace that was not checked afterwards. On 2026-10-11 a mis-sliced edit to `js/app.js` deleted a block. Check syntax (`node --check`, `new Function(text)`, or `jsc`) after any large edit.

## 4. Decisions already made (do not reopen)
- Problem pages get a strategy paragraph, plus an "Alternatively, ..." paragraph when a second good route exists, with both routes' cards tagged. Full written solutions are deferred (2026-10-16). Geometry problems without a statement figure get a diagram.
- Tags come from solving each problem. LIVE's concepts are hints only, never a source of tags or text.
- Prose formula boxes are rewritten only after Stanley approves the list; a box that cannot be shortened stays as it is.
- Four kinds, four spaces (Formulas, Methods, Patterns, Practice). No hints in the UI. The problem box shows Pattern, Method, Formulas side by side.
- Contest tiers (AMC / AIME Early / AIME Late / Olympiad) go together with importance (High / Medium / Low / Lower / Lowest). Importance is judged inside the card's own subsection and shown with the tier as one split oval. No label setting; no level filter.
- One global filter; the sidebar counts follow it.
- **Problem statements and credits:**
  - Statements come from LIVE by Po-Shen Loh, credited to the MAA under CC BY-NC-SA, statements and figures only.
  - The two 2021 Fall AMC problems already in the app (10B #11, 12B #23) are credited to the AoPS Wiki.
  - The Fall 2021 AMC 10A and 10B problems imported from Stanley's PDFs are credited to the MAA AMC.
  - The AoPS Wiki cannot be fetched (Cloudflare).
  - Problem figures fit one 420 by 280 box.
- The number beside a contest counts only problems with text. Contests still to come are hidden until Show unwritten contests is pressed. No proof-based competitions for now.
- Examples are never copied between cards (same lengths allowed when the nuance differs). Paragraphs begin with explanation.
- Shapes are filed as **reference formula cards** (Polygons & Quadrilaterals, Solid Geometry (3D), Ratios & Constants to Memorize), not as pattern cards. There is no "Common Figures" pattern group. One fact, one home.
- Things in LIVE that the app lacks are listed in `tools/live-missing.md` and **wait for Stanley's approval**.
- Problem search and the in-app find are deleted for good; never add either back.
- The new-cards command is `Special:NewCards` (`Special:Recent` keeps meaning "recently opened").

## 5. Verification when executed
- Every change passes the gates in section 3. It is checked in the browser at 375, 768, 1280, and 1920 px, in light and dark, and in all three densities. Here that is headless Chromium on a `python3 -m http.server`, with screenshots viewed.
- **2.0:**
  - `#/f/iran-lemma` shows the ticks and the solid-to-dashed switch at side CA, with all three lines ending at K and no MISMATCH.
  - `#/f/parallel-exterior-angles` reads with its new lead-in.
  - `#/special/newcards` and `#/special/newcards/All` list batch 1, and typing `Special:New` suggests the command.
  - The relaxed example gate still fails on a planted copied question.
- **Figure reference cards (2A):**
  - every deleted or merged id still opens (redirect) or is gone from every list, link, tag, alias, and register entry;
  - no fact appears on two cards (spot-check by searching each key formula);
  - every touched card renders with 0 KaTeX errors;
  - the Formula lines setting changes the card thumbnails live and survives a reload in 1, 2, 3, and All.
- **2.4b:** each new card renders (0 KaTeX errors, no overflow), its example is numerically verified, its figure's `ok` holds, the search eval is at least 160/187, and it is listed in `Special:NewCards`.
- **2.4g:** the new subsection appears in the sidebar and on the Geometry page with its blurb, and every moved card opens by its old id. `check-topics.py` and `check-lists.py` are at 0, and the routes still hold every card.
- **2.4c:** the findings list and the candidate-card table go to Stanley before any fix. Every fixed formula is re-verified by computation.
- **2.4f:** the new line gate is at 0 (allowlist reviewed), and the contact sheets are re-rendered after the fixes.
- **C:** Stanley approves the concept mapping and the `live-missing.md` table first; validators at 0; existing tags unchanged.

---

## Appendix A. What has been done since the redesign (the four spaces and the new front page)
- **The redesign itself:**
  - every card is one of four kinds, in four spaces switched from the top bar (Formulas blue, Methods teal, Patterns amber, Practice purple);
  - a front page with search, the four spaces, the Pattern → Method → Formula → Problem chain, jump links, and the card and problem of the day;
  - subject pages as one scrolling page with group headings;
  - the sidebar as three books;
  - Wikipedia-style `Special:` pages and commands;
  - connected-formula rows.
- **Formula cards:**
  - about 480 of 486 converted to the new template in batches P5 to P31 and G1 to G8, each with Key forms, Conditions, Why it works, a fresh verified example, and figures where they help;
  - Lucas and Odd Entries in Pascal's Triangle proved in full steps;
  - 62 contest profiles rewritten as roles.
- **Patterns and methods:** a fixed anatomy written into CONVENTIONS, three pilots, and all 30 patterns and 135 methods audited.
- **New cards:**
  - Brocard's Theorem;
  - the Functions cluster (Odd and Even Functions, Inverse Functions, Symmetry as an Equation);
  - N1 to N7;
  - the shape reference cards (octagon, cube, parallelogram area and vertices, and others);
  - the first Olympiad batch (Perpendicularity Lemma, Carnot's Perpendicularity Theorem, Iran Lemma).
- **Merges:** Pick on a Triangular Grid, Diagonals of a Regular Hexagon, Cyclic Quadrilateral Diagonals into Ptolemy's Second Theorem.
- **Content review:** Stanley's 26-item review fixed after computing each claim, with new gates for repeated keywords and tab characters, and a duplicate-formula finder.
- **Tags and lists:**
  - one split-oval tag (tier plus a five-level importance, with Lowest added);
  - every card's importance reassigned on evidence;
  - one global filter;
  - additive AMC, AIME, and Olympiad routes (MATHCOUNTS removed);
  - 39 study lists, including Starting Points, the Trigonometry Sheet, the Modular Toolkit, the Inequalities Ladder, Proof Methods, and Functions & Symmetry.
- **Practice:**
  - statements and figures for every AMC 8/10/12 and AIME problem LIVE publishes (about 4,600), with the MAA credit, display fixes, and versioned statement files;
  - the 2021 Spring/Fall split, and Fall 10A/10B typed from Stanley's PDFs;
  - the Contests box with unwritten contests hidden;
  - random problems by contest and difficulty;
  - all 853 problem figures audited.
- **App and settings:**
  - density, card size, Formula lines, text size (with Larger), scroll speed, "When the app opens", notation (expanded sums), keyword chips, figures on card faces, and the live preview panel;
  - dark mode softened in several passes;
  - KaTeX vendored for offline use;
  - the sidebar follows scrolling;
  - back links typeset math.
- **Quality tooling:** `ui-scan.js`, `check-labels.py`, `check-diagrams.py`, `check-statements.py`, `find-duplicate-forms.py`, the scanner gates, and the search eval.
- **Removed at Stanley's request:** problem search, in-app find, the MATHCOUNTS routes, the Common Figures pattern group, the computed Related row, and the Card labels setting.
