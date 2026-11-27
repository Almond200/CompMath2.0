<!-- nav --> [Curriculum](../README.md) · Implementation and editorial standards

# Implementation and editorial standards

## Curriculum first, reference second

Preserve Formulas, Methods, Patterns, Practice and Arena. Learn should be organized by what the student can do next, not the number of existing cards assigned to a lesson. Reference links should appear where they help a student, after the idea has a mathematical purpose. The learner must be able to read the chapter sequentially without opening a card. Use cards as compact recaps, and put further reference reading after the explanation; do not front-load an intimidating checklist of theorems or make the student assemble the reasoning from links. A topic may occur in multiple volumes with explicitly different outcomes; avoid copying text from the reference or simply relabeling a problem set as a lesson.

## The lesson and chapter standard

Each chapter should open with a motivating problem or observation, then develop concepts in a coherent order. Write for a learner encountering the idea for the first time, not a reader searching for a fact. Lead with a question, let a small example expose a limitation of prior knowledge, and give the new result as a response to that limitation. A definition should be followed by a reason it is useful; a theorem should have a derivation or carefully stated assumptions; a worked solution should explain why this approach was chosen and where an alternative fails. The thirteen sample teaching sequences within the books are models for authoring, not mandatory boilerplate. Each chapter should have an editorially written narrative arc and staged problems before publication; do not expose taxonomy labels or metadata as the primary teaching structure. Each concept lesson begins with a question or exploration, develops a definition or technique with its assumptions and derivation, and shows applications through worked examples. Close with a brief summary, practice and transfer. In Volume III, gradually remove method labels and hints; compare at least two plausible strategies when pedagogically valuable.

| **Task type**          | **Role**                                                                                    |
|------------------------|---------------------------------------------------------------------------------------------|
| Exploration            | Make the need for the idea visible, preferably through a problem, small cases or a diagram. |
| Concept checks         | Test the definition, hypotheses, edge cases and common misconceptions.                      |
| Worked examples        | Explain method selection, intermediate claims and exact computations.                       |
| Independent practice   | Vary problem structure, not just numbers; progress from recognition to application.         |
| Transfer and challenge | Mix earlier techniques and require students to choose the representation.                   |
| Chapter review         | Interleave prerequisites, unlabeled problems and error analysis.                            |

Baseline: one motivating exploration (allow a prediction or small attempt before revealing the method), two or more worked examples with different structures, short concept checks and 3–6 independent exercises per concept lesson, plus chapter review and challenge sets. This is an editorial guideline, not a quota. Use problem statements with appropriate permissions or authorized links. Verify every new problem and full solution before publication.

## Volume III assessment and problem selection

Use difficult AMC 12, AIME (especially problems from the middle and late portions), ARML individual, HMMT and other demanding invitational problems where the mathematics matches the chapter. The specific problem should teach a transferable insight. Do not assume all contests or problem numbers have equivalent difficulty; use actual solution demand and available rating data. Proof problems can enrich understanding but should not dominate the core or replace exact-answer practice.

For each published problem record primary placement, prerequisites, target technique, alternative solutions if known, instructional role (explore, guided, independent or transfer), difficulty and verification status. A chapter-end mixed set should not give away the method by organizing every problem under theorem names. In III, first give a worked strategy comparison, then a partially guided transfer problem, then an unmarked mixed set. After a delay, use a novel question with a changed representation or constraint and ask the student to identify the first useful step. Record wrong-model errors separately from arithmetic errors. Measure readiness through novel transfer problems and delayed review, not just completion of pages.

## Migration and pilot plan

1.  Preserve reference-card IDs, archive slugs, ratings and saved progress. Keep existing lesson URLs until a reviewed mapping is available.

2.  Map each of the 595 existing teaching pages (count reported in the prior repository README) to reuse, split, merge, rewrite, reference-only or retire. This is a future editorial task: the present document is not a full old-to-new lesson mapping.

3.  Pilot Geometry II’s circle sequence and combined LOS/LOC chapter, followed by the advanced trigonometric geometry chapter in Geometry III. The pilot should demonstrate both concept-building and later independent problem solving. Also pilot an Algebra III or Combinatorics III chapter to test whether its problem progression differs meaningfully from II.

4.  Reevaluate contest placement according to prerequisites and teaching purpose, then verify every statement, answer and solution. Preserve canonical contest slugs and use stable proposed curriculum IDs.

5.  Validate shelf generation, internal links, progress migration and old redirects before replacing a live book. Release one coherent volume at a time and test the learning path with real learners.

## Research sources and limits

**Primary materials:** Think Academy, Think Olympiad Year 2, Term A, Lessons 1–22, user-provided PDFs. Source page notes in the anchor chapters refer to original PDFs; the lesson concepts and example significance were consolidated in the prior Year 2 curriculum overview. All other content is proposed independently.

**AoPS curriculum benchmarks (public pages consulted November 27, 2026):**

- [Introduction to Algebra](https://artofproblemsolving.com/store/book/intro-algebra) and [Introduction to Geometry](https://classic.artofproblemsolving.com/store/book/intro-geometry): foundation breadth and geometric problem-solving orientation.

- [Intermediate Algebra course outline](https://artofproblemsolving.com/school/course/intermediate-algebra): conics, polynomials, sequences, rational functions, inequalities and functional equations.

- [Precalculus course outline](https://artofproblemsolving.com/school/course/precalc): trig identities and equations, combined triangle laws, parametric and polar coordinate systems, complex roots, vectors, matrices and spatial methods.

- [Introduction to Number Theory course outline](https://artofproblemsolving.com/school/course/intro-numbertheory) and [Intermediate Number Theory course outline](https://artofproblemsolving.com/school/course/intermediate-numbertheory): elementary arithmetic and congruences followed by multiplicative functions, Diophantine equations, orders, residues and sums of squares.

- [Introduction to Counting & Probability](https://artofproblemsolving.com/store/book/intro-counting) and [Intermediate Counting & Probability course outline](https://artofproblemsolving.com/school/course/intermediate-counting): counting, probability, bijections, generating functions, state systems and graphs.

- [The Art of Problem Solving, Volume 2: and Beyond](https://artofproblemsolving.com/store/book/aops-vol2) and [AIME Problem Series](https://artofproblemsolving.com/school/course/maa-aimea): a benchmark for advanced problem-solving practice, separate from a narrowly proof-oriented pathway.

**Existing app context:** [CompMath2.0 README](https://github.com/Almond200/CompMath2.0/blob/main/README.md), [Learn outline](https://github.com/Almond200/CompMath2.0/blob/main/LEARN-OUTLINE.md), [Textbook revision notes](https://github.com/Almond200/CompMath2.0/blob/main/TEXTBOOK-REVISION.md), [Conventions](https://github.com/Almond200/CompMath2.0/blob/main/CONVENTIONS.md), and [Learn data](https://github.com/Almond200/CompMath2.0/tree/main/js/data/learn). The existing architecture and representative lesson files were reviewed earlier in this conversation; this revision uses that review, not an exhaustive audit of every current source file.

**Scope limitations.** This is a proposed curriculum specification. It does not establish that every concept is essential to AIME, reproduce AoPS books, claim to know unprovided Think Academy lessons, verify every prior practice answer or certify every archived solution. The empirical appendix supplies an archive-wide metadata coverage scan and candidate chapter-family mappings, not a verified exercise-by-exercise teaching assignment. The difficulty and sequence recommendations require pilot testing. Optional advanced content (e.g. inversion, primitive roots, reciprocity, Möbius inversion, selected generating-function extensions) is included when useful but should not be a barrier to advancing through the core problem-solving path.

**Second-pass benchmark and contest sources (consulted November 27, 2026).**

- [AoPS Volume 2: and Beyond, public contents excerpt](https://aops-cdn.artofproblemsolving.com/products/aops-vol2/toc.pdf): limits, rotated conics, determinant methods, harmonic sequences, loci and network problems. The text of the public contents was accessible; the PDF screenshot endpoint timed out, so visual verification of those pages was not available.
- [AoPS Precalculus](https://artofproblemsolving.com/school/course/precalc), [Intermediate Counting and Probability](https://artofproblemsolving.com/school/course/intermediate-counting), [Intermediate Number Theory](https://artofproblemsolving.com/school/course/intermediate-numbertheory), and [curriculum recommendations](https://artofproblemsolving.com/school/recommendations): topic scope and differentiation between content instruction and contest preparation.
- [OpenStax Precalculus 2e: analytic geometry key concepts](https://openstax.org/books/precalculus-2e/pages/10-key-concepts): standard precalculus benchmark for rotated and polar conics.
- [MAA American Mathematics Competitions](https://maa.org/student-programs/amc/): general contest context, not a detailed frequency syllabus.
- [LIVE by Po-Shen Loh, 2024 AIME II](https://live.poshenloh.com/past-contests/aime/2024II) and [2025 AIME I](https://live.poshenloh.com/past-contests/aime/2025I): representative contest statements and solutions examined for the stress test. Candidate placements are provisional; this earlier sample predates the archive-wide metadata audit in the appendix.
- [HMMT tournament comparison](https://www.hmmt.co/www/tournaments/novfeb) and [past tournament archive](https://www.hmmt.org/www/archive/problems): later problem-selection benchmark; no HMMT frequency analysis is claimed.
- [IES / WWC: Teaching Strategies for Improving Algebra Knowledge](https://ies.ed.gov/ncee/wwc/PracticeGuide/20) and [Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1): instructional design benchmarks for structured examples and practice.

**Remaining verification.** The next editorial gate is to map the entire app problem bank and reference cards to the proposed lessons, inspect actual solution demands and prerequisites, and validate progression with students. The second-pass research checks publicly available outlines and a small purposive contest sample, not every problem or every source page. The new material is independently authored and is not represented as Think Academy or AoPS curriculum text.
