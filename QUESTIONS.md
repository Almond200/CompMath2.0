# Questions for the owner

Style and judgment calls found while working through `PLAN.md`. Verified errors are fixed straight away and recorded in the README; only real choices wait here.

A candidate card lists, under "Needed by", the problems whose routes would cite it. A card needs at least two practice problems before it ships (CONVENTIONS §3b); when fewer than two real problems use it, the row says so and the card gets supplementary exercises.

## Open now

**The friend's resource library (2026-10-30): P51 and P52 approved by the owner and written (2026-10-30)**: the $d(n^2)$ count on `sfft` (under How) and the napkin ring in `js/data/did-you-know.js`. Nothing is open; the next candidate is P53. The document is a bibliography of 38 sources, not formulas. The reachable AMC/AIME sources were read and every named result compared with the 765 cards (Tri-Valley's formula sheets, the MO Problem Journal, Olympiad Math 12th, Joshua Im's AIME handouts, Polynomials and Recursion in the AIME, the Berkeley AIME toolkit, Dylan Yu's AIME strategies, CJ Quines's handouts). Almost everything is already a card. Only what AMC and AIME problems actually use is proposed (owner, 2026-10-30): Dirac's theorem, the Prime Number Theorem estimate, Cauchy's root bound, the sign of a permutation, Monsky's theorem and Ramsey's bound were left out as never used (Ramsey was also removed on purpose, 2026-10-23). Any card or edit is written fresh, not copied.

**Step I, the problems that cite no card (2026-10-30): P45 to P50 approved by the owner and written (2026-10-30)** as `factor-out-factorial`, `alternating-sum-grouping`, `placing-digits-extremes`, `only-even-prime`, `scoring-rules` and `break-even-plans`, with every problem listed tagged (and its AMC 12 twin); `break-even-plans` also has one exercise. Written. Every problem that cited no card was read (486, AMC 12 twins of AMC 10 problems counted once) and 54 entries now cite a card where the route uses one. Most of the rest are plain arithmetic, but six ideas came up again and again with no card to hold them. Each row lists the problems that would cite it.

**Owner requests (2026-10-30): P42 to P44 asked for directly and written** as `binary-quadratic-forms` (2011 AIME I #15 and 2022 AIME I #14 cite it), `higher-power-sums` (two exercises; no problem in the set needs it, and 2022 AIME II #10 is left alone at the owner's word, since the hockey stick identity solves it) and `zacks-lemma` (two exercises). Written.

**The tag pass (H, 2026-10-25): P39 to P41 approved by the owner and written (2026-10-25)** as `comparing-coefficients`, `rolling-without-slipping` and `tethered-animal`, with the problems listed tagged (2004 AIME I #14 is left out of P41: it asks for the rope's length on a tower, not a reachable region). P28 to P38 (approved 2026-10-24, written 2026-10-25) are kept below as the record.

| # | Card | Kind, subject / subsection | Proposed tier, importance | Needed by |
|---|---|---|---|---|
| P52 | A Did you know? fact (no card): the napkin ring, whose volume after drilling a cylindrical hole of height $h$ through a sphere is $\frac{\pi h^3}{6}$ whatever the sphere's radius (by Cavalieri's Principle; checked numerically for two radii) | `js/data/did-you-know.js`, "From" link to `cavalieris-principle` | none | CJ Quines, Obscure Geometry Theorems |
| P51 | Edit to Simon's Favorite Factoring Trick (no new card): $\frac1x + \frac1y = \frac1n$ becomes $(x - n)(y - n) = n^2$, so it has $d(n^2)$ ordered solutions in positive integers, and the splitting $\frac1n = \frac1{n+1} + \frac1{n(n+1)}$ | edit to `sfft` | as now | Tri-Valley sheets (Egyptian fractions) |
| P50 | Comparing Price Plans (the Break-Even Point): each coupon or plan is a linear function of the price, two plans cost the same where the lines cross, and one beats another on one side of that point, so "which prices make A best" is an interval between two break-even points | pattern, Algebra > Word-problem setups | AMC, lower | 2014 AMC 10A #11 (and its twin), 2010 AMC 10B #11; only two problems, so one supplementary exercise as well |
| P49 | Scoring Rules with Right, Wrong and Blank Answers: with $c$ right, $w$ wrong and $b$ blank, the score is one linear equation and $c+w+b$ is bounded by the number of questions, so divisibility or parity of the equation and that bound pick out the possible counts (and show which scores cannot occur) | pattern, Algebra > Word-problem setups | AMC, lower | 2010 AMC 10B #15, 2007 AMC 10B #6, 2004 AMC 12A #2, 2002 AMC 8 #17, 2001 AMC 8 #22, 1987 AJHSME #24 |
| P48 | The Only Even Prime: $2$ is the only even prime, so an odd sum of two primes must use $2$, and a product that is always even (two consecutive integers) can be prime only when it equals $2$ | formula, Number Theory > Primes, Factorials & Valuations | AMC, lower | 2014 AMC 8 #4, 2011 AMC 8 #24, 1989 AJHSME #16, 2006 AMC 8 #25, 2002 AMC 10B #6 |
| P47 | Placing Digits and Signs to Make an Expression Largest: put the largest digits in the most valuable places (for a sum of two numbers, pair the digits place by place); for a product or a quotient settle the sign first, then make the sizes large; for a fraction, largest over smallest | method, Algebra > Word-problem setups (or Number Theory > Digits) | AMC, lower | 2012 AMC 8 #16, 2018 AMC 8 #14, 2006 AMC 8 #22, 1990 AJHSME #1, 1989 AJHSME #14, 2006 AMC 10A #4, 2013 AMC 10B #5, 2004 AMC 10A #15, 2004 AMC 10B #5, 1996 AJHSME #6, 1991 AJHSME #8, 1990 AJHSME #7, 1987 AJHSME #6, 1986 AJHSME #3, 1986 AJHSME #14 |
| P46 | Grouping the Terms of an Alternating Sum: pair neighbours ($1-2$, $3-4$, ...) or group them in fours ($1-2-3+4$) so each group has the same value, count the groups, and add any term left over (`fx-pairing` is for $f(x)+f(1-x)$, not this) | method, Algebra > Sequences & Series | AMC, medium | 2006 AMC 10B #1, 2003 AMC 10A #1, 2018 AMC 8 #5, 2016 AMC 8 #8, 2013 AMC 8 #3, 1996 AJHSME #16, 1993 AJHSME #19, 1992 AJHSME #1, 1990 AJHSME #16, 1989 AJHSME #1 |
| P45 | Factoring Out the Smallest Factorial: $(n+k)! = n!\,(n+1)(n+2)\cdots(n+k)$, so a sum or quotient of nearby factorials collapses once the smallest is pulled out ($\tfrac{11!-10!}{9!} = 100$); a product of neighbouring factorials is $(n!)^2(n+1)$, a square exactly when $n+1$ is; and the odd product $1\cdot3\cdots(2n-1) = \tfrac{(2n)!}{2^n\,n!}$ | formula, Number Theory > Primes, Factorials & Valuations | AMC, medium | 2019 AMC 10B #6, 2016 AMC 10A #1, 2014 AMC 10A #8, 2004 AMC 10B #6, 2020 AMC 12B #6, 2001 AMC 12 #5, 2020 AMC 8 #12 |
| P44 | Zack's Lemma (Moving Points): three points of degrees $a$, $b$, $c$ in a parameter are collinear for every value or for at most $a+b+c$ of them, so $a+b+c+1$ checked positions prove a collinearity | formula, Geometry > Transformations in the Coordinate Plane | Olympiad, low | owner's request; olympiad only, so two exercises |
| P43 | Sums of Fourth and Higher Powers: $\sum k^4$ and $\sum k^5$ in closed form, and how to rebuild any power sum by telescoping or the binomial basis with the hockey stick identity | formula, Algebra > Sequences & Series (kept apart from Sums of Powers of Integers, as asked) | AIME Late, lower | owner's request; two exercises |
| P42 | Binary Quadratic Forms: $4af = (2ax+by)^2 - Dy^2$, the bounded search when $D \lt 0$, and which numbers $x^2+xy+y^2$, $x^2+3y^2$ and $x^2+2y^2$ take | formula, Number Theory > Diophantine & Additive | AIME Late, low | 2011 AIME I #15, 2022 AIME I #14 |
| P41 | An Animal Tethered to a Building: the reachable region is a large sector plus smaller sectors around each corner the rope wraps, each radius shorter by the wall just passed, until the pieces meet behind the building | pattern, Geometry > Areas | AMC, lower | 2006 AMC 10A #12, 2002 AMC 10A #19, 2004 AIME I #14 (the rope wraps a cylinder) |
| P40 | Rolling Without Slipping: the length rolled equals the arc turned, so a disk of radius $r$ taken once around a circle of radius $R$ turns $\tfrac{R+r}r$ times outside and $\tfrac{R-r}r$ inside (count turns along the center's path, not the contact arc: the coin-rotation trap); a rolling polygon pivots on each vertex in turn | pattern, Geometry > Circles | AMC, low | 2015 AMC 10A #14, 2009 AMC 10A #19, 2009 AMC 10B #13 (a rolling pentagon), 2014 AIME I #10, 2008 AIME I #5 (a rolling cone), 2007 AIME II #11, 1988 AJHSME #24 |
| P39 | Comparing Coefficients: an equation that holds for every value of a variable (or of a parameter) holds coefficient by coefficient, so unknown constants come from matching coefficients, and the point that every curve of a family passes through comes from setting each parameter's coefficient to zero | method, Algebra > Polynomials | AMC, medium | 2019 AMC 10B #4 (every line $ax+(a+d)y=a+2d$ passes through one point), 2017 AMC 10A #24 / 12A #23, 2018 AMC 10A #25, 2010 AMC 12A #21, 2002 AMC 10B #13, 1984 AIME #15, 2013 AIME I #10, 2025 AIME II #15 |
| P38 | Common Multiples Are Multiples of the LCM: a number divisible by each of $a,b,c$ is exactly a multiple of $\operatorname{lcm}(a,b,c)$, so "together again", "divisible by all of" and "$r$ more than a multiple of each" become one divisibility | formula, Number Theory > Divisibility | AMC, medium | 2001 AMC 10 #8, 2003 AMC 8 #19, 2004 AMC 8 #19, 2012 AMC 8 #15, 2017 AMC 8 #12, 2018 AMC 8 #21, 1989 AJHSME #22, 2011 AMC 12B #5, 2019 AMC 10B #7 / 12B #5, 2015 AIME II #1 (all cite `gcd-lcm-product`, whose fact is $\gcd\cdot\operatorname{lcm}=ab$, meanwhile) |
| P37 | Extend Adding Groups of Equations to multiplying them: when the equations are products ($xy$, $yz$, $zx$ given), multiply them all to get $(xyz)^2$ and divide back | edit to the method `add-all-equations` (no new card) | AMC, medium (as now) | 2001 AMC 10 #10, 2018 AMC 10B #4, 2000 AMC 12 #20 (2002 AMC 12B #19 already cites the card) |
| P36 | Assuming All Are of One Kind: suppose every item is the cheaper or smaller kind, then each swap to the other kind adds a fixed amount (chickens and rabbits, bicycles and tricycles) | method, Algebra > Word-problem setups | AMC, lower | 2003 AMC 8 #4, 2012 AMC 8 #9 |
| P35 | Joining Shapes Hides Edges: each place two pieces meet removes the shared length from the perimeter (or twice the shared face from a surface), and a rectilinear outline's horizontal edges add up to its width | method, Geometry > Areas and perimeters | AMC, low | 1986 AJHSME #13, 1990 AJHSME #15, 1992 AJHSME #22, 2006 AMC 8 #6, 2002 AMC 8 #22, 2009 AMC 8 #9 |
| P34 | Symmetries of a Figure: lines of symmetry and rotational symmetry of polygons and grid figures (a regular $n$-gon has $n$ of each), and using a symmetry to pair up cells | formula, Geometry > Polygons | AMC, low | 2001 AMC 10 #5, 2010 AMC 8 #6, 2015 AMC 12B #7, 2019 AMC 8 #6, 2020 AMC 12A #6, 1989 AJHSME #11, 2005 AMC 8 #3 |
| P33 | Views of a Stack of Cubes: front, side and top views of a stack map (each column shows its tallest stack), and the fewest or most cubes that match given views | method, Geometry > Solids | AMC, lower | 1999 AMC 8 #20, 2003 AMC 8 #15, 2009 AMC 8 #25 |
| P32 | Rounding Up to Whole Items: when only whole recipes, cans, discs or buses can be used, the number needed is the quotient rounded up, $\lceil\tfrac{\text{need}}{\text{size}}\rceil$ | method, Algebra > Word-problem setups | AMC, lower | 1999 AMC 8 #17 and #19, 1991 AJHSME #17, 2009 AMC 10A #1, 2011 AMC 10A #2, 2010 AMC 10A #4, 2013 AMC 8 #1 |
| P31 | Area by Adding and Subtracting Pieces: find an awkward region as a simple shape minus the pieces cut from it (corners, notches, overlaps), or as a sum of simple pieces | method, Geometry > Areas | AMC, medium | 1985 AJHSME #4, 1986 AJHSME #23, 1992 AJHSME #24, 1993 AJHSME #17, 2005 AMC 8 #13, 2012 AMC 8 #6, 2024 AMC 8 #3, 2004 AMC 10A #9, 2010 AMC 12B #2 |
| P30 | Counting by What Each Step Removes: in a single-elimination tournament every game eliminates one player, so there are $n-1$ games; the same count works for any process that removes a fixed number per step | method, Counting > Counting methods | AMC, lower | 2003 AMC 10B #15, 2004 AMC 8 #5, 2016 AMC 8 #18 |
| P29 | Folding a Net into a Cube: which squares of a net become opposite faces (two squares separated by one square in a straight row are opposite), which nets fold to a cube or a topless box, and what meets at a corner | method, Geometry > Solids | AMC, medium | 1985 AJHSME #11, 1986 AJHSME #21, 1989 AJHSME #20, 1992 AJHSME #20, 1999 AMC 8 #8, 2000 AMC 8 #8, 2003 AMC 10A #10, 2008 AMC 12A #11, 2019 AMC 8 #12, 2023 AMC 8 #17 (an octahedron) |
| P28 | Most Edges in a Disconnected Graph: a graph on $n$ vertices with more than $\binom{n-1}2$ edges is connected, since a disconnected one misses every edge across some split and the fewest missed is $n-1$, isolating one vertex; for a bipartite graph with parts $a\ge b$ the bound is $(a-1)b$, so the $((a-1)b+1)$th edge always connects | formula, Combinatorics > Graph Theory | AMC, lower | 2021 Fall AMC 12A #16 (keeps `formulas: []` meanwhile) |
| P27 | Area of a Neighborhood (Steiner's Formula): the points within distance $r$ of a convex region of area $A$ and perimeter $P$ cover $A+Pr+\pi r^2$, since the band over each side or arc adds length times $r$ and the corner sectors add up to one full disk | formula, Geometry > Areas | AIME, lower | 2004 AMC 12A #24 (cites Circle Area, Circumference, Arcs & Sectors meanwhile) |

## Answered (kept as the record, newest first)

## Candidate new cards (2026-10-23; all approved and written)
**Status.** All eleven approved by the owner on 2026-10-23 and written as proposed: `composing-transformations`, `matrix-power-diagonalizing`, `dimension-arguments`, `trig-series-complex`, `independent-events` (with a paragraph on independence as constructive counting divided by the total, as the owner asked), `estimating-answers`, `palindromes`, `counting-shapes`, `fencepost-counting`, `reading-graphs`, `derivative-extremum`. The Determinants method group is renamed Matrices & Determinants. The same day the owner removed Ramsey Number $R(3,3)=6$; its address opens the Pigeonhole Principle.

**Linear algebra and complex numbers (you asked for proposals).** The library already has the facts: Matrix Multiplication & Powers, Eigenvalues & the Characteristic Polynomial, Cayley–Hamilton, Rotation & Reflection Matrices, Composing Two Reflections, the Transfer Matrix Method, Complex Number Bashing, Writing in Polar Form, Conjugating Both Sides, and the roots-of-unity cards. What is missing is a few of the moves:

| # | Card | Kind, where | Tier, importance | Evidence |
|---|---|---|---|---|
| P16 | Composing Transformations as Matrix Products: write each rotation and reflection about the origin as a $2\times2$ matrix, multiply in order (the last move on the left), and read the result as one rotation or reflection; a move about another center becomes "translate, act, translate back" | method, Methods > Geometry > Transformations & Inversion | AMC, low | 2020 AMC 10A #23 / 12A #20, 2020 AMC 10B #23, 2021 Spring AMC 10B #9 / 12B #5 (they cite the two formula cards meanwhile) |
| P17 | Taking a Matrix Power by Diagonalizing: for $v_n = v_0M^n$ (a Markov chain, a linear recurrence as $\begin{pmatrix}1&1\\1&0\end{pmatrix}^n$, a repeated linear map), write $M = PDP^{-1}$ so $M^n = PD^nP^{-1}$, or use Cayley–Hamilton to reduce the power | method, Methods > Algebra > Determinants (renamed "Matrices & Determinants") | AIME Late, lower | the cube walk on First-Step Analysis (closed form now in its write-up), Fibonacci identities; no AMC or AIME problem needs it outright |
| P18 | Dimension Arguments (the linear algebra method): turn objects into vectors over $\mathbb F_2$ or $\mathbb R$ and bound their number by the dimension, as in the Oddtown theorem (at most $n$ odd clubs with even pairwise intersections) and Fisher's inequality | method, Methods > Counting > Existence Arguments | Olympiad, lower | olympiad combinatorics only |
| P19 | Summing a Trigonometric Series with $e^{i\theta}$: write $\cos k\theta = \operatorname{Re} e^{ik\theta}$, sum the geometric series, and take the real part; it also gives $\sum \binom nk\cos k\theta$ and products of cosines | method, Methods > Algebra > Changing the Representation | AIME Early, low | 1997 AIME #11 (cites the AP sum of sines and cosines meanwhile), 2004 AMC 12A #21; overlaps that card, so a no is reasonable |

Considered and not proposed: equilateral triangles by multiplying by $e^{i\pi/3}$ (already the heart of Complex Number Bashing), counting walks with $A^n$ (the Transfer Matrix Method holds it), Cramer's rule (Solving a Linear System by Elimination covers the contest use).

**Concepts LIVE tags that no card holds.** LIVE's 11,229 concept tags (258 distinct, all 211 papers now cached in `tools/live-cache/`) were matched against every card's name and keywords, then checked by hand. Everything else is covered (percentages by Percent Change, modular powers by Euler's Theorem and Last Digits, multisets by Multiset Permutations, pattern recognition by Hunting for a Cycle, bounding by the bounding methods). These are the gaps:

| # | Card | Kind, where | Tier, importance | LIVE count, examples |
|---|---|---|---|---|
| P20 | Independent Events: $P(A \cap B) = P(A)P(B)$, what independence means, and the trap of multiplying dependent events | formula, Counting > Probability | AMC, medium | 23; 2014 AIME I #2, 2024 AMC 12B #25 (now stated only inside write-ups) |
| P21 | Estimating to Choose an Answer: round, bound above and below, or compare with a benchmark, so only one choice survives | method, Methods > Algebra > Graphs, Estimates & Rates | AMC, medium | 61; 2008 AMC 12B #6, 2024 AMC 12B #3, many AMC 8 |
| P22 | Palindromes: a palindrome is fixed by its first half, so there are $9\cdot10^{k-1}$ with $2k-1$ or $2k$ digits, and every even-length palindrome is a multiple of $11$ | pattern, Patterns > Number Theory > Digit Puzzles | AMC, low | 17; 2010 AMC 12A #6, 2010 AMC 10B #21 |
| P23 | Counting the Shapes in a Figure: count by size, or by a distinguished corner or apex, so each shape is counted once | pattern, Patterns > Counting > Logic & Probability Setups | AMC, low | 15; 2016 AMC 10B #14, 1988 AJHSME #4 (Rectangles in a Grid covers only grids) |
| P24 | Fencepost Counting: $n$ posts make $n-1$ gaps on a line and $n$ around a loop; the count from $a$ to $b$ inclusive is $b-a+1$ | formula, Counting > Basic Counting | AMC, low | 4; 2016 AMC 10B #11, 2016 AMC 12B #9, 2001 AMC 8 #6 |
| P25 | Reading Graphs and Tables: read the scale and the units first, then turn the picture into numbers | pattern, Patterns > Algebra > Word-Problem Setups | AMC, lower | 48, almost all AMC 8 and AJHSME |
| P26 | Using a Derivative to Find an Extremum: set $f'(x)=0$ and compare with the ends, as a check or a shortcut where an algebraic route is long | method, Methods > Algebra > Inequalities & Optimization | AIME Late, lower | 7; 2008 AMC 12B #13, 2023 AIME II #14, 2025 AIME II #9 |

Not proposed: the distributive property (10 tags; too basic for a card) and rotational symmetry (1 tag; Burnside's Lemma covers it).

## Prose formula boxes (2.4e-ii, 2026-10-18; all approved and applied)
**Status.** B1 to B12 approved on 2026-10-18 and applied as proposed, each definition written beside its formula in the box; B11 is written without a sigma, so it needs no expanded twin.

`node tools/prose-boxes.js 0.6` lists the 127 cards whose formula box is mostly words (share of characters inside `\text{}`). Most are methods and patterns, whose box is a schematic of the move, or theorems whose statement is a sentence (Desargues, Sylvester–Gallai, Napoleon); those stay as they are. These are the ones where symbols would say the same thing more shortly. Answer per row: yes, no, or a different wording. Nothing changes until you answer.

| # | Card | Box now | Proposed box |
|---|---|---|---|
| B1 | Pairing Elements to Bound a Set | at most one from each pair | $\lvert S \cap P_i\rvert \le 1 \text{ for every pair } P_i \implies \lvert S\rvert \le \#\text{pairs}$ |
| B2 | Points in Convex Position | any 5 points in general position contain 4 in convex position | $\mathrm{ES}(4) = 5,\ \ \mathrm{ES}(5) = 9,\ \ \mathrm{ES}(n) \le \binom{2n-4}{n-2} + 1$ (the description already defines $\mathrm{ES}(n)$) |
| B3 | Miquel Point of a Complete Quadrilateral | the 4 circumcircles of a complete quadrilateral meet at one point $M$ | $\odot(\triangle_1) \cap \odot(\triangle_2) \cap \odot(\triangle_3) \cap \odot(\triangle_4) = \{M\}$, with $\triangle_i$ the triangle of the three lines other than $\ell_i$ |
| B4 | Gergonne & Nagel Points | cevians to the incircle (or excircle) touch points concur | $\frac{s-b}{s-c}\cdot\frac{s-c}{s-a}\cdot\frac{s-a}{s-b} = 1$ (Ceva for the incircle touch points: Gergonne point), and the reciprocal ratios for the excircle touch points (Nagel point) |
| B5 | Van Aubel's Theorem | squares on the sides ⟹ opposite-center segments equal and ⊥ | $O_1O_3 = O_2O_4,\ \ O_1O_3 \perp O_2O_4$, with $O_1, \ldots, O_4$ the centers of the squares on the sides in order |
| B6 | Dilworth's Theorem | min chains covering a poset = size of the largest antichain | $\min \#\{\text{chains covering } P\} = \max\,\lvert\text{antichain}\rvert$ |
| B7 | Cavalieri's Principle | equal cross-sections at every height ⟹ equal volumes | $A_1(h) = A_2(h) \text{ for every } h \implies V_1 = V_2$ |
| B8 | Newton–Gauss Line | complete quadrilateral ⟹ its 3 diagonal midpoints are collinear | $M_{AC},\ M_{BD},\ M_{EF} \text{ collinear}$, with $E$, $F$ the two extra vertices and $M_{XY}$ the midpoint of $XY$ |
| B9 | Minkowski's Lattice Point Theorem | symmetric convex, area > 4 ⟹ a nonzero lattice point inside | $K = -K \text{ convex},\ [K] \gt 4 \implies K \cap \mathbb{Z}^2 \ne \{0\}$ |
| B10 | Kőnig's Theorem | bipartite: max matching = min vertex cover | $G \text{ bipartite} \implies \nu(G) = \tau(G)$, with $\nu$ the largest matching and $\tau$ the smallest vertex cover |
| B11 | Erdős–Ginzburg–Ziv Theorem | any $2n-1$ integers contain $n$ with sum divisible by $n$ | $a_1, \ldots, a_{2n-1} \in \mathbb{Z} \implies n \mid \sum_{i \in I} a_i \text{ for some } \lvert I\rvert = n$ |
| B12 | Zsigmondy's Theorem | $a^n - b^n$ has a primitive prime divisor (with rare small exceptions) | $\exists\, p \mid a^n - b^n \text{ with } p \nmid a^k - b^k \ (k \lt n)$, except $2^6 - 1^6$ and $n = 2$ with $a + b$ a power of $2$ |

Kept as they are (a sentence is the statement, or the box is a schematic of a move): Sylvester–Gallai, Napoleon, Desargues, Brianchon, Pascal, Simson, Morley, Eulerian paths, Helly, the orthocentric system, and the method and pattern schematics (Trig Bashing, Unfolding, Organized Listing, Bijections, the Extremal Principle and the rest).

## Card-file re-check findings (step C, 2026-10-18; all approved)
**Status.** Approved on 2026-10-18. C1: Pitot's Theorem is now tier AIME Early. C3: the six cards are kept as they are, the first of the two options. C2: the cards stay high, to be revisited once step D has real counts.

Fixed already: `cone-formulas` no longer restates the cone volume, whose home is `prism-pyramid-volumes`. Three calls are yours:

| # | Card | Finding | Proposal |
|---|---|---|---|
| C1 | Pitot's Theorem | tier AMC, but its level is AIME only and its one tagged problem is an AIME | tier AIME Early (or add AMC 12 to its level if you see it as AMC material) |
| C3 | Tier AMC, level without AMC | Radical Axis, Descartes' Circle Theorem, Isosceles Tetrahedron, Product-to-Sum, Partitions, Roots of Unity Filter carry tier AMC but list only AIME (and Olympiad) as their level, which is what places them in the AIME study routes; each has AMC 10 or AMC 12 problems tagged | either keep them as they are (AMC-tier facts studied on the AIME route), or add AMC 10/12 to their level, which moves them into the AMC routes |
| C2 | High importance with no tagged problem yet | Stretching One Axis Scales Area, Determinant of a Small Matrix, Area Ratio from Base Ratios, and the proof methods Direct Proof, Proof by Contradiction, Proving the Contrapositive, Proof by Cases | keep high for now and revisit after step D tags the untagged problems, when real counts exist |

## Candidate new cards from the write-ups (step D, 2026-10-18; all approved and written)
**Status.** P14 and P15 approved on 2026-10-18 and written as the formula `parking-functions` (Counting > Advanced Counting, AIME Early, lower) and the method `sign-chart` (Methods > Algebra > Inequalities & Optimization, AMC, medium). 2022 AMC 10A #24 / 12A #24 and 2020 AMC 10A #17 now cite them. A new candidate goes into a new table under "Open now" as P16.

Each is a fact a written-up problem needed and no card holds. The problem cites the nearest card meanwhile. Answer per row: yes, no, or a different rating. A new candidate goes at the top of this table as the next P-number.

| # | Card | Kind, subject / subsection | Proposed tier, importance | Needed by |
|---|---|---|---|---|
| P15 | Sign Chart for a Polynomial Inequality: a product of linear factors changes sign only at its roots, so mark the roots on a line and read each interval's sign from the number of negative factors (a double root does not flip the sign) | method, algebra / inequalities | AMC, medium | 2020 AMC 10A #17 (it cites Casework meanwhile) |
| P14 | Parking Functions: a sequence $a_1,\dots,a_n$ with values in $\{0,\dots,n-1\}$ whose sorted form has $a_{(i)}\le i-1$; there are $(n+1)^{n-1}$ of them, by Pollak's circle of $n+1$ spots (exactly one rotation of each preference string leaves the extra spot empty) | formula, counting / special counting sequences | AIME Early, lower | 2022 AMC 10A #24 / 12A #24 (it cites Constructive Counting meanwhile) |

## Candidate new cards from the practice pass (2.7a, 2026-10-17; all approved and written)
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

## New Geometry subsection: Olympiad Triangle Lemmas (2.4g; approved and done 2026-10-12)
3. The proposed members, to be moved there (ids unchanged):
   - Iran Lemma
   - Carnot's Perpendicularity Theorem
   - Steiner's Ratio Theorem for Isogonal Cevians
   - Isogonal Line Lemma
   - Humpty and Queue Points
   - the Incenter–Excenter Lemma (now in Triangle Centers & the Euler Line)

   The Perpendicularity Lemma and Linearity of Power of a Point stay where they are, because they are general tools. OK to move these, or change the list?

## Duplicates and style (rule 17; answered 2026-10-12, see below: the twins stay, and descriptions define their symbols without restating the thumbnail)
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
