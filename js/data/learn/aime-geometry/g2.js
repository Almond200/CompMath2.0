// Learn, AIME Geometry, chapter G2: circles and cyclic figures (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["G2"] = {
  lessons: {
    "G2.1": {
      prereq: ["inscribed-angle-theorem", "power-of-a-point", "tangent-facts"],
      cards: [],
      body: String.raw`This chapter works with circles. Its tools are inscribed angles and cyclic quadrilaterals, the power of a point, Ptolemy's theorem and chord lengths, the tangent lengths of incircles and excircles, and the right triangles that appear whenever circles touch.

An inscribed angle is half the arc it cuts off, so an angle that cuts off a $100^\circ$ arc is $50^\circ$, and all the angles that cut off the same arc are equal. A quadrilateral is cyclic exactly when its opposite angles add to $180^\circ$, or when two angles on the same side of a segment are equal; recognizing four points on a circle is often the key step, since it turns into many equal angles.

Through a point $P$, every line that meets a circle at $A$ and $B$ gives the same product $PA \cdot PB$, the power of $P$; for a tangent it is the square of the tangent length. If chords $AB$ and $CD$ cross at $P$ with $AP = 4$, $PB = 6$ and $CP = 3$, then $PD = 8$. Ptolemy's theorem relates the sides and diagonals of a cyclic quadrilateral, and a chord's length follows from the angle it subtends.

The two tangents from a point to a circle are equal, so in a triangle with sides $a$, $b$, $c$ the incircle touches the sides at distances $s - a$, $s - b$, $s - c$ from the vertices, where $s$ is the semiperimeter; with sides $7, 8, 9$, $s = 12$ and the tangent length at the vertex opposite the side $7$ is $5$. The inradius is the area divided by $s$.

When two circles touch, their centers and the point of contact are on one line, at a distance equal to the sum or difference of the radii, and a radius to a point of tangency is perpendicular to the tangent line. Most problems about touching circles become right triangles.

The lessons take these ideas in turn: cyclic quadrilaterals and angle chasing (G2.2), the power of a point (G2.3), Ptolemy and chords (G2.4), incircles and excircles (G2.5), and circles that meet or touch (G2.6). The Summary (G2.7) collects the strategies.`,
      exercises: [
        { q: String.raw`An inscribed angle cuts off an arc of $100^\circ$. How large is the angle?`, answer: "50",
          solution: String.raw`An inscribed angle is half the arc it cuts off: $50^\circ$.` },
        { q: String.raw`Chords $AB$ and $CD$ of a circle cross at $P$, with $AP = 4$, $PB = 6$ and $CP = 3$. Find $PD$.`, answer: "8",
          solution: String.raw`By the power of the point $P$, $PA \cdot PB = PC \cdot PD$, so $24 = 3 \cdot PD$ and $PD = 8$.` },
        { q: String.raw`A triangle has sides $7$, $8$ and $9$. Its incircle touches the side of length $8$ and the side of length $9$ at points equally far from their common vertex. How far?`, answer: "5",
          solution: String.raw`The two tangents from a vertex to the incircle are equal. With semiperimeter $s = 12$, the tangent length at the vertex opposite the side $7$, which is where the sides $8$ and $9$ meet, is $s - 7 = 5$. (The other two are $4$ and $3$, and $5 + 4 = 9$, $5 + 3 = 8$.)` }
      ],
      problems: [
        "2008 AIME I, Problem 5",
        "2009 AIME II, Problem 5",
        "2017 AIME I, Problem 8"
      ]
    },
    "G2.2": {
      prereq: ["inscribed-angle-theorem"],
      cards: ["angle-chasing", "cyclic-opposite-angles", "cyclic-equal-angles", "concyclicity-tests", "angle-chord-secant", "tangent-chord-angle", "cyclic-quadrilateral"],
      body: String.raw`Angles in circles are fixed by arcs, and that one fact drives a large share of geometry problems: an inscribed angle is half its arc, angles on the same arc are equal, opposite angles of a cyclic quadrilateral add to $180^\circ$, and the angle between a tangent and a chord equals the inscribed angle on the other side. Problems give a few angles or arcs and ask for another, or hide a cyclic quadrilateral that, once found, makes several angles equal at once.

[[angle-chasing|Angle chasing]] names one unknown angle and propagates it through the figure with the triangle sum, isosceles triangles, parallel lines and the circle facts, until an equation closes. It is the first thing to try when a figure has several angles marked equal or in a ratio. In a circle, an inscribed angle is half its intercepted arc, so an inscribed angle on an arc of $100^\circ$ is $50^\circ$. Two chords crossing inside a circle make an angle equal to half the sum of the two arcs they cut off, and two secants from an outside point make half the difference: these are the [[angle-chord-secant|angles from chords and secants]]. Chords crossing on arcs of $80^\circ$ and $40^\circ$ make a $60^\circ$ angle.

The [[tangent-chord-angle|tangent-chord angle]] is half the arc it cuts off, so it equals any inscribed angle on the other side of the chord: a tangent and a chord enclosing an arc of $130^\circ$ make an angle of $65^\circ$. This is the bridge between a tangent line and the angles of an inscribed triangle, and it is often the only way to bring a tangent into an angle chase.

In a [[cyclic-quadrilateral|quadrilateral inscribed in a circle]], [[cyclic-opposite-angles|opposite angles add to $180^\circ$]], since together they stand on the whole circle, and [[cyclic-equal-angles|the angles that a side makes with the two diagonals at the opposite vertices are equal]], since they stand on the same arc. The converse statements are the [[concyclicity-tests|tests for concyclic points]]: four points lie on a circle when a quadrilateral they form has opposite angles adding to $180^\circ$, or when a segment subtends equal angles at the other two points on the same side, or when the products of segments of two crossing lines agree (power of a point). Finding a hidden cyclic quadrilateral, for instance two right angles that stand on the same segment, makes all of its equal angles available.

Chase angles with arcs as the bookkeeping, and look for four points that are secretly on a circle. The next lesson measures lengths in circles with the power of a point.`,
      related: [
        { card: "inscribed-angle-theorem", note: String.raw`an inscribed angle is half its arc, the fact every chase here uses.` },
        { card: "power-of-a-point", note: String.raw`the length test for four concyclic points (G2.3).` },
        { card: "triangle-center-angles", note: String.raw`angles at the incenter, circumcenter and orthocenter from the angles of the triangle (G5.1).` }
      ],
      exercises: [
        { q: String.raw`Two chords of a circle cross inside it. The arcs cut off by the two vertical angles at the crossing measure $80^\circ$ and $40^\circ$. Find the angle between the chords (in degrees).`, answer: "60",
          solution: String.raw`An angle formed by two chords crossing inside a circle is half the sum of the arcs cut off by it and its vertical angle: $\tfrac12(80^\circ + 40^\circ) = 60^\circ$.` },
        { q: String.raw`A tangent to a circle at $A$ and the chord $AB$ cut off an arc of $130^\circ$. Find the angle between the tangent and the chord (in degrees).`, answer: "65",
          solution: String.raw`The tangent-chord angle is half its intercepted arc, $\tfrac{130^\circ}{2} = 65^\circ$.` }
      ],
      problems: [
        "2007 AMC 12B, Problem 3",
        "2015 AMC 12B, Problem 13",
        "2011 AMC 12B, Problem 10",
        "2005 AMC 12B, Problem 18",
        "2018 AMC 12A, Problem 20",
        "2001 AMC 12, Problem 24",
        "2020 AIME I, Problem 1",
        "2022 AIME I, Problem 3",
        "2015 AIME I, Problem 6",
        "2003 AIME I, Problem 10",
        "2015 AIME II, Problem 11",
        "2021 AIME II, Problem 14"
      ]
    },
    "G2.3": {
      prereq: ["power-of-a-point", "chord-length"],
      cards: ["radical-axis", "thales-theorem"],
      body: String.raw`Lengths in a circle are tied together by the power of a point: for any point and any line through it that meets a circle, the product of the two distances to the circle is the same. Two chords crossing inside a circle, two secants from an outside point, a tangent and a secant: all are the same fact, and with it a single equation finds an unknown segment. Its companions, the radical axis of two circles and the right angle in a semicircle, add the most common ways circles meet lines and each other.

The [[power-of-a-point|power of a point]] $P$ with respect to a circle with center $O$ and radius $r$ is $OP^2 - r^2$, and for any line through $P$ meeting the circle at $A$ and $B$, $PA \cdot PB$ equals its absolute value. So chords $AB$ and $CD$ crossing at $P$ satisfy $PA \cdot PB = PC \cdot PD$; with $PA = 4$, $PB = 6$ and $PC = 3$, $PD = 8$. A tangent $PT$ from an outside point satisfies $PT^2 = PA \cdot PB$ for any secant $PAB$: with $PT = 6$ and $PA = 4$, $PB = 9$. Reading a problem's segments as products along lines through one point is the main skill, and the converse is a test: if $PA \cdot PB = PC \cdot PD$ along two lines through $P$, then $A$, $B$, $C$, $D$ are concyclic.

The [[radical-axis|radical axis]] of two circles is the set of points with equal power with respect to both, a line perpendicular to the line of centers. For two circles that meet, it is the line through their common points, and its equation is the difference of the two circle equations: for $x^2 + y^2 = 25$ and $(x - 6)^2 + y^2 = 13$, subtracting gives $12x - 36 = 12$, so $x = 4$, and the common chord has half-length $\sqrt{25 - 16} = 3$, length $6$. The tangents from a point on the radical axis to the two circles are equal, and the radical axes of three circles meet at one point.

[[thales-theorem|Thales' theorem]] says an angle inscribed in a semicircle is a right angle, and conversely the right angles on a fixed segment lie on the circle with that segment as diameter. It turns every right angle in a figure into a circle: two right angles on the same hypotenuse put four points on one circle, and the locus of points from which a segment is seen at a right angle is a circle. Combined with power of a point, it gives the lengths in figures with a diameter and a perpendicular chord.

Write products of segments along lines through a common point, subtract circle equations for common chords, and turn right angles into circles. The next lesson relates the chords of a cyclic quadrilateral.`,
      related: [
        { card: "chord-length", note: String.raw`a chord at distance $d$ from the center has length $2\sqrt{r^2 - d^2}$.` },
        { card: "circle-equation", note: String.raw`the equations whose difference is the radical axis (G4.3).` },
        { card: "concyclicity-tests", note: String.raw`equal products as a test for four points on a circle (G2.2).` }
      ],
      exercises: [
        { q: String.raw`Chords $AB$ and $CD$ of a circle meet at $P$, with $PA = 4$, $PB = 6$ and $PC = 3$. Find $PD$.`, answer: "8",
          solution: String.raw`By the power of the point $P$, $PA \cdot PB = PC \cdot PD$, so $24 = 3 \cdot PD$ and $PD = 8$.` },
        { q: String.raw`From a point $P$ outside a circle, the tangent segment has length $6$, and a secant from $P$ meets the circle first at $A$ with $PA = 4$, then at $B$. Find $PB$.`, answer: "9",
          solution: String.raw`The power of $P$ gives $PT^2 = PA \cdot PB$, so $36 = 4 \cdot PB$ and $PB = 9$.` },
        { q: String.raw`Find the length of the common chord of the circles $x^2 + y^2 = 25$ and $(x - 6)^2 + y^2 = 13$.`, answer: "6",
          solution: String.raw`Subtracting the equations gives the radical axis: $x^2 - (x - 6)^2 = 12$, so $12x - 36 = 12$ and $x = 4$. On the first circle $y^2 = 25 - 16 = 9$, so the chord runs from $(4, -3)$ to $(4, 3)$ and has length $6$.` }
      ],
      problems: [
        "2007 AMC 12A, Problem 10",
        "2017 AMC 12B, Problem 6",
        "2017 AMC 12B, Problem 18",
        "2020 AMC 12B, Problem 10",
        "2013 AMC 12A, Problem 19",
        "2017 AMC 12B, Problem 9",
        "2023 AMC 12B, Problem 10",
        "2023 AIME I, Problem 5",
        "2001 AIME II, Problem 6",
        "2024 AIME I, Problem 5",
        "2026 AIME II, Problem 10",
        "2010 AIME II, Problem 14",
        "2021 AIME I, Problem 13"
      ]
    },
    "G2.4": {
      prereq: ["chord-length", "cyclic-opposite-angles"],
      cards: ["ptolemys-theorem", "equal-chords-arcs", "brahmaguptas-formula"],
      body: String.raw`A cyclic quadrilateral has a relation among its sides and diagonals and a formula for its area, both in terms of lengths alone. With them, the diagonal of a regular pentagon, the sides of a hexagon inscribed with alternating chord lengths, or the area of a quadrilateral inscribed in a circle with given sides follow without any angles. Together with the facts about equal chords, they handle most length problems about polygons inscribed in circles.

[[ptolemys-theorem|Ptolemy's theorem]] says that in a cyclic quadrilateral $ABCD$ the product of the diagonals equals the sum of the products of opposite sides: $AC \cdot BD = AB \cdot CD + AD \cdot BC$. In a regular pentagon with side $1$ and diagonal $d$, four vertices form a cyclic quadrilateral with three sides $1$, one side $d$ and both diagonals $d$, so $d^2 = d + 1$ and $d = \tfrac{1 + \sqrt5}{2}$. The theorem is most useful when a polygon inscribed in a circle has many equal chords, since each choice of four vertices gives an equation, and a few such equations determine all the diagonals.

[[equal-chords-arcs|Equal chords]] in one circle subtend equal arcs and equal central angles, and lie at equal distances from the center. So the vertices of an inscribed polygon with sides alternating between two lengths are spaced by two alternating arcs, and its diagonals fall into a few classes by the number of arcs they span. The length of a chord is $2\sqrt{r^2 - d^2}$ in terms of its distance $d$ from the center, and $2r\sin\tfrac\theta2$ in terms of its central angle: in a circle of radius $10$, a chord at distance $6$ from the center has length $16$.

[[brahmaguptas-formula|Brahmagupta's formula]] gives the area of a cyclic quadrilateral with sides $a$, $b$, $c$, $d$ and semiperimeter $s$ as $\sqrt{(s - a)(s - b)(s - c)(s - d)}$, the analog of Heron's formula (which is the case $d = 0$). With sides $2$, $3$, $6$, $7$, $s = 9$ and the area is $\sqrt{7 \cdot 6 \cdot 3 \cdot 2} = 6\sqrt7$. A quadrilateral that is both cyclic and tangential has area $\sqrt{abcd}$.

Use Ptolemy when an inscribed polygon has chords of a few lengths, equal-chord reasoning to sort chords into classes, and Brahmagupta for areas. The next lesson turns to circles inside triangles.`,
      related: [
        { card: "herons-formula", note: String.raw`the triangle case of Brahmagupta's formula (G3.2).` },
        { card: "golden-ratio-pentagon", note: String.raw`the pentagon's diagonal-to-side ratio, found here by Ptolemy (G7.1).` },
        { card: "ptolemys-inequality", note: String.raw`the inequality for quadrilaterals that are not cyclic.` }
      ],
      exercises: [
        { q: String.raw`A regular pentagon has side $1$. Find the length of its diagonal.`, answer: "(1+sqrt(5))/2",
          solution: String.raw`Four vertices of the pentagon form a cyclic quadrilateral with three sides $1$, the fourth side a diagonal $d$, and both diagonals $d$. Ptolemy gives $d \cdot d = 1 \cdot 1 + 1 \cdot d$, so $d^2 - d - 1 = 0$ and $d = \tfrac{1 + \sqrt5}{2}$.` },
        { q: String.raw`A chord of a circle of radius $10$ is at distance $6$ from the center. Find its length.`, answer: "16",
          solution: String.raw`The perpendicular from the center bisects the chord, so half the chord is $\sqrt{10^2 - 6^2} = 8$, and the chord is $16$.` },
        { q: String.raw`A cyclic quadrilateral has sides $2$, $3$, $6$ and $7$. Find its area.`, answer: "6sqrt(7)",
          solution: String.raw`The semiperimeter is $9$, and Brahmagupta's formula gives $\sqrt{(9 - 2)(9 - 3)(9 - 6)(9 - 7)} = \sqrt{7 \cdot 6 \cdot 3 \cdot 2} = \sqrt{252} = 6\sqrt7$.` }
      ],
      problems: [
        "2018 AMC 12B, Problem 4",
        "2008 AMC 12B, Problem 9",
        "2021 Fall AMC 12B, Problem 10",
        "2013 AMC 12B, Problem 19",
        "2022 AMC 12A, Problem 20",
        "2014 AMC 12B, Problem 24",
        "1983 AIME, Problem 12",
        "2001 AIME I, Problem 13",
        "1991 AIME, Problem 12",
        "1991 AIME, Problem 14",
        "2021 AIME I, Problem 11"
      ]
    },
    "G2.5": {
      prereq: ["tangent-facts", "herons-formula"],
      cards: ["incircle-tangent-lengths", "incircle-excircle-touch", "inradius-area", "exradii", "pitots-theorem"],
      body: String.raw`The circle inscribed in a triangle touches each side once, and the two tangent segments from each vertex are equal. That one fact gives every length on the sides in terms of the semiperimeter, and together with the formula for the inradius it answers most questions about incircles and excircles: where the circle touches, how large it is, and how the incircles of two smaller triangles compare.

The [[incircle-tangent-lengths|tangent lengths]] from the vertices of triangle $ABC$ to the incircle are $s - a$, $s - b$ and $s - c$, where $s$ is the semiperimeter and $a$, $b$, $c$ are the sides opposite $A$, $B$, $C$: the tangent length from $A$ is $s - a$, since the tangents from $A$, $B$, $C$ add to $s$ and those from $B$ and $C$ cover side $a$. For the triangle with $BC = 14$, $CA = 15$, $AB = 13$, $s = 21$ and the tangent length from $A$ is $7$. The excircle opposite $A$ touches $BC$ and the extensions of the other sides, and its tangent lengths from $B$ and $C$ swap those of the incircle, so the [[incircle-excircle-touch|incircle and excircle touch points]] on $BC$ are symmetric about the midpoint of $BC$.

The [[inradius-area|inradius]] $r$ satisfies $K = rs$: the area is split into three triangles from the incenter, each with height $r$. For the $13$-$14$-$15$ triangle, $K = 84$ and $r = 4$. In a right triangle with legs $a$, $b$ and hypotenuse $c$, $r = \tfrac{a + b - c}{2}$. The [[exradii|exradii]] satisfy $K = r_a(s - a)$, so here $r_a = \tfrac{84}{7} = 12$, and $\tfrac1r = \tfrac1{r_a} + \tfrac1{r_b} + \tfrac1{r_c}$.

A quadrilateral has an inscribed circle exactly when its opposite sides have equal sums, [[pitots-theorem|Pitot's theorem]], for the same reason: each side is the sum of two tangent lengths, and the opposite sides use all four tangent lengths once. A tangential quadrilateral with consecutive sides $5$, $7$, $9$ has fourth side $5 + 9 - 7 = 7$. Its area is $r$ times its semiperimeter, as for a triangle.

Label tangent lengths from each vertex, write sides as their sums, and use $K = rs$ for the radius. The next lesson studies circles that meet or touch each other.`,
      related: [
        { card: "herons-formula", note: String.raw`the area that, with $K = rs$, gives the inradius from three sides (G3.2).` },
        { card: "right-triangle-inradius", note: String.raw`$r = \tfrac{a + b - c}{2}$ in a right triangle.` },
        { card: "incenter-excenter-lemma", note: String.raw`where the incenter and excenters sit on the circumcircle (G5.1).` }
      ],
      exercises: [
        { q: String.raw`Triangle $ABC$ has $BC = 14$, $CA = 15$ and $AB = 13$. Find the length of the tangent from $A$ to the incircle.`, answer: "7",
          solution: String.raw`The semiperimeter is $21$, and the tangent length from $A$ is $s - a = 21 - 14 = 7$. (Check: the tangents from $B$ and $C$ are $8$ and $6$, adding to $14 = BC$.)` },
        { q: String.raw`For the same triangle, find the inradius and the exradius opposite $A$; give their sum.`, answer: "16",
          solution: String.raw`Heron's formula gives $K = \sqrt{21 \cdot 7 \cdot 6 \cdot 8} = 84$. Then $r = \tfrac{K}{s} = 4$ and $r_a = \tfrac{K}{s - a} = \tfrac{84}{7} = 12$, with sum $16$.` }
      ],
      problems: [
        "2012 AMC 12A, Problem 18",
        "2011 AMC 12B, Problem 22",
        "2004 AMC 12B, Problem 19",
        "2011 AMC 12A, Problem 24",
        "2022 AMC 12A, Problem 25",
        "1999 AIME, Problem 12",
        "2007 AIME II, Problem 9",
        "2009 AIME I, Problem 12",
        "1993 AIME, Problem 15",
        "2025 AIME I, Problem 6",
        "2019 AIME I, Problem 11",
        "2020 AIME II, Problem 13"
      ]
    },
    "G2.6": {
      prereq: ["tangent-facts", "pythagorean-theorem"],
      cards: ["tangent-circles", "two-tangents-angle", "rolling-without-slipping", "common-tangent-lengths", "triangle-of-centers", "common-chord-length", "descartes-circle-theorem", "tangency-condition"],
      body: String.raw`Figures with several circles touching each other and lines, such as coins in a row, circles packed in a square, or a small circle nestled among three larger ones, look complicated but reduce to triangles once the centers are joined. The distances between centers are sums or differences of radii, the tangent lines are perpendicular to radii, and the problem becomes one about right triangles and triangles with known sides.

Two [[tangent-circles|tangent circles]] have centers at distance $R + r$ (externally) or $R - r$ (internally), and their point of contact lies on the line of centers. [[triangle-of-centers|Joining the centers]] of mutually tangent circles gives a triangle with sides that are sums of radii, and a circle tangent to a line has its center at distance $r$ from the line. These two facts turn a packing into a polygon with known side lengths, often a right triangle. Three unit circles that touch each other have centers at the corners of an equilateral triangle of side $2$, whose circumradius is $\tfrac{2}{\sqrt3}$, so the small circle in the middle tangent to all three has radius $\tfrac{2}{\sqrt3} - 1 = \tfrac{2\sqrt3 - 3}{3}$. [[descartes-circle-theorem|Descartes' circle theorem]] gives the same answer directly from the curvatures $k = \tfrac1r$: $k_4 = k_1 + k_2 + k_3 \pm 2\sqrt{k_1k_2 + k_2k_3 + k_3k_1}$, here $3 + 2\sqrt3$.

A [[common-tangent-lengths|common tangent]] of two circles with centers $d$ apart has length $\sqrt{d^2 - (R - r)^2}$ between the points of tangency if it is external and $\sqrt{d^2 - (R + r)^2}$ if it is internal, from the right trapezoid or the right triangle formed with the radii. Two externally tangent circles of radii $9$ and $4$ have $d = 13$ and external tangent $\sqrt{169 - 25} = 12 = 2\sqrt{9 \cdot 4}$. The [[two-tangents-angle|angle between two tangents]] from an outside point is $180^\circ$ minus the central angle between the points of tangency. Two circles that meet have a [[common-chord-length|common chord]] perpendicular to the line of centers, whose length follows from the two right triangles on either side.

A disk [[rolling-without-slipping|rolling without slipping]] along a line or around another circle turns by the distance its center travels divided by its radius; rolling around the outside of a circle of the same radius, it makes two full turns. In coordinates, a [[tangency-condition|tangency condition]] is that the equation for the common points has exactly one solution, which for a line and a circle means the distance from the center to the line equals the radius.

Join centers, draw radii to points of tangency, and look for right triangles. The Summary (G2.7) collects the chapter's strategies, and the problems after it mix the circle tools of all five lessons.`,
      related: [
        { card: "homothety-monge", note: String.raw`the centers of similitude of two circles, where common tangents meet (G6.4).` },
        { card: "tangency-equation", note: String.raw`the tangency of a line and a curve as a double root (G4.3).` },
        { card: "circle-in-angle", note: String.raw`circles inscribed in an angle, whose centers lie on the bisector (G5.5).` }
      ],
      exercises: [
        { q: String.raw`Circles of radii $9$ and $4$ are externally tangent. Find the length of a common external tangent between its points of tangency.`, answer: "12",
          solution: String.raw`The centers are $13$ apart. The radii to the tangent points are perpendicular to the tangent, so the tangent length is $\sqrt{13^2 - (9 - 4)^2} = \sqrt{144} = 12$.` },
        { q: String.raw`Three circles of radius $1$ are mutually externally tangent. Find the radius of the small circle tangent to all three, inside the gap between them.`, answer: "(2sqrt(3)-3)/3",
          solution: String.raw`The centers form an equilateral triangle of side $2$, with circumradius $\tfrac{2}{\sqrt3}$. The small circle's center is the center of that triangle, at distance $1 + \rho$ from each vertex, so $\rho = \tfrac{2}{\sqrt3} - 1 = \tfrac{2\sqrt3 - 3}{3}$.` }
      ],
      problems: [
        "2006 AMC 12A, Problem 13",
        "2006 AMC 12B, Problem 15",
        "2004 AMC 12B, Problem 10",
        "2011 AMC 12B, Problem 6",
        "2005 AMC 12A, Problem 16",
        "2002 AMC 12A, Problem 18",
        "2001 AMC 12, Problem 18",
        "2011 AMC 12A, Problem 17",
        "2004 AMC 12A, Problem 19",
        "2005 AIME I, Problem 1",
        "1995 AIME, Problem 4",
        "1997 AIME, Problem 4",
        "1998 AIME, Problem 10",
        "2004 AIME II, Problem 12",
        "2006 AIME II, Problem 9",
        "2014 AIME II, Problem 8",
        "2014 AIME I, Problem 10",
        "2007 AIME II, Problem 11"
      ]
    },
    "G2.7": {
      prereq: ["inscribed-angle-theorem", "cyclic-opposite-angles", "concyclicity-tests", "power-of-a-point", "radical-axis", "ptolemys-theorem", "brahmaguptas-formula", "incircle-tangent-lengths", "exradii", "tangent-circles", "common-tangent-lengths"],
      cards: [],
      body: String.raw`[[inscribed-angle-theorem|An inscribed angle]] is half its arc, so angles on the same arc are equal. [[cyclic-opposite-angles|Opposite angles of a cyclic quadrilateral]] add to $180^\circ$, and [[concyclicity-tests|the tests for concyclic points]] turn a figure into a circle full of equal angles.

[[power-of-a-point|The power of a point]] $PA \cdot PB$ is the same for every line through $P$, and equals the square of a tangent length. [[radical-axis|The radical axis]] of two circles is the line of points with equal power to both, the line through their common points.

[[ptolemys-theorem|Ptolemy's theorem]] relates the sides and diagonals of a cyclic quadrilateral, and [[brahmaguptas-formula|Brahmagupta's formula]] gives its area. [[incircle-tangent-lengths|The tangent lengths]] from the vertices to the incircle are $s - a$, $s - b$, $s - c$, and [[exradii|the exradii]] are $\tfrac{K}{s - a}$ and so on.

[[tangent-circles|Touching circles]] have their centers and the point of contact on one line; [[common-tangent-lengths|common tangents]] have lengths from a right triangle on the line of centers.`,
      strategies: [
        String.raw`Chase angles through arcs: mark each inscribed angle with half its arc.`,
        String.raw`Look for four points on a circle; prove it with opposite angles or equal angles on one side.`,
        String.raw`When two lines through a point meet a circle, use the power of the point.`,
        String.raw`For a cyclic quadrilateral's diagonal or area, use Ptolemy or Brahmagupta.`,
        String.raw`Mark the equal tangent lengths from each vertex; in a triangle they are $s - a$, $s - b$, $s - c$.`,
        String.raw`For touching circles, join the centers and draw radii to the points of tangency, then find the right triangles.`,
        String.raw`For a common tangent, drop a perpendicular from one center to the other's radius.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`In a cyclic quadrilateral $ABCD$, $\angle A = 70^\circ$. Find $\angle C$.`, answer: "110",
        solution: String.raw`Opposite angles of a cyclic quadrilateral add to $180^\circ$, since together they cut off the whole circle: $\angle C = 110^\circ$.` },
      { q: String.raw`A circle has radius $5$ and center $O$, and $OP = 13$. Find the length of a tangent from $P$ to the circle.`, answer: "12",
        solution: String.raw`The radius to the point of tangency $T$ is perpendicular to $PT$, so $PT^2 = OP^2 - OT^2 = 169 - 25 = 144$ and $PT = 12$.` },
      { q: String.raw`A regular pentagon has side $1$. Find the length of a diagonal.`, answer: "(1 + sqrt(5))/2",
        solution: String.raw`Any four vertices form a cyclic quadrilateral with three sides $1$ and diagonals $d$, and its fourth side is a diagonal $d$. Ptolemy's theorem gives $d \cdot d = 1 \cdot 1 + 1 \cdot d$, so $d^2 - d - 1 = 0$ and $d = \tfrac{1 + \sqrt5}{2}$.` },
      { q: String.raw`Triangle $ABC$ has sides $13$, $14$ and $15$. Find its inradius.`, answer: "4",
        solution: String.raw`The semiperimeter is $s = 21$, and by Heron the area is $\sqrt{21 \cdot 8 \cdot 7 \cdot 6} = 84$. The inradius is $\tfrac{84}{21} = 4$.` },
      { q: String.raw`Triangle $ABC$ has $AB = 13$, $BC = 14$ and $CA = 15$. Find the radius of the excircle opposite $A$, which touches $BC$.`, answer: "12",
        solution: String.raw`The exradius opposite $A$ is $\tfrac{K}{s - a}$ with $a = BC = 14$: $\tfrac{84}{21 - 14} = 12$.` },
      { q: String.raw`Two circles have radii $3$ and $5$, and their centers are $10$ apart. Find the length of a common internal tangent, the segment between the points of tangency.`, answer: "6",
        solution: String.raw`Slide the internal tangent parallel to itself until it passes through one center: it then forms a right triangle with the line of centers, whose legs are the tangent length and $3 + 5 = 8$. So the length is $\sqrt{10^2 - 8^2} = 6$.` },
      { q: String.raw`A cyclic quadrilateral has sides $2$, $3$, $4$ and $5$. Find its area.`, answer: "2sqrt(30)",
        solution: String.raw`By Brahmagupta's formula with $s = 7$, the area is $\sqrt{(7 - 2)(7 - 3)(7 - 4)(7 - 5)} = \sqrt{5 \cdot 4 \cdot 3 \cdot 2} = \sqrt{120} = 2\sqrt{30}$.` }
    ],
    problems: [
      "2002 AIME II, Problem 14",
      "2013 AIME II, Problem 8",
      "2008 AIME II, Problem 11"
    ]
  },
  challenge: {
    problems: [
      "2023 AIME II, Problem 9",
      "2022 AIME II, Problem 15",
      "2019 AIME I, Problem 15",
      "2016 AIME I, Problem 15",
      "2014 AIME I, Problem 15"
    ]
  }
};
