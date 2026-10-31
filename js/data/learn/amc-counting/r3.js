// Learn, AMC Counting & Probability, chapter R3: counting and probability for the AMC 12 (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R3"] = {
  lessons: {
    "R3.1": {
      prereq: ["stars-and-bars", "recursive-counting"],
      cards: ["restricted-sequences", "stars-bars-upper-bound", "catalan-numbers", "committee-chair", "nested-subset-pairs"],
      body: String.raw`The AMC 12 adds a few counting structures beyond the AMC 10: strings with local rules, distributions with caps, the Catalan numbers, and counts of pairs of sets.

[[restricted-sequences|Restricted sequences]] are counted by states: binary strings of length $n$ with no two adjacent $1$s, split by their last digit, satisfy $a_n = a_{n-1} + a_{n-2}$, so length $5$ gives $13$. [[stars-bars-upper-bound|Stars and bars with upper bounds]] subtracts the solutions that break a cap: $a + b + c = 10$ with each part at most $4$ has only the arrangements of $(4, 4, 2)$ and $(4, 3, 3)$, $6$ in all.

The [[catalan-numbers|Catalan numbers]] $1, 1, 2, 5, 14, 42, \ldots$, $C_n = \tfrac{1}{n + 1}\binom{2n}{n}$, count lattice paths that stay below the diagonal, balanced parentheses and triangulations; $C_5 = 42$.

The [[committee-chair|committee-chair identity]] $k\binom nk = n\binom{n-1}{k-1}$ gives $\sum_k k\binom 8k = 8 \cdot 2^7 = 1024$. [[nested-subset-pairs|Pairs of nested subsets]] $A \subseteq B \subseteq S$ are counted element by element: each element is in $A$, in $B$ only, or in neither, $3^{|S|}$ pairs.

Count by states, subtract capped cases, recognize Catalan sequences, and count pairs element by element. The next lesson treats more binomial identities.`,
      related: [
        { card: "grid-paths", note: String.raw`unrestricted lattice paths (R1.5).` },
        { card: "pie", note: String.raw`the inclusion-exclusion behind upper bounds (R1.2).` },
        { card: "double-counting", note: String.raw`counting one set two ways (C4.3).` }
      ],
      exercises: [
        { q: String.raw`How many binary strings of length $5$ have no two adjacent $1$s?`, answer: "13",
          solution: String.raw`$a_n = a_{n-1} + a_{n-2}$ with $a_1 = 2$, $a_2 = 3$: $5, 8, 13$, so $a_5 = 13$.` },
        { q: String.raw`Find $\displaystyle\sum_{k=0}^{8} k\binom8k$.`, answer: "1024",
          solution: String.raw`$k\binom8k = 8\binom7{k-1}$, so the sum is $8 \cdot 2^7 = 1024$.` }
      ],
      problems: [
        "2008 AMC 12A, Problem 19",
        "2003 AIME II, Problem 3",
        "2008 AIME I, Problem 11"
      ]
    },
    "R3.2": {
      prereq: ["binomial-theorem", "pascals-identity"],
      cards: ["vandermonde", "squared-binomial-sum", "multinomial-theorem", "generating-function-method"],
      body: String.raw`Sums of products of binomial coefficients, coefficients of powers of sums with three or more terms, and counts that combine independent choices all have short answers through identities and generating functions.

[[vandermonde|Vandermonde's identity]] $\sum_k\binom mk\binom n{r-k} = \binom{m + n}{r}$ chooses $r$ people from two groups by how many come from each. The [[squared-binomial-sum|sum of squared binomial coefficients]] is its special case $\sum_k\binom nk^2 = \binom{2n}{n}$, so $\sum_k\binom6k^2 = 924$.

The [[multinomial-theorem|multinomial theorem]] gives the coefficient of $x^ay^bz^c$ in $(x + y + z)^n$ as $\tfrac{n!}{a!\,b!\,c!}$: in $(x + y + z)^5$ the coefficient of $x^2y^2z$ is $\tfrac{120}{4} = 30$.

The [[generating-function-method|generating function method]] multiplies polynomials whose coefficients count choices: the ways to make $10$ cents from pennies, nickels and dimes are the coefficient of $x^{10}$ in $(1 + x + \cdots)(1 + x^5 + \cdots)(1 + x^{10} + \cdots)$; with coins of $1$, $2$ and $5$ it is $10$.

Read sums of products as committees, coefficients as multinomials, and combined choices as products of polynomials. The next lesson treats invariants and symmetry.`,
      related: [
        { card: "hockey-stick", note: String.raw`summing a diagonal of Pascal's triangle (R1.4).` },
        { card: "roots-of-unity-filter", note: String.raw`extracting every $n$th coefficient (A6.3).` },
        { card: "partitions", note: String.raw`generating functions for partitions (C9.2).` }
      ],
      exercises: [
        { q: String.raw`Find $\binom60^2 + \binom61^2 + \cdots + \binom66^2$.`, answer: "924",
          solution: String.raw`$\sum\binom6k^2 = \binom{12}{6} = 924$.` },
        { q: String.raw`Find the coefficient of $x^2y^2z$ in $(x + y + z)^5$.`, answer: "30",
          solution: String.raw`$\tfrac{5!}{2!\,2!\,1!} = 30$.` },
        { q: String.raw`In how many ways can $10$ cents be made from coins worth $1$, $2$ and $5$ cents?`, answer: "10",
          solution: String.raw`By the number of $5$'s: with two, $1$ way; with one, the remaining $5$ cents use $0, 1$ or $2$ two-cent coins, $3$ ways; with none, $10$ cents use $0$ to $5$ two-cent coins, $6$ ways. Total $10$.` }
      ],
      problems: [
        "2004 AMC 10A, Problem 10",
        "2012 AMC 12A, Problem 11",
        "2024 AMC 12A, Problem 16",
        "2019 AMC 10A, Problem 25",
        "2006 AMC 12A, Problem 24",
        "2025 AIME I, Problem 3",
        "2017 AIME I, Problem 7"
      ]
    },
    "R3.3": {
      prereq: ["coloring-arguments"],
      cards: ["invariants-coloring", "graph-coloring", "permutation-cycle-structure", "strategy-stealing"],
      body: String.raw`Some problems are about what a process cannot change, how many ways a graph can be colored, how permutations repeat, and who wins a game. Each has a structural tool.

An [[invariants-coloring|invariant]] is a quantity no move changes: a sum, a parity, a residue. If the only moves change $x + y$ by multiples of $3$, the reachable points all have the same $x + y \pmod 3$ as the start, which rules out the rest.

[[graph-coloring|Graph coloring]] counts colorings with neighbors different: a path of $n$ vertices has $k(k - 1)^{n-1}$, and a cycle has $(k - 1)^n + (-1)^n(k - 1)$, so a $6$-cycle with $3$ colors has $2^6 + 2 = 66$.

The [[permutation-cycle-structure|cycle structure]] of a permutation decides its order: cycles of lengths $3$ and $5$ give order $\operatorname{lcm}(3, 5) = 15$. Involutions are permutations with cycles of length $1$ and $2$.

[[strategy-stealing|Strategy stealing and symmetry]] decide games without listing positions: a player who can always answer with the mirror image of the opponent's move keeps the position symmetric and makes the last move.

Find what is invariant, use the coloring formulas, read orders from cycles, and mirror in games. The next lesson treats conditional probability and expectation.`,
      related: [
        { card: "backward-induction", note: String.raw`solving games position by position (R1.5).` },
        { card: "burnsides-lemma", note: String.raw`counting colorings up to symmetry (C4.4).` },
        { card: "lcm-common-multiples", note: String.raw`the lcm that gives a permutation's order (M1.1).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can the vertices of a $6$-cycle be colored with $3$ colors so that adjacent vertices differ?`, answer: "66",
          solution: String.raw`$(k - 1)^n + (-1)^n(k - 1) = 2^6 + 2 = 66$.` },
        { q: String.raw`A permutation has one cycle of length $3$ and one of length $5$. What is the smallest $m \gt 0$ with $f^m$ the identity?`, answer: "15",
          solution: String.raw`$m$ must be a multiple of both cycle lengths: $\operatorname{lcm}(3, 5) = 15$.` }
      ],
      problems: [
        "2016 AMC 10A, Problem 13",
        "2020 AMC 10B, Problem 16",
        "2000 AMC 10, Problem 17",
        "2011 AMC 10A, Problem 22",
        "2006 AMC 12B, Problem 18",
        "2026 AIME I, Problem 7",
        "2012 AIME I, Problem 11"
      ]
    },
    "R3.4": {
      prereq: ["conditional-probability", "expected-value"],
      cards: ["bayes-theorem", "indicator-variables", "expected-fixed-points", "tail-sum-expectation", "total-expectation"],
      body: String.raw`The AMC 12 asks for probabilities reversed by Bayes' theorem and for expected values computed by linearity, tails and cases.

[[bayes-theorem|Bayes' theorem]] reverses a condition: $P(A \mid B) = \tfrac{P(B \mid A)P(A)}{P(B)}$. One fair coin and one two-headed coin; one is picked at random and shows heads. Heads has probability $\tfrac12 \cdot \tfrac12 + \tfrac12 \cdot 1 = \tfrac34$, of which $\tfrac12$ comes from the two-headed coin, so it is the two-headed coin with probability $\tfrac23$.

[[indicator-variables|Indicator variables]] write a count as a sum of $0$-or-$1$ quantities, so its expectation is a sum of probabilities. The [[expected-fixed-points|expected number of fixed points]] of a random permutation is $1$, whatever its size. The [[tail-sum-expectation|tail-sum formula]] $E[X] = \sum_{k \ge 1}P(X \ge k)$ handles maxima and minima: the smaller of two dice has expectation $\sum_k\left(\tfrac{7 - k}{6}\right)^2 = \tfrac{91}{36}$. The [[total-expectation|law of total expectation]] splits an expectation into cases and weights them by their probabilities.

Reverse conditions with a convenient population, split counts into indicators, and use tails for extremes. The next lesson treats random processes.`,
      related: [
        { card: "binomial-probability", note: String.raw`the full distribution of a count of successes (R2.2).` },
        { card: "derangements", note: String.raw`permutations with no fixed point (R1.3).` },
        { card: "states-recursion-prob", note: String.raw`expectations of processes by states (R3.5).` }
      ],
      exercises: [
        { q: String.raw`A bag holds a fair coin and a two-headed coin. One is chosen at random and flipped, showing heads. What is the probability it is the two-headed coin?`, answer: "2/3",
          solution: String.raw`$P(\text{heads}) = \tfrac12 \cdot \tfrac12 + \tfrac12 \cdot 1 = \tfrac34$, and $P(\text{two-headed and heads}) = \tfrac12$. The ratio is $\tfrac{1/2}{3/4} = \tfrac23$.` },
        { q: String.raw`Two fair dice are rolled. What is the expected value of the smaller number?`, answer: "91/36",
          solution: String.raw`$P(\min \ge k) = \left(\tfrac{7 - k}{6}\right)^2$, so $E[\min] = \tfrac{36 + 25 + 16 + 9 + 4 + 1}{36} = \tfrac{91}{36}$.` }
      ],
      problems: [
        "2012 AMC 10B, Problem 18",
        "2021 Fall AMC 12B, Problem 23",
        "2015 AIME II, Problem 2",
        "2014 AIME II, Problem 6"
      ]
    },
    "R3.5": {
      prereq: ["expected-value", "geometric-series"],
      cards: ["states-recursion-prob", "geometric-distribution", "turn-based-games"],
      body: String.raw`Random processes that run until something happens, such as a frog jumping until it escapes, rolling until a six, or players alternating until one wins, are solved by one-step equations.

[[states-recursion-prob|First-step analysis]] names a probability or expected value for each state and conditions on the first move: $p_s = \sum_t P(s \to t)p_t$, with boundary values at the end states. Choosing states that record only what matters keeps the system small, and symmetric states share a value.

The [[geometric-distribution|geometric distribution]] counts trials until the first success: with success probability $p$, the expected number is $\tfrac1p$, so a fair coin takes $2$ flips on average to show heads and a die $6$ rolls to show a six.

In [[turn-based-games|turn-based games]] where players alternate and the first success wins, the restart equation gives the first player's chance: with a fair coin, $P = \tfrac12 + \tfrac14P$, so the first player wins with probability $\tfrac23$.

Set one unknown per state, condition on the first step, and use the restart equation for alternating games. The last lesson of the chapter treats continuous probability.`,
      related: [
        { card: "recursive-counting", note: String.raw`the counting version of first-step equations (R1.5).` },
        { card: "gamblers-ruin", note: String.raw`random walks between two barriers (C7.5).` },
        { card: "tail-sum-expectation", note: String.raw`expected waiting times from tails (R3.4).` }
      ],
      exercises: [
        { q: String.raw`Two players alternate flipping a fair coin, and the first to flip heads wins. What is the probability that the first player wins?`, answer: "2/3",
          solution: String.raw`The first player wins at once with probability $\tfrac12$; otherwise both miss with probability $\tfrac14$ and the game restarts: $P = \tfrac12 + \tfrac14P$, so $P = \tfrac23$.` },
        { q: String.raw`A fair die is rolled until a $6$ appears. What is the expected number of rolls?`, answer: "6",
          solution: String.raw`The number of rolls is geometric with $p = \tfrac16$, so its expected value is $\tfrac1p = 6$.` }
      ],
      problems: [
        "2015 AMC 12B, Problem 9",
        "2019 AMC 10B, Problem 22",
        "2021 Spring AMC 10A, Problem 23",
        "2025 AMC 12B, Problem 18",
        "2025 AMC 12B, Problem 20",
        "2019 AIME II, Problem 2",
        "1993 AIME, Problem 11"
      ]
    },
    "R3.6": {
      prereq: ["geometric-probability", "expected-value"],
      cards: ["product-of-uniforms", "order-statistics", "variance-independence"],
      body: String.raw`With continuous random numbers, a few facts go beyond areas of polygons: the distribution of a product, the expected size of the largest or smallest of several numbers, and variance.

For two uniform numbers on $[0, 1]$, the event $XY \le t$ is the region under a hyperbola, and the [[product-of-uniforms|product of uniforms]] has $P(XY \le t) = t - t\ln t$; problems about areas of random triangles inside a fixed triangle reduce to such products.

[[order-statistics|Order statistics]]: $n$ uniform numbers on $[0, 1]$ cut it into $n + 1$ pieces of equal expected length $\tfrac{1}{n + 1}$, so the largest of two has expected value $\tfrac23$ and the smallest of three $\tfrac14$.

[[variance-independence|Variance]] $E[X^2] - E[X]^2$ measures spread; a fair coin's number of heads in one flip has variance $\tfrac14$, and variances add for independent quantities.

Draw the region, use equal expected gaps, and add variances only when independent. This completes the AMC Counting & Probability book.`,
      related: [
        { card: "geometric-probability", note: String.raw`probability as area (R2.3).` },
        { card: "tail-sum-expectation", note: String.raw`expected maxima and minima from tails (R3.4).` },
        { card: "indicator-variables", note: String.raw`second moments of counts (R3.4).` }
      ],
      exercises: [
        { q: String.raw`Two numbers are chosen uniformly from $[0, 1]$. What is the expected value of the larger?`, answer: "2/3",
          solution: String.raw`The two numbers cut $[0, 1]$ into three pieces of equal expected length $\tfrac13$, and the larger number is the sum of the first two pieces: $\tfrac23$.` }
      ],
      problems: ["2024 AMC 12A, Problem 20"]
    }
  }
};
