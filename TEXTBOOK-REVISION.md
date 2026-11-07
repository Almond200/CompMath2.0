# Textbook revision

Codex revises the textbooks on `codex/textbook-revision`; Claude keeps the shared Markdown (this file, `PLAN.md`, `CHANGELOG.md`, `CONVENTIONS.md`, `README.md`, `LEARN-OUTLINE.md`) up to date from Codex's batch reports. So Codex does not edit the shared Markdown after a batch: it reports what changed, and Claude records it here and in the other files. Codex edits `js/data/learn/**`, `tools/build-book-notes.cjs`, `tools/build-learn-shelf.py` and `tests/book-search.cjs`, and leaves problem tags, strategies, topic-tree data, card homes, source cards and `js/app.js` to Claude. Both bump asset versions in `index.html`, and both sets of bumps are kept on merge.

## Requested direction

Teach a connected mathematical story. Define ideas before using them, explain why each step follows, develop examples through the reasoning that motivates the method, and state the limits of a model or identity. A lesson may include the definitions, formulas, derivations, proofs and worked examples it needs; the cards remain the compact reference. Avoid opening with an unrelated question or walking through a sequence of card names and short summaries, and write direct mathematical prose, without editorial asides about memorizing formulas or about how textbook-like the writing is. Olympiad Geometry O3–O7 are the models, and their stronger material is preserved. Add diagrams where they explain a construction or relationship, with enough surrounding explanation to make the picture useful. A chapter may be restructured when that helps, with the outline and data changed together. The rules are in CONVENTIONS §14.

## Status (2026-11-07)

- **Initial writing:** all 13 books are written (103 teaching chapters, 593 teaching pages). That is a separate status from the content revision below.
- **Content revision completed:** AMC Algebra L1–L14.
- **In progress:** AMC Number Theory, from M1. A Number Theory chapter is not marked revised until its batch is committed.
- **Still to do:** the rest of AMC Number Theory, then the other AMC, AIME and Olympiad books.

## Completed

- **End-of-book Notes, all 13 books.** Reference material with no Core, Core II or Extension level and no exercise sets, numbered Overview (.1), Index (.2), Glossary (.3), and References and Credits (.4). Teaching chapter and lesson codes are unchanged, and the notes are excluded from the teaching totals (103 teaching chapters, 593 teaching pages; 13 reference chapters, 52 sections, counted from `js/data/learn/shelf.js` on 2026-11-07).
  - Index entries link to specific lessons within their book. Entries cover the cards a lesson teaches, assumes or explicitly connects, plus basic vocabulary found in its explanation. This is a substantive-reference index, not a concordance of every word. Ordinary lesson words gain no links to the index.
  - Glossaries give basic definitions and the descriptions of the book's named results and methods from the reference cards, refined where a card's introductory description is not precise enough: `glossaryDefinitions` in `tools/build-book-notes.cjs` holds those refinements, currently for the inverse trigonometric functions. Credits identify the project's writing, contest-statement sources, license, KaTeX, and further reading; no unverified textbook bibliography was invented.
  - Book search recognizes indexed terms. Since 2026-11-07 (Claude, `js/app.js`) it also lists single lessons and glossary terms as results beside chapters.
- **AMC Algebra L1.1–L1.5.** The introduction develops the distinction between expressions and equations; the lessons develop modeling, exponent laws and domains, algebraic representations, and ratio/percentage reference quantities. L1.4 has a computed rectangular-area diagram; L1.5 has an eight-unit ratio diagram. Existing exercises, solutions and contest placements are preserved.
- **AMC Algebra L2 and L3** (equations and word problems; quadratics).
- **AMC Algebra L4 and L5** (functions, graphs, absolute values and floors; substitutions and symmetric expressions).
- **AMC Algebra L6 and L7** (sequences and polynomials), with proofs and diagrams.
- **AMC Algebra L8 and L9** (inequalities, extrema and estimates; logarithms), commit eb5d70b, PR #217, with four new diagrams. The same batch removed editorial asides about formulas and memorization from L1–L9, pointed the two L1 links to `two-variable-identities` (the two-variable card split from `square-of-sum`), updated the related prerequisite metadata, and placed the three-variable `square-of-sum` teaching reference in L5.3.
- **AMC Algebra L10 and L11** (advanced polynomials; functional equations, recurrences, sums and inequalities), commit 82cfe36, PR #221, with derivations, connected examples and explicit mathematical assumptions. Four new diagrams: interpolation without a degree bound, reciprocal-root branches, reversing a triangular double sum, and the nearest point on a line. The batch also corrected the exponent restriction in the $n^4+4^k$ compositeness claim, clarified the reciprocal-root and conjugate-root assumptions, added a degree assumption to a sequence exercise, and strengthened worked solutions. Only `index.html` and `js/data/learn/amc-algebra/{l10,l11,l15}.js` changed; the notes were regenerated and asset versions bumped; no chapter codes, lesson titles or problem placements changed, so `LEARN-OUTLINE.md` and the shelf need no update.
- **AMC Algebra L12–L14** (trigonometry, complex numbers, mixed problems), commit 819bb92, PR #224, with seven new diagrams. The batch corrected domain and branch assumptions, strengthened worked solutions, and made clear where an intermediate quantity differs from the answer the AIME asks for.
- **The arctangent range** is corrected in the lessons and the generated glossary (Codex) and on the source card Inverse Trig Identities & Ranges (Claude, PR #225); nothing is outstanding.

## Continue the content pass

Continue with AMC Number Theory from M1, then chapter by chapter through the AMC, AIME and Olympiad books. Read each chapter's lesson bodies and worked solutions together before rewriting. Check mathematical claims by computation where applicable; preserve problem placements and avoid altering the Step T data. Retain the stronger O3–O7 explanations unless a specific improvement is warranted. Review glossary definitions as their lessons change, especially when a technical term needs a more precise definition than a card's introductory description.

After changing lesson references or prose, regenerate the back matter and check it:

```sh
node tools/build-book-notes.cjs
node tools/build-book-notes.cjs --check
python3 tools/build-learn-shelf.py --check
node --test tests/*.cjs
JSC=./tools/jsc-node sh tools/gates.sh
```

`LEARN-OUTLINE.md` owns the notes chapter codes and section titles, as it does for teaching chapters. Rebuild the shelf after outline changes. The notes generator derives index targets from actual chapter data and excludes notes chapters from its input. Do not hand-edit generated notes files. Bump changed asset versions and sync the lab pages using `tools/bump-versions.py`. Reference sections carry no difficulty tags.

## Validation, by batch

- **End-of-book Notes and L1:** all repository gates and the regression suites passed. Tests cover all 13 notes chapters, index-target scope and resolution, key-term retrieval, and the chapter and lesson search audit. Chromium checked all 39 notes sections and L1.2–L1.5 at 1280 and 375 pixels (86 page checks): no JavaScript errors, KaTeX errors, missing index links, or horizontal overflow.
- **L8 and L9 (PR #217):** every gate and all three regression suites; the generated notes checked; 71 browser page checks of desktop and phone rendering, light and dark themes, the corrected links, and the affected notes.
- **L10 and L11 (PR #221):** every gate and all three regression suites, 234 exact mathematical checks and 84 browser page checks.
- **L12–L14 (PR #224):** every gate and all three regression suites, 194 exact mathematical checks, 441 numerical checks and 104 browser page checks.

These structural and browser checks do not certify the mathematical content of the books not yet revised.
