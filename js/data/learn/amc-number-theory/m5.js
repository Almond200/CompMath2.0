// Learn, AMC Number Theory, chapter M5: integer equations (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M5"] = {
  lessons: {
    "M5.1": {
      prereq: ["gcd-lcm-product", "difference-of-squares"],
      cards: [],
      body: String.raw`This chapter solves equations whose answers must be whole numbers. Its tools are the gcd condition for linear equations and the Chinese remainder theorem, the largest amount that cannot be paid with two coin values, factoring into integers, Pythagorean triples and integer triangles, and bounding.

A linear equation such as $3x + 5y = 22$ has integer solutions only if the gcd of the coefficients divides the right side, and then its solutions form an evenly spaced family, of which only a few may be positive: here only $(4, 2)$. With coins of $4$ and $7$, every amount from $18$ on can be paid, but $17$ cannot.

A nonlinear equation often factors: $x^2 - y^2 = 15$ becomes $(x - y)(x + y) = 15$, and each factorization of $15$ gives a candidate: $(8, 7)$ and $(4, 1)$.

Right triangles with integer sides come from a formula, and triangles with integer sides and a given perimeter are counted with the triangle inequality. When none of these applies, one side of the equation usually grows faster than the other, and a bound leaves only a few cases to check.

The lessons take these ideas in turn: linear equations and the Chinese remainder theorem (M5.2), coins and stamps (M5.3), factoring into integers (M5.4), Pythagorean triples and integer triangles (M5.5), and bounding (M5.6). The Summary (M5.7) collects the strategies.`,
      exercises: [
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $3x + 5y = 22$?`, answer: "1",
          solution: String.raw`$22 - 5y$ must be a positive multiple of $3$: $y = 2$ gives $x = 4$, and the next value $y = 5$ makes $22 - 25 \lt 0$. So only $(4, 2)$.` },
        { q: String.raw`What is the largest amount that cannot be paid with coins of $4$ and $7$ cents?`, answer: "17",
          solution: String.raw`For coprime values $a$ and $b$ the largest amount that cannot be made is $ab - a - b = 28 - 11 = 17$. Check: $17 - 7k$ is $17, 10, 3$, none a multiple of $4$.` },
        { q: String.raw`How many pairs of positive integers satisfy $x^2 - y^2 = 15$?`, answer: "2",
          solution: String.raw`$(x - y)(x + y) = 15$ with $x - y \lt x + y$: the pairs $(1, 15)$ and $(3, 5)$ give $(8, 7)$ and $(4, 1)$.` }
      ],
      problems: [
        "2008 AMC 10B, Problem 8",
        "2002 AMC 12A, Problem 6",
        "2015 AMC 12B, Problem 10"
      ]
    },
    "M5.2": {
      prereq: ["euclidean-algorithm", "modular-basics"],
      cards: ["bezouts-identity", "crt"],
      body: String.raw`Some problems ask which totals can be built from two amounts, or which number satisfies several remainder conditions at once. Which debts can be settled with $\$300$ pigs and $\$210$ goats? What is the smallest positive $x$ with $7x + 11y = 1$ for some integer $y$? Which number leaves remainder $2$ on division by $5$ and $3$ on division by $7$?

[[bezouts-identity|Bézout's identity]] says that the integer combinations $ax + by$ are exactly the multiples of $\gcd(a, b)$. So $6x + 15y = 4$ has no integer solutions, since $\gcd(6, 15) = 3$ does not divide $4$, and the smallest positive value of $6x + 15y$ is $3$. When a solution exists, one solution gives all of them: from $7 \cdot (-3) + 11 \cdot 2 = 1$, the solutions of $7x + 11y = 1$ are $x = -3 + 11t$, $y = 2 - 7t$, so the smallest positive $x$ is $8$. The coefficients are found by the extended Euclidean algorithm, or by trying small values.

[[crt|The Chinese remainder theorem]] says that conditions on remainders modulo pairwise coprime numbers combine into one condition modulo their product. To solve $n \equiv 2 \pmod 5$ and $n \equiv 3 \pmod 7$, list the numbers $3, 10, 17, \ldots$ that are $3$ modulo $7$ until one is $2$ modulo $5$: $17$. Then every solution is $17$ plus a multiple of $35$. If the moduli share a factor, the conditions must agree on it, and they combine modulo the lcm.

Check the gcd before solving a linear equation, shift one solution to get them all, and combine remainder conditions by listing. The next lesson studies coins and stamps.`,
      related: [
        { card: "extended-euclidean-algorithm", note: String.raw`finding the Bézout coefficients systematically.` },
        { card: "subtract-equal-remainders", note: String.raw`equal remainders and differences, the step before combining (M4.2).` }
      ],
      exercises: [
        { q: String.raw`What is the smallest positive integer $x$ for which $7x + 11y = 1$ has an integer solution $y$?`, answer: "8",
          solution: String.raw`One solution is $x = -3$, $y = 2$, and all solutions are $x = -3 + 11t$. The smallest positive is $x = 8$ (with $y = -5$: $56 - 55 = 1$).` },
        { q: String.raw`What is the smallest positive integer that leaves remainder $2$ on division by $5$ and remainder $3$ on division by $7$?`, answer: "17",
          solution: String.raw`The numbers that are $3$ modulo $7$ are $3, 10, 17, \ldots$; their remainders modulo $5$ are $3, 0, 2$, so the answer is $17$.` },
        { q: String.raw`What is the smallest positive value of $6x + 15y$ for integers $x$ and $y$?`, answer: "3",
          solution: String.raw`By Bézout, the values are exactly the multiples of $\gcd(6, 15) = 3$, and $3 = 6 \cdot 3 + 15 \cdot (-1)$.` }
      ],
      problems: [
        "2006 AMC 12A, Problem 14",
        "2017 AMC 12B, Problem 19",
        "2000 AMC 12, Problem 16"
      ]
    },
    "M5.3": {
      prereq: ["bezouts-identity"],
      cards: ["chicken-mcnugget", "coins-and-prices"],
      body: String.raw`Coins, stamps, bouquets and packs give equations in whole numbers. What is the largest amount that cannot be paid with $5$ and $8$ cent stamps? In how many ways can $100$ be written as $4x + 7y$? How many amounts cannot be made with $3$ and $5$? The answers combine the structure of linear equations with counting.

[[chicken-mcnugget|The Chicken McNugget theorem]] says that for coprime $a$ and $b$, the largest amount that cannot be written as $ax + by$ with $x, y \ge 0$ is $ab - a - b$, and exactly $\tfrac{(a - 1)(b - 1)}{2}$ amounts cannot be made. For $5$ and $8$ the largest is $27$; for $3$ and $5$ the unmakeable amounts are $1, 2, 4, 7$, four of them. With three values there is no formula; build a table of amounts by remainder modulo the smallest value.

[[coins-and-prices|Coin and price problems]] set up a linear equation and count or find its nonnegative solutions. Reduce modulo one coefficient to find the pattern of solutions: in $4x + 7y = 100$, the left side is $100 - 7y \equiv 0 \pmod 4$, so $y$ is a multiple of $4$, and $y = 0, 4, 8, 12$ give four solutions. With several kinds of coins, subtract equations to eliminate one variable, as with a count and a total value.

Use $ab - a - b$ for the largest unmakeable amount, reduce modulo a coefficient to find the solutions' pattern, and count the values in range. The next lesson factors integer equations.`,
      related: [
        { card: "linear-elimination", note: String.raw`eliminating a variable from a count and a total value.` },
        { card: "assume-all-one-kind", note: String.raw`the same equations solved by assuming all coins are of one kind.` }
      ],
      exercises: [
        { q: String.raw`What is the largest amount that cannot be paid with $5$ and $8$ cent stamps?`, answer: "27",
          solution: String.raw`$5 \cdot 8 - 5 - 8 = 27$.` },
        { q: String.raw`How many pairs of nonnegative integers satisfy $4x + 7y = 100$?`, answer: "4",
          solution: String.raw`$100 - 7y$ must be a nonnegative multiple of $4$, so $y \equiv 0 \pmod 4$ and $y \le 14$: $y = 0, 4, 8, 12$, four solutions.` },
        { q: String.raw`How many positive amounts cannot be paid with coins of $3$ and $5$?`, answer: "4",
          solution: String.raw`The amounts $1, 2, 4, 7$ cannot be made, and every amount from $8$ on can. That is $4 = \tfrac{(3 - 1)(5 - 1)}{2}$.` }
      ],
      problems: [
        "2003 AMC 12B, Problem 7",
        "2006 AMC 12A, Problem 9",
        "2015 AMC 10A, Problem 13",
        "2015 AMC 10B, Problem 15"
      ]
    },
    "M5.4": {
      prereq: ["difference-of-squares", "number-of-divisors"],
      cards: ["sfft", "factor-pair-counting", "difference-of-squares-rep"],
      body: String.raw`How many positive solutions does $xy - x - y = 5$ have? How many ordered pairs multiply to $36$? For which $n$ is $n^2 + 20$ a perfect square? The way in is to turn the equation into a product equal to a constant and list the factorizations.

[[sfft|Simon's favorite factoring trick]] adds a constant to complete a product: $xy - x - y = 5$ becomes $xy - x - y + 1 = 6$, that is, $(x - 1)(y - 1) = 6$. For $axy + bx + cy$, multiply through by $a$ first. Then each factor pair of the constant gives a candidate, subject to the signs and sizes the variables allow: with $x, y \ge 1$, the factors are positive, and the four pairs of $6$ give four solutions.

[[factor-pair-counting|Counting factor pairs]]: the ordered pairs of positive integers with $xy = n$ number $d(n)$, the number of divisors, so $xy = 36$ has $9$ ordered solutions; unordered pairs number $\tfrac{d(n)}{2}$, or $\tfrac{d(n) + 1}{2}$ for a square.

[[difference-of-squares-rep|A difference of squares]] factors: $m^2 - n^2 = (m - n)(m + n)$, and the two factors have the same parity. So $m^2 - n^2 = 20$ needs two even factors, $2 \cdot 10$, giving $m = 6$, $n = 4$: $n^2 + 20 = 36$. A number is a difference of two squares exactly when it is odd or a multiple of $4$.

Complete a product, list factor pairs with their sign and parity conditions, and solve each. The next lesson finds integer right triangles.`,
      related: [
        { card: "number-of-divisors", note: String.raw`the count of factor pairs (M3.2).` },
        { card: "quadratic-perfect-square", note: String.raw`a quadratic with integer roots, a discriminant that is a square.` }
      ],
      exercises: [
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $xy - x - y = 5$?`, answer: "4",
          solution: String.raw`Add $1$: $(x - 1)(y - 1) = 6$. With $x - 1, y - 1 \ge 0$ and product $6$, both are positive: $(1, 6), (2, 3), (3, 2), (6, 1)$, four solutions.` },
        { q: String.raw`How many ordered pairs of positive integers $(x, y)$ satisfy $xy = 36$?`, answer: "9",
          solution: String.raw`One for each divisor $x$ of $36 = 2^2 \cdot 3^2$, which has $3 \cdot 3 = 9$ divisors.` },
        { q: String.raw`Find the positive integer $n$ for which $n^2 + 20$ is a perfect square.`, answer: "4",
          solution: String.raw`$m^2 - n^2 = 20$, so $(m - n)(m + n) = 20$ with both factors even: $2 \cdot 10$, giving $m = 6$, $n = 4$. Check: $16 + 20 = 36$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 13",
        "2004 AMC 10B, Problem 11",
        "2024 AMC 12A, Problem 17"
      ]
    },
    "M5.5": {
      prereq: ["pythagorean-theorem", "triangle-inequality"],
      cards: ["pythagorean-triples", "integer-triangles-perimeter"],
      body: String.raw`Right triangles with integer sides, such as $3$-$4$-$5$ and $5$-$12$-$13$, appear in geometry and number theory problems alike. How many right triangles with integer sides have a leg of $15$? How many triangles with integer sides have perimeter $15$? Both are counted with a formula and an inequality.

[[pythagorean-triples|The Pythagorean triples]] with no common factor are $(m^2 - n^2, 2mn, m^2 + n^2)$ for coprime $m \gt n$ of opposite parity, and every triple is a multiple of one of these. The ones to know are $3$-$4$-$5$, $5$-$12$-$13$, $8$-$15$-$17$, $7$-$24$-$25$ and $20$-$21$-$29$, with their multiples. For a given leg, factor: $c^2 - b^2 = 225$ means $(c - b)(c + b) = 225$, and each factorization into two odd factors gives a triangle: $15$-$8$-$17$, $15$-$20$-$25$, $15$-$36$-$39$, $15$-$112$-$113$, four in all.

[[integer-triangles-perimeter|Triangles with integer sides and a given perimeter]] are counted with the triangle inequality: with $a \le b \le c$ and $a + b + c = p$, the longest side satisfies $\tfrac p3 \le c \lt \tfrac p2$. For $p = 15$, $c$ is $5$, $6$ or $7$, and listing gives $(5, 5, 5)$, $(4, 5, 6)$, $(3, 6, 6)$, $(1, 7, 7)$, $(2, 6, 7)$, $(3, 5, 7)$, $(4, 4, 7)$: seven triangles.

Recognize the common triples, factor $c^2 - b^2$ for a given leg, and bound the longest side by $\tfrac p3 \le c \lt \tfrac p2$. The next lesson bounds integer equations.`,
      related: [
        { card: "sum-of-two-squares", note: String.raw`which numbers can be hypotenuses.` },
        { card: "triangle-inequality", note: String.raw`each side less than the sum of the other two.` }
      ],
      exercises: [
        { q: String.raw`Find the hypotenuse of the right triangle with legs $20$ and $21$.`, answer: "29",
          solution: String.raw`$20^2 + 21^2 = 400 + 441 = 841 = 29^2$.` },
        { q: String.raw`How many right triangles with integer sides have a leg of length $15$?`, answer: "4",
          solution: String.raw`With the other leg $b$ and hypotenuse $c$: $(c - b)(c + b) = 225$, both factors odd with $c - b \lt c + b$. The pairs $(1, 225)$, $(3, 75)$, $(5, 45)$, $(9, 25)$ give $(b, c) = (112, 113), (36, 39), (20, 25), (8, 17)$: four triangles.` },
        { q: String.raw`How many non-congruent triangles with integer sides have perimeter $15$?`, answer: "7",
          solution: String.raw`With $a \le b \le c$, $5 \le c \le 7$. For $c = 7$: $(1, 7), (2, 6), (3, 5), (4, 4)$ for $(a, b)$; for $c = 6$: $(3, 6), (4, 5)$; for $c = 5$: $(5, 5)$. Seven in all.` }
      ],
      problems: [
        "2009 AMC 12B, Problem 13",
        "2011 AMC 12B, Problem 11",
        "2013 AMC 10B, Problem 16",
        "2014 AMC 12B, Problem 9"
      ]
    },
    "M5.6": {
      prereq: ["sfft"],
      cards: ["bounding-diophantine", "squeeze-between-squares"],
      body: String.raw`When an integer equation does not factor, it can often be bounded: one side grows faster than the other, so only small values can work. Which positive integers $x \le y \le z$ satisfy $x + y + z = xyz$? For which positive $n$ is $n^2 + 3n + 5$ a perfect square? Each has a short list of candidates once a bound is found.

[[bounding-diophantine|Bounding]] orders symmetric variables, say $x \le y \le z$, and uses the order to limit the smallest one. In $x + y + z = xyz$, the left side is at most $3z$, so $xy \le 3$, leaving $(x, y) = (1, 1), (1, 2), (1, 3)$; only $(1, 2)$ gives a positive integer $z$, namely $3$. Bounds also come from sizes: $n$ coins each between $1.35$ and $1.95$ mm making a stack of $14$ mm means $\tfrac{14}{1.95} \le n \le \tfrac{14}{1.35}$.

[[squeeze-between-squares|Squeezing between squares]] shows an expression is not a perfect square by trapping it strictly between two consecutive squares. For $n \gt 1$, $(n + 1)^2 = n^2 + 2n + 1 \lt n^2 + 3n + 5 \lt n^2 + 4n + 4 = (n + 2)^2$, so only $n = 1$ can work, and $1 + 3 + 5 = 9$ is a square.

Order the variables and bound the smallest; trap an expression between consecutive squares; then check the few remaining cases. The Summary (M5.7) collects the chapter's strategies.`,
      related: [
        { card: "sqrt-approximation", note: String.raw`placing a square root between consecutive integers.` },
        { card: "wlog-symmetry", note: String.raw`ordering symmetric variables without loss of generality.` }
      ],
      exercises: [
        { q: String.raw`How many triples of positive integers $x \le y \le z$ satisfy $x + y + z = xyz$?`, answer: "1",
          solution: String.raw`Since $x + y + z \le 3z$, $xyz \le 3z$ and $xy \le 3$. The options $(1, 1)$, $(1, 2)$, $(1, 3)$ give $2 + z = z$ (impossible), $3 + z = 2z$ ($z = 3$), and $4 + z = 3z$ ($z = 2 \lt y$). Only $(1, 2, 3)$.` },
        { q: String.raw`Find the positive integer $n$ for which $n^2 + 3n + 5$ is a perfect square.`, answer: "1",
          solution: String.raw`For $n \gt 1$, $(n + 1)^2 \lt n^2 + 3n + 5 \lt (n + 2)^2$, so it is not a square. For $n = 1$ it is $9 = 3^2$.` },
        { q: String.raw`How many positive integers $n$ satisfy $n^2 \lt 2026$?`, answer: "45",
          solution: String.raw`$45^2 = 2025 \lt 2026 \lt 2116 = 46^2$, so $n = 1, \ldots, 45$.` }
      ],
      problems: [
        "2004 AMC 10B, Problem 13",
        "2016 AMC 10A, Problem 14",
        "2012 AMC 10B, Problem 12",
        "2024 AMC 10B, Problem 6"
      ]
    },
    "M5.7": {
      prereq: ["bezouts-identity", "crt", "chicken-mcnugget", "coins-and-prices", "sfft", "factor-pair-counting", "difference-of-squares-rep", "pythagorean-triples", "integer-triangles-perimeter", "bounding-diophantine", "squeeze-between-squares"],
      cards: [],
      body: String.raw`[[bezouts-identity|Bézout's identity]]: $ax + by$ takes exactly the multiples of $\gcd(a, b)$, and one solution gives all of them. [[crt|The Chinese remainder theorem]] combines conditions modulo coprime numbers into one.

[[chicken-mcnugget|For coprime coin values]] the largest unmakeable amount is $ab - a - b$, and [[coins-and-prices|coin equations]] are solved by reducing modulo a coefficient.

[[sfft|Completing a product]] and [[difference-of-squares-rep|factoring a difference of squares]] turn equations into [[factor-pair-counting|factor pairs]] of a constant.

[[pythagorean-triples|Pythagorean triples]] are multiples of $(m^2 - n^2, 2mn, m^2 + n^2)$, and [[integer-triangles-perimeter|triangles with a given perimeter]] have their longest side between $\tfrac p3$ and $\tfrac p2$. [[bounding-diophantine|Bounding]] and [[squeeze-between-squares|squeezing between squares]] leave a few cases to check.`,
      strategies: [
        String.raw`Before solving $ax + by = c$, check that $\gcd(a, b)$ divides $c$.`,
        String.raw`Find one solution, write the general solution, and impose the sign conditions.`,
        String.raw`For two coprime coin values, the largest unmakeable amount is $ab - a - b$.`,
        String.raw`Complete a product with a constant and list the factor pairs, minding signs and parity.`,
        String.raw`For a right triangle with integer sides, use the triple formula or factor $c^2 - b^2$.`,
        String.raw`Order symmetric variables and bound the smallest.`,
        String.raw`To show an expression is not a square, trap it between consecutive squares.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many pairs of nonnegative integers satisfy $5x + 8y = 100$?`, answer: "3",
        solution: String.raw`$100 - 8y$ must be a multiple of $5$, so $y$ is a multiple of $5$ and at most $12$: $y = 0, 5, 10$, three solutions.` },
      { q: String.raw`What is the smallest positive integer that leaves remainders $1$, $2$ and $3$ on division by $3$, $4$ and $5$?`, answer: "58",
        solution: String.raw`Each remainder is $2$ less than the divisor, so $n + 2$ is a multiple of $3$, $4$ and $5$, that is, of $60$. The smallest is $n = 58$.` },
      { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $(x + 1)(y + 2) = 12$?`, answer: "3",
        solution: String.raw`$x + 1 \ge 2$ and $y + 2 \ge 3$, so the factor pairs are $(2, 6)$, $(3, 4)$, $(4, 3)$: $(x, y) = (1, 4), (2, 2), (3, 1)$.` },
      { q: String.raw`Find the perimeter of the primitive Pythagorean triangle given by $m = 4$, $n = 1$.`, answer: "40",
        solution: String.raw`The sides are $m^2 - n^2 = 15$, $2mn = 8$ and $m^2 + n^2 = 17$, with perimeter $40$.` },
      { q: String.raw`Nuggets come in boxes of $6$, $9$ and $20$. What is the largest number of nuggets that cannot be bought exactly?`, answer: "43",
        solution: String.raw`By remainder modulo $6$: multiples of $6$ from $0$; remainder $3$ from $9$; remainder $2$ from $20$; remainder $5$ from $29$; remainder $4$ from $40$; remainder $1$ from $49$. So $43 = 49 - 6$ is the largest that cannot be made, and from $44$ on, every number can.` }
    ],
    problems: [
      "2026 AIME I, Problem 4",
      "1993 AIME, Problem 4"
    ]
  },
  challenge: {
    problems: [
      "2020 AMC 10A, Problem 24",
      "2023 AMC 10A, Problem 23",
      "2023 AMC 10B, Problem 23",
      "1987 AIME, Problem 5"
    ]
  }
};
