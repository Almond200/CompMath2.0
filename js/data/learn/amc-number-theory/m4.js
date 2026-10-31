// Learn, AMC Number Theory, chapter M4: remainders (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M4"] = {
  lessons: {
    "M4.1": {
      prereq: ["divisibility-rules"],
      cards: [],
      body: String.raw`This chapter works with remainders. Its tools are the rules of modular arithmetic, the cycles that powers fall into, the short lists of squares modulo small numbers, Fermat's little theorem with Euler's totient, and the trick for deciding when one expression divides another.

Two numbers are congruent modulo $n$ when they leave the same remainder on division by $n$: $2026 = 7 \cdot 289 + 3$, so $2026 \equiv 3 \pmod 7$. Remainders can be added and multiplied, and reduced at any step, so a large computation shrinks to a small one.

The powers of a number repeat their remainders. The last digits of the powers of $3$ run $3, 9, 7, 1$ and repeat every $4$, so $3^{2026}$ ends like $3^2$, in $9$. Fermat's little theorem gives the length of such cycles for a prime modulus.

Squares leave only a few remainders modulo small numbers: modulo $4$, every square is $0$ or $1$, so $99^2$ leaves remainder $1$. Lists like this show at once that some equations have no solutions.

The lessons take these ideas in turn: working with remainders (M4.2), cycles and last digits (M4.3), squares and choosing a modulus (M4.4), Fermat's little theorem and Euler's totient (M4.5), and when one expression divides another (M4.6). The Summary (M4.7) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the remainder when $2026$ is divided by $7$.`, answer: "3",
          solution: String.raw`$7 \cdot 289 = 2023$, so $2026 = 2023 + 3$ leaves remainder $3$.` },
        { q: String.raw`What is the last digit of $3^{2026}$?`, answer: "9",
          solution: String.raw`The last digits of the powers of $3$ cycle $3, 9, 7, 1$ with period $4$. Since $2026 = 4 \cdot 506 + 2$, the last digit is the second in the cycle, $9$.` },
        { q: String.raw`Find the remainder when $99^2$ is divided by $4$.`, answer: "1",
          solution: String.raw`$99 \equiv -1 \pmod 4$, so $99^2 \equiv 1$. In general every odd square leaves remainder $1$ on division by $4$.` }
      ],
      problems: [
        "1996 AJHSME, Problem 15",
        "1990 AJHSME, Problem 4",
        "2003 AMC 10A, Problem 16"
      ]
    },
    "M4.2": {
      prereq: ["divisibility-rules", "euclidean-algorithm"],
      cards: ["modular-basics", "euclids-lemma", "subtract-equal-remainders"],
      body: String.raw`What is the remainder of $17 \cdot 23 + 45$ on division by $8$? If $50$, $86$ and $158$ leave the same remainder on division by $n$, how large can $n$ be? What times $3$ leaves remainder $1$ on division by $7$? Remainders follow arithmetic rules of their own, and they make such questions short.

[[modular-basics|Modular arithmetic]]: $a \equiv b \pmod n$ means $n$ divides $a - b$. Congruences can be added, subtracted and multiplied, so each number can be replaced by its remainder at any step: $17 \equiv 1$ and $23 \equiv 7 \pmod 8$, so $17 \cdot 23 + 45 \equiv 7 + 5 = 12 \equiv 4$. Negative remainders help: $32 \equiv -1 \pmod{11}$, so $2^{10} = 32^2 \equiv 1$. An inverse of $a$ modulo $n$ is a number $b$ with $ab \equiv 1$; for small moduli it is found by inspection, as $3 \cdot 5 = 15 \equiv 1 \pmod 7$.

Division is the exception. [[euclids-lemma|Euclid's lemma]] says that if a prime divides a product, it divides one of the factors; so a congruence may be divided by a number coprime to the modulus, but not by one sharing a factor with it: $2 \cdot 3 \equiv 2 \cdot 8 \pmod{10}$, yet $3 \not\equiv 8$.

[[subtract-equal-remainders|Numbers with equal remainders]] have differences divisible by the modulus: if $50$, $86$ and $158$ leave equal remainders on division by $n$, then $n$ divides $36$ and $72$, so $n$ divides $\gcd(36, 72) = 36$, and the largest possible $n$ is $36$.

Replace numbers by remainders early, use negative remainders to shorten powers, divide only by numbers coprime to the modulus, and subtract to turn equal remainders into divisibility. The next lesson finds the cycles of powers.`,
      related: [
        { card: "modular-inverse", note: String.raw`inverses in general, found by the Euclidean algorithm (M6.3).` },
        { card: "crt", note: String.raw`conditions on several moduli joined into one (M5.2).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $17 \cdot 23 + 45$ is divided by $8$.`, answer: "4",
          solution: String.raw`Reduce first: $17 \equiv 1$, $23 \equiv 7$, $45 \equiv 5 \pmod 8$. Then $1 \cdot 7 + 5 = 12 \equiv 4$.` },
        { q: String.raw`The numbers $50$, $86$ and $158$ leave the same remainder on division by $n \gt 1$. What is the largest possible $n$?`, answer: "36",
          solution: String.raw`$n$ divides the differences $36$ and $72$, so it divides $\gcd(36, 72) = 36$. And $n = 36$ works: all three leave remainder $14$.` },
        { q: String.raw`Find the remainder when $2^{10}$ is divided by $11$.`, answer: "1",
          solution: String.raw`$2^5 = 32 \equiv -1 \pmod{11}$, so $2^{10} \equiv (-1)^2 = 1$.` }
      ],
      problems: [
        "2024 AMC 10B, Problem 7",
        "2023 AMC 10B, Problem 11",
        "2002 AMC 10B, Problem 15",
        "2003 AMC 10B, Problem 18",
        "2023 AMC 10B, Problem 18"
      ]
    },
    "M4.3": {
      prereq: ["modular-basics"],
      cards: ["cycle-hunting", "last-digit-patterns"],
      body: String.raw`What is the last digit of $7^{2026}$? The last two digits of $3^{20}$? The remainder of $2^{100}$ on division by $7$? A huge exponent and a small modulus mean the powers must repeat, and finding the cycle answers the question.

[[cycle-hunting|Finding the period]]: there are only finitely many remainders, so the powers $a, a^2, a^3, \ldots$ modulo $n$ eventually repeat, and from then on they cycle. List them until they repeat: $2, 4, 1$ modulo $7$, so the powers of $2$ have period $3$, and $2^{100} = 2^{99} \cdot 2 \equiv 2$. Reduce the exponent modulo the period. When the base shares a factor with the modulus, the powers may take a few steps before they start cycling, so start counting from where the cycle begins.

[[last-digit-patterns|Last digits]] are remainders modulo $10$, and they cycle with period $1$, $2$ or $4$: the powers of $7$ end in $7, 9, 3, 1$, so $7^{2026}$ ends like $7^2$, in $9$. For the last two digits, work modulo $100$: $3^{10} = 59049 \equiv 49$, so $3^{20} \equiv 49^2 = 2401 \equiv 1$. Sums of factorials have a fixed last digit once the factorials end in $0$.

List the powers until they repeat, reduce the exponent modulo the period, and keep only as many final digits as the question needs. The next lesson uses squares and a well-chosen modulus.`,
      related: [
        { card: "fermats-little-theorem", note: String.raw`a period that divides $p - 1$ for a prime modulus (M4.5).` },
        { card: "periodic-sequences", note: String.raw`sequences that repeat, the same idea for any recursion.` }
      ],
      exercises: [
        { q: String.raw`What is the last digit of $7^{2026}$?`, answer: "9",
          solution: String.raw`The last digits of the powers of $7$ cycle $7, 9, 3, 1$. Since $2026 \equiv 2 \pmod 4$, the last digit is $9$.` },
        { q: String.raw`What are the last two digits of $3^{20}$? (Give the number from $0$ to $99$.)`, answer: "1",
          solution: String.raw`$3^{10} = 59049 \equiv 49 \pmod{100}$, so $3^{20} \equiv 49^2 = 2401 \equiv 1$. The last two digits are $01$.` },
        { q: String.raw`Find the remainder when $2^{100}$ is divided by $7$.`, answer: "2",
          solution: String.raw`$2^3 = 8 \equiv 1 \pmod 7$, so the period is $3$, and $2^{100} = (2^3)^{33} \cdot 2 \equiv 2$.` }
      ],
      problems: [
        "2023 AMC 10B, Problem 8",
        "2006 AMC 10B, Problem 11",
        "2015 AMC 10B, Problem 10",
        "2008 AMC 12A, Problem 15",
        "2023 AMC 10B, Problem 6"
      ]
    },
    "M4.4": {
      prereq: ["modular-basics"],
      cards: ["squares-mod-small", "choose-modulus", "primes-6k"],
      body: String.raw`Can $x^2 + y^2$ equal $2027$? For which primes $p$ is $p^2 + 2$ also prime? What remainder does the square of a prime larger than $3$ leave on division by $24$? Each question is settled by looking at the right remainder.

[[squares-mod-small|Squares modulo small numbers]] take few values: modulo $3$ only $0$ and $1$; modulo $4$ only $0$ and $1$; modulo $8$ only $0$, $1$ and $4$, and every odd square is $1$ modulo $8$; modulo $5$ only $0$, $1$, $4$. So a sum of two squares is never $3$ modulo $4$, and $x^2 + y^2 = 2027$ is impossible, since $2027 \equiv 3$.

[[choose-modulus|Choosing the modulus]] is the skill: pick the one that makes the expression take few values and the target impossible. For $p^2 + 2$, look modulo $3$: a prime other than $3$ has $p^2 \equiv 1$, so $p^2 + 2 \equiv 0$, a multiple of $3$ larger than $3$; only $p = 3$, giving $11$, works. Cubes are checked modulo $7$ or $9$, fourth powers modulo $16$.

[[primes-6k|Every prime larger than $3$]] is $6k \pm 1$, since other numbers are multiples of $2$ or $3$. So its square is $36k^2 \pm 12k + 1$, and in fact $p^2 \equiv 1 \pmod{24}$ for every prime $p \gt 3$, because $p^2 - 1 = (p - 1)(p + 1)$ is a product of consecutive even numbers, one a multiple of $4$, with one of them a multiple of $3$.

When an equation seems to have no solutions, or a prime condition must be tested, reduce modulo $3$, $4$, $8$ or $9$. The next lesson turns to Fermat's little theorem.`,
      related: [
        { card: "sum-of-two-squares", note: String.raw`which numbers are sums of two squares.` },
        { card: "only-even-prime", note: String.raw`parity, the simplest choice of modulus (M1.2).` }
      ],
      exercises: [
        { q: String.raw`Show that $x^2 + y^2 = 2027$ has no integer solutions.`,
          solution: String.raw`Squares are $0$ or $1$ modulo $4$, so $x^2 + y^2$ is $0$, $1$ or $2$ modulo $4$. But $2027 = 4 \cdot 506 + 3$ is $3$ modulo $4$.` },
        { q: String.raw`For how many primes $p$ is $p^2 + 2$ also prime?`, answer: "1",
          solution: String.raw`Modulo $3$, any prime other than $3$ has $p^2 \equiv 1$, so $p^2 + 2$ is a multiple of $3$ larger than $3$. For $p = 3$, $p^2 + 2 = 11$ is prime. So only $p = 3$ works.` },
        { q: String.raw`Find the remainder when the square of any prime greater than $3$ is divided by $24$.`, answer: "1",
          solution: String.raw`$p^2 - 1 = (p - 1)(p + 1)$ is a product of two consecutive even numbers, one a multiple of $4$, so it is a multiple of $8$; one of $p - 1$, $p$, $p + 1$ is a multiple of $3$, and it is not $p$. So $24 \mid p^2 - 1$ and the remainder is $1$.` }
      ],
      problems: [
        "2018 AMC 10B, Problem 11",
        "1994 AIME, Problem 1",
        "2024 AMC 10B, Problem 24"
      ]
    },
    "M4.5": {
      prereq: ["cycle-hunting", "fundamental-theorem-arithmetic"],
      cards: ["fermats-little-theorem", "eulers-totient"],
      body: String.raw`What is $2^{100}$ modulo $101$? What is $3^{31}$ modulo $31$? How many numbers up to $36$ share no factor with $36$? Listing cycles works for small moduli, but for a prime modulus there is a theorem that gives the answer at once.

[[fermats-little-theorem|Fermat's little theorem]] says that if $p$ is prime and $p$ does not divide $a$, then $a^{p-1} \equiv 1 \pmod p$; and for every $a$, $a^p \equiv a$. So $2^{100} \equiv 1 \pmod{101}$, and $3^{31} \equiv 3 \pmod{31}$. To reduce a huge exponent modulo a prime $p$, reduce the exponent modulo $p - 1$. The cycle of powers modulo $p$ has a length dividing $p - 1$.

[[eulers-totient|Euler's totient]] $\varphi(n)$ counts the numbers from $1$ to $n$ that share no factor with $n$. From the factorization, $\varphi(n) = n\left(1 - \tfrac{1}{p_1}\right)\left(1 - \tfrac{1}{p_2}\right)\cdots$: $\varphi(36) = 36 \cdot \tfrac12 \cdot \tfrac23 = 12$, and $\varphi(100) = 40$. Euler's extension of Fermat's theorem says $a^{\varphi(n)} \equiv 1 \pmod n$ when $a$ and $n$ are coprime, so $7^{40} \equiv 1 \pmod{100}$, and last two digits of high powers follow.

For a prime modulus, reduce the exponent modulo $p - 1$; for a composite one coprime to the base, modulo $\varphi(n)$. The next lesson decides when one expression divides another.`,
      related: [
        { card: "eulers-theorem", note: String.raw`$a^{\varphi(n)} \equiv 1$ in general (M6.3).` },
        { card: "multiplicative-order", note: String.raw`the exact length of a cycle, a divisor of $p - 1$ (M6.4).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $2^{100}$ is divided by $101$.`, answer: "1",
          solution: String.raw`$101$ is prime and does not divide $2$, so by Fermat $2^{100} \equiv 1 \pmod{101}$.` },
        { q: String.raw`Find the remainder when $3^{31}$ is divided by $31$.`, answer: "3",
          solution: String.raw`By Fermat, $a^p \equiv a \pmod p$, so $3^{31} \equiv 3$.` },
        { q: String.raw`Compute $\varphi(36)$.`, answer: "12",
          solution: String.raw`$36 = 2^2 \cdot 3^2$, so $\varphi(36) = 36 \cdot \tfrac12 \cdot \tfrac23 = 12$.` }
      ],
      problems: [
        "2017 AMC 10B, Problem 14",
        "1992 AIME, Problem 1",
        "1983 AIME, Problem 6"
      ]
    },
    "M4.6": {
      prereq: ["modular-basics", "polynomial-division"],
      cards: ["reduce-divisibility-constant", "poly-divisible-linear"],
      body: String.raw`For which positive integers $n$ does $n + 2$ divide $n^2 + 5$? When is $\tfrac{n}{30 - n}$ an integer? These ask when one expression divides another, and the trick is to reduce the larger expression to a constant.

[[reduce-divisibility-constant|Reducing a divisibility to a constant]]: if $d$ divides $A$ and $B$, it divides $A - kB$ for any $k$. Divide $n^2 + 5$ by $n + 2$: $n^2 + 5 = (n + 2)(n - 2) + 9$, so $n + 2$ divides $n^2 + 5$ exactly when it divides $9$. With $n$ positive, $n + 2$ is $3$ or $9$, so $n = 1$ or $n = 7$. For a fraction like $\tfrac{n}{30 - n} = \tfrac{30}{30 - n} - 1$, it is an integer exactly when $30 - n$ divides $30$.

[[poly-divisible-linear|A polynomial divided by a linear expression]]: $n - a$ divides $P(n) - P(a)$, so $n - a$ divides $P(n)$ exactly when it divides the constant $P(a)$. For $n - 1$ and $n^3 + 4$, the constant is $1 + 4 = 5$, so $n - 1$ is $1$ or $5$, and $n = 2$ or $6$.

Divide, find the constant remainder, and list its divisors. The Summary (M4.7) collects the chapter's strategies.`,
      related: [
        { card: "factor-remainder-theorem", note: String.raw`the remainder of $P(n)$ on division by $n - a$ is $P(a)$.` },
        { card: "gcd-substitution", note: String.raw`subtracting multiples to simplify a gcd (M3.5).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the positive integers $n$ for which $n + 2$ divides $n^2 + 5$.`, answer: "8",
          solution: String.raw`$n^2 + 5 = (n + 2)(n - 2) + 9$, so $n + 2$ must divide $9$; with $n + 2 \ge 3$, $n + 2 = 3$ or $9$, so $n = 1$ or $7$. The sum is $8$.` },
        { q: String.raw`For how many positive integers $n \ge 2$ does $n - 1$ divide $n^3 + 4$?`, answer: "2",
          solution: String.raw`$n - 1$ divides $n^3 - 1$, so it divides $n^3 + 4$ exactly when it divides $5$. With $n - 1 \ge 1$: $n - 1 = 1$ or $5$, so $n = 2$ or $6$.` }
      ],
      problems: [
        "2014 AMC 12B, Problem 7"
      ]
    },
    "M4.7": {
      prereq: ["modular-basics", "euclids-lemma", "subtract-equal-remainders", "cycle-hunting", "last-digit-patterns", "squares-mod-small", "choose-modulus", "primes-6k", "fermats-little-theorem", "eulers-totient", "reduce-divisibility-constant"],
      cards: [],
      body: String.raw`[[modular-basics|Congruences]] are added and multiplied, and reduced at any step; [[euclids-lemma|division]] is allowed only by numbers coprime to the modulus, and [[subtract-equal-remainders|equal remainders]] mean the modulus divides the differences.

[[cycle-hunting|Powers repeat]], so a huge exponent is reduced modulo the period, and [[last-digit-patterns|last digits]] cycle with period $1$, $2$ or $4$.

[[squares-mod-small|Squares take few values]] modulo $3$, $4$, $8$, and [[choose-modulus|a well-chosen modulus]] rules out equations or tests prime conditions; [[primes-6k|primes beyond $3$]] are $6k \pm 1$.

[[fermats-little-theorem|Fermat's little theorem]] reduces exponents modulo $p - 1$, and [[eulers-totient|Euler's totient]] gives the period bound for composite moduli. [[reduce-divisibility-constant|One expression divides another]] exactly when it divides the constant left after division.`,
      strategies: [
        String.raw`Reduce every number modulo $n$ as early as possible, and use negative remainders.`,
        String.raw`For a huge power and a small modulus, list powers until they repeat and reduce the exponent.`,
        String.raw`For a prime modulus, reduce the exponent modulo $p - 1$.`,
        String.raw`To rule out an equation, look modulo $3$, $4$, $8$ or $9$.`,
        String.raw`To test whether $f(p)$ can be prime, look modulo a small prime.`,
        String.raw`When numbers leave equal remainders, take their differences.`,
        String.raw`For "$A(n)$ divides $B(n)$", divide and reduce to a constant.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the remainder when $1234567$ is divided by $9$.`, answer: "1",
        solution: String.raw`The digit sum is $28$, and $28 = 27 + 1$, so the remainder is $1$.` },
      { q: String.raw`What is the last digit of $2^{2026} + 3^{2026}$?`, answer: "3",
        solution: String.raw`Since $2026 \equiv 2 \pmod 4$, $2^{2026}$ ends like $2^2 = 4$ and $3^{2026}$ like $3^2 = 9$. The sum ends in $3$.` },
      { q: String.raw`Find the remainder when $5^{30}$ is divided by $7$.`, answer: "1",
        solution: String.raw`By Fermat, $5^6 \equiv 1 \pmod 7$, and $30$ is a multiple of $6$, so $5^{30} \equiv 1$.` },
      { q: String.raw`Find the remainder when $2^{2026}$ is divided by $9$.`, answer: "7",
        solution: String.raw`The powers of $2$ modulo $9$ run $2, 4, 8, 7, 5, 1$, period $6$. Since $2026 \equiv 4 \pmod 6$, $2^{2026} \equiv 2^4 = 16 \equiv 7$.` },
      { q: String.raw`How many integers $n$ from $1$ to $100$ leave remainder $2$ on division by $3$ and remainder $3$ on division by $4$?`, answer: "8",
        solution: String.raw`Both conditions say $n + 1$ is a multiple of $3$ and of $4$, so $n \equiv 11 \pmod{12}$: $11, 23, \ldots, 95$, eight numbers.` }
    ],
    problems: [
      "1994 AJHSME, Problem 6",
      "2024 AMC 10A, Problem 3"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 12B, Problem 16",
      "2023 AMC 12A, Problem 24",
      "1988 AIME, Problem 2",
      "1989 AIME, Problem 3"
    ]
  }
};
