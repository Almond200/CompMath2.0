// Learn, Olympiad Number Theory, chapter D4: arithmetic functions and approximation (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["D4"] = {
  lessons: {
    "D4.1": {
      prereq: ["eulers-totient", "euclidean-algorithm", "floor-basics"],
      cards: [],
      body: String.raw`This chapter has three threads. Arithmetic functions such as Euler's $\varphi$ are combined by a product over divisors, which turns identities like $\sum_{d \mid n}\varphi(d) = n$ into algebra. Fractions are organized by the Farey sequences and continued fractions, which give the best approximations to a number and solve linear equations in integers. And sequences of the form $\lfloor n\alpha\rfloor$ split the integers in surprising ways, and their sums obey a reciprocity law.

The divisors of $12$ are $1, 2, 3, 4, 6, 12$, and their totients $1, 1, 2, 2, 2, 4$ add to $12$. The fractions $\tfrac25$ and $\tfrac12$ are neighbors among fractions with denominator at most $5$, and $5 \cdot 1 - 2 \cdot 2 = 1$. And $\lfloor n\sqrt2\rfloor$ gives $1, 2, 4, 5, 7, 8, \ldots$ while $\lfloor n(2 + \sqrt2)\rfloor$ gives $3, 6, 10, 13, 17, 20, \ldots$: together they contain every positive integer exactly once.

The lessons are Dirichlet convolution (D4.2), Farey sequences and continued fractions (D4.3), and Beatty sequences and floor sums (D4.4). The Summary (D4.5) collects the strategies.`,
      exercises: [
        { q: String.raw`Check that $\sum_{d \mid 12}\varphi(d) = 12$.`,
          solution: String.raw`The divisors are $1, 2, 3, 4, 6, 12$, with $\varphi$ values $1, 1, 2, 2, 2, 4$, which add to $12$.` },
        { q: String.raw`List the first six values of $\lfloor n\sqrt2\rfloor$ and of $\lfloor n(2 + \sqrt2)\rfloor$.`,
          solution: String.raw`With $\sqrt2 \approx 1.4142$: $1, 2, 4, 5, 7, 8$. With $2 + \sqrt2 \approx 3.4142$: $3, 6, 10, 13, 17, 20$. No number appears in both, and every number up to $8$ appears in one.` }
      ],
      problems: []
    },
    "D4.2": {
      prereq: ["eulers-totient", "number-of-divisors"],
      cards: ["totient-divisor-sum", "dirichlet-convolution"],
      body: String.raw`Why do the totients of the divisors of $n$ add to $n$? How is $\varphi(n) = n\prod(1 - \tfrac1p)$ recovered from that fact? How many reduced fractions in $(0, 1]$ have denominator at most $6$? Sums over divisors have an algebra of their own.

[[totient-divisor-sum|Gauss's totient sum]], $\sum_{d \mid n}\varphi(d) = n$, is a count. Write the $n$ fractions $\tfrac1n, \tfrac2n, \ldots, \tfrac nn$ in lowest terms. Each becomes $\tfrac ad$ with $d \mid n$ and $\gcd(a, d) = 1$, and for each $d$ exactly $\varphi(d)$ of them have denominator $d$. So the $n$ fractions split by denominator into groups of sizes $\varphi(d)$. The fractions in $(0, 1]$ in lowest terms with denominator at most $6$ number $\varphi(1) + \cdots + \varphi(6) = 1 + 1 + 2 + 2 + 4 + 2 = 12$.

[[dirichlet-convolution|Dirichlet convolution]] combines two functions on the positive integers by $(f * g)(n) = \sum_{d \mid n} f(d)g\left(\tfrac nd\right)$. It is commutative and associative, its identity is $\varepsilon$ (which is $1$ at $1$ and $0$ elsewhere), and the Möbius function $\mu$, which is $(-1)^k$ on a product of $k$ different primes and $0$ on numbers with a square factor, is the inverse of the constant function $\mathbf 1$: $\sum_{d \mid n}\mu(d) = 0$ for $n \gt 1$, since the subsets of the prime factors of $n$ with an even number of elements are as many as those with an odd number. So $g = f * \mathbf 1$ inverts to $f = g * \mu$, Möbius inversion. From $\varphi * \mathbf 1 = \mathrm{id}$, $\varphi = \mathrm{id} * \mu$, that is, $\varphi(n) = \sum_{d \mid n}\mu(d)\tfrac nd = n\prod_{p \mid n}\left(1 - \tfrac1p\right)$: $\varphi(60) = 60 \cdot \tfrac12 \cdot \tfrac23 \cdot \tfrac45 = 16$. A convolution of multiplicative functions is multiplicative, so identities need checking only on prime powers.

Read a divisor sum as a count split by $\gcd$, write identities as convolutions, invert with $\mu$, and check on prime powers. The next lesson organizes fractions.`,
      related: [
        { card: "mobius-inversion", note: String.raw`the inversion formula $f = g * \mu$.` },
        { card: "multiplicative-functions", note: String.raw`functions determined by their values on prime powers.` },
        { card: "eulers-totient", note: String.raw`the totient and its product formula.` }
      ],
      exercises: [
        { q: String.raw`Prove that $\sum_{d \mid n}\varphi(d) = n$.`,
          solution: String.raw`Reduce each of $\tfrac kn$, $k = 1, \ldots, n$, to lowest terms $\tfrac ad$. Then $d \mid n$, $1 \le a \le d$ and $\gcd(a, d) = 1$; conversely, each such $\tfrac ad$ equals $\tfrac{a(n/d)}{n}$, one of the fractions. So the $n$ fractions are matched with pairs $(d, a)$, and for each $d \mid n$ there are $\varphi(d)$ values of $a$.` },
        { q: String.raw`Prove that $\sum_{d \mid n}\mu(d) = 0$ for every $n \gt 1$.`,
          solution: String.raw`Only squarefree $d$ contribute, and these are products of subsets of the $k \ge 1$ different primes of $n$, with $\mu(d) = (-1)^{|S|}$. So the sum is $\sum_{S}(-1)^{|S|} = (1 - 1)^k = 0$.` },
        { q: String.raw`Use Möbius inversion to compute $\varphi(60)$.`, answer: "16",
          solution: String.raw`From $\varphi * \mathbf 1 = \mathrm{id}$, $\varphi(n) = \sum_{d \mid n}\mu(d)\tfrac nd = n\prod_{p \mid n}\left(1 - \tfrac1p\right)$. With $60 = 2^2 \cdot 3 \cdot 5$: $60 \cdot \tfrac12 \cdot \tfrac23 \cdot \tfrac45 = 16$.` }
      ],
      problems: []
    },
    "D4.3": {
      prereq: ["euclidean-algorithm", "bezouts-identity", "pell-equation"],
      cards: ["farey-sequences", "continued-fraction-convergents"],
      body: String.raw`What fraction between $\tfrac37$ and $\tfrac12$ has the smallest denominator? How is $43x - 30y = 1$ solved quickly? Why are $\tfrac32$, $\tfrac75$, $\tfrac{17}{12}$ such good approximations to $\sqrt2$? Fractions have an order that the Euclidean algorithm reveals.

[[farey-sequences|The Farey sequence]] of order $n$ lists the reduced fractions in $[0, 1]$ with denominator at most $n$, in increasing order. Two neighbors $\tfrac ab \lt \tfrac cd$ satisfy $bc - ad = 1$, and the first fraction to appear between them, as $n$ grows, is their mediant $\tfrac{a + c}{b + d}$. So $\tfrac37$ and $\tfrac12$, with $7 \cdot 1 - 3 \cdot 2 = 1$, have $\tfrac49$ as the fraction between them with the smallest denominator: any fraction strictly between neighbors has denominator at least $b + d$.

[[continued-fraction-convergents|A continued fraction]] records the Euclidean algorithm: $\tfrac{43}{30} = 1 + \cfrac{1}{2 + \cfrac{1}{3 + \cfrac{1}{4}}}$, written $[1; 2, 3, 4]$, since $43 = 1 \cdot 30 + 13$, $30 = 2 \cdot 13 + 4$, $13 = 3 \cdot 4 + 1$. Cutting it off gives the convergents $1, \tfrac32, \tfrac{10}{7}, \tfrac{43}{30}$, and consecutive convergents $\tfrac{p_k}{q_k}$ satisfy $p_kq_{k-1} - p_{k-1}q_k = \pm1$: $43 \cdot 7 - 10 \cdot 30 = 1$, which solves $43x - 30y = 1$ with $x = 7$, $y = 10$. For an irrational number the expansion goes on forever; $\sqrt2 = [1; 2, 2, 2, \ldots]$ has convergents $\tfrac32, \tfrac75, \tfrac{17}{12}, \ldots$, and each is closer to $\sqrt2$ than any fraction with a smaller denominator. They also solve Pell's equation: $17^2 - 2 \cdot 12^2 = 1$.

Use neighbors and mediants for the fraction with the smallest denominator in an interval, and the convergents of a continued fraction for Bézout pairs and best approximations. The next lesson sums floors.`,
      related: [
        { card: "bezouts-identity", note: String.raw`the integer solutions that consecutive convergents give.` },
        { card: "pell-equation", note: String.raw`$x^2 - dy^2 = 1$, solved by convergents of $\sqrt d$.` }
      ],
      exercises: [
        { q: String.raw`Find the fraction strictly between $\tfrac37$ and $\tfrac12$ with the smallest denominator.`,
          solution: String.raw`Since $7 \cdot 1 - 3 \cdot 2 = 1$, the two are Farey neighbors, and a fraction strictly between neighbors $\tfrac ab$, $\tfrac cd$ has denominator at least $b + d = 9$. The mediant $\tfrac{3 + 1}{7 + 2} = \tfrac49$ lies between them ($\tfrac{27}{63} \lt \tfrac{28}{63}$ and $\tfrac{8}{18} \lt \tfrac{9}{18}$), so it is the answer.` },
        { q: String.raw`Expand $\tfrac{43}{30}$ as a continued fraction, and use its convergents to solve $43x - 30y = 1$ in positive integers.`,
          solution: String.raw`The Euclidean algorithm gives $43 = 30 + 13$, $30 = 2 \cdot 13 + 4$, $13 = 3 \cdot 4 + 1$, $4 = 4 \cdot 1$, so $\tfrac{43}{30} = [1; 2, 3, 4]$, with convergents $1, \tfrac32, \tfrac{10}{7}, \tfrac{43}{30}$. Consecutive convergents give $43 \cdot 7 - 10 \cdot 30 = 301 - 300 = 1$, so $x = 7$, $y = 10$.` },
        { q: String.raw`The convergents of $\sqrt2$ are $\tfrac11, \tfrac32, \tfrac75, \tfrac{17}{12}, \ldots$. Check that $p^2 - 2q^2 = \pm1$ for each, and find the next convergent.`,
          solution: String.raw`$1 - 2 = -1$, $9 - 8 = 1$, $49 - 50 = -1$, $289 - 288 = 1$. The convergents of $[1; 2, 2, \ldots]$ follow $p_{k+1} = 2p_k + p_{k-1}$ and the same for $q$, so the next is $\tfrac{2 \cdot 17 + 7}{2 \cdot 12 + 5} = \tfrac{41}{29}$, and $41^2 - 2 \cdot 29^2 = 1681 - 1682 = -1$.` }
      ],
      problems: []
    },
    "D4.4": {
      prereq: ["floor-basics", "picks-theorem"],
      cards: ["beatty-theorem", "floor-sum-reciprocity"],
      body: String.raw`Why do $\lfloor n\sqrt2\rfloor$ and $\lfloor n(2 + \sqrt2)\rfloor$ together give every positive integer exactly once? What is $\sum_{k=1}^{6}\lfloor\tfrac{5k}{7}\rfloor$ without adding six terms? Floors of multiples have a structure.

[[beatty-theorem|Beatty's theorem]] says that if $\alpha$ and $\beta$ are irrational with $\tfrac1\alpha + \tfrac1\beta = 1$, the sequences $\lfloor n\alpha\rfloor$ and $\lfloor n\beta\rfloor$ partition the positive integers. The proof counts: the number of terms of the first sequence below $N$ is about $\tfrac N\alpha$, of the second about $\tfrac N\beta$, and the two counts add to exactly $N - 1$ for every $N$, which, with no collisions, forces each integer to appear once. For $\alpha = \sqrt2$, $\beta = \tfrac{\sqrt2}{\sqrt2 - 1} = 2 + \sqrt2$, and $\tfrac{1}{\sqrt2} + \tfrac{1}{2 + \sqrt2} = \tfrac{\sqrt2}{2} + \tfrac{2 - \sqrt2}{2} = 1$. So $100$, which is $\lfloor 71\sqrt2\rfloor$, is in the first sequence and not the second.

[[floor-sum-reciprocity|Floor-sum reciprocity]] evaluates $\sum_{k=1}^{q-1}\lfloor\tfrac{kp}{q}\rfloor = \tfrac{(p - 1)(q - 1)}{2}$ for coprime $p$ and $q$. The sum counts the lattice points strictly inside the triangle under the line $y = \tfrac pqx$ for $0 \lt x \lt q$, and that triangle with its mirror image fills a $(q - 1) \times (p - 1)$ rectangle of interior points, with no lattice point on the diagonal since $\gcd(p, q) = 1$. So $\sum_{k=1}^{6}\lfloor\tfrac{5k}{7}\rfloor = \tfrac{4 \cdot 6}{2} = 12$. The same picture proves $\sum_{k=1}^{q-1}\lfloor\tfrac{kp}{q}\rfloor$ and $\sum_{k=1}^{p-1}\lfloor\tfrac{kq}{p}\rfloor$ add to $(p - 1)(q - 1)$, the version used in a proof of quadratic reciprocity.

Check $\tfrac1\alpha + \tfrac1\beta = 1$ and irrationality for complementary sequences, and count lattice points under a line for floor sums. The Summary follows.`,
      related: [
        { card: "floor-basics", note: String.raw`the floor function and its inequalities.` },
        { card: "gauss-lemma-qr", note: String.raw`the lattice count used to prove reciprocity (D1.3).` },
        { card: "picks-theorem", note: String.raw`counting lattice points in a polygon (S7.4).` }
      ],
      exercises: [
        { q: String.raw`Compute $\sum_{k=1}^{6}\left\lfloor\tfrac{5k}{7}\right\rfloor$.`, answer: "12",
          solution: String.raw`By reciprocity with $p = 5$, $q = 7$: $\tfrac{(5 - 1)(7 - 1)}{2} = 12$. Directly: $0 + 1 + 2 + 2 + 3 + 4 = 12$.` },
        { q: String.raw`Check that $\tfrac{1}{\sqrt2} + \tfrac{1}{2 + \sqrt2} = 1$, and decide in which of the sequences $\lfloor n\sqrt2\rfloor$, $\lfloor n(2 + \sqrt2)\rfloor$ the number $100$ appears.`,
          solution: String.raw`$\tfrac{1}{2 + \sqrt2} = \tfrac{2 - \sqrt2}{2}$, and $\tfrac{\sqrt2}{2} + \tfrac{2 - \sqrt2}{2} = 1$. So by Beatty the sequences partition the positive integers. Since $71\sqrt2 \approx 100.41$, $\lfloor 71\sqrt2\rfloor = 100$: it is in the first sequence, hence not in the second.` },
        { q: String.raw`Compute $\sum_{k=1}^{10}\left\lfloor\tfrac{3k}{11}\right\rfloor$.`, answer: "10",
          solution: String.raw`$\gcd(3, 11) = 1$, so by reciprocity the sum is $\tfrac{(3 - 1)(11 - 1)}{2} = 10$. Directly: $0, 0, 0, 1, 1, 1, 1, 2, 2, 2$, adding to $10$.` }
      ],
      problems: []
    },
    "D4.5": {
      prereq: ["totient-divisor-sum", "dirichlet-convolution", "farey-sequences", "continued-fraction-convergents", "beatty-theorem", "floor-sum-reciprocity"],
      cards: [],
      body: String.raw`[[totient-divisor-sum|Gauss's totient sum]] counts fractions by reduced denominator, and [[dirichlet-convolution|Dirichlet convolution]] with $\mu$ inverts divisor sums.

[[farey-sequences|Farey neighbors]] have $bc - ad = 1$ and mediants between them, and [[continued-fraction-convergents|convergents]] give Bézout pairs and best approximations.

[[beatty-theorem|Beatty's theorem]] partitions the integers with two irrational multiples, and [[floor-sum-reciprocity|floor-sum reciprocity]] counts lattice points under a line.`,
      strategies: [
        String.raw`Read a divisor sum as a count of fractions or pairs split by $\gcd$.`,
        String.raw`Write an identity of arithmetic functions as a convolution and check it on prime powers.`,
        String.raw`For the simplest fraction in an interval, find Farey neighbors and their mediant.`,
        String.raw`Solve $ax - by = 1$ with the last two convergents of $\tfrac ab$.`,
        String.raw`Turn a sum of floors into a count of lattice points.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Compute $\varphi(100)$.`, answer: "40",
        solution: String.raw`$100 = 2^2 \cdot 5^2$, so $\varphi(100) = 100 \cdot \tfrac12 \cdot \tfrac45 = 40$.` },
      { q: String.raw`Write $\tfrac73$ as a continued fraction.`,
        solution: String.raw`$7 = 2 \cdot 3 + 1$ and $3 = 3 \cdot 1$, so $\tfrac73 = 2 + \tfrac13 = [2; 3]$.` },
      { q: String.raw`Compute $\sum_{d \mid 10}\mu(d)\,d$.`, answer: "4",
        solution: String.raw`The squarefree divisors are $1, 2, 5, 10$ with $\mu = 1, -1, -1, 1$: $1 - 2 - 5 + 10 = 4$, which is $(1 - 2)(1 - 5)$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Let $p$ and $q$ be coprime positive integers. Prove that $\sum_{k=1}^{q-1}\left\lfloor\tfrac{kp}{q}\right\rfloor = \tfrac{(p - 1)(q - 1)}{2}$.`,
        solution: String.raw`For $1 \le k \le q - 1$, $\lfloor\tfrac{kp}{q}\rfloor$ counts the integers $y$ with $1 \le y \lt \tfrac{kp}{q}$, since $\tfrac{kp}{q}$ is not an integer. So the sum counts the lattice points $(k, y)$ with $1 \le k \le q - 1$, $1 \le y \le p - 1$ below the line $y = \tfrac pqx$. The map $(k, y) \to (q - k, p - y)$ swaps the points below the line with those above, and no lattice point of the rectangle is on the line. So exactly half of the $(p - 1)(q - 1)$ points are below.` },
      { q: String.raw`Let $\tfrac ab \lt \tfrac cd$ be fractions with $bc - ad = 1$. Prove that every fraction $\tfrac xy$ strictly between them has $y \ge b + d$.`,
        solution: String.raw`From $\tfrac ab \lt \tfrac xy$, $bx - ay \ge 1$; from $\tfrac xy \lt \tfrac cd$, $cy - dx \ge 1$. Then $y = y(bc - ad) = b(cy - dx) + d(bx - ay) \ge b + d$.` },
      { q: String.raw`Let $\alpha, \beta \gt 1$ be irrational with $\tfrac1\alpha + \tfrac1\beta = 1$. Prove that no positive integer is both $\lfloor m\alpha\rfloor$ and $\lfloor n\beta\rfloor$.`,
        solution: String.raw`Suppose $\lfloor m\alpha\rfloor = \lfloor n\beta\rfloor = k$. Then $k \lt m\alpha \lt k + 1$ and $k \lt n\beta \lt k + 1$, strictly since $\alpha$, $\beta$ are irrational. So $\tfrac{m}{k+1} \lt \tfrac1\alpha \lt \tfrac mk$ and $\tfrac{n}{k+1} \lt \tfrac1\beta \lt \tfrac nk$. Adding, $\tfrac{m + n}{k + 1} \lt 1 \lt \tfrac{m + n}{k}$, so $k \lt m + n \lt k + 1$, which no integer satisfies.` }
    ],
    problems: []
  }
};
