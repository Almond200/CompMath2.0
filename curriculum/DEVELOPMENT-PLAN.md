<!-- nav --> [Curriculum](README.md) · Development plan

# Development plan

This plan turns the roadmap's five stages (spec/roadmap.md, "Execution sequence and release gates") into phases with exits. TRACKER.md records each chapter's stage. Numbers of lessons or nominal topic coverage are never a release gate. The test is whether a learner can follow the reasoning, choose a method in an unfamiliar problem and verify the result independently (spec/roadmap.md).

## Phase 0: Adopt the specification (roadmap Stage 1). Done 2026-11-27, on this branch

- Import the master document in full as `curriculum/`, with a checker: done.
- Keep stable IDs, track optional material separately (A2.22 and the sections whose titles mark them as extensions; REVIEW-NOTES.md §1), and record open mathematical issues: done (REVIEW-NOTES.md §2).
- Write the tracker, the technical-change list and the mapping skeleton: done.
- **Exit:** the owner decided D1–D12 on 2026-11-27 (REVIEW-NOTES.md §3). Done.

## Phase 1: Establish the authoring standard (roadmap Stage 2). In progress

Done 2026-11-27: AUTHORING-STANDARD.md (final standard), `tools/curriculum/check-spec.py`, the change requests CR-1 to CR-9 resolving the review's inconsistencies, and the five packets (G2.2 complete; A2.8, C2.5, N2.1 and A3.3 drafts). Next: write the G2.2 manuscript and render it in the preview (PREVIEW-PLAN.md); the owner reviews it in the app before any other chapter is written.

1. Review the four existing model units (Pilots A–D in spec/teaching-pilots.md) against the acceptance gates in its §6. Record any corrections in REVIEW-NOTES.md §4.
2. Write the **authoring packet** for each of the five next pilots: G2.2 (power of a point), A2.8 (composite and inverse functions), C2.5 (recursive counting), N2.1 (CRT) and A3.3 (transformed roots).
   - A packet contains a one-paragraph narrative arc, distinct learning objectives, a dependency check against earlier IDs, and the staged problem selection: motivating example, direct check, contrast, partly guided application, unlabeled transfer, delayed revisit.
   - Packets go in `curriculum/packets/<ID>.md`.
3. Write the five pilot units as student-facing sequences, like Pilots A–D. Read each sequentially as a student. Verify every number by computation.
4. ~~Write `tools/curriculum/check-spec.py`~~ (done).
5. **Exit:** nine model units accepted by the owner. The chapter standard is then fixed, as an addendum to CONVENTIONS §14 or a separate standard for the new shelf (decision D4).

No mass production happens in this phase (owner, 2026-11-27).

## Phase 2: Preview infrastructure (the minimal version is PREVIEW-PLAN.md, for G2.2 only)

1. Generate `js/data/curriculum/shelf.js` from `data/index.json`.
2. Add the preview route and renderer for the new chapter shape (T3, T5), the separate progress store (T9) and placement records (T6).
3. Render the nine model units in preview only. The live Learn, search, recommendations and cards stay unchanged, and all existing gates and browser checks pass unchanged.
4. **Exit:** the owner reviews the pilots in the app's preview.

## Phase 3: Validate the mathematics and exercise placement (roadmap Stage 3)

1. Resolve the three numerical-only 2026 AIME routes: I #15, II #14 and II #15. Write the hand-verifiable presentations the audit asks for. Use the no-calculus routes for II #6 and #8 if the app's stored strategies are ever updated. That is Codex's scope (problem solutions), so it goes as a report.
2. Expand solution review beyond the 30 audited problems, stratified by subject, contest difficulty, problem role and cross-topic demand.
   - First the 99 appearances without a full candidate mapping, then all AIME appearances, starting with the 355 late positions (spec/coverage-audit.md, "Priority order").
   - Read actual statements and solutions, and never infer prerequisites from tags.
   - Record each review as a placement record with the audit status (R, E, N, then route-read, prerequisite-checked, published).
3. Recreate the 190 topic-to-chapter routing rules as data (T6) and recompute the coverage tables against the live catalog.

## Phase 4: Build complete volumes (roadmap Stage 4)

1. Fill MIGRATION-MAP.md, chapter by chapter, then page by page.
2. Write each complete chapter arc (S1) before authoring its lessons.
3. Author in volume order. Recommended start: **Geometry II's circle sequence (G2.2–G2.6) and G2.7**, then a Volume III transfer chapter (G3.5 or C3.5), as the roadmap's Stage 5 pilot prescribes. Then complete Geometry II.
   - After that, prioritise the foundational and intermediate areas with the largest practice pools and the weakest existing granularity (spec/coverage-audit.md): arithmetic and rates (A1.1–A1.3), polygons and circles (G1.5, G1.7), introductory probability (C1.5–C1.7).
4. For every exercise, record its canonical slug, required concepts, teaching role, difficulty and verification status. Use unlabeled mixed problems to assess method choice. A concept is not complete just because its theorem or card exists.

## Phase 5: Test and migrate (roadmap Stage 5)

1. Pilot with learners: first steps, misconception contrasts, independent solutions and delayed transfer (S6).
2. Validate shelf generation, internal links, redirects and saved progress (T3, T9, T10).
3. Release **one coherent volume at a time**, with the owner's approval for each. Keep the old URLs working, then retire the old chapters' visibility once their redirects pass. A live book is replaced only when all of its mapped content has a released destination.
4. Decide the future of the five Olympiad books, which have no counterpart in the twelve-book shelf (decision D7).

## Handoff

- On this branch, every finished step updates README.md "Current state" and the relevant TRACKER.md rows, adds a dated entry to REVIEW-NOTES.md §4, then commits and pushes.
- On `main`, PLAN.md and CHANGELOG.md get a one-line pointer only.
- Merge `main` into this branch regularly; it touches no shared file, so merges should be clean.
