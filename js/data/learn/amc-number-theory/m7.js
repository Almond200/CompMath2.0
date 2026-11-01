// Learn, AMC Number Theory, chapter M7: from the AMC to the AIME (CONVENTIONS §14). Part: Toward the AIME.
// The second plan's book, written fresh (nineteenth chat). No new cards. Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M7"] = {
  lessons: {
    "M7.1": {
      prereq: ["modular-basics", "crt", "sfft"],
      cards: [],
      body: String.raw`This chapter teaches no new card. It takes the ideas of the book, remainders and cycles, the Chinese remainder theorem, factoring and bounding, and uses them together on problems from the early AIME. The difference from the AMC is not the tools but the length: an AIME answer is a whole number from $0$ to $999$, with no choices to test, and a solution often needs two ideas in a row.

The first lesson combines remainders. The last two digits of $7^{2026}$ come from a cycle: $7^4 = 2401 \equiv 1 \pmod{100}$, so the powers of $7$ repeat every four steps, and $7^{2026} \equiv 7^2 = 49$. A number with remainders $3$, $2$ and $1$ modulo $4$, $5$ and $3$ is found by combining the conditions into one modulo $60$: the smallest is $7$.

The second lesson solves equations in integers by factoring, and limits the cases by bounds. The equation $xy = 2x + 3y$ looks like it has two unknowns too many, but it becomes $(x - 3)(y - 2) = 6$, and the factor pairs of $6$ give its four positive solutions.

The third lesson mixes everything, the way an AIME does. The lessons are residues and cycles together (M7.2), integer equations by factoring and bounds (M7.3), and mixed problems across the book (M7.4). The Summary (M7.5) collects the strategies.`,
      exercises: [
        { q: String.raw`What number is formed by the last two digits of $7^{2026}$?`, answer: "49",
          solution: String.raw`$7^2 = 49$ and $7^4 = 2401 \equiv 1 \pmod{100}$, so the powers of $7$ repeat with period $4$ modulo $100$. Since $2026 = 4 \cdot 506 + 2$, $7^{2026} \equiv 7^2 = 49$.` },
        { q: String.raw`What is the smallest positive integer that leaves remainder $3$ on division by $4$, remainder $2$ on division by $5$, and remainder $1$ on division by $3$?`, answer: "7",
          solution: String.raw`The numbers that are $3$ modulo $4$ are $3, 7, 11, \ldots$; the first that is $2$ modulo $5$ is $7$, and $7$ is also $1$ modulo $3$. By the Chinese remainder theorem every solution is $7$ plus a multiple of $60$, so $7$ is the smallest.` },
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $xy = 2x + 3y$?`, answer: "4",
          solution: String.raw`Rewrite as $xy - 2x - 3y + 6 = 6$, that is $(x - 3)(y - 2) = 6$. If $x - 3 \lt 0$, then $x$ is $1$ or $2$ and $y - 2$ is $-6$ or $-3$, so $y \lt 0$. So both factors are positive: $(1, 6), (2, 3), (3, 2), (6, 1)$, giving $(4, 8), (5, 5), (6, 4), (9, 3)$.` }
      ],
      problems: [
        "2004 AIME I, Problem 1",
        "1993 AIME, Problem 6",
        "1997 AIME, Problem 1"
      ]
    },
    "M7.2": {
      prereq: ["modular-basics", "cycle-hunting", "crt", "eulers-theorem", "multiplicative-order"],
      cards: [],
      body: String.raw`An AIME often asks for the remainder of something enormous on division by $1000$, or for the smallest number that satisfies several conditions on remainders. What is $2^{2026}$ modulo $1000$? What are the last two digits of $7^{7^7}$?

The modulus $1000$ is rarely handled directly. It splits as $8 \cdot 125$, two coprime parts, and [[crt|the Chinese remainder theorem]] says a remainder modulo $1000$ is the same as a pair of remainders modulo $8$ and modulo $125$. Each part is easier. Modulo $8$, any power $2^k$ with $k \ge 3$ is $0$. Modulo $125$, [[eulers-theorem|Euler's theorem]] with $\varphi(125) = 100$ reduces the exponent: $2^{2026} \equiv 2^{26} \pmod{125}$, and repeated squaring gives $2^{26} \equiv 114$. The number that is $0$ modulo $8$ and $114$ modulo $125$ is found by listing $114, 239, 364, 489, 614, 739, 864$ until one is a multiple of $8$: $2^{2026} \equiv 864 \pmod{1000}$.

A tower of exponents needs [[cycle-hunting|a cycle]] at each level. Modulo $100$, the powers of $7$ have period $4$ ($7^4 = 2401$), so $7^{7^7}$ depends only on $7^7$ modulo $4$. Since $7 \equiv -1 \pmod 4$, $7^7 \equiv -1 \equiv 3$, so $7^{7^7} \equiv 7^3 = 343 \equiv 43 \pmod{100}$. The length of the cycle at one level is [[multiplicative-order|the order]], and it becomes the modulus at the next level down.

Remainders also give a fast count. Every integer coprime to $6$ has $n^2 \equiv 1 \pmod{24}$, since $n^2 - 1 = (n - 1)(n + 1)$ is then a product of two consecutive even numbers, one a multiple of $4$, and one of $n - 1$ and $n + 1$ is a multiple of $3$. Counting such $n$ up to $1000$ is a question about [[modular-basics|remainders]] alone: $1000 - 500 - 333 + 166 = 333$.

Split a composite modulus into coprime prime powers, reduce exponents by the order or by $\varphi$, and recombine by listing. The next lesson solves equations in integers.`,
      related: [
        { card: "lte", note: String.raw`the exact power of a prime in $a^n - b^n$, an alternative for some towers and differences of powers.` },
        { card: "carmichael-function", note: String.raw`the period that works for every number coprime to the modulus at once.` }
      ],
      exercises: [
        { q: String.raw`What is the remainder when $2^{2026}$ is divided by $1000$?`, answer: "864",
          solution: String.raw`Modulo $8$, $2^{2026} \equiv 0$. Modulo $125$, $\varphi(125) = 100$ gives $2^{2026} \equiv 2^{26}$; from $2^7 = 128 \equiv 3$, $2^{21} \equiv 27$ and $2^{26} \equiv 27 \cdot 32 = 864 \equiv 114$. The numbers $114 + 125t$ are $114, 239, 364, 489, 614, 739, 864$, and $864 = 8 \cdot 108$ is the first multiple of $8$. So the remainder is $864$.` },
        { q: String.raw`What number is formed by the last two digits of $7^{7^7}$?`, answer: "43",
          solution: String.raw`$7^4 \equiv 1 \pmod{100}$, so only the exponent modulo $4$ matters. Since $7 \equiv -1 \pmod 4$ and $7$ is odd, $7^7 \equiv -1 \equiv 3$. So $7^{7^7} \equiv 7^3 = 343 \equiv 43$.` },
        { q: String.raw`For how many integers $n$ with $1 \le n \le 1000$ is $n^2 - 1$ divisible by $24$?`, answer: "333",
          solution: String.raw`If $2 \mid n$ or $3 \mid n$, then $n^2 - 1$ is odd or $\equiv 2 \pmod 3$, so $24 \nmid n^2 - 1$. If $n$ is coprime to $6$, then $(n - 1)(n + 1)$ is a product of consecutive even numbers, divisible by $8$, and one factor is a multiple of $3$. So the count is the number of $n$ coprime to $6$: $1000 - 500 - 333 + 166 = 333$.` }
      ],
      problems: [
        "2008 AIME I, Problem 3",
        "1999 AIME, Problem 1",
        "2002 AIME II, Problem 7"
      ]
    },
    "M7.3": {
      prereq: ["sfft", "factor-pair-counting", "difference-of-squares-rep", "bounding-diophantine", "squeeze-between-squares"],
      cards: [],
      body: String.raw`Equations in integers on the AIME rarely arrive ready to factor. A digit puzzle, a condition on a perfect square, or a sum of reciprocals has to be rewritten first. For which positive $n$ is $n^2 + 24n$ a square? How many lattice points lie on $x^2 - y^2 = 96$?

A condition "is a perfect square" becomes a factoring problem after completing the square. With $n^2 + 24n = k^2$, add $144$: $(n + 12)^2 - k^2 = 144$, which is [[difference-of-squares-rep|a difference of squares]], $(n + 12 - k)(n + 12 + k) = 144$. The two factors have the same parity, since they differ by $2k$, so both are even, and [[factor-pair-counting|their pairs]] are $(2, 72)$, $(4, 36)$, $(6, 24)$, $(8, 18)$ and $(12, 12)$. Each gives $n + 12$ as the average: $37, 20, 15, 13, 12$, so $n = 25, 8, 3, 1$ (and $n = 0$, which is not positive).

A product of unknowns with linear terms [[sfft|completes a product]] in the same way: $\tfrac1x + \tfrac1y = \tfrac16$ clears to $xy - 6x - 6y = 0$, that is $(x - 6)(y - 6) = 36$. Both factors must be positive (if $x - 6 \lt 0$, then $\tfrac1x \gt \tfrac16$), so the solutions match the $9$ divisors of $36$. Signs, parity and the ranges of the variables decide which factor pairs count, and each must be checked.

When no factoring appears, [[bounding-diophantine|a bound]] limits the cases. One side usually grows faster: $2^n$ outgrows any polynomial, and a factorial outgrows a power. A square trapped strictly between two consecutive squares is impossible, which is [[squeeze-between-squares|the squeeze]]; and a remainder can rule out whole families before any bound is needed.

Complete the square or the product, use parity to cut the factor pairs, and bound what will not factor. The next lesson mixes the ideas of the whole book.`,
      related: [
        { card: "pell-equation", note: String.raw`for $x^2 - Dy^2 = 1$, which has infinitely many solutions instead of a few (M6.5).` },
        { card: "pythagorean-triples", note: String.raw`the factoring of $c^2 - b^2 = a^2$ (M5.5).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of all positive integers $n$ for which $n^2 + 24n$ is a perfect square.`, answer: "37",
          solution: String.raw`With $n^2 + 24n = k^2$, $(n + 12 - k)(n + 12 + k) = 144$, two factors of the same parity, so both even. The pairs $(2, 72)$, $(4, 36)$, $(6, 24)$, $(8, 18)$ give $n + 12 = 37, 20, 15, 13$, that is $n = 25, 8, 3, 1$, and $(12, 12)$ gives $n = 0$. The sum is $25 + 8 + 3 + 1 = 37$.` },
        { q: String.raw`How many points with integer coordinates lie on the curve $x^2 - y^2 = 96$?`, answer: "16",
          solution: String.raw`$(x - y)(x + y) = 96$, with two factors of the same parity, so both even: $x - y = 2a$ and $x + y = 2b$ with $ab = 24$. The $8$ positive divisors of $24$ give $8$ ordered pairs $(a, b)$, and their negatives give $8$ more. Each pair gives one point, so there are $16$.` },
        { q: String.raw`How many ordered pairs of positive integers $(x, y)$ satisfy $\tfrac1x + \tfrac1y = \tfrac16$?`, answer: "9",
          solution: String.raw`Clearing denominators, $xy - 6x - 6y = 0$, so $(x - 6)(y - 6) = 36$. Both $x$ and $y$ exceed $6$, since each reciprocal is less than $\tfrac16$, so both factors are positive, one for each of the $9$ divisors of $36$.` }
      ],
      problems: [
        "1997 AIME, Problem 3",
        "2000 AIME II, Problem 2",
        "1999 AIME, Problem 3",
        "2000 AIME I, Problem 1"
      ]
    },
    "M7.4": {
      prereq: ["modular-basics", "crt", "number-of-divisors", "exponent-tracking", "difference-of-squares-rep", "base-conversion", "bounding-diophantine"],
      cards: [],
      body: String.raw`A real contest does not say which chapter a problem comes from. This lesson's problems each need two or three ideas from the book, and the first step is to see which. When is $2^n + 65$ a perfect square? How many divisors of $10^6$ leave remainder $1$ on division by $3$? What is the smallest number with remainder $1$ on division by each of $2$, $3$, $4$, $5$, $6$ that is a multiple of $7$?

The first question needs a split by parity and then factoring. If $n = 2m$ is even, $k^2 - 2^{2m} = 65$ is [[difference-of-squares-rep|a difference of squares]]: $(k - 2^m)(k + 2^m) = 65$, so the factors are $1 \cdot 65$ or $5 \cdot 13$, and their difference $2^{m+1}$ is $64$ or $8$, giving $n = 10$ or $n = 4$. If $n$ is odd, a remainder decides: modulo $5$ the powers $2^n$ with $n$ odd are $2$ or $3$, and $65 \equiv 0$, but a square is $0$, $1$ or $4$ modulo $5$. So $n = 4$ and $n = 10$ are the only answers.

The second question combines [[number-of-divisors|counting divisors]] with [[modular-basics|remainders]]. A divisor of $10^6$ is $2^a 5^b$ with $0 \le a, b \le 6$, and modulo $3$ both $2$ and $5$ are $-1$, so $2^a 5^b \equiv (-1)^{a+b}$. It is $1$ exactly when $a + b$ is even: $4 \cdot 4 + 3 \cdot 3 = 25$ divisors.

The third combines remainders with [[crt|the Chinese remainder theorem]]: remainder $1$ on division by $2, \ldots, 6$ means $n - 1$ is a multiple of $\operatorname{lcm}(2, \ldots, 6) = 60$, so $n = 61, 121, 181, 241, 301, \ldots$, and the first multiple of $7$ is $301$.

On each problem, name the ideas before computing: which prime, which modulus, which factoring, which bound. The Summary follows.`,
      related: [
        { card: "choose-modulus", note: String.raw`choosing the modulus that rules out a case, as $5$ does for $2^n + 65$ with $n$ odd (M4.4).` },
        { card: "squares-mod-small", note: String.raw`the squares modulo $3$, $4$, $5$ and $8$ (M4.4).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of all positive integers $n$ for which $2^n + 65$ is a perfect square.`, answer: "14",
          solution: String.raw`For $n$ odd, $2^n \equiv 2$ or $3 \pmod 5$ and $65 \equiv 0$, but squares are $0, 1, 4 \pmod 5$, so $n$ is even. With $n = 2m$, $(k - 2^m)(k + 2^m) = 65$, so the pair is $(1, 65)$ or $(5, 13)$, with difference $2^{m+1} = 64$ or $8$: $m = 5$ or $m = 2$. Then $n = 10$ ($1024 + 65 = 1089 = 33^2$) or $n = 4$ ($16 + 65 = 81$), with sum $14$.` },
        { q: String.raw`How many positive divisors of $10^6$ leave remainder $1$ on division by $3$?`, answer: "25",
          solution: String.raw`Each divisor is $2^a 5^b$ with $0 \le a, b \le 6$. Since $2 \equiv 5 \equiv -1 \pmod 3$, it is $(-1)^{a+b}$ modulo $3$, which is $1$ when $a + b$ is even: both even ($4 \cdot 4 = 16$) or both odd ($3 \cdot 3 = 9$), so $25$.` },
        { q: String.raw`What is the smallest integer $n \gt 1$ that leaves remainder $1$ on division by each of $2$, $3$, $4$, $5$ and $6$ and is divisible by $7$?`, answer: "301",
          solution: String.raw`$n - 1$ is a multiple of $\operatorname{lcm}(2, 3, 4, 5, 6) = 60$, so $n = 60t + 1$. Modulo $7$ this is $4t + 1$, which is $0$ when $4t \equiv 6$, so $t \equiv 5$ (as $4 \cdot 5 = 20 \equiv 6$). The smallest is $n = 301 = 7 \cdot 43$.` }
      ],
      problems: [
        "1990 AIME, Problem 5",
        "2000 AIME II, Problem 4",
        "1987 AIME, Problem 3",
        "2001 AIME I, Problem 8"
      ]
    },
    "M7.5": {
      prereq: ["modular-basics", "cycle-hunting", "crt", "eulers-theorem", "multiplicative-order", "sfft", "factor-pair-counting", "difference-of-squares-rep", "bounding-diophantine", "squeeze-between-squares"],
      cards: [],
      body: String.raw`[[crt|The Chinese remainder theorem]] splits a modulus such as $1000 = 8 \cdot 125$ into coprime parts and recombines the answers by listing. [[eulers-theorem|Euler's theorem]] and [[multiplicative-order|the order]] reduce exponents, and in a tower [[cycle-hunting|the cycle]] at one level is the modulus at the next. [[modular-basics|Remainders]] also rule out whole families of cases.

A condition that something is a square becomes [[difference-of-squares-rep|a difference of squares]] after completing the square, and a product with linear terms [[sfft|completes to a product]]; parity and signs cut [[factor-pair-counting|the factor pairs]]. What will not factor is limited by [[bounding-diophantine|a bound]] or [[squeeze-between-squares|squeezed between squares]].`,
      strategies: [
        String.raw`Split a remainder modulo $1000$ into remainders modulo $8$ and $125$, then recombine.`,
        String.raw`In a tower of exponents, reduce the top modulo the period of the level below.`,
        String.raw`Turn "is a perfect square" into a difference of squares by completing the square.`,
        String.raw`Both factors of $x^2 - y^2$ have the same parity; use it to cut the factor pairs.`,
        String.raw`Before factoring, split by parity or by a remainder; one case often dies at once.`,
        String.raw`Name the ideas a problem needs before computing.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the remainder when $3^{100}$ is divided by $1000$?`, answer: "1",
        solution: String.raw`Modulo $8$, $3^2 \equiv 1$, so $3^{100} \equiv 1$. Modulo $125$, $\varphi(125) = 100$ and $\gcd(3, 125) = 1$, so $3^{100} \equiv 1$. A number that is $1$ modulo both $8$ and $125$ is $1$ modulo $1000$.` },
      { q: String.raw`How many ordered pairs of positive integers $(x, y)$ satisfy $xy = 4x + 4y$?`, answer: "5",
        solution: String.raw`$(x - 4)(y - 4) = 16$. A negative factor would need $x - 4 \ge -3$ and $y - 4 \le -\tfrac{16}{3}$, so $y \lt 0$; so both are positive, one for each of the $5$ divisors of $16$: $(5, 20), (6, 12), (8, 8), (12, 6), (20, 5)$.` },
      { q: String.raw`What is the remainder when $1^2 + 2^2 + \cdots + 100^2$ is divided by $7$?`, answer: "5",
        solution: String.raw`The sum is $\tfrac{100 \cdot 101 \cdot 201}{6} = 338350$. Modulo $7$: $338350 = 7 \cdot 48335 + 5$, so the remainder is $5$.` }
    ],
    problems: [
      "1991 AIME, Problem 5",
      "1995 AIME, Problem 6"
    ]
  },
  challenge: {
    problems: [
      "2026 AIME I, Problem 8",
      "1996 AIME, Problem 8",
      "1992 AIME, Problem 5"
    ]
  }
};
