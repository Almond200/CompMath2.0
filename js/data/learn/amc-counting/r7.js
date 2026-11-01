// Learn, AMC Counting & Probability, chapter R7: sets, graphs and logic (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R7"] = {
  lessons: {
    "R7.1": {
      prereq: ["casework-method", "permutations-combinations"],
      cards: [],
      body: String.raw`Not every counting problem asks "how many". Some ask for the largest set with a property, some for what must happen however things are arranged, and some for who is telling the truth. This chapter collects the ideas that answer them: subsets that avoid a relation, graphs, the pigeonhole principle and extreme cases, colorings and invariants, logical deduction, and the contrapositive.

A drawer holds socks of $3$ colors. To be sure of a matching pair, $4$ socks are enough, since $3$ socks can all differ but a fourth must repeat one of the $3$ colors; and $3$ are not enough. That is the pigeonhole principle: more objects than boxes force a box with two. In a tournament where each of $5$ teams plays each other team once, there are $\binom52 = 10$ games, one for each pair of teams, and that total is known before any game is played. And if $A$ says "$B$ is a liar" while $B$ says "we are both liars", then $B$ cannot be telling the truth, since a truth-teller would be calling himself a liar; so $B$ lies, $A$ is not a liar, and $A$'s statement checks out.

The lessons take these ideas in turn: subsets (R7.2), graphs (R7.3), pigeonhole and extremes (R7.4), colorings and invariants (R7.5), logic puzzles and cases (R7.6), and proof by contrapositive (R7.7). The Summary (R7.8) collects the strategies.`,
      exercises: [
        { q: String.raw`A drawer holds red, white and blue socks, many of each. How many socks must be drawn, without looking, to be sure of two of the same color?`, answer: "4",
          solution: String.raw`Three socks can be one of each color, so $3$ are not enough. Among $4$ socks and $3$ colors, two must share a color. So $4$.` },
        { q: String.raw`Each of $5$ teams plays each other team exactly once. How many games are played?`, answer: "10",
          solution: String.raw`Each game is a pair of teams, so there are $\binom52 = 10$ games.` },
        { q: String.raw`Each of $A$ and $B$ always tells the truth or always lies. $A$ says, "$B$ is a liar." $B$ says, "We are both liars." How many of them tell the truth?`, answer: "1",
          solution: String.raw`If $B$ told the truth, $B$ would be a liar, which is impossible. So $B$ lies, and "we are both liars" is false; since $B$ is a liar, $A$ is not. Then $A$ tells the truth, and indeed $B$ is a liar. Exactly $1$ tells the truth.` }
      ],
      problems: [
        "1999 AMC 8, Problem 6",
        "2006 AMC 8, Problem 20",
        "1994 AJHSME, Problem 21"
      ]
    },
    "R7.2": {
      prereq: ["constructive-counting", "binomial-row-sums"],
      cards: ["subset-avoiding-relation", "subset-sum-facts", "odd-part-chains"],
      body: String.raw`What is the largest subset of $\{1, \ldots, 20\}$ with no two elements adding to $21$? With no two differing by $3$? With no element dividing another? And what is the total of the sums of all the subsets of $\{1, \ldots, 5\}$? These questions are about the subsets themselves, not just how many there are.

[[subset-avoiding-relation|A subset that avoids a relation]] is organized by the relation. A forbidden sum $s$ splits the set into pairs $\{a, s - a\}$, and a good subset takes at most one from each pair: from $\{1, \ldots, 20\}$ with sum $21$ the pairs are $\{1, 20\}, \ldots, \{10, 11\}$, so at most $10$ elements, and $\{1, \ldots, 10\}$ achieves it. The same pairs count the good subsets: each pair contributes none, one or the other, so $\{1, \ldots, 8\}$ with sum $9$ has $3^4 = 81$ good subsets. A forbidden difference $d$ splits the set into chains $a, a + d, a + 2d, \ldots$, and a good subset never takes two neighbors in a chain, so a chain of length $\ell$ gives at most $\lceil \ell / 2 \rceil$. From $\{1, \ldots, 10\}$ with difference $3$ the chains are $1, 4, 7, 10$ and $2, 5, 8$ and $3, 6, 9$, so at most $2 + 2 + 2 = 6$.

[[odd-part-chains|Odd-part chains]] do this for divisibility. Writing each number as $2^a m$ with $m$ odd puts the numbers up to $n$ into one chain per odd number $m$, namely $m, 2m, 4m, \ldots$, and along a chain each number divides the next. A set with no element dividing another takes at most one from each chain, so a subset of $\{1, \ldots, 12\}$ has at most $6$ such elements, one per odd number $1, 3, 5, 7, 9, 11$; the numbers $7, 8, 9, 10, 11, 12$ show that $6$ is reached. When the answer is a largest set, both halves are needed: the groups give the bound, and an example meets it.

[[subset-sum-facts|The subset-sum facts]] count by elements instead of by subsets. Each element of an $n$-element set lies in exactly half of the $2^n$ subsets, so the subset sums add to $2^{n-1}$ times the total: for $\{1, \ldots, 5\}$, $2^4 \cdot 15 = 240$. And when the set has an odd element, adding or removing it changes the parity of the sum, so exactly half the subsets have an even sum: $2^9 = 512$ of the subsets of $\{1, \ldots, 10\}$.

Find the groups the relation makes (pairs, chains or odd-part chains), bound the set group by group, and then build a set that meets the bound. The next lesson draws the relation as a graph.`,
      related: [
        { card: "pairing-to-bound", note: String.raw`the same groups used as boxes for the pigeonhole principle (R7.4).` },
        { card: "non-adjacent-selection", note: String.raw`counting the subsets of a chain with no two neighbors (R3.3).` },
        { card: "double-counting", note: String.raw`adding the subset sums by elements instead of by subsets (R3.5).` }
      ],
      exercises: [
        { q: String.raw`What is the largest number of elements in a subset of $\{1, 2, \ldots, 20\}$ in which no two elements add to $21$?`, answer: "10",
          solution: String.raw`The pairs $\{1, 20\}, \{2, 19\}, \ldots, \{10, 11\}$ cover the set, and a good subset takes at most one from each of the $10$ pairs. The subset $\{1, \ldots, 10\}$ has no two elements adding to $21$, since its largest sum is $19$. So the answer is $10$.` },
        { q: String.raw`How many subsets of $\{1, 2, \ldots, 8\}$, including the empty set, have no two elements adding to $9$?`, answer: "81",
          solution: String.raw`The pairs adding to $9$ are $\{1, 8\}, \{2, 7\}, \{3, 6\}, \{4, 5\}$, and they cover the set. A good subset takes from each pair nothing, its smaller element or its larger element, independently: $3^4 = 81$.` },
        { q: String.raw`What is the largest number of elements in a subset of $\{1, 2, \ldots, 10\}$ in which no two elements differ by $3$?`, answer: "6",
          solution: String.raw`Difference $3$ links the chains $1, 4, 7, 10$ and $2, 5, 8$ and $3, 6, 9$, and a good subset takes no two neighbors in a chain: at most $2$, $2$ and $2$. So at most $6$, and $\{1, 2, 3, 7, 8, 9\}$, has no difference $3$.` },
        { q: String.raw`What is the largest number of elements in a subset of $\{1, 2, \ldots, 12\}$ in which no element divides another?`, answer: "6",
          solution: String.raw`Write each number as $2^a m$ with $m$ odd. The chains $\{1, 2, 4, 8\}$, $\{3, 6, 12\}$, $\{5, 10\}$, $\{7\}$, $\{9\}$, $\{11\}$ cover the set, and in each chain every number divides the next ones, so a good subset takes at most one from each: at most $6$. The set $\{7, 8, 9, 10, 11, 12\}$ works, since the smallest multiple of any of them, other than itself, is at least $14$.` },
        { q: String.raw`What is the sum of the sums of all $32$ subsets of $\{1, 2, 3, 4, 5\}$ (the empty set has sum $0$)?`, answer: "240",
          solution: String.raw`Each element lies in $2^4 = 16$ of the subsets, so it is added $16$ times. The total is $16(1 + 2 + 3 + 4 + 5) = 16 \cdot 15 = 240$.` }
      ],
      problems: [
        "2018 AMC 10A, Problem 17"
      ]
    },
    "R7.3": {
      prereq: ["permutations-combinations", "double-counting"],
      cards: ["handshake-lemma", "eulerian-paths", "round-robin-tournaments", "disconnected-graph-edges"],
      body: String.raw`Can $9$ people each shake hands with exactly $3$ others? Can a figure be drawn without lifting the pencil or retracing a line? How many games are won in all in a tournament? A graph, a set of points (vertices) and of lines joining pairs of them (edges), describes each of these, and a few facts about it settle them.

[[handshake-lemma|The handshake lemma]] says that the degrees, the number of edges at each vertex, add to twice the number of edges, since each edge has two ends. So a graph with $10$ vertices of degree $3$ has $\tfrac{30}{2} = 15$ edges, and the number of vertices of odd degree is always even. Nine people shaking $3$ hands each would give degrees adding to $27$, an odd number, so it cannot happen.

[[eulerian-paths|An Eulerian path]] traces every edge exactly once. In a connected graph, a closed tour exists exactly when every degree is even, and an open one exactly when two vertices have odd degree, and then it runs from one of them to the other: every pass through a vertex uses two of its edges, so only the ends can be odd. A figure with $2k$ odd vertices needs at least $k$ strokes, so one with $6$ odd vertices needs $3$.

[[round-robin-tournaments|A round-robin tournament]], in which each of $n$ teams plays every other team once, has $\binom n2$ games, and each game gives out one win, or one tie. So with no ties the wins add to $\binom n2$, and the average team wins $\tfrac{n-1}{2}$ games: with $8$ teams, $28$ wins in all and an average of $3.5$. Questions about records are settled by adding them up two ways, or by looking at the team with the most or the fewest wins.

[[disconnected-graph-edges|The most edges in a disconnected graph]] are $\binom{n-1}{2}$: a disconnected graph misses every edge across some split of its vertices, and the fewest edges across a split, $n - 1$, come from cutting off one vertex. So any graph on $8$ vertices with $\binom72 + 1 = 22$ edges is connected, and $21$ edges are not enough, as $7$ vertices joined in every way and one vertex alone show.

Draw the graph, add the degrees for the edge count and the parity, count the odd vertices for a tracing, and add a tournament's records two ways. The next lesson proves that something must exist.`,
      related: [
        { card: "handshakes-diagonals", note: String.raw`the $\binom n2$ handshakes or segments among $n$ points.` },
        { card: "graph-coloring", note: String.raw`coloring the vertices so that neighbors differ (R8.4).` },
        { card: "eulers-polyhedron-formula", note: String.raw`vertices, edges and faces of a solid, where the handshake count gives the edges.` }
      ],
      exercises: [
        { q: String.raw`A graph has $10$ vertices, each of degree $3$. How many edges does it have?`, answer: "15",
          solution: String.raw`The degrees add to $10 \cdot 3 = 30$, and each edge is counted at both its ends, so there are $\tfrac{30}{2} = 15$ edges.` },
        { q: String.raw`A connected figure has exactly $6$ points where an odd number of lines meet. What is the least number of strokes, none retracing a line, that draws it?`, answer: "3",
          solution: String.raw`Along one stroke every point other than its two ends is entered and left equally often, so each odd point is an end of some stroke. With $6$ odd points and $2$ ends per stroke, at least $3$ strokes are needed. And $3$ are enough: add $2$ extra lines, each joining two of the odd points, so that only $2$ odd points remain; the new figure has one tour through every line, and removing the $2$ extra lines cuts it into $3$ strokes.` },
        { q: String.raw`In a round-robin tournament of $8$ teams with no ties, how many games are won in all?`, answer: "28",
          solution: String.raw`Each pair of teams plays once, so there are $\binom82 = 28$ games, and each gives exactly one win: $28$.` },
        { q: String.raw`What is the least number $e$ such that every graph with $8$ vertices and $e$ edges, no two joining the same pair, is connected?`, answer: "22",
          solution: String.raw`A disconnected graph has its vertices split into two groups with no edge between them. With groups of sizes $k$ and $8 - k$ it has at most $\binom k2 + \binom{8-k}{2}$ edges, largest for $k = 1$ or $7$: $\binom72 = 21$. So $22$ edges force a connected graph, and the complete graph on $7$ vertices with one vertex left alone shows that $21$ do not.` }
      ],
      problems: [
        "2019 AMC 8, Problem 19",
        "2012 AMC 10B, Problem 15",
        "2023 AMC 10A, Problem 18",
        "2013 AMC 12B, Problem 12",
        "2016 AMC 10B, Problem 22",
        "2019 AMC 12B, Problem 10",
        "2009 AMC 12B, Problem 20",
        "2021 Fall AMC 12A, Problem 16"
      ]
    },
    "R7.4": {
      prereq: ["casework-method", "modular-basics"],
      cards: ["pigeonhole", "pairing-to-bound", "extremal-principle"],
      body: String.raw`How many integers must be chosen from $1$ to $100$ to be sure that two of them differ by a multiple of $7$? In a room of $100$ people, how many at least were born in the same month? How large can a subset of $\{1, \ldots, 30\}$ be with no two elements adding to $30$? Each question asks what is forced, however the choices are made.

[[pigeonhole|The pigeonhole principle]] says that $n$ objects in $k$ boxes put at least $\lceil \tfrac nk \rceil$ objects in some box. It proves that something exists without finding it, and the whole skill is choosing the boxes. For differences divisible by $7$, the boxes are the $7$ remainders mod $7$: two numbers in one box differ by a multiple of $7$, so $8$ numbers are enough, and $1, 2, \ldots, 7$ show that $7$ are not. For birthdays, $100$ people in $12$ months put at least $\lceil \tfrac{100}{12} \rceil = 9$ in some month, and $9$ is the best guarantee, since the months can hold $8$ or $9$ each. A "how many to be sure" answer always comes with a worst case one short of it.

[[pairing-to-bound|Pairing elements]] is the pigeonhole principle used for a bound. If the elements fall into groups, each of which a good subset meets at most once, then the subset is no larger than the number of groups. With no two elements adding to $30$ in $\{1, \ldots, 30\}$, the groups are the pairs $\{1, 29\}, \ldots, \{14, 16\}$ and the singletons $\{15\}$ and $\{30\}$, $16$ groups in all ($15 + 15 = 30$ is not two different elements), and $\{1, \ldots, 15\} \cup \{30\}$ meets the bound. The bound and the example together are the answer.

[[extremal-principle|The extremal principle]] starts from the most extreme object: the largest, the smallest, the first, the team with the most wins. Being extreme is a property no other object has, and a short argument about it often settles the whole problem. In a tournament with no ties, the team $T$ with the most wins beats every other team directly or through one other team: if some team $X$ beat $T$ and also beat every team that $T$ beat, then $X$ would have more wins than $T$, so $X$ lost to a team that $T$ beat.

Choose the boxes, and give the worst case one short of the answer; pair the elements to bound a set and build a set that meets the bound; and when stuck, look at the most extreme object. The next lesson attaches a color or a quantity to a process.`,
      related: [
        { card: "subset-avoiding-relation", note: String.raw`the pairs and chains that a forbidden sum or difference makes (R7.2).` },
        { card: "modular-basics", note: String.raw`remainders as the boxes for differences and sums.` },
        { card: "proof-by-cases", note: String.raw`the case split that finishes an extremal argument (R7.6).` }
      ],
      exercises: [
        { q: String.raw`How many integers must be chosen from $1, 2, \ldots, 100$ to be sure that two of them differ by a multiple of $7$?`, answer: "8",
          solution: String.raw`Two numbers differ by a multiple of $7$ exactly when they have the same remainder mod $7$. There are $7$ remainders, so among $8$ numbers two share one. The numbers $1, \ldots, 7$ have different remainders, so $7$ are not enough. The answer is $8$.` },
        { q: String.raw`There are $100$ people in a room. What is the largest $n$ for which it is certain that at least $n$ of them were born in the same month?`, answer: "9",
          solution: String.raw`If every month had at most $8$, there would be at most $96$ people, so some month has at least $9$. And $4$ months of $9$ and $8$ months of $8$ make $36 + 64 = 100$ with no month above $9$. So $n = 9$.` },
        { q: String.raw`What is the largest number of elements in a subset of $\{1, 2, \ldots, 30\}$ in which no two different elements add to $30$?`, answer: "16",
          solution: String.raw`The pairs $\{1, 29\}, \{2, 28\}, \ldots, \{14, 16\}$ are $14$ groups, and $15$ and $30$ are each alone, since no other element adds to $30$ with them. A good subset takes at most one from each pair, so at most $14 + 2 = 16$. The set $\{1, \ldots, 15, 30\}$ works: two of $1, \ldots, 15$ add to at most $29$, and $30$ plus anything exceeds $30$.` }
      ],
      problems: [
        "2005 AMC 8, Problem 16",
        "2010 AMC 10B, Problem 3",
        "2011 AMC 10B, Problem 11",
        "2025 AMC 8, Problem 16",
        "2019 AMC 10A, Problem 4",
        "2018 AMC 10B, Problem 14",
        "2006 AMC 10A, Problem 20",
        "2005 AMC 10B, Problem 25",
        "2012 AMC 12A, Problem 17"
      ]
    },
    "R7.5": {
      prereq: ["casework-method"],
      cards: ["coloring-arguments", "invariants-coloring"],
      body: String.raw`Can a chessboard with two opposite corners removed be covered by dominoes? The numbers $1$ to $10$ are on a board, and two at a time are replaced by their difference until one is left: can it be $0$? A point moves one unit up, down, left or right at each step: can it be back at the start after $7$ steps? Each answer is "no", and the proof is a quantity the moves cannot change.

[[coloring-arguments|A coloring argument]] gives every cell of a board a color so that each tile covers a fixed mix of colors. A domino always covers one black and one white square of a chessboard, so any region it tiles has equally many of each. Removing two opposite corners removes two squares of one color, leaving $30$ of one and $32$ of the other, so no tiling exists. Colorings also count: a $7 \times 7$ board with black corners and alternating colors has $25$ black squares, the cells $(i, j)$ with $i + j$ even, and a set of marked cells that every tile must touch gives a lower bound on the number of tiles. The coloring is chosen to fit the tile: stripes for $1 \times 4$ tiles, a checkerboard for dominoes.

[[invariants-coloring|An invariant]] is a quantity that no move changes. Every reachable state shares its starting value, so a state with any other value is out of reach. Replacing $a$ and $b$ by $|a - b|$ changes the total by $a + b - |a - b|$, twice the smaller number, an even amount, so the parity of the total never changes. The total of $1$ to $10$ is $55$, which is odd, so the last number is odd and cannot be $0$. For the moving point, each step changes $x + y$ by $1$, so after $7$ steps $x + y$ is odd and the point cannot be at the origin; after $3$ steps it can be at exactly the $16$ points with $|x| + |y|$ equal to $1$ or $3$. Parity, a remainder, a sum or a coloring are the usual invariants; the one to use is found by asking what each move does to a few candidates.

Color the board to fit the tiles, and find a quantity each move preserves; compare its value at the start with its value at the target. The next lesson reasons from statements instead of numbers.`,
      related: [
        { card: "tiling-a-board", note: String.raw`tilings that can be counted, by a recursion on the end (R5.2).` },
        { card: "modular-basics", note: String.raw`remainders, the usual invariants of a number process.` },
        { card: "pigeonhole", note: String.raw`marked cells as boxes that every tile must meet (R7.4).` }
      ],
      exercises: [
        { q: String.raw`A $7 \times 7$ board is colored like a chessboard, with black squares in the corners. How many squares are black?`, answer: "25",
          solution: String.raw`Number the rows and columns $1$ to $7$; a square is black when its row and column have the same parity. Rows $1, 3, 5, 7$ have $4$ black squares each ($16$), and rows $2, 4, 6$ have $3$ each ($9$): $25$.` },
        { q: String.raw`The numbers $1, 2, \ldots, 10$ are written on a board. A move erases two numbers $a$ and $b$ and writes $|a - b|$. After $9$ moves one number is left. What is its remainder when divided by $2$?`, answer: "1",
          solution: String.raw`A move changes the total by $a + b - |a - b| = 2\min(a, b)$, an even number, so the parity of the total never changes. The total starts at $55$, which is odd, so the last number is odd: remainder $1$.` },
        { q: String.raw`A point starts at the origin and at each step moves one unit up, down, left or right. At how many different points can it be after exactly $3$ steps?`, answer: "16",
          solution: String.raw`Each step changes $x + y$ by $\pm 1$, so after $3$ steps $x + y$ is odd, and $|x| + |y| \le 3$. So $|x| + |y|$ is $1$ or $3$: $4$ points with $|x| + |y| = 1$ and $12$ with $|x| + |y| = 3$. Each is reached (go out and, if needed, step back and forth), so $16$.` }
      ],
      problems: [
        "2012 AMC 10A, Problem 14",
        "2024 AMC 8, Problem 7",
        "2000 AMC 10, Problem 17",
        "2016 AMC 10A, Problem 13",
        "2016 AMC 10B, Problem 15",
        "2023 AMC 10B, Problem 10",
        "2006 AMC 12B, Problem 18",
        "2015 AMC 10B, Problem 20"
      ]
    },
    "R7.6": {
      prereq: ["casework-method"],
      cards: ["truth-tellers-logic", "magic-squares", "proof-by-cases", "wlog-symmetry"],
      body: String.raw`Three people each always tell the truth or always lie, and each makes a statement about the others: who is truthful? The numbers $1$ to $16$ fill a $4 \times 4$ grid with equal row and column sums: what is the sum? Is $n^2 + 1$ ever a multiple of $3$? These are settled by reasoning in cases, cut down by what the problem forces.

[[truth-tellers-logic|Logical deduction]] tests each guess against every statement. A truth-teller's statement is true and a liar's is false, so a guess about who is truthful either agrees with all the statements or contradicts one. Suppose $A$ says "$B$ is a liar", $B$ says "$A$ and $C$ are the same kind", and $C$ says "$A$ is a liar". If $A$ is truthful, then $B$ lies, so $A$ and $C$ differ, so $C$ lies, and $C$'s statement is indeed false: consistent. If $A$ lies, then $B$ is truthful, so $C$ is a liar like $A$, but then $C$'s statement "$A$ is a liar" would be true: a contradiction. So only $A$ is truthful. Start from the statement that refers to the most people, or from a guess that is quickly refuted.

[[magic-squares|A magic square]] has equal sums along every row and column (and both diagonals). The rows hold every entry once, so the magic sum is the total divided by the number of rows: for $1$ to $16$ in a $4 \times 4$ grid, $\tfrac{136}{4} = 34$. In a $3 \times 3$ square the four lines through the center add to $4$ times the magic sum, which is the total plus $3$ times the center, so the center is a third of the magic sum: $5$ for the numbers $1$ to $9$.

[[proof-by-cases|A proof by cases]] splits the possibilities into a few groups and settles each. A number $n$ is $0$, $1$ or $2$ mod $3$, so $n^2$ is $0$, $1$ or $1$, and $n^2 + 1$ is $1$, $2$ or $2$: never a multiple of $3$. The skill is the split; a good one makes each case a line. [[wlog-symmetry|Without loss of generality]] removes cases that a relabeling turns into one another. The six numbers formed from $1$, $2$, $3$ treat the digits alike, so each digit appears twice in each place, and their sum is $2 \cdot 6 \cdot 111 = 1332$ without listing them. Check that the symmetry is really there before using it.

Test each guess against every statement, total a magic square by its rows, split by remainders or by the size of the objects, and let a symmetry choose one case. The next lesson proves a statement by proving its contrapositive.`,
      related: [
        { card: "contrapositive", note: String.raw`proving "if $P$ then $Q$" as "if not $Q$ then not $P$" (R7.7).` },
        { card: "casework-method", note: String.raw`counting by cases that do not overlap (R1.5).` },
        { card: "modular-basics", note: String.raw`remainders as the cases of a number argument.` }
      ],
      exercises: [
        { q: String.raw`Each of $A$, $B$ and $C$ always tells the truth or always lies. $A$ says, "$B$ is a liar." $B$ says, "$A$ and $C$ are the same kind." $C$ says, "$A$ is a liar." How many of the three tell the truth?`, answer: "1",
          solution: String.raw`If $A$ lies, $B$ tells the truth, so $C$ is the same kind as $A$, a liar; but then $C$'s statement "$A$ is a liar" is true, a contradiction. So $A$ tells the truth, and $B$ lies. Then $A$ and $C$ differ, so $C$ lies, and "$A$ is a liar" is indeed false. Only $A$ tells the truth: $1$.` },
        { q: String.raw`The numbers $1, 2, \ldots, 16$ fill a $4 \times 4$ grid so that every row and every column has the same sum. What is that sum?`, answer: "34",
          solution: String.raw`The four rows together hold every number once, so they add to $1 + \cdots + 16 = 136$, and each row has $\tfrac{136}{4} = 34$.` },
        { q: String.raw`For how many integers $n$ from $1$ to $30$ is $n^2 + 1$ divisible by $3$?`, answer: "0",
          solution: String.raw`Split by $n \bmod 3$. If $n \equiv 0$, $n^2 + 1 \equiv 1$; if $n \equiv 1$ or $2$, $n^2 \equiv 1$ and $n^2 + 1 \equiv 2$. In no case is it $0$, so none.` },
        { q: String.raw`What is the sum of the six three-digit numbers whose digits are $1$, $2$ and $3$ in some order?`, answer: "1332",
          solution: String.raw`The digits play the same part, so each appears in each place in $2$ of the $6$ numbers. Each place then adds to $2(1 + 2 + 3) = 12$, and the sum is $12 \cdot 111 = 1332$.` }
      ],
      problems: [
        "2004 AMC 8, Problem 11",
        "2022 AMC 8, Problem 20",
        "2013 AMC 10A, Problem 6",
        "2018 AMC 10A, Problem 5",
        "2010 AMC 10A, Problem 15",
        "2015 AMC 10B, Problem 6",
        "2001 AMC 10, Problem 22",
        "2005 AMC 10B, Problem 20",
        "2025 AMC 10A, Problem 8"
      ]
    },
    "R7.7": {
      prereq: ["truth-tellers-logic"],
      cards: ["contrapositive"],
      body: String.raw`"Anyone who gets every question right gets an A." Does it follow that someone who got a B missed a question? That someone who got an A got every question right? A statement "if $P$ then $Q$" has three relatives, and only one of them means the same thing.

[[contrapositive|The contrapositive]] of "if $P$ then $Q$" is "if not $Q$ then not $P$", and the two are equivalent: each says that $P$ never happens without $Q$. So "everyone with all answers right gets an A" means the same as "anyone without an A missed a question". The converse, "if $Q$ then $P$", and the inverse, "if not $P$ then not $Q$", are a different statement from the original (they are each other's contrapositive), so neither follows from it: an A may come with a missed question.

The contrapositive is also a way of proving things. To prove "if $n^2$ is even then $n$ is even", prove instead "if $n$ is odd then $n^2$ is odd": an odd $n$ is $2k + 1$, and $n^2 = 4k^2 + 4k + 1$ is odd. The switch helps whenever "not $Q$" gives something to build with. To show that $a + b \ge 100$ forces $a \ge 50$ or $b \ge 50$, assume both are less than $50$, and then $a + b \lt 100$. In the same way, the negation of "all" is "some not", and of "some" is "none": the negation of "every school sold more than $100$ shirts" is "some school sold at most $100$".

To test whether a statement follows, rewrite the given one as its contrapositive and compare; to prove one, try assuming the conclusion fails. The Summary follows.`,
      related: [
        { card: "truth-tellers-logic", note: String.raw`deduction from statements that must all hold (R7.6).` },
        { card: "proof-by-contradiction", note: String.raw`assuming the whole statement false, not only the conclusion.` }
      ],
      exercises: [
        { q: String.raw`Which of these follows from "if it rains, the game is canceled"? (a) If the game is canceled, it rained. (b) If it does not rain, the game is played. (c) If the game is played, it did not rain.`,
          solution: String.raw`Statement (c) is the contrapositive, "if not canceled then not raining", and is equivalent to the original. Statement (a) is the converse and (b) the inverse; the game might be canceled for another reason, so neither follows. Only (c) follows.` },
        { q: String.raw`Prove that if $a + b \ge 100$ for real numbers $a$ and $b$, then $a \ge 50$ or $b \ge 50$.`,
          solution: String.raw`Prove the contrapositive: if $a \lt 50$ and $b \lt 50$, then $a + b \lt 50 + 50 = 100$, so $a + b \ge 100$ fails. Since the contrapositive is equivalent to the statement, the statement holds.` },
        { q: String.raw`Prove that if $n^2$ is even, then $n$ is even.`,
          solution: String.raw`Prove the contrapositive: if $n$ is odd, then $n^2$ is odd. Write $n = 2k + 1$; then $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$, which is odd.` }
      ],
      problems: [
        "2017 AMC 10A, Problem 6",
        "2021 Spring AMC 10A, Problem 7",
        "2022 AMC 10B, Problem 11"
      ]
    },
    "R7.8": {
      prereq: ["subset-avoiding-relation", "subset-sum-facts", "odd-part-chains", "handshake-lemma", "eulerian-paths", "round-robin-tournaments", "disconnected-graph-edges", "pigeonhole", "pairing-to-bound", "extremal-principle", "coloring-arguments", "invariants-coloring", "truth-tellers-logic", "magic-squares", "proof-by-cases", "wlog-symmetry", "contrapositive"],
      cards: [],
      body: String.raw`[[subset-avoiding-relation|A subset avoiding a relation]] is bounded group by group, by pairs or chains, and [[odd-part-chains|odd-part chains]] do this for divisibility. [[subset-sum-facts|The subset-sum facts]] count each element in half the subsets.

[[handshake-lemma|The handshake lemma]] makes the degrees add to twice the edges; [[eulerian-paths|an Eulerian path]] needs zero or two odd vertices; [[round-robin-tournaments|a round robin]] has $\binom n2$ games; and [[disconnected-graph-edges|more than $\binom{n-1}{2}$ edges]] connect a graph.

[[pigeonhole|The pigeonhole principle]], [[pairing-to-bound|pairing]] and [[extremal-principle|the extremal principle]] prove that something must exist. [[coloring-arguments|Colorings]] and [[invariants-coloring|invariants]] prove that something cannot happen.

[[truth-tellers-logic|Logical deduction]] tests guesses against statements, [[magic-squares|a magic square]] is totaled by its rows, [[proof-by-cases|cases]] and [[wlog-symmetry|symmetry]] organize an argument, and [[contrapositive|the contrapositive]] is the one equivalent form of an implication.`,
      strategies: [
        String.raw`For a largest set, bound it by groups and then build a set that meets the bound.`,
        String.raw`For "how many to be sure", choose the boxes and show the worst case one short.`,
        String.raw`Add the degrees, or a tournament's records, two ways.`,
        String.raw`To prove something impossible, find a coloring or a quantity that every move preserves.`,
        String.raw`Test each guess about who is truthful against every statement.`,
        String.raw`Let a symmetry choose one case, after checking that the symmetry is there.`,
        String.raw`Rewrite an implication as its contrapositive before deciding what follows.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many integers must be chosen from $1, 2, \ldots, 20$ to be sure that two of them add to $21$?`, answer: "11",
        solution: String.raw`The pairs $\{1, 20\}, \ldots, \{10, 11\}$ are $10$ boxes, so $11$ numbers put two in one pair, and those add to $21$. The numbers $1, \ldots, 10$ have no such pair, so $10$ are not enough.` },
      { q: String.raw`A graph has $6$ vertices with degrees $1, 2, 2, 3, 3, 3$. How many edges does it have?`, answer: "7",
        solution: String.raw`The degrees add to $14$, twice the number of edges, so there are $7$ edges.` },
      { q: String.raw`Ten people stand in a circle, each a knight, who always tells the truth, or a knave, who always lies. Each says, "The person on my left is a knave." How many are knights?`, answer: "5",
        solution: String.raw`A knight's left neighbor is a knave. A knave's statement is false, so a knave's left neighbor is a knight. So the kinds alternate around the circle, which works since $10$ is even, and there are $5$ knights.` },
      { q: String.raw`What is the sum of the sums of all subsets of $\{1, 2, \ldots, 10\}$?`, answer: "28160",
        solution: String.raw`Each element lies in $2^9 = 512$ subsets, so the total is $512(1 + \cdots + 10) = 512 \cdot 55 = 28160$.` }
    ],
    problems: [
      "2000 AMC 10, Problem 21",
      "2011 AMC 10B, Problem 8",
      "2023 AMC 10A, Problem 16",
      "2012 AMC 10B, Problem 11",
      "2009 AMC 10A, Problem 22",
      "2022 AMC 10A, Problem 12"
    ]
  },
  challenge: {
    problems: [
      "2022 AMC 10B, Problem 14",
      "2024 AMC 10B, Problem 16",
      "2021 Fall AMC 10B, Problem 23",
      "2025 AMC 10A, Problem 21",
      "1986 AIME, Problem 12"
    ]
  }
};
