// Learn, Olympiad Combinatorics, chapter K5: combinatorial geometry (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["K5"] = {
  lessons: {
    "K5.1": {
      prereq: ["extremal-principle", "picks-theorem", "pigeonhole"],
      cards: [],
      body: String.raw`Combinatorial geometry asks about configurations of points, lines and convex sets, and about lattice points, with counting and extremal arguments rather than measurement. This chapter gives the classical results: points in convex position, the Sylvester-Gallai theorem, Helly's theorem, Minkowski's lattice point theorem, and Pick's theorem on a triangular grid.

Among any $5$ points in the plane with no three on a line, $4$ form a convex quadrilateral. Intervals on a line that meet in pairs all share a common point. And the square $|x| + |y| \lt 1.5$, symmetric about the origin, convex, with area $4.5 \gt 4$, contains a lattice point other than the origin, as Minkowski's theorem promises: $(1, 0)$.

The lessons are points, lines and convex sets (K5.2), and lattices (K5.3). The Summary (K5.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Prove that finitely many intervals on a line that meet in pairs have a common point.`,
          solution: String.raw`Let the intervals be $[a_i, b_i]$, let $a = \max a_i$ and $b = \min b_j$. For any $i$, $j$ the intervals $[a_i, b_i]$ and $[a_j, b_j]$ meet, so $a_i \le b_j$. Hence $a \le b$, and every point of $[a, b]$ lies in every interval.` },
        { q: String.raw`Check that the square $|x| + |y| \lt 1.5$ has area greater than $4$ and contains a lattice point other than the origin.`,
          solution: String.raw`It is a square with diagonals of length $3$, so its area is $\tfrac{3 \cdot 3}{2} = 4.5 \gt 4$. It contains $(1, 0)$, since $1 + 0 \lt 1.5$.` }
      ],
      problems: []
    },
    "K5.2": {
      prereq: ["extremal-principle", "proof-by-cases"],
      cards: ["convex-position", "sylvester-gallai", "hellys-theorem"],
      body: String.raw`Why do $5$ points, no three on a line, always include $4$ in convex position? Why does a finite set of points, not all on one line, determine a line through exactly two of them? If every three of a family of convex sets in the plane meet, must they all meet? Three theorems, proved by cases, by an extremal choice, and by a lemma about partitions.

[[convex-position|Points in convex position]] are the corners of a convex polygon. Among $5$ points with no three collinear, look at their convex hull. If it has $4$ or $5$ corners, $4$ of them form a convex quadrilateral. If it is a triangle, the other two points are inside; the line through them misses one side of the triangle, and the two corners on that side together with the two inner points form a convex quadrilateral. In general, $\mathrm{ES}(n)$ points guarantee $n$ in convex position, with $\mathrm{ES}(4) = 5$, $\mathrm{ES}(5) = 9$, and the Erdős-Szekeres bound $\binom{2n-4}{n-2} + 1$.

[[sylvester-gallai|The Sylvester-Gallai theorem]] is proved by an extremal choice. Among all pairs of a point $P$ and a line $\ell$ through two or more of the points with $P$ not on $\ell$, choose one with the smallest distance from $P$ to $\ell$. If $\ell$ contained three points, two of them would lie on one side of the foot of the perpendicular from $P$, and the one nearer the foot, with $P$ and the farther one, gives a point-line pair at smaller distance. So $\ell$ contains exactly two points.

[[hellys-theorem|Helly's theorem]] says that if every $3$ of finitely many convex sets in the plane have a common point, all of them do (every $d + 1$ in $d$ dimensions; every $2$ on a line). It turns a global question into checking triples. If every $3$ of finitely many points lie in some disk of radius $1$, then the disks of radius $1$ about the points meet in threes (a center of the covering disk is within $1$ of all three), so all of them meet at a point $O$, and the disk of radius $1$ about $O$ covers every point.

Split by the shape of the convex hull, choose a configuration that minimizes a distance, and reduce intersection questions about convex sets to triples. The next lesson studies lattice points.`,
      related: [
        { card: "erdos-szekeres", note: String.raw`monotone subsequences, the other theorem of Erdős and Szekeres (K2.3).` },
        { card: "extremal-principle", note: String.raw`the choice of a smallest distance in Sylvester-Gallai.` }
      ],
      exercises: [
        { q: String.raw`Prove that among any $5$ points in the plane, no three on a line, some $4$ are the corners of a convex quadrilateral.`,
          solution: String.raw`If the convex hull of the five has $4$ or $5$ corners, four of them are in convex position. Otherwise the hull is a triangle $ABC$ with $D$, $E$ inside. The line $DE$ crosses the boundary of the triangle twice, on two of its sides, and misses the third, say $AB$; so segment $AB$ does not meet line $DE$. Then $A$, $B$, $D$, $E$ are in convex position: $A$ and $B$ are corners of the hull of all five points, so neither lies in the triangle of three others; and if $D$ lay inside triangle $ABE$, the line from $E$ through $D$ would leave that triangle through side $AB$, so line $DE$ would meet segment $AB$, which it does not; the same holds for $E$ and triangle $ABD$. With no point inside the triangle of the other three, the four are the corners of a convex quadrilateral.` },
        { q: String.raw`Prove that if finitely many points in the plane are not all on one line, some line passes through exactly two of them.`,
          solution: String.raw`Consider pairs $(P, \ell)$ with $\ell$ a line through at least two of the points and $P$ one of the points not on $\ell$; there is at least one pair. Choose a pair with the smallest distance from $P$ to $\ell$, and let $F$ be the foot of the perpendicular from $P$. If $\ell$ held three of the points, two, say $Q$ and $R$, would lie on the same side of $F$ (or one at $F$), with $Q$ between $F$ and $R$. Then $Q$ is closer to the line $PR$ than $P$ is to $\ell$, contradicting the choice. So $\ell$ has exactly two points.` },
        { q: String.raw`Finitely many points have the property that every three of them lie in some disk of radius $1$. Prove that all of them lie in one disk of radius $1$.`,
          solution: String.raw`Around each point $P$ draw the disk $D_P$ of radius $1$. For any three points $P$, $Q$, $R$, the center $O$ of a disk of radius $1$ containing them is within $1$ of each, so $O \in D_P \cap D_Q \cap D_R$. The disks are convex, so by Helly's theorem all of them share a point $O^*$. Then every point is within $1$ of $O^*$, and the disk of radius $1$ about $O^*$ contains them all.` }
      ],
      problems: []
    },
    "K5.3": {
      prereq: ["picks-theorem", "area-by-pieces", "pigeonhole"],
      cards: ["minkowski-lattice", "picks-hexagonal-grid"],
      body: String.raw`Must a large enough symmetric convex region contain a lattice point other than its center? What is the analogue of Pick's theorem for points of a triangular grid? Lattice points obey counting laws.

[[minkowski-lattice|Minkowski's theorem]] says that a convex region symmetric about the origin with area greater than $4$ contains a lattice point other than the origin. The proof is pigeonhole by area: shrink the region by half, to area greater than $1$, and slide all of the plane's unit squares onto one; two points of the half-region land on the same spot, so they differ by a lattice vector $v$, and the symmetry and convexity of the region put $v$ itself inside the full region. For a lattice of determinant $d$, such as the points $(x, y)$ with $y \equiv ax \pmod p$, which has determinant $p$, the threshold is $4d$. The converse fails: $|x| + |y| \le 1.4$ has area $3.92 \lt 4$ and still contains $(1, 0)$.

[[picks-hexagonal-grid|Pick's theorem on a triangular grid]] measures area in unit triangles: a polygon with corners on the grid of an equilateral triangulation, with $I$ grid points inside and $B$ on the boundary, has area $2I + B - 2$ unit triangles. An equilateral triangle of side $2$ has $B = 6$, $I = 0$, so $4$ unit triangles; side $3$ has $B = 9$, $I = 1$, so $9$. It comes from the square-grid version by an affine map that takes unit squares to pairs of unit triangles. For the honeycomb grid of hexagon corners there is no such law.

Halve a symmetric convex region and pigeonhole it into a unit cell, and count grid points to measure lattice polygons. The Summary follows.`,
      related: [
        { card: "picks-theorem", note: String.raw`the square-grid formula $A = I + \tfrac B2 - 1$ (S7.4).` },
        { card: "thues-lemma", note: String.raw`small solutions of $x \equiv ay$, which Minkowski's theorem also gives (D3.2).` },
        { card: "linear-change-of-variables", note: String.raw`the affine map between the square and triangular grids (S10.4).` }
      ],
      exercises: [
        { q: String.raw`Show that Minkowski's condition "area greater than $4$" is sufficient but not necessary, using the region $|x| + |y| \le 1.4$.`,
          solution: String.raw`The region is a square with diagonals $2.8$, of area $\tfrac{2.8^2}{2} = 3.92 \lt 4$, yet it contains $(1, 0)$. So a region can contain a nonzero lattice point with area below $4$; the theorem only guarantees one above $4$.` },
        { q: String.raw`On a triangular grid, an equilateral triangle of side $4$ has its corners at grid points. Use Pick's theorem for this grid to find its area in unit triangles.`, answer: "16",
          solution: String.raw`Its boundary has $3 \cdot 4 = 12$ grid points, and inside there are $1 + 2 = 3$ (rows of $1$ and $2$ points). So the area is $2 \cdot 3 + 12 - 2 = 16$ unit triangles, matching $4^2$.` },
        { q: String.raw`Prove that no equilateral triangle has all three corners at points with integer coordinates.`,
          solution: String.raw`If it did, with side $s$, then $s^2$ is an integer (a sum of two squares of integer differences), and its area $\tfrac{\sqrt3}{4}s^2$ is irrational. But a polygon with lattice corners has area $I + \tfrac B2 - 1$ by Pick's theorem, or half an integer by the shoelace formula, which is rational. Contradiction.` }
      ],
      problems: []
    },
    "K5.4": {
      prereq: ["convex-position", "sylvester-gallai", "hellys-theorem", "minkowski-lattice", "picks-hexagonal-grid"],
      cards: [],
      body: String.raw`[[convex-position|Points in convex position]] are forced among enough points; [[sylvester-gallai|the Sylvester-Gallai theorem]] gives an ordinary line by an extremal choice; [[hellys-theorem|Helly's theorem]] reduces intersections of convex sets to triples.

[[minkowski-lattice|Minkowski's theorem]] puts a lattice point in a large symmetric convex region, and [[picks-hexagonal-grid|Pick's theorem on the triangular grid]] measures area by grid points.`,
      strategies: [
        String.raw`Split a point configuration by the shape of its convex hull.`,
        String.raw`For an ordinary line, choose the point-line pair at the smallest distance.`,
        String.raw`For a common point of convex sets, check every three and use Helly.`,
        String.raw`For a lattice point in a region, check symmetry, convexity and area greater than $4$ times the determinant.`,
        String.raw`Use Pick's theorem, or the shoelace formula, to show a lattice area is rational.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Four convex sets in the plane have the property that every three of them have a common point. Must all four have a common point?`,
        solution: String.raw`Yes, by Helly's theorem in the plane: if every $3$ of finitely many convex sets meet, all of them meet.` },
      { q: String.raw`On a triangular grid, a parallelogram made of two equilateral triangles of side $3$ has its corners at grid points. Find its area in unit triangles by Pick's theorem for this grid.`, answer: "18",
        solution: String.raw`Each side has $3$ grid steps, so the boundary has $12$ grid points. Inside, the shared diagonal has $2$ interior points and each triangle has $1$ more interior point, so $I = 4$. The area is $2 \cdot 4 + 12 - 2 = 18$, twice the $9$ of one triangle.` },
      { q: String.raw`Show that $4$ points in the plane, no three on a line, need not be the corners of a convex quadrilateral.`,
        solution: String.raw`Take a triangle and a point inside it. The inner point lies inside the triangle of the other three, so the four are not in convex position. This is why $\mathrm{ES}(4) = 5$, not $4$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Let $p \equiv 1 \pmod 4$ be prime. Use Minkowski's theorem to prove that $p$ is a sum of two squares.`,
        solution: String.raw`Take $a$ with $a^2 \equiv -1 \pmod p$, and the lattice $L = \{(x, y) : y \equiv ax \pmod p\}$, which has determinant $p$ (it has $p$ times fewer points than $\mathbb{Z}^2$). The disk $x^2 + y^2 \lt 2p$ is convex and symmetric with area $2\pi p \gt 4p$, so it contains a nonzero point of $L$. For that point, $x^2 + y^2 \equiv x^2 + a^2x^2 \equiv 0 \pmod p$ and $0 \lt x^2 + y^2 \lt 2p$, so $x^2 + y^2 = p$.` },
      { q: String.raw`Prove Helly's theorem for four convex sets $C_1, \ldots, C_4$ in the plane, using Radon's lemma: any $4$ points in the plane can be split into two groups whose convex hulls meet.`,
        solution: String.raw`For each $i$ pick $p_i$ in the three sets other than $C_i$; this is possible since every three meet. Split $\{p_1, \ldots, p_4\}$ by Radon into two groups whose hulls share a point $q$. Each set $C_j$ contains all the $p_i$ with $i \ne j$, so it contains one whole group (the group not containing $p_j$), hence that group's hull, hence $q$. So $q$ lies in all four sets.` },
      { q: String.raw`Prove that the Sylvester-Gallai theorem fails if infinitely many points are allowed: give an infinite set of points, not all on a line, with no line through exactly two of them.`,
        solution: String.raw`Take all points with integer coordinates. They are not collinear. Any line through two of them, $(a, b)$ and $(c, d)$, also passes through $(2c - a, 2d - b)$, a third lattice point, and through infinitely many more. So no line contains exactly two.` }
    ],
    problems: []
  }
};
