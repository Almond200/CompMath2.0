# CompMath curriculum redesign

**The canonical specification for the new Learn shelf.** On 2026-11-27 the owner adopted the *Master Curriculum and Development Roadmap* as the canonical specification for a complete redesign of the CompMath textbooks. This directory holds it in Markdown, with the plan to build it. It covers twelve textbooks in four subjects, each in three volumes: 136 teaching chapters (one optional) and 791 numbered concept sections.

- **Volume I** builds foundational mathematical fluency.
- **Volume II** builds comprehensive intermediate mathematics and technical depth. It is anchored by the 22 supplied Think Academy Year 2 lessons.
- **Volume III** builds advanced competition problem solving: difficult AIME-level problems and synthesis, not formal olympiad proof training.

The aim is genuine teaching resources, not explanatory encyclopedias (spec/overview.md, spec/authoring-standards.md).

## Current state (updated 2026-11-28)

- **Prototype stage concluded.** The owner approved G2.2 Power of a Point as the completed textbook prototype (2026-11-28; PRs #476 and #482 merged): its instructional structure, practice quantity, UI, mathematical presentation and editorial standards are the benchmark for production. G2.2 is frozen: it changes only for a genuine mathematical error or technical defect.
- **Production, batch 1 (in progress):** the connected circle sequence G2.3 Cyclic Quadrilaterals I, G2.4 Cyclic Quadrilaterals II, G2.5 Ptolemy's and Stewart's Theorems, G2.6 Equations of Straight Lines and Circles, planned together in [`batches/B1-circles.md`](batches/B1-circles.md) and written to AUTHORING-STANDARD.md. One PR for the owner's review; the next batch waits for that review.
- **How to read the new books:** `#/preview` on a deployment of the branch or a local server (`python3 -m http.server 8765`, then `http://localhost:8765/#/preview`).
- **Checks:** `tools/gates.sh` runs the curriculum checks (specification, shelf, figures, chapter data, verification); `tools/curriculum/check-preview.cjs` is the browser check (see `tools/curriculum/README.md`).
- **Branch:** `claude/textbook-redesign`, restarted from `main` after each merge.

## Layout

| Path | What it holds |
|---|---|
| [`spec/overview.md`](spec/overview.md) | Executive summary; how to use the specification; what the identifiers mean. |
| [`spec/roadmap.md`](spec/roadmap.md) | Non-negotiable design decisions; the five-stage execution sequence and release gates; status at the baseline. |
| [`spec/shelf-and-levels.md`](spec/shelf-and-levels.md) | The twelve-book shelf; what changes between levels; the Year 2 integration map; cross-subject prerequisite bridges. |
| [`spec/research-audits.md`](spec/research-audits.md) | Research-based gap audit; second-pass audit; contest stress test; prerequisite and depth refinements. |
| [`spec/authoring-standards.md`](spec/authoring-standards.md) | Curriculum first, reference second; the lesson and chapter standard; Volume III problem selection; migration and pilot plan; research sources and limits. |
| [`spec/coverage-audit.md`](spec/coverage-audit.md) | Archive-wide coverage of the 19,456 problem appearances; candidate chapter placement; review queues; instructional validation. |
| [`spec/solution-audit.md`](spec/solution-audit.md) | The 30-problem solution audit of both 2026 AIME papers; exact checks; the eight curriculum refinements; sources. |
| [`spec/teaching-pilots.md`](spec/teaching-pilots.md) | The four student-facing model units (Pilots A–D); the acceptance tests; the next authoring batch. |
| [`books/<book>/README.md`](books/) | Each volume's direction, prerequisites, expected mastery, approach and chapter table. |
| `books/<book>/<ID>-<title>.md` | One file per chapter (136): premise, teaching sequence where given, every concept section with its explanation and practice direction, refinements and bridges, mastery and onward direction. |
| [`TRACKER.md`](TRACKER.md) | The chapter-level progress tracker: stages S0–S7, one row per chapter. |
| [`DEVELOPMENT-PLAN.md`](DEVELOPMENT-PLAN.md) | The phases from specification to release, mapped to the roadmap's five stages, with gates. |
| [`TECHNICAL-CHANGES.md`](TECHNICAL-CHANGES.md) | How the current Learn works; every change the new curriculum needs (identifiers, navigation, rendering, problems, search, validation, progress), with recommendations. |
| [`MIGRATION-MAP.md`](MIGRATION-MAP.md) | Skeleton for mapping each of the 103 live teaching chapters to reuse, split, merge, rewrite, reference-only or retire. |
| [`REVIEW-NOTES.md`](REVIEW-NOTES.md) | The completeness verification, the inconsistencies found in the source, the owner's decisions and the change log. |
| [`AUTHORING-STANDARD.md`](AUTHORING-STANDARD.md) | The final teaching standard for the new books. |
| [`packets/`](packets/) | Authoring packets: narrative arc, objectives, dependency check, section plan and verified problem selection. |
| [`PREVIEW-PLAN.md`](PREVIEW-PLAN.md) | The minimal plan for rendering the first chapter in a separate preview. |
| [`YEAR2-SOURCES.md`](YEAR2-SOURCES.md) | What Think Academy material was received, how it may be used, and what has been reviewed. |
| [`data/index.json`](data/index.json) | Generated by `tools/curriculum/check-spec.py --write` from the chapter files: books, chapters (basis, status, file) and concept sections. |
| `source/` | The owner's original `.docx` and its frozen pandoc import (`master-roadmap.md`). |
| `media/` | The three figures used by Pilots B and D. |

The book IDs are `algebra-1`…`algebra-3`, `geometry-1`…`geometry-3`, `number-theory-1`…`number-theory-3` and `combinatorics-1`…`combinatorics-3`. They are approved (D1).

## How to read and change the specification

- An identifier such as G2.7.4 means Geometry, Volume II, Chapter 7, Concept 4. These IDs form **a new authoring namespace**. They are not live lesson codes, and they collide with live AIME lesson codes (REVIEW-NOTES.md §2.1). Always write them with their book when outside this directory.
- The chapter files are the specification's home. The frozen import in `source/` is kept only to verify the split, and is never edited. The source `.docx` is the owner's record.
- **Change control** (spec/roadmap.md, "Status at this baseline"): every change names the affected curriculum ID, its rationale, the supporting problem or source, the prerequisite impact, an acceptance task and a review status. Change the curriculum only when evidence supports it, and prefer deeper teaching to a longer topic list. Record each change in the chapter file and in REVIEW-NOTES.md §4 (change log). Once the first edit is made, run the checker with `--allow-edits`. It then keeps the structural checks (counts, tracker rows, index) and drops the byte comparison with the import.
- After any change, run `python3 tools/curriculum/check-spec.py` (and `--write` after a structural change, to refresh `data/index.json`) and `python3 tools/curriculum/build-curriculum.py --check --allow-edits`, and update TRACKER.md.

## Ownership

Claude keeps this directory's planning files, the same way it keeps the shared Markdown (CLAUDE.md, item 5). Claude is the sole author and implementer of the new books (D2, owner 2026-11-27), in `js/data/curriculum/`. Codex continues the problem database, tags and ratings and may review manuscripts later; do not interfere with its work.
