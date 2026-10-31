// Learn, AIME Number Theory, chapter N3: cycles, exponentiation and order (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N3"] = {
  lessons: {
    "N3.1": {
      prereq: ["modular-basics"],
      cards: ["cycle-hunting", "last-digit-patterns"],
      body: String.raw`A huge power and a small modulus are among the most common pairings on the AMC and the AIME: the units digit of $7^{202}$, the remainder when $2^{100}$ is divided by $7$, the last two digits of $3^{2026}$. None of them needs the power itself. The powers of a number, taken modulo $n$, can take only $n$ values, so they must eventually repeat, and once they repeat with a known period, a huge exponent can be traded for a small one.

To see why they repeat, write the powers of $a$ modulo $n$ in order: $a, a^2, a^3, \ldots$. Each is found from the one before it by the same step, multiplying by $a$ and reducing modulo $n$, and there are only $n$ possible residues. Among the first $n + 1$ powers, then, two must be equal. As soon as a value comes back, the steps that followed its first appearance repeat exactly, so from that point on the powers run around a cycle forever. Its length $T$ is the period.

When $a$ is coprime to $n$, the cycle begins at the very first power. Multiplying by $a$ can then be undone, because $a$ has an inverse modulo $n$: if $a^i \equiv a^j$ with $i < j$, dividing both sides by $a^i$ gives $a^{j-i} \equiv 1$, so $a^{j-i+1} \equiv a$ and the first power itself comes back. In that case $a^N$ leaves the same remainder as $a^r$, where $r$ is the remainder when $N$ is divided by $T$ (taking $r = T$ when that remainder is $0$). Finding $T$ is then a matter of listing the powers until the first one returns, which is quick when the modulus is small, and this routine of listing, spotting the return, and reducing the exponent is what [[cycle-hunting|finding the period]] means.

Units digits are the case met most often. The units digit of a product depends only on the units digits of its factors, so the units digits of a number's powers are its powers modulo $10$, and they always repeat from the first power with a period dividing $4$: that is, $a^5$ ends in the same digit as $a$ for every integer $a$.

When $a$ shares a factor with $n$, the argument breaks down, since $a$ has no inverse, and the first few powers may never come back. The powers of $2$ modulo $12$ run $2, 4, 8, 4, 8, \ldots$: the value $2$ appears once and is gone, and the cycle $4, 8$ begins only at $2^2$. The powers are then eventually periodic, here with period $2$ from the exponent $2$ on. So before reducing an exponent, find where the cycle begins as well as how long it is. If it begins at the exponent $s$ and has length $T$, an exponent $N \ge s$ can be lowered by multiples of $T$ until it lies between $s$ and $s + T - 1$, but never below $s$, where the cycle has not yet started.

The signal for all of this is a huge exponent with a small modulus, or a question about the last digit or the last two digits. When the modulus is large and the list would be long, the later lessons of the chapter find the length of a cycle without listing it: Fermat's Little Theorem for a prime modulus (N3.2), the order (N3.3), and Euler's theorem (N3.4).`,
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
    }
  },
  review: ["2008 AMC 10A, Problem 24", "2001 AIME II, Problem 10", "2004 AIME II, Problem 10", "2021 AIME II, Problem 13",
    "2021 AIME I, Problem 14", "2016 AMC 12B, Problem 25", "2015 AMC 12A, Problem 22", "2025 AIME II, Problem 13"]
};
