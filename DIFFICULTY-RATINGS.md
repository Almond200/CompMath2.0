# Problem difficulty ratings

The owner requested Elo-based selection for Open a random problem and Practice a topic (2026-11-08), replacing paper-position thirds. After clarification, the five levels are **rank quintiles within the selected pool**, not equal-width numeric Elo intervals. The only picker layout change is expanding the difficulty sliders to Any plus five labelled levels: Very easy, Easy, Medium, Hard and Very hard. The labels are also exposed as slider `aria-valuetext`.

## Data and provenance

`js/data/problems/difficulty-ratings.js` is the app's generated backend rating file. Every record has a numeric `elo` and a `source` (`live` or `manual`); all sources use the same selection code. Values are not displayed as ratings or badges in the UI.

The 2026-11-08 snapshot contains **4,725 app problems: 4,665 LIVE values and 60 manual estimates, zero unrated**. The importer checked all 6,500 records published across the 18 bands of [LIVE's difficulty archive](https://live.poshenloh.com/past-contests/difficulty), then matched exact contest, year/sitting and problem-number keys. AJHSME maps to AMC 8; Spring 2021 A/B and Fall 2021 C/D are mapped separately for both AMC 10 and AMC 12. Ratings are a dated snapshot of LIVE's evolving estimates, not a network request made while choosing a problem.

The ten 2019 HMMT February Geometry problems and fifty 2026 AMC 10A/12A problems have no LIVE difficulty values in that snapshot. At the owner's explicit request, their statements and solution requirements were reviewed and assigned estimates on the same numerical scale. `tools/manual-difficulty-ratings.json` records each estimate, a short rationale and the paper sources (the local 2026 statements retain their per-problem Random Math source URLs). Shared 2026 AMC 10/12 questions have identical estimates. Ratings do not simply increase with question number: for example, AMC 10A #24 is below #23, and HMMT #5 is below #4. These are author judgments, not empirical LIVE measurements. Both kinds of rating live in the same app file, and a later LIVE value automatically takes precedence on refresh.

**2026 AMC 10A review (2026-11-11).** After the owner sat the paper, all 25 estimates were checked against a worked solution of each problem. Six changed: #25 from 2450 to 1900 (far easier than a usual last question), #8 up to 1500, #18 up to 1700, and #16, #20 and #21 down to 1800, 2000 and 1950, with the 12A twins of #16 and #21. LIVE's archive, fetched again that day, still had no values for the paper.

## Selection

`js/problem-difficulty.js` supplies the shared rating lookup, five-level selection and uniform draw.

1. Apply the selected contest or topic first. Any contest uses the full problem database; choosing AMC 8 includes its AJHSME years. Paper/year command arguments remain supported.
2. **Any difficulty** skips ranking and draws uniformly from the eligible entries. A future unrated entry remains eligible for Any.
3. For a specific level, sort that pool's rated entries by Elo. For zero-based level `i` and pool size `n`, the nominal group runs from `floor(i*n/5)` through `floor((i+1)*n/5)-1`, with an empty small-pool group expanded to its neighboring rank.
4. Include all entries tied with either endpoint. Ties can make neighboring groups overlap and their sizes exceed exactly 20%; equal ratings are never split arbitrarily. Fewer than five rated entries reuse ranks, so an existing rated topic does not produce empty levels. A wholly unrated future pool has no rated-level matches rather than receiving a silent paper-position estimate.
5. Draw uniformly within the resulting group. Topic practice samples without replacement from its selected group, then orders the chosen problems from lowest to highest Elo. Equal Elo values use the problem slug as a stable tiebreaker; a future unrated item sorts last. Sorting happens after sampling, so it does not bias which problems are selected. Existing saved sets keep their original order.

Thus Very hard AMC 8 means roughly the hardest fifth of AMC 8, while Very hard AIME means roughly the hardest fifth of AIME. On this snapshot those ranges start at 1,370 and 2,990 respectively. Topic selection recalculates after narrowing to that topic, not against the whole archive.

Existing topic-set eligibility remains in place: MAA problems with answer keys, voided problems excluded, existing twin deduplication, and statements loaded before a set is saved. HMMT ratings are used by the random-problem picker and, in the subsequently requested mixed-source mocks, by the mock generator. The latter uses separately attributed author-restated prompts and officially verified answer values in `mock-extras.js`; topic sets keep their existing MAA eligibility. See MOCK-CONTESTS.md. Saved sets keep their problems, responses and recorded difficulty label when ratings are refreshed.

The reference card-profile/statistics charts still summarize early/middle/late paper position, and textbook exercise ordering still uses its existing cross-contest teaching order. Those displays are unchanged by this picker task; their helper is named `paperPositionBand` to keep it separate from Elo selection.

## Refresh and validation

```sh
python3 tools/import-live-ratings.py --refresh
python3 tools/import-live-ratings.py --check
node --test tests/*.cjs
```

The importer uses public embedded page data, needs no account/API key, caches under `/tmp/compmath-live-ratings` by default and accepts `--cache PATH`. It validates band counts, source totals, rating bounds, duplicate source identities and manual-reference validity before writing. `--check` compares a rebuild with the saved file without changing its retrieval date. A fresh import may legitimately change ratings, so review its diff and bump the data asset version before publishing.

The following records the original Elo batch’s validation in PR #298; the repository now has five regression suites, including mock contests.

`tests/problem-difficulty.cjs` covers rating coverage/provenance, shared estimates, uniform Any, rank groups across 125 pool sizes, ties, tiny topics, early high-rated questions and distinct contest-relative ranges. The source refresh was also checked independently against a freshly downloaded set of all 18 bands. All repository gates, all four regression suites, generated-notes/shelf checks and the cached/fresh-source import checks passed. Chromium passed 228 UI checks at 1280/375 pixels in light/dark plus 53 independent topic-pool/route checks, covering all six slider positions, all contest families, topic generation/reload, tiny topics, no-match states, uniform-Any endpoints and paper-specific/legacy routes. No page errors, KaTeX errors or horizontal overflow were observed. The browser topic audit captured the actual topic-filtered pool, independently calculated its Elo bounds and checked the selected members. A further 13 ten-question generation/reload checks verified ascending Elo at every difficulty level, across default subjects and both widths/themes, with no duplicates and saved order preserved. Screenshots of both themes and widths were inspected.
