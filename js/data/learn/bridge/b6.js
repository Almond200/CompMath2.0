// Learn, AMC to AIME Bridge, chapter B6: constraints, computation and checking (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["B6"] = {
  lessons: {
    "B6.1": {
      prereq: ["transforming-equations", "quadratic-formula"],
      cards: ["quadratic-root-location"],
      body: String.raw`Many wrong answers come not from a wrong method but from a condition forgotten along the way: a square root that must be nonnegative, a logarithm whose argument must be positive, a length that must be positive, numbers that must be distinct integers. The AIME rewards the habit of carrying every constraint through a solution and checking candidates against all of them at the end.

Each operation has a domain. $\sqrt t$ needs $t \ge 0$ and is itself nonnegative; $\log t$ needs $t \gt 0$; a fraction needs a nonzero denominator. Squaring both sides of $\sqrt{x + 5} = x - 1$ gives $x^2 - 3x - 4 = 0$, with roots $4$ and $-1$, but $x - 1$ must be nonnegative, so only $x = 4$ solves the original. A substitution such as $u = x^2 + x$ or $t = \log x$ produces a new variable with its own range, and solutions of the new equation outside that range must be discarded. Nested definitions shrink the domain at every level.

[[quadratic-root-location|Locating the roots of a quadratic without solving]] decides questions such as "for which $m$ are both roots positive" from the discriminant, the vertex and values at boundary points. For $x^2 - mx + 4$, both roots are real and positive exactly when $m^2 - 16 \ge 0$ and the sum $m$ is positive (the product $4$ is already positive), that is $m \ge 4$. Sign conditions on the roots come from Vieta: both positive when the sum and product are positive, opposite signs when the product is negative.

Integrality and distinctness are constraints too: an answer that requires a fractional count of people, or two equal numbers that were said to be different, signals a lost condition. List all the conditions at the start, carry them through, and check the candidates at the end. The next lesson treats the cases a figure or a count may hide.`,
      related: [
        { card: "vietas-quadratic", note: String.raw`signs of the roots from their sum and product (B2.2).` },
        { card: "log-rules", note: String.raw`the domain of logarithms (A4.4).` },
        { card: "absolute-value-rules", note: String.raw`conditions that split into cases (B1.4).` }
      ],
      exercises: [
        { q: String.raw`Solve $\sqrt{x + 5} = x - 1$.`, answer: "4",
          solution: String.raw`Squaring gives $x + 5 = x^2 - 2x + 1$, so $x^2 - 3x - 4 = (x - 4)(x + 1) = 0$. The right side must be nonnegative, so $x \ge 1$, which rules out $-1$. Check $x = 4$: $\sqrt9 = 3$. The solution is $4$.` },
        { q: String.raw`Find the smallest positive integer $m$ for which $x^2 - mx + 4 = 0$ has two real roots (possibly equal), both positive.`, answer: "4",
          solution: String.raw`Real roots need $m^2 - 16 \ge 0$, and positive roots need sum $m \gt 0$ and product $4 \gt 0$. So $m \ge 4$, and $m = 4$ gives the double root $2$.` }
      ],
      problems: [
        "2014 AMC 12A, Problem 18",
        "2008 AMC 12A, Problem 12",
        "2011 AMC 12A, Problem 21",
        "2010 AMC 12A, Problem 24",
        "2003 AMC 12A, Problem 25",
        "2025 AMC 12A, Problem 25",
        "1984 AIME, Problem 4",
        "1998 AIME, Problem 14"
      ]
    },
    "B6.2": {
      prereq: ["organized-listing"],
      cards: ["directed-lengths"],
      body: String.raw`A figure in a problem is usually drawn in one way, but the conditions often allow several: a point may be on either side of a line, a triangle may be acute or obtuse, a circle may be inside or outside another. Counting problems hide the same danger as double counts. Finding every configuration, and no configuration twice, is a habit that saves many points.

[[directed-lengths|Directed lengths]] keep track of which side a point is on. If $AB = 5$ and $BC = 3$ on a line, then $AC$ is $8$ or $2$, depending on whether $C$ is beyond $B$ or between, and both must be considered unless the problem rules one out. Using signed coordinates on the line, or signed distances to a line, handles all cases in one computation: the answer comes out with a sign, and its absolute value is the length. The same care applies to angles (an inscribed angle on the other arc is supplementary) and to areas computed as differences.

Degenerate cases deserve a check: three points that happen to be collinear, a triangle that collapses, a quadrilateral that crosses itself, or a polynomial whose leading coefficient vanishes. Problems often state "nondegenerate" precisely because a count would otherwise include them.

[[organized-listing|Organized listing]] prevents missed and doubled cases: fix an order of decisions, list cases in that order, and check that each object appears exactly once. In counting configurations, decide whether objects related by symmetry count as the same before listing.

Draw every configuration the words allow, compute with signed quantities, and list systematically. The next lesson estimates and tests.`,
      related: [
        { card: "casework-method", note: String.raw`splitting into disjoint cases (B4.2).` },
        { card: "uniform-overcount", note: String.raw`counting each object the same number of times and dividing (C1.5).` },
        { card: "triangle-inequality", note: String.raw`the condition for a nondegenerate triangle (B5.1).` }
      ],
      exercises: [
        { q: String.raw`Points $A$, $B$, $C$ lie on a line with $AB = 5$ and $BC = 3$. Find the sum of the possible values of $AC$.`, answer: "10",
          solution: String.raw`Put $A = 0$ and $B = 5$. Then $C = 8$ or $C = 2$, so $AC = 8$ or $2$, and the sum is $10$.` }
      ],
      problems: [
        "2015 AMC 10A, Problem 10",
        "2015 AMC 10B, Problem 16",
        "2014 AMC 12B, Problem 12",
        "2015 AMC 10B, Problem 24",
        "2015 AMC 12B, Problem 22"
      ]
    },
    "B6.3": {
      prereq: [],
      cards: ["estimating-answers", "sqrt-approximation", "disproof-by-counterexample"],
      body: String.raw`Before computing exactly, estimate. An estimate rules out answer choices, catches arithmetic slips, and sometimes is all a multiple-choice question needs. Small cases play the same role for claims: one counterexample disproves a statement, and a few checked cases make a pattern believable.

[[estimating-answers|Estimating]] replaces numbers by convenient nearby ones and tracks which way each change moves the result. Rounding the numerator up and the denominator down overestimates a fraction; a sum of many terms near $1$ is near the number of terms. On multiple-choice questions, the choices are often far enough apart that a rough estimate picks one, and on the AIME an estimate checks that a final answer is in the right range.

[[sqrt-approximation|Approximating square roots]] starts from the nearest perfect square: $\sqrt{n^2 + k} \approx n + \tfrac{k}{2n}$ for small $k$. Since $45^2 = 2025$, $\lfloor\sqrt{2026}\rfloor = 45$ and $\sqrt{2026} \approx 45.011$. Bounds between consecutive integers decide floors and counts of squares in ranges.

[[disproof-by-counterexample|A counterexample]] is a complete disproof: to show that "every $n$ with property $P$ has property $Q$" is false, one $n$ suffices. Questions that ask which statement is not always true, or which value disproves a claim, are answered by testing small or extreme cases: zero, negative numbers, equal values, and the smallest numbers satisfying the hypothesis.

Estimate first, test small cases, and look for the counterexample before trying to prove a general claim. The last lesson collects the habits for AIME answers.`,
      related: [
        { card: "floor-basics", note: String.raw`floors of square roots and quotients (A4.3).` },
        { card: "bernoulli-inequality", note: String.raw`linear bounds on powers, a tool for estimates (A5.5).` },
        { card: "simulate-the-process", note: String.raw`small cases of a process as a test (C1.6).` }
      ],
      exercises: [
        { q: String.raw`Find $\lfloor\sqrt{2026}\rfloor$.`, answer: "45",
          solution: String.raw`$45^2 = 2025 \le 2026 \lt 2116 = 46^2$, so the floor is $45$.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 2",
        "2019 AMC 10B, Problem 2",
        "2017 AMC 10B, Problem 3",
        "2012 AMC 10B, Problem 6",
        "2014 AMC 10A, Problem 7",
        "2015 AMC 12A, Problem 5",
        "2016 AMC 12A, Problem 5",
        "2008 AMC 10B, Problem 12",
        "2018 AMC 10A, Problem 14",
        "2013 AMC 12A, Problem 21"
      ]
    },
    "B6.4": {
      prereq: ["estimating-answers"],
      cards: [],
      body: String.raw`An AIME answer is an integer from $0$ to $999$, and the format shapes how problems are posed and how they are checked. Answers are often of the form $m + n$ for a fraction $\tfrac mn$ in lowest terms, or $a + b + c$ for an expression $a\sqrt b + c$ with $b$ squarefree, or a remainder modulo $1000$. Getting the form right is part of the solution.

Keep everything exact until the end: fractions as fractions, radicals as radicals, and $\pi$ as a symbol. Decimal approximations hide whether a number is rational and lose the information the answer format asks for. Reduce fractions fully before adding numerator and denominator ($0.375 = \tfrac38$ gives $11$), and write radicals with squarefree radicands. When the answer is a remainder, reduce modulo $1000$ during the computation, not after: $2^{20} = 1048576$ leaves $576$.

The range check is the last line of defense. An answer that is negative, larger than $999$, or not an integer where one was expected signals a lost condition or an arithmetic slip; so does an answer of $0$ for a problem whose objects clearly exist. Recompute the final steps another way when possible: check a count on a small case, a length with a different triangle, a probability by its complement.

Finally, reread the question. Many errors answer a slightly different question than the one asked: the sum instead of the product, the number of values instead of the values, the smallest instead of the largest. The problems that follow are a mixed review in which the final check matters.`,
      related: [
        { card: "modular-basics", note: String.raw`computing remainders modulo $1000$ as you go (B3.2).` },
        { card: "rationalizing", note: String.raw`writing radical answers in standard form (B1.1).` },
        { card: "complementary-counting", note: String.raw`checking a probability or count through its complement (B4.2).` }
      ],
      exercises: [
        { q: String.raw`The answer to a problem is the probability $0.375$, to be reported as $m + n$ where $\tfrac mn$ is the probability in lowest terms. What is reported?`, answer: "11",
          solution: String.raw`$0.375 = \tfrac{3}{8}$ in lowest terms, so $m + n = 11$.` },
        { q: String.raw`Find the remainder when $2^{20}$ is divided by $1000$.`, answer: "576",
          solution: String.raw`$2^{10} = 1024 \equiv 24 \pmod{1000}$, so $2^{20} \equiv 24^2 = 576$.` }
      ],
      problems: [
        "2024 AMC 12B, Problem 24",
        "1996 AIME, Problem 8"
      ]
    }
  }
};
