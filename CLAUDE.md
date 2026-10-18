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

```bash
export JSC=$PWD/tools/jsc-node CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
python3 tools/scan-conventions.py && python3 tools/check-topics.py && python3 tools/check-lists.py
python3 tools/check-diagrams.py && python3 tools/check-statements.py && ./tools/check-lab.sh
python3 tools/check-labels.py          # 5 known "far-move" findings caused by fonts are the baseline
$JSC tools/validate-problem-db.js
```

- **Serving and checking pages:** `python3 -m http.server 8765` serves the app. Check pages in headless Chromium (Playwright is preinstalled; `executablePath` is the `CHROME` above): 0 KaTeX errors, no overflow at 375 px, light and dark.
- **Versions:** bump `?v=` in `index.html` for every touched file, then run `python3 tools/sync-lab-versions.py` so the lab pages load the same versions; `check-lab.sh` fails if they drift. Bump `STATEMENTS_V` in `js/app.js` when statement files change.

## Standing preferences
- Update the files regularly: during the practice pass, update "Current state" in `PLAN.md` and the README changelog, and commit and push, after every card or every 8 to 10 problems, whichever comes first.
- Every missing formula or card found while tagging goes into `QUESTIONS.md` ("Candidate new cards from the practice pass", next P-number, at the top of the table) for approval; the problem cites the nearest card meanwhile.
- Never put the owner's name in the app's files.
- Never re-add problem search, the in-app find, hints, a label setting, or a level filter.
- One fact, one home.
- Every number is checked by computation.
