# Tree finalization after the full tagging pass

2026-11-10. The requested audit implementation is complete for the present corpus. [TREE-REPAIRS.md](TREE-REPAIRS.md) records every changed problem, retired id and affected card home. [TREE-AUDIT.md](TREE-AUDIT.md) retains the pre-repair evidence; [TREE-REVIEW.md](TREE-REVIEW.md) retains the larger area decisions. T4 and textbook revision remain paused.

## Final census and decisions

| Measure | Before semantic repairs | Final |
|---|---:|---:|
| Filed problems | 4,725 | 4,725 |
| Recognized distinct problems | 4,117 | 4,117 |
| Nodes | 482 | 459 |
| Areas | 28 | 28 |
| Terminal leaves | 337 | 316 |
| Leaves with fewer than five distinct problems | 57 | 43 |
| Unused leaves | 2 | 0 |
| Distinct problems touching thin leaves | 145 | 115 |
| Card homes on thin leaves | 140 | 122 |
| Cards with homes / general methods without | 740 / 34 | 739 / 35 |
| Distinct problems filed directly on a parent | 56 | 120 |

The original pre-pruning draft had 503 nodes; the full sequence removes 44 net nodes. All 774 cards survive. All 650 AMC 8, 350 AJHSME and ten HMMT problems remain filed and reviewed. The final label distribution is 3,320 problems with one label, 1,373 with two, and 32 with three. Twin equality and the absence of ancestor/descendant duplicate labels are enforced by the gate.

Keep the four subjects and 28 areas. Arithmetic is separated from applied quantities and statistics; counting separates arrangements, structures, coefficient/set counts, probability and discrete reasoning; divisibility, primes and divisors share an area. Right and similar triangles now sit with triangles; folding sits with transformations. Integer square/power conditions now sit in Diophantine equations, with shifted differences of squares beneath them. Extremal sets sit under constructions and bounds. Rotations/reflections form one pool regardless of whether a solution uses Burnside or direct orbit reasoning.

The larger number of parent filings is intentional: removing a technique split puts genuine general equations, functions or polynomial questions at their subject parent. It is not a reason to restore method-only leaves. The final single-child branches all have direct problems or card homes; the empty power wrapper was removed.

TQ20 is resolved and implemented as multi-stage journeys/stops after nine distinct reviewed examples. No other new archetype is warranted by this pass. P64–P68 remain pending card proposals, not blockers to these existing-node decisions. No new cards were silently created.

## Every baseline sparse leaf

This table closes all 57 baseline review prompts, rather than treating low frequency as an automatic deletion rule. The deletion and semantic-refiling pools were read in full; retained, unchanged pools received a category/home review, not a second complete mathematical audit. Counts use the conservative exact-strategy twin detector, so reworded twins may still count separately. Advanced topics remain when a neighboring elementary category would change their meaning.

| Baseline leaf | Before distinct | Current direct distinct | Decision and reason |
|---|---:|---:|---|
| `alg.eq.radical.infinite` | 0 | retired | Retire → Radicals and nested expressions; both cards retained. |
| `geo.basic.angle.parallel` | 0 | retired | Retire → Angles, except the trapezoid-angle card → Trapezoids; all three cards retained. |
| `alg.eq.linear.param` | 1 | retired | Retire: its sole entry is a rational equation, not a system; file under Equations. |
| `alg.fn.feq.cauchy` | 1 | 1 | Retain, renamed for additive/multiplicative equations: a specific functional relation, distinct from arbitrary functional identities. |
| `alg.ineq.means.rearrange` | 1 | 1 | Retain: ordered-variable inequality problems differ from norm/square bounds; do not erase advanced inequality coverage because of this contest sample. |
| `alg.poly.higher.palin` | 1 | retired | Retire → Higher-degree polynomial equations; semantic exceptions and card home recorded in the polynomial batch. |
| `alg.word.ratio.vary` | 1 | retired | Retire → Ratios; the lone inverse-variation graph keeps its graph-reading subject. |
| `cp.basic.case.cases` | 1 | 1 | Retain the single whole-case-analysis problem under the explicit rule 3b exception; incidental casework tags have already been removed. |
| `cp.struct.part.partition` | 1 | 1 | Retain: unordered integer partitions differ from ordered compositions and labeled-box distributions. |
| `geo.circ.cyclic.brahmagupta` | 1 | retired | Retire → Cyclic quadrilaterals for both cards; the problem is tangential-quadrilateral optimization. |
| `nt.dio.bound.exp` | 1 | 1 | Retain: integer unknowns in exponents define a distinct Diophantine family; elementary bounded counting is not an equivalent home. |
| `nt.div.gcd.bezout` | 1 | 1 | Retain: gcd as an integer linear combination has a distinct scope from evaluating a gcd or lcm. |
| `nt.divisor.phi.mult` | 1 | 1 | Retain: arithmetic-function identities and inversion are distinct from elementary divisor counts. |
| `nt.mod.qr` | 1 | 1 | Retain: square residues form a coherent number-theory subject with five reference homes; small corpus coverage is not duplication. |
| `alg.eq.matrix` | 2 | 2 | Retain: matrix equations and determinants are an independent algebraic subject, with nine reference homes. |
| `alg.ineq.means.cs` | 2 | 2 | Retain: square/norm bounds form a coherent inequality family, distinct from ordered-variable inequalities. |
| `cp.basic.principle.tree` | 2 | retired | Retire: the two entries are reachable-operation counts and coin trials; listing remains a method card. |
| `cp.exp.var` | 2 | 2 | Retain the already consolidated variance/distribution pool; it differs from computing a mean or waiting time. |
| `cp.graph.basic.trees` | 2 | 2 | Retain: connectivity and disconnected-network bounds are graph properties, not a generic extremal technique. |
| `geo.basic.sim.congruent` | 2 | 2 | Retain: congruence fixes scale and shape; similarity is a different condition. |
| `geo.comb.count.dissect` | 2 | 2 | Retain: decomposing geometric figures is distinct from counting regions formed by intersecting lines. |
| `geo.tri.centers.euler` | 2 | 2 | Retain: Euler-line/nine-point configurations remain distinct from incircle, centroid and circumcircle problems. |
| `alg.cx.unity.filter` | 3 | retired | Retire: both entries use the filter as a tool in probability; retain its card at Roots of unity. |
| `alg.eq.radical.denest` | 3 | 3 | Retain: a nested quadratic radical has a precise form and domain constraints, unlike generic radical simplification. |
| `alg.fn.basic.inverse` | 3 | 3 | Retain: inverse functions and involutions are distinct from composition or graph reading. |
| `alg.fn.graph.linear` | 3 | 3 | Retain: slope/intercept graph behavior is a real family, not equivalent to solving a linear equation. |
| `alg.poly.introot.divides` | 3 | retired | Retire → Integer roots; coefficient divisibility remains on its card. |
| `alg.trig.eq.inverse` | 3 | 3 | Retain: inverse trigonometric functions carry branch/domain conditions absent from direct trigonometric equations. |
| `cp.basic.perm.cycle` | 3 | 3 | Retain: permutation cycles and powers are not circular seating or unrestricted ordering. |
| `cp.logic.pigeon.extremal` | 3 | retired | Retire: file actual configurations; Dilworth → set families and the general extremal method → no subject home. |
| `cp.struct.catalan` | 3 | 3 | Retain: prefix-constrained paths and ballot sequences are a coherent counting family. |
| `cp.struct.seat.derange` | 3 | 3 | Retain: fixed-point restrictions differ from adjacency restrictions and circular arrangements. |
| `geo.circ.proj` | 3 | 3 | Retain the existing advanced-geometry pool (19 homes): inversion, radical axes and projective configurations have no equivalent elementary neighbor. Do not split it on this small sample. |
| `geo.comb.count.regions` | 3 | 3 | Retain: regions generated by intersections differ from cuts chosen to dissect a given shape. |
| `geo.tri.cevian.stewart` | 3 | retired | Retire: remaining filings use Stewart as a length tool; retain the card at Cevians. |
| `geo.tri.radii.ex` | 3 | 3 | Retain: excircle contacts and exradii are distinct from incircle configurations. |
| `nt.digit.decimal.terminate` | 3 | 3 | Retain: terminating-denominator conditions differ from repetends and periods. |
| `nt.dio.squares.triples` | 3 | 3 | Retain: integer solutions of the Pythagorean equation differ from real right-triangle lengths and general sums of squares. |
| `nt.mod.basic.rule` | 3 | retired | Retire: the three prime problems keep their prime subject; choose-modulus card → Modular arithmetic. |
| `nt.seq.special.fib` | 3 | 3 | Retain: Fibonacci/Lucas divisibility and identities are a named integer-sequence family, not an arbitrary recurrence. |
| `alg.fn.graph.rational` | 4 | 5 | Retain: now above the thin threshold after actual graph questions were recovered; asymptotes/holes are a coherent kind. |
| `alg.fn.op.props` | 4 | 4 | Retain: testing algebraic laws for a defined operation differs from evaluating that operation. |
| `alg.poly.construct.interp` | 4 | 8 | Retain: the prescribed-value/interpolation merger now supplies a larger coherent pool; value differences are not a competing leaf. |
| `alg.poly.remainder.values` | 4 | retired | Retire → Polynomial values, interpolation and finite differences; every card retained. |
| `cp.binom.identity.hockey` | 4 | 4 | Retain: sums with changing binomial upper indices differ from a single fixed-row expansion. |
| `cp.binom.identity.mod` | 4 | 4 | Retain: divisibility and residues of binomial coefficients are distinct from evaluating ordinary binomial sums. |
| `cp.exp.states` | 4 | 4 | Retain the already consolidated waiting-time/state-expectation pool; probabilities at a fixed step are different. |
| `cp.logic.game` | 4 | 4 | Retain the already consolidated strategic-game pool; optimal play is different from random-game probability. |
| `cp.struct.paths.obstacle` | 4 | 4 | Retain: required or forbidden intermediate points constrain paths differently from unrestricted endpoint counts. |
| `cp.tech.gf` | 4 | 1 | Retain only the actual coefficient-of-a-given-product question; remove three incidental generating-function labels. The name now states the coefficient-count scope. |
| `geo.circ.cyclic.tangential` | 4 | 4 | Retain: an incircle tangent to four sides is a coherent configuration, including the reviewed maximum-radius problem. |
| `geo.solid.prism.unit.views` | 4 | 4 | Retain: reconstructing/counting cubes from views is distinct from total surface area or volume. |
| `geo.tri.cevian.ceva` | 4 | 4 | Retain: concurrency/collinearity constraints are distinct from computing an arbitrary cevian length. |
| `geo.tri.trig.other` | 4 | 4 | Retain: triangle tangent/half-angle relations differ from sine-law and cosine-law subfamilies. |
| `nt.dio.linear.frob` | 4 | 4 | Retain: nonnegative representability and the largest unattainable amount differ from solving one linear equation. |
| `nt.mod.cycle.power` | 4 | 4 | Retain: the periodicity of a fixed power sequence differs from general congruence calculations. |
| `nt.seq.repr` | 4 | 4 | Retain: representation constraints and continued fractions are not ordinary recurrence evaluation. |

One additional leaf became thin during semantic cleanup: `cp.binom.thm.multinomial` now has two genuine expansion problems. Keep it: expanding a multivariable polynomial is a distinct kind; the two probability-trial questions using multinomial counts belong to probability. The old interpolation and rational-function leaves now exceed the threshold. No thin review prompt is left without a decision.

## Remaining signals and stopping point

Among label pairs shared by at least three distinct problems, the largest smaller-pool overlap is now 3/7, for logarithm/domain conditions and for general finite probability/distinct-object distributions. Those are different mathematical constraints, unlike the removed parent/child redundancy. The nine arithmetic/geometric-progression overlaps remain a useful control: simultaneous progression conditions can be genuine. These signals are candidates for routine maintenance when new problems arrive, not evidence for another blanket merge. The probability fallback, all triangle branches changed semantically, and both power/set overlap unions have complete disposition logs.

The tree is finalized for this corpus and ready for a separately authorized integration step. It is not a claim that every existing proof, figure or advanced reference card has had a fresh audit. Keep the recorded source-art caveat for 1994 AJHSME #4 and existing textbook source follow-ups; this work does not resume teaching-chapter revision.

## Reproducible validation

Run `node tools/tree-risk-audit.cjs` and `node tools/tree-structure-report.cjs` for live census data. Full repository gates, generated tree/shelf/notes checks, the five app Node suites, card-text regression, tree/audit regression suites, answer keys and diff checks pass. Browser checks cover Settings control fidelity and the restored tangent-circle paragraph in both themes, Practice answer bounds/clearing/submission, UI icons/list menus, accessibility and book search at desktop/mobile sizes. No new accessibility halo is added. Detailed validation is recorded in CHANGELOG.md.
