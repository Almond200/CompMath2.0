<!-- nav --> [Curriculum](../README.md) · [Tracker](../TRACKER.md) · Batch 1

# Production batch 1: the circle sequence (G2.3–G2.6)

Planned 2026-11-28, after the owner approved G2.2 as the prototype. The four chapters are planned together and written to AUTHORING-STANDARD.md, with G2.2 as the quality benchmark. Each chapter has its own packet (`packets/G2.3.md` … `G2.6.md`) holding the final placements, keys and checks; this file holds the plan that ties them together.

## 1. The narrative across the four chapters

G2.2 ends with a question: if $PA\cdot PB=PC\cdot PD$ for crossing segments, must $A,B,C,D$ lie on a circle? The batch answers it and then turns the circle from something given into something to discover, measure and finally write as an equation.

| Chapter | Its question | What it adds | How it ends |
|---|---|---|---|
| **G2.3** Cyclic Quadrilaterals I | When do four points lie on one circle, and what does it buy us? | Concyclic points; the angle properties of a cyclic quadrilateral; the criteria (equidistance, a common hypotenuse, equal angles, supplementary opposite angles, the exterior angle, crossing products) with their converses proved; angle-chasing proofs. | Proofs with several circles call for choosing the criterion, which is G2.4's subject. |
| **G2.4** Cyclic Quadrilaterals II | Which criterion, and what about tangents? | Strategic choice of criterion; the tangent–chord angle (the limit of the inscribed angle); perpendicular chords and their arcs; the full converse of power of a point (outside points, tangents, signs); multistep proofs. | Angles have done their work; lengths need a stronger tool. |
| **G2.5** Ptolemy and Stewart | One equation for six lengths? | Ptolemy's theorem, inequality and converse; applications (equilateral triangle, regular polygons, the Simson line); Stewart's theorem; optionally Brahmagupta, Pitot and bicentric quadrilaterals. | Metric relations in a figure suggest coordinates. |
| **G2.6** Lines and Circles | Can the whole configuration be an equation? | Lines and their relations; distances; reflections; circle equations; point–circle (the signed power of G2.2 again), line–circle and circle–circle positions; loci; optimization; common tangents. | Analytic and synthetic methods compared; G2.7 brings trigonometry to general triangles. |

## 2. Dividing overlapping material (D11)

- **Crossing products.** G2.3.3 proves the crossing-chord converse (segments meeting inside), because it is the cleanest answer to G2.2's question and uses only the equal-angle criterion. G2.4.4 does the full converse: lines meeting outside, the tangent case ($PA\cdot PB=PT^2$ implies tangency) and the signed statement, and uses it strategically. G2.4.4 cites G2.3.3 and does not re-prove the inside case.
- **Inscribed and tangent–chord angles.** G2.3 uses inscribed angles (recalled from G1.7.4 and G2.2.1, not re-proved). G2.4.2 proves the tangent–chord angle once; G2.2.3 only met tangents as limits.
- **Signed power.** G2.2.5 defined it; G2.6.5 meets it as $S=(x_0-a)^2+(y_0-b)^2-r^2$ and cites G2.2, without a second definition.
- **Common tangents.** Derived once in G2.6.10 (G3.3 uses them strategically). G2.2's forward placement F3 (`1976-ahsme-26`) is placed there.
- **Ptolemy, Stewart and the triangle laws.** The law of cosines and the law of sines are G2.7.5 and G2.7.3, after this batch. Nothing in G2.3–G2.6 may require them: Stewart is proved with two right triangles, Ptolemy with an auxiliary point, and a $60^\circ$ or $120^\circ$ angle is handled by dropping a perpendicular. G2.5.6 (Optional) derives Brahmagupta's formula with the cosine eliminated, citing G2.7.5 for the law of cosines; nothing later depends on it.

## 3. Prerequisites

| Needed | Where | Used in |
|---|---|---|
| Inscribed angles, angles in a semicircle, equal chords and arcs | G1.7.4, G1.7.5, G2.2.1 | all four |
| Radius ⊥ tangent; perpendicular from the center bisects a chord | G1.7.2 | G2.3, G2.4, G2.6 |
| Equal tangent lengths; tangential quadrilaterals | G1.7.6 | G2.4, G2.5.6, G2.6.10 |
| Similar triangles | G1.3.1 | G2.3–G2.5 |
| Pythagoras; altitudes in right triangles | G1.4.1, G1.4.3 | all four |
| Circumcenter, incenter, orthocenter | G1.6.1, G1.6.2, G1.6.4 | G2.3.1, G2.3.4, G2.4 |
| Heron's formula | G1.6.5 | G2.5.6 |
| Coordinates, slopes and equations of lines, reflections | G1.8.1–G1.8.3, G1.8.7 | G2.6 |
| Power of a point (signed) | G2.2 | G2.3.3, G2.4.4, G2.6.5, G2.6.8 |
| Completing the square; the discriminant | A1.5.2, A1.5.3 | G2.6.4, G2.6.6 |
| AM–GM (optional route in optimization) | A2.11 | G2.5.2, G2.6.9 |

## 4. Shape of each chapter

Practice is scaled to the material (AUTHORING-STANDARD §11), not copied from G2.2. G2.3 and G2.4 are proof-heavy, so part of their practice is proof problems (a written argument, with the solution available after writing); G2.6 is computational, with more sections and more short problems.

| | Sections | Examples | Checkpoints | Practice | Review | Challenge |
|---|---|---|---|---|---|---|
| G2.3 | 4 | about 6 | about 9 | 14–16 (some proofs) | 12 | 5 |
| G2.4 | 5 | about 7 | about 9 | 15–17 (some proofs) | 12 | 6 |
| G2.5 | 6 (G2.5.6 Optional) | about 8 | about 10 | 16–18 | 12–14 | 6 |
| G2.6 | 10 | about 12 | about 14 | 20–24 | 14–16 | 6 |

## 5. Placement pool

Chosen from `node tools/curriculum/candidates.cjs` (problems already placed anywhere are excluded automatically). Final rows, keys and checks are in each packet; a problem is placed once in the whole shelf, with recorded twins noted. Problems needing the law of cosines or sines are excluded or solved without them.

- **G2.3:** `2019-amc-10a-6`, `2019-pumac-division-b-geometry-1`, `1974-ahsme-5`, `1998-hmmt-february-geometry-1`, `2012-columbus-state-tournament-15`, `2017-hmmt-february-geometry-1`, `2023-mbmt-lower-geometry-7`, `1972-ahsme-25`, `2022-smt-geometry-2`, `2017-cmimc-geometry-6`, `2022-amc-10a-15`, `2011-pumac-division-a-geometry-4`, with our own proof problems (feet of altitudes, Brahmagupta's theorem and its corollary).
- **G2.4:** `2024-calgary-junior-math-contest-4`, `2022-mbmt-upper-geometry-7`, `1955-ahsme-29`, `1998-ahsme-26`, `2014-hmmt-february-geometry-4`, `2007-hmmt-february-geometry-8`, `2013-hmmt-february-geometry-6`, `2019-smt-geometry-4`, `2019-aime-ii-11`, `2012-hmmt-february-geometry-4`, and G2.2's planned delayed revisit (a power-of-a-point problem in the Review).
- **G2.5:** `2018-columbus-state-tournament-40`, `1957-ahsme-48`, `2013-smt-geometry-8`, `2004-amc-10b-24`, `2011-lehigh-math-contest-38`, `2016-mmaths-individual-11`, `2018-mmaths-individual-7`, `2018-lehigh-math-contest-37`, `2012-amc-12a-16`, `2005-lehigh-math-contest-31`, `2007-lehigh-math-contest-35`, `2012-lehigh-math-contest-35`, `1989-ahsme-15`, `2016-lehigh-math-contest-36`, `2016-bmt-geometry-2`, `2012-lehigh-math-contest-13`, `1988-ahsme-24`; challenge from `2014-amc-12b-24`, `2003-aime-i-7`, `2001-hmmt-february-geometry-8`, `2025-aime-i-6`, `2011-amc-12a-24`.
- **G2.6:** lines and distances (`1961-ahsme-3`, `2017-amc-10b-10`, `2003-amc-10b-11`, `1963-ahsme-33`, `2010-lehigh-math-contest-12`), symmetry (`2020-utah-state-math-contest-junior-21`, `1992-ahsme-12`, `1998-ahsme-25`, `2010-pumac-division-b-geometry-2`), circles (`2026-amc-10b-7`, `2001-lehigh-math-contest-18`, `2016-pumac-division-a-geometry-2`), positions (`2013-umd-hsmc-part-i-10`, `2018-utah-state-math-contest-senior-36`, `1965-ahsme-13`, `2017-amc-12b-9`, `2023-amc-12b-10`, `2005-amc-12b-14`), loci (`1975-ahsme-11`), optimization (`1996-ahsme-25`, `2019-bmt-algebra-6`, `2020-lehigh-math-contest-10`), common tangents (`2002-amc-12a-18`, `1971-ahsme-9`, `1976-ahsme-26`, `2020-pumac-division-a-geometry-1`), with challenge from `2025-amc-10a-20`, `2024-lehigh-math-contest-21` and others.

## 6. Checks for production

- `tools/gates.sh` now runs the curriculum checks: the specification and packets (`check-spec.py`, which also catches a problem placed twice), the shelf, every chapter's figure script (`--check`), `check-chapters.cjs` (every item used once, references and figures resolve, answers present, every answer recomputed, contest slugs placed in the packet, no retired labels or positional references) and every chapter's verification script.
- `tools/curriculum/check-preview.cjs` renders every written chapter at two widths in both themes.
- `tools/curriculum/candidates.cjs` lists unplaced archive problems for a chapter.
- Verification scripts share `tools/curriculum/verify/common.py`; each recomputes every answer independently and checks it against the chapter and the live keys. Proof problems are checked by numeric instances of the claim where one exists.

## 7. Status

| Chapter | Stage | Notes |
|---|---|---|
| G2.3 | S1 planned | |
| G2.4 | S1 planned | |
| G2.5 | S1 planned | |
| G2.6 | S1 planned | |
