// Learn, AMC to AIME Bridge, chapter B5: geometry fundamentals and coordinates (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["B5"] = {
  lessons: {
    "B5.1": {
      prereq: [],
      cards: ["triangle-similarity", "similar-figures-ratios", "pythagorean-theorem", "special-right-triangles", "15-75-90-triangle", "triangle-area-standard", "triangle-inequality", "triangle-congruence", "parallel-exterior-angles", "median-to-hypotenuse", "right-triangle-inradius"],
      body: String.raw`Triangles carry most of contest geometry, and a small set of facts about them answers most AMC questions: when two triangles are similar or congruent, the Pythagorean theorem and the special right triangles, the area formula, and which side lengths can form a triangle at all. Everything later in the geometry book builds on these.

Two triangles are [[triangle-congruence|congruent]] (SSS, SAS, ASA, AAS, or HL for right triangles) when one is an exact copy of the other, and [[triangle-similarity|similar]] (AA, SAS or SSS similarity) when one is a scaled copy. In [[similar-figures-ratios|similar figures]] with ratio $k$, every length scales by $k$, every area by $k^2$ and every volume by $k^3$. Angles come from the triangle sum, the isosceles base angles, and [[parallel-exterior-angles|parallel lines and exterior angles]]: alternate angles across a transversal are equal, and an exterior angle of a triangle equals the sum of the two remote interior angles.

The [[pythagorean-theorem|Pythagorean theorem]] $a^2 + b^2 = c^2$ relates the sides of a right triangle. The [[special-right-triangles|special right triangles]] have sides in fixed ratios: $45$-$45$-$90$ as $1 : 1 : \sqrt2$ and $30$-$60$-$90$ as $1 : \sqrt3 : 2$, so a $30$-$60$-$90$ triangle with hypotenuse $10$ has legs $5$ and $5\sqrt3$. The [[15-75-90-triangle|$15$-$75$-$90$ triangle]] has altitude to the hypotenuse equal to a quarter of the hypotenuse, so its area is $\tfrac{c^2}{8}$.

The [[triangle-area-standard|area]] is half the base times the height, using any side and the altitude to it. In a right triangle the [[median-to-hypotenuse|median to the hypotenuse]] is half the hypotenuse, since the midpoint of the hypotenuse is equidistant from all three vertices ($5$ for the $6$-$8$-$10$ triangle), and the [[right-triangle-inradius|inradius]] is $\tfrac{a + b - c}{2}$ ($2$ for the $5$-$12$-$13$ triangle).

The [[triangle-inequality|triangle inequality]] says each side is less than the sum of the other two, so sides $5$ and $9$ allow a third side $x$ with $4 \lt x \lt 14$, which is $9$ integers. It decides which side lengths are possible and bounds a side from two others.

Look for similar triangles and right triangles, and use the special ratios. The next lesson brings in circles.`,
      related: [
        { card: "parallel-line-similarity", note: String.raw`drawing a parallel line to create similar triangles (G1.1).` },
        { card: "pythagorean-triples", note: String.raw`integer right triangles (N5.5).` },
        { card: "law-of-cosines", note: String.raw`the Pythagorean theorem for any angle (B5.4).` }
      ],
      exercises: [
        { q: String.raw`A $30$-$60$-$90$ triangle has hypotenuse $10$. Find its longer leg.`, answer: "5sqrt(3)",
          solution: String.raw`The sides are in the ratio $1 : \sqrt3 : 2$, so the shorter leg is $5$ and the longer is $5\sqrt3$.` },
        { q: String.raw`A triangle has sides $5$ and $9$ and an integer third side. How many values can the third side take?`, answer: "9",
          solution: String.raw`The third side $x$ must satisfy $9 - 5 \lt x \lt 9 + 5$, so $5 \le x \le 13$: $9$ values.` },
        { q: String.raw`Find the inradius of the right triangle with sides $5$, $12$, $13$.`, answer: "2",
          solution: String.raw`For a right triangle $r = \tfrac{a + b - c}{2} = \tfrac{5 + 12 - 13}{2} = 2$. Check: area $30 = r \cdot s = 2 \cdot 15$.` }
      ],
      problems: [
        "2021 Fall AMC 10B, Problem 2",
        "2006 AMC 10B, Problem 8",
        "2023 AMC 10A, Problem 11",
        "2010 AMC 12A, Problem 7",
        "2021 Fall AMC 10B, Problem 15",
        "2016 AMC 10A, Problem 19",
        "2009 AMC 10B, Problem 22",
        "2006 AIME I, Problem 1",
        "2004 AIME I, Problem 4"
      ]
    },
    "B5.2": {
      prereq: ["triangle-congruence"],
      cards: ["inscribed-angle-theorem", "circle-basics", "tangent-facts", "chord-length", "power-of-a-point"],
      body: String.raw`Circles bring a second set of basic facts: lengths and areas of arcs and sectors, angles inscribed in arcs, tangent lines and their right angles, chords and their distances from the center, and the products of segments through a point. With them, most circle questions on the AMC become triangle questions.

The [[circle-basics|circle formulas]]: circumference $2\pi r$, area $\pi r^2$, and for a central angle $\theta$ degrees, arc length $\tfrac{\theta}{360} \cdot 2\pi r$ and sector area $\tfrac{\theta}{360}\pi r^2$; a $60^\circ$ arc of a circle of radius $6$ has length $2\pi$. The [[inscribed-angle-theorem|inscribed angle theorem]] says an angle with its vertex on the circle is half the central angle on the same arc, so all inscribed angles on one arc are equal and an angle in a semicircle is a right angle.

[[tangent-facts|Tangent facts]]: a tangent is perpendicular to the radius at the point of tangency, and the two tangent segments from an outside point are equal. A point $13$ from the center of a circle of radius $5$ has tangent segments of length $\sqrt{169 - 25} = 12$. The [[chord-length|perpendicular from the center to a chord bisects it]], so a chord at distance $d$ from the center of a circle of radius $r$ has length $2\sqrt{r^2 - d^2}$: radius $13$ and distance $5$ give $24$.

The [[power-of-a-point|power of a point]] relates segments through a common point: two chords crossing at $P$ satisfy $PA \cdot PB = PC \cdot PD$, and from an outside point the tangent squared equals the product of the secant's two segments. It finds an unknown segment in one equation.

Draw radii to points of tangency and to chord endpoints, and look for right angles. The next lesson places figures in coordinates.`,
      related: [
        { card: "angle-chasing", note: String.raw`propagating angles with inscribed angles and cyclic quadrilaterals (G2.1).` },
        { card: "thales-theorem", note: String.raw`the right angle in a semicircle and its converse (G2.2).` },
        { card: "tangent-circles", note: String.raw`circles that touch each other (G2.5).` }
      ],
      exercises: [
        { q: String.raw`A point is $13$ units from the center of a circle of radius $5$. Find the length of a tangent segment from the point to the circle.`, answer: "12",
          solution: String.raw`The radius to the point of tangency is perpendicular to the tangent, so the tangent length is $\sqrt{13^2 - 5^2} = 12$.` },
        { q: String.raw`A chord of a circle of radius $13$ is at distance $5$ from the center. Find its length.`, answer: "24",
          solution: String.raw`Half the chord is $\sqrt{13^2 - 5^2} = 12$, so the chord is $24$.` }
      ],
      problems: [
        "2010 AMC 10A, Problem 5",
        "2021 Spring AMC 10B, Problem 7",
        "2005 AMC 12B, Problem 5",
        "2007 AMC 12A, Problem 8",
        "2021 Fall AMC 12A, Problem 11",
        "2022 AMC 10B, Problem 20",
        "2007 AMC 10A, Problem 24",
        "2003 AIME I, Problem 2"
      ]
    },
    "B5.3": {
      prereq: ["pythagorean-theorem"],
      cards: ["distance-midpoint", "line-forms", "point-line-distance", "circle-equation"],
      body: String.raw`Coordinates turn geometry into algebra, and a handful of formulas make it work: distance and midpoint, the forms of a line, the distance from a point to a line, and the equation of a circle. AMC problems use them both directly and as a fallback when a synthetic idea does not appear.

The [[distance-midpoint|distance formula]] $\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ is the Pythagorean theorem, so $(1, 2)$ and $(7, 10)$ are $10$ apart; the midpoint averages the coordinates, and the slope is the rise over the run. The [[line-forms|forms of a line]]: slope-intercept $y = mx + b$, point-slope $y - y_1 = m(x - x_1)$, standard $ax + by = c$, and intercept form $\tfrac xa + \tfrac yb = 1$. The line through $(1, 2)$ and $(3, 8)$ has slope $3$ and $y$-intercept $-1$. Parallel lines have equal slopes and perpendicular lines have slopes with product $-1$.

The [[point-line-distance|distance from a point to a line]] $ax + by + c = 0$ is $\tfrac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$, which gives heights of triangles and tangency conditions. The [[circle-equation|equation of a circle]] with center $(h, k)$ and radius $r$ is $(x - h)^2 + (y - k)^2 = r^2$, and completing the square reads the center and radius from an expanded equation: $x^2 + y^2 - 6x + 8y = 0$ is $(x - 3)^2 + (y + 4)^2 = 25$, radius $5$.

Place figures so that coordinates are simple, then compute with these formulas. The last lesson of the chapter adds trigonometry.`,
      related: [
        { card: "coordinate-bash", note: String.raw`choosing good coordinates for a figure (G4.1).` },
        { card: "shoelace-formula", note: String.raw`areas from coordinates (G4.3).` },
        { card: "completing-the-square", note: String.raw`reading a circle's center and radius from its equation (A1.4).` }
      ],
      exercises: [
        { q: String.raw`Find the distance between $(1, 2)$ and $(7, 10)$.`, answer: "10",
          solution: String.raw`$\sqrt{6^2 + 8^2} = \sqrt{100} = 10$.` },
        { q: String.raw`Find the radius of the circle $x^2 + y^2 - 6x + 8y = 0$.`, answer: "5",
          solution: String.raw`Completing the squares, $(x - 3)^2 + (y + 4)^2 = 9 + 16 = 25$, so the radius is $5$.` }
      ],
      problems: [
        "2010 AMC 10A, Problem 7",
        "2017 AMC 10B, Problem 8",
        "2017 AMC 10B, Problem 10",
        "2004 AMC 12A, Problem 5",
        "2003 AMC 12B, Problem 9",
        "2016 AMC 12B, Problem 10",
        "2004 AMC 12B, Problem 18",
        "2022 AIME I, Problem 1",
        "1993 AIME, Problem 12"
      ]
    },
    "B5.4": {
      prereq: ["pythagorean-theorem", "special-right-triangles"],
      cards: ["law-of-sines", "law-of-cosines", "trig-area"],
      body: String.raw`Three trigonometric formulas extend right-triangle facts to every triangle, and they are the bridge from AMC 10 geometry to the trigonometric methods of the AIME. Students who have not met sine and cosine beyond right triangles should learn these three before the AIME geometry book.

The [[law-of-cosines|law of cosines]] $c^2 = a^2 + b^2 - 2ab\cos C$ finds the third side from two sides and the angle between them, or an angle from three sides. With $\cos 120^\circ = -\tfrac12$, sides $7$ and $8$ at $120^\circ$ give $c^2 = 49 + 64 + 56 = 169$, so $c = 13$. When $C = 90^\circ$ it is the Pythagorean theorem.

The [[law-of-sines|law of sines]] $\tfrac{a}{\sin A} = \tfrac{b}{\sin B} = \tfrac{c}{\sin C} = 2R$ relates sides to opposite angles, with $R$ the circumradius. It finds sides from two angles and one side, and it turns ratios of sides into ratios of sines.

The [[trig-area|sine area formula]] $\tfrac12ab\sin C$ gives the area from two sides and the included angle: sides $8$ and $10$ at $30^\circ$ give $\tfrac12 \cdot 80 \cdot \tfrac12 = 20$. It also explains why triangles sharing an angle have areas in the ratio of the products of the sides around it.

These three formulas, with the exact values of sine and cosine at $30^\circ$, $45^\circ$, $60^\circ$, $90^\circ$ and $120^\circ$, are enough for the trigonometry in AMC problems. The next chapter collects the habits of checking and estimating.`,
      related: [
        { card: "law-cosines-60-120", note: String.raw`the law of cosines at $60^\circ$ and $120^\circ$ (G3.1).` },
        { card: "common-angle-values", note: String.raw`the exact sines and cosines of the common angles (A7.2).` },
        { card: "herons-formula", note: String.raw`the area from three sides, without an angle (G3.1).` }
      ],
      exercises: [
        { q: String.raw`Two sides of a triangle are $7$ and $8$, and the angle between them is $120^\circ$. Find the third side.`, answer: "13",
          solution: String.raw`$c^2 = 49 + 64 - 2 \cdot 7 \cdot 8 \cdot \left(-\tfrac12\right) = 169$, so $c = 13$.` },
        { q: String.raw`Find the area of a triangle with sides $8$ and $10$ and included angle $30^\circ$.`, answer: "20",
          solution: String.raw`$\tfrac12 \cdot 8 \cdot 10 \cdot \sin 30^\circ = 40 \cdot \tfrac12 = 20$.` }
      ],
      problems: [
        "2023 AMC 10A, Problem 13",
        "2014 AMC 10A, Problem 13",
        "2005 AMC 10B, Problem 14",
        "2015 AMC 10A, Problem 19",
        "2006 AMC 12A, Problem 17",
        "2017 AMC 12A, Problem 24",
        "2021 Fall AMC 12B, Problem 24",
        "2003 AIME I, Problem 12",
        "2004 AIME II, Problem 13"
      ]
    }
  }
};
