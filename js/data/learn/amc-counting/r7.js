// Learn, AMC Counting & Probability, chapter R7: sets, graphs and logic (CONVENTIONS §14). Part: Core topics.
// Extremal constructions, graph conditions, invariants and complete logical arguments.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R7"] = {
  lessons: {
    "R7.1": {
      prereq: ["casework-method", "permutations-combinations"],
      cards: [],
      body: String.raw`A counting problem may ask for a largest possible set, a guaranteed repetition, or whether a configuration exists at all. Such questions require different kinds of proof. A maximum needs both an upper bound and an example attaining it. A guarantee needs a reason every allowed choice works and, when the threshold is claimed to be smallest, an example showing that one fewer can fail.

For socks of three colors, three draws can give one of each color. Four draws must repeat a color, because three color classes cannot each contain at most one of four socks. The conclusion is a guarantee, independent of random probabilities. For five teams playing each other once, the games instead correspond to the ten unordered pairs of teams, so there are $\binom52=10$ games whatever their results.

Logical puzzles have their own consistency requirement. Suppose each person is either always truthful or always lying, $A$ says that $B$ is a liar, and $B$ says that both are liars. A truthful $B$ would make a true claim that $B$ is a liar, a contradiction. Hence $B$ lies. The claim that both lie is false, forcing $A$ to be truthful; $A$'s statement then checks. A candidate assignment must satisfy every speaker's rule, not just one convenient statement.

This chapter develops sets avoiding relations, graph models, pigeonhole bounds, extremal choices, colorings, invariants and logical implications. Each method organizes possibilities so that a proof can account for all of them. The distinction between ruling a possibility out and constructing it will matter throughout.`,
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
      body: String.raw`A relation on a finite set tells us which selections may coexist. For a [[subset-avoiding-relation|subset avoiding a relation]], first describe the conflicts precisely. “No two distinct elements sum to twenty-one” forbids a different condition from “the sum of any two, possibly equal, is outside the set.” The first can be organized into fixed complementary pairs; the second also depends on which sums are selected.

In $\{1,\ldots,20\}$, the pairs $\{1,20\},\{2,19\},\ldots,\{10,11\}$ partition the ground set. A subset with no pair summing to twenty-one takes at most one from each pair, so has at most ten elements. The subset $\{1,\ldots,10\}$ attains ten, since even its largest two distinct elements sum to nineteen. For $\{1,\ldots,8\}$ with forbidden sum nine, the four pairs each offer three choices: neither element, the smaller, or the larger. Every valid subset corresponds to one such independent choice per pair, giving $3^4=81$.

Complementary pairs form a partition only after we check the ground set. An element whose partner lies outside it is unrestricted by that pairing. If the forbidden sum is even, its half is not forbidden by itself when two distinct elements are required. These leftover elements must be handled separately.

A forbidden positive difference $d$ instead splits integers into chains with that step size. Adjacent entries in a chain differ by $d$, while entries in different chains cannot. Pair successive positions in a chain of length $\ell$, leaving one singleton if needed. At most one position from each pair may be selected, so the maximum is $\lceil\ell/2\rceil$. Alternating positions attain it. For difference three on $\{1,\ldots,10\}$, the chain lengths are four, three and three, giving maximum $2+2+2=6$. The set $\{1,2,3,7,8,9\}$ works.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280" role="img" aria-label="chains" style="width:100%;max-width:520px;height:auto"><g stroke="currentColor" fill="none" opacity=".5"><path d="M100 70H400M100 135H300M100 200H300"/></g><g fill="currentColor" font-size="20" text-anchor="middle"><circle cx="100" cy="70" r="21" fill="var(--bg, Canvas)"/><text x="100" y="77">1</text><circle cx="200" cy="70" r="21" fill="var(--bg, Canvas)"/><text x="200" y="77">4</text><circle cx="300" cy="70" r="21" fill="var(--bg, Canvas)"/><text x="300" y="77">7</text><circle cx="400" cy="70" r="21" fill="var(--bg, Canvas)"/><text x="400" y="77">10</text><circle cx="100" cy="135" r="21" fill="var(--bg, Canvas)"/><text x="100" y="142">2</text><circle cx="200" cy="135" r="21" fill="var(--bg, Canvas)"/><text x="200" y="142">5</text><circle cx="300" cy="135" r="21" fill="var(--bg, Canvas)"/><text x="300" y="142">8</text><circle cx="100" cy="200" r="21" fill="var(--bg, Canvas)"/><text x="100" y="207">3</text><circle cx="200" cy="200" r="21" fill="var(--bg, Canvas)"/><text x="200" y="207">6</text><circle cx="300" cy="200" r="21" fill="var(--bg, Canvas)"/><text x="300" y="207">9</text></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="260" y="26">Difference three links neighboring chain entries.</text><text x="260" y="252">Take alternating positions: at most 2 + 2 + 2 = 6.</text></g></svg>

For divisibility, [[odd-part-chains|odd-part chains]] group each positive integer uniquely as $2^a m$ with $m$ odd. In a fixed chain $m,2m,4m,\ldots$, any smaller member divides every larger member, so a divisibility-free subset takes at most one. There are $\lceil n/2\rceil$ odd parts up to $n$. The upper interval $\{\lfloor n/2\rfloor+1,\ldots,n\}$ has that many elements and no divisibility pair: a multiple at least twice a selected element exceeds $n$. Thus this upper bound is attained.

For $n=12$ the six chains are $\{1,2,4,8\}$, $\{3,6,12\}$, $\{5,10\}$, $\{7\}$, $\{9\}$ and $\{11\}$, and $\{7,8,9,10,11,12\}$ attains six. Taking arbitrary representatives of different chains does not necessarily work: three divides nine although they have different odd parts. The chains prove the bound; the separate construction proves attainability.

[[subset-sum-facts|Subset-sum identities]] count contributions rather than conflicts. For a set of $n\ge1$ numbers, each element occurs in $2^{n-1}$ subsets because every other element is freely included or excluded. Consequently all subset sums together total $2^{n-1}$ times the sum of the elements. For $\{1,\ldots,5\}$ this is $16\cdot15=240$. The empty subset contributes zero.

If an integer set contains an odd element, toggling that element reversibly pairs even-sum subsets with odd-sum subsets. It changes the sum parity and is its own inverse, so exactly half of the $2^n$ subsets have each parity. For $\{1,\ldots,10\}$ there are $2^9=512$ even-sum subsets. Without an odd element every subset sum is even, so that assumption cannot be dropped.`,
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
          solution: String.raw`Difference $3$ links the chains $1, 4, 7, 10$ and $2, 5, 8$ and $3, 6, 9$, and a good subset takes no two neighbors in a chain: at most $2$, $2$ and $2$. So at most $6$, and $\{1, 2, 3, 7, 8, 9\}$ has no difference $3$.` },
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
      body: String.raw`A graph records objects as vertices and relations as edges. Here graphs are finite and undirected; unless stated otherwise they are simple, meaning no loops and at most one edge per unordered pair of vertices. A handshake joins two different people, so a handshake graph fits this model. A road network can have parallel roads, but they must then be treated as separate edges.

The degree of a vertex counts incident edge ends. Summing degrees counts each edge twice, proving [[handshake-lemma|the handshake lemma]]:

$$\sum_v\deg(v)=2E.$$

Thus ten vertices of degree three give fifteen edges. Also the number of odd-degree vertices is even, because a sum of integers is even only when it has an even number of odd summands. Nine people each shaking three hands would give total degree twenty-seven, so such a handshake pattern is impossible. An even degree sum is necessary for a proposed simple-graph degree list, but is not by itself sufficient to realize it.

An [[eulerian-paths|Euler trail]] uses every edge exactly once; vertices may repeat. Ignore isolated vertices and require all vertices incident to an edge to lie in one connected component. In a closed trail, every arrival is paired with a departure, so all degrees are even. In a trail with different endpoints, only those two endpoints have odd degree.

These conditions are sufficient as well. In a connected graph with all degrees even and at least one edge, start at any vertex and follow unused edges until no continuation is available. You cannot stop away from the start: at such a vertex arrivals and departures have used an odd number of its incident ends, so an even total degree would leave an unused departure. The resulting trail therefore closes. If edges remain, connectivity provides a vertex of the existing trail incident to unused edges. Build another closed trail there and insert it into the first. Repeating consumes all edges.

With exactly two odd vertices, temporarily add an edge between them. The augmented graph has even degrees and hence a closed Euler tour. Cutting out the added edge gives an open Euler trail between the two odd vertices. The temporary edge may be parallel to an existing edge; the construction treats them as distinct. This proves existence, not just a necessary parity test.

A connected figure with $2k\gt0$ odd vertices requires at least $k$ strokes with no retraced edge, since each odd vertex must be an endpoint of some stroke. Pair the odd vertices and add $k$ temporary edges, producing an even-degree graph. Cut a closed Euler tour at those temporary edges to obtain at most $k$ strokes. The lower bound makes the minimum exactly $k$. With no odd vertices and at least one edge, one closed stroke suffices, rather than zero. Disconnected edge-containing components must be handled separately.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280" role="img" aria-label="strokes" style="width:100%;max-width:520px;height:auto"><g stroke="currentColor" stroke-width="2" fill="none"><path d="M100 65L260 140L420 215"/><path d="M100 140H420" stroke-dasharray="6 4"/><path d="M100 215L260 140L420 65" stroke-dasharray="2 4"/></g><g fill="currentColor"><circle cx="100" cy="65" r="4"/><circle cx="100" cy="140" r="4"/><circle cx="100" cy="215" r="4"/><circle cx="420" cy="65" r="4"/><circle cx="420" cy="140" r="4"/><circle cx="420" cy="215" r="4"/><circle cx="260" cy="140" r="4"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="260" y="26">Six odd leaves, three strokes through one even center.</text><text x="260" y="252">Each stroke pairs two odd endpoints; no edge repeats.</text></g></svg>

In a [[round-robin-tournaments|round robin]] with $n$ teams and no ties, each pair plays once. There are $\binom n2$ games, each contributing one win and one loss across the records. Hence total wins are $\binom n2$ and mean wins are $(n-1)/2$. For eight teams these are twenty-eight and $3.5$. If ties are allowed, one game can contribute two drawn results instead of a win and a loss; a scoring rule must then be accounted for explicitly.

For a simple graph on $n\ge2$ vertices, a disconnected graph has a nonempty split with no crossing edges. If the split sizes are $k,n-k$, at least $k(n-k)$ of the $\binom n2$ possible edges are absent. Since

$$k(n-k)-(n-1)=(k-1)(n-k-1)\ge0,$$

the [[disconnected-graph-edges|maximum disconnected edge count]] is $\binom n2-(n-1)=\binom{n-1}2$. A complete graph on $n-1$ vertices plus an isolated vertex attains it. For eight vertices, twenty-two edges force connectivity, while twenty-one need not. This threshold does not apply unchanged to multigraphs, where parallel edges can accumulate inside a small component.`,
      related: [
        { card: "handshakes-diagonals", note: String.raw`the $\binom n2$ handshakes or segments among $n$ points.` },
        { card: "graph-coloring", note: String.raw`coloring the vertices so that neighbors differ (R8.4).` },
        { card: "eulers-polyhedron-formula", note: String.raw`vertices, edges and faces of a solid, where the handshake count gives the edges.` }
      ],
      exercises: [
        { q: String.raw`A finite undirected graph has $10$ vertices, each of degree $3$. How many edges does it have?`, answer: "15",
          solution: String.raw`The degrees add to $10 \cdot 3 = 30$, and each edge is counted at both its ends, so there are $\tfrac{30}{2} = 15$ edges.` },
        { q: String.raw`A connected figure has exactly $6$ points where an odd number of lines meet. What is the least number of strokes, none retracing a line, that draws it?`, answer: "3",
          solution: String.raw`Along one stroke every point other than its two ends is entered and left equally often, so each odd point is an end of some stroke. With $6$ odd points and $2$ ends per stroke, at least $3$ strokes are needed. Three are also sufficient. Pair the six odd points and add three temporary edges joining the pairs. All degrees are now even, and the connected graph has a closed Euler tour. Removing the temporary edges cuts the tour into at most three strokes using only original edges. The lower bound of three makes the minimum exactly three.` },
        { q: String.raw`In a round-robin tournament of $8$ teams with no ties, how many games are won in all?`, answer: "28",
          solution: String.raw`Each pair of teams plays once, so there are $\binom82 = 28$ games, and each gives exactly one win: $28$.` },
        { q: String.raw`What is the least number $e$ such that every simple undirected graph with $8$ vertices and $e$ edges, is connected?`, answer: "22",
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
      body: String.raw`A guarantee must hold for every allowed arrangement. The [[pigeonhole|pigeonhole principle]] states that $n$ objects assigned to $k\ge1$ boxes put at least $\lceil n/k\rceil$ objects in some box. Otherwise each box would contain at most $\lceil n/k\rceil-1$, and the total would be smaller than $n$. The argument proves existence without locating the crowded box.

Choose boxes that encode the desired relation. Two integers have difference divisible by seven exactly when they have the same remainder modulo seven. There are seven remainder classes, so eight chosen integers force a pair. Seven do not, as the distinct numbers one through seven demonstrate. In a room of one hundred people, twelve birth-month classes force a class of at least nine. That guarantee is sharp: four months may have nine people and the other eight months eight, totaling one hundred with none above nine.

Finite capacities can refine the worst case. If color $i$ occurs only $c_i$ times, the most draws avoiding $r$ of one color is $\sum_i\min(c_i,r-1)$. If some color has at least $r$ objects, one more draw forces the threshold. If no color has that many, no number of draws can produce it. This capacity check prevents treating a small color class as an unlimited box.

[[pairing-to-bound|Pairing to bound]] constructs boxes for an extremal subset. For the ground set $\{1,\ldots,30\}$ with no two distinct elements summing to thirty, there are fourteen conflicting pairs $\{1,29\},\ldots,\{14,16\}$. Fifteen is unpaired because it would require a second copy of itself, and thirty would need zero, outside the ground set. Thus a valid subset has at most $14+2=16$ elements. The set $\{1,\ldots,15,30\}$ attains this bound. The conditions on distinctness and the ground set explain both singletons.

The [[extremal-principle|extremal principle]] selects an object maximizing or minimizing a useful quantity in a finite nonempty collection. Such an object need not be unique; choose any maximizer. Its useful property is the inequality comparing it with every competitor, not uniqueness.

For a no-tie round robin, choose a team $T$ with the most wins. We claim every other team is beaten by $T$ either directly or through one intermediate team. Let $X$ be a team that beats $T$. If no team beaten by $T$ beats $X$, then $X$ beats every team that $T$ beats, as well as $T$ itself. That gives $X$ at least one more win than $T$, contradicting maximality. Therefore some $Y$ satisfies $T\to Y\to X$. This proves the claim even if several teams tie for maximum wins.

A finite extremal argument may be paired with a construction, a parity condition or another pigeonhole step. The important step is to state exactly what the chosen maximum or minimum forbids, rather than assuming an object is special merely because it was selected.`,
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
      body: String.raw`A coloring can reveal a restriction obeyed by every tile or move. On a checkerboard, a domino covers one square of each color. Any tiled region must therefore contain equal color totals. Removing two opposite corners of an ordinary $8\times8$ board removes two squares of the same color, leaving thirty of that color and thirty-two of the other. Hence no domino tiling exists.

[[coloring-arguments|Coloring arguments]] prove necessary conditions, which may not be sufficient. Equal black and white totals alone do not guarantee a tiling of an arbitrary region; for example, disconnected isolated squares of opposite colors cannot be covered by a domino. A coloring should be checked against every permitted tile orientation before it is used.

The colors can also be counted directly. In a $7\times7$ board with black corners, rows one, three, five and seven each have four black cells, while rows two, four and six have three. The total is $4\cdot4+3\cdot3=25$. More generally, marking a set of cells that each tile can cover at most $c$ times gives a lower bound of $\lceil M/c\rceil$ tiles to cover $M$ marked cells, when $c\gt0$. To attain a claimed minimum one still needs an actual tiling.

An [[invariants-coloring|invariant]] is a quantity unchanged by every legal move. Compare it at the initial state and the target. If their values differ, the target is unreachable. If their values agree, further obstructions may remain; agreement alone is not an existence proof.

For nonnegative integers on a board, replace two numbers $a,b$ by $|a-b|$. The sum decreases by

$$a+b-|a-b|=2\min(a,b),$$

an even amount. The sum itself changes, but its parity is invariant. Starting from $1,2,\ldots,10$ gives total fifty-five, so after nine replacements the last number is odd and cannot be zero. The process has a changing number of entries, yet the same parity applies at every stage.

A unit grid walk instead flips the parity of $x+y$ on every step; that parity is not invariant by itself. If $t$ is the number of steps, $x+y-t$ is invariant modulo two. Starting at the origin therefore requires $x+y\equiv t\pmod2$, and the distance bound gives $|x|+|y|\le t$.

These two necessary conditions are also sufficient for this particular walk: take a shortest route of length $d=|x|+|y|$, then use the remaining $t-d$ steps in pairs going along an edge and back. The parity condition makes $t-d$ even. After three steps the possible distances are one and three. The corresponding diamond boundaries have four and twelve lattice points, totaling sixteen. After seven steps a return to the origin is impossible because the parity is wrong.`,
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
      body: String.raw`In a truth-teller puzzle, assigning types determines the required truth values of statements. A truthful speaker must make a true statement; a liar must make a false one. [[truth-tellers-logic|Logical deduction]] checks these constraints together. There may be no consistent assignment, one, or several; a conclusion is forced only if every consistent assignment supports it.

Suppose $A$ says that $B$ is a liar, $B$ says that $A$ and $C$ are the same kind, and $C$ says that $A$ is a liar. If $A$ lies, the first statement forces $B$ truthful; then the second forces $C$ to be a liar like $A$. But $C$ would then be making the true statement that $A$ lies, a contradiction. Thus $A$ is truthful and $B$ lies. The false second statement makes $A,C$ different kinds, so $C$ lies, and the third statement is indeed false. This assignment satisfies all three constraints.

[[magic-squares|Magic-square constraints]] can be added in different ways to expose an unknown. If an $n\times n$ grid has common row sum $M$, summing all rows gives total $nM$, so $M$ is the total divided by $n$. For entries one through sixteen the total is $136$, giving row sum thirty-four. This argument does not need diagonal conditions.

A $3\times3$ magic square with both diagonals also summing to $M$ has an additional relation. Add its middle row, middle column and two diagonals. Every noncentral cell is counted once and the center $c$ four times, so the sum is the total plus $3c$. Since the total is $3M$, this gives $4M=3M+3c$, hence $c=M/3$. The remaining cells occur in opposite pairs totaling $M-c=2c$. For entries one through nine, $M=15$ and $c=5$. Without the diagonal conditions the four-line argument is unavailable.

[[proof-by-cases|Proof by cases]] needs an exhaustive split. For any integer $n$, its remainder modulo three is zero, one or two. Its square has remainder zero, one or one, so $n^2+1$ has remainder one or two and is never divisible by three. Unlike disjoint cases used for counting, logical cases may overlap provided together they exhaust the possibilities and each establishes the conclusion.

[[wlog-symmetry|Without loss of generality]] removes cases only through a transformation preserving the hypotheses and the conclusion being proved. For a symmetric statement about three real numbers one may order them $a\le b\le c$, since relabeling preserves such a statement. One cannot make that assumption if the variables have different roles in the condition. If cases are being counted rather than proving a common property, the sizes of their symmetry classes must still be accounted for.

Symmetry also aggregates a sum. Among the six permutations of the distinct digits one, two and three, fixing any digit in one position leaves two orders for the others. Each digit therefore occurs twice in each place, and the sum is $2(1+2+3)(100+10+1)=1332$. This is a count of equal contributions, not permission to discard five of the six numbers.`,
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
      body: String.raw`An implication “if $P$ then $Q$” rules out the case where $P$ is true and $Q$ false. Its [[contrapositive|contrapositive]], “if not $Q$ then not $P$,” rules out that same case. They are logically equivalent. This concerns implication between statements; it does not require a causal connection.

The converse “if $Q$ then $P$” and inverse “if not $P$ then not $Q$” are contrapositives of one another. Neither follows from the original implication in general. A counterexample is a student who receives an A despite missing a question: it is consistent with the promise that all-correct work receives an A, but refutes the converse and inverse. What does follow is that a student without an A cannot have answered every question correctly.

To prove an implication by contrapositive, assume the negation of its conclusion and prove the negation of its hypothesis. For an integer $n$, the claim “if $n^2$ is even then $n$ is even” becomes “if $n$ is odd then $n^2$ is odd.” Write $n=2k+1$ with integer $k$. Then

$$n^2=4k^2+4k+1=2(2k^2+2k)+1,$$

which is odd. The integer domain supplies the dichotomy even or odd; it must not be omitted from the theorem.

Negation must apply to the whole statement. The negation of “$a\ge50$ or $b\ge50$” is “$a\lt50$ and $b\lt50$.” Those inequalities imply $a+b\lt100$. Thus, by contrapositive, $a+b\ge100$ forces at least one of $a,b$ to be at least fifty. This is also the two-number instance of an averaging bound.

Likewise, the negation of “every school sold more than one hundred shirts” is “some school sold at most one hundred shirts.” The negation of “some school sold more than one hundred” is “no school sold more than one hundred.” Keep the same domain and negate the inequality as well as the quantifier. To refute a proposed consequence, exhibit an assignment satisfying the original statement and violating that consequence; a single such counterexample suffices.`,
      related: [
        { card: "truth-tellers-logic", note: String.raw`deduction from statements that must all hold (R7.6).` },
        { card: "proof-by-contradiction", note: String.raw`assuming the whole statement false, not only the conclusion.` }
      ],
      exercises: [
        { q: String.raw`Which of these follows from "if it rains, the game is canceled"? (a) If the game is canceled, it rained. (b) If it does not rain, the game is not canceled. (c) If the game is not canceled, it did not rain.`,
          solution: String.raw`Statement (c) is the contrapositive, "if not canceled then not raining", and is equivalent to the original. Statement (a) is the converse and (b) the inverse; the game might be canceled for another reason, so neither follows. Only (c) follows.` },
        { q: String.raw`Prove that if $a + b \ge 100$ for real numbers $a$ and $b$, then $a \ge 50$ or $b \ge 50$.`,
          solution: String.raw`Prove the contrapositive: if $a \lt 50$ and $b \lt 50$, then $a + b \lt 50 + 50 = 100$, so $a + b \ge 100$ fails. Since the contrapositive is equivalent to the statement, the statement holds.` },
        { q: String.raw`Prove that for an integer $n$, if $n^2$ is even, then $n$ is even.`,
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
      body: String.raw`[[subset-avoiding-relation|Forbidden relations]] organize a subset into pairs or chains. These give upper bounds; an attaining example is a separate requirement. [[odd-part-chains|Odd-part chains]] bound divisibility-free sets, but elements in different chains can still divide one another. [[subset-sum-facts|Subset contributions]] and parity-toggle bijections count across all subsets with their stated assumptions.

[[handshake-lemma|Degree sums]] count every edge twice. [[eulerian-paths|Euler trails]] require connectivity of the edge-containing part and zero or two odd vertices; joining closed trails proves sufficiency. The [[round-robin-tournaments|round-robin count]] totals wins only after the tie and scoring rules are fixed. The [[disconnected-graph-edges|connectivity threshold]] $\binom{n-1}{2}+1$ applies to simple undirected graphs on $n\ge2$ vertices.

[[pigeonhole|Pigeonhole]], [[pairing-to-bound|pairing]] and the [[extremal-principle|extremal principle]] turn a chosen grouping or maximum into a bound. Extremal objects need not be unique. [[coloring-arguments|Colorings]] and [[invariants-coloring|invariants]] can rule out targets; matching a necessary condition is not by itself a construction. For grid walks, tracking step parity as well as position makes the alternating coloring useful.

[[truth-tellers-logic|Statement consistency]], [[magic-squares|line-sum identities]] and [[proof-by-cases|exhaustive cases]] support complete deductions. [[wlog-symmetry|Symmetry]] must preserve the entire claim, and counting still needs the correct multiplicities. An implication and its [[contrapositive|contrapositive]] have identical truth conditions; converse and inverse do not generally follow. Precise domains, negations and boundary conditions are part of each proof.`,
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
      { q: String.raw`A finite undirected graph has $6$ vertices with degrees $1, 2, 2, 3, 3, 3$. How many edges does it have?`, answer: "7",
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
