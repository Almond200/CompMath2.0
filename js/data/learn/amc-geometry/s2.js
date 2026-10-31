// Learn, AMC Geometry, chapter S2: geometry, polygons, coordinates and solids (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S2"] = {
  lessons: {
    "S2.1": {
      prereq: ["triangle-area-standard", "special-right-triangles"],
      cards: ["polygon-angle-sums", "regular-polygon-area", "regular-hexagon-area", "regular-octagon", "regular-dodecagon", "equilateral-triangle-facts", "equiangular-polygon", "area-by-pieces", "trapezoid-parallelogram-areas", "parallelogram-area", "quadrilateral-diagonal-area", "trapezoid-special-segments", "circular-segment", "inscribed-square"],
      body: String.raw`Polygon problems ask for angles, areas and lengths in regular and irregular figures. Regular polygons split into congruent triangles from the center; other figures split into, or are cut out of, shapes with known areas.

The interior [[polygon-angle-sums|angles of an $n$-gon]] add to $180^\circ(n - 2)$ and the exterior angles to $360^\circ$, so a regular $12$-gon has angles of $150^\circ$. An [[equilateral-triangle-facts|equilateral triangle]] of side $s$ has area $\tfrac{\sqrt3}{4}s^2$; a [[regular-hexagon-area|regular hexagon]] is six of them, $\tfrac{3\sqrt3}{2}s^2$, which is $24\sqrt3$ for $s = 4$. A [[regular-octagon|regular octagon]] is a square with its corners cut off, area $2(1 + \sqrt2)s^2$; a [[regular-dodecagon|regular dodecagon]] with circumradius $R$ has area $3R^2$. [[regular-polygon-area|Any regular polygon]] has area half its perimeter times its apothem. An [[equiangular-polygon|equiangular polygon]] is completed into a triangle or rectangle by extending sides.

[[area-by-pieces|Area by pieces]] adds or subtracts simple shapes. A [[trapezoid-parallelogram-areas|trapezoid]] has area the average of the bases times the height ($48$ for bases $5$ and $11$ and height $6$); a [[parallelogram-area|parallelogram]] is base times height; any convex [[quadrilateral-diagonal-area|quadrilateral]] is $\tfrac12d_1d_2\sin\theta$. The [[trapezoid-special-segments|special segments of a trapezoid]], parallel to the bases, are the averages of the bases (the midline), and through the diagonals' crossing point the harmonic mean. A [[circular-segment|circular segment]] is a sector minus a triangle: in a circle of radius $6$, a $60^\circ$ chord cuts off $6\pi - 9\sqrt3$. A [[inscribed-square|square inscribed in a triangle]] on its base has side $\tfrac{bh}{b + h}$.

Split from the center, cut into known shapes, and subtract what is outside. The next lesson works in coordinates.`,
      related: [
        { card: "shoelace-formula", note: String.raw`areas from coordinates (S2.2).` },
        { card: "varignons-theorem", note: String.raw`the midpoint quadrilateral (S4.2).` },
        { card: "golden-ratio-pentagon", note: String.raw`the regular pentagon (G7.1).` }
      ],
      exercises: [
        { q: String.raw`Find the area of a regular hexagon with side $4$.`, answer: "24sqrt(3)",
          solution: String.raw`It is six equilateral triangles of side $4$, each of area $4\sqrt3$, so $24\sqrt3$.` },
        { q: String.raw`A chord of a circle of radius $6$ subtends a $60^\circ$ angle at the center. Find the area of the smaller region it cuts off.`, answer: "6pi-9sqrt(3)",
          solution: String.raw`The sector has area $\tfrac16 \cdot 36\pi = 6\pi$, and the triangle with the two radii is equilateral with area $\tfrac{\sqrt3}{4} \cdot 36 = 9\sqrt3$. The segment is $6\pi - 9\sqrt3$.` }
      ],
      problems: [
        "2021 Fall AMC 10A, Problem 2",
        "2021 Fall AMC 10B, Problem 11",
        "2006 AMC 10B, Problem 15",
        "2002 AMC 10B, Problem 17",
        "2003 AMC 10A, Problem 19",
        "2003 AMC 12A, Problem 14",
        "2003 AMC 12B, Problem 16",
        "2004 AMC 10B, Problem 25"
      ]
    },
    "S2.2": {
      prereq: ["pythagorean-theorem"],
      cards: ["distance-midpoint", "line-forms", "point-line-distance", "circle-equation", "coordinate-bash", "angle-between-lines", "section-formula", "parallel-lines-distance", "tangent-lines-from-point", "angle-bisectors-of-lines", "shoelace-formula", "picks-theorem", "perpendicular-bisector-locus", "bisector-closer-region"],
      body: String.raw`Coordinates turn any figure into algebra. With a good placement and a few formulas, distances, intersections and areas follow mechanically, which makes coordinates the reliable fallback for AMC geometry.

[[coordinate-bash|Place the figure well]]: right angles on the axes, centers at the origin, symmetry across an axis. Then use the [[distance-midpoint|distance and midpoint formulas]], the [[line-forms|forms of a line]] (slope-intercept, point-slope, standard), and the [[circle-equation|equation of a circle]] $(x - h)^2 + (y - k)^2 = r^2$. The [[section-formula|point dividing a segment]] in the ratio $m : n$ is the weighted average $\tfrac{nA + mB}{m + n}$.

The [[point-line-distance|distance from a point to a line]] $ax + by + c = 0$ is $\tfrac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$: from $(2, -1)$ to $3x - 4y + 5 = 0$ it is $3$. [[parallel-lines-distance|Parallel lines]] are $\tfrac{|c_1 - c_2|}{\sqrt{a^2 + b^2}}$ apart. The [[angle-between-lines|angle between lines]] with slopes $m_1$, $m_2$ has tangent $\left|\tfrac{m_1 - m_2}{1 + m_1m_2}\right|$, and the [[angle-bisectors-of-lines|bisectors of two lines]] are the points equally far from both. [[tangent-lines-from-point|Tangent lines from a point]] to a circle are found by setting the distance from the center equal to the radius.

The [[shoelace-formula|shoelace formula]] gives the area of a polygon from its vertices: $(0, 0)$, $(5, 1)$, $(4, 6)$ enclose $13$. For lattice polygons, [[picks-theorem|Pick's theorem]] $A = I + \tfrac B2 - 1$ trades area for counts of lattice points. The [[perpendicular-bisector-locus|perpendicular bisector]] is the set of points equidistant from two points, and the [[bisector-closer-region|angle bisector]] separates points closer to one side from points closer to the other.

Place, compute, and use the area formulas. The next lesson treats transformations.`,
      related: [
        { card: "conic-sections", note: String.raw`parabolas, ellipses and hyperbolas (S4.1).` },
        { card: "determinant-geometric", note: String.raw`the determinant behind the shoelace formula (S4.2).` },
        { card: "lattice-points-gcd", note: String.raw`lattice points on a segment (S4.2).` }
      ],
      exercises: [
        { q: String.raw`Find the distance from $(2, -1)$ to the line $3x - 4y + 5 = 0$.`, answer: "3",
          solution: String.raw`$\tfrac{|6 + 4 + 5|}{\sqrt{9 + 16}} = \tfrac{15}{5} = 3$.` },
        { q: String.raw`Find the area of the triangle with vertices $(0, 0)$, $(5, 1)$ and $(4, 6)$.`, answer: "13",
          solution: String.raw`By the shoelace formula, $\tfrac12|5 \cdot 6 - 4 \cdot 1| = \tfrac{26}{2} = 13$.` },
        { q: String.raw`A lattice polygon has $6$ lattice points inside and $10$ on its boundary. Find its area.`, answer: "10",
          solution: String.raw`Pick's theorem: $6 + \tfrac{10}{2} - 1 = 10$.` }
      ],
      problems: [
        "2010 AMC 10A, Problem 7",
        "2003 AMC 10B, Problem 11",
        "2003 AMC 12B, Problem 9",
        "2025 AMC 12A, Problem 11",
        "2022 AMC 12B, Problem 13",
        "2024 AMC 12B, Problem 15",
        "2020 AMC 12A, Problem 17",
        "2007 AMC 12A, Problem 19"
      ]
    },
    "S2.3": {
      prereq: ["distance-midpoint"],
      cards: ["reflection-coordinates", "rotation-90", "composing-transformations", "reflect-across-the-line", "folded-paper", "figure-symmetries", "fit-copies"],
      body: String.raw`Reflections and rotations move figures without changing them, and the AMC uses them in three ways: tracking where a point goes, finding shortest paths, and using a figure's symmetry.

[[reflection-coordinates|Reflections]] over the axes and the line $y = x$ have simple formulas: over $y = x$, $(4, 1)$ goes to $(1, 4)$; over the $x$-axis, the $y$-coordinate changes sign. A [[rotation-90|rotation by $90^\circ$]] counterclockwise about the origin sends $(x, y)$ to $(-y, x)$, so $(3, 2)$ goes to $(-2, 3)$. [[composing-transformations|Composing transformations]] applies them in order; a reflection followed by another reflection is a rotation or a translation.

[[reflect-across-the-line|Reflecting across a line]] finds shortest paths: the shortest path from $A$ to a line and then to $B$ (both on one side) is the straight segment from $A$ to the reflection of $B$. A [[folded-paper|fold]] is a reflection in the crease, so the crease is the perpendicular bisector of a point and its image, and folded parts are congruent.

The [[figure-symmetries|symmetries of a figure]] are the motions that map it to itself: a regular $n$-gon has $n$ rotations and $n$ lines of symmetry, so a regular $9$-gon has $9$ lines. [[fit-copies|Fitting copies together]] finds a piece's angles or area from how many copies fill a known shape.

Write each move as a formula, reflect to straighten paths, and use symmetry to halve work. The next lesson counts in figures.`,
      related: [
        { card: "reflection-composition", note: String.raw`compositions of reflections in general (S4.3).` },
        { card: "rotation-trick", note: String.raw`rotating part of a figure (S4.3).` },
        { card: "perpendicular-bisector-locus", note: String.raw`the crease of a fold (S2.2).` }
      ],
      exercises: [
        { q: String.raw`The point $(3, 2)$ is rotated $90^\circ$ counterclockwise about the origin. Find the sum of the coordinates of its image.`, answer: "1",
          solution: String.raw`$(x, y) \to (-y, x)$ gives $(-2, 3)$, with sum $1$.` },
        { q: String.raw`How many lines of symmetry does a regular $9$-gon have?`, answer: "9",
          solution: String.raw`Each line passes through a vertex and the midpoint of the opposite side, one per vertex: $9$.` }
      ],
      problems: [
        "2012 AMC 10B, Problem 3",
        "2015 AMC 10B, Problem 8",
        "2022 AMC 12B, Problem 5",
        "2018 AMC 10A, Problem 13",
        "2003 AMC 12A, Problem 9",
        "2000 AMC 12, Problem 10",
        "2014 AMC 10A, Problem 18",
        "2014 AMC 10A, Problem 23"
      ]
    },
    "S2.4": {
      prereq: ["permutations-combinations"],
      cards: ["plane-regions", "handshakes-diagonals", "counting-shapes", "zonogon-minkowski", "rectangles-in-grid"],
      body: String.raw`Counting meets geometry in questions about diagonals, intersection points, regions and shapes in a figure. Each is a choice of points or lines.

[[handshakes-diagonals|Pairs]] count with binomial coefficients: an $n$-gon has $\tfrac{n(n - 3)}{2}$ diagonals, $54$ for a $12$-gon, and $n$ lines in general position cross in $\binom n2$ points. [[plane-regions|Regions]] grow as lines are added: the $k$th line crosses $k - 1$ others and adds $k$ regions, so $n$ lines make $1 + n + \binom n2$ regions, $22$ for $6$ lines.

[[rectangles-in-grid|Rectangles in a grid]] are choices of two vertical and two horizontal lines: a $4 \times 4$ grid of squares has $\binom52^2 = 100$ rectangles. [[counting-shapes|Other shapes]], such as triangles or squares in a figure, are organized by size and position, or by the points that determine them, minus degenerate choices. Regions swept by points moving in independent directions are [[zonogon-minkowski|zonogons]], polygons with opposite sides parallel and equal.

Choose points or lines, count with binomial coefficients, and organize irregular shapes by size. The last lesson of the chapter treats solids.`,
      related: [
        { card: "moser-circle", note: String.raw`regions made by chords of a circle (S4.4).` },
        { card: "complementary-counting", note: String.raw`subtracting collinear triples (R1.2).` },
        { card: "eulers-polyhedron-formula", note: String.raw`$V - E + F = 2$, behind region counts (S2.5).` }
      ],
      exercises: [
        { q: String.raw`How many diagonals does a convex $12$-gon have?`, answer: "54",
          solution: String.raw`$\tfrac{12 \cdot 9}{2} = 54$.` },
        { q: String.raw`Into how many regions do $6$ lines in general position divide the plane?`, answer: "22",
          solution: String.raw`$1 + 6 + \binom62 = 1 + 6 + 15 = 22$.` }
      ],
      problems: [
        "2024 AMC 10A, Problem 6",
        "2011 AMC 12A, Problem 9",
        "2004 AMC 10A, Problem 16",
        "2002 AMC 10B, Problem 18",
        "2001 AMC 12, Problem 14",
        "2017 AMC 10A, Problem 23",
        "2023 AMC 10B, Problem 24",
        "2005 AMC 12A, Problem 25"
      ]
    },
    "S2.5": {
      prereq: ["pythagorean-theorem", "similar-figures-ratios"],
      cards: ["prism-pyramid-volumes", "cone-formulas", "sphere-formulas", "cube", "space-diagonal", "regular-octahedron", "painted-cubes", "scale-one-level", "cavalieris-principle", "unfold-the-surface", "cube-nets", "eulers-polyhedron-formula"],
      body: String.raw`Solid geometry on the AMC 10 asks for volumes, surface areas and distances in familiar shapes. Most of the work is a Pythagorean computation in a well-chosen plane.

[[prism-pyramid-volumes|Volumes]]: a prism or cylinder is base times height (a cylinder of radius $3$ and height $5$ holds $45\pi$), and a pyramid or cone is a third of that. A [[cone-formulas|cone]] has lateral area $\pi r\ell$ with slant height $\ell$. A [[sphere-formulas|sphere]] has volume $\tfrac43\pi r^3$ and area $4\pi r^2$, so radius $6$ gives area $144\pi$. A [[cube|cube]] of edge $s$ has face diagonal $s\sqrt2$ and [[space-diagonal|space diagonal]] $s\sqrt3$ ($4\sqrt3$ for $s = 4$), and a box $a \times b \times c$ has diagonal $\sqrt{a^2 + b^2 + c^2}$. A [[regular-octahedron|regular octahedron]] is two square pyramids.

[[painted-cubes|Painted cubes]]: an $n \times n \times n$ cube cut into unit cubes has $8$ corners with three painted faces, $12(n - 2)$ with two, $6(n - 2)^2$ with one; for $n = 4$, $24$ have exactly two. [[scale-one-level|Similar solids]] scale volumes by the cube of the ratio, and [[cavalieris-principle|Cavalieri's principle]] says solids with equal cross-sections at every height have equal volumes.

[[unfold-the-surface|Unfolding the surface]] turns a shortest path on a box or cone into a straight line on a flat net. [[cube-nets|Folding a net]] decides which faces are opposite. [[eulers-polyhedron-formula|Euler's formula]] $V - E + F = 2$ relates the counts: a solid with $8$ vertices and $6$ faces has $12$ edges.

Find lengths in a plane through the solid, then apply the formulas. The next chapter adds the triangle and circle geometry of the AMC 12.`,
      related: [
        { card: "frustum-volume", note: String.raw`truncated cones and pyramids (S4.5).` },
        { card: "regular-tetrahedron", note: String.raw`the regular tetrahedron (S4.5).` },
        { card: "distance-3d", note: String.raw`coordinates in space (S4.5).` }
      ],
      exercises: [
        { q: String.raw`Find the space diagonal of a cube with edge $4$.`, answer: "4sqrt(3)",
          solution: String.raw`$\sqrt{4^2 + 4^2 + 4^2} = 4\sqrt3$.` },
        { q: String.raw`A $4 \times 4 \times 4$ cube is painted and cut into unit cubes. How many unit cubes have exactly two painted faces?`, answer: "24",
          solution: String.raw`They lie along the $12$ edges, excluding corners: $12(4 - 2) = 24$.` },
        { q: String.raw`A convex polyhedron has $8$ vertices and $6$ faces. How many edges does it have?`, answer: "12",
          solution: String.raw`$V - E + F = 2$ gives $E = 8 + 6 - 2 = 12$.` }
      ],
      problems: [
        "2020 AMC 10B, Problem 2",
        "2020 AMC 10B, Problem 10",
        "2020 AMC 12A, Problem 7",
        "2005 AMC 12A, Problem 10",
        "2019 AMC 12B, Problem 11",
        "2003 AMC 12B, Problem 13",
        "2001 AMC 12, Problem 15",
        "2011 AMC 10A, Problem 24"
      ]
    }

  }
};
