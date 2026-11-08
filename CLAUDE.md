# Competition Math Reference: read this first

1. **Read `PLAN.md`, "Current state" and "The road ahead", before doing anything.** They say what is finished, what is in progress, the order of the remaining steps, and the exact next action.
2. **The handoff rule.** After every major change, every finished step, and the start of every new step:
   - update "Current state" in `PLAN.md`;
   - add an entry to `CHANGELOG.md`;
   - commit and push.

   Credits can run out at any time, and the next chat starts from that block.
3. **Remind the owner to switch chats** after about 15 to 20 of their messages, once "Current state" is up to date and pushed.
4. **How things are done** is in `CONVENTIONS.md`: card anatomy, figure rules, the gates in §7. Approvals waiting on the owner are in `QUESTIONS.md`.
5. **Two agents work in this repository.** Claude keeps the shared Markdown (`PLAN.md`, `CHANGELOG.md`, `CONVENTIONS.md`, `CONTRIBUTING.md`, `README.md`, `LEARN-OUTLINE.md`, `TOPIC-TREE.md`, `QUESTIONS.md`, `TEXTBOOK-REVISION.md`) and works on cards, problems, the topic tree, `js/app.js`, and search: the book-search implementation, `tests/book-search.cjs`, and the matching and indexing logic of `tools/build-book-notes.cjs`. Codex owns the chapter content in `js/data/learn/**` (with `tools/build-learn-shelf.py`), regenerates the End-of-book Notes with the builder after each batch, and does not edit the shared Markdown: it reports each batch, and Claude records it. Neither changes this division without coordinating first. Both bump asset versions in `index.html`; keep both sets of bumps when merging. Shared-file merges follow CONTRIBUTING, "Two agents: shared files and merges".

## Running the checks in a cloud session

`./tools/gates.sh` runs the convention, topic, list, shelf, topic-tree, practice-gap, diagram, statement, lab and database checks, stopping at the first failure. It does not run `check-labels.py` or the three regression suites below. It writes logs to `/tmp`; if that path is unavailable, run the constituent commands with logs in a writable directory.

```bash
export JSC=$PWD/tools/jsc-node
# Set CHROME to an installed Chromium executable before browser-dependent checks.
python3 tools/scan-conventions.py && python3 tools/check-topics.py && python3 tools/check-lists.py
python3 tools/check-diagrams.py && python3 tools/check-statements.py && ./tools/check-lab.sh
python3 tools/check-labels.py          # historical 2026-10-24 baseline: 7 font-related far-move findings
python3 tools/build-learn-shelf.py --check
node tools/build-book-notes.cjs --check    # the generated End-of-book Notes match the chapter data
python3 tools/build-topic-tree.py --check   # topic-tree.js matches TOPIC-TREE.md
node tools/check-topic-tree.js              # tree, card homes, problem tree tags (CONVENTIONS §15)
node tests/practice-sessions.cjs
node tests/answer-keys.cjs
node tests/book-search.cjs
node tools/practice-gaps.js --check     # every card has two practice problems
$JSC tools/validate-problem-db.js
```

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
- A brief note at the foot of the screen uses the app's toast (`toast()` in `js/app.js`, the look of "Opened strategies reset" in Settings), with a light shadow; no other bottom popup style, and no note for actions as frequent as Undo and Redo (owner, 2026-11-08).
- Prefer app-styled searchable suggestions and dialogs to native browser dropdowns, prompts and confirmation popups. Practice sets save on exit without a confirmation; Finish and review submits directly. Keep the top-left Back to Practice link and Save and exit during practice; do not duplicate the back link as a review button. Practice sets have no timer or timer setting (owner, 2026-11-05).
- No boxes inside boxes: a subsection inside a panel is a heading over its content, not a second bordered box (owner, 2026-10-31).
- Our own design language: rounded bordered cards, soft tints, pill buttons, hairlines. Take another site's structure when it is easier to use, never its look (owner, 2026-10-31).
- Links are always the app's blue, never purple after a visit (owner, 2026-11-01).
- No gradients on buttons (or other controls): solid colours only. The book covers are the one exception (owner, 2026-10-31).
- The textbooks stay at a high level and are not too easy. Basic is not easy: a basic problem uses relatively simple techniques but can be hard to solve. An Introduction's Exercises are basic, not easy (owner, 2026-10-31).
- Reference sections (End-of-book Notes) carry no Core, Core II or Extension tag and are not counted as lessons.
- No chapter or lesson title names the AMC 10 or AMC 12: an advanced chapter is "Advanced counting", not "Counting for the AMC 12" (owner, 2026-11-01).
- Card order has two values, Curated and Most used; do not bring back "By contest tier". Ramsey $R(3,3)=6$ was removed on purpose (2026-10-23).
- LIVE's concept tags (`tools/live-cache/`) are hints for finding problems and gaps, never a source of tags or text.
