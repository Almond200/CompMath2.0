# Topic-tree depth and practice capacity

2026-11-10, after the fifth focused accuracy review. **The hierarchy has enough depth; practice supply is uneven at its endpoints.** Adding levels is not a remedy for small pools. The corpus supports useful broader practice choices, but a tiny leaf is still common enough that the picker should show its count clearly.

## What is counted

The corpus has 4,725 entries and 4,117 recognized distinct problems. The exact-strategy AMC 10/12 twin detector counts recognized same-year/season/letter pairs once; reworded twins can still count separately. A leaf pool is its direct filing. A branch pool is the union of all direct and descendant filings, so cofilings within that branch never double-count one problem. Depth follows explicit parents, not dotted id spelling. These are available tree-data counts, not measured user-choice probabilities. The main Practice picker does not yet consume these tree filings: T4 remains paused.

Reproduce the summary with `node tools/tree-risk-audit.cjs` and inspect `capacity`. Tests cover moved ids, true depths, recognized twins, descendant unions, direct parent filings and per-family empty pools.

## Depth and pool sizes

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

## Where sparsity is concentrated

| Subject | Leaves | Median pool | Fewer than 5 | Fewer than 10 |
|---|---:|---:|---:|---:|
| Algebra | 102 | 12 | 9 | 39 |
| Counting & Probability | 75 | 9 | 14 | 38 |
| Geometry | 87 | 14 | 9 | 25 |
| Number Theory | 50 | 14 | 10 | 17 |

Counting has the weakest median leaf pool (9). Number Theory has the largest fraction of leaves below five (10/50); its median is still 14. This supports prioritizing practice supply for specific rare categories, rather than adding hierarchy everywhere. The largest leaf contains 96 distinct problems, so no leaf is an obviously unmanageable hundreds-of-problems catch-all on size alone.

## A single contest family is much thinner

These rows consider the same 314 leaves using only the named family; they do not propose adding a filter. Zeroes can simply mean the topic lies outside that contest's syllabus. HMMT coverage here is only the ten imported geometry prompts, not its whole archive.

| Contest family | Nonempty leaves | Leaves with at least 10 | Median over all 314 leaves |
|---|---:|---:|---:|
| AMC 8/AJHSME | 175 | 24 | 1 |
| AMC 10/12 | 300 | 95 | 6 |
| AIME | 281 | 45 | 4 |
| HMMT | 17 | 0 | 0 |

Combined all-stage counts therefore cannot promise a full set for a student targeting one contest family or a narrow difficulty range. A large mixed pool may still contain few appropriate problems for that particular student.

## Decisions for the next tree/picker step

1. Keep the present depth and keep internal topics selectable: their descendant unions already offer much more practice than the rarest leaves.
2. In T4, show the actual available pool count before the user starts a set. If a requested set exceeds it, offer the smaller set or let the user explicitly choose the parent; do not silently mix unrelated problems or repeat twins to pad it.
3. Keep semantically distinct advanced topics even when sparse. Expand their genuine source coverage when content work resumes; do not merge matrices into ordinary equations, for example, merely to increase a number.
4. Review broad high-use pools for coherent recurring subtypes only after reading them. The largest remaining pools include percentages (96), arithmetic sequences (89), rectangles/squares (85) and ratios (72). Counts alone do not justify new splits.
5. Keep correctness ahead of pool size. This pass reduced GCD/LCM 50→25 and divisor counts 43→35 while recovering appropriate money, ratio, factorial, probability and equation practice. Restoring incidental labels would make capacity look healthier while reducing relevance.

No T4 or textbook work was started. The fifth accuracy report and [TREE-FINALIZATION.md](TREE-FINALIZATION.md) preserve the current handoff.
