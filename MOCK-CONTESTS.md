# Practice a contest

The **Practice a contest** panel shares navigation, saving and review with topic sets. Generated mocks and supported timed past papers add a countdown and contest scoring.

## Past papers and generated mocks

The past-paper search starts empty. Type a contest name, round or year to see matching papers. Clearing the field closes suggestions. Choose a result to enable **Start paper**.

Past contest searches all indexed papers. The timing model recognizes 220 complete AMC 8, AMC 10, AMC 12 and AIME papers. The other papers are untimed. A selected paper keeps its original problem numbers and order, including any voided question. During review, the source appears beside the question number.

Generate a mock offers the four timed target formats. It can draw from any eligible source contest and keeps each problem's answer format. A question with documented self-check can enter the source pool. **Only questions in this format** limits the pool to multiple choice for AMC and typed answers for AIME. Other filters can limit contests, trigonometry, calculus and prompts available in the app. Original sources appear in review.

`js/mock-contests.js` builds a difficulty curve for each target format:

1. Use the five calendar years ending at the latest complete paper year in the catalog. All four timed formats currently contribute papers from 2022–2026. A missing family/year is omitted.
2. For each problem position, average Elo across that year's papers, then across the available years. This keeps years with additional sittings from receiving extra weight. Exclude voided questions and missing ratings.
3. Fit a nondecreasing curve with pooled adjacent violators (least-squares isotonic regression), so small historical reversals do not reverse the intended progression.
4. Draw eligible, rated, nonvoided problems from before the curve's first year. HMMT February can also supply problems within the model window. Remove repeated identities, including AMC 10/12 twins recognized by their shared year and strategy.
5. Match the hardest target first, choosing uniformly among remaining problems within 100 Elo of it. If none are that close, allow the nearest distance plus 25 Elo. Remove the chosen identity before the next draw. Sort the finished mock from lowest to highest Elo, with stable slug ties.

The curve, rating window and source exception are saved with the set. Later rating refreshes do not change a saved set. These are approximate difficulty matches, not a claim that the generated set has been calibrated as an official contest. Ratings and provenance are documented in [DIFFICULTY-RATINGS.md](DIFFICULTY-RATINGS.md).

## Timing, scoring and saved progress

| Target format | Problems | Minutes | Correct | Blank | Incorrect |
|---|---:|---:|---:|---:|---:|
| AMC 8 | 25 | 40 | 1 | 0 | 0 |
| AMC 10 / AMC 12 | 25 | 75 | 6 | 1.5 | 0 |
| AIME | 15 | 180 | 1 | 0 | 0 |

The AIME duration models the historical papers in this app, through 2026. Target-format scoring applies even when a generated mock uses questions from another contest. Timed results grant full credit for a voided slot. Untimed results omit voids from the score denominator. Generated mocks exclude voided questions when the set is built. Self-check answers in a timed mock remain pending until the solver marks them.

The top-right countdown counts active time only. Save and exit, Back to Practice, another route, pagehide and hiding the tab freeze the remaining time. Returning resumes it. Reloaded or imported records discard the old deadline and resume from the saved remainder. When active time reaches zero, the set automatically finishes and grades; later answer changes are rejected. Finish and review can submit early. Manual submission asks for confirmation only when non-voided questions remain unanswered; fully answered mocks submit in one click. The timer continues while this confirmation is open, and expiry submits automatically without asking and dismisses the stale confirmation. Cancel/Escape keeps the set editable. Active answers include a small Clear answer button; clearing updates saved answers and the answered count, and is unavailable in review (owner, 2026-11-09).

`js/practice-sessions.js` stores mock metadata, remaining time, answers and review flags in the existing `mq-practice-sets` records. Topic sets retain their existing behavior. Progress export/import carries both kinds, merging by ID and newest update. Resume a set contains unfinished sets; Completed sets contains finished practice and mock sets. Both history headings have 12px of space above their first row of cards. Review shows submitted answers, source references, correct answers for missed/unanswered mock questions, elapsed time and score on the results overview. The individual problem-review screen omits the extra score/time summary.

## HMMT source material

`js/data/problems/mock-extras.js` contains author-restated 2019 HMMT Geometry prompts and independently checked answer values. Problem 5 accepts either official area or both together. Problem 7 uses the same clarified enclosing-circle wording in topic sets and mocks. [Official paper](https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/problems.pdf) · [Official solutions](https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/solutions.pdf)

## Validation and handoff

Implementation merged in PR #299 (2fee86f); picker/title/review polish merged in PR #300 (8d640f1). The subsequent formatting and centered-chevron work merged in PR #301 (0331709). Results overview keeps the owner’s final blue-hover preference.

`tests/mock-contests.cjs` checks the complete-paper catalog, 160 seeded generated mocks across all formats, difficulty matching, monotone curves, source cutoffs, twin removal, HMMT keys, scoring and clock persistence/freeze/expiry. Chromium checks cover all formats and modes at 1280/375 pixels in light/dark, plus mixed answer formats, invalid-input preservation, reload, hiding/resuming, automatic expiry, locked review, untimed topic sets and voided credit. Screenshots were inspected. Repository gates, all five regression suites and generated-notes/shelf checks must pass before committing.

The current grading rules and exceptions are recorded in the [short-answer audit](tools/answer-keys/short-answers.md) and [multiple-choice audit](tools/answer-keys/README.md).
