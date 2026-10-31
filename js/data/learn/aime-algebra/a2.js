// Learn, AIME Algebra, chapter A2: polynomials and root expressions (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["A2"] = {
  lessons: {
    "A2.1": {
      prereq: ["factor-remainder-theorem", "crt"],
      cards: ["polynomial-crt"],
      body: String.raw`Dividing a polynomial by $x - a$ leaves the remainder $P(a)$, so a remainder is an evaluation and a factor is a root. Those two facts, the remainder and factor theorems, turn most questions about polynomial division into a few substitutions: if $x^3 + ax + 6$ is divisible by $x - 2$, then $8 + 2a + 6 = 0$ and $a = -7$, with no long division at all. This lesson extends them to divisors of higher degree, where the remainder is no longer a number but a polynomial of smaller degree.

Dividing $P$ by a divisor $D$ of degree $d$ gives $P = DQ + R$ with $R$ of degree less than $d$. At every root $r$ of $D$, the term $DQ$ vanishes and $P(r) = R(r)$, so the values of $P$ at the roots of $D$ determine $R$. If $P(1) = 3$ and $P(2) = 5$, the remainder on division by $(x - 1)(x - 2)$ is the linear $R$ with $R(1) = 3$ and $R(2) = 5$, namely $2x + 1$. When the roots of $D$ are not convenient, the same idea works by reducing powers: modulo $x^2 + 1$, every $x^2$ can be replaced by $-1$, so $x^{100} = (x^2)^{50} \equiv 1$.

When a polynomial is described by its remainders on division by several coprime divisors, those remainders fix its remainder modulo the product, exactly as the Chinese Remainder Theorem fixes an integer: that is the [[polynomial-crt|Chinese Remainder Theorem for polynomials]]. To find the polynomial of least degree with remainder $2x + 1$ modulo $x^2 + 1$ and a given remainder modulo another quadratic, write it as $(x^2 + 1)(ax + b) + 2x + 1$, which meets the first condition for every $a$ and $b$, and then impose the second.

The signal is a remainder on division by a polynomial, a divisibility condition on a polynomial with a parameter, or values of a polynomial at a few points. Evaluate at the roots of the divisor rather than dividing.`,
      related: [
        { card: "factor-remainder-theorem", note: String.raw`the remainder on division by $x - a$ is $P(a)$, and $x - a$ divides $P$ exactly when $P(a) = 0$.` },
        { card: "crt", note: String.raw`the integer version, with the same structure (N2.5).` },
        { card: "lagrange-interpolation", note: String.raw`building the polynomial of least degree through given values, which is what finding a remainder from values does (A2.5).` }
      ],
      exercises: [
        { q: String.raw`For what value of $a$ is $x^3 + ax + 6$ divisible by $x - 2$?`, answer: "-7",
          solution: String.raw`By the factor theorem the value at $x = 2$ must be $0$: $8 + 2a + 6 = 0$, so $a = -7$. Check: $x^3 - 7x + 6 = (x - 1)(x - 2)(x + 3)$.` },
        { q: String.raw`A polynomial $P$ has $P(1) = 3$ and $P(2) = 5$. Its remainder on division by $(x - 1)(x - 2)$ is $R(x)$. Find $R(10)$.`, answer: "21",
          solution: String.raw`$R$ has degree at most $1$ and agrees with $P$ at the roots $1$ and $2$, so $R(1) = 3$ and $R(2) = 5$, giving $R(x) = 2x + 1$. Then $R(10) = 21$.` },
        { q: String.raw`What is the remainder when $x^{100}$ is divided by $x^2 + 1$? (It is a constant.)`, answer: "1",
          solution: String.raw`Modulo $x^2 + 1$, $x^2 \equiv -1$, so $x^{100} = (x^2)^{50} \equiv (-1)^{50} = 1$. The remainder is $1$.` }
      ],
      problems: ["2025 AMC 10A, Problem 7", "2018 AMC 12A, Problem 5", "2017 AMC 10A, Problem 24", "2022 AMC 10B, Problem 21"]
    },
    "A2.2": {
      prereq: ["vietas-general"],
      cards: ["newtons-sums", "products-over-roots"],
      body: String.raw`Vieta's formulas give the sum, the sum of pairwise products, and the product of a polynomial's roots straight from its coefficients. Many problems ask for something else, the sum of the cubes of the roots or a product like $\prod (2 - r_i)$, and both can be found without solving. For the roots of $x^3 - 5x^2 + 8x - 13$, the sum of the cubes is $44$ and the product $\prod(2 - r_i)$ is $-9$, each from a line of arithmetic.

Each root satisfies the polynomial: $r^3 = 5r^2 - 8r + 13$. Multiplying by $r^{k-3}$ and adding over the three roots gives a recursion for the power sums $p_k = \sum r_i^k$, namely $p_k = 5p_{k-1} - 8p_{k-2} + 13p_{k-3}$, which are [[newtons-sums|Newton's sums]]. The first few need care, because $p_0 = 3$ counts the roots: $p_1 = e_1 = 5$, $p_2 = e_1 p_1 - 2e_2 = 25 - 16 = 9$, and $p_3 = e_1 p_2 - e_2 p_1 + 3e_3 = 45 - 40 + 39 = 44$. In general $p_k - e_1 p_{k-1} + e_2 p_{k-2} - \cdots \pm k\,e_k = 0$ for $k$ up to the degree, and the plain recursion after that.

A product over the roots is an evaluation. Since $P(x) = (x - r_1)(x - r_2)(x - r_3)$ for a monic $P$, setting $x = 2$ gives [[products-over-roots|$\prod (2 - r_i) = P(2)$]], here $8 - 20 + 16 - 13 = -9$. A product like $\prod (r_i + 2)$ is $(-1)^n P(-2)$, and a product of $r_i^2 + 1 = (r_i - i)(r_i + i)$ is $P(i)\,P(-i)$, up to sign. Sums of the form $\sum \tfrac{1}{a - r_i}$ come from the same factored form by taking a logarithmic derivative: they equal $\tfrac{P'(a)}{P(a)}$.

The signal is a symmetric expression in the roots that is not one of Vieta's three, a sum of powers of the roots, or a product of a fixed expression over all the roots.`,
      related: [
        { card: "vietas-general", note: String.raw`the elementary symmetric sums $e_k$ that Newton's sums start from.` },
        { card: "symmetric-polynomial-strategies", note: String.raw`the two-variable versions, $x^2 + y^2$ and $x^3 + y^3$ from $x + y$ and $xy$ ((A1.2)).` },
        { card: "root-transformations", note: String.raw`a polynomial whose roots are $2 - r_i$ or $r_i^2$, an alternative to evaluating products (A2.4).` }
      ],
      exercises: [
        { q: String.raw`Let $r_1, r_2, r_3$ be the roots of $x^3 - 5x^2 + 8x - 13$. Find $r_1^2 + r_2^2 + r_3^2$.`, answer: "9",
          solution: String.raw`$e_1 = 5$ and $e_2 = 8$, so $p_2 = e_1^2 - 2e_2 = 25 - 16 = 9$.` },
        { q: String.raw`With the same roots, find $r_1^3 + r_2^3 + r_3^3$.`, answer: "44",
          solution: String.raw`Newton: $p_3 = e_1 p_2 - e_2 p_1 + 3e_3 = 5 \cdot 9 - 8 \cdot 5 + 3 \cdot 13 = 45 - 40 + 39 = 44$.` },
        { q: String.raw`With the same roots, find $(2 - r_1)(2 - r_2)(2 - r_3)$.`, answer: "-9",
          solution: String.raw`For the monic $P(x) = (x - r_1)(x - r_2)(x - r_3)$, the product is $P(2) = 8 - 20 + 16 - 13 = -9$.` }
      ],
      problems: ["2020 AMC 10A, Problem 14", "2019 AMC 12A, Problem 17", "2003 AIME II, Problem 9", "2019 AIME I, Problem 8"]
    },
    "A2.3": {
      prereq: ["vietas-general", "newtons-sums"],
      cards: ["fundamental-theorem-symmetric", "conjugate-root-theorems", "descartes-rule-signs"],
      body: String.raw`Three facts constrain where a polynomial's roots can be before any are found. Every symmetric expression in the roots is a polynomial in the coefficients; non-real roots of a real polynomial come in conjugate pairs, and irrational roots of a rational polynomial in matching pairs; and the signs of the coefficients bound how many roots are positive. With $3 + \sqrt2$ as a root of a monic quadratic with rational coefficients, the other root is $3 - \sqrt2$ and the quadratic is $x^2 - 6x + 7$, found without any computation beyond Vieta.

The [[fundamental-theorem-symmetric|fundamental theorem of symmetric polynomials]] guarantees that any expression in the roots that does not change under permuting them can be written in the elementary symmetric sums, and so in the coefficients. In practice the reduction is done by the identities of (A1.2) and Newton's sums: for the roots of $x^3 - 3x^2 + x + 1$, $\sum r_i^2 = 3^2 - 2 \cdot 1 = 7$. Expressions like $\sum r_i^2 r_j$ are reduced the same way, by writing them as a combination of $e_1 e_2$ and $e_3$.

If a polynomial has real coefficients, conjugating $P(z) = 0$ gives $P(\bar z) = 0$, so [[conjugate-root-theorems|non-real roots come in conjugate pairs]]; likewise a polynomial with rational coefficients that has $a + b\sqrt c$ as a root also has $a - b\sqrt c$. So a cubic with integer coefficients and root $4 + \sqrt5$ has $4 - \sqrt5$ as a second root, and its third root follows from the sum of the roots. Pairing conjugates also explains why a real polynomial of odd degree has a real root.

[[descartes-rule-signs|Descartes' rule of signs]] counts sign changes in the coefficients: the number of positive roots equals that count or is less by an even number, and the same applied to $P(-x)$ bounds the negative roots. A polynomial with all positive coefficients has no positive roots, which is often all a problem needs.

The signal is a symmetric expression in roots, a polynomial with a given irrational or complex root, or a question about how many roots are positive or real.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`the working identities for writing symmetric expressions in $e_1, e_2, e_3$ ((A1.2)).` },
        { card: "complex-basics", note: String.raw`conjugates and the modulus, used when complex roots come in pairs (A6.1).` },
        { card: "rational-root-theorem", note: String.raw`the candidates for rational roots, to test before the other constraints.` }
      ],
      exercises: [
        { q: String.raw`A monic quadratic with rational coefficients has $3 + \sqrt2$ as a root. What is its constant term?`, answer: "7",
          solution: String.raw`The other root is $3 - \sqrt2$, so the constant term is the product $(3 + \sqrt2)(3 - \sqrt2) = 9 - 2 = 7$ (and the quadratic is $x^2 - 6x + 7$).` },
        { q: String.raw`Let $a, b, c$ be the roots of $x^3 - 3x^2 + x + 1$. Find $a^2 + b^2 + c^2$.`, answer: "7",
          solution: String.raw`$e_1 = a + b + c = 3$ and $e_2 = ab + bc + ca = 1$, so $a^2 + b^2 + c^2 = e_1^2 - 2e_2 = 9 - 2 = 7$.` },
        { q: String.raw`What is the largest possible number of positive real roots of $x^5 - x^4 + x^3 - x^2 + x - 1$?`, answer: "5",
          solution: String.raw`The signs $+ - + - + -$ change $5$ times, so by Descartes the number of positive roots is $5$, $3$, or $1$; the largest possibility allowed by the rule is $5$. (In fact the polynomial is $(x - 1)(x^4 + x^2 + 1)$, which has only the positive root $1$, showing the rule gives an upper bound.)` }
      ],
      problems: ["2007 AMC 12A, Problem 18", "2025 AMC 12B, Problem 8", "2022 AMC 10A, Problem 16", "2021 Spring AMC 10A, Problem 14"]
    },
    "A2.4": {
      prereq: ["vietas-general"],
      cards: ["root-transformations"],
      body: String.raw`To answer a question about $\tfrac1{r_i}$, $r_i - 1$, or $2r_i$ for the roots $r_i$ of a polynomial, build the polynomial whose roots are those numbers and read its coefficients. The reciprocals of the roots of $x^3 - 2x^2 + 3x - 4$ are the roots of $-4x^3 + 3x^2 - 2x + 1$, and Vieta on that polynomial gives their sum, $\tfrac34$, at once. This is the idea of [[root-transformations|transforming the roots]].

The transformations come from substitution. If $r$ is a root of $P$, then $\tfrac1r$ is a root of $x^n P(\tfrac1x)$, which is $P$ with its coefficients reversed. The number $r + k$ is a root of $P(x - k)$, and $kr$ is a root of $P(\tfrac xk)$, which multiplies the coefficient of $x^{n-j}$ by $k^j$. So the roots of $x^2 - 5x + 6$ are $2$ and $3$, and the polynomial with roots $1$ and $2$ is $P(x + 1) = x^2 - 3x + 2$. For a transformation that is not one-to-one, such as $r \mapsto r^2$, substitute $\sqrt x$ and clear the radical: from $P(x) = 0$, separate the odd and even powers, $E(x^2) = -x\,O(x^2)$, and square.

A transformation is often the cleanest route when a problem relates two polynomials through their roots. If the roots of one quadratic are twice those of another, then their coefficients are related by the scaling rule, which gives an equation in the coefficients without ever naming the roots. And the reciprocal polynomial explains palindromic polynomials from (A1.4): a polynomial equal to its own reversal has roots closed under $r \mapsto \tfrac1r$.

The signal is a question about the roots after a fixed operation, $\tfrac1r$, $r + k$, $kr$, $r^2$, or a relation between the roots of two polynomials.`,
      related: [
        { card: "palindromic-polynomials", note: String.raw`a polynomial equal to its own reversal, with roots in pairs $r, \tfrac1r$ ((A1.4)).` },
        { card: "products-over-roots", note: String.raw`evaluating $P(k)$ instead of building the polynomial with roots $k - r_i$ (A2.2).` },
        { card: "vietas-quadratic", note: String.raw`reading the sum and product off the transformed quadratic.` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the reciprocals of the roots of $x^3 - 2x^2 + 3x - 4$.`, answer: "3/4",
          solution: String.raw`The reciprocals are the roots of $-4x^3 + 3x^2 - 2x + 1$, whose root sum is $-\tfrac{3}{-4} = \tfrac34$. Equivalently, $\sum \tfrac1{r_i} = \tfrac{e_2}{e_3} = \tfrac34$.` },
        { q: String.raw`The roots of $x^2 - 5x + 6$ are each decreased by $1$. What is the product of the new roots?`, answer: "2",
          solution: String.raw`The new roots are the roots of $P(x + 1) = (x + 1)^2 - 5(x + 1) + 6 = x^2 - 3x + 2$, whose product is $2$. (The roots $2, 3$ become $1, 2$.)` },
        { q: String.raw`The roots of $x^2 + px + q$ are $3$ times the roots of $x^2 + 2x - 5$. Find $q$.`, answer: "-45",
          solution: String.raw`The polynomial with roots $3r$ is $9P(\tfrac x3) = x^2 + 6x - 45$, so $q = -45$. Check: the product of the roots is multiplied by $9$, and $9 \cdot (-5) = -45$.` }
      ],
      problems: ["2005 AMC 10B, Problem 16", "2021 Spring AMC 12B, Problem 16", "2021 Fall AMC 12A, Problem 15"]
    },
    "A2.5": {
      prereq: ["factor-remainder-theorem"],
      cards: ["lagrange-interpolation-formula", "lagrange-interpolation", "coefficient-extraction", "comparing-coefficients"],
      body: String.raw`A polynomial of degree at most $n - 1$ is determined by its values at $n$ points, and its coefficients are determined by the identity it satisfies; this lesson is about using both facts in reverse. The quadratic through $(1, 1)$, $(2, 3)$, $(3, 7)$ is $x^2 - x + 1$, and its next value is $13$; the sum of the coefficients of $(2x - 1)^5$ is $1$, read off by setting $x = 1$ with no expansion.

[[lagrange-interpolation|Interpolation]] recovers a polynomial from values. Two polynomials of degree at most $n - 1$ that agree at $n$ points are equal, since their difference has more roots than its degree allows. The [[lagrange-interpolation-formula|Lagrange formula]] writes the polynomial down: $P(x) = \sum_i y_i \prod_{j \ne i} \tfrac{x - x_j}{x_i - x_j}$, each term being $y_i$ at its own point and $0$ at the others. In contest problems the formula itself is used less often than the idea behind it: if $P(k) = \tfrac1k$ for $k = 1, \ldots, n$, then $xP(x) - 1$ has roots $1, \ldots, n$, so it equals $c(x - 1) \cdots (x - n)$, and $c$ comes from $x = 0$.

[[coefficient-extraction|Coefficient sums]] are evaluations. The sum of all coefficients of $P$ is $P(1)$; the alternating sum is $P(-1)$; and the sum of the even-index coefficients is $\tfrac{P(1) + P(-1)}{2}$, which for $(2x - 1)^5$ is $\tfrac{1 + (-243)}{2} = -121$. Sums over every third coefficient use cube roots of unity in the same way (A6.3).

[[comparing-coefficients|Comparing coefficients]] turns one identity into several equations. If two polynomials agree for every $x$, they have the same coefficient on each power; an equation that must hold "for all $y$", such as $8xy - 12y + 2x - 3 = 0$, forces the coefficient of $y$ and the constant term to vanish separately, giving $x = \tfrac32$.

The signal is a polynomial given by values, a question about a sum of coefficients, or an identity that holds for all $x$.`,
      related: [
        { card: "finite-differences", note: String.raw`the next value of a polynomial from a table of differences, another route to interpolation (A3.3).` },
        { card: "roots-of-unity-filter", note: String.raw`sums of every $k$th coefficient, by evaluating at the $k$th roots of unity (A6.3).` },
        { card: "subtract-and-factor", note: String.raw`subtracting the pattern the values follow to reach a polynomial with known roots ((A1.5)).` }
      ],
      exercises: [
        { q: String.raw`A quadratic $P$ has $P(1) = 1$, $P(2) = 3$, $P(3) = 7$. Find $P(4)$.`, answer: "13",
          solution: String.raw`The differences are $2$ and $4$, so the second difference is $2$ and the next first difference is $6$: $P(4) = 7 + 6 = 13$. (Indeed $P(x) = x^2 - x + 1$.)` },
        { q: String.raw`Find the sum of the coefficients of the even powers of $x$ in $(2x - 1)^5$.`, answer: "-121",
          solution: String.raw`With $P(x) = (2x - 1)^5$, the even-power coefficients add to $\tfrac{P(1) + P(-1)}{2} = \tfrac{1 + (-3)^5}{2} = \tfrac{1 - 243}{2} = -121$.` },
        { q: String.raw`For what value of $x$ does $8xy - 12y + 2x - 3 = 0$ hold for every $y$?`, answer: "3/2",
          solution: String.raw`Group by $y$: $(8x - 12)y + (2x - 3) = (2x - 3)(4y + 1)$. This is $0$ for every $y$ only when $2x - 3 = 0$, that is $x = \tfrac32$.` }
      ],
      problems: ["2009 AMC 12A, Problem 9", "2001 AMC 12, Problem 13", "2002 AMC 10B, Problem 13", "2019 AMC 10B, Problem 4", "2005 AMC 12A, Problem 24"]
    }
  },
  review: ["2025 AMC 10B, Problem 10", "2022 AMC 10B, Problem 17", "1996 AIME, Problem 5", "2014 AIME II, Problem 5", "2015 AIME II, Problem 6",
    "2008 AIME II, Problem 7", "1995 AIME, Problem 5", "2021 AIME II, Problem 4", "2013 AIME I, Problem 10", "2014 AIME I, Problem 9"]
};
