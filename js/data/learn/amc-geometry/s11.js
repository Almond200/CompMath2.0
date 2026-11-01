// Learn, AMC Geometry, chapter S11: space (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S11"] = {
  lessons: {
    "S11.1": {
      prereq: ["prism-pyramid-volumes", "space-diagonal", "similar-figures-ratios", "point-line-distance"],
      cards: [],
      body: String.raw`Chapter S8 measured the common solids. This chapter adds the tetrahedron, the frustum, and coordinates in three dimensions, where distances, planes and distances to planes work as lines did in the plane.

The points $(1, 2, 3)$ and $(4, 6, 15)$ are $\sqrt{9 + 16 + 144} = 13$ apart, by the Pythagorean theorem in three directions. A regular tetrahedron of side $6$ has volume $\tfrac{\sqrt2}{12} \cdot 216 = 18\sqrt2$. And a cone cut halfway up by a plane parallel to its base loses a small cone similar to it with ratio $\tfrac12$, so the small cone has $\tfrac18$ of the volume and the frustum left has $\tfrac78$.

The lessons take these ideas in turn: tetrahedra and frusta (S11.2), and coordinates and planes in space (S11.3). The Summary (S11.4) collects the strategies.`,
      exercises: [
        { q: String.raw`How far apart are the points $(1, 2, 3)$ and $(4, 6, 15)$?`, answer: "13",
          solution: String.raw`The gaps are $3$, $4$ and $12$, so the distance is $\sqrt{9 + 16 + 144} = 13$.` },
        { q: String.raw`What is the volume of a regular tetrahedron with side $6$?`, answer: "18sqrt(2)",
          solution: String.raw`$V = \tfrac{\sqrt2}{12}s^3 = \tfrac{\sqrt2}{12} \cdot 216 = 18\sqrt2$.` },
        { q: String.raw`A cone is cut by a plane parallel to its base, halfway up its height. What fraction of the cone's volume is in the bottom piece?`, answer: "7/8",
          solution: String.raw`The top piece is a cone similar to the whole with ratio $\tfrac12$, so its volume is $\left(\tfrac12\right)^3 = \tfrac18$ of the whole. The bottom piece has $\tfrac78$.` }
      ],
      problems: [
        "2014 AMC 10A, Problem 19",
        "2013 AMC 12B, Problem 11"
      ]
    },
    "S11.2": {
      prereq: ["prism-pyramid-volumes", "equilateral-triangle-facts", "similar-figures-ratios", "space-diagonal"],
      cards: ["frustum-volume", "regular-tetrahedron", "isosceles-tetrahedron"],
      body: String.raw`How tall is a regular tetrahedron of side $3$? What is the volume of a frustum with square bases of sides $2$ and $4$, $3$ apart? A tetrahedron has its opposite edges equal in pairs: how is its volume found? Three solids that come with a trick each.

[[regular-tetrahedron|The regular tetrahedron]] of side $s$ has its top above the center of its base, which is $\tfrac{s\sqrt3}{3}$ from each base corner, so its height is $\sqrt{s^2 - \tfrac{s^2}{3}} = \tfrac{s\sqrt6}{3}$, which is $\sqrt6$ for $s = 3$. Its volume is $\tfrac13 \cdot \tfrac{\sqrt3}{4}s^2 \cdot \tfrac{s\sqrt6}{3} = \tfrac{\sqrt2}{12}s^3$. It also fits inside a cube, with its edges as diagonals of the cube's faces: the cube of side $a$ minus four corner pyramids, each $\tfrac16 a^3$, leaves $\tfrac13 a^3$.

[[frustum-volume|A frustum]], a pyramid or cone with its top cut off by a parallel plane, has volume $\tfrac13 h\left(A_1 + A_2 + \sqrt{A_1A_2}\right)$. With square bases of areas $4$ and $16$ and height $3$, it is $\tfrac13 \cdot 3 \cdot (4 + 16 + 8) = 28$. The same answer comes from the whole pyramid less the small one cut off, which are similar (S3.2); that route also finds the full height when it is not given.

[[isosceles-tetrahedron|An isosceles tetrahedron]], whose opposite edges are equal in pairs, fits into a box with its edges as face diagonals. If the box has sides $p$, $q$, $r$, the edges are $\sqrt{p^2 + q^2}$, $\sqrt{q^2 + r^2}$, $\sqrt{p^2 + r^2}$, and the tetrahedron is the box less four corner pyramids, with volume $\tfrac{pqr}{3}$. Edges $\sqrt5$, $\sqrt5$, $2\sqrt2$ in opposite pairs come from a $1 \times 2 \times 2$ box, so the volume is $\tfrac43$.

Find a tetrahedron's height through the center of its base, cut a frustum's volume from two similar pyramids, and put a tetrahedron with equal opposite edges inside a box. The next lesson puts space on coordinates.`,
      related: [
        { card: "cube", note: String.raw`the cube around a regular tetrahedron (S8.3).` },
        { card: "cone-formulas", note: String.raw`the cone of which a frustum is a part (S8.2).` },
        { card: "fit-copies", note: String.raw`a solid as the box less congruent corner pieces (S7.6).` }
      ],
      exercises: [
        { q: String.raw`What is the height of a regular tetrahedron with side $3$?`, answer: "sqrt(6)",
          solution: String.raw`The top is above the center of the base, $\tfrac{3\sqrt3}{3} = \sqrt3$ from each base corner. So the height is $\sqrt{9 - 3} = \sqrt6$.` },
        { q: String.raw`A frustum has square bases of sides $2$ and $4$, and the bases are $3$ apart. What is its volume?`, answer: "28",
          solution: String.raw`$V = \tfrac13 h(A_1 + A_2 + \sqrt{A_1A_2}) = \tfrac13 \cdot 3 \cdot (4 + 16 + 8) = 28$. Or: the full pyramid has height $6$, since the small one is half the size, and $\tfrac13 \cdot 16 \cdot 6 - \tfrac13 \cdot 4 \cdot 3 = 32 - 4 = 28$.` },
        { q: String.raw`A tetrahedron has two opposite edges of length $\sqrt5$, two of length $\sqrt5$, and two of length $2\sqrt2$. What is its volume?`, answer: "4/3",
          solution: String.raw`Its edges are face diagonals of a box $p \times q \times r$ with $p^2 + q^2 = 5$, $q^2 + r^2 = 8$, $p^2 + r^2 = 5$, so $p = 1$, $q = 2$, $r = 2$. The box less four corner pyramids of volume $\tfrac16 pqr$ each leaves $pqr - \tfrac23 pqr = \tfrac{pqr}{3} = \tfrac43$.` }
      ],
      problems: [
        "2014 AMC 10B, Problem 23",
        "2017 AMC 12B, Problem 14",
        "2022 AMC 12A, Problem 12",
        "2024 AMC 12A, Problem 24"
      ]
    },
    "S11.3": {
      prereq: ["distance-midpoint", "point-line-distance", "space-diagonal"],
      cards: ["plane-cross-section", "distance-3d", "point-plane-distance"],
      body: String.raw`How far is $(1, 2, 3)$ from the plane $x + 2y + 2z = 4$? How far is the origin from the plane through $(1, 0, 0)$, $(0, 2, 0)$ and $(0, 0, 3)$? A plane slices a cube: what shape is the slice? Coordinates in space work as in the plane, with one more letter.

[[distance-3d|Distance in space]] is the Pythagorean theorem in three directions, $\sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2}$, and the midpoint averages the coordinates. A box's space diagonal is the case of a corner and the opposite corner (S8.3). Placing a solid with a corner at the origin and edges along the axes turns its lengths into this formula.

[[point-plane-distance|The distance from a point to a plane]] $ax + by + cz + d = 0$ is $\tfrac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}$, the plane's version of the distance to a line (S7.2): from $(1, 2, 3)$ to $x + 2y + 2z - 4 = 0$ it is $\tfrac{|1 + 4 + 6 - 4|}{3} = \tfrac73$. The plane through the intercepts $(a, 0, 0)$, $(0, b, 0)$, $(0, 0, c)$ is $\tfrac xa + \tfrac yb + \tfrac zc = 1$, so for $1, 2, 3$ its distance from the origin is $\tfrac{1}{\sqrt{1 + 1/4 + 1/9}} = \tfrac67$. The same height comes from the volume: the tetrahedron cut off has volume $\tfrac16 abc$, and dividing three times it by the area of the slanted face gives the height.

[[plane-cross-section|A plane's cut through a solid]] is a polygon whose corners are where the plane crosses the solid's edges. Find the plane's equation, then for each edge the point where it meets the plane, keeping those that lie within the edge. A plane through a cube can cut a triangle, a quadrilateral, a pentagon or a regular hexagon, the last when it passes through the cube's center perpendicular to a space diagonal.

Use the three-term distance formula, divide by the length of the normal for a distance to a plane, and find a slice's corners edge by edge. The Summary follows.`,
      related: [
        { card: "coordinate-bash", note: String.raw`placing a figure on axes, in the plane (S7.4).` },
        { card: "cross-section-method", note: String.raw`slicing a round solid through its axis (S8.5).` },
        { card: "vector-dot-product", note: String.raw`the normal vector of a plane, perpendicular to every direction in it (S10.4).` }
      ],
      exercises: [
        { q: String.raw`How far is the point $(1, 2, 3)$ from the plane $x + 2y + 2z = 4$?`, answer: "7/3",
          solution: String.raw`$\tfrac{|1 + 2 \cdot 2 + 2 \cdot 3 - 4|}{\sqrt{1 + 4 + 4}} = \tfrac{7}{3}$.` },
        { q: String.raw`How far is the origin from the plane through $(1, 0, 0)$, $(0, 2, 0)$ and $(0, 0, 3)$?`, answer: "6/7",
          solution: String.raw`The plane is $x + \tfrac y2 + \tfrac z3 = 1$, or $6x + 3y + 2z = 6$. Its distance from the origin is $\tfrac{6}{\sqrt{36 + 9 + 4}} = \tfrac67$.` },
        { q: String.raw`A cube of side $2$ has one corner at the origin and the opposite corner at $(2, 2, 2)$. How far is the origin from the center of the face $x = 2$?`, answer: "sqrt(6)",
          solution: String.raw`That face's center is $(2, 1, 1)$, at distance $\sqrt{4 + 1 + 1} = \sqrt6$ from the origin.` }
      ],
      problems: [
        "2005 AMC 12B, Problem 16",
        "2018 AMC 10B, Problem 10",
        "2013 AMC 10A, Problem 22",
        "2014 AMC 12A, Problem 17",
        "2012 AMC 12A, Problem 22",
        "2019 AMC 12B, Problem 18"
      ]
    },
    "S11.4": {
      prereq: ["frustum-volume", "regular-tetrahedron", "isosceles-tetrahedron", "plane-cross-section", "distance-3d", "point-plane-distance"],
      cards: [],
      body: String.raw`[[regular-tetrahedron|The regular tetrahedron]] has height $\tfrac{s\sqrt6}{3}$ and volume $\tfrac{\sqrt2}{12}s^3$; [[frustum-volume|a frustum]] is the difference of two similar pyramids; and [[isosceles-tetrahedron|an isosceles tetrahedron]] sits in a box with volume $\tfrac{pqr}{3}$.

[[distance-3d|Distances in space]] add three squares, [[point-plane-distance|the distance to a plane]] divides by the normal's length, and [[plane-cross-section|a slice]] has its corners on the solid's edges.`,
      strategies: [
        String.raw`Find a pyramid's height through the point above which its top lies, usually the center of the base.`,
        String.raw`Measure a frustum as a big pyramid less a small similar one.`,
        String.raw`Put a tetrahedron with equal opposite edges inside a box.`,
        String.raw`Place a solid on three axes with a corner at the origin.`,
        String.raw`Find a slice's corners where the plane meets the edges.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the length of the space diagonal of a cube of side $4$, found as a distance in coordinates?`, answer: "4sqrt(3)",
        solution: String.raw`From $(0, 0, 0)$ to $(4, 4, 4)$: $\sqrt{16 + 16 + 16} = 4\sqrt3$.` },
      { q: String.raw`What is the total surface area of a regular tetrahedron with side $2$?`, answer: "4sqrt(3)",
        solution: String.raw`Four equilateral triangles of side $2$, each of area $\sqrt3$: $4\sqrt3$.` }
    ],
    problems: [
      "1987 AIME, Problem 2",
      "2002 AIME II, Problem 2",
      "2002 AIME I, Problem 11"
    ]
  },
  challenge: {
    problems: [
      "2006 AIME I, Problem 14",
      "2011 AIME I, Problem 13",
      "1999 AIME, Problem 15",
      "2017 AIME II, Problem 15"
    ]
  }
};
