// Learn, AMC 10, chapter T8: geometry, triangles and circles (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["T8"] = {
  lessons: {
    "T8.1": {
      prereq: [],
      cards: ["triangle-similarity", "similar-figures-ratios", "pythagorean-theorem", "special-right-triangles", "15-75-90-triangle", "triangle-area-standard", "triangle-inequality", "triangle-congruence", "parallel-exterior-angles", "median-to-hypotenuse", "right-triangle-inradius"],
      body: String.raw`Triangles are the core of AMC geometry. Most problems need some combination of similar or congruent triangles, the Pythagorean theorem with its special triangles, the area formula and the triangle inequality, and the skill is spotting which.

Two triangles are [[triangle-congruence|congruent]] (SSS, SAS, ASA, AAS, HL) when they are copies, and [[triangle-similarity|similar]] (AA is enough) when one is a scaled copy. In [[similar-figures-ratios|similar figures]] with ratio $k$, lengths scale by $k$, areas by $k^2$ and volumes by $k^3$. Angles come from the angle sum, isosceles triangles, and [[parallel-exterior-angles|parallel lines and exterior angles]]: an exterior angle equals the sum of the two remote interior angles.

The [[pythagorean-theorem|Pythagorean theorem]] $a^2 + b^2 = c^2$ and the [[special-right-triangles|special right triangles]], $45$-$45$-$90$ with sides $1 : 1 : \sqrt2$ and $30$-$60$-$90$ with sides $1 : \sqrt3 : 2$, give most lengths: a $30$-$60$-$90$ triangle with short leg $4$ has hypotenuse $8$. The [[15-75-90-triangle|$15$-$75$-$90$ triangle]] has altitude to the hypotenuse one quarter of the hypotenuse, so with hypotenuse $8$ its area is $8$.

The [[triangle-area-standard|area]] is half of base times height. In a right triangle the [[median-to-hypotenuse|median to the hypotenuse]] is half the hypotenuse ($7.5$ for $9$-$12$-$15$), and the [[right-triangle-inradius|inradius]] is $\tfrac{a + b - c}{2}$. The [[triangle-inequality|triangle inequality]] says each side is less than the sum of the other two: with sides $7$ and $10$ the third side is strictly between $3$ and $17$, $13$ integer values.

Look for similar triangles and right angles first. The next lesson finds ratios inside a triangle.`,
      related: [
        { card: "pythagorean-triples", note: String.raw`integer right triangles (T5.5).` },
        { card: "law-of-cosines", note: String.raw`the Pythagorean theorem for any angle (T8.6).` },
        { card: "parallel-line-similarity", note: String.raw`drawing a parallel to make similar triangles (T8.2).` }
      ],
      exercises: [
        { q: String.raw`A triangle has sides $7$ and $10$ and an integer third side. How many values can the third side take?`, answer: "13",
          solution: String.raw`$10 - 7 \lt x \lt 10 + 7$, so $4 \le x \le 16$: $13$ values.` },
        { q: String.raw`A right triangle has legs $9$ and $12$. How long is the median to the hypotenuse?`, answer: "15/2",
          solution: String.raw`The hypotenuse is $15$, and the median to it is half of it, $\tfrac{15}{2}$.` }
      ],
      problems: [
        "2022 AMC 10B, Problem 2",
        "2016 AMC 10B, Problem 9",
        "2005 AMC 12B, Problem 6",
        "2013 AMC 10A, Problem 15",
        "2025 AMC 12B, Problem 10",
        "2002 AMC 10A, Problem 20"
      ]
    },
    "T8.2": {
      prereq: ["triangle-similarity"],
      cards: ["parallel-line-similarity", "midsegment-theorem", "intercept-theorem", "nested-similar", "same-base-area-ratio", "shared-angle-area-ratio", "cevian-area-ratio", "angle-bisector-theorem", "centroid-division", "mass-points"],
      body: String.raw`Points on the sides of a triangle divide it into pieces whose lengths and areas are in fixed ratios. A handful of facts track these ratios without computing any lengths outright.

A line parallel to a side cuts the other two sides proportionally, the [[intercept-theorem|intercept theorem]]: with $DE \parallel BC$ and $AD : DB = 2 : 3$, triangle $ADE$ is similar to $ABC$ with ratio $\tfrac25$, so if $BC = 15$ then $DE = 6$. The [[midsegment-theorem|midsegment]] joining two midpoints is parallel to the third side and half as long. When there is no parallel, [[parallel-line-similarity|draw one]]. [[nested-similar|Nested similar figures]] shrink by the same ratio at each step.

Areas compare by shared parts: triangles with the [[same-base-area-ratio|same height]] have areas in the ratio of their bases, so a [[cevian-area-ratio|cevian]] splits a triangle's area in the ratio it splits the opposite side. Triangles with a [[shared-angle-area-ratio|shared angle]] have areas in the ratio of the products of the sides around it: $AX = \tfrac13AB$ and $AY = \tfrac12AC$ give $[AXY] = \tfrac16[ABC]$.

The [[angle-bisector-theorem|angle bisector theorem]] says the bisector from $A$ cuts $BC$ in the ratio $AB : AC$: with $AB = 6$, $AC = 9$, $BC = 10$, $BD = 4$. Medians meet at the centroid, which [[centroid-division|divides each median $2 : 1$]], so a median of $12$ has $AG = 8$. [[mass-points|Mass points]] put weights at the vertices that balance at the points on the sides, and read off how cevians cut each other.

Track ratios with parallels, areas and weights. The next lesson builds auxiliary figures.`,
      related: [
        { card: "stewarts-theorem", note: String.raw`lengths of cevians (W8.1).` },
        { card: "cevas-theorem", note: String.raw`when three cevians meet (W8.1).` },
        { card: "triangle-area-standard", note: String.raw`area as half base times height (T8.1).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $AB = 6$, $AC = 9$ and $BC = 10$. The bisector of angle $A$ meets $BC$ at $D$. Find $BD$.`, answer: "4",
          solution: String.raw`$BD : DC = AB : AC = 6 : 9 = 2 : 3$, so $BD = \tfrac25 \cdot 10 = 4$.` },
        { q: String.raw`Points $X$ on $AB$ and $Y$ on $AC$ have $AX = \tfrac13AB$ and $AY = \tfrac12AC$. What fraction of the area of $ABC$ is triangle $AXY$?`, answer: "1/6",
          solution: String.raw`Sharing the angle at $A$, $\tfrac{[AXY]}{[ABC]} = \tfrac{AX \cdot AY}{AB \cdot AC} = \tfrac13 \cdot \tfrac12 = \tfrac16$.` }
      ],
      problems: [
        "2000 AMC 10, Problem 5",
        "2010 AMC 10A, Problem 16",
        "2017 AMC 10B, Problem 19",
        "2008 AMC 10A, Problem 20",
        "2005 AMC 12A, Problem 15",
        "2006 AMC 10B, Problem 23",
        "2018 AMC 10A, Problem 24",
        "2022 AMC 12B, Problem 19"
      ]
    },
    "T8.3": {
      prereq: ["pythagorean-theorem", "triangle-similarity"],
      cards: ["altitude-hypotenuse", "right-triangle-altitude", "extend-sides-to-meet", "median-doubling", "point-in-equilateral", "circle-in-angle"],
      body: String.raw`Some figures become easy after one extra line: an altitude to a hypotenuse, sides extended until they meet, a median doubled into a parallelogram, or a rotation in an equilateral triangle. Recognizing the figure that calls for each is the skill.

The [[altitude-hypotenuse|altitude to the hypotenuse]] of a right triangle makes two smaller triangles similar to the whole. With legs $a$, $b$, hypotenuse $c$, altitude $h$ and hypotenuse pieces $p$, $q$: $h = \tfrac{ab}{c}$, $a^2 = pc$ and $h^2 = pq$. For legs $9$ and $12$, $h = \tfrac{36}{5}$ and the piece next to the leg $9$ is $\tfrac{81}{15} = \tfrac{27}{5}$. A [[right-triangle-altitude|right triangle with its altitude]] hides in rectangles cut by diagonals and in semicircles with perpendicular chords.

[[extend-sides-to-meet|Extending two sides to meet]] completes a trapezoid or quadrilateral into a triangle, so similar triangles appear. [[median-doubling|Doubling a median]] extends it past the midpoint to make a parallelogram, which turns two sides and a median into a triangle with known sides.

For a [[point-in-equilateral|point inside an equilateral triangle]] with known distances to the vertices, rotate $60^\circ$ about a vertex to bring the three distances into one triangle. A [[circle-in-angle|circle inscribed in an angle]] has its center on the bisector; in a right angle a circle of radius $2$ has its center $2\sqrt2$ from the vertex.

When a figure stalls, draw the altitude, extend the sides, double the median, or rotate. The next lesson treats circles.`,
      related: [
        { card: "thales-theorem", note: String.raw`the right angle in a semicircle (T8.4).` },
        { card: "rotation-trick", note: String.raw`rotations to gather lengths, in general (W9.3).` },
        { card: "apollonius-theorem", note: String.raw`the median length that median doubling proves (W8.1).` }
      ],
      exercises: [
        { q: String.raw`A right triangle has legs $9$ and $12$. Find the altitude to the hypotenuse.`, answer: "36/5",
          solution: String.raw`The hypotenuse is $15$, and $h = \tfrac{ab}{c} = \tfrac{108}{15} = \tfrac{36}{5}$.` },
        { q: String.raw`A circle of radius $2$ is tangent to both sides of a right angle. How far is its center from the vertex?`, answer: "2sqrt(2)",
          solution: String.raw`The center is $2$ from each side, at the corner of a $2 \times 2$ square, so its distance from the vertex is $2\sqrt2$.` }
      ],
      problems: [
        "2014 AMC 10A, Problem 9",
        "2002 AMC 10A, Problem 13",
        "2017 AMC 10B, Problem 15",
        "2008 AMC 10A, Problem 16",
        "2015 AMC 12B, Problem 11",
        "2015 AMC 10A, Problem 21",
        "2019 AMC 10B, Problem 23",
        "2024 AMC 12B, Problem 20"
      ]
    },
    "T8.4": {
      prereq: ["triangle-congruence"],
      cards: ["inscribed-angle-theorem", "circle-basics", "tangent-facts", "chord-length", "power-of-a-point", "thales-theorem", "angle-chasing", "cyclic-opposite-angles", "cyclic-equal-angles", "angle-chord-secant", "tangent-chord-angle", "cyclic-quadrilateral", "equal-chords-arcs"],
      body: String.raw`Circles bring angles that depend only on arcs, right angles at tangents and in semicircles, and products of segments that are equal. With these, circle problems become triangle problems.

The [[circle-basics|basic formulas]]: circumference $2\pi r$, area $\pi r^2$, and an arc or sector is its angle's fraction of the whole. The [[inscribed-angle-theorem|inscribed angle theorem]]: an angle with vertex on the circle is half its arc, so an arc of $140^\circ$ gives $70^\circ$, equal arcs give equal angles, and [[thales-theorem|an angle in a semicircle is right]]. [[angle-chord-secant|Angles formed by chords and secants]] are half the sum (inside) or half the difference (outside) of the arcs, and the [[tangent-chord-angle|tangent-chord angle]] is half its arc. [[equal-chords-arcs|Equal chords]] cut equal arcs and are equally far from the center. [[angle-chasing|Angle chasing]] names one angle and follows it through the figure.

In a [[cyclic-quadrilateral|cyclic quadrilateral]], [[cyclic-opposite-angles|opposite angles add to $180^\circ$]] (an angle of $75^\circ$ faces one of $105^\circ$), and [[cyclic-equal-angles|angles on the same side]] subtending one side are equal.

A [[tangent-facts|tangent]] is perpendicular to the radius, and the two tangents from a point are equal: from a point $10$ from the center of a circle of radius $6$, the tangent is $8$. A [[chord-length|chord]] is bisected by the perpendicular from the center: radius $10$ and distance $8$ give a chord of $12$. The [[power-of-a-point|power of a point]]: chords $AB$ and $CD$ crossing at $P$ satisfy $PA \cdot PB = PC \cdot PD$, so $PA = 3$, $PB = 8$, $PC = 4$ give $PD = 6$.

Turn arcs into angles, tangents into right angles, and crossing chords into equal products. The next lesson treats incircles and touching circles.`,
      related: [
        { card: "ptolemys-theorem", note: String.raw`the side relation of cyclic quadrilaterals (W8.2).` },
        { card: "concyclicity-tests", note: String.raw`proving four points are on a circle (W8.2).` },
        { card: "circular-segment", note: String.raw`areas cut off by chords (T9.1).` }
      ],
      exercises: [
        { q: String.raw`A point is $10$ from the center of a circle of radius $6$. Find the length of a tangent from the point.`, answer: "8",
          solution: String.raw`The tangent is perpendicular to the radius, so its length is $\sqrt{10^2 - 6^2} = 8$.` },
        { q: String.raw`Chords $AB$ and $CD$ meet at $P$ with $PA = 3$, $PB = 8$ and $PC = 4$. Find $PD$.`, answer: "6",
          solution: String.raw`$PA \cdot PB = PC \cdot PD$, so $24 = 4 \cdot PD$ and $PD = 6$.` }
      ],
      problems: [
        "2023 AMC 10B, Problem 3",
        "2021 Spring AMC 10B, Problem 7",
        "2004 AMC 10B, Problem 12",
        "2007 AMC 12A, Problem 8",
        "2003 AMC 10A, Problem 17",
        "2015 AMC 12B, Problem 13",
        "2013 AMC 10A, Problem 23",
        "2023 AMC 12B, Problem 21"
      ]
    },
    "T8.5": {
      prereq: ["tangent-facts"],
      cards: ["incircle-tangent-lengths", "inradius-area", "tangent-circles", "two-tangents-angle", "rolling-without-slipping", "triangle-of-centers", "common-chord-length", "triangle-center-angles"],
      body: String.raw`Circles inside triangles and circles touching each other reduce to tangent lengths and distances between centers. Equal tangents and radii perpendicular to tangents do almost all the work.

The incircle touches each side, and the two tangents from each vertex are equal, so the [[incircle-tangent-lengths|tangent lengths]] are $s - a$, $s - b$, $s - c$ with $s$ the semiperimeter: in the triangle with $BC = 14$, $CA = 15$, $AB = 13$, the tangent from $A$ is $21 - 14 = 7$. The [[inradius-area|inradius]] satisfies $K = rs$, so the $6$-$8$-$10$ triangle, area $24$ and $s = 12$, has $r = 2$. The [[triangle-center-angles|angle at the incenter]] is $\angle BIC = 90^\circ + \tfrac A2$, which is $130^\circ$ when $A = 80^\circ$.

[[tangent-circles|Tangent circles]] have centers $R + r$ apart (externally) or $R - r$ (internally), so [[triangle-of-centers|joining the centers]] makes triangles with known sides. Two externally tangent circles of radii $4$ and $9$ have a common external tangent of length $\sqrt{13^2 - 5^2} = 12$. The [[two-tangents-angle|angle between two tangents]] from a point is $180^\circ$ minus the central angle between the points of contact. Two circles that cross share a [[common-chord-length|common chord]] perpendicular to the line of centers. A wheel [[rolling-without-slipping|rolling without slipping]] turns once for each circumference its center travels.

Label tangent lengths, use $K = rs$, and join centers. The last lesson of the chapter brings in trigonometry.`,
      related: [
        { card: "common-tangent-lengths", note: String.raw`common tangent lengths in general (W8.3).` },
        { card: "herons-formula", note: String.raw`the area that, with $K = rs$, gives the inradius (T8.6).` },
        { card: "incircle-excircle-touch", note: String.raw`where the excircles touch (W8.2).` }
      ],
      exercises: [
        { q: String.raw`Find the inradius of the triangle with sides $6$, $8$, $10$.`, answer: "2",
          solution: String.raw`The area is $24$ and the semiperimeter is $12$, so $r = \tfrac{24}{12} = 2$.` },
        { q: String.raw`Circles of radii $4$ and $9$ are externally tangent. Find the length of a common external tangent.`, answer: "12",
          solution: String.raw`The centers are $13$ apart and the radii differ by $5$, so the tangent is $\sqrt{13^2 - 5^2} = 12$.` }
      ],
      problems: [
        "2002 AMC 10A, Problem 5",
        "2011 AMC 12B, Problem 6",
        "2009 AMC 10A, Problem 19",
        "2019 AMC 10A, Problem 21",
        "2005 AMC 12A, Problem 16",
        "2004 AMC 10A, Problem 23",
        "2011 AMC 10B, Problem 25",
        "2024 AMC 12B, Problem 24"
      ]
    },
    "T8.6": {
      prereq: ["pythagorean-theorem", "special-right-triangles"],
      cards: ["law-of-sines", "law-of-cosines", "trig-area", "law-cosines-60-120", "law-of-cosines-special-triangles", "herons-formula", "triangle-13-14-15", "pythagorean-identities", "common-angle-values", "reduction-identities"],
      body: String.raw`Trigonometry extends right-triangle facts to every triangle. The AMC 10 uses only a little of it, the laws of sines and cosines, the sine area formula, Heron's formula and the common angle values, but these settle many geometry problems quickly.

The [[common-angle-values|common angle values]] at $30^\circ$, $45^\circ$, $60^\circ$ come from the special right triangles, and the [[pythagorean-identities|Pythagorean identity]] $\sin^2\theta + \cos^2\theta = 1$ with the [[reduction-identities|reduction rules]], such as $\sin(180^\circ - \theta) = \sin\theta$ and $\cos(180^\circ - \theta) = -\cos\theta$, give the values at $120^\circ$, $135^\circ$, $150^\circ$.

The [[law-of-cosines|law of cosines]] $c^2 = a^2 + b^2 - 2ab\cos C$ finds a side from two sides and the included angle; at [[law-cosines-60-120|$60^\circ$ and $120^\circ$]] it is $c^2 = a^2 + b^2 \mp ab$, so sides $5$ and $7$ at $60^\circ$ give $\sqrt{39}$. [[law-of-cosines-special-triangles|Integer triangles with a $60^\circ$ or $120^\circ$ angle]], such as $3$-$5$-$7$ and $5$-$7$-$8$, are worth recognizing. The [[law-of-sines|law of sines]] $\tfrac{a}{\sin A} = \tfrac{b}{\sin B} = 2R$ relates sides to opposite angles.

The [[trig-area|sine area formula]] $\tfrac12ab\sin C$ needs two sides and the included angle; [[herons-formula|Heron's formula]] $\sqrt{s(s - a)(s - b)(s - c)}$ needs only the three sides: $5$, $5$, $6$ give $\sqrt{8 \cdot 3 \cdot 3 \cdot 2} = 12$. The [[triangle-13-14-15|$13$-$14$-$15$ triangle]] has area $84$ and altitude $12$ to the side $14$, and appears often.

Use the laws for sides and angles and Heron for area from sides. The next chapter treats polygons, coordinates and solids.`,
      related: [
        { card: "circumradius-area", note: String.raw`$R = \tfrac{abc}{4K}$ (W8.4).` },
        { card: "angle-addition", note: String.raw`more trigonometric identities (W4.1).` },
        { card: "inradius-area", note: String.raw`the inradius from the area (T8.5).` }
      ],
      exercises: [
        { q: String.raw`Two sides of a triangle are $5$ and $7$ with a $60^\circ$ angle between them. Find the third side.`, answer: "sqrt(39)",
          solution: String.raw`$c^2 = 25 + 49 - 5 \cdot 7 = 39$, so $c = \sqrt{39}$.` },
        { q: String.raw`Find the area of a triangle with sides $5$, $5$, $6$.`, answer: "12",
          solution: String.raw`$s = 8$, and Heron gives $\sqrt{8 \cdot 3 \cdot 3 \cdot 2} = 12$ (or: the altitude to the base $6$ is $4$, and $\tfrac12 \cdot 6 \cdot 4 = 12$).` }
      ],
      problems: [
        "2023 AMC 10A, Problem 13",
        "2021 Fall AMC 12B, Problem 9",
        "2015 AMC 10A, Problem 19",
        "2008 AMC 12B, Problem 15",
        "2011 AMC 12A, Problem 17",
        "2000 AMC 12, Problem 19",
        "2012 AMC 12B, Problem 21",
        "2002 AMC 12B, Problem 24"
      ]
    }
  }
};
