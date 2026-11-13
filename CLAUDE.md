# Competition Math Reference: read this first

1. **Read `PLAN.md`, "Current state" and "The road ahead", before doing anything.** They say what is finished, what is in progress, the order of the remaining steps, and the exact next action.
2. **The handoff rule.** After every major change, every finished step, and the start of every new step:
   - update "Current state" in `PLAN.md`;
   - add an entry to `CHANGELOG.md`;
   - commit and push.

   Credits can run out at any time, and the next chat starts from that block.
3. **Remind the owner to switch chats** after about 15 to 20 of their messages, once "Current state" is up to date and pushed.
4. **How things are done** is in `CONVENTIONS.md`: card anatomy, figure rules, the gates in §7. Approvals waiting on the owner are in `QUESTIONS.md`. Past audits, reviews and repair logs are all in `AUDITS.md`.
5. **Two agents work in this repository.** Claude keeps the shared Markdown (`PLAN.md`, `CHANGELOG.md`, `CONVENTIONS.md`, `CONTRIBUTING.md`, `README.md`, `LEARN-OUTLINE.md`, `TOPIC-TREE.md`, `QUESTIONS.md`, `TEXTBOOK-REVISION.md`, `AUDITS.md`) and works on cards, problems, the topic tree, `js/app.js`, and search: the book-search implementation, `tests/book-search.cjs`, and the matching and indexing logic of `tools/build-book-notes.cjs`. Codex owns the chapter content in `js/data/learn/**` (with `tools/build-learn-shelf.py`), regenerates the End-of-book Notes with the builder after each batch, and normally reports chapter batches for Claude to record in the shared Markdown. Explicit owner requests may authorize a scoped app or documentation batch, as with the recent Practice/UI work and this maintenance pass, without changing continuing ownership. Neither changes this division without coordinating first. Both bump asset versions in `index.html`; keep both sets of bumps when merging. Shared-file merges follow CONTRIBUTING, "Two agents: shared files and merges".

**Owner checkpoint (2026-11-10): tree-only T4 topic practice is implemented and validated.** Practice a topic now offers the 457 tree nodes through its existing searchable suggestions; selecting a branch includes its direct and descendant filings. Available counts, contextual difficulty, small-pool limits, recognized twin deduplication and existing saved sets are preserved. New sets save the stable topic id; existing HMMT exact-value prompts also work in untimed topic sets. AUDITS.md (Tree-only Practice a topic) records scope and validation. Since then (2026-11-11) T4b and T5 are done (the Topic section on every problem page and in practice review) and so is T6 (card profiles and a Topic profile on every topic's page); and the Methods-card practice targets arrived as Practice a card (formulas, methods and patterns), so nothing of Step T remains. No tree node was added or retired. T3, pruning and five focused accuracy audits are complete: every problem is filed (4,775 on 2026-11-12) and there are 782 cards (747 with a home, 35 general methods without). **Step T is done. The current step is Step H (owner, 2026-11-12): adding the HMMT February individual rounds (Algebra and Number Theory, Combinatorics, Geometry) with tree filings and cards only; each problem's page links the official paper and the official solution, and no solution of our own is written. PLAN.md, "The order of work", step 0, has the procedure, the order of years and the status. Claude's forward lane (2019 to 2026) is done (2026-11-13); every HMMT rating from 2010 on comes from the official results (`tools/hmmt-results.py`).** AUDITS.md holds every tree decision, repair, accuracy review and capacity count, and the interface and accessibility reviews. Shared UI/math fixes remain complete. Textbooks are on hold at the owner's word (2026-11-12) at 37/103 revised chapters, with AMC Geometry S7 next only if resumed. Continuing ownership is unchanged.

## Running the checks in a cloud session

`./tools/gates.sh` runs the convention, topic, list, shelf, topic-tree, practice-gap, diagram, statement, lab and database checks, stopping at the first failure. It does not run `check-labels.py` or the five regression suites below. It writes logs to `/tmp`; if that path is unavailable, run the constituent commands with logs in a writable directory.

```bash
export JSC=$PWD/tools/jsc-node
# Set CHROME to an installed Chromium executable before browser-dependent checks.
python3 tools/scan-conventions.py && python3 tools/check-topics.py && python3 tools/check-lists.py
python3 tools/check-diagrams.py && python3 tools/check-statements.py && ./tools/check-lab.sh
python3 tools/check-labels.py          # historical 2026-10-24 baseline: 7 font-related far-move findings
python3 tools/build-learn-shelf.py --check
node tools/build-book-notes.cjs --check    # the generated End-of-book Notes match the chapter data
python3 tools/build-topic-tree.py --check   # topic-tree.js matches TOPIC-TREE.md
python3 tools/hmmt-results.py --check    # HMMT ratings match the official solve counts (also in gates.sh)
node tools/check-topic-tree.js              # tree, card homes, problem tree tags (CONVENTIONS §15)
node tests/practice-sessions.cjs
node tests/practice-topics.cjs        # tree-only pools, ancestry, eligibility and search (also in gates.sh)
node tests/answer-keys.cjs
node tests/book-search.cjs          # includes semantic-index corpus coverage and artifact consistency
node tests/problem-difficulty.cjs
node tests/mock-contests.cjs
node tests/card-text.cjs             # raw LaTeX comparisons and linked prose survive HTML insertion
node tools/practice-gaps.js --check     # every card has two practice problems
$JSC tools/validate-problem-db.js
```

- **Book reference search:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-book-search.cjs` checks Index/Glossary result order, jumps, keyboard focus, Back/repeat, math terms, fade and reduced motion. `tests/book-search.cjs` checks all canonical Index terms and generated targets across the 13 books.
- **Settings previews / math rendering:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-settings-preview.cjs` compares the problem preview with Practice and checks the complete tangent-circle paragraph in both themes.
- **Tree topic picker:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8895 node tools/check-practice-topics.cjs` checks tree-only options, ancestor pools, counts/difficulty, sparse topics, keyboard/scroll, old/new saved sets and untimed exact-value grading in both themes at desktop/mobile sizes. See AUDITS.md (Tree-only Practice a topic).
- **Practice a card:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-practice-card.cjs` checks the panel's place after Practice a topic and before Practice a contest, the Formula/Method/Pattern chooser, the card search and counts, the difficulty note, and that a generated set has the asked number of problems, each citing the card and none twice as an AMC 10/12 twin, in both themes at desktop/mobile sizes.
- **Browse pages / problem sections:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-browse.cjs` checks a problem page's Topic, Difficulty and Brief solution sections (arrow alignment included), the Contests buttons, Problems by topic (tree rail, contest groups) and Problems by difficulty (stacked chart, contest chips, ranges) in both themes at desktop/mobile sizes.
- **Contest year pages:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-contest-page.cjs` checks the paper toggle (every width, address, reload), the plain problem tiles, and each paper's figures, Compare with yardsticks (all years, past ten papers, the sitting before), difficulty-by-question chart, subjects, years chart and topics against figures recomputed from the data files, including 2021's two AMC sittings, in both themes at desktop/mobile sizes.
- **Contest profile:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-contest-profile.cjs` recomputes a card's profile figures (count, share, median and quartile ratings, contest shares, top topic, recent period) and a topic's (its subtree's problems, ratings, contests and most-cited card) from the data files and compares them with the page, for large, mid-sized and small cards and two topics in both themes at desktop/mobile sizes.
- **Practice actions:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-practice-actions.cjs` checks unanswered-submit confirmation, Cancel/Escape, one-click completed submission, visible clearing/persistence, locked review, numeric/exact inputs and mock timeout/route cleanup.
- **SVG UI icons:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-ui-icons.cjs` checks drawn/box centering, font independence, star/list-menu synchronization and persistence, menus, tags, book/source links and experimental-page symbols.
- **Accessibility:** `CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-accessibility.cjs` checks the verified keyboard/contrast fixes; see AUDITS.md (Accessibility review).
- **Serving and checking pages:** `python3 -m http.server 8765` serves the app. Check pages in headless Chromium (check that Playwright and Chromium are installed; use `CHROME` as `executablePath`): 0 KaTeX errors, no overflow at 375 px, light and dark.
- **Versions:** `python3 tools/bump-versions.py --changed` bumps `?v=` in `index.html` for every changed file and syncs the lab pages. By hand: bump `?v=` for every touched file, then run `python3 tools/sync-lab-versions.py` so the lab pages load the same versions; `check-lab.sh` fails if they drift. Bump `STATEMENTS_V` in `js/app.js` when statement files change.

## Standing preferences
- Update the files regularly, but not too often (owner, 2026-10-24): update "Current state" in `PLAN.md` and `CHANGELOG.md`, and commit and push, about every 30 cards or 25 problems, and at the end of a step.
- Filter candidates with common sense before they go into `QUESTIONS.md`: propose what AMC, AIME or olympiad problems actually use. An olympiad-only result belongs when it is shown to be significant there (cite the kind of problem it solves); results never used in contests, such as Dirac's theorem or the Prime Number Theorem estimate, stay out (owner, 2026-10-30).
- Every missing formula or card found while tagging goes into `QUESTIONS.md` ("Candidate new cards from the practice pass", next P-number, at the top of the table) for approval; the problem cites the nearest card meanwhile.
- Never put the owner's name in the app's files.
- Never re-add problem search, the in-app find, hints, a label setting, or a level filter. The book-scoped chapter search is explicitly requested (2026-11-06); keep it separate from the main reference search.
- Before editing any card, reread CONVENTIONS §1 and §2: a Key forms bullet is the maths, then ` — `, then a short lowercase gloss, never a paragraph; every Key form is proved in Why it works (owner, 2026-11-01).
- One fact, one home.
- Every number is checked by computation.
- Every card, new ones included, has at least two practice problems (linked contest problems, else exercises in `extra-problems.js`); `gates.sh` fails otherwise. A new card follows the checklist in CONVENTIONS ("New cards are registered").
- A "tag" on a problem is a formula, method or pattern card it cites (`formulas`, `trickFormulas`).
- Rebuild the search index once at the end of a step, not after each small card edit (owner, 2026-10-25).
- Be critical, not passive (owner, 2026-11-07): when tagging or filing a problem, look for errors and say so. If no card or tree node really fits, or a strategy, tag, card or node is wrong, record it (fix it, or add a `QUESTIONS.md` row) instead of settling for the best-fitting tag.
- Tag a card only where the problem's route really uses it (never to give a new card a problem); a tag on a shared AMC 10/12 problem goes on both twins.
- No sticky headers: a page's header scrolls away with the page (a side rail may stay beside it) (owner, 2026-10-31). On a phone the top bar and the book view's navigation row stay pinned, at the owner's word.
- Every modal dialog is centred across and sits slightly above the middle of the screen (6vh up), never pinned near the top; popups tied to something (dropdowns, previews, menus, drawers) stay by it. A destructive confirmation button (Clear, Delete) is solid red (owner, 2026-11-08; CONVENTIONS, "Dialogs sit just above the middle of the screen").
- UI action/navigation icons use SVG and inherit existing colours; shared symbols are in `js/ui-icons.js`. Center the drawn bounds and icon box, preserve accessible names and hit areas, and keep math notation as text/KaTeX.
- Dense full-row links keep their keyboard outline inside their own bounds, preserving content alignment and row height; ordinary buttons and inline links keep visible surrounding focus space.
- Compact text-entry fields use a single border or editor underline; the Practice answer input uses one 1px blue border with no inset reinforcement; blank space outside it must not focus it through expanded mobile touch targeting (owner, 2026-11-09). Ordinary keyboard outlines use a 1px gap. Keep the card + button square and popup Create in the shared soft-button style, like Cancel (owner, 2026-11-09).
- Search fields use a single focus border, without the extra outer accessibility ring (owner, 2026-11-08). Browse by Tag focuses its heading on opening rather than auto-focusing search; explicit search shortcuts still work.
- Secondary soft actions, including Results overview, Cancel and Practice navigation, keep blue hover; inactive list toolbar buttons keep neutral hover. See CONVENTIONS for the explicit secondary-button rule.
- Hover and focus colours follow where a control lives: inside a space (Learn, Practice, a reference space) a tile or choice lights up in the space's colour (`--space`, `--space-soft`); app-wide controls (top bar, tags, links) use the blue `--accent` (owner, 2026-11-08; CONVENTIONS, "Hover and focus colours follow where a control lives").
- A brief note at the foot of the screen uses the app's toast (`toast()` in `js/app.js`, the look of "Opened strategies reset" in Settings), with a light shadow; no other bottom popup style, and no note for actions as frequent as Undo and Redo (owner, 2026-11-08).
- Prefer app-styled searchable suggestions and dialogs to native browser dropdowns, prompts and confirmation popups. Practice sets save on exit without a confirmation; Finish and review submits directly when all non-voided questions are answered; otherwise it asks for confirmation (owner, 2026-11-09). Active answers have a small visible Clear answer button. Mock timeout always submits automatically and dismisses any pending manual-finish confirmation. Keep the top-left Back to Practice link and Save and exit during practice; do not duplicate the back link as a review button. Topic practice sets have no timer or timer setting (owner, 2026-11-05). The explicitly requested mock contests are timed, pause on exit/tab hiding, and auto-submit at zero (owner, 2026-11-08; MOCK-CONTESTS.md).
- No boxes inside boxes: a subsection inside a panel is a heading over its content, not a second bordered box (owner, 2026-10-31).
- Our own design language: rounded bordered cards, soft tints, pill buttons, hairlines. Take another site's structure when it is easier to use, never its look (owner, 2026-10-31).
- Links are always the app's blue, never purple after a visit (owner, 2026-11-01).
- No gradients on buttons (or other controls): solid colours only. The book covers are the one exception (owner, 2026-10-31).
- The textbooks stay at a high level and are not too easy. Basic is not easy: a basic problem uses relatively simple techniques but can be hard to solve. An Introduction's Exercises are basic, not easy (owner, 2026-10-31).
- Reference sections (End-of-book Notes) carry no Core, Core II or Extension tag and are not counted as lessons.
- No chapter or lesson title names the AMC 10 or AMC 12: an advanced chapter is "Advanced counting", not "Counting for the AMC 12" (owner, 2026-11-01).
- Card order has two values, Curated and Most used; do not bring back "By contest tier". Ramsey $R(3,3)=6$ was removed on purpose (2026-10-23).
- LIVE's concept tags (`tools/live-cache/`) are hints for finding problems and gaps, never a source of tags or text.
