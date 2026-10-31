// Learn, AMC 10, chapter T3: polynomials, sequences and series (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["T3"] = {
  lessons: {
    "T3.1": {
      prereq: ["quadratic-formula"],
      cards: ["factor-remainder-theorem", "polynomial-division", "rational-root-theorem", "coefficient-extraction", "comparing-coefficients"],
      body: String.raw`A polynomial is determined by its coefficients, and also by its values; switching between the two is the main skill. The remainder on division by $x - r$ is a value, the sum of the coefficients is a value, and two polynomials that agree everywhere have the same coefficients. AMC problems use each of these to avoid long computation.

The [[factor-remainder-theorem|remainder theorem]] says $P(x)$ divided by $x - r$ leaves remainder $P(r)$, and the factor theorem says $x - r$ is a factor exactly when $P(r) = 0$. So $x^{50} + x^3 + 1$ leaves remainder $1 - 1 + 1 = 1$ on division by $x + 1$. When a division is really needed, [[polynomial-division|long or synthetic division]] gives quotient and remainder; synthetic division by $x - r$ is a short table.

The [[rational-root-theorem|rational root theorem]] limits the rational roots of an integer polynomial to $\pm\tfrac pq$ with $p$ dividing the constant term and $q$ the leading coefficient. For $x^3 - 4x^2 + x + 6$ the candidates are the divisors of $6$; testing finds $-1$, $2$ and $3$.

[[coefficient-extraction|Sums of coefficients]] are values: the coefficients of $P$ add to $P(1)$, and the alternating sum is $P(-1)$, so $(2x - 1)^5$ has coefficient sum $1^5 = 1$ without expanding, and the even-power coefficients add to $\tfrac{P(1) + P(-1)}{2}$. [[comparing-coefficients|Comparing coefficients]] turns an identity into equations: if $(x + a)(x + b) = x^2 + 7x + 10$ for all $x$, then $a + b = 7$ and $ab = 10$.

Evaluate instead of dividing, list rational candidates, and compare coefficients of identities. The next lesson sums sequences.`,
      related: [
        { card: "vietas-quadratic", note: String.raw`the coefficients of a quadratic as the sum and product of its roots (T2.1).` },
        { card: "vietas-general", note: String.raw`Vieta for higher degrees (W2.1).` },
        { card: "polynomial-crt", note: String.raw`remainders on division by a product of factors (W2.3).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $x^{50} + x^3 + 1$ is divided by $x + 1$.`, answer: "1",
          solution: String.raw`The remainder is $P(-1) = 1 - 1 + 1 = 1$.` },
        { q: String.raw`Find the largest root of $x^3 - 4x^2 + x + 6$.`, answer: "3",
          solution: String.raw`Rational roots divide $6$. $P(-1) = -1 - 4 - 1 + 6 = 0$, so $x + 1$ is a factor, leaving $x^2 - 5x + 6 = (x - 2)(x - 3)$. The roots are $-1, 2, 3$; the largest is $3$.` }
      ],
      problems: [
        "2019 AMC 10B, Problem 4",
        "2025 AMC 10B, Problem 10",
        "2009 AMC 12A, Problem 9",
        "2001 AMC 12, Problem 13",
        "2017 AMC 10A, Problem 24",
        "2014 AMC 12A, Problem 19",
        "2015 AMC 12A, Problem 20",
        "2002 AMC 12A, Problem 25"
      ]
    },
    "T3.2": {
      prereq: [],
      cards: ["arithmetic-series", "geometric-series", "triangular-numbers", "power-sums"],
      body: String.raw`Arithmetic and geometric sequences are the two families every AMC student should handle instantly: find a term, find a sum, or recognize that three given numbers form one. Triangular numbers and sums of squares round out the toolkit.

An arithmetic sequence adds a fixed difference $d$: its $n$th term is $a + (n - 1)d$, and its [[arithmetic-series|sum]] is the number of terms times the average of the first and last. The sequence $5, 8, \ldots, 50$ has $\tfrac{50 - 5}{3} + 1 = 16$ terms averaging $27.5$, so its sum is $440$. Three numbers are in arithmetic progression when the middle one is their average.

A geometric sequence multiplies by a fixed ratio $r$: its [[geometric-series|sum]] of $n$ terms is $a\tfrac{r^n - 1}{r - 1}$, and when $|r| \lt 1$ the infinite sum is $\tfrac{a}{1 - r}$, so $6 + 3 + \tfrac32 + \cdots = 12$. Three numbers are in geometric progression when the middle one squared equals the product of the other two.

The [[triangular-numbers|triangular numbers]] $1 + 2 + \cdots + n = \tfrac{n(n + 1)}{2}$ (so $1 + \cdots + 50 = 1275$) count handshakes among $n + 1$ people and dots in a triangle. The [[power-sums|power sums]] give $1^2 + \cdots + n^2 = \tfrac{n(n + 1)(2n + 1)}{6}$ and $1^3 + \cdots + n^3 = \left(\tfrac{n(n + 1)}{2}\right)^2$.

Count the terms carefully (the fencepost: from $a$ to $b$ in steps of $d$ there are $\tfrac{b - a}{d} + 1$), then apply the formula. The next lesson treats sequences defined step by step.`,
      related: [
        { card: "fencepost-counting", note: String.raw`counting the terms correctly (T6.1).` },
        { card: "telescoping", note: String.raw`sums whose terms cancel in pairs (T3.4).` },
        { card: "arithmetico-geometric", note: String.raw`sums like $\sum k r^k$ (W3.2).` }
      ],
      exercises: [
        { q: String.raw`Find $5 + 8 + 11 + \cdots + 50$.`, answer: "440",
          solution: String.raw`There are $\tfrac{50 - 5}{3} + 1 = 16$ terms with average $\tfrac{5 + 50}{2} = 27.5$, so the sum is $440$.` },
        { q: String.raw`Find $6 + 3 + \tfrac32 + \tfrac34 + \cdots$.`, answer: "12",
          solution: String.raw`An infinite geometric series with first term $6$ and ratio $\tfrac12$: $\tfrac{6}{1 - 1/2} = 12$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 3",
        "2020 AMC 12B, Problem 1",
        "2024 AMC 12B, Problem 4",
        "2012 AMC 12A, Problem 7",
        "2014 AMC 12A, Problem 9",
        "2006 AMC 12A, Problem 12",
        "2004 AMC 10B, Problem 21",
        "2002 AMC 10B, Problem 23"
      ]
    },
    "T3.3": {
      prereq: ["arithmetic-series"],
      cards: ["first-order-recurrence", "periodic-sequences", "organized-listing"],
      body: String.raw`Many sequences on the AMC are given by a rule that makes each term from the previous one. The question asks for a far-off term or a sum, and the answer comes from writing out the first few terms and spotting either a formula or a cycle.

A [[first-order-recurrence|first-order recurrence]] gives $a_{n+1}$ from $a_n$. If the rule adds something that depends on $n$, the terms are partial sums: $a_{n+1} = a_n + 2n$ with $a_1 = 1$ gives $a_{10} = 1 + 2(1 + 2 + \cdots + 9) = 91$. If it multiplies and adds a constant, $a_{n+1} = ra_n + c$, shifting by the fixed point $\tfrac{c}{1 - r}$ makes it geometric.

A rule that uses only a little information, with values from a limited set, eventually repeats, and such [[periodic-sequences|periodic sequences]] are handled by finding the period. With $a_1 = 2$ and $a_{n+1} = \tfrac{1}{1 - a_n}$ the terms are $2, -1, \tfrac12, 2, \ldots$ with period $3$, so $a_{100} = a_1 = 2$, since $100$ leaves remainder $1$ on division by $3$.

[[organized-listing|Organized listing]] is the habit that makes both work: write the terms, or the cases, in a fixed order with nothing skipped, until the pattern is clear and checked.

Compute the first terms, find the formula or the period, and reduce. The next lesson collapses sums.`,
      related: [
        { card: "cycle-hunting", note: String.raw`cycles of remainders and last digits (T5.2).` },
        { card: "linear-recurrence", note: String.raw`second-order recurrences such as Fibonacci (W3.1).` },
        { card: "recursive-counting", note: String.raw`recurrences that count objects (T6.5).` }
      ],
      exercises: [
        { q: String.raw`A sequence has $a_1 = 1$ and $a_{n+1} = a_n + 2n$. Find $a_{10}$.`, answer: "91",
          solution: String.raw`$a_{10} = a_1 + 2(1 + 2 + \cdots + 9) = 1 + 2 \cdot 45 = 91$.` },
        { q: String.raw`A sequence has $a_1 = 2$ and $a_{n+1} = \tfrac{1}{1 - a_n}$. Find $a_{100}$.`, answer: "2",
          solution: String.raw`The terms are $2, -1, \tfrac12, 2, \ldots$, repeating with period $3$. Since $100 = 3 \cdot 33 + 1$, $a_{100} = a_1 = 2$.` }
      ],
      problems: [
        "2025 AMC 10B, Problem 2",
        "2024 AMC 10A, Problem 10",
        "2011 AMC 12A, Problem 8",
        "2006 AMC 10B, Problem 18",
        "2014 AMC 12B, Problem 12",
        "2004 AMC 12A, Problem 17",
        "2019 AMC 10B, Problem 24",
        "2015 AMC 12B, Problem 22"
      ]
    },
    "T3.4": {
      prereq: ["arithmetic-series"],
      cards: ["telescoping", "partial-fractions", "factorial-telescoping", "alternating-sum-grouping"],
      body: String.raw`Some long sums and products have almost all their terms cancel. Seeing the cancellation turns a hundred terms into two, and AMC problems are built to reward it.

A sum [[telescoping|telescopes]] when each term is a difference $f(k) - f(k + 1)$: everything cancels except the first and last pieces. [[partial-fractions|Partial fractions]] produce such differences: $\tfrac{1}{k(k + 1)} = \tfrac1k - \tfrac1{k + 1}$, so $\sum_{k=1}^{99}\tfrac{1}{k(k + 1)} = 1 - \tfrac{1}{100} = \tfrac{99}{100}$. Products telescope too: $1 - \tfrac{1}{k^2} = \tfrac{k - 1}{k} \cdot \tfrac{k + 1}{k}$, so $\prod_{k=2}^{10}\left(1 - \tfrac{1}{k^2}\right) = \tfrac12 \cdot \tfrac{11}{10} = \tfrac{11}{20}$. With factorials, [[factorial-telescoping|$k \cdot k! = (k + 1)! - k!$]] makes $\sum k \cdot k!$ collapse to $(n + 1)! - 1$.

An alternating sum is handled by [[alternating-sum-grouping|grouping the terms in pairs]]: $1 - 2 + 3 - 4 + \cdots - 100$ is fifty pairs each equal to $-1$, so $-50$. Grouping by fours or by matching terms works the same way, and the first step is always to check how many terms there are and whether one is left over.

Look for differences, rewrite fractions and factors to produce them, and group alternating terms. The last lesson of the chapter treats identities in three variables.`,
      related: [
        { card: "rationalizing", note: String.raw`turning radical terms into telescoping differences (T1.1).` },
        { card: "geometric-series", note: String.raw`the other sum with a closed form (T3.2).` },
        { card: "double-summation", note: String.raw`swapping the order of summation (W3.2).` }
      ],
      exercises: [
        { q: String.raw`Find $\displaystyle\sum_{k=1}^{99}\frac{1}{k(k + 1)}$.`, answer: "99/100",
          solution: String.raw`Each term is $\tfrac1k - \tfrac1{k + 1}$, so the sum telescopes to $1 - \tfrac1{100} = \tfrac{99}{100}$.` },
        { q: String.raw`Find $\left(1 - \tfrac14\right)\left(1 - \tfrac19\right)\cdots\left(1 - \tfrac{1}{100}\right)$.`, answer: "11/20",
          solution: String.raw`Each factor is $\tfrac{k - 1}{k} \cdot \tfrac{k + 1}{k}$ for $k = 2, \ldots, 10$. The first fractions multiply to $\tfrac{1}{10}$ and the second to $\tfrac{11}{2}$, so the product is $\tfrac{11}{20}$.` },
        { q: String.raw`Find $1 - 2 + 3 - 4 + \cdots + 99 - 100$.`, answer: "-50",
          solution: String.raw`Group in fifty pairs $(2k - 1) - 2k = -1$, for a total of $-50$.` }
      ],
      problems: [
        "2003 AMC 10A, Problem 1",
        "2008 AMC 10A, Problem 5",
        "2006 AMC 12B, Problem 1",
        "2018 AMC 12B, Problem 7",
        "2025 AMC 12B, Problem 7",
        "2021 Spring AMC 12A, Problem 9",
        "2010 AMC 12A, Problem 19",
        "2016 AMC 12B, Problem 21"
      ]
    },
    "T3.5": {
      prereq: ["square-of-sum", "sos-identity"],
      cards: ["sum-zero-identities", "pairwise-sum-product", "an-minus-bn"],
      body: String.raw`A few identities in several variables appear again and again on the AMC 10 and 12, usually hidden inside a system of equations. Recognizing them avoids solving the system.

When $a + b + c = 0$, the [[sum-zero-identities|sum-zero identities]] give $a^3 + b^3 + c^3 = 3abc$ and $a^2 + b^2 + c^2 = -2(ab + bc + ca)$. So if $a + b + c = 0$ and $a^3 + b^3 + c^3 = 12$, then $abc = 4$. The identity comes from $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$, whose second factor is half the sum of the squared differences: when it is known, the differences of integer variables are pinned down.

The [[pairwise-sum-product|product of pairwise sums]] is $(x + y)(y + z)(z + x) = (x + y + z)(xy + yz + zx) - xyz$; with sum $5$, pairwise products $8$ and product $4$ it is $40 - 4 = 36$.

[[an-minus-bn|$a^n - b^n$]] is always divisible by $a - b$, and for odd $n$, $a^n + b^n$ is divisible by $a + b$. So $2^{35} + 3^{35}$ is divisible by $5$; it is odd and not divisible by $3$, so $5$ is its smallest prime factor. The same fact explains why $n^5 - n$ and similar expressions have predictable factors.

When a symmetric system looks too hard, look for one of these identities. The next chapter turns to number theory.`,
      related: [
        { card: "cubes-minus-3abc", note: String.raw`the full factorization of $a^3 + b^3 + c^3 - 3abc$ (W2.5).` },
        { card: "symmetric-polynomial-strategies", note: String.raw`expressions in $x + y$ and $xy$ (T1.2).` },
        { card: "vietas-general", note: String.raw`the elementary symmetric sums as polynomial coefficients (W2.1).` }
      ],
      exercises: [
        { q: String.raw`Real numbers $a$, $b$, $c$ satisfy $a + b + c = 0$ and $a^3 + b^3 + c^3 = 12$. Find $abc$.`, answer: "4",
          solution: String.raw`When $a + b + c = 0$, $a^3 + b^3 + c^3 = 3abc$, so $abc = 4$.` },
        { q: String.raw`Numbers $x$, $y$, $z$ have $x + y + z = 5$, $xy + yz + zx = 8$ and $xyz = 4$. Find $(x + y)(y + z)(z + x)$.`, answer: "36",
          solution: String.raw`$(x + y)(y + z)(z + x) = (x + y + z)(xy + yz + zx) - xyz = 40 - 4 = 36$.` },
        { q: String.raw`Find the smallest prime factor of $2^{35} + 3^{35}$.`, answer: "5",
          solution: String.raw`It is odd, and it is $\equiv 2^{35} \not\equiv 0 \pmod 3$. Since $35$ is odd, $2 + 3 = 5$ divides it. The smallest prime factor is $5$.` }
      ],
      problems: [
        "2021 Fall AMC 10B, Problem 12",
        "2012 AMC 10A, Problem 24"
      ]
    }
  }
};
