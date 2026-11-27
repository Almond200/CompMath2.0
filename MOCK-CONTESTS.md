# Mock a contest

The **Mock a contest** panel shares navigation, saving and review with topic sets. Generated mocks and supported timed past papers add a countdown and contest scoring.

## Past papers and generated mocks

The past-paper search starts empty. Type a contest name, round or year to see matching papers. Clearing the field closes suggestions. Choose a result to enable **Start paper**.

Past contest searches all indexed papers. A selected paper keeps its original problem numbers and order, including any voided question. The picker displays the paper’s time limit where established, including the time per pair for staged rounds. During review, the source appears beside the question number.

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

The AIME duration models the historical papers in this app, through 2026. The four generated formats use the 220 complete modern-length AMC and AIME papers to model difficulty. Target-format scoring applies even when a generated mock uses questions from another contest. A displayed mock score for one of these formats grants full credit for a voided slot. The other past papers report correct answers and omit voids from that denominator. Generated mocks exclude voided questions when the set is built. Self-check answers remain pending until the solver marks them.

The top-right countdown counts active time only. Save and exit, Back to Practice, another route, pagehide and hiding the tab freeze the remaining time. Returning resumes it. Reloaded or imported records discard the old deadline and resume from the saved remainder. When active time reaches zero, the set automatically finishes and grades; later answer changes are rejected. Finish and review can submit early. Manual submission asks for confirmation only when non-voided questions remain unanswered; fully answered mocks submit in one click. The timer continues while this confirmation is open, and expiry submits automatically without asking and dismisses the stale confirmation. Cancel/Escape keeps the set editable. Active answers include a small Clear answer button; clearing updates saved answers and the answered count, and is unavailable in review (owner, 2026-11-09).

`js/practice-sessions.js` stores mock metadata, remaining time, answers and review flags in the existing `mq-practice-sets` records. Topic sets retain their existing behavior. Progress export/import carries both kinds, merging by ID and newest update. Resume a set contains unfinished sets; Completed sets contains finished practice and mock sets. Both history headings have 12px of space above their first row of cards. Review shows submitted answers, source references, correct answers for missed/unanswered mock questions, elapsed time and score on the results overview. The individual problem-review screen omits the extra score/time summary.

## Archived paper limits

The timing table covers 1,053 of the 1,085 indexed papers. Published paper instructions take precedence over a tournament's general rules. When a cover omits timing, use the published rules for the corresponding round and format.

| Past-paper format | Minutes | Sources |
|---|---:|---|
| AHSME, 1960–1977 | 80 | [1961 report](https://archive.chsfomaha.org/wp-content/uploads/2022/10/1961-03-24.pdf), [MAA account of the 1972 contest](https://files.eric.ed.gov/fulltext/ED079045.pdf), [MAA contest book](https://www.cambridge.org/core/books/abs/contest-problem-book-iv/preface/66A35149AF60253A45F2FA9725645DFE) |
| AHSME, 1978–1999 | 90 | [MAA contest book](https://www.cambridge.org/core/books/abs/contest-problem-book-iv/preface/66A35149AF60253A45F2FA9725645DFE), [historical comparison](https://www.ams.org/books/nml/038/nml038-endmatter.pdf) |
| BMT focus tests and BmMT Individual, including Online | 60 | [Berkeley FAQ](https://berkeley.mt/faqs/), [2025 BMT Algebra cover](https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf), [BmMT Individual archive](https://berkeley.mt/archives/bmmt/individual-round/) |
| HMMT February and November individual tests | 50 | [HMMT formats](https://beta.hmmt.org/www/tournaments/novfeb), [historical HMMT rules](https://web.mit.edu/tabbott/hmmt/faq.shtml) |
| PUMaC Division A and B subject tests | 50 | [PUMaC competition rules](https://pumac.princeton.edu/competition-rules) |
| SMT subject tests and General | 50 and 110 | [Stanford competition information](https://sumo.stanford.edu/smt/info.html), [General paper instructions](https://www.stanfordmathtournament.com/pdfs/smt2013/general-problems.pdf) |
| CMIMC individual tests | 60 | [CMIMC information](https://cmimc.org/information.php), [2022 paper instructions](https://github.com/howard36/cmimc-official/blob/master/public/assets/docs/past-tests/2022_Geo_D1.pdf) |
| ARML and ARML Local Individual | 50 (5 × 10) | [ARML rules](https://arml.com/ARML/arml_2019/page/index.php?page=14&page_type=public) |
| Duke Math Meet Individual | 40 (4 × 10) in 2007 and 2008, 50 (5 × 10) from 2009 | [2007 paper](https://sites.math.duke.edu/dumu/mathmeet/prob/2007_individual.pdf), [2008 paper](https://sites.math.duke.edu/dumu/mathmeet/prob/2008_individual.pdf), [Duke rules](https://sites.math.duke.edu/dumu/mathmeet/rules.html) |
| MATHCOUNTS Sprint, Target and Team | 40, 24 (4 × 6) and 20 | [MATHCOUNTS rules](https://www.mathcounts.org/programs/official-rules-procedures) |
| CHMMC and 2024 CMM Individual | 60, with 75 for the 2021 CHMMC paper | [CHMMC/CMM archive](https://caltechmathmeet.org/problems/), [2021 CHMMC printed rules](https://www.caltechmathmeet.org/_files/ugd/006423_b54510281b29442da636c53d863ef26a.pdf), [historical CHMMC format](https://ccamathteam.wordpress.com/2022/04/19/2021-22-chmmc/) |
| CMM Individual, 2025–2026 format | 90 | [2026 paper instructions](https://www.caltechmathmeet.org/_files/ugd/006423_3b1888df47f145499354cebef416fbcb.pdf), [archive of 12-question papers](https://caltechmathmeet.org/problems/) |
| Maryland High School Mathematics Competition Part I | 75 | [Maryland paper](https://mathcomp.math.umd.edu/files/2026/10/PartI2026.pdf) |
| Math Prize for Girls | 150 | [2009 event](https://mathprize.atfoundation.org/experience/past-events/2009), [paper archive](https://mathprize.atfoundation.org/resources) |
| MMATHS and Girls in Math at Yale Individual | 75 | [MMATHS individual answer sheet](https://yalemathcompetitions-files.s3.amazonaws.com/mmaths_2023_individual.pdf), [Yale round formats](https://en.hanlin.com/competitions/gim) |
| Lehigh | 120 | [Early paper instructions](https://www.lehigh.edu/~dmd1/1999exam.html), [organizer's contest schedule](https://www.lehigh.edu/~dmd1/hs.html) |
| Utah State Junior and Senior | 150 | [Utah paper archive](https://www.weber.edu/statemathcontest/exams.html), [2020 printed instructions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2020_Junior_Exam.pdf) |
| Columbus State Tournament | 90 through 2020, 240 in 2022 | [Prior individual exams](https://www.columbusstate.edu/math/tournament/previous-math-contest.php), [2022 printed limit](https://www.columbusstate.edu/math/_docs/tournament/2022-tournament-test-1.pdf) |
| MBMT Lower and Upper subject tests | 30 | [MBMT rules](https://mbmt.mbhs.edu/rules), [past papers](https://mbmt.mbhs.edu/archive) |
| CEMC Pascal, Cayley and Fermat | 60 | [CEMC past contests](https://cemc.uwaterloo.ca/resources/past-contests), [Fermat paper instructions](https://cemc.uwaterloo.ca/sites/default/files/documents/2025/2025FermatContest.pdf) |
| UKMT Junior, Intermediate and Senior Mathematical Challenges | 60, 60 and 90 | [UKMT competition structure](https://ukmt.org.uk/wp-content/uploads/2026/11/UKMT-Competition-Structure-1.pdf) |

The 1950–1959 AHSME papers and 2021 Columbus State paper remain untimed pending confirmation of their original limits. Calgary's archive gives 90 minutes across Parts A and B together. The app indexes only Part A, which has no separate published limit. [Example Calgary paper](https://science.ucalgary.ca/sites/default/files/teams/7/Junior%20Math%20Contest/Jr-Math-examenglish-2025.pdf)

In a paired paper, the countdown shows the remaining time in the current pair and only that pair's questions can be changed. Expiry opens the next pair and submits the whole mock after the final pair. **Submit pair** opens the next pair early. Each new pair receives its full time, and unused time from an early submission does not count toward the time used in results. **Finish and review** can submit the whole mock early. **Save and exit** preserves the active pair and its remaining time. Review opens all pairs. Saved attempts keep the timing in effect when they were started.

## HMMT source material

`js/data/problems/mock-extras.js` contains author-restated 2019 HMMT Geometry prompts and independently checked answer values. Problem 5 accepts either official area or both together. Problem 7 uses the same clarified enclosing-circle wording in topic sets and mocks. [Official paper](https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/problems.pdf) · [Official solutions](https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/solutions.pdf)

## Validation and handoff

Implementation merged in PR #299 (2fee86f); picker/title/review polish merged in PR #300 (8d640f1). The subsequent formatting and centered-chevron work merged in PR #301 (0331709). Results overview keeps the owner’s final blue-hover preference.

`tests/mock-contests.cjs` checks the complete-paper catalog, 160 seeded generated mocks across all formats, difficulty matching, monotone curves, source cutoffs, twin removal, HMMT keys, scoring and clock persistence/freeze/expiry. Chromium checks cover all formats and modes at 1280/375 pixels in light/dark, plus mixed answer formats, invalid-input preservation, reload, hiding/resuming, automatic expiry, locked review, untimed topic sets and voided credit. Screenshots were inspected. Repository gates, all five regression suites and generated-notes/shelf checks must pass before committing.

The current grading rules and exceptions are recorded in the [short-answer audit](tools/answer-keys/short-answers.md) and [multiple-choice audit](tools/answer-keys/README.md).
