// Learn, Olympiad Combinatorics, chapter K4: algebraic, probabilistic and game methods (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["K4"] = {
  lessons: {
    "K4.1": {
      prereq: ["probabilistic-method", "expected-value", "backward-induction"],
      cards: [],
      body: String.raw`Three further methods prove combinatorial statements. A polynomial that vanishes on a grid of points must have small degree, which turns covering and sumset questions into algebra. Probability supplies inequalities and generating functions that bound or compute counts. And impartial games, in which both players have the same moves, are solved by assigning each position a number.

A nonnegative random variable with average $2$ is at least $10$ with probability at most $\tfrac15$, by Markov's inequality. The number shown by a fair die has probability generating function $\tfrac{s + s^2 + \cdots + s^6}{6}$, whose derivative at $s = 1$ is the mean $3.5$. And Nim with piles of $3$, $5$ and $6$ is lost by the player to move, since $3 \oplus 5 \oplus 6 = 0$.

The lessons are the combinatorial Nullstellensatz (K4.2), probability tools (K4.3), and impartial games (K4.4). The Summary (K4.5) collects the strategies.`,
      exercises: [
        { q: String.raw`A nonnegative random variable has mean $2$. Give an upper bound for the probability that it is at least $10$.`, answer: "1/5",
          solution: String.raw`By Markov's inequality, $P(X \ge 10) \le \tfrac{E[X]}{10} = \tfrac15$.` },
        { q: String.raw`Compute $3 \oplus 5 \oplus 6$, the XOR of the binary numbers.`, answer: "0",
          solution: String.raw`$011 \oplus 101 = 110$, and $110 \oplus 110 = 000$. So the XOR is $0$.` }
      ],
      problems: []
    },
    "K4.2": {
      prereq: ["cauchy-davenport", "binomial-theorem"],
      cards: ["combinatorial-nullstellensatz"],
      body: String.raw`Why does a sumset modulo a prime have at least $|A| + |B| - 1$ elements? How many planes not through the origin are needed to cover every other corner of the cube $\{0, 1\}^n$? A polynomial is a counting device: if it vanishes on too many points, a coefficient must be zero.

[[combinatorial-nullstellensatz|The combinatorial Nullstellensatz]] says: let $f$ be a polynomial over a field with total degree $t_1 + \cdots + t_n$, whose coefficient of $x_1^{t_1}\cdots x_n^{t_n}$ is not zero; if $S_1, \ldots, S_n$ are sets with $|S_i| \gt t_i$, then $f(s_1, \ldots, s_n) \ne 0$ for some $s_i \in S_i$. In one variable it is the fact that a nonzero polynomial of degree $t$ has at most $t$ roots. The method is to build a polynomial that vanishes on every point of a grid when the claim fails, and then find a nonzero top coefficient.

For Cauchy-Davenport, suppose $|A + B| \le |A| + |B| - 2$ with $|A| + |B| - 1 \le p$, and take a set $C \supseteq A + B$ of exactly $|A| + |B| - 2$ elements. The polynomial $f(x, y) = \prod_{c \in C}(x + y - c)$ vanishes on $A \times B$. Its degree is $|A| + |B| - 2$, and the coefficient of $x^{|A|-1}y^{|B|-1}$ is $\binom{|A| + |B| - 2}{|A| - 1}$, not divisible by $p$ since $|A| + |B| - 2 \lt p$. With $t_1 = |A| - 1$ and $t_2 = |B| - 1$, the theorem gives a point of $A \times B$ where $f \ne 0$, a contradiction. For the cube, $n$ planes suffice ($x_i = 1$), and fewer do not: a polynomial built from the planes and the product $\prod(x_j - 1)$ would vanish on all of $\{0, 1\}^n$ while having a nonzero coefficient of $x_1\cdots x_n$.

Build a polynomial that vanishes on a grid if the claim fails, find its top coefficient, and check it is not zero. The next lesson uses probability.`,
      related: [
        { card: "cauchy-davenport", note: String.raw`the sumset bound the method proves (D3.3).` },
        { card: "chevalley-warning", note: String.raw`another counting theorem for polynomials over $\mathbb{F}_p$ (D3.2).` },
        { card: "lagrange-roots-mod-p", note: String.raw`the one-variable case: at most $t$ roots (D1.2).` }
      ],
      exercises: [
        { q: String.raw`Use the combinatorial Nullstellensatz to prove the Cauchy-Davenport theorem: for nonempty $A, B \subseteq \mathbb{Z}_p$ with $|A| + |B| - 1 \le p$, $|A + B| \ge |A| + |B| - 1$.`,
          solution: String.raw`Suppose $|A + B| \le |A| + |B| - 2$, and let $C$ be a set of exactly $|A| + |B| - 2$ residues containing $A + B$. Then $f(x, y) = \prod_{c \in C}(x + y - c)$ is $0$ at every point of $A \times B$. It has degree $|A| + |B| - 2$, and its coefficient of $x^{|A|-1}y^{|B|-1}$ is $\binom{|A| + |B| - 2}{|A| - 1}$, which is not $0$ modulo $p$ because $|A| + |B| - 2 \lt p$. Since $|A| \gt |A| - 1$ and $|B| \gt |B| - 1$, the Nullstellensatz gives $a \in A$, $b \in B$ with $f(a, b) \ne 0$, a contradiction.` },
        { q: String.raw`Prove that the $2^n - 1$ points of $\{0, 1\}^n$ other than the origin cannot be covered by fewer than $n$ planes (hyperplanes) that do not pass through the origin.`,
          solution: String.raw`Suppose $k \lt n$ hyperplanes $a_i \cdot x = b_i$ with $b_i \ne 0$ cover them. Let $F(x) = \prod_{i=1}^{k}(a_i \cdot x - b_i) - c\prod_{j=1}^{n}(x_j - 1)$, with $c$ chosen so that $F(0) = 0$, namely $c = \tfrac{\prod(-b_i)}{(-1)^n} \ne 0$. Then $F$ vanishes at every point of $\{0, 1\}^n$: at the origin by the choice of $c$, elsewhere because one hyperplane factor is $0$ and some $x_j = 1$. But $F$ has degree $n$ and its coefficient of $x_1\cdots x_n$ is $-c \ne 0$, since the first product has degree $k \lt n$. With $S_j = \{0, 1\}$ and $t_j = 1$, the Nullstellensatz gives a point where $F \ne 0$, a contradiction.` }
      ],
      problems: []
    },
    "K4.3": {
      prereq: ["expected-value", "indicator-variables", "binomial-probability"],
      cards: ["markovs-inequality", "probability-generating-functions", "coprime-probability"],
      body: String.raw`In a random permutation of $100$ objects, how likely are $5$ or more fixed points? What is the chance of an even number of heads in $n$ tosses? What fraction of pairs of integers are coprime? Three tools for olympiad probability.

[[markovs-inequality|Markov's inequality]] says that a nonnegative random variable $X$ satisfies $P(X \ge a) \le \tfrac{E[X]}{a}$, since $X \ge a$ on that event and $X \ge 0$ elsewhere. It needs only the mean, so it pairs with indicator variables: the expected number of fixed points of a random permutation is $1$, whatever the size, so $P(\text{at least } 5) \le \tfrac15$. It is how the probabilistic method shows that a random object usually has few bad features.

[[probability-generating-functions|The probability generating function]] $G_X(s) = E[s^X] = \sum P(X = k)s^k$ of a random variable with values $0, 1, 2, \ldots$ turns sums of independent variables into products, $G_{X+Y} = G_XG_Y$. Its derivatives at $1$ give the mean, $G'(1)$, and the values at $-1$ separate parities: $P(X \text{ even}) = \tfrac{G(1) + G(-1)}{2}$. For $n$ fair tosses, $G(s) = \left(\tfrac{1 + s}{2}\right)^n$ and $G(-1) = 0$, so an even number of heads has probability $\tfrac12$. For two dice, $G(s) = \left(\tfrac{s + \cdots + s^6}{6}\right)^2$, and the coefficient of $s^7$ is $\tfrac{6}{36} = \tfrac16$.

[[coprime-probability|The coprime probability]] is $\tfrac{6}{\pi^2}$: two random integers share the factor $p$ with probability $\tfrac1{p^2}$, so they are coprime with probability $\prod_p\left(1 - \tfrac1{p^2}\right) = \tfrac{1}{\zeta(2)} = \tfrac{6}{\pi^2}$, in the limit over $1, \ldots, N$. The finite version is exact for the small primes: the chance that no prime up to $3$ divides both is $\left(1 - \tfrac14\right)\left(1 - \tfrac19\right) = \tfrac23$.

Bound tails by the mean with Markov, multiply generating functions for sums and evaluate at $-1$ for parity, and treat divisibility by different primes as independent. The next lesson plays games.`,
      related: [
        { card: "indicator-variables", note: String.raw`the expected counts that Markov's inequality uses (R6.5).` },
        { card: "generating-function-method", note: String.raw`the counting version of a generating function (R8.3).` },
        { card: "coefficient-extraction", note: String.raw`evaluating at $1$ and $-1$ to sum coefficients.` }
      ],
      exercises: [
        { q: String.raw`Prove that in a random permutation of $n$ objects, the probability of at least $5$ fixed points is at most $\tfrac15$.`,
          solution: String.raw`Each object is fixed with probability $\tfrac1n$, so the expected number of fixed points is $n \cdot \tfrac1n = 1$. The number of fixed points is nonnegative, so by Markov's inequality $P(X \ge 5) \le \tfrac15$.` },
        { q: String.raw`A fair coin is tossed $n \ge 1$ times. Use a generating function to show that the number of heads is even with probability $\tfrac12$.`,
          solution: String.raw`$G(s) = \left(\tfrac{1 + s}{2}\right)^n$. The even-index coefficients add to $\tfrac{G(1) + G(-1)}{2} = \tfrac{1 + 0}{2} = \tfrac12$.` },
        { q: String.raw`Two integers are chosen independently and uniformly from $1, \ldots, 36$. What is the probability that neither $2$ nor $3$ divides both of them?`, answer: "2/3",
          solution: String.raw`Since $36$ is a multiple of $6$, each integer is even with probability $\tfrac12$ and a multiple of $3$ with probability $\tfrac13$, and these are independent (by the residue modulo $6$). Both are even with probability $\tfrac14$, both multiples of $3$ with probability $\tfrac19$, independently, so the answer is $\left(1 - \tfrac14\right)\left(1 - \tfrac19\right) = \tfrac23$.` }
      ],
      problems: []
    },
    "K4.4": {
      prereq: ["backward-induction", "strategy-stealing"],
      cards: ["sprague-grundy"],
      body: String.raw`Who wins Nim with piles $3$, $5$, $7$, and how? In a game where a move removes $1$, $3$ or $4$ coins, which piles are losses? What if a player may move in either of two games? Impartial games, where both players have the same moves and the last to move wins, have a complete theory.

[[sprague-grundy|The Sprague-Grundy theory]] gives each position a number, its Grundy value: $0$ for a position with no moves, and otherwise the smallest nonnegative integer that is not the value of any position one move away. A position is a loss for the player to move exactly when its value is $0$. For Nim, a single pile of $n$ has value $n$, and a position of several piles has value the XOR of the pile sizes (Bouton's theorem): $3 \oplus 5 \oplus 7 = 1$, so the player to move wins, by taking $1$ from the pile of $3$ to reach $2 \oplus 5 \oplus 7 = 0$.

The theorem that makes the theory useful is that a sum of games, in which each move is made in one component, has Grundy value the XOR of the components' values. So every impartial game acts like a Nim pile of its value, and a complicated game splits into simple pieces. For the subtraction game with moves $1$, $3$, $4$, the values from $0$ run $0, 1, 0, 1, 2, 3, 2$ and then repeat with period $7$; a pile of $5$ in a game with moves $1$ or $2$ has value $5 \bmod 3 = 2$, so beside a Nim pile of $2$ the sum has value $2 \oplus 2 = 0$, a loss.

Compute values from the bottom up, take the smallest missing value, XOR the values of independent components, and move to a position of value $0$. The Summary follows.`,
      related: [
        { card: "backward-induction", note: String.raw`labeling positions as wins and losses (R5.4).` },
        { card: "turn-based-games", note: String.raw`games of chance, which have probabilities instead of values (R8.4).` },
        { card: "periodic-sequences", note: String.raw`the period of Grundy values of a subtraction game.` }
      ],
      exercises: [
        { q: String.raw`In Nim with piles of $3$, $5$ and $7$, what move wins for the player to move?`,
          solution: String.raw`$3 \oplus 5 \oplus 7 = 011 \oplus 101 \oplus 111 = 001 \ne 0$, so the position is a win. Reducing the pile of $3$ to $3 \oplus 1 = 2$ gives $2 \oplus 5 \oplus 7 = 010 \oplus 101 \oplus 111 = 000$. So take $1$ coin from the pile of $3$.` },
        { q: String.raw`In a game where a move removes $1$, $3$ or $4$ coins from a pile, and the player who takes the last coin wins, find the Grundy value of a pile of $20$.`, answer: "2",
          solution: String.raw`The values from $0$ are $0, 1, 0, 1, 2, 3, 2, 0, 1, 0, 1, 2, 3, 2, \ldots$, each the smallest number not among the values $1$, $3$ and $4$ back. They repeat with period $7$, as the computation shows once $7$ through $13$ match $0$ through $6$. Since $20 = 14 + 6$, the value is that of $6$: $2$.` },
        { q: String.raw`A position consists of a pile of $5$ coins, from which a move takes $1$ or $2$, and a Nim pile of $2$. A move is made in one of them. Who wins?`,
          solution: String.raw`The first game's values are $n \bmod 3$, so a pile of $5$ has value $2$. The Nim pile has value $2$. The sum has value $2 \oplus 2 = 0$, so the player to move loses: the second player wins, answering each move so as to restore equal values.` }
      ],
      problems: []
    },
    "K4.5": {
      prereq: ["combinatorial-nullstellensatz", "markovs-inequality", "probability-generating-functions", "coprime-probability", "sprague-grundy"],
      cards: [],
      body: String.raw`[[combinatorial-nullstellensatz|The combinatorial Nullstellensatz]] finds a nonzero value of a polynomial on a grid from a nonzero top coefficient.

[[markovs-inequality|Markov's inequality]] bounds a tail by the mean, [[probability-generating-functions|probability generating functions]] multiply for sums and separate parities at $-1$, and [[coprime-probability|the coprime probability]] treats primes independently.

[[sprague-grundy|Grundy values]] solve impartial games, and the XOR combines independent games.`,
      strategies: [
        String.raw`If a claim fails, build a polynomial vanishing on a grid; find a nonzero top coefficient.`,
        String.raw`Bound the chance of many bad events by the expected number, with Markov.`,
        String.raw`For sums of independent variables, multiply generating functions; for parity, evaluate at $-1$.`,
        String.raw`Compute Grundy values from small positions up and look for a period.`,
        String.raw`Split a game into independent parts and XOR their values.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A nonnegative random variable has mean $3$. Bound the probability that it is at least $12$.`, answer: "1/4",
        solution: String.raw`By Markov, $P(X \ge 12) \le \tfrac{3}{12} = \tfrac14$.` },
      { q: String.raw`Who wins Nim with piles $1$, $2$, $3$?`,
        solution: String.raw`$1 \oplus 2 \oplus 3 = 0$, so the player to move loses: the second player wins.` },
      { q: String.raw`Two numbers are chosen independently and uniformly from $1, 2, 3, 4$. Use generating functions to find the probability that their sum is even.`, answer: "1/2",
        solution: String.raw`$G(s) = \left(\tfrac{s + s^2 + s^3 + s^4}{4}\right)^2$, and $G(-1) = \left(\tfrac{-1 + 1 - 1 + 1}{4}\right)^2 = 0$. So the probability of an even sum is $\tfrac{G(1) + G(-1)}{2} = \tfrac12$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that from every Nim position whose XOR is not $0$ there is a move to a position whose XOR is $0$, and that from a position with XOR $0$ every move gives a nonzero XOR.`,
        solution: String.raw`Let $x = a_1 \oplus \cdots \oplus a_k \ne 0$, with highest binary digit $2^j$. Some pile $a_i$ has the digit $2^j$; then $a_i \oplus x \lt a_i$, since it clears that digit and changes only lower ones. Reducing $a_i$ to $a_i \oplus x$ makes the XOR $x \oplus x = 0$. Conversely, a move changes one pile $a_i$ to $b \ne a_i$, which changes the XOR by $a_i \oplus b \ne 0$, so from $0$ it becomes nonzero.` },
      { q: String.raw`In the subtraction game with moves $1$, $3$, $4$, prove that the Grundy values have period $7$.`,
        solution: String.raw`Each value depends only on the values $1$, $3$ and $4$ places back. The computed values $g(0), \ldots, g(13)$ are $0, 1, 0, 1, 2, 3, 2, 0, 1, 0, 1, 2, 3, 2$, so $g(n + 7) = g(n)$ for $n = 0, \ldots, 6$, a block longer than the largest move $4$. By induction, if $g(m + 7) = g(m)$ for all $m \lt n$ with $n \ge 7$, the values feeding $g(n + 7)$ equal those feeding $g(n)$, so $g(n + 7) = g(n)$.` },
      { q: String.raw`Prove that in a sum of two identical impartial games, the second player wins.`,
        solution: String.raw`The second player copies each move in the other component. After each of the second player's moves the two components are identical, so whenever the first player has a move, the copy is available. The game is finite, so the first player eventually has no move and loses. (In Grundy values: $g \oplus g = 0$.)` }
    ],
    problems: []
  }
};
