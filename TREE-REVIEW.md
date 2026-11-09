# Topic-tree restructuring review

2026-11-09. Baseline: `57c5fb5`, after all 4,725 problems were filed. The owner requested a synthesis and decisions for larger pruning. This document records the chosen direction and migration order; **the live taxonomy and problem filings have not been changed by this review**. Textbooks remain paused.

## Decision

Keep the four subjects. Reorganize the large umbrellas before splitting more leaves. Split Arithmetic and word problems into three areas; reorganize Counting & Probability into five areas; combine the three related divisibility areas; bring triangle families together. Then remove method-based duplication and review the remaining small leaves individually.

Do not set an arbitrary target such as 300 nodes. The goal is that a student can predict where a problem belongs. A smaller tree that combines unrelated problem kinds would be worse.

## Evidence and limits

`node tools/tree-structure-report.cjs` reproduces the structural census and proposed pool counts from the current data. It follows actual parent links and counts the union of descendant filings. `node tools/tree-audit.js --census` supplies the existing direct-filing, card-home and thin-leaf diagnostics.

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

## 1. Split the arithmetic umbrella into three areas

Replace `alg.word` as an area with these three destinations. Preserve the useful existing topics and leaves beneath them.

| New area | Existing subtrees | Distinct pool | Card homes |
|---|---|---:|---:|
| Arithmetic and proportional reasoning | `alg.word.compute`, `alg.word.ratio`, `alg.word.units.convert` | 347 | 8 |
| Rates, time and everyday quantities | `alg.word.rates`, `alg.word.everyday`, `alg.word.units.calendar` | 195 | 12 |
| Data and averages | `alg.word.stats` | 160 | 5 |

This puts fractions, percentages, ratios and unit conversion together; travel, work, clocks, calendars, money and ages together; and mean/median/graphs together. Calendar problems do not need to share a branch with dimensional conversion. These destinations cover every current `alg.word` filing and all 25 card homes; their overlapping counts are not a partition of 682.

Keep percent change, ratios, arithmetic sequences and similar triangles intact. Their current populations do not justify splitting them by which formula the solution happens to use. TQ20 remains the separately evidenced multi-stage travel candidate; this regrouping does not silently approve it. Do not create a fifth “Arithmetic” subject or scatter elementary arithmetic across Number Theory merely to balance subject sizes.

## 2. Replace the counting umbrellas with five areas

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

Retire the empty intermediate wrappers `cp.tech`, `cp.struct` and `cp.graph` after moving their children; these wrappers currently have no direct problem assignments or card homes. Absorb `cp.exp` as a topic within Probability and expectation, preserving its recently consolidated children. Do not undo that introductory pruning.

Review `cp.basic.case` and `cp.tech.bij` in the first destination: their placement above ensures coverage, but it is not an endorsement of a technique label on unrelated problems. Their narrow standing definitions still apply. Rename Stars and bars to Distributions, Inclusion-exclusion to Overlapping sets and excluded conditions, and Generating functions to Coefficients of products when the affected pools have been checked against those meanings. The named methods remain discoverable through their cards.

**Symmetry:** collapse `cp.tech.sym.necklace` and `.burnside` into their parent pool, displayed as Counting with rotations and reflections (13 distinct, 17 raw; three card homes). Burnside is not a different kind of object from a necklace or a colored board. The full pool contains ten equivalence-class questions and three questions about configurations satisfying a symmetry condition. The common parent must explicitly encompass both; do not label all 13 “counting up to symmetry.” A future split would be by these two problem types, after the smaller group has enough independent examples, never by whether Burnside appears in the solution.

Examples: 1996 AIME #7 counts board colorings up to rotation; 1990 AJHSME #25 counts patterns up to flips/turns; 2000 AMC 12 #25 uses a free rotation action on an octahedron without needing a general fixed-point average. In contrast, 2013 AIME I #4 and 2018 AMC 10A #20 ask for colorings fixed by specified symmetries; 2024 AIME I #11 asks whether a rotation meets a color condition.

## 3. Combine the related number-theory areas

Merge `nt.div`, `nt.divisor` and `nt.prime` into **Divisibility, primes and divisors**: 344 distinct problems, 403 raw entries, 43 card homes. This reduces Number Theory from seven areas to five, alongside Modular arithmetic, Diophantine equations, Digits and bases, and Integer sequences and special numbers.

Retain the meaningful topics: divisibility conditions, GCD/LCM, prime factorization, primes, divisors, multiplicative functions, and factorials/valuations. Do not turn the 344-problem area into one practice leaf. Currently “prime factorization” is under Divisibility while “primes and primality” is another area; students should find them in the same neighborhood. Factorials and valuations also belong near divisibility rather than being coupled to primes only by the current area name.

Keep counting divisors separate from summing divisors, and keep ordinary divisor pairs separate from factorizations into several factors. A totient question and a Möbius-function question are not interchangeable simply because the latter has only one current example. Preserve the small specialized families until their card homes and contest significance have been reviewed.

## 4. Unify triangle families, with a separate folding destination

Move the right-triangle family from Lengths and angles into Triangles and combine its navigation with `geo.tri.special.right`. Excluding folding, the current candidate pool has 95 distinct problems and seven card homes. Preserve special angle ratios, altitude-to-hypotenuse problems and integer triples as recognizable subtopics. Review the 30-distinct “hidden right triangles” pool for incidental Pythagoras use before retaining all its filings.

Combine `geo.basic.angle.isosceles` and `geo.tri.special.isos` into one Isosceles triangles pool (37 distinct, 40 raw; no card homes). Angle and length questions about an isosceles triangle should not require two unrelated entry points. Put triangle-specific similarity with Triangles, while similarity of general figures/solids remains a general geometric relationship. Read the parallel-segment pool before deciding whether it belongs with triangle similarity or the broader relationship topic.

Move `geo.basic.pyth.fold` out of Pythagoras into the transformation family. Its 15 distinct problems include 2001 AMC 8 #16, a folded-square perimeter problem that does not ask about a right triangle. Folding is a configuration, and Pythagoras is sometimes its tool. Keep folding distinct from a generic reflection question; choose the exact parent after checking all 15 statements against the existing transformation scope.

Keep circles, polygons, coordinates and solids as major areas. Do not combine circle tangency, power of a point and triangle centers simply because they share formulas. Geometry has 316 card homes and a substantial reference corpus beyond the currently imported contests; raw leaf population is particularly weak evidence for deleting its classical families.

## 5. Clean broad or method-based filings before adding leaves

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

## Migration order and safeguards

1. **Make parentage independent of stable ids.** The current builder and gate require each id to extend its parent's id, while `tree-audit.js` infers relatedness by string prefixes. That conflicts with moving an established node without renaming it. Preserve existing ids and meanings; use the explicit parent field for ancestry, depth, cycle checks and subject checks. Amend the prefix requirement in CONVENTIONS §15 and the tooling together, retaining Markdown indentation as the source of parentage. Add regression coverage for a moved subtree, cycles, ancestor redundancy and cross-subject errors. New nodes can still receive readable dotted ids. Do not relax validation without replacements.
2. **Move the category containers.** Apply the three arithmetic destinations, five counting destinations and combined number-theory area. Keep all existing problem/card ids. Check complete before/after descendant unions; an intended aggregate changes, but no problem or card disappears. Record retired empty wrapper ids. Parentage/depth changes are expected; inspect the experimental tree at desktop/mobile sizes.
3. **Perform the semantic pruning.** Read every problem in each affected symmetry, triangle, polynomial, modulus and probability pool. Correct the statement/strategy/cards if needed, check numbers, synchronize recognized twins, and keep one to three most-specific nonredundant filings. For merged leaves, write an explicit old-id → survivor map and remap card homes. A method card can move to a suitable broad home or remain a general method under existing rules; no card is deleted to make counts prettier.
4. **Re-census and validate.** Rebuild the generated tree and required asset versions. Run repository gates, tree-audit regressions and the new parentage regression checks; check all 4,725 filings and 774 card-home entries, twin equality, no dangling retired ids, and preserved problem/card slugs. Confirm the new pool contents by reading, not just by matching totals. Update PLAN and CHANGELOG and commit/push at each coherent batch. T4 and textbook revision remain separate work.

The first implementation batch should therefore be the ancestry prerequisite and the three area regroupings. The semantic filing reviews follow in bounded batches. This synthesis does not claim that those migrations, the full probability review, or a second complete mathematical audit have already happened.

## Validation of this review

The read-only census reproduced the totals and destination populations above. Its destination-coverage report found no uncovered problem entries or card homes in either the arithmetic or counting maps. Repository gates, `tests/tree-audit.cjs`, generated-tree consistency, the tree/card-home/filing gate and `git diff --check` passed. The current taxonomy remains at 486 nodes with all 4,725 entries filed. Browser checks and the five app regression suites were not rerun for this documentation/read-only-tool batch; there is no app, asset or content-data change.
