// Learn, AMC Number Theory, chapter M6: number theory for the AMC 12 (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (nineteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M6"] = {
  lessons: {
    "M6.1": {
      prereq: ["fundamental-theorem-arithmetic", "modular-basics", "fermats-little-theorem"],
      cards: [],
      body: String.raw`This chapter collects the number theory that appears in the later AMC 12 problems. None of it is new in spirit: it is the factorization of M1 and the remainders of M4, pushed one step further.

The first idea is to work one prime at a time. A gcd takes the smaller exponent of each prime, an lcm the larger, and a product adds them, so a condition on gcds and lcms splits into separate conditions on exponents. The number of factors of $2$ in a sum is at least the smaller of the two counts, and it can be larger when the counts are equal: $1000 = 2^3 \cdot 125$ and $24 = 2^3 \cdot 3$ each have three factors of $2$, but their sum $1024 = 2^{10}$ has ten.

The second idea is division in modular arithmetic. Modulo $7$, the number $3$ has an inverse, $5$, since $3 \cdot 5 = 15 \equiv 1$, so dividing by $3$ means multiplying by $5$. Euler's theorem extends Fermat's little theorem to any modulus, and Wilson's theorem gives the remainder of $(p - 1)!$ modulo a prime.

The third idea is the order of a number: the first power that is $1$. Modulo $7$, the powers of $2$ are $2, 4, 1, 2, 4, 1, \ldots$, so $2$ has order $3$, and $2^{100} \equiv 2^{1} = 2$, since $100$ leaves remainder $1$ on division by $3$. The last lesson solves the equation $x^2 - 2y^2 = 1$ and its relatives.

The lessons take these ideas in turn: prime exponents and multiplicative functions (M6.2), inverses and the theorems of Euler and Wilson (M6.3), the order of a number (M6.4), and Pell equations (M6.5). The Summary (M6.6) collects the strategies.`,
      exercises: [
        { q: String.raw`What is the largest integer $k$ such that $2^k$ divides $1000 + 24$?`, answer: "10",
          solution: String.raw`$1000 + 24 = 1024 = 2^{10}$, so $k = 10$, although each of $1000$ and $24$ has only three factors of $2$. When the two counts are equal, the sum can carry more.` },
        { q: String.raw`Find the integer $x$ with $0 \le x \lt 7$ and $3x \equiv 1 \pmod 7$.`, answer: "5",
          solution: String.raw`Try the multiples of $3$: $3, 6, 9 \equiv 2, 12 \equiv 5, 15 \equiv 1$. So $x = 5$, the inverse of $3$ modulo $7$.` },
        { q: String.raw`What is the remainder when $2^{100}$ is divided by $7$?`, answer: "2",
          solution: String.raw`The powers of $2$ modulo $7$ are $2, 4, 1$ and then repeat, so they depend only on the exponent modulo $3$. Since $100 = 3 \cdot 33 + 1$, $2^{100} \equiv 2^1 = 2$.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 7",
        "2018 AMC 10B, Problem 16",
        "2025 AMC 12B, Problem 5"
      ]
    },
    "M6.2": {
      prereq: ["fundamental-theorem-arithmetic", "gcd-lcm-product", "number-of-divisors", "sum-of-divisors", "eulers-totient", "legendres-formula"],
      cards: ["exponent-tracking", "p-adic-valuation", "power-minus-self", "multiplicative-functions"],
      body: String.raw`Many problems state conditions on gcds, lcms and products and ask how many numbers satisfy them. How many positive integers $n$ have $\operatorname{lcm}(n, 24) = 72$? Written as a single number, the condition is hard to see through; written prime by prime, it falls apart into easy pieces.

[[exponent-tracking|Tracking prime exponents]] means writing every number as a product of prime powers and translating each condition into a condition on exponents. A gcd takes the smaller exponent of each prime, an lcm the larger, a product adds them, and a divisor has every exponent at most that of the number. With $n = 2^a 3^b$ (no other prime can divide $n$, since none divides $72$), $24 = 2^3 \cdot 3$ and $72 = 2^3 \cdot 3^2$, the condition reads $\max(a, 3) = 3$ and $\max(b, 1) = 2$. So $a$ is any of $0, 1, 2, 3$, and $b = 2$, which gives $4$ numbers: $9$, $18$, $36$ and $72$. The primes never interact, so each one is a separate small problem, and the counts multiply.

The exponent of a prime $p$ in $n$ is written $v_p(n)$, [[p-adic-valuation|the $p$-adic valuation]]. It adds over products, $v_p(mn) = v_p(m) + v_p(n)$, and for sums it obeys $v_p(m + n) \ge \min(v_p(m), v_p(n))$, with equality whenever the two valuations differ. When they are equal the sum can carry more factors: $48 = 2^4 \cdot 3$ and $80 = 2^4 \cdot 5$, but $48 + 80 = 128 = 2^7$, since after taking out $2^4$ the two odd parts $3$ and $5$ add to an even number. The case of equal valuations is always the one to check by hand.

Some products of consecutive integers give divisibility for free. [[power-minus-self|The difference $n^k - n$]] is divisible by a fixed number for every integer $n$: $n^3 - n = (n - 1)n(n + 1)$ is a product of three consecutive integers, so $6$ divides it, and in the same way $30 \mid n^5 - n$ and $42 \mid n^7 - n$. So a sum of cubes has the same remainder modulo $6$ as the sum of the numbers themselves: $1^3 + 2^3 + \cdots + 10^3 = 3025$ and $1 + 2 + \cdots + 10 = 55$ both leave remainder $1$.

Finally, the divisor functions split over coprime factors. [[multiplicative-functions|A multiplicative function]] satisfies $f(mn) = f(m) f(n)$ whenever $\gcd(m, n) = 1$, and the number of divisors, the sum of divisors and Euler's totient are all multiplicative. So $\sigma(72) = \sigma(8)\,\sigma(9) = 15 \cdot 13 = 195$ and $\varphi(36) = \varphi(4)\,\varphi(9) = 2 \cdot 6 = 12$, each computed from one prime power at a time.

Translate gcd and lcm conditions into exponents, prime by prime; check the equal-valuation case of a sum by hand; and split a divisor function over coprime factors. The next lesson divides in modular arithmetic.`,
      related: [
        { card: "lte", note: String.raw`the exponent of $p$ in $a^n - b^n$, for when a valuation of a difference of powers is needed.` },
        { card: "legendres-formula", note: String.raw`the valuation of a factorial (M3.4).` }
      ],
      exercises: [
        { q: String.raw`How many positive integers $n$ satisfy $\operatorname{lcm}(n, 30) = 180$?`, answer: "2",
          solution: String.raw`Write $n = 2^a 3^b 5^c$, with $30 = 2 \cdot 3 \cdot 5$ and $180 = 2^2 \cdot 3^2 \cdot 5$. The conditions are $\max(a, 1) = 2$, $\max(b, 1) = 2$ and $\max(c, 1) = 1$, so $a = 2$, $b = 2$ and $c$ is $0$ or $1$. The two numbers are $36$ and $180$.` },
        { q: String.raw`What is the largest integer $k$ such that $2^k$ divides $48 + 80$?`, answer: "7",
          solution: String.raw`Both numbers have $v_2 = 4$, so take out $2^4$: $48 + 80 = 2^4(3 + 5) = 2^4 \cdot 8 = 2^7$. So $k = 7$, more than the four factors each term has.` },
        { q: String.raw`What is the remainder when $1^5 + 2^5 + \cdots + 20^5$ is divided by $30$?`, answer: "0",
          solution: String.raw`Since $30 \mid n^5 - n$ for every integer $n$, the sum has the same remainder as $1 + 2 + \cdots + 20 = 210 = 30 \cdot 7$. The remainder is $0$.` },
        { q: String.raw`What is the sum of the positive divisors of $72$?`, answer: "195",
          solution: String.raw`$72 = 2^3 \cdot 3^2$ with coprime factors, so $\sigma(72) = \sigma(8)\,\sigma(9) = (1 + 2 + 4 + 8)(1 + 3 + 9) = 15 \cdot 13 = 195$.` }
      ],
      problems: [
        "2009 AMC 10A, Problem 25",
        "2020 AMC 12A, Problem 21",
        "2023 AMC 12B, Problem 24"
      ]
    },
    "M6.3": {
      prereq: ["modular-basics", "fermats-little-theorem", "eulers-totient", "bezouts-identity"],
      cards: ["modular-inverse", "eulers-theorem", "wilsons-theorem"],
      body: String.raw`Modular arithmetic adds, subtracts and multiplies freely, but division needs care. How is $7x \equiv 3 \pmod{10}$ solved? What are the last two digits of $3^{42}$? What is $15!$ modulo $17$?

[[modular-inverse|An inverse of $a$ modulo $n$]] is a number $b$ with $ab \equiv 1 \pmod n$, and it exists exactly when $\gcd(a, n) = 1$: by [[bezouts-identity|Bézout's identity]] that is when $ax + ny = 1$ has a solution. Dividing by $a$ then means multiplying by $b$. Modulo $10$, the inverse of $7$ is $3$, since $21 \equiv 1$, so $7x \equiv 3$ gives $x \equiv 3 \cdot 3 = 9$, and indeed $63 \equiv 3$. For a small modulus the inverse is found by trying multiples; for a larger one, by the Euclidean algorithm. When $\gcd(a, n) = d \gt 1$, the congruence $ax \equiv c$ has a solution only if $d \mid c$, and then it is divided through by $d$ first.

[[eulers-theorem|Euler's theorem]] extends Fermat's little theorem to any modulus: if $\gcd(a, n) = 1$, then $a^{\varphi(n)} \equiv 1 \pmod n$. So exponents can be reduced modulo $\varphi(n)$. With $\varphi(100) = 40$, $3^{42} = 3^{40} \cdot 3^2 \equiv 9 \pmod{100}$, and the last two digits of $3^{42}$ are $09$. The theorem needs $a$ coprime to $n$; a power of a number that shares a factor with $n$ is handled separately, often by splitting the modulus.

[[wilsons-theorem|Wilson's theorem]] says that $(p - 1)! \equiv -1 \pmod p$ for every prime $p$: every factor except $1$ and $p - 1$ pairs with its inverse. So $10! \equiv -1 \equiv 10 \pmod{11}$. A factorial a few terms short of $p - 1$ is found by dividing off the missing factors, each congruent to a small negative number: $16! = 16 \cdot 15!$ with $16 \equiv -1 \pmod{17}$, so $15! \equiv 1 \pmod{17}$.

Check that an inverse exists before dividing, reduce exponents modulo $\varphi(n)$, and write the large factors of a factorial as negatives. The next lesson asks for the first power that is $1$.`,
      related: [
        { card: "extended-euclidean-algorithm", note: String.raw`finding an inverse modulo a large number.` },
        { card: "crt", note: String.raw`splitting a modulus such as $100 = 4 \cdot 25$ into coprime parts (M5.2).` },
        { card: "carmichael-function", note: String.raw`the smallest exponent that works for every $a$ coprime to $n$, often smaller than $\varphi(n)$.` }
      ],
      exercises: [
        { q: String.raw`What is the smallest positive integer $x$ with $7x \equiv 3 \pmod{10}$?`, answer: "9",
          solution: String.raw`The inverse of $7$ modulo $10$ is $3$, since $7 \cdot 3 = 21 \equiv 1$. Multiplying by $3$ gives $x \equiv 9$, and $7 \cdot 9 = 63 \equiv 3$.` },
        { q: String.raw`What number is formed by the last two digits of $3^{42}$?`, answer: "9",
          solution: String.raw`$\gcd(3, 100) = 1$ and $\varphi(100) = 100 \cdot \tfrac12 \cdot \tfrac45 = 40$, so $3^{40} \equiv 1$ and $3^{42} \equiv 3^2 = 9 \pmod{100}$. The last two digits are $09$, the number $9$.` },
        { q: String.raw`What is the remainder when $15!$ is divided by $17$?`, answer: "1",
          solution: String.raw`By Wilson's theorem $16! \equiv -1 \pmod{17}$, and $16! = 16 \cdot 15!$ with $16 \equiv -1$. So $-15! \equiv -1$, and $15! \equiv 1$.` },
        { q: String.raw`What is the remainder when $2 \cdot 26!$ is divided by $29$?`, answer: "28",
          solution: String.raw`By Wilson's theorem $28! \equiv -1 \pmod{29}$, and $28! = 28 \cdot 27 \cdot 26!$ with $28 \equiv -1$ and $27 \equiv -2$. So $28! \equiv (-1)(-2) \cdot 26! = 2 \cdot 26!$, and $2 \cdot 26! \equiv -1 \equiv 28$.` }
      ],
      problems: [
        "2024 AMC 10B, Problem 18",
        "2025 AMC 10B, Problem 23"
      ]
    },
    "M6.4": {
      prereq: ["eulers-theorem", "cycle-hunting", "repeating-decimals"],
      cards: ["multiplicative-order"],
      body: String.raw`Powers modulo $n$ repeat, and the length of the cycle answers many questions at once. For how many $k$ from $1$ to $100$ is $2^k - 1$ a multiple of $31$? How long is the repeating block of $\tfrac{1}{41}$?

[[multiplicative-order|The order of $a$ modulo $n$]], for $a$ coprime to $n$, is the smallest positive $k$ with $a^k \equiv 1 \pmod n$. Its key property is that $a^k \equiv 1$ exactly when the order divides $k$: if the order is $d$, the powers of $a$ run through a cycle of length $d$ and return to $1$ only at multiples of $d$. Since $2^5 = 32 \equiv 1 \pmod{31}$ and no smaller power works, $2$ has order $5$, and $31 \mid 2^k - 1$ exactly when $5 \mid k$: twenty values of $k$ from $1$ to $100$.

By [[eulers-theorem|Euler's theorem]] the order always divides $\varphi(n)$, which narrows the search to the divisors of $\varphi(n)$. Modulo $7$, $\varphi(7) = 6$, so the order of any number is $1$, $2$, $3$ or $6$: the powers of $3$ are $3, 2, 6, 4, 5, 1$, so its order is $6$, while $2$ has order $3$.

The order of $10$ is the period of a repeating decimal: for $n$ coprime to $10$, the repeating block of $\tfrac1n$ has length equal to the order of $10$ modulo $n$, because $\tfrac1n$ repeats with period $k$ exactly when $n \mid 10^k - 1$ (the repeating decimals of M2.5). Since $99999 = 9 \cdot 41 \cdot 271$ and $41$ divides no shorter $99\ldots9$, the block of $\tfrac{1}{41}$ has length $5$; and $\tfrac{1}{13}$ has period $6$, since $13 \mid 999999$ and divides no smaller one.

Find the order among the divisors of $\varphi(n)$, and turn "$a^k \equiv 1$" into "the order divides $k$". The next lesson solves the equation $x^2 - Dy^2 = 1$.`,
      related: [
        { card: "carmichael-function", note: String.raw`the largest order of any number modulo $n$.` },
        { card: "last-digit-patterns", note: String.raw`the cycles of last digits, the order modulo $10$ in disguise (M4.3).` }
      ],
      exercises: [
        { q: String.raw`What is the order of $3$ modulo $7$?`, answer: "6",
          solution: String.raw`The powers of $3$ modulo $7$ are $3, 9 \equiv 2, 6, 18 \equiv 4, 12 \equiv 5, 15 \equiv 1$. The first $1$ comes at the sixth power, so the order is $6$.` },
        { q: String.raw`For how many integers $k$ with $1 \le k \le 100$ is $2^k - 1$ divisible by $31$?`, answer: "20",
          solution: String.raw`$2^5 = 32 \equiv 1 \pmod{31}$, and $2, 4, 8, 16$ are not $1$, so $2$ has order $5$. Then $31 \mid 2^k - 1$ exactly when $5 \mid k$, for $20$ values.` },
        { q: String.raw`How many digits are in the repeating block of the decimal for $\tfrac{1}{41}$?`, answer: "5",
          solution: String.raw`The period is the order of $10$ modulo $41$, which divides $\varphi(41) = 40$. The numbers $9$, $99$, $999$ and $9999$ are not multiples of $41$, but $99999 = 41 \cdot 2439$ is, so the order is $5$: $\tfrac1{41} = 0.\overline{02439}$.` }
      ],
      problems: [
        "2018 AMC 10B, Problem 13",
        "2016 AMC 12B, Problem 22"
      ]
    },
    "M6.5": {
      prereq: ["difference-of-squares-rep"],
      cards: ["pell-equation"],
      body: String.raw`Some questions about squares lead to an equation that looks impossible to list by hand. Which triangular numbers are squares? For which $y$ is $2y^2 + 1$ a square? Both reduce to one equation, and it has infinitely many solutions that grow in a regular way.

[[pell-equation|A Pell equation]] is $x^2 - Dy^2 = 1$, with $D$ a positive integer that is not a square. Its smallest positive solution, found by trying $y = 1, 2, 3, \ldots$, generates all the others: if $(x_1, y_1)$ is the smallest, the solutions are given by $x_n + y_n\sqrt D = (x_1 + y_1\sqrt D)^n$. For $D = 2$ the smallest solution is $(3, 2)$, and squaring $3 + 2\sqrt2$ gives $17 + 12\sqrt2$, then $99 + 70\sqrt2$ and $577 + 408\sqrt2$. Multiplying out once gives a recursion: $x_{n+1} = 3x_n + 4y_n$ and $y_{n+1} = 2x_n + 3y_n$. For $D = 3$ the smallest solution is $(2, 1)$, followed by $(7, 4)$ and $(26, 15)$.

The work is usually in reaching the equation. A condition such as "$\tfrac{n(n+1)}{2}$ is a square" becomes a Pell equation after completing the square: multiplying by $8$ gives $(2n + 1)^2 - 8m^2 = 1$. In the same way, $2y^2 + 1 = x^2$ is $x^2 - 2y^2 = 1$ itself, so $y$ is $2, 12, 70, \ldots$.

Complete the square to reach $x^2 - Dy^2 = 1$, find the smallest solution by trial, and generate the rest by the recursion. The Summary follows.`,
      related: [
        { card: "triangular-numbers", note: String.raw`the numbers $\tfrac{n(n+1)}{2}$, whose square members come from a Pell equation.` },
        { card: "pythagorean-triples", note: String.raw`right triangles with legs that differ by $1$ lead to $x^2 - 2y^2 = -1$ (M5.5).` }
      ],
      exercises: [
        { q: String.raw`The solutions of $x^2 - 3y^2 = 1$ in positive integers begin $(2, 1)$ and $(7, 4)$. What is $x$ in the next solution?`, answer: "26",
          solution: String.raw`$(7 + 4\sqrt3)(2 + \sqrt3) = 14 + 7\sqrt3 + 8\sqrt3 + 12 = 26 + 15\sqrt3$, and $26^2 - 3 \cdot 15^2 = 676 - 675 = 1$. So $x = 26$.` },
        { q: String.raw`What is the smallest integer $y \gt 2$ such that $2y^2 + 1$ is a perfect square?`, answer: "12",
          solution: String.raw`$2y^2 + 1 = x^2$ is the Pell equation $x^2 - 2y^2 = 1$, with solutions $(3, 2)$, $(17, 12)$, $(99, 70)$, and so on. The next $y$ after $2$ is $12$: $2 \cdot 144 + 1 = 289 = 17^2$.` },
        { q: String.raw`How many solutions of $x^2 - 2y^2 = 1$ in positive integers have $x \lt 1000$?`, answer: "4",
          solution: String.raw`The solutions are $(3, 2)$, $(17, 12)$, $(99, 70)$, $(577, 408)$, then $(3363, 2378)$, by $x_{n+1} = 3x_n + 4y_n$ and $y_{n+1} = 2x_n + 3y_n$. Four have $x \lt 1000$.` }
      ],
      problems: [
        "2022 AMC 12A, Problem 16"
      ]
    },
    "M6.6": {
      prereq: ["exponent-tracking", "p-adic-valuation", "power-minus-self", "multiplicative-functions", "modular-inverse", "eulers-theorem", "wilsons-theorem", "multiplicative-order", "pell-equation"],
      cards: [],
      body: String.raw`[[exponent-tracking|Prime exponent tracking]] turns gcd, lcm and product conditions into separate conditions on the exponent of each prime. [[p-adic-valuation|The valuation]] $v_p$ adds over products and is at least the minimum over sums, with equality when the two valuations differ. [[power-minus-self|The differences]] $n^3 - n$, $n^5 - n$ and $n^7 - n$ are divisible by $6$, $30$ and $42$. [[multiplicative-functions|The divisor functions]] split over coprime factors.

[[modular-inverse|An inverse modulo $n$]] exists when $\gcd(a, n) = 1$ and turns division into multiplication. [[eulers-theorem|Euler's theorem]] reduces exponents modulo $\varphi(n)$, and [[wilsons-theorem|Wilson's theorem]] gives $(p - 1)! \equiv -1 \pmod p$.

[[multiplicative-order|The order]] of $a$ divides every $k$ with $a^k \equiv 1$, divides $\varphi(n)$, and for $a = 10$ is the period of $\tfrac1n$. [[pell-equation|A Pell equation]] $x^2 - Dy^2 = 1$ has all its solutions generated by the smallest one.`,
      strategies: [
        String.raw`Write every number as a product of prime powers and solve one prime at a time; the counts multiply.`,
        String.raw`In a sum of two terms with the same number of factors of $p$, take that power out and look at what is left.`,
        String.raw`Replace $n^3$ by $n$ modulo $6$, and $n^5$ by $n$ modulo $30$.`,
        String.raw`Before dividing a congruence, check that the divisor is coprime to the modulus.`,
        String.raw`Reduce a large exponent modulo $\varphi(n)$, or better, modulo the order.`,
        String.raw`Write the large factors of a factorial modulo $p$ as $-1, -2, \ldots$ and use Wilson's theorem.`,
        String.raw`When a quadratic condition must give a square, complete the square and look for a Pell equation.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is $\varphi(100)$, the number of positive integers up to $100$ that are coprime to $100$?`, answer: "40",
        solution: String.raw`$\varphi$ is multiplicative and $100 = 4 \cdot 25$, so $\varphi(100) = \varphi(4)\,\varphi(25) = 2 \cdot 20 = 40$.` },
      { q: String.raw`What is the remainder when $2^{2026}$ is divided by $15$?`, answer: "4",
        solution: String.raw`$2^4 = 16 \equiv 1 \pmod{15}$, so $2$ has order $4$. Since $2026 = 4 \cdot 506 + 2$, $2^{2026} \equiv 2^2 = 4$.` },
      { q: String.raw`Find the integer $x$ with $0 \le x \lt 17$ and $5x \equiv 1 \pmod{17}$.`, answer: "7",
        solution: String.raw`$5 \cdot 7 = 35 = 2 \cdot 17 + 1$, so $x = 7$, the inverse of $5$ modulo $17$.` },
      { q: String.raw`What is the remainder when $1^7 + 2^7 + \cdots + 12^7$ is divided by $42$?`, answer: "36",
        solution: String.raw`Since $42 \mid n^7 - n$ for every integer $n$, the sum has the same remainder as $1 + 2 + \cdots + 12 = 78 = 42 + 36$. The remainder is $36$.` },
      { q: String.raw`What is the remainder when $17!$ is divided by $19$?`, answer: "1",
        solution: String.raw`By Wilson's theorem $18! \equiv -1 \pmod{19}$, and $18! = 18 \cdot 17!$ with $18 \equiv -1$. So $17! \equiv 1$.` }
    ],
    problems: [
      "1985 AIME, Problem 7",
      "2016 AIME II, Problem 8"
    ]
  },
  challenge: {
    problems: [
      "2022 AMC 12A, Problem 23",
      "1987 AIME, Problem 7",
      "2021 Fall AMC 12A, Problem 25",
      "2025 AMC 10B, Problem 25"
    ]
  }
};
