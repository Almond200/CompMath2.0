// Learn, AIME Number Theory, chapter N3: cycles, exponentiation and order (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N3"] = {
  lessons: {
    "N3.1": {
      prereq: ["modular-basics"],
      cards: [],
      body: String.raw`This chapter finds remainders of huge powers, such as the last two digits of $7^{2026}$, without computing the powers. Its tools are the cycle of powers, Fermat's Little Theorem, the multiplicative order, Euler's theorem, and the Chinese Remainder Theorem for splitting the modulus.

There are only finitely many remainders modulo $n$, so the powers $a, a^2, a^3, \ldots$ modulo $n$ must eventually repeat, and from then on they cycle. The powers of $7$ modulo $10$ run $7, 9, 3, 1$ and repeat, so the units digit of $7^{203}$ is the third in the cycle, since $203 = 4 \cdot 50 + 3$: it is $3$. When $a$ is coprime to $n$ the cycle starts at the first power; when it is not, the powers may settle into the cycle only after a few steps.

For a prime modulus there is a general fact: if $p$ does not divide $a$, then $a^{p-1} \equiv 1 \pmod p$. This is Fermat's Little Theorem, and Euler's theorem extends it to any modulus coprime to $a$, with the exponent $\varphi(n)$, the number of residues coprime to $n$. The order of $a$ is the least exponent $k$ with $a^k \equiv 1$, and every exponent that gives $1$ is a multiple of it, so the order divides $p - 1$ and $\varphi(n)$.

When the modulus is composite, and above all when it shares a factor with the base, the modulus is split into prime powers, the remainder is found modulo each, and the answers are joined by the Chinese Remainder Theorem.

The lessons take these ideas in turn: direct cycles (N3.2), Fermat's Little Theorem (N3.3), the order (N3.4), Euler's theorem and the totient (N3.5), and orders with the Chinese Remainder Theorem (N3.6). The Summary (N3.7) collects the strategies.`,
      exercises: [
        { q: String.raw`What is the units digit of $7^{203}$?`, answer: "3",
          solution: String.raw`The powers of $7$ modulo $10$ are $7, 9, 3, 1$, and then they repeat with period $4$. Since $203 = 4 \cdot 50 + 3$, the units digit is the third entry, $3$.` },
        { q: String.raw`Find the remainder when $2^{100}$ is divided by $7$.`, answer: "2",
          solution: String.raw`The powers of $2$ modulo $7$ run $2, 4, 1$ and repeat with period $3$. Since $100 = 3 \cdot 33 + 1$, $2^{100} \equiv 2^1 = 2 \pmod 7$.` },
        { q: String.raw`Find the last two digits of $7^{2026}$.`, answer: "49",
          solution: String.raw`Modulo $100$, $7^2 = 49$ and $7^4 = 2401 \equiv 1$, so the powers of $7$ repeat with period $4$. Since $2026 = 4 \cdot 506 + 2$, $7^{2026} \equiv 7^2 = 49 \pmod{100}$.` }
      ],
      problems: [
        "2008 AMC 10A, Problem 24",
        "2004 AIME II, Problem 10",
        "2001 AIME II, Problem 10"
      ]
    },
    "N3.2": {
      prereq: ["modular-basics", "cycle-hunting", "last-digit-patterns"],
      cards: [],
      body: String.raw`A huge power and a small modulus are among the most common pairings on the AMC and the AIME: the units digit of $7^{202}$, the remainder when $2^{100}$ is divided by $7$, the last two digits of $3^{2026}$. None of them needs the power itself. The powers of a number, taken modulo $n$, can take only $n$ values, so they must eventually repeat, and once they repeat with a known period, a huge exponent can be traded for a small one.

To see why they repeat, write the powers of $a$ modulo $n$ in order: $a, a^2, a^3, \ldots$. Each is found from the one before it by the same step, multiplying by $a$ and reducing modulo $n$, and there are only $n$ possible residues. Among the first $n + 1$ powers, then, two must be equal. As soon as a value comes back, the steps that followed its first appearance repeat exactly, so from that point on the powers run around a cycle forever. Its length $T$ is the period.

When $a$ is coprime to $n$, the cycle begins at the very first power. Multiplying by $a$ can then be undone, because $a$ has an inverse modulo $n$: if $a^i \equiv a^j$ with $i < j$, dividing both sides by $a^i$ gives $a^{j-i} \equiv 1$, so $a^{j-i+1} \equiv a$ and the first power itself comes back. In that case $a^N$ leaves the same remainder as $a^r$, where $r$ is the remainder when $N$ is divided by $T$ (taking $r = T$ when that remainder is $0$). Finding $T$ is then a matter of listing the powers until the first one returns, which is quick when the modulus is small, and this routine of listing, spotting the return, and reducing the exponent is what [[cycle-hunting|finding the period]] means.

Units digits are the case met most often. The units digit of a product depends only on the units digits of its factors, so the units digits of a number's powers are its powers modulo $10$, and they always repeat from the first power with a period dividing $4$: that is, $a^5$ ends in the same digit as $a$ for every integer $a$.

When $a$ shares a factor with $n$, the argument breaks down, since $a$ has no inverse, and the first few powers may never come back. The powers of $2$ modulo $12$ run $2, 4, 8, 4, 8, \ldots$: the value $2$ appears once and is gone, and the cycle $4, 8$ begins only at $2^2$. The powers are then eventually periodic, here with period $2$ from the exponent $2$ on. So before reducing an exponent, find where the cycle begins as well as how long it is. If it begins at the exponent $s$ and has length $T$, an exponent $N \ge s$ can be lowered by multiples of $T$ until it lies between $s$ and $s + T - 1$, but never below $s$, where the cycle has not yet started.

The signal for all of this is a huge exponent with a small modulus, or a question about the last digit or the last two digits. When the modulus is large and the list would be long, the later lessons of the chapter find the length of a cycle without listing it: Fermat's Little Theorem for a prime modulus (N3.3), the order (N3.4), and Euler's theorem (N3.5).`,
      related: [
        { card: "cycle-hunting", note: String.raw`the routine of the explanation in general form, for any sequence whose next term depends only on a state with finitely many values, such as recursions modulo $m$ and repeating maps.` },
        { card: "last-digit-patterns", note: String.raw`the units digits of powers in one table, with the units digits of squares and the residues of cubes modulo $9$ that often appear beside them.` },
        { card: "modular-basics", note: String.raw`the rules that allow reducing modulo $n$ at every step of a power, which is what makes listing the powers short.` }
      ],
      exercises: [
        { q: String.raw`What is the units digit of $7^{203}$?`, answer: "3",
          solution: String.raw`The units digits of the powers of $7$ run $7, 9, 3, 1$ and then repeat, so they cycle with length $4$ from the first power on. Since $203 = 4 \cdot 50 + 3$, the power $7^{203}$ has the same units digit as $7^3 = 343$, which is $3$.` },
        { q: String.raw`What is the remainder when $2^{100}$ is divided by $7$?`, answer: "2",
          solution: String.raw`The powers of $2$ modulo $7$ run $2, 4, 1$ and then repeat, so they cycle with length $3$ from the first power on. Since $100 = 3 \cdot 33 + 1$, we get $2^{100} \equiv 2^1 = 2 \pmod 7$.` },
        { q: String.raw`What is the remainder when $2^{10}$ is divided by $12$?`, answer: "4",
          solution: String.raw`Here the base shares the factor $2$ with the modulus, so the cycle may start late. The powers of $2$ modulo $12$ run $2, 4, 8, 4, 8, \ldots$: the value $2$ never returns, and from $2^2$ on the powers alternate $4, 8$, with $4$ at the even exponents. Since $10$ is even, $2^{10} \equiv 4 \pmod{12}$. Indeed $1024 = 12 \cdot 85 + 4$.` }
      ],
      problems: ["2003 AMC 10A, Problem 16", "2023 AMC 10B, Problem 8", "2017 AIME I, Problem 3", "2025 AMC 12B, Problem 9"]
    },
    "N3.3": {
      prereq: ["cycle-hunting", "modular-basics"],
      cards: ["fermats-little-theorem"],
      body: String.raw`When the modulus is a prime $p$, the powers of a number never have to be listed to learn a period. [[fermats-little-theorem|Fermat's Little Theorem]] promises that $a^{p-1} \equiv 1 \pmod p$ for every $a$ that $p$ does not divide, so the powers of such an $a$ repeat every $p - 1$ steps from the first power on, and an exponent can be reduced modulo $p - 1$ straight away. The remainder of $2^{1000}$ on division by $13$ falls out in one line, where listing would have needed a dozen powers.

The reason is a rearrangement. Take the nonzero residues $1, 2, \ldots, p - 1$ and multiply each by $a$. The products $a, 2a, \ldots, (p-1)a$ are again nonzero modulo $p$, since $p$ divides neither factor, and no two of them agree: if $ia \equiv ja$, then $p$ divides $(i - j)a$, and as $p$ does not divide $a$ it must divide $i - j$, which is impossible for two different numbers between $1$ and $p - 1$. So the products are the same $p - 1$ residues in a new order. Multiplying all of them together gives $a^{p-1} (p-1)! \equiv (p-1)! \pmod p$, and since $(p-1)!$ shares no factor with $p$ it can be cancelled, which leaves $a^{p-1} \equiv 1$.

With the theorem in hand, $a^N$ leaves the same remainder as $a^r$, where $r$ is the remainder when $N$ is divided by $p - 1$. For $2^{1000}$ modulo $13$ this gives $1000 = 12 \cdot 83 + 4$, so $2^{1000} \equiv 2^4 = 16 \equiv 3$. Both conditions in the statement matter. The modulus must be prime: modulo $15$ the same reasoning would suggest $2^{14} \equiv 1$, but in fact $2^{14} \equiv 4$. And $p$ must not divide the base: $13^{1000}$ leaves remainder $0$, not $1$. Multiplying the theorem by $a$ gives the form $a^p \equiv a \pmod p$, which needs no condition on $a$ at all, since both sides are $0$ when $p$ divides $a$. That form is the one to use when a problem treats every integer alike, as in $n^5 \equiv n \pmod 5$.

The period $p - 1$ is guaranteed, but it need not be the shortest one. Modulo $13$ the powers of $3$ run $3, 9, 1$ and repeat every $3$ steps, well before $12$. Reducing an exponent modulo $p - 1$ is still correct, because any multiple of the true period is also a period; finding the shortest one is the subject of N3.4. One more consequence is worth having at hand: since $a \cdot a^{p-2} = a^{p-1} \equiv 1$, the power $a^{p-2}$ is the inverse of $a$ modulo $p$.

The signal is a prime modulus with a huge exponent, or a statement about $n^{p}$ or $n^{p-1}$ for all integers $n$. A composite modulus needs Euler's theorem (N3.5), or a split into prime powers with the Chinese Remainder Theorem (N3.6).`,
      related: [
        { card: "modular-inverse", note: String.raw`inverses modulo $p$, of which $a^{p-2}$ is one formula among several (the extended Euclidean algorithm is the faster one by hand).` },
        { card: "multiplicative-order", note: String.raw`the shortest period, which always divides the $p - 1$ that Fermat guarantees.` },
        { card: "eulers-theorem", note: String.raw`the same statement for any modulus, with $\varphi(n)$ in place of $p - 1$.` }
      ],
      exercises: [
        { q: String.raw`What is the remainder when $5^{1000}$ is divided by $13$?`, answer: "1",
          solution: String.raw`Since $13$ is prime and does not divide $5$, Fermat's Little Theorem gives $5^{12} \equiv 1$, so the exponent can be reduced modulo $12$: $1000 = 12 \cdot 83 + 4$, and $5^{1000} \equiv 5^4 = 625 = 13 \cdot 48 + 1 \equiv 1$. (The period is in fact $4$, since $5^4 \equiv 1$ already.)` },
        { q: String.raw`What is the remainder when $3^{100}$ is divided by $7$?`, answer: "4",
          solution: String.raw`Fermat's Little Theorem gives $3^6 \equiv 1 \pmod 7$. Since $100 = 6 \cdot 16 + 4$, we get $3^{100} \equiv 3^4 = 81 = 7 \cdot 11 + 4 \equiv 4$.` },
        { q: String.raw`What is the remainder when $26^{100} + 2^{100}$ is divided by $13$?`, answer: "3",
          solution: String.raw`Fermat's Little Theorem does not apply to $26^{100}$, because $13$ divides $26$; instead $26^{100}$ is a multiple of $13$ and leaves remainder $0$. For $2^{100}$ the theorem gives $2^{12} \equiv 1$, and $100 = 12 \cdot 8 + 4$, so $2^{100} \equiv 2^4 = 16 \equiv 3$. The sum leaves remainder $0 + 3 = 3$.` },
        { q: String.raw`Find the inverse of $3$ modulo $11$, as a residue between $0$ and $10$.`, answer: "4",
          solution: String.raw`By Fermat's Little Theorem the inverse is $3^{11-2} = 3^9$. Modulo $11$, $3^2 = 9$, $3^4 = 81 \equiv 4$, $3^8 \equiv 16 \equiv 5$, so $3^9 \equiv 5 \cdot 3 = 15 \equiv 4$. Check: $3 \cdot 4 = 12 \equiv 1$.` }
      ],
      problems: ["2017 AMC 10B, Problem 14", "1989 AIME, Problem 9", "2002 AIME I, Problem 7"]
    },
    "N3.4": {
      prereq: ["fermats-little-theorem", "cycle-hunting"],
      cards: ["multiplicative-order"],
      body: String.raw`A guaranteed period is often far longer than the true one. Modulo $13$, Fermat's Little Theorem says the powers of $3$ repeat every $12$ steps, but $3^3 = 27 \equiv 1$, so they actually repeat every $3$. The smallest positive $k$ with $a^k \equiv 1 \pmod n$ is the [[multiplicative-order|order]] of $a$ modulo $n$, defined whenever $a$ is coprime to $n$. It is exactly the length of the cycle of powers, and the one fact that makes it useful is that it divides every exponent that gives $1$.

That fact follows from division with remainder. Suppose the order is $d$ and $a^N \equiv 1$. Write $N = qd + r$ with $0 \le r < d$. Then $a^N = (a^d)^q a^r \equiv a^r$, so $a^r \equiv 1$ as well. A positive $r$ would be a smaller exponent giving $1$ than the order itself, which is impossible, so $r = 0$ and $d$ divides $N$. Applied to Fermat's $a^{p-1} \equiv 1$, it says the order of $a$ modulo a prime $p$ divides $p - 1$.

This turns the search for a period into a short check. Modulo $13$ the order of any base not divisible by $13$ is one of the divisors $1, 2, 3, 4, 6, 12$ of $12$, so only those exponents need testing. For $2$: $2^4 = 16 \equiv 3$ and $2^6 = 64 \equiv 12$, neither of them $1$, so the order of $2$ is $12$; testing $4$ and $6$ is enough, because every proper divisor of $12$ divides one of them. For $3$ the test stops at $3$. Once the order $d$ is known, $a^N$ reduces to $a^r$ with $r$ the remainder of $N$ on division by $d$, so $3^{202} \equiv 3^1 = 3 \pmod{13}$, because $202 = 3 \cdot 67 + 1$.

A value of $-1$ along the way is a strong hint. If $a^m \equiv -1$, then $a^{2m} \equiv 1$, so the order divides $2m$; and as long as $-1 \not\equiv 1$, which holds for every modulus above $2$, the order does not divide $m$. Modulo $101$ this settles the order of $10$ at once: $10^2 = 100 \equiv -1$, so the order divides $4$ but not $2$, and it is $4$. The same reasoning runs backward in olympiad-flavored problems: an odd prime $p$ dividing $a^8 + 1$ makes the order of $a$ modulo $p$ exactly $16$, so $16$ divides $p - 1$.

The signal is a question about when a power first returns to $1$, a pattern of $-1$ in the powers, or a period that is clearly shorter than $p - 1$. When the modulus is composite, the same divisibility holds with $\varphi(n)$ from N3.5 in place of $p - 1$.`,
      related: [
        { card: "fermats-little-theorem", note: String.raw`the guaranteed period $p - 1$, which the order always divides.` },
        { card: "repeating-decimals", note: String.raw`the period of the decimal of $1/p$ is the order of $10$ modulo $p$; the chapter on bases and decimals (N6) builds on this.` },
        { card: "primitive-roots", note: String.raw`a base whose order is the full $p - 1$, so that its powers run through every nonzero residue.` }
      ],
      exercises: [
        { q: String.raw`What is the order of $2$ modulo $13$?`, answer: "12",
          solution: String.raw`The order divides $12$, so it is one of $1, 2, 3, 4, 6, 12$. Every proper divisor divides $4$ or $6$, and $2^4 = 16 \equiv 3$, $2^6 = 64 \equiv 12$, so neither $2^4$ nor $2^6$ is $1$. Hence no proper divisor works, and the order is $12$.` },
        { q: String.raw`What is the order of $10$ modulo $101$?`, answer: "4",
          solution: String.raw`$10^2 = 100 \equiv -1 \pmod{101}$, so $10^4 \equiv 1$ and the order divides $4$. It does not divide $2$, since $10^2 \equiv -1 \ne 1$ and $10^1 \ne 1$. So the order is $4$.` },
        { q: String.raw`What is the remainder when $3^{202}$ is divided by $13$?`, answer: "3",
          solution: String.raw`$3^3 = 27 = 2 \cdot 13 + 1$, so the order of $3$ modulo $13$ is $3$ (it is not $1$). Since $202 = 3 \cdot 67 + 1$, we get $3^{202} \equiv 3^1 = 3$.` }
      ],
      problems: ["2018 AMC 10B, Problem 13", "2019 AIME I, Problem 14"]
    },
    "N3.5": {
      prereq: ["multiplicative-order", "fermats-little-theorem"],
      cards: ["eulers-theorem", "eulers-totient"],
      body: String.raw`Fermat's Little Theorem needs a prime modulus, but the last two digits of a power are a question modulo $100$. [[eulers-theorem|Euler's theorem]] covers every modulus: if $a$ is coprime to $n$, then $a^{\varphi(n)} \equiv 1 \pmod n$, where $\varphi(n)$ counts the numbers from $1$ to $n$ that are coprime to $n$. With it, the powers of any base coprime to the modulus repeat with a period dividing $\varphi(n)$, and the order of the base divides $\varphi(n)$ as well.

The proof is Fermat's rearrangement with the right set of residues. Let $r_1, \ldots, r_{\varphi(n)}$ be the residues coprime to $n$. Multiplying each by $a$ gives products that are still coprime to $n$, and no two agree, because $a$ has an inverse modulo $n$ that would undo the multiplication. So the products are the same residues in a new order, and multiplying them all together gives $a^{\varphi(n)} r_1 \cdots r_{\varphi(n)} \equiv r_1 \cdots r_{\varphi(n)}$. The product of the $r_i$ is coprime to $n$, so it cancels, leaving $a^{\varphi(n)} \equiv 1$. For a prime $p$ every nonzero residue is coprime to $p$, so $\varphi(p) = p - 1$ and Fermat is the special case.

The count $\varphi(n)$ comes from the factorization of $n$. A number fails to be coprime to $n$ exactly when it shares one of the primes of $n$, and removing the multiples of each prime in turn gives [[eulers-totient|$\varphi(n) = n \prod (1 - \tfrac1p)$]] over the distinct primes $p$ dividing $n$. So $\varphi(100) = 100 \cdot \tfrac12 \cdot \tfrac45 = 40$, $\varphi(1000) = 400$, and $\varphi(125) = 100$. For the last two digits of $3^{2026}$, Euler gives $3^{40} \equiv 1 \pmod{100}$, which already brings the exponent down to $2026 \equiv 26 \pmod{40}$.

Like Fermat's period, Euler's is guaranteed but not always the shortest. The order of $3$ modulo $100$ is $20$, a divisor of $40$, and with it $2026 \equiv 6 \pmod{20}$ and $3^6 = 729$, so $3^{2026}$ ends in $29$. The order of $7$ modulo $100$ is only $4$, since $7^4 = 2401$. Either period gives the right answer, because any multiple of the order is a period; the order just gives a smaller power to compute. The smallest exponent that works for every base coprime to $n$ at once is the Carmichael function, which for $100$ is $20$.

The condition that the base is coprime to the modulus cannot be dropped: $2^{40}$ is not $1$ modulo $100$, since it is even. A base that shares a factor with the modulus is handled in N3.6 by splitting the modulus into prime powers. The signal for Euler is a composite modulus, very often a power of $10$, and a base coprime to it.`,
      related: [
        { card: "carmichael-function", note: String.raw`the smallest exponent $\lambda(n)$ that sends every base coprime to $n$ to $1$; it divides $\varphi(n)$ and is often much smaller.` },
        { card: "multiplicative-order", note: String.raw`the shortest period of one base, which divides $\varphi(n)$ by the argument of N3.4.` },
        { card: "fermats-little-theorem", note: String.raw`the case of a prime modulus, where $\varphi(p) = p - 1$.` }
      ],
      exercises: [
        { q: String.raw`Compute $\varphi(100)$.`, answer: "40",
          solution: String.raw`$100 = 2^2 \cdot 5^2$, so $\varphi(100) = 100 \cdot \left(1 - \tfrac12\right)\left(1 - \tfrac15\right) = 100 \cdot \tfrac12 \cdot \tfrac45 = 40$.` },
        { q: String.raw`Compute $\varphi(1000)$.`, answer: "400",
          solution: String.raw`$1000 = 2^3 \cdot 5^3$, so $\varphi(1000) = 1000 \cdot \tfrac12 \cdot \tfrac45 = 400$.` },
        { q: String.raw`What are the last two digits of $7^{2026}$? Give them as a number from $0$ to $99$.`, answer: "49",
          solution: String.raw`Euler's theorem gives $7^{40} \equiv 1 \pmod{100}$, but the order of $7$ is smaller: $7^2 = 49$ and $7^4 = 2401 \equiv 1$. Since $2026 = 4 \cdot 506 + 2$, we get $7^{2026} \equiv 7^2 = 49$, so the last two digits are $49$.` },
        { q: String.raw`What are the last two digits of $3^{2026}$?`, answer: "29",
          solution: String.raw`Euler's theorem gives $3^{40} \equiv 1 \pmod{100}$, and in fact $3^{20} \equiv 1$: $3^{10} = 59049 \equiv 49$ and $49^2 = 2401 \equiv 1$. Since $2026 = 20 \cdot 101 + 6$, we get $3^{2026} \equiv 3^6 = 729 \equiv 29$.` }
      ],
      problems: ["2024 AMC 10B, Problem 18"]
    },
    "N3.6": {
      prereq: ["crt", "eulers-theorem", "multiplicative-order"],
      cards: [],
      body: String.raw`The last two methods fail exactly when the base shares a factor with the modulus: $2^{2026}$ modulo $100$ has no Euler period, because $2$ and $100$ are not coprime. The way through is to split the modulus into coprime prime powers, find the power modulo each one, and join the answers with the [[crt|Chinese Remainder Theorem]]. Splitting also explains how periods combine, which is what most of the harder AIME problems on powers turn on.

Modulo a prime power that divides the base, the power simply becomes $0$ once the exponent is large enough. Since $100 = 4 \cdot 25$ with $4$ and $25$ coprime, $2^{2026}$ can be found modulo each part. Modulo $4$ it is $0$, because $4$ divides $2^2$ and every later power. Modulo $25$ the base is coprime to the modulus, so N3.4 and N3.5 apply: the order of $2$ modulo $25$ is $20$, $2026 \equiv 6 \pmod{20}$, and $2^6 = 64 \equiv 14$. The number below $100$ that is $0$ modulo $4$ and $14$ modulo $25$ is $64$, so $2^{2026}$ ends in $64$. The same splitting works when the base is coprime to the whole modulus but the pieces are easier: $3^{2026}$ is $1$ modulo $4$ and $4$ modulo $25$, and those two join to $29$.

When the powers repeat modulo each part, they repeat modulo the whole with the least common multiple of the periods. If $a^N$ returns to $1$ modulo $m$ exactly when the order $d_1$ divides $N$, and modulo a coprime $n$ exactly when $d_2$ divides $N$, then it returns to $1$ modulo $mn$ exactly when both do, that is, when $\operatorname{lcm}(d_1, d_2)$ divides $N$. The order of $3$ modulo $20$ is therefore $\operatorname{lcm}(2, 4) = 4$, from its orders $2$ modulo $4$ and $4$ modulo $5$, and modulo $143^2 = 121 \cdot 169$ the order of $3$ is $\operatorname{lcm}(5, 39) = 195$.

That leaves a choice of tools, and the cue in a problem usually decides it. A small modulus is fastest by listing the powers (N3.2). A prime modulus calls for Fermat (N3.3). A power that returns to $1$, or to $-1$, early calls for the order (N3.4). A composite modulus coprime to the base calls for Euler (N3.5). A modulus that factors into pieces with different behavior, or a base that shares a factor with it, calls for splitting with the Chinese Remainder Theorem and joining at the end. Many problems use two of these together: Euler or the order on the coprime part, and the plain fact that a power of $2$ is eventually $0$ modulo $8$ on the other. The Summary (N3.7) collects the chapter's strategies.`,
      related: [
        { card: "crt", note: String.raw`the joining step: a residue modulo each coprime part determines one residue modulo the product.` },
        { card: "gcd-lcm-product", note: String.raw`the least common multiple of the periods of the parts, which is the period modulo the whole.` },
        { card: "carmichael-function", note: String.raw`built exactly this way, as the least common multiple of its values on the prime powers of $n$.` }
      ],
      exercises: [
        { q: String.raw`What are the last two digits of $2^{2026}$?`, answer: "64",
          solution: String.raw`Split $100 = 4 \cdot 25$. Modulo $4$, $2^{2026} \equiv 0$. Modulo $25$, the order of $2$ is $20$ ($2^{10} = 1024 \equiv -1$, so the order divides $20$ but not $10$, and it is not $4$ since $2^4 = 16$), and $2026 \equiv 6 \pmod{20}$, so $2^{2026} \equiv 2^6 = 64 \equiv 14$. The number below $100$ that is $0$ modulo $4$ and $14$ modulo $25$ is $64$ (the candidates $14, 39, 64, 89$, of which only $64$ is divisible by $4$).` },
        { q: String.raw`Find $3^{2026}$ modulo $4$ and modulo $25$, and join them to give the last two digits of $3^{2026}$.`, answer: "29",
          solution: String.raw`Modulo $4$, $3 \equiv -1$ and the exponent is even, so $3^{2026} \equiv 1$. Modulo $25$, the order of $3$ is $20$, and $2026 \equiv 6 \pmod{20}$, so $3^{2026} \equiv 3^6 = 729 \equiv 4$. The candidates below $100$ that are $4$ modulo $25$ are $4, 29, 54, 79$, and of these only $29$ is $1$ modulo $4$.` },
        { q: String.raw`What is the order of $3$ modulo $20$?`, answer: "4",
          solution: String.raw`Modulo $4$ the powers of $3$ alternate $3, 1$, so the order is $2$. Modulo $5$ they run $3, 4, 2, 1$, so the order is $4$. Modulo $20 = 4 \cdot 5$ the order is $\operatorname{lcm}(2, 4) = 4$, and indeed $3^4 = 81 \equiv 1 \pmod{20}$ while $3^2 = 9 \not\equiv 1$.` }
      ],
      problems: ["2011 AIME I, Problem 11", "2018 AIME I, Problem 11"]
    },
    "N3.7": {
      prereq: ["cycle-hunting", "fermats-little-theorem", "multiplicative-order", "eulers-theorem", "eulers-totient", "crt"],
      cards: [],
      body: String.raw`The powers of a number modulo $n$ repeat, and [[cycle-hunting|finding the period]] by listing them is the first tool for a small modulus. [[fermats-little-theorem|Fermat's Little Theorem]] gives $a^{p-1} \equiv 1 \pmod p$ for a prime $p$ not dividing $a$, so exponents can be reduced modulo $p - 1$.

[[multiplicative-order|The order]] of $a$ modulo $n$ is the least exponent that gives $1$; every exponent that gives $1$ is a multiple of it, so the order divides $p - 1$, or $\varphi(n)$, and is found among their divisors. [[eulers-theorem|Euler's theorem]] gives $a^{\varphi(n)} \equiv 1$ for $a$ coprime to $n$, with [[eulers-totient|the totient]] computed from the prime factorization.

For a composite modulus, especially one that shares a factor with the base, [[crt|the Chinese Remainder Theorem]] splits the problem: a power of a factor of the modulus is eventually $0$ modulo that prime power, the coprime part is handled by Euler or the order, and the pieces are joined.`,
      strategies: [
        String.raw`For a huge exponent and a small modulus, list the powers until they repeat, then reduce the exponent modulo the period.`,
        String.raw`For a prime modulus, reduce the exponent modulo $p - 1$.`,
        String.raw`To find an order, test only the divisors of $p - 1$ or of $\varphi(n)$.`,
        String.raw`When $a^m \equiv 1$ and $a^k \equiv 1$, the order divides $\gcd(m, k)$.`,
        String.raw`For a composite modulus coprime to the base, reduce the exponent modulo $\varphi(n)$, or modulo the order if it is smaller.`,
        String.raw`If the base shares a factor with the modulus, split the modulus into prime powers, and join the answers with the Chinese Remainder Theorem.`,
        String.raw`For a tower of exponents, work from the top down, reducing each exponent modulo the period of the level below.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the remainder when $3^{100}$ is divided by $13$.`, answer: "3",
        solution: String.raw`Since $3^3 = 27 \equiv 1 \pmod{13}$, the order of $3$ is $3$ (a divisor of $12$, as Fermat's theorem requires). Since $100 = 3 \cdot 33 + 1$, $3^{100} \equiv 3 \pmod{13}$.` },
      { q: String.raw`What is the order of $2$ modulo $11$?`, answer: "10",
        solution: String.raw`The order divides $10$, so test $1$, $2$, $5$: $2^1 = 2$, $2^2 = 4$, $2^5 = 32 \equiv 10 \pmod{11}$. None is $1$, so the order is $10$.` },
      { q: String.raw`Compute $\varphi(360)$.`, answer: "96",
        solution: String.raw`Factor: $360 = 2^3 \cdot 3^2 \cdot 5$. Then $\varphi(360) = 360 \cdot \tfrac12 \cdot \tfrac23 \cdot \tfrac45 = 96$.` },
      { q: String.raw`Find the last two digits of $2^{2026}$.`, answer: "64",
        solution: String.raw`Split $100 = 4 \cdot 25$. Modulo $4$, $2^{2026} \equiv 0$. Modulo $25$, Euler's theorem gives $2^{20} \equiv 1$, and $2026 = 20 \cdot 101 + 6$, so $2^{2026} \equiv 2^6 = 64 \equiv 14$. The number from $0$ to $99$ that is $0$ modulo $4$ and $14$ modulo $25$ is $64$.` },
      { q: String.raw`Find the last two digits of $3^{2026}$.`, answer: "29",
        solution: String.raw`Modulo $4$, $3^{2026} = 9^{1013} \equiv 1$. Modulo $25$, $3^{20} \equiv 1$ by Euler's theorem, and $2026 \equiv 6 \pmod{20}$, so $3^{2026} \equiv 3^6 = 729 \equiv 4$. The number that is $1$ modulo $4$ and $4$ modulo $25$ is $29$.` },
      { q: String.raw`Find the last two digits of $7^{7^7}$.`, answer: "43",
        solution: String.raw`Modulo $100$ the powers of $7$ have period $4$ ($7^4 = 2401$). So reduce the exponent modulo $4$: $7 \equiv -1$, so $7^7 \equiv -1 \equiv 3 \pmod 4$. Then $7^{7^7} \equiv 7^3 = 343 \equiv 43 \pmod{100}$.` },
      { q: String.raw`What is the least positive $n$ such that $41$ divides $\underbrace{11\ldots1}_{n}$, the number made of $n$ ones?`, answer: "5",
        solution: String.raw`The number of $n$ ones is $\tfrac{10^n - 1}{9}$, and $41$ is coprime to $9$, so $41$ divides it exactly when $10^n \equiv 1 \pmod{41}$. The order of $10$ divides $40$; testing, $10^2 \equiv 18$, $10^4 \equiv 18^2 = 324 \equiv 37$, $10^5 \equiv 370 \equiv 1$. So $n = 5$, and indeed $11111 = 41 \cdot 271$.` }
    ],
    problems: [
      "2021 AIME II, Problem 13",
      "2015 AMC 12A, Problem 22"
    ]
  },
  challenge: {
    problems: [
      "2016 AMC 12B, Problem 25",
      "2021 AIME I, Problem 14",
      "2025 AIME II, Problem 13"
    ]
  }
};
