// Learn, AIME Geometry, chapter G7: polygons, regular figures and grids (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// The lessons hold all the chapter's contest problems, so the chapter has no separate review.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["G7"] = {
  lessons: {
    "G7.1": {
      prereq: ["special-right-triangles"],
      cards: ["polygon-angle-sums", "regular-polygon-area", "regular-hexagon-area", "regular-octagon", "regular-dodecagon", "equilateral-triangle-facts", "golden-ratio-pentagon", "equiangular-polygon"],
      body: String.raw`Regular polygons are built from congruent isosceles triangles around a center, and every length in them is a chord of the circumcircle. A handful of facts, the angle sums, the areas of the common polygons, and the special triangles inside them, answer most questions about hexagons, octagons, dodecagons and pentagons, and the same facts extend to polygons that are equiangular but not regular.

The [[polygon-angle-sums|interior angles]] of an $n$-gon add to $180^\circ(n - 2)$, and the exterior angles to $360^\circ$, so a regular $n$-gon has interior angle $\tfrac{180^\circ(n - 2)}{n}$: $160^\circ$ for $n = 18$, and an interior angle of $150^\circ$ means $12$ sides. A [[regular-polygon-area|regular polygon]] with circumradius $R$ has area $\tfrac n2R^2\sin\tfrac{360^\circ}{n}$, and with apothem $a$ and perimeter $P$, area $\tfrac12aP$.

The common cases are worth knowing. An [[equilateral-triangle-facts|equilateral triangle]] of side $s$ has height $\tfrac{\sqrt3}{2}s$ and area $\tfrac{\sqrt3}{4}s^2$. A [[regular-hexagon-area|regular hexagon]] of side $s$ is six equilateral triangles, area $\tfrac{3\sqrt3}{2}s^2$ ($6\sqrt3$ for $s = 2$), with short diagonals $\sqrt3s$ and long diagonals $2s$. A [[regular-octagon|regular octagon]] of side $s$ is a square of side $(1 + \sqrt2)s$ with four corners cut off, area $2(1 + \sqrt2)s^2$. A [[regular-dodecagon|regular dodecagon]] with circumradius $R$ has area $3R^2$, and dissects into squares and equilateral triangles. The [[golden-ratio-pentagon|regular pentagon]] has diagonal-to-side ratio $\varphi = \tfrac{1 + \sqrt5}{2}$, its diagonals cut each other in that ratio, and its angles of $108^\circ$ and $36^\circ$ make golden triangles.

An [[equiangular-polygon|equiangular polygon]] has all angles equal but sides of different lengths. Extending alternate sides of an equiangular hexagon makes a large equilateral triangle with three small equilateral triangles cut off its corners, which gives its area and the relations among its sides; an equiangular octagon is a rectangle with four isosceles right triangles cut off. The same completion turns any equiangular polygon into a familiar shape.

Split regular polygons into triangles from the center, complete equiangular ones into triangles or rectangles, and keep the special values of the common polygons ready. The next lesson cuts polygons into pieces.`,
      related: [
        { card: "chord-length", note: String.raw`every side and diagonal of a regular polygon is a chord (G2.4).` },
        { card: "closing-polygon-vectors", note: String.raw`the side relations of an equiangular polygon from closing its side vectors (G6.4).` },
        { card: "law-cosines-60-120", note: String.raw`the $120^\circ$ angles of a hexagon in length computations (G3.2).` }
      ],
      exercises: [
        { q: String.raw`Each interior angle of a regular polygon is $150^\circ$. How many sides does it have?`, answer: "12",
          solution: String.raw`Each exterior angle is $30^\circ$, and the exterior angles add to $360^\circ$, so there are $\tfrac{360}{30} = 12$ sides.` },
        { q: String.raw`Find the area of a regular octagon with side $1$.`, answer: "2+2sqrt(2)",
          solution: String.raw`The octagon is a square of side $1 + \sqrt2$ with four isosceles right triangles of legs $\tfrac{\sqrt2}{2}$ removed. The area is $(1 + \sqrt2)^2 - 4 \cdot \tfrac14 = 3 + 2\sqrt2 - 1 = 2 + 2\sqrt2$.` }
      ],
      problems: [
        "2002 AMC 12B, Problem 5",
        "2007 AMC 12B, Problem 11",
        "2017 AMC 12A, Problem 11",
        "2013 AMC 12B, Problem 13",
        "2006 AMC 12B, Problem 16",
        "2011 AMC 12B, Problem 12",
        "2003 AMC 12B, Problem 15",
        "2012 AMC 12A, Problem 14",
        "2013 AMC 12A, Problem 11",
        "2008 AMC 12B, Problem 13",
        "2013 AMC 12B, Problem 16",
        "2020 AMC 12A, Problem 14",
        "2010 AMC 12A, Problem 17",
        "1990 AIME, Problem 3",
        "2006 AIME II, Problem 1",
        "1997 AIME, Problem 6",
        "2018 AIME I, Problem 8",
        "2018 AIME II, Problem 4"
      ]
    },
    "G7.2": {
      prereq: ["triangle-area-standard"],
      cards: ["area-by-pieces", "trapezoid-parallelogram-areas", "parallelogram-area", "quadrilateral-diagonal-area", "trapezoid-special-segments", "varignons-theorem", "circular-segment", "inscribed-square", "diagonal-angle-from-sides"],
      body: String.raw`Most area problems are solved by cutting a figure into pieces whose areas are known, or by subtracting known pieces from a larger shape. Quadrilaterals have several area formulas, each suited to different data, and regions bounded by arcs reduce to sectors and triangles. Choosing the cut is the whole skill.

[[area-by-pieces|Area by pieces]] adds or subtracts simple shapes: an L-shape is two rectangles, a shaded region between a square and a circle is their difference, and a triangle with a corner cut off is a triangle minus a triangle. Adding the same piece to two regions preserves their difference, which turns a comparison of awkward regions into a comparison of simple ones.

[[trapezoid-parallelogram-areas|Quadrilateral areas]] have standard formulas: a trapezoid is the average of its bases times the height ($32$ for bases $6$ and $10$ and height $4$), a [[parallelogram-area|parallelogram]] is base times height or $ab\sin\theta$, and any convex quadrilateral is $\tfrac12d_1d_2\sin\theta$ in terms of its [[quadrilateral-diagonal-area|diagonals and the angle between them]]. That angle can itself be found from the four sides, the [[diagonal-angle-from-sides|angle between the diagonals from the sides]]: $\cos\theta = \tfrac{|a^2 + c^2 - b^2 - d^2|}{2d_1d_2}$. [[varignons-theorem|Varignon's theorem]] says the midpoints of the sides of any quadrilateral form a parallelogram with half the area, whose sides are parallel to the diagonals and half as long; with diagonals $10$ and $14$ it has perimeter $24$. In a trapezoid, the [[trapezoid-special-segments|special segments]] parallel to the bases have lengths equal to the arithmetic, geometric, harmonic and quadratic means of the bases: the midline, the segment cutting it into similar trapezoids, the segment through the diagonals' crossing point, and the segment bisecting the area.

Regions with curved boundaries split into sectors and triangles: a [[circular-segment|circular segment]] cut off by a chord with central angle $\theta$ has area $\tfrac12r^2(\theta - \sin\theta)$, so a $90^\circ$ chord in a circle of radius $2$ cuts off $\pi - 2$. Lens-shaped overlaps of two circles are two segments. A [[inscribed-square|square inscribed in a triangle]] with one side on the base $b$ under height $h$ has side $\tfrac{bh}{b + h}$, from similar triangles.

Cut along lines that create shapes with known formulas, and use differences when the region is a large shape minus small ones. The next lesson uses symmetry to count and to place.`,
      related: [
        { card: "shoelace-formula", note: String.raw`the area of any polygon from coordinates (G4.4).` },
        { card: "same-base-area-ratio", note: String.raw`comparing areas of triangles that share a base or height (G1.3).` },
        { card: "trig-area", note: String.raw`$\tfrac12ab\sin C$, the base of the diagonal and segment formulas (G3.2).` }
      ],
      exercises: [
        { q: String.raw`A convex quadrilateral has diagonals of lengths $10$ and $14$. Find the perimeter of the quadrilateral formed by the midpoints of its sides.`, answer: "24",
          solution: String.raw`By Varignon's theorem the midpoint quadrilateral is a parallelogram whose sides are half the diagonals, $5$ and $7$. Its perimeter is $2(5 + 7) = 24$.` },
        { q: String.raw`A chord of a circle of radius $2$ subtends a right angle at the center. Find the area of the smaller region cut off by the chord.`, answer: "pi-2",
          solution: String.raw`The sector has area $\tfrac14 \cdot \pi \cdot 4 = \pi$, and the triangle formed by the chord and the two radii has area $\tfrac12 \cdot 2 \cdot 2 = 2$. The segment is $\pi - 2$.` }
      ],
      problems: [
        "2004 AMC 12A, Problem 8",
        "2009 AMC 12B, Problem 14",
        "2015 AMC 12A, Problem 12",
        "2007 AMC 12B, Problem 20",
        "2001 AMC 12, Problem 20",
        "2003 AMC 12A, Problem 15",
        "2020 AMC 12B, Problem 11",
        "2017 AMC 12A, Problem 19",
        "2019 AMC 12B, Problem 15",
        "2021 Spring AMC 12B, Problem 17",
        "2021 Spring AMC 12B, Problem 24",
        "2004 AIME II, Problem 1",
        "1985 AIME, Problem 4",
        "1987 AIME, Problem 6",
        "2000 AIME II, Problem 6",
        "1987 AIME, Problem 15",
        "2010 AIME I, Problem 13",
        "2021 AIME II, Problem 12",
        "2019 AIME II, Problem 13"
      ]
    },
    "G7.3": {
      prereq: ["rotation-90", "reflection-coordinates"],
      cards: ["figure-symmetries", "fit-copies", "square-crossing-segments"],
      body: String.raw`Symmetry appears in polygon problems in three ways: as a question (how many symmetries does a figure have, or how many colorings are symmetric), as a tool (a symmetric figure's center, axes and equal parts come for free), and as a structure (copies of a piece fitting together around a point). Recognizing which applies decides the approach.

The [[figure-symmetries|symmetries of a figure]] are the rotations and reflections that map it to itself. A regular $n$-gon has $n$ rotations (including the identity) and $n$ reflections, $2n$ in all: a regular hexagon has $12$, and a regular $15$-gon has $15$ lines of symmetry. A figure with a symmetry has its center fixed by every rotation and its axes fixed by reflections, so symmetric points can be paired and only part of the figure needs computing. Counting colorings or codes that are symmetric under a group of motions means coloring the orbits, the sets of cells that the motions carry into each other, independently.

[[fit-copies|Fitting copies together]] measures a piece by how many copies fill a known shape: if four congruent pieces surround a square hole inside a larger square, their total area is the difference of the squares, and angles that meet at a point where copies fit together add to $360^\circ$. This is how the angles of a tiling, or the shape of a piece in a pinwheel, are found.

Two [[square-crossing-segments|perpendicular segments across a square]], each joining opposite sides, have equal length, because a $90^\circ$ rotation about the center takes one onto the other. More generally, a $90^\circ$ rotation about the center of a square maps any line to a perpendicular line, so problems with perpendicular lines through a square, or with a smaller square tilted inside a larger one, reduce to a single right triangle repeated four times.

Look for the rotation or reflection that maps the figure to itself, and use it to pair points, equate lengths, or count orbits. The next lesson moves to lattice points and grids.`,
      related: [
        { card: "burnsides-lemma", note: String.raw`counting colorings up to symmetry by averaging fixed colorings (C4.4).` },
        { card: "reflection-composition", note: String.raw`the symmetries of a polygon as compositions of reflections (G6.2).` },
        { card: "rotation-90", note: String.raw`the quarter turn that matches perpendicular segments in a square (G6.2).` }
      ],
      exercises: [
        { q: String.raw`How many rotations and reflections (including the identity) map a regular hexagon to itself?`, answer: "12",
          solution: String.raw`There are $6$ rotations, by multiples of $60^\circ$, and $6$ reflections, in the three lines through opposite vertices and the three through midpoints of opposite sides: $12$ in all.` }
      ],
      problems: [
        "2019 AMC 12A, Problem 6",
        "2020 AMC 12A, Problem 6",
        "2015 AMC 12B, Problem 7",
        "2003 AMC 12B, Problem 10",
        "2018 AMC 12A, Problem 15",
        "2005 AIME I, Problem 14"
      ]
    },
    "G7.4": {
      prereq: ["euclidean-algorithm", "shoelace-formula"],
      cards: ["picks-theorem", "lattice-points-gcd", "british-flag-theorem"],
      body: String.raw`Points with integer coordinates give geometry an arithmetic side. How many lattice points lie on a segment, how many unit squares a line crosses, how large a lattice polygon is from the points it covers: each has a short answer through the greatest common divisor or Pick's theorem. The British flag theorem adds a quick relation for rectangles that is often useful on grids.

The segment from $(0, 0)$ to $(a, b)$ with integers $a, b$ contains $\gcd(a, b) + 1$ [[lattice-points-gcd|lattice points]], counting both ends: the points are the multiples of $\left(\tfrac{a}{g}, \tfrac{b}{g}\right)$ with $g = \gcd(a, b)$. From $(0, 0)$ to $(12, 18)$ there are $7$. The diagonal of an $a \times b$ grid passes through $a + b - \gcd(a, b)$ unit squares, since it enters a new square each time it crosses a grid line, and crossing a corner counts once for two lines. The same count in three dimensions uses inclusion-exclusion on the three families of planes.

[[picks-theorem|Pick's theorem]] gives the area of a polygon with lattice-point vertices as $A = I + \tfrac B2 - 1$, where $I$ counts lattice points inside and $B$ on the boundary. A polygon with $10$ interior and $8$ boundary points has area $13$. It turns areas into counts and counts into areas: the boundary points come from the gcd formula on each side, and the interior points follow from the area.

The [[british-flag-theorem|British flag theorem]] says that for any point $P$ and rectangle $ABCD$, $PA^2 + PC^2 = PB^2 + PD^2$, with $A$, $C$ opposite. It holds in space too, for a point anywhere and the rectangle in any plane, which makes it useful for points above a rectangular base.

Use the gcd to count lattice points on segments, Pick to pass between areas and lattice counts, and the British flag theorem for distances to the corners of a rectangle. The last lesson of the chapter counts regions and pieces.`,
      related: [
        { card: "euclidean-algorithm", note: String.raw`computing the greatest common divisor that counts lattice points (B3.1).` },
        { card: "pie", note: String.raw`counting cubes crossed by a diagonal with inclusion-exclusion (C3.2).` },
        { card: "lattice-points-circle", note: String.raw`lattice points on a circle, counted by sums of two squares.` }
      ],
      exercises: [
        { q: String.raw`A lattice polygon has $10$ lattice points strictly inside it and $8$ on its boundary. Find its area.`, answer: "13",
          solution: String.raw`By Pick's theorem, $A = I + \tfrac B2 - 1 = 10 + 4 - 1 = 13$.` },
        { q: String.raw`How many lattice points lie on the segment from $(0, 0)$ to $(12, 18)$, including the endpoints?`, answer: "7",
          solution: String.raw`$\gcd(12, 18) = 6$, so the lattice points are $k(2, 3)$ for $k = 0, 1, \ldots, 6$: $7$ points.` }
      ],
      problems: [
        "2005 AMC 12A, Problem 12",
        "2021 Spring AMC 12B, Problem 14",
        "2007 AIME II, Problem 5",
        "1996 AIME, Problem 14",
        "2016 AIME I, Problem 14",
        "2017 AIME II, Problem 14"
      ]
    },
    "G7.5": {
      prereq: ["handshake-lemma", "permutations-combinations"],
      cards: ["plane-regions", "moser-circle", "handshakes-diagonals", "steiner-neighborhood", "counting-shapes", "zonogon-minkowski"],
      body: String.raw`Counting in geometry asks how many intersection points, regions, triangles or diagonals a figure has, or how large the region swept by a moving shape is. The counts come from choosing points and lines; the regions come from Euler's formula; and swept areas follow from adding a border to a shape.

The [[handshakes-diagonals|counts of pairs]] are binomial coefficients: $n$ points make $\binom n2$ segments, an $n$-gon has $\tfrac{n(n - 3)}{2}$ diagonals, and $n$ lines in general position meet in $\binom n2$ points. Two circles meet in at most $2$ points, so $n$ circles meet in at most $2\binom n2$. [[counting-shapes|Counting the shapes in a figure]] organizes by size and position or by the vertices that determine each shape; counting triangles in a grid of points subtracts the collinear triples from all triples.

The number of [[plane-regions|regions]] made by lines and circles follows from Euler's formula $V - E + F = 2$, or from the rule that each new line adds one region plus one for each line it crosses: $n$ lines in general position make $1 + n + \binom n2$ regions, so $5$ lines make $16$. [[moser-circle|Moser's circle problem]]: chords joining $n$ points on a circle in general position cut the disk into $1 + \binom n2 + \binom n4$ regions, which is $1, 2, 4, 8, 16, 31$ for $n = 1, \ldots, 6$, breaking the pattern of powers of $2$.

The set of points within distance $r$ of a convex shape, its [[steiner-neighborhood|Steiner neighborhood]], has area $A + Pr + \pi r^2$ (area plus perimeter times $r$ plus a full disk at the corners): for a $3 \times 4$ rectangle and $r = 1$, $12 + 14 + \pi = 26 + \pi$. The region swept when a point moves by independent amounts in several directions is a [[zonogon-minkowski|zonogon]], a polygon with opposite sides parallel and equal, whose area is the sum of the areas of the parallelograms spanned by pairs of directions.

Count pairs with binomial coefficients, regions with Euler's formula or the add-one-line rule, and swept areas with the Steiner formula. The next chapter goes into three dimensions.`,
      related: [
        { card: "eulers-polyhedron-formula", note: String.raw`$V - E + F = 2$, the source of region counts (G8.5).` },
        { card: "rectangles-in-grid", note: String.raw`rectangles and squares in a grid of lines (C8.3).` },
        { card: "complementary-counting", note: String.raw`triangles as triples of points minus collinear triples (C1.3).` }
      ],
      exercises: [
        { q: String.raw`Into how many regions do $5$ lines in general position (no two parallel, no three through a point) divide the plane?`, answer: "16",
          solution: String.raw`The $k$th line crosses the $k - 1$ earlier lines and so adds $k$ regions. Starting from $1$ region, five lines give $1 + 1 + 2 + 3 + 4 + 5 = 16$, which is $1 + 5 + \binom52$.` },
        { q: String.raw`Find the area of the set of points within distance $1$ of a $3 \times 4$ rectangle (inside or outside it).`, answer: "26+pi",
          solution: String.raw`The region is the rectangle ($12$), four strips of width $1$ along the sides ($2 \cdot 3 + 2 \cdot 4 = 14$), and four quarter disks at the corners, together a disk of area $\pi$. The total is $26 + \pi$.` }
      ],
      problems: [
        "2011 AMC 12A, Problem 9",
        "2002 AMC 12B, Problem 14",
        "2001 AMC 12, Problem 14",
        "2022 AMC 12A, Problem 13",
        "2004 AMC 12A, Problem 24",
        "2005 AMC 12A, Problem 25",
        "2009 AMC 12B, Problem 25",
        "2019 AMC 12B, Problem 24",
        "1988 AIME, Problem 10",
        "2003 AIME I, Problem 5",
        "2022 AIME II, Problem 9"
      ]
    }
  }
};
