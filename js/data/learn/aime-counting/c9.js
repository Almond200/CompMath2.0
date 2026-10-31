// Learn, AIME Counting & Probability, chapter C9: counting and probability extensions (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// An extension chapter: its lessons carry their own problems and the chapter has no review.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C9"] = {
  lessons: {
    "C9.1": {
      prereq: ["stars-and-bars", "binomial-theorem"],
      cards: ["generating-function-method", "partitions"],
      body: String.raw`A generating function records a whole sequence of counts as the coefficients of one polynomial or power series, so that combining choices becomes multiplying polynomials. How many ways can $10$ cents be made from pennies, nickels and dimes? How many partitions of $10$ have distinct parts? How many ordered sums of restricted parts reach a total? Each count is a coefficient, and the algebra of polynomials (factoring, substituting, the binomial series) extracts it.

The [[generating-function-method|generating function method]] assigns to each independent choice a polynomial whose $x^k$ coefficient counts the ways that choice contributes $k$. Choices that combine by adding contributions multiply their polynomials. Coins: pennies give $1 + x + x^2 + \cdots$, nickels $1 + x^5 + x^{10} + \cdots$, dimes $1 + x^{10} + \cdots$, and the coefficient of $x^{10}$ in the product counts the ways to make $10$ cents, here $4$. Dice: one die is $x + x^2 + \cdots + x^6$, and the coefficient of $x^s$ in its square counts the ways to roll a sum of $s$. The power is in manipulation: $1 + x + \cdots + x^{n-1} = \tfrac{1 - x^n}{1 - x}$, and $\tfrac{1}{(1 - x)^k}$ is the stars-and-bars series, so a product of such factors can be expanded term by term. Setting $x = 1$ gives the total number of outcomes, $x = -1$ the difference between even and odd totals, and roots of unity the totals in each residue class.

A [[partitions|partition]] of $n$ writes it as a sum of positive integers in which order does not matter; a composition is the ordered version. Compositions of $n$ number $2^{n-1}$ (choose where to cut), but partitions have no simple formula: $p(7) = 15$, $p(10) = 42$. Their generating function is $\prod_{k \ge 1}\tfrac{1}{1 - x^k}$, one factor for each part size. Generating functions prove identities between kinds of partitions: partitions into distinct parts have generating function $\prod(1 + x^k)$, partitions into odd parts have $\prod\tfrac{1}{1 - x^{2k-1}}$, and since $1 + x^k = \tfrac{1 - x^{2k}}{1 - x^k}$, the two products are equal. So $10$ has as many partitions into distinct parts as into odd parts, $10$ of each.

Use a generating function when a count combines independent choices by adding their contributions and the direct casework is long. The next lesson studies permutations through their cycles.`,
      related: [
        { card: "coefficient-extraction", note: String.raw`reading sums of coefficients by evaluating at $1$, $-1$ and roots of unity.` },
        { card: "roots-of-unity-filter", note: String.raw`extracting the coefficients in one residue class (A6.3).` },
        { card: "generalized-binomial-series", note: String.raw`the expansion of $\tfrac{1}{(1 - x)^k}$ (A9.1).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can $10$ cents be made from pennies, nickels and dimes?`, answer: "4",
          solution: String.raw`The count is the coefficient of $x^{10}$ in $(1 + x + x^2 + \cdots)(1 + x^5 + x^{10} + \cdots)(1 + x^{10} + \cdots)$. Listing by the number of dimes and nickels: one dime; two nickels; one nickel and five pennies; ten pennies. That is $4$ ways.` },
        { q: String.raw`How many partitions of $7$ are there (ways to write $7$ as an unordered sum of positive integers)?`, answer: "15",
          solution: String.raw`By largest part: $7$ (1 way), $6$ (1), $5$ ($5 + 2$, $5 + 1 + 1$: 2), $4$ ($4 + 3$, $4 + 2 + 1$, $4 + 1 + 1 + 1$: 3), $3$ ($3 + 3 + 1$, $3 + 2 + 2$, $3 + 2 + 1 + 1$, $3 + 1 + 1 + 1 + 1$: 4), $2$ ($2 + 2 + 2 + 1$, $2 + 2 + 1 + 1 + 1$, $2 + 1 + 1 + 1 + 1 + 1$: 3), $1$ (1). The total is $1 + 1 + 2 + 3 + 4 + 3 + 1 = 15$.` },
        { q: String.raw`How many partitions of $10$ have all parts different?`, answer: "10",
          solution: String.raw`Listing by largest part: $10$; $9 + 1$; $8 + 2$; $7 + 3$, $7 + 2 + 1$; $6 + 4$, $6 + 3 + 1$; $5 + 4 + 1$, $5 + 3 + 2$; $4 + 3 + 2 + 1$. That is $10$, the same as the number of partitions of $10$ into odd parts, as the generating functions predict.` }
      ],
      problems: [
        "2012 AMC 12A, Problem 20",
        "1994 AIME, Problem 5",
        "2022 AIME II, Problem 13"
      ]
    },
    "C9.2": {
      prereq: ["burnsides-lemma", "gcd-lcm-product"],
      cards: ["permutation-cycle-structure"],
      body: String.raw`Every permutation of a finite set splits into cycles: follow an element to its image, then to that image's image, until it returns. The lengths of these cycles decide almost everything about the permutation, including its order (how many times it must be applied to return to the identity), how many colorings it fixes in Burnside's lemma, and whether it is a square or an involution. Counting permutations with a condition often reduces to counting cycle types.

The [[permutation-cycle-structure|cycle structure]] of a permutation is the multiset of its cycle lengths. Its order is the least common multiple of the cycle lengths: a permutation with cycles of lengths $2$, $3$ and $4$ has order $12$. So $f^6 = \mathrm{id}$ exactly when every cycle length divides $6$, and $f^2 = \mathrm{id}$ (an involution) exactly when every cycle has length $1$ or $2$. Involutions of $5$ elements choose $0$, $1$ or $2$ disjoint pairs to swap: $1 + \binom52 + \tfrac12\binom52\binom32 = 1 + 10 + 15 = 26$. The number of permutations with a given cycle type is $\tfrac{n!}{\prod_k k^{m_k}m_k!}$, where $m_k$ cycles have length $k$: each cycle can start at any of its $k$ elements, and cycles of the same length can be listed in any order.

In Burnside's lemma, a symmetry fixes a coloring exactly when each of its cycles (on the positions) is one color, so it fixes $c^{\text{number of cycles}}$ colorings with $c$ colors. A rotation of $n$ beads by $j$ steps has $\gcd(j, n)$ cycles, which gives the necklace formula. Joining every $k$th vertex of a regular $n$-gon traces one closed path through all the vertices exactly when the rotation by $k$ is a single cycle, that is when $\gcd(k, n) = 1$.

Graphs in which every vertex has degree $2$ are unions of cycles, so counting "each person shakes hands with exactly two others" means counting ways to split people into cycles of length at least $3$, the cycle-type count with cycles up to reflection. Pairings are permutations whose cycles all have length $2$, and conditions on pairings are often conditions on the cycles formed by combining two pairings.

When a problem is about repeating a permutation, about symmetries fixing colorings, or about graphs of degree $2$, write down the cycle type and count by it. The next lesson treats continuous random variables beyond simple regions.`,
      related: [
        { card: "necklace-formula", note: String.raw`the cycles of a rotation in the necklace count (C2.3).` },
        { card: "eulers-totient", note: String.raw`the number of $k$ for which the rotation by $k$ is a single cycle.` },
        { card: "derangements", note: String.raw`permutations with no cycle of length $1$ (C3.3).` }
      ],
      exercises: [
        { q: String.raw`A permutation of $9$ elements has cycles of lengths $2$, $3$ and $4$. What is the smallest positive $m$ with $f^m$ equal to the identity?`, answer: "12",
          solution: String.raw`$f^m$ is the identity exactly when $m$ is a multiple of every cycle length, so the smallest $m$ is $\operatorname{lcm}(2, 3, 4) = 12$.` },
        { q: String.raw`How many permutations $f$ of $\{1, 2, 3, 4, 5\}$ satisfy $f(f(x)) = x$ for every $x$?`, answer: "26",
          solution: String.raw`Every cycle has length $1$ or $2$. With no $2$-cycles there is $1$ permutation; with one, $\binom52 = 10$; with two, $\tfrac{\binom52\binom32}{2!} = 15$. The total is $26$.` }
      ],
      problems: [
        "2004 AIME I, Problem 8",
        "2026 AIME I, Problem 7",
        "2014 AIME II, Problem 13",
        "2012 AIME II, Problem 14"
      ]
    },
    "C9.3": {
      prereq: ["geometric-probability", "expected-value"],
      cards: ["product-of-uniforms", "order-statistics", "variance-independence"],
      body: String.raw`Geometric probability with one or two uniform variables reduces to areas of polygons. With products of variables, several sorted values, or questions about spread rather than average, the regions have curved edges or live in higher dimensions, and a few standard results replace the integrals. They are rare on the AIME but appear in AMC 12 problems and as steps in harder ones.

For the [[product-of-uniforms|product of two uniform variables]] $X$ and $Y$ on $[0, 1]$, the chance that $XY \le t$ is the area under the hyperbola $xy = t$ inside the unit square, which is $t - t\ln t$. Problems about areas of triangles formed by random points on two sides of a triangle use it, since such an area is the product of two uniform fractions times a fixed area.

[[order-statistics|Order statistics]] describe $n$ uniform numbers on $[0, 1]$ after sorting. The $n$ points cut the interval into $n + 1$ gaps, and by symmetry each gap has the same distribution, with expected length $\tfrac{1}{n + 1}$. So the smallest of three uniform numbers has expected value $\tfrac14$ and the largest $\tfrac34$; the larger of two has expected value $\tfrac23$. The probability that all $n$ lie below $t$ is $t^n$, which gives the distribution of the maximum, and by symmetry each of the $n$ is the largest with probability $\tfrac1n$.

[[variance-independence|Variance]] measures spread: $\operatorname{Var}(X) = E[X^2] - E[X]^2$. A fair die has $E[X^2] = \tfrac{91}{6}$ and $E[X] = \tfrac72$, so its variance is $\tfrac{91}{6} - \tfrac{49}{4} = \tfrac{35}{12}$. Unlike expectation, variance adds only for independent quantities, and $E[XY] = E[X]E[Y]$ also needs independence. For a sum of indicators, $E[S^2]$ is the sum of the probabilities of the single events plus twice the sum over pairs of the probabilities that both happen, which is how the second moment of a count is computed.

These tools are needed only when the region or the quantity is not a simple polygon or average. The last lesson collects further processes and games.`,
      related: [
        { card: "geometric-probability", note: String.raw`areas of regions for one or two uniform variables (C6.6).` },
        { card: "tail-sum-expectation", note: String.raw`expected values of maxima and minima from tails, the discrete version (C7.3).` },
        { card: "indicator-variables", note: String.raw`writing a count as a sum, the first step in computing its variance (C7.2).` }
      ],
      exercises: [
        { q: String.raw`Three numbers are chosen independently and uniformly from $[0, 1]$. What is the expected value of the smallest?`, answer: "1/4",
          solution: String.raw`The three numbers cut $[0, 1]$ into four gaps, which by symmetry have the same expected length, $\tfrac14$. The smallest number is the first gap, so its expected value is $\tfrac14$.` },
        { q: String.raw`What is the variance of the number shown by a fair die?`, answer: "35/12",
          solution: String.raw`$E[X] = \tfrac72$ and $E[X^2] = \tfrac{1 + 4 + 9 + 16 + 25 + 36}{6} = \tfrac{91}{6}$, so $\operatorname{Var}(X) = \tfrac{91}{6} - \tfrac{49}{4} = \tfrac{182 - 147}{12} = \tfrac{35}{12}$.` }
      ],
      problems: ["2024 AMC 12A, Problem 20"]
    },
    "C9.4": {
      prereq: ["recursive-counting", "backward-induction"],
      cards: ["transfer-matrix-method", "strategy-stealing", "truth-tellers-logic", "magic-squares"],
      body: String.raw`The last lesson of the book collects four tools that each solve a narrow kind of problem: counting strings with local rules by a matrix, deciding a game without solving it, untangling statements by people who lie or tell the truth, and finding entries of magic squares. Each has a standard first move, and knowing it turns a puzzle into a routine.

The [[transfer-matrix-method|transfer matrix method]] organizes a several-state recursion as a matrix. The states are what the next symbol depends on; entry $(i, j)$ of the matrix counts the ways to go from state $i$ to state $j$ in one step; and the count of strings of length $n$ is a sum of entries of the $n$th power. For strings over $\{A, B, C\}$ with no two consecutive $A$s, the states are "ends in $A$" and "ends in another letter", and the counts for length $1, 2, \ldots$ are $3, 8, 22, 60, 164$. The matrix form shows at once that the count satisfies a linear recursion, here $a_n = 2a_{n-1} + 2a_{n-2}$.

[[strategy-stealing|Strategy stealing and symmetry strategies]] decide games without listing positions. A symmetry strategy answers each move with its mirror image, which keeps the position symmetric and guarantees the last move; it works when the game has a symmetry and a first move to the center. Strategy stealing shows that in some games the first player cannot lose: if the second player had a winning strategy, the first could make an arbitrary move and then follow it, an extra move never hurting.

[[truth-tellers-logic|Truth-teller puzzles]] give statements by people who always tell the truth or always lie. Each assumption about one speaker forces the truth values of their statements, and the statements force other speakers; a contradiction eliminates the assumption. When the statements are about how many people are telling the truth, case on that number, since each statement is then simply true or false.

[[magic-squares|Magic squares]] have all rows, columns and both diagonals adding to the same sum. With the numbers $1$ to $9$ in a $3 \times 3$ square, the rows add to $45$ in all, so the magic sum is $15$, and adding the middle row, the middle column and both diagonals counts the center four times and every other cell once, giving $4c + (45 - c) = 60$, so the center is $5$. The same counting fixes the center in other magic squares, and a known entry or two then determines the rest.

These tools close the counting book. Each is a reminder of the habit common to all of them: find the structure that a single step, a single statement or a single line imposes, and count or reason from it.`,
      related: [
        { card: "restricted-sequences", note: String.raw`the same states, without the matrix (C2.4).` },
        { card: "matrix-multiplication", note: String.raw`powers of the transfer matrix (A9.3).` },
        { card: "casework-method", note: String.raw`casing on the number of true statements in a logic puzzle.` }
      ],
      exercises: [
        { q: String.raw`How many strings of length $5$ over the letters $A$, $B$, $C$ have no two consecutive $A$s?`, answer: "164",
          solution: String.raw`Let $x_n$ count valid strings ending in $A$ and $y_n$ those ending in $B$ or $C$. An $A$ may follow only a non-$A$, and $B$ or $C$ may follow anything: $x_{n+1} = y_n$ and $y_{n+1} = 2(x_n + y_n)$. From $(x_1, y_1) = (1, 2)$: $(2, 6)$, $(6, 16)$, $(16, 44)$, $(44, 120)$, so the count for length $5$ is $44 + 120 = 164$.` },
        { q: String.raw`The numbers $1$ to $9$ are placed in a $3 \times 3$ magic square. What number is in the center?`, answer: "5",
          solution: String.raw`The rows add to $45$, so the magic sum is $15$. The middle row, middle column and two diagonals add to $4 \cdot 15 = 60$ and contain the center four times and every other cell once: $4c + (45 - c) = 60$, so $c = 5$.` }
      ],
      problems: [
        "2011 AMC 12A, Problem 2",
        "2015 AMC 12B, Problem 4",
        "2025 AMC 12A, Problem 4",
        "2020 AMC 12A, Problem 5",
        "2004 AMC 12B, Problem 22",
        "2020 AMC 12B, Problem 14",
        "1996 AIME, Problem 1"
      ]
    }
  }
};
