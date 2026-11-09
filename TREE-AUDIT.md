# Tree audit after area regrouping

2026-11-09; baseline `ef983da`. The owner requested another data audit and a plan for the next tree changes. **This pass changes no taxonomy, problem filing, card home or textbook.** It supersedes the ordering of the remaining work in TREE-REVIEW.md, while preserving that document's completed migration record.

Implementation is now authorized by the owner’s request to fix these issues. See [TREE-REPAIRS.md](TREE-REPAIRS.md) for completed batches and migrations; the measurements below preserve the audit baseline.

## Main finding

Keep the new major areas for now. The strongest remaining problems are inconsistent meanings below them: some labels describe a solution step, some overlap with another label for the same problem kind, and a few specific kinds still fall into broad pools. Another wholesale area reshuffle would not address those issues.

The first work should repair category definitions and confirmed wrong-kind filings. Then resolve the well-supported travel split, review the probability fallback, unify the triangle families, and consolidate overlapping number-theory/bounds labels. Review sparse reference-heavy leaves last, with card-home dispositions written down before deleting anything.

## What was measured

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

## Ranked red flags

### 1. Method-based categories are admitting the wrong kinds of problem

**Confirmed examples, highest priority.** These are stronger evidence than small populations.

- `alg.eq.system.sub` has five distinct entries. **1990 AIME #4 is one rational equation in one variable**, yet its only filing is Substitution and elimination in nonlinear systems. The substitution is useful; “system” is the wrong subject. The full nonlinear-system family has 26 distinct problems split into combine/substitute/symmetric branches. Review all three siblings together before choosing the retained division.
- `alg.fn.feq.sub` has six distinct problems grouped by Substituting special values. They include a scaling-defined function (2001 AIME II #8), polynomial functional equations (2007 AIME II #14 and 2016 AIME I #11), and a domain-consistency question (2006 AMC 12A #18). Keep Functional equations, but replace the technique-based split with meaningful kinds only where supported; broader parent filings are preferable to invented tiny leaves.
- The prior review found the same issue in Integer and rational roots (10 distinct) and Higher-degree equations (11): some filings reflect an intermediate rational-root test or cubic rather than the subject. The “Cubics and quartics” leaf also contains a degree-17/19 root-comparison question.
- `cp.tech.bij` is the sole single-child wrapper: **18 distinct problems, three directly on the parent and 15 on its child**. The three parent entries are two elimination tournaments and a restricted-permutation problem, **2012 AMC 10B #22**. Its natural existing destination is Arrangements with restrictions. The incidence-total child contains legitimate recurring kinds, including classroom seats, participation time and vertex/face sums; do not throw those away with the wrapper.

**Decision:** fix literal category mismatches first, then clean the relevant sibling definitions. Preserve methods on cards. For the counting family, retain a coherent repeated-count/incidence-total pool, review the tournament destination against the existing tournament scope, and remove the misleading Bijections wrapper/name. Do not automatically move every incidence problem to arithmetic or geometry just because of its setting.

### 2. Travel has the clearest case for an additional subtopic

The motion family has 63 distinct problems; **20 are filed directly on the parent**, while every other directly used parent has at most four distinct entries. This is a local gap, not a reason to split every large leaf.

Rereading all 20 supports **nine distinct multi-stage journey/stop examples**: 2008 AIME II #2; 2012 AIME II #4; 2013 AIME I #1; 1985 AJHSME #13; 2005 AMC 8 #10; 2007 AMC 10A #13; 2009 AMC 10A #4; 2017 AMC 10A #9; 2017 AMC 10B #7. The last two additions to the previously recorded seven-example evidence are the walk-home-then-bike comparison and the flat-tire journey. TQ20 has been updated with those references and remains pending.

**Decision:** resolve TQ20 and introduce the multi-stage/stop-time leaf before considering further travel subdivisions. Review all 22 raw parent entries in the same batch, keeping twins aligned. Do not force the other eleven distinct entries into the new leaf: they include ordinary distance/rate questions, rounding, graph reading and moving geometric regions. Some belong on the parent or already have a useful second subject.

### 3. Basic probability is a mixed fallback, not automatically an oversized topic

`cp.prob.basic.count` contains **103 raw / 89 distinct** problems. Of those, **37 are sole-label problems and 52 already have another subject label**. Adding more labels indiscriminately would make this worse.

The 12-problem sample contains a clear existing-destination miss: **2005 AMC 10B #21 explicitly draws slips without replacement**, but is filed only at Counting favorable outcomes. The cube-walk question, 2024 AMC 10A #24, also merits review against the existing random-process family. Its event concerns a whole path; do not automatically file it as a terminal-state probability just because it has four steps.

Other sampled entries legitimately concern arbitrary finite sample spaces: changed airport gates, two unequal chosen integers, and an inverse bag-composition question. A discrete lattice-point probability is not a continuous area/volume probability simply because coordinates appear.

**Decision:** review all 89 distinct cases against existing drawing, coin/dice, conditional and random-process nodes before inventing subtopics. Keep a clearly defined general finite-probability fallback. Record outcomes as “specific existing destination,” “generic finite model,” or “recurring missing kind”; only the last can justify a new candidate after enough independent examples.

### 4. Triangle categories remain split by location and tool

The previous regrouping left Geometry unchanged. Its 213-distinct Lengths and angles area still contains Pythagoras, triangle similarity and isosceles angle questions, alongside a separate Triangles area with 312 distinct problems.

The concrete review scope is **233 raw / 204 distinct** across Pythagoras/folding, special right triangles, the two isosceles leaves, triangle similarity and parallel-segment similarity. Within it, the right-triangle candidate pool excluding folding has 95 distinct problems; isosceles has 37; folding has 15. These overlap and must not be summed.

**Decision:** put genuine triangle families together, combine the two isosceles entry points, and move folding out of Pythagoras. Read the hidden-right-triangle and parallel-segment pools before deciding their final scope. A right triangle used to compute a box diagonal should not force every box problem into a triangle category. Preserve general similarity of figures/solids outside the triangle-specific family.

### 5. Two repeated-label pairs expose unclear boundaries

| Pair | Shared distinct problems | Size of each direct-label pool | Follow-up |
|---|---:|---:|---|
| Perfect-power expressions ↔ difference-of-squares/factorable Diophantine equations | 5 | 8 / 24 | Review whether the second label adds a subject or merely a solution route |
| Largest subsets avoiding a condition ↔ constructions and bounds | 3 | 6 / 22 | Establish a broad/narrow relationship or remove redundant general labels |

All eight power-expression statements were read. They are square/cube conditions on integers, not integer-sequence questions; their current home under Integer sequences and special numbers obscures that. 1999 AIME #3 and 2017 AIME II #6 are clear examples. Their other three filings include bounds and a genuine base-representation condition, so a blanket replacement with “difference of squares” would be wrong.

All six extremal-subset statements were read. The three sharing the bounds label ask for a largest constrained subset; these labels largely repeat the same subject at different breadths. Preserve the meaningful subset family rather than mixing all six into a generic bounds leaf. A true parent/child relationship could express this, but requires checking depth and removing ancestor redundancy.

**Decision:** review 63 raw / 55 distinct entries in the union of those four pools plus Extremal principle. Establish a single primary problem-kind destination where the current pair merely repeats a broad/narrow description. Keep genuine second subjects. As a control, Arithmetic sequences and Geometric sequences share nine distinct problems, but 2003 AIME I #8 explicitly imposes both types of progression; that overlap is useful.

### 6. The sparse tail reflects a mismatch between reference coverage and this contest sample

| Subject | Thin leaves / all leaves | Card homes on thin leaves |
|---|---:|---:|
| Algebra | 18 / 112 | 31 |
| Counting & Probability | 15 / 79 | 30 |
| Geometry | 13 / 94 | 59 |
| Number Theory | 11 / 52 | 20 |

The source corpus contains **1,000 AMC 8/AJHSME, 2,650 AMC 10/12, 1,065 AIME and ten HMMT entries**, with no imported olympiad problem set. Thin olympiad-relevant topics are therefore weak evidence of uselessness. Projective circle geometry has three distinct problems and 19 card homes; Matrices has two and nine. These deserve a reference-home review, not automatic deletion.

The two unused leaves are Infinite radicals (two homes) and Parallel lines/transversals (three). Some of those cards are cited elsewhere: Infinite Nest appears in a function-iteration problem, and Parallel Exterior Angles appears in three triangle problems. Such citations do not establish that the original problem should receive the card's home label.

**Decision:** classify each thin leaf as retain, merge into a genuinely equivalent problem kind, or retire and rehome its cards. For every proposed deletion record the survivor and all affected card ids. Keep advanced but distinct subjects when justified. For symmetry, follow the earlier specific decision: merge the two method-split leaves into the 13-distinct rotations/reflections pool, explicitly covering both equivalence classes and symmetry conditions. Do not generalize that decision into merging unrelated thin leaves.

## Next implementation batches

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

## Correctness follow-ups encountered while auditing

The category pass must also repair the previously recorded 1984 AIME #14 wording about residues. A second concrete proof issue surfaced in **1989 AIME #13**: the strategy says avoiding differences 4 and 7 “only sees residues mod 11.” That is false globally: 1 and 16 differ by 15 and may coexist, although their residues differ by 4. The 11-consecutive-integer bound and a periodic construction need to be justified separately, including the boundary of the initial 20 positions. An independent dynamic program retaining the previous seven selection bits reproduced maxima 5 for length 11, 10 for length 20 and the stated answer 905 for length 1989. Repair the proof, not the answer. These are recorded follow-ups, not corrections already applied by this audit.

## Validation

The risk census was checked against the independently calculated structural totals and pool unions. Its regression tests exercise recognized twins, overlapping leaves, thin-home counts, parent filings, moved ids and empty data. All repository gates, the risk-audit tests, tree-audit tests, structural regression tests, generated-tree check and diff check passed. The audited baseline remains intact. The five app regression suites and browser flows were not rerun for this documentation/read-only-tool batch. No taxonomy or data-file change is part of this audit.
