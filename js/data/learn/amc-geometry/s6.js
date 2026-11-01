// Learn, AMC Geometry, chapter S6: polygons and counting in figures (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S6"] = {
  lessons: {
    "S6.1": {
      prereq: ["polygon-angle-sums", "equilateral-triangle-facts", "permutations-combinations"],
      cards: [],
      body: String.raw`This chapter measures polygons with more than four sides, takes a closer look at trapezoids, and counts the shapes in a figure. A regular polygon is cut into congruent triangles from its center, a trapezoid is understood through its diagonals and its extended legs, and counting in a figure is counting with the tools of the counting book, applied to lines and points.

A regular hexagon of side $2$ is six equilateral triangles of side $2$, each of area $\sqrt3$, so its area is $6\sqrt3$. An octagon has $\tfrac{8 \cdot 5}{2} = 20$ diagonals, one for each pair of corners that are not neighbors. And a $2 \times 2$ grid of squares holds $9$ rectangles: a rectangle is fixed by choosing $2$ of the $3$ vertical lines and $2$ of the $3$ horizontal lines, $3 \cdot 3$ ways.

The lessons take these ideas in turn: regular polygons (S6.2), trapezoids (S6.3), and counting in figures (S6.4). The Summary (S6.5) collects the strategies.`,
      exercises: [
        { q: String.raw`What is the area of a regular hexagon with side $2$?`, answer: "6sqrt(3)",
          solution: String.raw`Lines from the center to the corners cut it into $6$ equilateral triangles of side $2$, each of area $\tfrac{\sqrt3}{4} \cdot 4 = \sqrt3$. So the area is $6\sqrt3$.` },
        { q: String.raw`How many diagonals does an octagon have?`, answer: "20",
          solution: String.raw`Each of the $8$ corners joins the $5$ corners that are not itself or a neighbor, and each diagonal is counted from both ends: $\tfrac{8 \cdot 5}{2} = 20$.` },
        { q: String.raw`How many rectangles of any size are there in a $2 \times 2$ grid of unit squares?`, answer: "9",
          solution: String.raw`A rectangle is fixed by its two vertical sides, chosen from $3$ vertical lines, and its two horizontal sides, from $3$ horizontal lines: $\binom32 \cdot \binom32 = 9$.` }
      ],
      problems: [
        "2015 AMC 8, Problem 2",
        "1998 AJHSME, Problem 4",
        "1997 AJHSME, Problem 17"
      ]
    },
    "S6.2": {
      prereq: ["equilateral-triangle-facts", "special-right-triangles", "polygon-angle-sums", "trig-area"],
      cards: ["regular-polygon-area", "regular-hexagon-area", "regular-octagon", "regular-dodecagon", "golden-ratio-pentagon"],
      body: String.raw`What is the area of a regular hexagon of side $4$? Of a regular octagon of side $2$? Of a regular dodecagon in a circle of radius $1$? How long is the diagonal of a regular pentagon of side $1$? Each regular polygon is cut into pieces whose areas are known.

[[regular-polygon-area|A regular polygon]] with $n$ sides is cut from its center into $n$ congruent isosceles triangles. Each has two sides equal to the circumradius $R$ with an angle of $\tfrac{360^\circ}{n}$ between them, so the area is $\tfrac12 nR^2\sin\tfrac{360^\circ}{n}$; equivalently, half the apothem (the distance from the center to a side) times the perimeter.

[[regular-hexagon-area|The regular hexagon]] is the most common: six equilateral triangles, so its circumradius equals its side, its short diagonals are $s\sqrt3$ and its long ones $2s$, and its area is $\tfrac{3\sqrt3}{2}s^2$, which is $24\sqrt3$ for $s = 4$. Many hexagon problems are equilateral-triangle problems in disguise, solved by drawing the three long diagonals. [[regular-dodecagon|The regular dodecagon]] cut from its center gives twelve triangles with angle $30^\circ$, so its area is $\tfrac12 \cdot 12 R^2 \cdot \tfrac12 = 3R^2$: exactly $3$ in a circle of radius $1$.

[[regular-octagon|The regular octagon]] is a square with its corners cut off by $45$-$45$-$90$ triangles. With side $s$, each cut triangle has legs $\tfrac{s}{\sqrt2}$, so the square around the octagon has side $s + s\sqrt2$, and the octagon's area is that square less four half-squares of side $\tfrac{s}{\sqrt2}$: $(1 + \sqrt2)^2 s^2 - s^2 = 2(1 + \sqrt2)s^2$. For $s = 2$, $8 + 8\sqrt2$.

[[golden-ratio-pentagon|The regular pentagon]] has diagonals that are $\varphi = \tfrac{1 + \sqrt5}{2}$ times its side. Two diagonals from one corner cut the pentagon into triangles with angles of $36^\circ$, $72^\circ$ and $108^\circ$, and similar triangles among them give $\tfrac{d}{s} = \tfrac{s}{d - s}$, that is, $d^2 = s d + s^2$, whose positive root for $s = 1$ is $\varphi$. Its angles are multiples of $36^\circ$, and $\cos 36^\circ = \tfrac\varphi2$.

Cut a regular polygon from its center, see a hexagon as six equilateral triangles, an octagon as a square with corners cut off, and a pentagon's diagonals through the golden ratio. The next lesson turns to trapezoids.`,
      related: [
        { card: "circular-segment", note: String.raw`the regions between a regular polygon and its circle (S2.4).` },
        { card: "equiangular-polygon", note: String.raw`polygons with equal angles but unequal sides (S2.2).` },
        { card: "regular-octahedron", note: String.raw`regular hexagons and squares as cross sections of solids (S8.4).` }
      ],
      exercises: [
        { q: String.raw`What is the area of a regular hexagon with side $4$?`, answer: "24sqrt(3)",
          solution: String.raw`It is six equilateral triangles of side $4$, each of area $\tfrac{\sqrt3}{4} \cdot 16 = 4\sqrt3$: in all $24\sqrt3$.` },
        { q: String.raw`What is the area of a regular octagon with side $2$?`, answer: "8+8sqrt(2)",
          solution: String.raw`The octagon is a square with its corners cut off by isosceles right triangles with hypotenuse $2$ and legs $\sqrt2$. The square has side $2 + 2\sqrt2$ and area $(2 + 2\sqrt2)^2 = 12 + 8\sqrt2$, and the four corners together have area $4 \cdot \tfrac12 \cdot 2 = 4$. So the octagon has area $8 + 8\sqrt2$.` },
        { q: String.raw`A regular dodecagon is inscribed in a circle of radius $1$. What is its area?`, answer: "3",
          solution: String.raw`From the center it is $12$ triangles with two sides $1$ and a $30^\circ$ angle between them, each of area $\tfrac12 \cdot 1 \cdot 1 \cdot \sin 30^\circ = \tfrac14$. So the area is $3$.` },
        { q: String.raw`A regular pentagon has side $1$. How long is each diagonal?`, answer: "(1+sqrt(5))/2",
          solution: String.raw`The corners $A$, $B$, $C$, $D$ of pentagon $ABCDE$ lie on a circle, and $ABCD$ has sides $AB = BC = CD = 1$, $DA = d$ and diagonals $AC = BD = d$. Ptolemy's theorem (S9.4) gives $AC \cdot BD = AB \cdot CD + BC \cdot DA$, that is, $d^2 = 1 + d$, whose positive root is $\tfrac{1 + \sqrt5}{2}$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 17",
        "2001 AMC 10, Problem 20",
        "2011 AMC 10B, Problem 16",
        "2014 AMC 10A, Problem 12",
        "2013 AMC 10B, Problem 15",
        "2012 AMC 10A, Problem 18",
        "2003 AMC 10B, Problem 23",
        "2006 AMC 12B, Problem 16",
        "2015 AMC 10B, Problem 22",
        "2016 AMC 10B, Problem 23",
        "2020 AMC 12A, Problem 14"
      ]
    },
    "S6.3": {
      prereq: ["trapezoid-parallelogram-areas", "triangle-similarity", "pythagorean-theorem"],
      cards: ["trapezoid-special-segments", "isosceles-trapezoid"],
      body: String.raw`A trapezoid has parallel sides $6$ and $14$: how long is the segment through the crossing of its diagonals, parallel to the bases? How do the triangles at the two bases compare? An isosceles trapezoid has bases $10$ and $4$ and legs $5$: how tall is it, and how long are its diagonals? A trapezoid hides similar triangles and right triangles.

[[trapezoid-special-segments|The segments of a trapezoid]] parallel to its bases $a$ and $b$ have exact lengths. The midsegment, joining the midpoints of the legs, is $\tfrac{a + b}{2}$, the average. The diagonals cross at a point that divides each of them in the ratio $a : b$, since the triangles at the two bases are similar with that ratio; their areas are in the ratio $a^2 : b^2$, so $\tfrac{9}{49}$ for bases $6$ and $14$. The segment through that point is $\tfrac{2ab}{a + b}$, the harmonic mean: $\tfrac{2 \cdot 6 \cdot 14}{20} = \tfrac{42}{5}$. Two more are worth knowing, the segment that splits the trapezoid into two similar trapezoids, $\sqrt{ab}$, and the one that splits its area in half, $\sqrt{\tfrac{a^2 + b^2}{2}}$, and the four always come in the order harmonic, geometric, arithmetic, quadratic mean.

[[isosceles-trapezoid|An isosceles trapezoid]], with equal legs, is symmetric about the line through the midpoints of its bases. Dropping heights from the ends of the short base cuts off two equal right triangles with bases $\tfrac{B - b}{2}$, so the height is $\sqrt{\ell^2 - \left(\tfrac{B - b}{2}\right)^2}$: $\sqrt{25 - 9} = 4$ for the example. Its diagonals are equal, its corners lie on a circle, and the diagonal satisfies $d^2 = \ell^2 + Bb$, here $25 + 40 = 65$, so $d = \sqrt{65}$; that is Ptolemy's theorem for the trapezoid (S9.4).

Drop heights to make right triangles, compare the similar triangles at the two bases, and know the four special segments in order. The next lesson counts shapes.`,
      related: [
        { card: "extend-sides-to-meet", note: String.raw`extending the legs to complete a triangle (S4.3).` },
        { card: "midsegment-theorem", note: String.raw`the triangle's midsegment, of which the trapezoid's is a relative (S3.3).` },
        { card: "ptolemys-theorem", note: String.raw`the diagonal of an isosceles trapezoid, as a cyclic quadrilateral (S9.4).` }
      ],
      exercises: [
        { q: String.raw`A trapezoid has parallel sides $6$ and $14$. How long is the segment parallel to them through the point where the diagonals cross, with its ends on the legs?`, answer: "42/5",
          solution: String.raw`The crossing point divides each diagonal in the ratio $6 : 14$. On one side of it, similar triangles give a piece of $6 \cdot \tfrac{14}{20}$, and on the other a piece of $14 \cdot \tfrac{6}{20}$, both $\tfrac{21}{5}$. So the segment is $\tfrac{42}{5} = \tfrac{2 \cdot 6 \cdot 14}{6 + 14}$.` },
        { q: String.raw`In the same trapezoid, what is the ratio of the area of the triangle formed by the shorter base and the two diagonals to that of the triangle formed by the longer base and the diagonals?`, answer: "9/49",
          solution: String.raw`The two triangles have equal vertical angles at the crossing and alternate angles from the parallel bases, so they are similar with ratio $\tfrac{6}{14} = \tfrac37$. Their areas are in the ratio $\tfrac{9}{49}$.` },
        { q: String.raw`An isosceles trapezoid has bases $10$ and $4$ and legs $5$. How long is each diagonal?`, answer: "sqrt(65)",
          solution: String.raw`Heights from the ends of the short base cut off right triangles with base $\tfrac{10 - 4}{2} = 3$ and hypotenuse $5$, so the height is $4$. A diagonal spans $4 + 3 = 7$ across and $4$ up: $\sqrt{49 + 16} = \sqrt{65}$, which matches $\ell^2 + Bb = 25 + 40$.` }
      ],
      problems: [
        "1999 AMC 8, Problem 14",
        "2005 AMC 10B, Problem 23",
        "2009 AMC 10B, Problem 24",
        "2022 AMC 10A, Problem 23",
        "2021 Fall AMC 12A, Problem 21"
      ]
    },
    "S6.4": {
      prereq: ["permutations-combinations", "casework-method"],
      cards: ["plane-regions", "handshakes-diagonals", "counting-shapes", "zonogon-minkowski", "rectangles-in-grid"],
      body: String.raw`Into how many regions can $5$ lines cut the plane? How many rectangles are there in a $3 \times 4$ grid, and how many squares in a $4 \times 4$ grid? How many triangles have their corners among $8$ points on a circle? Counting in a figure is counting, with the figure supplying the choices.

[[handshakes-diagonals|Pairs, diagonals and triangles]] among $n$ points are choices: $\binom n2$ segments, $\tfrac{n(n - 3)}{2}$ diagonals of an $n$-gon, $\binom n3$ triangles when no three points are on a line, $\binom83 = 56$ for $8$ points on a circle, and $\binom n4$ crossings of diagonals inside a convex $n$-gon when no three meet at a point.

[[rectangles-in-grid|Rectangles in a grid]] are fixed by two vertical and two horizontal lines: an $m \times n$ grid of squares has $\binom{m+1}{2}\binom{n+1}{2}$ rectangles, $\binom42\binom52 = 60$ for $3 \times 4$. Squares need equal sides, so they are counted by size: a $4 \times 4$ grid has $16 + 9 + 4 + 1 = 30$. [[counting-shapes|Counting the shapes in a figure]] in general means choosing a parameter, size or the lines that bound a shape, and counting each value, taking care with shapes that are tilted or that cross a missing piece of the figure.

[[plane-regions|Regions cut by lines and circles]] grow by a fixed rule. Each new line in general position crosses all the old ones, so it is cut into one more piece than the number of crossings, and each piece splits a region: $n$ lines make at most $\tfrac{n^2 + n + 2}{2}$ regions, $16$ for $5$ lines. Each new circle crosses each old one twice, so $n$ circles make at most $n^2 - n + 2$ regions, $14$ for $4$. [[zonogon-minkowski|The region swept]] when a point is the sum of several independent moving parts, each along a segment, is a polygon with opposite sides equal and parallel, a zonogon, whose perimeter is twice the sum of the segments' lengths.

Choose the lines or points that fix a shape, count squares and tilted shapes by size, and add the pieces of each new line or circle. The Summary follows.`,
      related: [
        { card: "permutations-combinations", note: String.raw`the choices behind every count of segments and triangles (R1.4).` },
        { card: "pie", note: String.raw`removing shapes that do not fit, or overlaps (R3.5).` },
        { card: "moser-circle", note: String.raw`regions inside a circle cut by its chords (S10.6).` }
      ],
      exercises: [
        { q: String.raw`What is the largest number of regions into which $5$ lines can cut the plane?`, answer: "16",
          solution: String.raw`The $k$th line crosses the $k - 1$ earlier ones at most once each, so it is cut into at most $k$ pieces, each adding a region. Starting from $1$: $1 + 1 + 2 + 3 + 4 + 5 = 16$, which is $\tfrac{25 + 5 + 2}{2}$.` },
        { q: String.raw`What is the largest number of regions into which $4$ circles can cut the plane?`, answer: "14",
          solution: String.raw`One circle makes $2$ regions. The $k$th circle crosses each earlier one at most twice, so it is cut into $2(k - 1)$ arcs, each adding a region: $2 + 2 + 4 + 6 = 14$, which is $16 - 4 + 2$.` },
        { q: String.raw`How many rectangles are there in a $3 \times 4$ grid of unit squares?`, answer: "60",
          solution: String.raw`Choose $2$ of the $4$ horizontal lines and $2$ of the $5$ vertical lines: $\binom42 \cdot \binom52 = 6 \cdot 10 = 60$.` },
        { q: String.raw`How many squares of any size, with sides along the grid lines, are there in a $4 \times 4$ grid of unit squares?`, answer: "30",
          solution: String.raw`A $k \times k$ square fits in $(5 - k)^2$ positions: $16 + 9 + 4 + 1 = 30$.` },
        { q: String.raw`How many triangles have their three corners among $8$ points on a circle?`, answer: "56",
          solution: String.raw`No three points on a circle are on a line, so every $3$ of them make a triangle: $\binom83 = 56$.` }
      ],
      problems: [
        "2001 AMC 8, Problem 23",
        "2009 AMC 8, Problem 20",
        "2011 AMC 8, Problem 19",
        "2012 AMC 8, Problem 14",
        "2024 AMC 10A, Problem 6",
        "2002 AMC 10B, Problem 18",
        "2004 AMC 10A, Problem 16",
        "2011 AMC 12A, Problem 9",
        "2001 AMC 12, Problem 14",
        "2017 AMC 10A, Problem 23",
        "2023 AMC 10B, Problem 24"
      ]
    },
    "S6.5": {
      prereq: ["regular-polygon-area", "regular-hexagon-area", "regular-octagon", "regular-dodecagon", "golden-ratio-pentagon", "trapezoid-special-segments", "isosceles-trapezoid", "plane-regions", "handshakes-diagonals", "counting-shapes", "zonogon-minkowski", "rectangles-in-grid"],
      cards: [],
      body: String.raw`[[regular-polygon-area|A regular polygon]] is $n$ triangles from its center, $\tfrac12 nR^2\sin\tfrac{360^\circ}{n}$. [[regular-hexagon-area|A hexagon]] is six equilateral triangles, [[regular-octagon|an octagon]] a square with its corners cut off, [[regular-dodecagon|a dodecagon]] has area $3R^2$, and [[golden-ratio-pentagon|a pentagon's diagonal]] is $\varphi$ times its side.

[[trapezoid-special-segments|A trapezoid's special segments]] are the harmonic, geometric, arithmetic and quadratic means of its bases, and [[isosceles-trapezoid|an isosceles trapezoid]] is solved by dropping heights.

[[handshakes-diagonals|Segments, diagonals and triangles]] among points are choices; [[rectangles-in-grid|rectangles in a grid]] are pairs of lines; [[counting-shapes|shapes in a figure]] are counted by size; [[plane-regions|lines and circles]] add a region for each piece; and [[zonogon-minkowski|a swept region]] is a zonogon.`,
      strategies: [
        String.raw`Cut a regular polygon into triangles from its center.`,
        String.raw`See a hexagon as equilateral triangles and an octagon as a square with its corners removed.`,
        String.raw`In a trapezoid, compare the similar triangles made by the diagonals.`,
        String.raw`Drop heights in an isosceles trapezoid to make two equal right triangles.`,
        String.raw`Count rectangles by choosing their bounding lines, and squares by their size.`,
        String.raw`Count regions by the pieces each new line or circle is cut into.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A regular hexagon is inscribed in a circle of radius $6$. What is its perimeter?`, answer: "36",
        solution: String.raw`A regular hexagon's side equals its circumradius, so each side is $6$ and the perimeter is $36$.` },
      { q: String.raw`How many diagonals does a $12$-sided polygon have?`, answer: "54",
        solution: String.raw`$\tfrac{12 \cdot 9}{2} = 54$.` },
      { q: String.raw`How many squares of any size, with sides along the grid lines, are there in a $3 \times 3$ grid of unit squares?`, answer: "14",
        solution: String.raw`By size: $9$ of side $1$, $4$ of side $2$, $1$ of side $3$: $14$.` }
    ],
    problems: [
      "2005 AMC 12A, Problem 25",
      "2007 AMC 12A, Problem 20",
      "2008 AMC 10A, Problem 25",
      "2009 AMC 12B, Problem 25",
      "2013 AMC 12B, Problem 16",
      "2023 AMC 10A, Problem 24"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 10B, Problem 25",
      "2019 AMC 12B, Problem 24",
      "2022 AMC 12A, Problem 13",
      "2022 AMC 12B, Problem 25",
      "1997 AIME, Problem 2"
    ]
  }
};
