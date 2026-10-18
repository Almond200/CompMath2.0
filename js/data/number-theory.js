// Number theory: divisibility, divisor functions, modular arithmetic, valuations, Diophantine, special topics.
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "number-theory",
  group: "formulas",
  title: "Number Theory",
  blurb: "Divisibility, modular arithmetic, divisor functions, valuations, Diophantine equations, and Farey fractions.",
  subsections: [
    {
      title: "Divisibility & GCD",
      blurb: "Divisibility, the greatest common divisor, and the Euclidean algorithm and Bézout's identity behind it.",
      formulas: [
        {
          id: "gcd-lcm-product",
          name: "GCD × LCM",
          latex: String.raw`\gcd(a, b) \cdot \operatorname{lcm}(a, b) = ab`,
          description: String.raw`For two positive integers, the greatest common divisor times the least common multiple equals the product of the numbers: $\gcd(a, b) \cdot \operatorname{lcm}(a, b) = ab$. For each prime the gcd takes the smaller of the two exponents and the lcm the larger, and together they account for both exponents exactly. The identity is special to two numbers; for three, $\gcd \cdot \operatorname{lcm}$ is usually not $abc$.`,
          keywords: ["gcd", "lcm", "product", "min max exponents"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "euclidean-algorithm",
          name: "Euclidean Algorithm",
          latex: String.raw`\gcd(a, b) = \gcd(b, a \bmod b)`,
          description: String.raw`The Euclidean algorithm finds the greatest common divisor of two numbers $a$ and $b$ by repeatedly replacing the larger one with its remainder $a \bmod b$ on division by the smaller, until one of them is $0$; the other is then the gcd. The rule holds because subtracting a multiple of one number from the other does not change their common divisors, so it applies to expressions as well as numbers. It takes at most a few steps per digit, and run backwards it writes the gcd as a combination of $a$ and $b$.`,
          keywords: ["euclid", "euclidean algorithm", "repeated division", "gcd algorithm", "compute a gcd", "subtract"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "floor-multiples",
          name: "Counting Multiples",
          latex: String.raw`\#\{k \le n : d \mid k\} = \left\lfloor \frac{n}{d} \right\rfloor`,
          description: String.raw`The number of multiples of $d$ among $1, 2, \ldots, n$ is $\left\lfloor \frac nd \right\rfloor$, the whole-number part of $\frac nd$. The multiples are evenly spaced, one in every block of $d$ consecutive integers, so counting them is division rounded down.`,
          keywords: ["count multiples", "floor", "inclusion exclusion", "count multiples up to n", "how many multiples", "floor division counting"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "euclids-lemma",
          name: "Euclid's Lemma",
          latex: String.raw`p \mid ab \implies p \mid a \ \text{ or } \ p \mid b, \qquad \gcd(a,b) = 1 \ \text{ and } \ b \mid an \implies b \mid n`,
          description: String.raw`Euclid's Lemma says that a prime dividing a product divides one of the factors: $p \mid ab$ implies $p \mid a$ or $p \mid b$. Its coprime form is that $\gcd(a, b) = 1$ and $b \mid an$ imply $b \mid n$, so a factor sharing nothing with the divisor can be cancelled. It is the step on which unique prime factorization rests.`,
          keywords: ["euclid lemma", "prime divides product", "coprime divisibility", "cancel a coprime factor", "relatively prime implies divides", "lowest terms forces divisibility"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "fundamental-theorem-arithmetic",
          name: "Fundamental Theorem of Arithmetic",
          latex: String.raw`n = p_1^{e_1} p_2^{e_2} \cdots p_k^{e_k} \text{ in exactly one way}`,
          description: String.raw`The Fundamental Theorem of Arithmetic says that every integer greater than $1$ is a product of primes in exactly one way, apart from the order of the factors. It is the reason a number can be described by the exponents in its prime factorization, which is how divisor counts, gcds, lcms, and perfect powers are computed. Euclid's proof that there are infinitely many primes rests on the same idea.`,
          keywords: ["fundamental theorem of arithmetic", "unique factorization", "prime factorization", "product of primes", "infinitely many primes", "euclid's proof", "primes", "exponents"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "bezouts-identity",
          name: "Bézout's Identity",
          latex: String.raw`\exists\, x, y \in \mathbb{Z}: \; ax + by = \gcd(a, b)`,
          description: String.raw`Bézout's Identity says that for integers $a$ and $b$, not both zero, there are integers $x$ and $y$ with $ax + by = \gcd(a, b)$, and the numbers of the form $ax + by$ are exactly the multiples of $\gcd(a, b)$. So $ax + by = c$ has integer solutions exactly when $\gcd(a, b)$ divides $c$, and then the solutions form one family spaced by $\left(\frac bg, -\frac ag\right)$.`,
          keywords: ["linear combination", "diophantine", "solvable", "integer solutions"],
          importance: "low",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "divisibility-rules",
          name: "Divisibility Rules",
          latex: String.raw`3, 9: \text{digit sum}; \quad 11: \text{alternating digit sum}; \quad 4, 8: \text{last } 2, 3 \text{ digits}, \qquad n \equiv S(n) \pmod 9, \qquad 10^k \equiv -1 \pmod{10^k + 1}`,
          description: String.raw`Divisibility rules test whether a number is divisible by a small integer using only its digits: by $3$ or $9$ when its digit sum is, by $11$ when its alternating digit sum is, and by $4$ or $8$ when its last two or three digits are. Each rule comes from the remainders that powers of $10$ leave, so the digit sums give the actual remainder mod $9$ and mod $11$, not just a yes or no; $S(n)$ in the box is the digit sum of $n$.`,
          keywords: ["digit sum", "divisible", "rules", "alternating", "1001", "casting out nines", "digital root", "digit sum mod 9", "alternating digit sum mod 11", "iterated digit sum", "divisibility by 7", "divisibility by 13", "divisibility by 101", "divisibility by 37", "block sums"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "gcd-power-minus-one",
          name: "GCD of $a^m - 1$ and $a^n - 1$",
          latex: String.raw`\gcd(a^m - 1,\; a^n - 1) = a^{\gcd(m,n)} - 1`,
          description: String.raw`For an integer $a \ge 2$, the greatest common divisor of $a^m - 1$ and $a^n - 1$ is $a^{\gcd(m, n)} - 1$. The Euclidean algorithm on the numbers runs in step with the Euclidean algorithm on the exponents, because $a^m - 1$ leaves remainder $a^{m \bmod n} - 1$ on division by $a^n - 1$.`,
          keywords: ["powers minus one", "gcd exponents", "mersenne", "repunit"],
          importance: "low",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "consecutive-coprime",
          name: "Consecutive Integers Are Coprime",
          latex: String.raw`\gcd(n, n+1) = 1`,
          description: String.raw`Consecutive integers are coprime: $\gcd(n, n + 1) = 1$. More generally, $\gcd(n, n + k)$ divides $k$, since any common divisor divides the difference. Among any $k$ consecutive integers exactly one is divisible by $k$, which is the first step toward the [[consecutive-product-factorial|factorial divisibility of their product]].`,
          keywords: ["consecutive", "coprime", "product divisible factorial", "consecutive integers are coprime", "gcd of consecutive integers", "adjacent integers coprime"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Divisor Functions & Totient",
      blurb: "Counting and summing divisors, Euler's totient, and the other multiplicative functions.",
      formulas: [
        {
          id: "number-of-divisors",
          name: "Number of Divisors",
          latex: String.raw`n = p_1^{e_1} \cdots p_k^{e_k} \implies d(n) = (e_1 + 1)(e_2 + 1) \cdots (e_k + 1)`,
          description: String.raw`The number of divisors of $n$, written $d(n)$, counts its positive divisors, and it is read straight off the prime factorization: $p_1^{e_1}p_2^{e_2}\cdots p_k^{e_k}$ has exactly $(e_1 + 1)(e_2 + 1)\cdots(e_k + 1)$ divisors. The count is odd exactly when $n$ is a perfect square.`,
          keywords: ["tau", "count divisors", "factors", "perfect square odd"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "sum-of-divisors",
          name: "Sum of Divisors",
          latex: String.raw`\sigma(n) = \prod_{i=1}^{k} \frac{p_i^{e_i + 1} - 1}{p_i - 1} = \prod_i (1 + p_i + \cdots + p_i^{e_i})`,
          latexPlain: String.raw`\sigma(n) = \frac{p_1^{e_1 + 1} - 1}{p_1 - 1}\cdots\frac{p_k^{e_k + 1} - 1}{p_k - 1} = (1 + p_1 + \cdots + p_1^{e_1})\cdots(1 + p_k + \cdots + p_k^{e_k})`,
          description: String.raw`The sum of divisors $\sigma(n)$ adds up all the positive divisors of $n$, and it has a product formula: if $n = p_1^{e_1}\cdots p_k^{e_k}$, then $\sigma(n) = (1 + p_1 + \cdots + p_1^{e_1})\cdots(1 + p_k + \cdots + p_k^{e_k})$. Each bracket is a geometric series, so the formula also reads $\prod \frac{p_i^{e_i + 1} - 1}{p_i - 1}$.`,
          keywords: ["sigma", "sum of factors", "perfect number", "geometric series"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "largest-odd-divisor-sum",
          name: "Sum of Largest Odd Divisors",
          latex: String.raw`S(2m) = m^2 + S(m), \qquad S(2m+1) = (m+1)^2 + S(m), \qquad S(2^k) = \frac{4^k + 2}{3}`,
          description: String.raw`The sum of largest odd divisors $S(n) = f(1) + f(2) + \cdots + f(n)$, where $f(k)$ is the largest odd divisor of $k$, obeys a halving recurrence. The odd numbers up to $2m$ add to $m^2$, and each even number $2j$ has the same largest odd divisor as $j$, so the even ones add to $S(m)$. Unwinding the recurrence at powers of $2$ gives a closed form, and for large $n$ the sum is close to $\frac{n^2}{3}$.`,
          keywords: ["largest odd divisor", "greatest odd divisor", "sum of largest odd divisors", "odd part", "f(2n) = f(n)", "halving recurrence", "sum of odd parts", "highest power of 2 sum"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "sigma-parity",
          name: "Parity of $\\sigma(n)$",
          latex: String.raw`\sigma(n) \text{ is odd} \iff n = m^2 \text{ or } n = 2m^2`,
          description: String.raw`The sum of divisors $\sigma(n)$ is odd exactly when $n$ is a perfect square or twice a perfect square. It is the companion of the fact that the number of divisors is odd exactly for perfect squares, and it follows from the product formula one prime at a time.`,
          keywords: ["sigma parity", "sum of divisors odd", "square or twice a square", "divisor function parity", "odd sigma"],
          importance: "low",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "product-of-divisors",
          name: "Product of Divisors",
          latex: String.raw`\prod_{d \mid n} d = n^{d(n)/2}`,
          latexPlain: String.raw`1 \cdot d_2 \cdot d_3 \cdots n = n^{d(n)/2} \qquad (\text{the product of all } d(n) \text{ divisors of } n)`,
          description: String.raw`The product of all the positive divisors of $n$ is $n^{d(n)/2}$, where $d(n)$ is the number of divisors. The divisors pair up as $d$ and $\frac nd$, each pair multiplying to $n$, and when $n$ is a perfect square the middle divisor $\sqrt n$ is its own partner and supplies the half power.`,
          keywords: ["product of factors", "pairing divisors", "product of all divisors", "multiply the divisors of n", "n to the d(n)/2"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "eulers-totient",
          name: "Euler's Totient Function",
          latex: String.raw`\varphi(n) = n \prod_{p \mid n} \left(1 - \frac{1}{p}\right)`,
          latexPlain: String.raw`\varphi(n) = n\left(1 - \frac{1}{p_1}\right)\left(1 - \frac{1}{p_2}\right)\cdots\left(1 - \frac{1}{p_k}\right) \qquad (p_1, \ldots, p_k \text{ the primes dividing } n)`,
          description: String.raw`Euler's totient $\varphi(n)$ counts the integers from $1$ to $n$ that are coprime to $n$, and it equals $n\prod\left(1 - \frac1p\right)$ over the distinct primes $p$ dividing $n$. It is multiplicative, $\varphi(mn) = \varphi(m)\varphi(n)$ when $\gcd(m, n) = 1$, and on a prime power $\varphi(p^k) = p^k - p^{k-1}$.`,
          keywords: ["phi", "totient", "coprime count", "multiplicative"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "totient-divisor-sum",
          name: "Gauss's Totient Sum",
          latex: String.raw`\sum_{d \mid n} \varphi(d) = n`,
          latexPlain: String.raw`\varphi(d_1) + \varphi(d_2) + \cdots + \varphi(d_r) = n \qquad (d_1, \ldots, d_r \text{ the divisors of } n)`,
          description: String.raw`Gauss's totient sum says that the totients $\varphi(d)$ of the divisors $d$ of $n$ add up to $n$ itself. Each integer $k$ from $1$ to $n$ is counted exactly once, at the divisor $\frac{n}{\gcd(k, n)}$, because the $k$ with a given $\gcd(k, n) = g$ are $g$ times the numbers coprime to $\frac ng$. It is the identity behind Möbius inversion of the totient and behind counting elements of each order in a cyclic group.`,
          keywords: ["phi sum", "divisor sum identity", "gauss", "sum of totients over divisors", "gauss totient identity", "phi divisor sum equals n"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "mobius-inversion",
          name: "Möbius Function & Inversion",
          latex: String.raw`g(n) = \sum_{d \mid n} f(d) \iff f(n) = \sum_{d \mid n} \mu(d)\, g\!\left(\frac{n}{d}\right)`,
          latexPlain: String.raw`g(n) = f(d_1) + \cdots + f(d_r) \iff f(n) = \mu(d_1)\, g\!\left(\tfrac{n}{d_1}\right) + \cdots + \mu(d_r)\, g\!\left(\tfrac{n}{d_r}\right) \qquad (d_1, \ldots, d_r \text{ the divisors of } n)`,
          description: String.raw`The Möbius function $\mu(n)$ is $(-1)^k$ when $n$ is a product of $k$ distinct primes and $0$ when $n$ has a repeated prime factor. Its divisor sums vanish except at $1$, and that makes it invert divisor sums: $g(n) = \sum_{d \mid n} f(d)$ exactly when $f(n) = \sum_{d \mid n}\mu(d)\,g\!\left(\frac nd\right)$.`,
          keywords: ["mobius", "inversion", "squarefree", "inclusion exclusion primes"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "multiplicative-functions",
          name: "Multiplicative Functions",
          latex: String.raw`\gcd(m, n) = 1 \implies f(mn) = f(m)f(n) \quad \text{for } f = d, \sigma, \varphi, \mu`,
          description: String.raw`A function $f$ on the positive integers is multiplicative when $f(mn) = f(m)f(n)$ for every pair of coprime $m$ and $n$, with $f(1) = 1$. The number of divisors $d$, the sum of divisors $\sigma$, the totient $\varphi$ and the Möbius function $\mu$ are all multiplicative, so each is determined by its values on prime powers.`,
          keywords: ["multiplicative", "prime powers", "compute by factorization", "multiplicative function", "evaluate by prime factorization", "number-theoretic function"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "coprime-residue-sum",
          name: "Sum of Coprime Residues",
          latex: String.raw`\sum_{\substack{1 \le k \le n \\ \gcd(k, n) = 1}} k = \frac{n\,\varphi(n)}{2} \quad (n > 1)`,
          latexPlain: String.raw`k_1 + k_2 + \cdots + k_{\varphi(n)} = \frac{n\,\varphi(n)}{2} \qquad (k_1, k_2, \ldots \text{ the numbers from } 1 \text{ to } n \text{ coprime to } n,\ n > 1)`,
          description: String.raw`For $n \gt 1$, the integers from $1$ to $n$ that are coprime to $n$ add up to $\frac{n\varphi(n)}{2}$. They pair up as $k$ and $n - k$, each pair summing to $n$, so their average is exactly $\frac n2$.`,
          keywords: ["sum coprime", "totatives", "pairing", "phi even"],
          importance: "lower",
          tier: "AIME Early",
          level: ["AIME"]
        },
        {
          id: "perfect-square-divisors",
          name: "Perfect-Square Divisors",
          latex: String.raw`\#\{\text{square divisors of } \textstyle\prod p_i^{e_i}\} = \prod \left(\left\lfloor \tfrac{e_i}{2} \right\rfloor + 1\right)`,
          latexPlain: String.raw`\#\{\text{square divisors of } p_1^{e_1}\cdots p_k^{e_k}\} = \left(\left\lfloor \tfrac{e_1}{2} \right\rfloor + 1\right)\cdots\left(\left\lfloor \tfrac{e_k}{2} \right\rfloor + 1\right)`,
          description: String.raw`The number of perfect-square divisors of $n = \prod p_i^{e_i}$ is $\prod\left(\left\lfloor \frac{e_i}{2} \right\rfloor + 1\right)$, because a divisor is a perfect square exactly when every exponent in it is even. With multiples of $k$ in place of even numbers, the same count gives the $k$th-power divisors.`,
          keywords: ["square divisors", "cube divisors", "even exponents", "count divisors condition"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "lcm-pair-counting",
          name: "Counting Pairs by LCM / GCD Conditions",
          latex: String.raw`\#\{(a,b) : \operatorname{lcm}(a,b) = \textstyle\prod p_i^{e_i}\} = \prod (2e_i + 1)`,
          latexPlain: String.raw`\#\{(a,b) : \operatorname{lcm}(a,b) = p_1^{e_1}\cdots p_k^{e_k}\} = (2e_1 + 1)(2e_2 + 1)\cdots(2e_k + 1)`,
          description: String.raw`The number of ordered pairs of positive integers with $\operatorname{lcm}(a, b) = \prod p_i^{e_i}$ is $\prod(2e_i + 1)$. For each prime the larger of the two exponents must be exactly $e_i$, which leaves $2e_i + 1$ ordered choices, and different primes are independent.`,
          keywords: ["lcm pairs", "gcd lcm system", "max min exponents", "ordered pairs"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AIME"]
        },
        {
          id: "dirichlet-convolution",
          name: "Dirichlet Convolution",
          latex: String.raw`(f * g)(n) = \sum_{d \mid n} f(d)\, g\!\left(\tfrac{n}{d}\right), \qquad \mu * \mathbf{1} = \varepsilon, \qquad \varphi * \mathbf{1} = \mathrm{id}`,
          latexPlain: String.raw`(f * g)(n) = f(d_1)\, g\!\left(\tfrac{n}{d_1}\right) + \cdots + f(d_r)\, g\!\left(\tfrac{n}{d_r}\right) \;\; (d_1, \ldots, d_r \text{ the divisors of } n), \qquad \mu * \mathbf{1} = \varepsilon, \qquad \varphi * \mathbf{1} = \mathrm{id}`,
          description: String.raw`The Dirichlet convolution of two functions on the positive integers is $(f * g)(n) = \sum_{d \mid n} f(d)\,g\!\left(\frac nd\right)$. It is commutative and associative with identity $\varepsilon(n) = [n = 1]$ (with $\mathbf 1$ the constant function $1$ and $\mathrm{id}(n) = n$), it preserves multiplicativity, and the standard divisor-sum identities become one-line equations: $\varphi * \mathbf 1 = \mathrm{id}$, $\mathrm{id} * \mathbf 1 = \sigma$, $\mathbf 1 * \mathbf 1 = d$, and $\mu * \mathbf 1 = \varepsilon$.`,
          keywords: ["dirichlet convolution", "arithmetic functions", "mobius inversion", "multiplicative function", "divisor sum", "identity function", "convolution ring"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Modular Arithmetic",
      blurb: "Working with remainders: Fermat, Euler, Wilson, the Chinese Remainder Theorem, orders, and inverses.",
      formulas: [
        {
          id: "modular-basics",
          name: "Congruence Rules",
          latex: String.raw`x \equiv a,\; y \equiv b \pmod m \implies \begin{cases} x \pm y \equiv a \pm b \\ xy \equiv ab \\ x/y \equiv ab^{-1} & \text{if } \gcd(b,m)=1 \end{cases} \qquad ka \equiv kb \implies a \equiv b \pmod{m/\gcd(k,m)}`,
          description: String.raw`Two integers are congruent modulo $m$, written $a \equiv b \pmod m$, when $m$ divides $a - b$, that is, when they leave the same remainder. Congruences can be added, subtracted, multiplied, and raised to powers like equations. Division works only as multiplication by an inverse, which exists exactly when the divisor is coprime to $m$, and cancelling a factor $k$ shrinks the modulus to $\frac{m}{\gcd(k, m)}$.`,
          keywords: ["modular arithmetic", "congruence", "mod rules", "cancellation", "cannot divide", "add multiply mod", "residue", "divide mod n", "a mod n divided by b mod n", "termwise rules", "reduce the exponent"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "fermats-little-theorem",
          name: "Fermat's Little Theorem",
          latex: String.raw`a^{p-1} \equiv 1 \pmod{p} \quad (p \nmid a)`,
          description: String.raw`Fermat's Little Theorem says that for a prime $p$ and an integer $a$ not divisible by $p$, $a^{p-1} \equiv 1 \pmod p$; equivalently, $a^p \equiv a \pmod p$ for every integer $a$. So powers of $a$ modulo $p$ repeat with a period dividing $p - 1$, and an exponent matters only modulo $p - 1$.`,
          keywords: ["fermat", "prime modulus", "exponent reduction", "a to p minus 1"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "eulers-theorem",
          name: "Euler's Theorem",
          latex: String.raw`a^{\varphi(n)} \equiv 1 \pmod{n} \quad (\gcd(a, n) = 1)`,
          description: String.raw`Euler's Theorem says that if $a$ and $n$ are coprime, then $a^{\varphi(n)} \equiv 1 \pmod n$, where $\varphi(n)$ counts the numbers from $1$ to $n$ coprime to $n$. It extends Fermat's Little Theorem from prime moduli to all moduli, so an exponent matters only modulo $\varphi(n)$ when the base is coprime to $n$.`,
          keywords: ["euler", "totient exponent", "last digits", "composite modulus"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "carmichael-function",
          name: "Carmichael Function $\\lambda(n)$",
          latex: String.raw`\lambda(p^k) = \varphi(p^k) \text{ (odd } p\text{)}, \quad \lambda(2^k) = 2^{k-2} \text{ for } k \ge 3, \quad \lambda(n) = \operatorname{lcm}\left(\lambda(p_i^{a_i})\right)`,
          description: String.raw`The Carmichael function $\lambda(n)$ is the smallest exponent $m$ with $a^m \equiv 1 \pmod n$ for every $a$ coprime to $n$. It divides $\varphi(n)$, often properly, and it is computed from prime powers by taking an lcm: $\lambda(p^k) = \varphi(p^k)$ for odd primes, $\lambda(2) = 1$, $\lambda(4) = 2$, and $\lambda(2^k) = 2^{k-2}$ for $k \ge 3$.`,
          keywords: ["carmichael", "lambda", "universal exponent", "smaller than phi", "power towers"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "wilsons-theorem",
          name: "Wilson's Theorem",
          latex: String.raw`(p-1)! \equiv -1 \pmod{p}`,
          description: String.raw`Wilson's Theorem says that for a prime $p$, $(p - 1)! \equiv -1 \pmod p$, and the converse holds: an integer $n \gt 1$ with $(n - 1)! \equiv -1 \pmod n$ is prime. In the product $1 \cdot 2 \cdots (p - 1)$, every factor except $1$ and $p - 1$ cancels against its inverse.`,
          keywords: ["wilson", "factorial mod prime", "primality", "half factorial"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "lagrange-roots-mod-p",
          name: "Lagrange's Theorem on Polynomial Roots mod p",
          latex: String.raw`\begin{gathered} \deg f = d,\ \ f \not\equiv 0 \pmod p \\ \Longrightarrow\; f(x) \equiv 0 \pmod p \text{ has at most } d \text{ solutions} \end{gathered}`,
          description: String.raw`Lagrange's Theorem says that a polynomial of degree $d$ with integer coefficients, not all divisible by the prime $p$, has at most $d$ roots modulo $p$. It is the modular version of the fact that a polynomial cannot have more roots than its degree, and it holds because divisibility by a prime behaves like ordinary algebra; for a composite modulus it fails.`,
          keywords: ["lagrange's theorem polynomial", "roots modulo a prime", "at most d roots mod p", "polynomial congruence", "number of solutions mod p", "wilson's theorem proof", "primitive roots"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "crt",
          name: "Chinese Remainder Theorem",
          latex: String.raw`\begin{cases} x \equiv a_1 \pmod{n_1} \\ x \equiv a_2 \pmod{n_2} \\ \;\;\vdots \\ x \equiv a_k \pmod{n_k} \end{cases} \implies x \text{ unique} \pmod{n_1 n_2 \cdots n_k}`,
          description: String.raw`The Chinese Remainder Theorem says that a system of congruences $x \equiv a_i \pmod{n_i}$ with pairwise coprime moduli has exactly one solution modulo the product $n_1n_2\cdots n_k$. Equivalently, a residue modulo $n_1\cdots n_k$ is the same thing as a list of residues modulo each $n_i$. When the moduli share factors, a solution exists exactly when the congruences agree on every common factor.`,
          keywords: ["crt", "system of congruences", "coprime moduli", "unique solution"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "multiplicative-order",
          name: "Multiplicative Order",
          latex: String.raw`a^k \equiv 1 \pmod{n} \implies \operatorname{ord}_n(a) \mid k`,
          description: String.raw`The multiplicative order of $a$ modulo $n$, for $a$ coprime to $n$, written $\operatorname{ord}_n(a)$, is the smallest positive exponent $d$ with $a^d \equiv 1 \pmod n$. Its key property is that $a^m \equiv 1$ exactly when $d$ divides $m$, so the order divides $\varphi(n)$ and the powers of $a$ repeat with period exactly $d$.`,
          keywords: ["order", "cycle length", "repeating decimal period", "divides"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "modular-inverse",
          name: "Modular Inverse",
          latex: String.raw`a \cdot a^{-1} \equiv 1 \pmod{n}`,
          description: String.raw`A modular inverse of $a$ modulo $n$ is a number $a^{-1}$ with $a \cdot a^{-1} \equiv 1 \pmod n$. It exists exactly when $\gcd(a, n) = 1$, and then it is unique modulo $n$; dividing by $a$ modulo $n$ means multiplying by it.`,
          keywords: ["inverse", "division mod n", "extended euclid", "modular multiplicative inverse", "inverse modulo n", "division modulo n"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "last-digit-patterns",
          name: "Last Digits of Squares & Cubes mod 9",
          latex: String.raw`n^2 \bmod 10 \in \{0, 1, 4, 5, 6, 9\}, \qquad n^3 \bmod 9 \in \{0, 1, 8\}`,
          description: String.raw`The units digit of a square is always $0$, $1$, $4$, $5$, $6$ or $9$, a cube leaves remainder $0$, $1$ or $8$ modulo $9$, and the units digits of the powers of any integer repeat with a period dividing $4$. Each fact comes from the small number of possible remainders.`,
          keywords: ["last digit", "perfect square check", "cubes mod 9", "units digit"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "primitive-roots",
          name: "Primitive Roots",
          latex: String.raw`\text{exist mod } n \iff n \in \{1, 2, 4, p^k, 2p^k\} \; (p \text{ odd prime})`,
          description: String.raw`A primitive root modulo $n$ is a residue $g$ whose order is $\varphi(n)$, so its powers run through every residue coprime to $n$. Primitive roots exist exactly when $n$ is $1$, $2$, $4$, $p^k$ or $2p^k$ for an odd prime $p$, and then there are $\varphi(\varphi(n))$ of them.`,
          keywords: ["generator", "order phi", "cyclic group", "primitive root count"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "crt-solution-counting",
          name: "Counting Solutions via CRT",
          latex: String.raw`\begin{gathered} \#\{x \bmod mn : f(x) \equiv 0\} \\ = \#\{x \bmod m\} \cdot \#\{x \bmod n\} \quad (\gcd(m,n)=1) \end{gathered}`,
          description: String.raw`For coprime $m$ and $n$, the number of solutions modulo $mn$ of a polynomial congruence $f(x) \equiv 0$ is the number of solutions modulo $m$ times the number modulo $n$. The Chinese Remainder Theorem pairs each solution modulo $mn$ with a solution modulo $m$ and one modulo $n$.`,
          keywords: ["count solutions", "congruence", "multiply", "automorphic numbers"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AIME"]
        },
        {
          id: "freshmans-dream",
          name: "Freshman's Dream (mod $p$)",
          latex: String.raw`(a + b)^p \equiv a^p + b^p \pmod p, \qquad (a_1 + \cdots + a_n)^p \equiv a_1^p + \cdots + a_n^p \pmod p`,
          description: String.raw`The freshman's dream says that $(a + b)^p \equiv a^p + b^p \pmod p$ for a prime $p$, and more generally $(a_1 + \cdots + a_n)^p \equiv a_1^p + \cdots + a_n^p$. Every middle binomial coefficient $\binom pk$ with $0 \lt k \lt p$ is divisible by $p$, so all the cross terms vanish.`,
          keywords: ["freshman's dream", "freshmans dream", "(a+b)^p", "binomial mod p", "frobenius endomorphism", "characteristic p", "power distributes mod p"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "power-minus-self",
          name: "Divisibility of $n^k - n$",
          latex: String.raw`6 \mid n^3 - n, \quad 30 \mid n^5 - n, \quad 42 \mid n^7 - n; \qquad p \mid n^k - n \ \text{for all } n \iff (p-1) \mid (k-1)`,
          description: String.raw`For every integer $n$, $n^k - n$ is divisible by each prime $p$ with $(p - 1) \mid (k - 1)$, and the largest number dividing $n^k - n$ for all $n$ is the product of those primes. So $n^3 - n$ is always a multiple of $6$, $n^5 - n$ of $30$, $n^7 - n$ of $42$, and $n^{13} - n$ of $2730$.`,
          keywords: ["n^k - n", "n^3 - n divisible by 6", "n^5 - n divisible by 30", "fermat little consequence", "universal divisor", "2730", "consecutive integers"],
          importance: "low",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Quadratic Residues",
      blurb: "Which numbers are squares modulo a prime, and quadratic reciprocity for deciding.",
      formulas: [
        {
          id: "squares-mod-small",
          name: "Quadratic Residues",
          latex: String.raw`x^2 \bmod 4 \in \{0, 1\}, \qquad x^2 \bmod 8 \in \{0, 1, 4\}, \qquad x^2 \bmod 9 \in \{0,1,4,7\}`,
          description: String.raw`A quadratic residue modulo $m$ is a remainder that some perfect square leaves on division by $m$. For small moduli the lists are short: squares are $0$ or $1$ mod $4$; $0$, $1$ or $4$ mod $8$, with every odd square $1$ mod $8$; and $0$, $1$, $4$ or $7$ mod $9$.`,
          keywords: ["squares mod 4", "no solutions", "residues", "parity of squares", "small moduli"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "eulers-criterion",
          name: "Euler's Criterion",
          latex: String.raw`a^{\frac{p-1}{2}} \equiv \left(\frac{a}{p}\right) \pmod{p}, \qquad \equiv 1 \ (a \text{ a residue}), \quad \equiv -1 \ (a \text{ a non-residue})`,
          description: String.raw`Euler's Criterion says that for an odd prime $p$ and $a$ not divisible by $p$, $a^{\frac{p-1}{2}} \equiv 1 \pmod p$ if $a$ is a quadratic residue and $\equiv -1$ if it is not. In Legendre-symbol notation, $a^{\frac{p-1}{2}} \equiv \left(\frac ap\right)$. In particular $-1$ is a square modulo $p$ exactly when $p \equiv 1 \pmod 4$.`,
          keywords: ["quadratic residue", "legendre symbol", "minus one square", "euler criterion", "quadratic residue test", "a to the (p-1)/2 mod p"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "quadratic-reciprocity",
          name: "Quadratic Reciprocity",
          latex: String.raw`\left(\tfrac{p}{q}\right)\left(\tfrac{q}{p}\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}, \quad \left(\tfrac{-1}{p}\right) = (-1)^{\frac{p-1}{2}}, \quad \left(\tfrac{2}{p}\right) = (-1)^{\frac{p^2-1}{8}}, \quad \left(\tfrac{a}{p}\right) \equiv a^{(p-1)/2}\!\pmod p`,
          description: String.raw`The law of quadratic reciprocity says that for distinct odd primes $p$ and $q$, $\left(\frac pq\right)\left(\frac qp\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}$: whether $p$ is a square modulo $q$ and whether $q$ is a square modulo $p$ agree, unless both primes are $3 \bmod 4$, in which case they disagree. With the supplements for $-1$ and $2$, it evaluates any Legendre symbol.`,
          keywords: ["reciprocity", "legendre symbol", "is a square mod p", "quadratic reciprocity", "legendre symbol reciprocity", "law of quadratic reciprocity"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "jacobi-symbol",
          name: "Jacobi Symbol",
          latex: String.raw`\left(\frac{a}{n}\right) = \prod_i \left(\frac{a}{p_i}\right)^{e_i}, \qquad \left(\frac{a}{n}\right)\!\left(\frac{b}{n}\right) = \left(\frac{ab}{n}\right), \qquad \left(\frac{m}{n}\right)\!\left(\frac{n}{m}\right) = (-1)^{\frac{m-1}{2}\frac{n-1}{2}}`,
          latexPlain: String.raw`\left(\frac{a}{n}\right) = \left(\frac{a}{p_1}\right)^{e_1}\cdots\left(\frac{a}{p_k}\right)^{e_k} \;\; (n = p_1^{e_1}\cdots p_k^{e_k}), \qquad \left(\frac{a}{n}\right)\!\left(\frac{b}{n}\right) = \left(\frac{ab}{n}\right), \qquad \left(\frac{m}{n}\right)\!\left(\frac{n}{m}\right) = (-1)^{\frac{m-1}{2}\frac{n-1}{2}}`,
          description: String.raw`For an odd positive $n = p_1^{e_1}\cdots p_k^{e_k}$, the Jacobi symbol $\left(\frac an\right)$ is the product $\left(\frac{a}{p_1}\right)^{e_1}\cdots\left(\frac{a}{p_k}\right)^{e_k}$ of Legendre symbols. It is multiplicative in both arguments and obeys the same reciprocity law and supplements as the Legendre symbol, but a value of $1$ does not prove that $a$ is a square modulo $n$; only $-1$ settles it.`,
          keywords: ["jacobi symbol", "generalized legendre symbol", "quadratic reciprocity", "multiplicative symbol", "odd modulus", "compute without factoring", "kronecker"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "gauss-lemma-qr",
          name: "Gauss's Lemma (Quadratic Residues)",
          latex: String.raw`\left(\frac{a}{p}\right) = (-1)^{\mu}, \qquad \mu = \#\Big\{ 1 \le k \le \tfrac{p-1}{2} : \ (ka \bmod p) > \tfrac{p}{2} \Big\}`,
          description: String.raw`Gauss's Lemma says that for an odd prime $p$ and $a$ not divisible by $p$, the Legendre symbol $\left(\frac ap\right)$ is $(-1)^\mu$, where $\mu$ counts the numbers among $a, 2a, \ldots, \frac{p-1}{2}a$ whose remainder on division by $p$ exceeds $\frac p2$.`,
          keywords: ["gauss lemma", "quadratic residue", "legendre symbol", "negative least residues", "count residues", "reciprocity proof", "supplementary law"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Primes, Factorials & Valuations",
      blurb: "How many times a prime divides a number, a factorial, or a binomial coefficient.",
      formulas: [
        {
          id: "p-adic-valuation",
          name: "$p$-adic Valuation",
          latex: String.raw`v_p(mn) = v_p(m) + v_p(n), \quad v_p\!\left(\tfrac{m}{n}\right) = v_p(m) - v_p(n), \quad v_p(m+n) \ge \min\big(v_p(m), v_p(n)\big)`,
          description: String.raw`The $p$-adic valuation $v_p(n)$ is the exponent of the prime $p$ in $n$: $p^{v_p(n)}$ divides $n$ but $p^{v_p(n) + 1}$ does not, with $v_p(0) = \infty$. Valuations add on products, subtract on quotients, and satisfy $v_p(m + n) \ge \min(v_p(m), v_p(n))$, with equality whenever the two valuations differ.`,
          keywords: ["p-adic valuation", "v_p", "exponent of a prime", "highest power dividing", "p^k exactly divides", "ultrametric", "non-archimedean", "valuation rules", "order of p in n"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lte-lemma",
          name: "Lifting the Exponent Lemma",
          latex: String.raw`v_p(a^n - b^n) = v_p(a - b) + v_p(n) \qquad (p \text{ odd},\ p \mid a - b,\ p \nmid ab)`,
          description: String.raw`The Lifting the Exponent Lemma gives the exponent of a prime $p$ in $a^n - b^n$ from two much smaller numbers: when $p$ is odd, $p$ divides $a - b$, and $p$ divides neither $a$ nor $b$, the exponent is $v_p(a - b) + v_p(n)$. For odd $n$ the same holds for $a^n + b^n$ with $a + b$ in place of $a - b$. The prime $2$ has its own form, $v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1$ for odd $a$ and $b$ and even $n$.`,
          keywords: ["lte", "lifting the exponent lemma", "valuation of a difference of powers", "largest power of p dividing a^n - b^n", "exponent of a prime in a^n - b^n", "v_p of a^n minus b^n"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "legendres-formula",
          name: "Legendre's Formula",
          latex: String.raw`v_p(n!) = \sum_{i=1}^{\infty} \left\lfloor \frac{n}{p^i} \right\rfloor = \frac{n - s_p(n)}{p - 1}`,
          latexPlain: String.raw`v_p(n!) = \left\lfloor \frac{n}{p} \right\rfloor + \left\lfloor \frac{n}{p^2} \right\rfloor + \left\lfloor \frac{n}{p^3} \right\rfloor + \cdots = \frac{n - s_p(n)}{p - 1}`,
          description: String.raw`Legendre's Formula gives the exponent of a prime $p$ in the prime factorization of $n!$: $v_p(n!) = \left\lfloor \frac np \right\rfloor + \left\lfloor \frac n{p^2} \right\rfloor + \left\lfloor \frac n{p^3} \right\rfloor + \cdots$, a sum that stops once $p^k$ exceeds $n$. It answers "what is the largest power of $p$ dividing $n!$" and, with $p = 5$, "how many zeros does $n!$ end in". An equivalent form is $\frac{n - s_p(n)}{p - 1}$, where $s_p(n)$ is the digit sum of $n$ in base $p$.`,
          keywords: ["factorial", "prime exponent", "trailing zeros", "valuation", "factors of prime in factorial", "how many times divides factorial", "largest power dividing factorial", "divide and floor", "exponent of a prime in n factorial"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "kummers-theorem",
          name: "Kummer's Theorem",
          latex: String.raw`v_p\binom{m+n}{m} = \#\{\text{carries when adding } m + n \text{ in base } p\}`,
          description: String.raw`Kummer's Theorem says that the exponent of a prime $p$ in $\binom{m + n}{m}$ equals the number of carries when $m$ and $n$ are added in base $p$.`,
          keywords: ["binomial coefficient", "carries", "prime power", "kummer theorem", "carries when adding in base p", "prime power dividing a binomial"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lucas-theorem",
          name: "Lucas' Theorem",
          latex: String.raw`\binom{m}{n} \equiv \prod_{i} \binom{m_i}{n_i} \pmod{p}`,
          latexPlain: String.raw`\binom{m}{n} \equiv \binom{m_0}{n_0}\binom{m_1}{n_1}\cdots\binom{m_k}{n_k} \pmod{p}, \qquad m = (m_k\ldots m_1m_0)_p`,
          description: String.raw`Lucas's Theorem says that for a prime $p$, $\binom mn$ modulo $p$ is the product of the binomial coefficients of the base-$p$ digits: if $m = (m_k\ldots m_0)_p$ and $n = (n_k\ldots n_0)_p$, then $\binom mn \equiv \binom{m_0}{n_0}\cdots\binom{m_k}{n_k} \pmod p$, with $\binom{a}{b} = 0$ when $b \gt a$.`,
          keywords: ["binomial mod p", "base p digits", "odd binomial", "pascal parity"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "primes-6k",
          name: String.raw`Primes Are $6k \pm 1$`,
          latex: String.raw`p > 3 \implies p \equiv \pm 1 \pmod{6} \qquad p^2 \equiv 1 \pmod{24}`,
          description: String.raw`Every prime larger than $3$ is one more or one less than a multiple of $6$, and its square is one more than a multiple of $24$. The first is a sieve by $2$ and $3$, and the second adds a factor of $8$ from the two even neighbors of the prime. Neither fact runs backwards: $25$ and $35$ have the form and are not prime.`,
          keywords: ["prime form", "6k plus minus 1", "24", "primes are 6k plus or minus 1", "prime form 6k+1 6k-1", "form of primes above 3"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "prime-divides-binomial",
          name: "Prime Divides Its Binomial Coefficients",
          latex: String.raw`p \;\Big|\; \binom{p}{k} \quad \text{for } 0 < k < p`,
          description: String.raw`For a prime $p$ and $0 \lt k \lt p$, $p$ divides $\binom pk$. The numerator of $\binom pk = \frac{p!}{k!(p - k)!}$ contains the factor $p$, and neither factorial in the denominator does.`,
          keywords: ["binomial prime", "freshman's dream", "frobenius endomorphism", "prime divides its binomial coefficients", "p divides C(p,k)", "freshmans dream mod p"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "bertrands-postulate",
          name: "Bertrand's Postulate",
          latex: String.raw`\forall n \ge 1: \; \exists \text{ prime } p \text{ with } n < p \le 2n`,
          description: String.raw`Bertrand's Postulate says that for every integer $n \ge 1$ there is a prime $p$ with $n \lt p \le 2n$. Chebyshev proved it, and Erdős gave a short proof by estimating the prime factors of the central binomial coefficient $\binom{2n}{n}$.`,
          keywords: ["prime between", "chebyshev", "existence of prime", "bertrand postulate", "a prime between n and 2n", "chebyshev prime bound"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "dirichlet-primes-progression",
          name: "Dirichlet's Theorem on Primes in Progressions",
          latex: String.raw`\gcd(a, m) = 1 \implies \text{infinitely many primes } p \equiv a \pmod{m}`,
          description: String.raw`For a modulus $m$ and a residue $a$ coprime to it, the progression $a, a + m, a + 2m, \ldots$ contains infinitely many primes. The coprimality is needed, since a common factor of $a$ and $m$ divides every term. The general proof uses analysis far beyond a contest, so olympiad solutions quote the theorem by name; a few residues, such as $3$ and $1$ modulo $4$, have short proofs in the style of Euclid's.`,
          keywords: ["dirichlet theorem", "primes in arithmetic progression", "infinitely many primes congruent to a mod m", "infinitely many primes 1 mod 4", "infinitely many primes 3 mod 4", "prime in a residue class"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "trailing-zeros",
          name: "Trailing Zeros of $n!$",
          latex: String.raw`(\text{zeros of } n!) = v_5(n!) = \left\lfloor \tfrac{n}{5} \right\rfloor + \left\lfloor \tfrac{n}{25} \right\rfloor + \left\lfloor \tfrac{n}{125} \right\rfloor + \cdots`,
          description: String.raw`The number of zeros at the end of $n!$ is the exponent of $5$ in $n!$, $\left\lfloor \frac n5 \right\rfloor + \left\lfloor \frac n{25} \right\rfloor + \left\lfloor \frac n{125} \right\rfloor + \cdots$, because each zero needs a factor $2 \cdot 5$ and fives are the scarcer factor. The count jumps by more than one at multiples of $25$, so some counts never occur.`,
          keywords: ["trailing zeros", "factorial zeros", "how many zeros", "power of 5", "legendre"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "consecutive-product-factorial",
          name: "$k$ Consecutive Integers (mod $k!$)",
          latex: String.raw`n(n+1)(n+2)\cdots(n+k-1) \equiv 0 \pmod{k!} \qquad \big(= k!\,\tbinom{n+k-1}{k}\big)`,
          description: String.raw`The product of any $k$ consecutive integers is a multiple of $k!$, because $n(n + 1)\cdots(n + k - 1) = k!\binom{n + k - 1}{k}$ and a binomial coefficient is an integer. So two consecutive integers have an even product, three a multiple of $6$, and four a multiple of $24$.`,
          keywords: ["consecutive integers product", "divisible by k factorial", "binomial coefficient integer", "product of k consecutive", "n(n+1)(n+2)", "always integer"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Diophantine & Additive",
      blurb: "Equations in integers and sums of numbers: Frobenius, Pythagorean triples, Pell, and sums of squares.",
      formulas: [
        {
          id: "chicken-mcnugget",
          name: "Chicken McNugget (Frobenius) Theorem",
          latex: String.raw`g(a,b) = ab - a - b, \qquad \#\{\text{non-representable}\} = \frac{(a-1)(b-1)}{2}`,
          description: String.raw`The Chicken McNugget Theorem says that for coprime positive integers $a$ and $b$, the largest integer that is not of the form $ax + by$ with $x, y \ge 0$, the Frobenius number $g(a, b)$, is $ab - a - b$, and exactly $\frac{(a - 1)(b - 1)}{2}$ positive integers are not of that form.`,
          keywords: ["frobenius", "sylvester", "sylvester formula", "coin problem", "postage stamp", "non-representable", "coprime"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "pythagorean-triples",
          name: "Pythagorean Triple Parametrization",
          latex: String.raw`(a, b, c) = (m^2 - n^2,\; 2mn,\; m^2 + n^2)`,
          description: String.raw`A Pythagorean triple is a set of positive integers $a$, $b$, $c$ with $a^2 + b^2 = c^2$, and every primitive one, with no common factor, is $(m^2 - n^2, 2mn, m^2 + n^2)$ for coprime $m \gt n$ of opposite parity, up to swapping the legs. Every triple is a multiple of a primitive one.`,
          keywords: ["primitive triple", "parametrize", "m and n", "generate triples"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "pell-equation",
          name: "Pell Equations",
          latex: String.raw`x^2 - Dy^2 = 1`,
          description: String.raw`A Pell equation is $x^2 - Dy^2 = 1$ with $D$ a positive non-square integer. It has infinitely many positive solutions, and they are exactly the pairs with $x + y\sqrt D = (x_1 + y_1\sqrt D)^k$, where $(x_1, y_1)$ is the smallest positive solution.`,
          keywords: ["pell", "fundamental solution", "recurrence", "sqrt approximation"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "sum-of-two-squares",
          name: "Sum of Two Squares Theorem",
          latex: String.raw`n = a^2 + b^2 \iff v_p(n) \text{ even for all } p \equiv 3 \!\!\pmod 4`,
          description: String.raw`A positive integer is a sum of two squares iff every prime factor $\equiv 3 \pmod 4$ appears to an even power. The prime case is Fermat's Two-Square Theorem: $p \equiv 1 \pmod 4$ is a sum of two squares in exactly one way, which is what makes the general criterion constructive.`,
          keywords: ["fermat two square theorem", "two squares", "representable", "primes 1 mod 4", "sum of two squares theorem", "expressible as two squares", "fermat's theorem on sums of two squares", "prime as a sum of two squares", "p = a^2 + b^2", "prime hypotenuse", "unique representation as two squares", "brahmagupta fibonacci identity"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "thues-lemma",
          name: "Thue's Lemma",
          latex: String.raw`\gcd(a,n)=1 \implies \exists\, x,y:\; x \equiv ay \pmod{n}, \;\; 0 < |x|, |y| \le \sqrt{n}`,
          description: String.raw`Thue's Lemma says that for an integer $n \gt 1$ and any $a$ coprime to $n$, the congruence $x \equiv ay \pmod n$ has a solution with $0 \lt |x|, |y| \le \sqrt n$. It guarantees a small solution of a linear congruence by the pigeonhole principle, and it is the standard elementary route to writing primes as sums of two squares.`,
          keywords: ["thue lemma", "pigeonhole congruence", "small solution", "two squares proof", "sum of two squares"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "difference-of-squares-rep",
          name: "Difference of Two Squares Representability",
          latex: String.raw`n = a^2 - b^2 \text{ solvable} \iff n \not\equiv 2 \pmod 4`,
          description: String.raw`A positive integer $n$ is a difference of two squares, $n = a^2 - b^2$ with integers $a, b \ge 0$, exactly when $n$ is not $2$ more than a multiple of $4$. The factors $a - b$ and $a + b$ always have the same parity, so their product is odd or a multiple of $4$, and the representations correspond to factor pairs of $n$ of matching parity.`,
          keywords: ["a squared minus b squared", "representable", "factor parity", "difference of two squares representation", "which numbers are a difference of squares", "not two mod four"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "sum-of-three-squares",
          name: "Sums of Three and Four Squares",
          latex: String.raw`n = a^2 + b^2 + c^2 \text{ solvable} \iff n \ne 4^k(8m + 7), \qquad \text{every } n \text{ is a sum of four squares}`,
          description: String.raw`Legendre's three-square theorem says a positive integer is a sum of three squares exactly when it is not of the form $4^k(8m + 7)$, and Lagrange's four-square theorem says every positive integer is a sum of four squares. So the numbers needing four squares are exactly $7, 15, 23, 28, 31, \ldots$, the numbers $4^k(8m + 7)$.`,
          keywords: ["three squares", "legendre three square", "lagrange four square", "sum of squares representable", "8m plus 7"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "cauchy-davenport",
          name: "Cauchy–Davenport Theorem",
          latex: String.raw`p \text{ prime},\ A, B \subseteq \mathbb{Z}_p \;\Rightarrow\; |A + B| \ge \min(p,\ |A| + |B| - 1)`,
          description: String.raw`The Cauchy–Davenport Theorem says that for a prime $p$ and nonempty subsets $A$, $B$ of the integers mod $p$, the sumset $A + B = \{a + b\}$ has at least $\min(p, |A| + |B| - 1)$ elements. A sumset mod a prime can be no smaller than two arithmetic progressions with the same difference make it.`,
          keywords: ["cauchy davenport", "sumset", "additive combinatorics", "mod p subsets", "A plus B", "sum set bound"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "erdos-ginzburg-ziv",
          name: "Erdős–Ginzburg–Ziv Theorem",
          latex: String.raw`a_1, \ldots, a_{2n-1} \in \mathbb{Z} \implies n \mid a_{i_1} + \cdots + a_{i_n} \qquad \text{for some } i_1 \lt \cdots \lt i_n`,
          description: String.raw`The Erdős–Ginzburg–Ziv Theorem says that among any $2n - 1$ integers, some $n$ of them have a sum divisible by $n$, and $2n - 1$ is the least number that guarantees it.`,
          keywords: ["erdos ginzburg ziv", "egz", "zero sum", "subset divisible by n", "2n-1 integers", "additive number theory"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "chevalley-warning",
          name: "Chevalley–Warning Theorem",
          latex: String.raw`\sum_i \deg f_i < n \;\Rightarrow\; p \mid \#\{x \in \mathbb{F}_p^{\,n} : f_1(x) = \cdots = f_k(x) = 0\}`,
          latexPlain: String.raw`\deg f_1 + \cdots + \deg f_k < n \;\Rightarrow\; p \mid \#\{x \in \mathbb{F}_p^{\,n} : f_1(x) = \cdots = f_k(x) = 0\}`,
          description: String.raw`The Chevalley–Warning Theorem says that if polynomials $f_1, \ldots, f_k$ over the integers mod a prime $p$, in $n$ variables, have degrees adding up to less than $n$, then the number of common zeros in $\mathbb F_p^n$ is divisible by $p$. When the $f_i$ have no constant terms, the zero vector is a common zero, so there must be a nonzero one too.`,
          keywords: ["chevalley warning", "finite field", "common zeros divisible by p", "low degree system", "nontrivial solution mod p", "existence"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Bases, Digits & Decimals",
      blurb: "Numbers written in other bases, digit sums, and repeating and terminating decimals.",
      formulas: [
        {
          id: "base-conversion",
          name: "Base-$b$ Representation",
          latex: String.raw`(d_k d_{k-1} \cdots d_0)_b = \sum_{i=0}^{k} d_i\, b^i`,
          latexPlain: String.raw`(d_k d_{k-1} \cdots d_0)_b = d_k b^k + d_{k-1} b^{k-1} + \cdots + d_1 b + d_0`,
          description: String.raw`Writing a number in base $b$ means expressing it as a sum of powers of $b$ with digits from $0$ to $b - 1$: $(d_k\cdots d_1d_0)_b = d_kb^k + \cdots + d_1b + d_0$. Every positive integer has exactly one such representation, found by repeated division by $b$, and it has $\lfloor \log_b n \rfloor + 1$ digits. A digit string is a polynomial in its base.`,
          keywords: ["base b", "digits", "convert", "binary", "positional"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "repeating-decimals",
          name: "Repeating Decimals to Fractions",
          latex: String.raw`0.\overline{d_1 d_2 \cdots d_k} = \frac{d_1 d_2 \cdots d_k}{\underbrace{99\cdots9}_{k}}`,
          description: String.raw`A repeating decimal whose block of $k$ digits repeats from the start equals that block divided by $k$ nines: $0.\overline{d_1\cdots d_k} = \frac{d_1\cdots d_k}{10^k - 1}$. Every fraction has a terminating or repeating decimal, and for $n$ coprime to $10$ the period of $\frac1n$ is the multiplicative order of $10$ modulo $n$.`,
          keywords: ["repeating decimal", "period", "nines", "fraction"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "digit-sum-carries",
          name: "Digit Sums and Carries",
          latex: String.raw`s(a+b) = s(a) + s(b) - 9c, \qquad c = \#\{\text{carries when adding } a + b\}`,
          description: String.raw`Writing $s(n)$ for the digit sum of $n$, the digit sum of a sum drops by $9$ for every carry: $s(a + b) = s(a) + s(b) - 9c$, where $c$ is the number of carries when $a$ and $b$ are added. Each carry removes ten from one place and adds one to the next; in base $b$ the loss per carry is $b - 1$.`,
          keywords: ["digit sum of a sum", "carries", "digit sum drops by nine", "count the carries", "no carrying addition", "base b carry drop", "s(a+b)"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "terminating-decimals",
          name: "Terminating Decimals",
          latex: String.raw`\frac{m}{n} \text{ (lowest terms) terminates} \iff n = 2^a 5^b`,
          description: String.raw`A fraction $\frac mn$ in lowest terms has a terminating decimal exactly when $n$ has no prime factors other than $2$ and $5$, and then it has $\max(a, b)$ digits after the decimal point, where $n = 2^a5^b$.`,
          keywords: ["terminating decimal", "2 and 5", "denominator", "decimal digits"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "digit-count",
          name: "Number of Digits",
          latex: String.raw`\#\text{digits of } n \text{ in base } b = \lfloor \log_b n \rfloor + 1`,
          description: String.raw`A positive integer $n$ has $\lfloor \log_{10} n \rfloor + 1$ digits, and $\lfloor \log_b n \rfloor + 1$ digits in base $b$. The fractional part of $\log_{10} n$ determines the leading digits, since $n = 10^{\{\log_{10} n\}} \cdot 10^{\lfloor \log_{10} n \rfloor}$.`,
          keywords: ["digits", "log", "how many digits", "leading digit"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Special Numbers & Sequences",
      blurb: "Families of numbers with special divisibility: Fermat numbers, Gaussian integers, Pisano periods, and more.",
      formulas: [
        {
          id: "wolstenholme",
          name: "Wolstenholme's Theorem",
          latex: String.raw`\binom{2p}{p} \equiv 2 \pmod{p^3} \quad (p \ge 5)`,
          description: String.raw`Wolstenholme's Theorem says that for a prime $p \ge 5$, the numerator of $1 + \frac12 + \cdots + \frac{1}{p - 1}$ is divisible by $p^2$, and equivalently $\binom{2p - 1}{p - 1} \equiv 1 \pmod{p^3}$, so $\binom{2p}{p} \equiv 2 \pmod{p^3}$.`,
          keywords: ["harmonic sum mod p", "central binomial", "p cubed", "wolstenholme theorem", "harmonic sum mod p squared", "binomial 2p choose p mod p"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "zsygmondy",
          name: "Zsigmondy's Theorem",
          latex: String.raw`\exists\, p \mid a^n - b^n,\ \ p \nmid a^k - b^k \ (k \lt n) \qquad \text{except } 2^6 - 1^6, \text{ and } n = 2 \text{ with } a + b = 2^j`,
          description: String.raw`Zsigmondy's Theorem says that for coprime integers $a \gt b \ge 1$ and $n \ge 2$, the number $a^n - b^n$ has a primitive prime divisor, one dividing no $a^k - b^k$ with $k \lt n$, except when $2^6 - 1^6 = 63$, or $n = 2$ with $a + b$ a power of $2$.`,
          keywords: ["primitive prime divisor", "new prime", "exponential diophantine", "zsygmondy theorem", "zsigmondy theorem"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "cyclotomic-polynomials",
          name: "Cyclotomic Polynomials",
          latex: String.raw`x^n - 1 = \prod_{d \mid n} \Phi_d(x), \qquad p \mid \Phi_n(a),\ p \nmid n \implies p \equiv 1 \pmod n`,
          latexPlain: String.raw`x^n - 1 = \Phi_{d_1}(x)\,\Phi_{d_2}(x)\cdots\Phi_n(x)\ \ (d_1, d_2, \ldots, n \text{ the divisors of } n), \qquad p \mid \Phi_n(a),\ p \nmid n \implies p \equiv 1 \pmod n`,
          description: String.raw`The $n$th cyclotomic polynomial $\Phi_n(x)$ is the monic polynomial whose roots are the primitive $n$th roots of unity, the complex numbers $\zeta$ with $\zeta^n = 1$ and no smaller positive power equal to $1$. It has integer coefficients and degree $\varphi(n)$, and the $\Phi_d$ for the divisors $d$ of $n$ are exactly the pieces into which $x^n - 1$ factors. For an integer $a$, a prime $p$ dividing $\Phi_n(a)$ either divides $n$ or has $a$ of [[multiplicative-order|order]] exactly $n$ modulo $p$. That makes these polynomials the standard source of primes in the progression $1 \bmod n$ and of prime divisors of $a^n - 1$ that divide no smaller $a^d - 1$.`,
          keywords: ["cyclotomic polynomial", "phi n of x", "primitive roots of unity", "x^n minus 1 factorization", "prime divisors congruent to 1 mod n", "primes 1 mod n infinitely many", "order exactly n", "x^4 - x^2 + 1"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "fermat-numbers",
          name: "Fermat Numbers",
          latex: String.raw`F_n = 2^{2^n} + 1, \qquad F_0 F_1 \cdots F_{n-1} = F_n - 2`,
          description: String.raw`The Fermat numbers are $F_n = 2^{2^n} + 1$ for $n \ge 0$. The product identity shows distinct Fermat numbers are pairwise coprime — hence infinitely many primes. Only $F_0, \dots, F_4$ ($3, 5, 17, 257, 65537$) are known to be prime.`,
          keywords: ["fermat number", "pairwise coprime", "product identity", "65537"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lattice-points-gcd",
          name: "Lattice Points on a Segment",
          latex: String.raw`\#\{\text{lattice points strictly between } (0,0) \text{ and } (a, b)\} = \gcd(a, b) - 1, \qquad \#\{\text{grid squares crossed}\} = m + n - \gcd(m, n)`,
          description: String.raw`The segment from $(0, 0)$ to $(a, b)$, with $a$ and $b$ integers, passes through $\gcd(a, b) - 1$ lattice points strictly between its ends, and $\gcd(a, b) + 1$ counting the ends. The same idea counts the unit squares a diagonal crosses: the diagonal of an $m \times n$ grid of squares passes through the interiors of $m + n - \gcd(m, n)$ of them. It supplies the boundary count in [[picks-theorem|Pick's Theorem]], one edge at a time.`,
          keywords: ["lattice", "segment", "visible points", "gcd", "squares crossed by diagonal", "diagonal of grid"],
          importance: "high",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "lattice-points-circle",
          name: "Lattice Points on a Circle",
          latex: String.raw`\#\{(a,b) \in \mathbb{Z}^2 : a^2 + b^2 = n\} = 4\left(d_1(n) - d_3(n)\right)`,
          description: String.raw`Counting all ordered, signed representations: $d_1$ and $d_3$ count divisors of $n$ congruent to $1$ and $3$ mod $4$. Consequence of unique factorization in the Gaussian integers; the count is $0$ exactly when some prime $\equiv 3 \pmod 4$ divides $n$ to an odd power.`,
          keywords: ["lattice points circle", "sum of two squares count", "representations", "gaussian integers"],
          importance: "lower",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "gaussian-integers",
          name: "Gaussian & Eisenstein Integers",
          latex: String.raw`N(a+bi) = a^2 + b^2, \qquad N(zw) = N(z)\,N(w)`,
          description: String.raw`The ring $\mathbb{Z}[i] = \{a+bi\}$ has unique factorization, units $\pm 1, \pm i$, and a multiplicative norm $N(a+bi) = a^2+b^2$. A rational prime $p$ splits into two conjugate Gaussian primes iff $p \equiv 1 \pmod 4$ (then $p = a^2+b^2$), stays inert iff $p \equiv 3 \pmod 4$, and ramifies at $p = 2 = -i(1+i)^2$. The Eisenstein integers $\mathbb{Z}[\omega]$, $\omega = e^{2\pi i/3}$, play the same role for the form $a^2 - ab + b^2$, which is their norm, $N(a+b\omega) = a^2 - ab + b^2$ (it takes the same values as $a^2 + ab + b^2$, by $b \to -b$), with primes classified mod $3$.`,
          keywords: ["gaussian integers", "eisenstein integers", "quadratic field", "quadratic integer ring", "norm", "unique factorization", "sum of two squares", "z[i]", "split inert ramified"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "recognition-numbers",
          name: "Numbers Worth Recognizing",
          latex: String.raw`1001 = 7 \cdot 11 \cdot 13, \qquad 999 = 3^3 \cdot 37, \qquad 1024 = 2^{10}, \qquad 1729 = 7 \cdot 13 \cdot 19, \qquad 7^4 = 2401 \equiv 1 \pmod{100}`,
          description: String.raw`Numbers worth recognizing are the factorizations, powers, and constants that come up so often on contests that knowing them on sight saves a computation. The most useful are the "fake primes", products of two primes from $7$ to $19$ that look prime: $91 = 7 \cdot 13$, $119 = 7 \cdot 17$, $133 = 7 \cdot 19$, $143 = 11 \cdot 13$, $187 = 11 \cdot 17$, $209 = 11 \cdot 19$, $221 = 13 \cdot 17$, $247 = 13 \cdot 19$, and $323 = 17 \cdot 19$. Also worth knowing are $1001 = 7 \cdot 11 \cdot 13$, $111 = 3 \cdot 37$, the powers of $2$ through $2^{10} = 1024 \approx 10^3$, $7! = 5040$, $10! = 3{,}628{,}800$, and $\sqrt2 \approx 1.414$, $\sqrt3 \approx 1.732$, $\sqrt5 \approx 2.236$, $\pi \approx 3.1416$.`,
          keywords: ["1001", "fake primes", "recognize factorizations", "powers of 2", "memorize constants", "1729", "sqrt approximations", "2401", "powers of 7 mod 100"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "pisano-periods",
          name: "Pisano Periods",
          latex: String.raw`F_n \bmod m \text{ is periodic}; \qquad \pi(2) = 3, \;\; \pi(5) = 20, \;\; \pi(10) = 60`,
          description: String.raw`The Fibonacci sequence taken modulo $m$ eventually repeats, and since the recurrence runs backward too, it repeats from the very start. The period $\pi(m)$ controls every question about $F_n \bmod m$, and the last digit of $F_n$ cycles with period $\pi(10) = 60$. To find $F_n \bmod m$, the index $n$ is reduced modulo $\pi(m)$.`,
          keywords: ["pisano period", "fibonacci mod m", "last digit of fibonacci", "periodic recurrence", "cycle"],
          importance: "lowest",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "carmichael-numbers",
          name: "Carmichael Numbers & Pseudoprimes",
          latex: String.raw`\text{composite } n \text{ with } b^{n-1} \equiv 1 \pmod n \ \forall \gcd(b,n)=1; \quad \text{Korselt: } n \text{ squarefree},\ (p-1)\mid(n-1)\ \forall p\mid n`,
          description: String.raw`A Fermat pseudoprime to base $b$ is a composite $n$ that nonetheless passes Fermat's test $b^{n-1}\equiv 1$; a Carmichael number passes it for every base coprime to $n$ — an "absolute" pseudoprime that fools the Fermat primality test entirely. Korselt's criterion characterizes them: squarefree with $(p-1)\mid(n-1)$ for each prime factor. The smallest is $561 = 3\cdot 11\cdot 17$. (Not to be confused with the Carmichael function $\lambda(n)$.)`,
          keywords: ["carmichael number", "fermat pseudoprime", "korselt criterion", "561", "absolute pseudoprime", "primality test fooled"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "base10-curiosities",
          name: "Base-10 Curiosities",
          latex: String.raw`\tfrac17 = 0.\overline{142857}, \quad 153 = 1^3+5^3+3^3, \quad 6174 = \text{Kaprekar's constant}`,
          description: String.raw`Cool-to-know decimal quirks. Cyclic number $142857$: $\frac17 = 0.\overline{142857}$, and multiplying by $1$–$6$ just rotates its digits ($2\times = 285714$, …), while $\times 7 = 999999$. Narcissistic (Armstrong) numbers equal the sum of their own digits each raised to the digit-count: $153 = 1^3+5^3+3^3$ (also $370, 371, 407$). Kaprekar's constant $6174$: take any 4-digit number (not all identical digits), subtract the ascending arrangement from the descending, and repeat — you reach $6174$ within $7$ steps and stay there. Rarely "useful," always fun.`,
          keywords: ["142857", "cyclic number", "1/7 decimal", "narcissistic number", "armstrong number", "153", "kaprekar constant", "6174", "digit curiosities", "recreational"],
          importance: "lower",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Continued Fractions & Representations",
      blurb: "Ways to write a number: continued fractions, Farey sequences, Beatty sequences, and Zeckendorf sums.",
      formulas: [
        {
          id: "farey-sequences",
          name: "Farey Sequences & Mediants",
          latex: String.raw`\frac{a}{b}, \frac{c}{d} \text{ Farey neighbors} \iff bc - ad = 1; \qquad \text{mediant} = \frac{a + c}{b + d}`,
          description: String.raw`$F_n$ lists reduced fractions in $[0,1]$ with denominator $\le n$ in order. The mediant of two neighbors is the first fraction to appear between them (in $F_{b+d}$). $|F_n| \approx \frac{3n^2}{\pi^2}$.`,
          keywords: ["farey", "mediant", "neighbors", "stern brocot", "fractions between"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "continued-fraction-convergents",
          name: "Continued Fraction Convergents",
          latex: String.raw`p_k q_{k-1} - p_{k-1} q_k = (-1)^{k-1}`,
          description: String.raw`Consecutive convergents $\frac{p_k}{q_k}$ of a continued fraction are Farey neighbors — the same $|bc - ad| = 1$ relation. Convergents give the best rational approximations, e.g. $\frac{22}{7}$ and $\frac{355}{113}$ for $\pi$.`,
          keywords: ["continued fraction", "convergents", "best approximation", "farey neighbors"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "beatty-theorem",
          name: "Beatty's Theorem (Rayleigh)",
          latex: String.raw`\alpha, \beta \text{ irrational},\ \tfrac1\alpha + \tfrac1\beta = 1 \;\Rightarrow\; \{\lfloor n\alpha\rfloor\} \text{ and } \{\lfloor n\beta\rfloor\} \text{ partition } \mathbb{Z}^+`,
          description: String.raw`For irrational $\alpha, \beta > 1$ with $\frac1\alpha + \frac1\beta = 1$, the two "Beatty sequences" $\lfloor n\alpha\rfloor$ and $\lfloor n\beta\rfloor$ ($n \ge 1$) hit every positive integer exactly once between them. So a single irrational $\alpha$ generates a complementary pair of sequences that tile $\mathbb{Z}^+$ — the density argument ($\frac1\alpha + \frac1\beta = 1$ makes the densities add to $1$) is the whole idea, and it connects to floor-sum identities.`,
          keywords: ["beatty theorem", "rayleigh theorem", "beatty sequence", "complementary sequences", "partition integers", "floor n alpha", "irrational density"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "zeckendorf-theorem",
          name: "Zeckendorf's Theorem",
          latex: String.raw`n = F_{k_1} + F_{k_2} + \cdots + F_{k_r}, \qquad k_i \ge k_{i+1} + 2`,
          description: String.raw`Every positive integer has a unique representation as a sum of non-consecutive Fibonacci numbers, with no two adjacent $F_i$. It is built greedily by repeatedly subtracting the largest Fibonacci number $\le n$. This gives a canonical "Fibonacci base," underlies Fibonacci nim and Wythoff's game, and turns "represent $n$ with Fibonacci numbers" counting problems into digit arguments on the Zeckendorf string.`,
          keywords: ["zeckendorf", "fibonacci representation", "non consecutive fibonacci", "fibonacci base", "greedy fibonacci", "wythoff", "unique representation"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "floor-sum-reciprocity",
          name: "Floor-Sum Reciprocity",
          latex: String.raw`\sum_{k=1}^{q-1} \left\lfloor \frac{kp}{q} \right\rfloor = \frac{(p-1)(q-1)}{2} \qquad (\gcd(p, q) = 1)`,
          latexPlain: String.raw`\left\lfloor \frac{p}{q} \right\rfloor + \left\lfloor \frac{2p}{q} \right\rfloor + \cdots + \left\lfloor \frac{(q-1)p}{q} \right\rfloor = \frac{(p-1)(q-1)}{2} \qquad (\gcd(p, q) = 1)`,
          description: String.raw`The floors count lattice points under the diagonal of a $p \times q$ rectangle — and by symmetry the diagonal (which hits no interior lattice point when $\gcd = 1$) splits the $(p-1)(q-1)$ interior points evenly. Equivalently $\lfloor \frac{kp}{q} \rfloor + \lfloor \frac{(q-k)p}{q} \rfloor = p - 1$ pairs terms.`,
          keywords: ["floor sum", "lattice points under line", "reciprocity", "diagonal"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        }
      ]
    }
  ]
});
