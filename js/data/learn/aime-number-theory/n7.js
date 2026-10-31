// Learn, AIME Number Theory, chapter N7: residue patterns and special constraints (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N7"] = {
  lessons: {
    "N7.1": {
      prereq: ["modular-basics", "fermats-little-theorem"],
      cards: [],
      body: String.raw`This chapter looks at the patterns that powers, factorials and sequences make modulo a number. Its tools are the squares modulo small numbers and Euler's criterion, the freshman's dream $(a + b)^p \equiv a^p + b^p \pmod p$, Wilson's theorem, the order as a restriction on which primes can divide a number, and the periodicity of a sequence defined by a recursion.

The squares modulo $8$ are only $0$, $1$ and $4$, since $x^2$ for $x = 0, \ldots, 7$ leaves those remainders and no others. Such short lists rule out many equations at once. The remainders that are squares modulo a prime $p$ are the quadratic residues; exactly half of the nonzero remainders are, and Euler's criterion tells which: $a$ is a residue exactly when $a^{(p-1)/2} \equiv 1 \pmod p$.

Modulo a prime $p$, the middle binomial coefficients $\binom pk$ are all multiples of $p$, so $(a + b)^p \equiv a^p + b^p$. Wilson's theorem says $(p - 1)! \equiv -1 \pmod p$ for every prime $p$, because the numbers from $2$ to $p - 2$ pair off with their inverses: $10! \equiv -1 \equiv 10 \pmod{11}$.

The order also restricts primes: if a prime $p$ divides $n^2 + 1$, then $n$ has order $4$ modulo $p$, so $4$ divides $p - 1$, and $p = 2$ or $p \equiv 1 \pmod 4$.

A sequence defined by a recursion, read modulo $m$, has only finitely many possible pairs of consecutive terms, so it repeats. The Fibonacci numbers modulo $3$ run $0, 1, 1, 2, 0, 2, 2, 1$ and then repeat, with period $8$.

The lessons take these ideas in turn: quadratic residues (N7.2), squares, fourth powers and the freshman's dream (N7.3), orders, Wilson's theorem and restrictions on primes (N7.4), and periodic sequences (N7.5). The Summary (N7.6) collects the strategies.`,
      exercises: [
        { q: String.raw`Which remainders can a perfect square leave on division by $8$?`, answer: "0, 1, 4",
          solution: String.raw`It is enough to square $0, 1, \ldots, 7$: the squares are $0, 1, 4, 9, 16, 25, 36, 49$, with remainders $0, 1, 4, 1, 0, 1, 4, 1$. So only $0$, $1$ and $4$ occur.` },
        { q: String.raw`Find the remainder when $10!$ is divided by $11$.`, answer: "10",
          solution: String.raw`By Wilson's theorem $(p - 1)! \equiv -1 \pmod p$, so $10! \equiv -1 \equiv 10 \pmod{11}$. Directly: $2 \cdot 6$, $3 \cdot 4$, $5 \cdot 9$ and $7 \cdot 8$ are each $1$ modulo $11$, leaving $1 \cdot 10 = 10$.` },
        { q: String.raw`The Fibonacci numbers are $F_0 = 0$, $F_1 = 1$, $F_{n+1} = F_n + F_{n-1}$. With what period do they repeat modulo $3$?`, answer: "8",
          solution: String.raw`Modulo $3$ the terms run $0, 1, 1, 2, 0, 2, 2, 1$, and then $0, 1$ again. A pair of consecutive terms fixes everything after it, so the sequence repeats with period $8$.` }
      ],
      problems: [
        "2006 AMC 10B, Problem 11",
        "2015 AMC 10B, Problem 10",
        "1988 AIME, Problem 2"
      ]
    },
    "N7.2": {
      prereq: ["choose-modulus", "fermats-little-theorem"],
      cards: ["squares-mod-small", "eulers-criterion"],
      body: String.raw`A square can leave only certain remainders: modulo $7$ the nonzero squares are $1$, $2$, and $4$, and modulo $8$ every square is $0$, $1$, or $4$. Those remainders are the [[squares-mod-small|quadratic residues]], and knowing which residues are squares is what makes a modulus useful against an equation with squares in it. It explains, for example, why $p^2 + 26$ is never prime for a prime $p$: modulo $3$ it is always $0$.

For a small modulus the residues are found by squaring every class, and only half of them need squaring, since $x$ and $-x$ have the same square. Modulo an odd prime $p$, the squares of $1, \ldots, \tfrac{p-1}{2}$ are all different (two equal squares $x^2 \equiv y^2$ give $p \mid (x - y)(x + y)$), so there are exactly $\tfrac{p-1}{2}$ nonzero residues and as many non-residues; modulo $13$ that is $6$ of each. Small composite moduli are worth memorizing in the form that problems use: squares are $0, 1$ modulo $3$ and $4$; $0, 1, 4$ modulo $8$; $0, \pm 1$ modulo $5$; and odd squares are $1$ modulo $8$.

For a large prime there is a test that avoids squaring everything. [[eulers-criterion|Euler's criterion]] says that for $a$ not divisible by an odd prime $p$, $a^{(p-1)/2} \equiv 1$ when $a$ is a square modulo $p$ and $\equiv -1$ when it is not. The reason is Fermat's theorem: $a^{(p-1)/2}$ squares to $a^{p-1} \equiv 1$, so it is $\pm 1$; when $a \equiv x^2$ it equals $x^{p-1} \equiv 1$; and the polynomial $X^{(p-1)/2} - 1$ has at most $\tfrac{p-1}{2}$ roots, all of them used up by the residues. So $3$ is a square modulo $11$, because $3^5 = 243 \equiv 1$, and indeed $5^2 = 25 \equiv 3$. The special case $a = -1$ says that $-1$ is a square modulo $p$ exactly when $\tfrac{p-1}{2}$ is even, that is when $p \equiv 1 \pmod 4$.

The signal is an equation or expression involving squares with a divisibility or primality question. Pick a modulus whose square residues are few, and use the residue list to rule out cases or fix a residue.`,
      related: [
        { card: "choose-modulus", note: String.raw`choosing the modulus to match the powers in an equation (N5.4).` },
        { card: "quadratic-reciprocity", note: String.raw`deciding whether $p$ is a square modulo $q$ by flipping to $q$ modulo $p$ (N8.4).` },
        { card: "sum-of-two-squares", note: String.raw`$-1$ being a square modulo $p \equiv 1 \pmod 4$ is the first step toward writing $p$ as a sum of two squares (N5.5).` }
      ],
      exercises: [
        { q: String.raw`List the nonzero quadratic residues modulo $7$.`, answer: "1, 2, 4",
          solution: String.raw`$1^2 = 1$, $2^2 = 4$, $3^2 = 9 \equiv 2$, and $4, 5, 6$ are $-3, -2, -1$, whose squares repeat these. So the nonzero residues are $1, 2, 4$.` },
        { q: String.raw`For how many primes $p$ is $p^2 + 26$ prime?`, answer: "0",
          solution: String.raw`If $p \ne 3$, then $p^2 \equiv 1 \pmod 3$, so $p^2 + 26 \equiv 0 \pmod 3$ and $p^2 + 26 > 3$ is composite. If $p = 3$, $p^2 + 26 = 35 = 5 \cdot 7$. So no prime works.` },
        { q: String.raw`Using Euler's criterion, compute $3^{5}$ modulo $11$; is $3$ a quadratic residue modulo $11$? Give the residue $3^5 \bmod 11$.`, answer: "1",
          solution: String.raw`$3^5 = 243 = 22 \cdot 11 + 1$, so $3^5 \equiv 1$, and by Euler's criterion $3$ is a quadratic residue modulo $11$. Indeed $5^2 = 25 \equiv 3$.` }
      ],
      problems: ["2018 AMC 10B, Problem 11", "2008 AIME II, Problem 15"]
    },
    "N7.3": {
      prereq: ["last-digit-patterns", "prime-divides-binomial"],
      cards: ["freshmans-dream"],
      body: String.raw`Powers modulo a fixed number fall into a few patterns that are worth knowing before a problem asks for them. Fourth powers modulo $16$ are only $0$ and $1$, fifth powers modulo $10$ end in the same digit as the base, and a power of a number ending in $25$ keeps ending in $25$. Behind several of these sits one identity, $(a + b)^p \equiv a^p + b^p \pmod p$, which is called the freshman's dream because it is the mistake beginners make in ordinary algebra, but it is exactly true modulo a prime.

The [[freshmans-dream|freshman's dream]] follows from N4.4: in the expansion of $(a + b)^p$ every middle coefficient $\binom pk$ is a multiple of $p$, so only $a^p$ and $b^p$ survive. Applied repeatedly it gives $(a_1 + \cdots + a_n)^p \equiv a_1^p + \cdots + a_n^p$, and with every $a_i = 1$ it gives $n^p \equiv n$, a second proof of Fermat's Little Theorem. It also explains why, modulo $7$, $2^7 + 3^7 \equiv (2 + 3)^7 = 5^7 \equiv 5$.

Patterns modulo a prime power or a product of primes come from combining the pieces. A fourth power modulo $16$: an odd $n$ has $n^2 \equiv 1 \pmod 8$, so $n^4 = (n^2)^2 \equiv 1 \pmod{16}$, and an even $n$ has $16 \mid n^4$. Modulo $5$, every fourth power of a number not divisible by $5$ is $1$, so the sum $1^4 + 2^4 + \cdots + 10^4$ is congruent to the count of terms not divisible by $5$, which is $8 \equiv 3$. Last-two-digit questions about a power are often settled by noticing that the base ends in $25$, $76$, or $01$, endings that reproduce themselves under multiplication, or by the order arguments of N3.

The signal is a power, sum of powers, or binomial raised to a prime, asked modulo a small number. Look for the pattern that makes the power collapse, then reduce.`,
      related: [
        { card: "prime-divides-binomial", note: String.raw`the vanishing middle coefficients behind the freshman's dream (N4.4).` },
        { card: "fermats-little-theorem", note: String.raw`$n^p \equiv n$, which the freshman's dream proves by expanding $(1 + \cdots + 1)^p$ (N3.3).` },
        { card: "last-digit-patterns", note: String.raw`the units-digit table that the patterns modulo $10$ extend (N3.2).` }
      ],
      exercises: [
        { q: String.raw`What is the remainder when $2^7 + 3^7$ is divided by $7$?`, answer: "5",
          solution: String.raw`By the freshman's dream, $2^7 + 3^7 \equiv (2 + 3)^7 = 5^7 \pmod 7$, and by Fermat $5^7 \equiv 5$. (Directly: $128 + 2187 = 2315 = 7 \cdot 330 + 5$.)` },
        { q: String.raw`What remainders can a fourth power leave modulo $16$? List them.`, answer: "0, 1",
          solution: String.raw`If $n$ is even, $n^4$ is a multiple of $16$. If $n$ is odd, $n^2 \equiv 1 \pmod 8$, so $n^2 = 8k + 1$ and $n^4 = 64k^2 + 16k + 1 \equiv 1 \pmod{16}$. So the remainders are $0$ and $1$.` },
        { q: String.raw`What is the remainder when $1^4 + 2^4 + \cdots + 10^4$ is divided by $5$?`, answer: "3",
          solution: String.raw`By Fermat, $k^4 \equiv 1 \pmod 5$ for $k$ not divisible by $5$, and $k^4 \equiv 0$ otherwise. Among $1, \ldots, 10$ there are $8$ numbers not divisible by $5$, so the sum is $\equiv 8 \equiv 3 \pmod 5$.` }
      ],
      problems: ["2025 AMC 10B, Problem 2", "2016 AMC 10B, Problem 8", "2018 AMC 10A, Problem 19"]
    },
    "N7.4": {
      prereq: ["multiplicative-order", "modular-inverse"],
      cards: ["wilsons-theorem"],
      body: String.raw`The structure of the residues modulo a prime puts strong limits on which primes can divide a given kind of number. A prime that divides $n^2 + 1$ for some $n$ must be $2$ or $\equiv 1 \pmod 4$; a prime dividing $a^8 + 1$ must be $\equiv 1 \pmod{16}$. And the product of all the nonzero residues has a fixed value: $(p - 1)! \equiv -1 \pmod p$, which is [[wilsons-theorem|Wilson's theorem]].

Wilson's theorem is a pairing argument. Each residue $1, \ldots, p - 1$ has an inverse, and the only residues equal to their own inverse are the roots of $x^2 \equiv 1$, namely $1$ and $p - 1$. All the others pair off into products equal to $1$, so the whole product is $1 \cdot (p - 1) \equiv -1$. Thus $10! \equiv 10 \pmod{11}$. The theorem gives the values of nearby factorials too: since $(p - 1)! = (p - 1)\,(p - 2)!$ and $p - 1 \equiv -1$, we get $(p - 2)! \equiv 1$, so $15! \equiv 1 \pmod{17}$; one more step gives $(p - 3)! \equiv \tfrac{p - 1}{2}$, so $16! \equiv 9 \pmod{19}$. The converse holds as well: $(n - 1)! \equiv -1 \pmod n$ only for primes $n$.

Restrictions on prime divisors come from orders. If an odd prime $p$ divides $n^2 + 1$, then $n^2 \equiv -1$ and $n^4 \equiv 1$, so the order of $n$ modulo $p$ is exactly $4$, and since the order divides $p - 1$, $p \equiv 1 \pmod 4$. Conversely, every prime $\equiv 1 \pmod 4$ does divide some $n^2 + 1$, by Euler's criterion. So the primes below $50$ that divide a number of the form $n^2 + 1$ are $2, 5, 13, 17, 29, 37, 41$. The same reasoning with $a^{2^k} \equiv -1$ shows that the order is $2^{k+1}$, and the prime is $1$ modulo $2^{k+1}$.

The signal is a factorial modulo a prime near it, or a question about which primes can divide a number of a special form. Use Wilson for the first and the order of the base for the second.`,
      related: [
        { card: "multiplicative-order", note: String.raw`an order of exactly $4$ or $16$ forces the prime's residue modulo $4$ or $16$ (N3.4).` },
        { card: "eulers-criterion", note: String.raw`$-1$ is a square modulo $p$ exactly when $p \equiv 1 \pmod 4$ (N7.2).` },
        { card: "modular-inverse", note: String.raw`the pairing of each residue with its inverse that proves Wilson's theorem (N2.2).` }
      ],
      exercises: [
        { q: String.raw`What is the remainder when $15!$ is divided by $17$?`, answer: "1",
          solution: String.raw`Wilson gives $16! \equiv -1 \pmod{17}$, and $16! = 16 \cdot 15! \equiv -15!$. So $-15! \equiv -1$, and $15! \equiv 1$.` },
        { q: String.raw`What is the remainder when $16!$ is divided by $19$?`, answer: "9",
          solution: String.raw`Wilson gives $18! \equiv -1 \pmod{19}$, and $18! = 18 \cdot 17 \cdot 16! \equiv (-1)(-2)\,16! = 2 \cdot 16!$. So $2 \cdot 16! \equiv -1 \equiv 18$, and $16! \equiv 9$ (check: $2 \cdot 9 = 18$).` },
        { q: String.raw`How many primes less than $50$ divide $n^2 + 1$ for some integer $n$?`, answer: "7",
          solution: String.raw`An odd prime dividing $n^2 + 1$ must be $1 \pmod 4$, and every such prime does divide some $n^2 + 1$; the prime $2$ divides $1^2 + 1$. Below $50$: $2, 5, 13, 17, 29, 37, 41$, which is $7$ primes.` }
      ],
      problems: ["2019 AMC 10A, Problem 25"]
    },
    "N7.5": {
      prereq: ["periodic-sequences", "cycle-hunting"],
      cards: ["pisano-periods"],
      body: String.raw`A sequence defined by a recursion becomes periodic as soon as it is read modulo a fixed number, because each term depends only on the few terms before it, and those can take only finitely many values. Modulo $3$ the Fibonacci numbers run $0, 1, 1, 2, 0, 2, 2, 1$ and then start again, so any eight consecutive Fibonacci numbers add to a multiple of $3$. The same reasoning finds the units digit of $F_{2026}$ without computing a number with over four hundred digits.

For a recursion that uses the last $k$ terms, the state is the block of $k$ consecutive residues, and there are at most $m^k$ such blocks modulo $m$, so a block must repeat and the sequence is periodic from there on, exactly as in N3.2. When the recursion can also be run backward, as the Fibonacci rule $F_{n-1} = F_{n+1} - F_n$ can, the sequence repeats from the very start. The period of the Fibonacci numbers modulo $m$ is the [[pisano-periods|Pisano period]]: $3$ modulo $2$, $8$ modulo $3$, $20$ modulo $5$, and $60$ modulo $10$. So the units digit of $F_{2026}$ is that of $F_{46}$, since $2026 \equiv 46 \pmod{60}$, and it is $3$.

Parity is the most common case. Modulo $2$ a sequence like $1, 3, 4, 7, 11, 18, \ldots$ with the Fibonacci rule reads odd, odd, even, and repeats with period $3$, which counts its even terms at once. For a recursion with more terms, write the residues until a full block of starting values comes back, and only then reduce the index. The period need not be short, so it is worth checking whether a known period, such as a Pisano period, applies before listing.

The signal is a recursively defined sequence with a question about a remainder, a units digit, or the parity of a far term. Reduce the recursion modulo the number in question and find the period of the residues. The Summary (N7.6) collects the chapter's strategies.`,
      related: [
        { card: "periodic-sequences", note: String.raw`the general method for a far term of any repeating sequence.` },
        { card: "cycle-hunting", note: String.raw`listing until a value returns, here with blocks of residues as the state (N3.2).` },
        { card: "linear-recurrence", note: String.raw`closed forms for linear recursions, which say more than their residues (A3.2).` }
      ],
      exercises: [
        { q: String.raw`What is the Pisano period of the Fibonacci numbers modulo $5$?`, answer: "20",
          solution: String.raw`Modulo $5$ the Fibonacci numbers run $0, 1, 1, 2, 3, 0, 3, 3, 1, 4, 0, 4, 4, 3, 2, 0, 2, 2, 4, 1$, and then $0, 1$ again. The block $0, 1$ first returns after $20$ terms, so the period is $20$.` },
        { q: String.raw`What is the units digit of $F_{2026}$, with $F_0 = 0$ and $F_1 = 1$?`, answer: "3",
          solution: String.raw`The Pisano period modulo $10$ is $60$, and $2026 = 60 \cdot 33 + 46$, so $F_{2026}$ has the units digit of $F_{46} = 1836311903$, which is $3$.` },
        { q: String.raw`What is the remainder when $F_{2026}$ is divided by $3$?`, answer: "1",
          solution: String.raw`Modulo $3$ the period is $8$: $0, 1, 1, 2, 0, 2, 2, 1$. Since $2026 = 8 \cdot 253 + 2$, $F_{2026} \equiv F_2 = 1$.` }
      ],
      problems: ["2017 AMC 10A, Problem 13", "2023 AMC 10B, Problem 6", "2021 Spring AMC 12A, Problem 8"]
    },
    "N7.6": {
      prereq: ["squares-mod-small", "eulers-criterion", "freshmans-dream", "wilsons-theorem", "multiplicative-order", "pisano-periods"],
      cards: [],
      body: String.raw`[[squares-mod-small|The squares modulo $3$, $4$, $5$, $8$ and $16$]] are short lists, and they rule out equations at once. Modulo an odd prime, half of the nonzero remainders are squares, and [[eulers-criterion|Euler's criterion]] decides which: $a^{(p-1)/2} \equiv \pm 1$.

[[freshmans-dream|The freshman's dream]] $(a + b)^p \equiv a^p + b^p \pmod p$ holds because the middle binomial coefficients are multiples of $p$. [[wilsons-theorem|Wilson's theorem]] gives $(p - 1)! \equiv -1 \pmod p$, and so $(p - 2)! \equiv 1$.

[[multiplicative-order|The order]] limits the primes that can divide an expression: a prime dividing $n^2 + 1$ is $2$ or $1$ modulo $4$, and a prime dividing $a^q - 1$ for a prime $q$, but not $a - 1$, is $1$ modulo $q$.

A recursion read modulo $m$ repeats, since there are finitely many states, and [[pisano-periods|the period of the Fibonacci numbers]] is the model. Finding the period turns the $2026$th term into an early one.`,
      strategies: [
        String.raw`Test a square, a cube or a fourth power modulo $3$, $4$, $5$, $8$, $9$ or $16$ to rule out an equation.`,
        String.raw`To decide whether $a$ is a square modulo an odd prime $p$, compute $a^{(p-1)/2} \bmod p$.`,
        String.raw`Modulo a prime $p$, expand $(a + b)^p$ as $a^p + b^p$.`,
        String.raw`For a factorial modulo a prime, use Wilson's theorem and pair numbers with their inverses.`,
        String.raw`If a prime divides $a^n - 1$, its order divides $n$; use this to restrict the prime's remainder.`,
        String.raw`Reduce a recursion modulo the number in question, find the period of the residues, and reduce the index.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`For how many $x$ from $1$ to $12$ is $x$ a square modulo $13$?`, answer: "6",
        solution: String.raw`The squares of $1, \ldots, 6$ modulo $13$ are $1, 4, 9, 3, 12, 10$, and $(13 - x)^2 \equiv x^2$, so these are all the nonzero squares. That is $6$ remainders, half of the $12$.` },
      { q: String.raw`Find every $x$ from $0$ to $10$ with $x^2 \equiv 5 \pmod{11}$.`, answer: "4, 7",
        solution: String.raw`Euler's criterion first: $5^5 = 3125 = 11 \cdot 284 + 1$, so $5^{(11-1)/2} \equiv 1$ and $5$ is a square. Testing, $4^2 = 16 \equiv 5$, and then $7 = 11 - 4$ works too. So $x = 4$ or $x = 7$.` },
      { q: String.raw`Find the remainder when $15!$ is divided by $17$.`, answer: "1",
        solution: String.raw`Wilson's theorem gives $16! \equiv -1 \pmod{17}$. Since $16 \equiv -1$, $16! = 16 \cdot 15! \equiv -15!$, so $-15! \equiv -1$ and $15! \equiv 1 \pmod{17}$.` },
      { q: String.raw`What is the last digit of $1^4 + 2^4 + \cdots + 100^4$?`, answer: "0",
        solution: String.raw`The last digit of $n^4$ depends only on the last digit of $n$: for $1, \ldots, 9, 0$ it is $1, 6, 1, 6, 5, 6, 1, 6, 1, 0$, with sum $33$. The numbers $1$ to $100$ run through every last digit $10$ times, so the sum ends like $10 \cdot 33 = 330$, in $0$.` },
      { q: String.raw`Find the remainder when the Fibonacci number $F_{2026}$ is divided by $5$.`, answer: "3",
        solution: String.raw`Modulo $5$ the Fibonacci numbers run $0, 1, 1, 2, 3, 0, 3, 3, 1, 4, 0, 4, 4, 3, 2, 0, 2, 2, 4, 1$, and then $0, 1$ again: the period is $20$. Since $2026 = 20 \cdot 101 + 6$, $F_{2026} \equiv F_6 = 8 \equiv 3$.` },
      { q: String.raw`How many primes less than $100$ divide $n^2 + 1$ for some integer $n$?`, answer: "12",
        solution: String.raw`If an odd prime $p$ divides $n^2 + 1$, then $n^2 \equiv -1$, so $n^4 \equiv 1$ and $n$ has order $4$; the order divides $p - 1$, so $p \equiv 1 \pmod 4$. Conversely every such prime works, since $-1$ is a square modulo it, and $2$ divides $1^2 + 1$. The primes below $100$ that are $1$ modulo $4$ are $5, 13, 17, 29, 37, 41, 53, 61, 73, 89, 97$; with $2$ that makes $12$.` }
    ],
    problems: [
      "2018 AIME II, Problem 2"
    ]
  },
  challenge: {
    exercises: [
      { q: String.raw`Find every prime $p$ for which $p^2 + 2$ is also prime.`, answer: "3",
        solution: String.raw`Look modulo $3$. A prime other than $3$ is not a multiple of $3$, so its square is $1$ modulo $3$, and $p^2 + 2$ is a multiple of $3$ larger than $3$, so not prime. For $p = 3$, $p^2 + 2 = 11$ is prime. So $p = 3$ is the only one.` },
      { q: String.raw`For how many $n$ from $1$ to $1000$ is $n^2 + n + 1$ a multiple of $7$?`, answer: "286",
        solution: String.raw`Test the remainders of $n$ modulo $7$: $n^2 + n + 1$ is $1, 3, 0, 6, 0, 3, 1$ for $n \equiv 0, \ldots, 6$, so $n \equiv 2$ or $4$. (Multiplying by $n - 1$ explains it: $n^3 \equiv 1$ with $n 
ot\equiv 1$, so $n$ has order $3$ modulo $7$.) From $1$ to $1000$ there are $143$ numbers that are $2$ modulo $7$ ($2, 9, \ldots, 996$) and $143$ that are $4$ ($4, \ldots, 998$), so $286$ in all.` }
    ],
    problems: [
      "2019 AMC 12A, Problem 21",
      "2022 AIME II, Problem 8"
    ]
  }
};
