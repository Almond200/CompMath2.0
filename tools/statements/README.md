# Problem statements for permitted contests

The owner has permission to show the statements of the link-only contests (2026-11-20). SMT is done (all 667 problems, 2011 to 2014 and 2018 to 2025). Next: BMT (355 problems, 2013 to 2025), then ARML Individual (100) and ARML Local Individual (60). After those, the other link-only contests (PLAN.md, "Current state").

The app side is ready for SMT, BMT and ARML: `PERMITTED_STATEMENTS` in `js/app.js` gives each family its folder and credit line, and `tools/check-statements.py` accepts the folders `smt`, `bmt` and `arml`. A new contest needs both: an entry in `PERMITTED_STATEMENTS` (family name → folder and credit), and the folder, its credit text and its paper-link check in `check-statements.py`. The About page's credit paragraph for the contest (Settings → Credits) must also say the statements are reproduced with permission.

## The procedure, one year at a time

```bash
export STATEMENTS_WORK=/tmp/statements-work     # scratch: papers, drafts, figure crops, page images
mkdir -p $STATEMENTS_WORK/papers $STATEMENTS_WORK/drafts $STATEMENTS_WORK/img
(python3 -m http.server 8765 >/dev/null 2>&1 &)
node tools/statements/dump-problems.cjs SMT BMT ARML "ARML Local" > $STATEMENTS_WORK/probs.json
pip install pymupdf                               # the extractor needs it
```

1. **Download** each paper the problems link to (`url` in `probs.json`, without `#page=`) into `$STATEMENTS_WORK/papers`.
2. **Draft**: `python3 tools/statements/extract.py PAPER.pdf all $STATEMENTS_WORK/drafts/bmt2025_algebra.json $STATEMENTS_WORK/figs/bmt bmt2025_algebra` writes one draft per problem (LaTeX guessed from the fonts) and crops every figure to `figs/bmt/bmt2025_algebra-<n>.png`. For ARML, give the page range of the round in the book (`ARML_PAGES` and `ARML_LOCAL_PAGES` in `js/app.js`).
3. **Read every page image** (`pdftoppm -r 80 -png PAPER.pdf $STATEMENTS_WORK/img/x`). The draft is only an aid: it silently drops numerators, misplaces exponents of exponents, loses overlines and arcs, and some fonts extract as gibberish (SMT 2025 General). The statement is what the image shows. Zoom (`pdftoppm -r 200 -x -y -W -H`) on anything small.
4. **Write the spec**: `tools/statements/spec/<dir>/<year>.txt`, a block `=== <slug tail>` per problem in the database (the tail is the slug after `<year>-<dir>-`: `algebra-3`, `individual-7`, `local-individual-2`). Include only problems in `probs.json`; leave out tiebreakers and anything the database left out (calculus). Conventions: `$...$` inline, `$$...$$` display, `\begin{gathered}` or `\begin{aligned}` for stacked equations, `\frac`, `\overline{AB}` for segments named with a bar, `\overset{\frown}{AB}` for arcs, `\operatorname{lcm}`, `\pmod{n}`, `\{\}` for sets, `\%` and `\$`, numbers inside `$...$`, "• " for bullets, a blank line between paragraphs. Keep the paper's wording; fix only obvious typos.
5. **Figures**: put `@@fig:bmt2025_geometry-4.png@@` (the cropped file) where the figure belongs, usually after the text. Check each crop by eye: the extractor files a figure under the problem whose text holds its middle, and misses figures made of tiny boxes (write those as LaTeX, e.g. `$\square\times\square$`).
6. **Build and check**: `python3 tools/statements/build.py bmt`, then `node tools/statements/katex-check.cjs js/data/problems/statements/bmt/*.js` (0 errors) and `python3 tools/check-statements.py`. Open two or three problem pages (`#/problem/<slug>`) at 1280 and 375 px in both themes.
7. **Tags**: while reading, compare each problem with its cards and tree filing (`grep 'ref: "2025 BMT' js/data/problems/problem-db.js`). Fix a wrong tag where the right card is clear, record it in AUDITS.md, and put a missing card in QUESTIONS.md instead of guessing.
8. After every year or two: bump `STATEMENTS_V` in `js/app.js` if statement files changed, `python3 tools/bump-versions.py --changed`, `python3 tools/sync-lab-versions.py`, `./tools/gates.sh`, then update "Current state" in PLAN.md and CHANGELOG.md, commit and push.

## Known traps

- Exponent towers: a superscript's own superscript comes out flat in the draft (`44^{22025}` was $44^{2^{2025}}$).
- Display fractions and sums come out as scattered fragments; rebuild them from the image.
- A figure drawn as small boxes (blank squares to fill) is skipped by the cropper.
- Older SMT papers (2011 to 2014) put numbers in text fonts, so the draft leaves them outside math; the spec puts them in `$...$`.
- BMT 2017 Geometry links a mirror of the official paper (`oss.linstitute.net`); its statements still credit BMT.
- PUMaC's archive is unreachable from the cloud container (certificate error); leave it for last.
