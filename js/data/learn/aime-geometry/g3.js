// Learn, AIME Geometry, chapter G3: trigonometric geometry (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["G3"] = {
  lessons: {
    "G3.1": {
      prereq: ["law-of-cosines", "law-of-sines", "trig-area"],
      cards: [],
      body: String.raw`This chapter computes in triangles with trigonometry. Its tools are the laws of sines and cosines and the area formulas, the extended law of sines with the circumradius, identities that hold in every triangle, and the judgment of when trigonometry is shorter than coordinates or similar triangles.

The law of cosines, $c^2 = a^2 + b^2 - 2ab\cos C$, finds a side from two sides and the angle between them, or an angle from three sides: two sides $5$ and $8$ with a $60^\circ$ angle between them leave a third side $\sqrt{25 + 64 - 40} = 7$. The angles $60^\circ$ and $120^\circ$ make it especially clean, and the triangle $13, 14, 15$, with area $84$, appears again and again.

The area of a triangle is $\tfrac12 ab\sin C$, and Heron's formula $\sqrt{s(s - a)(s - b)(s - c)}$ gives it from the sides alone: the triangle $5, 5, 6$ has $s = 8$ and area $\sqrt{8 \cdot 3 \cdot 3 \cdot 2} = 12$. The extended law of sines, $\tfrac{a}{\sin A} = 2R$, ties each side to its opposite angle and the circumradius $R$, so a side $6$ opposite a $30^\circ$ angle means $R = 6$; together with the area formula it gives $R = \tfrac{abc}{4K}$.

Some identities hold in every triangle: each side is the sum of the projections of the other two on it, the half-angle formulas give the angles from the sides, and the ratio lemma says how a cevian divides the opposite side in terms of sines.

Trigonometry is the right tool when the figure is described by angles; coordinates when it is described by perpendicular lines or a convenient origin; similar triangles when it has parallel lines or equal angles. Choosing well keeps the computation short.

The lessons take these ideas in turn: the laws of sines and cosines and area formulas (G3.2), the extended law of sines and the circumradius (G3.3), trigonometric identities in triangles (G3.4), angles and lengths from trigonometric conditions (G3.5), and when trigonometry beats the other methods (G3.6). The Summary (G3.7) collects the strategies.`,
      exercises: [
        { q: String.raw`Two sides of a triangle are $5$ and $8$, and the angle between them is $60^\circ$. Find the third side.`, answer: "7",
          solution: String.raw`By the law of cosines, $c^2 = 25 + 64 - 2 \cdot 5 \cdot 8 \cdot \tfrac12 = 49$, so $c = 7$.` },
        { q: String.raw`Find the area of the triangle with sides $5$, $5$ and $6$.`, answer: "12",
          solution: String.raw`By Heron's formula with $s = 8$: $\sqrt{8 \cdot 3 \cdot 3 \cdot 2} = \sqrt{144} = 12$. (Or the altitude to the base $6$ is $\sqrt{25 - 9} = 4$, and $\tfrac12 \cdot 6 \cdot 4 = 12$.)` },
        { q: String.raw`In a triangle, the side opposite an angle of $30^\circ$ has length $6$. Find the circumradius.`, answer: "6",
          solution: String.raw`By the extended law of sines, $2R = \tfrac{6}{\sin 30^\circ} = 12$, so $R = 6$.` }
      ],
      problems: [
        "2013 AIME II, Problem 10",
        "2011 AIME I, Problem 8",
        "2021 AIME I, Problem 9"
      ]
    },
    "G3.2": {
      prereq: ["law-of-cosines", "trig-area"],
      cards: ["law-cosines-60-120", "law-of-cosines-special-triangles", "herons-formula", "triangle-13-14-15"],
      body: String.raw`Trigonometry turns a triangle's angles into lengths and its lengths into area, and on the AIME it is the reliable fallback when similar triangles are hard to find. Given two sides and the angle between them, the law of cosines gives the third side; given three sides, Heron's formula gives the area without any angle; given two sides and the included angle, the sine formula gives the area. Many problems are set up so that a $60^\circ$ or $120^\circ$ angle, or a famous triangle such as $13$-$14$-$15$, makes the numbers come out exactly.

The law of cosines $c^2 = a^2 + b^2 - 2ab\cos C$ is the Pythagorean theorem with a correction. At $60^\circ$ and $120^\circ$ it becomes [[law-cosines-60-120|$c^2 = a^2 + b^2 \mp ab$]], since $\cos 60^\circ = \tfrac12$ and $\cos 120^\circ = -\tfrac12$: sides $5$ and $8$ with a $60^\circ$ angle between them give $c^2 = 25 + 64 - 40 = 49$, and sides $3$ and $5$ with $120^\circ$ give $9 + 25 + 15 = 49$, both $c = 7$. These integer triangles, and the others with a $60^\circ$ or $120^\circ$ angle, are the [[law-of-cosines-special-triangles|special triangles from the law of cosines]], and problems with equilateral triangles or regular hexagons produce them constantly. Read backward, the law of cosines finds an angle from three sides: in a triangle with sides $7$, $8$, $13$, $\cos C = \tfrac{49 + 64 - 169}{112} = -\tfrac12$, so the largest angle is $120^\circ$.

The area of a triangle is $\tfrac12ab\sin C$ from two sides and the included angle; sides $6$ and $10$ at $150^\circ$ give $\tfrac12 \cdot 60 \cdot \tfrac12 = 15$. From three sides, [[herons-formula|Heron's formula]] gives $K = \sqrt{s(s - a)(s - b)(s - c)}$ with $s$ the semiperimeter: sides $7$, $8$, $9$ give $s = 12$ and $K = \sqrt{12 \cdot 5 \cdot 4 \cdot 3} = 12\sqrt5$. When the product under the root is a perfect square, the triangle is a Heronian triangle with integer area.

The most famous of these is the [[triangle-13-14-15|$13$-$14$-$15$ triangle]]: the altitude to the side $14$ has length $12$ and splits it into $5$ and $9$, so the triangle is two Pythagorean triangles, $5$-$12$-$13$ and $9$-$12$-$15$, glued along the altitude. Its area is $84$, inradius $4$, circumradius $\tfrac{65}{8}$, and it appears on the AIME far more often than chance would suggest; recognizing it saves the whole computation.

Use the law of cosines to pass between sides and angles, the sine formula or Heron for area, and watch for $60^\circ$, $120^\circ$ and $13$-$14$-$15$. The next lesson brings in the circumcircle.`,
      related: [
        { card: "law-of-cosines", note: String.raw`the general relation $c^2 = a^2 + b^2 - 2ab\cos C$ (B5.4).` },
        { card: "pythagorean-triples", note: String.raw`the right triangles that glue into Heronian triangles.` },
        { card: "brahmaguptas-formula", note: String.raw`Heron's formula for cyclic quadrilaterals (G2.4).` }
      ],
      exercises: [
        { q: String.raw`Two sides of a triangle are $5$ and $8$, and the angle between them is $60^\circ$. Find the third side.`, answer: "7",
          solution: String.raw`By the law of cosines, $c^2 = 25 + 64 - 2 \cdot 5 \cdot 8 \cdot \tfrac12 = 49$, so $c = 7$.` },
        { q: String.raw`Find the area of a triangle with sides $7$, $8$ and $9$.`, answer: "12sqrt(5)",
          solution: String.raw`The semiperimeter is $12$, and Heron's formula gives $\sqrt{12 \cdot 5 \cdot 4 \cdot 3} = \sqrt{720} = 12\sqrt5$.` },
        { q: String.raw`A triangle has sides $7$, $8$ and $13$. Find its largest angle, in degrees.`, answer: "120",
          solution: String.raw`The largest angle is opposite $13$: $\cos C = \tfrac{7^2 + 8^2 - 13^2}{2 \cdot 7 \cdot 8} = \tfrac{-56}{112} = -\tfrac12$, so $C = 120^\circ$.` }
      ],
      problems: [
        "2013 AMC 12A, Problem 12",
        "2009 AMC 12A, Problem 13",
        "2021 Fall AMC 12B, Problem 8",
        "2012 AMC 12A, Problem 10",
        "2022 AMC 12B, Problem 10",
        "2012 AMC 12B, Problem 20",
        "2025 AMC 12B, Problem 21",
        "2023 AMC 12B, Problem 17",
        "2019 AIME I, Problem 3",
        "2018 AIME I, Problem 4",
        "2026 AIME I, Problem 5",
        "2021 AIME II, Problem 5",
        "1989 AIME, Problem 6",
        "2015 AIME II, Problem 7",
        "1987 AIME, Problem 9",
        "2013 AIME II, Problem 5",
        "1999 AIME, Problem 14"
      ]
    },
    "G3.3": {
      prereq: ["law-of-sines"],
      cards: ["circumradius-area", "trig-area-circumradius"],
      body: String.raw`Every triangle has a circumcircle, and its radius $R$ ties the sides to the angles in the simplest possible way: each side is the diameter times the sine of the opposite angle. This extended law of sines, with the formulas for $R$ from the sides and the area, solves problems where a triangle is inscribed in a known circle, where a ratio of sides must be turned into a ratio of sines, or where the circumradius itself is asked for.

The extended law of sines says $\tfrac{a}{\sin A} = \tfrac{b}{\sin B} = \tfrac{c}{\sin C} = 2R$. It follows from the inscribed angle theorem: the angle $A$ equals the angle subtended by $BC$ at the end of the diameter through $B$, which makes a right triangle with hypotenuse $2R$. So a side of $10$ opposite a $30^\circ$ angle means $2R = 20$, and in a triangle with angles $30^\circ$ and $45^\circ$ the sides opposite them are in the ratio $\sin 30^\circ : \sin 45^\circ = 1 : \sqrt2$; if the first is $2$, the second is $2\sqrt2$.

The [[circumradius-area|circumradius formula]] $R = \tfrac{abc}{4K}$ comes from combining $K = \tfrac12ab\sin C$ with $c = 2R\sin C$. For the $13$-$14$-$15$ triangle, $R = \tfrac{13 \cdot 14 \cdot 15}{4 \cdot 84} = \tfrac{65}{8}$. Together with $K = rs$ it gives $abc = 4Rrs$, a relation among the three radii. The [[trig-area-circumradius|area from the angles and the circumradius]] is $K = 2R^2\sin A\sin B\sin C$, which is the right formula when a triangle is inscribed in a circle of known radius and its angles are known.

These formulas also locate the circumcenter. In a right triangle the circumcenter is the midpoint of the hypotenuse, so $R$ is half the hypotenuse. In an isosceles triangle the circumcenter lies on the axis, at a distance found from $R^2 = (\text{half base})^2 + (\text{distance to base})^2$. In a triangle inscribed in a known circle, a chord's length and the angle it subtends determine each other through $c = 2R\sin C$.

When a triangle sits in a known circle, or when side ratios are given, convert with $a = 2R\sin A$. The next lesson collects identities that hold in every triangle.`,
      related: [
        { card: "law-of-sines", note: String.raw`the ratio form $\tfrac{a}{\sin A} = \tfrac{b}{\sin B}$ (B5.4).` },
        { card: "chord-length", note: String.raw`a chord is $2R\sin$ of half its central angle, the same fact (G2.4).` },
        { card: "euler-distance-theorem", note: String.raw`the distance between the circumcenter and incenter, $OI^2 = R(R - 2r)$ (G5.3).` }
      ],
      exercises: [
        { q: String.raw`Find the circumradius of the triangle with sides $13$, $14$ and $15$.`, answer: "65/8",
          solution: String.raw`Its area is $84$, so $R = \tfrac{abc}{4K} = \tfrac{13 \cdot 14 \cdot 15}{336} = \tfrac{2730}{336} = \tfrac{65}{8}$.` },
        { q: String.raw`A triangle has angles $30^\circ$ and $45^\circ$, and the side opposite the $30^\circ$ angle is $2$. Find the side opposite the $45^\circ$ angle.`, answer: "2sqrt(2)",
          solution: String.raw`By the law of sines, $\tfrac{x}{\sin 45^\circ} = \tfrac{2}{\sin 30^\circ} = 4$, so $x = 4 \cdot \tfrac{\sqrt2}{2} = 2\sqrt2$.` }
      ],
      problems: [
        "2011 AMC 12B, Problem 20",
        "2021 Fall AMC 12B, Problem 9",
        "2019 AMC 12A, Problem 19",
        "2001 AIME I, Problem 4",
        "2003 AIME II, Problem 7",
        "2000 AIME II, Problem 12",
        "2008 AIME I, Problem 10",
        "2011 AIME II, Problem 10",
        "2007 AIME II, Problem 15"
      ]
    },
    "G3.4": {
      prereq: ["law-of-sines", "half-angle"],
      cards: ["projection-formula", "triangle-half-angle-identities", "ratio-lemma", "triangle-angle-identities"],
      body: String.raw`Because the angles of a triangle add to $180^\circ$, its trigonometric functions satisfy identities that do not hold for arbitrary angles, and its sides, radii and angles are linked by formulas worth knowing by name. They shorten problems about where an altitude or a bisector lands, about ratios along a cevian, and about expressions such as $\tan A + \tan B + \tan C$.

The [[projection-formula|projection formula]] $a = b\cos C + c\cos B$ says that side $a$ is the sum of the projections of the other two sides onto it. It locates the foot of the altitude from $A$: the foot is $c\cos B$ from $B$. It is also the quickest way to see where the foot of a bisector or a median lies relative to the foot of the altitude.

The [[triangle-half-angle-identities|half-angle identities]] express the half-angles through the sides: $\tan\tfrac A2 = \tfrac{r}{s - a}$, from the right triangle formed by the incenter, vertex $A$ and the point where the incircle touches side $AB$. For the $13$-$14$-$15$ triangle with $a = 14$, $\tan\tfrac A2 = \tfrac{4}{7}$. Similar formulas give $\sin\tfrac A2$ and $\cos\tfrac A2$ through $s$ and the sides, and $r = 4R\sin\tfrac A2\sin\tfrac B2\sin\tfrac C2$.

The [[ratio-lemma|ratio lemma]] says that for a point $D$ on $BC$, $\tfrac{BD}{DC} = \tfrac{AB\sin\angle BAD}{AC\sin\angle DAC}$, from the law of sines in triangles $ABD$ and $ADC$. It generalizes the angle bisector theorem (equal angles) and handles cevians that make known angles with the sides, such as isogonal cevians, which make equal angles with the two sides.

The [[triangle-angle-identities|identities for angles adding to $180^\circ$]] include $\tan A + \tan B + \tan C = \tan A\tan B\tan C$ (for a non-right triangle), $\cot A\cot B + \cot B\cot C + \cot C\cot A = 1$, and $\cos^2 A + \cos^2 B + \cos^2 C + 2\cos A\cos B\cos C = 1$. With $\tan A = 1$ and $\tan B = 2$, $\tan C = -\tan(A + B) = -\tfrac{3}{1 - 2} = 3$. Each comes from $C = 180^\circ - A - B$ and an addition formula.

Use projections to place feet of cevians, half-angle tangents with the inradius, the ratio lemma for cevians at known angles, and the angle-sum identities when a symmetric trigonometric expression in the angles appears. The next lesson computes whole figures from their angles.`,
      related: [
        { card: "angle-bisector-theorem", note: String.raw`the ratio lemma with equal angles (G1.4).` },
        { card: "inradius-area", note: String.raw`$K = rs$, the source of $r$ in the half-angle formulas (G2.5).` },
        { card: "angle-addition", note: String.raw`the addition formulas behind the angle-sum identities (A7.3).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $BC = 14$, $CA = 15$, $AB = 13$. Find $\tan\tfrac A2$.`, answer: "4/7",
          solution: String.raw`The inradius is $r = \tfrac{84}{21} = 4$ and the tangent length from $A$ is $s - a = 7$. In the right triangle formed by $A$, the incenter and the touch point on $AB$, $\tan\tfrac A2 = \tfrac{r}{s - a} = \tfrac47$.` },
        { q: String.raw`In triangle $ABC$, $\tan A = 1$ and $\tan B = 2$. Find $\tan C$.`, answer: "3",
          solution: String.raw`$\tan C = \tan(180^\circ - A - B) = -\tan(A + B) = -\tfrac{1 + 2}{1 - 1 \cdot 2} = 3$. This agrees with $\tan A + \tan B + \tan C = \tan A\tan B\tan C$: $1 + 2 + 3 = 1 \cdot 2 \cdot 3$.` }
      ],
      problems: [
        "2025 AMC 12A, Problem 16",
        "1989 AIME, Problem 10",
        "2005 AIME II, Problem 14",
        "2018 AIME II, Problem 14",
        "2010 AIME II, Problem 15",
        "2013 AIME II, Problem 15"
      ]
    },
    "G3.5": {
      prereq: ["law-of-sines", "law-of-cosines"],
      cards: ["trig-bash", "altitude-bisector-angle"],
      body: String.raw`Some geometry problems give mostly angles: a triangle with angles $30^\circ$, $45^\circ$ and $105^\circ$ and points defined by further angles, or an isosceles triangle with a chain of equal segments making equal angles. When no clean similarity appears, the reliable method is to compute: name one length, find every other length with the law of sines, and simplify with trigonometric identities at the end.

[[trig-bash|Trigonometric bashing]] assigns a convenient length (often $1$ or the side opposite a known angle), then walks through the triangles of the figure with the law of sines and cosines, keeping exact values of the special angles. The answer comes out as a trigonometric expression, which identities then simplify: a ratio of sines may become $2\cos\theta$ by the double-angle formula, and a sum of products may collapse by product-to-sum. A chain of isosceles triangles with equal sides, such as $AP = PQ = QB = BC$, is the classic case: each triangle adds a multiple of the base angle, the angle sum gives the angle, and the law of sines gives the lengths.

The method is long but certain, and its risks are arithmetic: choose the unknown so that the expressions stay short, use the exact values $\sin 15^\circ = \tfrac{\sqrt6 - \sqrt2}{4}$, $\sin 75^\circ = \tfrac{\sqrt6 + \sqrt2}{4}$ and their relatives, and check special cases (an equilateral or right triangle) along the way.

A few angle facts save computation. From a vertex, the altitude and the line to the circumcenter make equal angles with the two sides, so the angle bisector bisects the angle between them; this is the [[altitude-bisector-angle|altitude-bisector relation]], and the angle between the altitude and the circumradius from $A$ is $|B - C|$. In a triangle with $B = 70^\circ$ and $C = 40^\circ$, that angle is $30^\circ$. Facts like this let one angle chase replace several pages of trigonometry.

Bash with trigonometry when the given data are angles and no similarity is visible; keep exact values and simplify at the end. The last lesson of the chapter compares trigonometry with the other approaches.`,
      related: [
        { card: "special-trig-values", note: String.raw`the exact values at $15^\circ$, $75^\circ$ and $36^\circ$ that bashing needs (A7.2).` },
        { card: "product-sum", note: String.raw`simplifying the sums of products that a bash produces (A7.3).` },
        { card: "triangle-center-angles", note: String.raw`the angles at the circumcenter and orthocenter that this relation comes from (G5.2).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $B = 70^\circ$ and $C = 40^\circ$. Find the angle, in degrees, between the altitude from $A$ and the line from $A$ to the circumcenter.`, answer: "30",
          solution: String.raw`The altitude from $A$ makes an angle $90^\circ - B = 20^\circ$ with $AB$. The circumcenter $O$ makes $\angle OAC = 90^\circ - B$ as well, so $\angle BAO = A - (90^\circ - B) = 70^\circ - 20^\circ = 50^\circ$. The angle between them is $50^\circ - 20^\circ = 30^\circ = B - C$.` }
      ],
      problems: [
        "2013 AMC 12B, Problem 24",
        "2024 AMC 12B, Problem 22",
        "2006 AIME I, Problem 8",
        "2007 AIME I, Problem 12",
        "2013 AIME I, Problem 12",
        "2000 AIME I, Problem 14",
        "1996 AIME, Problem 15",
        "2011 AIME II, Problem 13",
        "2016 AIME II, Problem 10",
        "2018 AIME I, Problem 13"
      ]
    },
    "G3.6": {
      prereq: ["trig-bash", "coordinate-bash", "triangle-similarity"],
      cards: [],
      body: String.raw`Most geometry problems can be solved in several ways: with similar triangles and synthetic facts, with coordinates, or with trigonometry. All three reach the answer, but the time they take differs enormously from problem to problem, and choosing well is a large part of contest skill. This lesson collects the signals.

Trigonometry is the natural choice when the data are angles, or when lengths and angles are mixed: a triangle with one known angle and two sides, a figure with a $60^\circ$ or $120^\circ$ angle, a polygon with equal angles, or a problem that asks for an angle. The law of cosines handles a known angle between two sides; the law of sines handles a pair of angles and one side. Areas with an included angle are immediate with $\tfrac12ab\sin C$.

Coordinates are the natural choice when the figure has right angles that can sit on axes, such as squares, rectangles and right triangles, and when the question is about distances, intersections or areas. With a good origin the algebra stays linear, and the shoelace formula gives areas directly. Coordinates become painful when the figure has an arbitrary angle or a circle in an awkward position.

Synthetic methods, similar triangles, power of a point and area ratios, are the fastest when they apply, and the signals are parallel lines, tangents, cyclic quadrilaterals and given ratios. When a synthetic idea is not visible within a minute or two, switching to coordinates or trigonometry is usually better than waiting for inspiration.

Mixed approaches are common: find one angle synthetically and then compute with trigonometry, or place a figure in coordinates and use a power of a point to find one length. An equiangular hexagon with alternating sides is best done by extending sides into equilateral triangles; the area of a quadrilateral with given diagonals and the angle between them is $\tfrac12d_1d_2\sin\theta$; a figure with several equilateral triangles is often best in coordinates with the triangles' vertices at simple points.

Before computing, decide which method keeps the expressions shortest. The Summary (G3.7) collects the chapter's strategies, and the problems after it mix problems where each method is best.`,
      related: [
        { card: "coordinate-bash", note: String.raw`placing a figure on axes so that the algebra stays simple (G4.2).` },
        { card: "quadrilateral-diagonal-area", note: String.raw`the area $\tfrac12d_1d_2\sin\theta$ from the diagonals (G7.3).` },
        { card: "equiangular-polygon", note: String.raw`polygons with equal angles, completed into equilateral triangles (G7.2).` }
      ],
      exercises: [
        { q: String.raw`A convex quadrilateral has diagonals of lengths $6$ and $8$ that meet at an angle of $30^\circ$. Find its area.`, answer: "12",
          solution: String.raw`The diagonals cut the quadrilateral into four triangles, each with two sides along the diagonals and the angle $30^\circ$ or $150^\circ$ between them; both have sine $\tfrac12$. Adding the four areas gives $\tfrac12 d_1d_2\sin 30^\circ = \tfrac12 \cdot 48 \cdot \tfrac12 = 12$, whatever the crossing point.` }
      ],
      problems: [
        "2021 Fall AMC 12A, Problem 14",
        "2002 AMC 12B, Problem 24",
        "2021 Fall AMC 12B, Problem 15",
        "2012 AMC 12B, Problem 21",
        "2024 AMC 12B, Problem 19",
        "2007 AIME II, Problem 3",
        "2005 AIME I, Problem 7",
        "2010 AIME II, Problem 9",
        "1998 AIME, Problem 12",
        "2018 AIME II, Problem 12",
        "2025 AIME II, Problem 12",
        "2007 AIME I, Problem 15"
      ]
    },
    "G3.7": {
      prereq: ["law-of-cosines", "law-cosines-60-120", "herons-formula", "triangle-13-14-15", "law-of-sines", "circumradius-area", "projection-formula", "ratio-lemma", "trig-bash"],
      cards: [],
      body: String.raw`[[law-of-cosines|The law of cosines]] finds a side from two sides and their angle, or an angle from three sides, and [[law-cosines-60-120|the angles $60^\circ$ and $120^\circ$]] make it especially clean. [[herons-formula|Heron's formula]] gives the area from the sides, and [[triangle-13-14-15|the triangle $13, 14, 15$]] with area $84$ is worth knowing.

[[law-of-sines|The extended law of sines]] gives $a = 2R\sin A$, and [[circumradius-area|the circumradius]] is $R = \tfrac{abc}{4K}$.

[[projection-formula|Each side is the sum of the projections]] of the other two, and [[ratio-lemma|the ratio lemma]] says a cevian from $A$ divides $BC$ in the ratio $\tfrac{AB\sin\angle BAD}{AC\sin\angle DAC}$.

[[trig-bash|A trigonometric computation]] is the right choice when the figure is given by angles; coordinates when it is given by perpendiculars, and similarity when it has parallels.`,
      strategies: [
        String.raw`With two sides and the included angle, or three sides, use the law of cosines.`,
        String.raw`With angles and one side, use the law of sines; bring in the circumradius when a circle appears.`,
        String.raw`For an area, choose between $\tfrac12 ab\sin C$, Heron's formula and base times height by what is known.`,
        String.raw`Recognize the $13, 14, 15$ triangle and the triangles with $60^\circ$ or $120^\circ$ angles.`,
        String.raw`For a cevian's ratio in terms of angles, use the ratio lemma.`,
        String.raw`Before computing, decide which method, trigonometry, coordinates or similar triangles, keeps the expressions shortest.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Triangle $ABC$ has $AB = 13$, $BC = 14$ and $CA = 15$. Find the altitude from $A$ to $BC$.`, answer: "12",
        solution: String.raw`The area is $84$ by Heron ($s = 21$, $\sqrt{21 \cdot 8 \cdot 7 \cdot 6} = 84$), and also $\tfrac12 \cdot 14 \cdot h$. So $h = 12$.` },
      { q: String.raw`Find the largest angle of the triangle with sides $3$, $5$ and $7$.`, answer: "120",
        solution: String.raw`The largest angle is opposite the side $7$: $\cos C = \tfrac{9 + 25 - 49}{2 \cdot 3 \cdot 5} = -\tfrac12$, so $C = 120^\circ$.` },
      { q: String.raw`Find the circumradius of the triangle with sides $13$, $14$ and $15$.`, answer: "65/8",
        solution: String.raw`Use $R = \tfrac{abc}{4K} = \tfrac{13 \cdot 14 \cdot 15}{4 \cdot 84} = \tfrac{2730}{336} = \tfrac{65}{8}$.` },
      { q: String.raw`Two sides of a triangle are $8$ and $10$, and the angle between them is $150^\circ$. Find the area.`, answer: "20",
        solution: String.raw`The area is $\tfrac12 \cdot 8 \cdot 10 \cdot \sin 150^\circ = 40 \cdot \tfrac12 = 20$.` },
      { q: String.raw`In triangle $ABC$, $A = 45^\circ$, $B = 60^\circ$ and $a = BC = 10$. Find $b = CA$.`, answer: "5sqrt(6)",
        solution: String.raw`By the law of sines, $b = a \cdot \tfrac{\sin B}{\sin A} = 10 \cdot \tfrac{\sqrt3/2}{\sqrt2/2} = 10 \cdot \tfrac{\sqrt3}{\sqrt2} = 5\sqrt6$.` },
      { q: String.raw`Find the area of the triangle with sides $4$, $5$ and $6$.`, answer: "15sqrt(7)/4",
        solution: String.raw`By Heron's formula with $s = \tfrac{15}{2}$: $\sqrt{\tfrac{15}{2} \cdot \tfrac72 \cdot \tfrac52 \cdot \tfrac32} = \tfrac{\sqrt{1575}}{4} = \tfrac{15\sqrt7}{4}$.` }
    ],
    problems: [
      "2006 AIME II, Problem 12",
      "2002 AIME I, Problem 13",
      "2010 AIME II, Problem 12"
    ]
  },
  challenge: {
    problems: [
      "2019 AIME II, Problem 11",
      "2024 AIME I, Problem 10",
      "2012 AIME II, Problem 15",
      "2019 AIME I, Problem 13",
      "2005 AIME I, Problem 15"
    ]
  }
};
