// Learn, AIME Number Theory, chapter N7: residue patterns and special constraints (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N7"] = {
  lessons: {
    "N7.1": {
      prereq: ["choose-modulus", "fermats-little-theorem"],
      cards: ["squares-mod-small", "eulers-criterion"],
      body: String.raw`A square can leave only certain remainders: modulo $7$ the nonzero squares are $1$, $2$, and $4$, and modulo $8$ every square is $0$, $1$, or $4$. Those remainders are the [[squares-mod-small|quadratic residues]], and knowing which residues are squares is what makes a modulus useful against an equation with squares in it. It explains, for example, why $p^2 + 26$ is never prime for a prime $p$: modulo $3$ it is always $0$.

For a small modulus the residues are found by squaring every class, and only half of them need squaring, since $x$ and $-x$ have the same square. Modulo an odd prime $p$, the squares of $1, \ldots, \tfrac{p-1}{2}$ are all different (two equal squares $x^2 \equiv y^2$ give $p \mid (x - y)(x + y)$), so there are exactly $\tfrac{p-1}{2}$ nonzero residues and as many non-residues; modulo $13$ that is $6$ of each. Small composite moduli are worth memorizing in the form that problems use: squares are $0, 1$ modulo $3$ and $4$; $0, 1, 4$ modulo $8$; $0, \pm 1$ modulo $5$; and odd squares are $1$ modulo $8$.

For a large prime there is a test that avoids squaring everything. [[eulers-criterion|Euler's criterion]] says that for $a$ not divisible by an odd prime $p$, $a^{(p-1)/2} \equiv 1$ when $a$ is a square modulo $p$ and $\equiv -1$ when it is not. The reason is Fermat's theorem: $a^{(p-1)/2}$ squares to $a^{p-1} \equiv 1$, so it is $\pm 1$; when $a \equiv x^2$ it equals $x^{p-1} \equiv 1$; and the polynomial $X^{(p-1)/2} - 1$ has at most $\tfrac{p-1}{2}$ roots, all of them used up by the residues. So $3$ is a square modulo $11$, because $3^5 = 243 \equiv 1$, and indeed $5^2 = 25 \equiv 3$. The special case $a = -1$ says that $-1$ is a square modulo $p$ exactly when $\tfrac{p-1}{2}$ is even, that is when $p \equiv 1 \pmod 4$.

The signal is an equation or expression involving squares with a divisibility or primality question. Pick a modulus whose square residues are few, and use the residue list to rule out cases or fix a residue.`,
      related: [
        { card: "choose-modulus", note: String.raw`choosing the modulus to match the powers in an equation (N5.3).` },
        { card: "quadratic-reciprocity", note: String.raw`deciding whether $p$ is a square modulo $q$ by flipping to $q$ modulo $p$ (N8.3).` },
        { card: "sum-of-two-squares", note: String.raw`$-1$ being a square modulo $p \equiv 1 \pmod 4$ is the first step toward writing $p$ as a sum of two squares (N5.4).` }
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
    "N7.2": {
      prereq: ["last-digit-patterns", "prime-divides-binomial"],
      cards: ["freshmans-dream"],
      body: String.raw`Powers modulo a fixed number fall into a few patterns that are worth knowing before a problem asks for them. Fourth powers modulo $16$ are only $0$ and $1$, fifth powers modulo $10$ end in the same digit as the base, and a power of a number ending in $25$ keeps ending in $25$. Behind several of these sits one identity, $(a + b)^p \equiv a^p + b^p \pmod p$, which is called the freshman's dream because it is the mistake beginners make in ordinary algebra, but it is exactly true modulo a prime.

The [[freshmans-dream|freshman's dream]] follows from N4.3: in the expansion of $(a + b)^p$ every middle coefficient $\binom pk$ is a multiple of $p$, so only $a^p$ and $b^p$ survive. Applied repeatedly it gives $(a_1 + \cdots + a_n)^p \equiv a_1^p + \cdots + a_n^p$, and with every $a_i = 1$ it gives $n^p \equiv n$, a second proof of Fermat's Little Theorem. It also explains why, modulo $7$, $2^7 + 3^7 \equiv (2 + 3)^7 = 5^7 \equiv 5$.

Patterns modulo a prime power or a product of primes come from combining the pieces. A fourth power modulo $16$: an odd $n$ has $n^2 \equiv 1 \pmod 8$, so $n^4 = (n^2)^2 \equiv 1 \pmod{16}$, and an even $n$ has $16 \mid n^4$. Modulo $5$, every fourth power of a number not divisible by $5$ is $1$, so the sum $1^4 + 2^4 + \cdots + 10^4$ is congruent to the count of terms not divisible by $5$, which is $8 \equiv 3$. Last-two-digit questions about a power are often settled by noticing that the base ends in $25$, $76$, or $01$, endings that reproduce themselves under multiplication, or by the order arguments of N3.

The signal is a power, sum of powers, or binomial raised to a prime, asked modulo a small number. Look for the pattern that makes the power collapse, then reduce.`,
      related: [
        { card: "prime-divides-binomial", note: String.raw`the vanishing middle coefficients behind the freshman's dream (N4.3).` },
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
    "N7.3": {
      prereq: ["multiplicative-order", "modular-inverse"],
      cards: ["wilsons-theorem"],
      body: String.raw`The structure of the residues modulo a prime puts strong limits on which primes can divide a given kind of number. A prime that divides $n^2 + 1$ for some $n$ must be $2$ or $\equiv 1 \pmod 4$; a prime dividing $a^8 + 1$ must be $\equiv 1 \pmod{16}$. And the product of all the nonzero residues has a fixed value: $(p - 1)! \equiv -1 \pmod p$, which is [[wilsons-theorem|Wilson's theorem]].

Wilson's theorem is a pairing argument. Each residue $1, \ldots, p - 1$ has an inverse, and the only residues equal to their own inverse are the roots of $x^2 \equiv 1$, namely $1$ and $p - 1$. All the others pair off into products equal to $1$, so the whole product is $1 \cdot (p - 1) \equiv -1$. Thus $10! \equiv 10 \pmod{11}$. The theorem gives the values of nearby factorials too: since $(p - 1)! = (p - 1)\,(p - 2)!$ and $p - 1 \equiv -1$, we get $(p - 2)! \equiv 1$, so $15! \equiv 1 \pmod{17}$; one more step gives $(p - 3)! \equiv \tfrac{p - 1}{2}$, so $16! \equiv 9 \pmod{19}$. The converse holds as well: $(n - 1)! \equiv -1 \pmod n$ only for primes $n$.

Restrictions on prime divisors come from orders. If an odd prime $p$ divides $n^2 + 1$, then $n^2 \equiv -1$ and $n^4 \equiv 1$, so the order of $n$ modulo $p$ is exactly $4$, and since the order divides $p - 1$, $p \equiv 1 \pmod 4$. Conversely, every prime $\equiv 1 \pmod 4$ does divide some $n^2 + 1$, by Euler's criterion. So the primes below $50$ that divide a number of the form $n^2 + 1$ are $2, 5, 13, 17, 29, 37, 41$. The same reasoning with $a^{2^k} \equiv -1$ shows that the order is $2^{k+1}$, and the prime is $1$ modulo $2^{k+1}$.

The signal is a factorial modulo a prime near it, or a question about which primes can divide a number of a special form. Use Wilson for the first and the order of the base for the second.`,
      related: [
        { card: "multiplicative-order", note: String.raw`an order of exactly $4$ or $16$ forces the prime's residue modulo $4$ or $16$ (N3.4).` },
        { card: "eulers-criterion", note: String.raw`$-1$ is a square modulo $p$ exactly when $p \equiv 1 \pmod 4$ (N7.1).` },
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
    "N7.4": {
      prereq: ["periodic-sequences", "cycle-hunting"],
      cards: ["pisano-periods"],
      body: String.raw`A sequence defined by a recursion becomes periodic as soon as it is read modulo a fixed number, because each term depends only on the few terms before it, and those can take only finitely many values. Modulo $3$ the Fibonacci numbers run $0, 1, 1, 2, 0, 2, 2, 1$ and then start again, so any eight consecutive Fibonacci numbers add to a multiple of $3$. The same reasoning finds the units digit of $F_{2026}$ without computing a number with over four hundred digits.

For a recursion that uses the last $k$ terms, the state is the block of $k$ consecutive residues, and there are at most $m^k$ such blocks modulo $m$, so a block must repeat and the sequence is periodic from there on, exactly as in N3.2. When the recursion can also be run backward, as the Fibonacci rule $F_{n-1} = F_{n+1} - F_n$ can, the sequence repeats from the very start. The period of the Fibonacci numbers modulo $m$ is the [[pisano-periods|Pisano period]]: $3$ modulo $2$, $8$ modulo $3$, $20$ modulo $5$, and $60$ modulo $10$. So the units digit of $F_{2026}$ is that of $F_{46}$, since $2026 \equiv 46 \pmod{60}$, and it is $3$.

Parity is the most common case. Modulo $2$ a sequence like $1, 3, 4, 7, 11, 18, \ldots$ with the Fibonacci rule reads odd, odd, even, and repeats with period $3$, which counts its even terms at once. For a recursion with more terms, write the residues until a full block of starting values comes back, and only then reduce the index. The period need not be short, so it is worth checking whether a known period, such as a Pisano period, applies before listing.

The signal is a recursively defined sequence with a question about a remainder, a units digit, or the parity of a far term. Reduce the recursion modulo the number in question and find the period of the residues.`,
      related: [
        { card: "periodic-sequences", note: String.raw`the general method for a far term of any repeating sequence.` },
        { card: "cycle-hunting", note: String.raw`listing until a value returns, here with blocks of residues as the state (N3.2).` },
        { card: "linear-recurrence", note: String.raw`closed forms for linear recursions, which say more than their residues (A3.1).` }
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
    }
  },
  review: ["2006 AMC 10B, Problem 11", "2015 AMC 10B, Problem 10", "2019 AMC 12A, Problem 21", "2018 AIME II, Problem 2",
    "2022 AIME II, Problem 8", "1988 AIME, Problem 2"]
};
