<!-- nav --> [Curriculum](README.md) · Review notes

# Review notes: completeness, inconsistencies and decisions

## 1. Completeness verification (2026-11-27)

**Method.** The owner's `.docx` was converted once with pandoc to `source/master-roadmap.md`, 6,339 lines. Pandoc recovers the document's headings, tables, display and inline math, links and figures.

- The Word package was inspected for anything pandoc might drop. `comments.xml` and `footnotes.xml` contain no text. The header and footer hold only the running title "COMPMATH / MASTER CURRICULUM & ROADMAP" and page numbers. The three embedded images (Pilots B and D) are extracted to `media/`.
- The import was then read in full, from the executive summary through the last source note. `tools/curriculum/build-curriculum.py` distributes every line to exactly one file and `--check` proves it.
- Each split file, with link targets, nav lines and the added heading marks normalised away, is identical to its source lines.

**Result: nothing is omitted.**

| Book | Chapters | Concept sections | | Book | Chapters | Concept sections |
|---|---:|---:|---|---|---:|---:|
| A1 Algebra I | 10 | 58 | | N1 Number Theory I | 9 | 49 |
| A2 Algebra II | 22 (one optional) | 128 | | N2 Number Theory II | 11 | 59 |
| A3 Algebra III | 10 | 57 | | N3 Number Theory III | 9 | 50 |
| G1 Geometry I | 9 | 53 | | C1 Comb. & Prob. I | 10 | 53 |
| G2 Geometry II | 14 | 97 | | C2 Comb. & Prob. II | 11 | 67 |
| G3 Geometry III | 10 | 55 | | C3 Comb. & Prob. III | 11 | 65 |
| **Total** | | | | | **136** | **791** |

Preserved within the chapters, all counted by the checker's parse:

- 22 Year 2 anchor chapters with their 22 workbook and slide source notes;
- 13 teaching sequences;
- 42 second-pass extensions;
- 29 learning progressions;
- the 8 integrated solution-audit refinements at their homes, with 13 transfer bridges;
- 3 cross-subject transfers;
- every chapter's core premise, mastery and onward direction, and next-chapter link.

Also preserved: every table (shelf, levels, Year 2 map, 19 cross-subject bridges, research and second-pass audits, the 13-problem stress test, the coverage tables, the review queue), the 30 AIME route entries, the exact-check table, the refinement ledger, all four pilots with their exercises and solutions, the acceptance gates, the next authoring batch and every source citation.

**Optional material**, tracked separately:

- Chapter A2.22, Limits, Continuity and Convergence.
- The 13 sections whose titles mark them as extensions: A2.1.7, A2.10.5, A2.16.9, C2.9.4, C3.2.4, C3.6.5, G2.9.6, G2.11.7, G2.14.6, G3.3.5, N2.3.3, N3.2.6 and N3.4.4.
- Further items the prose marks optional inside a section, for example Descartes' theorem in G3.3.5, quadratic reciprocity in N3.5.4, Sprague–Grundy in C3.10.5, and Cayley–Menger in G3.9.4.
- G3.8 (inversion) is described as "selective" but not labelled optional.

**Numbers checked by computation.** 55 checks, all passed. They cover:

- the coverage-audit arithmetic: row sums, the 56.5%, 91.9%, 99.49% and 99.48% figures, the Elo-band and AIME-position totals, and 19,456 − 621 = 18,835;
- every answer in Pilots A–D, by brute force where finite (for example all labellings in Pilot D, and all divisor exponent tuples in Pilot C);
- the audit entries that are pure arithmetic (I #2, #4, #7 by enumerating all 720 permutations, #8; II #3, #4, #5, #13, #14, #15);
- sample in-text values (the C2.5.6 derangement list, 13–14–15 radii, the N2.1.5 CRT residue, the N2.5.5 valuations, C1.6.1, C1.6.4, G2.7.2, A2.11.2).

The 2026 AIME I #10 answer 156 matches the live key. The audit's other answers were not recomputed from their statements; that is Phase 3 work.

## 2. Inconsistencies and open issues in the source

**2.1 Identifier collision (critical, architectural).** The live AIME books use chapter codes A1–A10, G1–G10, N1–N9 and C1–C10, so their lessons are A1.1, G2.7, N3.4 and so on. The new chapter IDs are the same strings: A1.1 means Algebra I, Chapter 1. Live content, summaries, progress keys, topic selections and lesson links are keyed by bare codes, so the spec's IDs cannot be used unqualified in the app. The spec itself says its IDs are "a new authoring namespace, not permission to overwrite live lesson URLs". → Decision D1.

**2.2 C1's chapter count.** The Combinatorics & Probability I header says "9 teaching chapters", but the book has 10. C1.10 was added after the header was written. The shelf table correctly says 10.

**2.3 "Twelve" teaching sequences.** The coverage audit refers to "the twelve worked-out teaching sequences in this edition", and the standards to "the twelve sample teaching sequences". There are 13: A1.1, A2.8, A3.1, G1.2, G2.7, G3.3, N1.4, N2.5, N3.6, C1.2, C1.10, C2.5 and C3.10.

**2.4 Count of existing teaching pages.** The spec's 595 is correct for the live shelf: 103 teaching chapters, 595 teaching pages, plus 52 reference sections, recounted 2026-11-27. TEXTBOOK-REVISION.md on `main` says 593 in two places; that is the stale figure, and it is corrected there.

**2.5 "Next:" sentences that no longer match the following chapter.** Chapters were inserted after the mastery paragraphs were written. The "Next in this volume" links themselves are all correct (the checker verifies them); only these prose sentences are out of date:

| Chapter | Prose says next | Actual next chapter |
|---|---|---|
| A1.2 | powers | A1.3, rates |
| A1.6 | inequalities | A1.7, rational expressions |
| A2.13 | trigonometry | A2.14, rational functions |
| A2.14 | bounds and functional reasoning | A2.15, trigonometry |
| A2.20 | "Readiness for A3" | A2.21 and A2.22 still follow |
| G1.5 | regular figures and circles | G1.6, triangle centres |
| G2.11 | vectors and space | G2.12, transformations |
| N2.2 | count the units, i.e. totient | N2.3, Wilson; totient is N2.4 |
| C1.6 | "in C2" | C1.7 |
| C2.3 | recursion | C2.4, pigeonhole |
| C2.6 | probability | C2.7, generating functions |
| C1.9 | "Readiness for C2" | C1.10, with no next link from C1.9; C1.10 deliberately follows the review |

Fix these during authoring, under change control.

**2.6 Overlapping concept sections.** The roadmap says six overlapping sections were refocused. Many chapters still end with a consolidated section that restates earlier sections of the same chapter, usually as a worked example. The clearest cases:

- A1.1.2/.5; A1.3.4/.5; A1.9.1–2/.5; A1.10.2/.5.
- G1.3.1–3/.5; G1.4.3/.5; G1.5.1/.5; G1.7.4/.5; G1.8.1/.4/.5; G1.9.2/.5.
- G2.11.4/.6/.8 (the polar distance formula three times); G2.12.1/.5.
- N1.1.1/.5; N1.2.3/.5; N1.3.2–3/.5; N1.4.1/.3/.5; N1.5.3/.5; N1.7.2/.5; N1.8.1/.5.
- N2.1.3/.5; N2.2.3/N2.3.2 (order); N2.4.1/.5; N2.5.2/.5; N2.6.1/.5; N2.8.1/.6 (the same reciprocal transformation); N2.8.3/N2.9.4 (Pell).
- C1.1.3–4/.5; C1.2.2/.5; C1.5.3–4/.5; C1.7.2–4/.5–6; C1.8.1–2/.5.
- C2.6.3/.5/.6 (Catalan three times); C2.9.2/.5; C2.10.2/.7; C2.4.1, C2.4.4/C2.11.1–2.

Cross-volume repeats are intended where the objective changes; G1.6/G2.8.1 and C2.6/C3.3.4 are examples. → Decision D11.

**2.7 A deferred proof with no home.** N2.3.3 says the existence of primitive roots modulo a prime is proved "later in N3 or cited". No N3 section proves it; N3.2.4 assumes a known generator. Decide whether to prove it (as N3.2.4 or an extension) or cite it with conditions. N2.9.4's deferral of Pell completeness does have a home: N3.7.2.

**2.8 A move recorded but not made.** G2.6.10 says the common-tangent-length derivations move from G3.3.3 into G2. G3.3.3 still derives the same two formulas. When authoring, G3.3.3 should become strategic use: G3.3.6 already is.

**2.9 Editorial rationale inside concept sections.** Several sections contain audit-voice sentences addressed to editors rather than learners. Examples:

- "The foundation book currently assumes arithmetic competence" (A1.1.6)
- "The latest outline includes modular calendar/clock residues…" (A1.3.8)
- "The tree includes distinct geometry-counting leaves…" (G2.1.8)
- "Closes a real taxonomy gap" (N2.5.6)
- "The current Pascal/Vandermonde treatment is strong" (C1.4.7)
- "Existing G3.3.3 already names common tangents" (G2.6.10)
- "the current outline discusses divisor counts…" (N1.4.6)

"Current" here means the live 13-book shelf. Keep these as rationale and never copy them into manuscripts.

**2.10 Snapshot data.** The coverage audit is computed from catalog blob `0df84b05…` (retrieved 2026-11-27, before Codex's 2020 and 2021 BMT audits revised ratings). Its figures (314 terminal topic nodes, the Elo bands, strategy flags) are a dated snapshot; recompute them in Phase 3.

- The AMC 12 row lists 1,350 of 3,160 appearances with a stored strategy, while PLAN.md says every indexed AMC 10 and 12 problem has a brief solution. The difference is presumably the AHSME years in that row; confirm when recomputing.
- The 190 topic-to-chapter rules the audit used were not supplied as data (TECHNICAL-CHANGES.md T6).

**2.11 Year 2 source materials.** The 22 anchor chapters cite workbook and slide pages, for example "Lesson 1 workbook, pp. 2–23". Those PDFs are not in the repository. Authors of the anchor chapters will need them. → Decision D10.

**2.12 Optional limits chapter and the no-calculus decision.** The owner removed the Calculus area on 2026-11-17 ("the app keeps no calculus"; TOPIC-TREE.md). The spec agrees that no differential or integral calculus is taught, but keeps A2.22 (intuitive limits, continuity, the intermediate value theorem, the number e) as optional precalculus enrichment. → Decision D8.

**2.13 Not errors, recorded for clarity.**

- The second-pass audit's "134-chapter, 692-concept" figure describes an earlier draft; C1.10, A2.22 and later sections bring it to 136 and 791.
- Pilot A §2 deliberately presents an impossible configuration as a contrast.
- Citation [4] is a grades 4–8 guide, as the document itself notes.
- The document's statement that "no repository files have been changed" remains true of `main`.

## 3. Decisions (owner, 2026-11-27)

All twelve decisions are made. Each now governs the work; AUTHORING-STANDARD.md and TECHNICAL-CHANGES.md apply them.

| # | Decision |
|---|---|
| D1 | **Identifiers.** Keep the curriculum's IDs and qualify them by book wherever needed (`geometry-2/G2.7.4`). Legacy identifiers do not change. |
| D2 | **Ownership.** Claude plans, authors and implements the new textbooks under `js/data/curriculum/`. Codex continues the problem database, tags, ratings and related infrastructure, and may independently review manuscripts later. Do not interfere with Codex's work. |
| D3 | **Preview.** A separate preview route, kept out of normal Learn navigation, search and recommendations until a release is approved. The existing Learn experience is preserved. (PREVIEW-PLAN.md) |
| D4 | **Teaching standard.** The new standard applies to the new books only. Explorations and explanation come before reference cards. Meaningful subheadings are allowed, without a uniform template. The no-hints rule stays: use partly worked examples, staged questions and independent checkpoints. Chapter introductions and summaries are unnumbered. The priority is genuine, coherent teaching that explains how approaches are discovered. (AUTHORING-STANDARD.md) |
| D5 | **Levels.** No Core or Core II; volumes carry the progression. Optional and enrichment distinctions stay. |
| D6 | **Placement.** One primary teaching placement per card, with intentional revisits that teach a new capability. One primary placement per contest problem, with a justified advanced transfer placement where appropriate. Prefer fresh problems for independent transfer. Use canonical identities to avoid duplication. |
| D7 | **Olympiad books.** Unchanged; decide their future after the twelve-book series is developed. |
| D8 | **Calculus.** A2.22 is deferred and excluded from the core release. Keep elementary convergence, infinite geometric series and other useful precalculus elsewhere; no differential or integral calculus. (CR-6) |
| D9 | **End-of-book Notes.** Generate useful indexes, glossaries and references for the new books. |
| D10 | **Think Academy PDFs.** The owner supplies them when needed; never claim to have reviewed what is unavailable; never publish them. All 22 were supplied on 2026-11-27 and are not in the repository. Only their structure guides us, never their text or exercises. (YEAR2-SOURCES.md) |
| D11 | **Repeated sections.** Keep the IDs; give each section a distinct purpose (synthesis, contrast, independent application); do not repeat definitions and derivations. (CR-7) |
| D12 | **Branches.** Redesign work stays isolated on `claude/textbook-redesign`; new implementation is not merged without approval. Pull requests are opened for review and not merged. |

**Status of §2.** All resolved under change control (§4): 2.1 by D1; 2.2 by CR-1; 2.3 by CR-2; 2.4 on `main` (TEXTBOOK-REVISION.md now says 595); 2.5 by CR-3; 2.6 by CR-7; 2.7 by CR-4 (the existence of primitive roots is cited, not proved; the curriculum is not expanded for it); 2.8 by CR-5; 2.9 by CR-8; 2.10 stays a Phase 3 task (recompute the coverage tables); 2.11 by D10; 2.12 by D8 and CR-6. The frozen import in `source/` is untouched.

## 4. Change log

- **2026-11-27.** Specification imported (136 chapters, 791 sections, every line verified). Tracker, development plan, technical changes, mapping skeleton and this report written. No changes to the curriculum text.
- **2026-11-27, change requests CR-1 to CR-9** (owner's instruction to resolve §2; applied to the chapter and spec files, never to `source/`):
  - **CR-1.** The C1 volume header says 10 teaching chapters.
  - **CR-2.** "Thirteen" teaching sequences, in spec/coverage-audit.md and spec/authoring-standards.md.
  - **CR-3.** Twelve mastery transitions now name the actual next chapter (A1.2, A1.6, A2.13, A2.14, A2.20, A2.21, G1.5, G2.11, N2.2, C1.6, C2.3, C2.6). C1.9 gains its "Next in this volume" link to C1.10, and "Readiness for A3" moves from A2.20 to A2.21.
  - **CR-4.** N2.3.3 cites the existence of primitive roots modulo a prime with its hypotheses, instead of promising a proof in N3.
  - **CR-5.** The common-tangent lengths are derived once, in G2.6.10. G3.3.3 uses them strategically, without a second derivation.
  - **CR-6.** A2.22 is marked deferred, with the core homes of its useful ideas listed. A2.21's link to it is relabelled "Deferred enrichment". A2.2.5 introduces $e$ (stated limit, no proof), because A2.3.1 needs natural logarithms.
  - **CR-7.** 39 overlapping sections each carry a "Role (CR-7)" line giving a distinct purpose and naming the section that owns the shared definition or derivation (D11).
  - **CR-8.** 22 editor-facing rationale passages move out of concept-section prose into "Editorial notes (not student-facing)" at the end of their chapter files.
  - **CR-9.** `curriculum/data/index.json` is now generated from the edited chapter files by `tools/curriculum/check-spec.py --write`, with each chapter's status (core, optional, deferred). `build-curriculum.py` refuses to overwrite the edited files.
- **2026-11-27, Phase 1 artefacts.** AUTHORING-STANDARD.md, YEAR2-SOURCES.md, five packets (`packets/G2.2.md`, `A2.8.md`, `C2.5.md`, `N2.1.md`, `A3.3.md`; G2.2 complete), `tools/curriculum/check-spec.py`, and PREVIEW-PLAN.md.

