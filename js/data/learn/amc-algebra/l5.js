// Learn, AMC Algebra, chapter L5: substitutions and symmetric expressions (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L5"] = {
  lessons: {
    "L5.1": {
      prereq: ["vietas-quadratic", "square-of-sum"],
      cards: [],
      body: String.raw`This chapter is about seeing structure in an expression before computing with it. Its tools are substitution, which treats a repeated block as one unknown, and the identities for symmetric expressions, which work with sums and products of the variables instead of the variables themselves.

When the same block appears several times, as $x^2 + x$ does in $(x^2 + x)^2 - 8(x^2 + x) + 12 = 0$, call it $t$. The equation becomes $t^2 - 8t + 12 = 0$, so $t = 2$ or $t = 6$, and each value gives a quadratic in $x$: $x^2 + x = 2$ has roots $1$ and $-2$, and $x^2 + x = 6$ has roots $2$ and $-3$, four solutions in all. An expression that contains a copy of itself, such as $x = \sqrt{6 + \sqrt{6 + \cdots}}$, is handled the same way: the part under the first root is $x$ again, so $x = \sqrt{6 + x}$ and $x = 3$.

An expression is symmetric if swapping the variables does not change it. Symmetric expressions can be written in terms of the sums of the variables and of their products, and a few identities do most of the work; for instance, if $a + b + c = 0$, then $a^3 + b^3 + c^3 = 3abc$, so $abc = 2$ gives $6$.

The lessons take these ideas in turn: naming the whole expression (L5.2), and symmetric sums and factoring tricks (L5.3). The Summary (L5.4) collects the strategies.`,
      exercises: [
        { q: String.raw`How many real solutions does $(x^2 + x)^2 - 8(x^2 + x) + 12 = 0$ have?`, answer: "4",
          solution: String.raw`With $t = x^2 + x$: $t^2 - 8t + 12 = (t - 2)(t - 6) = 0$. Then $x^2 + x = 2$ gives $x = 1, -2$, and $x^2 + x = 6$ gives $x = 2, -3$. Four real solutions.` },
        { q: String.raw`Find the value of $\sqrt{6 + \sqrt{6 + \sqrt{6 + \cdots}}}$.`, answer: "3",
          solution: String.raw`Call the value $x$. Under the first root is $6 + x$, so $x = \sqrt{6 + x}$, $x^2 - x - 6 = 0$, and $x = 3$ (the value is positive, so $-2$ is rejected).` },
        { q: String.raw`If $a + b + c = 0$ and $abc = 2$, find $a^3 + b^3 + c^3$.`, answer: "6",
          solution: String.raw`The identity $a^3 + b^3 + c^3 - 3abc = (a + b + c)(\ldots)$ shows the left side is $0$ when $a + b + c = 0$. So $a^3 + b^3 + c^3 = 3abc = 6$.` }
      ],
      problems: []
    },
    "L5.2": {
      prereq: ["quadratic-formula"],
      cards: ["name-the-whole-expression", "substitute-repeated-block", "repeated-block-equation", "infinite-nest"],
      body: String.raw`An equation of degree four or a fraction nested forever looks hard, but often it hides a simple equation in a repeated piece. $(x - 3)^2 - 5(x - 3) + 6 = 0$ is a quadratic in $x - 3$; $(x + 1)(x + 2)(x + 3)(x + 4) + 1$ is a perfect square; $1 + \cfrac{1}{1 + \cfrac{1}{1 + \cdots}}$ is a number that satisfies a quadratic. The move in each is to give the repeated piece a name.

[[name-the-whole-expression|Naming the whole expression]] means treating a compound expression as a single unknown when the question asks about it rather than about the variables inside it. If a problem asks for $a + b$, it is often possible to find $a + b$ without $a$ and $b$. [[substitute-repeated-block|Substituting for a repeated block]] is the same idea inside an equation: in $(x - 3)^2 - 5(x - 3) + 6 = 0$, let $t = x - 3$; then $t^2 - 5t + 6 = 0$, so $t = 2$ or $3$, and $x = 5$ or $6$. The block can be hidden: in $(x + 1)(x + 2)(x + 3)(x + 4)$, pairing the outer and inner factors gives $(x^2 + 5x + 4)(x^2 + 5x + 6)$, and with $t = x^2 + 5x + 5$ this is $(t - 1)(t + 1) = t^2 - 1$, so adding $1$ gives the square $t^2$.

[[repeated-block-equation|A repeated-block equation]] is solved in two stages: solve for the block, then solve for $x$ from each value of the block, keeping only the values the block can take (a square cannot be negative, a square root is at least $0$).

[[infinite-nest|An expression that repeats inside itself]] forever, such as $x = \sqrt{2 + \sqrt{2 + \cdots}}$ or a continued fraction, contains a copy of itself, so it satisfies an equation: $x = \sqrt{2 + x}$ gives $x = 2$, and $x = 1 + \tfrac1x$ gives $x = \tfrac{1 + \sqrt5}{2}$. The sign or size of the value decides which root is meant.

Look for a block that repeats, even after regrouping factors, and for an expression that contains itself; name it, solve, then return to the original variable. The next lesson works with symmetric expressions.`,
      related: [
        { card: "palindromic-polynomials", note: String.raw`the substitution $t = x + \tfrac1x$ for polynomials that read the same both ways (L10.5).` },
        { card: "log-substitution", note: String.raw`naming $\log x$ or $2^x$ to turn an equation into a polynomial (L9.3).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the solutions of $(x - 3)^2 - 5(x - 3) + 6 = 0$.`, answer: "11",
          solution: String.raw`With $t = x - 3$: $t^2 - 5t + 6 = 0$, so $t = 2$ or $3$, and $x = 5$ or $6$. The sum is $11$.` },
        { q: String.raw`Find $\sqrt{2 + \sqrt{2 + \sqrt{2 + \cdots}}}$.`, answer: "2",
          solution: String.raw`The value $x$ satisfies $x = \sqrt{2 + x}$, so $x^2 - x - 2 = 0$ and $x = 2$ (it is positive).` },
        { q: String.raw`Find $1 + \cfrac{1}{1 + \cfrac{1}{1 + \cdots}}$.`, answer: "(1 + sqrt(5))/2",
          solution: String.raw`The value $x$ satisfies $x = 1 + \tfrac1x$, so $x^2 - x - 1 = 0$ and $x = \tfrac{1 + \sqrt5}{2}$, the positive root.` },
        { q: String.raw`Find $(x + 1)(x + 2)(x + 3)(x + 4) + 1$ when $x = 1$, and check that it is a perfect square.`, answer: "121",
          solution: String.raw`Directly, $2 \cdot 3 \cdot 4 \cdot 5 + 1 = 121 = 11^2$. In general, pairing gives $(x^2 + 5x + 4)(x^2 + 5x + 6) + 1 = (x^2 + 5x + 5)^2$, which at $x = 1$ is $11^2$.` }
      ],
      problems: [
        "2019 AMC 10A, Problem 19",
        "1983 AIME, Problem 3",
        "1990 AIME, Problem 4",
        "1991 AIME, Problem 7",
        "2017 AMC 10B, Problem 24"
      ]
    },
    "L5.3": {
      prereq: ["symmetric-polynomial-strategies", "difference-of-squares"],
      cards: ["sum-zero-identities", "pairwise-sum-product", "an-minus-bn", "subtract-and-factor"],
      body: String.raw`Some problems give conditions on sums and products of several variables and ask for another symmetric quantity: $a^3 + b^3 + c^3$ when $a + b + c = 0$, the product $(a + b)(b + c)(c + a)$, the factors of $2^{12} - 1$, or $x + y$ from two equations that differ only by swapping $x$ and $y$. A few identities answer all of these without finding the variables.

[[sum-zero-identities|When a sum is zero]], identities collapse. The factorization $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$ gives $a^3 + b^3 + c^3 = 3abc$ whenever $a + b + c = 0$, and squaring $a + b + c = 0$ gives $ab + bc + ca = -\tfrac{a^2 + b^2 + c^2}{2}$.

[[pairwise-sum-product|The product of pairwise sums]] is $(a + b)(b + c)(c + a) = (a + b + c)(ab + bc + ca) - abc$, so it follows from the three elementary sums; with $a + b + c = 6$, $ab + bc + ca = 11$ and $abc = 6$ it is $66 - 6 = 60$.

[[an-minus-bn|The difference of powers]] $a^n - b^n$ always has the factor $a - b$, and when $n$ is composite it has the factors $a^d - b^d$ for every divisor $d$ of $n$: $2^{12} - 1 = (2^6 - 1)(2^6 + 1) = 63 \cdot 65 = 3^2 \cdot 7 \cdot 5 \cdot 13$. A sum $a^n + b^n$ with $n$ odd has the factor $a + b$.

For two equations that change into each other when $x$ and $y$ are swapped, [[subtract-and-factor|subtract them and factor]]: from $x^2 + y = 7$ and $y^2 + x = 7$, subtracting gives $(x - y)(x + y - 1) = 0$, so either $x = y$ or $x + y = 1$, two simpler cases.

Use these identities when the given conditions are symmetric and the target is too; they replace a long computation by one line. The Summary (L5.4) collects the chapter's strategies.`,
      related: [
        { card: "cubes-minus-3abc", note: String.raw`the factorization of $a^3 + b^3 + c^3 - 3abc$ in full (L10.6).` },
        { card: "vietas-general", note: String.raw`the elementary sums as coefficients of a cubic (L10.2).` }
      ],
      exercises: [
        { q: String.raw`If $a + b + c = 6$, $ab + bc + ca = 11$ and $abc = 6$, find $(a + b)(b + c)(c + a)$.`, answer: "60",
          solution: String.raw`Use $(a + b)(b + c)(c + a) = (a + b + c)(ab + bc + ca) - abc = 66 - 6 = 60$. (The numbers are $1, 2, 3$: $3 \cdot 5 \cdot 4 = 60$.)` },
        { q: String.raw`What is the largest prime factor of $2^{12} - 1$?`, answer: "13",
          solution: String.raw`Factor: $2^{12} - 1 = (2^6 - 1)(2^6 + 1) = 63 \cdot 65 = 3^2 \cdot 7 \cdot 5 \cdot 13$. The largest prime factor is $13$.` },
        { q: String.raw`Numbers $x \ne y$ satisfy $x^2 + y = 7$ and $y^2 + x = 7$. Find $x + y$.`, answer: "1",
          solution: String.raw`Subtract: $x^2 - y^2 + y - x = (x - y)(x + y - 1) = 0$. Since $x \ne y$, $x + y = 1$.` }
      ],
      problems: [
        "2015 AMC 10A, Problem 16",
        "2008 AIME II, Problem 7",
        "2023 AIME II, Problem 4"
      ]
    },
    "L5.4": {
      prereq: ["name-the-whole-expression", "substitute-repeated-block", "infinite-nest", "sum-zero-identities", "pairwise-sum-product", "an-minus-bn", "subtract-and-factor"],
      cards: [],
      body: String.raw`[[name-the-whole-expression|Naming the whole expression]] finds a compound quantity without finding the variables inside it. [[substitute-repeated-block|A repeated block]], sometimes visible only after regrouping factors, becomes one unknown, and the equation is solved for it first and for $x$ second. [[infinite-nest|An expression that contains itself]] satisfies an equation found by spotting the copy inside it.

For symmetric conditions, [[sum-zero-identities|a zero sum]] gives $a^3 + b^3 + c^3 = 3abc$, [[pairwise-sum-product|the product of pairwise sums]] is $(a + b + c)(ab + bc + ca) - abc$, [[an-minus-bn|a difference of powers]] factors through the divisors of its exponent, and [[subtract-and-factor|subtracting two swapped equations]] produces the factor $x - y$.`,
      strategies: [
        String.raw`If a block appears more than once, call it $t$ and solve for $t$ first.`,
        String.raw`Regroup factors to make a hidden block appear, such as pairing the outer and inner factors of a product of four.`,
        String.raw`After solving for the block, keep only the values the block can take.`,
        String.raw`For an expression that repeats forever, find the copy of itself inside it and write an equation.`,
        String.raw`If the variables add to zero, use $a^3 + b^3 + c^3 = 3abc$.`,
        String.raw`Factor $a^n - b^n$ through the divisors of $n$ before testing for primes.`,
        String.raw`For two equations that swap into each other, subtract them and factor out $x - y$.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the sum of the squares of the real solutions of $x^4 - 5x^2 + 4 = 0$.`, answer: "10",
        solution: String.raw`With $t = x^2$: $t^2 - 5t + 4 = 0$, so $t = 1$ or $4$, and $x = \pm 1, \pm 2$. The squares add to $1 + 1 + 4 + 4 = 10$.` },
      { q: String.raw`If $x + \tfrac1x = 5$, find $x^3 + \tfrac{1}{x^3}$.`, answer: "110",
        solution: String.raw`Cube: $\left(x + \tfrac1x\right)^3 = x^3 + \tfrac1{x^3} + 3\left(x + \tfrac1x\right)$, so $x^3 + \tfrac1{x^3} = 125 - 15 = 110$.` },
      { q: String.raw`If $a - b = 3$ and $a^2 - b^2 = 21$, find $a$.`, answer: "5",
        solution: String.raw`Factor: $(a - b)(a + b) = 21$, so $a + b = 7$. With $a - b = 3$, $a = 5$.` },
      { q: String.raw`Find $\sqrt{12 + \sqrt{12 + \sqrt{12 + \cdots}}}$.`, answer: "4",
        solution: String.raw`The value $x$ satisfies $x = \sqrt{12 + x}$, so $x^2 - x - 12 = 0$ and $x = 4$.` },
      { q: String.raw`If $a + b + c = 0$ and $a^2 + b^2 + c^2 = 6$, find $ab + bc + ca$.`, answer: "-3",
        solution: String.raw`Square the sum: $0 = a^2 + b^2 + c^2 + 2(ab + bc + ca) = 6 + 2(ab + bc + ca)$, so $ab + bc + ca = -3$.` },
      { q: String.raw`Find the sum of the real solutions of $(x^2 - 3x)^2 - 2(x^2 - 3x) - 8 = 0$.`, answer: "6",
        solution: String.raw`With $t = x^2 - 3x$: $t^2 - 2t - 8 = (t - 4)(t + 2) = 0$. Then $x^2 - 3x = 4$ gives $x = 4, -1$, and $x^2 - 3x = -2$ gives $x = 1, 2$. All are real, and they add to $6$.` }
    ],
    problems: []
  },
  challenge: {
    problems: [
      "2017 AMC 12B, Problem 23",
      "1990 AIME, Problem 2"
    ]
  }
};
