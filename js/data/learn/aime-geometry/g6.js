// Learn, AIME Geometry, chapter G6: transformations and vectors (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// The lessons hold all the chapter's contest problems, so the chapter has no separate review.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["G6"] = {
  lessons: {
    "G6.1": {
      prereq: ["distance-midpoint", "line-forms"],
      cards: ["reflection-coordinates", "reflection-composition", "rotation-90", "rotation-reflection-matrices", "composing-transformations", "rotated-line-angle"],
      body: String.raw`Reflections, rotations and translations move figures without changing their shape, and problems use them in two ways: they ask where a point ends up after a sequence of moves, or they ask which sequences return a figure to itself. Coordinates make each move a formula, and a few facts about combining moves make long sequences short.

A [[reflection-coordinates|reflection over a line]] has a simple formula for the common lines: over the $x$-axis $(x, y) \to (x, -y)$, over $y = x$ it swaps coordinates, over $y = -x$ it swaps and negates, and over $y = x + c$ it sends $(a, b)$ to $(b - c, a + c)$, so $(3, 1)$ goes to $(0, 4)$ over $y = x + 1$. For a general line, the image is found by dropping the perpendicular and going the same distance beyond. A [[rotation-90|rotation]] by $90^\circ$ counterclockwise about the origin sends $(x, y)$ to $(-y, x)$, so $(2, 5)$ goes to $(-5, 2)$; about another center, subtract the center, rotate, and add it back. A general rotation by $\theta$ is multiplication by the [[rotation-reflection-matrices|rotation matrix]] with rows $(\cos\theta, -\sin\theta)$ and $(\sin\theta, \cos\theta)$, and a reflection in the line at angle $\varphi$ has rows $(\cos 2\varphi, \sin 2\varphi)$ and $(\sin 2\varphi, -\cos 2\varphi)$.

[[composing-transformations|Composing transformations]] multiplies their matrices, and a few rules follow. [[reflection-composition|Two reflections]] in lines that meet at an angle $\alpha$ make a rotation by $2\alpha$ about the meeting point; in parallel lines, a translation by twice the distance between them. So reflections in lines at $30^\circ$ compose to a $60^\circ$ rotation, and a sequence of reflections reduces to a rotation or a translation followed by at most one reflection. A count of which sequences of moves return a figure to its start becomes a question about the symmetry group: the moves of a square form the eight symmetries of the square, and a sequence returns home exactly when its product is the identity.

A line rotated by $\theta$ about a point makes the [[rotated-line-angle|angle $\theta$ with its image]], so the image's slope follows from the tangent addition formula. Repeated reflections of a point across two lines, or of a graph across a line, often cycle with a small period, and finding the period answers questions about the hundredth image.

Write each move as a formula, combine reflections into rotations and translations, and look for the period of a repeated move. The next lesson does the same with complex numbers.`,
      related: [
        { card: "rotation-trick", note: String.raw`rotating part of a figure to bring distances together (G6.2).` },
        { card: "figure-symmetries", note: String.raw`the symmetry groups of polygons, where compositions live (G7.3).` },
        { card: "periodic-sequences", note: String.raw`the period of a repeated transformation.` }
      ],
      exercises: [
        { q: String.raw`The point $(3, 1)$ is reflected over the line $y = x + 1$. Find the sum of the coordinates of its image.`, answer: "4",
          solution: String.raw`Over $y = x + c$ a point $(a, b)$ goes to $(b - c, a + c)$; here $(1 - 1, 3 + 1) = (0, 4)$. Check: the midpoint $(1.5, 2.5)$ is on the line, and the segment has slope $-1$. The sum is $4$.` },
        { q: String.raw`Reflecting over a line $\ell_1$ and then over a line $\ell_2$ that meets $\ell_1$ at a $30^\circ$ angle is a rotation. By how many degrees?`, answer: "60",
          solution: String.raw`Two reflections in lines meeting at angle $\alpha$ make a rotation by $2\alpha$ about the meeting point, so here $60^\circ$.` }
      ],
      problems: [
        "2019 AMC 12B, Problem 3",
        "2004 AMC 12B, Problem 9",
        "2022 AMC 12B, Problem 5",
        "2021 Spring AMC 12B, Problem 5",
        "2003 AMC 12A, Problem 9",
        "2000 AMC 12, Problem 10",
        "2020 AMC 12A, Problem 12",
        "2022 AMC 12A, Problem 18",
        "2020 AMC 12B, Problem 19",
        "2020 AMC 12A, Problem 20",
        "2024 AMC 12A, Problem 25",
        "2000 AIME I, Problem 2",
        "1984 AIME, Problem 12",
        "1992 AIME, Problem 11",
        "1988 AIME, Problem 14",
        "2000 AIME II, Problem 11",
        "2025 AIME I, Problem 9"
      ]
    },
    "G6.2": {
      prereq: ["eulers-formula", "rotation-90"],
      cards: ["complex-bash", "rotation-trick", "rotation-center", "spiral-similarity"],
      body: String.raw`Complex numbers make rotations and scalings into multiplication, which is why they are the natural coordinates for figures built from equilateral triangles, regular polygons and repeated turns. They also explain the rotation trick, the standard way to bring three scattered distances into one triangle.

In [[complex-bash|complex bashing]], each point is a complex number; turning a point $z$ by $\theta$ about a center $c$ gives $c + e^{i\theta}(z - c)$, and scaling by $k$ about $c$ gives $c + k(z - c)$. A sequence of moves "turn by $\theta$, then step forward" is $z \to \omega z + d$ with $\omega = e^{i\theta}$, so after $n$ moves the position is $\omega^nz_0 + d(1 + \omega + \cdots + \omega^{n-1})$, a geometric series. Equilateral triangles are $c = a + e^{\pm i\pi/3}(b - a)$, and the vertices of a regular hexagon or an equilateral hexagon with given turns are sums of rotated steps.

The [[rotation-center|center of a rotation]] that takes one segment to another is found from two pairs of corresponding points: it lies on the perpendicular bisector of each pair. In complex numbers, a rotation by $\theta$ is $z \to e^{i\theta}(z - p) + p$, so its center $p$ solves a linear equation. The $90^\circ$ counterclockwise rotation that takes $1$ to $3 + 2i$ has $i(1 - p) + p = 3 + 2i$, so $p = 1 + 2i$, the point $(1, 2)$.

The [[rotation-trick|rotation trick]] moves part of a figure by a rotation so that scattered lengths become sides of one triangle. For a point $P$ inside a square $ABCD$ with $PA$, $PB$, $PC$ known, rotate triangle $BPA$ by $90^\circ$ about $B$ so that $A$ goes to $C$; the image $P'$ satisfies $BP' = BP$ with a right angle at $B$, so $PP' = \sqrt2 \cdot PB$, and triangle $PP'C$ has known sides. The same move with $60^\circ$ works in equilateral triangles.

A [[spiral-similarity|spiral similarity]] is a rotation combined with a scaling about the same center, $z \to c + k e^{i\theta}(z - c)$. Two similar triangles with the same orientation are related by one, and its center is the second intersection of two circles through corresponding points; in problems it explains why certain points are concyclic or why two triangles sharing a vertex are similar.

Use complex numbers when the figure is built from rotations, and rotate part of a figure to gather lengths. The next lesson uses vectors.`,
      related: [
        { card: "de-moivre", note: String.raw`powers of the rotation factor $e^{i\theta}$ (A6.3).` },
        { card: "point-in-equilateral", note: String.raw`the $60^\circ$ rotation in an equilateral triangle (G5.5).` },
        { card: "geometric-series", note: String.raw`the position after repeated turns and steps.` }
      ],
      exercises: [
        { q: String.raw`A $90^\circ$ counterclockwise rotation about a point $P$ takes $(1, 0)$ to $(3, 2)$. Find the sum of the coordinates of $P$.`, answer: "3",
          solution: String.raw`With $p = x + iy$, the rotation is $z \to i(z - p) + p$, so $i(1 - x - iy) + x + iy = (x + y) + i(1 - x + y)$. Setting this equal to $3 + 2i$: $x + y = 3$ and $y - x = 1$, so $P = (1, 2)$ and the sum is $3$.` }
      ],
      problems: [
        "2006 AMC 12B, Problem 23",
        "2025 AMC 12B, Problem 25",
        "2013 AIME II, Problem 4",
        "1994 AIME, Problem 8",
        "2020 AIME II, Problem 4",
        "2008 AIME II, Problem 9",
        "2012 AIME I, Problem 13",
        "2003 AIME II, Problem 14"
      ]
    },
    "G6.3": {
      prereq: ["distance-midpoint", "law-of-cosines"],
      cards: ["vector-dot-product", "vector-projection", "vector-bash", "closing-polygon-vectors"],
      body: String.raw`Vectors are coordinates without a choice of axes. A point is a vector from an origin, midpoints and centroids are averages, and lengths and angles come from the dot product. Problems with many midpoints, with a closed polygon of known side directions, or with right angles in three dimensions are often shortest in vector form.

The [[vector-dot-product|dot product]] $\vec u \cdot \vec v = u_1v_1 + u_2v_2 = |\vec u||\vec v|\cos\theta$ gives angles and tests perpendicularity: $(1, 2)$ and $(3, 1)$ have dot product $5$ and lengths $\sqrt5$ and $\sqrt{10}$, so the angle between them is $45^\circ$. Squared lengths are dot products, $|\vec u - \vec v|^2 = |\vec u|^2 + |\vec v|^2 - 2\vec u \cdot \vec v$, which is the law of cosines. The [[vector-projection|projection]] of $\vec u$ onto $\vec v$ has length $\tfrac{\vec u \cdot \vec v}{|\vec v|}$: $(3, 4)$ onto $(1, 1)$ gives $\tfrac{7}{\sqrt2} = \tfrac{7\sqrt2}{2}$. The closest point of a line to a given point is a projection, which is how "closest approach" questions are answered.

[[vector-bash|Vector bashing]] writes every point in terms of a few base vectors. The midpoint of $AB$ is $\tfrac{\vec A + \vec B}{2}$, the centroid is $\tfrac{\vec A + \vec B + \vec C}{3}$, and a segment joining two midpoints is half a combination of sides. With the circumcenter at the origin, the orthocenter is $\vec A + \vec B + \vec C$. Lengths are then computed by expanding dot products, using known lengths and angles of the base vectors.

[[closing-polygon-vectors|Closing a polygon]] means the side vectors add to zero. An equiangular hexagon has sides turning by $60^\circ$ each, so $a_1 + a_2\omega + \cdots + a_6\omega^5 = 0$ with $\omega = e^{i\pi/3}$, which gives linear conditions on the side lengths: $a_1 - a_4 = a_5 - a_2 = a_3 - a_6$. The same idea, with the sum of side vectors equal to zero, applies to any polygon with known angles.

Use vectors when a figure has many midpoints or averages, when perpendicularity or angles between directions matter, and when a closed polygon has known turning angles. The last lesson of the chapter uses transformations to find shortest paths and to scale figures.`,
      related: [
        { card: "coordinate-bash", note: String.raw`vectors with components, when axes help (G4.2).` },
        { card: "orthocenter-properties", note: String.raw`the vector formula for the orthocenter (G5.2).` },
        { card: "equiangular-polygon", note: String.raw`polygons whose closing condition gives side relations (G7.1).` }
      ],
      exercises: [
        { q: String.raw`Find the angle, in degrees, between the vectors $(1, 2)$ and $(3, 1)$.`, answer: "45",
          solution: String.raw`$\cos\theta = \tfrac{1 \cdot 3 + 2 \cdot 1}{\sqrt5 \cdot \sqrt{10}} = \tfrac{5}{\sqrt{50}} = \tfrac{1}{\sqrt2}$, so $\theta = 45^\circ$.` },
        { q: String.raw`Find the length of the projection of $(3, 4)$ onto the direction of $(1, 1)$.`, answer: "7sqrt(2)/2",
          solution: String.raw`The projection has length $\tfrac{(3, 4) \cdot (1, 1)}{|(1, 1)|} = \tfrac{7}{\sqrt2} = \tfrac{7\sqrt2}{2}$.` }
      ],
      problems: [
        "2007 AMC 12A, Problem 13",
        "2008 AMC 12B, Problem 17",
        "2018 AMC 12B, Problem 23",
        "2018 AMC 12A, Problem 23",
        "2007 AMC 12B, Problem 25",
        "2026 AIME I, Problem 14",
        "2023 AIME I, Problem 13"
      ]
    },
    "G6.4": {
      prereq: ["reflection-coordinates", "similar-figures-ratios"],
      cards: ["reflect-across-the-line", "homothety-monge", "axis-stretch-area", "linear-change-of-variables", "folded-paper"],
      body: String.raw`Some transformations are tools rather than subjects. Reflecting a path across a mirror turns a bent path into a straight one; a homothety relates two circles or two similar figures by a single scaling; stretching one axis turns an ellipse into a circle; folding a sheet is a reflection. Each turns a hard question into an easy one about the image.

[[reflect-across-the-line|Reflecting across a line]] solves shortest-path problems: the shortest path from $A$ to a line and then to $B$, with $A$ and $B$ on the same side, is found by reflecting $B$ across the line, since every path to $B$ via the line has the same length as a path to the reflection. From $A = (0, 1)$ to the $x$-axis and on to $B = (4, 3)$, the shortest length is the distance from $(0, -1)$ to $(4, 3)$, which is $4\sqrt2$. Light bouncing off mirrors, a ball bouncing off cushions, and paths on the surface of a box are handled the same way, by unfolding until the path is straight.

A [[homothety-monge|homothety]] with center $O$ and ratio $k$ sends each point $P$ to the point $P'$ on line $OP$ with $OP' = k \cdot OP$; it scales lengths by $|k|$ and areas by $k^2$. Two circles of different radii are related by two homotheties, whose centers are where the external and internal common tangents meet; for radii $2$ and $6$ with centers $8$ apart, the external center is $4$ beyond the small circle's center, on the far side from the large one. The centroid is the center of a homothety with ratio $-\tfrac12$ taking a triangle to its medial triangle.

[[axis-stretch-area|Stretching one axis]] by a factor $k$ multiplies all areas by $k$, so an ellipse $\tfrac{x^2}{a^2} + \tfrac{y^2}{b^2} = 1$, the unit circle stretched by $a$ and $b$, has area $\pi ab$; $\tfrac{x^2}{9} + \tfrac{y^2}{4} = 1$ has area $6\pi$. More generally, a [[linear-change-of-variables|linear change of variables]] $u = ax + by$, $v = cx + dy$ maps regions to regions and multiplies areas by $\tfrac{1}{|ad - bc|}$ going back, which simplifies regions bounded by lines like $|3x - 18| + |y + 7| \le 3$.

A [[folded-paper|fold]] is a reflection in the crease, so the crease is the perpendicular bisector of each point and its image, the folded part is congruent to its preimage, and lengths along the fold are preserved. Folding a corner of a rectangle onto the opposite corner, or a vertex onto a point of a side, produces right triangles whose sides follow from the Pythagorean theorem.

Reflect to straighten paths, use homotheties for similar figures and pairs of circles, stretch axes to simplify areas, and treat a fold as a reflection. The next chapter studies polygons.`,
      related: [
        { card: "unfold-the-surface", note: String.raw`unfolding a solid's surface to straighten a path on it (G8.5).` },
        { card: "common-tangent-lengths", note: String.raw`the tangents through the homothety centers of two circles (G2.6).` },
        { card: "perpendicular-bisector-locus", note: String.raw`the crease of a fold as a perpendicular bisector (G4.6).` }
      ],
      exercises: [
        { q: String.raw`A path goes from $A = (0, 1)$ to a point on the $x$-axis and then to $B = (4, 3)$. Find the shortest possible length.`, answer: "4sqrt(2)",
          solution: String.raw`Reflect $A$ across the $x$-axis to $A' = (0, -1)$. Every such path has the same length as the path from $A'$ to the point and on to $B$, which is at least $A'B = \sqrt{16 + 16} = 4\sqrt2$, with equality for the straight line.` },
        { q: String.raw`Find the area enclosed by the ellipse $\tfrac{x^2}{9} + \tfrac{y^2}{4} = 1$.`, answer: "6pi",
          solution: String.raw`The ellipse is the unit circle stretched by $3$ horizontally and $2$ vertically, which multiplies the area $\pi$ by $3 \cdot 2$, giving $6\pi$.` }
      ],
      problems: [
        "2021 Spring AMC 12A, Problem 11",
        "2014 AMC 12A, Problem 20",
        "2008 AMC 12A, Problem 14",
        "2006 AMC 12A, Problem 19",
        "2007 AMC 12B, Problem 22",
        "2018 AMC 12A, Problem 11",
        "2018 AMC 12B, Problem 11",
        "2023 AMC 12B, Problem 25",
        "1985 AIME, Problem 11",
        "1994 AIME, Problem 14",
        "2002 AIME I, Problem 11",
        "2004 AIME II, Problem 7",
        "2013 AIME I, Problem 9",
        "2022 AIME II, Problem 7",
        "1994 AIME, Problem 15"
      ]
    }
  }
};
