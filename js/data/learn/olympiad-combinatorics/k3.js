// Learn, Olympiad Combinatorics, chapter K3: graph theory (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["K3"] = {
  lessons: {
    "K3.1": {
      prereq: ["handshake-lemma", "cauchy-schwarz", "grid-paths"],
      cards: [],
      body: String.raw`Olympiad graph theory asks when a graph has a perfect matching, how many edges a graph can have without containing a given subgraph, and how many spanning trees or non-crossing path systems a graph has. The answers are three theorems on matchings and extremal graphs, and two determinant formulas.

The complete graph on $4$ vertices has $16$ spanning trees, sets of $3$ edges connecting all four vertices without a cycle; Cayley's formula gives $4^{4-2} = 16$. A graph on $10$ vertices with no triangle has at most $25$ edges, the number in the complete bipartite graph with parts of $5$. And two lattice paths, from $(0, 1)$ to $(2, 3)$ and from $(1, 0)$ to $(3, 2)$, that share no point can be chosen in $20$ ways, which is $6 \cdot 6 - 4 \cdot 4$.

The lessons are matchings (K3.2), and extremal graphs and counting with determinants (K3.3). The Summary (K3.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Give a triangle-free graph on $10$ vertices with $25$ edges.`,
          solution: String.raw`Split the vertices into two groups of $5$ and join every vertex of one group to every vertex of the other: $5 \cdot 5 = 25$ edges. A triangle would need two of its vertices in the same group, and those are never joined.` },
        { q: String.raw`How many spanning trees does the cycle on $5$ vertices have?`, answer: "5",
          solution: String.raw`A spanning tree of a $5$-vertex graph has $4$ edges. Removing any one of the $5$ edges of the cycle leaves a path, which is a tree, and every spanning tree arises this way. So $5$.` }
      ],
      problems: []
    },
    "K3.2": {
      prereq: ["pigeonhole", "double-counting", "handshake-lemma"],
      cards: ["halls-marriage", "konigs-theorem"],
      body: String.raw`Every vertex of a bipartite graph has degree $3$: must it have a perfect matching? A deck of $52$ cards is dealt into $13$ piles of $4$: can one card be chosen from each pile so that the $13$ chosen cards have all $13$ ranks? Marks are placed on a chessboard: how many can be chosen with no two in a row or column? Matchings answer all three.

[[halls-marriage|Hall's marriage theorem]] says that a bipartite graph with parts $X$ and $Y$ has a matching covering all of $X$ exactly when every set $S \subseteq X$ has at least $|S|$ neighbors. The condition is clearly necessary; the theorem is that it suffices. In a $k$-regular bipartite graph, a set $S$ sends $k|S|$ edges into its neighborhood $N(S)$, which receives at most $k|N(S)|$ edges, so $|N(S)| \ge |S|$, and there is a perfect matching. For the cards, join each pile to the ranks it contains: any $s$ piles hold $4s$ cards, and each rank has only $4$ cards, so they contain at least $s$ ranks; Hall gives a choice of one card per pile with all ranks different.

[[konigs-theorem|Kőnig's theorem]] says that in a bipartite graph the largest matching has the same size as the smallest set of vertices touching every edge. On a board, rows and columns are the two parts and each mark is an edge: the most marks with no two in a line equals the fewest lines covering all the marks. With marks at $(1, 1)$, $(1, 2)$, $(2, 1)$ and $(3, 3)$, three marks $(1, 2)$, $(2, 1)$, $(3, 3)$ can be chosen, and the three lines row $1$, column $1$, row $3$ cover all four, so $3$ is the answer.

Check Hall's condition by counting edges out of a set, model a selection problem as a bipartite graph, and match a largest matching with a smallest cover. The next lesson bounds edges and counts trees.`,
      related: [
        { card: "double-counting", note: String.raw`the edge count that verifies Hall's condition.` },
        { card: "dilworths-theorem", note: String.raw`chains and antichains, equivalent to Kőnig's theorem (K2.2).` },
        { card: "pigeonhole-argument", note: String.raw`existence by counting (P4.2).` }
      ],
      exercises: [
        { q: String.raw`Prove that every $k$-regular bipartite graph with $k \ge 1$ has a perfect matching.`,
          solution: String.raw`Counting edges, $k|X| = k|Y|$, so $|X| = |Y|$. For $S \subseteq X$, the $k|S|$ edges leaving $S$ all end in $N(S)$, and each vertex of $N(S)$ has only $k$ edges, so $k|S| \le k|N(S)|$. By Hall's theorem there is a matching covering $X$, which is perfect since $|X| = |Y|$.` },
        { q: String.raw`A deck of $52$ cards is dealt into $13$ piles of $4$. Prove that one card can be chosen from each pile so that the chosen cards have $13$ different ranks.`,
          solution: String.raw`Join each pile to each rank among its cards. For any $s$ piles, their $4s$ cards include at most $4$ of each rank, so at least $s$ ranks appear: Hall's condition holds. So there is a matching of the piles to different ranks, and choosing a card of the matched rank from each pile works.` },
        { q: String.raw`Marks are placed at $(1, 1)$, $(1, 2)$, $(2, 1)$ and $(3, 3)$ on a grid (row, column). What is the largest number of marks with no two in the same row or column?`, answer: "3",
          solution: String.raw`The marks $(1, 2)$, $(2, 1)$, $(3, 3)$ work. Row $1$, column $1$ and row $3$ cover every mark, and each line contains at most one chosen mark, so at most $3$ can be chosen, as Kőnig's theorem says.` }
      ],
      problems: []
    },
    "K3.3": {
      prereq: ["cauchy-schwarz", "handshake-lemma", "grid-paths", "determinant-geometric"],
      cards: ["turans-theorem", "matrix-tree-theorem", "lgv-lemma"],
      body: String.raw`How many edges can a graph on $n$ vertices have with no triangle? With no $4$ vertices all joined? How many spanning trees does a graph have? How many systems of non-crossing lattice paths are there? One extremal theorem and two determinant formulas.

[[turans-theorem|Turán's theorem]] says that a graph on $n$ vertices with no $r + 1$ vertices all joined to each other has at most $\left(1 - \tfrac1r\right)\tfrac{n^2}{2}$ edges, the number in the complete $r$-partite graph with nearly equal parts. The case $r = 2$, Mantel's theorem, bounds triangle-free graphs by $\tfrac{n^2}{4}$: for an edge $uv$, the neighbors of $u$ and $v$ cannot overlap, so $d(u) + d(v) \le n$; adding over the edges gives $\sum_v d(v)^2 \le ne$, and Cauchy-Schwarz gives $\sum d(v)^2 \ge \tfrac{(2e)^2}{n}$, so $e \le \tfrac{n^2}{4}$. On $9$ vertices with no $4$ mutually joined, the bound is $\tfrac23 \cdot \tfrac{81}{2} = 27$, reached by three groups of $3$.

[[matrix-tree-theorem|The matrix-tree theorem]] counts spanning trees: form the Laplacian $L = D - A$, degrees on the diagonal and $-1$ for each edge, delete one row and the same column, and take the determinant. For the complete graph $K_n$ it gives Cayley's $n^{n-2}$, so $16$ for $K_4$; for the complete bipartite graph $K_{2,3}$ it gives $12$.

[[lgv-lemma|The Lindström-Gessel-Viennot lemma]] counts systems of non-intersecting paths: if every non-intersecting system joins $a_i$ to $b_i$ for each $i$, their number is $\det(M_{ij})$, where $M_{ij}$ counts paths from $a_i$ to $b_j$. For lattice paths from $(0, 1)$ and $(1, 0)$ to $(2, 3)$ and $(3, 2)$, the matrix is $\begin{pmatrix} 6 & 4 \\ 4 & 6 \end{pmatrix}$, so there are $36 - 16 = 20$ non-intersecting pairs. The proof cancels intersecting systems in pairs by swapping their tails after the first meeting point.

Bound edges by adding $d(u) + d(v)$ over edges, compare with the balanced multipartite graph, count trees with a Laplacian minor, and count disjoint paths with a determinant. The Summary follows.`,
      related: [
        { card: "handshake-lemma", note: String.raw`the degree sum behind Mantel's bound (R7.3).` },
        { card: "grid-paths", note: String.raw`the path counts in the LGV matrix (R5.3).` },
        { card: "vandermonde-determinant", note: String.raw`another determinant evaluated by its structure (E5.4).` }
      ],
      exercises: [
        { q: String.raw`Prove that a graph on $n$ vertices with no triangle has at most $\tfrac{n^2}{4}$ edges.`,
          solution: String.raw`For an edge $uv$, no vertex is a neighbor of both, so $d(u) + d(v) \le n$. Adding over all $e$ edges, each vertex $v$ appears in $d(v)$ of them, so $\sum_v d(v)^2 \le ne$. By Cauchy-Schwarz, $\sum_v d(v)^2 \ge \tfrac{1}{n}\left(\sum_v d(v)\right)^2 = \tfrac{4e^2}{n}$. So $\tfrac{4e^2}{n} \le ne$, and $e \le \tfrac{n^2}{4}$.` },
        { q: String.raw`What is the largest number of edges in a graph on $9$ vertices with no $4$ vertices all joined to one another?`, answer: "27",
          solution: String.raw`By Turán's theorem with $r = 3$, at most $\left(1 - \tfrac13\right)\tfrac{81}{2} = 27$. Three groups of $3$, with every two vertices in different groups joined, have $3 \cdot 3 \cdot 3 = 27$ edges and no $4$ mutually joined vertices (two would share a group).` },
        { q: String.raw`How many spanning trees does $K_{2,3}$ have?`, answer: "12",
          solution: String.raw`$K_{2,3}$ has $5$ vertices and $6$ edges, and a spanning tree keeps $4$ of them, so it removes $2$. Removing $2$ of the $6$ edges can be done in $15$ ways, and the result is a tree exactly when it stays connected, since $4$ connected edges on $5$ vertices have no cycle. It disconnects only when both edges at one of the three degree-$2$ vertices are removed: $3$ ways. So $15 - 3 = 12$, as the matrix-tree theorem also gives.` },
        { q: String.raw`Count the pairs of lattice paths (unit steps right or up), one from $(0, 1)$ to $(2, 3)$ and one from $(1, 0)$ to $(3, 2)$, that have no point in common.`, answer: "20",
          solution: String.raw`The path counts are $M_{11} = \binom42 = 6$ (from $(0, 1)$ to $(2, 3)$), $M_{12} = \binom41 = 4$ (to $(3, 2)$), $M_{21} = \binom41 = 4$, $M_{22} = \binom42 = 6$. Any two paths from $(0, 1)$ to $(3, 2)$ and from $(1, 0)$ to $(2, 3)$ must cross, so by LGV the count is $6 \cdot 6 - 4 \cdot 4 = 20$; a direct enumeration confirms it.` }
      ],
      problems: []
    },
    "K3.4": {
      prereq: ["halls-marriage", "konigs-theorem", "turans-theorem", "matrix-tree-theorem", "lgv-lemma"],
      cards: [],
      body: String.raw`[[halls-marriage|Hall's theorem]] gives a matching when every set has enough neighbors, and [[konigs-theorem|Kőnig's theorem]] equates the largest matching with the smallest vertex cover in a bipartite graph.

[[turans-theorem|Turán's theorem]] bounds the edges of a graph with no large clique by the balanced multipartite graph; [[matrix-tree-theorem|the matrix-tree theorem]] counts spanning trees by a determinant; [[lgv-lemma|the LGV lemma]] counts non-intersecting path systems by a determinant.`,
      strategies: [
        String.raw`Model a choice of distinct representatives as a bipartite matching and check Hall's condition by counting edges.`,
        String.raw`On a board, treat rows and columns as the two sides and marks as edges.`,
        String.raw`For an extremal edge count, add $d(u) + d(v)$ over the edges and use Cauchy-Schwarz.`,
        String.raw`Count spanning trees with a minor of the Laplacian.`,
        String.raw`Count disjoint lattice paths with a determinant of path counts.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many spanning trees does the complete graph on $5$ vertices have?`, answer: "125",
        solution: String.raw`By Cayley's formula, a consequence of the matrix-tree theorem, $5^{5-2} = 125$.` },
      { q: String.raw`What is the largest number of edges in a triangle-free graph on $7$ vertices?`, answer: "12",
        solution: String.raw`By Mantel, at most $\lfloor\tfrac{49}{4}\rfloor = 12$, reached by joining a group of $3$ to a group of $4$: $3 \cdot 4 = 12$.` },
      { q: String.raw`Five students each like at least two of five books, and every book is liked by at most two students. Prove that each student can be given a different book that the student likes.`,
        solution: String.raw`Join students to the books they like. Any $s$ students send at least $2s$ edges, and each book receives at most $2$, so at least $s$ books are liked by them. By Hall's theorem a matching covers all five students.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`In a bipartite graph with parts $X$ and $Y$, every vertex has degree at least $1$, and every vertex of $X$ has degree at least as large as every vertex of $Y$. Prove that there is a matching covering $X$.`,
        solution: String.raw`Let $d$ be the smallest degree in $X$ and $d'$ the largest in $Y$, so $d \ge d' \ge 1$. For $S \subseteq X$, at least $d|S|$ edges leave $S$, all into $N(S)$, which receives at most $d'|N(S)|$ edges. So $d|S| \le d'|N(S)| \le d|N(S)|$, giving $|N(S)| \ge |S|$, and Hall's theorem applies.` },
      { q: String.raw`Prove that a graph on $2n$ vertices with $n^2 + 1$ edges contains a triangle.`,
        solution: String.raw`By Mantel's theorem a triangle-free graph on $2n$ vertices has at most $\tfrac{(2n)^2}{4} = n^2$ edges. With $n^2 + 1$ edges there must be a triangle.` },
      { q: String.raw`Use the matrix-tree theorem to show that $K_4$ has $16$ spanning trees.`, answer: "16",
        solution: String.raw`The Laplacian of $K_4$ has $3$ on the diagonal and $-1$ elsewhere. Deleting the first row and column leaves $\begin{pmatrix} 3 & -1 & -1 \\ -1 & 3 & -1 \\ -1 & -1 & 3 \end{pmatrix}$, whose determinant is $3(9 - 1) + 1(-3 - 1) - 1(1 + 3) = 24 - 4 - 4 = 16$.` }
    ],
    problems: []
  }
};
