// Learn, AIME Algebra, chapter A3: sequences, recurrences and sums (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["A3"] = {
  lessons: {
    "A3.1": {
      prereq: ["first-order-recurrence", "vietas-quadratic"],
      cards: ["linear-recurrence", "binets-formula"],
      body: String.raw`A sequence in which each term is a fixed combination of the terms before it, such as $a_n = 5a_{n-1} - 6a_{n-2}$, has a closed form, and the closed form comes from a quadratic. Here the quadratic is $x^2 = 5x - 6$, with roots $2$ and $3$, and every solution of the recurrence is $a_n = A \cdot 2^n + B \cdot 3^n$; with $a_0 = 2$ and $a_1 = 5$, that is $a_n = 2^n + 3^n$, so $a_5 = 275$. This is the theory of [[linear-recurrence|linear recurrences]], and the Fibonacci numbers are its most famous case.

The reason is that a geometric sequence $x^n$ satisfies $a_n = pa_{n-1} + qa_{n-2}$ exactly when $x^2 = px + q$, the characteristic equation. With two different roots $r$ and $s$, both $r^n$ and $s^n$ are solutions, and so is any combination $Ar^n + Bs^n$, because the recurrence is linear; the two starting values then fix $A$ and $B$. A repeated root $r$ needs a second solution, and it is $nr^n$: the recurrence $a_n = 4a_{n-1} - 4a_{n-2}$, with characteristic root $2$ twice, has solutions $(A + Bn)2^n$, and from $a_0 = 1$, $a_1 = 4$ it is $(1 + n)2^n$. Recurrences with three or more terms work the same way with a cubic.

For the Fibonacci numbers, $x^2 = x + 1$ has roots $\varphi = \tfrac{1 + \sqrt5}{2}$ and $\psi = \tfrac{1 - \sqrt5}{2}$, and [[binets-formula|Binet's formula]] reads $F_n = \tfrac{\varphi^n - \psi^n}{\sqrt5}$. Since $|\psi| < 1$, $F_n$ is the integer nearest to $\tfrac{\varphi^n}{\sqrt5}$. The formula is most useful for identities: for instance $\tfrac{F_{2n}}{F_n} = \varphi^n + \psi^n$, the $n$th Lucas number, and a polynomial divisible by $x^2 - x - 1$ must vanish at both $\varphi$ and $\psi$, which turns a divisibility question into a Fibonacci one.

A closed form is not always the fastest route. With only a few terms needed, or an unknown starting value, running the recurrence directly, carrying the unknown as a symbol, is often quicker, as when $u_6 = 128$ is given and $u_5$ is wanted. The signal for a closed form is a far term, a growth rate, or an identity among the terms.`,
      related: [
        { card: "first-order-recurrence", note: String.raw`the one-term case $a_n = pa_{n-1} + q$, solved by shifting to a geometric sequence.` },
        { card: "pisano-periods", note: String.raw`the same recurrences read modulo $m$, where they become periodic ((N7.5)).` },
        { card: "reciprocal-power-sums", note: String.raw`$x^n + x^{-n}$ satisfies a linear recurrence in $n$ ((A1.4)).` }
      ],
      exercises: [
        { q: String.raw`A sequence has $a_0 = 2$, $a_1 = 5$, and $a_n = 5a_{n-1} - 6a_{n-2}$. Find $a_5$.`, answer: "275",
          solution: String.raw`The characteristic equation $x^2 - 5x + 6 = 0$ has roots $2$ and $3$, so $a_n = A\,2^n + B\,3^n$; the starting values give $A = B = 1$. So $a_5 = 32 + 243 = 275$.` },
        { q: String.raw`A sequence has $a_0 = 1$, $a_1 = 4$, and $a_n = 4a_{n-1} - 4a_{n-2}$. Find $a_5$.`, answer: "192",
          solution: String.raw`The characteristic root $2$ is repeated, so $a_n = (A + Bn)2^n$. From $a_0 = 1$, $A = 1$; from $a_1 = 4$, $2(1 + B) = 4$, $B = 1$. So $a_n = (1 + n)2^n$ and $a_5 = 6 \cdot 32 = 192$.` },
        { q: String.raw`With $F_1 = F_2 = 1$, find $\tfrac{F_{20}}{F_{10}}$.`, answer: "123",
          solution: String.raw`By Binet, $\tfrac{F_{2n}}{F_n} = \varphi^n + \psi^n = L_n$, the Lucas number. $L_{10} = 123$. Directly: $F_{20} = 6765$ and $F_{10} = 55$, and $6765 = 55 \cdot 123$.` }
      ],
      problems: ["2008 AMC 10B, Problem 11", "2024 AMC 10B, Problem 23", "1985 AIME, Problem 5", "1998 AIME, Problem 8", "1988 AIME, Problem 13"]
    },
    "A3.2": {
      prereq: ["difference-of-squares"],
      cards: ["telescoping", "partial-fractions", "factorial-telescoping", "alternating-sum-grouping"],
      body: String.raw`A long sum or product often collapses because each term cancels part of its neighbor. The sum $\tfrac1{1 \cdot 2} + \tfrac1{2 \cdot 3} + \cdots + \tfrac1{99 \cdot 100}$ looks like ninety-nine fractions to add, but each term is $\tfrac1k - \tfrac1{k+1}$, everything in the middle cancels, and the sum is $1 - \tfrac1{100} = \tfrac{99}{100}$. Recognizing that collapse, [[telescoping|telescoping]], and arranging terms so that it happens, is the subject of this lesson.

The key step is to write each term as a difference $f(k) - f(k + 1)$; then the sum from $k = 1$ to $n$ is $f(1) - f(n + 1)$. For rational terms the difference comes from [[partial-fractions|partial fractions]]: $\tfrac1{k(k+2)} = \tfrac12\left(\tfrac1k - \tfrac1{k+2}\right)$, which telescopes with two terms surviving at each end, and $\tfrac1{k(k+2)(k+4)}$ splits into three pieces in the same way. Products telescope through ratios: $1 - \tfrac1{k^2} = \tfrac{(k-1)(k+1)}{k \cdot k}$, so $\prod_{k=2}^{100} (1 - \tfrac1{k^2}) = \tfrac12 \cdot \tfrac{101}{100} = \tfrac{101}{200}$. Multiplying by a clever $1$ starts a telescope too: $(3 - 2)(3 + 2)(3^2 + 2^2) \cdots$ collapses by repeated differences of squares.

Factorials have their own differences. Since $(k + 1)! - k! = k \cdot k!$, the sum $\sum_{k=1}^{9} k \cdot k!$ is $10! - 1$; and since $\tfrac{k}{(k+1)!} = \tfrac1{k!} - \tfrac1{(k+1)!}$, the sum of those terms telescopes to just under $1$. These are the [[factorial-telescoping|factorial telescopes]].

An alternating sum is handled by [[alternating-sum-grouping|grouping]] terms into blocks with the same value: $1 - 2 + 3 - 4 + \cdots - 100$ pairs into fifty blocks of $-1$, giving $-50$. Grouping by the length of the sign pattern turns any periodic pattern of signs into a multiplication.

The signal is a long sum or product whose terms have a regular form, especially fractions with products in the denominator, factorials, logarithms of ratios, or alternating signs.`,
      related: [
        { card: "difference-of-squares", note: String.raw`the factorization that drives telescoping products like $(3 - 2)(3 + 2)(3^2 + 2^2)\cdots$.` },
        { card: "arctan-telescoping", note: String.raw`telescoping sums of inverse tangents (A7.4).` },
        { card: "change-of-base", note: String.raw`products of logarithms that telescope after a change of base (A4.3).` }
      ],
      exercises: [
        { q: String.raw`Find $\displaystyle\sum_{k=1}^{99} \frac{1}{k(k+1)}$.`, answer: "99/100",
          solution: String.raw`$\tfrac1{k(k+1)} = \tfrac1k - \tfrac1{k+1}$, so the sum telescopes to $1 - \tfrac1{100} = \tfrac{99}{100}$.` },
        { q: String.raw`Find $\displaystyle\prod_{k=2}^{100} \left(1 - \frac{1}{k^2}\right)$.`, answer: "101/200",
          solution: String.raw`$1 - \tfrac1{k^2} = \tfrac{k-1}{k} \cdot \tfrac{k+1}{k}$. The first factors multiply to $\tfrac1{100}$ and the second to $\tfrac{101}{2}$, so the product is $\tfrac{101}{200}$.` },
        { q: String.raw`Find $1 - 2 + 3 - 4 + \cdots + 99 - 100$.`, answer: "-50",
          solution: String.raw`Group in pairs: $(1 - 2) + (3 - 4) + \cdots + (99 - 100)$ is $50$ pairs, each $-1$, so the sum is $-50$.` }
      ],
      problems: ["2003 AMC 10A, Problem 1", "2008 AMC 10A, Problem 5", "2021 Spring AMC 10A, Problem 10", "2022 AMC 10B, Problem 9", "2025 AMC 10B, Problem 15"]
    },
    "A3.3": {
      prereq: ["power-sums", "arithmetic-series"],
      cards: ["finite-differences", "double-summation"],
      body: String.raw`Given the first few terms of a sequence, two questions come up: what formula produced them, and what a sum of them is. Finite differences answer the first. For $1, 4, 10, 20, 35$, the differences are $3, 6, 10, 15$, their differences are $3, 4, 5$, and the third differences are all $1$, so the terms come from a cubic and the next is $56$. Double sums answer many questions of the second kind, by adding over a grid in whichever order is easier.

The [[finite-differences|difference]] $\Delta P(n) = P(n + 1) - P(n)$ lowers the degree of a polynomial by one, so a polynomial of degree $d$ has constant $d$th differences, and conversely constant $d$th differences mean a polynomial of degree $d$. That gives a way to extend a table without finding the formula: add a new constant at the bottom row and build back up. It also separates a sequence into parts: a term $(a + kd) + br^k$ loses its arithmetic part under a second difference, leaving $b r^k (r - 1)^2$. When a problem gives a few weighted sums $S(0), S(1), S(2)$ of a quadratic expression and asks for $S(3)$, the values are consecutive values of a quadratic, and the constant second difference finishes it.

A [[double-summation|double sum]] adds a number for every pair of indices in a region, and the region can be swept by rows or by columns. Swapping the order is often what makes the sum tractable. $\sum_{i=1}^{10}\sum_{j=1}^{10} \min(i, j)$ counts, for each $k$, how many pairs have minimum at least $k$, which is $(11 - k)^2$; so it equals $\sum_{k=1}^{10} k^2 = 385$. Likewise $\sum_i \sum_j i$ over a $100 \times 100$ grid is $100$ times $\sum i$, because each $i$ appears once for each $j$.

The signal is a sequence given by its first terms, a sum of polynomial values, or a sum over pairs of indices.`,
      related: [
        { card: "power-sums", note: String.raw`closed forms for $\sum k$, $\sum k^2$, $\sum k^3$, which a double sum often reduces to.` },
        { card: "lagrange-interpolation", note: String.raw`the polynomial through given values, the other route from a table to a formula (A2.5).` },
        { card: "hockey-stick", note: String.raw`sums down a diagonal of Pascal's triangle, which finite differences of binomial coefficients produce.` }
      ],
      exercises: [
        { q: String.raw`The sequence $1, 4, 10, 20, 35, \ldots$ has constant third differences. What is its next term?`, answer: "56",
          solution: String.raw`First differences $3, 6, 10, 15$; second $3, 4, 5$; third $1, 1$. Extend: next second difference $6$, next first difference $21$, next term $35 + 21 = 56$. (These are $\binom{n+2}{3}$.)` },
        { q: String.raw`Find $1^2 + 2^2 + \cdots + 20^2$.`, answer: "2870",
          solution: String.raw`$\sum_{k=1}^{n} k^2 = \tfrac{n(n+1)(2n+1)}{6}$, so for $n = 20$ the sum is $\tfrac{20 \cdot 21 \cdot 41}{6} = 2870$.` },
        { q: String.raw`Find $\displaystyle\sum_{i=1}^{10}\sum_{j=1}^{10} \min(i, j)$.`, answer: "385",
          solution: String.raw`Write $\min(i, j) = \sum_{k \ge 1} [\,i \ge k \text{ and } j \ge k\,]$ and swap the order: for each $k$ the number of pairs with both indices at least $k$ is $(11 - k)^2$. So the sum is $\sum_{k=1}^{10} (11 - k)^2 = \sum_{m=1}^{10} m^2 = 385$.` }
      ],
      problems: ["2018 AMC 12B, Problem 9", "2022 AMC 10A, Problem 20", "1989 AIME, Problem 8", "1992 AIME, Problem 8"]
    },
    "A3.4": {
      prereq: ["periodic-sequences", "cycle-hunting"],
      cards: ["infinite-nest"],
      body: String.raw`Two kinds of sequences are best handled by looking at what they repeat rather than computing them term by term: infinite expressions that contain a copy of themselves, and recursions whose terms cycle. The nested radical $\sqrt{6 + \sqrt{6 + \sqrt{6 + \cdots}}}$ equals $3$, because calling it $x$ gives $x = \sqrt{6 + x}$. And the rule $a_{n+1} = \tfrac{1}{1 - a_n}$ starting from $2$ produces $2, -1, \tfrac12, 2, \ldots$, so its hundredth term is $2$.

An [[infinite-nest|infinite nest]], a radical, continued fraction, or tower that repeats itself, is evaluated by naming it and noticing that cutting off the first layer leaves the same expression. The resulting equation usually has two roots, and the domain decides between them: $x^2 = 6 + x$ gives $x = 3$ or $x = -2$, and a square root is nonnegative, so $x = 3$. Strictly the nest is the limit of its finite truncations, so the step is justified when those converge, which is the case in contest problems; checking that the truncations approach the chosen root is a good habit.

A recursion that cycles is solved by computing until the starting values return, then reducing the index by the period, exactly as with powers in N3.2. Rational maps like $x \mapsto \tfrac{1}{1 - x}$ or $x \mapsto \tfrac{x + 1}{y}$ often have short periods, $3$ or $5$, and problems hide them behind large indices. Recursions that combine several earlier terms can also be rearranged to expose a cycle: adding the recurrence at $n$ and at $n - 1$ may telescope into $a_n = -a_{n-5}$, which gives period $10$ at once.

The signal is an expression that continues forever in the same pattern, or a far term of a recursion whose first few terms come back.`,
      related: [
        { card: "periodic-sequences", note: String.raw`the general method for a far term of a repeating sequence.` },
        { card: "name-the-whole-expression", note: String.raw`naming a repeated expression to get an equation, the move behind every infinite nest.` },
        { card: "geometric-series", note: String.raw`the simplest self-similar infinite expression, whose sum comes from the same cut-off-a-layer idea.` }
      ],
      exercises: [
        { q: String.raw`Evaluate $\sqrt{6 + \sqrt{6 + \sqrt{6 + \cdots}}}$.`, answer: "3",
          solution: String.raw`Call it $x$. Then $x = \sqrt{6 + x}$, so $x^2 - x - 6 = (x - 3)(x + 2) = 0$. A square root is nonnegative, so $x = 3$ (and the truncations $\sqrt6, \sqrt{6 + \sqrt6}, \ldots$ do approach $3$).` },
        { q: String.raw`A sequence has $a_1 = 2$ and $a_{n+1} = \tfrac{1}{1 - a_n}$. Find $a_{100}$.`, answer: "2",
          solution: String.raw`$a_2 = \tfrac{1}{1 - 2} = -1$, $a_3 = \tfrac{1}{2}$, $a_4 = \tfrac{1}{1 - 1/2} = 2$. The sequence has period $3$, and $100 = 3 \cdot 33 + 1$, so $a_{100} = a_1 = 2$.` },
        { q: String.raw`Evaluate $1 + \cfrac{1}{1 + \cfrac{1}{1 + \cdots}}$, giving the answer in the form $\tfrac{a + \sqrt b}{c}$.`, answer: "(1+sqrt(5))/2",
          solution: String.raw`Call it $x$. Then $x = 1 + \tfrac1x$, so $x^2 - x - 1 = 0$ and $x = \tfrac{1 \pm \sqrt5}{2}$. The expression is positive, so $x = \tfrac{1 + \sqrt5}{2}$.` }
      ],
      problems: ["2005 AMC 10B, Problem 11", "2006 AMC 10B, Problem 18", "2011 AMC 10A, Problem 17", "1991 AIME, Problem 7", "2001 AIME II, Problem 3"]
    },
    "A3.5": {
      prereq: ["geometric-series", "binomial-theorem"],
      cards: ["arithmetico-geometric", "largest-term-ratio"],
      body: String.raw`Some sums have closed forms that are worth deriving, and some questions about sequences are better answered without one. The sum $\sum_{k \ge 1} \tfrac{k}{2^k}$ is exactly $2$, and the finite version $\sum_{k=1}^{10} k \cdot 2^k$ is $18434$, by a shift-and-subtract that turns them into geometric series. But to find the largest term of $\binom{20}{k} 2^k$, the right tool is not a formula for the terms but the ratio of consecutive ones, which shows that the terms rise until $k = 13$, tie at $k = 14$, and then fall.

An [[arithmetico-geometric|arithmetico-geometric sum]] has terms that are an arithmetic factor times a geometric one, $\sum k x^k$. Multiplying by $x$ and subtracting shifts every term and leaves a geometric series: if $S = \sum_{k=1}^{n} kx^k$, then $S - xS = x + x^2 + \cdots + x^n - nx^{n+1}$. For $x = 2$ and $n = 10$ this gives $S = (n - 1)2^{n+1} + 2 = 18434$, and for $|x| < 1$ with $n \to \infty$ it gives $\sum kx^k = \tfrac{x}{(1 - x)^2}$, which is $2$ at $x = \tfrac12$. The same trick, or differentiating the geometric series, handles $\sum k^2 x^k$. Problems often disguise such a sum: grouping $k$ by $\lfloor \log_2 k \rfloor$ produces terms $m \cdot 2^m$.

To find the [[largest-term-ratio|largest term]] of a sequence with no simple closed form, compare consecutive terms. If $\tfrac{a_{k+1}}{a_k} \ge 1$ the sequence is still rising, and the largest term is where the ratio first drops below $1$. For $a_k = \binom{20}{k} 2^k$, the ratio is $\tfrac{2(20 - k)}{k + 1}$, which is at least $1$ exactly when $k \le 13$, and equal to $1$ at $k = 13$; so $a_{13} = a_{14}$ and these are the largest. The same comparison finds the most likely number of successes in a binomial distribution.

The signal is a sum of a linear times a geometric term, or a question about which term of a product-like sequence is largest.`,
      related: [
        { card: "geometric-series", note: String.raw`the sum that the shift-and-subtract step reduces to.` },
        { card: "binomial-theorem", note: String.raw`the terms $\binom nk a^k$ whose largest member the ratio test finds.` },
        { card: "binomial-probability", note: String.raw`the most likely number of successes, found by the same consecutive-ratio comparison.` }
      ],
      exercises: [
        { q: String.raw`Find $\displaystyle\sum_{k=1}^{\infty} \frac{k}{2^k}$.`, answer: "2",
          solution: String.raw`With $S = \sum kx^k = \tfrac{x}{(1 - x)^2}$ for $|x| < 1$, at $x = \tfrac12$: $S = \tfrac{1/2}{1/4} = 2$. (Or: $S - \tfrac12 S = \tfrac12 + \tfrac14 + \cdots = 1$, so $S = 2$.)` },
        { q: String.raw`Find $\displaystyle\sum_{k=1}^{10} k \cdot 2^k$.`, answer: "18434",
          solution: String.raw`$S - 2S = (2 + 4 + \cdots + 2^{10}) - 10 \cdot 2^{11} = (2^{11} - 2) - 20480 = 2046 - 20480 = -18434$, so $S = 18434$.` },
        { q: String.raw`For which values of $k$ is $\binom{20}{k} 2^k$ largest? List them.`, answer: "13, 14",
          solution: String.raw`The ratio $\tfrac{a_{k+1}}{a_k} = \tfrac{2(20 - k)}{k + 1}$ is greater than $1$ for $k \le 12$, equal to $1$ at $k = 13$, and less than $1$ after. So the terms rise to $a_{13}$, $a_{14} = a_{13}$, and then fall: the largest are at $k = 13$ and $14$.` }
      ],
      problems: ["2024 AMC 10B, Problem 12", "1991 AIME, Problem 3", "1994 AIME, Problem 4", "2009 AIME I, Problem 8"]
    }
  },
  review: ["2018 AMC 12B, Problem 7", "2019 AMC 10A, Problem 24", "2018 AMC 10B, Problem 20", "2004 AMC 10B, Problem 19", "2002 AMC 12A, Problem 21",
    "1984 AIME, Problem 7", "1988 AIME, Problem 6", "2012 AIME II, Problem 11", "2026 AIME II, Problem 9"]
};
