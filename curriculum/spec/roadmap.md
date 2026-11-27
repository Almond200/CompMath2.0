<!-- nav --> [Curriculum](../README.md) · Development roadmap, execution sequence and release gates

# Development roadmap — read this first

This consolidated edition is the single planning baseline for the Learn redesign. It retains the 136 chapters and 791 numbered concept sections from the Integrated Teaching Edition, incorporates all eight refinements from the fifth-pass solution audit at their existing curricular homes, and preserves the full 30-problem audit and four teaching pilots at the end. Earlier drafts are historical; they are not separate sources of requirements.

## Non-negotiable design decisions

**Purpose.** Learn is a teaching resource, not a wiki of definitions. Build a question-led mathematical narrative. The reference cards, practice archive and Arena remain distinct tools and are linked only where pedagogically useful.

**Levels.** I builds fluency; II builds depth and a substantial precalculus/competition toolkit, anchored by the 22 supplied Think Academy Year 2 lessons; III develops strategic, independent problem solving for middle-to-late AIME and difficult exact-answer competitions. Proof is used to explain and justify, not as a replacement for advanced problem solving.

**Scope.** Four independently paced subject ladders; keep explicit cross-subject bridges. LOS and LOC belong together in G2.7; polar coordinates have a dedicated chapter in G2.11. No differential or integral calculus is required or taught; A2.22 is optional elementary limit and convergence intuition. Treat specialized topics as enrichment unless needed by a core route.

**Stable assets.** Preserve the existing reference cards, problem slugs, ratings and saved progress. Proposed curriculum IDs are a new authoring namespace, not permission to overwrite live lesson URLs.

## How to navigate the consolidated plan

[<u>Twelve-book shelf</u>](../spec/shelf-and-levels.md) — Volume directions and links into the chapter specifications.

[<u>Implementation and editorial standards</u>](../spec/authoring-standards.md) — Authoring and migration standards, research and scope.

[<u>Archive-wide coverage and teaching validation</u>](../spec/coverage-audit.md) — Full metadata coverage results and limitations.

[<u>Solution-level audit and teaching pilots</u>](../spec/solution-audit.md) — Both 2026 AIME papers, route checks, refinements and four student-facing examples.

[<u>Acceptance tests and next authoring batch</u>](../spec/teaching-pilots.md#6--acceptance-tests-and-the-next-authoring-batch) — Concrete gates and next five model chapters.

Do not use the number of lessons or nominal topic coverage as a release gate. The success criterion is whether a learner can follow the reasoning, choose a method in an unfamiliar problem and verify the result independently.

# Execution sequence and release gates

**Stage 1 — Adopt the specification.** Use this document as the canonical proposed curriculum. Maintain stable IDs, track optional material separately, record open mathematical issues, and map old lesson IDs to new destinations before changing live URLs.

**Stage 2 — Establish the authoring standard.** Review the four completed mini-units (A1.3, G2.7, N3.4 and C3.8); write the next five pilots: G2.2 power of a point, A2.8 composite/inverse functions, C2.5 recursive counting, N2.1 CRT, and A3.3 transformed roots. Read each unit sequentially as a student. Include motivating questions, developed mathematics, contrasting examples, faded guidance, independent and delayed transfer. Do not force every lesson into identical headings.

**Stage 3 — Validate the mathematics and exercise placement.** Resolve the three numerical-only 2026 AIME routes (I \#15; II \#14 and \#15). The no-calculus alternatives to II \#6 and \#8 should be used in place of derivative-based strategies if the routes are later updated in the app. Expand solution review beyond the 30 audited problems, stratifying by subject, contest difficulty, problem role and cross-topic demands. Review actual statements and solutions; never infer prerequisites solely from tags. Use the audit status scheme in the solution appendix.

**Stage 4 — Build complete volumes.** Map each existing lesson to reuse, split, merge, rewrite, reference-only or retire. Write a complete chapter arc before authoring individual lessons. For every exercise record its canonical slug, required concepts, intended teaching role, difficulty and verification status. Use unlabeled mixed problems to assess method choice. A concept is not complete just because its theorem or card exists.

**Stage 5 — Test and migrate.** Pilot the connected Geometry II circle sequence and triangle laws, then a Volume III transfer chapter. Collect learner evidence on first steps, misconception contrasts, independent solutions and delayed transfer. Validate shelf generation, internal links, redirects and saved progress. Replace one coherent volume at a time after review; keep old URLs working until mappings are tested.

## Status at this baseline

**Established:** 12 proposed books; 136 chapters (one optional); 791 concept sections; all 22 supplied Year 2 lessons mapped; metadata scan of 19,456 appearances; eight solution-audit refinements incorporated into existing sections; four model mini-units.

**Not established:** Complete textbook manuscripts, full old-to-new lesson mapping, exercise-by-exercise verified prerequisites, independently verified solutions for the full archive, student readiness or score improvements, or live repository implementation. The 99.5% candidate topic coverage is a screening result, not an instructional outcome.

Editorial control: every future change should identify the affected curriculum ID, rationale, supporting problem or source, prerequisite impact, acceptance task, and review status. Change the curriculum only when evidence supports it; prioritize deeper teaching over expanding the topic list.
