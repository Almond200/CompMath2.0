// Extended detail-page write-ups for Geometry, keyed by formula id.
// Blocks separated by blank lines; lines starting with "## " render as headings.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"inversion-facts": String.raw`
## Key forms
- $OP \cdot OP^* = r^2$ — the definition; inverting twice returns $P$
- $P^*Q^* = \frac{r^2 \cdot PQ}{OP \cdot OQ}$ — how distances change
- a line through $O$ maps to itself, a line not through $O$ to a circle through $O$, and a circle not through $O$ to a circle not through $O$ — what happens to lines and circles
- angles between curves are preserved — so tangency and orthogonality survive

## Conditions
$P \ne O$: the center has no image, and plays the role of the point at infinity. A circle not through $O$ maps to a circle, but its center does not map to the center of the image.

## Why it works
For two points $P$ and $Q$, the definition gives $OP \cdot OP^* = OQ \cdot OQ^*$, so $\frac{OP}{OQ} = \frac{OQ^*}{OP^*}$. With the shared angle at $O$, triangles $OPQ$ and $OQ^*P^*$ are similar, and matching sides gives $$\frac{P^*Q^*}{PQ} = \frac{OQ^*}{OP} = \frac{r^2}{OP \cdot OQ}.$$

The same similarity carries lines to circles. Let $A$ be the foot of the perpendicular from $O$ to a line not through $O$, and $P$ any point of the line. Triangles $OAP$ and $OP^*A^*$ are similar, so the angle at $P^*$ is a right angle, and $P^*$ lies on the circle with diameter $OA^*$.

## Useful observations
- Centering at a point where many circles meet turns every circle through it into a line, and tangent circles through it into parallel lines.
- A circle orthogonal to the circle of inversion maps to itself.
- The distance formula proves [[ptolemys-inequality|Ptolemy's Inequality]]: invert about one vertex and apply the triangle inequality to the images of the other three.

## Applications
Configurations of tangent circles, chains of circles, Ptolemy-type results, and problems with many circles through one point.

## Contest profile
An olympiad tool rather than an AIME formula; contest uses almost always go through the method of inverting about a well-chosen point.
`,
"monges-theorem": String.raw`
## Key forms
- $E_{ij} = \frac{r_jO_i - r_iO_j}{r_j - r_i}$ — the external center of the circles $(O_i, r_i)$ and $(O_j, r_j)$, where their external tangents meet
- $I_{ij} = \frac{r_jO_i + r_iO_j}{r_i + r_j}$ — the internal center, where their internal tangents meet
- $E_{12}$, $E_{23}$, $E_{13}$ are collinear, and so are $E_{12}$, $I_{23}$, $I_{13}$ — the two forms of the theorem

## Conditions
The radii are pairwise different, so every external center exists, and the centers are not collinear. With two equal radii that external center goes to infinity, and the theorem then says the line through the other two is parallel to the line of those two centers.

## Why it works
Each external center divides its segment of centers externally in the ratio of the radii: in signed lengths, $\frac{O_1E_{12}}{E_{12}O_2} = -\frac{r_1}{r_2}$. Multiplying the three ratios around triangle $O_1O_2O_3$ gives $$\left(-\frac{r_1}{r_2}\right)\left(-\frac{r_2}{r_3}\right)\left(-\frac{r_3}{r_1}\right) = -1,$$ which is exactly the condition of [[menelaus-theorem|Menelaus' Theorem]] for the three points to be collinear. With two internal centers, two of the ratios turn positive and the product is still $-1$.

## Useful observations
- A [[homothety-monge|homothety]] centered at $E_{12}$ with ratio $\frac{r_2}{r_1}$ carries the first circle onto the second, which is why the external tangents pass through it.
- Composing the homotheties at $E_{12}$ and $E_{23}$ gives the one at $E_{13}$, and the center of a composition of two homotheties lies on the line through their centers: a second proof.

## Applications
Collinearity of tangent intersections, configurations of three circles, and centers of similitude in tangent-circle chains.

## Contest profile
An olympiad fact that turns three circles into one line; at AIME level the formulas for the centers of similitude do the work.
`,
"extend-sides-to-meet": String.raw`
## When to use
Trapezoids, quadrilaterals with two given angles that sum to less than $180^\circ$, and figures where two given angles would sit naturally in one triangle. In a cyclic quadrilateral, extend a pair of opposite sides when a product of lengths along them is wanted; extend both pairs when the problem mentions the points where opposite sides meet, which is the complete quadrilateral. If the two sides are parallel they never meet, and [[parallel-line-similarity|drawing a parallel line]] does the same job.

## How
1. Pick the two sides whose extensions meet on the side of the figure where the given angles are.
2. Extend them to their meeting point $E$, and label the new segments.
3. Find what the new triangle gives: similar triangles from a parallel side, the angle at $E$ from the angle sum, or an isosceles triangle from equal base angles.
4. Write the lengths of the original figure as differences of lengths in the new triangle, and solve.

## Why it works
A trapezoid's bases are parallel, so the triangle on the shorter base and the triangle on the longer base share the angle at $E$ and are similar, with ratio equal to the ratio of the bases. The two angles at the ends of the extended sides add up with the angle at $E$ to $180^\circ$, so known angles there fix the angle at $E$. Either way the whole figure becomes one triangle, where a single theorem applies.

A general quadrilateral works the same way. For $ABCD$ with lines $AB$ and $DC$ meeting at $E$ beyond $B$ and $C$, triangle $EAD$ holds the angles at $A$ and $D$, so $\angle E = 180^\circ - \angle A - \angle D$. If $ABCD$ is cyclic, $\angle EBC = 180^\circ - \angle ABC = \angle ADC$, so triangles $EBC$ and $EDA$ are similar and $EB \cdot EA = EC \cdot ED$.

Extending the other pair as well, $AD$ and $BC$ meeting at $F$, gives the complete quadrilateral: four lines, six points where they cross, and three diagonals $AC$, $BD$ and $EF$. It carries facts of its own: the circumcircles of its four triangles pass through one point, the [[complete-quadrilateral-miquel|Miquel Point]], and the midpoints of the three diagonals lie on the [[newtons-line|Newton–Gauss Line]].

## Formulas it uses
- [[similar-figures-ratios]]: the two triangles that share the new point are similar, so their sides are in the ratio of the parallel sides and their areas in its square.
- [[intercept-theorem]]: a line parallel to one side of a triangle cuts the other two sides in the same ratio, which is where the similarity in a trapezoid comes from.
- [[law-of-cosines]]: when the angle at the new point is known, the completed triangle gives the remaining lengths.
- [[power-of-a-point]]: when the quadrilateral is cyclic, the two sides meet at a point outside its circle, and $EA \cdot EB = ED \cdot EC$ turns the similar triangles there into one equation.

## Common traps
- Extending the wrong pair of sides, which meet far outside the figure or not at all because they are parallel.
- Forgetting that the new point lies outside the original figure, so the lengths in the problem are differences of lengths in the triangle.

## Contest profile
Usually the first line of the solution, after which a similar-triangle or right-triangle computation finishes.
`,
"pythagorean-theorem": String.raw`
## Key forms
- $a^2 + b^2 = c^2$, with $c$ opposite the right angle
- $a^2 + b^2 - c^2 > 0,\ = 0,\ < 0$ exactly as the angle opposite $c$ is acute, right, or obtuse
- $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ and, in space, $d = \sqrt{a^2 + b^2 + c^2}$ for the diagonal of an $a \times b \times c$ box

## Conditions
The triangle has a right angle, between the legs $a$ and $b$. In any other triangle the Law of Cosines replaces it, $c^2 = a^2 + b^2 - 2ab\cos C$, which reduces to the theorem exactly when $C = 90^\circ$.

## Why it works
Dropping the altitude from the right angle cuts the triangle into two smaller copies of itself, and comparing each copy with the whole shows that each leg squared is a piece of the hypotenuse times the whole hypotenuse.

Call the right angle $C$, and let the altitude from $C$ meet the hypotenuse at $D$, splitting it into $BD = p$ and $AD = q$. Triangle $CBD$ shares angle $B$ with triangle $ABC$ and has a right angle, so the two are similar, and $\frac pa = \frac ac$, that is $a^2 = pc$. In the same way $b^2 = qc$, and adding gives $a^2 + b^2 = (p + q)c = c^2$.

There is also a proof at a glance. Four copies of the triangle fit inside a square of side $a + b$ in two ways: one leaves a tilted square of side $c$ uncovered, the other leaves two squares of sides $a$ and $b$. The uncovered areas are equal, so $c^2 = a^2 + b^2$.

{{figure:rearrangement}}

## Useful observations
- A chord of length $\ell$ at distance $d$ from the center of a circle of radius $R$ satisfies $R^2 = d^2 + \left(\frac\ell2\right)^2$, since the perpendicular from the center bisects the chord.
- The tangent length from a point at distance $D$ from the center is $\sqrt{D^2 - R^2}$, since the tangent is perpendicular to the radius.
- The distance formula is the theorem in coordinates, and applying it twice gives the space diagonal of a box.
- Primitive triples are $(m^2 - n^2, 2mn, m^2 + n^2)$; beyond the four above, $(9, 40, 41)$ and $(20, 21, 29)$ also appear often.

## Applications
Distances in the plane and in space, lengths in circles through chords, tangents, and radii, altitudes and heights of triangles and solids, and recognizing right angles from three lengths.

## Contest profile
On a very large share of geometry problems, almost always as the closing step after similar triangles, tangent circles, or a cross-section has produced the right triangle.
`,

"special-right-triangles": String.raw`
## Key forms
- $1 : 1 : \sqrt2$ — the 45-45-90 triangle: two equal legs, and a hypotenuse $\sqrt2$ times a leg
- $1 : \sqrt3 : 2$ — the 30-60-90 triangle, listed opposite the angles $30^\circ$, $60^\circ$, $90^\circ$
- legs $s$ and hypotenuse $s\sqrt2$, with area $\frac{s^2}{2}$ — the 45-45-90 triangle scaled by $s$
- short leg $t$, long leg $t\sqrt3$, hypotenuse $2t$, with area $\frac{\sqrt3}{2}t^2$ — the 30-60-90 triangle scaled by $t$

## Conditions
The triangle is right, with the stated acute angles; the ratios are matched to the angles in order, so the side opposite $30^\circ$ is the shortest.

## Why it works
Each triangle is half of a figure you already know: the 45-45-90 triangle is half a square, and the 30-60-90 triangle is half an [[equilateral-triangle-facts|equilateral triangle]].

Cut a square of side $1$ along a diagonal. Each half is a right triangle with two legs of $1$, so its two acute angles are equal, $45^\circ$ each, and by the [[pythagorean-theorem|Pythagorean Theorem]] the diagonal is $\sqrt{1^2 + 1^2} = \sqrt2$. That gives $1 : 1 : \sqrt2$.

{{figure:square}}

Cut an equilateral triangle of side $2$ along an altitude. The altitude meets the base at its midpoint, so each half has hypotenuse $2$ and short leg $1$. Its angles are $60^\circ$ at the base corner, $30^\circ$ at the top, where the altitude splits the $60^\circ$ angle in half, and $90^\circ$ at the foot, and its third side is $\sqrt{2^2 - 1^2} = \sqrt3$. That gives $1 : \sqrt3 : 2$, with the $1$ opposite the $30^\circ$ angle.

{{figure:equilateral}}

## Useful observations
- An angle of $30^\circ$, $45^\circ$, or $60^\circ$ turns into lengths without trigonometry once a perpendicular is dropped to make one of these triangles.
- An angle of $120^\circ$ or $135^\circ$ becomes a special triangle after one side is extended, since the supplementary angle is $60^\circ$ or $45^\circ$.
- A regular [[regular-hexagon-area|hexagon]] splits into equilateral triangles, and each of those splits into two 30-60-90 triangles; a square's diagonal gives two 45-45-90 triangles.
- Each ratio is used in both directions: a hypotenuse $h$ gives legs $\frac{h}{\sqrt2}$, and a long leg $\ell$ gives a short leg $\frac{\ell}{\sqrt3}$.

## Applications
Lengths in squares, equilateral triangles, and hexagons, and any figure where an angle of $30^\circ$, $45^\circ$, or $60^\circ$ must become a length.

## Contest profile
The default length step in AMC geometry, seldom the whole problem: it usually turns an angle into lengths inside an equilateral triangle, a square, or a circle.
`,

"altitude-hypotenuse": String.raw`
## Key forms
- $h^2 = pq$ — the altitude is the geometric mean of the two pieces of the hypotenuse
- $a^2 = pc$ and $b^2 = qc$ — each leg is the geometric mean of the hypotenuse and the piece next to it
- $h = \frac{ab}{c}$ — from the two ways of writing the area, $\frac12ab = \frac12ch$
- $a^2 + b^2 = c^2$ — adding the last two relations gives the Pythagorean Theorem

## Conditions
The triangle has a right angle at the vertex where the altitude starts; $p$ and $q$ are the pieces of the hypotenuse, with $p$ next to leg $a$, $q$ next to leg $b$, and $c = p + q$.

## Why it works
Each small triangle shares an acute angle with the original and has a right angle, so all three triangles are similar, and each relation is one proportion between two of them.

Laid side by side in the same orientation, with the shared angle at the left, the three triangles have legs $p$ and $h$, $h$ and $q$, and $a$ and $b$, and hypotenuses $a$, $b$, and $c$.

{{figure:similar}}

Matching sides gives the relations. From the two small triangles, $\frac hp = \frac qh$, so $h^2 = pq$. From the small triangle next to $a$ and the whole, $\frac pa = \frac ac$, so $a^2 = pc$, and likewise $b^2 = qc$. Adding the last two gives $a^2 + b^2 = (p + q)c = c^2$, a proof of the Pythagorean Theorem.

## Useful observations
- Any two of $a$, $b$, $h$, $p$, $q$ determine the other three, with $c = p + q$.
- A point $C$ on a circle with diameter $AB$ sees the diameter at a right angle by [[thales-theorem|Thales' Theorem]], so the perpendicular $CD$ to the diameter has $CD^2 = AD \cdot DB$, the form of [[power-of-a-point|Power of a Point]] for a chord perpendicular to a diameter.
- In coordinates, the distance from the right-angle vertex to the hypotenuse is $\frac{ab}{c}$ with no computation.
- The phrase "geometric mean" in a right-triangle problem is the signal for these relations.

## Applications
Right triangles with an altitude drawn, semicircles on a hypotenuse, and chains of similar triangles inside a right triangle.

## Contest profile
A fixture of MATHCOUNTS and AMC geometry, appearing in circles tangent to a hypotenuse, folded rectangles, and chains of similar right triangles; on the AIME it is a step inside a longer computation.
`,

"triangle-inequality": String.raw`
## Key forms
- $a < b + c$ — each side is shorter than the sum of the other two, for every choice of the side
- $|a - b| < c < a + b$ — the range of the third side when two sides are known
- if $c$ is the longest side, only $c < a + b$ needs checking
- $a = b + c$ — the flat triangle, where the three points lie on one line
- $2\min(a, b) - 1$ — the number of whole numbers $c$ that complete a triangle with integer sides $a$ and $b$

## Conditions
The lengths are positive. The inequalities are strict for a genuine triangle; equality gives the flat case.

## Why it works
The straight segment is the shortest path between two points, so going from $B$ to $C$ by way of $A$ can never be shorter than going straight.

The side $a = BC$ is the direct route, and $c + b = BA + AC$ is the route through $A$. A detour through a point off the line is strictly longer, which gives $a \lt b + c$, and the same holds for each side. The detour ties the direct route only when $A$ lies on the segment $BC$, which is the flat triangle where $a = b + c$.

The two-sided form $$|a - b| \lt c \lt a + b$$ packages all three inequalities. The right half is one of them; the left half combines the other two, since $a \lt b + c$ gives $a - b \lt c$ and $b \lt a + c$ gives $b - a \lt c$. When $c$ is the longest side, the other two conditions hold automatically, so only $c \lt a + b$ needs checking.

{{figure:range}}

## Useful observations
- The whole numbers $c$ strictly between $|a - b|$ and $a + b$ number $(a + b) - |a - b| - 1 = 2\min(a, b) - 1$, the count behind [[integer-triangles-perimeter|integer-triangle problems]].
- The flat triangle is the boundary of what is possible, so a length in a changing figure is often extreme exactly when a triangle collapses.
- [[ravi-substitution|Ravi substitution]] builds the inequalities into the variables so they cannot be violated, and [[abs-triangle-inequality|the absolute-value form]] is the same statement on the number line.

## Applications
Deciding which side lengths are possible, counting triangles with given sides, and bounding a length in a figure.

## Contest profile
AMC counts triangles from given sticks or integer sides; on the AIME the inequality is a hidden constraint that rejects spurious solutions after algebra.
`,

"polygon-angle-sums": String.raw`
## Key forms
- $180^\circ(n - 2)$ — the sum of the interior angles of an $n$-gon
- $360^\circ$ — the sum of the exterior angles, one at each vertex, for any convex polygon
- $\frac{180^\circ(n - 2)}{n}$ and $\frac{360^\circ}{n}$ — each interior and each exterior angle of a regular $n$-gon
- $\frac{n(n - 3)}{2}$ — the number of diagonals of an $n$-gon

## Conditions
The polygon is convex for the exterior-angle statement as written; the interior sum holds for every simple polygon, with reflex angles counted at their full size.

## Why it works
Cutting the polygon into triangles gives the interior sum, and walking around its boundary gives the exterior sum.

From one vertex of a convex $n$-gon, the diagonals to the $n - 3$ vertices that are not its neighbors cut it into $n - 2$ triangles, and the angles of those triangles together make up exactly the polygon's angles. So the interior angles add to $$(n - 2) \cdot 180^\circ.$$

Now walk once around the boundary. At each vertex you turn through the exterior angle, and after the last turn you face the way you started, having turned one full revolution. So the exterior angles add to $360^\circ$ whatever $n$ is, and each one is $180^\circ$ minus the interior angle beside it.

{{figure:walk}}

## Useful observations
- For a regular polygon the exterior angle $\frac{360^\circ}{n}$ is the quick route: a regular octagon has exterior angles of $45^\circ$ and interior angles of $135^\circ$, and a given interior angle tells $n$ at once.
- Regular polygons fit around a point exactly when their interior angles add to $360^\circ$, which is why squares, equilateral triangles, and hexagons tile the plane and regular pentagons do not.
- The fan of diagonals from one vertex that proves the interior sum also counts the [[handshakes-diagonals|diagonals]]: $n - 3$ from each vertex, so $\frac{n(n - 3)}{2}$ in all.

## Applications
Angles of regular and irregular polygons, tilings by regular polygons, and counting diagonals.

## Contest profile
MATHCOUNTS and early AMC use it directly; later problems combine it with an equation, often in integers, as when angles are in [[arithmetic-series|arithmetic progression]], or embed it in star-polygon [[angle-chasing|angle chases]].
`,

"similar-figures-ratios": String.raw`
## Key forms
- $\frac{\ell_1}{\ell_2} = k$ — every pair of corresponding lengths has the same ratio: sides, heights, medians, perimeters, radii, and diagonals
- $\frac{A_1}{A_2} = k^2$ — areas scale by the square of the ratio
- $\frac{V_1}{V_2} = k^3$ — volumes scale by the cube of the ratio
- a parallel cut at ratio $k$ leaves the small piece $k^2$ of the area and the remainder $1 - k^2$; for a pyramid or cone the frustum holds $1 - k^3$ of the volume

## Conditions
The figures are similar, one a scaled copy of the other, possibly turned or reflected, and the ratio $k$ is taken between corresponding lengths. The powers hold for shapes of every kind, curved ones included.

## Why it works
Area is a length times a length and volume is three lengths multiplied, so scaling every length by $k$ scales area by $k$ twice over and volume three times over.

Start with the plainest shapes. Scaling an $x \times y$ rectangle and an $x \times y \times z$ box by $k$ gives $$kx \cdot ky = k^2 \cdot xy, \qquad kx \cdot ky \cdot kz = k^3 \cdot xyz.$$ A triangle behaves the same way, since its area is half the base times the height and both of those are lengths that scale by $k$.

Every other region reduces to these. Cover it with a fine grid of tiny squares; the scaled region is covered by the scaled grid, whose squares each have $k^2$ times the area. So the total area scales by $k^2$ however fine the grid is, curved boundary or not, and tiny cubes give $k^3$ for volume in the same way.

{{figure:grid}}

The factor is the same for every pair of corresponding lengths, not only the sides, which is why a single matched pair is enough to know them all.

## Useful observations
- One matched pair of lengths fixes $k$, and from then on every length, area, and volume in the figure is known in terms of one unknown instead of many.
- Triangles become similar through a line parallel to a side, through the altitude to the hypotenuse of a right triangle, and through a shared angle plus an equal angle on the same arc.

{{figure:cut}}

- Nested similar figures have areas in a [[geometric-series|geometric series]] with ratio $k^2$, which is what makes infinite dissections tractable.

## Applications
Scaling lengths, areas, and volumes, cut cones and pyramids, and chains of nested similar figures.

## Contest profile
The most-used idea in AMC geometry and often the whole solution; its usual partner is the Pythagorean Theorem, where the similarity pins down a ratio and Pythagoras turns it into a number.
`,

"midsegment-theorem": String.raw`
## Key forms
- $MN \parallel BC$ and $MN = \frac12 BC$ — the segment joining the midpoints of two sides of a triangle
- the three midsegments cut the triangle into four congruent triangles, each with a quarter of the area
- the medial triangle has half the perimeter and a quarter of the area of the original
- $\frac{a + b}{2}$ — the segment joining the midpoints of the legs of a trapezoid with bases $a$ and $b$ is parallel to the bases and has this length

## Conditions
$M$ and $N$ are midpoints of two sides of the triangle; the parallel and half-length conclusions are about the third side.

## Why it works
Joining the midpoint $M$ of $AB$ to the midpoint $N$ of $AC$ makes a triangle $AMN$ that is the original triangle shrunk by half toward $A$.

$AM = \frac12AB$ and $AN = \frac12AC$, and the two triangles share the angle at $A$, so triangle $AMN$ is similar to triangle $ABC$ with ratio $\frac12$. Corresponding angles are equal and corresponding sides are in the ratio $\frac12$, so $$MN \parallel BC, \qquad MN = \tfrac12 BC.$$ In the language of transformations, it is the [[homothety-monge|homothety]] centered at $A$ with ratio $\frac12$.

All three midsegments together cut the triangle into four triangles whose sides are each half a side of the original, so the four are congruent and each has a quarter of the area.

{{figure:four}}

## Useful observations
- For a $6$-$8$-$10$ triangle the medial triangle is $3$-$4$-$5$.
- The midpoints of the sides of any quadrilateral form a parallelogram, [[varignons-theorem|Varignon's Theorem]], because each of its sides is parallel to a diagonal and half as long.
- Repeating a midpoint construction produces lengths in a geometric sequence with ratio $\frac12$ and areas with ratio $\frac14$.
- The [[nine-point-circle|nine-point circle]] passes through the three midpoints of the sides.

## Applications
Triangles and quadrilaterals with midpoints marked, medial triangles, and repeated midpoint constructions.

## Contest profile
Appears wherever midpoints do, usually as the parallel line and the half length that supply the missing similar triangle.
`,

"centroid-division": String.raw`
## Key forms
- $AG : GM = 2 : 1$ — the centroid divides each median into two parts, the longer next to the vertex
- $G = \frac{A + B + C}{3}$ — in coordinates, the average of the three vertices
- $\vec{GA} + \vec{GB} + \vec{GC} = \vec 0$ — the vector form
- the three medians cut the triangle into six pieces of equal area, so each of $[GBC]$, $[GCA]$, and $[GAB]$ is a third of the triangle

## Conditions
$G$ is the intersection of the medians, and $M$ is the midpoint of the side opposite $A$. The six equal areas are the regions between the medians, not the regions cut by other cevians.

## Why it works
The average of the three vertices lies two thirds of the way along every median, so all three medians pass through that one point.

The midpoint of $BC$ is $M = \frac{B + C}{2}$, and the point two thirds of the way from $A$ to $M$ is $$A + \tfrac23(M - A) = \tfrac13A + \tfrac23M = \frac{A + B + C}{3}.$$ That does not depend on which vertex we started from, so the same point lies two thirds of the way along each median, which proves both that the medians meet and that they are divided $2 : 1$. [[mass-points|Mass points]] give the same result, with a mass of $1$ at each vertex.

For the six pieces, the two touching the midpoint of a side have equal bases and the same height from $G$, so they are equal; call the three pairs $x$, $y$, and $z$. The median from $A$ splits the triangle into two halves of equal area, $x + 2z$ and $x + 2y$, so $y = z$, and another median gives $x = y$.

{{figure:six}}

## Useful observations
- A median of length $m$ puts the centroid $\frac{2m}{3}$ from the vertex and $\frac m3$ from the midpoint.
- Any region bounded by medians is a whole number of sixths of the triangle.
- The lengths of the medians themselves come from [[apollonius-theorem|Apollonius's Theorem]], the median case of [[stewarts-theorem|Stewart's Theorem]].
- The vector form gives slicker solutions on the AIME than coordinates when several distances from the centroid are involved.

## Applications
Distances along medians, areas of regions bounded by medians, and coordinates of the centroid.

## Contest profile
On the AMC, a point placed at the centroid with areas that come out in thirds and sixths; on the AIME, usually one step beside coordinates, power of a point, or the area method.
`,

"cevian-area-ratio": String.raw`
## Key forms
- $\frac{[ABD]}{[ACD]} = \frac{BD}{DC}$ — for $D$ on line $BC$, the two triangles with apex $A$ have areas in the ratio of their bases
- triangles with the same apex and bases on one line have areas in the ratio of the bases, whether or not the bases touch
- triangles on the same base with apexes on a line parallel to it have equal area

## Conditions
The triangles share an apex, and their bases lie on one line; $D$ may lie on the extension of $BC$ with the ratio taken as a ratio of lengths.

## Why it works
A triangle's area is half its base times its height, so two triangles with the same height have areas in the ratio of their bases.

For $D$ on $BC$, the triangles $ABD$ and $ACD$ both have apex $A$ and bases on line $BC$. Their height is the distance $h$ from $A$ to that line, the same for both, so $$\frac{[ABD]}{[ACD]} = \frac{\frac12 \cdot BD \cdot h}{\frac12 \cdot DC \cdot h} = \frac{BD}{DC}.$$

Nothing in that used the fact that the two bases meet at $D$ or lie inside side $BC$, only that the apex is shared and the bases lie on one line.

{{figure:fan}}

## Useful observations
- Each ratio given along a side becomes an area ratio, using the vertex opposite that side as the apex: a $1 : 4$ split of $BC$ makes $[ABD] = \frac15[ABC]$.
- The statement runs in reverse: known areas give a ratio along a line.
- Two cevians meeting inside a triangle use it once along each, which is [[area-method|the area method]] in full; [[mass-points|mass points]] reach the resulting length ratios faster when only lengths are wanted.
- [[rouths-theorem|Routh's Theorem]] packages the case of three cevians.

## Applications
Areas of the pieces of a triangle cut by cevians, and ratios along a line from known areas.

## Contest profile
Drives shaded-region problems on the AMC 10 and 12 where ratios along the sides are given, and is the first step of AIME area-chasing in triangles cut by several cevians.
`,

"trapezoid-parallelogram-areas": String.raw`
## Key forms
- $A = \frac{(b_1 + b_2)h}{2}$ — a trapezoid with parallel sides $b_1$, $b_2$ and height $h$
- $A = \frac{d_1d_2}{2}$ — a quadrilateral with perpendicular diagonals $d_1$, $d_2$, in particular a rhombus or kite
- in a trapezoid with diagonals meeting at $O$, the triangles on the two bases are similar in the ratio of the bases, and the two triangles on the legs have equal area

## Conditions
For the diagonal formula the diagonals are perpendicular, and every quadrilateral with perpendicular diagonals qualifies, not only rhombi and kites. The height is the perpendicular distance between the parallel sides.

## Why it works
Each formula comes from rearranging the quadrilateral into shapes whose area is already known.

Two copies of a trapezoid, one turned half a turn and fitted against the other, form a parallelogram with base $b_1 + b_2$ and the same height. Its area is its base times its height, so one trapezoid has half of $(b_1 + b_2)h$.

{{figure:doubling}}

When the diagonals are perpendicular, they cut the quadrilateral into four right triangles whose legs are pieces of the diagonals. If one diagonal is split into $p$ and $q$ and the other into $r$ and $s$, the four areas add to $$\frac12(pr + ps + qr + qs) = \frac12(p + q)(r + s) = \frac12d_1d_2.$$

## Useful observations
- In a trapezoid $ABCD$ with $AB \parallel CD$, the diagonals cross at a point $O$ that divides each of them in the ratio of the parallel sides: triangles $OAB$ and $OCD$ are similar, because the parallel sides make their angles equal, with ratio $\frac{AB}{CD}$.
- The two triangles along the legs, $OBC$ and $ODA$, always have equal areas, because triangles $ABC$ and $ABD$ share the base $AB$ and the same height, and removing $OAB$ from each leaves them.

{{figure:diagonals}}

- If the two similar triangles have areas $X$ and $Y$, each leg triangle has area $\sqrt{XY}$, so the whole trapezoid is $X + Y + 2\sqrt{XY} = (\sqrt X + \sqrt Y)^2$.
- For a trapezoid whose height is not given, perpendiculars from the ends of the shorter base make right triangles at the ends; in an isosceles trapezoid each overhang is half the difference of the bases, and the [[pythagorean-theorem|Pythagorean Theorem]] gives the height.
- The lengths of the midline and of the segment through the diagonals' crossing are on [[trapezoid-special-segments|their own card]].
- A rhombus has an inscribed circle, and its area is the inradius times half its perimeter, so with side $s = \frac12\sqrt{d_1^2 + d_2^2}$ the inradius is $r = \frac{d_1d_2}{4s}$.

## Applications
Areas of trapezoids, rhombi, and kites, and the pieces cut by the diagonals of a trapezoid.

## Contest profile
Most trapezoid problems turn on the diagonal similarity, or on dropping two heights to make right triangles at the ends and finishing with the Pythagorean Theorem; AIME problems combine them with an equation.
`,

"quadrilateral-diagonal-area": String.raw`
## Key forms
- $A = \frac12 d_1d_2\sin\theta$ — the area of any quadrilateral from its diagonals $d_1$, $d_2$ and the angle $\theta$ between them
- $A \le \frac12 d_1d_2$ — with equality exactly when the diagonals are perpendicular, as in a rhombus or a kite
- $A = \frac12\left|\overrightarrow{AC} \times \overrightarrow{BD}\right|$ — the vector form, valid for a non-convex quadrilateral too

## Conditions
$\theta$ is the angle between the lines of the diagonals; its supplement gives the same sine, so either angle may be used.

## Why it works
Cut along both diagonals, and every piece is a triangle whose area the [[trig-area|sine area formula]] gives.

Let the diagonals cross at $P$, cutting them into pieces $a$ and $c$ along one and $b$ and $d$ along the other. Each of the four triangles at $P$ has two sides along the diagonals, with the angle $\theta$ or $180^\circ - \theta$ between them, and those two angles have the same sine. So the area is $$\tfrac12\sin\theta\,(ab + bc + cd + da) = \tfrac12\sin\theta\,(a + c)(b + d) = \tfrac12 d_1d_2\sin\theta.$$

{{figure:four}}

The formula also holds for a quadrilateral that is not convex, where one diagonal lies outside it: in vectors the area is half the cross product of the diagonals.

## Useful observations
- Among quadrilaterals with given diagonals, the area is largest, $\frac12d_1d_2$, when the diagonals are perpendicular, which is how many maximization problems end.
- For a cyclic quadrilateral both diagonals are [[chord-length|chords]], and the [[law-of-cosines|Law of Cosines]] on the small triangles often supplies the angle between them.
- A kite drawn from [[abs-value-relations|absolute values]] has perpendicular diagonals, so its area is $\frac12d_1d_2$ at once.

## Applications
Areas of quadrilaterals given both diagonals and the angle between them, and maximum areas with fixed diagonals.

## Contest profile
Usually one step inside an AIME problem about a cyclic or perpendicular-diagonal quadrilateral, after something else has produced the diagonals.
`,

"regular-polygon-area": String.raw`
## Key forms
- $A = \frac12 ap$ — half the apothem $a$ times the perimeter $p = ns$
- $A = \frac12 nR^2 \sin\frac{360^\circ}{n}$ — in terms of the circumradius $R$
- $R^2 = a^2 + \left(\frac s2\right)^2$ — the right triangle tying the three lengths together

## Conditions
The polygon is regular with $n$ sides of length $s$; the apothem is the distance from the center to a side, the radius of the inscribed circle.

## Why it works
Lines from the center to the vertices cut the polygon into $n$ congruent isosceles triangles, and every formula is the total area of those triangles.

Each triangle has base $s$ and height $a$, so its area is $\frac12sa$, and the $n$ of them give $\frac12nsa = \frac12ap$. Each triangle also has two sides $R$ with the angle $\frac{360^\circ}{n}$ between them, so by [[trig-area|the sine area formula]] its area is $\frac12R^2\sin\frac{360^\circ}{n}$, which gives the second form.

The three lengths are tied by one right triangle, from the center to the middle of a side and on to a vertex: $$R^2 = a^2 + \left(\tfrac s2\right)^2.$$ So the ring between the circumcircle and the incircle has area $\pi(R^2 - a^2) = \frac{\pi s^2}{4}$, whatever $n$ is.

{{figure:radii}}

## Useful observations
- An apothem or an inscribed circle calls for $\frac12ap$, and a circumradius calls for the sine form.
- [[regular-hexagon-area|Hexagons]], [[equilateral-triangle-facts|equilateral triangles]], [[regular-octagon|octagons]], and [[regular-dodecagon|dodecagons]] have their own cards, which are the cases $n = 6$, $n = 3$, $n = 8$, and $n = 12$.

## Applications
Areas of regular polygons from a side, an apothem, or a circumradius, and the area between a circle and an inscribed or circumscribed polygon.

## Contest profile
Octagons and dodecagons are the common cases on MATHCOUNTS and AMC 10; harder problems pair it with the shoelace formula or a circular segment.
`,

"clock-angle": String.raw`
## Key forms
- $\theta = |30H - 5.5M|^\circ$ — the angle between the hands at $H$ hours and $M$ minutes; replace $\theta$ by $360^\circ - \theta$ if it exceeds $180^\circ$
- $6^\circ$ per minute — the speed of the minute hand
- $0.5^\circ$ per minute — the speed of the hour hand
- $5.5^\circ$ per minute — the speed of the minute hand relative to the hour hand

## Conditions
Time is read as $H$ hours $M$ minutes on a $12$-hour clock, with $H$ from $0$ to $11$; angles are measured as the smaller gap between the hands.

## Why it works
The minute hand moves $360^\circ$ per hour, which is $6^\circ$ per minute, and the hour hand moves $30^\circ$ per hour, which is $0.5^\circ$ per minute. At $H{:}M$ the hour hand sits at $30H + 0.5M$ degrees from $12$ and the minute hand at $6M$ degrees, and subtracting gives $|30H - 5.5M|$.

## Useful observations
- The hands are together when $30H - 5.5M = 0$, that is, at $M = \frac{60H}{11}$ minutes past hour $H$; overlaps are $\frac{720}{11}$ minutes apart, $22$ times in a day.
- The hands are opposite when $30H - 5.5M = \pm 180$, and perpendicular when it is $\pm 90$ or $\pm 270$; each is a linear equation in $M$.
- The relative-speed view, $5.5^\circ$ per minute, answers every variant: how often the hands align, and the times at which they are mirror images across the vertical.

## Applications
Angles between the hands, and the times at which the hands are together, opposite, or perpendicular.

## Contest profile
A MATHCOUNTS staple, usually with one more step of arithmetic than a direct substitution.
`,

"triangle-area-standard": String.raw`
## Key forms
- $A = \frac12 bh$ — half the base times the height, where the height is the perpendicular distance from the opposite vertex to the line of the base
- $h = \frac{2A}{b}$ — each side has its own height, and the three heights are inversely proportional to the sides they meet
- triangles with equal bases and equal heights have equal areas, however different they look
- two triangles with the same apex and bases on one line have areas in the ratio of the bases

## Conditions
The height is measured to the line of the base. In an obtuse triangle the height to a side next to the obtuse angle falls outside the triangle, on the extension of the base.

## Why it works
A triangle is half of a parallelogram with the same base and height, and a parallelogram has the same area as a rectangle.

Take a second copy of the triangle, turn it half a turn, and fit it against the first along one of the other two sides. The two copies form a parallelogram with base $b$ and height $h$. Cutting a right triangle off one end of the parallelogram and moving it to the other end gives a $b \times h$ rectangle, so the parallelogram's area is $bh$, and each triangle has half of it.

{{figure:doubling}}

Only the base and the perpendicular height enter the formula. Sliding the top vertex along a line parallel to the base changes the triangle's shape but not its height, so it does not change the area. This is the shearing argument.

## Useful observations
- Any side can serve as the base; a triangle of area $84$ with a side of $14$ has height $12$ to that side, whatever its other sides are.
- If two triangles share a base and their third vertices lie on a line parallel to it, they have the same area.

{{figure:shear}}

- With a shared height instead, the areas are in the ratio of the bases, which is the method of [[area-method|area ratios from base ratios]].
- Computing one area two ways, with two different bases, finds an unknown height.
- With coordinates the [[shoelace-formula|shoelace formula]] is faster, and with two sides and the angle between them, [[trig-area|the sine formula]] is.

## Applications
Areas of triangles from a base and a height, area comparisons by shearing, and unknown heights from known areas.

## Contest profile
Almost never alone on the AIME: the height usually comes from the [[pythagorean-theorem|Pythagorean Theorem]] first, or the area becomes the base of a pyramid in a [[prism-pyramid-volumes|volume]] computation.
`,

"trig-area": String.raw`
## Key forms
- $A = \frac12 ab\sin C$ — half the product of two sides times the sine of the angle between them
- $\sin C = \sin(180^\circ - C)$ — an angle and its supplement give the same area
- $A = \frac{abc}{4R}$ — the form after substituting $\sin C = \frac{c}{2R}$

## Conditions
$C$ is the angle between sides $a$ and $b$. The formula holds for acute, right, and obtuse $C$.

## Why it works
The formula is base times height, with the height written in terms of the angle.

Take side $a = BC$ as the base and drop the altitude from $A$. The altitude, the side $b = CA$ and part of the line $BC$ form a right triangle with hypotenuse $b$ and angle $C$ at the vertex $C$, so the altitude, the side opposite that angle, has length $b\sin C$. Then $A = \frac12 \cdot a \cdot b\sin C$, which is [[triangle-area-standard|half the base times the height]] with nothing new in it.

{{figure:height}}

If $C$ is obtuse, the altitude from $A$ lands on the extension of $BC$ beyond $C$, and the right triangle contains the angle $180^\circ - C$ instead. The height is then $b\sin(180^\circ - C)$, which is the same number, since $\sin(180^\circ - C) = \sin C$. That is why one formula covers acute and obtuse angles alike, and why an angle and its supplement always give equal areas.

{{figure:obtuse}}

## Useful observations
- Special angles keep it clean: $30^\circ$, $90^\circ$, and $150^\circ$ give sines of $\frac12$, $1$, $\frac12$, while $60^\circ$ and $120^\circ$ both give $\frac{\sqrt3}{2}$.
- Two triangles with equal or supplementary angles at a shared vertex $A$, such as $AXY$ and $ABC$, have areas in the ratio of the products of their enclosing sides, which has [[shared-angle-area-ratio|its own card]].
- Substituting for $a$ and $b$ with the Law of Sines gives [[trig-area-circumradius|the all-angles form]].
- The area is largest when $C = 90^\circ$.

## Applications
Areas of triangles from two sides and the included angle, and area ratios for triangles that share an angle.

## Contest profile
One of the most-used area tools on the AMC and AIME, almost never alone: it turns angles into area once [[law-of-cosines|the Law of Cosines]] or [[angle-chasing|angle chasing]] has produced them, or compares areas of triangles that share an angle.
`,

"trig-area-circumradius": String.raw`
## Key forms
- $A = 2R^2\sin A\sin B\sin C$ — the area from the circumradius and the three angles, with no side length
- $\frac{2A}{R} = 4R\sin A\sin B\sin C$ — the same identity divided by $R$

## Conditions
$R$ is the circumradius, and $A$, $B$, $C$ are the angles of the triangle.

## Why it works
The Law of Sines says $a = 2R\sin A$ and $b = 2R\sin B$. Putting both into the sine area formula $\frac12ab\sin C$ gives $\frac12(2R\sin A)(2R\sin B)\sin C = 2R^2\sin A\sin B\sin C$. Every side length has been traded for an angle, which is why the result needs none.

## Useful observations
- It is the right formula only when the circumradius is known and the sides are not, which is uncommon; with side lengths, $\frac12ab\sin C$ or [[herons-formula|Heron's Formula]] is shorter.
- Divided by $R$, it gives $\frac{2A}{R} = 4R\sin A\sin B\sin C$, which is the perimeter of the [[orthic-triangle|orthic triangle]]; that is how the orthic perimeter is usually derived.

## Applications
Areas from angles and a circumradius, and identities between the area, the perimeter of the orthic triangle, and the angles.

## Contest profile
Rare as a working tool; it is kept for the orthic-triangle identity and for the occasional problem stated entirely in angles and a circumradius.
`,

"herons-formula": String.raw`
## Key forms
- $A = \sqrt{s(s - a)(s - b)(s - c)}$, $s = \frac{a + b + c}{2}$
- $16A^2 = (a + b + c)(-a + b + c)(a - b + c)(a + b - c)$
- using only the squares of the sides: $16A^2 = 2a^2b^2 + 2b^2c^2 + 2c^2a^2 - a^4 - b^4 - c^4$
- before factoring: $16A^2 = 4a^2b^2 - (a^2 + b^2 - c^2)^2$

## Conditions
$a$, $b$, $c$ are the sides of a triangle; the product is positive exactly when they satisfy the triangle inequality.

## Why it works
Start from half the product of two sides times the sine of the included angle, then remove the angle with the [[law-of-cosines|Law of Cosines]]; the algebra factors into the four terms of the formula.

By [[trig-area|the sine area formula]], $A = \frac12ab\sin C$, so $16A^2 = 4a^2b^2\sin^2 C = 4a^2b^2 - (2ab\cos C)^2$. The Law of Cosines says $2ab\cos C = a^2 + b^2 - c^2$, so $$16A^2 = (2ab)^2 - (a^2 + b^2 - c^2)^2.$$

That is a [[difference-of-squares|difference of squares]], and it factors as $$\left((a + b)^2 - c^2\right)\left(c^2 - (a - b)^2\right),$$ and each bracket is again a difference of squares, giving $(a + b + c)(a + b - c)(c + a - b)(c - a + b)$. With $a + b + c = 2s$ the four factors are $2s$, $2(s - c)$, $2(s - b)$, and $2(s - a)$.

## Useful observations
- The factors $s - a$, $s - b$, $s - c$ are the [[incircle-tangent-lengths|incircle tangent lengths]], so the formula reads $A^2 = s \cdot xyz$ in the tangent lengths $x$, $y$, $z$, which is why integer tangent lengths give tidy areas.
- A side tending to the sum of the other two sends one factor to $0$, so a degenerate triangle has area $0$, and the formula itself encodes the triangle inequality.
- For fixed perimeter the product $(s - a)(s - b)(s - c)$ is largest when the three are equal, by [[am-gm|AM-GM]], so the equilateral triangle has the largest area.
- Different triangles can share an area: $5, 5, 6$ and $5, 5, 8$ both give $12$, since swapping the base between $6$ and $8$ keeps the half-base and height as $3, 4$ or $4, 3$.

## Applications
Areas from three sides, and through the area, the inradius, the circumradius, and the altitudes.

## Contest profile
Supplies an area that the circumradius formula, the inradius formula, or similar triangles turn into the answer; triangles with whole-number sides and area, above all the $13$-$14$-$15$ triangle, recur constantly.
`,

"inradius-area": String.raw`
## Key forms
- $A = rs$, so $r = \frac As$
- right triangle with hypotenuse $c$: $r = s - c = \frac{a + b - c}{2}$
- excircle opposite $A$: $A = r_a(s - a)$
- $\frac1r = \frac1{h_a} + \frac1{h_b} + \frac1{h_c}$

## Conditions
Any triangle, or any polygon with an inscribed circle.

## Why it works
Joining the incenter to the three vertices cuts the triangle into three triangles, one on each side, and each has the inradius as its height.

The incircle touches each side at a point where the radius meets the side at a right angle, so the incenter $I$ is at distance $r$ from every side. Triangle $IBC$ therefore has base $a$ and height $r$, and area $\frac12ar$; likewise $ICA$ has area $\frac12br$ and $IAB$ has $\frac12cr$. The three fill the triangle, so $A = \frac12r(a + b + c) = rs$.

{{figure:dissection}}

The argument uses only that one point is at distance $r$ from every side, so it applies to any polygon with an inscribed circle. Joining the center to the $n$ vertices cuts the polygon into $n$ triangles, one on each side, and each has height $r$ over its side, so $$A = \tfrac12r(s_1 + s_2 + \cdots + s_n) = rs,$$ with $s$ half the perimeter, whatever the number of sides.

{{figure:polygon}}

For a polygon the circle is not automatic as it is for a triangle: a convex quadrilateral has one exactly when its opposite sides have equal sums, by [[pitots-theorem|Pitot's Theorem]]. For the excircle opposite $A$, the same three triangles fit together with $IBC$ subtracted, giving $A = r_a(s - a)$.

## Useful observations
- In a right triangle the incircle's contact points on the legs and the right-angle vertex form a square of side $r$, which with the [[incircle-tangent-lengths|incircle tangent lengths]] gives $r = s - c$.
- Each altitude satisfies $h_a = \frac{2A}{a} = \frac{2rs}{a}$, and adding the reciprocals gives $\frac1{h_a} + \frac1{h_b} + \frac1{h_c} = \frac1r$.
- Among triangles with a given perimeter, a larger area means a larger incircle, since $r = \frac As$ with $s$ fixed.
- Together with the [[circumradius-area|circumradius formula]], one area computation gives both radii, and $rR = \frac{abc}{4s}$.

## Applications
Inradii and exradii, altitudes, and incircle problems in triangles and tangential polygons.

## Contest profile
Nearly every incircle problem passes through it: compute the area, then divide by $s$. It often pairs with equal tangent lengths, which turn the contact points into lengths along the sides.
`,

"circumradius-area": String.raw`
## Key forms
- $A = \frac{abc}{4R}$, so $R = \frac{abc}{4A}$
- right triangle: $R = \frac c2$, half the hypotenuse
- $rR = \frac{abc}{4s}$

## Conditions
Any triangle.

## Why it works
The formula is the [[trig-area|sine area formula]] with the sine replaced by a length, using the fact that each side is a chord of the circumcircle.

The area is $\frac12ab\sin C$ by the sine area formula. The side $c$ is a chord of the circumcircle and the inscribed angle $C$ stands on it, so the [[law-of-sines|Extended Law of Sines]] gives $c = 2R\sin C$, that is, $\sin C = \frac{c}{2R}$. Substituting, $A = \frac12ab \cdot \frac{c}{2R} = \frac{abc}{4R}$.

{{figure:both-radii}}

## Useful observations
- The circumcenter lies on the perpendicular bisector of each side, at distance $\sqrt{R^2 - \frac{a^2}{4}}$ from side $a$, inside the triangle exactly when the triangle is acute.
- For a right triangle the hypotenuse is a diameter, so $R$ needs no area at all.
- In an isosceles triangle with legs $\ell$ and height $h$ to the base, the formula simplifies to $R = \frac{\ell^2}{2h}$.
- The $13$-$14$-$15$ triangle has $R = \frac{65}{8}$ and $r = 4$, values that recur often enough to recognize.

## Applications
Circumradii from three sides, distances from the circumcenter to the sides, and scale factors between a triangle and its circumcircle.

## Contest profile
Usually follows Heron's Formula, the classic way to hide $R$ behind three given sides; the circumradius also serves as the scale factor of a homothety.
`,

"right-triangle-inradius": String.raw`
## Key forms
- $r = \frac{a + b - c}{2}$ — the inradius of a right triangle with legs $a$, $b$ and hypotenuse $c$
- $R = \frac c2$ — the circumradius, since the hypotenuse is a diameter
- $a + b = 2r + 2R$ — the legs add to twice the inradius plus twice the circumradius
- $r\sqrt2$ — the distance from the incenter to the right-angle vertex

## Conditions
The triangle has a right angle; $a$ and $b$ are the legs and $c$ the hypotenuse.

## Why it works
The tangent lengths from the right-angle vertex to the incircle are both $r$, since the incircle together with the two legs and the radii to the touch points makes an $r \times r$ square in the corner. The tangent lengths from the other two vertices add up with those to the hypotenuse, so $c = (a - r) + (b - r)$, giving $r = \frac{a + b - c}{2}$. Thales' Theorem gives $R = \frac c2$, since the hypotenuse subtends a right angle and is therefore a diameter.

## Useful observations
- The inradius needs no area: it comes from the three sides at once.
- The integer right triangles $(3, 4, 5)$, $(5, 12, 13)$, and $(8, 15, 17)$ have $r = 1$, $2$, and $3$.
- The corner square also gives the distance from the incenter to the right-angle vertex, $r\sqrt2$, as its diagonal.
- The relation $a + b = 2r + 2R$ turns a question about $r$ and $R$ into one about the legs and back.

## Applications
Circles inscribed in right triangles, and relations between the inradius, the circumradius, and the legs.

## Contest profile
A circle inscribed in a right triangle is an AMC evergreen, usually one step inside a longer computation.
`,

"incircle-tangent-lengths": String.raw`
## Key forms
- $AE = AF = s - a$, $\;BD = BF = s - b$, $\;CD = CE = s - c$
- excircle opposite $A$: tangent length $s$ from $A$, and its touch point on $BC$ is at distance $s - c$ from $B$
- right angle at $C$: $r = s - c$

## Conditions
Any triangle; $s$ is the semiperimeter.

## Why it works
The two tangent segments from a point outside a circle are equal, by symmetry across the line through the point and the center. Label the common lengths from $A$, $B$, $C$ as $x$, $y$, $z$. Then $y + z = a$, $x + z = b$, and $x + y = c$. Adding all three gives $2(x + y + z) = 2s$, so $x + y + z = s$, and subtracting each equation gives $x = s - a$, $y = s - b$, $z = s - c$.

For the excircle opposite $A$, the tangent lengths from $A$ to the two extended sides are equal, and together they cover $AB + BD' + D'C + CA$ with $BD'$ and $D'C$ matching tangents from $B$ and $C$, which is the whole perimeter, so each is $s$.

## Useful observations
- The incircle and the $A$-excircle touch $BC$ at points symmetric about its midpoint, since one is $s - b$ from $B$ and the other $s - b$ from $C$.
- Sides and tangent lengths determine each other: $a = (s - b) + (s - c)$, so data about touch points converts directly into sides.
- The distance between the touch points of the incircle and an excircle on the same side is $|b - c|$.
- [[herons-formula|Heron's Formula]] in tangent lengths reads $A^2 = (x + y + z)xyz$.

## Applications
Touch points of incircles and excircles, reconstructing sides from contact data, and tangential polygons.

## Contest profile
An AIME workhorse: problems give distances from vertices to touch points and expect the sides to be rebuilt from them.
`,

"law-of-sines": String.raw`
## Key forms
- $\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$
- a chord of a circle of radius $R$ seen at inscribed angle $\theta$ has length $2R\sin\theta$
- $a : b : c = \sin A : \sin B : \sin C$

## Conditions
Any triangle, with $R$ its circumradius. Given two sides and an angle not between them, $\sin A = \sin(180^\circ - A)$ allows two triangles.

## Why it works
Every side of a triangle is a chord of its circumscribed circle, and a chord's length is fixed by the circle's diameter and the inscribed angle that stands on it.

Draw the circumcircle, with center $O$ and radius $R$, and look at side $a = BC$. Draw the diameter from $B$ through $O$, meeting the circle again at $A'$. The angle $BA'C$ stands on the same arc $BC$ as angle $A$, so by the Inscribed Angle Theorem it equals $A$ when $A$ is acute. Angle $BCA'$ is a right angle, because it stands on a diameter. So $BCA'$ is a right triangle with hypotenuse $2R$ and the side $a$ opposite the angle $A$, which says $$\sin A = \frac{a}{2R}.$$

{{figure:diameter}}

If $A$ is obtuse, $A'$ lands on the other arc and the inscribed angle there is $180^\circ - A$, which has the same sine. Nothing about side $a$ was special, so the same argument gives $\frac{b}{\sin B} = 2R$ and $\frac{c}{\sin C} = 2R$, and all three ratios agree.

## Useful observations
- Triangles inscribed in one circle share the same $2R$, so a single side and its opposite angle fix every chord in the figure.
- The larger side faces the larger angle, since sine increases on $(0^\circ, 90^\circ]$ and an obtuse angle is the largest in its triangle.
- The ratio form compares two cevians or two pieces of a side through sines alone, which is the Ratio Lemma $\frac{BD}{DC} = \frac{AB\sin\angle BAD}{AC\sin\angle DAC}$.
- With two sides and a non-included angle, a second triangle exists exactly when the given angle is acute and the side opposite it is shorter than the other given side but longer than the height.

## Applications
Triangles with known angles, chords of circles, and ratios of segments cut by cevians.

## Contest profile
A standard AIME trigonometry step, rarely the whole problem. Angle chasing usually produces the angles it converts into sides, and the sine area formula often finishes; the extended form handles several triangles sharing one circumcircle.
`,

"law-of-cosines": String.raw`
## Key forms
- $c^2 = a^2 + b^2 - 2ab\cos C$
- $\cos C = \frac{a^2 + b^2 - c^2}{2ab}$
- the two common angles, where the cosine is one half: $c^2 = a^2 + b^2 - ab$ for $C = 60^\circ$ and $c^2 = a^2 + b^2 + ab$ for $C = 120^\circ$
- $C$ is acute, right, or obtuse as $a^2 + b^2 - c^2$ is positive, zero, or negative

## Conditions
Any triangle; $C$ is the angle between sides $a$ and $b$, opposite $c$.

## Why it works
Put the triangle on coordinates with one side along an axis, and the third side is just the distance between two points you can write down.

Place $C$ at the origin and $B$ on the positive $x$-axis at $(a, 0)$. The vertex $A$ is at distance $b$ from $C$, in the direction making angle $C$ with that axis, so $A = (b\cos C, b\sin C)$. The side $c$ is the distance from $A$ to $B$, so $$c^2 = (a - b\cos C)^2 + (b\sin C)^2 = a^2 - 2ab\cos C + b^2(\cos^2 C + \sin^2 C),$$ and since $\cos^2 C + \sin^2 C = 1$ this is $a^2 + b^2 - 2ab\cos C$.

Nothing there assumed $C$ was acute. When $C$ is obtuse, $\cos C$ is negative, $A$ sits to the left of the $y$-axis, and the same algebra goes through with the signs taking care of themselves.

The figure shows what the correction measures. The altitude from $A$ lands $b\cos C$ along side $a$ from $C$, the shadow of side $b$ on side $a$, and the right triangle next to $B$ has legs $a - b\cos C$ and $b\sin C$ with hypotenuse $c$. So $2ab\cos C$ is twice side $a$ times that shadow.

{{figure:shadow}}

In vector language the same computation is one line: with $\vec u = \overrightarrow{CB}$ and $\vec v = \overrightarrow{CA}$, $$c^2 = |\vec u - \vec v|^2 = |\vec u|^2 + |\vec v|^2 - 2\,\vec u \cdot \vec v,$$ and the [[vector-dot-product|dot product]] $\vec u \cdot \vec v$ is exactly $ab\cos C$.

## Useful observations
- Two triangles on either side of a shared segment with supplementary angles give two expressions for that segment differing only in the sign of one cosine, so adding them with suitable weights cancels the angle. In a cyclic quadrilateral this solves the diagonal from the four sides, and on a cevian it is [[stewarts-theorem|Stewart's Theorem]].
- Given two sides and the angle opposite one of them, the law is a quadratic in the third side, so it can have two positive roots, the ambiguous case seen through algebra.
- The shape of a triangle is settled by signs alone: a triangle with sides $a \le b \le c$ is obtuse exactly when $c^2 \gt a^2 + b^2$.
- In a triangle with a $60^\circ$ or $120^\circ$ angle the cosine is $\pm\frac12$, which keeps integer sides integral and makes such triangles common in equilateral configurations.

{{figure:diagonal}}

## Applications
Triangles given by three sides or by two sides and an angle, diagonals of quadrilaterals, and the acute or obtuse type of a triangle.

## Contest profile
Never the whole problem. It converts a configuration into numbers once something else has produced the sides, most often alongside the sine area formula or in equilateral settings; the cyclic-quadrilateral diagonal is a recurring AIME shape.
`,

"law-cosines-60-120": String.raw`
## Key forms
- $c^2 = a^2 + b^2 - ab$ — the Law of Cosines at $C = 60^\circ$
- $c^2 = a^2 + b^2 + ab$ — at $C = 120^\circ$
- $c = a\sqrt3$ — the side opposite $120^\circ$ when the two enclosing sides are equal, $a = b$

## Conditions
$C$ is the angle between the sides $a$ and $b$, and $c$ is the side opposite it.

## Why it works
Substituting $\cos 60^\circ = \frac12$ and $\cos 120^\circ = -\frac12$ into $c^2 = a^2 + b^2 - 2ab\cos C$ turns the cross term into $\mp ab$.

The $120^\circ$ form also has a picture. Extend the side $a$ past the $120^\circ$ vertex and drop the altitude from the opposite vertex onto that extension.

{{figure:extended}}

The small triangle outside has a $60^\circ$ angle, so it is a [[special-right-triangles|30-60-90 triangle]] with legs $\frac b2$ and $\frac{\sqrt3}{2}b$. The big right triangle then has legs $a + \frac b2$ and $\frac{\sqrt3}{2}b$, so $$c^2 = \left(a + \tfrac b2\right)^2 + \tfrac34b^2 = a^2 + ab + b^2.$$

## Useful observations
- The $+ab$ form belongs wherever a $120^\circ$ angle appears: at the center of an equilateral triangle, between two sides of a regular hexagon, and at the [[fermat-point|Fermat point]], where the three segments to the vertices meet at $120^\circ$ and give three applications at once.
- The $-ab$ form belongs at a vertex of an equilateral triangle, where a segment to a point on the opposite side makes a $60^\circ$ angle with the side.
- The two forms differ only in the sign of $ab$ because $\cos(180^\circ - \theta) = -\cos\theta$, so a triangle and the triangle with the supplementary angle share their enclosing sides.
- A chord subtending $120^\circ$ in a circle of radius $R$ has $c^2 = R^2 + R^2 + R^2$, so its length is $R\sqrt3$.

## Applications
Equilateral triangles with a point on a side, regular hexagons, and any figure with $60^\circ$ or $120^\circ$ angles.

## Contest profile
Seldom the whole problem: the partners include the Fermat point, [[chord-length|chord lengths]], and [[circular-segment|circular segments]]. The $3$-$5$-$7$ triangle is to $120^\circ$ what $3$-$4$-$5$ is to $90^\circ$.
`,
"law-of-cosines-special-triangles": String.raw`
## Key forms
- $c^2 = a^2 + b^2 - ab$, $\ a^2 + b^2 + ab$, $\ a^2 + b^2 + \sqrt2\,ab$, $\ a^2 + b^2 + \sqrt3\,ab$ — the Law of Cosines at $60^\circ$, $120^\circ$, $135^\circ$, and $150^\circ$
- with simple sides around such an angle the third side is simple too, which gives the short list of triangles in the table

## Conditions
Each entry lists the two sides around the special angle, and the side it names is the one opposite that angle. In every triangle on the list the special angle is opposite the $\sqrt7$, $7$, $\sqrt5$, or $13$.

## Why it works
Each triangle is the Law of Cosines at an angle whose cosine is a simple number, so the cross term is a simple multiple of $ab$, and simple sides give a simple third side.

With $\cos C$ equal to $\frac12$, $-\frac12$, $-\frac{\sqrt2}{2}$, or $-\frac{\sqrt3}{2}$, the Law of Cosines $c^2 = a^2 + b^2 - 2ab\cos C$ becomes $$c^2 = a^2 + b^2 - ab, \quad a^2 + b^2 + ab, \quad a^2 + b^2 + \sqrt2\,ab, \quad a^2 + b^2 + \sqrt3\,ab$$ at $60^\circ$, $120^\circ$, $135^\circ$, and $150^\circ$. Sides $1$ and $2$ at $120^\circ$ give $1 + 4 + 2 = 7$; sides $1$ and $\sqrt2$ at $135^\circ$ give $1 + 2 + 2 = 5$; sides $1$ and $\sqrt3$ at $150^\circ$ give $1 + 3 + 3 = 7$.

The $60^\circ$ and $120^\circ$ triangles come in pairs. Cut an equilateral triangle of side $b$ off a triangle with sides $a$ and $b$ around a $60^\circ$ angle, as in the figure at the top. What is left has sides $a - b$ and $b$ around an angle of $120^\circ$, and the same third side, because $$(a - b)^2 + b^2 + (a - b)b = a^2 + b^2 - ab.$$ So $5$-$7$-$8$ at $60^\circ$ contains $3$-$5$-$7$ at $120^\circ$, and $1$-$3$-$\sqrt7$ contains $1$-$2$-$\sqrt7$.

## Useful observations
Each row gives the two sides around the special angle and the side opposite it.

| Angle | Sides around it | Third side |
| --- | --- | --- |
| $120^\circ$ | $1$, $2$ | $\sqrt7$ |
| $120^\circ$ | $3$, $5$ | $7$ |
| $120^\circ$ | $7$, $8$ | $13$ |
| $60^\circ$ | $2$, $3$ | $\sqrt7$ |
| $60^\circ$ | $3$, $8$ | $7$ |
| $60^\circ$ | $5$, $8$ | $7$ |
| $135^\circ$ | $1$, $\sqrt2$ | $\sqrt5$ |
| $150^\circ$ | $1$, $\sqrt3$ | $\sqrt7$ |

- The rest of a triangle's measurements follow quickly. In the $3$-$5$-$7$ triangle the area is $\frac12 \cdot 3 \cdot 5\sin 120^\circ = \frac{15\sqrt3}{4}$ and the circumradius is $\frac{7}{2\sin 120^\circ} = \frac{7}{\sqrt3}$.
- They usually come from a point on a side of an equilateral triangle. If the side is $s$ and the point is $m$ from one vertex, its distance $d$ to the opposite vertex satisfies $d^2 = s^2 + m^2 - sm$: side $3$ with $m = 1$ gives $\sqrt7$, and side $8$ with $m = 3$ or $m = 5$ gives $7$.

{{figure:cevian}}

- Regular hexagons, whose angles are $120^\circ$, and three segments from a point at mutual $120^\circ$ angles produce the $120^\circ$ versions.
- Integer triangles with a $60^\circ$ or $120^\circ$ angle are called Eisenstein triples, and the pairing above generates them: $(3, 5, 7)$, $(7, 8, 13)$, and $(5, 16, 19)$ at $120^\circ$, and $(3, 8, 7)$, $(5, 8, 7)$, $(7, 15, 13)$, and $(8, 15, 13)$ at $60^\circ$, with the special angle between the first two sides.
- One more triangle is worth knowing for a different reason: in the $4$-$5$-$6$ triangle the largest angle is exactly twice the smallest. The angle opposite $4$ has cosine $\frac34$, the angle opposite $6$ has cosine $\frac18$, and $2\left(\frac34\right)^2 - 1 = \frac18$.

## Applications
Recognizing a hidden equilateral triangle, regular hexagon, or $120^\circ$ configuration from the side lengths alone.

## Contest profile
This card is the short list of triangles that [[law-cosines-60-120|the Law of Cosines at 60° and 120°]] produce, worth recognizing the way the 3-4-5 right triangle is. Two of them recur far more than the rest. For the right-angled cases, see [[special-right-triangles|special right triangles]].
`,

"angle-bisector-theorem": String.raw`
## Key forms
- $\frac{BD}{DC} = \frac{AB}{AC}$, so $BD = \frac{ac}{b + c}$ and $DC = \frac{ab}{b + c}$
- external bisector: $\frac{BD'}{D'C} = \frac{AB}{AC}$ with $D'$ outside segment $BC$, $BD' = \frac{ac}{|b - c|}$
- incenter: $\frac{AI}{ID} = \frac{b + c}{a}$

## Conditions
$D$ is where the internal bisector from $A$ meets $BC$. The external bisector meets line $BC$ only when $AB \ne AC$, beyond the endpoint on the shorter side.

## Why it works
Triangles $ABD$ and $ACD$ have the same height from $A$, and the bisector gives them equal angles at $A$, so their areas can be compared in two ways.

With bases on line $BC$, the two triangles share the height from $A$, so their areas are in the ratio of their bases, $BD : DC$. With [[trig-area|the sine area formula]] instead, $[ABD] = \frac12 \cdot AB \cdot AD\sin\frac A2$ and $[ACD] = \frac12 \cdot AC \cdot AD\sin\frac A2$, because the bisector gives both triangles the same angle $\frac A2$ at $A$ and the same side $AD$. So the areas are also in the ratio $AB : AC$, and the two ratios must be equal.

{{figure:areas}}

The external bisector works the same way. Its two triangles $ABD'$ and $ACD'$ still share the height from $A$, and their angles at $A$ are supplementary, which have the same sine.

A second proof needs no trigonometry. Reflect $B$ across line $AD$ to $B'$. The bisector makes equal angles with $AB$ and $AC$, so the reflection carries ray $AB$ onto ray $AC$: $B'$ lies on $AC$ with $AB' = AB$, and $AD$ is the perpendicular bisector of $BB'$, through its midpoint $M$. It is the same reflection that [[perp-to-angle-bisector|the perpendicular to an angle bisector]] is built on.

{{figure:reflect}}

Now draw the line through $B'$ parallel to $BC$, meeting $AD$ at $E$. A half-turn about $M$ swaps $B$ and $B'$, maps line $AD$ to itself and turns line $BC$ into the parallel through $B'$, so it carries $D$ to $E$, and $B'E = BD$. Since $B'E \parallel DC$, triangles $AB'E$ and $ACD$ are similar, and $$\frac{BD}{DC} = \frac{B'E}{DC} = \frac{AB'}{AC} = \frac{AB}{AC}.$$

## Useful observations
- Applying the theorem twice, at $A$ and then at $B$ in triangle $ABD$, gives the incenter's position on the bisector, $\frac{AI}{ID} = \frac{AB}{BD} = \frac{b + c}{a}$.
- The internal and external feet $D$ and $D'$ divide $BC$ in the same ratio, so $B$, $C$, $D$, $D'$ form a [[harmonic-bundle|harmonic range]], and the two bisectors are perpendicular.
- The points $P$ with $\frac{PB}{PC} = \frac{AB}{AC}$ form a circle through $A$, $D$, and $D'$ with diameter $DD'$, the circle of Apollonius.
- In [[mass-points|mass points]] the theorem places masses proportional to the opposite adjacent sides, $b$ at $B$ and $c$ at $C$.

## Applications
Ratios on a side cut by a bisector, the position of the incenter, and harmonic ranges.

## Contest profile
Constant from AMC 10 through AIME, rarely alone: it supplies a ratio that power of a point, similar triangles, mass points, or Stewart's Theorem turns into an answer. The incenter ratio $(b + c) : a$ is often the real question.
`,

"angle-bisector-length": String.raw`
## Key forms
- $d^2 = ab - mn$ — the bisector of angle $C$, where $a$ and $b$ are the sides at $C$ and $m$, $n$ are the segments it cuts the opposite side into
- $d = \dfrac{2ab\cos(C/2)}{a + b}$ — the same length in terms of the angle
- $d'^2 = m'n' - ab$ — the external bisector, where $m'$, $n'$ are the distances from its foot $D'$ to the other two vertices
- $d' = \dfrac{2ab\sin(C/2)}{|a - b|}$ — the external bisector in terms of the angle

## Conditions
The external bisector has a length only when $a \ne b$: if $a = b$ it runs parallel to the opposite side and never meets it.

## Why it works
Apply [[stewarts-theorem|Stewart's Theorem]] with the segments from the [[angle-bisector-theorem|Angle Bisector Theorem]], $m = \frac{ac}{a + b}$ and $n = \frac{bc}{a + b}$ for the opposite side $c$, and the algebra collapses to $d^2 = ab - mn$.

A second proof uses the circumcircle. Extend the bisector $CD$ to meet the circle again at $E$. Triangles $CAD$ and $CEB$ are similar, so $CA \cdot CB = CD \cdot CE$, that is $ab = d \cdot CE$. The power of $D$ gives $mn = CD \cdot DE = d(CE - d) = ab - d^2$, so $d^2 = ab - mn$.

The same picture explains the external bisector. Its foot lies outside the circle, so the power of the point reverses the subtraction and $d'^2 = m'n' - ab$.

## Useful observations
- The internal bisector is always shorter than $\sqrt{ab}$, since $mn$ is positive.
- At $C = 120^\circ$ the trigonometric form gives $d = \frac{2ab \cdot \frac12}{a + b} = \frac{ab}{a + b}$, half the harmonic mean of the two sides.
- The internal and external forms are not one formula in disguise, so keep them apart: which side of the circle the foot lies on decides the sign.

## Applications
Bisector lengths from the sides, and a side from a given bisector length.

## Contest profile
Problems give two sides and the bisector length and ask for the third side, which the formula turns into one quadratic. The $120^\circ$ case appears in olympiad warm-ups.
`,

"stewarts-theorem": String.raw`
## Key forms
- $b^2 m + c^2 n = a(d^2 + mn)$, with $m = BD$ next to $c = AB$ and $n = DC$ next to $b = CA$
- median ($m = n = \frac a2$): $d^2 = \frac{2b^2 + 2c^2 - a^2}{4}$
- angle bisector ($m = \frac{ac}{b + c}$, $n = \frac{ab}{b + c}$): $d^2 = bc - mn = bc\left[1 - \left(\frac{a}{b + c}\right)^2\right]$
- as a weighted average: $D = \frac{n}{a}B + \frac{m}{a}C$ gives $d^2 = \frac{n}{a}c^2 + \frac{m}{a}b^2 - mn$

## Conditions
$D$ lies on segment $BC$. Each side's square is multiplied by the piece of $BC$ at the far end from it.

## Why it works
The cleanest view treats $D$ as a weighted average of $B$ and $C$. For weights $u + v = 1$ and any point $A$, expanding $|A - (uB + vC)|^2$ gives the identity $$|A - (uB + vC)|^2 = u|A - B|^2 + v|A - C|^2 - uv|B - C|^2,$$ the same identity that says a variance is the mean square minus the square of the mean. Here $D = \frac naB + \frac maC$, so $d^2 = \frac na c^2 + \frac ma b^2 - \frac{mn}{a^2}a^2$, and multiplying by $a$ gives the theorem.

{{figure:split}}

The classical proof uses the [[law-of-cosines|Law of Cosines]] twice. With $\theta = \angle ADB$, triangle $ABD$ gives $c^2 = m^2 + d^2 - 2md\cos\theta$, and triangle $ADC$, whose angle at $D$ is $180^\circ - \theta$, gives $b^2 = n^2 + d^2 + 2nd\cos\theta$. Multiplying by $n$ and by $m$ and adding cancels the cosine: $c^2n + b^2m = mn(m + n) + d^2(m + n)$, and $m + n = a$.

## Useful observations
- For a median the theorem is [[apollonius-theorem|Apollonius's Theorem]], $b^2 + c^2 = 2d^2 + \frac{a^2}{2}$, the parallelogram law for the parallelogram with diagonals $a$ and $2d$.
- For an angle bisector the [[angle-bisector-theorem|Angle Bisector Theorem]] makes $b^2m + c^2n = abc$, so the length collapses to $d^2 = bc - mn$; the [[angle-bisector-length|angle bisector length]] card has the cosine form.
- The theorem runs backwards: a known cevian length is one equation for where the cevian lands, or for an unknown side.
- The weighted-average identity holds for any point $A$, not only a vertex, and in any dimension, which is why the same formula measures distances from a point to a point dividing a segment in space.

## Applications
Lengths of medians, angle bisectors, and other cevians, and unknown sides from a known cevian.

## Contest profile
An AIME tool, rarely alone. Its most frequent partner is power of a point, when a cevian is extended to the circumcircle; angle bisectors and Heron's Formula are the other regulars, and it gives lengths where mass points give only ratios.
`,

"cevas-theorem": String.raw`
## Key forms
- $\dfrac{AF}{FB} \cdot \dfrac{BD}{DC} \cdot \dfrac{CE}{EA} = 1$ — for cevians $AD$, $BE$, $CF$ through a common point, ratios taken in order around the triangle
- conversely, if the product is $1$ for points $D$, $E$, $F$ on the three sides, the cevians are concurrent
- with directed segments the product is $+1$, which also covers cevians that are parallel

## Conditions
$D$, $E$, $F$ lie on the sides $BC$, $CA$, $AB$, different from the vertices. All three ratios are taken in the same direction around the triangle, $A \to F \to B \to D \to C \to E \to A$.

## Why it works
Each ratio along a side is a ratio of two triangles with a common apex, and for a point $P$ on the cevian the triangles can be taken from $P$ instead.

For $D$ on $BC$ and $P$ on $AD$, $$\frac{BD}{DC} = \frac{[ABD]}{[ACD]} = \frac{[PBD]}{[PCD]},$$ by [[cevian-area-ratio|same-height area ratios]] from $A$ and from $P$. Subtracting the second pair from the first leaves the same ratio, $\frac{BD}{DC} = \frac{[ABP]}{[ACP]}$, the two triangles on either side of $AP$.

{{figure:areas}}

In the same way $\frac{CE}{EA} = \frac{[BCP]}{[BAP]}$ and $\frac{AF}{FB} = \frac{[CAP]}{[CBP]}$. In the product each of $[ABP]$, $[BCP]$, and $[CAP]$ appears once above and once below, so the product is $1$.

For the converse, suppose the product is $1$ and let $BE$ and $CF$ meet at $P$. The line $AP$ meets $BC$ at a point $D'$ whose product is also $1$, so $\frac{BD'}{D'C} = \frac{BD}{DC}$ and $D' = D$.

## Useful observations
- Medians, angle bisectors, and altitudes pass the test at once, which proves each set concurrent: for the bisectors the [[angle-bisector-theorem|Angle Bisector Theorem]] makes the product $\frac ba \cdot \frac cb \cdot \frac ac = 1$.
- Taking the ratios in different directions around the triangle inverts the product, so the direction is the thing to check first.
- When the cevians are given by angles rather than points, use the trigonometric form; for lengths along the cevians themselves, [[mass-points|mass points]] read off every ratio at once.

## Applications
Proving three cevians concurrent, and finding the third ratio from the other two.

## Contest profile
AIME problems typically give two of the ratios and ask for the third, or give a sum of ratios through the common point and ask for their product. Partners include [[area-method|area ratios]] around the common point and [[stewarts-theorem|Stewart's Theorem]] for the lengths.
`,

"menelaus-theorem": String.raw`
## Key forms
- $\dfrac{AF}{FB} \cdot \dfrac{BD}{DC} \cdot \dfrac{CE}{EA} = 1$ — for a line meeting $BC$, $CA$, $AB$ at $D$, $E$, $F$, with unsigned lengths
- the same product is $-1$ with directed segments
- conversely, three such points with product $1$ (and an even number on the sides themselves) are collinear

## Conditions
The line does not pass through a vertex. If it is parallel to a side, the point on that side is at infinity and its ratio is taken as $1$. Of the three points, either one or all three lie outside the sides, never exactly two.

## Why it works
Drop perpendiculars from $A$, $B$, $C$ to the line, of lengths $d_A$, $d_B$, $d_C$. The right triangles at $F$ are similar, so $\frac{AF}{FB} = \frac{d_A}{d_B}$, and likewise $\frac{BD}{DC} = \frac{d_B}{d_C}$ and $\frac{CE}{EA} = \frac{d_C}{d_A}$. The product telescopes to $1$.

The $-1$ for [[directed-lengths|directed lengths]] records the sign: a line cuts either one or all three side lines outside the segments, which makes an odd number of the three ratios negative.

## Useful observations
- Menelaus' Theorem is the collinearity counterpart of Ceva's: three points on a line instead of three cevians through a point.
- It reaches ratios that Ceva cannot, because the points may lie outside the segments.
- The skill is choosing the triangle: pick the one whose three side lines the known line crosses, and a chain of intersection points often needs two applications.
- [[mass-points|Mass points]] with a negative mass are Menelaus in disguise.
- The unsigned converse needs the count of points outside the sides; the directed form needs nothing. The three midpoints show why: their unsigned product is $1$, yet they are not collinear.

## Applications
Ratios along a cevian cut by a line, and collinearity of three points on the side lines of a triangle.

## Contest profile
The professional's tool for AIME problems where a line cuts across a cevian configuration: two applications often replace a page of coordinates.
`,

"apollonius-theorem": String.raw`
## Key forms
- $b^2 + c^2 = 2m_a^2 + \dfrac{a^2}{2}$ — the median $m_a$ to side $a$
- $m_a = \dfrac12\sqrt{2b^2 + 2c^2 - a^2}$ — the median from the sides
- $m_a^2 + m_b^2 + m_c^2 = \dfrac34\left(a^2 + b^2 + c^2\right)$ — the three medians together
- $a^2 = \dfrac49\left(2m_b^2 + 2m_c^2 - m_a^2\right)$ — a side from the three medians

## Conditions
$a$, $b$, $c$ are the sides of a triangle and $m_a$ is the median from the vertex opposite $a$, ending at the midpoint of $a$.

## Why it works
The median splits the triangle into two triangles with the common side $m_a$ and supplementary angles at $M$, so the [[law-of-cosines|Law of Cosines]] in each gives two equations whose cosine terms cancel.

Let $\theta = \angle AMB$, so $\angle AMC = 180^\circ - \theta$, and write $m = m_a$, with $BM = MC = \frac a2$. The Law of Cosines in triangles $ABM$ and $ACM$ gives $$c^2 = m^2 + \tfrac{a^2}{4} - am\cos\theta, \qquad b^2 = m^2 + \tfrac{a^2}{4} + am\cos\theta,$$ and adding them gives $b^2 + c^2 = 2m^2 + \frac{a^2}{2}$.

The same statement is the parallelogram law for the parallelogram that doubling the median makes, $(2m_a)^2 + a^2 = 2b^2 + 2c^2$. In vectors from $A$, $2\vec{AM} = \vec{AB} + \vec{AC}$ and $\vec{CB} = \vec{AB} - \vec{AC}$, and adding $|\vec{AB} + \vec{AC}|^2$ to $|\vec{AB} - \vec{AC}|^2$ cancels the cross terms. It is also Stewart's Theorem with $m = n = \frac a2$.

Adding the three versions gives $2(a^2 + b^2 + c^2) = 2(m_a^2 + m_b^2 + m_c^2) + \frac12(a^2 + b^2 + c^2)$, which rearranges to the $\frac34$ relation. Solving the three versions together for $a^2$ gives the side-from-medians form.

## Useful observations
- A right triangle checks the formula: for sides $6$, $8$, $10$ the median to the hypotenuse has $2m^2 = 36 + 64 - 50$, so $m = 5$, half the hypotenuse.
- The medians determine the sides, and the side-from-medians form is the same relation with the roles of sides and medians exchanged, up to the factor $\frac49$.
- Doubling the median to complete a parallelogram is the picture behind every use of the theorem.

## Applications
Medians from the sides and sides from the medians, and any problem that gives two sides and the median to the third.

## Contest profile
Appears at AIME level, mostly as the one-line step that finishes a setup of two sides and the median to the third.
`,

"median-triangle-area": String.raw`
## Key forms
- $[ABC] = \dfrac43\,[\text{triangle with sides } m_a, m_b, m_c]$ — the area from the three medians
- the three medians of any triangle satisfy the triangle inequality, so they always form a triangle

## Conditions
$m_a$, $m_b$, $m_c$ are the lengths of the three medians of a triangle $ABC$.

## Why it works
Let $G$ be the centroid and $M$ the midpoint of $BC$, and reflect $G$ across $M$ to a point $P$, so $BGCP$ is a parallelogram.

The triangle $BGP$ in the figure has sides $BG = \frac23m_b$, $GP = 2GM = \frac23m_a$, and $BP = GC = \frac23m_c$. It is therefore the median triangle scaled by $\frac23$, with area $\frac49$ of the median triangle's. On the other hand $[BGP] = 2[BGM] = 2 \cdot \frac16[ABC] = \frac13[ABC]$, since $[BGM]$ is one sixth of the whole triangle. Equating, $\frac49T = \frac13[ABC]$, so $[ABC] = \frac43T$.

## Useful observations
- The area comes without solving for the sides, which would need the side-from-medians form on [[apollonius-theorem|the median-length card]] and then a square root.
- The factor $\frac23$ is the centroid's $2 : 1$ ratio, so the same picture shows $GM = \frac13m_a$ for each median.

## Applications
The area of a triangle given its three medians.

## Contest profile
A recurring AMC and AIME setup, "a triangle has medians of lengths ... find its area", answered in two lines.
`,

"rouths-theorem": String.raw`
## Key forms
- $\dfrac{[PQR]}{[ABC]} = \dfrac{(xyz - 1)^2}{(xy + y + 1)(yz + z + 1)(zx + x + 1)}$ — the inner triangle $PQR$ cut out by the three cevians
- $x = \dfrac{DC}{BD}$, $y = \dfrac{EA}{CE}$, $z = \dfrac{FB}{AF}$ — the ratios in which the cevians $AD$, $BE$, $CF$ cut the sides $BC$, $CA$, $AB$
- $xyz = 1$ makes the numerator $0$, which is Ceva's condition: the cevians are concurrent and the inner triangle collapses to a point

## Conditions
$D$, $E$, $F$ lie on the sides $BC$, $CA$, $AB$. The three ratios are taken in the same cyclic direction around the triangle, so the formula is unchanged when $(x, y, z)$ is cycled.

## Why it works
In [[barycentric-coordinates|barycentric coordinates]] with respect to $ABC$, the points are $D = (0 : x : 1)$, $E = (1 : 0 : y)$, and $F = (z : 1 : 0)$. A point of $AD$ has the form $(u : x : 1)$ and a point of $BE$ the form $(1 : v : y)$; these agree at $P = (1 : xy : y)$, and cycling the letters gives $Q = (z : 1 : yz)$ on $BE$ and $CF$, and $R = (zx : x : 1)$ on $CF$ and $AD$.

The area ratio of a triangle with these vertices is the determinant of their coordinate rows divided by the product of the row sums: $$\det\begin{pmatrix} 1 & xy & y \\ z & 1 & yz \\ zx & x & 1 \end{pmatrix} = (1 - xyz)^2, \qquad \text{row sums } xy + y + 1,\ yz + z + 1,\ zx + x + 1.$$ Dividing gives the formula.

## Useful observations
- For $x = y = z = 2$ the numerator is $(8 - 1)^2 = 49$ and each factor of the denominator is $4 + 2 + 1 = 7$, so the inner triangle is $\frac{49}{343} = \frac17$ of $ABC$. This is the one-seventh triangle.
- For $x = y = z = r$ the formula reduces to $\frac{(r - 1)^2}{r^2 + r + 1}$.
- A single case computed by [[mass-points|mass points]] checks an answer, and a problem with different ratios on each side is where the formula is worth having.

## Applications
Areas of the triangle formed by three cevians, and the ratios on a side from a given area.

## Contest profile
The one-seventh triangle recurs on contests as a standalone question. With unequal ratios it serves as a fast check on an answer found by mass points or Menelaus.
`,

"vivianis-theorem": String.raw`
## Key forms
- $d_1 + d_2 + d_3 = h$ — in an equilateral triangle with altitude $h$, the distances from a point to the three sides sum to $h$
- the same sum holds for every point of the plane, counting a distance as negative when the point is beyond that side
- $a\,d_a + b\,d_b + c\,d_c = 2[ABC]$ — the version for any triangle, of which Viviani is the case $a = b = c$

## Conditions
For the interior reading, the point lies inside the equilateral triangle. For the signed reading, a distance is positive when the point is on the same side of that line as the opposite vertex and negative when it is beyond.

## Why it works
Connect $P$ to the three vertices, splitting the equilateral triangle (side $s$) into three triangles with bases $s$ and heights $d_1, d_2, d_3$. Total area: $\frac{s}{2}(d_1 + d_2 + d_3) = \frac{s}{2}h$, so the distances sum to the altitude $h$.

Read the same decomposition with signed areas and it stops needing $P$ inside: $[PAB] + [PBC] + [PCA] = [ABC]$ holds for every point of the plane, so $d_1 + d_2 + d_3 = h$ does too. Outside the triangle there are two regions to picture: across one side, where that single distance turns negative, and past a vertex, where two of them do. The figure lets $P$ be dragged through both.

Nothing in the argument needs the sides to be equal either. On a general triangle the three pieces have bases $a$, $b$, $c$, so $a\,d_a + b\,d_b + c\,d_c = 2[ABC]$, a constant. Viviani is what that collapses to when the three bases are the same and the common factor cancels.

## Useful observations
- The sum of the distances from an interior point to all the sides of a regular $n$-gon is $n$ times the apothem, and the same constancy holds for equiangular polygons.
- On a scalene triangle the weighted form answers the same question, since $2[ABC]$ is computable from the side lengths alone.
- The three normalized distances are the point's [[barycentric-coordinates|barycentric coordinates]] in an equilateral triangle.

## Applications
Sums of distances from a point to the sides of an equilateral triangle or regular polygon, including points outside, and any point whose position is left unspecified.

## Contest profile
A quick AMC insight: the sum is constant, so compute it at the center or at a vertex.
`,

"euler-line-ratio": String.raw`
## Key forms
- $HG = 2\,GO$ — the orthocenter $H$, centroid $G$, and circumcenter $O$ are collinear, with $G$ one third of the way from $O$ to $H$
- $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$ and $\vec{OG} = \tfrac13\left(\vec{OA} + \vec{OB} + \vec{OC}\right)$ with $O$ as the origin
- $OH^2 = 9R^2 - (a^2 + b^2 + c^2) = R^2\left(1 - 8\cos A\cos B\cos C\right)$
- the nine-point center $N$ is the midpoint of $OH$, so $NG = \tfrac16 OH$

## Conditions
Any triangle that is not equilateral; for an equilateral triangle the three centers coincide and there is no line.

## Why it works
The [[homothety-monge|homothety]] centered at the centroid $G$ with factor $-\frac12$ sends each vertex to the midpoint of the opposite side. It therefore sends the orthocenter $H$, where the altitudes meet, to the circumcenter $O$, where the perpendicular bisectors meet, because the perpendicular bisectors of $ABC$ are the altitudes of the [[medial-triangle|medial triangle]]. A homothety of factor $-\frac12$ through $G$ means exactly $HG = 2GO$ with $H$, $G$, $O$ collinear.

The vector form comes from putting $O$ at the origin. For $H = A + B + C$, the vector $H - A = B + C$ is perpendicular to $B - C$, because $(B + C)\cdot(B - C) = |B|^2 - |C|^2 = 0$, and likewise at the other vertices, so $H$ lies on all three altitudes. Then $G = \frac13(A + B + C) = \frac13H$.

## Useful observations
- With the circumcenter as origin the centroid and orthocenter are the sum of the vertices over $3$ and the sum itself, so given any two of $O$, $G$, $H$ in coordinates the third is immediate.
- The two expressions for $OH^2$ turn a distance between centers into the sides or the angles.
- The midpoint of $OH$ is the center of the [[nine-point-circle|nine-point circle]], so $N$ is on the line too.

## Applications
Coordinates of one center from the other two, and distances between centers.

## Contest profile
AIME coordinate problems hand over two centers and ask for a distance or the third center; the ratio converts it at once.
`,

"euler-distance-theorem": String.raw`
## Key forms
- $OI^2 = R(R - 2r)$ — the squared distance from the circumcenter to the incenter
- $R \ge 2r$ — Euler's Inequality, with equality exactly for the equilateral triangle
- $OI_A^2 = R(R + 2r_a)$ — the same statement for the excenter opposite $A$

## Conditions
$O$ and $I$ are the circumcenter and incenter of a triangle with circumradius $R$ and inradius $r$.

## Why it works
The power of the incenter with respect to the circumcircle is $OI^2 - R^2$, which is negative because $I$ is inside. Extend $AI$ to meet the circumcircle again at $M$, the midpoint of arc $BC$. Then $IA \cdot IM = R^2 - OI^2$. Here $IA = \frac{r}{\sin(A/2)}$, and by the [[incenter-excenter-lemma|incenter-excenter lemma]] $IM = MB = 2R\sin\frac A2$, so the product is $2Rr$, and $R^2 - OI^2 = 2Rr$.

Since $OI^2 \ge 0$, the formula gives $R(R - 2r) \ge 0$, that is $R \ge 2r$, with equality exactly when $O = I$, which happens only for the equilateral triangle.

## Useful observations
- When two of $R$, $r$, $OI$ are given the third follows at once, which is how the formula usually appears.
- It is the starting point of many inequality problems in $R$ and $r$.
- The lemma used in the proof, that the arc midpoint is equidistant from $B$, $C$, $I$, and the excenter $I_A$, is itself one of the most useful lemmas in contest geometry.

## Applications
Distances between the circumcenter and incenter, the relation between the two radii, and inequalities in $R$ and $r$.

## Contest profile
AIME problems have asked for $OI$ outright; learn the formula together with the lemma behind it.
`,

"nine-point-circle": String.raw`
## Key forms
- the circle passes through the midpoints of the three sides, the feet of the three altitudes, and the midpoints of $HA$, $HB$, $HC$, where $H$ is the orthocenter
- $R_9 = \dfrac R2$ — its radius is half the circumradius
- $N$ = the midpoint of $OH$ — its center, so $N$ is on the Euler line, with $NG = \tfrac16OH$

## Conditions
$ABC$ is any triangle, with circumcenter $O$, orthocenter $H$, centroid $G$, and circumradius $R$. For a right triangle two of the nine points coincide and the circle still has radius $\frac R2$.

## Why it works
Two homotheties give the same circle. The [[homothety-monge|homothety]] centered at $H$ with ratio $\frac12$ sends the circumcircle to a circle of radius $\frac R2$ through the midpoints of $HA$, $HB$, $HC$, with center the midpoint of $HO$. The homothety centered at the centroid $G$ with ratio $-\frac12$ sends the circumcircle to the circumcircle of the [[medial-triangle|medial triangle]], a circle through the three side midpoints, also of radius $\frac R2$, and it sends $O$ to $\frac12H$ (with $O$ as the origin), the midpoint of $OH$ again. The two circles have the same center and radius, so they are one circle, through six of the nine points.

The altitude feet complete it. The midpoint $P_a$ of $HA$ and the midpoint $M_a$ of $BC$ are opposite ends of a diameter, since the circle's center is the midpoint of both $P_aM_a$ and the midpoint of $OH$. The foot $D$ of the altitude from $A$ lies on line $AH$, perpendicular to $BC$, so the angle $P_aDM_a$ is a right angle and $D$ is on the circle with that diameter.

## Useful observations
- Nine points on one circle give enormous cyclic-quadrilateral leverage: any four of them are concyclic, and the inscribed-angle chases follow.
- The circle is tangent to the incircle and the three excircles, which is [[feuerbach-theorem|Feuerbach's Theorem]].
- The medial triangle's circumcircle is the nine-point circle, so a "circle through the midpoints" has radius $\frac R2$, and so does a "circle through the altitude feet".

## Applications
Circles through midpoints and altitude feet, concyclicity arguments, and the radius or center of a circle in terms of the circumcircle.

## Contest profile
An AIME problem is sometimes a nine-point circle fact in disguise: a circle through the feet of the altitudes, or through the midpoints, turning out to have half the circumradius.
`,

"carnots-theorem": String.raw`
## Key forms
- $d_1 + d_2 + d_3 = R + r$ — the signed distances from the circumcenter to the three sides
- $d_a = R\cos A$, $d_b = R\cos B$, $d_c = R\cos C$ — each signed distance from its angle

## Conditions
A distance counts as positive when the circumcenter is on the same side of the line as the opposite vertex, and as negative when it is beyond, which happens for the side opposite an obtuse angle. In a right triangle that distance is $0$.

## Why it works
The side $a$ subtends the central angle $2A$ at $O$, so the distance from $O$ to $a$ is the apothem $R\cos A$, which is negative exactly when $A$ is obtuse. The identity $\cos A + \cos B + \cos C = 1 + \frac rR$, from the [[triangle-angle-identities|identities for the angles of a triangle]], then gives $d_1 + d_2 + d_3 = R + r$.

## Useful observations
- It is the geometric packaging of the cosine identity, and the identity bounds the cosine sum in $(1, \frac32]$, with $\frac32$ only for the equilateral triangle.
- Given a cosine sum and $R$, the inradius follows at once.

## Applications
Sums of distances from the circumcenter to the sides, and problems that give the cosines of the angles together with $R$ or $r$.

## Contest profile
Rare directly, but the cosine identity underneath appears in AIME trigonometry, as when the sum of the cosines and the circumradius are given and the inradius is asked.
`,

"simson-line": String.raw`
## Key forms
- $P$ on the circumcircle of $ABC$ $\iff$ the feet of the perpendiculars from $P$ to the three side lines are collinear
- the Simson line of $P$ bisects the segment $PH$, where $H$ is the orthocenter
- the angle between the Simson lines of $P$ and $Q$ is half the arc $PQ$

## Conditions
The feet are taken on the lines $BC$, $CA$, $AB$, extended where needed. The statement is an equivalence, so it also proves that a point lies on the circumcircle.

## Why it works
Directed angles between lines, taken mod $180^\circ$, avoid case splits. Let $D$, $E$, $F$ be the feet on $BC$, $CA$, $AB$. The right angles at $D$ and $F$ put $P$, $D$, $B$, $F$ on a circle with diameter $PB$, and the right angles at $D$ and $E$ put $P$, $D$, $C$, $E$ on a circle with diameter $PC$.

Step 1, the equivalence. In those two circles,
$$\angle(DF, DP) = \angle(BF, BP) = \angle(BA, BP), \qquad \angle(DE, DP) = \angle(CE, CP) = \angle(CA, CP).$$
The feet are collinear exactly when the two left sides are equal, so exactly when $\angle(BA, BP) = \angle(CA, CP)$, which is the condition for $A$, $B$, $C$, $P$ to be concyclic.

Step 2, the direction. Since $PD \perp BC$, Step 1 gives $\angle(DF, BC) = \angle(BA, BP) + 90^\circ$. For a second point $Q$ the Simson line makes $\angle(BA, BQ) + 90^\circ$ with $BC$, so the two lines meet at $\angle(BP, BQ)$, an inscribed angle on the arc $PQ$, which is half that arc.

Step 3, the midpoint of $PH$. The homothety at $P$ with ratio $2$ sends each foot to the reflection of $P$ in that side, so it carries the Simson line to the [[steiner-line|Steiner line]], which passes through $H$. Undoing it, the Simson line passes through the midpoint of $PH$.

## Useful observations
- The configuration is recognizable by its data: perpendiculars dropped from one point to all three sides with collinear feet. Conversely, to prove a point lies on the circumcircle, show its feet are collinear.
- The Simson line bisects $PH$, and as $P$ turns around the circle the line turns at half the speed.
- The same degenerate-pedal idea for four lines is the complete quadrilateral and its [[miquels-theorem|Miquel]] point.
- It is the degenerate pedal triangle: its area is $0$, as the pedal-triangle formula says when $OP = R$.

## Applications
Collinearity of the three feet from a circumcircle point, and proving that a point lies on the circumcircle.

## Contest profile
A niche but decisive AIME and olympiad tool: when a problem drops three perpendiculars from a circumcircle point, the collinearity is the intended miracle.
`,

"brocard-angle": String.raw`
## Key forms
- $\cot\omega = \cot A + \cot B + \cot C$ — the Brocard angle $\omega$, at which the cevians from each vertex to the Brocard point meet the sides
- $\cot\omega = \dfrac{a^2 + b^2 + c^2}{4K}$ — in terms of the sides and the area $K$
- $\csc^2\omega = \csc^2A + \csc^2B + \csc^2C$, and $\omega \le 30^\circ$ with equality for the equilateral triangle

## Conditions
The point $P$ is chosen so that $\angle PAB = \angle PBC = \angle PCA = \omega$. A second point, the twin Brocard point, has the same angle in the other orientation.

## Why it works
Requiring the cevians $AP$, $BP$, $CP$ to make equal angles $\omega$ with the sides $AB$, $BC$, $CA$ respectively forces, through the Law of Sines in the three sub-triangles, the relation $\cot\omega = \cot A + \cot B + \cot C$. Symmetry gives the twin Brocard point with the same angle.

The side form follows from $\cot A = \frac{b^2 + c^2 - a^2}{4K}$ and its cyclic versions, whose sum is $\frac{a^2 + b^2 + c^2}{4K}$.

## Useful observations
- $\cot\omega$ is computed from the angles, or from the sides through the second form, which is the contest-usable one.
- The bound $\omega \le 30^\circ$, with equality only for the equilateral triangle, settles extremal questions.
- The pairwise cotangent products of a triangle add up to $1$, one of the [[triangle-angle-identities|identities for the three angles of a triangle]], and that sum often simplifies the algebra around $\cot\omega$.

## Applications
Brocard points and the Brocard angle from the angles or sides of a triangle.

## Contest profile
Appears in hard AIME and olympiad trigonometry-geometry problems.
`,

"circle-basics": String.raw`
## Key forms
- $C = 2\pi r$ and $A = \pi r^2$
- arc $= r\theta$ and sector $= \frac12 r^2\theta = \frac12 r \cdot \text{arc}$, with $\theta$ in radians
- in degrees: arc $= \frac{\theta}{360^\circ} \cdot 2\pi r$ and sector $= \frac{\theta}{360^\circ} \cdot \pi r^2$
- annulus: $\pi(R^2 - r^2)$

## Conditions
The forms $r\theta$ and $\frac12 r^2\theta$ need $\theta$ in radians; the degree forms use the fraction of a full turn.

## Why it works
A sector is a slice of the circle, and a slice with central angle $\theta$ is the fraction $\frac{\theta}{2\pi}$ of the whole, of the circumference, and of the area alike.

The whole-circle formulas are the starting point. All circles are similar, so the ratio of circumference to diameter is the same for every circle, and that ratio is what $\pi$ means; so $C = \pi \cdot 2r = 2\pi r$.

For the area, cut the circle into many thin sectors and lay them side by side, alternately pointing up and down. They form nearly a parallelogram whose height is $r$ and whose long sides are each half the circumference, $\pi r$, and the thinner the slices, the closer it gets. So the area is $$\pi r \cdot r = \pi r^2.$$

{{figure:slices}}

The sector formulas then follow by proportion. A full turn is $2\pi$ radians, so an angle of $\theta$ radians takes the fraction $\frac{\theta}{2\pi}$ of the circle: its arc is $\frac{\theta}{2\pi} \cdot 2\pi r = r\theta$, and its area is $\frac{\theta}{2\pi} \cdot \pi r^2 = \frac12r^2\theta$. The arc formula is really what a radian means, since the angle that cuts off an arc equal to the radius has measure $1$.

## Useful observations
- A sector's area is half its radius times its arc, $\frac12 r \cdot \text{arc}$, the triangle formula with the arc as the base, so a sector's area follows from its arc length without the angle.
- An annulus is fixed by one length: a chord of the outer circle tangent to the inner one has half-length $\sqrt{R^2 - r^2}$, so the ring has area $\pi\left(\frac c2\right)^2$ whatever the two radii are.

{{figure:annulus}}

- Area grows with the square of the radius and arc length with the first power, so scaling a circle by $k$ multiplies its area by $k^2$ and every arc by $k$.
- Rolling without slipping matches arc lengths, so a wheel of radius $r$ turning through angle $\theta$ travels $r\theta$, and a coin rolling around an equal coin turns twice, since its center travels a circle of twice the radius.

## Applications
Shaded regions built from sectors and triangles, rolling and wrapping, and annuli.

## Contest profile
The building blocks of shaded-region problems, rarely the whole problem: the work is cutting a region into sectors, triangles, and segments, often with special right triangles or equilateral triangles supplying the pieces. Rolling problems match arc lengths.
`,

"power-of-a-point": String.raw`
## Conditions
$P$ is any point in the plane of the circle, and the lines are any lines through $P$ that meet the circle; a tangent counts as meeting it twice at its point of contact $T$. With [[directed-lengths|directed lengths]] along each line, $PX \cdot PY = OP^2 - r^2$ including the sign; with ordinary lengths the product is $|OP^2 - r^2|$.

## Why it works
Start from what is fixed. Choose a point $P$ and a circle, and the single number $OP^2 - r^2$ is decided before any line is drawn. Now draw any line through $P$ meeting the circle at $X$ and $Y$: the product comes out to that same number, $$PX \cdot PY = |OP^2 - r^2|,$$ whichever line you chose. The three familiar forms, two chords, two secants, and a secant with a tangent, are the three ways a line through $P$ can cross the circle, not three separate facts.

The proof of the invariance is one similar-triangle step. Two lines through $P$ meet the circle at $A, B$ and at $C, D$. The inscribed angles at $B$ and $D$ stand on the same arc $AC$, so they are equal, and with the shared angle at $P$ the triangles $PAD$ and $PCB$ are similar. Matching sides gives $\frac{PA}{PC} = \frac{PD}{PB}$, which cross-multiplies to $$PA \cdot PB = PC \cdot PD.$$

{{figure:similar}}

Taking the line through the center makes the common value visible: it meets the circle at distances $|OP - r|$ and $OP + r$ from $P$, whose product is $|OP^2 - r^2|$.

Signed, the power is $OP^2 - r^2$ with no absolute value: negative when $P$ is inside, zero exactly on the circle, positive outside. Inside, $P$ falls between $X$ and $Y$, so the two directed lengths oppose; outside, both point the same way.

## Useful observations
- A tangent is the limiting case $X = Y = T$, so $PT^2 = PA \cdot PB$ for any secant $PAB$ from an outside point, and a tangent length and a secant from the same point determine each other.
- The converse holds: if lines $AB$ and $CD$ meet at $P$ and $PA \cdot PB = PC \cdot PD$ as directed products, then $A$, $B$, $C$, and $D$ are concyclic.
- The points with equal power with respect to two circles form a line, the [[radical-axis|radical axis]].

## Applications
Lengths of chords, secants, and tangents through a common point, proofs that four points are concyclic, and radical axes and centers.

## Contest profile
Rarely the whole solution: it supplies one length equation, which [[stewarts-theorem|Stewart's Theorem]] or the [[law-of-cosines|Law of Cosines]] then finishes.
`,

"chord-length": String.raw`
## Key forms
- $\text{chord} = 2R\sin\frac\theta2 = 2\sqrt{R^2 - d^2}$, and $d = R\cos\frac\theta2$
- regular $n$-gon, vertices $k$ steps apart: $2R\sin\frac{k\pi}{n}$
- common chord of two circles: $h^2 = r_1^2 - d_1^2 = r_2^2 - d_2^2$, with $d_1 + d_2$ the distance between the centers when the chord lies between them

## Conditions
$\theta$ is the central angle and $d$ the distance from the center to the chord, $0 \le d \le R$.

## Why it works
The perpendicular from the center to a chord lands at the chord's midpoint, so the center, the midpoint, and one endpoint form a right triangle with hypotenuse $R$.

The perpendicular bisects the chord because the center is equally far from the two endpoints, so it lies on the chord's [[perpendicular-bisector-locus|perpendicular bisector]].

In the right triangle, the leg along the chord is half the chord, the other leg is the distance $d$ from the center, and the angle at the center is half the central angle $\theta$. So the half chord is $R\sin\frac\theta2$, and it is also $\sqrt{R^2 - d^2}$ by the Pythagorean Theorem.

{{figure:half-chord}}

For a regular $n$-gon, vertices $k$ steps apart subtend a central angle of $\frac{2\pi k}{n}$, so the angle formula gives the diagonal $2R\sin\frac{k\pi}{n}$.

## Useful observations
- Equal chords, equal distances from the center, equal central angles, and equal arcs are four faces of one fact, so any one of them gives the other three.
- Among all chords through a point $P$ inside the circle, the diameter is the longest and the chord perpendicular to $OP$ is the shortest, since that chord is the farthest from the center.
- Two intersecting circles share a common chord, which the line of centers bisects at a right angle, so each circle gives the same half chord.

{{figure:common-chord}}

- The midpoints of all chords of one length lie on a circle concentric with the given one, of radius $d$.

## Applications
Chords from angles and angles from chords, diagonals of regular polygons, and common chords of two circles.

## Contest profile
An AIME and AMC 12 step, rarely alone: a chord is usually turned into an angle, or an angle into a chord, next to the angle addition or double angle formulas. Common chords and the diagonals of regular polygons recur.
`,

"inscribed-angle-theorem": String.raw`
## Key forms
- $\angle BAC = \frac12\angle BOC = \frac12\,\overset{\frown}{BC}$, for $A$ on the circle and $O$ the center
- angles on the same arc, from the same side, are equal
- an angle inscribed in a semicircle is $90^\circ$

## Conditions
The vertex lies on the circle and the arc is the one inside the angle, not containing the vertex. Angles on opposite sides of a chord are supplementary rather than equal.

## Why it works
Draw the radius to the vertex of the angle, and the isosceles triangle it creates forces the central angle to be twice the inscribed one.

Start with the case where one side of the inscribed angle passes through the center. Let the angle be $\angle BAC$ with $AC$ a diameter through $O$. Triangle $OAB$ is isosceles, since $OA$ and $OB$ are radii, so its base angles at $A$ and $B$ are both $\theta$. The central angle $\angle BOC$ is an exterior angle of that triangle, so it equals $\theta + \theta = 2\theta$.

{{figure:diameter-case}}

Every other position reduces to this one. Draw the diameter from $A$ through $O$. If $O$ lies inside the angle, the diameter splits it into two angles of the first kind, and adding gives the result; if $O$ lies outside, the angle is the difference of two such angles. Since the central angle depends only on the arc, every inscribed angle on the same arc is the same size.

## Useful observations
- Opposite angles of a cyclic quadrilateral add to $180^\circ$, since their arcs make up the whole circle.
- The converse holds: if a segment subtends equal angles at two points on the same side, the four points are concyclic, and a right angle subtending a segment puts its vertex on the circle with that segment as diameter.
- The angle between a tangent and a chord is half the arc it cuts off, the limiting case of an inscribed angle.
- An angle formed by two chords meeting inside the circle is half the sum of the two arcs they cut off, and outside it is half the difference.

## Applications
Angles in circles, cyclic quadrilaterals, right angles from diameters, and proofs that four points lie on a circle.

## Contest profile
The foundation of nearly every circle angle chase, used at every level, but almost never the final step: it supplies equal angles that similar triangles or the Law of Sines then turn into lengths.
`,

"thales-theorem": String.raw`
## Key forms
- $AB$ is a diameter $\iff \angle ACB = 90^\circ$ — for any point $C$ of the circle other than $A$ and $B$, and conversely every $C$ that sees $AB$ at a right angle lies on the circle with diameter $AB$
- the circumcenter of a right triangle is the midpoint of its hypotenuse, so the circumradius and the [[median-to-hypotenuse|median to the hypotenuse]] both equal half of it
- two right angles that look at the same segment put four points on one circle with that segment as diameter

## Conditions
$C$ differs from $A$ and $B$. The converse concerns the plane: a point seeing $AB$ at a right angle lies on the circle, so the locus of such points is that circle without $A$ and $B$.

## Why it works
The midpoint of $AB$ is the same distance from $A$, $B$, and $C$ exactly when the angle at $C$ is right, and that one fact gives both directions.

Forwards: let $O$ be the center, so $OA = OB = OC$. The triangles $OAC$ and $OBC$ are isosceles, so $\angle OCA = \angle A$ and $\angle OCB = \angle B$. Adding, $\angle ACB = \angle A + \angle B$. The three angles of triangle $ABC$ add to $180^\circ$, so $2\angle ACB = 180^\circ$ and $\angle ACB = 90^\circ$. This is also the Inscribed Angle Theorem for an arc of $180^\circ$.

{{figure:isosceles}}

Conversely, if $\angle ACB = 90^\circ$, complete the right triangle to a rectangle $ACBD$. The diagonals of a rectangle are equal and bisect each other, so their crossing point, the midpoint $O$ of $AB$, is at distance $\frac{AB}{2}$ from all four corners, $C$ included. So $C$ lies on the circle with diameter $AB$.

{{figure:rectangle}}

## Useful observations
- The converse is the useful direction. A right angle at $C$ looking at a fixed segment $AB$ puts $C$ on the circle with diameter $AB$, which turns an angle condition into a circle and brings in power of a point, cyclic quadrilaterals, and inscribed angles.
- Two right angles on the same segment put four points on one circle, which is how problems hide cyclic quadrilaterals. The standard case is the feet of two altitudes.

{{figure:feet}}

- Forwards, it places the circumcenter of a right triangle at the midpoint of the hypotenuse, so the circumradius is half the hypotenuse and so is the median to it.
- A point that moves while seeing a fixed segment at a right angle traces the circle on that segment.

## Applications
Hidden cyclic quadrilaterals, the circumcircle of a right triangle, loci of right angles, and the feet of altitudes.

## Contest profile
Nine problems here, six of them AIME, and none by it alone: the right angle it produces is usually the start of [[similar-figures-ratios|similar triangles]] or a [[pythagorean-theorem|Pythagorean]] computation. The common miss is a $90^\circ$ angle on a segment with no circle drawn through it.
`,

"angle-chord-secant": String.raw`
## Key forms
- vertex inside: $\angle APB = \frac12\left(\overset\frown{AB} + \overset\frown{CD}\right)$ for chords $AC$ and $BD$ crossing at $P$
- vertex outside: $\angle P = \frac12(\text{far arc} - \text{near arc})$
- two tangents from $P$: $\angle P = 180^\circ - \text{near arc}$
- vertex on the circle: half the intercepted arc

## Conditions
Arcs are measured in degrees of arc, and each angle uses the arcs lying inside it and inside its vertical angle.

## Why it works
Both cases come from one auxiliary chord, which turns the angle into an exterior angle of a triangle whose other angles are inscribed.

For chords $AC$ and $BD$ crossing at $P$, draw $BC$. The angle $APB$ is an exterior angle of triangle $PBC$, so it equals $\angle PBC + \angle PCB$. These are inscribed angles standing on arcs $CD$ and $AB$, so the sum is half of each arc added together.

{{figure:inside}}

For secants $PAB$ and $PCD$ from outside, with $A$ and $C$ the nearer points, draw $AD$. Now $\angle BAD$ is an exterior angle of triangle $PAD$, so $\angle BAD = \angle P + \angle ADP$. The first is half the far arc $BD$ and the second half the near arc $AC$, so $\angle P$ is half their difference.

{{figure:outside}}

A tangent is the limit of a secant whose two points merge, so the same subtraction covers tangents. For two tangents the arcs are $x$ and $360^\circ - x$, giving $\frac12(360^\circ - 2x) = 180^\circ - x$.

## Useful observations
- The three cases are one formula as the vertex moves: the near arc shrinks to nothing as $P$ reaches the circle and then counts negatively outside it, so the angle is always half the signed sum of the two arcs.
- With the arcs as unknowns every such angle is a linear equation, and the arcs add up to $360^\circ$, so a figure full of angles becomes a linear system.
- Perpendicular chords cut off opposite arcs that add up to $180^\circ$, since half their sum is the right angle.
- The same pictures give both an angle and a [[power-of-a-point|power of a point]], so a crossing that yields one usually yields the other.

## Applications
Angles formed by chords, secants, and tangents, and arcs found from angles.

## Contest profile
AMC circle problems are often this classification plus one linear equation in the arcs; the two-tangent case is the one most often forgotten.
`,

"tangent-facts": String.raw`
## Key forms
- $OT \perp \ell$ at the touch point $T$
- $PA = PB = \sqrt{OP^2 - r^2}$ for tangents from $P$ touching at $A$ and $B$
- $OP$ bisects $\angle APB$ and $\angle AOB$, and $AB \perp OP$
- a circle tangent to both sides of an angle has its center on the bisector

## Conditions
$P$ lies outside the circle; a point on the circle has one tangent, and a point inside has none.

## Why it works
The touch point is the point of the tangent line closest to the center, and the closest point of a line to any given point is the foot of the perpendicular.

Every point of the tangent line other than the touch point $T$ lies outside the circle, so its distance from the center $O$ is more than the radius; that makes $T$ the point of the line closest to $O$. The closest point of a line to $O$ is also the foot $F$ of the perpendicular from $O$, because any other point $Q$ of the line makes a right triangle $OFQ$ with hypotenuse $OQ$, and $OQ^2 = OF^2 + FQ^2 \gt OF^2$. So $T = F$ and $OT$ is perpendicular to the line.

The equal tangents follow at once. Triangles $OAP$ and $OBP$ have right angles at $A$ and $B$, share the hypotenuse $OP$, and have equal legs $OA = OB = r$, so by the [[pythagorean-theorem|Pythagorean Theorem]] $PA = \sqrt{OP^2 - r^2} = PB$. The figure at the top shows the kite this makes, symmetric about $OP$.

The tangent–chord angle is the inscribed angle rule in its limiting case: slide one endpoint of a chord along the circle into the other, and the chord turns into the tangent while the angle stays half the arc.

{{figure:chord}}

## Useful observations
- The kite $PAOB$ has right angles at $A$ and $B$, so it is cyclic with diameter $OP$, and the chord of contact $AB$ is perpendicular to $OP$.
- A polygon with an incircle has equal tangent lengths at each vertex, so a tangential quadrilateral has equal sums of opposite sides, $AB + CD = BC + DA$; in a triangle the tangent lengths are the [[incircle-tangent-lengths|incircle tangent lengths]] $s - a$, $s - b$, $s - c$.
- Common tangents of two circles are legs of right triangles whose hypotenuse joins the centers: the external tangent has length $\sqrt{d^2 - (r_1 - r_2)^2}$ and the internal one $\sqrt{d^2 - (r_1 + r_2)^2}$, as on the [[common-tangent-lengths|common tangent lengths]] card.

{{figure:belt}}

- A circle inscribed in a right angle has its center at distance $r$ from both sides, so with the sides as axes its center is $(r, r)$.

## Applications
Tangent lengths, incircles of polygons, belts and common tangents, and circles inscribed in angles.

## Contest profile
The radius to the touch point is the first line of a remarkable share of circle problems, though never the last: the usual next step is similar triangles or the inradius formula.
`,

"tangent-chord-angle": String.raw`
## Key forms
- $\angle(\ell, TA) = \frac12\overset\frown{TA} = \angle TBA$ for $B$ on the far arc
- tangent at vertex $A$ of triangle $ABC$: angle $C$ with side $AB$ and angle $B$ with side $AC$
- tangent $PA$ and secant $PBC$: $\triangle PAB \sim \triangle PCA$

## Conditions
The arc is the one inside the angle between the tangent and the chord.

## Why it works
The tangent at $T$ is perpendicular to the radius $OT$, and that right angle is enough to compare the tangent–chord angle with the angle at the center.

Let $\theta$ be the angle between the tangent and the chord $TA$. Then $\angle OTA = 90^\circ - \theta$, and triangle $OTA$ is isosceles with $OT = OA$, so its angle at $O$ is $$\angle TOA = 180^\circ - 2(90^\circ - \theta) = 2\theta.$$ The central angle is twice $\theta$, so $\theta$ is half the arc $TA$, as the second figure at the top shows. An inscribed angle on the same arc is also half of it, so $\theta = \angle TBA$ for every $B$ on the far arc.

## Useful observations
- At a vertex of a triangle's circumcircle the tangent makes angles equal to the other two angles of the triangle with the two sides.

{{figure:circumtangent}}

- So the tangent at $A$ is antiparallel to $BC$, in the direction of any line meeting $AB$ and $AC$ at two points concyclic with $B$ and $C$, and it is parallel to $BC$ exactly when $AB = AC$.
- The tangents at $B$ and $C$ meet at a point $T$ with $\angle TBC = \angle TCB = \angle A$, so triangle $TBC$ is isosceles with apex angle $180^\circ - 2\angle A$.
- For a tangent $PA$ and a secant $PBC$, the tangent–chord angle gives $\angle PAB = \angle PCA$, and with the shared angle at $P$ the triangles $PAB$ and $PCA$ are similar, which is the similarity behind $PA^2 = PB \cdot PC$.

## Applications
Angles at tangent lines, tangents to circumcircles, and similar triangles formed by a tangent and a secant.

## Contest profile
On the AMC it is usually one step in an angle chase, trading an angle at a tangent for an inscribed one; AIME problems use it to produce similar triangles that the Law of Cosines then finishes.
`,

"two-tangents-angle": String.raw`
## Key forms
- $\angle APB = 180^\circ - \angle AOB$ — the angle between two tangents from $P$ and the central angle over the chord of contact are supplementary
- $\angle APB = \dfrac12\left(\text{arc}_{\text{far}} - \text{arc}_{\text{near}}\right)$ — the exterior-vertex rule
- $PA = PB = \sqrt{OP^2 - r^2}$ and $\sin\dfrac{\angle APB}{2} = \dfrac{r}{OP}$ — the tangent length and the half-angle
- $OP$ bisects $\angle APB$ and is perpendicular to the chord of contact $AB$

## Conditions
$P$ is outside the circle. The tangent points $A$ and $B$ are symmetric about the line $OP$.

## Why it works
Each radius is perpendicular to its tangent, so quadrilateral $PAOB$ has right angles at $A$ and $B$; since its four angles sum to $360^\circ$, $\angle APB + \angle AOB = 180^\circ$.

Equivalently the exterior-vertex rule gives $\angle P = \frac12(\text{far arc} - \text{near arc})$, and because the two arcs sum to $360^\circ$ that is $180^\circ - \angle AOB$.

## Useful observations
- Dropping both radii to the tangent points splits $PAOB$ along $OP$ into two congruent right triangles with legs $r$ and the tangent length $\sqrt{OP^2 - r^2}$. One picture yields the angle, the tangent length, and $PA = PB$ together.
- The center sits on the bisector of $\angle APB$, which pins down the whole configuration.
- The chord of contact has length $\frac{2r\sqrt{OP^2 - r^2}}{OP}$, twice the altitude of the right triangle to its hypotenuse.

## Applications
Angles and lengths in the two-tangents figure, tangent lengths from an external point, and chords of contact.

## Contest profile
The "two tangents from a point" figure runs from MATHCOUNTS through the AIME. The supplement is worth keeping handy: the external angle and the central angle add to $180^\circ$.
`,

"common-tangent-lengths": String.raw`
## Key forms
- $t_{\text{ext}} = \sqrt{d^2 - (r_1 - r_2)^2}$ — the external common tangent, which keeps both circles on one side
- $t_{\text{int}} = \sqrt{d^2 - (r_1 + r_2)^2}$ — the internal common tangent, which passes between the circles
- $t = 2\sqrt{r_1r_2}$ — the external tangent of two circles that touch each other
- $d$ is the distance between the centers and $r_1$, $r_2$ are the radii

## Conditions
The external tangents exist when $d \ge \lvert r_1 - r_2 \rvert$, so neither circle is strictly inside the other, and the internal tangents need $d \ge r_1 + r_2$, so the circles do not overlap.

## Why it works
Both radii to the points of contact are perpendicular to the tangent, so they are parallel to each other, and sliding the tangent segment over by one radius turns the picture into a right triangle.

Slide the tangent segment so that one end sits on the smaller circle's center. It becomes a leg of a right triangle whose hypotenuse is the center line $d$. For an external tangent the two radii point to the same side, so the other leg is their difference; for an internal tangent they point to opposite sides, so it is their sum. The [[pythagorean-theorem|Pythagorean Theorem]] gives $$t_{\text{ext}}^2 = d^2 - (r_1 - r_2)^2, \qquad t_{\text{int}}^2 = d^2 - (r_1 + r_2)^2.$$

The figures at the top show both triangles, and the third shows the touching case.

## Useful observations
- For two touching circles, $d = r_1 + r_2$, and the external tangent is $\sqrt{(r_1 + r_2)^2 - (r_1 - r_2)^2} = 2\sqrt{r_1r_2}$. That is the step in every chain of circles resting on a line or squeezed between two lines, where consecutive radii often form a geometric sequence.
- Belt-and-pulley problems start from the same right triangles, with the arcs on the pulleys added to the straight segments.

## Applications
Circles resting on a line or in a corner, chains of tangent circles, belts around pulleys, and the length of a segment between two points of contact.

## Contest profile
Three problems here, all AIME, none solved by it alone. The recurring shape is circles in a corner or resting on a line, where the gap between their points of contact is twice the geometric mean of the radii, and harder versions pair the tangent lengths with a [[homothety-monge|homothety]] or similar triangles at the point where the tangents meet.
`,

"descartes-circle-theorem": String.raw`
## Key forms
- $(k_1 + k_2 + k_3 + k_4)^2 = 2(k_1^2 + k_2^2 + k_3^2 + k_4^2)$ — the relation between the curvatures $k = \frac1r$ of four mutually tangent circles
- $k_4 = k_1 + k_2 + k_3 \pm 2\sqrt{k_1k_2 + k_2k_3 + k_3k_1}$ — the two circles tangent to three given ones
- $k_4 + k_4' = 2(k_1 + k_2 + k_3)$ — the two solutions add to twice the sum of the three given curvatures
- a circle that encloses the others has negative curvature, and a straight line counts as a circle of curvature $0$

## Conditions
The four circles are tangent to each other in pairs, at six different points. The sign convention is part of the statement: the enclosing circle's curvature is taken negative.

## Why it works
The proof is a long computation with center distances, or a short argument by inversion, and neither is contest material; what matters is the shape of the result.

The relation is a quadratic in $k_4$, so three mutually tangent circles have two circles tangent to all three. Solving it gives $$k_4 = k_1 + k_2 + k_3 \pm 2\sqrt{k_1k_2 + k_2k_3 + k_3k_1},$$ and the two roots are the small circle in the gap and the large circle around the three.

{{figure:soddy}}

The large circle touches the others from outside them, so it bends the other way and its curvature comes out negative. A line is the limit of a circle as its radius grows, so it enters with curvature $0$, as in the figure at the top.

## Useful observations
- Radii are converted to curvatures, an enclosing circle gets a negative sign, a line gets curvature $0$, and the missing curvature is solved for. The two roots add to $2(k_1 + k_2 + k_3)$ by Vieta's Formulas, which steps along a chain of circles without solving another quadratic.
- Two parallel lines and a circle are the easiest case, with two curvatures of $0$.

## Applications
The radius of a fourth circle tangent to three given circles, chains of circles in a gap, and circles between lines or inside a larger circle.

## Contest profile
One problem here, from the AMC 10, solved by it alone: four mutually tangent circles, where the center-distance equations would be brutal. It is the standard shortcut whenever four tangent circles appear, and it extends to spheres in every dimension as the [[descartes-sphere-theorem|Soddy–Gosset Theorem]].
`,

"caseys-theorem": String.raw`
## Key forms
- $t_{12}t_{34} + t_{14}t_{23} = t_{13}t_{24}$ for four circles $\omega_1, \ldots, \omega_4$ all tangent to a fifth circle $\Gamma$, internally or all externally, listed in order around $\Gamma$, where $t_{ij}$ is the length of a common external tangent of $\omega_i$ and $\omega_j$
- $t_{ij} = \dfrac{T_iT_j}{R}\sqrt{(R - r_i)(R - r_j)}$ when the circles touch $\Gamma$ internally at $T_i$, $T_j$, and the same with $R + r$ in place of $R - r$ when they touch it externally
- a circle of radius $0$ is a point, and a tangent length from a point is the usual tangent length

## Conditions
$\Gamma$ has radius $R$ and the circles have radii $r_i$. All four are tangent to $\Gamma$ on the same side. Mixed cases, where some touch internally and some externally, need internal common tangents for some pairs and are not covered here.

## Why it works
The proof computes each $t_{ij}$ from the touch points on $\Gamma$ and finds that the identity is Ptolemy's Theorem in disguise.

Step 1, one tangent length. Let $O$ be the center of $\Gamma$, and let $\omega_i$ touch it internally at $T_i$ with center $O_i$ on the ray $OT_i$ at distance $R - r_i$ from $O$. If $\theta = \angle T_iOT_j$, the [[law-of-cosines|Law of Cosines]] in $OO_iO_j$ gives $$O_iO_j^2 = (R - r_i)^2 + (R - r_j)^2 - 2(R - r_i)(R - r_j)\cos\theta.$$

Rewrite this with the chord $T_iT_j$, for which $2(1 - \cos\theta) = \dfrac{T_iT_j^2}{R^2}$: $$O_iO_j^2 = (r_i - r_j)^2 + (R - r_i)(R - r_j)\,\frac{T_iT_j^2}{R^2}.$$

A common external tangent of two circles satisfies $t_{ij}^2 = O_iO_j^2 - (r_i - r_j)^2$, so $$t_{ij} = \frac{T_iT_j}{R}\sqrt{(R - r_i)(R - r_j)}.$$ For external tangency the center distance is $R + r_i$, and the same computation gives $R + r_i$ and $R + r_j$ in the root.

Step 2, substitute. Each term of Casey's identity, such as $t_{12}t_{34}$, uses all four indices once, so every term carries the same factor $\frac{1}{R^2}\sqrt{(R - r_1)(R - r_2)(R - r_3)(R - r_4)}$. Cancelling it leaves $$T_1T_2 \cdot T_3T_4 + T_1T_4 \cdot T_2T_3 = T_1T_3 \cdot T_2T_4,$$ and that is Ptolemy's Theorem for the cyclic quadrilateral $T_1T_2T_3T_4$, listed in order around $\Gamma$.

## Useful observations
- Points are circles of radius $0$, so mixed configurations of points and circles work: three vertices of a triangle plus a circle tangent to the circumcircle give a relation among tangent lengths, which is how $AE = \frac{bc}{s}$ arises for the [[mixtilinear-incircle|mixtilinear incircle]].
- The tangent length from a point to a circle is the square root of the point's power with respect to the circle.
- With all four circles of radius $0$, Casey's Theorem is exactly Ptolemy's Theorem.

## Applications
Relations among tangent lengths in configurations of circles tangent to a common circle, and Ptolemy-style computations when one or two of the vertices are circles.

## Contest profile
A specialist's tool for hard olympiad geometry, in figures where Ptolemy almost applies but one vertex is a circle tangent to the circumcircle. It supplies one equation among the tangent lengths.
`,

"butterfly-theorem": String.raw`
## Key forms
- $MX = MY$: $M$ is the midpoint of the chord $PQ$, the chords $AB$ and $CD$ pass through $M$, and the lines $AD$ and $BC$ meet line $PQ$ at $X$ and $Y$
- so $M$ is the midpoint of $XY$, whatever the two chords through $M$ are

## Conditions
$M$ is the midpoint of $PQ$, and the two chords through $M$ are different lines. The points $X$ and $Y$ may lie outside the segment $PQ$, on the extended line.

## Why it works
Use coordinates with $M$ at the origin and $PQ$ along the $x$-axis, $P = (-m, 0)$, $Q = (m, 0)$. The center lies on the perpendicular bisector of $PQ$, the $y$-axis, say at $(0, k)$, so the circle is $$x^2 + y^2 - 2ky - m^2 = 0.$$

Step 1, a chord through $M$. The line $y = tx$ meets the circle where $(1 + t^2)x^2 - 2kt\,x - m^2 = 0$. If its roots are $u$ and $u'$, Vieta gives $u + u' = \frac{2kt}{1 + t^2}$ and $uu' = \frac{-m^2}{1 + t^2}$, so $$\frac1u + \frac1{u'} = -\frac{2kt}{m^2}.$$

Step 2, the points $X$ and $Y$. Let $AB$ have slope $t_1$ and $CD$ slope $t_2$, with $A = (u, t_1u)$, $B = (u', t_1u')$, $D = (v, t_2v)$, $C = (v', t_2v')$. The line through $A$ and $D$ meets the $x$-axis where $$x_X = \frac{uv\,(t_2 - t_1)}{t_2v - t_1u}, \qquad \frac1{x_X} = \frac1{t_2 - t_1}\left(\frac{t_2}{u} - \frac{t_1}{v}\right).$$ The same computation for $B$ and $C$ gives $\frac1{x_Y} = \frac1{t_2 - t_1}\left(\frac{t_2}{u'} - \frac{t_1}{v'}\right)$.

Step 3, add. By Step 1, $$\frac1{x_X} + \frac1{x_Y} = \frac1{t_2 - t_1}\left[t_2\left(\frac1u + \frac1{u'}\right) - t_1\left(\frac1v + \frac1{v'}\right)\right] = \frac1{t_2 - t_1}\left[-\frac{2kt_1t_2}{m^2} + \frac{2kt_1t_2}{m^2}\right] = 0.$$ So $x_Y = -x_X$, which says $MX = MY$.

If one chord is perpendicular to $PQ$, write it as $x = 0$; the same computation goes through and the sum of the reciprocals is again $0$. The terms with $k$ cancel, which is why the result holds for every circle through $P$ and $Q$.

## Useful observations
- The setup to recognize is a chord, its midpoint, and two more chords through that midpoint, with the connecting lines crossing the original chord.
- The conclusion usually becomes an equation between lengths on the line $PQ$, with no length from the two crossing chords involved.
- The statement is about the lines $AD$ and $BC$, so it does not matter whether the crossing points fall inside the circle.

## Applications
Equal segments along a chord cut by lines through its midpoint, and proofs that a point is the midpoint of a segment cut off on a chord.

## Contest profile
Occasional in olympiad geometry and rare below it. Its value is recognition: the configuration of a chord, its midpoint, and two chords through it is unmistakable once seen.
`,

"cyclic-opposite-angles": String.raw`
## Key forms
- $ABCD$ cyclic $\iff \angle A + \angle C = 180^\circ \iff \angle B + \angle D = 180^\circ$
- exterior angle at one vertex $=$ interior angle at the opposite vertex
- $\cos C = -\cos A$

## Conditions
$ABCD$ is a convex quadrilateral with its vertices in that order.

## Why it works
Each angle of a cyclic quadrilateral is an [[inscribed-angle-theorem|inscribed angle]], and two opposite angles stand on the two arcs that together make up the whole circle.

$\angle A$ stands on the arc $BCD$, and $\angle C$ stands on the arc $DAB$. By the Inscribed Angle Theorem each is half its arc, so $$\angle A + \angle C = \tfrac12\left(\text{arc } BCD + \text{arc } DAB\right) = \tfrac12 \cdot 360^\circ = 180^\circ.$$

{{figure:arcs}}

The converse compares two angles. Suppose $\angle B + \angle D = 180^\circ$, and draw the circle through $A$, $B$, and $C$. If $D$ were inside it, the line $AD$ would meet the circle again at a point $D'$ beyond $D$. Then $ABCD'$ is cyclic, so $\angle AD'C = 180^\circ - \angle B = \angle ADC$. But $\angle ADC$ is an exterior angle of triangle $DD'C$, so it is strictly larger than $\angle AD'C$, a contradiction. A point $D$ outside the circle fails in the same way, so $D$ is on the circle.

{{figure:converse}}

## Useful observations
- A cyclic parallelogram is a rectangle and a cyclic trapezoid is isosceles, since opposite angles that are both equal and supplementary must be right, and base angles of a trapezoid on one leg are supplementary.
- Two opposite right angles make a quadrilateral cyclic with the diagonal between the other two vertices as a diameter, which is how feet of altitudes produce circles.
- Opposite cosines are negatives, so the [[law-of-cosines|Law of Cosines]] for the diagonal from both sides gives two equations in one cosine, which solves the diagonal from the four sides.
- A kite is cyclic exactly when its two equal angles are right angles.

## Applications
Proving four points concyclic, angles in inscribed quadrilaterals, and diagonals of cyclic quadrilaterals.

## Contest profile
A frequent supporting step: a given $120^\circ$ becomes $60^\circ$ at the opposite vertex, ready for the Law of Cosines, and hidden cyclic quadrilaterals are the most common theme in hard contest geometry.
`,

"concyclicity-tests": String.raw`
## Key forms
- $A + C = 180^\circ$ — opposite angles of the quadrilateral, the default test
- $\angle ACB = \angle ADB$ with $C$ and $D$ on the same side of $AB$ — no quadrilateral needed
- $PA \cdot PC = PB \cdot PD$ where the diagonals cross at $P$; from outside, two secants give $PA \cdot PB = PC \cdot PD$
- $AC \cdot BD = AB \cdot CD + BC \cdot AD$ — Ptolemy, with equality only when concyclic in order
- the feet of the perpendiculars from $P$ to the sides of $ABC$ are collinear $\iff$ $P$ is on its circumcircle

## Conditions
All the tests are written for $ABCD$ taken in order around the circle. The angle test needs the two vertices on the same side of the segment they look at; from opposite sides the angles are supplementary instead.

## Why it works
Each is the converse of a fact about circles, and each converse holds because the circle through three of the points is unique. Fix $A$, $B$, $C$; they determine one circle. The fourth point $D$ either lies on it or does not, and every quantity below is strictly monotonic as $D$ moves off it, so matching the value forces $D$ back onto the circle.

That is the whole argument for the power of a point version: the power of $P$ is the same product measured along any line through it, so if a second line gives the same product, its two points sit on the same circle.

Inside the quadrilateral that reads $PA \cdot PC = PB \cdot PD$ along the two diagonals; from a point outside, the two secants read $PA \cdot PB = PC \cdot PD$ instead. It is one test, and only the position of $P$ decides which pairing to write.

For Ptolemy the monotonicity is the inequality itself, which is strict off the circle. For the angle versions it is the [[inscribed-angle-theorem|Inscribed Angle Theorem]], since the angle subtending a fixed chord grows as the vertex moves inside the circle and shrinks as it moves outside.

## Useful observations
- The angle test comes first; it needs no lengths and usually falls out of the angle chase already under way.
- The power-of-a-point form is used when two of the four points already lie on a line through a third marked point, because it converts the goal into a single product equation. Ptolemy is kept for when the problem hands over all six distances and nothing else.
- The trap is the side condition. $\angle ACB = \angle ADB$ proves concyclicity only when $C$ and $D$ are on the same side of $AB$. From opposite sides the correct relation is $\angle ACB + \angle ADB = 180^\circ$, which is the opposite-angles test again.

## Applications
Proving that four points lie on a circle in the middle of a solution, turning an unrelated pair of angles into equal ones, and concyclicity from lengths.

## Contest profile
Rarely the point of a problem and often the step that unlocks one: proving a concyclicity mid-solution turns an unrelated pair of angles into equal ones. AIME geometry uses it constantly as a hidden step. [[cyclic-opposite-angles|The supplementary-angle test]] covers most of it, and this card is the rest.
`,

"ptolemys-theorem": String.raw`
## Conditions
$A$, $B$, $C$, $D$ lie on a circle in that order, so that $AC$ and $BD$ are the diagonals: $AC \cdot BD = AB \cdot CD + BC \cdot DA$. The order matters; a self-intersecting labeling pairs the wrong segments. Conversely, if the equality holds for four points in that order, they are concyclic.

## Why it works
Choose a point on one diagonal that splits it into two pieces, each of which a pair of similar triangles can measure.

Let the quadrilateral be $ABCD$, and choose $E$ on the diagonal $AC$ so that $\angle ABE = \angle DBC$. The angles $BAC$ and $BDC$ stand on the same arc $BC$, so they are equal, and triangles $ABE$ and $DBC$ are similar. That gives $\frac{AE}{AB} = \frac{DC}{DB}$, so $$AE \cdot BD = AB \cdot CD.$$

Adding $\angle EBD$ to both of the equal angles gives $\angle EBC = \angle ABD$. The angles $BCA$ and $BDA$ stand on the same arc $AB$, so triangles $EBC$ and $ABD$ are similar too, which gives $EC \cdot BD = BC \cdot AD$.

{{figure:proof}}

Adding the two equations gives $(AE + EC) \cdot BD = AB \cdot CD + BC \cdot AD$, and $AE + EC = AC$. When the four points are not on a circle, the same pair of similar triangles can still be built, but $E$ no longer lands on $AC$, and the triangle inequality $AC \le AE + EC$ turns the equation into Ptolemy's Inequality.

## Useful observations
- The [[pythagorean-theorem|Pythagorean Theorem]] is the rectangle case: with sides $a$, $b$ and diagonal $d$, the relation reads $d^2 = a^2 + b^2$.
- An isosceles trapezoid is cyclic, so its diagonal satisfies $d^2 = \text{leg}^2 + \text{product of the bases}$: bases $6$ and $12$ with legs $5$ give $d^2 = 97$.
- On an equilateral triangle the three equal sides cancel, so a point on the circumcircle has one distance equal to the sum of the other two: $PA = PB + PC$ for $P$ on arc $BC$.
- In a regular pentagon with side $s$ and diagonal $d$, four vertices give $d^2 = s^2 + sd$, so $\frac ds$ is the golden ratio.

## Applications
Lengths of sides and diagonals of cyclic quadrilaterals, chords of regular polygons, and identities among distances from a point on a circumcircle to the vertices of an inscribed figure.

## Contest profile
An AIME length tool that is rarely the whole solution: equal chords or a symmetry first make several of the six lengths equal, leaving it one unknown.
`,

"brahmaguptas-formula": String.raw`
## Key forms
- $A = \sqrt{(s - a)(s - b)(s - c)(s - d)}$ — the area of a cyclic quadrilateral with sides $a$, $b$, $c$, $d$ and semiperimeter $s$
- $d = 0$ gives Heron's Formula — the triangle as the degenerate case

## Conditions
The quadrilateral is cyclic. For a quadrilateral that is not cyclic the area is smaller, by [[bretschneiders-formula|Bretschneider's Formula]], so for given sides the cyclic arrangement has the maximum possible area.

## Why it works
Split $ABCD$, with $AB = a$, $BC = b$, $CD = c$, $DA = d$, along the diagonal $AC$. In a cyclic quadrilateral $D = 180^\circ - B$, so $\sin D = \sin B$ and $\cos D = -\cos B$, and the area is
$$K = \tfrac12 ab\sin B + \tfrac12 cd\sin D = \tfrac12(ab + cd)\sin B.$$

The Law of Cosines in both triangles gives $AC^2 = a^2 + b^2 - 2ab\cos B = c^2 + d^2 + 2cd\cos B$, so $2(ab + cd)\cos B = a^2 + b^2 - c^2 - d^2$. Then $16K^2 = 4(ab + cd)^2(1 - \cos^2 B)$ is a difference of squares:
$$16K^2 = \left(2(ab + cd)\right)^2 - \left(a^2 + b^2 - c^2 - d^2\right)^2.$$

Factoring twice, the two factors are $(c + d)^2 - (a - b)^2$ and $(a + b)^2 - (c - d)^2$, so
$$16K^2 = (b + c + d - a)(a + c + d - b)(a + b + d - c)(a + b + c - d) = 16(s - a)(s - b)(s - c)(s - d).$$
With $d = 0$ the quadrilateral is a triangle and this is Heron's Formula.

## Useful observations
- With $d = 0$ it degrades gracefully to Heron, which is the easiest way to keep the form straight.
- It pairs with [[ptolemys-theorem|Ptolemy's Theorem]] and the Law of Cosines to extract the diagonals after the area.
- For given side lengths the cyclic quadrilateral has the largest area of all quadrilaterals with those sides.

## Applications
The area of a cyclic quadrilateral from its four sides; the area is also the input to the circumradius formula on [[cyclic-quad-radius|its own card]].

## Contest profile
AIME problems give four sides of a cyclic quadrilateral and ask for the area directly, or hand the area on to the circumradius formula when the radius is wanted.
`,

"pitots-theorem": String.raw`
## Key forms
- $AB + CD = BC + AD$ — a convex quadrilateral has an inscribed circle if and only if the sums of opposite sides are equal
- $[ABCD] = rs$ — the area of a tangential quadrilateral is the inradius times the semiperimeter
- sides $x + y$, $y + z$, $z + w$, $w + x$ — the sides of a tangential quadrilateral, written with the four tangent lengths $x, y, z, w$ from the vertices

## Conditions
The quadrilateral is convex. The theorem is an equivalence for convex quadrilaterals: equal sums of opposite sides give an incircle, and an incircle gives equal sums.

## Why it works
Equal tangent lengths from each vertex: going around the quadrilateral, each side is a sum of two tangent lengths, and the two tangent lengths from a vertex are equal. The sum of one pair of opposite sides is $(x + y) + (z + w)$, and the other pair is $(y + z) + (w + x)$, so both opposite-side sums count all four tangent lengths exactly once.

The converse also holds for convex quadrilaterals: if the sums are equal, the tangent lengths can be chosen consistently and the incircle exists.

## Useful observations
- Checking $AB + CD = BC + AD$ instantly certifies or refutes an inscribed circle.
- In problems it converts "tangential" into a linear equation among the sides, often all that is needed to find a missing side.
- Combined with $A = rs$, which holds for tangential polygons, it yields the inradius from the sides and the area.

## Applications
Missing sides of a tangential quadrilateral, certifying an incircle, and the inradius of a quadrilateral from its area.

## Contest profile
AMC and AIME tangential-quadrilateral problems open with Pitot almost by definition. A quadrilateral that is both tangential and cyclic is bicentric and has area $\sqrt{abcd}$ by [[brahmaguptas-formula|Brahmagupta's Formula]].
`,

"ptolemys-inequality": String.raw`
## Key forms
- $AB \cdot CD + BC \cdot DA \ge AC \cdot BD$ — for any four points in the plane
- equality holds exactly when $ABCD$ is cyclic in that order, which is Ptolemy's Theorem

## Conditions
The four points are in the plane, or in space. Equality needs the four points on a circle in the order $A, B, C, D$; for a different order of the points, a different pairing of the products is the one that gives equality.

## Why it works
Invert about $A$ with radius $1$. The [[inversion-facts|distance rule for inversion]] gives $B'C' = \frac{BC}{AB \cdot AC}$, and likewise for the other pairs.

The triangle inequality $B'D' \le B'C' + C'D'$ then reads
$$\frac{BD}{AB \cdot AD} \le \frac{BC}{AB \cdot AC} + \frac{CD}{AC \cdot AD},$$
and multiplying by $AB \cdot AC \cdot AD$ gives $AC \cdot BD \le BC \cdot DA + AB \cdot CD$.

Equality holds exactly when $C'$ lies on the segment $B'D'$. A line not through $A$ inverts to a circle through $A$, so this happens exactly when $A$, $B$, $C$, $D$ lie on one circle with $C$ on the arc $BD$ away from $A$, the order $A, B, C, D$.

## Useful observations
- As a bound: among all quadrilaterals with given side lengths, the product of the diagonals is largest for the cyclic arrangement.
- As a concyclicity test through the equality case.
- In "minimize $PA \cdot BC + PB \cdot CA$"-type problems, this is the hidden structure.

## Applications
Upper bounds on a product of diagonals, concyclicity tests, and extremal problems that combine products of distances.

## Contest profile
More olympiad than AIME, but the equality case doubles as a slick proof that a configuration is cyclic. Knowing that Ptolemy has an inequality version protects against misapplying the equality to non-cyclic quadrilaterals, a real trap.
`,

"ptolemy-equilateral": String.raw`
## Key forms
- $PA = PB + PC$ — for $P$ on arc $BC$ of the circumcircle of an equilateral triangle $ABC$, the distance to the far vertex is the sum of the distances to the near two
- $\angle BPC = 120^\circ$ — the angle at $P$, which gives the side with the Law of Cosines
- $PA = PB + PC \implies P$ on arc $BC$ — the converse: for any point $P$ in the plane, $PA \le PB + PC$, with equality only on that arc

## Conditions
$P$ lies on the arc $BC$ that does not contain $A$. For any other point, $PA \lt PB + PC$ (Pompeiu's theorem: the three distances form a genuine triangle), so equality pins $P$ to the arc.

## Why it works
Apply [[ptolemys-theorem|Ptolemy's Theorem]] to the cyclic quadrilateral $ABPC$, with $P$ on arc $BC$: $PA \cdot BC = PB \cdot CA + PC \cdot AB$. All three triangle sides are equal, so they divide out and leave $PA = PB + PC$.

The converse comes from [[ptolemys-inequality|Ptolemy's Inequality]], which holds for any four points: $PA \cdot BC \le PB \cdot CA + PC \cdot AB$, with equality exactly when $A$, $B$, $P$, $C$ lie on a circle in that order. Dividing by the common side $s$ gives $PA \le PB + PC$ for every point $P$, and equality forces $ABPC$ to be cyclic with $P$ between $B$ and $C$, that is, $P$ on arc $BC$.

$$PA \cdot s \le PB \cdot s + PC \cdot s \implies PA \le PB + PC.$$

So when one of a point's three distances to the vertices of an equilateral triangle is the sum of the other two, the point is on the circumcircle, and then $\angle BPC = 180^\circ - \angle BAC = 120^\circ$, the opposite angle of a cyclic quadrilateral.

## Useful observations
- For any point on the circumcircle arc of an equilateral triangle, the longest of the three distances equals the sum of the other two.
- Combined with the Law of Cosines in triangle $PBC$, where $\angle BPC = 120^\circ$, it typically determines all three distances and the side from partial data.

## Applications
Distances from a point on the circumcircle of an equilateral triangle to its vertices, and the side length from those distances.

## Contest profile
A recurring AIME and AMC gem: a point on the circumcircle with two of the three distances given makes the third a one-liner. The related interior-point fact, Pompeiu's theorem, is the companion.
`,

"bretschneiders-formula": String.raw`
## Key forms
- $A = \sqrt{(s - a)(s - b)(s - c)(s - d) - abcd\cos^2\frac{A + C}{2}}$ — the area of any convex quadrilateral with sides $a, b, c, d$, semiperimeter $s$, and opposite angles $A$ and $C$
- $A + C = 180^\circ$ — the cyclic case, where the last term vanishes and the formula becomes Brahmagupta's Formula
- among all quadrilaterals with the same four sides, the cyclic one has the largest area

## Conditions
The quadrilateral is convex, the sides are taken in order, and $A$ and $C$ are opposite angles.

## Why it works
The proof is the same split-and-eliminate as for Brahmagupta's Formula: write the area as the sum of the two triangles cut by a diagonal, equate the two expressions for that diagonal by the Law of Cosines, and eliminate the diagonal. Without the cyclic condition the angle term $abcd\cos^2\frac{A + C}{2}$ survives. Cyclic quadrilaterals have $A + C = 180^\circ$, which kills it; that is the sanity check.

## Useful observations
- The cosine term is never negative, so the area never exceeds $\sqrt{(s - a)(s - b)(s - c)(s - d)}$, which is why the cyclic quadrilateral maximizes the area for given sides.
- The full formula is seldom needed; the maximization fact is what problems test.

## Applications
Areas of quadrilaterals that are not cyclic, and the largest area for four given sides.

## Contest profile
The fact that the cyclic quadrilateral has the largest area occasionally decides an AMC answer; the maximum is computed with Brahmagupta's Formula, and the full formula is cited mentally.
`,

"varignons-theorem": String.raw`
## Key forms
- the midpoints of the sides of any quadrilateral form a parallelogram, with sides parallel to the diagonals and half as long
- $[\text{Varignon parallelogram}] = \frac12[ABCD]$ — its area is half the area of the quadrilateral
- it is a rectangle exactly when the diagonals are perpendicular, and a rhombus exactly when they are equal

## Conditions
Any quadrilateral, including a non-convex one; the midpoints are of the four sides in order.

## Why it works
In each of the two triangles that a diagonal creates, the segment joining the midpoints of two sides is parallel to the diagonal and half as long, by the [[midsegment-theorem|Midsegment Theorem]]. So both pairs of opposite sides of the midpoint quadrilateral are parallel to a diagonal, which makes it a parallelogram with sides $\frac p2$ and $\frac q2$, where $p$ and $q$ are the diagonals. The area halves because each of the four corner triangles cut off has a quarter of the area of the triangle it sits in, and the four corner triangles together make up half of the quadrilateral.

## Useful observations
- The segment joining the midpoints of the diagonals passes through the center of the Varignon parallelogram.
- Its sides are half the diagonals, the bridge to [[euler-quadrilateral|Euler's Quadrilateral Theorem]] and to the diagonal-based [[trapezoid-parallelogram-areas|quadrilateral areas]].
- Parallel-to-the-diagonal sides transfer angle and length conditions from the sides of the quadrilateral to its diagonals.

## Applications
Midpoint figures of quadrilaterals, areas of midpoint parallelograms, and conditions on diagonals from conditions on a midpoint figure.

## Contest profile
The AMC uses it directly, asking what figure the midpoints form and its area; the AIME uses the parallel-to-diagonals property to move conditions from sides to diagonals.
`,

"euler-quadrilateral": String.raw`
## Key forms
- $a^2 + b^2 + c^2 + d^2 = p^2 + q^2 + 4m^2$ — for a quadrilateral with sides $a, b, c, d$, diagonals $p$ and $q$, and $m$ the distance between the midpoints of the diagonals
- $p^2 + q^2 = 2(a^2 + b^2)$ — the parallelogram law: in a parallelogram $c = a$, $d = b$, and $m = 0$ because the diagonal midpoints coincide, so the identity reduces to it
- $a^2 + b^2 + c^2 + d^2 \ge p^2 + q^2$ — with equality exactly for a parallelogram

## Conditions
The identity holds for any quadrilateral, convex or not, with its sides and diagonals as segment lengths.

## Why it works
In vectors, the vector between the midpoints of the diagonals is $\vec m = \frac{(\vec a + \vec c) - (\vec b + \vec d)}{2}$, with $\vec a$, $\vec b$, $\vec c$, $\vec d$ the position vectors of the vertices. Expand all six squared lengths in terms of the vertices; every cross term cancels, leaving the identity. The parallelogram law is the case $m = 0$, where the diagonal midpoints coincide.

In a parallelogram with sides $a$ and $b$ and an angle $\theta$ between them, the other angle is $180^\circ - \theta$, so the Law of Cosines gives the diagonals $p^2 = a^2 + b^2 - 2ab\cos\theta$ and $q^2 = a^2 + b^2 + 2ab\cos\theta$. Adding them cancels the cosines and leaves $$p^2 + q^2 = 2(a^2 + b^2),$$ which is the identity above with $c = a$, $d = b$, and $m = 0$, now seen from the angles instead of from the vectors.

## Useful observations
- The identity relates the four sides, the two diagonals, and the segment $m$: given any five of the seven lengths in a configuration it allows, the remaining one follows.
- The corollary $a^2 + b^2 + c^2 + d^2 \ge p^2 + q^2$ is the quadrilateral form of the inequality behind the parallelogram law.
- The parallelogram law is [[apollonius-theorem|Apollonius's Theorem]] for the median $\frac p2$ of the triangle formed by two adjacent sides and the diagonal $q$, doubled: $p^2 = 2a^2 + 2b^2 - q^2$.

## Applications
Sides and diagonals of quadrilaterals, and the distance between the midpoints of the diagonals.

## Contest profile
Occasional on the AIME when a problem gives all four sides and one diagonal and asks about the other, or about a midpoint segment.
`,

"distance-midpoint": String.raw`
## Key forms
- $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ — the distance between two points
- $M = \left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}\right)$ — the midpoint, the average of the coordinates
- $m = \dfrac{y_2 - y_1}{x_2 - x_1}$ — the slope, rise over run; perpendicular lines have slopes whose product is $-1$
- $\dfrac{P_1 + kP_2}{1 + k}$ — the point dividing the segment from $P_1$ to $P_2$ in the ratio $k : 1$ (the section formula)

## Conditions
Points in the coordinate plane; slope needs $x_1 \ne x_2$ (a vertical line has no slope). The perpendicular rule applies when neither line is vertical.

## Why it works
Each formula comes from the horizontal and vertical legs drawn between the two points.

The horizontal gap $\Delta x = x_2 - x_1$ and the vertical gap $\Delta y = y_2 - y_1$ are the legs of a right triangle whose hypotenuse is the segment, so the Pythagorean Theorem gives $d = \sqrt{\Delta x^2 + \Delta y^2}$. The midpoint is halfway along both legs, which is the average of the coordinates. More generally the point a fraction $t$ of the way from $P_1$ to $P_2$ is $P_1 + t(P_2 - P_1)$, and taking $t = \frac{k}{k + 1}$ gives the section formula.

The slope $\frac{\Delta y}{\Delta x}$ is the rise for each unit of run. Turning a line a quarter turn turns its slope triangle with it, which swaps the run and the rise and reverses one of them: run $1$ and rise $m$ become rise $1$ and run $-m$, a slope of $-\frac1m$. That is why perpendicular slopes multiply to $-1$.

{{figure:quarter-turn}}

In vectors the same fact reads: the directions $(1, m_1)$ and $(1, m_2)$ are perpendicular exactly when their [[vector-dot-product|dot product]] $1 + m_1m_2$ is $0$.

## Useful observations
- Most coordinate work is these three measurements, so the figure is best placed to make them easy: a right angle at the origin with its legs on the axes, a line of symmetry on an axis, and vertices at lattice points where the problem allows.
- Applied to a median, the section formula shows that the centroid of a triangle is the average of its three vertices.
- Setting two distances equal and squaring gives a line, because the $x^2$ and $y^2$ terms cancel; that line is the [[perpendicular-bisector-locus|perpendicular bisector]] of the two points.
- The perpendicular-slope rule gives the equation of an altitude from the slope of its side, or of a tangent from the slope of its radius.

## Applications
Distances and midpoints in coordinate figures, dividing segments in a ratio, altitudes and perpendicular bisectors, and tangent lines.

## Contest profile
In most problems it is the measuring step of a larger plan, often with a [[rotation-90|quarter-turn rotation]], which swaps and negates coordinates exactly as it does the slope triangle. It is the foundation of every [[coordinate-bash|coordinate bash]], and the fastest wins come from choosing the coordinate system well.
`,

"shoelace-formula": String.raw`
## Key forms
- $A = \dfrac12\left|\alt{\sum_{i=1}^{n}(x_iy_{i+1} - y_ix_{i+1})}{(x_1y_2 - y_1x_2) + (x_2y_3 - y_2x_3) + \cdots + (x_ny_1 - y_nx_1)}\right|$ — the area of a polygon from its vertices in order, with the last vertex followed by the first
- $A = \dfrac12\left|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\right|$ — the triangle case
- $A = \dfrac12\left|x_2y_3 - x_3y_2\right|$ — a triangle with one vertex at the origin

## Conditions
The vertices go once around the boundary, in order, either direction, and the polygon does not cross itself. Listing the corners of a quadrilateral as $A, C, B, D$ traces a bow tie, and the formula then returns a wrong area with no warning.

## Why it works
Each term of the sum is twice the signed area of a triangle with one corner at the origin, and adding those triangles around the polygon leaves exactly the polygon.

The triangle with corners $O = (0, 0)$, $P_i = (x_i, y_i)$, and $P_{i+1} = (x_{i+1}, y_{i+1})$ has area $\frac12|x_iy_{i+1} - y_ix_{i+1}|$, [[determinant-geometric|half the determinant]] of the two position vectors. Without the absolute value, the sign records the direction of turn: positive when $O \to P_i \to P_{i+1}$ turns counterclockwise, negative when it turns clockwise.

Picture $O$ outside a convex polygon and walk around the polygon counterclockwise, adding one signed triangle per edge. The edges on the far side of the polygon, as seen from $O$, turn counterclockwise and add their triangles; the edges on the near side turn back the other way and subtract theirs. The triangles to the far edges cover the polygon together with the region between it and $O$, and the triangles to the near edges cover just that region, so the subtraction leaves exactly the polygon.

{{figure:fan}}

The same cancellation happens wherever $O$ is and whatever the polygon's shape, as the full proof shows. Going around clockwise instead flips every sign, and the absolute value repairs that.

## Full proof
Fix a point $Q$ not on the boundary, and ask how many times the signed triangles count it. $Q$ lies in the triangle for the edge $P_iP_{i+1}$ exactly when that edge crosses the ray from $O$ through $Q$ at a point beyond $Q$, and the triangle's sign records which way the edge crosses the ray: for a counterclockwise polygon, positive where the boundary leaves the polygon along the ray and negative where it enters.

Follow the ray outward from $Q$. It meets the boundary finitely many times, alternately leaving and entering the polygon, and it ends outside, since the polygon is bounded. If $Q$ is outside, the crossings beyond it pair off, one entry with the next exit, and $Q$ is counted $0$ times in total. If $Q$ is inside, the first crossing is an exit and the rest pair off, so $Q$ is counted exactly once.

So the sum of the signed triangle areas counts each point inside the polygon once and each point outside it zero times, which means it equals the area of the polygon. Rays that pass through a vertex, and points on the boundary, form a set of zero area and do not affect the total.

## Useful observations
- Written as a column of vertices in order around the polygon, with the first copied again at the bottom, the formula is: add the products of each $x$ with the $y$ in the row below, add the products of each $y$ with the $x$ in the row below, and halve the absolute difference. Keeping the two sums separate avoids most sign slips.
- Moving one vertex to the origin first shortens the triangle case to a single determinant.
- With lattice vertices it pairs with [[picks-theorem|Pick's Theorem]], which converts the area into a count of lattice points or back.

## Applications
Areas of polygons given by coordinates, areas in coordinate geometry setups, and lattice polygons.

## Contest profile
Never alone: it is the last step once [[coordinate-bash|coordinates]] are set up, or one of the areas in an [[area-method|area argument]]. The one trap is vertex order, since a self-crossing listing gives a wrong area silently.
`,

"picks-theorem": String.raw`
## Key forms
- $A = I + \dfrac B2 - 1$ — the area of a lattice polygon with $I$ interior lattice points and $B$ boundary lattice points
- $\gcd(\lvert\Delta x\rvert, \lvert\Delta y\rvert)$ — the number of boundary lattice points on a side, counting one endpoint, so the side contributes $\gcd - 1$ interior points
- $I + B = A + \dfrac B2 + 1$ — the total number of lattice points in the polygon
- $A = I + \dfrac B2 + h - 1$ for a polygon with $h$ holes

## Conditions
The polygon is simple, with no self-crossings, and every vertex is a lattice point. A hole is a separate boundary and changes the formula as above.

## Why it works
Both sides are additive when gluing polygons along a shared edge, and the formula checks on unit lattice triangles, with area $\frac12$, $I = 0$, and $B = 3$. Induction on triangulations does the rest.

For a triangle of this kind with $I = 0$ and $B = 3$, the formula gives $0 + \frac32 - 1 = \frac12$, the area of the smallest lattice triangle. Every lattice polygon can be cut into such triangles, so the formula holds throughout.

## Useful observations
- Three quantities, one equation: any two give the third.
- The boundary points on a segment between lattice points $(x_1, y_1)$ and $(x_2, y_2)$ number $\gcd(\lvert\Delta x\rvert, \lvert\Delta y\rvert) + 1$ including endpoints, and that gcd count is half of most Pick's problems.
- It also runs in reverse: given the interior and boundary counts, the area is deduced without seeing the polygon.

## Applications
Areas of lattice polygons, counting interior lattice points, and recovering the area from lattice-point counts.

## Contest profile
AMC and AIME lattice-polygon problems: the shoelace formula for $A$, gcd sums for $B$, and Pick's Theorem for $I$.
`,

"point-line-distance": String.raw`
## Key forms
- $d = \dfrac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$ — the distance from $(x_0, y_0)$ to the line $Ax + By + C = 0$
- a circle with center $(h, k)$ and radius $r$ is tangent to the line exactly when $\dfrac{|Ah + Bk + C|}{\sqrt{A^2 + B^2}} = r$
- without the absolute value, the sign of $Ax_0 + By_0 + C$ says which side of the line the point is on

## Conditions
The line is written with everything on one side, $Ax + By + C = 0$ and $(A, B) \ne (0, 0)$.

## Why it works
The vector $(A, B)$ is perpendicular to the line, and the distance is the part of any vector from the line to the point that runs in that perpendicular direction.

$(A, B)$ is perpendicular to the line because for two of its points, $Ax_1 + By_1 + C = 0$ and $Ax_2 + By_2 + C = 0$, and subtracting gives $A(x_2 - x_1) + B(y_2 - y_1) = 0$: the [[vector-dot-product|dot product]] of $(A, B)$ with every direction along the line is $0$.

Now take any point $Q = (x_1, y_1)$ of the line and the vector from $Q$ to $P = (x_0, y_0)$. Its component along the unit normal $\frac{(A, B)}{\sqrt{A^2 + B^2}}$ is the perpendicular distance, whichever $Q$ is chosen, and it equals $\frac{A(x_0 - x_1) + B(y_0 - y_1)}{\sqrt{A^2 + B^2}}$. Since $Ax_1 + By_1 = -C$, the numerator is $Ax_0 + By_0 + C$.

{{figure:projection}}

## Useful observations
- The line must be rewritten as $Ax + By + C = 0$ first: the distance from $(3, 1)$ to $y = -\frac34x + \frac{25}{4}$ uses $3x + 4y - 25 = 0$ and is $\frac{|9 + 4 - 25|}{5} = \frac{12}{5}$.
- Tangency becomes one equation that replaces solving a quadratic for a double root.
- With coordinates for a triangle, it gives each altitude as the distance from a vertex to the line through the other two. In three dimensions the same formula with one more term gives the distance from a point to a plane. The distance between two parallel lines is this formula applied once, and it has its own card, [[parallel-lines-distance|Distance Between Parallel Lines]].

## Applications
Distances from points to lines, distances between parallel lines, tangent circles and lines, altitudes in coordinates, and which side of a line a point lies on.

## Contest profile
It is the step inside a [[coordinate-bash|coordinate bash]] that handles a circle tangent to a line, often next to [[tangent-facts|tangent-length facts]], and its three-dimensional form measures heights in solids.
`,

"circle-equation": String.raw`
## Key forms
- $(x - h)^2 + (y - k)^2 = r^2$ — the circle with center $(h, k)$ and radius $r$
- $x^2 + y^2 + Dx + Ey + F = 0$ — the general form, with center $\left(-\frac D2, -\frac E2\right)$ and $r^2 = \frac{D^2 + E^2}{4} - F$
- $D^2 + E^2 \gt 4F$ — the condition for the general form to be a real circle; equality gives a single point and less gives no points

## Conditions
The coordinates are Cartesian and $r \gt 0$. Completing the square converts between the two forms, and a quadratic in $x$ and $y$ is a circle only when the coefficients of $x^2$ and $y^2$ are equal and there is no $xy$ term.

## Why it works
A circle is the set of points at a fixed distance from a center, and the distance formula turns that sentence into an equation.

A point $(x, y)$ is at distance $r$ from $(h, k)$ exactly when $\sqrt{(x - h)^2 + (y - k)^2} = r$. Both sides are nonnegative, so squaring loses nothing and gives the standard form.

Expanding gives $x^2 + y^2 - 2hx - 2ky + (h^2 + k^2 - r^2) = 0$, the general form with $D = -2h$, $E = -2k$, and $F = h^2 + k^2 - r^2$. Going backwards, completing the square gives $$\left(x + \tfrac D2\right)^2 + \left(y + \tfrac E2\right)^2 = \frac{D^2 + E^2}{4} - F,$$ a circle only when the right side is positive; zero gives a single point, and a negative value gives no points at all.

## Useful observations
- Completing the square reads off the center and radius: $x^2 - 6x + y^2 + 4y = 12$ becomes $(x - 3)^2 + (y + 2)^2 = 25$, with center $(3, -2)$ and radius $5$.
- The circle through three points comes from substituting them into the general form. The unknowns $D$, $E$, and $F$ appear linearly, so this is a linear system, which is the reason to prefer the general form here.
- To intersect a circle with a line, the line is substituted into the circle and the quadratic solved; whether they meet, and tangency in particular, is decided by its discriminant, as on [[tangency-condition|the tangency card]].

## Applications
Finding the center and radius from an equation, the circle through three points, intersections with lines and circles, and recognizing circles hidden in a condition on complex numbers.

## Contest profile
Three problems here, all AIME, none solved by it alone. The usual moves are to write two circle equations and subtract them, to complete the square to find two circles' centers before a [[tangent-circles|tangency]] argument, or to recognize circles hidden in a condition on complex numbers. Subtracting two circles' equations cancels the squares and leaves the [[radical-axis|radical axis]], the line through their intersection points, which turns a common-chord question into arithmetic.
`,

"british-flag-theorem": String.raw`
## Key forms
- $PA^2 + PC^2 = PB^2 + PD^2$ — for any point $P$ and rectangle $ABCD$, the sums of squared distances to opposite corners are equal
- $PA^2 + PG^2 = PB^2 + PH^2 = PC^2 + PE^2 = PD^2 + PF^2$ — the same for a rectangular box $ABCDEFGH$, over all four pairs of opposite vertices
- $2PA^2 + PG^2 = PB^2 + PD^2 + PE^2$ — for the vertex $A$ of a box, its three neighbors $B$, $D$, $E$ (the box is $ABCD$ below and $EFGH$ above, with $E$ over $A$), and the opposite vertex $G$; note that $C$ is a face diagonal from $A$, not a neighbor

## Conditions
$ABCD$ is a rectangle, and $P$ may be anywhere: inside, outside, or off the plane of the rectangle. The statement needs a rectangle, not an arbitrary parallelogram.

## Why it works
Set up coordinates with the rectangle's sides on the axes: each squared distance expands into sums of squared coordinate differences, and both pairings select the same four terms. No planarity is even required, so it survives in three dimensions.

For a box with vertex $A$ at the origin and neighbors $B$, $D$, $E$ along the axes, both $2PA^2 + PG^2$ and $PB^2 + PD^2 + PE^2$ equal $3\lvert P\rvert^2 - 2P \cdot (a, b, c) + a^2 + b^2 + c^2$, which proves the second form.

## Useful observations
- With three of the four corner distances known, the fourth follows immediately.
- It is also usable in reverse as a rectangle detector, and in problems that only implicitly contain the rectangle: one is completed from a right angle.
- The naive approach, coordinates with four unknowns, is slow and the theorem is one line.

## Applications
A missing distance from a point to a corner of a rectangle or box, and problems with a point and a hidden rectangle.

## Contest profile
An AMC favorite exactly because the naive approach is slow and the theorem is one line; when the distances to three corners are given, the pattern is recognized instantly.
`,

"rotation-90": String.raw`
## Key forms
- $(x, y) \mapsto (-y, x)$ — a quarter turn counterclockwise about the origin, and $(x, y) \mapsto (y, -x)$ for a quarter turn clockwise
- $(x, y) \mapsto (-x, -y)$ — a half turn about the origin
- $(x, y) \mapsto (x\cos\theta - y\sin\theta,\; x\sin\theta + y\cos\theta)$ — a counterclockwise turn by $\theta$ about the origin
- $A' = C + R_\theta(A - C)$ — a turn about any center $C$, measured from $C$
- $z \mapsto e^{i\theta}z$ — the same rotation in complex numbers, and $z \mapsto iz$ for a quarter turn

## Conditions
The axes are in the usual orientation, so counterclockwise is the positive direction and the $y$-axis points up. Reversing the turn replaces $\theta$ with $-\theta$.

## Why it works
A rotation preserves sums and multiples, so it is decided by what it does to the two unit steps $(1, 0)$ and $(0, 1)$.

Turning $(1, 0)$ by $\theta$ lands on $(\cos\theta, \sin\theta)$, by the definition of cosine and sine on the unit circle. The step $(0, 1)$ is $(1, 0)$ already turned by $90^\circ$, so turning it by $\theta$ more lands at angle $90^\circ + \theta$, the point $(-\sin\theta, \cos\theta)$.

A point $(x, y)$ is $x$ steps of the first kind plus $y$ of the second, and rotating the picture rotates each step, so $$(x, y) \mapsto x(\cos\theta, \sin\theta) + y(-\sin\theta, \cos\theta) = (x\cos\theta - y\sin\theta,\; x\sin\theta + y\cos\theta).$$

{{figure:basis}}

At $\theta = 90^\circ$, $\cos\theta = 0$ and $\sin\theta = 1$, so $(x, y)$ goes to $(-y, x)$: the coordinates swap and the new first one changes sign. A clockwise quarter turn gives $(y, -x)$.

## Useful observations
- To rotate about a point $C$ other than the origin, the work is done relative to $C$. Turning $A = (3, 4)$ a quarter turn counterclockwise about $C = (1, 1)$: relative to $C$ the point is $(2, 3)$, which turns into $(-3, 2)$, and adding $C$ back gives $A' = (-2, 3)$.

{{figure:about-a-point}}

- Squares are the main application. If $PQ$ is one side, turning the vector from $P$ to $Q$ a quarter turn and adding it to both $P$ and $Q$ gives the other two vertices; turning it the other way gives the square on the other side.
- In complex numbers the same computation is $z \mapsto c + e^{i\theta}(z - c)$, often the least error-prone form for angles other than $90^\circ$.

## Applications
The other vertices of a square or an equilateral triangle placed in coordinates, the image of a point under a turn about a center, and the [[rotation-center|center of a rotation]] found from a point and its image.

## Contest profile
Seven problems here, five of them AIME, none by it alone; two do the rotation in complex numbers instead, and one finds the center of a rotation from a point and its image. The usual setting is a square or an equilateral triangle placed in coordinates, where one side and a rotation give every other vertex.
`,

"eulers-polyhedron-formula": String.raw`
## Key forms
- $V - E + F = 2$ — vertices minus edges plus faces, for any convex polyhedron, and for any connected planar graph with the outer region counted as a face
- $2E \ge 3F$ and $2E \ge 3V$ — when every face has at least $3$ edges and every vertex has degree at least $3$
- $E \le 3V - 6$ and $F \le 2V - 4$ — the bounds that follow
- $V - E + F = 2 - 2g$ for a surface with $g$ holes, so a doughnut-shaped polyhedron has $V - E + F = 0$

## Conditions
The polyhedron is convex, or more generally has no holes, and the graph is connected. Every edge borders exactly two faces and meets two vertices, which is what the double counts below use.

## Why it works
Flatten the polyhedron into a planar graph by removing one face and stretching; then induct. Each added edge either creates a new face, when it joins two vertices already connected, or attaches a new vertex, when it does not, and in both cases $V - E + F$ is unchanged. The sphere's Euler characteristic $2$ is what is really being computed.

## Useful observations
- Face-edge and vertex-edge double counts combine with the formula. Each edge lies on two faces, so adding up the sides of every face counts every edge twice, and similarly for the degrees at the vertices.
- These with $V - E + F = 2$ generate all the classic bounds, $E \le 3V - 6$, the existence of a vertex of degree at most $5$, and the fact that only five Platonic solids exist.
- Problems of the form "the faces are pentagons and hexagons, each vertex meets $3$ faces" are systems of equations: the two double counts and Euler's Formula, set up mechanically and solved.

## Applications
Counting vertices, edges, and faces of polyhedra, planar graphs and maps, and proofs that a configuration cannot exist.

## Contest profile
AMC and AIME polyhedron problems are systems of equations: face-edge and vertex-edge double counts plus Euler's Formula. The double count is what makes the formula usable, since $E$ is the quantity least often handed over.
`,

"prism-pyramid-volumes": String.raw`
## Key forms
- $V = Bh$ — a prism or cylinder: base area times height
- $V = \tfrac13Bh$ — a pyramid or cone with the same base and height
- the height is the perpendicular distance from the apex (or top face) to the plane of the base, so a slanted solid has the volume of an upright one

## Conditions
$B$ is the area of the base and $h$ the perpendicular height. Any face of a pyramid can serve as its base.

## Why it works
A prism is a stack of identical slices, and a pyramid is a stack of slices that shrink toward the apex, which is where the one-third comes from.

Slice a prism parallel to its base. Every slice is a copy of the base with area $B$, so a stack of $n$ slices of thickness $\frac hn$ has volume $n \cdot B \cdot \frac hn = Bh$. Sliding the slices sideways changes nothing, which is [[cavalieris-principle|Cavalieri's Principle]]: a slanted prism has the same volume as a straight one.

For a pyramid, the slice at height $z$ above the base is a copy of the base scaled by $\frac{h - z}{h}$, so its area is $B\left(\frac{h - z}{h}\right)^2$, and these shrinking slices add up to $\frac13Bh$. The third can be seen without calculus: a cube of side $s$ splits into three congruent square pyramids, each with one face of the cube as its base and the same far corner as its apex, and each has base $s^2$, height $s$ and volume $\frac{s^3}{3} = \frac13Bh$.

{{figure:cube}}

By Cavalieri, any pyramid with the same base area and height has the same volume, whatever the shape of its base.

## Useful observations
- Because any face of a tetrahedron can serve as the base, computing the volume with one base and equating it with the volume from another gives heights that are hard to reach directly, such as the distance from a vertex to a slanted face.
- An oblique solid has the same volume as the right one with the same base and height.
- Three mutually perpendicular edges $p$, $q$, $r$ from one vertex give a tetrahedron of volume $\frac16pqr$, an easy base-and-height pair.

## Applications
Volumes of prisms, cylinders, pyramids, and cones, and distances from a point to a plane through two ways of computing one volume.

## Contest profile
Mostly an AIME topic. The volume is usually the frame, with [[pythagorean-theorem|the Pythagorean Theorem]] supplying a height or an edge, and the standard move is to compute a volume with an easy base and read it again with a different base to extract an inaccessible height.
`,

"sphere-formulas": String.raw`
## Key forms
- $SA = 4\pi r^2$ and $V = \dfrac43\pi r^3$ — surface area and volume of a sphere of radius $r$
- $\dfrac{\pi h^2(3r - h)}{3}$ — the volume of a spherical cap of height $h$
- $2\pi rh$ — the area of a spherical zone of height $h$ (and so of a cap): only the height matters
- the sphere takes $\dfrac23$ of the volume and of the surface area of its circumscribing cylinder

## Conditions
The cap has $0 \le h \le 2r$. The zone formula holds for the curved surface between any two parallel planes, whatever their distance from the center.

## Why it works
Archimedes compared the sphere with the cylinder around it. At height $z$ above the center, the cross-section of the sphere is a disc of area $\pi(r^2 - z^2) = \pi r^2 - \pi z^2$, which is the cross-section of the cylinder of radius $r$ with the double cone $\pi z^2$ removed. Slice for slice the two solids have the same area, so by [[cavalieris-principle|Cavalieri's Principle]] they have the same volume, $2\pi r^3 - 2\cdot\frac13\pi r^3 = \frac43\pi r^3$.

The surface area follows because the sphere of radius $r$ is made of thin shells: the volume grows by $4\pi r^2\,\mathrm{d}r$ when the radius grows by $\mathrm{d}r$, so $SA = \frac{\mathrm{d}V}{\mathrm{d}r} = 4\pi r^2$.

The zone formula is Archimedes' hat-box theorem: the area of the curved surface between two parallel planes equals the lateral area $2\pi r \cdot h$ of the cylinder of radius $r$ around the sphere between the same planes. The full sphere is the case $h = 2r$, and the cap volume is the volume of the full ball cut by the plane, $\frac{\pi h^2(3r - h)}{3}$.

## Useful observations
- Spherical caps and zones occasionally matter: the cap volume and the zone area are derived from the full formulas when needed, and that only the height matters is striking.
- Spheres inscribed in or circumscribed about solids turn on finding the right [[cross-section-method|cross-section]], reducing a three-dimensional picture to a two-dimensional incircle or circumcircle.
- Ratio problems (sphere in cylinder in cube) reward remembering Archimedes' $\frac23$.

## Applications
Volumes and surface areas of balls, caps, and zones, spheres in cylinders and cubes, and cut spheres.

## Contest profile
Spheres inscribed in or circumscribed about solids are common on the AIME; the whole game is the cross-section.
`,

"cone-formulas": String.raw`
## Key forms
- $\ell = \sqrt{r^2 + h^2}$ — the slant height, from the tip to the edge of the base
- $\pi r\ell$ — the lateral surface area (not $\pi rh$)
- $SA = \pi r\ell + \pi r^2$ — the total surface area, lateral plus base
- $\theta = \dfrac{2\pi r}{\ell}$ — the angle of the sector that the lateral surface unrolls to

## Conditions
A right circular cone with base radius $r$ and height $h$ measured along the axis. The lateral formulas use the slant height $\ell$, never $h$.

## Why it works
The height, the base radius, and the slant height form a right triangle through the tip of the cone, so $\ell^2 = r^2 + h^2$.

{{figure:slant}}

For the area, cut the lateral surface along a slant line and flatten it. Every point of the base's edge is $\ell$ from the tip, so the surface flattens into a sector of a circle of radius $\ell$, and its arc is the base's circumference, $2\pi r$. A sector's area is half its arc times its radius, $\frac12 \cdot 2\pi r \cdot \ell = \pi r\ell$, and the sector is the fraction $\frac{2\pi r}{2\pi\ell} = \frac r\ell$ of a full circle.

Adding the base, $\pi r^2$, gives the total surface area. The volume is not a surface fact: it has its home on [[prism-pyramid-volumes|Prism, Pyramid, Cylinder, Cone Volumes]], a third of the base area times the height.

## Useful observations
- The unrolled sector is the problem half the time: its angle is $\frac{2\pi r}{\ell}$ radians, the fraction $\frac r\ell$ of a full turn.
- A shortest path on the cone's surface becomes a straight segment in the unrolled sector, which is how the ant-walks-around-a-cone problems are done; see [[unfold-the-surface|shortest paths on surfaces]].
- A sector rolled into a cone keeps its radius as the slant height and its arc as the base's circumference, which fixes $r$ and then $h$.
- A plane parallel to the base cuts off a smaller cone similar to the whole, so the areas and volumes scale by the square and the cube of the ratio, as with [[similar-figures-ratios|similar figures]].

## Applications
Surface area and volume of cones, cones rolled from sectors, paths on a cone, and cones cut by planes parallel to the base.

## Contest profile
Mostly an AIME topic. The classic setups are an ant walking around a cone, a cone rolled from a sector, and a cone rolling on a table, where the slant height is the radius of the circle its base traces.
`,

"frustum-volume": String.raw`
## Key forms
- $V = \dfrac h3\left(A_1 + A_2 + \sqrt{A_1A_2}\right)$ — the volume of a truncated pyramid or cone with parallel base areas $A_1$ and $A_2$ and height $h$ between them
- $V = \dfrac{\pi h}{3}\left(R^2 + Rr + r^2\right)$ — the frustum of a cone with radii $R$ and $r$
- the frustum is a large pyramid minus a similar small one, so heights scale like lengths and volumes like cubes

## Conditions
The two faces are parallel and similar, with $A_1$ and $A_2$ their areas, and $h$ is the perpendicular distance between them. If $A_2 = 0$ it is a pyramid, and if $A_1 = A_2$ it is a prism.

## Why it works
A frustum is a big pyramid minus a similar small one cut off at the top. Let the small one have height $x$, so the big one has height $x + h$. Cross-sections scale as the square of the distance from the apex, so
$$\frac{x}{x + h} = \frac{\sqrt{A_2}}{\sqrt{A_1}}, \qquad x = \frac{h\sqrt{A_2}}{\sqrt{A_1} - \sqrt{A_2}}, \qquad x + h = \frac{h\sqrt{A_1}}{\sqrt{A_1} - \sqrt{A_2}}.$$

Subtracting the two pyramid volumes,
$$V = \frac13\left(A_1(x + h) - A_2x\right) = \frac h3 \cdot \frac{\sqrt{A_1}^{\,3} - \sqrt{A_2}^{\,3}}{\sqrt{A_1} - \sqrt{A_2}} = \frac h3\left(A_1 + \sqrt{A_1A_2} + A_2\right),$$
by the difference of cubes. When $A_1 = A_2$ there is no apex, but the formula gives $hA_1$, the prism. For a cone, $A_1 = \pi R^2$ and $A_2 = \pi r^2$ give $\frac{\pi h}3(R^2 + Rr + r^2)$.

## Useful observations
- It is often cleaner to restore the apex: the frustum is extended to the full cone or pyramid, the two similar solids are worked with ($k$ and $k^3$ scaling), and the small one is subtracted.
- The closed formula is used when the two base areas are the given data.

## Applications
Truncated cones and pyramids, buckets and cups, and any solid between two parallel similar cross-sections.

## Contest profile
Truncated-solid problems on the AMC and AIME nearly always reward apex restoration: heights scale like linear dimensions, volumes like cubes, and the frustum is a difference of the two.
`,

"distance-3d": String.raw`
## Key forms
- $d = \sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2}$ — the distance between two points of space
- $M = \left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}, \dfrac{z_1 + z_2}{2}\right)$ — the midpoint, coordinate by coordinate
- $\dfrac{P_1 + kP_2}{1 + k}$ — the point dividing $P_1P_2$ in the ratio $k : 1$
- $(x - a)^2 + (y - b)^2 + (z - c)^2 = r^2$ — the sphere of center $(a, b, c)$ and radius $r$, from fixing $d = r$

## Conditions
The coordinates are Cartesian, with the axes mutually perpendicular. Every planar coordinate identity carries over with one more coordinate.

## Why it works
One Pythagorean step per axis. Take the axis-aligned box whose opposite corners are the two points. Its base diagonal is $\sqrt{(\Delta x)^2 + (\Delta y)^2}$ by the Pythagorean Theorem, and the remaining rise $\Delta z$ is perpendicular to the whole base plane, so a second right triangle closes on it.

Perpendicular contributions add in squares, one axis at a time, which is why the pattern keeps going into any number of dimensions.

## Useful observations
- Coordinatizing first lets the formula do the rest, which is the usual reason the three-dimensional playbook opens by choosing axes.
- When the two points are opposite corners of a box, the distance is [[space-diagonal|the space diagonal]], the special case where the coordinate differences are the edge lengths themselves.
- Reading $d$ as a constant gives the sphere, so a tangency or an equidistance condition becomes one equation rather than a picture.
- The farthest two points on two spheres lie on the line through the centers, at $d + r_1 + r_2$, and the nearest at $d - r_1 - r_2$, where $d$ is the distance between the centers; any other pair detours off that line.

## Applications
Distances, midpoints, and dividing points in space, and sphere conditions such as tangency and equidistance.

## Contest profile
The most common use is a sphere condition in disguise: a point at a fixed distance from a center, or two centers whose separation is compared against $r_1 + r_2$.
`,

"space-diagonal": String.raw`
## Key forms
- $d = \sqrt{\ell^2 + w^2 + h^2}$ — the space diagonal of a box with edges $\ell$, $w$, $h$
- cube of side $s$: space diagonal $s\sqrt3$, face diagonal $s\sqrt2$
- $d = \sqrt{\dfrac{p^2 + q^2 + r^2}{2}}$ — from the three face diagonals $p$, $q$, $r$
- $d^2 = (\ell + w + h)^2 - 2(\ell w + wh + h\ell)$ — from the edge sum and the surface area

## Conditions
A rectangular box with right angles throughout. The same distance formula holds in space for any two points: $\sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$.

## Why it works
The space diagonal is the hypotenuse of a right triangle whose legs are a diagonal of the base and a vertical edge.

The base diagonal has length $\sqrt{\ell^2 + w^2}$ by the Pythagorean Theorem, as in the figure at the top. The vertical edge is perpendicular to the whole base, so it is perpendicular to that diagonal too, and a second application gives $d^2 = (\ell^2 + w^2) + h^2$. The same step works in any number of perpendicular directions: squared lengths add.

Face diagonals work the same way. Each is the hypotenuse over two of the edges, so adding the three squares counts every edge twice: $p^2 + q^2 + r^2 = 2(\ell^2 + w^2 + h^2) = 2d^2$.

## Useful observations
- Contest problems give the box indirectly, through the sum of its edges and its surface area, and never the edges themselves. The [[square-of-sum|square of a sum]] then gives the diagonal at once, since the total edge length is $4(\ell + w + h)$ and the surface area is $2(\ell w + wh + h\ell)$, so there is no need to find $\ell$, $w$, or $h$.
- The smallest sphere containing a box has diameter equal to the space diagonal, which links this card to optimization problems solved with [[vietas-general|Vieta's Formulas]].

## Applications
Diagonals of boxes and cubes, distances in space, and boxes given by edge sum and surface area.

## Contest profile
Never alone: the square-of-a-sum identity is the usual partner. Typical versions give the total edge length and the surface area and ask for the diagonal.
`,

"cross-product-area": String.raw`
## Key forms
- $[\triangle] = \dfrac12\lvert\vec u \times \vec v\rvert$ — the area of the triangle on edge vectors $\vec u$ and $\vec v$ from one vertex
- $V_{\text{tetrahedron}} = \dfrac16\left\lvert\vec u \cdot (\vec v \times \vec w)\right\rvert$ — the volume of the tetrahedron on three edge vectors from one vertex
- $\lvert\vec u \times \vec v\rvert = \lvert\vec u\rvert\lvert\vec v\rvert\sin\theta$ — the parallelogram area, and the cross product is perpendicular to both vectors
- $\vec u \cdot (\vec v \times \vec w) = 0$ exactly when the three vectors are coplanar

## Conditions
The vectors are in three-dimensional space, and the cross product is anticommutative, so the order sets the sign. Only the absolute values give areas and volumes.

## Why it works
Step 1, the length. Expanding the components gives Lagrange's Identity,
$$\lvert\vec u \times \vec v\rvert^2 = \lvert\vec u\rvert^2\lvert\vec v\rvert^2 - (\vec u \cdot \vec v)^2 = \lvert\vec u\rvert^2\lvert\vec v\rvert^2\sin^2\theta,$$
so $\lvert\vec u \times \vec v\rvert$ is base times height of the parallelogram on $\vec u$ and $\vec v$, and the triangle is half of it. The products $\vec u \cdot (\vec u \times \vec v)$ and $\vec v \cdot (\vec u \times \vec v)$ are determinants with a repeated row, so they are $0$: the cross product is perpendicular to both.

Step 2, the volume. Since $\vec v \times \vec w$ is perpendicular to the base, $\lvert\vec u \cdot (\vec v \times \vec w)\rvert$ is the base area $\lvert\vec v \times \vec w\rvert$ times $\lvert\vec u\rvert\lvert\cos\varphi\rvert$, the height of $\vec u$ above the base. That is the parallelepiped's volume, and it is $0$ exactly when the height is $0$, the coplanar case.

Step 3. The tetrahedron has half the base and is a pyramid, so its volume is $\frac13 \cdot \frac12 = \frac16$ of the parallelepiped. Solving $V = \frac13 \cdot (\text{base area}) \cdot h$ for $h$ gives the distance from the apex to the base plane.

## Useful observations
- The triple product is a $3 \times 3$ determinant of the edge vectors: its sign gives orientation and its absolute value gives volume.
- The coplanarity test is that the triple product is $0$.
- For a triangle in three dimensions, the cross product replaces finding the plane and an altitude.
- The distance from a point to a plane is the volume times $3$ divided by the base area.

## Applications
Areas of coordinate triangles in three dimensions, volumes of tetrahedra, coplanarity tests, and the distance from a point to a plane.

## Contest profile
AIME three-dimensional problems, tetrahedra with given coordinates or edge relations, reduce to one determinant. It is the shoelace formula's big sibling.
`,

"de-guas-theorem": String.raw`
## Key forms
- $A_0^2 = A_1^2 + A_2^2 + A_3^2$ — in a tetrahedron with three mutually perpendicular edges at one vertex, the squared area of the face opposite that vertex is the sum of the squared areas of the three right-angle faces
- $V = \dfrac{abc}{6}$ — the volume, for perpendicular edges $a, b, c$
- $\dfrac{1}{h^2} = \dfrac1{a^2} + \dfrac1{b^2} + \dfrac1{c^2}$ — the altitude $h$ from the right-angle vertex to the opposite face

## Conditions
The three edges at one vertex are mutually perpendicular, a trirectangular corner, like a sliced box corner. The theorem does not hold for a general tetrahedron.

## Why it works
Place the vertex at the origin with the edges $a, b, c$ on the axes. The three right-angle faces have areas $\frac{ab}2$, $\frac{bc}2$, and $\frac{ca}2$, and the far face has area half the length of the cross product of two of its edge vectors, which squares to exactly the sum of the three squared leg-face areas.

The altitude relation follows by computing the volume two ways: $V = \frac{abc}{6} = \frac13A_0h$, and $A_0^2 = \frac14(a^2b^2 + b^2c^2 + c^2a^2)$.

## Useful observations
- Given the three perpendicular edges, all four face areas follow; given three face areas, the fourth is one square root away.
- The relation for the altitude is the three-dimensional analogue of the right-triangle altitude relation, the [[altitude-hypotenuse|altitude to the hypotenuse]].

## Applications
Sliced-cube-corner problems, faces and volume of a trirectangular tetrahedron, and the distance from a vertex to the cutting plane.

## Contest profile
Sliced-cube-corner problems on the AMC and AIME. The companion facts for the same solid are the volume and the reciprocal-square altitude relation.
`,

"regular-tetrahedron": String.raw`
## Key forms
- $h = \frac{s\sqrt6}{3}$, $V = \frac{s^3\sqrt2}{12}$, and surface area $s^2\sqrt3$
- $R = \frac{s\sqrt6}{4}$ and $r = \frac{s\sqrt6}{12}$, so $R = 3r$ and the center is a quarter of the way up the height from each face
- the dihedral angle is $\arccos\frac13 \approx 70.5^\circ$, and an edge makes an angle with a face whose cosine is $\frac{1}{\sqrt3}$
- opposite edges are perpendicular and $\frac{s}{\sqrt2}$ apart
- the alternate vertices of a cube of edge $e$ form a regular tetrahedron of edge $e\sqrt2$ and volume $\frac{e^3}{3}$; the centers of four equal spheres that touch in pairs form one of edge twice the radius

## Conditions
All six edges are equal. A tetrahedron with only the opposite edges equal in pairs is the case of [[isosceles-tetrahedron|Isosceles Tetrahedron]] that this one specializes.

## Why it works
The apex lies over the center of the base, which is the centroid of the equilateral triangle, at distance $\frac{s}{\sqrt3}$ from each base vertex. One Pythagorean step gives $h^2 = s^2 - \frac{s^2}{3} = \frac{2s^2}{3}$, so $h = \frac{s\sqrt6}{3}$, and $V = \frac13 \cdot \frac{\sqrt3}{4}s^2 \cdot h = \frac{s^3\sqrt2}{12}$. The four faces have total area $4 \cdot \frac{\sqrt3}{4}s^2 = s^2\sqrt3$.

The center is at distance $r$ from every face, so the four pyramids it makes with the faces have volume $\frac13 S r$ in total, and $r = \frac{3V}{S} = \frac h4$. The remaining distance to the apex is $R = \frac{3h}{4} = \frac{s\sqrt6}{4}$, which is $3r$.

For the dihedral angle, the altitudes of two faces to their common edge each have length $\frac{s\sqrt3}{2}$ and meet at the midpoint of the edge. Their far ends are two vertices $s$ apart, so the Law of Cosines gives $s^2 = 2 \cdot \frac{3s^2}{4}\left(1 - \cos\theta\right)$ and $\cos\theta = \frac13$. The edge makes an angle with the base whose cosine is the horizontal part over the edge, $\frac{s/\sqrt3}{s} = \frac{1}{\sqrt3}$.

In the cube picture with edge $e = \frac{s}{\sqrt2}$, opposite edges are face diagonals of opposite faces, which are perpendicular and the length of a cube edge apart, $e = \frac{s}{\sqrt2}$, and the volume is the cube minus four corners of $\frac{e^3}{6}$ each, $e^3 - \frac{4e^3}{6} = \frac{e^3}{3}$.

## Useful observations
- The center is the average of the four vertices and divides each median in the ratio $3 : 1$, the case of [[tetrahedron-centroid|Tetrahedron Centroid & Medians]] in which it is also the circumcenter and the incenter.
- A [[regular-octahedron|regular octahedron]] of the same edge has volume four times this one, and its other facts are on its own card.

## Applications
Heights, volumes, and radii of regular tetrahedra, tetrahedra inside cubes, and centers of four equal spheres packed in pairs.

## Contest profile
Usually a solid seen inside a cube, a sphere, or an octahedron: stated outright it is a short chain of Pythagorean steps, and hidden it is the cube. The volume, the two radii, and the cube picture are the facts worth having ready.
`,

"equilateral-triangle-facts": String.raw`
## Key forms
- $h = \frac{s\sqrt3}{2}$ and $A = \frac{s^2\sqrt3}{4}$ — the height and the area of an equilateral triangle of side $s$
- $R = \frac{s\sqrt3}{3} = \frac23h$ and $r = \frac{s\sqrt3}{6} = \frac13h$ — the circumradius and the inradius, so $R = 2r$ and $h = R + r$
- the centroid, circumcenter, incenter, and orthocenter are the same point
- inscribed in a circle of radius $R$ the side is $R\sqrt3$, and drawn around a circle of radius $r$ it is $2r\sqrt3$

## Conditions
The triangle has three equal sides. Two equal sides with a $60^\circ$ angle between them, or two $60^\circ$ angles, already force the third.

## Why it works
Everything comes from cutting the triangle in half along an altitude, which gives a [[special-right-triangles|30-60-90 triangle]].

By symmetry, the altitude from one vertex meets the opposite side at its midpoint, so it splits the triangle into two right triangles with hypotenuse $s$ and short leg $\frac s2$. The altitude is the long leg, $\frac s2 \cdot \sqrt3 = \frac{s\sqrt3}{2}$, and the area is half the base times the height, $$\frac12 \cdot s \cdot \frac{s\sqrt3}{2} = \frac{s^2\sqrt3}{4}.$$

Also by symmetry, every altitude is at the same time a median, an angle bisector, and a perpendicular bisector, so every center lies on all three altitudes and they all coincide at one point. That point is the centroid, which [[centroid-division|divides each median in the ratio 2 : 1]] from the vertex, so the distance to a vertex and the distance to a side are $$R = \tfrac23 h = \frac{s\sqrt3}{3}, \qquad r = \tfrac13 h = \frac{s\sqrt3}{6}.$$ The figure at the top shows the two radii along one altitude, adding up to $h$.

## Useful observations
- Remember the two radii as parts of the height, $R = \frac23h$ and $r = \frac13h$, so a problem that gives any one of $s$, $h$, $R$, $r$, or the area gives all of them.
- The $60^\circ$ angle makes the Law of Cosines collapse to $c^2 = a^2 + b^2 - ab$, the case on [[law-cosines-60-120|Law of Cosines at 60° and 120°]].
- A rotation by $60^\circ$ about a vertex, or by $120^\circ$ about the center, carries the triangle onto itself, which is the symmetry that [[rotation-trick|The Rotation Trick]] uses.

## Applications
Heights, areas, and radii of equilateral triangles, circles drawn around or inside them, and figures built from equilateral triangles.

## Contest profile
Seldom the whole problem; it is the shape that makes another tool easy, such as the Law of Cosines at $60^\circ$, a $30^\circ$-$60^\circ$-$90^\circ$ triangle, or a circle around or inside it.
`,

"regular-hexagon-area": String.raw`
## Key forms
- $A = \frac{3\sqrt3}{2}s^2$ — the area of a regular hexagon of side $s$
- $R = s$ and apothem $\frac{s\sqrt3}{2}$ — the circumradius and the distance to a side, read off the six equilateral triangles
- long diagonal $2s$, through the center and a diameter of the circumcircle, and short diagonal $s\sqrt3$, skipping one vertex; these are the only two diagonal lengths
- long : short : side $= 2 : \sqrt3 : 1$ — the sides of a [[special-right-triangles|30-60-90 triangle]]
- the triangle on alternate vertices has side $s\sqrt3$ and half the area of the hexagon, and each corner it cuts off has a sixth

## Conditions
The hexagon is regular. The center-to-vertex segments equal the side only for a regular hexagon.

## Why it works
Each center-to-vertex segment has length $s$, and each of the six angles at the center is $60^\circ$, so each triangle around the center is isosceles with a $60^\circ$ apex angle, which makes it equilateral. Six equilateral triangles of side $s$ give $$A = 6 \cdot \frac{\sqrt3}{4}s^2 = \frac{3\sqrt3}{2}s^2.$$ The distance from the center to every vertex is $s$, and the apothem is the height of one triangle, $\frac{s\sqrt3}{2}$.

The long diagonal joins opposite vertices, so it passes through the center and has length $s + s = 2s$. For the short diagonal take $A$, $B$, $C$ consecutive. The interior angle of a regular hexagon is $120^\circ$, so triangle $ABC$ is isosceles with legs $s$ and apex $120^\circ$, and dropping the perpendicular from $B$ splits it into two half-equilateral triangles with hypotenuse $s$. Each has a long leg $\frac{s\sqrt3}{2}$, so $AC = s\sqrt3$.

{{figure:alternate}}

Both diagonals are cases of the chord $d_k = 2R\sin\frac{k\pi}{6}$ with $R = s$: $k = 2$ gives $2s\sin 60^\circ = s\sqrt3$ and $k = 3$ gives $2s\sin 90^\circ = 2s$.

## Useful observations
- Regions inside a hexagon are best measured in units of the small equilateral triangle, cut into halves or into smaller equilateral triangles when a region needs it.
- Neighboring triangles pair into rhombi, and a diagonal of a rhombus cuts it in half, which settles most shaded regions.
- The triangle $ACE$ on alternate vertices is half the hexagon, and each corner triangle it cuts off is a sixth; midpoint hexagons and other inscribed figures work the same way once the small triangles are drawn in.
- The six short diagonals outline a smaller regular hexagon whose side is $\frac{s\sqrt3}{3}$, so its area is one third of the original.
- In a hexagonal lattice the short diagonal is the spacing between next-nearest centers.
- An equiangular hexagon with unequal sides is a large equilateral triangle with three equilateral corners cut off, the subject of [[equiangular-hexagon-area|Area of an Equiangular Hexagon]].

## Applications
Areas and distances inside a regular hexagon, hexagonal tilings and lattices, and shaded regions made of small equilateral triangles.

## Contest profile
Shaded-region problems found by counting small triangles, distances between two vertices where the only question is which of the three lengths is meant, and counts of the small equilateral triangles cut out by lines in three directions.
`,

"15-75-90-triangle": String.raw`
## Key forms
- $(\sqrt6 - \sqrt2) : (\sqrt6 + \sqrt2) : 4$ — the sides opposite the $15^\circ$, $75^\circ$, and $90^\circ$ angles
- $\sin 15^\circ = \dfrac{\sqrt6 - \sqrt2}{4}$ and $\cos 15^\circ = \dfrac{\sqrt6 + \sqrt2}{4}$
- $\tan 15^\circ = 2 - \sqrt3$ and $\tan 75^\circ = 2 + \sqrt3$
- the altitude to the hypotenuse is one quarter of the hypotenuse, since $\sin 15^\circ\cos 15^\circ = \frac14$

## Conditions
The triangle is right with acute angles $15^\circ$ and $75^\circ$. The values are exact, and they come from the angle subtraction $45^\circ - 30^\circ$.

## Why it works
From $\sin 15^\circ = \frac{\sqrt6 - \sqrt2}{4}$ and $\cos 15^\circ = \frac{\sqrt6 + \sqrt2}{4}$, found by angle subtraction from $45^\circ$ and $30^\circ$, the sides are $\sin 15^\circ$, $\cos 15^\circ$, and $1$ times the hypotenuse, and scaling the hypotenuse to $4$ gives the ratio.

The altitude fact is the double-angle identity: the altitude to the hypotenuse is $c\sin 15^\circ\cos 15^\circ = \frac c2\sin 30^\circ = \frac c4$, so the awkward $15^\circ$ values cancel completely.

## Useful observations
- Also worth caching are $\tan 15^\circ = 2 - \sqrt3$ and $\tan 75^\circ = 2 + \sqrt3$.
- The quarter-hypotenuse altitude gives the area at once: $\frac12 \cdot c \cdot \frac c4 = \frac{c^2}{8}$.

## Applications
Square-and-equilateral-triangle configurations, which naturally create $15^\circ$ angles, and exact trigonometric values at $15^\circ$ and $75^\circ$.

## Contest profile
$15^\circ$ and $75^\circ$ appear in AMC 12 and AIME problems built on square-plus-equilateral-triangle configurations, which naturally create $15^\circ$ angles. The quarter-hypotenuse altitude fact alone has decided problems.
`,

"golden-ratio-pentagon": String.raw`
## Key forms
- $\varphi^2 = \varphi + 1$ — the equation every power reduction uses
- $\frac1\varphi = \varphi - 1$ — the reciprocal, from dividing the equation by $\varphi$
- $d^2 = s^2 + sd$ — the pentagon's diagonal $d$ and side $s$, from [[ptolemys-theorem|Ptolemy's Theorem]] on four vertices

## Conditions
The pentagon is regular: equal sides and equal angles. In a pentagon with equal sides only, the diagonals need not be equal.

## Why it works
Two diagonals and a side of a regular pentagon form a $36$-$72$-$72$ triangle, and that triangle contains a smaller copy of itself, which forces the ratio.

Each interior angle of a regular pentagon is $108^\circ$, and the two diagonals from one vertex cut it into three $36^\circ$ angles. So two diagonals $d$ and the side $s$ between their far ends form an isosceles triangle with apex angle $36^\circ$ and base angles $72^\circ$. Bisecting a base angle cuts off a smaller $36$-$72$-$72$ triangle, and the leftover triangle is isosceles, so the pieces have lengths $s$ and $d - s$.

{{figure:gnomon}}

The similarity gives $\frac ds = \frac{s}{d - s}$. Writing $x = \frac ds$, this is $x = \frac1{x - 1}$, so $x^2 = x + 1$, whose positive root is $\varphi$.

## Useful observations
- Multiplying $\varphi^2 = \varphi + 1$ by $\varphi$ again and again gives $\varphi^3 = 2\varphi + 1$, $\varphi^4 = 3\varphi + 2$, and so on, the coefficients running through the Fibonacci numbers.
- The other root, $\psi = \frac{1 - \sqrt5}{2} = -\frac1\varphi$, satisfies the same equation, which is why the two together give [[binets-formula|Binet's Formula]].
- The diagonals cut each other in the golden ratio, and the small pentagon they enclose has side $\frac{s}{\varphi^2}$.

## Applications
Diagonals and pentagram lengths in a regular pentagon, exact values of $\cos 36^\circ$ and $\cos 72^\circ$, golden triangles and their dissections, and powers of $\varphi$.

## Contest profile
Four problems here, three AMC and one AIME, none solved by it alone; three reach it through [[similar-figures-ratios|similar triangles]] in a pentagon or pentagram. Its role is to supply the diagonal-to-side ratio once the regular pentagon is in the figure.
`,

"inscribed-square": String.raw`
## Key forms
- $x = \dfrac{ah}{a + h}$ — the side of the square sitting on the base $a$ of a triangle with height $h$ to that base
- $x = \dfrac{ab}{a + b}$ — the square in the right angle of a right triangle with legs $a$ and $b$
- $x = \dfrac{abc}{ab + c^2}$ — the square with a side on the hypotenuse $c$ of a right triangle with legs $a$ and $b$

## Conditions
The square has one side on a side of the triangle and its two other corners on the other two sides. The formula $x = \frac{ah}{a + h}$ holds for any side of any triangle, with $a$ that side and $h$ its altitude.

## Why it works
The triangle above the square is similar to the original, since its base is parallel to the original base, with height $h - x$ and base scaled by the same factor: $\frac{x}{a} = \frac{h - x}{h}$. Solving for $x$ gives $x = \frac{ah}{a + h}$, which is symmetric in $a$ and $h$.

## Useful observations
- The square's base can sit on any side: that side's length and its altitude are used. The side follows from [[similar-figures-ratios|similar figure ratios]], since the cut-off top triangle is similar to the whole.
- For a right triangle with the square in the right angle, the same similarity gives $x = \frac{ab}{a + b}$, and the altitude to the hypotenuse is $h = \frac{ab}{c}$, which recovers the hypotenuse formula from the general one.
- The symmetry in $a$ and $h$ is a useful check on an answer.

## Applications
Squares inscribed in triangles, with the square on the base or in a corner of a right triangle.

## Contest profile
A MATHCOUNTS and AMC 10 standard. The two right-triangle variants, square on the hypotenuse versus square in the corner, are deliberately paired in problems, so the two formulas must be kept distinct.
`,

"mass-points": String.raw`
## When to use
Two or three cevians with known side ratios, including ratios supplied by an [[angle-bisector-theorem|angle bisector]]. For a transversal that is not a cevian, split a vertex's mass into parts, one for each side it lies on. It handles ratios along cevians only: parallel lines, or points outside the triangle, are where a method built on areas keeps working.

## How
1. From each given side ratio $BD : DC = m : n$, set the masses at the ends in the opposite ratio, $m_B : m_C = n : m$.
2. Scale the assignments until every vertex carries a single mass.
3. Give each foot the sum of the two masses it balances, $m_D = m_B + m_C$.
4. Read a ratio along a cevian as the masses inverted, $AP : PD = m_D : m_A$.

For $BD : DC = 1 : 2$ and $AE : EC = 2 : 3$, the first gives $m_B : m_C = 2 : 1$ and the second $m_A : m_C = 3 : 2$, so take $m_A = 3$, $m_B = 4$, and $m_C = 2$. Then $m_D = 6$, and $AP : PD = 6 : 3 = 2 : 1$.

## Why it works
Masses $m_B$ at $B$ and $m_C$ at $C$ balance at the point $D$ with $m_B \cdot BD = m_C \cdot DC$, so the heavier mass sits nearer the balance point.

{{figure:lever}}

Once each vertex has a mass, the whole system has one center of mass. Grouping $B$ and $C$ first, their combined mass $m_B + m_C$ sits at $D$, so the center of mass lies on $AD$ where $m_A \cdot AP = m_D \cdot PD$. Grouping differently puts it on the other cevians too, so it is their crossing point $P$, and the ratios along each cevian follow. The masses are the [[barycentric-coordinates|barycentric coordinates]] of $P$ in disguise.

## Formulas it uses
- [[cevas-theorem]]: a third cevian passes through the crossing point exactly when its ratio matches the masses, which is the theorem's condition, so masses that balance two cevians decide the third.

## Common traps
- Writing the ratio along a cevian the wrong way round: the larger mass is nearer the balance point, so $AP : PD = m_D : m_A$.
- Using masses for a point outside the triangle or for parallel lines, where nothing balances; the [[area-method|area method]] handles those.
- Forgetting to rescale when two cevians give the same vertex different masses.

## Contest profile
Usually most of the computation once the side ratios are known; the work before it is finding those ratios.
`,


"rotation-trick": String.raw`
## When to use
Any figure with a $60^\circ$ or $90^\circ$ symmetry about a vertex, where segments scattered around the figure should be brought together. Equilateral triangles or squares erected on the sides of a figure are one setting: the turn about the shared vertex carries one segment onto another, proving them equal and at a fixed angle. The most common setting is a point inside an equilateral triangle or a square with given distances to three of the vertices, such as $3$, $4$, $5$ in an equilateral triangle or $1$, $2$, $3$ in a square, and a question about an angle at the point, the side length, or the area.

If no symmetry carries one segment onto another, as in a general triangle, coordinates or the Law of Cosines are needed instead.

## How
1. Pick a vertex $B$ adjacent to two of the vertices with known distances.
2. Rotate about $B$ by the polygon's angle, $60^\circ$ or $90^\circ$, in the direction that sends $A$ onto $C$; the point $P$ goes to $P'$, and $P'C = PA$.
3. Triangle $PBP'$ is equilateral, so $PP' = PB$, or isosceles right, so $PP' = PB\sqrt2$.
4. Triangle $PP'C$ now has three known sides; find its angles, and add back the $60^\circ$ or $45^\circ$ at $P'$ to get angles of the original figure.

Point $P$ inside equilateral triangle $ABC$ has $PA = 3$, $PB = 4$, $PC = 5$. Rotating $60^\circ$ about $B$ sends $A$ to $C$ and $P$ to $P'$, with $PP' = 4$ and $P'C = 3$. Triangle $PP'C$ has sides $4$, $3$, $5$, so it has a right angle at $P'$, and $\angle APB = \angle CP'B = 60^\circ + 90^\circ = 150^\circ$. Then the Law of Cosines gives $AB^2 = 9 + 16 + 12\sqrt3 = 25 + 12\sqrt3$.

## Why it works
A rotation preserves lengths and angles. Rotating about $B$ by the angle of the polygon carries the side $BA$ onto the side $BC$, so it carries triangle $BPA$ onto a congruent triangle $BP'C$; in particular $P'C = PA$ and $\angle BP'C = \angle BPA$.

The point and its image are at the same distance from $B$ with the rotation angle between them, so triangle $PBP'$ is isosceles with apex angle $60^\circ$ or $90^\circ$, which makes it equilateral or isosceles right, and its base $PP'$ is known. That is how a third known length appears next to the other two.

## Formulas it uses
- [[law-of-cosines]]: computes the side length or the remaining angles once the three distances form one triangle.
- [[equilateral-triangle-facts]]: a $60^\circ$ rotation makes triangle $PBP'$ equilateral, so $PP' = PB$, and gives the area $\frac{\sqrt3}{4}s^2$ at the end.
- [[special-right-triangles]]: a $90^\circ$ rotation makes triangle $PBP'$ isosceles right, so $PP' = PB\sqrt2$ with $45^\circ$ angles.

## Common traps
- Rotating in the direction that sends $C$ onto $A$ when the setup assumed $A$ onto $C$, which mismatches the distances.
- Forgetting to add back the angle of triangle $PBP'$ when recovering an angle of the original figure.
- Expecting a right triangle every time; the third triangle is right only for special distances, and in general the Law of Cosines is needed.

## Contest profile
The intended solution whenever an AMC or AIME problem gives three distances from a point to the vertices of an equilateral triangle or square.
`,

"spiral-similarity": String.raw`
## When to use
Two circles meeting at points $X$ and $Y$, with lines through one meeting point cutting both circles; two similar triangles sharing a vertex, $\triangle XAB \sim \triangle XCD$; and computations where one segment must be carried onto another by a turn and a scaling, especially with complex numbers. It often explains why a hard circle configuration has hidden similar triangles.

## How
1. Identify the two segments to be matched, $AB \to CD$.
2. Let $P = AC \cap BD$ (or $AB \cap CD$), and find the second intersection $X$ of the circles through $A$, $C$, $P$ and through $B$, $D$, $P$; this $X$ is the center.
3. Read off the similar triangles $\triangle XAB \sim \triangle XCD$ and, by the swap, $\triangle XAC \sim \triangle XBD$.
4. In complex numbers, write the map as $z \mapsto wz + t$: two pairs of points give $w = \frac{D - C}{B - A}$ and $t = C - wA$, and the center is $\frac{t}{1 - w}$.

The spiral similarity sending $A = 0$ to $C = 2i$ and $B = 2$ to $D = 2 + 4i$ has $w = \frac{2 + 2i}{2} = 1 + i$, a scaling by $\sqrt2$ with a turn of $45^\circ$, and $t = 2i$. Its center is $\frac{2i}{1 - (1 + i)} = -2$, and indeed $(1 + i)(-2) + 2i = -2$.

## Why it works
A rotation by $\theta$ and a scaling by $k$ about the same center $X$ send $A$ to $C$ and $B$ to $D$ exactly when triangles $XAB$ and $XCD$ are similar with the same orientation. Then $\angle AXC = \angle BXD = \theta$, the turn of the map.

The equal angles put $X$ on two circles. If $P = AC \cap BD$, the angle between lines $PA$ and $PB$ equals $\theta$ as well, since $CD$ is $AB$ turned by $\theta$. So $X$ and $P$ see $AC$ under equal angles, putting $X$ on circle $APC$, and likewise on circle $BPD$. The same similar triangles, read in the other pairing, give $\frac{XA}{XC} = \frac{XB}{XD}$ with equal angles $AXB$ and $CXD$, which is the swap $AC \to BD$.

## Formulas it uses
- [[similar-figures-ratios]]: the similar triangles $XAB$ and $XCD$ at the center, with every length scaled by $k$.
- [[cyclic-equal-angles]]: equal angles subtending a segment put the center on the circles through matched endpoints.
- [[miquels-theorem]]: the Miquel point of four lines is the center of the spiral similarities between their segments.
- [[complex-basics]]: multiplication by $w = ke^{i\theta}$ is a turn by $\theta$ and a scaling by $k$, which makes the map linear.

## Common traps
- Pairing the endpoints the wrong way, which gives the center of a different spiral similarity.
- Using a reflection-type similarity, which reverses orientation and has no spiral center.
- Forgetting that parallel segments give a translation or a homothety, where the circle construction degenerates.

## Contest profile
A hard AIME and olympiad idea: two circles through a common point with lines through it are usually a spiral similarity about that point.
`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"ellipse-tangent-line": String.raw`
## Distinguishing clues
- Two fixed points act as foci and a line is involved: the least value of $PF_1 + PF_2$ for $P$ on the line.
- An ellipse with those foci that touches the line.
- Not this pattern: foci without a line, which is just the ellipse definition, or one focus and a line, which is a parabola.

## Methods and Formulas to Try
The ellipses with foci $F_1$ and $F_2$ nest outward as the focal sum grows, so the first one to reach the line touches it at the point of least sum.

### Methods to try
- [[reflect-across-the-line]]: reflect $F_1$ across the line to $F_1'$; the least focal sum on the line is $F_1'F_2$, which is the ellipse's $2a$.
- [[tangency-equation]]: substitute the line into the ellipse equation and require a double root, which fixes the missing parameter.
- [[coordinate-bash]]: with the line as an axis, compute the foci and the axes of the ellipse directly.

### Formulas to try
- [[ellipse-properties]]: $PF_1 + PF_2 = 2a$, with $b^2 = a^2 - c^2$, which recovers the axes once the focal sum is known.
- [[conic-reflective-property]]: the tangent makes equal angles with the two focal radii, the same law as the reflection.
- [[conic-tangent-lines]]: once the ellipse is in standard position, the tangent at a point is $\frac{xx_0}{a^2} + \frac{yy_0}{b^2} = 1$, and a line of slope $m$ touches it when $k^2 = a^2m^2 + b^2$.

## Common traps
- Using the reflection when the foci are on opposite sides of the line, where the segment $F_1F_2$ already crosses it.
- Confusing the focal sum $2a$ with the distance between foci $2c$.
- Forgetting that the tangent point is unique; two intersection points mean the ellipse is too large.

## Contest profile
An AIME coordinate problem in conic dress: the tangency pins down an ellipse, and the reflection gives its focal sum at once.
`,

"conic-sections": String.raw`
## Key forms
- $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ with $c^2 = a^2 - b^2$ — the ellipse: a constant sum of distances to two foci
- $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$ with $c^2 = a^2 + b^2$ — the hyperbola: a constant difference of distances
- $x^2 = 4py$ — the parabola: equal distance to a focus and a line
- centered at $(h, k)$: replace $x$ by $x - h$ and $y$ by $y - k$, as in $\dfrac{(x - h)^2}{a^2} + \dfrac{(y - k)^2}{b^2} = 1$

## Conditions
The forms above are in standard position, with the axes along the coordinate axes. For an ellipse $a \ge b$ and the foci are $(\pm c, 0)$; for the hyperbola the foci are $(\pm c, 0)$ with $c > a$; the parabola $x^2 = 4py$ has focus $(0, p)$ and directrix $y = -p$.

## Why it works
The conic sections are the curves a plane cuts from a double cone, and the angle of the cutting plane decides which curve. A plane tilted less steeply than the cone's side meets one half of the cone in a closed curve, an ellipse. A plane parallel to a side never meets that side, so the curve runs off to infinity, a parabola. A steeper plane cuts both halves of the cone, giving the two branches of a hyperbola.

{{figure:slices}}

The focal definitions come from the Dandelin spheres, the spheres inscribed in the cone and tangent to the cutting plane. Each touches the plane at a focus and the cone along a circle. From a point on the curve, the distance to a focus equals the distance along the cone to that sphere's circle, because both are tangent lengths from the same point to the same sphere.

For an ellipse, the two such distances add up to the length of cone between the two circles, which is the same for every point: that is the constant sum.

{{figure:dandelin}}

## Useful observations
- The problem's wording picks the curve: a constant sum of distances is an ellipse, a constant difference is a hyperbola, and a distance matched against a line is a parabola.
- A single ratio, the [[eccentricity|eccentricity]], covers all three, and when a curve arrives as an unlabeled second-degree equation, [[conic-classification|the discriminant]] names it without rearranging.
- The two relations $c$ are kept straight by which length is largest: $a$ on an ellipse and $c$ on a hyperbola, so $c^2 = a^2 - b^2$ for the ellipse and $c^2 = a^2 + b^2$ for the hyperbola.
- Each of the three has a card of its own for its finer properties.

## Applications
Recognizing a curve from a distance condition or an equation, and finding foci, axes, and the constant in the focal definition.

## Contest profile
The AMC 12 tests the standard forms and focal definitions directly; on the AIME a conic appears as the constraint curve of an optimization or a count. The difficulty sits in the recognition step, noticing that some quantity the problem built is a constant sum or difference of distances.
`,

"insphere-radius": String.raw`
## Key forms
- $V = \dfrac13 rS$ — the volume of a polyhedron with an inscribed sphere of radius $r$ and total surface area $S$
- $r = \dfrac{3V}{S}$ — the insphere radius
- $A = rs$ — the planar twin, for the incircle of a polygon with area $A$ and semiperimeter $s$

## Conditions
The polyhedron has an insphere, a point at the same distance from every face; a regular pyramid, a cube, and a tetrahedron all do, while a general polyhedron may not.

## Why it works
Join the center of the insphere to every face, and the polyhedron splits into pyramids of the same height $r$.

Each pyramid has one face of the polyhedron as its base and the center as its apex, and its height is $r$, because the sphere touches the face at the foot of the perpendicular from the center. Adding the pyramids' volumes, $$V = \sum \tfrac13 \cdot (\text{face area}) \cdot r = \tfrac13 rS.$$ The figure at the top shows the dissection. Cutting a triangle into three triangles from its incenter is the same argument one dimension down, and gives $A = rs$.

## Useful observations
- The volume and the total surface area are computed separately, then divided: $r = \frac{3V}{S}$. For a cube of edge $a$, $r = \frac{3a^3}{6a^2} = \frac a2$.
- When the faces are congruent, as in an [[isosceles-tetrahedron|isosceles tetrahedron]], $S$ is four times one face, found with [[herons-formula|Heron's Formula]].
- When coordinates are easier, the center is the point at equal distance from every face, found one plane at a time, as on [[point-plane-distance|the point-plane distance card]].

## Applications
Inradius of a pyramid, tetrahedron, or cube, a sphere tangent to every face, and the center of a polyhedron equidistant from its faces.

## Contest profile
Three problems here, all AIME, none solved by it alone. The archetype is a point equidistant from the faces of an isosceles tetrahedron, where the box gives $V$ and Heron's Formula gives $S$; others locate the center with coordinates and point-to-plane distances instead.
`,

"tangency-condition": String.raw`
## Distinguishing clues
- "Exactly one solution" or "exactly one common point" for two curves that could have met twice.
- Not this pattern: a line parallel to the axis of a parabola meets it once without touching it, and two linear equations have a unique solution for an unrelated reason. Check that the generic count is two before reading "exactly one" as "touching".

## Methods and Formulas to Try
Two curves that could meet twice but meet once are touching, and touching is a single equation in the parameter.

### Methods to try
- [[tangency-equation]]: distance from the center equals the radius for a circle, or a zero discriminant after substituting.
- [[coordinate-bash]]: when the curves arrive as a locus, as complex numbers, or as an envelope, write them as equations first.

### Formulas to try
- [[point-line-distance]]: the distance from a center to a line, set equal to the radius.
- [[quadratic-formula]]: the discriminant $b^2 - 4ac$ of the substituted quadratic, zero exactly when the two intersection points merge.
- [[conic-tangent-lines]]: for a line and a conic in standard position, the tangency condition in closed form.

## Common traps
- Keeping only one parameter value when the problem allows both, one for each side from which the line can touch.
- Squaring an equation to clear a radical, which can create a tangency the original curves do not have; check the answer in the original equations.

## Contest profile
More often disguised than stated: the curves arrive as a locus, as complex numbers, or as an envelope, and the tangency is the last step after naming them.
`,

"cross-section-method": String.raw`
## When to use
A sphere inscribed in a cone, spheres stacked in a cylinder, a torus resting inside or outside a sphere, or a cone and a sphere touching along a circle. The tell is that every solid shares one axis of symmetry and the question asks for a radius, a height, or the radius of a circle of contact. When the solids do not share an axis, slice through the centers of the solids involved instead.

## How
1. Find the common axis and take the plane through it.
2. Draw what each solid becomes: a sphere a circle of the same radius, a cone an isosceles triangle, a cylinder a pair of parallel lines, a torus two circles of the tube's radius.
3. Solve the flat problem with tangent circles, distances from a center to a line, and similar triangles.
4. Translate back: a point's distance from the axis in the slice is the radius of the circle it sweeps out in space.

Find the radius of the sphere inscribed in a cone of base radius $3$ and height $4$. The axial slice is a triangle with base $6$, height $4$, and slant sides $5$, and the sphere becomes its incircle. The triangle's area is $12$ and its semiperimeter is $8$, so the inradius, and the sphere's radius, is $\frac{12}{8} = \frac32$.

{{figure:scale}}

## Why it works
A solid of revolution is a flat region spun around its axis, so the plane through the axis cuts it in exactly that region, mirrored on both sides. When every solid shares the axis, the whole configuration is one flat picture spun around, and that picture contains every center and every radius.

Two such solids that touch do so along a circle centered on the axis, and that circle crosses the plane in two points, where the corresponding flat shapes touch. So tangency in space is tangency in the slice, and a distance from the axis in the slice is the radius of a circle in space. A sphere off the axis breaks the symmetry, and then the right plane is the one through the centers.

## Formulas it uses
- [[tangent-circles]]: in the slice, tangent circles have center distance $r_1 + r_2$ externally and $|r_1 - r_2|$ internally, and their contact point is on the line of centers.
- [[pythagorean-theorem]]: right triangles formed by a radius, the axis, and a slant line, where most cross-section problems end.
- [[similar-figures-ratios]]: similar triangles from a common center scale the distance from the axis, which locates circles of contact.

## Common traps
- Slicing through a plane that misses the points of contact, when the solids are not all symmetric about one axis.
- Reporting the distance from the sphere's center to a contact point as the radius of the circle of contact; the radius is the distance from the axis.
- Forgetting that a torus slices into two circles, one on each side of the axis.
- Using external tangency where a solid rests inside another.

## Contest profile
An AIME staple: a sphere in a cone, stacked spheres, or a torus against a sphere, solved almost entirely in the slice with tangent circles and the Pythagorean Theorem.
`

});

Object.assign(window.MATH_DETAILS, {

"trig-ceva": String.raw`
## Key forms
- $\dfrac{\sin\angle BAD}{\sin\angle DAC} \cdot \dfrac{\sin\angle CBE}{\sin\angle EBA} \cdot \dfrac{\sin\angle ACF}{\sin\angle FCB} = 1$ — for cevians $AD$, $BE$, $CF$ through a common point
- conversely, if the product is $1$, the three cevians are concurrent

## Conditions
$D$, $E$, $F$ lie on the sides $BC$, $CA$, $AB$, and each angle is the one the cevian makes with a side at its own vertex. The three ratios are taken in the same direction around the triangle.

## Why it works
Each side ratio in Ceva's Theorem converts into a ratio of sines by [[ratio-lemma|the Ratio Lemma]]: $\frac{BD}{DC} = \frac{AB \sin\angle BAD}{AC \sin\angle DAC}$, and likewise at $B$ and $C$. Multiplying the three, the side lengths $AB$, $BC$, $CA$ each appear once above and once below and cancel, leaving the product of the three sine ratios. The product of the three side ratios is $1$ exactly when the cevians are concurrent, so the same holds for the sine product.

## Useful observations
- Isogonal cevians, the reflections over the angle bisectors, swap the numerators and denominators of the sine ratios, which is why trig Ceva proves that the [[symmedian-lemoine|symmedians]] meet and that the [[isogonal-conjugate|isogonal conjugate]] of a point exists.
- Altitudes, bisectors, and symmedians concur by this one calculation.
- With the sine addition formulas, it handles most "find the angle" concurrency problems.
- For obtuse configurations [[directed-angles|directed angles]] keep the signs straight; with every cevian inside the triangle no signs are needed.

## Applications
Concurrency of cevians given by angles, and unknown angles in a figure with a point inside a triangle.

## Contest profile
The standard tool for AIME and olympiad angle-chase concurrency, and the cleanest proof that altitudes, bisectors, and symmedians concur.
`,

"erdos-mordell": String.raw`
## Key forms
- $PA + PB + PC \ge 2\left(d_a + d_b + d_c\right)$ — the distances from an interior point $P$ to the vertices against its distances to the sides
- $a \cdot PA \ge b\,d_c + c\,d_b$ — the stronger inequality at one vertex, and its two cyclic versions
- equality holds only for an equilateral triangle with $P$ at its center

## Conditions
$P$ is a point inside the triangle, and $d_a$, $d_b$, $d_c$ are its distances to the sides $a$, $b$, $c$.

## Why it works
Start with the inequality at $A$. Reflect $P$ across the bisector of angle $A$ to a point $P'$, so $AP' = AP$ and the distances from $P'$ to $AB$ and $AC$ are $d_b$ and $d_c$. The ray $AP'$ lies inside the angle, so $B$ and $C$ are on opposite sides of the line $AP'$, and the two triangles $ABP'$ and $ACP'$ have total area $$\tfrac12\bigl(c\,d_b + b\,d_c\bigr) = \tfrac12\,AP' \cdot \bigl(\text{distance from } B + \text{distance from } C\bigr) \le \tfrac12\,AP \cdot a,$$ because the two distances to a line from points on opposite sides add to at most the segment $BC$ between them. Hence $a \cdot PA \ge b\,d_c + c\,d_b$.

Divide by $a$ and add the three cyclic versions: $$PA + PB + PC \ge d_a\left(\tfrac bc + \tfrac cb\right) + d_b\left(\tfrac ca + \tfrac ac\right) + d_c\left(\tfrac ab + \tfrac ba\right) \ge 2\left(d_a + d_b + d_c\right),$$ since each bracket is at least $2$ by AM-GM. Equality needs $a = b = c$ and each $AP'$ perpendicular to its side, which puts $P$ at the center.

## Useful observations
- The intermediate inequalities $a \cdot PA \ge b\,d_c + c\,d_b$ are sharper and often used on their own.
- A problem whose optimum puts $P$ at the center of an equilateral triangle often has Erdős–Mordell equality as its hidden reason.

## Applications
Bounds linking the distances from a point to the vertices and to the sides, and extremal problems whose equality case is the equilateral center.

## Contest profile
An olympiad inequality, and the occasional AIME-adjacent bound; a sanity check for extremal configurations.
`,

"symmedian-lemoine": String.raw`
## Key forms
- $BE : EC = c^2 : b^2$ — the $A$-symmedian meets $BC$ at $E$, dividing it in the ratio of the squares of the adjacent sides
- the symmedian is the median reflected over the angle bisector from the same vertex
- the symmedian is the locus of points $P$ with $\dfrac{d(P, AB)}{d(P, AC)} = \dfrac cb$, where $c = AB$ and $b = AC$
- the symmedian passes through the point where the tangents to the circumcircle at $B$ and $C$ meet

## Conditions
The triangle is any triangle, with $b = AC$ and $c = AB$. In an isosceles triangle with $b = c$ the symmedian, the median, and the bisector coincide.

## Why it works
Reflecting the median over the angle bisector swaps the roles of the two adjacent sides, which turns the median's even split into the $c^2 : b^2$ ratio. Trig [[cevas-theorem|Ceva]] makes this precise: the median's two angles satisfy $\frac{\sin\angle BAM}{\sin\angle MAC} = \frac cb$ by the [[ratio-lemma|Ratio Lemma]], and reflecting inverts that quotient, so the symmedian's split carries the square.

The distance form explains the same thing without any trigonometry. Comparing areas, $[ABE] = \frac12 \cdot AB \cdot d(E, AB)$ and $[ACE] = \frac12 \cdot AC \cdot d(E, AC)$, while $\frac{[ABE]}{[ACE]} = \frac{BE}{EC}$ because the two triangles share the apex $A$. Setting those equal to $\frac{c^2}{b^2}$ gives $\frac{d(E, AB)}{d(E, AC)} = \frac cb$, and since that ratio is the same at every point of the cevian, it characterizes the whole line.

## Useful observations
- Recognizing any one of the four equivalent conditions gives the others for free.
- Contrast the locus form with its two neighbors, since the three cevians differ only in that ratio: the bisector is where the distances are equal, the median where they are in ratio $b : c$, and the symmedian where they are in ratio $c : b$. Median and symmedian are reflections of each other, which is what "isogonal" means.
- The perpendicular test is the fastest hand check. Dropping perpendiculars from $B$ and $C$ onto a cevian from $A$, they are equal for the median and in ratio $c^2 : b^2$ for the symmedian, because the two triangles on the cevian share its base.
- The ratio $c^2 : b^2$ drops straight into [[stewarts-theorem|Stewart's Theorem]] or [[mass-points|mass points]], hanging mass $b^2$ at $B$ and $c^2$ at $C$.
- Antiparallels give one more sighting: the $A$-symmedian bisects every segment antiparallel to $BC$.

## Applications
Cevian ratios on the opposite side, isogonal pairs, and points defined by tangents to the circumcircle.

## Contest profile
The ratio itself is the usable half at AIME level, since the squared side ratio turns a symmedian into an ordinary cevian computation. At olympiad level the locus and antiparallel forms matter more, because they are what let one prove a line is the symmedian rather than assume it.
`,

"cyclic-perpendicular-diagonals": String.raw`
## Key forms
- $a^2 + c^2 = b^2 + d^2 = 4R^2$ — for a cyclic quadrilateral with perpendicular diagonals and sides $a, b, c, d$ in order, opposite sides pair up
- $\overset{\frown}{AB} + \overset{\frown}{CD} = \overset{\frown}{BC} + \overset{\frown}{DA} = 180^\circ$ — the arcs cut off by opposite sides are supplementary, and conversely a cyclic quadrilateral whose opposite arcs sum to $180^\circ$ has perpendicular diagonals
- $a^2 + c^2 = b^2 + d^2$ holds for any quadrilateral with perpendicular diagonals; only the value $4R^2$ needs cyclicity
- the perpendicular from the diagonals' intersection to a side, extended, bisects the opposite side — Brahmagupta's theorem
- $\dfrac12 d_1d_2$ — the area, for perpendicular diagonals

## Conditions
The quadrilateral is cyclic and its diagonals are perpendicular. The equality of the two opposite-side pairs needs only perpendicular diagonals.

## Why it works
Two chords crossing inside a circle meet at an angle equal to half the sum of the two arcs they cut off. Demanding a right angle therefore says those two arcs total $180^\circ$.

Write the arc under $AB$ as $2\beta$; then the arc under $CD$ is $2(90^\circ - \beta)$, and the [[chord-length|chord length formula]] gives $AB = 2R\sin\beta$ and $CD = 2R\cos\beta$. Squaring and adding, the trigonometry cancels and leaves $AB^2 + CD^2 = 4R^2$. The other pair of arcs also totals $180^\circ$, so $BC^2 + DA^2 = 4R^2$ as well.

There is a second, coordinate-free way to see the equality of the pairs. If the diagonals meet at $P$ and cut them into $p, q$ and $u, v$, then perpendicularity makes each side a hypotenuse: $a^2 = p^2 + u^2$, $b^2 = q^2 + u^2$, $c^2 = q^2 + v^2$, $d^2 = p^2 + v^2$. Both $a^2 + c^2$ and $b^2 + d^2$ come to $p^2 + q^2 + u^2 + v^2$.

## Useful observations
- The configuration is recognized from the right angle at the diagonals, and the pairing gives the answer immediately: three of the four sides determine the fourth, and any one of them together with $R$ determines the opposite one.
- In any cyclic quadrilateral the four maltitudes, each running from a side's midpoint perpendicular to the opposite side, meet at the anticenter; when the diagonals are perpendicular the anticenter is exactly their intersection $P$. Read backwards, that is Brahmagupta's theorem, so a perpendicular foot on one side is a midpoint on the other.
- For area, perpendicular diagonals make [[quadrilateral-diagonal-area|the diagonal formula]] collapse to $\frac12 d_1d_2$.

## Applications
Lengths of sides of a cyclic quadrilateral with perpendicular diagonals, midpoints from perpendicular feet, and the circumradius from opposite sides.

## Contest profile
The tell is a cyclic quadrilateral whose diagonals are stated to be perpendicular, or a figure where two chords visibly cross at a right angle. Once spotted, the pairing of opposite sides through the diameter usually finishes a length question in one line.
`,

"incircle-excircle-homothety": String.raw`
## Key forms
- $\frac{r}{r_a} = \frac{s - a}{s}$ — the ratio of the homothety at $A$ that carries the incircle to the $A$-excircle is $\frac{s}{s - a}$
- $A$, $D'$, $E$ are collinear — $D'$ is the point of the incircle diametrically opposite its touch point $D$ on $BC$, and $E$ is the touch point of the $A$-excircle
- $BD = s - b$ and $BE = s - c$ — the two touch points are reflections in the midpoint of $BC$

## Conditions
$D$ is the incircle's touch point on $BC$ and $E$ the $A$-excircle's; the excircle is the one opposite $A$.

## Why it works
The incircle and the $A$-excircle are both tangent to the two lines through $A$, so both are inscribed in the same angle and their centers both lie on the bisector from $A$. A dilation centered at $A$ therefore carries one to the other, and its ratio is the ratio of the radii, $\frac{r_a}{r}$. Since $r = \frac{\text{Area}}{s}$ and $r_a = \frac{\text{Area}}{s - a}$, that ratio is $\frac{s}{s - a}$, giving $\frac r{r_a} = \frac{s - a}{s}$.

Now ask where the incircle's touch point $D$ on $BC$ goes. A dilation maps a tangent line to a parallel tangent line, and the excircle's tangent parallel to $BC$ is not $BC$ itself but the far one. So $D$ does not map to $E$. What maps to $E$ is the point where the incircle meets the tangent parallel to $BC$ on the far side, which is $D'$, the antipode of $D$. Hence $A$, $D'$, and $E$ are collinear: they are a center of dilation and two corresponding points.

The companion fact is $BD = s - b$ while $BE = s - c$, so $D$ and $E$ are reflections of one another in the midpoint of $BC$, as on [[incircle-excircle-touch|the touch-point page]].

## Useful observations
- A line from a vertex to the opposite excircle's touch point passes through the top of the incircle; conversely a line through $A$ and the incircle's far point is headed for $E$.
- Because $E$ is the foot of the Nagel cevian, the same picture is the standard way in to [[gergonne-nagel-points|the Nagel point]].
- The ratio converts between $r$ and $r_a$ without computing the area, and it splits a length along $AE$ in the ratio $s - a$ to $s$.

## Applications
Collinearities between a vertex, the incircle, and an excircle touch point, and conversions between $r$ and $r_a$.

## Contest profile
Uncommon on the AMC; on hard AIME and olympiad geometry it appears as an unexplained collinearity to be proved, or as the bridge from a question about an excircle to one about the incircle.
`,

"arbelos": String.raw`
## Key forms
- $[\text{arbelos}] = \dfrac\pi4BD^2 = \pi ab$ — the area equals that of the circle whose diameter is the perpendicular $BD$ to $AC$ at $B$, where $a$ and $b$ are the radii of the two small semicircles and $D$ is on the big one
- $BD = 2\sqrt{ab}$ — the half-chord at $B$, from $AB = 2a$ and $BC = 2b$
- $r_{\text{twin}} = \dfrac{ab}{a + b}$ — the common radius of Archimedes' two circles squeezed against $BD$ in each lobe

## Conditions
The three semicircles stand on the collinear diameters $AB = 2a$, $BC = 2b$, and $AC$, all on the same side of the line.

## Why it works
Write $AB = 2a$ and $BC = 2b$, so the outer semicircle has radius $a + b$. The leftover area is $\frac\pi2(a + b)^2 - \frac\pi2a^2 - \frac\pi2b^2$, and expanding the square leaves $\pi ab$.

Now the perpendicular at $B$. Because $AC$ is a diameter, [[thales-theorem|Thales' Theorem]] makes $\angle ADC$ a right angle, so $BD$ is the [[altitude-hypotenuse|altitude to the hypotenuse]] of a right triangle and the geometric mean relation gives $BD^2 = AB \cdot BC = 4ab$. The circle on $BD$ as diameter therefore has area $\frac\pi4 \cdot 4ab = \pi ab$, the same number. The two regions are not congruent, but their areas agree exactly.

Archimedes' twin circles are the striking part. A circle inscribed in the left lobe, tangent to $BD$, to the outer semicircle, and to the semicircle on $AB$, and the same on the right, both have radius $\frac{ab}{a + b}$, even though the lobes are different sizes whenever $a \ne b$.

## Useful observations
- The figure is recognized from three semicircles on collinear diameters, all on one side. The area identity is what makes the shape worth naming: a region bounded by three arcs is replaced by one circle.
- For anything harder, [[inversion-properties|inversion]] is the intended tool. Inverting about $A$ or $C$ carries the two semicircles through the center into a pair of parallel lines, which turns the chain of circles inscribed in the arbelos into a stack of equal circles between two parallels.

## Applications
Areas of regions bounded by three semicircles, and Archimedes' twin circles and chains.

## Contest profile
Rare, and essentially absent from the AMC and AIME, which is why this is filed as a reference card. It is worth recognizing because a problem that builds three semicircles on a segment is usually quoting this configuration, and the area identity then finishes it immediately.
`,

"corner-circle-chain": String.raw`
## Key forms
- $r = d\sin\theta$ — a circle tangent to both sides of an angle $2\theta$ has its center on the bisector at distance $d$ from the vertex
- $\dfrac{r_{k+1}}{r_k} = \dfrac{1 + \sin\theta}{1 - \sin\theta}$ — consecutive tangent circles in the corner, so the radii form a geometric progression
- $\dfrac{1}{\sqrt{r_3}} = \dfrac{1}{\sqrt{r_1}} + \dfrac{1}{\sqrt{r_2}}$ — the flat case: three mutually tangent circles all touching one line

## Conditions
The circles are tangent to both sides of the angle and to their neighbors, with centers on the bisector. For the flat case the circles are tangent to one line and to each other.

## Why it works
A circle tangent to both sides of an angle is centered on the bisector, since the distance to the two sides has to match. Drop a perpendicular from the center to one side: it has length $r$, the hypotenuse is the distance $d$ from the vertex, and the angle at the vertex is the half-angle $\theta$. So $r = d\sin\theta$.

Chain two of them. Consecutive circles are externally tangent and both centers are on the bisector, so $d_{k+1} - d_k = r_k + r_{k+1}$. Substituting $d = r/\sin\theta$ turns that into $\frac{r_{k+1} - r_k}{\sin\theta} = r_k + r_{k+1}$, and collecting terms gives $\frac{r_{k+1}}{r_k} = \frac{1 + \sin\theta}{1 - \sin\theta}$. The ratio is the same at every step, so the radii form a geometric progression.

The flat relation is the same idea with a line in place of the second side. Two circles of radii $r_1$ and $r_2$ tangent to each other and to a common line have their tangency points $2\sqrt{r_1r_2}$ apart, which is [[common-tangent-lengths|the common tangent length]]. Fitting a third circle into the gap and applying that twice gives the reciprocal square-root relation. It is also what [[descartes-circle-theorem|Descartes' Circle Theorem]] reduces to when one curvature is set to zero.

## Useful observations
- When circles are stacked into a corner, they are not chased one at a time: the ratio is identified from the angle once, and the whole chain is a [[geometric-series|geometric sequence]], so sums of radii are geometric series.
- When circles sit in a row on a common line, the reciprocal square-root relation is used instead, and it generalizes: any number of circles inscribed successively in the gaps gives radii whose inverse square roots add.

## Applications
Chains of tangent circles in an angle, and circles in a row on a line.

## Contest profile
Uncommon at the AMC and AIME level, and included for recognition rather than as a working tool. The shape to remember is several circles tangent to the same two lines, or several circles in a row on a common tangent line.
`,

"radical-axis": String.raw`
## Key forms
- $\operatorname{pow}(P, \omega) = PO^2 - r^2$ — the power of $P$ with respect to the circle of center $O$ and radius $r$
- $\{P : \operatorname{pow}(P, \omega_1) = \operatorname{pow}(P, \omega_2)\}$ is a line perpendicular to $O_1O_2$ — the radical axis, found by subtracting the two circle equations
- the axis is the common chord when the circles meet, and the common tangent at the contact point when they touch
- the three radical axes of three circles meet at one point, the radical center, unless the centers are collinear

## Conditions
The circles are not concentric. For three circles the centers must not lie on one line, or the three axes are parallel and there is no radical center.

## Why it works
The power of a point is a quadratic expression in its coordinates, and the quadratic parts of any two circles are the same, so setting two powers equal leaves a linear equation.

Write a circle as $x^2 + y^2 + Dx + Ey + F = 0$. The power of a point $(x, y)$ is exactly the left side evaluated there, so subtracting two such equations cancels $x^2 + y^2$ and leaves $$(D_1 - D_2)x + (E_1 - E_2)y + (F_1 - F_2) = 0:$$ the locus of equal power is a line. It is perpendicular to $O_1O_2$ because each power depends only on the distance to its own center, so the locus is symmetric about the line of centers.

For three circles, a point with equal power to circles $1$ and $2$, and to circles $2$ and $3$, has equal power to circles $1$ and $3$. So where two of the axes cross, the third passes too, and the three axes meet at the radical center.

{{figure:center}}

## Useful observations
- When the circles meet, the common chord is the radical axis, so subtracting the equations gives the chord's line with no intersection points to compute. For $x^2 + y^2 = 25$ and $(x - 6)^2 + y^2 = 9$, subtracting gives $x^2 - (x - 6)^2 = 25 - 9$, so $12x - 36 = 16$ and the chord lies on $x = \frac{13}{3}$.
- Every point of the axis has equal tangent lengths to both circles, which turns a statement about lengths into one equation, and the axis is perpendicular to the line of centers, which gives a direction for free.
- The radical center is the standard way to prove three lines concurrent: each is shown to be the radical axis of a pair among three circles. When it lies outside all three circles, it is also the center of a circle crossing all three at right angles.

## Applications
Common chords from circle equations, equal tangent lengths, concurrency proofs, and locating a point with equal power to several circles.

## Contest profile
Five problems here, four of them AIME, one solved by it alone and three combined with power of a point. Almost every appearance has one of two shapes: two circles meet and the question is really about their common chord, or a point has equal power to two circles and the axis locates it. Olympiad problems add a third use, concurrency through a radical center.
`,

"miquels-theorem": String.raw`
## Key forms
- $\odot(AEF)$, $\odot(BFD)$, $\odot(CDE)$ meet at one point — for any points $D$, $E$, $F$ on the lines $BC$, $CA$, $AB$, the circle through each vertex and its two adjacent chosen points passes through a common point, the Miquel point
- the Miquel point is the center of the [[spiral-similarity|spiral similarity]] taking the configuration of $EF$ to that of $BC$

## Conditions
$D$, $E$, $F$ lie on the side lines, not necessarily on the segments. The points are distinct from the vertices, so that each circle is determined.

## Why it works
Let the circles through $(B, F, D)$ and $(C, D, E)$ meet again at $M$. Cyclic quadrilaterals give $\angle FMD = 180^\circ - B$ and $\angle DME = 180^\circ - C$, so $\angle FME = 360^\circ - (180^\circ - B) - (180^\circ - C) = B + C = 180^\circ - A$, which says exactly that $A, F, M, E$ are concyclic. One angle chase, fully general.

## Useful observations
- A configuration with one point on each side of a triangle and circles through vertex-adjacent triples has its three circles sharing a point, often the key hidden point of the problem.
- The spiral-similarity connection: the Miquel point is the center of the spiral similarity taking the $EF$ configuration to the $BC$ one.
- The complete-quadrilateral version, the Miquel point of four lines, is an olympiad staple.

## Applications
Three circles with a common point, hidden concurrency points, and spiral-similarity configurations.

## Contest profile
AIME-level circle problems sometimes plant a Miquel configuration without naming it; recognizing "three circles, one per vertex" saves the day.
`,

"pascals-theorem": String.raw`
## Key forms
- $AB \cap DE$, $BC \cap EF$, and $CD \cap FA$ are collinear — for a hexagon $ABCDEF$ inscribed in a circle, self-intersecting allowed
- the degenerate forms: letting adjacent vertices merge turns a side into the tangent at that point
- the dual is Brianchon's Theorem: a hexagon circumscribed about a circle has its three main diagonals concurrent

## Conditions
The six points lie on a circle, or on any conic. Different orderings of the same six points give different hexagons and different Pascal lines.

## Why it works
For a circle the cleanest proof is [[menelaus-theorem|Menelaus]] three times. Let the lines $AB$, $CD$, $EF$ form a triangle $XYZ$, with $X = EF \cap AB$, $Y = AB \cap CD$, $Z = CD \cap EF$, and let $P = AB \cap DE$, $Q = BC \cap EF$, $R = CD \cap FA$. All lengths below are signed.

Step 1. Menelaus for triangle $XYZ$ with the lines $DE$, $BC$ and $FA$ gives
$$\frac{XP}{PY} \cdot \frac{YD}{DZ} \cdot \frac{ZE}{EX} = \frac{XB}{BY} \cdot \frac{YC}{CZ} \cdot \frac{ZQ}{QX} = \frac{XA}{AY} \cdot \frac{YR}{RZ} \cdot \frac{ZF}{FX} = -1.$$

Step 2. Multiply the three. The factors that are not about $P$, $Q$, $R$ group by vertex into $\frac{XA \cdot XB}{XE \cdot XF}$, $\frac{YC \cdot YD}{YA \cdot YB}$ and $\frac{ZE \cdot ZF}{ZC \cdot ZD}$, and each is $1$ by the [[power-of-a-point|power of the point]] $X$, $Y$ or $Z$.

Step 3. What is left is $\frac{XP}{PY} \cdot \frac{YR}{RZ} \cdot \frac{ZQ}{QX} = -1$, so by the converse of Menelaus, $P$, $R$, $Q$ are collinear.

The same proof works when two vertices merge, with the tangent in place of the side and the tangent length squared as the power. For any conic, a [[projective-transformations|projective map]] sends the conic to a circle and keeps lines and intersections. Brianchon's Theorem is the polar dual: taking polars with respect to the circle turns tangent lines into points of contact and collinear points into concurrent lines.

## Useful observations
- The degenerate versions do the work: merging two adjacent vertices makes the side through them the tangent at that point. With a triangle, three merged pairs, Pascal says tangent-at-$A$ $\cap\, BC$, tangent-at-$B$ $\cap\, CA$, tangent-at-$C$ $\cap\, AB$ are collinear.
- The cyclic-quadrilateral case merges one pair only, and is the version that turns up. Taking $ABCD$ on a circle and the hexagon $AABCDD$, where the repeated letters mean the tangents at $A$ and at $D$, the three intersections tangent-at-$A$ $\cap\, CD$, tangent-at-$D$ $\cap\, AB$, and $BC \cap AD$ are collinear.
- Merging a different pair, or reordering, gives the companion statements: running $ABBCDD$ instead puts the tangent at $B$ into the line.
- Brianchon's Theorem, its projective dual, swaps points for lines and an inscribed hexagon for a circumscribed one, and handles tangential polygons.

## Applications
Collinearity of intersection points of chords and tangents, and a tangent and a side extension collapsing to a collinearity.

## Contest profile
An olympiad tool; on the AIME its degenerate forms occasionally shortcut collinearity claims that would otherwise need heavy computation. It is worth knowing mainly for recognition: six points on a circle with intersecting chord extensions is the tell.
`,

"homothety-monge": String.raw`
## When to use
Two circles tangent internally or externally, with a chord, tangent line, or diameter attached to one of them; two circles with common external or internal tangents; three circles and the intersections of their common tangents; and figures with parallel lines from a common point, such as a triangle and its medial triangle. The tell is a figure that contains a smaller copy of part of itself.

Two circles that cross, with no tangency and no parallel structure, are a question about their common chord and radical axis, not about a homothety.

## How
1. Locate the center: a point of tangency, or a center of similitude, which divides the line of centers in the ratio of the radii.
2. Find the ratio, $\frac{r_2}{r_1}$ for two circles, negative for the internal center.
3. Carry everything attached to one circle onto the other: tangent lines, contact points, and arc midpoints.
4. For three circles, compose homotheties: the external centers of similitude are collinear by Monge's Theorem.

A circle is internally tangent at $T$ to a larger circle, and a chord $AB$ of the larger circle touches the smaller one at $S$. The homothety at $T$ sends the small circle onto the large one and the tangent line $AB$ to the parallel tangent line of the large circle, which touches it at the midpoint $M$ of the arc $AB$ not containing $T$. So $T$, $S$ and $M$ are collinear, and $TS$ bisects angle $ATB$.

{{figure:similitude}}

## Why it works
A homothety with center $P$ and ratio $k$ is multiplication by $k$ in vectors based at $P$, so it multiplies every length by $|k|$ and keeps every direction. Circles go to circles, lines to parallel lines, and tangency to tangency. Two circles with centers $O_1$, $O_2$ and radii $r_1 \ne r_2$ are matched by the homothety centered at the point $E$ of line $O_1O_2$ with $\frac{EO_2}{EO_1} = \frac{r_2}{r_1}$, which maps $O_1$ to $O_2$ and scales $r_1$ to $r_2$.

Composing the homothety from circle $1$ to circle $2$ with the one from circle $2$ to circle $3$ gives a homothety from circle $1$ to circle $3$, and the center of a composition lies on the line through the two centers. With positive ratios the composition is the external one, which is Monge's Theorem.

## Formulas it uses
- [[monges-theorem]]: the three external centers of similitude of three circles are collinear.
- [[similar-figures-ratios]]: the image figure is similar to the original with ratio $|k|$, so lengths scale and angles stay.
- [[tangent-circles]]: two tangent circles have their point of contact on the line of centers, which is a center of similitude.

## Common traps
- Placing the external center of similitude between the circles; it lies outside, beyond the smaller circle, while the internal one lies between them.
- Using a positive ratio for the internal center, which reverses directions.
- Applying the homothety at a point of tangency to a part of the figure attached to neither circle.

## Contest profile
An AIME and olympiad tool for tangent circles: the tangent-chord lemma and the location of similitude centers recur, and Monge's Theorem settles three-circle collinearity at once.
`

});

Object.assign(window.MATH_DETAILS, {

"linear-change-of-variables": String.raw`
## When to use
Areas of regions bounded by lines or by absolute values of linear expressions, such as $|x + y| + |x - y| \le 2$ or $|2x + y| \le 3$ with $|x - y| \le 1$; lattice points on $x^2 - y^2 = n$; and any problem written in two linear combinations of the coordinates. The tell is a region with slanted edges in only two directions. Edges in three or more directions are not straightened by a single linear change.

## How
1. Set $u$ and $v$ equal to the expressions the problem is written in, $u = ax + by$ and $v = cx + dy$, with $ad - bc \ne 0$.
2. Rewrite the region or condition in $u$ and $v$, where it is usually a rectangle, a square, or a product.
3. Find the area in the $uv$-plane, and divide by $|ad - bc|$ to get the area in the $xy$-plane.
4. For lattice points, check which integer pairs $(u, v)$ come from integer $(x, y)$, usually a parity condition.

The region $|x + y| + |x - y| \le 2$ becomes $|u| + |v| \le 2$ with $u = x + y$ and $v = x - y$, a square on its corner of area $8$. The determinant is $1 \cdot (-1) - 1 \cdot 1 = -2$, so the original region has area $4$; it is the square $\max(|x|, |y|) \le 1$.

{{figure:region}}

## Why it works
The map $(x, y) \mapsto (ax + by, cx + dy)$ is linear, so it sends the unit square to the parallelogram spanned by $(a, c)$ and $(b, d)$, of area $|ad - bc|$, and every square of the grid to a translated copy of that parallelogram. A region made of many small squares becomes the same number of parallelograms, so every area is multiplied by $|ad - bc|$, as the figure at the top shows.

The map is reversible exactly when $ad - bc \ne 0$, and then the inverse divides areas by the same factor. Lattice points need care: integer points go to integer points, but not onto all of them; with $u = x + y$ and $v = x - y$, the images are exactly the pairs with $u$ and $v$ of the same parity.

## Formulas it uses
- [[determinant-geometric]]: the parallelogram spanned by $(a, c)$ and $(b, d)$ has area $|ad - bc|$, the area scale factor.
- [[absolute-value-rules]]: $|u| \le k$ is the strip $-k \le u \le k$, so absolute values of linear expressions become sides of a rectangle.
- [[difference-of-squares]]: $x^2 - y^2 = (x + y)(x - y) = uv$, which turns a hyperbola into factor pairs.

## Common traps
- Multiplying by the determinant instead of dividing when going back to the $xy$-plane.
- Forgetting the absolute value of a negative determinant.
- Counting every integer pair $(u, v)$ as a lattice point, without the parity condition.
- Choosing $u$ and $v$ with $ad - bc = 0$, which loses information.

## Contest profile
An AMC 12 and AIME tool for areas of slanted regions and lattice points on hyperbolas; $u = x + y$, $v = x - y$ is by far the most common choice.
`,

"polar-coordinates": String.raw`
## Key forms
- $x = r\cos\theta$ and $y = r\sin\theta$ — from polar to rectangular coordinates
- $r^2 = x^2 + y^2$ and $\tan\theta = \dfrac yx$ — from rectangular to polar, with the quadrant chosen to match the signs of $x$ and $y$
- area of a polar cell $\approx r\,\Delta r\,\Delta\theta$ — larger far from the origin
- $z = r(\cos\theta + i\sin\theta)$ — the same two numbers as the modulus and argument of a complex number

## Conditions
The angle $\theta$ is measured counterclockwise from the positive $x$-axis. A point has many polar descriptions, since adding $2\pi$ to $\theta$, or flipping the sign of $r$ and adding $\pi$, names the same point.

## Why it works
The point at distance $r$ from the origin in direction $\theta$ is $r$ times the point at angle $\theta$ on the unit circle, which is $(\cos\theta, \sin\theta)$. So $$x = r\cos\theta, \qquad y = r\sin\theta,$$ and squaring and adding gives $r^2 = x^2 + y^2$, while dividing gives $\tan\theta = \frac yx$.

To convert an equation, those formulas are substituted, or the equation is first multiplied through by $r$ so that $r\cos\theta$, $r\sin\theta$, and $r^2$ appear. For $r = 2\cos\theta$, multiplying by $r$ gives $$x^2 + y^2 = 2x \iff (x - 1)^2 + y^2 = 1,$$ a circle through the origin.

{{figure:circle}}

The figure shows why without algebra: $O$ and $(2, 0)$ are the ends of a diameter, so the angle at any point $P$ of the circle is a right angle, and $OP = 2\cos\theta$.

Unlike a [[linear-change-of-variables|linear change of variables]], polar coordinates stretch areas by different amounts in different places. A small cell with side $\Delta r$ along a ray and $r\,\Delta\theta$ along an arc is nearly a rectangle, so its area is about $$r\,\Delta r\,\Delta\theta,$$ which grows with $r$. That factor $r$ plays the part of the determinant, and in calculus it is called the Jacobian.

{{figure:cell}}

## Useful observations
- Polar coordinates suit a problem about distance from the origin or direction from it: $\sqrt{x^2 + y^2}$, $x^2 + y^2 = k$, circles through the origin, or points spread evenly in angle. A rotation by $\alpha$ about the origin is simply $\theta \mapsto \theta + \alpha$.
- A region swept out by a radius that changes with the angle is made of thin sectors, each of area about $\frac12r^2\,\Delta\theta$, so its area is the sum of those slivers. For a constant radius this is the [[circle-basics|sector area]] $\frac12r^2\theta$.
- In the complex plane, multiplying complex numbers multiplies the $r$'s and adds the angles, which is [[de-moivre|De Moivre's Theorem]].

## Applications
Circles about or through the origin, rotations, curves such as $r = 4\sin\theta$ and roses, and complex numbers written by modulus and argument.

## Contest profile
No problems here are tagged with it yet. On the AMC 12 it appears as a curve given in polar form, a circle or a rose, to be identified or measured, and on the AIME it sits inside complex numbers written by modulus and argument.
`,

"shared-angle-area-ratio": String.raw`
## Key forms
- $\frac{[AXY]}{[ABC]} = \frac{AX \cdot AY}{AB \cdot AC}$ — for two triangles with equal angles at $A$
- the same product holds when the angles are supplementary, $\angle XAY = 180^\circ - \angle BAC$
- $\frac{[PAC]}{[PBD]} = \frac{PA \cdot PC}{PB \cdot PD}$ — two triangles meeting at a crossing point $P$, where the vertical angles are equal

## Conditions
The two triangles have angles that are equal or that add to $180^\circ$, and the ratio uses the sides enclosing those angles. This is the bird's-head model, named for the extended-side figure.

## Why it works
Both areas are half a product of two sides times the sine of the angle between them, $$[AXY] = \tfrac12\,AX \cdot AY\sin\angle A, \qquad [ABC] = \tfrac12\,AB \cdot AC\sin\angle A,$$ so in the ratio the sines cancel and only the side ratios remain.

The cancellation needs the sines to be equal, not the angles, and $\sin\theta = \sin(180^\circ - \theta)$. So supplementary angles work exactly as well as equal ones, and that single observation turns one picture into a family: a point extended past the vertex, or two triangles on opposite sides of a crossing, give the same product.

A second proof needs no sines, only [[cevian-area-ratio|same-height base ratios]]: draw $BY$. Triangles $AXY$ and $ABY$ share the apex $Y$ and have their bases $AX$ and $AB$ on one line, and triangles $ABY$ and $ABC$ share the apex $B$ with bases $AY$ and $AC$ on one line. So $$\frac{[AXY]}{[ABC]} = \frac{[AXY]}{[ABY]} \cdot \frac{[ABY]}{[ABC]} = \frac{AX}{AB} \cdot \frac{AY}{AC}.$$

{{figure:heights}}

The first step uses only the line through $A$ and $B$, so it works just as well when $X$ lies on $BA$ extended past $A$.

## Useful observations
- The four figures: $X$ on $AB$ and $Y$ on $AC$, the small triangle cut off at a corner; $X$ on $BA$ extended past $A$, where the angle is supplementary and the product is unchanged; two triangles meeting at a crossing point; and any two triangles whose angles are equal or supplementary.
- Chained around a figure, one product per corner triangle, subtracted from the whole, it reaches the middle region.
- Its relatives are the [[same-base-area-ratio|same-base ratio]], cevian area ratios, and the [[area-method|area method]].

## Applications
Fractions of a triangle's area cut off by points on its sides, including points on extensions, and areas of triangles that share an angle.

## Contest profile
Everywhere on the AMC 10 and 12 as points on two sides asking for a fraction of the area, and the standard first step in AIME area dissections, often fed by an [[angle-bisector-theorem|angle bisector]]'s side ratio.
`,

"exradii": String.raw`
## Key forms
- $r_a = \frac{K}{s - a} = s\tan\frac A2$ — the radius of the excircle opposite $A$, mirroring $r = \frac Ks$
- $\frac1r = \frac1{r_a} + \frac1{r_b} + \frac1{r_c}$ — the reciprocals of the exradii add up to the reciprocal of the inradius
- $r\,r_ar_br_c = K^2$ — the product of the four radii is the square of the area
- $r_a + r_b + r_c = 4R + r$ — the exradii sum
- $r_a = 4R\sin\frac A2\cos\frac B2\cos\frac C2$ — the trigonometric form
- $\frac{r}{r_a} = \frac{s - a}{s}$ — the ratio of the homothety at $A$ carrying the incircle to the $A$-excircle

## Conditions
The $A$-excircle is tangent to side $a$ and to the extensions of the other two sides; $s$ is the semiperimeter, $K$ the area, $r$ the inradius and $R$ the circumradius, with angles $A$, $B$, $C$ written by their vertices.

## Why it works
The excenter opposite $A$ sits at the intersection of the external bisectors from $B$ and $C$; joining it to the vertices splits the triangle with signed areas, giving $K = r_a(s - a)$ in place of $K = rs$. The tangent-length bookkeeping mirrors the incircle's, but the tangent length from $A$ is now $s$ itself, and that gives $r_a = s\tan\frac A2$ while $r = (s - a)\tan\frac A2$.

## Useful observations
- Any incircle technique has an excircle twin; the touch point of the $A$-excircle on $BC$ mirrors the incircle's touch point across the midpoint of $BC$.
- Multiplying the four radius formulas, $r = \frac Ks$, $r_a = \frac K{s - a}$, $r_b = \frac K{s - b}$, $r_c = \frac K{s - c}$, gives $r\,r_ar_br_c = \frac{K^4}{s(s - a)(s - b)(s - c)} = K^2$ by Heron's Formula.
- The [[incenter-excenter-lemma|incenter-excenter lemma]] connects the excenter $I_A$ to the arc midpoints of the circumcircle.

## Applications
Excircle radii and tangent lengths, and identities between the inradius, the exradii, and the area.

## Contest profile
AIME problems about a circle tangent to one side and the extensions of the other two are excircle problems in disguise; the mirror-image touch point and the relation between the exradii and the area appear as key steps.
`,

"ratio-lemma": String.raw`
## Key forms
- $\dfrac{BD}{DC} = \dfrac{AB}{AC} \cdot \dfrac{\sin\angle BAD}{\sin\angle DAC}$ — for any cevian $AD$
- bisector: the sine ratio is $1$, giving $\frac{BD}{DC} = \frac{AB}{AC}$
- median: $BD = DC$, giving $\frac{\sin\angle BAD}{\sin\angle DAC} = \frac{AC}{AB}$

## Conditions
$D$ is a point of the side $BC$ (or its extension, with the usual care about signs), and the angles are the two parts into which $AD$ divides angle $A$.

## Why it works
Triangles $ABD$ and $ACD$ share the altitude from $A$ onto line $BC$, and also the side $AD$, so
$$\frac{BD}{DC} = \frac{[ABD]}{[ACD]} = \frac{\tfrac12\,AB \cdot AD \sin\angle BAD}{\tfrac12\,AC \cdot AD \sin\angle DAC} = \frac{AB \sin\angle BAD}{AC \sin\angle DAC}.$$

The special cevians follow by putting in their angles. For the bisector the two angles are equal. For the median $BD = DC$, so the sine ratio must be $\frac{AC}{AB}$.

For the altitude, $\angle BAD = 90^\circ - B$ and $\angle DAC = 90^\circ - C$, so the sine ratio is $\frac{\cos B}{\cos C}$. The symmedian is the median reflected in the bisector, so its two angles are the median's two angles swapped, and its sine ratio is $\frac{AB}{AC}$; then
$$\frac{BD}{DC} = \frac{AB}{AC} \cdot \frac{AB}{AC} = \left(\frac{AB}{AC}\right)^2.$$

## Useful observations
- It is the all-purpose converter between side data and angle data for a cevian.
- For the altitude the sine ratio is $\frac{\cos B}{\cos C}$, and for the symmedian it makes $\frac{BD}{DC} = \left(\frac{AB}{AC}\right)^2$.
- Multiplying the three instances around a triangle gives [[trig-ceva|trigonometric Ceva]].
- It replaces a page of Law of Sines bookkeeping in problems that give one cevian angle and ask for a length split.

## Applications
Splits of a side from the angles a cevian makes, and angles from a given split.

## Contest profile
The clean way through AIME problems that give one cevian angle and ask for a length ratio, or the reverse.
`,

"incenter-excenter-lemma": String.raw`
## Key forms
- $MB = MC = MI = MI_A$ — where $M$ is the midpoint of arc $BC$ not containing $A$, so $B$, $C$, $I$, and $I_A$ lie on a circle centered at $M$
- $A$, $I$, $M$, $I_A$ lie on the bisector of $\angle A$, and $M$ is the midpoint of $II_A$
- $MB = 2R\sin\dfrac A2 = \dfrac{a}{2\cos\frac A2}$ — the radius of that circle
- $AI = \dfrac{r}{\sin\frac A2}$ and $AI \cdot IM = 2Rr$

## Conditions
$M$ is the arc midpoint on the circumcircle, on the side of $BC$ away from $A$, and $I_A$ is the excenter opposite $A$. The lemma holds for every triangle, acute, right, or obtuse.

## Why it works
Everything comes from an angle chase showing that triangle $MBI$ is isosceles.

Angle chase: $\angle IBM = \angle IBC + \angle CBM = \frac{B}{2} + \frac{A}{2}$, since the inscribed angle $\angle CBM$ equals $\angle CAM = \frac{A}{2}$. The exterior angle of $\triangle ABI$ gives $\angle BIM = \frac{A}{2} + \frac{B}{2}$. So $\triangle MBI$ is isosceles and $MB = MI$. The same argument at $C$ gives $MC = MI$.

For the excenter, the internal and external bisectors at $B$ are perpendicular, so $\angle IBI_A = 90^\circ$, and likewise at $C$. Then $B$ and $C$ lie on the circle with diameter $II_A$, whose center is the midpoint of $II_A$ and lies on the perpendicular bisector of $BC$. That bisector meets the bisector of $\angle A$ at $M$, so $M$ is that midpoint and $MI_A = MI$.

## Useful observations
- A circle through $B$, $C$, $I$, and $I_A$ with a known center and radius $MB = 2R\sin\frac A2$ turns many "find $AI$ or $IM$" problems into one law-of-cosines application inside it.
- The power of $I$ with respect to the circumcircle is $AI \cdot IM$, and equating it to $R^2 - OI^2 = 2Rr$ from [[euler-distance-theorem|Euler's Distance Formula]] gives $AI \cdot IM = 2Rr$.
- $AI \cdot AI_A = bc$, since $AI = \frac{r}{\sin(A/2)}$, $AI_A = \frac{r_a}{\sin(A/2)}$, and $r\,r_a = (s-b)(s-c)$.

## Applications
Problems with an incenter and a circumcircle in the same figure, lengths such as $AI$, $IM$, and $II_A$, and any statement that a point is equidistant from $B$, $C$, and $I$.

## Contest profile
Arguably the single most useful AIME circle lemma: it silently powers most configurations with the incenter and the circumcircle. A phrase about a perpendicular bisector of the bisector segment, or a circle through two vertices and the incenter, signals it, because that circle's center is always the arc midpoint.
`,

"orthocenter-properties": String.raw`
## Key forms
- $AH = 2R\cos A$ — the distance from a vertex to the orthocenter, and $HD = 2R\cos B\cos C$ from the orthocenter to the foot $D$ of that altitude
- $AH^2 + BC^2 = 4R^2$ — the vertex-to-orthocenter distance and the opposite side are the legs of a right triangle with hypotenuse the diameter
- the reflection of $H$ over $BC$ lies on the circumcircle, and so does its reflection over the midpoint of $BC$, which is the point opposite $A$
- the circle through $H$, $B$, and $C$ has radius $R$ — it is the circumcircle reflected over $BC$
- $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$ with the circumcenter $O$ as origin

## Conditions
All of it holds in every triangle, with signs read carefully. In an obtuse triangle $H$ lies outside, and the distance is $2R\lvert\cos A\rvert$. In a right triangle with the right angle at $A$, $H = A$ and $AH = 0$.

## Why it works
All of these facts come from two reflections of $H$, one over a side and one over that side's midpoint.

Reflect $H$ over $BC$. The image sees $BC$ at the same angle as $H$ does, and $\angle BHC = 180^\circ - \angle A$: the quadrilateral formed by $A$, $H$, and the feet of the altitudes from $B$ and $C$ has two right angles, so its other two angles add to $180^\circ$. So the image sees $BC$ at $180^\circ - \angle A$, which is exactly the condition for lying on the circumcircle, on the arc opposite $A$.

Now reflect $H$ over the midpoint $M$ of $BC$, and call the image $A'$. The diagonals of $BHCA'$ bisect each other at $M$, so it is a parallelogram, with $BH \parallel CA'$ and $CH \parallel BA'$. Since $BH \perp AC$, the line $CA'$ is perpendicular to $AC$ too, so $\angle ACA' = 90^\circ$, and in the same way $\angle ABA' = 90^\circ$. By [[thales-theorem|Thales' Theorem]], $A'$ is on the circumcircle, opposite $A$.

{{figure:parallelogram}}

The distances follow. $O$ is the midpoint of $AA'$ and $M$ is the midpoint of $HA'$, so in triangle $AHA'$ the segment $OM$ joins two midpoints and $$AH = 2\,OM.$$ The central angle over $BC$ is $2A$, so $OM = R\cos A$ and $AH = 2R\cos A$.

## Useful observations
- The circle through $H$, $B$, and $C$ is the reflection of the circumcircle over $BC$, so it has the same radius $R$; a circle through $H$ and two vertices is therefore reflected back to the circumcircle at once.
- $AH = 2\,OM = 2R\cos A$ links lengths at the orthocenter to lengths at the circumcenter. Since $BC = 2R\sin A$, it gives $AH^2 + BC^2 = 4R^2$.
- The altitude from $A$ has length $AD = 2R\sin B\sin C$, so $HD = AD - AH = 2R(\sin B\sin C - \cos A) = 2R\cos B\cos C$, because $\cos A = -\cos(B + C)$.
- With $O$ at the origin, $H = A + B + C$ as vectors, the quickest route to coordinates.
- With the three vertices, $H$ forms an [[orthocentric-system|orthocentric system]], in which each of the four points is the orthocenter of the other three.
- The distances $AH = 2R\cos A$ and $HD = 2R\cos B\cos C$ are signed: in an obtuse triangle one of them is negative and $H$ lies outside, so a relation proved with unsigned lengths for an acute triangle must be rechecked ([[directed-lengths|directed lengths]] keep track of this).

## Applications
Triangles given with their circumradius and an orthocenter distance, circles through the orthocenter and two vertices, and the lengths of the altitude segments $AH$ and $HD$.

## Contest profile
Three problems here, two AIME and one HMMT, none solved by it alone, and two finish with [[power-of-a-point|power of a point]]. The distances $2R\cos A$ also give the sides of the orthic triangle, and the products $AH \cdot HD$ along the three altitudes are all equal, which is the power of the point $H$ with respect to the circumcircle.
`,

"fermat-point": String.raw`
## Key forms
- $\min_X(XA + XB + XC)$ occurs where $\angle AXB = \angle BXC = \angle CXA = 120^\circ$ — valid when every angle of $\triangle ABC$ is less than $120^\circ$
- if an angle is at least $120^\circ$, the minimizer is that vertex, and the minimum is the sum of the two sides at it
- the minimum equals the distance from a vertex to the apex of the equilateral triangle erected outward on the opposite side, $\sqrt{b^2 + c^2 - 2bc\cos(A + 60^\circ)}$

## Conditions
The triangle's largest angle decides the case. The construction of the point needs all angles below $120^\circ$; otherwise there is no interior point with three $120^\circ$ angles.

## Why it works
Rotate triangle $APB$ by $60^\circ$ about $B$: the path $AP + PC$ becomes a broken path of the same total length, and the extra segment $PP'$ equals $BP$ because triangle $PBP'$ is equilateral. So $PA + PB + PC$ equals the length of a path from a fixed erected vertex to $C$, minimized when it is straight, which forces the $120^\circ$ angles.

## Useful observations
- For "minimize the sum of distances to three points," the largest angle is checked first: if it is at least $120^\circ$, the answer is at that vertex.
- Otherwise the minimum value is computable by the rotation, as one law-of-cosines evaluation with an angle increased by $60^\circ$.
- The point is constructed by erecting equilateral triangles outward on the sides and joining each new apex to the opposite vertex; the three lines concur at the Fermat point.

## Applications
Shortest total cable or road to three towns, minimal sums of distances to three points, and configurations with three segments meeting at $120^\circ$.

## Contest profile
The engine behind "shortest total cable" problems and AIME minimizations of the total distance from a point to several vertices. On the AMC the $120^\circ$ structure often arrives pre-installed, as three roads meeting at $120^\circ$, and is recognized as Fermat-point optimality.
`,

"point-plane-distance": String.raw`
## Key forms
- $d = \dfrac{|ax_0 + by_0 + cz_0 + d_0|}{\sqrt{a^2 + b^2 + c^2}}$ — the distance from $(x_0, y_0, z_0)$ to the plane $ax + by + cz + d_0 = 0$
- $h = \dfrac{3V}{A}$ — the distance from a vertex to the opposite face of a pyramid with volume $V$ and face area $A$
- a sphere with center $P$ and radius $r$ is tangent to the plane exactly when the distance from $P$ to the plane equals $r$

## Conditions
The plane is written with everything on one side, and $(a, b, c) \ne (0, 0, 0)$ is its normal vector.

## Why it works
The vector $(a, b, c)$ is perpendicular to the plane, and the distance is the part of any vector from the plane to the point that runs along it.

For two points of the plane, subtracting their equations gives $a\,\Delta x + b\,\Delta y + c\,\Delta z = 0$, so $(a, b, c)$ is perpendicular to every direction within the plane. For any point $Q$ of the plane, the component of $\vec{QP}$ along the unit normal is the perpendicular distance, and because $Q$ satisfies the equation it simplifies to $\frac{ax_0 + by_0 + cz_0 + d_0}{\sqrt{a^2 + b^2 + c^2}}$. This is the argument of [[point-line-distance|the distance from a point to a line]] with one more coordinate.

The volume route is the pyramid formula read backwards: a pyramid with base area $A$ and height $h$ has volume $\frac13Ah$, so $h = \frac{3V}{A}$.

{{figure:corner}}

## Useful observations
- The plane is built first: its normal is the [[cross-product-area|cross product]] of two edge vectors, and $d_0$ comes from substituting any known point.
- When the plane is a face of a tetrahedron with an easy volume, the height $\frac{3V}{A}$ is often quicker, as at the corner of a cube. Both routes are worth keeping, since one of them is usually painless.

## Applications
Distances from points to planes, heights of pyramids, and spheres tangent to planes.

## Contest profile
Mostly AIME: the plane is set up with [[coordinate-bash|coordinates]], or the distance finds the [[insphere-radius|radius of an inscribed sphere]], which is the distance from its center to each face.
`,

"ravi-substitution": String.raw`
## When to use
Inequalities in the sides of a triangle, such as $abc \ge (a + b - c)(b + c - a)(c + a - b)$; identities involving the semiperimeter $s$ and $s - a$, $s - b$, $s - c$; and counts of triangles with integer sides and a given perimeter. The tell is that the triangle inequality keeps appearing as a side condition. It is a substitution for the sides, so a triangle given by angles needs something else.

## How
1. Set $x = s - a$, $y = s - b$, $z = s - c$, so $a = y + z$, $b = z + x$, $c = x + y$ and $s = x + y + z$.
2. Translate every expression; the triangle inequality becomes simply $x, y, z > 0$.
3. Solve the new problem with free positive variables, using AM-GM, symmetric inequalities, or stars and bars.
4. Translate back, checking equality cases: $x = y = z$ is an equilateral triangle.

Prove that $abc \ge (a + b - c)(b + c - a)(c + a - b)$ for any triangle. Since $a + b - c = 2z$, $b + c - a = 2x$ and $c + a - b = 2y$, the claim is $(y + z)(z + x)(x + y) \ge 8xyz$. By AM-GM, $y + z \ge 2\sqrt{yz}$, and multiplying the three such bounds gives exactly that, with equality for the equilateral triangle.

## Why it works
The incircle touches the three sides, and the two tangent segments from a vertex are equal. Calling them $x$, $y$, $z$ for the vertices $A$, $B$, $C$, each side is the sum of the two tangent lengths at its ends. Adding all three sides gives $2(x + y + z) = 2s$, so $x = s - a$ and so on.

Conversely, any positive $x$, $y$, $z$ give numbers $y + z$, $z + x$, $x + y$ that satisfy all three triangle inequalities, since, for example, $(y + z) + (z + x) - (x + y) = 2z > 0$. So triangles and positive triples correspond exactly, and Heron's Formula becomes $\sqrt{s(s - a)(s - b)(s - c)} = \sqrt{(x + y + z)xyz}$.

## Formulas it uses
- [[incircle-tangent-lengths]]: the tangent lengths from the vertices are $s - a$, $s - b$, $s - c$, the new variables.
- [[herons-formula]]: becomes $A = \sqrt{xyz(x + y + z)}$, symmetric in the new variables.
- [[triangle-inequality]]: the constraint that the substitution turns into positivity.
- [[am-gm]]: applies directly to the free positive variables, as in $y + z \ge 2\sqrt{yz}$.

## Common traps
- Forgetting that for an odd perimeter the tangent lengths are half-integers, not integers, when counting integer triangles.
- Translating only some of the expressions, which mixes old and new variables.
- Allowing $x$, $y$ or $z$ to be zero, which gives a degenerate triangle.

## Contest profile
An olympiad standard for triangle inequalities, and an AIME shortcut for counting integer triangles by perimeter.
`

});

Object.assign(window.MATH_DETAILS, {

"center-distance-formulas": String.raw`
## Key forms
- $OH^2 = 9R^2 - (a^2 + b^2 + c^2)$ — the distance between the circumcenter and the orthocenter
- $OG^2 = R^2 - \dfrac19(a^2 + b^2 + c^2)$ — the distance to the centroid, $OG = \dfrac{OH}{3}$
- $R^2 - OI^2 = 2Rr$ — the power of the incenter with respect to the circumcircle, equivalent to $OI^2 = R(R - 2r)$
- $OH^2 = R^2(1 - 8\cos A\cos B\cos C)$ — the same distance in terms of the angles

## Conditions
The triangle has sides $a, b, c$, circumradius $R$, and inradius $r$. For a right triangle $a^2 + b^2 + c^2 = 8R^2$, so $OH = R$, and $H$ is the right-angle vertex.

## Why it works
With the circumcenter as origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$. Expanding $\lvert\vec{OH}\rvert^2$ gives $3R^2$ plus dot products, and each $\vec{OA} \cdot \vec{OB} = R^2\cos 2C = R^2 - \frac{c^2}{2}$; summing produces $9R^2 - \sum a^2$.

Dividing the [[euler-line-ratio|Euler line]] in thirds gives $OG$. The incenter identity is the power of $I$: a chord through $I$ and a vertex has segment product $2Rr$, by the [[incenter-excenter-lemma|Incenter–Excenter Lemma]].

## Useful observations
- Given the sides, or $\sum a^2$, and $R$, all the Euler-line distances follow. It runs backwards too: contest problems specify $OH$ or $OG$ and ask for $\sum a^2$.
- $OH^2 \ge 0$ always, so $\sum a^2 \le 9R^2$; the sign of $\cos A\cos B\cos C$ changes at right triangles, where $OH = R$.

## Applications
Distances between the circumcenter, centroid, orthocenter, and incenter, and side data from a given center distance.

## Contest profile
Decisive in problems that give two centers' distance and ask for side data, or the reverse. It pairs with the incenter distance formula to triangulate all three of the circumcenter, incenter, and orthocenter.
`,

"feuerbach-theorem": String.raw`
## Key forms
- $NI = \dfrac R2 - r$: the distance from the nine-point center $N$ to the incenter $I$ is the difference of the two radii, so the nine-point circle (radius $\frac R2$) is internally tangent to the incircle
- $NI_A = \dfrac R2 + r_A$: the nine-point circle is externally tangent to the excircle opposite $A$, and likewise for $B$ and $C$
- the point where the nine-point circle touches the incircle is the Feuerbach point

## Conditions
$N$ is the midpoint of $OH$, the nine-point circle has radius $\frac R2$, and $r_A$ is the exradius opposite $A$. In an equilateral triangle $N = I$ and $\frac R2 = r$, so the two circles coincide instead of touching.

## Why it works
Tangency is a statement about distances, so the proof computes $NI$. Take the circumcenter $O$ as the origin: $A$, $B$, $C$ are vectors of length $R$, $\vec{OH} = A + B + C$, and, with $p = a + b + c$, $$\vec{OI} = \frac{aA + bB + cC}{p},$$ since the incenter has [[barycentric-coordinates|barycentric weights]] proportional to the opposite sides.

Step 1, three distances. $N$ is the midpoint of $OH$, so $IN$ is a median of triangle $OHI$, and [[apollonius-theorem|Apollonius's Theorem]] gives $$NI^2 = \frac{2\,OI^2 + 2\,HI^2 - OH^2}{4}.$$ The card on [[center-distance-formulas|distances between triangle centers]] supplies $OH^2 = 9R^2 - (a^2 + b^2 + c^2)$ and $OI^2 = R^2 - 2Rr$. Only $HI$ is new.

Step 2, a dot product. From $\lvert A - B\rvert^2 = c^2$ we get $A \cdot B = R^2 - \frac{c^2}{2}$, and likewise for the other pairs. Hence $$\vec{OH} \cdot \vec{OI} = \frac{(A + B + C)\cdot(aA + bB + cC)}{p}$$ and expanding the dot products, $$\vec{OH} \cdot \vec{OI} = 3R^2 - \frac{a(b^2 + c^2) + b(c^2 + a^2) + c(a^2 + b^2)}{2p}.$$

Step 3, simplify. Let $q = ab + bc + ca$. The numerator of the fraction is $pq - 3abc$, and $abc = 2Rrp$, because the area is both $\frac{abc}{4R}$ ([[circumradius-area|Circumradius Formula]]) and $rs = \frac{rp}{2}$. So $\vec{OH} \cdot \vec{OI} = 3R^2 - \frac q2 + 3Rr$. Using $\sum a^2 = p^2 - 2q$, $$HI^2 = OH^2 + OI^2 - 2\,\vec{OH} \cdot \vec{OI} = 4R^2 - p^2 + 3q - 8Rr.$$

Step 4, substitute into Step 1: $$NI^2 = \frac{R^2 - p^2 + 4q - 20Rr}{4}.$$

Step 5, one identity. Expanding $(s - a)(s - b)(s - c) = -s^3 + sq - abc$, and [[herons-formula|Heron's Formula]] says this equals $r^2s$. With $abc = 4Rrs$ this gives $q = s^2 + r^2 + 4Rr$, so $4q - p^2 = 4r^2 + 16Rr$. Then $$NI^2 = \frac{R^2 - 4Rr + 4r^2}{4} = \left(\frac R2 - r\right)^2.$$

Step 6, tangency. By [[euler-distance-theorem|Euler's Distance Formula]], $R \ge 2r$, so $NI = \frac R2 - r$ exactly. Two circles whose center distance is the difference of their radii are internally tangent, and the incircle lies inside.

The excircle form is the same computation with $I_A$, whose weights are $(-a, b, c)$. Every identity above stays true when $a$ is replaced by $-a$ and $r$ by $-r_A$: for instance $abc = 2Rr_Ap'$ with $p' = -a + b + c$, and Heron's relation becomes $s(s - b)(s - c) = r_A^2(s - a)$. The result is $NI_A^2 = \left(\frac R2 + r_A\right)^2$, and since the circles have radii $\frac R2$ and $r_A$, they touch externally.

## Useful observations
- The theorem is an equation linking $R$, $r$, and the position of $N$: two of these determine the third, and in a coordinate computation $NI = \frac R2 - r$ is a free check on the arithmetic.
- Because $NI \ge 0$, the formula contains Euler's inequality $R \ge 2r$ again, with equality exactly when $N = I$, the equilateral triangle.
- The Feuerbach point lies on line $NI$, at distance $\frac R2$ from $N$ and beyond $I$, since that is where two internally tangent circles touch.

## Applications
Distances from the nine-point center to the incenter and the excenters, and statements that the nine-point circle touches the incircle or an excircle.

## Contest profile
Rare, and mostly olympiad-level: it is the hidden reason behind claims that two circles in a triangle figure are tangent, or the equation linking $R$, $r$, and a center distance. Recognizing the configuration is most of its value.
`,

"leibniz-formula": String.raw`
## Key forms
- $PA^2 + PB^2 + PC^2 = 3\,PG^2 + GA^2 + GB^2 + GC^2$, with $G$ the centroid and $P$ any point
- $GA^2 + GB^2 + GC^2 = \dfrac{a^2 + b^2 + c^2}{3}$, so $PA^2 + PB^2 + PC^2 = 3\,PG^2 + \dfrac{a^2 + b^2 + c^2}{3}$
- $\alt{\sum m_iPA_i^2 = M\,PG^2 + \sum m_iGA_i^2}{m_1PA_1^2 + \cdots + m_nPA_n^2 = M\,PG^2 + m_1GA_1^2 + \cdots + m_nGA_n^2}$ for masses $m_i$ at points $A_i$, with total mass $M$ and center of mass $G$

## Conditions
$P$ is any point of the plane or of space. For equal masses the center of mass $G$ is the centroid.

## Why it works
Split each vector at the center of mass: $\vec{PA_i} = \vec{PG} + \vec{GA_i}$. Squaring gives $$PA_i^2 = PG^2 + 2\,\vec{PG} \cdot \vec{GA_i} + GA_i^2.$$

Multiply by $m_i$ and add over all the points: $$\sum m_iPA_i^2 = M\,PG^2 + 2\,\vec{PG} \cdot \sum m_i\vec{GA_i} + \sum m_iGA_i^2.$$ The middle sum is the zero vector, because that is what it means for $G$ to be the center of mass. That proves the general form, and the triangle form is the case of three equal masses.

The constant is a function of the sides. By [[centroid-division|the 2:1 division of the medians]], $GA = \frac23m_a$, and [[apollonius-theorem|Apollonius's Theorem]] gives $m_a^2 = \frac{2b^2 + 2c^2 - a^2}{4}$. So $$GA^2 = \frac{2b^2 + 2c^2 - a^2}{9}.$$ Adding the three versions, each of $a^2$, $b^2$, $c^2$ appears with coefficient $\frac{2 + 2 - 1}{9} = \frac13$, so $GA^2 + GB^2 + GC^2 = \frac{a^2 + b^2 + c^2}{3}$.

Two consequences follow from the form. Since $3\,PG^2 \ge 0$, the sum $PA^2 + PB^2 + PC^2$ is smallest exactly at $P = G$. And the set where it equals $k$ satisfies $$PG^2 = \frac{k - \frac{a^2 + b^2 + c^2}{3}}{3},$$ a circle about $G$ when the right side is positive, the single point $G$ when it is $0$, and empty when it is negative.

## Useful observations
- The minimum value is $\frac{a^2 + b^2 + c^2}{3}$, so no point of the plane has a smaller sum of squared distances to the vertices.
- The proof never used the dimension or the number of points, so the same form holds for tetrahedra and for any finite set of points.
- For the vertices $A, B, C, D$ of a rectangle with center $G$, the two-point version gives $PA^2 + PC^2 = 2PG^2 + 2GA^2$ and $PB^2 + PD^2 = 2PG^2 + 2GB^2$, and $GA = GB$, which is the [[british-flag-theorem|British Flag Theorem]].

## Applications
Minimizing a sum of squared distances, loci defined by a sum of squared distances, and the sum of the squared distances from a point to the vertices of a polygon or solid.

## Contest profile
Locus questions where a sum of squared distances to the vertices is fixed, and minimization questions that end at the centroid. The weighted form handles points with unequal weights as well.
`,

"incenter-coordinates": String.raw`
## Key forms
- $G = \dfrac{A + B + C}{3}$ — the centroid, the average of the vertices
- $I = \dfrac{aA + bB + cC}{a + b + c}$ — the incenter, the side-length-weighted average, with weights $a : b : c$ the [[barycentric-coordinates|barycentric coordinates]] of the incenter
- $\dfrac{m_AA + m_BB + m_CC}{m_A + m_B + m_C}$ — the point with masses $m_A$, $m_B$, $m_C$ at the vertices
- $I_A = \dfrac{-aA + bB + cC}{-a + b + c}$ — the $A$-excenter, one sign flipped

## Conditions
The weights are $a = BC$, $b = CA$, $c = AB$, each attached to the opposite vertex. The coordinates are Cartesian, and the formula applies coordinate by coordinate.

## Why it works
Step 1. The bisector from $A$ meets $BC$ at $D$ with $BD : DC = c : b$ by the [[angle-bisector-theorem|Angle Bisector Theorem]], so $D = \frac{bB + cC}{b + c}$ and $BD = \frac{ac}{b + c}$.

Step 2. In triangle $ABD$ the bisector from $B$ passes through $I$, so the same theorem gives
$$\frac{AI}{ID} = \frac{AB}{BD} = \frac{c}{ac/(b + c)} = \frac{b + c}a.$$

Step 3. Then $I = \frac{aA + (b + c)D}{a + b + c} = \frac{aA + bB + cC}{a + b + c}$. For $I_A$ the external bisector at $B$ divides $AD$ externally in the same ratio, which flips the sign of $a$: $I_A = \frac{-aA + bB + cC}{-a + b + c}$.

The centroid is the case of equal weights, and the mass formula is the same balance computation for any masses: a mass $m_B$ at $B$ and $m_C$ at $C$ balance at $\frac{m_BB + m_CC}{m_B + m_C}$, and adding $m_A$ at $A$ balances that point with $A$.

## Useful observations
- Once a triangle is coordinatized, $I$ is written down directly, with no bisector intersections needed.
- The general principle converts any mass-point configuration to coordinates: cevian intersection points are [[weighted-average|weighted averages]] with the masses assigned in mass points.
- Excenters flip the sign of one weight. The weights $a : b : c$ are barycentric coordinates, and reading them that way is what generalizes the construction to every other triangle center.

## Applications
Coordinate solutions to incircle problems, the centroid and incenter of a coordinatized triangle, and the first step toward barycentric coordinates.

## Contest profile
The quiet workhorse of coordinate solutions to incircle problems: AIME problems asking for incenter-related lengths in coordinatized triangles reduce to plugging into this formula plus the distance formula. It is also the entry point to barycentric coordinates for students heading toward olympiad geometry.
`,

"law-of-tangents": String.raw`
## Key forms
- $\dfrac{a - b}{a + b} = \dfrac{\tan\frac{A - B}{2}}{\tan\frac{A + B}{2}}$ — the sum and difference of two sides against the half-difference and half-sum of their opposite angles
- $\dfrac{A + B}{2} = 90^\circ - \dfrac C2$ — so the denominator is $\cot\frac C2$

## Conditions
$a$ and $b$ are two sides of a triangle and $A$, $B$ the opposite angles.

## Why it works
By the Law of Sines $\frac{a - b}{a + b} = \frac{\sin A - \sin B}{\sin A + \sin B}$. Sum-to-product turns the numerator into $2\cos\frac{A + B}{2}\sin\frac{A - B}{2}$ and the denominator into $2\sin\frac{A + B}{2}\cos\frac{A - B}{2}$, whose ratio is the tangent quotient.

There is also a picture. Assume $a > b$, draw the circle about $C$ through $A$, and let it meet line $BC$ at $D$ and $E$, with $D$ between $B$ and $C$. Then $BD = a - b$ and $BE = a + b$, and $\angle DAE = 90^\circ$ because it stands on a diameter. The Law of Sines in triangles $ABD$ and $ABE$ turns $\frac{BD}{BE}$ into $\tan\frac C2 \tan\frac{A - B}{2}$, and $\tan\frac C2 = \cot\frac{A + B}{2}$.

## Useful observations
- It is an alternative to the Law of Cosines for data of the form $a \pm b$ together with $C$, and it avoids a quadratic.
- Since $\frac{A + B}{2}$ is known from $C$, the formula yields $\frac{A - B}{2}$ and hence both angles, after which the Law of Sines gives the remaining side.

## Applications
Triangles given the sum or difference of two sides and the included angle.

## Contest profile
An occasional AIME trigonometry shortcut, handy for setups that give the difference of two sides and the included angle.
`,

"napoleons-theorem": String.raw`
## Key forms
- the centers of the equilateral triangles erected on the three sides of any triangle, all outward or all inward, form an equilateral triangle
- $[\text{outer}] = \dfrac{\sqrt3}{24}\left(a^2 + b^2 + c^2\right) + \dfrac{[ABC]}{2}$ — the outer Napoleon triangle's area
- $[\text{inner}] = \dfrac{\sqrt3}{24}\left(a^2 + b^2 + c^2\right) - \dfrac{[ABC]}{2}$ — the inner one's, so outer minus inner is $[ABC]$

## Conditions
All three equilateral triangles are erected on the same side of their base lines, all outward from $ABC$ or all inward.

## Why it works
Complex numbers make it short. Let $\omega = e^{2\pi i/3}$, and let $O_c$ be the center of the equilateral triangle on $AB$: rotating $A$ about $O_c$ by $120^\circ$ gives $B$, so $B - O_c = \omega(A - O_c)$ and $O_c = \frac{B - \omega A}{1 - \omega}$. The same rotation direction gives $O_a = \frac{C - \omega B}{1 - \omega}$ and $O_b = \frac{A - \omega C}{1 - \omega}$. Then $$(1 - \omega)\left(O_c + \omega^2O_a + \omega O_b\right) = (B - \omega A) + \omega^2(C - \omega B) + \omega(A - \omega C) = 0,$$ using $\omega^3 = 1$. The relation $O_c + \omega^2O_a + \omega O_b = 0$ is exactly the condition for $O_c, O_a, O_b$ to be an equilateral triangle.

For the area, the distance from $C$ to each adjacent center is $\frac{a}{\sqrt3}$ or $\frac{b}{\sqrt3}$, and the angle between them at $C$ is $C + 60^\circ$ (outward). The Law of Cosines gives $$O_aO_b^2 = \frac{a^2 + b^2}{3} - \frac{2ab}{3}\cos(C + 60^\circ) = \frac{a^2 + b^2 + c^2}{6} + \frac{2}{\sqrt3}[ABC],$$ using $ab\cos C = \frac{a^2 + b^2 - c^2}{2}$ and $ab\sin C = 2[ABC]$. An equilateral triangle of that side has the outer area above, and the inner case replaces $+$ by $-$.

## Useful observations
- The apexes of the erected triangles, not the centers, connect to the [[fermat-point|Fermat point]]: the segments from each apex to the opposite vertex have equal lengths and concur there.
- Erected equilateral triangles almost always signal either Napoleon's structure or [[rotation-trick|the rotation trick]].
- No computation is needed to see that the centers form an equilateral triangle; the area formulas turn the qualitative statement into numbers.

## Applications
Equilateral triangles built on the sides of a triangle, and the area or side length of the resulting triangle of centers.

## Contest profile
An occasional AMC and AIME cameo, and the Fermat-point connection makes the configuration worth knowing.
`,

"cyclic-quad-radius": String.raw`
## Key forms
- $R = \dfrac{1}{4K}\sqrt{(ab + cd)(ac + bd)(ad + bc)}$ — the circumradius of a cyclic quadrilateral with sides $a, b, c, d$ in order and area $K$
- the three paired products $ab + cd$, $ac + bd$, $ad + bc$ are the same ones that give the diagonals, on [[ptolemy-second-theorem|Ptolemy's Second Theorem]]
- $R = \dfrac14\sqrt{\dfrac{(ab + cd)(ac + bd)(ad + bc)}{(s - a)(s - b)(s - c)(s - d)}}$ — the same with $K$ written out by Brahmagupta's Formula, $K = \sqrt{(s - a)(s - b)(s - c)(s - d)}$, where $s = \frac{a + b + c + d}{2}$ is the semiperimeter, so the four sides alone give $R$

## Conditions
The quadrilateral is cyclic. The area $K$ comes from Brahmagupta's Formula, and the products are the ones in Ptolemy's Theorem, where $ac + bd = pq$.

## Why it works
Split the quadrilateral by a diagonal and apply $R = \frac{\text{product of sides}}{4 \cdot \text{area}}$ to each triangle, since both triangles share the circumcircle. Combining the two expressions with Ptolemy's relation between the diagonals produces the symmetric three-product form.

## Useful observations
- For a cyclic quadrilateral with known sides, Brahmagupta's Formula gives $K$ and then this gives $R$, a two-step pipeline that replaces any diagonal-hunting.

## Applications
The circumradius of a cyclic quadrilateral from its four sides.

## Contest profile
The finishing move for cyclic quadrilateral problems that give four sides and ask for the circumradius, which otherwise require solving for a diagonal first.
`,

"van-aubel": String.raw`
## Key forms
- if squares are erected outward on the four sides of any quadrilateral, the two segments joining the centers of opposite squares are equal in length and perpendicular
- $c = \frac{p + q}{2} + \frac i2(q - p)$ — the center of the square erected outward on the side from $p$ to $q$, in complex numbers, for vertices listed clockwise

## Conditions
The squares are built outward; the quadrilateral may be non-convex and may even be degenerate.

## Why it works
In complex numbers the center of the square erected outward on the segment from $p$ to $q$ is $\frac{p + q}{2} + \frac i2(q - p)$. Writing the two center-difference vectors and simplifying, one comes out exactly $i$ times the other, which is perpendicular and equal in length in one stroke.

## Useful observations
- The theorem is the quadrilateral cousin of [[napoleons-theorem|Napoleon's Theorem]], which builds equilateral triangles on the sides of a triangle.
- The center formula alone is useful for any coordinate problem that erects a square on a segment and asks for a point.
- Collapsing one side to a point leaves the statement true, which makes a good test of a proof or a computation.

## Applications
Squares built on the sides of a figure, and perpendicular and equal segments between centers.

## Contest profile
Appears in AMC and AIME-adjacent problems about squares built on sides, where the center formula in complex numbers or coordinates does the work.
`

});

Object.assign(window.MATH_DETAILS, {

"intercept-theorem": String.raw`
## Key forms
- $DE \parallel BC \iff \frac{AD}{DB} = \frac{AE}{EC}$ — a line parallel to one side of a triangle cuts the other two sides in the same ratio, and the converse
- $\frac{AD}{AB} = \frac{AE}{AC} = \frac{DE}{BC}$ — the whole-side form of the same statement
- three parallel lines cut any two transversals in the same ratio, $\frac{AB}{BC} = \frac{A'B'}{B'C'}$
- $AD = DB$ — the midsegment is the case of equal pieces

## Conditions
$D$ is on line $AB$ and $E$ on line $AC$, both on the same side of $A$ in the converse. The two ratio forms are different statements: segment to segment, $\frac{AD}{DB}$, and segment to whole side, $\frac{AD}{AB}$.

## Why it works
$DE \parallel BC$ makes $\triangle ADE \sim \triangle ABC$, since the corresponding angles are equal, so $\frac{AD}{AB} = \frac{AE}{AC}$. Subtracting each ratio from $1$ converts the whole-side form into the segment form: $$\frac{DB}{AB} = 1 - \frac{AD}{AB} = 1 - \frac{AE}{AC} = \frac{EC}{AC}, \qquad\text{so}\qquad \frac{AD}{DB} = \frac{AE}{EC}.$$

For the converse, draw the line through $D$ parallel to $BC$; by what was just shown it meets $AC$ at the point dividing $AC$ in the ratio $\frac{AD}{DB}$, which is $E$, so that line is $DE$.

Three parallel lines meeting two transversals follow by two applications: draw through one intersection point a line parallel to the second transversal, which makes a triangle with a parallel to its side.

{{figure:lines}}

## Useful observations
- One parallel line moves a known ratio from one side of a triangle to another without any similarity bookkeeping.
- The converse certifies parallelism from ratios, the standard proof that two segments are parallel in a ratio-heavy figure.
- Mixing the two ratio forms, segment to segment against segment to whole, is the classic error.

## Applications
Ratios along the sides of triangles cut by a parallel line, and proofs that segments are parallel.

## Contest profile
A MATHCOUNTS and AMC 10 workhorse for parallel lines cutting the sides of a triangle, and the silent first step in many mass-point and area-ratio solutions.
`,

"trapezoid-special-segments": String.raw`
## Key forms
- $\frac{a + b}{2}$ — the midsegment, joining the midpoints of the legs: the arithmetic mean of the bases $a$ and $b$
- $\frac{2ab}{a + b}$ — the segment through the intersection of the diagonals: the harmonic mean
- $\sqrt{ab}$ — the segment cutting the trapezoid into two similar trapezoids: the geometric mean
- $\sqrt{\frac{a^2 + b^2}{2}}$ — the segment halving the area: the quadratic mean
- harmonic $\le$ geometric $\le$ arithmetic $\le$ quadratic — the order in which the segments lie, from the short base toward the long one

## Conditions
The segments are parallel to the bases and have their ends on the legs; $a$ and $b$ are the lengths of the parallel sides.

## Why it works
Each segment is cut off by the legs, so each length comes from one similarity or one area equation.

The diagonals cut each other in the ratio $a : b$, since the triangles on the two bases are similar. In triangle $ACD$ the segment from $P$ to the leg is parallel to the base $DC$, so it is $\frac{a}{a + b}$ of it: $$XP = \frac{a}{a + b} \cdot b = \frac{ab}{a + b},$$ and the other half $PY$ is the same, which gives $XY = \frac{2ab}{a + b}$.

{{figure:harmonic}}

If a segment $x$ cuts the trapezoid into two similar trapezoids, corresponding sides are in one ratio, $\frac ax = \frac xb$, so $x = \sqrt{ab}$.

For the area, extend the legs to meet. The triangles with bases $a$, $x$, and $b$ have areas proportional to $a^2$, $x^2$, and $b^2$, so halving the trapezoid means $x^2 - a^2 = b^2 - x^2$, and $x^2 = \frac{a^2 + b^2}{2}$. The midsegment averages the bases, as for any [[trapezoid-parallelogram-areas|trapezoid]].

## Useful observations
- The order harmonic $\le$ geometric $\le$ arithmetic $\le$ quadratic is a quick check on any answer.
- Along the height, the diagonals' crossing divides it in the ratio $a : b$ from the short base, and the midsegment halves it.

## Applications
Lengths of segments parallel to the bases of a trapezoid that are described by a similarity, an area condition, or the diagonals.

## Contest profile
The AMC asks for each of the four directly; on the AIME they appear as steps combined with the trapezoid's area or with perpendiculars to angle bisectors.
`,

"circular-segment": String.raw`
## Key forms
- $\frac12 r^2(\theta - \sin\theta)$, with $\theta$ in radians
- common angles: $r^2\left(\frac\pi6 - \frac{\sqrt3}{4}\right)$ for $60^\circ$, $\;r^2\left(\frac\pi4 - \frac12\right)$ for $90^\circ$, $\;r^2\left(\frac\pi3 - \frac{\sqrt3}{4}\right)$ for $120^\circ$
- lens of two circles of radius $r$, each through the other's center: $r^2\left(\frac{2\pi}{3} - \frac{\sqrt3}{2}\right)$

## Conditions
$\theta$ is the central angle in radians, between $0$ and $2\pi$.

## Why it works
The sector from the center to the arc is made of two pieces, the segment and the triangle formed by the center and the chord, so the segment is what is left when the triangle is removed.

A sector with central angle $\theta$ has area $\frac12r^2\theta$. The triangle has two sides equal to $r$ with the angle $\theta$ between them, so by [[trig-area|the sine area formula]] its area is $\frac12r^2\sin\theta$. Subtracting gives $$\tfrac12r^2\theta - \tfrac12r^2\sin\theta = \tfrac12r^2(\theta - \sin\theta).$$

For $\theta$ greater than $180^\circ$ the same formula still holds: the center then lies inside the segment, the triangle has to be added rather than removed, and the negative value of $\sin\theta$ does exactly that.

A lens is cut by its common chord into one segment from each circle. When each circle passes through the other's center, the centers and a crossing point form an equilateral triangle, so each segment has central angle $120^\circ$.

{{figure:lens}}

## Useful observations
- A shallow segment is nearly a parabolic sliver: $\theta - \sin\theta \approx \frac{\theta^3}{6}$ for small $\theta$, so the area is about $\frac{r^2\theta^3}{12}$, which matches Archimedes' $\frac23 \cdot \text{chord} \cdot \text{height}$.
- The central angle of each segment in a lens comes from the triangle formed by the two centers and a crossing point, so a lens problem is a triangle problem first.
- The angle appears twice, once as a ratio of arc to radius and once inside the sine, so only radians make the two terms comparable; degrees in $\theta - \sin\theta$ is the standard error.
- A major segment is the whole circle minus the minor one, $\pi r^2 - \frac12 r^2(\theta - \sin\theta)$, which the formula also gives directly with $2\pi - \theta$.

## Applications
Areas between chords and arcs, overlaps of circles, and shaded regions with curved edges.

## Contest profile
An AIME and AMC area step, rarely alone: the central angle usually comes from a special right triangle, from Thales' Theorem, or from a circle placed in coordinates.
`,

"angle-between-lines": String.raw`
## Key forms
- $\tan\theta = \left\lvert\dfrac{m_1 - m_2}{1 + m_1m_2}\right\rvert$ — the acute angle between lines of slopes $m_1$ and $m_2$
- $m_1m_2 = -1$ — the lines are perpendicular, which is where the denominator vanishes
- $m_1 = m_2$ — the lines are parallel and $\theta = 0$
- $\tan\theta = \left\lvert\dfrac1m\right\rvert$ — the angle between a line of slope $m$ and a vertical line

## Conditions
Neither line is vertical for the main formula, because a vertical line has no slope. The formula gives the acute angle; the obtuse angle between the lines is its supplement.

## Why it works
A line of slope $m$ makes angle $\arctan m$ with the $x$-axis; the angle between the lines is the difference of their inclinations, and the tangent subtraction formula gives $\tan(\alpha_1 - \alpha_2)$ in terms of the slopes. The absolute value selects the acute angle.

When $1 + m_1m_2 = 0$ the denominator vanishes and the tangent is undefined, which is the right answer: the angle is $90^\circ$.

## Useful observations
- Directly, two slopes go in and the angle comes out.
- In reverse, "find the line making a given angle $\theta$ with a given line" turns the formula into an equation for the unknown slope, with two solutions, one on each side of the given line.
- The condition $1 + m_1m_2 = 0$ is the formula's built-in reminder of perpendicularity.

## Applications
Angles between lines in the coordinate plane, lines at a prescribed angle to a given line, and coordinate configurations converted to the tangent subtraction form needed for trigonometric identities.

## Contest profile
AMC 12 asks it directly, for the angle between two given slopes; it also converts coordinate configurations into the angle form needed for trigonometric identities and arctangent telescoping.
`,

"reflection-coordinates": String.raw`
## Key forms
- $P' = P - \dfrac{2(ax_0 + by_0 + c)}{a^2 + b^2}\,(a, b)$ — the image of $P = (x_0, y_0)$ in the line $ax + by + c = 0$: a step of twice the signed distance along the normal
- over the $x$-axis $(x, -y)$; over the $y$-axis $(-x, y)$; over $y = x$ the swap $(y, x)$; over $y = -x$ the point $(-y, -x)$; over $x = k$ the point $(2k - x, y)$
- the mirror is the perpendicular bisector of $PP'$, so the midpoint of $PP'$ lies on the line and $PP'$ is perpendicular to it

## Conditions
$(a, b) \ne (0, 0)$. The formula works for any line, including vertical and horizontal ones.

## Why it works
Reflecting means moving straight across the line, at right angles to it, and going as far past the line as the point was before it.

The vector $(a, b)$ is perpendicular to $ax + by + c = 0$, and the signed distance from $P$ to the line is $\frac{ax_0 + by_0 + c}{\sqrt{a^2 + b^2}}$, as on [[point-line-distance|the point-to-line distance card]]. Moving $P$ that far against the unit normal lands on the foot of the perpendicular, and moving twice as far lands on the image. Twice the distance times the unit normal is $\frac{2(ax_0 + by_0 + c)}{a^2 + b^2}(a, b)$, which is the step in the formula.

The special cases are the formula with simple normals. For $y = x$, written $x - y = 0$, the normal is $(1, -1)$ and the step from $(x, y)$ is $(x - y)(1, -1)$, which lands on $(y, x)$.

{{figure:instant}}

## Useful observations
- The instant cases cover axes, $y = \pm x$, and horizontal or vertical lines, and the general formula covers a slanted mirror. A good check is that the midpoint of $P$ and $P'$ lies on the mirror. To reflect a whole line, reflect two of its points.
- Reflections find shortest paths: a path that touches a line on its way between two points is shortest when reflecting one endpoint makes it straight, [[reflect-across-the-line|the reflection trick]].
- Reflections model folds, since a crease is the perpendicular bisector of a point and its image; and the swap over $y = x$ is the coordinate meaning of an inverse function.
- Light rays and billiard paths chain several reflections, each one a step of the same computation.

## Applications
Images of points and lines in a mirror, shortest paths with a bounce, folds, and billiards.

## Contest profile
Most appearances are folds, paired with the perpendicular bisector that the crease is and finished with the [[pythagorean-theorem|Pythagorean Theorem]], or bounce problems solved by reflecting an endpoint.
`,

"skew-lines-distance": String.raw`
## Key forms
- $d = \dfrac{\left\lvert(P_2 - P_1) \cdot (\vec d_1 \times \vec d_2)\right\rvert}{\left\lvert\vec d_1 \times \vec d_2\right\rvert}$ — the distance between lines through $P_1$ and $P_2$ with direction vectors $\vec d_1$ and $\vec d_2$
- $d = \dfrac{6V}{AB \cdot CD \cdot \sin\theta}$ — equivalently, for a tetrahedron with edge $AB$ on one line and edge $CD$ on the other, the lines meeting at angle $\theta$; the denominator is the area of the parallelogram on the two edges

## Conditions
The lines are skew. Parallel lines give $\vec d_1 \times \vec d_2 = 0$, so the point-to-line distance is used instead, and intersecting lines give distance $0$.

## Why it works
The cross product $\vec d_1 \times \vec d_2$ is perpendicular to both lines, the direction of the unique common perpendicular. Any connecting vector between the lines has the same projection onto that direction, and that projection is the distance.

The tetrahedron route says the same thing with volumes: a tetrahedron with edge $AB = \vec d_1$ on one line and edge $CD = \vec d_2$ on the other has volume $V = \frac16\left\lvert(P_2 - P_1) \cdot (\vec d_1 \times \vec d_2)\right\rvert = \frac16 \cdot AB \cdot CD \cdot \sin\theta \cdot d$, one sixth of the parallelogram on the two edges times the distance between the lines. Dividing gives $d = \frac{6V}{AB \cdot CD \cdot \sin\theta}$. A division by $3$ instead of $6$ would give half the distance: $3V$ over a face area is the distance from a vertex to a face, which is a different quantity.

## Useful observations
- The figure is coordinatized, one point and the direction on each line are taken, and one cross product and one [[vector-dot-product|dot product]] are computed.
- In cubes and boxes the answer is often a clean fraction of the edge, for example for opposite edges' diagonals.

## Applications
Distance between skew edges or face diagonals of a cube or box, and "shortest segment connecting two lines" questions.

## Contest profile
AIME three-dimensional problems: the distance between skew edges or face diagonals of a cube, and "shortest segment connecting two lines" questions. One computation replaces an optimization.
`,

"isoperimetric-facts": String.raw`
## Key forms
- $A \le \dfrac{P^2}{4\pi}$ — among all shapes of perimeter $P$, the circle has the largest area
- $A_{\text{rect}} \le \dfrac{P^2}{16}$ — among rectangles, the square
- $A_\triangle \le \dfrac{P^2}{12\sqrt3}$ — among triangles, the equilateral one
- the regular $n$-gon has the largest area among $n$-gons of a given perimeter, and for fixed side lengths the cyclic polygon has the largest area

## Conditions
The perimeter is fixed. Equality holds only for the symmetric shape, and the statement is about closed curves in the plane; a wall or a missing side changes the optimum.

## Why it works
Rectangle: $xy \le \left(\frac{x + y}{2}\right)^2$ is AM-GM. Triangle: Heron's product $(s - a)(s - b)(s - c)$ with fixed sum is maximized at equality, AM-GM again, since the three factors add to $s$.

For polygons the classical chain is: the cyclic arrangement maximizes area for given sides, because [[bretschneiders-formula|Bretschneider's]] cosine term vanishes; then the regular polygon among cyclic ones; then the circle. Each step trades asymmetry for area.

## Useful observations
- Optimization problems that ask for a maximum area with a perimeter budget, or a minimum perimeter for an area, end at the symmetric configuration: the fact is quoted, the symmetric case computed, and the equality condition confirmed.
- The "cyclic maximizes for fixed sides" version answers hinged-quadrilateral questions.
- With a wall as one side, the optimum changes: a fence of length $100$ on three sides of a rectangle gives a $25 \times 50$ half-square, not a square.

## Applications
Maximum area for a given perimeter, minimum perimeter for a given area, and extremal shape arguments.

## Contest profile
The farmer with a fixed length of fence is the standard setting, and AMC also tests the qualitative form: recognizing that the extremal shape must be the symmetric one.
`

});

Object.assign(window.MATH_DETAILS, {


});

Object.assign(window.MATH_DETAILS, {

"cayley-menger": String.raw`
## Key forms
- $288\,V^2 = \det\begin{pmatrix} 0 & 1 & 1 & 1 & 1 \\ 1 & 0 & a^2 & b^2 & c^2 \\ 1 & a^2 & 0 & d^2 & e^2 \\ 1 & b^2 & d^2 & 0 & f^2 \\ 1 & c^2 & e^2 & f^2 & 0 \end{pmatrix}$ for a tetrahedron $P_1P_2P_3P_4$ with $a, b, c = P_1P_2, P_1P_3, P_1P_4$ the edges at one vertex and $d, e, f = P_2P_3, P_2P_4, P_3P_4$ the remaining three edges
- the determinant is $0$ exactly when the four points are coplanar, and negative when no such tetrahedron exists

## Conditions
Entry $(i, j)$ is the squared distance between vertices $i$ and $j$. The edge lengths must satisfy the triangle inequalities on every face and the solid inequality.

## Why it works
It is Heron's Formula lifted one dimension. In the plane a triangle's area is fixed by its three sides, and in space a tetrahedron's volume is fixed by its six edges; both are a bordered determinant of squared distances, at size $4$ for the triangle (where it equals $-16[\triangle]^2$, a sign flip from Heron's form) and size $5$ for the tetrahedron. The bordering row and column of $1$s encode that the points live in space.

## Useful observations
- It gives the volume from the edge lengths alone, which is useful when placing coordinates is awkward.
- Most contest tetrahedra have right angles or symmetry that make coordinates or the box trick faster, so this is the fallback for scalene tetrahedra given only by edges.
- It is a clean way to show that a configuration of edge lengths is impossible.

## Applications
Volumes of tetrahedra from edge lengths, and tests that a set of edge lengths is realizable.

## Contest profile
A universal but rarely fastest method for tetrahedra. It matters when a tetrahedron is specified only by its six edge lengths.
`,

"isosceles-tetrahedron": String.raw`
## Conditions
The three pairs of opposite edges are equal. The box then exists exactly when every face is acute, which an isosceles tetrahedron always satisfies; three edge lengths that make an obtuse face give no tetrahedron of this kind.

## Why it works
Four alternate corners of a box, no two joined by an edge of the box, are joined in pairs by face diagonals, and opposite diagonals lie on parallel faces, so they are equal.

Going the other way, given the three edge lengths $a$, $b$, $c$, the box must satisfy $p^2 + q^2 = a^2$, $q^2 + r^2 = b^2$, and $p^2 + r^2 = c^2$. Adding and subtracting solves it: $$p^2 = \frac{a^2 + c^2 - b^2}{2},$$ and similarly for $q^2$ and $r^2$. These are positive exactly when every face is acute.

The rest of the box is four corner pyramids, each with three mutually perpendicular edges from the box, so each has volume $\frac16pqr$, and $$V = pqr - 4 \cdot \frac{pqr}{6} = \frac{pqr}{3}.$$

{{figure:corners}}

## Useful observations
- Adding the three box equations gives $p^2 + q^2 + r^2 = \frac{a^2 + b^2 + c^2}{2}$, and subtracting each equation from it gives one of $p^2$, $q^2$, $r^2$.
- The four faces are congruent, so the surface area is four times one face, found with [[herons-formula|Heron's Formula]], and the inradius follows from [[insphere-radius|the insphere formula]].
- The circumradius is half the box's space diagonal, $R = \frac12\sqrt{p^2 + q^2 + r^2}$.
- Such tetrahedra are also called disphenoids.

## Applications
Volume, inradius, and circumradius of a tetrahedron given by three matched pairs of edges, and the point minimizing the sum of distances to the four vertices.

## Contest profile
Three problems here, two AIME and one AMC 12, none solved by it alone. The recurring shape gives three pairs of equal opposite edges that are square roots, which fit a box with whole-number sides, and asks for the volume or the insphere radius; a tetrahedron given by three matched pairs of edges is always signaling the box.
`,

"tetrahedron-centroid": String.raw`## Conditions
Any tetrahedron, and the centroid of equal masses at its vertices. The centroid of a solid tetrahedron of uniform density is the same point.

## Why it works
The centroid of equal point masses at the four vertices is their average $\frac{A+B+C+D}{4}$, and every claim on the card is that average written two ways.

Write the face centroid $M_A = \frac{B+C+D}{3}$. Then $$\frac{A + 3M_A}{4} = \frac{A + B + C + D}{4} = G,$$ which places $G$ three-quarters of the way from $A$ to $M_A$, the $3:1$ split. The same holds for the median from each vertex, so all four meet at $G$.

For a bimedian, the midpoints of $AB$ and $CD$ are $\frac{A+B}{2}$ and $\frac{C+D}{2}$, and the midpoint of the segment joining them is again $\frac{A+B+C+D}{4}$. So the three bimedians pass through $G$ and bisect each other there.

## Useful observations
- With coordinates, the centroid is the average of the four vertices, one coordinate at a time.
- The centroids of the four faces form a tetrahedron similar to the original with ratio $\frac13$, centered at $G$, so its volume is $\frac1{27}$ of the original.
- $G$ is the point minimizing the sum of squared distances to the four vertices.
- The triangle's centroid splits a median $2:1$; in $n$ dimensions the split is $n:1$.

## Applications
The center of mass of a tetrahedron, the tetrahedron of face centroids, symmetric coordinate setups centered at $G$, and sums of squared distances to the vertices.

## Contest profile
One problem here, an AIME, solved by the tetrahedron of face centroids. Its role is a one-line computation once the vertices are in coordinates or the face centroids are in the figure.
`

});

Object.assign(window.MATH_DETAILS, {

"angle-chasing": String.raw`
## When to use
Any figure with unknown angles: triangles with isosceles parts, parallel lines cut by transversals, circles with chords and tangents, cyclic quadrilaterals. It is also the way to prove that four points are concyclic or that two triangles are similar, by finding equal angles. On the AMC it is often the whole solution; on harder problems it supplies the angles that the Law of Sines or the area formula turns into lengths.

It is the wrong first step when the data are lengths and no angle is given or implied: there coordinates, similar triangles, or the Law of Cosines go straight to the answer.

## How
1. Name the unknown that touches the most constraints $\theta$, and write it on the figure.
2. Sweep the figure with the rules: triangle sums, isosceles base angles, parallel lines, inscribed angles, and cyclic quadrilaterals.
3. Write each new angle on the figure.
4. Stop when the target is expressed in $\theta$, or when one angle gets two expressions, which is an equation for $\theta$.
5. If the chase stalls, look for a hidden circle, or add a radius or a missing side.

In triangle $ABC$ with $AB = AC$, a point $D$ on $AC$ satisfies $AD = BD = BC$. With $\angle A = \theta$, the isosceles triangle $ABD$ gives $\angle ABD = \theta$, so the exterior angle $\angle BDC = 2\theta$. Triangle $BDC$ is isosceles with $BD = BC$, so $\angle C = 2\theta$, and $AB = AC$ makes $\angle ABC = 2\theta$ as well. Then $\theta + 2\theta + 2\theta = 180^\circ$, so $\angle A = 36^\circ$.

{{figure:sum}}

## Why it works
Angles in a figure are bound by a few exact rules, none of which involves a length. The angles of a triangle add to $180^\circ$; equal sides face equal angles; a transversal meets parallel lines at equal angles; and an inscribed angle is half the arc it stands on, so all inscribed angles on one arc are equal. Because every rule is linear in the angles, one unknown can be pushed through the entire figure.

The circle rules work in both directions, which is what makes a chase able to discover structure. Equal angles subtending a segment from the same side put four points on a circle, and supplementary opposite angles make a quadrilateral cyclic, so a chase can produce a new circle, whose inscribed angles then feed back into the chase.

The rules are exact only for the configuration the figure shows. If a point lies on the other side of a line from where it was assumed, an equality becomes a supplement, so a chase is checked against the order of the points on each line before its last step is trusted.

## Formulas it uses
- [[polygon-angle-sums]]: the triangle sum $180^\circ$, the exterior angle as the sum of the two remote angles, and the sums for larger polygons.
- [[inscribed-angle-theorem]]: an inscribed angle is half its arc, so angles on one arc are equal and an angle in a semicircle is right.
- [[cyclic-opposite-angles]]: opposite angles of a cyclic quadrilateral add to $180^\circ$, and an exterior angle equals the opposite interior angle.
- [[tangent-chord-angle]]: the angle between a tangent and a chord equals the inscribed angle on the other side of the chord.
- [[concyclicity-tests]]: the converses that prove four points lie on a circle from equal or supplementary angles.

## Common traps
- Assuming that the figure is drawn to scale, or that lines that look perpendicular or points that look collinear really are.
- Missing an isosceles triangle whose equal sides are not drawn as such, such as two radii or two tangents from one point.
- Using a configuration-dependent fact, such as "the angles are equal" when they are really supplementary, without checking which side of the line the points are on.

## Contest profile
The first minutes of nearly every synthetic geometry problem: sometimes the whole AMC solution, more often the step that produces the angles another tool turns into lengths.
`

});

Object.assign(window.MATH_DETAILS, {

"section-formula": String.raw`
## Key forms
- $P = \left(\dfrac{nx_1 + mx_2}{m + n},\; \dfrac{ny_1 + my_2}{m + n}\right)$ — the point dividing $A(x_1, y_1)$ to $B(x_2, y_2)$ internally with $AP : PB = m : n$, a weighted average leaning toward $B$
- $\left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}\right)$ — the midpoint, the case $m = n$
- $\dfrac{mB - nA}{m - n}$ — external division, where the point lies beyond the segment
- $\left(\dfrac{x_1 + x_2 + x_3}{3}, \dfrac{y_1 + y_2 + y_3}{3}\right)$ — the centroid of a triangle

## Conditions
The ratio $m : n$ is read as $AP : PB$, so the larger coefficient goes on the endpoint the point is closer to. For external division $m \ne n$.

## Why it works
The point at fraction $\frac{m}{m + n}$ of the way from $A$ to $B$ is
$$A + \frac{m}{m + n}(B - A) = \frac{nA + mB}{m + n},$$
a weighted average with more weight on the endpoint the point is closer to. The midpoint is the balanced case $m = n$.

For external division, $P$ lies on line $AB$ beyond the segment with $AP : PB = m : n$, so $P = A + \frac{m}{m - n}(B - A)$, which is $\frac{mB - nA}{m - n}$. For the centroid, the medians meet $\frac23$ of the way from a vertex to the opposite midpoint ([[centroid-division|the centroid divides each median two to one]]), so with $M = \frac{B + C}2$ it is $\frac{A + 2M}3 = \frac{A + B + C}3$.

## Useful observations
- The ratio must be read carefully: $AP : PB = m : n$ puts the coefficient $m$ on the far point $B$.
- For external division, as in "extend $AB$ past $B$ so that...", the formula takes a negative sign: $\frac{mB - nA}{m - n}$.
- This is the coordinate face of [[mass-points|mass points]]: placing mass $n$ at $A$ and $m$ at $B$ balances at $P$, so any cevian-ratio problem can be finished either way.

## Applications
Coordinate solutions to ratio problems, trisection points, centroid computations, and extending a segment by a given ratio.

## Contest profile
The workhorse for coordinate solutions to ratio problems. When a problem gives a ratio along a segment and asks for a coordinate, length, or area, this is a one-line computation, and it pairs naturally with the [[shoelace-formula|shoelace formula]] for the area that follows.
`,

"vector-dot-product": String.raw`
## Key forms
- $\vec u \cdot \vec v = u_1v_1 + u_2v_2 = \lvert\vec u\rvert\,\lvert\vec v\rvert\cos\theta$ — in three dimensions add $u_3v_3$
- $\cos\theta = \dfrac{\vec u \cdot \vec v}{\lvert\vec u\rvert\,\lvert\vec v\rvert}$ — the angle between two vectors
- $\vec u \cdot \vec v = 0 \iff \vec u \perp \vec v$ — the perpendicularity test
- $\dfrac{\vec u \cdot \vec v}{\lvert\vec v\rvert}$ — the scalar projection of $\vec u$ onto $\vec v$, and $\vec u \cdot \vec u = \lvert\vec u\rvert^2$

## Conditions
The angle formula needs nonzero vectors. The sign of the dot product is the sign of $\cos\theta$: positive for an acute angle, zero for a right angle, and negative for an obtuse angle.

## Why it works
Expanding $\lvert\vec u - \vec v\rvert^2 = \lvert\vec u\rvert^2 + \lvert\vec v\rvert^2 - 2\,\vec u \cdot \vec v$ and comparing with the Law of Cosines, $\lvert\vec u - \vec v\rvert^2 = \lvert\vec u\rvert^2 + \lvert\vec v\rvert^2 - 2\lvert\vec u\rvert\lvert\vec v\rvert\cos\theta$, forces
$$\vec u \cdot \vec v = \lvert\vec u\rvert\lvert\vec v\rvert\cos\theta.$$
So the sign of the dot product is the sign of $\cos\theta$: positive means acute, zero means perpendicular, negative means obtuse.

The other forms are this one read differently. Dividing by $\lvert\vec u\rvert\lvert\vec v\rvert$ gives the angle. The product is $0$ exactly when $\cos\theta = 0$, a right angle. The scalar projection of $\vec u$ onto $\vec v$ is $\lvert\vec u\rvert\cos\theta$, which is $\frac{\vec u \cdot \vec v}{\lvert\vec v\rvert}$. With $\vec v = \vec u$, $\theta = 0$ and $\vec u \cdot \vec u = \lvert\vec u\rvert^2$, which is also $u_1^2 + u_2^2$ by Pythagoras.

## Useful observations
- Three standard reads: the angle between two vectors, a perpendicularity test, and the length of the projection of $\vec u$ onto $\vec v$. Coordinates make it mechanical.
- To show two lines are perpendicular, their direction vectors are dotted.
- It is often faster than slopes, because it dodges the vertical-line special case and extends straight to three dimensions.

## Applications
Angles between vectors and lines, perpendicularity conditions, projections, and lengths via $\lvert\vec u\rvert^2 = \vec u \cdot \vec u$.

## Contest profile
The clean way to handle angle and perpendicularity conditions once a figure is on coordinates. On the AIME, the dot and cross product pair turns spatial angle and area questions into arithmetic.
`,

"cavalieris-principle": String.raw`
## Key forms
- $V = \displaystyle\int A(h)\,\mathrm{d}h$ — volume depends only on the cross-section area function, so matching $A(h)$ at every height matches the volume
- $V = Bh$ survives shearing — an oblique prism or cylinder has the same volume as the upright one, because no slice changes as it is sheared
- sphere against cylinder-minus-cone — matching slice areas at every height is the classical route to $\tfrac43\pi r^3$ with no integration

## Conditions
The two solids lie between the same two parallel planes, and every plane parallel to them cuts the two solids in regions of equal area. The slices need not be congruent, only equal in area.

## Why it works
Volume is the integral of cross-sectional area over height. If two solids present the same area $A(h)$ at every height $h$, their volume integrals are identical, and the shapes of the slices, and how they are stacked or sheared, are irrelevant.

The sphere is the standard check. Cut a hemisphere of radius $R$, and a cylinder of radius $R$ and height $R$ with a cone bored out from its top face down to a point at the bottom, at height $h$ above the base. The hemisphere's slice is a disk of radius $\sqrt{R^2 - h^2}$, and the other slice is a ring between radii $h$ and $R$:
$$\pi\left(R^2 - h^2\right) = \pi R^2 - \pi h^2.$$
So the hemisphere has volume $\pi R^3 - \frac13\pi R^3 = \frac23\pi R^3$.

## Useful observations
- It transports a volume that is unknown onto one that is known. An oblique prism or cylinder shears to an upright one slice for slice, so it keeps $V = Bh$.
- A pyramid's volume comes from slicing it against a known pyramid with the same base and height, which is why the $\frac13$ in a pyramid's volume is shape-independent.
- The famous derivation of the sphere: a hemisphere of radius $R$ has the same slice area at every height as a cylinder of radius $R$ with a cone bored out, giving $V = \frac23\pi R^3$ per hemisphere.

## Applications
Volumes of oblique solids, volumes of pyramids and spheres without calculus, and replacing a leaning solid with an upright one.

## Contest profile
Mostly a conceptual unlock: it justifies "the slant doesn't matter," so a leaning solid can be replaced with an upright one. When a solid is defined by a moving or tilted cross-section, the slices are the thing to think about.
`,

"barycentric-coordinates": String.raw`
## When to use
Triangles with several cevians and side ratios, problems about named centers such as the incenter, centroid, symmedian point, or orthocenter, ratios of areas inside a triangle, and proofs that three points are collinear or three lines concurrent. Mass points are faster for two cevians and a ratio along one of them; barycentrics win when a point is outside the triangle, a line is not a cevian, an area is wanted, or a named center appears.

## How
1. Write points as $(x : y : z)$, where only the ratio matters: $A = (1:0:0)$, the midpoint of $AB$ is $(1:1:0)$, and the centroid is $(1:1:1)$.
2. Put points on sides: the point $D$ of $BC$ with $BD : DC = n : m$ is $(0 : m : n)$, the larger weight on the nearer vertex.
3. Write a cevian as one equation: the line from $A$ through $(0 : m : n)$ is $ny = mz$.
4. Intersect by matching forms; divide by $x + y + z$ to read areas and ratios.

{{figure:landmarks}}

Let $D$ split $BC$ with $BD : DC = 1 : 2$, let $E$ be the midpoint of $CA$, and find $P = AD \cap BE$. Here $D = (0 : 2 : 1)$ and $E = (1 : 0 : 1)$. Points of $AD$ have the form $(\alpha : 2 : 1)$ and points of $BE$ the form $(1 : \beta : 1)$, so $P = (1 : 2 : 1)$.

{{figure:finding-a-point}}

Normalized, $P = \frac14A + \frac12B + \frac14C$, so $[PBC]$ is a quarter of the triangle, $[PCA]$ a half and $[PAB]$ a quarter. Since $D = \frac23B + \frac13C$, the point is also $\frac14A + \frac34D$, so $AP : PD = 3 : 1$, and since $E = \frac12A + \frac12C$, it is the midpoint of $BE$.

{{figure:read-off}}

The named centers are single triples: incenter $(a : b : c)$, excenter opposite $A$ $(-a : b : c)$, symmedian point $(a^2 : b^2 : c^2)$, orthocenter $(\tan A : \tan B : \tan C)$, and circumcenter $(a^2S_A : b^2S_B : c^2S_C)$ with $S_A = \frac{b^2 + c^2 - a^2}{2}$. The incircle family adds the Nagel point $(s - a : s - b : s - c)$, the Gergonne point $\left(\frac{1}{s - a} : \frac{1}{s - b} : \frac{1}{s - c}\right)$ and the Spieker center $(b + c : c + a : a + b)$.

{{figure:centers}}

Three points are collinear exactly when the determinant of their coordinate rows is $0$. For $C = (0:0:1)$, the centroid $(1:1:1)$ and the midpoint $(1:1:0)$, $$\begin{vmatrix} 0 & 0 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 0 \end{vmatrix} = 0,$$ so the three lie on one line, a median. With normalized rows the determinant is the area ratio $\frac{[P_1P_2P_3]}{[ABC]}$. Conjugates are coordinatewise reciprocals: the isotomic and isogonal conjugates of $(x : y : z)$ are $\left(\frac1x : \frac1y : \frac1z\right)$ and $\left(\frac{a^2}{x} : \frac{b^2}{y} : \frac{c^2}{z}\right)$.

## Why it works
Put mass $\alpha$ at $A$, $\beta$ at $B$ and $\gamma$ at $C$, with $\alpha + \beta + \gamma = 1$; the triangle balances at $P = \alpha A + \beta B + \gamma C$. A heavier mass pulls the balance point toward its vertex, which is the picture behind mass points, a special case.

{{figure:balance}}

Every point has such weights, and only one set. Any point can be written as $A + \beta(B - A) + \gamma(C - A)$, since $B - A$ and $C - A$ point in different directions, and setting $\alpha = 1 - \beta - \gamma$ gives the weights. They are areas: the signed area $[XBC]$ changes linearly as $X$ moves, so $[PBC] = \alpha[ABC] + \beta[BBC] + \gamma[CBC] = \alpha[ABC]$, because a triangle with two equal vertices has no area.

A weight is negative exactly when $P$ is on the far side of the opposite side line from its vertex, so the three side lines cut the plane into seven regions, each with its own pattern of signs.

{{figure:sign-regions}}

## Formulas it uses
- [[section-formula]]: the point dividing $BC$ in the ratio $n : m$ is $\frac{mB + nC}{m + n}$, which is how points on sides get their coordinates.
- [[cevas-theorem]]: three cevians through $(0 : m : n)$, $(p : 0 : q)$, $(r : s : 0)$ concur exactly when the product of ratios is $1$, the concurrence test in coordinates.
- [[incenter-coordinates]]: the incenter is the average of the vertices weighted by the opposite sides, $(a : b : c)$.
- [[determinant-geometric]]: a $3 \times 3$ determinant measures area, which gives the collinearity test and area ratios.

## Common traps
- Normalizing too early: keep coordinates unnormalized while computing, and normalize only to read off a point or a ratio.
- Putting the larger weight on the farther vertex when placing a point on a side.
- Using a triple with $x + y + z = 0$, which is no point at all.
- Forgetting signs for points outside the triangle.

## Contest profile
Rare on the AMC and AIME, where mass points usually suffice; in olympiad concurrency and area problems it is the method that is guaranteed to finish, if slowly.

## Full proof
The claim is that the determinant of three normalized coordinate rows is the area ratio $\frac{[P_1P_2P_3]}{[ABC]}$, so that three points are collinear exactly when it is $0$.

Let $P_i = x_iA + y_iB + z_iC$ with $x_i + y_i + z_i = 1$, and write $\vec u = B - A$ and $\vec v = C - A$. Then $P_i - A = y_i\vec u + z_i\vec v$, so $$P_2 - P_1 = (y_2 - y_1)\vec u + (z_2 - z_1)\vec v, \qquad P_3 - P_1 = (y_3 - y_1)\vec u + (z_3 - z_1)\vec v.$$

Twice the signed area of a triangle is the cross product of two of its edge vectors. The cross product distributes over sums, $\vec u \times \vec u = \vec v \times \vec v = 0$, and $\vec v \times \vec u = -\vec u \times \vec v$, so expanding gives $$2[P_1P_2P_3] = \left((y_2 - y_1)(z_3 - z_1) - (z_2 - z_1)(y_3 - y_1)\right)\vec u \times \vec v,$$ while $2[ABC] = \vec u \times \vec v$. The ratio is the number in the large brackets.

That number is the determinant. In the matrix with rows $(x_i, y_i, z_i)$, add the second and third columns to the first; the determinant does not change, and every entry of the first column becomes $1$. Subtracting the first row from the other two and expanding along the first column leaves exactly $(y_2 - y_1)(z_3 - z_1) - (z_2 - z_1)(y_3 - y_1)$.

Unnormalized coordinates multiply each row by a nonzero constant, which scales the determinant but cannot change whether it is $0$. So three points given in any form are collinear exactly when the determinant of their coordinates vanishes.
`,

"coordinate-bash": String.raw`
## When to use
Figures with right angles, midpoints, or an axis of symmetry, and questions that ask for one length or one area. Conditions on angles are the weak case, since they turn into slopes and tangents.

## How
1. Put the origin at the most constrained point of the figure: a right angle, a midpoint, or a center.
2. Lay a side, or an axis of symmetry, along a coordinate axis.
3. Fix a convenient unit, and keep one or two lengths as variables so the figure stays general.
4. Translate each condition into an equation: lengths, midpoints, perpendicularity, and lying on a circle.
5. Solve, and read the answer off the coordinates, using the [[shoelace-formula|shoelace formula]] for an area.

## Why it works
Every condition on points translates into an equation in their coordinates, and equations can be solved mechanically, so no insight is needed once the translation is done.

The coordinates can be chosen freely because moving or rotating a figure changes none of its lengths, angles, or areas. Every coordinate that becomes $0$ removes terms from every later equation, which is why the placement decides whether the computation takes five lines or fifty.

## Formulas it uses
- [[distance-midpoint]]: lengths and midpoints straight from coordinates, $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$, which is the Pythagorean Theorem on the horizontal and vertical gaps, and the midpoint is the average of the endpoints.
- [[shoelace-formula]]: the area of a polygon from the coordinates of its vertices, with no height to find.
- [[circle-equation]]: a circle as $(x - h)^2 + (y - k)^2 = r^2$, so meeting and touching it become equations.
- [[point-line-distance]]: the distance from $(x_0, y_0)$ to the line $ax + by + c = 0$ is $\frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$, for heights and for tangency.
- [[vector-dot-product]]: $\vec u \cdot \vec v = 0$ exactly when two directions are perpendicular, the test for a right angle.
- [[section-formula]]: the point that divides a segment in a given ratio, for points placed on sides and cevians.

## Common traps
- Testing perpendicularity with slopes, $m_1m_2 = -1$, which fails silently when one line is vertical; the dot product does not.
- Placing the figure so that it becomes more special than the problem allows, such as giving it a right angle the problem never stated.
- Expanding square roots early; keep distances squared until the final equation.

## Contest profile
A setup step rather than a whole solution: coordinates produce the equations, and a formula such as the shoelace area or a circle equation finishes them.
`,


});

Object.assign(window.MATH_DETAILS, {

"trig-bash": String.raw`
## When to use
Triangles with angle conditions, such as $\angle B = 2\angle C$ or $\angle A = 60^\circ$; cyclic quadrilaterals, where inscribed angles make many angles equal and the circumradius ties every chord to an angle; cevians and bisectors with given lengths; and any figure where a synthetic idea is not appearing and coordinates would produce square roots everywhere. It is a fallback that always finishes, at the cost of algebra.

## How
1. Choose the unknown that the most conditions touch, usually an angle at a vertex shared by several triangles.
2. Express sides through the Law of Sines, $a = 2R\sin A$, so ratios of sides become ratios of sines.
3. Use the Law of Cosines for a side between two known ones, and $\frac12ab\sin C$ for any area condition.
4. Reduce to one equation in the unknown angle, simplify with double angle, sum-to-product, and $A + B + C = 180^\circ$ identities, and check every root against the figure.

In triangle $ABC$, $\angle B = 2\angle C$, $AB = 4$ and $AC = 6$. The Law of Sines gives $\frac{\sin B}{\sin C} = \frac{6}{4}$, and $\sin 2C = 2\sin C\cos C$, so $\cos C = \frac34$. The Law of Cosines at $C$ then reads $16 = a^2 + 36 - 9a$, with roots $a = 4$ and $a = 5$. The root $a = 4$ makes the triangle isosceles with $\angle A = \angle C$, which would force $\angle C = 45^\circ$, contradicting $\cos C = \frac34$; so $BC = 5$.

## Why it works
The Law of Sines and the Law of Cosines determine a triangle from any valid set of three independent parts, so once one angle is named in a triangulated figure, every length and angle is a function of it. A condition the figure must satisfy is then an equation in one variable.

The danger is that the trigonometric equations are weaker than the geometry. $\sin B = \sin 2C$ holds both for $B = 2C$ and for $B = 180^\circ - 2C$, and the Law of Cosines does not know which one was meant, which is why extraneous roots appear and every answer needs a check against the original condition.

## Formulas it uses
- [[law-of-sines]]: $\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$, moving between sides and opposite angles and supplying the circumradius.
- [[law-of-cosines]]: $c^2 = a^2 + b^2 - 2ab\cos C$, for a side between two known sides or an angle from three sides, with no sine ambiguity.
- [[trig-area]]: $[ABC] = \frac12ab\sin C$, which turns an area condition, or a split of a triangle into pieces, into an equation.
- [[triangle-angle-identities]]: identities that use $A + B + C = 180^\circ$, such as $\sin A = \sin(B + C)$, to collapse the final equation.
- [[product-sum]]: sum-to-product and product-to-sum formulas, which factor equations such as $\sin x + \sin y = \sin z$.

## Common traps
- Using the Law of Sines to find an angle that could be obtuse, where $\sin\theta$ cannot tell $\theta$ from $180^\circ - \theta$.
- Keeping an extraneous root from an equation that the condition did not fully encode.
- Choosing a variable that few conditions touch, which multiplies the unknowns.
- Forgetting that angles must be positive and add to $180^\circ$, which rules out some roots at once.

## Contest profile
The reliable AIME fallback for angle-heavy and cyclic figures, usually after a short angle chase; like coordinates, it trades elegance for a guaranteed finish.
`,

"complex-bash": String.raw`
## When to use
Equilateral triangles or squares erected on the sides of a figure, regular polygons and products of distances between their vertices, points on a circle, and any statement about a rotation, such as "show that $BG = CE$ and $BG \perp CE$". It is weaker for figures built from distances alone, such as tangent circles, where coordinates or trigonometry fit better.

## How
1. Put the most symmetric point at $0$, and scale a key length to $1$.
2. Write rotations as multiplications: the rotation by $\theta$ about $p$ is $z \mapsto p + e^{i\theta}(z - p)$, and a quarter turn is multiplication by $i$.
3. Test relations with quotients: $\frac{c - a}{b - a}$ is real exactly when $a$, $b$, $c$ are collinear and purely imaginary exactly when the angle at $a$ is right.
4. On the unit circle, use $\bar z = \frac1z$.

Square $ABCD$, labeled counterclockwise, has $A = 1 + 2i$ and $B = 4 + 3i$. The side vector $B - A = 3 + i$ turned a quarter turn counterclockwise is $i(3 + i) = -1 + 3i$, so $C = B + (-1 + 3i) = 3 + 6i$ and $D = A + (-1 + 3i) = 5i$, with side length $\sqrt{10}$.

{{figure:quotient}}

## Why it works
Multiplying complex numbers multiplies lengths and adds angles: $|wz| = |w||z|$ and $\arg(wz) = \arg w + \arg z$. So multiplying by $e^{i\theta}$ rotates by $\theta$ about $0$, and shifting a point $p$ to $0$ and back rotates about $p$.

The quotient $\frac{c - a}{b - a}$ has length $\frac{|c - a|}{|b - a|}$ and argument equal to the turn from $b - a$ to $c - a$, the angle at $a$, which is why it detects collinearity and right angles.

For equilateral triangles, with $\omega = e^{2\pi i/3}$, the conditions $a + \omega b + \omega^2c = 0$ and $a + \omega^2b + \omega c = 0$ describe the two orientations, and their product is $a^2 + b^2 + c^2 - ab - bc - ca$, so that expression vanishes exactly for equilateral triangles of either orientation.

## Formulas it uses
- [[complex-basics]]: arithmetic, modulus, and conjugate, including $|z|^2 = z\bar z$ and $\bar z = \frac1z$ on the unit circle.
- [[eulers-formula]]: $e^{i\theta} = \cos\theta + i\sin\theta$, the rotation by $\theta$ as a single number.
- [[roots-of-unity]]: the vertices of a regular $n$-gon centered at $0$ are $R\omega^k$ with $\omega = e^{2\pi i/n}$.
- [[roots-unity-distance-product]]: $\prod_{k=1}^{n-1}|1 - \omega^k| = n$, the product of distances from one vertex of a regular $n$-gon to the others.

## Common traps
- Rotating in the wrong direction: multiplication by $i$ is counterclockwise, by $-i$ clockwise.
- Rotating about $0$ when the center of rotation is another point.
- Placing the origin at an unhelpful point, which makes every expression long.
- Using the one-orientation equilateral condition when the problem allows either orientation.

## Contest profile
An AIME and olympiad route through rotation-heavy configurations, regular polygons, and distance products; the rotation trick and spiral similarity are its synthetic versions.
`,

"affine-transformations": String.raw`
## When to use
Ellipse problems that ask for areas, tangency points, or ratios of chords; questions about ratios of areas inside an arbitrary triangle or parallelogram; and proofs of statements about midpoints, parallel lines, and concurrence that do not mention angles or lengths. The test is whether the question would have the same answer after the figure is stretched in one direction.

## How
1. Check that every quantity in the problem is affine-invariant: ratios along a line, ratios of areas, parallelism, midpoints, tangency, and incidence qualify; angles, lengths, and circles do not.
2. Choose the map: scale one axis to turn an ellipse into a circle, or send the triangle to an equilateral or right isosceles one.
3. Solve the simple problem.
4. Carry the answer back: ratios transfer unchanged, and a bare area is multiplied by the inverse of the scale factor.

Find the largest area of a triangle inscribed in the ellipse $\frac{x^2}{9} + \frac{y^2}{4} = 1$. The scaling $y \mapsto \frac32y$ turns the ellipse into the circle of radius $3$, multiplying every area by $\frac32$. The largest triangle in that circle is equilateral, with area $\frac{3\sqrt3}{4} \cdot 9 = \frac{27\sqrt3}{4}$. Scaling back multiplies by $\frac23$, so the answer is $\frac{9\sqrt3}{2}$.

## Why it works
An affine map $v \mapsto Mv + t$ sends lines to lines and keeps parallel lines parallel. Along any line it acts like a scaling, so ratios of lengths on one line, and hence midpoints and points dividing segments in a given ratio, are preserved. It multiplies every area by the same factor $|\det M|$, so ratios of areas are preserved as well.

Any three non-collinear points can be sent to any other three by exactly one affine map, which is why every triangle can be replaced by an equilateral one, and every ellipse is the image of a circle under a scaling. What the map destroys is just as important: angles, lengths, and perpendicularity change, and circles become ellipses.

## Formulas it uses
- [[determinant-geometric]]: the map multiplies every area by $|\det M|$, which cancels in every ratio of areas.
- [[ellipse-properties]]: the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ is a circle of radius $a$ scaled by $\frac ba$ vertically, with area $\pi ab$.

## Common traps
- Transferring an angle, a length, or a perpendicularity, none of which survive.
- Forgetting to undo the area scaling when the question asks for an actual area rather than a ratio.
- Assuming that the foci of an ellipse go to the center of the circle; foci are not affine-invariant.

## Contest profile
An AIME time-saver on ellipse areas and on ratio questions inside a general triangle, and a standard olympiad simplification; its only discipline is checking invariance first.
`,

"pole-polar": String.raw`
## Key forms
- the polar of $P$ with respect to a circle of radius $R$ about $O$ is the line of points $Q$ with $\vec{OP} \cdot \vec{OQ} = R^2$; when $P$ lies outside the circle, this line is the chord of contact joining the two tangency points
- La Hire's theorem: $P$ lies on the polar of $Q$ if and only if $Q$ lies on the polar of $P$, so "collinear" and "concurrent" become dual statements
- a secant from $P$ meeting the circle at $X, Y$ and the polar at $Q$ forms a harmonic range $(X, Y;\, P, Q) = -1$

## Conditions
$P$ is not the center. For $P$ inside the circle the polar is a line outside it, and for $P$ on the circle it is the tangent at $P$.

## Why it works
Fix a circle of radius $R$ about $O$. The polar of $P$ is the line of points $Q$ with $\vec{OP} \cdot \vec{OQ} = R^2$; for $P$ outside, that line is exactly the chord of contact through the two tangency points.

The defining relation is symmetric in $P$ and $Q$, which is La Hire's theorem. Because polarity swaps points with lines while preserving incidence, "collinear" and "concurrent" become dual statements, so proving one proves the other.

## Useful observations
- The trigger is tangents and secants from a common external point: the chord of contact is a polar that can be named.
- To show three points collinear, each is shown to lie on the polar of one common point, by La Hire.
- A secant from $P$ meeting the circle at $X, Y$ and the polar at $Q$ is a harmonic range $(X, Y; P, Q) = -1$, that is $\frac{XP}{YP} = \frac{XQ}{YQ}$, pinning an unknown length with no angle chase. Harmonic ranges stay harmonic under projection, so the relation transports across the whole figure.

## Applications
Chords of contact, collinearity proofs through poles and polars, and lengths from harmonic ranges in tangent-and-secant figures.

## Contest profile
Olympiad geometry, where a tangents-and-secants configuration that looks like a trigonometric marathon collapses to two lines of projective bookkeeping. It is rarely needed below the olympiad level, but decisive when the figure is built from poles, polars, and harmonic conjugates, and it pairs naturally with the radical-axis and power-of-a-point ideas.
`,

"directed-angles": String.raw`
## When to use
Olympiad proofs of concyclicity, collinearity, or parallel lines by angle chasing, especially when the figure could be drawn in several ways: a point inside or outside a circle, on one arc or the other, on one side of a line or the other. Short-answer contests never need it, since a numerical answer comes from one correct diagram, but a written proof must cover every diagram.

## How
1. Write every angle as $\angle(\ell_1, \ell_2)$, the counterclockwise rotation from line $\ell_1$ to line $\ell_2$, taken modulo $180^\circ$.
2. Chase with the unconditional rules: $\angle(\ell_1, \ell_2) + \angle(\ell_2, \ell_3) = \angle(\ell_1, \ell_3)$, $\angle(\ell_2, \ell_1) = -\angle(\ell_1, \ell_2)$, and parallel lines make equal angles with any third line.
3. Use the circle rule in both directions: $A$, $B$, $P$, $Q$ are concyclic (or collinear) exactly when $\angle(PA, PB) = \angle(QA, QB)$.
4. Finish with an incidence statement; switch to another tool for lengths.

Circles $\omega_1$ and $\omega_2$ meet at $P$ and $Q$. A line through $P$ meets $\omega_1$ again at $A$ and $\omega_2$ again at $B$, and a line through $Q$ meets them again at $C$ and $D$. Then $\angle(AC, CQ) = \angle(AP, PQ)$ on $\omega_1$, which equals $\angle(BP, PQ)$ since $A$, $P$, $B$ are collinear, which equals $\angle(BD, DQ)$ on $\omega_2$. Since $CQ$ and $DQ$ are the same line, $AC \parallel BD$, in every configuration.

## Why it works
An ordinary angle chase splits into cases because the inscribed angle rule says "equal" for points on the same arc and "supplementary" for points on opposite arcs. Measuring between lines instead of rays, modulo $180^\circ$, identifies an angle with its supplement's negative in exactly the right way, so both cases become one equation.

The price is information. A directed angle cannot tell an angle from its supplement or describe which side of a line a point lies on, and it says nothing about lengths. It proves incidences, which is exactly what most synthetic olympiad problems ask for.

In undirected form the parallel rule is the familiar test that two interior angles on the same side of a transversal add to $180^\circ$, the fact on [[parallel-by-angle-sum|Proving Lines Parallel by Angle Sums]]; the directed form says the same thing with no picture of which side the angles are on.

## Formulas it uses
- [[concyclicity-tests]]: equal angles over a segment, here in directed form, prove that four points are concyclic.
- [[inscribed-angle-theorem]]: the inscribed angle rule that directed angles state without cases.
- [[tangent-chord-angle]]: the limiting case of the circle rule, with the tangent as one of the lines.
- [[miquels-theorem]]: the standard theorem whose proof is a two-line directed angle chase.

## Common traps
- Mixing directed and ordinary angles in one chase.
- Reversing the order of the lines, which changes the sign: $\angle(\ell_1, \ell_2) = -\angle(\ell_2, \ell_1)$.
- Concluding that two points coincide or lie on one side of a line, which directed angles cannot show.
- Dividing a directed angle by $2$, which is not well defined modulo $180^\circ$.

## Contest profile
Olympiad proof-writing only: the standard way to make one angle chase valid for every configuration a grader might draw.
`,

"phantom-point": String.raw`
## When to use
Proofs that a point defined by an intersection lies on a given circle or line, that three lines are concurrent, or that three points are collinear, when the honest computation of the point would be long. The signal is a claim that the point satisfies one condition more than its construction needs. Where the point can be computed from its construction in a few lines, no phantom is needed.

## How
1. Name the point you cannot easily handle, $X$, and the property you want it to have.
2. Define $X'$ by that property together with part of the construction: for example, the second intersection of the required circle with one of the lines that defines $X$.
3. Prove that $X'$ satisfies the rest of the construction, usually by an angle chase, power of a point, or similar triangles.
4. Conclude $X' = X$, because the defining curves meet in only one other point.

Prove that the reflection of the orthocenter $H$ across $BC$ lies on the circumcircle. Let $D$ be the foot of the altitude from $A$, and let $H'$ be the second intersection of line $AD$ with the circumcircle. Inscribed angles give $\angle BH'A = \angle BCA$, and in the right triangle $BHD$, $\angle BHD = 90^\circ - \angle HBD = \angle BCA$. So triangle $BHH'$ is isosceles with $BD \perp HH'$, $D$ is the midpoint of $HH'$, and $H'$ is the reflection.

## Why it works
A point is usually over-determined by the statement to be proved: the construction fixes it, and the claim adds one more condition. Computing it from the construction and then checking the claim means solving for the point. Building the point from the claim and checking the construction means verifying a single condition, which is usually easier.

The two descriptions meet because of a uniqueness fact. Two distinct circles meet in at most two points, a line meets a circle in at most two points, and two lines meet in at most one, so if $X$ and $X'$ are both "the other intersection" of the same pair of curves, they are the same point.

## Formulas it uses
- [[concyclicity-tests]]: the usual check that the phantom point lies on a circle, by equal or supplementary angles.
- [[power-of-a-point]]: $PA \cdot PB = PC \cdot PD$ places a point on a circle or proves two circles share a chord.
- [[menelaus-theorem]]: a product of ratios equal to $1$ proves collinearity, the other common way to verify the phantom point.

## Common traps
- Defining $X'$ by the full construction and the property at once, which assumes the claim.
- Forgetting the degenerate case where the two curves are tangent or identical, so uniqueness fails.
- Choosing a definition of $X'$ that is no easier to verify than the original claim.

## Contest profile
An olympiad technique for concurrency, collinearity, and concyclicity, with no role on short-answer contests.
`,

"area-method": String.raw`
## When to use
Two or more cevians crossing inside a triangle with given ratios on the sides, and a ratio along a cevian or an area of a piece wanted; triangles sharing an angle with points on its sides; and configurations with parallel lines or points outside the triangle, where mass points no longer apply. Areas can be added and subtracted, which is what lengths on different lines cannot do.

## How
1. Fix $[ABC] = 1$ and translate each given ratio into an area ratio, using triangles with a common apex (ratio of bases) or a common base (ratio of heights).
2. Name the unknown ratios along cevians, such as $t = \frac{AP}{AD}$.
3. Express one area in two ways, or use that pieces add up to a whole, to get linear equations in the unknowns.
4. Solve, and convert the areas back into the requested lengths or areas.

Let $D$ be on $BC$ with $BD : DC = 2 : 1$, let $E$ be the midpoint of $CA$, and let $AD$ meet $BE$ at $P$. With $[ABC] = 1$ and $t = \frac{AP}{AD}$, the triangles $ABP$ and $ABD$ share the apex $B$ with bases on line $AD$, so $[ABP] = t[ABD] = \frac{2t}{3}$. Triangles $PBC$ and $ABC$ share the base $BC$, so $[PBC] = 1 - t$. Since $E$ is the midpoint of $CA$ and $P$ is on $BE$, $[ABP] = [CBP]$, so $\frac{2t}{3} = 1 - t$, giving $t = \frac35$ and $[ABP] = \frac25$.

{{figure:heights}}

## Why it works
The area of a triangle is half a base times a height. Triangles with the same apex and bases on one line have the same height, so their areas compare like their bases, and triangles on the same base compare like their heights; for a point $P$ on a cevian $AD$, the heights of $PBC$ and $ABC$ over $BC$ are in the ratio $\frac{PD}{AD}$ by similar right triangles, as the figure shows.

So every length ratio on a line is an area ratio, and areas add. That turns a tangle of ratios on different lines into a few linear equations, which reproduces Ceva's and Menelaus's Theorems in a line or two and keeps working outside the triangle.

## Formulas it uses
- [[cevian-area-ratio]]: $\frac{[ABD]}{[ACD]} = \frac{BD}{DC}$ for $D$ on $BC$, the common-apex rule.
- [[same-base-area-ratio]]: triangles on one base have areas in the ratio of their heights, giving $\frac{[PBC]}{[ABC]} = \frac{PD}{AD}$.
- [[shared-angle-area-ratio]]: triangles sharing an angle have areas in the ratio of the products of the sides around it.

## Common traps
- Comparing triangles whose bases are not on one line, or whose apex is not shared.
- Mixing up $\frac{AP}{AD}$ with $\frac{AP}{PD}$.
- Forgetting that a median-type line from a vertex through the midpoint of the opposite side splits areas equally only for triangles with that vertex.

## Contest profile
A reliable AIME fallback for cevian configurations: slower than mass points on the problems they handle, and working on the ones they cannot.
`

});

Object.assign(window.MATH_DETAILS, {

"triangle-center-angles": String.raw`
## Key forms
- $\angle BOC = 2A$ — the circumcenter $O$ sees side $BC$ at twice the angle at $A$
- $\angle BIC = 90^\circ + \dfrac A2$ — the incenter $I$
- $\angle BI_AC = 90^\circ - \dfrac A2$ — the $A$-excenter $I_A$, the supplement of the incenter's angle
- $\angle BHC = 180^\circ - A$ — the orthocenter $H$

## Conditions
All four angles are subtended by the same side $BC$, and $A$ is the triangle's angle at vertex $A$. The circumcenter and orthocenter formulas are for an acute triangle: if the obtuse angle is at $B$ or $C$, the orthocenter lies outside and $\angle BHC = A$ instead, and if $A$ is obtuse the central angle is the reflex $360^\circ - 2A$. The incenter and excenter formulas hold for every triangle.

## Why it works
Each formula is a short angle chase from that center's defining property.

Circumcenter: the inscribed-angle theorem says the arc $BC$ subtends $\angle A$ at the circumference and twice that, $2A$, at the center $O$.

Incenter: in $\triangle BIC$ the angles at $B$ and $C$ are the halves $\frac B2$ and $\frac C2$, so $\angle BIC = 180^\circ - \frac{B + C}{2} = 180^\circ - \frac{180^\circ - A}{2} = 90^\circ + \frac A2$.

Orthocenter: with $E$ and $F$ the feet of the altitudes from $B$ and $C$, the quadrilateral $AFHE$ has two right angles at $F$ and $E$, so $\angle FHE = 180^\circ - A$, and $\angle BHC$ is the vertical angle.

## Useful observations
- These collapse a configuration with $O$, $I$, or $H$ to arithmetic in the vertex angles.
- The incenter one, $\angle BIC = 90^\circ + \frac A2$, is the most used: it pins the incenter's position and pairs perfectly with the [[incenter-excenter-lemma|Incenter–Excenter Lemma]]. The excenter opposite $A$ satisfies the companion $\angle BI_AC = 90^\circ - \frac A2$.
- A sign check with an equilateral triangle ($A = 60^\circ$): $\angle BOC = 120^\circ$, $\angle BIC = 120^\circ$, $\angle BHC = 120^\circ$, all equal, as symmetry demands.

## Applications
Angle problems that place $O$, $I$, or $H$, and the first step of an olympiad angle chase.

## Contest profile
Staples of AMC and AIME configuration problems and a routine first step in olympiad angle chases. The incenter formula is worth memorizing cold; the other two are derived on the spot from the inscribed-angle theorem and the altitude-supplement fact.
`

});

Object.assign(window.MATH_DETAILS, {

"apollonius-circle": String.raw`
## Key forms
- $\{P : PA/PB = k\}$ is a circle for $k \ne 1$ — the Apollonius circle of $A$ and $B$ for the ratio $k$
- the endpoints of a diameter are the two points dividing $AB$ in the ratio $k$, one internally and one externally
- for $k = 1$ the locus degenerates to the perpendicular bisector of $AB$

## Conditions
$k \gt 0$ and $k \ne 1$. The circle is not related to Apollonius's Theorem, the median-length relation, despite the shared name.

## Why it works
Fix $k = PA/PB$ and put $A$ and $B$ on the $x$-axis. The equation $PA^2 = k^2PB^2$ is quadratic in $x$ and $y$ with equal $x^2$ and $y^2$ coefficients and no cross term, so it is a circle.

Its two intersections with line $AB$ are the points dividing $AB$ in the ratio $k$ internally and externally, so those are diametrically opposite, which fixes the center on $AB$ and the radius. At $k = 1$ the squared terms cancel and the locus degenerates to the perpendicular bisector.

## Useful observations
- A constraint of the form $PA = k \cdot PB$ puts the point on a known circle: the internal and external division points of $AB$ in the ratio $k$ are located and used as a diameter.
- In a triangle, the three Apollonius circles, one per vertex pair using the opposite side ratios, pass through the two isodynamic points, and each contains the feet of the internal and external bisectors from that vertex. That is the link to [[symmedian-lemoine|symmedians]] and isogonal conjugates.
- The internal and external bisectors of $\angle APB$ meet $AB$ at the diameter endpoints, so the angle at $P$ between the two division points is a right angle.

## Applications
Loci of ratio-of-distances constraints, isodynamic points, and configurations with isogonal conjugates and symmedians.

## Contest profile
AIME locus and "ratio of distances" problems, and olympiad configurations with isogonal conjugates, symmedians, and isodynamic points.
`,

"pappus-centroid": String.raw`
## Key forms
- $V = 2\pi d \cdot A$ — the volume of the solid made by revolving a plane region of area $A$ about an external axis in its plane, where $d$ is the distance from the region's centroid to the axis
- $S = 2\pi d \cdot L$ — the surface area made by revolving a plane curve of length $L$, with $d$ the distance from the curve's centroid to the axis
- torus: $V = 2\pi^2Rr^2$ and $S = 4\pi^2Rr$ — a disk of radius $r$ whose center is $R$ from the axis

## Conditions
The axis lies in the plane of the region or curve and does not cross it. The centroid of a region and the centroid of its boundary curve are different points.

## Why it works
Slice the revolving region into thin strips parallel to the axis. A strip of area $\mathrm{d}A$ at distance $\rho$ sweeps a ring of volume $2\pi\rho\,\mathrm{d}A$, so $V = 2\pi\int\rho\,\mathrm{d}A = 2\pi\bar\rho A$, where $\bar\rho = \frac{\int\rho\,\mathrm{d}A}{A}$ is precisely the centroid's distance $d$ from the axis.

The identical argument on a curve of length $L$ gives the surface $S = 2\pi d\,L$. Once the centroid is known, no integration remains.

## Useful observations
- Any solid or surface of revolution becomes a centroid lookup. For symmetric regions the centroid is free: a disk's is its center, giving the torus formulas in one line.
- For composite regions, the centroid is the area-weighted average of the parts.
- It also runs backward: a measured volume of revolution pins an unknown centroid distance.

## Applications
Tori and other solids of revolution, surface areas of revolution, and recovering a centroid from a known volume.

## Contest profile
Torus and solid-of-revolution problems on the AIME and beyond. It replaces a revolution integral with a single centroid, the fast path precisely when a cross-section is spun about an external axis. It pairs with [[cavalieris-principle|Cavalieri's Principle]] for volume comparisons.
`

});

Object.assign(window.MATH_DETAILS, {

"projection-formula": String.raw`
## Key forms
- $a = b\cos C + c\cos B$ — a side is the sum of the projections of the other two onto it
- $b = c\cos A + a\cos C$ and $c = a\cos B + b\cos A$ — the same statement at the other two sides

## Conditions
$a$, $b$, $c$ are the sides opposite $A$, $B$, $C$. The formulas hold for every triangle: when an angle is obtuse its cosine is negative, which accounts for an altitude foot that falls outside the side.

## Why it works
Drop the altitude from $A$ to line $BC$ at the foot $H$. In the two right triangles, $BH = c\cos B$ and $HC = b\cos C$, and $a = BH + HC$. The other two identities are the same construction from $B$ and from $C$. When $B$ is obtuse the foot lies beyond $B$, and the negative cosine makes $c\cos B$ the signed length that keeps the sum equal to $a$.

## Useful observations
- It is the quickest linear relation between a side and the two adjacent base angles, with no squaring.
- Multiplying the three identities by $a$, $b$, $c$ and combining them reproduces the Law of Cosines, so the cosines enter linearly here and quadratically there.
- The same accounting works on a path rather than a triangle: project every segment of a polyline onto one direction and the projections add to the net displacement in that direction. When every segment makes the same angle $\theta$ with that direction, the sum is the total path length times $\cos\theta$, so a zigzag with a known length and net displacement gives up its angle.

## Applications
Altitude feet splitting a side, trigonometric bashing, and paths measured along one direction.

## Contest profile
A cheap AMC and AIME identity, handy inside trigonometric computations and whenever an altitude foot splits a side. It is underused because it looks too elementary to matter.
`,

"triangle-half-angle-identities": String.raw`
## Key forms
- $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$ — the inradius from the angles and the circumradius alone
- $\cos\frac A2\cos\frac B2\cos\frac C2 = \frac{s}{4R}$ — the semiperimeter from the same data
- $\sin\frac A2 = \sqrt{\dfrac{(s - b)(s - c)}{bc}}$, $\cos\frac A2 = \sqrt{\dfrac{s(s - a)}{bc}}$ — half-angles from the sides alone

## Conditions
$A$, $B$, $C$ are the angles of a triangle with opposite sides $a$, $b$, $c$, semiperimeter $s$, inradius $r$, and circumradius $R$. Every half-angle is acute, so the square roots are positive.

## Why it works
The tangent length from $A$ to the incircle is $s - a$, and the incenter, the touch point, and $A$ form a right triangle with angle $\frac A2$ at $A$ and opposite leg $r$, so $r = (s - a)\tan\frac A2$. The half-angle formulas applied to $\cos A = \frac{b^2 + c^2 - a^2}{2bc}$ give the square-root forms.

Multiply the three sine forms: $$\prod \sin\tfrac A2 = \frac{(s - a)(s - b)(s - c)}{abc}.$$ By Heron's Formula $[ABC]^2 = s(s - a)(s - b)(s - c)$ and $[ABC] = rs$, so $(s - a)(s - b)(s - c) = r^2s$, and with $[ABC] = \frac{abc}{4R}$ the product is $\frac{r \cdot rs}{abc} = \frac{r}{4R}$. The same multiplication of the cosine forms gives $\frac{s[ABC]}{abc} = \frac{s}{4R}$.

The sine sum is immediate: $\sin A = \frac{a}{2R}$, so $\sin A + \sin B + \sin C = \frac{a + b + c}{2R} = \frac sR$. The cosine sum comes from $\cos A + \cos B + \cos C = 1 + 4\sin\frac A2\sin\frac B2\sin\frac C2$ with the product replaced by $\frac{r}{4R}$.

## Useful observations
- Since $\cos A + \cos B + \cos C \le \frac32$, the cosine-sum form gives $\frac rR \le \frac12$, which is Euler's Inequality $R \ge 2r$, with equality only for the equilateral triangle.
- The area from the angles and $R$, and the sum of the exradii, come from the same substitutions; they are on [[trig-area-circumradius|Area from the Angles and the Circumradius]] and [[exradii|Excircles & Exradii]].
- Each identity moves freely between sides and the data $(R, r, \text{angles})$, so a problem that gives some of these can be turned entirely into algebra.

## Applications
Triangles given by $R$, $r$, and a symmetric expression in the angles, and bounds on $\frac rR$.

## Contest profile
AIME triangle problems that supply $R$ and $r$ and ask about angle sums or products, and olympiad inequalities in $\frac rR$. The Law of Sines and the incircle tangent lengths are the usual partners.
`,

"mollweides-formula": String.raw`
## Key forms
- $\dfrac{a + b}{c} = \dfrac{\cos\frac{A - B}{2}}{\sin\frac C2}$ — the sum of two sides
- $\dfrac{a - b}{c} = \dfrac{\sin\frac{A - B}{2}}{\cos\frac C2}$ — the difference of two sides

## Conditions
$a$, $b$, $c$ are the sides opposite $A$, $B$, $C$ in any triangle.

## Why it works
From $a = 2R\sin A$ and its partners, $\frac{a + b}{c} = \frac{\sin A + \sin B}{\sin C}$. Sum-to-product turns the numerator into $2\sin\frac{A + B}{2}\cos\frac{A - B}{2}$, and $\sin C = 2\sin\frac C2\cos\frac C2$ with $\frac{A + B}{2} = 90^\circ - \frac C2$ turns the quotient into $\frac{\cos\frac{A - B}{2}}{\sin\frac C2}$. The difference version has $\sin A - \sin B = 2\cos\frac{A + B}{2}\sin\frac{A - B}{2}$ in the numerator.

There is also a picture. Extend $BC$ past $C$ to a point $E$ with $CE = b$. Triangle $ACE$ is isosceles, so its base angle at $E$ is half the exterior angle at $C$ taken from the other side, namely $\angle E = \frac C2$, and $\angle BAE = A + \frac C2 = 90^\circ + \frac{A - B}{2}$. The Law of Sines in triangle $ABE$, where $BE = a + b$, gives $\frac{a + b}{\cos\frac{A - B}{2}} = \frac{c}{\sin\frac C2}$.

## Useful observations
- Each formula uses all three sides and all three angles, so plugging a solved triangle into them catches an arithmetic slip in any part.
- Dividing the two formulas gives the Law of Tangents.
- They are seldom the quickest route to an answer.

## Applications
Checking a solved triangle, and passing between sums and differences of sides and half-angles.

## Contest profile
An olympiad-level consistency check, and the bridge to the Law of Tangents.
`,

"morleys-theorem": String.raw`
## Key forms
- the intersections of adjacent angle trisectors of any triangle form an equilateral triangle, the Morley triangle
- $8R\sin\dfrac A3\sin\dfrac B3\sin\dfrac C3$ — the side of the Morley triangle

## Conditions
Each angle is trisected, and the vertex of the Morley triangle nearest a side is where the two trisectors adjacent to that side meet. $R$ is the circumradius of the original triangle.

## Why it works
Write $\alpha = \frac A3$, $\beta = \frac B3$, $\gamma = \frac C3$, so $\alpha + \beta + \gamma = 60^\circ$. Let $X$ be where the trisectors of $B$ and $C$ nearest $BC$ meet, $Z$ where those of $A$ and $B$ nearest $AB$ meet, and $Y$ likewise near $CA$. In triangle $BXC$ the angle at $X$ is $180^\circ - \beta - \gamma = 120^\circ + \alpha$, so by the Law of Sines $BX = \frac{a\sin\gamma}{\sin(120^\circ + \alpha)}$ with $a = 2R\sin 3\alpha$.

The triple-angle identity $\sin 3\alpha = 4\sin\alpha\sin(60^\circ - \alpha)\sin(60^\circ + \alpha)$ and $\sin(120^\circ + \alpha) = \sin(60^\circ - \alpha)$ give $BX = 8R\sin\alpha\sin\gamma\sin(60^\circ + \alpha)$. In the same way $BZ = 8R\sin\alpha\sin\gamma\sin(60^\circ + \gamma)$.

The two trisectors $BX$ and $BZ$ each make the angle $\beta$ with a side of the triangle, so $\angle XBZ = \beta$. In triangle $XBZ$ the sides at $B$ are $K\sin(60^\circ + \alpha)$ and $K\sin(60^\circ + \gamma)$ with $K = 8R\sin\alpha\sin\gamma$, and the three angles $60^\circ + \alpha$, $60^\circ + \gamma$, $\beta$ add to $180^\circ$. The Law of Cosines for a triangle with those angles and circumdiameter $1$ says $\sin^2\beta = \sin^2(60^\circ + \alpha) + \sin^2(60^\circ + \gamma) - 2\sin(60^\circ + \alpha)\sin(60^\circ + \gamma)\cos\beta$, so $XZ = K\sin\beta = 8R\sin\alpha\sin\beta\sin\gamma$. The same computation applies at each vertex, so all three sides are equal.

## Useful observations
- For an equilateral triangle the Morley triangle has side $8R\sin^3 20^\circ$, about $0.32R$.
- Angle trisection rarely behaves, which makes the result famous and surprising, and it is a curiosity far more than a tool.

## Applications
Configurations that build the intersections of adjacent angle trisectors, and the side length of the resulting equilateral triangle.

## Contest profile
Famous and beautiful but almost never the intended method; ordinary angle chasing or trigonometry solves the problems that mention trisectors.
`,

"gergonne-nagel-points": String.raw`
## Key forms
- the cevians to the touch points of the incircle concur at the Gergonne point, with barycentric coordinates $\left(\dfrac1{s-a} : \dfrac1{s-b} : \dfrac1{s-c}\right)$
- the cevians to the touch points of the excircles concur at the Nagel point, with barycentric coordinates $(s - a : s - b : s - c)$
- the $A$-excircle touches $BC$ at $X'$ with $BX' = s - c$ and $CX' = s - b$
- the Nagel point $N$, the centroid $G$, and the incenter $I$ are collinear on the Nagel line, with $NG = 2\,GI$

## Conditions
The cevians go from each vertex to the touch point on the opposite side: of the incircle for the Gergonne point, and of the excircle opposite that vertex for the Nagel point. The two points are [[isotomic-conjugate|isotomic conjugates]] of each other.

## Why it works
Both are Ceva concurrences. Gergonne: the [[incircle-tangent-lengths|incircle tangent lengths]] give equal pairs, so the Ceva product for the cevians to the touch points is $1$.

Nagel: the $A$-excircle touches $BC$ with $BX' = s - c$ and $CX' = s - b$, and Ceva's Theorem again gives concurrence. The Nagel point, the centroid, and the [[incenter-excenter-lemma|incenter]] are collinear with $NG = 2\,GI$, the Nagel line.

## Useful observations
- "Cevians to the incircle or excircle contact points" is recognized, and concurrence invoked instead of re-derived.
- The Nagel line $I$–$G$–$N$ mirrors the [[euler-line-ratio|Euler line]], and the Nagel point is the isotomic conjugate of the Gergonne point.

## Applications
Concurrency of cevians to contact points, and the Nagel line.

## Contest profile
Olympiad triangle geometry and the occasional AIME contact-point setup. Companions to the Lemoine, Fermat, and Brocard points, which are worth knowing to exist and concur.
`,

"newtons-line": String.raw`
## Key forms
- in a complete quadrilateral (four lines in general position), the midpoints of the three diagonals are collinear: the Newton–Gauss line
- in a quadrilateral with an inscribed circle, the incenter also lies on the line through the midpoints of the two diagonals (Newton's line)

## Conditions
The three diagonals of a complete quadrilateral join the three pairs of opposite vertices among its six intersection points. Newton's line needs a tangential quadrilateral.

## Why it works
The collinearity of the three diagonal midpoints is an affine fact, provable by vectors. For a tangential quadrilateral, equal tangent lengths balance the areas on the two sides of the line through the diagonal midpoints, which places the incenter on that line.

## Useful observations
- Any collinearity of diagonal midpoints in a quadrilateral figure is a candidate for this theorem.
- It proves specific three-point collinearities without coordinates.

## Applications
Collinearity of the midpoints of the diagonals of a quadrilateral, and the incenter of a tangential quadrilateral lying on the line through them.

## Contest profile
Olympiad quadrilateral configurations. A niche collinearity that is worth recognizing.
`,

"convex-position": String.raw`
## Key forms
- any $5$ points in general position (no three collinear) contain $4$ points in convex position
- Erdős–Szekeres (the Happy Ending theorem): for each $n$ there is a least number $\mathrm{ES}(n)$ of points in general position that forces a convex $n$-gon, with $\mathrm{ES}(4) = 5$ and $\mathrm{ES}(5) = 9$
- the conjecture $\mathrm{ES}(n) = 2^{n-2} + 1$

## Conditions
Points are in general position, meaning no three are collinear. Points are in convex position when all of them are vertices of their convex hull.

## Why it works
The Happy Ending theorem is a Ramsey-style argument on quadruples. Its base case is a short case check on the convex hull of five points: a hull of $5$ or $4$ points gives a convex quadrilateral outright, and a triangular hull with two interior points gives one through the line joining the interior pair.

## Useful observations
- Organizing by the convex hull is the natural split: the extreme points are the polygon's candidates and the interior points are the leftovers.
- The pigeonhole flavor of the argument classifies the points by the hull structure.

## Applications
Guaranteeing a convex polygon among a given number of points in general position.

## Contest profile
Olympiad combinatorial geometry. The small cases and the hull-based flavor of the arguments are the part that appears.
`,

"sylvester-gallai": String.raw`
## Key forms
- any finite set of points in the plane that is not all on one line has an ordinary line, a line through exactly two of the points
- the dual statement for arrangements of lines

## Conditions
The set is finite and not all collinear.

## Why it works
Among all pairs of a point and a line through two other points that does not contain it, take the pair with the smallest positive distance. If that line held a third point, two of its three points would fall on the same side of the foot of the perpendicular, giving a point and a connecting line strictly closer. That contradiction shows the minimal line has exactly two points.

## Useful observations
- The theorem seeds inductions: an ordinary line lets one delete two points and continue.
- The technique, minimizing a distance, often matters more than citing the theorem.

## Applications
Existence of an ordinary line, and extremal arguments in combinatorial geometry.

## Contest profile
Olympiad combinatorial geometry. The minimal-distance extremal argument is a model that is imitated more often than the statement is cited.
`,

"hellys-theorem": String.raw`
## Key forms
- in the plane: if every three of a finite family of convex sets have a common point, then all of them do
- in $\mathbb{R}^d$: if every $d + 1$ sets of a finite family of convex sets meet, then all meet

## Conditions
The family is finite and every set is convex. Without convexity the conclusion fails.

## Why it works
The proof is by induction using Radon's theorem: any $d + 2$ points in $\mathbb{R}^d$ split into two sets whose convex hulls intersect. That lets the hypotheses "every $d + 1$ meet" merge upward until all the sets share a point. In the plane $d + 1 = 3$.

## Useful observations
- It reduces a global intersection question to a check on small subfamilies.
- It is the standard tool for "one point or line meets all of these" and dual piercing statements.

## Applications
Showing that a family of convex regions has a common point, and piercing arguments.

## Contest profile
Olympiad combinatorial geometry. The planar form and the need for convexity are the facts that appear.
`,

"minkowski-lattice": String.raw`
## Key forms
- a convex region in the plane that is symmetric about the origin and has area greater than $4$ contains a lattice point other than the origin
- in $\mathbb{R}^d$ the volume bound is $2^d$

## Conditions
The region is convex and centrally symmetric about the origin. Area exactly $4$ is not enough in general without a closedness condition.

## Why it works
Shrink the region by a factor of $\frac12$: if the original area exceeds $4$, the half-size region has area greater than $1$, so some of its integer translates overlap, by pigeonhole on the unit square. Two overlapping translates differ by a nonzero lattice vector, and central symmetry with convexity puts that vector's endpoint inside the original region.

## Useful observations
- It forces a small integer solution by enclosing the constraint in a symmetric convex region of large enough area.
- It proves [[sum-of-two-squares|Fermat's Two-Square Theorem]] with a suitable ellipse and underlies Dirichlet-style approximation bounds.

## Applications
Existence of small nonzero integer points in symmetric convex regions, and geometry-of-numbers proofs in number theory.

## Contest profile
Olympiad geometry of numbers. Niche, and the standard route when a lattice point inside a symmetric convex shape must be produced.
`

});

// Detail bodies added for important medium+ theorems that had only a short description.
Object.assign(window.MATH_DETAILS, {

"median-to-hypotenuse": String.raw`
## Key forms
- $m_c = \frac c2$ — the median from the right angle to the hypotenuse is half the hypotenuse
- converse: if the median to a side equals half that side, the angle opposite that side is a right angle

## Conditions
The median starts at the right angle. The converse needs the median to land on the midpoint of the side it is compared with.

## Why it works
The right angle sees the hypotenuse as a diameter of the circle through the three vertices, by [[thales-theorem|Thales' Theorem]], so the midpoint of the hypotenuse is that circle's center and is one radius from every vertex: $$MA = MB = MC = \frac c2.$$

The converse holds too: a median equal to half its side forces a right angle, which is the forward direction of Thales' Theorem read from the midpoint.

## Useful observations
- The midpoint of the hypotenuse is the circumcenter, so the circumradius is $\frac c2$; the radius formulas of a right triangle are on [[right-triangle-inradius|Right Triangle Inradius and Circumradius]].
- Because $MA = MC$ and $MB = MC$, the triangles $MAC$ and $MBC$ are isosceles, so $\angle MCA = \angle A$ and $\angle MCB = \angle B$.
- The midpoint of the hypotenuse also lies on the [[perpendicular-bisector-locus|perpendicular bisector]] of each leg, since it is the circumcenter.
- The segment from $M$ to the midpoint of a leg is parallel to the other leg and half as long, by the [[midsegment-theorem|Midsegment Theorem]].
- Read backwards, a point whose distance to the midpoint of a segment is half the segment sees that segment at $90^\circ$.

## Applications
Distances from a right-angle vertex to the midpoint of the hypotenuse, circumradii of right triangles, and detecting right angles from lengths.

## Contest profile
Usually a hidden step: a messy right-triangle configuration becomes a clean circle once the midpoint of the hypotenuse is marked.
`,

"same-base-area-ratio": String.raw`
## Key forms
- $\frac{[ABD]}{[CBD]} = \frac{AP}{PC}$ — in a quadrilateral $ABCD$ whose diagonals cross at $P$, the triangles on the base $BD$ have areas in the ratio of the segments of the other diagonal
- triangles on the same base have areas in the ratio of their heights over that base

## Conditions
The two triangles share the base $BD$, with their third vertices $A$ and $C$ on either side, or on the same side; $P$ is where line $AC$ meets line $BD$.

## Why it works
Area is half the base times the height, so two triangles on the same base compare exactly as their heights do.

The heights of $A$ and $C$ above the line $BD$ are legs of two right triangles that share the angle at $P$, formed by the diagonal $AC$ and the feet of the perpendiculars. Those right triangles are similar, so the heights are in the ratio of their hypotenuses, $AP : PC$.

## Useful observations
- Whenever one segment cuts another, a cevian, a diagonal, or two crossing chords, the division ratio is a ratio of areas of triangles sharing a base, and back.
- If the diagonals of $ABCD$ meet at $P$ with $AP = 3$ and $PC = 5$, and $[ABD] = 12$, then $[CBD] = 12 \cdot \frac53 = 20$, and the quadrilateral's area is $32$.
- Chaining several such ratios around a figure is the area method, and assigning masses so the ratios balance is [[mass-points|mass points]]; both replace similar-triangle bookkeeping with one-line comparisons.

## Applications
Area ratios from segment ratios on a diagonal or a cevian, and segment ratios from areas.

## Contest profile
A quiet step inside other arguments: [[rouths-theorem|Routh's Theorem]], [[cevas-theorem|Ceva's Theorem]], and mass-point solutions all lean on it, and a figure full of triangles on shared bases is usually quicker this way than with coordinates.
`,

"angle-bisector-circumcircle": String.raw`
## Distinguishing clues
- An angle bisector extended to the circumcircle.
- The arc midpoint of $BC$ appears, or the incenter and circumcircle appear together.
- Not this pattern: a bisector used only for the ratio $\frac{BD}{DC}$ belongs to the Angle Bisector Theorem, and one used as a mirror belongs to [[perp-to-angle-bisector|the perpendicular to an angle bisector]].

## Methods and Formulas to Try
The bisector of angle $A$ cuts arc $BC$ in half, so it meets the circumcircle at the arc midpoint $D$, with $DB = DC$. One angle chase gives the similar triangles $ABL$ and $ADC$, where $L$ is the foot on $BC$, so $AB \cdot AC = AL \cdot AD$, and power of the point $L$ gives $LB \cdot LC = LA \cdot LD$.

### Methods to try
- [[angle-chasing]]: equal inscribed angles give $\triangle ABL \sim \triangle ADC$ and $DB = DC = DI$, the facts behind every length relation here.
- [[trig-bash]]: with $DB = DC = 2R\sin\frac A2$ and the bisector length known, the remaining lengths follow from the Law of Sines.

### Formulas to try
- [[incenter-excenter-lemma]]: $D$ is equidistant from $B$, $C$, the incenter, and the excenter opposite $A$.
- [[power-of-a-point]]: $LB \cdot LC = LA \cdot LD$ for the point $L$ where the bisector crosses $BC$.
- [[angle-bisector-length]]: $AL^2 = bc\left(1 - \frac{a^2}{(b + c)^2}\right)$, which pairs with $AL \cdot AD = bc$.
- [[inscribed-angle-theorem]]: equal arcs, equal inscribed angles, which make $D$ the arc midpoint.

## Common traps
- Taking $D$ on the arc containing $A$; the internal bisector meets the opposite arc, the external one the arc containing $A$.
- Using $AD$ where $LD$ is asked, or the reverse.
- Forgetting that $AB \cdot AC = AL \cdot AD$ holds for the internal bisector only.

## Contest profile
A recurring AIME configuration: the answer usually falls out of $AB \cdot AC = AL \cdot AD$ together with the bisector length or power of a point.
`,

"isogonal-conjugate": String.raw`
## Key forms
- reflecting the cevians $AP$, $BP$, $CP$ in the angle bisectors at $A$, $B$, $C$ gives three lines that concur at $P^*$, the isogonal conjugate of $P$
- $(x : y : z) \mapsto \left(\dfrac{a^2}{x} : \dfrac{b^2}{y} : \dfrac{c^2}{z}\right)$ — the map in barycentric coordinates
- $\angle BAP = \angle P^*AC$ at each vertex, and $P$ and $P^*$ have the same pedal circle, centered at the midpoint of $PP^*$
- the pairs: $O \leftrightarrow H$, $G \leftrightarrow K$, the incenter and the excenters are their own conjugates, and the Fermat points are conjugate to the isodynamic points

## Conditions
$P$ is a point not on a side line of $ABC$. A point on the circumcircle has no conjugate in the plane: its reflected lines are parallel, so the conjugate is at infinity.

## Why it works
Reflecting a [[cevas-theorem|cevian]] in the angle bisector swaps the two parts of the vertex angle. The trigonometric form of Ceva's Theorem is a product of the three sine ratios of those parts, and swapping every ratio inverts the product, which stays equal to $1$. So if $AP$, $BP$, $CP$ concur, the reflected lines satisfy the same condition and meet at one point $P^*$.

The coordinates follow from the [[ratio-lemma|Ratio Lemma]]. If $D = (0 : y : z)$ is the foot of $AP$ on $BC$, then $BD : DC = z : y$, and swapping the sine ratio at $A$ turns it into $c^2y : b^2z$. So the reflected foot is $(0 : b^2z : c^2y) \propto \left(0 : \frac{b^2}{y} : \frac{c^2}{z}\right)$, and the three feet give $P^* = \left(\frac{a^2}{x} : \frac{b^2}{y} : \frac{c^2}{z}\right)$.

## Useful observations
- A hard point can often be swapped for an easy one: $O \leftrightarrow H$, and the centroid $G = (1 : 1 : 1)$ goes to $(a^2 : b^2 : c^2)$, the symmedian point $K$.
- The symmedian is the isogonal of the median, the most frequent special case at AIME level.
- The pedal circle common to $P$ and $P^*$ turns "these six feet are concyclic" into a one-word reason.

## Applications
Concurrency and collinearity problems in which a point is built by reflecting cevians in bisectors, and trades between a point and its conjugate.

## Contest profile
Olympiad geometry, where naming an isogonal pair collapses a concurrency or collinearity to a known center.
`,

"pedal-triangle": String.raw`
## Key forms
- $[\text{pedal of } P] = \dfrac{\left|R^2 - OP^2\right|}{4R^2}\,[ABC]$ — the area of the triangle of the feet of the perpendiculars from $P$
- $OP = R$ makes the area $0$: for $P$ on the circumcircle the three feet are collinear, on the Simson line of $P$
- $EF = PA\sin A$, $FD = PB\sin B$, $DE = PC\sin C$ — the sides of the pedal triangle $DEF$

## Conditions
$P$ is any point of the plane, $O$ and $R$ are the circumcenter and circumradius of $ABC$, and $D$, $E$, $F$ are the feet of the perpendiculars from $P$ to $BC$, $CA$, $AB$.

## Why it works
Each side of the pedal triangle is a chord of a circle with diameter $PA$, since $A$, $F$, $P$, $E$ lie on it; hence $EF = PA\sin A$. For $P$ inside the triangle the angle at $P$ between $PE$ and $PF$ is $180^\circ - A$, and cutting the pedal triangle into its three pieces at $P$ gives $[DEF] = \frac12\left(d_bd_c\sin A + d_cd_a\sin B + d_ad_b\sin C\right)$, where $d_a$, $d_b$, $d_c$ are the distances from $P$ to the sides.

In normalized barycentric coordinates $(u, v, w)$ of $P$ these distances are $d_a = \frac{2[ABC]u}{a}$ and so on, and $\sin A = \frac{a}{2R}$. Substituting and using $abc = 4R[ABC]$ gives $$\frac{[DEF]}{[ABC]} = \frac{a^2vw + b^2wu + c^2uv}{4R^2}.$$ The numerator is $R^2 - OP^2$, the negative of the power of $P$ with respect to the circumcircle, by the standard barycentric formula for that power. For $P$ outside the triangle the same formula holds with signed areas, which is why the absolute value appears.

## Useful observations
- $P = O$ gives $\frac14[ABC]$, the medial triangle.
- $P = I$ gives the contact triangle, with $R^2 - OI^2 = 2Rr$ so the area is $\frac{r}{2R}[ABC]$.
- $P = H$ gives the [[orthic-triangle|orthic triangle]], with $R^2 - OH^2 = 8R^2\cos A\cos B\cos C$, so the area is $2\cos A\cos B\cos C\,[ABC]$.
- The formula is the unifying statement behind the Simson line, which is the degenerate pedal triangle.

## Applications
The area of the triangle formed by three feet of perpendiculars, the Simson line, and the areas of the medial, contact, and orthic triangles as special cases.

## Contest profile
Simson-line problems and "area of the triangle formed by the three feet" questions at AIME and olympiad level reduce to this single formula. Seeing that a configuration is a pedal triangle in disguise replaces a page of coordinates by one substitution.
`,

"orthic-triangle": String.raw`
## Key forms
- sides $a\cos A$, $b\cos B$, $c\cos C$ — the sides of the orthic triangle of an acute triangle
- angles $180^\circ - 2A$, $180^\circ - 2B$, $180^\circ - 2C$, with $H$ as its incenter
- $\text{perimeter} = \dfrac{2[ABC]}{R} = 4R\sin A\sin B\sin C$
- $[\text{orthic}] = 2\cos A\cos B\cos C\,[ABC]$ — the area

## Conditions
The orthic triangle is the triangle of the three altitude feet, equivalently the pedal triangle of the orthocenter $H$. The formulas above are for an acute triangle; for an obtuse triangle $H$ becomes an excenter of the orthic triangle instead of its incenter.

## Why it works
Each altitude foot sees the opposite side at a right angle, so pairs of feet are concyclic with the vertices, and a short angle chase gives the orthic angles $180^\circ - 2A$ and shows that each orthic side is antiparallel to the matching side of $ABC$.

The corner triangle cut off at $A$ is similar to $ABC$ with ratio $\cos A$, so it has area $\cos^2A\,[ABC]$, and likewise at $B$ and $C$. Hence $$[\text{orthic}] = \left(1 - \cos^2A - \cos^2B - \cos^2C\right)[ABC] = 2\cos A\cos B\cos C\,[ABC],$$ by the identity $\cos^2A + \cos^2B + \cos^2C + 2\cos A\cos B\cos C = 1$. The side opposite the foot on $BC$ is $a\cos A = R\sin 2A$, so the perimeter is $R(\sin 2A + \sin 2B + \sin 2C) = 4R\sin A\sin B\sin C = \frac{2[ABC]}{R}$, using $[ABC] = 2R^2\sin A\sin B\sin C$ from [[trig-area|the trig-area formula]].

## Useful observations
- Because $H$ is the [[incenter-excenter-lemma|incenter]] of the orthic triangle, the altitudes of $ABC$ are its angle bisectors, which explains the reflect-$H$ facts.
- The orthic triangle is inscribed in the [[nine-point-circle|nine-point circle]], of radius $\frac R2$.
- It is the inscribed triangle of least perimeter, which is Fagnano's problem.
- Turned inside out, the same configuration is the [[excentral-triangle|excentral triangle]]: $ABC$ is the orthic triangle of its own excentral triangle.

## Applications
Altitude feet, the least-perimeter inscribed triangle, and the reflections of $H$ in the sides and midpoints.

## Contest profile
The least-perimeter inscribed triangle and the reflect-$H$ facts are the recurring AIME and olympiad uses; the obtuse case, where $H$ is an excenter, is a frequent trap.
`,

"medial-triangle": String.raw`
## Key forms
- the medial triangle is similar to $ABC$ with ratio $\frac12$, with sides parallel to those of $ABC$
- $[\text{medial}] = \dfrac14[ABC]$ and $\text{perimeter} = s = \dfrac{a + b + c}{2}$
- its circumcircle is the nine-point circle, of radius $\dfrac R2$ and center $N$
- its orthocenter is $O$, and its incircle is the Spieker circle, centered at the [[spieker-point|Spieker point]]

## Conditions
The medial triangle is the triangle whose vertices are the midpoints of the sides of $ABC$.

## Why it works
The midpoints halve every side, so each of the four small triangles is similar to $ABC$ with ratio $\frac12$ by SAS on the midsegments, which gives a quarter of the area and half the perimeter apiece. The medial triangle is the image of $ABC$ under the homothety centered at the centroid $G$ with ratio $-\frac12$, which is why $G$ is shared and the orientation flips.

The same homothety carries the orthocenter $H$ of $ABC$ to the orthocenter of the medial triangle, which is $O$, because $H = 3G - 2O$. Its circumcircle passes through the three midpoints, and so it is the nine-point circle, with radius $\frac R2$.

## Useful observations
- The four-congruent-triangles picture proves midsegment and area-quartering claims at a glance.
- The homothety $(G, -\tfrac12)$ sends each center of $ABC$ to the matching center of the medial triangle, so a problem about the medial triangle's centers is a problem about $ABC$'s centers shrunk about $G$.

## Applications
Connect-the-midpoints configurations, area quartering, and the bridge into Euler-line and nine-point-circle problems.

## Contest profile
"Connect the midpoints" configurations on the AMC and AIME resolve through the quarter-area and homothety facts.
`,

"triangle-13-14-15": String.raw`
## Key forms
- $s = 21$ and $[ABC] = \sqrt{21 \cdot 8 \cdot 7 \cdot 6} = 84$, the smallest scalene triangle after $3$-$4$-$5$ with whole-number sides and a whole-number area
- the altitude to the side $14$ is $12$ and splits it into $5 + 9$, so the triangle is a $5$-$12$-$13$ and a $9$-$12$-$15$ right triangle glued along that altitude
- $r = \frac{A}{s} = 4$ and $R = \frac{abc}{4A} = \frac{65}{8}$; the exradii are $\frac{21}{2}$, $12$, $14$ opposite the sides $13$, $14$, $15$
- the cosines of the angles opposite $13$ and $15$ are $\frac{3}{5}$ and $\frac{5}{13}$, so both are angles you already know from the small Pythagorean triples

## Conditions
The sides are exactly $13$, $14$, $15$, or a scaled copy. A similar copy with scale factor $k$ has area $84k^2$, inradius $4k$, and circumradius $\frac{65k}{8}$.

## Why it works
Everything follows from one accident: the foot of the altitude to the side of length $14$ lands at a lattice point. Placing that side from $(0,0)$ to $(14,0)$ and solving $x^2 + y^2 = 13^2$ against $(x-14)^2 + y^2 = 15^2$ gives $x = 5$, $y = 12$ — the two equations differ by a linear one, and here it happens to resolve to integers.

So the apex sits at $(5,12)$ and the triangle is literally two Pythagorean triples sharing a leg. [[herons-formula|Heron]] then has nothing left to do: $s - a$, $s - b$, $s - c$ are $8$, $7$, $6$, and $21 \cdot 8 \cdot 7 \cdot 6 = 7056 = 84^2$ comes out square.

Once the area is rational every derived length is too, because $r$, $R$, the altitudes, and the exradii are all ratios built from the sides and the area: $r = \frac{A}{s}$, $R = \frac{abc}{4A}$, $h_a = \frac{2A}{a}$, $r_a = \frac{A}{s-a}$.

The clean cosines are the same fact read through the [[law-of-cosines|Law of Cosines]]: $\cos = \frac{3}{5}$ opposite $13$ and $\frac{5}{13}$ opposite $15$ are exactly the angles of the two right triangles the altitude created. Checking $R$ against [[law-of-sines|the Law of Sines]] confirms it, $\frac{13}{2 \sin A} = \frac{13}{2 \cdot 4/5} = \frac{65}{8}$.

## Useful observations
- The triple is recognized and the computing stops: a problem that hands over $13$, $14$, $15$ is saying the area is $84$, and it usually wants $r = 4$ or $R = \frac{65}{8}$ next. Dropping the altitude to the $14$ side converts any question about the interior into two right triangles with known legs, which is almost always faster than coordinates.
- The triple can come in disguise: a similar copy scaled by $k$ has area $84k^2$, and problems sometimes give two sides and the area, expecting the third to be recovered from $84$.

## Applications
Scalene triangles that need integer answers, incircle and circumcircle questions for a triangle given by its sides, and right-triangle decompositions along an altitude.

## Contest profile
This is the default scalene triangle for a problem that needs integer answers, and it appears far more often than chance would explain, on AMC and AIME alike, and especially in questions about the incircle or circumcircle of a triangle given by its three sides. It is the second member of a family of triangles with consecutive integer sides and integer area, whose middle sides follow a linear recurrence; only the first two are small enough to be worth memorizing.
`,


});

// Detail bodies added for dense medium-importance cards.
Object.assign(window.MATH_DETAILS, {

"altitude-bisector-angle": String.raw`
## Key forms
- $\angle(\text{altitude}, \text{bisector}) = \dfrac{|B - C|}{2}$ — the angle between the altitude and the bisector from $A$
- the $A$-altitude and $AO$ are isogonal: they are reflections of each other across the $A$-bisector
- $\angle HAO = |B - C|$ — the angle between the altitude and the line to the circumcenter

## Conditions
$O$ is the circumcenter and $H$ the orthocenter. If $B = C$ the altitude, bisector, and $AO$ all coincide and every angle is $0$.

## Why it works
Measure directions from $A$. The altitude to $BC$ makes the angle $90^\circ - B$ with side $AB$. The central angle $\angle AOC$ is $2B$ and $OA = OC$, so $\angle OAC = 90^\circ - B$: the line $AO$ makes that same angle with the other side $AC$. The altitude and $AO$ are therefore mirror images in the $A$-bisector, which is what isogonal means.

The bisector sits at $\frac A2 = 90^\circ - \frac{B + C}{2}$ from $AB$, so its gap to the altitude is $$(90^\circ - B) - \left(90^\circ - \tfrac{B + C}{2}\right) = \tfrac{C - B}{2}.$$ Doubling it, the altitude and $AO$ are $|B - C|$ apart.

## Useful observations
- The bisector is an axis of symmetry: the altitude and $AO$ each lie $\frac{|B - C|}{2}$ off it, so any one of the three directions gives the other two.
- Reflecting all three altitudes over the matching bisectors carries $H$ to $O$, which is why the orthocenter and the circumcenter are isogonal conjugates.

## Applications
Angles between an altitude and a bisector, and configurations that involve both an altitude and the circumcenter.

## Contest profile
Handy in AIME and olympiad geometry that has both an altitude and the circumcenter in one figure: half the difference of the two base angles drops out at once, and the isogonal view opens arguments that exchange the circumcenter and orthocenter.
`,

"incenter-area-split": String.raw`
## Key forms
- $[BIC] : [CIA] : [AIB] = a : b : c$ — joining the incenter to the vertices splits the triangle into three triangles with areas in the ratio of the sides they rest on
- $[BIC] = \frac{a}{a + b + c}[ABC]$ — each piece is its side's fraction of the perimeter
- $[ABC] = rs$ — the three areas $\frac12ar$, $\frac12br$, $\frac12cr$ add up to the area
- $I = \frac{aA + bB + cC}{a + b + c}$ — the incenter's barycentric coordinates are $(a : b : c)$

## Conditions
$I$ is the incenter, $r$ the inradius, and $s$ the semiperimeter; the same split holds for any interior point, with the sub-areas as its barycentric weights.

## Why it works
The incircle is tangent to all three sides, so the incenter is a distance $r$ from each, and that $r$ is the height of each sub-triangle onto the side it rests on. Hence $[BIC] = \frac12 ar$, $[CIA] = \frac12 br$, and $[AIB] = \frac12 cr$, proportional to $a$, $b$, $c$. Adding gives $[ABC] = \frac12(a + b + c)r = rs$, the standard area formula, and dividing gives $[BIC] = \frac{a}{a + b + c}[ABC]$.

For any interior point $P$, let $AP$ meet $BC$ at $D$. Triangles $ABP$ and $ACP$ share the base $AP$, so $\frac{BD}{DC} = \frac{[ABP]}{[ACP]}$, and comparing heights over $BC$ gives $\frac{AP}{PD} = \frac{[ABP] + [ACP]}{[PBC]}$. These are the ratios of the masses $[PBC]$, $[PCA]$, $[PAB]$ at $A$, $B$, $C$, so
$$P = \frac{[PBC]A + [PCA]B + [PAB]C}{[ABC]},$$
and for $P = I$ the weights are $\frac12 r(a, b, c)$.

## Useful observations
- A side-length ratio reads straight off as an area ratio, and the reverse.
- Because the three areas are the natural weights, they are the incenter's barycentric coordinates, the quickest way to place the incenter in a coordinate or vector computation.
- The one-line derivation of $[ABC] = rs$ gives $r$ whenever the area and the perimeter are known.

## Applications
Areas of the three triangles at the incenter, the incenter's coordinates, and the inradius from the area.

## Contest profile
AMC and AIME problems asking what fraction of the area a sub-triangle occupies, or needing the incenter's coordinates, use it directly.
`,

"orthocentric-system": String.raw`
## Key forms
- if $H$ is the orthocenter of $ABC$, then $A$ is the orthocenter of $HBC$, $B$ of $HCA$, and $C$ of $HAB$: each of the four points is the orthocenter of the triangle on the other three
- the four triangles $ABC$, $HBC$, $HCA$, $HAB$ share one nine-point circle, and all four have circumradius $R$
- the four circumcenters are the images of $H, A, B, C$ under the point reflection in the common nine-point center, so they form a second orthocentric system congruent to the first

## Conditions
$ABC$ is not a right triangle, since otherwise $H$ is a vertex and the four points collapse to three. In an acute triangle $H$ lies inside $ABC$; in an obtuse one the obtuse vertex lies inside the triangle formed by the other three, so exactly one of the four points is always inside.

## Why it works
Step 1, the roles are symmetric. By definition $AH \perp BC$, $BH \perp CA$, and $CH \perp AB$. In triangle $HBC$ the altitude from $H$ is perpendicular to $BC$, and $HA$ is that line. The altitude from $B$ is perpendicular to $HC$, and $BA$ is that line, since $CH \perp AB$. The altitude from $C$ is $CA$, since $BH \perp CA$. All three pass through $A$, so $A$ is the orthocenter of $HBC$, and the same argument works for $HCA$ and $HAB$.

Step 2, equal circumradii. By [[orthocenter-properties|the reflection facts for the orthocenter]], the reflection of $H$ over $BC$ lies on the circumcircle of $ABC$. So reflecting that circle over $BC$ gives a circle that still contains $B$ and $C$ (they are on the mirror) and now contains $H$. It is the circumcircle of $HBC$, and it has radius $R$. The same holds for the other two triangles through $H$.

Step 3, one nine-point circle. The nine-point circle of $ABC$ passes through the midpoints of $BC$, $HB$, and $HC$. These are the midpoints of the three sides of triangle $HBC$, and they are not collinear, so they determine the nine-point circle of $HBC$: it is the same circle. The same holds for $HCA$ and $HAB$.

Step 4, the circumcenters. Take $O$ as the origin, so $H = A + B + C$. By Step 2 the circumcenter of $HBC$ is the reflection of $O$ over $BC$. The foot of the perpendicular from $O$ to $BC$ is the midpoint $\frac{B + C}{2}$, so that reflection is $$B + C = H - A.$$ Likewise the other two circumcenters are $H - B$ and $H - C$, and the circumcenter of $ABC$ is $O = H - H$.

The map $X \mapsto H - X$ is the point reflection in $N = \frac H2$, the common nine-point center, and it sends $H, A, B, C$ to the four circumcenters. A point reflection preserves all distances and angles, so those four circumcenters form an orthocentric system congruent to $ABCH$.

## Useful observations
- The six lines joining pairs of the four points fall into three perpendicular pairs: $AH \perp BC$, $BH \perp CA$, and $CH \perp AB$.
- A fact about a triangle and its orthocenter holds four times in one figure. For example, $AH = 2R\lvert\cos A\rvert$ applied to $HBC$, whose circumradius is $R$ and whose angle at $H$ is $180^\circ - A$, returns the same $AH$.
- The common nine-point center $N$ is the midpoint of each segment joining one of the four points to the circumcenter of the triangle on the other three.

## Applications
Facts about a triangle's orthocenter transferred to the triangles $HBC$, $HCA$, $HAB$, circumradius comparisons between these triangles, and configurations where one of the four points is only implied.

## Contest profile
Olympiad figures built on a triangle and its orthocenter, where swapping $H$ with a vertex reuses a lemma for free. It ties the orthocenter, the circumcircle reflections, and the nine-point circle into one configuration.
`,

"common-chord-length": String.raw`
## Key forms
- $d_1 = \dfrac{d^2 + R^2 - r^2}{2d}$ — the distance from the center of the circle of radius $R$ to the common chord, where $d$ is the distance between the centers
- $\text{chord} = 2\sqrt{R^2 - d_1^{\,2}}$ — the length of the common chord
- $d_2 = d - d_1$ — the distance from the other center, which must give the same half-chord $\sqrt{r^2 - d_2^{\,2}}$

## Conditions
The circles cross, which needs $\lvert R - r\rvert \lt d \lt R + r$. The common chord lies on the radical axis, perpendicular to the line of centers.

## Why it works
Both endpoints of the common chord lie on each circle, so the segment is a chord of both, and the line of centers is its perpendicular bisector, meeting it at right angles at its midpoint.

Writing the half-chord $h$ two ways, $h^2 = R^2 - d_1^2$ from one circle and $h^2 = r^2 - d_2^2$ from the other with $d_1 + d_2 = d$, and subtracting gives $d_1 = \frac{d^2 + R^2 - r^2}{2d}$, which is just the location of the radical axis.

## Useful observations
- $d_1$ is computed from the three lengths, then the chord is $2\sqrt{R^2 - d_1^2}$; the intersection points are never needed.
- Using $d_2 = d - d_1$ gives a free check, since both circles must return the same half-chord.
- The chord splits the lens of overlap into two circular segments, which is how overlap-area problems proceed.

## Applications
The distance between the two intersection points of two circles, and lens and overlap-area problems.

## Contest profile
A recurring AIME computation, "two circles meet; find their common chord," and the workhorse behind lens and overlap-area problems.
`,

"tangent-circles": String.raw`
## Key forms
- external tangency: $d = R + r$; internal tangency: $d = |R - r|$
- crossing in two points $\iff |R - r| \lt d \lt R + r$
- circles resting on a line and touching: contact points $2\sqrt{Rr}$ apart
- a circle resting between them on the same line: $\frac1{\sqrt x} = \frac1{\sqrt R} + \frac1{\sqrt r}$

## Conditions
The touch point lies on the line of centers in every tangent case.

## Why it works
At the point where two circles touch they share a tangent line, and both radii to that point are perpendicular to it, so both centers lie on one line through the touch point.

By [[tangent-facts|the radius-tangent property]], each center lies on the perpendicular to the common tangent through the touch point $T$. There is only one such perpendicular, so the two centers and $T$ are collinear. If the centers are on opposite sides of $T$, the circles sit outside each other and $d = R + r$; if they are on the same side, one circle is inside the other and $d = R - r$.

The same number classifies every position of two circles. Pulling the centers apart from external tangency separates the circles; pushing them together past it makes them cross in two points, until they reach internal tangency; closer still, one circle lies inside the other without touching.

{{figure:positions}}

## Useful observations
- Circles resting on a common line and touching each other have contact points $2\sqrt{Rr}$ apart, from the right triangle with hypotenuse $R + r$ and vertical leg $R - r$.

{{figure:floor}}

- A third circle on the line, between and touching both, splits that distance into $2\sqrt{Rx} + 2\sqrt{rx} = 2\sqrt{Rr}$, which gives $\frac1{\sqrt x} = \frac1{\sqrt R} + \frac1{\sqrt r}$.
- The centers of circles tangent to two fixed circles have center distances whose difference or sum is constant, so they lie on a hyperbola or an ellipse with the fixed centers as foci.
- Spheres follow the same rule, so a ball of radius $r$ rolling inside a sphere of radius $R$ keeps its center on a sphere of radius $R - r$, and four mutually tangent circles obey [[descartes-circle-theorem|Descartes' Circle Theorem]].

## Applications
Chains and packings of tangent circles, circles on a common line, and tangent spheres.

## Contest profile
A staple of AMC circle problems and the opening line of most AIME circle-packing setups; the next step is usually the Pythagorean Theorem on a triangle of centers.
`,

"incircle-excircle-touch": String.raw`
## Key forms
- $s - b$ from $B$ — where the incircle touches $BC$, so it is $s - c$ from $C$
- $s - c$ from $B$ — where the $A$-excircle touches $BC$
- $XX' = |b - c|$ — the distance between the two touch points on $BC$
- the two touch points are reflections of each other in the midpoint $M$ of $BC$

## Conditions
$a = BC$, $b = CA$, $c = AB$, and $s$ is the semiperimeter; the excircle is the one opposite $A$, tangent to $BC$ and the extensions of $AB$ and $AC$.

## Why it works
Equal tangents from a vertex fix the incircle contact distances: the two tangents from $B$ are equal, forcing the touch point on $BC$ to be $s - b$ from $B$. The $A$-excircle touches $BC$ with the roles of $b$ and $c$ swapped, at $s - c$ from $B$. Since $(s - b) + (s - c) = a$, those two points average to $\frac a2$, the midpoint $M$ of $BC$, so they are reflections of each other in $M$, a distance $(s - b) - (s - c) = |b - c|$ apart.

## Useful observations
- Both contact points are placed from the side lengths alone, with $M$ as their common midpoint.
- The gap $|b - c|$ measures how far the triangle is from isosceles; it is $0$ exactly when $b = c$, where both circles touch $BC$ at its midpoint.
- The same reflection fact is used in the lemmas about the mixtilinear incircle and the $A$-excircle.

## Applications
Distances between the contact points of the incircle and an excircle, and configurations that mix the incircle and an excircle on one side.

## Contest profile
Useful whenever a problem mixes the incircle and an excircle on one side, or asks for the distance between contact points.
`,

"integer-triangles-perimeter": String.raw`
## Key forms
- $\operatorname{round}\!\left(\frac{n^2}{48}\right)$ — the number of noncongruent integer-sided triangles with perimeter $n$, for $n$ even
- $\operatorname{round}\!\left(\frac{(n + 3)^2}{48}\right)$ — the same count for $n$ odd
- $c \lt \frac n2$ — the triangle inequality for sorted sides $a \le b \le c$ with $a + b + c = n$

## Conditions
Triangles are counted up to congruence, so each side triple $a \le b \le c$ counts once; sides are positive integers.

## Why it works
Count triples ordered by size, $a \le b \le c$, with $a + b + c = n$ and the single binding constraint $a + b \gt c$, which is the same as $c \lt \frac n2$ since the other two inequalities are automatic once the sides are sorted.

Fix the longest side $c$. Then $a + b = n - c$ with $a \le b \le c$, a short run of pairs $(a, b)$ to count. Summing the counts over the allowed $c$, from $\lceil \frac n3 \rceil$ up to $\lfloor \frac{n - 1}{2} \rfloor$, gives a quadratic in $n$, and it collapses to the nearest integer to $\frac{n^2}{48}$ for even $n$ and to $\frac{(n + 3)^2}{48}$ for odd $n$. This is Alcuin's sequence.

## Useful observations
- For one specific small $n$, the sum over $c$ can be written out directly, and the rounded formula is the quick check on a full count.
- Variants change only the inner count: requiring distinct sides ($a \lt b \lt c$), an isosceles or right shape, or a cap on one side.
- For perimeter $12$ the three triangles are $(2, 5, 5)$, $(3, 4, 5)$, and $(4, 4, 4)$.

## Applications
Counting integer-sided triangles of a given perimeter, and counting those with an extra condition on the sides.

## Contest profile
A MATHCOUNTS and AMC counting question whose answer is a short list; the rounded formula confirms a full count in one line.
`,

"equal-chords-arcs": String.raw`
## Key forms
- equal chords $\iff$ equal arcs $\iff$ equal distances from the center — in one circle, or in two congruent circles
- $\ell = 2\sqrt{R^2 - d^2}$ — the length $\ell$ of a chord whose distance from the center is $d$, in a circle of radius $R$
- the perpendicular from the center to a chord bisects the chord and the arc it cuts off
- the longer of two chords lies closer to the center, and the diameter, at distance $0$, is the longest chord

## Conditions
The chords belong to the same circle or to congruent circles. The statements about arcs mean the minor arcs, or the major arcs for both chords.

## Why it works
All three conditions come from the same congruent triangles at the center. A [[chord-length|chord]] of length $\ell$ at distance $d$ from the center $O$ (radius $R$) satisfies $\ell = 2\sqrt{R^2 - d^2}$, so $\ell$ and $d$ determine each other; equal chords force equal $d$ and conversely.

The isosceles triangles formed by $O$ and a chord's endpoints subtend equal central angles when the chords are equal, and equal central angles cut equal arcs, so "equal chords," "equal arcs," and "equal distance from center" are one fact viewed three ways.

## Useful observations
- The perpendicular from $O$ to a chord bisects the chord, since the two right triangles formed by $O$, the foot, and an endpoint are congruent, and it bisects the arc too. This is the standard route to a chord's or arc's midpoint.
- Read backwards, it locates the center: the perpendicular bisector of any chord passes through $O$, so two of them meet at the center, which is how a circumcenter is found.
- From $\ell = 2\sqrt{R^2 - d^2}$, a larger $\ell$ means a smaller $d$, and the same relation converts a chord length to its distance from the center, or back, in one step.

## Applications
Configurations with two equal chords, midpoints of chords and arcs, and converting a chord length into a distance from the center or the reverse.

## Contest profile
These appear in "two equal chords" configurations, in midpoint and bisection constructions, and any time a chord length has to be turned into its distance from the center, or the reverse. That bridge is the workhorse.
`

});

Object.assign(window.MATH_DETAILS, {

"regular-dodecagon": String.raw`
## Key forms
- $A = 3(2 + \sqrt3)s^2 = 6s^2 + 3\sqrt3\,s^2$ — the area of a regular dodecagon of side $s$
- $A = 3R^2$ — the area when the circumradius is $R$
- $150^\circ$ — each interior angle
- $R = \frac s2\left(\sqrt6 + \sqrt2\right)$ — the circumradius in terms of the side

## Conditions
The dodecagon is regular, with side $s$ and circumradius $R$.

## Why it works
Build it outward from a regular hexagon of side $s$, itself six equilateral triangles from its center. Erect a square on each of the hexagon's six edges; at each hexagon vertex the $120^\circ$ interior angle plus the two adjacent squares' $90^\circ$ corners leave a $60^\circ$ gap that one more equilateral triangle fills exactly. The outer boundary is now $12$ equal edges meeting at equal $150^\circ$ angles, a regular dodecagon, assembled from $6$ squares and $6 + 6 = 12$ equilateral triangles, so $A = 6s^2 + 12 \cdot \frac{\sqrt3}{4}s^2 = 3(2 + \sqrt3)s^2$.

The circumradius form is the sine formula of [[regular-polygon-area|Regular Polygon Area]] with $n = 12$: $\frac12 \cdot 12 \cdot R^2 \sin 30^\circ = 3R^2$. It rearranges into three $R \times R$ squares, so a dodecagon inscribed in a unit circle has area exactly $3$.

## Useful observations
- The side and the circumradius are tied by $s = 2R\sin 15^\circ$, with $\sin 15^\circ = \frac{\sqrt6 - \sqrt2}{4}$, which gives $R = \frac s2(\sqrt6 + \sqrt2)$.
- The $150^\circ$ interior angle is the reason the square-and-triangle dissection closes up.
- Angles of $15^\circ$, $75^\circ$, and $150^\circ$ in a problem often signal a hidden dodecagon.
- The chord between vertices $k$ steps apart is $2R\sin 15^\circ k$: it is $R$ for $k = 2$, the side of the inscribed regular hexagon, $R\sqrt2$ for $k = 3$, the side of the inscribed square, $R\sqrt3$ for $k = 4$, the side of the inscribed equilateral triangle, and $2R$ for $k = 6$.

## Applications
Areas of regular $12$-gons from the side or the circumradius, and dissections into squares and equilateral triangles.

## Contest profile
An early AMC favorite: a dodecagon inscribed in a circle, where the area $3R^2$ is available at sight, and dissection problems.
`,

"regular-octahedron": String.raw`
## Key forms
- $V = \frac{s^3\sqrt2}{3}$, surface area $2s^2\sqrt3$, and $6$ vertices, $12$ edges, $8$ faces
- $R = \frac{s\sqrt2}{2}$ and $r = \frac{s\sqrt6}{6}$ — the circumradius and the inradius
- the dihedral angle is $\arccos\left(-\frac13\right) \approx 109.5^\circ$, which with the tetrahedron's $70.5^\circ$ makes $180^\circ$
- the volume is four times that of a [[regular-tetrahedron|regular tetrahedron]] of the same edge
- the centers of the faces of a cube of edge $e$ are the vertices of a regular octahedron of edge $\frac{e\sqrt2}{2}$ and volume $\frac{e^3}{6}$

## Conditions
All twelve edges are equal and four faces meet at each vertex.

## Why it works
The four vertices that are not at the top or the bottom form a square of side $s$, since their diagonals are a pair of opposite octahedron edges. Above and below it sit two congruent pyramids with apex over the center of the square, at height $\frac{s}{\sqrt2}$, half a face diagonal of the square, so $$V = 2 \cdot \frac13 \cdot s^2 \cdot \frac{s}{\sqrt2} = \frac{s^3\sqrt2}{3}.$$ The surface is eight equilateral triangles, $8 \cdot \frac{\sqrt3}{4}s^2 = 2s^2\sqrt3$. The center is at distance $\frac{s}{\sqrt2}$ from every vertex, so $R = \frac{s\sqrt2}{2}$, and $r = \frac{3V}{S} = \frac{s\sqrt6}{6}$.

For the cube relation, the centers of two adjacent faces of a cube of edge $e$ are $\frac{e\sqrt2}{2}$ apart, which is the octahedron's edge, and substituting $s = \frac{e\sqrt2}{2}$ gives $V = \frac{e^3}{6}$. Equivalently, the octahedron is two pyramids on the square through four face centers, with base area $\frac{e^2}{2}$ and height $\frac e2$.

## Useful observations
- A regular tetrahedron of edge $2s$ is an octahedron of edge $s$ with four tetrahedra of edge $s$ at its corners, so $V_{\text{oct}} = 8V - 4V = 4V$ where $V$ is the volume of the small tetrahedron.
- The dihedral angles of the tetrahedron and the octahedron add to $180^\circ$, and two of each fit around a common edge, since $2 \cdot 70.5^\circ + 2 \cdot 109.5^\circ = 360^\circ$.
- A plane through the center parallel to a face cuts the octahedron in a regular hexagon, and a plane through four vertices cuts it in a square.

## Applications
Volumes and radii of regular octahedra, octahedra inside cubes, and counts of faces, edges, and vertices with $V - E + F = 2$.

## Contest profile
A solid that comes mostly as the dual of a cube: volume ratios against an inscribing or inscribed cube or tetrahedron, the square and hexagonal sections, and counts on its faces and vertices.
`

});

Object.assign(window.MATH_DETAILS, {

"perp-to-angle-bisector": String.raw`
## When to use
A perpendicular from $B$ to the bisector of angle $A$; a bisector together with a sum or difference of sides, such as $AB + BD = AC$; two angle bisectors meeting at a point with distances to compare; and trapezoids or parallelograms where the bisectors of two adjacent angles meet. The signal is a bisector that has no use as a ratio, but would be useful as a mirror.

## How
1. Reflect $B$ across the bisector of angle $A$ to $B'$, which lies on line $AC$ with $AB' = AB$.
2. Record what it fixes: the foot $F$ is the midpoint of $BB'$, and the point $D$ where the bisector meets $BC$ has $B'D = BD$.
3. Work in the leftover triangle $B'DC$, where $B'C = |b - c|$ and the reflected angle $\angle AB'D = \angle B$ sits as an exterior angle.
4. For questions about $F$, use the midline: if $M$ is the midpoint of $BC$, then $FM \parallel AC$ and $FM = \frac{|b - c|}{2}$.

If $AB + BD = AC$, then $\angle B = 2\angle C$. After the reflection, $B'C = AC - AB = BD = B'D$, so triangle $B'DC$ is isosceles with base angles equal to $\angle C$, and its exterior angle at $B'$ is $2\angle C$. That angle is the reflected copy of $\angle B$.

{{figure:copy}}

## Why it works
The bisector of angle $A$ makes equal angles with $AB$ and $AC$, so reflection across it swaps the two rays, and $B$ lands on ray $AC$ at the same distance from $A$. Every point on the mirror stays fixed, including $D$, so the reflection carries triangle $ABD$ onto triangle $AB'D$, and two isosceles triangles appear, $ABB'$ and $DBB'$, each with the bisector as its axis.

{{figure:twice}}

The segment $BB'$ is perpendicular to the mirror and cut in half by it, so the foot of the perpendicular from $B$ is the midpoint $F$ of $BB'$, and in the right triangle $ABF$, $BF = c\sin\frac A2$. The external bisector works the same way, except that $B'$ lands on $AC$ extended beyond $A$, so $B'C = b + c$ and the midline is $\frac{b + c}{2}$.

{{figure:external}}

## Formulas it uses
- [[midsegment-theorem]]: $F$ and $M$ are midpoints of two sides of triangle $BB'C$, so $FM \parallel AC$ and $FM = \frac{B'C}{2}$.

## Common traps
- Placing $B'$ on the wrong side of $A$: for the internal bisector it is on ray $AC$, for the external bisector on the opposite ray.
- Forgetting that $B'C = |b - c|$ changes direction when $b < c$, so $B'$ lies beyond $C$.
- Reflecting the wrong vertex: the reflected vertex must be an endpoint of the perpendicular, not the vertex of the bisected angle.

## Contest profile
An AIME and olympiad move: in trapezoids and triangles with a bisector plus a length condition, reflecting across the bisector is usually the intended first line.
`,

"isotomic-conjugate": String.raw`
## Key forms
- reflecting each cevian foot of $P$ over the midpoint of its side gives three new cevians that concur at $P^*$, the isotomic conjugate
- $(x : y : z) \mapsto \left(\dfrac1x : \dfrac1y : \dfrac1z\right)$ — the map in barycentric coordinates
- the centroid is its own isotomic conjugate, and the Gergonne point and the Nagel point are an isotomic pair

## Conditions
$P$ is a point not on a side line of $ABC$ and not on a line through a vertex parallel to the opposite side.

## Why it works
Reflecting a cevian foot over its side's midpoint is an involution on that side: it swaps $BD : DC$ with $DC : BD$. Ceva's Theorem says the cevians concur exactly when the product of the three ratios is $1$, and inverting every ratio inverts the product, which is still $1$. So the three new cevians concur, at a point $P^*$ that is again isotomic to $P$.

In barycentric coordinates, a foot $D = (0 : y : z)$ has $BD : DC = z : y$, and its reflection has $BD^* : D^*C = y : z$, which is the foot $(0 : z : y) \propto \left(0 : \frac1y : \frac1z\right)$. Doing this on all three sides gives $P^* = \left(\frac1x : \frac1y : \frac1z\right)$.

## Useful observations
- A fact about one point of an isotomic pair becomes a fact about the other, as with the Gergonne and Nagel points.
- It pairs with isogonal conjugation: composing the two maps sends $(x : y : z)$ to $\left(\frac{x}{a^2} : \frac{y}{b^2} : \frac{z}{c^2}\right)$, so problems that mix "reflect over the midpoint" and "reflect over the bisector" reduce to coordinate bookkeeping.
- Reciprocal coordinates make it a clean computation: invert each coordinate and clear denominators.

## Applications
Pairs of cevians that reflect over side midpoints, and the relation between the Gergonne and Nagel points.

## Contest profile
An advanced triangle-center tool: recognizing an isotomic pair collapses a two-point problem into one.
`,

"contact-triangle": String.raw`
## Key forms
- $s - a$, $s - b$, $s - c$ — the tangent lengths from $A$, $B$, $C$ to the incircle, which are the distances from each vertex to its two touch points
- angles $90^\circ - \dfrac A2$, $90^\circ - \dfrac B2$, $90^\circ - \dfrac C2$, and sides $2r\cos\dfrac A2$, $2r\cos\dfrac B2$, $2r\cos\dfrac C2$
- circumradius $r$, since the touch points lie on the incircle
- $[\text{contact}] = \dfrac{r}{2R}[ABC]$

## Conditions
The contact (intouch) triangle has the three points where the incircle touches the sides as its vertices; $s$ is the semiperimeter of $ABC$.

## Why it works
Equal tangents from each vertex cut the sides into the classic lengths $s - a$, $s - b$, $s - c$, and the three touch points lie on the incircle, so the incircle is the contact triangle's circumcircle, of radius $r$. Each contact-triangle angle is an inscribed angle on an arc between two touch points: the angle at the touch point on $BC$ stands on the arc $EF$ whose central angle is $180^\circ - A$, so it equals $90^\circ - \frac A2$. The Law of Sines in the incircle then gives the side $EF = 2r\sin\left(90^\circ - \frac A2\right) = 2r\cos\frac A2$.

For the area, the three radii to the touch points split the contact triangle into three pieces with central angles $180^\circ - A$, $180^\circ - B$, $180^\circ - C$, so $[\text{contact}] = \frac12r^2(\sin A + \sin B + \sin C) = \frac12r^2 \cdot \frac sR$, and with $[ABC] = rs$ this is $\frac{r}{2R}[ABC]$.

## Useful observations
- The cevians from each vertex to the opposite touch point concur at the Gergonne point; the extouch triangle, where the excircles touch the sides, has its cevians concurrent at the Nagel point.
- The tangent lengths $s - a$, $s - b$, $s - c$ linearize almost every incircle-length computation, and they are the most reused substitution in triangle geometry.
- The area ratio $\frac{r}{2R}$ converts between the contact triangle and $ABC$, and it is at most $\frac14$, with equality for the equilateral triangle.

## Applications
Incircle tangency lengths, Gergonne-point configurations, and the triangle of the touch points.

## Contest profile
Standard at AIME and olympiad level for incircle-tangency lengths and Gergonne-point configurations.
`,

"excentral-triangle": String.raw`
## Key forms
- vertices $I_A$, $I_B$, $I_C$ — the three excenters
- $I$ is the orthocenter of $I_AI_BI_C$, and $ABC$ is its orthic triangle
- angles $90^\circ - \dfrac A2$, $90^\circ - \dfrac B2$, $90^\circ - \dfrac C2$ at $I_A$, $I_B$, $I_C$
- sides $4R\cos\dfrac A2$, $4R\cos\dfrac B2$, $4R\cos\dfrac C2$, circumradius $R_{\text{ex}} = 2R$
- $[I_AI_BI_C] = \dfrac{2R}{r}[ABC] = 2Rs$

## Conditions
$I_A$, $I_B$, $I_C$ are the centers of the excircles opposite $A$, $B$, $C$ of triangle $ABC$, with circumradius $R$, inradius $r$, and semiperimeter $s$.

## Why it works
At each vertex the internal and external bisectors are perpendicular. The line $I_BI_C$ is the external bisector at $A$, and $AI$ is the internal bisector, so $AI \perp I_BI_C$: $A$ is the foot of the altitude from $I_A$. The same holds at $B$ and $C$, so $I$ is the orthocenter of $I_AI_BI_C$ and $ABC$ is its orthic triangle. By the [[incenter-excenter-lemma|incenter-excenter lemma]], the arc midpoints of $ABC$ are the midpoints of the sides of $I_AI_BI_C$.

The circle through the three altitude feet $A$, $B$, $C$ of a triangle is its nine-point circle, so the circumcircle of $ABC$, of radius $R$, is the nine-point circle of the excentral triangle, whose radius is half its circumradius. Hence $R_{\text{ex}} = 2R$. The external bisectors at $B$ and $C$ meet at $I_A$ with angle $180^\circ - \left(90^\circ - \frac B2\right) - \left(90^\circ - \frac C2\right) = 90^\circ - \frac A2$, so the Law of Sines gives $I_BI_C = 2(2R)\sin\left(90^\circ - \frac A2\right) = 4R\cos\frac A2$.

## Useful observations
- Treating $ABC$ as the orthic triangle of the excenters imports the whole orthocentric toolkit: reflections of the orthocenter, the nine-point circle, and every orthic-triangle fact, by renaming.
- The area is $2Rs$ because the excentral triangle has circumradius $2R$ and the product of its sides $64R^3\cos\frac A2\cos\frac B2\cos\frac C2 = 16R^2s$, and $r\,[I_AI_BI_C] = 2R\,[ABC]$ is the same fact written with $[ABC] = rs$.
- It is the same configuration as the orthic triangle seen from the other side: starting from any acute triangle, the triangle of its excenters has it as the orthic triangle.

## Applications
Problems about incenters, excenters, and arc midpoints that become orthocentric configurations, and the radius, sides, and area of the triangle of excenters.

## Contest profile
An olympiad configuration for excenter and bisector problems. Spotting that $ABC$ is the orthic triangle of its excenters unlocks every orthocenter fact already known.
`,

"reims-theorem": String.raw`
## Key forms
- two circles meet at $P$ and $Q$; a line through $P$ meets them again at $A$ and $C$, and a line through $Q$ meets them again at $B$ and $D$: then $AB \parallel CD$
- the converse: if $A, B, P, Q$ are concyclic, $C$ lies on line $AP$, $D$ lies on line $BQ$, and $CD \parallel AB$, then $C, D, P, Q$ are concyclic

## Conditions
The two lines through $P$ and through $Q$ are different lines, and $A, B$ lie on one circle through $P, Q$ while $C, D$ lie on the other. Directed angles make the statement independent of the picture: the points may be inside or outside either circle.

## Why it works
A directed angle $\angle(\ell, m)$ is the counterclockwise turn from line $\ell$ to line $m$, taken modulo $180^\circ$. Four points $W, X, Y, Z$ are concyclic exactly when $\angle(YW, YX) = \angle(ZW, ZX)$, and two lines are parallel exactly when they make equal directed angles with a third line.

Step 1, the first circle. $A$, $B$, $P$, $Q$ lie on one circle, so the chord $BP$ is seen at the same directed angle from $A$ and from $Q$: $$\angle(AB, AP) = \angle(QB, QP).$$

Step 2, the second circle. In the same way, $C$, $D$, $P$, $Q$ are concyclic, so $$\angle(CD, CP) = \angle(QD, QP).$$

Step 3, compare. $B$, $Q$, $D$ are collinear, so the lines $QB$ and $QD$ are the same line and the right sides of Steps 1 and 2 are equal. $A$, $P$, $C$ are collinear, so $AP$ and $CP$ are the same line. Hence $$\angle(AB, AC) = \angle(CD, AC),$$ and the lines $AB$ and $CD$ make the same directed angle with $AC$. They are parallel.

Step 4, the converse. Suppose $A, B, P, Q$ are concyclic and $CD \parallel AB$. Then $$\angle(CD, CP) = \angle(AB, AP) = \angle(QB, QP) = \angle(QD, QP),$$ using parallelism, the first circle, and the collinearity of $B, Q, D$. Equal angles at $C$ and $Q$ over the chord $DP$ make $C, D, P, Q$ concyclic.

## Useful observations
- The two statements are one fact read in two directions: with $A, B, P, Q$ concyclic, $CD \parallel AB$ holds exactly when $C, D, P, Q$ are concyclic.
- To prove two lines parallel, find the two circles through a common pair of points; to prove four points concyclic, find the parallel lines.
- Using directed angles throughout is what removes the case analysis over how the points are arranged.

## Applications
Turning parallelism into concyclicity and back in two-circle figures, and proving that chords cut by lines through the two intersection points are parallel.

## Contest profile
A workhorse olympiad angle-chasing lemma, used whenever two circles meet in two points and lines through those points cut the circles again, to turn a parallelism into a hidden cyclic quadrilateral or the reverse.
`,

"mixtilinear-incircle": String.raw`
## Key forms
- the $A$-mixtilinear incircle $\omega$ touches $AB$ at $E$, $AC$ at $F$, and the circumcircle at $T$, with $AE = AF = \dfrac{bc}{s}$
- its radius is $\rho = \dfrac{r}{\cos^2(A/2)} = \dfrac{r\,bc}{s(s - a)}$
- $I$ is the midpoint of the chord $EF$
- $T$, $I$, and the midpoint $M_A$ of arc $BAC$ are collinear, so $TI$ bisects $\angle BTC$

## Conditions
$\omega$ touches the rays $AB$ and $AC$ and touches the circumcircle internally at a point $T$ of the arc $BC$ not containing $A$. This holds in every triangle, obtuse ones included. Here $s$ is the semiperimeter and $r$ the inradius.

## Why it works
Step 1, the touch points. The circle $\omega$ lies inside the circumcircle, so $E$ is on the chord $AB$ and $F$ on the chord $AC$, and $AE = AF = t$. The tangent lengths from $A$, $B$, $C$ to $\omega$ are $t$, $c - t$, $b - t$. The circles $A$, $B$, $\omega$, $C$ touch the circumcircle in that order, so [[caseys-theorem|Casey's Theorem]] gives $$c(b - t) + b(c - t) = a\,t, \qquad t = \frac{2bc}{a + b + c} = \frac{bc}{s}.$$

Step 2, the radius. The center of $\omega$ is on the bisector $AI$, and $\rho = t\tan\frac A2$. The tangent length from $A$ to the incircle is $s - a$, so $\tan\frac A2 = \frac{r}{s - a}$, and $\rho = \frac{bc}{s}\cdot\frac{r}{s - a}$. Also $\cos^2\frac A2 = \frac{1 + \cos A}{2} = \frac{(b + c)^2 - a^2}{4bc} = \frac{s(s - a)}{bc}$, so $\rho = \frac{r}{\cos^2(A/2)}$.

Step 3, $I$ is the midpoint of $EF$. Triangle $AEF$ is isosceles, so its midpoint $J$ of $EF$ is on the bisector $AI$ with $AJ = t\cos\frac A2$. The incircle's tangent length gives $AI = \frac{s - a}{\cos(A/2)}$. Using $\cos^2\frac A2 = \frac{s(s - a)}{bc}$, $$AJ = \frac{bc}{s}\cos\frac A2 = \frac{bc}{s}\cdot\frac{s(s - a)}{bc}\cdot\frac{1}{\cos(A/2)} = AI.$$ So $J = I$, and $EF \perp AI$.

Step 4, the homothety at $T$. The [[incircle-tangent-lengths|tangent-length facts]] used above are standard; the circle facts come from the homothety at $T$ with positive ratio, which sends $\omega$ to the circumcircle. It sends the line $AB$, tangent to $\omega$ at $E$, to a parallel tangent of the circumcircle on the far side of $AB$ from $T$, touching at the midpoint $M_C$ of arc $AB$ not containing $C$. So $T$, $E$, $M_C$ are collinear. In the same way $T$, $F$, $M_B$ are collinear, with $M_B$ the midpoint of arc $AC$ not containing $B$. Note that $M_C$ lies on $CI$ and $M_B$ on $BI$.

Step 5, two cyclic quadrilaterals. Use [[directed-angles|directed angles]] with the triangle counterclockwise, so $\angle(AB, AC) = A$, $\angle(BC, BA) = B$, $\angle(CA, CB) = C$ modulo $180^\circ$. From the circumcircle, $\angle(TB, TE) = \angle(TB, TM_C) = \angle(CB, CM_C) = \angle(CB, CI) = -\frac C2$. From Step 3, $\angle(IB, IE) = \angle(IB, IA) + \angle(IA, EF) = \frac{A + B}{2} + 90^\circ \equiv -\frac C2$. So $B$, $E$, $I$, $T$ are concyclic, and likewise $C$, $F$, $I$, $T$.

Step 6, the bisector. From those circles, $\angle(TB, TI) = \angle(EB, EI) = \angle(AB, EF) = \frac A2 + 90^\circ$ and $\angle(TC, TI) = \angle(FC, FI) = \angle(AC, EF) = -\frac A2 + 90^\circ$. These are negatives of each other modulo $180^\circ$, so $TI$ is a bisector of $\angle BTC$. The bisector at $T$ meets the circumcircle at the midpoints of the two arcs $BC$. The line $TI$ cannot be the one through the midpoint of the arc containing $T$, since that chord stays on the far side of $BC$ from $I$. So it passes through $M_A$.

## Useful observations
- The first fact to use is $AE = AF = \frac{bc}{s}$, which turns tangencies to the two sides into lengths.
- The collinearity $T, I, M_A$ pins down $T$ as the second intersection of line $M_AI$ with the circumcircle.
- The midpoint-of-$EF$ property is the special case of the [[sawayama-thebault|Sawayama–Thébault Lemma]] with the cevian pushed out to a side.

## Applications
Lengths along $AB$ and $AC$ from the touch points, the radius of the mixtilinear circle, and collinearities through the incenter and arc midpoints.

## Contest profile
A recurring configuration in olympiad geometry whenever a circle touches two sides of a triangle and its circumcircle. The touch point $T$ and its collinearities through $I$ are the usual keys.
`,

"descartes-sphere-theorem": String.raw`
## Key forms
- five mutually tangent spheres with curvatures $k_i = \frac{1}{r_i}$ satisfy $(k_1 + k_2 + k_3 + k_4 + k_5)^2 = 3\left(k_1^2 + k_2^2 + k_3^2 + k_4^2 + k_5^2\right)$
- given four mutually tangent spheres, write $S = k_1 + k_2 + k_3 + k_4$ and $Q = k_1^2 + k_2^2 + k_3^2 + k_4^2$; the two spheres tangent to all four have $k_5 = \dfrac{S}{2} \pm \dfrac{\sqrt3}{2}\sqrt{S^2 - 2Q}$
- in $n$ dimensions, $\alt{\left(\sum_{i=1}^{n+2}k_i\right)^2 = n\sum_{i=1}^{n+2}k_i^2}{(k_1 + \cdots + k_{n+2})^2 = n(k_1^2 + \cdots + k_{n+2}^2)}$, the Soddy–Gosset relation

## Conditions
A sphere enclosing the others has negative curvature, and a plane has curvature $0$. The circle theorem is the case $n = 2$ and this is $n = 3$.

## Why it works
Quoted, not proved here. It is the $n = 3$ case of the Soddy–Gosset relation: in $n$ dimensions, $n + 2$ mutually tangent spheres have curvatures obeying that quadratic, and the Descartes Circle Theorem is the $n = 2$ instance. A complete proof for every dimension, by writing each sphere as a vector and tangency as a fixed value of a quadratic form, is in J. C. Lagarias, C. L. Mallows and A. R. Wilks, "Beyond the Descartes Circle Theorem", American Mathematical Monthly 109 (2002), 338–361.

## Useful observations
- The two roots for the fifth sphere are the small sphere in the central gap and the large sphere enclosing the rest, which has negative curvature.
- Sign conventions match the two-dimensional case, so the same bookkeeping applies.

## Applications
The sphere in the gap of four mutually tangent spheres, and curvature relations among tangent spheres and planes.

## Contest profile
Rare. It appears in problems that are structurally the three-dimensional versions of the circle-packing setups.
`,

"brianchon-theorem": String.raw`
## Key forms
- if a hexagon $ABCDEF$ is circumscribed about a conic, with every side tangent to it, then its three main diagonals $AD$, $BE$, $CF$ meet at one point
- the dual of Pascal's Theorem: swap point and line, and collinear and concurrent

## Conditions
Every side of the hexagon is tangent to the same conic. Letting adjacent tangency points merge gives the statements for circumscribed pentagons and quadrilaterals.

## Why it works
It is the projective dual of Pascal's Theorem: replace "point on the conic" by "tangent line" and "collinear" by "concurrent", and Pascal's collinearity becomes Brianchon's concurrency. Any proof of Pascal dualizes into a proof of Brianchon.

## Useful observations
- Merging adjacent tangency points degenerates it to concurrency in tangential pentagons and quadrilaterals.
- The Gergonne point of a triangle comes out of it, from the incircle's three touch points.
- A figure in which everything is tangent to one circle is the cue that this concurrency may replace a [[cevas-theorem|Ceva]] computation.

## Applications
Concurrency of the diagonals of a circumscribed hexagon, and tangential-polygon concurrencies.

## Contest profile
An olympiad tool for tangential-polygon concurrencies, where the hypothesis is that all sides touch one circle or conic.
`,

"desargues-theorem": String.raw`
## Key forms
- triangles $ABC$ and $A'B'C'$ are perspective from a point when $AA'$, $BB'$, $CC'$ concur
- they are perspective from a line when $AB \cap A'B'$, $BC \cap B'C'$, $CA \cap C'A'$ are collinear, and that line is the axis of perspectivity
- Desargues: either condition implies the other

## Conditions
The two triangles are in the plane (or in space) with corresponding vertices $A, A'$, $B, B'$, $C, C'$ distinct. The statement is projective: no lengths or angles are involved.

## Why it works
Lift to space. Two triangles perspective from a point lie in two planes that meet in a line, and each pair of corresponding sides meets on that line, which is the axis of perspectivity. Projecting the spatial picture back to the plane proves the planar theorem, and since the statement is self-dual the converse is automatic.

## Useful observations
- A concurrency can be traded for a collinearity and back.
- Once three lines are known to concur, the theorem produces the collinear axis, and its converse produces the center when the axis is known.

## Applications
Proving three points collinear from three concurrent lines, and concurrency from a collinear axis.

## Contest profile
Core projective-geometry material at the olympiad level, used whenever a center of perspectivity or an axis is part of the figure.
`,

"cross-ratio": String.raw`
## Key forms
- $(A, B; C, D) = \dfrac{AC \cdot BD}{BC \cdot AD}$ — for four collinear points, with signed lengths: the quotient of the two ratios $\frac{AC}{BC}$ and $\frac{AD}{BD}$
- $\dfrac{\sin\angle(a, c)\,\sin\angle(b, d)}{\sin\angle(b, c)\,\sin\angle(a, d)}$ — the same number for four concurrent lines $a, b, c, d$, measured by the angles between them
- $\dfrac{(a - c)(b - d)}{(b - c)(a - d)}$ for complex numbers, which is real exactly when the four points are concyclic or collinear
- $(A, B; C, D) = -1$ — the harmonic case, where $C$ and $D$ divide $AB$ internally and externally in the same ratio
- the six rearrangements of the four points give the values $\lambda,\ \frac1\lambda,\ 1 - \lambda,\ \frac{1}{1-\lambda},\ \frac{\lambda - 1}{\lambda},\ \frac{\lambda}{\lambda - 1}$

## Conditions
The four points are distinct and collinear, or lie on a circle, or are the intersections of four concurrent lines with a fifth line. Lengths are signed, so the sign of $\lambda$ says whether the pair $C, D$ separates the pair $A, B$: it is negative exactly when it does.

## Why it works
A projection from a point $P$ cannot change the cross-ratio, because each length is expressed through angles at $P$ and the rest cancels.

Let $h$ be the distance from $P$ to the line. The triangle $PAC$ has area $\frac12 h \cdot AC = \frac12 PA \cdot PC \sin\angle APC$, so $AC = \frac{PA \cdot PC \sin\angle APC}{h}$, and the same holds for $BD$, $BC$, and $AD$. In the quotient $\frac{AC \cdot BD}{BC \cdot AD}$ each of $PA$, $PB$, $PC$, $PD$ appears once above and once below, and $h$ twice above and twice below. What remains is $$\frac{\sin\angle APC\,\sin\angle BPD}{\sin\angle BPC\,\sin\angle APD},$$ which depends only on the four lines through $P$, so every line cutting them gives the same value.

## Useful observations
- The method is to compute the cross-ratio where it is easy, on a line or a circle, and then project into the hard configuration, where it must match. Equating two cross-ratios solves for an unknown length or proves a coincidence.
- With $D$ at infinity the cross-ratio reduces to $\frac{AC}{BC}$, so it is $-1$ exactly when $C$ is the midpoint of $AB$, and the harmonic case is the general version of a midpoint paired with the point at infinity. Four lines through a point with this value form a [[harmonic-bundle|harmonic bundle]].
- The same number for four concyclic points seen from a fifth point of the circle lets circle problems borrow line arguments.

## Applications
Collinear points related by projection, harmonic conjugates, concurrent lines, and proofs that two quadruples of points correspond.

## Contest profile
The backbone of projective olympiad problems and of "moving points" and projective-map methods; one invariance argument often replaces pages of similar-triangle chasing.
`,

"harmonic-bundle": String.raw`
## Key forms
- $(A, B;\, C, D) = -1 \iff \dfrac{AC}{CB} = \dfrac{AD}{DB}$ in unsigned lengths, with one of $C, D$ inside segment $AB$ and the other outside
- $MA^2 = MC \cdot MD$, where $M$ is the midpoint of $AB$, if and only if $(A, B; C, D) = -1$ — the midpoint criterion
- the value $-1$ is unchanged when $C$ and $D$ are swapped, or when $A$ and $B$ are swapped

## Conditions
$C$ and $D$ are distinct points on line $AB$, other than $A$ and $B$. A harmonic range projected from any point gives four concurrent lines called a harmonic bundle.

## Why it works
The relation $(A, B; C, D) = -1$ says $C$ and $D$ divide $AB$ internally and externally in the same ratio $\frac{AC}{CB} = \frac{AD}{DB}$; the minus sign is exactly the record that one division is internal and the other external. Swapping $C$ and $D$ turns the ratio into its reciprocal, and so does swapping $A$ and $B$; $-1$ is its own reciprocal, so both swaps keep it.

For the midpoint criterion, put coordinates on the line with $M = 0$, $A = -1$, $B = 1$, $C = c$, $D = d$. The harmonic condition in signed form is
$$\frac{c + 1}{1 - c} = -\frac{d + 1}{1 - d},$$
which expands to $1 + c - d - cd = -1 + c - d + cd$, that is $cd = 1$. This says $C$ and $D$ are on the same side of $M$ with $MC \cdot MD = 1 = MA^2$, and every step reverses.

## Useful observations
- Harmonic bundles sit at fixed spots: two tangents plus a secant from an external point cut the polar harmonically; the internal and external bisectors from a vertex meet the opposite line at harmonic conjugates; a complete quadrilateral's diagonal is cut harmonically.
- Recognizing $-1$ makes pole-polar and projection machinery available.
- The midpoint criterion turns a harmonic condition into a single product equation.

## Applications
Harmonic conjugates, tangent-and-secant configurations, bisector configurations, and "show this bundle is harmonic" intermediate goals.

## Contest profile
Everywhere in olympiad projective configurations, especially pole-polar and Apollonius-circle problems; "show this bundle is harmonic" is a standard intermediate goal.
`,

"inversion-properties": String.raw`
## When to use
Chains of circles tangent to two given circles, configurations with several circles through one point, the arbelos and its inscribed circles, and identities that look like Ptolemy's Theorem or Casey's Theorem. The tell is a point where many circles meet or touch; inverting there straightens them into lines. A figure with no point where circles meet or touch gains nothing from inversion.

## How
1. Choose the center $O$ at the busiest point, usually a point of tangency or a common point of several circles.
2. Choose a convenient radius $r$, often one that makes a given circle map to itself or a distance come out whole.
3. Map the figure: circles through $O$ become lines perpendicular to the line from $O$ to their centers, lines through $O$ stay put, and other circles become circles. Tangency is preserved.
4. Solve the new picture, then convert back, using $OP \cdot OP^* = r^2$ for distances from $O$ and $P^*Q^* = \frac{r^2 \cdot PQ}{OP \cdot OQ}$ for other lengths.

Two circles are tangent internally at $O$, with diameters $6$ and $4$ along the same ray. Inverting at $O$ with $r^2 = 12$ sends them to parallel lines at distances $2$ and $3$ from $O$, and the chain of circles tangent to both becomes a row of circles of diameter $1$ between the lines. The image circle centered at distance $\sqrt{7.25}$ with radius $\frac12$ inverts back to a circle of radius $\frac{12 \cdot \frac12}{7.25 - 0.25} = \frac67$.

## Why it works
Inversion sends $P$ to the point $P^*$ on ray $OP$ with $OP \cdot OP^* = r^2$. For two points $P$ and $Q$, this gives $\frac{OP^*}{OQ} = \frac{OQ^*}{OP}$, so triangles $OPQ$ and $OQ^*P^*$ are similar, which yields the distance formula $P^*Q^* = \frac{r^2 \cdot PQ}{OP \cdot OQ}$.

A line not through $O$ has a nearest point $H$; for any point $X$ on it, the similar triangles show that $\angle OX^*H^* = 90^\circ$, so the images lie on the circle with diameter $OH^*$, a circle through $O$. Running this backward turns circles through $O$ into lines. Inversion also preserves angles between curves, so tangent curves stay tangent, and the whole configuration of contacts survives the map.

## Formulas it uses
- [[inversion-facts]]: the images of lines and circles and the distance formula, the dictionary for every inversion.
- [[power-of-a-point]]: a circle not through $O$ maps to itself when $r^2$ equals the power of $O$ with respect to it.
- [[tangent-circles]]: in the simplified picture, tangent circles have center distance equal to the sum or difference of radii.

## Common traps
- Mapping the center of a circle to the center of its image; the image of the center is not the center of the image circle.
- Forgetting that a circle through $O$ becomes a line, not a circle.
- Choosing the center at a point that lies on few circles, which makes the picture harder, not easier.

## Contest profile
An olympiad method, occasionally behind a hard AIME problem on tangent circles; in contest work its main use is chains of circles and Ptolemy-type length identities.
`,

"complete-quadrilateral-miquel": String.raw`
## Key forms
- four lines in general position make six intersection points and four triangles, one for each choice of three lines
- the circumcircles of those four triangles all pass through one point $M$, the Miquel point
- $M$ is the center of the [[spiral-similarity|spiral similarity]] carrying one pair of opposite sides onto the other

## Conditions
The four lines are in general position, with no two parallel and no three concurrent.

## Why it works
Repeated use of the Miquel-point lemma forces the four circumcircles through one common point $M$. Equivalently, $M$ is the center of the spiral similarity carrying one pair of opposite sides onto the other.

## Useful observations
- The Miquel point is the second intersection of any two of the four circumcircles, and it is often the hidden center behind a concyclicity or a spiral-similarity claim.
- The three diagonal midpoints of the figure are collinear, on the [[newtons-line|Newton–Gauss line]].
- The four circumcenters together with $M$ lie on one circle.
- It is the four-line cousin of the triangle statement in [[miquels-theorem|Miquel's Theorem]], where the points are chosen on the sides of one triangle.

## Applications
Concyclicity and spiral-similarity statements in figures with four lines, and locating the common point of four circumcircles.

## Contest profile
A staple olympiad configuration, where recognizing a complete quadrilateral and naming its Miquel point is the decisive first step.
`,

"ngon-vertex-distance-product": String.raw`
## Key forms
- $\alt{\prod_{k=1}^{n} PV_k}{PV_1 PV_2 \cdots PV_n} = 2R^n\left|\sin\frac{n\theta}{2}\right|$ — the product of the distances from a point $P$ on the circumcircle of a regular $n$-gon to its vertices, with $\theta$ the angle of $P$ measured from one vertex
- $\le 2R^n$ — the maximum, reached when $P$ is the midpoint of an arc between two adjacent vertices
- $0$ — the value when $P$ is a vertex
- $nR^{n-1}$ — a different statement: the product of the distances from one fixed vertex to the other $n - 1$ vertices

## Conditions
$P$ lies on the circumcircle of radius $R$ of a regular $n$-gon.

## Why it works
Place the vertices at $R\zeta^k$ with $\zeta = e^{2\pi i/n}$ and the point at $P = Re^{i\theta}$. Since $\prod_k (z - \zeta^k) = z^n - 1$, the product of the $n$ distances is $R^n\,|z^n - 1|$. Writing $z = e^{i\theta}$ and using $|e^{i\phi} - 1| = 2\left|\sin\frac\phi2\right|$ gives $R^n \cdot 2\left|\sin\frac{n\theta}{2}\right|$.

## Useful observations
- The extremes are read straight off the sine: it is $0$ at a vertex and equal to $1$ when $\frac{n\theta}{2}$ is an odd multiple of $\frac\pi2$.
- The fixed-vertex product $nR^{n-1}$ is the value of the derivative of $z^n - 1$ at a root, a separate computation that should not be confused with this one.

## Applications
Products of distances from a point on a circle to the vertices of a regular polygon, and the extremes of such products.

## Contest profile
A roots-of-unity technique for AIME and olympiad problems about products of distances to the vertices; turning the geometry into $z^n - 1$ is the whole step.
`

});

Object.assign(window.MATH_DETAILS, {

"max-rectangle-in-triangle": String.raw`
## Key forms
- $A^{\max}_{\text{rectangle}} = \frac12[\triangle]$ — the largest rectangle inscribed in a triangle with one side on a chosen base has half the triangle's area
- width $\frac b2$ and height $\frac h2$ — its top edge lies on the midline, and it spans the midsegment
- $A(t) = bh\,t(1 - t)$ — the area of the rectangle whose top edge is a fraction $t$ of the way up to the apex

## Conditions
One side of the rectangle lies on a side of the triangle chosen as the base, and the other two corners lie on the other two sides. The ratio one half is the same for every choice of base.

## Why it works
Slide a rectangle up from the base: at a fraction $t$ of the way to the apex the triangle's width has shrunk to $(1 - t)b$, so the rectangle's area is $(th)\,(1 - t)b = bh\,t(1 - t)$. That is largest at $t = \frac12$, giving $\frac{bh}{4} = \frac12[\triangle]$, because $t(1 - t) = \frac14 - \left(t - \frac12\right)^2$.

## Useful observations
- The same $t(1 - t)$ maximization handles a rectangle inscribed under any straight slanted boundary.
- When a corner of the triangle is a right angle and the rectangle shares it, the same count applies: the rectangle's two free corners lie on the hypotenuse, and its area is again at most half the triangle's.
- For the dimensions, the top edge sits on the midline, the segment joining the midpoints of the two slanted sides.

## Applications
Largest rectangles inscribed in triangles, and the largest area under a straight slanted line.

## Contest profile
A recurring AMC and early AIME optimization one-liner; knowing the maximum is exactly half the area, and where the rectangle sits, skips the calculus.
`,

"triangle-sin2-sum-ratio": String.raw`
## Key forms
- $\dfrac{\sin 2A + \sin 2B + \sin 2C}{\sin A + \sin B + \sin C} = \dfrac{2r}{R}$ — the ratio depends only on the radii
- $\sin 2A + \sin 2B + \sin 2C = 4\sin A\sin B\sin C = \dfrac{2[ABC]}{R^2}$ — the numerator
- $\sin A + \sin B + \sin C = \dfrac sR = 4\cos\frac A2\cos\frac B2\cos\frac C2$ — the denominator

## Conditions
$A$, $B$, $C$ are the angles of a triangle, with inradius $r$, circumradius $R$, and semiperimeter $s$.

## Why it works
For the numerator, sum-to-product gives $\sin 2A + \sin 2B = 2\sin(A + B)\cos(A - B) = 2\sin C\cos(A - B)$, and $\sin 2C = 2\sin C\cos C = -2\sin C\cos(A + B)$. Adding, $$2\sin C\bigl[\cos(A - B) - \cos(A + B)\bigr] = 4\sin A\sin B\sin C.$$ With $\sin A = \frac{a}{2R}$ this is $\frac{abc}{2R^3}$, and $abc = 4R[ABC]$ turns it into $\frac{2[ABC]}{R^2}$.

For the denominator, $\sin A + \sin B + \sin C = \frac{a + b + c}{2R} = \frac sR$.

The quotient is therefore $\frac{2[ABC]/R^2}{s/R} = \frac{2[ABC]}{Rs}$, and $[ABC] = rs$ makes it $\frac{2r}{R}$.

## Useful observations
- Because $\frac rR \le \frac12$, the ratio is at most $1$, with equality only for the equilateral triangle.
- Read backwards, a known ratio pins down $\frac rR$.
- The two factorizations are useful by themselves: each shows up in problems that never mention the quotient.

## Applications
Expressions that mix $\sin 2A$ terms with $\sin A$ terms in the same triangle, and values of $\frac rR$.

## Contest profile
Seldom the statement of a problem and often its last step: a computation that ends in this quotient is finished by replacing it with twice the ratio of the inradius to the circumradius. It appears mostly at AIME level and above.
`,

"half-angle-tangent-identity": String.raw`
## Key forms
- $\tan\frac A2\tan\frac B2 + \tan\frac B2\tan\frac C2 + \tan\frac C2\tan\frac A2 = 1$ — for the angles of a triangle
- $\tan\frac A2 = \dfrac{r}{s - a}$ — each half-angle tangent in terms of the inradius and a tangent length
- $r^2s = (s - a)(s - b)(s - c)$ — the identity rewritten in $r$ and $s$

## Conditions
$A + B + C = 180^\circ$ with each angle positive, so every half-angle is acute and every tangent is positive. In the form with $r$ and $s$, the angles are those of a triangle with inradius $r$ and semiperimeter $s$.

## Why it works
The half-angles sum to $90^\circ$, so $\frac{A + B}{2}$ and $\frac C2$ are complementary and $\tan\frac{A + B}{2} = \cot\frac C2$. Expanding the left side with the tangent addition formula and clearing denominators gives exactly the symmetric relation. Nothing about triangles is used beyond the angle sum.

Substituting $\tan\frac A2 = \frac{r}{s - a}$ turns it into $$r^2\left[\frac{1}{(s - a)(s - b)} + \frac{1}{(s - b)(s - c)} + \frac{1}{(s - c)(s - a)}\right] = 1.$$ The three fractions have the common denominator $(s - a)(s - b)(s - c)$ and numerators summing to $s$, so $r^2s = (s - a)(s - b)(s - c)$, which is [[herons-formula|Heron's Formula]] in disguise.

## Useful observations
- It is the half-angle analogue of $\tan A + \tan B + \tan C = \tan A\tan B\tan C$.
- Three positive numbers $x, y, z$ with $xy + yz + zx = 1$ are exactly the half-angle tangents of some triangle, so $x = \tan\frac A2$ parametrizes triangles in olympiad substitutions.
- As a constraint, it supplies the third half-angle tangent from the other two.

## Applications
Eliminating the angles from a problem stated in $r$ and $s$, and triangle inequalities written with half-angle tangents.

## Contest profile
Appears at AIME level in problems that mix the incircle with trigonometry, and in olympiad substitutions.
`,

"line-forms": String.raw`
## Key forms
- $y = mx + b$ — slope-intercept: slope $m$ and $y$-intercept $b$
- $y - y_1 = m(x - x_1)$ — point-slope: a point and the slope
- $Ax + By = C$ — standard form: slope $-\dfrac AB$, with $(A, B)$ perpendicular to the line
- $\dfrac xa + \dfrac yb = 1$ — intercept form: the $x$-intercept $a$ and the $y$-intercept $b$

## Conditions
The first three need the line not to be vertical (slope-intercept and point-slope) and intercept form needs both intercepts nonzero. A vertical line is $x = k$ and only standard form writes it.

## Why it works
All four forms say the same thing: the slope between any point $(x, y)$ of the line and one known point is constant.

With a known point $(x_1, y_1)$ and slope $m$, the condition $\frac{y - y_1}{x - x_1} = m$ with the denominator cleared is point-slope form. Expanding it gives slope-intercept form, collecting terms gives standard form, and dividing standard form by $C$, when $C \ne 0$, gives intercept form.

In standard form the coefficients carry the geometry. For two points of the line, subtracting their equations gives $A\,\Delta x + B\,\Delta y = 0$, so $(A, B)$ is perpendicular to every direction along the line, and $(B, -A)$ points along it.

{{figure:normal}}

## Useful observations
- The form is matched to the data: a slope and a point give point-slope at once; two points give the slope first; two intercepts give intercept form directly, and the triangle it cuts off with the axes has area $\frac{|ab|}{2}$.
- Standard form with integer, coprime coefficients is the one for number theory, since counting the lattice points on a line becomes a linear Diophantine equation.
- Its normal vector feeds the [[point-line-distance|point-to-line distance]] and reflection formulas.
- Parallel lines share the slope, so they share $(A, B)$ up to a scale and differ only in $C$.

## Applications
Equations of lines from slopes, points, and intercepts, intercept triangles, and lattice points on a line.

## Contest profile
Bedrock at MATHCOUNTS and AMC 10, where converting between forms is usually the real skill being tested; on harder problems a line is described through [[complex-basics|complex numbers]] or its normal.
`,

"plane-intercept-form": String.raw`
## Key forms
- $\dfrac xa + \dfrac yb + \dfrac zc = 1$ — the plane meeting the axes at $(a, 0, 0)$, $(0, b, 0)$, and $(0, 0, c)$, for nonzero intercepts
- $bc\,x + ca\,y + ab\,z = abc$ — the standard form, with normal vector $(bc, ca, ab)$
- $\dfrac{abc}{6}$ — the volume of the tetrahedron the plane cuts from the first octant
- $\dfrac{abc}{\sqrt{a^2b^2 + b^2c^2 + c^2a^2}}$ — the distance from the origin to the plane

## Conditions
All three intercepts exist and are nonzero. The form fails for a plane through the origin or parallel to an axis, since then an intercept is $0$ or does not exist.

## Why it works
Each intercept satisfies the equation, and three points that are not on one line determine a plane.

Substituting $(a, 0, 0)$ gives $\frac aa + 0 + 0 = 1$, and the same happens at the other two intercepts. The equation is linear, so it describes a plane, and three non-collinear points fix exactly one plane, so this is the plane through the intercepts, shown in the figure at the top. It is the three-dimensional copy of the intercept form of a line, $\frac xa + \frac yb = 1$.

## Useful observations
- When a problem names where a plane crosses the axes, the intercept form is written straight down instead of solving for $Ax + By + Cz = D$. The normal vector $(bc, ca, ab)$ gives the angle between two planes or the [[point-plane-distance|distance from a point]].
- Going the other way, a plane $Ax + By + Cz = D$ with $D \ne 0$ has intercepts $\frac DA$, $\frac DB$, and $\frac DC$: divide through by $D$.
- The tetrahedron cut from the first octant has three perpendicular edges $a$, $b$, $c$ at the origin, so its volume is $\frac{abc}{6}$, which turns many "a plane slices off a corner" questions into one multiplication.

## Applications
Cutting planes, corner slices, distances from the origin to a plane, and planes through three given axis points.

## Contest profile
Three problems here, all AIME, none solved by it alone, and all three set up [[coordinate-bash|coordinates]] first. The usual shape asks for the plane through three given points on the edges of a cube or a pyramid and then the cross-section it cuts. For the area of a corner's cut face, [[de-guas-theorem|De Gua's Theorem]] pairs with it.
`,

"harmonic-quadrilateral": String.raw`
## Key forms
- the tangents at $B$ and $C$ to the circumcircle meet at the pole $X$ of $BC$, and $AX$ is the $A$-symmedian
- $\dfrac{BD}{CD} = \dfrac{AB}{AC}$, equivalently $AB \cdot CD = AC \cdot BD$ — the harmonic condition for the quadrilateral $ABDC$, where $D$ is the second intersection of $AX$ with the circle
- $\dfrac{BE}{CE} = \left(\dfrac{AB}{AC}\right)^2$ where $E = AD \cap BC$ — the same statement read on the side
- $XB = XC$ and $XB^2 = XA \cdot XD$ — equal tangent lengths plus power of a point, which together give the similar triangles $\triangle XBA \sim \triangle XDB$ and $\triangle XCA \sim \triangle XDC$

## Conditions
$ABC$ is a triangle with circumcircle $\omega$, and the tangents at $B$ and $C$ are not parallel. Every step is reversible, so either proportion is a test for the symmedian and not just a consequence of it.

## Why it works
Let the tangents at $B$ and $C$ meet at $X$, let $AX$ meet the circumcircle again at $D$, and let $E = AD \cap BC$. Tangent lengths from a common point are equal, so $XB = XC$.

The power of $X$ with respect to the circle is $XB^2$, and the line through $X$, $A$, $D$ gives that same power as $XA \cdot XD$. Hence $XB^2 = XA \cdot XD$, which rearranges to $\frac{XB}{XA} = \frac{XD}{XB}$. Triangles $XBA$ and $XDB$ share the angle at $X$ and have their adjacent sides in that proportion, so they are similar. The same argument at $C$ gives $\triangle XCA \sim \triangle XDC$.

Read the ratios off the similarities: $\frac{AB}{BD} = \frac{XA}{XB}$ and $\frac{AC}{CD} = \frac{XA}{XC}$. Since $XB = XC$, the right sides are equal, so $\frac{AB}{BD} = \frac{AC}{CD}$, that is $AB \cdot CD = AC \cdot BD$. A cyclic quadrilateral satisfying this is called harmonic.

For the side ratio, triangles $ABE$ and $ACE$ share the apex $A$, so $\frac{BE}{CE} = \frac{[ABE]}{[ACE]} = \frac{AB \cdot AE\sin\angle BAE}{AC \cdot AE\sin\angle CAE}$. The inscribed angles $\angle BAD$ and $\angle CAD$ subtend $BD$ and $CD$, so their sines are in the ratio $\frac{BD}{CD} = \frac{AB}{AC}$, and substituting gives $\frac{BE}{CE} = \left(\frac{AB}{AC}\right)^2$, the [[symmedian-lemoine|symmedian's]] defining split.

## Useful observations
- The tangents are the trigger. Whenever a problem draws the tangents to the circumcircle at two vertices and takes a line from the third, that line is a symmedian, and everything above becomes available without further work. A problem will draw the tangents and never say the word symmedian.
- The form is chosen to match the question: a length on the circle uses $\frac{BD}{CD} = \frac{AB}{AC}$, a length on $BC$ uses $\frac{BE}{CE} = \left(\frac{AB}{AC}\right)^2$, and $AE$ or $AD$ themselves come from the similar triangles directly, or from the power of the point $E$, since $BE \cdot EC = AE \cdot ED$.
- Running it backwards is the olympiad use: to prove a given line is a symmedian, it suffices to prove the quadrilateral it cuts is harmonic, which is often easier than chasing the reflection over the bisector.

## Applications
Ratios on a circumcircle and on the side from tangents and a symmedian, harmonic quadrilaterals, and proofs that a line is a symmedian.

## Contest profile
A recurring AIME configuration has the tangents at $B$ and $C$ meeting at a point, and a line from $A$ through that point crossing the circle again. Even without the name, power of a point plus these similar triangles recovers everything. At olympiad level the harmonic form is the more common one, usually as a step toward a projective or inversive finish.
`,

"lemoine-point": String.raw`
## Key forms
- $K = (a^2 : b^2 : c^2)$ in [[barycentric-coordinates|barycentric coordinates]] — the compact form that encodes every property below
- $d_a : d_b : d_c = a : b : c$ — its distances to the three sides are proportional to those sides, since each symmedian is the locus of a fixed distance ratio
- $K$ minimizes $d_a^2 + d_b^2 + d_c^2$ over the whole plane
- $K$ is the centroid of its own pedal triangle, the cleanest proof of that minimization
- $K$ is the isogonal conjugate of the centroid $G$

## Conditions
The three symmedians of a triangle concur at $K$. In an equilateral triangle $K$ coincides with the centroid, and in a right triangle it is the midpoint of the altitude to the hypotenuse.

## Why it works
Each symmedian is the locus of points whose distances to the two sides at its vertex are in the ratio of those sides. The $A$-symmedian gives $\frac{d_c}{d_b} = \frac cb$, the $B$-symmedian gives $\frac{d_a}{d_c} = \frac ac$, and the third is then forced. A point on all three therefore has $d_a : d_b : d_c = a : b : c$. The three loci are the reflections of the three medians in the three bisectors, so they concur exactly because the medians do.

The minimization follows from the pedal triangle. If $P$ has pedal triangle $P_aP_bP_c$, then $a\,d_a + b\,d_b + c\,d_c = 2[ABC]$ is constant, so minimizing $d_a^2 + d_b^2 + d_c^2$ under a fixed weighted sum forces the $d_i$ proportional to the weights $a, b, c$ by Cauchy–Schwarz, with equality exactly at $K$.

## Useful observations
- The barycentric coordinates come first: $(a^2 : b^2 : c^2)$ makes any incidence or ratio question about $K$ a short computation, and it is how the point is usually identified in a configuration that never names it.
- The distance property is the one to recognize in disguise. A problem asking for the point minimizing the sum of squared distances to the three sides, or describing a point whose distances to the sides are proportional to the sides, is describing $K$ whether or not it says so.
- $K$ and $G$ swap under isogonal conjugation, as the incenter with itself and the circumcenter with the orthocenter do, and a problem that pairs a median fact with a symmedian fact is usually asking for that to be noticed.

## Applications
Concurrency of the symmedians, minimizing the sum of squared distances to the sides, and barycentric computations with the symmedian point.

## Contest profile
Rare, and almost always olympiad rather than AIME. It appears either as the concurrency point in a configuration full of symmedians, or as the answer to a minimization phrased in terms of distances to the sides. In both cases the barycentric coordinates are the shortest route.
`,

"spieker-point": String.raw`
## Key forms
- $S = (b + c : c + a : a + b)$ in barycentric coordinates: the incenter of the medial triangle, and the center of mass of the three sides taken as uniform rods
- the Spieker circle, the incircle of the medial triangle, has radius $\dfrac r2$
- $I$, $G$, $S$, and the Nagel point $N$ lie on one line, the Nagel line, with $S$ the midpoint of $IN$ and $IG : GN = 1 : 2$

## Conditions
The triangle is not equilateral, since otherwise $I$, $G$, $S$, and $N$ are one point and there is no line. The Spieker point equals the centroid $G$ only when $a = b = c$.

## Why it works
Let $M_a$, $M_b$, $M_c$ be the midpoints of the sides. The proof uses vectors, with each point written as a weighted average of $A$, $B$, $C$.

Step 1, the formula. The medial triangle $M_aM_bM_c$ has sides $M_bM_c = \frac a2$, $M_cM_a = \frac b2$, $M_aM_b = \frac c2$. The incenter of a triangle is the average of its vertices weighted by the opposite sides, so $$S = \frac{aM_a + bM_b + cM_c}{a + b + c} = \frac{(b + c)A + (c + a)B + (a + b)C}{2(a + b + c)},$$ using $M_a = \frac{B + C}{2}$ and its partners.

Step 2, the perimeter. A uniform rod along side $BC$ has mass proportional to $a$ and its center at $M_a$, so the three rods balance at $\frac{aM_a + bM_b + cM_c}{a + b + c}$, the same expression. The area, by contrast, balances at $G$, whose three weights are equal; the weights $b + c$, $c + a$, $a + b$ are equal only when $a = b = c$.

Step 3, the radius. The medial triangle is the image of $ABC$ under the [[homothety-monge|homothety]] with center $G$ and ratio $-\frac12$. It halves all lengths, so its inradius is $\frac r2$, and it carries $I$ to the incenter of the image: $$S = G - \tfrac12(I - G) = \frac{3G - I}{2}.$$

Step 4, the Nagel line. The Nagel point is $N = \frac{(s - a)A + (s - b)B + (s - c)C}{s}$, and $$3G - 2I = (A + B + C) - \frac{aA + bB + cC}{s} = N.$$ So $S = \frac{3G - I}{2} = \frac{I + N}{2}$ is the midpoint of $IN$, and $N - I = 3(G - I)$ puts $G$ on that line with $IG : GN = 1 : 2$.

## Useful observations
- A question about the incircle of the medial triangle, or about balancing the perimeter instead of the region, is about $S$ whether or not it uses the name.
- The Nagel line and the [[euler-line-ratio|Euler line]] both have $G$ cutting a segment $1 : 2$, and are easy to confuse: the Euler line carries $O$, $G$, $H$, and the Nagel line carries $I$, $G$, $S$, $N$.
- With the barycentric form, ratio and collinearity questions about $S$ become coordinate computations.

## Applications
Facts about the incircle of the medial triangle, the perimeter's center of mass, and collinearity or ratios along the Nagel line.

## Contest profile
Uncommon, and usually olympiad-level: a configuration that hands you the medial triangle's incircle without naming it. The radius $\frac r2$ and the midpoint-of-$IN$ relation are the facts most likely to be used.
`,

"mobius-transformations": String.raw`
## Key forms
- $f(z) = \dfrac{az + b}{cz + d}$ with $ad - bc \ne 0$ is a Möbius transformation of the extended complex plane
- it sends lines and circles to lines and circles, preserves angles, and preserves the cross-ratio
- three distinct points can be sent to any three distinct points in exactly one way
- $c = 0$ gives the affine maps $z \mapsto \alpha z + \beta$

## Conditions
$ad - bc \ne 0$, so the map does not collapse to a constant. Scaling $a, b, c, d$ by a common factor changes nothing, which is why the maps correspond to matrices only up to scale.

## Why it works
Long division gives, for $c \ne 0$, a composition of $z \mapsto cz + d$, then $w \mapsto \frac1w$, then $u \mapsto \frac ac + \frac{bc - ad}{c}u$. Each of these four sends lines and circles to lines and circles, once a line is regarded as a circle through $\infty$, so the composition does too. They all preserve angles, which gives conformality.

If $ad = bc$ the numerator is a multiple of the denominator and $f$ is constant. Composing maps is multiplying the matrices $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$.

## Useful observations
- The three-point property is the working tool: send three convenient points to $0$, $1$, and $\infty$, which is exactly the cross-ratio.
- Sending a circle to a line straightens a configuration, and sending two disjoint circles to concentric ones turns a chain of tangencies into a rotation.
- Fixed points come from $f(z) = z$, a quadratic, so a map other than the identity has one or two.
- Inversion in a circle is not itself a Möbius map, since it reverses angles, but inversion followed by conjugation is.

## Applications
Normalizing figures of circles and tangencies, and cross-ratio and Steiner-chain problems.

## Contest profile
Essentially never needed below the olympiad level, and even there a structural tool rather than a computational one. It appears when a problem is really about circles and tangency.
`,


"reflection-composition": String.raw`
## Key forms
- two mirrors meeting at angle $\theta$: reflecting in $\ell_1$ and then $\ell_2$ is a rotation by $2\theta$ about $\ell_1 \cap \ell_2$
- parallel mirrors at distance $d$: the composite is a translation by $2d$, perpendicular to the mirrors
- an even number of reflections is a rotation or a translation, and an odd number is a reflection or a glide
- the order matters: composing the other way rotates by $-2\theta$

## Conditions
The angle $\theta$ is the directed angle from $\ell_1$ to $\ell_2$. Two coincident mirrors compose to the identity.

## Why it works
Track directions. Reflecting a line at angle $\alpha$ in a mirror at angle $\mu$ sends it to $2\mu - \alpha$, so reflecting in $\ell_1$ and then $\ell_2$ sends $\alpha$ to $2\mu_2 - (2\mu_1 - \alpha) = \alpha + 2(\mu_2 - \mu_1)$.

Every direction therefore turns by the same $2\theta$, and the intersection point is fixed by both mirrors, so the composite can only be a rotation about it. Parallel mirrors have no fixed point: a point at signed distance $t$ from the first lands at $t + 2d$, which is a translation.

## Useful observations
- A chain of reflections collapses: a long alternating process is secretly one rotation applied over and over, and the question becomes the order of that rotation.
- It runs backwards as well. Any rotation by $2\theta$ splits into two reflections whose mirrors pass through the center at angle $\theta$, and one of the two mirrors may be chosen freely. That freedom trades an awkward rotation for a convenient mirror line.
- It is the directed angle from $\ell_1$ to $\ell_2$ that doubles, so swapping the mirrors reverses the turn.

## Applications
Iterated reflections, rotations expressed as two reflections, translations from parallel mirrors, and orders of composite transformations.

## Contest profile
Iterated-reflection problems on the AIME reduce to finding the order of the resulting rotation, turning a geometry question into a divisibility one. Related: [[reflection-coordinates|reflecting a point over a line]] gives the single-reflection formulas, and [[rotation-90|rotating a point]] handles the quarter-turn special case.
`,


"vector-projection": String.raw`
## Key forms
- $\operatorname{proj}_{\vec v}\vec u = \dfrac{\vec u \cdot \vec v}{\vec v \cdot \vec v}\,\vec v$ — the part of $\vec u$ along $\vec v$
- $\lvert\operatorname{proj}_{\vec v}\vec u\rvert = \dfrac{\lvert\vec u \cdot \vec v\rvert}{\lvert\vec v\rvert} = \lvert\vec u\rvert\lvert\cos\theta\rvert$ — its length, and $\dfrac{\vec u \cdot \vec v}{\lvert\vec v\rvert}$ is the signed shadow length
- $\vec u - \operatorname{proj}_{\vec v}\vec u$ — the part perpendicular to $\vec v$, the shortest vector from the line spanned by $\vec v$ to the tip of $\vec u$

## Conditions
$\vec v \ne \vec 0$. The scalar $\frac{\vec u \cdot \vec v}{\lvert\vec v\rvert}$ is negative when the angle is obtuse, which means the foot lies behind the tail of $\vec v$.

## Why it works
Demand that $\vec u$ split as $c\vec v$ plus something perpendicular to $\vec v$. Dotting the split with $\vec v$ kills the perpendicular piece and leaves $\vec u \cdot \vec v = c\,(\vec v \cdot \vec v)$, which is the coefficient in the formula and the only value of $c$ that can work.

Since [[vector-dot-product|the dot product]] equals $\lvert\vec u\rvert\lvert\vec v\rvert\cos\theta$, that coefficient times $\lvert\vec v\rvert$ is $\lvert\vec u\rvert\cos\theta$: the shadow $\vec u$ casts on the direction of $\vec v$.

## Useful observations
- Two payoffs. The component along a direction: a force, a displacement, or a side resolved onto an axis is this formula and nothing else. And, more useful on contests, the leftover $\vec u - \operatorname{proj}_{\vec v}\vec u$ is a distance.
- That is where the point-to-line distance and [[point-plane-distance|the point-to-plane distance]] come from, both of which are this leftover measured against a unit normal.
- A problem asking for a point on a segment rather than on a whole line needs the sign checked.

## Applications
Dropping the foot of a perpendicular in coordinates, resolving a slanted displacement onto a grid direction, and finding where a point lands on a line.

## Contest profile
It shows up as the step that had no name: a foot of a perpendicular, a slanted displacement resolved onto a grid direction, or the point where a point lands on a line are all one projection.
`,

"rotation-reflection-matrices": String.raw`
## Key forms
- $R_\theta = \begin{pmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix}$ — the counterclockwise rotation by $\theta$ about the origin
- $F_\alpha = \begin{pmatrix}\cos 2\alpha & \sin 2\alpha \\ \sin 2\alpha & -\cos 2\alpha\end{pmatrix}$ — the reflection in the line through the origin at angle $\alpha$
- $\det R_\theta = 1$ and $\det F_\alpha = -1$ — the determinant tells them apart
- $R_\alpha R_\beta = R_{\alpha + \beta}$ and $F_\beta F_\alpha = R_{2(\beta - \alpha)}$ — composing is multiplying

## Conditions
Points are written as coordinate columns and the matrices act on the left. A rotation or reflection about a center other than the origin is the same map conjugated by a translation.

## Why it works
A linear map is determined by where it sends the two basis vectors, and those images are the columns of its matrix. A rotation by $\theta$ sends $(1, 0)$ to $(\cos\theta, \sin\theta)$ and $(0, 1)$ to $(-\sin\theta, \cos\theta)$, which is $R_\theta$ read column by column; the reflection matrix comes out the same way from the images of the axes.

Because both preserve lengths and angles, their columns are perpendicular unit vectors, so [[determinant-geometric|the determinant]] has absolute value $1$, positive for a rotation and negative for a reflection, since a reflection reverses orientation.

## Useful observations
- Composing becomes multiplying, which is the whole reason to leave synthetic language. $R_\alpha R_\beta = R_{\alpha + \beta}$ recovers [[angle-addition|the angle addition formulas]] as a byproduct.
- $F_\beta F_\alpha = R_{2(\beta - \alpha)}$ is exactly the statement that [[reflection-composition|two reflections compose to a rotation]] by twice the angle between the mirrors, now as a one-line computation rather than an angle chase.
- For a rotation about a center other than the origin, the center is translated to the origin, $R_\theta$ applied, and the result translated back. The quarter-turn cases are common enough that [[rotation-90|the coordinate swaps]] are worth knowing without the matrix.

## Applications
Net effect of several transformations, rotations and reflections about the origin, and telling a rotation from a reflection by the determinant.

## Contest profile
AMC 12 and AIME rarely say "matrix," so this is a tool brought rather than one handed over. It pays when a problem composes several transformations and asks what the net effect is: multiplying two or three of these is mechanical, while chasing the same composition synthetically invites a sign error.
`,


"ellipse-properties": String.raw`
## Key forms
- $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ with $a > b$ — the ellipse centered at the origin, with semi-major axis $a$ and semi-minor axis $b$
- $PF_1 + PF_2 = 2a$ — every point has focal distances adding to $2a$, for foci $(\pm c, 0)$
- $c^2 = a^2 - b^2$ — the focal distance from the center
- $[\text{ellipse}] = \pi ab$ — the area
- $\dfrac{2b^2}{a}$ — the length of the latus rectum, the focal chord perpendicular to the major axis

## Conditions
Foci on the $x$-axis when the larger denominator is under $x^2$. If the $y^2$ denominator is larger, the foci sit on the $y$-axis and every formula transposes.

## Why it works
Put the foci at $(\pm c, 0)$ and impose $PF_1 + PF_2 = 2a$. Clearing the two radicals leaves $\frac{x^2}{a^2} + \frac{y^2}{a^2 - c^2} = 1$, so writing $b^2 = a^2 - c^2$ produces the standard form and the relation $a^2 = b^2 + c^2$ at the same time. The fastest way to see that relation without algebra is to stand at the end of the minor axis: both focal distances are equal, so each is $a$, and the right triangle with legs $b$ and $c$ has hypotenuse $a$.

The latus rectum has length $\frac{2b^2}{a}$: at $x = c$ the equation gives $\frac{y^2}{b^2} = 1 - \frac{c^2}{a^2} = \frac{b^2}{a^2}$, so $y = \pm\frac{b^2}{a}$. The [[focal-radii|focal radii]] give the same length from a different direction.

The area $\pi ab$ is the circle's $\pi r^2$ with the two radii separated, which is what an affine stretch of a circle does to it.

## Useful observations
- Contests state the condition in whichever of the languages of $a$, $b$, $c$ is least convenient, so converting at once is the first job: a constant sum of distances to two fixed points is $2a$ with the foci given; a stated equation gives $a$ and $b$, and $c$ follows; an area gives the product $ab$.
- The recurring AIME shape is a constant focal sum arriving in disguise: two tangency conditions give distances such as $R_1 - r$ and $R_2 + r$ from two fixed centers, whose sum does not depend on $r$, and that alone identifies the locus as an ellipse.
- Pair it with [[eccentricity|eccentricity]] when the question compares two ellipses, and with [[conic-reflective-property|the reflective property]] when it asks for a minimum.

## Applications
Equations, foci, and areas of ellipses, loci given by a constant focal sum, and extremal problems on an ellipse.

## Contest profile
Recognizing the constant sum is the problem, and the algebra afterward is routine.
`,

"hyperbola-properties": String.raw`
## Key forms
- $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$ — the hyperbola centered at the origin
- $|PF_1 - PF_2| = 2a$ — every point has focal distances differing by $2a$, for foci $(\pm c, 0)$
- $c^2 = a^2 + b^2$ — now $c$ exceeds $a$
- $y = \pm\dfrac bax$ — the asymptotes
- $xy = k$ — the rectangular hyperbola ($a = b$) turned $45^\circ$

## Conditions
The foci are on the $x$-axis for the form above; for $\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$ they are on the $y$-axis and the asymptotes are $y = \pm\frac abx$. The latus rectum has length $\frac{2b^2}{a}$ here too.

## Why it works
The derivation is the ellipse's with $|PF_1 - PF_2| = 2a$ instead of a sum. Now $c > a$, since the difference of two sides of a triangle is less than the third, so $a^2 - c^2$ is negative and the standard form carries a minus sign with $b^2 = c^2 - a^2$.

The asymptotes come out of the equation rather than from a limit. Replacing the $1$ by $0$ gives $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 0$, which factors as $\left(\frac xa - \frac yb\right)\left(\frac xa + \frac yb\right) = 0$, a pair of lines through the center. Far from the center the $1$ is negligible against terms growing like $x^2$, so the curve hugs them.

The latus rectum has length $\frac{2b^2}{a}$: at $x = c$ the equation gives $\frac{y^2}{b^2} = \frac{c^2}{a^2} - 1 = \frac{b^2}{a^2}$.

## Useful observations
- Asymptotes cap the slopes the curve can reach. Substituting a line $y = mx$ into the equation gives a real intersection only when $|m| < \frac ba$, and an infimum that is never attained is the standard consequence.
- The rectangular case $a = b$ makes the asymptotes perpendicular, and a $45^\circ$ rotation turns the curve into $xy = k$, so any problem about the graph of a reciprocal is a hyperbola problem in other coordinates.
- A hyperbola with given asymptotes $y = \pm mx$ has the form $x^2 - \frac{y^2}{m^2} = a^2$ for some $a$, so the asymptotes fix the shape and one more condition fixes the size.

## Applications
Equations and foci of hyperbolas, asymptote slopes, reciprocal graphs, and infimum problems with figures inscribed in a hyperbola.

## Contest profile
A recurring AIME shape asks for the infimum of a length over figures inscribed in a hyperbola, such as a rhombus centered at the origin with its diagonals along two perpendicular lines through the center. The answer is a number the curve approaches and never reaches, which is exactly what asymptotes produce, and reading the problem as a hyperbola problem rather than a polygon problem is the whole insight.
`,

"parabola-focus-directrix": String.raw`
## Key forms
- $x^2 = 4py$ — the parabola with focus $(0, p)$ and directrix $y = -p$
- $y^2 = 4px$ — the parabola opening sideways, with focus $(p, 0)$ and directrix $x = -p$
- $y = ax^2 \implies p = \dfrac{1}{4a}$ — the focal distance from the vertex along the axis of symmetry
- the latus rectum, the focal chord perpendicular to the axis, has length $\lvert 4p\rvert$

## Conditions
The vertex is at the origin in these forms; a parabola with vertex $(h, k)$ replaces $x$ and $y$ by $x - h$ and $y - k$. A parabola opening downward or leftward has $p \lt 0$.

## Why it works
Impose $\operatorname{dist}(P, F) = \operatorname{dist}(P, \ell)$ with $F = (0, p)$ and $\ell: y = -p$. Squaring gives $x^2 + (y - p)^2 = (y + p)^2$, and the $y^2$ and $p^2$ terms cancel on both sides, leaving $x^2 = 4py$. Almost nothing survives the cancellation, which is why the parabola has the simplest equation of the three conics and why $p$ is the only parameter it has.

Setting $y = p$ recovers the latus rectum: $x^2 = 4p^2$, so the chord runs from $-2p$ to $2p$ and has length $\lvert 4p\rvert$.

## Useful observations
- A problem giving $y = ax^2$ has focal distance $p = \frac{1}{4a}$ from the vertex, so a wide parabola has a distant focus. A problem giving a focus and a directrix is asking for the equation.
- The equidistance definition itself is often the shortcut: a distance to the focus can be replaced by a vertical distance to the directrix, which turns an optimization over a curve into one over a line.
- [[vertex-form|The vertex formula]] $x = -\frac{b}{2a}$ is the algebraic companion to this card and locates the vertex before any of this applies.

## Applications
The equation of a parabola from a focus and a directrix, focal distances, and optimization using the focus-directrix definition.

## Contest profile
Parabolas reach the AIME as constraint curves rather than as objects to describe. Two parabolas can combine into a circle by taking the right linear combination, and a parabola intersected with its own rotated image is best handled by noticing the symmetry axis of the rotation. On the AMC the focus-directrix pair is tested directly, and the trap is a parabola opening sideways, where $x$ and $y$ swap roles throughout.
`,

"eccentricity": String.raw`
## Key forms
- $e = \dfrac{PF}{\operatorname{dist}(P, \ell)}$ — the locus of points whose distance to a focus is $e$ times their distance to a directrix: an ellipse for $0 \lt e \lt 1$, a parabola for $e = 1$, a hyperbola for $e \gt 1$, and a circle for $e = 0$
- $e = \dfrac ca$ with $c^2 = a^2 - b^2$ for an ellipse and $c^2 = a^2 + b^2$ for a hyperbola
- $x = \pm\dfrac ae$ — the directrices of an ellipse or hyperbola centered at the origin
- two conics of the same type are similar exactly when their eccentricities agree

## Conditions
The focus is not on the directrix. For an ellipse or hyperbola with axes along the coordinate axes, $a$ is the semi-major axis for the ellipse and the distance from the center to a vertex for the hyperbola.

## Why it works
Fix a focus $F$ and a line $\ell$, and take all $P$ with $PF = e \cdot \operatorname{dist}(P, \ell)$. Squaring gives a second-degree equation whose $x^2$ and $y^2$ coefficients differ by a factor involving $1 - e^2$, so the sign of $1 - e^2$ alone decides whether the curve closes up, opens once, or opens twice.

That is the unified construction: the three conics are one locus with one parameter. For an ellipse or hyperbola, comparing this with the two-focus definition gives $e = c/a$ and puts the directrix at $x = a/e$.

## Useful observations
- Since $e$ is a ratio of lengths it survives any scaling, so two ellipses are similar exactly when their eccentricities match, and then every corresponding length is in one fixed ratio.
- Every parabola has $e = 1$, so all parabolas are similar, which surprises people and occasionally answers a question outright.
- The value also reads as a shape: $e$ near $0$ is nearly circular, $e$ near $1$ nearly a parabola, and large $e$ gives a hyperbola with wide-open branches.

## Applications
Classifying a conic from its eccentricity, finding a directrix, and problems comparing two conics with the same eccentricity.

## Contest profile
Equal eccentricity is the phrase to watch for: two ellipses with the same eccentricity are similar, so an area ratio fixes every linear ratio, in particular the ratio of their $c$ values, which converts a statement about areas into one about focal distances.
`,

"conic-classification": String.raw`
## Key forms
- $B^2 - 4AC \lt 0$ — an ellipse, $B^2 - 4AC = 0$ a parabola, and $B^2 - 4AC \gt 0$ a hyperbola, for $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$
- $\cot 2\theta = \dfrac{A - C}{B}$ — the rotation that removes the $xy$ term
- the degenerate members: a point or nothing, one line or a pair of parallel lines, and two crossing lines respectively

## Conditions
The coefficients are real and $A$, $B$, $C$ are not all zero. The sign of $B^2 - 4AC$ survives both rotation and translation, so it classifies the curve without putting it in standard form.

## Why it works
Rotating the axes by $\theta$ mixes $x$ and $y$ linearly, and a direct computation shows $B^2 - 4AC$ comes out unchanged; translating changes only $D$, $E$, and $F$. So the quantity is a property of the curve, not of the coordinates chosen to write it.

Its sign measures how the second-degree part factors: negative and it does not factor over the reals, which forces a closed curve; zero and it is a perfect square, which is the parabolic boundary case; positive and it splits into two real directions, which become the hyperbola's asymptotes.

## Useful observations
- $B^2 - 4AC$ is computed first, since it says what the curve is and therefore which card applies.
- If $B = 0$ the axes are already aligned, and [[completing-the-square|completing the square]] in each variable finishes the job. If $B \ne 0$ and more than the type is needed, a rotation by $\cot 2\theta = \frac{A - C}{B}$ clears it.
- The degenerate possibilities are checked before trusting the classification, since the same sign covers them: a negative discriminant admits a single point or the empty set, a zero one admits a repeated or parallel line pair, and a positive one admits two crossing lines.

## Applications
Recognizing the type of a second-degree curve, combining two conics into a circle, and spotting degenerate cases.

## Contest profile
This is a recognition tool more than a computation. A combination of two conic equations is again a conic, and choosing the combination that kills the asymmetry can leave a circle, which proves that four intersection points are concyclic. Degenerate cases also show up as answer-choice traps whenever a parameter is allowed to vary.
`,

"conic-reflective-property": String.raw`
## Key forms
- ellipse: a ray from one focus reflects through the other focus
- parabola: a ray from the focus leaves parallel to the axis, since the second focus is at infinity
- hyperbola: a ray aimed at the far focus reflects away from the near focus
- the tangent at a point makes equal angles with the two focal radii

## Conditions
The reflection is off the curve, that is, off its tangent line at the point. The statement is about the tangent, and its usual contest form is an optimization.

## Why it works
Take a point $T$ on an ellipse and move slightly along the tangent. To first order the sum $PF_1 + PF_2$ must not change, since $T$ already sits on the level curve where that sum is $2a$. The rate at which each focal distance changes is the cosine of the angle between the tangent direction and that focal radius, so the two cosines must cancel, which says the tangent makes equal angles with the two radii. That is the reflection law.

On a parabola the second focus is at infinity, so the second radius points along the axis and a ray from the focus leaves parallel to it.

## Useful observations
- The contest form is almost never about light. It is read as a level-curve statement: the ellipses with foci $F_1, F_2$ are the level sets of $PF_1 + PF_2$, so the smallest one meeting a given line touches it, and the point of tangency is where that sum is least. Every other point of the line lies on a larger ellipse, hence gives a larger sum.
- That reduces the minimization to [[reflect-across-the-line|reflecting one focus across the line]] and taking a straight segment, and [[ellipse-tangent-line|the tangency pattern]] is this idea packaged as a recognizable shape.
- The classic AIME use is an ellipse tangent to an axis: the point of tangency minimizes the focal sum along that line, so reflecting a focus across it solves the problem in one line.

## Applications
Minimum sums of focal distances along a line, whispering galleries and satellite dishes, and tangent lines to conics.

## Contest profile
The property also appears stated outright on the AMC, usually as a whispering gallery or a satellite dish, where the answer is simply that rays from one focus arrive at the other or leave parallel. The hyperbola's version is the rarest of the three.
`,


"projected-area-cosine": String.raw`
## Key forms
- $[\text{shadow}] = [\text{original}]\cdot\cos\theta$ — the orthogonal projection of a plane region onto another plane multiplies every area by $\cos\theta$, where $\theta$ is the dihedral angle between the planes
- $[\text{slanted section}] = \dfrac{[\text{shadow}]}{\cos\theta}$ — the form that is used
- a circle projects to an ellipse with the same major axis and the minor axis shortened by $\cos\theta$

## Conditions
The projection is orthogonal, along the normal of the target plane. A shadow from a nearby lamp is a central projection and scales by similar triangles instead.

## Why it works
Set up coordinates so the two planes meet along the $x$-axis at angle $\theta$. Projection fixes every $x$ and multiplies every coordinate measured across the line of intersection by $\cos\theta$, so it is a linear map that scales one direction by $1$ and the perpendicular one by $\cos\theta$.

A linear map multiplies every area by the absolute value of [[determinant-geometric|its determinant]], which here is $1 \cdot \cos\theta$. That the factor does not depend on the region is the whole content, and it is why the statement holds for a circle, a polygon, and anything else at once.

## Useful observations
- It is used in the backwards direction almost always. A tilted plane cuts a solid and the area of the section is wanted; projecting the section straight down onto a face of the solid usually gives a region computable with elementary geometry, and dividing by $\cos\theta$ recovers the real area.
- The angle $\theta$ is the dihedral angle between the cutting plane and the plane projected onto, most reliably found as the angle between their normal vectors using [[vector-dot-product|the dot product]], not by eye.
- It is not the projection of a single length, which is [[vector-projection|the vector projection]] and carries no area at all.

## Applications
Areas of slanted sections of cylinders and boxes, ellipses as shadows of circles, and ratios of areas under projection.

## Contest profile
It makes a class of AIME solids tractable without any integration. The slanted section of a cylinder is its own shadow on the base stretched by a constant factor, so its area follows from a [[circular-segment|circular segment]] and one cosine, and a slanted section of a box is found the same way, by projecting onto the bottom face and dividing by the cosine of the angle between the two normals.
`,


"euler-line-parallel-side": String.raw`
## Key forms
- $\tan B\tan C = 3$ — the angle test for the Euler line being parallel to $BC$, and the quickest way in
- $AH : HD = (\tan B\tan C - 1) : 1$ — the general ratio along the $A$-altitude of an acute triangle, with $D$ the foot
- $AH = 2\,HD$ — the parallel case in an acute triangle, the orthocenter two thirds of the way down from $A$
- $\cos A = 2\cos B\cos C$ — the same statement before dividing through

## Conditions
$O$ and $H$ are the circumcenter and orthocenter of a non-equilateral triangle, so the Euler line $OH$ exists. The condition is symmetric in $B$ and $C$ and says nothing about $A$, so it describes a one-parameter family of triangles. If $B = C$ then $\tan^2B = 3$ forces $B = 60^\circ$ and an equilateral triangle, where $O$ and $H$ coincide and there is no line, so an isosceles configuration is never the intended reading. The angle test $\tan B\tan C = 3$ holds for every triangle and forces it to be acute: if $A$ is obtuse then $B + C \lt 90^\circ$ and $\tan B\tan C \lt 1$, and if $B$ or $C$ is obtuse the product is negative. The unsigned test $AH = 2\,HD$ is valid only for acute triangles: $A = (0, \sqrt2)$, $B = (1, 0)$, $C = (2, 0)$ has $H = (0, -\sqrt2)$, $D = (0, 0)$, so $AH = 2\,HD$, but $O = (\frac32, \sqrt2)$ and $OH$ is not parallel to $BC$.

## Why it works
Measure heights above $BC$ with signs, the side of $A$ positive. The line $OH$ is parallel to $BC$ exactly when the two signed heights are equal. The height of $O$ is $R\cos A$, which is [[orthocenter-properties|half of the directed distance]] from $A$ to $H$ along the altitude, and the height of $H$ is $2R\cos B\cos C$. In an acute triangle both are positive, both centers lie inside, and equal heights read $HD = \frac12 AH$ directly, so the orthocenter cuts the $A$-altitude in the ratio $2 : 1$; in an obtuse triangle one of the signs flips and the unsigned lengths can no longer be compared.

Converting to angles needs only the two standard distances, $AH = 2R\cos A$ and $HD = 2R\cos B\cos C$. Equating $\cos A$ with $2\cos B\cos C$, then writing $\cos A = -\cos(B + C) = \sin B\sin C - \cos B\cos C$ and dividing through by $\cos B\cos C$, leaves $\tan B\tan C = 3$. The same two distances give the general ratio $AH : HD = (\tan B\tan C - 1) : 1$, and the parallel configuration is its $2 : 1$ case.

## Useful observations
- Recognition runs in both directions. Told that the Euler line is parallel to a side, write $\tan B\tan C = 3$ as one more equation in the angles; told two angles whose tangents multiply to $3$, the configuration is known without computing either center.
- The altitude reading is the one to use when the problem gives a length rather than an angle, since it turns the configuration into a $2 : 1$ division of a segment that can be measured.
- The hypothesis combines with the [[law-of-sines|Law of Sines]] or with $A + B + C = 180^\circ$ like any other angle relation, and with the Euler line itself when a problem also involves the centroid, which sits one third of the way from $O$ to $H$.
- The obtuse case is where unsigned reasoning breaks, which is a standard reason to measure heights with signs, as in [[directed-lengths|directed lengths]].

## Applications
Triangles whose Euler line is parallel to a side, and relations between the angles $B$, $C$ and the position of the orthocenter on an altitude.

## Contest profile
A configuration to recognize rather than a theorem to quote: the parallel hypothesis looks incomputable until converted to a condition on the product of two tangents.
`,


"perpendicular-bisector-locus": String.raw`
## Key forms
- $PA = PB \iff P$ lies on the perpendicular bisector of $AB$ — the locus of points equidistant from two points is a line
- the center of any circle through $A$ and $B$ lies on that line, so the three side bisectors of a triangle meet at its circumcenter
- a fold that carries $A$ onto $B$ creases along the perpendicular bisector of $AB$
- $PA : PB = k$ with $k \ne 1$ — the locus is an [[apollonius-circle|Apollonius circle]] instead of a line

## Conditions
The points $A$ and $B$ are distinct and in one plane; in space the locus is a plane.

## Why it works
The perpendicular bisector is the mirror line of the segment, so its points are equally far from both ends, and the converse, which is the direction that gets used, holds too.

Let $M$ be the midpoint of $AB$. If $P$ lies on the perpendicular bisector, the right triangles $PMA$ and $PMB$ share the leg $PM$ and have equal legs $MA = MB$, so their hypotenuses agree: $$PA = \sqrt{PM^2 + MA^2} = \sqrt{PM^2 + MB^2} = PB.$$

Conversely, if $PA = PB$, the triangles $PMA$ and $PMB$ have all three sides equal, so the angles at $M$ are equal; since they add to $180^\circ$, each is a right angle, and $P$ is on the perpendicular bisector. The locus is therefore the whole line and nothing else, which is why the converse may be used as freely as the theorem.

In coordinates the same statement is a cancellation. With $A = (a_1, a_2)$ and $B = (b_1, b_2)$, squaring $PA = PB$ gives $$(x - a_1)^2 + (y - a_2)^2 = (x - b_1)^2 + (y - b_2)^2,$$ where the $x^2$ and $y^2$ terms cancel and leave one linear equation. That is [[distance-midpoint|the coordinate recipe]].

## Useful observations
- Equidistance from two points is one linear condition, so a point equidistant from $A$ and $B$ and subject to a second condition is pinned down to finitely many places.
- Two chords of a circle have bisectors that meet at the center, the version on [[equal-chords-arcs|equal chords and arcs]].

{{figure:center}}

- Reflecting across the bisector exchanges $A$ and $B$, which is why a paper fold that lands $A$ on a point $T$ has the perpendicular bisector of $AT$ as its crease.

{{figure:fold}}

- With two lines in place of two points, the equidistant set is the angle bisector, the subject of [[bisector-closer-region|comparing distances to two sides]].
- As the ratio $PA : PB$ approaches $1$, the Apollonius circles grow without bound and flatten toward the perpendicular bisector.

## Applications
Locating circumcenters and the centers of circles through two points, and describing the crease or the locus of points equidistant from two others.

## Contest profile
Used constantly and rarely named: two circle centers placed on the bisector of a segment, or a fold whose crease is the bisector of the segment from a vertex to its landing point; the finish is usually the Pythagorean Theorem on the right triangle it creates.
`,

"cotangent-rule": String.raw`
## Key forms
- $\cot A = \dfrac{b^2 + c^2 - a^2}{4K}$ — the cotangent of any angle from the sides and the area $K$
- $\cot A + \cot B = \dfrac{c^2}{2K}$ — a sum of two cotangents leaves only the side opposite neither angle

## Conditions
$a$, $b$, $c$ are the sides opposite $A$, $B$, $C$ and $K$ is the area of the triangle.

## Why it works
The Law of Cosines gives $\cos A = \frac{b^2 + c^2 - a^2}{2bc}$, and the sine area formula $K = \frac12 bc\sin A$ rearranges to $\sin A = \frac{2K}{bc}$. Their quotient is $\frac{b^2 + c^2 - a^2}{2bc} \cdot \frac{bc}{2K}$, and the $bc$ cancels, leaving $\frac{b^2 + c^2 - a^2}{4K}$.

Adding $\cot A$ and $\cot B$ puts $b^2 + c^2 - a^2$ over $4K$ next to $a^2 + c^2 - b^2$ over $4K$. Everything cancels except $2c^2$, giving $\frac{c^2}{2K}$. The side that survives is the one opposite neither angle.

## Useful observations
- Converting a cotangent turns the whole expression into side lengths and area, where ordinary algebra works, and sums collapse pair by pair.
- A ratio such as $\dfrac{\cot C}{\cot A + \cot B} = \dfrac{a^2 + b^2 - c^2}{2c^2}$ depends only on the sides. If a problem gives $a^2 + b^2 = 5c^2$, the ratio is $2$ at once.
- The relation among all three cotangents, which holds because the angles sum to $180^\circ$, is on [[triangle-angle-identities|the angle-sum identities card]] and is the one used for [[brocard-angle|the Brocard angle]]; it is a relation, while this card evaluates each cotangent.

## Applications
Cotangent expressions in a triangle, medians and cevians written with cotangents, and the Brocard angle.

## Contest profile
Problems that ask for a ratio of cotangents given a relation among $a^2$, $b^2$, and $c^2$ reduce to this card; they are usually tagged with the Law of Cosines and the sine area formula, and knowing this card does the conversion in one step instead of three.
`,

"rotation-center": String.raw`
## When to use
A figure and its image under a rotation, given by coordinates, as in "a rotation sends triangle $ABC$ to triangle $A'B'C'$; find the center", or by a drawing; and questions about the angle of a rotation, or whether a given motion is a rotation or a translation. It also locates the center of a composition of two rotations. A translation has no center, so check that the two perpendicular bisectors meet before calling a motion a rotation.

## How
1. Match two points with their images, $P \to P'$ and $Q \to Q'$, by following the labels, not by proximity.
2. Find the perpendicular bisectors of $PP'$ and $QQ'$. In coordinates, the condition $|XP| = |XP'|$ becomes linear once expanded.
3. Their intersection is the center $O$.
4. The angle is $\angle POP'$, or more quickly the angle between the directions of $PQ$ and $P'Q'$.

A rotation sends $A = (0, 0)$ to $A' = (4, 2)$ and $B = (2, 0)$ to $B' = (4, 4)$. The perpendicular bisector of $AA'$ is $2x + y = 5$, and that of $BB'$ is $x + 2y = 7$; they meet at $O = (1, 3)$. The direction of $AB$ is $(2, 0)$ and that of $A'B'$ is $(0, 2)$, so the rotation is $90^\circ$ counterclockwise.

## Why it works
A rotation keeps every point at its distance from the center, so $OP = OP'$ for every point $P$ and its image. The set of points equidistant from $P$ and $P'$ is the perpendicular bisector of $PP'$, so the center lies on it, and on the corresponding bisector for every other pair. Two non-parallel lines meet once, which fixes $O$.

A rotation turns every segment by the same angle, so the angle can be read from any segment and its image, without finding the center first. If the two bisectors are parallel, every segment kept its direction, and the motion is a translation, not a rotation.

## Formulas it uses
- [[perpendicular-bisector-locus]]: the points equidistant from $P$ and $P'$ form the perpendicular bisector of $PP'$.
- [[distance-midpoint]]: in coordinates, the perpendicular bisector passes through the midpoint of $PP'$, and the center is where two of them meet.

## Common traps
- Matching the vertices wrongly, especially in a square or regular polygon that looks the same after several different rotations.
- Measuring the angle at the wrong point, such as $\angle PQP'$ instead of $\angle POP'$.
- Using a third pair to find the center when two suffice; the third pair is only a check.

## Contest profile
An occasional AMC and AIME coordinate question: two perpendicular bisectors give the center, and the angle comes from one turned segment.
`,

"zonogon-minkowski": String.raw`
## Distinguishing clues
- Several quantities vary independently, each moving a point in its own fixed direction.
- The question asks about everything reachable: a perimeter, an area, or a shape.
- Not this pattern: a single moving point on a path, which is a locus problem, or parameters that depend on each other, which do not give a Minkowski sum.

## Methods and Formulas to Try
The reachable set is the sum of the segments $[\vec 0, \vec v_i]$: slide each segment along all the others. That sum is a convex polygon whose sides are the generators, each used twice in opposite directions, so its perimeter is $2\sum|\vec v_i|$ in any arrangement, while its area is $\sum_{i \lt j}|\vec v_i \times \vec v_j|$.

### Methods to try
- [[linear-change-of-variables]]: with two generators the region is a parallelogram, the image of the unit square under a linear map, with area $|\det|$.
- [[coordinate-bash]]: write the generators as vectors and compute lengths and cross products directly.

### Formulas to try
- [[distance-midpoint]]: the length of each generator, which is all the perimeter needs.
- [[cross-product-area]]: $|\vec v_i \times \vec v_j|$, the area of the parallelogram spanned by two generators.
- [[determinant-geometric]]: the same cross product written as a $2 \times 2$ determinant.

## Common traps
- Tracing the boundary by hand and miscounting sides, when the perimeter needs only the generator lengths.
- Assuming the area is as arrangement-free as the perimeter.
- Treating two parallel generators as separate sides; they merge into one longer side.

## Contest profile
A rare AMC and AIME pattern: three independent motions sweep a hexagon whose perimeter is twice the total generator length.
`,


"steiner-line": String.raw`
## Key forms
- for $P$ on the circumcircle of $ABC$, the reflections of $P$ in the three sidelines are collinear — the Steiner line of $P$
- the Steiner line passes through the orthocenter $H$
- the Steiner line is the image of the Simson line of $P$ under the homothety at $P$ of ratio $2$

## Conditions
$P$ lies on the circumcircle. As $P$ approaches a vertex the line approaches the altitude from that vertex, so a configuration with $P$ nearly at a vertex is numerically unstable.

## Why it works
Take $P$ on the circumcircle and drop the perpendicular to $BC$, landing at the foot $F$. The reflection of $P$ in $BC$ is the point $2F - P$, so reflecting is exactly the homothety centered at $P$ with ratio $2$ applied to the foot. Doing that for all three sides carries the whole Simson line to the line of reflections, which therefore exists and is parallel to it.

For $H$, use directed angles mod $180^\circ$. Let $P_a$, $P_b$ be the reflections of $P$ in $BC$ and $CA$, and $H_a$, $H_b$ those of $H$; both $H_a$ and $H_b$ lie on the circumcircle ([[orthocenter-properties|the orthocenter card]]), on the altitudes $AH$ and $BH$. Reflecting in $BC$ sends line $H_aP$ to line $HP_a$, so
$$\angle(HP_a, AH) = -\angle(H_aP, H_aA) = -\angle(CP, CA),$$
the last step by inscribed angles. In the same way $\angle(HP_b, BH) = -\angle(CP, CB)$.

Adding $\angle(AH, BH) = \angle(CB, CA)$, as the altitudes are the sides turned by $90^\circ$,
$$\angle(HP_a, HP_b) = -\angle(CP, CA) + \angle(CB, CA) + \angle(CP, CB) = 0.$$
So $H$, $P_a$, $P_b$ are collinear, and the same holds with the third side.

## Useful observations
- A problem that reflects a circumcircle point over the sides, which otherwise looks like three unrelated constructions, is recognized here. The collinearity is the payoff, and the extra information over the Simson line is the point $H$.
- The Simson line and the reflection line are the same object at two scales, so a problem stated with either can be attacked with facts about the other.

## Applications
Collinearity from reflections of a circumcircle point, and lines through the orthocenter.

## Contest profile
Olympiad material, and rarely the headline result: it appears as the step that turns a reflection condition into a collinearity, or the reverse.
`,

"anticomplementary-triangle": String.raw`
## Key forms
- $A' = B + C - A$, $B' = C + A - B$, $C' = A + B - C$ — the vertices of the anticomplementary triangle $A'B'C'$, whose medial triangle is $ABC$
- sides parallel to those of $ABC$ and twice as long, so $R' = 2R$ and $[A'B'C'] = 4[ABC]$
- $O' = H$ — the circumcenter of $A'B'C'$ is the orthocenter of $ABC$
- $N' = O$ — the nine-point center of $A'B'C'$ is the circumcenter of $ABC$
- $H' = 2O - H$ — the orthocenter of $A'B'C'$ is the reflection of $H$ over $O$, the de Longchamps point $L$

## Conditions
$ABC$ is any triangle, $G$ its centroid, $O$ its circumcenter, and $H$ its orthocenter.

## Why it works
Every statement follows from one homothety. The map centered at the centroid $G$ with ratio $-2$ sends $A$, $B$, $C$ to the vertices of $A'B'C'$, and the inverse map with ratio $-\frac12$ is exactly the one that produces the medial triangle. A homothety of ratio $-2$ doubles every length and reverses direction, so the sides are parallel and twice as long, the circumradius doubles, and the area quadruples.

The centers move by the same map. The circumcenter of $A'B'C'$ is the image of the circumcenter of $ABC$ taken one level down, and that is the orthocenter of $ABC$: the perpendicular bisectors of the sides of $A'B'C'$ are the altitudes of $ABC$, because $A$, $B$, $C$ are the midpoints. The circumcircle of the medial triangle $ABC$ is the nine-point circle of $A'B'C'$, so its nine-point center is $O$. The [[euler-line-ratio|Euler line]] of $A'B'C'$ passes through $G$, $O' = H$, and $N' = O$, and $H' = 3G - 2O' = 3G - 2H = 2O - H$.

## Useful observations
- A fact about the orthocenter of a triangle is a fact about the circumcenter of its anticomplementary triangle, so an awkward $H$ can be traded for a comfortable $O$.
- The circle centered at $H$ with radius $2R$, the circumcircle of $A'B'C'$, is tangent to the circumcircles of $AHB$, $BHC$, and $CHA$. Each of those has radius $R$, and the center of the one on $BC$ is $B + C$ (with $O$ as origin), whose distance to $H = A + B + C$ is $R$.
- It is a relabeling rather than a theorem, which is its strength: it costs nothing to apply, and it makes the Euler line relationships between the two triangles immediate.

## Applications
Configurations built on midpoints, where naming the bigger triangle turns statements about midpoints into statements about vertices, and trades between $H$ and $O$.

## Contest profile
Olympiad and the occasional hard AIME geometry problem built on midpoints.
`,

"ptolemy-second-theorem": String.raw`
## Key forms
- $\dfrac{AC}{BD} = \dfrac{AB \cdot AD + CB \cdot CD}{BA \cdot BC + DA \cdot DC}$ — for a cyclic quadrilateral $ABCD$, the ratio of the diagonals
- the numerator, which belongs to $AC$, is built at $A$ and $C$ (the products of the two sides at $A$ and of the two sides at $C$), and the denominator, which belongs to $BD$, at $B$ and $D$
- with sides $a = AB$, $b = BC$, $c = CD$, $d = DA$ and diagonals $p = AC$, $q = BD$: $\dfrac pq = \dfrac{ad + bc}{ab + cd}$
- $p^2 = \dfrac{(ac + bd)(ad + bc)}{ab + cd}$ and $q^2 = \dfrac{(ac + bd)(ab + cd)}{ad + bc}$ — each diagonal explicitly from the four sides
- together with Ptolemy's product $pq = ac + bd$, the ratio determines each diagonal separately

## Conditions
$ABCD$ is a cyclic quadrilateral with its vertices in that order around the circle, so $a, b, c, d$ are consecutive sides.

## Why it works
The quickest route is the one that proves the first theorem: invert at $A$. Inversion sends $B$, $C$, $D$ to collinear points, and distances transform by $B'C' = \frac{BC \cdot k}{AB \cdot AC}$.

Writing the collinearity $B'C' + C'D' = B'D'$ gives Ptolemy's product formula, and comparing the two ratios in which $C'$ divides $B'D'$ gives this one. Both are the same picture, read for a sum or for a ratio.

A route without inversion is the Law of Cosines on the two triangles that share the diagonal $p$, using $\cos B = -\cos D$ for the opposite angles of a cyclic quadrilateral. Eliminating the angle and solving for $p^2$ gives the explicit formula, which packages into the paired products. Dividing the two diagonal formulas then gives the ratio, and multiplying them recovers Ptolemy's product.

## Useful observations
- The two theorems are used together: multiplying and dividing the product and the ratio recovers $AC^2$ and $BD^2$, both diagonals of a cyclic quadrilateral from the four sides alone, with no angles anywhere. The first theorem alone leaves one equation short.
- The letters are not memorized: the numerator for $AC$ gathers the two products of sides meeting at $A$ and at $C$, and the denominator the same at $B$ and $D$.
- The three products $ab + cd$, $ac + bd$, and $ad + bc$ are computed once and cached: the diagonals are quotients of them, and the same three drive [[brahmaguptas-formula|Brahmagupta's Formula]] for the area and [[cyclic-quad-radius|the circumradius formula]].

## Applications
Both diagonals of a cyclic quadrilateral from its four sides, and eliminating an unwanted diagonal inside a longer computation.

## Contest profile
Cyclic quadrilateral problems on the AIME that hand over four sides and want a diagonal. The product formula alone answers that only when the other diagonal is already known; this pair answers it outright. On olympiads it shows up inside longer computations, usually as the step that eliminates an unwanted diagonal.
`,

"poncelet-closure": String.raw`
## Key forms
- a triangle inscribed in a circle of radius $R$ and circumscribed about a circle of radius $r$ whose centers are $d$ apart has $d^2 = R^2 - 2Rr$
- a quadrilateral with the same property has $\dfrac{1}{(R - d)^2} + \dfrac{1}{(R + d)^2} = \dfrac{1}{r^2}$ (Fuss)
- Poncelet closure: if one $n$-gon is inscribed in the outer circle and circumscribed about the inner one, then every point of the outer circle is a vertex of such an $n$-gon
- Poncelet's porism: for two conics, one inside the other, the tangent path from a starting point either closes after $n$ steps from every starting point or from none

## Conditions
The inner circle lies inside the outer one. For $n = 3$ the relation is necessary and sufficient: two circles satisfying it carry a triangle between them.

## Why it works
For the triangle the relation is [[euler-distance-theorem|Euler's Distance Formula]], which holds in every triangle. So a circumcircle and incircle of the same triangle must satisfy it; the content of the converse is that the condition is also sufficient.

Poncelet's closure theorem is the part with no elementary proof. Start anywhere on the outer circle, draw a tangent to the inner circle, continue around, and if the path closes after $n$ steps for one starting point, it closes after $n$ steps for every starting point.

Poncelet's porism is the full statement, and it needs no circles: take any two conics, one inside the other, and run the same path, from a point of the outer conic along a tangent to the inner one, to the next point of the outer conic, and on. A porism is a theorem of exactly this all-or-nothing kind: a configuration that either has no solution or has infinitely many. Here either the path never closes up, from any starting point, or it closes after the same number $n$ of steps from every starting point, possibly winding several times around the inner conic and tracing a star polygon.

The reason it is all or nothing is that, in a well-chosen parameter on the outer conic, one step of the path is the same rotation by a fixed angle $\theta$ for every starting point. A rotation brings every point back after $n$ steps exactly when $n\theta$ is a whole number of turns, and that condition does not mention the starting point. Finding the parameter is the hard part (it is an elliptic integral, which is why the proof is beyond contest level), but it shows why the triangle and quadrilateral conditions involve only $R$, $r$, and $d$.

$$\text{closes from one point after } n \text{ steps} \iff n\theta \in 2\pi\mathbb{Z} \iff \text{closes from every point.}$$

## Useful observations
- Told that a bicentric $n$-gon exists, one gets a relation among $R$, $r$, and $d$ for free.
- Told that two circles satisfy such a relation, the polygon may be placed wherever is most convenient, since closure does not depend on the starting point.
- The triangle case is the same statement as Euler's Inequality $R \ge 2r$ with its equality case read as a closure condition.

## Applications
Relations among the circumradius, inradius, and center distance of triangles and quadrilaterals, and rotating a bicentric polygon around its two circles.

## Contest profile
Olympiad, and uncommon even there. Its value is that the triangle case is Euler's Distance Formula, which is far more common, and that closure explains why such figures rotate freely.
`,


"sawayama-thebault": String.raw`
## Key forms
- $D$ is a point of side $BC$, and a circle $\omega$ touches the segments $DA$ and $DC$ at $E$ and $F$ and touches the circumcircle internally, on the arc $AC$: then $E$, $I$, $F$ are collinear, where $I$ is the incenter of $ABC$
- $DE = DF = \dfrac{a\cdot AD + c\cdot CD - b\cdot BD}{a + b + c}$
- for $D = B$, $\omega$ is the $B$-mixtilinear incircle and the statement says that $I$ lies on its chord of contact

## Conditions
$a = BC$, $b = CA$, $c = AB$, and $D$ lies strictly between $B$ and $C$. The circle $\omega$ sits in the region bounded by $DA$, $DC$, and the arc $AC$ not containing $B$. The mirror configuration on the side of $B$ is the same with $B$ and $C$ exchanged.

## Why it works
Two earlier results do the work: [[caseys-theorem|Casey's Theorem]] for the tangent lengths and [[menelaus-theorem|Menelaus' Theorem]] for the collinearity. Write $u = AD$, $d = BD$, $x = DE$, and let $L$ be the foot of the bisector of angle $A$ on $BC$.

Step 1, tangent lengths. The two tangents from $D$ to $\omega$ are equal, so $DE = DF = x$. Then $AE = u - x$, $BF = d + x$, and $CF = a - d - x$. These are also the tangent lengths from $A$, $B$, $C$ to $\omega$.

Step 2, Casey. The circles $A$, $\omega$, $C$, $B$ (three points and $\omega$) all touch the circumcircle, in this order around it. Casey's Theorem reads $AE \cdot BC + AB \cdot CF = AC \cdot BF$, that is $$a(u - x) + c(a - d - x) = b(d + x), \qquad x = \frac{au + c(a - d) - bd}{a + b + c}.$$

Step 3, where $F$ lies. By the [[angle-bisector-theorem|Angle Bisector Theorem]], $BL = \frac{ac}{b + c}$. Computing with Step 2, $$a \cdot AE - (b + c)(BF - BL) = au + ac - (b + c)d - (a + b + c)x = 0,$$ so $a \cdot AE = (b + c)\cdot FL$. Since $AE > 0$, the point $F$ lies beyond $L$ on the side of $C$, hence outside the segment $DL$.

Step 4, Menelaus in triangle $ADL$. The point $E$ is on side $AD$, $I$ is on side $AL$, and $F$ is on line $DL$ outside it. Since $ED = DF$, $$\frac{AE}{ED}\cdot\frac{DF}{FL}\cdot\frac{LI}{IA} = \frac{AE}{FL}\cdot\frac{LI}{IA}.$$

The incenter divides $AL$ by the bisector $BI$ of angle $B$ in triangle $ABL$: $\frac{AI}{IL} = \frac{AB}{BL} = \frac{b + c}{a}$. By Step 3, $\frac{AE}{FL} = \frac{b + c}{a}$. The product is $\frac{b + c}{a}\cdot\frac{a}{b + c} = 1$, and the converse of Menelaus' Theorem makes $E$, $I$, $F$ collinear.

## Useful observations
- The cevian $AD$ never enters the conclusion: every such circle has a chord of contact through $I$, which is why a circle wedged into a cevian is usually an incenter problem in disguise.
- With $D = B$ the cevian becomes the side $BA$, and the result says $I$ lies on the chord of contact of the [[mixtilinear-incircle|mixtilinear incircle]].
- Read backwards it is a construction: draw any such circle and its chord of contact passes through the incenter.

## Applications
Proving that a line through two tangency points passes through the incenter, and locating the incenter from a circle wedged between a cevian, a side, and the circumcircle.

## Contest profile
Olympiad only, and among the more specialized results here. The configuration is recognizable on sight, and the lemma turns several tangency conditions into one collinearity through the incenter.
`,

"conway-circle": String.raw`
## Key forms
- extend each side through both of its endpoints by the length of the side opposite the vertex there: the six endpoints are concyclic
- the circle's center is the incenter $I$
- $\rho = \sqrt{r^2 + s^2}$ — its radius, in terms of the inradius $r$ and the semiperimeter $s$

## Conditions
The extensions run along the sidelines, beyond each vertex, by the length of the opposite side; at each vertex both sides are extended.

## Why it works
Work out one tangent length and the rest follows. At vertex $A$, both extensions run out to distance $a$ beyond $A$, and the tangent length from $A$ to the incircle is $s - a$; adding $a$ gives $s$ for the distance from $A$ along either side to the new points. So all six points sit at tangent length $s$ from the incircle along the sidelines, and a point at tangent length $s$ from a circle of radius $r$ is at distance $\sqrt{r^2 + s^2}$ from its center. Every one of the six is that far from $I$, so they are concyclic about $I$ with radius $\sqrt{r^2 + s^2}$.

That is also why the construction is not arbitrary. Extending each side by the length of the side opposite is precisely what makes $(s - a) + a$ come out the same at all three vertices, and any other extension rule breaks the equality.

## Useful observations
- If a problem extends the sides of a triangle by the opposite sides, the circle replaces chasing six points.
- The radius formula turns the configuration into $r$ and $s$, both of which come straight from [[inradius-area|the inradius formula]] and the perimeter.

## Applications
Constructions that extend the sides of a triangle by the lengths of the opposite sides, and the radius of the resulting circle.

## Contest profile
Reachable from the AMC upward, since the tools are standard (semiperimeter, inradius, tangent lengths); the construction is distinctive enough that recognizing it is most of the work.
`,

"japanese-theorem": String.raw`
## Key forms
- the incenters of the four triangles $ABC$, $BCD$, $CDA$, $DAB$ of a cyclic quadrilateral are the vertices of a rectangle
- the sides of that rectangle are parallel to the bisectors of the angles between the diagonals
- cutting a cyclic polygon into triangles by non-crossing diagonals from one vertex, the sum of the inradii of the triangles does not depend on which vertex is used

## Conditions
$ABCD$ is cyclic; nothing else is needed, and the sides may be as uneven as you like. The polygon version needs all vertices on one circle.

## Why it works
Each incenter is placed by [[incenter-excenter-lemma|the arc-midpoint lemma]]: the incenter of $\triangle ABC$ lies on the bisector from $B$, at a position governed by the midpoint of arc $AC$. Placing all four incenters this way and comparing the angles they make shows that each pair of adjacent ones subtends a right angle.

The reason for a rectangle rather than a general quadrilateral is parallelism. Two opposite sides of the figure come out parallel to the bisector of one diagonal, the other two parallel to the bisector of the other diagonal, and those two bisectors are perpendicular.

## Useful observations
- A rectangle gives right angles and equal diagonals for free, so a length or angle question about the four incenters collapses.
- The polygon version is the one that appears as a surprise invariant: the total of the inradii is the same for every triangulation.

## Applications
Shapes and distances among the incenters of a cyclic quadrilateral, and invariant sums of inradii in cyclic polygons.

## Contest profile
Rare, and almost always the punchline of a problem built around it rather than a step in a longer solution. The configuration is specific enough that meeting it without the theorem is close to hopeless.
`,

"pappus-hexagon": String.raw`
## Key forms
- if $A, B, C$ lie on one line and $D, E, F$ on another, then $AE \cap BD$, $AF \cap CD$, and $BF \cap CE$ are collinear
- it is Pascal's Theorem with the conic degenerated into a pair of lines

## Conditions
The two lines are distinct. The statement is purely projective: it uses no lengths, angles, or circles, so it survives any projective transformation.

## Why it works
A pair of distinct lines is a conic, since its equation factors into two linear factors. So six points, three on each line, are six points of a conic, and Pascal says the three intersections of opposite sides of the hexagon $AEBFCD$ are collinear. Those opposite-side pairs are exactly $AE$ with $BD$, $AF$ with $CD$, and $BF$ with $CE$.

## Useful observations
- It answers collinearity questions in figures made only of lines and their crossings, where metric tools have nothing to grip.
- Because it is projective, three points on a line may be sent to convenient places to set up a picture.
- The same name is carried by two other results: the [[arbelos|Pappus chain]] in the arbelos, and Pappus's Centroid Theorems about solids of revolution.

## Applications
Collinearity of three crossing points in a figure of two lines with three marked points each.

## Contest profile
Olympiad, in projective-flavoured problems, paired with [[desargues-theorem|Desargues's Theorem]] as the two incidence results used without coordinates. Seeing it as a degenerate Pascal is the cleanest way to remember both.
`,


"picks-theorem-general": String.raw`
## Key forms
- $A = d\left(I + \dfrac B2 - 1\right)$ — for a polygon with vertices in a lattice generated by $\vec u$ and $\vec v$, where $d = \lvert\vec u \times \vec v\rvert$ is the area of the fundamental parallelogram
- Pick's count measures area in units of the fundamental domain, and the familiar statement is the case where that domain is a unit square
- On the triangular grid, with area counted in unit triangles, $A = 2I + B - 2$

## Conditions
Area is counted in units of the fundamental domain; on the triangular grid that means unit triangles, not squares or units of $\sqrt3$. The points are all the integer combinations $a\vec u + b\vec v$ of two fixed independent vectors. If they are only some of them, such as every other point or a union of shifted copies, the set is not a lattice and the theorem is not available.

## Why it works
Let $\Lambda$ be the lattice generated by $\vec u$ and $\vec v$, and let $T$ be the linear map with $T(1, 0) = \vec u$ and $T(0, 1) = \vec v$. It scales and shears the square grid's two basis vectors into $\vec u$ and $\vec v$, which makes it an [[affine-transformations|affine transformation]].

Then $T$ carries $\mathbb{Z}^2$ onto $\Lambda$ bijectively, so it matches the lattice points of any polygon with the lattice points of its preimage exactly, interior to interior and boundary to boundary. And $T$ multiplies every area by $\lvert\det T\rvert = d$. Applying [[picks-theorem|the ordinary theorem]] in the preimage, where the area is $I + \frac B2 - 1$, and pushing forward gives the formula.

What Pick's Theorem actually measures is area in units of the fundamental domain. That is exactly the kind of quantity an affine map cannot change: it is a ratio of two areas, and an affine map multiplies both by the same factor.

Example: the triangular grid. The triangular lattice is generated by $\vec u = (1, 0)$ and $\vec v = \left(\frac12, \frac{\sqrt3}{2}\right)$, so its fundamental rhombus has area $d = \frac{\sqrt3}{2}$, exactly two of the small unit triangles, each of area $\frac{\sqrt3}{4}$. The general formula gives $A = \frac{\sqrt3}{2}\left(I + \frac B2 - 1\right)$, and dividing by $\frac{\sqrt3}{4}$ to count in unit triangles gives $$A = 2I + B - 2.$$

A side running $k$ steps along a grid direction contains exactly $k$ boundary points, so $B$ is the perimeter in steps. The smallest cases check: one unit triangle has $I = 0$ and $B = 3$, giving $1$; a side-$2$ triangle has $B = 6$, giving $4$; the hexagon of six triangles around a point has $I = 1$ and $B = 6$, giving $6$.

For a larger figure, take a trapezoid on a grid of unit equilateral triangles with sides of $4$, $2$, $2$, and $2$ steps and its long side along the bottom, so $B = 10$, with $2$ grid points strictly inside. It holds $2 \cdot 2 + 10 - 2 = 12$ unit triangles. In lattice coordinates its vertices are $(0, 0)$, $(4, 0)$, $(2, 2)$, $(0, 2)$, the shoelace formula gives $6$ units of the fundamental parallelogram, and each of those is two unit triangles, so the count is $12$ again.

{{figure:triangular}}

## Useful observations
- A basis of the lattice is read off, $d = \lvert\vec u \times \vec v\rvert$ is taken, $I$ and $B$ are counted as usual, and the result is multiplied by $d$. The count gives area in fundamental domains, not in square units.
- On the triangular grid the count is in triangles, so the factor $\frac{\sqrt3}{4}$ is carried only at the very end, if an answer is wanted in terms of a side length, as $\frac{\sqrt3}{4}s^2$ times the count of triangles.
- The map also settles which grids are safe. [[picks-hexagonal-grid|The honeycomb]] is the standard trap: its vertices are two shifted copies of a lattice, not a lattice.

## Applications
Areas of polygons on skewed grids, in the Eisenstein integers, and on triangular grids drawn as isometric paper.

## Contest profile
Rare in this form, because the AMC and AIME draw most of their grids square; the triangular grid is the exception, as isometric paper. It matters when a problem sets up a skewed grid, works in the Eisenstein integers, or counts points of $\{a\vec u + b\vec v\}$, and it is the statement that makes the triangular-grid version a consequence rather than a separate fact.
`,

"picks-hexagonal-grid": String.raw`
## Key forms
- the centers of the cells of a hexagonal tiling form a triangular lattice, so in units of the smallest lattice triangle (area $\dfrac{3\sqrt3}{4}s^2$) the area is $2I + B - 2$, and a cell of side $s$, with area $\dfrac{3\sqrt3}{2}s^2$, is two such units
- the corners of the tiling (the honeycomb) are not a lattice, and no formula in $I$ and $B$ alone gives the area there

## Conditions
The Pick law holds for the cell centers, with $I$ and $B$ counting centers. For the honeycomb corners it fails for every choice of constants.

## Why it works
The failure is worth seeing concretely. Take the honeycomb with bond length $1$ and the two triangles whose vertices are three mutually nearest corners of the same kind. They are congruent equilateral triangles of side $\sqrt3$ and area $\frac{3\sqrt3}{4}$, and both have $B = 3$.

The down-pointing one has a corner of the other kind at its center, so $I = 1$, and the up-pointing one has $I = 0$. Equal area and equal $B$ with different $I$ means no formula in $I$ and $B$ alone can give the area. The reason is structural: the honeycomb is two interleaved triangular lattices, not one lattice.

## Useful observations
- The centers of the cells work with the triangular-grid form unchanged, and a region made of whole cells has the cell area times the number of cells.
- If the corners really are the given points, splitting the region into whole cells plus leftover triangles and trapezoids gives the area.
- The reason Pick fails here, a point set that is not closed under subtraction, is the test for when the general form applies.

## Applications
Areas on hexagonal grids and the check that a lattice-point area formula is valid before it is used.

## Contest profile
Never asked as a statement. It matters because the instinct to apply Pick's Theorem to a hexagonal picture is strong and gives a wrong answer.
`,

"picks-with-holes": String.raw`
## Key forms
- $A = I + \dfrac B2 + h - 1$ — a lattice region with $h$ holes, where $B$ counts the boundary points over every boundary curve, the outer one and each hole
- $A = I + \dfrac B2 - \chi$ with $\chi = 1 - h$ the Euler characteristic — the form that keeps working as the region gets stranger
- $I$ counts only points strictly inside the region: a point on a hole's edge is a boundary point, not an interior one

## Conditions
The region is a lattice polygon with polygonal holes whose vertices are lattice points. The holes do not touch the outer boundary or each other.

## Why it works
Cut the region into a single hole-free piece by slicing from the outer boundary to each hole along lattice segments. Each of the $h$ cuts is traversed twice, once in each direction, so every lattice point on a cut is counted twice as a boundary point of the sliced polygon while being counted once, or not at all, in the original.

Tracking that bookkeeping across all $h$ cuts, the $-1$ in [[picks-theorem|Pick's Theorem]] becomes $-1 + h$. The clean statement is $A = I + \frac B2 - \chi$, where $\chi$ is $1$ for a disc and $1 - h$ with $h$ holes, so it is not a patch on Pick but the same theorem with the constant showing what it always was.

## Useful observations
- Two counting rules matter more than the formula: $B$ is counted over every boundary curve, and $I$ only at points strictly inside the region.
- A sanity check on a $3 \times 3$ square with its center unit square removed: $A = 8$, $B = 12 + 4 = 16$, and all four would-be interior points now lie on the hole, so $I = 0$. Then $0 + 8 + 1 - 1 = 8$.
- Often the faster move is still to apply plain Pick to the outer polygon and to each hole separately and subtract, which is worth doing as a check; the hole form is the one for when the boundaries share lattice points and the subtraction gets delicate.

## Applications
Lattice figures with something punched out of them, such as a frame, an annulus, or a polygon with a polygonal bite.

## Contest profile
It shows up whenever a lattice figure has a hole.
`,

"equiangular-hexagon-area": String.raw`
## Key forms
- $A = \frac{\sqrt3}{4}\left[(a + b + c)^2 - a^2 - c^2 - e^2\right]$ — the area of an equiangular hexagon with consecutive sides $a, b, c, d, e, f$
- $a - d = e - b = c - f$ — the only condition the six sides must satisfy
- for the regular hexagon of side $1$ the formula gives $\frac{\sqrt3}{4}(9 - 1 - 1 - 1) = \frac{3\sqrt3}{2}$

## Conditions
All six interior angles are $120^\circ$, and the sides are labeled in order around the hexagon. The squares subtracted are the alternating triple $a$, $c$, $e$ that begins with the first side of the sum $a + b + c$.

## Why it works
All six angles are $120^\circ$, so consecutive sides turn by $60^\circ$ and the six side vectors point along only three directions. Summing them to zero gives one condition, which in the labeling $a, b, c, d, e, f$ reads $a - d = e - b = c - f$. That is the only constraint: an equiangular hexagon has three free side lengths, not one, and is usually nowhere near regular.

Now extend sides $b$, $d$, and $f$ until they meet. Because the directions repeat every three sides, the three lines make an equilateral triangle, and what has been added at each corner is itself equilateral, of sides $a$, $c$, and $e$. The triangle's side is $a + b + c$, since the side carrying $b$ is flanked by the corners cut at $a$ and at $c$, so subtracting the three corners gives the formula. The closure condition is exactly what makes $a + b + c$, $c + d + e$, and $e + f + a$ agree, which is why the construction is consistent.

## Useful observations
- Given five sides, the sixth follows from $a - d = e - b = c - f$ directly, with no system to solve.
- The regular hexagon is the check on the labeling: if the formula does not return $\frac{3\sqrt3}{2}$ for side $1$, the wrong three sides were squared.
- On a triangular grid the same triangle-minus-corners picture counts unit triangles, the count that [[picks-theorem-general|Pick's Theorem on Any Lattice]] reproduces by counting dots.

## Applications
Areas of equiangular hexagons given their sides, and missing sides from the closure condition.

## Contest profile
Usually posed as six sides with all angles $120^\circ$ and a request for the area; cutting the hexagon into trapezoids by hand works but is slow and error-prone.
`,

"median-doubling": String.raw`
## When to use
A median together with the two sides at its vertex, as in "$AB = 3$, $AC = 5$, $AM = \frac72$; find angle $A$"; a median making given angles with the sides; bounds on a median, such as $m_a < \frac{b + c}{2}$; and any midpoint where a segment through it could be extended to complete a parallelogram. The method is the median version of reflecting through a midpoint.

## How
1. Extend $AM$ past $M$ to $A'$ with $MA' = AM$.
2. Note the parallelogram $ABA'C$: $BA' = AC = b$ and $CA' = AB = c$.
3. Work in triangle $ABA'$ (or $ACA'$), whose sides are $c$, $b$ and $2m_a$ and whose angle at $B$ is $180^\circ - A$.
4. Use the Law of Cosines, the triangle inequality, or an angle chase there, and carry angles back across the parallelogram with alternate angles.

If the median $AM$ is perpendicular to $AB$ and makes $30^\circ$ with $AC$, the parallelogram puts a right angle at $A'$ in triangle $ACA'$, whose angle at $A$ is $30^\circ$. So $CA' = \frac12 AC$, and since $CA' = AB$, the side $AC$ is twice $AB$.

{{figure:chase}}

## Why it works
The point $A'$ is the reflection of $A$ through $M$, so $M$ is the midpoint of $AA'$ as well as of $BC$. A quadrilateral whose diagonals bisect each other is a parallelogram, so $ABA'C$ is one, as the figure at the top shows, and opposite sides are equal and parallel.

Triangle $ABA'$ then contains the sides $c$ and $b$ and the doubled median, with the angle at $B$ supplementary to angle $A$. The Law of Cosines there gives $4m_a^2 = b^2 + c^2 + 2bc\cos A$, which, combined with the Law of Cosines for $a$, is Apollonius's Theorem. The triangle inequality in the same triangle gives $2m_a < b + c$.

## Formulas it uses
- [[law-of-cosines]]: in triangle $ABA'$, $4m_a^2 = b^2 + c^2 - 2bc\cos(180^\circ - A)$, linking the median to angle $A$.
- [[apollonius-theorem]]: $b^2 + c^2 = 2m_a^2 + \frac{a^2}{2}$, the median length that the doubled triangle proves.
- [[triangle-inequality]]: in triangle $ABA'$, $|b - c| < 2m_a < b + c$, the range of a median.
- [[median-to-hypotenuse]]: in a right triangle the parallelogram is a rectangle with equal diagonals, so the median to the hypotenuse is half the hypotenuse.

## Common traps
- Using angle $A$ itself in triangle $ABA'$; the angle at $B$ there is $180^\circ - A$.
- Forgetting that the doubled segment is $2m_a$, not $m_a$.
- Extending the median from the wrong end: it is extended past the midpoint of the side, away from the vertex.

## Contest profile
A short AMC and AIME step: whenever a median is given with the two sides beside it, the doubled triangle is usually the intended first line.
`,

"parallel-line-similarity": String.raw`
## When to use
Cevian problems with a given ratio on one side and an unknown ratio on another; a midpoint or trisection point inside a triangle with lines crossing through it; proofs of ratio theorems such as the Angle Bisector Theorem; and trapezoids, where the parallel sides already supply one pair of parallel lines. The signal is a ratio that must move from one line to another with no similar triangles drawn. Where similar triangles are already visible, no line is needed.

## How
1. Choose the point first: one where something is known, such as a point dividing a side in a known ratio, a midpoint, or a vertex.
2. Choose the direction second: parallel to the segment whose ratio you want to carry, usually a cevian or a side.
3. Read the ratios from the two pairs of similar triangles the line creates, one on each side of it.
4. Combine the ratios along the target segment.

Let $D$ divide $BC$ with $BD : DC = 1 : 2$, let $E$ be the midpoint of $AD$, and let $BE$ meet $AC$ at $F$. Draw the line through $D$ parallel to $BF$, meeting $AC$ at $G$. In triangle $ADG$, $EF \parallel DG$ starts at the midpoint of $AD$, so $AF = FG$. In triangle $CBF$, $DG \parallel BF$ with $CD = \frac23 CB$, so $CG = \frac23 CF$. So $AC$ splits as $1 : 1 : 2$, and $AF : FC = 1 : 3$.

{{figure:cevian}}

## Why it works
A line parallel to one side of a triangle makes equal corresponding angles with the other two sides, so it cuts off a triangle similar to the whole, with all lengths scaled by the same factor. That is the entire mechanism; the skill is in placing the line so that both of the similar triangles it creates carry information.

The Angle Bisector Theorem shows the idea at its cleanest. If $AD$ bisects angle $A$, the line through $C$ parallel to $AD$ meets line $BA$ at $E$ with equal angles at $E$ and $C$, as in the figure at the top, so $AE = AC$; then the parallel gives $\frac{BD}{DC} = \frac{BA}{AE} = \frac{AB}{AC}$.

## Formulas it uses
- [[intercept-theorem]]: a line parallel to a side divides the other two sides proportionally, $\frac{AD}{AB} = \frac{AE}{AC}$.
- [[similar-figures-ratios]]: the cut-off triangle is similar to the whole, so every length scales by the same factor.
- [[midsegment-theorem]]: through a midpoint, the parallel to a side hits the midpoint of the third side and is half as long.

## Common traps
- Drawing the parallel through a point where nothing is known, which produces similar triangles with no usable ratio.
- Mixing up which segments correspond in the two similar triangles.
- Adding ratios that refer to different wholes; convert everything to fractions of one segment first.

## Contest profile
The first auxiliary line to try on an AMC or AIME cevian-ratio problem; when it stalls, mass points or area ratios reach the same answer without a drawing.
`,

"cyclic-equal-angles": String.raw`
## Key forms
- $\angle BAC = \angle BDC$, $\;\angle CAD = \angle CBD$, $\;\angle ABD = \angle ACD$, $\;\angle ADB = \angle ACB$
- diagonals meeting at $P$: $\triangle PAB \sim \triangle PDC$ and $\triangle PAD \sim \triangle PBC$, so $PA \cdot PC = PB \cdot PD$
- converse: $\angle BAC = \angle BDC$ with $A$, $D$ on the same side of $BC$ $\implies$ $A, B, C, D$ concyclic

## Conditions
The two angles must lie on the same side of their common segment; angles on opposite sides are supplementary instead.

## Why it works
Each pair is two [[inscribed-angle-theorem|inscribed angles]] standing on the same arc, so the Inscribed Angle Theorem makes them equal.

$\angle BAC$ and $\angle BDC$ both stand on the arc $BC$ that does not contain $A$ and $D$, so each is half of it. The same happens at every side: each side of the quadrilateral is a chord, and the two vertices not on it see it from the same side, at equal angles.

Where the diagonals cross, two of these pairs give each of the triangles $PAB$ and $PDC$ the same two angles, so they are similar, and their side ratios give $PA \cdot PC = PB \cdot PD$.

{{figure:bowtie}}

The converse follows like the converse of the opposite-angle test: if $D$ sees $BC$ at the same angle as $A$ but lay inside or outside the circle through $A$, $B$, $C$, the angle would be strictly larger or smaller.

## Useful observations
- The similar triangles at the crossing are the chord case of [[power-of-a-point|power of a point]], so every equal-angle pair in a cyclic quadrilateral comes with a length relation.
- One equal pair on the same side of a segment is the most common way a contest problem hides a circle, and it is one of the [[concyclicity-tests|tests for a cyclic quadrilateral]].
- The side matters: from opposite sides of a chord the two angles are supplementary, which is the [[cyclic-opposite-angles|opposite-angle test]] in disguise.
- Right angles over one segment are the special case: every point seeing a segment at $90^\circ$ lies on the circle with that segment as diameter, [[thales-theorem|Thales' Theorem]].

## Applications
Angle chases across a cyclic quadrilateral, similar triangles at crossing diagonals, and proofs that four points are concyclic.

## Contest profile
Equal angles over a common side are the usual sign of a hidden cyclic quadrilateral, and spotting the pair is often the key step of an AIME geometry problem; [[ptolemys-theorem|Ptolemy's Theorem]] is the length relation that goes with it.
`,

"reflect-across-the-line": String.raw`
## When to use
A path from $A$ to $B$ must touch a line on the way, a light ray or a billiard ball bounces off a wall, or $AP + PB$ is to be minimized over the points $P$ of a line. In algebra the same picture hides in a sum of two square roots, each the distance from a point on an axis to a fixed point. A path that must stay on the surface of a solid is unfolded instead, with [[unfold-the-surface|unfolding]], and a sum of distances from a moving point to two fixed points with no line involved is smallest on the segment between them.

## How
1. Check that $A$ and $B$ lie on the same side of the line; if not, the segment $AB$ already crosses it and is the answer.
2. Reflect $A$ across the line to $A'$.
3. Join $A'$ to $B$; the segment crosses the line at the best point $P$.
4. The least length is $A'B$, found with the Pythagorean Theorem or the distance formula.
5. For a path that must touch two lines, reflect across the first line and then reflect that image across the second.

For $A = (1, 3)$, $B = (7, 5)$ and a path touching the $x$-axis, the image is $A' = (1, -3)$, so the shortest path has length $\sqrt{6^2 + 8^2} = 10$, and it touches the axis where the segment from $(1, -3)$ to $(7, 5)$ does, at $x = \frac{13}{4}$.

## Why it works
The line is the perpendicular bisector of $AA'$, so every point $P$ of the line is equally far from $A$ and $A'$. Hence $AP + PB = A'P + PB$, and by the [[triangle-inequality|triangle inequality]] this is at least $A'B$, with equality exactly when $P$ lies on the segment $A'B$. At that point the two parts of the path make equal angles with the line, which is the law of reflection for light.

## Formulas it uses
- [[pythagorean-theorem]]: the length $A'B$ of the straightened path, from its horizontal and vertical gaps.
- [[reflection-coordinates]]: the image of a point across a line, such as $(x, y) \mapsto (x, -y)$ across the $x$-axis or $(x, y) \mapsto (y, x)$ across $y = x$.

## Common traps
- Reflecting when the points are on opposite sides of the line, where no reflection is needed.
- Reporting the image $A'$ instead of the touching point $P$.
- With two walls, reflecting both points across the same wall, or the second reflection across the wrong line.

## Contest profile
From MATHCOUNTS through AIME: a river-and-barn or billiard path, a light ray in a wedge, or a sum of two square roots read as distances.
`,

"unfold-the-surface": String.raw`
## When to use
The path must stay on the surface of a solid: an ant on a box, a spider and a fly on the walls of a room, a string wound around a cylinder, or a path on the side of a cone. A path allowed through the solid is a space diagonal instead. A path that only bounces off flat walls is the plane version of the same idea, [[reflect-across-the-line|reflecting across a line]].

## How
1. Decide which faces the path crosses, and in what order.
2. Unfold those faces into one plane, keeping each shared edge attached.
3. Place both endpoints in the net and join them with a straight segment, checking that it stays inside the net.
4. Unroll a cylinder's side into a rectangle of width $2\pi r$; a string that winds $k$ times becomes the diagonal of $k$ such rectangles side by side.
5. Unroll a cone's side into a sector of radius equal to the slant height $s$ and angle $360^\circ \cdot \frac rs$.
6. Compare every unfolding and keep the shortest.

For opposite corners of a $1 \times 2 \times 4$ box the three unfoldings give $\sqrt{3^2 + 4^2} = 5$, $\sqrt{5^2 + 2^2} = \sqrt{29}$, and $\sqrt{6^2 + 1^2} = \sqrt{37}$, so the shortest surface path is $5$.

## Why it works
Unfolding moves each face rigidly into the plane, so lengths measured along the faces do not change, and a path on the surface becomes a path of the same length in the net. In the plane the shortest path is the straight segment. Every surface path crosses the faces in some order, and each order gives one unfolding, so comparing the unfoldings compares every path.

## Formulas it uses
- [[pythagorean-theorem]]: the length of the straight segment in a rectangular net, such as $\sqrt{(a + b)^2 + c^2}$ across two faces of a box.
- [[circle-basics]]: the circumference $2\pi r$, the width of a cylinder's unrolled side.
- [[cone-formulas]]: a cone's side unrolls into a sector whose radius is the slant height and whose arc is the base circumference.

## Common traps
- Checking only one unfolding of a box; for opposite corners of an $a \le b \le c$ box the shortest pairs the two smallest edges, $\sqrt{(a + b)^2 + c^2}$.
- Giving the space diagonal $\sqrt{a^2 + b^2 + c^2}$, which passes through the solid.
- Unrolling a cone with the base radius in place of the slant height.

## Contest profile
A MATHCOUNTS and AMC favorite, an ant on a box or a string around a cylinder, solved by one straight line in the right net; AMC 12 versions use cones and frustums.
`,

"tangency-equation": String.raw`
## When to use
A problem asks for the parameter that makes two curves meet exactly once, for a line that just touches a circle or a parabola, or for the largest value of a linear expression $ax + by$ over a circle or conic, where the level line $ax + by = c$ touches the curve at the extreme. One common point means tangency only when the curves could have met twice, a point the pattern [[tangency-condition|Exactly One Common Solution]] spells out.

## How
1. Check that the curves would generically meet twice, so that "exactly one" means touching.
2. If one curve is a circle and the other a line, set the distance from the center to the line equal to the radius.
3. Otherwise substitute one equation into the other to get a quadratic in one variable.
4. Set its discriminant to zero and solve for the parameter.
5. Keep every valid value; a line can usually touch from either side.

For the line $y = kx + 2$ and the circle $x^2 + y^2 = 1$, the distance from the origin is $\frac{2}{\sqrt{1 + k^2}}$, and setting it equal to $1$ gives $k^2 = 3$, so $k = \pm\sqrt3$.

{{figure:trichotomy}}

## Why it works
A line meets a circle in $2$, $1$, or $0$ points as its distance from the center is less than, equal to, or greater than the radius, so tangency is exactly the equality case. After substitution, the roots of the quadratic are the coordinates of the intersection points; two real roots are two points, a double root is one point counted twice, and no real roots means no intersection, so tangency is a zero discriminant.

## Formulas it uses
- [[point-line-distance]]: the distance from $(x_0, y_0)$ to $Ax + By + C = 0$ is $\frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$, set equal to the radius.
- [[quadratic-formula]]: the discriminant $b^2 - 4ac$ of the substituted quadratic, zero exactly at a double root.
- [[conic-tangent-lines]]: for an ellipse, hyperbola, or parabola in standard position the discriminant is already worked out, such as $k^2 = a^2m^2 + b^2$ for $y = mx + k$ and an ellipse.

## Common traps
- Reading "exactly one solution" as tangency when the curves can only meet once anyway, as a line parallel to a parabola's axis does.
- Keeping only one parameter value when the line can touch from both sides.
- Squaring to clear a radical and accepting a tangency the original curves do not have.

## Contest profile
AIME problems disguise the curves as a locus, a condition on complex numbers, or the envelope of a moving segment; the tangency equation is the last step once the curves are named.
`,

"cyclic-quadrilateral": String.raw`
## Distinguishing clues
- A quadrilateral stated to be inscribed in a circle, or four points stated to lie on one. Sometimes the circle is given, but more often it is hidden, and finding it is the step that unlocks the problem.
- Two right angles standing on one segment, as at the feet of two altitudes or at a point that sees a diameter: the four points lie on the circle with that segment as diameter.
- Two equal angles that see one segment from the same side.
- A pair of supplementary opposite angles, an isosceles trapezoid, or a rectangle.
- Not this pattern: a quadrilateral with an inscribed circle, where opposite sides have equal sums; a parallelogram that is not a rectangle; a kite whose equal angles are not right angles.

{{figure:toolkit}}

## Methods and Formulas to Try
Proving the circle comes first; after that every fact below holds at once. Most problems use two of them: an angle fact to locate an angle, and a length fact to finish.

### Methods to try
- [[angle-chasing]]: the equal and supplementary pairs let one unknown angle travel around the circle, and the same chase is how a hidden circle is proved in the first place.
- [[extend-sides-to-meet]]: extending sides $AB$ and $DC$ to meet at $E$ makes triangles $EAD$ and $ECB$ similar, with $EA \cdot EB = ED \cdot EC$.
- [[trig-bash]]: every side and diagonal is a chord, $2R$ times the sine of half its arc, so naming the arcs turns the figure into trigonometry.

### Formulas to try
- [[concyclicity-tests]]: the converses that prove four points lie on a circle.
- [[cyclic-opposite-angles]]: opposite angles are supplementary, the most common test and the first consequence.
- [[cyclic-equal-angles]]: each side is seen at equal angles from the other two vertices, and the diagonals cut off similar triangles.
- [[ptolemys-theorem]]: $AC \cdot BD = AB \cdot CD + AD \cdot BC$, relating the diagonals to the sides.
- [[power-of-a-point]]: diagonals crossing at $P$ give $PA \cdot PC = PB \cdot PD$.
- [[law-of-cosines]]: a diagonal written from both sides, using $\cos C = -\cos A$, gives the diagonal from the four sides.
- [[brahmaguptas-formula]]: the area $\sqrt{(s - a)(s - b)(s - c)(s - d)}$ from the four sides.

## Common traps
- Using a cyclic fact before the circle has been proved.
- Confusing the two angle rules: angles on the same side of a chord are equal, on opposite sides supplementary.
- Writing Ptolemy's Theorem with the vertices out of order; the diagonals are the segments joining opposite vertices around the circle.
- Applying Brahmagupta's Formula to a quadrilateral that is not cyclic.

## Contest profile
A frequent AIME configuration, more often hidden than stated: right angles or equal angles create the circle, an angle chase follows, and Ptolemy's Theorem, power of a point, or the Law of Cosines finishes.
`,

"triangle-of-centers": String.raw`
## When to use
Circles touch each other or a larger circle, sometimes resting on a line or sitting in a corner, and the question asks for an unknown radius, the distance between two points, or where a circle sits. Spheres touching along a common axis reduce to the same picture after a [[cross-section-method|cross-section]]. Circles that cross instead of touching have no center-distance equation, and [[shared-leg-pythagoras|two right triangles sharing a leg]] through the common chord is the tool there.

## How
1. Mark every center, and write each tangency as a center distance: $r_1 + r_2$ for circles outside each other, $R - r$ for a circle inside another.
2. Write each tangency with a line as a center at distance $r$ from it, usually a height in coordinates.
3. Look for a right angle among the centers, often from symmetry or a line, and use the Pythagorean Theorem; otherwise use the Law of Cosines.
4. With an unknown center, write one distance equation per tangency and subtract them in pairs, which leaves linear equations.
5. Solve, and check which tangencies are internal.

Circles of radii $1$, $2$, and $3$ touching each other from outside have centers $3$, $4$, and $5$ apart, a right triangle, so the circle of radius $1$ sits at the right angle.

## Why it works
At the point where two circles touch they share a tangent line, and both radii to that point are perpendicular to it, so the two centers and the touch point are collinear. The center distance is therefore the sum of the radii when the centers lie on opposite sides of the touch point and their difference when they lie on the same side. A circle tangent to a line has its radius to the touch point perpendicular to the line, so its center is at distance $r$ from it.

## Formulas it uses
- [[tangent-circles]]: the center distance is $r_1 + r_2$ for external tangency and $|r_1 - r_2|$ for internal tangency.
- [[pythagorean-theorem]]: the right triangles among the centers, the usual finish.
- [[law-of-cosines]]: the triangle of centers when it has no right angle but a known angle, as in a symmetric packing.

## Common traps
- Using $r_1 + r_2$ for a circle inside another, where the distance is the difference.
- Forgetting that a circle resting on a line has its center at height $r$, not on the line.
- Assuming a right angle among the centers without a reason for it.

## Contest profile
The opening move of nearly every AIME circle-packing problem and of many AMC problems with coins, pipes, or balls; the Pythagorean Theorem on the centers usually finishes.
`,

"tangent-circle-packing": String.raw`
## Distinguishing clues
- Several circles touch each other, a larger enclosing circle, or straight lines, and the unknowns are radii or positions fixed only by those tangencies.
- A ring of $n$ equal circles around a center, whose centers form a regular $n$-gon.
- Four mutually tangent circles, which bring in a single identity on their curvatures.
- Spheres are the same configuration one dimension up, handled by slicing through their centers.
- Not this pattern: a single circle tangent to the two sides of an angle, the simpler corner configuration with its center on the bisector, or two circles with common tangent lines but no tangency between them, which is a homothety question.

{{figure:arbelos}}

## Methods and Formulas to Try
Each tangency fixes one distance between centers, so the first move is almost always to join the centers; the other methods take over when the framework is crowded or symmetric.

### Methods to try
- [[triangle-of-centers]]: write every tangency as a center distance and solve the triangles the centers form.
- [[homothety-monge]]: two tangent circles are images of each other under a homothety at their touch point, which carries tangent lines and contact points along.
- [[inversion-properties]]: inverting at a point where several circles touch turns them into lines, straightening a chain.
- [[coordinate-bash]]: with a line or a diameter as an axis, each tangency is one distance equation, and subtracting them in pairs leaves linear equations.

### Formulas to try
- [[tangent-circles]]: center distance $r_1 + r_2$ outside, $|r_1 - r_2|$ inside, with the touch point on the line of centers.
- [[descartes-circle-theorem]]: four mutually tangent circles satisfy $(k_1 + k_2 + k_3 + k_4)^2 = 2(k_1^2 + k_2^2 + k_3^2 + k_4^2)$ in their curvatures.
- [[common-tangent-lengths]]: the length of a common tangent between two circles, from their center distance and radii.
- [[pythagorean-theorem]]: the right triangles among the centers.

## Common traps
- Treating an internal tangency as external.
- Assuming the touch points, rather than the centers, form the useful triangle.
- Forgetting a sign in Descartes' Theorem: a circle enclosing the others has negative curvature.

## Contest profile
A staple from AMC 10 to AIME: coins in a corner, circles in a semicircle, or rings of circles, almost always finished by right triangles among the centers.
`,

"shared-leg-pythagoras": String.raw`
## When to use
A segment is perpendicular to a line and splits a figure into two right triangles that share it: the altitude of a triangle with all three sides known, the perpendicular from two circle centers to their common chord, or the height of a trapezoid with known sides. The shared length is unknown, and so is where its foot lands. If the angles are given instead of the sides, trigonometry reaches the altitude directly.

## How
1. Name the unknown piece of the base, $x$, so the other piece is the base minus $x$, or the distance minus $x$.
2. Write the shared leg squared from each right triangle.
3. Set the two expressions equal; the squares $x^2$ cancel, leaving a linear equation.
4. Solve for $x$, then get the shared leg from either triangle.

For the triangle with sides $13$, $14$, $15$ and the altitude to the side $14$, with foot at distance $x$ from the end of the side $13$: $13^2 - x^2 = 15^2 - (14 - x)^2$, so $169 = 29 + 28x$, $x = 5$, and the altitude is $12$.

{{figure:altitude}}

## Why it works
Both right triangles contain the same leg $h$, so $h^2 = c^2 - x^2$ and $h^2 = b^2 - (a - x)^2$ hold together. Expanding $(a - x)^2 = a^2 - 2ax + x^2$ shows the $x^2$ terms are equal on both sides, so the difference is linear in $x$; that is the [[difference-of-squares|difference of squares]] $c^2 - b^2 = x^2 - (a - x)^2 = a(2x - a)$ in disguise.

## Formulas it uses
- [[pythagorean-theorem]]: the shared leg squared, written once in each right triangle.
- [[difference-of-squares]]: $x^2 - (a - x)^2 = a(2x - a)$, the reason the subtraction leaves a linear equation.

## Common traps
- Placing the foot inside the base when the triangle is obtuse and the foot falls outside, where the pieces are $x$ and $x - a$.
- Forgetting to finish: the question often wants the shared leg, not the split.
- Using it when Heron's Formula and $h = \frac{2A}{a}$ would be quicker for an area alone.

## Contest profile
A routine step from AMC 10 to AIME, hidden inside altitude, trapezoid, and common-chord problems.
`,

"point-in-equilateral": String.raw`
## Distinguishing clues
- Three distances from an interior point to the vertices of an equilateral triangle or a square, with a side or an angle asked for. The figure can be rotated onto itself, which carries the three distances into one triangle.
- The distances from an interior point to the three sides of an equilateral triangle, which always add up to its altitude.
- Equal angles of $120^\circ$ at the point, or a smallest possible sum of distances to the vertices, which mark the Fermat point.
- Not this pattern: the same distances in a general triangle. Nothing rotates a general triangle onto itself, so it is a coordinate or trigonometry problem.

{{figure:three}}

## Methods and Formulas to Try
The figure's symmetry is the resource: a rotation about a vertex maps the figure onto itself, so it can move one distance next to another without changing anything else.

### Methods to try
- [[rotation-trick]]: rotate about a vertex by $60^\circ$, or by $90^\circ$ in a square, so the three distances meet in one triangle with a known angle.
- [[coordinate-bash]]: with one vertex at the origin and a side along an axis, each distance is one equation; subtracting them in pairs leaves linear equations.
- [[complex-bash]]: a $60^\circ$ rotation is multiplication by $e^{i\pi/3}$, which makes the rotation algebraic.

### Formulas to try
- [[vivianis-theorem]]: distances to the three sides of an equilateral triangle add up to its altitude.
- [[fermat-point]]: the point seeing every side at $120^\circ$ minimizes the total distance to the vertices.
- [[equilateral-triangle-facts]]: the altitude $\frac{\sqrt3}{2}s$ and area $\frac{\sqrt3}{4}s^2$.
- [[law-of-cosines]]: once the rotation has put the three distances into one triangle, an angle there plus the $60^\circ$ of the figure gives the angle at the point, and this formula turns that angle into the side.
- [[british-flag-theorem]]: in a square or rectangle, $PA^2 + PC^2 = PB^2 + PD^2$ for opposite corners.

## Common traps
- Rotating by the wrong angle, or about a vertex that does not send one neighbor onto the other.
- Applying Viviani's Theorem to a point outside the triangle, where one distance counts negatively.
- Forgetting that the rotated point and the original form an equilateral triangle, which is where the $60^\circ$ comes from.

## Contest profile
A classic AMC and AIME setup, almost always finished by one rotation and the Law of Cosines.
`,

"right-triangle-altitude": String.raw`
## Distinguishing clues
- A right angle with the perpendicular dropped from it to the opposite side.
- The same figure in disguise: a point on a semicircle joined to the ends of the diameter, with a perpendicular from the point to the diameter, the right angle coming from Thales' Theorem.
- The question names segments of the hypotenuse, the altitude, or a geometric mean.
- Not this pattern: a right triangle with no altitude drawn, which needs only the Pythagorean Theorem, or an altitude in a triangle that is not right, which splits it into two right triangles that are not similar to the whole.

{{figure:copies}}

## Methods and Formulas to Try
The figure holds three similar right triangles, so most questions are one proportion; the methods below take over when the right angle has to be found or the lengths are tangled.

### Methods to try
- [[shared-leg-pythagoras]]: the two small triangles share the altitude, so writing the Pythagorean Theorem in both and subtracting locates its foot.
- [[coordinate-bash]]: with the legs on the axes, the hypotenuse is a line and the altitude is a point-line distance.
- [[angle-chasing]]: each small triangle has one acute angle of the original, which is why the three are similar.

### Formulas to try
- [[altitude-hypotenuse]]: $h^2 = pq$, $a^2 = pc$, $b^2 = qc$, and $h = \frac{ab}{c}$.
- [[similar-figures-ratios]]: the three triangles are similar, so any ratio carries between them.
- [[median-to-hypotenuse]]: the midpoint of the hypotenuse is the circumcenter, $\frac c2$ from all three vertices.
- [[right-triangle-inradius]]: the inradius is $\frac{a + b - c}{2}$, and the two small triangles have inradii in the ratio of their hypotenuses.
- [[thales-theorem]]: a point on a semicircle sees the diameter at a right angle, which is how the configuration hides.

## Common traps
- Matching the wrong sides in the similarity: each leg is the geometric mean of the hypotenuse and the piece next to that leg.
- Missing the hidden right angle in a semicircle.
- Confusing the median to the hypotenuse with the altitude; they coincide only in an isosceles right triangle.

## Contest profile
A fixture from MATHCOUNTS to AIME: segments of a hypotenuse, a semicircle with a perpendicular, or chains of similar right triangles.
`,

"triangle-type-by-sides": String.raw`
## Key forms
- $\angle C$ is acute, right, or obtuse $\iff c^2 \lt a^2 + b^2$, $c^2 = a^2 + b^2$, or $c^2 \gt a^2 + b^2$
- with $c$ the longest side: the triangle is acute $\iff c^2 \lt a^2 + b^2$
- an obtuse triangle with longest side $c$ has $\sqrt{a^2 + b^2} \lt c \lt a + b$

## Conditions
$a$, $b$, $c$ are the sides of a triangle, with $C$ the angle opposite $c$; the triangle inequality must hold first.

## Why it works
The [[law-of-cosines|Law of Cosines]] gives $c^2 = a^2 + b^2 - 2ab\cos C$, so $a^2 + b^2 - c^2 = 2ab\cos C$. The factor $2ab$ is positive, so this difference has the sign of $\cos C$: positive for an acute angle, zero for a right angle, negative for an obtuse one.

A picture gives the same answer without trigonometry. Fix the side $AB = c$ and draw the circle with $AB$ as diameter. By [[thales-theorem|Thales' Theorem]] a point $C$ on the circle sees $AB$ at a right angle; a point inside the circle sees it at a larger angle and a point outside at a smaller one. Inside the circle means $C$ is closer to the center, which is exactly $a^2 + b^2 \lt c^2$ by the median length formula.

{{figure:thales}}

## Useful observations
- Only the longest side needs testing, since a triangle has at most one angle of $90^\circ$ or more.
- With two sides $a \lt b$ fixed and the third side $c$ varying, the triangle is obtuse at both ends of its range: just above $b - a$ the angle opposite $b$ is obtuse, just below $a + b$ the angle opposite $c$ is, and only the middle stretch gives acute triangles.
- The circumcenter lies inside an acute triangle, at the midpoint of the hypotenuse of a right one, and outside an obtuse one; the orthocenter does the same, landing at the right-angle vertex in the right case.
- Integer sides with $c^2 = a^2 + b^2$ are the Pythagorean triples, the boundary between the two counts.

## Applications
Classifying a triangle from its sides, counting integer triangles of each type, and locating the circumcenter and orthocenter.

## Contest profile
AMC problems count the obtuse or acute triangles with given sides; AIME problems use the test as a constraint on an unknown side.
`,

"bisector-closer-region": String.raw`
## When to use
A random point in a triangle, square, or other region, and a question about whether it is closer to one side than to another, or which side it is closest to. Comparing distances to two points instead uses the [[perpendicular-bisector-locus|perpendicular bisector]] of the segment joining them, the same idea for points.

## How
1. Identify the two sides being compared and the angle they form.
2. Draw the bisector of that angle; points on it are equally far from both sides.
3. The region on the side of the bisector next to a side is the set of points closer to that side.
4. For the bisector from vertex $A$ of triangle $ABC$, the Angle Bisector Theorem gives $BD : DC = AB : AC$, so the two pieces have areas in the ratio $AB : AC$.
5. For "closest of all three sides", draw all three bisectors; they meet at the incenter $I$, and the region closest to side $a$ is triangle $IBC$, with area $\frac12 ra$.

For a random point in a triangle with sides $a$, $b$, $c$, the chance that the side $a$ is the nearest side is $\frac{a}{a + b + c}$, since the three incenter triangles have areas $\frac12 ra$, $\frac12 rb$, and $\frac12 rc$.

## Why it works
A point $P$ inside the angle at $A$ is equally far from lines $AB$ and $AC$ exactly when the right triangles formed by $P$, $A$, and the feet of the perpendiculars are congruent, which happens exactly when $AP$ bisects the angle. Moving off the bisector toward $AB$ shrinks the distance to $AB$ and grows the distance to $AC$, so the bisector separates the two regions. The area ratio is the [[cevian-area-ratio|cevian area ratio]]: the pieces share the height from $A$, so their areas are in the ratio of their bases $BD$ and $DC$.

{{figure:regions}}

## Formulas it uses
- [[angle-bisector-theorem]]: the bisector from $A$ meets $BC$ at $D$ with $\frac{BD}{DC} = \frac{AB}{AC}$.
- [[cevian-area-ratio]]: triangles with the same apex and bases on one line have areas in the ratio of the bases.

## Common traps
- Using the perpendicular bisector of a side, which compares distances to points, not to lines.
- Bisecting the wrong angle; the boundary is the bisector of the angle between the two compared sides.
- In an obtuse triangle the perpendicular from a point near the obtuse vertex can land outside a side; contest problems mean the distance to the side's line, which is exactly what the bisector compares.

## Contest profile
An AMC and AIME geometric probability step: a random point closer to one side than another, or nearest to a given side, settled by bisectors and area ratios.
`,

"folded-paper": String.raw`
## Distinguishing clues
- A physical fold: a rectangle with one corner folded onto a side or onto the opposite corner, a triangle folded along a line, or a strip folded over itself.
- The question asks for the crease, for where a point lands, or for the overlapping area.
- Not this pattern: unfolding the surface of a solid to find a shortest path, which is a different idea that runs the other way.

{{figure:corner}}

## Methods and Formulas to Try
Every fold is a reflection, so equal lengths come for free: each point on the crease is equally far from a point and its image, and the flap keeps all its lengths and angles.

### Methods to try
- [[reflect-across-the-line]]: treat the fold as a reflection across the crease; the image of a point is where it lands.
- [[shared-leg-pythagoras]]: a corner folded onto another side makes a right triangle in which one leg is a piece $x$ of a side and the hypotenuse is the folded rest of that side, the side minus $x$; the Pythagorean Theorem in it, or in two such triangles, locates the crease.
- [[coordinate-bash]]: with the sheet on axes, the crease is the perpendicular bisector of the segment from a point to its image.

### Formulas to try
- [[perpendicular-bisector-locus]]: the crease is the set of points equally far from a point and its image.
- [[pythagorean-theorem]]: the right triangles formed by a folded corner.
- [[similar-figures-ratios]]: a crease perpendicular to a diagonal cuts off triangles similar to half the sheet.
- [[reflection-coordinates]]: the image of a point across a line in coordinates.

## Common traps
- Forgetting that the flap is congruent to the region it came from, which gives equal lengths for free.
- Measuring the crease across the whole sheet when it ends at two sides.
- Mixing up the point that moves with its image when writing the equal distances.

## Contest profile
From MATHCOUNTS to AIME: a corner folded onto a side, opposite corners folded together, or the overlap of a folded flap, each settled by a reflection and a right triangle.
`,

"circle-in-angle": String.raw`
## Distinguishing clues
- A circle touches two lines that meet at a vertex, as in a corner of a square, the angle of a triangle, or a wedge holding a row of circles.
- The incircle of a triangle is this configuration three times over, once at each vertex.
- Not this pattern: circles tangent to two parallel lines, where all the centers lie on the midline and all the radii are equal.

{{figure:chain}}

## Methods and Formulas to Try
The angle bisector carries every center, and the vertex is a center of similarity, so lengths at one circle scale to the next.

### Methods to try
- [[homothety-monge]]: every circle in the angle is the image of every other under a homothety centered at the vertex, so a chain of tangent circles has radii in a geometric progression.
- [[triangle-of-centers]]: neighboring circles in a chain have centers $r_1 + r_2$ apart along the bisector, which with $d = \frac{r}{\sin(\theta/2)}$ fixes the ratio.
- [[trig-bash]]: the right triangle formed by the vertex, a center, and a touch point has angle $\frac\theta2$ at the vertex, so every length is $r$ times a trigonometric ratio of $\frac\theta2$.

### Formulas to try
- [[tangent-facts]]: the radius to each touch point is perpendicular to the side, the tangent lengths from the vertex are equal, and the center lies on the bisector.
- [[half-angle]]: the center sits at distance $\frac{r}{\sin(\theta/2)}$ from the vertex, with tangent length $\frac{r}{\tan(\theta/2)}$.
- [[similar-figures-ratios]]: neighboring circles in a chain have radii in the ratio $\frac{1 + \sin(\theta/2)}{1 - \sin(\theta/2)}$.
- [[incircle-tangent-lengths]]: in a triangle the tangent length from vertex $A$ is $s - a$, which equals $r\cot\frac A2$.

## Common traps
- Using the full angle where the half-angle belongs.
- Measuring the vertex-to-center distance along a side instead of along the bisector.
- Forgetting that the chain ratio depends only on the angle, not on the first radius.

## Contest profile
AMC and AIME problems with coins in a corner, circles in a wedge, or an incircle seen from one vertex, all settled by the half-angle right triangle or the homothety from the vertex.
`,

"scale-one-level": String.raw`
## When to use
A construction repeats forever or many times: a square inscribed in a square by joining points on its sides, a circle inscribed in a triangle inscribed in a circle, or a triangle cut by midsegments again and again. The question asks for the total area, total perimeter, or the size of a far level. A figure cut once into similar pieces has one similarity and needs no series.

## How
1. Draw one level and the next only.
2. Compute the ratio $k$ of a matching length, side to side or radius to radius.
3. Lengths of successive levels form a geometric sequence with ratio $k$, and areas one with ratio $k^2$.
4. Add the levels with the geometric series formula, $\frac{\text{first}}{1 - k}$ for lengths or $\frac{\text{first}}{1 - k^2}$ for areas.

Squares inscribed by joining the points one third of the way along each side have $k^2 = \left(\frac13\right)^2 + \left(\frac23\right)^2 = \frac59$, so starting from a unit square the areas of all the squares add up to $\frac{1}{1 - 5/9} = \frac94$.

## Why it works
Each level is built from the previous one by the same rule, so it is similar to the previous one with the same ratio $k$. Lengths scale by $k$ and areas by $k^2$ at every step, which makes the sequence of levels geometric, and a geometric series with ratio less than $1$ converges to its first term over one minus the ratio.

## Formulas it uses
- [[similar-figures-ratios]]: similar figures with length ratio $k$ have area ratio $k^2$.
- [[geometric-series]]: $a + ar + ar^2 + \cdots = \frac{a}{1 - r}$ for $|r| \lt 1$.

## Common traps
- Using $k$ for areas instead of $k^2$.
- Starting the series at the wrong level, such as excluding the first figure when the question includes it.
- Assuming the levels are similar when the construction changes shape from one level to the next.

## Contest profile
AMC and AIME problems on infinitely nested figures, and on shaded regions that alternate between levels.
`,

"nested-similar": String.raw`
## Distinguishing clues
- The construction is described once and then repeated: "continue forever", "this process is repeated", or a picture of ever smaller copies.
- The question asks for a total over all levels, or for one far level.
- Not this pattern: a figure cut once by parallel lines into similar pieces, which is a single similarity.

{{figure:levels}}

## Methods and Formulas to Try
Only two levels ever need to be drawn: the ratio between them fixes every level, and the rest is a geometric series.

### Methods to try
- [[scale-one-level]]: compute the ratio of one level to the next, then sum the levels as a geometric series.
- [[coordinate-bash]]: when the ratio is not obvious, place one level on axes and compute where the next level's vertices land.

### Formulas to try
- [[similar-figures-ratios]]: lengths scale by $k$ and areas by $k^2$ from level to level.
- [[geometric-series]]: the total of all levels, $\frac{\text{first}}{1 - \text{ratio}}$.
- [[midsegment-theorem]]: midpoint constructions halve every length, so areas shrink by $\frac14$.

## Common traps
- Summing lengths with the area ratio, or areas with the length ratio.
- Missing that alternate levels are shaded, which makes the ratio between shaded pieces $k^4$.
- Counting the first figure once too often or not at all.

## Contest profile
AMC problems on nested squares or triangles and AIME problems with alternating shading or a ratio that takes some work to find.
`,

"equiangular-polygon": String.raw`
## Distinguishing clues
- Every angle is the same, $120^\circ$ for a hexagon and $135^\circ$ for an octagon, while the side lengths differ.
- Not this pattern: a regular polygon, which has equal sides too and needs none of this, or a polygon with equal sides but unequal angles, a different and less rigid shape.

{{figure:extend}}

## Methods and Formulas to Try
Equal angles make each side a fixed rotation of the previous direction, which gives two routes: complete the polygon into a regular shape, or write the sides as vectors that must add up to zero.

### Methods to try
- [[extend-sides-to-meet]]: extending alternate sides of an equiangular hexagon forms an equilateral triangle, with equilateral triangles cut off at three corners; the big side equals three consecutive pieces in three ways.
- [[complex-bash]]: sides in directions $1, \omega, \omega^2, \ldots$ with $\omega = e^{i\pi/3}$ must add up to zero, which gives the linear relations among them.
- [[coordinate-bash]]: an equiangular octagon has sides along the axes and the diagonals, so it sits on a grid and its area is a rectangle minus four isosceles right triangles.

### Formulas to try
- [[equilateral-triangle-facts]]: the big triangle and the three corner triangles are equilateral, with areas $\frac{\sqrt3}{4}s^2$.
- [[equiangular-hexagon-area]]: the area of an equiangular hexagon from its sides.
- [[polygon-angle-sums]]: equal angles in an $n$-gon are each $\frac{(n - 2) \cdot 180^\circ}{n}$.
- [[special-right-triangles]]: the corner triangles of an equiangular octagon are $45$-$45$-$90$.

## Common traps
- Extending the wrong sides; for a hexagon, extend every other side.
- Assuming opposite sides are equal; only certain differences are equal, such as $a_1 - a_4 = a_5 - a_2 = a_3 - a_6$.
- Forgetting to check that the given sides are consistent before computing an area.

## Contest profile
An AIME and AMC configuration: an equiangular hexagon or octagon with given sides, asking for a missing side, an area, or the largest circle that fits inside.
`,

"box-tetrahedron": String.raw`
## When to use
A tetrahedron is given by its six edges, and they pair up as three equal pairs of opposite edges, such as $\sqrt{13}$, $\sqrt{20}$, $5$ each appearing twice, or the tetrahedron is regular. The second case is a tetrahedron with three right angles at one vertex, such as the corner sliced off a cube. The question asks for its volume, its circumradius, or a distance inside it.

## How
1. Call the box's dimensions $p$, $q$, $r$, and write each pair of opposite edges as the diagonal of one face: $p^2 + q^2$, $q^2 + r^2$, $r^2 + p^2$.
2. Add the three equations to get $p^2 + q^2 + r^2$, then subtract each equation to get $p^2$, $q^2$, $r^2$.
3. The tetrahedron is the box with four corner tetrahedra removed, each of volume $\frac{pqr}{6}$, so its volume is $pqr - 4 \cdot \frac{pqr}{6} = \frac{pqr}{3}$.
4. Its circumsphere is the box's circumsphere, with radius half the space diagonal, $\frac12\sqrt{p^2 + q^2 + r^2}$.

5. For a corner tetrahedron with perpendicular edges $p$, $q$, $r$ at one vertex, the tetrahedron is one corner piece of the box: its volume is $\frac{pqr}{6}$, its circumsphere is again the box's, and the areas of its faces satisfy [[de-guas-theorem|de Gua's Theorem]].

A regular tetrahedron of edge $\sqrt2$ sits in a unit cube, so its volume is $1 - 4 \cdot \frac16 = \frac13$. A corner tetrahedron with perpendicular edges $1$, $2$, $2$ has circumradius $\frac12\sqrt{1 + 4 + 4} = \frac32$.

## Why it works
Four alternate corners of a box, no two sharing an edge, are joined by six face diagonals, and opposite diagonals of each pair of opposite faces are equal, which gives three equal pairs. Conversely, three equal pairs determine $p^2$, $q^2$, $r^2$ uniquely, and they are positive exactly when every face is an acute triangle, so such a tetrahedron always has a box. Each removed corner piece is a right-corner tetrahedron with legs $p$, $q$, $r$, of volume $\frac{pqr}{6}$.

## Formulas it uses
- [[isosceles-tetrahedron]]: the most common case of the method, a tetrahedron with opposite edges equal in pairs, which is the alternate-corner tetrahedron of a $p \times q \times r$ box with $a^2 = p^2 + q^2$, $b^2 = q^2 + r^2$, $c^2 = r^2 + p^2$ and volume $\frac{pqr}{3}$.
- [[de-guas-theorem]]: for a corner tetrahedron, the square of the slanted face's area is the sum of the squares of the three right-triangle faces.
- [[pythagorean-theorem]]: each edge is the diagonal of a face, $\sqrt{p^2 + q^2}$.
- [[prism-pyramid-volumes]]: each corner piece is a pyramid with volume $\frac13 \cdot \frac{pq}{2} \cdot r$.
- [[space-diagonal]]: the circumsphere's diameter is the box's space diagonal $\sqrt{p^2 + q^2 + r^2}$.

## Common traps
- Matching the edge equations wrongly; each equation pairs two dimensions, and each dimension appears in exactly two equations.
- Forgetting there are four corner pieces to remove.
- Applying it to a tetrahedron that is neither kind; a general tetrahedron does not sit on box corners.

## Contest profile
An AIME and AMC 12 idea for tetrahedra given by six edges in three equal pairs, for regular tetrahedra, which sit in cubes, and for corners sliced off a box.
`,

"dihedral-angle": String.raw`
## When to use
A solid has two faces meeting along an edge and the angle between them matters: the tilt of a pyramid's face, the angle between faces of a tetrahedron, or a flat figure folded along a line until two parts make a given angle.

## How
1. Choose a convenient point on the common edge, often a midpoint or the foot of an altitude.
2. In each face, draw the segment from that point perpendicular to the edge.
3. The dihedral angle is the angle between these two segments.
4. Find it in the triangle they form with a third segment, by the Law of Cosines, or with a right triangle when one segment is vertical.
5. In coordinates, use normal vectors to the two planes; their angle is the dihedral angle or its supplement.

For a square pyramid with base side $2$ and height $1$, take the midpoint of a base edge: the perpendicular in the base runs to the center with length $1$, and the one in the face is the slant height, so the face is tilted at $\arctan\frac11 = 45^\circ$ to the base.

## Why it works
Sliding the chosen point along the edge moves both perpendiculars without turning them, so the angle between them is the same at every point of the edge; that common angle is what the dihedral angle means. Normal vectors are perpendicular to the planes, so the angle between them matches the angle between the planes, or its supplement depending on their directions.

## Formulas it uses
- [[law-of-cosines]]: the angle in the triangle formed by the two perpendiculars and the segment joining their ends.
- [[vector-dot-product]]: $\cos\theta = \frac{\vec n_1 \cdot \vec n_2}{|\vec n_1||\vec n_2|}$ for normal vectors.
- [[pythagorean-theorem]]: the lengths of the perpendiculars and the joining segment inside the solid.

## Common traps
- Using segments that are not perpendicular to the common edge, such as an edge of the face, which gives a larger or smaller angle.
- Drawing the two perpendiculars from different points of the edge.
- Taking the angle between normals when the supplement is the dihedral angle.

## Contest profile
An AIME tool for pyramids, prisms, and folded figures, often finished with the Law of Cosines on a triangle built from the two perpendiculars.
`,

"fit-copies": String.raw`
## When to use
A solid or region has an awkward shape but a symmetric one: a pyramid with its apex over a corner, a wedge cut from a cylinder by a slanted plane, or a region with rotational symmetry. Two, three, or six copies of it, turned or reflected, would fill a cube, a cylinder, a box, or a rectangle.

## How
1. Look for a familiar shape the piece could be a fraction of, often suggested by the piece's faces lying on the familiar shape's faces.
2. Place copies by rotating or reflecting, and check that they fill the shape with no gaps and no overlaps.
3. Divide the familiar shape's volume or area by the number of copies.

The six pyramids from the center of a cube to its faces fill the cube, so each has volume $\frac{s^3}{6}$, which matches $\frac13 \cdot s^2 \cdot \frac s2$.

## Why it works
Congruent pieces have equal volumes, and pieces that fill a shape without overlapping add up to its volume. So $n$ congruent copies filling a shape of volume $V$ each have volume $\frac Vn$. The work is only in checking that the copies really fit.

## Formulas it uses
- [[prism-pyramid-volumes]]: the volume of the familiar box or prism the copies fill, and the pyramid formula the method confirms.
- [[triangle-area-standard]]: two copies of a triangle form a parallelogram, the plane case of the same idea.

## Common traps
- Copies that overlap or leave gaps; check the fit along every face.
- Copies that are mirror images rather than congruent by rotation; reflections are fine for volume but must actually fill the shape.
- Dividing by the wrong number of copies.

## Contest profile
AIME and AMC problems on oddly cut solids, such as wedges from cylinders and pyramids from cubes, where a symmetric copy turns the solid into a familiar one.
`,

"equal-edge-tetrahedron": String.raw`
## Distinguishing clues
- The six edges come in three equal pairs, each pair on opposite edges, often given as square roots.
- The four faces are said to be congruent; a regular tetrahedron is the case with all six edges equal.
- Not this pattern: a tetrahedron with three mutually perpendicular edges at one vertex, the corner of a box, whose volume is $\frac{abc}{6}$.

{{figure:inbox}}

## Methods and Formulas to Try
The box is the key: once the tetrahedron is placed at alternate corners of a box, every measurement becomes a box measurement.

### Methods to try
- [[box-tetrahedron]]: solve for the box's dimensions from the three edge equations, then take the volume as one third of the box and the circumradius as half the space diagonal.
- [[dihedral-angle]]: the angle between two faces, from perpendiculars to the shared edge.
- [[coordinate-bash]]: the box gives coordinates $(0, 0, 0)$, $(p, q, 0)$, $(p, 0, r)$, $(0, q, r)$ for the vertices at once.

### Formulas to try
- [[isosceles-tetrahedron]]: the box relations $a^2 = p^2 + q^2$, $b^2 = q^2 + r^2$, $c^2 = r^2 + p^2$ and the volume $\frac{pqr}{3}$.
- [[space-diagonal]]: the circumsphere's diameter, $\sqrt{p^2 + q^2 + r^2}$.
- [[insphere-radius]]: $r = \frac{3V}{S}$, where the four congruent faces make $S$ four times one face.
- [[prism-pyramid-volumes]]: the corner pieces removed from the box, each $\frac{pqr}{6}$.

## Common traps
- Confusing this tetrahedron with the right-corner tetrahedron cut off a box, which has three perpendicular edges at a vertex.
- Pairing adjacent edges instead of opposite ones.
- Computing an insphere with the wrong face area; all four faces are congruent, so one Heron's Formula computation covers them.

## Contest profile
An AIME configuration: six edges in three equal pairs, with the box giving the volume, the circumsphere, or the point equidistant from all faces.
`,

"conic-tangent-lines": String.raw`
## Key forms
- $\frac{xx_0}{a^2} + \frac{yy_0}{b^2} = 1$ — the tangent to the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ at its point $(x_0, y_0)$
- $\frac{xx_0}{a^2} - \frac{yy_0}{b^2} = 1$ — the tangent to the hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ at $(x_0, y_0)$
- $xx_0 = 2p(y + y_0)$ — the tangent to the parabola $x^2 = 4py$ at $(x_0, y_0)$
- $k^2 = a^2m^2 + b^2$ — the line $y = mx + k$ is tangent to the ellipse
- $k^2 = a^2m^2 - b^2$ — the line $y = mx + k$ is tangent to the hyperbola, possible only when $\lvert m\rvert \gt \frac ba$
- $k = -pm^2$ — the line $y = mx + k$ is tangent to the parabola $x^2 = 4py$

## Conditions
The point forms need $(x_0, y_0)$ on the curve; for a point off the curve the same equation is a different line, its polar. The conics are in standard position, centered at the origin with axes along the coordinate axes.

## Why it works
A line meets a conic where a quadratic equation holds, and it is tangent exactly when the two intersections merge, that is, when the quadratic has a double root.

Substitute $y = mx + k$ into $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ and clear denominators: $(b^2 + a^2m^2)x^2 + 2a^2mkx + a^2(k^2 - b^2) = 0$. Its discriminant simplifies to $4a^2b^2(a^2m^2 + b^2 - k^2)$, which is zero exactly when $k^2 = a^2m^2 + b^2$. For the hyperbola, $b^2$ becomes $-b^2$; for the parabola, $x^2 = 4p(mx + k)$ has discriminant $16p^2m^2 + 16pk$, zero when $k = -pm^2$.

{{figure:double}}

The point form comes from the normal direction. The ellipse is a level curve of $\frac{x^2}{a^2} + \frac{y^2}{b^2}$, whose gradient at $(x_0, y_0)$ is proportional to $\left(\frac{x_0}{a^2}, \frac{y_0}{b^2}\right)$. The tangent is the line through $(x_0, y_0)$ perpendicular to it, $\frac{xx_0}{a^2} + \frac{yy_0}{b^2} = \frac{x_0^2}{a^2} + \frac{y_0^2}{b^2} = 1$.

## Useful observations
- Every point form follows one rule: replace $x^2$ by $xx_0$, $y^2$ by $yy_0$, $x$ by $\frac{x + x_0}{2}$, and $y$ by $\frac{y + y_0}{2}$. For the circle $x^2 + y^2 = r^2$ it gives $xx_0 + yy_0 = r^2$.
- Each slope $m$ gives two parallel tangents to an ellipse, $k = \pm\sqrt{a^2m^2 + b^2}$, one on each side.
- The largest value of $x + y$ on the ellipse is where the line $x + y = c$ is tangent: $m = -1$ gives $c = \sqrt{a^2 + b^2}$.
- Two perpendicular tangents to the ellipse always meet on the circle $x^2 + y^2 = a^2 + b^2$, its director circle.

## Applications
Lines touching an ellipse, hyperbola, or parabola; the extremes of a linear expression over a conic; and common tangents of two conics.

## Contest profile
An AMC 12 and AIME topic: finding the tangent at a point, the parameter that makes a line touch a conic, or the extreme value of $ax + by$ on an ellipse.
`,

"conic-parametric": String.raw`
## Key forms
- $(a\cos t,\ b\sin t)$ — every point of the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$, once each for $0 \le t \lt 2\pi$
- $(a\sec t,\ b\tan t)$ — both branches of the hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$, for $t$ not an odd multiple of $\frac\pi2$
- $(2pt,\ pt^2)$ — the parabola $x^2 = 4py$, whose tangent at parameter $t$ has slope $t$
- $(r\cos t,\ r\sin t)$ — the circle $x^2 + y^2 = r^2$, the case $a = b = r$

## Conditions
The conics are centered at the origin with axes along the coordinate axes; for a conic centered at $(h, k)$, add $h$ and $k$ to the coordinates. On an ellipse, $t$ is the eccentric angle, the angle of the matching point on the circle of radius $a$, not the angle of the point itself from the center unless $a = b$.

## Why it works
Each form is a Pythagorean identity in disguise. For the ellipse, $\frac{(a\cos t)^2}{a^2} + \frac{(b\sin t)^2}{b^2} = \cos^2 t + \sin^2 t = 1$. For the hyperbola, $\sec^2 t - \tan^2 t = 1$. For the parabola, $(2pt)^2 = 4p^2t^2 = 4p \cdot pt^2$.

{{figure:eccentric}}

The ellipse picture explains the name of $t$. Take the point $Q = (a\cos t, a\sin t)$ on the circle of radius $a$ and squash the plane vertically by the factor $\frac ba$: $Q$ moves straight down to $(a\cos t, b\sin t)$ on the ellipse, so the ellipse is the circle squashed, and $t$ is the circle's angle.

## Useful observations
- The largest value of $px + qy$ on the ellipse is $\sqrt{p^2a^2 + q^2b^2}$, since $pa\cos t + qb\sin t$ is at most that by [[harmonic-addition|harmonic addition]]; for $x + y$ it is $\sqrt{a^2 + b^2}$.
- On the parabola $(2pt, pt^2)$, the chord joining parameters $t_1$ and $t_2$ has slope $\frac{t_1 + t_2}{2}$, and it passes through the focus $(0, p)$ exactly when $t_1t_2 = -1$.
- The squash from circle to ellipse multiplies every area by $\frac ba$, which is where the ellipse's area $\pi ab$ comes from.

## Applications
Optimizing an expression over the points of a conic, chords and tangents of a parabola, and describing a moving point on an ellipse or a hyperbola with one variable.

## Contest profile
AMC 12 and AIME: extreme values of a linear or quadratic expression on an ellipse, and parabola chord problems where the parameters of the endpoints carry the whole computation.
`,

"focal-radii": String.raw`
## Key forms
- $PF_1 = a + ex$, $PF_2 = a - ex$ — the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ with $F_1 = (-c, 0)$, $F_2 = (c, 0)$, and $e = \frac ca$
- $PF_1 = \lvert ex + a\rvert$, $PF_2 = \lvert ex - a\rvert$ — the hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$, which is $ex \pm a$ on the right branch
- $PF = \lvert y + p\rvert$ — the parabola $x^2 = 4py$ with focus $(0, p)$, which is $y + p$ when $p \gt 0$ (the parabola opens upward)
- $\frac{2b^2}{a}$ — the latus rectum of an ellipse or hyperbola, the focal chord perpendicular to the major axis

## Conditions
$P = (x, y)$ lies on the conic, which is in standard position. On the ellipse $c^2 = a^2 - b^2$; on the hyperbola $c^2 = a^2 + b^2$.

## Why it works
Each formula is the focus-directrix definition with the directrix written in. The ellipse has directrices $x = \pm\frac{a}{e}$, and the distance to a focus is $e$ times the distance to the matching directrix: $PF_2 = e\left(\frac{a}{e} - x\right) = a - ex$, and likewise $PF_1 = a + ex$. Adding them gives the constant sum $2a$.

The same result comes straight from coordinates. With $y^2 = b^2\left(1 - \frac{x^2}{a^2}\right)$, $$PF_1^2 = (x + c)^2 + y^2 = \frac{c^2}{a^2}x^2 + 2cx + a^2 = (a + ex)^2.$$ On the hyperbola the same computation gives $(ex + a)^2$, and on the parabola $x^2 + (y - p)^2 = 4py + (y - p)^2 = (y + p)^2$, whose square root is $\lvert y + p\rvert$ (for $x^2 = -4y$ the vertex is at distance $1$, not $-1$).

{{figure:radii}}

## Useful observations
- The nearest point of an ellipse to a focus is the near vertex, at distance $a - c$, and the farthest is the far vertex, at $a + c$.
- At $x = c$ the focal radius to the near focus is $a - \frac{c^2}{a} = \frac{b^2}{a}$ on the ellipse and $\frac{c^2}{a} - a = \frac{b^2}{a}$ on the hyperbola, half the latus rectum in both cases, so the latus rectum is $\frac{2b^2}{a}$ on both.
- The product of the two focal radii of an ellipse is $a^2 - e^2x^2$, largest at the ends of the minor axis, where both radii equal $a$.

## Applications
Distances from points of a conic to its foci, lengths of focal chords and the latus rectum, and distances in orbit problems where the sun sits at a focus.

## Contest profile
AMC 12 and AIME problems that give a focal distance and ask for a point, or ask for the length of a focal chord.
`,

"parabolic-segment-area": String.raw`
## Key forms
- $[\text{segment}] = \frac43[\triangle]$ — the triangle has the chord as base and its third vertex where the tangent is parallel to the chord, which is above the midpoint of the chord's $x$-interval
- $\frac{\lvert a\rvert (x_2 - x_1)^3}{6}$ — the area between $y = ax^2 + bx + c$ and a line crossing it at $x_1$ and $x_2$
- $\frac{\lvert a_1 - a_2\rvert (x_2 - x_1)^3}{6}$ — the area between two parabolas $y = a_1x^2 + \cdots$ and $y = a_2x^2 + \cdots$ that cross at $x_1$ and $x_2$
- $\frac{b^3}{3}$ — the area under $y = x^2$ from $0$ to $b$, the chord-and-triangle picture with no calculus

## Conditions
The parabola's axis is vertical, $y = ax^2 + bx + c$, and the line or the second parabola crosses it at two points $x_1 \lt x_2$. For a tilted parabola the $\frac43$ form still holds.

## Why it works
Archimedes filled the segment with triangles. Let the chord span the width $d = x_2 - x_1$, and let $T$ be the triangle with its third vertex $M$ above the midpoint. The parabola sits $\lvert a\rvert\left(\frac d2\right)^2$ away from the chord, measured vertically, at that midpoint, so $T = \frac12 \cdot d \cdot \frac{\lvert a\rvert d^2}{4} = \frac{\lvert a\rvert d^3}{8}$.

{{figure:exhaust}}

The two leftover pieces are segments of width $\frac d2$, so each new triangle has area $\frac{\lvert a\rvert (d/2)^3}{8} = \frac T8$, and the pair adds $\frac T4$. Repeating forever fills the segment with $$T\left(1 + \frac14 + \frac1{16} + \cdots\right) = \frac43 T = \frac{\lvert a\rvert d^3}{6}.$$

## Useful observations
- The area does not depend on where the chord sits or how it tilts, only on the leading coefficient and the width $x_2 - x_1$.
- The width comes from the quadratic the line and parabola produce: if $x_1$ and $x_2$ are its roots, $x_2 - x_1 = \frac{\sqrt{\Delta}}{\lvert a\rvert}$, so the area is $\frac{\Delta^{3/2}}{6a^2}$.
- The vertex of the inscribed triangle is where the tangent is parallel to the chord, at $x = \frac{x_1 + x_2}{2}$.

## Applications
Areas of regions bounded by a parabola and a line, or by two parabolas, without integration.

## Contest profile
AMC 12 and AIME area questions about regions cut from a parabola by a line, usually solved in one line once the crossing points are known.
`,

"triangle-congruence": String.raw`
## Key forms
- SSS — three pairs of equal sides
- SAS — two pairs of equal sides and the equal angles between them
- ASA — two pairs of equal angles and the equal sides between them
- AAS — two pairs of equal angles and a pair of equal sides opposite one of them
- HL — right triangles with equal hypotenuses and one pair of equal legs
- SSA — two sides and an angle opposite one of them; this can fit two triangles, the ambiguous case
- once two triangles are congruent, every pair of corresponding parts is equal

## Conditions
The matching parts must correspond: the equal angle in SAS must be the angle between the two equal sides, and in AAS the equal sides must sit opposite the same pair of equal angles.

## Why it works
Each criterion pins the triangle down completely. Two sides with a fixed angle between them fix the third vertex, so SAS works. Three sides fix every angle through the [[law-of-cosines|Law of Cosines]], so SSS works. A side with fixed angles at both ends gives two rays that meet at one point, which is ASA, and AAS reduces to ASA because the third angle is $180^\circ$ minus the other two. HL works because the [[pythagorean-theorem|Pythagorean Theorem]] fixes the third side, which makes it SSS.

SSA fails because the side opposite the given angle can swing: a circle around the far end of the known side can cross the other ray of the angle twice.

{{figure:ssa}}

## Useful observations
- SSA does determine the triangle when the side opposite the given angle is at least as long as the other given side, or when the given angle is right or obtuse.
- The criteria for similar triangles mirror these: SSS and SAS with proportional sides, and AA, since two equal angles force the third.
- Applying SAS or SSS to a triangle and its own mirror image proves that the base angles of an isosceles triangle are equal.

## Applications
Proving segments or angles equal, recognizing isosceles and symmetric figures, and deciding whether given data fix a triangle.

## Contest profile
A MATHCOUNTS and AMC 8 and 10 foundation, usually used silently to show two lengths or angles are equal; the ambiguous case appears when a problem asks how many triangles fit the data.
`,

"parallel-exterior-angles": String.raw`
## Key forms
- corresponding angles are equal, and alternate interior angles are equal — for a transversal across two parallel lines
- co-interior angles, on the same side between the lines, add up to $180^\circ$
- $\angle A + \angle B + \angle C = 180^\circ$ — the angle sum of a triangle
- $\angle ACD = \angle A + \angle B$ — the exterior angle at $C$, formed by extending $BC$ to $D$, equals the sum of the two remote interior angles
- $\angle APB = \angle(\ell, AP) + \angle(m, BP)$ — a path from $A$ on line $\ell$ to $B$ on a parallel line $m$, bending once at $P$ between them: the angle at the bend is the sum of the angles its two arms make with the parallels

## Conditions
The angle facts need the two lines to be parallel; the converses, which prove lines parallel, are on [[parallel-by-angle-sum|Proving Lines Parallel by Angle Sums]].

## Why it works
Through $C$ draw the line parallel to $AB$. The angle between it and $CA$ equals $\angle A$, as alternate angles, and the angle between it and the extension $CD$ equals $\angle B$, as corresponding angles. Together these two angles fill the exterior angle $ACD$, so $\angle ACD = \angle A + \angle B$. Since $\angle ACD$ and $\angle ACB$ together make a straight angle, $\angle A + \angle B + \angle ACB = 180^\circ$.

The same move, a parallel drawn through the vertex of the angle, also handles a zigzag: a path that leaves a point $A$ on a line $\ell$, bends at a point $P$, and ends at a point $B$ on a line $m$ parallel to $\ell$. Draw the line $n$ through $P$ parallel to both. It cuts $\angle APB$ into two parts. The part on the side of $\ell$ equals the angle $AP$ makes with $\ell$, as alternate angles across $AP$, and the part on the side of $m$ equals the angle $BP$ makes with $m$, as alternate angles across $BP$. So

$$\angle APB = \angle(\ell, AP) + \angle(m, BP).$$

This is the exterior-angle argument again. There, the parallel through $C$ split $\angle ACD$ into copies of the two remote angles; here, the parallel through $P$ splits the bend into copies of the two angles at the ends of the path. The figure is the worked example below, drawn with the line $n$ in place.

{{figure:zigzag}}

## Useful observations
- An exterior angle is larger than either remote interior angle.
- The exterior angles of any polygon, one at each vertex, add up to $360^\circ$, the [[polygon-angle-sums|polygon angle sum]] in another form.

## Applications
Finding unknown angles in figures with parallel lines and triangles, and proving lines parallel from angle information.

## Contest profile
A MATHCOUNTS and AMC 8 and 10 foundation, the rules every angle chase is built from.
`,

"triangle-similarity": String.raw`
## Key forms
- AA — two pairs of equal angles; the third pair is then equal too
- SAS — two pairs of sides in the same ratio, with equal angles between them
- SSS — all three pairs of sides in the same ratio
- $DE \parallel BC \Rightarrow \triangle ADE \sim \triangle ABC$ — a line parallel to one side, with $D$ on $AB$ and $E$ on $AC$, cuts off a similar triangle
- similar with ratio $k$ — every length scales by $k$ and every area by $k^2$

## Conditions
The vertices must correspond in order: $\triangle ADE \sim \triangle ABC$ pairs $A$ with $A$, $D$ with $B$, and $E$ with $C$. Two sides in proportion with an equal angle not between them can fit two different shapes, just as SSA fails for congruence.

## Why it works
Each test reduces to a congruence test after scaling. Scale the first triangle by the ratio $k$ of one pair of corresponding sides. For SAS and SSS the scaled copy then has the same sides and included angle, or the same three sides, as the second triangle, so the two are congruent by SAS or SSS, and the original triangles have the same shape. For AA, scale so that the side between the two equal angles matches; ASA makes the copy congruent to the second triangle.

A line parallel to $BC$ makes corresponding angles with $AB$ and $AC$, so $\angle ADE = \angle ABC$ and $\angle AED = \angle ACB$, and AA applies.

## Useful observations
- AA is the test contests use most, because equal angles come for free from parallel lines, inscribed angles, and shared angles.
- The [[altitude-hypotenuse|altitude to the hypotenuse]] of a right triangle splits it into two triangles similar to the whole.
- Corresponding altitudes, medians, angle bisectors, inradii, and circumradii all scale by the same ratio $k$, and areas by $k^2$.
- Two chords crossing inside a circle cut off similar triangles, which is where [[power-of-a-point|Power of a Point]] comes from.

## Applications
Finding unknown lengths from a known ratio, proving proportions, and comparing areas of figures of the same shape.

## Contest profile
The most-used tool in AMC 8, 10, and 12 geometry, almost always through AA from parallel lines or inscribed angles.
`,

"trapezoid-consecutive-angles": String.raw`
## Key forms
- $\angle A + \angle D = 180^\circ$ and $\angle B + \angle C = 180^\circ$ — in trapezoid $ABCD$ with bases $AB \parallel DC$ and legs $AD$ and $BC$
- conversely, if $\angle A + \angle D = 180^\circ$ in quadrilateral $ABCD$, then $AB \parallel DC$

## Conditions
The angles must be the two at the ends of the same leg, which are consecutive angles of the quadrilateral; the angles at the ends of a base need not add to $180^\circ$.

## Why it works
The leg $AD$ crosses the parallel lines $AB$ and $DC$, and $\angle A$ and $\angle D$ are the two interior angles on the same side of it, so they add to $180^\circ$; the same holds along $BC$.

## Useful observations
- A parallelogram is a trapezoid twice over, so every pair of its consecutive angles adds to $180^\circ$.
- The four angles of a trapezoid add to $360^\circ$, two pairs of $180^\circ$.
- The test for parallel sides is the same fact read backward, as on [[parallel-by-angle-sum|Proving Lines Parallel by Angle Sums]].

## Applications
Finding the angles of trapezoids and parallelograms, and recognizing parallel sides in a quadrilateral from its angles.

## Contest profile
A MATHCOUNTS and AMC 8 and 10 fact, usually one step in an angle or area computation on a trapezoid.
`,

"parallel-by-angle-sum": String.raw`
## Key forms
- co-interior angles adding to $180^\circ$ $\Rightarrow$ the lines are parallel
- equal alternate interior angles, or equal corresponding angles $\Rightarrow$ the lines are parallel
- $\measuredangle(\ell, t) = \measuredangle(m, t) \pmod{180^\circ} \iff \ell \parallel m$ — the directed-angle form, with no cases

## Conditions
The two angles must be at the two crossing points of one transversal, on the same side of it and between the two lines. In the directed form, angles are measured from the transversal to each line in the same rotational direction.

## Why it works
Suppose the co-interior angles add to $180^\circ$ but the lines meet at a point $P$. Then the transversal and the two lines form a triangle whose angles at the crossing points already add to $180^\circ$, which leaves nothing for the angle at $P$, so no such point exists and the lines are parallel. Equal alternate angles say the same thing, since an angle and its neighbor on a line add to $180^\circ$.

Directed angles remove the "same side" bookkeeping: the rotation from $t$ to $\ell$ and the rotation from $t$ to $m$ agree modulo $180^\circ$ exactly when $\ell$ is $m$ moved without turning.

## Useful observations
- In quadrilateral $ABCD$, $\angle A + \angle B = 180^\circ$ means $AD \parallel BC$, the converse half of [[trapezoid-consecutive-angles|Consecutive Angles of a Trapezoid]].
- The forward direction, from parallel lines to angle facts, is on [[parallel-exterior-angles|Parallel Lines & the Exterior Angle Theorem]].
- In an olympiad proof, writing the test as $\measuredangle(\ell, t) = \measuredangle(m, t)$ makes it hold in every configuration of the figure at once.

## Applications
Showing that two lines in a figure are parallel, recognizing trapezoids and parallelograms from their angles, and parallelism steps in angle chases.

## Contest profile
A MATHCOUNTS and AMC 8 and 10 tool in its undirected form, and in its directed form a standard line in olympiad angle chases.
`,

"gliding-principle": String.raw`
## Key forms
- if $F$ and $F'$ are directly similar and $P = (1 - \lambda)X + \lambda X'$ for every pair of corresponding points $X$, $X'$, then the points $P$ form a figure directly similar to $F$, or all coincide
- $\frac{AP}{AA'} = \frac{BQ}{BB'} = \frac{CR}{CC'} \Rightarrow \triangle PQR \overset{+}{\sim} \triangle ABC$ — the triangle case
- the midpoints of $AA'$, $BB'$, $CC'$ for directly similar triangles $ABC$ and $A'B'C'$ form a directly similar triangle, or a single point
- if $X(t)$ and $Y(t)$ move along lines at constant velocities, then $(1 - \lambda)X(t) + \lambda Y(t)$ moves along a line at constant velocity, or stays still

## Conditions
The two figures must be directly similar, related by a rotation and a scaling with no reflection. For oppositely similar figures the division points need not form a similar figure.

## Why it works
In complex numbers a direct similarity is a map $X' = sX + t$ for fixed complex numbers $s \ne 0$ and $t$. Then $$P = (1 - \lambda)X + \lambda X' = (1 - \lambda + \lambda s)X + \lambda t,$$ which is again a map of the same form, a direct similarity applied to $X$, so the points $P$ form a copy of $F$ rotated and scaled. If the multiplier $1 - \lambda + \lambda s$ is $0$, every $P$ equals $\lambda t$ and the figure collapses to one point.

The moving-point form is the same algebra in time: with $X(t) = X_0 + tu$ and $Y(t) = Y_0 + tv$, the point $(1 - \lambda)X(t) + \lambda Y(t) = \left((1 - \lambda)X_0 + \lambda Y_0\right) + t\left((1 - \lambda)u + \lambda v\right)$ moves with a constant velocity.

{{figure:moving}}

## Useful observations
- Two equilateral triangles with the same orientation have the midpoints of their corresponding vertices forming another equilateral triangle, or a single point.
- When $F'$ is $F$ rotated about a point $O$, the division points form $F$ rotated and scaled about $O$, which locates the center of a [[spiral-similarity|spiral similarity]].
- In locus problems, two points moving uniformly on fixed lines make every point in a fixed ratio between them trace a line, so the locus is found from two positions.

## Applications
Olympiad configurations built from directly similar figures, and loci of points defined by fixed ratios between moving points.

## Contest profile
An olympiad tool that turns a claim about many division points into one similarity, usually proved in one line with complex numbers.
`,

"axis-stretch-area": String.raw`## Key forms
- $(x, y) \mapsto (x, ky)$ — stretching the $y$-direction by $k$ multiplies the area of every region by $|k|$
- $(x, y) \mapsto (px, qy)$ — stretching both axes multiplies every area by $|pq|$
- $\dfrac{[S']}{[T']} = \dfrac{[S]}{[T]}$ — the ratio of the areas of any two regions does not change
- $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ is the unit circle stretched by $a$ and $b$, so its area is $\pi ab$
- in space, stretching one axis by $k$ multiplies every volume by $|k|$, so the ellipsoid with semi-axes $a$, $b$, $c$ has volume $\frac43\pi abc$

## Conditions
The stretch is by a constant factor along one fixed direction (a coordinate axis, or any line direction), and the other coordinate is untouched. A negative factor also flips the figure and still multiplies area by $|k|$. The region can be any shape that has an area.

## Why it works
Cut the region into thin strips parallel to the stretched direction. Each strip is, to as fine an approximation as you like, a rectangle whose side along the stretch grows by $k$ and whose other side stays the same, so its area is multiplied by $k$. Adding the strips up multiplies the whole area by $k$. In integral form, a region with height $h(x)$ above each $x$ has area $\int h(x)\,\mathrm{d}x$, and the stretched region has height $kh(x)$, so its area is $\int kh(x)\,\mathrm{d}x = k\int h(x)\,\mathrm{d}x$.

The same slicing is the idea behind [[cavalieris-principle|Cavalieri's Principle]]: areas, and volumes, are determined by what happens along one direction, so a stretch in that direction scales them by that factor. Stretching both axes is two stretches in a row, which multiplies the area by $p$ and then by $q$. For a general linear map the factor is the absolute value of the determinant, and a stretch is the case of a diagonal matrix.

## Useful observations
- A circle of radius $a$ stretched vertically by $\frac ba$ becomes the ellipse with semi-axes $a$ and $b$, and its area $\pi a^2 \cdot \frac ba = \pi ab$ is the proof of the ellipse's area formula.
- Because every area is scaled by the same factor, any question about a ratio of areas inside an ellipse has the same answer for the circle it came from. In particular the largest triangle inscribed in an ellipse is the image of an equilateral triangle in a circle, with area $\frac{3\sqrt3}{4}ab$, and the largest inscribed rectangle is the image of a square, with area $2ab$.
- A stretch keeps lines straight, parallel lines parallel, and ratios along each line, so midpoints, centroids, and tangency carry over. It does not keep lengths in other directions, angles, or circles, so a perpendicularity or a distance in the problem is not preserved. This is the reasoning behind [[affine-transformations|the affine-transformation method]].
- A shear $(x, y) \mapsto (x + ty, y)$ moves points sideways but keeps every area, which is why a triangle can slide its apex along a line parallel to its base.

## Applications
Areas and volumes of ellipses and ellipsoids, area ratios and extremal figures inside an ellipse, and area computations that become easy after turning an ellipse into a circle.

## Contest profile
Used on AIME problems about an ellipse and an inscribed or circumscribed figure, where it turns a hard area ratio into a circle computation.
`,

"brocards-theorem": String.raw`
## Key forms
- the three diagonal points $E = AB \cap CD$, $F = AD \cap BC$, $G = AC \cap BD$ of a cyclic quadrilateral form a triangle whose orthocenter is the circumcenter $O$: $OE \perp FG$, $OF \perp EG$, $OG \perp EF$
- each diagonal point is the pole of the line through the other two, so $EFG$ is its own polar triangle
- $\vec{OE} \cdot \vec{OF} = R^2$, and so $EF^2 = EO^2 + FO^2 - 2R^2 = EA \cdot EB + FA \cdot FD$

## Conditions
$A$, $B$, $C$, $D$ are four distinct points on a circle with center $O$ and radius $R$, and no two opposite sides are parallel, so that $E$, $F$, $G$ exist. The quadrilateral need not be convex. The last length form uses $E$ and $F$ outside the circle, as they are when $ABCD$ is convex.

## Why it works
The proof shows that the polar of $E$ is the line $FG$. The same argument then applies to $F$ and $G$, and a polar is always perpendicular to the line from the center to its pole.

Step 1, a harmonic range. Let line $FG$ meet $AB$ at $H$. In triangle $FAB$ the points $D$ and $C$ lie on $FA$ and $FB$, so $AC$ and $BD$ are cevians meeting at $G$, and $FH$ is the third cevian. By [[cevas-theorem|Ceva's Theorem]], with signed ratios, $$\frac{AH}{HB}\cdot\frac{BC}{CF}\cdot\frac{FD}{DA} = 1.$$

Line $DC$ crosses the same triangle and meets $AB$ at $E$, so [[menelaus-theorem|Menelaus' Theorem]] gives $$\frac{AE}{EB}\cdot\frac{BC}{CF}\cdot\frac{FD}{DA} = -1.$$

Dividing the first line by the second, $\dfrac{AH}{HB} = -\dfrac{AE}{EB}$. So $H$ and $E$ divide $AB$ in the same ratio, one internally and one externally: they are harmonic conjugates with respect to $A$ and $B$.

Step 2, $H$ is on the polar of $E$. By [[pole-polar|the pole and polar facts]], a secant from $E$ meets the circle at $A$ and $B$ and meets the polar of $E$ at the harmonic conjugate of $E$ with respect to $A$ and $B$. That point is unique, so it is $H$, and $H$ lies on the polar of $E$.

Step 3, the whole line. Repeating Steps 1 and 2 with line $CD$ shows that $H' = FG \cap CD$ also lies on the polar of $E$. The points $H$ and $H'$ are different, since a common point of $AB$ and $CD$ would be $E$, and $E$ is not on its own polar. Two points fix the line: $$\text{polar of } E = FG.$$

Step 4, the right angle. The polar of $E$ is the set of points $Q$ with $\vec{OE} \cdot \vec{OQ} = R^2$. All of them have the same component along $OE$, so the polar is perpendicular to $OE$, and $OE \perp FG$.

Step 5, the other two points. Swapping $B$ and $D$ exchanges $E$ and $F$ and keeps $G$, so the same proof gives $OF \perp EG$. Swapping $B$ and $C$ exchanges $E$ and $G$ and keeps $F$, so $OG \perp EF$. Then $O$ lies on the altitudes from $E$, $F$, and $G$, which makes it the orthocenter of $EFG$.

The length form comes from $F$ lying on the polar of $E$, which says $\vec{OE} \cdot \vec{OF} = R^2$. Then $$EF^2 = \lvert\vec{OE} - \vec{OF}\rvert^2 = EO^2 + FO^2 - 2R^2 = (EO^2 - R^2) + (FO^2 - R^2).$$ For $E$ and $F$ outside the circle each bracket is a power of a point, $EA \cdot EB$ and $FA \cdot FD$.

## Useful observations
- To locate a diagonal point, find the pole of the line through the other two: the pole of $\{px + qy = k\}$ for the circle $x^2 + y^2 = R^2$ is $\left(\frac{pR^2}{k}, \frac{qR^2}{k}\right)$.
- Two diagonal points $E$ and $F$ are conjugate: $\vec{OE} \cdot \vec{OF} = R^2$ is the whole condition for $F$ to lie on the polar of $E$.
- A right angle at $O$ never appears directly. What is perpendicular is the line from $O$ to a diagonal point and the opposite side of the diagonal triangle.

## Applications
Perpendicularity in a cyclic quadrilateral with its opposite sides and diagonals extended, finding one diagonal point from the other two, and lengths such as $EF^2$ from the powers of two points.

## Contest profile
Olympiad geometry, in figures with a cyclic quadrilateral whose opposite sides and diagonals are all extended. It turns three extra intersection points into a single triangle whose orthocenter is already known, and it replaces an angle chase with a pole and polar argument.
`,

"parallel-lines-distance": String.raw`
## Key forms
- $d = \dfrac{\lvert c_1 - c_2\rvert}{\sqrt{a^2 + b^2}}$ for the parallel lines $ax + by + c_1 = 0$ and $ax + by + c_2 = 0$, with the coefficients of $x$ and $y$ identical
- $d = \dfrac{\lvert k_1 - k_2\rvert}{\sqrt{1 + m^2}}$ for the lines $y = mx + k_1$ and $y = mx + k_2$
- $d = \dfrac{\lvert d_1 - d_2\rvert}{\sqrt{a^2 + b^2 + c^2}}$ for the parallel planes $ax + by + cz + d_1 = 0$ and $ax + by + cz + d_2 = 0$
- The line halfway between them is $ax + by + \dfrac{c_1 + c_2}{2} = 0$

## Conditions
The lines must be parallel, which means the coefficients of $x$ and $y$ are proportional. The formula needs them equal, so one equation is multiplied through by the right constant first; skipping that step gives a wrong distance with no sign that anything went wrong. Lines that are not parallel meet, and their distance is $0$.

## Why it works
Take any point $(x_0, y_0)$ on the first line, so that $ax_0 + by_0 = -c_1$. The distance between the lines is the distance from that point to the second line, and [[point-line-distance|Point-to-Line Distance]] gives $$\frac{\lvert ax_0 + by_0 + c_2\rvert}{\sqrt{a^2 + b^2}} = \frac{\lvert -c_1 + c_2\rvert}{\sqrt{a^2 + b^2}}.$$ The choice of point does not matter, because every point of the first line is the same distance from the second.

The slope form is the special case $mx - y + k = 0$, with $a = m$ and $b = -1$. The plane form is the same argument with the point-to-plane distance, since every point of one plane is the same distance from the other. The halfway line is the set of points whose two values $ax + by + c_1$ and $ax + by + c_2$ are opposite in sign and equal in size, which is $ax + by + \frac{c_1 + c_2}{2} = 0$.

## Useful observations
- The distance is also the shortest segment joining the two lines, so a question about the least possible $PQ$ with $P$ on one line and $Q$ on the other is answered by $d$, attained along the common perpendicular.
- Two parallel tangent lines to a circle of radius $r$ are $2r$ apart and the center lies on the line halfway between them, which turns a question about a circle between two lines into the equation $\lvert c_1 - c_2\rvert = 2r\sqrt{a^2 + b^2}$, with the circle given by [[circle-equation|Equation of a Circle]].
- The slope form needs no rewriting when both lines are already given as $y = mx + k$, and the factor $\sqrt{1 + m^2}$ is the length of a step along the line for a run of $1$.

## Applications
The width of a strip, the radius of a circle squeezed between two parallel lines, and the least distance between two points constrained to parallel lines.

## Contest profile
This is a reading of an equation more than a result to recall: it appears when two parallel lines are given in coordinates and the question asks for a width, a radius, or a height of a trapezoid or parallelogram with those lines as sides. It saves the foot-of-the-perpendicular computation, and the one way it fails is the unmatched coefficients.
`,

"vector-bash": String.raw`
## When to use
Figures defined by ratios along segments, midpoints and centroids, parallelograms and their diagonals, and any question that asks for a ratio in which two lines meet. Perpendicularity, angles, and lengths in terms of given side lengths and angles are the other signal, since a dot product needs no coordinates. It is the natural choice in three dimensions, where a box or a tetrahedron has no convenient set of axes except along its own edges. When the figure already has a right angle, ordinary coordinates are shorter.

## How
1. Put the origin at the point where the most lines meet, usually a vertex, and name two non-parallel vectors that span the plane, for example $\vec b$ and $\vec c$ along two sides. In space use three non-coplanar vectors. Every other point is a combination of these.
2. Write division points as weighted averages. The point $P = A + t(B - A) = (1 - t)A + tB$ lies on line $AB$, the midpoint of $AB$ is $\frac{A + B}{2}$, and the centroid of $ABC$ is $\frac{A + B + C}{3}$.
3. To intersect two lines, write the intersection point in terms of each line with a different parameter and equate coefficients of the basis vectors, which is allowed because independent vectors have unique coefficients.
4. For perpendicularity and angles, use $\vec u \cdot \vec v = \lvert\vec u\rvert\lvert\vec v\rvert\cos\theta$ with the lengths of the basis vectors and their dot product as the only data. Areas come from $\frac12\lvert\vec u \times \vec v\rvert$.
5. Read the ratio or the length off the coefficients, and check which segment each ratio refers to.

In triangle $ABC$ with $A$ as the origin, let $\vec b = \overrightarrow{AB}$ and $\vec c = \overrightarrow{AC}$, let $M$ be the midpoint of $BC$, and let $D$ be on $AC$ with $AD : DC = 1 : 3$. Then $M = \frac{\vec b + \vec c}{2}$ and $D = \frac{\vec c}{4}$. A point on $AM$ is $s\,\frac{\vec b + \vec c}{2}$ and a point on $BD$ is $(1 - t)\vec b + \frac t4\vec c$. Matching coefficients gives $\frac s2 = 1 - t$ and $\frac s2 = \frac t4$, so $t = \frac45$ and $s = \frac25$: the lines $AM$ and $BD$ meet at the point $\frac25$ of the way from $A$ to $M$, so $AP : PM = 2 : 3$.

{{figure:intersect}}

## Why it works
A point of the plane is determined by its position vector from the origin, and two non-parallel vectors $\vec b$ and $\vec c$ give every other vector exactly one expression $x\vec b + y\vec c$. That uniqueness is why two expressions for the same point can be compared coefficient by coefficient, and it turns an intersection of lines into two linear equations. A point $P = A + t(B - A)$ divides $AB$ in the ratio $t : (1 - t)$ measured from $A$, so ratios along a segment appear directly as coefficients.

The dot product carries the metric, because $\lvert\vec u\rvert^2 = \vec u \cdot \vec u$ and $\cos\theta = \frac{\vec u \cdot \vec v}{\lvert\vec u\rvert\lvert\vec v\rvert}$, and it is bilinear, so $\lvert\vec u + \vec v\rvert^2 = \lvert\vec u\rvert^2 + 2\,\vec u \cdot \vec v + \lvert\vec v\rvert^2$. Only the side lengths and the angle between the basis vectors are needed, never coordinates. Areas scale in the same way: in the plane, the area of the triangle on $x_1\vec b + y_1\vec c$ and $x_2\vec b + y_2\vec c$ is $\lvert x_1y_2 - x_2y_1\rvert$ times the area of the triangle on $\vec b$ and $\vec c$.

## Formulas it uses
- [[vector-dot-product]]: $\vec u \cdot \vec v = \lvert\vec u\rvert\lvert\vec v\rvert\cos\theta$, which tests perpendicularity and finds angles and lengths from the basis data.
- [[cross-product-area]]: $\frac12\lvert\vec u \times \vec v\rvert$ for the area of a triangle, and the triple product for a volume.
- [[section-formula]]: the weighted average $\frac{nA + mB}{m + n}$ for the point dividing $AB$ in the ratio $m : n$.

## Common traps
- Using two basis vectors that are parallel, or three in the plane, so the coefficients stop being unique.
- Mixing a position vector with a displacement, or reading a ratio from the wrong end: $\overrightarrow{AB} = B - A$ is the same as $B$ only when $A$ is the origin, and $P = (1 - t)A + tB$ is $t$ of the way from $A$ to $B$, so $AP : PB = t : (1 - t)$.
- Forgetting that $\vec b \cdot \vec c$ has to be computed from the lengths and the angle before the dot product can be used.
- Reaching for vectors in a figure that already has perpendicular sides, where axes are shorter.

## Contest profile
The ratio-and-midpoint figures are where it earns its place: a line through a midpoint and a point on another side, a centroid, a parallelogram with a marked point, a question about where two cevians meet. It competes with mass points on ratio problems and with coordinates elsewhere, and its edge over both is that no axis has to fit the figure and the answer comes from the coefficients.
`,

"tangent-lines-from-point": String.raw`
## When to use
A circle is given by an equation and a line through a particular point is required to touch it: the tangents from an outside point, the tangent at a point on the circle, the angle between two tangents, or the points of contact. It is the right tool when the circle is not centered at a convenient place, since the distance condition does not care where the center is. When only the length of the tangent segment is asked, the right triangle with the radius is shorter and no slope is needed.

## How
1. Compare the distance from the point to the center with the radius. Greater means two tangents, equal means one, and smaller means none.
2. Write the line through $(p, q)$ as $y - q = m(x - p)$, that is $mx - y + (q - mp) = 0$.
3. Set the distance from the center $(h, k)$ to this line equal to the radius: $\dfrac{\lvert mh - k + q - mp\rvert}{\sqrt{m^2 + 1}} = r$. Square both sides to get an equation in $m$.
4. Solve for $m$. Two roots are the two tangents, and the equation can drop to first degree, which means one tangent is the vertical line $x = p$, so test that line on its own: it is tangent exactly when $\lvert p - h\rvert = r$.
5. If the points of contact are needed, each is the foot of the perpendicular from the center to its tangent.

For the circle with center $(3, 0)$ and radius $2$, the point $(0, 0)$ is $3$ from the center, which is more than $2$, so there are two tangents $y = mx$. The condition is $\frac{\lvert 3m\rvert}{\sqrt{m^2 + 1}} = 2$, so $9m^2 = 4m^2 + 4$ and $m = \pm\frac{2}{\sqrt5}$.

## Why it works
The radius to a point of tangency is perpendicular to the tangent, so the distance from the center to a tangent line is the radius. Conversely, a line whose distance from the center is the radius touches the circle at the foot of the perpendicular and meets it nowhere else, since every other point of the line is farther from the center. The condition is therefore equivalent to tangency, and [[point-line-distance|Point-to-Line Distance]] writes it as an equation.

The equation for $m$ has the same count as the geometry. Squaring gives a quadratic that is at most second degree in $m$, so at most two slopes, and its discriminant is positive, zero, or negative according to whether the point is outside the circle, on it, or inside it. The one line a slope cannot describe is the vertical one, which is why it is tested separately. The tangent segment from the point to the touch point has length $\sqrt{d^2 - r^2}$, where $d$ is the distance from the point to the center, by the right angle at the touch point, as in [[tangent-facts|Tangent Line Facts]].

## Formulas it uses
- [[point-line-distance]]: the distance from the center to the line, $\frac{\lvert Ax_0 + By_0 + C\rvert}{\sqrt{A^2 + B^2}}$, which is set equal to the radius.
- [[circle-equation]]: the center $(h, k)$ and the radius $r$ read from $(x - h)^2 + (y - k)^2 = r^2$.

## Common traps
- Losing the vertical tangent: the form $y - q = m(x - p)$ cannot describe it, and the squared equation then has only one root in $m$ where there should be two.
- Writing the line in a form with the constant wrong; $y - q = m(x - p)$ becomes $mx - y + (q - mp) = 0$, and the sign of $q - mp$ is the one most often flipped.
- Forgetting the absolute value before squaring.
- Applying it to a point inside the circle, where no real slope satisfies the equation.

## Contest profile
A coordinate-geometry step that appears when a tangent from a point is asked for outright, and, more often, inside a larger problem where the slope of a tangent is the extreme value of something. It replaces setting a discriminant to zero with a cleaner distance equation, and it pairs with the slope reading of a ratio of differences.
`,

"isosceles-trapezoid": String.raw`
## Distinguishing clues
- Equal legs, equal base angles, or equal diagonals in a trapezoid.
- Four vertices on a circle with two parallel sides: a trapezoid inscribed in a circle is always isosceles, and a cyclic quadrilateral with two parallel sides is an isosceles trapezoid or a rectangle, the limiting case.
- Three equal sides and a longer fourth side; when the longer side is twice the others the base angles are $60^\circ$ and the figure is half of a regular hexagon.
- Not this pattern: a figure with a pair of equal legs that can also be a parallelogram, which the problem usually distinguishes.

{{figure:legs}}

## Methods and Formulas to Try
Call the bases $B > b$ and the legs $\ell$. The perpendiculars from the ends of the shorter base cut off two congruent right triangles, each with a horizontal leg $\frac{B - b}{2}$, so $$h = \sqrt{\ell^2 - \left(\tfrac{B - b}{2}\right)^2}, \qquad \text{area} = \tfrac{B + b}{2}\,h, \qquad d^2 = \ell^2 + Bb,$$ where $d$ is either diagonal. The last equation is Ptolemy's relation for the cyclic quadrilateral, $d \cdot d = \ell \cdot \ell + B \cdot b$.

### Methods to try
- [[extend-sides-to-meet]]: the legs meet at an apex, which makes an isosceles triangle similar to the one cut off by the shorter base, in the ratio $b : B$.
- [[parallel-line-similarity]]: a line through an end of the shorter base parallel to a leg cuts off a parallelogram and an isosceles triangle with sides $\ell$, $\ell$, and $B - b$.
- [[coordinate-bash]]: with the longer base on the $x$-axis and the figure symmetric about the $y$-axis, the vertices are $\left(\pm\frac B2, 0\right)$ and $\left(\pm\frac b2, h\right)$.

### Formulas to try
- [[ptolemys-theorem]]: the product of the diagonals equals the sum of the products of opposite sides, so each diagonal satisfies $d^2 = \ell^2 + Bb$.
- [[trapezoid-parallelogram-areas]]: the area as the average of the bases times the height.
- [[trapezoid-consecutive-angles]]: the two angles at the ends of one leg add to $180^\circ$, so the base angles at the longer base are equal and acute.
- [[pythagorean-theorem]]: the height from the leg and the half-difference of the bases.

## Common traps
- Using $B - b$ instead of the half-difference $\frac{B - b}{2}$ in the right triangle.
- Assuming the diagonals are perpendicular; they are equal, and perpendicular only for one special height.
- Applying Ptolemy's relation to a trapezoid whose legs are not equal, which is not cyclic.
- Placing the foot of a perpendicular outside the base when the base angle is obtuse at the shorter base.

## Contest profile
A frequent AMC figure, stated outright or hidden as a cyclic trapezoid. The right triangles at the ends do most of the work, the equal diagonals and the circle come as a bonus, and the extended legs are the route when a ratio of the bases is given.
`,

"parallelogram-area": String.raw`
## Key forms
- $A = bh$ — the base times the perpendicular height; the height is measured between the two parallel sides, not along a slanted side
- $A = ab\sin\theta$ — two adjacent sides and the angle $\theta$ between them, with $\theta$ either angle of the parallelogram
- $A = \lvert\vec u \times \vec v\rvert$ — two adjacent sides as vectors, which in coordinates is $\lvert x_1y_2 - x_2y_1\rvert$
- $ah_a = bh_b$ — either pair of sides can be the base, so the heights to the two sides are in the inverse ratio of the sides

## Conditions
The base and the height belong to the same pair of parallel sides, and the height is perpendicular to them. For $ab\sin\theta$ the two sides are adjacent, so that $\theta$ is the angle between them.

## Why it works
Cut a right triangle off one slanted end of the parallelogram and slide it to the other end. The slide turns the parallelogram into a rectangle with the same base $b$ and the same height $h$, so the two shapes have the same area, $bh$.

{{figure:cut}}

For the sine form, draw the height from an end of the top side down to the base. It is a leg of a right triangle with hypotenuse $b$ and angle $\theta$ at the base, so $h = b\sin\theta$ and $bh$ becomes $ab\sin\theta$ when $a$ is the base. The two angles of a parallelogram add to $180^\circ$ and $\sin(180^\circ - \theta) = \sin\theta$, so it does not matter which one is used. The vector form is the same statement, since $\lvert\vec u \times \vec v\rvert = \lvert\vec u\rvert\lvert\vec v\rvert\sin\theta$.

## Useful observations
- A diagonal cuts the parallelogram into two congruent triangles of area $\frac12 ab\sin\theta$, and the two diagonals cut it into four triangles of equal area.
- A triangle on one side of a parallelogram with its third vertex anywhere on the opposite side has half its area, since only the base and the height matter and not where the vertex sits.
- A rectangle is the case $\theta = 90^\circ$, with area $ab$, and a rhombus of side $s$ is the case $a = b = s$, with area $s^2\sin\theta$.
- The diagonal form of the area, $\frac12 d_1 d_2\sin\varphi$, holds for every quadrilateral and is on [[quadrilateral-diagonal-area|Quadrilateral Area from Diagonals]]; for a parallelogram the diagonals bisect each other, which gives the four equal triangles above.

## Applications
Areas of parallelograms, rectangles, and rhombi, heights to the two sides of a parallelogram, and areas of triangles that share a base and a height with one.

## Contest profile
Seldom the whole problem. It enters when a slanted figure is replaced by a rectangle, when a height to one side has to be traded for a height to the other, or when two sides and the angle between them are the only data given.
`,

"parallelogram-vertices": String.raw`
## Key forms
- $A + C = B + D$ — in a parallelogram $ABCD$, opposite vertices have the same sum, which says the diagonals share a midpoint
- $D = A + C - B$ — the fourth vertex from three consecutive ones, equivalently $\overrightarrow{AB} = \overrightarrow{DC}$
- three points $A$, $B$, $C$ in no stated order are three vertices of exactly three parallelograms, with fourth vertices $A + C - B$, $A + B - C$, and $B + C - A$
- the center is $\frac{A + C}{2} = \frac{B + D}{2}$

## Conditions
The vertices are listed in order around the figure, so that $AC$ and $BD$ are the diagonals. The three given points are not collinear; otherwise the figure is flat.

## Why it works
$ABCD$ is a parallelogram exactly when $AB$ and $DC$ are equal and parallel with the same direction, that is, when $B - A = C - D$. Rearranging gives $A + C = B + D$. Halving both sides says that the midpoint of $AC$ is the midpoint of $BD$, the familiar fact that the diagonals of a parallelogram bisect each other.

The argument runs in both directions, so $A + C = B + D$ also proves that four points form a parallelogram. The three fourth vertices for three given points come from choosing which given point is opposite the new one.

## Useful observations
- The three candidates $A + C - B$, $A + B - C$, and $B + C - A$ are the vertices of the triangle whose sides have $A$, $B$, $C$ as their midpoints, the [[anticomplementary-triangle|Anticomplementary Triangle]] of $ABC$.
- The same relation holds with complex numbers or in space, so no coordinates are needed: only the three position vectors are added and subtracted.
- Once the fourth vertex is known, its area is the absolute value of the cross product of two adjacent sides, as in [[parallelogram-area|Parallelogram Area]].

## Applications
Missing vertices of parallelograms in the coordinate plane and in space, and testing whether four points form a parallelogram.

## Contest profile
A quiet coordinate step: a problem gives three vertices of a parallelogram and a count, an area, or a distance is wanted for the fourth, and the point of the relation is that it avoids solving for the fourth vertex by equations.
`,

"regular-octagon": String.raw`
## Key forms
- $A = 2(1 + \sqrt2)s^2$ — the area of a regular octagon of side $s$, which is $2\sqrt2R^2$ in terms of the circumradius $R$
- width across two parallel sides $(1 + \sqrt2)s$, so the apothem is $\frac{(1 + \sqrt2)s}{2}$
- $R = \frac{s}{2}\sqrt{4 + 2\sqrt2}$ — the circumradius
- diagonals: $s\sqrt{2 + \sqrt2}$ skipping one vertex, $(1 + \sqrt2)s$ skipping two, and $s\sqrt{4 + 2\sqrt2} = 2R$ through the center
- interior angle $135^\circ$, exterior angle $45^\circ$

## Conditions
The octagon is regular. An octagon cut from a square by four equal cuts has all angles $135^\circ$ but is regular only for the cut that makes the new sides equal to what is left of the old ones.

## Why it works
Extend four alternate sides until they meet. The result is a square, and what the octagon lacks is four right isosceles triangles at its corners, each with hypotenuse $s$ and legs $\frac{s}{\sqrt2}$. The square's side is $s + 2 \cdot \frac{s}{\sqrt2} = (1 + \sqrt2)s$, which is the width, and the area is the square minus the corners: $$(1 + \sqrt2)^2s^2 - 4 \cdot \frac12 \cdot \frac{s^2}{2} = (3 + 2\sqrt2)s^2 - s^2 = 2(1 + \sqrt2)s^2.$$

{{figure:square}}

The circumradius comes from the central angle of $45^\circ$: $s = 2R\sin 22.5^\circ$ with $\sin 22.5^\circ = \frac{\sqrt{2 - \sqrt2}}{2}$, which gives $R = \frac s2\sqrt{4 + 2\sqrt2}$. The chord between vertices $k$ steps apart is $2R\sin\frac{k\pi}{8}$, and $k = 2, 3, 4$ give the three diagonals above. The area as eight triangles with apex angle $45^\circ$ is $\frac12 \cdot 8R^2\sin 45^\circ = 2\sqrt2R^2$.

## Useful observations
- The width $(1 + \sqrt2)s$ is the distance across two parallel sides, and it equals the diagonal skipping two vertices; the distance across opposite vertices is the longer $2R$.
- The eight vertices are those of two squares with the same center turned by $45^\circ$ from each other, so an octagon problem is often a problem about a square and its rotated copy.
- The area $2(1 + \sqrt2)s^2$ is also the area of the square with corners cut, so an octagon cut from a square of side $w$ has side $s = \frac{w}{1 + \sqrt2} = (\sqrt2 - 1)w$.

## Applications
Areas, widths, and diagonals of regular octagons, and octagons formed by cutting the corners of a square.

## Contest profile
A less common figure than the hexagon, but a square with its corners cut off is a standard source of areas. The square around the octagon is the usual route to its side, its width, and its area.
`,

"cube": String.raw`
## Key forms
- face diagonal $s\sqrt2$ and space diagonal $s\sqrt3$ — the box formulas with three equal edges
- $V = s^3$ and surface area $6s^2$
- the inscribed sphere has radius $\frac s2$, the sphere touching the edges $\frac{s\sqrt2}{2}$, and the circumscribed sphere $\frac{s\sqrt3}{2}$
- a space diagonal and an edge make an angle with $\cos\theta = \frac{1}{\sqrt3}$ ($\approx 54.7^\circ$), a space diagonal and a face an angle with $\cos\theta = \sqrt{\frac23}$ ($\approx 35.3^\circ$), and two space diagonals an angle with $\cos\theta = \frac13$ ($\approx 70.5^\circ$)
- the plane through the three vertices adjacent to a vertex $A$ is $\frac{s}{\sqrt3}$ from $A$, a third of the space diagonal, and cuts off a corner of volume $\frac{s^3}{6}$
- the plane through the center perpendicular to a space diagonal meets the cube in a regular hexagon of side $\frac{s\sqrt2}{2}$ and area $\frac{3\sqrt3}{4}s^2$

## Conditions
The cube has edge $s$. The last two facts are about particular planes: the one through the three neighbors of a vertex and the one through the center perpendicular to a space diagonal.

## Why it works
Put one vertex at the origin, so the vertices are the points with coordinates $0$ or $s$. A face diagonal joins $(0, 0, 0)$ and $(s, s, 0)$, a space diagonal joins $(0, 0, 0)$ and $(s, s, s)$, and the distance formula gives $s\sqrt2$ and $s\sqrt3$. The spheres are centered at $\left(\frac s2, \frac s2, \frac s2\right)$ and reach the face centers, the edge midpoints, and the vertices, at distances $\frac s2$, $\frac{s\sqrt2}{2}$, and $\frac{s\sqrt3}{2}$.

The angles are dot products of directions. The space diagonal $(1, 1, 1)$ and the edge $(1, 0, 0)$ have $\cos\theta = \frac{1}{\sqrt3}$, the space diagonals $(1, 1, 1)$ and $(1, 1, -1)$ have $\cos\theta = \frac13$, and the angle with a face is the complement of the angle with its normal edge.

The plane through $(s, 0, 0)$, $(0, s, 0)$, $(0, 0, s)$ is $x + y + z = s$, at distance $\frac{s}{\sqrt3}$ from the origin, and the corner it cuts off is a pyramid with a right-angle corner, of volume $\frac13 \cdot \frac{s^2}{2} \cdot s = \frac{s^3}{6}$. The plane $x + y + z = \frac{3s}{2}$ passes through the center and meets six edges at their midpoints, such as $\left(s, \frac s2, 0\right)$ and $\left(s, s, \frac s2\right)$, which are $\frac{s\sqrt2}{2}$ apart, and six equal sides at equal angles make a regular hexagon.

{{figure:section}}

## Useful observations
- A shortest path along the surface is a straight segment on an unfolding of the faces it crosses, as in [[unfold-the-surface|Unfolding a Surface]], and it is never along a space diagonal, which is not on the surface.
- The alternate vertices of a cube are the vertices of a [[regular-tetrahedron|regular tetrahedron]] and the centers of its faces are the vertices of a [[regular-octahedron|regular octahedron]], whose facts are on their own cards.
- The plane through two opposite edges is a plane of symmetry that cuts the cube in a rectangle $s \times s\sqrt2$, a section that turns a question about the solid into one about a plane figure.

## Applications
Distances, angles, and sections inside a cube, the spheres of a cube, and corners cut off by a plane.

## Contest profile
A very common solid, usually with a plane, a diagonal, or a second solid inside it. Coordinates settle most distance and section questions, and the angle and section facts above are worth having without deriving them.
`
});

Object.assign(window.MATH_DETAILS, {

"perpendicularity-lemma": String.raw`
## Key forms
- $AB \perp CD \iff AC^2 - AD^2 = BC^2 - BD^2$ — for four points with $A \ne B$ and $C \ne D$
- $AC^2 + BD^2 = AD^2 + BC^2$ — the same equation, rearranged so that each side pairs the points differently
- the diagonals $AC$ and $BD$ of a quadrilateral $ABCD$ are perpendicular $\iff AB^2 + CD^2 = BC^2 + DA^2$
- the set of points $P$ with $PA^2 - PB^2 = k$ is a line perpendicular to $AB$, and it is the perpendicular bisector when $k = 0$

## Conditions
The four points lie in the plane or in space, and $A \ne B$, $C \ne D$ so that both lines exist. In space the lines need not meet: "perpendicular" means their directions are at a right angle. The second form needs no extra assumption: it is the first with the points renamed.

## Why it works
Write every distance with vectors, $AC^2 = \lvert C - A\rvert^2$ and so on, and expand the four squares in $AC^2 - AD^2 - BC^2 + BD^2$. The terms $\lvert C\rvert^2$, $\lvert D\rvert^2$, $\lvert A\rvert^2$, and $\lvert B\rvert^2$ each appear once with a plus and once with a minus sign and cancel, which leaves $$AC^2 - AD^2 - BC^2 + BD^2 = -2A\cdot C + 2A\cdot D + 2B\cdot C - 2B\cdot D = 2\,(B - A)\cdot(C - D).$$

The right side is twice the dot product of $\overrightarrow{AB}$ and $\overrightarrow{DC}$. It is zero exactly when the two vectors are perpendicular, and that is the statement. Renaming the points $(A, B, C, D) \to (A, C, B, D)$ in the same identity gives the quadrilateral form: $AC \perp BD$ exactly when $AB^2 - AD^2 = CB^2 - CD^2$, which is $AB^2 + CD^2 = BC^2 + DA^2$.

For the locus, fix $A$ and $B$ and take $P$ as the variable point. The identity says $PA^2 - PB^2$ is constant exactly when $P$ moves perpendicular to $AB$, so every level set is a line perpendicular to $AB$. The level set for $k = 0$ is the perpendicular bisector.

## Useful observations
- The lemma is a one-line way to prove that perpendicular lines exist in a configuration where only lengths are known, and it is how the concurrency proof for perpendiculars to the sides, [[carnots-perpendicularity-theorem|Carnot's Perpendicularity Theorem]], goes through.
- The two circles' powers give an instance: $PO_1^2 - r_1^2 = PO_2^2 - r_2^2$ says $PO_1^2 - PO_2^2 = r_1^2 - r_2^2$, a level set of the locus, so the [[radical-axis|radical axis]] is perpendicular to the line of centers.
- A quadrilateral with perpendicular diagonals has a free parameter left over: only the sums of opposite squares are tied together, so one side is determined by the other three.

## Applications
Showing two lines are perpendicular from lengths, finding the missing side of a quadrilateral with perpendicular diagonals, and proving that three perpendiculars to the sides of a triangle meet.

## Contest profile
A quiet workhorse of olympiad geometry. It rarely is the headline of a problem, but it appears in the solution whenever a perpendicularity has to be proved or used and the points are given by lengths rather than by coordinates, and it is the standard tool for the "concurrent perpendiculars" family.
`
});

Object.assign(window.MATH_DETAILS, {

"carnots-perpendicularity-theorem": String.raw`
## Key forms
- the perpendiculars at $D \in BC$, $E \in CA$, $F \in AB$ concur $\iff BD^2 - DC^2 + CE^2 - EA^2 + AF^2 - FB^2 = 0$
- the squares are unsigned lengths, so $D$, $E$, $F$ may lie anywhere on the side lines
- if the perpendiculars meet at $P$, then $PB^2 - PC^2 = BD^2 - DC^2$, and likewise on the other two sides
- the perpendicular bisectors, the altitudes, and the perpendiculars to the sides at the incircle's touch points are the three standard cases

## Conditions
The three points lie on the three side lines of a genuine triangle. Because no two side lines are parallel, the perpendiculars at $D$ and $E$ always meet in one point, so the question is only whether the third perpendicular passes through it.

## Why it works
Suppose the three perpendiculars pass through a point $P$. Since $PD \perp BC$, Pythagoras in the two right triangles $PDB$ and $PDC$ gives $PB^2 = PD^2 + BD^2$ and $PC^2 = PD^2 + DC^2$, so $PB^2 - PC^2 = BD^2 - DC^2$. The same argument on the other two sides gives $PC^2 - PA^2 = CE^2 - EA^2$ and $PA^2 - PB^2 = AF^2 - FB^2$. Adding the three equations, the left sides cancel in a cycle and the right sides add to zero, which is the condition.

Conversely, suppose the sum is zero. Let $P$ be the intersection of the perpendiculars at $D$ and $E$, and let $F'$ be the foot of the perpendicular from $P$ to $AB$. The first half, applied to $D$, $E$, $F'$, gives $BD^2 - DC^2 + CE^2 - EA^2 + AF'^2 - F'B^2 = 0$. Subtracting the assumed equation leaves $AF'^2 - F'B^2 = AF^2 - FB^2$. On the line $AB$ the quantity $AX^2 - XB^2$ equals $2\cdot AB \cdot (\text{signed distance of } X \text{ from the midpoint of } AB)$, so it takes each value at exactly one point, and therefore $F' = F$. The perpendicular at $F$ passes through $P$.

The step $PB^2 - PC^2 = BD^2 - DC^2$ is the [[perpendicularity-lemma|Perpendicularity Lemma]] in the case where the feet are known; the argument above only needs Pythagoras.

## Useful observations
- If $D$, $E$, $F$ are the midpoints, every term is $0$, and the perpendicular bisectors concur, at the circumcenter. If they are the feet of the altitudes, the condition reduces to an identity in the sides, and the altitudes concur at the orthocenter.
- At the touch points of the incircle with tangent lengths $x$, $y$, $z$ from $A$, $B$, $C$, the sum is $(x^2 - z^2) + (z^2 - y^2) + (y^2 - x^2) = 0$, so the perpendiculars there concur, at the incenter.
- It is the right tool when a concurrency is wanted and the three points are fixed by lengths along the sides. It is not the theorem that the signed distances from the circumcenter to the sides add to $R + r$, which is [[carnots-theorem|Carnot's Theorem on distances to the sides]].

## Applications
Proving that three perpendiculars to the sides of a triangle meet, finding the position of the third point that makes two given perpendiculars concur with a third, and deriving the concurrency of the standard triangle lines in one pass.

## Contest profile
A concurrency criterion for the olympiad geometry toolbox, in the same family as Ceva's and Menelaus's theorems but for perpendiculars rather than for cevians. It appears in solutions that show a point lies on a perpendicular without ever naming the point.
`
});

Object.assign(window.MATH_DETAILS, {

"iran-lemma": String.raw`
## Key forms
- with the incircle touching $CA$ at $E$ and $AB$ at $F$, the lines $BI$ and $EF$ meet at a point $K$ with $CK \perp BI$
- $K$ lies on the midline parallel to $AB$, through the midpoints of $CA$ and $CB$
- $BK = BC\cos\dfrac B2$ and $CK = BC\sin\dfrac B2$
- $\angle BKC = 90^\circ$, so $K$ lies on the circle with diameter $BC$

## Conditions
The triangle is a genuine triangle with its incircle, and $E$, $F$ are the touch points on the two sides that meet at $A$, the sides not through $B$. The same statement holds with the roles of $B$ and $C$ exchanged, by symmetry: the bisector from $C$, the chord $EF$, and the midline parallel to $AC$ meet at the foot of the perpendicular from $B$.

## Why it works
First show that the chord and the bisector meet where the right angle is. In triangle $AEF$ the tangents $AE$ and $AF$ are equal, so $\angle AFE = 90^\circ - \frac A2$. Let $K$ be the intersection of $BI$ with $EF$. In triangle $BFK$ the angle at $B$ is $\frac B2$ and the angle at $F$ is the supplement of $\angle AFE$, that is $90^\circ + \frac A2$, so $\angle FKB = 180^\circ - \frac B2 - 90^\circ - \frac A2 = \frac C2$. The vertical angle gives $\angle EKI = \frac C2$ as well.

The point $C$ sees the segment $EI$ at the angle $\angle ECI = \frac C2$, because $CI$ bisects the angle at $C$. Two points $C$ and $K$ on the same side of $EI$ that see $EI$ at equal angles lie on one circle with it, so $C$, $E$, $K$, $I$ are concyclic (the argument is clean with directed angles modulo $180^\circ$, which also covers every shape of triangle). Since $\angle CEI = 90^\circ$, the segment $CI$ is a diameter of that circle, and therefore $\angle CKI = 90^\circ$. So $CK \perp BI$ at the point $K$ of $EF$.

Now the midline. Triangle $BKC$ has a right angle at $K$, so the midpoint $M$ of its hypotenuse $BC$ is at the same distance from $B$, $K$, and $C$: $MK = MB$. Then $\angle MKB = \angle MBK = \frac B2 = \angle ABK$, and these are alternate angles for the lines $KM$ and $AB$ cut by the transversal $BK$, so $KM \parallel AB$. The line through $M$ parallel to $AB$ is the midline, so $K$ lies on it. The lengths $BK = BC\cos\frac B2$ and $CK = BC\sin\frac B2$ come from the right triangle $BKC$, whose angle at $B$ is $\frac B2$.

## Useful observations
- The consequence used most is the right angle: it puts $K$ on the circle with diameter $BC$, and $K$ on the midline puts it at half the height of $C$ above $AB$.
- Since $M$ is the circumcenter of $BKC$, any statement about $K$ and the midpoint of $BC$ becomes a statement about a radius, $MK = \frac{BC}{2}$.
- It pairs with the incenter-excenter picture, the [[incenter-excenter-lemma|Incenter-Excenter Lemma]], because both start from the bisector $BI$ and use the circle on a diameter; here the diameter is $CI$ and the points $E$, $K$.

## Applications
Showing that the foot of an altitude from a vertex to a bisector lies on the contact chord and on the midline, computing lengths such as $BK$ and $CK$ from the sides alone, and proving that three given lines through an incircle configuration meet.

## Contest profile
An olympiad lemma that is usually quoted and proved in two lines inside a larger solution. It appears in problems with the incircle, the midpoints of the sides, and a perpendicular from a vertex to a bisector together, where recognizing the shared point $K$ is the whole idea.
`,

"steiner-ratio-theorem": String.raw`
## Key forms
- $\dfrac{BD}{DC} \cdot \dfrac{BE}{EC} = \dfrac{AB^2}{AC^2}$ — for isogonal cevians $AD$ and $AE$, that is $\angle BAD = \angle EAC$, with $D$ and $E$ on side $BC$
- converse: if $D$ and $E$ lie on side $BC$ and $\dfrac{BD}{DC} \cdot \dfrac{BE}{EC} = \dfrac{AB^2}{AC^2}$, then $AD$ and $AE$ are isogonal
- with directed lengths the same product holds when $D$ and $E$ lie on line $BC$ outside the side; the two ratios are then both negative
- each classical isogonal pair is an instance: the median and the symmedian, the altitude and the line through the circumcenter, and the bisector paired with itself

## Conditions
$D$ and $E$ lie on line $BC$, and the lines $AD$ and $AE$ are reflections of each other in the bisector of angle $A$. For points inside the side the lengths are ordinary lengths; when the cevians meet line $BC$ beyond $B$ or $C$, use directed lengths, as in the Ratio Lemma. The converse needs both points on the side itself, where each ratio determines its point.

## Why it works
The Ratio Lemma gives each ratio as the side ratio times a sine ratio:

$$\frac{BD}{DC} = \frac{AB}{AC} \cdot \frac{\sin\angle BAD}{\sin\angle DAC}, \qquad \frac{BE}{EC} = \frac{AB}{AC} \cdot \frac{\sin\angle BAE}{\sin\angle EAC}.$$

The two cevians are isogonal, so $\angle BAD = \angle EAC$, and since both pairs of angles add up to $\angle A$, also $\angle DAC = \angle BAE$. Multiplying the two equations, the four sines cancel in pairs and leave $\frac{BD}{DC} \cdot \frac{BE}{EC} = \frac{AB^2}{AC^2}$.

For the converse, fix $D$ and let $E$ move along side $BC$ from $B$ to $C$. The ratio $\frac{BE}{EC}$ increases strictly from $0$ without bound, so exactly one point $E$ of the side gives the product $\frac{AB^2}{AC^2}$. The foot of the reflection of $AD$ in the bisector is such a point, so it is the one.

## Useful observations
- When one cevian is known, the theorem places the other without any angle: the foot of the isogonal of a cevian is found from two ratios and the two sides.
- The median is the case $\frac{BD}{DC} = 1$, which gives the split made by the symmedian, stated on [[symmedian-lemoine|Symmedians]].
- With directed lengths it also covers the external bisector, the one line besides the internal bisector that is its own isogonal: there the ratio is $-\frac{AB}{AC}$, and its square is the side ratio squared.
- Read with [[trig-ceva|Trigonometric Ceva]], it is the reason that reflecting three concurrent cevians in the bisectors gives three concurrent lines, the [[isogonal-conjugate|isogonal conjugate]].

## Applications
Locating the foot of the isogonal of a known cevian, such as the line through the circumcenter from the foot of an altitude, computing where a symmedian-like line meets the opposite side, and proving two cevians isogonal from lengths.

## Contest profile
An olympiad tool for isogonal configurations, used when a problem pairs a line through a vertex with its reflection in the bisector and asks about the points where the two lines meet the opposite side. It pairs with the Ratio Lemma and with isogonal conjugates.
`,

"isogonal-line-lemma": String.raw`
## Key forms
- $\angle BAX = \angle YAC \implies \angle BAP = \angle QAC$ — where $P = BX \cap CY$ and $Q = BY \cap CX$
- $s(P)\,s(Q) = s(X)\,s(Y)$ for any points $X$, $Y$, where $s(Z) = \dfrac{\sin\angle BAZ}{\sin\angle ZAC}$ — the identity behind the lemma, with $P$ and $Q$ built as above
- if $X$ and $Y$ are isogonal conjugates in triangle $ABC$, then so are $P$ and $Q$

## Conditions
$X$ and $Y$ are points other than $A$, $B$, $C$, chosen so that the lines $BX$ and $CY$ meet and the lines $BY$ and $CX$ meet. The points may lie inside or outside the triangle; outside it, read the angles as directed angles and the sines with signs, and the statement is unchanged.

## Why it works
Step 1, a measure of direction. For a point $Z$, write $s(Z) = \frac{\sin\angle BAZ}{\sin\angle ZAC}$, and similarly $t(Z) = \frac{\sin\angle CBZ}{\sin\angle ZBA}$ at $B$ and $u(Z) = \frac{\sin\angle ACZ}{\sin\angle ZCB}$ at $C$. Each depends only on the line from its vertex to $Z$. Two lines through $A$ are isogonal exactly when their values of $s$ multiply to $1$, because reflecting in the bisector swaps the two angles that $s$ compares.

Step 2, Trigonometric Ceva. The three lines from the vertices to any point $Z$ concur at $Z$, so Trigonometric Ceva gives

$$s(Z)\,t(Z)\,u(Z) = 1.$$

Step 3, the crossing points. $P$ lies on line $BX$, so the line $BP$ is the line $BX$ and $t(P) = t(X)$. $P$ also lies on line $CY$, so $u(P) = u(Y)$. In the same way $t(Q) = t(Y)$ and $u(Q) = u(X)$. Then Step 2, applied to $P$, $Q$, $X$, and $Y$, gives

$$s(P)\,s(Q) = \frac{1}{t(X)\,u(Y)} \cdot \frac{1}{t(Y)\,u(X)} = \frac{1}{t(X)\,u(X)} \cdot \frac{1}{t(Y)\,u(Y)} = s(X)\,s(Y).$$

Step 4, conclusion. $AX$ and $AY$ are isogonal, so $s(X)\,s(Y) = 1$, hence $s(P)\,s(Q) = 1$, and $AP$ and $AQ$ are isogonal. If $X$ and $Y$ are isogonal conjugates, $BY$ is also the reflection of $BX$ in the bisector at $B$, and $CX$ the reflection of $CY$ at $C$. So the lines from $B$ and $C$ to $Q$ are the reflections of those to $P$, and $Q$ is the isogonal conjugate of $P$.

## Useful observations
- The identity of Step 3 holds for any two points, isogonal or not, so the product of the two direction measures at $A$ is preserved by the crossing construction.
- The lemma lets a known isogonal pair, such as the altitude and the line through the circumcenter, produce new isogonal pairs from points chosen on them, without computing a single angle.
- To prove that two lines through $A$ are isogonal, it is often enough to exhibit them as $AP$ and $AQ$ for points $X$ and $Y$ on a known isogonal pair.

## Applications
Proving that two lines through a vertex make equal angles with the two sides, transporting an isogonal pair from one configuration to another, and showing two constructed points are isogonal conjugates.

## Contest profile
An olympiad lemma, quoted inside solutions about isogonal lines, isogonal conjugates, and the complete quadrilateral formed by four lines through two vertices. It pairs with Trigonometric Ceva, which proves it, and with the [[steiner-ratio-theorem|Steiner ratio theorem]], which measures isogonal lines on the opposite side.
`,

"power-of-a-point-linearity": String.raw`
## Key forms
- $f(P) = \operatorname{pow}(P, \omega_1) - \operatorname{pow}(P, \omega_2) = 2\,\overrightarrow{O_1O_2} \cdot \overrightarrow{RP}$ for any point $R$ on the radical axis
- $f(P) = 2\,O_1O_2 \cdot d(P, \ell)$ — $d$ the signed distance to the radical axis $\ell$, positive on the side of $O_2$
- $f\big(tX + (1 - t)Y\big) = t\,f(X) + (1 - t)\,f(Y)$, and in general $f(t_1X_1 + \cdots + t_nX_n) = t_1f(X_1) + \cdots + t_nf(X_n)$ whenever $t_1 + \cdots + t_n = 1$
- $f_{12} + f_{23} + f_{31} = 0$ for three circles, where $f_{ij}$ is the difference of the powers with respect to $\omega_i$ and $\omega_j$
- the circles $\omega_t$ with $\operatorname{pow}(P, \omega_t) = t\operatorname{pow}(P, \omega_1) + (1 - t)\operatorname{pow}(P, \omega_2)$ all share the radical axis $\ell$, and pass through the common points of $\omega_1$ and $\omega_2$ when there are any; $\omega_t$ has center $tO_1 + (1 - t)O_2$ and $r_t^2 = tr_1^2 + (1 - t)r_2^2 - t(1 - t)\,O_1O_2^2$, so it is a real circle only when $r_t^2 \ge 0$

## Conditions
The circles have different centers, $O_1 \ne O_2$; for concentric circles $f$ is constant and there is no radical axis. The power of a point with respect to a circle of center $O$ and radius $r$ is $\operatorname{pow}(P) = PO^2 - r^2$. A point counts as a circle of radius $0$, and the statement holds word for word for spheres in space.

## Why it works
Write points as vectors. Each power is quadratic, $\operatorname{pow}(P, \omega_i) = \lvert P\rvert^2 - 2\,O_i \cdot P + \lvert O_i\rvert^2 - r_i^2$, and the quadratic term $\lvert P\rvert^2$ is the same for every circle. In the difference it cancels:

$$f(P) = 2\,(O_2 - O_1) \cdot P + \left(\lvert O_1\rvert^2 - r_1^2 - \lvert O_2\rvert^2 + r_2^2\right).$$

A dot product with a fixed vector plus a constant is a linear (affine) function, which is the whole lemma. Its zero set is a line perpendicular to $O_1O_2$, the radical axis $\ell$. For $R$ on $\ell$, $f(R) = 0$, and subtracting gives $f(P) = 2\,(O_2 - O_1) \cdot (P - R)$. The component of $P - R$ along $O_1O_2$ is the signed distance from $P$ to $\ell$, which gives the distance form.

An affine function commutes with weighted averages whose weights add up to $1$, because the constant term is taken once in total. That is the weighted form. For three circles, $f_{12} + f_{23} + f_{31}$ is a sum of six powers in which each appears once with each sign, so it is $0$. For the family $\omega_t$, the right-hand side is $\lvert P\rvert^2 - 2\big(tO_1 + (1 - t)O_2\big) \cdot P + \text{const}$, the power with respect to a circle centered at $tO_1 + (1 - t)O_2$, with $r_t^2 = tr_1^2 + (1 - t)r_2^2 - t(1 - t)\,O_1O_2^2$. That is a real circle only when $r_t^2 \ge 0$: averaging two unit circles centered at $(0, 0)$ and $(4, 0)$ gives $(x - 2)^2 + y^2 + 3$, which would need $r^2 = -3$. The affine identities for $f$ hold either way; only the reading as a circle needs the sign check. Its difference with the power for $\omega_1$ is $(1 - t)$ times $-f$, which vanishes exactly on $\ell$. At a common point of $\omega_1$ and $\omega_2$ both powers are $0$, so $\omega_t$ passes through it.

## Useful observations
- The three-circle identity is a one-line proof that the three radical axes meet: where $f_{12} = 0$ and $f_{23} = 0$, also $f_{31} = 0$, which is the radical center.
- If $f(X) = -f(Y)$, the midpoint of $XY$ lies on the radical axis. More generally, a point is shown to lie on the axis by writing it as a weighted average of points whose values of $f$ cancel.
- With $\omega_2$ a point circle at $Q$, $f(P) = PO_1^2 - r_1^2 - PQ^2$, so the points with a given difference of squared distances form a line perpendicular to $O_1Q$, the locus in the [[perpendicularity-lemma|Perpendicularity Lemma]].
- A single power is not linear: along a segment it is a quadratic in the parameter. Only the difference of two powers is linear, which is why the lemma is always applied to a pair of circles.

## Applications
Computing the distance from a point to the radical axis from two tangent lengths, proving that a point lies on a radical axis by averaging, building a circle through the common points of two circles, and proving that radical axes concur.

## Contest profile
An olympiad technique behind many radical-axis arguments. It appears when a point is defined as a midpoint or a weighted combination of points with known powers, and in proofs that a moving circle keeps a fixed radical axis. It pairs with the radical axis and with Power of a Point.
`,

"humpty-queue-points": String.raw`
## Key forms
- $X$, the $A$-Humpty point: the foot of the perpendicular from $H$ to the median $AM$, where $M$ is the midpoint of $BC$
- $X$ lies on the circle $(BHC)$, and its reflection in $M$ is the second point where the median $AM$ meets the circumcircle
- $MX \cdot MA = MB^2 = MC^2$, so $MB$ and $MC$ are tangent to the circles $(ABX)$ and $(ACX)$
- $\angle XBC = \angle MAB$, $\angle XCB = \angle MAC$, and $XB : XC = AB : AC$
- $Q$, the $A$-Queue point: line $MH$ passes through the antipode $A'$ of $A$ and meets the circumcircle again at $Q$, with $\angle AQH = 90^\circ$
- $Q$ lies on the circle with diameter $AH$, which passes through the feet of the altitudes from $B$ and $C$

## Conditions
$ABC$ is a triangle that is not isosceles with $AB = AC$; in that case the median is the altitude, $H$ lies on it, and $X$ and $Q$ degenerate to $H$ and $A$. When angle $A$ is acute, $X$ lies between $A$ and $M$; when it is obtuse, $X$ lies on ray $MA$ beyond $A$. Every statement above holds in both cases.

## Why it works
Step 1, the circle through $B$, $H$, $C$. Reflect $H$ in $M$ to get $A'$. By [[orthocenter-properties|Orthocenter Reflections & Distances]], $A'$ is the point of the circumcircle opposite $A$, and the circle $(BHC)$ is the circumcircle reflected in $M$, since the reflection fixes the pair $B$, $C$ and sends $A'$ to $H$.

Step 2, the Humpty point. Let the median $AM$ meet the circumcircle again at $N$. Since $AA'$ is a diameter, $\angle ANA' = 90^\circ$, so $A'N \perp AM$. Reflect in $M$: the line $A'N$ goes to the parallel line through $H$ and the reflection $N'$ of $N$, and that line is perpendicular to $AM$, which the reflection maps to itself. So $N'$ is the foot of the perpendicular from $H$ to $AM$:

$$X = N', \qquad \text{the reflection of } N \text{ in } M.$$

As $N$ is on the circumcircle, $X$ is on its reflection $(BHC)$. The power of $M$ with respect to the circumcircle gives $MN \cdot MA = MB \cdot MC$, and $MX = MN$, so $MX \cdot MA = MB^2$.

Step 3, the angles and the ratio. From $\frac{MB}{MX} = \frac{MA}{MB}$ and the shared angle at $M$, triangles $MBX$ and $MAB$ are similar, so $\angle XBC = \angle MAB$ and $\frac{XB}{AB} = \frac{MB}{MA}$. The same with $C$ gives $\angle XCB = \angle MAC$ and $\frac{XC}{AC} = \frac{MC}{MA}$. Dividing, with $MB = MC$, gives $XB : XC = AB : AC$.

Step 4, the Queue point. $H$, $M$, $A'$ are collinear because $M$ is the midpoint of $HA'$. The line meets the circumcircle at $A'$ and at a second point $Q$. Since $AA'$ is a diameter, $\angle AQA' = 90^\circ$, and $H$ lies on line $QA'$, so $\angle AQH = 90^\circ$. That puts $Q$ on the circle with diameter $AH$, and the feet $E$, $F$ of the altitudes from $B$ and $C$ are on it too, because $\angle AEH = \angle AFH = 90^\circ$.

## Useful observations
- The ratio $XB : XC = AB : AC$ puts $X$ on the [[apollonius-circle|Apollonius circle]] of $B$ and $C$ through $A$.
- The circle with diameter $AH$ is the circle $(AEF)$, so $Q$ is the second intersection of $(AEF)$ with the circumcircle: the Queue point is where those two circles meet.
- The Humpty point lives on $(BHC)$ and the Queue point on $(AEF)$, so a problem that names both the orthocenter and the midpoint of a side usually needs one of these two circles.

## Applications
Showing that the foot of the perpendicular from the orthocenter to a median lies on the circle $(BHC)$, finding a point of the circumcircle that sees $AH$ at a right angle, and computing lengths along the median from $MX \cdot MA = MB^2$.

## Contest profile
An olympiad configuration, recognized when a problem combines the orthocenter, the midpoint of a side, and the circumcircle. The two points are usually named in a solution and then used through their circles, $(BHC)$ for the Humpty point and the circle on diameter $AH$ for the Queue point.
`,

"dumpty-point": String.raw`
## Key forms
- $D$, the $A$-Dumpty point: the midpoint of the chord $AK$, where the $A$-symmedian meets the circumcircle again at $K$
- $D$ lies on the circle $(BOC)$, the circle with diameter $OT$, where $T$ is the point where the tangents at $B$ and $C$ meet; $OD \perp AK$
- $\angle ADB = \angle ADC = 180^\circ - A$, so $\angle BDC = 2A$
- $\triangle DBA \sim \triangle DAC$, so $D$ is the center of the spiral similarity taking $B$ to $A$ and $A$ to $C$
- $DA^2 = DB \cdot DC$ and $DB : DC = AB^2 : AC^2$
- the circle through $A$ and $B$ tangent to $AC$ at $A$, and the circle through $A$ and $C$ tangent to $AB$ at $A$, meet again at $D$
- $AM \cdot AK = bc$, with $M$ the midpoint of $BC$, so $AD = \frac{bc}{2\,AM}$

## Conditions
$ABC$ is a triangle with $AB \ne AC$; when $AB = AC$ the symmedian is the median through $O$, $K$ is the antipode of $A$, and $D$ is $O$ itself. The circle $(BOC)$ needs angle $A \ne 90^\circ$, since for a right angle at $A$ the point $O$ is on $BC$ and $D$ is the foot of the altitude. The angle statements are written for an acute angle $A$; for an obtuse angle $A$ the same proof works with [[directed-angles|directed angles]], and the similarity and the products are unchanged.

## Why it works
Step 1, the circle through $B$, $O$, $C$. By [[harmonic-quadrilateral|Harmonic Quadrilaterals]], the $A$-symmedian passes through $T$, the meeting point of the tangents at $B$ and $C$. The tangents are perpendicular to the radii, so $\angle OBT = \angle OCT = 90^\circ$. Since $D$ is the midpoint of the chord $AK$, the radius through $D$ is perpendicular to it, so $\angle ODT = 90^\circ$. All three right angles stand on $OT$, so

$$B,\ C,\ D \text{ lie on the circle with diameter } OT,$$

which passes through $O$: it is the circle $(BOC)$.

Step 2, the angles at $D$. On that circle, $\angle BDT$ and $\angle BOT$ stand on the same chord $BT$, so they are equal. $OT$ bisects the central angle $\angle BOC = 2A$, so $\angle BDT = A$. The point $D$ lies between $A$ and $T$, so $\angle ADB = 180^\circ - A$, and in the same way $\angle ADC = 180^\circ - A$.

Step 3, the similarity. The angles of triangle $ABD$ give $\angle DAB + \angle DBA = A = \angle DAB + \angle DAC$, so $\angle DBA = \angle DAC$. The same with triangle $ACD$ gives $\angle DCA = \angle DAB$. So $\triangle DBA \sim \triangle DAC$, with $B \to A$ and $A \to C$, and the ratios of corresponding sides give

$$\frac{DB}{DA} = \frac{DA}{DC} = \frac{AB}{AC}.$$

Multiplying the first two gives $DA^2 = DB \cdot DC$; multiplying $\frac{DB}{DA}$ by $\frac{DA}{DC}$ gives $DB : DC = AB^2 : AC^2$. The equality $\angle DAC = \angle DBA$ is the [[tangent-chord-angle|tangent–chord angle]] in circle $(ABD)$, so $AC$ is tangent to that circle at $A$; likewise $AB$ is tangent to $(ACD)$.

Step 4, the length. The median $AM$ and the symmedian $AK$ are isogonal, so $\angle BAM = \angle KAC$, and $\angle ABM = \angle AKC$ because both stand on the arc $AC$. So triangles $ABM$ and $AKC$ are similar, $\frac{AB}{AK} = \frac{AM}{AC}$, and $AM \cdot AK = bc$. Halving $AK$ gives $AD = \frac{bc}{2\,AM}$.

## Useful observations
- The Humpty point $X$ on the median satisfies $XB : XC = AB : AC$, and the Dumpty point on the symmedian satisfies $DB : DC = AB^2 : AC^2$: the symmedian squares the ratio, as it does where it meets $BC$.
- Step 4 is the [[sqrt-bc-inversion|inversion]] at $A$ with radius $\sqrt{bc}$ at work: that map sends $M$ to $K$, and so the median to the symmedian.
- The two tangent circles of Key forms give the quickest construction of $D$ in a figure that already has a circle tangent to a side at $A$.

## Applications
Turning a symmedian into the circle $(BOC)$, locating the center of the spiral similarity between $BA$ and $AC$, and computing lengths along the symmedian chord from $AM \cdot AK = bc$.

## Contest profile
An olympiad configuration, recognized when a problem combines the symmedian, the circumcenter, and the circle through $B$, $O$, $C$, or two circles tangent to the sides at $A$. It pairs with the Humpty and Queue points, and the two are often used together.
`,

"shooting-lemma": String.raw`
## Key forms
- a circle $\omega$ touches the circle $\Gamma$ internally at $T$ and touches the chord $BC$ at $D$; $M$ is the midpoint of the arc $BC$ of $\Gamma$ that does not contain $T$
- $T$, $D$, $M$ are collinear: the line from $T$ through $D$ meets $\Gamma$ again at $M$
- $MD \cdot MT = MB^2 = MC^2$, so the tangent from $M$ to $\omega$ has length $MB$
- every circle tangent to $BC$ and to $\Gamma$ on the side away from $M$ has the same power, $MB^2$, from $M$
- when $\Gamma$ is the circumcircle of $ABC$ and $\omega$ lies on the side of $A$, $M$ is the midpoint of the arc $BC$ not containing $A$, and $MB = MI$ for the incenter $I$, so the power of $M$ with respect to $\omega$ is $MI^2$

## Conditions
$\omega$ lies inside $\Gamma$, tangent to it, and tangent to the chord $BC$ at a point $D$ of the segment $BC$. The arc matters: $M$ is the midpoint of the arc on the far side of $BC$ from $\omega$. When $D$ is the midpoint of $BC$, $T$ is the other arc midpoint and the line $TDM$ is the perpendicular bisector of $BC$.

## Why it works
Step 1, the collinearity. Let $O$ and $W$ be the centers of $\Gamma$ and $\omega$, with radii $R$ and $r$. The homothety centered at $T$ with ratio $\frac Rr$ maps $\omega$ onto $\Gamma$, because the two circles touch at $T$ and $W$ lies on $OT$. It maps the line $BC$, tangent to $\omega$ at $D$, to a parallel line tangent to $\Gamma$ at the image $D'$ of $D$. The ratio is larger than $1$, so $D'$ lies on ray $TD$ beyond $D$, on the other side of $BC$ from $T$. A tangent to $\Gamma$ parallel to $BC$ touches it where the radius is perpendicular to $BC$, on the perpendicular bisector of $BC$, which is at an arc midpoint. So $D'$ is the arc midpoint on the far side, $D' = M$, and $T$, $D$, $M$ are collinear.

Step 2, the product. $M$ is the midpoint of its arc, so the arcs $MB$ and $MC$ are equal, and the inscribed angles on them are equal:

$$\angle MBD = \angle MBC = \angle MTB.$$

Triangles $MBD$ and $MTB$ share the angle at $M$, so they are similar, and $\frac{MB}{MD} = \frac{MT}{MB}$, that is $MD \cdot MT = MB^2$. Since $MB = MC$, the same holds with $C$.

Step 3, the power. The line $MT$ meets $\omega$ at $T$ and $D$, so $MD \cdot MT$ is the [[power-of-a-point|power]] of $M$ with respect to $\omega$. It equals $MB^2$, which does not depend on $\omega$. For the circumcircle of $ABC$ and the arc not containing $A$, the [[incenter-excenter-lemma|Incenter–Excenter Lemma]] gives $MB = MI$.

## Useful observations
- Two circles tangent to $BC$ and to $\Gamma$ on the same side give $M$ the same power $MB^2$ with respect to both, so $M$ lies on their [[radical-axis|radical axis]].
- The circle centered at $M$ with radius $MB$ passes through $B$ and $C$ and is orthogonal to every such $\omega$, because the tangent from $M$ to $\omega$ has length $MB$.
- Inverting about that circle fixes $B$, $C$, and each $\omega$, and swaps $\Gamma$ with line $BC$; this is the same picture as the [[sqrt-bc-inversion|inversion]] at a vertex with radius $\sqrt{bc}$.

## Applications
Showing that a line through the point of tangency passes through an arc midpoint, computing lengths along that line from $MD \cdot MT = MB^2$, and proving that the incenter lies on a line joining two points of tangency, as in the Sawayama–Thébault Theorem.

## Contest profile
An olympiad lemma, used whenever a circle is tangent to the circumcircle and to a side or chord. It is quoted by name in solutions, usually together with the Incenter–Excenter Lemma, to bring the incenter into a figure of tangent circles.
`,

"sqrt-bc-inversion": String.raw`
## When to use
A triangle figure in which the circumcircle and the side $BC$ both carry points, a point on one paired with a point on the other, the incenter together with the $A$-excenter, or the median together with the symmedian from $A$. The tell is a pair of objects that the map swaps: one of them is usually hard to work with and its partner easy. A problem with nothing special at the vertex $A$ gains nothing from it.

## How
1. Fix the vertex $A$, with $b = CA$ and $c = AB$. The map $\Phi$ sends a point $P$ to the point $P'$ on the reflection of ray $AP$ in the bisector of angle $A$, with $AP \cdot AP' = bc$.
2. Rewrite the figure through the dictionary: $B \leftrightarrow C$, the circumcircle $\leftrightarrow$ line $BC$, $I \leftrightarrow I_A$, the foot of the altitude from $A$ $\leftrightarrow$ the antipode of $A$, the midpoint $M$ of $BC$ $\leftrightarrow$ the second point $K$ where the symmedian meets the circumcircle. Lines through $A$ go to their isogonal lines, other lines to circles through $A$, and circles not through $A$ to circles.
3. Solve the rewritten problem, using that $\Phi$ preserves angles between curves (with reversed orientation) and tangency.
4. Bring lengths back with the inversion distance formula, $P'Q' = \frac{bc \cdot PQ}{AP \cdot AQ}$.

## Why it works
Step 1, the triangle maps to itself. The point $B$ is at distance $c$ from $A$, so the inversion sends it along ray $AB$ to distance $\frac{bc}{c} = b$, and the reflection carries that point onto ray $AC$ at distance $b$, which is $C$. Since $\Phi$ undoes itself, it also sends $C$ to $B$.

Step 2, circle and line. [[inversion-facts|Inversion]] sends a circle through its center to a line, and a reflection keeps lines as lines. The circumcircle passes through $A$, so its image is a line, and it contains the images $C$ and $B$: it is line $BC$.

Step 3, the incenter and the excenter. Both lie on the bisector, which the reflection fixes. Triangles $ABI$ and $AI_AC$ have $\angle BAI = \angle I_AAC = \frac A2$ and $\angle AIB = 90^\circ + \frac C2 = \angle ACI_A$, the last because $CI_A$ bisects the exterior angle at $C$. So they are similar, $\frac{AB}{AI_A} = \frac{AI}{AC}$, and

$$AI \cdot AI_A = bc.$$

Step 4, the other pairs. The altitude and the circumdiameter from $A$ are isogonal, and the foot $H_a$ and the antipode $A'$ satisfy $AH_a \cdot AA' = h_a \cdot 2R = bc$, from $\frac12 bc \sin A = \frac12 a\,h_a$ and $a = 2R\sin A$. The median and the symmedian are isogonal, and triangles $ABM$ and $AKC$ are similar, so $AM \cdot AK = bc$.

## Formulas it uses
- [[inversion-facts]]: images of lines and circles, and the distance formula, after which the reflection only relabels.
- [[isogonal-conjugate]]: the reflection in the bisector sends each line through $A$ to its isogonal line.
- [[incenter-excenter-lemma]]: the similar triangles behind $AI \cdot AI_A = bc$ and the arc midpoint on the bisector.
- [[symmedian-lemoine]]: the symmedian as the isogonal of the median, the partner the map produces.

## Common traps
- Inverting without the reflection, which sends $B$ to a point on ray $AB$ instead of to $C$ and loses the whole dictionary.
- Taking the radius to be $bc$ instead of $\sqrt{bc}$; the product of the two distances is $bc$.
- Expecting a line through $A$ to stay where it is: it goes to its isogonal line.

## Contest profile
An olympiad method for triangle problems that mix the circumcircle with the side $BC$, or the incenter with the excenter. It is often the hidden reason a configuration works, as in the [[shooting-lemma|Shooting Lemma]] and the [[dumpty-point|Dumpty point]], and solutions name it when they use it directly.
`,

"van-aubel-cevians": String.raw`
## Key forms
- $\frac{AP}{PD} = \frac{AF}{FB} + \frac{AE}{EC}$ for cevians $AD$, $BE$, $CF$ through $P$, each side ratio measured from $A$
- the same at the other vertices: $\frac{BP}{PE} = \frac{BD}{DC} + \frac{BF}{FA}$ and $\frac{CP}{PF} = \frac{CE}{EA} + \frac{CD}{DB}$
- in areas, with $x = [PBC]$, $y = [PCA]$, $z = [PAB]$: $\frac{AF}{FB} = \frac yx$, $\frac{AE}{EC} = \frac zx$, $\frac{AP}{PD} = \frac{y + z}{x}$
- the companion relation $\frac{PD}{AD} + \frac{PE}{BE} + \frac{PF}{CF} = 1$

## Conditions
The three cevians meet at one point $P$ inside the triangle, so all six side ratios are positive. With signed ratios the identity holds for a point $P$ outside the triangle as well. If only two side ratios are known, Ceva's Theorem supplies the third before the formula is used.

## Why it works
Step 1, side ratios as areas. Triangles $ACF$ and $BCF$ have the same height from $C$, so their areas are in the ratio $AF : FB$; so are the areas of $APF$ and $BPF$, which have the same height from $P$. Subtracting the second pair from the first leaves

$$\frac{AF}{FB} = \frac{[APC]}{[BPC]} = \frac yx,$$

and in the same way $\frac{AE}{EC} = \frac{[APB]}{[CPB]} = \frac zx$. This is the [[cevian-area-ratio|area ratio for a cevian]] applied twice.

Step 2, the cevian from $A$. Triangles $APB$ and $DPB$ have the same height from $B$ over the line $AD$, so their areas are in the ratio $AP : PD$, and likewise triangles $APC$ and $DPC$. Adding the two pairs,

$$\frac{AP}{PD} = \frac{[APB] + [APC]}{[DPB] + [DPC]} = \frac{z + y}{x} = \frac{AF}{FB} + \frac{AE}{EC}.$$

Step 3, the companion. By Step 2, $\frac{PD}{AD} = \frac{x}{x + y + z}$, and the same at $B$ and $C$ gives $\frac{y}{x + y + z}$ and $\frac{z}{x + y + z}$. The three add to $1$.

## Useful observations
- In [[mass-points|mass points]], with masses $m_A$, $m_B$, $m_C$ at the vertices, the side ratios are $\frac{m_B}{m_A}$ and $\frac{m_C}{m_A}$ and the cevian ratio is $\frac{m_B + m_C}{m_A}$: the theorem is the mass-point rule written as one formula.
- For the centroid every side ratio is $1$, and the formula gives the familiar $2 : 1$.
- For the incenter the side ratios from $A$ are $\frac ba$ and $\frac ca$ by the Angle Bisector Theorem, so $\frac{AI}{ID} = \frac{b + c}{a}$.

## Applications
Finding the ratio in which the point of concurrency divides a cevian, especially when two side ratios are given and the third comes from Ceva, and checking mass-point answers.

## Contest profile
An AIME tool for concurrent cevians with given side ratios. It replaces a mass-point computation with one line, and it pairs naturally with Ceva's Theorem, which supplies the missing ratio.
`,

"archimedes-broken-chord": String.raw`
## Key forms
- $A$, $B$, $C$ on a circle with $AB \lt BC$; $M$ is the midpoint of the arc $AC$ containing $B$; $F$ is the foot of the perpendicular from $M$ to $BC$: $AB + BF = FC$
- $BF = \frac{BC - AB}{2}$ and $FC = \frac{AB + BC}{2}$
- $MC^2 - MB^2 = FC^2 - BF^2 = AB \cdot BC$
- in trigonometric form, with chords $AB = 2R\sin\alpha$ and $BC = 2R\sin\gamma$, it is the sum-to-product formula $\sin\alpha + \sin\gamma = 2\sin\frac{\alpha + \gamma}{2}\cos\frac{\gamma - \alpha}{2}$

## Conditions
$B$ lies on the arc $AC$, and the perpendicular is dropped from the midpoint of the arc that contains $B$ to the longer of the two chords. If $AB = BC$, then $M = B$ and $F = B$, and the statement is empty.

## Why it works
Step 1, a congruence. Mark $G$ on $BC$ with $GC = AB$; it lies between $B$ and $C$ because $AB \lt BC$. $M$ is the midpoint of its arc, so $MA = MC$. The inscribed angles $\angle MAB$ and $\angle MCB$ stand on the same chord $MB$, with $A$ and $C$ on the same side of it, so they are equal. Triangles $MAB$ and $MCG$ therefore agree in two sides and the included angle, and

$$MB = MG.$$

Step 2, the foot is a midpoint. Triangle $MBG$ is isosceles, so the foot $F$ of the perpendicular from $M$ to $BG$ is the midpoint of $BG$, and $BF = FG$. Then

$$FC = FG + GC = BF + AB.$$

Step 3, the product. Since $MF \perp BC$, $MC^2 - MB^2 = FC^2 - BF^2 = (FC - BF)(FC + BF)$. By Step 2, $FC - BF = AB$, and $FC + BF = BC$, which gives $AB \cdot BC$.

Step 4, the trigonometric form. Let the arcs $AB$ and $BC$ have central angles $2\alpha$ and $2\gamma$. Then $MC$ subtends the central angle $\alpha + \gamma$, and the inscribed angle $\angle MCB$ is $\frac{\gamma - \alpha}{2}$, so $FC = MC\cos\angle MCB = 2R\sin\frac{\alpha + \gamma}{2}\cos\frac{\gamma - \alpha}{2}$. Setting this equal to $\frac{AB + BC}{2} = R(\sin\alpha + \sin\gamma)$ is the sum-to-product formula.

## Useful observations
- The theorem turns the sum $AB + BC$ of two chords into the single length $2\,FC$, which is the form in which it is usually applied.
- The identity $MC^2 - MB^2 = AB \cdot BC$ is a quick way to get $MB$ or $MC$ once the two chords are known.
- Archimedes stated it for chords in place of sines; read through Step 4 it is one of the oldest forms of the sum-to-product identities in [[product-sum|Product-to-Sum & Sum-to-Product]].

## Applications
Computing the distance from an arc midpoint to a chord, splitting a sum of two chords into equal halves, and the length chases in problems where an arc midpoint and two chords from one point appear together.

## Contest profile
A rare AIME and olympiad result, recognized when a problem gives two chords from one point and the midpoint of the arc they span. It is usually quoted to produce $BF$ or $FC$ at once, after which the Pythagorean Theorem in triangle $MFC$ finishes.
`,

"desargues-involution": String.raw`
## Key forms
- an involution of a line, in a coordinate $t$ along it: $\alpha\,tt' + \beta\,(t + t') + \gamma = 0$ with $\beta^2 \ne \alpha\gamma$; two pairs determine it, and three pairs belong to one involution exactly when $\det\begin{pmatrix} t_1t_1' & t_1 + t_1' & 1 \\ t_2t_2' & t_2 + t_2' & 1 \\ t_3t_3' & t_3 + t_3' & 1 \end{pmatrix} = 0$
- DIT: for four points $A$, $B$, $C$, $D$ and a line $\ell$ through none of them, the conics through the four points meet $\ell$ in pairs of one involution, and the pairs include $(\ell \cap AB, \ell \cap CD)$, $(\ell \cap AC, \ell \cap BD)$, $(\ell \cap AD, \ell \cap BC)$
- DDIT: for four lines and a point $P$ on none of them, the pairs of tangents from $P$ to the conics tangent to the four lines are pairs of one involution of the lines through $P$, and the pairs include the lines from $P$ to the two vertices of each pair of opposite vertices
- an involution with a fixed point $M$ that swaps two points $X$, $Y$ satisfies $\frac{1}{MQ} - \frac{1}{MP} = \frac{1}{MX} - \frac{1}{MY}$ for each pair $P$, $Q$, with $P$ and $Y$ on one side of $M$ and $Q$ and $X$ on the other; when $M$ is the midpoint of $XY$ it is the reflection in $M$

## Conditions
The four points (or the four lines) are in general position, no three collinear (no three concurrent), and $\ell$ passes through none of the points ($P$ lies on none of the lines). A conic of the family that misses $\ell$ contributes no real pair, which does not affect the others. The theorem is projective, so it holds for every conic, circles included, and for the degenerate conics made of two lines.

## Why it works
Step 1, involutions as pencils of quadratics. Take a coordinate $t$ on $\ell$. A pair $\{t, t'\}$ is the pair of roots of $a\,t^2 + b\,t + c$ when $tt' = \frac ca$ and $t + t' = -\frac ba$. So the pair satisfies $\alpha\,tt' + \beta\,(t + t') + \gamma = 0$ exactly when

$$\alpha c - \beta b + \gamma a = 0,$$

a linear condition on the coefficients $(a, b, c)$. The quadratics $\lambda f + \mu g$ of a two-dimensional family satisfy one such condition, with $(\alpha, \beta, \gamma)$ fixed up to a factor, so all their root pairs belong to one involution.

Step 2, the conics through four points. If $F = 0$ and $G = 0$ are two conics through $A$, $B$, $C$, $D$, every conic through the four points is $\lambda F + \mu G = 0$, because five points fix a conic and the family is one free ratio. Restricted to $\ell$, $F$ and $G$ become quadratics $f$ and $g$ in $t$, so Step 1 applies: the pairs where the conics meet $\ell$ belong to one involution. The line pairs $AB \cup CD$, $AC \cup BD$, and $AD \cup BC$ are conics through the four points, which gives the three named pairs.

Step 3, the dual. Polar reciprocation in a circle turns points into lines and conics into conics, turns a conic tangent to four lines into a conic through four points, and turns the lines through $P$ into the points of the polar of $P$. Applying Step 2 to the reciprocal figure and transforming back gives DDIT, with the opposite vertices of the four lines playing the role of the three line pairs.

Step 4, the fixed-point form. With $M$ at $t = 0$ fixed, $\gamma = 0$, and the pair $(x, y)$ gives $\alpha\,xy + \beta\,(x + y) = 0$. A pair $(t, t')$ satisfies $\alpha\,tt' + \beta\,(t + t') = 0$, that is $\frac1t + \frac1{t'} = -\frac\alpha\beta = \frac1x + \frac1y$, which is the stated relation once signs are given to the four distances.

## Useful observations
- The three line pairs alone are a statement about a complete quadrilateral: the lines through four points cut any line in three pairs of one involution, with no conic in sight.
- A circle through the four points adds its two intersections with $\ell$ as a fourth pair, which is how circle problems come in.
- When the involution is known to be a reflection, every pair is symmetric about one point, which proves the [[butterfly-theorem|Butterfly Theorem]] at once: the chords through the midpoint of the chord give a fixed point, and the circle gives a pair symmetric about it.
- In DDIT, if the involution of lines through $P$ is the reflection in a line, two lines of a pair make equal angles with it, which is how the dual proves isogonal statements.

## Applications
Generalized butterfly problems, proving that two points on a line are symmetric about a third, showing that lines through a point are isogonal or harmonic, and computing positions on a line cut by a circle and by the sides and diagonals of a quadrilateral.

## Contest profile
An advanced olympiad theorem, usually named and applied in one line to finish a projective argument. It appears when a line cuts the sides and diagonals of a quadrilateral and a conic through its vertices, or, in the dual form, when tangents from a point to an inscribed conic are compared with the lines to the vertices. It pairs with [[desargues-theorem|Desargues's Theorem]] and the [[cross-ratio|cross-ratio]].
`,
"orthogonal-circles": String.raw`
## Key forms
- $O_1O_2^2 = r_1^2 + r_2^2$ — the test, from the right angle between the two radii at a crossing point
- $\operatorname{pow}(O_1, \omega_2) = O_1O_2^2 - r_2^2 = r_1^2$ — the same test as a power: the tangent from $O_1$ to $\omega_2$ has length $r_1$
- a circle through a point $P$ and its inverse $P^*$ in a circle $\omega$ is orthogonal to $\omega$
- inversion in $\omega$ maps every circle orthogonal to $\omega$ to itself
- the common chord of two orthogonal circles has length $\frac{2r_1r_2}{O_1O_2}$

## Conditions
The two circles cross. The test forces this: $r_1^2 + r_2^2$ lies strictly between $(r_1 - r_2)^2$ and $(r_1 + r_2)^2$, so $|r_1 - r_2| \lt O_1O_2 \lt r_1 + r_2$. The angle between crossing circles is the angle between their tangents at a crossing point, and it is the same at both crossing points, by the reflection in the line of centers.

## Why it works
At a crossing point $X$, the tangent to $\omega_2$ is perpendicular to the radius $O_2X$. The circles cross at right angles exactly when that tangent is the line of the other radius $O_1X$, so exactly when $O_1X \perp O_2X$.

So the circles are orthogonal exactly when triangle $O_1XO_2$ has a right angle at $X$, and by the [[pythagorean-theorem|Pythagorean Theorem]] and its converse that is $$O_1O_2^2 = r_1^2 + r_2^2.$$ The segment $O_1X$ is then tangent to $\omega_2$, so its length $r_1$ is the tangent length from $O_1$, and the square of a tangent length is the power of the point.

For inversion, let $\omega$ have center $O$ and radius $r$, and let a circle $\gamma$ pass through $P$ and its inverse $P^*$. The point $O$ lies on the line $PP^*$, outside the segment, so its power with respect to $\gamma$ is $OP \cdot OP^* = r^2$. By the power form of the test, $\gamma \perp \omega$. Conversely, if $\gamma \perp \omega$, every line through $O$ that meets $\gamma$ meets it in two points whose distances from $O$ multiply to the power $r^2$, so inversion in $\omega$ swaps them, and $\gamma$ is mapped onto itself.

The common chord is perpendicular to $O_1O_2$ and bisected by it, so half of it is the altitude from $X$ in the right triangle, $\frac{r_1r_2}{O_1O_2}$.

## Useful observations
- A circle centered on the [[radical-axis|radical axis]] of two circles, with radius the tangent length from its center to either of them, is orthogonal to both. The circle orthogonal to three given circles is centered at their radical center.
- An inversion centered at a crossing point of two orthogonal circles sends them to two perpendicular lines.
- If $(A, B; C, D)$ is a [[harmonic-bundle|harmonic division]], the circle with diameter $AB$ is orthogonal to every circle through $C$ and $D$: the midpoint $M$ of $AB$ has power $MC \cdot MD = MA^2$ with respect to each of them.

## Applications
Recognizing the circles an inversion leaves in place, building a circle orthogonal to given circles at their radical center, and turning a right angle between two circles into a condition on lengths.

## Contest profile
No problems here are tagged with it yet. It appears on olympiads inside inversion solutions, where the circles orthogonal to the circle of inversion are the ones that stay put, and in harmonic configurations.
`,
"weitzenbock-inequality": String.raw`
## Key forms
- $a^2 - (b - c)^2 = 4(s - b)(s - c) = 4K\tan\frac A2$ — one term of the Hadwiger–Finsler sum, through the tangent lengths and through the half-angle, with $s = \frac{a + b + c}{2}$
- $a^2 + b^2 + c^2 - (a - b)^2 - (b - c)^2 - (c - a)^2 = 4(xy + yz + zx)$ — with $x = s - a$, $y = s - b$, $z = s - c$
- $\tan\frac A2 + \tan\frac B2 + \tan\frac C2 \ge \sqrt3$ — the same inequality in the angles
- $ab + bc + ca \ge 4\sqrt3\,K$ — a rearrangement of Hadwiger–Finsler, stronger than Weitzenböck

## Conditions
Any triangle, with area $K$. Equality holds in both inequalities exactly when $a = b = c$.

## Why it works
Write the sides through the tangent lengths from the vertices to the incircle, $x = s - a$, $y = s - b$, $z = s - c$, all positive, as in the figure: then $a = y + z$, $b = z + x$, $c = x + y$.

Each term of the sharper inequality factors as a difference of squares, $$a^2 - (b - c)^2 = (a - b + c)(a + b - c) = 2y \cdot 2z = 4yz,$$ and adding the three such terms gives $a^2 + b^2 + c^2 - (a - b)^2 - (b - c)^2 - (c - a)^2 = 4(xy + yz + zx)$.

[[herons-formula|Heron's Formula]] in the same variables is $K = \sqrt{(x + y + z)xyz}$, since $s = x + y + z$. So Hadwiger–Finsler says $xy + yz + zx \ge \sqrt{3xyz(x + y + z)}$, and squaring, $$(xy + yz + zx)^2 \ge 3(xy \cdot yz + yz \cdot zx + zx \cdot xy).$$ With $p = xy$, $q = yz$, $r = zx$ this is $(p + q + r)^2 \ge 3(pq + qr + rp)$, which is $\frac12\left[(p - q)^2 + (q - r)^2 + (r - p)^2\right] \ge 0$.

Equality needs $p = q = r$, so $x = y = z$, the equilateral triangle. Dropping the squared differences, which are never negative, gives Weitzenböck.

## Useful observations
- Dividing the sharper inequality by $4K$ and using $a^2 - (b - c)^2 = 4K\tan\frac A2$ gives the angle form, which is also [[jensens-inequality|Jensen's Inequality]] for the tangent, convex on half-angles that add to $90^\circ$.
- Expanding the squared differences turns Hadwiger–Finsler into $2(ab + bc + ca) - (a^2 + b^2 + c^2) \ge 4\sqrt3\,K$. Since $a^2 + b^2 + c^2 \ge ab + bc + ca$, the left side is at most $ab + bc + ca$, which gives the last Key form.

## Applications
The largest area of a triangle with a given sum of squared sides, the smallest sum of squares for a given area, and lower bounds for symmetric expressions in the sides.

## Contest profile
No problems here are tagged with it yet. It is an olympiad inequality comparing the area with the sides; AMC and AIME questions about the largest area are usually settled by [[am-gm|AM-GM]] or the sine area formula instead.
`,
"steiner-lehmus": String.raw`
## Key forms
- $t_b^2 = ac\left[1 - \left(\frac{b}{a + c}\right)^2\right]$ — the bisector from $B$, by the bisector length formula
- $t_b^2 - t_c^2 = \dfrac{a(c - b)(a + b + c)(a^3 + a^2b + a^2c + 3abc + b^2c + bc^2)}{(a + b)^2(a + c)^2}$ — every factor but $c - b$ is positive
- $B > C \iff t_b < t_c$ — the larger angle has the shorter bisector

## Conditions
Internal bisectors, measured from a vertex to the opposite side. The statement fails for external bisectors: a triangle can have two equal external bisectors without being isosceles.

## Why it works
Write both bisector lengths with the formula and subtract. Over the common denominator $(a + b)^2(a + c)^2$, the numerator factors as in the second Key form.

Every factor other than $c - b$ is a positive combination of the sides, so $t_b^2 - t_c^2$ has the sign of $c - b$. If $t_b = t_c$, the difference is $0$, so $b = c$. If $b > c$, the difference is negative, so $t_b \lt t_c$.

The classical synthetic proofs argue by contradiction, building a parallelogram on one bisector and comparing angles; the factorization replaces them with one computation.

## Useful observations
- The same comparison holds for the other two cevians. For medians, $m_b^2 - m_c^2 = \frac34(c^2 - b^2)$ from [[apollonius-theorem|the median length formula]]; for altitudes, $h_b = \frac{2K}{b}$. In each case the cevian to the longer side is the shorter one.
- Equal angle bisectors are the hard case only because their length formula is the most tangled; equal medians or equal altitudes give an isosceles triangle in one line.

## Applications
Proving a triangle isosceles from two equal bisectors, and comparing bisector lengths from the side lengths.

## Contest profile
No problems here are tagged with it yet. A classical olympiad result, quoted to conclude that a triangle is isosceles; contests more often ask for a bisector's length, which the formula gives directly.
`,
"cevian-nest": String.raw`
## Key forms
- $\dfrac{BX'}{X'C} = \dfrac{FX}{XE} \cdot \dfrac{AB}{AF} \cdot \dfrac{AE}{AC}$ — where line $AX$ meets $BC$ at $X'$, from two area ratios
- the converse: if $AX$, $BY$, $CZ$ concur, then so do $DX$, $EY$, $FZ$

## Conditions
$DEF$ is a cevian triangle of $ABC$, so $AD$, $BE$, $CF$ concur, and $X$, $Y$, $Z$ lie on the lines $EF$, $FD$, $DE$. For points outside the segments the same proof works with signed ratios, as in Ceva's Theorem.

## Why it works
First, where $AX$ meets $BC$. The point $X'$ divides $BC$ in the ratio of the areas of the triangles $ABX$ and $AXC$, which share the side through $A$ and $X$: $$\frac{BX'}{X'C} = \frac{[ABX]}{[AXC]}.$$

The point $X$ divides $FE$, and the area of a triangle with a fixed side changes linearly as its third vertex moves along a line. Since $F$ lies on $AB$, $[ABF] = 0$, so $[ABX] = \frac{FX}{FE}[ABE]$; since $E$ lies on $AC$, $[AEC] = 0$, so $[AXC] = \frac{XE}{FE}[AFC]$. With $[ABE] = \frac{AE}{AC}[ABC]$ and $[AFC] = \frac{AF}{AB}[ABC]$, this is the first Key form.

Now multiply the three such ratios, for $X'$ on $BC$, $Y'$ on $CA$, and $Z'$ on $AB$. The factors $\frac{FX}{XE} \cdot \frac{DY}{YF} \cdot \frac{EZ}{ZD}$ multiply to $1$ by Ceva's Theorem in triangle $DEF$, since $DX$, $EY$, $FZ$ concur. The remaining factors multiply to $$\frac{AE \cdot BF \cdot CD}{AF \cdot BD \cdot CE} = 1,$$ by Ceva's Theorem in $ABC$ for the point $P$. So the three ratios on the sides of $ABC$ multiply to $1$, and by the converse of Ceva's Theorem $AX$, $BY$, $CZ$ concur.

The argument runs the same way backward, which gives the converse.

## Useful observations
- When $P$ is the centroid, $DEF$ is the medial triangle, the side factors give $\frac{AB}{AF} \cdot \frac{AE}{AC} = 1$, and $AX$ divides $BC$ in the same ratio in which $X$ divides $FE$.
- Applied to the medial triangle and its incircle, whose touch points form a cevian triangle of it, the theorem shows that the lines from $A$, $B$, $C$ to those touch points concur.

## Applications
Proving three lines concurrent when the points lie on a cevian triangle (the medial, orthic, or contact triangle) rather than on the sides, and passing a concurrence between the outer and inner triangles of a nest.

## Contest profile
No problems here are tagged with it yet. An olympiad lemma, used to carry a concurrence from a cevian triangle back to the original triangle in one step.
`,
"dodecahedron-icosahedron": String.raw`
## Key forms
- icosahedron of edge $2$: vertices $(0, \pm1, \pm\varphi)$, $(\pm1, \pm\varphi, 0)$, $(\pm\varphi, 0, \pm1)$ — the corners of three perpendicular golden rectangles
- from one vertex of the icosahedron, moving along edges: $5$ vertices at distance $1$, $5$ at distance $2$, and the opposite vertex at distance $3$
- dodecahedron of edge $s$: the face diagonals have length $\varphi s$, and $12$ of them, one in each face, are the edges of an inscribed cube of edge $\varphi s$
- volumes with edge $s$: $V_{\text{dodecahedron}} = \frac{15 + 7\sqrt5}{4}s^3$ and $V_{\text{icosahedron}} = \frac{5(3 + \sqrt5)}{12}s^3$

## Conditions
Regular solids: every face is the same regular polygon and the same number of faces meet at every vertex.

## Why it works
Counting faces around edges and vertices. Each of the $12$ pentagons of the dodecahedron has $5$ edges and each edge lies on $2$ faces, so $E = \frac{12 \cdot 5}{2} = 30$; three faces meet at each vertex, so $V = \frac{12 \cdot 5}{3} = 20$. For the icosahedron, $E = \frac{20 \cdot 3}{2} = 30$ and $V = \frac{20 \cdot 3}{5} = 12$. Both satisfy [[eulers-polyhedron-formula|Euler's Polyhedron Formula]], $V - E + F = 2$.

For the coordinates, $\varphi^2 = \varphi + 1$ does the work. The vertex $(0, 1, \varphi)$ is at distance $2$ from $(0, -1, \varphi)$, and at squared distance $$1 + (\varphi - 1)^2 + \varphi^2 = 2 + 2\varphi^2 - 2\varphi = 4$$ from $(\pm1, \varphi, 0)$, and likewise from $(\pm\varphi, 0, 1)$. So each vertex has exactly $5$ neighbors at distance $2$, the edge length.

The five neighbors of a vertex form a pentagon around it, and so do the five neighbors of the opposite vertex. These $1 + 5 + 5 + 1 = 12$ points are all the vertices, which gives the distance layers along the edges.

## Useful observations
- The dual pairing: the $20$ face centers of the icosahedron are the vertices of a dodecahedron, and the $12$ face centers of the dodecahedron are the vertices of an icosahedron.
- The icosahedron has $\binom{12}{2} - 30 = 36$ segments through its interior, since its faces are triangles with no diagonals.
- The dodecahedron's inscribed cube is the [[cube|cube]] with vertices $(\pm1, \pm1, \pm1)$; the other $12$ vertices are $(0, \pm\frac1\varphi, \pm\varphi)$ and its cyclic shifts.

## Applications
Counting vertices, edges, faces, and diagonals; paths along edges and random walks on the vertices; distances between vertices from the golden rectangles.

## Contest profile
No problems here are tagged with it yet, though five AMC and AIME statements name one of the two solids. The usual question counts paths along the edges or the distances between random vertices, where the layers from one vertex do the counting.
`,
"plane-cross-section": String.raw`
## When to use
A cube, box, or prism with three marked points, usually on edges, and a plane through them: the question asks for the shape or area of the cross-section, the point where the plane meets another edge or a given line, or the volume of one of the pieces. Also a line and a plane given in coordinates, where the meeting point is wanted.

The plane through three points on the coordinate axes needs no work beyond the intercept form. A solid of revolution is better sliced through its axis, where [[cross-section-method|the slice through the axis]] turns it into circles and lines.

## How
1. Place the solid in coordinates, with a vertex at the origin and the edges along the axes.
2. Find a normal vector, $\vec n = \overrightarrow{PQ} \times \overrightarrow{PR}$, and divide out any common factor.
3. Write the plane as $\vec n \cdot X = \vec n \cdot P$, an equation $ax + by + cz = d$, and check it at $Q$ and $R$.
4. For each edge from $A$ to $B$, solve $\vec n \cdot (A + t(B - A)) = d$ for $t$, and keep the edges with $0 \le t \le 1$.
5. Put the crossing points in order around the plane: two of them are neighbors when they lie on the same face of the solid.
6. Find the area by splitting the polygon into triangles, or by projecting it onto a coordinate plane and dividing by the cosine of the angle between the planes.

For instance, the plane $x + y + z = \frac32$ meets the unit cube in the six edges that touch neither $(0, 0, 0)$ nor $(1, 1, 1)$. Along each of them $x + y + z$ runs from $1$ to $2$, so the plane crosses at the midpoint, and the cross-section is a regular hexagon.

## Why it works
A vector perpendicular to two directions in a plane that are not parallel is perpendicular to every direction in it. The cross product of $\overrightarrow{PQ}$ and $\overrightarrow{PR}$ is perpendicular to both, so it is a normal, and a point $X$ lies in the plane exactly when $X - P$ is perpendicular to it.

The plane's equation is linear, so along the edge it becomes $\vec n \cdot A + t\,\vec n \cdot (B - A) = d$, which has exactly one solution unless $\vec n \cdot (B - A) = 0$, when the edge is parallel to the plane. The cross-section of a convex solid is a convex polygon whose corners are the crossing points on the edges and whose sides lie in the faces, which is why step 5 orders them by faces.

Projection onto a coordinate plane multiplies every area by the cosine of the angle between the planes, which is the angle between their normals. For the $xy$-plane that cosine is $\frac{|c|}{\sqrt{a^2 + b^2 + c^2}}$, read off the equation.

## Formulas it uses
- [[cross-product-area]]: $\overrightarrow{PQ} \times \overrightarrow{PR}$ is the normal vector, and half the length of a cross product is the area of each triangle of the cross-section.
- [[plane-intercept-form]]: when the plane meets the coordinate axes at known points, its equation is written down at once.
- [[projected-area-cosine]]: the area of the cross-section is the area of its shadow on a coordinate plane divided by $\cos\theta$.

## Common traps
- Keeping a solution with $t$ outside $[0, 1]$, which is a point on the extended edge, outside the solid.
- Listing the corners out of order, which gives a self-crossing polygon and a wrong area.
- A plane through a vertex of the solid, which is reached along three edges and must be counted once.
- A sign slip in the cross product; checking that $\vec n \cdot \overrightarrow{PQ} = \vec n \cdot \overrightarrow{PR} = 0$ catches it.

## Contest profile
An AIME staple: a cube or box with three marked points on its edges, asking for the area of the cross-section, the point where the plane meets another edge, or a volume cut off. AMC 12 problems more often ask for the shape of the cross-section or a distance from a vertex to the plane.
`,
"projective-transformations": String.raw`
## When to use
A collinearity, a concurrence, a harmonic division, or a tangency, in a figure made of lines and at most one conic, where the statement uses no lengths and no angles. The complete quadrilateral, Pascal's and Desargues's configurations, and the polar of a point are the usual settings.

It is the wrong tool when the claim involves lengths, angles, midpoints, or two different circles, which a projection does not keep; then [[inversion-properties|inversion]] or coordinates fit better.

## How
1. Check that the claim uses only incidences, tangency, and cross-ratios.
2. Choose the line to send to infinity: usually the line through two points where pairs of lines meet, so that both pairs become parallel.
3. Or, for a claim about a conic, choose a point inside it to become the center of a circle.
4. Redraw the special figure: a parallelogram, a midpoint, a diameter, or a pair of parallel tangents.
5. Prove the claim there, using only facts the map keeps, and conclude it in the original figure.

For instance, for Pascal's Theorem send the line through two of the three meeting points of opposite sides to infinity: two pairs of opposite sides of the hexagon become parallel, and a short angle chase on the circle shows the third pair is parallel too, so its meeting point also lies on the line at infinity.

## Why it works
A central projection from a point $O$ onto another plane sends lines to lines and keeps which points lie on which lines; the points of the original plane on the line where it meets the plane through $O$ parallel to the target go to infinity. The cross-ratio of four points on a line can be written through the sines of the angles they make at $O$, so it is kept too.

A projective map is fixed by where it sends four points, no three on a line, so there is room to send any chosen line to infinity, or any conic to a circle with a chosen point inside it going to the center. What is not kept is everything metric: lengths, angles, midpoints, and whether a conic is a circle.

## Formulas it uses
- [[cross-ratio]]: the quantity every projection keeps; with one of the four points sent to infinity it becomes a plain ratio of two lengths.
- [[harmonic-bundle]]: a harmonic division $(A, B; C, D) = -1$ with $D$ at infinity says that $C$ is the midpoint of $AB$.
- [[pole-polar]]: when a conic becomes a circle and a point becomes its center, the polar of that point becomes the line at infinity.

## Common traps
- Using a length, an angle, or a midpoint after the map, unless the line at infinity is the one the midpoint refers to.
- Sending to infinity a line through a point that the claim needs at a finite place.
- Sending to infinity a line that meets the conic: the conic then becomes a hyperbola or a parabola, not a circle.
- Applying it to a claim about two circles; only one conic can be made a circle.

## Contest profile
An olympiad technique. It is rarely the only way, but it is often the shortest proof of a collinearity or a harmonic division in a complete quadrilateral or a figure with one conic.
`,
"painted-cubes": String.raw`
## Distinguishing clues
- A cube or box assembled from unit cubes, painted on all or some of its outside faces, then taken apart.
- A question about how many small cubes have $0$, $1$, $2$, or $3$ painted faces, or the probability of picking such a cube, or the fraction of all small faces that are painted.
- A variant with a cube standing on a table, so its bottom face stays unpainted, or with only some faces painted.
- Not this pattern: counting the cubes a diagonal passes through, or the visible cubes from one corner, which are counted along lines and not by position on the surface.

## Methods and Formulas to Try
Sort the small cubes by where they sat. In an $n \times n \times n$ cube with every face painted, the $8$ corners have three painted faces, the $n - 2$ cubes inside each of the $12$ edges have two, the $(n - 2)^2$ cubes inside each of the $6$ faces have one, and the core of $(n - 2)^3$ cubes has none.

The same sort works for an $a \times b \times c$ box with every side at least $2$. There are still $8$ corners with three painted faces. The edges give $4[(a - 2) + (b - 2) + (c - 2)]$ cubes with two, since each of the three edge lengths appears on four parallel edges. The faces give $2[(a - 2)(b - 2) + (b - 2)(c - 2) + (c - 2)(a - 2)]$ cubes with one, two of each face shape, and the core $(a - 2)(b - 2)(c - 2)$ cubes with none. A $3 \times 4 \times 5$ box splits as $8 + 24 + 22 + 6 = 60$. A side of length $2$ makes the core and some face counts zero, and the formulas still hold. A side of length $1$ is a slab, where every cube touches both large faces: the $4$ corners have four painted faces, the other cubes on the rim three, and the inside cubes two.

### Methods to try
- [[casework-method]]: split the small cubes by their position (corner, edge, face, core) and count each case.
- [[complementary-counting]]: the cubes with at least one painted face are all of them minus the unpainted core.

### Formulas to try
- [[cube]]: the $8$ vertices, $12$ edges, and $6$ faces of the cube are the counts behind every case.

## Common traps
- Using $n$ instead of $n - 2$ for the cubes inside an edge or a face; the corners have already been counted.
- Forgetting that an unpainted bottom face moves its cubes into lower counts: a bottom corner loses one painted face.
- Applying the cube formulas to a box, or the box formulas to a slab with a side of length $1$.
- Not checking that the four counts add to the total number of small cubes.

## Contest profile
An AMC 8 and AMC 10 problem, often phrased as a probability or a fraction of painted small faces. Harder versions paint only some faces, or work backwards from a count to the size of the cube.
`,
"angle-bisectors-of-lines": String.raw`
## Key forms
- $m = \frac34 \to m' = \frac13$, $\ m = \frac43 \to m' = \frac12$, $\ m = \frac{5}{12} \to m' = \frac15$, $\ m = \frac{12}{5} \to m' = \frac23$ — the bisector of the $x$-axis and a slope from a Pythagorean triple
- $m' = \dfrac{m}{1 + \sqrt{1 + m^2}}$ — the same slope with the root in the denominator, from $\tan\frac\theta2 = \frac{\sin\theta}{1 + \cos\theta}$
- $m' = \dfrac{m_1m_2 - 1 \pm \sqrt{(1 + m_1^2)(1 + m_2^2)}}{m_1 + m_2}$ — the two bisectors of lines with slopes $m_1$ and $m_2$, for $m_1 + m_2 \ne 0$
- the two bisectors are perpendicular: their slopes multiply to $-1$

## Conditions
The two lines cross, so they are not parallel. In the equation form, the bisector with the plus sign bisects the pair of opposite angles in which the two left sides, $a_1x + b_1y + c_1$ and $a_2x + b_2y + c_2$, have the same sign; to pick the bisector of a particular angle, test one point inside it. The slope form $m'$ is the bisector of the angle between the positive $x$-axis and the ray of slope $m$ going to the right.

## Why it works
A point lies on a bisector exactly when it is at the same distance from both lines. By [[point-line-distance|the point-to-line distance formula]], the distance from $(x, y)$ to the first line is $\frac{|a_1x + b_1y + c_1|}{\sqrt{a_1^2 + b_1^2}}$, and the same for the second. Setting the two equal and removing the absolute values gives the two signs, which are two lines through the crossing point.

For the slope form, the line of slope $m$ makes an angle $\theta$ with the $x$-axis, with $\tan\theta = m$, $\cos\theta = \frac{1}{\sqrt{1 + m^2}}$, and $\sin\theta = \frac{m}{\sqrt{1 + m^2}}$. The bisector makes the angle $\frac\theta2$, and $$\tan\frac\theta2 = \frac{\sin\theta}{1 + \cos\theta} = \frac{m}{1 + \sqrt{1 + m^2}} = \frac{\sqrt{1 + m^2} - 1}{m}.$$ The last step multiplies the numerator and denominator by $\sqrt{1 + m^2} - 1$.

## Useful observations
- The bisector slope is rational exactly when $\sqrt{1 + m^2}$ is, that is, when $m$ is the ratio of the legs of a Pythagorean triple. Conversely, a rational bisector slope $t$ comes from $m = \frac{2t}{1 - t^2}$, the [[double-angle|double-angle formula]] for the tangent.
- The center of a circle tangent to both lines lies on a bisector, so the incenter and excenters of a triangle given by its side lines are found by intersecting bisectors.

## Applications
Centers of circles tangent to two given lines, incenters and excenters in coordinates, reflecting one line in another, and the slope of a line that makes equal angles with two given lines.

## Contest profile
No problems here are tagged with it yet. It appears on the AMC 12 and the AIME when a circle is tangent to two lines through a common point, or a triangle's incenter is wanted in coordinates, where a Pythagorean slope makes the bisector come out rational.
`,
"diagonal-angle-from-sides": String.raw`
## Key forms
- $\vec{AC}\cdot\vec{BD} = \frac12\left(b^2 + d^2 - a^2 - c^2\right)$ — the signed form, with $a = AB$, $b = BC$, $c = CD$, $d = DA$
- $\tan\theta = \dfrac{4K}{\left|a^2 + c^2 - b^2 - d^2\right|}$ — the angle from the four sides and the area $K$
- $a^2 + c^2 = b^2 + d^2 \iff AC \perp BD$ — the test for perpendicular diagonals
- $16K^2 = 4d_1^2d_2^2 - \left(a^2 + c^2 - b^2 - d^2\right)^2$ — the area from the sides and the diagonals, by $\sin^2\theta + \cos^2\theta = 1$

## Conditions
The sides are taken in order around the quadrilateral, so $a$ and $c$ are opposite, and so are $b$ and $d$. The vector identity holds for any four points, convex or not. With the absolute value, $\theta$ is the acute angle between the diagonals. When $a^2 + c^2 = b^2 + d^2$ the angle is $90^\circ$ and the tangent form has no value.

## Why it works
Write each side as a difference of vertex vectors; every square cancels, and the cross terms left over are [[vector-dot-product|the dot product]] of the two diagonals.

Put the vertices at vectors $A$, $B$, $C$, $D$. Then $a^2 = |B - A|^2 = A\cdot A - 2A\cdot B + B\cdot B$, and the same for the other sides. In $b^2 + d^2 - a^2 - c^2$ each of $A\cdot A$, $B\cdot B$, $C\cdot C$, $D\cdot D$ appears once with each sign, so only cross terms remain: $$b^2 + d^2 - a^2 - c^2 = 2\left(A\cdot B - B\cdot C + C\cdot D - D\cdot A\right) = 2\,(C - A)\cdot(D - B).$$

The last step is checked by expanding $(C - A)\cdot(D - B) = C\cdot D - C\cdot B - A\cdot D + A\cdot B$. The right side is $2\,\vec{AC}\cdot\vec{BD}$, which is $\pm2d_1d_2\cos\theta$ by the definition of the dot product.

For the tangent, [[quadrilateral-diagonal-area|the diagonal area formula]] gives $d_1d_2\sin\theta = 2K$, and the identity gives $d_1d_2\cos\theta = \frac12\left|a^2 + c^2 - b^2 - d^2\right|$. Dividing, the product $d_1d_2$ cancels: $$\tan\theta = \frac{2K}{\frac12\left|a^2 + c^2 - b^2 - d^2\right|} = \frac{4K}{\left|a^2 + c^2 - b^2 - d^2\right|}.$$

## Useful observations
- The diagonals cancel from $\tan\theta$, so four sides and an area fix the angle between the diagonals even though they do not fix either diagonal.
- Without vectors it is [[law-of-cosines|the Law of Cosines]] four times: in the four triangles around the crossing point the angles alternate between $\theta$ and $180^\circ - \theta$, and the same combination of the four equations cancels the squares of the diagonal pieces.
- A kite or a rhombus has perpendicular diagonals, so its opposite sides satisfy $a^2 + c^2 = b^2 + d^2$; any quadrilateral whose opposite sides satisfy it has perpendicular diagonals.
- In a parallelogram, $a = c$ and $b = d$, and the identity becomes $d_1d_2\cos\theta = \left|a^2 - b^2\right|$.

## Applications
The angle between the diagonals of a quadrilateral given by its four sides and its area, a test for perpendicular diagonals, and the product $d_1d_2$ once the angle is known.

## Contest profile
Rare; it appears late on the AIME, when a quadrilateral is given by its four sides and its area and the angle between its diagonals is asked for. The diagonals themselves are never needed.
`,
"squares-on-triangle-flanks": String.raw`
## Key forms
- $\frac12bc\sin\left(180^\circ - A\right) = \frac12bc\sin A = K$ — each flank has the triangle's area
- $x_a^2 = b^2 + c^2 + 2bc\cos A = 2b^2 + 2c^2 - a^2 = 4m_a^2$ — the third side $x_a$ of the flank at $A$
- $x_a^2 + x_b^2 + x_c^2 = 3\left(a^2 + b^2 + c^2\right)$ — the three flank sides together
- $[\text{hexagon}] = a^2 + b^2 + c^2 + 4K$ — the triangle, the three squares, and the three flanks

## Conditions
The squares are erected outward, away from the triangle, so that the angles at a vertex are the triangle's angle, two right angles, and the flank's angle. Squares erected inward overlap the triangle, the flank's angle is no longer $180^\circ - A$, and the hexagon formula fails.

## Why it works
The flank at a vertex is the triangle's own two sides there, opened out to the supplementary angle.

At $A$ the angles around the point are the triangle's angle $A$, two right angles from the squares, and the flank's angle, and they add to $360^\circ$, so the flank's angle is $180^\circ - A$. Its two sides are sides of the squares, of lengths $c$ and $b$. Since $\sin(180^\circ - A) = \sin A$, [[trig-area|the sine area formula]] gives it area $\frac12bc\sin A = K$.

By [[law-of-cosines|the Law of Cosines]] with $\cos(180^\circ - A) = -\cos A$, the third side has $x_a^2 = b^2 + c^2 + 2bc\cos A$. Since $2bc\cos A = b^2 + c^2 - a^2$, this is $2b^2 + 2c^2 - a^2$, which is $4m_a^2$ by [[apollonius-theorem|Apollonius's Theorem]].

A rotation shows the doubled median and the right angle at once. Let the flank be $APQ$, with $P$ the corner of the square on $AB$ and $Q$ the corner of the square on $AC$. Turn it by $90^\circ$ about $A$ so that $Q$ lands on $C$; then $P$ lands on $B'$, the reflection of $B$ in $A$.

Now $A$ is the midpoint of $BB'$ and the midpoint $M$ of $BC$ is the midpoint of the other side of triangle $BB'C$, so $AM$ is a midsegment: $B'C = 2AM = 2m_a$, and $B'C \parallel AM$. Since $PQ$ is $B'C$ turned back by $90^\circ$, $PQ = 2m_a$ and $PQ \perp AM$.

## Useful observations
- The line of the median from $A$, extended past $A$, is the altitude of the flank to its third side. The roles also swap: the flank's own median from $A$ is perpendicular to $BC$ and half as long as it.
- The three flanks have equal areas whatever the triangle's shape, so the hexagon's area needs only the three sides and $K$.
- The centers of the squares are a different fact about the same picture; for squares on a quadrilateral's sides, see [[van-aubel|Van Aubel's Theorem]].

## Applications
The area of the hexagon, or of any figure built from squares on a triangle's sides, the distance between the outer corners of two adjacent squares, and a median recovered from such a distance.

## Contest profile
Uncommon; it appears when squares are erected on a triangle's sides, sometimes in repeated stages, and the area of the figure their outer corners make is asked for. The equal flank areas do most of the work.
`,
"parallel-sided-hexagon": String.raw`
## Key forms
- $s = \dfrac{abc}{ab + bc + ca}$ — the same formula solved for $s$, a third of the harmonic mean of $a$, $b$, $c$
- $a = \frac sb a + s + \frac sc a$ — the side of length $a$, on line $AB$, as two corner pieces and the hexagon's side $AB$
- $[ABCDEF] = T\left(1 - \frac{s^2}{a^2} - \frac{s^2}{b^2} - \frac{s^2}{c^2}\right)$ — the area, with $T$ the triangle's area
- $a = b = c \implies s = \frac a3$ — the regular hexagon, inside an equilateral triangle of three times its side

## Conditions
The hexagon is convex, all six sides are $s$, and $AB \parallel DE$, $BC \parallel EF$, $CD \parallel FA$. Equal sides alone do not make opposite sides parallel, since an equilateral hexagon can flex, and parallel opposite sides alone do not make the sides equal; the formula needs both. Here $a$, $b$, $c$ are the sides of the triangle that lie along lines $AB$, $CD$, $EF$.

## Why it works
Each corner cut off has its three sides parallel to the big triangle's, so it is a scaled copy, and the hexagon's side fixes the scale.

Let lines $AB$, $CD$, $EF$ form triangle $PQR$, with $P$ on lines $AB$ and $CD$, $Q$ on $CD$ and $EF$, and $R$ on $EF$ and $AB$, so that $RP = a$, $PQ = b$, $QR = c$.

The corner at $P$ is triangle $PBC$. Two of its sides lie along $PR$ and $PQ$, and its third side $BC$ is parallel to $EF$, that is, to $QR$. So it is [[similar-figures-ratios|similar]] to $PQR$, with $BC = s$ matching $QR = c$: the scale is $\frac sc$, and $PB = \frac sc a$. In the same way the corner at $R$, cut off by $FA \parallel CD$, has scale $\frac sb$, and $RA = \frac sb a$.

Line $RP$ is made of $RA$, $AB$, and $BP$, so $$a = \frac sb a + s + \frac sc a.$$ Dividing by $as$ gives $\frac1s = \frac1a + \frac1b + \frac1c$. The corner at $Q$, cut off by $DE \parallel AB$, has scale $\frac sa$, and the other two sides of the triangle give the same equation.

## Useful observations
- The hexagon is centrally symmetric: $AB$ and $DE$ are equal and parallel, so $ABDE$ is a parallelogram and $AD$ and $BE$ bisect each other, and likewise for $CF$. Extending the other three sides, $BC$, $DE$, $FA$, gives the first triangle reflected through the center, with the same sides.
- Each of the three sides of the triangle gives the same equation, which checks the assignment of $a$, $b$, $c$ to the corners.
- When all six angles are $120^\circ$ instead, the corners cut off are equilateral, as on [[equiangular-hexagon-area|Area of an Equiangular Hexagon]]; the regular hexagon is the only one in both families.

## Applications
The side of such a hexagon from the triangle made by its extended sides, a side of that triangle from the hexagon's side and the other two, and the hexagon's area by subtracting the three corners.

## Contest profile
Rare; an AIME problem gives the triangle made by extending alternate sides of an equilateral hexagon with parallel opposite sides and asks for the hexagon's side. Seeing the three corners as scaled copies of the triangle is the whole problem.
`,
"closing-polygon-vectors": String.raw`
## When to use
A polygon has known angles and sides given in order: an equiangular hexagon with four sides known, an equiangular pentagon with conditions on the squares of its sides, or a path of segments turning by fixed angles that must come back to its start. Closure supplies the relations among the sides.

It is the wrong move for a triangle, where the [[law-of-cosines|Law of Cosines]] already says everything closure would, and for a polygon whose angles are unknown, since then the directions are unknowns too.

## How
1. Go around the polygon in order and write side $k$ as $a_k\vec u_k$, its length times the unit vector along it.
2. Find the directions from the angles: each side turns by the exterior angle, $180^\circ$ minus the interior angle; for an equiangular $n$-gon take $\vec u_k = \omega^k$ with $\omega = e^{2\pi i/n}$.
3. Set the sum of the side vectors to zero.
4. For linear relations, split the sum into two components, or reduce the powers of $\omega$ to $1$ and $\omega$ and set both coefficients to zero.
5. For a relation among products, dot the sum with itself: $\sum a_k^2 + 2\sum_{j \lt k} a_ja_k\,\vec u_j\cdot\vec u_k = 0$.
6. Combine the relations with the given data and check that every side comes out positive.

For an equiangular pentagon, step 5 gives $\sum a_k^2 + 2J\cos72^\circ + 2K\cos144^\circ = 0$, where $J$ adds the five products of adjacent sides and $K$ the five products of sides that are not adjacent.

## Why it works
The sum of the side vectors is the displacement from the starting vertex back to itself, so it is the zero vector. A vector is zero exactly when both its components are zero, which gives two real equations, and exactly when its length is zero, which gives the dotted form, by [[vector-dot-product|the dot product]].

In the equiangular case the directions are the powers of one root of unity, and $\omega^n = 1$ lets every power be reduced. For a hexagon, $\omega^3 = -1$ and $\omega^2 = \omega - 1$, so the closure equation becomes $p + q\omega = 0$ with $p$ and $q$ real, and since $\omega$ is not real, $p = q = 0$. Closure is necessary but not sufficient: it does not make the polygon convex or its sides positive, which is why the last step checks them.

## Formulas it uses
- [[vector-dot-product]]: $\vec u \cdot \vec v = \cos\theta$ for unit vectors at angle $\theta$, and $|\vec v|^2 = \vec v\cdot\vec v$.
- [[roots-of-unity]]: the directions $1, \omega, \dots, \omega^{n-1}$ of an equiangular $n$-gon, and $\omega^n = 1$.

## Common traps
- Turning by the interior angle instead of the exterior angle, $180^\circ$ minus it.
- Listing the sides out of order, which changes which products are adjacent.
- Counting each pair once in the dotted form, where it appears twice.
- Accepting a side that comes out zero or negative.

## Contest profile
Uncommon; it appears on the AIME when an equiangular hexagon or pentagon is given by some of its sides, or by sums of squares of its sides and diagonals, and the remaining sides or the perimeter are asked for.
`,
"cevian-ratio-sum": String.raw`
## Key forms
- $\frac{PD}{AD} = \frac{[PBC]}{[ABC]}$, and likewise $\frac{PE}{BE} = \frac{[PCA]}{[ABC]}$, $\frac{PF}{CF} = \frac{[PAB]}{[ABC]}$
- $\frac{PD}{AD} + \frac{PE}{BE} + \frac{PF}{CF} = 1$ — the short pieces
- $\frac{AP}{AD} + \frac{BP}{BE} + \frac{CP}{CF} = 2$ — the long pieces, since $\frac{AP}{AD} = 1 - \frac{PD}{AD}$
- with barycentric coordinates $P = (\alpha : \beta : \gamma)$, $\alpha + \beta + \gamma = 1$: $\frac{PD}{AD} = \alpha$, $\frac{PE}{BE} = \beta$, $\frac{PF}{CF} = \gamma$

## Conditions
$P$ is inside the triangle and $D$, $E$, $F$ are where the lines $AP$, $BP$, $CP$ meet the opposite sides. The three cevians concur at $P$ by construction, so no [[cevas-theorem|Ceva]] condition is needed; the identity holds for every interior point.

## Why it works
Each fraction is an area ratio, and the three areas fill the triangle.

Triangles $PBC$ and $ABC$ share the base $BC$. Their heights over it are the distances from $P$ and from $A$ to line $BC$, and these are in the ratio $PD : AD$, because $P$ and $A$ lie on one line through $D$ and the heights are the vertical components of $DP$ and $DA$. So $$\frac{[PBC]}{[ABC]} = \frac{PD}{AD}.$$

The same argument at $B$ and at $C$ gives $\frac{[PCA]}{[ABC]} = \frac{PE}{BE}$ and $\frac{[PAB]}{[ABC]} = \frac{PF}{CF}$. The triangles $PBC$, $PCA$, $PAB$ cover $ABC$ without overlap, so their areas add to $[ABC]$, and the three fractions add to $1$.

For the long pieces, $\frac{AP}{AD} = 1 - \frac{PD}{AD}$, and adding the three gives $3 - 1 = 2$.

## Useful observations
- At the centroid each short piece is a third of its median, the case of three equal fractions.
- Two of the fractions fix the third, so two cevians cut in known ratios give the third ratio with no mass points.
- When the three short pieces are equal to $d$ and the long pieces are $x$, $y$, $z$, the identity reads $\frac d{x + d} + \frac d{y + d} + \frac d{z + d} = 1$, and clearing denominators gives $xyz = (x + y + z)d^2 + 2d^3$.
- The fractions are the barycentric coordinates of $P$, so this is the statement that those coordinates add to $1$.

## Applications
Finding a third cevian ratio from two others, and problems that give the pieces of three concurrent cevians and ask for a product, a sum or an area.

## Contest profile
Uncommon; it appears on the AIME when three cevians through one point are given by their pieces, often pairing with [[same-base-area-ratio|areas over a shared base]] or with mass points to finish.
`,
"square-crossing-segments": String.raw`
## Distinguishing clues
- A square with one point given on each side, and its side or area asked for.
- Two segments across a square, one joining each pair of opposite sides, at right angles.
- A slanted segment across a square, with a perpendicular to it, or the pieces it cuts off, to be measured.
- Not this pattern: a segment from a side to an adjacent side, or a rectangle that is not a square, where the two lengths differ.

## Methods and Formulas to Try
Let $PQ$ join the bottom and top sides of a square of side $s$, and $RS$ join the left and right sides, with $PQ \perp RS$. If $PQ$ makes the angle $\varphi$ with the vertical, its vertical part is $s$, so $PQ = \frac{s}{\cos\varphi}$. The segment $RS$ makes the same angle $\varphi$ with the horizontal and its horizontal part is also $s$, so $RS = \frac{s}{\cos\varphi} = PQ$, wherever the segments sit: they need not cross each other or pass through the center. Equivalently, a quarter turn about the center maps the square to itself, swaps the two pairs of sides, and turns the direction of $PQ$ into that of $RS$. In a rectangle with sides $p \ne q$ the same count gives $\frac p{\cos\varphi}$ and $\frac q{\cos\varphi}$.

### Methods to try
- [[extend-sides-to-meet]]: extend a slanted segment until it meets the lines of the square's sides. Every right triangle it makes with a side line has the angle $\varphi$, so all of them are similar, and the given lengths pass from one triangle to the next by ratios.
- [[coordinate-bash]]: put the square on the axes; a segment along $(p, q)$ and one along $(-q, p)$ are perpendicular and equally long, so the unknown side drops out of one linear equation.

### Formulas to try
- [[rotation-90]]: turning the vector of one segment a quarter turn gives the direction and length of the other, which places the fourth side when four points are given.
- [[triangle-similarity]]: the right triangles cut off by a slanted segment and the side lines share the angle $\varphi$.
- [[parallel-lines-distance]]: opposite sides through two of the given points are parallel lines, and their distance is the side of the square.
- [[pythagorean-theorem]]: a crossing segment of length $L$ is offset by $\sqrt{L^2 - s^2}$ along the sides it joins.

## Common traps
- Pairing a point with the wrong opposite side: the equal segments join opposite sides, one pair each.
- Using it in a rectangle, where the lengths are in the ratio of the sides.
- With four points given, forgetting that the perpendicular through the third point is exactly as long as the segment joining the other two; that length is what places the side through the fourth point.

## Contest profile
Rare; it appears on the AIME when a square is determined by four points, one on each side, and its area is asked for, finished with [[parallel-lines-distance|the distance between parallel lines]].
`,
"perimeter-cleavers": String.raw`
## Key forms
- the cleaver through the midpoint $M$ of $AB$ ends at $X$ on $CA$ with $AX = \frac{a + b}2$ when $a \le b$, or on $CB$ with $BX = \frac{a + b}2$ when $a \ge b$
- $MX \parallel CD$, where $CD$ is the bisector of angle $C$
- the three cleavers are the angle bisectors of the medial triangle and meet at the Spieker point
- two cleavers meet at the same angles as the bisectors they are parallel to; the ones through the midpoints of $AB$ and $AC$ meet at $90^\circ - \frac A2$

## Conditions
The sides are $a = BC$, $b = CA$, $c = AB$ and $s$ is the semiperimeter. The cleaver through $M$ leaves $s$ of the perimeter on each side of it, counted from $M$ both ways.

## Why it works
The endpoint is fixed by the perimeter count, and then [[angle-bisector-theorem|the Angle Bisector Theorem]] shows the parallel through equal ratios.

Step 1, the endpoint. From $M$ the perimeter runs $\frac c2$ to $A$ and then along $AC$. Half the perimeter is $s$, so the cleaver ends on $CA$ at $X$ with $AX = s - \frac c2 = \frac{a + b}2$, which lies on the side when $\frac{a + b}2 \le b$, that is $a \le b$. Otherwise it ends on $CB$ with $BX = \frac{a + b}2$.

Step 2, the parallel. The bisector from $C$ meets $AB$ at $D$ with $AD = \frac{bc}{a + b}$. Then $$\frac{AM}{AD} = \frac{c/2}{bc/(a + b)} = \frac{a + b}{2b} = \frac{AX}{AC},$$ so by the converse of [[intercept-theorem|the Intercept Theorem]] $MX \parallel CD$. In the other case $\frac{BM}{BD} = \frac{a + b}{2a} = \frac{BX}{BC}$, with the same conclusion.

Step 3, the concurrence. The medial triangle has its sides parallel to those of $ABC$, so its angle at $M$ has sides parallel to $CA$ and $CB$ and equals angle $C$. A line through $M$ parallel to the bisector of $C$ bisects that angle. So the three cleavers are the bisectors of the medial triangle, and they meet at its incenter, the Spieker point.

Step 4, the angle. Parallel lines meet other lines at equal angles, so two cleavers cross as the two bisectors do, and the bisectors from $B$ and $C$ meet at $90^\circ + \frac A2$, that is at $90^\circ - \frac A2$ the other way.

## Useful observations
- In an isosceles triangle with $a = b$ the cleaver through $M$ runs to $C$ itself and is the median, the altitude and the bisector at once.
- A condition on the angle between two cleavers is a condition on one angle of the triangle; a $30^\circ$ crossing forces $A = 120^\circ$.
- The cleaver through a midpoint always heads toward the longer of the two other sides.

## Applications
Lines that halve the perimeter of a triangle, the angle between two of them, and the Spieker point as their common point.

## Contest profile
Rare; it appears late on the AIME as the hidden step in a problem about lines that halve a triangle's perimeter, after which the problem becomes one about the triangle's angles, often finished with [[law-cosines-60-120|the Law of Cosines at a special angle]].
`,
"conic-perpendicular-radii": String.raw`
## Key forms
- ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$: $\frac1{OA^2} + \frac1{OB^2} = \frac1{a^2} + \frac1{b^2}$ when $OA \perp OB$
- hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$: $\frac1{OA^2} + \frac1{OB^2} = \frac1{a^2} - \frac1{b^2}$, possible only when $b \gt a$
- the radius at angle $\theta$: $\frac1{\rho^2} = \frac{\cos^2\theta}{a^2} \pm \frac{\sin^2\theta}{b^2}$
- the chord $AB$ is at distance $d$ from $O$ with $\frac1{d^2} = \frac1{OA^2} + \frac1{OB^2}$, so every such chord touches one circle about $O$

## Conditions
The conic is centered at the origin with its axes along the coordinate axes, and $O$ is that center. For the hyperbola both radii must meet the curve, so each direction must lie between the asymptotes, which needs $b \gt a$; as one radius turns toward an asymptote it grows without bound.

## Why it works
Write each point in polar form; turning by $90^\circ$ swaps $\cos^2$ and $\sin^2$, so the two equations add to a constant.

A point at distance $\rho$ from $O$ in the direction $\theta$ is $(\rho\cos\theta, \rho\sin\theta)$. Putting it into the ellipse's equation gives $\rho^2\left(\frac{\cos^2\theta}{a^2} + \frac{\sin^2\theta}{b^2}\right) = 1$, so $$\frac1{OA^2} = \frac{\cos^2\theta}{a^2} + \frac{\sin^2\theta}{b^2}.$$

The perpendicular radius has direction $\theta + 90^\circ$, where the cosine and sine squared trade places: $\frac1{OB^2} = \frac{\sin^2\theta}{a^2} + \frac{\cos^2\theta}{b^2}$. Adding, and using $\cos^2\theta + \sin^2\theta = 1$, gives $\frac1{a^2} + \frac1{b^2}$. The hyperbola is the same with $-\frac1{b^2}$ in place of $\frac1{b^2}$.

For the chord: in the right triangle $AOB$, the altitude $d$ from $O$ satisfies $d \cdot AB = OA \cdot OB$, so $$\frac1{d^2} = \frac{AB^2}{OA^2\,OB^2} = \frac{OA^2 + OB^2}{OA^2\,OB^2} = \frac1{OA^2} + \frac1{OB^2},$$ a constant, so $d$ is fixed.

## Useful observations
- A rhombus inscribed in a central conic and centered at its center has perpendicular diagonals through $O$, so its half-diagonals are perpendicular radii and the identity applies to them.
- On a hyperbola, as one radius approaches an asymptote its reciprocal square tends to $0$, so the other radius tends to its smallest value, $\left(\frac1{a^2} - \frac1{b^2}\right)^{-1/2}$, which it never reaches.
- For a circle, $a = b = r$, and the identity says $\frac2{r^2} = \frac2{r^2}$.

## Applications
Rhombi and right angles inscribed in an ellipse or hyperbola about its center, bounds on a diagonal, and the fixed circle that the chords of a right angle touch.

## Contest profile
Rare; it appears late on the AIME when a rhombus or a right angle is inscribed in a conic about its center and a diagonal must be bounded, beside [[hyperbola-properties|the hyperbola's asymptotes]].
`,
"gram-determinant-volume": String.raw`
## Key forms
- $V^2 = \det G$, where $G$ is the $3 \times 3$ table of the dot products of $u$, $v$, $w$
- $V^2 = \ell_1^2\ell_2^2\ell_3^2\left(1 - \cos^2\alpha - \cos^2\beta - \cos^2\gamma + 2\cos\alpha\cos\beta\cos\gamma\right)$, with $\alpha$, $\beta$, $\gamma$ the angles between the pairs of edges
- equal edges $\ell$ and equal angles $\theta$: $V = \ell^3\sqrt{1 - 3\cos^2\theta + 2\cos^3\theta}$
- the tetrahedron on the same three edges has volume $\frac V6$

## Conditions
$u$, $v$, $w$ are the three edge vectors from one vertex of the parallelepiped, so the angles are those at that vertex. The determinant is never negative, and it is zero exactly when the three vectors lie in a plane.

## Why it works
Put the three vectors as the rows of a matrix $M$; the volume is $|\det M|$, and the table of dot products is $MM^{\mathsf T}$.

The volume of the parallelepiped is the absolute value of [[cross-product-area|the triple product]], $|u\cdot(v \times w)| = |\det M|$. The entry in row $i$ and column $j$ of $MM^{\mathsf T}$ is the dot product of row $i$ of $M$ with row $j$, so $MM^{\mathsf T}$ is exactly the table $G$. Since $\det M^{\mathsf T} = \det M$, $$\det G = \det M \cdot \det M^{\mathsf T} = (\det M)^2 = V^2.$$

Writing $u\cdot v = \ell_1\ell_2\cos\gamma$ and so on and expanding the $3 \times 3$ determinant gives the form in the cosines; with all lengths $\ell$ and all cosines $c$ it is $\ell^6\left(1 - 3c^2 + 2c^3\right)$.

## Useful observations
- The two-dimensional version is $A^2 = |u|^2|v|^2 - (u\cdot v)^2$ for the parallelogram on $u$ and $v$, which is $\sin^2$ of the angle written through the cosine.
- Changing the signs of the dot products changes only the last term, $2\cos\alpha\cos\beta\cos\gamma$, so two solids with the same edges and the same angles up to supplement differ in volume through that term alone.
- With angles $60^\circ$ and equal edges the solid is the one built from a regular tetrahedron, and the formula gives $\frac{\ell^3}{\sqrt2}$.

## Applications
Volumes of parallelepipeds and tetrahedra given by edge lengths and the angles at a vertex, or by the dot products of the edges, with no coordinates set up.

## Contest profile
Rare; it appears late on the AIME when a parallelepiped is described only by its faces or by the angles at a vertex, often after dot products turn the face data into the angles.
`
});
Object.assign(window.MATH_DETAILS, {
"rotated-line-angle": String.raw`
## Key forms
- $\angle(\ell, \rho(\ell)) = \theta$ — a rotation by $\theta$ about any center turns every line by $\theta$, measured as an angle between lines, modulo $180^\circ$
- $\theta = \angle(AB, A'B')$ — the converse reading: the angle of a rotation is the angle between any segment $AB$ and its image $A'B'$
- $\theta = 180^\circ \implies \ell' \parallel \ell$ — a half-turn sends every line to a parallel one

## Conditions
The angle is between lines, so it is defined up to $180^\circ$: a rotation by $\theta$ and one by $\theta + 180^\circ$ turn lines the same way. As angles between rays, a ray and its image make exactly $\theta$.

## Why it works
The idea is that a rotation turns every direction by the same angle, wherever it is applied, because a rotation is a translation-free turn followed by nothing else: the vector from any point $X$ to any point $Y$ is turned by $\theta$.

The perpendicular from the center shows it in the figure. Let $F$ be the foot of the perpendicular from $O$ to $\ell$. The rotation sends $F$ to $F'$ and $\ell$ to the line through $F'$ perpendicular to $OF'$, since right angles are kept, and $\angle FOF' = \theta$.

If the lines meet at $P$, the quadrilateral $OFPF'$ has right angles at $F$ and $F'$, so its angles at $O$ and $P$ add up to $180^\circ$:

$$\angle FPF' = 180^\circ - \angle FOF' = 180^\circ - \theta.$$

The two lines therefore make the angles $180^\circ - \theta$ and $\theta$ at $P$, which is the claim.

## Useful observations
- Finding a rotation is half done once its angle is known: the angle between one side and its image gives it, and [[rotation-center|finding the center]] gives the rest.
- When a figure is rotated so that a side becomes vertical or horizontal, the rotation angle is the angle that side makes with that direction, read from its slope.
- The point $P$ where $\ell$ and $\ell'$ meet lies on the circle through $O$, $F$, and $F'$, the circle with diameter $OP$.

## Applications
Rotated copies of polygons and triangles, the angle between a side and its image, and choosing the angle of a rotation from a direction a side must take.

## Contest profile
An AIME fact used inside rotation problems: it fixes the angle of a rotation from one side and its image. It pairs with Rotating a Point and with coordinates.
`
});
Object.assign(window.MATH_DETAILS, {
"spheres-two-planes": String.raw`
## Key forms
- $\operatorname{dist}(O, \mathcal P) = \operatorname{dist}(O, \mathcal T) = r$ — the center of a sphere tangent to both planes is equidistant from them
- centers of spheres tangent to $\mathcal P$ and $\mathcal T$, on the same sides, lie on one bisecting plane — so any number of such centers are coplanar
- $r = d\tan\tfrac{\varphi}{2}$ — with $d$ the distance from the tangency point on $\mathcal P$ to the edge $\mathcal P \cap \mathcal T$ and $\varphi$ the dihedral angle, so $r$ is a linear function of the tangency point

## Conditions
The spheres lie on the same side of $\mathcal P$ and on the same side of $\mathcal T$, so their centers are in one of the four wedges and on its bisecting plane. If the planes are parallel, the radius is half their distance and the centers lie on the midway plane.

## Why it works
The idea is that tangency to a plane fixes the distance from the center to that plane, and the points at equal distances from two planes form the two planes that bisect the angles between them.

A sphere of radius $r$ is tangent to a plane exactly when its center is at distance $r$ from the plane, the radius to the point of tangency being perpendicular to the plane. Tangent to both, the center is at distance $r$ from each, so it is equidistant from $\mathcal P$ and $\mathcal T$.

Seen along the edge, as in the figure, each plane is a line through a point $E$ and each sphere is a circle tangent to both lines. The points equidistant from two lines are their angle bisectors, so the centers lie on the bisector of the wedge that holds the spheres, and in space that bisector is a plane through the edge.

For the radius, the center $O$ is straight above its tangency point $T$ on $\mathcal P$, at height $r$, and the bisecting plane makes the angle $\tfrac{\varphi}{2}$ with $\mathcal P$. In the cross-section through $T$ perpendicular to the edge, the right triangle with legs $d$ and $r$ has angle $\tfrac{\varphi}{2}$ at the edge, so $r = d\tan\tfrac{\varphi}{2}$.

## Useful observations
- In coordinates with $\mathcal P$ the plane $z = 0$, the centers are $(x_i, y_i, r_i)$ with $(x_i, y_i)$ the tangency points; one plane through three centers gives the radius of a fourth sphere from its tangency point alone.
- The distance from a tangency point to the edge sets the radius, so tangency points in a line parallel to the edge give equal radii.
- In two dimensions the same fact puts the centers of circles tangent to two lines on an angle bisector, the start of [[triangle-of-centers|joining the centers]] in corner problems.

## Applications
Spheres resting on a table and touching a tilted plane, balls in a wedge, and finding one radius from the others when all touch the same two planes.

## Contest profile
A late AIME fact in three-dimensional tangency problems: it turns several spheres touching two planes into one plane of centers. It pairs with coordinates in space and Point-to-Plane Distance.
`
});
Object.assign(window.MATH_DETAILS, {
"lester-circle": String.raw`
## Key forms
- $F_1$, $F_2$, $O$, $N$ lie on one circle — for every scalene triangle
- $N$ is the midpoint of $OH$ — so the circle meets the Euler line at $O$ and at the nine-point center

## Conditions
The triangle is scalene. In an isosceles triangle the four points lie on the axis of symmetry, so they are collinear rather than concyclic, and in an equilateral triangle they coincide.

## Why it works
Quoted, not proved here. The proofs in print are a coordinate computation (in trilinear or complex coordinates) and short synthetic arguments that need more triangle geometry than this card can set up: J. F. Rigby, "A Simple Proof of Lester's Theorem", Mathematical Gazette 81 (1997), and P. Yiu, "The circles of Lester, Evans, Parry, and their generalizations", Forum Geometricorum 10 (2010). The Kiepert hyperbola, the rectangular hyperbola through the vertices, the centroid, the orthocenter and both Fermat points, appears in several of these arguments, but $O$ and $N$ are generally not on it. No contest solution proves the theorem; it is quoted.

The two Fermat points come from the construction in [[fermat-point|Fermat Point (Torricelli Point)]]: the three lines from the vertices to the apexes of equilateral triangles erected on the opposite sides meet at one point, outward for $F_1$ and inward for $F_2$. The nine-point center is the midpoint of $O$ and the orthocenter $H$, as on the [[nine-point-circle|nine-point circle]] card.

## Useful observations
- The figure shows a triangle with no angle near $60^\circ$. As the angle at a vertex approaches $60^\circ$, the second Fermat point $F_2$ approaches that vertex (with $A = (0, 0)$, $B = (4, 0)$, $C = 2(\cos\theta, \sin\theta)$, at $\theta = 59.9^\circ$ it is about $(0.004, -0.007)$), so the picture crowds there.
- The line $F_1F_2$ passes through the symmedian point, another of the collinearities in this corner of triangle geometry.

## Applications
Concyclicity results about triangle centers, and as a check in computer explorations of triangle geometry.

## Contest profile
A triangle-geometry curiosity, never needed on the AMC or AIME and rarely in olympiads. It pairs with the Fermat Point and the Nine-Point Circle.
`
});
Object.assign(window.MATH_DETAILS, {
"droz-farny": String.raw`
## Key forms
- $\ell_1 \perp \ell_2$ through $H$ $\implies$ the midpoints of the three segments they cut on $BC$, $CA$, $AB$ are collinear
- the circles on those three segments as diameters all pass through $H$ — each segment subtends the right angle at $H$

## Conditions
The side lines are extended as needed, and neither $\ell_1$ nor $\ell_2$ is parallel to a side. The triangle is not right-angled, so that $H$ is not on a side.

## Why it works
The idea is to put the right angle on the coordinate axes: then each midpoint has coordinates read off the intercepts of a side line, and the orthocenter condition is a statement about the normals of the side lines.

Step 1, the setup. Put $H$ at the origin with $\ell_1$ and $\ell_2$ as the axes, and write side line $i$ as $u_i x + v_i y = 1$. It meets the axes at $\left(\tfrac1{u_i}, 0\right)$ and $\left(0, \tfrac1{v_i}\right)$, so its midpoint is $M_i = \left(\tfrac1{2u_i}, \tfrac1{2v_i}\right)$.

Step 2, the orthocenter. The vertex opposite side $i$ lies on the altitude through $H$, the line along the normal $n_i = (u_i, v_i)$, so it is $t_i n_i$. Lying on the other two side lines gives $t_i(n_i \cdot n_j) = 1 = t_i(n_i \cdot n_k)$, so all three dot products $n_1 \cdot n_2$, $n_2 \cdot n_3$, $n_3 \cdot n_1$ are equal, say to $c$.

Step 3, the collinearity. The midpoints are collinear exactly when the three points $\left(\tfrac1{u_i}, \tfrac1{v_i}\right)$ are, and multiplying row $i$ of that determinant by $u_iv_i$ turns the condition into

$$\det\begin{pmatrix} v_1 & u_1 & u_1v_1 \\ v_2 & u_2 & u_2v_2 \\ v_3 & u_3 & u_3v_3 \end{pmatrix} = 0,$$

which follows from the three equal dot products by expanding along the last column; the algebra is routine but long.

## Useful observations
- Turning the right angle about $H$ moves the line; when one of the lines is an altitude the segment on that side collapses toward the foot.
- The circles on the three segments as diameters pass through $H$, and their centers are the three midpoints, so the theorem says these circles share a second common point.

## Applications
Collinearity statements about the orthocenter and lines through it.

## Contest profile
A classical olympiad statement, set as a problem more often than quoted. It pairs with the orthocenter's reflection properties and with coordinates centered at $H$.
`
});
Object.assign(window.MATH_DETAILS, {
"anti-steiner-point": String.raw`
## Key forms
- $s_{BC}(\ell)$, $s_{CA}(\ell)$, $s_{AB}(\ell)$ concur at $S$ on the circumcircle — for every line $\ell$ through $H$
- $\ell$ is the Steiner line of $S$ — the reflections of $S$ in the three sides lie on $\ell$, so the two constructions undo each other
- the anti-Steiner point of the Euler line is the Euler reflection point — the best-known case

## Conditions
The line passes through the orthocenter. For a line not through $H$ the three reflections form a triangle instead of meeting at a point.

## Why it works
The idea is that each reflected line passes through a reflection of $H$, which lies on the circumcircle, and a directed-angle count shows that two reflected lines meet on the circle.

Step 1, three points on the circle. The reflection $H_a$ of $H$ in $BC$ lies on the circumcircle ([[orthocenter-properties|Orthocenter Reflections & Distances]]), and so do $H_b$ and $H_c$. The reflection of $\ell$ in $BC$ passes through $H_a$, since $\ell$ passes through $H$, and likewise for the other two.

Step 2, two lines meet on the circle. Reflecting in $BC$ and in $CA$ turns the directions of lines so that, in [[directed-angles|directed angles]] modulo $180^\circ$,

$$\angle\big(s_{BC}(\ell), s_{CA}(\ell)\big) = 2\angle(BC, CA) = \angle(CH_a, CH_b),$$

the last because $CH_a$ and $CH_b$ are the reflections of $CH$ in $BC$ and $CA$. So the two reflected lines meet at a point $S$ with $\angle H_aSH_b = \angle H_aCH_b$, and $S$ lies on the circle through $H_a$, $C$, $H_b$, the circumcircle.

Step 3, the third line. The same argument for $s_{BC}(\ell)$ and $s_{AB}(\ell)$ gives a point on the circumcircle and on $s_{BC}(\ell)$. A line meets the circle at $H_a$ and one more point, and both points found are that second point, so all three lines pass through $S$.

## Useful observations
- The Steiner line of a point $P$ on the circumcircle passes through $H$; the anti-Steiner point goes the other way, from a line through $H$ back to the point.
- Two lines through $H$ that are perpendicular have anti-Steiner points at the ends of a diameter of the circumcircle.

## Applications
Olympiad problems with lines through the orthocenter, reflections of lines in the sides, and points on the circumcircle defined by them.

## Contest profile
An olympiad configuration tool, used to name the point where reflections of a line through the orthocenter meet. It pairs with the Steiner line and the orthocenter's reflections.
`
});
Object.assign(window.MATH_DETAILS, {
"composing-transformations": String.raw`
## When to use
A figure is rotated and reflected several times, and the question is about the net effect: what single move the sequence equals, how many sequences bring the figure back, or where one point lands. It is cleanest when every move fixes the origin; with a different center, shift the center to the origin first. Lookalikes: one rotation of one point is just Rotating a Point, and a pair of reflections in lines through a point is the single fact that they compose to a rotation by twice the angle between the lines.

## How
1. Write the matrix of each move: a rotation by $\theta$ is $\begin{pmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix}$, and a reflection in the line through the origin at angle $\alpha$ is $\begin{pmatrix}\cos2\alpha & \sin2\alpha \\ \sin2\alpha & -\cos2\alpha\end{pmatrix}$.
2. Multiply in order, the first move on the right and the last on the left.
3. Read the product: determinant $1$ means a rotation, by the angle whose cosine is the top-left entry; determinant $-1$ means a reflection.
4. For a question about returning to the start, count the sequences whose product is the identity, using the determinant to sort rotations from reflections first.
5. For a move about a point $C \ne 0$, apply it as $x \mapsto C + M(x - C)$.

Rotating $90^\circ$ counterclockwise and then reflecting in $y = x$ gives $\begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}0&-1\\1&0\end{pmatrix} = \begin{pmatrix}1&0\\0&-1\end{pmatrix}$, the reflection in the $x$-axis.

## Why it works
A rotation or reflection about the origin is a linear map, so it is multiplication by a matrix, and doing one map after another multiplies their matrices. The order matters because matrix products do not commute in general: $M_2M_1$ means $M_1$ first.

Determinants multiply, and a rotation has determinant $1$ while a reflection has $-1$, so the product of the moves has determinant $(-1)^{r}$ for $r$ reflections. An even number of reflections leaves a rotation and an odd number a reflection, which is often the first thing a counting question needs. The method stops at moves that are not about a common point, where the translations have to be carried along.

## Formulas it uses
- [[rotation-reflection-matrices]]: gives the matrix of each rotation and reflection in the chain.
- [[matrix-multiplication]]: multiplies the matrices in order, the last move on the left.
- [[reflection-composition]]: two reflections make a rotation by twice the angle between their lines, a quick check on a product of two reflection matrices.

## Common traps
- Multiplying in the order the moves are listed, which applies the last move first.
- Forgetting that a rotation about a point other than the origin is not a matrix alone.
- Treating clockwise and counterclockwise as the same angle; they are $\theta$ and $-\theta$.
- Counting a reflection's matrix as its own inverse but a rotation's as well: only the half-turn is.

## Contest profile
An AMC 10 and 12 tool for sequences of rotations and reflections of a figure, often the whole solution of a counting question about which sequences return a triangle to its place. It pairs with the Rotation and Reflection Matrices and with the rule that two reflections make a rotation.
`
});
Object.assign(window.MATH_DETAILS, {
"directed-lengths": String.raw`
## When to use
A computation uses ratios or products of lengths on a line, through Menelaus, Ceva, power of a point, or distances along an altitude, and the figure might change shape: a point on the extension of a side rather than on the side, an obtuse angle that sends the foot of an altitude outside the opposite side, a point inside a circle rather than outside. Directed lengths let one formula cover all of these at once. A length asked for as an answer is still a distance, so it is the absolute value of the directed one.

## How
1. Say for each quantity whether it is a distance, a directed length, or a signed coordinate.
2. Choose a direction on each line before writing a ratio, so that $\overline{AB} = x_B - x_A$.
3. Note for each point whether it lies inside a segment or on an extension: $\frac{\overline{AF}}{\overline{FB}}$ is positive for a point inside $AB$ and negative outside.
4. Write the theorem in its directed form, with Menelaus' product $-1$ and power $\overline{PA} \cdot \overline{PB} = OP^2 - r^2$.
5. Compute, and take absolute values only for the lengths the answer asks for.
6. Check the result against a redrawn figure with an obtuse angle or a point moved outside.

For a point $P$ on a chord $AB$ of a circle with center $O$ and radius $r$, the directed product $\overline{PA} \cdot \overline{PB}$ is $OP^2 - r^2$ in every case. Inside the circle $A$ and $B$ lie on opposite sides of $P$, the product is negative, and the unsigned lengths satisfy $PA \cdot PB = r^2 - OP^2$. Outside, both point the same way and $PA \cdot PB = OP^2 - r^2$.

## Why it works
Directed lengths along a line are differences of coordinates, so $\overline{AB} + \overline{BC} = (x_B - x_A) + (x_C - x_B) = x_C - x_A = \overline{AC}$ whatever the order of the three points. Unsigned lengths satisfy $AB + BC = AC$ only when $B$ is between $A$ and $C$, which is why a proof written with them silently assumes one picture.

The chosen direction does not matter for the quantities theorems use. Reversing the line negates every directed length on it, so a ratio $\frac{\overline{AF}}{\overline{FB}}$ of two lengths on one line and a product $\overline{PA} \cdot \overline{PB}$ of two lengths on one line are unchanged. A ratio is negative exactly when $F$ is outside the segment, which is the information an unsigned ratio throws away.

That lost sign is why unsigned converses fail. The three midpoints of the sides give unsigned Menelaus ratios $1$, $1$, $1$ with product $1$, but all three points are inside their sides, the directed product is $+1$ rather than $-1$, and the points are not collinear. With directed lengths the converse needs no extra hypothesis.

The same thing happens along an altitude. With $BC$ directed from $B$ to $C$, the foot $D$ of the altitude from $A$ has $\overline{BD} = AB\cos B$, which is negative when $B$ is obtuse, and $\overline{DC} = \overline{DB} + \overline{BC}$ still holds. Statements such as "the orthocenter is two thirds of the way down the altitude" compare unsigned lengths and hold only for acute triangles; written with signed heights they hold for all triangles.

The method has a limit: a sign is defined only along one line, or along parallel lines given one common direction. A ratio of segments on two lines that are not parallel has no sign.

## Formulas it uses
- [[menelaus-theorem]]: its directed form, product $-1$, is a test for collinearity with no conditions on the configuration.
- [[power-of-a-point]]: the directed product $\overline{PA} \cdot \overline{PB} = OP^2 - r^2$ covers points inside and outside the circle at once.
- [[orthocenter-properties]]: the distances $AH = 2R\cos A$ and $HD = 2R\cos B\cos C$ are signed, which is what makes them valid for obtuse triangles.

## Common traps
- Concluding collinearity from an unsigned Menelaus product of $1$ without checking how many points lie outside the sides.
- Writing $OP^2 - r^2$ as the unsigned product $PA \cdot PB$ for a point inside the circle, where it is negative.
- Proving a relation for an acute triangle with unsigned lengths and applying it to an obtuse one.
- Changing the direction of a line halfway through a computation.

## Contest profile
An AIME and olympiad habit more than a single step: it keeps a ratio computation from breaking when a point falls outside a side, and it is how Menelaus, Ceva and power of a point are stated in their general forms. On the AMC it shows up as the check that an obtuse triangle's foot of an altitude lies outside the base.
`
});
Object.assign(window.MATH_DETAILS, {
"steiner-neighborhood": String.raw`
## Key forms
- $A_r = A + Pr + \pi r^2$ — the points within $r$ of a convex region with area $A$ and perimeter $P$
- $A_r = ab + 2(a + b)r + \pi r^2$ — for an $a \times b$ rectangle
- $V_r = abc + 2(ab + bc + ca)r + \pi(a + b + c)r^2 + \tfrac43\pi r^3$ — for an $a \times b \times c$ box, the same as $V + Sr + \tfrac{\pi}{4}Lr^2 + \tfrac43\pi r^3$ with $L = 4(a + b + c)$ the total edge length

## Conditions
The region must be convex; then the pieces around its boundary do not overlap. For a non-convex region the pieces at a dent overlap, so the formula overcounts and the region has to be split by hand. The boundary may be curved: a convex region bounded by arcs works the same way, with $P$ its total arc length.

## Why it works
The idea is that every point near the region is nearest to exactly one boundary point, and grouping the points by that nearest boundary point cuts the neighborhood into simple pieces.

Take a convex polygon. A point outside it within distance $r$ is nearest either to a point inside a side or to a vertex. The points nearest to inside points of a side fill a rectangle on that side, with the side as base and height $r$, so the sides together add $Pr$. The points nearest to a vertex fill a circular sector of radius $r$ at that vertex, between the outward perpendiculars to its two sides. The angle of that sector is the exterior angle at the vertex, and the exterior angles of a convex polygon add to $360^\circ$, so the sectors make one full disk, $\pi r^2$. Convexity makes these pieces fit without overlap, which gives $A + Pr + \pi r^2$.

For a convex region with curved boundary, the band over an arc of a circle of radius $\rho$ with angle $\theta$ is a sector of the ring between radii $\rho$ and $\rho + r$, of area $\tfrac12\theta\big((\rho + r)^2 - \rho^2\big) = \rho\theta\, r + \tfrac12\theta r^2$. The first term is arc length times $r$, and the angles $\theta$ of the arcs and the exterior angles at the corners again add to $360^\circ$, so the same formula holds.

In space the box splits the same way: slabs of thickness $r$ on the six faces ($Sr$), quarter-cylinders of radius $r$ along the twelve edges (a quarter of $\pi r^2$ per unit of edge length), and eighth-spheres at the eight corners, which make one ball.

## Useful observations
- The set of centers of radius-$r$ disks that touch a region is its $r$-neighborhood, so "the union of all unit disks that meet $K$" and "all points within $1$ of $K$" are the same set.
- Subtracting $A_r$ for two values of $r$ gives the area of the band between two offset curves.
- For a segment of length $\ell$, the formula with $A = 0$ and $P = 2\ell$ gives a stadium of area $2\ell r + \pi r^2$.

## Applications
Points within a fixed distance of a rectangle, a box or a lens; the region swept by a disk whose center stays in a convex set; and paint or fence problems where a border of fixed width surrounds a shape.

## Contest profile
An AMC 12 and early AIME tool: the rectangle and box forms settle a "within one unit" question in one line, and the convex form handles curved regions such as a lens. It pairs with Circle Area, Circumference, Arcs & Sectors for the corner pieces.
`
});
