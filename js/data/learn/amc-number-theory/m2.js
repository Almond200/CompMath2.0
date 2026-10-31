// Learn, AMC Number Theory, chapter M2: number theory, remainders and integer equations (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M2"] = {
  lessons: {
    "M2.1": {
      prereq: ["euclidean-algorithm"],
      cards: ["modular-basics", "euclids-lemma", "subtract-equal-remainders", "reduce-divisibility-constant", "poly-divisible-linear"],
      body: String.raw`Remainders can be added, subtracted and multiplied without ever computing the full numbers. That is modular arithmetic, and it answers questions about last digits, remainders of huge products and divisibility with a few lines.

In [[modular-basics|modular arithmetic]], $a \equiv b \pmod n$ means $n$ divides $a - b$, and congruences can be added and multiplied. The last digit of $17 \cdot 23 \cdot 29$ is the last digit of $7 \cdot 3 \cdot 9 = 189$, which is $9$. Powers reduce once a small power is $1$: $2^3 = 8 \equiv 1 \pmod 7$, so $2^{100} = (2^3)^{33} \cdot 2 \equiv 2$. Negative remainders often help: $99 \equiv -1 \pmod{100}$.

[[euclids-lemma|Euclid's lemma]] says a prime dividing a product divides one of the factors, which is why $p \mid ab$ splits into cases. Numbers that [[subtract-equal-remainders|leave the same remainder]] on division by $n$ have differences divisible by $n$: $1108$, $1453$, $1844$ and $2281$ leave equal remainders mod $n$ exactly when $n$ divides $345$, $391$ and $437$, whose gcd is $23$.

To decide when $n + 4$ divides $n^2 + 7$, [[reduce-divisibility-constant|reduce to a constant]]: $n^2 + 7 = (n + 4)(n - 4) + 23$, so $n + 4$ must divide $23$. More generally a [[poly-divisible-linear|polynomial is divisible by $n - a$]] modulo the divisor exactly when its value at $a$ is, so $n - a \mid P(n)$ means $n - a \mid P(a)$.

Reduce early, use negative residues, and turn divisibility by an expression into divisibility of a constant. The next lesson finds cycles of powers.`,
      related: [
        { card: "divisibility-rules", note: String.raw`the digit tests as statements about remainders (M1.3).` },
        { card: "factor-remainder-theorem", note: String.raw`the polynomial remainder theorem behind reducing to a constant (L3.1).` },
        { card: "modular-inverse", note: String.raw`dividing modulo $n$ (M3.2).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $2^{100}$ is divided by $7$.`, answer: "2",
          solution: String.raw`$2^3 \equiv 1 \pmod 7$ and $100 = 3 \cdot 33 + 1$, so $2^{100} \equiv 2$.` },
        { q: String.raw`The numbers $1108$, $1453$, $1844$ and $2281$ all leave the same remainder when divided by an integer $n \gt 1$. Find $n$.`, answer: "23",
          solution: String.raw`$n$ divides the differences $345$, $391$ and $437$, which are $15 \cdot 23$, $17 \cdot 23$ and $19 \cdot 23$, so $n = 23$ (and indeed each leaves remainder $4$).` }
      ],
      problems: [
        "2009 AMC 10B, Problem 1",
        "2024 AMC 10B, Problem 7",
        "2009 AMC 10B, Problem 13",
        "2021 Fall AMC 12A, Problem 10",
        "2024 AMC 10A, Problem 18",
        "2022 AMC 10A, Problem 19",
        "2008 AMC 12A, Problem 17",
        "2003 AMC 10B, Problem 25"
      ]
    },
    "M2.2": {
      prereq: ["modular-basics"],
      cards: ["cycle-hunting", "last-digit-patterns", "fermats-little-theorem", "eulers-totient", "squares-mod-small"],
      body: String.raw`Powers modulo $n$ repeat, and finding the cycle reduces any huge exponent to a small one. For prime moduli Fermat's little theorem gives the cycle length at once.

[[cycle-hunting|Cycle hunting]] lists powers until one repeats. [[last-digit-patterns|Last digits]] of powers cycle with length dividing $4$: powers of $3$ end in $3, 9, 7, 1$, so $3^{2026}$ ends in $9$, since $2026 \equiv 2 \pmod 4$. A cycle can begin after a few terms, so note where it starts.

[[fermats-little-theorem|Fermat's little theorem]] says $a^{p-1} \equiv 1 \pmod p$ for a prime $p$ not dividing $a$. Then $2^{12} \equiv 1 \pmod{13}$ and $2^{100} = 2^{96} \cdot 2^4 \equiv 16 \equiv 3$. For a composite modulus the role of $p - 1$ is played by [[eulers-totient|Euler's totient]] $\varphi(n)$, the number of integers from $1$ to $n$ coprime to $n$: $\varphi(100) = 100 \cdot \tfrac12 \cdot \tfrac45 = 40$, so $a^{40} \equiv 1 \pmod{100}$ for $a$ coprime to $100$.

[[squares-mod-small|Squares modulo small numbers]] take few values: $0, 1 \pmod 4$; $0, 1, 4 \pmod 8$; $0, 1 \pmod 3$; and $0, 1, 4, 9, 6, 5$ as last digits. These rule out equations quickly: a number ending in $7$ is never a square.

Find the cycle, reduce the exponent, and test squares modulo small numbers. The next lesson solves systems of congruences.`,
      related: [
        { card: "periodic-sequences", note: String.raw`cycles in sequences (L3.3).` },
        { card: "eulers-theorem", note: String.raw`$a^{\varphi(n)} \equiv 1$ in general (M3.2).` },
        { card: "choose-modulus", note: String.raw`picking the modulus that rules an equation out (M2.4).` }
      ],
      exercises: [
        { q: String.raw`What is the last digit of $3^{2026}$?`, answer: "9",
          solution: String.raw`The last digits cycle $3, 9, 7, 1$, and $2026 \equiv 2 \pmod 4$, so the last digit is $9$.` },
        { q: String.raw`Find the remainder when $2^{100}$ is divided by $13$.`, answer: "3",
          solution: String.raw`By Fermat, $2^{12} \equiv 1 \pmod{13}$. Since $100 = 96 + 4$, $2^{100} \equiv 2^4 = 16 \equiv 3$.` },
        { q: String.raw`How many integers from $1$ to $100$ are coprime to $100$?`, answer: "40",
          solution: String.raw`$\varphi(100) = 100\left(1 - \tfrac12\right)\left(1 - \tfrac15\right) = 40$.` }
      ],
      problems: [
        "2023 AMC 10B, Problem 6",
        "2024 AMC 10B, Problem 8",
        "2015 AMC 10B, Problem 10",
        "2006 AMC 10B, Problem 11",
        "2017 AMC 10B, Problem 14",
        "2025 AMC 12B, Problem 9",
        "2018 AMC 10A, Problem 19",
        "2008 AMC 10A, Problem 24"
      ]
    },
    "M2.3": {
      prereq: ["modular-basics", "gcd-lcm-product"],
      cards: ["bezouts-identity", "crt", "chicken-mcnugget", "coins-and-prices"],
      body: String.raw`Some problems give several remainder conditions at once, or ask which totals can be made from coins of two values. Both are questions about combinations $ax + by$, and the gcd decides them.

[[bezouts-identity|Bézout's identity]] says the numbers $ax + by$ with integers $x$, $y$ are exactly the multiples of $\gcd(a, b)$. So $ax + by = c$ has integer solutions only when $\gcd(a, b) \mid c$, and then the solutions step by $\tfrac{b}{\gcd}$ in $x$ and $\tfrac a{\gcd}$ in $y$.

The [[crt|Chinese remainder theorem]] says congruences to coprime moduli always combine into one congruence modulo the product. For $x \equiv 2 \pmod 3$ and $x \equiv 3 \pmod 5$, list the numbers $\equiv 3 \pmod 5$, namely $3, 8, 13, \ldots$, until one is $\equiv 2 \pmod 3$: $x \equiv 8 \pmod{15}$. Listing works well for small moduli.

With nonnegative combinations, the [[chicken-mcnugget|Chicken McNugget theorem]] says that for coprime $a$ and $b$ the largest total that cannot be made as $ax + by$ with $x, y \ge 0$ is $ab - a - b$: with coins of $5$ and $7$, every amount above $23$ can be made and $23$ cannot. [[coins-and-prices|Coin and price problems]] count the ways to make a total by fixing the number of the largest coin and counting the rest.

Check the gcd, list for small moduli, and count combinations by the largest piece. The next lesson solves equations in integers by factoring.`,
      related: [
        { card: "extended-euclidean-algorithm", note: String.raw`finding the $x$ and $y$ in Bézout (M3.2).` },
        { card: "modular-inverse", note: String.raw`solving one linear congruence (M3.2).` },
        { card: "stars-and-bars", note: String.raw`counting nonnegative combinations of unit pieces (R1.4).` }
      ],
      exercises: [
        { q: String.raw`Find the smallest positive $x$ with $x \equiv 2 \pmod 3$ and $x \equiv 3 \pmod 5$.`, answer: "8",
          solution: String.raw`The numbers $\equiv 3 \pmod 5$ are $3, 8, 13, \ldots$; $3 \equiv 0$ and $8 \equiv 2 \pmod 3$. So $x = 8$.` },
        { q: String.raw`With coins worth $5$ and $7$ cents, what is the largest amount that cannot be paid exactly?`, answer: "23",
          solution: String.raw`$5$ and $7$ are coprime, so the largest amount not of the form $5x + 7y$ with $x, y \ge 0$ is $5 \cdot 7 - 5 - 7 = 23$.` }
      ],
      problems: [
        "2008 AMC 10B, Problem 8",
        "2015 AMC 10A, Problem 13",
        "2015 AMC 10B, Problem 15",
        "2006 AMC 12A, Problem 14",
        "2023 AMC 12B, Problem 16",
        "2020 AMC 10A, Problem 24",
        "2013 AMC 10B, Problem 25",
        "2015 AMC 12A, Problem 22"
      ]
    },
    "M2.4": {
      prereq: ["number-of-divisors", "difference-of-squares"],
      cards: ["sfft", "factor-pair-counting", "only-even-prime", "difference-of-squares-rep", "choose-modulus", "primes-6k"],
      body: String.raw`Integer equations are solved by factoring into a product equal to a known number, by parity, or by testing modulo a small number. The goal is a short list of cases.

[[sfft|Simon's favorite factoring trick]] completes a product: $xy + 3x + 2y = 18$ becomes $(x + 2)(y + 3) = 24$. With $x, y \ge 1$ the factors are at least $3$ and $4$, so they are $(3, 8)$, $(4, 6)$, $(6, 4)$: three solutions. [[factor-pair-counting|Counting factor pairs]] uses the divisor count and any parity or size conditions on the factors.

[[difference-of-squares-rep|Differences of two squares]]: $n = a^2 - b^2 = (a - b)(a + b)$ with factors of equal parity, so $n$ is a difference of two squares exactly when $n$ is odd or a multiple of $4$; from $1$ to $100$ that is all but the $25$ numbers $\equiv 2 \pmod 4$, leaving $75$.

[[only-even-prime|Two is the only even prime]], so a sum of two primes that is odd uses $2$. All primes above $3$ are [[primes-6k|of the form $6k \pm 1$]], which limits which numbers in a pattern can be prime. When an equation has no solution, [[choose-modulus|choosing a modulus]] proves it: $x^2 + y^2 = 1003$ has no solution because squares are $0$ or $1 \pmod 4$ and $1003 \equiv 3$.

Factor into a product, list pairs, and test small moduli. The last lesson of the chapter treats integer right triangles.`,
      related: [
        { card: "squares-mod-small", note: String.raw`the values of squares modulo small numbers (M2.2).` },
        { card: "bounding-diophantine", note: String.raw`bounding the variables when factoring fails (M3.3).` },
        { card: "useful-factorizations", note: String.raw`other products worth completing (L5.5).` }
      ],
      exercises: [
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $xy + 3x + 2y = 18$?`, answer: "3",
          solution: String.raw`Add $6$: $(x + 2)(y + 3) = 24$, with $x + 2 \ge 3$ and $y + 3 \ge 4$. The pairs are $(3, 8)$, $(4, 6)$, $(6, 4)$, giving $(x, y) = (1, 5), (2, 3), (4, 1)$: three.` },
        { q: String.raw`How many integers from $1$ to $100$ can be written as a difference of two squares of integers?`, answer: "75",
          solution: String.raw`A difference of squares is odd or a multiple of $4$, and every such number is one ($2k + 1 = (k + 1)^2 - k^2$, $4k = (k + 1)^2 - (k - 1)^2$). The $25$ numbers $\equiv 2 \pmod 4$ are excluded, leaving $75$.` }
      ],
      problems: [
        "2002 AMC 10A, Problem 4",
        "2021 Spring AMC 10A, Problem 9",
        "2021 Spring AMC 10B, Problem 11",
        "2002 AMC 10B, Problem 13",
        "2021 Spring AMC 12B, Problem 10",
        "2007 AMC 12A, Problem 14",
        "2023 AMC 10B, Problem 23",
        "2024 AMC 12A, Problem 17"
      ]
    },
    "M2.5": {
      prereq: ["pythagorean-theorem"],
      cards: ["pythagorean-triples", "integer-triangles-perimeter"],
      body: String.raw`Right triangles with integer sides appear throughout the AMC, in geometry and in number theory. Knowing the common triples by heart, and how to generate all of them, answers many questions immediately.

The [[pythagorean-triples|Pythagorean triples]] worth memorizing are $3$-$4$-$5$, $5$-$12$-$13$, $8$-$15$-$17$, $7$-$24$-$25$, $20$-$21$-$29$ and their multiples. All primitive triples come from $m^2 - n^2$, $2mn$, $m^2 + n^2$ with $m \gt n$ coprime and of opposite parity. A hypotenuse of $25$ allows the legs $7$, $24$ and $15$, $20$: two triangles. A leg of $12$ appears in four triangles, from writing $144 = c^2 - b^2 = (c - b)(c + b)$ with factors of equal parity: $(5, 13)$, $(9, 15)$, $(16, 20)$ and $(35, 37)$.

For [[integer-triangles-perimeter|integer triangles with a given perimeter]], list sides $a \le b \le c$ with $a + b + c$ fixed and $c \lt a + b$, which means $c$ is less than half the perimeter. For perimeter $12$, $c \le 5$ gives $(2, 5, 5)$, $(3, 4, 5)$, $(4, 4, 4)$.

Memorize the small triples, and solve for triples with a given side by factoring a difference of squares. The next chapter adds the number theory of the AMC 12.`,
      related: [
        { card: "difference-of-squares", note: String.raw`$c^2 - b^2 = (c - b)(c + b)$, the factoring that finds triples (L1.1).` },
        { card: "triangle-inequality", note: String.raw`the condition $c \lt a + b$ (S1.1).` },
        { card: "sum-of-two-squares", note: String.raw`which numbers are hypotenuses (M3.3).` }
      ],
      exercises: [
        { q: String.raw`How many right triangles with integer sides have a leg of length $12$?`, answer: "4",
          solution: String.raw`$c^2 - b^2 = 144 = (c - b)(c + b)$ with both factors even (they share a parity and their product is even) and $c - b \lt c + b$: $(2, 72)$, $(4, 36)$, $(6, 24)$, $(8, 18)$ give $(b, c) = (35, 37), (16, 20), (9, 15), (5, 13)$. That is $4$.` },
        { q: String.raw`How many right triangles with integer sides have hypotenuse $25$?`, answer: "2",
          solution: String.raw`$a^2 + b^2 = 625$ with $a \le b$: $(7, 24)$ and $(15, 20)$. So $2$.` }
      ],
      problems: [
        "2013 AMC 10B, Problem 16",
        "2014 AMC 12B, Problem 9",
        "2015 AMC 12B, Problem 10",
        "2009 AMC 12B, Problem 13"
      ]
    }
  }
};
