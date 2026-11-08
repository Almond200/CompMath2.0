// Learn, AMC Geometry, chapter S2: quadrilaterals, circles and coordinates, the basics (CONVENTIONS §14). Part: Foundations.
// Connected polygon, quadrilateral, circle and coordinate geometry, with computed constructions.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S2"] = {
  lessons: {
    "S2.1": {
      prereq: ["parallel-exterior-angles", "triangle-area-standard", "pythagorean-theorem"],
      cards: [],
      body: String.raw`Cutting a figure into triangles connects many geometric measurements. Diagonals explain polygon angle sums, perpendicular heights explain quadrilateral areas, and coordinate differences form right triangles for distance calculations. Circles introduce curved boundaries, but sectors and triangles still organize many of their area problems.

A convex hexagon, for example, splits into four triangles by diagonals from a vertex, giving angle sum $720^\circ$. A circle of radius three has circumference $6\pi$ and area $9\pi$; these use different powers of the length scale. On a grid, the horizontal and vertical differences from $(1,2)$ to $(4,6)$ are three and four, so Pythagoras gives distance five.

The same numbers can mean different things in different models. A sloping side is not automatically a height, a diameter is twice a radius, and an equal-angle polygon need not have equal sides. The chapter develops the constructions behind the formulas so that these distinctions remain visible when polygons, circles and coordinates appear together.`,
      exercises: [
        { q: String.raw`What is the sum of the interior angles of a hexagon, in degrees?`, answer: "720",
          solution: String.raw`For a convex hexagon, the three diagonals from a vertex to its nonneighbors split the interior into four triangles. Their angles together make up all six interior angles, so the sum is $4\cdot180^\circ=720^\circ$. A simple concave hexagon has the same sum from an internal triangulation, although an arbitrary vertex fan may leave its interior.` },
        { q: String.raw`What is the area of a circle of radius $3$?`, answer: "9pi",
          solution: String.raw`The given length is the radius, so the disk area is $\pi r^2=\pi\cdot3^2=9\pi$. Circumference would instead be $2\pi r=6\pi$, a length rather than an area.` },
        { q: String.raw`How far apart are the points $(1, 2)$ and $(4, 6)$?`, answer: "5",
          solution: String.raw`The points differ by three horizontally and four vertically. Those perpendicular displacements form the legs of a right triangle whose hypotenuse joins the points. Thus the distance is $\sqrt{(4-1)^2+(6-2)^2}=\sqrt{9+16}=5$.` }
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
      body: String.raw`A simple polygon is a closed sequence of straight sides whose boundary does not cross itself. Its interior is the enclosed region. A convex polygon has every interior angle below $180^\circ$ and contains the segment joining any two of its points. These hypotheses matter when drawing diagonals: in a convex polygon, every diagonal stays inside, while a diagonal of a concave polygon can pass outside the region.

In a convex $n$-gon, join one vertex to every nonneighboring vertex. The resulting $n-2$ triangles have disjoint interiors and fill the polygon. Their angles combine to give the polygon's interior angles, so the sum is $180^\circ(n-2)$. A simple concave polygon has the same sum because it too can be triangulated into $n-2$ triangles, although the triangulation need not be a fan from any chosen corner. The [[polygon-angle-sums|polygon angle sums]] apply to these simple polygons, not to a self-crossing star interpreted by the same interior-angle convention.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 350" role="img" aria-label="A convex hexagon is partitioned into four triangles" style="width:100%;max-width:520px;height:auto"><title>A convex hexagon is partitioned into four triangles</title><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M250 55L349.593 112.5V227.5L250 285L150.407 227.5V112.5Z"/><path d="M250 55L349.593 227.5M250 55V285M250 55L150.407 227.5" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="315" y="139">1</text><text x="283" y="197">2</text><text x="217" y="197">3</text><text x="185" y="139">4</text><text x="260" y="331">Four triangle angle sums give 4 · 180° = 720°.</text></g></svg>

Another count follows a walk around a convex polygon. At each vertex, turn from the previous side's forward direction to the next side. The turn is the exterior angle $180^\circ-\text{interior angle}$. After one circuit the direction has made one full turn, so these exterior angles sum to $360^\circ$. For a concave polygon, turns at inward vertices are negative; the signed turns sum to $360^\circ$ on a counterclockwise traversal. Adding all unsigned corner angles would lose that sign information.

In a regular polygon, both sides and angles are equal, and every exterior angle is $360^\circ/n$. Thus an octagon has exterior angle $45^\circ$ and interior angle $135^\circ$. Conversely, interior angle $156^\circ$ gives exterior angle $24^\circ$ and $n=360/24=15$. A proposed angle does not automatically describe a regular polygon: $360/(180-\alpha)$ must be an integer at least three. This also prevents confusing an interior angle with its exterior supplement.

The vertices give a separate combinatorial count of diagonals. Each of $n$ vertices can join $n-3$ nonneighbors, but every diagonal has two endpoints, so the count is $n(n-3)/2$. A decagon therefore has $10\cdot7/2=35$ diagonals. This counts all diagonals; the fan used in the angle proof has only $n-3$ of them and divides the polygon into $n-2$ triangles.

Equal angles alone give less information than regularity. A rectangle has four equal angles whatever its length and width. In a convex [[equiangular-polygon|equiangular hexagon]], all six interior angles are $120^\circ$, so consecutive side directions turn by $60^\circ$. Extend alternate side lines to form an equilateral triangle. The other three sides of the hexagon cut off equilateral triangles at its corners: their angles are $60^\circ$ because the original exterior turns were $60^\circ$.

Let the hexagon's successive lengths be $a_1,\ldots,a_6$. Each large equilateral-triangle side is an original alternate side plus two cutoff lengths. Its three equal side lengths therefore give

$$a_1+a_2+a_6=a_2+a_3+a_4=a_4+a_5+a_6.$$

With sides $3,1,4,2,a,b$, these become $3+1+b=1+4+2=2+a+b$. Hence $b=3$, $a=2$ and the perimeter is fifteen. The completed triangle has side seven, as the diagram shows. Equal angles supplied directions and a closure condition, rather than making the six side lengths equal.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 365" role="img" aria-label="Completing an equiangular hexagon gives three equal length sums" style="width:100%;max-width:520px;height:auto"><title>Completing an equiangular hexagon gives three equal length sums</title><path d="M110 300L390 300L250 57.513Z" fill="none" stroke="currentColor" stroke-width="1.1" stroke-dasharray="5 4" opacity=".65"/><path d="M230 300H350L370 265.359L290 126.795H210L170 196.077Z" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="1.5"/><g fill="currentColor" font-size="17" text-anchor="middle"><text x="290" y="282">3</text><text x="342" y="269">1</text><text x="310" y="201">4</text><text x="250" y="151">2</text><text x="209" y="174">a</text><text x="220" y="238">b</text><text x="260" y="338">Each completed side has length 7: a = 2, b = 3.</text></g></svg>

A completion must match the actual directions without adding an unsupported equality. For an equiangular octagon, the turns are $45^\circ$. Extending four alternating sides gives a rectangle, which need not be a square. For example, cut one-by-one isosceles right triangles from the four corners of an eight-by-six rectangle. The remaining octagon has eight $135^\circ$ angles, yet the containing rectangle is still eight by six. Its horizontal sides have length six, its vertical sides four and its four diagonal sides $\sqrt2$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 355" role="img" aria-label="An equiangular octagon need not complete to a square" style="width:100%;max-width:520px;height:auto"><title>An equiangular octagon need not complete to a square</title><rect x="120" y="70" width="280" height="210" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" opacity=".55"/><path d="M120 245L155 280H365L400 245V105L365 70H155L120 105Z" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="1.5"/><g fill="currentColor" font-size="16" text-anchor="middle"><text x="260" y="310">8</text><text x="101" y="180">6</text><text x="185" y="98">135°</text><text x="260" y="344">Equal angles do not force a square completion.</text></g></svg>

Completing a figure is useful because straight lines and familiar angles expose equations. The resulting outer shape must be proved from those angles; equal side lengths require their own reason.`,
      related: [
        { card: "regular-polygon-area", note: String.raw`the area of a regular polygon from its side (S6.2).` },
        { card: "handshakes-diagonals", note: String.raw`the number of diagonals as a count of pairs of corners (S6.4).` },
        { card: "equilateral-triangle-facts", note: String.raw`the triangles that complete an equiangular hexagon (S4.4).` }
      ],
      exercises: [
        { q: String.raw`What is each interior angle of a regular octagon, in degrees?`, answer: "135",
          solution: String.raw`A regular octagon has eight equal exterior turns totaling $360^\circ$, so each turn is $45^\circ$. Its adjacent interior angle is $180^\circ-45^\circ=135^\circ$. Equivalently, the interior sum $180^\circ(8-2)=1080^\circ$ divided among eight equal angles gives the same result.` },
        { q: String.raw`Each interior angle of a regular polygon is $156^\circ$. How many sides does it have?`, answer: "15",
          solution: String.raw`The exterior turn is $180^\circ-156^\circ=24^\circ$. Equal turns must complete a full $360^\circ$ circuit, so the number of sides is $360/24=15$. This is an integer at least three, confirming that the proposed regular polygon is possible.` },
        { q: String.raw`How many diagonals does a decagon have?`, answer: "35",
          solution: String.raw`Each of ten vertices has seven nonneighbors: exclude that vertex and its two adjacent vertices. Joining every such pair counts $10\cdot7=70$ endpoint descriptions. Every diagonal has exactly two endpoints, so dividing by two gives thirty-five distinct diagonals. The side edges have already been excluded.` },
        { q: String.raw`An equiangular hexagon has sides $3, 1, 4, 2, a, b$ in order. What is its perimeter?`, answer: "15",
          solution: String.raw`Let the side lengths in order be $a_1=3,a_2=1,a_3=4,a_4=2,a_5=a,a_6=b$. Extending alternate sides gives an equilateral triangle. Its three side lengths are $a_1+a_2+a_6$, $a_2+a_3+a_4$ and $a_4+a_5+a_6$, because the cutoff corner triangles are also equilateral. Thus $3+1+b=1+4+2=2+a+b$. The middle expression is seven, so $b=3$ and then $a=2$. Adding the six original sides gives $3+1+4+2+2+3=15$.` }
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
      body: String.raw`A quadrilateral's area can often be found by choosing a diagonal or a perpendicular height. The names describe different constraints: a parallelogram has opposite sides parallel, a rectangle also has right angles, and a rhombus has four equal sides. A square satisfies both latter conditions. These distinctions decide whether a sloping side, a diagonal or a base is the useful measurement.

A diagonal of a parallelogram splits it into two congruent triangles. Each has the same base length $b$ and perpendicular height $h$, so their combined area is $bh$. Equivalently, a corner triangle can be translated from one end to the other to complete a rectangle. In the [[parallelogram-area|base-times-height formula]], height is the distance between parallel base lines, not a side unless that side is perpendicular to them. With sides ten and six enclosing $30^\circ$, the perpendicular height over the side ten is three by the special-right-triangle ratio, giving area thirty.

If an included angle is denoted $\theta$, the height can also be written $a\sin\theta$, giving area $ab\sin\theta$. Here sine records perpendicular height divided by the sloping length; for an obtuse included angle, use its acute supplement, which has the same sine. The trigonometric formulation is developed further in S4.6. A base-height construction remains sufficient for the $30^\circ$, $45^\circ$ and $60^\circ$ examples already available from S1.

A trapezoid has two parallel bases, possibly with very different lengths. Rotate a congruent copy through a half-turn about the midpoint of a leg and join along that leg. The two copies form a parallelogram with base $b_1+b_2$ and the same height $h$. Dividing its area equally between the copies proves the [[trapezoid-parallelogram-areas|trapezoid formula]] $K=(b_1+b_2)h/2$. Bases five and eleven at distance four give area thirty-two. Their sum, rather than their difference or either leg, is the base of the doubled figure.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 335" role="img" aria-label="Two copies of a trapezoid form a parallelogram" style="width:100%;max-width:520px;height:auto"><title>Two copies of a trapezoid form a parallelogram</title><path d="M60 230H269L212 154H117Z" fill="currentColor" fill-opacity=".06" stroke="currentColor" stroke-width="1.5"/><path d="M269 230H364L421 154H212Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="1.5"/><g fill="none" stroke="currentColor" stroke-width="1"><path d="M45 154V230M41 154H49M41 230H49"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="164" y="139">5</text><text x="317" y="139">11</text><text x="164" y="253">11</text><text x="317" y="253">5</text><text x="23" y="199">4</text><text x="260" y="293">Two copies: base 5 + 11 = 16, height 4.</text><text x="260" y="321">One copy has area 16 · 4 / 2 = 32.</text></g></svg>

A rhombus provides a different useful decomposition. A parallelogram's diagonals bisect each other; this follows, for example, by comparing the alternate-angle triangles formed at their intersection. In a rhombus, triangles on either side of a diagonal have three matching sides, so that diagonal also bisects the vertex angles. The half-diagonals then meet at right angles: triangles with a common half-diagonal and the equal rhombus sides have equal adjacent intersection angles. Thus each side of a rhombus is the hypotenuse of a right triangle whose legs are half the diagonals.

For diagonals ten and twenty-four, those legs are five and twelve, giving rhombus side thirteen. The four right triangles have total area $4\cdot\tfrac12\cdot5\cdot12=120$, or half the full diagonal product. A convex kite, whose equal adjacent-side pairs make one diagonal the perpendicular bisector of the other, has the same area formula even though both diagonals need not be bisected.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 290" role="img" aria-label="Rhombus diagonals bisect at right angles" style="width:100%;max-width:520px;height:auto"><title>Rhombus diagonals bisect at right angles</title><path d="M250 65L430 140L250 215L70 140Z" fill="none" stroke="currentColor" stroke-width="1.5"/><g fill="none" stroke="currentColor" stroke-width="1.1"><path d="M70 140H430M250 65V215" stroke-dasharray="5 4"/><path d="M250 130H260V140"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="150" y="164">12</text><text x="340" y="164">12</text><text x="270" y="109">5</text><text x="270" y="190">5</text><text x="350" y="79">13</text><text x="260" y="268">Diagonals 24 and 10 give area 120.</text></g></svg>

The diagonal product also has a more general explanation. In a convex quadrilateral let the diagonals meet at $O$, with $AO=x$, $CO=z$, $BO=y$ and $DO=w$. If their crossing angle is $\theta$, the four triangle areas use either $\theta$ or its supplement, which have the same sine. Adding gives

$$K=\frac12\sin\theta\,(xy+yz+zw+wx)=\frac12(x+z)(y+w)\sin\theta=\frac12d_1d_2\sin\theta.$$

This is the [[quadrilateral-diagonal-area|diagonal area formula]]. For diagonals eight and ten crossing at $30^\circ$, it gives twenty. With fixed diagonals the area is at most half their product, attained when they are perpendicular. For a simple concave quadrilateral, signed triangle areas give the same absolute diagonal cross-product expression, but the diagonals may meet only after extension. The four-positive-triangle proof above assumes convexity; a self-crossing boundary needs a separate definition of which regions are counted.

Coordinates express the parallelogram's symmetry efficiently. If $A,B,C,D$ are named consecutively, diagonals $AC$ and $BD$ have the same midpoint, so $(A+C)/2=(B+D)/2$. Solving gives the [[parallelogram-vertices|missing vertex]] $D=A+C-B$, with addition performed coordinate by coordinate. For $A=(1,1)$, $B=(4,2)$, $C=(6,5)$, this gives $D=(3,4)$. The vectors from $A$ to $B$ and from $D$ to $C$ are both $(3,1)$, checking the corresponding sides.

The order of the vertices is part of that statement. If only three noncollinear points are given without their cyclic order, there are three possible fourth vertices, according to which given point is opposite the missing one. In the example they are $(3,4)$, $(-1,-2)$ and $(9,6)$. Collinear inputs produce a flattened configuration, not a nondegenerate parallelogram.`,
      related: [
        { card: "trig-area", note: String.raw`the triangle version, $\tfrac12 ab\sin C$ (S4.6).` },
        { card: "trapezoid-special-segments", note: String.raw`the midline and other segments of a trapezoid (S6.3).` },
        { card: "shoelace-formula", note: String.raw`the area of a quadrilateral from the coordinates of its corners (S7.4).` }
      ],
      exercises: [
        { q: String.raw`A parallelogram has sides $6$ and $10$ meeting at an angle of $30^\circ$. What is its area?`, answer: "30",
          solution: String.raw`Use the length-ten side as base. The perpendicular height is the short leg of a $30^\circ$-$60^\circ$-$90^\circ$ triangle whose hypotenuse is six, so the height is three. The parallelogram area is therefore $10\cdot3=30$. Multiplying the two side lengths directly would incorrectly treat the included angle as a right angle.` },
        { q: String.raw`A trapezoid has parallel sides $5$ and $11$ that are $4$ apart. What is its area?`, answer: "32",
          solution: String.raw`Two congruent copies joined along a leg form a parallelogram of base $5+11=16$ and height four. Its area is sixty-four, so one trapezoid has half that area, thirty-two. This is the same as multiplying the average base length eight by height four.` },
        { q: String.raw`A rhombus has diagonals $10$ and $24$. What is the length of its side?`, answer: "13",
          solution: String.raw`Rhombus diagonals bisect each other at right angles. A side is therefore the hypotenuse of a right triangle whose legs are half the diagonals, five and twelve. Its length is $\sqrt{5^2+12^2}=13$. The full diagonals are not the legs of this right triangle.` },
        { q: String.raw`A parallelogram has consecutive vertices $A,B,C,D$, with $A = (1, 1)$, $B = (4, 2)$ and $C = (6, 5)$. What is the sum of the coordinates of $D$?`, answer: "7",
          solution: String.raw`In cyclic order $ABCD$, vertices $A,C$ are opposite and $B,D$ are opposite. Their diagonal midpoints agree, so $D=A+C-B=(1+6-4,1+5-2)=(3,4)$. The requested coordinate sum is $3+4=7$. As a check, $B-A=(3,1)=C-D$ and $D-A=(2,3)=C-B$, giving both pairs of corresponding parallel sides.` },
        { q: String.raw`A convex quadrilateral has diagonals of lengths $8$ and $10$ that cross at an angle of $30^\circ$. What is its area?`, answer: "20",
          solution: String.raw`The diagonals split the convex quadrilateral into four triangles. Their angles at the diagonal intersection are $30^\circ$ or $150^\circ$, both with sine $1/2$. Adding their areas gives half the product of the complete diagonal lengths times that sine: $\tfrac12\cdot8\cdot10\cdot\tfrac12=20$. The factor $1/2$ from the angle is separate from the triangle-area factor.` }
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
      body: String.raw`A circle is the set of points at a fixed distance $r$ from its center; the disk includes its interior. Its diameter is $2r$. The constant $\pi$ is the common ratio of circumference to diameter, so circumference is $2\pi r$. Disk area is $\pi r^2$: cutting the disk into successively thinner sectors and alternating their directions approaches a rectangle of height $r$ and base half the circumference, $\pi r$. The limiting area is therefore $\pi r^2$.

This separates two scaling laws. Multiplying the radius by $k$ multiplies circumference by $k$ but area by $k^2$. The ring between concentric circles of radii $R\ge r$ has area $\pi(R^2-r^2)$, rather than $\pi(R-r)^2$. For radii five and three, the removed inner disk leaves $25\pi-9\pi=16\pi$.

A sector is bounded by two radii and their intervening arc. A central angle of $\theta$ degrees occupies fraction $\theta/360^\circ$ of a full turn, giving arc length $(\theta/360^\circ)2\pi r$ and area $(\theta/360^\circ)\pi r^2$. For radius six and angle $60^\circ$, the sector area is $6\pi$ and the arc length $2\pi$. These [[circle-basics|circle and sector formulas]] use the central angle; an angle with its vertex elsewhere is not automatically the same measure.

Radians encode the angle by arc length divided by radius, so a full turn is $2\pi$ radians. If $\phi$ is in radians, arc length is $r\phi$ and sector area $r^2\phi/2$. Thus $60^\circ=\pi/3$ radians produces the same results. Substituting the number sixty into the radian formula would mix two angle units. When a sector's perimeter is requested, add its two radii to the arc; arc length alone measures only the curved boundary.

A chord joins two points of a circle. Together with either arc between them, it bounds a circular segment. For the minor arc with central angle at most $180^\circ$, draw its two radii: the minor segment is exactly the sector with the central triangle removed. With radius two and central angle $90^\circ$, the sector area is $\pi$, while the triangle is right with area two, giving [[circular-segment|segment area]] $\pi-2$. The major segment is the rest of the disk, so its area is $4\pi-(\pi-2)=3\pi+2$. For the reflex $270^\circ$ sector, subtracting the ordinary positive triangle area would have the wrong sign; taking the complement avoids that mistake.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 315" role="img" aria-label="Minor and major circular segments require different subtractions" style="width:100%;max-width:520px;height:auto"><title>Minor and major circular segments require different subtractions</title><path d="M120 150L220 150A100 100 0 0 0 120 50Z" fill="currentColor" fill-opacity=".05" stroke="currentColor" stroke-width="1.3"/><path d="M220 150A100 100 0 0 0 120 50Z" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="1.3"/><path d="M490 150A100 100 0 1 1 390 50Z" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="1.3"/><circle cx="390" cy="150" r="100" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/><path d="M120 140H130V150" fill="none" stroke="currentColor"/><g fill="currentColor" font-size="16" text-anchor="middle"><text x="130" y="25">Sector minus triangle</text><text x="390" y="25">Whole disk minus minor</text><text x="170" y="172">2</text><text x="101" y="106">2</text><text x="130" y="287">Minor: π − 2</text><text x="390" y="287">Major: 3π + 2</text></g></svg>

A lens formed by two intersecting circles can be split along their common chord into two circular segments. The segments are congruent only when the circle radii are equal. For circles of radius two centered at $(2,0)$ and $(0,2)$, the intersection points are $(0,0)$ and $(2,2)$: substituting either point gives distance two to both centers. At each center the two radii to those points are perpendicular. Hence each segment has area $\pi-2$ and the lens has area $2(\pi-2)$. Drawing the common chord identifies precisely which triangles are removed from which sectors.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 325" role="img" aria-label="A lens consists of two congruent circular segments" style="width:100%;max-width:520px;height:auto"><title>A lens consists of two congruent circular segments</title><g fill="none" stroke="currentColor" stroke-width="1" opacity=".6"><circle cx="189.289" cy="160" r="100"/><circle cx="330.711" cy="160" r="100"/></g><path d="M260 89.289A100 100 0 0 1 260 230.711A100 100 0 0 1 260 89.289Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="1.5"/><g fill="none" stroke="currentColor" stroke-width="1.1"><path d="M260 89.289L189.289 160L260 230.711L330.711 160Z"/><path d="M260 89.289V230.711" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="260" y="74">U</text><text x="260" y="254">V</text><text x="168" y="181">O₁</text><text x="351" y="181">O₂</text><text x="214" y="165">90°</text><text x="306" y="165">90°</text><text x="225" y="110">2</text><text x="260" y="307">Two congruent segments give 2(π − 2).</text></g></svg>

A rope around an obstacle adds one more geometric constraint: reachable distance follows the rope's path, not necessarily the straight-line distance to its tie point. Consider a [[tethered-animal|tether around a shed]], with rope length six tied at an outside corner $O$ of a square shed of side four. Assume the rope is flexible and taut when extended, the shed is the only obstacle, and the animal is modeled by a point.

At $O$, the shed blocks a $90^\circ$ quadrant, leaving three quarters of a radius-six disk. To reach behind either neighboring corner, the rope first spends four units following a wall. It then has two units left, sweeping a quarter disk about that corner. The added pieces lie beyond different sides of the shed and have disjoint interiors; the opposite corner would require eight units of rope, so no further wrap is possible. The area is therefore $\tfrac34\pi6^2+2(\tfrac14\pi2^2)=29\pi$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 465" role="img" aria-label="A rope wraps around two shed corners with reduced reach" style="width:100%;max-width:520px;height:auto"><title>A rope wraps around two shed corners with reduced reach</title><g fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.1"><path d="M230 250L230 118A132 132 0 1 0 362 250Z"/><path d="M318 250L362 250A44 44 0 0 0 318 206Z"/><path d="M230 162L274 162A44 44 0 0 0 230 118Z"/></g><rect x="230" y="162" width="88" height="88" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="1.5"/><path d="M230 250H318L349.113 218.887" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 3"/><circle cx="230" cy="250" r="3" fill="currentColor"/><g fill="currentColor" font-size="16" text-anchor="middle"><text x="274" y="210">4 × 4 shed</text><text x="217" y="273">O</text><text x="329" y="273">P</text><text x="215" y="154">Q</text><text x="157" y="324">radius 6</text><text x="363" y="197">radius 2</text><text x="273" y="132">2</text><text x="260" y="429">Four units along either wall leave two around its corner.</text><text x="260" y="453">The three grazing pieces have disjoint interiors.</text></g></svg>

For a rectangular shed with side lengths $a,b$ and corner-tied rope length $L\lt a+b$, the same reasoning adds a neighboring-corner quarter disk only when the rope reaches that corner. Its radius is the positive remainder $L-a$ or $L-b$. If $L$ reaches farther corners, a fresh path and overlap analysis is necessary. Drawing circles of full radius $L$ about every corner would count rope length that has already been used along walls, and adding overlapping sectors would count reachable points twice.`,
      related: [
        { card: "chord-length", note: String.raw`the chord from the radius and the distance to the center (S5.2).` },
        { card: "rolling-without-slipping", note: String.raw`a circle rolling along a path, measured by its circumference (S5.6).` },
        { card: "regular-hexagon-area", note: String.raw`regular hexagons inside circles, with segments left over (S6.2).` }
      ],
      exercises: [
        { q: String.raw`A sector of a circle of radius $6$ has a central angle of $60^\circ$. What is its area?`, answer: "6pi",
          solution: String.raw`The central angle is one sixth of a full turn. Thus its sector occupies one sixth of the disk area $\pi6^2=36\pi$, giving $6\pi$. The result is an area; the associated arc length would be $\tfrac16\cdot2\pi6=2\pi$.` },
        { q: String.raw`What is the area of the ring between two circles with the same center and radii $5$ and $3$?`, answer: "16pi",
          solution: String.raw`Because the disks have the same center, the radius-three disk lies entirely inside the radius-five disk. Subtracting their areas gives $\pi5^2-\pi3^2=25\pi-9\pi=16\pi$. The ring's thickness is two, but a disk of radius two would be a different region.` },
        { q: String.raw`A chord of a circle of radius $2$ cuts off a $90^\circ$ arc. What is the area of the region between the chord and that arc?`, answer: "pi-2",
          solution: String.raw`The specified arc is the minor $90^\circ$ arc. Its sector has area $\tfrac14\pi2^2=\pi$. The two radii form perpendicular legs of length two, so the central triangle has area $\tfrac12\cdot2\cdot2=2$. The segment between chord and arc is exactly the sector less that triangle, giving $\pi-2$.` },
        { q: String.raw`A goat is tied by a rope of length $6$ to one outside corner of a square shed of side $4$. Over what area can it graze?`, answer: "29pi",
          solution: String.raw`The shed blocks one quadrant at the tie point, leaving area $\tfrac34\pi6^2=27\pi$ reachable without a wrap. Following either adjacent wall uses four units of rope, leaving two around the next corner. Each such corner adds a quarter disk of area $\tfrac14\pi2^2=\pi$. Those two added pieces lie beyond different sides of the shed and do not overlap each other or the original three-quarter disk in their interiors. Reaching the opposite corner would require eight units, more than the rope length. The total is $27\pi+\pi+\pi=29\pi$.` }
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
      body: String.raw`Coordinates assign a horizontal and vertical number to each point. Choosing perpendicular axes makes the coordinate gaps into perpendicular lengths, so many geometric constructions become equations. Translations or rotations can simplify the placement without changing distances or areas; choosing convenient axes is part of the geometry, not an additional assumption about the figure.

For distinct points $P=(x_1,y_1)$ and $Q=(x_2,y_2)$, put $\Delta x=x_2-x_1$ and $\Delta y=y_2-y_1$. Pythagoras on the horizontal and vertical gaps gives distance $PQ=\sqrt{(\Delta x)^2+(\Delta y)^2}$. Squaring removes the signs of the coordinate differences. The midpoint is $((x_1+x_2)/2,(y_1+y_2)/2)$, since it moves half each coordinate displacement from either endpoint. These [[distance-midpoint|distance and midpoint formulas]] also work for horizontal and vertical segments.

For $P=(2,-3)$ and $Q=(8,5)$, the gaps are six and eight, so the distance is ten and the midpoint is $(5,1)$. A nonvertical line through the points has slope $m=\Delta y/\Delta x=4/3$, measuring signed rise per unit run. Reversing the point order changes both signs, leaving the same slope. A horizontal line has slope zero; a vertical line has no finite slope because its horizontal change is zero.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390" role="img" aria-label="Coordinate gaps make a right triangle and locate the midpoint" style="width:100%;max-width:520px;height:auto"><title>Coordinate gaps make a right triangle and locate the midpoint</title><g fill="none" stroke="currentColor" stroke-width="1"><path d="M50 240H435M80 355V60" opacity=".5"/><path d="M136 324H304V100" stroke-dasharray="5 4"/><path d="M294 324V314H304"/><path d="M136 324L304 100" stroke-width="1.6"/></g><g fill="currentColor"><circle cx="136" cy="324" r="3"/><circle cx="304" cy="100" r="3"/><circle cx="220" cy="212" r="3"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="260" y="28">P = (2, −3), Q = (8, 5)</text><text x="116" y="333">P</text><text x="321" y="90">Q</text><text x="321" y="338">H</text><text x="201" y="206">M</text><text x="220" y="346">6</text><text x="322" y="217">8</text><text x="443" y="251">x</text><text x="68" y="64">y</text><text x="260" y="379">Distance 10; midpoint (5, 1); slope 4/3.</text></g></svg>

Slope gives a line equation through a known point: every point $(x,y)$ on the nonvertical line through $(x_0,y_0)$ satisfies $y-y_0=m(x-x_0)$. Through $(1,2)$ and $(3,8)$ the slope is three, so $y-2=3(x-1)$, or $y=3x-1$. The latter slope-intercept form directly displays the crossing with the $y$-axis at $(0,-1)$. Through two points with equal $x$-coordinates, write the vertical line $x=x_0$ instead of dividing by zero. Coincident input points alone do not determine a unique line.

A form that includes both vertical and horizontal lines is $Ax+By=C$, with $A,B$ not both zero. When $B\ne0$, rearrangement gives slope $-A/B$ and $y$-intercept $C/B$. When $B=0$, the line is vertical, $x=C/A$. These [[line-forms|forms of a line]] describe the same geometric object while emphasizing different data. Multiplying all three coefficients by the same nonzero number changes no points on the line.

Two distinct nonvertical lines are parallel exactly when their slopes agree. Equal slopes may also describe the very same line, so intercepts decide whether the lines coincide. For slopes $m_1,m_2$, take one horizontal step along each direction from a common origin, giving $U=(1,m_1)$ and $V=(1,m_2)$. Pythagoras and its converse make these directions perpendicular exactly when $UV^2=OU^2+OV^2$, or $(m_1-m_2)^2=(1+m_1^2)+(1+m_2^2)$. Cancellation gives $m_1m_2=-1$, the negative-reciprocal rule. A horizontal and a vertical line are perpendicular as a separate case, without assigning a numerical slope to the vertical line. For $2x+3y=6$, the slope is $-2/3$, so perpendicular nonvertical lines have slope $3/2$.

Intercepts often avoid more algebra. Set $y=0$ to find an $x$-axis crossing and set $x=0$ for a $y$-axis crossing, checking that the relevant coefficient is nonzero. The line $3x+4y=24$ has intercepts $(8,0)$ and $(0,6)$. Together with the origin these make a right triangle of area $\tfrac12\cdot8\cdot6=24$ and hypotenuse ten. With nonzero intercepts $a,b$, the same line can be written $x/a+y/b=1$. A line through the origin does not cut off a nondegenerate triangle with the axes, so this intercept form is unsuitable there.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" role="img" aria-label="Axis intercepts determine a right triangle area" style="width:100%;max-width:520px;height:auto"><title>Axis intercepts determine a right triangle area</title><path d="M100 290H380L100 80Z" fill="currentColor" fill-opacity=".07"/><g fill="none" stroke="currentColor" stroke-width="1.1"><path d="M60 290H455M100 325V45"/><path d="M80 65L420 320" stroke-width="1.5"/><path d="M100 280H110V290"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="380" y="312">8</text><text x="82" y="85">6</text><text x="83" y="310">O</text><text x="466" y="304">x</text><text x="87" y="47">y</text><text x="300" y="132">3x + 4y = 24</text><text x="192" y="234">area 24</text><text x="260" y="359">Intercepts (8, 0) and (0, 6) give perpendicular legs.</text></g></svg>

The coordinate method is strongest when each equation keeps a geometric meaning: a squared distance, a midpoint, a direction or an intersection. Check a derived point in every original condition. In particular, a solution of a line equation need not lie on a specified segment, and an algebraic intersection outside a figure may need to be rejected or interpreted on an extension.`,
      related: [
        { card: "section-formula", note: String.raw`the point dividing a segment in a given ratio (S7.2).` },
        { card: "point-line-distance", note: String.raw`the distance from a point to a line (S7.2).` },
        { card: "coordinate-bash", note: String.raw`solving a whole problem in coordinates (S7.4).` }
      ],
      exercises: [
        { q: String.raw`How far apart are the points $(2, -3)$ and $(8, 5)$?`, answer: "10",
          solution: String.raw`The horizontal difference is $8-2=6$, and the vertical difference is $5-(-3)=8$. Pythagoras gives distance $\sqrt{6^2+8^2}=\sqrt{100}=10$. The subtraction of a negative coordinate is essential; the vertical gap is eight, not two.` },
        { q: String.raw`What is the $y$-intercept of the line through $(1, 2)$ and $(3, 8)$?`, answer: "-1",
          solution: String.raw`The two points have different $x$-coordinates, so the slope is $(8-2)/(3-1)=3$. Point-slope form through $(1,2)$ gives $y-2=3(x-1)$, hence $y=3x-1$. Setting $x=0$ gives the axis crossing $(0,-1)$, so the requested $y$-intercept is $-1$. Both original points satisfy the equation.` },
        { q: String.raw`What is the slope of a line perpendicular to $2x + 3y = 6$?`, answer: "3/2",
          solution: String.raw`Solving $2x+3y=6$ for $y$ gives slope $-2/3$. A perpendicular nonvertical line has slope $m$ satisfying $(-2/3)m=-1$, so $m=3/2$. The original line is neither horizontal nor vertical, so this finite-slope rule applies directly.` },
        { q: String.raw`What is the area of the triangle cut off from the first quadrant by the line $3x + 4y = 24$?`, answer: "24",
          solution: String.raw`Setting $y=0$ gives $3x=24$, so the line meets the positive $x$-axis at eight. Setting $x=0$ gives $4y=24$, so it meets the positive $y$-axis at six. These intercepts and the origin form a right triangle with legs eight and six, giving area $\tfrac12\cdot8\cdot6=24$.` }
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
      body: String.raw`The shape's hypotheses determine which construction is valid. A convex polygon admits a diagonal fan from a vertex, while a simple concave polygon needs a triangulation that stays inside. Exterior angles are directed turns. Equal angles fix directions but do not force equal sides, so an equiangular completion must be justified rather than assumed regular.

For quadrilateral area, identify a genuine perpendicular height or decompose along diagonals. Doubling a trapezoid gives the average-base formula; a rhombus supplies perpendicular, bisected diagonals; the crossing-angle formula follows by adding four triangle areas in a convex quadrilateral. A missing parallelogram vertex depends on which given vertices are opposite.

Circle measurements distinguish radius from diameter, circumference from area and degrees from radians. Sectors preserve fractions of a full turn. Minor segments come from subtracting a triangle, major segments from taking the complement, and lenses from the two sides of their common chord. A wrapped rope loses reach along every wall it follows, and area additions require disjoint interiors or an overlap correction.

Coordinates translate these constructions into distances, midpoints and line equations. Preserve vertical and horizontal cases instead of dividing by zero, distinguish coincident from distinct parallel lines, and use intercepts when the axes supply an immediate right triangle. A useful calculation ends by checking the geometric conditions as well as the algebra.`,
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
        solution: String.raw`For a simple polygon with $n$ sides, the interior-angle sum is $180^\circ(n-2)$. Equating it to $1440^\circ$ gives $n-2=8$, hence $n=10$. This finds the number of sides without assuming that the angles or sides are equal.` },
      { q: String.raw`A pizza of radius $8$ is cut into slices with $45^\circ$ angles. What is the area of one slice?`, answer: "8pi",
        solution: String.raw`A $45^\circ$ slice is $45/360=1/8$ of the pizza. The full disk has area $\pi8^2=64\pi$, so the slice area is $64\pi/8=8\pi$. Equal angular fractions give equal area fractions because all slices share the same center and radius.` },
      { q: String.raw`A convex kite has diagonals $6$ and $14$. What is its area?`, answer: "42",
        solution: String.raw`The diagonals of a convex kite are perpendicular, so splitting along them gives triangle areas whose sum is half the full diagonal product. Thus the area is $\tfrac12\cdot6\cdot14=42$. Both diagonals need not bisect each other for this area calculation; perpendicularity is the relevant condition.` },
      { q: String.raw`One-by-one isosceles right triangles are cut from all four corners of an $8\times6$ rectangle. What is the perimeter of the remaining equiangular octagon?`, answer: "20+4sqrt(2)",
        solution: String.raw`The original perimeter is twenty-eight. Each cut removes two unit boundary segments and replaces them with a hypotenuse of length $\sqrt2$, so the total change is $4(\sqrt2-2)$. The result is $28-8+4\sqrt2=20+4\sqrt2$. Equivalently, the new sides are two horizontal sixes, two vertical fours and four diagonals of length $\sqrt2$. Its equal $135^\circ$ angles do not make the outer rectangle a square.` },
      { q: String.raw`Three noncollinear points $(0,0)$, $(3,0)$ and $(1,2)$ are vertices of a parallelogram, with their order unspecified. How many different positions are possible for the fourth vertex?`, answer: "3",
        solution: String.raw`Choose which given vertex is opposite the missing one. The midpoint equation gives the three possibilities $(0,0)+(3,0)-(1,2)=(2,-2)$, $(0,0)+(1,2)-(3,0)=(-2,2)$ and $(3,0)+(1,2)-(0,0)=(4,2)$. Each produces a nondegenerate parallelogram, and the positions are distinct. The three choices of opposite vertex exhaust the possible cyclic orders, so the count is three.` },
      { q: String.raw`A sector has radius $6$ and central angle $60^\circ$. What is its perimeter?`, answer: "12+2pi",
        solution: String.raw`The arc is one sixth of circumference $12\pi$, so its length is $2\pi$. The sector boundary also contains two radii of length six. Adding all three boundary pieces gives perimeter $12+2\pi$. Its area $6\pi$ is a different measurement.` },
      { q: String.raw`A chord in a circle of radius $2$ cuts off a minor arc of $90^\circ$. What is the area of the major circular segment bounded by that chord and the other arc?`, answer: "3pi+2",
        solution: String.raw`The minor segment is a quarter-disk sector minus a right triangle with legs two, so its area is $\pi-2$. The major segment is the rest of the disk: $4\pi-(\pi-2)=3\pi+2$. Subtracting a positive triangle from the $270^\circ$ sector would give the wrong sign; taking the complement identifies the correct region.` },
      { q: String.raw`A point-like animal is tied by a flexible rope of length $3$ to an outside corner of a square shed of side $4$, with no other obstacles. Over what area can it move?`, answer: "27pi/4",
        solution: String.raw`The shed blocks one quadrant at the corner, leaving three quarters of a radius-three disk. The rope is too short to reach either neighboring corner, so no wrapped sector is added. The reachable area is $\tfrac34\pi3^2=27\pi/4$.` },
      { q: String.raw`A line passes through $(4,-2)$ and $(4,7)$. What is the $x$-coordinate of its intersection with $y=3$?`, answer: "4",
        solution: String.raw`The two distinct points have the same $x$-coordinate, so they determine the vertical line $x=4$. Its intersection with $y=3$ is $(4,3)$, giving $x$-coordinate four. There is no finite slope for this line, so rise divided by run is not used.` }
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
