// Learn, AMC Counting & Probability, chapter R5: recursion, paths and processes (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R5"] = {
  lessons: {
    "R5.1": {
      prereq: ["constructive-counting", "permutations-combinations"],
      cards: [],
      body: String.raw`Some counts are too large to list but easy to build. The ways to climb a staircase depend on the ways to climb a shorter one; the paths across a grid are strings of moves; and a process that runs forward to a known end can be run backward to its start. This chapter takes these ideas in turn.

A staircase of $5$ steps, climbed $1$ or $2$ steps at a time, is climbed by a last move of $1$ step from step $4$ or of $2$ steps from step $3$. So if $a_n$ is the number of ways to reach step $n$, then $a_n = a_{n-1} + a_{n-2}$, and from $a_0 = 1$ and $a_1 = 1$ the table runs $1, 1, 2, 3, 5, 8$: there are $a_5 = 8$ ways.

A shortest path along the grid lines from $(0, 0)$ to $(3, 2)$ takes $3$ steps right and $2$ steps up in some order, so it is a string of $3$ R's and $2$ U's, and there are $\binom52 = 10$ of them. And if a number is doubled and then increased by $3$ to give $17$, undoing the steps from the last one gives $17 - 3 = 14$ and $14 \div 2 = 7$.

The lessons take these ideas in turn: recursion and tilings (R5.2), paths in a grid (R5.3), working backward and simulating (R5.4), and the reflection principle (R5.5). The Summary (R5.6) collects the strategies.`,
      exercises: [
        { q: String.raw`In how many ways can a staircase of $5$ steps be climbed, taking $1$ or $2$ steps at a time?`, answer: "8",
          solution: String.raw`Let $a_n$ be the number of ways to reach step $n$. The last move comes from step $n - 1$ or step $n - 2$, so $a_n = a_{n-1} + a_{n-2}$. With $a_0 = a_1 = 1$: $a_2 = 2$, $a_3 = 3$, $a_4 = 5$, $a_5 = 8$.` },
        { q: String.raw`How many shortest paths along the grid lines go from $(0, 0)$ to $(3, 2)$?`, answer: "10",
          solution: String.raw`A shortest path is $3$ steps right and $2$ up in some order, a string of $3$ R's and $2$ U's. Choosing the places of the U's gives $\binom52 = 10$.` },
        { q: String.raw`A number is doubled and then increased by $3$, and the result is $17$. What was the number?`, answer: "7",
          solution: String.raw`Undo the steps from the last: subtract $3$ to get $14$, then halve to get $7$. Check: $2 \cdot 7 + 3 = 17$.` }
      ],
      problems: [
        "2009 AMC 8, Problem 1",
        "2014 AMC 8, Problem 11",
        "2010 AMC 8, Problem 25"
      ]
    },
    "R5.2": {
      prereq: ["constructive-counting", "casework-method"],
      cards: ["recursive-counting", "tiling-a-board"],
      body: String.raw`How many ways are there to cover a $2 \times 8$ board with $1 \times 2$ dominoes? How many strings of $8$ zeros and ones have no two $1$'s side by side? Neither count has a formula to quote, but each is tied to the same count for shorter lengths.

[[recursive-counting|Recursive counting]] names the count for size $n$, say $a_n$, and splits the objects of size $n$ by how they end. Removing the last piece leaves an object of the same kind, only smaller, so $a_n$ is a sum of earlier terms, and a short table, started from the smallest sizes by hand, reaches the size asked for. For the strings with no two adjacent $1$'s, a string of length $n$ ends in $0$, after any good string of length $n - 1$, or in $1$, which must follow a $0$, after any good string of length $n - 2$. So $a_n = a_{n-1} + a_{n-2}$, and from $a_1 = 2$ and $a_2 = 3$ the table runs $2, 3, 5, 8, 13, 21, 34, 55$: there are $55$ strings of length $8$.

The split must be into cases that do not overlap and miss nothing, and the last piece must be one the rule allows anywhere. A string over $\{A, B, C\}$ with no two adjacent $A$'s either ends in $B$ or $C$ after any good string ($2a_{n-1}$ ways), or ends in $A$, and then the letter before it is $B$ or $C$ ($2a_{n-2}$ ways), so $a_n = 2a_{n-1} + 2a_{n-2}$. When the condition reaches further back, as in a string with no three equal letters in a row, the count is split by the length of the last run instead.

[[tiling-a-board|Tiling a board]] is the same idea in a picture. A $2 \times n$ board of dominoes ends in one vertical domino, after a tiling of $2 \times (n - 1)$, or in two horizontal dominoes stacked together, after a tiling of $2 \times (n - 2)$; a single horizontal domino at the end would leave a cell no domino can fill. So $t_n = t_{n-1} + t_{n-2}$ with $t_1 = 1$ and $t_2 = 2$, and $t_8 = 34$. A $1 \times 7$ strip of $1 \times 1$ and $1 \times 3$ tiles gives $b_n = b_{n-1} + b_{n-3}$, and from $b_0 = b_1 = b_2 = 1$ the table reaches $b_7 = 9$. When the question is whether a board can be tiled at all, counting does not help: a coloring shows that the tiles cannot match the board. Every domino covers one black and one white square of a chessboard, and removing two opposite corners removes two squares of one color, so the $62$ squares left cannot be covered.

Reach for a recursion when the count for size $n$ depends on the size only through how the object ends, make the cases by the last piece, and start the table by hand. The next lesson counts paths, where a recursion becomes a grid of numbers.`,
      related: [
        { card: "restricted-sequences", note: String.raw`strings with forbidden patterns, counted by the same split by the last letter.` },
        { card: "coloring-arguments", note: String.raw`the coloring that shows a board cannot be tiled (R7.5).` },
        { card: "states-recursion-prob", note: String.raw`a recursion on states for probabilities (R9.3).` }
      ],
      exercises: [
        { q: String.raw`How many strings of $8$ digits, each $0$ or $1$, have no two $1$'s next to each other?`, answer: "55",
          solution: String.raw`Let $a_n$ count the good strings of length $n$. A good string ends in $0$ after any good string of length $n - 1$, or in $01$ after any good string of length $n - 2$. So $a_n = a_{n-1} + a_{n-2}$, with $a_1 = 2$ (the strings $0$ and $1$) and $a_2 = 3$ ($00$, $01$, $10$). The table is $2, 3, 5, 8, 13, 21, 34, 55$, so $a_8 = 55$.` },
        { q: String.raw`In how many ways can a $2 \times 8$ board be covered by $1 \times 2$ dominoes?`, answer: "34",
          solution: String.raw`Let $t_n$ count the tilings of $2 \times n$. The right end is one vertical domino, leaving $2 \times (n - 1)$, or two horizontal dominoes, one above the other, leaving $2 \times (n - 2)$; one horizontal domino alone would leave a single cell in the last column. So $t_n = t_{n-1} + t_{n-2}$ with $t_1 = 1$, $t_2 = 2$: then $3, 5, 8, 13, 21, 34$, and $t_8 = 34$.` },
        { q: String.raw`In how many ways can a $1 \times 7$ strip be covered by $1 \times 1$ and $1 \times 3$ tiles?`, answer: "9",
          solution: String.raw`Let $b_n$ count the coverings of $1 \times n$. The last tile is a $1 \times 1$, leaving $1 \times (n - 1)$, or a $1 \times 3$, leaving $1 \times (n - 3)$. So $b_n = b_{n-1} + b_{n-3}$, with $b_0 = b_1 = b_2 = 1$. Then $b_3 = 2$, $b_4 = 3$, $b_5 = 4$, $b_6 = 6$, $b_7 = 9$.` },
        { q: String.raw`How many strings of $7$ letters, each $A$, $B$ or $C$, have no two $A$'s next to each other?`, answer: "1224",
          solution: String.raw`Let $a_n$ count the good strings. One ends in $B$ or $C$ after any good string of length $n - 1$ ($2a_{n-1}$), or in $A$ after $B$ or $C$ and a good string of length $n - 2$ ($2a_{n-2}$). With $a_1 = 3$ and $a_2 = 8$: $a_3 = 22$, $a_4 = 60$, $a_5 = 164$, $a_6 = 448$, $a_7 = 1224$.` }
      ],
      problems: [
        "2025 AMC 8, Problem 11",
        "2012 AMC 8, Problem 17",
        "2022 AMC 12A, Problem 3",
        "2009 AMC 12B, Problem 21",
        "2007 AMC 12A, Problem 25"
      ]
    },
    "R5.3": {
      prereq: ["permutations-combinations", "multiset-permutations", "complementary-counting"],
      cards: ["grid-paths", "grid-path-fill"],
      body: String.raw`How many shortest paths along a grid lead from $(0, 0)$ to $(4, 3)$? How many of them pass through $(2, 1)$, and how many avoid it? And what if some streets are closed or the grid is an odd shape?

[[grid-paths|A shortest grid path]] from $(0, 0)$ to $(m, n)$ takes $m$ steps right and $n$ steps up in some order, so it matches a string of $m$ R's and $n$ U's, and there are $\binom{m + n}{m}$ of them: $\binom73 = 35$ from $(0, 0)$ to $(4, 3)$. A path through a required point is a path to the point followed by a path from it, so the counts multiply: through $(2, 1)$ there are $\binom31 \cdot \binom42 = 3 \cdot 6 = 18$ paths. Paths that avoid a point are all paths less those through it, $35 - 18 = 17$. The same matching works in space: a shortest path from $(0, 0, 0)$ to $(2, 2, 2)$ is an arrangement of two each of three letters, $\tfrac{6!}{2!\,2!\,2!} = 90$ paths.

When several points are blocked, or the grid has holes, one-way streets or diagonal moves, the formula and the subtraction become casework, and [[grid-path-fill|filling the grid]] is faster. Every path into a point arrives through exactly one of the points just before it, so the number of paths to a point is the sum of the numbers at those points. Write $1$ at the start, fill the points in an order in which each comes after the points that lead to it, write $0$ at a blocked point, and read the count at the end. Filled for the grid to $(4, 3)$ with $(2, 1)$ blocked, the table ends at $17$, as the subtraction said. Filling the grid is a recursion (R5.2) laid out on the grid itself, and it is the safe choice whenever a picture of the region is given.

Use $\binom{m+n}{m}$ for a plain rectangle, multiply through required points and subtract the paths through forbidden ones, and fill in the grid when the region is irregular. The next lesson runs processes forward and backward.`,
      related: [
        { card: "multiset-permutations", note: String.raw`the count of strings of moves with repeated letters (R3.2).` },
        { card: "catalan-numbers", note: String.raw`paths that stay on one side of the diagonal.` },
        { card: "reflection-principle", note: String.raw`paths that touch a forbidden line, counted by reflecting (R5.5).` }
      ],
      exercises: [
        { q: String.raw`How many shortest paths along the grid lines go from $(0, 0)$ to $(4, 3)$?`, answer: "35",
          solution: String.raw`A path is a string of $4$ R's and $3$ U's, fixed by the places of the U's: $\binom73 = 35$.` },
        { q: String.raw`How many of the shortest paths from $(0, 0)$ to $(4, 3)$ pass through $(2, 1)$?`, answer: "18",
          solution: String.raw`To $(2, 1)$ there are $\binom31 = 3$ paths, and from $(2, 1)$ to $(4, 3)$, two steps right and two up, there are $\binom42 = 6$. Each pair joins into one path: $3 \cdot 6 = 18$.` },
        { q: String.raw`How many of the shortest paths from $(0, 0)$ to $(4, 3)$ avoid the point $(2, 1)$?`, answer: "17",
          solution: String.raw`All $35$ paths less the $18$ through $(2, 1)$: $17$. Filling the grid with $0$ at $(2, 1)$ gives the same: the rows $y = 0$ to $3$ read $1, 1, 1, 1, 1$; then $1, 2, 0, 1, 2$; then $1, 3, 3, 4, 6$; then $1, 4, 7, 11, 17$.` },
        { q: String.raw`How many shortest paths along the edges of a grid of unit cubes go from $(0, 0, 0)$ to $(2, 2, 2)$?`, answer: "90",
          solution: String.raw`A path is a string of two each of the steps $x$, $y$ and $z$, so there are $\tfrac{6!}{2!\,2!\,2!} = \tfrac{720}{8} = 90$.` }
      ],
      problems: [
        "1986 AJHSME, Problem 9",
        "2013 AMC 8, Problem 21",
        "2025 AMC 8, Problem 25",
        "2010 AMC 12A, Problem 18",
        "2011 AMC 12B, Problem 23"
      ]
    },
    "R5.4": {
      prereq: ["casework-method"],
      cards: ["working-backwards", "backward-induction", "simulate-the-process"],
      body: String.raw`A number is halved and then decreased by $1$, three times over, and the result is $2$: what was it? In a game where players take $1$, $2$ or $3$ coins and the one who takes the last coin wins, who wins from $30$ coins? And what is the $2026$th term of a sequence defined by a rule that is easy to run but hard to solve? Each question is about a process, and each is answered by running it, forward or backward.

[[working-backwards|Working backward]] solves a process whose end is known. When every step can be undone, the start is found by undoing the steps from the last one to the first, with no equation to set up: from $2$, undoing "decrease by $1$" gives $3$ and undoing "halve" gives $6$; twice more gives $14$ and then $30$. A step that cannot be undone uniquely, such as taking the larger of two numbers or a step with two possible sources, splits the backward run into branches, and each branch is followed.

[[backward-induction|Labeling positions backward]] does the same for a game. Every position is a win or a loss for the player about to move: a position is a win if some move reaches a loss for the opponent, and a loss if every move reaches a win. A pile of $0$ coins is a loss for the player to move, since the last coin is gone. With moves of $1$, $2$ or $3$ coins, the piles $1$, $2$ and $3$ are wins (take everything), $4$ is a loss (every move leaves $1$, $2$ or $3$), $5$, $6$ and $7$ are wins (move to $4$), and the losses are exactly the multiples of $4$. From $30$ the first player wins by taking $2$, leaving $28$, and then answers each move of $k$ coins with $4 - k$. A short table of labels always comes first; the pattern is read from it and then explained.

[[simulate-the-process|Simulating]] runs a process forward from a known start, step by step, keeping a record. Short processes are just finished by hand. A long one usually repeats, because a process with finitely many states must return to one, and from there the record is a cycle. The sequence with $a_1 = 2$, $a_2 = 3$ and $a_n = \tfrac{a_{n-1}}{a_{n-2}}$ runs $2, 3, \tfrac32, \tfrac12, \tfrac13, \tfrac23, 2, 3, \ldots$, with period $6$; since $2026 = 6 \cdot 337 + 4$, the term $a_{2026}$ equals $a_4 = \tfrac12$.

Work backward when the end of a process is given, label positions from the end of a game, and simulate when the start is given, watching for the first repeat. The next lesson counts paths that must not cross a line.`,
      related: [
        { card: "cycle-hunting", note: String.raw`turning a repeating record into the answer for any step (M4.3).` },
        { card: "strategy-stealing", note: String.raw`games won by a symmetry or by showing a strategy exists, without labeling every position (R8.4).` },
        { card: "invariants-coloring", note: String.raw`a quantity a process cannot change, which settles what it can reach (R7.5).` }
      ],
      exercises: [
        { q: String.raw`A number is halved and the result decreased by $1$. This is done three times in all, and the final result is $2$. What was the number?`, answer: "30",
          solution: String.raw`Undo each step from the last: add $1$, then double. From $2$: $3$, then $6$; $7$, then $14$; $15$, then $30$. Check: $30 \to 14 \to 6 \to 2$.` },
        { q: String.raw`Two players take turns removing $1$, $2$ or $3$ coins from a pile, and the player who takes the last coin wins. For how many starting piles from $1$ to $30$ coins does the second player win?`, answer: "7",
          solution: String.raw`Label piles from $0$ up: $0$ is a loss for the player to move; $1$, $2$, $3$ are wins; $4$ is a loss, since every move leaves $1$, $2$ or $3$; and so on, so the losses are the multiples of $4$. From a multiple of $4$, every move leaves a non-multiple, and from a non-multiple, taking the remainder mod $4$ leaves a multiple. The second player wins from $4, 8, \ldots, 28$: $7$ piles.` },
        { q: String.raw`A sequence has $a_1 = 2$, $a_2 = 3$ and $a_n = \dfrac{a_{n-1}}{a_{n-2}}$ for $n \ge 3$. What is $a_{2026}$?`, answer: "1/2",
          solution: String.raw`Run it: $2, 3, \tfrac32, \tfrac12, \tfrac13, \tfrac23, 2, 3$. Since $a_7 = a_1$ and $a_8 = a_2$, and each term depends only on the two before, the sequence repeats with period $6$. As $2026 = 6 \cdot 337 + 4$, $a_{2026} = a_4 = \tfrac12$.` }
      ],
      problems: [
        "2005 AMC 8, Problem 24",
        "2010 AMC 8, Problem 21",
        "2018 AMC 8, Problem 3",
        "2016 AMC 10A, Problem 8",
        "2017 AMC 10A, Problem 4",
        "2004 AMC 12A, Problem 7",
        "2012 AMC 12B, Problem 14",
        "2013 AMC 12B, Problem 18"
      ]
    },
    "R5.5": {
      prereq: ["grid-paths", "bijection-method"],
      cards: ["reflection-principle"],
      body: String.raw`A coin is tossed $6$ times, and a token starting at $0$ moves up $1$ for heads and down $1$ for tails. In how many of the $64$ sequences does the token reach $3$ at some time? How many grid paths from $(0, 0)$ to $(4, 4)$ never rise above the diagonal? Counting the paths that touch a line seems to need cases by where they touch; a reflection removes the cases.

[[reflection-principle|The reflection principle]] matches the paths that touch a line with paths of a simpler kind. Take a path that reaches the level $3$ and ends below it, and reflect the part after its first visit to $3$: every later up step becomes a down step and every down step an up step. The new path still reaches $3$, and it ends as far above $3$ as the old one ended below. The matching reverses, by reflecting again after the same first visit, so the paths that reach $3$ and end below it are as many as the paths that end above it. In $6$ tosses a path cannot end at $3$, since the end has the parity of $6$; the paths ending above $3$, at $4$ or $6$, number $\binom65 + \binom66 = 7$; so $7 + 7 = 14$ sequences reach $3$.

The same move counts grid paths that cross a diagonal. A path from $(0, 0)$ to $(4, 4)$ that rises above the line $y = x$ touches the line $y = x + 1$; reflecting its part before the first touch across that line moves the start to $(-1, 1)$, and every path from $(-1, 1)$ to $(4, 4)$ crosses the line, so it arises once. Those paths take $5$ steps right and $3$ up, $\binom83 = 56$ of them, and the good paths number $\binom84 - 56 = 70 - 56 = 14$. Read as a vote count, the same argument is the ballot problem: if one candidate gets $6$ votes and the other $3$, the orders of counting in which the winner leads throughout number $\tfrac{6 - 3}{6 + 3}\binom93 = 28$.

Use a reflection when the paths that cross or touch a line are the bad ones: reflect at the first touch, count the reflected paths by their new endpoint, and subtract. The Summary follows.`,
      related: [
        { card: "catalan-numbers", note: String.raw`the paths that never cross the diagonal, $\tfrac{1}{n+1}\binom{2n}{n}$.` },
        { card: "ballot-problem", note: String.raw`the vote count in which the winner leads throughout, $\tfrac{a - b}{a + b}\binom{a+b}{a}$.` },
        { card: "binomial-probability", note: String.raw`the chance of each endpoint when the steps are coin tosses (R6.3).` }
      ],
      exercises: [
        { q: String.raw`A token starts at $0$ and moves $1$ up or $1$ down at each of $6$ steps. Of the $2^6 = 64$ step sequences, how many make the token reach $3$ at some time?`, answer: "14",
          solution: String.raw`A sequence that reaches $3$ ends above $3$, at $3$, or below $3$. None ends at $3$, since the end is even. Those ending above $3$ have $5$ or $6$ up steps: $\binom65 + \binom66 = 7$. Reflecting after the first visit to $3$ matches the sequences that reach $3$ and end below it with those ending above it, so there are $7$ more. In all, $14$.` },
        { q: String.raw`How many shortest grid paths from $(0, 0)$ to $(4, 4)$ never go above the line $y = x$?`, answer: "14",
          solution: String.raw`A bad path touches $y = x + 1$. Reflecting its part up to the first touch across that line gives a path from $(-1, 1)$ to $(4, 4)$, and every such path arises once. Those take $5$ steps right and $3$ up: $\binom83 = 56$. So the good paths number $\binom84 - 56 = 14$.` },
        { q: String.raw`In an election, candidate $P$ gets $6$ votes and candidate $Q$ gets $3$, and the $9$ votes are counted in some order. In how many of the $\binom93 = 84$ orders is $P$ strictly ahead after every vote counted?`, answer: "28",
          solution: String.raw`The first vote must be for $P$. Among the orders that start with a $P$-vote, the bad ones reach a tie; reflecting the part before the first tie swaps the two names there and matches them with the orders that start with a $Q$-vote, of which there are $\binom82 = 28$ (each starting with a $Q$-vote ties at some point, since $P$ ends ahead). The orders starting with $P$ number $\binom83 = 56$, so the good ones are $56 - 28 = 28$, which is $\tfrac{6 - 3}{6 + 3} \cdot 84$.` }
      ],
      problems: [
        "2020 AMC 8, Problem 21",
        "2016 AMC 12A, Problem 19"
      ]
    },
    "R5.6": {
      prereq: ["recursive-counting", "tiling-a-board", "grid-paths", "grid-path-fill", "working-backwards", "backward-induction", "simulate-the-process", "reflection-principle"],
      cards: [],
      body: String.raw`[[recursive-counting|Recursive counting]] splits the objects of size $n$ by how they end, and builds a table from the smallest sizes. [[tiling-a-board|A tiling]] is counted the same way, by the tiles at one end, and is shown impossible by a coloring.

[[grid-paths|Grid paths]] to $(m, n)$ number $\binom{m+n}{m}$; paths through a point multiply and paths avoiding one subtract. [[grid-path-fill|Filling the grid]] handles blocked points and odd shapes by adding.

[[working-backwards|Working backward]] undoes a process from its end, [[backward-induction|labeling positions]] solves a game from its end, and [[simulate-the-process|simulating]] runs a process forward until it repeats. [[reflection-principle|The reflection principle]] counts paths that touch a line by reflecting them at the first touch.`,
      strategies: [
        String.raw`Name the count for size $n$ and split by the last piece; check that the cases do not overlap and miss nothing.`,
        String.raw`Start every recursion table by hand at the smallest sizes.`,
        String.raw`For paths through a point, multiply; for paths avoiding one, subtract; for an irregular grid, fill in the counts.`,
        String.raw`When the end of a process is given, undo the steps from the last.`,
        String.raw`Label the small positions of a game as wins and losses, find the pattern, then explain it.`,
        String.raw`Simulate a process and watch for the first repeated state.`,
        String.raw`Count the paths that touch a forbidden line by reflecting them at the first touch.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`In how many ways can a staircase of $10$ steps be climbed, taking $1$ or $2$ steps at a time?`, answer: "89",
        solution: String.raw`With $a_n = a_{n-1} + a_{n-2}$ and $a_0 = a_1 = 1$, the table runs $1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89$, so $a_{10} = 89$.` },
      { q: String.raw`How many shortest grid paths from $(0, 0)$ to $(5, 5)$ pass through both $(2, 2)$ and $(3, 3)$?`, answer: "72",
        solution: String.raw`Split the path at the two points: $\binom42 = 6$ paths to $(2, 2)$, $\binom21 = 2$ from $(2, 2)$ to $(3, 3)$, and $\binom42 = 6$ from $(3, 3)$ to $(5, 5)$. So $6 \cdot 2 \cdot 6 = 72$.` },
      { q: String.raw`Two players take turns removing $1$, $2$, $3$ or $4$ coins from a pile of $47$, and the player who takes the last coin wins. How many coins should the first player take to be sure of winning?`, answer: "2",
        solution: String.raw`Labeling from $0$ up, the losses for the player to move are the multiples of $5$: from one, every move leaves a non-multiple, and from a non-multiple the remainder mod $5$ can be taken. Since $47 = 45 + 2$, the first player takes $2$, leaving $45$, and then answers each move of $k$ coins with $5 - k$.` },
      { q: String.raw`Ann gives Bob half her marbles, then Bob gives Ann $4$ marbles, and now each has $10$. How many marbles did Ann have at the start?`, answer: "12",
        solution: String.raw`Undo the last step: before Bob gave $4$, Ann had $6$ and Bob $14$. Before Ann gave half, she had twice what she kept: $12$, and Bob had $14 - 6 = 8$. Check: $12 \to 6$ and Bob $8 \to 14$; then Ann $10$ and Bob $10$.` }
    ],
    problems: [
      "1998 AJHSME, Problem 25",
      "2020 AMC 8, Problem 22",
      "2013 AMC 12A, Problem 7",
      "2016 AMC 12B, Problem 7",
      "2010 AMC 10A, Problem 25"
    ]
  },
  challenge: {
    problems: [
      "2012 AMC 10B, Problem 25",
      "2015 AMC 12A, Problem 22",
      "2005 AMC 12A, Problem 20",
      "2006 AIME I, Problem 11"
    ]
  }
};
