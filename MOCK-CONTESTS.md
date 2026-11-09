# Practice a contest

Owner-requested feature, 2026-11-08. This is a separate panel immediately below Practice a topic. Topic sets remain untimed. Mock sets share their navigation, saving and review interface, with a countdown and contest scoring.

## Past papers and generated mocks

The year/paper field starts empty, including after a contest-family change. Suggestions stay closed on focus or arrow keys until the reader types a non-whitespace character, and clearing the field closes them. No default paper or “Choose a paper from the suggestions” prompt is shown.

Past contest offers AMC 8 (including AJHSME), AMC 10, AMC 12 and AIME. The catalog contains 217 complete papers with verified answer keys. A selected paper keeps its original problem order, including any officially voided question. The header names its year and paper; question headings say only Problem N while taking the mock. During review, the source appears beside Problem N using the usual linked heading.

Generate a mock offers the same four target formats. It may draw from any source contest, retaining the source problem's answer format. AMC questions use A–E choices, AIME questions use 000–999 integer entry, and the ten HMMT Geometry questions use an exact-value expression field. Original sources are shown in review, after submission. Generated titles use “Mock set · Generated AIME” (or the selected family), including older saved sets.

`js/mock-contests.js` builds a difficulty curve for each target format:

1. Use the five calendar years ending at the latest complete paper year in the catalog (owner, 2026-11-09). The current shared window is 2022–2026. A missing family/year is omitted: AMC 8 currently contributes its available 2022–2025 papers; AMC 10, AMC 12 and AIME contribute 2022–2026. Older 2017–2021 difficulty curves no longer affect the target. The generated-problem pool remains earlier than the model window, with the existing HMMT exception.
2. For each problem position, average Elo across that year's papers, then across the available years. This keeps years with additional sittings from receiving extra weight. Exclude voided questions and missing ratings.
3. Fit a nondecreasing curve with pooled adjacent violators (least-squares isotonic regression), so small historical reversals do not reverse the intended progression.
4. Draw keyed, rated, nonvoided problems from before the curve's first year. The owner explicitly allows our 2019 HMMT February Geometry round as an exception to this cutoff. Remove repeated identities, including AMC 10/12 twins recognized by their shared year and strategy.
5. Match the hardest target first, choosing uniformly among remaining problems within 100 Elo of it. If none are that close, allow the nearest distance plus 25 Elo. Remove the chosen identity before the next draw. Sort the finished mock from lowest to highest Elo, with stable slug ties.

The curve, rating window and source exception are saved with the set. Later rating refreshes do not change a saved set. These are approximate difficulty matches, not a claim that the generated set has been calibrated as an official contest. Ratings and provenance are documented in [DIFFICULTY-RATINGS.md](DIFFICULTY-RATINGS.md).

## Timing, scoring and saved progress

| Target format | Problems | Minutes | Correct | Blank | Incorrect |
|---|---:|---:|---:|---:|---:|
| AMC 8 | 25 | 40 | 1 | 0 | 0 |
| AMC 10 / AMC 12 | 25 | 75 | 6 | 1.5 | 0 |
| AIME | 15 | 180 | 1 | 0 | 0 |

The AIME duration models the historical papers in this app, through 2026. Target-format scoring applies even when a generated mock uses questions from another contest. A voided question in an original paper earns full credit, with an explicit note in results. Generated mocks exclude voided questions.

The top-right countdown counts active time only. Save and exit, Back to Practice, another route, pagehide and hiding the tab freeze the remaining time. Returning resumes it. Reloaded or imported records discard the old deadline and resume from the saved remainder. When active time reaches zero, the set automatically finishes and grades; later answer changes are rejected. Finish and review can submit early. Manual submission asks for confirmation only when non-voided questions remain unanswered; fully answered mocks submit in one click. The timer continues while this confirmation is open, and expiry submits automatically without asking and dismisses the stale confirmation. Cancel/Escape keeps the set editable. Active answers include a small Clear answer button; clearing updates saved answers and the answered count, and is unavailable in review (owner, 2026-11-09).

`js/practice-sessions.js` stores mock metadata, remaining time, answers and review flags in the existing `mq-practice-sets` records. Topic sets retain their existing behavior. Progress export/import carries both kinds, merging by ID and newest update. Resume a set contains unfinished sets; Completed sets contains finished practice and mock sets. Both history headings have 12px of space above their first row of cards. Review shows submitted answers, source references, correct answers for missed/unanswered mock questions, elapsed time and score on the results overview. The individual problem-review screen omits the extra score/time summary.

## HMMT source material

`js/data/problems/mock-extras.js` contains author-restated mathematical prompts and answer values checked against the [official 2019 Geometry paper](https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/problems.pdf) and [official solutions](https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/solutions.pdf). No official solution prose is imported. Problem 5 accepts both official possible areas. The existing restricted expression parser grades values; it never evaluates JavaScript. Source files and Settings credit HMMT separately from MAA material. The existing MAA statement importer and grading keys are unchanged; topic sets retain their existing MAA eligibility.

## Validation and handoff

Implementation merged in PR #299 (2fee86f); picker/title/review polish merged in PR #300 (8d640f1). The subsequent formatting and centered-chevron work merged in PR #301 (0331709). Results overview keeps the owner’s final blue-hover preference.

`tests/mock-contests.cjs` checks the complete-paper catalog, 160 seeded generated mocks across all formats, difficulty matching, monotone curves, source cutoffs, twin removal, HMMT keys, scoring and clock persistence/freeze/expiry. Chromium checks cover all formats and modes at 1280/375 pixels in light/dark, plus mixed answer formats, invalid-input preservation, reload, hiding/resuming, automatic expiry, locked review, untimed topic sets and voided credit. Screenshots were inspected. Repository gates, all five regression suites and generated-notes/shelf checks must pass before committing.

This app/backend/shared-documentation batch is explicitly requested by the owner. The standing textbook/source ownership split remains in place. Codex's next textbook chapter is AMC Geometry S7.
