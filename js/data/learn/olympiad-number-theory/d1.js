// Learn, Olympiad Number Theory, chapter D1: quadratic residues (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["D1"] = {
  lessons: {
    "D1.1": {
      prereq: ["modular-basics", "fermats-little-theorem", "eulers-criterion"],
      cards: [],
      body: String.raw`Which numbers are squares modulo a prime? The question decides whether $x^2 + 1$ can have a prime factor of the form $4k + 3$, whether $x^2 \equiv 5 \pmod{19}$ has a solution, and many olympiad descents. This chapter answers it: first by bounding the number of roots of a polynomial modulo a prime, then by quadratic reciprocity, which computes the answer without listing squares.

Modulo $7$, the squares of $1, \ldots, 6$ are $1, 4, 2, 2, 4, 1$, so the nonzero squares are $1$, $2$ and $4$: $2$ is a square ($3^2 = 9 \equiv 2$) and $3$ is not. Modulo $13$, $5^2 = 25 \equiv -1$, so $-1$ is a square. The Legendre symbol $\left(\tfrac ap\right)$ records the answer: $1$ if $a$ is a nonzero square modulo $p$, $-1$ if not, so $\left(\tfrac27\right) = 1$ and $\left(\tfrac37\right) = -1$. Euler's criterion computes it: $\left(\tfrac ap\right) \equiv a^{(p-1)/2} \pmod p$.

The lessons are polynomial congruences modulo a prime (D1.2) and quadratic reciprocity (D1.3). The Summary (D1.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Which nonzero numbers are squares modulo $7$?`,
          solution: String.raw`$1^2, \ldots, 6^2$ are $1, 4, 9, 16, 25, 36$, which are $1, 4, 2, 2, 4, 1$ modulo $7$. The nonzero squares are $1$, $2$, $4$, three of the six residues.` },
        { q: String.raw`Show that $-1$ is a square modulo $13$, and compute $\left(\tfrac{-1}{13}\right)$ by Euler's criterion.`,
          solution: String.raw`$5^2 = 25 = 26 - 1 \equiv -1$. By Euler's criterion, $\left(\tfrac{-1}{13}\right) \equiv (-1)^6 = 1$, as expected.` }
      ],
      problems: []
    },
    "D1.2": {
      prereq: ["modular-basics", "fermats-little-theorem", "polynomial-division"],
      cards: ["lagrange-roots-mod-p"],
      body: String.raw`How many solutions can $x^2 \equiv 1 \pmod p$ have for a prime $p$? Why is $(p - 1)! \equiv -1 \pmod p$? Why does $x^2 \equiv 1 \pmod 8$ have four solutions? Modulo a prime, polynomials behave as they do over the real numbers; modulo a composite, they need not.

[[lagrange-roots-mod-p|Lagrange's theorem]] says that a polynomial of degree $d$ whose coefficients are not all multiples of the prime $p$ has at most $d$ roots modulo $p$. The proof is the one over the reals: if $a$ is a root, then $f(x) \equiv (x - a)g(x)$ with $g$ of degree $d - 1$, and any other root $b$ makes $(b - a)g(b) \equiv 0$, so $g(b) \equiv 0$, because a product of two numbers is $0$ modulo a prime only if a factor is. That last step is where primality is used. So $x^2 \equiv 1$ has only the roots $\pm 1$ modulo a prime, while modulo $8$ the numbers $1, 3, 5, 7$ all square to $1$.

The theorem's main use is counting. By Fermat's little theorem all of $1, 2, \ldots, p - 1$ are roots of $x^{p-1} - 1$, so they are all its roots, and $x^{p-1} - 1 \equiv (x - 1)(x - 2)\cdots(x - (p - 1))$. Comparing constant terms gives Wilson's theorem, $(p - 1)! \equiv -1$. In the same way, the $\tfrac{p - 1}{2}$ nonzero squares are all roots of $x^{(p-1)/2} - 1$, which has no more roots, so the squares are exactly the $a$ with $a^{(p-1)/2} \equiv 1$: Euler's criterion. And a polynomial congruence of degree $d$ that holds for more than $d$ residues must have all its coefficients divisible by $p$.

Factor out a known root and use that a prime cannot divide a product without dividing a factor; to count roots, compare with a polynomial whose roots are known. The next lesson computes Legendre symbols.`,
      related: [
        { card: "wilsons-theorem", note: String.raw`the factorial congruence the factorization gives.` },
        { card: "eulers-criterion", note: String.raw`the test for squares that root counting proves.` },
        { card: "primitive-roots", note: String.raw`a generator modulo $p$, whose existence also rests on root counting.` }
      ],
      exercises: [
        { q: String.raw`Let $p$ be a prime. Prove that the only solutions of $x^2 \equiv 1 \pmod p$ are $x \equiv \pm 1$.`,
          solution: String.raw`$x^2 - 1 = (x - 1)(x + 1)$, and $p$ divides a product only if it divides a factor, so $x \equiv 1$ or $x \equiv -1$. (These differ unless $p = 2$.)` },
        { q: String.raw`Prove Wilson's theorem: $(p - 1)! \equiv -1 \pmod p$ for every prime $p$.`,
          solution: String.raw`For $p = 2$, $1 \equiv -1$. For odd $p$, the polynomial $x^{p-1} - 1 - (x - 1)(x - 2)\cdots(x - (p - 1))$ has degree less than $p - 1$ (the $x^{p-1}$ terms cancel) and, by Fermat, $p - 1$ roots $1, \ldots, p - 1$. By Lagrange's theorem all its coefficients are multiples of $p$. Its constant term is $-1 - (-1)^{p-1}(p - 1)! = -1 - (p - 1)!$, so $(p - 1)! \equiv -1$.` },
        { q: String.raw`How many solutions modulo $8$ does $x^2 \equiv 1$ have? Explain why this does not contradict Lagrange's theorem.`, answer: "4",
          solution: String.raw`$1^2, 3^2, 5^2, 7^2$ are $1, 9, 25, 49$, all $1$ modulo $8$: four solutions, more than the degree $2$. Lagrange's theorem needs a prime modulus: modulo $8$, $(x - 1)(x + 1) \equiv 0$ can hold with neither factor $0$, as $3 - 1 = 2$ and $3 + 1 = 4$ show.` }
      ],
      problems: []
    },
    "D1.3": {
      prereq: ["eulers-criterion", "lagrange-roots-mod-p", "crt"],
      cards: ["quadratic-reciprocity", "gauss-lemma-qr", "jacobi-symbol"],
      body: String.raw`Is $5$ a square modulo $19$? Is $2$ a square modulo $17$? For which primes is $-1$ a square? Listing squares is slow for large primes; quadratic reciprocity computes the Legendre symbol by a sequence of flips and reductions, like the Euclidean algorithm.

[[quadratic-reciprocity|Quadratic reciprocity]] relates $\left(\tfrac pq\right)$ and $\left(\tfrac qp\right)$ for odd primes $p \ne q$: they are equal unless both $p$ and $q$ are $3 \pmod 4$, in which case they are opposite. With two supplements, $\left(\tfrac{-1}{p}\right) = 1$ exactly when $p \equiv 1 \pmod 4$, and $\left(\tfrac2p\right) = 1$ exactly when $p \equiv \pm 1 \pmod 8$, and the multiplicativity $\left(\tfrac{ab}{p}\right) = \left(\tfrac ap\right)\left(\tfrac bp\right)$, every symbol can be computed. For $\left(\tfrac{5}{19}\right)$: $5 \equiv 1 \pmod 4$, so flip, $\left(\tfrac{19}{5}\right) = \left(\tfrac45\right) = 1$; indeed $9^2 = 81 \equiv 5 \pmod{19}$. For $\left(\tfrac{3}{11}\right)$, both are $3 \pmod 4$, so $\left(\tfrac{3}{11}\right) = -\left(\tfrac{11}{3}\right) = -\left(\tfrac23\right) = 1$; indeed $5^2 \equiv 3$. And $17 \equiv 1 \pmod 8$ makes $2$ a square, $6^2 = 36 \equiv 2$.

[[gauss-lemma-qr|Gauss's lemma]] is the counting behind these laws: $\left(\tfrac ap\right) = (-1)^\mu$, where $\mu$ counts how many of $a, 2a, \ldots, \tfrac{p - 1}{2}a$ leave a remainder above $\tfrac p2$. For $a = 2$ and $p = 13$ the multiples are $2, 4, 6, 8, 10, 12$, and three of them exceed $6.5$, so $\left(\tfrac{2}{13}\right) = -1$. Counting in general gives the rule for $2$, and a lattice-point count gives reciprocity itself.

[[jacobi-symbol|The Jacobi symbol]] extends the notation to an odd composite bottom, $\left(\tfrac an\right) = \prod\left(\tfrac{a}{p_i}\right)^{e_i}$, and obeys the same reciprocity law, so a symbol can be flipped without factoring the numbers first. The value $-1$ still proves that $a$ is not a square modulo $n$, but $1$ does not prove that it is: $\left(\tfrac{2}{15}\right) = \left(\tfrac23\right)\left(\tfrac25\right) = 1$, yet the squares of the units modulo $15$ are only $1$ and $4$.

Factor the top, use the supplements for $-1$ and $2$, flip with reciprocity and reduce, and treat a Jacobi value of $1$ with care. The Summary follows.`,
      related: [
        { card: "eulers-criterion", note: String.raw`the power $a^{(p-1)/2}$ that equals the symbol.` },
        { card: "crt", note: String.raw`counting square roots modulo a product of primes, one prime at a time.` },
        { card: "sum-of-two-squares", note: String.raw`which primes are sums of two squares, the primes with $\left(\tfrac{-1}{p}\right) = 1$.` }
      ],
      exercises: [
        { q: String.raw`Compute $\left(\tfrac{5}{19}\right)$ by quadratic reciprocity, and find an $x$ with $x^2 \equiv 5 \pmod{19}$.`,
          solution: String.raw`Since $5 \equiv 1 \pmod 4$, $\left(\tfrac{5}{19}\right) = \left(\tfrac{19}{5}\right) = \left(\tfrac{4}{5}\right) = 1$, as $4$ is a square. Searching, $9^2 = 81 = 76 + 5 \equiv 5$.` },
        { q: String.raw`Prove that $-1$ is a square modulo an odd prime $p$ if and only if $p \equiv 1 \pmod 4$.`,
          solution: String.raw`By Euler's criterion, $-1$ is a square exactly when $(-1)^{(p-1)/2} \equiv 1$, that is, when $\tfrac{p-1}{2}$ is even, which is $p \equiv 1 \pmod 4$. (The values $\pm 1$ are different modulo an odd prime.)` },
        { q: String.raw`Use Gauss's lemma to show that $2$ is not a square modulo $13$.`,
          solution: String.raw`The multiples $2k$ for $k = 1, \ldots, 6$ are $2, 4, 6, 8, 10, 12$, all less than $13$. Those above $6.5$ are $8, 10, 12$, so $\mu = 3$ and $\left(\tfrac{2}{13}\right) = (-1)^3 = -1$.` },
        { q: String.raw`Show that the Jacobi symbol $\left(\tfrac{2}{15}\right)$ is $1$, but that $2$ is not a square modulo $15$.`,
          solution: String.raw`$\left(\tfrac{2}{15}\right) = \left(\tfrac23\right)\left(\tfrac25\right) = (-1)(-1) = 1$. But a square modulo $15$ is a square modulo $3$, and $2$ is not a square modulo $3$ (the squares are $0, 1$). So $2$ is not a square modulo $15$.` }
      ],
      problems: []
    },
    "D1.4": {
      prereq: ["lagrange-roots-mod-p", "quadratic-reciprocity", "gauss-lemma-qr", "jacobi-symbol"],
      cards: [],
      body: String.raw`[[lagrange-roots-mod-p|Lagrange's theorem]] limits a polynomial of degree $d$ to $d$ roots modulo a prime, which gives Wilson's theorem and Euler's criterion.

[[quadratic-reciprocity|Quadratic reciprocity]], with its supplements for $-1$ and $2$, computes Legendre symbols; [[gauss-lemma-qr|Gauss's lemma]] is the count behind it; and [[jacobi-symbol|the Jacobi symbol]] flips without factoring, but its value $1$ proves nothing.`,
      strategies: [
        String.raw`Modulo a prime, factor out a root: a product is $0$ only if a factor is.`,
        String.raw`To prove a polynomial congruence of degree $d$ is an identity, show it has more than $d$ roots.`,
        String.raw`Compute $\left(\tfrac ap\right)$ by factoring $a$, using the supplements, and flipping.`,
        String.raw`A prime factor of $x^2 + 1$ is $2$ or $1 \pmod 4$; use this to restrict prime factors.`,
        String.raw`Count square roots modulo a composite one prime at a time.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Compute $\left(\tfrac{3}{11}\right)$.`, answer: "1",
        solution: String.raw`Both $3$ and $11$ are $3 \pmod 4$, so $\left(\tfrac{3}{11}\right) = -\left(\tfrac{11}{3}\right) = -\left(\tfrac{2}{3}\right) = -(-1) = 1$. Indeed $5^2 = 25 \equiv 3 \pmod{11}$.` },
      { q: String.raw`How many of $1, 2, \ldots, 22$ are squares modulo $23$?`, answer: "11",
        solution: String.raw`The squares of $1, \ldots, 22$ come in pairs $x^2 = (23 - x)^2$, and by Lagrange's theorem each square has at most two square roots. So there are exactly $\tfrac{22}{2} = 11$ nonzero squares.` },
      { q: String.raw`Prove that $x^2 + 1 \equiv 0 \pmod{19}$ has no solution.`,
        solution: String.raw`A solution would make $-1$ a square modulo $19$, which happens only for primes that are $1 \pmod 4$. But $19 \equiv 3 \pmod 4$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that there are infinitely many primes $p \equiv 1 \pmod 4$.`,
        solution: String.raw`Given any $n$, let $N = (n!)^2 + 1$, and let $p$ be a prime factor of $N$. Then $(n!)^2 \equiv -1 \pmod p$, so $-1$ is a square modulo $p$, and $p$ is odd, so $p \equiv 1 \pmod 4$. Also $p \gt n$, since every prime up to $n$ divides $n!$ and so leaves remainder $1$ in $N$. So there are such primes above every $n$.` },
      { q: String.raw`Let $p \equiv 3 \pmod 4$ be prime with $p \mid a^2 + b^2$. Prove that $p \mid a$ and $p \mid b$.`,
        solution: String.raw`If $p \nmid b$, let $c$ be an inverse of $b$ modulo $p$. Then $(ac)^2 \equiv -b^2c^2 \equiv -1$, so $-1$ would be a square modulo $p$, impossible since $p \equiv 3 \pmod 4$. So $p \mid b$, and then $p \mid a^2$, so $p \mid a$.` },
      { q: String.raw`How many solutions modulo $119 = 7 \cdot 17$ does $x^2 \equiv 2$ have?`, answer: "4",
        solution: String.raw`$2$ is a square modulo $7$ ($3^2 = 9$) and modulo $17$ ($6^2 = 36$), with two square roots modulo each prime. By the Chinese remainder theorem each pair of choices gives one solution modulo $119$: $2 \cdot 2 = 4$.` }
    ],
    problems: []
  }
};
