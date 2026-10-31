// Learn, AMC 12, chapter W1: logarithms, exponentials and functions (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["W1"] = {
  lessons: {
    "W1.1": {
      prereq: ["log-rules", "change-of-base", "substitute-repeated-block"],
      cards: ["take-logs-linearize", "log-substitution", "log-system"],
      body: String.raw`The AMC 12 turns logarithms from arithmetic into equations. Most such equations become polynomial or linear after one of three moves: take logarithms of both sides, name a logarithm or a power as a new variable, or treat a system of logarithmic equations as a linear system.

[[take-logs-linearize|Taking logarithms]] turns products and powers into sums and multiples. An equation like $x^{\log x} = 100x$ becomes $(\log x)^2 = 2 + \log x$, a quadratic in $\log x$. Equations with the unknown in the exponent on both sides, $a^{f(x)} = b^{g(x)}$, become linear in $f$ and $g$.

[[log-substitution|Naming a power or a logarithm]] is the substitution for exponential and logarithmic equations: $4^x - 6 \cdot 2^x + 8 = 0$ is $u^2 - 6u + 8 = 0$ with $u = 2^x$, so $u = 2$ or $4$ and $x = 1$ or $2$; and $(\log_2 x)^2 - 3\log_2 x + 2 = 0$ gives $\log_2 x = 1$ or $2$, so the solutions $2$ and $4$ have product $8$. Remember that $u = 2^x$ must be positive, and $\log$ needs positive arguments.

A [[log-system|system of logarithmic equations]] is linear in the logarithms. With $a = \log_2 x$ and $b = \log_2 y$, the system $\log_2 x + \log_4 y = 4$, $\log_4 x + \log_2 y = 5$ reads $a + \tfrac b2 = 4$, $\tfrac a2 + b = 5$, so $a = 2$, $b = 4$, and $xy = 2^6 = 64$. Change of base first puts every logarithm in one base.

Take logarithms, name the repeated power or logarithm, and solve linear systems in the logarithms. The next lesson solves equations for unknown functions.`,
      related: [
        { card: "exponent-laws", note: String.raw`rewriting powers before taking logarithms.` },
        { card: "vietas-quadratic", note: String.raw`products of solutions from the quadratic in $\log x$ (T2.1).` },
        { card: "linear-elimination", note: String.raw`solving the linear system in the logarithms (T1.2).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the real solutions of $4^x - 6 \cdot 2^x + 8 = 0$.`, answer: "3",
          solution: String.raw`With $u = 2^x$: $u^2 - 6u + 8 = (u - 2)(u - 4) = 0$, so $2^x = 2$ or $4$, $x = 1$ or $2$. The sum is $3$.` },
        { q: String.raw`Positive $x$ and $y$ satisfy $\log_2 x + \log_4 y = 4$ and $\log_4 x + \log_2 y = 5$. Find $xy$.`, answer: "64",
          solution: String.raw`With $a = \log_2 x$, $b = \log_2 y$: $a + \tfrac b2 = 4$ and $\tfrac a2 + b = 5$. Then $a = 2$, $b = 4$, so $x = 4$, $y = 16$ and $xy = 64$.` }
      ],
      problems: [
        "2022 AMC 12B, Problem 16",
        "2023 AMC 12A, Problem 19",
        "2021 Spring AMC 12B, Problem 21",
        "2024 AIME II, Problem 4",
        "2026 AIME I, Problem 6"
      ]
    },
    "W1.2": {
      prereq: ["inverse-function-properties"],
      cards: ["functional-substitution", "fx-pairing", "cauchy-functional-equations"],
      body: String.raw`A functional equation gives a relation that a function satisfies for every input and asks for a value or for the function. On the AMC 12 these are solved by substituting well-chosen inputs until enough equations appear.

[[functional-substitution|Functional substitution]] plugs in values or expressions that make terms match. If $f(x) + 2f(1 - x) = 3x$ for all $x$, replacing $x$ by $1 - x$ gives $f(1 - x) + 2f(x) = 3 - 3x$; the two equations are linear in $f(x)$ and $f(1 - x)$, and solving gives $f(x) = 2 - 3x$, so $f(2) = -4$. Inputs like $0$, $1$, $-x$, $\tfrac1x$ and $1 - x$ are the usual first tries.

[[fx-pairing|Pairing $f(x)$ with $f(c - x)$]] sums many values when $f(x) + f(c - x)$ is constant. For $f(x) = \tfrac{9^x}{9^x + 3}$, $f(x) + f(1 - x) = 1$, so $\sum_{k=1}^{999} f\!\left(\tfrac{k}{1000}\right)$ pairs $k$ with $1000 - k$: $499$ pairs and the middle term $f(\tfrac12) = \tfrac12$, for a total of $\tfrac{999}{2}$.

[[cauchy-functional-equations|Cauchy's equation]] $f(x + y) = f(x) + f(y)$ forces $f(x) = cx$ on the rationals, and with continuity on all reals; $f(3) = 12$ gives $f(\tfrac12) = 2$. Its relatives $f(x + y) = f(x)f(y)$ and $f(xy) = f(x) + f(y)$ give exponentials and logarithms.

Substitute inputs that create a solvable system, pair symmetric inputs, and recognize Cauchy's forms. The last lesson of the chapter treats floors.`,
      related: [
        { card: "odd-even-functions", note: String.raw`the symmetry $x \to -x$ (T2.2).` },
        { card: "linear-elimination", note: String.raw`solving the system the substitutions produce (T1.2).` },
        { card: "injectivity-surjectivity", note: String.raw`olympiad functional equations (A9.2).` }
      ],
      exercises: [
        { q: String.raw`A function satisfies $f(x) + 2f(1 - x) = 3x$ for all real $x$. Find $f(2)$.`, answer: "-4",
          solution: String.raw`Replacing $x$ by $1 - x$: $f(1 - x) + 2f(x) = 3 - 3x$. Twice this minus the original gives $3f(x) = 6 - 6x - 3x$, so $f(x) = 2 - 3x$ and $f(2) = -4$.` },
        { q: String.raw`Let $f(x) = \tfrac{9^x}{9^x + 3}$. Find $\displaystyle\sum_{k=1}^{999} f\!\left(\tfrac{k}{1000}\right)$.`, answer: "999/2",
          solution: String.raw`$f(1 - x) = \tfrac{9/9^x}{9/9^x + 3} = \tfrac{3}{3 + 9^x}$, so $f(x) + f(1 - x) = 1$. Pairing $k$ with $1000 - k$ gives $499$ pairs, plus $f(\tfrac12) = \tfrac{3}{6} = \tfrac12$: the sum is $\tfrac{999}{2}$.` }
      ],
      problems: [
        "2019 AMC 12B, Problem 8",
        "2007 AMC 12B, Problem 9",
        "2024 AMC 12B, Problem 11",
        "2024 AMC 12A, Problem 13",
        "2006 AMC 12A, Problem 18",
        "2023 AMC 12A, Problem 22",
        "2006 AIME I, Problem 6",
        "1997 AIME, Problem 12"
      ]
    },
    "W1.3": {
      prereq: ["name-the-floor", "floor-equation"],
      cards: ["floor-basics"],
      body: String.raw`The floor function appears on the AMC 12 in equations, sums and counts that go a step beyond the AMC 10. The basic facts are few, and almost every solution writes $x = n + f$ with $n$ an integer and $0 \le f \lt 1$.

The [[floor-basics|floor function]] $\lfloor x \rfloor$ is the greatest integer at most $x$, so $\lfloor x \rfloor \le x \lt \lfloor x \rfloor + 1$, and $\{x\} = x - \lfloor x \rfloor$ is the fractional part. Useful facts: $\lfloor x + n \rfloor = \lfloor x \rfloor + n$ for integers $n$; $\lfloor \tfrac nk \rfloor$ counts the multiples of $k$ up to $n$; and $\lfloor\sqrt x\rfloor = m$ exactly when $m^2 \le x \lt (m + 1)^2$, so $11$ integers have $\lfloor\sqrt x\rfloor = 5$, from $25$ to $35$.

Equations mixing $x$ and $\lfloor x \rfloor$ are solved one integer interval at a time. For $x\lfloor x \rfloor = 17$ with $x \gt 0$, on $[n, n + 1)$ the equation is $nx = 17$, so $x = \tfrac{17}{n}$ must lie in $[n, n + 1)$; only $n = 4$ works, giving $x = \tfrac{17}{4}$. The values of $x\lfloor x\rfloor$ on each interval form a continuous range, which is how problems count the integers it can equal.

Sums of floors are grouped by equal values, or evaluated through $\lfloor x \rfloor = x - \{x\}$ when the fractional parts are easier to sum than the floors.

Split into integer intervals, write $x = n + f$, and group equal floors. The next chapter studies polynomials.`,
      related: [
        { card: "group-equal-floors", note: String.raw`summing floors by grouping equal values (T1.4).` },
        { card: "legendres-formula", note: String.raw`sums of floors that count prime factors (T4.3).` },
        { card: "piecewise-graph-counting", note: String.raw`graphing floor functions (T2.3).` }
      ],
      exercises: [
        { q: String.raw`Solve $x\lfloor x \rfloor = 17$ for positive $x$.`, answer: "17/4",
          solution: String.raw`On $[n, n + 1)$ the equation is $nx = 17$, so $x = \tfrac{17}{n}$, which needs $n \le \tfrac{17}{n} \lt n + 1$, that is $n^2 \le 17 \lt n^2 + n$. Only $n = 4$ works, so $x = \tfrac{17}{4}$.` },
        { q: String.raw`How many positive integers $x$ have $\lfloor\sqrt x\rfloor = 5$?`, answer: "11",
          solution: String.raw`$25 \le x \lt 36$: the integers $25$ to $35$, which is $11$.` }
      ],
      problems: [
        "2025 AMC 10B, Problem 1",
        "2019 AMC 10B, Problem 9",
        "2016 AMC 12A, Problem 3",
        "2023 AMC 10B, Problem 22",
        "2020 AMC 10A, Problem 22",
        "2010 AMC 12A, Problem 24",
        "1996 AIME, Problem 2",
        "2023 AIME I, Problem 10"
      ]
    }
  }
};
