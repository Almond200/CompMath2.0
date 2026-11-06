# Topic tree (draft)

**Status: draft v0 (2026-11-06), for the owner to review. Nothing in the app uses it yet.** The plan this serves is "Step T, the topic tree" in `PLAN.md`. Settings → Experimental → Topic tree shows this file.

## Why

Practice a topic currently offers every card name and every card keyword as a topic. The list is long and uneven: "Shoelace formula" sits beside "area", a keyword can match five unrelated cards, and a problem is reachable only through the cards it happens to cite (446 problems cite none). The topic tree replaces that with one fixed classification of contest mathematics, written for problems rather than for cards:

- **Practice sets:** pick any node (a whole subject, an area, or a narrow topic); the set draws from every problem filed under that node or below it.
- **Problem labels:** each problem shows its topics as a breadcrumb (Geometry › Circles › Power of a point), a better label than a list of card names.
- **Contest profiles:** a card's profile can say where its problems fall in the tree, and a topic node can have its own profile (how many problems, which contests, which positions, which cards they use).

## Rules for the tree

1. **Four trees, one per subject:** Algebra, Counting & Probability, Geometry, Number Theory. They match `SUBJECT_LABELS` and the four Reference subjects. Methods and Patterns are not trees: they are ways of solving, and they stay cards.
2. **Depth two or three below the subject.** Subject › Area › Topic, with a fourth level only where an area is large and splits cleanly (triangles, circles, probability). Selecting a node selects everything under it.
3. **A node is a kind of problem, not a formula.** "Power of a point" is a node because contest problems are about it; "Shoelace formula" is not, because it is one tool for "Areas in coordinates". Cards attach to nodes; nodes do not mirror cards.
4. **Every problem has at least one node, usually one or two, at most three.** A problem files under the most specific node that describes it. A problem genuinely about two things (a probability question whose work is geometry) takes a node in each tree.
5. **Size.** A leaf aims for about 25 to 300 problems out of the 4,675. A smaller leaf merges into its parent; a larger one splits. Olympiad-only areas are allowed to be small when the Olympiad books teach them.
6. **Stable ids.** Every node has a dotted id (`geo.circle.power`), never reused once problems are filed under it. The display name can change; the id cannot.
7. **Names are plain and short**, in the app's style ("Counting & Probability", "Mass points"), and never name a contest.
8. **One fact, one home.** The tree lives in one data file (planned: `js/data/topic-tree.js`); this Markdown file is the readable draft until the tree is approved, then it is generated from the data.

## How problems get their nodes (planned)

- **Seed from cards.** Each card gets a home node (most cards map to one leaf). A problem's cards propose nodes; the most-cited proposal wins, capped at three.
- **Fill the rest by reading.** The 446 problems with no card tag, and problems whose cards are all general methods (casework, complementary counting), are filed by reading the statement and strategy, a contest at a time, with `subjects` as the starting point.
- **Check.** A new gate (planned: `tools/check-topic-tree.js`, run by `gates.sh`) fails when a problem has no node, a node id is unknown, a problem has more than three nodes, or a leaf has fewer than 5 problems without being marked small on purpose. Shared AMC 10/12 twins carry the same nodes.
- LIVE's concept tags may suggest a node; they are never copied in as nodes (standing rule).

## The four trees

Node ids are in brackets. Counts are not filled in yet; they come from the seeding pass.

### Algebra `[alg]`

- **Arithmetic and word problems** `[alg.word]`
  - Rates, distance and work `[alg.word.rates]`
  - Ratios, percents and mixtures `[alg.word.ratio]`
  - Averages and statistics (mean, median, mode, range) `[alg.word.stats]`
  - Money, ages and everyday problems `[alg.word.everyday]`
  - Units, time and calendars `[alg.word.units]`
  - Arithmetic computation and estimation `[alg.word.compute]`
- **Equations and expressions** `[alg.eq]`
  - Linear equations and systems `[alg.eq.linear]`
  - Manipulating expressions and identities `[alg.eq.identity]`
  - Factoring and clever factorizations `[alg.eq.factor]`
  - Radicals and nested radicals `[alg.eq.radical]`
  - Absolute value and piecewise equations `[alg.eq.abs]`
  - Nonlinear systems and symmetric systems `[alg.eq.system]`
- **Polynomials** `[alg.poly]`
  - Quadratics: roots, vertex, discriminant `[alg.poly.quad]`
  - Vieta's formulas and symmetric sums `[alg.poly.vieta]`
  - Remainders, factors and the factor theorem `[alg.poly.remainder]`
  - Integer and rational roots `[alg.poly.introot]`
  - Polynomial construction and interpolation `[alg.poly.construct]`
- **Functions** `[alg.fn]`
  - Evaluating, composing and inverting functions `[alg.fn.basic]`
  - Graphs and transformations of graphs `[alg.fn.graph]`
  - Functional equations `[alg.fn.feq]`
  - Floor, ceiling and fractional part `[alg.fn.floor]`
  - Operations and custom definitions `[alg.fn.op]`
- **Exponents and logarithms** `[alg.exp]`
  - Exponent rules and exponential equations `[alg.exp.rules]`
  - Logarithm identities and equations `[alg.exp.log]`
- **Sequences and series** `[alg.seq]`
  - Arithmetic and geometric sequences `[alg.seq.ap]`
  - Recursive sequences and recurrences `[alg.seq.rec]`
  - Telescoping and sums of series `[alg.seq.sum]`
  - Patterns and periodic sequences `[alg.seq.period]`
- **Trigonometry** `[alg.trig]`
  - Trigonometric values and identities `[alg.trig.identity]`
  - Trigonometric equations and products `[alg.trig.eq]`
- **Complex numbers** `[alg.cx]`
  - Arithmetic and polar form `[alg.cx.polar]`
  - Roots of unity `[alg.cx.unity]`
- **Inequalities and optimization** `[alg.ineq]`
  - Solving inequalities `[alg.ineq.solve]`
  - Mean inequalities (AM-GM, QM-AM, Cauchy-Schwarz) `[alg.ineq.means]`
  - Maximizing and minimizing `[alg.ineq.optimize]`
  - Olympiad inequalities (SOS, Schur, smoothing, convexity) `[alg.ineq.olympiad]`
- **Linear algebra** `[alg.linear]` (small on purpose: matrices, determinants)

### Counting & Probability `[cp]`

- **Basic counting** `[cp.basic]`
  - Lists, the multiplication and addition principles `[cp.basic.principle]`
  - Permutations and arrangements `[cp.basic.perm]`
  - Combinations and committees `[cp.basic.comb]`
  - Casework and complementary counting `[cp.basic.case]`
- **Counting techniques** `[cp.tech]`
  - Stars and bars, distributions `[cp.tech.stars]`
  - Inclusion-exclusion `[cp.tech.pie]`
  - Bijections and counting in two ways `[cp.tech.bij]`
  - Recursion and states `[cp.tech.rec]`
  - Counting with symmetry (Burnside, necklaces) `[cp.tech.sym]`
  - Generating functions `[cp.tech.gf]`
- **Arrangements with structure** `[cp.struct]`
  - Paths on grids and lattices `[cp.struct.paths]`
  - Words, digits and strings `[cp.struct.words]`
  - Seating, circular arrangements and derangements `[cp.struct.seat]`
  - Partitions and compositions `[cp.struct.part]`
  - Tilings and colorings `[cp.struct.tile]`
- **Binomial coefficients** `[cp.binom]`
  - Pascal's triangle and identities `[cp.binom.identity]`
  - Binomial theorem and expansions `[cp.binom.thm]`
- **Probability** `[cp.prob]`
  - Equally likely outcomes `[cp.prob.basic]`
  - Dice, coins and cards `[cp.prob.dice]`
  - Conditional probability and independence `[cp.prob.cond]`
  - Geometric probability `[cp.prob.geom]`
  - Random processes, games and Markov chains `[cp.prob.process]`
- **Expected value** `[cp.exp]`
  - Linearity of expectation `[cp.exp.linear]`
  - Expected waiting times and states `[cp.exp.states]`
- **Graphs and combinatorial structures** `[cp.graph]`
  - Graphs, trees and networks `[cp.graph.basic]`
  - Tournaments and round-robins `[cp.graph.tour]`
- **Logic, games and processes** `[cp.logic]`
  - Logic puzzles and truth-tellers `[cp.logic.puzzle]`
  - Games and strategies `[cp.logic.game]`
  - Invariants and monovariants in processes `[cp.logic.invariant]`
  - Pigeonhole and extremal arguments `[cp.logic.pigeon]`

### Geometry `[geo]`

- **Lengths and angles** `[geo.basic]`
  - Angle chasing, parallel lines and polygons' angles `[geo.basic.angle]`
  - Pythagorean theorem and right triangles `[geo.basic.pyth]`
  - Similar and congruent triangles `[geo.basic.sim]`
- **Triangles** `[geo.tri]`
  - Area of a triangle `[geo.tri.area]`
  - Special triangles (30-60-90, 45-45-90, equilateral) `[geo.tri.special]`
  - Cevians, angle bisectors and medians `[geo.tri.cevian]`
  - Area ratios and mass points `[geo.tri.ratio]`
  - Law of sines and law of cosines `[geo.tri.trig]`
  - Inradius, circumradius and exradii `[geo.tri.radii]`
  - Triangle centers and their lines `[geo.tri.centers]`
- **Polygons** `[geo.poly]`
  - Quadrilaterals: rectangles, trapezoids, parallelograms `[geo.poly.quad]`
  - Regular polygons `[geo.poly.regular]`
  - Areas of composite and shaded regions `[geo.poly.composite]`
- **Circles** `[geo.circ]`
  - Arcs, sectors and circumference `[geo.circ.arc]`
  - Inscribed angles and arcs `[geo.circ.inscribed]`
  - Chords, tangents and power of a point `[geo.circ.power]`
  - Tangent circles and circles in polygons `[geo.circ.tangent]`
  - Cyclic and tangential quadrilaterals `[geo.circ.cyclic]`
- **Coordinate geometry** `[geo.coord]`
  - Lines, slopes and distances `[geo.coord.line]`
  - Areas in coordinates and lattice points `[geo.coord.area]`
  - Conics (parabolas, ellipses, hyperbolas) `[geo.coord.conic]`
  - Transformations: reflections, rotations, dilations `[geo.coord.transform]`
  - Complex numbers and vectors in geometry `[geo.coord.vector]`
- **Solid geometry** `[geo.solid]`
  - Prisms, cylinders and boxes `[geo.solid.prism]`
  - Pyramids, cones and spheres `[geo.solid.round]`
  - Polyhedra, nets and cross-sections `[geo.solid.poly]`
  - Coordinates and vectors in space `[geo.solid.coord]`
- **Geometric optimization and combinatorial geometry** `[geo.comb]`
  - Shortest paths, reflections and extremes `[geo.comb.extreme]`
  - Counting figures, grids and dissections `[geo.comb.count]`
- **Olympiad geometry** `[geo.oly]`
  - Synthetic lemmas and configurations `[geo.oly.synthetic]`
  - Projective geometry, inversion and cross-ratio `[geo.oly.proj]`

### Number Theory `[nt]`

- **Divisibility** `[nt.div]`
  - Divisibility rules and divisibility arguments `[nt.div.rules]`
  - GCD, LCM and the Euclidean algorithm `[nt.div.gcd]`
  - Prime factorization `[nt.div.prime]`
- **Divisors** `[nt.divisor]`
  - Counting and summing divisors `[nt.divisor.count]`
  - Euler's totient and multiplicative functions `[nt.divisor.phi]`
- **Modular arithmetic** `[nt.mod]`
  - Remainders and congruence arithmetic `[nt.mod.basic]`
  - Last digits and cycles of powers `[nt.mod.cycle]`
  - Fermat, Euler and the order of an element `[nt.mod.fermat]`
  - Chinese remainder theorem and linear congruences `[nt.mod.crt]`
  - Quadratic residues `[nt.mod.qr]`
- **Primes and factorials** `[nt.prime]`
  - Primes and primality `[nt.prime.basic]`
  - Factorials, valuations and Legendre's formula `[nt.prime.val]`
  - Lifting the exponent `[nt.prime.lte]`
- **Diophantine equations** `[nt.dio]`
  - Linear Diophantine equations and the Frobenius problem `[nt.dio.linear]`
  - Factoring and SFFT `[nt.dio.factor]`
  - Pythagorean triples and sums of squares `[nt.dio.squares]`
  - Bounding and parity arguments `[nt.dio.bound]`
- **Digits and bases** `[nt.digit]`
  - Digits and digit sums `[nt.digit.sum]`
  - Number bases `[nt.digit.base]`
  - Decimals, fractions and repeating decimals `[nt.digit.decimal]`
- **Integer sequences and special numbers** `[nt.seq]`
  - Perfect squares, cubes and powers `[nt.seq.power]`
  - Special numbers (Fibonacci, triangular, palindromes) `[nt.seq.special]`
  - Representations and continued fractions `[nt.seq.repr]`

## Open questions for the owner

- **TQ1, word problems:** "Arithmetic and word problems" sits under Algebra (242 problems cite the Rates, Work & Mixtures cards, mostly AMC 8 and early AMC 10). Keep it there, or make it a fifth tree?
- **TQ2, logic and games:** "Logic, games and processes" sits under Counting & Probability, as AoPS does. Keep it?
- **TQ3, trigonometry and complex numbers:** filed under Algebra, with geometric uses filed in Geometry (`geo.tri.trig`, `geo.coord.vector`). Agreed?
- **TQ4, Olympiad nodes:** keep the small Olympiad-only nodes (`alg.ineq.olympiad`, `geo.oly`, `nt.prime.lte`) so the Olympiad books' problems have homes, or fold them into their parents?
- **TQ5, the picker:** Practice a topic shows the tree (expandable, with search over node names), and card names stay searchable as a second group of suggestions. Or remove card topics once the tree is in?

## Steps (also in `PLAN.md`, Step T)

1. **T1, draft the tree** (this file). In progress: the owner reviews it here.
2. **T2, the data file:** `js/data/topic-tree.js` with ids, names, parents and a home node for every card; generate this page from it.
3. **T3, file the problems:** seed from cards, read the rest, and add the gate.
4. **T4, Practice:** the topic picker uses the tree; a node draws from its whole subtree.
5. **T5, labels:** a problem's page and the practice review show its topic breadcrumbs.
6. **T6, contest profiles:** card profiles show where their problems fall in the tree; each topic node gets a profile of its own.
