<!-- nav --> [Curriculum](README.md) · Chapter tracker

# Chapter tracker

One row per chapter of the new curriculum (136). Update a row whenever a chapter changes stage, in the same commit as the work. `python3 tools/curriculum/build-curriculum.py --check` fails if a chapter has no row.

## Stages

| Stage | Meaning | Exit evidence |
|---|---|---|
| S0 Specified | The chapter's premise, numbered concepts, practice directions and mastery outcome are in the specification. | The chapter file in `books/`. |
| S1 Arc | The authoring packet exists: a one-paragraph narrative arc, learning objectives, a dependency check against earlier IDs, and the staged problem selection (motivating, direct check, contrast, partly guided, unlabeled transfer, delayed revisit). | `packets/<ID>.md`, following AUTHORING-STANDARD.md. |
| S2 Pilot | A student-facing model unit covers part of the chapter. | A pilot in spec/teaching-pilots.md or a reviewed draft. |
| S3 Draft | The full manuscript is drafted, not published. | A draft in the agreed location (TECHNICAL-CHANGES.md, T7). |
| S4 Problems | Every exercise has a placement record (slug, route, required concept IDs, role, difficulty source, review status), and its answer and route are checked. | Placement records with status `route-read` or better. |
| S5 Reviewed | Mathematics checked by computation, and the unit read sequentially as a student; the acceptance gates in spec/teaching-pilots.md §6 pass. | A review note in REVIEW-NOTES.md or the chapter's packet. |
| S6 Tested | Learner evidence collected: first-step diagnostics, misconception contrasts, delayed transfer. | A learner-evidence note. |
| S7 Live | Released in the app as part of a whole volume, with old URLs redirected. | The release entry in CHANGELOG.md. |
| Deferred | Excluded from the core release by the owner's decision. | REVIEW-NOTES.md §3. |

A chapter can hold S2 and still be at S0 for the rest of its sections; the Notes column says which part. Volumes are released whole (roadmap Stage 5), so S7 is set for a volume at once.

## Algebra I — Algebraic Foundations and Problem Solving

[Volume file](books/algebra-1/README.md) · 10 chapters · 58 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [A1.1](books/algebra-1/A1.01-expressions-identities-and-factoring.md) | Expressions, Identities and Factoring | Proposed | 6 | S0 | Has a teaching sequence |
| [A1.2](books/algebra-1/A1.02-linear-equations-and-mathematical-modeling.md) | Linear Equations and Mathematical Modeling | Proposed | 6 | S0 | 1 second-pass extension |
| [A1.3](books/algebra-1/A1.03-proportionality-rates-and-quantitative-models.md) | Proportionality, Rates and Quantitative Models | Proposed | 8 | S2 (part) | 1 second-pass extension; Audit refinement 1; Pilot A (A1.3.2, A1.3.6) written |
| [A1.4](books/algebra-1/A1.04-exponents-roots-and-exact-arithmetic.md) | Exponents, Roots and Exact Arithmetic | Proposed | 5 | S0 |  |
| [A1.5](books/algebra-1/A1.05-quadratic-equations.md) | Quadratic Equations | Proposed | 7 | S0 | 1 second-pass extension |
| [A1.6](books/algebra-1/A1.06-functions-graphs-and-coordinate-interpretation.md) | Functions, Graphs and Coordinate Interpretation | Proposed | 6 | S0 | 1 second-pass extension |
| [A1.7](books/algebra-1/A1.07-rational-expressions-and-rational-equations.md) | Rational Expressions and Rational Equations | Proposed | 4 | S0 |  |
| [A1.8](books/algebra-1/A1.08-inequalities-absolute-value-and-bounds.md) | Inequalities, Absolute Value and Bounds | Proposed | 6 | S0 | 1 second-pass extension |
| [A1.9](books/algebra-1/A1.09-sequences-series-and-patterns.md) | Sequences, Series and Patterns | Proposed | 5 | S0 |  |
| [A1.10](books/algebra-1/A1.10-polynomial-structure-and-algebraic-synthesis.md) | Polynomial Structure and Algebraic Synthesis | Proposed | 5 | S0 |  |

## Algebra II — Advanced Algebra and Precalculus

[Volume file](books/algebra-2/README.md) · 22 chapters · 128 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [A2.1](books/algebra-2/A2.01-sets-and-mappings.md) | Sets and Mappings | Year 2 L1 | 7 | S0 |  |
| [A2.2](books/algebra-2/A2.02-power-and-exponential-functions.md) | Power and Exponential Functions | Year 2 L2 | 6 | S0 |  |
| [A2.3](books/algebra-2/A2.03-logarithms-and-logarithmic-functions-i.md) | Logarithms and Logarithmic Functions I | Year 2 L3 | 4 | S0 |  |
| [A2.4](books/algebra-2/A2.04-logarithms-and-logarithmic-functions-ii.md) | Logarithms and Logarithmic Functions II | Year 2 L4 | 4 | S0 |  |
| [A2.5](books/algebra-2/A2.05-odd-even-and-periodic-functions.md) | Odd, Even and Periodic Functions | Year 2 L5 | 6 | S0 |  |
| [A2.6](books/algebra-2/A2.06-advanced-quadratic-functions.md) | Advanced Quadratic Functions | Year 2 L6 | 4 | S0 |  |
| [A2.7](books/algebra-2/A2.07-special-functions.md) | Special Functions | Year 2 L7 | 6 | S0 |  |
| [A2.8](books/algebra-2/A2.08-composite-and-inverse-functions.md) | Composite and Inverse Functions | Year 2 L8 | 4 | S1 | Has a teaching sequence; Next pilot (roadmap Stage 2); [Packet](packets/A2.8.md) ready for review (2026-11-27) |
| [A2.9](books/algebra-2/A2.09-functional-equations-and-mathematical-induction.md) | Functional Equations and Mathematical Induction | Proposed | 7 | S0 | 1 second-pass extension |
| [A2.10](books/algebra-2/A2.10-recursive-sequences.md) | Recursive Sequences | Year 2 L9 | 8 | S0 | 1 second-pass extension |
| [A2.11](books/algebra-2/A2.11-inequality-of-arithmetic-and-geometric-means.md) | Inequality of Arithmetic and Geometric Means | Year 2 L10 | 4 | S0 |  |
| [A2.12](books/algebra-2/A2.12-cauchy-schwarz-weighted-means-and-optimization.md) | Cauchy–Schwarz, Weighted Means and Optimization | Proposed | 5 | S0 |  |
| [A2.13](books/algebra-2/A2.13-advanced-polynomials-and-symmetric-expressions.md) | Advanced Polynomials and Symmetric Expressions | Proposed | 7 | S0 | 1 second-pass extension; Audit refinement 2 |
| [A2.14](books/algebra-2/A2.14-rational-functions-partial-fractions-and-asymptotic-behavior.md) | Rational Functions, Partial Fractions and Asymptotic Behavior | Proposed | 6 | S0 |  |
| [A2.15](books/algebra-2/A2.15-introduction-to-trigonometry.md) | Introduction to Trigonometry | Year 2 L20 | 6 | S0 |  |
| [A2.16](books/algebra-2/A2.16-trigonometric-identities-i.md) | Trigonometric Identities I | Year 2 L21 | 9 | S0 |  |
| [A2.17](books/algebra-2/A2.17-trigonometric-identities-ii.md) | Trigonometric Identities II | Year 2 L22 | 7 | S0 |  |
| [A2.18](books/algebra-2/A2.18-trigonometric-functions-graphs-and-equations.md) | Trigonometric Functions, Graphs and Equations | Proposed | 6 | S0 |  |
| [A2.19](books/algebra-2/A2.19-inverse-trigonometric-functions-and-trigonometric-equations.md) | Inverse Trigonometric Functions and Trigonometric Equations | Proposed | 5 | S0 |  |
| [A2.20](books/algebra-2/A2.20-complex-numbers-and-roots-of-unity.md) | Complex Numbers and Roots of Unity | Proposed | 5 | S0 |  |
| [A2.21](books/algebra-2/A2.21-matrices-linear-systems-and-linear-transformations.md) | Matrices, Linear Systems and Linear Transformations | Proposed | 7 | S0 | 2 second-pass extensions |
| [A2.22](books/algebra-2/A2.22-limits-continuity-and-convergence.md) | Limits, Continuity and Convergence (Optional Precalculus Enrichment) | Proposed | 5 | Deferred | Optional enrichment; Deferred and excluded from the core release (owner, 2026-11-27, D8; CR-6) |

## Algebra III — Advanced Algebraic Problem Solving

[Volume file](books/algebra-3/README.md) · 10 chapters · 57 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [A3.1](books/algebra-3/A3.01-strategic-substitutions-and-hidden-variables.md) | Strategic Substitutions and Hidden Variables | Proposed | 6 | S0 | Has a teaching sequence |
| [A3.2](books/algebra-3/A3.02-advanced-systems-of-equations.md) | Advanced Systems of Equations | Proposed | 5 | S0 |  |
| [A3.3](books/algebra-3/A3.03-advanced-polynomial-structure-and-root-problems.md) | Advanced Polynomial Structure and Root Problems | Proposed | 7 | S1 | 1 second-pass extension; Audit refinement 2; Next pilot (roadmap Stage 2); [Packet](packets/A3.3.md) ready for review (2026-11-27) |
| [A3.4](books/algebra-3/A3.04-advanced-inequalities-and-constrained-optimization.md) | Advanced Inequalities and Constrained Optimization | Proposed | 7 | S0 |  |
| [A3.5](books/algebra-3/A3.05-functional-equations-iteration-and-hidden-symmetry.md) | Functional Equations, Iteration and Hidden Symmetry | Proposed | 5 | S0 |  |
| [A3.6](books/algebra-3/A3.06-advanced-recurrences-and-discrete-dynamics.md) | Advanced Recurrences and Discrete Dynamics | Proposed | 6 | S0 |  |
| [A3.7](books/algebra-3/A3.07-advanced-summation-products-and-series.md) | Advanced Summation, Products and Series | Proposed | 6 | S0 | 1 second-pass extension |
| [A3.8](books/algebra-3/A3.08-advanced-trigonometric-algebra.md) | Advanced Trigonometric Algebra | Proposed | 5 | S0 |  |
| [A3.9](books/algebra-3/A3.09-advanced-complex-numbers-and-roots-of-unity.md) | Advanced Complex Numbers and Roots of Unity | Proposed | 5 | S0 |  |
| [A3.10](books/algebra-3/A3.10-algebraic-synthesis-late-aime-and-beyond.md) | Algebraic Synthesis: Late AIME and Beyond | Proposed | 5 | S0 | 1 second-pass extension |

## Geometry I — Euclidean Foundations and Visual Reasoning

[Volume file](books/geometry-1/README.md) · 9 chapters · 53 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [G1.1](books/geometry-1/G1.01-angles-lines-and-geometric-argument.md) | Angles, Lines and Geometric Argument | Proposed | 5 | S0 |  |
| [G1.2](books/geometry-1/G1.02-triangle-congruence-and-isosceles-structure.md) | Triangle Congruence and Isosceles Structure | Proposed | 6 | S0 | Has a teaching sequence |
| [G1.3](books/geometry-1/G1.03-similarity-ratios-and-parallel-lines.md) | Similarity, Ratios and Parallel Lines | Proposed | 5 | S0 |  |
| [G1.4](books/geometry-1/G1.04-right-triangles-and-special-lengths.md) | Right Triangles and Special Lengths | Proposed | 5 | S0 |  |
| [G1.5](books/geometry-1/G1.05-area-quadrilaterals-and-decomposition.md) | Area, Quadrilaterals and Decomposition | Proposed | 6 | S0 |  |
| [G1.6](books/geometry-1/G1.06-triangle-centers-incircles-and-circumcircles.md) | Triangle Centers, Incircles and Circumcircles | Proposed | 5 | S0 |  |
| [G1.7](books/geometry-1/G1.07-polygons-and-elementary-circle-geometry.md) | Polygons and Elementary Circle Geometry | Proposed | 7 | S0 | 1 second-pass extension |
| [G1.8](books/geometry-1/G1.08-coordinate-geometry-and-rigid-transformations.md) | Coordinate Geometry and Rigid Transformations | Proposed | 7 | S0 | 1 second-pass extension |
| [G1.9](books/geometry-1/G1.09-solid-geometry-and-integrated-foundations.md) | Solid Geometry and Integrated Foundations | Proposed | 7 | S0 | 1 second-pass extension |

## Geometry II — Circle Geometry, Triangle Methods and Analytic Geometry

[Volume file](books/geometry-2/README.md) · 14 chapters · 97 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [G2.1](books/geometry-2/G2.01-polygons.md) | Polygons | Year 2 L11 | 8 | S0 |  |
| [G2.2](books/geometry-2/G2.02-power-of-a-point-theorem.md) | Power of a Point Theorem | Year 2 L12 | 6 | S4 | Next pilot (roadmap Stage 2); [Packet](packets/G2.2.md) ready for review (2026-11-27); manuscript and preview written 2026-11-28; editorial revision to AUTHORING-STANDARD §7–§10 the same day (packet §10); awaiting the owner's review |
| [G2.3](books/geometry-2/G2.03-cyclic-quadrilaterals-i.md) | Cyclic Quadrilaterals I | Year 2 L13 | 4 | S0 |  |
| [G2.4](books/geometry-2/G2.04-cyclic-quadrilaterals-ii.md) | Cyclic Quadrilaterals II | Year 2 L14 | 5 | S0 |  |
| [G2.5](books/geometry-2/G2.05-ptolemys-theorem-and-stewarts-theorem.md) | Ptolemy’s Theorem and Stewart’s Theorem | Year 2 L15 | 6 | S0 | 1 second-pass extension |
| [G2.6](books/geometry-2/G2.06-equations-of-straight-lines-and-circles.md) | Equations of Straight Lines and Circles | Year 2 L16 | 10 | S0 |  |
| [G2.7](books/geometry-2/G2.07-law-of-sines-and-law-of-cosines.md) | Law of Sines and Law of Cosines | Proposed | 10 | S2 (part) | Has a teaching sequence; Pilot B (G2.7.1–6, G2.7.9) written |
| [G2.8](books/geometry-2/G2.08-triangle-centers-cevians-and-concurrency.md) | Triangle Centers, Cevians and Concurrency | Proposed | 8 | S0 | 1 second-pass extension |
| [G2.9](books/geometry-2/G2.09-conic-sections-and-algebraic-loci.md) | Conic Sections and Algebraic Loci | Proposed | 7 | S0 | 1 second-pass extension; Audit refinement 3 |
| [G2.10](books/geometry-2/G2.10-parametric-equations-and-curves.md) | Parametric Equations and Curves | Proposed | 6 | S0 | 1 second-pass extension |
| [G2.11](books/geometry-2/G2.11-polar-coordinates-and-polar-graphs.md) | Polar Coordinates and Polar Graphs | Proposed | 8 | S0 | 1 second-pass extension |
| [G2.12](books/geometry-2/G2.12-geometric-transformations-and-similarity-maps.md) | Geometric Transformations and Similarity Maps | Proposed | 7 | S0 | 1 second-pass extension; Audit refinement 4 |
| [G2.13](books/geometry-2/G2.13-vectors-dot-products-and-analytic-geometry.md) | Vectors, Dot Products and Analytic Geometry | Proposed | 5 | S0 |  |
| [G2.14](books/geometry-2/G2.14-three-dimensional-analytic-geometry-and-advanced-solids.md) | Three-Dimensional Analytic Geometry and Advanced Solids | Proposed | 7 | S0 | 1 second-pass extension; Audit refinement 5 |

## Geometry III — Advanced Geometric Problem Solving

[Volume file](books/geometry-3/README.md) · 10 chapters · 55 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [G3.1](books/geometry-3/G3.01-auxiliary-constructions-and-strategic-angle-chasing.md) | Auxiliary Constructions and Strategic Angle Chasing | Proposed | 6 | S0 | 1 second-pass extension |
| [G3.2](books/geometry-3/G3.02-advanced-triangle-configurations-and-metric-relations.md) | Advanced Triangle Configurations and Metric Relations | Proposed | 6 | S0 |  |
| [G3.3](books/geometry-3/G3.03-advanced-circle-configurations-and-radical-axes.md) | Advanced Circle Configurations and Radical Axes | Proposed | 6 | S0 | Has a teaching sequence |
| [G3.4](books/geometry-3/G3.04-spiral-similarity-rotations-and-homothety.md) | Spiral Similarity, Rotations and Homothety | Proposed | 5 | S0 | Audit refinement 4 |
| [G3.5](books/geometry-3/G3.05-advanced-trigonometric-geometry.md) | Advanced Trigonometric Geometry | Proposed | 5 | S0 |  |
| [G3.6](books/geometry-3/G3.06-advanced-coordinate-geometry-loci-and-conics.md) | Advanced Coordinate Geometry, Loci and Conics | Proposed | 6 | S0 | 1 second-pass extension; Audit refinement 3 |
| [G3.7](books/geometry-3/G3.07-vector-barycentric-and-complex-geometry.md) | Vector, Barycentric and Complex Geometry | Proposed | 5 | S0 |  |
| [G3.8](books/geometry-3/G3.08-inversion-and-selected-advanced-circle-transformations.md) | Inversion and Selected Advanced Circle Transformations | Proposed | 5 | S0 |  |
| [G3.9](books/geometry-3/G3.09-advanced-solid-geometry-and-spatial-reasoning.md) | Advanced Solid Geometry and Spatial Reasoning | Proposed | 7 | S0 | 1 second-pass extension; Audit refinement 5 |
| [G3.10](books/geometry-3/G3.10-geometric-synthesis-late-aime-and-beyond.md) | Geometric Synthesis: Late AIME and Beyond | Proposed | 4 | S0 |  |

## Number Theory I — Integers, Divisibility and Remainders

[Volume file](books/number-theory-1/README.md) · 9 chapters · 49 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [N1.1](books/number-theory-1/N1.01-integers-divisibility-and-parity.md) | Integers, Divisibility and Parity | Proposed | 5 | S0 |  |
| [N1.2](books/number-theory-1/N1.02-primes-and-unique-factorization.md) | Primes and Unique Factorization | Proposed | 6 | S0 |  |
| [N1.3](books/number-theory-1/N1.03-greatest-common-divisors-and-least-common-multiples.md) | Greatest Common Divisors and Least Common Multiples | Proposed | 5 | S0 |  |
| [N1.4](books/number-theory-1/N1.04-divisors-factorials-and-prime-exponents.md) | Divisors, Factorials and Prime Exponents | Proposed | 6 | S0 | Has a teaching sequence |
| [N1.5](books/number-theory-1/N1.05-digits-bases-and-rational-representations.md) | Digits, Bases and Rational Representations | Proposed | 6 | S0 | 1 second-pass extension |
| [N1.6](books/number-theory-1/N1.06-integer-parts-rationality-and-exact-number-sense.md) | Integer Parts, Rationality and Exact Number Sense | Proposed | 4 | S0 |  |
| [N1.7](books/number-theory-1/N1.07-modular-arithmetic-and-linear-congruences.md) | Modular Arithmetic and Linear Congruences | Proposed | 5 | S0 |  |
| [N1.8](books/number-theory-1/N1.08-elementary-diophantine-equations.md) | Elementary Diophantine Equations | Proposed | 5 | S0 |  |
| [N1.9](books/number-theory-1/N1.09-integrated-integer-problem-solving.md) | Integrated Integer Problem Solving | Proposed | 7 | S0 |  |

## Number Theory II — Congruences, Arithmetic Functions and Integer Equations

[Volume file](books/number-theory-2/README.md) · 11 chapters · 59 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [N2.1](books/number-theory-2/N2.01-modular-inverses-and-the-chinese-remainder-theorem.md) | Modular Inverses and the Chinese Remainder Theorem | Proposed | 6 | S1 | 1 second-pass extension; Audit refinement 6; Next pilot (roadmap Stage 2); [Packet](packets/N2.1.md) ready for review (2026-11-27) |
| [N2.2](books/number-theory-2/N2.02-modular-powers-orders-and-periodicity.md) | Modular Powers, Orders and Periodicity | Proposed | 5 | S0 |  |
| [N2.3](books/number-theory-2/N2.03-wilsons-theorem-residue-products-and-primitive-roots.md) | Wilson’s Theorem, Residue Products and Primitive Roots | Proposed | 5 | S0 |  |
| [N2.4](books/number-theory-2/N2.04-eulers-totient-function-and-arithmetic-functions.md) | Euler’s Totient Function and Arithmetic Functions | Proposed | 5 | S0 |  |
| [N2.5](books/number-theory-2/N2.05-valuations-factorials-and-divisibility-of-expressions.md) | Valuations, Factorials and Divisibility of Expressions | Proposed | 6 | S0 | Has a teaching sequence; Audit refinement 7 |
| [N2.6](books/number-theory-2/N2.06-quadratic-residues-and-modular-obstructions.md) | Quadratic Residues and Modular Obstructions | Proposed | 5 | S0 |  |
| [N2.7](books/number-theory-2/N2.07-sums-of-squares-and-integer-quadratic-forms.md) | Sums of Squares and Integer Quadratic Forms | Proposed | 5 | S0 |  |
| [N2.8](books/number-theory-2/N2.08-advanced-diophantine-equations-and-bounds.md) | Advanced Diophantine Equations and Bounds | Proposed | 7 | S0 | 1 second-pass extension |
| [N2.9](books/number-theory-2/N2.09-rational-approximation-continued-fractions-and-pell-equations.md) | Rational Approximation, Continued Fractions and Pell Equations | Proposed | 5 | S0 |  |
| [N2.10](books/number-theory-2/N2.10-periodic-decimals-bases-and-residue-structure.md) | Periodic Decimals, Bases and Residue Structure | Proposed | 5 | S0 |  |
| [N2.11](books/number-theory-2/N2.11-number-theoretic-synthesis.md) | Number-Theoretic Synthesis | Proposed | 5 | S0 |  |

## Number Theory III — Advanced Number-Theoretic Problem Solving

[Volume file](books/number-theory-3/README.md) · 9 chapters · 50 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [N3.1](books/number-theory-3/N3.01-strategic-modular-arithmetic-and-simultaneous-constraints.md) | Strategic Modular Arithmetic and Simultaneous Constraints | Proposed | 5 | S2 (part) | Audit refinement 6; Pilot C (N3.1.1, N3.4.1) written |
| [N3.2](books/number-theory-3/N3.02-orders-power-towers-and-periodic-residues.md) | Orders, Power Towers and Periodic Residues | Proposed | 6 | S0 | 1 second-pass extension |
| [N3.3](books/number-theory-3/N3.03-prime-valuations-factorials-and-exponent-lifting.md) | Prime Valuations, Factorials and Exponent Lifting | Proposed | 6 | S0 | 1 second-pass extension |
| [N3.4](books/number-theory-3/N3.04-arithmetic-functions-divisor-sums-and-multiplicative-structure.md) | Arithmetic Functions, Divisor Sums and Multiplicative Structure | Proposed | 5 | S2 (part) | Audit refinement 6; Pilot C (N3.1.1, N3.4.1) written |
| [N3.5](books/number-theory-3/N3.05-quadratic-residues-and-modular-solvability.md) | Quadratic Residues and Modular Solvability | Proposed | 5 | S0 |  |
| [N3.6](books/number-theory-3/N3.06-advanced-diophantine-equations-and-integer-bounds.md) | Advanced Diophantine Equations and Integer Bounds | Proposed | 6 | S0 | Has a teaching sequence |
| [N3.7](books/number-theory-3/N3.07-pell-equations-norms-and-structured-integer-sequences.md) | Pell Equations, Norms and Structured Integer Sequences | Proposed | 6 | S0 |  |
| [N3.8](books/number-theory-3/N3.08-advanced-digits-bases-and-carry-problems.md) | Advanced Digits, Bases and Carry Problems | Proposed | 6 | S0 | 1 second-pass extension |
| [N3.9](books/number-theory-3/N3.09-advanced-integer-extremes-floors-and-mixed-number-theory.md) | Advanced Integer Extremes, Floors and Mixed Number Theory | Proposed | 5 | S0 |  |

## Combinatorics & Probability I — Counting Models and Finite Probability

[Volume file](books/combinatorics-1/README.md) · 10 chapters · 53 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [C1.1](books/combinatorics-1/C1.01-counting-objects-sets-and-cases.md) | Counting Objects, Sets and Cases | Proposed | 5 | S0 |  |
| [C1.2](books/combinatorics-1/C1.02-permutations-and-combinations.md) | Permutations and Combinations | Proposed | 6 | S0 | Has a teaching sequence |
| [C1.3](books/combinatorics-1/C1.03-restricted-arrangements-and-distributions.md) | Restricted Arrangements and Distributions | Proposed | 5 | S0 |  |
| [C1.4](books/combinatorics-1/C1.04-binomial-coefficients-and-combinatorial-identities.md) | Binomial Coefficients and Combinatorial Identities | Proposed | 7 | S0 | 1 second-pass extension |
| [C1.5](books/combinatorics-1/C1.05-finite-probability-and-conditional-events.md) | Finite Probability and Conditional Events | Proposed | 5 | S0 |  |
| [C1.6](books/combinatorics-1/C1.06-statistics-weighted-averages-and-geometric-probability.md) | Statistics, Weighted Averages and Geometric Probability | Proposed | 5 | S0 |  |
| [C1.7](books/combinatorics-1/C1.07-expected-value-and-simple-distributions.md) | Expected Value and Simple Distributions | Proposed | 6 | S0 | 1 second-pass extension |
| [C1.8](books/combinatorics-1/C1.08-paths-recursion-and-discrete-models.md) | Paths, Recursion and Discrete Models | Proposed | 5 | S0 |  |
| [C1.9](books/combinatorics-1/C1.09-integrated-counting-and-probability.md) | Integrated Counting and Probability | Proposed | 5 | S0 |  |
| [C1.10](books/combinatorics-1/C1.10-elementary-logic-deduction-and-constraints.md) | Elementary Logic, Deduction and Constraints | Proposed | 4 | S0 | Has a teaching sequence |

## Combinatorics & Probability II — Enumeration, Recurrences and Advanced Probability

[Volume file](books/combinatorics-2/README.md) · 11 chapters · 67 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [C2.1](books/combinatorics-2/C2.01-enumeration-basics.md) | Enumeration Basics | Year 2 L17 | 5 | S0 |  |
| [C2.2](books/combinatorics-2/C2.02-principle-of-inclusion-and-exclusion.md) | Principle of Inclusion and Exclusion | Year 2 L18 | 6 | S0 |  |
| [C2.3](books/combinatorics-2/C2.03-bijections-double-counting-and-binomial-structure.md) | Bijections, Double Counting and Binomial Structure | Proposed | 6 | S0 |  |
| [C2.4](books/combinatorics-2/C2.04-pigeonhole-extremal-reasoning-and-constructive-proof.md) | Pigeonhole, Extremal Reasoning and Constructive Proof | Proposed | 6 | S0 | Pilot D uses C2.4.6 |
| [C2.5](books/combinatorics-2/C2.05-counting-with-recurrence-relations.md) | Counting with Recurrence Relations | Year 2 L19 | 7 | S1 | Has a teaching sequence; Next pilot (roadmap Stage 2); [Packet](packets/C2.5.md) ready for review (2026-11-27) |
| [C2.6](books/combinatorics-2/C2.06-restricted-distributions-lattice-paths-and-catalan-structure.md) | Restricted Distributions, Lattice Paths and Catalan Structure | Proposed | 7 | S0 | 1 second-pass extension |
| [C2.7](books/combinatorics-2/C2.07-generating-functions-for-counting-and-recurrences.md) | Generating Functions for Counting and Recurrences | Proposed | 5 | S0 |  |
| [C2.8](books/combinatorics-2/C2.08-conditional-probability-and-probability-distributions.md) | Conditional Probability and Probability Distributions | Proposed | 6 | S0 | 1 second-pass extension |
| [C2.9](books/combinatorics-2/C2.09-expectations-indicators-and-random-processes.md) | Expectations, Indicators and Random Processes | Proposed | 6 | S0 | 1 second-pass extension |
| [C2.10](books/combinatorics-2/C2.10-graph-theory-and-discrete-networks.md) | Graph Theory and Discrete Networks | Proposed | 8 | S0 | 1 second-pass extension |
| [C2.11](books/combinatorics-2/C2.11-combinatorial-reasoning-and-synthesis.md) | Combinatorial Reasoning and Synthesis | Proposed | 5 | S0 |  |

## Combinatorics & Probability III — Advanced Combinatorial Problem Solving

[Volume file](books/combinatorics-3/README.md) · 11 chapters · 65 concept sections

| ID | Chapter | Basis | Sections | Stage | Notes |
|---|---|---|---:|---|---|
| [C3.1](books/combinatorics-3/C3.01-advanced-enumeration-and-multi-constraint-casework.md) | Advanced Enumeration and Multi-Constraint Casework | Proposed | 8 | S0 | 1 second-pass extension |
| [C3.2](books/combinatorics-3/C3.02-advanced-inclusion-exclusion-and-restricted-permutations.md) | Advanced Inclusion–Exclusion and Restricted Permutations | Proposed | 5 | S0 |  |
| [C3.3](books/combinatorics-3/C3.03-bijections-double-counting-and-combinatorial-identities.md) | Bijections, Double Counting and Combinatorial Identities | Proposed | 5 | S0 |  |
| [C3.4](books/combinatorics-3/C3.04-restricted-distributions-partitions-and-lattice-paths.md) | Restricted Distributions, Partitions and Lattice Paths | Proposed | 6 | S0 |  |
| [C3.5](books/combinatorics-3/C3.05-advanced-recurrences-state-models-and-transfer-matrices.md) | Advanced Recurrences, State Models and Transfer Matrices | Proposed | 7 | S0 | 1 second-pass extension; Audit refinement 8 |
| [C3.6](books/combinatorics-3/C3.06-advanced-generating-functions-and-coefficient-methods.md) | Advanced Generating Functions and Coefficient Methods | Proposed | 5 | S0 | Audit refinement 7 |
| [C3.7](books/combinatorics-3/C3.07-symmetry-burnsides-lemma-and-counting-up-to-equivalence.md) | Symmetry, Burnside’s Lemma and Counting up to Equivalence | Proposed | 5 | S0 |  |
| [C3.8](books/combinatorics-3/C3.08-advanced-graph-based-counting-and-discrete-structures.md) | Advanced Graph-Based Counting and Discrete Structures | Proposed | 6 | S2 (part) | Audit refinement 8; Pilot D (C3.8.5, C2.4.6) written |
| [C3.9](books/combinatorics-3/C3.09-advanced-conditional-probability-and-distributions.md) | Advanced Conditional Probability and Distributions | Proposed | 5 | S0 |  |
| [C3.10](books/combinatorics-3/C3.10-advanced-expectation-random-processes-and-games.md) | Advanced Expectation, Random Processes and Games | Proposed | 9 | S0 | Has a teaching sequence; 2 second-pass extensions |
| [C3.11](books/combinatorics-3/C3.11-combinatorial-synthesis-late-aime-and-beyond.md) | Combinatorial Synthesis: Late AIME and Beyond | Proposed | 4 | S0 |  |
