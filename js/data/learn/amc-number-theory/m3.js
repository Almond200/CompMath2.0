// Learn, AMC Number Theory, chapter M3: number theory for the AMC 12 (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M3"] = {
  lessons: {
    "M3.1": {
      prereq: ["number-of-divisors", "sum-of-divisors"],
      cards: ["exponent-tracking", "multiplicative-functions", "largest-odd-divisor-sum", "sigma-parity"],
      body: String.raw`AMC 12 number theory often works one prime at a time. Tracking each prime's exponent separately turns conditions on products, gcds and lcms into conditions on small numbers, and divisor functions behave predictably across coprime factors.

[[exponent-tracking|Exponent tracking]] writes every number as a product of prime powers and treats the exponent of each prime as its own variable: the exponent of $2$ in $2^{10} \cdot 6^5$ is $15$; an lcm takes the larger exponent and a gcd the smaller; a number is a perfect $k$th power exactly when every exponent is a multiple of $k$. Conditions on several lcms become separate systems for each prime.

[[multiplicative-functions|Multiplicative functions]], such as the number of divisors $d(n)$, their sum $\sigma(n)$ and Euler's $\varphi(n)$, satisfy $f(mn) = f(m)f(n)$ for coprime $m$ and $n$, so they are computed prime power by prime power: $\sigma(12) = \sigma(4)\sigma(3) = 7 \cdot 4 = 28$.

Some sums need a different organization. The [[largest-odd-divisor-sum|largest odd divisor]] of $n$ is $n$ with all factors of $2$ removed; summing it over $1$ to $2^k$ splits into odd numbers and halves of even numbers, a recursion: for $1$ to $8$ the sum is $1 + 1 + 3 + 1 + 5 + 3 + 7 + 1 = 22$. [[sigma-parity|$\sigma(n)$ is odd]] exactly when $n$ is a square or twice a square, since odd prime powers contribute an odd factor only with even exponent; up to $50$ that is $7 + 5 = 12$ numbers.

Separate the primes, multiply over coprime parts, and recurse on halves. The next lesson treats inverses and Euler's theorem.`,
      related: [
        { card: "legendres-formula", note: String.raw`the exponent of a prime in a factorial (M1.3).` },
        { card: "gcd-lcm-product", note: String.raw`gcds and lcms through exponents (M1.1).` },
        { card: "eulers-totient", note: String.raw`the totient, another multiplicative function (M2.2).` }
      ],
      exercises: [
        { q: String.raw`Find $\sigma(12)$, the sum of the positive divisors of $12$.`, answer: "28",
          solution: String.raw`$12 = 4 \cdot 3$, so $\sigma(12) = (1 + 2 + 4)(1 + 3) = 28$.` },
        { q: String.raw`For how many $n$ from $1$ to $50$ is $\sigma(n)$ odd?`, answer: "12",
          solution: String.raw`$\sigma(n)$ is odd exactly when $n$ is a square or twice a square: the squares $1, 4, \ldots, 49$ ($7$) and $2, 8, 18, 32, 50$ ($5$), so $12$.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 7",
        "2023 AMC 10B, Problem 15",
        "2020 AMC 12A, Problem 21",
        "2023 AMC 12B, Problem 24",
        "2021 Spring AMC 12A, Problem 25",
        "1989 AIME, Problem 4",
        "1987 AIME, Problem 7"
      ]
    },
    "M3.2": {
      prereq: ["modular-basics", "bezouts-identity", "fermats-little-theorem"],
      cards: ["modular-inverse", "extended-euclidean-algorithm", "eulers-theorem", "wilsons-theorem"],
      body: String.raw`Dividing modulo $n$, raising to huge powers modulo $n$, and evaluating factorials modulo a prime are the AMC 12 extensions of modular arithmetic.

A [[modular-inverse|modular inverse]] of $a$ modulo $n$ is a number $b$ with $ab \equiv 1$; it exists exactly when $\gcd(a, n) = 1$. The [[extended-euclidean-algorithm|extended Euclidean algorithm]] finds it by running the Euclidean algorithm backward to write $1 = ax + ny$. For $7$ modulo $26$: $26 = 3 \cdot 7 + 5$, $7 = 5 + 2$, $5 = 2 \cdot 2 + 1$, and back-substituting gives $1 = 15 \cdot 7 - 4 \cdot 26$, so $7^{-1} \equiv 15$. Small inverses are faster by inspection.

[[eulers-theorem|Euler's theorem]] says $a^{\varphi(n)} \equiv 1 \pmod n$ for $a$ coprime to $n$, so exponents reduce modulo $\varphi(n)$: $3^{40} \equiv 1 \pmod{100}$ since $\varphi(100) = 40$. For moduli like $1000$, split into $8$ and $125$ and combine with the Chinese remainder theorem.

[[wilsons-theorem|Wilson's theorem]] says $(p - 1)! \equiv -1 \pmod p$ for a prime $p$, so $10! \equiv 10 \pmod{11}$; it also evaluates factorials like $(p - 2)! \equiv 1$.

Invert by the extended algorithm, reduce exponents by Euler, and use Wilson for factorials. The last lesson of the chapter treats binomial coefficients and bounded equations.`,
      related: [
        { card: "crt", note: String.raw`combining congruences (M2.3).` },
        { card: "multiplicative-order", note: String.raw`the exact period of powers (N3.4).` },
        { card: "cycle-hunting", note: String.raw`finding periods by listing (M2.2).` }
      ],
      exercises: [
        { q: String.raw`Find the inverse of $7$ modulo $26$, between $0$ and $25$.`, answer: "15",
          solution: String.raw`$7 \cdot 15 = 105 = 4 \cdot 26 + 1$, so $7^{-1} \equiv 15 \pmod{26}$.` },
        { q: String.raw`Find the remainder when $10!$ is divided by $11$.`, answer: "10",
          solution: String.raw`By Wilson's theorem $(11 - 1)! \equiv -1 \equiv 10 \pmod{11}$.` }
      ],
      problems: [
        "2025 AMC 12B, Problem 5",
        "2024 AMC 10B, Problem 18",
        "2025 AMC 10B, Problem 23",
        "2025 AMC 10B, Problem 25",
        "1996 AIME, Problem 10",
        "2011 AIME I, Problem 11"
      ]
    },
    "M3.3": {
      prereq: ["legendres-formula", "binomial-row-sums"],
      cards: ["prime-divides-binomial", "pascal-parity", "power-minus-self", "sum-of-two-squares", "bounding-diophantine", "squeeze-between-squares"],
      body: String.raw`The last AMC 12 number theory tools concern primes in binomial coefficients, which numbers are sums of two squares, and how to finish an integer equation that does not factor.

The exponent of a prime in $\binom{n}{k}$ comes from Legendre's formula, and [[prime-divides-binomial|Kummer's theorem]] makes it a count: the exponent of $p$ in $\binom{m + n}{m}$ is the number of carries when adding $m$ and $n$ in base $p$. In base $3$, $15 = 120_3$, and $120_3 + 120_3$ has two carries, so $3^2$ exactly divides $\binom{30}{15}$. [[pascal-parity|Parity in Pascal's triangle]]: $\binom nk$ is odd exactly when every binary digit of $k$ is at most the corresponding digit of $n$, so row $n$ has $2^{(\text{number of ones in } n)}$ odd entries; $10 = 1010_2$ gives $4$.

[[power-minus-self|Expressions like $n^p - n$]] are divisible by $p$ (Fermat), so $n^5 - n$ is divisible by $30$. A number is a [[sum-of-two-squares|sum of two squares]] exactly when each prime $\equiv 3 \pmod 4$ appears to an even power; $50 = 1 + 49 = 25 + 25$ has two representations with positive parts.

When an equation does not factor, [[bounding-diophantine|bound the variables]]: assume an order, show one variable is small, and check the cases. [[squeeze-between-squares|Squeezing between squares]] proves an expression is not a square: $n^2 \lt n^2 + 2n \lt (n + 1)^2$ for $n \ge 1$.

Count carries for binomial coefficients, check primes $\equiv 3 \pmod 4$, and bound or squeeze when factoring fails. This completes the AMC Number Theory book.`,
      related: [
        { card: "lucas-theorem", note: String.raw`binomial coefficients modulo a prime (N8.2).` },
        { card: "fermats-little-theorem", note: String.raw`$n^p \equiv n \pmod p$ (M2.2).` },
        { card: "pythagorean-triples", note: String.raw`hypotenuses as sums of two squares (M2.5).` }
      ],
      exercises: [
        { q: String.raw`How many of the numbers $\binom{10}{0}, \binom{10}{1}, \ldots, \binom{10}{10}$ are odd?`, answer: "4",
          solution: String.raw`$10 = 1010_2$ has two ones, so $2^2 = 4$ entries are odd: $\binom{10}{0}, \binom{10}{2}, \binom{10}{8}, \binom{10}{10}$.` },
        { q: String.raw`What is the largest $e$ such that $3^e$ divides $\binom{30}{15}$?`, answer: "2",
          solution: String.raw`By Kummer, count the carries in $15 + 15$ in base $3$: $120_3 + 120_3$ carries from the middle and left columns, two carries, so $e = 2$.` }
      ],
      problems: [
        "2024 AMC 10A, Problem 4",
        "2024 AMC 10B, Problem 6",
        "2012 AMC 10B, Problem 12",
        "2016 AMC 10A, Problem 14",
        "2015 AMC 10B, Problem 25",
        "2000 AIME I, Problem 1",
        "2002 AIME I, Problem 8"
      ]
    }
  }
};
