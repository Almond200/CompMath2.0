// Learn, AMC Algebra, chapter L6: sequences, sums and inequalities (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L6"] = {
  lessons: {
    "L6.1": {
      prereq: ["first-order-recurrence", "quadratic-formula"],
      cards: ["linear-recurrence", "binets-formula"],
      body: String.raw`Sequences in which each term is a fixed combination of the previous two, like the Fibonacci numbers, have closed forms built from the roots of a quadratic. The AMC 12 asks for far terms, for divisibility of terms, or for the starting values that make a sequence behave.

A [[linear-recurrence|linear recurrence]] $a_n = pa_{n-1} + qa_{n-2}$ has characteristic equation $x^2 = px + q$. If its roots $r$ and $s$ are different, every solution is $a_n = Ar^n + Bs^n$, with $A$ and $B$ fixed by the first two terms. For $a_n = 5a_{n-1} - 6a_{n-2}$, the roots are $2$ and $3$; with $a_0 = 2$ and $a_1 = 5$, $a_n = 2^n + 3^n$, so $a_5 = 275$. A repeated root $r$ gives $(A + Bn)r^n$.

[[binets-formula|Binet's formula]] is the Fibonacci case: $F_n = \tfrac{\varphi^n - \psi^n}{\sqrt5}$ with $\varphi, \psi = \tfrac{1 \pm \sqrt5}{2}$. Since $|\psi| \lt 1$, $F_n$ is the integer nearest $\tfrac{\varphi^n}{\sqrt5}$, and $\varphi^n + \psi^n$ is always an integer, which is the reason expressions like $(2 + \sqrt3)^n + (2 - \sqrt3)^n$ are integers.

For contest sizes, computing terms by the recurrence is usually fastest; the closed form answers questions about growth, divisibility and integer parts. The next lesson treats differences and double sums.`,
      related: [
        { card: "recursive-counting", note: String.raw`counting problems that produce linear recurrences (R1.5).` },
        { card: "periodic-sequences", note: String.raw`recurrences modulo $n$ are periodic (L3.3).` },
        { card: "vietas-quadratic", note: String.raw`the roots of the characteristic equation (L2.1).` }
      ],
      exercises: [
        { q: String.raw`A sequence has $a_0 = 2$, $a_1 = 5$ and $a_n = 5a_{n-1} - 6a_{n-2}$. Find $a_5$.`, answer: "275",
          solution: String.raw`The characteristic roots are $2$ and $3$, and $a_n = 2^n + 3^n$ fits the start. So $a_5 = 32 + 243 = 275$ (the terms are $2, 5, 13, 35, 97, 275$).` }
      ],
      problems: [
        "2008 AMC 10B, Problem 11",
        "2024 AMC 10B, Problem 23",
        "1985 AIME, Problem 5",
        "1988 AIME, Problem 13"
      ]
    },
    "L6.2": {
      prereq: ["arithmetic-series", "geometric-series"],
      cards: ["finite-differences", "double-summation", "arithmetico-geometric", "largest-term-ratio"],
      body: String.raw`Beyond arithmetic and geometric series, the AMC 12 uses a few more summing techniques: differences to identify polynomial sequences, swapping the order of a double sum, the arithmetico-geometric sum, and finding the largest term of a sequence.

[[finite-differences|Finite differences]]: a sequence whose $k$th differences are constant is a polynomial of degree $k$. The sums of squares $1, 5, 14, 30$ have second differences $5, 7$ and third difference $2$, so the next term is $55$. Differences extend a polynomial sequence without finding its formula.

A [[double-summation|double sum]] can be added in either order: $\sum_{i}\sum_{j \le i}$ equals $\sum_j\sum_{i \ge j}$, and choosing the order where the inner sum is simple is often the whole solution.

An [[arithmetico-geometric|arithmetico-geometric sum]] $\sum k r^k$ is found by subtracting $r$ times the sum from itself: $S = \sum_{k \ge 1}\tfrac{k}{2^k}$ gives $S - \tfrac S2 = \sum \tfrac{1}{2^k} = 1$, so $S = 2$.

The [[largest-term-ratio|largest term]] of a sequence like $\binom{n}{k}p^k$ is found from the ratio of consecutive terms: terms increase while the ratio exceeds $1$.

Use differences for polynomial sequences, swap double sums, and subtract shifted copies. The last lesson of the chapter treats inequalities.`,
      related: [
        { card: "telescoping", note: String.raw`sums that collapse (L3.4).` },
        { card: "power-sums", note: String.raw`sums of powers as polynomials (L3.2).` },
        { card: "lagrange-interpolation-formula", note: String.raw`the polynomial through given values (L5.3).` }
      ],
      exercises: [
        { q: String.raw`The sequence $1, 5, 14, 30, \ldots$ has constant third differences. Find the next term.`, answer: "55",
          solution: String.raw`First differences $4, 9, 16$; second $5, 7$; third $2$. The next second difference is $9$, the next first difference $25$, and the next term $55$.` },
        { q: String.raw`Find $\displaystyle\sum_{k=1}^{\infty}\frac{k}{2^k}$.`, answer: "2",
          solution: String.raw`$S - \tfrac S2 = \tfrac12 + \tfrac14 + \cdots = 1$, so $S = 2$.` }
      ],
      problems: [
        "2024 AMC 10B, Problem 12",
        "2018 AMC 12B, Problem 9",
        "2022 AMC 10A, Problem 20",
        "2015 AMC 12B, Problem 25",
        "1991 AIME, Problem 3",
        "1992 AIME, Problem 8"
      ]
    },
    "L6.3": {
      prereq: ["am-gm", "trivial-inequality"],
      cards: ["mean-chain", "cauchy-schwarz", "power-mean-inequality", "bernoulli-inequality"],
      body: String.raw`The AMC 12 adds a few inequalities to AM-GM. Each bounds a different shape of expression, and each comes with an equality case that turns the bound into an answer.

The [[mean-chain|chain of means]] says quadratic mean $\ge$ arithmetic mean $\ge$ geometric mean $\ge$ harmonic mean, all equal only when the numbers are equal. With $x + y = 10$, the harmonic mean is at most $5$, so $\tfrac1x + \tfrac1y \ge \tfrac25$. The [[power-mean-inequality|power mean inequality]] generalizes it: higher powers give larger means, so $a^2 + b^2 + c^2 = 12$ bounds $a + b + c \le 6$.

[[cauchy-schwarz|Cauchy-Schwarz]] bounds a sum of products: $(ax + by)^2 \le (a^2 + b^2)(x^2 + y^2)$. On the circle $x^2 + y^2 = 13$, $2x + 3y \le \sqrt{13} \cdot \sqrt{13} = 13$, reached at $(2, 3)$. Its fraction form $\sum\tfrac{x_i^2}{y_i} \ge \tfrac{(\sum x_i)^2}{\sum y_i}$ handles sums of fractions.

[[bernoulli-inequality|Bernoulli's inequality]] $(1 + x)^n \ge 1 + nx$ compares a power with a line, for instance $1.01^{100} \ge 2$.

Match the expression to the inequality, and always check the equality case. The next chapter turns to trigonometry.`,
      related: [
        { card: "harmonic-addition", note: String.raw`$a\sin x + b\cos x \le \sqrt{a^2 + b^2}$, Cauchy-Schwarz on the circle (L7.2).` },
        { card: "sos-identity", note: String.raw`sums of squares as bounds (L2.5).` },
        { card: "jensens-inequality", note: String.raw`convexity behind all the means (A5.5).` }
      ],
      exercises: [
        { q: String.raw`Real numbers satisfy $x^2 + y^2 = 13$. Find the largest value of $2x + 3y$.`, answer: "13",
          solution: String.raw`By Cauchy-Schwarz, $(2x + 3y)^2 \le (4 + 9)(x^2 + y^2) = 169$, so $2x + 3y \le 13$, with equality at $(2, 3)$.` },
        { q: String.raw`Positive $a$, $b$, $c$ have $a^2 + b^2 + c^2 = 12$. Find the largest value of $a + b + c$.`, answer: "6",
          solution: String.raw`The quadratic mean is $2$, so the arithmetic mean is at most $2$ and $a + b + c \le 6$, with equality at $a = b = c = 2$.` }
      ],
      problems: [
        "2016 AMC 12B, Problem 2",
        "2013 AMC 12B, Problem 17",
        "2011 AMC 12B, Problem 21",
        "2016 AIME II, Problem 15"
      ]
    }
  }
};
