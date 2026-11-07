# Topic tree (draft)

**Status (2026-11-07): the tree is approved and in use, 501 nodes (TQ6 added `cp.basic.perm.cycle`, TQ7 `cp.basic.comb.pairs`, TQ8 `alg.word.rates.motion.speeds`, TQ9 `cp.logic.puzzle.statements`). T1 and T2 are done (the data files and the gate, CONVENTIONS §15). T3, the tagging pass, is under way: 730 of the 4,725 problems carry `tree` fields (the 2026 AMC 10A and 12A, 2026 AIME I and II, 2025 AMC 10A, 12A, 10B and 12B, 2025 AIME I and II, 2024 AMC 10A, 12A, 10B and 12B and AIME I and II, 2023 AMC 10A, 12A, 10B and 12B, 2023 AIME I and II, 2022 AMC 10A, 12A, 10B and 12B, 2022 AIME I and II, 2021 Fall AMC 10A, 12A, 10B and 12B, and 2021 AIME I and II). The app does not read the filings yet (T4). no candidate is open and the next is TQ10 (`QUESTIONS.md`). The test filings below are the record of the tests of 2026-11-06; the problems' own `tree` fields are the filings now.** The plan this serves is "Step T, the topic tree" in `PLAN.md`. Settings → Experimental → Topic tree shows this file, as an outline or as a drawn tree for one subject at a time.

## Why

Practice a topic currently offers every card name and every card keyword as a topic. The list is long and uneven: "Shoelace formula" sits beside "area", a keyword can match five unrelated cards, and a problem is reachable only through the cards it happens to cite (446 problems cited none when this was written; 449 do on 2026-11-07). The topic tree replaces that with one fixed classification of contest mathematics, written for problems rather than for cards:

- **Practice sets:** pick any node (a whole subject, an area, or a narrow topic); the set draws from every problem filed under that node or below it.
- **Problem labels:** each problem shows its topics as a breadcrumb (Geometry › Circles › Power of a point), a better label than a list of card names.
- **Contest profiles:** a card's profile can say where its problems fall in the tree, and a topic node can have its own profile (how many problems, which contests, which positions, which cards they use).

## Rules for the tree

1. **Four trees, one per subject:** Algebra, Counting & Probability, Geometry, Number Theory. They match `SUBJECT_LABELS` and the four Reference subjects. Methods and Patterns are not trees: they are ways of solving, and they stay cards.
2. **Four levels, sometimes five.** Subject › Area › Topic › Subtopic (owner, 2026-11-06: topics need subtopics, since a topic often holds several kinds of problem). A topic splits into subtopics when its problems fall into recurring kinds, and a subtopic splits once more only on the same condition. A topic whose problems do not split that way stays a leaf. Selecting a node selects everything under it.
3. **A node is an archetype: a kind of problem that recurs** (owner, 2026-11-06). It is never made for one problem, and a node is added only when several problems across contests fit it; as a guide, about five or more in the database. A thin node merges into its nearest neighbour, and a one-off problem files under the broader node it belongs to.
3a. **A node is a kind of problem, not a formula.** "Power of a point" is a node because contest problems are about it; "Shoelace formula" is not, because it is one tool for "Areas in coordinates". Cards attach to nodes; nodes do not mirror cards.
4. **Every problem has at least one node, usually one or two, at most three.** A problem files under the most specific node that describes it. A problem genuinely about two things (a probability question whose work is geometry) takes a node in each tree.
5. **Size.** A topic aims for about 25 to 300 problems out of the 4,725; a subtopic for at least about 5. A subtopic that stays smaller after filing merges into its topic, and a problem that fits no subtopic files under the topic itself. There are no separate Olympiad nodes: Olympiad problems file under the same topics as everyone else's (owner, TQ4).
6. **Stable ids.** Every node has a dotted id (`geo.circle.power`), never reused once problems are filed under it. The display name can change; the id cannot.
7. **Names are plain and short**, in the app's style ("Counting & Probability", "Mass points"), and never name a contest.
8. **One fact, one home.** The tree lives in one data file (planned: `js/data/topic-tree.js`); this Markdown file is the readable draft until the tree is approved, then it is generated from the data.

## How problems get their nodes

The data exists (T2, 2026-11-07): `js/data/topic-tree.js` is generated from this file by `tools/build-topic-tree.py`, every card's home is in `js/data/topic-homes.js`, and `tools/check-topic-tree.js` is the gate (CONVENTIONS §15). The filing itself is the tagging pass, T3, whose procedure is in `PLAN.md`.

- **Seed from cards.** Each card gets a home node (most cards map to one leaf). A problem's cards propose nodes; the most-cited proposal wins, capped at three.
- **Fill the rest by reading.** The problems with no card tag (446 when this was written, 449 on 2026-11-07), and problems whose cards are all general methods (casework, complementary counting), are filed by reading the statement and strategy, a contest at a time, with `subjects` as the starting point.
- **Check.** A new gate (planned: `tools/check-topic-tree.js`, run by `gates.sh`) fails when a problem has no node, a node id is unknown, a problem has more than three nodes, or a leaf has fewer than 5 problems without being marked small on purpose. Shared AMC 10/12 twins carry the same nodes.
- LIVE's concept tags may suggest a node; they are never copied in as nodes (standing rule).

## The four trees

Node ids are in brackets. Each tree runs Subject › Area › Topic › Subtopic, with a fifth level where a subtopic still splits. Counts are not filled in yet; they come from the seeding pass.

### Algebra `[alg]`

- **Arithmetic and word problems** `[alg.word]`
  - Rates, distance and work `[alg.word.rates]`
    - Distance, speed and time `[alg.word.rates.motion]`
      - Meeting, overtaking, passing and head starts `[alg.word.rates.motion.meet]`
      - Round trips, laps and circular tracks `[alg.word.rates.motion.laps]`
      - One trip at two speeds (a change of speed changes the time; arriving early or late) `[alg.word.rates.motion.speeds]`
    - Average speed over a whole trip `[alg.word.rates.avg]`
    - Combined work and filling rates `[alg.word.rates.work]`
    - Currents, wind and moving walkways `[alg.word.rates.current]`
    - Clocks and the hands of a clock `[alg.word.rates.clock]`
  - Ratios, percents and mixtures `[alg.word.ratio]`
    - Ratios and proportions `[alg.word.ratio.prop]`
    - Percent change, discounts and interest `[alg.word.ratio.percent]`
    - Mixtures and concentrations `[alg.word.ratio.mix]`
    - Direct and inverse variation `[alg.word.ratio.vary]`
  - Averages and statistics `[alg.word.stats]`
    - Mean and changing a mean `[alg.word.stats.mean]`
    - Median, mode and range `[alg.word.stats.median]`
    - Weighted averages `[alg.word.stats.weighted]`
    - Reading graphs, tables and charts `[alg.word.stats.data]`
  - Money, ages and everyday problems `[alg.word.everyday]`
    - Ages `[alg.word.everyday.age]`
    - Money, prices and coins `[alg.word.everyday.money]`
    - Sharing, splitting and fair division `[alg.word.everyday.share]`
  - Units, time and calendars `[alg.word.units]`
    - Unit conversion and dimensional analysis `[alg.word.units.convert]`
    - Days of the week, calendars and time zones `[alg.word.units.calendar]`
  - Arithmetic computation and estimation `[alg.word.compute]`
    - Order of operations and fraction arithmetic `[alg.word.compute.fraction]`
    - Clever computation and grouping `[alg.word.compute.clever]`
    - Estimation and comparing sizes `[alg.word.compute.estimate]`
    - Rounding and the range of a rounded value `[alg.word.compute.round]`
- **Equations and expressions** `[alg.eq]`
  - Linear equations and systems `[alg.eq.linear]`
    - One linear equation; setting up equations from words `[alg.eq.linear.one]`
    - Two and three linear equations `[alg.eq.linear.system]`
    - Systems with a parameter: no or infinitely many solutions `[alg.eq.linear.param]`
  - Manipulating expressions and identities `[alg.eq.identity]`
    - Simplifying and evaluating expressions `[alg.eq.identity.simplify]`
    - Symmetric expressions: $x+y$, $xy$ and $x^n+y^n$ `[alg.eq.identity.symmetric]`
    - Reciprocal expressions: $x+1/x$ `[alg.eq.identity.recip]`
    - Proving and finding identities `[alg.eq.identity.prove]`
  - Factoring and clever factorizations `[alg.eq.factor]`
    - Difference of squares and cubes `[alg.eq.factor.squares]`
    - Grouping and SFFT `[alg.eq.factor.sfft]`
    - Sophie Germain and other special factorizations `[alg.eq.factor.special]`
    - Substitution to reveal a factorization `[alg.eq.factor.sub]`
  - Radicals and nested radicals `[alg.eq.radical]`
    - Simplifying and rationalizing radicals `[alg.eq.radical.simplify]`
    - Denesting $\sqrt{a+\sqrt b}$ `[alg.eq.radical.denest]`
    - Equations with radicals `[alg.eq.radical.eq]`
    - Infinite radicals and continued expressions `[alg.eq.radical.infinite]`
  - Absolute value and piecewise equations `[alg.eq.abs]`
    - Equations and inequalities with absolute values `[alg.eq.abs.eq]`
    - Graphs and regions bounded by absolute values `[alg.eq.abs.graph]`
  - Nonlinear systems and symmetric systems `[alg.eq.system]`
    - Systems solved by adding, subtracting or multiplying `[alg.eq.system.combine]`
    - Symmetric and cyclic systems `[alg.eq.system.cyclic]`
    - Substitution and elimination in nonlinear systems `[alg.eq.system.sub]`
  - Matrices and determinants `[alg.eq.matrix]`
- **Polynomials** `[alg.poly]`
  - Quadratics `[alg.poly.quad]`
    - Roots and the quadratic formula `[alg.poly.quad.roots]`
    - Vertex form and completing the square `[alg.poly.quad.vertex]`
    - The discriminant and conditions on roots `[alg.poly.quad.disc]`
  - Vieta's formulas and symmetric sums `[alg.poly.vieta]`
    - Sums and products of roots `[alg.poly.vieta.basic]`
    - Power sums and Newton's sums `[alg.poly.vieta.newton]`
    - Polynomials whose roots are changed (shifted, squared, reciprocal) `[alg.poly.vieta.transform]`
  - Remainders, factors and the factor theorem `[alg.poly.remainder]`
    - Remainder theorem and division `[alg.poly.remainder.thm]`
    - Factor theorem and repeated roots `[alg.poly.remainder.factor]`
    - Values of a polynomial at many points `[alg.poly.remainder.values]`
  - Integer and rational roots `[alg.poly.introot]`
    - Rational root theorem `[alg.poly.introot.rational]`
    - Integer coefficients: $a-b \mid P(a)-P(b)$ `[alg.poly.introot.divides]`
  - Polynomial construction and interpolation `[alg.poly.construct]`
    - Finite differences and interpolation `[alg.poly.construct.interp]`
    - Polynomials with given properties `[alg.poly.construct.given]`
    - Coefficients and sums of coefficients `[alg.poly.construct.coeff]`
  - Higher-degree equations `[alg.poly.higher]`
    - Cubics and quartics `[alg.poly.higher.cubic]`
    - Symmetric and palindromic polynomials `[alg.poly.higher.palin]`
- **Functions** `[alg.fn]`
  - Evaluating, composing and inverting functions `[alg.fn.basic]`
    - Evaluating and composing `[alg.fn.basic.compose]`
    - Inverse functions `[alg.fn.basic.inverse]`
    - Iterating a function `[alg.fn.basic.iterate]`
  - Graphs and transformations of graphs `[alg.fn.graph]`
    - Lines and linear functions `[alg.fn.graph.linear]`
    - Shifts, stretches and reflections `[alg.fn.graph.transform]`
    - Intersections of graphs `[alg.fn.graph.intersect]`
    - Domain, range and even and odd functions `[alg.fn.graph.domain]`
    - Periodic and piecewise functions `[alg.fn.graph.periodic]`
  - Functional equations `[alg.fn.feq]`
    - Substituting special values `[alg.fn.feq.sub]`
    - Cauchy-type and additive equations `[alg.fn.feq.cauchy]`
    - Functions on the integers and recursive definitions `[alg.fn.feq.integer]`
  - Floor, ceiling and fractional part `[alg.fn.floor]`
    - Equations with floors `[alg.fn.floor.eq]`
    - Sums of floors `[alg.fn.floor.sum]`
  - Operations and custom definitions `[alg.fn.op]`
    - Evaluating a defined operation `[alg.fn.op.eval]`
    - Properties of operations: commutative, associative, identity `[alg.fn.op.props]`
- **Exponents and logarithms** `[alg.exp]`
  - Exponent rules and exponential equations `[alg.exp.rules]`
    - Exponent arithmetic and comparing powers `[alg.exp.rules.compare]`
    - Exponential equations `[alg.exp.rules.eq]`
    - Exponential growth and decay `[alg.exp.rules.growth]`
  - Logarithm identities and equations `[alg.exp.log]`
    - Log rules and change of base `[alg.exp.log.rules]`
    - Logarithmic equations and systems `[alg.exp.log.eq]`
    - Number of digits and logs of integers `[alg.exp.log.digits]`
- **Sequences and series** `[alg.seq]`
  - Arithmetic and geometric sequences `[alg.seq.ap]`
    - Arithmetic sequences and series `[alg.seq.ap.arith]`
    - Geometric sequences and series `[alg.seq.ap.geom]`
    - Infinite geometric series `[alg.seq.ap.infinite]`
  - Recursive sequences and recurrences `[alg.seq.rec]`
    - Linear recurrences and characteristic equations `[alg.seq.rec.linear]`
    - Nonlinear recurrences and substitutions `[alg.seq.rec.nonlinear]`
    - Fibonacci-like sequences `[alg.seq.rec.fib]`
  - Telescoping and sums of series `[alg.seq.sum]`
    - Telescoping sums and products `[alg.seq.sum.telescope]`
    - Sums of powers $\sum k^n$ `[alg.seq.sum.powers]`
    - Arithmetico-geometric and other series `[alg.seq.sum.other]`
  - Patterns and periodic sequences `[alg.seq.period]`
    - Periodic sequences `[alg.seq.period.cycle]`
    - Finding the $n$th term from a pattern `[alg.seq.period.nth]`
- **Trigonometry** `[alg.trig]`
  - Trigonometric values and identities `[alg.trig.identity]`
    - Values at special angles `[alg.trig.identity.values]`
    - Sum, difference and double-angle formulas `[alg.trig.identity.sum]`
    - Product-to-sum and sum-to-product `[alg.trig.identity.product]`
  - Trigonometric equations and products `[alg.trig.eq]`
    - Solving trigonometric equations `[alg.trig.eq.solve]`
    - Products and sums over many angles `[alg.trig.eq.many]`
    - Inverse trigonometric functions `[alg.trig.eq.inverse]`
- **Complex numbers** `[alg.cx]`
  - Arithmetic and polar form `[alg.cx.polar]`
    - Complex arithmetic and conjugates `[alg.cx.polar.arith]`
    - Modulus, argument and De Moivre's theorem `[alg.cx.polar.demoivre]`
    - Complex numbers in the plane `[alg.cx.polar.plane]`
  - Roots of unity `[alg.cx.unity]`
    - Roots of unity and their sums `[alg.cx.unity.sums]`
    - Roots-of-unity filters `[alg.cx.unity.filter]`
    - Polynomial roots on the unit circle `[alg.cx.unity.poly]`
- **Inequalities and optimization** `[alg.ineq]`
  - Solving inequalities `[alg.ineq.solve]`
    - Linear and quadratic inequalities `[alg.ineq.solve.quad]`
    - Rational inequalities and sign charts `[alg.ineq.solve.rational]`
  - Classical inequalities `[alg.ineq.means]`
    - AM-GM and the power mean chain `[alg.ineq.means.amgm]`
    - Cauchy-Schwarz and Titu's lemma `[alg.ineq.means.cs]`
    - Rearrangement, Chebyshev and Schur `[alg.ineq.means.rearrange]`
    - Convexity, Jensen and smoothing `[alg.ineq.means.convex]`
  - Maximizing and minimizing `[alg.ineq.optimize]`
    - Quadratic optimization `[alg.ineq.optimize.quad]`
    - Optimization with a constraint `[alg.ineq.optimize.constraint]`
    - Optimization over the integers `[alg.ineq.optimize.integer]`

### Counting & Probability `[cp]`

- **Basic counting** `[cp.basic]`
  - Lists and the multiplication and addition principles `[cp.basic.principle]`
    - Counting numbers in a list `[cp.basic.principle.list]`
    - Multiplication principle and independent choices `[cp.basic.principle.mult]`
    - Organized lists and trees `[cp.basic.principle.tree]`
  - Permutations and arrangements `[cp.basic.perm]`
    - Arranging distinct objects `[cp.basic.perm.distinct]`
    - Arrangements with repeated objects `[cp.basic.perm.repeat]`
    - Arrangements with restrictions (adjacent, apart, in order) `[cp.basic.perm.restrict]`
    - Permutations by cycle structure (powers equal to the identity, cycles of given lengths, pairings that close into cycles) `[cp.basic.perm.cycle]`
  - Combinations and committees `[cp.basic.comb]`
    - Choosing subsets and committees `[cp.basic.comb.choose]`
    - Choosing with conditions `[cp.basic.comb.condition]`
    - Counting subsets with a property `[cp.basic.comb.subsets]`
    - Splitting into pairs (random pairings and perfect matchings, $(2n-1)!!$ ways) `[cp.basic.comb.pairs]`
  - Casework and complementary counting `[cp.basic.case]`
    - Casework `[cp.basic.case.cases]`
    - Complementary counting `[cp.basic.case.complement]`
    - Overcounting and dividing out `[cp.basic.case.overcount]`
- **Counting techniques** `[cp.tech]`
  - Stars and bars and distributions `[cp.tech.stars]`
    - Identical objects into distinct boxes `[cp.tech.stars.identical]`
    - Distributions with upper or lower bounds `[cp.tech.stars.bounds]`
    - Distinct objects into boxes; surjections `[cp.tech.stars.distinct]`
  - Inclusion-exclusion `[cp.tech.pie]`
    - Two and three sets; Venn diagrams `[cp.tech.pie.venn]`
    - General inclusion-exclusion `[cp.tech.pie.general]`
  - Bijections and counting in two ways `[cp.tech.bij]`
    - Bijections `[cp.tech.bij.bij]`
    - Double counting `[cp.tech.bij.double]`
  - Recursion and states `[cp.tech.rec]`
    - Recursive counting, Catalan and ballot problems included `[cp.tech.rec.count]`
    - States and transfer tables `[cp.tech.rec.states]`
  - Counting with symmetry `[cp.tech.sym]`
    - Rotations and reflections; necklaces `[cp.tech.sym.necklace]`
    - Burnside's lemma `[cp.tech.sym.burnside]`
  - Generating functions `[cp.tech.gf]`
- **Arrangements with structure** `[cp.struct]`
  - Paths on grids and lattices `[cp.struct.paths]`
    - Lattice paths `[cp.struct.paths.lattice]`
    - Paths with obstacles or required points `[cp.struct.paths.obstacle]`
    - Walks on graphs, cubes and polygons `[cp.struct.paths.walks]`
  - Words, digits and strings `[cp.struct.words]`
    - Counting numbers with digit conditions `[cp.struct.words.digits]`
    - Strings with forbidden patterns `[cp.struct.words.forbidden]`
    - Increasing and monotone sequences `[cp.struct.words.monotone]`
  - Seating, circular arrangements and derangements `[cp.struct.seat]`
    - Circular arrangements `[cp.struct.seat.circle]`
    - Derangements and fixed points `[cp.struct.seat.derange]`
  - Partitions and compositions `[cp.struct.part]`
    - Compositions `[cp.struct.part.comp]`
    - Integer partitions `[cp.struct.part.partition]`
    - Set partitions `[cp.struct.part.set]`
  - Tilings and colorings `[cp.struct.tile]`
    - Tilings of strips and boards `[cp.struct.tile.tiling]`
    - Colorings of grids, graphs and solids `[cp.struct.tile.color]`
    - Number fillings of grids (Latin squares, Sudoku bands) `[cp.struct.tile.fill]`
- **Binomial coefficients** `[cp.binom]`
  - Pascal's triangle and identities `[cp.binom.identity]`
    - Pascal's rule and the hockey stick `[cp.binom.identity.hockey]`
    - Vandermonde and sums of products `[cp.binom.identity.vandermonde]`
    - Binomial coefficients modulo a prime `[cp.binom.identity.mod]`
  - Binomial theorem and expansions `[cp.binom.thm]`
    - Coefficients in an expansion `[cp.binom.thm.coeff]`
    - Multinomial expansions `[cp.binom.thm.multinomial]`
    - Sums of binomial coefficients `[cp.binom.thm.sums]`
- **Probability** `[cp.prob]`
  - Equally likely outcomes `[cp.prob.basic]`
    - Counting favorable outcomes `[cp.prob.basic.count]`
    - Complementary probability `[cp.prob.basic.complement]`
  - Dice, coins and cards `[cp.prob.dice]`
    - Dice `[cp.prob.dice.dice]`
    - Coins and binomial probability `[cp.prob.dice.coins]`
    - Cards, balls and drawing without replacement `[cp.prob.dice.draw]`
  - Conditional probability and independence `[cp.prob.cond]`
    - Conditional probability and Bayes `[cp.prob.cond.bayes]`
    - Independent events `[cp.prob.cond.indep]`
  - Geometric probability `[cp.prob.geom]`
    - Random points on a segment `[cp.prob.geom.segment]`
    - Random points in a region `[cp.prob.geom.region]`
    - Random chords, angles and triangles `[cp.prob.geom.shape]`
  - Random processes, games and Markov chains `[cp.prob.process]`
    - Random walks and gambler's ruin `[cp.prob.process.walk]`
    - Repeated trials until a stopping event `[cp.prob.process.stop]`
    - Games between players `[cp.prob.process.game]`
- **Expected value** `[cp.exp]`
  - Expected value by definition `[cp.exp.basic]`
    - Expected value from a list of outcomes, maxima and minima included `[cp.exp.basic.list]`
    - Fair games and expected payoffs `[cp.exp.basic.payoff]`
  - Linearity of expectation `[cp.exp.linear]`
    - Indicator variables `[cp.exp.linear.indicator]`
    - Expected counts in arrangements `[cp.exp.linear.count]`
  - Expected waiting times and states `[cp.exp.states]`
    - Expected number of trials `[cp.exp.states.trials]`
    - Expected values by states and recursion `[cp.exp.states.recursion]`
  - Variance and distributions `[cp.exp.var]`
    - Variance and standard deviation `[cp.exp.var.var]`
    - Binomial and geometric distributions `[cp.exp.var.dist]`
- **Graphs and combinatorial structures** `[cp.graph]`
  - Graphs, trees and networks `[cp.graph.basic]`
    - Degrees and handshakes `[cp.graph.basic.degree]`
    - Paths, cycles and Euler circuits `[cp.graph.basic.paths]`
    - Trees and connectivity `[cp.graph.basic.trees]`
  - Tournaments and round-robins `[cp.graph.tour]`
  - Largest subsets avoiding a condition `[cp.graph.sets]`
- **Logic, games and processes** `[cp.logic]`
  - Logic puzzles and truth-tellers `[cp.logic.puzzle]`
    - Knights, knaves and truth-tellers `[cp.logic.puzzle.truth]`
    - Statements and logical equivalence (implications, contrapositives and converses, "all" and "some", which statement must follow) `[cp.logic.puzzle.statements]`
    - Deduction and ordering puzzles `[cp.logic.puzzle.deduce]`
      - Rankings and orderings `[cp.logic.puzzle.deduce.order]`
      - Matching people to facts `[cp.logic.puzzle.deduce.match]`
    - Grid and number puzzles `[cp.logic.puzzle.grid]`
  - Games and strategies `[cp.logic.game]`
    - Winning and losing positions `[cp.logic.game.positions]`
    - Strategy stealing and pairing strategies `[cp.logic.game.pairing]`
  - Invariants and monovariants in processes `[cp.logic.invariant]`
    - Parity and coloring invariants `[cp.logic.invariant.parity]`
    - Monovariants and termination `[cp.logic.invariant.mono]`
    - Operations on boards and lists `[cp.logic.invariant.ops]`
  - Pigeonhole and extremal arguments `[cp.logic.pigeon]`
    - Pigeonhole principle `[cp.logic.pigeon.pigeon]`
    - Extremal principle `[cp.logic.pigeon.extremal]`
    - Constructions and bounds (the most or the fewest possible) `[cp.logic.pigeon.bounds]`

### Geometry `[geo]`

- **Lengths and angles** `[geo.basic]`
  - Angle chasing `[geo.basic.angle]`
    - Parallel lines and transversals `[geo.basic.angle.parallel]`
    - Angles in triangles and polygons `[geo.basic.angle.polygon]`
    - Isosceles triangles in angle chases `[geo.basic.angle.isosceles]`
  - Pythagorean theorem and right triangles `[geo.basic.pyth]`
    - Pythagorean theorem and triples `[geo.basic.pyth.triples]`
    - Altitude to the hypotenuse `[geo.basic.pyth.altitude]`
    - Right triangles hidden in figures `[geo.basic.pyth.hidden]`
    - Folding and creases `[geo.basic.pyth.fold]`
  - Similar and congruent triangles `[geo.basic.sim]`
    - Congruence `[geo.basic.sim.congruent]`
    - Similar triangles and ratios `[geo.basic.sim.similar]`
    - Parallel lines and proportional segments `[geo.basic.sim.parallel]`
- **Triangles** `[geo.tri]`
  - Area of a triangle `[geo.tri.area]`
    - Base and height `[geo.tri.area.base]`
    - Heron's formula `[geo.tri.area.heron]`
    - $\tfrac12 ab\sin C$ `[geo.tri.area.sine]`
  - Special triangles `[geo.tri.special]`
    - 30-60-90 and 45-45-90 triangles `[geo.tri.special.right]`
    - Equilateral triangles `[geo.tri.special.equil]`
    - Isosceles triangles `[geo.tri.special.isos]`
  - Triangle inequality `[geo.tri.ineq]`
    - Which lengths form a triangle, and of which type `[geo.tri.ineq.valid]`
    - Counting integer-sided triangles `[geo.tri.ineq.count]`
  - Cevians, angle bisectors and medians `[geo.tri.cevian]`
    - Angle bisector theorem `[geo.tri.cevian.bisector]`
    - Medians and the centroid `[geo.tri.cevian.median]`
    - Stewart's theorem `[geo.tri.cevian.stewart]`
    - Ceva and Menelaus `[geo.tri.cevian.ceva]`
  - Area ratios and mass points `[geo.tri.ratio]`
    - Area ratios from shared heights or bases `[geo.tri.ratio.area]`
    - Mass points `[geo.tri.ratio.mass]`
    - Routh's theorem and dividing a triangle `[geo.tri.ratio.routh]`
  - Law of sines and law of cosines `[geo.tri.trig]`
    - Law of sines `[geo.tri.trig.sines]`
    - Law of cosines `[geo.tri.trig.cosines]`
    - Trigonometry in triangles (tangent, half angles) `[geo.tri.trig.other]`
  - Inradius, circumradius and exradii `[geo.tri.radii]`
    - The incircle and tangent lengths `[geo.tri.radii.in]`
    - The circumcircle and $abc = 4RK$ `[geo.tri.radii.circum]`
    - Excircles `[geo.tri.radii.ex]`
  - Triangle centers, their lines and classical configurations `[geo.tri.centers]`
    - Orthocenter and altitudes `[geo.tri.centers.ortho]`
    - The Euler line and the nine-point circle `[geo.tri.centers.euler]`
    - Classical lemmas, isogonal conjugates and symmedians `[geo.tri.centers.lemmas]`
- **Polygons** `[geo.poly]`
  - Quadrilaterals `[geo.poly.quad]`
    - Rectangles and squares `[geo.poly.quad.rect]`
    - Parallelograms and rhombi `[geo.poly.quad.para]`
    - Trapezoids `[geo.poly.quad.trap]`
    - General quadrilaterals and their diagonals `[geo.poly.quad.general]`
  - Regular polygons `[geo.poly.regular]`
    - Regular hexagons `[geo.poly.regular.hex]`
    - Regular octagons and other regular polygons `[geo.poly.regular.other]`
    - Stars and diagonals of regular polygons `[geo.poly.regular.diag]`
  - Areas of composite and shaded regions `[geo.poly.composite]`
    - Adding and subtracting areas `[geo.poly.composite.add]`
    - Regions with circular arcs `[geo.poly.composite.arcs]`
    - Overlapping figures `[geo.poly.composite.overlap]`
  - Perimeter and polygons in general `[geo.poly.general]`
    - Perimeters of figures and of grid shapes `[geo.poly.general.perim]`
    - Pentagons and other irregular polygons `[geo.poly.general.irregular]`
- **Circles** `[geo.circ]`
  - Arcs, sectors and circumference `[geo.circ.arc]`
    - Circumference and arc length `[geo.circ.arc.length]`
    - Sectors and segments `[geo.circ.arc.sector]`
    - Rolling circles and belts around circles `[geo.circ.arc.rolling]`
  - Inscribed angles and arcs `[geo.circ.inscribed]`
    - Inscribed angle theorem `[geo.circ.inscribed.thm]`
    - Angles formed by chords, secants and tangents `[geo.circ.inscribed.chords]`
  - Chords, tangents and power of a point `[geo.circ.power]`
    - Chord lengths and distances from the center `[geo.circ.power.chord]`
    - Tangent lines and tangent lengths `[geo.circ.power.tangent]`
    - Power of a point `[geo.circ.power.pop]`
  - Tangent circles and circles in polygons `[geo.circ.tangent]`
    - Mutually tangent circles; Descartes `[geo.circ.tangent.mutual]`
    - Circles inscribed in polygons and corners `[geo.circ.tangent.inscribed]`
    - Common tangents of two circles `[geo.circ.tangent.common]`
  - Cyclic and tangential quadrilaterals `[geo.circ.cyclic]`
    - Cyclic quadrilaterals and Ptolemy `[geo.circ.cyclic.ptolemy]`
    - Brahmagupta's formula `[geo.circ.cyclic.brahmagupta]`
    - Tangential quadrilaterals and Pitot `[geo.circ.cyclic.tangential]`
  - Radical axes, inversion and projective tools `[geo.circ.proj]`
- **Coordinate geometry** `[geo.coord]`
  - Lines, slopes and distances `[geo.coord.line]`
    - Slopes, intercepts and equations of lines `[geo.coord.line.slope]`
    - Distance and midpoint `[geo.coord.line.dist]`
    - Distance from a point to a line `[geo.coord.line.point]`
  - Areas in coordinates and lattice points `[geo.coord.area]`
    - Shoelace and coordinate areas `[geo.coord.area.shoelace]`
    - Lattice points and Pick's theorem `[geo.coord.area.pick]`
    - Regions defined by inequalities `[geo.coord.area.region]`
  - Circles and conics `[geo.coord.conic]`
    - Circles in the coordinate plane `[geo.coord.conic.circle]`
    - Parabolas `[geo.coord.conic.parabola]`
    - Ellipses and hyperbolas `[geo.coord.conic.ellipse]`
  - Transformations `[geo.coord.transform]`
    - Reflections `[geo.coord.transform.reflect]`
    - Rotations `[geo.coord.transform.rotate]`
    - Dilations and homothety `[geo.coord.transform.dilate]`
  - Complex numbers and vectors in geometry `[geo.coord.vector]`
    - Vectors and dot products `[geo.coord.vector.dot]`
    - Complex numbers as points `[geo.coord.vector.complex]`
- **Solid geometry** `[geo.solid]`
  - Prisms, cylinders and boxes `[geo.solid.prism]`
    - Rectangular boxes and cubes `[geo.solid.prism.box]`
    - Prisms and cylinders `[geo.solid.prism.cyl]`
    - Unit cubes, painted cubes and stacking `[geo.solid.prism.unit]`
      - Painted cubes `[geo.solid.prism.unit.paint]`
      - Counting cubes from views and stacks `[geo.solid.prism.unit.views]`
      - Surface area of cube arrangements `[geo.solid.prism.unit.surface]`
  - Pyramids, cones and spheres `[geo.solid.round]`
    - Pyramids and tetrahedra `[geo.solid.round.pyramid]`
    - Cones and frustums `[geo.solid.round.cone]`
    - Spheres and inscribed spheres `[geo.solid.round.sphere]`
  - Polyhedra, nets and cross-sections `[geo.solid.poly]`
    - Polyhedra and Euler's formula `[geo.solid.poly.euler]`
    - Nets and unfolding `[geo.solid.poly.nets]`
    - Cross-sections and slices `[geo.solid.poly.section]`
  - Coordinates and vectors in space `[geo.solid.coord]`
    - Distances and angles in space `[geo.solid.coord.dist]`
    - Planes, normals and volumes by vectors `[geo.solid.coord.planes]`
- **Geometric optimization and combinatorial geometry** `[geo.comb]`
  - Reflected paths, unfolding and extremes `[geo.comb.extreme]`
    - Reflected paths and unfolding (shortest paths, billiards, paths on a surface) `[geo.comb.extreme.path]`
    - Largest and smallest lengths, areas and sums of distances `[geo.comb.extreme.maxmin]`
  - Counting figures, grids and dissections `[geo.comb.count]`
    - Counting triangles, rectangles and squares in a grid `[geo.comb.count.figures]`
    - Dissections and tilings of figures `[geo.comb.count.dissect]`
    - Points, lines and convex position `[geo.comb.count.points]`
    - Regions cut out by lines and chords `[geo.comb.count.regions]`

### Number Theory `[nt]`

- **Divisibility** `[nt.div]`
  - Divisibility rules and divisibility arguments `[nt.div.rules]`
    - Divisibility rules for 2 to 11 `[nt.div.rules.tests]`
    - Counting multiples in a range `[nt.div.rules.count]`
    - Divisibility of expressions $a \mid f(n)$ `[nt.div.rules.expr]`
    - Parity arguments `[nt.div.rules.parity]`
  - GCD, LCM and the Euclidean algorithm `[nt.div.gcd]`
    - GCD and LCM of numbers `[nt.div.gcd.basic]`
    - Euclidean algorithm on expressions `[nt.div.gcd.euclid]`
    - Bézout's identity `[nt.div.gcd.bezout]`
  - Prime factorization `[nt.div.prime]`
    - Factoring and using prime factorizations `[nt.div.prime.factor]`
    - Perfect squares and powers from factorizations `[nt.div.prime.powers]`
- **Divisors** `[nt.divisor]`
  - Counting and summing divisors `[nt.divisor.count]`
    - The number of divisors `[nt.divisor.count.tau]`
    - Sums and products of divisors `[nt.divisor.count.sigma]`
    - Divisor pairs and listing divisors `[nt.divisor.count.pairs]`
    - Counting factorizations into several factors `[nt.divisor.count.factor]`
  - Euler's totient and multiplicative functions `[nt.divisor.phi]`
    - Euler's totient `[nt.divisor.phi.phi]`
    - Multiplicative functions and Möbius `[nt.divisor.phi.mult]`
- **Modular arithmetic** `[nt.mod]`
  - Remainders and congruence arithmetic `[nt.mod.basic]`
    - Remainders of sums and products `[nt.mod.basic.arith]`
    - Modular inverses and solving $ax \equiv b$ `[nt.mod.basic.inverse]`
    - Using a modulus to rule out cases `[nt.mod.basic.rule]`
  - Last digits and cycles of powers `[nt.mod.cycle]`
    - Last digit and last two digits `[nt.mod.cycle.last]`
    - Cycles of powers `[nt.mod.cycle.power]`
  - Fermat, Euler and the order of an element `[nt.mod.fermat]`
    - Fermat's, Euler's and Wilson's theorems `[nt.mod.fermat.flt]`
    - Order of an element and primitive roots `[nt.mod.fermat.order]`
  - Chinese remainder theorem and linear congruences `[nt.mod.crt]`
    - Systems of congruences `[nt.mod.crt.system]`
    - Splitting a modulus into prime powers `[nt.mod.crt.split]`
  - Quadratic residues and squares modulo small numbers `[nt.mod.qr]`
- **Primes and factorials** `[nt.prime]`
  - Primes and primality `[nt.prime.basic]`
    - Recognizing and testing primes `[nt.prime.basic.test]`
    - Primes in expressions and prime factors of $n^k \pm 1$ `[nt.prime.basic.expr]`
  - Factorials, valuations, Legendre's formula and lifting the exponent `[nt.prime.val]`
    - Trailing zeros and Legendre's formula `[nt.prime.val.legendre]`
    - Factorials and divisibility `[nt.prime.val.factorial]`
    - Lifting the exponent `[nt.prime.val.lte]`
- **Diophantine equations** `[nt.dio]`
  - Linear Diophantine equations and the Frobenius problem `[nt.dio.linear]`
    - Solving $ax+by=c$ `[nt.dio.linear.solve]`
    - Chicken McNugget and the Frobenius number `[nt.dio.linear.frob]`
  - Factoring and SFFT `[nt.dio.factor]`
    - Simon's favorite factoring trick `[nt.dio.factor.sfft]`
    - Difference of squares and other factorable forms `[nt.dio.factor.squares]`
    - Reciprocal equations $1/x+1/y=1/n$ `[nt.dio.factor.recip]`
  - Pythagorean triples and sums of squares `[nt.dio.squares]`
    - Pythagorean triples `[nt.dio.squares.triples]`
    - Sums of two squares and Pell equations `[nt.dio.squares.sums]`
  - Bounding and parity arguments `[nt.dio.bound]`
    - Bounding and size arguments `[nt.dio.bound.size]`
    - Modular obstructions `[nt.dio.bound.mod]`
    - Exponential Diophantine equations `[nt.dio.bound.exp]`
- **Digits and bases** `[nt.digit]`
  - Digits and digit sums `[nt.digit.sum]`
    - Digit sums and casting out nines `[nt.digit.sum.nines]`
    - Numbers with digit conditions `[nt.digit.sum.condition]`
    - Reversing and rearranging digits `[nt.digit.sum.reverse]`
    - Cryptarithms and missing digits `[nt.digit.sum.crypt]`
  - Number bases `[nt.digit.base]`
    - Converting between bases `[nt.digit.base.convert]`
    - Arithmetic and digits in other bases `[nt.digit.base.arith]`
  - Decimals, fractions and repeating decimals `[nt.digit.decimal]`
    - Repeating decimals and their periods `[nt.digit.decimal.repeat]`
    - Terminating decimals and simplest fractions `[nt.digit.decimal.terminate]`
- **Integer sequences and special numbers** `[nt.seq]`
  - Perfect squares, cubes and powers `[nt.seq.power]`
    - Perfect squares and squares between bounds `[nt.seq.power.squares]`
    - Perfect powers and when an expression is a square `[nt.seq.power.expr]`
  - Special numbers `[nt.seq.special]`
    - Fibonacci and Lucas numbers `[nt.seq.special.fib]`
    - Triangular, figurate and palindromic numbers `[nt.seq.special.figurate]`
  - Representations as sums and continued fractions `[nt.seq.repr]`

## Test: the 2025 AMC 10A (2026-11-06)

Every problem of the 2025 AMC 10A was filed by hand from its statement and written strategy, to check that the tree has a natural home for real problems. All 25 found one; two needed a node the draft lacked, and both were added (marked *new*).

1. Two cyclists leave an hour apart: `alg.word.rates.motion.meet`.
2. Adding a second nut mix: `alg.word.ratio.mix`.
3. Integer isosceles triangles with longest side 2025: `geo.tri.ineq.count` (*new*: the draft had no home for the triangle inequality), `cp.basic.case.cases`.
4. Ash changes two team averages: `alg.word.stats.mean`.
5. The 2025th term of a rising and falling sequence: `alg.seq.period.nth`.
6. Trisected angles of an equilateral triangle: `geo.basic.angle.polygon`.
7. Two remainders of a cubic: `alg.poly.remainder.thm`.
8. Four statements about how many are true: `cp.logic.puzzle.truth`.
9. Shifted cubic through a point: `alg.fn.graph.transform`, `alg.fn.graph.intersect`.
10. Semicircle with a smaller semicircle cut out: `geo.circ.power.chord`, `geo.poly.composite.arcs`.
11. Arithmetic and geometric sequences sharing ends: `alg.seq.ap.arith`, `alg.seq.ap.geom`.
12. Passcodes with one even and one prime digit: `cp.struct.words.digits`.
13. Infinitely many nested squares, alternately shaded: `alg.seq.ap.infinite`, `geo.poly.composite.add`.
14. Students and teachers at a round table: `cp.prob.basic.count`, `cp.struct.seat.circle`.
15. Similar triangles in a rectangle: `geo.basic.sim.similar`.
16. Expected size of the fullest jar: `cp.exp.basic.list` (*new*: the draft had only linearity and states, not expected value computed from the outcomes).
17. Two remainders give $N$: `nt.mod.basic.arith`, `nt.div.gcd.euclid`.
18. Harmonic mean of the roots of 2025 quadratics: `alg.poly.vieta.basic`.
19. A Pascal-like array whose rows are $(-x^2+3x+1)(x+1)^n$: `alg.poly.construct.coeff`, `cp.binom.identity.hockey` (Pascal's rule).
20. A sight line tangent to a silo: `geo.coord.line.point`, `geo.circ.power.tangent`.
21. The largest sum-free subset of $\{1,\ldots,20\}$: `cp.graph.sets`, `cp.logic.pigeon.bounds`.
22. Four mutually tangent circles: `geo.circ.tangent.mutual`.
23. Bisector meets altitude: `geo.tri.trig.cosines`, `geo.tri.cevian.bisector`.
24. Fair numbers (unimodal digit strings): `cp.struct.words.monotone`.
25. $AP$ is the middle side of $\triangle APB$: `cp.prob.geom.region`.

Spread by first node: 10 problems in Algebra, 7 in Counting & Probability, 7 in Geometry and 1 in Number Theory; 11 problems also take a second node. No problem needed more than two nodes.

The same pass also audited every leaf. Topics that had no subtopics now have them (operations, generating functions, variance, tournaments, set systems, matrices, polygons in general); five subtopics that lumped distinct kinds of problem got a fifth level (motion problems, deduction puzzles, grid puzzles, unit cubes, classical triangle lemmas); and four common kinds of contest problem got homes: folding and creases, counting multiples in a range, cryptarithms, and acute, right or obtuse from the side lengths. (Later, under the archetype rule, the subtopics of generating functions, tournaments, set systems and matrices were merged back, and the fifth levels under passing trains, grid puzzles and triangle lemmas removed, because too few problems fit them.)

## Test: the 2025 AIME I (2026-11-06)

All 15 problems found a home; five needed a node the draft lacked (*new*). Two of the five were later merged into broader nodes under the archetype rule, because few other problems fit them.

1. $17_b$ divides $97_b$: `nt.digit.base.arith`, `nt.div.rules.expr`.
2. A heptagon built by reflecting points of a triangle: `geo.tri.ratio.area`, `geo.coord.transform.reflect`.
3. Ice-cream assignments with $c\gt v\gt s$: `cp.basic.perm.repeat`, `cp.basic.case.cases`.
4. Integer points on $12x^2-xy-6y^2=0$: `nt.dio.factor.squares` (a quadratic form that factors into two lines; first added as its own node, then merged because few problems fit it).
5. Eight-digit numbers divisible by $22$: `nt.div.rules.tests`, `cp.basic.perm.restrict`.
6. An isosceles trapezoid with an incircle: `geo.circ.cyclic.tangential`, `geo.poly.quad.trap`.
7. The last of six alphabetized pairs contains $G$: `cp.prob.basic.count`, `cp.graph.tour` (pairings).
8. A circle and a perpendicular bisector in the complex plane meet once: `alg.cx.polar.plane`, `geo.coord.line.point`.
9. A parabola and its $60^\circ$ rotation: `geo.coord.transform.rotate`, `geo.coord.conic.parabola`.
10. Fillings of a $3\times9$ Sudoku band: `cp.struct.tile.fill` (*new*: counting number fillings of a grid).
11. A sawtooth function meets $x=34y^2$: `alg.fn.graph.periodic` (*new*), `alg.poly.vieta.basic`.
12. A finite region of the plane $x+y+z=75$: `geo.solid.coord.planes`, `alg.ineq.solve.rational`.
13. Expected regions cut by random chords: `cp.exp.linear.indicator`, `geo.comb.count.regions` (*new*).
14. Minimizing $AX+BX+CX+DX+EX$ for a pentagon: `geo.comb.extreme.maxmin` (minimizing a sum of distances; first added as its own node, then merged), `geo.tri.special.right`.
15. Triples with $3^7 \mid a^3+b^3+c^3$: `nt.prime.val.lte`, `nt.mod.basic.arith`.

Spread by first node: 5 Geometry, 4 Number Theory, 4 Counting & Probability, 2 Algebra; 13 problems take a second node. The AIME tested the upper end of the tree more than the AMC 10A did, and all five gaps were at that end.

## Test: the 2026 AMC 10A (2026-11-06)

Filed when the paper was added to the app. All 25 found a home; two needed a node the draft lacked, both added (*new*).

1. LP and EP records: `alg.word.ratio.prop`.
2. The share of a $27\%$ tax in the total: `alg.word.ratio.percent`.
3. A triangle cut from a square by a diagonal: `geo.basic.sim.similar`, `geo.tri.ratio.area`.
4. A polygon with angles of $150^\circ$ and $190^\circ$: `geo.basic.angle.polygon`.
5. Each term the mean of the earlier ones: `alg.word.stats.mean`, `alg.seq.rec.nonlinear`.
6. A right triangle inscribed in a circle: `geo.circ.arc.sector`, `geo.basic.pyth.triples`.
7. Positive solutions of two linear equations: `alg.eq.linear.system`, `nt.dio.linear.solve`.
8. A highway sign with rounded distance and time: `alg.word.compute.round` (*new*: rounding and the range of a rounded value), `alg.word.rates.motion`.
9. Two similar triangles sharing sides $9$ and $12$: `geo.basic.sim.similar`.
10. Mean $32\%$ above the median of the squares: `alg.word.stats.median`, `alg.seq.sum.powers`.
11. One of six numbers is the lcm: `nt.div.gcd.basic`.
12. Socks drawn until one colour runs out: `cp.prob.dice.draw`.
13. Handshakes within and between two clubs: `cp.graph.basic.degree`, `alg.eq.system.combine`.
14. Side lengths $t^2+1$, $5t+7$, $4t+4$: `geo.tri.ineq.valid`, `alg.ineq.solve.quad`.
15. The level of $\tfrac{20}{27}$ in a fraction tree: `nt.div.gcd.euclid`.
16. The lowest score from an urn: `cp.prob.dice.draw`, `cp.basic.case.cases`.
17. The hexagon inside six squares: `geo.poly.regular.hex`, `geo.poly.composite.overlap`.
18. A halving recurrence of integers: `alg.seq.rec.linear`.
19. A hemisphere over three cubes: `geo.solid.round.sphere`, `geo.solid.coord.dist`.
20. Boxes of volume $510510$: `nt.divisor.count.factor` (*new*: counting factorizations), `cp.struct.part.set`.
21. Cutting a $3\times3$ grid into trominoes: `cp.struct.tile.tiling`, `cp.prob.basic.count`.
22. Seven touching ellipses: `geo.coord.conic.ellipse`, `geo.circ.tangent.inscribed`.
23. Multiples of $2$ and $3$ in a run of integers: `nt.div.rules.count`.
24. $f(3+\sqrt5)=f(3-\sqrt5)$ for a monic cubic: `alg.poly.construct.given`.
25. Evening out twenty rooms of nuts: `cp.logic.pigeon.bounds`, `cp.logic.invariant.ops`.

Spread by first node: 8 Algebra, 8 Geometry, 5 Counting & Probability, 4 Number Theory; 15 problems take a second node. Problem 23 used a node added by the leaf audit (counting multiples in a range).

## Test: the 2026 AMC 12A (2026-11-06)

Filed when the paper was added. Eleven problems are shared with the 2026 AMC 10A and take the same nodes as their 10A twins: 12A #1 to #6, #10, #11, #16, #17 and #20 are 10A #2, #3, #4, #5, #7, #10, #15, #16, #21, #22 and #24. The other 14 all found a home, and none needed a new node.

7. $(1+i)^{20}+(1-i)^{20}$: `alg.cx.polar.demoivre`.
8. A school averages two attendance percentages: `alg.word.stats.weighted`, `alg.word.ratio.percent`.
9. A system with $|x^2-y^2|=4$: `alg.eq.system.sub`, `alg.eq.abs.eq`.
12. Numbers meeting at least one of five congruences: `nt.mod.crt.system`, `cp.basic.case.complement`.
13. Four die rolls placed at random in increasing order: `cp.prob.dice.dice`, `cp.basic.perm.distinct`.
14. Two open boxes that hold a third: `geo.solid.prism.box`.
15. $\log_2\big(\sin(a+b)\sin(a-b)\big)$: `alg.trig.identity.sum`, `alg.exp.log.rules`.
18. A sphere cut by three perpendicular planes: `geo.solid.round.sphere`, `geo.solid.coord.dist`.
19. $\sin x+\sin2x+\sin3x=1+\cos x+\cos2x$: `alg.trig.eq.solve`, `alg.trig.identity.product`.
21. A random cut point in a hexagonal cookie: `cp.prob.geom.region`, `geo.poly.regular.hex`.
22. Formations of eight birds: `cp.graph.basic.trees`, `cp.tech.rec.count`.
23. An infinite product when $x^3+x^2=1$: `alg.seq.sum.telescope`, `alg.poly.higher.cubic`.
24. Two tangent circles in a right trapezoid: `geo.circ.tangent.inscribed`, `geo.coord.line.point`.
25. At least $50$ solutions of $x^2\equiv1\pmod m$: `nt.mod.crt.split`.

Spread of the 14 by first node: 6 Algebra, 3 Counting & Probability, 3 Geometry, 2 Number Theory; 11 take a second node. That no node was missing on a fourth paper suggests the tree is close to complete at the AMC level.

## The tagging pass (T3) revised these filings (2026-11-07)

The test filings above are a record of the test. The problems' own `tree` fields, written in the tagging pass, are the filings now, and on re-reading four of them changed. 2026 AMC 10A #5 is `alg.word.stats.mean` with `alg.seq.rec` (each term is the mean of all earlier ones, which is not a nonlinear recurrence). #6 is `geo.circ.arc.sector` with `geo.circ.inscribed.thm` (Thales' theorem is the step, not the triple $8,15,17$). #13 is `cp.graph.basic.degree` with `alg.poly.vieta.basic` (two sizes from their sum and product). #22, and its twin 12A #17, is `geo.coord.conic.ellipse` with `geo.coord.transform` (a stretch turns the ellipses into touching circles; no circle is inscribed in a polygon).

Later papers, read again rather than copied from their tests: 2025 AMC 10A #17 is `nt.div.gcd.basic` with `nt.mod.basic.arith` (it works with numbers, not the expressions of `nt.div.gcd.euclid`). In the 2025 AIME I, #7 is `cp.prob.basic.count` with `cp.basic.case.cases` (random pairings are not tournaments; see TQ7), #12 is `geo.solid.coord.planes` with `geo.coord.area.region` (the region is cut out by inequalities, which nothing solves), and #14 is `geo.comb.extreme.maxmin` with `geo.circ.cyclic.ptolemy` (Ptolemy's inequality is the bound).

## Decisions (owner, 2026-11-06)

- **TQ1, word problems:** "Arithmetic and word problems" stays under Algebra.
- **TQ2, logic and games:** "Logic, games and processes" stays under Counting & Probability.
- **TQ3, trigonometry and complex numbers:** filed under Algebra, with geometric uses filed in Geometry (`geo.tri.trig`, `geo.coord.vector`).
- **TQ4, Olympiad nodes:** folded into the main topics. Olympiad inequalities joined `alg.ineq.means`; synthetic lemmas joined `geo.tri.centers`; inversion and projective tools became `geo.circ.proj` under Circles; lifting the exponent joined `nt.prime.val`.
- **TQ5, the picker:** Practice a topic offers the tree only (expandable, with search over node names); card names are not searchable topics for now. This can be revisited later.

## Steps (also in `PLAN.md`, Step T)

1. **T1, draft the tree** (this file). Done: the owner's answers to TQ1 to TQ5 are recorded above.
2. **T2, the data file:** `js/data/topic-tree.js` with ids, names, parents and a home node for every card; generate this page from it.
3. **T3, file the problems:** seed from cards, read the rest, and add the gate.
4. **T4, Practice:** the topic picker uses the tree only (no card-name topics, TQ5); a node draws from its whole subtree.
5. **T5, labels:** a problem's page and the practice review show its topic breadcrumbs.
6. **T6, contest profiles:** card profiles show where their problems fall in the tree; each topic node gets a profile of its own.
