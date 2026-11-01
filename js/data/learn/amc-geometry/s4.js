// Learn, AMC Geometry, chapter S4: right, equilateral and general triangles (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S4"] = {
  lessons: {
    "S4.1": {
      prereq: ["pythagorean-theorem", "special-right-triangles", "triangle-similarity"],
      cards: [],
      body: String.raw`Three kinds of triangle fill most AMC geometry: the right triangle, the equilateral triangle, and the general triangle whose three sides are known. This chapter gives each its tools. A right triangle has more structure than the Pythagorean theorem alone: its altitude, median and inscribed circle all have exact lengths. An equilateral triangle is fixed by its side. And a general triangle has its area and angles fixed by its sides, through Heron's formula and the law of cosines.

The median from the right angle of a right triangle to the hypotenuse is exactly half the hypotenuse, so with hypotenuse $10$ it is $5$: the midpoint of the hypotenuse is equally far from all three corners. An equilateral triangle with side $4$ has height $\tfrac{\sqrt3}{2} \cdot 4 = 2\sqrt3$. And a triangle with sides $5$ and $8$ meeting at $60^\circ$ has a third side of $\sqrt{25 + 64 - 40} = 7$, by the law of cosines.

The lessons take these ideas in turn: more right-triangle facts (S4.2), constructions in right triangles (S4.3), equilateral triangles and inscribed squares (S4.4), Heron's formula and the inradius (S4.5), and the law of cosines and the sine area formula (S4.6). The Summary (S4.7) collects the strategies.`,
      exercises: [
        { q: String.raw`A right triangle has hypotenuse $10$. How long is the median from the right angle to the hypotenuse?`, answer: "5",
          solution: String.raw`The midpoint of the hypotenuse is the center of the circle through all three corners, with the hypotenuse as a diameter, so it is $5$ from each corner. The median is $5$.` },
        { q: String.raw`What is the height of an equilateral triangle with side $4$?`, answer: "2sqrt(3)",
          solution: String.raw`The height cuts it into two $30$-$60$-$90$ triangles with hypotenuse $4$ and short leg $2$, so the height is $2\sqrt3$.` },
        { q: String.raw`Two sides of a triangle are $5$ and $8$, and the angle between them is $60^\circ$. How long is the third side?`, answer: "7",
          solution: String.raw`By the law of cosines, $c^2 = 25 + 64 - 2 \cdot 5 \cdot 8 \cdot \tfrac12 = 49$, so $c = 7$.` }
      ],
      problems: [
        "2000 AMC 8, Problem 15",
        "2007 AMC 8, Problem 12",
        "2016 AMC 8, Problem 25"
      ]
    },
    "S4.2": {
      prereq: ["pythagorean-theorem", "special-right-triangles", "circle-basics"],
      cards: ["15-75-90-triangle", "median-to-hypotenuse", "right-triangle-inradius"],
      body: String.raw`How far is the midpoint of the hypotenuse of a $9$-$12$-$15$ triangle from the right angle? What is the radius of the circle inscribed in a $5$-$12$-$13$ triangle? What are the sides of a right triangle with a $15^\circ$ angle? A right triangle carries more exact lengths than its three sides.

[[median-to-hypotenuse|The median to the hypotenuse]] is half the hypotenuse. A right angle stands on a diameter of the circle through its corners (S5.3), so the midpoint of the hypotenuse is that circle's center, equally far from all three corners: $7.5$ in the $9$-$12$-$15$ triangle. Read the other way, if a point is equally far from the ends of a segment and from a third point, the angle at the third point is right. The median splits the right triangle into two isosceles triangles, a common source of equal angles.

[[right-triangle-inradius|The inradius of a right triangle]] is $r = \tfrac{a + b - c}{2}$. The incircle touches the two legs at points $r$ from the right angle, since the center and those points make a square; the rest of each leg equals the tangent length from the other corners, and those add to $c$, so $a + b = 2r + c$. For $5$-$12$-$13$, $r = \tfrac{5 + 12 - 13}{2} = 2$. With the circumradius $R = \tfrac c2$ this gives $a + b = 2r + 2R$.

[[15-75-90-triangle|The $15$-$75$-$90$ triangle]] has sides in the ratio $(\sqrt6 - \sqrt2) : (\sqrt6 + \sqrt2) : 4$. With hypotenuse $4$ its legs are $\sqrt6 - \sqrt2$ and $\sqrt6 + \sqrt2$, and its area is $\tfrac12(\sqrt6 - \sqrt2)(\sqrt6 + \sqrt2) = \tfrac12 \cdot 4 = 2$: a quarter of the square of the hypotenuse, divided by two. It appears when a $30^\circ$ angle is bisected, or when an isosceles triangle with a $30^\circ$ top angle is cut by its height.

Look for the midpoint of a hypotenuse as a center, use $\tfrac{a+b-c}{2}$ for a right triangle's inradius, and recognize $15^\circ$ and $75^\circ$ as a known shape. The next lesson draws extra lines in right triangles.`,
      related: [
        { card: "thales-theorem", note: String.raw`the right angle on a diameter, behind the median fact (S5.3).` },
        { card: "incircle-tangent-lengths", note: String.raw`the tangent lengths in any triangle, $s - a$ and so on (S5.6).` },
        { card: "common-angle-values", note: String.raw`the sines and cosines of $15^\circ$ and $75^\circ$ (S9.2).` }
      ],
      exercises: [
        { q: String.raw`A right triangle has legs $5$ and $12$. What is the radius of its inscribed circle?`, answer: "2",
          solution: String.raw`The hypotenuse is $13$, and $r = \tfrac{a + b - c}{2} = \tfrac{5 + 12 - 13}{2} = 2$. Check by area: $A = 30$ and the semiperimeter is $15$, so $r = \tfrac{30}{15} = 2$.` },
        { q: String.raw`A right triangle has legs $9$ and $12$. How far is the midpoint of the hypotenuse from the corner with the right angle?`, answer: "15/2",
          solution: String.raw`The hypotenuse is $15$, and its midpoint is the center of the circle through all three corners, so it is $\tfrac{15}{2}$ from each of them.` },
        { q: String.raw`A right triangle has a $15^\circ$ angle and hypotenuse $4$. What is its area?`, answer: "2",
          solution: String.raw`Its legs are $\sqrt6 - \sqrt2$ and $\sqrt6 + \sqrt2$, so its area is $\tfrac12(\sqrt6 - \sqrt2)(\sqrt6 + \sqrt2) = \tfrac12(6 - 2) = 2$. (In general it is $\tfrac{c^2}{8}$, since $\sin 15^\circ \cos 15^\circ = \tfrac14$.)` }
      ],
      problems: [
        "2012 AMC 10B, Problem 21",
        "2024 AMC 12A, Problem 7",
        "2017 AMC 10B, Problem 21",
        "2014 AMC 10A, Problem 22",
        "2004 AMC 10B, Problem 22"
      ]
    },
    "S4.3": {
      prereq: ["pythagorean-theorem", "triangle-similarity"],
      cards: ["altitude-hypotenuse", "right-triangle-altitude", "extend-sides-to-meet", "median-doubling"],
      body: String.raw`The altitude from the right angle cuts the hypotenuse into pieces $4$ and $9$: how long is it? The legs of a trapezoid are extended until they meet: what triangle appears? A median is awkward to use: what if it is doubled? Some of the best steps in a geometry problem are lines that were not in the figure.

[[altitude-hypotenuse|The altitude to the hypotenuse]] of a right triangle cuts it into two triangles similar to the whole and to each other (S3.2). If the altitude $h$ cuts the hypotenuse $c$ into $p$ and $q$, then $h^2 = pq$, and each leg satisfies $a^2 = pc$ for the piece $p$ next to it. Pieces $4$ and $9$ give $h = 6$; pieces $9$ and $16$ give $c = 25$ and legs $\sqrt{9 \cdot 25} = 15$ and $\sqrt{16 \cdot 25} = 20$. Comparing areas, $ab = ch$, gives $h = \tfrac{ab}{c}$. [[right-triangle-altitude|The figure]] of a right triangle with its altitude drawn is so common that it is worth seeing as one object, three similar triangles at once.

[[extend-sides-to-meet|Extending two sides until they meet]] completes a figure into a triangle. A trapezoid is a triangle with its top cut off by a parallel line, so its legs extended meet at a point, and the two triangles with that point as a corner are similar. With bases $6$ and $10$ and height $4$, the small triangle is $\tfrac{6}{10}$ of the large one, so the large one's height $H$ satisfies $\tfrac{H - 4}{H} = \tfrac35$, and $H = 10$. A quadrilateral with known angles is often a triangle with a corner removed, and extending its sides restores the triangle.

[[median-doubling|Doubling a median]] extends the median $AM$ past the midpoint $M$ of $BC$ to $A'$ with $MA' = AM$. Then $ABA'C$ is a parallelogram, since its diagonals bisect each other, and the triangle $ABA'$ has sides $AB$, $BA' = AC$ and $AA' = 2AM$: the median and the two sides beside it now lie in one triangle, where the triangle inequality or the law of cosines applies.

Draw the altitude to the hypotenuse for geometric means, extend the legs of a trapezoid to meet, and double a median to make a parallelogram. The next lesson turns to equilateral triangles.`,
      related: [
        { card: "apollonius-theorem", note: String.raw`the length of a median from the three sides (S9.3).` },
        { card: "parallelogram-vertices", note: String.raw`the parallelogram whose diagonals bisect each other (S2.3).` },
        { card: "trapezoid-special-segments", note: String.raw`more segments in a trapezoid (S6.3).` }
      ],
      exercises: [
        { q: String.raw`The altitude from the right angle of a right triangle cuts the hypotenuse into pieces of lengths $4$ and $9$. How long is the altitude?`, answer: "6",
          solution: String.raw`The two smaller triangles are similar, so $\tfrac h4 = \tfrac9h$, that is, $h^2 = 36$, and $h = 6$.` },
        { q: String.raw`The altitude from the right angle cuts the hypotenuse into pieces $9$ and $16$. How long is the shorter leg?`, answer: "15",
          solution: String.raw`The hypotenuse is $25$, and the leg next to the piece $9$ satisfies $a^2 = 9 \cdot 25 = 225$, so $a = 15$. (The other leg is $\sqrt{16 \cdot 25} = 20$, and $15^2 + 20^2 = 25^2$.)` },
        { q: String.raw`A trapezoid has parallel sides $6$ and $10$, which are $4$ apart. Its legs are extended until they meet. How far is the meeting point from the longer parallel side?`, answer: "10",
          solution: String.raw`The meeting point and the two parallel sides make similar triangles in the ratio $\tfrac{6}{10}$. If the large one has height $H$, the small one has height $H - 4$, and $\tfrac{H - 4}{H} = \tfrac35$, so $H = 10$.` }
      ],
      problems: [
        "2002 AMC 10A, Problem 13",
        "2009 AMC 10A, Problem 10",
        "2014 AMC 10A, Problem 9",
        "2015 AMC 10B, Problem 13",
        "2009 AMC 10A, Problem 17",
        "2018 AMC 10A, Problem 16",
        "2009 AMC 12B, Problem 16",
        "2003 AMC 12B, Problem 22",
        "2024 AMC 12B, Problem 20"
      ]
    },
    "S4.4": {
      prereq: ["special-right-triangles", "triangle-similarity"],
      cards: ["equilateral-triangle-facts", "point-in-equilateral", "inscribed-square"],
      body: String.raw`What are the area and the radii of an equilateral triangle with side $6$? A point inside an equilateral triangle is $1$, $2$ and $3$ from its sides: how big is the triangle? What is the largest square that sits on the base of a triangle? Equilateral triangles and squares inside triangles have exact formulas.

[[equilateral-triangle-facts|An equilateral triangle]] of side $s$ is fixed by $s$: its height is $\tfrac{\sqrt3}{2}s$ and its area $\tfrac{\sqrt3}{4}s^2$. Its centers all coincide, at two thirds of the height from each corner, so the circumradius is $\tfrac{\sqrt3}{3}s$ and the inradius $\tfrac{\sqrt3}{6}s$: for $s = 6$, area $9\sqrt3$, circumradius $2\sqrt3$, inradius $\sqrt3$. A triangle inscribed in a circle of radius $R$ has side $R\sqrt3$, so $4\sqrt3$ for $R = 4$.

[[point-in-equilateral|A point inside an equilateral triangle]] has its own facts. The distances from it to the three sides add up to the height, however it is placed, since the three triangles from the point to the sides have areas $\tfrac12 s d_1$, $\tfrac12 s d_2$, $\tfrac12 s d_3$ that add to the whole. Distances $1$, $2$, $3$ give height $6$ and side $\tfrac{2 \cdot 6}{\sqrt3} = 4\sqrt3$. When the distances to the corners are given instead, rotating the figure $60^\circ$ about a corner moves one distance next to another and makes an equilateral triangle out of two of them.

[[inscribed-square|A square standing on the base]] of a triangle with base $a$ and height $h$ has side $x = \tfrac{ah}{a + h}$: the triangle above the square is similar to the whole, so $\tfrac{h - x}{h} = \tfrac xa$. A base of $12$ and height $6$ give $x = \tfrac{72}{18} = 4$. The same similarity handles a rectangle, and the largest rectangle in a triangle has half its area, with its top on the midline.

Use the side to fix everything in an equilateral triangle, add the distances to the sides to get the height, and set up the similar triangle above an inscribed square. The next lesson finds the area of any triangle from its sides.`,
      related: [
        { card: "vivianis-theorem", note: String.raw`the sum of the distances to the sides, as a named theorem (S9.3).` },
        { card: "rotation-trick", note: String.raw`the $60^\circ$ rotation for distances to the corners (S10.4).` },
        { card: "regular-hexagon-area", note: String.raw`a regular hexagon as six equilateral triangles (S6.2).` }
      ],
      exercises: [
        { q: String.raw`An equilateral triangle has side $6$. What is the radius of the circle through its corners?`, answer: "2sqrt(3)",
          solution: String.raw`The center is two thirds of the way down the height from a corner. The height is $3\sqrt3$, so the radius is $\tfrac23 \cdot 3\sqrt3 = 2\sqrt3$.` },
        { q: String.raw`A point inside an equilateral triangle is at distances $1$, $2$ and $3$ from its three sides. What is the side of the triangle?`, answer: "4sqrt(3)",
          solution: String.raw`The three triangles from the point to the sides have areas $\tfrac12 s \cdot 1$, $\tfrac12 s \cdot 2$, $\tfrac12 s \cdot 3$, which add to $\tfrac12 s \cdot 6$, the area $\tfrac12 s h$. So the height is $6$, and $s = \tfrac{2 \cdot 6}{\sqrt3} = 4\sqrt3$.` },
        { q: String.raw`A triangle has base $12$ and height $6$. A square stands on the base with its top corners on the other two sides. What is the side of the square?`, answer: "4",
          solution: String.raw`The triangle above the square has height $6 - x$ and base $x$, and is similar to the whole: $\tfrac{6 - x}{6} = \tfrac{x}{12}$. So $12 - 2x = x$, and $x = 4$.` }
      ],
      problems: [
        "2012 AMC 8, Problem 23",
        "2007 AMC 10B, Problem 7",
        "2019 AMC 10B, Problem 8",
        "2014 AMC 10B, Problem 13",
        "2003 AMC 12A, Problem 14",
        "2012 AMC 10B, Problem 16",
        "2015 AMC 10A, Problem 17",
        "2004 AMC 10A, Problem 20",
        "2017 AMC 10A, Problem 21"
      ]
    },
    "S4.5": {
      prereq: ["triangle-area-standard", "shared-leg-pythagoras"],
      cards: ["herons-formula", "triangle-13-14-15", "inradius-area", "max-rectangle-in-triangle"],
      body: String.raw`What is the area of a triangle with sides $7$, $8$ and $9$? What is the radius of the circle inscribed in a triangle with sides $5$, $5$ and $6$? Three sides fix a triangle, so they fix its area and its inscribed circle too.

[[herons-formula|Heron's formula]] gives the area from the sides alone: with the semiperimeter $s = \tfrac{a + b + c}{2}$, the area is $\sqrt{s(s - a)(s - b)(s - c)}$. For $7$, $8$, $9$, $s = 12$ and the area is $\sqrt{12 \cdot 5 \cdot 4 \cdot 3} = \sqrt{720} = 12\sqrt5$. When the sides are small whole numbers, dropping a height and using two right triangles sharing a leg (S1.5) is an alternative, and sometimes faster.

[[triangle-13-14-15|The $13$-$14$-$15$ triangle]] is the one to know by heart. Its height to the side $14$ is $12$, landing $5$ along it, so it is a $5$-$12$-$13$ and a $9$-$12$-$15$ right triangle glued together. Its area is $84$, its inradius $4$, its circumradius $\tfrac{65}{8}$. Problem writers use it whenever they want a scalene triangle with whole-number measurements, and spotting it saves the whole computation.

[[inradius-area|The inradius]] satisfies $A = rs$: the segments from the incenter to the corners cut the triangle into three triangles of height $r$ over the three sides, with areas adding to $\tfrac12 r(a + b + c)$. For $5$, $5$, $6$: $s = 8$, the area is $\sqrt{8 \cdot 3 \cdot 3 \cdot 2} = 12$, and $r = \tfrac{12}{8} = \tfrac32$. The same formula holds for any polygon with an inscribed circle. [[max-rectangle-in-triangle|The largest rectangle]] standing on a side of a triangle has half the triangle's area: its top lies on the midline, so it is half the base wide and half the height tall.

Use Heron's formula when only the sides are known, recognize $13$-$14$-$15$, and divide the area by the semiperimeter for the inradius. The next lesson connects sides and angles.`,
      related: [
        { card: "incircle-tangent-lengths", note: String.raw`the tangent lengths $s - a$, $s - b$, $s - c$ inside Heron's formula (S5.6).` },
        { card: "circumradius-area", note: String.raw`the circumradius from the sides and the area, $R = \tfrac{abc}{4A}$ (S9.2).` },
        { card: "incenter-area-split", note: String.raw`the three pieces of the inradius formula, in the ratio of the sides (S3.4).` }
      ],
      exercises: [
        { q: String.raw`What is the area of a triangle with sides $13$, $14$ and $15$?`, answer: "84",
          solution: String.raw`$s = 21$, and $\sqrt{21 \cdot 8 \cdot 7 \cdot 6} = \sqrt{7056} = 84$. Or: the height to the side $14$ is $12$, and $\tfrac12 \cdot 14 \cdot 12 = 84$.` },
        { q: String.raw`What is the radius of the circle inscribed in a triangle with sides $5$, $5$ and $6$?`, answer: "3/2",
          solution: String.raw`The area is $\tfrac12 \cdot 6 \cdot 4 = 12$, since the height to the base $6$ is $\sqrt{25 - 9} = 4$. The semiperimeter is $8$, so $r = \tfrac{12}{8} = \tfrac32$.` },
        { q: String.raw`What is the area of a triangle with sides $7$, $8$ and $9$?`, answer: "12sqrt(5)",
          solution: String.raw`$s = 12$, and the area is $\sqrt{12 \cdot 5 \cdot 4 \cdot 3} = \sqrt{720} = 12\sqrt5$.` },
        { q: String.raw`A triangle has area $30$. What is the largest area of a rectangle with one side on a side of the triangle and its other two corners on the other two sides?`, answer: "15",
          solution: String.raw`A rectangle of height $y$ on a base $b$ with height $h$ has width $b\left(1 - \tfrac yh\right)$, so area $by\left(1 - \tfrac yh\right)$, largest at $y = \tfrac h2$: $\tfrac{bh}{4}$, half the triangle. So $15$.` }
      ],
      problems: [
        "2019 AMC 10A, Problem 21",
        "2012 AMC 12B, Problem 20",
        "2012 AMC 12A, Problem 18",
        "2008 AMC 12B, Problem 18",
        "2008 AMC 12A, Problem 20"
      ]
    },
    "S4.6": {
      prereq: ["pythagorean-theorem", "triangle-type-by-sides", "special-right-triangles"],
      cards: ["law-of-cosines", "law-cosines-60-120", "law-of-cosines-special-triangles", "trig-area"],
      body: String.raw`Two sides of $5$ and $8$ meet at $60^\circ$: how long is the third side? A triangle has sides $7$, $8$ and $13$: what is its largest angle? Two sides of $8$ and $10$ meet at $30^\circ$: what is the area? The Pythagorean theorem has a version for every angle, and the area formula has one too.

[[law-of-cosines|The law of cosines]] says $c^2 = a^2 + b^2 - 2ab\cos C$, where $C$ is the angle between $a$ and $b$. It gives the third side from two sides and the angle between them, and any angle from the three sides: $\cos C = \tfrac{a^2 + b^2 - c^2}{2ab}$. When $C = 90^\circ$ the correction vanishes and it is the Pythagorean theorem; the sign of $a^2 + b^2 - c^2$ says whether $C$ is acute or obtuse (S1.3). In the $13$-$14$-$15$ triangle, the angle opposite $13$ has cosine $\tfrac{196 + 225 - 169}{2 \cdot 14 \cdot 15} = \tfrac35$.

[[law-cosines-60-120|At $60^\circ$ and $120^\circ$]] the cosine is $\pm\tfrac12$, and the law becomes $c^2 = a^2 + b^2 \mp ab$: sides $5$ and $8$ at $60^\circ$ give $c^2 = 89 - 40 = 49$, so $c = 7$. These angles appear whenever a figure has an equilateral triangle or a regular hexagon. [[law-of-cosines-special-triangles|A few triangles]] with these angles have whole-number sides and are worth recognizing: $3$-$5$-$7$ and $7$-$8$-$13$ with $120^\circ$ opposite the longest side, and $3$-$7$-$8$ and $5$-$7$-$8$ with $60^\circ$ opposite the $7$. So the largest angle of $7$-$8$-$13$ is $120^\circ$: $\cos C = \tfrac{49 + 64 - 169}{112} = -\tfrac12$.

[[trig-area|The sine area formula]] is $A = \tfrac12 ab\sin C$, base times height with the height written as $b\sin C$. Sides $8$ and $10$ at $30^\circ$ give $\tfrac12 \cdot 8 \cdot 10 \cdot \tfrac12 = 20$, and sides $7$ and $8$ at $60^\circ$ give $\tfrac12 \cdot 56 \cdot \tfrac{\sqrt3}{2} = 14\sqrt3$. Since $\sin C = \sin(180^\circ - C)$, an angle and its supplement give the same area, which is why triangles sharing an angle, or with supplementary angles, compare so easily (S3.4).

Use the law of cosines for a side from an angle or an angle from the sides, recognize the $60^\circ$ and $120^\circ$ triangles, and take $\tfrac12 ab\sin C$ when two sides and their angle are known. The Summary follows.`,
      related: [
        { card: "law-of-sines", note: String.raw`sides in proportion to the sines of the opposite angles (S9.2).` },
        { card: "stewarts-theorem", note: String.raw`a cevian's length, from the law of cosines used twice (S9.3).` },
        { card: "parallelogram-area", note: String.raw`the same sine formula for a parallelogram, $ab\sin\theta$ (S2.3).` }
      ],
      exercises: [
        { q: String.raw`A triangle has sides $7$, $8$ and $13$. What is its largest angle, in degrees?`, answer: "120",
          solution: String.raw`The largest angle is opposite $13$: $\cos C = \tfrac{49 + 64 - 169}{2 \cdot 7 \cdot 8} = \tfrac{-56}{112} = -\tfrac12$, so $C = 120^\circ$.` },
        { q: String.raw`In the triangle with sides $13$, $14$ and $15$, what is the cosine of the angle opposite the side $13$?`, answer: "3/5",
          solution: String.raw`$\cos A = \tfrac{14^2 + 15^2 - 13^2}{2 \cdot 14 \cdot 15} = \tfrac{196 + 225 - 169}{420} = \tfrac{252}{420} = \tfrac35$.` },
        { q: String.raw`Two sides of a triangle are $8$ and $10$, and the angle between them is $30^\circ$. What is its area?`, answer: "20",
          solution: String.raw`$A = \tfrac12 \cdot 8 \cdot 10 \cdot \sin 30^\circ = 40 \cdot \tfrac12 = 20$.` },
        { q: String.raw`Two sides of a triangle are $7$ and $8$, and the angle between them is $60^\circ$. What is its area?`, answer: "14sqrt(3)",
          solution: String.raw`$A = \tfrac12 \cdot 7 \cdot 8 \cdot \tfrac{\sqrt3}{2} = 14\sqrt3$.` }
      ],
      problems: [
        "2005 AMC 10B, Problem 14",
        "2014 AMC 10A, Problem 13",
        "2015 AMC 10A, Problem 19",
        "2021 Fall AMC 10B, Problem 18",
        "2009 AMC 12A, Problem 13",
        "2013 AMC 12A, Problem 12",
        "2021 Spring AMC 10B, Problem 20",
        "2022 AMC 12B, Problem 10",
        "2023 AMC 12B, Problem 17"
      ]
    },
    "S4.7": {
      prereq: ["15-75-90-triangle", "median-to-hypotenuse", "right-triangle-inradius", "altitude-hypotenuse", "right-triangle-altitude", "extend-sides-to-meet", "median-doubling", "equilateral-triangle-facts", "point-in-equilateral", "inscribed-square", "herons-formula", "triangle-13-14-15", "inradius-area", "max-rectangle-in-triangle", "law-of-cosines", "law-cosines-60-120", "law-of-cosines-special-triangles", "trig-area"],
      cards: [],
      body: String.raw`In a right triangle, [[median-to-hypotenuse|the median to the hypotenuse]] is half of it, [[right-triangle-inradius|the inradius]] is $\tfrac{a+b-c}{2}$, and [[15-75-90-triangle|the $15$-$75$-$90$ triangle]] has known sides. [[altitude-hypotenuse|The altitude to the hypotenuse]] gives geometric means, in [[right-triangle-altitude|three similar triangles]].

[[extend-sides-to-meet|Extending sides to meet]] completes a triangle, and [[median-doubling|doubling a median]] makes a parallelogram.

[[equilateral-triangle-facts|An equilateral triangle]] is fixed by its side; [[point-in-equilateral|a point inside]] has distances to the sides adding to the height; [[inscribed-square|a square on the base]] has side $\tfrac{ah}{a+h}$.

[[herons-formula|Heron's formula]] gives the area from the sides, [[triangle-13-14-15|$13$-$14$-$15$]] has area $84$, [[inradius-area|$A = rs$]] gives the inradius, and [[max-rectangle-in-triangle|the largest rectangle]] is half the triangle. [[law-of-cosines|The law of cosines]], [[law-cosines-60-120|its $60^\circ$ and $120^\circ$ forms]] and [[law-of-cosines-special-triangles|their whole-number triangles]] connect sides and angles, and [[trig-area|$\tfrac12 ab\sin C$]] gives the area.`,
      strategies: [
        String.raw`In a right triangle, look at the midpoint of the hypotenuse: it is equally far from all three corners.`,
        String.raw`Draw the altitude to the hypotenuse and use the three similar triangles.`,
        String.raw`Extend the legs of a trapezoid, or two sides of a quadrilateral, until they meet.`,
        String.raw`Recognize $13$-$14$-$15$, $3$-$5$-$7$ and $7$-$8$-$13$ before computing.`,
        String.raw`For an inradius, divide the area by the semiperimeter.`,
        String.raw`With two sides and the angle between them, use the law of cosines for the third side and $\tfrac12 ab\sin C$ for the area.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the radius of the circle inscribed in a triangle with sides $6$, $8$ and $10$?`, answer: "2",
        solution: String.raw`It is a right triangle, so $r = \tfrac{6 + 8 - 10}{2} = 2$; or $A = 24$, $s = 12$, $r = 2$.` },
      { q: String.raw`An equilateral triangle has perimeter $18$. What is its area?`, answer: "9sqrt(3)",
        solution: String.raw`Its side is $6$, so its area is $\tfrac{\sqrt3}{4} \cdot 36 = 9\sqrt3$.` },
      { q: String.raw`Two sides of a triangle are $4$ and $6$, and the angle between them is $120^\circ$. How long is the third side?`, answer: "2sqrt(19)",
        solution: String.raw`At $120^\circ$, $c^2 = a^2 + b^2 + ab = 16 + 36 + 24 = 76$, so $c = \sqrt{76} = 2\sqrt{19}$.` }
    ],
    problems: [
      "2003 AMC 10A, Problem 17",
      "2003 AMC 12A, Problem 11",
      "2007 AMC 10B, Problem 17",
      "2013 AMC 12A, Problem 11",
      "2008 AMC 12B, Problem 13",
      "2006 AMC 12A, Problem 17",
      "2010 AMC 12B, Problem 22"
    ]
  },
  challenge: {
    problems: [
      "2019 AMC 12B, Problem 20",
      "2021 Fall AMC 12A, Problem 14",
      "2025 AMC 12B, Problem 21",
      "2018 AIME I, Problem 4",
      "2019 AIME I, Problem 3"
    ]
  }
};
