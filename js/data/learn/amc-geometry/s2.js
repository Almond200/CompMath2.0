// Learn, AMC Geometry, chapter S2: quadrilaterals, circles and coordinates, the basics (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S2"] = {
  lessons: {
    "S2.1": {
      prereq: ["parallel-exterior-angles", "triangle-area-standard", "pythagorean-theorem"],
      cards: [],
      body: String.raw`The last chapter measured triangles. This one measures the next shapes: polygons with more sides, the quadrilaterals among them, circles, and figures drawn on a coordinate grid. Most of its facts come from cutting a figure into triangles or from the Pythagorean theorem.

A hexagon cut by diagonals from one corner splits into $4$ triangles, so its angles add to $4 \cdot 180^\circ = 720^\circ$. A circle of radius $3$ has area $\pi \cdot 3^2 = 9\pi$, and its circumference is $2\pi \cdot 3 = 6\pi$. And on a grid, the points $(1, 2)$ and $(4, 6)$ are $3$ apart across and $4$ apart up, so they are $\sqrt{9 + 16} = 5$ apart, by the Pythagorean theorem on those two gaps.

The lessons take these ideas in turn: angles in polygons (S2.2), quadrilateral areas (S2.3), circles (S2.4), and points, distances and lines (S2.5). The Summary (S2.6) collects the strategies.`,
      exercises: [
        { q: String.raw`What is the sum of the interior angles of a hexagon, in degrees?`, answer: "720",
          solution: String.raw`The diagonals from one corner cut the hexagon into $4$ triangles whose angles together make up the hexagon's angles. So the sum is $4 \cdot 180^\circ = 720^\circ$.` },
        { q: String.raw`What is the area of a circle of radius $3$?`, answer: "9pi",
          solution: String.raw`The area is $\pi r^2 = \pi \cdot 9 = 9\pi$.` },
        { q: String.raw`How far apart are the points $(1, 2)$ and $(4, 6)$?`, answer: "5",
          solution: String.raw`The horizontal gap is $3$ and the vertical gap is $4$, so the distance is $\sqrt{3^2 + 4^2} = 5$.` }
      ],
      problems: [
        "1988 AJHSME, Problem 9",
        "2006 AMC 8, Problem 7",
        "1989 AJHSME, Problem 15"
      ]
    },
    "S2.2": {
      prereq: ["parallel-exterior-angles", "angle-chasing"],
      cards: ["polygon-angle-sums", "equiangular-polygon"],
      body: String.raw`What is each angle of a regular octagon? A regular polygon has angles of $156^\circ$: how many sides does it have? A hexagon has all its angles equal but its sides are $3, 1, 4, 2$ and two unknowns: what are they? The angles of a polygon follow from the triangle's.

[[polygon-angle-sums|The angle sums of a polygon]] come from triangles. The diagonals from one corner of an $n$-sided polygon cut it into $n - 2$ triangles, so its interior angles add to $180^\circ(n - 2)$, and each angle of a regular $n$-gon is $\tfrac{180^\circ(n - 2)}{n}$: $135^\circ$ for the octagon. The exterior angles, one at each corner, always add to $360^\circ$: walking around the polygon, you turn once completely. The exterior form is usually faster. Angles of $156^\circ$ mean exterior angles of $24^\circ$, so there are $\tfrac{360}{24} = 15$ sides. An $n$-gon also has $\tfrac{n(n-3)}{2}$ diagonals, since each corner joins every other corner except itself and its two neighbors, and each diagonal is counted from both ends: a decagon has $35$.

[[equiangular-polygon|An equiangular polygon]] has equal angles but sides that need not be equal. In an equiangular hexagon every angle is $120^\circ$, so extending three alternate sides makes an equilateral triangle, with the hexagon's other three sides cut off as small equilateral triangles at its corners. Reading the big triangle's three sides gives $a_1 + a_2 + a_6 = a_2 + a_3 + a_4 = a_4 + a_5 + a_6$, the conditions for the hexagon to close up. With sides $3, 1, 4, 2, a_5, a_6$ in order, the first equality gives $a_6 = a_3 + a_4 - a_1 = 3$ and the second $a_5 = a_2 + a_3 - a_6 = 2$; the perimeter is $15$. The same idea, completing an equiangular figure to a regular one, works for the equiangular octagon and a square.

Count triangles for the interior sum, use the exterior sum of $360^\circ$ to find the number of sides, and complete an equiangular polygon to a regular shape. The next lesson finds the areas of quadrilaterals.`,
      related: [
        { card: "regular-polygon-area", note: String.raw`the area of a regular polygon from its side (S6.2).` },
        { card: "handshakes-diagonals", note: String.raw`the number of diagonals as a count of pairs of corners (S6.4).` },
        { card: "equilateral-triangle-facts", note: String.raw`the triangles that complete an equiangular hexagon (S4.4).` }
      ],
      exercises: [
        { q: String.raw`What is each interior angle of a regular octagon, in degrees?`, answer: "135",
          solution: String.raw`The angles add to $180^\circ(8 - 2) = 1080^\circ$, so each is $\tfrac{1080^\circ}{8} = 135^\circ$. Or: each exterior angle is $\tfrac{360^\circ}{8} = 45^\circ$, and $180^\circ - 45^\circ = 135^\circ$.` },
        { q: String.raw`Each interior angle of a regular polygon is $156^\circ$. How many sides does it have?`, answer: "15",
          solution: String.raw`Each exterior angle is $180^\circ - 156^\circ = 24^\circ$, and the exterior angles add to $360^\circ$, so there are $\tfrac{360}{24} = 15$ sides.` },
        { q: String.raw`How many diagonals does a decagon have?`, answer: "35",
          solution: String.raw`Each of the $10$ corners joins $10 - 3 = 7$ others by a diagonal, and each diagonal is counted from both ends: $\tfrac{10 \cdot 7}{2} = 35$.` },
        { q: String.raw`An equiangular hexagon has sides $3, 1, 4, 2, a, b$ in order. What is its perimeter?`, answer: "15",
          solution: String.raw`Extending alternate sides makes an equilateral triangle, whose sides give $a_1 + a_2 + a_6 = a_2 + a_3 + a_4 = a_4 + a_5 + a_6$. So $3 + 1 + b = 1 + 4 + 2$, giving $b = 3$, and $2 + a + 3 = 7$, giving $a = 2$. The perimeter is $3 + 1 + 4 + 2 + 2 + 3 = 15$.` }
      ],
      problems: [
        "2017 AMC 8, Problem 6",
        "2009 AMC 8, Problem 19",
        "2015 AMC 8, Problem 21",
        "2025 AMC 10A, Problem 6",
        "2002 AMC 12B, Problem 5",
        "2007 AMC 12B, Problem 11",
        "2017 AMC 12A, Problem 11"
      ]
    },
    "S2.3": {
      prereq: ["triangle-area-standard", "pythagorean-theorem", "special-right-triangles"],
      cards: ["parallelogram-area", "trapezoid-parallelogram-areas", "quadrilateral-diagonal-area", "parallelogram-vertices"],
      body: String.raw`A parallelogram has sides $6$ and $10$ meeting at $30^\circ$: what is its area? A trapezoid has parallel sides $5$ and $11$, $4$ apart. A rhombus has diagonals $10$ and $24$. Each quadrilateral has an area formula, and each formula comes from triangles.

[[parallelogram-area|A parallelogram's area]] is its base times its height, the height being the distance between the two parallel sides, never the slanted side. With sides $6$ and $10$ at $30^\circ$, the height over the side $10$ is the leg opposite $30^\circ$ in a right triangle with hypotenuse $6$, so $3$, and the area is $30$. In general the height is $b\sin\theta$ and the area $ab\sin\theta$.

[[trapezoid-parallelogram-areas|A trapezoid]] has area equal to the average of its parallel sides times the distance between them, $\tfrac{(b_1 + b_2)h}{2}$: two copies, one turned over, make a parallelogram with base $b_1 + b_2$. The trapezoid above has area $\tfrac{16 \cdot 4}{2} = 32$. A rhombus or a kite has perpendicular diagonals, and its area is half their product: the diagonals cut it into four right triangles that fill half the rectangle around them. The rhombus with diagonals $10$ and $24$ has area $120$, and since its diagonals bisect each other its side is $\sqrt{5^2 + 12^2} = 13$.

[[quadrilateral-diagonal-area|Any quadrilateral]] has area $\tfrac12 d_1 d_2 \sin\theta$, where $\theta$ is the angle between its diagonals: diagonals $8$ and $10$ at $30^\circ$ give $\tfrac12 \cdot 8 \cdot 10 \cdot \tfrac12 = 20$. So the largest area with given diagonals comes when they are perpendicular. And in coordinates, [[parallelogram-vertices|a parallelogram's fourth vertex]] follows from the fact that its diagonals share a midpoint: $A + C = B + D$. With $A = (1, 1)$, $B = (4, 2)$ and $C = (6, 5)$, the vertex opposite $B$ is $D = A + C - B = (3, 4)$.

Find the true height before multiplying, average the parallel sides of a trapezoid, use the diagonals of a rhombus or kite, and add or subtract coordinates for a missing vertex. The next lesson turns to circles.`,
      related: [
        { card: "trig-area", note: String.raw`the triangle version, $\tfrac12 ab\sin C$ (S4.6).` },
        { card: "trapezoid-special-segments", note: String.raw`the midline and other segments of a trapezoid (S6.3).` },
        { card: "shoelace-formula", note: String.raw`the area of a quadrilateral from the coordinates of its corners (S7.4).` }
      ],
      exercises: [
        { q: String.raw`A parallelogram has sides $6$ and $10$ meeting at an angle of $30^\circ$. What is its area?`, answer: "30",
          solution: String.raw`Over the side $10$, the height is the side $6$ times $\sin 30^\circ$, that is, the short leg of a $30$-$60$-$90$ triangle with hypotenuse $6$: $3$. So the area is $10 \cdot 3 = 30$.` },
        { q: String.raw`A trapezoid has parallel sides $5$ and $11$ that are $4$ apart. What is its area?`, answer: "32",
          solution: String.raw`The area is the average of the parallel sides times the distance between them: $\tfrac{5 + 11}{2} \cdot 4 = 32$.` },
        { q: String.raw`A rhombus has diagonals $10$ and $24$. What is the length of its side?`, answer: "13",
          solution: String.raw`The diagonals of a rhombus bisect each other at right angles, so each side is the hypotenuse of a right triangle with legs $5$ and $12$: $\sqrt{25 + 144} = 13$. (Its area is $\tfrac12 \cdot 10 \cdot 24 = 120$.)` },
        { q: String.raw`A parallelogram $ABCD$ has $A = (1, 1)$, $B = (4, 2)$ and $C = (6, 5)$. What is the sum of the coordinates of $D$?`, answer: "7",
          solution: String.raw`The diagonals $AC$ and $BD$ share a midpoint, so $A + C = B + D$ and $D = A + C - B = (1 + 6 - 4, 1 + 5 - 2) = (3, 4)$. The sum is $7$.` },
        { q: String.raw`A quadrilateral has diagonals of lengths $8$ and $10$ that cross at an angle of $30^\circ$. What is its area?`, answer: "20",
          solution: String.raw`The area is $\tfrac12 d_1 d_2 \sin\theta = \tfrac12 \cdot 8 \cdot 10 \cdot \tfrac12 = 20$.` }
      ],
      problems: [
        "1991 AJHSME, Problem 10",
        "2001 AMC 8, Problem 7",
        "2003 AMC 8, Problem 8",
        "2001 AMC 8, Problem 11",
        "1995 AJHSME, Problem 24",
        "2011 AMC 8, Problem 20",
        "2021 Fall AMC 10A, Problem 2",
        "2022 AMC 10B, Problem 2",
        "2005 AMC 12B, Problem 7",
        "2012 AMC 10B, Problem 14"
      ]
    },
    "S2.4": {
      prereq: ["triangle-area-standard", "special-right-triangles"],
      cards: ["circle-basics", "circular-segment", "tethered-animal"],
      body: String.raw`What is the area of a slice of a pizza of radius $6$ cut at $60^\circ$? Of the ring between circles of radii $5$ and $3$? Of the part of a circle cut off by a chord? A goat is tied to the corner of a square shed: where can it graze? Each is a fraction of a circle, sometimes with a triangle added or removed.

[[circle-basics|A circle of radius $r$]] has circumference $2\pi r$ and area $\pi r^2$. A central angle of $\theta$ degrees cuts off the fraction $\tfrac{\theta}{360}$ of both, so a $60^\circ$ sector of radius $6$ has area $\tfrac16 \cdot 36\pi = 6\pi$ and arc length $\tfrac16 \cdot 12\pi = 2\pi$. The ring between circles of radii $R$ and $r$ has area $\pi(R^2 - r^2)$: $16\pi$ for $5$ and $3$. Many circle problems are area by pieces (S1.4): a shaded region is a sector, a ring or a whole circle with triangles and squares added or removed. Measured in radians, where a full turn is $2\pi$, the arc is $r\theta$ and the sector $\tfrac12 r^2 \theta$.

[[circular-segment|A circular segment]], the region between a chord and its arc, is the sector less the triangle formed by the chord and the two radii. With radius $2$ and a $90^\circ$ angle, the sector is $\tfrac14 \cdot 4\pi = \pi$ and the triangle $\tfrac12 \cdot 2 \cdot 2 = 2$, so the segment has area $\pi - 2$. The overlap of two circles, a lens, is two segments placed back to back along the common chord.

[[tethered-animal|A tethered animal]] sweeps sectors. A goat tied by a rope of length $6$ to a corner of a $4 \times 4$ shed can reach three quarters of a circle of radius $6$, $27\pi$, around the outside of the corner. When the rope wraps around either neighboring corner, $4$ away, $2$ of rope remain, and the goat sweeps a quarter circle of radius $2$ there, $\pi$ each. In all, $29\pi$. Draw the rope along each wall to see where it bends, and make sure the pieces do not overlap.

Find the fraction of the circle a piece takes, add and subtract triangles and squares, and follow a rope around each corner. The next lesson puts figures on a grid.`,
      related: [
        { card: "chord-length", note: String.raw`the chord from the radius and the distance to the center (S5.2).` },
        { card: "rolling-without-slipping", note: String.raw`a circle rolling along a path, measured by its circumference (S5.6).` },
        { card: "regular-hexagon-area", note: String.raw`regular hexagons inside circles, with segments left over (S6.2).` }
      ],
      exercises: [
        { q: String.raw`A sector of a circle of radius $6$ has a central angle of $60^\circ$. What is its area?`, answer: "6pi",
          solution: String.raw`The sector is $\tfrac{60}{360} = \tfrac16$ of the circle, whose area is $36\pi$. So it has area $6\pi$.` },
        { q: String.raw`What is the area of the ring between two circles with the same center and radii $5$ and $3$?`, answer: "16pi",
          solution: String.raw`The ring is the big disk less the small one: $25\pi - 9\pi = 16\pi$.` },
        { q: String.raw`A chord of a circle of radius $2$ cuts off a $90^\circ$ arc. What is the area of the region between the chord and that arc?`, answer: "pi-2",
          solution: String.raw`The quarter sector has area $\tfrac14 \cdot \pi \cdot 4 = \pi$. The triangle formed by the chord and the two radii is a right triangle with legs $2$, of area $2$. The region is the sector less the triangle: $\pi - 2$.` },
        { q: String.raw`A goat is tied by a rope of length $6$ to one outside corner of a square shed of side $4$. Over what area can it graze?`, answer: "29pi",
          solution: String.raw`Outside the corner, the goat sweeps $\tfrac34$ of a circle of radius $6$: $\tfrac34 \cdot 36\pi = 27\pi$. Along either wall the rope reaches the next corner with $2$ to spare and sweeps a quarter circle of radius $2$: $\pi$ each. These pieces do not overlap, so the area is $27\pi + 2\pi = 29\pi$.` }
      ],
      problems: [
        "1997 AJHSME, Problem 24",
        "2003 AMC 8, Problem 22",
        "2007 AMC 8, Problem 16",
        "2010 AMC 8, Problem 18",
        "2014 AMC 8, Problem 20",
        "2023 AMC 8, Problem 12",
        "2009 AMC 10A, Problem 6",
        "2006 AMC 10A, Problem 12",
        "2011 AMC 10A, Problem 14",
        "2007 AMC 10B, Problem 13"
      ]
    },
    "S2.5": {
      prereq: ["pythagorean-theorem", "triangle-area-standard"],
      cards: ["distance-midpoint", "line-forms"],
      body: String.raw`How far apart are $(2, -3)$ and $(8, 5)$? What line passes through $(1, 2)$ and $(3, 8)$? What triangle does the line $3x + 4y = 24$ cut from the corner of the axes? Coordinates turn geometry into arithmetic, with three measurements and a few ways to write a line.

[[distance-midpoint|Distance, midpoint and slope]] are the measurements between two points. The distance is the Pythagorean theorem on the horizontal and vertical gaps: from $(2, -3)$ to $(8, 5)$ the gaps are $6$ and $8$, so the distance is $10$. The midpoint averages the coordinates, $(5, 1)$. The slope is rise over run, $\tfrac{8}{6} = \tfrac43$; parallel lines have equal slopes, and perpendicular lines have slopes whose product is $-1$.

[[line-forms|A line]] can be written in several forms, each suited to what is given. Through two points, find the slope and then use point-slope form: through $(1, 2)$ and $(3, 8)$ the slope is $3$, so $y - 2 = 3(x - 1)$, that is, $y = 3x - 1$, with $y$-intercept $-1$. In standard form $Ax + By = C$ the slope is $-\tfrac AB$: the line $2x + 3y = 6$ has slope $-\tfrac23$, so a perpendicular line has slope $\tfrac32$. The intercepts are found by setting one variable to $0$: $3x + 4y = 24$ meets the axes at $(8, 0)$ and $(0, 6)$, so it cuts off a right triangle of area $\tfrac12 \cdot 8 \cdot 6 = 24$, with hypotenuse $10$.

Put a figure on axes where its corners are easy to name, find gaps for distances and slopes, and choose the form of a line that matches what is given. The Summary follows.`,
      related: [
        { card: "section-formula", note: String.raw`the point dividing a segment in a given ratio (S7.2).` },
        { card: "point-line-distance", note: String.raw`the distance from a point to a line (S7.2).` },
        { card: "coordinate-bash", note: String.raw`solving a whole problem in coordinates (S7.4).` }
      ],
      exercises: [
        { q: String.raw`How far apart are the points $(2, -3)$ and $(8, 5)$?`, answer: "10",
          solution: String.raw`The gaps are $8 - 2 = 6$ and $5 - (-3) = 8$, so the distance is $\sqrt{36 + 64} = 10$.` },
        { q: String.raw`What is the $y$-intercept of the line through $(1, 2)$ and $(3, 8)$?`, answer: "-1",
          solution: String.raw`The slope is $\tfrac{8 - 2}{3 - 1} = 3$, so the line is $y - 2 = 3(x - 1)$, or $y = 3x - 1$. Its $y$-intercept is $-1$.` },
        { q: String.raw`What is the slope of a line perpendicular to $2x + 3y = 6$?`, answer: "3/2",
          solution: String.raw`Solving for $y$, $y = -\tfrac23 x + 2$, so the slope is $-\tfrac23$. A perpendicular slope multiplies with it to $-1$: $\tfrac32$.` },
        { q: String.raw`What is the area of the triangle cut off from the first quadrant by the line $3x + 4y = 24$?`, answer: "24",
          solution: String.raw`Setting $y = 0$ gives the $x$-intercept $8$, and $x = 0$ gives the $y$-intercept $6$. The triangle with legs $8$ and $6$ along the axes has area $\tfrac12 \cdot 8 \cdot 6 = 24$.` }
      ],
      problems: [
        "1998 AJHSME, Problem 13",
        "2025 AMC 8, Problem 12",
        "2010 AMC 10A, Problem 7",
        "2023 AMC 10A, Problem 8",
        "2017 AMC 10B, Problem 8",
        "2015 AMC 10B, Problem 12",
        "2004 AMC 12A, Problem 12"
      ]
    },
    "S2.6": {
      prereq: ["polygon-angle-sums", "equiangular-polygon", "parallelogram-area", "trapezoid-parallelogram-areas", "quadrilateral-diagonal-area", "parallelogram-vertices", "circle-basics", "circular-segment", "tethered-animal", "distance-midpoint", "line-forms"],
      cards: [],
      body: String.raw`[[polygon-angle-sums|A polygon's angles]] add to $180^\circ(n - 2)$ and its exterior angles to $360^\circ$; [[equiangular-polygon|an equiangular polygon]] is completed to a regular shape.

[[parallelogram-area|A parallelogram]] is base times true height, [[trapezoid-parallelogram-areas|a trapezoid]] the average base times height and a rhombus half its diagonals' product, [[quadrilateral-diagonal-area|any quadrilateral]] $\tfrac12 d_1d_2\sin\theta$, and [[parallelogram-vertices|a missing vertex]] is $A + C - B$.

[[circle-basics|A circle]] has circumference $2\pi r$ and area $\pi r^2$, with sectors as fractions; [[circular-segment|a segment]] is a sector less a triangle, and [[tethered-animal|a tethered animal]] sweeps sectors around corners.

[[distance-midpoint|Distance, midpoint and slope]] measure between points, and [[line-forms|a line]] is written in the form that fits what is given.`,
      strategies: [
        String.raw`Use the exterior angle sum, $360^\circ$, to find the number of sides of a regular polygon.`,
        String.raw`Cut a polygon into triangles from one corner to find its angle sum.`,
        String.raw`Find the true height of a parallelogram or trapezoid before multiplying.`,
        String.raw`Write a shaded circular region as sectors, rings and triangles added or removed.`,
        String.raw`Follow a tether along each wall to see where it bends.`,
        String.raw`Place a figure on axes so that its corners have simple coordinates.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`The interior angles of a polygon add to $1440^\circ$. How many sides does it have?`, answer: "10",
        solution: String.raw`$180^\circ(n - 2) = 1440^\circ$ gives $n - 2 = 8$, so $n = 10$.` },
      { q: String.raw`A pizza of radius $8$ is cut into slices with $45^\circ$ angles. What is the area of one slice?`, answer: "8pi",
        solution: String.raw`A slice is $\tfrac{45}{360} = \tfrac18$ of the pizza, whose area is $64\pi$: $8\pi$.` },
      { q: String.raw`A kite has diagonals $6$ and $14$. What is its area?`, answer: "42",
        solution: String.raw`A kite's diagonals are perpendicular, so its area is half their product: $\tfrac12 \cdot 6 \cdot 14 = 42$.` }
    ],
    problems: [
      "2010 AMC 8, Problem 16",
      "2018 AMC 8, Problem 15",
      "2024 AMC 8, Problem 18",
      "2005 AMC 8, Problem 25",
      "2005 AMC 10B, Problem 8",
      "2015 AMC 10B, Problem 9",
      "2018 AMC 10B, Problem 7",
      "2017 AMC 10B, Problem 10"
    ]
  },
  challenge: {
    problems: [
      "2008 AMC 8, Problem 25",
      "2014 AMC 8, Problem 25",
      "2021 Fall AMC 10B, Problem 11",
      "2020 AMC 10B, Problem 14",
      "2013 AMC 12B, Problem 13"
    ]
  }
};
