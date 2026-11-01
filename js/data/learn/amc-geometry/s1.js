// Learn, AMC Geometry, chapter S1: angles, triangles and area (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S1"] = {
  lessons: {
    "S1.1": {
      prereq: [],
      cards: [],
      body: String.raw`Geometry starts with three measurements: the angles of a figure, its lengths, and its area. This chapter gives the first facts about each, for lines and triangles, and the one theorem used more than any other in contest geometry.

Angles are measured in degrees, and a straight line makes $180^\circ$. The three angles of any triangle add up to $180^\circ$, so a triangle with angles of $50^\circ$ and $60^\circ$ has a third angle of $70^\circ$. The sides of a triangle are limited too: each must be shorter than the other two together, since the straight path between two corners is the shortest. The area of a triangle is half its base times its height, where the height is measured at a right angle to the base: a triangle with base $10$ and height $7$ has area $35$. And in a triangle with a right angle, the side across from it, the hypotenuse, satisfies the Pythagorean theorem: legs of $6$ and $8$ give a hypotenuse of $\sqrt{36 + 64} = 10$.

The lessons take these ideas in turn: angles and parallel lines (S1.2), triangles and congruence (S1.3), area and perimeter (S1.4), and the Pythagorean theorem (S1.5). The Summary (S1.6) collects the strategies.`,
      exercises: [
        { q: String.raw`Two angles of a triangle measure $50^\circ$ and $60^\circ$. What is the third angle, in degrees?`, answer: "70",
          solution: String.raw`The angles of a triangle add to $180^\circ$, so the third is $180^\circ - 50^\circ - 60^\circ = 70^\circ$.` },
        { q: String.raw`A right triangle has legs $6$ and $8$. How long is its hypotenuse?`, answer: "10",
          solution: String.raw`By the Pythagorean theorem the hypotenuse is $\sqrt{6^2 + 8^2} = \sqrt{100} = 10$.` },
        { q: String.raw`A triangle has a base of $10$ and a height of $7$ to that base. What is its area?`, answer: "35",
          solution: String.raw`The area is half the base times the height: $\tfrac12 \cdot 10 \cdot 7 = 35$.` }
      ],
      problems: [
        "1999 AMC 8, Problem 2",
        "2016 AMC 8, Problem 2",
        "2015 AMC 8, Problem 8"
      ]
    },
    "S1.2": {
      prereq: [],
      cards: ["parallel-exterior-angles", "parallel-by-angle-sum", "angle-chasing", "clock-angle", "trapezoid-consecutive-angles"],
      body: String.raw`A line crosses two parallel lines and one of the angles it makes is $65^\circ$: what are the others? A triangle has angles of $40^\circ$ and $75^\circ$: what is the angle outside it at the third corner? What angle do the hands of a clock make at $3{:}30$? Each is found from a handful of exact rules about angles, which never mention a length.

[[parallel-exterior-angles|Parallel lines]] cut by a transversal make equal corresponding angles and equal alternate angles, and the two angles between the lines on the same side add to $180^\circ$; so a $65^\circ$ angle is accompanied by angles of $65^\circ$ and $115^\circ$ only. Drawing a line through one corner of a triangle parallel to the opposite side turns these facts into the angle sum, $180^\circ$, and into the exterior angle theorem: the angle outside a triangle at one corner equals the sum of the two inside angles at the other corners, $40^\circ + 75^\circ = 115^\circ$ in the example. [[parallel-by-angle-sum|The converse]] holds as well: if the two same-side angles add to $180^\circ$, or alternate angles are equal, the lines are parallel. In a [[trapezoid-consecutive-angles|trapezoid]], each leg is a transversal of the two parallel bases, so the two angles along each leg add to $180^\circ$.

[[angle-chasing|Angle chasing]] uses these rules, with the facts that angles on a line add to $180^\circ$, angles around a point to $360^\circ$, and the base angles of an isosceles triangle are equal, to carry one known angle across a whole figure. Let triangle $ABC$ have $AB = AC$ and $\angle A = 40^\circ$, and let $D$ on $AC$ make $BD = BC$. The base angles of $ABC$ are $\tfrac{180^\circ - 40^\circ}{2} = 70^\circ$; triangle $BDC$ is isosceles with $\angle BDC = \angle C = 70^\circ$, so $\angle DBC = 40^\circ$; and $\angle ABD = 70^\circ - 40^\circ = 30^\circ$. Write each new angle on the figure as it is found, and give an unknown angle a name, such as $x$, when no number is known yet.

[[clock-angle|Clock hands]] are a moving version of the same counting. The minute hand turns $6^\circ$ a minute and the hour hand $0.5^\circ$, so at $H$ hours and $M$ minutes the angle between them is $|30H - 5.5M|$ degrees (or $360^\circ$ less that, if it exceeds $180^\circ$): at $3{:}30$ it is $|90 - 165| = 75^\circ$, not $90^\circ$, because the hour hand has moved halfway toward the $4$.

Mark every angle you know, use parallels, straight lines and isosceles triangles to find the rest, and name an unknown when you must. The next lesson turns from angles to the sides of triangles.`,
      related: [
        { card: "polygon-angle-sums", note: String.raw`the angle sum of any polygon, built from triangles (S2.2).` },
        { card: "inscribed-angle-theorem", note: String.raw`the angle rule for circles that angle chasing uses most (S5.3).` },
        { card: "triangle-similarity", note: String.raw`triangles with equal angles, found by chasing (S3.2).` }
      ],
      exercises: [
        { q: String.raw`A transversal crosses two parallel lines and makes an angle of $65^\circ$ with one of them. What is the angle between the lines on the same side of the transversal as that angle, at the other line?`, answer: "115",
          solution: String.raw`The two angles between the parallel lines on the same side of a transversal add to $180^\circ$, so the other is $180^\circ - 65^\circ = 115^\circ$.` },
        { q: String.raw`A triangle has angles of $40^\circ$ and $75^\circ$. What is the exterior angle at its third corner, in degrees?`, answer: "115",
          solution: String.raw`An exterior angle equals the sum of the two interior angles at the other corners: $40^\circ + 75^\circ = 115^\circ$. (The third interior angle is $65^\circ$, and $180^\circ - 65^\circ = 115^\circ$.)` },
        { q: String.raw`In triangle $ABC$, $AB = AC$ and $\angle A = 40^\circ$. Point $D$ lies on side $AC$ with $BD = BC$. What is $\angle ABD$, in degrees?`, answer: "30",
          solution: String.raw`The base angles are $\angle B = \angle C = \tfrac{180^\circ - 40^\circ}{2} = 70^\circ$. Triangle $BDC$ has $BD = BC$, so $\angle BDC = \angle C = 70^\circ$ and $\angle DBC = 180^\circ - 140^\circ = 40^\circ$. So $\angle ABD = 70^\circ - 40^\circ = 30^\circ$.` },
        { q: String.raw`What is the smaller angle between the hands of a clock at $3{:}30$, in degrees?`, answer: "75",
          solution: String.raw`The minute hand points at the $6$, $180^\circ$ from the $12$. The hour hand is halfway from the $3$ to the $4$: $90^\circ + 15^\circ = 105^\circ$. The angle between them is $180^\circ - 105^\circ = 75^\circ$, matching $|30 \cdot 3 - 5.5 \cdot 30| = 75$.` }
      ],
      problems: [
        "1994 AJHSME, Problem 7",
        "1995 AJHSME, Problem 13",
        "1997 AJHSME, Problem 12",
        "2003 AMC 8, Problem 20",
        "2000 AMC 8, Problem 24",
        "2014 AMC 8, Problem 9",
        "2023 AMC 10B, Problem 7",
        "2007 AMC 10A, Problem 8"
      ]
    },
    "S1.3": {
      prereq: ["parallel-exterior-angles"],
      cards: ["triangle-inequality", "triangle-type-by-sides", "triangle-congruence"],
      body: String.raw`A triangle has sides $5$ and $9$: what can the third side be? Are the sides $6$, $7$, $10$ those of an acute, a right or an obtuse triangle? When do two triangles have to be identical? The sides of a triangle are not free, and a few of its parts fix the rest.

[[triangle-inequality|The triangle inequality]] says that each side is shorter than the sum of the other two, and three lengths form a triangle exactly when all three such conditions hold. With two sides $a$ and $b$ known, the third side $c$ satisfies $|a - b| \lt c \lt a + b$: for $5$ and $9$, $4 \lt c \lt 14$, so a whole-number third side is one of the $9$ numbers $5, \ldots, 13$. At the boundary, $c = a + b$, the triangle collapses into a segment; that flat case is where many maximum and minimum problems end. In practice only the largest side needs checking: three lengths make a triangle when the largest is less than the sum of the other two.

[[triangle-type-by-sides|The sides also decide the angles]]. The angle opposite the side $c$ is acute, right or obtuse as $c^2$ is less than, equal to or greater than $a^2 + b^2$. Only the largest side can face an angle of $90^\circ$ or more, so test the largest: for $6, 7, 10$, $10^2 = 100$ exceeds $6^2 + 7^2 = 85$, so the triangle is obtuse. For which whole numbers $x$ is the triangle $7, 10, x$ acute? If $x \le 10$ the test is $100 \lt 49 + x^2$, so $x \ge 8$; if $x \gt 10$ it is $x^2 \lt 149$, so $x \le 12$: the five values $8$ to $12$.

[[triangle-congruence|Congruence]] says when two triangles are copies of each other: when three sides match (SSS), two sides and the angle between them (SAS), two angles and a side (ASA or AAS), or, in right triangles, the hypotenuse and a leg (HL). Two sides and an angle not between them (SSA) do not fix a triangle, since the third side can swing to two positions. Congruence is how a figure's symmetry is proved: the line from the top of an isosceles triangle to the middle of its base makes two triangles congruent by SSS, so it meets the base at right angles and splits the top angle in half.

Check the largest side against the other two, compare squares to read the type of angle, and find a congruence to prove two parts equal. The next lesson measures the region inside a figure.`,
      related: [
        { card: "pythagorean-theorem", note: String.raw`the right-angle case of the comparison of squares (S1.5).` },
        { card: "law-of-cosines", note: String.raw`the exact relation between the sides and any angle (S4.6).` },
        { card: "triangle-similarity", note: String.raw`triangles of the same shape, not size (S3.2).` }
      ],
      exercises: [
        { q: String.raw`A triangle has sides $5$ and $9$, and its third side is a whole number. How many values can the third side take?`, answer: "9",
          solution: String.raw`The third side $c$ must satisfy $9 - 5 \lt c \lt 9 + 5$, that is, $4 \lt c \lt 14$. The whole numbers $5, 6, \ldots, 13$ are $9$ values.` },
        { q: String.raw`Of the triangles with sides $(5, 6, 7)$, $(5, 12, 13)$ and $(6, 7, 10)$, how many are obtuse?`, answer: "1",
          solution: String.raw`Compare the square of the largest side with the sum of the other two squares: $49 \lt 61$ (acute), $169 = 169$ (right), $100 \gt 85$ (obtuse). Only one is obtuse.` },
        { q: String.raw`For how many whole numbers $x$ is there an acute triangle with sides $7$, $10$ and $x$?`, answer: "5",
          solution: String.raw`If $x \le 10$, the largest side is $10$ and the condition is $100 \lt 49 + x^2$, so $x^2 \gt 51$ and $x \ge 8$. If $x \gt 10$, it is $x^2 \lt 49 + 100 = 149$, so $x \le 12$. The values are $8, 9, 10, 11, 12$, and each satisfies the triangle inequality $3 \lt x \lt 17$: five values.` }
      ],
      problems: [
        "1992 AJHSME, Problem 17",
        "2005 AMC 8, Problem 15",
        "2006 AMC 8, Problem 19",
        "2023 AMC 10A, Problem 4",
        "2003 AMC 10A, Problem 7",
        "2006 AMC 10B, Problem 10",
        "2017 AMC 10A, Problem 10",
        "2009 AMC 10A, Problem 12"
      ]
    },
    "S1.4": {
      prereq: [],
      cards: ["triangle-area-standard", "area-by-pieces", "joined-shapes-perimeter"],
      body: String.raw`What is the area of a triangle with corners at $(0, 0)$, $(6, 0)$ and $(2, 5)$? What is the area of an L-shaped room, and how long is the wall around it? When two squares are pushed together, what happens to the perimeter? Area and perimeter are found from a few simple shapes, by adding, subtracting and watching which edges disappear.

[[triangle-area-standard|The area of a triangle]] is half its base times its height, the height being the distance from the third corner to the line of the base, at a right angle. Any side can be the base; choose the one whose height is known. For the corners $(0, 0)$, $(6, 0)$, $(2, 5)$, the base along the $x$-axis is $6$ and the height is $5$, so the area is $15$. In an obtuse triangle the height to a side next to the obtuse angle falls outside the triangle and is measured to the extended base: a base of $4$ with the third corner $6$ above the extended line still gives area $12$. The formula says that triangles with the same base and the same height have the same area, however different they look, which is the idea behind most area comparisons.

[[area-by-pieces|Area by pieces]] handles any region built from simple shapes. Either cut it into rectangles and triangles that meet only along edges and add, or see it as a simple shape with pieces removed and subtract. An $8 \times 6$ rectangle with a $3 \times 2$ corner removed has area $48 - 6 = 42$. Subtracting is usually quicker for shaded regions inside a square, and a region whose area cannot be found directly often differs from one whose area can by a piece that is easy.

[[joined-shapes-perimeter|Joining shapes hides edges]]. When two shapes are put together along an edge, that edge, once on the outside of both, is now inside, so the perimeter of the whole is the sum of the perimeters less twice the shared length: two $5 \times 5$ squares side by side have perimeter $20 + 20 - 10 = 30$. A staircase outline made of right-angle corners has the same perimeter as the rectangle around it, since its horizontal pieces add to the width twice and its vertical pieces to the height twice; so the L-shaped room has the perimeter $2(8 + 6) = 28$ of the full rectangle.

Choose a base with a known height, cut or complete a region into simple shapes, and subtract the hidden edges from a perimeter. The next lesson finds lengths in right triangles.`,
      related: [
        { card: "shoelace-formula", note: String.raw`the area of any polygon from the coordinates of its corners (S7.4).` },
        { card: "same-base-area-ratio", note: String.raw`comparing triangles with a common base or height (S3.4).` },
        { card: "parallelogram-area", note: String.raw`the base-times-height rule for parallelograms and trapezoids (S2.3).` }
      ],
      exercises: [
        { q: String.raw`What is the area of the triangle with corners $(0, 0)$, $(6, 0)$ and $(2, 5)$?`, answer: "15",
          solution: String.raw`Take the side from $(0, 0)$ to $(6, 0)$ as the base, length $6$. The third corner is $5$ above that line, so the height is $5$, and the area is $\tfrac12 \cdot 6 \cdot 5 = 15$.` },
        { q: String.raw`A room is an $8 \times 6$ rectangle with a $3 \times 2$ rectangle cut from one corner. What is its area?`, answer: "42",
          solution: String.raw`Subtract the missing corner from the full rectangle: $8 \cdot 6 - 3 \cdot 2 = 48 - 6 = 42$.` },
        { q: String.raw`What is the perimeter of the room in the last problem?`, answer: "28",
          solution: String.raw`The outline has only right-angle corners. Its horizontal edges add to twice the width, $16$, and its vertical edges to twice the height, $12$, as for the full rectangle. So the perimeter is $28$: cutting the corner removes two edges of lengths $3$ and $2$ and adds two of the same lengths.` },
        { q: String.raw`Two $5 \times 5$ squares are placed side by side so that they share a whole side. What is the perimeter of the resulting rectangle?`, answer: "30",
          solution: String.raw`Each square has perimeter $20$. The shared side, of length $5$, was on the outside of both and is now inside, so the perimeter is $40 - 2 \cdot 5 = 30$, that of a $10 \times 5$ rectangle.` }
      ],
      problems: [
        "1993 AJHSME, Problem 18",
        "1997 AJHSME, Problem 21",
        "2012 AMC 8, Problem 5",
        "2005 AMC 8, Problem 13",
        "2019 AMC 8, Problem 21",
        "2013 AMC 10A, Problem 3",
        "2002 AMC 10A, Problem 8",
        "2016 AMC 10B, Problem 9"
      ]
    },
    "S1.5": {
      prereq: ["triangle-area-standard"],
      cards: ["pythagorean-theorem", "shared-leg-pythagoras", "special-right-triangles"],
      body: String.raw`How long is the diagonal of a $5 \times 12$ rectangle? What is the area of a triangle with sides $13$, $13$ and $10$? Of an equilateral triangle with side $6$? In a triangle with sides $13$, $14$, $15$, how long is the height to the side $14$? Each needs one theorem, sometimes used twice.

[[pythagorean-theorem|The Pythagorean theorem]] says that in a right triangle the legs $a$, $b$ and the hypotenuse $c$ satisfy $a^2 + b^2 = c^2$. The diagonal of a $5 \times 12$ rectangle is the hypotenuse of a right triangle with those legs: $\sqrt{25 + 144} = 13$. Its use is almost always the same: find or make a right angle, often by dropping a perpendicular, and relate the three sides. The height of the isosceles triangle $13, 13, 10$ falls on the middle of the base (S1.3), making two right triangles with hypotenuse $13$ and leg $5$, so the height is $\sqrt{169 - 25} = 12$ and the area is $\tfrac12 \cdot 10 \cdot 12 = 60$. The triples $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(7, 24, 25)$ and their multiples come up so often that they are worth recognizing on sight.

[[shared-leg-pythagoras|Two right triangles sharing a leg]] handle a height that does not fall in a known place. In the triangle $13, 14, 15$, drop the height $h$ to the side $14$, splitting it into $x$ and $14 - x$. Then $h^2 = 13^2 - x^2 = 15^2 - (14 - x)^2$, and subtracting removes $h^2$ and the $x^2$ terms: $169 = 29 + 28x$, so $x = 5$ and $h = 12$. Each equation alone has two unknowns; their difference has one.

[[special-right-triangles|Two right triangles]] have side ratios worth knowing by heart: the $45$-$45$-$90$ triangle has sides $1 : 1 : \sqrt2$, half a square cut along its diagonal, and the $30$-$60$-$90$ triangle has sides $1 : \sqrt3 : 2$, half an equilateral triangle cut by its height. So the equilateral triangle with side $6$ has height $3\sqrt3$ and area $\tfrac12 \cdot 6 \cdot 3\sqrt3 = 9\sqrt3$, and a $30$-$60$-$90$ triangle with hypotenuse $10$ has legs $5$ and $5\sqrt3$. An angle of $30^\circ$, $45^\circ$ or $60^\circ$ in a problem is a signal to drop a perpendicular that makes one of these triangles.

Make a right angle with a perpendicular, recognize the common triples, write the theorem twice when two right triangles share a leg, and turn $30^\circ$, $45^\circ$ and $60^\circ$ into side ratios. The Summary follows.`,
      related: [
        { card: "distance-midpoint", note: String.raw`the Pythagorean theorem in coordinates, as the distance formula (S2.5).` },
        { card: "herons-formula", note: String.raw`the area of a triangle from its three sides (S4.5).` },
        { card: "pythagorean-triples", note: String.raw`the whole-number solutions of $a^2 + b^2 = c^2$.` }
      ],
      exercises: [
        { q: String.raw`How long is the diagonal of a $5 \times 12$ rectangle?`, answer: "13",
          solution: String.raw`The diagonal is the hypotenuse of a right triangle with legs $5$ and $12$: $\sqrt{25 + 144} = \sqrt{169} = 13$.` },
        { q: String.raw`What is the area of a triangle with sides $13$, $13$ and $10$?`, answer: "60",
          solution: String.raw`The height to the base $10$ meets it at its midpoint, making right triangles with hypotenuse $13$ and leg $5$. So the height is $\sqrt{169 - 25} = 12$, and the area is $\tfrac12 \cdot 10 \cdot 12 = 60$.` },
        { q: String.raw`What is the area of an equilateral triangle with side $6$?`, answer: "9sqrt(3)",
          solution: String.raw`The height splits it into two $30$-$60$-$90$ triangles with hypotenuse $6$ and short leg $3$, so the height is $3\sqrt3$. The area is $\tfrac12 \cdot 6 \cdot 3\sqrt3 = 9\sqrt3$.` },
        { q: String.raw`A triangle has sides $13$, $14$ and $15$. How long is its height to the side of length $14$?`, answer: "12",
          solution: String.raw`The height $h$ splits the side $14$ into $x$ (next to the side $13$) and $14 - x$. Then $h^2 = 169 - x^2 = 225 - (14 - x)^2 = 29 + 28x - x^2$. So $169 = 29 + 28x$, $x = 5$, and $h = \sqrt{169 - 25} = 12$.` }
      ],
      problems: [
        "1997 AJHSME, Problem 15",
        "2007 AMC 8, Problem 14",
        "2002 AMC 8, Problem 16",
        "2014 AMC 8, Problem 14",
        "2005 AMC 10A, Problem 4",
        "2009 AMC 10B, Problem 4",
        "2010 AMC 10A, Problem 14",
        "2015 AMC 10A, Problem 11",
        "2019 AMC 10B, Problem 15"
      ]
    },
    "S1.6": {
      prereq: ["parallel-exterior-angles", "parallel-by-angle-sum", "angle-chasing", "clock-angle", "trapezoid-consecutive-angles", "triangle-inequality", "triangle-type-by-sides", "triangle-congruence", "triangle-area-standard", "area-by-pieces", "joined-shapes-perimeter", "pythagorean-theorem", "shared-leg-pythagoras", "special-right-triangles"],
      cards: [],
      body: String.raw`[[parallel-exterior-angles|Parallel lines]] give equal and supplementary angles, a triangle's angles add to $180^\circ$, and [[angle-chasing|angle chasing]] carries one angle across a figure. [[parallel-by-angle-sum|Supplementary same-side angles]] prove lines parallel, as in [[trapezoid-consecutive-angles|a trapezoid]], and [[clock-angle|clock hands]] make $|30H - 5.5M|$ degrees.

[[triangle-inequality|The triangle inequality]] limits the sides, [[triangle-type-by-sides|a comparison of squares]] reads the largest angle, and [[triangle-congruence|congruence]] proves parts equal.

[[triangle-area-standard|A triangle's area]] is half base times height; [[area-by-pieces|regions]] are cut or completed into simple shapes, and [[joined-shapes-perimeter|joining shapes]] hides twice the shared edges.

[[pythagorean-theorem|The Pythagorean theorem]] relates the sides of a right triangle, [[shared-leg-pythagoras|used twice]] when a height is unknown, and [[special-right-triangles|the special right triangles]] turn $30^\circ$, $45^\circ$ and $60^\circ$ into lengths.`,
      strategies: [
        String.raw`Mark every angle you know on the figure, and name an unknown angle $x$.`,
        String.raw`Look for parallel lines and isosceles triangles to carry angles across a figure.`,
        String.raw`Test three lengths by checking the largest against the sum of the other two.`,
        String.raw`For an area, choose the base whose height you know, or subtract pieces from a simple shape.`,
        String.raw`Drop a perpendicular to make a right angle, then use the Pythagorean theorem.`,
        String.raw`Turn an angle of $30^\circ$, $45^\circ$ or $60^\circ$ into a special right triangle.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`The angles of a triangle are in the ratio $2 : 3 : 4$. What is the largest angle, in degrees?`, answer: "80",
        solution: String.raw`The angles are $2k$, $3k$, $4k$ with $9k = 180^\circ$, so $k = 20^\circ$ and the largest is $80^\circ$.` },
      { q: String.raw`A $25$-foot ladder leans against a wall with its foot $7$ feet from the wall. How high up the wall does it reach, in feet?`, answer: "24",
        solution: String.raw`The ladder is the hypotenuse of a right triangle with one leg $7$: the height is $\sqrt{625 - 49} = \sqrt{576} = 24$.` },
      { q: String.raw`How many triangles that are not congruent to each other have whole-number sides and perimeter $12$?`, answer: "3",
        solution: String.raw`List $a \le b \le c$ with $a + b + c = 12$ and $c \lt a + b$, that is, $c \lt 6$. With $c = 5$: $(2, 5, 5)$ and $(3, 4, 5)$; with $c = 4$: $(4, 4, 4)$. Three triangles.` }
    ],
    problems: [
      "1989 AJHSME, Problem 10",
      "2000 AMC 8, Problem 13",
      "2009 AMC 8, Problem 9",
      "2017 AMC 8, Problem 18",
      "2021 Fall AMC 10A, Problem 7",
      "2008 AMC 10A, Problem 14",
      "2016 AMC 10A, Problem 11",
      "2017 AMC 10A, Problem 7"
    ]
  },
  challenge: {
    problems: [
      "2025 AMC 8, Problem 24",
      "2012 AMC 8, Problem 25",
      "2011 AMC 12B, Problem 10",
      "2021 Fall AMC 10B, Problem 15",
      "2017 AMC 12B, Problem 8"
    ]
  }
};
