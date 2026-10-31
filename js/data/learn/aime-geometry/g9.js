// Learn, AIME Geometry, chapter G9: geometry extensions (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// An extension chapter: its lessons carry their own problems and the chapter has no review.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["G9"] = {
  lessons: {
    "G9.1": {
      prereq: ["mass-points", "power-of-a-point", "euler-line-ratio"],
      cards: [],
      body: String.raw`This chapter goes beyond the core of AIME geometry. Its tools each make a few hard problems short: barycentric coordinates and affine maps, inversion, more relations among the triangle centers, and projective ideas such as the cross-ratio and harmonic quadrilaterals.

Barycentric coordinates describe a point $P$ of triangle $ABC$ by three weights adding to $1$, proportional to the areas of $PBC$, $PCA$ and $PAB$; the centroid is $\left(\tfrac13, \tfrac13, \tfrac13\right)$, and a point with first weight $\tfrac12$ makes triangle $PBC$ half of $ABC$. An affine map, such as a stretch along one direction, keeps parallel lines and ratios along a line and scales every area by the same factor, so any triangle can be made equilateral before computing a ratio.

Inversion in a circle of radius $k$ about $O$ sends a point at distance $d$ to the point on the same ray at distance $\tfrac{k^2}{d}$: with $k = 2$, a point at distance $1$ goes to distance $4$. It turns circles through $O$ into lines and keeps angles, so tangent circles can become parallel lines.

The triangle centers have further relations: the Euler line is parallel to a side exactly when the tangents of the other two angles multiply to $3$, and the incircle, excircles and contact triangle are linked by homotheties; a right triangle with legs $3$ and $4$ has inradius $\tfrac{3 + 4 - 5}{2} = 1$.

The cross-ratio of four points on a line is kept by projections, and a harmonic set, with cross-ratio $-1$, appears whenever two tangents to a circle meet on a line through a chord.

The lessons take these ideas in turn: barycentric coordinates (G9.2), inversion and spiral similarity (G9.3), more relations between triangle centers (G9.4), and projective tools (G9.5). The Summary (G9.6) collects the strategies.`,
      exercises: [
        { q: String.raw`A point $P$ inside triangle $ABC$ has barycentric coordinates $\left(\tfrac12, \tfrac14, \tfrac14\right)$. Find $\tfrac{[PBC]}{[ABC]}$.`, answer: "1/2",
          solution: String.raw`The first barycentric coordinate is the share of the area opposite $A$, the area of $PBC$, so the ratio is $\tfrac12$.` },
        { q: String.raw`Under inversion in a circle of radius $2$ centered at $O$, a point at distance $1$ from $O$ goes to a point at what distance from $O$?`, answer: "4",
          solution: String.raw`Inversion sends distance $d$ to $\tfrac{k^2}{d} = \tfrac{4}{1} = 4$, on the same ray from $O$.` },
        { q: String.raw`Find the inradius of the right triangle with legs $3$ and $4$.`, answer: "1",
          solution: String.raw`In a right triangle the inradius is $\tfrac{a + b - c}{2} = \tfrac{3 + 4 - 5}{2} = 1$, since the tangent lengths from the right-angle vertex both equal $r$. Also $r = \tfrac{K}{s} = \tfrac{6}{6} = 1$.` }
      ],
      problems: []
    },
    "G9.2": {
      prereq: ["mass-points", "cevian-area-ratio"],
      cards: ["barycentric-coordinates", "affine-transformations"],
      body: String.raw`Two tools organize the ratio and area arguments of the first chapter into coordinates and maps. Barycentric coordinates describe every point of the plane by weights on the vertices of a reference triangle, so that ratios along cevians and areas of subtriangles become simple formulas. Affine transformations move any triangle onto any other while keeping ratios along lines and ratios of areas, so a problem about an arbitrary triangle may be solved in an equilateral or right one.

In [[barycentric-coordinates|barycentric coordinates]] a point $P$ is written $(u : v : w)$ with $P = \tfrac{uA + vB + wC}{u + v + w}$, the balance point of masses $u$, $v$, $w$ at the vertices, as in mass points. The normalized coordinates are the area ratios $\tfrac{[PBC]}{[ABC]}$, $\tfrac{[PCA]}{[ABC]}$, $\tfrac{[PAB]}{[ABC]}$, so the point $(1 : 2 : 3)$ has $[PBC] = \tfrac16[ABC]$. The centroid is $(1 : 1 : 1)$, the incenter $(a : b : c)$, and a cevian through $A$ is the set of points with a fixed ratio $v : w$. Three points are collinear exactly when the determinant of their coordinates is zero, and the area of a triangle with normalized coordinates is that determinant times $[ABC]$; Ceva, Menelaus and Routh's theorem all become determinant identities.

An [[affine-transformations|affine transformation]] is a linear map followed by a translation. It sends lines to lines and parallel lines to parallel lines, keeps ratios of lengths along any line, and multiplies all areas by the same factor. Any triangle can be sent to any other, so a statement about ratios and areas that is true for an equilateral triangle is true for all triangles. For example, the cevians from each vertex to the point one third of the way along the opposite side cut out a triangle of area $\tfrac17$ of the whole, and computing it in a right isosceles triangle with vertices $(0, 0)$, $(1, 0)$, $(0, 1)$ is enough. Ellipses are affine images of circles, which is why their areas are $\pi ab$.

Use barycentrics when many ratios along cevians must be combined, and an affine map when a problem about ratios and areas would be easier in a special triangle. The next lesson treats inversion.`,
      related: [
        { card: "mass-points", note: String.raw`barycentric coordinates are mass points with signs (G1.5).` },
        { card: "rouths-theorem", note: String.raw`the area of the triangle cut out by three cevians (G1.5).` },
        { card: "linear-change-of-variables", note: String.raw`linear maps and the factor by which they scale areas (G6.5).` }
      ],
      exercises: [
        { q: String.raw`A point $P$ inside triangle $ABC$ has barycentric coordinates $(1 : 2 : 3)$. Find $\tfrac{[PBC]}{[ABC]}$.`, answer: "1/6",
          solution: String.raw`Normalized, the coordinates are $\left(\tfrac16, \tfrac26, \tfrac36\right)$, and the first is the area ratio $\tfrac{[PBC]}{[ABC]} = \tfrac16$.` },
        { q: String.raw`In triangle $ABC$, cevians are drawn from each vertex to the point one third of the way along the opposite side (going around the triangle in one direction). What fraction of the area of $ABC$ is the triangle they enclose?`, answer: "1/7",
          solution: String.raw`An affine map keeps ratios along lines and ratios of areas, so take $A = (0, 0)$, $B = (1, 0)$, $C = (0, 1)$, with $D = B + \tfrac13(C - B)$, $E = C + \tfrac13(A - C)$, $F = A + \tfrac13(B - A)$. Intersecting $AD$, $BE$, $CF$ pairwise and using the shoelace formula gives a triangle of area $\tfrac{1}{14}$, which is $\tfrac17$ of $[ABC] = \tfrac12$.` }
      ],
      problems: []
    },
    "G9.3": {
      prereq: ["power-of-a-point", "tangent-circles"],
      cards: ["inversion-facts", "inversion-properties"],
      body: String.raw`Inversion is a transformation that turns circles through a point into lines, and so turns hard configurations of tangent circles into easy ones about lines and circles. It is rare on the AIME but common in olympiads, and a few properties make it usable.

[[inversion-properties|Inversion]] in the circle with center $O$ and radius $r$ sends each point $P \ne O$ to the point $P'$ on ray $OP$ with $OP \cdot OP' = r^2$. Points inside the circle go outside and the circle itself is fixed; in the circle of radius $2$, a point at distance $5$ goes to distance $\tfrac45$. The basic [[inversion-facts|properties]]: a line through $O$ maps to itself; a line not through $O$ maps to a circle through $O$, and conversely; a circle not through $O$ maps to a circle not through $O$; angles between curves are preserved; and tangency is preserved. Distances transform by $A'B' = \tfrac{r^2 \cdot AB}{OA \cdot OB}$: with $r = 4$, $OA = 2$, $OB = 4$ and $AB = 3$, $A'B' = \tfrac{16 \cdot 3}{8} = 6$.

The standard use is to invert at a point where several circles meet or touch: the circles through that point become lines, tangent circles become parallel lines or tangent line-circle pairs, and a chain of circles tangent to two given circles becomes a chain of equal circles between two parallel lines. Questions about the original figure are then answered in the image and translated back with the distance formula.

Invert at the point where the most circles meet, solve the simpler image, and transform back. The next lesson collects further relations among triangle centers.`,
      related: [
        { card: "power-of-a-point", note: String.raw`the product $OP \cdot OP'$ is a power of a point (G2.3).` },
        { card: "tangent-circles", note: String.raw`tangent circles, whose tangency inversion preserves (G2.6).` },
        { card: "descartes-circle-theorem", note: String.raw`curvatures of mutually tangent circles, often proved by inversion (G2.6).` }
      ],
      exercises: [
        { q: String.raw`Points $A$ and $B$ satisfy $OA = 2$, $OB = 4$ and $AB = 3$. They are inverted in the circle with center $O$ and radius $4$. Find the distance between their images.`, answer: "6",
          solution: String.raw`$A'B' = \tfrac{r^2 \cdot AB}{OA \cdot OB} = \tfrac{16 \cdot 3}{2 \cdot 4} = 6$. (Triangles $OAB$ and $OB'A'$ are similar with ratio $\tfrac{r^2}{OA \cdot OB}$.)` }
      ],
      problems: ["2008 AIME II, Problem 13"]
    },
    "G9.4": {
      prereq: ["euler-line-ratio", "incircle-tangent-lengths"],
      cards: ["euler-line-parallel-side", "anticomplementary-triangle", "contact-triangle", "incircle-excircle-homothety"],
      body: String.raw`Beyond the main centers there is a web of relations among special triangles and homotheties, which occasionally decide a hard problem. This lesson collects the ones most likely to be useful: when the Euler line is parallel to a side, the triangle whose medial triangle is the given one, the triangle formed by the incircle's touch points, and the homothety that takes the incircle to an excircle.

The [[euler-line-parallel-side|Euler line is parallel to $BC$]] exactly when $\tan B\tan C = 3$, because the orthocenter and centroid are then at the same height above $BC$: the centroid is at $\tfrac13$ of the altitude, and the orthocenter's height is $2R\cos B\cos C$. So if $\tan B = \tfrac32$, the condition forces $\tan C = 2$. The [[anticomplementary-triangle|anticomplementary triangle]] has the given triangle as its medial triangle; its sides pass through the vertices parallel to the opposite sides, its area is $4$ times as large ($336$ for the $13$-$14$-$15$ triangle), and the given triangle's orthocenter is its circumcenter.

The [[contact-triangle|contact triangle]] joins the points where the incircle touches the sides. Its angles are $90^\circ - \tfrac A2$ and so on, and its circumcircle is the incircle, so its circumradius is $r$. The [[incircle-excircle-homothety|homothety at $A$ taking the incircle to the $A$-excircle]] maps the incircle's touch point on $BC$'s far side to the excircle's touch point, which proves that the line from $A$ through the excircle's touch point with $BC$ passes through the point of the incircle diametrically opposite its own touch point, a fact behind several olympiad problems and the equality of tangent segments $BD = CD'$.

These relations are tools to recognize rather than formulas to recompute. The last lesson treats projective tools.`,
      related: [
        { card: "exradii", note: String.raw`the excircles and their radii (G2.5).` },
        { card: "medial-triangle", note: String.raw`the triangle of midpoints, the inverse of the anticomplementary triangle (G5.4).` },
        { card: "homothety-monge", note: String.raw`homotheties between circles (G6.5).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$ the Euler line is parallel to $BC$, and $\tan B = \tfrac32$. Find $\tan C$.`, answer: "2",
          solution: String.raw`The Euler line is parallel to $BC$ exactly when $\tan B\tan C = 3$, so $\tan C = \tfrac{3}{3/2} = 2$.` },
        { q: String.raw`Triangle $ABC$ has area $84$. Find the area of its anticomplementary triangle.`, answer: "336",
          solution: String.raw`$ABC$ is the medial triangle of its anticomplementary triangle, and a medial triangle has a quarter of the area, so the anticomplementary triangle has area $4 \cdot 84 = 336$.` }
      ],
      problems: []
    },
    "G9.5": {
      prereq: ["power-of-a-point", "symmedian-lemoine"],
      cards: ["harmonic-quadrilateral", "cross-ratio"],
      body: String.raw`Projective geometry studies what stays the same when a figure is projected from a point onto another line or plane. Lengths and angles change, but one quantity built from four points does not, the cross-ratio, and the special value $-1$ marks a harmonic set of points. These ideas appear in olympiad problems with tangents, polars and symmedians.

The [[cross-ratio|cross-ratio]] of four collinear points $A$, $B$, $C$, $D$ is $(A, B; C, D) = \tfrac{CA}{CB} \div \tfrac{DA}{DB}$, with signed lengths. For the points $0$, $1$, $2$, $3$ on a line it is $\tfrac{2}{-1} \div \tfrac{3}{-2} = \tfrac43$. Projection from a point onto another line preserves it, and so does inversion when the four points are on a circle; for complex numbers $z_1, z_2, z_3, z_4$ the cross-ratio is real exactly when the four points lie on one circle or line. Four points are harmonic when the cross-ratio is $-1$: with $A = 0$, $B = 3$, $C = 1$, the harmonic conjugate of $C$ is $D = -3$. The feet of the internal and external bisectors from a vertex divide the opposite side harmonically.

A [[harmonic-quadrilateral|harmonic quadrilateral]] is a cyclic quadrilateral $ABCD$ with $AB \cdot CD = BC \cdot DA$. The tangents to its circle at $A$ and $C$ meet on line $BD$, and $BD$ is the symmedian from $B$ in triangle $ABC$; this is the usual way a symmedian appears in a problem with tangent lines.

Look for a cross-ratio when four points on a line or circle are projected or inverted, and for a harmonic quadrilateral when two tangents meet on a chord. The Summary (G9.6) collects the chapter's strategies; this chapter closes the geometry book.`,
      related: [
        { card: "symmedian-lemoine", note: String.raw`the symmedian through the meeting point of two tangents (G5.6).` },
        { card: "angle-bisector-theorem", note: String.raw`internal and external bisectors divide the side harmonically (G1.4).` },
        { card: "complex-basics", note: String.raw`the cross-ratio of complex numbers and concyclic points (A6.2).` }
      ],
      exercises: [
        { q: String.raw`Points $A$, $B$, $C$, $D$ lie on a number line at $0$, $1$, $2$, $3$. Find the cross-ratio $(A, B; C, D) = \tfrac{CA}{CB} \div \tfrac{DA}{DB}$ with signed lengths.`, answer: "4/3",
          solution: String.raw`$\tfrac{CA}{CB} = \tfrac{0 - 2}{1 - 2} = 2$ and $\tfrac{DA}{DB} = \tfrac{0 - 3}{1 - 3} = \tfrac32$, so the cross-ratio is $2 \div \tfrac32 = \tfrac43$.` },
        { q: String.raw`On a number line, $A = 0$, $B = 3$ and $C = 1$. Find the point $D$ with $(A, B; C, D) = -1$.`, answer: "-3",
          solution: String.raw`$\tfrac{CA}{CB} = \tfrac{0 - 1}{3 - 1} = -\tfrac12$, so we need $\tfrac{DA}{DB} = \tfrac{0 - D}{3 - D} = \tfrac12$. Then $-2D = 3 - D$ and $D = -3$.` }
      ],
      problems: ["2017 AIME I, Problem 10"]
    },
    "G9.6": {
      prereq: ["barycentric-coordinates", "affine-transformations", "inversion-properties", "euler-line-parallel-side", "anticomplementary-triangle", "incircle-excircle-homothety", "cross-ratio", "harmonic-quadrilateral"],
      cards: [],
      body: String.raw`[[barycentric-coordinates|Barycentric coordinates]] are area shares, which make ratios of areas and concurrency computations direct. [[affine-transformations|An affine map]] keeps parallels and ratios along lines and scales all areas equally, so a triangle can be taken equilateral when only such ratios are asked.

[[inversion-properties|Inversion]] sends distance $d$ to $\tfrac{k^2}{d}$, turns circles through the center into lines, and keeps angles, so tangencies survive.

[[euler-line-parallel-side|The Euler line is parallel to $BC$]] exactly when $\tan B\tan C = 3$. [[anticomplementary-triangle|The anticomplementary triangle]] has four times the area, and [[incircle-excircle-homothety|the incircle and an excircle]] are related by a homothety from a vertex.

[[cross-ratio|The cross-ratio]] of four collinear points is kept by projection, and [[harmonic-quadrilateral|a harmonic quadrilateral]], with cross-ratio $-1$, appears where two tangents meet on a chord's line.`,
      strategies: [
        String.raw`For ratios of areas or lengths in a triangle, put the vertices at barycentric coordinates or apply an affine map to a nicer triangle.`,
        String.raw`When many circles pass through one point, invert about it.`,
        String.raw`When the Euler line, the incircle and excircles, or the medial and anticomplementary triangles appear, look for a homothety.`,
        String.raw`For four points on a line that are projected or inverted, track the cross-ratio.`,
        String.raw`When two tangents to a circle meet on the line of a chord, look for a harmonic set.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Each cevian of a triangle of area $21$ divides its opposite side in the ratio $1 : 2$, going around the triangle. Find the area of the small triangle the three cevians enclose.`, answer: "3",
        solution: String.raw`Apply an affine map to an equilateral triangle, or use Routh's theorem with all three ratios $2$: the inner triangle is $\tfrac{(2 \cdot 2 \cdot 2 - 1)^2}{(2 \cdot 2 + 2 + 1)^3} = \tfrac{49}{343} = \tfrac17$ of the whole. So its area is $\tfrac{21}{7} = 3$.` },
      { q: String.raw`Under inversion in a circle of radius $4$ centered at $O$, a line at distance $2$ from $O$ becomes a circle through $O$. Find its radius.`, answer: "4",
        solution: String.raw`The point of the line nearest $O$, at distance $2$, goes to distance $\tfrac{16}{2} = 8$, and it is the point of the image circle farthest from $O$. So the circle has diameter $8$ and radius $4$.` },
      { q: String.raw`The triangle whose medial triangle is $ABC$ is its anticomplementary triangle. If $ABC$ has area $84$, what is the area of its anticomplementary triangle?`, answer: "336",
        solution: String.raw`The anticomplementary triangle is similar to $ABC$ with ratio $2$ (a homothety of ratio $-2$ from the centroid), so its area is $4 \cdot 84 = 336$.` },
      { q: String.raw`Points $A$, $B$, $C$, $D$ lie on a number line at $0$, $1$, $2$ and $4$. Find the cross-ratio $\dfrac{CA}{CB} \Big/ \dfrac{DA}{DB}$, with signed lengths.`, answer: "3/2",
        solution: String.raw`With signed lengths, $\tfrac{CA}{CB} = \tfrac{0 - 2}{1 - 2} = 2$ and $\tfrac{DA}{DB} = \tfrac{0 - 4}{1 - 4} = \tfrac43$. The cross-ratio is $2 \div \tfrac43 = \tfrac32$.` },
      { q: String.raw`On a number line, $A = 0$, $B = 6$ and $C = 2$. Find $D$ so that $A$, $B$, $C$, $D$ form a harmonic set: $\dfrac{CA}{CB} \Big/ \dfrac{DA}{DB} = -1$.`, answer: "-6",
        solution: String.raw`Here $\tfrac{CA}{CB} = \tfrac{-2}{4} = -\tfrac12$, so $\tfrac{DA}{DB} = \tfrac12$ in signed lengths: $\tfrac{-D}{6 - D} = \tfrac12$, so $-2D = 6 - D$ and $D = -6$. (So $C$ and $D$ divide $AB$ internally and externally in the same ratio $1 : 2$.)` },
      { q: String.raw`A right triangle has its right angle at the origin and legs of lengths $3$ and $4$ along the positive axes. Find the sum of the coordinates of its incenter.`, answer: "2",
        solution: String.raw`The incenter is at distance $r = 1$ from both legs, so it is $(1, 1)$, with sum $2$. In barycentric terms it is the average of the vertices weighted by the opposite sides, $\tfrac{5 \cdot (0,0) + 4 \cdot (3, 0) + 3 \cdot (0, 4)}{12} = (1, 1)$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`In triangle $ABC$, $\tan B = 1$ and the Euler line is parallel to $BC$. Find $\tan C$.`, answer: "3",
        solution: String.raw`The Euler line is parallel to $BC$ exactly when $\tan B\tan C = 3$, so $\tan C = 3$. (The condition comes from requiring the centroid and the orthocenter to be at the same height above $BC$: the orthocenter's height is $2R\cos B\cos C$ and the centroid's is $\tfrac13$ of the altitude $2R\sin B\sin C$.)` },
      { q: String.raw`Circles of radii $1$ and $2$ are internally tangent at $O$. Under inversion in the circle of radius $1$ about $O$, they become two parallel lines. Find the distance between the lines.`, answer: "1/4",
        solution: String.raw`A circle through $O$ of radius $r$ has its far point at distance $2r$ from $O$, which goes to distance $\tfrac{1}{2r}$; the image is the line through that point perpendicular to the line of centers. So the images are at distances $\tfrac12$ and $\tfrac14$ on the same side of $O$, and the lines are $\tfrac14$ apart.` }
    ],
    problems: []
  }
};
