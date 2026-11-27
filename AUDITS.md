# Audits and reviews

This file collects the project audits, reviews and repair logs. The 2026-11-12 consolidation preserves the original historical sections. The grading checkpoint and its source audits are linked below.

## Arena consistency review (2026-11-25)

Arena uses the app’s space navigation, primary and secondary buttons, answer grader, math keypad, accessible dialog, and lesson and topic previews. Practice and Arena selection controls use the softer accent tint. Both space titles use the 30 px base heading.

Two differences remain for the owner’s review. At the default text size, Arena’s in-session heading is 24 px and its panel headings are 17 px. Practice uses 18 px and 16 px respectively. Arena’s difficulty options describe distance from the solver’s Elo, while the five Practice difficulty bands describe the selected pool. Those labels currently communicate different measurements.

The app-wide Special:Statistics personal summary lists Practice sets and Learn progress. Personal Arena figures currently appear on the Arena overview.

**Practice grading**

- [Practice grading and answer-key audit](#practice-grading-and-answer-key-audit)

**Topic tree**, newest decisions first:

- [Contest archive topic audit (2026-11-24)](#contest-archive-topic-audit-2026-11-24)
- [Tree finalization after the full tagging pass](#tree-finalization-after-the-full-tagging-pass), formerly `TREE-FINALIZATION.md`
- [Tree depth and practice capacity](#tree-depth-and-practice-capacity), formerly `TREE-CAPACITY.md`
- [Tree-only Practice a topic](#tree-only-practice-a-topic), formerly `TREE-PRACTICE.md`
- [Accuracy review 1: common tree labels](#accuracy-review-1-common-tree-labels), formerly `TREE-ACCURACY.md`
- [Accuracy review 2: geometry and progression controls](#accuracy-review-2-geometry-and-progression-controls), formerly `TREE-ACCURACY-2.md`
- [Accuracy review 3: progressions, solids and transformations](#accuracy-review-3-progressions-solids-and-transformations), formerly `TREE-ACCURACY-3.md`
- [Accuracy review 4: optimization, trig addition and circle powers](#accuracy-review-4-optimization-trig-addition-and-circle-powers), formerly `TREE-ACCURACY-4.md`
- [Accuracy review 5: GCD, LCM and divisor counts](#accuracy-review-5-gcd-lcm-and-divisor-counts), formerly `TREE-ACCURACY-5.md`
- [Tree audit after area regrouping](#tree-audit-after-area-regrouping), formerly `TREE-AUDIT.md`
- [Topic-tree restructuring review](#topic-tree-restructuring-review), formerly `TREE-REVIEW.md`
- [Tree repair log](#tree-repair-log), formerly `TREE-REPAIRS.md`

**Interface**:

- [Practice, contest and list-editor UI review](#practice-contest-and-list-editor-ui-review), formerly `UI-REVIEW.md`
- [Accessibility review](#accessibility-review), formerly `ACCESSIBILITY-REVIEW.md`


## Practice grading and answer-key audit

The final pass reconciled the full problem index with the live key registries. The 19,456 entries have 19,419 automatic grades, 20 voids and 17 self-checks. The final self-check review voided five printed questions with undefined results and the 2015 MMATHS probability question whose exact threshold is impractical to compute by hand. The remaining cases have review notes and are listed by problem. [Short-response audit and inventory](tools/answer-keys/short-answers.md) · [Multiple-choice audit](tools/answer-keys/README.md)

Validation covers every indexed grading disposition, every registered short-answer submission, mixed correct and incorrect alternatives, persisted grades and void behavior. The browser checks exercise a past-paper flow and verify that a voided slot requires no answer and appears in review. [Test and handoff instructions](PLAN.md#current-state-updated-2026-11-24)

## Topic tree

### Contest archive topic audit (2026-11-24)

The Practice archive lists 36 families across five groups, including separate historical listings for CHMMC and CMM. Each family appears once and links to its latest year. The displayed counts sum to all 19,456 indexed problems.

The topic census covered the entire index. The content review focused on the two technique-named counting pools, the two leaves with fewer than five distinct problems, the off-tree entries, and 32-entry samples of arithmetic, rectangles and squares, and general finite probability. For entries available only through their original papers, changes required a readable statement or solution. The three paper-only MATHCOUNTS entries in Complementary counting were checked against their papers.

| Measure | Before | After |
|---|---:|---:|
| Casework in finite counting | 60 | 19 |
| Complementary counting | 18 | 6 |
| Order of operations with integers, decimals and fractions | 364 | 351 |
| Rectangles and squares | 355 | 358 |
| General finite probability models | 264 | 257 |
| Filed in the topic tree | 19,374 | 19,379 |
| Empty leaves | 0 | 0 |

The pass corrected 84 entries. For example, 2012 MATHCOUNTS National Target #4 counts triangles in a grid, 2025 MATHCOUNTS National Sprint #22 counts numbers under a digit condition, and 2026 MATHCOUNTS Chapter Target #4 counts arrangements with repeated colors. The last three now appear in their respective subject pools. Technique card links are preserved. Five problems formerly marked calculus admit elementary approaches, including equal subdivisions for Utah 2013 Senior #21, a squared-distance factorization for Utah 2017 Senior #36, and AM–GM for Utah 2019 Senior #13.

All 457 topic IDs are preserved. Four labels describe their contents more precisely, covering arithmetic, finite case counting, paths and walks on grids and graphs, and GCD with integer linear combinations. Both sparse leaves still collect recognizable subjects. Rearrangement, Chebyshev and Schur has two distinct problems, and the Bézout leaf has three after moving the nearest-fraction problem. The distinct tally collapses recognized AMC 10/12 twins. The broader geometry and probability pools retain room for materially different problems that share the same subject.

Reproduce the structural census with `node tools/tree-risk-audit.cjs` and validate filings with `node tools/check-topic-tree.js`. The browser checks cover the archive finder, contest pages, topic links and generation from the Practice topic picker.

#### Leaf placement and concentration follow-up

The Pythagorean theorem leaf now names the theorem explicitly. The Number Theory leaf for integer triples remains separate. Common tangents of two circles now sits alongside Tangent lines and tangent lengths, since a line can be tangent to both circles whether the circles touch, intersect or are disjoint. Expected value, variance and distributions now names the full scope of that branch. All three edits preserve the existing IDs.

The concentration check ranked leaf sizes and direct parent filings, then sampled Percent change, Arithmetic sequences, Linear systems, Angle chasing, Nonlinear systems, Similar triangles and Constructions and bounds across the archive. The clearest concentration was Right triangles. Of its 67 direct filings, 45 had a more specific confirmed home. The Pythagorean length leaf gained 34 entries and the special-right-triangle leaf gained four. Seven others went to coordinate distance, equilateral triangles, rectangles, reflected paths, geometric extremes or linear equations. For example, 2018 Lehigh #1 asks for the missing leg of a right triangle, 2007 Fermat #22 asks about a billiards path, and 2007 Pascal #19 asks for a reciprocal and had an incorrect Pythagorean card link. [Official 2007 Pascal paper](https://cemc.uwaterloo.ca/sites/default/files/documents/2007/2007PascalContest.pdf)

### Tree finalization after the full tagging pass

*Formerly `TREE-FINALIZATION.md`.*

2026-11-10. The subsequent owner-requested concentration check is complete in [Accuracy review 1: common tree labels](#accuracy-review-1-common-tree-labels): 242 distinct problems read, 56 corrected. A further 77-problem targeted review is recorded in [Accuracy review 2: geometry and progression controls](#accuracy-review-2-geometry-and-progression-controls), including retirement of the Heron-method leaf and four proof repairs. [Accuracy review 3: progressions, solids and transformations](#accuracy-review-3-progressions-solids-and-transformations) adds the 77-problem high-value-node review (34 corrections). [Accuracy review 4: optimization, trig addition and circle powers](#accuracy-review-4-optimization-trig-addition-and-circle-powers) adds 115 distinct problems read and 53 corrected, with eight proof repairs and retirement of the Grouping into products technique leaf. [Accuracy review 5: GCD, LCM and divisor counts](#accuracy-review-5-gcd-lcm-and-divisor-counts) adds 93 distinct GCD/LCM and divisor-count problems read, 55 corrected, four proof completions and an explicit source age-assumption caveat. Counts below include all five follow-ups. [Tree depth and practice capacity](#tree-depth-and-practice-capacity) measures depth and usable practice-pool sizes. The requested audit implementation is complete for the present corpus. [Tree repair log](#tree-repair-log) records every changed problem, retired id and affected card home. [Tree audit after area regrouping](#tree-audit-after-area-regrouping) retains the pre-repair evidence; [Topic-tree restructuring review](#topic-tree-restructuring-review) retains the larger area decisions. The later owner request implements only tree-backed T4 Practice options; [Tree-only Practice a topic](#tree-only-practice-a-topic) records that step. Techniques, labels/profiles and textbook revision remain deferred.

#### Final census and decisions

| Measure | Before semantic repairs | Final |
|---|---:|---:|
| Filed problems | 4,725 | 4,725 |
| Recognized distinct problems | 4,117 | 4,117 |
| Nodes | 482 | 457 |
| Areas | 28 | 28 |
| Terminal leaves | 337 | 314 |
| Leaves with fewer than five distinct problems | 57 | 42 |
| Unused leaves | 2 | 0 |
| Distinct problems touching thin leaves | 145 | 111 |
| Card homes on thin leaves | 140 | 114 |
| Cards with homes / general methods without | 740 / 34 | 739 / 35 |
| Distinct problems filed directly on a parent | 56 | 108 |

The original pre-pruning draft had 503 nodes; the full sequence removes 46 net nodes. All 774 cards survive. All 650 AMC 8, 350 AJHSME and ten HMMT problems remain filed and reviewed. The final label distribution is 3,458 problems with one label, 1,242 with two, and 25 with three. Twin equality and the absence of ancestor/descendant duplicate labels are enforced by the gate.

Keep the four subjects and 28 areas. Arithmetic is separated from applied quantities and statistics; counting separates arrangements, structures, coefficient/set counts, probability and discrete reasoning; divisibility, primes and divisors share an area. Right and similar triangles now sit with triangles; folding sits with transformations. Integer square/power conditions now sit in Diophantine equations, with shifted differences of squares beneath them. Extremal sets sit under constructions and bounds. Rotations/reflections form one pool regardless of whether a solution uses Burnside or direct orbit reasoning.

The larger number of parent filings is intentional: removing a technique split puts genuine general equations, functions or polynomial questions at their subject parent. It is not a reason to restore method-only leaves. The final single-child branches all have direct problems or card homes; the empty power wrapper was removed.

TQ20 is resolved and implemented as multi-stage journeys/stops after nine distinct reviewed examples. No other new archetype is warranted by this pass. P64–P69 remain pending card proposals, not blockers to these existing-node decisions. No new cards were silently created.

#### Every baseline sparse leaf

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
| `nt.dio.bound.exp` | 1 | 2 | Retain: integer unknowns in exponents define a distinct Diophantine family; elementary bounded counting is not an equivalent home. |
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
| `geo.tri.centers.euler` | 2 | 1 | Retain: Euler-line/nine-point configurations remain distinct from incircle, centroid and circumcircle problems. |
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
| `alg.poly.construct.interp` | 4 | 7 | Retain: the prescribed-value/interpolation merger now supplies a larger coherent pool; value differences are not a competing leaf. |
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
| `geo.tri.trig.other` | 4 | 6 | Retain: triangle tangent/half-angle relations differ from sine-law and cosine-law subfamilies. |
| `nt.dio.linear.frob` | 4 | 4 | Retain: nonnegative representability and the largest unattainable amount differ from solving one linear equation. |
| `nt.mod.cycle.power` | 4 | 4 | Retain: the periodicity of a fixed power sequence differs from general congruence calculations. |
| `nt.seq.repr` | 4 | 4 | Retain: representation constraints and continued fractions are not ordinary recurrence evaluation. |

One additional leaf became thin during semantic cleanup: `cp.binom.thm.multinomial` now has two genuine expansion problems. Keep it: expanding a multivariable polynomial is a distinct kind; the two probability-trial questions using multinomial counts belong to probability. The old interpolation and rational-function leaves now exceed the threshold. No thin review prompt is left without a decision.

#### Remaining signals and stopping point

Among label pairs shared by at least three distinct problems, the largest smaller-pool overlap is now 3/7, for logarithm/domain conditions and for general finite probability/distinct-object distributions. Those are different mathematical constraints, unlike the removed parent/child redundancy. The nine arithmetic/geometric-progression overlaps remain a useful control: simultaneous progression conditions can be genuine. These signals are candidates for routine maintenance when new problems arrive, not evidence for another blanket merge. The probability fallback, all triangle branches changed semantically, and both power/set overlap unions have complete disposition logs.

The tree is finalized for this corpus and ready for a separately authorized integration step. It is not a claim that every existing proof, figure or advanced reference card has had a fresh audit. Keep the recorded source-art caveat for 1994 AJHSME #4 and existing textbook source follow-ups; this work does not resume teaching-chapter revision.

#### Reproducible validation

Run `node tools/tree-risk-audit.cjs` and `node tools/tree-structure-report.cjs` for live census data. Full repository gates, generated tree/shelf/notes checks, the five app Node suites, card-text regression, tree/audit regression suites, answer keys and diff checks pass. Browser checks cover Settings control fidelity and the restored tangent-circle paragraph in both themes, Practice answer bounds/clearing/submission, UI icons/list menus, accessibility and book search at desktop/mobile sizes. No new accessibility halo is added. Detailed validation is recorded in CHANGELOG.md.

### Tree depth and practice capacity

*Formerly `TREE-CAPACITY.md`.*

2026-11-10, after the fifth focused accuracy review. **The hierarchy has enough depth; practice supply is uneven at its endpoints.** Adding levels is not a remedy for small pools. The corpus supports useful broader practice choices, but a tiny leaf is still common enough that the picker should show its count clearly.

#### What is counted

The corpus has 4,725 entries and 4,117 recognized distinct problems. The exact-strategy AMC 10/12 twin detector counts recognized same-year/season/letter pairs once; reworded twins can still count separately. A leaf pool is its direct filing. A branch pool is the union of all direct and descendant filings, so cofilings within that branch never double-count one problem. Depth follows explicit parents, not dotted id spelling. These are available tree-data counts, not measured user-choice probabilities. The subsequent tree-only T4 implementation now consumes these filings, displaying eligible counts after excluding voided/unkeyed entries and applying difficulty. The census above includes every filed entry, so an actual Practice count can be smaller. See the section "Tree-only Practice a topic".

Reproduce the summary with `node tools/tree-risk-audit.cjs` and inspect `capacity`. Tests cover moved ids, true depths, recognized twins, descendant unions, direct parent filings and per-family empty pools.

#### Depth and pool sizes

| Choice level | Choices | Minimum distinct | Median distinct | Maximum distinct | Fewer than 5 | Fewer than 10 |
|---|---:|---:|---:|---:|---:|---:|
| Areas | 28 | 55 | 151 | 389 | 0 | 0 |
| Internal topics (excluding subjects/areas) | 111 | 8 | 37 | 179 | 0 | 2 |
| Terminal leaves | 314 | 1 | 12 | 96 | 42 | 119 |
| All topics/subtopics (excluding subjects/areas) | 425 | 1 | 16 | 179 | 42 | 121 |

There are 19 leaves at level 3, 285 at level 4 and ten at level 5: **295/314 (93.9%) end at level 4 or 5**. Four-level paths are already normal. Every area has at least 55 distinct problems. Of 111 internal topic branches, **109 (98.2%) have at least ten**, and 93 have at least twenty. The two smallest internal topics are Totient and multiplicative functions (8) and Casework/complementary counting (9); those are specific sparse exceptions.

| Distinct problems in a leaf | Leaves | Share of leaves |
|---|---:|---:|
| 0 | 0 | 0.0% |
| 1–4 | 42 | 13.4% |
| 5–9 | 77 | 24.5% |
| 10–19 | 105 | 33.4% |
| 20–49 | 79 | 25.2% |
| 50+ | 11 | 3.5% |

Thus **42/314 (13.4%) leaves have fewer than five**, and **119/314 (37.9%) have fewer than ten**. Only 90 leaves can supply twenty distinct problems. There are no empty leaves. The 42 thin leaves touch 111 distinct problems (2.7% of the corpus); this overlap statistic is not a probability of choosing a sparse topic.

#### Where sparsity is concentrated

| Subject | Leaves | Median pool | Fewer than 5 | Fewer than 10 |
|---|---:|---:|---:|---:|
| Algebra | 102 | 12 | 9 | 39 |
| Counting & Probability | 75 | 9 | 14 | 38 |
| Geometry | 87 | 14 | 9 | 25 |
| Number Theory | 50 | 14 | 10 | 17 |

Counting has the weakest median leaf pool (9). Number Theory has the largest fraction of leaves below five (10/50); its median is still 14. This supports prioritizing practice supply for specific rare categories, rather than adding hierarchy everywhere. The largest leaf contains 96 distinct problems, so no leaf is an obviously unmanageable hundreds-of-problems catch-all on size alone.

#### A single contest family is much thinner

These rows consider the same 314 leaves using only the named family; they do not propose adding a filter. Zeroes can simply mean the topic lies outside that contest's syllabus. HMMT coverage here is only the ten imported geometry prompts, not its whole archive.

| Contest family | Nonempty leaves | Leaves with at least 10 | Median over all 314 leaves |
|---|---:|---:|---:|
| AMC 8/AJHSME | 175 | 24 | 1 |
| AMC 10/12 | 300 | 95 | 6 |
| AIME | 281 | 45 | 4 |
| HMMT | 17 | 0 | 0 |

Combined all-stage counts therefore cannot promise a full set for a student targeting one contest family or a narrow difficulty range. A large mixed pool may still contain few appropriate problems for that particular student.

#### Decisions for the next tree/picker step

1. Keep the present depth and keep internal topics selectable: their descendant unions already offer much more practice than the rarest leaves.
2. In T4, show the actual available pool count before the user starts a set. If a requested set exceeds it, offer the smaller set or let the user explicitly choose the parent; do not silently mix unrelated problems or repeat twins to pad it.
3. Keep semantically distinct advanced topics even when sparse. Expand their genuine source coverage when content work resumes; do not merge matrices into ordinary equations, for example, merely to increase a number.
4. Review broad high-use pools for coherent recurring subtypes only after reading them. The largest remaining pools include percentages (96), arithmetic sequences (89), rectangles/squares (85) and ratios (72). Counts alone do not justify new splits.
5. Keep correctness ahead of pool size. This pass reduced GCD/LCM 50→25 and divisor counts 43→35 while recovering appropriate money, ratio, factorial, probability and equation practice. Restoring incidental labels would make capacity look healthier while reducing relevance.

The later owner request implements only tree-backed topic practice, including counts and automatic set-size caps; the section "Tree-only Practice a topic" records it. Method-based targets, labels/profiles and textbook work remain deferred. The fifth accuracy report and [Tree finalization after the full tagging pass](#tree-finalization-after-the-full-tagging-pass) preserve the audit handoff.

### Tree-only Practice a topic

*Formerly `TREE-PRACTICE.md`.*

2026-11-10. The owner requested replacing the existing topic options with the tree first, deferring method-based practice. This implements that scoped T4 step. The tree itself is unchanged: 457 nodes, including the existing narrow Casework and Complementary counting branches. T4b/T5 labels, T6 contest profiles, technique targets and textbooks are not part of this change.

#### Behavior

- Practice a topic keeps its existing searchable suggestions, Questions slider, difficulty slider and untimed sessions. The empty field offers the four subjects. Search finds subject, area, topic and subtopic names, including parent context; suggestions show the path and available count, with at most seven matches and no internal scrollbar.
- Every option is a tree node, identified by its stable id. Card names, card keywords and the old non-tree Mixed option no longer populate this picker. Duplicate node names remain distinct through their paths and selected ids. Mathematical names have readable text in the input.
- A node's pool is the union of problems filed directly there and anywhere below it. Membership follows explicit parent links, never dotted-id prefixes or a card's subject/home. A cofiled problem appears once in a branch. Recognized exact-strategy AMC 10/12 twins are collapsed only for an unambiguous same-year/season/paper-letter pair, matching the audit; reworded twins remain the recorded limitation.
- New sets need an answer provider and exclude MAA-voided entries. Existing MAA/AJHSME statements and the ten already-attributed HMMT exact-value prompts are supported. Difficulty filtering applies after forming and deduplicating the selected node's pool. Sampling and ascending-Elo ordering remain as before.
- Counts reflect the actual eligible difficulty-filtered pool. A small topic lowers the Questions maximum instead of adding unrelated problems or repeating entries. The user's requested size is restored, within the available maximum, when they switch back to a larger pool. An unrecognized/ambiguous typed label needs a suggestion choice; it never falls back to a card keyword.
- New records save the node's `topicId` alongside the readable label and stable problem slugs. Previously saved keyword-based sets still resume and grade from their existing slugs. No saved set is regenerated or reclassified.

#### Implementation and validation

`js/practice-topics.js` builds the runtime index from `js/data/topic-tree.js` and the problem `tree` fields. `index.html` loads both before the app. `js/app.js` wires the existing picker to this index; the data, cards, tree ids and problem-page chips are unchanged.

`node tests/practice-topics.cjs`, now in the repository gates, checks every real tree pool against the audit oracle, explicit ancestry with moved ids, direct/descendant unions, cofilings, strict/ambiguous twins, eligibility, all ten exact-value prompts, duplicate-name resolution, every node's search reachability, math labels and saved ids. The five existing app Node suites and card-text checks pass.

`CHROME=/usr/bin/chromium COMPMATH_URL=http://localhost:8895 node tools/check-practice-topics.cjs` covers both themes at 1280/375px: tree-only options, root/branch/leaf selection, counts and difficulty, one-problem Casework generation, thirty-problem triangle generation, keyboard selection/Escape, persistent suggestions on scroll, reloading new sets, resuming old sets and generating/grading an untimed HMMT exact-value topic question. No page/KaTeX errors or horizontal overflow. Desktop and mobile screenshots were inspected.

The existing Practice action checks pass all four viewport/theme combinations, and all 36 accessibility scenarios pass. Full repository gates pass. Latest main is integrated additively before handoff; textbooks stay at 37/103 revised chapters.

### Accuracy review 1: common tree labels

*Formerly `TREE-ACCURACY.md`.*

2026-11-10. Owner-requested review of the four concentration signals after tree finalization. Read all 242 distinct problems (269 entries) in the union: similarity 62, general finite probability 71, root sums 60, log rules 50, with one shared problem. The one Casework filing was also checked as a control and retained. Changes propagate to recognized AMC twins.

Most cofilings were legitimate: a shape and a central similarity configuration, a finite random model and its event, or logarithms explicitly present in the statement. Found 56 distinct problems (65 raw entries) needing filing or proof corrections. All 459 nodes and 774 cards remain; no new tree split or card is required.

| Pool | Before distinct | After distinct |
|---|---:|---:|
| Similar triangles and ratios | 62 | 60 |
| General finite probability models | 71 | 62 |
| Sums and products of roots | 60 | 40 |
| Log rules and change of base | 50 | 46 |

The similarity child now has 31 distinct problems. Direct assignments to its parent fell from 46 to 29. This recovers existing specificity without inventing a branch. Vieta and similarity cards remain where the written solution uses them, even when their tree labels were incidental.

The only strategy-text change corrects the individual companion-root signs in 2020 AIME I #14; the sum -6 and final answer 85 remain correct. Exact substitution verifies all four roots. This is a statement/strategy/tag review of these pools, not a fresh visual audit of every source figure.

#### Every reviewed entry

Unchanged rows retain the subject classification after reading the statement and route. Changed rows have detailed rationale in the three accuracy-follow-up batches in the section "Tree repair log".

| Problem | Previous filing | Decision/current filing |
|---|---|---|
| 2026 AMC 10A, Problem 3 | `geo.basic.sim.similar`, `geo.tri.ratio.area` | `geo.basic.sim.parallel`, `geo.tri.ratio.area` |
| 2026 AMC 10A, Problem 9 | `geo.basic.sim.similar` | Retain |
| 2026 AMC 10A, Problem 13 | `cp.graph.basic.degree`, `alg.poly.vieta.basic` | `cp.graph.basic.degree` |
| 2026 AMC 10A, Problem 21 | `cp.struct.tile.tiling`, `cp.prob.basic.count` | Retain |
| 2026 AMC 12A, Problem 2 | `geo.basic.sim.similar`, `geo.tri.ratio.area` | `geo.basic.sim.parallel`, `geo.tri.ratio.area` |
| 2026 AMC 12A, Problem 15 | `alg.trig.identity.sum`, `alg.exp.log.rules` | Retain |
| 2026 AMC 12A, Problem 16 | `cp.struct.tile.tiling`, `cp.prob.basic.count` | Retain |
| 2026 AIME I, Problem 6 | `alg.exp.log.eq`, `alg.poly.vieta.basic`, `nt.divisor.count.tau` | `alg.exp.log.eq`, `nt.divisor.count.tau` |
| 1983 AIME, Problem 1 | `alg.exp.log.rules` | Retain |
| 1983 AIME, Problem 3 | `alg.eq.radical.eq`, `alg.poly.vieta.basic` | `alg.eq.radical.eq` |
| 1984 AIME, Problem 3 | `geo.basic.sim.parallel` | Retain |
| 1984 AIME, Problem 11 | `cp.basic.comb.gaps`, `cp.prob.basic.count` | Retain |
| 1984 AIME, Problem 15 | `alg.poly.construct.given`, `alg.poly.vieta.basic` | Retain |
| 1986 AIME, Problem 8 | `nt.divisor.count.sigma`, `alg.exp.log.rules` | Retain |
| 1986 AIME, Problem 9 | `geo.basic.sim.parallel` | Retain |
| 1987 AIME, Problem 13 | `cp.prob.basic.count`, `cp.logic.invariant.ops` | Retain |
| 1987 AIME, Problem 15 | `geo.basic.sim.similar`, `geo.poly.quad.rect` | Retain |
| 1988 AIME, Problem 5 | `nt.divisor.count.tau`, `cp.prob.basic.count` | Retain |
| 1991 AIME, Problem 2 | `geo.basic.sim.parallel`, `alg.seq.ap.arith` | Retain |
| 1991 AIME, Problem 7 | `alg.fn.basic.iterate`, `alg.poly.vieta.basic` | `alg.fn.basic.iterate` |
| 1991 AIME, Problem 8 | `alg.poly.vieta.basic`, `alg.eq.factor.sfft` | `alg.poly.introot` |
| 1994 AIME, Problem 13 | `alg.cx.unity.sums`, `alg.poly.vieta.basic` | Retain |
| 1995 AIME, Problem 2 | `alg.exp.log.eq`, `alg.poly.vieta.basic` | `alg.exp.log.eq` |
| 1995 AIME, Problem 5 | `alg.poly.vieta.basic`, `alg.poly.construct.given` | Retain |
| 1996 AIME, Problem 2 | `alg.fn.floor.eq`, `alg.exp.log.rules` | `alg.fn.floor.eq` |
| 1996 AIME, Problem 4 | `geo.solid.prism.box`, `geo.basic.sim.similar` | `geo.solid.prism.box` |
| 1997 AIME, Problem 14 | `alg.cx.unity.sums`, `cp.prob.basic.count` | Retain |
| 1998 AIME, Problem 6 | `geo.basic.sim.similar`, `geo.poly.quad.para` | `geo.basic.sim.parallel`, `geo.poly.quad.para` |
| 1999 AIME, Problem 10 | `cp.prob.basic.count`, `cp.graph.basic.paths` | Retain |
| 2000 AIME II, Problem 1 | `alg.exp.log.rules` | Retain |
| 2000 AIME II, Problem 8 | `geo.poly.quad.trap`, `geo.basic.sim.similar` | Retain |
| 2001 AIME I, Problem 3 | `alg.poly.vieta.basic`, `cp.binom.thm.coeff` | Retain |
| 2001 AIME I, Problem 7 | `geo.tri.radii.in`, `geo.basic.sim.parallel` | Retain |
| 2001 AIME I, Problem 10 | `cp.prob.basic.count`, `nt.div.rules.parity` | Retain |
| 2001 AIME I, Problem 15 | `cp.struct.tile.color`, `cp.prob.basic.count` | Retain |
| 2001 AIME II, Problem 13 | `geo.basic.sim.similar` | Retain |
| 2002 AIME I, Problem 1 | `cp.prob.basic.count`, `cp.tech.pie.venn` | Retain |
| 2002 AIME II, Problem 3 | `alg.seq.ap.geom`, `alg.exp.log.rules` | Retain |
| 2002 AIME II, Problem 14 | `geo.circ.tangent.inscribed`, `geo.basic.sim.similar` | Retain |
| 2002 AIME II, Problem 15 | `geo.circ.tangent.inscribed`, `alg.poly.vieta.basic` | `geo.circ.tangent.inscribed` |
| 2003 AIME I, Problem 4 | `alg.trig.identity.values`, `alg.exp.log.rules` | Retain |
| 2004 AIME II, Problem 10 | `nt.mod.cycle.power`, `cp.prob.basic.count` | Retain |
| 2005 AIME I, Problem 8 | `alg.exp.rules.eq`, `alg.poly.vieta.basic` | `alg.exp.rules.eq` |
| 2005 AIME I, Problem 9 | `cp.prob.basic.count`, `geo.solid.prism.unit.paint` | `cp.prob.cond.indep`, `geo.solid.prism.unit.paint` |
| 2006 AIME I, Problem 9 | `alg.exp.log.rules`, `nt.dio.linear.count` | Retain |
| 2006 AIME II, Problem 2 | `geo.tri.ineq.count`, `alg.exp.log.rules` | Retain |
| 2006 AIME II, Problem 12 | `geo.circ.inscribed.thm`, `geo.basic.sim.similar` | Retain |
| 2007 AIME I, Problem 7 | `alg.exp.log.rules`, `alg.fn.floor.sum` | `alg.fn.floor.sum` |
| 2007 AIME I, Problem 15 | `geo.tri.special.equil`, `geo.basic.sim.similar` | Retain |
| 2007 AIME II, Problem 10 | `cp.prob.basic.count`, `cp.basic.comb.subsets` | Retain |
| 2007 AIME II, Problem 12 | `alg.seq.ap.geom`, `alg.exp.log.rules` | Retain |
| 2008 AIME I, Problem 2 | `geo.poly.composite.overlap`, `geo.basic.sim.similar` | `geo.poly.composite.overlap`, `geo.basic.sim.parallel` |
| 2008 AIME I, Problem 9 | `cp.prob.basic.count`, `cp.basic.perm.repeat` | `cp.prob.cond.indep`, `cp.basic.perm.repeat` |
| 2008 AIME II, Problem 5 | `geo.poly.quad.trap`, `geo.basic.sim.similar` | `geo.poly.quad.trap`, `geo.basic.sim.parallel` |
| 2008 AIME II, Problem 7 | `alg.poly.vieta.basic`, `alg.eq.identity.symmetric` | Retain |
| 2009 AIME I, Problem 7 | `alg.seq.sum.telescope`, `alg.exp.log.rules` | Retain |
| 2009 AIME II, Problem 2 | `alg.exp.log.rules` | Retain |
| 2009 AIME II, Problem 3 | `geo.poly.quad.rect`, `geo.basic.sim.similar` | Retain |
| 2010 AIME II, Problem 4 | `cp.prob.basic.count` | Retain |
| 2010 AIME II, Problem 5 | `alg.eq.identity.symmetric`, `alg.exp.log.rules` | `alg.exp.log.eq` |
| 2010 AIME II, Problem 7 | `alg.poly.vieta.basic`, `alg.poly.construct.given` | Retain |
| 2011 AIME I, Problem 10 | `geo.comb.count.points`, `cp.prob.basic.count` | Retain |
| 2011 AIME I, Problem 15 | `alg.poly.vieta.basic`, `nt.dio.squares.sums` | `alg.poly.introot`, `nt.dio.squares` |
| 2012 AIME I, Problem 14 | `alg.poly.vieta.basic`, `alg.cx.polar.plane` | Retain |
| 2013 AIME I, Problem 4 | `cp.tech.sym`, `cp.prob.basic.count` | Retain |
| 2013 AIME I, Problem 8 | `alg.fn.graph.domain`, `alg.exp.log.rules` | Retain |
| 2013 AIME I, Problem 10 | `alg.poly.vieta.basic`, `nt.dio.squares.sums` | Retain |
| 2014 AIME I, Problem 9 | `alg.poly.vieta.basic` | Retain |
| 2014 AIME I, Problem 12 | `cp.prob.basic.count`, `cp.tech.stars.distinct` | Retain |
| 2014 AIME II, Problem 5 | `alg.poly.vieta.basic` | Retain |
| 2015 AIME I, Problem 7 | `geo.basic.sim.similar`, `geo.poly.quad.rect` | Retain |
| 2015 AIME II, Problem 4 | `geo.poly.quad.trap`, `alg.exp.log.rules` | Retain |
| 2015 AIME II, Problem 5 | `cp.prob.basic.count` | Retain |
| 2015 AIME II, Problem 6 | `alg.poly.vieta.basic`, `nt.dio.squares.sums` | Retain |
| 2015 AIME II, Problem 7 | `geo.basic.sim.similar`, `geo.tri.area.heron` | `geo.basic.sim.parallel`, `geo.poly.quad.rect` |
| 2015 AIME II, Problem 11 | `geo.basic.sim.similar`, `geo.circ.inscribed.thm` | Retain |
| 2018 AIME I, Problem 12 | `cp.basic.comb.subsets`, `cp.prob.basic.count` | Retain |
| 2018 AIME II, Problem 7 | `geo.basic.sim.similar` | `geo.basic.sim.parallel` |
| 2019 AIME I, Problem 2 | `cp.prob.basic.count` | Retain |
| 2019 AIME I, Problem 6 | `geo.basic.pyth.altitude`, `geo.basic.sim.similar` | Retain |
| 2019 AIME I, Problem 10 | `alg.poly.vieta.basic`, `alg.poly.vieta.newton` | Retain |
| 2019 AIME II, Problem 1 | `geo.basic.sim.similar`, `geo.poly.composite.overlap` | `geo.basic.sim.parallel`, `geo.poly.composite.overlap` |
| 2019 AIME II, Problem 7 | `geo.basic.sim.parallel` | Retain |
| 2019 AIME II, Problem 11 | `geo.circ.inscribed.chords`, `geo.basic.sim.similar` | Retain |
| 2020 AIME I, Problem 9 | `nt.divisor.count.tau`, `cp.prob.basic.count` | Retain |
| 2020 AIME I, Problem 11 | `alg.poly.vieta.basic`, `alg.fn.basic.compose` | Retain |
| 2020 AIME I, Problem 14 | `alg.poly.vieta.basic`, `alg.fn.basic.compose` | Retain filing; correct companion-root signs |
| 2020 AIME II, Problem 11 | `alg.poly.vieta.basic`, `alg.poly.quad.roots` | Retain |
| 2021 AIME I, Problem 2 | `geo.poly.composite.overlap`, `geo.basic.sim.similar` | Retain |
| 2021 AIME II, Problem 4 | `alg.poly.vieta.basic`, `alg.poly.construct.given` | Retain |
| 2021 Spring AMC 10B, Problem 22 | `cp.tech.pie.general`, `cp.prob.basic.count` | Retain |
| 2021 Spring AMC 12A, Problem 12 | `alg.poly.vieta.basic`, `alg.poly.construct.coeff` | Retain |
| 2021 Spring AMC 12A, Problem 22 | `alg.trig.eq.many`, `alg.poly.vieta.basic` | Retain |
| 2022 AIME I, Problem 9 | `cp.prob.basic.count`, `cp.basic.perm.repeat` | Retain |
| 2022 AIME II, Problem 11 | `geo.tri.cevian.bisector`, `geo.basic.sim.similar`, `geo.tri.area.heron` | `geo.tri.cevian.bisector`, `geo.basic.sim.similar` |
| 2022 AMC 10A, Problem 13 | `geo.tri.cevian.bisector`, `geo.basic.sim.similar` | `geo.tri.cevian.bisector`, `geo.basic.sim.parallel` |
| 2022 AMC 10A, Problem 16 | `alg.poly.vieta.basic`, `alg.poly.vieta.transform` | `alg.poly.vieta.transform` |
| 2023 AIME I, Problem 1 | `cp.prob.basic.count`, `cp.struct.seat.circle` | Retain |
| 2023 AIME I, Problem 9 | `alg.poly.remainder.factor`, `alg.poly.vieta.basic` | Retain |
| 2023 AIME II, Problem 3 | `geo.basic.sim.similar`, `geo.basic.angle.polygon` | `geo.basic.sim.similar` |
| 2023 AMC 10A, Problem 25 | `cp.prob.basic.count`, `cp.graph.basic.paths` | Retain |
| 2023 AMC 10B, Problem 21 | `cp.prob.basic.count`, `cp.tech.stars.distinct` | `cp.prob.cond.indep`, `cp.tech.stars.distinct` |
| 2023 AMC 12A, Problem 15 | `geo.basic.sim.similar`, `geo.poly.quad.rect` | `geo.poly.quad.rect`, `geo.tri.trig.other` |
| 2023 AMC 12A, Problem 19 | `alg.exp.log.eq`, `alg.poly.vieta.basic` | `alg.exp.log.eq` |
| 2023 AMC 12A, Problem 21 | `cp.prob.basic.count`, `cp.graph.basic.paths` | Retain |
| 2023 AMC 12B, Problem 7 | `alg.exp.log.rules`, `alg.ineq.solve.rational` | `alg.exp.log.rules`, `alg.fn.graph.domain` |
| 2023 AMC 12B, Problem 19 | `cp.prob.basic.count`, `cp.tech.stars.distinct` | `cp.prob.cond.indep`, `cp.tech.stars.distinct` |
| 2024 AIME I, Problem 11 | `cp.prob.basic.count`, `cp.tech.sym` | Retain |
| 2024 AIME II, Problem 5 | `geo.poly.general.irregular`, `geo.basic.sim.similar` | `geo.poly.general.irregular`, `geo.basic.sim.parallel` |
| 2024 AMC 10B, Problem 10 | `geo.poly.quad.para`, `geo.tri.ratio.area`, `geo.basic.sim.similar` | `geo.poly.quad.para`, `geo.tri.ratio.area`, `geo.basic.sim.parallel` |
| 2024 AMC 10B, Problem 11 | `geo.poly.quad.rect`, `geo.basic.sim.similar` | Retain |
| 2024 AMC 12A, Problem 23 | `alg.trig.eq.many`, `alg.cx.polar.demoivre`, `alg.poly.vieta.basic` | Retain |
| 2024 AMC 12B, Problem 7 | `geo.poly.quad.rect`, `geo.basic.sim.similar` | Retain |
| 2024 AMC 12B, Problem 15 | `geo.coord.area.shoelace`, `alg.exp.log.rules` | Retain |
| 2024 AMC 12B, Problem 17 | `alg.poly.introot`, `cp.prob.basic.count` | Retain |
| 2025 AIME I, Problem 7 | `cp.basic.comb.pairs`, `cp.prob.basic.count` | Retain |
| 2025 AIME I, Problem 11 | `alg.fn.graph.periodic`, `alg.poly.vieta.basic` | `alg.fn.graph.periodic` |
| 2025 AIME II, Problem 4 | `alg.exp.log.rules`, `alg.seq.sum.telescope` | Retain |
| 2025 AMC 10A, Problem 14 | `cp.prob.basic.count`, `cp.struct.seat.circle` | Retain |
| 2025 AMC 10A, Problem 15 | `geo.basic.sim.similar` | Retain |
| 2025 AMC 10A, Problem 18 | `alg.poly.vieta.basic` | Retain |
| 2025 AMC 12A, Problem 6 | `cp.prob.basic.count`, `cp.struct.seat.circle` | Retain |
| 2025 AMC 12A, Problem 7 | `alg.exp.log.rules`, `alg.exp.rules` | Retain |
| 2025 AMC 12A, Problem 12 | `alg.poly.vieta.basic` | Retain |
| 2025 AMC 12A, Problem 13 | `cp.prob.basic.count`, `cp.graph.sets` | Retain |
| 2025 AMC 12A, Problem 19 | `alg.poly.vieta.basic`, `alg.eq.identity.symmetric` | Retain |
| 2019 HMMT February Geometry, Problem 2 | `geo.poly.quad.rect`, `geo.basic.sim.similar` | Retain |
| 1985 AJHSME, Problem 22 | `cp.prob.basic.count`, `cp.struct.words.digits` | Retain |
| 1990 AJHSME, Problem 14 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 1997 AJHSME, Problem 9 | `cp.prob.basic.count`, `cp.basic.perm.distinct` | Retain |
| 2002 AMC 8, Problem 20 | `geo.basic.sim.similar`, `geo.tri.ratio.area` | `geo.basic.sim.parallel`, `geo.tri.ratio.area` |
| 2006 AMC 8, Problem 17 | `cp.prob.basic.count` | Retain |
| 2008 AMC 8, Problem 19 | `cp.prob.basic.count` | Retain |
| 2009 AMC 8, Problem 10 | `cp.prob.basic.count` | Retain |
| 2009 AMC 8, Problem 12 | `cp.prob.basic.count` | Retain |
| 2009 AMC 8, Problem 13 | `cp.prob.basic.count`, `cp.struct.words.digits` | Retain |
| 2011 AMC 8, Problem 12 | `cp.prob.basic.count`, `cp.struct.seat.circle` | Retain |
| 2015 AMC 8, Problem 11 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.struct.words.digits` |
| 2016 AMC 8, Problem 13 | `cp.prob.basic.count` | Retain |
| 2018 AMC 8, Problem 11 | `cp.prob.basic.count`, `cp.basic.perm.restrict` | Retain |
| 2018 AMC 8, Problem 20 | `geo.basic.sim.parallel` | Retain |
| 2018 AMC 8, Problem 22 | `geo.basic.sim.parallel` | Retain |
| 2019 AMC 8, Problem 6 | `cp.prob.basic.count`, `geo.coord.transform.reflect` | Retain |
| 2020 AMC 8, Problem 13 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2022 AMC 8, Problem 12 | `cp.prob.basic.count` | Retain |
| 2023 AMC 8, Problem 23 | `cp.prob.basic.count`, `cp.struct.tile.tiling` | `cp.prob.cond.indep`, `cp.struct.tile.tiling` |
| 2024 AMC 8, Problem 25 | `cp.prob.basic.count`, `cp.basic.comb.gaps` | Retain |
| 2002 AMC 10A, Problem 14 | `alg.poly.vieta.basic`, `nt.prime.basic.expr` | Retain |
| 2002 AMC 10A, Problem 20 | `geo.basic.sim.parallel` | Retain |
| 2002 AMC 10A, Problem 24 | `cp.prob.basic.count` | Retain |
| 2002 AMC 12A, Problem 12 | `alg.poly.vieta.basic`, `nt.prime.basic.expr` | Retain |
| 2002 AMC 12A, Problem 14 | `alg.exp.log.rules` | Retain |
| 2002 AMC 12A, Problem 16 | `cp.prob.basic.count` | Retain |
| 2002 AMC 12A, Problem 23 | `geo.tri.cevian.bisector`, `geo.basic.sim.similar` | Retain |
| 2002 AMC 10B, Problem 10 | `alg.poly.vieta.basic` | Retain |
| 2002 AMC 12B, Problem 6 | `alg.poly.vieta.basic` | Retain |
| 2002 AMC 12B, Problem 22 | `alg.exp.log.rules` | Retain |
| 2003 AMC 10A, Problem 5 | `alg.poly.vieta.basic` | `alg.poly.vieta.transform` |
| 2003 AMC 10A, Problem 18 | `alg.poly.vieta.basic` | Retain |
| 2003 AMC 12A, Problem 21 | `alg.poly.vieta.basic` | Retain |
| 2003 AMC 12A, Problem 24 | `alg.exp.log.rules`, `alg.ineq.means.amgm` | Retain |
| 2003 AMC 10B, Problem 20 | `geo.basic.sim.parallel` | Retain |
| 2003 AMC 12B, Problem 14 | `geo.basic.sim.parallel` | Retain |
| 2003 AMC 12B, Problem 19 | `cp.prob.basic.count`, `cp.basic.perm.restrict` | Retain |
| 2004 AMC 10A, Problem 5 | `geo.comb.count.points`, `cp.prob.basic.count` | Retain |
| 2004 AMC 12A, Problem 16 | `alg.fn.graph.domain`, `alg.exp.log.rules` | Retain |
| 2004 AMC 12A, Problem 23 | `alg.poly.vieta.basic` | Retain |
| 2004 AMC 12B, Problem 14 | `geo.basic.sim.similar` | Retain |
| 2004 AMC 12B, Problem 17 | `alg.poly.vieta.basic` | Retain |
| 2004 AMC 12B, Problem 23 | `alg.poly.vieta.basic` | Retain |
| 2005 AMC 10A, Problem 9 | `cp.prob.basic.count`, `cp.basic.perm.repeat` | Retain |
| 2005 AMC 12A, Problem 23 | `cp.prob.basic.count`, `alg.exp.log.rules` | Retain |
| 2005 AMC 12B, Problem 13 | `alg.exp.log.rules`, `alg.seq.sum.telescope` | Retain |
| 2005 AMC 12B, Problem 17 | `nt.div.prime.factor`, `alg.exp.log.rules` | Retain |
| 2006 AMC 10B, Problem 14 | `alg.poly.vieta.basic` | `alg.poly.vieta.transform` |
| 2007 AMC 12A, Problem 21 | `alg.poly.vieta.basic` | Retain |
| 2007 AMC 10B, Problem 19 | `cp.prob.basic.count`, `nt.mod.basic.arith` | Retain |
| 2007 AMC 10B, Problem 21 | `geo.basic.sim.similar` | `geo.basic.sim.parallel` |
| 2008 AMC 12A, Problem 16 | `alg.exp.log.rules`, `alg.seq.ap.arith` | Retain |
| 2008 AMC 10B, Problem 9 | `alg.poly.vieta.basic` | Retain |
| 2008 AMC 10B, Problem 22 | `cp.basic.perm.repeat`, `cp.prob.basic.count` | Retain |
| 2008 AMC 12B, Problem 14 | `alg.exp.log.rules` | Retain |
| 2008 AMC 12B, Problem 23 | `nt.divisor.count.tau`, `alg.exp.log.rules` | Retain |
| 2009 AMC 10A, Problem 23 | `geo.basic.sim.parallel`, `geo.tri.ratio.area` | Retain |
| 2009 AMC 12A, Problem 14 | `geo.tri.ratio.area`, `alg.poly.vieta.basic` | `geo.tri.ratio.area` |
| 2009 AMC 12A, Problem 20 | `geo.basic.sim.parallel`, `geo.tri.ratio.area` | Retain |
| 2009 AMC 12A, Problem 24 | `alg.exp.log.rules` | Retain |
| 2009 AMC 10B, Problem 18 | `geo.basic.sim.similar` | Retain |
| 2009 AMC 10B, Problem 25 | `cp.prob.basic.count` | `cp.prob.cond.indep` |
| 2009 AMC 12B, Problem 16 | `geo.basic.sim.parallel` | Retain |
| 2009 AMC 12B, Problem 17 | `cp.prob.basic.count` | `cp.prob.cond.indep` |
| 2010 AMC 10A, Problem 21 | `alg.poly.vieta.basic` | Retain |
| 2010 AMC 10B, Problem 18 | `nt.mod.basic.arith`, `cp.prob.basic.count` | Retain |
| 2010 AMC 12B, Problem 16 | `nt.mod.basic.arith`, `cp.prob.basic.count` | Retain |
| 2011 AMC 12A, Problem 13 | `geo.basic.sim.parallel`, `geo.tri.radii.in` | Retain |
| 2011 AMC 12A, Problem 14 | `cp.prob.basic.count` | Retain |
| 2011 AMC 10B, Problem 9 | `geo.basic.sim.similar` | Retain |
| 2011 AMC 12B, Problem 25 | `alg.fn.floor.eq`, `cp.prob.basic.count` | Retain |
| 2012 AMC 10A, Problem 20 | `cp.prob.basic.count`, `cp.tech.sym` | Retain |
| 2012 AMC 12A, Problem 15 | `cp.prob.basic.count`, `cp.tech.sym` | Retain |
| 2013 AMC 10A, Problem 12 | `geo.basic.sim.parallel` | Retain |
| 2013 AMC 12A, Problem 9 | `geo.basic.sim.parallel` | Retain |
| 2013 AMC 12A, Problem 14 | `alg.exp.log.rules`, `alg.seq.ap.geom` | Retain |
| 2013 AMC 12A, Problem 21 | `alg.exp.log.rules`, `alg.word.compute.estimate` | Retain |
| 2013 AMC 12B, Problem 13 | `geo.basic.sim.similar`, `geo.basic.angle.polygon` | Retain |
| 2013 AMC 12B, Problem 25 | `alg.cx.polar.arith`, `alg.poly.vieta.basic` | Retain |
| 2014 AMC 12A, Problem 18 | `alg.fn.graph.domain`, `alg.exp.log.rules` | Retain |
| 2014 AMC 12B, Problem 15 | `alg.exp.log.rules` | Retain |
| 2014 AMC 12B, Problem 20 | `alg.exp.log.rules`, `alg.ineq.solve.quad` | Retain |
| 2015 AMC 10A, Problem 23 | `alg.poly.vieta.basic`, `nt.dio.factor.sfft` | `alg.poly.introot` |
| 2015 AMC 12A, Problem 18 | `alg.poly.vieta.basic`, `nt.dio.factor.sfft` | `alg.poly.introot` |
| 2015 AMC 12A, Problem 24 | `cp.prob.basic.count`, `alg.cx.polar.demoivre` | Retain |
| 2015 AMC 10B, Problem 11 | `cp.prob.basic.count`, `nt.prime.basic.test` | Retain |
| 2015 AMC 10B, Problem 16 | `cp.prob.basic.count` | Retain |
| 2015 AMC 12B, Problem 6 | `cp.prob.basic.count` | Retain |
| 2015 AMC 12B, Problem 8 | `alg.exp.log.rules` | Retain |
| 2016 AMC 10A, Problem 17 | `cp.prob.basic.count`, `cp.basic.perm.repeat` | Retain |
| 2016 AMC 10A, Problem 19 | `geo.basic.sim.parallel` | Retain |
| 2016 AMC 12A, Problem 13 | `cp.prob.basic.count`, `cp.basic.perm.repeat` | Retain |
| 2016 AMC 12A, Problem 16 | `alg.exp.log.rules`, `alg.fn.graph.intersect` | Retain |
| 2016 AMC 12A, Problem 24 | `alg.poly.vieta.basic`, `alg.ineq.means.amgm` | Retain |
| 2017 AMC 10A, Problem 21 | `geo.basic.sim.similar` | Retain |
| 2017 AMC 12A, Problem 19 | `geo.basic.sim.similar` | Retain |
| 2017 AMC 10B, Problem 22 | `geo.circ.inscribed.thm`, `geo.basic.sim.similar` | Retain |
| 2017 AMC 12B, Problem 18 | `geo.circ.inscribed.thm`, `geo.basic.sim.similar` | Retain |
| 2017 AMC 12B, Problem 24 | `geo.basic.sim.similar`, `geo.coord.area.shoelace` | Retain |
| 2018 AMC 10A, Problem 19 | `nt.mod.cycle.last`, `cp.prob.basic.count` | Retain |
| 2018 AMC 12B, Problem 7 | `alg.exp.log.rules`, `alg.seq.sum.telescope` | Retain |
| 2019 AMC 10A, Problem 20 | `cp.struct.tile.fill`, `cp.prob.basic.count` | Retain |
| 2019 AMC 10A, Problem 24 | `alg.poly.vieta.basic` | Retain |
| 2019 AMC 12A, Problem 12 | `alg.exp.log.rules` | `alg.exp.log.eq` |
| 2019 AMC 12A, Problem 14 | `alg.poly.vieta.basic`, `alg.cx.polar.arith` | Retain |
| 2019 AMC 12A, Problem 15 | `alg.exp.log.rules`, `nt.dio.squares.sums` | Retain |
| 2019 AMC 12A, Problem 16 | `cp.struct.tile.fill`, `cp.prob.basic.count` | Retain |
| 2019 AMC 12A, Problem 23 | `alg.fn.op.eval`, `alg.exp.log.rules` | Retain |
| 2019 AMC 12B, Problem 9 | `geo.tri.ineq.count`, `alg.exp.log.rules` | Retain |
| 2019 AMC 12B, Problem 21 | `alg.poly.vieta.basic` | Retain |
| 2020 AMC 10A, Problem 5 | `alg.eq.abs.eq`, `alg.poly.vieta.basic` | `alg.eq.abs.eq` |
| 2020 AMC 10A, Problem 15 | `nt.divisor.count.tau`, `cp.prob.basic.count` | Retain |
| 2020 AMC 12A, Problem 17 | `geo.coord.area.shoelace`, `alg.exp.log.rules` | Retain |
| 2020 AMC 12B, Problem 13 | `alg.exp.log.rules` | Retain |
| 2020 AMC 12B, Problem 20 | `cp.prob.basic.count`, `cp.tech.sym` | Retain |
| 2021 Spring AMC 10A, Problem 14 | `alg.poly.vieta.basic`, `alg.poly.construct.coeff` | Retain |
| 2021 Spring AMC 12A, Problem 6 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2021 Spring AMC 12A, Problem 14 | `alg.exp.log.rules` | Retain |
| 2021 Spring AMC 12B, Problem 9 | `alg.exp.log.rules` | Retain |
| 2021 Spring AMC 12B, Problem 11 | `geo.poly.quad.trap`, `geo.basic.sim.similar` | `geo.poly.quad.trap`, `geo.basic.sim.parallel` |
| 2022 AMC 12A, Problem 14 | `alg.exp.log.rules`, `alg.eq.identity.symmetric` | `alg.exp.log.rules` |
| 2022 AMC 12A, Problem 15 | `alg.poly.vieta.basic`, `alg.poly.vieta.transform` | `alg.poly.vieta.transform` |
| 2022 AMC 12A, Problem 22 | `alg.cx.polar.plane`, `alg.poly.vieta.basic`, `geo.poly.quad.trap` | `alg.cx.polar.plane`, `geo.poly.quad.trap` |
| 2022 AMC 10B, Problem 7 | `alg.poly.vieta.basic`, `nt.divisor.count.pairs` | `alg.poly.introot` |
| 2022 AMC 12B, Problem 4 | `alg.poly.vieta.basic`, `nt.divisor.count.pairs` | `alg.poly.introot` |
| 2025 AMC 12B, Problem 7 | `alg.seq.sum.telescope`, `alg.exp.log.rules` | Retain |
| 2025 AMC 12B, Problem 8 | `alg.poly.construct.given`, `alg.poly.vieta.basic` | Retain |
| 2000 AMC 10, Problem 5 | `geo.basic.sim.parallel` | Retain |
| 2000 AMC 10, Problem 19 | `geo.basic.sim.similar` | `geo.basic.sim.parallel` |
| 2000 AMC 10, Problem 24 | `alg.fn.basic.compose`, `alg.poly.vieta.basic` | `alg.fn.basic.compose` |
| 2000 AMC 12, Problem 15 | `alg.fn.basic.compose`, `alg.poly.vieta.basic` | `alg.fn.basic.compose` |
| 2000 AMC 12, Problem 21 | `geo.basic.sim.similar` | `geo.basic.sim.parallel` |
| 2000 AMC 12, Problem 22 | `alg.poly.vieta.basic`, `alg.fn.graph.intersect` | Retain |
| 2000 AMC 12, Problem 23 | `cp.prob.cond.bayes`, `alg.exp.log.rules` | Retain |
| 2001 AMC 12, Problem 19 | `alg.poly.vieta.basic` | Retain |
| 2001 AMC 12, Problem 22 | `geo.basic.sim.parallel`, `geo.tri.ratio.area` | Retain |
| 2021 Fall AMC 10A, Problem 21 | `cp.prob.basic.count`, `cp.tech.stars.distinct` | `cp.prob.cond.indep`, `cp.tech.stars.distinct` |
| 2021 Fall AMC 10B, Problem 13 | `geo.basic.sim.similar`, `geo.tri.special.isos` | `geo.basic.sim.parallel`, `geo.tri.special.isos` |
| 2021 Fall AMC 10B, Problem 15 | `geo.poly.quad.rect`, `geo.basic.sim.similar` | Retain |
| 2021 Fall AMC 12A, Problem 18 | `cp.prob.basic.count`, `cp.tech.stars.distinct` | `cp.prob.cond.indep`, `cp.tech.stars.distinct` |
| 2021 Fall AMC 12A, Problem 21 | `geo.poly.quad.trap`, `geo.basic.sim.similar` | Retain |
| 2021 Fall AMC 12B, Problem 24 | `geo.circ.power.pop`, `geo.basic.sim.similar`, `geo.tri.trig.cosines` | Retain |

### Accuracy review 2: geometry and progression controls

*Formerly `TREE-ACCURACY-2.md`.*

2026-11-10. Read 77 distinct problems (85 contest entries): the complete Heron, coordinate-area, spatial-distance and right-triangle-length pools, all nine AP/GP cofilings, and the three factorization/radical cofilings. This is a targeted statement, strategy and tag review; original source art was not independently re-audited.

28 distinct problems (30 entries) changed. The Heron formula leaf is retired with both cards rehomed at Triangle area. Most literal coordinate/grid areas, spatial-distance questions and right-triangle configurations remain valid. Coordinates introduced only by the solution do not automatically earn a coordinate-area subject. All nine AP/GP cofilings remain: those statements impose both conditions. All 774 cards and 4,725 filings survive.

Four strategies receive substantive proof repairs: the disphenoid minimum now bounds all acute integer triangles; the pyramid height has a uniqueness proof; two progression problems allow rational ratios rather than assuming integer ratios. Their answers remain unchanged. Exact computations verify the corrected candidates. the section "Tree repair log" contains the detailed rationale and every affected card home.

| Problem | Previous filing | Current filing / disposition |
|---|---|---|
| 2026 AMC 10A, Problem 19 | `geo.solid.round.sphere`, `geo.solid.coord.dist` | Retain |
| 2026 AMC 12A, Problem 18 | `geo.solid.round.sphere`, `geo.solid.coord.dist` | Retain |
| 2026 AIME I, Problem 10 | `geo.coord.transform.rotate`, `geo.coord.area.shoelace` | `geo.coord.transform.rotate` |
| 1986 AIME, Problem 2 | `alg.eq.factor.squares`, `alg.eq.radical.simplify` | `alg.eq.radical.simplify` |
| 1986 AIME, Problem 14 | `geo.solid.prism.box`, `geo.solid.coord.dist` | Retain |
| 1987 AIME, Problem 2 | `geo.solid.coord.dist`, `geo.solid.round.sphere` | Retain |
| 1987 AIME, Problem 9 | `geo.tri.trig.cosines`, `geo.basic.pyth.triples` | Retain |
| 1999 AIME, Problem 12 | `geo.tri.radii.in`, `geo.tri.area.heron` | `geo.tri.radii.in` |
| 2002 AIME I, Problem 11 | `geo.comb.extreme.path`, `geo.solid.coord.dist` | Retain |
| 2002 AIME I, Problem 15 | `geo.solid.coord.dist`, `geo.solid.poly.euler` | Retain |
| 2002 AIME II, Problem 2 | `geo.solid.coord.dist`, `geo.solid.prism.box` | Retain |
| 2003 AIME I, Problem 8 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 2003 AIME II, Problem 14 | `geo.poly.general.irregular`, `geo.coord.area.shoelace` | Retain |
| 2004 AIME II, Problem 9 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 2005 AIME I, Problem 10 | `geo.coord.area.shoelace`, `geo.coord.line.slope` | Retain |
| 2005 AIME II, Problem 7 | `alg.eq.radical.simplify`, `alg.eq.factor.squares` | `alg.eq.radical.simplify` |
| 2006 AIME I, Problem 1 | `geo.basic.pyth.triples` | Retain |
| 2006 AIME II, Problem 15 | `geo.tri.area.heron`, `alg.eq.system.cyclic` | `alg.eq.system.cyclic` |
| 2009 AIME I, Problem 11 | `geo.coord.area.shoelace`, `nt.div.rules.parity` | Retain |
| 2010 AIME II, Problem 12 | `geo.tri.special.isos`, `geo.tri.area.heron` | `geo.tri.special.isos` |
| 2013 AIME I, Problem 7 | `geo.solid.prism.box`, `geo.solid.coord.dist` | `geo.solid.prism.box` |
| 2016 AIME I, Problem 10 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2016 AIME II, Problem 1 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2016 AIME II, Problem 9 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 2017 AIME II, Problem 10 | `geo.coord.area.shoelace`, `geo.poly.quad.rect` | `geo.poly.quad.rect` |
| 2018 AIME II, Problem 4 | `geo.poly.general.irregular`, `geo.coord.area.shoelace` | `geo.poly.general.irregular` |
| 2018 AIME II, Problem 9 | `geo.coord.area.shoelace`, `geo.basic.sim.figures` | `geo.basic.sim.figures`, `geo.tri.cevian.median` |
| 2018 AIME II, Problem 12 | `geo.poly.quad.general`, `geo.tri.area.heron` | `geo.poly.quad.general` |
| 2021 AIME I, Problem 6 | `geo.solid.coord.dist` | Retain |
| 2021 AIME I, Problem 9 | `geo.poly.quad.trap`, `geo.tri.area.heron` | `geo.poly.quad.trap` |
| 2021 AIME II, Problem 10 | `geo.solid.round.sphere`, `geo.solid.coord.dist` | Retain |
| 2022 AIME I, Problem 10 | `geo.solid.round.sphere`, `geo.solid.coord.dist` | Retain |
| 2023 AMC 10A, Problem 11 | `geo.basic.pyth.triples` | Retain |
| 2023 AMC 10A, Problem 17 | `geo.basic.pyth.triples`, `nt.dio.squares.triples` | Retain |
| 2023 AMC 12A, Problem 9 | `geo.basic.pyth.triples` | Retain |
| 2024 AMC 12A, Problem 10 | `alg.trig.identity.sum`, `geo.basic.pyth.triples` | `alg.trig.identity.sum` |
| 2024 AMC 12A, Problem 24 | `geo.solid.round.pyramid`, `geo.tri.area.heron` | `geo.solid.round.pyramid` |
| 2024 AMC 12B, Problem 15 | `geo.coord.area.shoelace`, `alg.exp.log.rules` | Retain |
| 2025 AIME II, Problem 1 | `geo.tri.area.heron`, `geo.tri.ratio.area` | `geo.tri.ratio.area` |
| 2025 AMC 10A, Problem 11 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 1996 AJHSME, Problem 22 | `geo.coord.area.shoelace` | Retain |
| 1999 AMC 8, Problem 23 | `geo.tri.area.base`, `geo.basic.pyth.triples` | `geo.basic.pyth.triples` |
| 2000 AMC 8, Problem 18 | `geo.coord.area.shoelace`, `geo.poly.general.perim` | Retain |
| 2001 AMC 8, Problem 11 | `geo.coord.area.shoelace` | Retain |
| 2003 AMC 8, Problem 6 | `geo.basic.pyth.triples`, `geo.tri.area.base` | Retain |
| 2004 AMC 8, Problem 14 | `geo.coord.area.shoelace` | Retain |
| 2005 AMC 8, Problem 7 | `geo.basic.pyth.triples` | Retain |
| 2007 AMC 8, Problem 23 | `geo.coord.area.shoelace` | Retain |
| 2013 AMC 8, Problem 23 | `geo.basic.pyth.triples` | Retain |
| 2014 AMC 8, Problem 14 | `geo.basic.pyth.triples` | Retain |
| 2015 AMC 8, Problem 19 | `geo.coord.area.shoelace` | Retain |
| 2016 AMC 8, Problem 22 | `geo.coord.area.shoelace` | `geo.poly.composite.add` |
| 2017 AMC 8, Problem 18 | `geo.basic.pyth.triples` | Retain |
| 2002 AMC 10B, Problem 22 | `geo.basic.pyth.triples` | Retain |
| 2002 AMC 12B, Problem 20 | `geo.basic.pyth.triples` | Retain |
| 2004 AMC 10A, Problem 18 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2004 AMC 12A, Problem 14 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2004 AMC 10B, Problem 8 | `geo.basic.pyth.triples` | Retain |
| 2004 AMC 12B, Problem 6 | `geo.basic.pyth.triples` | Retain |
| 2007 AMC 10A, Problem 18 | `geo.coord.area.shoelace` | `geo.poly.general.irregular` |
| 2007 AMC 12B, Problem 23 | `nt.dio.factor.sfft`, `geo.basic.pyth.triples` | `geo.basic.pyth.triples` |
| 2008 AMC 10B, Problem 15 | `geo.basic.pyth.triples` | Retain |
| 2009 AMC 10B, Problem 10 | `geo.basic.pyth.triples` | Retain |
| 2009 AMC 12B, Problem 13 | `geo.basic.pyth.triples` | Retain |
| 2010 AMC 10B, Problem 24 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain filing; complete proof |
| 2010 AMC 12B, Problem 19 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain filing; complete proof |
| 2012 AMC 10B, Problem 19 | `geo.coord.area.shoelace` | `geo.poly.quad.rect` |
| 2013 AMC 10A, Problem 18 | `geo.coord.area.shoelace` | Retain |
| 2013 AMC 12A, Problem 13 | `geo.coord.area.shoelace` | Retain |
| 2014 AMC 12B, Problem 9 | `geo.basic.pyth.triples` | Retain |
| 2016 AMC 10A, Problem 21 | `geo.circ.tangent.common`, `geo.coord.area.shoelace` | `geo.circ.tangent.common` |
| 2016 AMC 12A, Problem 15 | `geo.circ.tangent.common`, `geo.coord.area.shoelace` | `geo.circ.tangent.common` |
| 2017 AMC 12B, Problem 24 | `geo.basic.sim.similar`, `geo.coord.area.shoelace` | `geo.basic.sim.similar` |
| 2019 AMC 10A, Problem 7 | `geo.coord.area.shoelace` | Retain |
| 2019 AMC 12A, Problem 5 | `geo.coord.area.shoelace` | Retain |
| 2019 AMC 10B, Problem 15 | `geo.basic.pyth.triples` | Retain |
| 2019 AMC 10B, Problem 16 | `geo.tri.special.isos`, `geo.basic.pyth.triples` | Retain |
| 2019 AMC 12B, Problem 12 | `geo.tri.trig.other`, `geo.basic.pyth.triples` | Retain |
| 2019 AMC 12B, Problem 18 | `geo.solid.coord.dist`, `geo.solid.round.pyramid` | `geo.solid.round.pyramid` |
| 2020 AMC 12A, Problem 17 | `geo.coord.area.shoelace`, `alg.exp.log.rules` | Retain |
| 2021 Spring AMC 12B, Problem 14 | `geo.solid.round.pyramid`, `geo.solid.coord.dist` | Retain filing; complete proof |
| 2022 AMC 10A, Problem 20 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain filing; complete proof |
| 2022 AMC 10A, Problem 21 | `geo.solid.coord.dist`, `geo.poly.regular.hex` | `geo.solid.poly.nets`, `geo.poly.regular.hex` |
| 2022 AMC 10B, Problem 5 | `alg.eq.factor.squares`, `alg.eq.radical.simplify` | `alg.eq.radical.simplify` |
| 2025 AMC 10B, Problem 7 | `geo.basic.pyth.triples` | Retain |

### Accuracy review 3: progressions, solids and transformations

*Formerly `TREE-ACCURACY-3.md`.*

2026-11-10. Read 77 distinct problems (88 contest entries): all 54 arithmetic-sequence cofilings, all 18 problems in Nets and the polyhedron/regular-solid leaf, and all five reflection/rotation cofilings. The 49 sole-label AP problems and the remaining transformation pools are outside this targeted pass.

Corrected 34 distinct problems (39 entries). Arithmetic-sequence filings fall from 103 to 89 distinct problems: actual progression constraints remain, while incidental arithmetic-series computations do not add a subject. All nine AP/GP cofilings remain valid. The nets pool remains 11; its folding cases are genuine. The polyhedron leaf now has 6 problems and is named Regular solids, faces, edges and vertices, preserving its stable id and three card homes. Four mixed-transform questions explicitly impose both operations; the two-reflection case keeps only the reflection kind.

Proof clarifications: the 1988 AIME grid now states its row/column convention consistently, verified against its source figure; the five-prime progression argument handles the prime 3 exception; the 90-subset sum argument constructs every intermediate sum; and the octahedron/cube ratio computes the face centroids explicitly. Exact calculations verify the unchanged answers. No new cards or nodes are introduced, and all 774 cards and 4,725 filings survive.

Full repository gates, answer keys and tree/audit regression checks pass. The grid source figure was inspected; this is not a fresh visual audit of all net/solid source art. the section "Tree repair log" gives batch rationale.

| Problem | Previous filing | Current filing / decision |
|---|---|---|
| 2026 AIME II, Problem 1 | `alg.seq.ap.arith`, `nt.div.gcd.basic` | `alg.seq.ap.arith` |
| 1985 AIME, Problem 15 | `geo.solid.poly.nets`, `geo.solid.prism.box` | `geo.solid.poly.nets` |
| 1987 AIME, Problem 11 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 1988 AIME, Problem 6 | `alg.seq.ap.arith`, `cp.struct.tile.fill` | Retain filing; clarify proof |
| 1988 AIME, Problem 10 | `geo.solid.poly.euler` | Retain |
| 1989 AIME, Problem 7 | `alg.seq.ap.arith`, `nt.seq.power.squares` | Retain |
| 1990 AIME, Problem 14 | `geo.solid.round.pyramid`, `geo.solid.poly.nets` | Retain |
| 1991 AIME, Problem 2 | `geo.basic.sim.parallel`, `alg.seq.ap.arith` | `geo.basic.sim.parallel` |
| 1993 AIME, Problem 2 | `alg.eq.factor.squares`, `alg.seq.ap.arith` | `geo.basic.pyth.triples` |
| 1993 AIME, Problem 6 | `nt.mod.crt.system`, `alg.seq.ap.arith` | Retain |
| 1993 AIME, Problem 10 | `geo.solid.poly.euler` | Retain |
| 1999 AIME, Problem 1 | `nt.prime.basic.test`, `alg.seq.ap.arith` | Retain filing; clarify proof |
| 1999 AIME, Problem 15 | `geo.solid.round.pyramid`, `geo.solid.poly.nets` | Retain |
| 2000 AIME I, Problem 10 | `alg.eq.linear.system`, `alg.seq.ap.arith` | `alg.seq.ap.arith` |
| 2002 AIME I, Problem 15 | `geo.solid.coord.dist`, `geo.solid.poly.euler` | `geo.solid.coord.dist` |
| 2002 AIME II, Problem 4 | `geo.poly.regular.hex`, `alg.seq.ap.arith` | `geo.poly.regular.hex` |
| 2003 AIME I, Problem 2 | `geo.poly.composite.arcs`, `alg.seq.ap.arith` | `geo.poly.composite.arcs` |
| 2003 AIME I, Problem 8 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 2003 AIME II, Problem 8 | `alg.poly.construct.interp`, `alg.seq.ap.arith` | `alg.seq.ap.arith` |
| 2004 AIME I, Problem 3 | `geo.solid.poly.euler`, `cp.basic.comb.choose` | `geo.solid.poly.euler` |
| 2004 AIME II, Problem 9 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 2005 AIME I, Problem 2 | `alg.seq.ap.arith`, `nt.divisor.count.tau` | `alg.seq.ap.arith` |
| 2005 AIME II, Problem 10 | `geo.solid.poly.euler`, `geo.basic.sim.figures` | `geo.solid.poly.euler` |
| 2006 AIME I, Problem 2 | `cp.basic.comb.subsets`, `alg.seq.ap.arith` | `cp.basic.comb.subsets` |
| 2006 AIME II, Problem 13 | `nt.divisor.count.tau`, `alg.seq.ap.arith` | Retain |
| 2008 AIME I, Problem 15 | `geo.solid.poly.nets`, `geo.basic.pyth.fold` | `geo.solid.poly.nets` |
| 2009 AIME II, Problem 4 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2011 AIME II, Problem 3 | `geo.basic.angle.polygon`, `alg.seq.ap.arith` | Retain |
| 2012 AIME II, Problem 5 | `geo.solid.round.pyramid`, `geo.solid.poly.nets` | Retain |
| 2013 AIME I, Problem 15 | `nt.mod.basic.arith`, `alg.seq.ap.arith` | Retain |
| 2015 AIME I, Problem 1 | `alg.word.compute.clever`, `alg.seq.ap.arith` | `alg.word.compute.clever` |
| 2016 AIME I, Problem 10 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2016 AIME II, Problem 1 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2016 AIME II, Problem 9 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 2020 AIME II, Problem 8 | `alg.eq.abs.eq`, `alg.seq.ap.arith`, `alg.fn.basic.iterate` | `alg.eq.abs.eq`, `alg.fn.basic.iterate` |
| 2021 AIME I, Problem 5 | `alg.seq.ap.arith`, `nt.div.rules.expr` | `alg.seq.ap.arith` |
| 2022 AIME I, Problem 6 | `cp.basic.comb.condition`, `alg.seq.ap.arith` | Retain |
| 2023 AMC 10A, Problem 15 | `geo.poly.composite.arcs`, `alg.seq.ap.arith` | Retain |
| 2023 AMC 10A, Problem 18 | `geo.solid.poly.euler`, `cp.graph.basic.degree` | Retain |
| 2023 AMC 10B, Problem 23 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2024 AMC 10A, Problem 21 | `alg.seq.ap.arith`, `alg.eq.linear.system` | `alg.seq.ap.arith`, `cp.struct.tile.fill` |
| 2024 AMC 10B, Problem 5 | `alg.seq.ap.arith`, `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` |
| 2024 AMC 12A, Problem 14 | `alg.seq.ap.arith`, `alg.eq.linear.system` | `alg.seq.ap.arith`, `cp.struct.tile.fill` |
| 2024 AMC 12B, Problem 5 | `alg.seq.ap.arith`, `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` |
| 2025 AMC 10A, Problem 5 | `alg.seq.period.nth`, `alg.seq.ap.arith` | `alg.seq.period.nth` |
| 2025 AMC 10A, Problem 11 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 1985 AJHSME, Problem 11 | `geo.solid.poly.nets` | Retain |
| 1986 AJHSME, Problem 21 | `geo.solid.poly.nets` | Retain |
| 1986 AJHSME, Problem 25 | `alg.seq.ap.arith`, `alg.word.stats.mean` | `alg.word.stats.mean` |
| 1989 AJHSME, Problem 20 | `geo.solid.poly.nets` | Retain |
| 1990 AJHSME, Problem 18 | `geo.solid.poly.euler` | Retain |
| 1991 AJHSME, Problem 17 | `cp.basic.comb.gaps`, `alg.seq.ap.arith` | Retain |
| 1992 AJHSME, Problem 20 | `geo.solid.poly.nets` | Retain |
| 1999 AMC 8, Problem 8 | `geo.solid.poly.nets` | Retain |
| 2004 AMC 10A, Problem 18 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2004 AMC 12A, Problem 14 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2004 AMC 10B, Problem 21 | `alg.seq.ap.arith`, `cp.tech.pie.venn` | Retain |
| 2006 AMC 10A, Problem 9 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2006 AMC 10A, Problem 19 | `alg.seq.ap.arith`, `geo.basic.angle.polygon` | Retain |
| 2006 AMC 12A, Problem 8 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2007 AMC 12A, Problem 16 | `cp.struct.words.digits`, `alg.seq.ap.arith` | Retain |
| 2007 AMC 10B, Problem 8 | `alg.seq.ap.arith`, `cp.struct.words.digits` | Retain |
| 2008 AMC 12A, Problem 16 | `alg.exp.log.rules`, `alg.seq.ap.arith` | Retain |
| 2010 AMC 12A, Problem 20 | `alg.seq.ap.arith`, `nt.div.gcd.basic` | `alg.seq.ap.arith` |
| 2010 AMC 10B, Problem 24 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2010 AMC 12B, Problem 19 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2016 AMC 10A, Problem 10 | `alg.seq.ap.arith`, `geo.poly.quad.rect` | Retain |
| 2016 AMC 10B, Problem 24 | `alg.seq.ap.arith`, `cp.struct.words.digits` | Retain |
| 2019 AMC 10B, Problem 4 | `geo.coord.line.slope`, `alg.seq.ap.arith` | Retain |
| 2020 AMC 10A, Problem 7 | `cp.struct.tile.fill`, `alg.seq.ap.arith` | `cp.struct.tile.fill` |
| 2020 AMC 10A, Problem 23 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2020 AMC 12A, Problem 5 | `cp.struct.tile.fill`, `alg.seq.ap.arith` | `cp.struct.tile.fill` |
| 2020 AMC 12A, Problem 20 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2020 AMC 12A, Problem 25 | `alg.fn.floor.eq`, `alg.seq.ap.arith` | `alg.fn.floor.eq` |
| 2020 AMC 10B, Problem 23 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2020 AMC 12B, Problem 19 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2021 Spring AMC 10A, Problem 22 | `alg.word.stats.mean`, `alg.seq.ap.arith` | `alg.word.stats.mean` |
| 2021 Spring AMC 10B, Problem 9 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2021 Spring AMC 12B, Problem 5 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2022 AMC 10A, Problem 18 | `geo.coord.transform.reflect`, `geo.coord.transform.rotate` | Retain |
| 2022 AMC 10A, Problem 20 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2022 AMC 10A, Problem 21 | `geo.solid.poly.nets`, `geo.poly.regular.hex` | Retain |
| 2022 AMC 12A, Problem 18 | `geo.coord.transform.reflect`, `geo.coord.transform.rotate` | Retain |
| 2022 AMC 10B, Problem 4 | `alg.seq.ap.arith`, `alg.word.units.convert` | `alg.seq.ap.arith` |
| 2022 AMC 12B, Problem 9 | `alg.seq.ap.arith`, `alg.exp.rules.eq` | Retain |
| 2025 AMC 10B, Problem 17 | `alg.word.stats.mean`, `alg.seq.ap.arith` | `alg.word.stats.mean` |
| 2025 AMC 12B, Problem 14 | `alg.word.stats.mean`, `alg.seq.ap.arith` | `alg.word.stats.mean` |
| 2021 Fall AMC 10B, Problem 17 | `geo.coord.transform.reflect`, `geo.coord.transform.rotate` | `geo.coord.transform.reflect` |

### Accuracy review 4: optimization, trig addition and circle powers

*Formerly `TREE-ACCURACY-4.md`.*

2026-11-10. Read all 110 distinct problems (120 entries) in Integer optimization (54), Trig addition (37) and Power of a point (19), plus the other Euler-line leaf problem as a control: 111 distinct / 121 entries. A triggered review of all four remaining Grouping into products problems adds five entries: **115 distinct / 126 entries total**. Original source art was not visually re-audited in this pass.

Corrected 53 distinct problems (57 entries), retaining every answer. Most integer extrema and chord/secant configurations are genuine; most geometry/recurrence trig-addition labels merely named a tool. Retire the method-shaped Grouping into products leaf after reading every remaining entry, filing the actual coefficient/log/real-optimization subjects and preserving its SFFT card at Factoring. Euler Distance now lives under Inradius, circumradius and exradii, rather than the Euler line. No card is deleted.

| Pool | Before distinct | After distinct |
|---|---:|---:|
| Optimization over the integers | 54 | 52 |
| Sum, difference and double-angle formulas | 37 | 10 |
| Power of a point | 19 | 18 |
| Grouping into products (triggered follow-up, after optimization cleanup) | 4 | retired |

#### Correctness findings

- 1989 AIME #11: the old argument maximized mean minus mode and falsely claimed reflection preserved the sign. The replacement maximizes the requested mode minus mean, proves a global bound and attains floor 947.
- 2020 AIME I #10: a bound below the attained 407 reduces all cases to four prime squares, and excludes the larger ones. No unbounded search or general false claim that m must always exceed 2n is needed.
- 2022 AIME I #7: the numerator bound and all six possible large denominators now form a complete finite proof of 1/288.
- 2024 AMC 10A #7: bound the smaller negative magnitude by two and exhaust the remaining factor pairs, proving no positive sum below three exists.
- 2021 Spring AMC 12A #25: decreasing consecutive-exponent ratios prove the multiplicative optimum globally, including every larger prime and exponent.
- 2022 AIME II #14: the exact stamp-count formula follows from interval coverage and fixed-count dominance. The bounded computation below verifies the first three values of c. The missing interval-extension method is recorded as P69; no new card is created.
- 1985 AIME #9: monotonicity supplies uniqueness for the verified chord-radius solution.
- 2022 AIME I #15: all eight sine-sum branches are checked, with exactly two admissible triples, both giving 1/32.

Exact checks cover the mode bound, all digit partitions, signed factor pairs, prime-square cases and angle branches. Full repository gates, answer keys and tree/audit regressions pass. All eight repaired explanations render at 375px in light/dark with no JavaScript or KaTeX errors or horizontal page overflow. Independent bounded enumeration also agrees with the stamp-count formula for every pair in the checked range. The stamp check is reproducible with:

```python
def f(b, c):
    x = b - 1
    y = (c - 1) // b
    z = max(1, (1000 - x - b*y + c - 1) // c)
    return x + y + z
assert [c for c in range(11, 90)
        if any(f(b, c) == 97 for b in range(2, c))] == [11, 88, 89]
assert max(f(b, c) for c in range(12, 88) for b in range(2, c)) == 96
```

#### Every reviewed entry

Detailed changes and both card-home dispositions are in [Tree repair log](#tree-repair-log).

| Problem | Previous filing | Current filing / decision |
|---|---|---|
| 2026 AMC 12A, Problem 15 | `alg.trig.identity.sum`, `alg.exp.log.rules` | Retain |
| 1984 AIME, Problem 4 | `alg.word.stats.mean`, `alg.ineq.optimize.integer` | Retain |
| 1984 AIME, Problem 13 | `alg.trig.eq.inverse`, `alg.trig.identity.sum` | `alg.trig.eq.inverse` |
| 1985 AIME, Problem 9 | `geo.circ.power.chord`, `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 1986 AIME, Problem 3 | `alg.trig.identity.sum` | Retain |
| 1988 AIME, Problem 7 | `alg.trig.identity.sum`, `geo.tri.area.base` | `geo.tri.trig.other` |
| 1989 AIME, Problem 11 | `alg.word.stats.data`, `alg.ineq.optimize.integer` | `alg.word.stats.median`, `alg.ineq.optimize.integer` |
| 1990 AIME, Problem 12 | `geo.poly.regular.diag`, `alg.trig.identity.sum` | `geo.poly.regular.diag` |
| 1994 AIME, Problem 12 | `nt.div.gcd.basic`, `alg.ineq.optimize.integer` | `geo.poly.quad.rect`, `alg.ineq.optimize.integer` |
| 2000 AIME II, Problem 10 | `geo.circ.cyclic.tangential`, `alg.trig.identity.sum` | `geo.circ.cyclic.tangential` |
| 2001 AIME II, Problem 6 | `geo.circ.power.pop`, `geo.poly.quad.rect` | Retain |
| 2002 AIME I, Problem 13 | `geo.tri.cevian.median`, `geo.circ.power.pop` | Retain |
| 2003 AIME II, Problem 12 | `alg.word.ratio.percent`, `alg.ineq.optimize.integer` | Retain |
| 2004 AIME I, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2005 AIME I, Problem 15 | `geo.tri.radii.in`, `geo.circ.power.pop` | Retain |
| 2005 AIME II, Problem 12 | `geo.poly.quad.rect`, `alg.trig.identity.sum` | `geo.poly.quad.rect` |
| 2006 AIME I, Problem 8 | `geo.poly.quad.para`, `alg.trig.identity.sum` | `geo.poly.quad.para` |
| 2006 AIME I, Problem 15 | `alg.seq.sum.telescope`, `alg.ineq.optimize.integer` | `alg.eq.abs.eq`, `alg.ineq.optimize.integer` |
| 2007 AIME II, Problem 8 | `alg.ineq.optimize.integer`, `alg.poly.quad.vertex` | `alg.ineq.optimize.integer` |
| 2008 AIME I, Problem 8 | `alg.trig.eq.inverse`, `alg.trig.identity.sum` | `alg.trig.eq.inverse` |
| 2008 AIME I, Problem 12 | `alg.word.rates.motion`, `alg.ineq.optimize.integer` | Retain |
| 2009 AIME II, Problem 14 | `alg.seq.rec.nonlinear`, `alg.trig.identity.sum` | `alg.seq.rec.nonlinear` |
| 2010 AIME II, Problem 14 | `geo.circ.power.pop`, `geo.circ.inscribed.thm` | Retain |
| 2011 AIME I, Problem 14 | `geo.poly.regular.other`, `alg.trig.identity.sum` | `geo.poly.regular.other` |
| 2012 AIME II, Problem 9 | `alg.trig.identity.sum` | Retain |
| 2012 AIME II, Problem 15 | `geo.circ.power.pop`, `geo.tri.cevian.bisector` | Retain |
| 2013 AIME II, Problem 15 | `geo.tri.trig.cosines`, `alg.trig.identity.sum` | `alg.trig.identity.sum` |
| 2015 AIME II, Problem 8 | `alg.eq.factor.sfft`, `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` |
| 2016 AIME I, Problem 8 | `nt.digit.sum.condition`, `alg.ineq.optimize.integer` | Retain |
| 2019 AIME I, Problem 13 | `geo.circ.proj`, `geo.circ.power.pop`, `geo.tri.trig.cosines` | `geo.circ.proj`, `geo.circ.power.pop` |
| 2019 AIME I, Problem 15 | `geo.circ.tangent.mutual`, `geo.circ.power.pop` | Retain |
| 2019 AIME II, Problem 15 | `geo.tri.centers.ortho`, `geo.circ.power.pop` | Retain |
| 2020 AIME I, Problem 10 | `nt.div.prime.factor`, `alg.ineq.optimize.integer` | `nt.div.prime.powers`, `alg.ineq.optimize.integer` |
| 2020 AIME I, Problem 15 | `geo.tri.centers.ortho`, `geo.circ.power.pop` | Retain |
| 2021 Spring AMC 12A, Problem 25 | `nt.divisor.count.tau`, `alg.ineq.optimize.integer` | Retain filing; complete proof |
| 2022 AIME I, Problem 7 | `alg.ineq.optimize.integer` | Retain filing; complete proof |
| 2022 AIME I, Problem 11 | `geo.circ.power.pop`, `geo.poly.quad.para`, `geo.tri.trig.cosines` | `geo.circ.power.pop`, `geo.poly.quad.para` |
| 2022 AIME I, Problem 15 | `alg.trig.identity.sum`, `alg.eq.system.cyclic` | `alg.eq.system.cyclic` |
| 2022 AIME II, Problem 14 | `alg.ineq.optimize.integer` | Retain filing; complete proof |
| 2023 AIME II, Problem 9 | `geo.circ.power.pop`, `geo.circ.tangent.common`, `geo.poly.quad.trap` | Retain |
| 2023 AIME II, Problem 12 | `geo.tri.cevian.median`, `geo.circ.power.pop`, `geo.poly.quad.para` | `geo.tri.cevian.median`, `geo.circ.power.pop` |
| 2023 AMC 12A, Problem 11 | `geo.coord.line.slope`, `alg.trig.identity.sum` | `geo.coord.line.slope` |
| 2023 AMC 12A, Problem 25 | `alg.cx.polar.demoivre`, `alg.trig.identity.sum` | `alg.trig.identity.sum` |
| 2024 AIME I, Problem 5 | `geo.circ.power.pop`, `geo.poly.quad.rect` | Retain |
| 2024 AIME I, Problem 7 | `alg.cx.polar.demoivre`, `alg.trig.identity.sum` | `alg.cx.polar.demoivre` |
| 2024 AIME I, Problem 10 | `geo.circ.power.pop`, `geo.circ.inscribed.chords`, `geo.tri.trig.cosines` | `geo.circ.power.pop`, `geo.circ.inscribed.chords` |
| 2024 AIME II, Problem 10 | `geo.tri.centers.euler`, `geo.tri.centers.lemmas`, `geo.circ.power.pop` | `geo.tri.radii` |
| 2024 AMC 10A, Problem 4 | `alg.ineq.optimize.integer` | Retain |
| 2024 AMC 10A, Problem 7 | `alg.ineq.optimize.integer`, `nt.divisor.count.pairs` | `alg.ineq.optimize.integer` |
| 2024 AMC 10B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2024 AMC 10B, Problem 6 | `nt.divisor.count.pairs`, `alg.ineq.optimize.integer` | `geo.poly.quad.rect`, `alg.ineq.optimize.integer` |
| 2024 AMC 10B, Problem 13 | `alg.eq.radical.simplify`, `alg.ineq.optimize.integer` | `alg.eq.radical.eq`, `alg.ineq.optimize.integer` |
| 2024 AMC 12A, Problem 3 | `alg.ineq.optimize.integer` | Retain |
| 2024 AMC 12A, Problem 6 | `alg.ineq.optimize.integer`, `nt.divisor.count.pairs` | `alg.ineq.optimize.integer` |
| 2024 AMC 12A, Problem 10 | `alg.trig.identity.sum` | Retain |
| 2024 AMC 12A, Problem 18 | `geo.coord.transform.rotate`, `alg.trig.identity.sum` | `geo.coord.transform.rotate` |
| 2024 AMC 12B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2024 AMC 12B, Problem 19 | `geo.tri.area.sine`, `alg.trig.identity.sum` | `geo.coord.transform.rotate`, `geo.tri.special.equil` |
| 2024 AMC 12B, Problem 21 | `alg.trig.identity.sum`, `nt.dio.squares.triples` | `nt.dio.squares.triples` |
| 2025 AIME II, Problem 8 | `alg.word.everyday.money`, `alg.ineq.optimize.integer` | Retain |
| 2025 AIME II, Problem 14 | `geo.tri.special.equil`, `alg.trig.identity.sum` | `geo.tri.special.equil` |
| 1986 AJHSME, Problem 3 | `alg.ineq.optimize.integer` | Retain |
| 1987 AJHSME, Problem 6 | `alg.ineq.optimize.integer` | Retain |
| 1987 AJHSME, Problem 24 | `alg.ineq.optimize.integer`, `nt.dio.linear.solve` | Retain |
| 1990 AJHSME, Problem 7 | `alg.ineq.optimize.integer` | Retain |
| 1991 AJHSME, Problem 8 | `alg.ineq.optimize.integer` | Retain |
| 1991 AJHSME, Problem 19 | `alg.word.stats.mean`, `alg.ineq.optimize.integer` | Retain |
| 1992 AJHSME, Problem 3 | `alg.ineq.optimize.integer` | Retain |
| 1994 AJHSME, Problem 20 | `alg.ineq.optimize.integer` | Retain |
| 1996 AJHSME, Problem 6 | `alg.ineq.optimize.integer` | Retain |
| 1997 AJHSME, Problem 2 | `alg.ineq.optimize.integer` | Retain |
| 1999 AMC 8, Problem 15 | `cp.struct.words.digits`, `alg.ineq.optimize.integer` | Retain |
| 2000 AMC 8, Problem 7 | `alg.ineq.optimize.integer` | Retain |
| 2001 AMC 8, Problem 21 | `alg.word.stats.median`, `alg.ineq.optimize.integer` | Retain |
| 2005 AMC 8, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2006 AMC 8, Problem 22 | `alg.ineq.optimize.integer` | Retain |
| 2008 AMC 8, Problem 17 | `alg.ineq.optimize.integer`, `geo.poly.quad.rect` | Retain |
| 2012 AMC 8, Problem 16 | `alg.ineq.optimize.integer` | Retain |
| 2019 AMC 8, Problem 1 | `alg.ineq.optimize.integer` | Retain |
| 2020 AMC 8, Problem 8 | `alg.ineq.optimize.integer` | Retain |
| 2022 AMC 8, Problem 21 | `alg.ineq.optimize.integer` | `alg.word.ratio.percent` |
| 2002 AMC 10A, Problem 11 | `alg.ineq.optimize.integer` | Retain |
| 2002 AMC 12A, Problem 9 | `alg.ineq.optimize.integer` | Retain |
| 2004 AMC 12A, Problem 2 | `alg.ineq.optimize.integer` | Retain |
| 2004 AMC 12A, Problem 21 | `alg.seq.ap.infinite`, `alg.trig.identity.sum` | Retain |
| 2004 AMC 10B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2004 AMC 12B, Problem 2 | `alg.ineq.optimize.integer` | Retain |
| 2004 AMC 12B, Problem 24 | `alg.trig.identity.sum` | `geo.tri.special.isos`, `alg.trig.eq.solve` |
| 2005 AMC 12B, Problem 20 | `alg.ineq.optimize.integer` | Retain |
| 2005 AMC 12B, Problem 24 | `geo.coord.conic.parabola`, `alg.trig.identity.sum` | `geo.coord.conic.parabola` |
| 2006 AMC 10A, Problem 4 | `alg.ineq.optimize.integer` | Retain |
| 2006 AMC 12A, Problem 4 | `alg.ineq.optimize.integer` | Retain |
| 2007 AMC 12A, Problem 17 | `alg.trig.identity.sum` | Retain |
| 2007 AMC 10B, Problem 6 | `alg.ineq.optimize.integer` | Retain |
| 2007 AMC 12B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2008 AMC 10B, Problem 4 | `alg.ineq.optimize.integer` | `alg.word.everyday.money` |
| 2008 AMC 12B, Problem 3 | `alg.ineq.optimize.integer` | `alg.word.everyday.money` |
| 2009 AMC 12A, Problem 25 | `alg.trig.identity.sum`, `alg.seq.period.nth` | `alg.seq.period.nth` |
| 2010 AMC 12A, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2010 AMC 12B, Problem 14 | `alg.ineq.optimize.integer` | Retain |
| 2011 AMC 12B, Problem 7 | `alg.ineq.optimize.integer` | Retain |
| 2013 AMC 10A, Problem 23 | `geo.circ.power.pop` | Retain |
| 2013 AMC 12A, Problem 19 | `geo.circ.power.pop` | Retain |
| 2013 AMC 10B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2013 AMC 12B, Problem 20 | `geo.coord.conic.parabola`, `alg.trig.identity.sum` | Retain |
| 2014 AMC 12A, Problem 12 | `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 2016 AMC 10A, Problem 24 | `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 2016 AMC 12A, Problem 21 | `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 2018 AMC 12A, Problem 2 | `alg.ineq.optimize.integer` | Retain |
| 2018 AMC 12A, Problem 9 | `alg.trig.identity.sum` | Retain |
| 2019 AMC 12B, Problem 25 | `geo.poly.quad.general`, `alg.trig.identity.sum` | `geo.poly.quad.general`, `geo.tri.cevian.median` |
| 2020 AMC 12B, Problem 7 | `geo.coord.line.slope`, `alg.trig.identity.sum` | `geo.coord.line.slope` |
| 2020 AMC 12B, Problem 10 | `geo.circ.power.pop` | Retain |
| 2020 AMC 12B, Problem 12 | `geo.circ.power.pop`, `geo.circ.power.chord` | Retain |
| 2022 AMC 12A, Problem 17 | `alg.trig.eq.solve`, `alg.trig.identity.sum` | `alg.trig.eq.solve` |
| 2022 AMC 12B, Problem 14 | `alg.trig.identity.sum`, `alg.poly.quad.roots` | `geo.coord.line.slope` |
| 2025 AMC 12B, Problem 16 | `alg.word.rates.clock`, `alg.trig.identity.sum` | `alg.word.rates.clock` |
| 2000 AMC 10, Problem 20 | `alg.ineq.optimize.integer` | Retain |
| 2000 AMC 12, Problem 12 | `alg.ineq.optimize.integer` | Retain |
| 2021 Fall AMC 12B, Problem 24 | `geo.circ.power.pop`, `geo.basic.sim.similar`, `geo.tri.trig.cosines` | `geo.circ.power.pop`, `geo.basic.sim.similar` |
| 2025 AIME II, Problem 5 | `geo.tri.centers.euler`, `geo.circ.inscribed.thm` | Retain |
| 1996 AIME, Problem 3 | `cp.binom.thm.coeff`, `alg.eq.factor.sfft` | `cp.binom.thm.coeff` |
| 2000 AIME I, Problem 9 | `alg.exp.log.eq`, `alg.eq.factor.sfft` | `alg.exp.log.eq` |
| 2002 AMC 10B, Problem 13 | `alg.eq.factor.sfft` | `alg.poly.construct.coeff` |
| 2021 Spring AMC 10A, Problem 9 | `alg.eq.factor.sfft` | `alg.ineq.optimize` |
| 2021 Spring AMC 12A, Problem 7 | `alg.eq.factor.sfft` | `alg.ineq.optimize` |

### Accuracy review 5: GCD, LCM and divisor counts

*Formerly `TREE-ACCURACY-5.md`.*

2026-11-10. Read all **93 distinct problems / 104 entries** filed under GCD and LCM of numbers (50 distinct) or The number of divisors (43 distinct). These pools were disjoint. Read each statement and strategy, including recognized twins as shared routes; original source art was not visually re-audited. This is a focused review, not a complete second mathematical audit of the corpus.

Correct **55 distinct problems / 63 entries** across the two batches. Most changes remove intermediate-tool labels or recover a missing subject/card. Complete four mathematical explanations and clarify one source age assumption (six raw explanation entries because the age problem has a twin). Every intended answer, credited statement, card, home and surviving tree id is preserved. No node is added or retired.

| Pool | Before distinct | After distinct |
|---|---:|---:|
| GCD and LCM of numbers | 50 | 25 |
| The number of divisors | 43 | 35 |

#### Decisions and correctness

- Keep explicit gcd/lcm constraints and common-multiple archetypes. Fraction simplification, prices, proportional quantities, grid walks, track returns, cycles and modular reconstruction do not gain a second subject solely because their solution uses a gcd/lcm. Common-remainder systems use their existing congruence-system kind.
- Keep actual divisor counts, prescribed divisor counts and random divisor samples. A divisor-count formula used to finish an infinite series, harmonic-mean equation, exponential equation, base-digit condition or floor sum remains a card on that route rather than an extra subject.
- Keep actual factorial inputs under Factorials and divisibility rather than labeling the Legendre calculation as the subject. The factorial GCD comparison and the three power/probability divisor questions retain this stated structure. Count requested logarithmic divisor products under divisor products and log equations. Keep positive factorization tuples distinct from the number of divisors of one number.
- Add earned probability, power-divisor, age, divisor-product and congruence cards that were missing. The 2023 clock grid route uses existing Congruence Rules, whose cancellation rule supplies the additive coprimality criterion; no new card is needed.
- **1996 AIME #14:** count internal plane crossings, pair/triple coincidences and the initial cube explicitly. The old explanation counted boundary planes as crossings; the corrected derivation still gives 768.
- **2016 AMC 12B #24:** bound each exponent candidate by the other two factors being at least seven, then exhaust only five candidates. This closes the asserted unique exponent triple and the minimum 27720.
- **2026 AIME II #9:** prove the infinite tail is at most `799/2025`, below one, so it cannot carry into the reported integer digits. The remainder stays 669.
- **2019 AIME I #9:** bound the search by the attained sixth solution 361 and exhaust the prime-square/fourth-power neighbors, proving the six *least* solutions sum to 540.
- **2018 AMC 10B #19 / 12B #14:** the intended answer 11 uses ordinary human ages. The strategy now says so explicitly. With unrestricted integer ages, Chloe 257 and Joey 258 satisfy the same nine-birthday condition but give digit sum 10 at Joey's next qualifying birthday. The numerical statement alone does not establish uniqueness. Preserve the credited statement and intended key; do not present an age bound as a stated hypothesis.

Exact independent checks cover interior crossing-time unions, exponent combinations, the infinite-tail bound, all consecutive divisor-count pairs through 361, both age constructions, harmonic denominators through 22 and the floor predicate through 1000. Full gates, answer-key and tree/audit regressions pass. All six changed explanation entries render at 375px in both themes without JS/KaTeX errors or page overflow. [Tree depth and practice capacity](#tree-depth-and-practice-capacity) answers the separate branch-depth and practice-pool question; its counts include these corrections.

#### Every reviewed entry

[Tree repair log](#tree-repair-log) records each change. “Retain” means its filing, card tags and explanation remain unchanged in this pass.

| Problem | Previous filing | Current filing / decision |
|---|---|---|
| 2026 AMC 10A, Problem 11 | `nt.div.gcd.basic` | Retain |
| 2026 AIME II, Problem 9 | `alg.seq.sum.other`, `nt.divisor.count.tau` | `alg.seq.sum.other`; proof completed |
| 2026 AIME I, Problem 6 | `alg.exp.log.eq`, `nt.divisor.count.tau` | Retain |
| 2026 AIME I, Problem 8 | `nt.divisor.count.tau`, `nt.mod.crt.split` | `nt.divisor.count.tau`, `nt.mod.basic.arith` |
| 1987 AIME, Problem 7 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 1988 AIME, Problem 5 | `nt.divisor.count.tau`, `cp.prob.basic.count` | Retain |
| 1990 AIME, Problem 5 | `nt.divisor.count.tau` | Retain |
| 1990 AIME, Problem 10 | `alg.cx.unity.sums`, `nt.div.gcd.basic` | `alg.cx.unity.sums` |
| 1991 AIME, Problem 5 | `nt.div.prime.factor`, `nt.div.gcd.basic` | `nt.divisor.count.factor`, `nt.div.gcd.basic`; card tags corrected |
| 1995 AIME, Problem 6 | `nt.divisor.count.tau` | Retain |
| 1995 AIME, Problem 8 | `nt.div.rules.count`, `nt.div.gcd.basic` | `nt.div.rules` |
| 1996 AIME, Problem 8 | `nt.dio.factor.sfft`, `nt.divisor.count.tau` | `nt.dio.factor.sfft` |
| 1996 AIME, Problem 14 | `geo.solid.prism.unit`, `nt.div.gcd.basic` | `geo.solid.prism.unit`; proof completed |
| 1998 AIME, Problem 1 | `nt.div.gcd.basic` | Retain |
| 1999 AIME, Problem 7 | `nt.divisor.count.tau`, `nt.mod.basic.arith` | Retain |
| 2000 AIME II, Problem 4 | `nt.divisor.count.tau` | Retain |
| 2004 AIME II, Problem 8 | `nt.divisor.count.factor`, `nt.divisor.count.tau` | `nt.divisor.count.tau` |
| 2005 AIME I, Problem 3 | `nt.divisor.count.tau` | Retain |
| 2005 AIME I, Problem 12 | `nt.divisor.count.tau`, `nt.seq.power.squares` | `nt.divisor.count.tau` |
| 2005 AIME II, Problem 4 | `nt.divisor.count.tau`, `cp.tech.pie.venn` | Retain |
| 2006 AIME II, Problem 13 | `nt.divisor.count.tau`, `alg.seq.ap.arith` | Retain |
| 2007 AIME I, Problem 4 | `alg.word.rates.motion.laps`, `nt.div.gcd.basic` | `alg.word.rates.motion.laps` |
| 2007 AIME II, Problem 2 | `nt.divisor.count.tau`, `cp.tech.stars.identical` | `nt.dio.linear.count`, `nt.div.rules` |
| 2010 AIME I, Problem 1 | `nt.divisor.count.tau`, `cp.prob.dice.draw` | Retain filing; card tags corrected |
| 2011 AIME I, Problem 7 | `alg.poly.remainder.thm`, `nt.divisor.count.tau` | `nt.dio.bound.exp` |
| 2015 AIME II, Problem 1 | `alg.word.ratio.percent`, `nt.div.gcd.basic` | `alg.word.ratio.percent` |
| 2016 AIME II, Problem 11 | `nt.divisor.count.tau` | Retain |
| 2017 AIME I, Problem 2 | `nt.mod.basic.arith`, `nt.div.gcd.basic` | `nt.mod.basic.arith` |
| 2019 AIME I, Problem 7 | `nt.div.gcd.basic`, `alg.exp.log.eq` | Retain |
| 2019 AIME I, Problem 9 | `nt.divisor.count.tau` | Retain filing; proof completed |
| 2019 AIME II, Problem 3 | `nt.divisor.count.tau`, `nt.prime.basic.test` | `nt.divisor.count.factor` |
| 2019 AIME II, Problem 9 | `nt.divisor.count.tau` | Retain |
| 2020 AIME I, Problem 9 | `nt.divisor.count.tau`, `cp.prob.basic.count` | Retain |
| 2020 AMC 10A, Problem 24 | `nt.mod.crt.system`, `nt.div.gcd.basic` | `nt.div.gcd.basic` |
| 2021 Spring AMC 12A, Problem 25 | `nt.divisor.count.tau`, `alg.ineq.optimize.integer` | Retain |
| 2022 AMC 10A, Problem 7 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2023 AIME I, Problem 14 | `cp.struct.paths.walks`, `nt.div.gcd.basic` | `cp.struct.paths.walks`; card tags corrected |
| 2023 AIME II, Problem 5 | `nt.div.gcd.basic` | Retain |
| 2023 AIME II, Problem 10 | `cp.struct.tile.color`, `nt.divisor.count.tau` | Retain filing; card tags corrected |
| 2023 AMC 10A, Problem 14 | `cp.prob.cond.bayes`, `nt.divisor.count.tau` | Retain |
| 2023 AMC 10B, Problem 18 | `nt.div.gcd.basic`, `nt.mod.basic.arith` | `nt.div.gcd.basic` |
| 2023 AMC 12B, Problem 15 | `nt.div.gcd.basic`, `nt.mod.basic.arith` | `nt.div.gcd.basic` |
| 2023 AMC 12B, Problem 24 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2025 AIME II, Problem 7 | `cp.basic.comb.subsets`, `nt.div.gcd.basic` | `nt.div.gcd.basic`, `cp.prob.basic.count`; card tags corrected |
| 2025 AMC 10A, Problem 17 | `nt.div.gcd.basic`, `nt.mod.basic.arith` | `nt.mod.basic.arith` |
| 1987 AJHSME, Problem 9 | `nt.div.gcd.basic` | Retain |
| 1989 AJHSME, Problem 22 | `nt.div.gcd.basic`, `alg.seq.period.cycle` | `alg.seq.period.cycle` |
| 1993 AJHSME, Problem 2 | `nt.div.gcd.basic` | `alg.word.compute.fraction` |
| 1994 AJHSME, Problem 10 | `nt.divisor.count.tau` | Retain |
| 1997 AJHSME, Problem 11 | `nt.divisor.count.tau`, `alg.fn.op.eval` | Retain |
| 2003 AMC 8, Problem 19 | `nt.div.rules.count`, `nt.div.gcd.basic` | `nt.div.rules.count` |
| 2004 AMC 8, Problem 19 | `nt.div.gcd.basic` | `nt.mod.crt.system` |
| 2009 AMC 8, Problem 11 | `nt.div.gcd.basic`, `alg.word.everyday.money` | `alg.word.everyday.money` |
| 2012 AMC 8, Problem 13 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2012 AMC 8, Problem 15 | `nt.div.gcd.basic` | `nt.mod.crt.system` |
| 2013 AMC 8, Problem 10 | `nt.div.gcd.basic` | Retain |
| 2015 AMC 8, Problem 22 | `nt.divisor.count.tau` | Retain |
| 2016 AMC 8, Problem 20 | `nt.div.gcd.basic` | Retain |
| 2017 AMC 8, Problem 12 | `nt.div.gcd.basic` | `nt.mod.crt.system` |
| 2018 AMC 8, Problem 18 | `nt.divisor.count.tau` | Retain |
| 2019 AMC 8, Problem 23 | `nt.div.gcd.basic` | `alg.word.ratio.prop` |
| 2020 AMC 8, Problem 17 | `nt.divisor.count.tau` | Retain |
| 2003 AMC 10A, Problem 8 | `nt.divisor.count.tau` | `nt.divisor.count.tau`, `cp.prob.basic.count`; card tags corrected |
| 2003 AMC 12A, Problem 8 | `nt.divisor.count.tau` | `nt.divisor.count.tau`, `cp.prob.basic.count`; card tags corrected |
| 2003 AMC 12A, Problem 23 | `nt.divisor.count.tau`, `nt.prime.val.factorial` | Retain |
| 2005 AMC 10A, Problem 15 | `nt.divisor.count.tau` | `nt.divisor.count.tau`, `nt.prime.val.factorial`; card tags corrected |
| 2005 AMC 10A, Problem 22 | `nt.div.gcd.basic` | `nt.div.rules.count` |
| 2005 AMC 12B, Problem 21 | `nt.divisor.count.tau` | Retain |
| 2008 AMC 12B, Problem 23 | `nt.divisor.count.tau`, `alg.exp.log.rules` | `nt.divisor.count.sigma`, `alg.exp.log.eq`; card tags corrected |
| 2010 AMC 10B, Problem 8 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2010 AMC 12B, Problem 3 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2011 AMC 12B, Problem 5 | `nt.div.gcd.basic` | Retain |
| 2012 AMC 10A, Problem 17 | `alg.eq.factor.special`, `nt.div.gcd.basic` | `nt.dio.factor`; card tags corrected |
| 2013 AMC 10A, Problem 19 | `nt.digit.base.convert`, `nt.divisor.count.tau` | `nt.digit.base.arith` |
| 2016 AMC 10A, Problem 22 | `nt.divisor.count.tau` | Retain |
| 2016 AMC 10A, Problem 25 | `nt.div.gcd.basic` | Retain |
| 2016 AMC 12A, Problem 18 | `nt.divisor.count.tau` | Retain |
| 2016 AMC 12A, Problem 22 | `nt.div.gcd.basic` | Retain |
| 2016 AMC 12B, Problem 24 | `nt.div.gcd.basic`, `cp.tech.pie.general` | `nt.div.gcd.basic`; proof completed |
| 2017 AMC 10A, Problem 16 | `nt.div.gcd.basic` | `alg.word.rates.motion.laps` |
| 2017 AMC 12A, Problem 12 | `nt.div.gcd.basic` | `alg.word.rates.motion.laps` |
| 2017 AMC 10B, Problem 20 | `nt.divisor.count.tau`, `nt.prime.val.legendre` | `nt.divisor.count.tau`, `nt.prime.val.factorial`, `cp.prob.basic.count`; card tags corrected |
| 2017 AMC 12B, Problem 16 | `nt.divisor.count.tau`, `nt.prime.val.legendre` | `nt.divisor.count.tau`, `nt.prime.val.factorial`, `cp.prob.basic.count`; card tags corrected |
| 2018 AMC 10A, Problem 22 | `nt.div.gcd.basic` | Retain |
| 2018 AMC 10B, Problem 19 | `nt.divisor.count.tau`, `alg.word.everyday.age` | Retain filing; age assumption clarified; card tags corrected |
| 2018 AMC 10B, Problem 23 | `nt.div.gcd.basic` | Retain |
| 2018 AMC 12B, Problem 14 | `nt.divisor.count.tau`, `alg.word.everyday.age` | Retain filing; age assumption clarified; card tags corrected |
| 2019 AMC 10B, Problem 7 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2019 AMC 12B, Problem 5 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2020 AMC 10A, Problem 9 | `alg.word.ratio.prop`, `nt.div.gcd.basic` | `alg.word.ratio.prop` |
| 2020 AMC 10A, Problem 15 | `nt.divisor.count.tau`, `cp.prob.basic.count` | `nt.divisor.count.tau`, `cp.prob.basic.count`, `nt.prime.val.factorial`; card tags corrected |
| 2020 AMC 10A, Problem 22 | `alg.fn.floor.eq`, `nt.divisor.count.tau` | `alg.fn.floor.eq` |
| 2020 AMC 12A, Problem 21 | `nt.div.gcd.basic`, `nt.prime.val.legendre` | `nt.div.gcd.basic`, `nt.prime.val.factorial` |
| 2022 AMC 10A, Problem 19 | `nt.mod.basic.arith`, `nt.div.gcd.basic` | Retain |
| 2022 AMC 12A, Problem 4 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2022 AMC 12A, Problem 23 | `nt.div.gcd.basic`, `nt.prime.val` | `nt.div.gcd.basic`, `alg.seq.sum.other` |
| 2001 AMC 10, Problem 8 | `nt.div.gcd.basic` | Retain |
| 2021 Fall AMC 10A, Problem 23 | `nt.divisor.count.tau`, `alg.fn.basic.iterate` | Retain |
| 2021 Fall AMC 10B, Problem 3 | `alg.eq.factor.squares`, `nt.div.gcd.basic` | `alg.word.compute.fraction` |
| 2021 Fall AMC 10B, Problem 6 | `nt.divisor.count.tau` | Retain |
| 2021 Fall AMC 12A, Problem 8 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2021 Fall AMC 12A, Problem 20 | `nt.divisor.count.tau`, `alg.fn.basic.iterate` | Retain |
| 2021 Fall AMC 12B, Problem 16 | `nt.div.gcd.basic` | Retain |
| 2021 Fall AMC 12B, Problem 25 | `nt.mod.basic.arith`, `nt.div.gcd.basic` | `nt.mod.basic.arith` |

### Tree audit after area regrouping

*Formerly `TREE-AUDIT.md`.*

**Finalization follow-through (2026-11-10):** every ranked implementation batch and sparse-leaf decision is complete. The live tree has 459 nodes, 28 areas and 316 leaves, with no unused leaves. See [Tree finalization after the full tagging pass](#tree-finalization-after-the-full-tagging-pass) for the final census and decisions, and [Tree repair log](#tree-repair-log) for exact migrations. This document below preserves the historical audit/synthesis and its then-pending recommendations. T4 and textbooks remain paused.

2026-11-09; baseline `ef983da`. The owner requested another data audit and a plan for the next tree changes. **This pass changes no taxonomy, problem filing, card home or textbook.** It supersedes the ordering of the remaining work in the section "Topic-tree restructuring review", while preserving that document's completed migration record.

Implementation is now authorized by the owner’s request to fix these issues. See [Tree repair log](#tree-repair-log) for completed batches and migrations; the measurements below preserve the audit baseline.

#### Main finding

Keep the new major areas for now. The strongest remaining problems are inconsistent meanings below them: some labels describe a solution step, some overlap with another label for the same problem kind, and a few specific kinds still fall into broad pools. Another wholesale area reshuffle would not address those issues.

The first work should repair category definitions and confirmed wrong-kind filings. Then resolve the well-supported travel split, review the probability fallback, unify the triangle families, and consolidate overlapping number-theory/bounds labels. Review sparse reference-heavy leaves last, with card-home dispositions written down before deleting anything.

#### What was measured

Run `node tools/tree-risk-audit.cjs` for the current signals and `node tools/tree-structure-report.cjs` for area and proposed-pool populations. Both follow explicit parent links. The risk audit reports direct-parent assignments, thin leaves and affected homes, source-family counts, single-child branches, and repeated pairs of direct labels. Its tests cover twin collapse, unions, moved-node ancestry and empty populations.

| Signal | Result | Interpretation |
|---|---:|---|
| Problems | 4,725 raw / 4,117 recognized distinct | Fully filed; no coverage regression |
| Structure | 482 nodes, 28 areas, 337 leaves | Area moves reduced wrappers, not leaf complexity |
| Direct-parent filings | 63 raw / 56 distinct | Only 1.36% of distinct problems; not a general overflow problem |
| Travel parent filings | 22 raw / 20 distinct | 35.7% of all direct-parent problems are here |
| Thin leaves, fewer than five distinct | 57 of 337, or 16.9% | Review individually |
| Problems touching thin leaves | 158 raw / 145 distinct | Only 3.5% of distinct problems; counted as a union |
| Card homes on thin leaves | 140 of 740 assigned homes, or 18.9% | A large reference migration burden for a small problem population |
| Unused leaves | 2 | Five card homes; neither is an empty piece of reference data |
| Single-child internal branches | 1 | `cp.tech.bij`; needs a content review, not just flattening |
| Largest terminal pool | 103 distinct | No leaf requires splitting merely because of size |

“Distinct” uses the existing conservative exact-strategy AMC 10/12 twin detector. Reworded twins may remain separate. Counts from overlapping pools cannot be added. Cofiling is evidence to investigate, not a measured error rate or a reason to merge unrelated subjects.

This pass read 75 distinct statements and strategies across six selections: the entire double-counting family (18), perfect-power-expression leaf (8), extremal-subset leaf (6), substitution-system and special-value functional-equation leaves (5 + 6), direct travel-parent pool (20), and a systematic sample of 12 of the 89 basic-probability problems. One further arithmetic/geometric-progression problem was read as a control. The prior review supplies the polynomial/symmetry/geometry evidence; the remaining pools were not all reread here. This is not a second full correctness or figure audit.

#### Ranked red flags

##### 1. Method-based categories are admitting the wrong kinds of problem

**Confirmed examples, highest priority.** These are stronger evidence than small populations.

- `alg.eq.system.sub` has five distinct entries. **1990 AIME #4 is one rational equation in one variable**, yet its only filing is Substitution and elimination in nonlinear systems. The substitution is useful; “system” is the wrong subject. The full nonlinear-system family has 26 distinct problems split into combine/substitute/symmetric branches. Review all three siblings together before choosing the retained division.
- `alg.fn.feq.sub` has six distinct problems grouped by Substituting special values. They include a scaling-defined function (2001 AIME II #8), polynomial functional equations (2007 AIME II #14 and 2016 AIME I #11), and a domain-consistency question (2006 AMC 12A #18). Keep Functional equations, but replace the technique-based split with meaningful kinds only where supported; broader parent filings are preferable to invented tiny leaves.
- The prior review found the same issue in Integer and rational roots (10 distinct) and Higher-degree equations (11): some filings reflect an intermediate rational-root test or cubic rather than the subject. The “Cubics and quartics” leaf also contains a degree-17/19 root-comparison question.
- `cp.tech.bij` is the sole single-child wrapper: **18 distinct problems, three directly on the parent and 15 on its child**. The three parent entries are two elimination tournaments and a restricted-permutation problem, **2012 AMC 10B #22**. Its natural existing destination is Arrangements with restrictions. The incidence-total child contains legitimate recurring kinds, including classroom seats, participation time and vertex/face sums; do not throw those away with the wrapper.

**Decision:** fix literal category mismatches first, then clean the relevant sibling definitions. Preserve methods on cards. For the counting family, retain a coherent repeated-count/incidence-total pool, review the tournament destination against the existing tournament scope, and remove the misleading Bijections wrapper/name. Do not automatically move every incidence problem to arithmetic or geometry just because of its setting.

##### 2. Travel has the clearest case for an additional subtopic

The motion family has 63 distinct problems; **20 are filed directly on the parent**, while every other directly used parent has at most four distinct entries. This is a local gap, not a reason to split every large leaf.

Rereading all 20 supports **nine distinct multi-stage journey/stop examples**: 2008 AIME II #2; 2012 AIME II #4; 2013 AIME I #1; 1985 AJHSME #13; 2005 AMC 8 #10; 2007 AMC 10A #13; 2009 AMC 10A #4; 2017 AMC 10A #9; 2017 AMC 10B #7. The last two additions to the previously recorded seven-example evidence are the walk-home-then-bike comparison and the flat-tire journey. TQ20 has been updated with those references and remains pending.

**Decision:** resolve TQ20 and introduce the multi-stage/stop-time leaf before considering further travel subdivisions. Review all 22 raw parent entries in the same batch, keeping twins aligned. Do not force the other eleven distinct entries into the new leaf: they include ordinary distance/rate questions, rounding, graph reading and moving geometric regions. Some belong on the parent or already have a useful second subject.

##### 3. Basic probability is a mixed fallback, not automatically an oversized topic

`cp.prob.basic.count` contains **103 raw / 89 distinct** problems. Of those, **37 are sole-label problems and 52 already have another subject label**. Adding more labels indiscriminately would make this worse.

The 12-problem sample contains a clear existing-destination miss: **2005 AMC 10B #21 explicitly draws slips without replacement**, but is filed only at Counting favorable outcomes. The cube-walk question, 2024 AMC 10A #24, also merits review against the existing random-process family. Its event concerns a whole path; do not automatically file it as a terminal-state probability just because it has four steps.

Other sampled entries legitimately concern arbitrary finite sample spaces: changed airport gates, two unequal chosen integers, and an inverse bag-composition question. A discrete lattice-point probability is not a continuous area/volume probability simply because coordinates appear.

**Decision:** review all 89 distinct cases against existing drawing, coin/dice, conditional and random-process nodes before inventing subtopics. Keep a clearly defined general finite-probability fallback. Record outcomes as “specific existing destination,” “generic finite model,” or “recurring missing kind”; only the last can justify a new candidate after enough independent examples.

##### 4. Triangle categories remain split by location and tool

The previous regrouping left Geometry unchanged. Its 213-distinct Lengths and angles area still contains Pythagoras, triangle similarity and isosceles angle questions, alongside a separate Triangles area with 312 distinct problems.

The concrete review scope is **233 raw / 204 distinct** across Pythagoras/folding, special right triangles, the two isosceles leaves, triangle similarity and parallel-segment similarity. Within it, the right-triangle candidate pool excluding folding has 95 distinct problems; isosceles has 37; folding has 15. These overlap and must not be summed.

**Decision:** put genuine triangle families together, combine the two isosceles entry points, and move folding out of Pythagoras. Read the hidden-right-triangle and parallel-segment pools before deciding their final scope. A right triangle used to compute a box diagonal should not force every box problem into a triangle category. Preserve general similarity of figures/solids outside the triangle-specific family.

##### 5. Two repeated-label pairs expose unclear boundaries

| Pair | Shared distinct problems | Size of each direct-label pool | Follow-up |
|---|---:|---:|---|
| Perfect-power expressions ↔ difference-of-squares/factorable Diophantine equations | 5 | 8 / 24 | Review whether the second label adds a subject or merely a solution route |
| Largest subsets avoiding a condition ↔ constructions and bounds | 3 | 6 / 22 | Establish a broad/narrow relationship or remove redundant general labels |

All eight power-expression statements were read. They are square/cube conditions on integers, not integer-sequence questions; their current home under Integer sequences and special numbers obscures that. 1999 AIME #3 and 2017 AIME II #6 are clear examples. Their other three filings include bounds and a genuine base-representation condition, so a blanket replacement with “difference of squares” would be wrong.

All six extremal-subset statements were read. The three sharing the bounds label ask for a largest constrained subset; these labels largely repeat the same subject at different breadths. Preserve the meaningful subset family rather than mixing all six into a generic bounds leaf. A true parent/child relationship could express this, but requires checking depth and removing ancestor redundancy.

**Decision:** review 63 raw / 55 distinct entries in the union of those four pools plus Extremal principle. Establish a single primary problem-kind destination where the current pair merely repeats a broad/narrow description. Keep genuine second subjects. As a control, Arithmetic sequences and Geometric sequences share nine distinct problems, but 2003 AIME I #8 explicitly imposes both types of progression; that overlap is useful.

##### 6. The sparse tail reflects a mismatch between reference coverage and this contest sample

| Subject | Thin leaves / all leaves | Card homes on thin leaves |
|---|---:|---:|
| Algebra | 18 / 112 | 31 |
| Counting & Probability | 15 / 79 | 30 |
| Geometry | 13 / 94 | 59 |
| Number Theory | 11 / 52 | 20 |

The source corpus contains **1,000 AMC 8/AJHSME, 2,650 AMC 10/12, 1,065 AIME and ten HMMT entries**, with no imported olympiad problem set. Thin olympiad-relevant topics are therefore weak evidence of uselessness. Projective circle geometry has three distinct problems and 19 card homes; Matrices has two and nine. These deserve a reference-home review, not automatic deletion.

The two unused leaves are Infinite radicals (two homes) and Parallel lines/transversals (three). Some of those cards are cited elsewhere: Infinite Nest appears in a function-iteration problem, and Parallel Exterior Angles appears in three triangle problems. Such citations do not establish that the original problem should receive the card's home label.

**Decision:** classify each thin leaf as retain, merge into a genuinely equivalent problem kind, or retire and rehome its cards. For every proposed deletion record the survivor and all affected card ids. Keep advanced but distinct subjects when justified. For symmetry, follow the earlier specific decision: merge the two method-split leaves into the 13-distinct rotations/reflections pool, explicitly covering both equivalence classes and symmetry conditions. Do not generalize that decision into merging unrelated thin leaves.

#### Next implementation batches

These are review scopes, not asserted error counts. Work in the repository's usual batches of about 25 raw entries; batch populations overlap.

| Order | Scope | Raw / distinct | Completion condition |
|---|---|---:|---|
| 1 | Nonlinear systems, functional equations, integer/rational roots, higher-degree equations, modulus-rule and double-counting family | 88 / 82 | Correct wrong-kind filings; write and apply sibling definitions; retain a useful incidence-total pool |
| 2 | Direct motion-parent entries and TQ20 | 22 / 20 | Resolve the nine-example candidate; file qualifying cases; explain each remaining parent filing |
| 3 | General finite probability | 103 / 89 | Review every fallback against existing specific nodes; retain a legitimate general pool |
| 4 | Triangle/similarity/folding boundary | 233 / 204 | Apply the triangle regrouping with a per-problem review and explicit old-id/survivor map where merging |
| 5 | Power-expression/factorable-equation and subset/bounds overlaps | 63 / 55 | Remove semantic redundancy while preserving genuine cross-subject questions |
| 6 | Symmetry, then the remaining thin leaves | Symmetry: 17 / 13; all thin-leaf entries: 158 / 145 | Merge symmetry by problem kind; decide each thin leaf and every affected card home individually |

Before each data batch, read every affected statement and strategy, check the mathematics, review card tags, and synchronize twins. Afterward regenerate the tree, run gates and relevant regressions, compare problem/card-home coverage, and record every retired id. Structural regroupings need exact before/after union comparisons; semantic refilings need an explained change list rather than artificially unchanged totals. Re-run the risk audit after each coherent change. Keep T4 and textbooks paused.

#### Correctness follow-ups encountered while auditing

The category pass must also repair the previously recorded 1984 AIME #14 wording about residues. A second concrete proof issue surfaced in **1989 AIME #13**: the strategy says avoiding differences 4 and 7 “only sees residues mod 11.” That is false globally: 1 and 16 differ by 15 and may coexist, although their residues differ by 4. The 11-consecutive-integer bound and a periodic construction need to be justified separately, including the boundary of the initial 20 positions. An independent dynamic program retaining the previous seven selection bits reproduced maxima 5 for length 11, 10 for length 20 and the stated answer 905 for length 1989. Repair the proof, not the answer. These are recorded follow-ups, not corrections already applied by this audit.

#### Validation

The risk census was checked against the independently calculated structural totals and pool unions. Its regression tests exercise recognized twins, overlapping leaves, thin-home counts, parent filings, moved ids and empty data. All repository gates, the risk-audit tests, tree-audit tests, structural regression tests, generated-tree check and diff check passed. The audited baseline remains intact. The five app regression suites and browser flows were not rerun for this documentation/read-only-tool batch. No taxonomy or data-file change is part of this audit.

### Topic-tree restructuring review

*Formerly `TREE-REVIEW.md`.*

**Finalization follow-through (2026-11-10):** every ranked implementation batch and sparse-leaf decision is complete. The live tree has 459 nodes, 28 areas and 316 leaves, with no unused leaves. See [Tree finalization after the full tagging pass](#tree-finalization-after-the-full-tagging-pass) for the final census and decisions, and [Tree repair log](#tree-repair-log) for exact migrations. This document below preserves the historical audit/synthesis and its then-pending recommendations. T4 and textbooks remain paused.

2026-11-09. Baseline: `57c5fb5`, after all 4,725 problems were filed. The owner requested a synthesis and decisions for larger pruning. This document records the chosen direction and migration order. After the owner asked to continue, **the first area regrouping was implemented: 482 nodes and 28 areas, preserving all problem filings and card homes**. At that checkpoint semantic leaf pruning and geometry moves remained pending; the subsequent [Tree audit after area regrouping](#tree-audit-after-area-regrouping) supplies the latest evidence and implementation order. Textbooks remain paused.

#### Decision

Keep the four subjects. Reorganize the large umbrellas before splitting more leaves. Split Arithmetic and word problems into three areas; reorganize Counting & Probability into five areas; combine the three related divisibility areas; bring triangle families together. Then remove method-based duplication and review the remaining small leaves individually.

Do not set an arbitrary target such as 300 nodes. The goal is that a student can predict where a problem belongs. A smaller tree that combines unrelated problem kinds would be worse.

#### Evidence and limits

`node tools/tree-structure-report.cjs` reproduces the structural census and destination pool counts from the current data. The tables below are the pre-migration baseline; the initial census implementation is preserved in commit `caec141`. It follows actual parent links and counts the union of descendant filings. `node tools/tree-audit.js --census` supplies the existing direct-filing, card-home and thin-leaf diagnostics.

| Measure | Baseline |
|---|---:|
| Filed problem entries | 4,725 |
| Recognized distinct problems | 4,117 |
| Nodes | 486 |
| Internal nodes / terminal leaves | 149 / 337 |
| Leaves below five recognized distinct problems | 57 |
| Unused leaves | 2 |
| Cards with homes / general methods without homes | 740 / 34 |

“Distinct” conservatively collapses same-paper AMC 10/12 twins with identical strategies. Reworded twins and repetitions across other papers may remain separate. All following population counts use this measure, unless marked raw. Cross-filed branch populations overlap and must not be added. Card-home counts measure migration impact, not evidence that a problem category deserves to exist.

| Subject | Raw entries | Distinct | Nodes | Leaves | Card homes |
|---|---:|---:|---:|---:|---:|
| Algebra | 2,009 | 1,732 | 159 | 112 | 205 |
| Counting & Probability | 932 | 823 | 113 | 79 | 115 |
| Geometry | 1,428 | 1,275 | 134 | 94 | 316 |
| Number Theory | 807 | 698 | 80 | 52 | 104 |

The largest leaf is Arithmetic sequences at 103 distinct problems. Percent change has 95, Counting favorable outcomes 89, Ratios and proportions 71, and Fraction arithmetic 70. These are usable practice pools. The clearer scale problem is the 682-problem Arithmetic and word problems umbrella, alongside small areas such as Expected value (15) and Binomial coefficients (36).

This is a full structural census with targeted statement/strategy reading, not a second exhaustive correctness review of all 4,725 entries. Small diagnostic pools were read in full: integer/rational roots (10), higher-degree equations (11), polynomial values/interpolation (8), symmetry (13), and choosing a modulus/quadratic residues (4). Larger right-triangle, isosceles, basic-probability and divisibility pools were sampled. Every semantic refiling still requires reading the affected problem and checking its mathematics.

#### 1. Split the arithmetic umbrella into three areas

Replace `alg.word` as an area with these three destinations. Preserve the useful existing topics and leaves beneath them.

| New area | Existing subtrees | Distinct pool | Card homes |
|---|---|---:|---:|
| Arithmetic and proportional reasoning | `alg.word.compute`, `alg.word.ratio`, `alg.word.units.convert` | 347 | 8 |
| Rates, time and everyday quantities | `alg.word.rates`, `alg.word.everyday`, `alg.word.units.calendar` | 195 | 12 |
| Data and averages | `alg.word.stats` | 160 | 5 |

This puts fractions, percentages, ratios and unit conversion together; travel, work, clocks, calendars, money and ages together; and mean/median/graphs together. Calendar problems do not need to share a branch with dimensional conversion. These destinations cover every current `alg.word` filing and all 25 card homes; their overlapping counts are not a partition of 682.

Keep percent change, ratios, arithmetic sequences and similar triangles intact. Their current populations do not justify splitting them by which formula the solution happens to use. TQ20 remains the separately evidenced multi-stage travel candidate; this regrouping does not silently approve it. Do not create a fifth “Arithmetic” subject or scatter elementary arithmetic across Number Theory merely to balance subject sizes.

#### 2. Replace the counting umbrellas with five areas

The current eight areas mix level (Basic counting), method (Counting techniques), structure (Arrangements with structure), and subject. A student cannot reliably distinguish the first three. Use the following organization; the listed source subtrees cover every current Counting & Probability filing and all 115 card homes.

| New area | Existing subtrees | Distinct pool | Card homes |
|---|---|---:|---:|
| Choices, arrangements and distributions | `cp.basic`; `cp.tech.stars`, `.sym`, `.bij`; `cp.struct.words`, `.seat`, `.part` | 293 | 28 |
| Paths, graphs and boards | `cp.graph.basic`, `.tour`; `cp.struct.paths`, `.tile`, `.catalan` | 106 | 23 |
| Sets and coefficient counts | `cp.tech.pie`, `.gf`; `cp.binom` | 82 | 19 |
| Probability and expectation | `cp.prob`, `cp.exp` | 308 | 23 |
| Logic, games and bounds | `cp.logic`, `cp.graph.sets` | 116 | 22 |

An abbreviated id such as `.sym` shares the preceding prefix (`cp.tech.sym`). These are destination groups, not new node ids.

Keep selections, permutations, distributions, strings, circular arrangements and partitions as recognizable topics within the first area. The second distinguishes counting routes, properties of a graph, and board configurations. Keep Catalan/ballot configurations together initially rather than splitting the existing pool by technique; reread it before choosing its final display name. The third collects set membership/avoidance counts and coefficient/identity questions. Expected values belong within probability while waiting-time, fixed-step and variance questions retain their different meanings. Deterministic games and bounds stay separate from random-process questions.

Retire the empty intermediate wrappers `cp.tech` and `cp.struct` after moving their children. Reuse `cp.graph` for Paths, graphs and boards, moving its largest-subset topic into Logic, games and bounds. These area wrappers have no direct problem assignments or card homes. Absorb `cp.exp` as a topic within Probability and expectation, preserving its recently consolidated children. Do not undo that introductory pruning.

Review `cp.basic.case` and `cp.tech.bij` in the first destination: their placement above ensures coverage, but it is not an endorsement of a technique label on unrelated problems. Their narrow standing definitions still apply. Rename Stars and bars to Distributions, Inclusion-exclusion to Overlapping sets and excluded conditions, and Generating functions to Coefficients of products when the affected pools have been checked against those meanings. The named methods remain discoverable through their cards.

**Symmetry:** collapse `cp.tech.sym.necklace` and `.burnside` into their parent pool, displayed as Counting with rotations and reflections (13 distinct, 17 raw; three card homes). Burnside is not a different kind of object from a necklace or a colored board. The full pool contains ten equivalence-class questions and three questions about configurations satisfying a symmetry condition. The common parent must explicitly encompass both; do not label all 13 “counting up to symmetry.” A future split would be by these two problem types, after the smaller group has enough independent examples, never by whether Burnside appears in the solution.

Examples: 1996 AIME #7 counts board colorings up to rotation; 1990 AJHSME #25 counts patterns up to flips/turns; 2000 AMC 12 #25 uses a free rotation action on an octahedron without needing a general fixed-point average. In contrast, 2013 AIME I #4 and 2018 AMC 10A #20 ask for colorings fixed by specified symmetries; 2024 AIME I #11 asks whether a rotation meets a color condition.

#### 3. Combine the related number-theory areas

Merge `nt.div`, `nt.divisor` and `nt.prime` into **Divisibility, primes and divisors**: 344 distinct problems, 403 raw entries, 43 card homes. This reduces Number Theory from seven areas to five, alongside Modular arithmetic, Diophantine equations, Digits and bases, and Integer sequences and special numbers.

Retain the meaningful topics: divisibility conditions, GCD/LCM, prime factorization, primes, divisors, multiplicative functions, and factorials/valuations. Do not turn the 344-problem area into one practice leaf. Currently “prime factorization” is under Divisibility while “primes and primality” is another area; students should find them in the same neighborhood. Factorials and valuations also belong near divisibility rather than being coupled to primes only by the current area name.

Keep counting divisors separate from summing divisors, and keep ordinary divisor pairs separate from factorizations into several factors. A totient question and a Möbius-function question are not interchangeable simply because the latter has only one current example. Preserve the small specialized families until their card homes and contest significance have been reviewed.

#### 4. Unify triangle families, with a separate folding destination

Move the right-triangle family from Lengths and angles into Triangles and combine its navigation with `geo.tri.special.right`. Excluding folding, the current candidate pool has 95 distinct problems and seven card homes. Preserve special angle ratios, altitude-to-hypotenuse problems and integer triples as recognizable subtopics. Review the 30-distinct “hidden right triangles” pool for incidental Pythagoras use before retaining all its filings.

Combine `geo.basic.angle.isosceles` and `geo.tri.special.isos` into one Isosceles triangles pool (37 distinct, 40 raw; no card homes). Angle and length questions about an isosceles triangle should not require two unrelated entry points. Put triangle-specific similarity with Triangles, while similarity of general figures/solids remains a general geometric relationship. Read the parallel-segment pool before deciding whether it belongs with triangle similarity or the broader relationship topic.

Move `geo.basic.pyth.fold` out of Pythagoras into the transformation family. Its 15 distinct problems include 2001 AMC 8 #16, a folded-square perimeter problem that does not ask about a right triangle. Folding is a configuration, and Pythagoras is sometimes its tool. Keep folding distinct from a generic reflection question; choose the exact parent after checking all 15 statements against the existing transformation scope.

Keep circles, polygons, coordinates and solids as major areas. Do not combine circle tangency, power of a point and triangle centers simply because they share formulas. Geometry has 316 card homes and a substantial reference corpus beyond the currently imported contests; raw leaf population is particularly weak evidence for deleting its classical families.

#### 5. Clean broad or method-based filings before adding leaves

| Pool | Decision and evidence |
|---|---|
| `cp.prob.basic.count` — 89 distinct | Review all entries against existing specific probability nodes before proposing subdivisions. The sample includes 2005 AMC 10B #21, four draws without replacement, which already has a natural destination at `cp.prob.dice.draw`. Some inverse-probability and arbitrary finite-space questions legitimately stay broad. Do not split this pool into “casework,” “complement” and “direct counting.” |
| `alg.poly.introot` — 10 | Refile individually, then consolidate the method-named leaves. 1983 AIME #5 is about symmetric expressions; 2002 AIME II #11 is about infinite geometric series; 2018 AIME II #6 asks when all quartic roots are real. Rational-root testing is a tool in those routes. 2023 AMC 12B #14 really does ask for integer roots. Keep a genuine integer/rational-root topic rather than blindly merging everything currently filed there. |
| `alg.poly.introot.divides` — 3 | Its current contents are not even one consistent integer-coefficient family: 2014 AMC 12A #19 permits a rational coefficient, 2017 AMC 12A #21 is a closure process on integer roots, and 2005 AIME II #13 uses polynomial divisibility. Fix the individual destinations; do not preserve the formula as a category. |
| Polynomial values and interpolation — 8 combined | Bring `alg.poly.remainder.values` into the construction/interpolation neighborhood. Known values, coefficient recovery and finite differences form a more useful browsing group than separating them by theorem. Do not merge the unrelated integer-coefficient divisibility problem merely because it supplies two polynomial values. |
| `alg.poly.higher` — 11 | Review and flatten its two leaves into a broadly named Higher-degree polynomial equations pool where appropriate. Its “Cubics and quartics” leaf even contains 2018 AMC 12A #21, which compares degree-17/19 polynomial roots; several other filings are only intermediate algebra in a geometry/system problem. The final pool count must follow that review, not the current census. |
| `nt.mod.basic.rule` — 3 | Retire Using a modulus to rule out cases as a problem category after verifying the three remaining entries: 1984 AIME #14, 1995 AIME #10 and 2016 AIME I #12 are already co-filed under prime-number topics. Keep the modulus method on its card. Do not remove Quadratic residues on this basis; that is a genuine subject. |

One wording correction surfaced during this reading: 1984 AIME #14 says the family $9+6n$ runs through every residue class; it actually stays in class 3 modulo 6, and the three chosen offsets cover the even classes. Correct that sentence when reviewing the modulus pool; the stated construction and answer do not depend on the faulty phrase.

The census's 57 thin leaves are a review queue, not 57 deletion decisions. In particular, the unused Infinite radicals and Parallel lines leaves have two and three card homes respectively. Review whether their cards fit broader parents before retirement. Small classical inequalities, triangle-center configurations and quadratic residues are not automatically duplicates. Pending P64–P68 and TQ20 remain pending; this review adds no new card or unsupported archetype.

#### Migration order and safeguards

1. **Make parentage independent of stable ids.** Before this migration, the builder and gate required each id to extend its parent's id, while `tree-audit.js` inferred relatedness by string prefixes. That conflicts with moving an established node without renaming it. Preserve existing ids and meanings; use the explicit parent field for ancestry, depth, cycle checks and subject checks. Amend the prefix requirement in CONVENTIONS §15 and the tooling together, retaining Markdown indentation as the source of parentage. Add regression coverage for a moved subtree, cycles, ancestor redundancy and cross-subject errors. New nodes can still receive readable dotted ids. Do not relax validation without replacements.
2. **Move the category containers.** Apply the three arithmetic destinations, five counting destinations and combined number-theory area. Keep all existing problem/card ids. Check complete before/after descendant unions; an intended aggregate changes, but no problem or card disappears. Record retired empty wrapper ids. Parentage/depth changes are expected; inspect the experimental tree at desktop/mobile sizes.
3. **Perform the semantic pruning.** Read every problem in each affected symmetry, triangle, polynomial, modulus and probability pool. Correct the statement/strategy/cards if needed, check numbers, synchronize recognized twins, and keep one to three most-specific nonredundant filings. For merged leaves, write an explicit old-id → survivor map and remap card homes. A method card can move to a suitable broad home or remain a general method under existing rules; no card is deleted to make counts prettier.
4. **Re-census and validate.** Rebuild the generated tree and required asset versions. Run repository gates, tree-audit regressions and the new parentage regression checks; check all 4,725 filings and 774 card-home entries, twin equality, no dangling retired ids, and preserved problem/card slugs. Confirm the new pool contents by reading, not just by matching totals. Update PLAN and CHANGELOG and commit/push at each coherent batch. T4 and textbook revision remain separate work.

The ancestry prerequisite and three area regroupings are now implemented. Six empty wrappers were retired (`alg.word`, `alg.word.units`, `cp.tech`, `cp.struct`, `nt.divisor`, `nt.prime`); two area ids were added (`alg.arithmetic`, `alg.applied`). All other ids survive. This reduces 486 nodes to 482 and 31 areas to 28, while retaining 337 leaves and all card homes. The exact problem-reference and card-home sets of all nine destinations were compared with their pre-migration unions, as were all four subjects; every comparison passed. The problem database and card-home data are unchanged.

The next step at that checkpoint was bounded semantic filing review. Those reviews, triangle moves, symmetry consolidation, full probability review and polynomial/modular cleanup are now applied; see the finalization link above. No second complete mathematical audit is claimed.

#### Validation of the initial synthesis

The read-only census reproduced the totals and destination populations above. Its destination-coverage report found no uncovered problem entries or card homes in either the arithmetic or counting maps. Repository gates, `tests/tree-audit.cjs`, generated-tree consistency, the tree/card-home/filing gate and `git diff --check` passed. At that initial synthesis checkpoint the taxonomy remained at 486 nodes with all 4,725 entries filed. Browser checks and the five app regression suites were not rerun for this documentation/read-only-tool batch; there is no app, asset or content-data change.


#### Validation of the area regrouping

All repository gates, the five app regression suites, tree-audit tests and the new structural regression suite passed. The new suite exercises stable-id moves, missing parents, duplicate ids, cycles, subject boundaries, depth, Markdown indentation, audit coverage, and actual filing-gate ancestor redundancy after a move. Exact pre/post comparisons verified the nine destination problem/card-home unions and four subject unions, with byte-equivalent problem and card-home objects. Generated-tree and diff checks passed.

The experimental viewer passed 16 subject/theme/viewport states (four subjects, light/dark, 1280/375px): all node and area counts, expand/collapse, no page or KaTeX errors, and no page-level horizontal overflow. Desktop and phone screenshots were inspected; the tree uses its existing internally scrolling canvas. No textbook or production Practice-picker work was started.

### Tree repair log

*Formerly `TREE-REPAIRS.md`.*

Owner-authorized follow-through on [Tree audit after area regrouping](#tree-audit-after-area-regrouping), 2026-11-09. Textbooks and T4 remain paused. Each batch reads the affected statements and strategies, reviews earned card tags and preserves recognized twins. The audit’s baseline counts are historical; current census commands report live data.

#### Systems and functional equations

Reviewed all 41 distinct problems in the two families. Retired method leaves `alg.eq.system.combine`, `alg.eq.system.sub` and `alg.fn.feq.sub`; their genuine systems/functions file at the existing parent. Linear systems have their own existing leaf, now named without a two/three-variable restriction. Symmetric/cyclic systems, integer/recursive functions and Cauchy-type equations remain meaningful kinds. The rational equation (1990 AIME #4) moves to Equations, with its unused quadratic-formula tag removed; the geometric box keeps only its solid-geometry label. Removed incidental identity/grouping labels from the two nonlinear-system questions. Six card homes move to their appropriate equation/function parents. Thirty raw entries changed; all 4,725 stay filed, all 774 cards survive and 740 keep homes. The tree now has 479 nodes. Parent filings increase deliberately rather than recreating technique leaves. No source statement or answer changed.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2026 AMC 12A, Problem 9 | `alg.eq.system.sub`, `alg.eq.abs.eq` | `alg.eq.system`, `alg.eq.abs.eq` |
| 1986 AIME, Problem 4 | `alg.eq.system.combine` | `alg.eq.linear.system` |
| 1990 AIME, Problem 4 | `alg.eq.system.sub` | `alg.eq` |
| 2001 AIME II, Problem 8 | `alg.fn.feq.sub` | `alg.fn.feq` |
| 2007 AIME II, Problem 14 | `alg.poly.construct.given`, `alg.fn.feq.sub` | `alg.poly.construct.given`, `alg.fn.feq` |
| 2010 AIME I, Problem 9 | `alg.eq.system.sub` | `alg.eq.system` |
| 2012 AIME II, Problem 8 | `alg.cx.polar.arith`, `alg.eq.system.combine` | `alg.cx.polar.arith`, `alg.eq.system` |
| 2016 AIME I, Problem 11 | `alg.poly.construct.given`, `alg.fn.feq.sub` | `alg.poly.construct.given`, `alg.fn.feq` |
| 2017 AIME II, Problem 5 | `alg.eq.system.combine` | `alg.eq.linear.system` |
| 2018 AIME II, Problem 5 | `alg.eq.system.combine`, `alg.cx.polar.arith` | `alg.eq.system`, `alg.cx.polar.arith` |
| 2021 AIME II, Problem 7 | `alg.eq.system.sub` | `alg.eq.system` |
| 2023 AMC 12A, Problem 10 | `alg.eq.system.sub` | `alg.eq.system` |
| 2023 AMC 12B, Problem 22 | `alg.fn.feq.sub` | `alg.fn.feq` |
| 2024 AMC 10A, Problem 23 | `alg.eq.system.combine`, `alg.eq.factor.sfft` | `alg.eq.system.cyclic` |
| 2024 AMC 12A, Problem 17 | `alg.eq.system.combine`, `alg.eq.factor.sfft` | `alg.eq.system.cyclic` |
| 2012 AMC 8, Problem 19 | `alg.eq.system.combine` | `alg.eq.linear.system` |
| 2022 AMC 8, Problem 16 | `alg.eq.system.combine` | `alg.eq.linear.system` |
| 2002 AMC 10A, Problem 9 | `alg.eq.system.combine` | `alg.eq.linear.system` |
| 2002 AMC 10A, Problem 16 | `alg.eq.system.combine` | `alg.eq.linear.system` |
| 2002 AMC 10B, Problem 20 | `alg.eq.system.combine` | `alg.eq.linear.system` |
| 2002 AMC 12B, Problem 19 | `alg.eq.system.combine` | `alg.eq.system` |
| 2006 AMC 12A, Problem 18 | `alg.fn.feq.sub` | `alg.fn.feq` |
| 2012 AMC 10A, Problem 8 | `alg.eq.system.combine` | `alg.eq.linear.system` |
| 2012 AMC 10A, Problem 24 | `alg.eq.system.combine`, `alg.eq.identity.symmetric` | `alg.eq.system` |
| 2012 AMC 12A, Problem 6 | `alg.eq.system.combine` | `alg.eq.linear.system` |
| 2012 AMC 12A, Problem 21 | `alg.eq.system.combine`, `alg.eq.identity.symmetric` | `alg.eq.system` |
| 2015 AMC 10A, Problem 16 | `alg.eq.system.combine` | `alg.eq.system.cyclic` |
| 2018 AMC 10B, Problem 4 | `geo.solid.prism.box`, `alg.eq.system.combine` | `geo.solid.prism.box` |
| 2001 AMC 10, Problem 10 | `alg.eq.system.combine` | `alg.eq.system` |
| 2001 AMC 12, Problem 9 | `alg.fn.feq.sub` | `alg.fn.feq` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `substitute-repeated-block` | `alg.eq.system.sub` | `alg.eq` |
| `name-the-whole-expression` | `alg.eq.system.sub` | `alg.eq` |
| `add-all-equations` | `alg.eq.system.combine` | `alg.eq` |
| `function-symmetry-equation` | `alg.fn.feq.sub` | `alg.fn.feq` |
| `functional-substitution` | `alg.fn.feq.sub` | `alg.fn.feq` |
| `repeated-block-equation` | `alg.eq.system.sub` | `alg.eq` |

#### Polynomial roots and prescribed values

Reviewed all 21 distinct integer-root/higher-degree entries and all eight prescribed-value/interpolation entries (one shared). Retired the rational-root-test and coefficient-divisibility leaves into their genuine subject parents, and the cubic/palindromic method leaves into Higher-degree polynomial equations. Prescribed values and interpolation now share one problem-kind pool; integer-polynomial value questions belong there too. Removed intermediate-polynomial labels from sequence, symmetric-system, complex-plane, isosceles and divisibility questions. The two-minimum rational-function question belongs to rational-function graphs. Corrected the convergence justification in 2002 AIME II #11: the discarded negative ratio makes the companion series diverge, rather than being excluded by the requested radical notation. Checked polynomial factorizations and integer enumerations independently; no answer changed. All cards survive, with the integer-valued polynomial card homed under prescribed values.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2026 AMC 12A, Problem 23 | `alg.seq.sum.telescope`, `alg.poly.higher.cubic` | `alg.seq.sum.telescope` |
| 1983 AIME, Problem 5 | `alg.eq.identity.symmetric`, `alg.poly.introot.rational` | `alg.eq.identity.symmetric` |
| 2002 AIME II, Problem 11 | `alg.seq.ap.infinite`, `alg.poly.introot.rational` | `alg.seq.ap.infinite` (proof corrected) |
| 2003 AIME II, Problem 15 | `alg.cx.unity.sums`, `alg.poly.higher.palin` | `alg.cx.unity.sums` |
| 2005 AIME I, Problem 6 | `alg.poly.higher.cubic` | `alg.poly.higher` |
| 2005 AIME II, Problem 13 | `alg.poly.introot.divides`, `alg.poly.remainder.values` | `alg.poly.construct.interp` |
| 2010 AIME II, Problem 6 | `alg.poly.higher.cubic`, `alg.poly.construct.coeff` | `alg.poly.higher` |
| 2013 AIME I, Problem 5 | `alg.poly.higher.cubic`, `alg.eq.radical.simplify` | `alg.poly.higher`, `alg.eq.radical.simplify` |
| 2014 AIME I, Problem 9 | `alg.poly.higher.cubic`, `alg.poly.vieta.basic` | `alg.poly.vieta.basic` |
| 2014 AIME II, Problem 5 | `alg.poly.vieta.basic`, `alg.poly.higher.cubic` | `alg.poly.vieta.basic` |
| 2015 AIME I, Problem 10 | `alg.poly.construct.given`, `alg.poly.remainder.values` | `alg.poly.construct.interp` |
| 2018 AIME I, Problem 1 | `alg.poly.introot`, `alg.poly.vieta.basic` | `alg.poly.introot` |
| 2018 AIME II, Problem 6 | `alg.poly.introot.rational`, `cp.prob.geom.segment` | `alg.poly.higher`, `cp.prob.geom.segment` |
| 2023 AIME II, Problem 4 | `alg.eq.system.cyclic`, `alg.poly.higher.cubic` | `alg.eq.system.cyclic` |
| 2023 AMC 12B, Problem 14 | `alg.poly.vieta.basic`, `alg.poly.introot.rational` | `alg.poly.introot` |
| 2025 AIME II, Problem 15 | `alg.poly.construct.coeff`, `alg.poly.higher.cubic` | `alg.fn.graph.rational` |
| 2025 AMC 12A, Problem 17 | `alg.cx.polar.plane`, `alg.poly.introot.rational` | `alg.cx.polar.plane` |
| 2003 AMC 12B, Problem 20 | `alg.poly.remainder.values` | `alg.poly.construct.interp` |
| 2014 AMC 12A, Problem 19 | `alg.poly.introot.divides` | `alg.poly.introot` |
| 2014 AMC 12B, Problem 16 | `alg.poly.remainder.values` | `alg.poly.construct.interp` |
| 2015 AMC 12A, Problem 20 | `geo.tri.special.isos`, `alg.poly.higher.cubic` | `geo.tri.special.isos` |
| 2017 AMC 12A, Problem 21 | `alg.poly.introot.divides` | `alg.poly.introot` |
| 2018 AMC 12A, Problem 21 | `alg.poly.higher.cubic` | `alg.poly.higher` |
| 2025 AMC 10B, Problem 10 | `alg.poly.introot.rational`, `nt.div.rules.expr` | `nt.div.rules.expr` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `integer-valued-polynomials` | `alg.poly.introot.divides` | `alg.poly.construct.interp` |
| `polynomial-crt` | `alg.poly.remainder.values` | `alg.poly.construct.interp` |
| `rational-root-theorem` | `alg.poly.introot.rational` | `alg.poly.introot` |
| `cardano-cubic` | `alg.poly.higher.cubic` | `alg.poly.higher` |
| `palindromic-polynomials` | `alg.poly.higher.palin` | `alg.poly.higher` |
| `subtract-and-factor` | `alg.poly.remainder.values` | `alg.poly.construct.interp` |

#### Incidence totals and modular exclusions

Read the entire 18-distinct counting family and all three modulus-rule cases. Retired the misleading Bijections wrapper, promoting its stable child as Repeated counts and incidence totals. Keep classroom-seat, participation-time, cube-face/vertex, layer-colour and team/subset-incidence questions together; remove the secondary counting-method label from subsets, tournament scoring, extremal pairs and the grid puzzle. Elimination tournaments and restricted permutations move to existing kinds. Retired the modulus-exclusion method leaf; its three questions are about primes/composites, with Choose a Modulus homed broadly under modular arithmetic. Replaced the incorrect every-residue claim in 1984 AIME #14 and the overgeneralized zero-remainder step in 1995 AIME #10 with explicit coverage proofs. Exhaustive finite checks and the residue argument verify answers 38 and 215; the four-prime minimum remains 132. No source statement or answer changed.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1983 AIME, Problem 13 | `cp.basic.comb.subsets`, `cp.tech.bij.double` | `cp.basic.comb.subsets` |
| 1984 AIME, Problem 14 | `nt.prime.basic.test`, `nt.mod.basic.rule` | `nt.prime.basic.test` (proof corrected) |
| 1985 AIME, Problem 14 | `cp.graph.tour`, `cp.tech.bij.double` | `cp.graph.tour` |
| 1995 AIME, Problem 10 | `nt.mod.basic.rule`, `nt.prime.basic.test` | `nt.prime.basic.test` (proof corrected) |
| 2009 AIME II, Problem 12 | `cp.logic.pigeon.bounds`, `cp.tech.bij.double` | `cp.logic.pigeon.bounds` |
| 2016 AIME I, Problem 12 | `nt.prime.basic.expr`, `nt.mod.basic.rule` | `nt.prime.basic.expr` |
| 1999 AMC 8, Problem 11 | `cp.logic.puzzle.grid`, `cp.tech.bij.double` | `cp.logic.puzzle.grid` |
| 2016 AMC 8, Problem 18 | `cp.tech.bij` | `cp.graph.tour` |
| 2003 AMC 10B, Problem 15 | `cp.tech.bij` | `cp.graph.tour` |
| 2012 AMC 10B, Problem 22 | `cp.tech.bij` | `cp.basic.perm.restrict` |
| 2012 AMC 12B, Problem 18 | `cp.tech.bij` | `cp.basic.perm.restrict` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `choose-modulus` | `nt.mod.basic.rule` | `nt.mod` |

#### Travel: multi-stage journeys and stops

The owner’s request to fix the audited issues resolves TQ20; added `alg.word.rates.motion.stages` after rereading all 20 distinct direct-parent entries (22 raw). Nine independent examples involve prescribed sequential legs/routes or stops; their recognized twins move too. Two same-distance speed/pace comparisons fit the existing two-speed leaf. Removed the incidental Vieta topic from the moving-storm question while retaining its earned card. The remaining parent cases are rounded travel estimates (2026 AMC 10A #8), moving sightlines/circles (1993 AIME #13 and 1997 AIME #7), reachable regions (2000 AIME I #13), traffic flow (2008 AIME I #12), graph reading (1990 AJHSME #23 and 2009 AMC 8 #3), sound-distance/unit conversion (2001 AMC 8 #5), and four separate integer-pace trips (2017 AMC 8 #23). None is forced into a prescribed-stage journey. The two graph questions retain their data label; the geometric and optimization subjects remain where genuine. Checked leg-time sums and the common-arrival equations; no answer or strategy changed.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1997 AIME, Problem 7 | `alg.word.rates.motion`, `alg.poly.vieta.basic` | `alg.word.rates.motion` |
| 2008 AIME II, Problem 2 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |
| 2012 AIME II, Problem 4 | `alg.word.rates.motion`, `geo.basic.pyth.triples` | `alg.word.rates.motion.stages`, `geo.basic.pyth.triples` |
| 2013 AIME I, Problem 1 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |
| 1985 AJHSME, Problem 13 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |
| 2005 AMC 8, Problem 10 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |
| 2015 AMC 8, Problem 3 | `alg.word.rates.motion` | `alg.word.rates.motion.speeds` |
| 2016 AMC 8, Problem 4 | `alg.word.rates.motion` | `alg.word.rates.motion.speeds` |
| 2007 AMC 10A, Problem 13 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |
| 2007 AMC 12A, Problem 9 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |
| 2009 AMC 10A, Problem 4 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |
| 2017 AMC 10A, Problem 9 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |
| 2017 AMC 10B, Problem 7 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |
| 2017 AMC 12B, Problem 4 | `alg.word.rates.motion` | `alg.word.rates.motion.stages` |

#### Probability review, first batch

Read all 89 distinct entries before changing the fallback. This first batch covers the earlier half of the review list. Finite draws/deals move to the existing sampling leaf, the cube-edge event to Random walks (a whole-path event, not just a terminal state), and the independence question keeps only its specific probability kind. Remove root-filter/stars-and-bars/multinomial labels where they merely name tools, retaining actual distribution/divisor/root subjects. General finite probability models remains the fallback for finite numerical, arrangement, lattice and geometric point samples; these are not continuous geometric probabilities. Corrected the 2013 AIME I #6 description of the three-book box, without changing its count. Exact checks cover cube walks, octahedron moves, independence tallies, box deals and lottery sets. No new probability node is needed.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1993 AIME, Problem 7 | `cp.struct.catalan`, `cp.prob.basic.count` | `cp.struct.catalan`, `cp.prob.dice.draw` |
| 1998 AIME, Problem 4 | `cp.prob.basic.count`, `nt.div.rules.parity` | `cp.prob.dice.draw`, `nt.div.rules.parity` |
| 2010 AIME I, Problem 1 | `nt.divisor.count.tau`, `cp.prob.basic.count` | `nt.divisor.count.tau`, `cp.prob.dice.draw` |
| 2013 AIME I, Problem 6 | `cp.prob.basic.count` | `cp.prob.dice.draw` (proof corrected) |
| 2015 AIME I, Problem 2 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2018 AIME I, Problem 3 | `cp.prob.basic.count`, `cp.struct.words.runs` | `cp.prob.dice.draw`, `cp.struct.words.runs` |
| 2020 AIME I, Problem 9 | `nt.divisor.count.tau`, `cp.tech.stars.identical`, `cp.prob.basic.count` | `nt.divisor.count.tau`, `cp.prob.basic.count` |
| 2023 AMC 10B, Problem 21 | `cp.prob.basic.count`, `alg.cx.unity.filter` | `cp.prob.basic.count`, `cp.tech.stars.distinct` |
| 2023 AMC 12B, Problem 19 | `cp.prob.basic.count`, `alg.cx.unity.filter` | `cp.prob.basic.count`, `cp.tech.stars.distinct` |
| 2024 AMC 10A, Problem 24 | `cp.struct.paths.walks`, `cp.prob.basic.count` | `cp.prob.process.walk` |
| 2024 AMC 12A, Problem 16 | `cp.prob.basic.count`, `cp.binom.thm.multinomial` | `cp.prob.dice.draw` |
| 2024 AMC 12B, Problem 17 | `alg.poly.vieta.basic`, `cp.prob.basic.count` | `alg.poly.introot`, `cp.prob.basic.count` |
| 2024 AMC 12B, Problem 25 | `cp.prob.cond.indep`, `cp.prob.basic.count` | `cp.prob.cond.indep` |
| 2025 AMC 12A, Problem 13 | `cp.prob.basic.count`, `cp.logic.pigeon.bounds` | `cp.prob.basic.count`, `cp.graph.sets` |
| 2008 AMC 8, Problem 24 | `cp.prob.basic.count` | `cp.prob.dice.dice` |
| 2011 AMC 8, Problem 12 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.struct.seat.circle` |
| 2013 AMC 8, Problem 14 | `cp.prob.basic.count` | `cp.prob.dice.draw` |

#### Probability review, remaining cases

Applied the remaining existing-category decisions after reading the full pool. Explicit dice, coins, draws and path/state processes now use their specific probability kinds. Added missing arrangement, symmetry, tiling and prime subjects only where the statement itself imposes those conditions. The lottery question is conditional on the winning ticket satisfying the stated log constraint. Replaced an unsupported smaller-moduli check in 2011 AMC 12B #25 with the centered-residue formula and a uniform bound; exhaustive enumeration of all 50 odd moduli confirms the same minimum 34/67. Kept arbitrary numerical pairs, spinners, grid-point samples and inverse bag-composition questions in the general finite pool; no continuous-probability label was inferred from a drawing. No recurring missing kind required a new node.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2017 AMC 8, Problem 10 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2018 AMC 8, Problem 11 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.basic.perm.restrict` |
| 2019 AMC 8, Problem 6 | `cp.prob.basic.count` | `cp.prob.basic.count`, `geo.coord.transform.reflect` |
| 2023 AMC 8, Problem 23 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.struct.tile.tiling` |
| 2003 AMC 12B, Problem 19 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.basic.perm.restrict` |
| 2005 AMC 10A, Problem 9 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.basic.perm.repeat` |
| 2005 AMC 12A, Problem 14 | `cp.prob.basic.count` | `cp.prob.dice.dice` |
| 2005 AMC 10B, Problem 21 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2005 AMC 12B, Problem 25 | `cp.prob.basic.count` | `cp.prob.process.steps` |
| 2006 AMC 10A, Problem 25 | `cp.graph.basic.paths`, `cp.prob.basic.count` | `cp.prob.process.walk` |
| 2006 AMC 12A, Problem 20 | `cp.graph.basic.paths`, `cp.prob.basic.count` | `cp.prob.process.walk` |
| 2010 AMC 10A, Problem 18 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2010 AMC 12A, Problem 16 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2011 AMC 12B, Problem 25 | `alg.fn.floor.eq`, `cp.prob.basic.count` | `alg.fn.floor.eq`, `cp.prob.basic.count` (proof corrected) |
| 2012 AMC 10A, Problem 20 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.tech.sym` |
| 2012 AMC 12A, Problem 15 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.tech.sym` |
| 2013 AMC 10B, Problem 12 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2015 AMC 10A, Problem 22 | `cp.struct.words.forbidden`, `cp.prob.basic.count` | `cp.struct.words.forbidden`, `cp.prob.dice.coins` |
| 2015 AMC 12A, Problem 17 | `cp.struct.words.forbidden`, `cp.prob.basic.count` | `cp.struct.words.forbidden`, `cp.prob.dice.coins` |
| 2015 AMC 10B, Problem 11 | `cp.prob.basic.count` | `cp.prob.basic.count`, `nt.prime.basic.test` |
| 2016 AMC 10A, Problem 17 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.basic.perm.repeat` |
| 2016 AMC 12A, Problem 13 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.basic.perm.repeat` |
| 2020 AMC 12B, Problem 20 | `cp.struct.tile.color`, `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.tech.sym` |
| 2000 AMC 12, Problem 23 | `cp.prob.basic.count`, `alg.exp.log.rules` | `cp.prob.cond.bayes`, `alg.exp.log.rules` |
| 2021 Fall AMC 10A, Problem 21 | `cp.prob.basic.count`, `cp.basic.perm.repeat` | `cp.prob.basic.count`, `cp.tech.stars.distinct` |
| 2021 Fall AMC 12A, Problem 18 | `cp.prob.basic.count`, `cp.basic.perm.repeat` | `cp.prob.basic.count`, `cp.tech.stars.distinct` |

##### Complete finite-probability disposition register

All 89 recognized distinct fallback entries were read. “Retain” includes genuinely cross-filed finite-space models; a repeated random arrangement is already described by its counting subject and does not require a second probability taxonomy. Sampling/dealing categories use the existing draw leaf, while finite numerical/point-location sample spaces can remain general. No missing kind is being silently deferred.

| Read problem | Disposition |
|---|---|
| 2026 AMC 10A, Problem 21 | Retain general finite model |
| 1984 AIME, Problem 11 | Retain general finite model |
| 1987 AIME, Problem 13 | Retain general finite model |
| 1988 AIME, Problem 5 | Retain general finite model |
| 1993 AIME, Problem 7 | Specific existing probability destination |
| 1997 AIME, Problem 14 | Retain general finite model |
| 1998 AIME, Problem 4 | Specific existing probability destination |
| 1999 AIME, Problem 10 | Retain general finite model |
| 2001 AIME I, Problem 10 | Retain general finite model |
| 2001 AIME I, Problem 15 | Retain general finite model |
| 2002 AIME I, Problem 1 | Retain general finite model |
| 2004 AIME II, Problem 10 | Retain general finite model |
| 2005 AIME I, Problem 9 | Retain general finite model |
| 2007 AIME II, Problem 10 | Retain general finite model |
| 2008 AIME I, Problem 9 | Retain general finite model |
| 2010 AIME I, Problem 1 | Specific existing probability destination |
| 2010 AIME II, Problem 4 | Retain general finite model |
| 2011 AIME I, Problem 10 | Retain general finite model |
| 2013 AIME I, Problem 4 | Retain general finite model |
| 2013 AIME I, Problem 6 | Specific existing probability destination / proof clarified |
| 2014 AIME I, Problem 12 | Retain general finite model |
| 2015 AIME I, Problem 2 | Specific existing probability destination |
| 2015 AIME II, Problem 5 | Retain general finite model |
| 2018 AIME I, Problem 3 | Specific existing probability destination |
| 2019 AIME I, Problem 2 | Retain general finite model |
| 2020 AIME I, Problem 9 | Retain finite model; refine its subject |
| 2021 Spring AMC 10B, Problem 22 | Retain general finite model |
| 2022 AIME I, Problem 9 | Retain general finite model |
| 2023 AIME I, Problem 1 | Retain general finite model |
| 2023 AMC 10A, Problem 25 | Retain general finite model |
| 2023 AMC 10B, Problem 21 | Retain finite model; refine its subject |
| 2024 AIME I, Problem 11 | Retain general finite model |
| 2024 AMC 10A, Problem 24 | Specific existing probability destination |
| 2024 AMC 12A, Problem 16 | Specific existing probability destination |
| 2024 AMC 12B, Problem 17 | Retain finite model; refine its subject |
| 2024 AMC 12B, Problem 25 | Specific existing probability destination |
| 2025 AIME I, Problem 7 | Retain general finite model |
| 2025 AMC 10A, Problem 14 | Retain general finite model |
| 2025 AMC 12A, Problem 13 | Retain finite model; refine its subject |
| 1985 AJHSME, Problem 22 | Retain general finite model |
| 1990 AJHSME, Problem 14 | Retain general finite model |
| 1997 AJHSME, Problem 9 | Retain general finite model |
| 2006 AMC 8, Problem 17 | Retain general finite model |
| 2008 AMC 8, Problem 19 | Retain general finite model |
| 2008 AMC 8, Problem 24 | Specific existing probability destination |
| 2009 AMC 8, Problem 10 | Retain general finite model |
| 2009 AMC 8, Problem 12 | Retain general finite model |
| 2009 AMC 8, Problem 13 | Retain general finite model |
| 2011 AMC 8, Problem 12 | Retain finite model; refine its subject |
| 2013 AMC 8, Problem 14 | Specific existing probability destination |
| 2015 AMC 8, Problem 11 | Retain general finite model |
| 2016 AMC 8, Problem 13 | Retain general finite model |
| 2017 AMC 8, Problem 10 | Specific existing probability destination |
| 2018 AMC 8, Problem 11 | Retain finite model; refine its subject |
| 2019 AMC 8, Problem 6 | Retain finite model; refine its subject |
| 2020 AMC 8, Problem 13 | Retain general finite model |
| 2022 AMC 8, Problem 12 | Retain general finite model |
| 2023 AMC 8, Problem 23 | Retain finite model; refine its subject |
| 2002 AMC 10A, Problem 24 | Retain general finite model |
| 2003 AMC 12B, Problem 19 | Retain finite model; refine its subject |
| 2004 AMC 10A, Problem 5 | Retain general finite model |
| 2005 AMC 10A, Problem 9 | Retain finite model; refine its subject |
| 2005 AMC 12A, Problem 14 | Specific existing probability destination |
| 2005 AMC 12A, Problem 23 | Retain general finite model |
| 2005 AMC 10B, Problem 21 | Specific existing probability destination |
| 2005 AMC 12B, Problem 25 | Specific existing probability destination |
| 2006 AMC 10A, Problem 25 | Specific existing probability destination |
| 2007 AMC 10B, Problem 19 | Retain general finite model |
| 2008 AMC 10B, Problem 22 | Retain general finite model |
| 2009 AMC 10B, Problem 25 | Retain general finite model |
| 2010 AMC 10A, Problem 18 | Specific existing probability destination |
| 2010 AMC 10B, Problem 18 | Retain general finite model |
| 2011 AMC 12A, Problem 14 | Retain general finite model |
| 2011 AMC 12B, Problem 25 | Retain general finite model / proof clarified |
| 2012 AMC 10A, Problem 20 | Retain finite model; refine its subject |
| 2013 AMC 10B, Problem 12 | Specific existing probability destination |
| 2015 AMC 10A, Problem 22 | Specific existing probability destination |
| 2015 AMC 12A, Problem 24 | Retain general finite model |
| 2015 AMC 10B, Problem 11 | Retain finite model; refine its subject |
| 2015 AMC 10B, Problem 16 | Retain general finite model |
| 2015 AMC 12B, Problem 6 | Retain general finite model |
| 2016 AMC 10A, Problem 17 | Retain finite model; refine its subject |
| 2018 AMC 10A, Problem 19 | Retain general finite model |
| 2019 AMC 10A, Problem 20 | Retain general finite model |
| 2020 AMC 10A, Problem 15 | Retain general finite model |
| 2020 AMC 12B, Problem 20 | Retain finite model; refine its subject |
| 2021 Spring AMC 12A, Problem 6 | Retain general finite model |
| 2000 AMC 12, Problem 23 | Specific existing probability destination |
| 2021 Fall AMC 10A, Problem 21 | Retain finite model; refine its subject |

#### Geometry: hidden-right-triangle boundary

Read all 30 distinct entries in Right triangles hidden in figures. Retired that method-based leaf. Genuine right-triangle length questions move to the existing right-triangle-length pool; square/rectangle, chord, circular-region, current, perimeter and inscribed-shape problems move to their actual subjects. Pythagorean and other earned cards remain available across those subjects. Kept the two reworded 2005 AMC 10A/12A twins aligned manually. The Shared-leg Pythagoras pattern homes with right-triangle lengths. Also removed the incidental isosceles label from the 2001 AIME II #13 similar-triangle question already read in the companion review. No statement, strategy or answer changed.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1985 AIME, Problem 4 | `geo.poly.quad.rect`, `geo.basic.pyth.hidden` | `geo.poly.quad.rect` |
| 1994 AIME, Problem 2 | `geo.poly.quad.rect`, `geo.basic.pyth.hidden` | `geo.poly.quad.rect`, `geo.circ.tangent.mutual` |
| 2001 AIME II, Problem 13 | `geo.basic.sim.similar`, `geo.basic.angle.isosceles` | `geo.basic.sim.similar` |
| 2006 AIME I, Problem 1 | `geo.basic.pyth.hidden` | `geo.basic.pyth.triples` |
| 2011 AIME I, Problem 2 | `geo.poly.quad.rect`, `geo.basic.pyth.hidden` | `geo.poly.quad.rect` |
| 2011 AIME II, Problem 2 | `geo.poly.quad.rect`, `geo.basic.pyth.hidden` | `geo.poly.quad.rect` |
| 2022 AIME I, Problem 5 | `alg.word.rates.current`, `geo.basic.pyth.hidden` | `alg.word.rates.current` |
| 2023 AMC 10A, Problem 11 | `geo.basic.pyth.hidden`, `alg.eq.identity.symmetric` | `geo.basic.pyth.triples` |
| 2023 AMC 12A, Problem 9 | `geo.basic.pyth.hidden`, `alg.eq.identity.symmetric` | `geo.basic.pyth.triples` |
| 2025 AMC 10A, Problem 15 | `geo.basic.sim.similar`, `geo.basic.pyth.hidden` | `geo.basic.sim.similar` |
| 2010 AMC 8, Problem 19 | `geo.basic.pyth.hidden` | `geo.circ.power.chord`, `geo.poly.composite.arcs` |
| 2012 AMC 8, Problem 25 | `geo.basic.pyth.hidden` | `geo.poly.quad.rect` |
| 2013 AMC 8, Problem 20 | `geo.basic.pyth.hidden` | `geo.poly.quad.rect`, `geo.circ.power.chord` |
| 2015 AMC 8, Problem 25 | `geo.basic.pyth.hidden` | `geo.comb.extreme.maxmin`, `geo.poly.quad.rect` |
| 2020 AMC 8, Problem 18 | `geo.basic.pyth.hidden` | `geo.poly.quad.rect`, `geo.circ.power.chord` |
| 2024 AMC 8, Problem 6 | `geo.basic.pyth.hidden` | `geo.poly.general.perim` |
| 2025 AMC 8, Problem 12 | `geo.basic.pyth.hidden` | `geo.comb.extreme.maxmin`, `geo.circ.tangent.inscribed` |
| 2002 AMC 10B, Problem 22 | `geo.basic.pyth.hidden` | `geo.basic.pyth.triples` |
| 2002 AMC 12B, Problem 20 | `geo.basic.pyth.hidden` | `geo.basic.pyth.triples` |
| 2004 AMC 10B, Problem 8 | `geo.basic.pyth.hidden` | `geo.basic.pyth.triples` |
| 2004 AMC 12B, Problem 6 | `geo.basic.pyth.hidden` | `geo.basic.pyth.triples` |
| 2005 AMC 10A, Problem 8 | `geo.basic.pyth.hidden` | `geo.poly.quad.rect` |
| 2005 AMC 12A, Problem 7 | `geo.basic.pyth.hidden` | `geo.poly.quad.rect` |
| 2006 AMC 10B, Problem 8 | `geo.basic.pyth.hidden` | `geo.poly.quad.rect`, `geo.circ.power.chord` |
| 2008 AMC 10A, Problem 25 | `geo.poly.regular.hex`, `geo.basic.pyth.hidden` | `geo.poly.regular.hex`, `geo.circ.power.chord` |
| 2008 AMC 12A, Problem 22 | `geo.poly.regular.hex`, `geo.basic.pyth.hidden` | `geo.poly.regular.hex`, `geo.circ.power.chord` |
| 2008 AMC 10B, Problem 10 | `geo.basic.pyth.hidden` | `geo.circ.power.chord` |
| 2008 AMC 12B, Problem 9 | `geo.basic.pyth.hidden` | `geo.circ.power.chord` |
| 2009 AMC 10B, Problem 10 | `geo.basic.pyth.hidden` | `geo.basic.pyth.triples` |
| 2010 AMC 10B, Problem 19 | `geo.tri.special.equil`, `geo.basic.pyth.hidden` | `geo.tri.special.equil`, `geo.circ.power.chord` |
| 2011 AMC 10A, Problem 11 | `geo.basic.pyth.hidden` | `geo.poly.quad.rect` |
| 2016 AMC 12B, Problem 13 | `geo.tri.special.right`, `geo.basic.pyth.hidden` | `geo.tri.special.right` |
| 2018 AMC 12B, Problem 4 | `geo.basic.pyth.hidden` | `geo.circ.power.chord` |
| 2019 AMC 10B, Problem 16 | `geo.basic.angle.isosceles`, `geo.basic.pyth.hidden` | `geo.basic.angle.isosceles`, `geo.basic.pyth.triples` |
| 2019 AMC 12B, Problem 12 | `alg.trig.identity.sum`, `geo.basic.pyth.hidden` | `geo.tri.trig.other`, `geo.basic.pyth.triples` |
| 2025 AMC 10B, Problem 7 | `geo.basic.pyth.hidden`, `alg.eq.radical.eq` | `geo.basic.pyth.triples` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `shared-leg-pythagoras` | `geo.basic.pyth.hidden` | `geo.basic.pyth.triples` |

#### Geometry: unified triangle families

Read all 37 distinct isosceles cases, all 19 parallel-segment cases and the complete current 30-entry right-triangle-length pool, in addition to the hidden-right review. Retired the duplicate isosceles-angle leaf into Isosceles triangles, removing incidental equal-radius/constructed-triangle labels from circle, trapezoid and rotation problems. Right triangles and Similar triangles now live under Triangles; parallel cuts/midsegments are a meaningful child of triangle similarity. Folding moves under Transformations, and Transformations moves out of coordinate-only geometry to Angles, similarity and transformations. General similarity of figures/solids remains separate. Rectangle/route questions and a folded-table question receive their actual subjects. The pure structural step exactly preserves the before/after problem and card-home unions for all three destination pools and the entire geometry subject; the separately listed semantic corrections intentionally change memberships. Stable ids survive moves; only the redundant isosceles-angle id is retired here.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1984 AIME, Problem 3 | `geo.basic.sim.parallel`, `geo.basic.sim.figures` | `geo.basic.sim.parallel` |
| 1986 AIME, Problem 9 | `geo.basic.sim.parallel`, `geo.basic.sim.figures` | `geo.basic.sim.parallel` |
| 1995 AIME, Problem 9 | `alg.trig.identity.sum`, `geo.tri.special.isos` | `geo.tri.special.isos` |
| 2000 AIME I, Problem 14 | `geo.basic.angle.isosceles`, `geo.tri.trig.sines` | `geo.tri.special.isos`, `geo.tri.trig.sines` |
| 2003 AIME I, Problem 10 | `geo.basic.angle.isosceles`, `geo.basic.sim.congruent` | `geo.tri.special.isos`, `geo.basic.sim.congruent` |
| 2011 AIME I, Problem 4 | `geo.tri.cevian.bisector`, `geo.basic.sim.parallel` | `geo.tri.cevian.bisector` |
| 2011 AIME I, Problem 8 | `geo.comb.extreme.maxmin`, `geo.basic.sim.parallel` | `geo.comb.extreme.maxmin`, `geo.basic.pyth.fold` |
| 2012 AIME II, Problem 4 | `alg.word.rates.motion.stages`, `geo.basic.pyth.triples` | `alg.word.rates.motion.stages`, `geo.poly.quad.rect` |
| 2014 AIME I, Problem 1 | `geo.basic.pyth.triples` | `geo.poly.general.perim` |
| 2014 AIME II, Problem 3 | `geo.poly.composite.add`, `geo.tri.special.isos` | `geo.poly.composite.add` |
| 2014 AIME II, Problem 11 | `geo.tri.special.right`, `geo.basic.sim.parallel` | `geo.tri.special.right` |
| 2015 AIME I, Problem 6 | `geo.circ.inscribed.thm`, `geo.basic.angle.isosceles` | `geo.circ.inscribed.thm` |
| 2015 AIME I, Problem 11 | `geo.tri.trig.other`, `geo.tri.special.isos` | `geo.tri.special.isos`, `geo.tri.radii.in` |
| 2019 AIME II, Problem 1 | `geo.basic.sim.similar`, `geo.basic.pyth.triples` | `geo.basic.sim.similar`, `geo.poly.composite.overlap` |
| 2020 AIME I, Problem 1 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |
| 2022 AIME I, Problem 3 | `geo.poly.quad.trap`, `geo.basic.angle.isosceles` | `geo.poly.quad.trap` |
| 2023 AMC 10B, Problem 7 | `geo.basic.angle.isosceles`, `geo.coord.transform.rotate` | `geo.coord.transform.rotate` |
| 2000 AMC 8, Problem 13 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |
| 2000 AMC 8, Problem 24 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |
| 2007 AMC 8, Problem 14 | `geo.tri.special.isos`, `geo.basic.pyth.triples` | `geo.tri.special.isos` |
| 2009 AMC 8, Problem 19 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |
| 2014 AMC 8, Problem 9 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |
| 2003 AMC 10B, Problem 6 | `geo.basic.pyth.triples` | `geo.poly.quad.rect` |
| 2003 AMC 12B, Problem 5 | `geo.basic.pyth.triples` | `geo.poly.quad.rect` |
| 2007 AMC 10A, Problem 8 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |
| 2007 AMC 12A, Problem 6 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |
| 2008 AMC 10A, Problem 14 | `geo.basic.pyth.triples` | `geo.poly.quad.rect` |
| 2008 AMC 12A, Problem 9 | `geo.basic.pyth.triples` | `geo.poly.quad.rect` |
| 2008 AMC 10B, Problem 24 | `geo.basic.angle.isosceles`, `geo.tri.special.equil` | `geo.tri.special.isos` |
| 2009 AMC 10B, Problem 9 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |
| 2015 AMC 10A, Problem 11 | `geo.basic.pyth.triples` | `geo.poly.quad.rect` |
| 2015 AMC 12A, Problem 8 | `geo.basic.pyth.triples` | `geo.poly.quad.rect` |
| 2019 AMC 10B, Problem 16 | `geo.basic.angle.isosceles`, `geo.basic.pyth.triples` | `geo.tri.special.isos`, `geo.basic.pyth.triples` |
| 2022 AMC 10B, Problem 2 | `geo.poly.quad.para`, `geo.basic.pyth.triples` | `geo.poly.quad.para` |
| 2022 AMC 12B, Problem 2 | `geo.poly.quad.para`, `geo.basic.pyth.triples` | `geo.poly.quad.para` |
| 2021 Fall AMC 10A, Problem 7 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |
| 2021 Fall AMC 12A, Problem 6 | `geo.basic.angle.isosceles` | `geo.tri.special.isos` |

#### Integer square and power conditions

Read all 27 distinct problems in the power-expression/factorable-equation union. Move the stable power-expression node from number-theory sequences to Diophantine equations, with Differences of squares and shifted square equations beneath it. This makes the actual broad/narrow relationship explicit and removes redundant parent labels. Keep genuine prime, digit and integer-length subjects; factorization alone no longer adds a second subject to divisor-pair questions. General factorable equations stay under Factoring and SFFT; Quadratic Diophantine equations houses binary quadratic forms, rather than miscalling them differences of squares. The two corrected strategies supply equality attainment for the 1991 minimum and distinguish root distances from roots in the 2014 parabola question. All answers are unchanged and the numerical claims were checked. No nodes or cards were deleted.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1991 AIME, Problem 15 | `alg.ineq.means.cs`, `nt.dio.factor.squares` | `alg.ineq.means.cs`, `nt.dio.factor.squares` (proof corrected) |
| 1999 AIME, Problem 3 | `nt.seq.power.expr`, `nt.dio.factor.squares` | `nt.dio.factor.squares` |
| 2000 AIME II, Problem 2 | `nt.dio.factor.squares`, `nt.divisor.count.tau` | `nt.dio.factor.squares` |
| 2003 AIME I, Problem 7 | `geo.tri.cevian.stewart`, `nt.dio.factor.squares` | `geo.tri.special.isos`, `nt.dio.factor.squares` |
| 2003 AIME II, Problem 10 | `nt.dio.factor.squares`, `nt.seq.power.expr` | `nt.dio.factor.squares` |
| 2005 AIME I, Problem 4 | `nt.seq.power.expr`, `nt.dio.bound.size` | `nt.seq.power.expr` |
| 2008 AIME II, Problem 15 | `nt.dio.squares.sums`, `nt.dio.factor.squares` | `nt.seq.power.expr` |
| 2014 AIME I, Problem 6 | `alg.poly.quad.vertex`, `nt.dio.factor.squares` | `alg.poly.quad.vertex`, `alg.poly.introot` (proof corrected) |
| 2015 AIME I, Problem 3 | `nt.prime.basic.expr`, `nt.dio.factor.squares` | `nt.prime.basic.expr`, `nt.seq.power.expr` |
| 2017 AIME II, Problem 6 | `nt.seq.power.expr`, `nt.dio.factor.squares` | `nt.dio.factor.squares` |
| 2022 AIME I, Problem 14 | `geo.tri.centers.lemmas`, `geo.tri.trig.cosines`, `nt.dio.factor.squares` | `geo.tri.centers.lemmas`, `geo.tri.trig.cosines`, `nt.dio.squares` |
| 2023 AMC 10A, Problem 23 | `nt.dio.factor.squares`, `nt.divisor.count.pairs` | `nt.divisor.count.pairs` |
| 2023 AMC 10B, Problem 14 | `nt.seq.power.expr`, `nt.dio.bound.size` | `nt.seq.power.expr` |
| 2024 AMC 10A, Problem 11 | `nt.dio.factor.squares`, `nt.seq.power.expr` | `nt.dio.factor.squares` |
| 2024 AMC 10A, Problem 15 | `nt.dio.factor.squares`, `nt.seq.power.expr` | `nt.dio.factor.squares` |
| 2024 AMC 12A, Problem 9 | `nt.dio.factor.squares`, `nt.seq.power.expr` | `nt.dio.factor.squares` |
| 2025 AIME I, Problem 4 | `nt.dio.factor.squares`, `nt.div.rules.count` | `nt.dio.factor` |
| 2011 AMC 12B, Problem 21 | `nt.dio.factor.squares` | `nt.digit.sum.reverse`, `nt.dio.factor.squares` |
| 2016 AMC 12B, Problem 10 | `geo.coord.line.dist`, `nt.dio.factor.squares` | `geo.poly.quad.rect`, `nt.dio.factor.squares` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `binary-quadratic-forms` | `nt.dio.factor.squares` | `nt.dio.squares` |

#### Extremal subsets, constructions and actual subjects

Read all 28 distinct problems in the subset/bounds/extremal union. Move the stable set-family node under Constructions and bounds, explicitly covering maximal and intersecting set families as well as forbidden pairs. Remove redundant broad labels and incidental optimization labels from operations, statistics, graph connectivity, absolute values and Venn-overlap questions. Retire the technique-only Extremal principle node: its three problems receive their actual kinds, Dilworth moves to extremal sets, and the general extremal method remains available without a subject home. All 774 cards survive (739 homes; 35 general methods without). The 1989 AIME subset proof now supplies the missing first-twenty bound and treats periodic residues as a construction, not a characterization. The 2026 AIME grid proof now proves a global bound by threshold cuts and an interior matching, replacing the explicitly incomplete checkerboard/annealing claim; both attainments and all numerical values were checked exactly. The grid cites the double-counting and coloring routes it actually uses, not a generic extremal-principle tag.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2026 AMC 10A, Problem 25 | `cp.logic.pigeon.bounds`, `cp.logic.invariant.ops` | `cp.logic.invariant.ops` |
| 2026 AIME II, Problem 13 | `cp.logic.pigeon.bounds`, `nt.div.prime.factor` | `cp.logic.pigeon.bounds` |
| 2026 AIME I, Problem 11 | `cp.logic.pigeon.bounds` | `cp.logic.pigeon.bounds` (proof corrected) |
| 1988 AIME, Problem 4 | `alg.eq.abs.eq`, `cp.logic.pigeon.bounds` | `alg.eq.abs.eq` |
| 1989 AIME, Problem 13 | `cp.graph.sets` | `cp.graph.sets` (proof corrected) |
| 2022 AMC 10B, Problem 14 | `cp.graph.sets`, `cp.logic.pigeon.bounds` | `cp.graph.sets` |
| 2023 AIME II, Problem 11 | `cp.graph.sets`, `cp.basic.comb.subsets` | `cp.graph.sets` |
| 2023 AMC 10B, Problem 10 | `cp.logic.pigeon.bounds`, `cp.logic.invariant.parity` | `cp.logic.pigeon.bounds` |
| 2023 AMC 12B, Problem 5 | `cp.logic.pigeon.bounds`, `cp.logic.invariant.parity` | `cp.logic.pigeon.bounds` |
| 2024 AMC 10A, Problem 4 | `cp.logic.pigeon.bounds` | `alg.ineq.optimize.integer` |
| 2024 AMC 10A, Problem 6 | `cp.logic.invariant.ops`, `cp.logic.pigeon.bounds` | `cp.logic.invariant.ops` |
| 2024 AMC 10A, Problem 20 | `cp.graph.sets`, `cp.logic.pigeon.bounds` | `cp.graph.sets` |
| 2024 AMC 10B, Problem 12 | `cp.basic.comb.subsets`, `cp.logic.pigeon.bounds` | `cp.graph.sets` |
| 2024 AMC 10B, Problem 16 | `cp.logic.invariant.parity`, `cp.logic.invariant.ops`, `cp.logic.pigeon.bounds` | `cp.logic.invariant.parity` |
| 2024 AMC 12A, Problem 3 | `cp.logic.pigeon.bounds` | `alg.ineq.optimize.integer` |
| 2025 AMC 10A, Problem 21 | `cp.graph.sets`, `cp.logic.pigeon.bounds` | `cp.graph.sets` |
| 2025 AMC 12A, Problem 15 | `cp.graph.sets`, `cp.logic.pigeon.bounds` | `cp.graph.sets` |
| 1988 AJHSME, Problem 16 | `cp.logic.pigeon.bounds` | `cp.graph.sets` |
| 2025 AMC 8, Problem 15 | `cp.logic.pigeon.extremal` | `cp.logic.pigeon.bounds` |
| 2005 AMC 10B, Problem 25 | `cp.logic.pigeon.extremal` | `cp.graph.sets` |
| 2010 AMC 10B, Problem 12 | `cp.logic.pigeon.bounds` | `cp.tech.pie.venn` |
| 2010 AMC 12B, Problem 6 | `cp.logic.pigeon.bounds` | `cp.tech.pie.venn` |
| 2012 AMC 12A, Problem 17 | `nt.mod.basic.arith`, `cp.logic.pigeon.extremal` | `nt.mod.basic.arith`, `cp.graph.sets` |
| 2018 AMC 10B, Problem 14 | `cp.logic.pigeon.bounds` | `alg.word.stats.median` |
| 2018 AMC 12B, Problem 10 | `cp.logic.pigeon.bounds` | `alg.word.stats.median` |
| 2021 Fall AMC 12A, Problem 16 | `cp.graph.basic.trees`, `cp.logic.pigeon.bounds` | `cp.graph.basic.trees` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `dilworths-theorem` | `cp.logic.pigeon.extremal` | `cp.graph.sets` |
| `extremal-principle` | `cp.logic.pigeon.extremal` | `None` |

#### One symmetry pool, distinguished by problem rather than solution tool

Read the entire current pool: 15 distinct problems (the original 13 plus two moved during the probability review). Merge the necklace/rotation and Burnside leaves into the stable parent, renamed Rotations, reflections and symmetry conditions. It covers equivalence classes and prescribed invariance; the cards still distinguish Burnside, orbit reasoning and direct enumeration. Every old descendant filing survives at that parent and all three affected reference cards retain a home. The cube-labeling solution now prints the three valid neighbor triples and the face equations behind its finite check; exhaustive enumeration of all 35 triples verifies them. No answer changed.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1996 AIME, Problem 7 | `cp.tech.sym.burnside` | `cp.tech.sym` |
| 2006 AIME II, Problem 8 | `cp.tech.sym.burnside` | `cp.tech.sym` |
| 2013 AIME I, Problem 4 | `cp.tech.sym.necklace`, `cp.prob.basic.count` | `cp.tech.sym`, `cp.prob.basic.count` |
| 2017 AMC 10B, Problem 18 | `cp.tech.sym.burnside` | `cp.tech.sym` |
| 2024 AIME I, Problem 11 | `cp.prob.basic.count`, `cp.tech.sym.necklace` | `cp.prob.basic.count`, `cp.tech.sym` |
| 2003 AMC 12B, Problem 10 | `cp.tech.sym.necklace` | `cp.tech.sym` |
| 2007 AMC 12B, Problem 16 | `cp.tech.sym.burnside` | `cp.tech.sym` |
| 2010 AMC 12A, Problem 25 | `cp.tech.sym.burnside`, `cp.tech.stars.bounds` | `cp.tech.sym`, `cp.tech.stars.bounds` |
| 2016 AMC 10A, Problem 18 | `cp.tech.sym.necklace` | `cp.tech.sym` (proof corrected) |
| 2016 AMC 12A, Problem 14 | `cp.tech.sym.necklace` | `cp.tech.sym` (proof corrected) |
| 2017 AMC 12B, Problem 13 | `cp.tech.sym.burnside` | `cp.tech.sym` |
| 2018 AMC 10A, Problem 20 | `cp.tech.sym.necklace` | `cp.tech.sym` |
| 2018 AMC 12A, Problem 15 | `cp.tech.sym.necklace` | `cp.tech.sym` |
| 2000 AMC 12, Problem 25 | `cp.tech.sym.burnside` | `cp.tech.sym` |
| 2021 Fall AMC 10B, Problem 24 | `cp.tech.sym.burnside` | `cp.tech.sym` |
| 2021 Fall AMC 12B, Problem 20 | `cp.tech.sym.burnside` | `cp.tech.sym` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `necklace-formula` | `cp.tech.sym.necklace` | `cp.tech.sym` |
| `burnsides-lemma` | `cp.tech.sym.burnside` | `cp.tech.sym` |
| `polya-enumeration` | `cp.tech.sym.burnside` | `cp.tech.sym` |

#### Sparse leaves: actual kinds, broader homes and proof review

Read the complete parameter-system, variation, organized-listing, generating-function and Stewart/Brahmagupta filing pools before changing them. The sole parameter-system entry is a single rational equation; the two listing questions are operations or coin trials; Stewart is only an intermediate length tool in the remaining geometry entries. Retire those three technique/misleading leaves and the unsupported variation subdivision into their existing subject parents. Retire the two unused leaves (infinite radicals and parallel-line angles), explicitly rehoming all five cards; trapezoid angles belong with trapezoids. Cyclic quadrilateral area/radius cards move to the cyclic parent; the incircle optimization belongs to tangential quadrilaterals. Its proof now bounds every inscribed circle and constructs equality, rather than assuming the optimum is tangential. Exact side, area and angle computations confirm it. Three incidental generating-function labels are removed while the actual coefficient-of-a-product question retains that kind. All eight affected cards survive. No textbook content changes.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1994 AIME, Problem 5 | `nt.digit.sum.condition`, `cp.tech.gf` | `nt.digit.sum.condition` |
| 2010 AIME I, Problem 4 | `cp.prob.dice.coins`, `cp.tech.gf` | `cp.prob.dice.coins` |
| 2010 AIME I, Problem 15 | `geo.tri.radii.in`, `geo.tri.cevian.stewart` | `geo.tri.radii.in` |
| 2006 AMC 8, Problem 10 | `alg.word.ratio.vary`, `alg.word.stats.data` | `alg.word.ratio`, `alg.word.stats.data` |
| 2024 AMC 8, Problem 8 | `cp.basic.principle.tree` | `cp.logic.invariant.ops` |
| 2024 AMC 8, Problem 25 | `cp.tech.gf`, `cp.prob.basic.complement` | `cp.prob.basic.count`, `cp.basic.comb.gaps` |
| 2002 AMC 10B, Problem 12 | `alg.eq.linear.param` | `alg.eq` |
| 2008 AMC 10A, Problem 22 | `cp.prob.dice.coins`, `cp.basic.principle.tree` | `cp.prob.dice.coins` |
| 2011 AMC 12A, Problem 24 | `geo.circ.cyclic.brahmagupta`, `geo.circ.cyclic.tangential` | `geo.circ.cyclic.tangential` (proof corrected) |
| 2021 Spring AMC 12B, Problem 11 | `geo.tri.cevian.stewart`, `geo.basic.sim.similar` | `geo.poly.quad.trap`, `geo.basic.sim.similar` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `ramanujan-nested-radical` | `alg.eq.radical.infinite` | `alg.eq.radical` |
| `parallel-exterior-angles` | `geo.basic.angle.parallel` | `geo.basic.angle` |
| `trapezoid-consecutive-angles` | `geo.basic.angle.parallel` | `geo.poly.quad.trap` |
| `parallel-by-angle-sum` | `geo.basic.angle.parallel` | `geo.basic.angle` |
| `stewarts-theorem` | `geo.tri.cevian.stewart` | `geo.tri.cevian` |
| `brahmaguptas-formula` | `geo.circ.cyclic.brahmagupta` | `geo.circ.cyclic` |
| `cyclic-quad-radius` | `geo.circ.cyclic.brahmagupta` | `geo.circ.cyclic` |
| `infinite-nest` | `alg.eq.radical.infinite` | `alg.eq.radical` |

#### Final sparse-pool controls: roots filters and multinomial trials

Read the remaining two root-filter questions and all four multinomial-expansion entries. The root filter is a tool in a complex product probability and a subset-sum probability; both now carry those actual kinds, while the filter card moves to Roots of unity. The two genuine polynomial expansions retain their kind. Soccer/game winner probabilities move to independent trials, with the missing earned multinomial tag added to the soccer strategy. These controls leave no root-filter problem kind or lost card. Four raw entries changed.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2001 AIME II, Problem 11 | `cp.prob.basic.complement`, `cp.binom.thm.multinomial` | `cp.prob.cond.indep` |
| 2017 AMC 12A, Problem 25 | `alg.cx.polar.arith`, `alg.cx.unity.filter` | `alg.cx.polar.arith`, `cp.prob.cond.indep` |
| 2018 AIME I, Problem 12 | `cp.basic.comb.subsets`, `alg.cx.unity.filter` | `cp.basic.comb.subsets`, `cp.prob.basic.count` |
| 2012 AMC 12A, Problem 11 | `cp.binom.thm.multinomial`, `cp.prob.cond.indep` | `cp.prob.cond.indep` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `roots-of-unity-filter` | `alg.cx.unity.filter` | `alg.cx.unity` |

Final structural cleanup: retire the now-empty single-child wrapper `nt.seq.power` and promote `nt.seq.power.squares` to the Integer sequences area. The wrapper had no direct problems or card homes, so every problem and card set is unchanged. Other single-child branches have direct filings or homes and are retained.

The quadrilateral proof also handles a potentially concave quadrilateral via its triangular convex hull: perimeter at most 42, inradius at most 21/√27 by Heron and AM–GM, below the attained 2√6. The two cards are cited for that explicit bound.

#### Accuracy follow-up: all 60 root-sum filings

Owner-requested follow-up after the concentration census. Read every statement and strategy in the 60-distinct root-sum pool. Remove polynomial-root labels where a quadratic is an intermediate tool in a handshake, geometry, logarithm, exponential, absolute-value, composition or periodic-graph problem. Keep the Vieta cards when earned. Integer-root constraints and transformed roots move to the existing more specific leaves; the binary quadratic form belongs under Quadratic Diophantine equations rather than Sums of two squares. All other filings remain, including genuine polynomial-root expressions with complex or arithmetic restrictions. Correct the signs of the two individual companion roots in 2020 AIME I #14: they are 1/2 minus 3 and 1/2 minus 4, whose sum is -6. Its final answer 85 is unchanged.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2026 AMC 10A, Problem 13 | `cp.graph.basic.degree`, `alg.poly.vieta.basic` | `cp.graph.basic.degree` |
| 2026 AIME I, Problem 6 | `alg.exp.log.eq`, `alg.poly.vieta.basic`, `nt.divisor.count.tau` | `alg.exp.log.eq`, `nt.divisor.count.tau` |
| 1983 AIME, Problem 3 | `alg.eq.radical.eq`, `alg.poly.vieta.basic` | `alg.eq.radical.eq` |
| 1991 AIME, Problem 7 | `alg.fn.basic.iterate`, `alg.poly.vieta.basic` | `alg.fn.basic.iterate` |
| 1991 AIME, Problem 8 | `alg.poly.vieta.basic`, `alg.eq.factor.sfft` | `alg.poly.introot` |
| 1995 AIME, Problem 2 | `alg.exp.log.eq`, `alg.poly.vieta.basic` | `alg.exp.log.eq` |
| 2002 AIME II, Problem 15 | `geo.circ.tangent.inscribed`, `alg.poly.vieta.basic` | `geo.circ.tangent.inscribed` |
| 2005 AIME I, Problem 8 | `alg.exp.rules.eq`, `alg.poly.vieta.basic` | `alg.exp.rules.eq` |
| 2011 AIME I, Problem 15 | `alg.poly.vieta.basic`, `nt.dio.squares.sums` | `alg.poly.introot`, `nt.dio.squares` |
| 2020 AIME I, Problem 14 | `alg.poly.vieta.basic`, `alg.fn.basic.compose` | `alg.poly.vieta.basic`, `alg.fn.basic.compose` (proof corrected) |
| 2022 AMC 10A, Problem 16 | `alg.poly.vieta.basic`, `alg.poly.vieta.transform` | `alg.poly.vieta.transform` |
| 2023 AMC 12A, Problem 19 | `alg.exp.log.eq`, `alg.poly.vieta.basic` | `alg.exp.log.eq` |
| 2025 AIME I, Problem 11 | `alg.fn.graph.periodic`, `alg.poly.vieta.basic` | `alg.fn.graph.periodic` |
| 2003 AMC 10A, Problem 5 | `alg.poly.vieta.basic` | `alg.poly.vieta.transform` |
| 2006 AMC 10B, Problem 14 | `alg.poly.vieta.basic` | `alg.poly.vieta.transform` |
| 2009 AMC 12A, Problem 14 | `geo.tri.ratio.area`, `alg.poly.vieta.basic` | `geo.tri.ratio.area` |
| 2015 AMC 10A, Problem 23 | `alg.poly.vieta.basic`, `nt.dio.factor.sfft` | `alg.poly.introot` |
| 2015 AMC 12A, Problem 18 | `alg.poly.vieta.basic`, `nt.dio.factor.sfft` | `alg.poly.introot` |
| 2020 AMC 10A, Problem 5 | `alg.eq.abs.eq`, `alg.poly.vieta.basic` | `alg.eq.abs.eq` |
| 2022 AMC 12A, Problem 15 | `alg.poly.vieta.basic`, `alg.poly.vieta.transform` | `alg.poly.vieta.transform` |
| 2022 AMC 12A, Problem 22 | `alg.cx.polar.plane`, `alg.poly.vieta.basic`, `geo.poly.quad.trap` | `alg.cx.polar.plane`, `geo.poly.quad.trap` |
| 2022 AMC 10B, Problem 7 | `alg.poly.vieta.basic`, `nt.divisor.count.pairs` | `alg.poly.introot` |
| 2022 AMC 12B, Problem 4 | `alg.poly.vieta.basic`, `nt.divisor.count.pairs` | `alg.poly.introot` |
| 2000 AMC 10, Problem 24 | `alg.fn.basic.compose`, `alg.poly.vieta.basic` | `alg.fn.basic.compose` |
| 2000 AMC 12, Problem 15 | `alg.fn.basic.compose`, `alg.poly.vieta.basic` | `alg.fn.basic.compose` |

#### Accuracy follow-up: all 62 similarity filings

Read all 62 distinct statements and strategies, including the existing parallel-lines child. Most similarity labels describe a central configuration and survive. Fourteen direct-parent cases fit the existing parallel-line/midsegment child; the inscribed-rectangle area question also belongs there, with its rectangle subject rather than a Heron-method label. Remove the triangle label from the spatial cube shadow, the incidental Heron label from the bisector configuration, and the generic polygon-angle label from the equal-angle triangle. Similarity cards stay where earned. General right-angle AA configurations remain in the parent: sharing another shape label is not by itself an error.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2026 AMC 10A, Problem 3 | `geo.basic.sim.similar`, `geo.tri.ratio.area` | `geo.basic.sim.parallel`, `geo.tri.ratio.area` |
| 2026 AMC 12A, Problem 2 | `geo.basic.sim.similar`, `geo.tri.ratio.area` | `geo.basic.sim.parallel`, `geo.tri.ratio.area` |
| 1996 AIME, Problem 4 | `geo.solid.prism.box`, `geo.basic.sim.similar` | `geo.solid.prism.box` |
| 1998 AIME, Problem 6 | `geo.basic.sim.similar`, `geo.poly.quad.para` | `geo.basic.sim.parallel`, `geo.poly.quad.para` |
| 2008 AIME I, Problem 2 | `geo.poly.composite.overlap`, `geo.basic.sim.similar` | `geo.poly.composite.overlap`, `geo.basic.sim.parallel` |
| 2008 AIME II, Problem 5 | `geo.poly.quad.trap`, `geo.basic.sim.similar` | `geo.poly.quad.trap`, `geo.basic.sim.parallel` |
| 2015 AIME II, Problem 7 | `geo.basic.sim.similar`, `geo.tri.area.heron` | `geo.basic.sim.parallel`, `geo.poly.quad.rect` |
| 2018 AIME II, Problem 7 | `geo.basic.sim.similar` | `geo.basic.sim.parallel` |
| 2019 AIME II, Problem 1 | `geo.basic.sim.similar`, `geo.poly.composite.overlap` | `geo.basic.sim.parallel`, `geo.poly.composite.overlap` |
| 2022 AIME II, Problem 11 | `geo.tri.cevian.bisector`, `geo.basic.sim.similar`, `geo.tri.area.heron` | `geo.tri.cevian.bisector`, `geo.basic.sim.similar` |
| 2022 AMC 10A, Problem 13 | `geo.tri.cevian.bisector`, `geo.basic.sim.similar` | `geo.tri.cevian.bisector`, `geo.basic.sim.parallel` |
| 2023 AIME II, Problem 3 | `geo.basic.sim.similar`, `geo.basic.angle.polygon` | `geo.basic.sim.similar` |
| 2024 AIME II, Problem 5 | `geo.poly.general.irregular`, `geo.basic.sim.similar` | `geo.poly.general.irregular`, `geo.basic.sim.parallel` |
| 2024 AMC 10B, Problem 10 | `geo.poly.quad.para`, `geo.tri.ratio.area`, `geo.basic.sim.similar` | `geo.poly.quad.para`, `geo.tri.ratio.area`, `geo.basic.sim.parallel` |
| 2002 AMC 8, Problem 20 | `geo.basic.sim.similar`, `geo.tri.ratio.area` | `geo.basic.sim.parallel`, `geo.tri.ratio.area` |
| 2007 AMC 10B, Problem 21 | `geo.basic.sim.similar` | `geo.basic.sim.parallel` |
| 2021 Spring AMC 12B, Problem 11 | `geo.poly.quad.trap`, `geo.basic.sim.similar` | `geo.poly.quad.trap`, `geo.basic.sim.parallel` |
| 2000 AMC 10, Problem 19 | `geo.basic.sim.similar` | `geo.basic.sim.parallel` |
| 2000 AMC 12, Problem 21 | `geo.basic.sim.similar` | `geo.basic.sim.parallel` |
| 2021 Fall AMC 10B, Problem 13 | `geo.basic.sim.similar`, `geo.tri.special.isos` | `geo.basic.sim.parallel`, `geo.tri.special.isos` |

#### Accuracy follow-up: all 71 finite-probability and 50 log-rule filings

Read both complete pools (one shared problem). Uniform numerical, point, subset, seating and arrangement samples legitimately retain General finite probability models. Six repeated independent-trial models move to Independent events; three explicit bag/sock/card draws move to the sampling kind. The license-plate event also gains its actual digit-string subject. Most logarithm cofilings are genuine: logarithmic lengths, domains, progression conditions and requested logarithmic expressions are part of the statements. Two floor questions lose incidental log labels; two explicit logarithmic equation/system questions move to that existing specific kind. The log expression loses a solution-only symmetric-identity label, and the real-expression question gets its domain subject rather than the transformed rational-inequality tool. The zigzag length problem belongs to rectangle geometry and triangle trigonometry (projection by cosine), rather than a similarity configuration. All earned card tags remain. No nodes, card homes, answers or source statements change.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1996 AIME, Problem 2 | `alg.fn.floor.eq`, `alg.exp.log.rules` | `alg.fn.floor.eq` |
| 2005 AIME I, Problem 9 | `cp.prob.basic.count`, `geo.solid.prism.unit.paint` | `cp.prob.cond.indep`, `geo.solid.prism.unit.paint` |
| 2007 AIME I, Problem 7 | `alg.exp.log.rules`, `alg.fn.floor.sum` | `alg.fn.floor.sum` |
| 2008 AIME I, Problem 9 | `cp.prob.basic.count`, `cp.basic.perm.repeat` | `cp.prob.cond.indep`, `cp.basic.perm.repeat` |
| 2010 AIME II, Problem 5 | `alg.eq.identity.symmetric`, `alg.exp.log.rules` | `alg.exp.log.eq` |
| 2023 AMC 10B, Problem 21 | `cp.prob.basic.count`, `cp.tech.stars.distinct` | `cp.prob.cond.indep`, `cp.tech.stars.distinct` |
| 2023 AMC 12A, Problem 15 | `geo.basic.sim.similar`, `geo.poly.quad.rect` | `geo.poly.quad.rect`, `geo.tri.trig.other` |
| 2023 AMC 12B, Problem 7 | `alg.exp.log.rules`, `alg.ineq.solve.rational` | `alg.exp.log.rules`, `alg.fn.graph.domain` |
| 2023 AMC 12B, Problem 19 | `cp.prob.basic.count`, `cp.tech.stars.distinct` | `cp.prob.cond.indep`, `cp.tech.stars.distinct` |
| 1990 AJHSME, Problem 14 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2015 AMC 8, Problem 11 | `cp.prob.basic.count` | `cp.prob.basic.count`, `cp.struct.words.digits` |
| 2020 AMC 8, Problem 13 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2023 AMC 8, Problem 23 | `cp.prob.basic.count`, `cp.struct.tile.tiling` | `cp.prob.cond.indep`, `cp.struct.tile.tiling` |
| 2009 AMC 10B, Problem 25 | `cp.prob.basic.count` | `cp.prob.cond.indep` |
| 2009 AMC 12B, Problem 17 | `cp.prob.basic.count` | `cp.prob.cond.indep` |
| 2019 AMC 12A, Problem 12 | `alg.exp.log.rules` | `alg.exp.log.eq` |
| 2021 Spring AMC 12A, Problem 6 | `cp.prob.basic.count` | `cp.prob.dice.draw` |
| 2022 AMC 12A, Problem 14 | `alg.exp.log.rules`, `alg.eq.identity.symmetric` | `alg.exp.log.rules` |
| 2021 Fall AMC 10A, Problem 21 | `cp.prob.basic.count`, `cp.tech.stars.distinct` | `cp.prob.cond.indep`, `cp.tech.stars.distinct` |
| 2021 Fall AMC 12A, Problem 18 | `cp.prob.basic.count`, `cp.tech.stars.distinct` | `cp.prob.cond.indep`, `cp.tech.stars.distinct` |

#### Further audit: area-formula and spatial-distance labels

Read all 43 distinct problems in Heron, coordinate-area and spatial-distance pools. Retire the Heron formula leaf: all seven filings concern incircles, systems, isosceles triangles, quadrilaterals, trapezoids, a tetrahedron or shared-altitude area ratios. The Heron and 13-14-15 cards survive at Area of a triangle. Retain coordinate-area labels for stated coordinates, grids and coordinate-defined loci; remove them when coordinates were only the solver’s choice. Recover centroid/homothety and net-folding subjects. Retain most spatial-distance cofilings because distance between points, planes or centers is itself asked for; drop two where distances only compute a box/pyramid area. Prove the global acute-integer-triangle minimum in 2024 AMC 12A #24 rather than listing a few small triangles. Complete the uniqueness argument in 2021 Spring AMC 12B #14 using the factor pairs of 16, retaining its unchanged answer and adding the earned factorization card.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2026 AIME I, Problem 10 | `geo.coord.transform.rotate`, `geo.coord.area.shoelace` | `geo.coord.transform.rotate` |
| 1999 AIME, Problem 12 | `geo.tri.radii.in`, `geo.tri.area.heron` | `geo.tri.radii.in` |
| 2006 AIME II, Problem 15 | `geo.tri.area.heron`, `alg.eq.system.cyclic` | `alg.eq.system.cyclic` |
| 2010 AIME II, Problem 12 | `geo.tri.special.isos`, `geo.tri.area.heron` | `geo.tri.special.isos` |
| 2013 AIME I, Problem 7 | `geo.solid.prism.box`, `geo.solid.coord.dist` | `geo.solid.prism.box` |
| 2017 AIME II, Problem 10 | `geo.coord.area.shoelace`, `geo.poly.quad.rect` | `geo.poly.quad.rect` |
| 2018 AIME II, Problem 4 | `geo.poly.general.irregular`, `geo.coord.area.shoelace` | `geo.poly.general.irregular` |
| 2018 AIME II, Problem 9 | `geo.coord.area.shoelace`, `geo.basic.sim.figures` | `geo.basic.sim.figures`, `geo.tri.cevian.median` |
| 2018 AIME II, Problem 12 | `geo.poly.quad.general`, `geo.tri.area.heron` | `geo.poly.quad.general` |
| 2021 AIME I, Problem 9 | `geo.poly.quad.trap`, `geo.tri.area.heron` | `geo.poly.quad.trap` |
| 2024 AMC 12A, Problem 24 | `geo.solid.round.pyramid`, `geo.tri.area.heron` | `geo.solid.round.pyramid` (proof corrected) |
| 2025 AIME II, Problem 1 | `geo.tri.area.heron`, `geo.tri.ratio.area` | `geo.tri.ratio.area` |
| 2016 AMC 8, Problem 22 | `geo.coord.area.shoelace` | `geo.poly.composite.add` |
| 2007 AMC 10A, Problem 18 | `geo.coord.area.shoelace` | `geo.poly.general.irregular` |
| 2012 AMC 10B, Problem 19 | `geo.coord.area.shoelace` | `geo.poly.quad.rect` |
| 2016 AMC 10A, Problem 21 | `geo.circ.tangent.common`, `geo.coord.area.shoelace` | `geo.circ.tangent.common` |
| 2016 AMC 12A, Problem 15 | `geo.circ.tangent.common`, `geo.coord.area.shoelace` | `geo.circ.tangent.common` |
| 2017 AMC 12B, Problem 24 | `geo.basic.sim.similar`, `geo.coord.area.shoelace` | `geo.basic.sim.similar` |
| 2019 AMC 12B, Problem 18 | `geo.solid.coord.dist`, `geo.solid.round.pyramid` | `geo.solid.round.pyramid` |
| 2021 Spring AMC 12B, Problem 14 | `geo.solid.round.pyramid`, `geo.solid.coord.dist` | `geo.solid.round.pyramid`, `geo.solid.coord.dist` (proof corrected) |
| 2022 AMC 10A, Problem 21 | `geo.solid.coord.dist`, `geo.poly.regular.hex` | `geo.solid.poly.nets`, `geo.poly.regular.hex` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `herons-formula` | `geo.tri.area.heron` | `geo.tri.area` |
| `triangle-13-14-15` | `geo.tri.area.heron` | `geo.tri.area` |

#### Further audit controls: right triangles, mixed progressions and radical products

Read all 22 right-triangle-length filings, all nine AP/GP overlaps and the three factor/radical overlaps. The right-triangle pool largely holds genuine configurations; remove the trig-angle question and incidental area/SFFT companions. All nine AP/GP cofilings are legitimate because both progression conditions occur in their statements. Correct two incomplete strategies that assumed integer common ratios: 2022 AMC 10A #20 now uses the square condition (c-b)^2=28b and positive arithmetic terms; 2010 AMC 10B #24 now enumerates all four reduced rational ratios permitted by the score cap. Exhaustive exact rational checks verify both unchanged answers (206 and 34). The basketball route earns the existing AP/GP cards. Three radical products lose the factorization-tool label while retaining their factorization cards. The scanner-required LaTeX comparison spelling in the rewritten disphenoid proof is corrected; final gates are rerun.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1986 AIME, Problem 2 | `alg.eq.factor.squares`, `alg.eq.radical.simplify` | `alg.eq.radical.simplify` |
| 2005 AIME II, Problem 7 | `alg.eq.radical.simplify`, `alg.eq.factor.squares` | `alg.eq.radical.simplify` |
| 2024 AMC 12A, Problem 10 | `alg.trig.identity.sum`, `geo.basic.pyth.triples` | `alg.trig.identity.sum` |
| 2024 AMC 12A, Problem 24 | `geo.solid.round.pyramid` | `geo.solid.round.pyramid` (proof corrected) |
| 1999 AMC 8, Problem 23 | `geo.tri.area.base`, `geo.basic.pyth.triples` | `geo.basic.pyth.triples` |
| 2007 AMC 12B, Problem 23 | `nt.dio.factor.sfft`, `geo.basic.pyth.triples` | `geo.basic.pyth.triples` |
| 2010 AMC 10B, Problem 24 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | `alg.seq.ap.geom`, `alg.seq.ap.arith` (proof corrected) |
| 2010 AMC 12B, Problem 19 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | `alg.seq.ap.geom`, `alg.seq.ap.arith` (proof corrected) |
| 2022 AMC 10A, Problem 20 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | `alg.seq.ap.geom`, `alg.seq.ap.arith` (proof corrected) |
| 2022 AMC 10B, Problem 5 | `alg.eq.factor.squares`, `alg.eq.radical.simplify` | `alg.eq.radical.simplify` |

#### High-value audit: arithmetic-sequence cofilings, first batch

Read all 54 distinct arithmetic-sequence cofilings before changing them. Retain actual progression constraints; remove progression labels introduced only by sums in geometry, subset bounds, custom expressions or an iterated-function solution. Remove incidental gcd/divisor/system/interpolation labels from actual progression questions. Confirm the 1988 AIME grid against its source figure and correct the row/column convention, without altering its equations or answer. Close the prime-3 exception in the five-prime progression proof and give a concrete unit-step construction for every attainable 90-subset sum. Answers are unchanged. The remaining cofilings, solid pools and transformation controls follow in the next batch.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2026 AIME II, Problem 1 | `alg.seq.ap.arith`, `nt.div.gcd.basic` | `alg.seq.ap.arith` |
| 1987 AIME, Problem 11 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 1988 AIME, Problem 6 | `alg.seq.ap.arith`, `cp.struct.tile.fill` | `alg.seq.ap.arith`, `cp.struct.tile.fill` (proof corrected) |
| 1991 AIME, Problem 2 | `geo.basic.sim.parallel`, `alg.seq.ap.arith` | `geo.basic.sim.parallel` |
| 1993 AIME, Problem 2 | `alg.eq.factor.squares`, `alg.seq.ap.arith` | `geo.basic.pyth.triples` |
| 1999 AIME, Problem 1 | `nt.prime.basic.test`, `alg.seq.ap.arith` | `nt.prime.basic.test`, `alg.seq.ap.arith` (proof corrected) |
| 2000 AIME I, Problem 10 | `alg.eq.linear.system`, `alg.seq.ap.arith` | `alg.seq.ap.arith` |
| 2002 AIME II, Problem 4 | `geo.poly.regular.hex`, `alg.seq.ap.arith` | `geo.poly.regular.hex` |
| 2003 AIME I, Problem 2 | `geo.poly.composite.arcs`, `alg.seq.ap.arith` | `geo.poly.composite.arcs` |
| 2003 AIME II, Problem 8 | `alg.poly.construct.interp`, `alg.seq.ap.arith` | `alg.seq.ap.arith` |
| 2005 AIME I, Problem 2 | `alg.seq.ap.arith`, `nt.divisor.count.tau` | `alg.seq.ap.arith` |
| 2006 AIME I, Problem 2 | `cp.basic.comb.subsets`, `alg.seq.ap.arith` | `cp.basic.comb.subsets` (proof corrected) |
| 2009 AIME II, Problem 4 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2015 AIME I, Problem 1 | `alg.word.compute.clever`, `alg.seq.ap.arith` | `alg.word.compute.clever` |
| 2020 AIME II, Problem 8 | `alg.eq.abs.eq`, `alg.seq.ap.arith`, `alg.fn.basic.iterate` | `alg.eq.abs.eq`, `alg.fn.basic.iterate` |
| 2021 AIME I, Problem 5 | `alg.seq.ap.arith`, `nt.div.rules.expr` | `alg.seq.ap.arith` |

#### High-value audit: remaining AP cofilings, polyhedra/nets and mixed transformations

Complete the 54-distinct AP cofiling dispositions; retain all actual progression constraints, including the nine AP/GP questions, and remove method-only AP labels from averages, a magic square, floor equations, a block-pattern index and sign-flip optimization. Read all 18 distinct nets/polyhedron questions: nets mostly hold genuine folding; drop incidental box, planar-fold and combination companions, and refile the metric coordinate solid under spatial distances. Rename the stable polyhedron node to state its actual regular-solid/face-edge-vertex scope rather than naming Euler alone; all card homes remain. The octahedron/cube volume ratio concerns different shapes, so remove the similar-solids label and supply the explicit face-centroid computation. All five mixed reflection/rotation questions were read: four explicitly impose both transformations and stay; the two-reflection problem keeps Reflection, with composition-to-rotation carried by its card. No node, home or card is deleted; no answer changes.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1985 AIME, Problem 15 | `geo.solid.poly.nets`, `geo.solid.prism.box` | `geo.solid.poly.nets` |
| 2002 AIME I, Problem 15 | `geo.solid.coord.dist`, `geo.solid.poly.euler` | `geo.solid.coord.dist` |
| 2004 AIME I, Problem 3 | `geo.solid.poly.euler`, `cp.basic.comb.choose` | `geo.solid.poly.euler` |
| 2005 AIME II, Problem 10 | `geo.solid.poly.euler`, `geo.basic.sim.figures` | `geo.solid.poly.euler` (proof corrected) |
| 2008 AIME I, Problem 15 | `geo.solid.poly.nets`, `geo.basic.pyth.fold` | `geo.solid.poly.nets` |
| 2023 AMC 10B, Problem 23 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2024 AMC 10A, Problem 21 | `alg.seq.ap.arith`, `alg.eq.linear.system` | `alg.seq.ap.arith`, `cp.struct.tile.fill` |
| 2024 AMC 10B, Problem 5 | `alg.seq.ap.arith`, `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` |
| 2024 AMC 12A, Problem 14 | `alg.seq.ap.arith`, `alg.eq.linear.system` | `alg.seq.ap.arith`, `cp.struct.tile.fill` |
| 2024 AMC 12B, Problem 5 | `alg.seq.ap.arith`, `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` |
| 2025 AMC 10A, Problem 5 | `alg.seq.period.nth`, `alg.seq.ap.arith` | `alg.seq.period.nth` |
| 1986 AJHSME, Problem 25 | `alg.seq.ap.arith`, `alg.word.stats.mean` | `alg.word.stats.mean` |
| 2006 AMC 10A, Problem 9 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2006 AMC 12A, Problem 8 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2010 AMC 12A, Problem 20 | `alg.seq.ap.arith`, `nt.div.gcd.basic` | `alg.seq.ap.arith` |
| 2020 AMC 10A, Problem 7 | `cp.struct.tile.fill`, `alg.seq.ap.arith` | `cp.struct.tile.fill` |
| 2020 AMC 12A, Problem 5 | `cp.struct.tile.fill`, `alg.seq.ap.arith` | `cp.struct.tile.fill` |
| 2020 AMC 12A, Problem 25 | `alg.fn.floor.eq`, `alg.seq.ap.arith` | `alg.fn.floor.eq` |
| 2021 Spring AMC 10A, Problem 22 | `alg.word.stats.mean`, `alg.seq.ap.arith` | `alg.word.stats.mean` |
| 2022 AMC 10B, Problem 4 | `alg.seq.ap.arith`, `alg.word.units.convert` | `alg.seq.ap.arith` |
| 2025 AMC 10B, Problem 17 | `alg.word.stats.mean`, `alg.seq.ap.arith` | `alg.word.stats.mean` |
| 2025 AMC 12B, Problem 14 | `alg.word.stats.mean`, `alg.seq.ap.arith` | `alg.word.stats.mean` |
| 2021 Fall AMC 10B, Problem 17 | `geo.coord.transform.reflect`, `geo.coord.transform.rotate` | `geo.coord.transform.reflect` |

#### High-value audit 4: all 54 integer-optimization filings

Read the complete pool. Most are genuine finite/integer extrema. Correct the mode/range subject, recover rectangle and radical-equation subjects, remove intermediate SFFT/vertex/telescoping labels, and move the unique percentage-inference and continuous salary-budget questions to their actual kinds. Replace the reversed mode-minus-mean proof with a global attained bound; prove the prime-power minimum globally below the attained candidate; give the complete denominator/partition check for the digit fraction and exclude all smaller positive sums in the signed-factor question. All keyed answers remain unchanged. Exact finite computations verify the displayed cases. Remaining trig/power pools follow.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1989 AIME, Problem 11 | `alg.word.stats.data`, `alg.ineq.optimize.integer` | `alg.word.stats.median`, `alg.ineq.optimize.integer` (proof corrected) |
| 1994 AIME, Problem 12 | `nt.div.gcd.basic`, `alg.ineq.optimize.integer` | `geo.poly.quad.rect`, `alg.ineq.optimize.integer` |
| 2006 AIME I, Problem 15 | `alg.seq.sum.telescope`, `alg.ineq.optimize.integer` | `alg.eq.abs.eq`, `alg.ineq.optimize.integer` |
| 2007 AIME II, Problem 8 | `alg.ineq.optimize.integer`, `alg.poly.quad.vertex` | `alg.ineq.optimize.integer` |
| 2015 AIME II, Problem 8 | `alg.eq.factor.sfft`, `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` |
| 2020 AIME I, Problem 10 | `nt.div.prime.factor`, `alg.ineq.optimize.integer` | `nt.div.prime.powers`, `alg.ineq.optimize.integer` (proof corrected) |
| 2022 AIME I, Problem 7 | `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` (proof corrected) |
| 2024 AMC 10A, Problem 7 | `alg.ineq.optimize.integer`, `nt.divisor.count.pairs` | `alg.ineq.optimize.integer` (proof corrected) |
| 2024 AMC 10B, Problem 6 | `nt.divisor.count.pairs`, `alg.ineq.optimize.integer` | `geo.poly.quad.rect`, `alg.ineq.optimize.integer` |
| 2024 AMC 10B, Problem 13 | `alg.eq.radical.simplify`, `alg.ineq.optimize.integer` | `alg.eq.radical.eq`, `alg.ineq.optimize.integer` |
| 2024 AMC 12A, Problem 6 | `alg.ineq.optimize.integer`, `nt.divisor.count.pairs` | `alg.ineq.optimize.integer` (proof corrected) |
| 2022 AMC 8, Problem 21 | `alg.ineq.optimize.integer` | `alg.word.ratio.percent` |
| 2008 AMC 10B, Problem 4 | `alg.ineq.optimize.integer` | `alg.word.everyday.money` |
| 2008 AMC 12B, Problem 3 | `alg.ineq.optimize.integer` | `alg.word.everyday.money` |

#### Optimization proof completion and missing coverage proposal

Complete the global prime-exponent maximum using decreasing consecutive-factor ratios. Give an exact postage-count formula, prove its interval-coverage criterion and fixed-count dominance, and record the finite search bounds and witnesses. Exact evaluation over 2 <= b < c <= 89 gives only c=11,88,89 with f=97 and maximum 96 for c=12..87. Record the missing interval-extension method as P69 in QUESTIONS.md, retaining Constructive Counting meanwhile; no new card is created without the standing decision process.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2021 Spring AMC 12A, Problem 25 | `nt.divisor.count.tau`, `alg.ineq.optimize.integer` | `nt.divisor.count.tau`, `alg.ineq.optimize.integer` (proof corrected) |
| 2022 AIME II, Problem 14 | `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` (proof corrected) |

#### High-value audit 4: all 37 trig-addition filings

Read the complete pool. Keep actual trig-expression identities and requested multiple-angle relations. Geometry, coordinate lines, clocks, nonlinear recurrences and radical systems do not gain a trig-addition subject just because the route uses an identity. Recover chord, rotation, equilateral/isosceles, centroid, inverse-trig and trig-equation kinds where appropriate. Remove De Moivre as a method-only complex subject from the tangent-expansion question, while retaining the genuinely fixed-modulus complex optimization. Retain all earned cards. Supply uniqueness for the chord-radius solution by monotonicity and check all eight inverse-sine branches in the radical system; answers remain unchanged.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1984 AIME, Problem 13 | `alg.trig.eq.inverse`, `alg.trig.identity.sum` | `alg.trig.eq.inverse` |
| 1985 AIME, Problem 9 | `geo.circ.power.chord`, `alg.trig.identity.sum` | `geo.circ.power.chord` (proof corrected) |
| 1988 AIME, Problem 7 | `alg.trig.identity.sum`, `geo.tri.area.base` | `geo.tri.trig.other` |
| 1990 AIME, Problem 12 | `geo.poly.regular.diag`, `alg.trig.identity.sum` | `geo.poly.regular.diag` |
| 2000 AIME II, Problem 10 | `geo.circ.cyclic.tangential`, `alg.trig.identity.sum` | `geo.circ.cyclic.tangential` |
| 2005 AIME II, Problem 12 | `geo.poly.quad.rect`, `alg.trig.identity.sum` | `geo.poly.quad.rect` |
| 2006 AIME I, Problem 8 | `geo.poly.quad.para`, `alg.trig.identity.sum` | `geo.poly.quad.para` |
| 2008 AIME I, Problem 8 | `alg.trig.eq.inverse`, `alg.trig.identity.sum` | `alg.trig.eq.inverse` |
| 2009 AIME II, Problem 14 | `alg.seq.rec.nonlinear`, `alg.trig.identity.sum` | `alg.seq.rec.nonlinear` |
| 2011 AIME I, Problem 14 | `geo.poly.regular.other`, `alg.trig.identity.sum` | `geo.poly.regular.other` |
| 2013 AIME II, Problem 15 | `geo.tri.trig.cosines`, `alg.trig.identity.sum` | `alg.trig.identity.sum` |
| 2022 AIME I, Problem 15 | `alg.trig.identity.sum`, `alg.eq.system.cyclic` | `alg.eq.system.cyclic` (proof corrected) |
| 2023 AMC 12A, Problem 11 | `geo.coord.line.slope`, `alg.trig.identity.sum` | `geo.coord.line.slope` |
| 2023 AMC 12A, Problem 25 | `alg.cx.polar.demoivre`, `alg.trig.identity.sum` | `alg.trig.identity.sum` |
| 2024 AIME I, Problem 7 | `alg.cx.polar.demoivre`, `alg.trig.identity.sum` | `alg.cx.polar.demoivre` |
| 2024 AMC 12A, Problem 18 | `geo.coord.transform.rotate`, `alg.trig.identity.sum` | `geo.coord.transform.rotate` |
| 2024 AMC 12B, Problem 19 | `geo.tri.area.sine`, `alg.trig.identity.sum` | `geo.coord.transform.rotate`, `geo.tri.special.equil` |
| 2024 AMC 12B, Problem 21 | `alg.trig.identity.sum`, `nt.dio.squares.triples` | `nt.dio.squares.triples` |
| 2025 AIME II, Problem 14 | `geo.tri.special.equil`, `alg.trig.identity.sum` | `geo.tri.special.equil` |
| 2004 AMC 12B, Problem 24 | `alg.trig.identity.sum` | `geo.tri.special.isos`, `alg.trig.eq.solve` |
| 2005 AMC 12B, Problem 24 | `geo.coord.conic.parabola`, `alg.trig.identity.sum` | `geo.coord.conic.parabola` |
| 2009 AMC 12A, Problem 25 | `alg.trig.identity.sum`, `alg.seq.period.nth` | `alg.seq.period.nth` |
| 2014 AMC 12A, Problem 12 | `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 2016 AMC 10A, Problem 24 | `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 2016 AMC 12A, Problem 21 | `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 2019 AMC 12B, Problem 25 | `geo.poly.quad.general`, `alg.trig.identity.sum` | `geo.poly.quad.general`, `geo.tri.cevian.median` |
| 2020 AMC 12B, Problem 7 | `geo.coord.line.slope`, `alg.trig.identity.sum` | `geo.coord.line.slope` |
| 2022 AMC 12A, Problem 17 | `alg.trig.eq.solve`, `alg.trig.identity.sum` | `alg.trig.eq.solve` |
| 2022 AMC 12B, Problem 14 | `alg.trig.identity.sum`, `alg.poly.quad.roots` | `geo.coord.line.slope` |
| 2025 AMC 12B, Problem 16 | `alg.word.rates.clock`, `alg.trig.identity.sum` | `alg.word.rates.clock` |

#### High-value audit 4: all 19 power-of-a-point filings and Euler control

Read all 19 circle filings. Most hold genuine chord/secant/tangent configurations and retain the power subject. Remove intermediate cosine-law labels and the parallelogram introduced only by median doubling. The incenter/circumcenter problem instead belongs under Inradius, circumradius and exradii: its Euler distance formula is not the Euler line. Rehome the Euler Distance card accordingly, preserving its content and every card. Read the remaining Euler-line leaf entry as a control: the nine-point-circle problem is genuine and stays. The auxiliary chord and excenter constructions in the radius problem remain on its method/card route rather than as extra subjects. No answer or strategy text changes in this batch.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2019 AIME I, Problem 13 | `geo.circ.proj`, `geo.circ.power.pop`, `geo.tri.trig.cosines` | `geo.circ.proj`, `geo.circ.power.pop` |
| 2022 AIME I, Problem 11 | `geo.circ.power.pop`, `geo.poly.quad.para`, `geo.tri.trig.cosines` | `geo.circ.power.pop`, `geo.poly.quad.para` |
| 2023 AIME II, Problem 12 | `geo.tri.cevian.median`, `geo.circ.power.pop`, `geo.poly.quad.para` | `geo.tri.cevian.median`, `geo.circ.power.pop` |
| 2024 AIME I, Problem 10 | `geo.circ.power.pop`, `geo.circ.inscribed.chords`, `geo.tri.trig.cosines` | `geo.circ.power.pop`, `geo.circ.inscribed.chords` |
| 2024 AIME II, Problem 10 | `geo.tri.centers.euler`, `geo.tri.centers.lemmas`, `geo.circ.power.pop` | `geo.tri.radii` |
| 2021 Fall AMC 12B, Problem 24 | `geo.circ.power.pop`, `geo.basic.sim.similar`, `geo.tri.trig.cosines` | `geo.circ.power.pop`, `geo.basic.sim.similar` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `euler-distance-theorem` | `geo.tri.centers.euler` | `geo.tri.radii` |

#### Triggered sparse-leaf follow-through: Grouping into products

Removing an incidental optimization label made Grouping into products newly thin. Read its remaining four distinct problems (five entries): expansion term count, logarithmic system, universal coefficient identity and real-valued minimum. In every case grouping is a solution tool, so file those actual subjects and retire the now-empty leaf. Preserve the SFFT method card at Factoring and clever factorizations; the separate integer xy+ax+by=c archetype remains. This is a bounded follow-through on a new audit signal, not a blanket retirement of factorization topics. All cards, solutions and answers survive.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1996 AIME, Problem 3 | `cp.binom.thm.coeff`, `alg.eq.factor.sfft` | `cp.binom.thm.coeff` |
| 2000 AIME I, Problem 9 | `alg.exp.log.eq`, `alg.eq.factor.sfft` | `alg.exp.log.eq` |
| 2002 AMC 10B, Problem 13 | `alg.eq.factor.sfft` | `alg.poly.construct.coeff` |
| 2021 Spring AMC 10A, Problem 9 | `alg.eq.factor.sfft` | `alg.ineq.optimize` |
| 2021 Spring AMC 12A, Problem 7 | `alg.eq.factor.sfft` | `alg.ineq.optimize` |

Every affected card survives:

| Card | Previous home | Current home |
|---|---|---|
| `sfft` | `alg.eq.factor.sfft` | `alg.eq.factor` |

#### High-value audit 5: GCD/LCM and incidental common-divisor labels

Read all 50 distinct GCD/LCM statements and strategies before migrating. Keep explicit gcd/lcm constraints and common-multiple archetypes; remove prime-factorization, PIE, CRT and valuation labels used only as solution tools. Refile fraction arithmetic, money, ratios, cycles, running laps, grid walks, modular reconstruction and shifted common remainders by their actual subjects. The coprime rational-factorization count keeps its coprimality condition and gains the factorization-count kind; use its earned exponent-tracking method. Recover the missing probability kind/card on the random LCM subset. Correct internal-plane versus endpoint counting in the solid diagonal proof and bound the finite exponent search for the LCM quadruple minimum. Answers and card homes remain unchanged. The separate divisor-count dispositions and full capacity report follow.

| Problem | Previous filing | Current filing |
|---|---|---|
| 1987 AIME, Problem 7 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 1990 AIME, Problem 10 | `alg.cx.unity.sums`, `nt.div.gcd.basic` | `alg.cx.unity.sums` |
| 1991 AIME, Problem 5 | `nt.div.prime.factor`, `nt.div.gcd.basic` | `nt.divisor.count.factor`, `nt.div.gcd.basic` |
| 1995 AIME, Problem 8 | `nt.div.rules.count`, `nt.div.gcd.basic` | `nt.div.rules` |
| 1996 AIME, Problem 14 | `geo.solid.prism.unit`, `nt.div.gcd.basic` | `geo.solid.prism.unit` (proof corrected) |
| 2007 AIME I, Problem 4 | `alg.word.rates.motion.laps`, `nt.div.gcd.basic` | `alg.word.rates.motion.laps` |
| 2015 AIME II, Problem 1 | `alg.word.ratio.percent`, `nt.div.gcd.basic` | `alg.word.ratio.percent` |
| 2017 AIME I, Problem 2 | `nt.mod.basic.arith`, `nt.div.gcd.basic` | `nt.mod.basic.arith` |
| 2020 AMC 10A, Problem 24 | `nt.mod.crt.system`, `nt.div.gcd.basic` | `nt.div.gcd.basic` |
| 2022 AMC 10A, Problem 7 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2023 AIME I, Problem 14 | `cp.struct.paths.walks`, `nt.div.gcd.basic` | `cp.struct.paths.walks` |
| 2023 AMC 10B, Problem 18 | `nt.div.gcd.basic`, `nt.mod.basic.arith` | `nt.div.gcd.basic` |
| 2023 AMC 12B, Problem 15 | `nt.div.gcd.basic`, `nt.mod.basic.arith` | `nt.div.gcd.basic` |
| 2023 AMC 12B, Problem 24 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2025 AIME II, Problem 7 | `cp.basic.comb.subsets`, `nt.div.gcd.basic` | `nt.div.gcd.basic`, `cp.prob.basic.count` |
| 2025 AMC 10A, Problem 17 | `nt.div.gcd.basic`, `nt.mod.basic.arith` | `nt.mod.basic.arith` |
| 1989 AJHSME, Problem 22 | `nt.div.gcd.basic`, `alg.seq.period.cycle` | `alg.seq.period.cycle` |
| 1993 AJHSME, Problem 2 | `nt.div.gcd.basic` | `alg.word.compute.fraction` |
| 2003 AMC 8, Problem 19 | `nt.div.rules.count`, `nt.div.gcd.basic` | `nt.div.rules.count` |
| 2004 AMC 8, Problem 19 | `nt.div.gcd.basic` | `nt.mod.crt.system` |
| 2009 AMC 8, Problem 11 | `nt.div.gcd.basic`, `alg.word.everyday.money` | `alg.word.everyday.money` |
| 2012 AMC 8, Problem 13 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2012 AMC 8, Problem 15 | `nt.div.gcd.basic` | `nt.mod.crt.system` |
| 2017 AMC 8, Problem 12 | `nt.div.gcd.basic` | `nt.mod.crt.system` |
| 2019 AMC 8, Problem 23 | `nt.div.gcd.basic` | `alg.word.ratio.prop` |
| 2005 AMC 10A, Problem 22 | `nt.div.gcd.basic` | `nt.div.rules.count` |
| 2010 AMC 10B, Problem 8 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2010 AMC 12B, Problem 3 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2012 AMC 10A, Problem 17 | `alg.eq.factor.special`, `nt.div.gcd.basic` | `nt.dio.factor` |
| 2016 AMC 12B, Problem 24 | `nt.div.gcd.basic`, `cp.tech.pie.general` | `nt.div.gcd.basic` (proof corrected) |
| 2017 AMC 10A, Problem 16 | `nt.div.gcd.basic` | `alg.word.rates.motion.laps` |
| 2017 AMC 12A, Problem 12 | `nt.div.gcd.basic` | `alg.word.rates.motion.laps` |
| 2019 AMC 10B, Problem 7 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2019 AMC 12B, Problem 5 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2020 AMC 10A, Problem 9 | `alg.word.ratio.prop`, `nt.div.gcd.basic` | `alg.word.ratio.prop` |
| 2020 AMC 12A, Problem 21 | `nt.div.gcd.basic`, `nt.prime.val.legendre` | `nt.div.gcd.basic` |
| 2022 AMC 12A, Problem 4 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2022 AMC 12A, Problem 23 | `nt.div.gcd.basic`, `nt.prime.val` | `nt.div.gcd.basic`, `alg.seq.sum.other` |
| 2021 Fall AMC 10B, Problem 3 | `alg.eq.factor.squares`, `nt.div.gcd.basic` | `alg.word.compute.fraction` |
| 2021 Fall AMC 12A, Problem 8 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2021 Fall AMC 12B, Problem 25 | `nt.mod.basic.arith`, `nt.div.gcd.basic` | `nt.mod.basic.arith` |

#### High-value audit 5: complete divisor-count pool and proof controls

Read all 43 distinct divisor-count statements and strategies. Retain literal divisor-count conditions and samples; remove divisor counts used only to solve a series, harmonic-mean equation, exponential equation, base-digit count or floor sum. Move the requested logarithmic divisor product to divisor products/log equations; keep factorization tuples at Counting factorizations and bounded linear triples with their stated divisibility constraints. Preserve genuine factorial inputs under Factorials and divisibility rather than the Legendre-method leaf, including the GCD-pool factorial comparison. Recover missing probability, power-divisor, age, product-of-divisors and congruence cards where earned. Prove the infinite-series tail cannot carry into its integer part, and bound the search for the six least consecutive-divisor solutions. The age strategy now explicitly records the implicit ordinary-human-age assumption and an unrestricted-age counterexample; the credited statement and intended key stay intact. No node, card home or answer changes.

| Problem | Previous filing | Current filing |
|---|---|---|
| 2026 AIME II, Problem 9 | `alg.seq.sum.other`, `nt.divisor.count.tau` | `alg.seq.sum.other` (proof corrected) |
| 2026 AIME I, Problem 8 | `nt.divisor.count.tau`, `nt.mod.crt.split` | `nt.divisor.count.tau`, `nt.mod.basic.arith` |
| 1996 AIME, Problem 8 | `nt.dio.factor.sfft`, `nt.divisor.count.tau` | `nt.dio.factor.sfft` |
| 2004 AIME II, Problem 8 | `nt.divisor.count.factor`, `nt.divisor.count.tau` | `nt.divisor.count.tau` |
| 2005 AIME I, Problem 12 | `nt.divisor.count.tau`, `nt.seq.power.squares` | `nt.divisor.count.tau` |
| 2007 AIME II, Problem 2 | `nt.divisor.count.tau`, `cp.tech.stars.identical` | `nt.dio.linear.count`, `nt.div.rules` |
| 2010 AIME I, Problem 1 | `nt.divisor.count.tau`, `cp.prob.dice.draw` | `nt.divisor.count.tau`, `cp.prob.dice.draw` |
| 2011 AIME I, Problem 7 | `alg.poly.remainder.thm`, `nt.divisor.count.tau` | `nt.dio.bound.exp` |
| 2019 AIME I, Problem 9 | `nt.divisor.count.tau` | `nt.divisor.count.tau` (proof corrected) |
| 2019 AIME II, Problem 3 | `nt.divisor.count.tau`, `nt.prime.basic.test` | `nt.divisor.count.factor` |
| 2023 AIME I, Problem 14 | `cp.struct.paths.walks` | `cp.struct.paths.walks` |
| 2023 AIME II, Problem 10 | `cp.struct.tile.color`, `nt.divisor.count.tau` | `cp.struct.tile.color`, `nt.divisor.count.tau` |
| 2003 AMC 10A, Problem 8 | `nt.divisor.count.tau` | `nt.divisor.count.tau`, `cp.prob.basic.count` |
| 2003 AMC 12A, Problem 8 | `nt.divisor.count.tau` | `nt.divisor.count.tau`, `cp.prob.basic.count` |
| 2005 AMC 10A, Problem 15 | `nt.divisor.count.tau` | `nt.divisor.count.tau`, `nt.prime.val.factorial` |
| 2008 AMC 12B, Problem 23 | `nt.divisor.count.tau`, `alg.exp.log.rules` | `nt.divisor.count.sigma`, `alg.exp.log.eq` |
| 2013 AMC 10A, Problem 19 | `nt.digit.base.convert`, `nt.divisor.count.tau` | `nt.digit.base.arith` |
| 2017 AMC 10B, Problem 20 | `nt.divisor.count.tau`, `nt.prime.val.legendre` | `nt.divisor.count.tau`, `nt.prime.val.factorial`, `cp.prob.basic.count` |
| 2017 AMC 12B, Problem 16 | `nt.divisor.count.tau`, `nt.prime.val.legendre` | `nt.divisor.count.tau`, `nt.prime.val.factorial`, `cp.prob.basic.count` |
| 2018 AMC 10B, Problem 19 | `nt.divisor.count.tau`, `alg.word.everyday.age` | `nt.divisor.count.tau`, `alg.word.everyday.age` (proof corrected) |
| 2018 AMC 12B, Problem 14 | `nt.divisor.count.tau`, `alg.word.everyday.age` | `nt.divisor.count.tau`, `alg.word.everyday.age` (proof corrected) |
| 2020 AMC 10A, Problem 15 | `nt.divisor.count.tau`, `cp.prob.basic.count` | `nt.divisor.count.tau`, `cp.prob.basic.count`, `nt.prime.val.factorial` |
| 2020 AMC 10A, Problem 22 | `alg.fn.floor.eq`, `nt.divisor.count.tau` | `alg.fn.floor.eq` |
| 2020 AMC 12A, Problem 21 | `nt.div.gcd.basic` | `nt.div.gcd.basic`, `nt.prime.val.factorial` |


## Interface

### Practice, contest and list-editor UI review

*Formerly `UI-REVIEW.md`.*

Reviewed 2026-11-08 against main through `40b7f31` (merged PR #296). The owner requested a review of interactions, hover/focus/selection colours and consistency with the main app. The owner then authorized fixing all four findings and requested a top-level “Back to Results overview” link on completed-set review pages. The findings below record the original observations and the implemented corrections.

#### Findings and corrections

1. **Practice's current problem number has no distinct keyboard focus indicator.** In an active set or completed-set review, Tab to the current number. It matches `:focus-visible`, but its outline and box shadow remain `none`; its appearance is unchanged from the unfocused current state. An answered current number also uses the same fill as the other answered numbers, distinguished mainly by a two-pixel neutral border. The source is `.practice-session .cn-num.cn-here` and the answered-current rule in `css/styles.css` around lines 4250–4253. Keep the current/answered/result state, and give keyboard focus its own visible indicator. Fixed with a separate two-pixel blue `:focus-visible` outline and a three-pixel offset, preserving current, answered and result styles.
2. **The editor's “Remove every section” hover loses its destructive colour in dark mode.** With sections present, hover the sidebar tool. In light mode its text turns rose; in dark mode the later generic `.ge-tool` text rule overrides that colour and it stays gray. The section-delete × and “Remove from list” controls retain their rose signals, so the difference is visible within the same editor. See `.ge-danger:hover:not([disabled])` around line 4435 and the dark-mode `:is(...)` text rule around line 4534. Fixed with a targeted dark-theme destructive-hover rule, preserving muted normal text and disabled states.
3. **Move-to buttons lack the hover feedback used by other enabled editor actions.** Select a card and hover an enabled destination in the bottom Move to bar, or its New section/Out of sections buttons. Computed text, background, border, filter and shadow are unchanged. The sidebar's New section button brightens on hover. This is minor polish: the move actions work, and their keyboard focus rings are present. See `.ge-pill` around lines 4443–4445. Fixed by giving enabled Move-to actions the same 8% hover brightening as other editor actions; disabled destinations remain quiet.
4. **A few inactive controls still respond visually to hover.** Disabled Practice Previous/Next buttons inherit `.hp-btn:hover` and brighten by 8%, although they cannot be used. In dark-mode completed review, a read-only selected answer changes from the muted text colour to white on hover. The answer is correctly locked, but the feedback differs from its inactive role. See `.hp-btn:hover` around line 2649 and `.practice-review .rand-btns` around lines 4303–4305. Fixed by excluding disabled and ARIA-disabled controls from the shared hover rules, removing the review-only overrides that changed read-only answer colours. Selected answers retain their normal submitted-answer colours.

#### Review navigation addition

Completed-set review now has “← Back to Results overview” above “← Back to Practice”, using the normal blue back-link style. The existing Results overview button remains in the header. The new link returns to that set's results; it is absent from unfinished sets and the overview itself. This was explicitly requested by the owner after the review.

#### What worked

The intended colour roles are coherent: Practice choices and primary actions use the Practice purple; list editing uses Learn green; navigation and secondary actions use blue; selected grouping modes stay blue; inactive list toolbar buttons stay neutral; destructive confirmation actions use rose. Correct/incorrect results use green/red independently of the space colour. Topic suggestions use the same single gray highlight as Settings suggestions. Hover, selected-card and search-match states in the editor remain distinguishable.

The browser review covered light and dark themes at 1280 and 375 pixels. It exercised real set generation, topic suggestions and no-match states, contest/difficulty/count controls, AMC answer selection and clearing, AIME validation, marks, navigation, save/reload, finishing, score overview and read-only review; contest year/paper/problem navigation; editor section names/descriptions/order, card selection/moves/removal, find/add, undo/redo shortcuts, empty-section cleanup, automatic groups, sorting and save/reload. Physical mouse drags, drop-target highlights, section reordering and box selection were checked in both themes; touch multiselect and Move to were checked with mobile touch emulation.

Before the fixes, there were 36 completed interaction scenarios and 88 normal/hover/keyboard-focus comparisons. No page JavaScript errors, KaTeX errors or horizontal overflow were observed in the checked flows, and fixture answers/list data persisted across reloads. The initial broad script's four cleanup results stopped at an ambiguous test locator after reload; a corrected targeted run verified those four flows and their stored list data. That was a test-selector issue, not an app defect. The review is not an exhaustive guarantee for every possible list, browser or problem statement.

#### Fix verification

Eighty-eight targeted Chromium checks passed at 1280/375 pixels in light/dark: visible blue focus outlines on current unanswered, answered and reviewed numbers; disabled Previous/Generate and read-only answer hover remaining unchanged; selected/unselected live-answer highlights preserved; blue Cancel and neutral toolbar retained; rose destructive hover in both themes; enabled Move-to feedback and quiet disabled destinations; move/Undo behavior; and no page errors, KaTeX errors or horizontal overflow. The new back link was checked above Back to Practice, returning to the correct overview, coexisting with the header button and absent from unfinished sets and the overview itself. Screenshots of the updated navigation and focus indicators were visually inspected. All repository gates, all three regression suites, generated-notes/shelf checks and `git diff --check` passed after the fixes; app/CSS asset versions were bumped.

#### Handoff

All four findings are addressed after the owner explicitly authorized the fixes. CSS and the small completed-review navigation addition are the only UI source edits in this batch. The final verification results are recorded with the batch in CHANGELOG.md and its pull request. The textbook revision resumes at S7 after the review. `TEXTBOOK-REVISION.md` records completed content batches and their validation, and `CONVENTIONS.md` records the button-colour rule implemented in PR #296.

#### Practice formatting follow-up (2026-11-08)

Results overview retains its existing blue highlight in completed topic/mock review, following the owner's final preference. The secondary-button convention remains unchanged.

A computed-style comparison against main through PR #300 found that all four entry panels already used identical heading typography (16px at Normal text size, weight 700) and padding. Subtitle bottom margins differed (10px on random/topic, 12px on mocks), and Contests had no subtitle. All four now use `.practice-panel-intro` with matching typography, colour and 6px/12px margins; Contests gains “Browse past papers by contest and year.” No heading size was increased or reduced.

Learn → Lists also gains the requested subtitle, “Browse study lists by level and topic, or make your own collection of cards,” using the same `learn-note` class as Textbooks.

The contest-year buttons already shared the year field's height and vertical alignment. Their font chevrons could appear off-center because of the glyph baseline and side bearings. Contest-year and matching mobile textbook previous/next controls now use symmetric SVG chevrons whose drawn bounds sit at the center of each button. Links, accessible labels and inactive endpoints are preserved; the select's existing down-chevron is already centered in its image.

All repository gates, five regression suites, generated-notes/shelf, lab-version and diff checks passed. Browser checks covered 12 four-panel formatting comparisons, 12 Learn subtitle comparisons and eight review-button blue-hover/focus/navigation scenarios across light/dark, desktop/mobile and three text sizes, plus 72 geometric chevron-centering checks with active/disabled endpoints and working year/book navigation. Screenshots inspected; no page errors, KaTeX errors or horizontal overflow observed.

#### Accessibility and search follow-up (2026-11-08)

The separately verified accessibility work is recorded in [Accessibility review](#accessibility-review). The owner's screenshot follow-up fixes clipped keyboard outlines on recent chips, home tiles and sidebar subject/topic controls. Boundary controls keep the same blue ring inside their edges. Recent rows remain one line but scroll rather than hide wrapped keyboard stops; long labels retain their full accessible names.

Search inputs retain the owner's preferred single blue focus border, without a second outer ring or shadow. Browse by Tag opens with focus on its heading rather than its search input. Tab reaches search, Escape closes the dialog and returns focus, and `/` still explicitly focuses the main search. Other controls retain visible keyboard focus. Results overview remains blue, and inactive list toolbar hover remains neutral.

Book search now offers one actual Index result per matching canonical term, below the first two other relevant results when available. It opens the term's full list of lesson locations in that book, focuses the entry and briefly highlights it. Glossary jumps are preserved, including mathematical terms, repeat searches and Back navigation; reduced motion uses a temporary static band.

Validation: 36 accessibility browser scenarios across light/dark and 1280/375px, 84 Methods-sidebar subject/topic checks across three text sizes and both widths/themes, and Index/Glossary browser checks in the same four theme/width combinations. All five Node regression suites, repository gates, generated notes/shelf/tree, lab versions and diff checks passed. Screenshots were inspected. This navigation and polish batch does not advance the 37/103 teaching-chapter revision count; AMC Geometry S7 remains next.

#### General alignment and usual workflows (2026-11-08, after #304)

The home textbook list already centered each cover, title and lesson count, with shared columns. The outward outline expanded beyond each row and made it appear taller than its neighbours. Home book rows now have horizontal clearance for an inward ring while their visible content stays in its original columns and their height stays compact. Other dense full-row surfaces (recent/new cards, contest summaries, list rows and chapter tabs) use contained rings too. Ordinary buttons and inline links retain their visible surrounding outline space; search retains its single focus border.

The general browser review covered 132 states: Home, Learn shelf, book contents/lesson, Practice, Settings, Methods, a reference card, contest year, list view and editor; both themes, 1280/375px, and three text sizes. Book covers/titles/counts were measured for shared centers and columns, and Practice panel typography was compared. No clipped control labels, horizontal overflow, page errors or KaTeX errors were observed. Screenshots were inspected. The accessibility check now also verifies all six home book rows and their focus bounds.

The usual-workflow pass uses actual UI actions in fresh browser storage: scroll to and open a card; click main search without moving the page; search/apply a circle tag; create and name a list; search/add three cards; create/name a section; move cards; Undo/Redo; save and reload; generate a two-problem topic set; answer and mark; save/exit and resume; finish; open problem review and return to Results overview; reload Completed sets. List contents/sections and practice answers/marks/completion are checked after reload. These checks exercise the affected everyday flows, not every possible app state.

All four usual-workflow runs passed (light/dark × desktop/mobile), including saved lists and completed practice sets after reload. No additional functional defect was found in these runs. The final batch also passed all repository gates, five Node suites, generated notes/shelf/tree and asset-version checks.

#### SVG symbols and Mac appearance (2026-11-09, after #306)

The owner requested replacing the remaining font-dependent UI symbols while keeping their Mac appearance. Filled/outlined stars, hamburger bars, dropdown/disclosure triangles, close controls, list diamonds, arrows/chevrons, empty-state symbols and action icons now use SVG. The shared JavaScript helper is `js/ui-icons.js`; the header embeds the same shapes directly, and CSS-generated disclosure symbols use SVG masks with Safari-compatible prefixes. Corresponding flashcard, quiz and topic-tree symbols are updated too. Mathematical notation, prose/list bullets and descriptive native-select text retain their normal typography.

The hamburger's horizontal padding could squeeze its content; it now has zero padding and a fixed SVG box. Both the SVG box and drawn shape are centered. Star shapes retain the filled/outline distinction, rounded points, existing sizes, gold selected state and hover behavior. Other symbols inherit their existing colours. SVGs are decorative to screen readers; controls retain their accessible names, and tag removal gets an explicit Remove tag label. Star changes from the add-to-list menu and reload keep SVG rather than restoring a text character. Settings search retains its temporary underline when a disclosure marker is highlighted.

The optional browser check is `tools/check-ui-icons.cjs` (serve the checkout and set CHROME/COMPMATH_URL; UI_ARTIFACT_DIR captures screenshots). It measures both drawn and box centering under alternate font families and exercises star persistence/menu synchronization, mobile menu/dropdown behavior, tag removal, modal closing, book navigation, source links and experimental-page symbols.

#### Unanswered submission and answer clearing (2026-11-09)

At the owner’s request, manual Finish and review now confirms only when non-voided questions remain unanswered. The prompt states the unanswered count and that finishing locks answers, uses the existing centered app dialog and initially focuses Cancel. Fully answered sets still submit in one click. Cancel/Escape leaves the set editable; leaving the route cancels the pending confirmation. Mock time continues while a manual prompt is open, and expiry submits automatically and dismisses that prompt.

A small Clear answer button appears under each active answer, including multiple-choice, AIME integers and mock exact values. It is disabled when blank, clears saved state and validation errors, updates answered counts/navigation, and returns focus to the answer controls. Existing double-click and Delete/Backspace clearing remain. Submitted review has no clearing control. The optional browser check is `tools/check-practice-actions.cjs`.

Final validation for this batch: all repository gates, five Node suites, generated notes/shelf/tree, lab versions and diff checks passed. SVG checks passed in both themes at 1280/375px, including actual flashcard/quiz/topic-tree symbols; the general layout review passed 132 page/text-size states. All four usual-workflow runs passed. The 36-scenario accessibility check also passed with the new controls, and all four practice-action runs passed: clear/persistence/invalid input in multiple-choice/AIME/exact forms, Cancel/Escape, conditional submission, locked review, voided-question handling, mock expiry with a prompt open and route cleanup. Screenshots inspected.

#### Compact focus and square add buttons (2026-11-09, after #307)

The owner’s add-to-list screenshot showed the new-name field acquiring a second oversized outer ring. Text-entry controls now use a focused border or their inset editor underline. This includes the popup, Settings command field, numeric widgets, lesson notes and section name/note editors. Checkboxes/radios/sliders and other controls keep visible keyboard indicators; ordinary outlines retain their two-pixel width with a smaller one-pixel gap, and dense-row rings stay inside their boundaries. The owner approved the existing Practice answer highlight, so that field keeps its previous three-pixel-gap ring.

The card’s + button is square rather than widened by horizontal padding: 24px on regular pointers, with the existing 40px coarse-pointer target. The centered SVG retains its size. Popup Create now uses the exact shared soft-button classes used by Cancel: gray at rest, blue text/border on hover, without solid blue fill. Its compact popup dimensions are retained. The new-name field also has an explicit accessible label.

Focused browser checks passed in both themes at 1280/375px for popup creation, command/numeric fields, lesson notes, section name/note editing, preserved Practice answer highlight and checkbox focus. The 36-scenario accessibility check passed. `tools/check-ui-icons.cjs` now also verifies square add-button bounds, compact popup focus and the Create action’s soft background/blue hover.

The final popup/icon checks passed in all four theme/width combinations, including soft gray Create hover without a solid fill, square + bounds and preserved star/menu behavior. Screenshots inspected; all repository gates and diff checks passed.

#### Untitled defaults and answer focus update (2026-11-09, after #308)

Submitting the add-to-list popup with an empty or whitespace-only name now creates the next available Untitled list name and adds the current card, then closes with the normal toast. The shared `createList` fallback provides `Untitled list`, `Untitled list 2`, etc.; Learn’s blank-list entry point uses the same rule. Explicit names still trim whitespace. Existing names and stored list contents are preserved.

The owner subsequently requested the smaller highlight on the Practice answer input too, overriding the earlier preference to keep its outer ring. It now uses the same single blue focused border as other text-entry fields. Keyboard interaction and answer storage are unchanged.

Validation passed in light/dark at 1280/375px for blank/whitespace creation, numbered-name collisions/gaps, explicit-name trimming, current-card membership, reload persistence, Learn’s shared numbering and compact answer focus. Extended popup/icon checks and all repository gates passed.

#### Answer focus colour correction (2026-11-09, after #309)

The owner correctly reported that the answer highlight had disappeared. Its base ID-selector border declaration overrode the generic low-specificity compact focus colour, while the outer ring had been removed. The explicit `#practice-answer:focus` rule now supplies the actual blue border and a one-pixel inset reinforcement. This forms a compact two-pixel blue contour inside the existing field bounds, with no outer gap or size change. The browser check now verifies rendered blue border/shadow colours rather than only absence of an outline.

The correction passed all four light/dark × 1280/375px practice-action runs and all repository gates.

#### Practice answer contour and tap bounds (2026-11-09)

The owner requested a thinner contour matching search fields and no focus from nearby empty space. Reproduced both causes: the 1px border plus 1px inset made a two-pixel contour, and mobile Chrome retargeted taps 4px outside each input edge onto the field. Desktop clicks on blank space within the full-width label also activated it.

Removed the inset reinforcement, limited the answer label to its text width, and rejected touch pointer-down focus when the original coordinates are outside the visible input bounds. Interior taps and normal label/keyboard activation are preserved. The existing practice-action check now exercises all four outside edges, label whitespace, a positive inside tap, the actual one-pixel blue border, AIME/exact-value entry, Clear, invalid input and saved answers. All four theme/viewport runs passed, along with the existing confirmation/timeout/read-only review flows; screenshots inspected. This scoped UI request leaves the ongoing T3 goal intact.

### Accessibility review

*Formerly `ACCESSIBILITY-REVIEW.md`.*

Owner-requested verification and fixes, 2026-11-08. This reviews the friend's reported findings against the current app; it is not a claim of a complete WCAG audit.

| Finding | Verification | Resolution |
|---|---|---|
| Sidebar anchors without destinations | Confirmed: 97 real generated sidebar anchors had no `href`. | Real subject/topic/group URLs, native modifier-click behavior, and Enter navigation. Display-only preview rows use spans. |
| Faint-text contrast | Confirmed on the four shared background surfaces: 2.97–3.45:1 in light mode and 3.19–4.11:1 in dark mode. | Light `--text-faint` is `#5f6b82` (minimum 4.62:1); dark is `#8b98b6` (minimum 4.93:1). Copy/add-list controls no longer reduce this contrast with resting opacity. |
| Global search label | It had a placeholder but no explicit accessible label. | Added `aria-label="Search the reference"`. |
| Keyboard focus indicators | Native/specific indicators existed, but many custom controls suppressed outlines or only changed a border. | Shared visible two-pixel blue outline with a three-pixel offset for keyboard focus. At the owner's follow-up request, search inputs retain their existing single blue focus border instead of a second outer ring. Pointer-only focus does not acquire the ring. Edge-to-edge tiles, recent chips, suggestion rows and sidebar subject buttons/sublinks use an inward offset so clipping containers do not cut the ring off. |
| Custom radio keyboard behavior | Confirmed: button-based groups lacked the standard arrow-key/roving-focus behavior. | Shared arrow wrapping and Home/End, one Tab stop per group, disabled choices skipped, focus preserved when Settings redraws. Read-only submitted answers are not interactive Tab stops. |
| Skip link | No skip link existed. A main landmark already existed, so this was not an absence of every bypass mechanism. | First keyboard link now skips directly to main content without changing the app route. It is hidden until focused. |
| Reduced motion | Only sidebar transitions were covered; explicit smooth scrolling and wheel gliding remained. | App-wide reduced CSS motion, preference-aware explicit scrolling and instant wheel movement; live preference changes also stop a running wheel glide. |
| Small icon targets | Some dense card actions were smaller than 24px. A blanket 40–44px requirement for every control would overstate the issue: size/spacing and inline-link exceptions matter. | Dense card controls now have at least 24px targets. Card/list/About controls use 40px targets on coarse pointers, retaining glyph sizes. Adequately sized controls are preserved; the About circle itself remains 16px. |
| Contest paper tabs | Confirmed: click selection existed without arrow keys, roving focus or complete tab/panel naming. | Named tablist, linked tab/panel ids, Left/Right and Home/End, selected-tab focus and the existing responsive panel display. |
| Browser page titles | Confirmed: routes kept one static title. | Route-specific card, problem, book, practice/results and contest titles; selecting a paper updates its title too. |
| Unnamed Page Tools groups | Confirmed in the Page Tools appearance controls. | Text size and Theme have explicit group names. |
| Focus after route changes | Focus could remain on a removed element or an old navigation control. | Router navigation focuses the new content heading, with main as a fallback, without disrupting saved scroll restoration. Initial load does not steal focus. |

Adding real sidebar links also required keeping collapsed sections and the closed mobile drawer out of keyboard navigation. They now use `inert`; subject buttons expose expansion/control relationships. Opening the drawer moves focus inside it, Tab stays among its controls, and Escape closes it and returns focus to the menu button. Nested dialogs retain their existing focus handling.

The owner's screenshot follow-up confirmed that outward rings were clipped by recent-item rows, home tiles and sidebar subject/topic controls. Those boundary controls now draw the same two-pixel ring inside. Recent chips remain one row and scroll horizontally instead of hiding wrapped keyboard stops; long labels truncate visually while retaining their full accessible text. Index/Glossary search jumps focus the exact reference paragraph. Reduced-motion readers get a temporary static highlight rather than an animation that disappears immediately.

The review also found that browsing-card names needed ordinary links for keyboard access. They now link to their card pages with inherited styling; whole-card pointer behavior remains available. Star controls expose their label and pressed state.

Results overview keeps the owner's blue-highlight preference. The visible changes are contrast, keyboard rings and the focus-only skip link, plus room for small targets; the page structure is retained.

#### Implementation and validation

`js/accessibility.js` provides shared choice-group behavior, skip navigation and motion helpers. The app owns real URLs, route titles, sidebar availability and page focus. All new smooth scrolling should use `AppAccessibility.scrollBehavior()`.

Run against a served checkout with Playwright available:

```sh
CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-accessibility.cjs
```

`UI_ARTIFACT_DIR` optionally captures screenshots. The browser check covers light/dark, desktop/touch, contrast, skip navigation, focus rings, real sidebar URLs and modifier clicks, radio persistence and read-only answers, Settings redraws, Page Tools names, contest tabs, page titles/focus, reduced motion, target sizes, recent-row focus visibility, home-tile rings and list-editor move/Undo. Repository gates, the five regression suites, generated notes/shelf and asset-version checks remain required.

The completed pass passed 28 browser scenarios at 1280/375px in light/dark, including actual modifier-click navigation, browser Back focus, typing without focus theft, persisted keyboard answers, locked review, coarse targets and list-editor move/Undo. Screenshots were inspected. All repository gates, five regression suites, notes/shelf and diff checks passed.

The screenshot follow-up initially passed 32 accessibility scenarios at the same widths/themes, including fully visible last-item focus in both recent rows and inward home-tile rings. A boundary scan of visible controls on Home, Learn, Practice, Settings, a reference subject, a contest year and a textbook lesson found no further clipped rings at 1280/375px. The separate `tools/check-book-search.cjs` checks Index/Glossary jumps and reference highlight behavior in both themes and widths. These checks cover the affected flows; they do not certify every app state or assistive technology.

The owner then requested the original single-border search appearance. Search inputs retain their blue focus border with no extra outer ring or shadow. Browse by Tag initially focuses its heading, so the search field does not select itself or summon a phone keyboard; Tab still reaches search, Escape returns to the opener, and `/` still focuses main search explicitly. The browser check covers these behaviors and the same search styling in Practice, Settings and the list editor (36 scenarios), with textbook search covered separately. Sidebar subject buttons and first/last topic links are checked against every clipping ancestor, so a partial blue line is not treated as a complete focus indicator.

The Methods sidebar follow-up also passed 84 checks: the subject button and all six topic links, at all three text sizes in both themes and widths. Complete outlines were checked inside their clipping ancestors, and screenshots of subject/topic focus were inspected. All five Node suites, repository gates and generated notes/shelf/tree checks passed for the final batch.

The later general alignment pass contains focus within dense full-row links (including the home book list), with horizontal clearance around covers and no increase in row height. Ordinary buttons and inline links keep surrounding focus space. The browser check now measures all six home textbook rows for compact height and shared vertical centers. See [Practice, contest and list-editor UI review](#practice-contest-and-list-editor-ui-review) for the 132-state layout review and actual everyday UI workflows.

The final follow-up passed the 36-scenario accessibility check with home-row alignment assertions, the 132-state layout review and four complete everyday-workflow runs. No additional functional defect was found in the latter; see the UI review for the exercised steps and validation scope.

The owner’s SVG-icon follow-up preserves icon-only control names and hit areas while removing font/emoji rendering differences. Decorative SVGs are hidden from screen readers and never become separate focus stops. Star pressed state and filled/outline SVG stay synchronized through menu changes and reload; tag removal has an explicit accessible label. See the section "Practice, contest and list-editor UI review" and tools/check-ui-icons.cjs for appearance, geometry and interaction validation.

The practice follow-up adds a visible Clear answer button with a disabled blank state and focus returning to the answer control. Incomplete manual submission uses the existing named dialog with Cancel initially focused; Cancel/Escape preserve editability. Fully answered sets remain one click, and review remains read-only. Pending manual prompts are dismissed on route changes or automatic mock expiry. The final 36-scenario accessibility pass and four theme/width practice-action runs passed.

The compact-focus follow-up uses focused borders/inset underlines for text entry, including the new-list popup; ordinary keyboard outlines now keep their two-pixel width with a one-pixel gap. Dense-row inward rings are retained. The owner approved the Practice answer input’s existing three-pixel-gap ring, which is preserved. Add-to-list + buttons are square at the existing regular/coarse target sizes. Popup Create reuses Cancel’s soft-button treatment. Focused field checks and the 36-scenario accessibility check passed; keyboard indicators remain visible.

Updated owner preference after #308: the Practice answer input now also uses the compact single focused border, replacing the previously retained outer ring. A visible blue focus border remains; typing, validation and clearing are unchanged. Blank/whitespace list creation now produces a numbered default instead of leaving Create with no visible result.

Answer-focus correction after #309: the compact answer field was incorrectly gray on focus because its base ID border outranked the generic focus rule. An explicit answer-focus rule restores the blue border with inset reinforcement and no oversized outer ring. The practice-action check now verifies the actual accent colour on both the border and inset highlight.

The correction passed all four light/dark × 1280/375px practice-action runs and all repository gates.

The subsequent answer-field correction removed the inset reinforcement too: the current field has exactly one 1px blue border, and tapping blank space around it no longer focuses it. The four Practice action runs check this final behavior.

The owner’s shadow follow-up retains contrast colours and visible keyboard indicators. Floating surfaces now share the light Opened strategies reset toast shadow in each theme; small raised controls share its shadow opacity. Removed the leftover landing-search halo and reduced decorative list-editor halos. The 36 accessibility scenarios and four Practice action runs passed again. No further known everyday-use accessibility regression remains in the reviewed flows; this is not a claim to have tested every state or assistive technology.

## HMMT February (Step H)

### Coverage gaps and official-source issues, 2004 to 2020 (recorded 2026-11-13)

Codex added the 2018 to 2004 rounds and the 2011 two-subject papers (PRs #328 to #330, 450 paper references) and reported, as handoff notes, what no card or node covers and where the official papers are wrong. Each was filtered with common sense before a QUESTIONS row was opened (CLAUDE.md: propose what contests actually use).

**Raised as candidates:** P72, the continuous Intermediate Value Theorem (five problems); P73, polynomials over the integers mod $p$ (three problems, with Claude's 2020 A10).

**Recorded, not proposed** (each seen once, and not used on the AMC or AIME; the problem cites the nearest card or none): Motzkin numbers and noncrossing partial matchings (2008 C7); the Newton polytope (2012 A10); geometry of the high-dimensional cross-polytope (2012 G7); waiting times for overlapping patterns (2012 C7); circulant matrices and their Fourier eigenvalues (2016 A9); the smallest enclosing circle (2017 G3); the shooting lemma for an internally tangent circle and its arc midpoint (2017 G7); van Aubel's theorem on squares on the sides (2017 G9); two-recipient subset coverage (2016 C10); bitwise sum, OR and AND identities (2018 A8); binary digit-parity weighted sums (2009 C5); greedy Egyptian fractions (2010 A2); commuting polynomials (2010 A10). Squared face areas of a right-corner tetrahedron (2005 G7) is De Gua's theorem, which has a card (`de-guas-theorem`); the problem asks for exactly that theorem (the official route proves it by coordinates), so the card was added to its tags on 2026-11-13.

**Official-source errors, as reported** (our pages link the official paper and solutions unchanged; a reader should know): 2012 Algebra #9 gives 18 triples where there are 17; 2012 Geometry #6 says minimize where it means maximize; 2010 Algebra #7 lacks a nonzero hypothesis; 2010 Combinatorics #8 has an official correction; 2016 Combinatorics #4 counts the empty subset and #7 assumes positive labels; 2006 Combinatorics #10 read literally gives 113, the official 253 is for the intended reading; 2007 Combinatorics #4 has its $x$ and $y$ ranges swapped and 2007 Algebra #3 allows $x=y=0$; 2008 Combinatorics #1 is ambiguous between one slice and the whole cube; problem 18 of the 2011 Algebra/Geometry and Combinatorics/Geometry papers leaves the order of points ambiguous. Smaller slips in official proofs are in the PR descriptions.

**From Claude's lane (2019 to 2026):** the official 2024 Algebra and Number Theory #1 solution notes that it missed the case $s=t$, which gives $s=-6$ besides $29$; both answers were accepted at the contest. Our page links the official solution, which carries that remark.

**HMMT November (2011 to 2026), Claude's lane:** no source error was noticed while filing. The estimated years were checked against the rated ones (see CHANGELOG, 2026-11-13).

**Counting.** The 2011 papers have 60 references for 27 distinct questions (each subject pair is a separate paper with permuted numbering), and the 2004 committee question repeats one from 2007, so paper references, not distinct questions, are the unit of progress. **Decided (owner, 2026-11-13):** the calculus questions in the 2011 two-subject papers stay, although the separate Calculus papers are not added.

## ARML Individual

### Sources and coverage (recorded 2026-11-13)

ARML's public pages (`www.arml.com/ARML/arml_2019/page/index.php?page_type=public&page=4`) link two contest files: the 2009–2014 book (contests, Power and Local) and the 2019 booklet. The 2016, 2017 and 2018 booklets are on the same server under the same naming (`public_contest_files/<year>_contest_file/<year>_Contest_Final_Version.pdf`) though not linked; 2015 and 2020 on are not there under any name tried, and the site's book page mentions a 2015–2020 book that is not public. The earlier contests (1976 to 2008) are only in printed books. So the coverage is 2009 to 2014 and 2016 to 2019, 100 problems. ARML's notice on each page allows reproduction for non-commercial educational use and forbids posting entire contests; the app reproduces no statement or solution, only links the official file, opened at the round (`#page=`), the PDF pages checked by hand.

**Filing.** Each problem was read with its official solution (and alternate solutions) before filing. No new node or card was needed. Judgement calls: 2018 I-1 is factoring by grouping, which is the first identity on the SFFT card (`sfft`), so it cites that card; 2014 I-9 cites Lucas's Theorem, the official alternate route (the main route compares 7-adic valuations of a binomial ratio); 2017 I-10, a rhombus on the graph of $\lfloor x\rfloor - \{x\}$, cites only Floor Basics, since the rest is slope reasoning with no card. No source error was noticed.

### ARML Local (recorded 2026-11-13)

The 2009–2014 book also holds ARML Local, ARML's own local contest; its Individual round (10 problems a year) is filed from the book's problems and solutions, 60 problems. No later ARML Local contest is public. No new node or card was needed, and no source error was noticed.

## SMT subject tests

### Sources and coverage (recorded 2026-11-13)

`stanfordmathtournament.com/past-tests/problems` lists SMT 2011 to 2014 and 2018 to 2025; the pages for 2015 to 2017 and 2026 exist but hold no files. Each test is a pair of PDFs, `/pdfs/smt<year>/<subject>-problems.pdf` and `-solutions.pdf`, which the app links. The fourth subject changed name: Advanced (2011 to 2014), Discrete (2018 on), and in 2021 two tests, Combinatorics and Number Theory, in its place. Calculus (110 problems; no Calculus test in 2021) is filed under a new Calculus area, `alg.calc` (TQ21, added for the owner's request for all four tests). Most Calculus problems cite no card, since the collection has almost no calculus cards; they cite one only where the route really uses it (a derivative extremum, a symmetry pairing $x \to a - x$, a geometric or exponential series, an inverse-function substitution).

**Reading.** Every problem was read with its official solution. The 2024 solution PDFs lose their mathematics in text extraction (the formulas are in fonts without a character map), so 2024 was filed from the problem papers, which extract cleanly, and the solutions' prose. **Judgement calls:** three problems cite no card because none fits their route: 2013 Advanced #9 (a candle-timing puzzle), 2019 Algebra #9 (an increasing function whose compositions are arithmetic) and 2025 Algebra #10 (distinct roots of compositions of three linear maps). No new node or card was needed apart from TQ21, and no source error was noticed.

### SMT General test (recorded 2026-11-13)

The General test (25 problems in 110 minutes; 22 in 2021) is SMT's individual round for students who take no subject tests. It reuses subject-test problems: 63 of the 297 are word for word the same as a subject-test problem of that year, found by comparing statements (`difflib` ratio above 0.85 on the first 250 characters), plus 2023 #12 and the 2025 matches, done by hand because those PDFs extract poorly. A twin copies its subject-test problem's cards, nodes and rating, and its rating reason names the twin; like the 2011 HMMT two-subject papers, twins are counted once per paper in contest figures. 2025's General problems were read from the solutions PDF, whose text extracts cleanly where the problems PDF does not. Six General problems cite no card: 2012 #1, 2013 #1 and #2, 2014 #2 and 2025 #1 are one-step word or substitution problems, and 2025 #9 (counting the equations students build term by term) has no fitting card. No new node or card was needed.

## UMD HSMC Part I

### Sources and coverage (recorded 2026-11-13)

`mathcomp.math.umd.edu/past-contests/` posts Part I (25 multiple-choice questions, 75 minutes) and its solutions for 1997 to 2026, except 2020 (no contest) and 1997 (no solutions); 2003's paper is `2003p1.pdf`. The files sit in different upload folders, so `UMD_FILES` in `js/app.js` lists each year's exact path; the competition's addresses redirect to the university's file host and load. Part II is proof-based and is not added. The 1997 and 1998 papers extract as garbled text (fonts without a character map), so they were read from page images; for 1999 to 2003 the solution files' text did not split by problem, so those years were filed from the statements, checked against the posted answers where they could be read. Part I is a broad test written for every high-school level: ratings run from 700 (an easy AMC 10 question) to about 2400. 22 problems cite no card (one-step arithmetic or logic questions). No new node or card was needed, and no source error was noticed.

## Duke Math Meet

### Sources and coverage (recorded 2026-11-13)

`math.duke.edu/duke-math-meet` lists the past rounds. The Individual round is posted for 2007 to 2022 (none for 2006, and none yet after 2022); 2007 and 2008 have 8 problems, later years 10. Solutions are posted for 2012, 2013 and 2019 to 2022 (2020 in one booklet with the problems); 2007 to 2009 have answer sheets only, which the app does not present as solutions; the other years have nothing. The older files moved from `services.math.duke.edu` to `sites.math.duke.edu`, so the app links the new address. The 2022 files have generic names (`Individual Round.pdf`, `Solution Booklet.pdf`); their contents were checked to be 2022's. The meet labelled 2013 was held in February 2014. Where no solution was posted, the filing follows the route the problem calls for, checked against the posted answer. Three problems cite no card: 2008 #3 (two ducks racing along curves), 2015 #9 (observers covering an interval) and 2022 #8 (a fire-blocking game). No new node or card was needed.

## CMIMC

### Sources and coverage (recorded 2026-11-13)

`cmimc.math.cmu.edu/math/past-problems` lists every individual test from 2016 to 2026. Its PDFs load inside a browser but return 404 to scripted requests, and a scripted bulk download was refused by the session's safety check as getting around the site's bot protection. The official papers and solutions for 2016 to 2022 are also kept, under the same file names, in the CMIMC website's source repository (`howard36/cmimc-official` on GitHub, `public/assets/docs/past-tests/`, last updated July 2022), which was read instead; every link the app builds was checked against the archive's own listing. 2023 to 2026 are not in that repository and no other official copy was found (a third-party transcription exists and was not used), so those years were skipped at the owner's word (2026-11-13: "skip cmimc"). The 2021 papers are scanned images; their solution PDFs carry the statements as text and were read from those. Each 2020 test's 11th question is an estimation question and is not filed. In 2021 and 2022 the Division 2 test repeats four Division 1 problems; those copy the Division 1 problem's cards, nodes and rating. The Computer Science tests (2016 to 2018) are algorithmic puzzles filed under the nearest counting and graph nodes. No new node or card was needed, and no source error was noticed.

## Math Prize for Girls

### Sources and coverage (recorded 2026-11-13)

The Advantage Testing Foundation's page `mathprize.atfoundation.org/resources` links each year's 20-question test and its solutions as PDFs at `/resources/past-tests/<year>/mathprize<year>problems.pdf` and `...solutions.pdf` (2009's names are capitalized, `MathPrize2009...`). There was no contest in 2020, and 2026's solutions are not posted yet, so that year's pages link the test only. The proof-based Math Prize Olympiad papers on the same page are left out. Every problem is read from the official solutions file (statement, answer and solution together), or from the test alone for 2026. Family Math Prize for Girls; a reference is "2019 Math Prize for Girls, Problem 7"; links come from `mathPrizePdf` in `js/app.js`, and every URL pattern was checked to return the PDF.

### Filing (2026-11-13, done)

All 340 problems, 2009 to 2019 and 2021 to 2026, are filed, tagged and rated. Ratings are author estimates on the collection's scale (the contest publishes no solve counts): Problem 1 near an AMC 10 middle problem (about 900 to 1400), Problem 20 near a mid-to-late AIME problem (about 2300 to 2900). Two problems cite no card because none fits the route: 2011 #14 (a minimax of a function linear in each variable, decided at the endpoints) and 2018 #8 (the area between two cosine curves, found from their symmetry about the midlines); neither is a card candidate. The browser checks (`check-browse`, `check-contest-page`, `check-contest-profile`) pass, and a 2019 problem page and year page were checked in both themes at 1280 and 375 px: both PDFs linked, no overflow, no KaTeX error.

2026's solutions are not posted, so its problems were filed from the test alone; the paper numbers its instructions 1 to 4 like problems, and the reader was checked against the raw text so that Problems 1 to 4 are the real ones. The routes of Problems 1, 3, 5, 6, 9, 10, 11, 16, 18 and 19 were confirmed by computation: 46 ratios for #3; 20 permutations of seven with two inversions for #5; 9,600 triples for #6; the polynomial of #9 is (z + 1)^8 - z^8; #10 factors as -4 sin(t/2) sin 4t sin(7t/2); n = 200 for #11; #16 telescopes through 16n^4 + 4 = (4n^2 - 4n + 2)(4n^2 + 4n + 2); #18's matrix has 1 as its only eigenvalue, so M = I + N with N nilpotent; and #19 has 1,092 arrangements. The other ten (2, 4, 7, 8, 12, 13, 14, 15, 17, 20) are filed from a read of the problem, and their cards and ratings should be rechecked when the official solutions appear. 2026 #17 needs the area of a spherical polygon (Girard's angle-excess formula), which has no card; it cites the icosahedron card only, and Girard is not proposed as a card because contests at this level almost never use it.

## MMATHS Individual

### Sources and coverage (recorded 2026-11-13)

Yale Math Competitions' archive (`www.mmaths.org/archive`, a script-built page) serves each year's MMATHS Individual test and its solutions from `yalemathcompetitions-files.s3.amazonaws.com/mmaths_<year>_individual.pdf` and `..._individual_solutions.pdf` (2021 and 2022: `..._individual_key.pdf`, answers only). The archive itself notes that the 2014 test was overwritten (its solutions restate the problems and stand in for the paper, so a 2014 page links one PDF) and that all 2017 files are lost. Each test has 12 problems: 131 are filed from 2014 to 2016 and 2018 to 2025. 2016 #4 was thrown out at the contest ("Nobody received points for this question") and is left out. Family MMATHS; a reference is "2019 MMATHS Individual, Problem 4"; links come from `mmathsPdf` in `js/app.js`, and every file was downloaded once to check it.

### Filing (2026-11-13, done)

Statements were read from the solutions files, because the papers' two-column layout scrambles the problem order in extracted text (2015's #8, #9 and #12 came out misplaced, so that layout was not used). 2021 and 2022 have answer keys only, so their filings rest on a read of each problem (2021's key numbers Problems 4 to 12 as 13 to 21). 2023 #12's official solution reads "Full solution in progress"; its filing rests on a read of the problem. Two problems cite no card: 2014 #12 (a linear operator on functions, pinned down by its two properties) and 2021 #10 (a circle tangent to the circumcircle through the line OI, whose route was not settled without a solution). 2024 #10: the official solution names Wilson's theorem, but the fact it uses, C(an, n) congruent to a mod a prime n, is Lucas's theorem, and the problem cites the Lucas card. Ratings are author estimates, about 600 to 2800. The browser checks pass, and the 2014, 2016 and 2021 pages were checked in both themes at 1280 and 375 px; the 2016 year page lists 11 problems, without #4.

## Girls in Math at Yale, Individual round

### Sources and filing (2026-11-13, done)

The same archive (`www.mmaths.org/archive`) and file store hold the Girls in Math at Yale Individual round for 2019 to 2026, 12 problems a year: `gim_<year>_individual.pdf` (2022: `..._individual_round.pdf`), with full solutions for 2020 and 2024 to 2026 (`..._individual_solutions.pdf`) and answer keys for 2019 and 2021 to 2023 (`..._individual_key.pdf`). All 96 problems are filed, tagged and rated (author estimates, about 600 to 2600). The 2019 and 2021 papers are scanned images and were read as rendered page images; for the answer-key years each filing rests on a read of the problem. Three problems cite no card: 2019 #4 (a six-square dissection), 2019 #11 (a nested fraction, monotone in each variable) and 2021 #9 (independent cut choices between consecutive vowels); 2022 #11 also cites none, because no route could be settled from the answer key. Family Girls in Math at Yale; a reference is "2024 Girls in Math at Yale Individual, Problem 5"; links come from `gimPdf` in `js/app.js` and were checked against the downloaded file names. The browser checks pass, and the 2019, 2022 and 2024 pages were checked in both themes at 1280 and 375 px.

## Lehigh University High School Math Contest

### Sources and rating rule (recorded 2026-11-13)

Lehigh's mathematics department posts the contest for 1999 to 2026 (no contest in 2023) at `www.lehigh.edu/~dmd1/oldcontests.html`: one file a year, usually the exam with its solutions (2015, 2000 and 1999 have them separately; 2000's and 1999's exams are web pages). It is a two-hour individual test without calculators: 40 questions up to 2021, 30 in 2022 and 2024, 25 in 2025 and 2026. Family Lehigh; a reference is "2025 Lehigh Math Contest, Problem 7"; links come from `LEHIGH_FILES` and `lehighPdf` in `js/app.js`. Most years are annotated with how many students solved each problem, either the whole field (2021: 137; 2022: 114; 2024: 75; 2025: 106; 2026: 116, given as top 23 plus the other 93) or only the top students (2020: the top 82). Each rating is set from that count by 1500 + 300 ln((N - s + 1/2)/(s + 1/2)), with N students and s solvers, rounded to 10 and kept between 500 and 2900; for counts over the top students only, the intercept is 1700 and the floor 600, since those students are stronger than the field. With these constants the first problem lands near an early AMC 10 problem and the last near an early AIME one. Years without counts get author estimates. Where a count was missing in the file (2024 #7, #14, #24), the rating is an estimate.

### Filing (2026-11-13, done)

All years, 1999 to 2026 (no 2023), are filed: 1,020 problems. 1999, 2000, 2003, 2004, 2005 and 2007 have no counts and carry author estimates. 2001 (159 students), 2002 (181) and 2006 (187) count the whole field. 2019, 2006 and 2001 to 2003 are scans or garbled text and were read from page images, and 1999 and 2000 are web pages whose formulas are images, read from screenshots; 2002's solutions are headed "2001", a typo, since its problems mention 2002; 2019 counts the top 54 (1700 intercept), 2006 the whole field of 187 (the top 36 and 151 others). In 2010, 2011 and 2013 to 2018 the counts cover only the top scorers (54, 46, 72, 49, 49, 54, 55 and 56), so those years use the 1700 intercept; 2008 (257), 2009 (209) and 2012 (360) count the whole field. Where a count was missing from a file but present in its solutions (2008 #15, #16, #21, #32), it was read from there. Problems were read from the exam and its solutions. Three cite no card: 2020 #1 (one fraction) and 2024 #12 (two linear inequalities), whose routes use no card, and 2024 #2 cites only the estimating card. The 2026 problems were read from the "[n pts]" tags, because the exam's header is itself numbered. With the new filings Ptolemy's theorem outgrew the "mid-sized card" case of `tools/check-contest-profile.cjs` (8 to 29 problems); that case now uses Stewart's theorem, and the check passes.

## Utah State Math Contest

### Sources and filing (2026-11-13, in progress)

Weber State University posts the Utah State Math Contest's Junior and Senior exams with their solutions for 2006 to 2020 at `weber.edu/statemathcontest/exams.html`; each is 40 multiple-choice questions (30 or 32 in a few years). Three of the listed links are dead (they redirect to an error page), but every year and level has a working exam and solutions file; `UTAH_FILES` in `js/app.js` lists only the files that downloaded as PDFs. Family Utah State Math Contest, two papers a year ("2010 Utah State Math Contest Senior, Problem 28"). Many Senior problems repeat Junior ones; those pairs were found by text matching (a check reruns the matcher against each spec) and copy the Junior problem's cards, nodes and rating. Calculus questions (limits, continuity, derivatives) are left out at the owner's word (2026-11-13), so a Senior paper may list fewer than 40 problems: 2009 #36 and #39, 2010 #30, the 2014 Psi question 2017 Senior #11 (related rates) and #36 (shortest distance to a parabola), 2018 Senior #39 (an antiderivative), 2019 Senior #2, #7, #10, #13 and #20 (a derivative, related rates, a cycloid's area, minimizing a can's surface, a shrinking ball's rate) and 2020 Senior #26, #30 and #33 (a differential equation, the mean value theorem, arc length). Ratings are author estimates. All years from 2006 to 2020 are filed, 1,055 problems (2026-11-14); 2006 to 2008, 2012, 2013 and 2014 have 30 questions a paper. 2006 to 2008 and 2013 are scans, read from page images, with every answer worked and the doubtful ones checked against the official solutions; further calculus left out there: 2006 Senior #28 (a limit of an integral), 2007 Senior #16 (a limit) and #29 (an integral), 2008 Junior #25 / Senior #20 (the area under sin x), Senior #26 (a volume by integration), #28 (a power series) and #29 (differentiability), and 2013 Senior #21 (a derivative argument). Source slips noted in the reasons: 2013 Junior #5 / Senior #4's magic square is determined only with its diagonals; 2013 Senior #3's official answer (1000) counts a leading zero, the count being 900; 2008 Junior #20 / Senior #16's official 85 percent averages two possible coin purses as if equally likely. 2006 Senior #21's determinant (-240, so "none of these") and #14's cryptarithm were checked by computation. Six earlier set-diagram questions were refiled from Extremal subsets and set families to Two and three sets; Venn diagrams. 2014 is a themed exam; its shared Junior and Senior problems open with identical long introductions, so the twin matcher was overruled by comparing each pair's actual question, and the Psi-function question (a logarithmic derivative) is left out on both papers. In 2015 the Junior paper's Problem 2 ends with "1, 3, 7, and 9.", which the reader took for Problem 9; the real Problem 9 (a distance read off a graph) was found in the text. In 2017 the matcher missed three exact repeats (Senior 20, 32 and 37 are Junior 15, 25 and 38), added by hand; Junior 38 is a cube-root identity whose formula is set as graphics, read from the solutions. In 2019 the Senior paper's "less than 40." in Problem 26 was read as Problem 40; the real Problem 40 was found in the solutions.

## MATHCOUNTS (Step H, 2026-11-14)

The MATHCOUNTS Foundation posts only the latest year's Chapter and State competitions free (`mathcounts.org/pastcompetition`: Sprint, Target, Team and Countdown rounds, answer keys and solutions), replacing them each year; other years and the National competition are sold, and the Internet Archive was not reachable from the cloud session. The 2026 Chapter and State Sprint (30 questions) and Target (8) rounds are filed, 76 problems: "2026 MATHCOUNTS Chapter Sprint, Problem 4", families MATHCOUNTS Chapter and MATHCOUNTS State (MATHCOUNTS National reserved), the round in the paper toggle. Team and Countdown rounds are left out, as for other contests. The text was read from the official PDFs; every answer was compared with the official key, and the counting answers (Chapter Sprint #27 and #29, Target #5 and #8; State Sprint #14, #17, #22, #26 and #30, Target #4 and #5) were recomputed by brute force. Ratings are author estimates, Chapter from 200 to 1300 and State from 300 to 1600. The links (`MC_FILES` in `js/app.js`) name the 2026 files and will break when the foundation replaces them; the archive page link stays.

## MBMT, the Montgomery Blair Math Tournament (Step H, 2026-11-14)

The official archive (`mbmt.mbhs.edu/archive`) has two divisions a year, renamed each year, each with Algebra, Geometry, Counting and Number Theory rounds of 8 questions, for 2015 to 2019 and 2022 to 2026 (no individual rounds in 2020 or 2021): 640 problems, all filed. The page says the harder division is listed second; that holds except in 2015, where the Fermat rounds (listed second) contain Euler's easier problems verbatim and are therefore the Lower division (`MBMT_DIVS` maps each year's [Lower, Upper] names). Each Upper division repeats 20 or more Lower problems, matched by reading and copying the Lower filing. Solutions: 2015 has none posted, and the 2023 Lower (Bernoulli) Counting solutions PDF is damaged at the source; those answers were worked by hand, the counting and number-theory ones checked by computation (2015 NT 7 is 6/37 and NT 8 is 196). Statements whose text extraction lost exponents were read from the solutions (2026 NT 7 is about 20^26). Ratings are author estimates, the Lower division from 100 to about 1300 and the Upper to about 1700. Team, Guts and Fun rounds are left out. The problem pages' solution fallback was corrected at the same time: an archive contest without posted solutions now shows no solution link instead of its archive labelled as AoPS.

## Calgary Junior Mathematics Contest (Step H, 2026-11-14)

The University of Calgary posts the English papers and solutions of its Junior High School Mathematics Contest for 2004 to 2025 (no 2020) on its archive page; French versions and results are left aside. Each paper has Part A, 9 short-answer questions, and Part B, written solutions marked for completeness; only Part A is filed, as UMD's proof-based Part II was left out: 189 problems, "2025 Calgary Junior Math Contest, Problem 3" being A3. Statements and answers were read from the PDFs' text and the official solutions; the reasons give the route, and the arithmetic in them was checked (2025 A9 leaves DEF 6/25 of ABC, so 75; 2008 A9's perimeter is (2 + sqrt 2)^2 = 6 + 4 sqrt 2; 2004 A9's shorter diagonal is 2 sqrt 10). Ratings are author estimates from 100 to 1100, an easy AMC 8 problem to an early AMC 10 one. One tag was withdrawn while filing: 2007 A4, a game analysed backward from the end, does not use Strategy Stealing.

## Columbus State Invitational Mathematics Tournament (Step H, 2026-11-14)

Columbus State University posts the Individual test of its invitational tournament (50 multiple-choice questions in increasing difficulty; 54 in 2006, 30 in 2021 and 2022) with solutions for 2004 to 2022 on its tournament page; the ciphering rounds are left aside. 863 problems were filed for 2004 to 2022, then 2003 and 2002 (scans, with solutions) 2001, 1997, 1994 and 1993 (scans), 2000, 1999 and 1998 (no solutions for any of the seven, every answer computed here; 2000 #27 balances only if just the four gifts are wrapped, giving 19.95; 1998 #32's digit string could also end 6, 8, 5, 1, 7, but only 4 is offered; 1994 #41 is left out because its figure gives only BC = 150, and the angle that would match an answer, about 56.9 degrees, is no natural reading; 1993 #37, naming Euler, is history rather than mathematics and is left out) the same day, 1,310 in all, every year the department posts (1995 and 1996 are not posted), "2009 Columbus State Tournament, Problem 26" being question 26 of that year. Statements were read from the PDFs' text where it is clean and from rendered pages where it is not (the split misnumbers 2005 to 2009 and 2015, and 2022 is three scans read page by page); answers were taken from the official solutions where the reasons depend on them and otherwise computed, and every number in the reasons was checked by computation. A few results worth noting: 2009 #50 is A = 20 from 2 sin(A/2)(1 + 2 cos A) = 1; 2009 #42's altitudes 210, 195, 182 make a 13-14-15 triangle with area 22181.25; 2006 #34 counts 26 routes (the official solution); 2006 #39's stacking order is B, F, C, G, E, A, D, H; 2022 #18 means the conditional probability, 1/2 once the rays meet (they meet with probability 1/4), and 2022 #11 is 221. Questions that need calculus are left out (limits, derivatives, integrals, Riemann sums, a differential equation, and 2022 #25, which needs the arctan series; 2004 #49 and 2008 #48, tangent lines found by a double root, and 2005 #35, a supremum found by rationalizing, stay), as are three physics questions (2011 #49 and #50, 2022 #30). Ratings are author estimates from 200 to 1300, an easy AMC 10 question to a mid AIME one, the reason naming the test's length. Tags withdrawn or corrected while filing: Power of a Point on 2020 #14, the Roots of Unity Filter on 2017 #27 and 2010 #49, Simon's Favourite Factoring on 2009 #34 (it is a = 7b), and a wrong step in 2021 #2's reason before filing; the 2008 batch was first committed without its problems (a node id failed and a pipe hid the exit status) and was added in the next commit.

## CEMC Fermat Contest (Step H, 2026-11-14)

The Centre for Education in Mathematics and Computing (University of Waterloo) posts the Fermat Contest (Grade 11) and its solutions for 1998 to 2025 at standard addresses; 699 problems are filed, "2024 Fermat Contest, Problem 16" being question 16 of that year. Statements were read from the PDFs' text, with figures and garbled symbols checked against the official solutions; every answer was compared with the official answer, and the numbers in the reasons were checked by computation (for example 2018 #25 counts 4043 quadruples, 2016 #24 sums to 999999000, 2003 #25 has 7 values from (2a - b)(2a + b) = 6336, and 2002 #25 allows sixth edges 31 to 33 and 57 to 59). 2005 #25 is left out: the CEMC's own solutions say the question had a problem discovered after the contest. 2018 #15 and 2024 #16 are the same grid puzzle, filed under both years. No question needs calculus (2020 #25, a probability on the unit cube, is done with two pyramids). Ratings are author estimates from 100 to 1300, an easy AMC 8 question to a mid AIME one. Tags withdrawn while filing, before adding: Simon's Favourite Factoring on 2024 #22, the Binomial Theorem on 2024 #25, the number-of-divisors card on 2025 #11 and 2021 #25, the reflection principle and sum-of-two-squares cards on 2007 #22 and #25, and a parity card on 2023 #16; reasons with a wrong count (2023 #20, 2016 #24, 2008 #22) were corrected against computation before filing.

## CEMC Cayley Contest (Step H, 2026-11-14)

The Cayley Contest (Grade 10) comes from the same CEMC archive as Fermat, at the same kind of address; 700 problems are filed, every question of 1998 to 2025, "2003 Cayley Contest, Problem 25" being question 25 of that year. As with Fermat, statements were read from the PDFs' text and checked against the official solutions where symbols or figures were garbled, every answer was compared with the official one, and the numbers in the reasons were checked by computation (for example 2004 #25 has x = 44, 50 and 60, 2003 #24 counts 72 quadruples, 2002 #24 gives 3114 pi, 2001 #24 counts 36 palindrome pairs and 1998 #25 packs 11443 circles in 115 rows). Many Cayley questions repeat a Fermat question of the same year (PLAN item 16 lists them); these keep the Fermat filing so the two copies agree. Nothing is left out, and no question needs calculus (2015 #25 finds its maximum by completing the square). Ratings are author estimates from 100 to 1200, a little below Fermat. Reasons corrected against the official solutions before filing: 2004 #11, #12, #19 and #24 (#24's area is sqrt 15 x^2, not 15x^2) and 2004 #22. While filing, a check of the coordinate node Distance from a point to a line found 36 problems wrongly filed there; the refiling follows.

## CEMC Pascal Contest (Step H, 2026-11-14)

The Pascal Contest (Grade 9) completes the three CEMC senior-division contests: 700 problems, every question of 1998 to 2025, "2010 Pascal Contest, Problem 23" being question 23 of that year. Every paper and solution answers at the standard address except the 2024 solutions, which the CEMC keeps in its 2026 folder; `fermatPdf` links that one file there (checked in a browser). Statements were read from the PDFs' text and checked against the official solutions wherever symbols or figures were garbled (for example 2008 #10 puts P at -14, 2004 #24 asks about 3/7, and 2000 #10 runs from -sqrt 8); every answer was compared with the official one, and the numbers in the reasons were checked by computation (2023 #25 counts 3 066 364 lists, 2021 #24 gives 83, 2010 #23 needs the run 8975 to 8979, 2007 #24 finds 1832 and 2190 around 2007, 2005 #24 counts 42 perfect powers up to 1042). Many Pascal questions repeat a Cayley or Fermat question of the same year, and one repeats within Pascal (2017 #12 and 2025 #10); PLAN item 17 lists them, and each keeps the earlier filing. Nothing is left out and no question needs calculus. Ratings are author estimates from 100 to 900, an easy AMC 8 question to a mid AMC 10 one. Tags withdrawn before filing because the route does not use them include stars and bars (2023 #25), Last Digits of Squares and Cubes mod 9 (2022 #22, replaced by Finding the Period, and 2005 #18), the GCD-LCM product (2021 #18, 2020 #25, 2014 #25), the shoelace formula (2015 #21), the Fibonacci and period cards (2004 #19, #20) and the triple parametrization (2025 #13).

## UKMT Senior Mathematical Challenge (Step H, 2026-11-14)

The UKMT posts the Senior Mathematical Challenge paper and its solutions free for 2013 and 2015 to 2026; 2014 is listed without a file and older papers are sold, so they are not linked. The files sit in upload-month folders with irregular names, so `UKMT_SMC_FILES` lists all 26 (each downloaded and checked; 2013 has only the extended solutions). 325 problems are filed, "2025 UKMT SMC, Problem 3" being question 3 of that year. Statements and answers come from the official files: most years print the answers beside short solutions; 2013 and 2019 have an answer grid; the 2018 paper and short solutions use a scrambled font encoding, so 2018 was read from the extended solutions; and 2026 changed format, with integer answers for #23 to #25 (129, 140, 528). Reasons were checked against the official solutions and by computation where possible (for example 2025 #18's 405-cycle ending, 2023 #25's area 1/4, 2022 #25's volume (16/3) sqrt 23, 2016 #23's cube of side 14, 2016 #25's units digit 6). Nothing is left out: no question needs calculus, and the trigonometric graph questions (2023 #22, 2019 #19, 2026 #20) and the trigonometric area questions are kept. Ratings are author estimates from 100 to 1000, an easy AMC 10 question to an early AIME one. Tags withdrawn before filing because the route does not use them include completing the square (2020 #22), AM-GM (2017 #18, which uses only the definitions), working backwards (2017 #17), the GCD-LCM product (2021 #10), denesting (2019 #24), graph colouring (2026 #21) and an average-speed card that does not exist.

## UKMT Intermediate Mathematical Challenge (Step H, 2026-11-14)

The UKMT posts the Intermediate Mathematical Challenge paper and solutions free for 2015 to 2026 (2014 is listed without a file). An IMC is sat in late January or early February and is named by that year. `UKMT_IMC_FILES` lists the 24 files (each downloaded and checked), and `ukmtPdf` serves both challenges. 300 problems are filed, "2026 UKMT IMC, Problem 3" being question 3 of that year. Every year prints its answers beside short solutions, and the reasons were checked against them and by computation (for example 2026 #25's 21 of 35 day sets, 2023 #23's 36 + 72 = 108, 2019 #23's n = 3 and 4 with n = 9 failing the triangle inequality, 2019 #24's N = 17, 2018 #20's twelve-digit multiple of 72, 2015 #23's 112th place). Where the extracted text garbled a question, the official solution settled it: 2017 #24's factors are square roots, so the product telescopes to sqrt((n + 2)/2), and 2018 #25's distance is sqrt 3. Nothing is left out and no question needs calculus. Ratings are author estimates from 100 to 700, an easy AMC 8 question to a late AMC 10 one. Reasons corrected after filing: 2019 #4 (the list of times) and 2017 #13 (RS = 20/3 and PS = 25/3).

### Refiling: distance from a point to a line (2026-11-14)

A check of the 57 problems filed at `geo.coord.line.point` (Distance from a point to a line) found 36 whose route never measures a distance from a point to a line: fourth vertices of rectangles and parallelograms, midpoints and points dividing a segment, intercepts and points on a line, lattice points on a segment. Most were from the CEMC Fermat and Cayley filings; the rest from Columbus State, Utah State, Lehigh, UMD, Duke, Math Prize for Girls and SMT. They now sit at Distance and midpoint (`geo.coord.line.dist`), Slopes, intercepts and equations of lines (`geo.coord.line.slope`), Lattice points and Pick's theorem (`geo.coord.area.pick`), Rectangles and squares, Parallelograms and rhombi, Medians and the centroid, or The incircle (the two SMT incenter-coordinate problems). The two parallelogram fourth-vertex problems (1998 Fermat #3, 2011 Cayley #15) now cite Parallelogram Vertices Using Vectors. The 21 left at the node do use a point-to-line or line-to-line distance (or, for 2022 Math Prize for Girls #19, a pole and polar line).

### Retagging: the Pythagorean triple parametrization (2026-11-14)

The card Pythagorean Triple Parametrization is the formula (m^2 - n^2, 2mn, m^2 + n^2). Seven problems cited it while their routes only recognise or use a familiar right triangle (3-4-5, 5-12-13, 7-24-25), or the converse of the Pythagorean theorem: 2020 Columbus State #30, 2002 #9 and 2001 #30, 2012 Fermat #22, 2000 Fermat #17, 2019 Cayley #17 and 2000 Cayley #16. They now cite the Pythagorean Theorem. The parametrization stays on 2014 Columbus State #47 (generating the triples), 2003 Columbus State #50 (every triple gives a rational point) and 2005 Cayley #25 (scaled triples).

## CHMMC and the Caltech Math Meet (Step H, 2026-11-15)

Added at the owner's request with the official Individual rounds and solutions from `caltechmathmeet.org/problems`. Answers were checked by computation where practical (2026 #3, #4, #5, #7, #9; 2025 #1, #2, #3, #5; 2024 #1, #10, #15; 2022 #5, #8, #9, #10, #12, #15; 2021 #2, #3, #6, #12, #14). Findings:

- **2021 #14, official answer wrong.** The solution lists 93 among the primes 1 mod 4 (93 = 3 x 31) and leaves out 43 and 47, which divide 2021 and so make (2m + 1)^2 + 2021^2 divisible for 2m + 1 a multiple of them. A direct count gives 17 g-friendly odd n below 100 (1, the eleven primes 1 mod 4, 43, 47, 25, 65, 85); the reason records 17 and the error.
- **2025 #10:** the archive's solution says the answer is 6 and that 7 was accepted at the contest; filed with 6.
- **2025 #3:** the solution's last line ("floor(n + sqrt(n + 1)) at most 2025 exactly for n at most 1980") is loose (n = 1981 also satisfies that inequality), but a direct check of the original condition over all integer parts confirms 1980.
- **2012 Fall #6, official answer wrong.** The product of all pairwise distances of n equally spaced points on the unit circle is n^(n/2) (checked numerically for n = 2 to 9), rational for every even n and for the odd squares: 1027 values of n from 2 to 2013. The official 21 counts only the odd squares.
- **2013 #13 and #15:** the posted solution sheet answers different questions (a set of reciprocals; digits summing to n/57). The paper's questions were solved and checked: the continued fraction gives y = (27 + 21 sqrt 5)/82, sum 135; 133^5 + 110^5 + 84^5 + 27^5 = 144^5.
- **2014 #3:** the solution's shortcut formula ties group sizes 19 and 38, but counting blocked groups too (the opponent kept below 2/3) gives 696 votes at size 19, the official answer.
- **2012 Fall #7** (when a series converges) is left out as calculus. **2010 Fall #4 and #5** are 2013 #7 and #9 again and share their filings.
- **More checks by computation:** 2020 #2, #3, #5, #9, #11; 2019 #2, #6, #12; 2018 #2, #7, #9, #12; 2017 #2, #9, #10, #11, #15; 2016 #6, #15; 2015 #8; 2014 #6, #12, #14, #15; 2013 #2, #13, #15; 2012 Fall #6, #11, #15; 2012 Spring #1, #2, #8, #9, #12, #15; 2010 Fall #1, #3, #6, #7, #8, #10, #12, #13; 2010 Winter #13.
- **Reading:** `pdftotext -layout` drops pieces of formulas (2021 #3's last term read as "1"; 2021 #12's square root vanished); every paper is now read with `-raw`.

## UKMT Junior Mathematical Challenge (Step H, 2026-11-14 to 2026-11-15)

The same links and credits as the SMC and IMC. Questions shared with the IMC of the same year were looked for by text overlap; none of the high-overlap pairs is the same question. 2023 to 2026 filed; the rest follows.

## Show more contests and the contest order (owner, 2026-11-15)

**The glitch.** Every "Show N more contests" button redrew the whole page (`render()`), then scrolled back. Measured in headless Chromium at 1280 and 375 px: on Practice, a topic typed into Practice a topic was cleared by pressing Show more in the random picker or the Contests list, and the page moved by 100 to 400 px (the Contests list at both widths, the random picker and the browse chips on a phone). Now every list renders all its contests, the extra ones marked `data-fam-extra="<list>"` and `hidden` while folded (a CSS rule makes the attribute win over the chips' display); the button flips them and its own label in place. Re-measured: typed input stays, and the scroll stays within a few pixels; on folding the page keeps the pressed button where it was, as far as the page's end allows. A chosen contest stays chosen when its chip is folded away (main's rule that folding changes only visibility). The checks that counted chips or rows now count visible ones.

**The order.** `FAM_ORDER` is by prestige (owner): AMC 8, 10, 12, AIME, HMMT February and November, PUMaC A and B, CMIMC, SMT, BMT, ARML and ARML Local, Math Prize for Girls, CHMMC, Duke, MATHCOUNTS Chapter, State, National, UKMT JMC, IMC, SMC, Pascal, Cayley, Fermat, MMATHS, Girls in Math at Yale, UMD HSMC, Lehigh, MBMT Lower and Upper, Columbus State, Utah State, Calgary Junior. `famSeries` groups the CEMC and UKMT contests like the AMC, HMMT, PUMaC, ARML, MATHCOUNTS and MBMT series.

**Practice a card search.** Before, a card was offered only if its name contained the typed text. Now names come first (those starting with it first), then `searchFormulas(query, { only: cards with practice problems })`, the reference search with its typo repair, synonyms, keywords and semantic channel. Spot checks: "pythagoren", "angel bisector", "stars and bar", "chiken nugget", "ways to choose", "inclusion exlusion", "law of cosine", "shoelase" each put the intended card first.

**Keyboard.** With folded chips hidden rather than removed, the arrow keys in a radio group (the random picker's contests) stepped onto hidden choices; `js/accessibility.js` now treats a hidden choice like a disabled one. `check-accessibility.cjs` passes again (36 scenarios).

## Generate a mock: questions in the format's answer style (owner, 2026-11-15)

A problem counts as multiple choice when its official key is a letter, or, without a key, when its contest's papers are five-option multiple choice (`MC_FAMS`: AMC 8, 10, 12, the three UKMT challenges, Pascal, Cayley, Fermat, UMD HSMC Part I, Columbus State, Utah State; Utah's instructions say so, the others were read when they were filed). Exact-value extras and AIME keys are short answer. With the box ticked, the AMC formats draw only multiple-choice questions and the AIME only short-answer ones (15,490 eligible questions become 9,521 and 5,969 at the time of writing). Paper-only multiple-choice questions (UKMT, CEMC and the others linked to their papers) are still answered by typing the paper's answer and checked against the official solution, as before. Checked in light and dark: the box shows only for Generate a mock, its label follows the format, the source chips narrow, a generated set opens; `tests/mock-contests.cjs`, `check-accessibility.cjs`, `check-practice-actions.cjs` and `check-contest-page.cjs` pass.


## Owner review of tiers, importance, methods and difficulty (2026-11-20)

At the owner's request ("prune the app and add to it now that we have seen how the thing holds up in practice"), with 19,515 problems filed. Only clear outliers were changed; a card one importance level from its usage rank was left alone as a judgement call.

**Missing methods.** 134 problems cited proof-method cards (`proof-by-construction` 57, `induction` 53, `pigeonhole-argument` 27, `strong-induction` 7, `proof-by-contradiction` 4) as stand-ins, nearly all HMMT, PUMaC, Duke, UMD and CMIMC problems. Their official statements were read: the contest routes are two moves no card held. New methods `bound-and-construct` (the largest or smallest possible value: a bound plus an example meeting it) and `small-cases-pattern` (work out small $n$, find the rule, confirm it from the recursion), P77 and P78. 84 problems were retagged one by one (60 HMMT, 24 others); a few had a wrong card, e.g. 2011 HMMT February A&C #5 ($a\star b=ab+a+b$) is `defined-operation` + `sfft`, 2018 HMMT February C6 is `backward-induction`, 1986 AJHSME #22 is `contrapositive`, 1999 UMD #20 is `injectivity-surjectivity`. Three HMMT problems keep pigeonhole, which they do use. Later the same day CMIMC's 7 were read from the cached official papers and BMT's 4 from its archive, and retagged (95 in all): CMIMC 2017 Computer Science #4 counts transitive tournaments (`round-robin-tournaments`, `permutations-combinations`), the rest are bound-and-construct or small cases. **Pending:** PUMaC's 34; its archive returned 503 to every request and its certificate fails through this container's proxy.

**CMIMC links repaired.** Every `cmimc.math.cmu.edu/archive/...` URL now returns 404, the archive index included. The same papers and solutions are in the source repository of CMIMC's own site (`howard36/cmimc-official`, `public/assets/docs/past-tests/`, last updated July 2022, so it covers exactly the filed 2016 to 2022); at the owner's word the links now open them in GitHub's PDF viewer. All 33 papers and their 33 solution files behind the 306 problems were checked against the repository's file list.

**Tiers (CONVENTIONS, Tiers).** A tier is where a card is first needed. Evidence counted only the main route of AMC 8/10/12, AHSME (the AMC 12) and AJHSME (the AMC 8) problems, and AIME 1 to 10 against 11 to 15; alternative routes (`trickFormulas`) and the invitational contests do not count. 103 cards moved down to where they are first needed:

- AIME Early → AMC (50): `arctan-telescoping`, `box-tetrahedron`, `burnsides-lemma`, `catalan-numbers`, `complex-bash`, `concyclicity-tests`, `cone-insphere`, `cross-section-method`, `crt-solution-counting`, `descartes-rule-signs`, `determinant-geometric`, `dihedral-angle`, `double-counting`, `double-summation`, `function-symmetry-equation`, `homothety-monge`, `incenter-excenter-lemma`, `inverse-trig-identities`, `lagrange-interpolation`, `lattice-points-circle`, `lcm-pair-counting`, `menelaus-theorem`, `modular-inverse`, `nested-subset-pairs`, `newtons-sums`, `orthocenter-properties`, `p-adic-valuation`, `parking-functions`, `perp-to-angle-bisector`, `pitots-theorem`, `polya-urn`, `polynomial-crt`, `rearrangement`, `reflection-composition`, `reflection-principle`, `root-transformations`, `rotated-line-angle`, `rotation-reflection-matrices`, `rotation-trick`, `square-crossing-segments`, `squeeze-between-squares`, `steiner-neighborhood`, `strategy-stealing`, `subtract-and-factor`, `surjections`, `trig-substitution`, `triple-angle`, `unfold-the-bounces`, `vector-bash`, `vector-dot-product`
- AIME Late → AIME Early (2): `barycentric-coordinates`, `conic-perpendicular-radii`
- AIME Late → AMC (35): `affine-transformations`, `arbelos`, `archimedes-broken-chord`, `brahmagupta-fibonacci`, `cauchy-functional-equations`, `closing-polygon-vectors`, `conic-classification`, `corner-circle-chain`, `cramers-rule`, `determinant-basics`, `equiangular-hexagon-area`, `exradii`, `generalized-binomial-series`, `graph-coloring`, `hensel-lifting`, `insphere-radius`, `linear-change-of-variables`, `lucas-theorem`, `median-triangle-area`, `monovariant`, `multiplicative-order`, `orthic-triangle`, `pell-equation`, `pisano-periods`, `plane-intercept-form`, `point-plane-distance`, `power-minus-self`, `projection-formula`, `ptolemy-equilateral`, `reciprocal-power-sums`, `rouths-theorem`, `skew-lines-distance`, `trig-telescoping-product`, `useful-factorizations`, `vector-projection`
- Olympiad → AIME Early (2): `cross-ratio`, `shooting-lemma`
- Olympiad → AIME Late (5): `carnots-perpendicularity-theorem`, `inversion-properties`, `minkowski-inequality`, `power-of-a-point-linearity`, `steiner-ratio-theorem`
- Olympiad → AMC (9): `contrapositive`, `cyclotomic-polynomials`, `farey-sequences`, `hook-length-formula`, `leibniz-formula`, `proof-by-construction`, `smoothing-method`, `sprague-grundy`, `wlog-symmetry`

`derivative-extremum` was not moved: its only AMC citation (2025 AMC 10A #9) used a derivative, against the owner's no-calculus rule, and was rewritten with one sample value ($100(-\tfrac18+\tfrac12)=37.5\gt25$) instead. The card itself is calculus and is left for the owner to keep or retire; four other problems (CMIMC, Math Prize for Girls) cite it.

**Importance (judged within the subsection).** Each subsection was ranked by usage, AMC/AIME problems counted fully and other contests at a quarter. Changed: cards two or more levels below their rank with at least five AMC/AIME uses; the Lowest cards that now have tagged problems, which CONVENTIONS forbids; and Medium cards no problem uses, moved one level to Low. The proof-method subject was left alone. Shown as (all problems/AMC and AIME):

- low → high: `regular-tetrahedron` (24/5), `inscribed-square` (20/9), `percent-change` (188/111), `mean-median-mode` (110/69), `joined-shapes-perimeter` (15/14), `vector-bash` (14/11), `painted-cubes` (20/10), `defined-operation` (86/59), `palindromes` (35/18), `truth-tellers-logic` (54/28), `counting-shapes` (18/13)
- lower → high: `steiner-neighborhood` (9/8), `lattice-points-circle` (7/5), `farey-sequences` (13/5), `placing-digits-extremes` (25/18), `reading-graphs` (52/49)
- lower → medium: `parallel-lines-distance` (7/5), `only-even-prime` (30/11), `round-up-whole-items` (16/13), `scoring-rules` (13/8), `magic-squares` (29/7)
- lowest → lower: `arbelos` (1/1), `poncelet-closure` (1/0), `mobius-transformations` (6/0), `resultant-discriminant` (14/0), `cardano-cubic` (5/0), `eigenvalues-characteristic` (1/0), `dirichlet-convolution` (5/0), `dirichlet-primes-progression` (3/0), `carmichael-numbers` (1/0), `floor-sum-reciprocity` (2/0), `stirling-first-kind` (2/0), `probability-generating-functions` (4/0)
- medium → low: `incenter-area-split` (0/0), `perpendicularity-lemma` (0/0), `contact-triangle` (0/0), `euler-line-parallel-side` (0/0), `fundamental-theorem-symmetric` (0/0), `squared-binomial-sum` (0/0), `expected-fixed-points` (0/0), `planar-graph-bound` (0/0), `konigs-theorem` (0/0), `scale-one-level` (0/0), `shared-leg-pythagoras` (0/0), `ravi-substitution` (0/0), `equal-edge-tetrahedron` (0/0)

The newly High formula cards whose subsection has a section in its Core list joined it (`regular-tetrahedron`, `inscribed-square`, `percent-change`, `mean-median-mode`, `lattice-points-circle`).

**Difficulty inflation.** Median rating by fifth of the paper, papers from 2015 (HMMT from official solve counts):

| Contest | 1st | 2nd | 3rd | 4th | 5th |
|---|---|---|---|---|---|
| HMMT February | 1635 | 2100 | 2490 | 3125 | 3770 |
| HMMT November | 1150 | 1435 | 1755 | 1990 | 2375 |
| PUMaC A, before → after | 2250 → 1650 | 2850 → 2050 | 3250 → 2450 | 3550 → 2900 | 3850 → 3450 |
| PUMaC B, before → after | 1600 → 1300 | 2300 → 1680 | 2700 → 1950 | 3150 → 2350 | 3500 → 2820 |
| BMT, before → after | 1275 → 1250 | 1900 → 1650 | 2475 → 2005 | 2900 → 2450 | 3500 → 3100 |

PUMaC sat above HMMT February at every position and BMT level with it. Each was mapped by one increasing scale (Codex's order kept; PUMaC problems shared by both divisions stay equal), and each reason says so. The other contests sit sensibly against LIVE's AMC/AIME anchors. Separately, 415 estimates pinned at a floor of 100 now run from 10 to 90.

## Proof Methods kept olympiad-only (2026-11-21)

Owner: Proof Methods is for olympiad proof techniques; the cards the 2026-11-20 review moved to the AMC tier stay there as proof cards, and their AMC uses get a card in a regular section.

- Back to Olympiad tier and level: `contrapositive`, `disproof-by-counterexample`, `wlog-symmetry`, `proof-by-construction`, `proof-by-cases` (the five Proof Methods cards at AMC). Their Contest profiles now point to the AMC card. `contrapositive` and `wlog-symmetry` gained proof exercises (they had too few practice problems once their AMC problems moved).
- New AMC methods in Counting & Probability, group Reading Statements: `if-then-statements` (P79; the 30 problems that cited `contrapositive`) and `settle-with-an-example` (P80; 14 from `disproof-by-counterexample`, 2 from `proof-by-construction`). Testing the Answer in Checking Your Work now holds `settle-with-an-example`.
- `wlog-symmetry`'s 16 AMC and SMT uses went to the existing Symmetry Arguments (`symmetry-probability`), broadened to counting, fixing one choice, equal unknowns and ordering symmetric variables, rather than a second symmetry card.
- PUMaC problems citing these cards (7 counterexample, 2 construction, 1 WLOG) wait with PUMaC's other proof-tagged problems for its archive (certificate error from here).

Tag fixes found while importing SMT statements:

- 2023 SMT General #10: `right-triangle-inradius` / `geo.tri.radii.in` → `folded-paper`, `pythagorean-theorem` / `geo.basic.pyth.fold` (reflecting a triangle over the diagonal is a fold; no inradius in the route).
- 2020 SMT General #6: `grid-paths`, `complementary-counting` / `cp.struct.paths.obstacle` → `time-per-leg`, `pythagorean-theorem` / `alg.word.rates.motion` (a timing problem; nothing is counted).

Tag fixes found while importing BMT statements:

- 2016 BMT Geometry #9: `rotation-reflection-matrices` → `law-of-cosines` (squares on the sides of a right triangle: $DG^2=4a^2+b^2$ and $EI^2=a^2+4b^2$ by the law of cosines at $B$ and $A$; no transformation matrices are used).
- 2020 BMT Algebra #9: `determinant-basics`, `matrix-inverse` → `cubes-minus-3abc` (the equation is $x^3+y^3+z^3-3xyz=1$ with $x=a$, $y=\sqrt[3]{3}\,b$, $z=\sqrt[3]{9}\,c$; no matrix is inverted).
- 2024 BMT Discrete #1: added `palindromes` (the route lists three-digit palindromes and tests divisibility by 3), as on 2023 BMT Discrete #1.

Calculus problems added to mixed rounds (owner, 2026-11-21): BMT Analysis 2013 #3, 5, 8, 9, 10; 2014 #5, 9; 2015 #9, 10; 2016 #6, 8, 9; 2017 #3, 8, 9. Each is `formulas: []`, `calculus: true`, no tree, rated by author estimate (manual ratings file) and given a statement from the official paper. The difficulty snapshot was patched by hand (15 lines and the manual count) because re-running `tools/import-live-ratings.py` pulls a newer LIVE snapshot and rewrites about 1,100 unrelated lines.
- 2019 ARML Individual #8: `orthocenter-properties` / `geo.tri.centers.ortho` → `coordinate-bash` / `geo.poly.quad.para` (no orthocenter appears: the midline $PQ\parallel AR$ of a parallelogram, a right angle at $X$, and $IA=IL$ put $I$ on the perpendicular bisector of $AL$ through $Q$; a coordinate set-up is the route).

Gaps filled (owner, 2026-11-21): see CHANGELOG. Ratings are author estimates from each problem's level in its paper. Columbus 2018 #44 and #49 are the same problem printed twice in the paper. Columbus 1994 #41: the printed figure has only BC = 150; the figure looks like a 30-60-90 triangle with the sector centred at A, area about 2568 (choice (d) is 2586), so any answer key would be a guess.

Tag fixes found while importing CMIMC statements (2026-11-21): 2018 Geometry #2 lost `derivative-extremum` (no calculus is used); 2018 Number Theory #8 `cubes-minus-3abc` → `modular-basics`; 2021 Combinatorics and Computer Science Div 1 #1 and Div 2 #3 (choose 5 of 15 balls with exactly two adjacent gaps equal to 1) `expected-value`, `hockey-stick` / `cp.exp.basic` → `stars-and-bars`, `casework-method` / `cp.basic.comb.gaps`.

Tag fix found while importing MMATHS statements (2026-11-21): 2015 Individual #8 and #9 had each other's tags (#8 counts even-sum subsets of the divisors of 700, `bijection-method`, `number-of-divisors`, `cp.basic.comb.subsets`; #9 minimises $\cos 2x+3\cos x$, `double-angle`, `vertex-form`, `alg.ineq.optimize.quad`); swapped. Duke Math Meet (156 problems) needed no tag change.

Tag fixes found while importing UMD HSMC statements (1997 to 2015, 2026-11-21): 1999 Part I #22 (domino cover of a checkerboard with squares removed) `casework-method` / `cp.struct.paths.walks` → `invariants-coloring`, `settle-with-an-example` / `cp.logic.invariant.parity`; 2000 #7 (three pigs losing money at rates) `percent-change` → `work-rates` / `alg.word.rates.work`; 2002 #14 (red chocolate on Friday) `working-backwards` → `symmetry-probability` / `cp.prob.basic.count`; 2010 #16 `squeeze-between-squares` → `functional-substitution` (no squares appear); 2014 #12 (pyramid with all edges 1) `regular-tetrahedron` → `prism-pyramid-volumes`. Noted, not changed: the pizza-area comparisons (1997 #2, 2000 #2, 2010 #2, 2003 #13, 2004 #3) sit under `geo.poly.composite.arcs`, which names arcs, not circle areas; a plain circle-area node would fit better.

Tag fixes found while importing Lehigh statements (2010 to 2026 checked; 2004 to 2009 so far, 2026-11-21): 2004 #31 ($2^8+2^{11}+2^n$ a perfect square) and #32 (the shaded region in a square cut by four lines) had each other's tags, swapped; 2008 #30 (smallest circle containing a semicircle on a unit square) `geometric-probability` / `cp.prob.geom.region` → `pythagorean-theorem`, `circle-basics` / `geo.comb.extreme.maxmin` (no probability is involved). Noted: 2005 #30 (a shortest path winding twice round a cylinder) sits under `geo.solid.round.cone`, the only round-solids node that takes a cylinder.
Lehigh statements complete (1,020 problems, 1999 to 2026): 1999 #10 (six bets of half the money, three won and three lost) `proportion-properties` / `alg.word.ratio.prop` → `percent-change` / `alg.word.ratio.percent` (each bet multiplies the money by 3/2 or 1/2, so the order does not matter). 1999 and 2000 are HTML pages whose figures were taken from the page. No other change in 1999 to 2003 and 2006.

MBMT statements complete (640 problems, 2015 to 2026 without 2020 and 2021; Lower and Upper divisions; all rounds read against their pages). Tag fix: 2022 Lower Counting #4 and Upper Counting #2 (two different positive integers sum to 10: how many products) `nt.div.prime.factor` / no card → `casework-method` / `cp.basic.case.cases`. Noted: MBMT 2024 Lower Geometry #4 and #5 say "below" and "diagram" but the posted PDF carries no figure for them, so their statements have none.

Calgary Junior Part A statements complete (189 problems, 2004 to 2025 without 2020; every paper read against its pages, 31 figures). Tag fixes: 2004 #9 (rhombus with side 10 and area 60, shorter diagonal) `symmetric-polynomial-strategies` → `trapezoid-parallelogram-areas`, `pythagorean-theorem`; 2012 #7 (Danielle's wins from the other three players' wins) and 2021 #6 (a linear equation in $a$ and $b$) lost `permutations-combinations` and `exponent-laws`, which they do not use; 2005 #9 and 2013 #5 (a quadrilateral and a trapezoid circumscribing a circle) `geo.circ.cyclic` → `geo.circ.tangent`. Noted: the 2021 and 2022 papers have the name block on page 1 and 2 respectively, the others on page 2; Calgary 2020 was not held in this form.

Tag fixes found while importing Columbus State statements (2019 to 2022, 2026-11-21): 2019 #10 (reduce $t^8$ with $t^3=t+2$) lost `vietas-general`, which is not used; 2019 #35 (the distance between two edge midpoints of an octahedron) `regular-polygon-area` → `regular-octahedron`. Noted: the posted 2022 paper holds only problems 21 to 30, so problems 1 to 20 have no statements; 2021's file is the booklet with solutions, and the statements leave the solution and the boxed answer out.

Columbus State 2016 #50 (a system with $xyz+z=0$, solved by factoring $z(xy+1)$ and casework) lost `vietas-general`, which it does not use.

Columbus State 2015 tag fixes: #13 (the remainder of $1006^{2015}+1007^{2015}+2016$ modulo $2013$, where $1007\equiv-1006$ and the odd power cancels) lost `fermats-little-theorem`; #4 ($2015^5-2015$ factored as $x(x^2-1)(x^2+1)$) `lte` → `difference-of-squares`. Noted: #43 (the length of a chord from the central angle) sits at `geo.circ.power.chord`, which does not fit; no tree node takes a chord-length formula. #36's statement prints $\overline{AA_2},\overline{AB_2},\overline{AC_2}$ as the segments whose midpoints are $A_2,B_2,C_2$ (presumably $AA_1$, $AB_1$, $AC_1$), and the statement shows it as printed.

Columbus State 2014 #36 ($\sqrt{(n!)^2+13}$ an integer, solved by factoring $k^2-(n!)^2=13$) `wilsons-theorem` → `difference-of-squares`.

Columbus State 2010 #46 (the centre of a unit-diameter ball rolling round the inside of a $1$, $25$, $49$, $25$ trapezoid: the path is a similar trapezoid shrunk by the inradius-type offset) `reflection-coordinates` / `geo.coord.transform.reflect` → no card / `geo.poly.quad.trap` (no reflection is used).

Columbus State 2009: the posted paper is headed "Draft 2" on every page, so its wording may differ from the printed contest; #17 (the last three digits of $3^{98}$) has no answer choices in it. Tag fix: #22 (a polar equation written as a line) `alg.trig.identity.sum` → `geo.coord.line.slope`.

Columbus State 2007 #21 (which third side a triangle with sides $3$ and $10$ can have) `geo.tri.area.base` → `geo.tri.ineq.valid`.

Columbus State 2005 #34 (the $x$-coordinate of the point where a chord of two circles meets the axis) lost `rationalizing`, which the route does not need.

PUMaC 2023 Algebra A #4 prints its equation without "=0" (the paper has `... + 3a^2 has exactly two nonreal solutions`); the statement adds the "=0". PUMaC 2025 Number Theory B #2 reads $\nu_p(2^{2p}-1)$ in the paper.

PUMaC statements (2014 to 2025, 2026-11-21): Division B repeats most of Division A's problems, so the statements are the same text. 2014 Division B Geometry #3 says "as given in figure" but the posted paper carries no figure for it, so its statement has none. The 2015 and 2014 papers print point values in brackets, which are left out. 2023 Algebra A #4 prints its equation without "=0"; the statement adds it.
PUMaC 2013 Geometry A #4 and B #6 say "Look at the diagram" but the posted papers carry no diagram, so those statements have none.
PUMaC 2012 Combinatorics B #1 refers to the point value of each question (printed in brackets before each problem, which the statements leave out), so its statement adds the eight values $3,3,4,4,5,6,7,8$ in a closing sentence.
PUMaC 2011 Number Theory B #2 prints "I communicate in base 10, which interestingly is a perfect square" (base 10 is not a square); the statement keeps it as printed.

## Utah State statements, 2018 to 2020 (2026-11-21)

Statements for 240 problems (Junior and Senior, 2018 to 2020) were read from the PDFs' text layer and checked against page images; 12 figures were cropped with generous margins and passed `edgecheck.py`. Source quirks kept as printed: 2019 Senior #26 (a) reads "412" (4^12 without its exponent), 2020 Senior #24 (choices (b) and (e) both print 17,280), 2018 Junior #22 refers to a drawing the posted paper does not contain. Obvious typos in the papers ("difference colors", "child?s") were corrected. Tags corrected while filing: 2020 Junior #9 (palindromes divide by 11, not a digit-sum problem), Junior #35 and Senior #9 (cereal toys: counting and surjections, not expected value), Senior #7 (helix: cylinder, not a cone), Senior #21 (the box volume is an AM-GM maximum, not a vertex form); 2019 Junior #27 and Senior #30 (complementary counting), Junior #34 (circle area), Senior #33 (Vieta's product of roots); 2018 Junior #23 and Senior #8 (Pythagorean theorem), Senior #16 (no card), Senior #31 (a continued fraction, not a linear equation).

## Figure edge audit (2026-11-21)

Every statement figure was scanned for ink touching an image edge (`edgecheck.py`). The CMIMC, Duke, MBMT, Calgary, Columbus, PUMaC, Utah, UMD, Lehigh, SMT, BMT and ARML figures were clean except three with stray text specks from the line above (CMIMC 2017 Combinatorics #10, Duke 2021 #7, MBMT 2018 Upper Counting #8), trimmed, and Duke 2021 #1, whose dashed laser ray runs past the corner by design. The 269 CEMC figures that touch an edge are tight crops of drawn figures; 102 with the longest touching runs were checked on contact sheets and none clips a label or a stroke.

## BmMT Individual Round (2026-11-21)

All 300 problems of the 15 Individual Round papers were read from the posted PDFs (text layer, with page images for the exponents and fractions the text layer drops: 2015 #4 is $10^{1/x}=x$, 2016 #17 is $20^{16}$ over $16^{20}$, 2017 #10 is $2017^{(2017^2)}$). 2018 #9 reads "three 3 candies" in the paper; it is given as three red candies. The 2012 and 2013 papers are headed Berkeley Math Tournament, Fall 2012 and BmMT 2013 and are filed with BmMT. The ratings run from about 100 (first problems) to 1100 (the last of each paper); no tree node, card or rating was copied from another contest. Questions checked while filing: the answers of 2012 #7 and #10, 2013 #20 and 2014 #11 were not worked out in full, so their routes are described only in general terms.

## Utah State statements 2009 to 2017 and removals (2026-11-22)

- **Read from page images** (the 2009 to 2012 papers are Word exports whose equations have no text layer; 2013 is a scan and was skipped). Every figure was cropped on solid white, with the statement text whitened out and the figure's own labels kept, and edge-checked (`tools/` working copies only; the app shows each on its white plate, which also looks right in dark mode). Doubtful characters were checked against zoomed crops (for example Senior 2011 #40, where the printed choices (b) and (d) are both 128sqrt3/3, kept as printed).
- **Tags corrected while reading:** 2014 Junior 3 and Senior 2 (a Venn diagram, not divisibility rules), 14 and 15 and Junior 16 and Senior 17 (the zeta series is not geometric; the psi-function sum telescopes), Senior 29 (no binomial probability); 2012 Junior 12, 19, Senior 15, 25, 27, 30; 2011 Junior 14, 38, Senior 5, 13, 30; 2010 Junior 5, 6, 15, 26, 32, 34, 39, Senior 9, 16, 17, 37; 2009 Junior 16, 39.
- **Removed at the owner's word:** Columbus State Tournament 1993, 1994 and 1997 to 2001 (350 problems; no solutions are posted before 2002) and Utah State Math Contest 2006 to 2008 (180 problems; poor scans and rough solutions). Ratings, paper links and the credit text were updated; no card or tree node depended on them (all gates and the regression suites pass).

## HMMT archive tag audit (2026-11-26)

Reconciled all 16 batches of the supplied *Problem-tag audit* against the 1,220 HMMT appearances from 1998 through 2026. The source card and topic lists agreed with the current database. Applied direct corrections using existing IDs, with 966 card updates and 150 topic updates across 981 appearances. Synchronized the shared 2011 February entries and five exact duplicate pairs from 1999 and 2001. Checked selected official solutions and written routes, including the tail-sum argument in 2020 February Combinatorics #7 and the floor groups in 2004 February Algebra #4. [2020 solution](https://hmmt-archive.s3.amazonaws.com/tournaments/2020/feb/comb/solutions.pdf) · [2004 solution](https://hmmt-archive.s3.amazonaws.com/tournaments/2004/feb/alg/solutions.pdf)

Conditional suggestions, proposed card extensions, and distinct alternate routes remain in the source audit. For example, the current bounce method covers rectangular grids, which leaves the triangular billiard in 1998 February Geometry #10 outside its scope. The general triangle-area formula in the proposed tags for 2019 February Geometry #4 is covered by the already-tagged area comparisons in the written solution. The 2001 February Geometry #2 key accepts both the central octahedron and the union of bounded regions, as documented in the grading notes. [Grading notes](tools/answer-keys/short-answers.md)

- **1998 February Algebra #6 and #8.** Restore `a ≤ b` and the excluded endpoint `−9/2` from the organizer's printed statements. [Official paper](https://hmmt-archive.s3.amazonaws.com/tournaments/1998/feb/alg/problems.pdf)
- **2001 February Algebra #1 and Advanced Topics #1.** Void both appearances. Factoring the fourth-power difference using the given sum gives `x − y = 4/3`. The given sum and sum of squares also give `(x − y)² = 3`, which is inconsistent with that value. [Official algebra solutions](https://hmmt-archive.s3.amazonaws.com/tournaments/2001/feb/alg/solutions.pdf)
- **2001 February Advanced Topics #3.** Void the coefficient-sum question. The nonconstant factor with constant term 1 cannot divide a monomial. [Official solutions](https://hmmt-archive.s3.amazonaws.com/tournaments/2001/feb/adv/solutions.pdf)
- **2001 February Algebra #9 and Advanced Topics #8.** Grade 9. Equal exponents `x = y` are forced by divisibility and yield `n = 2` and `z = x + 1`. The allowed values of `z` run from 2 through 10. [Official algebra solutions](https://hmmt-archive.s3.amazonaws.com/tournaments/2001/feb/alg/solutions.pdf)
- **2010 February Algebra #7.** Void the question. With `a = b = c = 0`, choosing `x = 0` gives `yz = 67` and `xyz = 0`. Choosing `x = 1` gives `yz = −1942` and `xyz = −1942`. In each case `y` and `z` are the roots of the quadratic with the required sum and product, and none of the three denominators is zero. [Official paper](https://hmmt-archive.s3.amazonaws.com/tournaments/2010/feb/alg/problems.pdf)
- **2012 February Algebra #9.** Grade 17. Equating the two coefficients using Viète's relations gives candidate angles `kπ/7` for `k = 1,…,6` when `tan y` is repeated, odd multiples of `π/8` when `tan 2y` is repeated, and `kπ/9` for `k = 1,…,8` when `tan 3y` is repeated. Comparing the 18 root multisets by their angles modulo `π` identifies one duplicate pair. Both `π/3` and `2π/3` give `x⁴ − 3x²`. [Official solutions](https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/solutions.pdf)

## BMT problem audit, 2013 Geometry and 2014 individual rounds (2026-11-26)

Solved and checked the 30 indexed short-answer questions on these three papers. The 2014 booklets publish numerical keys for these questions. The checks below derive those results independently. The 2013 Geometry booklet also has worked solutions, which were compared with an independent route for each question. Elo entries are author estimates. Revisions use the required insights and calculations, with the recent 2,400 estimate for 2014 Geometry #7 and the app's other BMT problems as references. The 2014 keys required one correction and five voids, while the 2013 paper required one further correction. Two corrected problems now have original in-app solutions. [2014 Analysis paper](https://berkeley.mt/archives/bmt-2014/AnaS2014.pdf) · [2014 Analysis key](https://berkeley.mt/archives/bmt-2014/AnaS2014A.pdf) · [2014 Geometry paper](https://berkeley.mt/archives/bmt-2014/GeoS2014.pdf) · [2014 Geometry key](https://berkeley.mt/archives/bmt-2014/GeoS2014A.pdf) · [2013 Geometry paper](https://berkeley.mt/archives/bmt-2013/GeoS2013.pdf) · [2013 Geometry solutions](https://berkeley.mt/archives/bmt-2013/GeoS2013S.pdf)

### 2014 Analysis

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Put $t=2^x>0$. The quadratic $t^2-4t+3$ has roots 1 and 3, giving the printed pair $0,\log_2 3$. Tag repeated-block substitution. | 1,390 |
| 2 | Divide the cubic by $x-2$. The quotient $x^2-7x+8$ has positive roots on opposite sides of 2, so the smallest is $(7-\sqrt{17})/2$. | 1,460 |
| 3 | The train covers 12 miles. Eleven markers span 10 gaps. Placing one omitted marker on either side of the 11 observed ones gives the other bound of 12 gaps. With closed observation endpoints the spacing range is $(1,6/5]$. Open endpoints give $[1,6/5)$. A half-open interval excludes both endpoints of that spacing range. The published $1/5$ is the difference of the infimum and supremum. Void the requested difference of attained extrema and tag fencepost counting. | 1,710, voided |
| 4 | The five roots sum to 20, so the middle root is 4. With common difference $d$, the shifted polynomial is $f(4+t)=t(t^2-d^2)(t^2-4d^2)$. Thus $f(8)=-f(0)=-24$. Tag oddness and file with shifted roots. | 2,450 |
| 5 | Divide both numerator and denominator by $\sqrt{x}$. The result tends to $1/(1+1)=1/2$. One scaling step gives the limit. | 1,500 → 1,050 |
| 6 | Substitution at $1,-1$ gives $4f(1)+2f(-1)=2$ and $2f(1)+4f(-1)=0$. This gives $f(1)=2/3$. At 2, $4f(2)+4f(1)=9$, so $f(2)=19/12$. Tag elimination and rate it as a short substitution cycle. | 2,560 → 2,100 |
| 7 | Relative to 4, the four root sums are $i(\pm\sqrt{18}\pm1)$. Pair opposite signs in the product at 4 to obtain $(18-1)^2=289$. Tag the difference-of-squares simplification. This is a direct conjugate pairing. | 2,830 → 2,280 |
| 8 | The even prefix at $n=0$ requires $f(0)=4-e^{-1}\in(3,4)$, inconsistent with integer values. Under a real-valued repair, summation by parts gives half the sum of the weighted prefixes. The odd log prefixes cancel by shifting the index, and the even prefixes form a geometric series giving the published value. Void the printed problem. | 3,160, voided |
| 9 | Set $u=xt$, so $x^{3/2}I(x)=\int_0^\infty\sqrt{x+u}\,e^{-u}du$. Replacing $\sqrt{x+u}$ by $\sqrt u$ changes the integral by at most $\sqrt x$. Its limit is positive and finite, forcing $\alpha=3/2$. One scaling and a uniform bound set the difficulty. | 3,300 → 2,900 |
| 10 | First-order shifts give centers $-1-5\cdot10^{-7},10^{-6},1-5\cdot10^{-7}$. Exact rational evaluations give opposite signs at the two half-rounding cutoffs around each center. The disjoint brackets contain all three cubic roots, certifying $(-10^8-50,100,10^8-50)$. The shared approximation and three bracketing checks support the revised estimate. | 3,100 → 2,800 |

### 2014 Geometry

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The apothem is $s\sqrt3/2$. Divide the incircle area $3\pi s^2/4$ by the hexagon area $3\sqrt3s^2/2$ to get $\pi\sqrt3/6$. | 1,390 |
| 2 | Reflection through $OB$ exchanges $A,C$, making $P$ the midpoint of $AC$. Triangle $OPC$ is half an area-$\sqrt3$ center triangle. Add the full center triangle $OCD$ to get $3\sqrt3/2$. Tag the reflection symmetry. | 1,590 |
| 3 | Write $BC=c$ and $CD=t$. The two right triangles with altitude $AD$ give $AC^2=2ct$. The circle gives a right angle at $E$ and the altitude projection gives $CE^2=ct$. Hence $CE=\sqrt2$. Use the diameter and hypotenuse-projection cards. | 1,920 |
| 4 | A sphere of radius $r$ has cross-section center at most $6-r$ from the axis, so the axial gap for radii $r,s$ is at least $\sqrt{(r+s)^2-(12-r-s)^2}$. Middle radii 3, 4, and 5 give lower bounds $9+2\sqrt6+4\sqrt3$, $8+2\sqrt6+6\sqrt2$, and $7+4\sqrt3+6\sqrt2$. The first is attained with signed radial positions $2,-3,1$ in radius order $4,3,5$. Both consecutive pairs touch and the outer axial gap exceeds 9. Correct the key and tag distance bounds and construction. | 3,160 → 3,000 |
| 5 | A center tangent to 100 faces must choose one side per coordinate. Its distance to the cube's center is $10(1/2-r)=2r$, forcing $r=5/12$. All corner choices would be occupied, so neighboring centers are $1/6$ apart, less than the diameter $5/6$. Void and use the squared-distance card. | 3,100, voided |
| 6 | Place $A=(0,0)$, $B=(5,0)$, $C=(5,5)$ and $E=(5/2,0)$. The line is $y=2x-5$. The circle gives $5x(x-4)=0$. The point on the segment is $(4,3)$, one unit from $BC$. The resulting quadratic factors directly. | 2,080 → 1,820 |
| 7 | Set $AE/AD=t$. Along $BE$, the fractions from $B$ to $F,G$ are $1/(1+t)$ and $1/t$. The segment order requires $t\ge1$. From $BF=EG$, obtain $1/(1+t)=1-1/t$ and $t=(1+\sqrt5)/2$. The key and the recent estimate agree with the verified route. | 2,400 |
| 8 | Since $D$ bisects arc $AC$, $OD$ is perpendicular to $AC$. The diameter gives $BC\perp AC$, so $OD\parallel BC$. Adding triangle $DBC$ to the circular segment cancels the subtracted triangle $OBC$ because they share a base and height. The resulting $45^\circ$ sector has area $9\pi/2$. Tag the diameter and equal-height comparison. | 2,560 → 2,250 |
| 9 | With $A$ at the origin and the equilateral triangles external, write $B'=\omega C$ and $C'=\overline\omega B$ for a unit $60^\circ$ rotation $\omega$ in the appropriate orientation. Then $BB'$ and $CC'$ have directions related by $-\omega$. The distance from $C$ to line $BB'$ is $5\sin60^\circ>4=BC$. Void the question and tag the rotation that gives the contradiction. | 3,220, voided |
| 10 | Enumerating the 256 equiprobable subsets gives $825/128$ under independence. The full octagon has area 14. Showing all eight points together half the time and none otherwise preserves the printed marginals and gives expectation 7. Void the underdetermined model. | 3,400, voided |

### 2013 Geometry

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | $a^2+b^2=121$ and $ab=24$ give $(a+b)^2=169$. The perimeter is 26. The app already accounts for the published semiperimeter. | 1,330 |
| 2 | Both tangent centers lie on the internal bisector and are at twice their radii from the vertex. The correct equation is $84-2r=42+r$, so $r=14$. The published 21 makes the centers only 42 units apart for radii summing to 63. Correct the key. | 1,620 |
| 3 | The unit tetrahedron has circumradius $\sqrt6/4$. The cosine law gives $\cos\angle AOB=-1/3$, so the sine is $2\sqrt2/3$. | 1,920 |
| 4 | The equations $a^3=6b^2$ and $a^2=b$ give $a=1/6,b=1/36$. Thus $6a^2/b^3=7776$. The app already uses the corrected key. The work is a short substitution. | 1,890 → 1,650 |
| 5 | Center the chord at the origin and use $\cot\angle APB=(x^2+y^2-1/4)/|y|$. The $120^\circ$ bound gives two equal minor segments of radius $1/\sqrt3$ and central angle $120^\circ$. The sum is $2(\pi/9-\sqrt3/12)=2\pi/9-\sqrt3/6$. This accounts for a factor-of-two slip in the solution's intermediate expression. | 2,190 |
| 6 | Cyclic angles give similarity ratio 2 between the two exterior secant triangles. Taking $x=XA,y=XB$, solve $x+5=2y,y+11=2x$ to get $x=9,y=7$. The published solution interchanges the two names. Heron's formula on sides $4,7,9$ gives $6\sqrt5$. Add the cyclic-angle and elimination tags. | 2,500 → 2,300 |
| 7 | Let $p=AP$ and $q=AQ$. Half-area gives $pq=6$, and the distance expression becomes $p+9/p$ for $2\le p\le4$. AM–GM gives 6 at $p=3$. The upper inequality reduces to $(p-2)(p-9/2)\le0$, with equality at 2. Continuity yields $[6,13/2]$. Add the area and attained-bound tags. | 2,670 → 2,220 |
| 8 | Put $B=(0,0)$, $A=(1,0)$, $C=(0,1)$. The incenter and excenter are $(r,r),(R,R)$ with $r=1-\sqrt2/2,R=1+\sqrt2/2$. The second triangle has right-isosceles leg $2R-1$, so its incenter is $(-\sqrt2/2,2+\sqrt2/2)$. The determinant gives area $1+\sqrt2$. This route bypasses an inconsistent length in the printed derivation. Tag the coordinate route. | 2,990 → 2,710 |
| 9 | Miquel puts $X$ on circle $AEF$. The side lengths of $ABC$ are $20,21,29$, so $\angle A=90^\circ$. With $AE=AF=10$, the diameter is $EF=10\sqrt2$ and the radius is $5\sqrt2$. The converse Pythagorean theorem identifies the right angle in one step. | 3,220 → 2,520 |
| 10 | The intended proof projects a harmonic quadruple. Independently, put $D=(0,0),B=(-10,0),C=(11,0)$, $A=(-5/21,20\sqrt{143}/21)$, and incircle center $(0,5\sqrt{143}/13)$. Intersecting $AD$ with that circle and projecting the contact points through $T$ gives $E'=(440/19,0)$ and $F'=(-440/23,0)$. The signed reciprocal difference is $-1/110$ and the absolute value explicitly printed on the paper is $1/110$. Tag the tangent-length step. | 3,520 → 3,150 |

## BMT problem audit, remaining 2013 papers and 2015–2016 individual rounds (2026-11-26)

Independently solved the 70 indexed short-answer questions on these seven papers and checked them against the displayed statements and the organizers' papers and keys. This completes the audit through 2016. The review uses the published paper when it differs from the solution booklet. Elo changes reflect the route described in each row and remain author estimates.

### 2013 Analysis

[Problem paper](https://berkeley.mt/archives/bmt-2013/AnaS2013.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2013/AnaS2013S.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Add the two sums containing $a$ and subtract the third to get $2a=53$. | 980 |
| 2 | Cauchy gives $(x^2+y^2)^2\le2(x^4+y^4)=2$, attained at $x^2=y^2$. The maximum distance is $2^{1/4}$. | 1,710 → 1,490 |
| 3 | After division by $x$, the numerator tends to 2 and the denominator to $3-(-3)=6$. The limit is $1/3$. | 1,500 |
| 4 | Write $z=x+iy$. The imaginary equation is $y(2x-1)=0$. With $y=0$, $x=0$ or 1. Otherwise $x=1/2$ and $(y+1/2)^2=0$. The moduli are $0,1,1/\sqrt2$. | 1,950 → 1,740 |
| 5 | The power series is $(1+x)^{-2}$ on $|x|<1$. Its left limit at 1 is $1/4$. | 2,300 |
| 6 | Set $t=2\cos(\pi/7)=z+z^{-1}$ with $z=e^{i\pi/7}$. Divide $(z^7+1)/(z+1)=0$ by $z^3$ to get $t^3-t^2-2t+1=0$. Neither $1$ nor $-1$ is a root, so the cubic is irreducible. Substituting $t=-2$ and dividing by 8 gives $-7/8$. | 3,050 |
| 7 | For $a=\sqrt{y/3}$, the expression $x^3-xy+2a^3$ factors as $(x-a)^2(x+2a)$ and is minimized at $x=a$. Thus the smallest feasible $y$ satisfies $1-y^3-2(y/3)^{3/2}=0$. Solving gives $y=\sqrt[3]{29-4\sqrt7}/3$. | 3,280 |
| 8 | At $x=1$, the runner is at $y=\sqrt{5/2}$ and has $x'=4y/\sqrt{25+16y^2}$. The clockwise bearing rate about $(1,0)$ is $x'/y=4/\sqrt{65}$. | 2,200 |
| 9 | The function $\sqrt{1-(1-x)^3}$ has inverse $1-\sqrt[3]{1-x^2}$. Their integrals on $[0,1]$ sum to 1, canceling the first and last terms as printed. The two powers contribute $3/5-2/5=1/5$. | 3,300 → 2,850 |
| 10 | For $t=1/x$, divide each iterate by $x^3$. The recurrence becomes $g_1(t)=|1-t|$, $g_{n+1}(t)=|g_n(t)-1|$. It has a linear tail $t-n$ and alternating values 0 and 1 at the consecutive integer corners. The positive corner sums are over even $j$ for odd $n$ and odd $j$ for even $n$, each with weight $j^{-3}$. Their limiting ratio is $1/7$. | 3,400 |

### 2013 Discrete Math

[Problem paper](https://berkeley.mt/archives/bmt-2013/DisS2013.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2013/DisS2013S.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The first two remainders combine to $n\equiv106\pmod{225}$. The candidates in range are 556 and 781, of which 781 is odd. | 1,230 |
| 2 | A shared factor can be 2 or 3. There are 32 rolls with both sum and product even and 13 with both divisible by 3. Six orders of $(1,2,3)$ are counted in both. Thus $(64-32-13+6)/64=25/64$. | 1,590 |
| 3 | With $m$ steps there are at most $2^m$ distinct subsets of step amounts, including the empty subset. Represent every pile in binary to attain the bound with 11 steps. | 2,080 |
| 4 | The iterate is $2+2^k(x-2)$. Fermat reduces the power for $k=2013$ to $2^3$ modulo 2011, giving $2005$. | 2,130 |
| 5 | For $0<k<2013$, the selected roots are the nonprimitive ones. There are $2013-\varphi(2013)=813$, and conjugate pairs cancel their unit factors. For the printed range, $k=0$ selects all roots and the product is $2^{2013}$. Practice retains both accepted readings. | 2,780 |
| 6 | Append HTT to a length-nine string avoiding HTT. Earlier occurrences cannot overlap the final pattern. After the first H, all remaining T's must be nonconsecutive, so the prefix count is $1+\sum_{j=0}^8 F_{j+2}=143$. Divide by $2^{12}$. | 2,780 → 2,530 |
| 7 | It suffices to represent 32 as $3m+xn$ because 18 is already a multiple of 3. For $x\equiv2$ modulo 3 the least possible $n$ is 1, giving $x\le32$. For $x\equiv1$ the least $n$ is 2, giving $x\le16$. The two arithmetic sums total 238. | 2,720 → 2,420 |
| 8 | Average the conditional means $(j-1)/2$ for $1\le j\le21$ with the absorbing case $j=0$. This gives $105/22$. | 2,130 |
| 9 | From residue 0, at each step add $\pm3,\pm11,\pm61$ modulo 2013 to the current frontier and discard previously reached residues. The first 22 layers after 0 reach 2,000 more residues. Layer 23 reaches the last 12, including 947, so the diameter is 23. | 3,220 |
| 10 | Assign each maximal prime power dividing $k$ to a cycle whose length it divides. The product of the powers assigned to a cycle is at least their sum. Separate cycles attain the lower bound, and for $k=1$ one fixed point suffices. Use self-check and show the general solution. The booklet's 75 applies to $k=2013$. | 3,100 |

### 2015 Analysis

[Problem paper](https://berkeley.mt/archives/bmt-2015/AnaS2015.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2015/AnaS2015S.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The binary expansion of $24.375$ has four nonzero digits, at exponents $4,3,-2,-3$. Any repeated exponent would carry and reduce the number of digits, so the exponents are forced and their product is 72. | 1,860 |
| 2 | Multiplying by $1+x+x^2+\cdots$ makes the $x^{2015}$ coefficient $1+\cdots+2016=\binom{2017}{2}$. | 1,800 → 1,570 |
| 3 | Subtract the first two equations to get $(x-z)(x+z)=24$. The same-parity factor pairs give $|x|=7$ or 5. The first equation excludes 7 and then gives $|z|=1,|y|=2$. The last equation fixes the signs up to overall negation, giving $(5,-2,1)$ and $(-5,2,-1)$. | 1,980 |
| 4 | From $a_3=u,a_4=v$ the repeating tail is $u,v,v-u,-u,-v,u-v$. The requested sum is $1+2v$, with $v$ free because the recurrence starts at 3. Void the printed problem. | 2,290, voided |
| 5 | Completing the square yields a unit circle centered at $(2,0)$. The extreme squared distances are 9 and 1, so their difference is 8. | 1,890 → 1,600 |
| 6 | If $m$ is the middle root, reciprocation reverses the progression and divides it by $m^2$. Thus $m^2=180/20=9$. The root product is $m^5$, so $|D|=243$. | 2,340 → 2,130 |
| 7 | The sum is $\operatorname{Re}(1+i)^{75}$. Powers of $(1+i)^4=-4$ reduce it to $(-4)^{18}(1+i)^3$, whose real part is $-2^{37}$. | 2,500 |
| 8 | For the roots $\alpha,\beta$ of $t^2-t-1=0$, the product over seventh roots of unity equals $-(\alpha^7-1)(\beta^7-1)=\alpha^7+\beta^7$. The power sums obey $s_n=s_{n-1}+s_{n-2}$ from $2,1$, so $s_7=29$. | 3,160 → 2,830 |
| 9 | Each radical is at most $n$, so the printed sum after division by $n^3$ lies in $[0,1/n]$. The key remains zero. | 2,600 → 1,250 |
| 10 | For $I=\int_0^{\pi/2}\ln\sin x\,dx$, reflection gives the same integral with cosine. Adding gives $2I=I-(\pi/2)\ln2$ by the double-angle identity and symmetry of sine on $[0,\pi]$. Adding the $\ln4$ term yields $(\pi/2)\ln2$. | 3,000 → 2,650 |

### 2015 Geometry

[Problem paper](https://berkeley.mt/archives/bmt-2015/GeoS2015.pdf) · [Official key](https://berkeley.mt/archives/bmt-2015/GeoS2015A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The two bisected angles sum to $(180^\circ-80^\circ)/2=50^\circ$. Thus $\angle BDC=130^\circ$. | 1,180 |
| 2 | With outer circumradius 1, place one vertex at $(1,0)$. The overlap has vertices such as $(1/2,1/(2\sqrt3))$ from intersecting the sides of the two equilateral triangles. Its regular hexagon has circumradius $1/\sqrt3$, giving area ratio $1/3$. | 1,620 |
| 3 | The altitude to $BC$ is at most $AM=3$ and equals 3 when $AM\perp BC$. The maximum area is $9\cdot3/2=27/2$. | 1,680 → 1,400 |
| 4 | For the sum $s$ of the radii, the center distance gives $(18-s)^2+(25-s)^2=s^2$. The roots are 13 and 73. The radii are each at most 9, and equal radii $13/2$ fit, so $s=13$. | 1,980 |
| 5 | The fourth vertices are $(1,1),(1,-1),(-1,1)$ from the three choices of opposite vertex. The resulting triangle has area 2. | 1,710 → 1,460 |
| 6 | Write points on the line as $(14t,5t,2-2t)$. The sphere equation reduces to $225t^2-4t=0$. The second point is $t=4/225$, giving chord length $15t=4/15$. | 2,030 → 1,850 |
| 7 | Reflect $A$ through the plane to $A'=A-\tfrac23(1,1,1)$. Segment $A'B$ meets the plane and is shortest, with squared length $10/3$. | 2,400 |
| 8 | Scale to the unit circle. The area is at most half the product of the two diagonals, hence at most 2. Equality forces perpendicular diameters and a square. The next vertex after scaling back is $(-\sqrt3/2,1)$. | 2,720 → 2,440 |
| 9 | The diameter makes $F,E$ the orthogonal projections of $C,B$. In unit side directions $u,v$ from $A$, $F=(4/3)u$, $E=(4/\sqrt{10})v$, and the median runs along $3u+\sqrt{10}v$. Comparing the two coefficients of the affine intersection with $EF$ gives $EX/XF=9/10$. | 3,100 → 2,600 |
| 10 | For a tangent circle of radius $r$, the square of the distance from the contact point to any point on the circle is $2r$ times its height above the tangent. The height ratio is $2\sin C/\sin B=8/5$. With $L=BC=\sqrt{21}$, equal powers give $(L-BD)^2-2BD^2=2$. The root $BD=2\sqrt{10}-\sqrt{21}$ lies on the segment and the two distances satisfy $5ED^2=8FD^2$ there, so a circle through both points exists. Keep the published answer and replace the earlier rationale that rejected the configuration. | 3,160 → 2,580 |

### 2016 Analysis

[Problem paper](https://berkeley.mt/archives/bmt-2016/AnaS2016.pdf) · [Official key](https://berkeley.mt/archives/bmt-2016/AnaS2016A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Factor the difference of cubes. The gap is one, leaving $1001^2+1001\cdot1000+1000^2=3003001$. | 880 |
| 2 | Substitution verifies $2^{16}$ and $16^2=2^8$ for $(x,y)=(16,2)$. The prompt asks for one pair. | 1,520 |
| 3 | The runner covers $1+1/2$ miles along the ground at 100 mph. In that time Steve moves $10(1.5/100)=3/20$ mile along the train. | 1,620 |
| 4 | If $N$ is even, the endpoint sum gives $r^{N-1}=16384$. The odd-minus-even sum gives $(r^N-1)/(r+1)=13107$. These give $r=4$ and $N=8$, which satisfy both totals. | 2,130 |
| 5 | Each pair of complementary angles contributes $t/(1+t)+1/(1+t)=1$. The 44 pairs and the $45^\circ$ term give $89/2$. | 1,950 → 1,640 |
| 6 | The closed curve $xe^y-ye^x=0$ cannot approach $(1,-1)$ because its defining expression is $e^{-1}+e>0$ there. The printed assumption is inconsistent. Void. | 2,700, voided |
| 7 | The 22 linear factors have coefficient sum $-12$ and sum of squared coefficients $1012$. Their second elementary symmetric sum is $(144-1012)/2=-434$. | 2,240 → 2,090 |
| 8 | The series is $(1-x)^{-2}$. Taking logarithms gives $-2\ln(1-x)/x\to2$, hence $e^2$. | 2,000 |
| 9 | Integration gives $p=x^4/3+2x^3/3+x^2+d$. Newton's sums give $s_3=10$ and $s_4=-14-12d$, yielding $d=-2$. In the shifted basis, $a_3=3/2$, $a_4=-7/6$, $a_2=32$, and $a_1=-26/3$, so $d=a_0-81/2$. Correct the key to $77/2$. | 2,900 → 3,030 |
| 10 | The binomial expansion of $(1-z)^{-1/2}$ has coefficients $\binom{2k}{k}/4^k$. Evaluate it at $z=-1/2$ to get $\sqrt{2/3}$. | 2,880 → 2,540 |

### 2016 Discrete Math

[Problem paper](https://berkeley.mt/archives/bmt-2016/DisS2016.pdf) · [Official key](https://berkeley.mt/archives/bmt-2016/DisS2016A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The 10-cent average requires three nickels per quarter. One quarter and three nickels attain the minimum. | 980 |
| 2 | Count multiples of each divisor and subtract the overlap twice to get $672+288-2(96)=768$. | 1,180 |
| 3 | Choose the rank with three cards and the rank with two in $13\cdot12$ ways. Choose suits in $\binom43\binom42$ ways. The product is 3744. | 1,360 |
| 4 | If $k$ socks travel from A to B, conservation forces $k$ to travel on each edge of that directed three-cycle and $3-k$ on each edge of the reverse cycle. Sum $\binom3k^3$ over $0\le k\le3$ to obtain 56. | 1,860 → 1,940 |
| 5 | The cycle of 9 modulo 100 has length 10. Its exponent is $8^{7^{6^{\cdots^2}}}$, where the exponent of 7 is even, so the exponent of 8 is $1$ modulo 4. Thus the exponent of 9 is 8 modulo 10, and $9^8\equiv21\pmod{100}$. | 2,130 |
| 6 | A merge tree gives each leaf a power of 2 as its coefficient. For child sizes $a,b$, induction bounds the count of coefficients at least $2^j$ by $\max(a-j+1,0)+\max(b-j,0)\le a+b-j$ for $1\le j<a+b$. Thus the sorted coefficients are bounded by $2^{n-1},\ldots,1$. Doubling the running total while adding labels in descending order attains that assignment, whose weighted sum is $2^n(n-1)+1$. | 2,610 → 2,780 |
| 7 | The powers $1,2,\dots,512$ of 2 form a clique of size 10. Color by the number of prime factors counted with multiplicity, which strictly increases along divisibility edges and takes values from 0 through 9. | 2,560 → 2,310 |
| 8 | Each edge gives $2x_ix_j\ge-x_i^2-x_j^2$. Sum over the $n$-regular graph to bound the ratio below by $-n/2$. Use signs $(-1)^{\text{Hamming weight}}$ to attain equality. | 2,880 → 2,510 |
| 9 | With $\alpha=13+2\sqrt{42}$ and $\beta=1/\alpha$, the integer trace $T_j=\alpha^j+\beta^j$ starts at 2 and 26 and obeys $T_j=26T_{j-1}-T_{j-2}$. Modulo 100, $T_{500}=74$. Subtracting the positive conjugate power in $(0,1)$ gives last digits 73. | 3,100 → 2,700 |
| 10 | The number of dominoes crossing a cut has the parity of the area on either side and must be positive. With one or two rows the bound across vertical cuts rules out the strip, with the $2\times2$ square also requiring two horizontal crossings. For three rows and even $n$, the vertical cuts need $3n/2-2$ crossings and the horizontal cuts need four more, exceeding $3n/2$. The $4\times4$, $4\times5$ and $4\times6$ boards require at least 12, 12 and 16 crossings, respectively. A $5\times6$ witness has rows `ABCCDD`, `ABEFFG`, `HHEIJG`, `KLLIJM`, `KNNOOM`, with equal letters forming a domino. Every cut is crossed, so the minimum is 30. | 3,280 → 3,000 |

### 2016 Geometry

[Problem paper](https://berkeley.mt/archives/bmt-2016/GeoS2016.pdf) · [Official key](https://berkeley.mt/archives/bmt-2016/GeoS2016A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The volume is 64, so the cube has edge 4 and surface area 96. The prism has area 112, giving difference 16. | 980 |
| 2 | The semiperimeter is 13. Brahmagupta gives $\sqrt{7\cdot6\cdot6\cdot7}=42$. | 1,460 |
| 3 | The third side $c$ ranges from 5 to 35. The two relevant acute conditions are $20^2<16^2+c^2$ and $c^2<20^2+16^2$, giving $c=13,\ldots,25$ and probability $13/31$. | 1,830 → 1,640 |
| 4 | If the square side is $s$, the equilateral side is $s+s/\sqrt3$ by the $60^\circ$ slope of $BC$. The ratio is $(\sqrt3/4)(1+1/\sqrt3)^2=1/2+\sqrt3/3$. | 1,980 → 1,750 |
| 5 | Trace $A,C,E,B,D,A$ as a pentagram. It turns through $720^\circ$, so the five tip angles sum to $180^\circ$. The missing angle is $180^\circ-20^\circ-16^\circ-3^\circ-12^\circ=129^\circ$. | 2,560 → 2,110 |
| 6 | The three vectors from the centroid sum to zero, so they form a triangle by concatenation. If the vectors are $u,v,w$, then $(v-u)\times(w-u)=3u\times v$, giving an area one-third of the original. Heron's formula gives original area 84 and requested area 28. | 2,400 → 2,090 |
| 7 | Use $A=(0,0), C=(2\sqrt2,0), B=(\sqrt2,\sqrt2)$. The $30^\circ$–$60^\circ$ triangle on the side giving the obtuse angle at $C$ has $D=(3\sqrt2/2,-\sqrt6/2)$. The determinant for $BCD$ gives $(1+\sqrt3)/2$. | 2,240 |
| 8 | In the zero-sum hyperplane of $\mathbb R^8$, center the eight coordinate unit vectors and divide by $\sqrt2$. Then all sides are one, and each squared norm is $(1-1/8)/2=7/16$. The radius is $\sqrt7/4$. | 2,940 → 2,530 |
| 9 | For $C=(0,0), A=(a,0), B=(0,b)$ the square rotations give $DG^2=a^2+4b^2$ and $EI^2=4a^2+b^2$. Adding gives $5FH^2=19^2+22^2$, so $FH=13$. | 3,100 → 2,430 |
| 10 | Heron gives inradius $\sqrt2$ and $\sin(B/2)=1/3$. Consecutive tangent radii on the internal bisector have ratio $1/2$ or 2. Halving at every step gives $8\pi/3$. The sequence may return to the incircle after the first halving, then shrink again, adding a positive extra area while satisfying the same tangencies. Void the printed recursion. | 3,100, voided |

## BMT problem audit, 2017 individual rounds (2026-11-27)

Solved all 30 problems and compared the results with the three official keys. Geometry uses the archived copy of the paper linked in the app. Elo revisions reflect the shortest verified human routes.

### Analysis

[Problem paper](https://berkeley.mt/archives/bmt-2017/AnaS2017.pdf) · [Official key](https://berkeley.mt/archives/bmt-2017/AnaS2017A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The total score is 30. If $k$ students score 7, the minimum total is $10+6k$, so $k\le3$. Three 7s, two 2s, and five 1s attain the bound. | 1,270 |
| 2 | Set $u=3^x$. The quadratic $u^2-9u+18=0$ gives $u=3,6$, hence $x=1,\log_3 6$. | 1,460 |
| 3 | The factor $\cos(x^2)$ is even, so the integrand is odd and its symmetric integral vanishes. | 1,100 |
| 4 | Write $S=\sum_{n\ge1}n^2/2^n$. Subtract $S/2$ to get $S/2=2\sum n/2^n-\sum1/2^n=4-1=3$. Thus $S=6$. | 1,890 → 1,920 |
| 5 | Solve $\lvert x-1\rvert=4\pm y$. For $0<y<4$ there are four roots, and for $y>4$ there are two. At $y=4$ the zero inner value gives one root alongside the two for inner value 8. The cases $y=0$ and $y<0$ give two and zero. | 1,710 |
| 6 | The coordinate sum is invariant and equals 4. Each application subtracts twice a cyclic permutation of the input from the constant vector $(4,4,4)$. After three applications the new roots are $12-8r_i$. Their pair sum is $432-192(4)+64(0)=-336$. | 2,880 → 2,450 |
| 7 | Partial fractions turn the sum into half of the difference between the two alternating odd-reciprocal series. They start at $-1$ and $-1/3$ and sum to $-\pi/4$ and $\pi/4-1$, respectively. The result is $(2-\pi)/4$. | 2,670 → 2,420 |
| 8 | Reflect $x$ to $1-x$. The floors sum to 2016 off a finite set, giving the integral $I=1008(2017!)^2/4035!$. If $a$ can be positive rational, taking $n=1$ and $m\to\infty$ gives $a=I/(m!)^2\to0$. Void the printed minimum. With positive integers the published triple is optimal: the prime 4049 rules out $4049\le n<8098$ for $a\le1008$ because its exponent in $n!$ is one. For larger $n$, Bertrand's postulate supplies a prime between $n/2$ and $n$, with the same obstruction. An exact factorial sweep for $n<4049$ finds only $(a,m,n)=(1008,2017,4035)$ with $1\le a\le1008$. | 3,200, voided |
| 9 | Summing equal pairs and both directions of the nonzero offsets gives $M(t)=(1+t^n)/[(1-t^2)(1-t^n)]$. Set $t=e^{-s}$. The constant terms of $nM(e^{-s})$ and $(1-e^{-s})^{-2}$ are $(n^2+4)/12$ and $5/12$, and both have singular part $s^{-2}+s^{-1}$. Thus $P(n)=(n^2-1)/12$ and $P(0)=-1/12$. | 3,400 → 3,230 |
| 10 | Substitute $H_n=\int_0^1(1-t^n)/(1-t)\,dt$. The alternating binomial sum gives $-\int_0^1(1-t)^{2016}\,dt=-1/2017$. | 3,220 → 2,840 |

### Discrete Math

[Problem paper](https://berkeley.mt/archives/bmt-2017/DisS2017.pdf) · [Official key](https://berkeley.mt/archives/bmt-2017/DisS2017A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | After the first sock, four of the remaining 44 match it. The probability is $1/11$. | 980 |
| 2 | Choose the repeated focus in three ways, its pair of years in six ways, and the order of the other two in two ways. The total is 36. | 1,390 → 1,210 |
| 3 | Eight total divisors require exponent patterns $7$, $(3,1)$, or $(1,1,1)$. The corresponding minima are 128, 24 and 30. | 1,390 |
| 4 | The digit sum of all five digits is 25. To get a four-digit multiple of 9, remove 7 and arrange the rest in descending order, giving 9531. | 1,390 |
| 5 | A set with no adjacent elements either omits the last element or uses it and omits its predecessor. The counts start with 1 and 2 and obey the Fibonacci recurrence, giving 89. | 1,830 → 1,580 |
| 6 | Evaluating $f^6$ in two ways gives $f(1)=1$. Every vertex reaches 1, so the other five arrows form a labeled tree oriented toward 1. Conversely every such tree has depth at most five and works. Cayley gives $6^4=1296$. | 2,560 |
| 7 | Under independence the origin contributes $1/4$. On shell $d\ge1$ the four corners each contribute $4^{-d}/2$ and the other $8d-4$ sites each contribute $4^{-d}$. The sum is $113/36$. With one uniform draw shared by every light, each of the eight sites on shell 1 alone has all neighbors on with probability $1/2$, giving at least 4. Void the unspecified dependence model. | 2,990, voided |
| 8 | The weakest player's potential meeting round $j$ has seeding probability $2^{j-1}/1023$, with survival probability $4^{-(j-1)}$. Meeting that player triples the baseline $4^{-10}$. The resulting geometric sum gives $257/2^{28}$. Restore the superscript from the organizer's printed key. | 3,160 → 2,940 |
| 9 | The occupancy of the chosen box is binomial with parameters $n,1/n$. Expand $b^4=(b)_4+6(b)_3+7(b)_2+(b)_1$. Each factorial moment tends to 1, giving 15. | 3,280 → 2,670 |
| 10 | Reverse the floor sum. For each $m\le64$ the signed divisor sum is $m-2q$, with $q$ the odd part of $m$. The odd parts sum to $32^2+16^2+8^2+4^2+2^2+1+1=1366$. The total is $2080-2(1366)=-652$. | 3,340 → 2,910 |

### Geometry

[Archived problem paper](https://oss.linstitute.net/wechatimg/2019/10/bmt2017geometry.pdf) · [Official key](https://berkeley.mt/archives/bmt-2017/GeoS2017A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The distinct exterior angles are positive integers summing to 360. The smallest 27 sum to 378. The angles $1,2,\ldots,25,35$ sum to 360 and can be realized by consecutive normal directions of tangent sides to a circle. | 1,980 → 1,770 |
| 2 | The three possible fourth vertices give a triangle with the three stated points as its side midpoints. The stated triangle has area $15/2$ by a determinant, so the larger area is 30. | 1,390 |
| 3 | Use opposite hexagon vertices $(\pm1,0)$ as the square's diagonal. In the first quadrant, the excluded triangle has top edge on $y=\sqrt3/2$, of length $\sqrt3/2-1/2$, and height $\sqrt3/2$. Four copies give $(3-\sqrt3)/2$. | 1,890 |
| 4 | Count the five integer coordinates with square sum at most 9. One square 9 gives 10 choices, two squares 4 give 280, one square 4 gives 810, and coordinates all in $\{0,\pm1\}$ give 243. The total is 1343. | 2,340 |
| 5 | The cubic is $(x-9)((x-9)^2-21)$. The side inequality fails because $18-\sqrt{21}<9+\sqrt{21}$. The product 10 comes from the formal expression $abc/(4s)$, but the specified triangle does not exist. Void. | 1,620, voided |
| 6 | For $m$ uniform cuts on an edge, the spacings are uniform in the unit simplex. Inclusion-exclusion for the event that at least one gap exceeds $t$, followed by integrating in $t$, gives mean longest gap $\frac{1}{m+1}\sum_{i=1}^{m+1}(-1)^{i+1}\binom{m+1}{i}/i$. The three means are $3/4,11/18,25/48$. Multiplication gives $275/1152$. Correct the published $35/192$. | 3,400 → 3,150 |
| 7 | Stretch the unit circle by factors 3 and 4. On the circle the area is $2\sin A\sin B\sin C$, maximized at equal angles by concavity of $\ln\sin x$ on $(0,\pi)$. Thus the desired triangles are stretches of inscribed equilateral triangles, each with area $9\sqrt3$. | 2,670 → 2,360 |
| 8 | On the unrestricted reading, disjoint triangles are allowed and the intersection is empty. Inside the disk a side missing the center leaves a cap containing area at most 625 for the triangle. For a side at distance $d$ with the center on the triangle's side, the area is at most $(25+d)\sqrt{625-d^2}$, increasing up to $d=25/2$. This equals 768 at $d=7$, and a chord and opposite apex attain equality. Rotating the construction gives intersection area $49\pi$. Accept both readings. | 3,460 → 2,940 |
| 9 | The chord of contact makes $D,F$ harmonic conjugates on $BC$. Tangent-chord similarity gives $BF/FC=DB/DC=(AB/AC)^2$. Then $\sin C=(2/\sqrt5)\sin B\le2/\sqrt5$. With $B=(0,0), C=(1,0), A=(0,2)$, the tangent meets $BC$ at $(-4,0)$ and attains equality. Correct the published $(5+\sqrt5)/8$. | 3,580 → 2,710 |
| 10 | A strip of latitude has area proportional to the sine difference between its boundaries. Both strips have the same longitude width and radius factor. Their ratio is $(\sin45^\circ-\sin41^\circ)/(\sin41^\circ-\sin37^\circ)$. | 2,240 |

## BMT problem audit, 2018 individual rounds (2026-11-27)

Solved all 30 questions while reviewing the steps required and comparing the resulting difficulty with the existing author estimates. The answer key changes include one arithmetic correction, one restored radical coefficient, and one additional accepted interpretation.

### Algebra

[Problem paper](https://berkeley.mt/archives/bmt-2018/ALSP18.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2018/ALSP18A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | From 0 to 180 mph takes 18 seconds, and braking takes another 12 seconds. Both stages have average speed 90 mph, so the limiting runway length is $90(30/3600)=3/4$ mile. | 1,460 |
| 2 | One distinct root forces a triple root. Matching the quadratic coefficient gives $8(x+1/2)^3$, so $k=6$. | 1,430 |
| 3 | Write $f(x)=-3+(x^2-1)g(x)$. The required values of $g$ at $-2,2,3$ are $2,3,1$. The slopes differ, so $g$ needs degree at least 2, and interpolation attains it. Hence $f$ has minimum degree 4. | 1,890 |
| 4 | Include the zero term at $i=0$. Pair $i$ with $2016-i\equiv-2-i$ modulo 2018. The products are negatives of one another. At the middle index $1008$, the factors include an even integer and 1009, so that term also vanishes. | 1,920 → 1,460 |
| 5 | Each cubic root $r$ gives $d=-(r^2+3)/r$. The cubic has simple roots, and two different roots giving the same $d$ would have product 3 and leave $-4/3$ as the third root, which fails. The cubic takes value $-2$ at both $\pm i\sqrt3$, so $\prod(r^2+3)=4$. The root product is $-4$, giving the requested product 1. | 2,560 → 2,340 |
| 6 | Put $s=x^2+y^2+z^2$. AM–GM gives $xyz\le(s/3)^{3/2}$, hence $12\le7s+9(s/3)^{3/2}$. Equality occurs at $x=y=z=2/3$, so the minimum is $4/3$ and $a+b=7$. | 2,340 → 2,050 |
| 7 | The binomial integral gives $h_n=\int_0^2(1+t)^n\,dt=(3^{n+1}-1)/(n+1)$. Division by $n!$ turns the sum into the difference of the exponential series with constant terms removed, $e^3-e$. | 2,670 → 2,260 |
| 8 | For $a_n=\sum_j(-1)^j\binom{n-j}{j}2^{n-2j}$, Pascal's identity gives $a_n=2a_{n-1}-a_{n-2}$. From $a_0=1,a_1=2$ we have $a_n=n+1$. The requested sum is $a_{2017}=2018$. | 2,990 → 2,530 |
| 9 | Set $t=(x-1)^2$. Remove the constant parts from the three ratios to get $1/(t-9)+1/(t-25)-2/(t-49)=0$. Clearing denominators gives $-64t+1216=0$. Thus $t=19$ is valid and $x=1+\sqrt{19}$ is the positive root, giving 20. | 2,400 |
| 10 | The first five power sums are $0,2(2018),-3(2018),2(2018)^2,-5(2018)^2$. The pairs with $q\le2$ fail. For $q=3$, $p=1$ fails and $p=2$ works, giving $p^2+q^2=13$. | 3,100 → 2,470 |

### Discrete Math

[Problem paper](https://berkeley.mt/archives/bmt-2018/COSP18.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2018/COSP18A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Filling each pen with one color permits repeated colors, giving $11^3=1331$. Requiring distinct colors gives the published $11\cdot10\cdot9=990$. Accept both readings. | 1,230 |
| 2 | The five counts sum to 12 and lie from 0 to 6. To realize them, place the subjects in contiguous blocks and pair positions $i$ and $i+6$. No block contains a complete pair. Stars and bars gives $\binom{16}{4}-5\binom94=1190$. The published arithmetic omits four of the five exclusions. | 1,770 → 2,010 |
| 3 | There are $\binom92^2=1296$ rectangles. To contain $(4,4)$ strictly, both coordinate pairs must straddle 4, giving $(4\cdot4)^2=256$. The difference is 1040. | 1,710 → 1,450 |
| 4 | Consider the five possible start positions for 2018 in eight digits. Since the word cannot overlap itself, only the first and fifth occurrences can coexist. The probability is $5/4^4-1/4^8=1279/2^{16}$. | 1,950 |
| 5 | Any connected graph with a cycle permits a safe deletion, while a tree permits none. The fixed number of safe moves is $\binom n2-(n-1)$, odd for $n\equiv0,3\pmod4$. The two arithmetic sums are 1300 and 1275, totaling 2575. | 2,340 |
| 6 | On the diagonal $i+j=n$, the binomial coefficients sum to $2^n$. The nonnegative double sum becomes $\sum_{n\ge0}(2/3)^n=3$. | 1,920 → 1,600 |
| 7 | Among $\binom{210}{2}$ segment pairs, $21\binom{20}{2}$ share a vertex. Each set of four vertices gives exactly one crossing pair. Thus the probability is $(3990+5985)/21945=5/11$. | 2,130 |
| 8 | Cut the cycle at a proposed last vertex, making absorbing endpoints 0 and 10. After the walk reaches either neighbor 1 or 9, it must hit the opposite neighbor before the nearer endpoint. The ruin probability of that crossing is $1/9$ from either side. Hence all nine candidates are equally likely and the expected distance is $(2(1+2+3+4)+5)/9=25/9$. | 2,880 → 2,530 |
| 9 | The middle point is fixed because $f$ commutes with the reversal. The six swapped pairs form blocks with cycle length $2\ell$, where $n\equiv\ell\pmod{2\ell}$. Thus all block sizes must have the same 2-adic valuation, which is also sufficient. Each labeled block of size $\ell$ has $2^{\ell-1}(\ell-1)!$ cycles. The partitions $1^6,3+1^3,3+3,5+1,2+2+2,6$ give counts $1,160,640,2304,120,3840$, totaling 7065. | 3,280 |
| 10 | The first column is a monochromatic vertical tile in two ways, or is mixed and forces an identical neighbor in two ways. The greedy split is canonical, so $a_n=2a_{n-1}+2a_{n-2}$ with $a_0=1,a_1=2$. The desired probability is $\sum_{n\ge1}a_n/8^n=(1-2/8-2/64)^{-1}-1=9/23$. | 3,220 → 2,800 |

### Geometry

[Problem paper](https://berkeley.mt/archives/bmt-2018/GEOSP18.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2018/GEOSP18A.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Using $S=6s^2$ and $V=s^3$ gives $S^3/V^2=6^3=216$. | 980 |
| 2 | The chord through the two shared square vertices is a diameter of $m$. On the side away from $A$, subtract the unit-circle segment, of area $\pi/4-1/2$, from the half-disk of area $\pi/4$. This leaves $1/2$. | 1,620 |
| 3 | Heron gives $A^2=s(s-a)(s-b)(s-c)$ with $s=1/2$. The last three factors sum to $1/2$, so AM–GM gives $A^2\le(1/2)(1/6)^3=1/432$, attained by the equilateral triangle. | 1,680 |
| 4 | The six lines have 15 pairwise intersections counted with multiplicity. Each line meets only five others, so it can pass through at most two triple points. At most four triples are possible, leaving at least $15-2(4)=7$ distinct points. Join every pair among $(0,0),(1,0),(0,1),(2,3)$ to attain four triples with no parallel lines. | 2,500 → 2,050 |
| 5 | Rescale the square to side 2. A triangle is obtuse exactly when the chosen point is inside the side's inward unit semicircle. Opposite semicircles cannot overlap in positive area. The lenses from adjacent sides have area $\pi/2-1$ each, so four lenses divided by square area 4 give the same value. | 2,130 |
| 6 | If one of the two sides at most 10 is at most 9, area is bounded by 45. The sides $10,10,14$ exceed that bound. For the $10,10,c$ family, area squared is $c^2(400-c^2)/16$, maximized when $c^2$ is closest to 200. Thus $c=14$ gives $7\sqrt{51}$. Restore the printed coefficient from outside the radical. | 2,030 |
| 7 | Write the tangent as $y-mx=29$. The maximum of $y-mx$ on the ellipse is $\sqrt{400+100m^2}$ by Cauchy, attained at a point on the ellipse. Thus the positive slope is $21/10$. | 2,290 → 1,900 |
| 8 | Let the tangent lengths adjacent to the side of length 39 be $x,y$, and the third be $z$. Then $x+y=39$, $x,y\ge z$, and Heron gives $xy=100+3900/z$. Since $xy\ge z(39-z)$, the increasing lower bound and decreasing right-hand side imply $z\le15$. Equality at $(15,24,15)$ gives area $10(39+15)=540$. | 2,940 → 2,840 |
| 9 | Heron gives $A^2=3a^2(a^2-4)/16$. For integral area, write $a^2-3k^2=4$. Reduction modulo 4 makes $a,k$ both even, giving the Pell equation in $a/2,k/2$. Multiplying by $2-\sqrt3$ descends to $(1,0)$, so the first $a$ are $2,4,14,52$. For $a=52$ the area is integral. | 2,780 |
| 10 | At a cut offset $t\ge0$, the curved cap areas are $2\pi(1\pm t)$, giving $t=1/2$ and disk area $3\pi/4$. Adding the disk to each surface changes the ratio to $(3+2t-t^2)/(3-2t-t^2)$, which equals 3 at $t=\sqrt7-2$. The disk area is then $(4\sqrt7-10)\pi$. Practice marks both readings beside the source. | 1,920 |

## BMT problem audit, 2019 individual rounds (2026-11-27)

Solved all 30 questions and reviewed each statement, answer, card filing, and author estimate. Shorter routes reduced several estimates. The biased-coin question went up because the published construction does not prove the requested minimum.

### Algebra

[Problem paper](https://berkeley.mt/archives/bmt-2019/algebra-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2019/algebra-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The quadratic factors as $(x-3)(x-6)$, so only 4 and 5 work. | 930 |
| 2 | The reflection sends $(x,2x)$ to $(2x,x)$. Their distance is $\sqrt2x$, so the point is $(4,8)$. | 1,080 |
| 3 | Complete squares to get $(a-2)^2+(b-4)^2=50$. The offsets are signed permutations of $(1,7)$ and $(5,5)$, giving 12 points. The offsets cancel by central symmetry, leaving $12(2+4)=72$. | 1,460 |
| 4 | The disk has radius $\sqrt{10}$ and lies wholly in the $20$-by-$20$ sampling square. The area ratio is $\pi/40$. | 1,390 |
| 5 | Base 1 gives two roots summing to 10. Exponent 0 gives two further roots summing to $-5$, neither with base zero. Base $-1$ occurs at $x=-1,11$, with respective even exponents $-2,178$. These add 10, for a total of 15. | 1,770 |
| 6 | The circle is centered at $(4,3)$ with radius $\sqrt5$, so $y$ is positive throughout. A line $x=ky$ touches it when $(4-3k)^2=5(1+k^2)$. The two extreme ratios are $1/2$ and $11/2$. | 2,030 → 1,820 |
| 7 | Newton's sums reduce the condition to $a(3b-a^2)=4$. Testing the positive and negative divisors of 4 yields $(-4,5),(-1,-1),(2,2)$, so the count is 3. | 2,130 |
| 8 | For head and tail probabilities $p,q$, the fourth-root filter gives $[1+(q-p)^{100}+2\operatorname{Re}(q+ip)^{100}]/4$. The complex number has argument $75^\circ$ and squared modulus $2/3$. The correction is $(1+2^{50})/(4\cdot3^{50})$. The tuple $(4,25,4,9,25)$ attains 67. For minimality let $N=1+2^{50}$, $D=4\cdot3^{50}$, which are coprime. Enumerate positive $a,b$ with $a+b\le64$, keep pairs with $N$ dividing $1+a^b$, then test positive $c,d,e$ with $c+d+e\le67-a-b$ against $cd^e=D(1+a^b)/N$. Exact integer arithmetic finds just the tuple above. | 2,670 → 3,150 |
| 9 | For each $n$, the exponent in turns is $[1+\cdots+\lfloor(n-1)/2\rfloor]/(2n)$. Summing over the ten values gives the reduced fraction $3403/1260$. Thus the smallest positive exponent is 1260. | 2,340 → 2,160 |
| 10 | The quadratic form is $[(2x+y+z)^2+5(y-z)^2]/2$. For $y=z$, the first linear form is $-2,0,2$, giving $200+201+200=601$ triples. For $y-z=\pm1$ that form is $\pm1$, giving 200 for each of four choices. The inclusive bound yields 1401. | 2,560 |

### Discrete Math

[Problem paper](https://berkeley.mt/archives/bmt-2019/discrete-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2019/discrete-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | A run reaches length 2019 with probability $p=2^{-2018}$. Independent runs alternate faces. The desired event is that the first successful run is even-numbered, with probability $p(1-p)/(1-(1-p)^2)=(2^{2018}-1)/(2^{2019}-1)$. The official final value is correct, but its recurrence counts an initial successful run toward the opposite-face event. | 2,130 → 1,820 |
| 2 | Condition on a tail. The two-tailed coin contributes weight 1 out of $1+9/2$, giving $2/11$. | 1,360 |
| 3 | The sum of the 15 degrees is 150. Each mutual hug corresponds to an edge counted twice, giving 75. | 1,080 |
| 4 | Rearrange to $(2a-35)(2b-35)=1225$. Positivity and $a<100$ exclude all distinct factor pairs except $(49,25)$ in the given order. Thus $a=42,b=30$, with sum 72. The solution booklet reverses the labels. | 1,740 |
| 5 | Modulo 11 the power is 1. Modulo 101 it reduces to $2^{10}\equiv14$. The number 1024 is in range and has both residues. | 1,740 |
| 6 | From $n(n+1)/2\le1000$ get $n\le44$. For $n=2k$, primes $k$ with $2k+1$ prime are $2,3,5,11$. For $n=2k-1$, primes $k$ with $2k-1$ prime are $2,3,7,19$. That gives eight values. | 1,830 → 1,880 |
| 7 | Only three-digit numbers can change direction. For middle digit $m$, there are $m(m-1)$ peaks and $(9-m)^2$ valleys, as the leading digit is nonzero. The total $240+285=525$ gives average $525/999=175/333$. | 2,130 → 1,870 |
| 8 | A prime divisor has $p-1$ dividing 20, so it is 2, 3, 5, or 11. Including 11 leaves totient 2, giving $33,44,66$. Without 11, the factor 5 in the totient requires $5^2$, giving $25,50$. Their sum is 218. | 2,190 |
| 9 | The fourteen values $ze^{ki\pi/7}$ are the roots of $X^{14}-z^{14}$. The logarithmic derivative at 1 gives $14/(1-z^{14})=14/(1+i)=7-7i$. Thus $a+b=14$. | 2,450 → 2,290 |
| 10 | Use inclusion-exclusion on the multiples of $p,q$. Writing $Q=pq$, the scaled square sum $6S(Q)/Q^2$ simplifies to $2Q-2p-2q+3-(1/p+1/q-1/Q)$. The bracketed fraction is strictly between zero and one. The integer part in the requested form is $7561$. | 2,990 → 2,350 |

### Geometry

[Problem paper](https://berkeley.mt/archives/bmt-2019/geometry-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2019/geometry-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The diagram gives $EK=1$, $AS=4$, and four triangular-lattice levels between the parallel sides, for height $2\sqrt3$. The trapezoid area is $5\sqrt3$. | 1,130 |
| 2 | No point can lie inside a triangle formed by three others, since one of the three angles around it would be at least $120^\circ$. Thus every four points form a convex quadrilateral with all angles at most $90^\circ$, hence a rectangle. Three vertices of a rectangle determine its fourth vertex, so a fifth point is impossible. A square attains four. | 2,030 |
| 3 | Since $D-A=C-B$, the second parallelogram gives $N=M-(C-B)$. Thus $C-N$ has length $3BC/2=51/2$. | 1,390 → 1,210 |
| 4 | The product of the legs is 8 and their squared sum is 144. The leg sum is $\sqrt{144+16}=4\sqrt{10}$, so the perimeter is $12+4\sqrt{10}$. | 1,520 |
| 5 | The ellipse has focal separation 5 and major axis length $5\sqrt2$. Its semiaxes are $5\sqrt2/2$ and $5/2$, giving area $25\sqrt2\pi/4$. | 1,830 |
| 6 | Put $A=(0,0)$, $E=(5,0)$ and $B=(9/5,12/5)$. The bisector theorem gives $P=(3,3/2)$. Since $D=2E$ and $CD\parallel BE$, intersection $M$ is $2P$. Thus $PM=3\sqrt5/2$ and the ratio to perimeter 12 is $\sqrt5/8$. | 1,920 |
| 7 | Place the longer base at horizontal coordinates $[-1,1]$ and the upper base at height $h=\sqrt3/2$ over $[-1/2,1/2]$. Let $e$ be the coordinate of $E$. Reflecting the two lines about the vertical axis gives $\tan(\angle AGB/2)=|e+1/2|/h$. The excluded interval has length $2h\tan15^\circ$, so the probability is $1-h\tan15^\circ=5/2-\sqrt3$. | 2,450 → 2,290 |
| 8 | The perpendicular bisector of the two reflections of $G$ across the sides through $A$ passes through $A$ and is the isogonal of $AG$. Thus $AO_G$ is the $A$-symmedian and $BX:XC=169:225$. Subtracting $BX=1183/197$ from 7 gives $196/197$. | 2,990 → 2,460 |
| 9 | Normalize the two equal orthogonal edges to 1. Pitot fixes the symmetric locations of $E,G$, and the formulas below bound the section area for every valid height. The limiting area ratio is $\sqrt{225-96\sqrt2}/7$, so the answer remains 330. The printed claim of a valid section at every height is unnecessary and fails for small heights. | 3,580 |
| 10 | Put $B=(-6,0),C=(6,0),A=(0,h)$. Eliminating the proportional squared distances gives the circle centered at $(-82/3,0)$ with radius $80/3$ and the line $(92/3)x+2hy=h^2-36$. For one intersection, tangency requires $(h^2-1260)(h^2+20)=0$. The positive height is $6\sqrt{35}$ and the area is $36\sqrt{35}$. The worked solution uses base 18 instead of the printed 12. | 3,280 → 2,860 |

For Geometry #9, take $B=(0,0,0)$, $A=(1,0,0)$, $C=(0,1,0)$, $D=(0,0,h)$ and let $L=\sqrt{1+h^2}$. Write $F=(0,0,f)$ and $E=(1-s,0,sh)$. Pitot on $AEFB$ gives $EF=sL+f-1$. Squaring gives $s[1-L+(h+L)f]=f$, so symmetry gives the same $s$ for $G$. Pitot on $CGEA$ then gives $s=2/(1+\sqrt2L)$. Let $u=1-s$, $q=sh-f$ and $K=s(L+h)-1$. The equation $\sqrt{u^2+q^2}+q=K$ gives $K>0$ and $q=(K^2-u^2)/(2K)$. The area ratio is $u\sqrt{u^2+2q^2}$.

Write $r_0=\sqrt2$ and $t=L-h$. For $q<0$, $K<u$ gives $h/L<r_0-1$, hence $h<1/2$ and $|q|\le uh<1/2$. For $q\ge0$ we have $t^2\le r_0-1$. Put $W=1+r_0t+t^2$ so $K>0$ gives $W<2r_0$. Substitution shows that $q_\infty-q$ has the sign of $3-t(t^2+1-3r_0)-3(1+r_0)t^2$, where $q_\infty=(6\sqrt2-4)/7$. The sign is positive because $t^2\le r_0-1$. Thus $|q|<q_\infty$ for all valid finite heights. For large $h$, $s\to0$ and $f\to(4+\sqrt2)/7$, which lies strictly between 0 and $h$. The convex sections then satisfy Pitot and have inscribed circles by its converse. As $h\to\infty$, $u\to1$ and $q\to q_\infty$, proving the stated supremum.

## BMT problem audit, 2020 individual rounds (2026-11-27)

Solved all 30 questions from the printed papers and compared the verified routes with the recorded difficulty, cards and topics. All answer values agree with the current keys. Two Geometry solution notes flag errors in the published reasoning. Fourteen author estimates were revised. Codex's PR #463 (merged as 04cfdcc) carries the data; it recorded a pause after 2020 at the owner's request, and PR #464 then resumed with 2021.

### Algebra

[Problem paper](https://berkeley.mt/archives/bmt-2020/algebra-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2020/algebra-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | There are twelve five-second blocks, with one through twelve tosses per second. The total is $5(1+\cdots+12)=390$. | 880 |
| 2 | Viète gives $a+b=-2020$ and $ab=c$. The ratio sum is $(a+b)^2/c-2=98$, so $\sqrt c=202$. | 1,270 |
| 3 | The remaining monic linear factor repeats one root $j$ from 1 through 2020. The value at 2021 is $2020!(2021-j)$ and its mean is $2021!/2$. This exceeds $2020!$, so the minimum factorial index is 2021 and the requested sum is 2023. | 1,650 |
| 4 | From $\varphi^2=\varphi+1$, the coefficients of $\varphi$ are $F_n$ starting at $F_0=0$. The sum through $F_{10}$ is $F_{12}-1=143$. | 1,650 |
| 5 | Substituting $y=1$ gives $f(1)=2$. Then $x=y$ gives $f(x^2)=f(x)^2-2$. Starting at 3, the last two digits alternate between 07 and 47 after the first step. The even iterate 2020 gives 47. | 2,080 → 1,860 |
| 6 | Cancel factorials to get $18/[(n-2)(n-1)n(n+1)]$. This is six times the difference of the consecutive three-factor reciprocals. The sum is $6(1/6-1/990)=164/165$, giving 329. | 1,920 → 1,740 |
| 7 | The three differences have sum zero, so the sum of their cubes is three times their product. Multiplying gives $(ab-1)(bc-1)(ca-1)/5$. The middle coefficients cancel since $ab+bc+ca=5(a+b+c)$. This gives $72/5$, hence 77. | 2,240 |
| 8 | Cauchy applied to $(x^2-2,2x)$ and $(2,y^2)$ bounds $2(x^2+xy^2)-4$ by the displayed radical. Swapping $x,y$ gives the companion inequality. Average them and use equality at $(2,2)$ to get $C=4$. | 2,940 → 2,490 |
| 9 | Exact enumeration over the 90 possible values of each variable leaves only $(52,36,25)$, checked directly in the printed cubic. The sum is 113. The sum-of-cubes factorization also rewrites the left-hand difference as a positive linear factor times half the sum of squared differences among $a,\sqrt[3]3b,\sqrt[3]9c$. | 3,280 |
| 10 | The quotient is the normalized dot product of $(a_k-2,1)$ and $(a_{k+1}-2,1)$. Their angles decrease from $\pi/2$ to 0, so the principal inverse cosines telescope to $\pi/2$. The floor is 157. | 3,280 → 2,600 |

### Discrete Math

[Problem paper](https://berkeley.mt/archives/bmt-2020/discrete-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | There are $5!-4!=96$ arrangements after excluding those starting with B. | 830 |
| 2 | A valid pair contains a multiple of 4, or consists of two numbers congruent to 2 modulo 4. The count is $\binom{100}{2}-\binom{75}{2}+\binom{25}{2}=2475$. The probability is $1/2$ and the requested sum is 3. | 1,430 |
| 3 | Wilson gives $-1\equiv100!\equiv2(98!)\pmod{101}$. Thus the remainder is 50. | 1,550 |
| 4 | The middle light is on after three guaranteed switches. Each end light is switched with probability $2/3$ each time, and the probability of odd parity is $14/27$. The expectation is $55/27$, giving 82. | 1,890 → 1,710 |
| 5 | The expected sign of one factor is $1/3$, so $2P-1=(1/3)^{2020}$. Its denominator has only prime 3, so the largest possible exponent is 2020. The sum is 2024. | 2,080 → 1,790 |
| 6 | The subset count is $2^{1000}(2^{1020}-1)$. LTE gives $v_3(4^{510}-1)=v_3(3)+v_3(510)=2$. | 2,190 |
| 7 | Shift the variables by one and sort them as $x\le y\le z$. The equation is $z(xy-2)=2(x+y+2)$, so all are positive and $x(y^2-2)\le4y+4$. The only integral solutions in order are $(1,3,12),(1,4,7),(2,2,6)$. Their permutations give $6+6+3=15$. | 2,500 |
| 8 | Keep ambassadors whose subtree contains at least 71 people including themselves. An executive has two children in this forest, and the number of leaves is the number of such branch vertices plus the number of components. Leaf subtrees are disjoint and each uses at least 71 people. Thus $2019\ge72E+71$ and $E\le27$. A full binary tree with 27 internal vertices and 28 leaves, each expanded to a 71-person chain, fits with four spare people. | 2,880 → 2,640 |
| 9 | On the torus the shuffle is multiplication by the integer matrix $A=\begin{pmatrix}3&1\\1&2\end{pmatrix}$. Fixed points of the third iterate correspond to cosets of $(A^3-I)\mathbb Z^2$ in $\mathbb Z^2$. Their count is $|34\cdot14-20^2|=76$. | 3,050 → 2,630 |
| 10 | For odd moduli, $4(x^2+x)+1=(2x+1)^2$ counts square residues. At $p^k$, count zero and add $\phi(p^{k-2j})/2$ for each even valuation $2j<k$. The sums through exponent 4 are 49 at $p=3$ and 329 at $p=5$. CRT gives product $7^3\cdot47$, and the prime sum is 54. | 3,340 → 2,770 |

### Geometry

[Problem paper](https://berkeley.mt/archives/bmt-2020/geometry-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2020/geometry-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Eight cuts add 16 circular faces with radius $5/2$. The increase is $16\pi(5/2)^2=100\pi$. | 880 |
| 2 | Center distances give $r_1+r_2=1$. Then $r_1^2+r_2^2=2(r_1-1/2)^2+1/2$ is minimized at equal radii. The answer is 3. The second official proof uses a variable lower bound that alone does not give the minimum. | 1,360 |
| 3 | The rectangle's diagonal gives $AB=1,BE=\sqrt3$. The right triangular base has $BC=\sqrt3$, so the prism volume is $3/2$ and the requested sum is 5. | 1,520 |
| 4 | The tangency rays exit the large circle at $(-5,\pm5\sqrt3)$ when Alice is at $(10,0)$. The wedge inside both rays has area $100\pi/3+50\sqrt3$. Within it, the visible region in front of the pillar contributes $25\sqrt3-25\pi/3$. The total visible area is $175\pi/3-25\sqrt3$, giving 156. | 1,860 → 2,110 |
| 5 | Each smaller square combines perpendicular side directions with weights $1/2020$ and $2019/2020$. The area ratio is $(1+2019^2)/2020^2$. The series sums to $2\cdot1010^2/2019$ in lowest terms, so the answer is 3031. | 2,130 |
| 6 | The two length-6 edges are opposite, and the four other edges are 5. Realize them by alternating corners of a box with coordinate half-lengths $u,v,w$ satisfying $u^2=v^2=9/2,w^2=7/4$. The determinant gives volume $8uvw/3$, hence squared volume 252. | 2,290 → 2,440 |
| 7 | The chord $AC=12$ gives $\cos\angle AOC=7/25$, so the half-angle cosine is $4/5$. The circumcenter $P$ lies on the bisector and the perpendicular bisector of $AO$, giving $AP=OP=25/4$. The projection of $AO$ onto $AQ$ is $50/AP=8$, so $AQ=16$ and $AP/AQ=25/64$, giving 89. | 2,400 → 2,070 |
| 8 | The reflected medians are symmedians. Their squared-side ratios give $[KAB]:[KBC]:[KCA]=17^2:14^2:12^2$. These are collectively coprime and sum to 629. | 2,830 → 2,340 |
| 9 | At a minimum there cannot be four strict corners. Flex the three sides through four successive corners with the closing chord fixed. Bretschneider's formula and the strict increase of the opposite angle sum with the opposite diagonal allow a small area decrease while preserving convexity. The perimeter $F_{2022}-1$ is odd, so a flat polygon is impossible. Among integer triangles of odd perimeter $2L+1$, the three Heron factors are at least $1/2$ and have fixed sum, so their product is smallest when two equal $1/2$. Reserve one side of length 1 and divide the remaining Fibonacci sides into equal groups using $F_{3j-1}+F_{3j}=F_{3j+1}$. This gives area $\sqrt{(F_{2022}-2)^2-1}/4$. Squaring any proposed encoding forces $4\mid d$ since the radicand is odd. Under a total at most 2029, $a\le2023$, with $a\le2021$ too small and $a=2023$ forcing $b=c=1,d=4$, which is too large. Only $(2022,2,1,4)$ works. | 3,580 |
| 10 | Take $R=(-5,0),S=(5,0),A=(0,12)$ and $P=(10,36)$. Set $L=SP=\sqrt{1321}$ and $B=S+t(P-S)$. The ellipse condition yields $100t+52L|t|=576$. The intersection $Q=R+v(B-R)$ with $AS$ gives $v=1/(1+2t)$, selecting $t=576/(100-52L)<0$ by $v>1$. Then $RQ+SQ=(26+(L-39)t)/(1+2t)=39+L$. The perimeter is $78+2L$, giving $78+5284=5362$. | 3,700 → 3,050 |

Validation (Codex): repository gates, generated book notes and the seven CI unit suites passed; the regenerated difficulty snapshot matches its source data; Chromium showed both 2020 Geometry notes to the right of the official solution link in Practice and Arena review.

## BMT problem audit, 2021 individual rounds (2026-11-27)

Independently solved all 30 questions from the 2021 individual papers and reviewed the existing cards, topics and author-estimated difficulty. Sixteen Elo estimates were revised. The import had placed the coefficient under the radical in the official answers to Geometry #3, #7 and #10; those answers are restored, as is the eight-term example in the statement of Discrete Math #3. Notes beside the official solution links flag two Algebra write-up slips and two Geometry optimality arguments. Codex's PR #464 (merged as ea04837) carries the data. Validation (Codex): the full gate suite; exact-answer checks of the corrected radical forms and the scoring dispositions; Chromium placement of the grading notes in Practice and Arena review; the 2021 statement check parsed 205 KaTeX formulas with zero errors.

### Algebra

[Problem paper](https://berkeley.mt/archives/bmt-2021/algebra-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2021/algebra-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Subtract the equations to get $2x=6$, so $x^4=81$. | 780 |
| 2 | Both affine compositions have the same linear coefficient. Their difference is constant, so the next value remains 20. | 1,300 → 1,030 |
| 3 | The floor equation requires $8\le x\lfloor x+2\rfloor<9$. On the nonnegative bands this gives $[2,9/4)$. On the negative bands only $x=-4$ works. The smallest strict upper bound is $9/4$, even though the official prose omits two valid endpoints. | 1,590 → 1,400 |
| 4 | With $u=\sin\theta+\cos\theta$, the condition is $u^2-(u^2-1)^2/4=0$. The only feasible values are $u=\pm(\sqrt2-1)$. The objective is $(1+u)^2/2$, so its maximum is 1. | 1,770 |
| 5 | For integer part $m$ and fractional part $t$, solve $t=2020m/(m-2020)$. The restriction $0\le t<1$ leaves $m=0,-1$. The two real solutions sum to $-1/2021$. | 1,830 |
| 6 | At $x=1/2$ and $x=-1$, the other two function values cancel when the equations are added. Thus $2f(1/2)=9+9/4$. The official prose misnames its second substitution, though its displayed equation uses the correct input. | 2,130 → 1,840 |
| 7 | For a nontrivial 2021st root, $z^{2020}=1/z$. The terms for $z$ and $1/z$ sum to 1, giving 1010 pairs. | 2,030 → 1,810 |
| 8 | If $c$ is the hypotenuse, then $r^2=2c^2+2s$, so $s/c^2=\sqrt2+1/2$. This is the maximum of $u+(u^2-1)/2$ for $u=(a+b)/c\le\sqrt2$, forcing equal legs. The root product gives leg cube $4/27$ and area $\sqrt[3]2/9$. | 2,290 |
| 9 | For $n\ge3$, a factorization of $P=x^n+x+1$ with no factor in common with its reciprocal would give $PP^*=KK^*$ by reversing just one factor. The middle coefficient 3 is the sum of squares of the coefficients of $K$. Its two end coefficients have modulus 1 and comparing supports forces its remaining monomial to have degree 1 or $n-1$, giving $K=\pm P$ or $\pm P^*$. Either forces a common factor after all. A common root satisfies $x^{n-2}=1$ and $x^2+x+1=0$, so the feasible degrees are 5, 8, …, 98. Exact factorization over $\mathbb{Q}$ for all 100 degrees also gives sum 1648. | 3,340 |
| 10 | The diagonal sum counts each integer up to $n$ once by its square-free part, so its two contributions total $2n^2$. The cross term changes by $\sum_{k\mid n,\ k\text{ square-free}}\tau(n/k)=\tau(n^2)$. Hence the difference is $4n-2-6\tau(n^2)$. The exact divisor counts give a negative difference at 60 and none from 61 through 100. | 3,520 → 2,940 |

### Discrete Math

[Problem paper](https://berkeley.mt/archives/bmt-2021/discrete-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Subtract the two monochromatic sets from $\binom63$ to get 18. | 930 |
| 2 | The common values are $13$ modulo $20$. The values $13,33,\ldots,2013$ give 101 terms. | 1,230 |
| 3 | Reserve one of every number. The four remaining terms give sums from 4 to 40 in steps of 3, all attainable using four offsets in $\{0,1,2,3\}$. There are 13 values. Restore the printed example $1+1+1+4+7+7+10+10=41$. | 1,390 → 1,290 |
| 4 | The process is invariant under all relabelings, so its 16 captains form a uniformly distributed 16-subset of 64. The chance for the two named players is $(16/64)(15/63)=5/84$. | 1,520 → 1,240 |
| 5 | Let $s=a+c$. The sum is $101s+20b$. The three-digit palindromes require $1\le s\le9$ and $0\le b\le4$, giving $5(1+\cdots+9)=225$. A four-digit palindrome starts and ends in 1, so $s=11$ and the only possibility is $1111$. This gives eight more, totaling 233. | 1,710 |
| 6 | For $n=\prod p_i^{e_i}$ the divisor count is $\prod(ne_i+1)=5^2\cdot13$. One prime gives $ne=324$, with only $n=3^4=81$. Two primes give factor pairs $(5,65)$ or $(13,25)$, and the common divisors of their decremented factors leave only $n=12$. Three primes would force $n\mid4$. The sum is 93. | 2,080 |
| 7 | Starting at $2m$, delaying the first halving by $2r$ increments costs at least $r$ more than halving first and then making $r$ increments. An odd input must increment first. Reversing the optimal steps gives moves of costs 1 and 2 from every node except 1, which has only the move to 2. The count is $1+\sum_{j=0}^{11}F_{j+1}=377$. | 2,450 |
| 8 | The conditional mean of the next digit given $p_i$ is $(p_i+9)/2$, so $\mathbb E p_i=9-(9/2)2^{-i}$. The discounted decimal sum is $1-9/19=10/19$. | 2,560 → 2,130 |
| 9 | Multiplying by $101!$ gives terms $k!(101-k)!$. Wilson reduces each to $(-1)^kk$ modulo 101. The five consecutive odd/even pairs each contribute 1. | 2,720 → 2,080 |
| 10 | A shortest odd cycle would have length 5, 7, or 9. Each outside vertex can connect to at most half its vertices, rounded down. Mantel on the outside graph gives total edge bounds 21, 18, and 13, respectively. Thus the graph is bipartite. It is connected because a disconnected triangle-free graph on ten vertices has at most 20 edges. Its unique parts have sizes 4+6 or 5+5. Count $\binom{10}{4}\binom{24}{2}+\tfrac12\binom{10}{5}\binom{25}{3}$ and divide by $9!$ to get $23/24$. | 3,340 → 3,060 |

### Geometry

[Problem paper](https://berkeley.mt/archives/bmt-2021/geometry-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2021/geometry-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The cut adds twice its length to the original perimeter. The diagonal has length 29, so the maximum total is $82+58=140$. | 980 |
| 2 | Six centers separated by at least 2 fit in an equilateral triangle of side 4. Offsetting gives an outer side of $4+2\sqrt3$ and area $12+7\sqrt3$. Oler's packing inequality verifies that no other triangle does better, as detailed below. | 1,950 → 3,150 |
| 3 | The two horizontal sides are 7 and 4 and their vertical separation is $3\sqrt3$. Reflecting $B$ in $CD$ straightens the equal-angle route. Its length is $\sqrt{11^2+27}=2\sqrt{37}$. Restore the printed radical coefficient. | 1,800 |
| 4 | The turning angles $165^\circ$ and $-120^\circ$ repeat eight times. At each reflex vertex the two unit sides form an equilateral notch. The notch chords bound a unit regular octagon, so the area is $2+2\sqrt2-2\sqrt3$. | 1,950 |
| 5 | The right angle gives $AB=10$ and $MT=5$ for its midpoint $M$. Equal tangent powers put $M$ on $PQ$ and give $MP\cdot MQ=25$. The nearer tangent is on the $Q$ side, so $MP=9$, $MQ=25/9$, and $PQ=56/9$. | 2,030 |
| 6 | The official unfolding supplies a route of length $\sqrt{41}$. An exact enumeration on the 72 unit surface faces finds no shorter route, including routes through an intermediate surface vertex. See the method below. | 2,560 → 3,210 |
| 7 | With $B$ at the origin and the line horizontal, write $A=(u,7)$, $C=(v,-4)$. Their squared lengths are $s^2$, and the $120^\circ$ dot product gives $uv=28-s^2/2$. Squaring gives $(s^2-49)(s^2-16)=(28-s^2/2)^2$. Thus $s^2=148/3$ and the area is $74\sqrt3$. Restore the printed radical coefficient. | 2,720 → 2,230 |
| 8 | Put $B=(0,0),C=(14,0),A=(9,12)$, so $O=(7,33/8)$. In coordinates translated to $A$, the two circle equations have vertical linear coefficients $123/40$ and $253/24$. Their negatives give the second roots on the vertical line, with difference $112/15$. | 2,880 → 2,480 |
| 9 | With $C=(0,0),D=(3,0)$ take $P=(\sqrt3,1)$ by reflection. The valid equilateral completion is $A=(3/2+\sqrt3,3\sqrt3/2-1)$, and $B$ is $A$ rotated $60^\circ$ about $C$. The midpoints are $B/2$ and $(A+B)/2$. Their area determinant with $P$ gives $(12+5\sqrt3)/16$. | 3,100 → 2,740 |
| 10 | Each line minimum is a reflected-focus distance. Put $c=BC$, $r=\sqrt{14}$, and $d=\sqrt{c^2+r^2}$. Set $A=(0,0)$, $I=(d,0)$ and the antipodes at $(d+r^2/d,\pm cr/d)$. For each target line the square of the reflected distance is $PQ^2+4d_Pd_Q$, with $d_P,d_Q$ the signed point distances. As detailed below, the four squares are 72. The sum is $24\sqrt2$. Restore the printed radical coefficient. | 3,700 → 3,180 |

**Geometry #2 lower bound.** For an enclosing triangle with area $K$ and perimeter $P$, the inward parallel triangle for the centers has scale $f=1-P/(2K)$. Its area and perimeter are $Kf^2$ and $Pf$. Oler's inequality for centers at distance at least 2 bounds their number by $Kf^2/(2\sqrt3)+Pf/4+1$. At fixed $K$ this right side decreases with $P$: the derivative is $1/4-1/(2\sqrt3)+(P/K)(1/(4\sqrt3)-1/4)<0$. The equilateral triangle minimizes $P$ at fixed $K$. At the candidate area its inward triangle has side 4 and the bound is exactly six, and for a smaller feasible area the equilateral bound is strictly below six.

**Geometry #6 verification.** Keep cube cells whose three indices have at least two coordinates outside the central index. Every edge of the 72 exposed unit squares has two incident faces. A shortest path between vertices decomposes into straight unfoldings, split wherever it visits a surface vertex. From each of the 64 surface vertices and each incident face, enumerate the 21 positive primitive integer directions $(a,b)$ with $a^2+b^2\le41$ in that face's first quadrant. Trace each direction across edges in rational crossing order, reflecting the next square into the planar grid, until its next grid vertex. Include the unit edge walks. This covers all vertex-to-vertex segments that could belong to a path at most the candidate length. The shortest direct unfolding has squared length 41. In the graph without the direct edge, Dijkstra with every length rounded down to $10^{-8}$ gives lower bound $6.41421356>\sqrt{41}$.

**Geometry #10 signed offsets.** Write $w=cr/d$, so $PQ^2=4w^2$. On $EF$ both distances are $2r^2/d$. On each side tangent from $A$ the distances are $2r$ and $2r^3/d^2$. On $BC$ the inward normal has horizontal component $-3r/d$ because the altitude from $A$ is $4r$. Its vertical component has squared magnitude $1/7$. The two distances are $5r/7\pm w/\sqrt7$ with product $16/3$. Substituting each pair gives squared length 72. Each reflected line segment crosses its line because the original signed distances have the same sign, so the four minima are individually attained.

## BMT problem audit, 2022 individual rounds (2026-11-27)

Independently solved the 30 Algebra, Discrete Math and Geometry problems and revised 20 author estimates, raising those that need long casework or geometric coverage arguments. Geometry #7 and #10 have their radical coefficients restored, and #10 accepts both geometrically valid values. The underspecified #5 is excluded from scoring. #9 is marked for self-check after a counterexample to the official minimum, so its exact minimum remains open. The explanations for Geometry #5, #7, #9 and #10 sit beside the official PDF link in Practice and Arena review. Codex's PR #464 (merged as ea04837) carries the data.

### Algebra

[Problem paper](https://berkeley.mt/archives/bmt-2022/algebra-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2022/algebra-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The repeated map $x\mapsto12x-220$ fixes 20. | 690 |
| 2 | For $u=2^x$ the equation is $(u-2)(u-8)=0$. The exponents sum to 4. | 1,230 → 1,010 |
| 3 | For geometric ratio $r$, arithmetic continuation gives $d/a=2r^2-r$. Completing the square yields the attained minimum $-1/8$. | 1,390 |
| 4 | If $m=\lceil x\rceil>0$, then $m(m-1)<mx\le m^2$ forces $m=45$. If $m=-k<0$, then $mx\in[k^2,k(k+1))$. For $k\le44$ this is below 1980, and for $k\ge45$ it starts at 2025 or higher. The answer is $[674/15,2023/45)$. | 1,550 |
| 5 | Reflection about $(24,24,24)$ preserves the sum and sum of squares. It sends $T$ to $48-T$, so the two extrema sum to 48. | 1,710 → 1,390 |
| 6 | $g(x)=f(x+6)-f(x)$ equals $x^4+\lambda\prod_{j=1}^5(x-j)$. Evaluate at $-3,3,9$. The product is odd about 3 and cancels, leaving $81+81+6561=6723$. | 2,080 → 1,860 |
| 7 | Split $1/(1-r^2)$ into the two simple fractions. Summing gives $\tfrac12(P'(1)/P(1)-P'(-1)/P(-1))=2025/2023$. | 1,980 → 1,840 |
| 8 | $G(t)=\prod(x_i+t)$ is monic of degree 2022, with $\Delta^{2022}G(0)=2022!$. The corresponding difference of $2^t$ is 1. Since the earlier samples agree, their final samples differ by $2022!-1$. | 2,720 → 2,280 |
| 9 | The tangent sum and difference identities make $x_n$ the tangent of a Fibonacci-angle sequence. In units of $15^\circ$ the angles are $4,-3,1,-2,-1,-3,-4,-7,-11,-18$. The first undefined tangent, at 10, also makes the original coefficient zero with nonzero right-hand side. | 2,610 → 2,410 |
| 10 | Vieta gives $r=2022-p-q$ and $q^2-(2022-p)q+p^2-2022p+2022=0$. For any root $u$, $1/(u-1)=(u^2-2021u+1)/336$. Substitute both identities into the cyclic definitions and reduce the expanded polynomial with the cubic in $p$ and the monic quadratic in $q$. Exact rational reduction gives the constant $-674$. | 3,340 |

### Discrete Math

[Problem paper](https://berkeley.mt/archives/bmt-2022/discrete-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Choose the two different foods and the shared food in order: $3\cdot2\cdot3=18$. | 780 |
| 2 | A divisor with both a factor 2 and a factor 5 ends in zero. The five pure powers of each prime plus 1 all pass, giving 11. | 1,230 → 1,020 |
| 3 | The coin products $4,8,16$ have probabilities $1/4,1/2,1/4$. Two dice exceed them in 30, 10, and 0 of 36 cases, respectively, giving $25/72$. | 1,390 → 1,250 |
| 4 | Subtract sequences with at most two switches. Choosing the initial winner and switch positions gives $2^{10}-2\left(1+9+\binom92\right)=932$. | 1,550 → 1,420 |
| 5 | A $d$-digit solution has $n\le (9d)^2+18d-2$, excluding $d\ge5$. For $d=4$, the first bound $n\le1366$ makes the digit sum at most 22, forcing $n\le526$. The digit sum is $1\bmod3$ because $n\equiv s(n)\bmod3$, so check $s=25,22,19$ at the top. Only 19 works, giving 397. | 1,800 → 1,940 |
| 6 | Sort the three exponents $i\le j\le k$ and use $2^k$ for the linear coefficient. A positive discriminant requires $2k>i+j+2$. For the complement, deficits $(k-j,k-i)$ can only be $(0,0),(0,1),(0,2),(1,1)$. These account for $8+21+18+21=68$ of 512 ordered draws, giving $111/128$. | 1,950 → 2,210 |
| 7 | The first of $m$ specified cards appears on average at $53/(m+1)$, from uniform gaps. The stopping time is the maximum of the first ace and first king indices, so its expectation is $53/5+53/5-53/9=689/45$. | 2,190 → 1,840 |
| 8 | With $z_n=a_n+ib_n$, $z_{32}=10(3-i)^{31}$. The binomial theorem modulo 31 gives $10(3+i)$, hence 3010. | 2,500 → 2,100 |
| 9 | The even-cardinality projection gives $N=(\binom{84}{42}-\binom{42}{21})/2$. Lucas gives $N\equiv 2\bmod41$ and $22\bmod43$. The Chinese remainder is 1355. | 3,050 → 2,730 |
| 10 | Sum $r_2(d)=4\sum_{k\mid d}\chi_4(k)$ over $d\mid10!$. The prime power contributions for $2^8,3^4,5^2,7$ are $9,3,6,1$, so there are 648 pairs. | 3,160 → 2,860 |

### Geometry

[Problem paper](https://berkeley.mt/archives/bmt-2022/geometry-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2022/geometry-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | On $[0,2]^2$ the creases are $x+y=3$, $y-x=1$, and $x=1$. The remaining outline has vertices $(1,0),(2,0),(2,1),(1,2)$, with maximum separation $\sqrt5$. | 1,080 |
| 2 | The side direction of the outer square has unit vector $(2,1)/\sqrt5$ up to reflection. The projected width of the original square along it is $30/\sqrt5$, giving area 180. | 1,430 |
| 3 | The figure shows the difference of two homothetic regions bounded by rays at A and arcs facing A across the circle centers. The smaller area is $2\sqrt3+4\pi/3$ from two triangles and a $120^\circ$ sector. The larger region has four times that area, so the shade is $6\sqrt3+4\pi$. | 1,650 |
| 4 | The original triangle has area $3\sqrt3$. The moving triangle sweeps one triangular patch outside each original side, each of area $\sqrt3/4$, giving $15\sqrt3/4$. The coverage argument is below. | 1,890 → 2,230 |
| 5 | The tilt makes the difference in the rear track radii $\sqrt{40^2+1^2}$. If the rear wheels turn together, their radii are in ratio $10:9$, making the front rotation $114\sqrt{1601}$ degrees. The printed conditions permit separate rear wheel angular speeds and leave the track radii free up to their difference. Exclude from scoring. | 2,130 |
| 6 | Heron gives inradius $\sqrt{15}/3$ and altitude to $MT$ of $3\sqrt{15}/4$. Scaling the triangle about $B$ takes the incenter to the line $MT$ at factor $9/5$, with its projection between $M,T$. Hence $AY=72/5$. | 1,890 → 1,770 |
| 7 | $\sin(A/2)=\sqrt{15}/6$ gives $\cos A=1/6$. From $AH=2R|\cos A|$, $R=12$ and $BC=4\sqrt{35}$. Restore the printed coefficient. The segment-distance reading gives the same value, as shown below. | 1,950 → 1,840 |
| 8 | The radius at stage $n$ is $\prod_{k=2}^n\sec(\pi/2^k)=2^{n-1}\sin(\pi/2^n)$. The limiting area is $\pi^3/4$. | 2,450 → 2,150 |
| 9 | A radical axis can miss the radical plane from two disjoint spheres. Exact elimination gives 725 intersecting quadruples for one valid family, and a projection bound gives a universal lower bound of 693. The exact minimum remains open in this audit. Use self-check. | 3,100 |
| 10 | The orthic chord gives $|\cos A|=\sqrt3/2$ and the tangent length gives $XA=4\sqrt3$. The two possible triangles give $XY=2\sqrt{21}$ and $2\sqrt{21}/7$, respectively. Restore the published coefficient and accept both values. | 3,220 → 2,870 |

**Geometry #4 coverage.** Put the starting triangle at $v_0=(2,0)$, $v_1=(-1,\sqrt3)$, $v_2=(-1,-\sqrt3)$, and move the vertices linearly over $0\le t\le1$ to $(3/2,\sqrt3/2)$, $(-3/2,\sqrt3/2)$, and $(0,-\sqrt3)$, respectively. Relative to the side $x+\sqrt3y=2$, the three signed values of $x+\sqrt3y-2$ are $t,-2t,-6+t$. The moving edges through $v_0(t)$ meet that side at $x=1-t/2$ and $x=2-t+t^2/4$. Both intersections and $v_0(t)$ lie in the fixed triangle spanned by $v_0(0),v_0(1)$ and the base point with $x=1/2$. For a fixed signed value $0<d<1$, taking the first moving edge and varying $t$ from $d$ to 1 sweeps every $x$ between its endpoint values $2-d/2$ and $1/2+d$. These are the full slice of the fixed triangle. Its base length is $\sqrt3$ and perpendicular height $1/2$. The three such patches have disjoint interiors since each lies in the original hexagon outside one side of the original triangle.

**Geometry #7 segment endpoint.** If the closest point on segment $AC$ were $C$ with a perpendicular projection strictly beyond it, set $c=\cos(A/2)$ and $u=AC$. Then $c^2>7/12$ and $u=6c-\sqrt{36c^2-21}$. Consequently $uc\le 7/2$, since $6h-\sqrt{h(36h-21)}\le 7/2$ for $h\ge7/12$. The angle-bisector length formula gives $YC/BC=1-3/(uc)\le1/7$, so $BC\ge7\sqrt{15}$. But $AH$ gives $BC=4\tan A<4\sqrt{35}<7\sqrt{15}$, a contradiction. The projection is positive along the ray $AC$, so the endpoint $A$ cannot be closest. A projection on the segment is feasible: for $c=\sqrt{21}/6$, use the two positive roots of $z^2-Sz+3S/c$ for $AB,AC$, where $S=\sqrt{21}+\sqrt{581}$ and the larger root is $AC$.

**Geometry #9 counterexample and bound.** Use centers $P_i=(t_i,t_i^2,t_i^3)$ with $t=(-5,-4,-3,-1,1,4,5)$ and radii $r_i^2=R^2+\|P_i\|^2-100^i$ for indices $i=0,\ldots,6$. A Vandermonde determinant shows no four centers are coplanar. For large $R$ all seven radii are nearly equal and each pair intersects in a circle. The radical plane for $i,j$ has equation $2(P_j-P_i)\cdot x=100^j-100^i$. Exact rational elimination over the $\binom{21}{4}=5985$ quadruples gives 725 consistent systems. The four-edge graphs that contain a 4-cycle or a triangle with an edge to a fourth center always give a point, because any four centers are affinely independent. An additional triangle with a disjoint edge gives a point unless the edge direction is parallel to the triangle's plane and the constants are inconsistent. For any particular disjoint edge, project the five other centers along its direction. Their images are distinct and no four are collinear. At most two triples can be collinear, because three triples with pairwise intersections of size at most one would use at least six points. Thus at most $2\binom72=42$ of the official 735 cyclic quadruples can fail, giving the 693 lower bound.

**Geometry #10 two configurations.** Set $B=(0,0),C=(8,0),X=(-4,0)$ and take $A=(u,v)$ with $v>0$. Tangent power gives $(u+4)^2+v^2=48$. The circumradius is 8 by $EF=BC|\cos A|$, so the circumcenter is $(4,h)$ with $h=\pm4\sqrt3$. Subtracting the tangent equation from the circumcircle equation yields $16u+2hv=32$. The two positive-height solutions are $A=(-4,4\sqrt3)$ and $A=(20/7,4\sqrt3/7)$. Project $B$ onto line $AC$ and $C$ onto line $AB$, then intersect the line of the projections with $y=v$. This gives $Y=(2,4\sqrt3)$ and $Y=(-22/7,4\sqrt3/7)$, respectively. The printed segment notation would exclude both configurations if it required both feet inside the segments. The official construction already uses an extended side, so the grader accepts both line interpretations.

## BMT problem audit, 2023 individual rounds (2026-11-27)

Independently solved and reviewed the 30 Algebra, Discrete Math and Geometry problems and revised 24 author estimates against the shortest complete solutions found. The radical coefficients in Geometry #1, #8 and #9 are restored. Six notes beside the official solutions cover the imported keys and several corrections to the official write-ups. Codex's PR #466 (merged as 2199116) carries the data. Validation (Codex): all gates and the short-answer grading suite passed, and the regression checks accept the three restored radicals and reject their imported values. Chromium placed the grading notes beside the official PDF links in Practice and Arena review.

### Algebra

[Problem paper](https://berkeley.mt/archives/bmt-2023/algebra-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2023/algebra-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | Substituting $(20,23)$ gives slopes 1 and 0, with sum 1. | 1,030 → 800 |
| 2 | Equal signs give the difference of magnitudes, 20. Opposite signs give their sum, 23. Both occur, giving 43. | 1,270 → 1,010 |
| 3 | Cancelling $r^{2020}$ gives $16r^3=56$, and $b_6-a_6=40(7/2)^2=490$. | 1,490 → 1,300 |
| 4 | On $[n,n+1]$ the slope is $2n+1$, so $g(x,y)=y^2+(x-y)(2y+1)$. A polynomial that vanishes on each horizontal interval is zero on every horizontal line of integer height and hence everywhere. The value is $529-141=388$. | 1,770 |
| 5 | For the original polynomial $P$, the transformed monic polynomial is $Q(x)=-P(2-x)$. Therefore $B-M+T=1-P(3)=2006$. | 1,770 → 1,510 |
| 6 | For the convergent sum at $z=1/10$, the recurrence gives $(1-z-xz^2)\sum a_nz^n=z$. The sum 1 forces $x=80$. Both characteristic roots $(1\pm\sqrt{321})/2$ have modulus below 10, verifying convergence. | 1,890 → 1,730 |
| 7 | The factors $a\pm ib$ each have degree 5 and the same leading coefficient $\pm1$. Pick any five of the ten roots for the first factor, yielding $2\binom{10}5=504$ pairs. Real coefficients require one root from each conjugate pair, giving $2(2^5)=64$. The difference requested is $504-2(64)=376$. | 2,560 → 2,330 |
| 8 | Vieta gives $t=(x+y+c)(xy+c(x+y))/(xyc)$ for legs $x,y$ and hypotenuse $c$. Set $s=(x+y)/c\in(1,\sqrt2]$ and use $xy/c^2=(s^2-1)/2$. The ratio becomes $s+1+2s/(s-1)$, strictly decreasing on the interval, so its minimum is $5+3\sqrt2$. | 2,290 |
| 9 | An input outside $[0,1]$ leads to strictly negative terms and cannot reach zero. Inside it, write $1-2x_1=\cos\theta$ for $0\le\theta\le\pi$. Then $1-2x_{2023}=\cos(2^{2022}\theta)$, which equals 1 at $2^{2021}+1$ evenly spaced angles. | 2,450 → 2,230 |
| 10 | The cubic factors as $(B+3M-T)(-B+M+4T)(2B-M+T)$. Testing the signed ordered factors of $2023=7\cdot17^2$ in these three linear equations leaves $(B,M,T)=(46,-9,18)$, with factors $1,17,119$ and sum 55. The published intermediate grouping has sign slips. | 2,990 → 3,160 |

### Discrete Math

[Problem paper](https://berkeley.mt/archives/bmt-2023/discrete-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The repeated outer digit is 1 or 6. The digit sum forces the middle digit to be 7 or 6, respectively. Only 171 has distinct outer and middle digits. | 1,230 → 1,050 |
| 2 | Each ordering of the multiset with two copies of each name is valid, with the first occurrence marking entry and the second exit. The count is $6!/(2!)^3=90$. | 1,430 → 1,170 |
| 3 | An increment changes its trailing 9s to 0s. It increases the number of 4s exactly when it changes the preceding 3 to 4. The four possible suffix lengths give $1000+100+10+1=1111$. | 1,620 → 1,400 |
| 4 | The allowed residues modulo 11 are $1,3,6,8$. The range $1,\ldots,499$ contains 45 full blocks plus four entries, so the count is $45\cdot4+2=182$. | 1,550 → 1,300 |
| 5 | Let $q=5/6$. The probability of missing on all $N$ new rolls is $\mathbb E q^N=(1/6)q/(1-q^2)=5/11$. Its complement is $6/11$. | 1,800 → 1,590 |
| 6 | The second gcd reduces to $\gcd(x+17,1715)$. Exclude $2\mid x$, $3\mid x$, $5\mid x+17$, and $49\mid x+17$. CRT gives $384=2^7\cdot3$ per block of $1470$, and $210\cdot2023=1470\cdot17^2$. The endpoint is even and excluded automatically. The prime sum is $14+3+34=51$. | 2,290 → 1,950 |
| 7 | For adjacent sides, the area difference is $1-UV$, with mean $3/4$. For opposite sides, it is $|1-U-V|$, with mean $1/3$ by integrating the two triangles of the unit square. The respective weights are $2/3,1/3$ and the overall mean is $11/18$. | 2,240 → 2,010 |
| 8 | Divisor convolution preserves multiplicativity, and $S_k(p)=1+pS_{k-1}(p)=1+p+\cdots+p^k$. Multiply the three geometric sums for $2,3,5$ modulo 1001 to get 232. | 2,400 → 2,210 |
| 9 | Assign each number one of three section labels, then sort each section in its required direction. Every resulting permutation with a descent has a single contiguous descent run, and there are four assignments, according as its first and last elements move into the middle or stay outside it. The increasing permutation has eight assignments with an empty middle and seven with a singleton. Thus the count is $(3^7-15)/4+1=544$. Each counted permutation also admits a split with both dividers between books. | 2,450 |
| 10 | The other root $\beta$ lies in $(-1,0)$, so $\lfloor\alpha^{1000}\rfloor=\alpha^{1000}+\beta^{1000}-1$. The discriminant 17 is a nonsquare modulo 997 by quadratic reciprocity, since $997\equiv11\bmod17$. Frobenius exchanges the roots. The power sum is thus $\alpha\beta(\alpha^2+\beta^2)=-2(9+4)=-26\bmod997$, and the floor has remainder 970. | 3,160 → 2,830 |

### Geometry

[Problem paper](https://berkeley.mt/archives/bmt-2023/geometry-problems.pdf) · [Official solutions](https://berkeley.mt/archives/bmt-2023/geometry-solutions.pdf)

| # | Independent result and disposition | Elo |
|---|---|---:|
| 1 | The semicircle fits a rectangle of width 4 and height 2, yielding diagonal $2\sqrt5$. Restore the coefficient. | 980 → 830 |
| 2 | The equilateral triangle's center is $3\sqrt3/2$ from a side. A trisection point is $3/2$ from its midpoint, so the circle radius squared is 9 and the area is $9\pi$. | 1,360 → 1,200 |
| 3 | Add the cylinder volume $972\pi$ and the frustum volume $(4\pi/3)(81+135+225)=588\pi$, giving $1560\pi$. | 1,460 → 1,370 |
| 4 | The circle's contact with $BC$ lies between $B$ and $C$, inside the wedge. The tangent lengths from each vertex give $BC=BP+CQ$. Hence the perimeter is $AP+AQ=2\sqrt{17^2-8^2}=30$. | 1,590 → 1,460 |
| 5 | With $B=(0,0),C=(15,0),A=(0,8)$ and the small radius $t$, the centers are $(t,t)$ and $(15-16t,4t)$. Tangency gives $(15-17t)^2=16t^2$. The incircle radius 3 bounds $4t\le3$, leaving only $t=5/7$. | 1,920 |
| 6 | Write $MX=u$, $BM=4u$. Intersecting chords give $AM=CM=2u$. The $45^\circ$ angle makes the circumradius $2\sqrt2u$. Use chord $BX=5u$ to get the central half-angle sine $5/(4\sqrt2)$ and double it, yielding $5\sqrt7/16$. | 1,980 → 1,810 |
| 7 | The triangular face must have side 2, as an apex at distance 2 from the vertices of a side-4 equilateral triangle is impossible. The center projects to the base incenter since the three contacts are on the edges. On the axis, the altitude is $h=2\sqrt{33}/3$. Equating squared distances to base and lateral edges gives axial heights $2h/11$ and $-4h/11$. The latter puts each lateral contact outside its edge. The radius is $3\sqrt{11}/11$. | 2,560 |
| 8 | Write each pair of chord intersections at positions $s_i\mp t_i$ from the corresponding vertex along its oriented side. The circle center projections give $\sum s_i=3L/2$ for side length $L$. Subtracting the corner triangle areas and expanding the side-length squares shows that the area difference has magnitude $\sqrt3/12$ times the squared-length-sum difference. Hence the area difference is $16\sqrt3$. Restore the coefficient. | 2,720 → 2,440 |
| 9 | The angle conditions force $T$ to be the reflection across $BC$ of the ray $MA$, at distance $MT=(BC/2)^2/AM$. This gives $AM\cdot AT=AB\cdot AC$, and the cosine at $A$ then gives $(BC/2)^2=81-126(2/7)=45$. The correct result is $6\sqrt5$. The official cosine-rule line has a factor typo. Restore the coefficient in grading. | 3,050 |
| 10 | Use coordinates centered at $O$ with $BC$ horizontal at height $5r/13$ after reflection. The circle $BOC$ has equation $x^2+y^2=(13r/5)y$. Intersecting it with $OA$ shows $AF$ is $13/5$ times the altitude of $A$ to $BC$. This altitude is $AC(AB/2r)=1$. The circle with diameter $AF$ gives $EG=AF\sin A$ with $\sin A=12/13$. Hence $AF\cdot EG=156/25$ for either configuration. | 3,220 → 2,480 |

**Geometry #8 area and length identities.** For points at positions $x_1,x_2,x_3$ measured clockwise from the three vertices of the equilateral host triangle, subtract the corner triangle areas to get $A=(\sqrt3/4)(L^2-L\sum x_i+\sum_{i<j}x_ix_j)$. By the cosine rule the three squared lengths sum to $Q=3L^2-3L\sum x_i+2\sum x_i^2+\sum_{i<j}x_ix_j$. Take the differences between $x_i=s_i+t_i$ and $x_i=s_i-t_i$. Since the unit edge vectors sum to zero, the circle center projects to coordinates with $\sum s_i=3L/2$. Consequently $\Delta Q=-3L\sum t_i+6\sum s_it_i$ and $\Delta A=(\sqrt3/2)((L/2)\sum t_i-\sum s_it_i)=-(\sqrt3/12)\Delta Q$.

**Geometry #9 configuration check.** Take $B=(0,0),C=(2s,0),M=(s,0),A=(u,v),T=(x,y)$ with $v>0>y$, and write the triangle's angles as $\alpha,\beta,\gamma$ at $A,B,C$. From $\angle BTM=\beta$, the dot and cross products give $x^2-sx+y^2=-su y/v$. If $\psi_M$ and $\psi_C$ are the downward angles of $MT$ and $CT$ from the positive horizontal, then $0<\psi_M<\psi_C<\pi$ and the second given angle equation is $\psi_M=|\psi_C-\gamma|$. The branch $\psi_M+\psi_C=\gamma$ would imply $x>2s$ and $y^2<(x-s)(x-2s)$ because $\gamma$ is acute. But $\sin\beta>\cos\alpha=2/7$ bounds $x$ by $s/2+s/(2\sin\beta)<9s/4$ on the first circle, giving $(x-s)(x-2s)<5s^2/16$. The equation of that circle and $\tan\beta>\cot\alpha=2/\sqrt{45}$ give $-y>4s/\sqrt{45}$, a contradiction. Thus $\psi_C-\psi_M=\gamma$. The equation of the circle $MTC$ is then $x^2+y^2=3sx-2s^2+s(u-2s)y/v$. Subtract the two circle equations to get $T=(s+k(u-s),-kv)$ with $k=s^2/AM^2$. Squaring now gives $(AM\cdot AT)^2=(AM^2-s^2)^2+4s^2v^2=(AB\cdot AC)^2$. The resulting value is realized by $s=3\sqrt5$, $A=(s,9)$, and $T=(s,-5)$.
