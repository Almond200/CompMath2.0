# Competition Math Reference: read this first

1. **Read `PLAN.md`, "Current state" and "The road ahead", before doing anything.** They say what is finished, what is in progress, the order of the remaining steps, and the exact next action.
2. **The handoff rule.** After every major change, every finished step, and the start of every new step:
   - update "Current state" in `PLAN.md`;
   - add a README changelog entry;
   - commit and push.

   Credits can run out at any time, and the next chat starts from that block.
3. **Remind the owner to switch chats** after about 15 to 20 of their messages, once "Current state" is up to date and pushed.
4. **How things are done** is in `CONVENTIONS.md`: card anatomy, figure rules, the gates in §7. Approvals waiting on the owner are in `QUESTIONS.md`.

## Running the checks in a cloud session

`./tools/gates.sh` runs all of these but `check-labels.py` in order and stops at the first failure.

```bash
export JSC=$PWD/tools/jsc-node CHROME=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
python3 tools/scan-conventions.py && python3 tools/check-topics.py && python3 tools/check-lists.py
python3 tools/check-diagrams.py && python3 tools/check-statements.py && ./tools/check-lab.sh
python3 tools/check-labels.py          # 7 known "far-move" findings caused by fonts are the baseline (2026-10-24)
$JSC tools/validate-problem-db.js
```

- **Serving and checking pages:** `python3 -m http.server 8765` serves the app. Check pages in headless Chromium (Playwright is preinstalled; `executablePath` is the `CHROME` above): 0 KaTeX errors, no overflow at 375 px, light and dark.
- **Versions:** `python3 tools/bump-versions.py --changed` bumps `?v=` in `index.html` for every changed file and syncs the lab pages. By hand: bump `?v=` for every touched file, then run `python3 tools/sync-lab-versions.py` so the lab pages load the same versions; `check-lab.sh` fails if they drift. Bump `STATEMENTS_V` in `js/app.js` when statement files change.

## Standing preferences
- Update the files regularly, but not too often (owner, 2026-10-24): update "Current state" in `PLAN.md` and the README changelog, and commit and push, about every 30 cards or 25 problems, and at the end of a step.
- Every missing formula or card found while tagging goes into `QUESTIONS.md` ("Candidate new cards from the practice pass", next P-number, at the top of the table) for approval; the problem cites the nearest card meanwhile.
- Never put the owner's name in the app's files.
- Never re-add problem search, the in-app find, hints, a label setting, or a level filter.
- One fact, one home.
- Every number is checked by computation.
- Tag a card only where the problem's route really uses it (never to give a new card a problem); a tag on a shared AMC 10/12 problem goes on both twins.
- Card order has two values, Curated and Most used; do not bring back "By contest tier". Ramsey $R(3,3)=6$ was removed on purpose (2026-10-23).
- LIVE's concept tags (`tools/live-cache/`) are hints for finding problems and gaps, never a source of tags or text.
