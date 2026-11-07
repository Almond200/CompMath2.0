// Learn, AMC Counting & Probability, chapter R5: recursion, paths and processes (CONVENTIONS §14). Part: Core topics.
// Reversible recurrences, path states, game induction and first-touch reflection bijections.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R5"] = {
  lessons: {
    "R5.1": {
      prereq: ["constructive-counting", "permutations-combinations"],
      cards: [],
      body: String.raw`A counting rule often describes how an object is built rather than giving its total immediately. To climb a staircase, append a final move to a shorter climb. To travel across a grid, append a final edge to a path reaching a neighboring point. In each case, removing the last step reveals a smaller problem. The count works only if every allowed object is reconstructed exactly once.

For a staircase climbed one or two steps at a time, let $a_n$ count the ordered sequences of moves with total $n$. When $n\ge2$, the last move is either one step, following a climb of $n-1$ steps, or two steps, following a climb of $n-2$ steps. The cases are disjoint, and appending the specified move reverses the removal. Thus

$$a_n=a_{n-1}+a_{n-2}.$$

There is one empty climb of zero steps and one climb of a single step, so $a_0=a_1=1$. The empty object is necessary: it allows a single two-step move to be counted when $n=2$. The counts through $n=5$ are $1,1,2,3,5,8$, so there are eight climbs of five steps.

A shortest grid path from $(0,0)$ to $(3,2)$ has length five and cannot contain a left or downward step: either would require an extra compensating step. It is therefore a string of three right moves and two up moves. Choosing the positions of the two up moves gives $\binom52=10$ paths. Counting paths by their final move would give the same result through a table of neighboring counts.

Processes can also be traced in reverse. If doubling a number and adding three gives seventeen, the last operation is undone first: subtract three to get fourteen, then halve to get seven. Reversing is straightforward when each step has a unique inverse. When a step has several possible predecessors, a complete backward search must retain all valid branches.

The chapter develops recurrences, path tables, backward reasoning and deterministic simulation. The reflection principle then turns certain constrained paths into unrestricted ones by a reversible transformation. These methods share a requirement: the information being recorded must determine which continuations or predecessors are possible.`,
      exercises: [
        { q: String.raw`In how many ways can a staircase of $5$ steps be climbed, taking $1$ or $2$ steps at a time?`, answer: "8",
          solution: String.raw`Let $a_n$ count the ordered move sequences totaling $n$. For $n\ge2$, removing the last move leaves a climb of $n-1$ or $n-2$ steps, and appending that move reverses the construction. Thus $a_n=a_{n-1}+a_{n-2}$. The empty climb gives $a_0=1$, and $a_1=1$. Consequently $a_2=2$, $a_3=3$, $a_4=5$, and $a_5=8$.` },
        { q: String.raw`How many shortest paths along the grid lines go from $(0, 0)$ to $(3, 2)$?`, answer: "10",
          solution: String.raw`The displacement requires at least three right moves and two up moves, so a path of minimum length has exactly these five moves and no moves left or down. Each choice of the two up-move positions determines one path, and the path recovers those positions. The count is $\binom52=10$.` },
        { q: String.raw`A number is doubled and then increased by $3$, and the result is $17$. What was the number?`, answer: "7",
          solution: String.raw`The final operation was adding three, so subtract three from seventeen to recover fourteen. The earlier operation doubled the original number, so halve fourteen to obtain seven. These inverse operations must be applied in reverse order. Substituting checks the result: $2\cdot7+3=17$.` }
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
      body: String.raw`A recurrence expresses counts at one size in terms of smaller sizes. Its proof needs more than a plausible pattern in a table: the cases must be disjoint and exhaustive, and each case must correspond to the earlier objects being counted. Initial values then determine the remaining terms.

Let $a_n$ count binary strings of length $n$ with no adjacent ones. For $n\ge2$, a valid string ending in zero is obtained by appending zero to any valid string of length $n-1$. A string ending in one must end in $01$; removing those two digits leaves any valid string of length $n-2$. Conversely, appending $01$ to such a string cannot create adjacent ones across the join, because the appended block starts with zero. Hence [[recursive-counting|recursive counting]] gives

$$a_n=a_{n-1}+a_{n-2},\qquad a_0=1,\quad a_1=2.$$

The value $a_0=1$ counts the empty string; $a_1=2$ counts $0$ and $1$. The table for lengths one through eight is $2,3,5,8,13,21,34,55$. Thus $a_8=55$. These counts also have other descriptions, but the recurrence follows directly from the restriction at the end of the string.

The same split changes when the alphabet changes. For strings over $\{A,B,C\}$ with no adjacent $A$s, a final $B$ or $C$ can follow any valid string, giving $2c_{n-1}$ possibilities. A final $A$ must be preceded by $B$ or $C$ when $n\ge2$; remove that two-letter ending to get $2c_{n-2}$ possibilities. Thus $c_n=2c_{n-1}+2c_{n-2}$ for $n\ge2$, with $c_0=1,c_1=3$. The values through length seven are $3,8,22,60,164,448,1224$.

Some restrictions require more information than the total count at the preceding length. For binary strings with no three equal letters in a row, record the final letter and whether its current run has length one or two. Appending the opposite letter resets the run length to one; appending the same letter is allowed only after a run of length one. These states retain exactly the information needed for the next step. Forgetting the run length would mix strings with different legal continuations.

For these binary strings, let $u_n$ count strings whose last run has length one and $v_n$ those whose last run has length two, combining the two possible final letters. Switching letters gives $u_{n+1}=u_n+v_n$; repeating a letter gives $v_{n+1}=u_n$. Start from $(u_1,v_1)=(2,0)$. The pairs for lengths two through five are $(2,2),(4,2),(6,4),(10,6)$, so there are sixteen valid strings of length five. Summing a state vector after each update gives the total without losing the information needed for the next update.

A [[tiling-a-board|domino tiling]] has a related decomposition. Consider the upper-right cell of a $2\times n$ rectangle. Its domino is either vertical, filling the last column, or horizontal, covering the two rightmost cells of the top row. In the horizontal case, the lower-right cell is forced into a horizontal domino too: a vertical domino would overlap the one already placed. Removing the forced end leaves a smaller rectangle.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 305" role="img" aria-labelledby="r52-title r52-desc" style="width:100%;max-width:520px;height:auto"><title id="r52-title">The two endings of a domino tiling</title><desc id="r52-desc">The right end is a vertical domino or a forced pair of horizontal dominoes. Removing it leaves a smaller rectangle.</desc><g stroke="currentColor" stroke-width="1.2"><rect x="85" y="53" width="350" height="70" fill="none"/><path d="M120 53v70" opacity=".25"/><path d="M155 53v70" opacity=".25"/><path d="M190 53v70" opacity=".25"/><path d="M225 53v70" opacity=".25"/><path d="M260 53v70" opacity=".25"/><path d="M295 53v70" opacity=".25"/><path d="M330 53v70" opacity=".25"/><path d="M365 53v70" opacity=".25"/><path d="M400 53v70" opacity=".25"/><path d="M85 88h350" opacity=".25"/><rect x="85" y="178" width="350" height="70" fill="none"/><path d="M120 178v70" opacity=".25"/><path d="M155 178v70" opacity=".25"/><path d="M190 178v70" opacity=".25"/><path d="M225 178v70" opacity=".25"/><path d="M260 178v70" opacity=".25"/><path d="M295 178v70" opacity=".25"/><path d="M330 178v70" opacity=".25"/><path d="M365 178v70" opacity=".25"/><path d="M400 178v70" opacity=".25"/><path d="M85 213h350" opacity=".25"/><rect x="400" y="53" width="35" height="70" fill="currentColor" fill-opacity=".15"/><rect x="365" y="178" width="70" height="35" fill="currentColor" fill-opacity=".15"/><rect x="365" y="213" width="70" height="35" fill="currentColor" fill-opacity=".08"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="260" y="29">One vertical domino at the end</text><text x="240" y="95">Smaller board</text><text x="260" y="155">Two horizontal dominoes at the end</text><text x="222" y="221">Smaller board</text><text x="260" y="282">The rightmost cell forces one of these two endings.</text></g></svg>

Appending the displayed end pieces reverses each removal. Consequently

$$t_n=t_{n-1}+t_{n-2}\quad(n\ge2),\qquad t_0=t_1=1.$$

The values for widths zero through eight are $1,1,2,3,5,8,13,21,34$, giving $t_8=34$. For a one-row strip tiled with lengths one and three, the last tile instead gives $b_n=b_{n-1}+b_{n-3}$ for $n\ge3$. With $b_0=b_1=b_2=1$, the next values are $2,3,4,6,9$, so $b_7=9$.

A recurrence is not always the shortest way to decide existence. Color an ordinary $8\times8$ board like a chessboard. A domino covers one square of each color, whereas two opposite corners have the same color. Removing them leaves thirty squares of one color and thirty-two of the other. No domino tiling can cover unequal color totals. This is an obstruction proved by an invariant, rather than an assumption that a recurrence will apply to an irregular board.`,
      related: [
        { card: "restricted-sequences", note: String.raw`strings with forbidden patterns, counted by the same split by the last letter.` },
        { card: "coloring-arguments", note: String.raw`the coloring that shows a board cannot be tiled (R7.5).` },
        { card: "states-recursion-prob", note: String.raw`a recursion on states for probabilities (R9.3).` }
      ],
      exercises: [
        { q: String.raw`How many strings of $8$ digits, each $0$ or $1$, have no two $1$'s next to each other?`, answer: "55",
          solution: String.raw`Let $a_n$ count the valid strings, including $a_0=1$ for the empty string and $a_1=2$ for $0$ or $1$. For $n\ge2$, strings ending in $0$ are obtained from any valid length-$n-1$ string. Those ending in $1$ end in $01$, and removing that ending leaves any valid length-$n-2$ string. Both constructions are reversible and safe across the join, giving $a_n=a_{n-1}+a_{n-2}$. The counts at lengths one through eight are $2,3,5,8,13,21,34,55$, so the answer is $55$.` },
        { q: String.raw`In how many ways can a $2 \times 8$ board be covered by $1 \times 2$ dominoes?`, answer: "34",
          solution: String.raw`Inspect the domino covering the upper-right cell. If vertical, it fills the last column and leaves a $2\times(n-1)$ rectangle. If horizontal, the lower-right cell must belong to a second horizontal domino; a vertical one would overlap the first. Removing the pair leaves a $2\times(n-2)$ rectangle. Every smaller tiling extends uniquely in its case, so $t_n=t_{n-1}+t_{n-2}$ for $n\ge2$. With $t_0=t_1=1$, the counts through width eight are $1,1,2,3,5,8,13,21,34$. Thus $t_8=34$.` },
        { q: String.raw`In how many ways can a $1 \times 7$ strip be covered by $1 \times 1$ and $1 \times 3$ tiles?`, answer: "9",
          solution: String.raw`Let $b_n$ count the coverings of a strip of length $n$. Removing its last tile leaves length $n-1$ or $n-3$, with no other restriction on the remaining tiling. For $n\ge3$, this gives $b_n=b_{n-1}+b_{n-3}$. The empty strip and the strips of lengths one and two each have one covering, so $b_0=b_1=b_2=1$. The next counts are $b_3=2$, $b_4=3$, $b_5=4$, $b_6=6$, and $b_7=9$.` },
        { q: String.raw`How many strings of $7$ letters, each $A$, $B$ or $C$, have no two $A$'s next to each other?`, answer: "1224",
          solution: String.raw`Use $c_0=1$ and $c_1=3$. For length $n\ge2$, a final $B$ or $C$ follows any valid shorter string, contributing $2c_{n-1}$. A final $A$ is preceded by $B$ or $C$; deleting that two-letter ending leaves any valid string of length $n-2$, contributing $2c_{n-2}$. These disjoint cases give $c_n=2c_{n-1}+2c_{n-2}$. The counts through length seven are $3,8,22,60,164,448,1224$, so the answer is $1224$.` }
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
      body: String.raw`A shortest path on the complete unit grid from $(0,0)$ to $(m,n)$, for nonnegative integers $m,n$, has $m+n$ edges. Each step is right or up; a step in either opposite direction would increase the required total length. A path therefore corresponds to a string with $m$ right moves and $n$ up moves, whose order determines the path uniquely. The [[grid-paths|grid-path count]] is

$$\binom{m+n}{m}=\binom{m+n}{n}.$$

For $(m,n)=(4,3)$ this gives $\binom73=35$. To require a visit to $(2,1)$, split the path at that point. The first part takes two right moves and one up move, giving $\binom31=3$ choices. The second takes two moves of each kind, giving $\binom42=6$. Every pair concatenates into one allowed path, and splitting recovers the pair, so there are $3\cdot6=18$ such paths. The other $35-18=17$ avoid the point.

For several required points, first check their order. Along a right-and-up path neither coordinate decreases, so the points must occur in a coordinatewise compatible order. If they do, multiply the counts for successive segments; if two required points are incompatible, no such path exists. For several forbidden points, subtracting each through-count separately can remove paths more than once. Inclusion-exclusion or a path table resolves those overlaps.

The move-string correspondence works in higher dimensions too. A shortest path from $(0,0,0)$ to $(2,2,2)$ uses two positive moves in each of three coordinate directions. These repeated moves have $6!/(2!\,2!\,2!)=90$ orders.

With obstacles, [[grid-path-fill|filling the grid]] records the number $F(x,y)$ of allowed paths to each point. At the start write one for the empty path. A blocked point has count zero. At any other point, every incoming path has a unique last edge, so add the counts of its allowed predecessors. For right-and-up unit steps this is

$$F(x,y)=F(x-1,y)+F(x,y-1),$$

with unavailable predecessors contributing zero. For a closed edge, omit that edge's contribution rather than deleting its endpoint. The diagram places the counts in the same positions as the grid points, with the blocked point marked by a cross.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 345" role="img" aria-labelledby="r53-title r53-desc" style="width:100%;max-width:520px;height:auto"><title id="r53-title">A grid path table with one blocked point</title><desc id="r53-desc">Counts are filled from the start in the lower left to the end in the upper right. The point two right and one up is blocked. The final count is seventeen.</desc><g stroke="currentColor" opacity=".22" stroke-width="1"><path d="M100 55v195"/><path d="M180 55v195"/><path d="M260 55v195"/><path d="M340 55v195"/><path d="M420 55v195"/><path d="M100 250h320"/><path d="M100 185h320"/><path d="M100 120h320"/><path d="M100 55h320"/></g><g fill="currentColor" text-anchor="middle" font-size="19"><circle cx="100" cy="250" r="19" fill="var(--bg, Canvas)"/><text x="100" y="256">1</text><circle cx="180" cy="250" r="19" fill="var(--bg, Canvas)"/><text x="180" y="256">1</text><circle cx="260" cy="250" r="19" fill="var(--bg, Canvas)"/><text x="260" y="256">1</text><circle cx="340" cy="250" r="19" fill="var(--bg, Canvas)"/><text x="340" y="256">1</text><circle cx="420" cy="250" r="19" fill="var(--bg, Canvas)"/><text x="420" y="256">1</text><circle cx="100" cy="185" r="19" fill="var(--bg, Canvas)"/><text x="100" y="191">1</text><circle cx="180" cy="185" r="19" fill="var(--bg, Canvas)"/><text x="180" y="191">2</text><circle cx="260" cy="185" r="19" fill="var(--bg, Canvas)"/><text x="260" y="191">×</text><circle cx="340" cy="185" r="19" fill="var(--bg, Canvas)"/><text x="340" y="191">1</text><circle cx="420" cy="185" r="19" fill="var(--bg, Canvas)"/><text x="420" y="191">2</text><circle cx="100" cy="120" r="19" fill="var(--bg, Canvas)"/><text x="100" y="126">1</text><circle cx="180" cy="120" r="19" fill="var(--bg, Canvas)"/><text x="180" y="126">3</text><circle cx="260" cy="120" r="19" fill="var(--bg, Canvas)"/><text x="260" y="126">3</text><circle cx="340" cy="120" r="19" fill="var(--bg, Canvas)"/><text x="340" y="126">4</text><circle cx="420" cy="120" r="19" fill="var(--bg, Canvas)"/><text x="420" y="126">6</text><circle cx="100" cy="55" r="19" fill="var(--bg, Canvas)"/><text x="100" y="61">1</text><circle cx="180" cy="55" r="19" fill="var(--bg, Canvas)"/><text x="180" y="61">4</text><circle cx="260" cy="55" r="19" fill="var(--bg, Canvas)"/><text x="260" y="61">7</text><circle cx="340" cy="55" r="19" fill="var(--bg, Canvas)"/><text x="340" y="61">11</text><circle cx="420" cy="55" r="19" fill="var(--bg, Canvas)"/><text x="420" y="61">17</text></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="25">Add counts from the left and below</text><text x="100" y="290">Start (0, 0)</text><text x="420" y="290">End (4, 3)</text><text x="260" y="325">× blocks (2, 1); its path count is zero.</text></g></svg>

Rows from bottom to top in this example are $1,1,1,1,1$; $1,2,0,1,2$; $1,3,3,4,6$; and $1,4,7,11,17$. The final count agrees with the earlier subtraction. Along either axis there is only one incoming direction, which explains the boundary ones.

The order of filling matters. Right and up moves always increase $x+y$, so predecessor counts are already known when points are processed by increasing $x+y$. More generally, this one-pass addition works on a directed graph with no directed cycles, processed with every predecessor before its successors. Arbitrary one-way streets can form a cycle and do not automatically admit such an order. Unrestricted walks around a reachable cycle can be infinite in number; for walks of a fixed length, add the number of steps to the state. For paths that must not reuse edges or vertices, that used-set information may also be needed.

For a concrete extra-step rule, allow right, up and diagonal $(1,1)$ moves. Let $D(x,y)$ count all such paths to $(x,y)$, not just the shortest ones under this enlarged rule. A final diagonal adds a third predecessor:

$$D(x,y)=D(x-1,y)+D(x,y-1)+D(x-1,y-1).$$

With ones on both axes, the rows through $(2,2)$ are $1,1,1$; $1,3,5$; and $1,5,13$. Thus there are thirteen paths. A single binomial coefficient cannot count them because the number of moves is no longer fixed.

Multiple obstacles also illustrate why the state table is useful. From $(0,0)$ to $(3,3)$ with $(1,1)$ and $(2,2)$ forbidden, there are twenty unrestricted paths. The individual through-counts are $\binom21\binom42=12$ for each point, and $2\cdot2\cdot2=8$ pass through both. Inclusion-exclusion gives $20-12-12+8=4$. A table that assigns zero at each obstacle gives the same answer without separately counting intersections.`,
      related: [
        { card: "multiset-permutations", note: String.raw`the count of strings of moves with repeated letters (R3.2).` },
        { card: "catalan-numbers", note: String.raw`paths that stay on one side of the diagonal.` },
        { card: "reflection-principle", note: String.raw`paths that touch a forbidden line, counted by reflecting (R5.5).` }
      ],
      exercises: [
        { q: String.raw`How many shortest paths along the grid lines go from $(0, 0)$ to $(4, 3)$?`, answer: "35",
          solution: String.raw`A shortest path must use exactly four right moves and three up moves. It is determined by choosing the three up-move positions among seven steps, with every choice giving one valid path on the complete grid. Hence there are $\binom73=35$ paths.` },
        { q: String.raw`How many of the shortest paths from $(0, 0)$ to $(4, 3)$ pass through $(2, 1)$?`, answer: "18",
          solution: String.raw`Split each path at $(2,1)$. The prefix has two right moves and one up move, so there are $\binom31=3$ choices. The suffix has two moves of each kind, so there are $\binom42=6$ choices. Any prefix can be joined to any suffix, and cutting at the specified point recovers exactly that pair. Therefore the product is $3\cdot6=18$.` },
        { q: String.raw`How many of the shortest paths from $(0, 0)$ to $(4, 3)$ avoid the point $(2, 1)$?`, answer: "17",
          solution: String.raw`All shortest paths number $\binom73=35$. A path visiting $(2,1)$ splits uniquely into one of $\binom31=3$ prefixes and one of $\binom42=6$ suffixes. Thus $18$ paths visit the point, and the other $35-18=17$ avoid it. As a check, a right-and-up path table with zero at the blocked point has rows $1,1,1,1,1$; $1,2,0,1,2$; $1,3,3,4,6$; and $1,4,7,11,17$, read from bottom to top.` },
        { q: String.raw`How many shortest paths along the edges of a grid of unit cubes go from $(0, 0, 0)$ to $(2, 2, 2)$?`, answer: "90",
          solution: String.raw`A shortest path has six edges: two increasing each of the three coordinates. Choose two of the six positions for the first direction, then two of the remaining four for the second; the last two positions have the third direction. This gives $\binom62\binom42=15\cdot6=90$, equal to $6!/(2!\,2!\,2!)$. Every resulting move string determines exactly one path.` }
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
      body: String.raw`A process can be described by its states and the rules for passing from one state to another. A useful state contains everything needed to determine the permitted next steps. In a coin-removal game it includes the pile size and, if players have different moves, whose turn it is. In a recurrence using the preceding two terms, the state contains both terms, not just the current one.

[[working-backwards|Working backward]] starts from a specified final state and finds possible predecessors. Undo the last operation first. For the map $f(x)=x/2-1$, the inverse is $f^{-1}(y)=2(y+1)$. Applying the original map three times ends at two exactly when the start is found by applying the inverse three times:

$$2\longmapsto6\longmapsto14\longmapsto30.$$

Checking forward gives $30\mapsto14\mapsto6\mapsto2$. Reversing the individual operations in their original order would not give the inverse of their composition.

Some maps have several predecessors. Squaring a real number gives a nonnegative value; a positive output has two real predecessors, while a negative output has none. A backward search must preserve the original domain and test every branch against the original rule. If the goal is the fewest moves, finding a backward route alone does not prove optimality; one also needs a lower bound or a search that exhausts all shorter possibilities.

[[backward-induction|Backward induction]] classifies a finite game with perfect information and no chance moves. Suppose every move removes one, two or three coins, and taking the last coin wins. Label a position by whether the player about to move can force a win against best play. Zero is losing because the preceding player has already taken the last coin. A positive pile is winning if some legal move leaves a losing position for the opponent; it is losing if every legal move leaves a winning one.

The piles one, two and three are winning; four is losing; five, six and seven are winning. To prove the pattern, use induction on the pile size. From a multiple of four, every legal move leaves a smaller nonmultiple. From a nonmultiple, removing its remainder modulo four leaves a smaller multiple. Thus the losing piles are exactly the multiples of four, not merely the first few observed in a table.

From thirty coins, take two to leave twenty-eight. If the opponent takes $k$ coins, respond with $4-k$, leaving a multiple of four again. The response is legal and eventually takes the last coin. This reasoning assumes the stated last-coin rule; changing to a game in which the last taker loses changes the terminal labels. If moves can loop forever, win/loss induction also requires further analysis because a draw may be possible.

[[simulate-the-process|Simulation]] records successive states from a known start. For a deterministic rule, revisiting the same complete state forces the same future. If an infinite run has only finitely many possible states, some state must repeat, so the run eventually enters a cycle. It may have a nonrepeating initial segment, and a process with infinitely many possible states need not repeat at all.

For $a_1=2,a_2=3$ and $a_n=a_{n-1}/a_{n-2}$, all terms are nonzero, and direct computation gives

$$2,\ 3,\ \frac32,\ \frac12,\ \frac13,\ \frac23,\ 2,\ 3.$$

The pair $(a_7,a_8)=(2,3)$ repeats $(a_1,a_2)$, so the entire future repeats with period six. A single repeated term would not suffice for this two-term rule. Since $2026=6\cdot337+4$, the required term is $a_{2026}=a_4=1/2$. For an eventual cycle that begins later, first subtract the initial segment before reducing an index modulo its period.

For example, start at $x_0=3$ and set $x_{n+1}$ to the remainder of $2x_n$ modulo ten. The states are $3,6,2,4,8,6,\ldots$. The initial three does not belong to the repeating block $6,2,4,8$, which starts at index one. For an index $n\ge1$, reduce $n-1$ modulo four, not $n$ relative to the original start. Since $100-1\equiv3\pmod4$, $x_{100}=8$.

A branching inverse can be worked out just as explicitly. Let a positive integer be halved when even and replaced by $3n+1$ when odd. A target $m$ has the even predecessor $2m$, and may also have the odd predecessor $(m-1)/3$ when this is an odd positive integer. Starting from target one, the predecessor sets after one, two and three inverse steps are $\{2\}$, $\{4\}$ and $\{1,8\}$. Thus one and eight are exactly the positive starts reaching one after three forward steps. Each candidate must satisfy the parity test that selected its forward branch; arbitrary algebraic inverse values would introduce spurious starts.`,
      related: [
        { card: "cycle-hunting", note: String.raw`turning a repeating record into the answer for any step (M4.3).` },
        { card: "strategy-stealing", note: String.raw`games won by a symmetry or by showing a strategy exists, without labeling every position (R8.4).` },
        { card: "invariants-coloring", note: String.raw`a quantity a process cannot change, which settles what it can reach (R7.5).` }
      ],
      exercises: [
        { q: String.raw`A number is halved and the result decreased by $1$. This is done three times in all, and the final result is $2$. What was the number?`, answer: "30",
          solution: String.raw`One forward application sends $x$ to $x/2-1$. To undo it, add one and double, giving $y\mapsto2(y+1)$. Starting from the final value two, the three inverse applications give $2\mapsto6\mapsto14\mapsto30$. Checking the original three applications gives $30\mapsto14\mapsto6\mapsto2$, so the initial number was $30$.` },
        { q: String.raw`Two players take turns removing $1$, $2$ or $3$ coins from a pile, and the player who takes the last coin wins. Assuming both players use their best strategies, for how many starting piles from $1$ to $30$ coins does the second player win?`, answer: "7",
          solution: String.raw`Zero is losing for the player about to move. Inductively, a positive multiple of four is losing: every legal removal leaves a smaller nonmultiple, which is winning. From a nonmultiple, taking its remainder modulo four leaves a losing multiple. Hence the second player can force a win exactly when the starting pile is a multiple of four. Between one and thirty these are $4,8,12,16,20,24,28$, totaling seven piles. This assumes both players use winning strategies whenever they exist.` },
        { q: String.raw`A sequence has $a_1 = 2$, $a_2 = 3$ and $a_n = \dfrac{a_{n-1}}{a_{n-2}}$ for $n \ge 3$. What is $a_{2026}$?`, answer: "1/2",
          solution: String.raw`Compute the terms exactly: $2,3,3/2,1/2,1/3,2/3,2,3$. All are nonzero, so the quotient rule remains defined. The consecutive pair $(a_7,a_8)$ repeats $(a_1,a_2)$; because the next term is determined by that pair, the entire sequence repeats every six terms. A single matching term would not suffice. Since $2026=6\cdot337+4$, the requested term is $a_4=1/2$.` }
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
      body: String.raw`Reflection changes a restricted path into another path whose count is easier to obtain. The transformation must specify which part is reflected and how to find that same part in reverse. Using the first visit to a boundary provides a well-defined inverse.

Consider six steps of size $+1$ or $-1$ starting at zero, and ask how many walks reach level three. Separate successful walks by their final height. Any walk ending above three must have visited three because its steps have size one. For a successful walk ending below three, preserve the prefix through its first visit to three and reverse the signs of all later steps. A final height $z\lt3$ becomes $6-z\gt3$.

The reflected walk has the same first visit to three: the prefix is unchanged. Reflecting its suffix again restores the original walk, and every walk ending above three has the required first visit. Thus the [[reflection-principle|reflection principle]] pairs successful walks ending below three with walks ending above three. No six-step walk ends at three because its final height is even. Above three the only endpoints are four and six, requiring five or six up steps. The count is therefore

$$2\left(\binom65+\binom66\right)=2(6+1)=14.$$

More generally, for a positive integer level $h$ and a fixed number of unit steps, the number reaching $h$ equals the number ending at $h$ plus twice the number ending above $h$. The same suffix reflection sends an endpoint $z\lt h$ to $2h-z\gt h$. If the walks represent coin tosses, counting alone gives a probability only when the outcome weights are handled correctly. For a fair coin all step sequences of the same length are equally likely; with a biased coin a reflection generally changes the weight.

For a grid example, count right-and-up paths from $(0,0)$ to $(4,4)$ staying at or below $y=x$. A bad path first reaches $y=x+1$ at a lattice point. Reflect its prefix up to and including that visit across $y=x+1$. The reflection sends $(x,y)$ to $(y-1,x+1)$, swaps right and up steps, fixes the first-touch point and moves the start to $(-1,1)$. The suffix and final point remain unchanged.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 330" role="img" aria-labelledby="r55-title r55-desc" style="width:100%;max-width:520px;height:auto"><title id="r55-title">Reflecting the first forbidden prefix</title><desc id="r55-desc">The path first touches y equals x plus one at the point one comma two. Reflecting its prefix sends the start to minus one comma one and preserves the suffix to four comma four.</desc><g stroke="currentColor" fill="none"><path d="M33 205h160M65 205v-160" opacity=".35"/><path d="M33 205L161 77" stroke-dasharray="4 4" opacity=".55"/><polyline points="65,205 97,205 97,173 97,141 129,141 161,141 161,109 193,109 193,77" stroke-width="2.5"/></g><circle cx="97" cy="141" r="4" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="130" y="28">Original bad path</text><text x="130" y="245">Start (0, 0)</text></g><g stroke="currentColor" fill="none"><path d="M293 205h160M325 205v-160" opacity=".35"/><path d="M293 205L421 77" stroke-dasharray="4 4" opacity=".55"/><polyline points="293,173 293,141 325,141 357,141 389,141 421,141 421,109 453,109 453,77" stroke-width="2.5"/></g><circle cx="357" cy="141" r="4" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="390" y="28">Reflected prefix</text><text x="390" y="245">Start (−1, 1)</text></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="282">Reflect only through the first touch of y = x + 1.</text><text x="260" y="308">The endpoint (4, 4) and later steps stay fixed.</text></g></svg>

Conversely, every right-and-up path from $(-1,1)$ to $(4,4)$ begins with $y-x=2$ and ends with $y-x=0$, so it must first touch $y-x=1$. Reflect its prefix at that first touch. Before the touch the reflected path lies at or below $y=x$, and the touch itself is its first forbidden point. This recovers exactly one original bad path. The new path requires five right moves and three up moves, giving $\binom83=56$ bad paths. Of all $\binom84=70$ paths, $70-56=14$ stay at or below the diagonal.

For $(0,0)$ to $(n,n)$ with $n\ge1$, the same argument gives

$$\binom{2n}{n}-\binom{2n}{n-1}=\frac1{n+1}\binom{2n}{n}.$$

Boundary contact is allowed here; the forbidden event is going strictly above the diagonal. The first forbidden line is therefore $y=x+1$, not $y=x$.

A strict ballot condition has a different boundary. Suppose candidate $P$ has $a$ votes, candidate $Q$ has $b$, and $a\gt b\ge1$. To lead after every vote, the first vote must be for $P$, giving $\binom{a+b-1}{b}$ candidate orders. Among these, a bad order first ties at some later point. Swap the two vote names in the prefix through the first tie. That prefix has equal totals, so the final vote totals are unchanged, but the first vote becomes $Q$.

Conversely, an order beginning with $Q$ must reach a tie because the final lead is positive. Swapping its prefix through the first tie reverses the map. There are $\binom{a+b-1}{b-1}$ such bad orders. Their subtraction simplifies to

$$\binom{a+b-1}{b}-\binom{a+b-1}{b-1}=\frac{a-b}{a+b}\binom{a+b}{b}.$$

With $a=6,b=3$ this is $56-28=28$. The votes are recorded only by candidate, so votes for the same candidate are indistinguishable in this count. If $b=0$, there is just one order and it leads throughout.`,
      related: [
        { card: "catalan-numbers", note: String.raw`the paths that never cross the diagonal, $\tfrac{1}{n+1}\binom{2n}{n}$.` },
        { card: "ballot-problem", note: String.raw`the vote count in which the winner leads throughout, $\tfrac{a - b}{a + b}\binom{a+b}{a}$.` },
        { card: "binomial-probability", note: String.raw`the chance of each endpoint when the steps are coin tosses (R6.3).` }
      ],
      exercises: [
        { q: String.raw`A token starts at $0$ and moves $1$ up or $1$ down at each of $6$ steps. Of the $2^6 = 64$ step sequences, how many make the token reach $3$ at some time?`, answer: "14",
          solution: String.raw`A successful walk ends below three, at three, or above three. The endpoint is even after six unit steps, so it cannot equal three. Walks ending above three end at four or six, and number $\binom65+\binom66=7$. Each has a first visit to three. Reversing all step signs after that visit pairs it with a unique successful walk ending below three, and doing this again recovers the original walk. Thus there are twice seven, or $14$, successful sequences.` },
        { q: String.raw`How many shortest grid paths from $(0, 0)$ to $(4, 4)$ never go above the line $y = x$?`, answer: "14",
          solution: String.raw`There are $\binom84=70$ unrestricted right-and-up paths. A path going above $y=x$ first touches $y=x+1$. Reflect its prefix through that first touch across the latter line. The start becomes $(-1,1)$ and the endpoint stays $(4,4)$. Every right-and-up path between these new endpoints must touch the reflection line, and reflecting through its first touch reverses the construction. The bad paths therefore number $\binom83=56$, leaving $70-56=14$ allowed paths.` },
        { q: String.raw`In an election, candidate $P$ gets $6$ votes and candidate $Q$ gets $3$, and the $9$ votes are counted in some order. In how many of the $\binom93 = 84$ orders is $P$ strictly ahead after every vote counted?`, answer: "28",
          solution: String.raw`An order that leads strictly throughout must start with $P$. There are $\binom83=56$ orders starting with $P$. For a bad one, swap $P$ and $Q$ in the prefix through the first tie. Equal vote totals in that prefix preserve the final totals, while the first vote becomes $Q$. Conversely, every order starting with $Q$ must tie on its way to the final positive $P$ lead, so the same swap reverses the map. There are $\binom82=28$ orders starting with $Q$, hence $56-28=28$ good orders.` }
      ],
      problems: [
        "2020 AMC 8, Problem 21",
        "2016 AMC 12A, Problem 19"
      ]
    },
    "R5.6": {
      prereq: ["recursive-counting", "tiling-a-board", "grid-paths", "grid-path-fill", "working-backwards", "backward-induction", "simulate-the-process", "reflection-principle"],
      cards: [],
      body: String.raw`[[recursive-counting|A recurrence]] comes from a reversible decomposition into disjoint, exhaustive cases. Define the objects being counted and the range in which the recurrence applies, then supply initial values, including an empty object when needed. [[tiling-a-board|Tilings]] often split by forced end pieces. Irregular boards may require more detailed states or an invariant proving impossibility.

[[grid-paths|Shortest paths]] on a complete rectangular grid correspond to strings of moves, giving $\binom{m+n}{m}$ for nonnegative displacements $m,n$. Split at compatible required points to multiply counts. Subtracting through-counts handles one forbidden point; overlapping forbidden events need more care. [[grid-path-fill|A path table]] adds predecessor counts in an order respecting the allowed edges. Cyclic move rules require additional state or a different argument.

[[working-backwards|Reversing a process]] undoes its operations in reverse order, retaining every valid predecessor when the inverse branches. [[backward-induction|Game induction]] labels a position using smaller positions and the correct terminal rule. The coin game shows how a table suggests a pattern and induction proves it for every pile.

[[simulate-the-process|Simulation]] predicts a cycle only after a complete deterministic state repeats. Finitely many possible states guarantee eventual repetition for an infinite run, but an initial nonrepeating segment may occur. A recurrence using two previous terms generally requires a pair as its state.

[[reflection-principle|Reflection]] is a bijection with a specified inverse. For unit walks, reflecting after the first visit to a level pairs successful paths ending on opposite sides. For grid paths, reflecting before the first forbidden diagonal visit moves the start to a simpler location. Weak diagonal restrictions and strict ballot leads have different first forbidden events, so their counts must be derived with their own boundary conditions.`,
      strategies: [
        String.raw`Name the count for size $n$ and split by the last piece; check that the cases do not overlap and miss nothing.`,
        String.raw`State the valid index range and initial values of every recurrence, including the empty object when needed.`,
        String.raw`For paths through a point, multiply; for paths avoiding one, subtract; for an irregular grid with acyclic moves, fill in the counts.`,
        String.raw`When the end of a process is given, undo the steps from the last.`,
        String.raw`Label the small positions of a game as wins and losses, find the pattern, then explain it.`,
        String.raw`Record the complete state in a deterministic simulation; separate any initial segment from the eventual cycle.`,
        String.raw`Count the paths that touch a forbidden line by reflecting them at the first touch.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`In how many ways can a staircase of $10$ steps be climbed, taking $1$ or $2$ steps at a time?`, answer: "89",
        solution: String.raw`Let $a_n$ count ordered sequences of one- and two-step moves totaling $n$. Removing the last move gives $a_n=a_{n-1}+a_{n-2}$ for $n\ge2$. With $a_0=a_1=1$, the counts through ten are $1,1,2,3,5,8,13,21,34,55,89$. Each sequence counted reaches the top exactly, so the answer is $a_{10}=89$.` },
      { q: String.raw`How many shortest grid paths from $(0, 0)$ to $(5, 5)$ pass through both $(2, 2)$ and $(3, 3)$?`, answer: "72",
        solution: String.raw`A right-and-up path visiting both required points must reach $(2,2)$ before $(3,3)$, since its coordinates never decrease. Split it into three segments. Their counts are $\binom42=6$ to $(2,2)$, $\binom21=2$ to $(3,3)$, and $\binom42=6$ to $(5,5)$. Every triple of segments concatenates into exactly one required path. Multiplication gives $6\cdot2\cdot6=72$.` },
      { q: String.raw`Two players take turns removing $1$, $2$, $3$ or $4$ coins from a pile of $47$, and the player who takes the last coin wins. How many coins should the first player take to be sure of winning?`, answer: "2",
        solution: String.raw`For moves of one through four, zero is losing and the positive losing piles are exactly the multiples of five. Every move from a multiple leaves a nonmultiple; from a nonmultiple, taking its remainder modulo five leaves a smaller multiple. Since $47=45+2$, take two. Thereafter answer each removal of $k$ coins with $5-k$. This response is legal and restores a multiple of five until it takes the last coin, so two coins guarantees the win.` },
      { q: String.raw`Ann gives Bob half her marbles, then Bob gives Ann $4$ marbles, and now each has $10$. How many marbles did Ann have at the start?`, answer: "12",
        solution: String.raw`Undo Bob's transfer of four marbles first. Immediately before it, Ann had $10-4=6$ and Bob had $10+4=14$. Ann's first action left her with half her original marbles, so originally she had twelve and gave Bob six. Bob therefore originally had $14-6=8$. Checking forward: $(12,8)\mapsto(6,14)\mapsto(10,10)$. Thus Ann started with $12$.` },
      { q: String.raw`How many binary strings of length $5$ contain neither $000$ nor $111$?`, answer: "16",
        solution: String.raw`Let $u_n,v_n$ count strings whose final run has length one or two. From $(u_1,v_1)=(2,0)$, use $(u_{n+1},v_{n+1})=(u_n+v_n,u_n)$. The next four pairs are $(2,2),(4,2),(6,4),(10,6)$. Their last total is sixteen. Switching the final digit and repeating it are the two disjoint construction cases.` },
      { q: String.raw`How many paths from $(0,0)$ to $(2,2)$ use only right, up or diagonal $(1,1)$ unit moves? Count all such paths, regardless of length.`, answer: "13",
        solution: String.raw`Add the counts from the left, below and lower-left diagonal predecessor. Boundary counts are one. The rows are $1,1,1$; $1,3,5$; $1,5,13$, so the destination count is thirteen. These paths have different numbers of moves, so they are not all shortest paths in the enlarged move system.` },
      { q: String.raw`Set $x_0=3$ and let $x_{n+1}$ be the remainder of $2x_n$ modulo ten. What is $x_{100}$?`, answer: "8",
        solution: String.raw`The states are $3,6,2,4,8,6,\ldots$. The repeating block $6,2,4,8$ begins at index one and has period four. Subtract that starting index: $100-1=99\equiv3\pmod4$. The entry of offset three in the block is eight. Reducing the index as though the initial three were in the cycle would be incorrect.` },
      { q: String.raw`A positive integer is halved when even and replaced by $3n+1$ when odd. How many positive starting integers reach $1$ after exactly three applications of this rule?`, answer: "2",
        solution: String.raw`An even predecessor of $m$ is $2m$; an odd predecessor is $(m-1)/3$ only when it is an odd positive integer. Starting from one, the predecessor sets are $\{2\}$, then $\{4\}$, then $\{1,8\}$. Both check forward: $1\to4\to2\to1$ and $8\to4\to2\to1$. Thus two starts work; a start is allowed to equal the final target before the three applications begin.` }
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
