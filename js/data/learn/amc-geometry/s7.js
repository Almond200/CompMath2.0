// Learn, AMC Geometry, chapter S7: coordinates and transformations (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S7"] = {
  lessons: {
    "S7.1": {
      prereq: ["distance-midpoint", "line-forms", "circle-basics"],
      cards: [],
      body: String.raw`Coordinates turn a figure into numbers, and any geometry problem can be attacked this way if the figure is placed well. This chapter adds the measurements that coordinates make easy, distances from points to lines, circles and other loci as equations, areas from corners, and the moves of a figure, reflections and rotations, which keep its shape and carry the problem to an easier position.

The triangle with corners $(0, 0)$, $(4, 0)$ and $(1, 3)$ has base $4$ on the $x$-axis and height $3$, so its area is $6$; the shoelace formula gives the same from the corners alone, for any polygon. The point $(1, 2)$ is $\tfrac{|3 + 8 - 1|}{5} = 2$ from the line $3x + 4y = 1$. And the equation $x^2 + y^2 - 6x + 8y = 0$ becomes $(x - 3)^2 + (y + 4)^2 = 25$ when the squares are completed, a circle with center $(3, -4)$ and radius $5$.

The lessons take these ideas in turn: lines and distances (S7.2), circles and loci (S7.3), areas and lattice points (S7.4), reflections and rotations (S7.5), and symmetry and fitting copies (S7.6). The Summary (S7.7) collects the strategies.`,
      exercises: [
        { q: String.raw`What is the area of the triangle with corners $(0, 0)$, $(4, 0)$ and $(1, 3)$?`, answer: "6",
          solution: String.raw`The base from $(0, 0)$ to $(4, 0)$ has length $4$, and the third corner is $3$ above it: $\tfrac12 \cdot 4 \cdot 3 = 6$.` },
        { q: String.raw`How far is the point $(1, 2)$ from the line $3x + 4y = 1$?`, answer: "2",
          solution: String.raw`Write the line as $3x + 4y - 1 = 0$. The distance is $\tfrac{|3 \cdot 1 + 4 \cdot 2 - 1|}{\sqrt{9 + 16}} = \tfrac{10}{5} = 2$.` },
        { q: String.raw`What is the radius of the circle $x^2 + y^2 - 6x + 8y = 0$?`, answer: "5",
          solution: String.raw`Complete the squares: $(x - 3)^2 - 9 + (y + 4)^2 - 16 = 0$, so $(x - 3)^2 + (y + 4)^2 = 25$, with radius $5$.` }
      ],
      problems: [
        "2005 AMC 8, Problem 3",
        "2019 AMC 8, Problem 6",
        "2000 AMC 8, Problem 18"
      ]
    },
    "S7.2": {
      prereq: ["distance-midpoint", "line-forms", "similar-figures-ratios"],
      cards: ["section-formula", "angle-between-lines", "parallel-lines-distance", "point-line-distance"],
      body: String.raw`Which point divides the segment from $(1, 2)$ to $(7, 11)$ in the ratio $1 : 2$? What angle do two lines with slopes $\tfrac12$ and $3$ make? How far apart are the parallel lines $3x + 4y = 5$ and $3x + 4y = 20$? How far is $(2, 3)$ from $5x - 12y + 13 = 0$? Each has a formula that saves drawing.

[[section-formula|The section formula]] gives the point $P$ on segment $AB$ with $AP : PB = m : n$: $P = \tfrac{nA + mB}{m + n}$, a weighted average of the ends, with the larger weight on the nearer end. For $1 : 2$ from $(1, 2)$ to $(7, 11)$, $P = \tfrac{2(1, 2) + (7, 11)}{3} = (3, 5)$. The midpoint is the case $1 : 1$, and the centroid of a triangle is the average of its three corners.

[[angle-between-lines|The angle between two lines]] with slopes $m_1$ and $m_2$ satisfies $\tan\theta = \left|\tfrac{m_1 - m_2}{1 + m_1 m_2}\right|$, the tangent of the difference of their angles with the $x$-axis. Slopes $\tfrac12$ and $3$ give $\tan\theta = \tfrac{5/2}{5/2} = 1$, so $45^\circ$. When $1 + m_1m_2 = 0$ the lines are perpendicular.

[[point-line-distance|The distance from a point to a line]] $Ax + By + C = 0$ is $\tfrac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$: from $(2, 3)$ to $5x - 12y + 13 = 0$ it is $\tfrac{|10 - 36 + 13|}{13} = 1$. The numerator is the value of the line's expression at the point, which is zero on the line and grows steadily away from it, and the denominator rescales it to a length. It gives the height of a triangle in coordinates, and the radius of a circle tangent to a line. [[parallel-lines-distance|Two parallel lines]] $ax + by = c_1$ and $ax + by = c_2$ are $\tfrac{|c_1 - c_2|}{\sqrt{a^2 + b^2}}$ apart, so $\tfrac{15}{5} = 3$ for the example; the coefficients must first be made the same.

Weight the ends for a dividing point, use the tangent formula for the angle between lines, and divide by $\sqrt{A^2 + B^2}$ for every distance to a line. The next lesson writes circles and other loci as equations.`,
      related: [
        { card: "mass-points", note: String.raw`the same weighted average of the ends, as masses (S3.5).` },
        { card: "angle-addition", note: String.raw`the formula for $\tan(\alpha - \beta)$ behind the angle between lines (L12.2).` },
        { card: "tangent-lines-from-point", note: String.raw`tangent lines found by setting the distance to the center equal to the radius (S7.3).` }
      ],
      exercises: [
        { q: String.raw`Point $P$ lies on the segment from $A = (1, 2)$ to $B = (7, 11)$ with $AP : PB = 1 : 2$. What is the sum of the coordinates of $P$?`, answer: "8",
          solution: String.raw`$P = \tfrac{2A + B}{3} = \left(\tfrac{2 + 7}{3}, \tfrac{4 + 11}{3}\right) = (3, 5)$, one third of the way from $A$. The sum is $8$.` },
        { q: String.raw`What is the acute angle between lines of slopes $\tfrac12$ and $3$, in degrees?`, answer: "45",
          solution: String.raw`$\tan\theta = \left|\tfrac{3 - \tfrac12}{1 + 3 \cdot \tfrac12}\right| = \tfrac{5/2}{5/2} = 1$, so $\theta = 45^\circ$.` },
        { q: String.raw`How far apart are the lines $3x + 4y = 5$ and $3x + 4y = 20$?`, answer: "3",
          solution: String.raw`They are parallel, with the same coefficients, so the distance is $\tfrac{|20 - 5|}{\sqrt{9 + 16}} = \tfrac{15}{5} = 3$.` },
        { q: String.raw`How far is the point $(2, 3)$ from the line $5x - 12y + 13 = 0$?`, answer: "1",
          solution: String.raw`$\tfrac{|5 \cdot 2 - 12 \cdot 3 + 13|}{\sqrt{25 + 144}} = \tfrac{|-13|}{13} = 1$.` }
      ],
      problems: [
        "2007 AMC 10B, Problem 10",
        "2009 AMC 10B, Problem 12",
        "2020 AMC 12B, Problem 7",
        "2005 AMC 12B, Problem 14",
        "2009 AMC 12B, Problem 9",
        "2007 AMC 12A, Problem 19",
        "2006 AMC 12A, Problem 22",
        "2018 AMC 12A, Problem 17"
      ]
    },
    "S7.3": {
      prereq: ["distance-midpoint", "point-line-distance", "tangent-facts"],
      cards: ["circle-equation", "tangent-lines-from-point", "angle-bisectors-of-lines", "perpendicular-bisector-locus", "bisector-closer-region"],
      body: String.raw`What are the center and radius of $x^2 + y^2 - 4x + 6y - 12 = 0$? What are the tangent lines from the origin to a circle? Which points are equally far from $(0, 0)$ and $(4, 2)$? A locus, the set of points with some property, is often a line or a circle, and coordinates write it as an equation.

[[circle-equation|A circle]] with center $(h, k)$ and radius $r$ is $(x - h)^2 + (y - k)^2 = r^2$, the distance formula squared. An equation $x^2 + y^2 + Dx + Ey + F = 0$ is a circle whose center and radius appear when the squares are completed: $x^2 - 4x + y^2 + 6y = 12$ becomes $(x - 2)^2 + (y + 3)^2 = 25$, center $(2, -3)$ and radius $5$. Where two curves meet, both equations hold, so subtracting two circles' equations removes the squares and leaves the line through their common points (S5.5).

[[tangent-lines-from-point|Tangent lines from a point]] are found by asking which lines through it are at distance $r$ from the center. Through the origin, $y = mx$, and for the circle $(x - 5)^2 + y^2 = 9$ the condition is $\tfrac{|5m|}{\sqrt{m^2 + 1}} = 3$, so $16m^2 = 9$ and $m = \pm\tfrac34$. The tangent length is $\sqrt{25 - 9} = 4$, as the right triangle with the radius says (S5.4).

[[perpendicular-bisector-locus|The points equally far from two points]] form the perpendicular bisector of the segment between them: for $(0, 0)$ and $(4, 2)$, the line through the midpoint $(2, 1)$ with slope $-2$, that is, $y = -2x + 5$. [[angle-bisectors-of-lines|The points equally far from two lines]] form the two bisectors of their angles, found by setting the two distance formulas equal; for the $x$-axis and $y = mx$ the bisector of the acute angle has slope $\tfrac{\sqrt{1 + m^2} - 1}{m}$, which is $\tfrac12$ for $m = \tfrac43$. [[bisector-closer-region|The points closer to one side of an angle]] than to the other lie on one side of the bisector, which splits a region by area in the ratio of the sides beside the angle; and the points closer to one point than another lie on one side of the perpendicular bisector.

Complete the squares to read a circle, set a distance equal to the radius for a tangent, and turn "equally far" into a bisector. The next lesson finds areas from coordinates.`,
      related: [
        { card: "radical-axis", note: String.raw`the line from subtracting two circles' equations (S5.5).` },
        { card: "angle-bisector-theorem", note: String.raw`the bisector dividing the opposite side in the ratio of the sides (S3.5).` },
        { card: "conic-sections", note: String.raw`loci defined by distances that are not equal: ellipses, parabolas, hyperbolas (S10.2).` }
      ],
      exercises: [
        { q: String.raw`What is the radius of the circle $x^2 + y^2 - 4x + 6y - 12 = 0$?`, answer: "5",
          solution: String.raw`Complete the squares: $(x - 2)^2 - 4 + (y + 3)^2 - 9 = 12$, so $(x - 2)^2 + (y + 3)^2 = 25$. The center is $(2, -3)$ and the radius $5$.` },
        { q: String.raw`Two lines through the origin are tangent to the circle $(x - 5)^2 + y^2 = 9$. What is the positive slope?`, answer: "3/4",
          solution: String.raw`The line $mx - y = 0$ is tangent when its distance from $(5, 0)$ equals $3$: $\tfrac{|5m|}{\sqrt{m^2 + 1}} = 3$. Squaring, $25m^2 = 9m^2 + 9$, so $m^2 = \tfrac{9}{16}$ and $m = \tfrac34$.` },
        { q: String.raw`The points equally far from $(0, 0)$ and $(4, 2)$ form a line. What is its $y$-intercept?`, answer: "5",
          solution: String.raw`It is the perpendicular bisector: through the midpoint $(2, 1)$, perpendicular to the slope $\tfrac24 = \tfrac12$, so with slope $-2$. The line is $y - 1 = -2(x - 2)$, that is, $y = -2x + 5$.` },
        { q: String.raw`What is the slope of the line through the origin that bisects the acute angle between the $x$-axis and the line $y = \tfrac43 x$?`, answer: "1/2",
          solution: String.raw`A point $(x, y)$ on the bisector is equally far from $y = 0$ and from $4x - 3y = 0$: $|y| = \tfrac{|4x - 3y|}{5}$. In the first quadrant between the lines, $5y = 4x - 3y$, so $y = \tfrac12 x$.` }
      ],
      problems: [
        "2018 AMC 10A, Problem 21",
        "2003 AMC 12A, Problem 17",
        "2012 AMC 12B, Problem 10",
        "2012 AMC 12A, Problem 12",
        "2011 AMC 10B, Problem 20",
        "2015 AMC 10B, Problem 19",
        "2021 Spring AMC 10A, Problem 19",
        "2025 AMC 10A, Problem 20",
        "2021 Fall AMC 12A, Problem 13"
      ]
    },
    "S7.4": {
      prereq: ["triangle-area-standard", "area-by-pieces", "distance-midpoint"],
      cards: ["shoelace-formula", "picks-theorem", "coordinate-bash"],
      body: String.raw`What is the area of the quadrilateral with corners $(1, 1)$, $(5, 2)$, $(4, 6)$ and $(0, 4)$? A polygon drawn on dot paper has $10$ dots inside and $8$ on its boundary: what is its area? When does it pay to put a whole problem in coordinates? Areas and many lengths come straight from coordinates.

[[shoelace-formula|The shoelace formula]] gives the area of a polygon from its corners listed in order around it: $A = \tfrac12\left|\sum (x_iy_{i+1} - x_{i+1}y_i)\right|$, the products running across like laces. For the quadrilateral above, the sum is $(2 - 5) + (30 - 8) + (16 - 0) + (0 - 4) = 31$, so the area is $\tfrac{31}{2}$. The corners must be in order; a crossing list gives a wrong answer. When the polygon sits awkwardly, drawing the rectangle around it and subtracting the corner triangles (S1.4) is the same computation in pictures.

[[picks-theorem|Pick's theorem]] gives the area of a polygon whose corners are lattice points, points with whole-number coordinates: $A = I + \tfrac B2 - 1$, with $I$ the lattice points inside and $B$ those on the boundary. With $I = 10$ and $B = 8$, $A = 13$. Read backward it counts lattice points from an area, and the lattice points on a segment from $(0, 0)$ to $(a, b)$ number $\gcd(a, b) + 1$.

[[coordinate-bash|Coordinate bashing]] places the whole figure on axes and computes. It pays when the figure has right angles, a square or a rectangle, or points defined by ratios along sides, and when a synthetic idea is not in sight. Put a corner at the origin and sides along the axes. In a square $ABCD$ of side $2$ with $A = (0, 0)$, $B = (2, 0)$, $C = (2, 2)$, $D = (0, 2)$, the line from $A$ to the midpoint $(1, 2)$ of $CD$ is $y = 2x$, the diagonal $BD$ is $x + y = 2$, and they meet at $\left(\tfrac23, \tfrac43\right)$, so triangle $ABP$ has area $\tfrac12 \cdot 2 \cdot \tfrac43 = \tfrac43$. The cost is algebra, and it grows with every circle and every angle condition.

List the corners in order for the shoelace formula, count lattice points for Pick's theorem, and place a figure with right angles on axes. The next lesson moves figures.`,
      related: [
        { card: "lattice-points-gcd", note: String.raw`the lattice points on a segment, $\gcd + 1$ (S10.3).` },
        { card: "determinant-geometric", note: String.raw`the shoelace sum as a determinant (S10.3).` },
        { card: "point-line-distance", note: String.raw`heights in coordinates (S7.2).` }
      ],
      exercises: [
        { q: String.raw`What is the area of the quadrilateral with corners $(1, 1)$, $(5, 2)$, $(4, 6)$ and $(0, 4)$, in that order?`, answer: "31/2",
          solution: String.raw`The shoelace terms $x_iy_{i+1} - x_{i+1}y_i$ are $1 \cdot 2 - 5 \cdot 1 = -3$, $5 \cdot 6 - 4 \cdot 2 = 22$, $4 \cdot 4 - 0 \cdot 6 = 16$, $0 \cdot 1 - 1 \cdot 4 = -4$, adding to $31$. The area is $\tfrac{31}{2}$.` },
        { q: String.raw`A polygon with lattice-point corners has $10$ lattice points inside it and $8$ on its boundary. What is its area?`, answer: "13",
          solution: String.raw`By Pick's theorem, $A = I + \tfrac B2 - 1 = 10 + 4 - 1 = 13$.` },
        { q: String.raw`Square $ABCD$ has side $2$, and $M$ is the midpoint of $CD$. Segments $AM$ and $BD$ meet at $P$. What is the area of triangle $ABP$?`, answer: "4/3",
          solution: String.raw`Place $A = (0, 0)$, $B = (2, 0)$, $C = (2, 2)$, $D = (0, 2)$, so $M = (1, 2)$. Line $AM$ is $y = 2x$ and line $BD$ is $x + y = 2$; they meet at $x = \tfrac23$, $y = \tfrac43$. Triangle $ABP$ has base $2$ and height $\tfrac43$: area $\tfrac43$.` }
      ],
      problems: [
        "1996 AJHSME, Problem 22",
        "2002 AMC 8, Problem 15",
        "2004 AMC 8, Problem 14",
        "2007 AMC 8, Problem 23",
        "2015 AMC 8, Problem 19",
        "2019 AMC 10A, Problem 7",
        "2006 AMC 10A, Problem 17",
        "2007 AMC 10A, Problem 18",
        "2013 AMC 10A, Problem 16",
        "2012 AMC 10A, Problem 15",
        "2003 AMC 10A, Problem 22"
      ]
    },
    "S7.5": {
      prereq: ["distance-midpoint", "point-line-distance", "pythagorean-theorem"],
      cards: ["reflection-coordinates", "rotation-90", "composing-transformations", "reflect-across-the-line", "folded-paper"],
      body: String.raw`Where does $(3, 1)$ go under a quarter turn about the origin? Where does $(4, 1)$ go when reflected over the line $y = x + 1$? What is the shortest path from $(0, 1)$ to the $x$-axis and then to $(4, 2)$? A corner of a square sheet is folded onto the middle of a side: where is the crease? A reflection or a rotation keeps every length and angle, so it can move a problem into a better position.

[[rotation-90|A quarter turn]] counterclockwise about the origin sends $(x, y)$ to $(-y, x)$: $(3, 1)$ goes to $(-1, 3)$. A half turn sends $(x, y)$ to $(-x, -y)$, and a turn by $\theta$ to $(x\cos\theta - y\sin\theta, x\sin\theta + y\cos\theta)$. About another center, move the center to the origin, turn, and move back. [[reflection-coordinates|A reflection]] over the axes negates a coordinate, over $y = x$ swaps them, and over a general line $ax + by + c = 0$ moves the point along the normal $(a, b)$ by twice its signed distance: for $(4, 1)$ and $x - y + 1 = 0$, the expression is $4$, and the image is $(4, 1) - \tfrac{2 \cdot 4}{2}(1, -1) = (0, 5)$; the midpoint $(2, 3)$ is on the line, as it should be.

[[composing-transformations|Transformations compose]]: reflecting over the $x$-axis and then over the $y$-axis is the half turn, sending $(2, 5)$ to $(-2, -5)$; two reflections over lines meeting at an angle make a rotation by twice the angle, and over parallel lines a translation. Following a point through a list of moves, and noticing when the list repeats, answers questions about many moves at once.

[[reflect-across-the-line|Reflecting across a line]] finds shortest paths that touch the line. A path from $A$ to the line and then to $B$ has the same length as the path from $A'$, the reflection of $A$, to the same point and on to $B$, and that is shortest when it is straight. From $(0, 1)$ to the $x$-axis to $(4, 2)$, reflect to $(0, -1)$: the shortest path is $\sqrt{16 + 9} = 5$. [[folded-paper|A fold]] is a reflection: the crease is the perpendicular bisector of the segment from a point to where it lands. Folding corner $A$ of a square of side $8$ onto the midpoint $M$ of side $BC$, the crease meets $AB$ at a point $x$ from $B$ with $x^2 + 4^2 = (8 - x)^2$, since that point is equally far from $A$ and $M$: $x = 3$.

Rotate or reflect by coordinates, compose moves into simpler ones, reflect one end of a path to straighten it, and treat a fold as a perpendicular bisector. The next lesson uses symmetry to count and to fit pieces together.`,
      related: [
        { card: "rotation-reflection-matrices", note: String.raw`the same moves as matrices (S10.4).` },
        { card: "perpendicular-bisector-locus", note: String.raw`the crease as the points equally far from a point and its image (S7.3).` },
        { card: "rotation-trick", note: String.raw`a rotation that brings three given distances together (S10.4).` }
      ],
      exercises: [
        { q: String.raw`The point $(3, 1)$ is rotated $90^\circ$ counterclockwise about the origin. What is the sum of the coordinates of its image?`, answer: "2",
          solution: String.raw`A quarter turn counterclockwise sends $(x, y)$ to $(-y, x)$, so the image is $(-1, 3)$, with sum $2$.` },
        { q: String.raw`The point $(4, 1)$ is reflected over the line $y = x + 1$. What is the sum of the coordinates of its image?`, answer: "5",
          solution: String.raw`Write the line as $x - y + 1 = 0$, with normal $(1, -1)$. At $(4, 1)$ the expression is $4$, so the image is $(4, 1) - \tfrac{2 \cdot 4}{1 + 1}(1, -1) = (0, 5)$. Check: the midpoint $(2, 3)$ is on the line and the segment has slope $-1$. The sum is $5$.` },
        { q: String.raw`What is the length of the shortest path from $(0, 1)$ to a point on the $x$-axis and then to $(4, 2)$?`, answer: "5",
          solution: String.raw`Reflect $(0, 1)$ over the $x$-axis to $(0, -1)$. Any such path has the same length as the path from $(0, -1)$ through the same point to $(4, 2)$, which is at least the straight distance $\sqrt{4^2 + 3^2} = 5$, reached when the path is straight.` },
        { q: String.raw`Square $ABCD$ has side $8$, and $M$ is the midpoint of $BC$. The square is folded so that $A$ lands on $M$. The crease meets $AB$ at $P$. How long is $PB$?`, answer: "3",
          solution: String.raw`$P$ is on the crease, so $PA = PM$. With $PB = x$, $PA = 8 - x$ and $PM^2 = x^2 + 4^2$. So $(8 - x)^2 = x^2 + 16$, $64 - 16x = 16$, and $x = 3$.` }
      ],
      problems: [
        "1991 AJHSME, Problem 16",
        "2001 AMC 8, Problem 16",
        "2025 AMC 8, Problem 10",
        "2019 AMC 10B, Problem 5",
        "2015 AMC 10B, Problem 8",
        "2003 AMC 12A, Problem 9",
        "2004 AMC 12B, Problem 9",
        "2014 AMC 10A, Problem 18",
        "2016 AMC 10A, Problem 16",
        "2018 AMC 10A, Problem 13",
        "2018 AMC 10B, Problem 15",
        "2021 Spring AMC 12A, Problem 11",
        "2014 AMC 12A, Problem 20",
        "2020 AMC 12A, Problem 20"
      ]
    },
    "S7.6": {
      prereq: ["polygon-angle-sums", "prism-pyramid-volumes"],
      cards: ["figure-symmetries", "fit-copies"],
      body: String.raw`How many lines of symmetry does a regular hexagon have? How many rotations take a square onto itself? A cube is cut into three congruent pyramids: what is each one's volume? Symmetry counts the ways a figure matches itself, and it finds a piece's size from the whole.

[[figure-symmetries|The symmetries of a figure]] are the reflections and rotations that carry it onto itself. A regular $n$-gon has $n$ lines of symmetry, through its corners and the midpoints of its sides, and $n$ rotations, by multiples of $\tfrac{360^\circ}{n}$, counting the identity: a regular hexagon has $6$ lines, and a square $4$ rotations. A letter or a design has only some of these, and a question about which figures have a line of symmetry or a rotation is settled by testing each candidate line and angle. Symmetry also cuts work: points that a symmetry exchanges have equal distances, equal angles and equal areas, so only one of them needs computing.

[[fit-copies|Fitting copies together]] finds a piece's size from the whole: if $n$ congruent pieces fill a figure, each is $\tfrac1n$ of it. A cube of side $3$, volume $27$, is cut by planes through one corner into three congruent square pyramids, one on each of the three faces away from that corner, so each has volume $9$, which checks the pyramid formula $\tfrac13 \cdot 9 \cdot 3$. Recognizing that a strange piece is one of several congruent copies is often the whole problem.

Count a figure's symmetries by lines and turns, let symmetry make equal parts equal, and divide the whole among congruent copies. The Summary follows.`,
      related: [
        { card: "burnsides-lemma", note: String.raw`counting colorings up to the symmetries of a figure (R8.2).` },
        { card: "wlog-symmetry", note: String.raw`letting a symmetry choose one case (R7.6).` },
        { card: "prism-pyramid-volumes", note: String.raw`the pyramid's volume, which the three copies confirm (S8.2).` }
      ],
      exercises: [
        { q: String.raw`How many lines of symmetry does a regular hexagon have?`, answer: "6",
          solution: String.raw`There are $3$ lines through opposite corners and $3$ through the midpoints of opposite sides: $6$.` },
        { q: String.raw`How many rotations, including the rotation by $0^\circ$, carry a square onto itself?`, answer: "4",
          solution: String.raw`The rotations by $0^\circ$, $90^\circ$, $180^\circ$ and $270^\circ$ about the center: $4$.` },
        { q: String.raw`A cube of side $3$ is cut into three congruent pyramids that share a corner of the cube. What is the volume of each?`, answer: "9",
          solution: String.raw`The three pieces are congruent and fill the cube of volume $27$, so each has volume $9$. (Each is a pyramid on a $3 \times 3$ face with height $3$: $\tfrac13 \cdot 9 \cdot 3 = 9$.)` }
      ],
      problems: [
        "1989 AJHSME, Problem 11",
        "2010 AMC 8, Problem 6",
        "2017 AMC 10B, Problem 6",
        "2003 AMC 12B, Problem 10"
      ]
    },
    "S7.7": {
      prereq: ["section-formula", "angle-between-lines", "parallel-lines-distance", "point-line-distance", "circle-equation", "tangent-lines-from-point", "angle-bisectors-of-lines", "perpendicular-bisector-locus", "bisector-closer-region", "shoelace-formula", "picks-theorem", "coordinate-bash", "reflection-coordinates", "rotation-90", "composing-transformations", "reflect-across-the-line", "folded-paper", "figure-symmetries", "fit-copies"],
      cards: [],
      body: String.raw`[[section-formula|A dividing point]] is a weighted average of the ends; [[angle-between-lines|the angle between lines]] has $\tan\theta = \left|\tfrac{m_1 - m_2}{1 + m_1m_2}\right|$; [[point-line-distance|distances to a line]] and [[parallel-lines-distance|between parallel lines]] divide by $\sqrt{A^2 + B^2}$.

[[circle-equation|A circle]] is read by completing squares; [[tangent-lines-from-point|tangents from a point]] are at distance $r$ from the center; [[perpendicular-bisector-locus|equal distances to two points]] and [[angle-bisectors-of-lines|to two lines]] give bisectors, which [[bisector-closer-region|split regions]] by closeness.

[[shoelace-formula|The shoelace formula]] and [[picks-theorem|Pick's theorem]] give areas, and [[coordinate-bash|coordinates]] solve figures with right angles.

[[rotation-90|Rotations]] and [[reflection-coordinates|reflections]] move points, [[composing-transformations|compose]] into simpler moves, [[reflect-across-the-line|straighten shortest paths]] and [[folded-paper|describe folds]]; [[figure-symmetries|symmetries]] count a figure's matches and [[fit-copies|congruent copies]] divide a whole.`,
      strategies: [
        String.raw`Place a figure with a corner at the origin and its sides along the axes.`,
        String.raw`Make the coefficients match before measuring between parallel lines.`,
        String.raw`Complete the squares to find a circle's center and radius.`,
        String.raw`For a tangent from a point, set the distance from the center to the line equal to the radius.`,
        String.raw`List the corners in order around the polygon before using the shoelace formula.`,
        String.raw`For a shortest path touching a line, reflect one end across the line.`,
        String.raw`Treat a fold as a reflection: the crease is a perpendicular bisector.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How far is the origin from the line $3x + 4y = 10$?`, answer: "2",
        solution: String.raw`$\tfrac{|0 + 0 - 10|}{\sqrt{9 + 16}} = \tfrac{10}{5} = 2$.` },
      { q: String.raw`What is the area of the quadrilateral with corners $(0, 0)$, $(6, 0)$, $(6, 4)$ and $(2, 4)$?`, answer: "20",
        solution: String.raw`It is a trapezoid with parallel sides $6$ and $4$, height $4$: $\tfrac{6 + 4}{2} \cdot 4 = 20$. The shoelace formula gives $\tfrac12|0 + 24 + 24 - 8| = 20$ as well.` },
      { q: String.raw`The point $(2, 0)$ is rotated $90^\circ$ counterclockwise about the origin twice. What is the $x$-coordinate of its image?`, answer: "-2",
        solution: String.raw`Two quarter turns make a half turn, which sends $(x, y)$ to $(-x, -y)$: $(-2, 0)$.` }
    ],
    problems: [
      "2008 AMC 8, Problem 23",
      "2013 AMC 10A, Problem 18",
      "2000 AMC 10, Problem 16",
      "2014 AMC 10A, Problem 16",
      "2016 AMC 10B, Problem 19",
      "2022 AMC 10B, Problem 16",
      "2024 AMC 10A, Problem 13"
    ]
  },
  challenge: {
    problems: [
      "2020 AMC 10B, Problem 21",
      "2017 AMC 12A, Problem 16",
      "2019 AMC 12A, Problem 22",
      "2015 AIME I, Problem 4",
      "2011 AIME I, Problem 3"
    ]
  }
};
