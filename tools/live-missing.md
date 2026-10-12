# What LIVE (live.poshenloh.com/past-contests) lacks or the app lacks

Started 2026-10-11 while importing every AMC problem as a text-only placeholder. Rows are for review; nothing here is
added without Stanley's approval (plan step C).

## Sittings LIVE does not publish (probed 2026-10-11, no page or no questions)

| Contest | Years | What the app does |
|---|---|---|
| AMC 8 | 2021 | no problems listed; the 2021 AMC 8 is missing from the Contests box |
| 2021 Fall AMC 10A, 10B, 12A, 12B | 2021 | LIVE does not publish the Fall sittings. **10A and 10B now have their text** (all 25 problems, typed from the PDFs Stanley supplied: the MAA solutions booklet for 10A and a copy of the 10B paper with its answer key; 7 figures cropped into `figures/amc10/2021FallA` and `2021FallB`; sources `tools/manual_statements.py`). Fall 12A and 12B are in the Contests box with no text, except 12B #23 (AoPS Wiki). The papers LIVE does have are the Spring ones, named "2021 Spring AMC 10A, 10B, 12A, 12B". |

LIVE does publish the 2000 and 2001 AMC 10 and AMC 12 as single sittings (pages `amc10/2000`, `amc10/2001`, `amc12/2000`,
`amc12/2001`, with no A or B); the importer knows this. Other Fall and Spring AMC sittings (2021 Fall, 2022 Fall) are not in LIVE.

## Concept tags that map to no card (to fill in during step C)

LIVE tags every problem with concepts (258 distinct strings, 11,229 tags, cached in `~/aops-cache/live/`). Checked on 2026-10-11 against the vocabulary of every card; all but 17 strings have a card that names or describes the idea. The practice-problem strategies (1,357) were also scanned for ideas that recur but are not on any card, and found none beyond phrasing differences ("power of point" is Power of a Point, "Simon's trick" is SFFT).

The strings with no card, with the number of problems tagged, and a proposal. **Nothing is written until Stanley approves** (rule 12):

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

