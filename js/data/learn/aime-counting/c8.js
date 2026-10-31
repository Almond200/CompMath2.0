// Learn, AIME Counting & Probability, chapter C8: graphs, grids and combinatorial structures (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// Counting the shapes in a figure belongs to G7.5, so the chapter keeps to graphs, colorings and pigeonhole;
// C8.1 is the Introduction and C8.6 the Summary; Review and Challenge Problems use contest problems the lessons left.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C8"] = {
  lessons: {
    "C8.1": {
      prereq: ["casework-method"],
      cards: [],
      body: String.raw`This chapter studies structures made of points and connections, of cells on grids, and of objects placed into boxes. Its tools are degree counting in graphs, counting shapes on a grid, colorings that prove something impossible, and the pigeonhole and extremal principles, which prove that something must exist.

A graph is a set of points, called vertices, some pairs of which are joined by edges: people and the handshakes between them, teams and the games they play, the corners and edges of a solid. The degree of a vertex is the number of edges at it. Every edge has two ends, so the degrees add up to twice the number of edges. A graph on $10$ vertices with every degree $4$ therefore has $\tfrac{10 \cdot 4}{2} = 20$ edges, and no graph can have an odd number of vertices of odd degree.

On a grid, a rectangle is fixed by choosing two of the vertical lines and two of the horizontal ones, so a grid of $4 \times 4$ unit squares, with $5$ lines each way, holds $\binom52^2 = 100$ rectangles.

A coloring argument colors the cells or the positions so that every allowed move or piece behaves the same way with respect to the colors, such as a domino always covering one black and one white square. If the target does not have that property, it cannot be reached. A board with two opposite corners removed has unequal numbers of black and white squares, so no tiling by dominoes exists.

The pigeonhole principle says that if more than $kn$ objects are put into $n$ boxes, some box gets more than $k$. The work is to choose the boxes. The extremal principle looks at a largest or smallest object, such as the person with the most friends, and finds what it forces.

The lessons take these ideas in turn: degrees, trees, Euler paths and tournaments (C8.2), shapes on grids (C8.3), coloring and parity (C8.4), and pigeonhole and extremal arguments (C8.5). The Summary (C8.6) collects the strategies.`,
      exercises: [
        { q: String.raw`Can nine people each shake hands with exactly three of the others?`,
          solution: String.raw`No. The numbers of handshakes of the people add up to twice the number of handshakes, since each handshake involves two people. Nine people with three each would give $27$, which is odd.` },
        { q: String.raw`How many rectangles, squares included, are formed by the lines of a grid of $4 \times 4$ unit squares?`, answer: "100",
          solution: String.raw`The grid has $5$ vertical and $5$ horizontal lines. A rectangle is fixed by its two vertical sides and its two horizontal sides, so there are $\binom52 \cdot \binom52 = 10 \cdot 10 = 100$ rectangles.` },
        { q: String.raw`What is the least number of people in a room that guarantees that three of them were born in the same month?`, answer: "25",
          solution: String.raw`With $24$ people, two born in each month, no three share a month. With $25$ people in $12$ months, some month has at least $\lceil 25/12 \rceil = 3$ of them, by the pigeonhole principle. The answer is $25$.` }
      ],
      problems: [
        "2012 AMC 10B, Problem 15",
        "2010 AMC 10B, Problem 3",
        "2016 AMC 10B, Problem 15"
      ]
    },
    "C8.2": {
      prereq: ["double-counting"],
      cards: ["handshake-lemma", "tree-basics", "eulerian-paths", "round-robin-tournaments"],
      body: String.raw`A graph is a set of points with some pairs joined, and it is the natural language for handshakes, roads, friendships, games in a tournament, and the edges of a polyhedron. A handful of facts about graphs answer a surprising number of counting questions: how many edges a graph with given degrees has, whether a route can use every road once, how many games a round robin has and how the wins can be distributed.

The [[handshake-lemma|handshake lemma]] says the degrees of a graph add to twice the number of edges, since each edge has two ends; it is the simplest double count. A graph whose degrees are $3, 3, 3, 3, 2, 2$ has $\tfrac{16}{2} = 8$ edges, and in any graph the number of vertices of odd degree is even. For a polyhedron, counting edge ends at the vertices or at the faces gives two equations, and with Euler's formula $V - E + F = 2$ they determine the shape's counts.

A [[tree-basics|tree]] is a connected graph with no cycles. A tree on $n$ vertices has exactly $n - 1$ edges, between any two vertices there is exactly one path, and removing any edge disconnects it. These facts bound how many edges a graph can have before it must contain a cycle, and how many it needs to be connected.

An [[eulerian-paths|Eulerian path]] uses every edge exactly once. A connected graph has a closed one exactly when every vertex has even degree, and an open one (from one vertex to another) exactly when exactly two vertices have odd degree, which must be the ends. So the question of tracing a figure without lifting the pen, or driving every road once, is a question about odd degrees. To make an Eulerian route possible, or to find the longest route that uses each road at most once, remove or repeat edges to fix the odd vertices.

In a [[round-robin-tournaments|round-robin tournament]] each of $n$ teams plays every other once, so there are $\binom n2$ games; with $8$ teams, $28$. With no ties the wins add to $\binom n2$, and when each game gives $2$ points in total, the scores add to $2\binom n2$. These sums bound the possible scores and decide questions such as how many teams can tie for first. Triples of teams that beat each other in a cycle are counted by complement: a triple that is not a cycle has exactly one team that beats both others, so the non-cyclic triples number $\sum_v \binom{w_v}{2}$, where $w_v$ is the number of wins of team $v$.

Model the situation as a graph, count edge ends to get equations, and check degrees for routes. The next lesson counts rectangles and squares in grids.`,
      related: [
        { card: "eulers-polyhedron-formula", note: String.raw`$V - E + F = 2$, the second equation in polyhedron counts.` },
        { card: "handshakes-diagonals", note: String.raw`pairs of points, players or vertices counted as $\binom n2$ (G7.5).` },
        { card: "graph-coloring", note: String.raw`coloring the vertices of a graph so that edges join different colors (C8.4).` }
      ],
      exercises: [
        { q: String.raw`A graph has six vertices with degrees $3, 3, 3, 3, 2, 2$. How many edges does it have?`, answer: "8",
          solution: String.raw`The degrees add to $16$, and each edge contributes $2$ to that sum, so there are $\tfrac{16}{2} = 8$ edges.` },
        { q: String.raw`Eight teams play a round robin, each pair meeting once, with no ties. What is the total number of wins?`, answer: "28",
          solution: String.raw`Each of the $\binom82 = 28$ games produces exactly one win, so the wins add to $28$.` }
      ],
      problems: [
        "2015 AMC 12A, Problem 13",
        "2013 AMC 12B, Problem 12",
        "2019 AMC 12B, Problem 10",
        "2023 AMC 12A, Problem 13",
        "2009 AMC 12B, Problem 20",
        "2016 AMC 12B, Problem 20",
        "2012 AIME I, Problem 7",
        "1993 AIME, Problem 10",
        "1985 AIME, Problem 14",
        "1998 AIME, Problem 15"
      ]
    },
    "C8.3": {
      prereq: ["permutations-combinations", "power-sums"],
      cards: ["rectangles-in-grid"],
      body: String.raw`Counting rectangles or squares in a grid is a classic warm-up, and it shows two complementary ways of counting shapes: by choosing the lines that bound them, and by organizing by size and position. Both appear inside harder problems, such as finding the ratio of squares to rectangles in a chessboard, or counting squares that fit under a curve.

For [[rectangles-in-grid|rectangles in a grid]], a rectangle with sides along the grid lines is determined by its two vertical sides and its two horizontal sides. An $m \times n$ grid of unit squares has $m + 1$ vertical and $n + 1$ horizontal lines, so it contains $\binom{m + 1}{2}\binom{n + 1}{2}$ rectangles; a $5 \times 5$ grid has $\binom62^2 = 225$. Squares need equal side lengths, so the line-choosing count no longer factors. Instead organize by size: a $5 \times 5$ grid holds $(6 - s)^2$ squares of side $s$, so $25 + 16 + 9 + 4 + 1 = 55$ in all, a sum of squares. On an $8 \times 8$ board this gives $204$ squares and $1296$ rectangles, and the ratio of such counts is a frequent question.

Organizing by size and position also handles irregular regions. To count squares with sides on grid lines inside a region bounded by a curve, fix the side $s$ and the left edge, and count the bottom positions for which the top corners stay inside; that is a floor function of the curve's height. Tilted squares, whose sides are not along the grid, are determined by a vector $(a, b)$ for one side, and a tilted square with that side fits in an axis-parallel box of side $a + b$, which turns their count into another organized sum.

Choose bounding lines when the shapes are axis-parallel rectangles, and organize by size and position for squares and for regions with curved or irregular edges. The next lesson uses colorings to prove that some things are impossible.`,
      related: [
        { card: "power-sums", note: String.raw`sums of squares and cubes that total the squares of each size.` },
        { card: "counting-shapes", note: String.raw`counting triangles and other shapes in a figure (G7.5).` },
        { card: "floor-basics", note: String.raw`counting positions under a curve with floors (A4.2).` }
      ],
      exercises: [
        { q: String.raw`How many rectangles, with sides along the grid lines, are there in a $5 \times 5$ grid of unit squares?`, answer: "225",
          solution: String.raw`A rectangle is fixed by choosing $2$ of the $6$ vertical lines and $2$ of the $6$ horizontal lines: $\binom62 \cdot \binom62 = 15 \cdot 15 = 225$.` },
        { q: String.raw`How many squares, of any size and with sides along the grid lines, are there in a $5 \times 5$ grid of unit squares?`, answer: "55",
          solution: String.raw`A square of side $s$ can be placed in $(6 - s)^2$ positions, so the count is $25 + 16 + 9 + 4 + 1 = 55$.` }
      ],
      problems: [
        "2016 AMC 12B, Problem 11",
        "1997 AIME, Problem 2"
      ]
    },
    "C8.4": {
      prereq: ["invariants-coloring"],
      cards: ["coloring-arguments", "graph-coloring"],
      body: String.raw`Coloring is used in two opposite ways in contest problems. In one, the coloring is a proof device: color a board in a pattern so that every tile or move covers the colors in a fixed way, and a count of colors shows that something is impossible or forced. In the other, the coloring is the object being counted: colorings of a map, a cycle, or a set of regions in which neighbors differ. Both are short once the right pattern or recursion is found.

A [[coloring-arguments|coloring argument]] attaches colors to the cells of a board so that each piece covers a known mix of colors. On a checkerboard each domino covers one black and one white cell, so an $8 \times 8$ board with two opposite corners removed (both the same color) cannot be tiled by dominoes. On a $3 \times 3$ board colored like a checkerboard, the five dark cells and four light ones give a parity condition on any path or tiling. Other patterns work for other pieces: color by rows or diagonals modulo $3$ for $1 \times 3$ tiles, and modulo $4$ for $1 \times 4$ tiles. A coloring can also be a partition of a set into two classes, followed along chains of a relation, as when the condition "no two elements in the same class have a certain property" forces each element's class from its neighbor's.

[[graph-coloring|Graph coloring]] counts or bounds the colorings of a graph's vertices with adjacent vertices different. For a path of $n$ vertices with $k$ colors there are $k(k - 1)^{n-1}$, since each vertex avoids its predecessor. For a cycle of $n$ vertices the count is $(k - 1)^n + (-1)^n(k - 1)$, which for a $5$-cycle with $3$ colors gives $32 - 2 = 30$; the formula comes from the path count by subtracting colorings whose ends agree, which are colorings of a shorter cycle. A figure whose regions touch in a cycle, such as the diagonals of a pentagon or the sectors of a ring, is counted with this formula. The chromatic number, the fewest colors needed, is at most one more than the largest degree, and a graph needs only two colors exactly when it has no odd cycle.

Use a coloring as an invariant to prove impossibility or count parity, and the path and cycle formulas to count proper colorings. The last lesson of the chapter turns to pigeonhole and extremal arguments.`,
      related: [
        { card: "invariants-coloring", note: String.raw`colorings as one kind of invariant of a process (C5.5).` },
        { card: "constructive-counting", note: String.raw`coloring a map region by region with the most constrained first (C1.2).` },
        { card: "recursive-counting", note: String.raw`the recursion behind the cycle-coloring formula (C5.2).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can the vertices of a $5$-cycle be colored with $3$ colors so that adjacent vertices have different colors?`, answer: "30",
          solution: String.raw`By the cycle formula, $(k - 1)^n + (-1)^n(k - 1) = 2^5 - 2 = 30$. Directly: a path of $5$ vertices has $3 \cdot 2^4 = 48$ colorings, and those whose ends agree correspond to proper colorings of a $4$-cycle, $2^4 + 2 = 18$; so $48 - 18 = 30$.` }
      ],
      problems: [
        "2023 AMC 12B, Problem 5",
        "2016 AMC 12B, Problem 12",
        "2011 AMC 12A, Problem 16",
        "2010 AIME I, Problem 12",
        "2026 AIME I, Problem 11"
      ]
    },
    "C8.5": {
      prereq: ["casework-method"],
      cards: ["pigeonhole", "pigeonhole-argument", "extremal-principle", "pairing-to-bound"],
      body: String.raw`Some questions ask for the smallest number that guarantees something, or the largest set that avoids something. How many socks must be drawn to be sure of a pair? How many numbers from $1$ to $20$ can be chosen with no two adding to $21$? What is the smallest possible largest sum in a sequence? The answers come in two halves: an argument that the bound always works, usually by pigeonhole or pairing, and an example showing the bound cannot be improved.

The [[pigeonhole|pigeonhole principle]] says that if $n$ objects go into $k$ boxes with $n \gt k$, some box holds at least two, and more generally some box holds at least $\lceil n/k \rceil$. With $10$ colors of socks, $11$ socks guarantee a pair, and $10$ do not (one of each color). To guarantee $3$ of one color among $4$ colors, $9$ socks suffice, since $8$ can be two of each. The extreme example is half of the answer, and it is usually the case where every box is filled as evenly as possible.

A [[pigeonhole-argument|pigeonhole argument]] in a harder problem is mostly the choice of boxes. To force two numbers that add to $21$, use the ten boxes $\{1, 20\}, \{2, 19\}, \ldots, \{10, 11\}$: any $11$ numbers from $1$ to $20$ put two in one box, and the ten numbers $1$ to $10$ show that $10$ are not enough. To force two numbers where one divides the other, use chains by odd part, $\{1, 2, 4, 8\}, \{3, 6, 12\}, \ldots$. To force two numbers with the same residue, use residue classes. The boxes must be built so that "two in one box" is exactly the conclusion wanted. Using such boxes to cap the size of a set is [[pairing-to-bound|pairing to bound]]: if the elements split into pairs that cannot both be chosen, a valid set has at most one from each pair.

The [[extremal-principle|extremal principle]] starts from the largest, smallest or otherwise extreme object and uses its extremity. The largest element of a set, the smallest sum, the person with the most friends: each has a property that the others lack, and arguing from it often gives a bound or a contradiction. To minimize the largest of several overlapping sums, add the sums in a way that covers every term, and divide; to show a configuration with too many elements fails, look at its largest element and the pairs it forms.

Every bounding answer has two parts: a proof that the bound holds and an example that attains it. The Summary (C8.6) collects the chapter's strategies; the extension chapter after it goes beyond the AIME syllabus.`,
      related: [
        { card: "subset-avoiding-relation", note: String.raw`counting all the subsets that avoid a relation, not just the largest (C3.4).` },
        { card: "odd-part-chains", note: String.raw`the chains by odd part, the boxes for divisibility problems.` },
        { card: "smoothing-method", note: String.raw`moving values toward each other to reach an extreme configuration.` }
      ],
      exercises: [
        { q: String.raw`What is the smallest $n$ such that every $n$-element subset of $\{1, 2, \ldots, 20\}$ contains two numbers that add to $21$?`, answer: "11",
          solution: String.raw`Put the numbers in the ten boxes $\{1, 20\}, \{2, 19\}, \ldots, \{10, 11\}$. Any $11$ numbers put two in one box, and those two add to $21$. The set $\{1, \ldots, 10\}$ has $10$ elements and no such pair, so $n = 11$.` },
        { q: String.raw`A drawer holds socks of $4$ colors, many of each. How many socks must be drawn, without looking, to be sure of $3$ of the same color?`, answer: "9",
          solution: String.raw`With $8$ socks one can have exactly $2$ of each color, so $8$ is not enough. With $9$ socks in $4$ colors, some color has at least $\lceil 9/4 \rceil = 3$. The answer is $9$.` }
      ],
      problems: [
        "2019 AMC 12A, Problem 3",
        "2018 AMC 12B, Problem 10",
        "2018 AMC 12A, Problem 12",
        "2012 AMC 12A, Problem 17",
        "2010 AMC 12B, Problem 14",
        "2025 AMC 12A, Problem 15",
        "2023 AMC 12B, Problem 18",
        "1986 AIME, Problem 12",
        "2022 AIME II, Problem 6"
      ]
    },
    "C8.6": {
      prereq: ["handshake-lemma", "tree-basics", "eulerian-paths", "round-robin-tournaments", "rectangles-in-grid", "coloring-arguments", "graph-coloring", "pigeonhole", "extremal-principle"],
      cards: [],
      body: String.raw`[[handshake-lemma|The handshake lemma]] says the degrees of a graph add up to twice the number of edges, so the number of odd-degree vertices is even. A [[tree-basics|tree]] on $n$ vertices has $n - 1$ edges, and degree counting then fixes how many leaves it has. A graph can be drawn in one stroke, an [[eulerian-paths|Euler path]], exactly when it is connected and has $0$ or $2$ vertices of odd degree. In a [[round-robin-tournaments|round robin]], the wins add up to the number of games, and the transitive triples are counted from each team's wins.

[[rectangles-in-grid|On a grid]], a rectangle is two vertical lines and two horizontal ones, and the squares are counted by size.

[[coloring-arguments|A coloring argument]] finds a coloring that every move or piece treats the same way, then compares the target with it. [[graph-coloring|Proper colorings]] of a graph are counted by coloring the vertices one at a time, most constrained first.

[[pigeonhole|The pigeonhole principle]] guarantees a crowded box once the objects outnumber the boxes; the skill is in choosing boxes that make a crowded box useful. [[extremal-principle|The extremal principle]] studies a largest or smallest object and finds what it forces.`,
      strategies: [
        String.raw`Turn people, teams or solids into a graph, and count the edges by adding the degrees.`,
        String.raw`Use parity: a graph has an even number of vertices of odd degree.`,
        String.raw`For a tree, combine "edges $=$ vertices $- 1$" with the degree sum.`,
        String.raw`To decide whether a figure can be traced in one stroke, count its odd-degree vertices.`,
        String.raw`Count rectangles in a grid by their pairs of sides, and squares by their size.`,
        String.raw`To prove a tiling or a sequence of moves impossible, look for a coloring that every piece or move treats the same way.`,
        String.raw`For "guarantee", find the worst case first; it shows both the answer and the boxes for the pigeonhole principle.`,
        String.raw`Choose pigeonholes so that two objects in one box give what you need, such as a sum, a difference or a divisibility.`,
        String.raw`Look at the largest, smallest, first or last object, and ask what it forces.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A tree has only vertices of degree $1$ and degree $3$, and $8$ of its vertices have degree $3$. How many vertices have degree $1$?`, answer: "10",
        solution: String.raw`Let $L$ be the number of leaves. The tree has $L + 8$ vertices, so $L + 7$ edges, and its degrees add up to $L + 3 \cdot 8 = L + 24$. The handshake lemma gives $L + 24 = 2(L + 7)$, so $L = 10$.` },
      { q: String.raw`Six points are joined in pairs by all $15$ segments. What is the least number of strokes, without retracing any segment, that draws all of them?`, answer: "3",
        solution: String.raw`Every point has degree $5$, so all six points have odd degree. Each stroke has at most two ends, and every odd-degree point must be the end of some stroke, so at least $\tfrac62 = 3$ strokes are needed. Three suffice: add three segments pairing up the points, draw the resulting graph, whose degrees are all even, in one closed stroke, and remove the three added segments, which cuts the stroke into three.` },
      { q: String.raw`How many squares of all sizes are formed by the lines of a grid of $5 \times 5$ unit squares?`, answer: "55",
        solution: String.raw`A $k \times k$ square has its lower left corner in one of $(6 - k)^2$ positions. For $k = 1, \ldots, 5$ this gives $25 + 16 + 9 + 4 + 1 = 55$.` },
      { q: String.raw`Five regions are arranged in a ring, each touching the two next to it. In how many ways can they be colored with $3$ colors so that touching regions have different colors?`, answer: "30",
        solution: String.raw`Cut the ring between regions $5$ and $1$. The path of five regions has $3 \cdot 2^4 = 48$ colorings. Among them, those with regions $1$ and $5$ the same color are colorings of a ring of four (merge the two), which number $18$, as found in C1.2. So $48 - 18 = 30$.` },
      { q: String.raw`What is the least $n$ such that among any $n$ integers, two differ by a multiple of $7$?`, answer: "8",
        solution: String.raw`The integers $0, 1, \ldots, 6$ have different remainders on division by $7$, so $7$ is not enough. Among $8$ integers, two have the same remainder, by the pigeonhole principle with the $7$ remainders as boxes, and their difference is a multiple of $7$.` }
    ],
    problems: [
      "2023 AMC 10A, Problem 18",
      "2015 AMC 10B, Problem 20",
      "2005 AMC 10B, Problem 25"
    ]
  },
  challenge: {
    problems: [
      "2018 AMC 10A, Problem 17",
      "2022 AMC 10B, Problem 14",
      "2021 Fall AMC 10B, Problem 23"
    ],
    exercises: [
      { q: String.raw`Seven teams play a round robin with no ties. A set of three teams is cyclic if each of them beats one of the other two. What is the largest possible number of cyclic sets?`, answer: "14",
        solution: String.raw`A set of three teams that is not cyclic has one team that beats both others, and it is counted once at that team. So the non-cyclic sets number $\sum_i \binom{w_i}{2}$, where $w_i$ is team $i$'s number of wins and $\sum w_i = \binom72 = 21$. This sum is smallest when the wins are as equal as possible, all $w_i = 3$, giving $7 \cdot 3 = 21$. So at most $\binom73 - 21 = 35 - 21 = 14$ sets are cyclic, and $14$ is reached when each team beats the next three teams around a circle.` },
      { q: String.raw`What is the least $n$ such that any $n$ different numbers chosen from $1, 2, \ldots, 100$ include two numbers one of which divides the other?`, answer: "51",
        solution: String.raw`The $50$ numbers $51, \ldots, 100$ include no such pair, since twice the smallest is more than $100$, so $50$ is not enough. Write every number as $2^a m$ with $m$ odd; there are $50$ odd parts $m$ from $1$ to $99$. Among $51$ numbers two have the same odd part, by the pigeonhole principle, and of $2^a m$ and $2^b m$ the one with the smaller power of $2$ divides the other. The answer is $51$.` }
    ]
  }
};
