# Learn: the outline of every book, chapter and lesson

This file says what each Learn book holds: its chapters, its lessons, and the cards each lesson teaches. `PLAN.md` says what to do next, and CONVENTIONS §14 says how a lesson and a chapter are written. `tools/build-learn-shelf.py` builds the app's shelf (`js/data/learn/shelf.js`) from the "Book:" sections below, so they always match the app.

The map follows the owner's curriculum proposal, "An Expanded AMC-to-AIME Curriculum" (2026-10-31), which grew the first draft into chapters with lesson-level syllabi; this file added real card ids for every lesson.

**Status (2026-10-31, end of the seventeenth chat):**
- Every book in a "Book:" section below is written in the app: the four AIME books and the Bridge (the AIME track), and the four AMC books (the AMC track).
- Every chapter of AIME Counting & Probability (C1 to C9), AIME Number Theory (N1 to N8), A1 and A2 are in the approved chapter structure (X.1 Introduction, the lessons, a Summary, Review Problems, Challenge Problems; CONVENTIONS §14). The others keep their overview page and chapter review until they are reworked.
- "The AMC books, second plan" is planned, not built: it will replace the four AMC books and the Bridge.

## How to read this file

**Levels.** Each chapter is labelled with one of three levels (the second plan labels every lesson too):
- **Core:** the foundation. In the AIME books, what the early AIME problems need; in the AMC books, the early to middle problems.
- **Core II:** in the AIME books, the later AIME problems; in the AMC books, the hard problems. A high score needs both.
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

**Numbers.** Every number in a worked example or a problem has been computed (Python), unless it is marked otherwise.

## The lesson standard

The full rules are in CONVENTIONS §14; in short:
1. **The cards first.** A lesson opens with the cards it teaches and the cards it assumes, each a link.
2. **One flowing explanation,** with no subheadings: define the idea, state its conditions, show why it is useful, work an example that includes the clue that made the approach promising, then a variation or a condition that fails. Link the canonical card and never copy it.
3. **Related cards,** each with one line on how it connects.
4. **The lesson's own problems,** with full worked solutions further down the page.
5. **Exercises:** contest problems, about 3 to 5, rising in difficulty, in the AoPS-style list where Show Solution works only once something is written (LQ6).

A chapter follows the approved chapter structure: X.1 Introduction (a short overview of the chapter's ideas, with comprehension problems), the lessons, a Summary with Problem Solving Strategies, then Review Problems (mostly comprehension, our own first) and Challenge Problems (harder, contest problems first). Every list of problems runs from easiest to hardest. A chapter not yet reworked ends with a chapter review of about 8 to 12 mixed problems.

## The shelf and its prerequisite spine

| Book | Role | Chapters |
|---|---|---|
| **AMC Algebra** | algebra for the AMC 10 and 12: equations, functions, polynomials, sequences, inequalities, logarithms, trigonometry, complex numbers | L1 to L8 |
| **AMC Number Theory** | number theory for the AMC 10 and 12: primes, divisors, digits, remainders, integer equations | M1 to M3 |
| **AMC Counting & Probability** | counting, probability and expected value for the AMC 10 and 12 | R1 to R3 |
| **AMC Geometry** | geometry for the AMC 10 and 12: triangles, circles, polygons, coordinates, trigonometry, conics and solids | S1 to S4 |
| **AMC → AIME Bridge** | finds and fills missing foundations, without rewriting a whole AMC textbook | B1 to B6 |
| **AIME Algebra** | equations, polynomials, sequences, functions, inequalities, complex numbers and trig algebra | A1 to A9 |
| **AIME Number Theory** | prime exponents, congruences, exponent cycles, integer solutions, digits | N1 to N8 |
| **AIME Geometry** | triangles, circles, trig, coordinates, centers, transformations, polygons, solids | G1 to G9 |
| **AIME Counting & Probability** | counting structures, restrictions, recursion, probability, expectation | C1 to C9 |

A student need not finish the books in order. Any chapter can be entered once its prerequisites are known. Chapter order follows dependencies:
- **Book entry points:** B1 and B2 lead to A1 to A4; B5 leads to G1 to G4; B3 leads to N1 to N3; B4 leads to C1 to C3.
- **Number theory:** N2 (CRT) leads to N3 (cycles and order), which leads to N6.5 (repeating decimals). N1 and N2 lead to N4 (valuations).
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

## The AMC books, second plan (to replace the four AMC books and the Bridge)

**Status (2026-10-31):** planned, not built. Every chapter is to be written in the approved chapter structure (CONVENTIONS §14): X.1 Introduction, the lessons, a Summary with Problem Solving Strategies, then Review Problems and Challenge Problems; so each chapter below gains an Introduction before its first lesson and a Summary after its last, and its lesson numbers shift by one when it is built. It replaces the sections "Book: AMC Algebra" to "Book: AMC → AIME Bridge" below, which describe what is in the app now. The owner asked for the Bridge to be merged into the four AMC books, and for each book to run from the foundations to higher-level applications, so that a student who understands little can start on page one. The books are planned fresh, not to keep the lessons already written: nearly every AMC and Bridge lesson will be rewritten.

### How the books are built

**Four parts in every book.** Each book runs from zero to AIME-ready in four parts, shown as headings on its contents page. There are no AMC 10 or AMC 12 labels: most ideas serve both contests, and even the topics usually thought of as AMC 12 topics often solve AMC 10 problems (owner, 2026-10-31).
- **Foundations:** for a student who has seen little of the subject. Every word is defined at first use, a small numerical example comes before every general rule, and the easiest problems come first (AMC 8 and the early AMC 10 problems).
- **Core topics:** the subject as the AMC tests it.
- **Advanced topics:** the further tools the harder AMC problems use.
- **Toward the AIME:** no new cards. It holds the Bridge's checking habits, then harder mixed problems (late AMC 12 and early AIME) whose technique is not named.

**Importance on every chapter and every lesson.** Chapters and lessons both carry one of the three tags, the only labels the AMC books use, so a niche lesson can sit inside the chapter it belongs to. In the AMC books, as the book page explains them:
- **Core:** the early to middle problems.
- **Core II:** the hard problems.
- **Extension:** optional; nothing later depends on it.

(Internally, Core is about problems 1 to 20 of an AMC and Core II about the last five; the app never says so.) Every chapter in Foundations, Core topics and Toward the AIME is Core. An Advanced topics chapter is Core when at least half of its lessons are, and Core II otherwise. A lesson's first tag comes from the number of AMC 10 and 12 problems whose tags use its cards (at least 8 is Core, 3 to 7 is Core II, fewer is Extension; twins count once). The tag is then adjusted by judgment where the count misleads: the basic ideas (a square is never negative, substitution, recursion, grid paths) are Core, and the niche ones (Farey fractions, the contrapositive, triangle centers) are Extension. The AIME books' lessons get the same tags, at first equal to their chapter's tag.

**Where the Bridge goes.** Every Bridge lesson has a new home, so the Bridge book is removed:

| Bridge | New home |
|---|---|
| B1 Algebra fluency and substitutions | L1, L2, L4.3, L5.1; `useful-factorizations` in L10.5 |
| B2 Polynomial and sequence fundamentals | L3, L6, L7, L10.1 |
| B3 Integer arithmetic and congruence fundamentals | M1, M4.1, M4.2, M5.3 |
| B4 Counting and probability fundamentals | R1, R2, R3 |
| B5 Geometry fundamentals and coordinates | S1, S2.4, S3, S5, S7.1, S4.5 (its trigonometry for AMC 10 students) |
| B6 Constraints, computation and checking | L2.1, L8.5, L14, M7, R10, S12 |

**Problems.** Each lesson gets 3 to 5 contest problems in rising difficulty, and each chapter a review of about 8 to 12, chosen by the twin-safe picker:
- Foundations: AMC 8 and AJHSME (742 of their 1000 problems are tagged), then AMC 10 problems 1 to 10.
- Core topics: AMC 10 and AMC 12 problems 5 to 20.
- Advanced topics: AMC 10 and AMC 12 problems 15 to 25.
- Toward the AIME: the late AMC 12 problems and AIME problems 1 to 8.

The "AMC problems" column below counts the AMC 10 and 12 problems tagged with a lesson's cards: the pool to choose from, not a quota. A lesson with fewer than 3 gets exercises written for it.

**Tracks.** The four AMC books stay one track and the AIME books another (CONVENTIONS §14). The AIME books' cards assumed from the Bridge are now taught in the AMC books, so a student enters the AIME books after the AMC books. A later pass could make the AIME books stop re-teaching AMC cards and merge the two tracks into one path; it is not part of this plan.

**Implementation, in order:**
1. **Tooling, one commit:**
   - `tools/build-learn-shelf.py` reads the part headings, a lesson's importance column, and chapter numbers of two digits (L10 to L14, R10, S10 to S12).
   - `shelf.js` gains the part on each chapter and the importance on each lesson.
   - `tools/check-learn.js` accepts the parts.
   - On the contents page, a book shows its part headings and a tag on every lesson. The book page's legend explains the tags.
2. **Write the books in turn: Algebra, Number Theory, Counting & Probability, Geometry.** For each book:
   - Move its plan from this section into the book's own section of the outline.
   - Delete its old chapter files.
   - Write it chapter by chapter. Unwritten lessons show as not yet written, as they did when the books were first built.
   - Run the gates and ship it after every chapter.
3. **Remove the Bridge** when the last book has replaced it: its section, its files, its id in `IDS` and its cover.
4. **Update CONVENTIONS §14** (the parts, the tags, the Foundations standard), the PLAN and the README.

**Left out on purpose.** Cards that one or two AMC problems use, but whose home is the AIME books or the reference only:
- `parking-functions`, `determinant-basics`, `brahmagupta-fibonacci`, `corner-circle-chain`, `ptolemys-inequality`, `ptolemy-equilateral`
- `conic-classification`, `rotated-line-angle`, `lcm-pair-counting`, `lucas-theorem`, `lattice-points-circle`, `pisano-periods`
- `vector-bash`, `derivative-extremum`, `hensel-lifting`, `lte`
- `eigenvalues-characteristic`, `cyclotomic-polynomials`, `continued-fraction-convergents`, `hook-length-formula`, `induction` (Olympiad tier)

Every AMC-tier card has a home in this plan, and no card is taught twice within it.

### The plan

#### Book: AMC Algebra

From the first rules of algebra to the logarithms, polynomials, trigonometry and complex numbers of the AMC 12, ending with the habits the AIME asks for.

##### Part: Foundations

**L1. Expressions and exponents** · Core. What a variable stands for, how expressions are built and rewritten, and the exponent and factoring rules everything later uses.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L1.1 Variables, expressions and translating words into symbols | Core | no card (a habit lesson: order of operations, like terms, writing a sentence as an equation) | mixed |
| L1.2 Exponents and radicals | Core | `exponent-laws`, `rationalizing` | 34 |
| L1.3 Expanding and factoring | Core | `square-of-sum`, `difference-of-squares`, `completing-the-square` | 58 |
| L1.4 Ratios, proportions and percents | Core | `setting-up-proportions`, `proportion-properties`, `percent-change` | 44 |

**L2. Equations and word problems** · Core. Solving one equation and checking the answer, solving systems, and turning a story into equations.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L2.1 Solving an equation and checking the answer | Core | `transforming-equations` (keeps the Bridge's habit: extraneous roots and the domain) | 3 |
| L2.2 Systems of linear equations | Core | `linear-elimination`, `add-all-equations`, `assume-all-one-kind` | 50 |
| L2.3 Rates and work | Core | `work-rates`, `time-per-leg`, `average-speed`, `relative-motion`, *(pattern)* `several-rates` | 39 |
| L2.4 Averages | Core | `averages-to-totals`, `weighted-average`, `mean-median-mode`, *(pattern)* `averages-before-after` | 69 |
| L2.5 Setting up a story | Core | *(pattern)* `age-problems`, *(pattern)* `scoring-rules`, *(pattern)* `break-even-plans`, `round-up-whole-items` | 13 |

##### Part: Core topics

**L3. Quadratics** · Core. The quadratic formula, Vieta's relations and the vertex, the first tools that work on whole families of equations.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L3.1 Solving quadratics | Core | `quadratic-formula`, *(pattern)* `quadratic-perfect-square` | 20 |
| L3.2 Vieta: the sum and product of the roots | Core | `vietas-quadratic`, `symmetric-polynomial-strategies` | 34 |
| L3.3 The vertex and where the roots lie | Core | `vertex-form`, `quadratic-forms`, `quadratic-root-location` | 10 |

**L4. Functions, graphs, absolute values and floors** · Core. Functions as rules, reading and counting with graphs, and the two piecewise functions the AMC loves.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L4.1 Functions and defined operations | Core | *(pattern)* `defined-operation`, `inverse-function-properties`, `odd-even-functions` | 29 |
| L4.2 Reading graphs and slopes | Core II | *(pattern)* `reading-graphs`, `slope-to-a-point` | 1 |
| L4.3 Absolute value | Core | `absolute-value-rules`, `abs-value-relations`, `absolute-value-identities`, `sign-chart`, `abs-value-graphing` | 36 |
| L4.4 Counting solutions with a graph | Core II | `piecewise-graph-counting` | 6 |
| L4.5 Floors and ceilings | Core | `floor-basics`, `name-the-floor`, `group-equal-floors`, *(pattern)* `floor-equation`, *(pattern)* `floor-sum-range` | 18 |

**L5. Substitutions and symmetric expressions** · Core. Seeing a repeated block as one unknown, and working with sums and products instead of the variables themselves.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L5.1 Naming the whole expression | Core | `name-the-whole-expression`, `substitute-repeated-block`, *(pattern)* `repeated-block-equation`, *(pattern)* `infinite-nest` | 3 |
| L5.2 Symmetric sums and factoring tricks | Extension | `sum-zero-identities`, `pairwise-sum-product`, `an-minus-bn`, `subtract-and-factor` | 2 |

**L6. Sequences and series** · Core. Arithmetic and geometric sequences, sequences defined step by step, and sums that collapse.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L6.1 Arithmetic sequences and triangular numbers | Core | `arithmetic-series`, `triangular-numbers` | 75 |
| L6.2 Geometric sequences and power sums | Core | `geometric-series`, `power-sums` | 39 |
| L6.3 Recursive and periodic sequences | Core | `first-order-recurrence`, *(pattern)* `periodic-sequences` | 20 |
| L6.4 Telescoping and clever sums | Core | `telescoping`, `partial-fractions`, `factorial-telescoping`, `alternating-sum-grouping` | 16 |

**L7. Polynomials** · Core. Dividing polynomials, the remainder theorem, rational roots and reading coefficients.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L7.1 Division and the remainder theorem | Core | `polynomial-division`, `factor-remainder-theorem` | 11 |
| L7.2 Rational roots and coefficients | Core | `rational-root-theorem`, `comparing-coefficients`, `coefficient-extraction` | 16 |

**L8. Inequalities, extremes and estimates** · Core. Largest and smallest values, from squares being nonnegative to AM-GM, and estimating to rule answers out.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L8.1 A square is never negative | Core | `trivial-inequality`, `sos-identity` | 2 |
| L8.2 AM-GM and fixed sums | Core | `am-gm`, `max-product-fixed-sum` | 9 |
| L8.3 Distances on the number line | Core II | `abs-triangle-inequality`, `median-minimizes-abs` | 3 |
| L8.4 Extremes by arrangement | Core II | `placing-digits-extremes`, `rearrangement` | 6 |
| L8.5 Estimating and checking | Core | `estimating-answers`, `sqrt-approximation`, `disproof-by-counterexample` | 10 |

##### Part: Advanced topics

**L9. Logarithms and exponential equations** · Core. The logarithm laws and the equations they solve.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L9.1 Logarithm laws and change of base | Core | `log-rules`, `change-of-base` | 54 |
| L9.2 Logarithmic and exponential equations | Core | `take-logs-linearize`, `log-substitution`, *(pattern)* `log-system` | 3 |

**L10. Polynomials for the AMC 12** · Core II. Vieta for any degree, roots and their transformations, interpolation, radicals and the factorizations worth knowing.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L10.1 Vieta for any degree and power sums of roots | Core | `vietas-general`, `newtons-sums` | 23 |
| L10.2 Conjugate roots and transformed roots | Core | `conjugate-root-theorems`, `root-transformations` | 9 |
| L10.3 Remainders and interpolation | Extension | `polynomial-crt`, `lagrange-interpolation` | 2 |
| L10.4 Radicals and reciprocal substitutions | Core II | `denesting-radicals`, `palindromic-polynomials`, `reciprocal-power-sums`, `forced-difference-of-squares` | 5 |
| L10.5 Factorizations worth knowing | Core II | `cubes-minus-3abc`, `sophie-germain`, `useful-factorizations` | 3 |

**L11. Functional equations, recurrences and inequalities** · Core II. Substituting into functional equations, linear recurrences, double sums, and the AMC 12 inequalities.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L11.1 Functional equations by substitution | Core | `functional-substitution`, `fx-pairing`, `function-symmetry-equation` | 10 |
| L11.2 Linear recurrences | Core II | `linear-recurrence`, `binets-formula` | 3 |
| L11.3 Finite differences and double sums | Core II | `finite-differences`, `double-summation`, `arithmetico-geometric`, `largest-term-ratio` | 4 |
| L11.4 The mean inequalities and Cauchy-Schwarz | Core II | `mean-chain`, `cauchy-schwarz` | 3 |

**L12. Trigonometry** · Core II. Exact values, the identities, and turning sums into products.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L12.1 Special values and the identities | Core | `special-trig-values`, `angle-addition`, `double-angle`, `half-angle`, `triple-angle` | 24 |
| L12.2 Sums, products and telescoping | Core II | `product-sum`, `trig-telescoping-product` | 3 |
| L12.3 Combining waves and inverse functions | Core II | `harmonic-addition`, `inverse-trig-identities` | 4 |

**L13. Complex numbers** · Core. Complex arithmetic, polar form and De Moivre, and roots of unity.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L13.1 Complex arithmetic and the modulus | Core | `complex-basics`, `conjugate-both-sides`, *(pattern)* `complex-modulus-argument` | 25 |
| L13.2 Polar form and De Moivre | Core | `eulers-formula`, `polar-form`, `de-moivre` | 10 |
| L13.3 Roots of unity | Core | `roots-of-unity`, `fundamental-theorem-algebra`, `roots-of-unity-filter` | 22 |

##### Part: Toward the AIME

**L14. From the AMC to the AIME: algebra** · Core. No new cards: the Bridge's habits, applied to harder mixed problems whose technique is not named.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| L14.1 Domain, positivity and integrality through a substitution | Core | no card (prereq transforming-equations, quadratic-root-location) | mixed |
| L14.2 The AIME answer: exact arithmetic, 000 to 999, the final check | Core | no card (a habit lesson) | mixed |
| L14.3 Mixed problems across the book | Core | no card (a review lesson with late-AMC 12 and early-AIME problems) | mixed |

#### Book: AMC Number Theory

From primes and divisibility to remainders, integer equations and the AMC 12's exponents and orders, ending with mixed AIME-style problems.

##### Part: Foundations

**M1. Primes, divisibility, gcd and lcm** · Core. Breaking a number into primes, testing divisibility, and the gcd and lcm.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| M1.1 Primes and prime factorization | Core | `fundamental-theorem-arithmetic`, `only-even-prime`, `recognition-numbers` | 38 |
| M1.2 Divisibility rules | Core | `divisibility-rules`, `digit-sum-carries` | 20 |
| M1.3 The gcd and the lcm | Core | `euclidean-algorithm`, `gcd-lcm-product`, `lcm-common-multiples` | 11 |
| M1.4 Counting multiples and calendars | Core | `floor-multiples`, *(pattern)* `calendar-problems` | 21 |

**M2. Digits, bases and decimals** · Core. A number as a sum of place values, in base ten and other bases, and fractions as decimals.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| M2.1 Place value and digits | Core | `numeral-as-polynomial`, *(pattern)* `digit-manipulation`, `digit-count` | 24 |
| M2.2 Digit puzzles | Core | *(pattern)* `palindromes`, *(pattern)* `cryptarithms`, `base10-curiosities` | 11 |
| M2.3 Other bases | Core | `base-conversion`, *(pattern)* `unknown-base` | 18 |
| M2.4 Repeating and terminating decimals | Core | `repeating-decimals`, `terminating-decimals` | 9 |
| M2.5 Fractions between two fractions | Extension | `farey-sequences` | 3 |

##### Part: Core topics

**M3. Divisors and factorials** · Core. Counting, summing and multiplying divisors, and the primes inside a factorial.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| M3.1 Counting divisors | Core | `number-of-divisors`, `perfect-square-divisors` | 25 |
| M3.2 Summing and multiplying divisors | Core II | `sum-of-divisors`, `product-of-divisors` | 6 |
| M3.3 Primes in a factorial and trailing zeros | Core | `legendres-formula`, `trailing-zeros` | 14 |
| M3.4 Consecutive numbers and gcd tricks | Core | `factor-out-factorial`, `consecutive-product-factorial`, `consecutive-coprime`, `gcd-substitution` | 13 |

**M4. Remainders** · Core. Modular arithmetic from its rules to Fermat and Euler.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| M4.1 Working with remainders | Core | `modular-basics`, `euclids-lemma`, `subtract-equal-remainders` (keeps the Bridge's negative residues and inverses by inspection) | 34 |
| M4.2 Cycles and last digits | Core | `cycle-hunting`, `last-digit-patterns` | 15 |
| M4.3 Squares and choosing a modulus | Core II | `squares-mod-small`, `choose-modulus`, `primes-6k` | 2 |
| M4.4 Fermat's little theorem and Euler's totient | Core II | `fermats-little-theorem`, `eulers-totient` | 3 |
| M4.5 When one expression divides another | Extension | `reduce-divisibility-constant`, *(pattern)* `poly-divisible-linear` | 1 |

**M5. Integer equations** · Core. Equations whose answers must be whole numbers: linear ones, coins, factoring and bounds.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| M5.1 Linear equations in integers and the Chinese remainder theorem | Core | `bezouts-identity`, `crt` | 9 |
| M5.2 Coins and stamps | Core II | `chicken-mcnugget`, *(pattern)* `coins-and-prices` | 6 |
| M5.3 Factoring into integers | Core | `sfft`, `factor-pair-counting`, `difference-of-squares-rep` | 33 |
| M5.4 Pythagorean triples and integer triangles | Core II | `pythagorean-triples`, `integer-triangles-perimeter` | 6 |
| M5.5 Bounding | Core II | `bounding-diophantine`, `squeeze-between-squares` | 6 |

##### Part: Advanced topics

**M6. Number theory for the AMC 12** · Core II. Prime exponents, inverses, Euler's and Wilson's theorems, orders and Pell equations.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| M6.1 Prime exponents and multiplicative functions | Core | `exponent-tracking`, `p-adic-valuation`, `power-minus-self`, `multiplicative-functions` | 8 |
| M6.2 Inverses and the theorems of Euler and Wilson | Core II | `modular-inverse`, `eulers-theorem`, `wilsons-theorem` | 6 |
| M6.3 The order of a number | Extension | `multiplicative-order` | 3 |
| M6.4 Pell equations | Extension | `pell-equation` | 2 |

##### Part: Toward the AIME

**M7. From the AMC to the AIME: number theory** · Core. No new cards: residues, cycles and integer equations together, in harder mixed problems.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| M7.1 Residues and cycles together | Core | no card (prereq modular-basics, cycle-hunting, crt) | mixed |
| M7.2 Integer equations by factoring and bounds | Core | no card (prereq sfft, bounding-diophantine) | mixed |
| M7.3 Mixed problems across the book | Core | no card (a review lesson) | mixed |

#### Book: AMC Counting & Probability

From listing and multiplying to arrangements, distributions, recursion and probability, ending with the AMC 12 additions and mixed AIME-style problems.

##### Part: Foundations

**R1. Counting from scratch** · Core. Listing carefully, the multiplication and addition principles, permutations and combinations, cases and complements.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R1.1 Making a list and the fencepost | Core | `organized-listing`, `fencepost-counting` | 18 |
| R1.2 The multiplication and addition principles | Core | `constructive-counting`, `counting-functions` | 38 |
| R1.3 Permutations and combinations | Core | `permutations-combinations`, `committee-chair` | 13 |
| R1.4 Casework and complements | Core | `casework-method`, `complementary-counting`, `elimination-counting` | 162 |

**R2. Probability from scratch** · Core. Probability as a ratio of counts, independent events, and the average outcome.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R2.1 Probability by counting | Core | `basic-probability`, `symmetry-probability` | 40 |
| R2.2 Several draws and independent events | Core | *(pattern)* `drawing-without-replacement`, `independent-events` | 15 |
| R2.3 Expected value | Core | `expected-value` | 7 |

##### Part: Core topics

**R3. Arrangements** · Core. Arrangements with repeats, restrictions, circles and derangements, and fixing overcounts.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R3.1 Arranging letters with repeats | Core | `multiset-permutations` | 12 |
| R3.2 Gaps, blocks and non-adjacent choices | Core | `gap-method`, `counting-blocks`, `non-adjacent-selection` | 8 |
| R3.3 Circles and derangements | Core II | `circular-permutations`, `derangements` | 3 |
| R3.4 Inclusion-exclusion and overcounting | Core | `inclusion-exclusion`, `pie`, `uniform-overcount`, `double-counting` | 32 |

**R4. Distributions and binomial coefficients** · Core. Putting objects into boxes, Pascal's triangle and the binomial theorem, and counting one set by matching it with another.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R4.1 Stars and bars | Core | `stars-and-bars`, `balls-boxes-table`, `partitions` | 13 |
| R4.2 Pascal's triangle | Core II | `pascals-identity`, `binomial-row-sums`, `hockey-stick` | 6 |
| R4.3 The binomial theorem | Core | `binomial-theorem` | 9 |
| R4.4 Bijections | Core II | `bijection-method` | 6 |

**R5. Recursion, paths and processes** · Core. Counting by building from smaller cases, lattice paths, and processes run backward or simulated.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R5.1 Recursion and tilings | Core | `recursive-counting`, *(pattern)* `tiling-a-board` | 6 |
| R5.2 Paths in a grid | Core | `grid-paths`, `grid-path-fill` | 5 |
| R5.3 Working backward and simulating | Core | `working-backwards`, `backward-induction`, `simulate-the-process` | 22 |
| R5.4 The reflection principle | Extension | `reflection-principle` | 1 |

**R6. Probability for the AMC 10** · Core. Conditional probability, repeated trials, probability as area, and linearity of expectation.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R6.1 Conditional probability | Core | `conditional-probability`, `hypergeometric` | 12 |
| R6.2 Repeated trials | Core | `binomial-probability` | 9 |
| R6.3 Probability as length and area | Core | `geometric-probability` | 31 |
| R6.4 Linearity of expectation | Core II | `indicator-variables` | 1 |

**R7. Sets, graphs and logic** · Core. Subsets, graphs, pigeonhole, colorings and logic puzzles.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R7.1 Subsets | Extension | *(pattern)* `subset-avoiding-relation`, `subset-sum-facts`, `odd-part-chains` | 2 |
| R7.2 Graphs | Core | `handshake-lemma`, `eulerian-paths`, *(pattern)* `round-robin-tournaments`, `disconnected-graph-edges` | 9 |
| R7.3 Pigeonhole and extremes | Core | `pigeonhole`, `pairing-to-bound`, `extremal-principle` | 15 |
| R7.4 Colorings and invariants | Core | `coloring-arguments`, `invariants-coloring` | 12 |
| R7.5 Logic puzzles and cases | Core | *(pattern)* `truth-tellers-logic`, *(pattern)* `magic-squares`, `proof-by-cases`, `wlog-symmetry` | 24 |
| R7.6 Proof by contrapositive | Extension | `contrapositive` | 3 |

##### Part: Advanced topics

**R8. Counting for the AMC 12** · Core II. Upper bounds, symmetry, more binomial identities, and games.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R8.1 Upper bounds and counting up to symmetry | Core II | `stars-bars-upper-bound`, `burnsides-lemma` | 7 |
| R8.2 More binomial identities | Core II | `vandermonde`, `multinomial-theorem`, `generating-function-method` | 7 |
| R8.3 Graph coloring and games | Core II | `graph-coloring`, `strategy-stealing`, `turn-based-games`, `sprague-grundy` | 5 |

**R9. Probability for the AMC 12** · Core II. Bayes' theorem, states and waiting times, and continuous probability.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R9.1 Bayes' theorem | Extension | `bayes-theorem` | 1 |
| R9.2 States and waiting times | Core | `states-recursion-prob`, `geometric-distribution` | 14 |
| R9.3 Continuous probability | Extension | `product-of-uniforms` | 1 |

##### Part: Toward the AIME

**R10. From the AMC to the AIME: counting and probability** · Core. No new cards: checking cases and overcounts, small cases as a test, and harder mixed problems.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| R10.1 Checking cases and double counting | Core | no card (prereq casework-method, organized-listing) | mixed |
| R10.2 Small cases as a test | Core | no card (prereq recursive-counting) | mixed |
| R10.3 Mixed problems across the book | Core | no card (a review lesson) | mixed |

#### Book: AMC Geometry

From angles, triangles and areas to circles, coordinates, solids and the AMC 12's trigonometry, conics and vectors, ending with mixed AIME-style problems.

##### Part: Foundations

**S1. Angles, triangles and area** · Core. Angles at parallel lines, what makes a triangle, its area, and Pythagoras.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S1.1 Angles and parallel lines | Core | `parallel-exterior-angles`, `parallel-by-angle-sum`, `angle-chasing`, `clock-angle`, `trapezoid-consecutive-angles` | 12 |
| S1.2 Triangles and congruence | Core | `triangle-inequality`, `triangle-type-by-sides`, `triangle-congruence` | 18 |
| S1.3 Area and perimeter | Core | `triangle-area-standard`, `area-by-pieces`, `joined-shapes-perimeter` | 25 |
| S1.4 The Pythagorean theorem | Core | `pythagorean-theorem`, `shared-leg-pythagoras`, `special-right-triangles` | 115 |

**S2. Quadrilaterals, circles and coordinates: the basics** · Core. Angle sums, quadrilateral areas, the circle's measurements, and points on a grid.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S2.1 Angles in polygons | Core | `polygon-angle-sums`, *(pattern)* `equiangular-polygon` | 7 |
| S2.2 Quadrilateral areas | Core | `parallelogram-area`, `trapezoid-parallelogram-areas`, `quadrilateral-diagonal-area`, `parallelogram-vertices` | 20 |
| S2.3 Circles: circumference, area and sectors | Core | `circle-basics`, `circular-segment`, *(pattern)* `tethered-animal` | 70 |
| S2.4 Points, distances and lines | Core | `distance-midpoint`, `line-forms` | 23 |

##### Part: Core topics

**S3. Similar triangles and area ratios** · Core. Similarity, parallel lines, ratios of areas, and mass points.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S3.1 Similar triangles | Core | `triangle-similarity`, `similar-figures-ratios` | 69 |
| S3.2 Parallel lines and midsegments | Core | `parallel-line-similarity`, `midsegment-theorem`, `intercept-theorem`, *(pattern)* `nested-similar` | 10 |
| S3.3 Ratios of areas | Core | `same-base-area-ratio`, `shared-angle-area-ratio`, `cevian-area-ratio`, `incenter-area-split` | 11 |
| S3.4 Angle bisectors, medians and mass points | Core | `angle-bisector-theorem`, `centroid-division`, `mass-points` | 20 |

**S4. Right, equilateral and general triangles** · Core. Constructions in right triangles, equilateral triangles, Heron's formula and the law of cosines.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S4.1 More right-triangle facts | Core | `15-75-90-triangle`, `median-to-hypotenuse`, `right-triangle-inradius` | 8 |
| S4.2 Constructions in right triangles | Core | `altitude-hypotenuse`, *(pattern)* `right-triangle-altitude`, `extend-sides-to-meet`, `median-doubling` | 14 |
| S4.3 Equilateral triangles and inscribed squares | Core | `equilateral-triangle-facts`, *(pattern)* `point-in-equilateral`, `inscribed-square` | 34 |
| S4.4 Heron's formula and the inradius | Core | `herons-formula`, `triangle-13-14-15`, `inradius-area`, `max-rectangle-in-triangle` | 12 |
| S4.5 The law of cosines and the sine area formula | Core | `law-of-cosines`, `law-cosines-60-120`, `law-of-cosines-special-triangles`, `trig-area` | 46 |

**S5. Circles** · Core. Chords, inscribed angles, tangents, power of a point and circles that touch.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S5.1 Chords and arcs | Core | `chord-length`, `equal-chords-arcs` | 25 |
| S5.2 Inscribed angles and cyclic quadrilaterals | Core | `inscribed-angle-theorem`, `thales-theorem`, `cyclic-opposite-angles`, `cyclic-equal-angles`, *(pattern)* `cyclic-quadrilateral` | 30 |
| S5.3 Tangents and angles outside the circle | Core | `tangent-facts`, `two-tangents-angle`, `angle-chord-secant`, `tangent-chord-angle` | 26 |
| S5.4 Power of a point | Core | `power-of-a-point`, `common-chord-length`, `radical-axis` | 9 |
| S5.5 Incircles and touching circles | Core | `incircle-tangent-lengths`, `tangent-circles`, `triangle-of-centers`, *(pattern)* `tangent-circle-packing`, *(pattern)* `circle-in-angle`, *(pattern)* `rolling-without-slipping`, `triangle-center-angles` | 41 |

**S6. Polygons and counting in figures** · Core. Regular polygons, trapezoids, and counting the shapes in a figure.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S6.1 Regular polygons | Core | `regular-polygon-area`, `regular-hexagon-area`, `regular-octagon`, `regular-dodecagon`, `golden-ratio-pentagon` | 28 |
| S6.2 Trapezoids | Core II | `trapezoid-special-segments`, *(pattern)* `isosceles-trapezoid` | 5 |
| S6.3 Counting in figures | Core | `plane-regions`, `handshakes-diagonals`, *(pattern)* `counting-shapes`, *(pattern)* `zonogon-minkowski`, `rectangles-in-grid` | 13 |

**S7. Coordinates and transformations** · Core. Lines, circles and areas in coordinates, and reflections and rotations.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S7.1 Lines and distances | Core | `section-formula`, `angle-between-lines`, `parallel-lines-distance`, `point-line-distance` | 16 |
| S7.2 Circles and loci | Core | `circle-equation`, `tangent-lines-from-point`, `angle-bisectors-of-lines`, `perpendicular-bisector-locus`, `bisector-closer-region` | 17 |
| S7.3 Areas and lattice points | Core | `shoelace-formula`, `picks-theorem`, `coordinate-bash` | 43 |
| S7.4 Reflections and rotations | Core | `reflection-coordinates`, `rotation-90`, `composing-transformations`, `reflect-across-the-line`, *(pattern)* `folded-paper` | 27 |
| S7.5 Symmetry and fitting copies | Core | `figure-symmetries`, `fit-copies` | 8 |

**S8. Solids** · Core. Volumes and surfaces, cubes, polyhedra, and unfolding or slicing a solid.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S8.1 Volume and surface area | Core | `prism-pyramid-volumes`, `cone-formulas`, `sphere-formulas`, `cavalieris-principle` | 32 |
| S8.2 Cubes | Core | `cube`, `space-diagonal`, *(pattern)* `painted-cubes`, `cube-stack-views`, `cube-nets`, `scale-one-level` | 19 |
| S8.3 Polyhedra | Core II | `regular-octahedron`, `dodecahedron-icosahedron`, `eulers-polyhedron-formula` | 5 |
| S8.4 Unfolding and cross sections | Core | `unfold-the-surface`, `cross-section-method` | 8 |

##### Part: Advanced topics

**S9. Triangles and circles for the AMC 12** · Core. The law of sines, cevians, cyclic and tangential quadrilaterals, and circles that touch.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S9.1 The law of sines and trigonometry in triangles | Core | `law-of-sines`, `circumradius-area`, `projection-formula`, `pythagorean-identities`, `common-angle-values`, `reduction-identities` | 20 |
| S9.2 Cevians | Core II | `stewarts-theorem`, `angle-bisector-length`, `apollonius-theorem`, `cevas-theorem`, `medial-triangle`, `vivianis-theorem`, `area-method` | 4 |
| S9.3 Cyclic and tangential quadrilaterals | Core | `ptolemys-theorem`, `brahmaguptas-formula`, `pitots-theorem`, `perp-to-angle-bisector` | 10 |
| S9.4 Circles that touch | Core | `common-tangent-lengths`, *(pattern)* `tangency-condition`, `descartes-circle-theorem`, `homothety-monge` | 8 |
| S9.5 The orthocenter, the excircles and the Euler line | Extension | `orthocenter-properties`, `exradii`, `orthic-triangle`, `euler-distance-theorem` | 4 |

**S10. Analytic geometry** · Core II. Conics, polar coordinates, vectors and transformations, and theorems about quadrilaterals and regions.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S10.1 Conic sections | Core | `conic-sections`, `parabola-focus-directrix`, `ellipse-properties`, `hyperbola-properties`, `conic-tangent-lines`, `eccentricity`, `parabolic-segment-area` | 9 |
| S10.2 Polar coordinates, tangency and determinants | Core II | `polar-coordinates`, `tangency-equation`, `determinant-geometric`, `lattice-points-gcd` | 4 |
| S10.3 Vectors and transformations | Core | `vector-dot-product`, `vector-projection`, `reflection-composition`, `rotation-reflection-matrices`, `rotation-trick`, `rotation-center`, `linear-change-of-variables` | 17 |
| S10.4 Theorems about quadrilaterals and hexagons | Core II | `british-flag-theorem`, `varignons-theorem`, `equiangular-hexagon-area` | 6 |
| S10.5 Regions and neighborhoods | Extension | `moser-circle`, `steiner-neighborhood`, `isoperimetric-facts` | 7 |

**S11. Space** · Core. Tetrahedra, frusta, and coordinates in three dimensions.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S11.1 Tetrahedra and frusta | Core II | `frustum-volume`, `regular-tetrahedron`, `isosceles-tetrahedron` | 5 |
| S11.2 Coordinates and planes in space | Core | `plane-cross-section`, `distance-3d`, `point-plane-distance` | 13 |

##### Part: Toward the AIME

**S12. From the AMC to the AIME: geometry** · Core. Signed lengths, degenerate figures, choosing between coordinates and a synthetic route, and harder mixed problems.

| Lesson | Importance | Cards | AMC problems |
|---|---|---|---|
| S12.1 Signed lengths and degenerate figures | Core | `directed-lengths` | 0 |
| S12.2 Coordinates or a synthetic route | Core | no card ( prereq coordinate-bash, triangle-similarity) | mixed |
| S12.3 Mixed problems across the book | Core | no card (a review lesson) | mixed |

---

## Book: AMC Algebra

Algebra for the AMC 10 and AMC 12 in one book: the AMC 10 chapters first, then the topics the AMC 12 adds (logarithms, deeper polynomials, inequalities, trigonometry and complex numbers). Each chapter is marked Core or Core II. The four AMC books are a track of their own: they teach their own cards, so a card may be taught again in the AIME books, and each track places a contest problem at most once (owner, 2026-10-31).

### L1. The algebra toolkit (Core)

| Lesson | Cards |
|---|---|
| L1.1 Factoring, expanding and simplifying | `difference-of-squares`, `square-of-sum`, `rationalizing`, `completing-the-square` |
| L1.2 Linear equations and systems | `linear-elimination`, `add-all-equations`, `transforming-equations`, `symmetric-polynomial-strategies` |
| L1.3 Substitutions and self-similar expressions | `name-the-whole-expression`, `substitute-repeated-block`, `repeated-block-equation`, `infinite-nest` |
| L1.4 Absolute values, sign charts and floors | `absolute-value-rules`, `abs-value-relations`, `sign-chart`, `abs-value-graphing`, `name-the-floor`, `group-equal-floors`, `floor-equation`, `floor-sum-range` |
| L1.5 Rates, averages, percents and word problems | `work-rates`, `time-per-leg`, `average-speed`, `relative-motion`, `averages-to-totals`, `weighted-average`, `mean-median-mode`, `percent-change`, `setting-up-proportions`, *(pattern)* `several-rates`, *(pattern)* `averages-before-after`, *(pattern)* `age-problems`, *(pattern)* `scoring-rules`, *(pattern)* `break-even-plans` |

### L2. Quadratics, functions and extremes (Core)

| Lesson | Cards |
|---|---|
| L2.1 Quadratics: roots, Vieta and the vertex | `quadratic-formula`, `vietas-quadratic`, `vertex-form`, `quadratic-forms`, *(pattern)* `quadratic-perfect-square` |
| L2.2 Functions: composition, inverses, symmetry, defined operations | `inverse-function-properties`, `odd-even-functions`, `defined-operation` |
| L2.3 Graphs and the number of solutions | `piecewise-graph-counting`, *(pattern)* `reading-graphs`, `slope-to-a-point` |
| L2.4 Exponents and logarithms | `log-rules`, `change-of-base` |
| L2.5 Largest and smallest values | `trivial-inequality`, `am-gm`, `max-product-fixed-sum`, `sos-identity`, `abs-triangle-inequality`, `median-minimizes-abs`, `placing-digits-extremes` |

### L3. Polynomials, sequences and series (Core)

| Lesson | Cards |
|---|---|
| L3.1 Polynomial roots, remainders and coefficients | `factor-remainder-theorem`, `polynomial-division`, `rational-root-theorem`, `coefficient-extraction`, `comparing-coefficients` |
| L3.2 Arithmetic and geometric sequences | `arithmetic-series`, `geometric-series`, `triangular-numbers`, `power-sums` |
| L3.3 Recurrences and periodic sequences | `first-order-recurrence`, *(pattern)* `periodic-sequences`, `organized-listing` |
| L3.4 Telescoping and clever sums | `telescoping`, `partial-fractions`, `factorial-telescoping`, `alternating-sum-grouping` |
| L3.5 Symmetric identities in three variables | `sum-zero-identities`, `pairwise-sum-product`, `an-minus-bn` |
| L3.6 Estimating and checking | `estimating-answers`, `sqrt-approximation`, `disproof-by-counterexample` |

### L4. Logarithms, exponentials and functions (Core II)

| Lesson | Cards |
|---|---|
| L4.1 Logarithmic and exponential equations | `take-logs-linearize`, `log-substitution`, `log-system` |
| L4.2 Functional equations by substitution | `functional-substitution`, `fx-pairing`, `cauchy-functional-equations` |
| L4.3 Floors beyond the basics | `floor-basics` |

### L5. Polynomials and algebraic structure (Core II)

| Lesson | Cards |
|---|---|
| L5.1 Vieta for any degree, and power sums of roots | `vietas-general`, `newtons-sums`, `products-over-roots`, `fundamental-theorem-symmetric` |
| L5.2 Roots: conjugates, signs and transformations | `conjugate-root-theorems`, `descartes-rule-signs`, `root-transformations`, `quadratic-root-location` |
| L5.3 Remainders and interpolation | `polynomial-crt`, `lagrange-interpolation-formula` |
| L5.4 Radicals and reciprocal substitutions | `denesting-radicals`, `palindromic-polynomials`, `reciprocal-power-sums`, `forced-difference-of-squares` |
| L5.5 Factorizations worth knowing | `useful-factorizations`, `cubes-minus-3abc`, `antisymmetric-factorization`, `sophie-germain` |

### L6. Sequences, sums and inequalities (Core II)

| Lesson | Cards |
|---|---|
| L6.1 Linear recurrences | `linear-recurrence`, `binets-formula` |
| L6.2 Finite differences and double sums | `finite-differences`, `double-summation`, `arithmetico-geometric`, `largest-term-ratio` |
| L6.3 The inequalities of the AMC 12 | `mean-chain`, `cauchy-schwarz`, `power-mean-inequality`, `bernoulli-inequality` |

### L7. Trigonometry (Core II)

| Lesson | Cards |
|---|---|
| L7.1 Special values and identities | `special-trig-values`, `angle-addition`, `double-angle`, `half-angle` |
| L7.2 Combining and solving | `harmonic-addition`, `inverse-trig-identities` |
| L7.3 Products and powers | `trig-telescoping-product`, `even-power-sin-cos-sums` |

### L8. Complex numbers (Core II)

| Lesson | Cards |
|---|---|
| L8.1 Complex arithmetic | `complex-basics`, `conjugate-both-sides`, *(pattern)* `complex-modulus-argument` |
| L8.2 Polar form and De Moivre | `eulers-formula`, `polar-form`, `de-moivre` |
| L8.3 Roots of unity and the fundamental theorem | `roots-of-unity`, `fundamental-theorem-algebra` |

---

## Book: AMC Number Theory

Number theory for the AMC 10 and AMC 12: primes, divisors, digits, remainders and integer equations, then the AMC 12 additions.

### M1. Number theory: primes, divisors and digits (Core)

| Lesson | Cards |
|---|---|
| M1.1 Prime factorization, gcd and lcm | `fundamental-theorem-arithmetic`, `euclidean-algorithm`, `gcd-lcm-product`, `lcm-common-multiples`, `gcd-substitution`, `recognition-numbers` |
| M1.2 Counting and summing divisors | `number-of-divisors`, `sum-of-divisors`, `product-of-divisors`, `perfect-square-divisors` |
| M1.3 Divisibility rules and factorials | `divisibility-rules`, `floor-multiples`, `consecutive-coprime`, `legendres-formula`, `trailing-zeros`, `factor-out-factorial`, `consecutive-product-factorial` |
| M1.4 Bases and digits | `base-conversion`, `numeral-as-polynomial`, `unknown-base`, `digit-count`, `digit-sum-carries`, `digit-manipulation`, `base10-curiosities`, `palindromes`, `cryptarithms` |
| M1.5 Decimals and calendars | `repeating-decimals`, `terminating-decimals`, *(pattern)* `calendar-problems` |

### M2. Number theory: remainders and integer equations (Core)

| Lesson | Cards |
|---|---|
| M2.1 Modular arithmetic | `modular-basics`, `euclids-lemma`, `subtract-equal-remainders`, `reduce-divisibility-constant`, `poly-divisible-linear` |
| M2.2 Cycles, Fermat and Euler | `cycle-hunting`, `last-digit-patterns`, `fermats-little-theorem`, `eulers-totient`, `squares-mod-small` |
| M2.3 Linear congruences and the Chinese Remainder Theorem | `bezouts-identity`, `crt`, `chicken-mcnugget`, `coins-and-prices` |
| M2.4 Integer equations by factoring | `sfft`, `factor-pair-counting`, `only-even-prime`, `difference-of-squares-rep`, `choose-modulus`, `primes-6k` |
| M2.5 Right triangles with integer sides | `pythagorean-triples`, `integer-triangles-perimeter` |

### M3. Number theory for the AMC 12 (Core II)

| Lesson | Cards |
|---|---|
| M3.1 Exponents, divisor functions and parity | `exponent-tracking`, `multiplicative-functions`, `largest-odd-divisor-sum`, `sigma-parity` |
| M3.2 Inverses, Bézout and Euler's theorem | `modular-inverse`, `extended-euclidean-algorithm`, `eulers-theorem`, `wilsons-theorem` |
| M3.3 Primes in binomials and bounded equations | `prime-divides-binomial`, `pascal-parity`, `power-minus-self`, `sum-of-two-squares`, `bounding-diophantine`, `squeeze-between-squares` |

---

## Book: AMC Counting & Probability

Counting and probability for the AMC 10 and AMC 12: counting methods, probability and expected value, then the AMC 12 additions.

### R1. Counting (Core)

| Lesson | Cards |
|---|---|
| R1.1 Permutations, combinations and building objects | `permutations-combinations`, `constructive-counting`, `counting-functions`, `fencepost-counting` |
| R1.2 Cases, complements and inclusion-exclusion | `casework-method`, `complementary-counting`, `inclusion-exclusion`, `pie`, `uniform-overcount` |
| R1.3 Arrangements with restrictions | `multiset-permutations`, `gap-method`, `counting-blocks`, `circular-permutations`, `non-adjacent-selection`, `derangements` |
| R1.4 Distributions and binomial coefficients | `stars-and-bars`, `balls-boxes-table`, `pascals-identity`, `binomial-row-sums`, `hockey-stick`, `binomial-theorem`, `bijection-method` |
| R1.5 Recursion, paths and processes | `recursive-counting`, *(pattern)* `tiling-a-board`, `grid-paths`, `grid-path-fill`, `backward-induction`, `simulate-the-process`, `working-backwards` |
| R1.6 Subsets, graphs and pigeonhole | `subset-avoiding-relation`, `subset-sum-facts`, `handshake-lemma`, `eulerian-paths`, *(pattern)* `round-robin-tournaments`, `pigeonhole`, `pairing-to-bound`, `coloring-arguments` |

### R2. Probability and expected value (Core)

| Lesson | Cards |
|---|---|
| R2.1 Probability by counting | `basic-probability`, *(pattern)* `drawing-without-replacement`, `symmetry-probability` |
| R2.2 Independence and conditional probability | `independent-events`, `conditional-probability`, `hypergeometric`, `binomial-probability` |
| R2.3 Geometric probability | `geometric-probability` |
| R2.4 Expected value | `expected-value` |
| R2.5 Logic and puzzles | *(pattern)* `truth-tellers-logic`, *(pattern)* `magic-squares` |

### R3. Counting and probability for the AMC 12 (Core II)

| Lesson | Cards |
|---|---|
| R3.1 More counting structures | `restricted-sequences`, `stars-bars-upper-bound`, `catalan-numbers`, `committee-chair`, `nested-subset-pairs` |
| R3.2 More binomial identities | `vandermonde`, `squared-binomial-sum`, `multinomial-theorem`, `generating-function-method` |
| R3.3 Invariants, colorings and symmetry | `invariants-coloring`, `graph-coloring`, `permutation-cycle-structure`, `strategy-stealing` |
| R3.4 Conditional probability and expectation | `bayes-theorem`, `indicator-variables`, `expected-fixed-points`, `tail-sum-expectation`, `total-expectation` |
| R3.5 Random processes | `states-recursion-prob`, `geometric-distribution`, `turn-based-games` |
| R3.6 Continuous probability | `product-of-uniforms`, `order-statistics`, `variance-independence` |

---

## Book: AMC Geometry

Geometry for the AMC 10 and AMC 12: triangles, circles, polygons, coordinates and solids, then the AMC 12 additions (cevians, cyclic quadrilaterals, trigonometry in triangles, conics, transformations and space).

### S1. Geometry: triangles and circles (Core)

| Lesson | Cards |
|---|---|
| S1.1 Similar and right triangles | `triangle-similarity`, `similar-figures-ratios`, `pythagorean-theorem`, `special-right-triangles`, `15-75-90-triangle`, `triangle-area-standard`, `triangle-inequality`, `triangle-congruence`, `parallel-exterior-angles`, `median-to-hypotenuse`, `right-triangle-inradius` |
| S1.2 Ratios inside triangles | `parallel-line-similarity`, `midsegment-theorem`, `intercept-theorem`, *(pattern)* `nested-similar`, `same-base-area-ratio`, `shared-angle-area-ratio`, `cevian-area-ratio`, `angle-bisector-theorem`, `centroid-division`, `mass-points` |
| S1.3 Right-triangle constructions | `altitude-hypotenuse`, *(pattern)* `right-triangle-altitude`, `extend-sides-to-meet`, `median-doubling`, *(pattern)* `point-in-equilateral`, *(pattern)* `circle-in-angle` |
| S1.4 Circles: angles, chords and tangents | `inscribed-angle-theorem`, `circle-basics`, `tangent-facts`, `chord-length`, `power-of-a-point`, `thales-theorem`, `angle-chasing`, `cyclic-opposite-angles`, `cyclic-equal-angles`, `angle-chord-secant`, `tangent-chord-angle`, *(pattern)* `cyclic-quadrilateral`, `equal-chords-arcs` |
| S1.5 Incircles and touching circles | `incircle-tangent-lengths`, `inradius-area`, `tangent-circles`, `two-tangents-angle`, *(pattern)* `rolling-without-slipping`, `triangle-of-centers`, `common-chord-length`, `triangle-center-angles` |
| S1.6 Trigonometry in triangles | `law-of-sines`, `law-of-cosines`, `trig-area`, `law-cosines-60-120`, `law-of-cosines-special-triangles`, `herons-formula`, `triangle-13-14-15`, `pythagorean-identities`, `common-angle-values`, `reduction-identities` |

### S2. Geometry: polygons, coordinates and solids (Core)

| Lesson | Cards |
|---|---|
| S2.1 Polygons and areas | `polygon-angle-sums`, `regular-polygon-area`, `regular-hexagon-area`, `regular-octagon`, `regular-dodecagon`, `equilateral-triangle-facts`, *(pattern)* `equiangular-polygon`, `area-by-pieces`, `trapezoid-parallelogram-areas`, `parallelogram-area`, `quadrilateral-diagonal-area`, `trapezoid-special-segments`, `circular-segment`, `inscribed-square` |
| S2.2 Coordinates | `distance-midpoint`, `line-forms`, `point-line-distance`, `circle-equation`, `coordinate-bash`, `angle-between-lines`, `section-formula`, `parallel-lines-distance`, `tangent-lines-from-point`, `angle-bisectors-of-lines`, `shoelace-formula`, `picks-theorem`, `perpendicular-bisector-locus`, `bisector-closer-region` |
| S2.3 Transformations and symmetry | `reflection-coordinates`, `rotation-90`, `composing-transformations`, `reflect-across-the-line`, *(pattern)* `folded-paper`, `figure-symmetries`, `fit-copies` |
| S2.4 Counting in figures | `plane-regions`, `handshakes-diagonals`, *(pattern)* `counting-shapes`, *(pattern)* `zonogon-minkowski`, `rectangles-in-grid` |
| S2.5 Solids | `prism-pyramid-volumes`, `cone-formulas`, `sphere-formulas`, `cube`, `space-diagonal`, `regular-octahedron`, *(pattern)* `painted-cubes`, `scale-one-level`, `cavalieris-principle`, `unfold-the-surface`, `cube-nets`, `eulers-polyhedron-formula` |

### S3. Geometry: triangles and circles for the AMC 12 (Core II)

| Lesson | Cards |
|---|---|
| S3.1 Cevians and area ratios | `area-method`, `stewarts-theorem`, `angle-bisector-length`, `apollonius-theorem`, `cevas-theorem`, `medial-triangle`, `median-triangle-area`, `vivianis-theorem` |
| S3.2 Cyclic quadrilaterals and incircles | `concyclicity-tests`, `ptolemys-theorem`, `brahmaguptas-formula`, `incircle-excircle-touch`, `perp-to-angle-bisector`, `angle-bisector-circumcircle` |
| S3.3 Circles that touch | `common-tangent-lengths`, *(pattern)* `tangency-condition` |
| S3.4 Trigonometry in triangles | `circumradius-area`, `projection-formula`, `trig-bash`, `altitude-bisector-angle` |

### S4. Geometry: coordinates, transformations and space (Core II)

| Lesson | Cards |
|---|---|
| S4.1 Conic sections | `conic-sections`, `parabola-focus-directrix`, `ellipse-properties`, `hyperbola-properties`, `conic-tangent-lines`, `eccentricity` |
| S4.2 Tangency, determinants and lattice points | `tangency-equation`, `determinant-geometric`, `lattice-points-gcd`, `british-flag-theorem`, `varignons-theorem` |
| S4.3 Transformations and vectors | `reflection-composition`, `rotation-reflection-matrices`, `rotation-trick`, `rotation-center`, `vector-dot-product`, `vector-projection`, `axis-stretch-area`, `linear-change-of-variables` |
| S4.4 Counting regions and neighborhoods | `moser-circle`, `steiner-neighborhood` |
| S4.5 Solids and space | `frustum-volume`, `regular-tetrahedron`, `plane-cross-section`, `dihedral-angle`, `distance-3d`, `plane-intercept-form`, `cross-product-area`, `box-tetrahedron`, `equal-edge-tetrahedron` |

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
| A1.1 Introduction | no card (the chapter's opening page: symmetric systems, radicals and the domain, substitutions, cyclic systems, integer solutions, with comprehension problems) |
| A1.2 Symmetric systems: $x + y$ and $xy$ (Core) | `symmetric-polynomial-strategies` |
| A1.3 Nested radicals, rational equations, keeping the domain (Core) | `denesting-radicals`, prereq `transforming-equations` |
| A1.4 Substitution patterns: $t = x + \frac1x$, quadratic forms, completing the square (Core) | `palindromic-polynomials`, `reciprocal-power-sums`, `completing-the-square` |
| A1.5 Cyclic systems and equations with several cases (Core II) | `subtract-and-factor`, prereq `add-all-equations` |
| A1.6 Building and checking integer or positive solutions (Core) | `forced-difference-of-squares`, *(pattern)* `quadratic-perfect-square`, prereq `sfft` |
| A1.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then A1.8 Review Problems and A1.9 Challenge Problems |

### A2. Polynomials and root expressions (Core)

| Lesson | Cards |
|---|---|
| A2.1 Introduction | no card (the chapter's opening page: the factor and remainder theorems, Vieta and Newton's sums, conjugate roots, root transformations, interpolation, with comprehension problems) |
| A2.2 The factor and remainder theorems, and division, in contest settings (Core) | `polynomial-crt`, prereq `factor-remainder-theorem` |
| A2.3 Vieta; sums of powers of roots (Newton's sums) (Core) | `newtons-sums`, `products-over-roots` |
| A2.4 Symmetric polynomials and root constraints (Core) | `fundamental-theorem-symmetric`, `conjugate-root-theorems`, `descartes-rule-signs` |
| A2.5 Root transformations: reciprocal and shifted polynomials (Core) | `root-transformations` |
| A2.6 Interpolation and reading off coefficients (Core II) | `lagrange-interpolation-formula`, `lagrange-interpolation`, `coefficient-extraction`, `comparing-coefficients` |
| A2.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then A2.8 Review Problems and A2.9 Challenge Problems |

### A3. Sequences, recurrences and sums (Core)

| Lesson | Cards |
|---|---|
| A3.1 Linear recurrences and their starting values (Core) | `linear-recurrence`, `binets-formula` |
| A3.2 Telescoping sums and products; partial fractions (Core) | `telescoping`, `partial-fractions`, `factorial-telescoping`, `alternating-sum-grouping` |
| A3.3 Finite differences, double sums, from a pattern to a formula (Core II) | `finite-differences`, `double-summation` |
| A3.4 Iteration and periodic sequences (Core) | *(pattern)* `infinite-nest`, prereq *(pattern)* `periodic-sequences` |
| A3.5 A closed form only when it helps (Core II) | `arithmetico-geometric`, `largest-term-ratio` |

### A4. Functions, logs and exponentials (Core)

| Lesson | Cards |
|---|---|
| A4.1 Composition, inverses, symmetry of a function (Core) | `inverse-function-properties`, `odd-even-functions`, `function-symmetry-equation`, `fx-pairing` |
| A4.2 Piecewise and absolute-value functions, floors and ceilings (Core) | `floor-basics`, `name-the-floor`, `group-equal-floors`, *(pattern)* `floor-equation`, *(pattern)* `floor-sum-range`, `abs-value-graphing` |
| A4.3 Exponential equations; logarithm laws and domains (Core) | `log-rules`, `change-of-base`, `exponent-laws`, `take-logs-linearize`, `log-substitution`, *(pattern)* `log-system` |
| A4.4 Functional identities of contest length (Core II) | `functional-substitution`, *(pattern)* `defined-operation` |
| A4.5 Graphs, monotonicity, and the number of solutions (Core) | `piecewise-graph-counting`, *(pattern)* `reading-graphs` |

### A5. Inequalities and bounds (Core)

| Lesson | Cards |
|---|---|
| A5.1 AM-GM and its equality case (Core) | `am-gm`, `max-product-fixed-sum`, `mean-chain` |
| A5.2 Cauchy-Schwarz and elementary quadratic forms (Core II) | `cauchy-schwarz`, `quadratic-forms` |
| A5.3 Squares, rearrangement, elementary estimates (Core) | `rearrangement`, `sos-identity`, `abs-triangle-inequality` |
| A5.4 Maximum and minimum with domain and discrete constraints (Core) | `median-minimizes-abs`, `slope-to-a-point`, `placing-digits-extremes`, `derivative-extremum`, prereq `vertex-form` |
| A5.5 When a bound is sharp enough (Core II) | `power-mean-inequality`, `jensens-inequality`, `bernoulli-inequality`, `weighted-am-gm` |

### A6. Complex numbers and roots of unity (Core II)

| Lesson | Cards |
|---|---|
| A6.1 Complex arithmetic, conjugates, modulus, argument (Core) | `complex-basics`, `conjugate-both-sides`, *(pattern)* `complex-modulus-argument` |
| A6.2 The plane: rotations and loci (Core II) | `eulers-formula`, `polar-form`, `de-moivre` |
| A6.3 Roots of unity and finite geometric sums (Core II) | `roots-of-unity`, `roots-of-unity-filter`, `trig-series-complex` |
| A6.4 Polynomial roots with complex numbers (Core II) | `fundamental-theorem-algebra`, `roots-unity-distance-product` |

### A7. Trigonometric algebra (Core II; links to G3)

| Lesson | Cards |
|---|---|
| A7.1 The unit circle and angle relations (Core) | `pythagorean-identities`, `common-angle-values`, `special-trig-values`, `reduction-identities` |
| A7.2 Addition, double angle and other standard transformations (Core) | `angle-addition`, `double-angle`, `half-angle`, `triple-angle`, `product-sum`, `harmonic-addition` |
| A7.3 Trig equations with a bounded solution set (Core II) | `inverse-trig-identities` (a possible gap: no card gives the full solution set of $\sin\theta = \sin\alpha$; see "Coverage") |
| A7.4 Between algebra and trig: substitutions, telescoping trig sums (Core II) | `trig-substitution`, `arctan-telescoping`, `sin-cos-ap-sum`, `cot-tan-telescoping`, `trig-telescoping-product` |

### A8. Algebraic structure and synthesis (Core II; a capstone)

| Lesson | Cards |
|---|---|
| A8.1 Symmetry, cyclic expressions, clever rearrangements (Core II) | `wlog-symmetry`, `sum-zero-identities`, `cubes-minus-3abc`, `antisymmetric-factorization`, `pairwise-sum-product` |
| A8.2 Integer and parity restrictions inside algebraic equations (Core II) | `an-minus-bn`, `sophie-germain`, `brahmagupta-fibonacci` |
| A8.3 Parameters, and telling possible roots apart (Core II) | prereq `quadratic-root-location`, prereq `comparing-coefficients` |
| A8.4 Mixed problems that need two or more earlier topics (Core II) | no new card (a review lesson) |

### A9. Algebra extensions (Extension)

| Lesson | Cards |
|---|---|
| A9.1 More interpolation and finite differences (Extension) | `higher-power-sums`, `integer-valued-polynomials`, `generalized-binomial-series` |
| A9.2 Nonstandard functional equations (Extension) | `cauchy-functional-equations`, `injectivity-surjectivity` |
| A9.3 Higher-order recurrences, matrices and determinants (Extension) | `matrix-multiplication`, `matrix-power-diagonalizing`, `determinant-basics`, `cramers-rule`, `matrix-inverse`, `chebyshev-polynomials` |
| A9.4 Inequalities and substitutions beyond routine AIME (Extension) | `nesbitt-inequality`, `tangent-line-trick`, `normalization`, `weierstrass-substitution`, `even-power-sin-cos-sums`, `evenly-spaced-angle-products` |

---

## Book: AIME Number Theory

Eight chapters. The changes from the first draft are three:
- Full CRT is taught in N2, before the exponent cycles of N3.
- Valuations come before the rarer lifting techniques.
- Hensel lifting, Lucas and higher residue theory are Extension material until a coverage audit shows they are needed more widely.

### N1. Prime factorization and divisors (Core)

| Lesson | Cards |
|---|---|
| N1.1 Introduction | no card (the chapter's opening page: prime factorizations, divisors as exponent choices, gcd and lcm, counting multiples, with comprehension problems) |
| N1.2 Prime exponent bookkeeping; gcd and lcm (Core) | `exponent-tracking`, `gcd-lcm-product`, `lcm-common-multiples`, `gcd-substitution` |
| N1.3 The number, sum and product of divisors (Core) | `sum-of-divisors`, `product-of-divisors`, `multiplicative-functions`, prereq `number-of-divisors` |
| N1.4 Divisors with square, parity or residue conditions (Core) | `perfect-square-divisors`, `largest-odd-divisor-sum`, `sigma-parity` |
| N1.5 Factor pairs, and counting pairs by lcm and gcd (Core) | `lcm-pair-counting`, prereq `factor-pair-counting` |
| N1.6 Prime exponents with counting (Core) | `floor-multiples`, `coprime-residue-sum`, `consecutive-coprime` |
| N1.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then N1.8 Review Problems and N1.9 Challenge Problems |

### N2. Linear congruences and CRT (Core)

**Goal:** solve any linear congruence, or show it has no solution, and join congruences with the Chinese Remainder Theorem. N3 builds on it.

| Lesson | Cards |
|---|---|
| N2.1 Introduction | no card (the chapter's opening page: congruences, inverses, linear congruences, Bézout, the Chinese Remainder Theorem, with comprehension problems) |
| N2.2 Congruence rules, inverses, and when you may cancel (Core) | `modular-inverse`, `euclids-lemma`, prereq `modular-basics` |
| N2.3 Linear congruences, and when they have solutions (Core) | `subtract-equal-remainders`, `reduce-divisibility-constant`, *(pattern)* `poly-divisible-linear` |
| N2.4 The extended Euclidean algorithm and Bézout (Core) | `extended-euclidean-algorithm`, `bezouts-identity` |
| N2.5 The Chinese Remainder Theorem, for coprime moduli (Core) | `crt` |
| N2.6 Compatible congruences with moduli that share factors; counting solutions (Core II) | `crt-solution-counting` |
| N2.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then N2.8 Review Problems and N2.9 Challenge Problems |

**Opening questions and checks (computed):**
- **N2.2:** solve $7x \equiv 3 \pmod{10}$. The inverse of $7$ is $3$, so $x \equiv 9$. Check: the inverse of $13$ modulo $22$ is $17$.
- **N2.3:** $6x \equiv 4 \pmod{10}$ has the solutions $x \equiv 4, 9$ (divide by $\gcd(6, 10) = 2$ to get $3x \equiv 2 \pmod 5$). Check: $6x \equiv 3 \pmod{10}$ has none, since $2 \nmid 3$.
- **N2.4:** $21x + 15y = 3$ has the solution $(x, y) = (-2, 3)$, and no combination of $21$ and $15$ makes $1$.
- **N2.5:** find $x \equiv 1 \pmod 4$, $x \equiv 4 \pmod{25}$. Answer: $x = 29$. This example comes back in N3.6. Check: $x \equiv 4 \pmod 9$ and $x \equiv 5 \pmod{11}$ give $x = 49$.
- **N2.6:** $x^2 \equiv 1 \pmod{1000}$ has $8$ solutions modulo $1000$: $4$ modulo $8$ times $2$ modulo $125$.

**Problems (all read 2026-10-31; each route uses its lesson's idea):**

| Lesson | Problems |
|---|---|
| N2.2 | 2025 AMC 12B #5 ($13^{-1} \equiv 17 \pmod{22}$); 2025 AMC 10B #23, twin 2025 AMC 12B #19 ($9$ invertible modulo $14$); 2012 AIME I #15 (a multiplier permutes the seats exactly when it is invertible; challenging) |
| N2.3 | 2017 AIME I #2 (equal remainders: the modulus divides the differences); 2014 AMC 12B #7 (reduce the divisibility to $k + 1 \mid 30$) |
| N2.4 | 2006 AMC 10A #22, twin 2006 AMC 12A #14 ($\gcd(300, 210) = 30$ and a Bézout pair); 2000 AMC 12 #16 (the solutions of $4r - 3c = 1$ inside the grid) |
| N2.5 | 1993 AIME #6 (three conditions joined into $n \equiv 495 \pmod{990}$); 2014 AIME I #8 ($N(N - 1)$ splits $16$ and $625$ between consecutive integers) |
| N2.6 | 2012 AIME I #10 (two square roots modulo $125$, combined with modulo $8$); 2012 AIME II #12 (CRT makes every residue triple one residue modulo $1001$); 2011 AIME II #14 (bijections modulo $2$, $3$, $5$, joined by CRT) |

**N2 review (10 problems, filled 2026-10-31; written in `js/data/learn/aime-number-theory/n2.js`):** 2004 AMC 10B #21 (common terms of two progressions: one residue modulo $21$); 2017 AMC 10B #23, twin 2017 AMC 12B #19 ($45 = 5 \cdot 9$, the digit sum modulo $9$, joined); 2020 AMC 10A #24 (conditions modulo $21$ and $60$ joined); 2023 AIME I #7 (remainders that must agree modulo common factors); 1993 AIME #9 (triangular positions agreeing modulo $2000$, split by CRT); and the five below.
- 2013 AIME I #11 (read: linear congruences in $k$ modulo $9$, $11$, $13$, then CRT);
- 2017 AIME I #9 (read: $100 \equiv 1 \pmod{99}$, then CRT modulo $9$ and $11$);
- 2026 AIME I #8 (read: CRT turns $\equiv 5 \pmod{12}$ into conditions mod $3$ and $4$ on divisor exponents; assumes `number-of-divisors`);
- 2001 AIME I #11 (read: two numberings of a grid, solved through integrality modulo $31$);
- 2026 AIME II #5 (read: it ends in the linear Diophantine equation $3r - 5b = 2$; a challenge, assuming `hypergeometric` from C6.4).

### N3. Cycles, exponentiation and order (Core): the pilot

**Goal:** choose well among a direct cycle, Fermat's Little Theorem, the multiplicative order, Euler's theorem, and splitting the modulus with CRT.

**What it assumes:** N2 (`crt`, `modular-inverse`), and `gcd-lcm-product` for the lcm of two periods.

**Changes from the first draft (the proposal's repairs):**
- CRT is now taught in N2, and Euler's theorem gets a lesson of its own.
- N3.2 separates eventual periodicity from a cycle that starts at the first power.
- Problems that need later topics (lifting, digits, recurrences) moved to later chapters.
- The comparison lesson became a worked comparison with mixed problems.

**2018 AIME I #11:** the proposal flagged its annotation for a recheck. The reading is right: the order of $3$ is $5$ modulo $121$ and $39$ modulo $169$ (computed). The wording is now explicit about which number is the base.

#### N3.1 Introduction

No card: the chapter's opening page (cycles of powers, Fermat, the order, Euler, splitting the modulus), with comprehension problems.

#### N3.2 Powers modulo $n$: direct cycles and eventual periodicity (Core)

- **Opening question:** what is the units digit of $7^{202}$? The powers of $7$ mod $10$ run $7, 9, 3, 1$ and then repeat, and $202 = 4\cdot50 + 2$, so the digit is $9$.
- **Teach:** there are only finitely many residues, so the powers must repeat. When the base is coprime to the modulus, the cycle starts at the first power. When it is not, the powers settle into a cycle only after a few steps: $2^n \bmod 12$ runs $2, 4, 8, 4, 8, \ldots$ (eventual period $2$).
- **Cards:** `cycle-hunting` (Finding the Period, first met in B3.3), and `last-digit-patterns` as a link.
- **Clue:** a huge exponent and a small modulus.
- **Checks:**
  - the units digit of $7^{203}$ is $3$;
  - $2^n \bmod 7$ runs $2, 4, 1$, so $2^{100} \equiv 2 \pmod 7$;
  - $2^{10} \bmod 12$ is $4$ (non-coprime: the cycle $4, 8$ starts at $n = 2$).
- **Problems:**
  - 2003 AMC 10A #16 (read: the units digits of $3^n$ run $3, 9, 7, 1$; choice C);
  - 2023 AMC 10B #8 (read: two last-digit cycles of period $4$);
  - 2017 AIME I #3 (read: the units digits of triangular numbers repeat with period $20$);
  - 2025 AMC 12B #9 (read: $6^n \bmod 100$ repeats every $5$ only from $6^2$ on, eventual periodicity with a base not coprime to $100$; challenging).

#### N3.3 Fermat's Little Theorem: prime modulus and coprimality (Core)

- **Opening question:** what is $2^{1000} \bmod 13$? Fermat gives $2^{12} \equiv 1$, $1000 = 12 \cdot 83 + 4$, and $2^4 = 16 \equiv 3$.
- **Teach:** a prime modulus guarantees a period of $p - 1$, but only for a base coprime to $p$. Show a misuse: $13^{1000} \bmod 13$ is $0$, not $1$.
- **Cards:** `fermats-little-theorem`.
- **Checks:**
  - $5^{1000} \equiv 1 \pmod{13}$, since $5^4 \equiv 1$ and $4 \mid 1000$;
  - say why Fermat does not apply to $26^{100} \bmod 13$.
- **Problems:**
  - 2017 AMC 10B #14 (read: $N^{16} \equiv 1 \pmod 5$ unless $5 \mid N$; choice D);
  - 1989 AIME #9 (read: $n^5 \equiv n \pmod 5$, with CRT from N2 and a size bound);
  - 2002 AIME I #7 (read: $10^6 \equiv 1 \pmod 7$; it also needs the generalized binomial expansion that its statement gives, so it is marked a challenge).

#### N3.4 Multiplicative order and the divisibility of periods (Core II)

- **Opening question:** what is $3^{202} \bmod 13$? Fermat promises period $12$, but $3^3 = 27 \equiv 1$, so the period is $3$, and $202 = 3 \cdot 67 + 1$ gives $3$.
- **Teach:** the smallest period is the order, and it divides every exponent that gives $1$, including $p - 1$. So only the divisors of $p - 1$ need checking.
- **Cards:** `multiplicative-order`.
- **Checks:**
  - the order of $3$ mod $13$ is $3$, and the order of $2$ mod $13$ is $12$;
  - the order of $10$ mod $101$ is $4$, since $10^2 \equiv -1$.
- **Problems:**
  - 2018 AMC 10B #13 (read: the order of $10$ mod $101$; choice C, $505$);
  - 2019 AIME I #14 (read: an order of exactly $16$ forces $p \equiv 1 \pmod{16}$; answer $97$).
- **Moved:** 2016 AMC 12B #22 goes to N6.5, where repeating decimals are taught.

#### N3.5 Euler's theorem and the totient function (Core)

- **Opening question:** what is $3^{2026} \bmod 100$? $\varphi(100) = 40$ gives $3^{40} \equiv 1$. The order is in fact $20$, and $2026 \equiv 6 \pmod{20}$, so $3^6 = 729$ gives $29$.
- **Teach:** Euler's theorem extends Fermat to any modulus coprime to the base. Compute $\varphi$ from the factorization. Euler's period is guaranteed, like Fermat's, but it need not be the smallest (link to N3.4).
- **Cards:** `eulers-theorem`, `eulers-totient`, `carmichael-function` (a link, for the smallest universal period).
- **Checks:**
  - $\varphi(100) = 40$;
  - $\varphi(1000) = 400$;
  - $7^{2026} \bmod 100$ is $49$ (the order of $7$ is $4$).
- **Problems:**
  - 2024 AMC 10B #18, with its twin 2024 AMC 12B #14 (read: $\varphi(125) = 100$ gives remainder $1$, and multiples of $5$ give $0$; choice B).

#### N3.6 Orders with CRT; bases not coprime to the modulus (Core II)

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
  - 2018 AIME I #11 (read: the order of $3$ is $5$ mod $121$ and $39$ mod $169$, joined by lcm; answer $195$).

#### N3.7 Summary

No card: the chapter's ideas, then Problem Solving Strategies; then N3.8 Review Problems and N3.9 Challenge Problems.

#### N3 chapter review (8 problems; every one read)

| Problem | What it needs |
|---|---|
| 2008 AMC 10A #24, twin 2008 AMC 12A #15 | the last digits of $2^n$ and of squares; the exponent is itself a large number |
| 2001 AIME II #10 | the order of $10$ modulo $1001$ is $6$ |
| 2004 AIME II #10 | powers of $2$ cycle modulo $9$ with period $6$, then a count |
| 2021 AIME II #13 | $1000 = 8 \cdot 125$, and the order of $2$ mod $125$ |
| 2021 AIME I #14 | Fermat, and a primitive root; $n = \operatorname{lcm}(42, 43, 46, 47)$ (a challenge: `primitive-roots` is N8, linked) |
| 2016 AMC 12B #25 | the order of $2$ mod $19$ is $18$ (a challenge, assuming `linear-recurrence` from A3.1) |
| 2015 AMC 12A #22 | a recursion whose terms repeat modulo $2$ and modulo $3$, joined by CRT (a challenge, assuming `recursive-counting` from C5.2) |
| 2025 AIME II #13 | $2^{2^k}$ modulo $1000$ through Euler and CRT, after a rational recursion (challenging) |

**Moved out of N3:**
- 2020 AIME I #12 needs LTE, so it goes to N4.5.
- 2024 AIME I #13 needs Hensel lifting, so it goes to N8.3.
- 2023 AIME II #15 needs inverses and binary expansions, so it goes to the N6 review.

**Pilot status (2026-10-31):** N2 and N3 are written in full (`js/data/learn/aime-number-theory/n2.js`, `n3.js`).

### N4. Valuations and factorial divisibility (Core II)

| Lesson | Cards |
|---|---|
| N4.1 Introduction | no card (the chapter's opening page: valuations, Legendre's formula, primes in binomial coefficients, Lifting the Exponent, with comprehension problems) |
| N4.2 $v_p(n)$, the exponent of a prime in an integer (Core) | `p-adic-valuation` |
| N4.3 Legendre's formula, trailing zeros, factoring out factorials (Core) | `legendres-formula`, `trailing-zeros`, `factor-out-factorial`, `consecutive-product-factorial` |
| N4.4 When a prime divides a binomial coefficient (Core II) | `prime-divides-binomial` |
| N4.5 Lifting the Exponent: the common cases and their hypotheses (Core II) | `lte-lemma`, `lte` (problem: 2020 AIME I #12, moved here from N3; read) |
| N4.6 Valuations with bounds on integer solutions (Core II) | `gcd-power-minus-one`, `power-minus-self` |
| N4.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then N4.8 Review Problems and N4.9 Challenge Problems |

### N5. Diophantine equations and constraints (Core)

| Lesson | Cards |
|---|---|
| N5.1 Introduction | no card (the chapter's opening page: linear equations and the Frobenius number, factoring, modular obstructions, Pythagorean triples, bounding, with comprehension problems) |
| N5.2 Linear integer equations: gcd conditions, parametrizing, Frobenius (Core) | `chicken-mcnugget`, *(pattern)* `coins-and-prices` |
| N5.3 Factoring, and differences of squares (Core) | `difference-of-squares-rep`, prereq `sfft`, prereq `forced-difference-of-squares` |
| N5.4 Parity, modular obstructions, inequalities (Core) | `choose-modulus`, `primes-6k`, prereq `only-even-prime` |
| N5.5 Pythagorean triples and integer triangles (Core) | `pythagorean-triples`, `integer-triangles-perimeter`, `sum-of-two-squares`, `lattice-points-circle` |
| N5.6 Bounds, monotonicity, finite searches (Core) | `bounding-diophantine`, `squeeze-between-squares` |
| N5.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then N5.8 Review Problems and N5.9 Challenge Problems |

### N6. Bases, digits and decimals (Core; N6.5 comes after N3)

| Lesson | Cards |
|---|---|
| N6.1 Introduction | no card (the chapter's opening page: numerals as polynomials, digit counts, digit sums and carries, repeating decimals, palindromes and calendars, with comprehension problems) |
| N6.2 Base representation; a numeral as a polynomial (Core) | `base-conversion`, `numeral-as-polynomial` |
| N6.3 Equations in an unknown base; bounds on digits (Core) | *(pattern)* `unknown-base`, `digit-count` |
| N6.4 Last digits, digit sums, carrying (Core) | `digit-sum-carries`, *(pattern)* `digit-manipulation`, `base10-curiosities` |
| N6.5 Repeating decimals and the order of 10 (Core) | `repeating-decimals`, `terminating-decimals` (problem: 2016 AMC 12B #22, moved from N3; read) |
| N6.6 Concatenation, palindromes, digit restrictions (Core) | *(pattern)* `palindromes`, *(pattern)* `cryptarithms`, *(pattern)* `calendar-problems` |
| N6.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then N6.8 Review Problems and N6.9 Challenge Problems |

### N7. Residue patterns and special constraints (Core II)

| Lesson | Cards |
|---|---|
| N7.1 Introduction | no card (the chapter's opening page: squares modulo small numbers, the freshman's dream, Wilson's theorem, restrictions on primes, periodic sequences, with comprehension problems) |
| N7.2 Quadratic residues by small-modulus tests (Core II) | `squares-mod-small`, `eulers-criterion` |
| N7.3 Squares, fourth powers and parity patterns mod $n$ (Core II) | `freshmans-dream`, prereq `last-digit-patterns` |
| N7.4 Orders, divisor conditions, restrictions on primes (Core II) | `wilsons-theorem`, prereq `multiplicative-order` |
| N7.5 Integer sequences and periodicity mod $n$ (Core) | `pisano-periods` |
| N7.6 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then N7.7 Review Problems and N7.8 Challenge Problems |

### N8. Number theory extensions (Extension; never a prerequisite in the core sequence)

| Lesson | Cards |
|---|---|
| N8.1 Introduction | no card (the chapter's opening page: Lucas's theorem, Hensel lifting, primitive roots and reciprocity, Pell equations, sums of squares, Farey fractions, with comprehension problems) |
| N8.2 Lucas's theorem and binomial residues (Extension) | `lucas-theorem`, `kummers-theorem`, `pascal-parity` |
| N8.3 Hensel lifting for prime powers (Extension) | `hensel-lifting`, `lagrange-roots-mod-p` (problem: 2024 AIME I #13, moved from N3; read) |
| N8.4 Primitive roots and higher order structure (Extension) | `primitive-roots`, `quadratic-reciprocity` |
| N8.5 Diophantine methods beyond elementary AIME (Extension) | `pell-equation`, `binary-quadratic-forms`, `sum-of-three-squares`, `gaussian-integers`, `zeckendorf-theorem`, `mobius-inversion`, `bertrands-postulate`, `farey-sequences` |
| N8.6 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then N8.7 Review Problems and N8.8 Challenge Problems |

---

## Book: AIME Geometry

Nine chapters. The proposal separates the main AIME toolkits, so a student learns them in a reliable order rather than as a grab bag of theorems.

### G1. Triangle ratios, similarity and area (Core)

| Lesson | Cards |
|---|---|
| G1.1 Similar triangles and ratio chasing (Core) | `parallel-line-similarity`, `midsegment-theorem`, `intercept-theorem`, *(pattern)* `nested-similar` |
| G1.2 Area ratios: same altitude, cevians (Core) | `same-base-area-ratio`, `shared-angle-area-ratio`, `cevian-area-ratio`, `area-method` |
| G1.3 Stewart's theorem, angle bisectors, medians (Core) | `stewarts-theorem`, `angle-bisector-theorem`, `angle-bisector-length`, `apollonius-theorem`, `centroid-division` |
| G1.4 Mass points as a ratio tool (Core II) | `mass-points`, `cevian-ratio-sum`, `rouths-theorem` |
| G1.5 Similarity and area in nested figures (Core) | `altitude-hypotenuse`, *(pattern)* `right-triangle-altitude`, `extend-sides-to-meet`, `median-doubling` |

### G2. Circles and cyclic figures (Core)

| Lesson | Cards |
|---|---|
| G2.1 Cyclic quadrilaterals, inscribed angles, angle chasing (Core) | `angle-chasing`, `cyclic-opposite-angles`, `cyclic-equal-angles`, `concyclicity-tests`, `angle-chord-secant`, `tangent-chord-angle`, *(pattern)* `cyclic-quadrilateral` |
| G2.2 Power of a point, tangent and secant, intersecting chords (Core) | `radical-axis`, `thales-theorem`, prereq `power-of-a-point` |
| G2.3 Ptolemy and chord lengths (Core II) | `ptolemys-theorem`, `equal-chords-arcs`, `brahmaguptas-formula` |
| G2.4 Incircles, excircles, tangent lengths (Core) | `incircle-tangent-lengths`, `incircle-excircle-touch`, `inradius-area`, `exradii`, `pitots-theorem` |
| G2.5 Circles that meet or touch (Core) | `tangent-circles`, `two-tangents-angle`, *(pattern)* `rolling-without-slipping`, `common-tangent-lengths`, `triangle-of-centers`, `common-chord-length`, `descartes-circle-theorem`, *(pattern)* `tangency-condition`, *(pattern)* `tangent-circle-packing` |

### G3. Trigonometric geometry (Core; AMC 10 students take B5.4 first)

| Lesson | Cards |
|---|---|
| G3.1 Laws of sines and cosines, area formulas (Core) | `law-cosines-60-120`, `law-of-cosines-special-triangles`, `herons-formula`, `triangle-13-14-15`, prereq `law-of-cosines` |
| G3.2 The extended law of sines and the circumradius (Core) | `circumradius-area`, `trig-area-circumradius` |
| G3.3 Trig identities inside triangles (Core II) | `projection-formula`, `triangle-half-angle-identities`, `ratio-lemma`, `triangle-angle-identities` |
| G3.4 Angles and lengths from trig constraints (Core II) | `trig-bash`, `altitude-bisector-angle` |
| G3.5 When trig beats coordinates or similarity (Core II) | no new card (a comparison lesson) |

### G4. Coordinate and analytic geometry (Core)

| Lesson | Cards |
|---|---|
| G4.1 Choosing good coordinates (Core) | `coordinate-bash` |
| G4.2 Lines, circles, intersections, distances, slopes (Core) | `angle-between-lines`, `section-formula`, `parallel-lines-distance`, `incenter-coordinates`, `tangency-equation`, `tangent-lines-from-point`, `angle-bisectors-of-lines` |
| G4.3 Areas from coordinates; determinants (Core) | `shoelace-formula`, `determinant-geometric` |
| G4.4 Parabolas and conics at the level of their equations (Core II) | `conic-sections`, `parabola-focus-directrix`, `ellipse-properties`, `hyperbola-properties`, `conic-tangent-lines`, `eccentricity` |
| G4.5 Loci and optimization in coordinates (Core II) | `perpendicular-bisector-locus`, `apollonius-circle`, `bisector-closer-region` |

### G5. Triangle centers and special figures (Core II)

| Lesson | Cards |
|---|---|
| G5.1 The incenter, excenters, angle-bisector geometry (Core II) | `incenter-excenter-lemma`, `perp-to-angle-bisector`, `triangle-center-angles`, *(pattern)* `angle-bisector-circumcircle` |
| G5.2 Circumcenter, orthocenter, centroid (Core II) | `orthocenter-properties`, `euler-line-ratio`, `nine-point-circle`, `euler-distance-theorem` |
| G5.3 Altitudes, medians, the medial and orthic triangles (Core II) | `medial-triangle`, `orthic-triangle`, `median-triangle-area`, `vivianis-theorem` |
| G5.4 Ceva and Menelaus as working tools (Core II) | `cevas-theorem`, `menelaus-theorem`, `trig-ceva` |
| G5.5 Recognizing common triangle figures (Core) | *(pattern)* `point-in-equilateral`, *(pattern)* `circle-in-angle`, `fermat-point`, `symmedian-lemoine`, `simson-line` |

### G6. Transformations and vectors (Core II; links to A6)

| Lesson | Cards |
|---|---|
| G6.1 Reflections, rotations, translations (Core) | `reflection-coordinates`, `reflection-composition`, `rotation-90`, `rotation-reflection-matrices`, `composing-transformations`, `rotated-line-angle` |
| G6.2 Transformations with complex numbers or coordinates (Core II) | `complex-bash`, `rotation-trick`, `rotation-center`, `spiral-similarity` |
| G6.3 Vectors: addition, dot products, projections (Core II) | `vector-dot-product`, `vector-projection`, `vector-bash`, `closing-polygon-vectors` |
| G6.4 A transformation for shortest paths and repeated shapes (Core II) | `reflect-across-the-line`, `homothety-monge`, `axis-stretch-area`, `linear-change-of-variables`, *(pattern)* `folded-paper` |

### G7. Polygons, regular figures and grids (Core)

| Lesson | Cards |
|---|---|
| G7.1 Regular polygons: chords, diagonals, angles (Core) | `polygon-angle-sums`, `regular-polygon-area`, `regular-hexagon-area`, `regular-octagon`, `regular-dodecagon`, `equilateral-triangle-facts`, `golden-ratio-pentagon`, *(pattern)* `equiangular-polygon` |
| G7.2 Cutting polygons into pieces (Core) | `area-by-pieces`, `trapezoid-parallelogram-areas`, `parallelogram-area`, `quadrilateral-diagonal-area`, `trapezoid-special-segments`, `varignons-theorem`, `circular-segment`, `inscribed-square`, `diagonal-angle-from-sides`, *(pattern)* `isosceles-trapezoid`, *(pattern)* `tethered-animal` |
| G7.3 Symmetry and rotational structure (Core II) | `figure-symmetries`, `fit-copies`, *(pattern)* `square-crossing-segments` |
| G7.4 Lattices, grids, unit geometry (Core) | `picks-theorem`, `lattice-points-gcd`, `british-flag-theorem` |
| G7.5 Counting intersections, regions and pieces (Core) | `plane-regions`, `moser-circle`, `handshakes-diagonals`, `steiner-neighborhood`, *(pattern)* `counting-shapes`, *(pattern)* `zonogon-minkowski` |

### G8. Three-dimensional geometry (Core II)

| Lesson | Cards |
|---|---|
| G8.1 Prisms, pyramids, cones, spheres (Core) | `prism-pyramid-volumes`, `cone-formulas`, `sphere-formulas`, `frustum-volume`, `cube`, `space-diagonal`, `regular-tetrahedron`, `regular-octahedron`, *(pattern)* `painted-cubes` |
| G8.2 Cross-sections and similar solids (Core) | `cross-section-method`, `plane-cross-section`, `scale-one-level`, `cavalieris-principle` |
| G8.3 Distances and angles between lines and planes (Core II) | `dihedral-angle`, `point-plane-distance`, `skew-lines-distance`, `projected-area-cosine` |
| G8.4 Coordinates in space (Core II) | `distance-3d`, `plane-intercept-form`, `cross-product-area` |
| G8.5 Solids inside and around solids (Core II) | `insphere-radius`, `spheres-two-planes`, `box-tetrahedron`, `isosceles-tetrahedron`, *(pattern)* `equal-edge-tetrahedron`, `unfold-the-surface`, `cube-nets`, `eulers-polyhedron-formula` |

### G9. Geometry extensions (Extension)

| Lesson | Cards |
|---|---|
| G9.1 Barycentric coordinates and more complex-plane geometry (Extension) | `barycentric-coordinates`, `affine-transformations` |
| G9.2 Inversion and spiral similarity (Extension) | `inversion-facts`, `inversion-properties` |
| G9.3 More relations between triangle centers (Extension) | `euler-line-parallel-side`, `exradii` link, `anticomplementary-triangle`, `contact-triangle`, `incircle-excircle-homothety` |
| G9.4 Projective tools (Extension) | `harmonic-quadrilateral`, `cross-ratio` |

---

## Book: AIME Counting & Probability

Nine chapters. The proposal names inclusion-exclusion, symmetry, binomial identities, conditioning, expected value, graphs, and geometric counting explicitly.

### C1. Systematic counting and cases (Core)

| Lesson | Cards |
|---|---|
| C1.1 Introduction | no card (the chapter's opening page: the product and sum rules, cases, complements, an organizing parameter, overcounts and small cases, with comprehension problems) |
| C1.2 Sum and product rules; building disjoint cases (Core) | `constructive-counting`, prereq `casework-method` |
| C1.3 Counting the complement (Core) | prereq `complementary-counting` (deepened) |
| C1.4 Counting by an organizing parameter (Core) | `double-summation` link, `counting-functions` |
| C1.5 Overlapping cases and double counts (Core) | `uniform-overcount` |
| C1.6 Small cases to check completeness (Core) | `simulate-the-process`, `working-backwards` |
| C1.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then C1.8 Review Problems and C1.9 Challenge Problems |

### C2. Arrangements and selections (Core)

| Lesson | Cards |
|---|---|
| C2.1 Introduction | no card (the chapter's opening page: arrangements and selections, identical objects, circles, gaps, stars and bars, positions versus values, with comprehension problems) |
| C2.2 Permutations, combinations, repeated objects (Core) | prereq `multiset-permutations` |
| C2.3 Circular arrangements and symmetry (Core) | `circular-permutations`, `necklace-formula` |
| C2.4 Adjacency and spacing restrictions (Core) | `non-adjacent-selection`, *(pattern)* `restricted-sequences`, prereq `gap-method` |
| C2.5 Stars and bars, with upper and lower bounds (Core) | `stars-and-bars`, `stars-bars-upper-bound`, `balls-boxes-table` |
| C2.6 Choosing positions versus assigning values (Core II) | `surjections`, `stirling-bell`, `fencepost-counting` |
| C2.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then C2.8 Review Problems and C2.9 Challenge Problems |

### C3. Inclusion-exclusion and complements (Core)

| Lesson | Cards |
|---|---|
| C3.1 Introduction | no card (the chapter's opening page: overlapping conditions, the complement of a union, strengths of a condition, forbidden pairs, with comprehension problems) |
| C3.2 Inclusion-exclusion with two and three sets (Core) | `inclusion-exclusion`, `pie` |
| C3.3 Derangements and forbidden positions (Core II) | `derangements` |
| C3.4 At least, at most, exactly (Core) | *(pattern)* `subset-avoiding-relation`, `subset-sum-facts` |
| C3.5 When a complement beats casework (Core) | no new card (a comparison lesson) |
| C3.6 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then C3.7 Review Problems and C3.8 Challenge Problems |

### C4. Bijections, symmetry and double counting (Core)

| Lesson | Cards |
|---|---|
| C4.1 Introduction | no card (the chapter's opening page: bijections, double counting, symmetry, binomial identities, with comprehension problems) |
| C4.2 Designing bijections (Core II) | `bijection-method`, `catalan-numbers`, `ballot-problem`, `reflection-principle` |
| C4.3 Double counting and incidences (Core) | `double-counting`, `committee-chair`, `nested-subset-pairs` |
| C4.4 Using symmetry safely (Core) | `symmetry-probability`, `burnsides-lemma` (the proposal lists Burnside as Extension; the card is AMC tier and high importance, so it stays Core, to be confirmed by the audit) |
| C4.5 Binomial coefficients and their identities (Core) | `pascals-identity`, `binomial-row-sums`, `hockey-stick`, `vandermonde`, `squared-binomial-sum`, `multinomial-theorem`, `binomial-theorem` |
| C4.6 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then C4.7 Review Problems and C4.8 Challenge Problems |

### C5. Recursion, states and processes (Core; links to A3)

| Lesson | Cards |
|---|---|
| C5.1 Introduction | no card (the chapter's opening page: what recursions, states, processes and invariants are, with comprehension problems) |
| C5.2 Choosing states for a counting recursion (Core) | `recursive-counting` |
| C5.3 Linear recurrences from arrangements and paths (Core) | *(pattern)* `tiling-a-board` |
| C5.4 Transitions, boundary cases, small tables (Core) | `grid-path-fill`, `backward-induction` |
| C5.5 Invariants and parity in finite processes (Core II) | `invariants-coloring`, `monovariant` |
| C5.6 Grid paths and restricted walks (Core) | `grid-paths` |
| C5.7 Winning probabilities from states (Markov chains) (Core II) | `states-recursion-prob` |
| C5.8 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then C5.9 Review Problems and C5.10 Challenge Problems |

### C6. Probability through counting (Core)

| Lesson | Cards |
|---|---|
| C6.1 Introduction | no card (the chapter's opening page: equally likely outcomes, conditioning, independence, complements, lengths and areas, with comprehension problems) |
| C6.2 Building the sample space; equally likely outcomes (Core) | *(pattern)* `drawing-without-replacement`, prereq `basic-probability` |
| C6.3 Conditional probability; updating the sample space (Core) | `bayes-theorem`, prereq `conditional-probability` |
| C6.4 Independence, dependence, sampling without replacement (Core) | `hypergeometric`, `binomial-probability` |
| C6.5 Complements and inclusion-exclusion for probability (Core) | no new card (links C3) |
| C6.6 Probability in arrangements and regions (Core) | `geometric-probability` |
| C6.7 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then C6.8 Review Problems and C6.9 Challenge Problems |

### C7. Expected value and random processes (Core II)

| Lesson | Cards |
|---|---|
| C7.1 Introduction | no card (the chapter's opening page: expected value, linearity and indicators, conditioning, waiting times, with comprehension problems) |
| C7.2 Linearity of expectation with indicators (Core) | `expected-value`, `indicator-variables` |
| C7.3 Expected counts and contributions (Core II) | `expected-fixed-points`, `tail-sum-expectation` |
| C7.4 Conditional expectation in a small process (Core II) | `total-expectation` (assumes `states-recursion-prob`, taught in C5.7) |
| C7.5 Waiting times and recursive expectations (Core II) | `geometric-distribution`, `gamblers-ruin`, `turn-based-games` |
| C7.6 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then C7.7 Review Problems and C7.8 Challenge Problems |

### C8. Graphs, grids and combinatorial structures (Core II)

| Lesson | Cards |
|---|---|
| C8.1 Introduction | no card (the chapter's opening page: graphs and degrees, shapes on grids, coloring arguments, pigeonhole and extremal arguments, with comprehension problems) |
| C8.2 The handshake lemma and degree counting (Core II) | `handshake-lemma`, `tree-basics`, `eulerian-paths`, *(pattern)* `round-robin-tournaments` |
| C8.3 Counting cells and shapes on grids (Core) | `rectangles-in-grid` |
| C8.4 Coloring and parity (Core II) | `coloring-arguments`, `graph-coloring` |
| C8.5 Extremal arguments and pigeonhole (Core II) | `pigeonhole`, `pigeonhole-argument`, `extremal-principle`, `pairing-to-bound` |
| C8.6 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then C8.7 Review Problems and C8.8 Challenge Problems |

### C9. Counting and probability extensions (Extension)

| Lesson | Cards |
|---|---|
| C9.1 Introduction | no card (the chapter's opening page: generating functions, cycles of a permutation, continuous random numbers, transfer matrices, games and logic, with comprehension problems) |
| C9.2 Generating functions for simple coefficient counts (Extension) | `generating-function-method`, `partitions` |
| C9.3 More symmetry: Burnside in depth, cycle structure (Extension) | `permutation-cycle-structure` |
| C9.4 Geometric probability beyond simple regions (Extension) | `product-of-uniforms`, `order-statistics`, `variance-independence` |
| C9.5 More recursions and random processes; games (Extension) | `transfer-matrix-method`, `strategy-stealing`, *(pattern)* `truth-tellers-logic`, *(pattern)* `magic-squares` |
| C9.6 Summary | no card (the chapter's ideas, then Problem Solving Strategies); then C9.7 Review Problems and C9.8 Challenge Problems |

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
