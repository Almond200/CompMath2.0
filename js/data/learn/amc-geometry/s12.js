// Learn, AMC Geometry, chapter S12: from the AMC to the AIME (CONVENTIONS §14). Part: Toward the AIME.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S12"] = {
  lessons: {
    "S12.1": {
      prereq: ["coordinate-bash", "triangle-similarity", "pythagorean-theorem"],
      cards: [],
      body: String.raw`This chapter takes the geometry of the book to the early AIME. An AIME answer is a whole number from $0$ to $999$, often asked in a form such as $m + n$ for an area $m\sqrt n$ or a length $\tfrac mn$, and there are no choices to rule out a figure drawn wrongly. So the habits that make an answer reliable become part of the method: checking whether a figure can be drawn in more than one way, keeping track of signs, and choosing between coordinates and a synthetic route.

An equilateral triangle of side $4$ has area $4\sqrt3$; asked as $m\sqrt n$ with $n$ having no square factor, the answer is $m + n = 7$. Two parallel chords of lengths $6$ and $8$ in a circle of radius $5$ are $4$ and $3$ from the center, so they are $1$ apart if they lie on the same side and $7$ apart if on opposite sides: a problem that does not say which has two answers, and one that does must be read for it. And the height to the hypotenuse of a $3$-$4$-$5$ triangle is $\tfrac{12}{5}$, so as $\tfrac mn$ the answer is $17$.

The lessons are signed lengths and degenerate figures (S12.2), coordinates or a synthetic route (S12.3), and mixed problems across the book (S12.4). The Summary (S12.5) collects the strategies.`,
      exercises: [
        { q: String.raw`The area of an equilateral triangle with side $4$ is $m\sqrt n$, with $n$ not divisible by the square of a prime. Find $m + n$.`, answer: "7",
          solution: String.raw`The area is $\tfrac{\sqrt3}{4} \cdot 16 = 4\sqrt3$, so $m = 4$, $n = 3$ and $m + n = 7$.` },
        { q: String.raw`Two parallel chords of lengths $6$ and $8$ lie in a circle of radius $5$. What is the sum of the two possible distances between them?`, answer: "8",
          solution: String.raw`The chords are $\sqrt{25 - 9} = 4$ and $\sqrt{25 - 16} = 3$ from the center. On the same side they are $1$ apart, on opposite sides $7$ apart. The sum is $8$.` },
        { q: String.raw`The height to the hypotenuse of a right triangle with legs $3$ and $4$ is $\tfrac mn$ in lowest terms. Find $m + n$.`, answer: "17",
          solution: String.raw`The area is $6 = \tfrac12 \cdot 5 \cdot h$, so $h = \tfrac{12}{5}$ and $m + n = 17$.` }
      ],
      problems: [
        "2006 AIME I, Problem 1",
        "2014 AIME I, Problem 1",
        "2020 AIME I, Problem 1"
      ]
    },
    "S12.2": {
      prereq: ["triangle-inequality", "power-of-a-point", "law-of-sines"],
      cards: ["directed-lengths"],
      body: String.raw`Points $A$, $B$, $C$ lie on a line with $AB = 3$ and $BC = 5$: how long is $AC$? A triangle has $b = 8$, $a = 5$ and $A = 30^\circ$: how many triangles is that? A figure in a problem is one drawing of possibly several, and some drawings are flat.

[[directed-lengths|Directed lengths]] give each segment on a line a sign, by direction: $\overline{AB} = x_B - x_A$, so $\overline{BA} = -\overline{AB}$ and $\overline{AB} + \overline{BC} = \overline{AC}$ whatever the order of the points. With signs, one equation covers every arrangement: $AC = |{\pm 3} \pm 5|$ comes out as $2$ or $8$, depending on whether $A$ and $C$ are on the same side of $B$. The power of a point (S5.5) is a signed statement: $\overline{PA} \cdot \overline{PB}$ is negative for a point inside the circle and positive outside, and the same theorem covers both. A ratio on a line is the same: the points $P$ with $PA = 2PB$ for $A = 0$ and $B = 7$ on a number line are $\tfrac{14}{3}$, between them, and $14$, beyond $B$.

Degenerate figures are the limiting cases: three points on a line as a flat triangle, a chord through the center, two circles that touch. They decide the ends of a range: with $AB = 4$ and $BC = 6$, the length $AC$ runs from $2$ to $10$, both flat triangles, so it takes the whole numbers $2$ to $10$ if flat ones are allowed, nine values, and $3$ to $9$ if not. And the case of two sides and an angle not between them (SSA, S1.3) can give two triangles: with $b = 8$ and $A = 30^\circ$, the height from $C$ is $8\sin 30^\circ = 4$, and since $4 \lt a = 5 \lt 8$, the side $a$ can swing to two positions.

Before computing, ask in how many ways the figure can be drawn, write lengths on a line with signs, and test the flat and touching cases at the ends of a range. The next lesson chooses a method.`,
      related: [
        { card: "triangle-congruence", note: String.raw`SSA, which can fit two triangles (S1.3).` },
        { card: "tangent-circles", note: String.raw`circles touching from outside or inside, two cases of one condition (S5.6).` },
        { card: "casework-method", note: String.raw`listing the drawings a figure allows (R1.5).` }
      ],
      exercises: [
        { q: String.raw`Points $A$, $B$, $C$ lie on a line with $AB = 3$ and $BC = 5$. What is the sum of the possible values of $AC$?`, answer: "10",
          solution: String.raw`Put $B$ at $0$ and $A$ at $\pm 3$, $C$ at $\pm 5$. Then $AC$ is $|5 - 3| = 2$ when $A$ and $C$ are on the same side of $B$ and $3 + 5 = 8$ when they are on opposite sides. The sum is $10$.` },
        { q: String.raw`On a number line $A = 0$ and $B = 7$. What is the sum of all points $P$ with $PA = 2 \cdot PB$?`, answer: "56/3",
          solution: String.raw`$|x| = 2|x - 7|$. Between $A$ and $B$: $x = 14 - 2x$, so $x = \tfrac{14}{3}$. Beyond $B$: $x = 2x - 14$, so $x = 14$. To the left of $A$, $-x = 14 - 2x$ gives $x = 14$, not to the left. The sum is $\tfrac{14}{3} + 14 = \tfrac{56}{3}$.` },
        { q: String.raw`Points $A$, $B$, $C$ have $AB = 4$ and $BC = 6$, and $AC$ is a whole number. How many values can $AC$ take if the three points may lie on a line?`, answer: "9",
          solution: String.raw`By the triangle inequality $2 \le AC \le 10$, with the ends reached when the points are on a line. So $AC$ is one of $2, 3, \ldots, 10$: nine values.` },
        { q: String.raw`How many triangles $ABC$ have $b = 8$, $a = 5$ and $\angle A = 30^\circ$?`, answer: "2",
          solution: String.raw`Draw $AC = 8$ and the ray from $A$ at $30^\circ$. The distance from $C$ to the ray is $8\sin 30^\circ = 4$. A circle of radius $5$ about $C$ meets the ray twice on the far side of $A$, since $4 \lt 5 \lt 8$, so there are $2$ triangles.` }
      ],
      problems: []
    },
    "S12.3": {
      prereq: ["coordinate-bash", "triangle-similarity", "shoelace-formula", "area-by-pieces"],
      cards: [],
      body: String.raw`Square $ABCD$ has side $6$, $E$ is the midpoint of $AB$, and $F$ on $BC$ has $BF = 2$: what is the area of triangle $DEF$? How far is $A$ from the diagonal $BD$ of an $8 \times 6$ rectangle? Each can be done with coordinates or without them, and choosing well saves time and errors.

[[coordinate-bash|Coordinates]] are sure and mechanical. With $A = (0, 0)$, $B = (6, 0)$, $C = (6, 6)$, $D = (0, 6)$, the points are $E = (3, 0)$ and $F = (6, 2)$, and the shoelace formula gives the area of $DEF$ as $12$. They suit figures with right angles, points given by ratios along sides, and questions about areas or distances, and they need no idea. They cost algebra that grows quickly with circles, angle conditions and square roots, and they can hide the structure that makes a problem short.

A synthetic route looks for the idea: similar triangles, a cyclic quadrilateral, an area ratio. The same area is the square less three right triangles, $36 - 9 - 3 - 12 = 12$, with no coordinates at all. The distance from $A$ to $BD$ in the rectangle is twice the area of triangle $ABD$ divided by $BD$: $\tfrac{48}{10} = \tfrac{24}{5}$. [[triangle-similarity|Similar triangles]] are the usual synthetic tool: when a figure has equal angles, a ratio found once carries everywhere.

The practical rule: spend a minute looking for a synthetic idea, and if none appears, place the figure on axes with as many zeros as possible and compute. Use the other method as a check when time allows. The next lesson mixes the whole book.`,
      related: [
        { card: "shoelace-formula", note: String.raw`the area of a polygon from its corners (S7.4).` },
        { card: "point-line-distance", note: String.raw`a distance to a line in coordinates (S7.2).` },
        { card: "mass-points", note: String.raw`a synthetic route to ratios that coordinates also reach (S3.5).` }
      ],
      exercises: [
        { q: String.raw`Square $ABCD$ has side $6$, $E$ is the midpoint of $AB$, and $F$ on $BC$ has $BF = 2$. What is the area of triangle $DEF$?`, answer: "12",
          solution: String.raw`With $A = (0, 0)$, $B = (6, 0)$, $C = (6, 6)$, $D = (0, 6)$: $E = (3, 0)$ and $F = (6, 2)$. Without coordinates: the square less triangles $AED$ ($\tfrac12 \cdot 3 \cdot 6 = 9$), $EBF$ ($\tfrac12 \cdot 3 \cdot 2 = 3$) and $FCD$ ($\tfrac12 \cdot 4 \cdot 6 = 12$) is $36 - 24 = 12$; the shoelace formula agrees.` },
        { q: String.raw`A rectangle $ABCD$ has $AB = 8$ and $AD = 6$. How far is $A$ from the diagonal $BD$?`, answer: "24/5",
          solution: String.raw`Triangle $ABD$ has area $\tfrac12 \cdot 8 \cdot 6 = 24$, and its side $BD = 10$. The height to $BD$ is $\tfrac{2 \cdot 24}{10} = \tfrac{24}{5}$.` }
      ],
      problems: [
        "1999 AIME, Problem 2",
        "2019 AIME II, Problem 1",
        "2021 AIME I, Problem 2",
        "2009 AIME II, Problem 3",
        "2001 AIME II, Problem 4",
        "2018 AIME II, Problem 4",
        "2025 AIME II, Problem 6"
      ]
    },
    "S12.4": {
      prereq: ["inradius-area", "right-triangle-inradius", "distance-3d", "triangle-similarity"],
      cards: [],
      body: String.raw`An AIME geometry problem does not say which chapter it comes from. What is the inradius of a $10$-$10$-$12$ triangle? How far is the incenter of a $5$-$12$-$13$ triangle from its right angle? How far is a corner of a cube of side $2$ from the center of an opposite face? The first step is to see which tool the figure calls for.

A few questions sort most problems. Is there a right angle, or can one be made by a perpendicular? Then the Pythagorean theorem, special triangles and the right-triangle facts of S4. Are there equal angles? Then similar triangles, or four points on a circle. Is there a circle? Draw the radii to the points of tangency and the perpendiculars to the chords. Is the question an area or a ratio of areas? Then heights, cevians and shared angles. Are there three dimensions? Then a slice or coordinates.

For the triangle $10$, $10$, $12$, the height to the base is $8$, the area $48$ and the semiperimeter $16$, so the inradius is $3$. For $5$-$12$-$13$, the inradius is $\tfrac{5 + 12 - 13}{2} = 2$, and the incenter is the far corner of a $2 \times 2$ square at the right angle, so it is $2\sqrt2$ from the corner. For the cube, the corner $(0, 0, 0)$ and the face center $(2, 1, 1)$ are $\sqrt6$ apart. Each needed one fact, chosen by the shape of the figure.

Sort the figure by its right angles, equal angles, circles, areas and dimensions, choose the tool, and check the answer by a second route or a special case. The Summary follows.`,
      related: [
        { card: "casework-method", note: String.raw`more than one possible figure (S12.2).` },
        { card: "coordinate-bash", note: String.raw`the method that always works, when no idea appears (S12.3).` },
        { card: "special-right-triangles", note: String.raw`the angles that turn into lengths (S1.5).` }
      ],
      exercises: [
        { q: String.raw`What is the inradius of a triangle with sides $10$, $10$ and $12$?`, answer: "3",
          solution: String.raw`The height to the base $12$ is $\sqrt{100 - 36} = 8$, so the area is $48$. The semiperimeter is $16$, and $r = \tfrac{48}{16} = 3$.` },
        { q: String.raw`How far is the incenter of a $5$-$12$-$13$ triangle from the corner with the right angle?`, answer: "2sqrt(2)",
          solution: String.raw`The inradius is $\tfrac{5 + 12 - 13}{2} = 2$. The incenter is $2$ from each leg, so with the right angle it makes a $2 \times 2$ square, and it is the square's diagonal, $2\sqrt2$, from the corner.` },
        { q: String.raw`A cube has side $2$. How far is a corner from the center of a face that does not contain that corner?`, answer: "sqrt(6)",
          solution: String.raw`Place the corner at $(0, 0, 0)$ and the face at $x = 2$, with center $(2, 1, 1)$. The distance is $\sqrt{4 + 1 + 1} = \sqrt6$.` }
      ],
      problems: [
        "2004 AIME II, Problem 1",
        "2006 AIME II, Problem 1",
        "2011 AIME II, Problem 2",
        "2008 AIME I, Problem 2",
        "2014 AIME II, Problem 3",
        "2004 AIME I, Problem 4",
        "2011 AIME I, Problem 4",
        "2023 AIME I, Problem 5",
        "2015 AIME I, Problem 6"
      ]
    },
    "S12.5": {
      prereq: ["directed-lengths", "coordinate-bash", "triangle-similarity"],
      cards: [],
      body: String.raw`This chapter added habits, and one card. [[directed-lengths|Directed lengths]] keep track of the order of points on a line, so one equation covers every arrangement, and the flat and touching cases mark the ends of a range.

[[coordinate-bash|Coordinates]] always work, at the cost of algebra; a synthetic route, usually [[triangle-similarity|similar triangles]] or an area argument, is faster when it can be found. A problem from anywhere in the book is sorted by its right angles, equal angles, circles, areas and dimensions.`,
      strategies: [
        String.raw`Ask in how many ways the figure can be drawn before computing.`,
        String.raw`Give lengths on a line signs, so one equation covers every order of the points.`,
        String.raw`Test the flat and touching cases at the ends of a range.`,
        String.raw`Look for a synthetic idea for a minute; if none appears, use coordinates with many zeros.`,
        String.raw`Check an answer by a second method or a special case.`,
        String.raw`Simplify $m\sqrt n$ and $\tfrac mn$ fully before adding.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the circumradius of a triangle with sides $5$, $12$ and $13$?`, answer: "13/2",
        solution: String.raw`It is a right triangle, so the hypotenuse is a diameter of the circle through its corners: $R = \tfrac{13}{2}$.` },
      { q: String.raw`How far is the origin from the line through $(4, 0)$ and $(0, 3)$?`, answer: "12/5",
        solution: String.raw`The line and the axes make a right triangle with legs $4$ and $3$ and hypotenuse $5$. The distance is its height to the hypotenuse, $\tfrac{4 \cdot 3}{5} = \tfrac{12}{5}$; or from $3x + 4y = 12$, $\tfrac{12}{5}$.` },
      { q: String.raw`How long is the longest diagonal of a regular hexagon with side $2$?`, answer: "4",
        solution: String.raw`The longest diagonals pass through the center and are two radii, and a regular hexagon's radius equals its side: $4$.` }
    ],
    problems: [
      "2022 AIME I, Problem 1",
      "1999 AIME, Problem 4",
      "2019 AIME I, Problem 6",
      "2001 AIME I, Problem 7",
      "2004 AIME II, Problem 7"
    ]
  },
  challenge: {
    problems: [
      "2008 AIME II, Problem 5",
      "2021 AIME II, Problem 5",
      "2000 AIME II, Problem 6",
      "2025 AIME I, Problem 6",
      "2001 AIME II, Problem 7"
    ]
  }
};
