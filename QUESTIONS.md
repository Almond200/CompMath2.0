# Questions for Stanley

Things found while working through PLAN.md that are style or judgement calls rather than verified errors. Verified errors are fixed straight away and recorded in the README; everything here waits for your word. Newest first: the newest section is at the top, and within a section the newest items come first.

## Candidate new cards from the practice pass (2.7a, 2026-10-17)
Each is a fact or move a re-solved problem needed and no card holds (checked against names, keywords and descriptions). The problems cite the nearest card meanwhile. Tier and importance are proposals (rule 12); the evidence so far is one problem each. Answer per row: yes, no, or a different rating. Newest rows first.

**Status, newest first.** P6 approved on 2026-10-17 and written as the method `closing-polygon-vectors`; 2026 AIME I #14 cites it. P1's importance was lowered from low to lower on 2026-10-17, at the owner's request. P5 approved on 2026-10-17 and written as the method `conjugate-both-sides`. On re-reading, three of the listed problems use the move (2018 AIME I #6, 2001 AIME II #14, 2020 AMC 12B #23) and now cite it. The others only use $z\bar z=\lvert z\rvert^2$ or the conjugate root theorem, and 2016 AMC 12B #22 is about repeating decimals. P5 was written as AMC, not AIME Early, because one of its problems is on the AMC 12. P1 to P4 approved on 2026-10-17 and written (`diagonal-angle-from-sides`, `squares-on-triangle-flanks`, `parallel-sided-hexagon`, `product-of-uniforms`), and the four problems now cite them. P3 was written as AIME Early, not AIME Late: its one problem is AIME #5, and the tier rubric reads that as early. P7 to P11 approved on 2026-10-17 and written as `cevian-ratio-sum`, `square-crossing-segments`, `perimeter-cleavers`, `conic-perpendicular-radii` and `gram-determinant-volume`; 1988 AIME #12, 2005 AIME I #14, 2022 AIME I #14, 2024 AIME I #9 and 2023 AIME I #13 cite them. P12 and P13 approved on 2026-10-17 and written as the methods `setting-up-proportions` (Setting Up a Proportion) and `linear-elimination` (Solving a Linear System by Elimination), in Methods > Algebra > Setting Up Equations; their 8 and 9 problems cite them, and Addendo, Componendo & Dividendo, which none of those problems used, now cites no problem. **Nothing is open here now.** A new candidate goes at the top of the table as P14.

| # | Card | Kind, subject / subsection | Proposed tier, importance | Needed by |
|---|---|---|---|---|
| P13 | Solving a Linear System by Elimination: name the unknowns, write one equation per condition, and combine equations to cancel all but one unknown (or substitute forward through a chain) | method, algebra / word-problem setups | AMC, medium | 2022 AMC 10A #3, 2023 AMC 10A #2 / 12A #2, 2023 AMC 10B #5, 2024 AMC 10A #2 / 12A #2, 2024 AMC 10B #25, 2007 AIME II #4, 2009 AIME II #1; each cites a nearby card or Addendo meanwhile |
| P12 | Setting Up a Proportion (ratios, unit rates and unit conversion): equal ratios cross-multiply, a constant rate makes amount proportional to time, and chained conversion factors cancel units | method, algebra / word-problem setups | AMC, medium | 1990 AIME #6 (capture-recapture), 1992 AIME #3, 2008 AIME I #1, 2022 AMC 10A #2 and #4, 2023 AMC 10B #4 / 12B #4, 1987 AIME #8; they cite Addendo, Componendo & Dividendo meanwhile, which none really uses |
| P11 | Volume from Edge Lengths and Angles (Gram determinant): with edge vectors $u$, $v$, $w$ from one vertex, $V^2=\det\begin{pmatrix}u\cdot u&u\cdot v&u\cdot w\\ u\cdot v&v\cdot v&v\cdot w\\ u\cdot w&v\cdot w&w\cdot w\end{pmatrix}$, so a parallelepiped's volume needs only its dot products | formula, geometry / solid geometry | AIME Late, lower | 2023 AIME I #13 (both rhombic parallelepipeds from $|u|^2=13$ and $u\cdot v=\pm\tfrac52$); it cites Dot Product and the volume card meanwhile |
| P10 | Perpendicular Radii of a Central Conic: for $\tfrac{x^2}{a^2}\pm\tfrac{y^2}{b^2}=1$ and $OA\perp OB$ with $A$, $B$ on the curve, $\tfrac1{OA^2}+\tfrac1{OB^2}=\tfrac1{a^2}\pm\tfrac1{b^2}$ | formula, geometry / conic sections | AIME Late, lower | 2024 AIME I #9 (the rhombus on the hyperbola, $BD^2\gt480$); it cites Conic Sections and Hyperbola meanwhile |
| P9 | Splitting Lines (Cleavers): the line through the midpoint of a side that halves the perimeter is parallel to the bisector of the opposite angle, and the three meet at the Spieker point | formula, geometry / triangle centers | AIME Late, lower | 2022 AIME I #14 (it proves the fact from the Angle Bisector Theorem and the Intercept Theorem meanwhile); the Spieker card lists "cleaver" only as a keyword |
| P8 | Perpendicular Segments Across a Square Are Equal: two perpendicular segments, each joining a pair of opposite sides of a square, have equal length (rotate one by $90^\circ$ about the center) | formula, geometry / polygons | AIME Early, lower | 2005 AIME I #14 (the square through four given points); it cites Rotating a Point and Distance Between Parallel Lines meanwhile |
| P7 | Cevian Ratio Sum: for cevians $AD$, $BE$, $CF$ through an interior point $P$, $\tfrac{PD}{AD}+\tfrac{PE}{BE}+\tfrac{PF}{CF}=1$ (equivalently $\tfrac{AP}{AD}+\tfrac{BP}{BE}+\tfrac{CP}{CF}=2$), because the three triangles at $P$ fill the triangle | formula, geometry / cevians | AIME Early, low | 1988 AIME #12 (the whole problem is this identity; it cites Area Ratio from Base Ratios and Same-Base Area Ratio meanwhile); 1989 AIME #15 can use it to get $PF$ |
| P6 | Closing a Polygon with Side Vectors: the sides of a closed polygon, as vectors, add to zero; for an equiangular polygon $\sum a_k\omega^k=0$, and dotting the sum with itself relates the side products | method, geometry / coordinate and algebraic bashes | AIME Late, lower | 2026 AIME I #14 (it gives the products of non-adjacent sides); also behind the equiangular hexagon's $a-d=e-b=c-f$ |
| P5 | Conjugating Both Sides of a Complex Equation: apply $z\mapsto\bar z$ to a given equation to get a second one, then solve the pair (with $z\bar z=\lvert z\rvert^2$) | method, algebra / complex numbers | AIME Early, low | about ten statements use the move, among them 2005 AMC 12B #22, 2004 AMC 12B #16, 2016 AMC 12B #22, 2020 AMC 12B #23, 2023 AMC 12A #14, 1992 AIME #10, 2013 AIME II #12, 2014 AIME I #7, 2018 AIME I #6 and 2001 AIME II #14; no card holds the move (`complex-basics` lists the facts, `conjugate-root-theorems` is about roots) |
| P4 | Product of Two Uniform Variables: $P(XY\lt c)=c-c\ln c$ for $X$, $Y$ uniform on $[0,1]$ | formula, counting / geometric probability | AMC, lower | 2024 AMC 12A #20 (needs the area under $y=\tfrac cx$) |
| P3 | Equilateral Hexagon with Opposite Sides Parallel: the side $s$ satisfies $\tfrac1s=\tfrac1a+\tfrac1b+\tfrac1c$ for the triangle on alternate sides | formula, geometry / polygons | AIME Late, lower | 2024 AIME II #5 |
| P2 | Flank Triangles of the Squares on a Triangle: each gap triangle between two outward squares has the triangle's area, and its third side is twice the median | formula, geometry / triangle areas | AIME Late, low | 2019 HMMT February Geometry #10 (also the classic "squares on the sides" hexagon problems) |
| P1 | Angle Between the Diagonals from the Sides: $d_1d_2\cos\theta=\tfrac12\left\lvert a^2+c^2-b^2-d^2\right\rvert$ | formula, geometry / quadrilateral areas | AIME Late, low | 2021 AIME II #12 (with $\tfrac12d_1d_2\sin\theta$ it gives $\tan\theta$ from the sides and the area) |

## Candidate new cards from the gap scan (Step 5, 2026-10-12; approved except Perfect Numbers)

How I looked:
- about 250 topic names, olympiad and AMC, checked against every card's name, keywords, description, and write-up;
- the strategies of the 1,365 tagged problems, and the 4,616 statements, for situations that recur with no card;
- the "Gap candidates" in `tools/RETAG-NOTES.md`.

Almost everything standard is already covered. These are what's missing. Tick the ones you want, or strike any; nothing is written until you approve.

**Olympiad lemmas and theorems**

| # | Name | Kind | Where | Tier / importance | What it adds | Evidence |
|---|---|---|---|---|---|---|
| 1 | Combinatorial Nullstellensatz | formula | Counting › Advanced Counting | Olympiad / low | A nonzero monomial of top degree forces a point of the grid where the polynomial is nonzero. It proves Cauchy–Davenport (already a card) and many covering results. | Standard olympiad tool; no card names it |
| 2 | Orthogonal Circles | formula | Geometry › Circles | Olympiad / low | Two circles cross at right angles exactly when $d^2 = r_1^2 + r_2^2$; a circle through a point and its inverse is orthogonal to the circle of inversion. It ties together inversion, power of a point, and the radical axis. | Used inside inversion solutions; no card |
| 3 | Integer-Valued Polynomials | formula | Algebra › Polynomials & Equations | Olympiad / lower | $P(n) \in \mathbb Z$ for all integers $n$ exactly when $P$ is an integer combination of $\binom{x}{k}$. | Standard olympiad lemma |
| 4 | Schur's Theorem (colorings) | formula | Counting › Pigeonhole & Ramsey Theory | Olympiad / lower | Any finite coloring of $1, \ldots, N$ (large $N$) has a one-color solution of $x + y = z$. Distinct from Schur's Inequality, which is a card. | Ramsey-theory staple |
| 5 | Weitzenböck / Hadwiger–Finsler Inequality | formula | Geometry › Advanced Triangle Theorems | Olympiad / lower | $a^2 + b^2 + c^2 \ge 4\sqrt3\,K$, and the sharper Hadwiger–Finsler form. | Classic triangle inequality |
| 6 | Steiner–Lehmus Theorem | formula | Geometry › Advanced Triangle Theorems | Olympiad / lowest | Two equal internal angle bisectors force an isosceles triangle. | Classic; no contest use counted |
| 7 | Euler's Pentagonal Number Theorem | formula | Counting › Symmetry, Partitions & Posets | Olympiad / lower | The product $\prod (1 - x^n)$ expanded, giving the partition recurrence. | Partition-function problems |
| 8 | Cevian Nest Theorem | formula | Geometry › Derived Triangles & Conjugates | Olympiad / lowest | If $\triangle DEF$ is a cevian triangle of $\triangle ABC$, and $\triangle XYZ$ one of $\triangle DEF$, then $\triangle XYZ$'s cevians in $\triangle ABC$ concur. | Olympiad configuration lemma |
| 9 | Hook Length Formula | formula | Counting › Symmetry, Partitions & Posets | Olympiad / lowest | Counts standard Young tableaux of a shape: $n!$ over the product of hook lengths. | 5 statements mention hooks (not all relevant) |

**Number theory formulas**

| # | Name | Kind | Where | Tier / importance | What it adds | Evidence |
|---|---|---|---|---|---|---|
| 10 | ~~Perfect Numbers (Euclid–Euler)~~ (not approved) | formula | Number Theory › Special Numbers & Sequences | AIME Early / low | Even perfect numbers are exactly $2^{p-1}(2^p - 1)$ with $2^p - 1$ prime. Today "perfect number" is only a keyword on Sum of Divisors. | AMC/AIME divisor-sum problems |
| 11 | Dirichlet's Theorem on Primes in Progressions | formula | Number Theory › Primes, Factorials & Valuations | Olympiad / lowest | Infinitely many primes $\equiv a \pmod m$ when $\gcd(a, m) = 1$, quoted (not proved) in olympiad solutions. | Olympiad citations |

**Platonic solids**

| # | Name | Kind | Where | Tier / importance | What it adds | Evidence |
|---|---|---|---|---|---|---|
| 12 | Regular Dodecahedron & Icosahedron | formula | Geometry › Solid Geometry (3D) | AMC / low | Their vertex, edge, and face counts, edges at a vertex, and the facts the problems use (the icosahedron's pentagonal vertex figures, the five-cube inscription). The tetrahedron, cube, and octahedron already have cards; these two don't. | 2016 AIME I #3, 2020 AMC 10A #19, 2023 AMC 10A #18 and #25, 2023 AMC 12A #21 |

**Methods**

| # | Name | Kind | Where | Tier / importance | What it adds | Evidence |
|---|---|---|---|---|---|---|
| 13 | Partial Fractions | method | Algebra | AMC / medium | Split $\frac{1}{n(n+k)}$ or a rational function into simple pieces (cover-up rule, matching coefficients). Today it is mentioned only inside Telescoping. | Every $\frac{1}{k(k+1)}$-type sum; generating-function coefficients |
| 14 | Working Backwards | method | Algebra | AMC / medium | Undo the steps from the final state when a process is described forward and the start is asked for. | 1992 AJHSME #25, 2001 AMC 8 #13, 2025 AMC 8 #20, and others |
| 15 | Projective Transformations | method | Geometry | Olympiad / lowest | Send a line to infinity, or a conic to a circle, to make a collinearity or concurrence trivial. It is the method behind the Projective Geometry section's facts. | Olympiad technique; the section has facts but no method |

**Patterns (AMC level)**

| # | Name | Kind | Where | Tier / importance | What it adds | Evidence |
|---|---|---|---|---|---|---|
| 16 | Age Problems | pattern | Algebra › Word-Problem Setups | AMC / medium | The difference between two ages never changes; let the present ages be the unknowns and shift by the years. | 37 statements, e.g. 2019 AMC 10A #3, 2022 AMC 12B #19, 2025 AMC 10A #4, 2025 AMC 12A #3 |
| 17 | Calendar & Day-of-Week Problems | pattern | Number Theory › Divisibility & Remainders | AMC / medium | Days cycle mod 7, a year shifts the weekday by 1 (2 after a leap day), and the leap-year rules. | 36 statements, e.g. 2018 AMC 10A #3, 2024 AMC 10A #8, 2025 AMC 10B #11 |
| 18 | Painted Cubes | pattern | Geometry › Solid Configurations | AMC / low | An $n \times n \times n$ cube painted outside, cut into unit cubes: $8$ with three painted faces, $12(n-2)$ with two, $6(n-2)^2$ with one, $(n-2)^3$ with none. | 9 statements, e.g. 2005 AMC 10A #11, 2009 AMC 12B #17, 2020 AMC 12B #20 |
| 19 | Round-Robin Tournaments | pattern | Counting › Logic & Probability Setups | AMC / low | Total games $\binom n2$ equal total wins; average wins $\frac{n-1}{2}$; ties and points systems. The game count is already on the combinations card; the pattern would hold the wins and points reasoning. | 19 statements, e.g. 2017 AMC 12B #25, 2022 AIME II #2, 2023 AMC 12A #13 |
| 20 | Magic Squares | pattern | Counting › Logic & Probability Setups | AMC / lower | The magic sum is the total over $n$, and in a $3 \times 3$ square the center is the average entry. | 1996 AIME #1, 2001 AMC 10 #22, 2004 AMC 12B #22 |

**Already covered, so not proposed:**
- $a - b \mid P(a) - P(b)$: on Remainder & Factor Theorems;
- the round-robin game count: on the combinations card;
- Fagnano, the triple product, Euler's $R \ge 2r$, LYM, four squares, and compound interest.

**Considered and not proposed:**
- Lagrange multipliers: not accepted as a full olympiad solution, and AIME problems never need them;
- Langley's adventitious angles: a single famous puzzle, better as an example than a card;
- Aurifeuillean factorizations: too rare;
- Egyptian fractions: already the unit-fraction case of Simon's Favorite Factoring Trick.

## Formula-box audit (2.4e; approved and applied 2026-10-12)
Every card's formula box was measured in the browser at 1280 px and 375 px (680 boxes). A one-row box is about 108 px tall at 1280, and each extra row adds about 50 px. No box scrolls sideways at 1280. The rows below are the 19 boxes with five or more rows. "In Key forms" means the rows to be moved already appear in the card's Key forms, so moving them loses nothing; "add" means they would be added there first.

Already fixed (a display bug, not a style choice): four boxes ended a row with a dangling colon, because the app breaks rows at `\qquad`, and the ellipse even had "a > b :" as a row of its own. Ellipse, Hyperbola, Eccentricity, and Conic Classification now read cleanly.

| Card | Rows | What is packed in | Proposal |
|---|---|---|---|
| Order Statistics on [0, 1] | 7 | five continuous facts, then two long text rows for discrete draws with and without replacement | keep the five continuous rows; move the two discrete rows to Key forms (add) |
| Binet's Formula | 6 | Binet, the definitions of φ and ψ, then Cassini, gcd, addition, sum of squares | keep Binet and φ, ψ; the four Fibonacci identities leave the box (all in Key forms). One idea per card |
| Product-to-Sum & Sum-to-Product | 6 | three product-to-sum and three sum-to-product formulas | keep: the six are the card |
| Reduction Identities | 6 | six cofunction and sign rules | keep: a reference table |
| Sums of Powers of Integers | 5 | Σk, Σk², Σk³, the odd sum, the even sum | keep the first three; the odd and even sums leave the box (in Key forms) |
| Vieta's Formulas (Quadratic) | 5 | r + s, rs, then r² + s², 1/r + 1/s, \|r − s\| | keep r + s and rs; the three derived forms leave the box (two in Key forms, add 1/r + 1/s) |
| Special Values Worth Memorizing | 5 | sin 15°, cos 36°, sin 18°, tan 15°, tan 75° | keep: a reference table |
| Hyperbola Properties | 5 | equation, focal difference, c², asymptotes, xy = k | move xy = k (rectangular) to Key forms (add) |
| Cone Formulas | 5 | slant, lateral area, total area, volume, sector angle | keep: a reference card |
| Excentral Triangle | 5 | I as orthocenter, ABC as orthic triangle, sides, circumradius, area | keep the first, the sides, and R; move "ABC is the orthic triangle" and the area to Key forms (add) |
| Eccentricity | 5 | the definition, then one row per conic | put the four conic cases on one row ("e = 0 circle, 0 < e < 1 ellipse, …"): 2 rows, nothing moved |
| Identities for Angles Summing to 180° | 5 | five identities for A + B + C = 180° | keep: the card owns these after the rule-17 dedupe |
| Polar Coordinates | 5 | x, y, r², tan θ, the polar cell area | move the cell area to Key forms (add) |
| Absolute Value Identities | 5 | five rules | keep: a reference card |
| Numbers Worth Recognizing | 5 | 1001, 999, 1024, 1729, 7⁴ | keep: a reference list |
| Newton's Sums | 5 | the general recurrence, then p₁ to p₄ | keep the recurrence, p₁, p₂; move p₃, p₄ (p₃ in Key forms, add p₄) |
| Log Rules | 5 | five rules | keep: a reference card |
| Divisibility Rules | 5 | five rules | keep: a reference card |
| Anticomplementary Triangle | 5 | R′, area, O′, N′, H′ | keep |

So the proposal changes 9 cards (Order Statistics, Binet, Sums of Powers, Vieta, Hyperbola, Excentral, Eccentricity, Polar Coordinates, Newton's Sums) and keeps 10.

At 375 px, 397 boxes scroll sideways inside the box, which is by design. In 23 of them the row is more than 2.5 times the phone width. The proposal is one row break at the natural point (before $\iff$, or after the condition), with nothing removed: Desargues Involution Theorem and Its Dual, Carnot's Perpendicularity Theorem, Reim's Theorem, Basic Facts about Trees, Law of Total Expectation, British Flag Theorem, Isotomic Conjugate, Schur's Inequality, Lagrange's Theorem on Polynomial Roots mod p, Chinese Remainder Theorem for Polynomials, Principle of Inclusion-Exclusion, Hexagonal Grids and Pick's Theorem, Order Statistics on [0, 1], Counting Solutions via CRT, A Newly Defined Operation, The Conway Circle, The Japanese Theorem, Pappus's Hexagon Theorem, Balls in Boxes (The Twelvefold Way), The Nine-Point Circle, Counting Integer-Sided Triangles by Perimeter, The Steiner Line, and Pigeonhole Principle.

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

## New Geometry subsection: Olympiad Triangle Lemmas (2.4g)
3. The proposed members, to be moved there (ids unchanged):
   - Iran Lemma
   - Carnot's Perpendicularity Theorem
   - Steiner's Ratio Theorem for Isogonal Cevians
   - Isogonal Line Lemma
   - Humpty and Queue Points
   - the Incenter–Excenter Lemma (now in Triangle Centers & the Euler Line)

   The Perpendicularity Lemma and Linearity of Power of a Point stay where they are, because they are general tools. OK to move these, or change the list?

## Duplicates and style (rule 17)
1. **Method/formula twins** that `tools/find-duplicate-forms.py` finds: the same formula on both cards' thumbnails. They may be deliberate, since a method can quote the formula it uses. Keep them as they are, or move the formula to one card and point from the other?
   - `lte` and `lte-lemma`: $v_p(a^n - b^n) = v_p(a - b) + v_p(n)$
   - `poly-divisible-linear` and `reduce-divisibility-constant`: $n + a \mid P(n) \iff n + a \mid P(-a)$
   - `cycle-hunting` and `periodic-sequences`: $a_{n+T} = a_n \implies \dots$
   - `area-method` and `cevian-area-ratio`: $\frac{[ABD]}{[ACD]} = \frac{BD}{DC}$
2. **39 cards whose description restates a formula from their own thumbnail**, usually while defining its symbols (for example Heron's Formula, the Law of Sines, Stewart's Theorem, Binet's Formula, Expected Value). Rule 17 wants the symbols defined, so restating can be the clearest way to do that. Should they stay, or should each description define the symbols without repeating the formula? (`python3 tools/find-duplicate-forms.py` lists all 39.)

## Answered 2026-10-12 (rule 17 questions 1 to 3)
- Questions 1 and 2: the twins stay, because a card like LTE is both the formula and the method.
- Question 2: the 39 descriptions define their symbols without restating the thumbnail formula, unless they add something; the paragraph may carry more explanation instead.
- Question 3: approved; the subsection goes right after Advanced Triangle Theorems, not at the bottom.

Done 2026-10-12: all 47 descriptions are rewritten, and the subsection is in place.
