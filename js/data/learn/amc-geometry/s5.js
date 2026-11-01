// Learn, AMC Geometry, chapter S5: circles (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S5"] = {
  lessons: {
    "S5.1": {
      prereq: ["circle-basics", "pythagorean-theorem", "angle-chasing"],
      cards: [],
      body: String.raw`Chapter S2 measured a circle's circumference and area. This chapter studies the lines that meet a circle, chords, secants and tangents, the angles they make, and circles that touch each other or the sides of a triangle. Almost every fact comes from two observations: every radius has the same length, and a radius drawn to a point of tangency meets the tangent at a right angle.

An angle with its corner on a circle is half the central angle on the same arc, so an angle standing on an arc of $80^\circ$ measures $40^\circ$. A tangent from a point $13$ from the center of a circle of radius $5$ meets the radius at a right angle, so its length is $\sqrt{169 - 25} = 12$. And a chord $3$ from the center of a circle of radius $5$ is bisected by the perpendicular from the center, so it has length $2\sqrt{25 - 9} = 8$.

The lessons take these ideas in turn: chords and arcs (S5.2), inscribed angles and cyclic quadrilaterals (S5.3), tangents and angles outside the circle (S5.4), power of a point (S5.5), and incircles and touching circles (S5.6). The Summary (S5.7) collects the strategies.`,
      exercises: [
        { q: String.raw`An angle with its corner on a circle stands on an arc of $80^\circ$. What is the angle, in degrees?`, answer: "40",
          solution: String.raw`An inscribed angle is half the central angle on the same arc: $\tfrac{80^\circ}{2} = 40^\circ$.` },
        { q: String.raw`A point is $13$ from the center of a circle of radius $5$. How long is a tangent segment from the point to the circle?`, answer: "12",
          solution: String.raw`The radius to the point of tangency is perpendicular to the tangent, so the tangent, the radius and the segment to the center make a right triangle: $\sqrt{13^2 - 5^2} = 12$.` },
        { q: String.raw`A chord of a circle of radius $5$ is $3$ from the center. How long is the chord?`, answer: "8",
          solution: String.raw`The perpendicular from the center bisects the chord, making a right triangle with hypotenuse $5$ and leg $3$; half the chord is $4$, so the chord is $8$.` }
      ],
      problems: [
        "2014 AMC 8, Problem 15",
        "2005 AMC 8, Problem 23",
        "2017 AMC 8, Problem 22"
      ]
    },
    "S5.2": {
      prereq: ["circle-basics", "pythagorean-theorem", "special-right-triangles"],
      cards: ["chord-length", "equal-chords-arcs"],
      body: String.raw`How long is a chord $6$ from the center of a circle of radius $10$? How long is a chord that cuts off a $60^\circ$ arc in a circle of radius $7$? Two parallel chords of lengths $6$ and $8$ lie on opposite sides of the center of a circle of radius $5$: how far apart are they? A chord is fixed by its distance from the center, or by its arc.

[[chord-length|A chord's length]] comes from the right triangle made by the radius, the half-chord and the perpendicular from the center, which bisects the chord. A chord at distance $d$ from the center of a circle of radius $R$ has length $2\sqrt{R^2 - d^2}$: $2\sqrt{100 - 36} = 16$ for the first example. In terms of the central angle $\theta$ it is $2R\sin\tfrac\theta2$; a $60^\circ$ arc gives an equilateral triangle with the two radii, so the chord equals the radius, $7$. The step that unlocks most chord problems is to draw the radius to an end of the chord and the perpendicular from the center.

[[equal-chords-arcs|Equal chords]] go with equal arcs and with equal distances from the center, and each of the three conditions implies the others. So chords that are the same distance from the center are equal, and a longer chord is closer to the center. For the parallel chords, the chord $6$ is $\sqrt{25 - 9} = 4$ from the center and the chord $8$ is $\sqrt{25 - 16} = 3$ from it, so on opposite sides they are $7$ apart (on the same side, $1$). Equal chords also cut off equal angles at the center and at the circle, which is why a regular polygon's corners lie on a circle with equal arcs between them.

Draw the perpendicular from the center to a chord, find the half-chord by the Pythagorean theorem, and use equal distances for equal chords. The next lesson measures the angles in a circle.`,
      related: [
        { card: "common-chord-length", note: String.raw`the chord shared by two crossing circles (S5.5).` },
        { card: "circular-segment", note: String.raw`the area between a chord and its arc (S2.4).` },
        { card: "law-of-sines", note: String.raw`the chord $2R\sin\tfrac\theta2$ as a side opposite an inscribed angle (S9.2).` }
      ],
      exercises: [
        { q: String.raw`How long is a chord $6$ from the center of a circle of radius $10$?`, answer: "16",
          solution: String.raw`Half the chord is $\sqrt{10^2 - 6^2} = 8$, so the chord is $16$.` },
        { q: String.raw`A chord of a circle of radius $7$ cuts off an arc of $60^\circ$. How long is the chord?`, answer: "7",
          solution: String.raw`The chord and the two radii to its ends form a triangle with two sides $7$ and a $60^\circ$ angle between them, which is equilateral. So the chord is $7$; or $2 \cdot 7 \cdot \sin 30^\circ = 7$.` },
        { q: String.raw`Two parallel chords of lengths $6$ and $8$ lie on opposite sides of the center of a circle of radius $5$. How far apart are they?`, answer: "7",
          solution: String.raw`The chord $6$ is $\sqrt{25 - 9} = 4$ from the center and the chord $8$ is $\sqrt{25 - 16} = 3$ from it. On opposite sides of the center, they are $4 + 3 = 7$ apart.` }
      ],
      problems: [
        "2008 AMC 10B, Problem 10",
        "2025 AMC 10A, Problem 10",
        "2021 Spring AMC 10B, Problem 14",
        "2011 AMC 10B, Problem 17",
        "2014 AMC 10B, Problem 19",
        "2010 AMC 10B, Problem 19",
        "2021 Fall AMC 12A, Problem 11",
        "2021 Fall AMC 12B, Problem 10"
      ]
    },
    "S5.3": {
      prereq: ["circle-basics", "angle-chasing", "polygon-angle-sums"],
      cards: ["inscribed-angle-theorem", "thales-theorem", "cyclic-opposite-angles", "cyclic-equal-angles", "cyclic-quadrilateral"],
      body: String.raw`An angle with its corner on a circle stands on an arc of $110^\circ$: how big is it? A quadrilateral with its corners on a circle has one angle of $70^\circ$: what is the opposite angle? What is the radius of the circle through the corners of a $6$-$8$-$10$ triangle? One theorem relates angles at the circle to angles at the center, and the rest follow from it.

[[inscribed-angle-theorem|The inscribed angle theorem]] says that an angle with its corner on a circle is half the central angle on the same arc: $55^\circ$ on an arc of $110^\circ$. The proof draws the diameter through the corner and uses the two isosceles triangles it makes with the radii. Two consequences are used constantly: all inscribed angles on the same arc are equal, and an inscribed angle is measured by the arc it stands on, not by where its corner sits.

[[thales-theorem|Thales' theorem]] is the case of a semicircle: an angle on a diameter is a right angle, and conversely the hypotenuse of a right triangle is a diameter of the circle through its corners. So the $6$-$8$-$10$ triangle has circumradius $5$. In a figure, a diameter is a right angle waiting to be drawn, and a right angle is a diameter.

[[cyclic-quadrilateral|A cyclic quadrilateral]], one whose corners lie on a circle, has two key angle facts. [[cyclic-opposite-angles|Opposite angles add to $180^\circ$]], since they stand on arcs that make up the whole circle: an angle of $70^\circ$ faces one of $110^\circ$. The converse also holds, so a quadrilateral whose opposite angles add to $180^\circ$ has its corners on a circle. And [[cyclic-equal-angles|the angles that a side makes with the diagonals]] at the two opposite corners are equal, since they stand on the same arc: in $ABCD$, $\angle CAD = \angle CBD$. Spotting four points on a circle, often by two right angles on a common segment, is often the key step, because it brings all these equal angles into the figure.

Halve the arc for an inscribed angle, look for diameters and right angles together, and in a cyclic quadrilateral use supplementary opposite angles and equal angles on a common side. The next lesson takes the corner of the angle off the circle.`,
      related: [
        { card: "median-to-hypotenuse", note: String.raw`the circumcenter of a right triangle at the hypotenuse's midpoint (S4.2).` },
        { card: "ptolemys-theorem", note: String.raw`the lengths in a cyclic quadrilateral (S9.4).` },
        { card: "triangle-center-angles", note: String.raw`the angles at the circumcenter and incenter (S5.6).` }
      ],
      exercises: [
        { q: String.raw`An inscribed angle stands on an arc of $110^\circ$. How big is it, in degrees?`, answer: "55",
          solution: String.raw`It is half the arc: $\tfrac{110^\circ}{2} = 55^\circ$.` },
        { q: String.raw`A quadrilateral inscribed in a circle has an angle of $70^\circ$. What is the angle opposite it, in degrees?`, answer: "110",
          solution: String.raw`The two opposite angles stand on arcs that together make the whole circle, so they add to half of $360^\circ$: $180^\circ - 70^\circ = 110^\circ$.` },
        { q: String.raw`What is the radius of the circle through the corners of a triangle with sides $6$, $8$ and $10$?`, answer: "5",
          solution: String.raw`Since $6^2 + 8^2 = 10^2$, the triangle has a right angle, and by Thales' theorem its hypotenuse is a diameter. The radius is $5$.` },
        { q: String.raw`Quadrilateral $ABCD$ is inscribed in a circle, with $\angle ABD = 40^\circ$ and $\angle DBC = 30^\circ$. What is $\angle ADC$, in degrees?`, answer: "110",
          solution: String.raw`$\angle ABC = 40^\circ + 30^\circ = 70^\circ$, and the angle opposite it, $\angle ADC$, is $180^\circ - 70^\circ = 110^\circ$.` }
      ],
      problems: [
        "2016 AMC 8, Problem 23",
        "2010 AMC 10B, Problem 6",
        "2025 AMC 10B, Problem 5",
        "2019 AMC 10A, Problem 6",
        "2013 AMC 10B, Problem 7",
        "2020 AMC 10B, Problem 8",
        "2007 AMC 10A, Problem 14",
        "2014 AMC 10A, Problem 14",
        "2007 AMC 12A, Problem 8",
        "2017 AMC 12B, Problem 6",
        "2015 AMC 12B, Problem 13",
        "2005 AMC 12B, Problem 18"
      ]
    },
    "S5.4": {
      prereq: ["inscribed-angle-theorem", "pythagorean-theorem"],
      cards: ["tangent-facts", "two-tangents-angle", "angle-chord-secant", "tangent-chord-angle"],
      body: String.raw`Two tangents to a circle meet at a point $P$: how are they related, and what angle do they make? Two chords cross inside a circle: what angle do they make? A tangent and a chord meet at the point of tangency: what angle is between them? When the corner of an angle leaves the circle, the angle is still measured by arcs.

[[tangent-facts|A tangent]] is perpendicular to the radius at its point of contact, and the two tangents from an outside point $P$ have equal lengths, $\sqrt{OP^2 - r^2}$: from a point $10$ from the center of a circle of radius $6$, each is $8$. The equal tangents and the radii make a kite, symmetric about the line $OP$. Drawing the radius to every point of tangency is the first step in nearly every tangent problem, because it creates right angles.

[[two-tangents-angle|The angle between two tangents]] is supplementary to the central angle between the points of contact, since the kite has two right angles: if $\angle AOB = 130^\circ$, then $\angle APB = 50^\circ$. In terms of arcs it is half the difference of the far and near arcs, $\tfrac12(230^\circ - 130^\circ) = 50^\circ$.

[[angle-chord-secant|Angles made by chords and secants]] follow the same pattern. Two chords crossing inside the circle make an angle equal to half the sum of the arcs it and its vertical angle cut off: arcs of $70^\circ$ and $50^\circ$ give $60^\circ$. Two secants meeting outside make half the difference of the far and near arcs: $120^\circ$ and $40^\circ$ give $40^\circ$. Each comes from an exterior angle of a triangle whose other angles are inscribed. [[tangent-chord-angle|The angle between a tangent and a chord]] at the point of contact is half the arc the chord cuts off, the limit of an inscribed angle as one side turns into the tangent: a chord on an arc of $100^\circ$ makes $50^\circ$ with the tangent, equal to any inscribed angle on that arc.

Draw radii to the points of tangency, use equal tangents, and measure every angle at, inside or outside the circle by its arcs. The next lesson measures lengths along lines through a point.`,
      related: [
        { card: "incircle-tangent-lengths", note: String.raw`equal tangents from the corners of a triangle to its incircle (S5.6).` },
        { card: "power-of-a-point", note: String.raw`the tangent length as the power of the point (S5.5).` },
        { card: "pitots-theorem", note: String.raw`equal tangents in a quadrilateral around a circle (S9.4).` }
      ],
      exercises: [
        { q: String.raw`Tangents from a point $P$ touch a circle with center $O$ at $A$ and $B$, and $\angle AOB = 130^\circ$. What is $\angle APB$, in degrees?`, answer: "50",
          solution: String.raw`The quadrilateral $OAPB$ has right angles at $A$ and $B$, so $\angle APB = 360^\circ - 90^\circ - 90^\circ - 130^\circ = 50^\circ$.` },
        { q: String.raw`Two chords cross inside a circle. The arcs cut off by the angle and by its vertical angle are $70^\circ$ and $50^\circ$. What is the angle, in degrees?`, answer: "60",
          solution: String.raw`An angle between crossing chords is half the sum of the two arcs: $\tfrac12(70^\circ + 50^\circ) = 60^\circ$.` },
        { q: String.raw`Two secants from an outside point cut off arcs of $120^\circ$ (far) and $40^\circ$ (near). What angle do they make, in degrees?`, answer: "40",
          solution: String.raw`An angle with its corner outside is half the difference of the far and near arcs: $\tfrac12(120^\circ - 40^\circ) = 40^\circ$.` },
        { q: String.raw`A chord $TA$ cuts off an arc of $100^\circ$, and a tangent touches the circle at $T$. What is the angle between the tangent and the chord, on the side of that arc, in degrees?`, answer: "50",
          solution: String.raw`The angle between a tangent and a chord is half the arc it cuts off: $50^\circ$.` },
        { q: String.raw`A point is $10$ from the center of a circle of radius $6$. How long is each tangent from the point?`, answer: "8",
          solution: String.raw`The tangent, the radius and the segment to the center form a right triangle: $\sqrt{100 - 36} = 8$.` }
      ],
      problems: [
        "2010 AMC 8, Problem 19",
        "2011 AMC 12B, Problem 6",
        "2004 AMC 10B, Problem 12",
        "2006 AMC 12A, Problem 13",
        "2012 AMC 10A, Problem 11",
        "2009 AMC 10B, Problem 16",
        "2004 AMC 10A, Problem 22",
        "2006 AMC 10A, Problem 23"
      ]
    },
    "S5.5": {
      prereq: ["triangle-similarity", "tangent-facts", "chord-length"],
      cards: ["power-of-a-point", "common-chord-length", "radical-axis"],
      body: String.raw`Two chords cross at $P$, with pieces $4$ and $6$ on one and $3$ on the other: how long is the fourth piece? A secant from $P$ meets a circle at distances $4$ and $9$: how long is a tangent from $P$? Two circles cross: how long is their common chord, and on what line does it lie? Lines through a point meet a circle in pieces whose product does not depend on the line.

[[power-of-a-point|The power of a point]] says that for any line through $P$ meeting the circle at $A$ and $B$, the product $PA \cdot PB$ is the same; it equals $OP^2 - r^2$, the power of $P$. For two chords crossing inside, $PA \cdot PB = PC \cdot PD$, so $4 \cdot 6 = 3 \cdot PD$ and $PD = 8$. For a point outside, a secant and a tangent give $PA \cdot PB = PT^2$, so $4 \cdot 9 = PT^2$ and the tangent is $6$. The proof is a pair of similar triangles, with angles equal because they stand on the same arcs.

[[common-chord-length|The common chord]] of two crossing circles is perpendicular to the line of centers and bisected by it. With radii $R$ and $r$ and centers $d$ apart, the chord meets the line of centers at distance $d_1 = \tfrac{d^2 + R^2 - r^2}{2d}$ from the first center, and its half-length is $\sqrt{R^2 - d_1^2}$. Radii $10$ and $17$ with centers $21$ apart give $d_1 = \tfrac{441 + 100 - 289}{42} = 6$ and a chord of $2\sqrt{100 - 36} = 16$; the half-chord and the two pieces of the center line make two right triangles that share the leg $8$, $6$-$8$-$10$ and $15$-$8$-$17$.

[[radical-axis|The radical axis]] of two circles is the set of points with equal power with respect to both, and it is a line perpendicular to the line of centers; for crossing circles it is the line of the common chord. In coordinates, subtracting the two circles' equations gives it: $x^2 + y^2 = 25$ and $(x - 6)^2 + y^2 = 13$ give $-25 = -12x + 23$, the line $x = 4$, through the common points $(4, \pm 3)$. Three circles have three radical axes meeting at one point.

Multiply the pieces along each line through a point, drop the line of centers onto a common chord, and subtract circle equations for the radical axis. The next lesson turns to circles inside triangles and circles that touch.`,
      related: [
        { card: "chord-length", note: String.raw`a chord's length from its distance to the center (S5.2).` },
        { card: "circle-equation", note: String.raw`the equations whose difference is the radical axis (S7.3).` },
        { card: "shared-leg-pythagoras", note: String.raw`the two right triangles sharing the half-chord (S1.5).` }
      ],
      exercises: [
        { q: String.raw`Two chords of a circle cross at $P$. One is cut into pieces $PA = 4$ and $PB = 6$, and on the other $PC = 3$. How long is $PD$?`, answer: "8",
          solution: String.raw`By the power of the point $P$, $PA \cdot PB = PC \cdot PD$: $24 = 3 \cdot PD$, so $PD = 8$.` },
        { q: String.raw`A line through an outside point $P$ meets a circle at $A$ and $B$, with $PA = 4$ and $PB = 9$. How long is a tangent from $P$ to the circle?`, answer: "6",
          solution: String.raw`The power of $P$ is $PA \cdot PB = 36 = PT^2$, so the tangent is $6$.` },
        { q: String.raw`Two circles of radii $10$ and $17$ have centers $21$ apart. How long is their common chord?`, answer: "16",
          solution: String.raw`Let the chord meet the line of centers $d_1$ from the first center. The half-chord $h$ satisfies $h^2 = 100 - d_1^2 = 289 - (21 - d_1)^2$, so $100 = 289 - 441 + 42d_1$ and $d_1 = 6$. Then $h = 8$ and the chord is $16$.` },
        { q: String.raw`The circles $x^2 + y^2 = 25$ and $(x - 6)^2 + y^2 = 13$ meet at two points, which lie on a vertical line $x = c$. What is $c$?`, answer: "4",
          solution: String.raw`At a common point both equations hold, so subtracting them: $x^2 + y^2 - 25 = (x - 6)^2 + y^2 - 13$, that is, $-25 = -12x + 23$, so $x = 4$. Then $y^2 = 9$: the points are $(4, 3)$ and $(4, -3)$, and indeed $(4 - 6)^2 + 9 = 13$.` }
      ],
      problems: [
        "2013 AMC 10A, Problem 23",
        "2020 AMC 12B, Problem 10",
        "2020 AMC 12B, Problem 12",
        "2017 AMC 12B, Problem 9",
        "2023 AMC 12B, Problem 10",
        "2001 AIME II, Problem 6"
      ]
    },
    "S5.6": {
      prereq: ["tangent-facts", "inscribed-angle-theorem", "special-right-triangles"],
      cards: ["incircle-tangent-lengths", "tangent-circles", "triangle-of-centers", "tangent-circle-packing", "circle-in-angle", "rolling-without-slipping", "triangle-center-angles"],
      body: String.raw`The incircle of a $13$-$14$-$15$ triangle touches its sides: where? Circles of radii $1$, $2$ and $3$ touch each other: what triangle do their centers make? A coin rolls around another coin of the same size: how many times does it turn? Circles that touch are handled by their centers.

[[incircle-tangent-lengths|The incircle]] of a triangle touches each side, and the two tangents from a corner are equal (S5.4). So the corner opposite side $a$ is $s - a$ from both points of contact on its sides, where $s$ is the semiperimeter. In the $13$-$14$-$15$ triangle, $s = 21$, and the corner between the sides $13$ and $15$ is $21 - 14 = 7$ from its two points of contact.

[[tangent-circles|Two touching circles]] have their point of contact on the line of centers, and the centers are $R + r$ apart when the circles touch from outside and $|R - r|$ apart when one is inside the other. [[triangle-of-centers|Joining the centers]] of touching circles turns a picture of circles into a polygon with known sides, and a circle touching a line has its center at distance $r$ from it. Circles of radii $1$, $2$, $3$ touching from outside have centers $3$, $4$, $5$ apart, a right triangle of area $6$. [[tangent-circle-packing|Several touching circles]], in a row, a ring or a box, are always solved this way: draw all the centers, join the touching pairs, and drop perpendiculars to the lines.

[[circle-in-angle|A circle inscribed in an angle]] has its center on the angle's bisector, at distance $d = \tfrac{r}{\sin(\theta/2)}$ from the corner: a circle of radius $2$ in a $60^\circ$ angle has its center $4$ from the corner. A row of circles in an angle is a sequence of similar figures. [[rolling-without-slipping|A rolling circle]] turns once for each length $2\pi r$ that its center travels, so a coin rolling around an equal coin, whose center travels a circle of radius $2r$, turns twice, not once. [[triangle-center-angles|The angles at the centers]] of a triangle have formulas: at the incenter $I$, $\angle BIC = 90^\circ + \tfrac A2$, so $120^\circ$ when $A = 60^\circ$; at the circumcenter, $\angle BOC = 2A$.

Use equal tangents from each corner, join the centers of touching circles, put a circle in an angle on the bisector, and follow the center of a rolling circle. The Summary follows.`,
      related: [
        { card: "inradius-area", note: String.raw`the incircle's radius from the area, $A = rs$ (S4.5).` },
        { card: "descartes-circle-theorem", note: String.raw`four mutually touching circles (S9.5).` },
        { card: "common-tangent-lengths", note: String.raw`the tangent lines that two circles share (S9.5).` }
      ],
      exercises: [
        { q: String.raw`A triangle has sides $13$, $14$ and $15$. How far is the corner between the sides $13$ and $15$ from the points where the incircle touches those sides?`, answer: "7",
          solution: String.raw`The semiperimeter is $21$, and the tangent length from a corner is $s$ minus the opposite side: $21 - 14 = 7$.` },
        { q: String.raw`Three circles of radii $1$, $2$ and $3$ each touch the other two from outside. What is the area of the triangle formed by their centers?`, answer: "6",
          solution: String.raw`Touching from outside, the centers are $1 + 2 = 3$, $1 + 3 = 4$ and $2 + 3 = 5$ apart. Since $3^2 + 4^2 = 5^2$, it is a right triangle with area $\tfrac12 \cdot 3 \cdot 4 = 6$.` },
        { q: String.raw`A circle of radius $2$ is tangent to both sides of a $60^\circ$ angle. How far is its center from the corner of the angle?`, answer: "4",
          solution: String.raw`The center lies on the bisector, which makes $30^\circ$ with each side, and is $2$ from each side. In the right triangle with the perpendicular to a side, $\sin 30^\circ = \tfrac2d$, so $d = 4$.` },
        { q: String.raw`A coin rolls without slipping once around the outside of another coin of the same size. How many full turns does it make?`, answer: "2",
          solution: String.raw`The rolling coin's center travels a circle of radius $2r$, of length $4\pi r$, and the coin turns once for every $2\pi r$ its center moves. So it turns $2$ times.` },
        { q: String.raw`In triangle $ABC$, $\angle A = 60^\circ$, and $I$ is the incenter. What is $\angle BIC$, in degrees?`, answer: "120",
          solution: String.raw`$\angle IBC + \angle ICB = \tfrac12(B + C) = \tfrac12(180^\circ - 60^\circ) = 60^\circ$, so $\angle BIC = 120^\circ$, which is $90^\circ + \tfrac{60^\circ}{2}$.` }
      ],
      problems: [
        "2002 AMC 10A, Problem 5",
        "2013 AMC 8, Problem 25",
        "1996 AJHSME, Problem 24",
        "2004 AMC 10A, Problem 23",
        "2007 AMC 10A, Problem 15",
        "2008 AMC 10A, Problem 16",
        "2015 AMC 10A, Problem 14",
        "2016 AMC 10A, Problem 15",
        "2010 AMC 10B, Problem 20",
        "2019 AMC 10A, Problem 16",
        "2009 AMC 10A, Problem 21",
        "2014 AMC 10B, Problem 22",
        "2011 AMC 12B, Problem 22"
      ]
    },
    "S5.7": {
      prereq: ["chord-length", "equal-chords-arcs", "inscribed-angle-theorem", "thales-theorem", "cyclic-opposite-angles", "cyclic-equal-angles", "cyclic-quadrilateral", "tangent-facts", "two-tangents-angle", "angle-chord-secant", "tangent-chord-angle", "power-of-a-point", "common-chord-length", "radical-axis", "incircle-tangent-lengths", "tangent-circles", "triangle-of-centers", "tangent-circle-packing", "circle-in-angle", "rolling-without-slipping", "triangle-center-angles"],
      cards: [],
      body: String.raw`[[chord-length|A chord]] is $2\sqrt{R^2 - d^2}$, and [[equal-chords-arcs|equal chords]] have equal arcs and distances. [[inscribed-angle-theorem|An inscribed angle]] is half its arc, [[thales-theorem|a right angle stands on a diameter]], and [[cyclic-quadrilateral|a cyclic quadrilateral]] has [[cyclic-opposite-angles|supplementary opposite angles]] and [[cyclic-equal-angles|equal angles on a side]].

[[tangent-facts|A tangent]] is perpendicular to the radius, with equal tangents from a point; [[two-tangents-angle|two tangents]], [[angle-chord-secant|chords and secants]] and [[tangent-chord-angle|a tangent and a chord]] make angles measured by arcs.

[[power-of-a-point|The power of a point]] makes $PA \cdot PB$ constant; [[common-chord-length|a common chord]] and [[radical-axis|the radical axis]] come from two circles.

[[incircle-tangent-lengths|Incircle tangents]] are $s - a$; [[tangent-circles|touching circles]] have centers $R \pm r$ apart, joined into [[triangle-of-centers|polygons]] and [[tangent-circle-packing|packings]]; [[circle-in-angle|a circle in an angle]] sits on the bisector; [[rolling-without-slipping|a rolling circle]] turns as its center moves; and [[triangle-center-angles|the centers]] see the sides at known angles.`,
      strategies: [
        String.raw`Draw the radius to every point of tangency and the perpendicular from the center to every chord.`,
        String.raw`Measure every angle at, inside or outside a circle by its arcs.`,
        String.raw`Look for a diameter wherever there is a right angle, and for four points on a circle wherever opposite angles are supplementary.`,
        String.raw`Multiply the pieces of each line through a point.`,
        String.raw`Use equal tangents from each corner of a triangle.`,
        String.raw`For touching circles, draw and join the centers.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A point is $17$ from the center of a circle of radius $8$. How long is a tangent from the point?`, answer: "15",
        solution: String.raw`The tangent is perpendicular to the radius at the point of contact: $\sqrt{17^2 - 8^2} = \sqrt{225} = 15$.` },
      { q: String.raw`An inscribed angle measures $25^\circ$. What is the central angle on the same arc, in degrees?`, answer: "50",
        solution: String.raw`The central angle is twice the inscribed angle: $50^\circ$.` },
      { q: String.raw`A chord of length $24$ lies in a circle of radius $13$. How far is it from the center?`, answer: "5",
        solution: String.raw`The perpendicular from the center bisects the chord, so $d = \sqrt{13^2 - 12^2} = 5$.` }
    ],
    problems: [
      "2018 AMC 10A, Problem 15",
      "2006 AMC 12B, Problem 15",
      "2005 AMC 12A, Problem 16",
      "2021 Fall AMC 10A, Problem 15",
      "2017 AMC 10B, Problem 22",
      "2022 AMC 10B, Problem 20",
      "2020 AMC 10A, Problem 20",
      "2011 AMC 12A, Problem 17"
    ]
  },
  challenge: {
    problems: [
      "2019 AMC 10B, Problem 23",
      "2023 AMC 10A, Problem 22",
      "2024 AMC 10B, Problem 21",
      "2018 AMC 12A, Problem 20",
      "1995 AIME, Problem 4"
    ]
  }
};
