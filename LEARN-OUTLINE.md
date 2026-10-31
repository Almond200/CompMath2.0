# Learn: the outline of every book, chapter and lesson

This file is step L2 of `PLAN.md`: the contents of the Learn section, planned before anything is written or built (owner, 2026-10-31). The plan says what to do; this file says what each book holds. It is a planning document. Nothing in it is in the app yet.

**Status (2026-10-31):**
- The shelf is a draft that waits on LQ4 in `QUESTIONS.md`.
- Only the AIME Number Theory book has its chapters mapped to cards.
- Only the pilot chapter, Modular Exponent Cycles, has its lessons planned.

**How to read an entry.**
- Card ids are real (`#/f/<id>` opens them).
- Problems are named as in the database ("2018 AIME I #11"). A problem marked **(read)** has had its strategy read and fits the lesson. One marked **(to read)** was found by its tags and still has to be checked against its strategy before it stays.
- Every number in a worked example or a check has been computed (Python), unless it is marked otherwise.

## The lesson template

Each lesson follows the blueprint's eight beats. The outline fills in the parts marked here.

1. **Opening question:** a small question that shows why the idea is needed (outline: the question and its answer).
2. **What it assumes:** the cards a reader should know first, AMC-level ones included (outline: `prereqCards`).
3. **The new idea:** short connecting prose with one simple derivation. It links to the card and never copies it (outline: one line on what the prose must get across).
4. **The cards:** 1 to 3 canonical cards, opened in the drawer (outline: `cards`).
5. **Worked example:** the computation, and also the clue that made the approach promising (outline: the example and its clue).
6. **Checks:** 1 to 3 short questions right after the idea, each answered with one line of why (outline: the question and its answer).
7. **Lesson problems:** 3 to 5 contest problems that use the lesson, harder than the checks. Their strategy stays hidden until the student has tried them (LQ6).
8. **Wrap-up:** the key clues, and a pointer to the next lesson.

A chapter ends with a **review set** of 8 to 12 mixed contest problems that combine its lessons and name no method in advance. Each contest problem has one place on the whole shelf (LQ8), and AMC 10/12 twins count as one problem.

---

## The shelf (draft; waits on LQ4)

| Book | For | Chapters (draft) |
|---|---|---|
| **AMC → AIME Bridge** | strong AMC 10/12 students starting the AIME | useful substitutions; polynomial roots; modular basics; counting with restrictions; circle geometry; checking domain and distinctness |
| **AIME Algebra** | AIME | symmetric expressions; recurrences; root transformations; complex numbers; inequalities and bounds |
| **AIME Number Theory** | AIME | mapped below |
| **AIME Geometry** | AIME | similarity and area ratios; circles and power of a point; trigonometric methods; coordinates versus synthetic routes |
| **AIME Counting & Probability** | AIME | cases and complements; bijections; restricted arrangements; states and recursion; probability through counting |
| *AMC 10/12 books (if LQ4 says yes)* | AMC 10/12 | one per subject, following the AMC routes in `js/data/built-in-lists.js` |

The bridge book's chapters are kept short, and the AIME books link back to them as prerequisites. A student can start any chapter of any book: its "What it assumes" links lead back to what is needed.

---

## Book: AIME Number Theory

**For:** students who know the AMC number theory route (divisibility, gcd and lcm, basic congruences). **Goal:** the AIME's recurring number theory moves, and how to tell which one a problem wants.

| # | Chapter | Main cards | Status |
|---|---|---|---|
| 1 | Divisors and prime exponents | `number-of-divisors`, `sum-of-divisors`, `product-of-divisors`, `perfect-square-divisors`, `lcm-pair-counting`, `exponent-tracking`, `factor-pair-counting` | chapters only |
| 2 | **Modular exponent cycles (pilot)** | `cycle-hunting`, `fermats-little-theorem`, `multiplicative-order`, `eulers-theorem`, `crt` | lessons planned below |
| 3 | Solving congruences | `modular-inverse`, `extended-euclidean-algorithm`, `crt-solution-counting`, `subtract-equal-remainders`, `hensel-lifting` | chapters only |
| 4 | Valuations | `p-adic-valuation`, `legendres-formula`, `trailing-zeros`, `lte-lemma` and `lte`, `prime-divides-binomial`, `lucas-theorem` | chapters only |
| 5 | Diophantine bounds | `bounding-diophantine`, `squeeze-between-squares`, `gcd-substitution`, `difference-of-squares-rep`, `pythagorean-triples`, `chicken-mcnugget`, the pattern `quadratic-perfect-square` | chapters only |
| 6 | Bases, digits and decimals | `base-conversion`, `numeral-as-polynomial`, the pattern `unknown-base`, `digit-sum-carries`, `repeating-decimals`, the pattern `digit-manipulation` | chapters only |

**Order to settle:**
- The pilot teaches the Chinese Remainder Theorem in its lesson 4 (as the blueprint has it), so chapter 3 assumes CRT and goes on to inverses, counting solutions and lifting.
- Problems that need lifting the exponent or Hensel lifting wait for chapters 3 and 4, even when they also use orders.

### Chapter 2: Modular exponent cycles (pilot)

**Goal:** choose well among a direct residue cycle, Fermat's Little Theorem, the multiplicative order, and splitting the modulus with CRT.

**What it assumes:** `modular-basics` (Congruence Rules), `euclids-lemma`, and `gcd-lcm-product` for the lcm of two periods.

#### Lesson 2.1: Powers repeat

- **Opening question:** what is the units digit of $7^{202}$? The powers of $7$ mod $10$ run $7, 9, 3, 1$ and then repeat, and $202 = 4\cdot50 + 2$, so the digit is $9$.
- **New idea:** there are only finitely many residues, so the powers must eventually repeat, and once one power repeats, everything after it repeats too. Find the period, then reduce the exponent modulo the period.
- **Cards:** `cycle-hunting` (Finding the Period).
- **Clue:** a huge exponent and a small modulus.
- **Checks:**
  - the units digit of $7^{203}$ is $3$;
  - $2^n \bmod 7$ runs $2, 4, 1$, so $2^{100} \equiv 2 \pmod 7$.
- **Lesson problems:**
  - 2003 AMC 10A #16, the units digit of $13^{2003}$ (to read);
  - 2025 AMC 12B #9, the tens digit of $6^{6^6}$ (to read; it may suit lesson 2.4 better);
  - 2017 AIME I #3 (read: the units digits of triangular numbers repeat with period $20$, a cycle that is not one of powers).

#### Lesson 2.2: Prime modulus shortcuts

- **Opening question:** what is $2^{1000} \bmod 13$? Listing powers up to the repeat would take twelve steps. Fermat's Little Theorem gives $2^{12} \equiv 1$ at once, $1000 = 12\cdot83 + 4$, and $2^4 = 16 \equiv 3$.
- **New idea:** for a prime modulus, a theorem guarantees a period of $p - 1$, but only when the base is coprime to $p$. The coprimality condition is part of the lesson.
- **Cards:** `fermats-little-theorem`.
- **Clue:** a prime modulus, and a period too long to find by listing.
- **Checks:**
  - $5^{1000} \bmod 13$ is $1$, since $12 \cdot 83 = 996$ and $5^4 \equiv 1$;
  - why $13^{1000} \bmod 13$ cannot be found this way.
- **Lesson problems:**
  - 2017 AMC 10B #14 (to read);
  - 1989 AIME #9 (read: $n^5 \equiv n \pmod 5$, with CRT and a size bound);
  - 2002 AIME I #7 (read: $10^6 \equiv 1 \pmod 7$ gives the digits of $\frac{10^{859}}{7}$).
- **Note:** 1989 AIME #9 also uses CRT. It may move to the review set once lesson 2.4 is written.

#### Lesson 2.3: Shorter periods

- **Opening question:** what is $3^{202} \bmod 13$? Fermat promises period $12$, but $3^3 = 27 \equiv 1$, so the period is $3$, and $202 = 3\cdot67 + 1$ gives $3$.
- **New idea:** the period Fermat guarantees need not be the smallest one. The smallest is the order, and the order divides every exponent that gives $1$, including $p - 1$.
- **Cards:** `multiplicative-order`.
- **Clue:** "least $n$ with $a^n \equiv 1$", or a power that comes back to $1$ early.
- **Checks:**
  - the order of $3$ mod $13$ is $3$ and the order of $2$ mod $13$ is $12$, so check only the divisors of $12$;
  - the order of $10$ mod $101$ is $4$, since $10^2 \equiv -1$.
- **Lesson problems:**
  - 2018 AMC 10B #13 (read: the order of $10$ mod $101$; choice C, $505$);
  - 2016 AMC 12B #22 (read: the period of $\frac1n$ is the order of $10$; it assumes `repeating-decimals`);
  - 2019 AIME I #14 (read: an order of exactly $16$ forces $p \equiv 1 \pmod{16}$; answer $97$).

#### Lesson 2.4: Composite moduli

- **Opening question:** what are the last two digits of $3^{2026}$?
  - **Route 1:** Euler's theorem gives $3^{40} \equiv 1 \pmod{100}$, but the order is $20$, and $2026 \equiv 6 \pmod{20}$, so $3^6 = 729$ gives $29$.
  - **Route 2:** split the modulus. $3^{2026} \equiv 1 \pmod 4$, and $3^{2026} \equiv 4 \pmod{25}$, since the order of $3$ mod $25$ is $20$. CRT then gives $29$.
- **New idea:** Euler's theorem extends Fermat to any modulus coprime to the base. When the modulus factors, work modulo each prime power, then join the answers with CRT.
- **Cards:** `eulers-theorem`, `crt`.
- **Clue:** a modulus like $100$ or $1000$, or the words "last two (three) digits".
- **Checks:**
  - the number $x$ with $x \equiv 1 \pmod 4$ and $x \equiv 4 \pmod{25}$ is $29$;
  - $\varphi(100) = 40$.
- **Lesson problems:**
  - 2011 AIME I #11 (read: the order of $2$ mod $125$ is $100$, and CRT with $8$; answer $7$);
  - 2024 AMC 10B #18, with its twin 2024 AMC 12B #14 (to read);
  - 2018 AIME I #11 (read: the orders $5$ mod $121$ and $39$ mod $169$, joined by lcm; answer $195$).

#### Lesson 2.5: Choosing an approach

- **Opening question:** what are the last two digits of $2^{2026}$? Euler's theorem does not apply, because $2$ shares a factor with $100$. Split the modulus instead:
  - $2^{2026} \equiv 0 \pmod 4$;
  - the order of $2$ mod $25$ is $20$, so $2^{2026} \equiv 2^6 \equiv 14 \pmod{25}$;
  - CRT gives $64$.
- **New idea:** compare the cues side by side.

  | Cue | Approach |
  |---|---|
  | a small modulus | list the powers |
  | a prime modulus | Fermat |
  | a power that returns to $1$ early | the order |
  | a factorable modulus, or a base that shares a factor with it | split with CRT |

  This lesson adds no new card. Its prose is a comparison of the four.
- **Cards:** all of the chapter's cards, linked from the comparison table.
- **Checks:** for each of three short prompts, name the approach first, then compute (to write in L2).
- **Lesson problems:** 2021 AIME II #13 (read: $1000 = 8\cdot125$, and the order of $2$ mod $125$; it combines every lesson).

#### Chapter 2 review set

These are candidates, chosen so that no lesson is named. Each needs reading before it stays, and the set needs 8 to 12 problems in all.
- 2021 AIME I #14 (read: Fermat and a primitive root; prime factors of $n = \operatorname{lcm}(42, 43, 46, 47)$);
- 2023 AIME II #15 (read: the order of $2$ mod $23$ is $11$; it assumes `modular-inverse` and `base-conversion`);
- 2016 AMC 12B #25 (read: the order of $2$ mod $19$ is $18$; it assumes `linear-recurrence`);
- 2015 AMC 12A #22 (to read: recursion, a cycle and CRT);
- 2025 AIME II #13 (to read);
- 2017 AMC 10B #14 or 2003 AMC 10A #16, if they move here from their lessons.

Moved out of this chapter:
- 2020 AIME I #12 needs lifting the exponent, so it goes to chapter 4.
- 2024 AIME I #13 needs Hensel lifting, so it goes to chapter 3.

**Still to do for the pilot (L2):**
- read every "(to read)" problem;
- fill the review set to 8 to 12;
- write the lesson 2.5 checks;
- check that the cards this chapter assumes cover every step of the chosen problems.

---

## Books still to map

These books have chapter titles only (above): AMC → AIME Bridge, AIME Algebra, AIME Geometry, and AIME Counting & Probability. Each gets the same treatment as AIME Number Theory, in that order, after the owner approves the pilot chapter's outline.
