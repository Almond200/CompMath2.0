// Learn, AIME Algebra, chapter A8: algebraic structure and synthesis (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// A8.4 is the mixed lesson that closes the core of the book, so the chapter has no separate review.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["A8"] = {
  lessons: {
    "A8.1": {
      prereq: ["symmetric-polynomial-strategies", "sos-identity"],
      cards: ["wlog-symmetry", "sum-zero-identities", "cubes-minus-3abc", "antisymmetric-factorization", "pairwise-sum-product"],
      body: String.raw`Expressions in three variables that are symmetric, or cyclic, have a small set of factorizations that keep appearing. When $a + b + c = 0$, the sum of the cubes is $3abc$; the expression $a^2(b - c) + b^2(c - a) + c^2(a - b)$ is $-(a - b)(b - c)(c - a)$; the product $(x + y)(y + z)(z + x)$ is a simple combination of the elementary symmetric sums. Problems hide these identities inside systems of equations or long expansions, and the solution is to see the structure before expanding anything.

The first habit is to use the symmetry to reduce the work. [[wlog-symmetry|Without loss of generality]], if a problem does not change when the variables are permuted, you may assume an order such as $a \ge b \ge c$, or that a particular variable is the largest. Every other case is a relabeling of the one you solve. The assumption must be justified by an actual symmetry: a cyclic condition, unchanged by $a \to b \to c \to a$ but not by swapping two variables, allows you to assume $a$ is the largest but not the full order.

The identity $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$ is [[cubes-minus-3abc|the factorization of $a^3 + b^3 + c^3 - 3abc$]]. Its second factor is half the sum of the squared differences, so it is nonnegative and zero only when $a = b = c$. A problem that gives $x^3 + y^3 + z^3 - 3xyz$ and $x + y + z$ therefore gives the sum of the squared differences, and when the variables are integers that sum can only be split a few ways. Several equations that add up to a sum of squared differences work the same way: if $a^2 - b^2 - c^2 + ab$, $b^2 - c^2 - a^2 + bc$ and $c^2 - a^2 - b^2 + ca$ are known, adding them leaves $-(a^2 + b^2 + c^2) + ab + bc + ca$, so the squared differences add to a known even number.

When $a + b + c = 0$, the [[sum-zero-identities|sum-zero identities]] follow: $a^3 + b^3 + c^3 = 3abc$, and $a^2 + b^2 + c^2 = -2(ab + bc + ca)$. They also apply to expressions that add to zero without looking like variables, such as $(x - y) + (y - z) + (z - x)$, so $(x - y)^3 + (y - z)^3 + (z - x)^3 = 3(x - y)(y - z)(z - x)$. With $a + b + c = 0$ and $abc = 2$, $a^3 + b^3 + c^3 = 6$ without solving anything.

Some expressions change sign when two variables are swapped. Such an antisymmetric polynomial vanishes when any two variables are equal, so by the factor theorem it has the factors $a - b$, $b - c$ and $c - a$; this is [[antisymmetric-factorization|the antisymmetric factorization]]. A degree count fixes what remains: $a^2(b - c) + b^2(c - a) + c^2(a - b)$ has degree $3$, so it is a constant times $(a - b)(b - c)(c - a)$, and one value (say $a = 0$, $b = 1$, $c = 2$, giving $-2$ on the left and $2$ for $(a - b)(b - c)(c - a)$) shows the constant is $-1$. The same reasoning factors $a^3(b - c) + b^3(c - a) + c^3(a - b)$, with a remaining symmetric factor of degree $1$.

Finally, the [[pairwise-sum-product|product of the pairwise sums]] is $(x + y)(y + z)(z + x) = (x + y + z)(xy + yz + zx) - xyz$. Since $x + y = e_1 - z$, the product is the cubic with roots $x$, $y$, $z$ evaluated at $e_1$, which is the quickest way to remember it. For $x$, $y$, $z$ the roots of $t^3 - 6t^2 + 11t - 6$, it is $6 \cdot 11 - 6 = 60$.

When a problem in three variables looks messy, ask what happens if two of them are equal, or if they add to zero, and whether a known factorization is hiding. The next lesson uses factorizations to force integer answers.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`rewriting any symmetric expression in the elementary symmetric sums (A1.1).` },
        { card: "sos-identity", note: String.raw`the second factor of $a^3 + b^3 + c^3 - 3abc$ as half a sum of squares (A5.3).` },
        { card: "factor-remainder-theorem", note: String.raw`a polynomial that vanishes when $a = b$ has the factor $a - b$.` },
        { card: "vietas-general", note: String.raw`reading $e_1$, $e_2$, $e_3$ off a cubic (B2.2).` }
      ],
      exercises: [
        { q: String.raw`Real numbers $a$, $b$, $c$ satisfy $a + b + c = 0$ and $abc = 2$. Find $a^3 + b^3 + c^3$.`, answer: "6",
          solution: String.raw`$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) = 0$, so $a^3 + b^3 + c^3 = 3abc = 6$.` },
        { q: String.raw`Find $a^2(b - c) + b^2(c - a) + c^2(a - b)$ when $a = 10$, $b = 7$, $c = 3$.`, answer: "84",
          solution: String.raw`The expression vanishes when any two variables are equal and has degree $3$, so it is $k(a - b)(b - c)(c - a)$; at $a = 0$, $b = 1$, $c = 2$ it equals $-2$ while $(a - b)(b - c)(c - a) = 2$, so $k = -1$. Then the value is $-(3)(4)(-7) = 84$. Directly: $100 \cdot 4 + 49 \cdot (-7) + 9 \cdot 3 = 400 - 343 + 27 = 84$.` },
        { q: String.raw`The roots of $t^3 - 6t^2 + 11t - 6$ are $x$, $y$, $z$. Find $(x + y)(y + z)(z + x)$.`, answer: "60",
          solution: String.raw`$(x + y)(y + z)(z + x) = (x + y + z)(xy + yz + zx) - xyz$, and Vieta gives $6$, $11$ and $6$, so the product is $66 - 6 = 60$. (The roots are $1$, $2$, $3$, and $3 \cdot 5 \cdot 4 = 60$.)` }
      ],
      problems: [
        "2021 Fall AMC 12B, Problem 7",
        "2012 AMC 12A, Problem 21",
        "1986 AIME, Problem 2",
        "2000 AIME II, Problem 13",
        "2008 AIME II, Problem 14",
        "2026 AIME II, Problem 11"
      ]
    },
    "A8.2": {
      prereq: ["factor-remainder-theorem", "sfft"],
      cards: ["an-minus-bn", "sophie-germain", "brahmagupta-fibonacci"],
      body: String.raw`Many AIME problems are algebra problems with an integer condition attached: find the largest $n$ for which $n + 10$ divides $n^3 + 100$, or decide which numbers of the form $n^4 + 4$ are prime, or write a product as a sum of two squares. The algebra produces a factorization, and the integer condition then leaves only a few cases. The factorizations used are few and worth knowing in both directions.

The [[an-minus-bn|factorizations of $a^n - b^n$ and $a^n + b^n$]] are $a^n - b^n = (a - b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1})$ for every $n$, and, for odd $n$, $a^n + b^n = (a + b)(a^{n-1} - a^{n-2}b + \cdots + b^{n-1})$. For integers this means $a - b$ divides $a^n - b^n$, and $a + b$ divides $a^n + b^n$ when $n$ is odd. So $3^{105} + 2^{105}$ is divisible by $5$, and since it is odd and not divisible by $3$, $5$ is its smallest prime factor. The same fact, that $x - y$ divides $P(x) - P(y)$ for any polynomial with integer coefficients, is the remainder theorem in integer form: $n + 10$ divides $n^3 + 100$ exactly when it divides $(-10)^3 + 100 = -900$, which turns a divisibility condition on $n$ into a list of divisors of a fixed number.

The [[sophie-germain|Sophie Germain identity]] $a^4 + 4b^4 = (a^2 + 2b^2 - 2ab)(a^2 + 2b^2 + 2ab)$ is a difference of squares in disguise: add and subtract $4a^2b^2$ to get $(a^2 + 2b^2)^2 - (2ab)^2$. It factors expressions that look prime, such as $n^4 + 4 = (n^2 - 2n + 2)(n^2 + 2n + 2)$, which is composite for every $n \gt 1$, and $5^4 + 4 \cdot 3^4 = 949 = 13 \cdot 73$. In a long product of terms $x^4 + 324 = x^4 + 4 \cdot 3^4$, each factor splits into $(x - 3)^2 + 9$ and $(x + 3)^2 + 9$, and when the values of $x$ step by $6$ the pieces cancel across neighboring factors.

The [[brahmagupta-fibonacci|Brahmagupta-Fibonacci identity]] $(a^2 + b^2)(c^2 + d^2) = (ac - bd)^2 + (ad + bc)^2 = (ac + bd)^2 + (ad - bc)^2$ says that a product of sums of two squares is again a sum of two squares, in two ways. It is the statement $|z|^2|w|^2 = |zw|^2$ for $z = a + bi$ and $w = c + di$. From $5 = 1^2 + 2^2$ and $13 = 2^2 + 3^2$ it gives $65 = 1^2 + 8^2 = 4^2 + 7^2$. Read backward, it explains a trick: if $p = a + 8c$ and $q = 8a - c$ are known, squaring and adding cancels the cross terms and gives $65(a^2 + c^2) = p^2 + q^2$.

Together with Simon's favorite factoring trick, these identities are the standard way to turn an equation in integers into a product equal to a known number. Once the factorization is in hand, list the divisors, use parity and size to discard most of them, and check the rest. The next lesson studies equations with a parameter, where the question is for which values a solution exists.`,
      related: [
        { card: "sfft", note: String.raw`adding a constant to complete a product, the other standard integer factorization.` },
        { card: "lte", note: String.raw`how many times a prime divides $a^n - b^n$, the sharper form of the same factorization.` },
        { card: "sum-of-two-squares", note: String.raw`which integers are sums of two squares, and in how many ways.` },
        { card: "complex-basics", note: String.raw`moduli multiply, which is the Brahmagupta-Fibonacci identity (A6.1).` }
      ],
      exercises: [
        { q: String.raw`Find the smallest prime factor of $3^{105} + 2^{105}$.`, answer: "5",
          solution: String.raw`The number is odd, and modulo $3$ it is $2^{105} \not\equiv 0$, so neither $2$ nor $3$ divides it. Since $105$ is odd, $3 + 2 = 5$ divides $3^{105} + 2^{105}$. The smallest prime factor is $5$.` },
        { q: String.raw`Find the largest prime factor of $5^4 + 4 \cdot 3^4$.`, answer: "73",
          solution: String.raw`By Sophie Germain with $a = 5$, $b = 3$: $a^4 + 4b^4 = (a^2 + 2b^2 - 2ab)(a^2 + 2b^2 + 2ab) = (25 + 18 - 30)(25 + 18 + 30) = 13 \cdot 73$. Both are prime, so the largest prime factor is $73$. (Check: $625 + 324 = 949 = 13 \cdot 73$.)` },
        { q: String.raw`In how many ways can $65$ be written as $a^2 + b^2$ with $0 \lt a \lt b$ integers?`, answer: "2",
          solution: String.raw`$65 = 5 \cdot 13 = (1^2 + 2^2)(2^2 + 3^2)$. The identity gives $(1 \cdot 2 + 2 \cdot 3)^2 + (1 \cdot 3 - 2 \cdot 2)^2 = 8^2 + 1^2$ and $(1 \cdot 2 - 2 \cdot 3)^2 + (1 \cdot 3 + 2 \cdot 2)^2 = 4^2 + 7^2$. Checking $b = 5, 6, 7, 8$ shows these are the only ones, so there are $2$ ways.` }
      ],
      problems: [
        "2020 AMC 10B, Problem 22",
        "2002 AMC 10B, Problem 20",
        "1986 AIME, Problem 5",
        "2025 AIME II, Problem 2",
        "2010 AIME I, Problem 3",
        "1987 AIME, Problem 12",
        "2020 AIME II, Problem 10",
        "1987 AIME, Problem 14"
      ]
    },
    "A8.3": {
      prereq: ["quadratic-root-location", "comparing-coefficients"],
      cards: [],
      body: String.raw`An equation with a parameter asks a different question from an ordinary equation: not what the solution is, but for which values of the parameter a solution of a certain kind exists. For which $a$ does $4x^2 + (a + 8)x + 9 = 0$ have exactly one solution? For which slopes does a line through a point miss a parabola? For which $k$ does $\log(kx) = 2\log(x + 2)$ have exactly one solution? The tools are ones you already have; what is new is reading the condition on the roots as a condition on the parameter, and keeping track of which roots are allowed.

For a quadratic, the discriminant decides how many real roots there are, and [[quadratic-root-location|locating the roots without solving]] decides where they are. With $f(x) = x^2 + bx + c$, both roots exceed a number $m$ exactly when the discriminant is nonnegative, the vertex $-\tfrac b2$ is to the right of $m$, and $f(m) \gt 0$. One root is on each side of $m$ exactly when $f(m) \lt 0$, with no other condition. For $x^2 - 2kx + k + 6$ to have both roots greater than $1$, these say $k^2 - k - 6 \ge 0$, $k \gt 1$ and $7 - k \gt 0$, so $3 \le k \lt 7$. Tangency is the discriminant equal to zero: a line meets a parabola once exactly when the quadratic for their intersection has a double root, so the range of slopes of lines that miss it is the interval where the discriminant is negative.

A domain restriction changes the count. When an equation came from logarithms, square roots or fractions, a root of the cleared equation counts only if it lies in the original domain. For $\log(kx) = 2\log(x + 2)$, clearing gives $x^2 + (4 - k)x + 4 = 0$, but the roots must satisfy $x \gt -2$ and $kx \gt 0$. For negative $k$ the roots must lie in $(-2, 0)$, and their product is $4$, so exactly one of them does whenever both are real; for positive $k$ the roots must be positive and the only way to have exactly one is a double root. The parameter splits into cases, and each case is a root-location question.

The other kind of parameter question asks which polynomials are possible. When an identity must hold for all $x$, [[comparing-coefficients|comparing coefficients]] turns it into equations on the parameters. If two monic quadratics $x^2 + ax + 1$ and $x^2 + x + a$ share a root, subtracting them gives $(a - 1)(x - 1) = 0$, so either $a = 1$ (the quadratics are equal) or the shared root is $1$, which forces $a = -2$. When a composition such as $p(p(x)) = 0$ must have exactly three real solutions, the condition is that one of $p(x) = r$ and $p(x) = s$ has a double root, which pins the vertex of $p$ to one of its own roots.

In all these problems, write the condition on the roots in terms of the parameter, using discriminants, values at boundary points, vertices and Vieta, and remember the domain. The last lesson of the core combines everything in the book.`,
      related: [
        { card: "quadratic-formula", note: String.raw`the discriminant as the count of real roots.` },
        { card: "tangency-condition", note: String.raw`a line tangent to a curve as a double root of their intersection equation.` },
        { card: "log-rules", note: String.raw`the domains that remove roots of a cleared logarithmic equation (A4.3).` },
        { card: "vertex-form", note: String.raw`the vertex as the axis that both roots straddle.` }
      ],
      exercises: [
        { q: String.raw`For how many integers $k$ does $x^2 - 2kx + k + 6 = 0$ have two real roots (not necessarily distinct), both greater than $1$?`, answer: "4",
          solution: String.raw`With $f(x) = x^2 - 2kx + k + 6$, both roots exceed $1$ exactly when the discriminant is nonnegative, $4k^2 - 4(k + 6) \ge 0$, that is $(k - 3)(k + 2) \ge 0$; the vertex is to the right of $1$, $k \gt 1$; and $f(1) = 7 - k \gt 0$. Together, $3 \le k \lt 7$, so $k = 3, 4, 5, 6$: $4$ integers. (At $k = 3$ the double root is $3$.)` },
        { q: String.raw`The quadratics $x^2 + ax + 1$ and $x^2 + x + a$ have a common root, and $a \ne 1$. Find $a$.`, answer: "-2",
          solution: String.raw`At a common root $r$, subtracting gives $(a - 1)r + (1 - a) = 0$, so $(a - 1)(r - 1) = 0$, and since $a \ne 1$, $r = 1$. Then $1 + a + 1 = 0$, so $a = -2$. Check: $x^2 - 2x + 1 = (x - 1)^2$ and $x^2 + x - 2 = (x - 1)(x + 2)$ share the root $1$.` },
        { q: String.raw`Find the product of all real $k$ for which $x^2 + kx + 9 = 0$ has exactly one real solution.`, answer: "-36",
          solution: String.raw`Exactly one solution means a double root: $k^2 - 36 = 0$, so $k = 6$ or $k = -6$, with product $-36$.` }
      ],
      problems: [
        "2005 AMC 12A, Problem 9",
        "2014 AMC 12B, Problem 17",
        "2021 Fall AMC 12A, Problem 17",
        "2019 AMC 12A, Problem 14",
        "2021 Fall AMC 12A, Problem 23",
        "2010 AMC 12A, Problem 21",
        "2007 AIME I, Problem 8",
        "2017 AIME II, Problem 7",
        "2023 AIME I, Problem 9"
      ]
    },
    "A8.4": {
      prereq: ["newtons-sums", "log-rules", "vietas-general"],
      cards: [],
      body: String.raw`The hardest algebra problems on the AIME rarely use a single idea. A logarithmic equation turns out to be a cubic in disguise, so Vieta's formulas finish it; a polynomial built from a geometric series has roots that are roots of unity; a system of equations becomes one identity in a new variable, and comparing coefficients solves it. The chapters of this book each taught one family of tools, and these problems ask you to choose and combine them.

The first step is almost always a substitution or a change of viewpoint that makes the problem look like one you know. Substituting $y = 2^{111x}$ in an exponential equation, or $t = \log x$ in an equation like $x^{\log x} = 100x$, turns it into a polynomial; after that, the question usually asks for a sum or product of the solutions, and Vieta answers it without solving. For $x^{\log x} = 100x$, taking logarithms gives $t^2 = 2 + t$, so the two values of $t$ add to $1$ and the product of the solutions $x = 10^t$ is $10^1 = 10$. Writing a sum $1 + x + \cdots + x^{17}$ as $\tfrac{x^{18} - 1}{x - 1}$ shows its roots, and a polynomial with roots in symmetric positions may be the square or the product of two such sums.

The second step is to look for a quantity the problem determines even though the individual unknowns are not determined. Power sums of the roots of a polynomial follow from Newton's sums without the roots: if $r$, $s$, $t$ are the roots of $x^3 - x - 1$, each root satisfies $x^3 = x + 1$, so the power sums obey $p_k = p_{k-2} + p_{k-3}$, and from $p_0 = 3$, $p_1 = 0$, $p_2 = 2$ one gets $p_3 = 3$, $p_4 = 2$, $p_5 = 5$. A product of coefficients, the sum of a geometric series, or the sum of the squares of the roots are similar: each is a symmetric function of things the problem never asks you to find.

The third step is checking. Each method has a typical error: a substitution can add or lose solutions, a logarithm needs positive arguments, a bound needs its equality case, and a count needs care with values that belong to two families. The answer to an AIME problem is an integer from $0$ to $999$, so a non-integer or a number out of range is a signal to recheck.

The problems below are mixed on purpose, in rising order of difficulty, and each needs ideas from at least two chapters. The extension chapter that follows collects topics that go beyond the AIME syllabus.`,
      related: [
        { card: "newtons-sums", note: String.raw`power sums of roots from the coefficients (A2.2).` },
        { card: "log-substitution", note: String.raw`turning an exponential or logarithmic equation into a polynomial (A4.3).` },
        { card: "roots-of-unity", note: String.raw`recognizing the roots of a geometric-series polynomial (A6.3).` },
        { card: "comparing-coefficients", note: String.raw`reading a system as one polynomial identity (A2.5).` }
      ],
      exercises: [
        { q: String.raw`Find the product of the positive real solutions of $x^{\log_{10} x} = 100x$.`, answer: "10",
          solution: String.raw`Take $\log_{10}$ of both sides with $t = \log_{10} x$: $t^2 = 2 + t$, so $t^2 - t - 2 = 0$ and $t = 2$ or $t = -1$. The solutions are $x = 100$ and $x = \tfrac1{10}$, with product $10$; by Vieta the values of $t$ add to $1$, so the product is $10^1$ without solving.` },
        { q: String.raw`The roots of $x^3 - x - 1$ are $r$, $s$, $t$. Find $r^5 + s^5 + t^5$.`, answer: "5",
          solution: String.raw`Each root satisfies $x^3 = x + 1$, so $x^{k} = x^{k-2} + x^{k-3}$, and the power sums satisfy $p_k = p_{k-2} + p_{k-3}$. With $p_0 = 3$, $p_1 = r + s + t = 0$ and $p_2 = (r + s + t)^2 - 2(rs + st + tr) = 0 - 2(-1) = 2$: $p_3 = p_1 + p_0 = 3$, $p_4 = p_2 + p_1 = 2$, $p_5 = p_3 + p_2 = 5$.` }
      ],
      problems: [
        "1995 AIME, Problem 2",
        "2005 AIME I, Problem 8",
        "2010 AIME II, Problem 7",
        "2012 AIME II, Problem 8",
        "2004 AIME I, Problem 13",
        "2003 AIME II, Problem 15",
        "2019 AIME I, Problem 10",
        "2016 AIME II, Problem 6",
        "1984 AIME, Problem 15"
      ]
    }
  }
};
