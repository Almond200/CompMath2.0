// Learn, AMC Geometry, chapter S10: analytic geometry (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S10"] = {
  lessons: {
    "S10.1": {
      prereq: ["circle-equation", "distance-midpoint", "coordinate-bash", "midsegment-theorem"],
      cards: [],
      body: String.raw`This chapter extends coordinates in three directions: curves beyond the circle, the conic sections; vectors, which measure angles and areas and describe moves; and a few theorems about quadrilaterals and about the regions around a figure. They are the analytic tools of the harder AMC problems, and each turns a picture into a computation.

The ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{9} = 1$ has its foci at $(\pm 4, 0)$, since $c^2 = 25 - 9$, so the foci are $8$ apart. The vectors $(1, 2)$ and $(3, 4)$ have dot product $1 \cdot 3 + 2 \cdot 4 = 11$, which measures the angle between them. And the midpoints of the sides of any quadrilateral form a parallelogram with half its area, so a quadrilateral of area $30$ gives one of area $15$.

The lessons take these ideas in turn: conic sections (S10.2), polar coordinates, tangency and determinants (S10.3), vectors and transformations (S10.4), theorems about quadrilaterals and hexagons (S10.5), and regions and neighborhoods (S10.6). The Summary (S10.7) collects the strategies.`,
      exercises: [
        { q: String.raw`How far apart are the foci of the ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{9} = 1$?`, answer: "8",
          solution: String.raw`With $a = 5$ and $b = 3$, $c^2 = a^2 - b^2 = 16$, so the foci are $(\pm 4, 0)$, $8$ apart.` },
        { q: String.raw`What is the dot product of $(1, 2)$ and $(3, 4)$?`, answer: "11",
          solution: String.raw`Multiply matching coordinates and add: $1 \cdot 3 + 2 \cdot 4 = 11$.` },
        { q: String.raw`A quadrilateral has area $30$. What is the area of the parallelogram whose corners are the midpoints of its sides?`, answer: "15",
          solution: String.raw`Each corner triangle cut off by the parallelogram is a quarter of a triangle formed by a diagonal, and the four corners together make half the quadrilateral. So the parallelogram has half the area: $15$.` }
      ],
      problems: [
        "2006 AMC 8, Problem 5",
        "2022 AMC 8, Problem 4",
        "2019 AMC 10B, Problem 10"
      ]
    },
    "S10.2": {
      prereq: ["circle-equation", "distance-midpoint", "point-line-distance", "tangency-condition"],
      cards: ["conic-sections", "parabola-focus-directrix", "ellipse-properties", "hyperbola-properties", "conic-tangent-lines", "eccentricity", "parabolic-segment-area"],
      body: String.raw`Where is the focus of the parabola $y = \tfrac{x^2}{8}$? What is the area of the ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{16} = 1$? What are the asymptotes of $\tfrac{x^2}{9} - \tfrac{y^2}{16} = 1$? The conics are the curves of distance, and each has a few lengths that describe it.

[[conic-sections|The conic sections]] in standard position are the ellipse $\tfrac{x^2}{a^2} + \tfrac{y^2}{b^2} = 1$, the hyperbola $\tfrac{x^2}{a^2} - \tfrac{y^2}{b^2} = 1$ and the parabola $x^2 = 4py$; any equation of the second degree without an $xy$ term is moved into one of these by completing the squares. [[eccentricity|The eccentricity]] $e$ unites them: a conic is the set of points whose distance to a focus is $e$ times the distance to a line, the directrix, with $e \lt 1$ an ellipse, $e = 1$ a parabola and $e \gt 1$ a hyperbola; for an ellipse or hyperbola $e = \tfrac ca$.

[[ellipse-properties|An ellipse]] is the set of points whose distances to two foci add to $2a$, where $c^2 = a^2 - b^2$ locates the foci at $(\pm c, 0)$. For $\tfrac{x^2}{25} + \tfrac{y^2}{16} = 1$, $c = 3$, every point is $10$ from the two foci together, the eccentricity is $\tfrac35$, and the area is $\pi ab = 20\pi$, the circle of radius $5$ squeezed by $\tfrac45$. [[hyperbola-properties|A hyperbola]] has a constant difference $2a$ of the distances to its foci, $c^2 = a^2 + b^2$, and asymptotes $y = \pm\tfrac ba x$: for $\tfrac{x^2}{9} - \tfrac{y^2}{16} = 1$, $c = 5$ and the asymptotes have slopes $\pm\tfrac43$.

[[parabola-focus-directrix|A parabola]] is the set of points equally far from a focus and a directrix line. $x^2 = 4py$ has focus $(0, p)$ and directrix $y = -p$, so $y = \tfrac{x^2}{8}$, that is, $x^2 = 8y$, has $p = 2$ and focus $(0, 2)$; in general $y = ax^2$ has $p = \tfrac{1}{4a}$. [[parabolic-segment-area|The region between a parabola and a chord]] has area $\tfrac43$ of the triangle on the chord with its third corner where the tangent is parallel to the chord; between $y = x^2$ and $y = 4$ it is $\tfrac{|a|(x_2 - x_1)^3}{6} = \tfrac{64}{6} = \tfrac{32}{3}$. [[conic-tangent-lines|Tangent lines to a conic]] meet it once: the line $y = mx + k$ touches $\tfrac{x^2}{a^2} + \tfrac{y^2}{b^2} = 1$ exactly when $k^2 = a^2m^2 + b^2$, so $y = x + k$ touches $\tfrac{x^2}{4} + y^2 = 1$ when $k^2 = 5$.

Complete the squares into standard form, read $a$, $b$, $c$, and use the focus property of each conic. The next lesson adds polar coordinates and determinants.`,
      related: [
        { card: "linear-change-of-variables", note: String.raw`an ellipse as a circle stretched along one axis (S10.4).` },
        { card: "completing-the-square", note: String.raw`moving a second-degree equation into standard form.` },
        { card: "reflect-across-the-line", note: String.raw`the reflection property behind a focus (S7.5).` }
      ],
      exercises: [
        { q: String.raw`What is the $y$-coordinate of the focus of the parabola $y = \tfrac{x^2}{8}$?`, answer: "2",
          solution: String.raw`Write it as $x^2 = 8y = 4py$ with $p = 2$. The focus is $(0, p) = (0, 2)$.` },
        { q: String.raw`What is the area of the ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{16} = 1$?`, answer: "20pi",
          solution: String.raw`The area is $\pi ab = \pi \cdot 5 \cdot 4 = 20\pi$: the circle of radius $5$ squeezed vertically by the factor $\tfrac45$.` },
        { q: String.raw`What is the eccentricity of the ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{16} = 1$?`, answer: "3/5",
          solution: String.raw`$c = \sqrt{25 - 16} = 3$, so $e = \tfrac ca = \tfrac35$.` },
        { q: String.raw`What is the positive slope of an asymptote of the hyperbola $\tfrac{x^2}{9} - \tfrac{y^2}{16} = 1$?`, answer: "4/3",
          solution: String.raw`The asymptotes are $y = \pm\tfrac ba x$ with $a = 3$, $b = 4$: slope $\tfrac43$.` },
        { q: String.raw`What is the area of the region between the parabola $y = x^2$ and the line $y = 4$?`, answer: "32/3",
          solution: String.raw`The chord runs from $x = -2$ to $x = 2$. The area is $\tfrac{|a|(x_2 - x_1)^3}{6} = \tfrac{64}{6} = \tfrac{32}{3}$; or $\tfrac43$ of the triangle with corners $(-2, 4)$, $(2, 4)$, $(0, 0)$, of area $8$.` },
        { q: String.raw`For what positive $k$ is the line $y = x + k$ tangent to the ellipse $\tfrac{x^2}{4} + y^2 = 1$?`, answer: "sqrt(5)",
          solution: String.raw`Substituting, $\tfrac{x^2}{4} + (x + k)^2 = 1$, that is, $\tfrac54 x^2 + 2kx + k^2 - 1 = 0$, which has a double root when $4k^2 - 5(k^2 - 1) = 0$, so $k^2 = 5$: the condition $k^2 = a^2m^2 + b^2 = 4 + 1$.` }
      ],
      problems: [
        "2006 AMC 12B, Problem 21",
        "2015 AMC 12A, Problem 21",
        "2011 AMC 12B, Problem 14",
        "2021 Spring AMC 12A, Problem 20",
        "2021 Spring AMC 12A, Problem 21",
        "2013 AMC 12B, Problem 21",
        "2025 AMC 12A, Problem 14"
      ]
    },
    "S10.3": {
      prereq: ["shoelace-formula", "common-angle-values", "point-line-distance"],
      cards: ["polar-coordinates", "tangency-equation", "determinant-geometric", "lattice-points-gcd"],
      body: String.raw`Where is the point at distance $2$ from the origin in the direction $60^\circ$? What is the area of the triangle with corners $(0, 0)$, $(3, 1)$, $(1, 4)$? How many lattice points lie strictly between $(0, 0)$ and $(12, 18)$? Four more coordinate tools, each short.

[[polar-coordinates|Polar coordinates]] name a point by its distance $r$ from the origin and its angle $\theta$ from the positive $x$-axis: $x = r\cos\theta$ and $y = r\sin\theta$, so $r = 2$ and $\theta = 60^\circ$ give $(1, \sqrt3)$. Circles about the origin are $r = $ constant and lines through it are $\theta = $ constant, which is why polar form suits rotations and regular polygons.

[[determinant-geometric|The determinant]] $\begin{vmatrix} u_1 & u_2 \\ v_1 & v_2 \end{vmatrix} = u_1v_2 - u_2v_1$ is the signed area of the parallelogram on two vectors, so half of it is the area of the triangle they span. For $(3, 1)$ and $(1, 4)$ it is $12 - 1 = 11$, and the triangle has area $\tfrac{11}{2}$; the shoelace formula is a sum of such determinants. The sign tells the order: positive when the second vector is counterclockwise from the first.

[[lattice-points-gcd|The lattice points on a segment]] from $(0, 0)$ to $(a, b)$ are the multiples of $\left(\tfrac ag, \tfrac bg\right)$ with $g = \gcd(a, b)$, so $g - 1$ lie strictly between the ends: $5$ between $(0, 0)$ and $(12, 18)$. A diagonal of an $m \times n$ grid crosses $m + n - \gcd(m, n)$ squares, $8$ for $4 \times 6$, since it enters a new square at each grid line it crosses, except where it crosses two at once at a lattice point. [[tangency-equation|The tangency equation]] writes "exactly one common point" as an equation in the unknown: set the distance from a center to a line equal to the radius, or set the discriminant of the equation for the common points to zero (S9.5).

Convert with $r\cos\theta$ and $r\sin\theta$, take half a determinant for a triangle's area, use the gcd for lattice points on a segment, and write tangency as one equation. The next lesson works with vectors and transformations.`,
      related: [
        { card: "picks-theorem", note: String.raw`the area of a lattice polygon from its lattice points (S7.4).` },
        { card: "complex-basics", note: String.raw`polar form for complex numbers (L13).` },
        { card: "tangency-condition", note: String.raw`the same condition, as a fact about lines and circles (S9.5).` }
      ],
      exercises: [
        { q: String.raw`A point has polar coordinates $r = 2$, $\theta = 60^\circ$. What is its $x$-coordinate?`, answer: "1",
          solution: String.raw`$x = r\cos\theta = 2 \cdot \tfrac12 = 1$ (and $y = 2 \cdot \tfrac{\sqrt3}{2} = \sqrt3$).` },
        { q: String.raw`What is the area of the triangle with corners $(0, 0)$, $(3, 1)$ and $(1, 4)$?`, answer: "11/2",
          solution: String.raw`Half the determinant of the two vectors from the origin: $\tfrac12|3 \cdot 4 - 1 \cdot 1| = \tfrac{11}{2}$.` },
        { q: String.raw`How many lattice points lie strictly between $(0, 0)$ and $(12, 18)$ on the segment joining them?`, answer: "5",
          solution: String.raw`$\gcd(12, 18) = 6$, so the lattice points on the segment are $k(2, 3)$ for $k = 0, \ldots, 6$, and $5$ lie strictly between the ends.` },
        { q: String.raw`A diagonal of a $4 \times 6$ rectangle of unit squares passes through the inside of how many squares?`, answer: "8",
          solution: String.raw`It crosses $3$ inner horizontal and $5$ inner vertical lines, entering a new square each time, except at the lattice point $(2, 3)$ on it where it crosses two lines at once. So $1 + 3 + 5 - 1 = 8 = 4 + 6 - \gcd(4, 6)$.` }
      ],
      problems: [
        "2024 AMC 8, Problem 23",
        "2019 AMC 10A, Problem 10",
        "2005 AMC 12A, Problem 12",
        "2024 AMC 10B, Problem 19",
        "2009 AMC 12B, Problem 22"
      ]
    },
    "S10.4": {
      prereq: ["rotation-90", "reflection-coordinates", "composing-transformations", "law-of-cosines"],
      cards: ["vector-dot-product", "vector-projection", "reflection-composition", "rotation-reflection-matrices", "rotation-trick", "rotation-center", "linear-change-of-variables"],
      body: String.raw`What angle do $(1, 0)$ and $(1, 1)$ make? How long is the shadow of $(2, 3)$ on the direction $(3, 4)$? A point inside an equilateral triangle is $3$, $4$ and $5$ from the corners: what angle does it see one side at? What is the area of the region $|x + y| \le 1$, $|x - y| \le 1$? Vectors measure, and transformations move.

[[vector-dot-product|The dot product]] $\vec u \cdot \vec v = u_1v_1 + u_2v_2 = |\vec u||\vec v|\cos\theta$ gives the angle between two vectors: $(1, 0) \cdot (1, 1) = 1 = 1 \cdot \sqrt2 \cos\theta$, so $\theta = 45^\circ$. Perpendicular vectors have dot product $0$. [[vector-projection|The projection]] of $\vec u$ on $\vec v$, its shadow along $\vec v$, has length $\tfrac{|\vec u \cdot \vec v|}{|\vec v|}$: $\tfrac{6 + 12}{5} = \tfrac{18}{5}$ for $(2, 3)$ on $(3, 4)$.

[[reflection-composition|Two reflections]] over lines meeting at an angle $\theta$ make a rotation by $2\theta$ about the meeting point, and over parallel lines a translation by twice the distance between them; so two reflections over lines at $30^\circ$ turn the plane $60^\circ$. [[rotation-reflection-matrices|In matrix form]], a rotation by $\theta$ is $\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$, and following moves one after another multiplies their matrices. [[rotation-center|The center of a rotation]] that takes $P$ to $P'$ and $Q$ to $Q'$ is equally far from $P$ and $P'$ and from $Q$ and $Q'$, so it lies on both perpendicular bisectors.

[[rotation-trick|The rotation trick]] brings scattered distances together. With $PA = 3$, $PB = 4$, $PC = 5$ in an equilateral triangle, rotate triangle $BPC$ by $60^\circ$ about $B$ so that $C$ lands on $A$ and $P$ on $P'$. Then $BP' = BP = 4$ with $\angle PBP' = 60^\circ$, so triangle $BPP'$ is equilateral and $PP' = 4$; and $AP' = CP = 5$. Triangle $APP'$ has sides $3$, $4$, $5$, a right angle at $P$, so $\angle APB = 90^\circ + 60^\circ = 150^\circ$. [[linear-change-of-variables|A linear change of variables]] $u = ax + by$, $v = cx + dy$ multiplies areas by $|ad - bc|$: with $u = x + y$, $v = x - y$ the region becomes the square $|u|, |v| \le 1$ of area $4$, and since the factor is $2$, the original region has area $2$.

Use the dot product for angles and projections, compose reflections into rotations, rotate to bring distances together, and change variables to make a region simple. The next lesson collects theorems about quadrilaterals.`,
      related: [
        { card: "point-in-equilateral", note: String.raw`the configurations of a point inside an equilateral triangle (S4.4).` },
        { card: "determinant-geometric", note: String.raw`the area factor $|ad - bc|$ as a determinant (S10.3).` },
        { card: "perpendicular-bisector-locus", note: String.raw`the bisectors that locate a rotation's center (S7.3).` }
      ],
      exercises: [
        { q: String.raw`What is the angle between the vectors $(1, 0)$ and $(1, 1)$, in degrees?`, answer: "45",
          solution: String.raw`$\cos\theta = \tfrac{(1, 0) \cdot (1, 1)}{1 \cdot \sqrt2} = \tfrac{1}{\sqrt2}$, so $\theta = 45^\circ$.` },
        { q: String.raw`How long is the projection of $(2, 3)$ onto the direction of $(3, 4)$?`, answer: "18/5",
          solution: String.raw`$\tfrac{(2, 3) \cdot (3, 4)}{|(3, 4)|} = \tfrac{6 + 12}{5} = \tfrac{18}{5}$.` },
        { q: String.raw`The plane is reflected over a line and then over a second line through the same point at an angle of $30^\circ$ to the first. By how many degrees is the plane rotated in all?`, answer: "60",
          solution: String.raw`Two reflections over lines meeting at an angle $\theta$ make a rotation by $2\theta$ about the meeting point: $60^\circ$.` },
        { q: String.raw`A point $P$ inside an equilateral triangle $ABC$ has $PA = 3$, $PB = 4$ and $PC = 5$. What is $\angle APB$, in degrees?`, answer: "150",
          solution: String.raw`Rotate about $B$ by $60^\circ$ taking $C$ to $A$, and let $P$ go to $P'$. Then $BPP'$ is equilateral, so $PP' = 4$ and $\angle BPP' = 60^\circ$, and $AP' = CP = 5$. Triangle $APP'$ has sides $3, 4, 5$, so $\angle APP' = 90^\circ$, and $\angle APB = 90^\circ + 60^\circ = 150^\circ$.` },
        { q: String.raw`What is the area of the region $|x + y| \le 1$, $|x - y| \le 1$?`, answer: "2",
          solution: String.raw`With $u = x + y$ and $v = x - y$, the region is the square $|u| \le 1$, $|v| \le 1$ of area $4$. The change multiplies areas by $|1 \cdot (-1) - 1 \cdot 1| = 2$, so the original area is $\tfrac42 = 2$. (It is a square with corners $(\pm1, 0)$, $(0, \pm1)$.)` }
      ],
      problems: [
        "2022 AMC 10A, Problem 18",
        "2021 Fall AMC 10B, Problem 17",
        "2006 AMC 10B, Problem 20",
        "2023 AMC 10A, Problem 19",
        "2025 AMC 10B, Problem 9",
        "2007 AMC 12A, Problem 13",
        "2008 AMC 12A, Problem 14",
        "2008 AMC 12B, Problem 17",
        "2020 AMC 10B, Problem 23",
        "2006 AMC 12B, Problem 23",
        "2018 AMC 12B, Problem 23"
      ]
    },
    "S10.5": {
      prereq: ["midsegment-theorem", "pythagorean-theorem", "equiangular-polygon", "equilateral-triangle-facts"],
      cards: ["british-flag-theorem", "varignons-theorem", "equiangular-hexagon-area"],
      body: String.raw`A point inside a rectangle is $3$, $4$ and $5$ from three corners: how far is it from the fourth? A quadrilateral has diagonals $6$ and $8$: what is the perimeter of the parallelogram of its midpoints? What is the area of an equiangular hexagon with sides $3, 1, 4, 2, 2, 3$? Three theorems that settle such questions in a line.

[[british-flag-theorem|The British flag theorem]] says that for any point $P$ and any rectangle $ABCD$, $PA^2 + PC^2 = PB^2 + PD^2$, opposite corners paired. Drop perpendiculars from $P$ to the sides: each squared distance is a sum of two squared pieces, and both sides of the equation use all four pieces once. With $PA = 3$, $PB = 4$, $PC = 5$, $PD^2 = 9 + 25 - 16 = 18$ and $PD = 3\sqrt2$. It holds for a point anywhere, even off the plane of the rectangle.

[[varignons-theorem|Varignon's theorem]] says that the midpoints of the sides of any quadrilateral form a parallelogram, each side parallel to a diagonal and half as long (S3.3), with half the quadrilateral's area. Diagonals of $6$ and $8$ give a parallelogram with sides $3$ and $4$, perimeter $14$.

[[equiangular-hexagon-area|An equiangular hexagon]] with sides $a, b, c, d, e, f$ in order is a big equilateral triangle of side $a + b + c$ with three corner triangles of sides $a$, $c$ and $e$ removed (S2.2), so its area is $\tfrac{\sqrt3}{4}\left[(a + b + c)^2 - a^2 - c^2 - e^2\right]$. For $3, 1, 4, 2, 2, 3$: $\tfrac{\sqrt3}{4}(64 - 9 - 16 - 4) = \tfrac{35\sqrt3}{4}$.

Pair opposite corners for the British flag theorem, halve the diagonals for Varignon's parallelogram, and complete an equiangular hexagon to an equilateral triangle. The next lesson measures the region around a figure.`,
      related: [
        { card: "coordinate-bash", note: String.raw`the coordinate proof of the British flag theorem (S7.4).` },
        { card: "quadrilateral-diagonal-area", note: String.raw`a quadrilateral's area from its diagonals (S2.3).` },
        { card: "equiangular-polygon", note: String.raw`the side relations of an equiangular polygon (S2.2).` }
      ],
      exercises: [
        { q: String.raw`A point $P$ inside rectangle $ABCD$ has $PA = 3$, $PB = 4$ and $PC = 5$. What is $PD^2$?`, answer: "18",
          solution: String.raw`By the British flag theorem, $PA^2 + PC^2 = PB^2 + PD^2$: $9 + 25 = 16 + PD^2$, so $PD^2 = 18$.` },
        { q: String.raw`A quadrilateral has diagonals of lengths $6$ and $8$. What is the perimeter of the parallelogram whose corners are the midpoints of its sides?`, answer: "14",
          solution: String.raw`Each side of that parallelogram is a midsegment of a triangle formed by a diagonal, so it is half that diagonal: two sides of $3$ and two of $4$, perimeter $14$.` },
        { q: String.raw`What is the area of the equiangular hexagon with sides $3, 1, 4, 2, 2, 3$ in order?`, answer: "35sqrt(3)/4",
          solution: String.raw`Extending sides $b$, $d$, $f$ makes an equilateral triangle of side $3 + 1 + 4 = 8$, with corner triangles of sides $3$, $4$ and $2$ cut off. So the area is $\tfrac{\sqrt3}{4}(64 - 9 - 16 - 4) = \tfrac{35\sqrt3}{4}$; the shoelace formula on the corners confirms it.` }
      ],
      problems: [
        "2022 AMC 8, Problem 18",
        "2008 AMC 10A, Problem 10",
        "2001 AMC 12, Problem 20",
        "2021 Spring AMC 12B, Problem 14",
        "2021 Spring AMC 10A, Problem 21",
        "2010 AMC 10A, Problem 19"
      ]
    },
    "S10.6": {
      prereq: ["circle-basics", "handshakes-diagonals", "am-gm"],
      cards: ["moser-circle", "steiner-neighborhood", "isoperimetric-facts"],
      body: String.raw`What is the area of the points within $1$ of a $3 \times 4$ rectangle? Into how many regions do the chords between $7$ points on a circle cut it? What is the largest area a triangle of perimeter $12$ can have? Three facts about regions.

[[steiner-neighborhood|The neighborhood of a figure]], the points within distance $r$ of it, has area equal to the figure's area plus its perimeter times $r$ plus a full circle $\pi r^2$: the strips along the sides add $Pr$, and the rounded corners together make one circle, since a convex figure's corners turn through $360^\circ$ in all. For the $3 \times 4$ rectangle with $r = 1$: $12 + 14 + \pi = 26 + \pi$. In space, a box's neighborhood adds its surface area times $r$, quarter cylinders along the edges and a sphere at the corners.

[[moser-circle|The regions cut by chords]] of $n$ points on a circle, no three chords meeting inside, number $1 + \binom n2 + \binom n4$: one region, plus one for each chord, plus one for each crossing of two chords. So $5$ points give $16$ and $7$ points $57$, and the doubling pattern $1, 2, 4, 8, 16$ breaks at $6$ points, with $31$.

[[isoperimetric-facts|The isoperimetric facts]] give the largest area for a perimeter: among all shapes the circle, $A \le \tfrac{P^2}{4\pi}$; among rectangles the square, $\tfrac{P^2}{16}$; among triangles the equilateral one, $\tfrac{P^2}{12\sqrt3}$. A rectangle of perimeter $20$ has area at most $25$, and a triangle of perimeter $12$ at most $\tfrac{144}{12\sqrt3} = 4\sqrt3$. Each is the AM-GM inequality in disguise: for a rectangle, $\ell w \le \left(\tfrac{\ell + w}{2}\right)^2$.

Add area, perimeter times $r$ and $\pi r^2$ for a neighborhood, count chords and crossings for regions in a circle, and expect the most symmetric shape to have the largest area. The Summary follows.`,
      related: [
        { card: "plane-regions", note: String.raw`regions cut by lines and circles in the plane (S6.4).` },
        { card: "am-gm", note: String.raw`the inequality behind every isoperimetric fact (L8).` },
        { card: "geometric-probability", note: String.raw`neighborhoods as the regions of a probability (R6.4).` }
      ],
      exercises: [
        { q: String.raw`What is the area of the set of points within distance $1$ of a $3 \times 4$ rectangle (the rectangle included)?`, answer: "26+pi",
          solution: String.raw`The rectangle has area $12$. The strips of width $1$ along its sides add $1 \cdot (3 + 4 + 3 + 4) = 14$, and the four quarter disks at the corners make one disk of area $\pi$. In all $26 + \pi$.` },
        { q: String.raw`Seven points on a circle are joined by all their chords, no three meeting at one point inside. Into how many regions is the disk cut?`, answer: "57",
          solution: String.raw`$1 + \binom72 + \binom74 = 1 + 21 + 35 = 57$: one region to start, one more for each chord, and one more for each crossing.` },
        { q: String.raw`What is the largest possible area of a triangle with perimeter $12$?`, answer: "4sqrt(3)",
          solution: String.raw`For a fixed perimeter the equilateral triangle has the most area. With side $4$, its area is $\tfrac{\sqrt3}{4} \cdot 16 = 4\sqrt3$.` }
      ],
      problems: [
        "2000 AMC 10, Problem 18",
        "2008 AMC 10A, Problem 17",
        "2021 Fall AMC 10A, Problem 19",
        "2020 AMC 10B, Problem 20",
        "2021 Spring AMC 10B, Problem 23",
        "2004 AMC 12A, Problem 24"
      ]
    },
    "S10.7": {
      prereq: ["conic-sections", "parabola-focus-directrix", "ellipse-properties", "hyperbola-properties", "conic-tangent-lines", "eccentricity", "parabolic-segment-area", "polar-coordinates", "tangency-equation", "determinant-geometric", "lattice-points-gcd", "vector-dot-product", "vector-projection", "reflection-composition", "rotation-reflection-matrices", "rotation-trick", "rotation-center", "linear-change-of-variables", "british-flag-theorem", "varignons-theorem", "equiangular-hexagon-area", "moser-circle", "steiner-neighborhood", "isoperimetric-facts"],
      cards: [],
      body: String.raw`[[conic-sections|The conics]] are read in standard form: [[ellipse-properties|an ellipse]] adds distances to its foci, [[hyperbola-properties|a hyperbola]] subtracts them, [[parabola-focus-directrix|a parabola]] balances a focus and a directrix, and [[eccentricity|the eccentricity]] unites them; [[conic-tangent-lines|tangent lines]] meet once, and [[parabolic-segment-area|a parabolic segment]] is $\tfrac43$ of its triangle.

[[polar-coordinates|Polar coordinates]], [[determinant-geometric|determinants]], [[lattice-points-gcd|lattice points on segments]] and [[tangency-equation|tangency equations]] are short coordinate tools.

[[vector-dot-product|The dot product]] and [[vector-projection|projections]] measure angles and shadows; [[reflection-composition|reflections compose]] into rotations, written as [[rotation-reflection-matrices|matrices]], with [[rotation-center|centers]] on perpendicular bisectors; [[rotation-trick|a rotation]] brings distances together; [[linear-change-of-variables|a change of variables]] scales areas.

[[british-flag-theorem|The British flag theorem]], [[varignons-theorem|Varignon's theorem]] and [[equiangular-hexagon-area|the equiangular hexagon]] settle quadrilaterals and hexagons; [[steiner-neighborhood|neighborhoods]], [[moser-circle|chord regions]] and [[isoperimetric-facts|isoperimetric facts]] settle regions.`,
      strategies: [
        String.raw`Complete the squares to put a conic in standard form, then read $a$, $b$ and $c$.`,
        String.raw`Use the focus property: sums for an ellipse, differences for a hyperbola, equal distances for a parabola.`,
        String.raw`Use the dot product for an angle and a determinant for an area.`,
        String.raw`When three distances from a point are given, rotate the figure to bring two of them together.`,
        String.raw`Change variables to turn a slanted region into a square, and divide by the area factor.`,
        String.raw`For the points near a figure, add its area, its perimeter times the distance, and a circle.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`An ellipse has foci $(\pm 4, 0)$ and the distances from any point on it to the foci add to $10$. What is its area?`, answer: "15pi",
        solution: String.raw`$2a = 10$ gives $a = 5$, and $c = 4$ gives $b = \sqrt{25 - 16} = 3$. The area is $\pi ab = 15\pi$.` },
      { q: String.raw`How many lattice points lie on the segment from $(0, 0)$ to $(6, 9)$, the ends included?`, answer: "4",
        solution: String.raw`$\gcd(6, 9) = 3$, so the lattice points are $k(2, 3)$ for $k = 0, 1, 2, 3$: four of them.` },
      { q: String.raw`For what $k$ are the vectors $(2, k)$ and $(3, -6)$ perpendicular?`, answer: "1",
        solution: String.raw`Perpendicular vectors have dot product $0$: $6 - 6k = 0$, so $k = 1$.` }
    ],
    problems: [
      "2007 AMC 12B, Problem 25",
      "2014 AMC 12A, Problem 25",
      "2007 AIME II, Problem 5",
      "1996 AIME, Problem 14"
    ]
  },
  challenge: {
    problems: [
      "2020 AMC 12A, Problem 24",
      "2025 AMC 12B, Problem 25",
      "2012 AIME I, Problem 13",
      "2021 AIME I, Problem 6",
      "2024 AIME I, Problem 9"
    ]
  }
};
