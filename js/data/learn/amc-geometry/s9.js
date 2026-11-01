// Learn, AMC Geometry, chapter S9: triangles and circles for the AMC 12 (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S9"] = {
  lessons: {
    "S9.1": {
      prereq: ["law-of-cosines", "inscribed-angle-theorem", "tangent-circles", "herons-formula"],
      cards: [],
      body: String.raw`The hard problems of the AMC 12 use a second layer of triangle and circle facts: the law of sines and the trigonometry around it, formulas for cevians, theorems about quadrilaterals inscribed in or drawn around circles, the tangents and centers of touching circles, and a few special points of a triangle. Each extends a tool from the Core chapters.

The law of sines ties every side to the circle through the corners: $\tfrac{a}{\sin A} = 2R$, so a triangle with an angle of $30^\circ$ opposite a side of $5$ has circumradius $5$. The circumradius also comes from the sides and the area, $R = \tfrac{abc}{4A}$: $\tfrac{13 \cdot 14 \cdot 15}{4 \cdot 84} = \tfrac{65}{8}$ for the $13$-$14$-$15$ triangle. And a median has a length fixed by the sides: in a $6$-$8$-$10$ triangle the median to the side $10$ is $5$, which here is the right triangle's median to the hypotenuse.

The lessons take these ideas in turn: the law of sines and trigonometry in triangles (S9.2), cevians (S9.3), cyclic and tangential quadrilaterals (S9.4), circles that touch (S9.5), and the orthocenter, the excircles and the Euler line (S9.6). The Summary (S9.7) collects the strategies.`,
      exercises: [
        { q: String.raw`In a triangle, the side opposite an angle of $30^\circ$ has length $5$. What is the radius of the circle through the corners?`, answer: "5",
          solution: String.raw`By the law of sines, $\tfrac{a}{\sin A} = 2R$: $\tfrac{5}{1/2} = 10 = 2R$, so $R = 5$.` },
        { q: String.raw`What is the circumradius of the triangle with sides $13$, $14$ and $15$?`, answer: "65/8",
          solution: String.raw`The area is $84$, and $R = \tfrac{abc}{4A} = \tfrac{2730}{336} = \tfrac{65}{8}$.` },
        { q: String.raw`A triangle has sides $6$, $8$ and $10$. How long is the median to the side $10$?`, answer: "5",
          solution: String.raw`The triangle is right-angled, and the median to the hypotenuse is half of it: $5$. (Apollonius's theorem gives $\tfrac12\sqrt{2 \cdot 36 + 2 \cdot 64 - 100} = 5$ too.)` }
      ],
      problems: [
        "2007 AMC 10B, Problem 11",
        "2023 AMC 10A, Problem 13",
        "2004 AMC 10B, Problem 24"
      ]
    },
    "S9.2": {
      prereq: ["law-of-cosines", "trig-area", "inscribed-angle-theorem", "special-right-triangles"],
      cards: ["law-of-sines", "circumradius-area", "projection-formula", "pythagorean-identities", "common-angle-values", "reduction-identities"],
      body: String.raw`A triangle has $A = 45^\circ$, $B = 60^\circ$ and $a = \sqrt2$: how long is $b$? What is the circumradius of a triangle with sides $13$, $14$, $15$? If $\cos\theta = \tfrac35$, what is $\tan\theta$? Trigonometry in a triangle needs a handful of identities and one more law.

[[law-of-sines|The law of sines]] says $\tfrac{a}{\sin A} = \tfrac{b}{\sin B} = \tfrac{c}{\sin C} = 2R$. The reason is an inscribed angle: the diameter through $B$ makes a right triangle with the side $a$ opposite an angle equal to $A$, so $a = 2R\sin A$. With two angles and a side it gives the other sides: $b = \tfrac{a\sin B}{\sin A} = \tfrac{\sqrt2 \cdot \sqrt3/2}{\sqrt2/2} = \sqrt3$. It also says that the larger side faces the larger angle, and that a chord is $2R$ times the sine of any inscribed angle on it.

[[circumradius-area|The circumradius]] from the sides is $R = \tfrac{abc}{4A}$, which combines $A = \tfrac12 ab\sin C$ with $c = 2R\sin C$: $\tfrac{65}{8}$ for $13$-$14$-$15$. [[projection-formula|The projection formula]] $a = b\cos C + c\cos B$ says that a side is the sum of the shadows of the other two sides on it, which is what dropping a height does.

[[common-angle-values|The common angles]] $30^\circ$, $45^\circ$, $60^\circ$ have sines $\tfrac12$, $\tfrac{\sqrt2}{2}$, $\tfrac{\sqrt3}{2}$ and the cosines in reverse, read from the special right triangles. [[pythagorean-identities|The Pythagorean identities]] $\sin^2\theta + \cos^2\theta = 1$ and $1 + \tan^2\theta = \sec^2\theta$ turn one function into another: $\cos\theta = \tfrac35$ gives $\sin\theta = \tfrac45$ for an angle of a triangle, so $\tan\theta = \tfrac43$, the $3$-$4$-$5$ triangle. [[reduction-identities|The reduction identities]] move angles: $\sin(180^\circ - \theta) = \sin\theta$ and $\cos(180^\circ - \theta) = -\cos\theta$, so in a triangle $\sin A = \sin(B + C)$ and $\cos A = -\cos(B + C)$, and $\cos(90^\circ - \theta) = \sin\theta$.

Use the law of sines with two angles and a side or with the circumradius, $\tfrac{abc}{4A}$ for $R$ from the sides, and the identities to pass between sine, cosine and tangent. The next lesson measures cevians.`,
      related: [
        { card: "angle-addition", note: String.raw`the sines and cosines of sums, $\sin(B + C)$ (L12.2).` },
        { card: "chord-length", note: String.raw`a chord as $2R\sin\tfrac\theta2$ (S5.2).` },
        { card: "law-of-cosines", note: String.raw`the other law, for two sides and the angle between them (S4.6).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $A = 45^\circ$, $B = 60^\circ$ and $a = \sqrt2$. How long is $b$?`, answer: "sqrt(3)",
          solution: String.raw`By the law of sines, $b = \tfrac{a\sin B}{\sin A} = \tfrac{\sqrt2 \cdot \tfrac{\sqrt3}{2}}{\tfrac{\sqrt2}{2}} = \sqrt3$.` },
        { q: String.raw`A triangle has a side of $7$ opposite an angle of $30^\circ$. What is its circumradius?`, answer: "7",
          solution: String.raw`$2R = \tfrac{7}{\sin 30^\circ} = 14$, so $R = 7$.` },
        { q: String.raw`An angle $\theta$ of a triangle has $\cos\theta = \tfrac35$. What is $\tan\theta$?`, answer: "4/3",
          solution: String.raw`$\sin^2\theta = 1 - \tfrac{9}{25} = \tfrac{16}{25}$, and $\sin\theta \gt 0$ in a triangle, so $\sin\theta = \tfrac45$ and $\tan\theta = \tfrac{4/5}{3/5} = \tfrac43$.` },
        { q: String.raw`In triangle $ABC$, $\cos A = \tfrac13$. What is $\cos(B + C)$?`, answer: "-1/3",
          solution: String.raw`$B + C = 180^\circ - A$, and $\cos(180^\circ - A) = -\cos A = -\tfrac13$.` }
      ],
      problems: [
        "2019 AMC 12A, Problem 19",
        "2021 Fall AMC 12B, Problem 9",
        "2011 AMC 12B, Problem 20",
        "2004 AMC 10A, Problem 25",
        "2006 AMC 12A, Problem 15",
        "2010 AMC 12B, Problem 20",
        "2014 AMC 12B, Problem 21",
        "2021 Fall AMC 12B, Problem 13",
        "2025 AMC 10A, Problem 23",
        "2007 AMC 12A, Problem 24"
      ]
    },
    "S9.3": {
      prereq: ["law-of-cosines", "angle-bisector-theorem", "cevian-area-ratio", "midsegment-theorem", "equilateral-triangle-facts"],
      cards: ["stewarts-theorem", "angle-bisector-length", "apollonius-theorem", "cevas-theorem", "medial-triangle", "vivianis-theorem", "area-method"],
      body: String.raw`How long is a cevian that cuts the base of an isosceles triangle $5$, $5$, $6$ into $2$ and $4$? How long is the bisector from the corner between sides $6$ and $9$ when the third side is $10$? When do three cevians meet at one point? A cevian, a segment from a corner to the opposite side, has a length and ratios that the sides fix.

[[stewarts-theorem|Stewart's theorem]] gives the length $d$ of a cevian from $A$ that cuts $BC = a$ into $BD = m$ and $DC = n$: $b^2m + c^2n = a(d^2 + mn)$, with $b = CA$ and $c = AB$. It is the law of cosines at $D$ written for both triangles, with the cosines cancelling. For the isosceles triangle, $25 \cdot 2 + 25 \cdot 4 = 6(d^2 + 8)$, so $d^2 = 17$ and $d = \sqrt{17}$. [[apollonius-theorem|Apollonius's theorem]] is the case of a median: $m_a = \tfrac12\sqrt{2b^2 + 2c^2 - a^2}$, so the median to the side $8$ in a $5$-$7$-$8$ triangle is $\sqrt{21}$. [[angle-bisector-length|The angle bisector's length]] is the case of a bisector, $d^2 = bc - mn$: with sides $6$ and $9$ and the third side $10$ cut into $4$ and $6$, $d^2 = 54 - 24 = 30$.

[[cevas-theorem|Ceva's theorem]] says that cevians $AD$, $BE$, $CF$ meet at one point exactly when $\tfrac{AF}{FB} \cdot \tfrac{BD}{DC} \cdot \tfrac{CE}{EA} = 1$; so with $\tfrac{AF}{FB} = 2$ and $\tfrac{BD}{DC} = 3$, the third ratio is $\tfrac16$. It is mass points (S3.5) run backward, and [[area-method|the area method]] proves it: each ratio on a side is a ratio of areas of triangles with the same height.

[[medial-triangle|The medial triangle]], with corners at the midpoints of the sides, is similar to the whole with ratio $\tfrac12$, so it has a quarter of the area, $10$ out of $40$, and half the perimeter. [[vivianis-theorem|Viviani's theorem]] says that from any point inside an equilateral triangle the distances to the three sides add to the height (S4.4); in any triangle, the distances weighted by the sides add to twice the area.

Use Stewart's theorem for any cevian, its median and bisector cases when they apply, Ceva's product for concurrence, and areas to prove ratios. The next lesson puts quadrilaterals around and inside circles.`,
      related: [
        { card: "mass-points", note: String.raw`the ratios on concurrent cevians found by balancing (S3.5).` },
        { card: "median-doubling", note: String.raw`a median handled by completing a parallelogram (S4.3).` },
        { card: "menelaus-theorem", note: String.raw`the companion product for a line cutting the three sides.` }
      ],
      exercises: [
        { q: String.raw`Triangle $ABC$ has $AB = AC = 5$ and $BC = 6$. Point $D$ on $BC$ has $BD = 2$. What is $AD^2$?`, answer: "17",
          solution: String.raw`By Stewart's theorem with $m = BD = 2$, $n = DC = 4$: $AC^2 \cdot 2 + AB^2 \cdot 4 = 6(AD^2 + 8)$, so $150 = 6AD^2 + 48$ and $AD^2 = 17$. Check: with $A = (0, 4)$, $B = (-3, 0)$, $D = (-1, 0)$, $AD^2 = 1 + 16 = 17$.` },
        { q: String.raw`A triangle has sides $5$, $7$ and $8$. What is the square of the median to the side $8$?`, answer: "21",
          solution: String.raw`$m^2 = \tfrac{2 \cdot 25 + 2 \cdot 49 - 64}{4} = \tfrac{84}{4} = 21$.` },
        { q: String.raw`In triangle $ABC$, $AB = 6$, $AC = 9$ and $BC = 10$. What is the square of the length of the bisector of angle $A$?`, answer: "30",
          solution: String.raw`The bisector cuts $BC$ into $4$ and $6$ (ratio $6 : 9$). Then $d^2 = AB \cdot AC - 4 \cdot 6 = 54 - 24 = 30$.` },
        { q: String.raw`Cevians $AD$, $BE$, $CF$ of triangle $ABC$ meet at one point, with $\tfrac{AF}{FB} = 2$ and $\tfrac{BD}{DC} = 3$. What is $\tfrac{CE}{EA}$?`, answer: "1/6",
          solution: String.raw`By Ceva's theorem the three ratios multiply to $1$: $2 \cdot 3 \cdot \tfrac{CE}{EA} = 1$, so $\tfrac{CE}{EA} = \tfrac16$.` },
        { q: String.raw`A triangle has area $40$. What is the area of the triangle whose corners are the midpoints of its sides?`, answer: "10",
          solution: String.raw`The medial triangle is similar to the whole with ratio $\tfrac12$, so its area is a quarter: $10$.` }
      ],
      problems: [
        "2021 Spring AMC 12B, Problem 11",
        "2002 AMC 12B, Problem 23"
      ]
    },
    "S9.4": {
      prereq: ["cyclic-opposite-angles", "cyclic-equal-angles", "incircle-tangent-lengths", "herons-formula", "triangle-similarity"],
      cards: ["ptolemys-theorem", "brahmaguptas-formula", "pitots-theorem", "perp-to-angle-bisector"],
      body: String.raw`A quadrilateral inscribed in a circle has sides $3$, $4$, $5$, $6$ in order: what is the product of its diagonals, and its area? A quadrilateral drawn around a circle has three sides $7$, $9$, $8$: what is the fourth? Quadrilaterals inside and around circles have their own theorems.

[[ptolemys-theorem|Ptolemy's theorem]] says that in a cyclic quadrilateral with sides $a$, $b$, $c$, $d$ in order and diagonals $p$, $q$, the diagonals multiply to the sum of the products of opposite sides: $pq = ac + bd$. For $3, 4, 5, 6$, $pq = 15 + 24 = 39$. It follows from a pair of similar triangles made by drawing one extra line from a corner, using the equal angles on a common arc. It gives a diagonal when the other is known, and it is how the diagonal of a regular pentagon is found (S6.2).

[[brahmaguptas-formula|Brahmagupta's formula]] gives a cyclic quadrilateral's area from its sides alone, $\sqrt{(s - a)(s - b)(s - c)(s - d)}$ with $s$ the semiperimeter, Heron's formula with a fourth side. For $3, 4, 5, 6$, $s = 9$ and the area is $\sqrt{6 \cdot 5 \cdot 4 \cdot 3} = 6\sqrt{10}$. It applies only to cyclic quadrilaterals.

[[pitots-theorem|Pitot's theorem]] says that a quadrilateral drawn around a circle has equal sums of opposite sides: $AB + CD = BC + DA$, since each side is made of two tangent lengths and each tangent length appears once on each side of the equation. With $AB = 7$, $BC = 9$, $CD = 8$, $DA = 6$. Its area is the inradius times the semiperimeter (S4.5). [[perp-to-angle-bisector|A perpendicular to an angle bisector]] reflects one side onto the other: the perpendicular from $B$ to the bisector of angle $A$ meets it at $P$, and extended it meets $AC$ at $B'$ with $AB' = AB$ and $P$ the midpoint of $BB'$. So if $M$ is the midpoint of $BC$, then $PM$ is a midsegment of triangle $BB'C$: with $AB = 6$ and $AC = 10$, $PM = \tfrac{10 - 6}{2} = 2$.

Multiply the diagonals with Ptolemy, take Brahmagupta's root for a cyclic area, add opposite sides around a circle, and reflect across an angle bisector. The next lesson turns to circles that touch.`,
      related: [
        { card: "cyclic-quadrilateral", note: String.raw`the angle facts that make four points cyclic (S5.3).` },
        { card: "isosceles-trapezoid", note: String.raw`Ptolemy for a trapezoid, $d^2 = \ell^2 + Bb$ (S6.3).` },
        { card: "inradius-area", note: String.raw`the area of a quadrilateral around a circle, $rs$ (S4.5).` }
      ],
      exercises: [
        { q: String.raw`A quadrilateral inscribed in a circle has sides $3$, $4$, $5$, $6$ in order. What is the product of its diagonals?`, answer: "39",
          solution: String.raw`By Ptolemy's theorem, the product of the diagonals is the sum of the products of opposite sides: $3 \cdot 5 + 4 \cdot 6 = 39$.` },
        { q: String.raw`What is the area of that quadrilateral?`, answer: "6sqrt(10)",
          solution: String.raw`$s = 9$, and by Brahmagupta's formula the area is $\sqrt{6 \cdot 5 \cdot 4 \cdot 3} = \sqrt{360} = 6\sqrt{10}$.` },
        { q: String.raw`A quadrilateral $ABCD$ is drawn around a circle, with $AB = 7$, $BC = 9$ and $CD = 8$. How long is $DA$?`, answer: "6",
          solution: String.raw`By Pitot's theorem, $AB + CD = BC + DA$: $15 = 9 + DA$, so $DA = 6$.` },
        { q: String.raw`In triangle $ABC$, $AB = 6$ and $AC = 10$. The perpendicular from $B$ to the bisector of angle $A$ meets the bisector at $P$, and $M$ is the midpoint of $BC$. How long is $PM$?`, answer: "2",
          solution: String.raw`Extend $BP$ to meet $AC$ at $B'$. Triangles $ABP$ and $AB'P$ are congruent (ASA), so $AB' = 6$, $B'C = 4$, and $P$ is the midpoint of $BB'$. In triangle $BB'C$, $PM$ joins two midpoints, so $PM = \tfrac12 B'C = 2$.` }
      ],
      problems: [
        "2012 AMC 12A, Problem 16",
        "2013 AMC 10B, Problem 23",
        "2004 AMC 12B, Problem 19",
        "2011 AMC 12A, Problem 24",
        "2014 AMC 12B, Problem 24",
        "2008 AMC 12B, Problem 25"
      ]
    },
    "S9.5": {
      prereq: ["tangent-circles", "tangent-facts", "point-line-distance", "similar-figures-ratios"],
      cards: ["common-tangent-lengths", "tangency-condition", "descartes-circle-theorem", "homothety-monge"],
      body: String.raw`Two circles of radii $3$ and $8$ have centers $13$ apart: how long is the common tangent between the points of contact? Three touching circles have radii $\tfrac12$, $\tfrac12$ and $\tfrac13$: how big is the small circle that touches all three? When is a line tangent to a circle in coordinates? Touching is a condition with exact formulas.

[[common-tangent-lengths|A common tangent]] to two circles, between its points of contact, forms a right trapezoid with the two radii and the line of centers. Sliding the tangent along the radii makes a right triangle with hypotenuse $d$ and a leg $r_1 - r_2$ for an outer tangent or $r_1 + r_2$ for a tangent crossing between the circles: the outer tangent for radii $3$ and $8$ at distance $13$ is $\sqrt{169 - 25} = 12$, and an inner tangent for radii $4$ and $2$ at distance $10$ is $\sqrt{100 - 36} = 8$. When the circles touch, $d = r_1 + r_2$ and the outer tangent is $2\sqrt{r_1r_2}$: $12$ for radii $4$ and $9$.

[[tangency-condition|Tangency in coordinates]] is "exactly one common point": either the distance from the center to the line equals the radius, or the equation for the common points has a double root, a zero discriminant. The line $y = x + c$ touches $x^2 + y^2 = 8$ when $\tfrac{|c|}{\sqrt2} = 2\sqrt2$, so $c = \pm 4$.

[[descartes-circle-theorem|Descartes' theorem]] relates four mutually touching circles through their curvatures $k = \tfrac1r$: $(k_1 + k_2 + k_3 + k_4)^2 = 2(k_1^2 + k_2^2 + k_3^2 + k_4^2)$, with the curvature negative for a circle that surrounds the others. Solved for $k_4$, it is $k_4 = k_1 + k_2 + k_3 \pm 2\sqrt{k_1k_2 + k_2k_3 + k_3k_1}$: for curvatures $2$, $2$, $3$, $k_4 = 7 \pm 8$, so the small circle in the gap has curvature $15$, radius $\tfrac{1}{15}$, and $-1$ is the circle of radius $1$ around all three.

[[homothety-monge|A homothety]] is a scaling about a point: two circles are scaled copies of each other about the point where their outer common tangents meet, with ratio $\tfrac{r_2}{r_1}$. That point lies on the line of centers and divides it in the ratio of the radii, which turns tangent-line problems into similar triangles.

Slide the tangent to make a right triangle, set the distance to the center equal to the radius, use curvatures for four touching circles, and scale about the meeting point of the tangents. The next lesson meets the remaining centers of a triangle.`,
      related: [
        { card: "triangle-of-centers", note: String.raw`joining the centers of touching circles (S5.6).` },
        { card: "quadratic-formula", note: String.raw`a zero discriminant, the double root that means tangency (L3.2).` },
        { card: "tangent-circle-packing", note: String.raw`several touching circles in a figure (S5.6).` }
      ],
      exercises: [
        { q: String.raw`Two circles of radii $3$ and $8$ have centers $13$ apart. How long is an outer common tangent, between its points of contact?`, answer: "12",
          solution: String.raw`Slide the tangent down the smaller radius: it becomes a leg of a right triangle with hypotenuse $13$ and other leg $8 - 3 = 5$. So it is $\sqrt{169 - 25} = 12$.` },
        { q: String.raw`Two circles of radii $4$ and $2$ have centers $10$ apart. How long is a common tangent that crosses between them, between its points of contact?`, answer: "8",
          solution: String.raw`Sliding the tangent gives a right triangle with hypotenuse $10$ and a leg $4 + 2 = 6$, so the tangent is $\sqrt{100 - 36} = 8$.` },
        { q: String.raw`Three circles of radii $\tfrac12$, $\tfrac12$ and $\tfrac13$ touch each other from outside. A small circle in the gap between them touches all three. What is its radius?`, answer: "1/15",
          solution: String.raw`The curvatures are $2$, $2$, $3$. By Descartes' theorem $k_4 = 2 + 2 + 3 \pm 2\sqrt{4 + 6 + 6} = 7 \pm 8$. The small circle has $k_4 = 15$, so radius $\tfrac{1}{15}$.` },
        { q: String.raw`For what positive $c$ is the line $y = x + c$ tangent to the circle $x^2 + y^2 = 8$?`, answer: "4",
          solution: String.raw`The distance from the center $(0, 0)$ to $x - y + c = 0$ is $\tfrac{|c|}{\sqrt2}$, and it must equal the radius $2\sqrt2$, so $c = 4$. (Substituting, $2x^2 + 2cx + c^2 - 8 = 0$ has a double root when $4c^2 - 8(c^2 - 8) = 0$, that is, $c^2 = 16$.)` }
      ],
      problems: [
        "2001 AMC 12, Problem 18",
        "2002 AMC 12A, Problem 18",
        "2015 AMC 12A, Problem 11",
        "2006 AMC 12A, Problem 19",
        "2007 AMC 12B, Problem 22",
        "2025 AMC 10A, Problem 22"
      ]
    },
    "S9.6": {
      prereq: ["law-of-sines", "inradius-area", "incircle-tangent-lengths"],
      cards: ["orthocenter-properties", "exradii", "orthic-triangle", "euler-distance-theorem"],
      body: String.raw`How far is the orthocenter of a triangle from a corner? What is the radius of the circle touching the hypotenuse of a $3$-$4$-$5$ triangle and the extensions of its legs? How far apart are the incenter and the circumcenter? These are the less common centers and circles of a triangle, each with one formula worth knowing.

[[orthocenter-properties|The orthocenter]] $H$, where the three heights meet, is $2R\cos A$ from the corner $A$: with $R = 5$ and $A = 60^\circ$, $AH = 5$. Reflecting $H$ over a side lands on the circumcircle, and in vectors from the circumcenter $O$, $H = A + B + C$, so the centroid, which is $\tfrac{A + B + C}{3}$, lies on the segment $OH$ one third of the way from $O$: the Euler line. [[orthic-triangle|The orthic triangle]], with corners at the feet of the heights, has sides $a\cos A$, $b\cos B$, $c\cos C$ in an acute triangle.

[[exradii|An excircle]] touches one side and the extensions of the other two. The one across from side $a$ has radius $r_a = \tfrac{K}{s - a}$, where $K$ is the area: the $3$-$4$-$5$ triangle has $K = 6$ and $s = 6$, so its excircle across the hypotenuse has radius $\tfrac{6}{1} = 6$. The tangent lengths from the corners to the excircles are $s$ and $s - b$, $s - c$, found like the incircle's. [[euler-distance-theorem|Euler's formula]] gives the distance between the incenter and the circumcenter: $OI^2 = R(R - 2r)$, so $R = 5$ and $r = 2$ give $OI = \sqrt5$. Since $OI^2 \ge 0$, $R \ge 2r$, with equality only for an equilateral triangle.

These formulas are for recognition: when a problem names the orthocenter, an excircle or the distance $OI$, the formula is usually the whole first step. The Summary follows.`,
      related: [
        { card: "triangle-center-angles", note: String.raw`the angles at the centers, $\angle BHC = 180^\circ - A$ (S5.6).` },
        { card: "centroid-division", note: String.raw`the centroid, which lies on the Euler line (S3.5).` },
        { card: "nine-point-circle", note: String.raw`the circle through the feet of the heights and the midpoints of the sides.` }
      ],
      exercises: [
        { q: String.raw`A triangle has circumradius $5$ and an angle $A = 60^\circ$. How far is its orthocenter from the corner $A$?`, answer: "5",
          solution: String.raw`$AH = 2R\cos A = 2 \cdot 5 \cdot \tfrac12 = 5$.` },
        { q: String.raw`A right triangle has sides $3$, $4$ and $5$. What is the radius of its excircle across the hypotenuse?`, answer: "6",
          solution: String.raw`The area is $6$ and the semiperimeter is $6$, so $r_c = \tfrac{K}{s - c} = \tfrac{6}{6 - 5} = 6$.` },
        { q: String.raw`A triangle has circumradius $5$ and inradius $2$. What is the square of the distance between its circumcenter and incenter?`, answer: "5",
          solution: String.raw`By Euler's formula, $OI^2 = R(R - 2r) = 5(5 - 4) = 5$.` }
      ],
      problems: [
        "2019 AMC 10A, Problem 13",
        "2019 AMC 12A, Problem 25",
        "2022 AMC 12A, Problem 25"
      ]
    },
    "S9.7": {
      prereq: ["law-of-sines", "circumradius-area", "projection-formula", "pythagorean-identities", "common-angle-values", "reduction-identities", "stewarts-theorem", "angle-bisector-length", "apollonius-theorem", "cevas-theorem", "medial-triangle", "vivianis-theorem", "area-method", "ptolemys-theorem", "brahmaguptas-formula", "pitots-theorem", "perp-to-angle-bisector", "common-tangent-lengths", "tangency-condition", "descartes-circle-theorem", "homothety-monge", "orthocenter-properties", "exradii", "orthic-triangle", "euler-distance-theorem"],
      cards: [],
      body: String.raw`[[law-of-sines|The law of sines]] gives $\tfrac{a}{\sin A} = 2R$, and [[circumradius-area|$R = \tfrac{abc}{4A}$]]; [[projection-formula|the projection formula]], [[common-angle-values|the common values]], [[pythagorean-identities|the Pythagorean identities]] and [[reduction-identities|the reduction identities]] handle the trigonometry.

[[stewarts-theorem|Stewart's theorem]] measures any cevian, with [[apollonius-theorem|medians]] and [[angle-bisector-length|bisectors]] as cases; [[cevas-theorem|Ceva's theorem]] tests concurrence, proved by [[area-method|areas]]; [[medial-triangle|the medial triangle]] is half the size; and [[vivianis-theorem|Viviani's theorem]] adds distances to the sides.

[[ptolemys-theorem|Ptolemy]] and [[brahmaguptas-formula|Brahmagupta]] handle cyclic quadrilaterals, [[pitots-theorem|Pitot]] the ones around a circle, and [[perp-to-angle-bisector|a perpendicular to a bisector]] reflects a side.

[[common-tangent-lengths|Common tangents]], [[tangency-condition|tangency conditions]], [[descartes-circle-theorem|Descartes' theorem]] and [[homothety-monge|homothety]] handle touching circles; [[orthocenter-properties|the orthocenter]], [[orthic-triangle|the orthic triangle]], [[exradii|the exradii]] and [[euler-distance-theorem|Euler's distance]] complete the triangle's centers.`,
      strategies: [
        String.raw`With two angles and a side, or with a circumradius, use the law of sines.`,
        String.raw`For the length of a cevian, use Stewart's theorem, or its median and bisector cases.`,
        String.raw`For four points on a circle, try Ptolemy's theorem on the lengths.`,
        String.raw`Around a circle, add opposite sides; inside a circle, use Brahmagupta for the area.`,
        String.raw`For a common tangent, slide it along a radius to make a right triangle.`,
        String.raw`For four mutually touching circles, use curvatures.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the circumradius of an equilateral triangle with side $6$, by the law of sines?`, answer: "2sqrt(3)",
        solution: String.raw`$2R = \tfrac{6}{\sin 60^\circ} = \tfrac{12}{\sqrt3} = 4\sqrt3$, so $R = 2\sqrt3$.` },
      { q: String.raw`A cyclic quadrilateral has sides $7$, $15$, $20$, $24$. What is its area?`, answer: "234",
        solution: String.raw`$s = 33$, and by Brahmagupta's formula the area is $\sqrt{26 \cdot 18 \cdot 13 \cdot 9} = \sqrt{54756} = 234$. (It is two right triangles on a diameter of $25$: $\tfrac12 \cdot 7 \cdot 24 + \tfrac12 \cdot 15 \cdot 20 = 84 + 150$.)` },
      { q: String.raw`A triangle has sides $6$, $8$ and $10$. What is the square of the median to the side $6$?`, answer: "73",
        solution: String.raw`$m^2 = \tfrac{2 \cdot 64 + 2 \cdot 100 - 36}{4} = \tfrac{292}{4} = 73$.` }
    ],
    problems: [
      "2021 Spring AMC 12A, Problem 19",
      "2021 Fall AMC 12A, Problem 19",
      "2013 AMC 12B, Problem 24",
      "2024 AMC 12A, Problem 19",
      "2021 Spring AMC 12B, Problem 24"
    ]
  },
  challenge: {
    problems: [
      "2024 AMC 12B, Problem 22",
      "2021 Spring AMC 12A, Problem 24",
      "2003 AIME II, Problem 7",
      "2007 AIME II, Problem 3",
      "2013 AIME II, Problem 8"
    ]
  }
};
