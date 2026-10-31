// Learn, AMC Algebra, chapter L10: polynomials for the AMC 12 (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L10"] = {
  lessons: {
    "L10.1": {
      prereq: ["vietas-quadratic", "factor-remainder-theorem"],
      cards: [],
      body: String.raw`This chapter extends the polynomial tools to any degree. Its topics are Vieta's formulas and power sums of roots for cubics and beyond, conjugate roots and polynomials whose roots are moved, remainders and interpolation, radicals and reciprocal substitutions, and a few factorizations worth knowing.

For a cubic $x^3 + bx^2 + cx + d$ with roots $r$, $s$, $t$, Vieta's formulas give $r + s + t = -b$, $rs + st + tr = c$ and $rst = -d$, and every symmetric expression in the roots follows: for $x^3 - 6x^2 + 11x - 6$, $r^2 + s^2 + t^2 = 36 - 22 = 14$.

A polynomial with rational coefficients that has the root $2 + \sqrt3$ also has $2 - \sqrt3$, and one with real coefficients has the conjugate of each non-real root. Substituting for $x$ moves all the roots at once, which writes down a polynomial with shifted or inverted roots without finding them.

Some expressions are better handled by a substitution or an identity: if $a + \tfrac1a = 3$, then $a^2 + \tfrac1{a^2} = 7$, and $\sqrt{9 + 4\sqrt5} = 2 + \sqrt5$. Identities such as $a^4 + 4b^4 = (a^2 + 2b^2 + 2ab)(a^2 + 2b^2 - 2ab)$ factor expressions that look prime.

The lessons take these ideas in turn: Vieta for any degree and power sums (L10.2), conjugate and transformed roots (L10.3), remainders and interpolation (L10.4), radicals and reciprocal substitutions (L10.5), and factorizations worth knowing (L10.6). The Summary (L10.7) collects the strategies.`,
      exercises: [
        { q: String.raw`The roots of $x^3 - 6x^2 + 11x - 6$ are $r$, $s$, $t$. Find $r^2 + s^2 + t^2$.`, answer: "14",
          solution: String.raw`By Vieta, $r + s + t = 6$ and $rs + st + tr = 11$, so $r^2 + s^2 + t^2 = 36 - 22 = 14$.` },
        { q: String.raw`If $a + \tfrac1a = 3$, find $a^2 + \tfrac1{a^2}$.`, answer: "7",
          solution: String.raw`Square: $a^2 + 2 + \tfrac1{a^2} = 9$, so $a^2 + \tfrac1{a^2} = 7$.` },
        { q: String.raw`A quadratic with rational coefficients has the root $2 + \sqrt3$. Find the sum of its roots.`, answer: "4",
          solution: String.raw`The conjugate $2 - \sqrt3$ is also a root, and the two add to $4$.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 16",
        "2007 AMC 10A, Problem 20",
        "2007 AMC 12A, Problem 18"
      ]
    },
    "L10.2": {
      prereq: ["vietas-quadratic", "symmetric-polynomial-strategies"],
      cards: ["vietas-general", "newtons-sums"],
      body: String.raw`Cubic and higher-degree polynomials rarely have roots that are easy to find, yet problems ask about those roots constantly: the sum of their squares, the product of the roots each increased by $2$, the sum of their cubes. Vieta's formulas, together with Newton's sums, answer such questions from the coefficients alone.

[[vietas-general|Vieta's formulas]] for a polynomial $a_nx^n + a_{n-1}x^{n-1} + \cdots + a_0$ with roots $r_1, \ldots, r_n$ say that the sum of the roots is $-\tfrac{a_{n-1}}{a_n}$, the sum of the products of pairs is $\tfrac{a_{n-2}}{a_n}$, and so on with alternating signs, ending with the product of all the roots, $(-1)^n\tfrac{a_0}{a_n}$. They come from expanding $a_n(x - r_1)\cdots(x - r_n)$. For $x^3 - 2x^2 - 5x + 6$ the roots add to $2$ and their pairwise products to $-5$, so their squares add to $4 + 10 = 14$. A product such as $(2 - r)(2 - s)(2 - t)$ is the monic polynomial evaluated at $2$: $8 - 8 - 10 + 6 = -4$.

[[newtons-sums|Newton's sums]] give the power sums $p_k = r_1^k + \cdots + r_n^k$ one after another: for a monic cubic $x^3 + bx^2 + cx + d$, $p_1 = -b$, $p_2 = -bp_1 - 2c$, and $p_k = -bp_{k-1} - cp_{k-2} - dp_{k-3}$ for $k \ge 3$. Equivalently, each root satisfies the polynomial, so $r^3 = -br^2 - cr - d$, and adding over the roots gives the recursion. For $x^3 - 3x + 1$: $p_1 = 0$, $p_2 = 6$, $p_3 = 3p_1 - 3 = -3$.

Vieta with integer roots narrows a search: if the roots are positive integers with a given sum and product, there are only a few possibilities to list.

Translate every question about the roots into the elementary symmetric sums, evaluate the polynomial for products of shifted roots, and run Newton's sums for power sums. The next lesson moves the roots.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`writing symmetric expressions in sums and products (L3.3).` },
        { card: "roots-of-unity", note: String.raw`polynomials whose roots are the roots of unity, where Vieta gives sums of cosines (L13.4).` }
      ],
      exercises: [
        { q: String.raw`The roots of $x^3 - 2x^2 - 5x + 6$ are $r$, $s$, $t$. Find $(2 - r)(2 - s)(2 - t)$.`, answer: "-4",
          solution: String.raw`The polynomial is $(x - r)(x - s)(x - t)$, so the product is its value at $2$: $8 - 8 - 10 + 6 = -4$.` },
        { q: String.raw`The roots of $x^3 - 2x^2 - 5x + 6$ are $r$, $s$, $t$. Find $r^2 + s^2 + t^2$.`, answer: "14",
          solution: String.raw`By Vieta the roots add to $2$ and the pairwise products to $-5$, so $r^2 + s^2 + t^2 = 2^2 - 2(-5) = 14$. (The roots are $1$, $3$, $-2$.)` },
        { q: String.raw`The roots of $x^3 - 3x + 1$ are $r$, $s$, $t$. Find $r^3 + s^3 + t^3$.`, answer: "-3",
          solution: String.raw`Each root satisfies $r^3 = 3r - 1$, so $r^3 + s^3 + t^3 = 3(r + s + t) - 3 = 3 \cdot 0 - 3 = -3$.` }
      ],
      problems: [
        "2021 Spring AMC 12A, Problem 12",
        "2023 AMC 12B, Problem 14",
        "2004 AMC 12B, Problem 17",
        "2025 AMC 12A, Problem 19",
        "2003 AMC 12A, Problem 21"
      ]
    },
    "L10.3": {
      prereq: ["vietas-general"],
      cards: ["conjugate-root-theorems", "root-transformations"],
      body: String.raw`If a polynomial with integer coefficients has the root $4 - \sqrt5$, what else must be a root? If a cubic with real coefficients has the roots $2$ and $1 + i$, what is it? If $r$ and $s$ are the roots of $x^2 - 5x + 3$, which quadratic has the roots $r + 1$ and $s + 1$? Two facts answer these: roots come in conjugate pairs, and substituting for $x$ moves all the roots together.

[[conjugate-root-theorems|The conjugate root theorems]]: a polynomial with real coefficients has its non-real roots in conjugate pairs $a \pm bi$, and one with rational coefficients has its roots $a \pm \sqrt b$ (with $\sqrt b$ irrational) in pairs. So a monic quadratic with rational coefficients and root $3 + \sqrt2$ is $(x - 3)^2 - 2 = x^2 - 6x + 7$, and a real cubic with roots $2$ and $1 + i$ is $(x - 2)\left((x - 1)^2 + 1\right) = x^3 - 4x^2 + 6x - 4$. A pair contributes a quadratic factor whose coefficients are the pair's sum and product.

[[root-transformations|Transforming the roots]] is a substitution. If $P(x)$ has roots $r_i$, then $P(x - 1)$ has roots $r_i + 1$, $P\left(\tfrac x2\right)$ has roots $2r_i$, and $x^nP\left(\tfrac1x\right)$, the polynomial with its coefficients reversed, has roots $\tfrac1{r_i}$. So the quadratic with roots $r + 1$ and $s + 1$ is $(x - 1)^2 - 5(x - 1) + 3 = x^2 - 7x + 9$.

When a root is irrational or non-real, write down its partner; when the question involves shifted, scaled or inverted roots, substitute instead of solving. The next lesson finds remainders and polynomials from values.`,
      related: [
        { card: "complex-basics", note: String.raw`the conjugate $a - bi$ and the modulus (L13.2).` },
        { card: "palindromic-polynomials", note: String.raw`polynomials that equal their own reversal, whose roots come in pairs $r$, $\tfrac1r$ (L10.5).` }
      ],
      exercises: [
        { q: String.raw`A monic quadratic with rational coefficients has the root $3 + \sqrt2$. Find its constant term.`, answer: "7",
          solution: String.raw`The other root is $3 - \sqrt2$, and the constant term is the product $9 - 2 = 7$: the quadratic is $x^2 - 6x + 7$.` },
        { q: String.raw`A monic cubic with real coefficients has the roots $2$ and $1 + i$. Find its constant term.`, answer: "-4",
          solution: String.raw`The third root is $1 - i$. The cubic is $(x - 2)(x^2 - 2x + 2) = x^3 - 4x^2 + 6x - 4$, with constant term $-4$.` },
        { q: String.raw`The roots of $x^2 - 5x + 3$ are $r$ and $s$. Find the constant term of the monic quadratic with roots $r + 1$ and $s + 1$.`, answer: "9",
          solution: String.raw`Substitute $x - 1$ for $x$: $(x - 1)^2 - 5(x - 1) + 3 = x^2 - 7x + 9$. The constant term is $9$, which is $(r + 1)(s + 1) = rs + r + s + 1 = 3 + 5 + 1$.` }
      ],
      problems: [
        "2025 AMC 12B, Problem 8",
        "2021 Spring AMC 12B, Problem 16",
        "2021 Fall AMC 12A, Problem 15",
        "2020 AMC 12B, Problem 17",
        "2004 AMC 12A, Problem 23"
      ]
    },
    "L10.4": {
      prereq: ["factor-remainder-theorem", "linear-elimination"],
      cards: ["polynomial-crt", "lagrange-interpolation"],
      body: String.raw`Sometimes a polynomial is known only through a few remainders or a few values. A polynomial leaves remainder $3$ on division by $x - 1$ and $5$ on division by $x - 2$; what does it leave on division by $(x - 1)(x - 2)$? A quadratic passes through $(0, 1)$, $(1, 3)$ and $(2, 7)$; what is its value at $3$? Both are answered by building the polynomial of smallest degree that fits.

[[polynomial-crt|Remainders by several divisors]] combine like the Chinese Remainder Theorem for numbers. The remainder on division by $(x - 1)(x - 2)$ has degree at most $1$, say $ax + b$, and agrees with $P$ at $1$ and $2$: $a + b = 3$ and $2a + b = 5$, so the remainder is $2x + 1$, and its value at $3$ is $7$. In general, the remainder on division by a product of coprime factors is fixed by the remainders on division by each factor.

[[lagrange-interpolation|Interpolation]] says that $n + 1$ values fix a polynomial of degree at most $n$, and it can be written down directly, or found from differences or by solving for its coefficients. The quadratic through $(0, 1)$, $(1, 3)$, $(2, 7)$ is $x^2 + x + 1$, with value $13$ at $3$. Often the fastest route builds a polynomial that vanishes at the known points: if $P$ has degree $3$, roots $1$, $2$, $3$ and $P(0) = -12$, then $P(x) = a(x - 1)(x - 2)(x - 3)$ with $-6a = -12$, so $a = 2$ and $P(4) = 12$.

For a remainder, write it with unknown coefficients and match values at the roots of the divisor; for a polynomial given by values, build a product that vanishes at them. The next lesson simplifies radicals and reciprocal expressions.`,
      related: [
        { card: "finite-differences", note: String.raw`extending a polynomial sequence by its differences (L11.4).` },
        { card: "crt", note: String.raw`the Chinese Remainder Theorem for integers, the same structure.` }
      ],
      exercises: [
        { q: String.raw`A polynomial $P$ has $P(1) = 3$ and $P(2) = 5$. Its remainder on division by $(x - 1)(x - 2)$ is $R(x)$. Find $R(3)$.`, answer: "7",
          solution: String.raw`Write $R(x) = ax + b$ with $a + b = 3$ and $2a + b = 5$: $a = 2$, $b = 1$. So $R(3) = 7$.` },
        { q: String.raw`A polynomial of degree at most $2$ has $P(0) = 1$, $P(1) = 3$ and $P(2) = 7$. Find $P(3)$.`, answer: "13",
          solution: String.raw`The differences are $2$ and $4$, and the second difference is $2$, so the next difference is $6$ and $P(3) = 13$. (The polynomial is $x^2 + x + 1$.)` },
        { q: String.raw`A cubic $P$ has roots $1$, $2$, $3$ and $P(0) = -12$. Find $P(4)$.`, answer: "12",
          solution: String.raw`$P(x) = a(x - 1)(x - 2)(x - 3)$, and $P(0) = -6a = -12$ gives $a = 2$. Then $P(4) = 2 \cdot 3 \cdot 2 \cdot 1 = 12$.` }
      ],
      problems: [
        "2022 AMC 12B, Problem 20",
        "2005 AMC 12A, Problem 24"
      ]
    },
    "L10.5": {
      prereq: ["square-of-sum", "difference-of-squares"],
      cards: ["denesting-radicals", "palindromic-polynomials", "reciprocal-power-sums", "forced-difference-of-squares"],
      body: String.raw`Some expressions simplify only with a specific trick. $\sqrt{9 + 4\sqrt5}$ is $2 + \sqrt5$; from $x + \tfrac1x = 4$ the value of $x^4 + \tfrac1{x^4}$ follows; a quartic whose coefficients read the same both ways reduces to a quadratic; and $n^4 - 20n^2 + 4$ factors although it does not look like it. Each trick turns the expression into something familiar.

[[denesting-radicals|A nested radical]] $\sqrt{a + 2\sqrt b}$ equals $\sqrt m + \sqrt n$ when $m + n = a$ and $mn = b$, because $(\sqrt m + \sqrt n)^2 = m + n + 2\sqrt{mn}$. So $\sqrt{9 + 4\sqrt5} = \sqrt{9 + 2\sqrt{20}}$ needs $m + n = 9$ and $mn = 20$: $m = 5$, $n = 4$, giving $\sqrt5 + 2$.

[[reciprocal-power-sums|The reciprocal power sums]] $x^k + x^{-k}$ follow from $t = x + \tfrac1x$ by squaring and multiplying: $x^2 + x^{-2} = t^2 - 2$, $x^3 + x^{-3} = t^3 - 3t$. From $x + \tfrac1x = 4$: $x^2 + x^{-2} = 14$ and $x^4 + x^{-4} = 14^2 - 2 = 194$. [[palindromic-polynomials|A palindromic polynomial]], whose coefficients read the same forward and backward, such as $x^4 - 5x^3 + 8x^2 - 5x + 1$, is divided by $x^2$ and written in $t = x + \tfrac1x$, which halves its degree.

[[forced-difference-of-squares|A forced difference of squares]] completes a square in an expression so that a perfect square is left over to subtract: $n^4 - 20n^2 + 4 = (n^2 - 2)^2 - 16n^2 = (n^2 - 4n - 2)(n^2 + 4n - 2)$. At $n = 5$ this factors $129 = 3 \cdot 43$, which shows when such an expression can be prime.

Look for $\sqrt m + \sqrt n$ inside a nested radical, for $x + \tfrac1x$ in a symmetric expression, and for a square to complete when a quartic must factor. The next lesson collects factorizations worth knowing.`,
      related: [
        { card: "substitute-repeated-block", note: String.raw`the substitution $t = x + \tfrac1x$ is a repeated block (L5.2).` },
        { card: "rationalizing", note: String.raw`clearing roots from a denominator (L1.3).` }
      ],
      exercises: [
        { q: String.raw`Write $\sqrt{9 + 4\sqrt5}$ in the form $a + \sqrt b$.`, answer: "2 + sqrt(5)",
          solution: String.raw`Look for $\sqrt m + \sqrt n$ with $m + n = 9$ and $mn = 20$: $m = 5$, $n = 4$. So it is $2 + \sqrt5$; check $(2 + \sqrt5)^2 = 9 + 4\sqrt5$.` },
        { q: String.raw`If $x + \tfrac1x = 4$, find $x^4 + \tfrac1{x^4}$.`, answer: "194",
          solution: String.raw`Square: $x^2 + \tfrac1{x^2} = 16 - 2 = 14$. Square again: $x^4 + \tfrac1{x^4} = 196 - 2 = 194$.` },
        { q: String.raw`Factor $n^4 - 20n^2 + 4$ to find the largest prime factor of its value at $n = 5$.`, answer: "43",
          solution: String.raw`$n^4 - 20n^2 + 4 = (n^2 - 2)^2 - 16n^2 = (n^2 - 4n - 2)(n^2 + 4n - 2)$. At $n = 5$ the factors are $3$ and $43$, and $3 \cdot 43 = 129 = 625 - 500 + 4$.` }
      ],
      problems: [
        "2011 AMC 10A, Problem 16",
        "2024 AMC 10B, Problem 13",
        "2021 Spring AMC 10B, Problem 15",
        "2009 AMC 12B, Problem 19"
      ]
    },
    "L10.6": {
      prereq: ["difference-of-squares", "an-minus-bn"],
      cards: ["cubes-minus-3abc", "sophie-germain", "useful-factorizations"],
      body: String.raw`A few factorizations unlock problems that otherwise look impossible: deciding whether a huge number like $2^{202} + 202$ is prime, finding $a^3 + b^3 + c^3$ from the sums of the variables, or factoring $999$ at a glance. Knowing them by heart turns a search into a line.

[[cubes-minus-3abc|The sum of cubes identity]] is $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$, and the second factor is $\tfrac12\left((a - b)^2 + (b - c)^2 + (c - a)^2\right)$. With $a + b + c = 6$, $ab + bc + ca = 11$ and $abc = 6$: $a^2 + b^2 + c^2 = 14$, so $a^3 + b^3 + c^3 = 6(14 - 11) + 18 = 36$.

[[sophie-germain|The Sophie Germain identity]] is $a^4 + 4b^4 = (a^2 + 2b^2 + 2ab)(a^2 + 2b^2 - 2ab)$, found by completing the square: $a^4 + 4b^4 = (a^2 + 2b^2)^2 - (2ab)^2$. So $3^4 + 4 = 85 = (9 + 2 + 6)(9 + 2 - 6) = 17 \cdot 5$, and numbers of the form $n^4 + 4^k$ are composite for $n \gt 1$.

[[useful-factorizations|Other factorizations worth knowing]]: $a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)$, $a^n - b^n$ divisible by $a - b$, and $x^4 + x^2 + 1 = (x^2 + x + 1)(x^2 - x + 1)$. They give $999 = 10^3 - 1 = 9 \cdot 111 = 3^3 \cdot 37$ and $1001 = 10^3 + 1 = 11 \cdot 91 = 7 \cdot 11 \cdot 13$.

When a number or expression seems hopeless to factor, try to see it as a sum or difference of cubes, a difference of squares after completing a square, or $a^4 + 4b^4$. The Summary (L10.7) collects the chapter's strategies.`,
      related: [
        { card: "sum-zero-identities", note: String.raw`the case $a + b + c = 0$, where $a^3 + b^3 + c^3 = 3abc$ (L5.3).` },
        { card: "forced-difference-of-squares", note: String.raw`completing a square to factor, the idea behind Sophie Germain (L10.5).` }
      ],
      exercises: [
        { q: String.raw`What is the largest prime factor of $3^4 + 4$?`, answer: "17",
          solution: String.raw`By Sophie Germain with $a = 3$, $b = 1$: $(9 + 2 + 6)(9 + 2 - 6) = 17 \cdot 5 = 85$. The largest prime factor is $17$.` },
        { q: String.raw`If $a + b + c = 6$, $ab + bc + ca = 11$ and $abc = 6$, find $a^3 + b^3 + c^3$.`, answer: "36",
          solution: String.raw`$a^2 + b^2 + c^2 = 36 - 22 = 14$, and $a^3 + b^3 + c^3 = 3abc + (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) = 18 + 6 \cdot 3 = 36$.` },
        { q: String.raw`What is the largest prime factor of $999$?`, answer: "37",
          solution: String.raw`$999 = 10^3 - 1 = 9 \cdot 111 = 3^3 \cdot 37$. The largest prime factor is $37$.` }
      ],
      problems: [
        "2021 Fall AMC 10B, Problem 12",
        "2012 AMC 10A, Problem 24",
        "2020 AMC 10B, Problem 22"
      ]
    },
    "L10.7": {
      prereq: ["vietas-general", "newtons-sums", "conjugate-root-theorems", "root-transformations", "polynomial-crt", "lagrange-interpolation", "denesting-radicals", "reciprocal-power-sums", "palindromic-polynomials", "cubes-minus-3abc", "sophie-germain"],
      cards: [],
      body: String.raw`[[vietas-general|Vieta's formulas]] give the elementary symmetric sums of the roots of any polynomial, and [[newtons-sums|Newton's sums]] give the power sums from them; a product of shifted roots is the polynomial evaluated at a point.

[[conjugate-root-theorems|Conjugate roots]] come in pairs for real or rational coefficients, and [[root-transformations|transforming the roots]] is a substitution in the polynomial. [[polynomial-crt|A remainder by a product]] is fixed by the values at the roots, and [[lagrange-interpolation|a polynomial is fixed]] by one more value than its degree.

[[denesting-radicals|Nested radicals]] denest as $\sqrt m + \sqrt n$, [[reciprocal-power-sums|reciprocal power sums]] follow from $x + \tfrac1x$, and [[palindromic-polynomials|palindromic polynomials]] halve in degree in $t = x + \tfrac1x$. [[cubes-minus-3abc|The sum of cubes identity]] and [[sophie-germain|the Sophie Germain identity]] factor expressions that look prime.`,
      strategies: [
        String.raw`Translate any question about the roots into their elementary symmetric sums.`,
        String.raw`For $\prod (c - r_i)$, evaluate the monic polynomial at $c$.`,
        String.raw`For power sums of roots, use that each root satisfies the polynomial, or run Newton's sums.`,
        String.raw`If one root is irrational or non-real, write down its conjugate.`,
        String.raw`For a polynomial with shifted, scaled or inverted roots, substitute instead of solving.`,
        String.raw`For a polynomial given by values, build a product that vanishes at the known points.`,
        String.raw`Try $\sqrt m + \sqrt n$ for a nested radical, and $t = x + \tfrac1x$ for a symmetric expression.`,
        String.raw`Before testing a large number for primality, try the factorizations: cubes, $a^4 + 4b^4$, a forced difference of squares.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the product of the roots of $x^3 + x^2 - 4x - 4$.`, answer: "4",
        solution: String.raw`By Vieta the product of the roots of a monic cubic is $-d = 4$. (The roots are $-1$, $2$, $-2$.)` },
      { q: String.raw`Find the sum of the squares of the roots of $x^4 - 5x^2 + 6$.`, answer: "10",
        solution: String.raw`The roots are $\pm\sqrt2$ and $\pm\sqrt3$, whose squares add to $2 + 2 + 3 + 3 = 10$. By Vieta: the roots add to $0$ and the pairwise products to $-5$, so the squares add to $0 - 2(-5) = 10$.` },
      { q: String.raw`The roots of $2x^2 - 3x + 1$ are $r$ and $s$. Find the constant term of the monic quadratic with roots $\tfrac1r$ and $\tfrac1s$.`, answer: "2",
        solution: String.raw`Reverse the coefficients: $x^2 - 3x + 2$ has the reciprocal roots. Its constant term is $2 = \tfrac{1}{rs}$, since $rs = \tfrac12$.` },
      { q: String.raw`Write $\sqrt{11 - 6\sqrt2}$ in the form $a - \sqrt b$.`, answer: "3 - sqrt(2)",
        solution: String.raw`$11 - 6\sqrt2 = 11 - 2\sqrt{18}$, so look for $\sqrt m - \sqrt n$ with $m + n = 11$ and $mn = 18$: $m = 9$, $n = 2$. So it is $3 - \sqrt2$, which is positive as it must be.` },
      { q: String.raw`A quadratic $P$ has $P(1) = 2$, $P(2) = 5$ and $P(3) = 10$. Find $P(4)$.`, answer: "17",
        solution: String.raw`The differences are $3$ and $5$, so the second difference is $2$, the next difference $7$, and $P(4) = 17$. (The quadratic is $x^2 + 1$.)` },
      { q: String.raw`Find $a^3 + b^3 + c^3 - 3abc$ for $a = 2$, $b = 3$, $c = 4$.`, answer: "27",
        solution: String.raw`By the identity it is $(a + b + c)\cdot\tfrac12\left((a - b)^2 + (b - c)^2 + (c - a)^2\right) = 9 \cdot \tfrac12(1 + 1 + 4) = 27$. Directly: $8 + 27 + 64 - 72 = 27$.` }
    ],
    problems: [
      "2024 AMC 12B, Problem 17"
    ]
  },
  challenge: {
    problems: [
      "2001 AMC 12, Problem 23",
      "2022 AMC 12A, Problem 22",
      "2021 Spring AMC 12A, Problem 22",
      "2024 AMC 12A, Problem 23"
    ]
  }
};
