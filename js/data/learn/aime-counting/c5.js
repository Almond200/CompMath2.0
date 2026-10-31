// Learn, AIME Counting & Probability, chapter C5: recursion, states and processes (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C5"] = {
  lessons: {
    "C5.1": {
      prereq: ["constructive-counting"],
      cards: [],
      body: String.raw`This chapter counts objects that are built one step at a time, and studies processes that change one step at a time. Its tools are the recursion, the state, the table, and the invariant.

A recursion gives a count in terms of the counts of smaller cases. If $a_n$ is the number of objects of size $n$, a recursion such as $a_n = a_{n-1} + a_{n-2}$ says how the objects of size $n$ are made from smaller ones, and a few starting values such as $a_1$ and $a_2$ fix the whole sequence. For example, a string of $n$ letters $A$ and $B$ with no two $A$s next to each other ends in $B$ or in $BA$, and removing that ending leaves a valid string of length $n - 1$ or $n - 2$. A recursion is correct when every object of size $n$ comes from exactly one smaller object in exactly one way.

Sometimes one count is not enough to say how an object can continue. Then the objects are split into states, such as the last letter of a string, the shape of the end of a board, or the point where a walk now stands, and each state gets its own count and its own recursion.

A process is a rule that changes a configuration step by step: a game, a walk on a grid, or numbers on a board that are combined. There are two questions to ask about it. Where can it go? A table answers that, filled one position at a time from the positions one move away. What can it never change? An invariant is a quantity that every step leaves fixed, and it shows which outcomes are impossible. When the steps are random, a third question is how likely each ending is, and the same states, each given a probability, answer it.

The lessons take these ideas in turn: recursions (C5.2), tilings (C5.3), tables of paths and of game positions (C5.4), invariants (C5.5), lattice paths (C5.6), and the chance of winning a game, found from its states (C5.7). The Summary (C5.8) collects the strategies.`,
      exercises: [
        { q: String.raw`A sequence has $a_1 = 1$, $a_2 = 3$, and $a_n = a_{n-1} + 2a_{n-2}$ for $n \ge 3$. Find $a_6$.`, answer: "43",
          solution: String.raw`Apply the rule one term at a time: $a_3 = 3 + 2 \cdot 1 = 5$, $a_4 = 5 + 2 \cdot 3 = 11$, $a_5 = 11 + 2 \cdot 5 = 21$, and $a_6 = 21 + 2 \cdot 11 = 43$.` },
        { q: String.raw`A path moves from $(0, 0)$ to $(3, 2)$ in unit steps right or up. Write at each lattice point the number of paths that reach it. What number is written at $(3, 2)$?`, answer: "10",
          solution: String.raw`Every point on the bottom row or the left column gets $1$. Every other point gets the sum of the numbers at the point to its left and the point below it, since a path arrives from one of those two. The rows from the bottom are $1, 1, 1, 1$, then $1, 2, 3, 4$, then $1, 3, 6, 10$. So $10$ paths reach $(3, 2)$, which matches $\binom{5}{2} = 10$.` },
        { q: String.raw`How many strings of $6$ letters, each $A$ or $B$, have no two $A$s next to each other?`, answer: "21",
          solution: String.raw`Let $s_n$ be the number of such strings of length $n$. A valid string ends in $B$, after a valid string of length $n - 1$, or in $BA$, after a valid string of length $n - 2$, so $s_n = s_{n-1} + s_{n-2}$. With $s_1 = 2$ ($A$, $B$) and $s_2 = 3$ ($AB$, $BA$, $BB$), the next values are $5$, $8$, $13$, $21$, so $s_6 = 21$.` },
        { q: String.raw`The numbers $1, 2, \ldots, 10$ are written on a board. A step erases two numbers $a$ and $b$ and writes $|a - b|$. After nine steps one number is left. Is it odd or even?`,
          solution: String.raw`The parity of the sum of the numbers on the board never changes: $a + b$ and $|a - b|$ differ by $2\min(a, b)$, an even number. The sum starts at $55$, which is odd, so the last number is odd.` }
      ],
      problems: [
        "2023 AMC 10A, Problem 20",
        "2023 AIME II, Problem 10",
        "2026 AIME II, Problem 7"
      ]
    },
    "C5.2": {
      prereq: ["constructive-counting", "linear-recurrence"],
      cards: ["recursive-counting"],
      body: String.raw`When the objects of size $n$ can be built from objects of smaller size in a controlled way, the count for $n$ is determined by the counts for smaller sizes, and a short table finishes the problem. How many ways can you climb ten stairs taking one, two or three at a time? How many towers can be built from cubes of edge $1$ to $8$ under a stacking rule? How many permutations are "quasi-increasing"? None has an obvious closed form, and all yield to a recursion computed by hand.

[[recursive-counting|Recursive counting]] relates the count $a_n$ to earlier counts by asking about the last step, the last piece, or the largest element. A climb of $n$ stairs ends with a step of $1$, $2$ or $3$, and what comes before is a climb of $n - 1$, $n - 2$ or $n - 3$ stairs, so $a_n = a_{n-1} + a_{n-2} + a_{n-3}$; from $a_0 = 1$, $a_1 = 1$, $a_2 = 2$ the table reaches $a_{10} = 274$. Subsets of $\{1, \ldots, n\}$ with no two consecutive elements either omit $n$ (a valid subset of $n - 1$ elements) or contain $n$ and omit $n - 1$ (a valid subset of $n - 2$), so they follow the Fibonacci recursion.

The key decision is what to remove. Removing the largest element is natural for permutations and towers, since the largest object usually interacts with the others in a simple way: in a valid arrangement of $1, \ldots, n - 1$, the number $n$ can be inserted in a fixed number of places, which makes $a_n$ a fixed multiple of $a_{n-1}$ or a simple sum. Removing the last symbol is natural for strings; removing the first element, or the element in a fixed position, is natural for sets and circular objects. A recursion is correct when every object of size $n$ comes from exactly one smaller object by exactly one step, the same uniqueness that the product rule needs.

When one count is not enough to describe what can come next, use several. Strings with rules about runs, colorings of a ring, and walks on a figure need the count split by the last symbol, the color of the first section, or the current vertex, and each part has its own recursion in terms of the others. These states are the subject of the next two lessons.

Use a recursion whenever the objects grow one piece at a time and the answer is wanted for a moderate size; compute the table carefully and check the first few entries by listing. The next lesson studies the recursions that come from tilings and paths.`,
      related: [
        { card: "linear-recurrence", note: String.raw`solving a recursion in closed form, when the table is too long (A3.1).` },
        { card: "restricted-sequences", note: String.raw`recursions split by the last symbol, for strings with rules (C2.4).` },
        { card: "simulate-the-process", note: String.raw`computing small cases to find or check a recursion (C1.6).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can a staircase of $10$ steps be climbed, taking $1$, $2$ or $3$ steps at a time?`, answer: "274",
          solution: String.raw`With $a_n$ the number of ways for $n$ steps, the last move is $1$, $2$ or $3$ steps, so $a_n = a_{n-1} + a_{n-2} + a_{n-3}$, with $a_0 = 1$, $a_1 = 1$, $a_2 = 2$. Then $a_3, \ldots, a_{10}$ are $4, 7, 13, 24, 44, 81, 149, 274$.` }
      ],
      problems: [
        "2007 AMC 12A, Problem 25",
        "2007 AIME II, Problem 6",
        "2006 AIME I, Problem 11",
        "2015 AIME II, Problem 10",
        "1998 AIME, Problem 13",
        "2016 AIME II, Problem 12"
      ]
    },
    "C5.3": {
      prereq: ["recursive-counting"],
      cards: ["tiling-a-board"],
      body: String.raw`Tiling a strip with tiles of a few shapes is the model for a large family of linear recursions. Dominoes on a $2 \times n$ board, single seats and swapped pairs in a row of people, strings with no long runs, and deliveries that skip at most a few houses all have counts that satisfy a recursion with constant coefficients, found by asking how the left end (or right end) of the board is covered.

To count [[tiling-a-board|tilings of a board]], look at the leftmost column or cell and list the ways it can be covered; each choice leaves a smaller board of the same kind. A $2 \times n$ board covered by dominoes starts with a vertical domino (leaving $2 \times (n - 1)$) or two stacked horizontal dominoes (leaving $2 \times (n - 2)$), so $t_n = t_{n-1} + t_{n-2}$ with $t_1 = 1$, $t_2 = 2$, and $t_8 = 34$. A row of people where each person either stays or swaps with a neighbor is a tiling by squares and dominoes, the same recursion. When tiles come in colors, the coefficients change: a $1 \times n$ strip tiled by squares in $2$ colors and dominoes in $1$ color gives $a_n = 2a_{n-1} + a_{n-2}$, so $1, 2, 5, 12, 29, 70$ for $n = 0, \ldots, 5$.

Boards that can be left in more than one shape need more than one sequence. On a $3 \times n$ board with dominoes, covering the left end can leave a flat edge or a jagged one, so one counts both shapes and writes a recursion for each in terms of the other. The same thing happens for strings: when the rule is "no two consecutive $1$s and no three consecutive $0$s", the states are the length of the final run, and the recursion runs on several sequences at once. Writing the states as a small table of counts by length and updating it one column at a time is reliable and quick.

The solutions of these recursions are combinations of powers of the roots of the characteristic equation, as in the algebra book, but for contest sizes the table is faster. Its value is in the structure: once a count satisfies a linear recursion, its values modulo a number repeat, its growth rate is known, and identities like $t_{m+n} = t_mt_n + t_{m-1}t_{n-1}$ follow from cutting the board in the middle.

Treat any count of linear arrangements with local rules as a tiling, look at one end, and write the recursion, with one sequence per shape the end can take. The next lesson fills grids and game positions with numbers.`,
      related: [
        { card: "linear-recurrence", note: String.raw`the closed form behind a tiling recursion (A3.1).` },
        { card: "non-adjacent-selection", note: String.raw`no two adjacent chosen objects, a tiling by squares and "domino-like" blocks (C2.4).` },
        { card: "transfer-matrix-method", note: String.raw`the systematic form of several-state recursions (C9.5).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can a $2 \times 8$ board be tiled with $1 \times 2$ dominoes?`, answer: "34",
          solution: String.raw`The left end is a vertical domino or two horizontal ones, so $t_n = t_{n-1} + t_{n-2}$ with $t_1 = 1$, $t_2 = 2$. Then $t_3, \ldots, t_8$ are $3, 5, 8, 13, 21, 34$.` },
        { q: String.raw`A $1 \times 5$ strip is tiled with $1 \times 1$ squares, each red or blue, and $1 \times 2$ dominoes. How many tilings are there?`, answer: "70",
          solution: String.raw`The first tile is a square ($2$ colors, leaving $n - 1$ cells) or a domino (leaving $n - 2$), so $a_n = 2a_{n-1} + a_{n-2}$, with $a_0 = 1$ and $a_1 = 2$. Then $a_2 = 5$, $a_3 = 12$, $a_4 = 29$, $a_5 = 70$.` }
      ],
      problems: [
        "2009 AMC 12B, Problem 21",
        "2008 AIME I, Problem 11",
        "2015 AIME II, Problem 12",
        "2001 AIME I, Problem 14",
        "2001 AIME II, Problem 5"
      ]
    },
    "C5.4": {
      prereq: ["recursive-counting"],
      cards: ["grid-path-fill", "backward-induction"],
      body: String.raw`Two problems that look different are solved by the same table-filling. One counts the paths through a grid or a network with obstacles or unusual moves; the other decides which positions of a game are winning. In both, each position's value is computed from the values of the positions one move away, and filling the table in the right order gives every value, including the one asked for.

[[grid-path-fill|Counting paths by filling the grid]] writes in each point the number of paths that reach it; since every path to a point arrives from one of its predecessors, that number is the sum of the numbers at the predecessors. Blocked points get $0$. For up-and-right paths from $(0, 0)$ to $(4, 4)$ that avoid $(2, 2)$, the filled table gives $34$, which agrees with $\binom84 - \binom42^2 = 70 - 36$. The method works for any directed network: arrows in a hexagonal lattice, a frog that jumps to the next multiple of $3$ or $13$, or moves of one or two units in four directions. It needs only that the moves never return to an earlier point, so that the table can be filled in order.

[[backward-induction|Labeling positions backward]] solves a game in which two players alternate moves and the last to move wins (or loses). A position is a loss for the player to move if every move leads to a winning position for the opponent, and a win if some move leads to a losing one. Starting from the terminal positions, label every position in order. In the game where a player removes $1$, $2$ or $3$ stones and whoever takes the last stone wins, the losing positions are the multiples of $4$: from a multiple of $4$ every move leaves a non-multiple, and from a non-multiple one can move to a multiple. So among $1, \ldots, 50$, the first player loses for $12$ starting sizes. In most games the labels become periodic, and finding the period from the first twenty or so positions is the usual route to an answer for large sizes.

Both tables reward care with the order of filling and with the boundary: the starting point has value $1$ in a path count, and the terminal positions must be labeled according to the exact rule for the last move.

Fill a table whenever each position depends only on positions one move away. The next lesson finds quantities that a process cannot change.`,
      related: [
        { card: "grid-paths", note: String.raw`the closed form for paths without obstacles, as a check on the table (C5.6).` },
        { card: "turn-based-games", note: String.raw`games with chance, where positions get probabilities instead of labels (C7.5).` },
        { card: "strategy-stealing", note: String.raw`proving the first player wins without finding the strategy (C9.5).` }
      ],
      exercises: [
        { q: String.raw`How many up-and-right lattice paths from $(0, 0)$ to $(4, 4)$ avoid the point $(2, 2)$?`, answer: "34",
          solution: String.raw`All paths number $\binom84 = 70$, and those through $(2, 2)$ number $\binom42 \cdot \binom42 = 36$, so $70 - 36 = 34$ avoid it. Filling the grid with $0$ at $(2, 2)$ gives the same $34$ at $(4, 4)$.` },
        { q: String.raw`Two players take turns removing $1$, $2$ or $3$ stones from a pile, and whoever takes the last stone wins. For how many starting sizes from $1$ to $50$ does the second player have a winning strategy?`, answer: "12",
          solution: String.raw`Label positions backward: $0$ stones is a loss for the player to move, $1$, $2$, $3$ are wins (take all), $4$ is a loss (every move leaves $1$ to $3$), and the pattern repeats with period $4$. The second player wins exactly when the pile is a multiple of $4$: $4, 8, \ldots, 48$, which is $12$ sizes.` }
      ],
      problems: [
        "2013 AMC 12B, Problem 18",
        "2012 AMC 12B, Problem 22",
        "2007 AIME I, Problem 6",
        "2018 AIME II, Problem 8",
        "1996 AIME, Problem 9",
        "2024 AIME I, Problem 3"
      ]
    },
    "C5.5": {
      prereq: ["modular-basics"],
      cards: ["invariants-coloring", "monovariant"],
      body: String.raw`A process that changes a configuration step by step often keeps something fixed, or pushes something steadily in one direction. Finding that quantity answers questions that simulation cannot: which points a frog can reach, what number remains after repeatedly combining two numbers on a board, or whether a process must stop. The quantity is usually a sum, a parity, a residue, or a product.

An [[invariants-coloring|invariant]] is a quantity that every move leaves unchanged. If the numbers $1$ to $10$ are on a board and a move replaces two numbers $a$ and $b$ by $a + b - 1$, then the sum of the numbers minus the count of numbers never changes, since the sum drops by $1$ and the count drops by $1$. It starts at $55 - 10 = 45$, so when one number $x$ remains, $x - 1 = 45$ and $x = 46$, whatever order the moves are made in. Invariants also rule things out: a frog whose jumps change $x + y$ by multiples of $3$ can only reach points with $3 \mid x + y$, and a knight on a chessboard alternates colors, so after an odd number of moves it is on the other color. To show the reachable set is exactly the set the invariant allows, construct moves that reach each allowed point.

A [[monovariant|monovariant]] is a quantity that every move changes in the same direction. If it is a positive integer that strictly decreases, the process must stop; if it is bounded and increases, the process cannot cycle. Typical monovariants are the number of inversions in a sequence, the sum of squares, or a weighted sum of positions. For counting problems their main use is to bound how many moves are possible, or to show that the final state is unique.

Choosing the quantity is the creative step. Look at what a single move does to the simplest candidates: the sum, the sum of squares, the product, the parity of each coordinate, the residue modulo the step sizes, the number of pieces of each color. A recurrence such as $a_{k+1} = a_{k-1} - \tfrac{3}{a_k}$ hides the invariant $a_ka_{k+1} + 3k$, found by multiplying through by $a_k$.

When a process is long or arbitrary, look for what it cannot change. The last lesson of the chapter returns to lattice paths and their direct formulas.`,
      related: [
        { card: "coloring-arguments", note: String.raw`colorings of a board as invariants, for tilings that cannot exist (C8.4).` },
        { card: "modular-basics", note: String.raw`residues as the most common invariant (N2.1).` },
        { card: "telescoping", note: String.raw`a quantity that changes by the same amount each step sums to a telescope (A3.2).` }
      ],
      exercises: [
        { q: String.raw`The numbers $1, 2, \ldots, 10$ are written on a board. A move erases two numbers $a$ and $b$ and writes $a + b - 1$. After nine moves one number remains. What is it?`, answer: "46",
          solution: String.raw`Each move lowers the sum by $1$ and the number of numbers by $1$, so the sum minus the count is invariant. It starts at $55 - 10 = 45$, and at the end it is $x - 1$, so $x = 46$.` }
      ],
      problems: [
        "2016 AMC 12A, Problem 10",
        "2006 AMC 12B, Problem 18",
        "2012 AIME I, Problem 11",
        "2005 AIME II, Problem 11",
        "2026 AIME II, Problem 14"
      ]
    },
    "C5.6": {
      prereq: ["permutations-combinations"],
      cards: ["grid-paths"],
      body: String.raw`Lattice paths are the most common setting for counting in geometric form: shortest routes through a city grid, paths that pass a point or avoid a square, paths with a given number of turns, and walks on a torus. The basic formula is a binomial coefficient, and the variations are handled by splitting at a point, subtracting, or counting the runs.

The number of [[grid-paths|lattice paths]] from $(0, 0)$ to $(m, n)$ with unit steps right and up is $\binom{m + n}{m}$, because a path is a word with $m$ letters $R$ and $n$ letters $U$. A path through a given point is a path to the point followed by a path from it, so the count multiplies: from $(0, 0)$ to $(6, 4)$ through $(3, 2)$ there are $\binom52 \cdot \binom52 = 100$. Paths that avoid a point or a region are counted by subtraction, or by filling the grid when the forbidden set is irregular. Paths that must cross a line, such as $x + y = 0$, cross it at exactly one lattice point, so the count is a sum over the crossing point of products.

Turns are counted through runs. A path from $(0, 0)$ to $(8, 8)$ with exactly four turns has five runs, alternating between right and up; if it starts with a right step, the $8$ right steps are split into three positive runs and the $8$ up steps into two, and each split is a stars-and-bars count. Paths with a fixed number of turns are therefore products of binomial coefficients, doubled for the two starting directions.

Lattice paths also encode other objects. A sequence of makes and misses in basketball is a path where a make is a step up; the condition that the ratio of makes never exceeds a bound is a line the path must stay below. A configuration determined by a staircase boundary, such as a set of cells closed under moving up and left, is a lattice path along the boundary. A walk on a clock with two hands is a path on a torus, where wrapping around replaces a boundary.

Count paths with the binomial coefficient, split at the points they must pass, subtract those through forbidden points, and count turns through runs. The next lesson gives the states probabilities, to find who is likely to win a game of chance.`,
      related: [
        { card: "reflection-principle", note: String.raw`paths that must stay on one side of a line (C4.2).` },
        { card: "grid-path-fill", note: String.raw`counting paths with irregular obstacles by filling the grid (C5.4).` },
        { card: "stars-and-bars", note: String.raw`splitting the steps of each direction into runs (C2.5).` }
      ],
      exercises: [
        { q: String.raw`How many up-and-right lattice paths from $(0, 0)$ to $(6, 4)$ pass through $(3, 2)$?`, answer: "100",
          solution: String.raw`A path through $(3, 2)$ is a path from $(0, 0)$ to $(3, 2)$, $\binom52 = 10$ of them, followed by a path from $(3, 2)$ to $(6, 4)$, another $\binom52 = 10$. The count is $10 \cdot 10 = 100$.` }
      ],
      problems: [
        "2010 AMC 12A, Problem 18",
        "2011 AMC 12B, Problem 23",
        "2002 AIME II, Problem 12",
        "1992 AIME, Problem 12",
        "2024 AIME I, Problem 6",
        "2023 AIME I, Problem 14"
      ]
    },
    "C5.7": {
      prereq: ["basic-probability", "independent-events", "backward-induction"],
      cards: ["states-recursion-prob"],
      body: String.raw`Many games of chance are decided by a process that moves from one position to the next at random: a match that goes to deuce, two players taking turns until someone hits, a token walking along a board until it reaches an end. Who is more likely to win, and by how much, is answered by the method of the previous lessons with probabilities in place of counts.

A process like this is a Markov chain: it moves among a set of states, and the chance of each next state depends only on the current state, not on how the process got there. To find the chance of winning, use [[states-recursion-prob|first-step analysis]]. Give each state $s$ an unknown $p_s$, the probability of winning from $s$. The winning states have $p = 1$ and the losing states $p = 0$. For every other state, condition on the first step: $p_s = \sum_t P(s \to t)\,p_t$. That is one linear equation per state, and solving the system gives the answer.

In a match where a player must lead by two games and wins each game with probability $\tfrac23$, the states are the lead: $-1$, $0$, $+1$, with $+2$ winning and $-2$ losing. Then $p_{+1} = \tfrac23 + \tfrac13p_0$, $p_{-1} = \tfrac23p_0$, and $p_0 = \tfrac23p_{+1} + \tfrac13p_{-1}$. Substituting gives $p_0 = \tfrac49 + \tfrac49p_0$, so $p_0 = \tfrac45$: the stronger player's edge of $2$ to $1$ per game becomes $4$ to $1$ for the match. When two players take turns and the first to hit wins, one state is enough. If $A$ shoots first and hits with probability $\tfrac12$, and $B$ hits with probability $\tfrac13$, then after two misses the game is back where it started, so $p = \tfrac12 + \tfrac12 \cdot \tfrac23\,p$ and $p = \tfrac34$.

Everything depends on defining the states clearly. A state must record everything that decides what can happen next, and nothing else: the lead rather than the full score, the last flip rather than the whole sequence. The winning state must be named exactly, since the question asks for the chance of reaching it before some other state. Flip a coin until $HH$ or $TH$ appears. With the last flip as the state, $TH$ wins from every state except the start: once a $T$ appears, the next $H$ makes $TH$ before $HH$ can occur. So $HH$ comes first only when the first two flips are $HH$, with probability $\tfrac14$, although each pattern is equally likely on any two given flips.

Name the states, mark the winning and losing ones, write one equation per state from its first step, and solve. The Summary that follows gathers the chapter's ideas.`,
      related: [
        { card: "turn-based-games", note: String.raw`the one-state equation for alternating turns, in closed form (C7.5).` },
        { card: "gamblers-ruin", note: String.raw`the chain of states $0, 1, \ldots, N$ solved for every $N$ (C7.5).` },
        { card: "total-expectation", note: String.raw`the same first-step equations for expected numbers of steps (C7.4).` }
      ],
      exercises: [
        { q: String.raw`Two players play games until one of them leads by two. Player $A$ wins each game with probability $\tfrac35$. What is the probability that $A$ wins the match?`, answer: "9/13",
          solution: String.raw`Let $p_k$ be the probability that $A$ wins when $A$ leads by $k$, with $p_2 = 1$ and $p_{-2} = 0$. Then $p_1 = \tfrac35 + \tfrac25p_0$, $p_{-1} = \tfrac35p_0$, and $p_0 = \tfrac35p_1 + \tfrac25p_{-1} = \tfrac{9}{25} + \tfrac{6}{25}p_0 + \tfrac{6}{25}p_0$. So $\tfrac{13}{25}p_0 = \tfrac{9}{25}$ and $p_0 = \tfrac{9}{13}$.` },
        { q: String.raw`$A$ and $B$ take turns rolling a die, $A$ first, and the first to roll a $6$ wins. What is the probability that $A$ wins?`, answer: "6/11",
          solution: String.raw`Let $p$ be the probability that $A$ wins at the start. $A$ wins at once with probability $\tfrac16$; otherwise, if $B$ also misses, with probability $\tfrac56 \cdot \tfrac56$, the game is back at the start. So $p = \tfrac16 + \tfrac{25}{36}p$, which gives $\tfrac{11}{36}p = \tfrac16$ and $p = \tfrac{6}{11}$.` },
        { q: String.raw`A token starts on square $1$ of a board with squares $0$ to $4$. Each turn it moves right with probability $\tfrac23$ and left with probability $\tfrac13$. What is the probability that it reaches square $4$ before square $0$?`, answer: "8/15",
          solution: String.raw`Let $p_k$ be the probability of reaching $4$ first from square $k$, with $p_0 = 0$ and $p_4 = 1$. Then $p_1 = \tfrac23p_2$, $p_2 = \tfrac23p_3 + \tfrac13p_1$, and $p_3 = \tfrac23 + \tfrac13p_2$. Substituting the first and third into the second gives $p_2 = \tfrac49 + \tfrac29p_2 + \tfrac29p_2$, so $p_2 = \tfrac45$, and $p_1 = \tfrac23 \cdot \tfrac45 = \tfrac{8}{15}$.` }
      ],
      problems: [
        "2014 AMC 10B, Problem 25",
        "2021 Spring AMC 10A, Problem 23",
        "2019 AMC 10B, Problem 22",
        "2018 AIME II, Problem 13"
      ]
    },
    "C5.8": {
      prereq: ["recursive-counting", "tiling-a-board", "grid-path-fill", "backward-induction", "invariants-coloring", "monovariant", "grid-paths", "states-recursion-prob"],
      cards: [],
      body: String.raw`A [[recursive-counting|recursion]] counts the objects of size $n$ through the objects of smaller size, by asking about the last step, the last piece, or the largest element. It is correct when every object comes from exactly one smaller object in exactly one way, and a few starting values, checked by listing, fix the table.

When one count does not say how an object can continue, the objects are split into states, and each state gets its own sequence. [[tiling-a-board|Tilings of a board]] are the model: covering one end leaves a smaller board, and every shape the end can take is a state.

[[grid-path-fill|Filling a grid]] writes at each point the number of paths that reach it, the sum of the numbers at the points one move before it, with $0$ at blocked points. [[backward-induction|Labeling a game backward]] marks a position as losing when every move leads to a winning position, and winning when some move leads to a losing one.

An [[invariants-coloring|invariant]] is a quantity that no step changes, and it rules out the outcomes it does not allow. A [[monovariant|monovariant]] moves in one direction at every step, so it shows that a process stops or cannot cycle. [[grid-paths|Lattice paths]] from $(0, 0)$ to $(m, n)$ number $\binom{m + n}{m}$; paths through a point multiply, and paths that avoid a point are counted by subtraction.

A game decided by chance is a Markov chain: it moves among states, each next state depending only on the current one. [[states-recursion-prob|First-step analysis]] gives each state its probability of winning, $1$ at the winning states and $0$ at the losing ones, and one equation per state, $p_s = \sum_t P(s \to t)\,p_t$.`,
      strategies: [
        String.raw`To find a recursion, ask what the last step, the last piece, or the largest element can be. Each answer leaves a smaller object of the same kind.`,
        String.raw`If one count does not tell you how an object can continue, split it by state: the last symbol, the shape of the end, or the current position.`,
        String.raw`Compute the first few values by listing, and check them against the recursion before trusting a long table.`,
        String.raw`For contest sizes, a table filled by hand is usually faster than a closed form.`,
        String.raw`When positions depend only on positions one move away, fill a table in an order where every value needed is already known.`,
        String.raw`In a game, label positions from the end backward, and look for a period in the labels.`,
        String.raw`When a process is long or arbitrary, look at what one step does to the sum, the parity, a residue, or the product.`,
        String.raw`Count lattice paths with a binomial coefficient, split them at a point they must pass, and subtract the paths through a forbidden point.`,
        String.raw`Define your states clearly before writing any equation. Each state must hold everything that decides what can happen next, and the winning state you are seeking must be named exactly, together with the states that end the game another way.`,
        String.raw`For a chance of winning, give each state an unknown, set the winning states to $1$ and the losing ones to $0$, and write one equation per state from its first step.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`In how many ways can a $2 \times 6$ board be covered by $1 \times 2$ dominoes?`, answer: "13",
        solution: String.raw`The left end is covered by one vertical domino, leaving a $2 \times 5$ board, or by two horizontal dominoes stacked, leaving a $2 \times 4$ board. So $t_n = t_{n-1} + t_{n-2}$, with $t_1 = 1$ and $t_2 = 2$, and the values are $1, 2, 3, 5, 8, 13$.` },
      { q: String.raw`How many paths from $(0, 0)$ to $(4, 3)$, in unit steps right or up, avoid the point $(2, 1)$?`, answer: "17",
        solution: String.raw`There are $\binom{7}{3} = 35$ paths in all. A path through $(2, 1)$ is a path to $(2, 1)$, of which there are $\binom{3}{1} = 3$, followed by a path from $(2, 1)$ to $(4, 3)$, of which there are $\binom{4}{2} = 6$, so $18$ paths pass through it and $35 - 18 = 17$ avoid it. Filling the grid with $0$ at $(2, 1)$ gives $17$ as well.` },
      { q: String.raw`A frog starts at $(0, 0)$ and each jump moves it by $(2, 1)$, $(1, 2)$, $(-1, -2)$ or $(-2, -1)$. Can it reach $(4, 4)$?`,
        solution: String.raw`Every jump changes $x + y$ by $3$ or by $-3$, so $x + y$ stays a multiple of $3$. At $(4, 4)$ it would be $8$, which is not a multiple of $3$, so the frog can never get there.` },
      { q: String.raw`Two players take turns removing $1$, $3$ or $4$ stones from a pile, and the player who takes the last stone wins. For how many starting sizes from $1$ to $20$ does the first player lose with best play?`, answer: "5",
        solution: String.raw`A pile of $0$ is a loss for the player to move. A position is a loss when every move leads to a win, and a win when some move leads to a loss. Labeling $0, 1, 2, \ldots$ in order gives L, W, L, W, W, W, W, L, W, L, and from there the labels repeat with period $7$: the losing sizes are those leaving remainder $0$ or $2$ on division by $7$. From $1$ to $20$ they are $2, 7, 9, 14, 16$, so there are $5$.` },
      { q: String.raw`How many strings of $7$ letters, each $A$, $B$ or $C$, have no two $A$s next to each other?`, answer: "1224",
        solution: String.raw`Use two states: $a_n$ strings of length $n$ that end in $A$, and $b_n$ that end in $B$ or $C$. An $A$ can follow only a string ending in $B$ or $C$, so $a_n = b_{n-1}$; a $B$ or $C$ can follow anything, so $b_n = 2(a_{n-1} + b_{n-1})$. From $a_1 = 1$, $b_1 = 2$ the totals $a_n + b_n$ for $n = 1, \ldots, 7$ are $3, 8, 22, 60, 164, 448, 1224$.` }
    ],
    problems: [
      "2000 AMC 10, Problem 17"
    ]
  },
  challenge: {
    problems: [
      "2024 AMC 10B, Problem 16",
      "2012 AMC 10B, Problem 25",
      "2004 AIME I, Problem 15",
      "2004 AIME II, Problem 15",
      "2014 AIME II, Problem 15",
      "2018 AIME I, Problem 14",
      "2021 AIME II, Problem 15"
    ]
  }
};
