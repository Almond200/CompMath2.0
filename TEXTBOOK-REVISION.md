# Textbook revision

Work lives on `codex/textbook-revision`. Step T and problem tagging continue separately. Keep this handoff separate from PLAN and the shared changelog while that branch is active; do not change problem tags, strategies, topic-tree data, or card homes here.

## Requested direction

Teach a connected mathematical story. Define ideas before using them, explain why each step follows, develop examples through the reasoning that motivates the method, and state the limits of a model or identity. Avoid opening with an unrelated question or walking through a sequence of card names and short summaries. Olympiad Geometry O3–O7 are useful existing models. Add diagrams where they explain a construction or relationship, with enough surrounding explanation to make the picture useful. A lesson can develop the mathematics needed to teach it; the cards remain the compact reference.

## Completed in this branch

- All 13 books have an End-of-book Notes chapter, reference material with no Core, Core II or Extension level and no exercise sets, numbered Overview (.1), Index (.2), Glossary (.3), and References and Credits (.4). Teaching chapter and lesson codes are unchanged, and the notes are excluded from the teaching totals (103 teaching chapters, 593 teaching pages; 13 reference chapters, 52 sections, counted from `js/data/learn/shelf.js` on 2026-11-07).
- Index entries link to specific lessons within their book. Entries cover the cards a lesson teaches, assumes or explicitly connects, plus basic vocabulary found in its explanation. This is a substantive-reference index, not a concordance of every word. Ordinary lesson words gain no links to the index.
- Glossaries include basic definitions and the descriptions of the book's named results and methods, taken from the existing reference cards. Credits identify the project's writing, contest-statement sources, license, KaTeX, and further reading; no unverified textbook bibliography was invented.
- Book search includes indexed terms and aliases at a lower weight than chapter titles, lesson titles, taught-card metadata, and prose. Existing exact-title, typo and chapter-code behavior remains tested.
- AMC Algebra L2 (equations and word problems) and L3 (quadratics) are revised and merged to main.
- AMC Algebra L4 (functions, graphs, absolute values and floors) and L5 (substitutions and symmetric expressions) are revised.
- AMC Algebra L6 and L7 (sequences and polynomials) are revised with proofs and diagrams.
- AMC Algebra L8 (inequalities, extrema and estimates) and L9 (logarithms) are revised in commit eb5d70b, merged through PR #217, with four new diagrams. The same batch removed editorial asides about formulas and memorization from L1–L9, pointed the two L1 links to `two-variable-identities` (the two-variable card split from `square-of-sum`), updated the related prerequisite metadata, and placed the three-variable `square-of-sum` teaching reference in L5.3.
- AMC Algebra L10 (advanced polynomials) and L11 (functional equations, recurrences, sums and inequalities) are revised in commit 82cfe36, merged through PR #221, with derivations, connected examples and explicit mathematical assumptions. Four new diagrams: interpolation without a degree bound, reciprocal-root branches, reversing a triangular double sum, and the nearest point on a line. The batch also corrected the exponent restriction in the $n^4+4^k$ compositeness claim, clarified the reciprocal-root and conjugate-root assumptions, added a degree assumption to a sequence exercise, and strengthened worked solutions. Only `index.html` and `js/data/learn/amc-algebra/{l10,l11,l15}.js` changed; the notes were regenerated and asset versions bumped; no chapter codes, lesson titles or problem placements changed, so `LEARN-OUTLINE.md` and the shelf need no update.
- So AMC Algebra L1–L11 now read as connected textbook explanations, with derivations, worked examples, domain restrictions, equality conditions and diagrams.
- AMC Algebra L1.1–L1.5 are revised. The introduction develops the distinction between expressions and equations; the lessons develop modeling, exponent laws and domains, algebraic representations, and ratio/percentage reference quantities. L1.4 has a computed rectangular-area diagram; L1.5 has an eight-unit ratio diagram. Existing exercises, solutions and contest placements are preserved.

## Continue the content pass

The remaining teaching chapters have not been revised in this branch. In progress, not finished: AMC Algebra L12–L14, the remaining AMC Algebra teaching chapters. After them the next book is AMC Number Theory, starting at M1. Then continue chapter by chapter through the AMC, AIME and Olympiad books. Read each chapter's lesson bodies and worked solutions together before rewriting. Check mathematical claims by computation where applicable; preserve problem placements and avoid altering the Step T data. Retain the stronger O3–O7 explanations unless a specific improvement is warranted. Review glossary definitions as their lessons change, especially when a technical term needs a more precise definition than a card's introductory description.

After changing lesson references or prose, regenerate the back matter:

```sh
node tools/build-book-notes.cjs
node tools/build-book-notes.cjs --check
python3 tools/build-learn-shelf.py --check
node --test tests/*.cjs
JSC=./tools/jsc-node sh tools/gates.sh
```

`LEARN-OUTLINE.md` owns the notes chapter codes and section titles, as it does for teaching chapters. Rebuild the shelf after outline changes. The notes generator derives index targets from actual chapter data and excludes notes chapters from its input. Do not hand-edit generated notes files. Bump changed asset versions and sync the lab pages using `tools/bump-versions.py`.

## Validation

All repository gates and the regression suites passed. Tests cover all 13 notes chapters, index-target scope and resolution, key-term retrieval, and the existing chapter/lesson search audit. Chromium checked all 39 notes sections and L1.2–L1.5 at 1280 and 375 pixels (86 page checks): no JavaScript errors, KaTeX errors, missing index links, or horizontal overflow. These structural and browser checks do not certify the mathematical content of the unrevised books.

The batch merged through PR #217 (L8, L9) passed every repository gate and all three regression suites; the generated notes were checked, and 71 browser page checks covered desktop and phone rendering, light and dark themes, the corrected links, and the affected notes.

The batch merged through PR #221 (L10, L11) passed every repository gate and all three regression suites, with 234 exact mathematical checks and 84 browser page checks.
