# Competition Math Reference: philosophy, standing rules, and what is left to do

Project: the clone `/home/user/CompMath2.0` in this cloud session, on branch `claude/inspiring-curie-svp5pr`. It is the same repository as Stanley's local `~/Downloads/competition-math-reference`.
- Code and data: a static JS site with `js/app.js`, `css/styles.css`, data in `js/data/`, write-ups in `js/data/details/`, and gates in `tools/`.
- Published copy: https://almond200.github.io/CompMath2.0/ (repo `Almond200/CompMath2.0`).
- Upload: GitHub Desktop, or `git add -A && git commit && git push`.

This plan will also be saved in the repo as `PLAN.md`, so it lives with the code.

Last updated 2026-10-12.
- Already done: dark mode, the 13-14-15 fix, all 26 rows of the 2.4d content fixes, the two duplicate-form dedupes, and 2.4b batch 1 (Perpendicularity Lemma, Carnot's Perpendicularity Theorem, Iran Lemma).
- Order now:
  1. **2.0** this session's items
  2. **2.4d** finish
  3. **2.4b** the rest of the new cards, with **2.4g** the new Olympiad Triangle Lemmas subsection
  4. **2.4c** scan of the five card files for errors and missing advanced lemmas (new; the old 2.6, moved up)
  5. **2.4f** figure line audit (new)
  6. **2.4e** formula-box length audit
  7. **2.4** finish the UI scan
  8. **2.5** subject tag, then tagging
  9. **2.6** a light re-check of the cards changed during tagging
  10. **Stage 4** practice expansion
  11. **R** proof depth
  12. **Stage 5** flashcards and experimental features into Practice (not a priority)

The detail of finished work lives in `README.md` (changelog), `CONVENTIONS.md`, `CONTRIBUTING.md`, and `tools/live-missing.md`.
- **When anything is unclear, look back at these markdown files first.** They record how things are done: card anatomy, figure rules, merge checklists, gates.
- Most steps are plain writing and go ahead without asking.
- Stanley is asked only where the plan says so (new-card approval, twin list, concept mapping, the subsection's members, the formula-box worst offenders, the Stage 4 pilot), or where a real choice is unclear.

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

## 2. What is left, in order (Stanley's order)

### 2.0 This session's immediate items (Stanley, 2026-10-12), done first
1. **Tool paths for this cloud machine.** The gates hard-code macOS paths (`JSC = /System/.../jsc`, `CHROME = /Applications/...`).
   - Add `tools/jsc-node.js`, a tiny Node shim providing `load()` and `print()`.
   - Make `check-diagrams.py`, `check-labels.py`, `scan-conventions.py`, and the `validate-problem-db.js` runner read the `JSC` and `CHROME` environment variables. On Stanley's Mac they fall back to the current paths.
   - Here: `JSC="node tools/jsc-node.js"`, `CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
2. **Write this plan to `PLAN.md`** in the repo.
3. **Iran Lemma figure** (`js/data/diagrams/geometry-diagrams.js`, `DIAGRAMS["iran-lemma"]`). Rule 18 applies; Stanley chose the same rule for all three lines.
   - BI is drawn from B through I to K, EF from F through E to K, and the midline from $M_a$ through $M_b$ to K.
   - Each line is solid inside the triangle and `"5 4"`-dashed outside, from where it crosses side CA (`lineInt`) to K. None stops short (today BI stops at I + 70 px and EF stops at E).
   - Equal-segment tick marks: one tick on $CM_b = M_bA$, two ticks on $BM_a = M_aC$, so the green line reads as the midline. Add a `ticks(P, Q, n)` helper if none exists.
   - CK stays dashed with its right-angle mark.
   - The `ok` check also tests that K is on all three lines, and the caption mentions the ticks.
4. **Exterior-angle card** (`parallel-exterior-angles`). The zigzag ("crook") figure follows the triangle proof with no lead-in.
   - Add a paragraph before `{{figure:zigzag}}` in Why it works. It explains that the same parallel-line split proves the zigzag rule: at a bend between two parallels, the angle equals the sum of the angles its arms make with them.
   - Show the rule as a centered line, $\angle APB = \angle(\ell, AP) + \angle(m, BP)$.
   - Add one sentence saying the triangle proof is the case where one arm runs along a parallel.
   - Trim the Useful-observations bullet that restates it (rule 17).
5. **`Special:NewCards`.**
   - New file `js/data/new-cards.js` with `window.NEW_CARD_BATCHES = [{ label, date, ids }]`, newest last. Batch 1 = the three cards above.
   - Load it in `index.html` before `app.js`, with a `?v=`.
   - Add a command entry beside `Recent` in the command table of `js/app.js` (~5569). It shows the latest batch (label, date, card links in batch order, with kind and subject). `Special:NewCards/All` lists every batch, newest first.
   - The command shows in the search dropdown and in Settings → Commands.
   - `tools/check-lists.py` fails on an unknown or merged id in a batch.
   - README Special pages list and CONVENTIONS (rule 19).
6. **Rule 7 amended.** Update CONVENTIONS (~line 265) and relax the triangle-numbers gate in `tools/scan-conventions.py` (~872). Shared numbers fail only when the two questions are near-copies: word Jaccard of at least 0.45, the measure in `tools/check-example-repeats.js`. Otherwise the scanner prints an info line.
7. **Summary for Stanley of everything since the redesign** (appendix A).

**Status (2026-10-12):** items 1 to 7 are done. The Iran figure is redrawn, the zigzag is explained, `Special:NewCards` is live, rule 7 is amended in CONVENTIONS and the scanner, and the new CONVENTIONS sections are "Lines in figures run to where they meet" and "New cards are registered". The gates run here with `JSC=tools/jsc-node` and `CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. On Linux, `check-labels.py` keeps a baseline of 5 far-move findings caused by font widths. The search index must be rebuilt on the Mac (HuggingFace is blocked from the cloud).

### 2.4d Content-error fixes: finish
- (a) Re-run `tools/find-duplicate-forms.py`; plain duplicates must be 0.
- (b) The finder's pattern-method and method-formula twins go to Stanley as a list, since they may be deliberate. Nothing changes without his word:
  - `lte` and `lte-lemma`;
  - `poly-divisible-linear` and `reduce-divisibility-constant`;
  - `cycle-hunting` and `periodic-sequences`;
  - `area-method` and `cevian-area-ratio`.
- (c) Also grep the rest of the cards for the same classes of slip: a symbol in a thumbnail that only the write-up defines, and a duplicated fact.
- **For Stanley (2026-10-12):** besides the four twins, the finder lists 39 cards whose description restates a formula from the card's own thumbnail, usually while defining its symbols (for example Heron's Formula, the Law of Sines, Stewart's Theorem). Rule 17 asks that the symbols be defined, so rewriting these is his call: either leave them, or reword each description to define the symbols without repeating the formula.
- (d) **(done 2026-10-12)** A README entry for all of 2.4d and 2.4b batch 1, a memory update, a rebuilt search index, and all gates at 0. Every edited card renders with 0 KaTeX errors in light and dark. Then commit and push.

### 2.4b New cards (all approved by Stanley; batches of two or three, each reported)
Check for overlap with existing cards before writing. Existing ones to watch: Carnot's Theorem `carnots-theorem`, Isogonal Conjugate, The Steiner Line, Power of a Point, Desargues's Theorem. Where one exists, either extend it or write the new card as a distinct fact and cross-link; never state a fact twice.
1. ~~Perpendicularity Lemma~~ (done, batch 1)
2. ~~Carnot's Perpendicularity Theorem~~ (done, batch 1)
3. ~~Iran Lemma~~ (done, batch 1; figure fixed in 2.0)
4. **Steiner's Ratio Theorem for Isogonal Cevians** (the ratio of sines form). Relate it to the Ratio Lemma and Trig Ceva; do not repeat them.
5. **Isogonal Line Lemma** (Stanley's statement): if $AX$ and $AY$ are isogonal, then the lines from $A$ to $BX \cap CY$ and to $BY \cap CX$ are also isogonal.
6. **Linearity of Power of a Point**: power is a linear function of the point's position along a line or in the plane, with the radical-axis and weighted-sum uses.
7. **Humpty and Queue Points** (Stanley's statement; verify each numerically):
   - the A-Humpty point is the foot of the perpendicular from $H$ to the $A$-median, and it lies on circle $(BHC)$;
   - the A-Queue point is the second intersection of line $MH$ with the circumcircle, with $\angle AQH = 90^\circ$.
8. **Desargues Involution Theorem and its dual, DDIT.**
9. ~~Merge the pattern Same Remainder into the method Subtracting Equal Remainders~~ (**found done**, 2026-10-12: the pattern is gone, its keyword is on the method, `MERGED_IDS` redirects it, and no list, tag, or link uses the old id). The full merge checklist was:
   - `MERGED_IDS` in `js/app.js`;
   - `tools/link-aliases.json` and `tools/rewrite-register.json`;
   - the lists in `built-in-lists.js`;
   - the id lists in `js/app.js`;
   - `importance-proposal.md`;
   - `[[...]]` links in other write-ups;
   - problem-db tags.
10. **The six LIVE-concept cards** from `tools/live-missing.md`: a newly defined operation, logical deduction, organized listing, simulating a process, coins and prices, drawing without replacement. Write them to existing-card standards, each with importance (rule 12) judged from the LIVE tag counts and shown in the batch report.

Planned batches: 2 = cards 4, 5, 6; 3 = cards 7, 8; 4 = the first three LIVE cards; 5 = the other three LIVE cards.

**Per card:**
- a verified example (numbers checked by computation; never a copied example, rule 7);
- a figure following rules 5 and 18, with an `ok` check;
- a Why-it-works proof (rule 14);
- a route and group placement, and aliases;
- a `connected.js` row where natural;
- a search-eval check (stays at or above 160 of 187);
- an importance table row in `tools/importance-proposal.md`;
- the batch added to `NEW_CARD_BATCHES` (rule 19).

**Importance:** Stanley answered the proposal with no objection to the ratings, so the table stands. Humpty/Queue and DDIT are lower; the Perpendicularity Lemma is medium; the others are low. All are Olympiad tier.

### 2.4g New Geometry subsection: Olympiad Triangle Lemmas (new, Stanley 2026-10-12; done with 2.4b)
The recent additions focus on olympiad geometry, so they get a home of their own. Add a formula topic **"Olympiad Triangle Lemmas"** to `js/data/geometry.js`.
- **Placement:** after "Derived Triangles & Conjugates" and before "Triangle Centers & the Euler Line". Give it a one-line `blurb`: the named lemmas olympiad solutions quote about a triangle, its incircle, orthocenter, and isogonal lines.
- **Members to move or add.** Move only cards that really are quoted lemmas; general theorems stay where they are.
  - From batch 1: Iran Lemma, and Carnot's Perpendicularity Theorem.
  - From 2.4b: Humpty and Queue Points, the Isogonal Line Lemma, and Steiner's Ratio Theorem for Isogonal Cevians.
  - Existing cards: the Incenter–Excenter Lemma (now in Triangle Centers).
  - From the 2.4c scan: any new lemma cards it proposes.
  - The Perpendicularity Lemma is a general tool used outside triangles, so it stays in Advanced Triangle Theorems and links across.
- **Process:** the member list is shown to Stanley in the first 2.4b batch report before anything is moved. A move keeps every id. Update the following to match:
  - group membership in `built-in-lists.js` routes and lists;
  - `tools/check-topics.py` and `check-lists.py`;
  - sidebar and subject-page anchors (`#/formulas/geometry/olympiad-triangle-lemmas`);
  - `connected.js`;
  - the README subsection list.
- Gates at 0, README entry.

### 2.4c Scan of the five card files for errors, issues, and missing advanced lemmas (new, Stanley 2026-10-12; right after all the new cards)
This is the scan formerly listed as 2.6, moved up to run once 2.4b and 2.4g are done, and widened. The files are `js/data/geometry.js`, `algebra.js`, `number-theory.js`, `counting.js` (counting and probability), and `patterns.js`.
1. **Errors and issues.** Read every card's thumbnail and description in batches of about 60. Look for the 2.4d classes:
   - a formula that is false or missing its hypothesis (replacement, a sign, a range, a degenerate case);
   - a symbol used but not defined;
   - a unit or scale left implicit;
   - a fact stated on two cards or twice on one;
   - a misspelling, or the title and description disagreeing;
   - a keyword repeated;
   - a wrong claim;
   - a pattern or method breaking the anatomy.

   Verify every formula by computation (random numeric tests, brute force for counting), not by eye. Also check `js/app.js` and the data indexes (id lists, aliases, lists, counts).
2. **Missing advanced lemmas and cards.** List, subject by subject, the advanced (AIME Late and Olympiad) lemmas and standard results a strong student is expected to know that the app lacks or only mentions in passing. Examples to check:
   - geometry: the shooting lemma, the mixtilinear incircle lemmas, the Dumpty point, the orthocenter reflection lemmas beyond what exists, the radical center, the spiral similarity center, the Simson and Steiner line companions;
   - algebra: Schur-like and SOS lemmas, Vieta jumping, Abel and Karamata companions;
   - number theory: lifting-the-exponent variants, the order lemmas, the Chinese remainder constructions, Hensel, quadratic reciprocity companions;
   - combinatorics: the extremal principle, double counting lemmas, the probabilistic method, generating-function lemmas;
   - patterns: missing archetypes.

   Check each against existing cards (search the card index and aliases) so nothing is proposed twice.
3. **Report before changing anything**, as in 2.4d:
   - a findings list with verdicts (true, not true) and the fix for each;
   - a separate proposal table of candidate new cards, giving name, kind, subject and subsection (geometry lemmas go to Olympiad Triangle Lemmas where they fit), proposed tier and importance on evidence (rule 12), and why it is missing.

   New cards wait for Stanley's approval, the same rule as `live-missing.md`.
4. Then fix the approved findings, add scanner gates for any class that can be checked mechanically, write the approved new cards in batches (the 2.4b checklist, registered for `Special:NewCards`), README entry, backup.

**Status 2026-10-12:** the scan is done and its findings are fixed. Stanley approved all 12 candidate cards in `QUESTIONS.md` (Shooting Lemma, Dumpty Point, √bc Inversion, Van Aubel's Cevian Theorem, Archimedes' Broken Chord, Nesbitt, Injectivity/Surjectivity in FEs, Cyclotomic Polynomials, Gambler's Ruin, Strategy Stealing, Erdős–Ko–Rado, Tiling a Board). They are written in batches of three with the 2.4b checklist. **Done 2026-10-12**: all twelve are written, verified, and registered.

### 2.4f Figure line audit (new, Stanley 2026-10-12: "review cards to ensure that lines aren't cut off")
1. **Mechanical gate** in `tools/check-diagrams.py`. Flag any drawn segment whose supporting line passes within about 1.5 px of a labeled dot, while the dot lies more than about 3 px beyond the segment's end. That is a line that stops short of a point on it, as in the old Iran figure.
2. Review every hit, since a short ray can be deliberate. Keep an allowlist of the deliberate ones with a reason.
3. **Visual pass.** Render all card figures (about 330 `DIAGRAMS` panels and about 190 in-text `BODY` figures across `geometry-diagrams.js` and `general-diagrams.js`) to contact sheets with headless Chromium. Look for:
   - lines cut off before the point they meet;
   - extensions outside the shape that are not dashed;
   - midlines and midpoints without ticks;
   - figures with no context in the text (like the zigzag).
4. Fix in batches. After each batch: the `ok` self-checks, `check-labels.py`, `check-diagrams.py` at 0, README entry, commit.

**Done 2026-10-12.** Both gates are in (line gaps, raw TeX in figure text), all 584 panels were reviewed, and the fixes are in the README. Ticks only where color or labels do not already show the equal parts (Stanley).

### 2.4e Formula-box length audit (Stanley: after the card edits and the new cards)
Some cards read poorly because the formula box is over-packed. British Flag Theorem is the example: several forms and a 3D identity squeezed into one thumbnail. Audit every card's thumbnail:
1. **Measure** in the browser at 1280 and 375 px (reuse `tools/ui-scan.js` and `window.MATH_SECTIONS`):
   - the number of `\qquad` forms;
   - the rendered height of the formula box;
   - the widest line against the box width;
   - whether it needs a sideways scroll.

   Rank all cards by a squish score: more than 3 forms, a height above about 150 px at 1280, or a single line wider than the box.
2. **Review the worst offenders as a list with Stanley**: the card, its current form count, and what is packed in. Then fix:
   - keep the one or two headline forms in the thumbnail (the Formula lines setting already controls how many show on browsing cards);
   - move secondary forms to Key forms;
   - split into stacked `gathered` lines where all forms must stay (rule 4);
   - shorten `\text{...}` runs.
3. Re-measure the fixed cards. No fact is dropped (each moved form still exists in Key forms). Gates, README entry, backup.

### 2.4 Whole-app UI scan: finish (after 2.4e, so the formula boxes are already fixed)
- **Done already (first pass):**
  - the scanner `tools/ui-scan.js` checks page-h-overflow, past-right, clipped, formula-scrolls, katex-error, and broken-img;
  - it runs at an emulated width;
  - all 656 card pages are clean at 1280 light;
  - at 375, 390 pages have display formulas that scroll inside their box (by design), and the four real overflows are fixed;
  - 201 other routes and the popups are clean at 375.
- **To finish:**
  - the statement scan: 4,616 statements at 375, 768, and 1280. The raw-markup check must skip `.katex-mathml`, which caused false positives.
  - the 768 and 1920 widths;
  - dark mode and Larger text sweeps;
  - the sampled card pages at every setting.
- Report findings and fixes; then go on to 2.5.

### 2.5 Stage C: subject tag, then tag the problems from LIVE (after the UI scan is finished)
**2.5a Subject tag on every problem.** *Done 2026-10-12 from tagged cards, round names, and overrides (1,365 problems); the LIVE-concept source waits for the Mac, since LIVE is blocked from the cloud session.* Stanley's request; his answer: label it "Combinatorics"; do it right before tagging.
- Every problem page gets a subject chip, **the first chip** in the chip row under the title (today the `ptype-chip`s from `renderProblemDetail` in `js/app.js`).
- It shows one or more of **Geometry, Combinatorics, Number Theory, Algebra**, with more than one when the problem spans categories.
- It is derived, not hand-typed, from:
  - the subjects of the problem's tagged cards (each card has a `subject`; counting maps to Combinatorics);
  - LIVE's concept tags, for problems with no card tags yet;
  - a small override list in the problem data, for the rest.
- A problem with nothing to go on shows no chip until it is tagged (no guess).
- Also show the chip on contest-list rows if it fits.
- Scanner/validator check: every problem with a tag or a LIVE concept has a subject, and the chip never contradicts a tagged card.

**2.5b Tagging.** Stanley's "yes" starts this stage.
- The concept mapping is his to approve. The first report of the stage shows the mapping table and the candidate-new-card list (`tools/live-missing.md`).
- Tagging goes ahead **only for concepts that map unambiguously to an existing card**. Ambiguous concepts wait for his answer. (The six candidate cards are written in 2.4b, so most of those concepts will then map.)

Steps:
1. Build the **concept to existing card** table: 258 LIVE concept strings, 11,229 tags (in `~/aops-cache/live/` on Stanley's Mac; re-fetch here if needed). Mark each row unambiguous, ambiguous, or no card.
2. Tag the roughly 3,100 "Not classified yet" placeholder problems.
   - Work in batches of about 100 to 150, ordered by contest importance: AIME and AMC 12 first, then AMC 10, then AMC 8.
   - Tag to **existing cards only**, with a strategy in the house style (no hints), and the pattern and method where the evidence is clear; otherwise leave the problem unclassified.
   - Existing tags never change.
   - Reuse the `tools/fetch-live-statements.py` data, the problem-db format in `js/data/problems/problem-db.js`, and `tools/RETAG-NOTES.md`.
3. After each batch:
   - `validate-problem-db.js`, `scan-conventions.py`, and `check-statements.py` at 0;
   - `audit-problem-tags.py` on the new tags (a tag must be recognisable in the strategy);
   - the importance table re-checked for cards whose problem counts changed;
   - the card-search eval at or above 160 of 187;
   - the problem count per card reported;
   - a README entry, and a backup.
4. Per-contest lists, once enough problems are tagged.

### 2.6 Card-file re-check after tagging (light; the full scan moved up to 2.4c)
After 2.5, re-run the 2.4c checks only on cards whose text changed during tagging, plus the mechanical gates. Report anything found, then go on to Stage 4.

### Stage 4: practice expansion (after 2.6, before R)
Stanley merged "more solutions and tags" and "diagrams inside solutions" into one place for growing the practice side, done together, problem by problem.
1. **A paragraph of explanation on every AMC and AIME problem** (the "How this problem works" text, `chain-strategy` in `renderProblemDetail`).
   - It is a real explanatory paragraph in the house style: what the problem is asking, why the tagged pattern, method, and formulas apply, and the key step. No hints in the UI sense.
   - Most-used contests first (AIME, then AMC 12, AMC 10, AMC 8), in batches of about 100.
   - Also tag with the correct cards as you go, and re-check existing tags where `audit-problem-tags.py` flags one the text does not use.
2. **Our own diagram for geometry problems whose statement gives no figure**, drawn as we go.
   - It sits **below the "How this problem works" header and above the explanation text, with no header of its own**, and it is always present for such a problem.
   - Format first: a figure slot in `renderProblemDetail` between the `<h4>` and `.chain-strategy`. The data is keyed by problem slug (`js/data/problems/solution-figures/`), or reuses the diagram builders in `js/data/diagrams/geometry-diagrams.js` with their `ok` self-checks.
   - A scanner rule: a geometry problem with no statement figure must have one here. The diagram must show the fact, not a bare shape, and follow rule 18. Labels are checked by `check-labels.py`.
   - The drawing is checked against the statement's numbers.
   - **Pilot on about 10 problems for Stanley's review before the mass run.**
   - Where a statement figure exists, no extra diagram unless it adds something.
3. Each batch: validators and the scanner at 0, the importance table re-checked for cards whose problem counts changed, the card-search eval at or above 160 of 187, a problems-per-card report, a README entry, and a backup.

(Diagrams inside card proofs and worked examples are folded into this stage as a later pass, only if it still looks reasonable.)

### Stage 4b (R): proof-depth pass
Eventually more cards carry detailed proofs and explanations, and fewer sections are thin.
- Read every converted card's Why it works, Useful observations, and Applications for thinness: one-line sections, a claim stated without reason, a bullet that is only a pointer. Also check each against rule 14.
- Start with the important cards (HIGH and MED) and the format-only P29 to P31 cards, thinnest first, in batches of about 9.
- Expand them in the house style (centered key lines, figures, plain lead-ins), adding diagrams where they help.
- Report each batch and record it in the README.

### Stage 5: flashcards and experimental features into Practice (new, Stanley 2026-10-12; NOT a priority)
Some time after the problem stages (2.5 and Stage 4):
- **What exists.** Flashcards (an SM-2 review), Quiz, and Formula Web live in `lab/`, linked only from Settings → Experimental. They were put there because they did not fit anywhere else.
- **Where they go.** Now that there is a Practice space, finalize them so they are actually useful, and place them in Practice:
  - decks built from study lists, starred cards, and a contest's tagged cards;
  - problems as flashcards (statement to the pattern and method);
  - the Quiz drawing on the same decks.
- **First step.** Test each experimental feature as it stands, then list what to keep, fix, or drop for Stanley before building.

### Open loose ends
- Per-contest lists, once the new problems are tagged (2.5b step 4).
- The 2.4d twin list awaits Stanley's word.

---

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
- **Backup:** commit and `git push -u origin claude/inspiring-curie-svp5pr` here. On the Mac, `rsync` to `~/Documents/CompMath-backup/` (done by `conv/gates.sh`).
- **Never** edit a source file with a slice-and-replace that was not checked afterwards. On 2026-10-11 a mis-sliced edit to `js/app.js` deleted a block. Check syntax (`node --check`, `new Function(text)`, or `jsc`) after any large edit.

## 4. Decisions already made (do not reopen)
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
