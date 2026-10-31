// Learn, AMC Algebra, chapter L14: from the AMC to the AIME, algebra (CONVENTIONS §14). Part: Toward the AIME.
// No new cards: the habits the AIME asks for, on harder mixed problems. Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L14"] = {
  lessons: {
    "L14.1": {
      prereq: ["transforming-equations", "quadratic-root-location"],
      cards: [],
      body: String.raw`This chapter teaches no new tool. It is about the habits that turn the tools of this book into correct answers on harder problems, the late AMC 12 problems and the AIME, where the technique is not named and the answer is an integer from $0$ to $999$ with no choices to check against.

The first habit is to keep track of the domain through every substitution. A substitution such as $y = \sqrt x$ or $t = 2^x$ turns an equation into a familiar one, but the new unknown has restrictions, $y \ge 0$ and $t \gt 0$, that decide which of its solutions are real. Solving $x - 5\sqrt x + 6 = 0$ with $y = \sqrt x$ gives $y = 2$ or $3$, so $x = 4$ or $9$; both are allowed here, but in other problems one root of the substituted equation must be thrown away.

The second habit is exact arithmetic aimed at the required form. AIME answers are integers, so an answer is often asked as $m + n$ for a fraction $\tfrac mn$ in lowest terms, as $a + b$ for $a\sqrt b$, or as a remainder modulo $1000$. A fraction $\tfrac{12}{18}$ must be reduced to $\tfrac23$ before adding, giving $5$, not $30$.

The third habit is the final check: substitute the answer back, confirm that it lies in the range $0$ to $999$, and reread what was asked.

The lessons take these habits in turn: domain, positivity and integrality through a substitution (L14.2), the AIME answer (L14.3), and mixed problems across the book (L14.4). The Summary (L14.5) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the sum of the solutions of $x - 5\sqrt x + 6 = 0$.`, answer: "13",
          solution: String.raw`With $y = \sqrt x \ge 0$: $y^2 - 5y + 6 = 0$, so $y = 2$ or $3$, both allowed, and $x = 4$ or $9$. The sum is $13$.` },
        { q: String.raw`An answer is the fraction $\tfrac{12}{18}$, and the problem asks for $m + n$ where $\tfrac mn$ is in lowest terms. What should be entered?`, answer: "5",
          solution: String.raw`Reduce first: $\tfrac{12}{18} = \tfrac23$, so $m + n = 5$.` },
        { q: String.raw`Solve $\log_2(x - 1) + \log_2(x + 1) = 3$.`, answer: "3",
          solution: String.raw`Combine: $\log_2(x^2 - 1) = 3$, so $x^2 = 9$ and $x = \pm 3$. Only $x = 3$ keeps both arguments positive.` }
      ],
      problems: [
        "1986 AIME, Problem 1",
        "1986 AIME, Problem 5",
        "1983 AIME, Problem 1"
      ]
    },
    "L14.2": {
      prereq: ["transforming-equations", "quadratic-root-location", "vietas-quadratic"],
      cards: [],
      body: String.raw`Many harder problems become routine after a substitution, but the substitution carries conditions that the original variables imposed: a square root is nonnegative, $2^x$ is positive, $x + \tfrac1x$ is at least $2$ for positive $x$, and integer variables stay integers. Forgetting a condition gives an extra answer or a wrong extreme; using it often finishes the problem.

When $t$ replaces an expression, write down the range of $t$ at once. For positive $x$, $t = x + \tfrac1x \ge 2$, so the least value of $x^2 + \tfrac1{x^2} - 3\left(x + \tfrac1x\right) = t^2 - 3t - 2$ is not at the vertex $t = \tfrac32$, which is out of range, but at $t = 2$, where it is $-4$. For $\sin t + \cos t = u$, the range is $|u| \le \sqrt2$. After solving for the new variable, discard the values outside its range before going back.

Integer conditions work the same way. If a quadratic $x^2 - ax + 2a$ must have integer roots $r$ and $s$, Vieta gives $r + s = a$ and $rs = 2a$, so $rs - 2r - 2s = 0$ and $(r - 2)(s - 2) = 4$. The factor pairs of $4$, with both signs, give $a = 9, 8, 0, -1$: four values. A product equal to a constant, or a discriminant that must be a perfect square, is the usual way an integer condition enters.

Write the range of every substitute as soon as you introduce it, and turn integer conditions into factorizations. The next lesson turns to the form of the answer.`,
      related: [
        { card: "quadratic-root-location", note: String.raw`where the roots of a quadratic with a parameter lie (L3.4).` },
        { card: "sfft", note: String.raw`turning an integer condition into a product of factors.` }
      ],
      exercises: [
        { q: String.raw`Find the least value of $x^2 + \tfrac1{x^2} - 3\left(x + \tfrac1x\right)$ for $x \gt 0$.`, answer: "-4",
          solution: String.raw`With $t = x + \tfrac1x \ge 2$, the expression is $t^2 - 2 - 3t$, which increases for $t \ge \tfrac32$. So the least value is at $t = 2$ ($x = 1$): $4 - 2 - 6 = -4$.` },
        { q: String.raw`For how many integers $a$ does $x^2 - ax + 2a = 0$ have two integer roots (possibly equal)?`, answer: "4",
          solution: String.raw`With roots $r$, $s$: $r + s = a$ and $rs = 2a$, so $(r - 2)(s - 2) = 4$. The pairs $(1, 4)$, $(2, 2)$, $(-1, -4)$, $(-2, -2)$ and their reversals give $(r, s) = (3, 6), (4, 4), (1, -2), (0, 0)$, so $a = 9, 8, -1, 0$: four values.` },
        { q: String.raw`Solve $\sqrt{x + 3} + \sqrt x = 3$.`, answer: "1",
          solution: String.raw`Write $\sqrt{x + 3} = 3 - \sqrt x$, which needs $\sqrt x \le 3$. Squaring: $x + 3 = 9 - 6\sqrt x + x$, so $\sqrt x = 1$ and $x = 1$. Check: $2 + 1 = 3$.` }
      ],
      problems: [
        "1991 AIME, Problem 8",
        "1995 AIME, Problem 7",
        "1983 AIME, Problem 5",
        "1986 AIME, Problem 4"
      ]
    },
    "L14.3": {
      prereq: ["exponent-laws"],
      cards: [],
      body: String.raw`An AIME answer is an integer from $0$ to $999$, entered with no choices to compare. That changes how a problem is finished: the arithmetic must be exact, the answer must be put into the requested form, and a wrong form gives a wrong answer even when the mathematics is right.

Work exactly. Keep fractions as fractions and radicals as radicals until the end; a decimal approximation can hide a final cancellation. When a problem asks for $m + n$ where $\tfrac mn$ is in lowest terms, reduce first: a probability of $\tfrac{6}{16}$ is $\tfrac38$, and the answer is $11$. When it asks for $a + b$ where the answer is $a\sqrt b$ with $b$ squarefree, simplify the radical fully: $50\sqrt3$ gives $53$.

Large answers are asked modulo $1000$, the last three digits. Reduce at every step rather than computing a huge number: $2^{10} = 1024 \equiv 24$, so $2^{20} \equiv 24^2 = 576 \pmod{1000}$.

Finally, check. Substitute the answer into the original conditions, confirm it is an integer in range (a negative number or a fraction signals an error), and reread the question: whether it asks for $x$ or $x^2$, a sum or a product, the number of solutions or their sum.

Make these steps automatic on every AIME-style problem. The next lesson practices them on mixed problems from the whole book.`,
      related: [
        { card: "modular-basics", note: String.raw`reducing modulo $1000$ at every step.` },
        { card: "estimating-answers", note: String.raw`a rough estimate catches an answer of the wrong size (L8.6).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $2^{20}$ is divided by $1000$.`, answer: "576",
          solution: String.raw`$2^{10} = 1024 \equiv 24 \pmod{1000}$, so $2^{20} \equiv 24^2 = 576$. (Indeed $2^{20} = 1048576$.)` },
        { q: String.raw`A probability works out to $\tfrac{6}{16}$, and the answer is to be given as $m + n$ for $\tfrac mn$ in lowest terms. What is it?`, answer: "11",
          solution: String.raw`$\tfrac{6}{16} = \tfrac38$, so $m + n = 11$.` },
        { q: String.raw`An area works out to $\sqrt{7500}$, and the answer is to be given as $a + b$ for $a\sqrt b$ with $b$ squarefree. What is it?`, answer: "53",
          solution: String.raw`$\sqrt{7500} = \sqrt{2500 \cdot 3} = 50\sqrt3$, so $a + b = 53$.` }
      ],
      problems: [
        "1984 AIME, Problem 1",
        "1985 AIME, Problem 1",
        "1988 AIME, Problem 3",
        "1994 AIME, Problem 3"
      ]
    },
    "L14.4": {
      prereq: ["vietas-general", "log-rules", "telescoping", "complex-basics"],
      cards: [],
      body: String.raw`The problems in this lesson come from across the book and do not say which tool they need. A logarithmic equation may hide a quadratic; a polynomial may have roots of unity as roots; a strange recursion may telescope. The skill is to recognize the structure, choose the tool, and finish with the habits of the last two lessons.

Start by asking what kind of object the problem is about: an equation, a sequence, a polynomial, a function, a complex number. Then look for the move that makes it familiar. A product of logarithms or a sum of logarithms in related bases calls for a common base. A recursion written with products, such as $x_nx_{n-1} = n$, calls for multiplying neighboring terms. An expression like $z^6 + z^3 + 1$ is $\tfrac{z^9 - 1}{z^3 - 1}$, so its roots are roots of unity. A question about a symmetric function of roots calls for Vieta, not for the roots.

When stuck, compute small cases, substitute simple values, or try to find a quantity the problem determines even though the individual unknowns are not determined. The examples below are short versions of these moves: the roots of $x^2 - 10x + 1$ have cubes adding to $1000 - 30 = 970$ by Vieta; $\log_2 x + \log_4 x + \log_8 x = 11$ is $\tfrac{11}{6}\log_2 x = 11$ in one base, so $x = 64$; and $\sum_{k=1}^{99} \tfrac{1}{\sqrt k + \sqrt{k + 1}}$ telescopes to $\sqrt{100} - 1 = 9$.

Name the object, find the move that makes it familiar, and finish with exact arithmetic and a check. The Summary (L14.5) collects the book's last strategies.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`symmetric functions of roots without the roots (L3.3).` },
        { card: "roots-of-unity", note: String.raw`polynomials that divide $z^n - 1$ (L13.4).` }
      ],
      exercises: [
        { q: String.raw`The roots of $x^2 - 10x + 1$ are $r$ and $s$. Find $r^3 + s^3$.`, answer: "970",
          solution: String.raw`With $r + s = 10$ and $rs = 1$: $r^3 + s^3 = (r + s)^3 - 3rs(r + s) = 1000 - 30 = 970$.` },
        { q: String.raw`Solve $\log_2 x + \log_4 x + \log_8 x = 11$.`, answer: "64",
          solution: String.raw`In base $2$: $\left(1 + \tfrac12 + \tfrac13\right)\log_2 x = \tfrac{11}{6}\log_2 x = 11$, so $\log_2 x = 6$ and $x = 64$.` },
        { q: String.raw`Find $\sum_{k=1}^{99} \dfrac{1}{\sqrt k + \sqrt{k + 1}}$.`, answer: "9",
          solution: String.raw`Each term is $\sqrt{k + 1} - \sqrt k$ after rationalizing, so the sum telescopes to $\sqrt{100} - \sqrt1 = 9$.` }
      ],
      problems: [
        "1984 AIME, Problem 8",
        "1985 AIME, Problem 3",
        "1995 AIME, Problem 2",
        "1996 AIME, Problem 5",
        "2026 AIME I, Problem 6",
        "1994 AIME, Problem 4"
      ]
    },
    "L14.5": {
      prereq: ["transforming-equations", "quadratic-root-location", "vietas-general", "log-rules"],
      cards: [],
      body: String.raw`On the AIME the technique is not named and the answer has no choices to check against. Every substitution carries a range, such as $\sqrt x \ge 0$, $2^x \gt 0$ or $x + \tfrac1x \ge 2$, and solutions outside it are discarded; integer conditions become factorizations or perfect-square discriminants, with [[transforming-equations|every candidate checked]] and [[quadratic-root-location|the position of roots]] read from the discriminant and Vieta.

The answer is an integer from $0$ to $999$: work exactly, reduce fractions and simplify radicals before forming $m + n$ or $a + b$, and reduce large numbers modulo $1000$ at every step.

Mixed problems are solved by naming the kind of object, finding the move that makes it familiar ([[log-rules|a common base]], telescoping, roots of unity, [[vietas-general|Vieta]]), and finishing with a check.`,
      strategies: [
        String.raw`Write the range of every substitute when you introduce it, and discard solutions outside it.`,
        String.raw`Turn an integer condition into a product equal to a constant, or a discriminant that is a perfect square.`,
        String.raw`Keep fractions and radicals exact until the end.`,
        String.raw`Reduce fractions to lowest terms and radicals to squarefree form before forming the requested sum.`,
        String.raw`For an answer modulo $1000$, reduce at every step.`,
        String.raw`Check that the answer is an integer from $0$ to $999$, substitute it back, and reread the question.`,
        String.raw`In a mixed problem, ask what kind of object it is about, then look for the move that makes it familiar.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`The roots of $x^2 - 4x + 1$ are $r$ and $s$. Find $r^2 + s^2$.`, answer: "14",
        solution: String.raw`$r^2 + s^2 = (r + s)^2 - 2rs = 16 - 2 = 14$.` },
      { q: String.raw`Find the sum of the solutions of $3^{2x} - 10 \cdot 3^x + 9 = 0$.`, answer: "2",
        solution: String.raw`With $t = 3^x \gt 0$: $t^2 - 10t + 9 = 0$, so $t = 1$ or $9$, both positive, and $x = 0$ or $2$. The sum is $2$.` },
      { q: String.raw`Find the real part of $(1 + i)^{12}$.`, answer: "-64",
        solution: String.raw`$(1 + i)^2 = 2i$, so $(1 + i)^{12} = (2i)^6 = 64i^6 = -64$.` },
      { q: String.raw`Find the last two digits of $3^{10}$.`, answer: "49",
        solution: String.raw`$3^5 = 243 \equiv 43 \pmod{100}$, and $43^2 = 1849 \equiv 49$. So $3^{10} = 59049$ ends in $49$.` },
      { q: String.raw`How many integers $x$ satisfy $|x - 3| + |x + 2| \le 9$?`, answer: "10",
        solution: String.raw`The left side is $5$ for $-2 \le x \le 3$, $2x - 1$ for $x \gt 3$ and $-2x + 1$ for $x \lt -2$. It is at most $9$ for $-4 \le x \le 5$, which holds $10$ integers.` },
      { q: String.raw`Find the remainder when $\sum_{k=1}^{10} k \cdot 2^k$ is divided by $1000$.`, answer: "434",
        solution: String.raw`For $S = \sum_{k=1}^{n} k2^k$, $2S - S = n2^{n+1} - (2 + 4 + \cdots + 2^n) = n2^{n+1} - 2^{n+1} + 2$, so $S = (n - 1)2^{n+1} + 2$. For $n = 10$: $9 \cdot 2048 + 2 = 18434$, which leaves $434$.` }
    ],
    problems: [
      "1991 AIME, Problem 6",
      "1987 AIME, Problem 8"
    ]
  },
  challenge: {
    problems: [
      "1984 AIME, Problem 7",
      "1989 AIME, Problem 7",
      "1993 AIME, Problem 5",
      "1991 AIME, Problem 4"
    ]
  }
};
