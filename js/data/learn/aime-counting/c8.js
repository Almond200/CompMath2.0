// Learn, AIME Counting & Probability, chapter C8: graphs, grids and combinatorial structures (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// Counting the shapes in a figure belongs to G7.5, so the chapter keeps to graphs, colorings and pigeonhole;
// its lessons hold all the chapter's contest problems, and it has no separate review.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C8"] = {
  lessons: {
    "C8.1": {
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
        { card: "graph-coloring", note: String.raw`coloring the vertices of a graph so that edges join different colors (C8.3).` }
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
    "C8.2": {
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
    "C8.3": {
      prereq: ["invariants-coloring"],
      cards: ["coloring-arguments", "graph-coloring"],
      body: String.raw`Coloring is used in two opposite ways in contest problems. In one, the coloring is a proof device: color a board in a pattern so that every tile or move covers the colors in a fixed way, and a count of colors shows that something is impossible or forced. In the other, the coloring is the object being counted: colorings of a map, a cycle, or a set of regions in which neighbors differ. Both are short once the right pattern or recursion is found.

A [[coloring-arguments|coloring argument]] attaches colors to the cells of a board so that each piece covers a known mix of colors. On a checkerboard each domino covers one black and one white cell, so an $8 \times 8$ board with two opposite corners removed (both the same color) cannot be tiled by dominoes. On a $3 \times 3$ board colored like a checkerboard, the five dark cells and four light ones give a parity condition on any path or tiling. Other patterns work for other pieces: color by rows or diagonals modulo $3$ for $1 \times 3$ tiles, and modulo $4$ for $1 \times 4$ tiles. A coloring can also be a partition of a set into two classes, followed along chains of a relation, as when the condition "no two elements in the same class have a certain property" forces each element's class from its neighbor's.

[[graph-coloring|Graph coloring]] counts or bounds the colorings of a graph's vertices with adjacent vertices different. For a path of $n$ vertices with $k$ colors there are $k(k - 1)^{n-1}$, since each vertex avoids its predecessor. For a cycle of $n$ vertices the count is $(k - 1)^n + (-1)^n(k - 1)$, which for a $5$-cycle with $3$ colors gives $32 - 2 = 30$; the formula comes from the path count by subtracting colorings whose ends agree, which are colorings of a shorter cycle. A figure whose regions touch in a cycle, such as the diagonals of a pentagon or the sectors of a ring, is counted with this formula. The chromatic number, the fewest colors needed, is at most one more than the largest degree, and a graph needs only two colors exactly when it has no odd cycle.

Use a coloring as an invariant to prove impossibility or count parity, and the path and cycle formulas to count proper colorings. The last lesson of the chapter turns to pigeonhole and extremal arguments.`,
      related: [
        { card: "invariants-coloring", note: String.raw`colorings as one kind of invariant of a process (C5.4).` },
        { card: "constructive-counting", note: String.raw`coloring a map region by region with the most constrained first (C1.1).` },
        { card: "recursive-counting", note: String.raw`the recursion behind the cycle-coloring formula (C5.1).` }
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
    "C8.4": {
      prereq: ["casework-method"],
      cards: ["pigeonhole", "pigeonhole-argument", "extremal-principle", "pairing-to-bound"],
      body: String.raw`Some questions ask for the smallest number that guarantees something, or the largest set that avoids something. How many socks must be drawn to be sure of a pair? How many numbers from $1$ to $20$ can be chosen with no two adding to $21$? What is the smallest possible largest sum in a sequence? The answers come in two halves: an argument that the bound always works, usually by pigeonhole or pairing, and an example showing the bound cannot be improved.

The [[pigeonhole|pigeonhole principle]] says that if $n$ objects go into $k$ boxes with $n \gt k$, some box holds at least two, and more generally some box holds at least $\lceil n/k \rceil$. With $10$ colors of socks, $11$ socks guarantee a pair, and $10$ do not (one of each color). To guarantee $3$ of one color among $4$ colors, $9$ socks suffice, since $8$ can be two of each. The extreme example is half of the answer, and it is usually the case where every box is filled as evenly as possible.

A [[pigeonhole-argument|pigeonhole argument]] in a harder problem is mostly the choice of boxes. To force two numbers that add to $21$, use the ten boxes $\{1, 20\}, \{2, 19\}, \ldots, \{10, 11\}$: any $11$ numbers from $1$ to $20$ put two in one box, and the ten numbers $1$ to $10$ show that $10$ are not enough. To force two numbers where one divides the other, use chains by odd part, $\{1, 2, 4, 8\}, \{3, 6, 12\}, \ldots$. To force two numbers with the same residue, use residue classes. The boxes must be built so that "two in one box" is exactly the conclusion wanted. Using such boxes to cap the size of a set is [[pairing-to-bound|pairing to bound]]: if the elements split into pairs that cannot both be chosen, a valid set has at most one from each pair.

The [[extremal-principle|extremal principle]] starts from the largest, smallest or otherwise extreme object and uses its extremity. The largest element of a set, the smallest sum, the person with the most friends: each has a property that the others lack, and arguing from it often gives a bound or a contradiction. To minimize the largest of several overlapping sums, add the sums in a way that covers every term, and divide; to show a configuration with too many elements fails, look at its largest element and the pairs it forms.

Every bounding answer has two parts: a proof that the bound holds and an example that attains it. The chapter's lessons end here; the extension chapter goes beyond the AIME syllabus.`,
      related: [
        { card: "subset-avoiding-relation", note: String.raw`counting all the subsets that avoid a relation, not just the largest (C3.3).` },
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
    }
  }
};
