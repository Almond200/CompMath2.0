// Learn, AMC to AIME Bridge, chapter B3: integer arithmetic and congruence fundamentals (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["B3"] = {
  lessons: {
    "B3.1": {
      prereq: [],
      cards: ["fundamental-theorem-arithmetic", "euclidean-algorithm", "divisibility-rules", "number-of-divisors", "recognition-numbers"],
      body: String.raw`Every question about divisibility starts from the prime factorization. Once a number is written as a product of prime powers, its divisors, its greatest common divisor and least common multiple with another number, and the count of its divisors can all be read off. The tests for divisibility by small numbers and a short list of factorizations worth recognizing make the factorizations quick to find.

The [[fundamental-theorem-arithmetic|fundamental theorem of arithmetic]] says every integer greater than $1$ is a product of primes in exactly one way, apart from order. So $720 = 2^4 \cdot 3^2 \cdot 5$, and its divisors are exactly the numbers $2^a3^b5^c$ with $0 \le a \le 4$, $0 \le b \le 2$, $0 \le c \le 1$. Their [[number-of-divisors|number]] is $(4 + 1)(2 + 1)(1 + 1) = 30$: one more than each exponent, multiplied. The gcd of two numbers takes the smaller exponent of each prime and the lcm the larger, so $\gcd \cdot \operatorname{lcm} = ab$, and $\operatorname{lcm}(12, 18, 30) = 2^2 \cdot 3^2 \cdot 5 = 180$.

When the numbers are too large to factor, the [[euclidean-algorithm|Euclidean algorithm]] finds the gcd by repeated division: $\gcd(a, b) = \gcd(b, a \bmod b)$. For $1071$ and $462$: $1071 = 2 \cdot 462 + 147$, $462 = 3 \cdot 147 + 21$, $147 = 7 \cdot 21$, so the gcd is $21$. The same idea, $\gcd(a, b) = \gcd(a - kb, b)$, simplifies gcds of expressions like $\gcd(n^2 + 1, n + 1) = \gcd(2, n + 1)$.

The [[divisibility-rules|divisibility rules]] test small primes without dividing: by $3$ or $9$ through the digit sum, by $11$ through the alternating digit sum, by $4$ or $8$ through the last two or three digits, by $7$, $11$ and $13$ together through $1001 = 7 \cdot 11 \cdot 13$. [[recognition-numbers|Recognizing common numbers]] saves time: $1001 = 7 \cdot 11 \cdot 13$, $2^{10} = 1024$, $3^7 = 2187$, $2023 = 7 \cdot 17^2$, and the year of the contest usually has a factorization the problem relies on.

Factor first, then read divisors, gcds and lcms from the exponents. The next lesson works with remainders.`,
      related: [
        { card: "exponent-tracking", note: String.raw`working with the exponent of each prime separately (N1.2).` },
        { card: "gcd-lcm-product", note: String.raw`$\gcd(a, b)\operatorname{lcm}(a, b) = ab$ and its uses (N1.2).` },
        { card: "sum-of-divisors", note: String.raw`the sum of the divisors from the factorization.` }
      ],
      exercises: [
        { q: String.raw`How many positive divisors does $720$ have?`, answer: "30",
          solution: String.raw`$720 = 2^4 \cdot 3^2 \cdot 5$, so it has $(4 + 1)(2 + 1)(1 + 1) = 30$ divisors.` },
        { q: String.raw`Find $\gcd(1071, 462)$.`, answer: "21",
          solution: String.raw`$1071 - 2 \cdot 462 = 147$, $462 - 3 \cdot 147 = 21$, and $147 = 7 \cdot 21$, so the gcd is $21$.` },
        { q: String.raw`Find $\operatorname{lcm}(12, 18, 30)$.`, answer: "180",
          solution: String.raw`$12 = 2^2 \cdot 3$, $18 = 2 \cdot 3^2$, $30 = 2 \cdot 3 \cdot 5$; the lcm takes the largest exponents, $2^2 \cdot 3^2 \cdot 5 = 180$.` }
      ],
      problems: [
        "2024 AMC 10A, Problem 1",
        "2003 AMC 10A, Problem 8",
        "2014 AMC 10B, Problem 12",
        "2021 Spring AMC 10B, Problem 16",
        "2018 AMC 10B, Problem 21",
        "2016 AMC 12A, Problem 18",
        "2010 AIME I, Problem 1",
        "2000 AIME II, Problem 4",
        "2019 AIME I, Problem 9"
      ]
    },
    "B3.2": {
      prereq: ["euclidean-algorithm"],
      cards: ["modular-basics"],
      body: String.raw`Remainders follow their own arithmetic. Two numbers with the same remainder on division by $n$ behave alike in sums and products, so a question about the last digit of a huge product, or the remainder of a large power, needs only the remainders of the pieces. This arithmetic of congruences is the main language of number theory.

[[modular-basics|Modular arithmetic]] writes $a \equiv b \pmod n$ when $n$ divides $a - b$. Congruences can be added, subtracted and multiplied, so $999 \cdot 998 \equiv (-1)(-2) = 2 \pmod{1000}$: using negative residues, numbers just below a multiple of $n$ become small. Powers reduce the same way: $2^{10} = 1024 \equiv 1 \pmod{11}$ makes $2^{100} \equiv 1$, and $10 \equiv 1 \pmod 9$ explains why a number and its digit sum have the same remainder mod $9$.

Division is the one operation that needs care. Dividing by $a$ modulo $n$ means multiplying by an inverse $a^{-1}$ with $aa^{-1} \equiv 1$, which exists exactly when $\gcd(a, n) = 1$. Small inverses are found by inspection: $3 \cdot 5 = 15 \equiv 1 \pmod 7$, so $3^{-1} \equiv 5 \pmod 7$. Solving $3x \equiv 4 \pmod 7$ multiplies by $5$: $x \equiv 20 \equiv 6$.

Residues also organize cases. A square is $0$ or $1 \pmod 4$; it is $0$, $1$ or $4 \pmod 8$, and $1$ when it is odd; and it is $0$ or $1 \pmod 3$, which rules out many equations at once: $x^2 + y^2 = 4k + 3$ has no solution. Checking an equation modulo a small number is the quickest test of whether it can have integer solutions.

Reduce early, use negative residues, invert only coprime numbers, and test equations modulo small numbers. The next lesson finds the cycles of powers.`,
      related: [
        { card: "modular-inverse", note: String.raw`inverses modulo $n$ in general (N2.3).` },
        { card: "crt", note: String.raw`combining congruences to different moduli (N2.5).` },
        { card: "fermats-little-theorem", note: String.raw`$a^{p-1} \equiv 1 \pmod p$, the first general power rule (N3.2).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $999 \cdot 998$ is divided by $1000$.`, answer: "2",
          solution: String.raw`$999 \equiv -1$ and $998 \equiv -2 \pmod{1000}$, so the product is $\equiv 2$.` },
        { q: String.raw`Solve $3x \equiv 4 \pmod 7$ for $0 \le x \lt 7$.`, answer: "6",
          solution: String.raw`The inverse of $3$ is $5$, since $15 \equiv 1$. Multiplying, $x \equiv 20 \equiv 6 \pmod 7$. Check: $18 \equiv 4$.` }
      ],
      problems: [
        "2009 AMC 10B, Problem 1",
        "2000 AMC 10, Problem 6",
        "2000 AMC 10, Problem 14",
        "2002 AMC 12B, Problem 11",
        "2003 AMC 12B, Problem 12",
        "2010 AMC 12B, Problem 16",
        "1994 AIME, Problem 1",
        "1998 AIME, Problem 4",
        "2024 AIME II, Problem 7"
      ]
    },
    "B3.3": {
      prereq: ["modular-basics"],
      cards: ["cycle-hunting", "last-digit-patterns"],
      body: String.raw`Powers modulo a number repeat in cycles, and finding the cycle answers questions about the last digit of $7^{2026}$, the remainder of a large power, or a term far out in a sequence defined by a remainder rule. The method is to list powers until one repeats, read the period, and reduce the exponent.

[[last-digit-patterns|Last digits]] of powers depend only on the last digit of the base, and they cycle with period dividing $4$: $7, 9, 3, 1, 7, \ldots$ for powers of $7$; $2, 4, 8, 6$ for powers of $2$; $3, 9, 7, 1$ for $3$; while $0$, $1$, $5$, $6$ repeat immediately and $4$, $9$ alternate. So $7^{2026}$ ends in the second entry of its cycle, since $2026 \equiv 2 \pmod 4$: the last digit is $9$. Sums of last digits work the same way, so the last digit of $2026^2 + 3^{2026}$ is the last digit of $6 + 9$, which is $5$.

[[cycle-hunting|Cycle hunting]] is the general method: compute a sequence of remainders until a value repeats; from then on everything repeats, and the period lets a huge index be reduced. A cycle may start right away (powers of a number coprime to the modulus) or only after a few terms (powers of $2 \bmod 12$ go $2, 4, 8, 4, 8, \ldots$), so the reduction must account for the part before the cycle. The same method applies to any sequence where each term depends only on the previous one or two and the values are limited, such as last digits of a recursively defined sequence.

Tabulate until a repeat, note where the cycle begins and its length, and reduce. The next lesson solves equations in integers.`,
      related: [
        { card: "periodic-sequences", note: String.raw`sequences that repeat, in general (B2.4).` },
        { card: "multiplicative-order", note: String.raw`the exact period of $a^k \bmod n$ and why it divides $\varphi(n)$ (N3.2).` },
        { card: "eulers-theorem", note: String.raw`$a^{\varphi(n)} \equiv 1 \pmod n$, a period that always works (N3.2).` }
      ],
      exercises: [
        { q: String.raw`What is the last digit of $7^{2026}$?`, answer: "9",
          solution: String.raw`Last digits of powers of $7$ cycle as $7, 9, 3, 1$ with period $4$. Since $2026 = 4 \cdot 506 + 2$, the last digit is the second in the cycle, $9$.` }
      ],
      problems: [
        "2024 AMC 10A, Problem 10"
      ]
    },
    "B3.4": {
      prereq: ["number-of-divisors", "difference-of-squares"],
      cards: ["sfft", "factor-pair-counting", "only-even-prime"],
      body: String.raw`Equations in integers, such as $xy = x + y + 5$ or $x^2 - y^2 = 45$, have finitely many solutions that are found by factoring: rewrite the equation as a product equal to a known number, and list the factor pairs. Parity and the special role of the prime $2$ settle many others.

[[sfft|Simon's favorite factoring trick]] adds a constant to complete a product: $xy - x - y = 5$ becomes $xy - x - y + 1 = 6$, that is $(x - 1)(y - 1) = 6$. For positive integers, $x - 1$ and $y - 1$ are a factor pair of $6$: $(1, 6), (2, 3), (3, 2), (6, 1)$, giving $4$ solutions. In general $axy + bx + cy$ is completed by multiplying through by $a$ first.

[[factor-pair-counting|Counting factor pairs]] then counts solutions. $x^2 - y^2 = 45$ is $(x - y)(x + y) = 45$, and with positive integers the factors have the same parity and $x - y \lt x + y$: the pairs $(1, 45)$, $(3, 15)$, $(5, 9)$ give $3$ solutions. The number of factor pairs comes from the number of divisors, and parity conditions keep some and discard others.

[[only-even-prime|The prime $2$]] is the only even prime, so a sum of two primes that is odd must include $2$: if $p + q = 99$ with both prime, one is $2$ and the other $97$. Parity arguments of this kind, and the fact that a product of integers is odd only when all factors are odd, cut down cases quickly.

Complete products, list factor pairs, and use parity. The next chapter moves to counting.`,
      related: [
        { card: "difference-of-squares-rep", note: String.raw`which numbers are differences of two squares (N5.2).` },
        { card: "bounding-diophantine", note: String.raw`bounding the variables when an equation does not factor.` },
        { card: "useful-factorizations", note: String.raw`$ab + a + b + 1 = (a + 1)(b + 1)$, the identity behind the trick (B1.1).` }
      ],
      exercises: [
        { q: String.raw`How many ordered pairs of positive integers $(x, y)$ satisfy $xy = x + y + 5$?`, answer: "4",
          solution: String.raw`Rewrite as $(x - 1)(y - 1) = 6$. With $x, y \ge 1$, the factors are nonnegative, so they are a positive factor pair of $6$: $(1, 6), (2, 3), (3, 2), (6, 1)$, four solutions.` },
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $x^2 - y^2 = 45$?`, answer: "3",
          solution: String.raw`$(x - y)(x + y) = 45$ with $0 \lt x - y \lt x + y$ and both factors odd: $(1, 45)$, $(3, 15)$, $(5, 9)$, giving $(23, 22)$, $(9, 6)$, $(7, 2)$. That is $3$.` }
      ],
      problems: [
        "2021 Spring AMC 10B, Problem 5",
        "2015 AMC 10A, Problem 15",
        "2021 Spring AMC 12B, Problem 10",
        "2012 AMC 10A, Problem 22",
        "2024 AMC 10A, Problem 23",
        "2015 AMC 12A, Problem 18",
        "2003 AIME II, Problem 1",
        "1987 AIME, Problem 5",
        "2015 AIME II, Problem 8"
      ]
    }
  }
};
