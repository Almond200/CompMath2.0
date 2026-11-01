// Learn, Olympiad Number Theory, chapter D2: primes, valuations and special numbers (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["D2"] = {
  lessons: {
    "D2.1": {
      prereq: ["legendres-formula", "multiplicative-order", "fermats-little-theorem"],
      cards: [],
      body: String.raw`Which primes divide a binomial coefficient, and how often? Which primes divide $a^n - b^n$ for the first time at exponent $n$? Which numbers fool Fermat's test? This chapter collects the results about special primes and special numbers that olympiad number theory uses most: Kummer's carries, Zsigmondy's primitive divisors, Wolstenholme's congruence, cyclotomic polynomials, Fermat numbers and Carmichael numbers.

The power of $2$ in $\binom{10}{5} = 252 = 4 \cdot 63$ is $2$, and adding $5 + 5$ in base $2$, $101 + 101$, makes exactly two carries. The Fermat numbers $2^{2^n} + 1$ are $3, 5, 17, 257, 65537$ for $n = 0$ to $4$, all prime, but $2^{32} + 1 = 641 \cdot 6700417$. And $561 = 3 \cdot 11 \cdot 17$ is composite, yet $a^{560} \equiv 1 \pmod{561}$ for every $a$ coprime to it.

The lessons are primes in binomials and Zsigmondy (D2.2), and cyclotomic polynomials and Fermat numbers (D2.3). The Summary (D2.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the power of $2$ in $\binom{10}{5}$, and count the carries when $5 + 5$ is added in base $2$.`, answer: "2",
          solution: String.raw`$\binom{10}{5} = 252 = 2^2 \cdot 63$. In base $2$, $5 = 101_2$, and $101 + 101$: the units give $1 + 1 = 10$, a carry; the twos give $0 + 0 + 1 = 1$; the fours give $1 + 1 = 10$, a carry. Two carries, matching the exponent $2$.` },
        { q: String.raw`Show that $2^{32} + 1$ is divisible by $641$.`,
          solution: String.raw`$641 = 5 \cdot 2^7 + 1 = 5^4 + 2^4$. From the first, $5 \cdot 2^7 \equiv -1$, so $5^4 \cdot 2^{28} \equiv 1$. From the second, $5^4 \equiv -2^4$, so $-2^4 \cdot 2^{28} \equiv 1$, that is, $2^{32} \equiv -1 \pmod{641}$.` }
      ],
      problems: []
    },
    "D2.2": {
      prereq: ["legendres-formula", "multiplicative-order", "lte"],
      cards: ["kummers-theorem", "zsygmondy", "wolstenholme"],
      body: String.raw`How many factors of $3$ are in $\binom{100}{50}$? Why is $\binom{2n}{n}$ even for every $n \ge 1$? Does $2^n - 1$ always have a prime factor that no smaller $2^k - 1$ has? Why is $\binom{2p}{p} - 2$ divisible by $p^3$? Three results about primes and exponents.

[[kummers-theorem|Kummer's theorem]] says that the power of a prime $p$ in $\binom{m + n}{m}$ is the number of carries when $m$ and $n$ are added in base $p$. It follows from Legendre's formula: $v_p\binom{m + n}{m} = \tfrac{s_p(m) + s_p(n) - s_p(m + n)}{p - 1}$, with $s_p$ the digit sum in base $p$, and each carry lowers the digit sum of the total by $p - 1$. So $\binom{2n}{n}$ is even, since adding $n$ to itself in base $2$ carries at its lowest $1$ digit. In base $3$, $50 = 1212_3$, and adding $1212 + 1212$ carries at every one of its four places, so $3^4 \parallel \binom{100}{50}$. A binomial coefficient is not divisible by $p$ exactly when no addition carries, which is Lucas's theorem in another form.

[[zsygmondy|Zsigmondy's theorem]] says that for coprime $a \gt b \ge 1$ and $n \ge 2$, the number $a^n - b^n$ has a prime factor that divides no $a^k - b^k$ with $k \lt n$, a primitive prime divisor, except for $2^6 - 1 = 63 = 3^2 \cdot 7$ and the case $n = 2$, $a + b$ a power of $2$. For $2^n - 1$ with $n = 2, \ldots, 12$ the primitive divisors are $3, 7, 5, 31$, none, $127, 17, 73, 11, 23$ and $89$, and $13$. It turns equations such as $a^n - 1 = $ a power of a fixed prime into a short list: a new prime must appear, so the exponent is bounded. Olympiad solutions may quote it, but they usually check the exceptions explicitly.

[[wolstenholme|Wolstenholme's theorem]] says that $\binom{2p}{p} \equiv 2 \pmod{p^3}$ for primes $p \ge 5$, as $252 - 2 = 2 \cdot 5^3$ and $3432 - 2 = 10 \cdot 7^3$ confirm. The weaker congruence modulo $p^2$ follows from Vandermonde: $\binom{2p}{p} = \sum_k\binom pk^2$, and every term except $k = 0$ and $k = p$ is a multiple of $p^2$, since $p \mid \binom pk$ for $0 \lt k \lt p$.

Count carries for a prime in a binomial coefficient, look for a new prime factor with Zsigmondy, and expand with Vandermonde for congruences of central binomial coefficients. The next lesson factors $x^n - 1$.`,
      related: [
        { card: "lucas-theorem", note: String.raw`binomial coefficients modulo $p$, digit by digit.` },
        { card: "lte", note: String.raw`the exact power of $p$ in $a^n - b^n$.` },
        { card: "vandermonde", note: String.raw`the sum of squared binomial coefficients behind the congruence modulo $p^2$.` }
      ],
      exercises: [
        { q: String.raw`What is the largest power of $3$ dividing $\binom{100}{50}$?`, answer: "4",
          solution: String.raw`By Kummer, count the carries in $50 + 50$ in base $3$. Since $50 = 1212_3$, the places give $2 + 2 = 11_3$ (carry), $1 + 1 + 1 = 10_3$ (carry), $2 + 2 + 1 = 12_3$ (carry), $1 + 1 + 1 = 10_3$ (carry). Four carries, so $3^4$.` },
        { q: String.raw`Prove that $\binom{2n}{n}$ is even for every $n \ge 1$.`,
          solution: String.raw`Let $2^k$ be the lowest power of $2$ in the binary expansion of $n$. Adding $n + n$ in base $2$, the digit $1$ in place $k$ gives $1 + 1 = 10_2$, a carry. So there is at least one carry, and by Kummer's theorem $2 \mid \binom{2n}{n}$.` },
        { q: String.raw`Prove that $\binom{2p}{p} \equiv 2 \pmod{p^2}$ for every prime $p$.`,
          solution: String.raw`By Vandermonde's identity, $\binom{2p}{p} = \sum_{k=0}^{p}\binom pk\binom p{p-k} = \sum_{k=0}^{p}\binom pk^2$. For $0 \lt k \lt p$, $\binom pk = \tfrac{p!}{k!(p - k)!}$ is a multiple of $p$, since $p$ divides the numerator but not the denominator, so its square is a multiple of $p^2$. The terms $k = 0$ and $k = p$ are $1$ each.` },
        { q: String.raw`Find all positive integers $n$ for which $2^n - 1$ is a power of $3$.`,
          solution: String.raw`$n = 1$ gives $1 = 3^0$ and $n = 2$ gives $3$. For $n \ge 3$, Zsigmondy gives a prime factor of $2^n - 1$ that does not divide $2^2 - 1 = 3$, unless $n = 6$; and $2^6 - 1 = 63 = 9 \cdot 7$ is not a power of $3$. Directly: $3 \mid 2^n - 1$ needs $n$ even, $n = 2m$, and then $2^n - 1 = (2^m - 1)(2^m + 1)$, two factors that differ by $2$ and must both be powers of $3$, which forces $2^m - 1 = 1$, $m = 1$. So $n = 1, 2$.` }
      ],
      problems: []
    },
    "D2.3": {
      prereq: ["multiplicative-order", "fermats-little-theorem", "euclidean-algorithm"],
      cards: ["cyclotomic-polynomials", "fermat-numbers", "carmichael-numbers", "dirichlet-primes-progression"],
      body: String.raw`How does $x^6 - 1$ factor over the integers? Why are any two Fermat numbers coprime? Why does $561$ pass Fermat's test for every base? Why are there infinitely many primes $p \equiv 1 \pmod 3$? The polynomial $x^n - 1$ and its factors organize the answers.

[[cyclotomic-polynomials|The cyclotomic polynomial]] $\Phi_n(x)$ has as roots the primitive $n$th roots of unity, and $x^n - 1 = \prod_{d \mid n}\Phi_d(x)$, since every $n$th root of unity is a primitive $d$th root for exactly one $d \mid n$. So $x^6 - 1 = \Phi_1\Phi_2\Phi_3\Phi_6 = (x - 1)(x + 1)(x^2 + x + 1)(x^2 - x + 1)$. The key arithmetic fact: if a prime $q$ divides $\Phi_n(a)$ and not $n$, then $a$ has order exactly $n$ modulo $q$, so $q \equiv 1 \pmod n$. For $n = 3$: a prime factor $q$ of $m^2 + m + 1$ with $q \ne 3$ has $m^3 \equiv 1$ and $m \not\equiv 1$, so $3 \mid q - 1$. Applied to $m = 3P$ with $P$ the product of known primes $1 \pmod 3$, it produces a new one, a special case of [[dirichlet-primes-progression|Dirichlet's theorem]] that every progression $a, a + m, a + 2m, \ldots$ with $\gcd(a, m) = 1$ holds infinitely many primes. The general theorem may be quoted but not reproved in a contest; the cases $1 \pmod n$ have the elementary proof above.

[[fermat-numbers|The Fermat numbers]] $F_n = 2^{2^n} + 1$ satisfy $F_0F_1\cdots F_{n-1} = F_n - 2$, by repeated use of $(x - 1)(x + 1) = x^2 - 1$. So a common factor of $F_m$ and $F_n$, $m \lt n$, divides $2$, and since they are odd, they are coprime; this gives another proof that there are infinitely many primes. A prime factor of $F_n$ has $2$ of order $2^{n+1}$, so it is $1 \pmod{2^{n+1}}$, which is how $641 = 5 \cdot 2^7 + 1$ is found as a factor of $F_5$.

[[carmichael-numbers|Carmichael numbers]] are composite $n$ with $a^{n-1} \equiv 1 \pmod n$ for every $a$ coprime to $n$. Korselt's criterion: $n$ is squarefree and $p - 1 \mid n - 1$ for every prime $p \mid n$. For $561 = 3 \cdot 11 \cdot 17$, $2$, $10$ and $16$ all divide $560$, so $a^{560} \equiv 1$ modulo each prime, hence modulo $561$. They show that Fermat's congruence alone cannot prove a number prime.

Factor $x^n - 1$ into cyclotomic pieces, use the order of $a$ modulo a prime factor of $\Phi_n(a)$, multiply Fermat numbers to see their coprimality, and test Korselt for Carmichael numbers. The Summary follows.`,
      related: [
        { card: "multiplicative-order", note: String.raw`the order whose value $n$ forces $q \equiv 1 \pmod n$.` },
        { card: "roots-of-unity", note: String.raw`the complex roots that define $\Phi_n$.` },
        { card: "eisenstein-criterion", note: String.raw`the irreducibility of $\Phi_p$, by a shift (E4.2).` }
      ],
      exercises: [
        { q: String.raw`Factor $x^6 - 1$ into polynomials with integer coefficients that cannot be factored further.`,
          solution: String.raw`$x^6 - 1 = \Phi_1\Phi_2\Phi_3\Phi_6 = (x - 1)(x + 1)(x^2 + x + 1)(x^2 - x + 1)$. Equivalently, $(x^3 - 1)(x^3 + 1)$ with each cube split. The quadratics have no real roots, so they do not factor further over the integers.` },
        { q: String.raw`Prove that any two different Fermat numbers are coprime.`,
          solution: String.raw`By induction, $F_0F_1\cdots F_{n-1} = F_n - 2$: it holds for $n = 1$ ($3 = 5 - 2$), and $(F_n - 2)F_n = (2^{2^n} - 1)(2^{2^n} + 1) = 2^{2^{n+1}} - 1 = F_{n+1} - 2$. If $d$ divides $F_m$ and $F_n$ with $m \lt n$, then $d$ divides $F_n - 2$ (a product including $F_m$) and $F_n$, so $d \mid 2$; Fermat numbers are odd, so $d = 1$.` },
        { q: String.raw`Prove that $561$ satisfies $a^{560} \equiv 1 \pmod{561}$ for every $a$ coprime to $561$.`,
          solution: String.raw`$561 = 3 \cdot 11 \cdot 17$. For $a$ coprime to $561$, Fermat gives $a^2 \equiv 1 \pmod 3$, $a^{10} \equiv 1 \pmod{11}$, $a^{16} \equiv 1 \pmod{17}$. Since $2$, $10$ and $16$ divide $560$, $a^{560} \equiv 1$ modulo $3$, $11$ and $17$, hence modulo their product $561$.` },
        { q: String.raw`Prove that there are infinitely many primes $q \equiv 1 \pmod 3$.`,
          solution: String.raw`Let $P$ be the product of any finite list of such primes, $m = 3P$, and $q$ a prime factor of $m^2 + m + 1$. Then $q \nmid m$, so $q \ne 3$ and $q$ is not in the list. Since $m^3 - 1 = (m - 1)(m^2 + m + 1)$, $m^3 \equiv 1 \pmod q$; and $m \not\equiv 1$, since then $m^2 + m + 1 \equiv 3 \not\equiv 0$. So $m$ has order $3$ modulo $q$, and $3 \mid q - 1$. This gives a new prime $1 \pmod 3$ beyond any list.` }
      ],
      problems: []
    },
    "D2.4": {
      prereq: ["kummers-theorem", "zsygmondy", "wolstenholme", "cyclotomic-polynomials", "fermat-numbers", "carmichael-numbers", "dirichlet-primes-progression"],
      cards: [],
      body: String.raw`[[kummers-theorem|Kummer's theorem]] counts carries for the power of $p$ in a binomial coefficient; [[zsygmondy|Zsigmondy's theorem]] gives $a^n - b^n$ a new prime, with two exceptions; [[wolstenholme|Wolstenholme's theorem]] makes $\binom{2p}{p} \equiv 2 \pmod{p^3}$.

[[cyclotomic-polynomials|Cyclotomic polynomials]] factor $x^n - 1$ and force prime factors $1 \pmod n$; [[fermat-numbers|Fermat numbers]] are pairwise coprime; [[carmichael-numbers|Carmichael numbers]] pass Fermat's test though composite; and [[dirichlet-primes-progression|Dirichlet's theorem]] puts infinitely many primes in every coprime progression.`,
      strategies: [
        String.raw`For the power of $p$ in $\binom nk$, add $k$ and $n - k$ in base $p$ and count carries.`,
        String.raw`When an equation says $a^n - b^n$ has only certain prime factors, look for a primitive prime divisor, and check Zsigmondy's exceptions.`,
        String.raw`Factor $x^n - 1$ into cyclotomic pieces, and use orders for their prime factors.`,
        String.raw`For infinitely many primes $1 \pmod n$, take a prime factor of $\Phi_n$ at a multiple of the known primes.`,
        String.raw`Test a Carmichael candidate with Korselt's criterion.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the largest power of $2$ dividing $100!$?`, answer: "97",
        solution: String.raw`By Legendre's formula, $50 + 25 + 12 + 6 + 3 + 1 = 97$; equivalently $\tfrac{100 - s_2(100)}{1} = 100 - 3 = 97$.` },
      { q: String.raw`What is $\Phi_4(x)$, and what does it say about the odd prime factors of $a^2 + 1$?`,
        solution: String.raw`$x^4 - 1 = (x - 1)(x + 1)(x^2 + 1)$, so $\Phi_4(x) = x^2 + 1$. An odd prime $q$ dividing $a^2 + 1$ has $a$ of order $4$ modulo $q$, so $4 \mid q - 1$: every odd prime factor of $a^2 + 1$ is $1 \pmod 4$.` },
      { q: String.raw`Prove that $\binom{p}{k}$ is divisible by $p$ for a prime $p$ and $0 \lt k \lt p$, using Kummer's theorem.`,
        solution: String.raw`In base $p$, $k$ and $p - k$ are single digits adding to $p = 10_p$, so the addition carries once. By Kummer, $p \mid \binom pk$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that $\gcd(2^a - 1, 2^b - 1) = 2^{\gcd(a, b)} - 1$ for positive integers $a$, $b$.`,
        solution: String.raw`If $a = qb + r$, then $2^a - 1 = 2^r(2^{qb} - 1) + (2^r - 1)$, and $2^b - 1 \mid 2^{qb} - 1$. So $\gcd(2^a - 1, 2^b - 1) = \gcd(2^b - 1, 2^r - 1)$: the exponents follow the Euclidean algorithm, which ends at $\gcd(a, b)$, giving $2^{\gcd(a,b)} - 1$.` },
      { q: String.raw`Prove that $\binom{p^n}{k}$ is divisible by $p$ for $0 \lt k \lt p^n$.`,
        solution: String.raw`In base $p$, $p^n = 100\ldots0_p$. Adding $k$ and $p^n - k$, both positive and less than $p^n$, the total has a $1$ in place $n$ that neither summand has, so a carry reaches place $n$. By Kummer, $p \mid \binom{p^n}{k}$.` },
      { q: String.raw`Prove that every prime factor of $F_n = 2^{2^n} + 1$ is $1 \pmod{2^{n+1}}$.`,
        solution: String.raw`Let $q \mid F_n$. Then $2^{2^n} \equiv -1$ and $2^{2^{n+1}} \equiv 1 \pmod q$, so the order of $2$ divides $2^{n+1}$ but not $2^n$: it is exactly $2^{n+1}$. By Fermat, the order divides $q - 1$, so $q \equiv 1 \pmod{2^{n+1}}$.` }
    ],
    problems: []
  }
};
