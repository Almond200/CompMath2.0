// Learn, AMC Geometry, chapter S4: geometry, coordinates, transformations and space (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S4"] = {
  lessons: {
    "S4.1": {
      prereq: ["completing-the-square", "circle-equation"],
      cards: ["conic-sections", "parabola-focus-directrix", "ellipse-properties", "hyperbola-properties", "conic-tangent-lines", "eccentricity"],
      body: String.raw`The AMC 12 includes the conic sections at the level of their equations and focal properties. Completing the square puts any conic in standard form, and a few facts for each curve answer the questions.

The [[conic-sections|conic sections]] are the degree-two curves. An [[ellipse-properties|ellipse]] $\tfrac{x^2}{a^2} + \tfrac{y^2}{b^2} = 1$ ($a \gt b$) has foci $(\pm c, 0)$ with $c^2 = a^2 - b^2$, its points have distances to the foci adding to $2a$, and its area is $\pi ab$: for $\tfrac{x^2}{16} + \tfrac{y^2}{9} = 1$ the foci are $2\sqrt7$ apart and the area is $12\pi$. A [[hyperbola-properties|hyperbola]] $\tfrac{x^2}{a^2} - \tfrac{y^2}{b^2} = 1$ has $c^2 = a^2 + b^2$, distance differences $2a$, and asymptotes $y = \pm\tfrac bax$. A [[parabola-focus-directrix|parabola]] is equidistant from a focus and a directrix: $y^2 = 12x$ has focus $(3, 0)$ and directrix $x = -3$.

The [[eccentricity|eccentricity]] $e = \tfrac ca$ is below $1$ for ellipses, $1$ for parabolas and above $1$ for hyperbolas; conics with equal eccentricity are similar. [[conic-tangent-lines|Tangent lines]] to conics have simple forms, such as $\tfrac{x_0x}{a^2} + \tfrac{y_0y}{b^2} = 1$ at $(x_0, y_0)$ on an ellipse, or come from a double root.

Complete the square, read $a$, $b$, $c$, and use the focal definitions. The next lesson treats tangency, determinants and lattice points.`,
      related: [
        { card: "axis-stretch-area", note: String.raw`an ellipse as a stretched circle (S4.3).` },
        { card: "tangency-condition", note: String.raw`tangency as a double root (S3.3).` },
        { card: "perpendicular-bisector-locus", note: String.raw`other loci defined by distances (S2.2).` }
      ],
      exercises: [
        { q: String.raw`Find the distance between the foci of $\tfrac{x^2}{16} + \tfrac{y^2}{9} = 1$.`, answer: "2sqrt(7)",
          solution: String.raw`$c^2 = 16 - 9 = 7$, so the foci $(\pm\sqrt7, 0)$ are $2\sqrt7$ apart.` },
        { q: String.raw`The parabola $y^2 = 12x$ has directrix $x = d$. Find $d$.`, answer: "-3",
          solution: String.raw`$y^2 = 4px$ with $p = 3$ has focus $(3, 0)$ and directrix $x = -3$.` }
      ],
      problems: [
        "2019 AMC 10B, Problem 10",
        "2025 AMC 12A, Problem 14",
        "2021 Spring AMC 12A, Problem 20",
        "2013 AMC 12B, Problem 21",
        "2021 Spring AMC 12A, Problem 21",
        "2022 AIME II, Problem 12",
        "2005 AIME II, Problem 15"
      ]
    },
    "S4.2": {
      prereq: ["point-line-distance", "shoelace-formula"],
      cards: ["tangency-equation", "determinant-geometric", "lattice-points-gcd", "british-flag-theorem", "varignons-theorem"],
      body: String.raw`A few coordinate facts round out the AMC 12 toolkit: tangency as an equation, the determinant as area, lattice points on segments, and two quick theorems about rectangles and quadrilaterals.

The [[tangency-equation|tangency equation]] makes "the line touches the circle" into "the distance from the center equals the radius", or "the system has a double root". The [[determinant-geometric|determinant]] $ad - bc$ is the signed area of the parallelogram spanned by $(a, b)$ and $(c, d)$, which is where the shoelace formula comes from, and linear maps scale areas by their determinant.

The segment from $(0, 0)$ to $(a, b)$ passes through $\gcd(a, b) + 1$ [[lattice-points-gcd|lattice points]]: $7$ from $(0, 0)$ to $(18, 24)$. The [[british-flag-theorem|British flag theorem]]: for any point $P$ and rectangle $ABCD$, $PA^2 + PC^2 = PB^2 + PD^2$, so $PA = 3$, $PB = 4$, $PC = 5$ give $PD = 3\sqrt2$. [[varignons-theorem|Varignon's theorem]]: the midpoints of any quadrilateral's sides form a parallelogram with half its area, sides half and parallel to the diagonals.

Use these as shortcuts once a figure is in coordinates. The next lesson treats transformations and vectors.`,
      related: [
        { card: "picks-theorem", note: String.raw`lattice areas from lattice points (S2.2).` },
        { card: "tangent-lines-from-point", note: String.raw`tangent lines from a point (S2.2).` },
        { card: "midsegment-theorem", note: String.raw`the half-length segments behind Varignon (S1.2).` }
      ],
      exercises: [
        { q: String.raw`How many lattice points lie on the segment from $(0, 0)$ to $(18, 24)$, including both ends?`, answer: "7",
          solution: String.raw`$\gcd(18, 24) = 6$, so the points are $k(3, 4)$ for $k = 0, \ldots, 6$: $7$.` },
        { q: String.raw`Point $P$ inside rectangle $ABCD$ has $PA = 3$, $PB = 4$, $PC = 5$, where $A$ and $C$ are opposite corners. Find $PD$.`, answer: "3sqrt(2)",
          solution: String.raw`$PA^2 + PC^2 = PB^2 + PD^2$, so $PD^2 = 9 + 25 - 16 = 18$ and $PD = 3\sqrt2$.` }
      ],
      problems: [
        "2008 AMC 10A, Problem 10",
        "2019 AMC 10A, Problem 10",
        "2024 AMC 10B, Problem 19",
        "2018 AMC 12B, Problem 13",
        "2001 AMC 12, Problem 20",
        "2007 AIME II, Problem 5",
        "2016 AIME I, Problem 14"
      ]
    },
    "S4.3": {
      prereq: ["rotation-90", "reflection-coordinates"],
      cards: ["reflection-composition", "rotation-reflection-matrices", "rotation-trick", "rotation-center", "vector-dot-product", "vector-projection", "axis-stretch-area", "linear-change-of-variables"],
      body: String.raw`Transformations and vectors give the AMC 12 its most efficient geometry: compositions of reflections, rotations that gather lengths, dot products for angles, and linear maps that simplify regions.

[[reflection-composition|Two reflections]] in lines meeting at angle $\alpha$ make a rotation by $2\alpha$ (lines at $25^\circ$ give $50^\circ$); in parallel lines, a translation. [[rotation-reflection-matrices|Rotation and reflection matrices]] compose by multiplication. The [[rotation-center|center of a rotation]] lies on the perpendicular bisectors of point-image pairs. The [[rotation-trick|rotation trick]] rotates part of a figure to bring three lengths into one triangle, the standard move for a point inside a square or equilateral triangle.

The [[vector-dot-product|dot product]] $\vec u \cdot \vec v = |u||v|\cos\theta$ gives angles and tests perpendicularity: $(2, 1) \cdot (1, 3) = 5$. The [[vector-projection|projection]] of $\vec u$ onto $\vec v$ has length $\tfrac{\vec u \cdot \vec v}{|\vec v|}$ and gives closest points.

[[axis-stretch-area|Stretching an axis]] by $k$ multiplies areas by $k$, so an ellipse is a stretched circle with area $\pi ab$. A [[linear-change-of-variables|linear change of variables]] turns regions like $|x + y| + |x - y| \le 2$ into squares, with areas scaled by the determinant.

Compose reflections, rotate to gather lengths, use dot products, and change variables to simplify regions. The next lesson treats regions and neighborhoods.`,
      related: [
        { card: "complex-basics", note: String.raw`rotations as multiplication by complex numbers (L13.2).` },
        { card: "determinant-geometric", note: String.raw`area scaling by determinants (S4.2).` },
        { card: "reflect-across-the-line", note: String.raw`shortest paths by reflection (S2.3).` }
      ],
      exercises: [
        { q: String.raw`Reflecting in line $\ell_1$ and then in line $\ell_2$, which meets it at $25^\circ$, is a rotation. By how many degrees?`, answer: "50",
          solution: String.raw`Two reflections in lines at angle $\alpha$ make a rotation by $2\alpha = 50^\circ$.` },
        { q: String.raw`Find the dot product of $(2, 1)$ and $(1, 3)$.`, answer: "5",
          solution: String.raw`$2 \cdot 1 + 1 \cdot 3 = 5$.` }
      ],
      problems: [
        "2025 AMC 10B, Problem 9",
        "2023 AMC 10A, Problem 19",
        "2011 AMC 12B, Problem 14",
        "2022 AMC 12A, Problem 18",
        "2018 AMC 12B, Problem 23",
        "2020 AIME II, Problem 4",
        "1992 AIME, Problem 11"
      ]
    },
    "S4.4": {
      prereq: ["plane-regions", "circle-basics"],
      cards: ["moser-circle", "steiner-neighborhood"],
      body: String.raw`Two counting-and-area facts recur: the number of regions cut by chords of a circle, and the area of the set of points near a shape.

[[moser-circle|Moser's circle problem]]: chords joining $n$ points on a circle, no three meeting inside, cut the disk into $1 + \binom n2 + \binom n4$ regions: $1, 2, 4, 8, 16, 31$ for $n = 1$ to $6$, a famous warning that patterns of small cases can mislead. With $5$ points there are $16$ regions.

The [[steiner-neighborhood|Steiner neighborhood]] of a convex shape, the points within distance $r$, has area $A + Pr + \pi r^2$: the shape, strips along the perimeter, and a disk's worth of corners. For a unit square and $r = 1$ it is $1 + 4 + \pi = 5 + \pi$. The same formula, with surface area and volume, works in space.

Count regions from crossings and chords, and add border strips and corners for neighborhoods. The last lesson of the book treats solids and space.`,
      related: [
        { card: "handshakes-diagonals", note: String.raw`counting chords and crossings (S2.4).` },
        { card: "eulers-polyhedron-formula", note: String.raw`$V - E + F = 2$ behind region counts (S2.5).` },
        { card: "circle-basics", note: String.raw`the quarter disks at the corners (S1.4).` }
      ],
      exercises: [
        { q: String.raw`Into how many regions do the chords joining $5$ points on a circle (no three chords through one interior point) divide the disk?`, answer: "16",
          solution: String.raw`$1 + \binom52 + \binom54 = 1 + 10 + 5 = 16$.` },
        { q: String.raw`Find the area of the set of points within distance $1$ of a unit square (inside or outside).`, answer: "5+pi",
          solution: String.raw`The square ($1$), four strips $1 \times 1$ ($4$), and four quarter disks ($\pi$): $5 + \pi$.` }
      ],
      problems: [
        "2008 AMC 10A, Problem 17",
        "2000 AMC 10, Problem 18",
        "2021 Fall AMC 10A, Problem 19",
        "2022 AMC 12A, Problem 13",
        "2020 AMC 10B, Problem 20",
        "2021 Spring AMC 10B, Problem 23",
        "2003 AIME I, Problem 5"
      ]
    },
    "S4.5": {
      prereq: ["prism-pyramid-volumes", "space-diagonal"],
      cards: ["frustum-volume", "regular-tetrahedron", "plane-cross-section", "dihedral-angle", "distance-3d", "plane-intercept-form", "cross-product-area", "box-tetrahedron", "equal-edge-tetrahedron"],
      body: String.raw`The AMC 12 adds tetrahedra, frustums, cross-sections, angles between planes and coordinates in space to the solids of the AMC 10.

A [[frustum-volume|frustum]] is a cone or pyramid minus a similar top: with radii $2$ and $4$ and height $3$, $V = \tfrac{\pi h}{3}(r^2 + rR + R^2) = 28\pi$. A [[regular-tetrahedron|regular tetrahedron]] of edge $a$ has volume $\tfrac{a^3}{6\sqrt2}$, which is $18\sqrt2$ for $a = 6$. A tetrahedron with [[equal-edge-tetrahedron|opposite edges equal]] fits in a box with its edges as face diagonals, and [[box-tetrahedron|boxing it]] gives its volume as a third of the box.

A [[plane-cross-section|plane cuts a solid]] in a polygon whose vertices lie on edges; the plane through the center of a cube perpendicular to a diagonal cuts a regular hexagon. The [[dihedral-angle|dihedral angle]] between faces is measured in a plane perpendicular to their common edge; for a regular tetrahedron its cosine is $\tfrac13$.

In coordinates, the [[distance-3d|distance]] adds three squares, a plane with intercepts $a$, $b$, $c$ has [[plane-intercept-form|equation $\tfrac xa + \tfrac yb + \tfrac zc = 1$]], and the [[cross-product-area|cross product]] gives areas and normal vectors.

Cut along a good plane, box tetrahedra, and compute in coordinates when needed. This completes the AMC Geometry book.`,
      related: [
        { card: "similar-figures-ratios", note: String.raw`volumes of similar solids (S1.1).` },
        { card: "vector-dot-product", note: String.raw`angles between normals (S4.3).` },
        { card: "unfold-the-surface", note: String.raw`paths on surfaces (S2.5).` }
      ],
      exercises: [
        { q: String.raw`A frustum of a cone has radii $2$ and $4$ and height $3$. Find its volume.`, answer: "28pi",
          solution: String.raw`$V = \tfrac{\pi h}{3}(r^2 + rR + R^2) = \pi(4 + 8 + 16) = 28\pi$.` },
        { q: String.raw`Find the volume of a regular tetrahedron with edge $6$.`, answer: "18sqrt(2)",
          solution: String.raw`$\tfrac{a^3}{6\sqrt2} = \tfrac{216}{6\sqrt2} = 18\sqrt2$.` }
      ],
      problems: [
        "2013 AMC 12B, Problem 11",
        "2017 AMC 12B, Problem 14",
        "2014 AMC 10B, Problem 23",
        "2004 AMC 10A, Problem 25",
        "2009 AMC 12A, Problem 22",
        "1987 AIME, Problem 2",
        "2002 AIME I, Problem 11"
      ]
    }
  }
};
