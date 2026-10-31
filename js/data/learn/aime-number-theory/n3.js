// Learn, AIME Number Theory, chapter N3: cycles, exponentiation and order (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N3"] = {
  lessons: {
    "N3.1": {
      prereq: ["modular-basics"],
      cards: ["cycle-hunting", "last-digit-patterns"],
      body: String.raw`What is the units digit of $7^{202}$? Nobody computes a number with $171$ digits to find out. The units digit of a product depends only on the units digits of the factors, so it is enough to follow $7^n$ modulo $10$, multiplying by $7$ each time: $7, 9, 3, 1$, and then $7$ again. From there the same four digits come round forever. Since $202 = 4 \cdot 50 + 2$, the power $7^{202}$ sits in the second place of the cycle, and its units digit is $9$.

### Why powers must repeat

The same idea works for any modulus, because there are only finitely many residues. Modulo $n$ each power is one of $n$ values, and each power is found from the one before it by the same multiplication. So as soon as one value comes back, everything after it repeats. The technique of listing the powers until a value returns, then reducing the exponent by the length of the cycle, is [[cycle-hunting]]. Units digits are the case that appears most often on the AMC, and the facts about them, including that the units digits of any integer's powers repeat with a period dividing $4$, are on [[last-digit-patterns]].

{{check 1}}

{{check 2}}

### A cycle that starts late

When the base and the modulus are coprime, the cycle starts at the very first power, as it did for $7$ modulo $10$. When they share a factor, the first few powers may never come back. The powers of $2$ modulo $12$ run $2, 4, 8, 4, 8, \ldots$: the value $2$ appears once and is gone, and the cycle $4, 8$ starts only at $2^2$. The sequence is eventually periodic, with period $2$ from $n = 2$ on. Before reducing an exponent, find where the cycle begins as well as how long it is, and reduce only exponents that are already inside it.

{{check 3}}

### The clue

A huge exponent and a small modulus, or a question about the last digit or the last two digits, is the signal to list a few powers. The list is short when the modulus is small. When the cycle turns out to be long, the next lessons find its length without listing it: Fermat's Little Theorem for a prime modulus (N3.2), the order (N3.3), and Euler's theorem (N3.4).`,
      checks: [
        { q: String.raw`What is the units digit of $7^{203}$?`, answer: "3",
          why: String.raw`$203 = 4 \cdot 50 + 3$, so $7^{203}$ sits in the third place of the cycle $7, 9, 3, 1$.` },
        { q: String.raw`The powers of $2$ modulo $7$ run $2, 4, 1, \ldots$. What is the remainder when $2^{100}$ is divided by $7$?`, answer: "2",
          why: String.raw`The cycle has length $3$ and $100 = 3 \cdot 33 + 1$, so $2^{100} \equiv 2^1 = 2$.` },
        { q: String.raw`What is the remainder when $2^{10}$ is divided by $12$?`, answer: "4",
          why: String.raw`From $2^2$ on the powers alternate $4, 8$, with $4$ at the even exponents, so $2^{10} \equiv 4$ (and indeed $1024 = 12 \cdot 85 + 4$).` }
      ],
      problems: ["2003 AMC 10A, Problem 16", "2023 AMC 10B, Problem 8", "2017 AIME I, Problem 3", "2025 AMC 12B, Problem 9"]
    }
  },
  review: ["2008 AMC 10A, Problem 24", "2001 AIME II, Problem 10", "2004 AIME II, Problem 10", "2021 AIME II, Problem 13",
    "2021 AIME I, Problem 14", "2016 AMC 12B, Problem 25", "2015 AMC 12A, Problem 22", "2025 AIME II, Problem 13"]
};
