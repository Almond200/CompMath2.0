// Learn, AMC Algebra, chapter L7: polynomials (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L7"] = {
  lessons: {
    "L7.1": {
      prereq: ["vietas-quadratic"],
      cards: [],
      body: String.raw`This chapter works with polynomials, sums of powers of $x$ with number coefficients, such as $x^3 - 2x + 5$. Its tools are division of polynomials with the remainder theorem, the rational root theorem for finding roots, and the ways of reading a polynomial's coefficients from its values.

Polynomials can be divided like numbers, leaving a quotient and a remainder of smaller degree. Dividing by $x - a$ leaves a number, and that number is the value of the polynomial at $a$: the remainder of $x^3 - 2x + 5$ divided by $x - 2$ is $8 - 4 + 5 = 9$. So $x - a$ is a factor exactly when $a$ is a root; $x + 1$ is a factor of $x^3 + x^2 - x - 1$ because its value at $-1$ is $-1 + 1 + 1 - 1 = 0$.

To find the roots of a polynomial with integer coefficients, the rational root theorem lists the only fractions that can be roots, from the divisors of the constant term and of the leading coefficient. Once one root is found, dividing it out lowers the degree.

A polynomial's coefficients can be read from its values without expanding: its value at $x = 1$ is the sum of its coefficients, so $(x + 2)^5$ has coefficients adding to $3^5 = 243$. Two polynomials that are equal for every $x$ have equal coefficients, which turns an identity into equations.

The lessons take these ideas in turn: division and the remainder theorem (L7.2), and rational roots and coefficients (L7.3). The Summary (L7.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the remainder when $x^3 - 2x + 5$ is divided by $x - 2$.`, answer: "9",
          solution: String.raw`By the remainder theorem, it is the value at $x = 2$: $8 - 4 + 5 = 9$.` },
        { q: String.raw`Find the value of $x^3 + x^2 - x - 1$ at $x = -1$. What does it tell you?`, answer: "0",
          solution: String.raw`$-1 + 1 + 1 - 1 = 0$, so $-1$ is a root and $x + 1$ is a factor; indeed $x^3 + x^2 - x - 1 = (x + 1)^2(x - 1)$.` },
        { q: String.raw`Find the sum of the coefficients of $(x + 2)^5$ when it is expanded.`, answer: "243",
          solution: String.raw`The sum of the coefficients is the value at $x = 1$: $3^5 = 243$.` }
      ],
      problems: [
        "2025 AMC 10A, Problem 7",
        "2018 AMC 12A, Problem 5",
        "2009 AMC 12A, Problem 9"
      ]
    },
    "L7.2": {
      prereq: [],
      cards: ["polynomial-division", "factor-remainder-theorem"],
      body: String.raw`Problems about polynomials often ask for a remainder or a factor without asking for the polynomial itself. What is left when $x^3 + 2x^2 - 5x + 1$ is divided by $x - 1$? For which $k$ is $x - 2$ a factor of $x^3 + kx - 6$? What is left when $x^{50} + x^{25} + 1$ is divided by $x + 1$? Long division answers the first, but the remainder theorem answers all three in one line.

[[polynomial-division|Dividing polynomials]] works like long division of numbers: divide the leading terms, multiply back, subtract, and repeat, until the remainder has smaller degree than the divisor. Dividing $x^3 + 2x^2 - 5x + 1$ by $x - 1$ gives the quotient $x^2 + 3x - 2$ and the remainder $-1$, which means $x^3 + 2x^2 - 5x + 1 = (x - 1)(x^2 + 3x - 2) - 1$. Synthetic division is a short form of the same steps for a divisor $x - a$.

[[factor-remainder-theorem|The remainder theorem]] says that the remainder on division by $x - a$ is $P(a)$, because $P(x) = (x - a)Q(x) + r$ gives $P(a) = r$. So the remainder above is $1 + 2 - 5 + 1 = -1$, and the remainder of $x^{50} + x^{25} + 1$ on division by $x + 1$ is $1 - 1 + 1 = 1$. The factor theorem is the case $r = 0$: $x - a$ is a factor exactly when $P(a) = 0$, so $x - 2$ divides $x^3 + kx - 6$ when $8 + 2k - 6 = 0$, that is, $k = -1$.

On division by a quadratic, the remainder is linear, $ax + b$, and it is found from the values of $P$ at the two roots of the quadratic, which give two equations for $a$ and $b$. With integer coefficients there is more: $a - b$ divides $P(a) - P(b)$ for integers $a$ and $b$, which limits the values a polynomial can take.

For a remainder, evaluate; for a factor, test the root; for a quadratic divisor, use its two roots. The next lesson finds roots and reads coefficients.`,
      related: [
        { card: "polynomial-crt", note: String.raw`remainders modulo several factors at once (L10.4).` },
        { card: "vietas-general", note: String.raw`the sum and product of all the roots, from the coefficients (L10.2).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $x^3 + 2x^2 - 5x + 1$ is divided by $x - 1$.`, answer: "-1",
          solution: String.raw`By the remainder theorem it is the value at $1$: $1 + 2 - 5 + 1 = -1$. (Long division gives the quotient $x^2 + 3x - 2$.)` },
        { q: String.raw`For which $k$ is $x - 2$ a factor of $x^3 + kx - 6$?`, answer: "-1",
          solution: String.raw`By the factor theorem the value at $2$ must be $0$: $8 + 2k - 6 = 0$, so $k = -1$.` },
        { q: String.raw`Find the remainder when $x^{50} + x^{25} + 1$ is divided by $x + 1$.`, answer: "1",
          solution: String.raw`Evaluate at $x = -1$: $1 - 1 + 1 = 1$.` }
      ],
      problems: [
        "2014 AMC 12A, Problem 19",
        "2022 AMC 10B, Problem 17",
        "2011 AMC 12A, Problem 20",
        "2023 AMC 10A, Problem 21",
        "2021 Spring AMC 12B, Problem 20"
      ]
    },
    "L7.3": {
      prereq: ["factor-remainder-theorem"],
      cards: ["rational-root-theorem", "comparing-coefficients", "coefficient-extraction"],
      body: String.raw`To factor a cubic or find its roots, guessing is hopeless without a short list of candidates, and the rational root theorem gives one. Other problems give a polynomial identity and ask for an unknown coefficient, or ask for a sum of coefficients of a large expansion. All three are about the relation between a polynomial's coefficients and its roots and values.

[[rational-root-theorem|The rational root theorem]] says that if a polynomial with integer coefficients has a rational root $\tfrac pq$ in lowest terms, then $p$ divides the constant term and $q$ divides the leading coefficient. For $2x^3 - 3x^2 - 3x + 2$ the candidates are $\pm 1, \pm 2, \pm \tfrac12$; testing finds $2$, $-1$ and $\tfrac12$, so it factors as $(x - 2)(x + 1)(2x - 1)$. For a monic polynomial, one with leading coefficient $1$, every rational root is an integer dividing the constant term. After finding one root, divide it out and solve the smaller polynomial.

[[comparing-coefficients|Comparing coefficients]] uses the fact that two polynomials equal for every $x$ have the same coefficients. If $(x^2 + ax + 3)(x + b) = x^3 + 4x^2 + 7x + 6$, matching the constant terms gives $3b = 6$, so $b = 2$; the $x^2$ terms give $a + b = 4$, so $a = 2$; and the $x$ terms check: $3 + ab = 7$.

[[coefficient-extraction|Coefficients are read from values]]. $P(1)$ is the sum of the coefficients, $P(0)$ the constant term, and $\tfrac{P(1) + P(-1)}{2}$ the sum of the coefficients of even powers, so $(1 + x)^8$ has even-power coefficients adding to $\tfrac{2^8 + 0}{2} = 128$. To get the sum of the coefficients of a polynomial written as $f(x + 3)$, put $x + 3 = 1$.

List rational candidates before guessing, compare coefficients for an identity, and evaluate at $1$, $-1$ or $0$ for sums of coefficients. The Summary (L7.4) collects the chapter's strategies.`,
      related: [
        { card: "binomial-theorem", note: String.raw`the coefficients of $(x + y)^n$, read individually.` },
        { card: "roots-of-unity-filter", note: String.raw`sums of every third or fourth coefficient, from roots of unity (L13.4).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the roots of $2x^3 - 3x^2 - 3x + 2$, after finding them with the rational root theorem.`, answer: "3/2",
          solution: String.raw`The candidates are $\pm 1, \pm 2, \pm \tfrac12$. Testing: $P(2) = 16 - 12 - 6 + 2 = 0$, $P(-1) = -2 - 3 + 3 + 2 = 0$, $P(\tfrac12) = \tfrac14 - \tfrac34 - \tfrac32 + 2 = 0$. The roots $2, -1, \tfrac12$ add to $\tfrac32$, which matches $\tfrac{3}{2}$ from Vieta.` },
        { q: String.raw`If $(x^2 + ax + 3)(x + b) = x^3 + 4x^2 + 7x + 6$ for all $x$, find $a + b$.`, answer: "4",
          solution: String.raw`The $x^2$ coefficient of the left side is $a + b$, and it must equal $4$. (Separately, $3b = 6$ gives $b = 2$, so $a = 2$, and the $x$ coefficient $3 + ab = 7$ checks.)` },
        { q: String.raw`Find the sum of the coefficients of the even powers of $x$ in $(1 + x)^8$.`, answer: "128",
          solution: String.raw`With $P(x) = (1 + x)^8$, the even-power coefficients add to $\tfrac{P(1) + P(-1)}{2} = \tfrac{256 + 0}{2} = 128$.` }
      ],
      problems: [
        "2025 AMC 10B, Problem 10",
        "2001 AMC 12, Problem 13",
        "2024 AMC 12A, Problem 13",
        "2012 AMC 12A, Problem 20"
      ]
    },
    "L7.4": {
      prereq: ["polynomial-division", "factor-remainder-theorem", "rational-root-theorem", "comparing-coefficients", "coefficient-extraction"],
      cards: [],
      body: String.raw`[[polynomial-division|Division]] writes $P(x) = D(x)Q(x) + R(x)$ with the remainder of smaller degree. [[factor-remainder-theorem|The remainder theorem]] gives the remainder on division by $x - a$ as $P(a)$, and the factor theorem says $x - a$ is a factor exactly when $P(a) = 0$; on division by a quadratic, the linear remainder comes from the values at its roots.

[[rational-root-theorem|The rational root theorem]] limits rational roots to $\tfrac pq$ with $p$ dividing the constant term and $q$ the leading coefficient. [[comparing-coefficients|Comparing coefficients]] turns a polynomial identity into equations, and [[coefficient-extraction|values give coefficients]]: $P(1)$ is their sum, $P(0)$ the constant term, and $\tfrac{P(1) + P(-1)}{2}$ the sum of the even ones.`,
      strategies: [
        String.raw`For a remainder on division by $x - a$, evaluate at $a$.`,
        String.raw`To test a factor $x - a$, check whether $a$ is a root.`,
        String.raw`On division by a quadratic, write the remainder as $ax + b$ and use the quadratic's roots.`,
        String.raw`List the rational candidates before guessing a root, then divide out each root found.`,
        String.raw`For an identity between polynomials, match the constant terms and the leading terms first.`,
        String.raw`For sums of coefficients, evaluate at $1$, $-1$ or $0$.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`The polynomial $x^2 + kx - 1$ leaves remainder $5$ when divided by $x - 3$. Find $k$.`, answer: "-1",
        solution: String.raw`The remainder is the value at $3$: $9 + 3k - 1 = 5$, so $k = -1$.` },
      { q: String.raw`Find the product of the roots of $x^3 - 6x^2 + 11x - 6$.`, answer: "6",
        solution: String.raw`Testing the divisors of $6$, the roots are $1, 2, 3$, with product $6$, which is also $-\tfrac{-6}{1}$ by Vieta.` },
      { q: String.raw`Find the coefficient of $x^2$ in $(x + 1)^3(x - 2)$.`, answer: "-3",
        solution: String.raw`$(x + 1)^3 = x^3 + 3x^2 + 3x + 1$. The $x^2$ terms of the product come from $3x^2 \cdot (-2)$ and $3x \cdot x$: $-6 + 3 = -3$.` },
      { q: String.raw`Find the sum of the coefficients of $(3x - 2)^7$.`, answer: "1",
        solution: String.raw`Evaluate at $x = 1$: $(3 - 2)^7 = 1$.` },
      { q: String.raw`The polynomial $x^4 + ax^2 + b$ is divisible by $x^2 - 3x + 2$. Find $b$.`, answer: "4",
        solution: String.raw`The roots of $x^2 - 3x + 2$ are $1$ and $2$, so $1 + a + b = 0$ and $16 + 4a + b = 0$. Subtracting, $15 + 3a = 0$, so $a = -5$ and $b = 4$. Indeed $x^4 - 5x^2 + 4 = (x^2 - 1)(x^2 - 4)$.` },
      { q: String.raw`Find the remainder when $x^3 + 1$ is divided by $x^2 + x + 1$.`, answer: "2",
        solution: String.raw`Since $x^3 - 1 = (x - 1)(x^2 + x + 1)$, we have $x^3 + 1 = (x - 1)(x^2 + x + 1) + 2$. The remainder is $2$.` }
    ],
    problems: [
      "2015 AMC 12A, Problem 20"
    ]
  },
  challenge: {
    problems: [
      "2010 AMC 10B, Problem 25",
      "2002 AMC 12A, Problem 25",
      "2010 AMC 12A, Problem 21",
      "2025 AMC 12A, Problem 17"
    ]
  }
};
