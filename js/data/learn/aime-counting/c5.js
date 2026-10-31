// Learn, AIME Counting & Probability, chapter C5: recursion, states and processes (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C5"] = {
  lessons: {
    "C5.1": {
      prereq: ["constructive-counting", "linear-recurrence"],
      cards: ["recursive-counting"],
      body: String.raw`When the objects of size $n$ can be built from objects of smaller size in a controlled way, the count for $n$ is determined by the counts for smaller sizes, and a short table finishes the problem. How many ways can you climb ten stairs taking one, two or three at a time? How many towers can be built from cubes of edge $1$ to $8$ under a stacking rule? How many permutations are "quasi-increasing"? None has an obvious closed form, and all yield to a recursion computed by hand.

[[recursive-counting|Recursive counting]] relates the count $a_n$ to earlier counts by asking about the last step, the last piece, or the largest element. A climb of $n$ stairs ends with a step of $1$, $2$ or $3$, and what comes before is a climb of $n - 1$, $n - 2$ or $n - 3$ stairs, so $a_n = a_{n-1} + a_{n-2} + a_{n-3}$; from $a_0 = 1$, $a_1 = 1$, $a_2 = 2$ the table reaches $a_{10} = 274$. Subsets of $\{1, \ldots, n\}$ with no two consecutive elements either omit $n$ (a valid subset of $n - 1$ elements) or contain $n$ and omit $n - 1$ (a valid subset of $n - 2$), so they follow the Fibonacci recursion.

The key decision is what to remove. Removing the largest element is natural for permutations and towers, since the largest object usually interacts with the others in a simple way: in a valid arrangement of $1, \ldots, n - 1$, the number $n$ can be inserted in a fixed number of places, which makes $a_n$ a fixed multiple of $a_{n-1}$ or a simple sum. Removing the last symbol is natural for strings; removing the first element, or the element in a fixed position, is natural for sets and circular objects. A recursion is correct when every object of size $n$ comes from exactly one smaller object by exactly one step, the same uniqueness that the product rule needs.

When one count is not enough to describe what can come next, use several. Strings with rules about runs, colorings of a ring, and walks on a figure need the count split by the last symbol, the color of the first section, or the current vertex, and each part has its own recursion in terms of the others. These states are the subject of the next two lessons.

Use a recursion whenever the objects grow one piece at a time and the answer is wanted for a moderate size; compute the table carefully and check the first few entries by listing. The next lesson studies the recursions that come from tilings and paths.`,
      related: [
        { card: "linear-recurrence", note: String.raw`solving a recursion in closed form, when the table is too long (A3.1).` },
        { card: "restricted-sequences", note: String.raw`recursions split by the last symbol, for strings with rules (C2.3).` },
        { card: "simulate-the-process", note: String.raw`computing small cases to find or check a recursion (C1.5).` }
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
    "C5.2": {
      prereq: ["recursive-counting"],
      cards: ["tiling-a-board"],
      body: String.raw`Tiling a strip with tiles of a few shapes is the model for a large family of linear recursions. Dominoes on a $2 \times n$ board, single seats and swapped pairs in a row of people, strings with no long runs, and deliveries that skip at most a few houses all have counts that satisfy a recursion with constant coefficients, found by asking how the left end (or right end) of the board is covered.

To count [[tiling-a-board|tilings of a board]], look at the leftmost column or cell and list the ways it can be covered; each choice leaves a smaller board of the same kind. A $2 \times n$ board covered by dominoes starts with a vertical domino (leaving $2 \times (n - 1)$) or two stacked horizontal dominoes (leaving $2 \times (n - 2)$), so $t_n = t_{n-1} + t_{n-2}$ with $t_1 = 1$, $t_2 = 2$, and $t_8 = 34$. A row of people where each person either stays or swaps with a neighbor is a tiling by squares and dominoes, the same recursion. When tiles come in colors, the coefficients change: a $1 \times n$ strip tiled by squares in $2$ colors and dominoes in $1$ color gives $a_n = 2a_{n-1} + a_{n-2}$, so $1, 2, 5, 12, 29, 70$ for $n = 0, \ldots, 5$.

Boards that can be left in more than one shape need more than one sequence. On a $3 \times n$ board with dominoes, covering the left end can leave a flat edge or a jagged one, so one counts both shapes and writes a recursion for each in terms of the other. The same thing happens for strings: when the rule is "no two consecutive $1$s and no three consecutive $0$s", the states are the length of the final run, and the recursion runs on several sequences at once. Writing the states as a small table of counts by length and updating it one column at a time is reliable and quick.

The solutions of these recursions are combinations of powers of the roots of the characteristic equation, as in the algebra book, but for contest sizes the table is faster. Its value is in the structure: once a count satisfies a linear recursion, its values modulo a number repeat, its growth rate is known, and identities like $t_{m+n} = t_mt_n + t_{m-1}t_{n-1}$ follow from cutting the board in the middle.

Treat any count of linear arrangements with local rules as a tiling, look at one end, and write the recursion, with one sequence per shape the end can take. The next lesson fills grids and game positions with numbers.`,
      related: [
        { card: "linear-recurrence", note: String.raw`the closed form behind a tiling recursion (A3.1).` },
        { card: "non-adjacent-selection", note: String.raw`no two adjacent chosen objects, a tiling by squares and "domino-like" blocks (C2.3).` },
        { card: "transfer-matrix-method", note: String.raw`the systematic form of several-state recursions (C9.4).` }
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
    "C5.3": {
      prereq: ["recursive-counting"],
      cards: ["grid-path-fill", "backward-induction"],
      body: String.raw`Two problems that look different are solved by the same table-filling. One counts the paths through a grid or a network with obstacles or unusual moves; the other decides which positions of a game are winning. In both, each position's value is computed from the values of the positions one move away, and filling the table in the right order gives every value, including the one asked for.

[[grid-path-fill|Counting paths by filling the grid]] writes in each point the number of paths that reach it; since every path to a point arrives from one of its predecessors, that number is the sum of the numbers at the predecessors. Blocked points get $0$. For up-and-right paths from $(0, 0)$ to $(4, 4)$ that avoid $(2, 2)$, the filled table gives $34$, which agrees with $\binom84 - \binom42^2 = 70 - 36$. The method works for any directed network: arrows in a hexagonal lattice, a frog that jumps to the next multiple of $3$ or $13$, or moves of one or two units in four directions. It needs only that the moves never return to an earlier point, so that the table can be filled in order.

[[backward-induction|Labeling positions backward]] solves a game in which two players alternate moves and the last to move wins (or loses). A position is a loss for the player to move if every move leads to a winning position for the opponent, and a win if some move leads to a losing one. Starting from the terminal positions, label every position in order. In the game where a player removes $1$, $2$ or $3$ stones and whoever takes the last stone wins, the losing positions are the multiples of $4$: from a multiple of $4$ every move leaves a non-multiple, and from a non-multiple one can move to a multiple. So among $1, \ldots, 50$, the first player loses for $12$ starting sizes. In most games the labels become periodic, and finding the period from the first twenty or so positions is the usual route to an answer for large sizes.

Both tables reward care with the order of filling and with the boundary: the starting point has value $1$ in a path count, and the terminal positions must be labeled according to the exact rule for the last move.

Fill a table whenever each position depends only on positions one move away. The next lesson finds quantities that a process cannot change.`,
      related: [
        { card: "grid-paths", note: String.raw`the closed form for paths without obstacles, as a check on the table (C5.5).` },
        { card: "turn-based-games", note: String.raw`games with chance, where positions get probabilities instead of labels (C7.4).` },
        { card: "strategy-stealing", note: String.raw`proving the first player wins without finding the strategy (C9.4).` }
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
    "C5.4": {
      prereq: ["modular-basics"],
      cards: ["invariants-coloring", "monovariant"],
      body: String.raw`A process that changes a configuration step by step often keeps something fixed, or pushes something steadily in one direction. Finding that quantity answers questions that simulation cannot: which points a frog can reach, what number remains after repeatedly combining two numbers on a board, or whether a process must stop. The quantity is usually a sum, a parity, a residue, or a product.

An [[invariants-coloring|invariant]] is a quantity that every move leaves unchanged. If the numbers $1$ to $10$ are on a board and a move replaces two numbers $a$ and $b$ by $a + b - 1$, then the sum of the numbers minus the count of numbers never changes, since the sum drops by $1$ and the count drops by $1$. It starts at $55 - 10 = 45$, so when one number $x$ remains, $x - 1 = 45$ and $x = 46$, whatever order the moves are made in. Invariants also rule things out: a frog whose jumps change $x + y$ by multiples of $3$ can only reach points with $3 \mid x + y$, and a knight on a chessboard alternates colors, so after an odd number of moves it is on the other color. To show the reachable set is exactly the set the invariant allows, construct moves that reach each allowed point.

A [[monovariant|monovariant]] is a quantity that every move changes in the same direction. If it is a positive integer that strictly decreases, the process must stop; if it is bounded and increases, the process cannot cycle. Typical monovariants are the number of inversions in a sequence, the sum of squares, or a weighted sum of positions. For counting problems their main use is to bound how many moves are possible, or to show that the final state is unique.

Choosing the quantity is the creative step. Look at what a single move does to the simplest candidates: the sum, the sum of squares, the product, the parity of each coordinate, the residue modulo the step sizes, the number of pieces of each color. A recurrence such as $a_{k+1} = a_{k-1} - \tfrac{3}{a_k}$ hides the invariant $a_ka_{k+1} + 3k$, found by multiplying through by $a_k$.

When a process is long or arbitrary, look for what it cannot change. The last lesson of the chapter returns to lattice paths and their direct formulas.`,
      related: [
        { card: "coloring-arguments", note: String.raw`colorings of a board as invariants, for tilings that cannot exist (C8.3).` },
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
    "C5.5": {
      prereq: ["permutations-combinations"],
      cards: ["grid-paths"],
      body: String.raw`Lattice paths are the most common setting for counting in geometric form: shortest routes through a city grid, paths that pass a point or avoid a square, paths with a given number of turns, and walks on a torus. The basic formula is a binomial coefficient, and the variations are handled by splitting at a point, subtracting, or counting the runs.

The number of [[grid-paths|lattice paths]] from $(0, 0)$ to $(m, n)$ with unit steps right and up is $\binom{m + n}{m}$, because a path is a word with $m$ letters $R$ and $n$ letters $U$. A path through a given point is a path to the point followed by a path from it, so the count multiplies: from $(0, 0)$ to $(6, 4)$ through $(3, 2)$ there are $\binom52 \cdot \binom52 = 100$. Paths that avoid a point or a region are counted by subtraction, or by filling the grid when the forbidden set is irregular. Paths that must cross a line, such as $x + y = 0$, cross it at exactly one lattice point, so the count is a sum over the crossing point of products.

Turns are counted through runs. A path from $(0, 0)$ to $(8, 8)$ with exactly four turns has five runs, alternating between right and up; if it starts with a right step, the $8$ right steps are split into three positive runs and the $8$ up steps into two, and each split is a stars-and-bars count. Paths with a fixed number of turns are therefore products of binomial coefficients, doubled for the two starting directions.

Lattice paths also encode other objects. A sequence of makes and misses in basketball is a path where a make is a step up; the condition that the ratio of makes never exceeds a bound is a line the path must stay below. A configuration determined by a staircase boundary, such as a set of cells closed under moving up and left, is a lattice path along the boundary. A walk on a clock with two hands is a path on a torus, where wrapping around replaces a boundary.

Count paths with the binomial coefficient, split at the points they must pass, subtract those through forbidden points, and count turns through runs. The chapter review mixes recursions, states, invariants and paths.`,
      related: [
        { card: "reflection-principle", note: String.raw`paths that must stay on one side of a line (C4.1).` },
        { card: "grid-path-fill", note: String.raw`counting paths with irregular obstacles by filling the grid (C5.3).` },
        { card: "stars-and-bars", note: String.raw`splitting the steps of each direction into runs (C2.4).` }
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
    }
  },
  review: [
    "2014 AIME II, Problem 15",
    "2018 AIME I, Problem 14",
    "2021 AIME II, Problem 15"
  ]
};
