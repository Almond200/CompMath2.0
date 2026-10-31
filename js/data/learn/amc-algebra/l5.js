// Learn, AMC Algebra, chapter L5: polynomials and algebraic structure (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L5"] = {
  lessons: {
    "L5.1": {
      prereq: ["vietas-quadratic", "square-of-sum"],
      cards: ["vietas-general", "newtons-sums", "products-over-roots", "fundamental-theorem-symmetric"],
      body: String.raw`For polynomials of any degree, the coefficients are the elementary symmetric sums of the roots, and every symmetric expression in the roots can be computed from them. This is the main polynomial tool of the AMC 12.

[[vietas-general|Vieta's formulas]] for $x^3 + ax^2 + bx + c$ with roots $r, s, t$: $r + s + t = -a$, $rs + st + tr = b$, $rst = -c$, and similarly for higher degree with alternating signs. For $x^3 - 2x^2 - 5x + 6$, the roots add to $2$, pairwise products add to $-5$ and the product is $-6$. Then $r^2 + s^2 + t^2 = 2^2 - 2(-5) = 14$.

The [[fundamental-theorem-symmetric|fundamental theorem of symmetric polynomials]] guarantees that any symmetric expression is a polynomial in these sums. [[newtons-sums|Newton's sums]] compute power sums recursively: each root satisfies the polynomial, so $p_k$ satisfies the same recursion as the coefficients. For $x^3 - 6x^2 + 11x - 6$ (roots $1, 2, 3$), $p_3 = 6p_2 - 11p_1 + 3 \cdot 6 = 6 \cdot 14 - 66 + 18 = 36$.

[[products-over-roots|Products over the roots]] are values of the polynomial: $\prod(c - r_i) = P(c)$ for monic $P$, so $(r + 1)(s + 1)(t + 1) = -P(-1) = -8$ for the cubic above. Sums of reciprocals are ratios of coefficients, and $\prod(r_i^2 + 1)$ is $P(i)P(-i)$.

Write every symmetric quantity through the coefficients, and evaluate the polynomial for products. The next lesson studies where roots lie.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`the two-variable version (L1.2).` },
        { card: "comparing-coefficients", note: String.raw`reading identities coefficient by coefficient (L3.1).` },
        { card: "roots-of-unity", note: String.raw`products over complex roots (L8.3).` }
      ],
      exercises: [
        { q: String.raw`The roots of $x^3 - 2x^2 - 5x + 6$ are $r$, $s$, $t$. Find $r^2 + s^2 + t^2$.`, answer: "14",
          solution: String.raw`$r + s + t = 2$ and $rs + st + tr = -5$, so $r^2 + s^2 + t^2 = 4 + 10 = 14$.` },
        { q: String.raw`For the same roots, find $(r + 1)(s + 1)(t + 1)$.`, answer: "-8",
          solution: String.raw`$P(x) = (x - r)(x - s)(x - t)$, so $P(-1) = -(r + 1)(s + 1)(t + 1)$. Since $P(-1) = -1 - 2 + 5 + 6 = 8$, the product is $-8$.` }
      ],
      problems: [
        "2020 AMC 10A, Problem 14",
        "2022 AMC 10A, Problem 16",
        "2024 AMC 12B, Problem 17",
        "2019 AMC 10A, Problem 24",
        "2010 AMC 12A, Problem 21",
        "2004 AMC 12B, Problem 23",
        "1995 AIME, Problem 2",
        "2019 AIME I, Problem 8"
      ]
    },
    "L5.2": {
      prereq: ["vietas-general", "quadratic-formula"],
      cards: ["conjugate-root-theorems", "descartes-rule-signs", "root-transformations", "quadratic-root-location"],
      body: String.raw`Questions about polynomial roots often ask not for the roots but for facts about them: which other numbers must be roots, how many are positive, what polynomial has the roots doubled or reciprocated, or for which parameters the roots fall in a given interval.

The [[conjugate-root-theorems|conjugate root theorems]]: if a polynomial with real coefficients has root $a + bi$, it also has $a - bi$; if it has rational coefficients and root $a + \sqrt b$, it also has $a - \sqrt b$. So a quadratic with integer coefficients and root $2 + \sqrt3$ is $x^2 - 4x + 1$. [[descartes-rule-signs|Descartes' rule of signs]] bounds the number of positive roots by the number of sign changes in the coefficients: $x^3 - x^2 - x - 1$ has one change, so exactly one positive root.

[[root-transformations|Root transformations]] build new polynomials without finding roots: replacing $x$ by $\tfrac x2$ doubles the roots ($x^2 - 5x + 6$ becomes $x^2 - 10x + 24$), replacing $x$ by $x - c$ shifts them by $c$, and reversing the coefficients takes reciprocals.

[[quadratic-root-location|Locating roots]] of a quadratic $f$ without solving uses the discriminant, the vertex and values at endpoints: both roots exceed $m$ when the discriminant is nonnegative, the vertex is to the right of $m$, and $f(m) \gt 0$ (for $a \gt 0$); one root on each side of $m$ exactly when $f(m) \lt 0$.

Use conjugates to find hidden roots, sign changes to count positive ones, substitutions to transform them, and values to locate them. The next lesson treats remainders and interpolation.`,
      related: [
        { card: "complex-basics", note: String.raw`complex roots and conjugates (L8.1).` },
        { card: "vertex-form", note: String.raw`the vertex used in root location (L2.1).` },
        { card: "rational-root-theorem", note: String.raw`listing rational roots (L3.1).` }
      ],
      exercises: [
        { q: String.raw`A quadratic $x^2 + bx + c$ with integer coefficients has root $2 + \sqrt3$. Find $c - b$.`, answer: "5",
          solution: String.raw`The other root is $2 - \sqrt3$, so the sum is $4 = -b$ and the product is $1 = c$. Then $c - b = 1 + 4 = 5$.` },
        { q: String.raw`The roots of $x^2 - 5x + 6$ are doubled. Find the constant term of the monic quadratic with the new roots.`, answer: "24",
          solution: String.raw`The roots $2$ and $3$ become $4$ and $6$, with product $24$; equivalently $4\left(\left(\tfrac x2\right)^2 - 5\tfrac x2 + 6\right) = x^2 - 10x + 24$.` }
      ],
      problems: [
        "2025 AMC 12B, Problem 8",
        "2005 AMC 10B, Problem 16",
        "2021 Fall AMC 12A, Problem 15",
        "2021 Spring AMC 12B, Problem 16",
        "2007 AMC 12A, Problem 18",
        "2004 AMC 12A, Problem 23",
        "2021 AIME II, Problem 4",
        "2010 AIME II, Problem 7"
      ]
    },
    "L5.3": {
      prereq: ["factor-remainder-theorem"],
      cards: ["polynomial-crt", "lagrange-interpolation-formula"],
      body: String.raw`A polynomial is determined by enough of its values, and its remainder on division by a product of linear factors is determined by its values at their roots. These two facts handle problems that give a few values and ask for more.

The remainder on dividing $P(x)$ by $(x - a)(x - b)$ is a linear $R(x)$ with $R(a) = P(a)$ and $R(b) = P(b)$: this is the [[polynomial-crt|Chinese remainder theorem for polynomials]]. If $P(1) = 2$ and $P(2) = 3$, the remainder on division by $(x - 1)(x - 2)$ is $x + 1$. With more factors the remainder has higher degree, fixed by the same number of values.

The [[lagrange-interpolation-formula|Lagrange interpolation formula]] writes the unique polynomial of degree at most $n$ through $n + 1$ points as a sum of terms that each vanish at all but one point. In practice, finite differences or a guess often finds it faster: the quadratic through $(1, 2)$, $(2, 5)$, $(3, 10)$ is $x^2 + 1$, so $P(4) = 17$. A powerful trick is to consider $Q(x) = P(x) - g(x)$ when $P$ agrees with a simple $g$ at many points: $Q$ then has known roots and factors completely.

Turn given values into roots of a difference, and remainders into values. The next lesson treats radicals and reciprocal substitutions.`,
      related: [
        { card: "finite-differences", note: String.raw`finding the next value of a polynomial by differences (L6.2).` },
        { card: "comparing-coefficients", note: String.raw`fixing the unknown coefficients (L3.1).` },
        { card: "crt", note: String.raw`the Chinese remainder theorem for integers (M2.3).` }
      ],
      exercises: [
        { q: String.raw`A polynomial has $P(1) = 2$ and $P(2) = 3$. The remainder on dividing $P(x)$ by $(x - 1)(x - 2)$ is $R(x)$. Find $R(0)$.`, answer: "1",
          solution: String.raw`$R$ is linear with $R(1) = 2$ and $R(2) = 3$, so $R(x) = x + 1$ and $R(0) = 1$.` },
        { q: String.raw`A quadratic has $P(1) = 2$, $P(2) = 5$, $P(3) = 10$. Find $P(4)$.`, answer: "17",
          solution: String.raw`The differences are $3$ and $5$, with second difference $2$, so the next difference is $7$ and $P(4) = 17$ (the polynomial is $x^2 + 1$).` }
      ],
      problems: ["2022 AMC 10B, Problem 21"]
    },
    "L5.4": {
      prereq: ["rationalizing", "square-of-sum"],
      cards: ["denesting-radicals", "palindromic-polynomials", "reciprocal-power-sums", "forced-difference-of-squares"],
      body: String.raw`A few algebraic shapes recur on the AMC 12: nested radicals that are perfect squares, equations symmetric under $x \to \tfrac1x$, and integer equations forced into a difference of squares. Each has a standard move.

[[denesting-radicals|Denesting]] writes $\sqrt{a + 2\sqrt b}$ as $\sqrt m + \sqrt n$ with $m + n = a$ and $mn = b$: $\sqrt{7 + 4\sqrt3} = \sqrt{7 + 2\sqrt{12}} = 2 + \sqrt3$, since $4 + 3 = 7$ and $4 \cdot 3 = 12$.

A [[palindromic-polynomials|palindromic polynomial]], whose coefficients read the same both ways, has roots in pairs $r$ and $\tfrac1r$; dividing by $x^{n/2}$ and substituting $t = x + \tfrac1x$ halves the degree. The [[reciprocal-power-sums|reciprocal power sums]] then follow from $t$: if $x + \tfrac1x = 3$, then $x^2 + \tfrac1{x^2} = 3^2 - 2 = 7$ and $x^3 + \tfrac1{x^3} = 3^3 - 3 \cdot 3 = 18$.

When an integer equation can be rearranged into $A^2 - B^2 = N$, it is [[forced-difference-of-squares|forced into a difference of squares]] $(A - B)(A + B) = N$ with factors of equal parity, and listing factor pairs finishes it; equations like $n^2 + 12n = m^2$ complete the square first.

Look for perfect-square radicals, reciprocal symmetry, and differences of squares. The last lesson of the chapter collects factorizations.`,
      related: [
        { card: "difference-of-squares-rep", note: String.raw`which numbers are differences of squares (M2.4).` },
        { card: "completing-the-square", note: String.raw`turning a quadratic into a square plus a constant (L1.1).` },
        { card: "de-moivre", note: String.raw`$x + \tfrac1x = 2\cos\theta$ on the unit circle (L8.2).` }
      ],
      exercises: [
        { q: String.raw`Write $\sqrt{7 + 4\sqrt3}$ as $a + \sqrt b$ with integers $a$, $b$ and find $a + b$.`, answer: "5",
          solution: String.raw`$(2 + \sqrt3)^2 = 4 + 4\sqrt3 + 3 = 7 + 4\sqrt3$, so the radical is $2 + \sqrt3$ and $a + b = 5$.` },
        { q: String.raw`If $x + \tfrac1x = 3$, find $x^3 + \tfrac1{x^3}$.`, answer: "18",
          solution: String.raw`$\left(x + \tfrac1x\right)^3 = x^3 + \tfrac1{x^3} + 3\left(x + \tfrac1x\right)$, so $x^3 + \tfrac1{x^3} = 27 - 9 = 18$.` }
      ],
      problems: [
        "2024 AMC 10B, Problem 13",
        "2021 Spring AMC 10B, Problem 15",
        "2011 AMC 10A, Problem 16",
        "2007 AMC 10A, Problem 20",
        "2009 AMC 12B, Problem 19",
        "1990 AIME, Problem 2",
        "2006 AIME I, Problem 5"
      ]
    },
    "L5.5": {
      prereq: ["difference-of-squares", "sum-zero-identities"],
      cards: ["useful-factorizations", "cubes-minus-3abc", "antisymmetric-factorization", "sophie-germain"],
      body: String.raw`A handful of factorizations turn expressions that look prime or irreducible into products. Recognizing them is the whole solution to several AMC 12 problems.

[[useful-factorizations|Factorizations worth knowing]]: $x^4 + x^2 + 1 = (x^2 + x + 1)(x^2 - x + 1)$, $ab + a + b + 1 = (a + 1)(b + 1)$, and $x^3 - 1 = (x - 1)(x^2 + x + 1)$. The [[sophie-germain|Sophie Germain identity]] $a^4 + 4b^4 = (a^2 + 2b^2 - 2ab)(a^2 + 2b^2 + 2ab)$ factors $5^4 + 4 = 629 = 17 \cdot 37$, and makes $n^4 + 4$ composite for every $n \gt 1$.

The [[cubes-minus-3abc|factorization of $a^3 + b^3 + c^3 - 3abc$]] is $(a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$, the second factor being half the sum of the squared differences. With $a + b + c = 6$ and $ab + bc + ca = 9$, $a^2 + b^2 + c^2 = 18$, and the expression is $6(18 - 9) = 54$.

An [[antisymmetric-factorization|antisymmetric expression]], one that changes sign when two variables swap, vanishes when any two are equal, so it has the factor $(a - b)(b - c)(c - a)$; a degree count and one value fix the rest. For example $a^2(b - c) + b^2(c - a) + c^2(a - b) = -(a - b)(b - c)(c - a)$.

Before computing, test whether the expression has one of these shapes. The next chapter studies sequences, sums and inequalities.`,
      related: [
        { card: "an-minus-bn", note: String.raw`the factorization of $a^n - b^n$ (L3.5).` },
        { card: "sfft", note: String.raw`completing a product for integer equations (M2.4).` },
        { card: "factor-remainder-theorem", note: String.raw`a polynomial vanishing at $a = b$ has the factor $a - b$ (L3.1).` }
      ],
      exercises: [
        { q: String.raw`Find the largest prime factor of $5^4 + 4$.`, answer: "37",
          solution: String.raw`By Sophie Germain with $b = 1$: $(25 + 2 - 10)(25 + 2 + 10) = 17 \cdot 37$, so $37$.` },
        { q: String.raw`If $a + b + c = 6$ and $ab + bc + ca = 9$, find $a^3 + b^3 + c^3 - 3abc$.`, answer: "54",
          solution: String.raw`$a^2 + b^2 + c^2 = 36 - 18 = 18$, so the expression is $(a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) = 6 \cdot 9 = 54$.` }
      ],
      problems: [
        "2020 AMC 10B, Problem 22",
        "1987 AIME, Problem 14"
      ]
    }
  }
};
