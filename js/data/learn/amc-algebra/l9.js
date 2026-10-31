// Learn, AMC Algebra, chapter L9: logarithms and exponential equations (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L9"] = {
  lessons: {
    "L9.1": {
      prereq: ["exponent-laws"],
      cards: [],
      body: String.raw`This chapter is about logarithms, which answer the question "to what power?". Its tools are the logarithm laws and the change of base formula, and the methods for equations in which the unknown sits in an exponent or inside a logarithm.

The logarithm $\log_b x$ is the exponent to which $b$ must be raised to give $x$: $\log_2 32 = 5$ because $2^5 = 32$. It is defined for $b \gt 0$, $b \ne 1$ and $x \gt 0$. Because exponents add when powers multiply, logarithms turn products into sums: $\log 4 + \log 25 = \log 100 = 2$, where $\log$ without a base means base $10$. Quotients become differences and powers become multiples, so $\log_3 81 - \log_3 9 = \log_3 9 = 2$.

Logarithms in different bases are compared by changing them to one base. They also measure size: the number of digits of a positive integer $N$ is $\lfloor \log N \rfloor + 1$.

An equation with the unknown in an exponent, such as $4^x - 6 \cdot 2^x + 8 = 0$, often becomes a polynomial after a substitution, here $t = 2^x$; an equation with logarithms becomes one without them after the laws combine the terms. In both cases the domain decides which solutions are real.

The lessons take these ideas in turn: the logarithm laws and change of base (L9.2), and logarithmic and exponential equations (L9.3). The Summary (L9.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Find $\log_2 32$.`, answer: "5",
          solution: String.raw`$2^5 = 32$, so $\log_2 32 = 5$.` },
        { q: String.raw`Find $\log 4 + \log 25$, with logarithms to base $10$.`, answer: "2",
          solution: String.raw`A sum of logarithms is the logarithm of the product: $\log(4 \cdot 25) = \log 100 = 2$.` },
        { q: String.raw`Find $\log_3 81 - \log_3 9$.`, answer: "2",
          solution: String.raw`A difference of logarithms is the logarithm of the quotient: $\log_3 9 = 2$. (Or $4 - 2 = 2$.)` }
      ],
      problems: [
        "2002 AMC 12A, Problem 14",
        "2023 AMC 12A, Problem 6",
        "2024 AMC 12B, Problem 6"
      ]
    },
    "L9.2": {
      prereq: ["exponent-laws"],
      cards: ["log-rules", "change-of-base"],
      body: String.raw`Products of logarithms in different bases, sums of logarithms of many numbers, and logarithms of awkward numbers all simplify with a handful of laws. What is $\log_2 3 \cdot \log_3 8$? What is $\log_4 8$? What is $\log_5\left(125\sqrt5\right)$? Each is one line once every logarithm is read as an exponent.

[[log-rules|The logarithm laws]] come from the exponent laws. Since $b^m b^n = b^{m+n}$, the logarithm of a product is the sum of the logarithms, $\log_b(xy) = \log_b x + \log_b y$; similarly $\log_b \tfrac xy = \log_b x - \log_b y$ and $\log_b x^k = k\log_b x$. So $\log_5\left(125\sqrt5\right) = 3 + \tfrac12 = \tfrac72$. Two facts check every computation: $\log_b 1 = 0$ and $\log_b b = 1$. A logarithm is defined only for positive inputs, and the laws hold only where every logarithm in them is defined. A common error is $\log(x + y) = \log x + \log y$, which is false.

[[change-of-base|The change of base formula]] $\log_b x = \tfrac{\log_c x}{\log_c b}$ rewrites a logarithm in any base $c$; in particular $\log_b a = \tfrac{1}{\log_a b}$. It is the key to products of logarithms, which telescope: $\log_2 3 \cdot \log_3 8 = \tfrac{\log 3}{\log 2} \cdot \tfrac{\log 8}{\log 3} = \tfrac{\log 8}{\log 2} = 3$. When bases are powers of one number, rewrite them: $\log_4 8 = \tfrac{\log_2 8}{\log_2 4} = \tfrac32$.

Rewrite every logarithm in one base, read it as an exponent, and combine with the laws; watch the domain. The next lesson solves equations with logarithms and exponents.`,
      related: [
        { card: "telescoping", note: String.raw`a product of logarithms collapses like a telescoping product (L6.5).` },
        { card: "digit-count", note: String.raw`the number of digits of $N$ is $\lfloor \log_{10} N \rfloor + 1$.` }
      ],
      exercises: [
        { q: String.raw`Find $\log_2 3 \cdot \log_3 8$.`, answer: "3",
          solution: String.raw`By change of base, the product is $\tfrac{\log 3}{\log 2} \cdot \tfrac{\log 8}{\log 3} = \tfrac{\log 8}{\log 2} = \log_2 8 = 3$.` },
        { q: String.raw`Find $\log_4 8$.`, answer: "3/2",
          solution: String.raw`Change to base $2$: $\tfrac{\log_2 8}{\log_2 4} = \tfrac32$. Check: $4^{3/2} = 8$.` },
        { q: String.raw`Find $\log_5\left(125\sqrt5\right)$.`, answer: "7/2",
          solution: String.raw`$125\sqrt5 = 5^3 \cdot 5^{1/2} = 5^{7/2}$, so the logarithm is $\tfrac72$.` }
      ],
      problems: [
        "2002 AMC 12B, Problem 22",
        "2023 AMC 12B, Problem 7",
        "2024 AMC 12B, Problem 8",
        "2025 AMC 12A, Problem 7",
        "2005 AMC 12A, Problem 21"
      ]
    },
    "L9.3": {
      prereq: ["log-rules", "change-of-base", "quadratic-formula"],
      cards: ["take-logs-linearize", "log-substitution", "log-system"],
      body: String.raw`Equations with the unknown in an exponent or inside a logarithm look unfamiliar, but they usually turn into polynomial equations. Solve $4^x - 6 \cdot 2^x + 8 = 0$; solve $\log_2 x + \log_2(x - 2) = 3$; find $x + y$ if $\log x + \log y = 3$ and $\log x - \log y = 1$. Each becomes a quadratic or a linear system after one move.

[[take-logs-linearize|Taking logarithms]] of both sides brings an exponent down: $a^x = b$ gives $x = \log_a b$, and an equation such as $x^{\log x} = 100x$ becomes $(\log x)^2 = 2 + \log x$, a quadratic in $\log x$. Conversely, an equation with one logarithm is solved by exponentiating: $\log_b y = c$ means $y = b^c$.

[[log-substitution|Substituting for a logarithm or a power]] turns the equation into a polynomial. In $4^x - 6 \cdot 2^x + 8 = 0$, $4^x = (2^x)^2$, so with $t = 2^x$ it reads $t^2 - 6t + 8 = 0$: $t = 2$ or $4$, so $x = 1$ or $2$. With logarithms, combine first: $\log_2 x + \log_2(x - 2) = \log_2\left(x(x - 2)\right) = 3$ gives $x(x - 2) = 8$, so $x = 4$ or $x = -2$; but $\log_2(-2)$ is undefined, so only $x = 4$ works. The domain check is essential, because combining logarithms can add solutions.

[[log-system|A system of logarithmic equations]] is a linear system in the logarithms: with $a = \log x$ and $b = \log y$, $a + b = 3$ and $a - b = 1$ give $a = 2$, $b = 1$, so $x = 100$, $y = 10$ and $x + y = 110$. Vieta's formulas often finish: the product of the solutions of a quadratic in $\log x$ is $10$ raised to the sum of its roots.

Bring the exponents down or name the logarithm, solve the polynomial, and check every solution against the domain. The Summary (L9.4) collects the chapter's strategies.`,
      related: [
        { card: "substitute-repeated-block", note: String.raw`the same substitution idea for a repeated algebraic block (L5.2).` },
        { card: "vietas-quadratic", note: String.raw`the sum or product of the solutions, without solving (L3.3).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the solutions of $4^x - 6 \cdot 2^x + 8 = 0$.`, answer: "3",
          solution: String.raw`With $t = 2^x$: $t^2 - 6t + 8 = 0$, so $t = 2$ or $4$, giving $x = 1$ or $2$. The sum is $3$.` },
        { q: String.raw`Solve $\log_2 x + \log_2(x - 2) = 3$.`, answer: "4",
          solution: String.raw`Combine: $\log_2\left(x(x - 2)\right) = 3$, so $x^2 - 2x - 8 = 0$ and $x = 4$ or $-2$. Only $x = 4$ makes both logarithms defined.` },
        { q: String.raw`If $\log x + \log y = 3$ and $\log x - \log y = 1$ (base $10$), find $x + y$.`, answer: "110",
          solution: String.raw`Adding and subtracting: $\log x = 2$ and $\log y = 1$, so $x = 100$, $y = 10$, and $x + y = 110$.` }
      ],
      problems: [
        "2023 AMC 12A, Problem 19",
        "2022 AMC 12B, Problem 16",
        "2021 Spring AMC 12B, Problem 21"
      ]
    },
    "L9.4": {
      prereq: ["log-rules", "change-of-base", "take-logs-linearize", "log-substitution", "log-system"],
      cards: [],
      body: String.raw`[[log-rules|The logarithm laws]] turn products into sums, quotients into differences and powers into multiples, for positive inputs only. [[change-of-base|Change of base]] puts every logarithm in one base, which makes products of logarithms telescope and bases that are powers of one number easy.

[[take-logs-linearize|Taking logarithms]] brings an unknown exponent down, and [[log-substitution|naming a logarithm or a power]] turns an equation into a polynomial. [[log-system|A system in logarithms]] is a linear system in the logarithms. Every solution is checked against the domain, since combining logarithms can add solutions.`,
      strategies: [
        String.raw`Read every logarithm as an exponent: $\log_b x = y$ means $b^y = x$.`,
        String.raw`Put every logarithm in one base before combining.`,
        String.raw`For a product of logarithms, change base and cancel.`,
        String.raw`For an equation with $b^{2x}$ and $b^x$, substitute $t = b^x$.`,
        String.raw`Combine logarithms into one, exponentiate, and check each solution against the domain.`,
        String.raw`In a system of logarithmic equations, treat the logarithms as the unknowns.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find $\log_2 6 + \log_2 \tfrac43$.`, answer: "3",
        solution: String.raw`The sum is $\log_2\left(6 \cdot \tfrac43\right) = \log_2 8 = 3$.` },
      { q: String.raw`Find $\log_9 27$.`, answer: "3/2",
        solution: String.raw`Both are powers of $3$: $\tfrac{\log_3 27}{\log_3 9} = \tfrac32$.` },
      { q: String.raw`Find $\log_2 9 \cdot \log_3 4$.`, answer: "4",
        solution: String.raw`$\log_2 9 = 2\log_2 3$ and $\log_3 4 = 2\log_3 2$, and $\log_2 3 \cdot \log_3 2 = 1$. The product is $4$.` },
      { q: String.raw`Solve $9^x = 27$.`, answer: "3/2",
        solution: String.raw`Write both in base $3$: $3^{2x} = 3^3$, so $x = \tfrac32$.` },
      { q: String.raw`Solve $\log_3(x + 1) + \log_3(x - 1) = 1$.`, answer: "2",
        solution: String.raw`Combine: $\log_3(x^2 - 1) = 1$, so $x^2 = 4$ and $x = \pm 2$. Only $x = 2$ keeps $x - 1$ positive.` },
      { q: String.raw`If $2^a = 3$ and $3^b = 4$, find $ab$.`, answer: "2",
        solution: String.raw`Then $a = \log_2 3$ and $b = \log_3 4$, so $ab = \log_2 4 = 2$. Directly: $2^{ab} = (2^a)^b = 3^b = 4$.` },
      { q: String.raw`Using $\log 5 \approx 0.699$, how many digits does $5^{20}$ have?`, answer: "14",
        solution: String.raw`$\log 5^{20} = 20 \log 5 \approx 13.98$, so $5^{20}$ is between $10^{13}$ and $10^{14}$ and has $14$ digits.` }
    ],
    problems: [
      "2024 AMC 12A, Problem 8"
    ]
  },
  challenge: {
    problems: [
      "2005 AMC 12A, Problem 23",
      "2006 AMC 12A, Problem 21"
    ]
  }
};
