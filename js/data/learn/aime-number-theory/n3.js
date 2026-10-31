// Learn, AIME Number Theory, chapter N3: cycles, exponentiation and order (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N3"] = {
  lessons: {
    "N3.1": {
      prereq: ["modular-basics"],
      cards: ["cycle-hunting", "last-digit-patterns"],
      body: String.raw`### Introduction

A huge power and a small modulus are one of the most common pairings on the AMC and the AIME: the units digit of $7^{202}$, the remainder when $2^{100}$ is divided by $7$, the last two digits of $3^{2026}$. All of them give way to the same idea. Modulo $n$ the powers of a number can take only $n$ values, so sooner or later they repeat, and once the length of the cycle is known a huge exponent shrinks to a small one. This lesson shows why the powers must repeat, how to find their cycle by listing the first few, and how a base that shares a factor with the modulus can take a few steps before its cycle begins. The later lessons of the chapter find the length of a cycle without listing it.

### Why powers must repeat

Modulo $n$ there are only $n$ residues, and each power of a number is found from the one before it by the same multiplication. So among the first $n + 1$ powers two must agree, and once one value comes back, every value after it comes back in the same order: the powers run in a cycle. The units digit is the case met most often, because the units digit of a product depends only on the units digits of its factors, so the units digits of a number's powers are its powers taken modulo $10$. The facts about them, including that the units digits of any integer's powers repeat with a period dividing $4$, are on [[last-digit-patterns]].

### Using the cycle

A cycle turns a huge exponent into a small one. If the powers of $a$ repeat every $T$ steps from the first power on, then $a^N$ leaves the same remainder as $a^r$, where $r$ is the remainder when $N$ is divided by $T$ (and $r = T$ when that remainder is $0$). Finding $T$ means listing the powers until the first value returns, which is quick when the modulus is small. Listing until a value returns and then reducing the exponent is [[cycle-hunting]].

### A cycle that starts late

When the base and the modulus are coprime, the cycle starts at the very first power. When they share a factor, the first few powers may never come back. The powers of $2$ modulo $12$ run $2, 4, 8, 4, 8, \ldots$: the value $2$ appears once and is gone, and the cycle $4, 8$ starts only at $2^2$. The sequence is eventually periodic, with period $2$ from the exponent $2$ on. Before reducing an exponent, find where the cycle begins as well as how long it is, and reduce only exponents that are already inside it.

### The clue

A huge exponent and a small modulus, or a question about the last digit or the last two digits, is the signal to list a few powers. The list is short when the modulus is small. When the cycle turns out to be long, the next lessons find its length without listing it: Fermat's Little Theorem for a prime modulus (N3.2), the order (N3.3), and Euler's theorem (N3.4).`,
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
