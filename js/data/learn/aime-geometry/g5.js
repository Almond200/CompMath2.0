// Learn, AIME Geometry, chapter G5: triangle centers and special figures (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// Few contest problems in the database need these facts on their own, so the lessons hold all of
// them and the chapter has no separate review.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["G5"] = {
  lessons: {
    "G5.1": {
      prereq: ["angle-bisector-theorem", "inscribed-angle-theorem"],
      cards: ["incenter-excenter-lemma", "perp-to-angle-bisector", "triangle-center-angles", "angle-bisector-circumcircle"],
      body: String.raw`The incenter, where the angle bisectors meet, is tied to the circumcircle by a surprising fact: the bisector from $A$ meets the circumcircle again at a point equidistant from $B$, $C$ and the incenter. That fact, the angles at the centers, and a perpendicular dropped to a bisector solve most problems about incenters and excenters on the AIME.

The [[angle-bisector-circumcircle|angle bisector from $A$, extended to the circumcircle]], meets it at the midpoint $M$ of arc $BC$ not containing $A$, since equal inscribed angles cut equal arcs. The [[incenter-excenter-lemma|incenter-excenter lemma]] says that $MB = MC = MI = MI_A$, where $I$ is the incenter and $I_A$ the excenter opposite $A$: the circle centered at $M$ through $B$ and $C$ passes through both. The proof is an angle chase, $\angle MBI = \angle MIB = \tfrac{A + B}{2}$. It turns lengths involving the incenter into chords of the circumcircle, and with power of a point it gives $AI \cdot IM = 2Rr$.

The [[triangle-center-angles|angles at the triangle centers]] follow from the inscribed angle theorem: $\angle BIC = 90^\circ + \tfrac A2$, $\angle BOC = 2A$, and $\angle BHC = 180^\circ - A$ for the orthocenter $H$ of an acute triangle. With $A = 50^\circ$, $\angle BIC = 115^\circ$. When $A = 60^\circ$ all three are $120^\circ$, so $B$, $C$, $I$, $O$ and $H$ lie on one circle, a frequent hidden structure.

A [[perp-to-angle-bisector|perpendicular from a vertex to an angle bisector]] creates an isosceles triangle: if the perpendicular from $B$ to the bisector of angle $A$ meets line $AC$ at $B'$, then $AB' = AB$, and the foot is the midpoint of $BB'$. So the foot lies on the midline of the triangle, and its distance from the midpoint of $BC$ is $\tfrac{|AB - AC|}{2}$. Problems with perpendiculars to bisectors become problems about midsegments.

Use the arc midpoint whenever a bisector meets the circumcircle, the center angles to find hidden cyclic quadrilaterals, and the reflection across a bisector for perpendiculars. The next lesson studies the circumcenter, orthocenter and centroid together.`,
      related: [
        { card: "inradius-area", note: String.raw`the incircle's radius from the area (G2.4).` },
        { card: "euler-distance-theorem", note: String.raw`$OI^2 = R(R - 2r)$, which the incenter-excenter lemma proves (G5.2).` },
        { card: "midsegment-theorem", note: String.raw`where the foot of a perpendicular to a bisector lands (G1.2).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $\angle A = 50^\circ$, and $I$ is the incenter. Find $\angle BIC$ in degrees.`, answer: "115",
          solution: String.raw`$\angle IBC + \angle ICB = \tfrac{B + C}{2} = \tfrac{180^\circ - 50^\circ}{2} = 65^\circ$, so $\angle BIC = 180^\circ - 65^\circ = 115^\circ = 90^\circ + \tfrac{A}{2}$.` }
      ],
      problems: [
        "2008 AMC 12B, Problem 25",
        "2011 AMC 12A, Problem 25",
        "2001 AIME II, Problem 7",
        "2016 AIME I, Problem 6",
        "2003 AIME I, Problem 15",
        "2022 AIME II, Problem 11",
        "2020 AIME I, Problem 13",
        "2022 AIME I, Problem 14"
      ]
    },
    "G5.2": {
      prereq: ["centroid-division", "circumradius-area"],
      cards: ["orthocenter-properties", "euler-line-ratio", "nine-point-circle", "euler-distance-theorem"],
      body: String.raw`The circumcenter $O$, centroid $G$ and orthocenter $H$ of a triangle lie on one line, the Euler line, with $G$ between them and $HG = 2GO$. With the nine-point circle and the formulas for distances between centers, this gives a small toolkit for problems that mention several centers at once.

The [[orthocenter-properties|orthocenter]] has reflection properties: reflecting $H$ over any side, or over the midpoint of any side, lands on the circumcircle. So $AH = 2R\cos A$, the distance from $H$ to a side is $2R\cos B\cos C$, and the circle through $B$, $H$, $C$ is congruent to the circumcircle. In a right triangle $H$ is the right-angle vertex; in an obtuse triangle it lies outside.

The [[euler-line-ratio|Euler line]] relation $\overrightarrow{OH} = \overrightarrow{OA} + \overrightarrow{OB} + \overrightarrow{OC}$ (with $O$ as origin) gives $H = 3G - 2O$, so $G$ divides $OH$ in the ratio $1 : 2$, and $OH^2 = 9R^2 - (a^2 + b^2 + c^2)$. The [[nine-point-circle|nine-point circle]] passes through the midpoints of the sides, the feet of the altitudes, and the midpoints of $AH$, $BH$, $CH$; its center is the midpoint of $OH$ and its radius is $\tfrac R2$. A problem that names three midpoints or three feet of altitudes is usually about this circle.

[[euler-distance-theorem|Euler's distance formula]] $OI^2 = R(R - 2r)$ relates the circumcenter, the incenter and the two radii; it shows $R \ge 2r$, with equality only for an equilateral triangle. For the $13$-$14$-$15$ triangle, $R = \tfrac{65}{8}$ and $r = 4$, so $OI^2 = \tfrac{65}{8} \cdot \tfrac18 = \tfrac{65}{64}$ and $OI = \tfrac{\sqrt{65}}{8}$. The excenters satisfy $OI_A^2 = R(R + 2r_A)$.

When several centers appear, place them on the Euler line, use the nine-point circle for midpoints and feet, and Euler's formula for the incenter. The next lesson studies the triangles formed by midpoints and feet.`,
      related: [
        { card: "vector-bash", note: String.raw`the vector identity $H = A + B + C$ with the circumcenter at the origin (G6.3).` },
        { card: "incenter-excenter-lemma", note: String.raw`the source of Euler's distance formula (G5.1).` },
        { card: "homothety-monge", note: String.raw`the homothety at $G$ with ratio $-\tfrac12$ that takes $H$ to $O$ (G6.4).` }
      ],
      exercises: [
        { q: String.raw`The triangle with sides $13$, $14$, $15$ has circumradius $\tfrac{65}{8}$ and inradius $4$. Find the distance between its circumcenter and incenter.`, answer: "sqrt(65)/8",
          solution: String.raw`By Euler's formula $OI^2 = R(R - 2r) = \tfrac{65}{8}\left(\tfrac{65}{8} - 8\right) = \tfrac{65}{8} \cdot \tfrac18 = \tfrac{65}{64}$, so $OI = \tfrac{\sqrt{65}}{8}$.` }
      ],
      problems: [
        "2018 AMC 12B, Problem 8",
        "2016 AMC 12A, Problem 17",
        "2022 AMC 12B, Problem 19",
        "2019 AMC 12B, Problem 25",
        "2025 AIME II, Problem 5",
        "2020 AIME I, Problem 15",
        "2024 AIME II, Problem 10"
      ]
    },
    "G5.3": {
      prereq: ["midsegment-theorem", "centroid-division"],
      cards: ["medial-triangle", "orthic-triangle", "median-triangle-area", "vivianis-theorem"],
      body: String.raw`Joining special points of a triangle gives new triangles with predictable shapes. The midpoints of the sides form the medial triangle, a half-size copy; the feet of the altitudes form the orthic triangle, whose angles are simple functions of the original angles; and the three medians themselves, moved end to end, form a triangle with a fixed fraction of the area. Problems that build a sequence of triangles by repeating such a construction need these facts.

The [[medial-triangle|medial triangle]] has sides half of the original and parallel to them, area one quarter, and the same centroid; the original's circumcenter is its orthocenter. Repeating the construction scales by $\tfrac12$ each time, so areas form a geometric sequence with ratio $\tfrac14$.

The [[orthic-triangle|orthic triangle]] of an acute triangle has angles $180^\circ - 2A$, $180^\circ - 2B$, $180^\circ - 2C$, and the original altitudes are its angle bisectors, so the orthocenter is its incenter. Its sides are $a\cos A$, $b\cos B$, $c\cos C$. Iterating the orthic construction maps the angles by $x \to 180^\circ - 2x$, a process whose behavior is found by tracking the deviation from $60^\circ$, which doubles and changes sign each time.

The three medians of any triangle can form a triangle, and its area is $\tfrac34$ of the original: this is the [[median-triangle-area|area from the medians]]. Conversely, a triangle with medians $9$, $12$, $15$ has area $\tfrac43$ of the $9$-$12$-$15$ triangle, $\tfrac43 \cdot 54 = 72$.

[[vivianis-theorem|Viviani's theorem]] says the distances from any point inside an equilateral triangle to the three sides add to its height, since the three small triangles with apex at the point fill the whole. In an equilateral triangle of side $6$ the sum is $3\sqrt3$. For a point outside, or for signed distances, the same identity holds with signs.

Recognize medial and orthic triangles in repeated constructions, and use areas to relate distances to sides. The next lesson treats Ceva's and Menelaus's theorems.`,
      related: [
        { card: "similar-figures-ratios", note: String.raw`the area ratio $\tfrac14$ of the medial triangle (B5.1).` },
        { card: "nine-point-circle", note: String.raw`the circle through the vertices of both the medial and the orthic triangle (G5.2).` },
        { card: "geometric-series", note: String.raw`adding the areas of repeated medial triangles.` }
      ],
      exercises: [
        { q: String.raw`A triangle has medians of lengths $9$, $12$ and $15$. Find its area.`, answer: "72",
          solution: String.raw`The triangle with sides $9$, $12$, $15$ is right with area $54$, and a triangle's area is $\tfrac43$ of the area of the triangle formed by its medians: $\tfrac43 \cdot 54 = 72$.` },
        { q: String.raw`A point inside an equilateral triangle of side $6$ is at distances $a$, $b$, $c$ from the three sides. Find $a + b + c$.`, answer: "3sqrt(3)",
          solution: String.raw`The three triangles with apex at the point and the sides as bases fill the triangle, so $\tfrac12 \cdot 6(a + b + c)$ equals the area $9\sqrt3$. So $a + b + c = 3\sqrt3$, the height.` }
      ],
      problems: [
        "2007 AMC 12B, Problem 14",
        "2019 AMC 12A, Problem 25",
        "2023 AIME I, Problem 12",
        "2019 AIME II, Problem 15"
      ]
    },
    "G5.4": {
      prereq: ["mass-points", "cevian-area-ratio"],
      cards: ["cevas-theorem", "menelaus-theorem", "trig-ceva"],
      body: String.raw`Two classical theorems describe ratios along the sides of a triangle. Ceva's theorem says when three cevians meet at one point, and Menelaus's theorem says when three points on the side lines lie on one line. Both are products of three ratios equal to $1$, and both give ratios that mass points find by a different route.

[[cevas-theorem|Ceva's theorem]]: cevians $AD$, $BE$, $CF$ of triangle $ABC$ meet at one point exactly when $\tfrac{BD}{DC} \cdot \tfrac{CE}{EA} \cdot \tfrac{AF}{FB} = 1$. If $BD : DC = 2$ and $CE : EA = 3$, the third cevian through their meeting point has $\tfrac{AF}{FB} = \tfrac16$. The theorem proves the medians, the bisectors and the altitudes are concurrent, and it locates the third foot when two are known. [[trig-ceva|Trigonometric Ceva]] states the same condition with the angles the cevians make at the vertices, $\tfrac{\sin\angle BAD}{\sin\angle DAC} \cdot \tfrac{\sin\angle CBE}{\sin\angle EBA} \cdot \tfrac{\sin\angle ACF}{\sin\angle FCB} = 1$, which is the version to use when the data are angles.

[[menelaus-theorem|Menelaus's theorem]]: points $D$, $E$, $F$ on lines $BC$, $CA$, $AB$ are collinear exactly when $\tfrac{BD}{DC} \cdot \tfrac{CE}{EA} \cdot \tfrac{AF}{FB} = -1$ with signed ratios (or $1$ for unsigned ratios, with one or three of the points outside the segments). It finds the ratio in which a transversal cuts a side or a cevian: to find how a line cuts a cevian $AD$, apply Menelaus to triangle $ABD$ or $ADC$ with the line as transversal.

Mass points, area ratios, Ceva and Menelaus all compute the same ratios. Mass points are fastest for two cevians; Menelaus is best for a line that crosses a triangle; Ceva is the test for concurrence. The next lesson collects some recurring figures.`,
      related: [
        { card: "mass-points", note: String.raw`the same ratios by balancing weights (G1.5).` },
        { card: "ratio-lemma", note: String.raw`each factor of trigonometric Ceva as a ratio of sides (G3.3).` },
        { card: "barycentric-coordinates", note: String.raw`coordinates in which Ceva and Menelaus become determinant conditions (G9.1).` }
      ],
      exercises: [
        { q: String.raw`Cevians $AD$, $BE$, $CF$ of triangle $ABC$ meet at one point, with $\tfrac{BD}{DC} = 2$ and $\tfrac{CE}{EA} = 3$. Find $\tfrac{AF}{FB}$.`, answer: "1/6",
          solution: String.raw`By Ceva, $\tfrac{BD}{DC} \cdot \tfrac{CE}{EA} \cdot \tfrac{AF}{FB} = 1$, so $2 \cdot 3 \cdot \tfrac{AF}{FB} = 1$ and $\tfrac{AF}{FB} = \tfrac16$.` }
      ],
      problems: ["2011 AIME II, Problem 4"]
    },
    "G5.5": {
      prereq: ["equilateral-triangle-facts", "tangent-facts"],
      cards: ["point-in-equilateral", "circle-in-angle", "fermat-point", "symmedian-lemoine", "simson-line"],
      body: String.raw`Some figures recur often enough to be recognized on sight: a point inside an equilateral triangle with given distances to the vertices, circles inscribed in an angle, the point that minimizes the total distance to three vertices, the reflection of a median in a bisector, and the feet of perpendiculars from a point on the circumcircle. Each has a standard move.

For a [[point-in-equilateral|point inside an equilateral triangle]] with distances $PA$, $PB$, $PC$ given, rotate the figure $60^\circ$ about a vertex: the rotation takes $P$ to a point $P'$ with $PP' = PB$ (an equilateral triangle $BPP'$) and $P'C = PA$, so the three distances become the sides of one triangle, and the angle at $P$ follows. This is how the side of the equilateral triangle is found from the three distances.

A [[circle-in-angle|circle inscribed in an angle]] has its center on the bisector; with angle $2\theta$ and radius $r$, the center is at distance $\tfrac{r}{\sin\theta}$ from the vertex, so in a $60^\circ$ angle a circle of radius $3$ has center $6$ from the vertex. Circles inscribed in the same angle and tangent to each other form a geometric sequence of radii, with ratio $\tfrac{1 - \sin\theta}{1 + \sin\theta}$.

The [[fermat-point|Fermat point]] minimizes $PA + PB + PC$; when all angles are below $120^\circ$, it is the point from which each side subtends $120^\circ$, and the minimum equals the length from a vertex to the far vertex of the equilateral triangle erected on the opposite side. For an equilateral triangle of side $1$ it is the center, with sum $\sqrt3$. A [[symmedian-lemoine|symmedian]] is a median reflected in the angle bisector; it divides the opposite side in the ratio of the squares of the adjacent sides, and the tangents to the circumcircle at $B$ and $C$ meet on the symmedian from $A$. The [[simson-line|Simson line]] says that the feet of the perpendiculars from a point on the circumcircle to the three side lines are collinear.

When one of these figures appears, apply its standard move: rotate by $60^\circ$, put centers on bisectors, erect equilateral triangles, or reflect medians. The next chapter studies transformations in general.`,
      related: [
        { card: "rotation-trick", note: String.raw`rotating part of a figure to bring three lengths into one triangle (G6.2).` },
        { card: "law-cosines-60-120", note: String.raw`the $120^\circ$ angles at the Fermat point (G3.1).` },
        { card: "geometric-series", note: String.raw`the radii of a chain of circles in an angle.` }
      ],
      exercises: [
        { q: String.raw`A circle of radius $3$ is tangent to both sides of a $60^\circ$ angle. Find the distance from the vertex of the angle to the center of the circle.`, answer: "6",
          solution: String.raw`The center is on the bisector, which makes $30^\circ$ with each side. The radius to a point of tangency is perpendicular to that side, so $\sin 30^\circ = \tfrac{3}{d}$ and $d = 6$.` },
        { q: String.raw`For an equilateral triangle of side $1$, find the smallest possible value of $PA + PB + PC$.`, answer: "sqrt(3)",
          solution: String.raw`The minimum is at the Fermat point, which here is the center, at distance $\tfrac{1}{\sqrt3}$ from each vertex. The sum is $\tfrac{3}{\sqrt3} = \sqrt3$.` }
      ],
      problems: [
        "2008 AMC 12A, Problem 13",
        "2020 AMC 12A, Problem 24",
        "2022 AIME I, Problem 8",
        "2024 AIME I, Problem 8"
      ]
    }
  }
};
