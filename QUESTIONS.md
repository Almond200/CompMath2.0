# Questions for Stanley

**Answered 2026-10-12:**
- Questions 1 and 2: the twins stay, because a card like LTE is both the formula and the method.
- Question 2: the 39 descriptions define their symbols without restating the thumbnail formula, unless they add something; the paragraph may carry more explanation instead.
- Question 3: approved; the subsection goes right after Advanced Triangle Theorems, not at the bottom.

Done 2026-10-12: all 47 descriptions are rewritten, and the subsection is in place.

Things found while working through PLAN.md that are style or judgement calls rather than verified errors. Verified errors are fixed straight away and recorded in the README; everything here waits for your word. Newest at the bottom of each section.

## Duplicates and style (rule 17)
1. **Method/formula twins** that `tools/find-duplicate-forms.py` finds: the same formula on both cards' thumbnails. They may be deliberate, since a method can quote the formula it uses. Keep them as they are, or move the formula to one card and point from the other?
   - `lte` and `lte-lemma`: $v_p(a^n - b^n) = v_p(a - b) + v_p(n)$
   - `poly-divisible-linear` and `reduce-divisibility-constant`: $n + a \mid P(n) \iff n + a \mid P(-a)$
   - `cycle-hunting` and `periodic-sequences`: $a_{n+T} = a_n \implies \dots$
   - `area-method` and `cevian-area-ratio`: $\frac{[ABD]}{[ACD]} = \frac{BD}{DC}$
2. **39 cards whose description restates a formula from their own thumbnail**, usually while defining its symbols (for example Heron's Formula, the Law of Sines, Stewart's Theorem, Binet's Formula, Expected Value). Rule 17 wants the symbols defined, so restating can be the clearest way to do that. Should they stay, or should each description define the symbols without repeating the formula? (`python3 tools/find-duplicate-forms.py` lists all 39.)

## New Geometry subsection: Olympiad Triangle Lemmas (2.4g)
3. The proposed members, to be moved there (ids unchanged):
   - Iran Lemma
   - Carnot's Perpendicularity Theorem
   - Steiner's Ratio Theorem for Isogonal Cevians
   - Isogonal Line Lemma
   - Humpty and Queue Points
   - the Incenter–Excenter Lemma (now in Triangle Centers & the Euler Line)

   The Perpendicularity Lemma and Linearity of Power of a Point stay where they are, because they are general tools. OK to move these, or change the list?

## Candidate new cards from the card-file scan (2.4c; approved and written 2026-10-12)
All twelve were approved and are now cards (`Special:NewCards/All`, batches 1 to 4 of the card-file scan). The table is kept as the record.
Each was checked against every card's name, keywords, and description, and none exists. The tier and importance are proposals (rule 12). The evidence is how often the idea appears in solutions at that level, because no practice problem is tagged with these cards yet. Answer per row: yes, no, or a different rating.

| # | Card | Kind, subject / subsection | Tier, importance | Why it is missing / what it adds |
|---|---|---|---|---|
| 1 | Shooting Lemma | formula, geometry / Olympiad Triangle Lemmas | Olympiad, low | A circle tangent internally to the circumcircle at $T$ and to chord $BC$ at $D$: line $TD$ passes through the midpoint $M$ of the arc, and $MB^2 = MD \cdot MT$. Quoted in mixtilinear and Sawayama–Thébault problems; today it only appears inside those proofs. |
| 2 | The Dumpty Point | formula, geometry / Olympiad Triangle Lemmas | Olympiad, lower | The companion of the Humpty point on the symmedian: the center of the spiral similarity sending $AB$ to $CA$, the midpoint of the symmedian chord, on circle $(BOC)$. Pairs with Humpty and Queue. |
| 3 | $\sqrt{bc}$ Inversion | method, geometry / Transformations & Inversion | Olympiad, low | Inversion at $A$ with radius $\sqrt{bc}$ followed by reflection in the bisector swaps $B$ and $C$, and sends the circumcircle to line $BC$. A standard olympiad move with no card yet. |
| 4 | Van Aubel's Cevian Theorem | formula, geometry / Advanced Triangle Theorems | AIME Late, low | For concurrent cevians through $P$: $\frac{AP}{PD} = \frac{AF}{FB} + \frac{AE}{EC}$. The existing Van Aubel card is the theorem about squares on a quadrilateral, so this one has no home. |
| 5 | Archimedes' Broken Chord Theorem | formula, geometry / Circles | AIME Late, lower | The foot of the perpendicular from the arc midpoint bisects the broken chord $AB + BC$. Appears in a few AIME and olympiad problems; currently absent. |
| 6 | Nesbitt's Inequality | formula, algebra / Inequalities | AIME Late, low | $\frac{a}{b+c} + \frac{b}{c+a} + \frac{c}{a+b} \ge \frac32$. Mentioned only as an example on the Hölder card; it is the most-quoted named three-variable inequality. |
| 7 | Injectivity and Surjectivity in Functional Equations | method, algebra / Working with Functions | Olympiad, medium | The first move in most olympiad functional equations: prove the function is injective or surjective, then cancel or substitute. No card covers it; Functional Equation Substitution covers plugging in values only. |
| 8 | Cyclotomic Polynomials | formula, number theory / Special Numbers & Sequences | Olympiad, low | $x^n - 1 = \prod_{d \mid n}\Phi_d(x)$, irreducibility, and prime divisors of $\Phi_n(a)$ being $\equiv 1 \pmod n$ (or dividing $n$). Mentioned on the Eisenstein card only. |
| 9 | Gambler's Ruin | formula, counting / Probability | AIME Early, low | $P(\text{reach } N \text{ from } k) = \frac{k}{N}$ for a fair walk, and $\frac{1 - (q/p)^k}{1 - (q/p)^N}$ otherwise. It appears in AIME problems; today it is only a sentence on First-Step Analysis. |
| 10 | Strategy Stealing and Symmetry Strategies | method, counting / Existence Arguments | AIME Early, low | Games won by mirroring the opponent or by showing the second player cannot win. Sprague–Grundy covers impartial game values but not these two moves. |
| 11 | Erdős–Ko–Rado Theorem | formula, counting / Symmetry, Partitions & Posets | Olympiad, lower | The largest family of pairwise-intersecting $k$-subsets of an $n$-set, $n \ge 2k$, has $\binom{n-1}{k-1}$ members. Completes the extremal-set trio with Sperner and Dilworth. |
| 12 | Tiling a Board | pattern, counting / Strings & Sequences with a Rule (or a new Tilings group) | AMC, low | Dominoes, trominoes, or tiles covering a board. The coloring, recursion, and transfer-matrix methods exist, but no pattern card says "this is a tiling problem" and points to them. |

Not proposed (already covered): the radical center (on Radical Axis), tangents meeting on the symmedian (on Harmonic Quadrilaterals), Vieta jumping, Schur, SOS, LTE variants, Hensel, orders, primitive roots, quadratic reciprocity, the extremal principle, double counting, the probabilistic method, and generating functions.

## Formula-box audit (2.4e; waiting for your yes per row)
Every card's formula box was measured in the browser at 1280 px and 375 px (680 boxes). A one-row box is about 108 px tall at 1280, and each extra row adds about 50 px. No box scrolls sideways at 1280. The rows below are the 19 boxes with five or more rows. "In Key forms" means the rows to be moved already appear in the card's Key forms, so moving them loses nothing; "add" means they would be added there first.

Already fixed (a display bug, not a style choice): four boxes ended a row with a dangling colon, because the app breaks rows at `\qquad`, and the ellipse even had "a > b :" as a row of its own. Ellipse, Hyperbola, Eccentricity, and Conic Classification now read cleanly.

| Card | Rows | What is packed in | Proposal |
|---|---|---|---|
| Order Statistics | 7 | five continuous facts, then two long text rows for discrete draws with and without replacement | keep the five continuous rows; move the two discrete rows to Key forms (add) |
| Binet's Formula | 6 | Binet, the definitions of φ and ψ, then Cassini, gcd, addition, sum of squares | keep Binet and φ, ψ; the four Fibonacci identities leave the box (all in Key forms). One idea per card |
| Product-to-Sum & Sum-to-Product | 6 | three product-to-sum and three sum-to-product formulas | keep: the six are the card |
| Reduction Identities | 6 | six cofunction and sign rules | keep: a reference table |
| Sums of Powers | 5 | Σk, Σk², Σk³, the odd sum, the even sum | keep the first three; the odd and even sums leave the box (in Key forms) |
| Vieta's Formulas (Quadratic) | 5 | r + s, rs, then r² + s², 1/r + 1/s, \|r − s\| | keep r + s and rs; the three derived forms leave the box (two in Key forms, add 1/r + 1/s) |
| Special Trig Values | 5 | sin 15°, cos 36°, sin 18°, tan 15°, tan 75° | keep: a reference table |
| Hyperbola Properties | 5 | equation, focal difference, c², asymptotes, xy = k | move xy = k (rectangular) to Key forms (add) |
| Cone Formulas | 5 | slant, lateral area, total area, volume, sector angle | keep: a reference card |
| Excentral Triangle | 5 | I as orthocenter, ABC as orthic triangle, sides, circumradius, area | keep the first, the sides, and R; move "ABC is the orthic triangle" and the area to Key forms (add) |
| Eccentricity | 5 | the definition, then one row per conic | put the four conic cases on one row ("e = 0 circle, 0 < e < 1 ellipse, …"): 2 rows, nothing moved |
| Triangle Angle Identities | 5 | five identities for A + B + C = 180° | keep: the card owns these after the rule-17 dedupe |
| Polar Coordinates | 5 | x, y, r², tan θ, the polar cell area | move the cell area to Key forms (add) |
| Absolute Value Identities | 5 | five rules | keep: a reference card |
| Recognition Numbers | 5 | 1001, 999, 1024, 1729, 7⁴ | keep: a reference list |
| Newton's Sums | 5 | the general recurrence, then p₁ to p₄ | keep the recurrence, p₁, p₂; move p₃, p₄ (p₃ in Key forms, add p₄) |
| Log Rules | 5 | five rules | keep: a reference card |
| Divisibility Rules | 5 | five rules | keep: a reference card |
| Anticomplementary Triangle | 5 | R′, area, O′, N′, H′ | keep |

So the proposal changes 9 cards (Order Statistics, Binet, Sums of Powers, Vieta, Hyperbola, Excentral, Eccentricity, Polar Coordinates, Newton's Sums) and keeps 10.

At 375 px, 397 boxes scroll sideways inside the box, which is by design. In 23 of them the row is more than 2.5 times the phone width. The proposal is one row break at the natural point (before $\iff$, or after the condition), with nothing removed: Desargues Involution, Carnot's Perpendicularity Theorem, Reim's Theorem, Basic Facts about Trees, Total Expectation, British Flag Theorem, Isotomic Conjugate, Schur's Inequality, Lagrange's Theorem on Roots mod p, Polynomial CRT, Inclusion–Exclusion, Pick's Theorem on a Hexagonal Grid, Order Statistics, CRT Solution Counting, Defined Operations, Conway Circle, Japanese Theorem, Pappus's Hexagon Theorem, the Twelvefold Way table, Nine-Point Circle, Integer Triangles with a Given Perimeter, the Steiner Line, and Pigeonhole.
