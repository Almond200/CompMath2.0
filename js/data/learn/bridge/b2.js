// Learn, AMC to AIME Bridge, chapter B2: polynomial and sequence fundamentals (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["B2"] = {
  lessons: {
    "B2.1": {
      prereq: ["useful-factorizations"],
      cards: ["factor-remainder-theorem", "polynomial-division", "rational-root-theorem"],
      body: String.raw`A polynomial's roots and its values are tied together: $r$ is a root exactly when $x - r$ is a factor, and the remainder on dividing by $x - r$ is just the value at $r$. With these two facts and the list of possible rational roots, most questions about the factors of a polynomial take a few lines, and long division is rarely needed.

The [[factor-remainder-theorem|remainder theorem]] says that the remainder when $P(x)$ is divided by $x - r$ is $P(r)$, and the factor theorem says $x - r$ divides $P(x)$ exactly when $P(r) = 0$. So the remainder of $x^5 + 3x^2 - 7$ on division by $x + 1$ is $P(-1) = -1 + 3 - 7 = -5$, and $x^{100}$ leaves remainder $1$ on division by $x - 1$. Dividing by a quadratic leaves a linear remainder $ax + b$, found from the values at the quadratic's two roots. For integers, the same theorem says $a - b$ divides $P(a) - P(b)$ when $P$ has integer coefficients, which turns divisibility questions about $n + 10 \mid n^3 + 100$ into evaluating at $-10$.

[[polynomial-division|Polynomial division]], long or synthetic, writes $P(x) = D(x)Q(x) + R(x)$ with the remainder of lower degree than the divisor. Synthetic division by $x - r$ is a quick table that gives both the quotient and the value $P(r)$, and is the way to factor out a root once found.

The [[rational-root-theorem|rational root theorem]] lists the candidates: a rational root $\tfrac pq$ in lowest terms of a polynomial with integer coefficients has $p$ dividing the constant term and $q$ dividing the leading coefficient. For $2x^3 - 3x^2 - 3x + 2$ the candidates are $\pm1, \pm2, \pm\tfrac12$; testing finds $2$, then dividing leaves $2x^2 + x - 1 = (2x - 1)(x + 1)$, so the roots are $2$, $\tfrac12$, $-1$, with product $-1$. Testing $x = 1$ and $x = -1$ first is cheap: $P(1)$ is the sum of the coefficients and $P(-1)$ the alternating sum.

Evaluate instead of dividing, list rational candidates, and divide out each root as soon as it is found. The next lesson relates the roots to the coefficients.`,
      related: [
        { card: "polynomial-crt", note: String.raw`remainders on division by products of linear factors (A2.2).` },
        { card: "vietas-general", note: String.raw`the sums and products of roots from the coefficients (B2.2).` },
        { card: "coefficient-extraction", note: String.raw`$P(1)$ and $P(-1)$ as sums of coefficients.` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $x^5 + 3x^2 - 7$ is divided by $x + 1$.`, answer: "-5",
          solution: String.raw`By the remainder theorem it is $P(-1) = -1 + 3 - 7 = -5$.` },
        { q: String.raw`Find the product of the roots of $2x^3 - 3x^2 - 3x + 2$ by finding them.`, answer: "-1",
          solution: String.raw`The rational candidates are $\pm1, \pm2, \pm\tfrac12$, and $P(2) = 16 - 12 - 6 + 2 = 0$. Dividing by $x - 2$ leaves $2x^2 + x - 1 = (2x - 1)(x + 1)$. The roots are $2$, $\tfrac12$, $-1$, with product $-1$ (as Vieta's $-\tfrac{2}{2}$ confirms).` }
      ],
      problems: [
        "2023 AMC 10A, Problem 21",
        "2010 AMC 10B, Problem 25",
        "2014 AMC 12A, Problem 19",
        "2011 AMC 12A, Problem 20",
        "2015 AMC 12A, Problem 20",
        "2017 AMC 12A, Problem 21",
        "2011 AIME I, Problem 7",
        "2002 AIME II, Problem 11"
      ]
    },
    "B2.2": {
      prereq: ["factor-remainder-theorem", "square-of-sum"],
      cards: ["quadratic-formula", "vietas-quadratic", "vietas-general", "vertex-form"],
      body: String.raw`Quadratics are the most common equations in contest mathematics, and for them, and for polynomials in general, the coefficients encode the sum and product of the roots. Problems ask for $r^2 + s^2$ or $\tfrac1r + \tfrac1s$ without solving, for the number of real roots, or for the largest value of a quadratic expression. The quadratic formula, Vieta's formulas and the vertex answer these.

The [[quadratic-formula|quadratic formula]] gives the roots of $ax^2 + bx + c = 0$ as $\tfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$, and the discriminant $b^2 - 4ac$ decides whether there are two real roots, one double root, or none. [[vietas-quadratic|Vieta's formulas]] for the quadratic say the roots add to $-\tfrac ba$ and multiply to $\tfrac ca$. For $x^2 - 7x + 3$, the roots satisfy $r + s = 7$ and $rs = 3$, so $r^2 + s^2 = (r + s)^2 - 2rs = 43$ and $\tfrac1r + \tfrac1s = \tfrac73$, all without the formula. A quadratic with given roots $r$ and $s$ is $x^2 - (r + s)x + rs$, which is how two unknowns with a known sum and product are found.

The [[vietas-general|general Vieta formulas]] for $x^n + a_{n-1}x^{n-1} + \cdots + a_0$ say the roots add to $-a_{n-1}$, the sum of the products of pairs is $a_{n-2}$, and so on with alternating signs, ending with the product of all roots $(-1)^na_0$. For $x^3 - 6x^2 + 11x - 6$ the roots add to $6$, their pairwise products add to $11$, and their product is $6$; the roots are $1$, $2$, $3$. Any symmetric expression in the roots can be written through these sums, which is the subject of the algebra book's early chapters.

A quadratic's graph is a parabola with its [[vertex-form|vertex]] at $x = -\tfrac{b}{2a}$, where it takes its largest or smallest value. For $2x^2 - 12x + 5$ the vertex is at $x = 3$, with minimum $-13$. Completing the square, $2(x - 3)^2 - 13$, shows the same. The roots are symmetric about the vertex, so equal values at two points put the axis halfway between them.

Use Vieta for symmetric expressions in the roots, the discriminant for how many real roots there are, and the vertex for extremes. The next lesson sums sequences.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`writing any symmetric expression in the elementary symmetric sums (A1.2).` },
        { card: "newtons-sums", note: String.raw`power sums of the roots from Vieta (A2.3).` },
        { card: "quadratic-root-location", note: String.raw`where the roots lie, from the discriminant, the vertex and values (B6.1).` }
      ],
      exercises: [
        { q: String.raw`The roots of $x^2 - 7x + 3 = 0$ are $r$ and $s$. Find $r^2 + s^2$.`, answer: "43",
          solution: String.raw`By Vieta, $r + s = 7$ and $rs = 3$, so $r^2 + s^2 = (r + s)^2 - 2rs = 49 - 6 = 43$.` },
        { q: String.raw`Find the smallest value of $2x^2 - 12x + 5$.`, answer: "-13",
          solution: String.raw`The vertex is at $x = -\tfrac{-12}{2 \cdot 2} = 3$, where the value is $18 - 36 + 5 = -13$. Equivalently, $2x^2 - 12x + 5 = 2(x - 3)^2 - 13$.` }
      ],
      problems: [
        "2006 AMC 10A, Problem 8",
        "2002 AMC 10A, Problem 14",
        "2003 AMC 10A, Problem 18",
        "2000 AMC 10, Problem 24",
        "2023 AMC 12B, Problem 14",
        "2019 AMC 12B, Problem 21",
        "1986 AIME, Problem 1",
        "2012 AIME II, Problem 4",
        "1991 AIME, Problem 8"
      ]
    },
    "B2.3": {
      prereq: [],
      cards: ["arithmetic-series", "geometric-series", "triangular-numbers", "power-sums"],
      body: String.raw`Sums of sequences appear everywhere: the total of the first hundred odd numbers, the value of a bank account after repeated growth, the number of handshakes in a room, the sum of the first ten squares. Four closed forms, and the habit of pairing terms, cover most of them.

An arithmetic sequence adds a fixed difference each step, and its [[arithmetic-series|sum]] is the number of terms times the average of the first and last terms: $1 + 3 + \cdots + 99$ has $50$ terms averaging $50$, so it is $2500$. Gauss's pairing of first with last, second with second-to-last, is the reason, and it works for any sum that is symmetric about its middle. The $n$th term is $a + (n - 1)d$, and three numbers are in arithmetic progression exactly when the middle one is the average of the others.

A geometric sequence multiplies by a fixed ratio $r$, and its [[geometric-series|sum]] is $a\tfrac{r^n - 1}{r - 1}$: $3 + 6 + \cdots + 384$ has $8$ terms and sums to $3(2^8 - 1) = 765$. When $|r| \lt 1$ the infinite sum is $\tfrac{a}{1 - r}$, so $1 + \tfrac13 + \tfrac19 + \cdots = \tfrac32$. Three numbers are in geometric progression exactly when the middle one squared is the product of the others.

The [[triangular-numbers|triangular numbers]] $T_n = 1 + 2 + \cdots + n = \tfrac{n(n + 1)}{2}$ count pairs among $n + 1$ objects and dots in a triangle; $T_{20} = 210$. The [[power-sums|power sums]] $1^2 + \cdots + n^2 = \tfrac{n(n + 1)(2n + 1)}{6}$ and $1^3 + \cdots + n^3 = T_n^2$ handle sums of squares and cubes; the first ten squares add to $385$.

When a sum looks irregular, split it into arithmetic and geometric pieces, pair terms from the ends, or write it as a difference of two known sums. The last lesson of the chapter treats sequences defined step by step.`,
      related: [
        { card: "telescoping", note: String.raw`sums that collapse because consecutive terms cancel (A3.3).` },
        { card: "higher-power-sums", note: String.raw`sums of fourth and higher powers (A9.2).` },
        { card: "fx-pairing", note: String.raw`Gauss's pairing applied to any function (A4.2).` }
      ],
      exercises: [
        { q: String.raw`Find $3 + 6 + 12 + \cdots + 384$.`, answer: "765",
          solution: String.raw`The terms are $3 \cdot 2^k$ for $k = 0, \ldots, 7$, so the sum is $3(2^8 - 1) = 3 \cdot 255 = 765$.` },
        { q: String.raw`For which $n$ is $1 + 2 + \cdots + n = 210$?`, answer: "20",
          solution: String.raw`$\tfrac{n(n + 1)}{2} = 210$ means $n(n + 1) = 420 = 20 \cdot 21$, so $n = 20$.` },
        { q: String.raw`Find $1^2 + 2^2 + \cdots + 10^2$.`, answer: "385",
          solution: String.raw`$\tfrac{n(n + 1)(2n + 1)}{6}$ with $n = 10$ is $\tfrac{10 \cdot 11 \cdot 21}{6} = 385$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 3",
        "2006 AMC 10A, Problem 9",
        "2025 AMC 10A, Problem 13",
        "2014 AMC 12A, Problem 9",
        "2006 AMC 10A, Problem 19",
        "2021 Fall AMC 10B, Problem 22",
        "2004 AIME I, Problem 2",
        "1986 AIME, Problem 6",
        "2026 AIME II, Problem 1"
      ]
    },
    "B2.4": {
      prereq: ["arithmetic-series"],
      cards: ["first-order-recurrence", "periodic-sequences", "organized-listing"],
      body: String.raw`Some sequences are defined step by step, each term from the one before, and the question asks for a far term or a sum. The method is to compute the first several terms, look for a pattern (a closed form, or a cycle), and confirm it. The same habit of writing out small cases in an organized list is what makes casework reliable.

A [[first-order-recurrence|first-order recurrence]] $a_{n+1} = ra_n + c$ has a closed form found by shifting to the fixed point $L = \tfrac{c}{1 - r}$: the differences $a_n - L$ form a geometric sequence. For $a_{n+1} = 2a_n + 1$ with $a_1 = 1$, the fixed point is $-1$, and $a_n + 1 = 2^n$, so $a_{10} = 1023$. Writing out $1, 3, 7, 15, \ldots$ suggests the same answer, and recognizing the numbers one less than powers of $2$ is the usual way it is found in practice.

A sequence that depends on a finite amount of information, such as the last two terms with values in a finite set, must eventually repeat. Such [[periodic-sequences|periodic sequences]] are handled by finding the period and reducing the index: $a_{n+2} = a_{n+1} - a_n$ with $a_1 = 1$, $a_2 = 3$ runs $1, 3, 2, -1, -3, -2, 1, 3, \ldots$ with period $6$ and zero sum over each period, so the first $100$ terms add to the first $4$, which is $5$. Recursions involving fractions, such as $a_{n+1} = \tfrac{1}{1 - a_n}$, often cycle with a short period too.

[[organized-listing|Organized listing]] is the discipline of writing cases in a fixed order so that none is missed or repeated: list triples by their smallest entry, then the next, and so on. The positive solutions of $a + b + c = 10$ with $a \le b \le c$ are $(1, 1, 8), (1, 2, 7), (1, 3, 6), (1, 4, 5), (2, 2, 6), (2, 3, 5), (2, 4, 4), (3, 3, 4)$, which is $8$. An organized list of small cases is also the best way to find the pattern of a sequence or to check a formula.

Compute small cases in order, find the closed form or the period, and use the list to check. The next chapter turns to integer arithmetic.`,
      related: [
        { card: "linear-recurrence", note: String.raw`second-order recurrences and their characteristic roots (A3.2).` },
        { card: "cycle-hunting", note: String.raw`periods of last digits and remainders (B3.3).` },
        { card: "recursive-counting", note: String.raw`recurrences that count objects (C5.2).` }
      ],
      exercises: [
        { q: String.raw`A sequence has $a_1 = 1$ and $a_{n+1} = 2a_n + 1$. Find $a_{10}$.`, answer: "1023",
          solution: String.raw`$a_n + 1$ doubles each step and starts at $2$, so $a_n + 1 = 2^n$ and $a_{10} = 2^{10} - 1 = 1023$.` },
        { q: String.raw`A sequence has $a_1 = 1$, $a_2 = 3$ and $a_{n+2} = a_{n+1} - a_n$. Find $a_1 + a_2 + \cdots + a_{100}$.`, answer: "5",
          solution: String.raw`The terms are $1, 3, 2, -1, -3, -2$ and then repeat, with period $6$ and sum $0$ over each period. The first $96$ terms add to $0$, and the next four are $1, 3, 2, -1$, adding to $5$.` },
        { q: String.raw`How many triples of positive integers $a \le b \le c$ have $a + b + c = 10$?`, answer: "8",
          solution: String.raw`By $a$: with $a = 1$, $(b, c) = (1, 8), (2, 7), (3, 6), (4, 5)$; with $a = 2$, $(2, 6), (3, 5), (4, 4)$; with $a = 3$, $(3, 4)$. In all $8$.` }
      ],
      problems: [
        "2021 Spring AMC 10B, Problem 8",
        "2020 AMC 10B, Problem 13",
        "2019 AMC 10B, Problem 18",
        "2025 AMC 10B, Problem 21",
        "2004 AMC 10A, Problem 24",
        "2023 AMC 12A, Problem 20",
        "2020 AIME II, Problem 6",
        "2025 AIME II, Problem 8",
        "2021 AIME II, Problem 11"
      ]
    }
  }
};
