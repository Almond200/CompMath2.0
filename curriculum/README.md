# CompMath curriculum redesign

**The canonical specification for the new Learn shelf.** On 2026-11-27 the owner adopted the *Master Curriculum and Development Roadmap* as the canonical specification for a complete redesign of the CompMath textbooks. This directory holds it in Markdown, with the plan to build it. It covers twelve textbooks in four subjects, each in three volumes: 136 teaching chapters (one optional) and 791 numbered concept sections.

- **Volume I** builds foundational mathematical fluency.
- **Volume II** builds comprehensive intermediate mathematics and technical depth. It is anchored by the 22 supplied Think Academy Year 2 lessons.
- **Volume III** builds advanced competition problem solving: difficult AIME-level problems and synthesis, not formal olympiad proof training.

The aim is genuine teaching resources, not explanatory encyclopedias (spec/overview.md, spec/authoring-standards.md).

## Current state (updated 2026-11-27)

- **Done:** the specification is imported in full and checked. `python3 tools/curriculum/build-curriculum.py --check` passes. It confirms 12 books, 136 chapters and 791 concept sections, and that every line of the source lands in exactly one file with its text unchanged. The development plan, the chapter tracker, the technical-change list, the old-to-new mapping skeleton and the review report are written.
- **Branch:** all of this is on `claude/textbook-redesign` and must not merge into `main` without the owner's approval. Nothing outside `curriculum/` and `tools/curriculum/` is changed: no live textbook, card, problem, Practice, Arena or app code. The new curriculum coexists with the live 13-book shelf. It replaces that shelf only volume by volume, after development and validation (DEVELOPMENT-PLAN.md).
- **Waiting on the owner:** the decisions in REVIEW-NOTES.md §3. They are needed before any app work (Phase 2) and before mass authoring. D1 (the identifier namespace) and D2 (who authors manuscripts, and where) block the most.
- **Next action:** once D1–D4 are answered, start Phase 1. Write the authoring packets for the five next pilot chapters (G2.2, A2.8, C2.5, N2.1, A3.3), then their pilot units. Do not mass-produce manuscripts (owner, 2026-11-27).

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
| [`REVIEW-NOTES.md`](REVIEW-NOTES.md) | The completeness verification, the inconsistencies found in the source, and the decisions awaiting the owner. |
| [`data/index.json`](data/index.json) | Generated machine-readable index: books, chapters (basis, optional flag, file) and concept sections. |
| `source/` | The owner's original `.docx` and its frozen pandoc import (`master-roadmap.md`). |
| `media/` | The three figures used by Pilots B and D. |

The book IDs are `algebra-1`…`algebra-3`, `geometry-1`…`geometry-3`, `number-theory-1`…`number-theory-3` and `combinatorics-1`…`combinatorics-3`. They are proposals until D1 is decided.

## How to read and change the specification

- An identifier such as G2.7.4 means Geometry, Volume II, Chapter 7, Concept 4. These IDs form **a new authoring namespace**. They are not live lesson codes, and they collide with live AIME lesson codes (REVIEW-NOTES.md §2.1). Always write them with their book when outside this directory.
- The chapter files are the specification's home. The frozen import in `source/` is kept only to verify the split, and is never edited. The source `.docx` is the owner's record.
- **Change control** (spec/roadmap.md, "Status at this baseline"): every change names the affected curriculum ID, its rationale, the supporting problem or source, the prerequisite impact, an acceptance task and a review status. Change the curriculum only when evidence supports it, and prefer deeper teaching to a longer topic list. Record each change in the chapter file and in REVIEW-NOTES.md §4 (change log). Once the first edit is made, run the checker with `--allow-edits`. It then keeps the structural checks (counts, tracker rows, index) and drops the byte comparison with the import.
- After any structural change (a chapter or section added, renamed or renumbered), rerun `python3 tools/curriculum/build-curriculum.py` to refresh `data/index.json`, and update TRACKER.md.

## Ownership

Claude keeps this directory's planning files, the same way it keeps the shared Markdown (CLAUDE.md, item 5). Who writes the chapter manuscripts, and where they live in the app, is decision D2. Codex currently owns `js/data/learn/**`. Neither agent changes that division without coordinating first.
