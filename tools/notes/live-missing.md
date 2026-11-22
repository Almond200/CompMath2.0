# LIVE import coverage and historical gaps

## Current repository coverage (checked 2026-11-08)

The app has 4,715 MAA statements and matching answer keys: the original 4,665 plus fifty 2026 AMC 10A/12A statements from the credited Random Math copies, with keys independently checked. Ten separately attributed author-restated HMMT Geometry prompts/answer values support mixed-source mocks (`MOCK-CONTESTS.md`); they are outside the MAA statement import. Elo ratings cover all 4,725 problems: 4,665 LIVE values and 60 manual estimates (`DIFFICULTY-RATINGS.md`). The 2021 Fall AMC 10A, 10B, 12A and 12B statements are present. The statement importer maps AMC 12 C/D sittings to Fall A/B and retains manual Fall AMC 10 statements. The answer-key importer also maps AMC 10 C/D to Fall A/B; the earlier claim that these sittings are unavailable is obsolete. Manual PDF/AoPS provenance is retained where applicable in `tools/manual_statements.py`. The answer-key import compares source and local statements before accepting a key.

The local corpus has no 2021 AMC 8 entry. This is a repository observation, not a current availability survey of the external site. The 2000 and 2001 AMC 10/12 single-sitting mapping is handled by the importer. See the source scripts and stored provenance for exact coverage rather than treating the old gap list as current.

## Historical concept-tag review (2026-10-11)

The following counts and proposals are the original review snapshot. The six proposed cards were written on 2026-10-12; nothing in this table is a pending approval. Current decisions are in [QUESTIONS.md](../QUESTIONS.md).

LIVE tags every problem with concepts (258 distinct strings, 11,229 tags, cached in `~/aops-cache/live/`). Checked on 2026-10-11 against the vocabulary of every card; all but 17 strings have a card that names or describes the idea. The practice-problem strategies (1,357) were also scanned for ideas that recur but are not on any card, and found none beyond phrasing differences ("power of point" is Power of a Point, "Simon's trick" is SFFT).

The strings with no card, with the number of problems tagged, and a proposal. The original review required owner approval before writing:

**Written 2026-10-12:** the six proposed cards below now exist (`defined-operation`, `truth-tellers-logic`, `organized-listing`, `simulate-the-process`, `coins-and-prices`, `drawing-without-replacement`).

| Concept (problems) | Proposed card | Kind | Importance, tier |
|---|---|---|---|
| custom operation (40) | A Newly Defined Operation: $a \star b$ is given by a rule, and the question evaluates it or solves for a value | pattern | low, AMC |
| logical deduction (66), truth-tellers and liars (4) | Logical Deduction and Truth-Tellers: statements, some true and some false, fix who is who | pattern | low, AMC |
| systematic listing (56) | Making an Organized List: list in an order that cannot skip or repeat a case | method | low, AMC |
| process simulation (24) | Simulating the Process: run a short process step by step until it repeats or ends | method | low, AMC |
| money (58) | Coins and Prices: a total made from items of given values | pattern | low, AMC |
| sampling without replacement (16) | Drawing Without Replacement (a probability setup, with hypergeometric counts) | pattern | low, AMC |
| modular exponentiation (16) | covered by Finding the Period and Choosing the Right Modulus; no card proposed | none | none |
| percentage (163), arrangements with restrictions (73), floor and ceiling functions (63) | covered by Percent Change, the counting cards, and the floor cards; no card proposed | none | none |
| data and graph interpretation (48), distributive property (10), magic square (8), fencepost counting (4), parking functions (1), rotational symmetry (1) | too few or not an idea; no card proposed | none | none |

