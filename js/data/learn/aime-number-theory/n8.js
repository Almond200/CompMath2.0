// Learn, AIME Number Theory, chapter N8: number theory extensions (Extension; CONVENTIONS §14).
// Never a prerequisite in the core sequence. Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N8"] = {
  lessons: {
    "N8.1": {
      prereq: ["prime-divides-binomial", "multiplicative-order"],
      cards: [],
      body: String.raw`This chapter goes beyond the core of AIME number theory. Its tools each solve a few contest problems very quickly: Lucas's theorem for binomial coefficients modulo a prime, Hensel lifting from a prime to its powers, primitive roots and quadratic reciprocity, and a group of results on special equations and fractions, among them Pell equations, sums of squares and Farey sequences.

Lucas's theorem computes $\binom nk$ modulo a prime $p$ digit by digit: write $n$ and $k$ in base $p$, and multiply the binomial coefficients of matching digits. In particular $\binom nk$ is odd exactly when every binary digit $1$ of $k$ is also a $1$ of $n$, so row $20 = 10100_2$ of Pascal's triangle has $2^2 = 4$ odd entries.

A solution of a congruence modulo a prime can usually be lifted to the powers of that prime, one power at a time, by solving a linear congruence for the next digit; this is Hensel lifting. A primitive root modulo $p$ is a number whose order is $p - 1$, so its powers run through every nonzero remainder; $3$ is one modulo $7$. Quadratic reciprocity relates whether $p$ is a square modulo $q$ to whether $q$ is a square modulo $p$.

The last lesson collects results that each settle one kind of equation: the Pell equation $x^2 - dy^2 = 1$, whose solutions come from powers of the smallest one; which numbers are sums of two or of three squares; Möbius inversion for sums over divisors; and the Farey fractions, where neighbors $\tfrac ab \lt \tfrac cd$ satisfy $bc - ad = 1$.

The lessons take these ideas in turn: Lucas's theorem (N8.2), Hensel lifting (N8.3), primitive roots and reciprocity (N8.4), and Diophantine methods beyond the core (N8.5). The Summary (N8.6) collects the strategies.`,
      exercises: [
        { q: String.raw`How many entries of row $20$ of Pascal's triangle, $\binom{20}{0}, \ldots, \binom{20}{20}$, are odd?`, answer: "4",
          solution: String.raw`By Lucas's theorem, $\binom{20}{k}$ is odd exactly when the binary digits $1$ of $k$ are among those of $20 = 10100_2$. So $k$ is a sum of a subset of $\{16, 4\}$: $k = 0, 4, 16, 20$, four entries.` },
        { q: String.raw`Find the remainder when $\binom{100}{25}$ is divided by $3$.`, answer: "0",
          solution: String.raw`In base $3$, $100 = 10201_3$ and $25 = 00221_3$. Lucas's theorem multiplies the binomial coefficients of matching digits, and in the $3^1$ place the digit of $25$ is $2$ while that of $100$ is $0$, giving $\binom02 = 0$. So the remainder is $0$.` },
        { q: String.raw`What is the smallest primitive root modulo $7$?`, answer: "3",
          solution: String.raw`A primitive root has order $6$. The powers of $2$ are $2, 4, 1$, so $2$ has order $3$. The powers of $3$ are $3, 2, 6, 4, 5, 1$, every nonzero remainder, so $3$ has order $6$ and is the smallest primitive root.` }
      ],
      problems: [
        "2018 AMC 12B, Problem 17",
        "2011 AMC 12B, Problem 19"
      ]
    },
    "N8.2": {
      prereq: ["prime-divides-binomial", "base-conversion"],
      cards: ["lucas-theorem", "kummers-theorem", "pascal-parity"],
      body: String.raw`Binomial coefficients modulo a prime are governed by the base-$p$ digits of their arguments. Row $100$ of Pascal's triangle has exactly $8$ odd entries, because $100$ has three $1$s in binary; $\binom{100}{50}$ is divisible by $2^3$ and no higher power, because adding $50 + 50$ in binary makes three carries. Both facts are instances of two theorems that read binomial coefficients digit by digit.

[[lucas-theorem|Lucas's theorem]] says that $\binom mn \equiv \prod_i \binom{m_i}{n_i} \pmod p$, where $m_i$ and $n_i$ are the base-$p$ digits of $m$ and $n$. It comes from the freshman's dream: $(1 + x)^{p} \equiv 1 + x^p$, so $(1 + x)^m = \prod_i \left( (1 + x)^{p^i} \right)^{m_i} \equiv \prod_i (1 + x^{p^i})^{m_i}$, and the coefficient of $x^n$ on the right picks one term from each factor, the one with exponent $n_i p^i$. A factor $\binom{m_i}{n_i}$ is $0$ whenever $n_i > m_i$, so $\binom{10}{3} \equiv 0 \pmod 3$: in base $3$, $10 = 101_3$ and $3 = 010_3$, and the middle digit of $3$ exceeds that of $10$. Modulo $2$ every factor is $0$ or $1$, so $\binom mn$ is odd exactly when every binary $1$ of $n$ sits where $m$ also has a $1$; for each $1$ of $m$ the digit of $n$ is free, which gives [[pascal-parity|$2^{s_2(m)}$ odd entries in row $m$]].

[[kummers-theorem|Kummer's theorem]] gives the exact power: $v_p\binom{m + n}{m}$ equals the number of carries when $m$ and $n$ are added in base $p$. This is the floor-sum formula of (N4.4) read digit by digit, since each term of that sum is $1$ exactly when the corresponding digit position carries. For $50 + 50 = 100$ in binary, $110010 + 110010 = 1100100$ carries three times, so $v_2\binom{100}{50} = 3$.

These tools matter when a problem works modulo a prime with Pascal's triangle, as in counting the ways to fill a triangle's bottom row so that its top entry is divisible by $3$.`,
      related: [
        { card: "prime-divides-binomial", note: String.raw`the case $\binom pk$, and the Legendre-sum formula that Kummer refines ((N4.4)).` },
        { card: "freshmans-dream", note: String.raw`$(1 + x)^p \equiv 1 + x^p$, the identity behind Lucas's theorem ((N7.3)).` },
        { card: "base-conversion", note: String.raw`writing $m$ and $n$ in base $p$ ((N6.2)).` }
      ],
      exercises: [
        { q: String.raw`How many entries of row $100$ of Pascal's triangle ($\binom{100}{0}$ to $\binom{100}{100}$) are odd?`, answer: "8",
          solution: String.raw`$100 = 1100100_2$ has three $1$s, so there are $2^3 = 8$ odd entries: $\binom{100}{k}$ is odd exactly when the binary $1$s of $k$ lie among the positions of the $1$s of $100$.` },
        { q: String.raw`Find the remainder when $\binom{10}{3}$ is divided by $3$, using Lucas's theorem.`, answer: "0",
          solution: String.raw`In base $3$, $10 = 101_3$ and $3 = 010_3$. Lucas gives $\binom10\binom01\binom10$, and $\binom01 = 0$. So $\binom{10}{3} \equiv 0 \pmod 3$; indeed $\binom{10}{3} = 120$.` },
        { q: String.raw`Find $v_2\binom{100}{50}$ by counting carries.`, answer: "3",
          solution: String.raw`$50 = 110010_2$. Adding $110010 + 110010$: the $1$s in positions $1$, $4$, and $5$ each produce a carry, and the carries land on positions where no new carry starts, giving $1100100_2 = 100$ with three carries. By Kummer, $v_2\binom{100}{50} = 3$.` }
      ],
      problems: ["2007 AIME II, Problem 13"]
    },
    "N8.3": {
      prereq: ["crt", "fermats-little-theorem"],
      cards: ["hensel-lifting", "lagrange-roots-mod-p"],
      body: String.raw`Solving a polynomial congruence modulo a prime power, such as $n^3 \equiv 888 \pmod{1000}$, starts modulo the prime and then climbs one power at a time. The climbing step is [[hensel-lifting|Hensel lifting]]: a solution modulo $p$ at which the derivative is not $0$ modulo $p$ extends to exactly one solution modulo $p^2$, then $p^3$, and so on. Combined with the Chinese Remainder Theorem, it solves any polynomial congruence modulo any number.

Suppose $f(a) \equiv 0 \pmod{p^k}$ and we look for a solution $a + tp^k$ modulo $p^{k+1}$. Expanding, $f(a + tp^k) \equiv f(a) + t p^k f'(a) \pmod{p^{k+1}}$, since the higher terms carry $p^{2k}$. Dividing by $p^k$, the condition is $\tfrac{f(a)}{p^k} + t f'(a) \equiv 0 \pmod p$, a linear congruence in $t$ with exactly one solution when $f'(a) \not\equiv 0$. For $x^2 \equiv -1 \pmod{25}$, the solution $x \equiv 2 \pmod 5$ lifts to $x \equiv 7$, and $x \equiv 3$ lifts to $x \equiv 18$. For $n^3 \equiv 888 \pmod{1000}$, the congruence splits into $n^3 \equiv 0 \pmod 8$ and $n^3 \equiv 13 \pmod{125}$, the second is lifted from $5$ to $25$ to $125$, and the smallest positive solution is $192$.

How many roots can there be in the first place? [[lagrange-roots-mod-p|Lagrange's theorem]] says that a polynomial of degree $d$, not all of whose coefficients are divisible by the prime $p$, has at most $d$ roots modulo $p$, for the same reason as over the real numbers: each root splits off a linear factor, and modulo a prime a product is $0$ only if a factor is. So $x^3 \equiv 1 \pmod 7$ has at most three roots, and it has exactly three, $1$, $2$, and $4$. The theorem fails for composite moduli: $x^2 \equiv 1 \pmod 8$ has four roots.

The signal is a polynomial congruence modulo a prime power or a number with large prime-power factors, especially one asking for the smallest positive solution.`,
      related: [
        { card: "crt", note: String.raw`splitting the modulus into prime powers before lifting (N2.5).` },
        { card: "crt-solution-counting", note: String.raw`counting solutions as a product over prime powers, where Hensel gives each count (N2.6).` },
        { card: "lte-lemma", note: String.raw`a lifting argument for valuations of $a^n - b^n$ ((N4.5)).` }
      ],
      exercises: [
        { q: String.raw`List the solutions of $x^2 \equiv -1 \pmod{25}$ with $0 \le x < 25$.`, answer: "7, 18",
          solution: String.raw`Modulo $5$, $x \equiv 2$ or $3$. Lifting $2$: try $x = 2 + 5t$, $x^2 + 1 = 5 + 20t + 25t^2 \equiv 5(1 + 4t) \pmod{25}$, so $1 + 4t \equiv 0 \pmod 5$, $t \equiv 1$, and $x = 7$ ($49 + 1 = 50$). By symmetry the other is $-7 \equiv 18$.` },
        { q: String.raw`What is the smallest positive integer $n$ with $n^3 \equiv 888 \pmod{1000}$?`, answer: "192",
          solution: String.raw`Modulo $8$: $n^3 \equiv 0$ needs $n$ even. Modulo $125$: $n^3 \equiv 13$; modulo $5$, $n^3 \equiv 3$ gives $n \equiv 2$, which lifts to $n \equiv 17 \pmod{25}$ and then $n \equiv 67 \pmod{125}$. The even numbers $\equiv 67 \pmod{125}$ are $192, 442, \ldots$, and $192^3 = 7077888$ ends in $888$.` },
        { q: String.raw`How many solutions does $x^3 \equiv 1 \pmod 7$ have with $0 \le x < 7$?`, answer: "3",
          solution: String.raw`By Lagrange there are at most $3$. Checking: $1^3 = 1$, $2^3 = 8 \equiv 1$, $4^3 = 64 \equiv 1$, while $3, 5, 6$ give $6$. So exactly $3$.` }
      ],
      problems: ["2022 AMC 10B, Problem 25", "1988 AIME, Problem 9", "2024 AIME I, Problem 13"]
    },
    "N8.4": {
      prereq: ["multiplicative-order", "eulers-criterion"],
      cards: ["primitive-roots", "quadratic-reciprocity"],
      body: String.raw`Modulo a prime $p$ there is always a single residue whose powers run through every nonzero residue; modulo $7$ the powers of $3$ are $3, 2, 6, 4, 5, 1$. Such a residue is a [[primitive-roots|primitive root]], and with one in hand every nonzero residue is a power of it, so multiplication modulo $p$ becomes addition of exponents modulo $p - 1$. The other structural fact of this lesson relates the question "is $p$ a square modulo $q$?" to the reverse question, which is [[quadratic-reciprocity|quadratic reciprocity]].

A primitive root modulo $p$ is a residue of order exactly $p - 1$. One always exists, and there are $\varphi(p - 1)$ of them: modulo $13$ there are $\varphi(12) = 4$. Primitive roots exist modulo $1$, $2$, $4$, $p^k$, and $2p^k$ for odd primes $p$, and modulo no other number. Their use in problems is to turn a statement about powers into one about exponents: $x^k \equiv a$ has a solution exactly when the exponent of $a$ is divisible by $\gcd(k, p - 1)$, and then it has $\gcd(k, p - 1)$ solutions. In particular exactly half the nonzero residues are squares, the even powers of the primitive root, which recovers (N7.2).

Quadratic reciprocity says that for distinct odd primes $p$ and $q$, $p$ is a square modulo $q$ exactly when $q$ is a square modulo $p$, unless both are $3 \pmod 4$, in which case exactly one of the two holds. With the companion rules that $-1$ is a square modulo $p$ exactly when $p \equiv 1 \pmod 4$ and $2$ is a square exactly when $p \equiv \pm 1 \pmod 8$, it decides any quadratic residue question by flipping and reducing. For instance, $5$ is a square modulo $11$ because $11 \equiv 1$ is a square modulo $5$; indeed $4^2 = 16 \equiv 5 \pmod{11}$. And $3$ is not a square modulo $7$: both are $3 \pmod 4$, so the answer is the opposite of whether $7 \equiv 1$ is a square modulo $3$, which it is.

These results rarely appear by name on the AIME, but they explain the patterns that problems about orders and residues rely on.`,
      related: [
        { card: "multiplicative-order", note: String.raw`a primitive root is a residue of the largest possible order (N3.4).` },
        { card: "eulers-criterion", note: String.raw`the test $a^{(p-1)/2} \equiv \pm 1$ that reciprocity speeds up ((N7.2)).` },
        { card: "eulers-totient", note: String.raw`there are $\varphi(p - 1)$ primitive roots modulo $p$ (N3.5).` }
      ],
      exercises: [
        { q: String.raw`What is the order of $3$ modulo $7$? (If it is $6$, then $3$ is a primitive root.)`, answer: "6",
          solution: String.raw`The powers of $3$ modulo $7$ are $3, 2, 6, 4, 5, 1$, so the order is $6 = 7 - 1$ and $3$ is a primitive root modulo $7$.` },
        { q: String.raw`How many primitive roots are there modulo $13$?`, answer: "4",
          solution: String.raw`There are $\varphi(13 - 1) = \varphi(12) = 4$ of them. (They are $2, 6, 7, 11$.)` },
        { q: String.raw`List the nonzero quadratic residues modulo $11$, and check that $5$ is among them.`, answer: "1, 3, 4, 5, 9",
          solution: String.raw`Squaring $1, \ldots, 5$ modulo $11$: $1, 4, 9, 16 \equiv 5, 25 \equiv 3$. So the residues are $1, 3, 4, 5, 9$, and $5$ is one of them, as reciprocity predicts.` }
      ],
      problems: []
    },
    "N8.5": {
      prereq: ["sum-of-two-squares", "bounding-diophantine"],
      cards: ["pell-equation", "binary-quadratic-forms", "sum-of-three-squares", "gaussian-integers", "zeckendorf-theorem", "mobius-inversion", "bertrands-postulate", "farey-sequences"],
      body: String.raw`A handful of results sit just beyond the usual AIME toolkit but appear often enough in harder problems and olympiads to be worth knowing by their shape. The most useful is the Pell equation $x^2 - 2y^2 = 1$, whose solutions $(3, 2)$, $(17, 12)$, $(99, 70)$ grow by a fixed rule and explain why the square triangular numbers $1$, $36$, $1225$, $41616$ are so rare.

A [[pell-equation|Pell equation]] $x^2 - Dy^2 = 1$, for a positive non-square $D$, has infinitely many solutions in positive integers, all generated from the smallest one $(x_1, y_1)$ by $x_n + y_n\sqrt D = (x_1 + y_1 \sqrt D)^n$. For $D = 2$, $(3 + 2\sqrt2)^2 = 17 + 12\sqrt2$. A question such as "which triangular numbers are squares" becomes Pell after completing the square: $\tfrac{n(n+1)}{2} = m^2$ gives $(2n + 1)^2 - 8m^2 = 1$. More general [[binary-quadratic-forms|quadratic forms]] $ax^2 + bxy + cy^2$ are studied the same way, by the values they can take.

Sums of squares extend from two to three. A number is a [[sum-of-three-squares|sum of three squares]] unless it has the form $4^a(8b + 7)$; up to $100$ that excludes $15$ numbers, starting with $7$, $15$, $23$, and $28$. The two-square theorem of (N5.5) has a cleaner proof in the [[gaussian-integers|Gaussian integers]] $a + bi$, where $a^2 + b^2 = (a + bi)(a - bi)$ and primes $\equiv 1 \pmod 4$ split into two conjugate factors.

Four further results each answer one kind of question. [[zeckendorf-theorem|Zeckendorf's theorem]]: every positive integer is uniquely a sum of non-consecutive Fibonacci numbers, as $100 = 89 + 8 + 3$. [[mobius-inversion|Möbius inversion]] recovers a function from its sums over divisors, with $\mu(n)$ equal to $(-1)^k$ for a product of $k$ distinct primes and $0$ otherwise, so $\mu(30) = -1$; it is how $\varphi$ is counted by inclusion and exclusion. [[bertrands-postulate|Bertrand's postulate]] guarantees a prime between $n$ and $2n$. The [[farey-sequences|Farey sequence]] of order $n$ lists the reduced fractions in $[0, 1]$ with denominators up to $n$, $1 + \sum_{k \le n} \varphi(k)$ of them, and neighbors $\tfrac ab < \tfrac cd$ in it satisfy $bc - ad = 1$. The Summary (N8.6) collects the chapter's strategies.`,
      related: [
        { card: "sum-of-two-squares", note: String.raw`the two-square theorem that Gaussian integers prove and three squares extend ((N5.5)).` },
        { card: "eulers-totient", note: String.raw`the count of Farey fractions, and the function Möbius inversion recovers (N3.5).` },
        { card: "triangular-numbers", note: String.raw`square triangular numbers, the classic source of a Pell equation.` }
      ],
      exercises: [
        { q: String.raw`Find the solution of $x^2 - 2y^2 = 1$ in positive integers that comes after $(3, 2)$ and $(17, 12)$; give $x$.`, answer: "99",
          solution: String.raw`$(3 + 2\sqrt2)^3 = (17 + 12\sqrt2)(3 + 2\sqrt2) = 51 + 34\sqrt2 + 36\sqrt2 + 48 = 99 + 70\sqrt2$, so the next solution is $(99, 70)$. Check: $99^2 - 2 \cdot 70^2 = 9801 - 9800 = 1$.` },
        { q: String.raw`How many integers from $1$ to $100$ are not sums of three squares of integers?`, answer: "15",
          solution: String.raw`The exceptions are the numbers $4^a(8b + 7)$. With $a = 0$: $7, 15, \ldots, 95$, which is $12$ numbers. With $a = 1$: $28, 60, 92$, three more. With $a = 2$: $112 > 100$. So $15$ numbers.` },
        { q: String.raw`How many fractions are in the Farey sequence of order $5$ (the reduced fractions in $[0, 1]$ with denominator at most $5$, including $\tfrac01$ and $\tfrac11$)?`, answer: "11",
          solution: String.raw`The count is $1 + \varphi(1) + \varphi(2) + \varphi(3) + \varphi(4) + \varphi(5) = 1 + 1 + 1 + 2 + 2 + 4 = 11$: $\tfrac01, \tfrac15, \tfrac14, \tfrac13, \tfrac25, \tfrac12, \tfrac35, \tfrac23, \tfrac34, \tfrac45, \tfrac11$.` }
      ],
      problems: ["2022 AMC 10A, Problem 25", "2022 AMC 12A, Problem 16"]
    },
    "N8.6": {
      prereq: ["lucas-theorem", "pascal-parity", "hensel-lifting", "primitive-roots", "quadratic-reciprocity", "pell-equation", "sum-of-three-squares", "farey-sequences"],
      cards: [],
      body: String.raw`[[lucas-theorem|Lucas's theorem]] computes $\binom nk$ modulo a prime from the base-$p$ digits of $n$ and $k$, and [[pascal-parity|the odd entries of Pascal's triangle]] are those where $k$'s binary digits sit inside $n$'s, so row $n$ has $2^{s}$ odd entries, $s$ the number of binary $1$s of $n$.

[[hensel-lifting|Hensel lifting]] carries a root modulo $p$ to a root modulo $p^2$, $p^3$, and so on, when the derivative is not $0$ modulo $p$. [[primitive-roots|A primitive root]] modulo $p$ has order $p - 1$ and turns multiplication into addition of exponents; [[quadratic-reciprocity|quadratic reciprocity]] decides whether one prime is a square modulo another.

[[pell-equation|The Pell equation]] $x^2 - dy^2 = 1$ has all its solutions from powers of the smallest, $x + y\sqrt d$. A number is [[sum-of-three-squares|a sum of three squares]] unless it has the form $4^a(8b + 7)$. [[farey-sequences|Farey neighbors]] $\tfrac ab \lt \tfrac cd$ satisfy $bc - ad = 1$, and the fraction with the smallest denominator between them is the mediant $\tfrac{a + c}{b + d}$.`,
      strategies: [
        String.raw`For a binomial coefficient modulo a small prime, write the numbers in that base and use Lucas's theorem.`,
        String.raw`For the parity of binomial coefficients, compare binary digits.`,
        String.raw`To solve a congruence modulo $p^k$, solve it modulo $p$ first, then lift one power at a time.`,
        String.raw`Modulo a prime, write every nonzero remainder as a power of a primitive root, and solve in the exponents.`,
        String.raw`For $x^2 - dy^2 = 1$, find the smallest solution by trying small $y$, then generate the rest from its powers.`,
        String.raw`To rule out a sum of three squares, look modulo $8$ after dividing out factors of $4$.`,
        String.raw`For the fraction with the smallest denominator between two fractions, take mediants.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many odd numbers are in rows $0$ to $15$ of Pascal's triangle?`, answer: "81",
        solution: String.raw`Row $n$ has $2^{s(n)}$ odd entries, where $s(n)$ is the number of binary $1$s of $n$. The rows $0$ to $15$ are the $4$-digit binary strings, and summing $2^{s}$ over them chooses, for each digit, $0$ (one way) or $1$ (two ways): $(1 + 2)^4 = 81$.` },
      { q: String.raw`Is $\binom{2026}{1000}$ odd or even?`,
        solution: String.raw`Odd. In binary $2026 = 11111101010_2$ and $1000 = 01111101000_2$, and every $1$ of $1000$ is also a $1$ of $2026$, so by Lucas's theorem $\binom{2026}{1000} \equiv 1 \pmod 2$.` },
      { q: String.raw`Find every $x$ from $0$ to $48$ with $x^2 \equiv 2 \pmod{49}$.`, answer: "10, 39",
        solution: String.raw`Modulo $7$, $x^2 \equiv 2$ gives $x \equiv 3$ or $4$. Lift $x = 3 + 7t$: $x^2 = 9 + 42t + 49t^2 \equiv 9 + 42t \pmod{49}$, and $9 + 42t \equiv 2$ means $42t \equiv -7$, that is, $6t \equiv -1 \equiv 6 \pmod 7$, so $t = 1$ and $x = 10$. The other root is $-10 \equiv 39$. Check: $10^2 = 100 = 2 \cdot 49 + 2$.` },
      { q: String.raw`How many primitive roots are there modulo $13$?`, answer: "4",
        solution: String.raw`If $g$ is one primitive root, the others are $g^k$ with $\gcd(k, 12) = 1$, so there are $\varphi(12) = 4$. They are $2, 6, 7, 11$.` },
      { q: String.raw`The smallest solution of $x^2 - 2y^2 = 1$ in positive integers is $(3, 2)$. Find the next.`, answer: "17, 12",
        solution: String.raw`Square $3 + 2\sqrt2$: $(3 + 2\sqrt2)^2 = 9 + 12\sqrt2 + 8 = 17 + 12\sqrt2$. So the next solution is $(17, 12)$; check $289 - 2 \cdot 144 = 1$.` },
      { q: String.raw`How many fractions are in the Farey sequence of order $7$, the reduced fractions in $[0, 1]$ with denominator at most $7$?`, answer: "19",
        solution: String.raw`The count is $1 + \varphi(1) + \varphi(2) + \cdots + \varphi(7) = 1 + 1 + 1 + 2 + 2 + 4 + 2 + 6 = 19$: the fraction $\tfrac01$, then for each denominator $b$ the numerators coprime to $b$ from $1$ to $b$.` },
      { q: String.raw`How many of the numbers $1, \ldots, 50$ are not sums of three squares of integers?`, answer: "7",
        solution: String.raw`By the three-square theorem the exceptions are the numbers $4^a(8b + 7)$. Up to $50$: $7, 15, 23, 31, 39, 47$ with $a = 0$, and $28 = 4 \cdot 7$. That is $7$ numbers.` }
    ],
    problems: [
      "2021 Spring AMC 12B, Problem 25"
    ]
  },
  challenge: {
    exercises: [
      { q: String.raw`How many of the numbers $1, \ldots, 100$ are sums of two squares of integers?`, answer: "43",
        solution: String.raw`A positive integer is a sum of two squares exactly when every prime of the form $4k + 3$ divides it to an even power. Removing from $1, \ldots, 100$ the numbers with an odd power of $3$, $7$, $11$, $19$, $23$, $31$, $43$, $47$, $59$, $67$, $71$, $79$ or $83$ leaves $43$ numbers; listing $a^2 + b^2 \le 100$ with $0 \le a \le b \le 10$ gives the same $43$.` },
      { q: String.raw`How many fractions $\tfrac ab$ in lowest terms satisfy $0 \lt \tfrac ab \lt 1$ and $b \le 20$?`, answer: "127",
        solution: String.raw`For each denominator $b \ge 2$ the numerators are the $a$ from $1$ to $b - 1$ coprime to $b$, $\varphi(b)$ of them. The sum $\varphi(2) + \cdots + \varphi(20)$ is $1 + 2 + 2 + 4 + 2 + 6 + 4 + 6 + 4 + 10 + 4 + 12 + 6 + 8 + 8 + 16 + 6 + 18 + 8 = 127$.` }
    ],
    problems: [
      "2011 AIME I, Problem 15"
    ]
  }
};
