<!-- nav --> [Curriculum](../README.md) · Archive-wide coverage and teaching validation

# Archive-wide coverage and teaching validation

## What was measured

This fourth-pass audit uses CompMath’s actual generated problem catalog, not a frequency estimate from a sample. The catalog blob `0df84b05eedbcd895dc76eb6eb638718d9d82962` was retrieved from the repository on 27 November 2026, together with its generated topic tree and current lesson-link index. The catalog builder defines the row schema, the interned tag arrays, the rating source and the flag for a stored strategy. The calculations below use those fields, the actual parent relationships in the tree, and explicit identity aliases. An appearance is a contest question in a particular paper; an identity group is the set of appearances linked by the repository’s explicit aliases. No additional semantic deduplication was inferred.

**Interpretation.** Topic placement is only a screening test. A problem labeled “similar triangles” may require a sophisticated auxiliary construction. A difficulty score indicates challenge, not which theorem is needed. A card linked to a solution may describe one possible route, not a necessary prerequisite. These distinctions are crucial to a genuine textbook progression.

| **Archive property**                                     | **Measured count** |
|----------------------------------------------------------|--------------------|
| Contest appearances                                      | 19,456             |
| Explicit duplicate aliases                               | 621                |
| Distinct identity groups after explicit aliases          | 18,835             |
| Appearances with one or more taxonomy tags               | 19,379             |
| Appearances with no taxonomy tags                        | 77                 |
| Rated appearances                                        | 19,456             |
| Live-sourced ratings                                     | 6,600              |
| Manually estimated ratings                               | 12,856             |
| Appearances with at least one formula/method/pattern tag | 15,956             |
| Appearances with an in-catalog strategy flag             | 4,812              |
| Identity groups with at least one stored strategy        | 4,193              |
| Appearances tagged in more than one subject              | 753                |

The 4,812 strategy-flagged appearances do not represent 4,812 independently reverified solutions. Conversely, missing a strategy flag does not mean no official solution exists. It means an editor cannot certify a route merely from the generated catalog.

## Baseline: what the current Learn links actually cover

The existing Learn index directly associates 287 topic IDs and 720 card IDs with lesson records. Among 314 terminal topic nodes, all have archive practice supply; 186 have a direct existing lesson association, and 296 have an association either at the leaf or at an ancestor. Of the 691 distinct card IDs actually cited in the catalog’s main or trick-route tags, 629 have a primary-teaching association somewhere in the existing books. A primary association is a declared link, not an independently verified adequate explanation. Parent-level links are particularly weak evidence: they may point to a chapter on circles while omitting a particular tangent configuration.

| **Contest**              | **Appearances** | **All filed topics directly linked to existing lessons** | **All topics linked directly or via ancestor** | **All cited cards linked as primary teaching\*** | **Stored strategy** |
|--------------------------|-----------------|----------------------------------------------------------|------------------------------------------------|--------------------------------------------------|---------------------|
| AMC 8                    | 1,025           | 397                                                      | 811                                            | 775                                              | 1,025               |
| AMC 10                   | 1,350           | 641                                                      | 1,204                                          | 1,231                                            | 1,350               |
| AMC 12 (including AHSME) | 3,160           | 1,766                                                    | 2,957                                          | 2,760                                            | 1,350               |
| AIME                     | 1,065           | 575                                                      | 1,010                                          | 1,042                                            | 1,065               |
| Other contest families   | 12,856          | 7,615                                                    | 11,899                                         | 9,514                                            | 22                  |
| Total                    | 19,456          | 10,994                                                   | 17,881                                         | 15,322                                           | 4,812               |

- Requires at least one cited card and a primary teaching link for every card in the union of main and trick-route tags. An alternative route’s tag may be unnecessary for a particular valid solution. Empty sets do not receive credit. These are appearance counts, with no double-counting within a row; appearances can be duplicates across contests.

These numbers explain why a large existing textbook shelf can still feel disjointed. Approximately 56.5% of appearances have every filed topic directly associated with an existing lesson, while 91.9% have a direct or ancestral link. The gap is often granularity and alignment, not lack of an entire branch of mathematics. Do not mechanically create a chapter for every missing association.

## Proposed ladder: candidate topic-family placement

The new audit authored 190 specific topic-node-to-chapter rules (188 initial rules and two similarity-node corrections), applied to descendants by actual parent pointers, not by dotted ID prefixes. A direct node can override a broader rule. For example, a basic Vieta task maps to A1.5, Newton sums to A2.13, and a higher-degree root constraint to A3.3. Ordinary linear functions map to A1.6, whereas floor sums may need N3.9. The mapping deliberately leaves directly assigned broad area tags without a specific chapter rather than pretending they identify a teaching route. The 314 leaves all have a candidate chapter after the correction; not every leaf has been independently certified against the full text of each lesson.

| **Contest**    | **Appearances** | **All filed tags have candidate chapter** | **Broad-tag review needed** | **No filed tags** |
|----------------|-----------------|-------------------------------------------|-----------------------------|-------------------|
| AMC 8          | 1,025           | 1,025                                     | 0                           | 0                 |
| AMC 10         | 1,350           | 1,349                                     | 1                           | 0                 |
| AMC 12 / AHSME | 3,160           | 3,160                                     | 0                           | 0                 |
| AIME           | 1,065           | 1,064                                     | 1                           | 0                 |
| Other families | 12,856          | 12,759                                    | 20                          | 77                |
| Total          | 19,456          | 19,357                                    | 22                          | 77                |

The proposed ladder has candidate chapter-family assignments for 99.49% of appearances, or 18,737 of 18,835 explicit identity groups (99.48%). This is **not** a 99% verified curriculum or student-readiness claim. It only means that the catalog tags can be routed to proposed teaching chapters at the topic-family level. For the 22 broad-tag appearances, read the statement and a solution before assigning a specific chapter. The 77 untagged appearances require topic review. Alias groups have 22 broad-tag cases and 76 with no tags; one untagged appearance is absorbed by an explicitly linked identity group.

### Evidence by rated difficulty

| **Elo interval** | **Appearances** | **Candidate topic route** | **Stored strategy flag** |
|------------------|-----------------|---------------------------|--------------------------|
| Below 800        | 4,453           | 4,451                     | 319                      |
| 800–1199         | 3,593           | 3,555                     | 1,008                    |
| 1200–1599        | 3,767           | 3,733                     | 1,115                    |
| 1600–1999        | 2,982           | 2,979                     | 918                      |
| 2000 and above   | 4,661           | 4,639                     | 1,452                    |

These are descriptive intervals, not proposed volume boundaries. In particular, ratings for the other contest families are manually estimated and should not be treated as independently calibrated against LIVE. The high candidate coverage in each band suggests that the main bottleneck is now verified solution paths and instructional depth, not endlessly adding chapters.

### AIME position and the need for advanced transfer

| **AIME positions** | **Appearances** | **Candidate topic route** | **Existing all-topic direct association** | **Existing all-card primary association** |
|--------------------|-----------------|---------------------------|-------------------------------------------|-------------------------------------------|
| 1–7                | 497             | 496                       | 263                                       | 490                                       |
| 8–10               | 213             | 213                       | 121                                       | 210                                       |
| 11–15              | 355             | 355                       | 191                                       | 342                                       |

All 1,065 AIME appearances carry a strategy flag. In the initial candidate-rule run, 272 of the 355 late AIME appearances had all filed topics assigned to chapters no higher than Volume II. This is a conservative observation before the similarity-rule correction (some other appearances were unresolved). It is **not** evidence that Volume II prepares students to solve 272 late questions. Instead, it shows why Volume III must teach recognizing, combining and adapting earlier techniques. A hard quadratic, similarity or probability problem can have a foundational topic tag yet require advanced strategic reasoning. Preserve the underlying teaching home and curate a separate transfer placement in Volume III.

## Coverage by area: demand and existing lesson-link granularity

The counts below are actual archive pools including descendants. A problem may appear in more than one area; do not sum the rows to obtain archive size. The direct-leaf ratio measures the existing Learn index, not the proposed curriculum. The candidate chapters are the principal teaching routes, not a full list of all places a topic is revisited.

| **Area**                                          | **Problem appearances in pool** | **Existing direct leaf links / leaves** | **Main proposed teaching route** |
|---------------------------------------------------|---------------------------------|-----------------------------------------|----------------------------------|
| Arithmetic and proportional reasoning             | 1,258                           | 1/8                                     | A1.1, A1.3                       |
| Rates, time and everyday quantities               | 787                             | 1/12                                    | A1.2–3; N1.5                     |
| Data and averages                                 | 427                             | 1/4                                     | C1.6; A1.3                       |
| Equations and expressions                         | 1,314                           | 9/14                                    | A1.1–8, A2.21, A3.1–2            |
| Polynomials                                       | 865                             | 11/13                                   | A1.5, A1.10, A2.13, A3.3         |
| Functions                                         | 684                             | 7/15                                    | A1.6, A2.5–9, A2.14, A3.5        |
| Exponents and logarithms                          | 655                             | 3/6                                     | A1.4, A2.2–4                     |
| Sequences and series                              | 1,012                           | 6/11                                    | A1.9, A2.10, A3.6–7              |
| Trigonometry                                      | 286                             | 5/6                                     | A2.15–19, A3.8                   |
| Complex numbers                                   | 247                             | 5/5                                     | A2.20, A3.9                      |
| Inequalities and optimization                     | 525                             | 6/8                                     | A1.8, A2.6, A2.11–12, A3.4       |
| Choices, arrangements and distributions           | 1,144                           | 18/27                                   | C1.1–4, C2.1–6, C3.1–4, C3.7     |
| Paths, graphs and boards                          | 520                             | 6/11                                    | C1.8, C2.5–6, C2.10, C3.5, C3.8  |
| Sets and coefficient counts                       | 281                             | 4/9                                     | C1.4, C2.2–3, C2.7, C3.6, N2.5   |
| Probability and expectation                       | 1,277                           | 11/18                                   | C1.5–7, C2.8–9, C3.9–10          |
| Logic, games and bounds                           | 509                             | 3/10                                    | C1.10, C2.4, C3.10               |
| Angles, similarity and transformations            | 512                             | 5/7                                     | G1.1–3, G1.8, G2.12              |
| Triangles                                         | 1,456                           | 19/24                                   | G1.2–6, G2.5, G2.7–8, G3.2       |
| Polygons                                          | 1,385                           | 5/12                                    | G1.5, G1.7, G2.1                 |
| Circles                                           | 1,059                           | 7/14                                    | G1.7, G2.2–6, G3.3, G3.8         |
| Coordinate geometry                               | 652                             | 6/11                                    | G1.8, G2.6, G2.9–13, G3.6–7      |
| Solid geometry                                    | 719                             | 6/13                                    | G1.9, G2.14, G3.9                |
| Geometric optimization and combinatorial geometry | 332                             | 6/6                                     | G2.1, G2.12, G3.10, C2.1         |
| Divisibility, primes and divisors                 | 1,423                           | 15/20                                   | N1.1–4, N2.4–5, N3.3–4           |
| Modular arithmetic                                | 571                             | 9/9                                     | N1.7, N2.1–3, N2.6, N3.1–2, N3.5 |
| Diophantine equations                             | 567                             | 5/9                                     | N1.8, N2.7–9, N3.6–7             |
| Digits and bases                                  | 648                             | 5/8                                     | N1.5, N2.10, N3.8                |
| Integer sequences and special numbers             | 195                             | 1/4                                     | N1.9, N2.9, N3.7                 |

The largest opportunity is foundational and intermediate coverage: arithmetic, rates, polygons, circles and introductory finite probability have substantial practice pools. Prioritize writing rich chapters in these areas before expanding optional advanced techniques.

## High-priority topic and method review queue

These are examples of active taxonomy nodes with no direct existing lesson link; an ancestor link can still exist. Counts are direct filings. The final column identifies the pedagogical treatment, not merely an index destination. The following entries informed the integrated additions and chapter revisions.

| **Problem family**                                        | **Direct appearances** | **Teaching response**                                                                  |
|-----------------------------------------------------------|------------------------|----------------------------------------------------------------------------------------|
| Rectangles and squares                                    | 363                    | G1.5: use diagonal and area relations, then mix in composite regions.                  |
| Order of operations with integers, decimals and fractions | 351                    | A1.1: diagnostic, exact computation and representation choice.                         |
| Percent change, discounts and interest                    | 315                    | A1.3: explicit reference quantities, inverse percentages, successive changes.          |
| Ratios and proportions                                    | 219                    | A1.3: compare ratio tables, scale factors and constrained models.                      |
| Regions with circular arcs                                | 195                    | G1.5/G1.7: decomposition and overlap; distinguish arc, chord and area.                 |
| Counting numbers with digit conditions                    | 161                    | C2.1: zero and leading digits, occurrences, interval restrictions; C3.1 prefix states. |
| Slopes, intercepts and equations of lines                 | 157                    | G1.8: construct from constraints, then G2.6 intersection and distance.                 |
| Money, prices and coins                                   | 131                    | A1.3: unknown quantities, unit costs and weighted splits.                              |
| Exponent arithmetic and comparing powers                  | 131                    | A1.4/A2.2: equal-base or equal-exponent comparison and intermediate bounds.            |
| Circles inscribed in polygons and corners                 | 128                    | G2.8/G3.3: bisector and tangent constructions.                                         |
| Perfect squares between bounds                            | 110                    | N1.9: integer roots, exact endpoints and overlap with other powers.                    |
| Median, mode and range                                    | 96                     | C1.6: reconstruct ordered data, not just calculate summaries.                          |
| Reading graphs, tables and charts                         | 93                     | C1.6: translate representations and verify units and scales.                           |
| Clever computation and grouping                           | 92                     | A1.1: contrast exact equivalent forms and require a reason for the choice.             |

The largest card-level gaps (among cards actually cited by archive rows and with no existing primary teaching association) include bound-and-construct (183 indexed appearances), isosceles-triangle (147), forced-entries (41), if-then-statements (31), digit-occurrences (21), small-cases-pattern (20), bounded-diophantine-count (18), settle-with-an-example (17), and walk-counting-dp (14). Counts reflect catalog card pools, which can overlap and can contain alternative routes. C2.4, G1.2, C1.10, C2.1, C3.1, N2.8/N3.6 and C2.5/C3.5 explicitly develop these capabilities. The priority is to make students recognize the underlying pattern, not to turn each card into a separate lesson.

## Solution-level review: the next gate, not a claimed completed census

A defensible teaching assignment requires reading a problem and a complete solution route, independently checking the mathematics and recording precisely which lessons the route assumes. The catalog metadata scan has been completed; independent solution-level verification and learner assessment have not. Do not infer prerequisites by the union of all tags or automatically turn a card link into an exercise.

For a reproducible authoring workflow, use the following records: `problem_slug`, `identity_group`, `route_id`, `chapter_id`, `required_concept_ids`, `teaching_role`, `novelty`, `difficulty_source`, `review_status`, `review_note`. Each route has its own required concepts. Mark a candidate as route-read only after reading a valid solution, prerequisite-checked only after verifying order and scope, and published only after checking statements, exact answers and worked reasoning. Keep the existing stable contest slugs.

**Priority order.** First review the 99 appearances without a full specific candidate mapping. Next review the AIME archive, starting with all 1,065 appearances (stored strategies available), including the 355 late positions. Compare AMC 8/10/12 and invitational samples across topic demand, difficulty and strategy availability. Select problems for the teaching sequence, not just the most difficult ones. Read official or authorized solutions where a stored strategy is absent; do not label those problems route-verified until reviewed. The previously audited 2023 AIME I paper and earlier 2024–25 sample are useful pilot sets, not evidence of complete solution verification.

## Instructional validation: prevent the encyclopedia problem

**A lesson must stand on its own.** It should move from a question the student understands to an idea they can discover, a mathematical explanation, and examples that change the student’s capability. Reference cards are optional recaps and navigation. They are not the prose skeleton. An author should not copy the taxonomy or list every related theorem at the opening.

Every chapter’s authoring packet should contain a one-paragraph narrative arc, a sequence of distinct learning objectives, a dependency check, and a staged selection of problems: a motivating example, a direct skill check, a contrasting example, a partially guided application, an unlabeled transfer problem, and a delayed revisit. These can be spread across lessons rather than repeated mechanically on every page. A coherent chapter’s next concept answers a question raised by the preceding one. The twelve worked-out teaching sequences in this edition model that development; most other chapters retain their detailed premise, numbered concepts and practice directions for subsequent authoring.

In Volume I, assess whether learners correctly construct a model before substituting into formulas. In Volume II, ask them to derive conditions, distinguish competing representations and handle nonroutine but recognizable applications. In Volume III, withhold technique labels, compare approaches, ask for a first useful observation, and require verification of the exact answer. Retain proofs in all levels where they explain why a tool works; do not use proof-heavy material as a substitute for strategic problem-solving instruction.

**Example of the teaching progression: a circle chord.** In G1.7, students learn how the distance from the center determines a chord’s length; in G2.2, they vary a secant and discover the invariant product, then prove it and compare inside/outside and tangent cases. In G3.3, a difficult configuration gives no obvious secant: learners must discover the circle or tangent construction, choose a power relation, account for signs and validate the geometry. The same topic tag spans all three levels. That is a progression of mathematical capabilities rather than three versions of a reference entry.

**Editorial acceptance test.** A topic name being present, a card link being present, and a problem being solved by an expert are three different things. Approve a chapter only if a learner can follow its explanation without outside references, distinguish when its key technique applies, solve a contrasting problem and transfer the idea to an unmarked mixed problem. Track misconception types (wrong representation, incorrect assumptions, calculation, missing cases) separately. This is the evidence needed to assess depth and sequence, rather than reporting a completion percentage from labels.

## Sources and reproducibility

- [CompMath generated catalog](https://github.com/Almond200/CompMath2.0/blob/main/js/data/problems/problem-catalog.js), blob `0df84b05eedbcd895dc76eb6eb638718d9d82962`, retrieved 27 November 2026.
- [Catalog builder and field definitions](https://github.com/Almond200/CompMath2.0/blob/main/tools/build-problem-catalog.cjs), [topic tree](https://github.com/Almond200/CompMath2.0/blob/main/js/data/topic-tree.js), [topic-tree policy](https://github.com/Almond200/CompMath2.0/blob/main/TOPIC-TREE.md), and [lesson-link index](https://github.com/Almond200/CompMath2.0/blob/main/js/data/problems/lesson-links.js).
- [Problem alias definitions](https://github.com/Almond200/CompMath2.0/blob/main/js/data/problems/problem-aliases.json) and [contest slug rules](https://github.com/Almond200/CompMath2.0/blob/main/js/contest-sources.js).
- [MAA American Mathematics Competitions](https://maa.org/student-programs/amc/) and earlier cited AoPS curricula: scope and benchmark context. The owner decision documented in TOPIC-TREE.md excludes calculus; A2.22 remains optional precalculus intuition, no differentiation or integration.

All computations are metadata-level counts from the stated catalog snapshot. Topic-family assignments are author-proposed screening rules. The detailed solution-level prerequisites, actual teaching manuscript, verified exercises and migration of the live app remain separate editorial tasks. No changes have been made to the repository.
