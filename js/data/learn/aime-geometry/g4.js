// Learn, AIME Geometry, chapter G4: coordinate and analytic geometry (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["G4"] = {
  lessons: {
    "G4.1": {
      prereq: ["distance-midpoint", "line-forms", "circle-equation"],
      cards: [],
      body: String.raw`This chapter solves geometry problems with coordinates. Its tools are a good choice of axes, the formulas for lines, circles, distances and intersections, areas from coordinates, the equations of parabolas, ellipses and hyperbolas, and loci, the sets of points that satisfy a condition.

Coordinates turn a figure into equations, and the main decision is where to put the axes: at a right angle, along a line of symmetry, with a vertex or a center at the origin, so that as many coordinates as possible are $0$. After that the work is algebra.

A line is $ax + by = c$, and the distance from a point $(x_0, y_0)$ to it is $\tfrac{|ax_0 + by_0 - c|}{\sqrt{a^2 + b^2}}$: from $(1, 2)$ to $3x + 4y = 1$ it is $\tfrac{|3 + 8 - 1|}{5} = 2$. A circle is $(x - h)^2 + (y - k)^2 = r^2$, found by completing the square: $x^2 + y^2 - 6x + 4y - 12 = 0$ is $(x - 3)^2 + (y + 2)^2 = 25$, a circle of radius $5$. A line is tangent to a circle when its distance from the center equals the radius.

The area of a polygon with known vertices is given by the shoelace formula: for $(0, 0)$, $(4, 0)$, $(1, 3)$ it is $\tfrac12|4 \cdot 3 - 1 \cdot 0| = 6$. The conics have their own equations and properties: a parabola is the set of points equally far from a focus and a line, an ellipse the points whose distances to two foci have a fixed sum.

A locus is the set of points satisfying a condition, such as being equally far from two points (a perpendicular bisector) or twice as far from one point as from another (a circle). Identifying the locus first often answers the question at once.

The lessons take these ideas in turn: choosing coordinates (G4.2), lines, circles and distances (G4.3), areas from coordinates (G4.4), parabolas and conics (G4.5), and loci and optimization (G4.6). The Summary (G4.7) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the distance from the point $(1, 2)$ to the line $3x + 4y = 1$.`, answer: "2",
          solution: String.raw`By the point-line distance formula, $\tfrac{|3 \cdot 1 + 4 \cdot 2 - 1|}{\sqrt{3^2 + 4^2}} = \tfrac{10}{5} = 2$.` },
        { q: String.raw`Find the area of the triangle with vertices $(0, 0)$, $(4, 0)$ and $(1, 3)$.`, answer: "6",
          solution: String.raw`The base on the $x$-axis has length $4$ and the height is $3$, so the area is $6$. The shoelace formula gives the same: $\tfrac12|0 \cdot 0 - 4 \cdot 0 + 4 \cdot 3 - 1 \cdot 0 + 1 \cdot 0 - 0 \cdot 3| = 6$.` },
        { q: String.raw`Find the radius of the circle $x^2 + y^2 - 6x + 4y - 12 = 0$.`, answer: "5",
          solution: String.raw`Complete the squares: $(x - 3)^2 - 9 + (y + 2)^2 - 4 - 12 = 0$, so $(x - 3)^2 + (y + 2)^2 = 25$. The radius is $5$.` }
      ],
      problems: [
        "2001 AIME I, Problem 5",
        "1997 AIME, Problem 7",
        "2008 AIME II, Problem 10"
      ]
    },
    "G4.2": {
      prereq: ["distance-midpoint", "line-forms"],
      cards: ["coordinate-bash"],
      body: String.raw`Coordinates turn any geometry problem into algebra, and with a good choice of axes the algebra is short. Squares, rectangles, right triangles and figures with a line of symmetry are the natural candidates: put the right angle or the center at the origin, the sides along the axes, and every point the problem mentions becomes a pair of simple numbers. Distances, midpoints, intersections and areas then follow by formula.

[[coordinate-bash|Coordinate bashing]] has one important decision, the placement. Put the most constrained point at the origin and the most important line on an axis; use symmetry to make coordinates opposite in sign; and scale so that the given lengths are whole numbers. For a square $ABCD$ of side $4$, take $A = (0, 0)$, $B = (4, 0)$, $C = (4, 4)$, $D = (0, 4)$; the midpoint of $CD$ is $M = (2, 4)$, line $BM$ is $2x + y = 8$, and the distance from $A$ to it is $\tfrac{8}{\sqrt5} = \tfrac{8\sqrt5}{5}$. For a triangle with a known side, put that side on the $x$-axis with its midpoint or one end at the origin; the third vertex is then found from two distance equations, whose difference is linear.

Unknown lengths become variables, and conditions become equations: a point on a line satisfies the line's equation, a right angle means a zero dot product or slopes with product $-1$, equal distances mean equal squared distances. Keeping the number of variables small is the main way to keep the computation short, which is why a good placement matters more than any later trick.

Coordinates are not always the best route: arbitrary angles produce square roots, and circles in general position produce quadratic equations. When a figure has a circle, put its center at the origin; when it has an angle, consider trigonometry instead.

Choose coordinates that make the figure's main features simple, then compute. The next lesson collects the formulas for lines and circles.`,
      related: [
        { card: "vector-bash", note: String.raw`the same computation with vectors, which avoids choosing axes (G6.4).` },
        { card: "complex-bash", note: String.raw`coordinates as complex numbers, convenient for rotations (G6.3).` },
        { card: "distance-3d", note: String.raw`coordinates in space (G8.4).` }
      ],
      exercises: [
        { q: String.raw`Square $ABCD$ has side $4$, and $M$ is the midpoint of $CD$. Find the distance from $A$ to the line $BM$.`, answer: "8sqrt(5)/5",
          solution: String.raw`With $A = (0, 0)$, $B = (4, 0)$, $C = (4, 4)$, $D = (0, 4)$, $M = (2, 4)$. Line $BM$ has slope $-2$ and equation $2x + y - 8 = 0$, so the distance from the origin is $\tfrac{8}{\sqrt{4 + 1}} = \tfrac{8}{\sqrt5} = \tfrac{8\sqrt5}{5}$.` }
      ],
      problems: [
        "2025 AMC 12B, Problem 10",
        "2022 AMC 12B, Problem 13",
        "2020 AMC 12A, Problem 18",
        "2020 AMC 12B, Problem 18",
        "2021 Spring AMC 12A, Problem 17",
        "2017 AMC 12A, Problem 16",
        "2014 AMC 12B, Problem 21",
        "2016 AMC 12B, Problem 21",
        "2019 AMC 12A, Problem 22",
        "1983 AIME, Problem 4",
        "1999 AIME, Problem 2",
        "2001 AIME II, Problem 4",
        "2015 AIME I, Problem 4",
        "2021 AIME I, Problem 6",
        "2017 AIME II, Problem 10"
      ]
    },
    "G4.3": {
      prereq: ["point-line-distance", "circle-equation"],
      cards: ["angle-between-lines", "section-formula", "parallel-lines-distance", "incenter-coordinates", "tangency-equation", "tangent-lines-from-point", "angle-bisectors-of-lines"],
      body: String.raw`Once a figure is in coordinates, a short list of formulas does almost all the work: the distance from a point to a line, the angle between two lines, the point dividing a segment in a ratio, the centers of a triangle as weighted averages, and the condition for a line to be tangent to a circle. Each replaces a construction with a computation.

The distance from $(x_0, y_0)$ to the line $ax + by + c = 0$ is $\tfrac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$; from $(3, 4)$ to $3x + 4y - 10 = 0$ it is $\tfrac{15}{5} = 3$. Two [[parallel-lines-distance|parallel lines]] $ax + by + c_1 = 0$ and $ax + by + c_2 = 0$ are $\tfrac{|c_1 - c_2|}{\sqrt{a^2 + b^2}}$ apart. The [[angle-between-lines|angle between two lines]] with slopes $m_1$ and $m_2$ has $\tan\theta = \left|\tfrac{m_1 - m_2}{1 + m_1m_2}\right|$, the tangent subtraction formula; slopes $1$ and $3$ meet at an angle with tangent $\tfrac12$. The [[angle-bisectors-of-lines|bisectors of the angle between two lines]] are the points at equal distance from both, $\tfrac{a_1x + b_1y + c_1}{\sqrt{a_1^2 + b_1^2}} = \pm\tfrac{a_2x + b_2y + c_2}{\sqrt{a_2^2 + b_2^2}}$.

The [[section-formula|section formula]] gives the point dividing $A$ to $B$ in the ratio $m : n$ as $\tfrac{nA + mB}{m + n}$: from $(1, 2)$ to $(7, 8)$ in the ratio $1 : 2$ it is $(3, 4)$. The triangle centers are [[incenter-coordinates|weighted averages of the vertices]]: the centroid with equal weights, the incenter with weights equal to the opposite side lengths, $\tfrac{aA + bB + cC}{a + b + c}$, and the excenters with one weight negated.

A line is tangent to a circle exactly when its distance from the center equals the radius, and that [[tangency-equation|tangency equation]] is the standard way to find tangent lines: for lines through a point, write $y - y_0 = m(x - x_0)$ and set the distance equal to $r$, which gives a quadratic in $m$ whose two roots are the slopes of the [[tangent-lines-from-point|tangent lines from the point]]. For a curve that is not a circle, tangency means the equation for the common points has a double root, so its discriminant is zero. Families of lines, such as segments of fixed length with ends on the axes, touch an envelope curve, and a point on it is found by the same double-root condition.

Keep these formulas ready, and convert geometric conditions (tangent, bisects, divides in a ratio) into them. The next lesson computes areas from coordinates.`,
      related: [
        { card: "point-line-distance", note: String.raw`the distance formula that most of these rest on.` },
        { card: "angle-addition", note: String.raw`the tangent subtraction formula behind the angle between lines (A7.3).` },
        { card: "tangency-condition", note: String.raw`the general double-root condition for tangency (G2.6).` }
      ],
      exercises: [
        { q: String.raw`Find the distance from the point $(3, 4)$ to the line $3x + 4y - 10 = 0$.`, answer: "3",
          solution: String.raw`$\tfrac{|3 \cdot 3 + 4 \cdot 4 - 10|}{\sqrt{9 + 16}} = \tfrac{15}{5} = 3$.` },
        { q: String.raw`Two lines have slopes $1$ and $3$. Find the tangent of the acute angle between them.`, answer: "1/2",
          solution: String.raw`$\tan\theta = \left|\tfrac{3 - 1}{1 + 3 \cdot 1}\right| = \tfrac24 = \tfrac12$.` },
        { q: String.raw`The point $P$ divides the segment from $(1, 2)$ to $(7, 8)$ in the ratio $1 : 2$, starting from $(1, 2)$. Find the sum of the coordinates of $P$.`, answer: "7",
          solution: String.raw`$P$ is one third of the way: $(1, 2) + \tfrac13(6, 6) = (3, 4)$, and $3 + 4 = 7$.` }
      ],
      problems: [
        "2020 AMC 12B, Problem 7",
        "2023 AMC 12A, Problem 11",
        "2021 Fall AMC 12A, Problem 13",
        "2009 AMC 12B, Problem 9",
        "2005 AMC 12B, Problem 14",
        "2007 AMC 12A, Problem 19",
        "2018 AMC 12A, Problem 17",
        "2012 AMC 12A, Problem 12",
        "2003 AMC 12A, Problem 17",
        "2018 AMC 12A, Problem 16",
        "2012 AMC 12B, Problem 17",
        "1984 AIME, Problem 6",
        "1990 AIME, Problem 7",
        "2011 AIME I, Problem 3",
        "2000 AIME I, Problem 13",
        "1993 AIME, Problem 13",
        "1983 AIME, Problem 15",
        "2024 AIME II, Problem 12"
      ]
    },
    "G4.4": {
      prereq: ["coordinate-bash"],
      cards: ["shoelace-formula", "determinant-geometric"],
      body: String.raw`The area of any polygon with known vertices is one formula away, and that makes coordinates especially good for area questions: the area of a quadrilateral cut out by several lines, the area of a triangle whose vertices are intersections, or the area of a region whose vertices depend on a parameter. The formula is the shoelace formula, and behind it is the determinant as a signed area.

The [[determinant-geometric|determinant as signed area]] says that the parallelogram spanned by vectors $(a, b)$ and $(c, d)$ has area $|ad - bc|$, and the triangle half of that; the sign records orientation. So the triangle with vertices $(0, 0)$, $(x_1, y_1)$, $(x_2, y_2)$ has area $\tfrac12|x_1y_2 - x_2y_1|$, and translating a vertex to the origin handles any triangle. Linear maps scale all areas by the absolute value of their determinant, which is why a shear preserves area and a stretch by $k$ in one direction multiplies it by $k$.

The [[shoelace-formula|shoelace formula]] adds these triangle areas around a polygon: for vertices $(x_1, y_1), \ldots, (x_n, y_n)$ in order, the area is $\tfrac12\left|\sum_i (x_iy_{i+1} - x_{i+1}y_i)\right|$, with indices wrapping around. For $(0, 0)$, $(4, 1)$, $(3, 5)$, $(-1, 3)$ the cross terms are $0$, $17$, $14$, $0$, so the area is $\tfrac{31}{2}$. The vertices must be listed in order around the polygon; listing them out of order gives the area of a self-crossing figure.

With parameters, the shoelace formula gives the area as a polynomial in the parameter, which can then be set equal to a target or maximized. Problems with vertices on curves such as $y = \log x$ or $y = x^2$ become sums of simple terms; lattice-point problems combine it with Pick's theorem.

Use the shoelace formula whenever the vertices are known or can be computed, and the determinant to see how transformations change area. The next lesson studies the conic sections.`,
      related: [
        { card: "picks-theorem", note: String.raw`the area of a lattice polygon from its lattice points (G7.5).` },
        { card: "axis-stretch-area", note: String.raw`stretching one axis multiplies areas by the stretch factor (G6.5).` },
        { card: "cross-product-area", note: String.raw`the area of a triangle in space (G8.4).` }
      ],
      exercises: [
        { q: String.raw`Find the area of the quadrilateral with vertices $(0, 0)$, $(4, 1)$, $(3, 5)$ and $(-1, 3)$, in that order.`, answer: "31/2",
          solution: String.raw`By the shoelace formula, the terms $x_iy_{i+1} - x_{i+1}y_i$ are $0 \cdot 1 - 4 \cdot 0 = 0$, $4 \cdot 5 - 3 \cdot 1 = 17$, $3 \cdot 3 - (-1) \cdot 5 = 14$ and $(-1) \cdot 0 - 0 \cdot 3 = 0$. The area is $\tfrac12(0 + 17 + 14 + 0) = \tfrac{31}{2}$.` }
      ],
      problems: [
        "2019 AMC 12A, Problem 5",
        "2013 AMC 12A, Problem 13",
        "2024 AMC 12B, Problem 7",
        "2009 AMC 12B, Problem 22",
        "2017 AMC 12B, Problem 24",
        "2005 AIME I, Problem 10",
        "2009 AIME I, Problem 11",
        "2018 AIME II, Problem 9",
        "1986 AIME, Problem 15"
      ]
    },
    "G4.5": {
      prereq: ["completing-the-square", "circle-equation"],
      cards: ["conic-sections", "parabola-focus-directrix", "ellipse-properties", "hyperbola-properties", "conic-tangent-lines", "eccentricity"],
      body: String.raw`Ellipses, parabolas and hyperbolas appear on the AMC 12 and AIME at the level of their equations and their focal properties: find the foci of an ellipse, the focus of a parabola, the asymptotes of a hyperbola, or the points where two conics meet. A handful of facts for each curve, together with completing the square to read off centers, suffices.

The [[conic-sections|conic sections]] are the curves of degree $2$, and completing the square puts each in a standard form. An [[ellipse-properties|ellipse]] $\tfrac{x^2}{a^2} + \tfrac{y^2}{b^2} = 1$ with $a \gt b$ is the set of points whose distances to the two foci $(\pm c, 0)$ add to $2a$, where $c^2 = a^2 - b^2$; for $\tfrac{x^2}{25} + \tfrac{y^2}{9} = 1$ the foci are $8$ apart and the distances add to $10$. Its area is $\pi ab$. A [[hyperbola-properties|hyperbola]] $\tfrac{x^2}{a^2} - \tfrac{y^2}{b^2} = 1$ is the set where the difference of the distances to the foci is $2a$, with $c^2 = a^2 + b^2$ and asymptotes $y = \pm\tfrac bax$. A [[parabola-focus-directrix|parabola]] is the set of points equidistant from a focus and a line, the directrix: $y = \tfrac{x^2}{4p}$ has focus $(0, p)$ and directrix $y = -p$, so $y = \tfrac{x^2}{8}$ has focus $(0, 2)$.

The [[eccentricity|eccentricity]] $e = \tfrac ca$ measures the shape: $e = 0$ for a circle, $0 \lt e \lt 1$ for an ellipse, $e = 1$ for a parabola, $e \gt 1$ for a hyperbola; for $\tfrac{x^2}{16} - \tfrac{y^2}{9} = 1$, $e = \tfrac54$. Every conic is the set of points whose distance to a focus is $e$ times the distance to a directrix, and two conics with the same eccentricity are similar. [[conic-tangent-lines|Tangent lines to conics]] have simple equations: the tangent to $\tfrac{x^2}{a^2} + \tfrac{y^2}{b^2} = 1$ at $(x_0, y_0)$ is $\tfrac{x_0x}{a^2} + \tfrac{y_0y}{b^2} = 1$, and a line is tangent exactly when substituting it gives a double root.

The focal definitions are often faster than equations. Problems about a point whose distances to two fixed points add to a constant, or about reflections off a curved mirror, are ellipse problems in disguise; problems about points equidistant from a point and a line are parabola problems. Intersections of two conics come from combining their equations to eliminate a variable or the squared terms.

Read centers and axes by completing the square, use the focal sums and differences, and treat tangency as a double root. The last lesson of the chapter studies loci and optimization.`,
      related: [
        { card: "completing-the-square", note: String.raw`putting a conic's equation in standard form (A1.4).` },
        { card: "linear-change-of-variables", note: String.raw`stretching an ellipse into a circle, which scales areas (G6.5).` },
        { card: "conic-reflective-property", note: String.raw`the reflection property of the foci.` }
      ],
      exercises: [
        { q: String.raw`Find the distance between the foci of the ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{9} = 1$.`, answer: "8",
          solution: String.raw`$c^2 = a^2 - b^2 = 25 - 9 = 16$, so $c = 4$ and the foci $(\pm4, 0)$ are $8$ apart.` },
        { q: String.raw`Find the $y$-coordinate of the focus of the parabola $y = \tfrac{x^2}{8}$.`, answer: "2",
          solution: String.raw`$y = \tfrac{x^2}{4p}$ with $4p = 8$, so $p = 2$ and the focus is $(0, 2)$.` },
        { q: String.raw`Find the eccentricity of the hyperbola $\tfrac{x^2}{16} - \tfrac{y^2}{9} = 1$.`, answer: "5/4",
          solution: String.raw`$c^2 = a^2 + b^2 = 25$, so $c = 5$ and $e = \tfrac ca = \tfrac54$.` }
      ],
      problems: [
        "2019 AMC 12B, Problem 6",
        "2006 AMC 12B, Problem 21",
        "2015 AMC 12A, Problem 21",
        "2025 AMC 12A, Problem 14",
        "2021 Spring AMC 12A, Problem 21",
        "2011 AMC 12B, Problem 14",
        "2021 Spring AMC 12A, Problem 20",
        "2013 AMC 12B, Problem 21",
        "2014 AMC 12A, Problem 25",
        "2022 AIME II, Problem 12",
        "2024 AIME I, Problem 9",
        "2005 AIME II, Problem 15",
        "2021 AIME I, Problem 15"
      ]
    },
    "G4.6": {
      prereq: ["distance-midpoint", "circle-equation"],
      cards: ["perpendicular-bisector-locus", "apollonius-circle", "bisector-closer-region"],
      body: String.raw`A locus is the set of points satisfying a condition, and recognizing the shape of a locus often solves the problem outright. Points equidistant from two points lie on a line; points with a fixed ratio of distances to two points lie on a circle; points closer to one side of an angle than the other fill a region bounded by the bisector. Problems about where a point can be, which region it lies in, or how large a triangle with a moving vertex can be all reduce to these.

The [[perpendicular-bisector-locus|perpendicular bisector]] of $AB$ is the locus of points equidistant from $A$ and $B$, and the points closer to $A$ form the half-plane on $A$'s side. It is how the center of a circle through given points is found (on the perpendicular bisectors of its chords), how a fold that sends one point to another is described (the crease is the perpendicular bisector), and how "closer to $B$ than to $A$" regions are drawn.

The [[apollonius-circle|Apollonius circle]] is the locus of points $P$ with $\tfrac{PA}{PB} = k$ for a fixed $k \ne 1$, a circle whose center lies on line $AB$. With $A = (0, 0)$, $B = (3, 0)$ and $PA = 2PB$, squaring gives $x^2 + y^2 = 4\left((x - 3)^2 + y^2\right)$, which simplifies to $(x - 4)^2 + y^2 = 4$, a circle of radius $2$ through $(2, 0)$ and $(6, 0)$, the points dividing $AB$ internally and externally in the ratio $2 : 1$. The largest area of a triangle $ABC$ with $AB$ fixed and $\tfrac{CA}{CB}$ fixed is reached when $C$ is at the top of this circle.

[[bisector-closer-region|The angle bisector]] separates the points closer to one side of an angle from those closer to the other, so a region defined by "closer to side $AB$ than to side $BC$" is cut off by the bisector of angle $B$. In a triangle, the points closer to one side than to the other two form a region bounded by two angle bisectors, which meet at the incenter.

When a point is constrained by distances, identify its locus first, then answer the question about the locus. The Summary (G4.7) collects the chapter's strategies, and the problems after it mix coordinate techniques.`,
      related: [
        { card: "folded-paper", note: String.raw`a fold is the perpendicular bisector of a point and its image (G6.5).` },
        { card: "ellipse-properties", note: String.raw`the locus of a fixed sum of distances (G4.5).` },
        { card: "angle-bisector-theorem", note: String.raw`the Apollonius circle passes through the feet of the internal and external bisectors (G1.4).` }
      ],
      exercises: [
        { q: String.raw`Points $A = (0, 0)$ and $B = (3, 0)$ are given. The points $P$ with $PA = 2PB$ form a circle. Find its radius.`, answer: "2",
          solution: String.raw`Squaring, $x^2 + y^2 = 4(x - 3)^2 + 4y^2$, so $3x^2 - 24x + 36 + 3y^2 = 0$, that is $x^2 - 8x + 12 + y^2 = 0$ and $(x - 4)^2 + y^2 = 4$. The radius is $2$.` }
      ],
      problems: [
        "2002 AMC 12B, Problem 18",
        "2015 AMC 12B, Problem 19",
        "2011 AMC 12B, Problem 16",
        "2006 AMC 12A, Problem 22",
        "2021 Fall AMC 12B, Problem 22",
        "1992 AIME, Problem 13",
        "2003 AIME II, Problem 11",
        "2025 AIME I, Problem 8"
      ]
    },
    "G4.7": {
      prereq: ["coordinate-bash", "point-line-distance", "tangency-equation", "section-formula", "shoelace-formula", "parabola-focus-directrix", "ellipse-properties", "perpendicular-bisector-locus", "apollonius-circle"],
      cards: [],
      body: String.raw`[[coordinate-bash|Coordinates]] work best with the axes along right angles or symmetry lines and a key point at the origin. [[point-line-distance|The distance from a point to a line]] is $\tfrac{|ax_0 + by_0 - c|}{\sqrt{a^2 + b^2}}$, [[tangency-equation|a line is tangent to a circle]] when that distance from the center equals the radius, and [[section-formula|the point dividing a segment]] in a given ratio is a weighted average of its ends.

[[shoelace-formula|The shoelace formula]] gives the area of a polygon from its vertices in order.

[[parabola-focus-directrix|A parabola]] is the set of points equally far from its focus and directrix, and [[ellipse-properties|an ellipse]] the set whose distances to the two foci add to the major axis.

[[perpendicular-bisector-locus|The points equally far from two points]] form the perpendicular bisector, and [[apollonius-circle|the points whose distances to two points have a fixed ratio]] other than $1$ form a circle.`,
      strategies: [
        String.raw`Put the origin at a vertex or center and an axis along a side or a line of symmetry, so that many coordinates are $0$.`,
        String.raw`Find a circle's center and radius by completing the square.`,
        String.raw`For tangency, compare the distance from the center to the line with the radius.`,
        String.raw`For the area of a polygon with known vertices, use the shoelace formula.`,
        String.raw`For a parabola, use the focus and directrix: a distance to the focus equals a distance to a line.`,
        String.raw`When a point is constrained by distances, identify its locus first.`,
        String.raw`If coordinates make the algebra long, step back and look for similar triangles or trigonometry.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the distance between $(1, 2)$ and $(7, 10)$.`, answer: "10",
        solution: String.raw`The differences are $6$ and $8$, so the distance is $\sqrt{36 + 64} = 10$.` },
      { q: String.raw`The point $P$ divides the segment from $(0, 0)$ to $(10, 5)$ in the ratio $2 : 3$. Find the sum of the coordinates of $P$.`, answer: "6",
        solution: String.raw`$P$ is $\tfrac25$ of the way from $(0, 0)$ to $(10, 5)$: $P = (4, 2)$, with coordinate sum $6$.` },
      { q: String.raw`Find the area of the quadrilateral with vertices $(0, 0)$, $(5, 0)$, $(6, 4)$ and $(1, 3)$, in that order.`, answer: "17",
        solution: String.raw`By the shoelace formula, the sum $x_iy_{i+1} - x_{i+1}y_i$ over the edges is $0 + 20 + (18 - 4) + 0 = 34$, so the area is $\tfrac{34}{2} = 17$.` },
      { q: String.raw`Find the length of a tangent from $(5, 0)$ to the circle $x^2 + y^2 = 9$.`, answer: "4",
        solution: String.raw`The point is $5$ from the center and the radius is $3$, and the radius to the point of tangency is perpendicular to the tangent, so the tangent length is $\sqrt{25 - 9} = 4$.` },
      { q: String.raw`The parabola $y = \tfrac{x^2}{4}$ has focus $(0, 1)$. Find the distance from the point $(4, 4)$ of the parabola to the focus.`, answer: "5",
        solution: String.raw`The directrix is $y = -1$, and a point of a parabola is as far from the focus as from the directrix: $4 - (-1) = 5$. Directly, $\sqrt{16 + 9} = 5$.` },
      { q: String.raw`For the ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{9} = 1$, find the sum of the distances from any of its points to the two foci.`, answer: "10",
        solution: String.raw`The sum of the distances to the foci is the major axis, $2a = 2 \cdot 5 = 10$. (The foci are at $(\pm 4, 0)$, since $c^2 = 25 - 9$.)` },
      { q: String.raw`Find the radius of the set of points $P$ with $PA = 2PB$, where $A = (0, 0)$ and $B = (3, 0)$.`, answer: "2",
        solution: String.raw`Squaring, $x^2 + y^2 = 4\left((x - 3)^2 + y^2\right)$, so $3x^2 - 24x + 36 + 3y^2 = 0$, that is, $(x - 4)^2 + y^2 = 4$. The locus is a circle of radius $2$ centered at $(4, 0)$.` }
    ],
    problems: [
      "2010 AIME I, Problem 11",
      "2006 AIME I, Problem 10",
      "2009 AIME II, Problem 10"
    ]
  },
  challenge: {
    problems: [
      "2015 AIME II, Problem 15",
      "2017 AIME I, Problem 15",
      "2026 AIME I, Problem 10",
      "2013 AIME II, Problem 13"
    ]
  }
};
