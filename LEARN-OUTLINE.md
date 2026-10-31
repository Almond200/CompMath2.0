# Learn: the outline of every book, chapter and lesson

This file is step L2 of `PLAN.md`: the contents of the Learn section, planned before anything is written or built (owner, 2026-10-31). The plan says what to do; this file says what each book holds. Nothing in it is in the app yet.

The map follows the owner's curriculum proposal, "An Expanded AMC-to-AIME Curriculum" (2026-10-31). That proposal grew the first draft (5 books, 6 + 4 chapter titles, one pilot) into 41 chapters with lesson-level syllabi. This file adds what the proposal left open: real card ids for every lesson, and contest problems for the pilot.

**Status (2026-10-31):**
- The chapter and lesson titles of all five books are drafted.
- Every lesson has a first pass of card ids (each id checked to exist; the cards nothing on the shelf places yet are listed in "Coverage" at the end).
- The pilot, N3 (cycles, exponentiation and order), has full lesson plans and candidate problems.
- N2 (linear congruences and CRT) has lesson plans and still needs problems.
- Every other chapter has titles and cards only.

## How to read this file

**Levels.** Each chapter is labelled with one of three levels:
- **Core:** the foundation an AIME student is expected to have. It is taught first and revisited in reviews.
- **Core II:** for the later or harder AIME problems. It is taught after the essentials.
- **Extension:** optional reference or challenge material. Nothing in Core depends on it.

Olympiad-tier cards that fit no chapter stay in the reference only. Olympiad books wait (LQ4).

**Cards.** An id in backticks is a real card (`#/f/<id>` opens it).
- A lesson's cards are the ones it teaches. A card may appear again later as a link, but each card is taught in one lesson.
- *(pattern)* marks a pattern card. "Prereq" names cards taught in an earlier chapter or book.
- A lesson with no card teaches a habit no card holds (B6.4, the comparison lessons). That is allowed, since lessons connect cards and never copy them.

**Problems.** Each problem's status follows the proposal's sequence: **candidate** (found by its tags), then **read** (its strategy read, and it fits), then **verified** (numbers rechecked and its place agreed), then **published**.
- Each problem has one **primary placement** (one lesson's problems or one chapter review). Other lessons may link to it, but only one lists it as an exercise. AMC 10/12 twins count as one problem.
- A problem whose route needs a later chapter is moved later, or marked as a challenge with the needed card linked.
- Fields kept for each problem once chosen: `primaryPlacement`, `relatedCards` (its tags), `requiredPrereqs`, `difficulty` (direct, intermediate or challenging; an editorial call, not an official ranking), `teachingPurpose`, `verificationStatus`.

**Numbers.** Every number in a worked example or a check has been computed (Python), unless it is marked otherwise.

## The lesson standard

Each lesson teaches one usable skill. It follows the template below; explanation and checks interleave, and there are no separate modes.
1. **Target and prerequisites.** Say what the lesson teaches and link the cards it assumes. An opening question is optional, and the lesson never needs an elaborate discovery story.
2. **Teach it directly.** Define the idea, state its hypotheses, show why it is useful, and derive only what helps understanding. Link the canonical card and never copy it.
3. **Direct example, then checks.** A worked example, including the clue that made the approach promising. Then 1 to 3 short checks, typed with the math keyboard and answered with one line of why (LQ5).
4. **Variations.** A condition that fails, a more efficient alternative route, and at least one use that is not obvious but can be taught.
5. **Lesson problems.** About 3 to 5 contest problems, rising from straightforward to AIME style. They come in an AoPS-style list, and Show Solution works only once something is written (LQ6).
6. **Summary.** The key conditions, the failure cases, and how this idea differs from the related ones.

A chapter ends with a **review** of about 8 to 12 problems that mix its lessons and earlier prerequisites, without saying which technique is intended. Pacing is flexible: these counts are targets, adjusted to how hard the skill is and how many verified problems exist.

## The shelf and its prerequisite spine

| Book | Role | Chapters |
|---|---|---|
| **AMC → AIME Bridge** | finds and fills missing foundations, without rewriting a whole AMC textbook | B1 to B6 |
| **AIME Algebra** | equations, polynomials, sequences, functions, inequalities, complex numbers and trig algebra | A1 to A9 |
| **AIME Number Theory** | prime exponents, congruences, exponent cycles, integer solutions, digits | N1 to N8 |
| **AIME Geometry** | triangles, circles, trig, coordinates, centers, transformations, polygons, solids | G1 to G9 |
| **AIME Counting & Probability** | counting structures, restrictions, recursion, probability, expectation | C1 to C9 |

A student need not finish the books in order. Any chapter can be entered once its prerequisites are known. Chapter order follows dependencies:
- **Book entry points:** B1 and B2 lead to A1 to A4; B5 leads to G1 to G4; B3 leads to N1 to N3; B4 leads to C1 to C3.
- **Number theory:** N2 (CRT) leads to N3 (cycles and order), which leads to N6.4 (repeating decimals). N1 and N2 lead to N4 (valuations).
- **Counting:** C1 and C2 lead to C3 and C4, then to C5 and C6, then to C7. A3's recurrences link to C5.
- **Across books:** A6 (the complex plane) links to G6 (transformations), and G3 (trig geometry) links to A7 (trig algebra).

**Threads that run across chapters.** These are taught where they naturally live, not as a separate book:

| Thread | Taught in |
|---|---|
| symmetry and invariants | A8, C5, C8, G7 |
| extremal arguments and bounds | A5, N5, C8 |
| choosing a representation (variables, coordinates, residues, complements) | A1, A2, G4, G6, N2 |
| restrictions and exact answers | B6 and every chapter review |
| complete and non-overlapping cases | C1, C3, N5, A1 |
| transfer without labels | every chapter review, and a review at the end of each book |

---

## Book: AMC → AIME Bridge

A short bridge that finds gaps and fills them with examples and checks, without becoming a duplicate AMC textbook. All six chapters are Core.

### B1. Algebra fluency and substitutions (Core)

| Lesson | Cards |
|---|---|
| B1.1 Expression manipulation: factoring, expanding, rationalizing, keeping the domain | `useful-factorizations`, `difference-of-squares`, `square-of-sum`, `rationalizing` |
| B1.2 Equations and systems: substitution, elimination, symmetry, extraneous roots | `linear-elimination`, `add-all-equations`, `transforming-equations` |
| B1.3 Useful substitutions: reciprocals, squares, sums and products, repeated blocks | `name-the-whole-expression`, `substitute-repeated-block`, *(pattern)* `repeated-block-equation` |
| B1.4 Absolute values, intervals, sign charts, inequality constraints | `absolute-value-rules`, `abs-value-relations`, `sign-chart`, `trivial-inequality` |
| B1.5 Rates, averages, percents and word-problem setups | `work-rates`, `time-per-leg`, `average-speed`, `relative-motion`, `averages-to-totals`, `weighted-average`, `mean-median-mode`, `percent-change`, `setting-up-proportions`, *(pattern)* `several-rates`, *(pattern)* `averages-before-after`, *(pattern)* `age-problems`, *(pattern)* `scoring-rules`, *(pattern)* `break-even-plans` |

### B2. Polynomial and sequence fundamentals (Core)

| Lesson | Cards |
|---|---|
| B2.1 Roots and factors; the remainder and factor theorems; synthetic division | `factor-remainder-theorem`, `polynomial-division`, `rational-root-theorem` |
| B2.2 Vieta and elementary symmetric sums | `quadratic-formula`, `vietas-quadratic`, `vietas-general`, `vertex-form` |
| B2.3 Arithmetic and geometric sequences, finite sums | `arithmetic-series`, `geometric-series`, `triangular-numbers`, `power-sums` |
| B2.4 Basic recurrences and tables of small cases | `first-order-recurrence`, *(pattern)* `periodic-sequences`, `organized-listing` |

### B3. Integer arithmetic and congruence fundamentals (Core)

| Lesson | Cards |
|---|---|
| B3.1 Prime powers, gcd and lcm, divisibility, counting divisors | `fundamental-theorem-arithmetic`, `euclidean-algorithm`, `divisibility-rules`, `number-of-divisors`, `recognition-numbers` |
| B3.2 Residues; negative residues and inverses by inspection | `modular-basics` |
| B3.3 Basic exponent cycles and last digits | `cycle-hunting`, `last-digit-patterns` |
| B3.4 Integer equations: parity, bounds, factoring into integers | `sfft`, `factor-pair-counting`, `only-even-prime` |

### B4. Counting and probability fundamentals (Core)

| Lesson | Cards |
|---|---|
| B4.1 Multiplication and addition principles, permutations, combinations | `permutations-combinations` |
| B4.2 Cases, complements, avoiding overcounts | `casework-method`, `complementary-counting` |
| B4.3 Arrangements with distinctness and repetition restrictions | `multiset-permutations`, `gap-method`, `counting-blocks` |
| B4.4 Probability from counting; elementary conditional probability | `basic-probability`, `independent-events`, `conditional-probability` |

### B5. Geometry fundamentals and coordinates (Core)

| Lesson | Cards |
|---|---|
| B5.1 Triangles: similarity, ratios, area, Pythagoras | `triangle-similarity`, `similar-figures-ratios`, `pythagorean-theorem`, `special-right-triangles`, `15-75-90-triangle`, `triangle-area-standard`, `triangle-inequality`, `triangle-congruence`, `parallel-exterior-angles`, `median-to-hypotenuse`, `right-triangle-inradius` |
| B5.2 Circle facts: inscribed angles, chords, tangents, power of a point | `inscribed-angle-theorem`, `circle-basics`, `tangent-facts`, `chord-length`, `power-of-a-point` |
| B5.3 Coordinates: slope, distance, lines, intersections | `distance-midpoint`, `line-forms`, `point-line-distance`, `circle-equation` |
| B5.4 The trig bridge: laws of sines and cosines, the sine area formula (for AMC 10 students) | `law-of-sines`, `law-of-cosines`, `trig-area` |

### B6. Constraints, computation and checking (Core; its habits recur in every review)

| Lesson | Cards |
|---|---|
| B6.1 Domain, positivity, integrality and distinctness through substitutions | prereq `transforming-equations`, `quadratic-root-location` |
| B6.2 Checking cases, degenerate figures, double counting | `directed-lengths`, prereq `organized-listing` |
| B6.3 Bounding and estimating first; small cases as a test | `estimating-answers`, `sqrt-approximation`, `disproof-by-counterexample` |
| B6.4 The AIME answer: exact arithmetic, 000 to 999, the final check | no card (a habit; prose and checks only) |

---

## Book: AIME Algebra

Nine chapters. The first draft named symmetric expressions, recurrences, root transformations, complex numbers and inequalities. The proposal adds equation solving, functions, logs, trig algebra, and a capstone for combining tools.

### A1. Equations, substitutions and systems (Core)

| Lesson | Cards |
|---|---|
| A1.1 Symmetric systems: $x + y$ and $xy$ | `symmetric-polynomial-strategies` |
| A1.2 Nested radicals, rational equations, keeping the domain | `denesting-radicals`, prereq `transforming-equations` |
| A1.3 Substitution patterns: $t = x + \frac1x$, quadratic forms, completing the square | `palindromic-polynomials`, `reciprocal-power-sums`, `completing-the-square` |
| A1.4 Cyclic systems and equations with several cases | `subtract-and-factor`, prereq `add-all-equations` |
| A1.5 Building and checking integer or positive solutions | `forced-difference-of-squares`, *(pattern)* `quadratic-perfect-square`, prereq `sfft` |

### A2. Polynomials and root expressions (Core)

| Lesson | Cards |
|---|---|
| A2.1 The factor and remainder theorems, and division, in contest settings | `polynomial-crt`, prereq `factor-remainder-theorem` |
| A2.2 Vieta; sums of powers of roots (Newton's sums) | `newtons-sums`, `products-over-roots` |
| A2.3 Symmetric polynomials and root constraints | `fundamental-theorem-symmetric`, `conjugate-root-theorems`, `descartes-rule-signs` |
| A2.4 Root transformations: reciprocal and shifted polynomials | `root-transformations` |
| A2.5 Interpolation and reading off coefficients | `lagrange-interpolation-formula`, `lagrange-interpolation`, `coefficient-extraction`, `comparing-coefficients` |

### A3. Sequences, recurrences and sums (Core)

| Lesson | Cards |
|---|---|
| A3.1 Linear recurrences and their starting values | `linear-recurrence`, `binets-formula` |
| A3.2 Telescoping sums and products; partial fractions | `telescoping`, `partial-fractions`, `factorial-telescoping`, `alternating-sum-grouping` |
| A3.3 Finite differences, double sums, from a pattern to a formula | `finite-differences`, `double-summation` |
| A3.4 Iteration and periodic sequences | *(pattern)* `infinite-nest`, prereq *(pattern)* `periodic-sequences` |
| A3.5 A closed form only when it helps | `arithmetico-geometric`, `largest-term-ratio` |

### A4. Functions, logs and exponentials (Core)

| Lesson | Cards |
|---|---|
| A4.1 Composition, inverses, symmetry of a function | `inverse-function-properties`, `odd-even-functions`, `function-symmetry-equation`, `fx-pairing` |
| A4.2 Piecewise and absolute-value functions, floors and ceilings | `floor-basics`, `name-the-floor`, `group-equal-floors`, *(pattern)* `floor-equation`, *(pattern)* `floor-sum-range`, `abs-value-graphing` |
| A4.3 Exponential equations; logarithm laws and domains | `log-rules`, `change-of-base`, `exponent-laws`, `take-logs-linearize`, `log-substitution`, *(pattern)* `log-system` |
| A4.4 Functional identities of contest length | `functional-substitution`, *(pattern)* `defined-operation` |
| A4.5 Graphs, monotonicity, and the number of solutions | `piecewise-graph-counting`, *(pattern)* `reading-graphs` |

### A5. Inequalities and bounds (Core)

| Lesson | Cards |
|---|---|
| A5.1 AM-GM and its equality case | `am-gm`, `max-product-fixed-sum`, `mean-chain` |
| A5.2 Cauchy-Schwarz and elementary quadratic forms | `cauchy-schwarz`, `quadratic-forms` |
| A5.3 Squares, rearrangement, elementary estimates | `rearrangement`, `sos-identity`, `abs-triangle-inequality` |
| A5.4 Maximum and minimum with domain and discrete constraints | `median-minimizes-abs`, `slope-to-a-point`, `placing-digits-extremes`, `derivative-extremum`, prereq `vertex-form` |
| A5.5 When a bound is sharp enough | `power-mean-inequality`, `jensens-inequality`, `bernoulli-inequality`, `weighted-am-gm` |

### A6. Complex numbers and roots of unity (Core II)

| Lesson | Cards |
|---|---|
| A6.1 Complex arithmetic, conjugates, modulus, argument | `complex-basics`, `conjugate-both-sides`, *(pattern)* `complex-modulus-argument` |
| A6.2 The plane: rotations and loci | `eulers-formula`, `polar-form`, `de-moivre` |
| A6.3 Roots of unity and finite geometric sums | `roots-of-unity`, `roots-of-unity-filter`, `trig-series-complex` |
| A6.4 Polynomial roots with complex numbers | `fundamental-theorem-algebra`, `roots-unity-distance-product` |

### A7. Trigonometric algebra (Core II; links to G3)

| Lesson | Cards |
|---|---|
| A7.1 The unit circle and angle relations | `pythagorean-identities`, `common-angle-values`, `special-trig-values`, `reduction-identities` |
| A7.2 Addition, double angle and other standard transformations | `angle-addition`, `double-angle`, `half-angle`, `triple-angle`, `product-sum`, `harmonic-addition` |
| A7.3 Trig equations with a bounded solution set | `inverse-trig-identities` (a possible gap: no card gives the full solution set of $\sin\theta = \sin\alpha$; see "Coverage") |
| A7.4 Between algebra and trig: substitutions, telescoping trig sums | `trig-substitution`, `arctan-telescoping`, `sin-cos-ap-sum`, `cot-tan-telescoping`, `trig-telescoping-product` |

### A8. Algebraic structure and synthesis (Core II; a capstone)

| Lesson | Cards |
|---|---|
| A8.1 Symmetry, cyclic expressions, clever rearrangements | `wlog-symmetry`, `sum-zero-identities`, `cubes-minus-3abc`, `antisymmetric-factorization`, `pairwise-sum-product` |
| A8.2 Integer and parity restrictions inside algebraic equations | `an-minus-bn`, `sophie-germain`, `brahmagupta-fibonacci` |
| A8.3 Parameters, and telling possible roots apart | prereq `quadratic-root-location`, prereq `comparing-coefficients` |
| A8.4 Mixed problems that need two or more earlier topics | no new card (a review lesson) |

### A9. Algebra extensions (Extension)

| Lesson | Cards |
|---|---|
| A9.1 More interpolation and finite differences | `higher-power-sums`, `integer-valued-polynomials`, `generalized-binomial-series` |
| A9.2 Nonstandard functional equations | `cauchy-functional-equations`, `injectivity-surjectivity` |
| A9.3 Higher-order recurrences, matrices and determinants | `matrix-multiplication`, `matrix-power-diagonalizing`, `determinant-basics`, `cramers-rule`, `matrix-inverse`, `chebyshev-polynomials` |
| A9.4 Inequalities and substitutions beyond routine AIME | `nesbitt-inequality`, `tangent-line-trick`, `normalization`, `weierstrass-substitution`, `even-power-sin-cos-sums`, `evenly-spaced-angle-products` |

---

## Book: AIME Number Theory

Eight chapters. The changes from the first draft are three:
- Full CRT is taught in N2, before the exponent cycles of N3.
- Valuations come before the rarer lifting techniques.
- Hensel lifting, Lucas and higher residue theory are Extension material until a coverage audit shows they are needed more widely.

### N1. Prime factorization and divisors (Core)

| Lesson | Cards |
|---|---|
| N1.1 Prime exponent bookkeeping; gcd and lcm | `exponent-tracking`, `gcd-lcm-product`, `lcm-common-multiples`, `gcd-substitution` |
| N1.2 The number, sum and product of divisors | `sum-of-divisors`, `product-of-divisors`, `multiplicative-functions`, prereq `number-of-divisors` |
| N1.3 Divisors with square, parity or residue conditions | `perfect-square-divisors`, `largest-odd-divisor-sum`, `sigma-parity` |
| N1.4 Factor pairs, and counting pairs by lcm and gcd | `lcm-pair-counting`, prereq `factor-pair-counting` |
| N1.5 Prime exponents with counting | `floor-multiples`, `coprime-residue-sum`, `consecutive-coprime` |

### N2. Linear congruences and CRT (Core)

**Goal:** solve any linear congruence, or show it has no solution, and join congruences with the Chinese Remainder Theorem. N3 builds on it.

| Lesson | Cards |
|---|---|
| N2.1 Congruence rules, inverses, and when you may cancel | `modular-inverse`, `euclids-lemma`, prereq `modular-basics` |
| N2.2 Linear congruences, and when they have solutions | `subtract-equal-remainders`, `reduce-divisibility-constant`, *(pattern)* `poly-divisible-linear` |
| N2.3 The extended Euclidean algorithm and Bézout | `extended-euclidean-algorithm`, `bezouts-identity` |
| N2.4 The Chinese Remainder Theorem, for coprime moduli | `crt` |
| N2.5 Compatible congruences with moduli that share factors; counting solutions | `crt-solution-counting` |

**Opening questions and checks (computed):**
- **N2.1:** solve $7x \equiv 3 \pmod{10}$. The inverse of $7$ is $3$, so $x \equiv 9$.
- **N2.4:** find $x \equiv 1 \pmod 4$, $x \equiv 4 \pmod{25}$. Answer: $x = 29$. This example comes back in N3.5.

**Problems:**
- Candidates for N2.4 and N2.5 from the `crt` tags: 1993 AIME #6, 2011 AIME II #14, 2012 AIME II #12, 2013 AIME I #11, 2014 AIME I #8, 2017 AIME I #9, 2026 AIME I #8. All are candidates, still to read.
- N2.1 to N2.3 still need problems.

### N3. Cycles, exponentiation and order (Core): the pilot

**Goal:** choose well among a direct cycle, Fermat's Little Theorem, the multiplicative order, Euler's theorem, and splitting the modulus with CRT.

**What it assumes:** N2 (`crt`, `modular-inverse`), and `gcd-lcm-product` for the lcm of two periods.

**Changes from the first draft (the proposal's repairs):**
- CRT is now taught in N2, and Euler's theorem gets a lesson of its own.
- N3.1 separates eventual periodicity from a cycle that starts at the first power.
- Problems that need later topics (lifting, digits, recurrences) moved to later chapters.
- The comparison lesson became a worked comparison with mixed problems.

**2018 AIME I #11:** the proposal flagged its annotation for a recheck. The reading is right: the order of $3$ is $5$ modulo $121$ and $39$ modulo $169$ (computed). The wording is now explicit about which number is the base.

#### N3.1 Powers modulo $n$: direct cycles and eventual periodicity

- **Opening question:** what is the units digit of $7^{202}$? The powers of $7$ mod $10$ run $7, 9, 3, 1$ and then repeat, and $202 = 4\cdot50 + 2$, so the digit is $9$.
- **Teach:** there are only finitely many residues, so the powers must repeat. When the base is coprime to the modulus, the cycle starts at the first power. When it is not, the powers settle into a cycle only after a few steps: $2^n \bmod 12$ runs $2, 4, 8, 4, 8, \ldots$ (eventual period $2$).
- **Cards:** `cycle-hunting` (Finding the Period, first met in B3.3), and `last-digit-patterns` as a link.
- **Clue:** a huge exponent and a small modulus.
- **Checks:**
  - the units digit of $7^{203}$ is $3$;
  - $2^n \bmod 7$ runs $2, 4, 1$, so $2^{100} \equiv 2 \pmod 7$;
  - $2^{10} \bmod 12$ is $4$ (non-coprime: the cycle $4, 8$ starts at $n = 2$).
- **Problems:**
  - 2003 AMC 10A #16, the units digit of $13^{2003}$ (candidate);
  - 2017 AIME I #3 (read: the units digits of triangular numbers repeat with period $20$).
- **Moved:** 2025 AMC 12B #9 (the tens digit of $6^{6^6}$) works modulo $100$ with a base not coprime to it, so it moves to N3.5 (candidate).

#### N3.2 Fermat's Little Theorem: prime modulus and coprimality

- **Opening question:** what is $2^{1000} \bmod 13$? Fermat gives $2^{12} \equiv 1$, $1000 = 12 \cdot 83 + 4$, and $2^4 = 16 \equiv 3$.
- **Teach:** a prime modulus guarantees a period of $p - 1$, but only for a base coprime to $p$. Show a misuse: $13^{1000} \bmod 13$ is $0$, not $1$.
- **Cards:** `fermats-little-theorem`.
- **Checks:**
  - $5^{1000} \equiv 1 \pmod{13}$, since $5^4 \equiv 1$ and $4 \mid 1000$;
  - say why Fermat does not apply to $26^{100} \bmod 13$.
- **Problems:**
  - 2017 AMC 10B #14 (candidate);
  - 1989 AIME #9 (read: $n^5 \equiv n \pmod 5$, with CRT from N2 and a size bound);
  - 2002 AIME I #7 (read: $10^6 \equiv 1 \pmod 7$; it also needs the generalized binomial expansion that its statement gives, so it is marked a challenge).

#### N3.3 Multiplicative order and the divisibility of periods

- **Opening question:** what is $3^{202} \bmod 13$? Fermat promises period $12$, but $3^3 = 27 \equiv 1$, so the period is $3$, and $202 = 3 \cdot 67 + 1$ gives $3$.
- **Teach:** the smallest period is the order, and it divides every exponent that gives $1$, including $p - 1$. So only the divisors of $p - 1$ need checking.
- **Cards:** `multiplicative-order`.
- **Checks:**
  - the order of $3$ mod $13$ is $3$, and the order of $2$ mod $13$ is $12$;
  - the order of $10$ mod $101$ is $4$, since $10^2 \equiv -1$.
- **Problems:**
  - 2018 AMC 10B #13 (read: the order of $10$ mod $101$; choice C, $505$);
  - 2019 AIME I #14 (read: an order of exactly $16$ forces $p \equiv 1 \pmod{16}$; answer $97$).
- **Moved:** 2016 AMC 12B #22 goes to N6.4, where repeating decimals are taught.

#### N3.4 Euler's theorem and the totient function

- **Opening question:** what is $3^{2026} \bmod 100$? $\varphi(100) = 40$ gives $3^{40} \equiv 1$. The order is in fact $20$, and $2026 \equiv 6 \pmod{20}$, so $3^6 = 729$ gives $29$.
- **Teach:** Euler's theorem extends Fermat to any modulus coprime to the base. Compute $\varphi$ from the factorization. Euler's period is guaranteed, like Fermat's, but it need not be the smallest (link to N3.3).
- **Cards:** `eulers-theorem`, `eulers-totient`, `carmichael-function` (a link, for the smallest universal period).
- **Checks:**
  - $\varphi(100) = 40$;
  - $\varphi(1000) = 400$;
  - $7^{2026} \bmod 100$ is $49$ (the order of $7$ is $4$).
- **Problems:**
  - 2024 AMC 10B #18, with its twin 2024 AMC 12B #14 (candidate).

#### N3.5 Orders with CRT; bases not coprime to the modulus

- **Opening question:** what is $2^{2026} \bmod 100$? Euler does not apply, because $2$ shares a factor with $100$. Split the modulus:
  - $2^{2026} \equiv 0 \pmod 4$;
  - the order of $2$ mod $25$ is $20$, so $2^{2026} \equiv 2^6 \equiv 14 \pmod{25}$;
  - CRT gives $64$.
- **Teach:** a worked comparison of the cues:

  | Cue | Route |
  |---|---|
  | a small modulus | list the powers |
  | a prime modulus | Fermat |
  | a power that returns to $1$ early | the order |
  | a composite modulus coprime to the base | Euler |
  | a factorable modulus, or a base sharing a factor with it | split with CRT, then join |

  Then mixed problems.
- **Cards:** no new card; links to all of the above and to `crt`.
- **Checks:**
  - solve $3^{2026}$ modulo $4$ and modulo $25$ separately ($1$ and $4$), and join them to get $29$;
  - for three short prompts, name the route before computing.
- **Problems:**
  - 2011 AIME I #11 (read: the order of $2$ mod $125$ is $100$, joined by CRT with mod $8$; answer $7$);
  - 2018 AIME I #11 (read: the order of $3$ is $5$ mod $121$ and $39$ mod $169$, joined by lcm; answer $195$);
  - 2025 AMC 12B #9 (candidate).

#### N3 chapter review (to fill to 8 to 12)

| Problem | Status | What it needs |
|---|---|---|
| 2021 AIME II #13 | read | $1000 = 8 \cdot 125$, the order of $2$ mod $125$ |
| 2021 AIME I #14 | read | Fermat and a primitive root; $n = \operatorname{lcm}(42, 43, 46, 47)$; `primitive-roots` is linked as a challenge, since it is N8 |
| 2016 AMC 12B #25 | read | the order of $2$ mod $19$ is $18$; a challenge, needing `linear-recurrence` (A3.1) |
| 2015 AMC 12A #22 | candidate | recursion, a cycle and CRT |
| 2025 AIME II #13 | candidate | — |

**Moved out of N3:**
- 2020 AIME I #12 needs LTE, so it goes to N4.4.
- 2024 AIME I #13 needs Hensel lifting, so it goes to N8.2.
- 2023 AIME II #15 needs inverses and binary expansions, so it goes to the N6 review.

**Still to do for the pilot:**
- read every candidate;
- fill the review;
- check that the prerequisites cover every step of every chosen problem.

### N4. Valuations and factorial divisibility (Core II)

| Lesson | Cards |
|---|---|
| N4.1 $v_p(n)$, the exponent of a prime in an integer | `p-adic-valuation` |
| N4.2 Legendre's formula, trailing zeros, factoring out factorials | `legendres-formula`, `trailing-zeros`, `factor-out-factorial`, `consecutive-product-factorial` |
| N4.3 When a prime divides a binomial coefficient | `prime-divides-binomial` |
| N4.4 Lifting the Exponent: the common cases and their hypotheses | `lte-lemma`, `lte` (problem: 2020 AIME I #12, moved here from N3; read) |
| N4.5 Valuations with bounds on integer solutions | `gcd-power-minus-one`, `power-minus-self` |

### N5. Diophantine equations and constraints (Core)

| Lesson | Cards |
|---|---|
| N5.1 Linear integer equations: gcd conditions, parametrizing, Frobenius | `chicken-mcnugget`, *(pattern)* `coins-and-prices` |
| N5.2 Factoring, and differences of squares | `difference-of-squares-rep`, prereq `sfft`, prereq `forced-difference-of-squares` |
| N5.3 Parity, modular obstructions, inequalities | `choose-modulus`, `primes-6k`, prereq `only-even-prime` |
| N5.4 Pythagorean triples and integer triangles | `pythagorean-triples`, `integer-triangles-perimeter`, `sum-of-two-squares`, `lattice-points-circle` |
| N5.5 Bounds, monotonicity, finite searches | `bounding-diophantine`, `squeeze-between-squares` |

### N6. Bases, digits and decimals (Core; N6.4 comes after N3)

| Lesson | Cards |
|---|---|
| N6.1 Base representation; a numeral as a polynomial | `base-conversion`, `numeral-as-polynomial` |
| N6.2 Equations in an unknown base; bounds on digits | *(pattern)* `unknown-base`, `digit-count` |
| N6.3 Last digits, digit sums, carrying | `digit-sum-carries`, *(pattern)* `digit-manipulation`, `base10-curiosities` |
| N6.4 Repeating decimals and the order of 10 | `repeating-decimals`, `terminating-decimals` (problem: 2016 AMC 12B #22, moved from N3; read) |
| N6.5 Concatenation, palindromes, digit restrictions | *(pattern)* `palindromes`, *(pattern)* `cryptarithms`, *(pattern)* `calendar-problems` |

### N7. Residue patterns and special constraints (Core II)

| Lesson | Cards |
|---|---|
| N7.1 Quadratic residues by small-modulus tests | `squares-mod-small`, `eulers-criterion` |
| N7.2 Squares, fourth powers and parity patterns mod $n$ | `freshmans-dream`, prereq `last-digit-patterns` |
| N7.3 Orders, divisor conditions, restrictions on primes | `wilsons-theorem`, prereq `multiplicative-order` |
| N7.4 Integer sequences and periodicity mod $n$ | `pisano-periods` |

### N8. Number theory extensions (Extension; never a prerequisite in the core sequence)

| Lesson | Cards |
|---|---|
| N8.1 Lucas's theorem and binomial residues | `lucas-theorem`, `kummers-theorem`, `pascal-parity` |
| N8.2 Hensel lifting for prime powers | `hensel-lifting`, `lagrange-roots-mod-p` (problem: 2024 AIME I #13, moved from N3; read) |
| N8.3 Primitive roots and higher order structure | `primitive-roots`, `quadratic-reciprocity` |
| N8.4 Diophantine methods beyond elementary AIME | `pell-equation`, `binary-quadratic-forms`, `sum-of-three-squares`, `gaussian-integers`, `zeckendorf-theorem`, `mobius-inversion`, `bertrands-postulate`, `farey-sequences` |

---

## Book: AIME Geometry

Nine chapters. The proposal separates the main AIME toolkits, so a student learns them in a reliable order rather than as a grab bag of theorems.

### G1. Triangle ratios, similarity and area (Core)

| Lesson | Cards |
|---|---|
| G1.1 Similar triangles and ratio chasing | `parallel-line-similarity`, `midsegment-theorem`, `intercept-theorem`, *(pattern)* `nested-similar` |
| G1.2 Area ratios: same altitude, cevians | `same-base-area-ratio`, `shared-angle-area-ratio`, `cevian-area-ratio`, `area-method` |
| G1.3 Stewart's theorem, angle bisectors, medians | `stewarts-theorem`, `angle-bisector-theorem`, `angle-bisector-length`, `apollonius-theorem`, `centroid-division` |
| G1.4 Mass points as a ratio tool | `mass-points`, `cevian-ratio-sum`, `rouths-theorem` |
| G1.5 Similarity and area in nested figures | `altitude-hypotenuse`, *(pattern)* `right-triangle-altitude`, `extend-sides-to-meet`, `median-doubling` |

### G2. Circles and cyclic figures (Core)

| Lesson | Cards |
|---|---|
| G2.1 Cyclic quadrilaterals, inscribed angles, angle chasing | `angle-chasing`, `cyclic-opposite-angles`, `cyclic-equal-angles`, `concyclicity-tests`, `angle-chord-secant`, `tangent-chord-angle`, *(pattern)* `cyclic-quadrilateral` |
| G2.2 Power of a point, tangent and secant, intersecting chords | `radical-axis`, `thales-theorem`, prereq `power-of-a-point` |
| G2.3 Ptolemy and chord lengths | `ptolemys-theorem`, `equal-chords-arcs`, `brahmaguptas-formula` |
| G2.4 Incircles, excircles, tangent lengths | `incircle-tangent-lengths`, `incircle-excircle-touch`, `inradius-area`, `exradii`, `pitots-theorem` |
| G2.5 Circles that meet or touch | `tangent-circles`, `two-tangents-angle`, *(pattern)* `rolling-without-slipping`, `common-tangent-lengths`, `triangle-of-centers`, `common-chord-length`, `descartes-circle-theorem`, *(pattern)* `tangency-condition`, *(pattern)* `tangent-circle-packing` |

### G3. Trigonometric geometry (Core; AMC 10 students take B5.4 first)

| Lesson | Cards |
|---|---|
| G3.1 Laws of sines and cosines, area formulas | `law-cosines-60-120`, `law-of-cosines-special-triangles`, `herons-formula`, `triangle-13-14-15`, prereq `law-of-cosines` |
| G3.2 The extended law of sines and the circumradius | `circumradius-area`, `trig-area-circumradius` |
| G3.3 Trig identities inside triangles | `projection-formula`, `triangle-half-angle-identities`, `ratio-lemma`, `triangle-angle-identities` |
| G3.4 Angles and lengths from trig constraints | `trig-bash`, `altitude-bisector-angle` |
| G3.5 When trig beats coordinates or similarity | no new card (a comparison lesson) |

### G4. Coordinate and analytic geometry (Core)

| Lesson | Cards |
|---|---|
| G4.1 Choosing good coordinates | `coordinate-bash` |
| G4.2 Lines, circles, intersections, distances, slopes | `angle-between-lines`, `section-formula`, `parallel-lines-distance`, `incenter-coordinates`, `tangency-equation`, `tangent-lines-from-point`, `angle-bisectors-of-lines` |
| G4.3 Areas from coordinates; determinants | `shoelace-formula`, `determinant-geometric` |
| G4.4 Parabolas and conics at the level of their equations | `conic-sections`, `parabola-focus-directrix`, `ellipse-properties`, `hyperbola-properties`, `conic-tangent-lines`, `eccentricity` |
| G4.5 Loci and optimization in coordinates | `perpendicular-bisector-locus`, `apollonius-circle`, `bisector-closer-region` |

### G5. Triangle centers and special figures (Core II)

| Lesson | Cards |
|---|---|
| G5.1 The incenter, excenters, angle-bisector geometry | `incenter-excenter-lemma`, `perp-to-angle-bisector`, `triangle-center-angles`, *(pattern)* `angle-bisector-circumcircle` |
| G5.2 Circumcenter, orthocenter, centroid | `orthocenter-properties`, `euler-line-ratio`, `nine-point-circle`, `euler-distance-theorem` |
| G5.3 Altitudes, medians, the medial and orthic triangles | `medial-triangle`, `orthic-triangle`, `median-triangle-area`, `vivianis-theorem` |
| G5.4 Ceva and Menelaus as working tools | `cevas-theorem`, `menelaus-theorem`, `trig-ceva` |
| G5.5 Recognizing common triangle figures | *(pattern)* `point-in-equilateral`, *(pattern)* `circle-in-angle`, `fermat-point`, `symmedian-lemoine`, `simson-line` |

### G6. Transformations and vectors (Core II; links to A6)

| Lesson | Cards |
|---|---|
| G6.1 Reflections, rotations, translations | `reflection-coordinates`, `reflection-composition`, `rotation-90`, `rotation-reflection-matrices`, `composing-transformations`, `rotated-line-angle` |
| G6.2 Transformations with complex numbers or coordinates | `complex-bash`, `rotation-trick`, `rotation-center`, `spiral-similarity` |
| G6.3 Vectors: addition, dot products, projections | `vector-dot-product`, `vector-projection`, `vector-bash`, `closing-polygon-vectors` |
| G6.4 A transformation for shortest paths and repeated shapes | `reflect-across-the-line`, `homothety-monge`, `axis-stretch-area`, `linear-change-of-variables`, *(pattern)* `folded-paper` |

### G7. Polygons, regular figures and grids (Core)

| Lesson | Cards |
|---|---|
| G7.1 Regular polygons: chords, diagonals, angles | `polygon-angle-sums`, `regular-polygon-area`, `regular-hexagon-area`, `regular-octagon`, `regular-dodecagon`, `equilateral-triangle-facts`, `golden-ratio-pentagon`, *(pattern)* `equiangular-polygon` |
| G7.2 Cutting polygons into pieces | `area-by-pieces`, `trapezoid-parallelogram-areas`, `parallelogram-area`, `quadrilateral-diagonal-area`, `trapezoid-special-segments`, `varignons-theorem`, `circular-segment`, `inscribed-square`, `diagonal-angle-from-sides`, *(pattern)* `isosceles-trapezoid`, *(pattern)* `tethered-animal` |
| G7.3 Symmetry and rotational structure | `figure-symmetries`, `fit-copies`, *(pattern)* `square-crossing-segments` |
| G7.4 Lattices, grids, unit geometry | `picks-theorem`, `lattice-points-gcd`, `british-flag-theorem` |
| G7.5 Counting intersections, regions and pieces | `plane-regions`, `moser-circle`, `handshakes-diagonals`, `steiner-neighborhood`, *(pattern)* `counting-shapes`, *(pattern)* `zonogon-minkowski` |

### G8. Three-dimensional geometry (Core II)

| Lesson | Cards |
|---|---|
| G8.1 Prisms, pyramids, cones, spheres | `prism-pyramid-volumes`, `cone-formulas`, `sphere-formulas`, `frustum-volume`, `cube`, `space-diagonal`, `regular-tetrahedron`, `regular-octahedron`, *(pattern)* `painted-cubes` |
| G8.2 Cross-sections and similar solids | `cross-section-method`, `plane-cross-section`, `scale-one-level`, `cavalieris-principle` |
| G8.3 Distances and angles between lines and planes | `dihedral-angle`, `point-plane-distance`, `skew-lines-distance`, `projected-area-cosine` |
| G8.4 Coordinates in space | `distance-3d`, `plane-intercept-form`, `cross-product-area` |
| G8.5 Solids inside and around solids | `insphere-radius`, `spheres-two-planes`, `box-tetrahedron`, `isosceles-tetrahedron`, *(pattern)* `equal-edge-tetrahedron`, `unfold-the-surface`, `cube-nets`, `eulers-polyhedron-formula` |

### G9. Geometry extensions (Extension)

| Lesson | Cards |
|---|---|
| G9.1 Barycentric coordinates and more complex-plane geometry | `barycentric-coordinates`, `affine-transformations` |
| G9.2 Inversion and spiral similarity | `inversion-facts`, `inversion-properties` |
| G9.3 More relations between triangle centers | `euler-line-parallel-side`, `exradii` link, `anticomplementary-triangle`, `contact-triangle`, `incircle-excircle-homothety` |
| G9.4 Projective tools | `harmonic-quadrilateral`, `cross-ratio` |

---

## Book: AIME Counting & Probability

Nine chapters. The proposal names inclusion-exclusion, symmetry, binomial identities, conditioning, expected value, graphs, and geometric counting explicitly.

### C1. Systematic counting and cases (Core)

| Lesson | Cards |
|---|---|
| C1.1 Sum and product rules; building disjoint cases | `constructive-counting`, prereq `casework-method` |
| C1.2 Counting the complement | prereq `complementary-counting` (deepened) |
| C1.3 Counting by an organizing parameter | `double-summation` link, `counting-functions` |
| C1.4 Overlapping cases and double counts | `uniform-overcount` |
| C1.5 Small cases to check completeness | `simulate-the-process`, `working-backwards` |

### C2. Arrangements and selections (Core)

| Lesson | Cards |
|---|---|
| C2.1 Permutations, combinations, repeated objects | prereq `multiset-permutations` |
| C2.2 Circular arrangements and symmetry | `circular-permutations`, `necklace-formula` |
| C2.3 Adjacency and spacing restrictions | `non-adjacent-selection`, *(pattern)* `restricted-sequences`, prereq `gap-method` |
| C2.4 Stars and bars, with upper and lower bounds | `stars-and-bars`, `stars-bars-upper-bound`, `balls-boxes-table` |
| C2.5 Choosing positions versus assigning values | `surjections`, `stirling-bell`, `fencepost-counting` |

### C3. Inclusion-exclusion and complements (Core)

| Lesson | Cards |
|---|---|
| C3.1 Inclusion-exclusion with two and three sets | `inclusion-exclusion`, `pie` |
| C3.2 Derangements and forbidden positions | `derangements` |
| C3.3 At least, at most, exactly | *(pattern)* `subset-avoiding-relation`, `subset-sum-facts` |
| C3.4 When a complement beats casework | no new card (a comparison lesson) |

### C4. Bijections, symmetry and double counting (Core)

| Lesson | Cards |
|---|---|
| C4.1 Designing bijections | `bijection-method`, `catalan-numbers`, `ballot-problem`, `reflection-principle` |
| C4.2 Double counting and incidences | `double-counting`, `committee-chair`, `nested-subset-pairs` |
| C4.3 Using symmetry safely | `symmetry-probability`, `burnsides-lemma` (the proposal lists Burnside as Extension; the card is AMC tier and high importance, so it stays Core, to be confirmed by the audit) |
| C4.4 Binomial coefficients and their identities | `pascals-identity`, `binomial-row-sums`, `hockey-stick`, `vandermonde`, `squared-binomial-sum`, `multinomial-theorem`, `binomial-theorem` |

### C5. Recursion, states and processes (Core; links to A3)

| Lesson | Cards |
|---|---|
| C5.1 Choosing states for a counting recursion | `recursive-counting` |
| C5.2 Linear recurrences from arrangements and paths | *(pattern)* `tiling-a-board` |
| C5.3 Transitions, boundary cases, small tables | `grid-path-fill`, `backward-induction` |
| C5.4 Invariants and parity in finite processes | `invariants-coloring`, `monovariant` |
| C5.5 Grid paths and restricted walks | `grid-paths` |

### C6. Probability through counting (Core)

| Lesson | Cards |
|---|---|
| C6.1 Building the sample space; equally likely outcomes | *(pattern)* `drawing-without-replacement`, prereq `basic-probability` |
| C6.2 Conditional probability; updating the sample space | `bayes-theorem`, prereq `conditional-probability` |
| C6.3 Independence, dependence, sampling without replacement | `hypergeometric`, `binomial-probability` |
| C6.4 Complements and inclusion-exclusion for probability | no new card (links C3) |
| C6.5 Probability in arrangements and regions | `geometric-probability` |

### C7. Expected value and random processes (Core II)

| Lesson | Cards |
|---|---|
| C7.1 Linearity of expectation with indicators | `expected-value`, `indicator-variables` |
| C7.2 Expected counts and contributions | `expected-fixed-points`, `tail-sum-expectation` |
| C7.3 Conditional expectation in a small process | `total-expectation`, `states-recursion-prob` |
| C7.4 Waiting times and recursive expectations | `geometric-distribution`, `gamblers-ruin`, `turn-based-games` |

### C8. Graphs, grids and combinatorial structures (Core II)

| Lesson | Cards |
|---|---|
| C8.1 The handshake lemma and degree counting | `handshake-lemma`, `tree-basics`, `eulerian-paths`, *(pattern)* `round-robin-tournaments` |
| C8.2 Counting cells and shapes on grids | `rectangles-in-grid` |
| C8.3 Coloring and parity | `coloring-arguments`, `graph-coloring` |
| C8.4 Extremal arguments and pigeonhole | `pigeonhole`, `pigeonhole-argument`, `extremal-principle`, `pairing-to-bound` |

### C9. Counting and probability extensions (Extension)

| Lesson | Cards |
|---|---|
| C9.1 Generating functions for simple coefficient counts | `generating-function-method`, `partitions` |
| C9.2 More symmetry: Burnside in depth, cycle structure | `permutation-cycle-structure` |
| C9.3 Geometric probability beyond simple regions | `product-of-uniforms`, `order-statistics`, `variance-independence` |
| C9.4 More recursions and random processes; games | `transfer-matrix-method`, `strategy-stealing`, *(pattern)* `truth-tellers-logic`, *(pattern)* `magic-squares` |

---

## Coverage

**The proposal's audit (step L2, after the map is approved):**
1. Take a spread of past AIME I and II papers and AMC 12 sets.
2. For each problem, record its subject, main technique, other techniques, prerequisites and difficulty.
3. Give it a lesson or a chapter review, or mark it as a coverage gap.
4. Sort the uncovered techniques:
   - common and foundational: a new Core lesson;
   - occasional but transferable: Core II;
   - very specialized: Extension, or the reference only.
5. Check that every lesson has a direct example, a variation, and enough real problems.

The database's tags make the first half computable, since every problem already lists its cards. `node tools/learn-coverage.js` does three things:
- checks that every id in this file is a real card;
- checks that no card is taught in two lessons;
- counts the problems whose cited cards are all placed somewhere on the shelf.

**First run (2026-10-31), after placing the cards it found missing:**

| Contest | Problems with every cited card placed | Of problems citing a card |
|---|---|---|
| AIME | 1,047 | 1,064 |
| AMC 12 | 1,195 | 1,209 |
| AMC 10 | 1,187 | 1,202 |

552 of the 765 cards are placed.

That first run found AMC word-problem cards (proportions, averages, percents, ages) and some basic geometry facts that the proposal's titles had missed, and they are now placed (B1.5, B5.1 and others). The cards still unplaced are cited by one or two problems each, or are olympiad tools (`contrapositive`, `minkowski-inequality`). Each will be placed when its problem is given a lesson or a review, or left in the reference. The tags only show that a lesson exists for each card. Whether the lesson teaches the problem's step is checked by reading, in the audit.

**Possible gaps found while mapping.** These are not yet in `QUESTIONS.md`. They go there as P-candidates only if the audit shows contest problems need them.
- A7.3: the full solution set of a trig equation such as $\sin\theta = \sin\alpha$ (already recorded as an open candidate in CONTRIBUTING's gap register).
- B6.4: the AIME answer habits (exact arithmetic, 000 to 999). This is lesson prose, not a card.
