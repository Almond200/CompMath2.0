# Audits and reviews

One file for every audit, review and repair log (merged 2026-11-12, at the owner's request; they were thirteen separate files). Each section is the original document, unchanged except that its headings sit two levels lower and its references to the others point inside this file. The newest work is not here: Step H (the HMMT February rounds) records its audits in `CHANGELOG.md` and its status in `PLAN.md`.

**Topic tree**, newest decisions first:

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


## Topic tree

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

### Filing (2026-11-13, in progress)

2020 to 2026 are filed: 195 problems. Problems were read from the exam and its solutions. Three cite no card: 2020 #1 (one fraction) and 2024 #12 (two linear inequalities), whose routes use no card, and 2024 #2 cites only the estimating card. The 2026 problems were read from the "[n pts]" tags, because the exam's header is itself numbered.

