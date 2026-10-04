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
Trapezoids, quadrilaterals with two given angles that sum to less than $180^\circ$, and figures where two given angles would sit naturally in one triangle. In a cyclic quadrilateral, extend a pair of opposite sides when a product of lengths along them is wanted; extend both pairs when the problem mentions the points where opposite sides meet, which is the complete quadrilateral.

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
## Why it works
Each triangle is half of a figure you already know: the 45-45-90 triangle is half a square, and the 30-60-90 triangle is half an [[equilateral-triangle-facts|equilateral triangle]].

Cut a square of side $1$ along a diagonal. Each half is a right triangle with two legs of $1$, so its two acute angles are equal, $45^\circ$ each, and by the [[pythagorean-theorem|Pythagorean Theorem]] the diagonal is $\sqrt{1^2 + 1^2} = \sqrt2$. That gives $1 : 1 : \sqrt2$.

{{figure:square}}

Cut an equilateral triangle of side $2$ along an altitude. The altitude meets the base at its midpoint, so each half has hypotenuse $2$ and short leg $1$. Its angles are $60^\circ$ at the base corner, $30^\circ$ at the top, where the altitude splits the $60^\circ$ angle in half, and $90^\circ$ at the foot, and its third side is $\sqrt{2^2 - 1^2} = \sqrt3$. That gives $1 : \sqrt3 : 2$, with the $1$ opposite the $30^\circ$ angle.

{{figure:equilateral}}

## How to use it
Whenever an angle of $30^\circ$, $45^\circ$, $60^\circ$, $90^\circ$, $120^\circ$, or $135^\circ$ appears, look to drop a perpendicular that creates one of these triangles. That converts angle information into length information without trigonometry. A $120^\circ$ angle splits into a $30$-$60$-$90$ on the outside (the standard way to handle obtuse special angles).

## On contests
The default mechanism for AMC 10 geometry, with 21 problems tagged here, only 2 of them solved by the ratios alone: they are almost always the step that turns an angle into lengths inside a larger figure, most often an equilateral triangle (4 problems) or a circle (3).

[[regular-hexagon-area|Hexagons]] decompose into 30-60-90 triangles, a square's diagonal gives 45-45-90 triangles, and "fold the paper" problems almost always hide one. Know the ratios cold in both directions, the sides from the hypotenuse and the hypotenuse from a side.
`,

"altitude-hypotenuse": String.raw`
## Why it works
Each small triangle shares an acute angle with the original and has a right angle, so all three triangles are similar, and each relation is one proportion between two of them.

Laid side by side in the same orientation, with the shared angle at the left, the three triangles have legs $p$ and $h$, $h$ and $q$, and $a$ and $b$, and hypotenuses $a$, $b$, and $c$.

{{figure:similar}}

Matching sides gives the relations. From the two small triangles, $\frac hp = \frac qh$, so $h^2 = pq$. From the small triangle next to $a$ and the whole, $\frac pa = \frac ac$, so $a^2 = pc$, and likewise $b^2 = qc$. Adding the last two gives $a^2 + b^2 = (p + q)c = c^2$, a proof of the Pythagorean Theorem.

## How to use it
Given any two of $a$, $b$, $h$, $p$, $q$, and $c = p + q$, the relations give the rest. If the altitude cuts the hypotenuse into $3$ and $12$, then $h^2 = 36$, so $h = 6$, and the legs are $\sqrt{3 \cdot 15} = 3\sqrt5$ and $\sqrt{12 \cdot 15} = 6\sqrt5$.

The phrase "geometric mean" in a right-triangle problem points straight here, and so does a semicircle on the hypotenuse, since by [[thales-theorem|Thales' Theorem]] every point on it makes a right angle. In coordinates, the distance from the right-angle vertex to the hypotenuse is $\frac{ab}{c}$ with no computation.

## On contests
Five problems here, four of them AIME, none by it alone; two continue into [[similar-figures-ratios|similar triangles]] more generally. It is a fixture of AMC and MATHCOUNTS geometry as well, in circles tangent to a hypotenuse, folded rectangles, and chains of similar triangles.
`,

"triangle-inequality": String.raw`
## Why it works
The straight segment is the shortest path between two points, so going from $B$ to $C$ by way of $A$ can never be shorter than going straight.

The side $a = BC$ is the direct route, and $c + b = BA + AC$ is the route through $A$, as in the figure at the top. A detour through a point off the line is strictly longer, which gives $a \lt b + c$, and the same holds for each side. The detour ties the direct route only when $A$ lies on the segment $BC$, which is the flat triangle where $a = b + c$.

The two-sided form $$|a - b| \lt c \lt a + b$$ packages all three inequalities. The right half is one of them; the left half combines the other two, since $a \lt b + c$ gives $a - b \lt c$ and $b \lt a + c$ gives $b - a \lt c$. When $c$ is the longest side, the other two conditions hold automatically, so only $c \lt a + b$ needs checking.

{{figure:range}}

## How to use it
It has two standard uses. The first is counting, as in [[integer-triangles-perimeter|integer-triangle problems]]: the whole numbers $c$ that make a triangle with given $a$ and $b$ are those strictly between $|a - b|$ and $a + b$, and there are $$(a + b) - |a - b| - 1 = 2\min(a, b) - 1$$ of them.

The second is extremal. The flat triangle is the boundary of what is possible, so a maximum or minimum of a length in a changing figure often occurs just as the triangle collapses.

## On contests
AMC loves "sticks of lengths $1..n$, how many triangles" and "which of these could be the sides." AIME uses it as a hidden constraint: after algebraic manipulation produces candidate side lengths, the triangle inequality eliminates spurious solutions, so always check it before submitting.

When the inequality is a hypothesis rather than a test, [[ravi-substitution|Ravi substitution]] builds it into the variables so it cannot be violated, and [[abs-triangle-inequality|the absolute-value form]] is the same statement on the number line.
`,

"polygon-angle-sums": String.raw`
## Why it works
Cutting the polygon into triangles gives the interior sum, and walking around its boundary gives the exterior sum.

From one vertex of a convex $n$-gon, the diagonals to the $n - 3$ vertices that are not its neighbors cut it into $n - 2$ triangles, and the angles of those triangles together make up exactly the polygon's angles. So the interior angles add to $$(n - 2) \cdot 180^\circ.$$

Now walk once around the boundary. At each vertex you turn through the exterior angle, and after the last turn you face the way you started, having turned one full revolution. So the exterior angles add to $360^\circ$ whatever $n$ is, and each one is $180^\circ$ minus the interior angle beside it.

{{figure:walk}}

## How to use it
For regular polygons, start from the exterior angle $\frac{360^\circ}{n}$: the interior angle is $180^\circ$ minus it, and a given interior angle tells you $n$ at once. A regular octagon has exterior angles of $45^\circ$ and interior angles of $135^\circ$.

Regular polygons fit around a point exactly when their interior angles add to $360^\circ$, which is why squares, equilateral triangles, and hexagons tile the plane and regular pentagons do not. The fan of diagonals from one vertex that proves the interior sum also counts [[handshakes-diagonals|diagonals]]: $n - 3$ from each vertex, so $\frac{n(n - 3)}{2}$ in all.

## On contests
Five problems here, four of them AIME, one solved by it alone. The others combine the angle sum with an equation, often in integers, as when the angles of a polygon are in [[arithmetic-series|arithmetic progression]] or must be whole numbers, which leads to [[sfft|factoring tricks]]. MATHCOUNTS and early AMC use it directly, and later problems embed it in star-polygon [[angle-chasing|angle chases]].
`,

"similar-figures-ratios": String.raw`
## Why it works
Area is a length times a length and volume is three lengths multiplied, so scaling every length by $k$ scales area by $k$ twice over and volume three times over.

Start with the plainest shapes. Scaling an $x \times y$ rectangle and an $x \times y \times z$ box by $k$ gives $$kx \cdot ky = k^2 \cdot xy, \qquad kx \cdot ky \cdot kz = k^3 \cdot xyz.$$ A triangle behaves the same way, since its area is half the base times the height and both of those are lengths that scale by $k$.

Every other region reduces to these. Cover it with a fine grid of tiny squares; the scaled region is covered by the scaled grid, whose squares each have $k^2$ times the area. So the total area scales by $k^2$ however fine the grid is, curved boundary or not, and tiny cubes give $k^3$ for volume in the same way.

{{figure:grid}}

The factor is the same for every pair of corresponding lengths, not only the sides: heights, medians, perimeters, radii, and diagonals all scale by $k$. That is why a single matched pair is enough to know them all.

## How to use it
What similarity buys is a change of units: one matched pair of lengths fixes $k$, and from then on every length, area, and volume in the figure is known in terms of one unknown instead of many. That is the payoff to look for: not "these triangles are similar" but "the figure now has one degree of freedom".

Finding the similarity is the real step, and in triangle work it nearly always comes from a parallel line: a line parallel to one side cuts off a similar triangle, so every midpoint, every trapezoid, and every cevian through a parallel is a similarity waiting to be named.

{{figure:cut}}

A right angle does it too, since the altitude to the hypotenuse splits a right triangle into two copies of itself, and so does a shared angle plus an equal angle from [[inscribed-angle-theorem|the same arc]].

Then push the ratio through the right power, $$\text{lengths} \times k, \qquad \text{areas} \times k^2, \qquad \text{volumes} \times k^3,$$ and remember that the leftovers matter as much as the parts: a parallel cut at ratio $k$ leaves areas $k^2 : (1-k^2)$, and a pyramid cut parallel to its base leaves a frustum holding $1-k^3$ of the volume. Nested similar figures give a [[geometric-series|geometric series]] rather than a finite sum, which is what makes infinite-dissection problems tractable at all.

## On contests
The highest-frequency idea in AMC geometry, and unusually often the whole solution: it stands alone in 12 of the 73 problems tagged here, far more than most tools manage. When it is not alone its partner is almost always [[pythagorean-theorem|Pythagoras]] (13 problems), where the similarity pins the ratio and Pythagoras turns it into a number.

The recurring shapes are a parallel cut across a triangle, a cone or pyramid sliced parallel to its base, and a chain of nested figures whose areas form a geometric series. All three are recognizable before any computation, which is the point of knowing them by name.
`,

"midsegment-theorem": String.raw`
## Why it works
Joining the midpoint $M$ of $AB$ to the midpoint $N$ of $AC$ makes a triangle $AMN$ that is the original triangle shrunk by half toward $A$.

$AM = \frac12AB$ and $AN = \frac12AC$, and the two triangles share the angle at $A$, so triangle $AMN$ is similar to triangle $ABC$ with ratio $\frac12$. Corresponding angles are equal and corresponding sides are in the ratio $\frac12$, so $$MN \parallel BC, \qquad MN = \tfrac12 BC.$$ In the language of transformations, it is the [[homothety-monge|homothety]] centered at $A$ with ratio $\frac12$.

All three midsegments together cut the triangle into four triangles whose sides are each half a side of the original, so the four are congruent and each has a quarter of the area.

{{figure:four}}

## How to use it
Whenever midpoints appear, join them: the parallel lines and half-lengths are often exactly the similar triangles a problem needs. For a $6$-$8$-$10$ triangle the medial triangle is $3$-$4$-$5$, with half the perimeter and a quarter of the area.

The quadrilateral version is [[varignons-theorem|Varignon's Theorem]]: the midpoints of the sides of any quadrilateral form a parallelogram, because each of its sides is parallel to a diagonal and half as long. Repeating a midpoint construction produces lengths in a geometric sequence with ratio $\frac12$.

## On contests
Four problems here, three of them AIME, none by it alone, each with a different partner, including the [[nine-point-circle|nine-point circle]], which passes through the midpoints of the sides. It appears wherever midpoints do: medial triangles, Varignon parallelograms, and repeated midpoint constructions.
`,

"centroid-division": String.raw`
## Why it works
The average of the three vertices lies two thirds of the way along every median, so all three medians pass through that one point.

The midpoint of $BC$ is $M = \frac{B + C}{2}$, and the point two thirds of the way from $A$ to $M$ is $$A + \tfrac23(M - A) = \tfrac13A + \tfrac23M = \frac{A + B + C}{3}.$$ That does not depend on which vertex we started from, so the same point lies two thirds of the way along each median, which proves both that the medians meet and that they are divided $2 : 1$. [[mass-points|Mass points]] give the same result, with a mass of $1$ at each vertex.

For the six pieces, the two touching the midpoint of a side have equal bases and the same height from $G$, so they are equal; call the three pairs $x$, $y$, and $z$. The median from $A$ splits the triangle into two halves of equal area, $x + 2z$ and $x + 2y$, so $y = z$, and another median gives $x = y$.

{{figure:six}}

## How to use it
In coordinates, average the vertices. The $2 : 1$ ratio turns a median's length into distances: a median of length $15$ puts the centroid $10$ from the vertex and $5$ from the midpoint. For areas, any region bounded by medians is a whole number of sixths of the triangle, and each of $GBC$, $GCA$, and $GAB$ is a third.

On AIME the vector form $\vec{GA} + \vec{GB} + \vec{GC} = \vec 0$ gives slicker solutions. The lengths of the medians themselves come from [[apollonius-theorem|Apollonius's Theorem]], the median case of [[stewarts-theorem|Stewart's Theorem]].

## On contests
Five problems here, all AIME, none by it alone, and each with a different partner: [[coordinate-bash|coordinates]], [[power-of-a-point|power of a point]], Stewart's Theorem, or the [[area-method|area method]]. AMC problems place a point at the centroid and ask for areas, which come out in thirds and sixths.
`,

"cevian-area-ratio": String.raw`
## Why it works
A triangle's area is half its base times its height, so two triangles with the same height have areas in the ratio of their bases.

For $D$ on $BC$, the triangles $ABD$ and $ACD$ both have apex $A$ and bases on line $BC$. Their height is the distance $h$ from $A$ to that line, the same for both, so $$\frac{[ABD]}{[ACD]} = \frac{\frac12 \cdot BD \cdot h}{\frac12 \cdot DC \cdot h} = \frac{BD}{DC}.$$

Nothing in that used the fact that the two bases meet at $D$ or lie inside side $BC$, only that the apex is shared and the bases lie on one line.

{{figure:fan}}

## How to use it
Mark every ratio the problem gives along a side, and turn each into an area ratio using the vertex opposite that side as the apex. Working from the outside in, write each small triangle as a fraction of the whole, one cevian at a time: in the example, a $1 : 4$ split of $BC$ gives $[ABD] = \frac15[ABC]$.

The same step runs in reverse, turning known areas into a ratio along a line. Two cevians meeting inside the triangle need it once along each, which is [[area-method|the area method]] in full; [[mass-points|mass points]] reach the resulting length ratios faster when only lengths are asked.

## On contests
Two problems here, both AIME, neither solved by it alone: each finds areas in a triangle cut by several cevians and finishes with the area method or mass points. On the AMC 10 and 12 it drives shaded-region problems where ratios along the sides are given, and [[rouths-theorem|Routh's Theorem]] packages the three-cevian case.
`,

"trapezoid-parallelogram-areas": String.raw`
## Why it works
Each formula comes from rearranging the quadrilateral into shapes whose area is already known.

A parallelogram becomes a rectangle with the same base and height when a right triangle is cut from one end and moved to the other, so its area is $bh$. Two copies of a trapezoid, one turned half a turn and fitted against the other, form a parallelogram with base $b_1 + b_2$ and the same height, so one trapezoid has half of $(b_1 + b_2)h$.

{{figure:doubling}}

When the diagonals are perpendicular, they cut the quadrilateral into four right triangles whose legs are pieces of the diagonals. If one diagonal is split into $p$ and $q$ and the other into $r$ and $s$, the four areas add to $$\frac12(pr + ps + qr + qs) = \frac12(p + q)(r + s) = \frac12d_1d_2.$$

## How to use it
In a trapezoid $ABCD$ with $AB \parallel CD$, the diagonals cross at a point $O$ that divides each of them in the ratio of the parallel sides: triangles $OAB$ and $OCD$ are similar, because the parallel sides make their angles equal, with ratio $\frac{AB}{CD}$.

The two triangles along the legs, $OBC$ and $ODA$, always have equal areas, because triangles $ABC$ and $ABD$ share the base $AB$ and the same height, and removing $OAB$ from each leaves them.

{{figure:diagonals}}

If the two similar triangles have areas $X$ and $Y$, each leg triangle has area $\sqrt{XY}$, so the whole trapezoid is $X + Y + 2\sqrt{XY} = (\sqrt X + \sqrt Y)^2$. For a height that is not given, drop perpendiculars from the ends of the shorter base: in an isosceles trapezoid each overhang is half the difference of the bases, and the [[pythagorean-theorem|Pythagorean Theorem]] gives the height.

## On contests
Eight problems here, six of them AIME, one solved by it alone. Most trapezoid problems turn on the diagonal similarity, or on dropping two heights to make right triangles at the ends and finishing with the Pythagorean Theorem. The lengths of the midline and of the segment through the diagonals' crossing are on [[trapezoid-special-segments|their own card]].
`,

"quadrilateral-diagonal-area": String.raw`
## Why it works
Cut along both diagonals, and every piece is a triangle whose area the [[trig-area|sine area formula]] gives.

Let the diagonals cross at $P$, cutting them into pieces $a$ and $c$ along one and $b$ and $d$ along the other. Each of the four triangles at $P$ has two sides along the diagonals, with the angle $\theta$ or $180^\circ - \theta$ between them, and those two angles have the same sine. So the area is $$\tfrac12\sin\theta\,(ab + bc + cd + da) = \tfrac12\sin\theta\,(a + c)(b + d) = \tfrac12 d_1d_2\sin\theta.$$

{{figure:four}}

The formula also holds for a quadrilateral that is not convex, where one diagonal lies outside it: in vectors the area is half the cross product of the diagonals, $\frac12\left|\overrightarrow{AC} \times \overrightarrow{BD}\right|$.

## How to use it
Use it whenever a problem gives both diagonals and the angle between them, or lets you find them. For diagonals $6$ and $9$ meeting at $30^\circ$, $$A = \tfrac12 \cdot 6 \cdot 9 \cdot \sin 30^\circ = \tfrac{27}{2}.$$

It also gives a bound for free: among quadrilaterals with given diagonals, the area is largest, $\frac12d_1d_2$, when they are perpendicular, which is how many maximization problems end.

## On contests
Three problems here, all AIME, none solved by it alone. For a cyclic quadrilateral both diagonals are [[chord-length|chords]], so the problem reduces to the angle between them, which the [[law-of-cosines|Law of Cosines]] on the small triangles often supplies. A kite drawn by [[abs-value-relations|absolute values]] has perpendicular diagonals, so its area is $\frac12d_1d_2$ at once.`,

"regular-polygon-area": String.raw`
## Why it works
Lines from the center to the vertices cut the polygon into $n$ congruent isosceles triangles, and every formula is the total area of those triangles.

Each triangle has base $s$ and height $a$, so its area is $\frac12sa$, and the $n$ of them give $\frac12nsa = \frac12ap$. Each triangle also has two sides $R$ with the angle $\frac{360^\circ}{n}$ between them, so by [[trig-area|the sine area formula]] its area is $\frac12R^2\sin\frac{360^\circ}{n}$, which gives the second form.

The three lengths are tied by one right triangle, from the center to the middle of a side and on to a vertex: $$R^2 = a^2 + \left(\tfrac s2\right)^2.$$ So the ring between the circumcircle and the incircle has area $\pi(R^2 - a^2) = \frac{\pi s^2}{4}$, whatever $n$ is.

{{figure:radii}}

## How to use it
Choose the form that matches the data: an apothem or an inscribed circle calls for $\frac12ap$, and a circumradius calls for the sine form. For a dodecagon in a circle of radius $R$ the sine form gives $$\tfrac12 \cdot 12 \cdot R^2\sin 30^\circ = 3R^2.$$

For an octagon of side $s$, cut the four corner triangles off the surrounding square, whose side is $s + s\sqrt2$: the area is $(s + s\sqrt2)^2 - 4 \cdot \frac{s^2}{4} = 2(1 + \sqrt2)s^2$. For [[regular-hexagon-area|hexagons]] and [[equilateral-triangle-facts|equilateral triangles]], go straight to their own formulas.

## On contests
Four problems here, split between AMC and AIME, none by it alone, each with a different partner such as the [[shoelace-formula|shoelace formula]] or a [[circular-segment|circular segment]]. Octagons and dodecagons are the common cases on MATHCOUNTS and AMC 10, and the dodecagon's area of exactly $3R^2$ is worth having seen once.
`,

"clock-angle": String.raw`## Why it works
The minute hand moves $360^\circ$ per hour ($6^\circ$ per minute); the hour hand $30^\circ$ per hour ($0.5^\circ$ per minute). At $H{:}M$ the hour hand sits at $30H + 0.5M$ degrees and the minute hand at $6M$, and subtracting gives $|30H - 5.5M|$.

## How to use it
Take the result mod $360^\circ$ and replace $\theta$ by $360^\circ - \theta$ if it exceeds $180^\circ$. For "when are the hands aligned/opposite/perpendicular" questions, set $|30H - 5.5M|$ equal to $0$, $180$, or $90$ and solve for $M$ — the hands align every $\frac{720}{11}$ minutes.

## On contests
A MATHCOUNTS staple. The relative speed viewpoint ($5.5^\circ$ per minute) answers every variant: alignments per day (22), overlaps between given times, and mirror-image times.`,

"triangle-area-standard": String.raw`
## Why it works
A triangle is half of a parallelogram with the same base and height, and a parallelogram has the same area as a rectangle.

Take a second copy of the triangle, turn it half a turn, and fit it against the first along one of the other two sides. The two copies form a parallelogram with base $b$ and height $h$. Cutting a right triangle off one end of the parallelogram and moving it to the other end gives a $b \times h$ rectangle, so the parallelogram's area is $bh$, and each triangle has half of it.

{{figure:doubling}}

Only the base and the perpendicular height enter the formula. Sliding the top vertex along a line parallel to the base changes the triangle's shape but not its height, so it does not change the area. This is the shearing argument.

## How to use it
The main decision is which side to call the base. Pick the one whose height you know or can compute, and remember that each side has its own height: a triangle of area $84$ with a side of $14$ has height $12$ to that side, whatever its other sides are. Reading the formula as $h = \frac{2A}{b}$ also shows that the three heights of a triangle are inversely proportional to the sides they meet.

Equal bases and equal heights give equal areas even for triangles that look nothing alike. If two triangles share a base and their third vertices lie on a line parallel to it, they have the same area.

{{figure:shear}}

With a shared height instead, the areas are in the ratio of the bases: two triangles with the same apex and bases on one line compare like their bases, which is the method of [[area-method|area ratios from base ratios]].

## On contests
Nine problems here, eight of them AIME, and never alone: the height usually comes from the [[pythagorean-theorem|Pythagorean Theorem]] first, or the area becomes the base of a pyramid in a [[prism-pyramid-volumes|volume]] computation.

The quick wins are shearing, sliding a vertex along a parallel to reach an easier triangle, and computing one area two ways, with two different bases, to find an unknown height. With coordinates the [[shoelace-formula|shoelace formula]] is faster, and with two sides and the angle between them, [[trig-area|the sine formula]] is.
`,

"trig-area": String.raw`
## Why it works
The formula is base times height, with the height written in terms of the angle.

Take side $a = BC$ as the base and drop the altitude from $A$. The altitude, the side $b = CA$ and part of the line $BC$ form a right triangle with hypotenuse $b$ and angle $C$ at the vertex $C$, so the altitude, the side opposite that angle, has length $b\sin C$. Then $A = \frac12 \cdot a \cdot b\sin C$, which is [[triangle-area-standard|half the base times the height]] with nothing new in it.

{{figure:height}}

If $C$ is obtuse, the altitude from $A$ lands on the extension of $BC$ beyond $C$, and the right triangle contains the angle $180^\circ - C$ instead. The height is then $b\sin(180^\circ - C)$, which is the same number, since $\sin(180^\circ - C) = \sin C$. That is why one formula covers acute and obtuse angles alike, and why an angle and its supplement always give equal areas.

{{figure:obtuse}}

## How to use it
Use it whenever two sides and the angle between them are known, which is the case the side-side-side formulas cannot touch. Special angles keep it clean: $30^\circ$, $90^\circ$, and $150^\circ$ give sines of $\tfrac12$, $1$, $\tfrac12$, while $60^\circ$ and $120^\circ$ both give $\tfrac{\sqrt3}2$.

That last coincidence is the important one. Since $\sin C = \sin(180^\circ - C)$, an angle and its supplement give the same area, so two triangles with equal or supplementary angles at a shared vertex $A$, such as $AXY$ and $ABC$, have areas in the ratio of the products of their enclosing sides. That consequence is common enough to have [[shared-angle-area-ratio|its own card]].

Substituting $\sin C = \tfrac c{2R}$ turns the formula into $A = \tfrac{abc}{4R}$, and substituting for $a$ and $b$ instead gives [[trig-area-circumradius|the all-angles form]].

## On contests
One of the most-used area tools on AMC and AIME, with 20 problems tagged here, none of which it solves alone: it is the step that turns angles into area once something else has produced them, most often [[law-of-cosines|the Law of Cosines]] (6 problems) or [[angle-chasing|angle chasing]] (4).

Two shapes dominate: a figure hands you two sides and the angle between them directly, or a configuration gives equal or supplementary angles and the question is really an area ratio.

It is also the standard route into [[trapezoid-parallelogram-areas|quadrilateral areas]], where the two triangles cut off by a diagonal of a cyclic quadrilateral have supplementary angles.
`,

"trig-area-circumradius": String.raw`## Why it works
The [[law-of-sines|Law of Sines]] says $a = 2R\sin A$ and $b = 2R\sin B$. Putting both into [[trig-area|the sine area formula]] $\tfrac12ab\sin C$ gives $\tfrac12(2R\sin A)(2R\sin B)\sin C = 2R^2\sin A\sin B\sin C$. Every side length has been traded for an angle, which is why the result needs none.

## How to use it
It is the right formula in exactly one situation: the circumradius is known and the sides are not. That is uncommon, which is why this is filed as a reference form rather than a working tool. When you do have side lengths, $\tfrac12ab\sin C$ or [[herons-formula|Heron]] will be shorter.

Its steadier use is as an identity rather than a computation. Dividing by $R$ gives $\tfrac{2A}{R} = 4R\sin A\sin B\sin C$, which is the perimeter of the [[orthic-triangle|orthic triangle]], and that is how the orthic perimeter is usually derived.

## On contests
Rare. Across the problems in this library it is the route in none of them, and the $\tfrac12ab\sin C$ form is the one that appears. Keep it for the orthic-triangle identity and for the occasional problem stated entirely in angles and a circumradius.`,

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

The argument uses only that one point is at distance $r$ from every side, so it applies to any polygon with an inscribed circle. For the excircle opposite $A$, the same three triangles fit together with $IBC$ subtracted, giving $A = r_a(s - a)$.

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

"right-triangle-inradius": String.raw`## Why it works
Tangent lengths from the right-angle vertex form an $r \times r$ square in the corner, so $c = (a - r) + (b - r)$, giving $r = \frac{a + b - c}{2}$. Thales gives $R = \frac{c}{2}$ since the hypotenuse subtends a right angle, hence is a diameter.

## How to use it
Fastest inradius in existence — no area needed. Note $r$ is always an integer for integer-sided right triangles with even $a + b - c$ (e.g. $r = 1, 2, 3$ for $(3,4,5), (5,12,13)\cdot$scaled, $(8,15,17)$).

## On contests
"Circle inscribed in a right triangle" is an AMC evergreen. The corner-square picture also answers "distance from the incenter to the right-angle vertex" ($r\sqrt{2}$) instantly.`,

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
## Why it works
Substituting the cosine into $c^2 = a^2 + b^2 - 2ab\cos C$ turns the cross term into $\mp ab$.

The $120^\circ$ form also has a picture. Extend the side $a$ past the $120^\circ$ vertex and drop the altitude from the opposite vertex onto that extension.

{{figure:extended}}

The small triangle outside has a $60^\circ$ angle, so it is a [[special-right-triangles|30-60-90 triangle]] with legs $\frac b2$ and $\frac{\sqrt3}{2}b$. The big right triangle then has legs $a + \frac b2$ and $\frac{\sqrt3}{2}b$, so $$c^2 = \left(a + \tfrac b2\right)^2 + \tfrac34b^2 = a^2 + ab + b^2.$$

## How to use it
Use the $+ab$ form wherever a $120^\circ$ angle appears: at the center of an equilateral triangle, between the sides of a regular hexagon, and at the [[fermat-point|Fermat point]], where three segments to the vertices meet at $120^\circ$ and give three applications at once. Use the $-ab$ form for a point on a side of an equilateral triangle, where the angle at a vertex is $60^\circ$. Sides $8$ and $15$ around $60^\circ$ give $$c^2 = 64 + 225 - 120 = 169,$$ so $c = 13$.

The triangles these forms produce with simple sides, such as $3$-$5$-$7$ and $1$-$2$-$\sqrt7$, are listed on [[law-of-cosines-special-triangles|the special triangles card]].

## On contests
Five problems here, three of them AIME, none by it alone; the partners include the Fermat point, [[chord-length|chord lengths]], and [[circular-segment|circular segments]], since a chord subtending $120^\circ$ is the $+ab$ form inside a circle. $3$-$5$-$7$ is to $120^\circ$ what $3$-$4$-$5$ is to $90^\circ$.
`,
"law-of-cosines-special-triangles": String.raw`
## Why it works
Each triangle is the Law of Cosines at an angle whose cosine is a simple number, so the cross term is a simple multiple of $ab$, and simple sides give a simple third side.

With $\cos C$ equal to $\frac12$, $-\frac12$, $-\frac{\sqrt2}{2}$, or $-\frac{\sqrt3}{2}$, the Law of Cosines $c^2 = a^2 + b^2 - 2ab\cos C$ becomes $$c^2 = a^2 + b^2 - ab, \quad a^2 + b^2 + ab, \quad a^2 + b^2 + \sqrt2\,ab, \quad a^2 + b^2 + \sqrt3\,ab$$ at $60^\circ$, $120^\circ$, $135^\circ$, and $150^\circ$. Sides $1$ and $2$ at $120^\circ$ give $1 + 4 + 2 = 7$; sides $1$ and $\sqrt2$ at $135^\circ$ give $1 + 2 + 2 = 5$; sides $1$ and $\sqrt3$ at $150^\circ$ give $1 + 3 + 3 = 7$.

The $60^\circ$ and $120^\circ$ triangles come in pairs. Cut an equilateral triangle of side $b$ off a triangle with sides $a$ and $b$ around a $60^\circ$ angle, as in the figure at the top. What is left has sides $a - b$ and $b$ around an angle of $120^\circ$, and the same third side, because $$(a - b)^2 + b^2 + (a - b)b = a^2 + b^2 - ab.$$ So $5$-$7$-$8$ at $60^\circ$ contains $3$-$5$-$7$ at $120^\circ$, and $1$-$3$-$\sqrt7$ contains $1$-$2$-$\sqrt7$.

## How to use it
Recognize the triangle, and the rest of its measurements come quickly. In the $3$-$5$-$7$ triangle the $120^\circ$ angle is opposite the $7$, the area is $$\frac12 \cdot 3 \cdot 5 \sin 120^\circ = \frac{15\sqrt3}{4},$$ and the circumradius is $\frac{7}{2\sin 120^\circ} = \frac{7}{\sqrt3}$.

They usually come from a point on a side of an equilateral triangle. If the side is $s$ and the point is $m$ from one vertex, its distance $d$ to the opposite vertex satisfies $$d^2 = s^2 + m^2 - sm:$$ side $3$ with $m = 1$ gives $\sqrt7$, and side $8$ with $m = 3$ or $m = 5$ gives $7$.

{{figure:cevian}}

Regular hexagons, whose angles are $120^\circ$, and three segments from a point at mutual $120^\circ$ angles produce the $120^\circ$ versions.

Integer triangles with a $60^\circ$ or $120^\circ$ angle are called Eisenstein triples, and the pairing above generates them: $(3, 5, 7)$, $(7, 8, 13)$, and $(5, 16, 19)$ at $120^\circ$, and $(3, 8, 7)$, $(5, 8, 7)$, $(7, 15, 13)$, and $(8, 15, 13)$ at $60^\circ$, with the special angle between the first two sides.

One more triangle is worth knowing for a different reason. In the $4$-$5$-$6$ triangle the largest angle is exactly twice the smallest: the angle opposite $4$ has cosine $\frac34$, the angle opposite $6$ has cosine $\frac18$, and the double-angle formula checks it: $$2\left(\tfrac34\right)^2 - 1 = \tfrac18.$$

## On contests
The $\pm ab$ forms themselves are on [[law-cosines-60-120|their own card]]; this card is the short list of triangles they produce, worth recognizing the way $3$-$4$-$5$ is. The $3$-$5$-$7$ and $1$-$2$-$\sqrt7$ triangles are the ones that recur, usually hidden in an equilateral triangle, a regular hexagon, or a $120^\circ$ configuration around a point. For the right-angled cases, see [[special-right-triangles|special right triangles]].
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

"angle-bisector-length": String.raw`## Why it works
Apply [[stewarts-theorem|Stewart's Theorem]] with the segments from the bisector theorem ($m = \frac{ac}{b+c}$, $n = \frac{ab}{b+c}$), and the algebra collapses to $d^2 = ab - mn$ (sides $a, b$ adjacent to the bisected angle). Alternatively, use the trig form $d = \frac{2ab\cos(\frac{C}{2})}{a+b}$.

## How to use it
The $d^2 = (\text{product of adjacent sides}) - (\text{product of segments})$ phrasing is the memorable one, and the external bisector simply swaps which way the subtraction runs: $d'^2 = m'n' - ab$. The reversal tracks where the foot sits relative to the circumcircle: the internal foot is inside it, so $mn$ is subtracted from $ab$, while the external foot is outside, and there $ab$ is the quantity subtracted. The two are not one formula in disguise, so keep them apart. Use the trig form when the angle is special (e.g. bisecting $120^\circ$ gives $\cos 60^\circ = \frac{1}{2}$, so $d = \frac{ab}{a+b}$ — harmonic mean flavor).

## On contests
AIME problems give two sides and the bisector length and ask for the third side; the formula turns this into one quadratic. The $120^\circ$ special case appears in olympiad warm-ups.`,

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
## Why it works
Each ratio along a side is a ratio of two triangles with a common apex, and for a point $P$ on the cevian the triangles can be taken from $P$ instead.

For $D$ on $BC$ and $P$ on $AD$, $$\frac{BD}{DC} = \frac{[ABD]}{[ACD]} = \frac{[PBD]}{[PCD]},$$ by [[cevian-area-ratio|same-height area ratios]] from $A$ and from $P$. Subtracting the second pair from the first leaves the same ratio, $\frac{BD}{DC} = \frac{[ABP]}{[ACP]}$, the two triangles on either side of $AP$.

{{figure:areas}}

In the same way $\frac{CE}{EA} = \frac{[BCP]}{[BAP]}$ and $\frac{AF}{FB} = \frac{[CAP]}{[CBP]}$. In the product each of $[ABP]$, $[BCP]$, and $[CAP]$ appears once above and once below, so the product is $1$.

For the converse, suppose the product is $1$ and let $BE$ and $CF$ meet at $P$. The line $AP$ meets $BC$ at a point $D'$ whose product is also $1$, so $\frac{BD'}{D'C} = \frac{BD}{DC}$ and $D' = D$.

## How to use it
To prove three cevians concurrent, compute the product; to find a third ratio from two, solve for it. Take all three ratios in the same direction around the triangle, $A \to F \to B \to D \to C \to E \to A$, or the product comes out inverted.

Medians, angle bisectors, and altitudes pass the test at once, which proves each set concurrent: for the bisectors the [[angle-bisector-theorem|Angle Bisector Theorem]] makes the product $\frac ba \cdot \frac cb \cdot \frac ac = 1$.

When the cevians are given by angles rather than points, use the trigonometric form; for lengths along the cevians themselves, [[mass-points|mass points]] read off every ratio at once.

## On contests
Two problems here, both AIME, neither solved by it alone; one pairs it with [[area-method|area ratios]] around the common point, and the other with [[stewarts-theorem|Stewart's Theorem]] for the lengths. AIME problems typically give two of the ratios and ask for the third, or give a sum of ratios through the common point and ask for their product.
`,

"menelaus-theorem": String.raw`## Why it works
Drop perpendiculars from $A$, $B$, $C$ to the transversal line; each ratio on the line equals a ratio of these perpendicular distances, and the product telescopes. The $-1$ (with directed lengths) records that a line crosses an odd number of side extensions.

## How to use it
Use unsigned ratios and the product $= 1$ in practice. The skill is choosing the triangle and the transversal: given a chain of intersection points, pick the triangle whose three sides (extended) the known line crosses. It computes ratios that Ceva cannot reach — points outside segments.

## On contests
The professional's tool for AIME problems where a line cuts across a cevian configuration ("find $\frac{AP}{PD}$" where $P$ is on a cevian). Often two applications of Menelaus replace a page of coordinate algebra. If you know [[mass-points|mass points]] with negative masses, that is Menelaus in disguise.`,

"apollonius-theorem": String.raw`
## Why it works
The median splits the triangle into two triangles with the common side $m_a$ and supplementary angles at $M$, so the [[law-of-cosines|Law of Cosines]] in each gives two equations whose cosine terms cancel.

Let $\theta = \angle AMB$, so $\angle AMC = 180^\circ - \theta$, and write $m = m_a$, with $BM = MC = \frac a2$. The Law of Cosines in triangles $ABM$ and $ACM$ gives $$c^2 = m^2 + \tfrac{a^2}{4} - am\cos\theta, \qquad b^2 = m^2 + \tfrac{a^2}{4} + am\cos\theta,$$ and adding them gives $b^2 + c^2 = 2m^2 + \frac{a^2}{2}$.

The same statement is the parallelogram law for the parallelogram that [[median-doubling|doubling the median]] makes, $(2m_a)^2 + a^2 = 2b^2 + 2c^2$. In vectors from $A$, $2\vec{AM} = \vec{AB} + \vec{AC}$ and $\vec{CB} = \vec{AB} - \vec{AC}$, and adding $|\vec{AB} + \vec{AC}|^2$ to $|\vec{AB} - \vec{AC}|^2$ cancels the cross terms. It is also Stewart's Theorem with $m = n = \frac a2$.

## How to use it
Three sides give any median in one line: for sides $6$, $8$, and $10$, the median to the side of length $10$ has $2m^2 = 36 + 64 - 50$, so $m = 5$, half the hypotenuse, as it must be in a right triangle.

The three medians determine the sides too. Solving the three versions of the theorem together gives $$a^2 = \tfrac49\left(2m_b^2 + 2m_c^2 - m_a^2\right),$$ and similarly for $b$ and $c$. Adding the three versions gives $m_a^2 + m_b^2 + m_c^2 = \frac34(a^2 + b^2 + c^2)$.

## On contests
Four problems here, all AIME, one solved by it alone and each of the others with a different partner. "Two sides and the median to the third" is a recurring setup that this formula finishes in one line, and the doubled-median parallelogram is worth drawing whenever a median appears.
`,

"median-triangle-area": String.raw`## Why it works
Translate median $\vec{m_b}$ to start where $\vec{m_a}$ ends: since $\vec{m_a} + \vec{m_b} + \vec{m_c} = \vec{0}$, the three medians close into a triangle. A short vector computation (or the 2:1 centroid dissection) shows its area is $\frac{3}{4}$ of the original — equivalently the original is $\frac{4}{3}$ of it.

## How to use it
Given three median lengths: form the triangle with those sides, compute its area (Heron), multiply by $\frac{4}{3}$. Medians $9, 12, 15$ or $3, 4, 5$-proportioned sets are gifts — the median triangle is right.

## On contests
Appears verbatim on AMC 10/12 every few years ("a triangle has medians 9, 12, 15; find its area" → 72). Faster and safer than solving for the sides.`,

"rouths-theorem": String.raw`## Why it works
Three applications of Menelaus (or [[mass-points|mass points]]) compute where the cevians pairwise intersect; the shoelace-style ratio algebra assembles into the closed form. The formula's symmetry under cycling $x \to y \to z$ reflects the rotational symmetry of the construction.

## How to use it
$x, y, z$ are the ratios $\frac{BD}{DC}$ etc., taken cyclically. Check $x = y = z = 1$: numerator $(1-1)^2 = 0$ — medians are concurrent, inner triangle degenerates to the centroid. The famous case $x = y = z = 2$ gives $\frac{1}{7}$.

## On contests
The one-seventh triangle is folklore (AMC has asked it directly). For asymmetric ratios, Routh is a fast check on an answer obtained by mass points — or the entire solution if you trust the memorization. Derive-on-demand solvers should master the Menelaus route instead.`,

"vivianis-theorem": String.raw`## Why it works
Connect $P$ to the three vertices, splitting the equilateral triangle (side $s$) into three triangles with bases $s$ and heights $d_1, d_2, d_3$. Total area: $\frac{s}{2}(d_1 + d_2 + d_3) = \frac{s}{2}h$, so the distances sum to the altitude $h$.

Read the same decomposition with signed areas and it stops needing $P$ inside. Take the distance to a side as positive when $P$ is on the same side of that line as the opposite vertex and negative when it is beyond, and $[PAB] + [PBC] + [PCA] = [ABC]$ holds for every point of the plane, so $d_1 + d_2 + d_3 = h$ does too. Outside the triangle there are two regions to picture: across one side, where that single distance turns negative, and past a vertex, where two of them do. Dragging $P$ in the figure below walks through both.

Nothing in the argument needs the sides to be equal either. On a general triangle the three pieces have bases $a$, $b$, $c$, so $a\,d_a + b\,d_b + c\,d_c = 2[ABC]$, a constant. Viviani is what that collapses to when the three bases are the same and the common factor cancels.

## How to use it
Any "sum of distances from an interior point to the sides" question in an equilateral triangle is answered without locating the point, and the weighted form answers the same question on a scalene triangle just as cheaply, since $2[ABC]$ is computable from the side lengths alone. Use the signed reading whenever a problem places its point outside or leaves the position unspecified, because then no case analysis is needed at all. Extends to regular polygons (sum of distances to all sides is constant = $n \times$ apothem) and to equiangular polygons.

## On contests
Shows up as a quick AMC insight ("the sum is constant — compute it at the center or a vertex"). In coordinate form it underlies [[barycentric-coordinates|barycentric]] thinking: the three normalized distances are the barycentric coordinates.`,

"euler-line-ratio": String.raw`## Why it works
The [[homothety-monge|homothety]] centered at the centroid $G$ with factor $-\frac{1}{2}$ sends each vertex to the opposite midpoint — hence sends the orthocenter $H$ (intersection of altitudes) to the circumcenter $O$ (intersection of perpendicular bisectors, which are the altitudes of the [[medial-triangle|medial triangle]]). A homothety with factor $-\frac{1}{2}$ through $G$ means exactly $HG = 2GO$, all collinear.

## How to use it
Vector form is the practical one: with the circumcenter as origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$ and $\vec{OG} = \frac{1}{3}(\vec{OA} + \vec{OB} + \vec{OC})$. Given any two of $O, G, H$ in coordinates, the third is immediate.

## On contests
AIME coordinate problems hand you two centers and ask for a distance — the ratio converts it. Also $OH^2 = R^2(1 - 8\cos A\cos B\cos C)$ and $OH^2 = 9R^2 - (a^2+b^2+c^2)$ for the ambitious.`,

"euler-distance-theorem": String.raw`## Why it works
The power of the [[incenter-excenter-lemma|incenter]] with respect to the circumcircle is $d^2 - R^2$ (negative, since $I$ is inside). A chord through $I$ and a vertex, intersected with the arc midpoint, has segment lengths computable via the incenter-excenter lemma ($\frac{r}{\sin(A/2)}$ and $2R\sin(A/2)$), whose product is $2Rr$. So $R^2 - d^2 = 2Rr$.

## How to use it
Direct plug-in when a problem gives two of $R, r, d$. Also the source of Euler's inequality $R \ge 2r$ (since $d^2 \ge 0$), with equality iff equilateral — the starting point of many inequality problems.

## On contests
AIME has asked for $OI$ distances outright. The incenter-excenter lemma used in its proof (arc midpoint is equidistant from $B$, $C$, $I$, and the excenter) is itself one of the highest-value AIME lemmas — learn both together.`,

"nine-point-circle": String.raw`## Why it works
The [[homothety-monge|homothety]] centered at $H$ with factor $\frac{1}{2}$ sends the circumcircle to a circle through the midpoints of $HA$, $HB$, $HC$; a separate reflection argument shows the same circle passes through the side midpoints and the altitude feet. Its radius is half of $R$ by the homothety, and its center is the midpoint of $OH$.

## How to use it
Nine special points on one circle means enormous cyclic-quadrilateral leverage: any four of them are concyclic, unlocking inscribed-angle chases. The center $N$ being the midpoint of $OH$ places it on the Euler line, with $NG = \frac{1}{6}OH$.

## On contests
Occasionally an AIME problem is a nine-point circle fact wearing a costume — e.g. "the circle through the feet of the altitudes" or "through the midpoints" turning out to have radius $\frac{R}{2}$. Recognizing the disguise saves the day; the [[medial-triangle|medial triangle's]] circumcircle IS the nine-point circle.`,

"carnots-theorem": String.raw`## Why it works
Each signed distance is $d_i = R\cos A_i$ (the central angle over side $a$ is $2A$, so the apothem-like distance is $R\cos A$). The identity $\cos A + \cos B + \cos C = 1 + \frac{r}{R}$ then gives $d_1 + d_2 + d_3 = R + r$.

## How to use it
Mostly as the geometric packaging of $\cos A + \cos B + \cos C = 1 + \frac{r}{R}$ — an identity worth knowing by itself (it bounds the cosine sum in $(1, \frac{3}{2}]$). Distances count negative when the circumcenter falls outside (obtuse triangles).

## On contests
Rare directly, but the underlying cosine identity appears in AIME trig problems ("given $\cos A + \cos B + \cos C$ and $R$, find $r$").`,

"simson-line": String.raw`## Why it works
Two of the feet form a cyclic quadrilateral with $P$ and a vertex (right angles subtend diameters), and [[angle-chasing|angle chasing]] in the two circles shows the three feet make a straight angle exactly when $P$ lies on the circumcircle — and only then.

## How to use it
Recognize the configuration: perpendiculars dropped from one point to all three sides with collinear feet ⟺ the point is on the circumcircle. Bonus facts: the Simson line bisects segment $PH$ ($H$ = orthocenter), and rotating $P$ around the circle rotates the line at half speed. The same degenerate-pedal idea reappears for four lines as the complete quadrilateral and its [[miquels-theorem|Miquel]] point.

## On contests
A niche but decisive AIME/olympiad tool — when a problem drops three perpendiculars from a circumcircle point, the collinearity is the intended miracle. Also useful in reverse to prove a point lies on the circumcircle.`,

"brocard-angle": String.raw`## Why it works
Requiring the cevians $AP, BP, CP$ to make equal angles $\omega$ with sides $AB, BC, CA$ respectively forces (via the Law of Sines in the three sub-triangles) the relation $\cot\omega = \cot A + \cot B + \cot C$; symmetry gives a second such point (the twin Brocard point) with the same angle.

## How to use it
Compute $\cot\omega$ from the angles, or from sides via $\cot\omega = \frac{a^2 + b^2 + c^2}{4A}$ (with $A$ the area) — the latter is the contest-usable form. The bound $\omega \le 30^\circ$ (equality iff equilateral) settles extremal questions.

## On contests
Appears in hard AIME/olympiad trig-geometry. The identity $\cot A\cot B + \cot B \cot C + \cot C \cot A = 1$ (valid in every triangle) is a companion fact that simplifies the algebra when it shows up.`,

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
$P$ is any point in the plane of the circle, and the lines are any lines through $P$ that meet the circle; a tangent counts as meeting it twice at its point of contact $T$. With directed lengths along each line, $PX \cdot PY = OP^2 - r^2$ including the sign; with ordinary lengths the product is $|OP^2 - r^2|$.

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
## Why it works
The midpoint of $AB$ is the same distance from $A$, $B$, and $C$ exactly when the angle at $C$ is right, and that one fact gives both directions.

Forwards: let $O$ be the center, so $OA = OB = OC$. The triangles $OAC$ and $OBC$ are isosceles, so $\angle OCA = \angle A$ and $\angle OCB = \angle B$. Adding, $\angle ACB = \angle A + \angle B$. The three angles of triangle $ABC$ add to $180^\circ$, so $2\angle ACB = 180^\circ$ and $\angle ACB = 90^\circ$. This is also the Inscribed Angle Theorem for an arc of $180^\circ$.

{{figure:isosceles}}

Conversely, if $\angle ACB = 90^\circ$, complete the right triangle to a rectangle $ACBD$. The diagonals of a rectangle are equal and bisect each other, so their crossing point, the midpoint $O$ of $AB$, is at distance $\frac{AB}{2}$ from all four corners, $C$ included. So $C$ lies on the circle with diameter $AB$.

{{figure:rectangle}}

## How to use it
The converse is the useful direction. Whenever a right angle at $C$ looks at a fixed segment $AB$, draw the circle with diameter $AB$: every such $C$ lies on it, which turns an angle condition into a circle and brings in power of a point, cyclic quadrilaterals, and inscribed angles.

Two right angles on the same segment put four points on one circle, which is how problems hide cyclic quadrilaterals. The standard case is the feet of two altitudes.

{{figure:feet}}

Forwards, it places the circumcenter of a right triangle at the midpoint of the hypotenuse, so the circumradius is half the hypotenuse and so is the median to it; that is [[median-to-hypotenuse|the median-to-hypotenuse fact]]. And a point that moves while seeing a fixed segment at a right angle traces the circle on that segment.

## On contests
Nine problems here, six of them AIME, and none by it alone: the right angle it produces is usually the start of [[similar-figures-ratios|similar triangles]] or a [[pythagorean-theorem|Pythagorean]] computation. The common miss is seeing a $90^\circ$ angle on a segment and not drawing the circle through it.
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

"two-tangents-angle": String.raw`## Why it works
Each radius is perpendicular to its tangent, so quadrilateral $PAOB$ has right angles at $A$ and $B$; since its four angles sum to $360^\circ$, $\angle APB + \angle AOB = 180^\circ$. Equivalently the exterior-vertex rule gives $\angle P = \tfrac{1}{2}(\text{far arc} - \text{near arc})$, and because the two arcs sum to $360^\circ$ that is $180^\circ - \angle AOB$.

## How to use it
Drop both radii to the tangent points: $PAOB$ splits along $OP$ into two congruent right triangles with legs $r$ and tangent length $\sqrt{OP^2 - r^2}$. One picture yields the angle ($\sin\tfrac{\angle P}{2} = r/OP$), the tangent length, and $PA = PB$ together — and $OP$ bisects $\angle APB$.

## On contests
The "two tangents from a point" figure runs from MATHCOUNTS through AIME. Keep the supplement handy — the external angle and the central angle add to $180^\circ$ — and remember the center sits on the bisector of $\angle APB$, which pins down the whole configuration.`,

"common-tangent-lengths": String.raw`
## Why it works
Both radii to the points of contact are perpendicular to the tangent, so they are parallel to each other, and sliding the tangent segment over by one radius turns the picture into a right triangle.

Slide the tangent segment so that one end sits on the smaller circle's center. It becomes a leg of a right triangle whose hypotenuse is the center line $d$. For an external tangent the two radii point to the same side, so the other leg is their difference; for an internal tangent they point to opposite sides, so it is their sum. The [[pythagorean-theorem|Pythagorean Theorem]] gives $$t_{\text{ext}}^2 = d^2 - (r_1 - r_2)^2, \qquad t_{\text{int}}^2 = d^2 - (r_1 + r_2)^2.$$

The figures at the top show both triangles, and the third shows the touching case.

## How to use it
The formulas also say when the tangents exist: the internal ones need $d \ge r_1 + r_2$, circles that do not overlap, and the external ones need $d \ge |r_1 - r_2|$, neither circle strictly inside the other.

For two touching circles, $d = r_1 + r_2$, and the external tangent is $$\sqrt{(r_1 + r_2)^2 - (r_1 - r_2)^2} = 2\sqrt{r_1r_2}.$$ That is the step in every chain of circles resting on a line or squeezed between two lines, where consecutive radii often form a geometric sequence.

## On contests
Three problems here, all AIME, none solved by it alone. The recurring shape is circles in a corner or resting on a line, where the gap between their points of contact is $2\sqrt{r_1r_2}$, and harder versions pair the tangent lengths with a [[homothety-monge|homothety]] or similar triangles at the point where the tangents meet. Belt-and-pulley problems start from the same right triangles.`,

"descartes-circle-theorem": String.raw`
## Why it works
The proof is a long computation with center distances, or a short argument by inversion, and neither is contest material; what matters is the shape of the result.

The relation is a quadratic in $k_4$, so three mutually tangent circles have two circles tangent to all three. Solving it gives $$k_4 = k_1 + k_2 + k_3 \pm 2\sqrt{k_1k_2 + k_2k_3 + k_3k_1},$$ and the two roots are the small circle in the gap and the large circle around the three.

{{figure:soddy}}

The large circle touches the others from outside them, so it bends the other way and its curvature comes out negative. A line is the limit of a circle as its radius grows, so it enters with curvature $0$, as in the figure at the top.

## How to use it
Convert radii to curvatures, give an enclosing circle a negative sign and a line curvature $0$, and solve for the missing one. The two roots add to $$k_4 + k_4' = 2(k_1 + k_2 + k_3)$$ by Vieta's Formulas, which steps along a chain of circles without solving another quadratic.

Two parallel lines and a circle are the easiest case, with two curvatures of $0$.

## On contests
One problem here, from the AMC 10, solved by it alone: four mutually tangent circles, where the center-distance equations would be brutal. It is the standard shortcut whenever four tangent circles appear, and it extends to spheres in every dimension as the [[descartes-sphere-theorem|Soddy–Gosset Theorem]].
`,

"caseys-theorem": String.raw`## Why it works
Generalizes Ptolemy by replacing vertices with circles tangent to the host circle; each tangent length $t_{ij}$ plays the role of a side/diagonal. Provable by inversion centered on the host circle, which turns the statement into ordinary Ptolemy.

## How to use it
Degenerate circles (radius 0) are points, so mixed point/circle configurations work — e.g. three vertices of a triangle plus its incircle. The tangent lengths must be external tangents when the circles are on the same side (all internally or all externally tangent to the host).

## On contests
A specialist's weapon for hard AIME/olympiad problems: "circle tangent to two sides and the circumcircle" (mixtilinear-flavored) configurations sometimes collapse instantly. If Ptolemy almost applies but one 'vertex' is a circle, think Casey.`,

"butterfly-theorem": String.raw`## Why it works
Classic proofs project through the circle or drop perpendiculars from the two chord midlines and chase similar triangles; the underlying reason is the symmetry of the circle about the diameter through $M$ — the configuration's asymmetries cancel exactly at $M$.

## How to use it
Recognize the setup: a chord's midpoint, two other chords through it, and the connecting lines crossing the original chord. The conclusion $MX = MY$ usually converts into an equation between segment lengths that closes the problem.

## On contests
Occasional AIME cameo, more often olympiad. Worth knowing mostly for recognition speed — the configuration is unmistakable once seen (it draws an actual butterfly).`,

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

"concyclicity-tests": String.raw`## Key forms
- $A + C = 180^\circ$ — opposite angles of the quadrilateral, the default test
- $\angle ACB = \angle ADB$ with $C, D$ on the same side of $AB$ — no quadrilateral needed
- $PA \cdot PC = PB \cdot PD$ where the diagonals cross at $P$ (from outside, two secants give $PA \cdot PB = PC \cdot PD$)
- $AC \cdot BD = AB \cdot CD + BC \cdot AD$ — Ptolemy, with equality only when concyclic in order
- feet of the perpendiculars from $P$ to the sides of $ABC$ collinear $\iff$ $P$ on its circumcircle

## Why it works
Each is the converse of a fact about circles, and each converse holds because the circle through three of the points is unique. Fix $A$, $B$, $C$; they determine one circle. The fourth point $D$ either lies on it or does not, and every quantity below is strictly monotonic as $D$ moves off it, so matching the value forces $D$ back onto the circle.

That is the whole argument for the power of a point version: the power of $P$ is the same product measured along any line through it, so if a second line gives the same product, its two points sit on the same circle. Inside the quadrilateral that reads $PA \cdot PC = PB \cdot PD$ along the two diagonals; from a point outside, the two secants read $PA \cdot PB = PC \cdot PD$ instead. It is one test, and only the position of $P$ decides which pairing to write. For Ptolemy the monotonicity is the inequality itself, which is strict off the circle. For the angle versions it is the [[inscribed-angle-theorem|Inscribed Angle Theorem]], since the angle subtending a fixed chord grows as the vertex moves inside the circle and shrinks as it moves outside.

## How to use it
Reach for the angle test first; it needs no lengths and usually falls out of the angle chase you were already doing. Use the power-of-a-point form when two of the four points already lie on a line through a third marked point, because it converts the goal into a single product equation. Keep Ptolemy for when the problem hands you all six distances and nothing else.

The trap is the side condition. $\angle ACB = \angle ADB$ proves concyclicity only when $C$ and $D$ are on the same side of $AB$. From opposite sides the correct relation is $\angle ACB + \angle ADB = 180^\circ$, which is the opposite-angles test again. Getting this backwards produces a proof of something false, so check the picture before quoting the equality.

## On contests
Rarely the point of a problem and often the step that unlocks one: proving a concyclicity mid-solution turns an unrelated pair of angles into equal ones. AIME geometry uses it constantly as a hidden step. [[cyclic-opposite-angles|The supplementary-angle test]] covers most of it, and this card is the rest — worth reading once so the alternatives are available when the angles are not.`,

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

"brahmaguptas-formula": String.raw`## Why it works
Follow Heron's derivation but for a cyclic quadrilateral: split along a diagonal, use $\frac{1}{2}(ab + cd)\sin B$ for the total area and the Law of Cosines on both triangles with $\cos D = -\cos B$; eliminate the diagonal and factor.

## How to use it
Only for cyclic quadrilaterals (it is the maximum possible area for given sides — any non-cyclic quadrilateral with those sides has less area, by [[bretschneiders-formula|Bretschneider]]). With $d = 0$ it degrades gracefully to Heron. Pair with [[ptolemys-theorem|Ptolemy]] and the Law of Cosines to extract diagonals after the area.

## On contests
AIME problems give four sides of a cyclic quadrilateral and ask for area (direct) or for the radius (combine with the diagonal formulas: $R = \frac{1}{4A}\sqrt{(ab+cd)(ac+bd)(ad+bc)}$ for the truly prepared).`,

"pitots-theorem": String.raw`## Why it works
Equal tangent lengths from each vertex: going around the quadrilateral, each side is a sum of two tangent lengths, and both opposite-side sums count all four tangent lengths exactly once. The converse (sums equal → incircle exists) also holds for convex quadrilaterals.

## How to use it
Checking $AB + CD = BC + AD$ instantly certifies or refutes an inscribed circle. In problems, it converts "tangential" into a linear equation among the sides — often all that is needed to find a missing side.

## On contests
AMC/AIME tangential-quadrilateral problems open with Pitot almost by definition. Combined with $A = rs$ (valid for tangential polygons), it yields the inradius from sides + area.`,

"ptolemys-inequality": String.raw`## Why it works
Inversion centered at one vertex maps the other three points to a configuration where the inequality becomes the triangle inequality; equality (collinearity after inversion) corresponds exactly to concyclicity in the right order before inversion.

## How to use it
As a bound: among all quadrilaterals with given vertices' pairwise distances role, the cyclic arrangement is extremal. Also as a concyclicity test through equality. In "minimize $PA \cdot BC + PB \cdot CA$"-type problems, this is the hidden structure.

## On contests
More olympiad than AIME, but the equality case doubles as a slick proof that a configuration is cyclic. Knowing that Ptolemy has an inequality version protects against misapplying the equality to non-cyclic quadrilaterals — a real trap.`,

"ptolemy-equilateral": String.raw`## Why it works
Apply [[ptolemys-theorem|Ptolemy]] to the cyclic quadrilateral $ABPC$ (with $P$ on arc $BC$): $PA \cdot BC = PB \cdot CA + PC \cdot AB$, and all three triangle sides are equal — divide them out.

## How to use it
Any point on the circumcircle arc of an equilateral triangle: the longest of the three distances equals the sum of the other two. Combined with the Law of Cosines ($\angle BPC = 120^\circ$ or $60^\circ$ angles at $P$), it typically determines all three distances from partial data.

## On contests
A recurring AIME/AMC gem — "point on the circumcircle with $PB = 5$, $PC = 3$, find $PA$" is a one-liner ($PA = 8$). The related interior-point fact (Pompeiu: for $P$ not on the circle, the distances form a triangle) is the companion.`,

"bretschneiders-formula": String.raw`## Why it works
Same split-and-eliminate as Brahmagupta, but without the cyclic condition the angle term $abcd\cos^2\left(\frac{A+C}{2}\right)$ survives. Cyclic ($A + C = 180^\circ$) kills it; that is the sanity check.

## How to use it
Rarely needed in full generality — its value is conceptual: for fixed sides, area is maximized exactly when the quadrilateral is cyclic. That extremal fact, not the formula, is what problems test.

## On contests
"Of all quadrilaterals with sides $a,b,c,d$, the cyclic one has the largest area" occasionally decides an AMC answer. Compute the max via Brahmagupta; cite Bretschneider only mentally.`,

"varignons-theorem": String.raw`## Why it works
Each midsegment of the two triangles formed by a diagonal is parallel to that diagonal and half its length — so both pairs of opposite midpoint-sides are parallel to a diagonal, making a parallelogram with sides $\frac{p}{2}, \frac{q}{2}$. The area halves because each corner cut removes a quarter-scale triangle summing to half.

## How to use it
Midpoints of a quadrilateral's sides → automatic parallelogram with sides parallel to the diagonals; it is a rectangle iff the diagonals are perpendicular, a rhombus iff they are equal. The segment joining the midpoints of the diagonals also passes through the parallelogram's center. Its sides are half the diagonals, which is the bridge to [[euler-quadrilateral|Euler's Quadrilateral Theorem]] and to the diagonal-based quadrilateral area formulas. Because its sides are half the diagonals, it also gives the diagonal-based [[trapezoid-parallelogram-areas|quadrilateral areas]] directly.

## On contests
AMC uses it straight ("midpoints form what figure? what area?"); AIME uses the parallel-to-diagonals property to transfer angle/length conditions from sides to diagonals.`,

"euler-quadrilateral": String.raw`## Why it works
Vector algebra: place the midpoint identity $\vec{m} = \frac{(\vec{a}+\vec{c}) - (\vec{b}+\vec{d})}{2}$ and expand all squared lengths; every cross term cancels, leaving the identity. The parallelogram law is the $m = 0$ case (diagonal midpoints coincide).

## How to use it
Relates the four sides, two diagonals, and the "midline" $m$ — given any five, find the sixth. Its main corollary: in any quadrilateral, $a^2+b^2+c^2+d^2 \ge p^2 + q^2$ with equality iff parallelogram.

## On contests
Occasional AIME appearances when a problem gives all four sides and one diagonal and asks about the other — check whether the midpoint segment is determinable; in parallelogram-adjacent configurations it vanishes and the computation collapses.`,

"distance-midpoint": String.raw`
## Why it works
Each formula comes from the horizontal and vertical legs drawn between the two points.

The horizontal gap $\Delta x = x_2 - x_1$ and the vertical gap $\Delta y = y_2 - y_1$ are the legs of a right triangle whose hypotenuse is the segment, so the Pythagorean Theorem gives $$d = \sqrt{\Delta x^2 + \Delta y^2}.$$ The midpoint is halfway along both legs, which is the average of the coordinates.

More generally the point a fraction $t$ of the way from $P_1$ to $P_2$ is $P_1 + t(P_2 - P_1)$, and taking $t = \frac{k}{k + 1}$ gives the section formula.

The slope $\frac{\Delta y}{\Delta x}$ is the rise for each unit of run. Turning a line a quarter turn turns its slope triangle with it, which swaps the run and the rise and reverses one of them: run $1$ and rise $m$ become rise $1$ and run $-m$, a slope of $-\frac1m$. That is why perpendicular slopes multiply to $-1$.

{{figure:quarter-turn}}

In vectors the same fact reads: the directions $(1, m_1)$ and $(1, m_2)$ are perpendicular exactly when their [[vector-dot-product|dot product]] $1 + m_1m_2$ is $0$.

## How to use it
Most coordinate work is these three measurements, so place the figure to make them easy: a right angle at the origin with its legs on the axes, a line of symmetry on an axis, and vertices at lattice points where the problem allows.

The section formula is the one people forget. The point two thirds of the way from $(1, 2)$ to $(7, 5)$ is $$\frac{(1, 2) + 2(7, 5)}{3} = (5, 4).$$ Applied to a median, it shows that the centroid of a triangle is the average of its three vertices.

Setting two distances equal and squaring gives a line, because the $x^2$ and $y^2$ terms cancel; that line is the [[perpendicular-bisector-locus|perpendicular bisector]] of the two points. And the perpendicular-slope rule gives the equation of an altitude from the slope of its side, or of a tangent from the slope of its radius.

## On contests
Nine problems here, spread across AMC 10, AMC 12, and AIME, one solved by it alone. In the rest it is the measuring step of a larger plan, often with a [[rotation-90|quarter-turn rotation]], which swaps and negates coordinates exactly as it does the slope triangle. It is the foundation of every [[coordinate-bash|coordinate bash]], and the fastest wins come from choosing the coordinate system well.
`,

"shoelace-formula": String.raw`
## Why it works
Each term of the sum is twice the signed area of a triangle with one corner at the origin, and adding those triangles around the polygon leaves exactly the polygon.

The triangle with corners $O = (0,0)$, $P_i = (x_i, y_i)$, and $P_{i+1} = (x_{i+1}, y_{i+1})$ has area $\frac12|x_iy_{i+1} - y_ix_{i+1}|$, [[determinant-geometric|half the determinant]] of the two position vectors. Without the absolute value, the sign records the direction of turn: positive when $O \to P_i \to P_{i+1}$ turns counterclockwise, negative when it turns clockwise.

Picture $O$ outside a convex polygon and walk around the polygon counterclockwise, adding one signed triangle per edge. The edges on the far side of the polygon, as seen from $O$, turn counterclockwise and add their triangles. The edges on the near side turn back the other way and subtract theirs.

The triangles to the far edges cover the polygon together with the region between it and $O$, and the triangles to the near edges cover just that region, so the subtraction leaves exactly the polygon.

{{figure:fan}}

The same cancellation happens wherever $O$ is and whatever the polygon's shape, as the full proof shows. Going around clockwise instead flips every sign, and the absolute value repairs that. The formula therefore works in either direction, but only when the vertices are taken in order around a polygon that does not cross itself.

## Full proof
Fix a point $Q$ not on the boundary, and ask how many times the signed triangles count it. $Q$ lies in the triangle for the edge $P_iP_{i+1}$ exactly when that edge crosses the ray from $O$ through $Q$ at a point beyond $Q$, and the triangle's sign records which way the edge crosses the ray: for a counterclockwise polygon, positive where the boundary leaves the polygon along the ray and negative where it enters.

Follow the ray outward from $Q$. It meets the boundary finitely many times, alternately leaving and entering the polygon, and it ends outside, since the polygon is bounded. If $Q$ is outside, the crossings beyond it pair off, one entry with the next exit, and $Q$ is counted $0$ times in total. If $Q$ is inside, the first crossing is an exit and the rest pair off, so $Q$ is counted exactly once.

So the sum of the signed triangle areas counts each point inside the polygon once and each point outside it zero times, which means it equals the area of the polygon. Rays that pass through a vertex, and points on the boundary, form a set of zero area and do not affect the total.

## How to use it
Write the vertices as a column, in order around the polygon, and copy the first vertex again at the bottom. Multiply each $x$ by the $y$ in the row below and add these products; then multiply each $y$ by the $x$ in the row below and add those. Half the absolute difference of the two sums is the area. Keeping the two sums separate avoids most sign slips.

For a triangle the formula becomes $\frac12|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$, and moving one vertex to the origin first shortens it to $\frac12|x_2y_3 - x_3y_2|$ for the other two, measured from it.

The order matters. Listing a quadrilateral's corners as $A, C, B, D$ traces a bow tie, which crosses itself, and the formula then returns a wrong area with no warning.

## On contests
Eleven problems here, nine of them AIME, and never alone: it is the last step once [[coordinate-bash|coordinates]] are set up, or one of the areas in an [[area-method|area argument]]. With lattice vertices it pairs with [[picks-theorem|Pick's Theorem]], which converts the area into a count of lattice points or back. The one trap is vertex order, since a self-crossing listing gives a wrong area silently.
`,

"picks-theorem": String.raw`## Why it works
Both sides are additive when gluing polygons along a shared edge, and the formula checks on unit lattice triangles (area $\frac{1}{2}$, $I = 0$, $B = 3$) — induction on triangulations does the rest.

## How to use it
Three quantities, one equation: any two give the third. Boundary points on a segment between lattice points $(x_1,y_1), (x_2,y_2)$: $\gcd(|\Delta x|, |\Delta y|) + 1$ including endpoints — that gcd count is half of most Pick's problems.

## On contests
AMC/AIME lattice-polygon problems: shoelace for $A$, gcd sums for $B$, Pick's for $I$. Also runs in reverse: given interior/boundary counts, deduce the area without seeing the polygon.`,

"point-line-distance": String.raw`
## Why it works
The vector $(A, B)$ is perpendicular to the line, and the distance is the part of any vector from the line to the point that runs in that perpendicular direction.

$(A, B)$ is perpendicular to the line because for two of its points, $Ax_1 + By_1 + C = 0$ and $Ax_2 + By_2 + C = 0$, and subtracting gives $$A(x_2 - x_1) + B(y_2 - y_1) = 0:$$ the [[vector-dot-product|dot product]] of $(A, B)$ with every direction along the line is $0$.

Now take any point $Q = (x_1, y_1)$ of the line and the vector from $Q$ to $P = (x_0, y_0)$. Its component along the unit normal $\frac{(A, B)}{\sqrt{A^2 + B^2}}$ is the perpendicular distance, whichever $Q$ is chosen, and it equals $$\frac{A(x_0 - x_1) + B(y_0 - y_1)}{\sqrt{A^2 + B^2}}.$$ Since $Ax_1 + By_1 = -C$, the numerator is $Ax_0 + By_0 + C$.

{{figure:projection}}

## How to use it
Rewrite the line as $Ax + By + C = 0$ first: the distance from $(3, 1)$ to $y = -\frac34x + \frac{25}{4}$ uses $3x + 4y - 25 = 0$ and is $\frac{|9 + 4 - 25|}{5} = \frac{12}{5}$. Two parallel lines $Ax + By + C_1 = 0$ and $Ax + By + C_2 = 0$ are $\frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}}$ apart.

The main use is tangency: a circle with center $(h, k)$ and radius $r$ touches the line exactly when $$\frac{|Ah + Bk + C|}{\sqrt{A^2 + B^2}} = r,$$ one equation that replaces solving a quadratic for a double root. With coordinates for a triangle, it also gives each altitude as the distance from a vertex to the line through the other two. In three dimensions the same formula with one more term gives the distance from a point to a plane.

## On contests
Seven problems here, six of them AIME, none by it alone: it is the step inside a [[coordinate-bash|coordinate bash]] that handles a circle tangent to a line, often next to [[tangent-facts|tangent-length facts]], and its three-dimensional form measures heights in solids.
`,

"circle-equation": String.raw`
## Why it works
A circle is the set of points at a fixed distance from a center, and the distance formula turns that sentence into an equation.

A point $(x, y)$ is at distance $r$ from $(h, k)$ exactly when $\sqrt{(x - h)^2 + (y - k)^2} = r$. Both sides are nonnegative, so squaring loses nothing and gives the standard form.

Expanding gives $x^2 + y^2 - 2hx - 2ky + (h^2 + k^2 - r^2) = 0$, the general form with $D = -2h$, $E = -2k$, and $F = h^2 + k^2 - r^2$. Going backwards, completing the square gives $$\left(x + \tfrac D2\right)^2 + \left(y + \tfrac E2\right)^2 = \frac{D^2 + E^2}{4} - F,$$ a circle only when the right side is positive; zero gives a single point, and a negative value gives no points at all.

## How to use it
Complete the square to read off the center and radius, as in the example.

To find the circle through three points, substitute them into the general form. The unknowns $D$, $E$, and $F$ appear linearly, so this is a linear system, which is the reason to prefer the general form here.

To intersect a circle with a line, substitute the line into the circle and solve the quadratic; whether they meet, and tangency in particular, is decided by its discriminant, as on [[tangency-condition|the tangency card]].

## On contests
Three problems here, all AIME, none solved by it alone. The usual moves are to write two circle equations and subtract them, to complete the square to find two circles' centers before a [[tangent-circles|tangency]] argument, or to recognize circles hidden in a condition on complex numbers. Subtracting two circles' equations cancels the squares and leaves the [[radical-axis|radical axis]], the line through their intersection points, which turns a common-chord question into arithmetic.`,

"british-flag-theorem": String.raw`## Why it works
Set up coordinates with the rectangle's sides on the axes: each squared distance expands into sums of squared coordinate differences, and both pairings select the same four terms. No planarity even required — it survives in 3D.

## How to use it
Any point + rectangle with three of the four corner-distances known → fourth distance immediately. Also usable in reverse as a rectangle detector, and in problems that only implicitly contain the rectangle (complete one from a right angle).

## On contests
An AMC favorite exactly because the naive approach (coordinates, four unknowns) is slow and the theorem is one line. Distances 3, 4, 5 to consecutive corners → $\sqrt{9 + 25 - 16} = 3\sqrt{2}$; recognize the pattern instantly.`,

"rotation-90": String.raw`
## Why it works
A rotation preserves sums and multiples, so it is decided by what it does to the two unit steps $(1, 0)$ and $(0, 1)$.

Turning $(1, 0)$ by $\theta$ lands on $(\cos\theta, \sin\theta)$, by the definition of cosine and sine on the unit circle. The step $(0, 1)$ is $(1, 0)$ already turned by $90^\circ$, so turning it by $\theta$ more lands at angle $90^\circ + \theta$, the point $(-\sin\theta, \cos\theta)$.

A point $(x, y)$ is $x$ steps of the first kind plus $y$ of the second, and rotating the picture rotates each step, so $$(x, y) \mapsto x(\cos\theta, \sin\theta) + y(-\sin\theta, \cos\theta) = (x\cos\theta - y\sin\theta,\; x\sin\theta + y\cos\theta).$$

{{figure:basis}}

At $\theta = 90^\circ$, $\cos\theta = 0$ and $\sin\theta = 1$, so $(x, y)$ goes to $(-y, x)$: the coordinates swap and the new first one changes sign. A clockwise quarter turn gives $(y, -x)$.

## How to use it
To rotate about a point $C$ other than the origin, work relative to $C$. Turning $A = (3, 4)$ a quarter turn counterclockwise about $C = (1, 1)$: relative to $C$ the point is $(2, 3)$, which turns into $(-3, 2)$, and adding $C$ back gives $A' = (-2, 3)$.

{{figure:about-a-point}}

Squares are the main application. If $PQ$ is one side, turn the vector from $P$ to $Q$ a quarter turn and add it to both $P$ and $Q$ to get the other two vertices; turning it the other way gives the square on the other side. In complex numbers the same computation is $z \mapsto c + e^{i\theta}(z - c)$, often the least error-prone form for angles other than $90^\circ$.

## On contests
Seven problems here, five of them AIME, none by it alone; two do the rotation in complex numbers instead, and one finds the [[rotation-center|center of a rotation]] from a point and its image. The usual setting is a square or an equilateral triangle placed in coordinates, where one side and a rotation give every other vertex.
`,

"eulers-polyhedron-formula": String.raw`## Why it works
Flatten the polyhedron into a planar graph (remove one face, stretch); then induct: each added edge either creates a face or connects a new vertex, preserving $V - E + F$. The sphere's Euler characteristic 2 is what's really being computed.

## How to use it
Combine with incidence counting: if every face has $\ge 3$ edges then $2E \ge 3F$; if every vertex has degree $\ge 3$ then $2E \ge 3V$. These with $V - E + F = 2$ generate all the classic bounds ($E \le 3V - 6$, existence of a small-degree vertex, only five Platonic solids).

## On contests
AMC/AIME polyhedron problems ("faces are pentagons and hexagons, each vertex meets 3 faces...") are systems of equations: face-edge and vertex-edge double counts + Euler. Set up the three equations mechanically and solve.`,

"prism-pyramid-volumes": String.raw`
## Why it works
A prism is a stack of identical slices, and a pyramid is a stack of slices that shrink toward the apex, which is where the one-third comes from.

Slice a prism parallel to its base. Every slice is a copy of the base with area $B$, so a stack of $n$ slices of thickness $\frac hn$ has volume $$n \cdot B \cdot \frac hn = Bh.$$ Sliding the slices sideways changes nothing, which is [[cavalieris-principle|Cavalieri's Principle]]: a slanted prism has the same volume as a straight one.

For a pyramid, the slice at height $z$ above the base is a copy of the base scaled by $\frac{h - z}{h}$, so its area is $$B\left(\frac{h - z}{h}\right)^2,$$ and these shrinking slices add up to $\frac13Bh$.

The third can be seen without calculus: a cube of side $s$ splits into three congruent square pyramids, each with one face of the cube as its base and the same far corner as its apex, and each has base $s^2$, height $s$ and volume $\frac{s^3}{3} = \frac13Bh$.

{{figure:cube}}

By Cavalieri, any pyramid with the same base area and height has the same volume, whatever the shape of its base.

## How to use it
The height is always the perpendicular distance from the apex, or the top face, to the plane of the base, and an oblique solid has the same volume as a right one, by Cavalieri again. For a tetrahedron any face can serve as the base, so computing the volume with one base and equating it with another gives heights that are hard to reach directly, such as the distance from a vertex to a slanted face.

## On contests
13 of the 14 problems tagged here are AIME, and only 1 needs nothing else: the volume is usually the frame, with [[pythagorean-theorem|the Pythagorean Theorem]] (3 problems) supplying a height or an edge. The "swap the base" trick is the standard AIME move: compute a volume with an easy base, then read it again with a different base to extract an inaccessible height, such as the distance from a point to a plane.
`,

"sphere-formulas": String.raw`## Why it works
Archimedes: the sphere sits inside its circumscribing cylinder with exactly $\frac{2}{3}$ of its volume and matching lateral surface area (equal-height slices of sphere and cylinder-minus-cone have equal areas). Or: $V$ integrates cross-sectional disks; $SA$ is the derivative of $V$ with respect to $r$.

## How to use it
Spherical caps and zones occasionally matter: cap volume $\frac{\pi h^2(3r - h)}{3}$, cap/zone lateral area $2\pi r h$ (only the height matters — a striking fact). Derive from the full formulas when needed.

## On contests
Spheres inscribed in / circumscribed about solids: the whole game is finding the right [[cross-section-method|cross-section]], reducing 3D to a 2D incircle/circumcircle picture. Ratio problems (sphere in cylinder in cube...) reward remembering Archimedes' $\frac{2}{3}$.`,

"cone-formulas": String.raw`
## Why it works
The height, the base radius, and the slant height form a right triangle through the tip of the cone, so $\ell^2 = r^2 + h^2$.

{{figure:slant}}

For the area, cut the lateral surface along a slant line and flatten it. Every point of the base's edge is $\ell$ from the tip, so the surface flattens into a sector of a circle of radius $\ell$, and its arc is the base's circumference, $2\pi r$. A sector's area is half its arc times its radius, $\frac12 \cdot 2\pi r \cdot \ell = \pi r\ell$.

Adding the base, $\pi r^2$, gives the total surface area. The volume is the pyramid rule, a third of the base area times the height, $\frac13\pi r^2h$.

## How to use it
The unrolled sector is the problem half the time. Its angle is $$\frac{2\pi r}{\ell} \text{ radians},$$ the fraction $\frac r\ell$ of a full turn. For a cone with radius $6$ and height $8$, $\ell = 10$, so the sector is $\frac{6}{10}$ of a circle of radius $10$, and the lateral area is $60\pi$ of that circle's $100\pi$.

A shortest path on the cone's surface becomes a straight segment in the unrolled sector, which is how the ant-walks-around-a-cone problems are done; see [[unfold-the-surface|shortest paths on surfaces]]. And a sector rolled into a cone keeps its radius as the slant height and its arc as the base's circumference, which fixes $r$ and then $h$.

## On contests
Six problems here, five of them AIME, none by it alone; two pair it with [[similar-figures-ratios|similar triangles]], since a plane parallel to the base cuts off a smaller cone similar to the whole. The classic setups are an ant walking around a cone, a cone rolled from a sector, and a cone rolling on a table, where the slant height is the radius of the circle its base traces.
`,

"frustum-volume": String.raw`## Why it works
A frustum is a big pyramid minus a similar small one; with similarity ratio $k$, subtract $\frac{1}{3}(h_{\text{big}} B_1 - h_{\text{small}} B_2)$ and eliminate the phantom heights using $k = \sqrt{B_2/B_1}$. The $\sqrt{B_1 B_2}$ term is the geometric-mean cross-section.

## How to use it
Often it's cleaner to restore the apex: extend the frustum to the full cone/pyramid, work with the two similar solids ($k$ and $k^3$ scaling), and subtract. Use the closed formula when the two base areas are the given data.

## On contests
Truncated-solid problems on AMC/AIME nearly always reward apex restoration — heights scale like linear dimensions, volumes like cubes, and the frustum is a difference of the two.`,

"distance-3d": String.raw`## Why it works
Take the axis-aligned box whose opposite corners are the two points. Its base diagonal is $\sqrt{(\Delta x)^2 + (\Delta y)^2}$ by the Pythagorean Theorem, and the remaining rise $\Delta z$ is perpendicular to the whole base plane, so a second right triangle closes on it. Perpendicular contributions add in squares, one axis at a time, which is why the pattern keeps going into any number of dimensions.

## How to use it
Coordinatize first and the formula does the rest, which is the usual reason the 3D playbook opens by choosing axes. When the two points are opposite corners of a box you are computing [[space-diagonal|its space diagonal]], the special case where the coordinate differences are the edge lengths themselves. Reading $d$ as a constant instead gives the sphere, so a tangency or an equidistance condition becomes one equation rather than a picture.

## On contests
The most common use is a sphere condition in disguise: a point at a fixed distance from a center, or two centers whose separation is compared against $r_1 + r_2$. The corollary worth remembering is that the farthest two points on two spheres lie on the line through the centers, at $d + r_1 + r_2$, and the nearest at $d - r_1 - r_2$; both follow because any other pair detours off that line.`,

"space-diagonal": String.raw`
## Why it works
The space diagonal is the hypotenuse of a right triangle whose legs are a diagonal of the base and a vertical edge.

The base diagonal has length $\sqrt{\ell^2 + w^2}$ by the Pythagorean Theorem, as in the figure at the top. The vertical edge is perpendicular to the whole base, so it is perpendicular to that diagonal too, and a second application gives $$d^2 = \left(\ell^2 + w^2\right) + h^2.$$

The same step works in any number of perpendicular directions: squared lengths add. That is why the distance between two points in space is $\sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$.

## How to use it
Most contest problems give the box indirectly, through the sum of its edges and its surface area, and never the edges themselves. Then the [[square-of-sum|square of a sum]] gives the diagonal at once: $$d^2 = \ell^2 + w^2 + h^2 = (\ell + w + h)^2 - 2(\ell w + wh + h\ell).$$ The total edge length is $4(\ell + w + h)$ and the surface area is $2(\ell w + wh + h\ell)$, so there is no need to find $\ell$, $w$, or $h$.

Face diagonals work the same way. Each is the hypotenuse over two of the edges, so adding the three squares counts every edge twice: $$p^2 + q^2 + r^2 = 2(\ell^2 + w^2 + h^2) = 2d^2.$$

## On contests
Three problems here, one each from the AMC 10, AMC 12, and AIME, none solved by it alone, and all three use the square-of-a-sum identity above. Typical versions give the total edge length and the surface area and ask for the diagonal; a harder one asks for the smallest sphere containing a box, whose diameter is the space diagonal, and optimizes it with [[vietas-general|Vieta's Formulas]].`,

"cross-product-area": String.raw`## Why it works
$|\vec u \times \vec v|$ is the parallelogram area (base times height, encoded in the sine of the included angle); the triangle halves it. The scalar triple product is the parallelepiped volume (base parallelogram area times projected height), and the tetrahedron is $\frac{1}{6}$ of the parallelepiped.

## How to use it
The triple product is a $3\times3$ determinant of the edge vectors — sign gives orientation, absolute value gives volume. Coplanarity test: triple product $= 0$. For a triangle in 3D, this replaces finding the plane and an altitude.

## On contests
AIME 3D problems (tetrahedra with given coordinates or edge relations) reduce to one determinant. Also computes distance from a point to a plane: volume $\times 3 \div$ base area.`,

"de-guas-theorem": String.raw`## Why it works
Coordinates: the right-corner tetrahedron has legs $a, b, c$ on the axes; each leg face has area $\frac{ab}{2}$-style, and the far face's area (via the cross product of two edge vectors) squares to exactly the sum of the three squared leg-face areas.

## How to use it
Applies only to a trirectangular corner (three mutually perpendicular edges at one vertex — a sliced box corner). Given the three perpendicular edges, all four face areas follow; given three face areas, the fourth is one square root away.

## On contests
Sliced-cube-corner problems on AMC/AIME. Companion facts for the same solid: volume $\frac{abc}{6}$, and $\frac{1}{h^2} = \frac{1}{a^2} + \frac{1}{b^2} + \frac{1}{c^2}$ for the [[altitude-hypotenuse|altitude to the hypotenuse]] face — the 3D analogue of the right-triangle altitude relation.`,

"regular-tetrahedron": String.raw`## Why it works
The apex projects onto the base's centroid; the height computation is one Pythagorean step using the centroid-to-vertex distance $\frac{s\sqrt{3}}{3}$. Volume follows from $\frac{1}{3}Bh$. The octahedron = two square pyramids, or equivalently a tetrahedron of edge $2s$ minus four corner tetrahedra of edge $s$ — whence the exact 4:1 volume ratio.

## How to use it
Embed in a cube when possible: alternating vertices of a cube of edge $e$ form a regular tetrahedron of edge $e\sqrt2$ with volume $\frac{e^3}{3}$ — most regular-tetrahedron facts drop out of this picture (e.g. the $\arccos\frac{1}{3}$ dihedral angle, circumradius $\frac{s\sqrt6}{4}$). Its dual is the regular octahedron, so the two share edge-angle data and swap face and vertex counts.

## On contests
AMC/AIME regular-tetrahedron and octahedron problems are cube-embedding exercises in disguise. Also: regular octahedron = dual of the cube (face centers), which handles midpoint/center configurations.`,

"equilateral-triangle-facts": String.raw`
## Why it works
Everything comes from cutting the triangle in half along an altitude, which gives a [[special-right-triangles|30-60-90 triangle]].

By symmetry, the altitude from one vertex meets the opposite side at its midpoint, so it splits the triangle into two right triangles with hypotenuse $s$ and short leg $\frac s2$. The altitude is the long leg, $\frac s2 \cdot \sqrt3 = \frac{s\sqrt3}{2}$, and the area is half the base times the height, $$\frac12 \cdot s \cdot \frac{s\sqrt3}{2} = \frac{s^2\sqrt3}{4}.$$

Also by symmetry, every altitude is at the same time a median, an angle bisector, and a perpendicular bisector, so every center lies on all three altitudes and they all coincide at one point. That point is the centroid, which [[centroid-division|divides each median in the ratio 2 : 1]] from the vertex.

So its distance to a vertex, the circumradius, and its distance to a side, the inradius, are $$R = \tfrac23 h = \frac{s\sqrt3}{3}, \qquad r = \tfrac13 h = \frac{s\sqrt3}{6}.$$ The figure at the top shows the two radii along one altitude, adding up to $h$.

## How to use it
Every equilateral configuration reduces to these four numbers, so know them without deriving them. It helps to remember them as parts of the height, $R = \frac23h$ and $r = \frac13h$, so a problem that gives any one of $s$, $h$, $R$, $r$, or the area gives all of them. When an equilateral triangle sits inside a larger figure, its $60^\circ$ angles are the other thing to use: they make [[law-of-cosines|the Law of Cosines]] collapse to $c^2 = a^2 + b^2 - ab$.

## On contests
None of the 19 problems tagged here is about an equilateral triangle alone; it is almost always the shape that makes another tool easy, the Law of Cosines with its $60^\circ$ angle (4 problems), 30-60-90 triangles (4), or a circle around or inside it (3). The coincidence of all four centers means symmetric arguments, such as [[rotation-trick|rotating]] by $60^\circ$ about a vertex or by $120^\circ$ about the center, are always available.
`,

"hexagon-diagonals": String.raw`## Why it works
Six equilateral triangles of side $s$ meet at the center, so the distance from the center to every vertex is $s$. Opposite vertices are therefore $s + s = 2s$ apart, and that segment passes through the center, which is what makes the long diagonal a diameter of the circumcircle.

For the short diagonal take $A$, $B$, $C$ consecutive. The interior angle of a regular hexagon is $120^\circ$, so triangle $ABC$ is isosceles with legs $AB = BC = s$ and apex $120^\circ$. Dropping the perpendicular from $B$ splits it into two [[special-right-triangles|half-equilateral]] triangles with hypotenuse $s$, each contributing $\frac{s\sqrt3}{2}$, so $AC = s\sqrt3$. The same half-diagonal is the hexagon's apothem, which is why [[regular-hexagon-area|the area]], the apothem, and the short diagonal are all the same computation.

Both lengths are the $n = 6$ cases of the general chord $d_k = 2R\sin\frac{k\pi}{n}$ with $R = s$: $k = 2$ gives $2s\sin 60^\circ = s\sqrt3$ and $k = 3$ gives $2s\sin 90^\circ = 2s$.

## How to use it
Read the ratio off rather than re-deriving it: side, short diagonal, and long diagonal stand in the ratio $1 : \sqrt3 : 2$, the same triple as a $30$-$60$-$90$ triangle. That makes a hexagon problem a scaling exercise, and it is why hexagons pair so often with equilateral triangles and with $\sqrt3$ answers. Two facts fall out immediately: the three long diagonals concur at the center and cut the hexagon into six equilateral triangles, while the six short diagonals outline a smaller regular hexagon whose side is $\frac{s\sqrt3}{3}$, so its area is one third of the original.

## On contests
A staple of MATHCOUNTS and early AMC geometry, usually as "the distance between two vertices" where the only question is which diagonal is meant. It also supplies the lengths in hexagonal-lattice and tiling problems, where the short diagonal is the spacing between next-nearest centers. When a problem gives a hexagon and a length, decide first whether that length is a side, a short diagonal, or a long one, since the three differ only by the factor $\sqrt3$ or $2$.`,

"regular-hexagon-area": String.raw`
## Why it works
Each center-to-vertex segment has length $s$, and each of the six angles at the center is $60^\circ$, so each triangle around the center is isosceles with a $60^\circ$ apex angle, which makes it equilateral. Six equilateral triangles of side $s$ give $$A = 6 \cdot \frac{\sqrt3}{4}s^2 = \frac{3\sqrt3}{2}s^2.$$

The same triangles give the lengths. The long diagonal crosses two of them, so it is $2s$, and the apothem is the height of one, $\frac{s\sqrt3}{2}$; the short diagonal, $s\sqrt3$, is on [[hexagon-diagonals|hexagon diagonals]].

## How to use it
Measure regions in units of the small equilateral triangle, cutting further into halves or into smaller equilateral triangles when a region needs it. Neighbouring triangles pair into rhombi, and a diagonal of a rhombus cuts it in half, which settles most shaded regions.

{{figure:alternate}}

So the triangle $ACE$ on alternate vertices is half the hexagon, and each corner triangle it cuts off is a sixth. Midpoint hexagons and other inscribed figures work the same way once the small triangles are drawn in.

An equiangular hexagon with unequal sides is a large equilateral triangle with three equilateral corners cut off; extending three alternate sides until they meet shows it.

## On contests
Two problems here, one AIME and one AMC 10, one solved by it alone. The AMC version finds an area inside a hexagon by counting small triangles, and the AIME version counts the small equilateral triangles cut out by lines in three directions. Shaded regions, hexagonal tilings, and equiangular hexagons with given sides are the usual shapes.
`,

"15-75-90-triangle": String.raw`## Why it works
From $\sin 15^\circ = \frac{\sqrt6 - \sqrt2}{4}$ and $\cos 15^\circ = \frac{\sqrt6 + \sqrt2}{4}$ (angle subtraction $45^\circ - 30^\circ$), scale the hypotenuse to 4.

## How to use it
Also worth caching: $\tan 15^\circ = 2 - \sqrt3$, $\tan 75^\circ = 2 + \sqrt3$, and the altitude-to-hypotenuse of the 15-75-90 right triangle equals one quarter of the hypotenuse (a lovely fact: $\sin 15^\circ \cos 15^\circ = \frac{1}{4}$).

## On contests
$15^\circ$ and $75^\circ$ appear in AMC 12/AIME problems built on square-plus-equilateral-triangle configurations (which naturally create $15^\circ$ angles). The quarter-hypotenuse altitude fact alone has decided problems.`,

"golden-ratio-pentagon": String.raw`
## Why it works
Two diagonals and a side of a regular pentagon form a $36$-$72$-$72$ triangle, and that triangle contains a smaller copy of itself, which forces the ratio.

Each interior angle of a regular pentagon is $108^\circ$, and the two diagonals from one vertex cut it into three $36^\circ$ angles. So two diagonals $d$ and the side $s$ between their far ends form an isosceles triangle with apex angle $36^\circ$ and base angles $72^\circ$. Bisecting a base angle cuts off a smaller $36$-$72$-$72$ triangle, and the leftover triangle is isosceles, so the pieces have lengths $s$ and $d - s$.

{{figure:gnomon}}

The similarity gives $\frac ds = \frac{s}{d - s}$. Writing $x = \frac ds$, this is $x = \frac1{x - 1}$, so $x^2 = x + 1$, whose positive root is $\varphi$.

## How to use it
Reduce powers with $\varphi^2 = \varphi + 1$: $$\varphi^3 = \varphi^2 + \varphi = 2\varphi + 1, \qquad \varphi^n = F_n\varphi + F_{n-1}.$$ The other root, $\psi = \frac{1 - \sqrt5}{2} = -\frac1\varphi$, satisfies the same equation, which is why the two together give [[binets-formula|Binet's Formula]] for the Fibonacci numbers.

In a regular pentagon of side $s$ every diagonal is $\varphi s$, so a pentagon of side $2$ has diagonals $1 + \sqrt5$. The diagonals cut each other in the golden ratio, and the small pentagon they enclose has side $\frac{s}{\varphi^2}$. [[ptolemys-theorem|Ptolemy's Theorem]] on four of the vertices gives the same equation, $d^2 = s^2 + sd$.

## On contests
Four problems here, mostly AMC, none by it alone; three reach it through [[similar-figures-ratios|similar triangles]] in a pentagon or pentagram. Exact values of $\cos 36^\circ$ and $\cos 72^\circ$, pentagram lengths, and dissections of golden triangles are the usual settings.
`,

"inscribed-square": String.raw`## Why it works
The triangle above the square is similar to the original (parallel base), with height $h - x$ and base scaled by the same factor: $\frac{x}{a} = \frac{h - x}{h}$. Solve for $x$.

## How to use it
Works for any triangle with the square's base on any side — use that side's length and its altitude. For a right triangle with the square in the right angle (two sides on the legs $a, b$): $x = \frac{ab}{a+b}$ by the same similarity idea. The side follows from [[similar-figures-ratios|similar figure ratios]]: the cut-off top triangle is similar to the whole.

## On contests
MATHCOUNTS/AMC 10 standard. The two right-triangle variants (square on hypotenuse vs. square in the corner) are deliberately paired in problems — keep the two formulas distinct.`,

"mass-points": String.raw`
## When to use
Two or three cevians with known side ratios, including ratios supplied by an [[angle-bisector-theorem|angle bisector]]. For a transversal that is not a cevian, split a vertex's mass into parts, one for each side it lies on.

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
A point inside an equilateral triangle or a square with given distances to three of the vertices, such as $3$, $4$, $5$ in an equilateral triangle or $1$, $2$, $3$ in a square, and a question about an angle at the point, the side length, or the area. More generally, any figure with a $60^\circ$ or $90^\circ$ symmetry about a vertex and scattered segments to be brought together.

## How
1. Pick a vertex $B$ adjacent to two of the vertices with known distances.
2. Rotate about $B$ by the polygon's angle, $60^\circ$ or $90^\circ$, in the direction that sends $A$ onto $C$; the point $P$ goes to $P'$, and $P'C = PA$.
3. Triangle $PBP'$ is equilateral, so $PP' = PB$, or isosceles right, so $PP' = PB\sqrt2$.
4. Triangle $PP'C$ now has three known sides; find its angles, and add back the $60^\circ$ or $45^\circ$ at $P'$ to get angles of the original figure.

Point $P$ inside equilateral triangle $ABC$ has $PA = 3$, $PB = 4$, $PC = 5$. Rotating $60^\circ$ about $B$ sends $A$ to $C$ and $P$ to $P'$, with $PP' = 4$ and $P'C = 3$. Triangle $PP'C$ has sides $4$, $3$, $5$, so it has a right angle at $P'$, and $\angle APB = \angle CP'B = 60^\circ + 90^\circ = 150^\circ$. Then the Law of Cosines gives $AB^2 = 9 + 16 + 12\sqrt3 = 25 + 12\sqrt3$.

## Why it works
A rotation preserves lengths and angles. Rotating about $B$ by the angle of the polygon carries the side $BA$ onto the side $BC$, so it carries triangle $BPA$ onto a congruent triangle $BP'C$; in particular $P'C = PA$ and $\angle BP'C = \angle BPA$.

The point and its image are at the same distance from $B$ with the rotation angle between them, so triangle $PBP'$ is isosceles with apex angle $60^\circ$ or $90^\circ$, which makes it equilateral or isosceles right, and its base $PP'$ is known. That is how a third known length appears next to the other two, as the figure on this card shows.

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
Two fixed points act as foci, and a line is involved: either the least value of $PF_1 + PF_2$ along the line, or an ellipse with those foci that touches the line. Without a line it is just the ellipse definition, and with one focus and a line it is a parabola.

## Methods and Formulas to Try
The ellipses with foci $F_1$ and $F_2$ nest outward as the focal sum grows, so the first one to reach the line touches it at the point of least sum.

### Methods to try
- [[reflect-across-the-line]]: reflect $F_1$ across the line to $F_1'$; the least focal sum on the line is $F_1'F_2$, which is the ellipse's $2a$.
- [[tangency-equation]]: substitute the line into the ellipse equation and require a double root, which fixes the missing parameter.
- [[coordinate-bash]]: with the line as an axis, compute the foci and the axes of the ellipse directly.

### Formulas to try
- [[ellipse-properties]]: $PF_1 + PF_2 = 2a$, with $b^2 = a^2 - c^2$, which recovers the axes once the focal sum is known.
- [[conic-reflective-property]]: the tangent makes equal angles with the two focal radii, the same law as the reflection.

## Common traps
- Using the reflection when the foci are on opposite sides of the line, where the segment $F_1F_2$ already crosses it.
- Confusing the focal sum $2a$ with the distance between foci $2c$.
- Forgetting that the tangent point is unique; two intersection points mean the ellipse is too large.

## Contest profile
An AIME coordinate problem in conic dress: the tangency pins down an ellipse, and the reflection gives its focal sum at once.
`,

"conic-sections": String.raw`
## Why it works
The angle of the cutting plane decides the curve. A plane tilted less steeply than the cone's side meets one half of the cone in a closed curve, an ellipse. A plane parallel to a side never meets that side, so the curve runs off to infinity, a parabola. A steeper plane cuts both halves of the cone, giving the two branches of a hyperbola.

{{figure:slices}}

The focal definitions come from the Dandelin spheres, the spheres inscribed in the cone and tangent to the cutting plane. Each touches the plane at a focus and the cone along a circle. From a point on the curve, the distance to a focus equals the distance along the cone to that sphere's circle, because both are tangent lengths from the same point to the same sphere.

For an ellipse, the two such distances add up to the length of cone between the two circles, which is the same for every point: that is the constant sum.

{{figure:dandelin}}

## How to use it
Let the problem's wording pick the curve. A constant sum of distances is an ellipse, a constant difference is a hyperbola, and a distance matched against a line is a parabola. A single ratio, the [[eccentricity|eccentricity]], covers all three, and when a curve arrives as an unlabeled second-degree equation, [[conic-classification|the discriminant]] names it without rearranging.

Keep the two $c$ relations straight by remembering which length is largest: $a$ on an ellipse and $c$ on a hyperbola, so $$\text{ellipse: } c^2 = a^2 - b^2, \qquad \text{hyperbola: } c^2 = a^2 + b^2.$$ For $\frac{x^2}{25} + \frac{y^2}{9} = 1$, $c = 4$, the foci are $(\pm4, 0)$, and every point's distances to them add to $2a = 10$.

## On contests
Six problems here, five of them AIME, none by it alone. AMC 12 tests the standard forms and focal definitions directly; on AIME a conic appears as the constraint curve of an optimization or a count, usually handed on to the [[ellipse-properties|ellipse card]]. The difficulty sits in the recognition step, noticing that some quantity the problem built is a constant sum or difference of distances.
`,

"insphere-radius": String.raw`
## Why it works
Join the center of the insphere to every face, and the polyhedron splits into pyramids of the same height $r$.

Each pyramid has one face of the polyhedron as its base and the center as its apex, and its height is $r$, because the sphere touches the face at the foot of the perpendicular from the center. Adding the pyramids' volumes, $$V = \sum \tfrac13 \cdot (\text{face area}) \cdot r = \tfrac13 rS.$$ The figure at the top shows the dissection. Cutting a triangle into three triangles from its incenter is the same argument one dimension down, and gives $A = rs$.

## How to use it
Compute the volume and the total surface area separately, then divide: $r = \frac{3V}{S}$. For a polyhedron with volume $54$ and surface area $54$, $$r = \frac{3 \cdot 54}{54} = 3.$$

When the faces are congruent, as in an [[isosceles-tetrahedron|isosceles tetrahedron]], $S$ is four times one face, found with [[herons-formula|Heron's Formula]]. When coordinates are easier, the center is the point at equal distance from every face, found one plane at a time.

## On contests
Three problems here, all AIME, none solved by it alone. The archetype is a point equidistant from the faces of an isosceles tetrahedron, where the box gives $V$ and Heron's Formula gives $S$; others locate the center with coordinates and point-to-plane distances instead.`,

"tangency-condition": String.raw`
## Distinguishing clues
One solution means tangency only when the curves could have met twice. A line parallel to the axis of a parabola meets it once without touching it, and two linear equations have a unique solution for an unrelated reason. Check that the generic count is two before reading "exactly one" as "touching".

## Methods and Formulas to Try
Two curves that could meet twice but meet once are touching, and touching is a single equation in the parameter.

### Methods to try
- [[tangency-equation]]: distance from the center equals the radius for a circle, or a zero discriminant after substituting.
- [[coordinate-bash]]: when the curves arrive as a locus, as complex numbers, or as an envelope, write them as equations first.

### Formulas to try
- [[point-line-distance]]: the distance from a center to a line, set equal to the radius.
- [[quadratic-formula]]: the discriminant $b^2 - 4ac$ of the substituted quadratic, zero exactly when the two intersection points merge.

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

"trig-ceva": String.raw`## Why it works
Apply the Law of Sines inside each of the six small triangles a cevian creates at its vertex: each side-ratio in ordinary Ceva converts to a ratio of sines of the vertex angles, and the product telescopes the same way.

## How to use it
Reach for it when the givens are angles ("the cevian makes a 20° angle with the side") rather than segment ratios. Isogonal cevians (reflections over the bisector) swap the sine ratios — which is why trig Ceva proves the [[symmedian-lemoine|symmedians]] and the [[isogonal-conjugate|isogonal conjugate]] exist. Combined with the sine addition formulas it handles most "find the angle" concurrency problems.

## On contests
The standard weapon for AIME/olympiad angle-chase concurrency, and the cleanest proof that altitudes, bisectors, and symmedians concur. [[directed-angles|Directed angles]] matter for obtuse configurations — keep everything inside the triangle when possible.`,

"erdos-mordell": String.raw`## Why it works
The classical proof reflects the distances: $a \cdot PA \ge b \cdot d_c + c \cdot d_b$ for each vertex (a projection inequality), then summing the three cyclic versions and applying AM-GM to the coefficient pairs gives the factor 2. Equality survives only when the triangle is equilateral and $P$ is the center.

## How to use it
An off-the-shelf bound whenever both distance triples (to vertices, to sides) appear. The intermediate inequalities $a \cdot PA \ge b \cdot d_c + c \cdot d_b$ are themselves useful and sharper.

## On contests
Olympiad inequality problems and the occasional AIME-adjacent bound; also a good sanity check for extremal configurations — if a problem's optimum has $P$ at an equilateral center, Erdős–Mordell equality is often the hidden reason.`,

"symmedian-lemoine": String.raw`## Why it works
Reflecting the median over the angle bisector swaps the roles of the two adjacent sides, which turns the median's even split into the $c^2 : b^2$ ratio. Trig [[cevas-theorem|Ceva]] makes this precise: the median's two angles satisfy $\frac{\sin\angle BAM}{\sin\angle MAC} = \frac{c}{b}$ by the [[ratio-lemma|Ratio Lemma]], and reflecting inverts that quotient, so the symmedian's split carries the square.

The distance form explains the same thing without any trigonometry. Comparing areas, $[ABE] = \frac12 \cdot AB \cdot d(E, AB)$ and $[ACE] = \frac12 \cdot AC \cdot d(E, AC)$, while $\frac{[ABE]}{[ACE]} = \frac{BE}{EC}$ because the two triangles share the apex $A$. Setting those equal to $\frac{c^2}{b^2}$ gives $\frac{d(E,AB)}{d(E,AC)} = \frac{c}{b}$, and since that ratio is the same at every point of the cevian, it characterizes the whole line.

## How to use it
Four equivalent conditions, and recognizing any one gives the others for free:

- a cevian cutting the opposite side as $BE : EC = c^2 : b^2$
- the reflection of the median over the angle bisector from the same vertex
- the locus of points $P$ with $\frac{d(P, AB)}{d(P, AC)} = \frac{AB}{AC} = \frac{c}{b}$
- the cevian through the point where the tangents to the circumcircle at $B$ and $C$ meet

Contrast the locus form with its two neighbors, since the three cevians differ only in that ratio: the bisector is where the distances are equal, the median where they are in ratio $b : c$, and the symmedian where they are in ratio $c : b$. Median and symmedian are reflections of each other, which is what "isogonal" means.

The perpendicular test is the fastest hand check. Drop perpendiculars from $B$ and $C$ onto a cevian from $A$. Onto the median they are equal, because the median passes through the midpoint of $BC$ and the two distances are in ratio $BM : MC = 1 : 1$. Onto the symmedian they are in ratio $c^2 : b^2$, the square of the side ratio, by the same argument applied to $BE : EC$. So an unknown cevian is the median when the two perpendiculars match and the symmedian when their ratio is the squared side ratio.

The ratio $c^2 : b^2$ drops straight into [[stewarts-theorem|Stewart's Theorem]] or [[mass-points|mass points]], where you hang mass $b^2$ at $B$ and $c^2$ at $C$. Antiparallels give one more sighting: the $A$-symmedian bisects every segment antiparallel to $BC$, so a cevian through the midpoint of an antiparallel is a symmedian.

## On contests
The ratio itself is the usable half at AIME level, since $BE : EC = c^2 : b^2$ turns a symmedian into an ordinary cevian computation. At olympiad level the locus and antiparallel forms matter more, because they are what let you prove a line is the symmedian rather than assume it.`,

"cyclic-perpendicular-diagonals": String.raw`## Why it works
Two chords crossing inside a circle meet at an angle equal to half the sum of the two arcs they cut off. Demanding a right angle therefore says those two arcs total $180^\circ$. Write the arc under $AB$ as $2\beta$; then the arc under $CD$ is $2(90^\circ - \beta)$, and the [[chord-length|chord length formula]] gives $AB = 2R\sin\beta$ and $CD = 2R\cos\beta$. Squaring and adding, the trigonometry cancels and leaves $AB^2 + CD^2 = 4R^2$. The other pair of arcs also totals $180^\circ$, so $BC^2 + DA^2 = 4R^2$ as well, and the two pairs match.

There is a second, coordinate-free way to see the equality of the pairs. If the diagonals meet at $P$ and cut them into $p, q$ and $u, v$, then perpendicularity makes each side a hypotenuse: $a^2 = p^2 + u^2$, $b^2 = q^2 + u^2$, $c^2 = q^2 + v^2$, $d^2 = p^2 + v^2$. Both $a^2 + c^2$ and $b^2 + d^2$ come to $p^2 + q^2 + u^2 + v^2$. That argument needs no circle, so the equality of opposite pairs holds for any orthodiagonal quadrilateral; only the value $4R^2$ needs cyclicity.

## How to use it
Recognize the configuration from the right angle at the diagonals and reach for the pairing immediately: three of the four sides determine the fourth, and any one of them together with $R$ determines the opposite one. That is usually the whole problem.

The intersection point does double duty. In any cyclic quadrilateral the four maltitudes, each running from a side's midpoint perpendicular to the opposite side, meet at the anticenter; when the diagonals are perpendicular the anticenter is exactly their intersection $P$. Read backwards, that is Brahmagupta's theorem: the perpendicular from $P$ to a side, produced, bisects the opposite side. So a problem that hands you a perpendicular foot on one side is really handing you a midpoint on the other.

For area, perpendicular diagonals make [[quadrilateral-diagonal-area|the diagonal formula]] collapse to $\tfrac12 d_1 d_2$.

## On contests
The tell is a cyclic quadrilateral whose diagonals are stated to be perpendicular, or a figure where two chords visibly cross at a right angle. Once spotted, $a^2 + c^2 = b^2 + d^2 = 4R^2$ usually finishes a length question in one line, and the midpoint consequence handles the configuration questions.`,

"incircle-excircle-homothety": String.raw`## Why it works
The incircle and the $A$-excircle are both tangent to the two lines through $A$, so both are inscribed in the same angle and their centers both lie on the bisector from $A$. A dilation centered at $A$ therefore carries one to the other, and its ratio is the ratio of the radii, $\tfrac{r_a}{r}$. Since $r = \tfrac{\text{Area}}{s}$ and $r_a = \tfrac{\text{Area}}{s-a}$, that ratio is $\tfrac{s}{s-a}$, giving $\tfrac r{r_a} = \tfrac{s-a}s$.

Now ask where the incircle's touch point $D$ on $BC$ goes. A dilation maps a tangent line to a parallel tangent line, and the excircle's tangent parallel to $BC$ is not $BC$ itself but the far one. So $D$ does not map to $E$. What maps to $E$ is the point where the incircle meets the tangent parallel to $BC$ on the far side, which is $D'$, the antipode of $D$. Hence $A$, $D'$, and $E$ are collinear: they are a center of dilation and two corresponding points.

A companion fact worth carrying alongside: $BD = s-b$ while $BE = s-c$, so $D$ and $E$ are reflections of one another in the midpoint of $BC$. That is [[incircle-excircle-touch|the touch-point symmetry]].

## How to use it
Any time a problem draws a line from a vertex to the opposite excircle's touch point, this is the intended path: that line passes through the top of the incircle. Conversely, a line through $A$ and the incircle's far point is headed for $E$. Because $E$ is the Nagel cevian foot, the same picture is the standard way in to [[gergonne-nagel-points|the Nagel point]].

The ratio is the other half of the value. It converts between $r$ and $r_a$ without computing the area, and it is what lets a length along $AE$ be split in the ratio $s-a$ to $s$.

## On contests
Uncommon on AMC and a recurring sight on hard AIME and olympiad geometry, where it usually appears as an unexplained collinearity to be proved, or as the bridge that turns a question about an excircle into one about the incircle. If a configuration has both circles and a cevian to a touch point, try this before coordinates.`,

"arbelos": String.raw`## Why it works
Write $AB = 2a$ and $BC = 2b$, so the outer semicircle has radius $a+b$. The leftover area is $\tfrac\pi2(a+b)^2 - \tfrac\pi2a^2 - \tfrac\pi2b^2$, and expanding the square leaves $\pi ab$.

Now the perpendicular at $B$. Because $AC$ is a diameter, [[thales-theorem|Thales]] makes $\angle ADC$ a right angle, so $BD$ is the [[altitude-hypotenuse|altitude to the hypotenuse]] of a right triangle and the geometric mean relation gives $BD^2 = AB \cdot BC = 4ab$. The circle on $BD$ as diameter therefore has area $\tfrac\pi4 \cdot 4ab = \pi ab$, the same number. The two regions are not congruent, but their areas agree exactly.

Archimedes' twin circles are the striking part. Inscribe a circle in the left lobe, tangent to the perpendicular $BD$, to the outer semicircle, and to the semicircle on $AB$; do the same on the right. The two radii both come out to $\tfrac{ab}{a+b}$, even though the lobes are different sizes whenever $a \ne b$.

## How to use it
Recognize the figure from three semicircles on collinear diameters, all on one side. The area identity is what makes the shape worth naming: a region bounded by three arcs is replaced by one circle.

For anything harder, [[inversion-properties|inversion]] is the intended tool. Inverting about $A$ or $C$ carries the two semicircles through the center into a pair of parallel lines, which turns the chain of circles inscribed in the arbelos into a stack of equal circles between two parallels, and Pappus' chain becomes almost trivial.

## On contests
Rare, and essentially absent from AMC and AIME, which is why this is filed as a reference card. It is worth recognizing because a problem that builds three semicircles on a segment is usually quoting this configuration, and the area identity then finishes it immediately.`,

"corner-circle-chain": String.raw`## Why it works
A circle tangent to both sides of an angle is centered on the bisector, since the distance to the two sides has to match. Drop a perpendicular from the center to one side: it has length $r$, the hypotenuse is the distance $d$ from the vertex, and the angle at the vertex is the half-angle $\theta$. So $r = d\sin\theta$, which ties the radius to the position with no freedom left.

Chain two of them. Consecutive circles are externally tangent and both centers are on the bisector, so $d_{k+1} - d_k = r_k + r_{k+1}$. Substituting $d = r/\sin\theta$ turns that into $\frac{r_{k+1} - r_k}{\sin\theta} = r_k + r_{k+1}$, and collecting terms gives $\frac{r_{k+1}}{r_k} = \frac{1+\sin\theta}{1-\sin\theta}$. The ratio is the same at every step, so the radii form a geometric progression and the circles shrink toward the vertex forever without reaching it.

The flat relation is the same idea with a line in place of the second side. Two circles of radii $r_1, r_2$ tangent to each other and to a common line have their tangency points $2\sqrt{r_1r_2}$ apart, which is [[common-tangent-lengths|the common tangent length]]. Fitting a third circle into the gap and applying that twice gives $\frac1{\sqrt{r_3}} = \frac1{\sqrt{r_1}} + \frac1{\sqrt{r_2}}$. It is also what [[descartes-circle-theorem|Descartes' Circle Theorem]] reduces to when one curvature is set to zero.

## How to use it
When circles are stacked into a corner, do not chase them one at a time: identify the ratio from the angle once, and the whole chain is a [[geometric-series|geometric sequence]], so sums of radii are geometric series and the $n$-th circle is immediate.

When circles sit in a row on a common line, reach for the reciprocal square-root relation instead. It generalizes: any number of circles inscribed successively in the gaps gives radii whose inverse square roots add.

## On contests
Uncommon at AMC and AIME level, and included for recognition rather than as a working tool. The shape to remember is a figure with several circles tangent to the same two lines, or several circles in a row on a common tangent line. Either one is this card, and either one collapses to a short computation once the right relation is used.`,

"radical-axis": String.raw`
## Why it works
The power of a point is a quadratic expression in its coordinates, and the quadratic parts of any two circles are the same, so setting two powers equal leaves a linear equation.

Write a circle as $x^2 + y^2 + Dx + Ey + F = 0$. The power of a point $(x, y)$ is exactly the left side evaluated there, so subtracting two such equations cancels $x^2 + y^2$ and leaves $$(D_1 - D_2)x + (E_1 - E_2)y + (F_1 - F_2) = 0:$$ the locus of equal power is a line. It is perpendicular to $O_1O_2$ because each power depends only on the distance to its own center, so the locus is symmetric about the line of centers.

For three circles, a point with equal power to circles $1$ and $2$, and to circles $2$ and $3$, has equal power to circles $1$ and $3$. So where two of the axes cross, the third passes too, and the three axes meet at the radical center, unless the centers are on one line and the axes are parallel.

{{figure:center}}

## How to use it
When the circles meet, the common chord is the radical axis, so subtracting the equations gives the chord's line with no intersection points to compute. For $x^2 + y^2 = 25$ and $(x - 6)^2 + y^2 = 9$, subtracting gives $$x^2 - (x - 6)^2 = 25 - 9, \qquad 12x - 36 = 16,$$ so the chord lies on $x = \frac{13}{3}$.

Every point of the axis has equal tangent lengths to both circles, which turns a statement about lengths into one equation, and the axis is perpendicular to the line of centers, which gives a direction for free.

The radical center is the standard way to prove three lines concurrent: show that each is the radical axis of a pair among three circles. When it lies outside all three circles, it is also the center of a circle crossing all three at right angles.

## On contests
Five problems here, four of them AIME, one solved by it alone and three combined with power of a point. Almost every appearance has one of two shapes: two circles meet and the question is really about their common chord, or a point has equal power to two circles and the axis locates it. Olympiad problems add a third use, concurrency through a radical center.
`,

"miquels-theorem": String.raw`## Why it works
Let the circles through $(B, F, D)$ and $(C, D, E)$ meet again at $M$. Cyclic quadrilaterals give $\angle FMD = 180° - B$ and $\angle DME = 180° - C$, so $\angle FME = 360° - (180° - B) - (180° - C) = B + C = 180° - A$ — which says exactly that $A, F, M, E$ are concyclic. One angle chase, fully general.

## How to use it
Whenever a configuration has one point on each side of a triangle and circles through vertex-adjacent triples, the three circles share a point — often the key hidden point of the problem. The spiral-similarity connection: the Miquel point is the center of the [[spiral-similarity|spiral similarity]] taking $EF$ configurations to $BC$ ones.

## On contests
AIME-level circle problems sometimes plant a Miquel configuration without naming it; recognizing "three circles, one per vertex" saves the day. The complete-quadrilateral version (Miquel point of four lines) is an olympiad staple.`,

"pascals-theorem": String.raw`## Why it works
Projective magic — the clean proofs use cross-ratios or the radical axes of three cleverly chosen circles. For contest purposes: know the statement, its stability under re-ordering the six vertices (different orders give different Pascal lines), and its degenerate forms.

## How to use it
The degenerate versions do the work: merge two adjacent vertices and the side through them becomes the tangent at that point. With a triangle (three merged pairs), Pascal says tangent-at-$A$ ∩ $BC$, tangent-at-$B$ ∩ $CA$, tangent-at-$C$ ∩ $AB$ are collinear.

The cyclic-quadrilateral case merges one pair only, and is the version that actually turns up. Take $ABCD$ on a circle and run Pascal on the hexagon $AABCDD$, where the repeated letters mean the tangents at $A$ and at $D$. The three intersections are then tangent-at-$A$ ∩ $CD$, tangent-at-$D$ ∩ $AB$, and $BC$ ∩ $AD$, and those three points are collinear. Merging a different pair, or reordering, gives the companion statements: running $ABBCDD$ instead puts the tangent at $B$ into the line. The useful reading is that the tangents at two vertices of a cyclic quadrilateral meet the opposite sides on a line through the intersection of the remaining two sides, which is how a problem about a tangent and a side extension collapses to a collinearity. Brianchon (the dual) handles tangential polygons: main diagonals of a circumscribed hexagon concur. Its projective dual is Brianchon's Theorem, which swaps points for lines and an inscribed hexagon for a circumscribed one.

## On contests
Olympiad tool; on AIME its degenerate forms occasionally shortcut collinearity claims that would otherwise need heavy computation. Worth knowing mainly for recognition — six points on a circle with intersecting chord extensions is the tell.`,

"homothety-monge": String.raw`
## When to use
Two circles tangent internally or externally, with a chord, tangent line, or diameter attached to one of them; two circles with common external or internal tangents; three circles and the intersections of their common tangents; and figures with parallel lines from a common point, such as a triangle and its medial triangle. The tell is a figure that contains a smaller copy of part of itself.

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
Areas of regions bounded by lines or by absolute values of linear expressions, such as $|x + y| + |x - y| \le 2$ or $|2x + y| \le 3$ with $|x - y| \le 1$; lattice points on $x^2 - y^2 = n$; and any problem written in two linear combinations of the coordinates. The tell is a region with slanted edges in only two directions.

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
## Why it works
The point at distance $r$ from the origin in direction $\theta$ is $r$ times the point at angle $\theta$ on the unit circle, which is $(\cos\theta, \sin\theta)$. So $$x = r\cos\theta, \qquad y = r\sin\theta,$$ and squaring and adding gives $r^2 = x^2 + y^2$, while dividing gives $\tan\theta = \frac yx$.

To convert an equation, substitute those formulas, or first multiply through by $r$ so that $r\cos\theta$, $r\sin\theta$, and $r^2$ appear. For $r = 2\cos\theta$, multiplying by $r$ gives $$x^2 + y^2 = 2x \iff (x - 1)^2 + y^2 = 1,$$ a circle through the origin.

{{figure:circle}}

The figure shows why without algebra: $O$ and $(2, 0)$ are the ends of a diameter, so the angle at any point $P$ of the circle is a right angle, and $OP = 2\cos\theta$.

Unlike a [[linear-change-of-variables|linear change of variables]], polar coordinates stretch areas by different amounts in different places. A small cell with side $\Delta r$ along a ray and $r\,\Delta\theta$ along an arc is nearly a rectangle, so its area is about $$r\,\Delta r\,\Delta\theta,$$ which grows with $r$. That factor $r$ plays the part of the determinant, and in calculus it is called the Jacobian.

{{figure:cell}}

## How to use it
Switch to polar when a problem is about distance from the origin or direction from it: $\sqrt{x^2 + y^2}$, $x^2 + y^2 = k$, circles through the origin, or points spread evenly in angle. A rotation by $\alpha$ about the origin is simply $\theta \mapsto \theta + \alpha$.

A region swept out by a radius that changes with the angle is made of thin sectors, each of area about $\frac12 r^2\,\Delta\theta$, so its area is the sum of those slivers. For a constant radius this is the [[circle-basics|sector area]] $\frac12 r^2\theta$.

In the complex plane the same two numbers are the modulus and argument, $z = r(\cos\theta + i\sin\theta)$, and multiplying complex numbers multiplies the $r$'s and adds the angles, which is [[de-moivre|De Moivre's Theorem]].

## On contests
No problems here are tagged with it yet. On the AMC 12 it appears as a curve given in polar form, such as $r = 4\sin\theta$ or the rose $r = \cos 2\theta$, to be identified or measured, and on the AIME it sits inside complex numbers written by modulus and argument.
`,

"shared-angle-area-ratio": String.raw`
## Why it works
Both areas are half a product of two sides times the sine of the angle between them, $$[AXY] = \tfrac12\,AX \cdot AY\sin\angle A, \qquad [ABC] = \tfrac12\,AB \cdot AC\sin\angle A,$$ so in the ratio the sines cancel and only the side ratios remain.

The cancellation needs the sines to be equal, not the angles, and $\sin\theta = \sin(180^\circ - \theta)$. So supplementary angles work exactly as well as equal ones, and that single observation turns one picture into a family: a point extended past the vertex, or two triangles on opposite sides of a crossing, give the same product. In Chinese competition training it is called the bird's-head model, after the extended-side figure.

A second proof needs no sines, only [[cevian-area-ratio|same-height base ratios]]: draw $BY$. Triangles $AXY$ and $ABY$ share the apex $Y$ and have their bases $AX$ and $AB$ on one line, and triangles $ABY$ and $ABC$ share the apex $B$ with bases $AY$ and $AC$ on one line. So $$\frac{[AXY]}{[ABC]} = \frac{[AXY]}{[ABY]} \cdot \frac{[ABY]}{[ABC]} = \frac{AX}{AB} \cdot \frac{AY}{AC}.$$

{{figure:heights}}

The first step uses only the line through $A$ and $B$, so it works just as well when $X$ lies on $BA$ extended past $A$.

## How to use it
The four figures, each with equal or supplementary angles at the two vertices:

- $X$ on $AB$ and $Y$ on $AC$, the small triangle cut off at a corner.
- $X$ on $BA$ extended past $A$, where $\angle XAY = 180^\circ - \angle BAC$ and the product is unchanged; this is the case most often missed.
- Two triangles meeting at a crossing point $P$, where vertical angles are equal: $\frac{[PAC]}{[PBD]} = \frac{PA \cdot PC}{PB \cdot PD}$.
- Two triangles anywhere whose angles happen to be equal or supplementary.

With $AX = \frac13AB$ and $AY = \frac34AC$, $[AXY] = \frac13 \cdot \frac34[ABC] = \frac14[ABC]$. Chain it around a figure, one product per corner triangle, and subtract from the whole to reach the middle region. Its relatives are the [[same-base-area-ratio|same-base ratio]], cevian area ratios, and the [[area-method|area method]].

## On contests
Four problems here, three of them AIME, none by it alone; two start from an [[angle-bisector-theorem|angle bisector]], whose side ratio feeds the product. It is everywhere on AMC 10 and 12 as "points on two sides, what fraction of the area", and it is the standard first move in AIME area dissections.
`,

"exradii": String.raw`## Why it works
The excenter opposite $A$ sits at the intersection of the external bisectors from $B$ and $C$; joining it to the vertices splits the triangle with signed areas, giving $A = r_a(s - a)$ in place of $A = rs$. The tangent-length bookkeeping mirrors the incircle's, but the tangent length from $A$ is now $s$ itself.

## How to use it
Any incircle technique has an excircle twin: $r_a = \frac{A}{s-a} = s\tan\frac{A}{2}$, touch point of the $A$-excircle on $BC$ mirrors the incircle's touch point across the midpoint of $BC$. Multiplying the four radius formulas gives $r \, r_a r_b r_c = A^2$ — a slick identity for "product of radii" problems.

## On contests
AIME problems about circles tangent to one side and two extensions are excircle problems in disguise. The mirror-image touch point fact and $r r_a r_b r_c = A^2$ both appear as key steps; the [[incenter-excenter-lemma|incenter-excenter lemma]] connects $I_A$ to arc midpoints for the hardest versions.`,

"ratio-lemma": String.raw`## Why it works
Apply the Law of Sines in triangles $ABD$ and $ACD$: the sides $BD$ and $DC$ are proportional to $AB\sin\angle BAD$ and $AC \sin\angle DAC$ (the angles at $D$ are supplementary, so their sines agree and cancel).

## How to use it
The all-purpose cevian converter between side data and angle data. Special cases to recognize instantly: bisector (sines equal → Angle Bisector Theorem), median ($BD = DC$ → $\frac{\sin\angle BAD}{\sin\angle DAC} = \frac{AC}{AB}$), altitude and symmedian similarly. Multiply three of these around the triangle and Ceva's trig form appears.

## On contests
The clean way through AIME problems that give one cevian angle and ask for a length split (or vice versa). Worth drilling until the statement writes itself — it replaces a page of law-of-sines bookkeeping.`,

"incenter-excenter-lemma": String.raw`## Why it works
Angle chase: $\angle IBM = \angle IBC + \angle CBM = \frac{B}{2} + \frac{A}{2}$ (the inscribed angle $\angle CBM$ equals $\angle CAM = \frac{A}{2}$), while $\angle BIM = \frac{A}{2} + \frac{B}{2}$ as the exterior angle of $\triangle ABI$. So $\triangle MBI$ is isosceles: $MB = MI$. Symmetric arguments give $MC$ and the excenter.

## How to use it
Whenever an incenter and a circumcircle share a problem, draw the arc midpoint: it gives a circle through four named points ($B$, $C$, $I$, $I_A$) with known center and radius $MB = 2R\sin\frac{A}{2}$, plus the collinearity $A$–$I$–$M$. Many "find $AI$ or $IM$" problems become one law-of-cosines application inside this circle.

## On contests
Arguably the single most useful AIME circle lemma: it silently powers most configurations with the incenter and the circumcircle. Recognize the phrase "perpendicular bisector of the bisector segment" or "circle through $B$, $I$, $C$": the center is always the arc midpoint.`,

"orthocenter-properties": String.raw`
## Why it works
All of these facts come from two reflections of $H$, one over a side and one over that side's midpoint.

Reflect $H$ over $BC$. The image sees $BC$ at the same angle as $H$ does, and $\angle BHC = 180^\circ - \angle A$: in the quadrilateral formed by $A$, $H$, and the feet of the altitudes from $B$ and $C$, the two right angles add to $180^\circ$. So the image sees $BC$ at $180^\circ - \angle A$, which is exactly the condition for lying on the circumcircle, on the arc opposite $A$.

Now reflect $H$ over the midpoint $M$ of $BC$, and call the image $A'$. The diagonals of $BHCA'$ bisect each other at $M$, so it is a parallelogram, with $BH \parallel CA'$ and $CH \parallel BA'$. Since $BH \perp AC$, the line $CA'$ is perpendicular to $AC$ too, so $\angle ACA' = 90^\circ$, and in the same way $\angle ABA' = 90^\circ$. By [[thales-theorem|Thales' Theorem]], $A'$ is on the circumcircle, opposite $A$.

{{figure:parallelogram}}

The distances follow. $O$ is the midpoint of $AA'$ and $M$ is the midpoint of $HA'$, so in triangle $AHA'$ the segment $OM$ joins two midpoints and $$AH = 2\,OM.$$ The central angle over $BC$ is $2A$, so $OM = R\cos A$ and $AH = 2R\cos A$.

## How to use it
Three facts do most of the work.

- The circle through $H$, $B$, and $C$ is the reflection of the circumcircle over $BC$, so it has the same radius $R$.
- $AH = 2\,OM = 2R\cos A$, which links lengths at the orthocenter to lengths at the circumcenter.
- With $O$ at the origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$, the quickest route to coordinates.

A problem that gives the circle through $H$, $B$, and $C$ should be reflected back to the circumcircle at once. With the three vertices, $H$ forms an [[orthocentric-system|orthocentric system]], in which each of the four points is the orthocenter of the other three.

## On contests
Three problems here, two AIME and one HMMT, none solved by it alone, and two finish with [[power-of-a-point|power of a point]]. A problem that gives the circle through $H$ and two vertices usually opens with exactly the reflection of the circumcircle over a side. The distances $2R\cos A$ also give the sides of the orthic triangle, and the products $AH \cdot HH_A$ along the three altitudes are all equal, which is the power of the point $H$.`,

"fermat-point": String.raw`## Why it works
Rotate triangle $APB$ by $60^\circ$ about $B$: the path $AP + PC$ becomes a broken path of the same total length, and the extra segment $PP'$ equals $BP$ (equilateral triangle $PBP'$). So $PA + PB + PC$ equals the length of a path from a fixed erected vertex to $C$ — minimized when straight, which forces the $120^\circ$ angles.

## How to use it
For "minimize the sum of distances to three points": check the largest angle first (if $\ge 120^\circ$, the answer is at that vertex); otherwise the minimum value is computable by the rotation — it equals the distance between one vertex and the equilateral apex erected on the opposite side, i.e. one law-of-cosines evaluation with an angle increased by $60^\circ$.

## On contests
The engine behind "shortest total cable" problems and AIME minimizations of the total distance from a point to several vertices. On AMC the $120^\circ$ structure often arrives pre-installed, as three roads meeting at $120^\circ$; recognize it as Fermat-point optimality.`,

"point-plane-distance": String.raw`
## Why it works
The vector $(a, b, c)$ is perpendicular to the plane, and the distance is the part of any vector from the plane to the point that runs along it.

For two points of the plane, subtracting their equations gives $a\,\Delta x + b\,\Delta y + c\,\Delta z = 0$, so $(a, b, c)$ is perpendicular to every direction within the plane. For any point $Q$ of the plane, the component of $\vec{QP}$ along the unit normal is the perpendicular distance, and because $Q$ satisfies the equation it simplifies to $$\frac{ax_0 + by_0 + cz_0 + d_0}{\sqrt{a^2 + b^2 + c^2}}.$$ This is the argument for the distance from a point to a line with one more coordinate.

The volume route is the pyramid formula read backwards: a pyramid with base area $A$ and height $h$ has volume $\frac13Ah$, so $h = \frac{3V}{A}$.

{{figure:corner}}

## How to use it
Build the plane first: its normal is the [[cross-product-area|cross product]] of two edge vectors, and $d_0$ comes from substituting any known point. Then apply the formula: the distance from the origin to $2x + 3y + 6z = 21$ is $\frac{21}{\sqrt{4 + 9 + 36}} = 3$.

When the plane is a face of a tetrahedron with an easy volume, the height $\frac{3V}{A}$ is often quicker, as at the corner of a cube. A sphere is tangent to a plane exactly when the distance from its center to the plane equals its radius, just as for circles and lines.

## On contests
Four problems here, all AIME, one solved by it alone; two set up the plane with [[coordinate-bash|coordinates]], and two find the [[insphere-radius|radius of an inscribed sphere]], which is the distance from its center to each face. Keep both routes, the formula and $\frac{3V}{A}$; one of them is usually painless.
`,

"ravi-substitution": String.raw`
## When to use
Inequalities in the sides of a triangle, such as $abc \ge (a + b - c)(b + c - a)(c + a - b)$; identities involving the semiperimeter $s$ and $s - a$, $s - b$, $s - c$; and counts of triangles with integer sides and a given perimeter. The tell is that the triangle inequality keeps appearing as a side condition.

## How
1. Set $x = s - a$, $y = s - b$, $z = s - c$, so $a = y + z$, $b = z + x$, $c = x + y$ and $s = x + y + z$.
2. Translate every expression; the triangle inequality becomes simply $x, y, z > 0$.
3. Solve the new problem with free positive variables, using AM-GM, symmetric inequalities, or stars and bars.
4. Translate back, checking equality cases: $x = y = z$ is an equilateral triangle.

Prove that $abc \ge (a + b - c)(b + c - a)(c + a - b)$ for any triangle. Since $a + b - c = 2z$, $b + c - a = 2x$ and $c + a - b = 2y$, the claim is $(y + z)(z + x)(x + y) \ge 8xyz$. By AM-GM, $y + z \ge 2\sqrt{yz}$, and multiplying the three such bounds gives exactly that, with equality for the equilateral triangle.

## Why it works
The incircle touches the three sides, and the two tangent segments from a vertex are equal. Calling them $x$, $y$, $z$ for the vertices $A$, $B$, $C$, each side is the sum of the two tangent lengths at its ends, as the figure on this card shows. Adding all three sides gives $2(x + y + z) = 2s$, so $x = s - a$ and so on.

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

"center-distance-formulas": String.raw`## Why it works
With the circumcenter as origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$; expanding $|\vec{OH}|^2$ gives $3R^2$ plus dot products, and each $\vec{OA}\cdot\vec{OB} = R^2\cos(2C) = R^2 - \frac{c^2}{2}$ — summing produces $9R^2 - \sum a^2$. Dividing the [[euler-line-ratio|Euler line]] in thirds gives $OG$; the [[incenter-excenter-lemma|incenter]] identity is the power of $I$ (a chord through $I$ and a vertex has segment product $2Rr$ by the incenter-excenter lemma).

## How to use it
Given sides (or $\sum a^2$) and $R$, all Euler-line distances follow. Run it backwards too: contest problems specify $OH$ or $OG$ and ask for $\sum a^2$. Acute vs. obtuse checks: $OH^2 > 0$ always, but $\cos A\cos B\cos C$ changes sign at right triangles ($OH = R$ exactly... for a right triangle $\sum a^2 = 8R^2$ gives $OH^2 = R^2$ — $H$ is at the right-angle vertex, distance $R$ from $O$: consistent).

## On contests
"Sometimes" tier but decisive: problems giving two centers' distance and asking for side data, or vice versa. Pairs with $OI^2 = R(R-2r)$ (its own entry) to triangulate all three of $O$, $I$, $H$.`,

"feuerbach-theorem": String.raw`## Why it works
Deep — the classical proofs invert about the point where the incircle touches a side, or compute $NI$ directly with the [[barycentric-coordinates|barycentric]] distance formula. What survives for contest use is the metric statement: $NI = \frac{R}{2} - r$ exactly, which is internal tangency since the nine-point radius is $\frac{R}{2}$.

## How to use it
Treat it as a free equation linking $R$, $r$, and the position of $N = $ midpoint of $OH$: problems that pin down two of the circles' data determine the third. The excircle version $NI_A = \frac{R}{2} + r_A$ (external tangency) works the same way. Also a strong sanity check for coordinate computations — if your computed $NI \ne R/2 - r$, something upstream is wrong.

## On contests
Rare but famous; appears in olympiad-adjacent AIME problems about the nine-point circle meeting the incircle, and as the hidden reason behind "these two circles are tangent" claims. Recognition value is most of its worth.`,

"leibniz-formula": String.raw`## Why it works
Write $\vec{PA} = \vec{PG} + \vec{GA}$ and expand the squared sum: the cross terms vanish because $\vec{GA} + \vec{GB} + \vec{GC} = \vec{0}$ — the defining property of the centroid. The constant $\sum GA^2 = \frac{1}{3}\sum a^2$ comes from the median-length formula ($GA = \frac{2}{3}m_a$).

## How to use it
Any "sum of squared distances to the vertices" condition becomes a circle centered at $G$: the locus of $P$ with $\sum PA^2 = k$ is a circle (or point/empty), radius from the formula. Minimization questions end instantly: the minimum is $\frac{1}{3}\sum a^2$, at $G$. Generalizes to $n$ points with the same proof.

## On contests
Locus problems ("set of points with $PA^2+PB^2+PC^2 = 100$ is a circle — find its radius") and minimization one-liners. The four-point version handles rectangles and tetrahedra the same way.`,

"incenter-coordinates": String.raw`## Why it works
The incenter divides the bisector from $A$ in ratio $\frac{b+c}{a}$ (bisector theorem applied twice) — exactly the balance point of masses $a$, $b$, $c$ at the vertices. Mass-point mechanics then give the weighted-average coordinate formula; the centroid is the equal-mass case.

## How to use it
Once a triangle is coordinatized, write $I$ down directly — no bisector intersections needed. The general principle converts any mass-point configuration to coordinates: cevian intersection points are [[weighted-average|weighted averages]] with the masses you'd assign in mass points. Excenters flip the sign of one weight. The weights $(a:b:c)$ are barycentric coordinates, and reading them that way is what generalises the construction to every other triangle center.

## On contests
The quiet workhorse of coordinate solutions to incircle problems: AIME problems asking for incenter-related lengths in coordinatized triangles reduce to plugging into this formula plus the distance formula. Also the entry point to barycentric coordinates for students heading toward olympiad.`,

"law-of-tangents": String.raw`## Why it works
From the Law of Sines, $\frac{a-b}{a+b} = \frac{\sin A - \sin B}{\sin A + \sin B}$; sum-to-product turns numerator and denominator into $2\cos\frac{A+B}{2}\sin\frac{A-B}{2}$ and $2\sin\frac{A+B}{2}\cos\frac{A-B}{2}$, whose ratio is the tangent quotient.

## How to use it
Best when a problem gives $a + b$ and $a - b$ (or their ratio) together with $C$ — since $\frac{A+B}{2} = 90^\circ - \frac{C}{2}$ is then known, the formula yields $\frac{A-B}{2}$ and hence both angles. An alternative to the Law of Cosines that avoids quadratics in exactly this data pattern.

## On contests
Occasional AIME trig; also handy for "the sides differ by 2 and the included angle is..." setups. Knowing it exists prevents a mechanical but messy cosine-rule grind.`,

"napoleons-theorem": String.raw`## Why it works
Cleanest with complex numbers: the center of an outward equilateral on segment $pq$ is a fixed linear combination of $p$ and $q$ involving a primitive sixth root of unity; the equilateral condition for the three centers reduces to the identity $1 + \omega + \omega^2 = 0$. Rotation composition gives a synthetic proof.

## How to use it
The theorem itself is mostly recognition ("centers of erected equilaterals" ⟹ equilateral, no computation needed). The area formulas — outer $= \frac{\sqrt3}{24}\sum a^2 + \frac{[ABC]}{2}$, and outer minus inner $= [ABC]$ — turn qualitative setups into numbers. The erected-triangle apexes themselves (not centers) connect to the [[fermat-point|Fermat point]]: segments from each apex to the opposite vertex concur there with equal lengths.

## On contests
Occasional AMC/AIME cameo, and the Fermat-point connection makes the configuration worth knowing cold: erected equilateral triangles almost always signal either Napoleon structure or [[rotation-trick|the rotation trick]].`,

"cyclic-quad-radius": String.raw`## Why it works
Split the quadrilateral by a diagonal and apply $R = \frac{(\text{side products})}{4 \cdot \text{area}}$ to each triangle — both triangles share the circumcircle. Combining the two expressions with Ptolemy's relation between the diagonals produces the symmetric three-product form.

## How to use it
For a cyclic quadrilateral with known sides: Brahmagupta gives $K$, then this gives $R$ — a two-step pipeline replacing any diagonal-hunting. Note the three products $(ab+cd)$, $(ac+bd)$, $(ad+bc)$ also give the diagonals: $p^2 = \frac{(ac+bd)(ad+bc)}{ab+cd}$ and its mate.

## On contests
The finishing move for "cyclic quadrilateral with sides 4, 5, 6, 7 — find the circumradius" questions, which otherwise require solving for a diagonal first. The diagonal formulas hiding in the same products are equally worth caching.`,

"van-aubel": String.raw`## Why it works
Complex numbers: the center of the square erected outward on segment from $p$ to $q$ is $\frac{p+q}{2} + \frac{i}{2}(q-p)$. Writing the two center-difference vectors and simplifying, one is exactly $i$ times the other — perpendicular and equal in one stroke.

## How to use it
Recognition first: squares erected on the sides of a quadrilateral ⟹ the opposite-center segments are congruent and perpendicular, no computation. The complex-number center formula is independently useful for any "erect a square, find a point" coordinate problem.

## On contests
The quadrilateral cousin of [[napoleons-theorem|Napoleon]] — appears in AMC/AIME-adjacent problems about squares built on sides. Degenerate cases are cute and testable: collapse one side to a point and it still holds.`

});

Object.assign(window.MATH_DETAILS, {

"intercept-theorem": String.raw`## Why it works
$DE \parallel BC$ makes $\triangle ADE \sim \triangle ABC$ (equal corresponding angles), so $\frac{AD}{AB} = \frac{AE}{AC}$; subtracting from 1 converts whole-side ratios to the segment form $\frac{AD}{DB} = \frac{AE}{EC}$. The three-parallel-lines version follows by two applications.

## How to use it
The fastest ratio-transfer tool: one parallel line moves a known ratio from one side of a triangle to another without similarity bookkeeping. The converse certifies parallelism from ratios — the standard way to prove two segments are parallel in ratio-heavy configurations. Watch the two ratio forms (segment-to-segment vs. segment-to-whole) — mixing them is the classic error.

## On contests
MATHCOUNTS/AMC 10 workhorse for "parallel line cuts the sides" problems, and the silent first step in many mass-point and area-ratio solutions.`,

"trapezoid-special-segments": String.raw`
## Why it works
Each segment is cut off by the legs, so each length comes from one similarity or one area equation.

The diagonals cut each other in the ratio $a : b$, since the triangles on the two bases are similar. In triangle $ACD$ the segment from $P$ to the leg is parallel to the base $DC$, so it is $\frac{a}{a + b}$ of it: $$XP = \frac{a}{a + b} \cdot b = \frac{ab}{a + b},$$ and the other half $PY$ is the same, which gives $XY = \frac{2ab}{a + b}$.

{{figure:harmonic}}

If a segment $x$ cuts the trapezoid into two similar trapezoids, corresponding sides are in one ratio, $\frac ax = \frac xb$, so $x = \sqrt{ab}$.

For the area, extend the legs to meet. The triangles with bases $a$, $x$, and $b$ have areas proportional to $a^2$, $x^2$, and $b^2$, so halving the trapezoid means $x^2 - a^2 = b^2 - x^2$, and $x^2 = \frac{a^2 + b^2}{2}$. The midsegment averages the bases, as for any [[trapezoid-parallelogram-areas|trapezoid]].

## How to use it
Identify which segment the problem describes, through the diagonals, cutting into similar pieces, halving the area, or joining the midpoints of the legs, and quote the matching mean. The order HM $\le$ GM $\le$ AM $\le$ QM places them from the short base toward the long one, a quick check on any answer.

Distances along the height follow the same similarities: the diagonals' crossing divides the height in the ratio $a : b$ from the short base, and the midsegment halves it.

## On contests
Two problems here, both AIME, neither solved by it alone: one combines the midsegment with the trapezoid's area and then asks for the area-halving segment, and the other finds a segment lying on the midsegment through [[perp-to-angle-bisector|perpendiculars to angle bisectors]]. The AMC asks for each of the four directly.
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

"cyclic-quad-diagonals": String.raw`## Why it works
Apply the Law of Cosines to the two triangles sharing diagonal $p$, using $\cos B = -\cos D$, and solve — the result packages into the paired products. Dividing the two diagonal formulas gives the elegant ratio; multiplying them recovers Ptolemy.

## How to use it
Given four sides of a cyclic quadrilateral, both diagonals follow with no trigonometry: compute the three products $(ab+cd)$, $(ac+bd)$, $(ad+bc)$ once, then $p^2$ and $q^2$ are quotients. Pairs with [[brahmaguptas-formula|Brahmagupta]] (area) and Parameshvara (circumradius), which are built from the same three products. Those products also drive Ptolemy's Theorem, which is the relation to reach for when the diagonals themselves are wanted rather than their ratio.

## On contests
The missing step in "cyclic quadrilateral with sides given — find the diagonal" AIME problems, where Ptolemy alone gives only the product $pq$. Knowing the ratio formula turns one equation into two.`,

"angle-between-lines": String.raw`## Why it works
A line of slope $m$ makes angle $\arctan m$ with the $x$-axis; the angle between the lines is the difference of inclinations, and the tangent subtraction formula gives $\tan(\alpha_1 - \alpha_2)$ in terms of the slopes. The absolute value selects the acute angle.

## How to use it
Direct: two slopes in, angle out. In reverse: "find the line making a given angle $\theta$ with a given line" turns the formula into an equation for the unknown slope (expect two solutions, one on each side). The $1 + m_1m_2 = 0$ singularity is perpendicularity — the formula's built-in reminder.

## On contests
AMC 12 asks it directly, for instance the angle between lines of slopes $3$ and $\frac12$, which is $45^\circ$; it also converts coordinate configurations into the angle form needed for trig identities and arctan telescoping.`,

"reflection-coordinates": String.raw`
## Why it works
Reflecting means moving straight across the line, at right angles to it, and going as far past the line as the point was before it.

The vector $(a, b)$ is perpendicular to $ax + by + c = 0$, and the signed distance from $P$ to the line is $\frac{ax_0 + by_0 + c}{\sqrt{a^2 + b^2}}$, as on [[point-line-distance|the point-to-line distance card]]. Moving $P$ that far against the unit normal lands on the foot of the perpendicular, and moving twice as far lands on the image. Twice the distance times the unit normal is $$\frac{2(ax_0 + by_0 + c)}{a^2 + b^2}(a, b),$$ which is the step in the formula.

The special cases are the formula with simple normals. For $y = x$, written $x - y = 0$, the normal is $(1, -1)$ and the step from $(x, y)$ is $(x - y)(1, -1)$, which lands on $(y, x)$.

{{figure:instant}}

## How to use it
Use the instant cases whenever the mirror is an axis, $y = \pm x$, or a horizontal or vertical line, and the general formula for a slanted mirror. Reflecting $(5, 0)$ over $x + y = 4$ gives $$(5, 0) - \frac{2(5 + 0 - 4)}{1^2 + 1^2}(1, 1) = (4, -1).$$ Check that the midpoint, here $(4.5, -0.5)$, lies on the mirror. To reflect a whole line, reflect two of its points.

Reflections do three jobs on contests. They find shortest paths, since a path that touches a line on its way between two points is shortest when reflecting one endpoint makes it straight, [[reflect-across-the-line|the reflection trick]]. They model folds, since a crease is the perpendicular bisector of a point and its image. And the swap over $y = x$ is the coordinate meaning of an inverse function.

## On contests
Seven problems here, five of them AIME, one solved by it alone; most of the rest are folds, paired with the perpendicular bisector that the crease is and finished with the [[pythagorean-theorem|Pythagorean Theorem]]. Light rays and billiard paths chain several reflections, each one a step of the same computation.
`,

"skew-lines-distance": String.raw`## Why it works
The cross product $\vec{d_1} \times \vec{d_2}$ is perpendicular to both lines — the direction of the unique common perpendicular. Any connecting vector between the lines has the same projection onto that direction, and that projection is the distance. The tetrahedron route says the same thing with volumes: $V = \frac{1}{6}\,d\, |\vec{d_1}||\vec{d_2}|\sin\phi$-style, so $d = 3V/[\text{base}]$-type manipulations work.

## How to use it
Coordinatize, take one point and the direction on each line, compute one cross product and one [[vector-dot-product|dot product]]. Sanity checks: parallel lines give $\vec{d_1} \times \vec{d_2} = 0$ (use point-to-line instead); intersecting lines give distance 0. In cubes and boxes, the answer is often a clean fraction of the edge — e.g. opposite edges' diagonals.

## On contests
AIME 3D problems: distance between skew edges or face diagonals of a cube, and "shortest segment connecting two lines" questions. One computation replaces an optimization.`,

"isoperimetric-facts": String.raw`## Why it works
Rectangle: $xy \le \left(\frac{x+y}{2}\right)^2$ is AM-GM. Triangle: Heron's product $(s-a)(s-b)(s-c)$ with fixed sum is maximized at equality — AM-GM again. Polygons → cyclic (Bretschneider's cosine term vanishes) → regular → circle is the classical chain; each step trades asymmetry for area.

## How to use it
Optimization problems that ask for a maximum area with a perimeter budget (or minimum perimeter for an area) end at the symmetric configuration — quote the fact, compute the symmetric case, and confirm the equality condition. The "cyclic maximizes for fixed sides" version answers hinged-quadrilateral questions.

## On contests
"A farmer has 100 feet of fence..." (square, or half-square against a wall — careful: the wall variant's optimum is a $25 \times 50$ half-square, not a square!). AMC also tests the qualitative form: recognizing that the extremal shape must be the symmetric one.`

});

Object.assign(window.MATH_DETAILS, {


});

Object.assign(window.MATH_DETAILS, {

"cayley-menger": String.raw`## Why it works
It is Heron's Formula lifted one dimension. In the plane, a triangle's area is fixed by its three sides; in space, a tetrahedron's volume is fixed by its six edges — and both are the same bordered determinant of squared distances, just at size $4$ (with the $16[\triangle]^2$ factor) versus size $5$ (with $288 V^2$). The bordering row/column of $1$'s encodes the affine constraint that the points actually live in $3$-space.

## How to use it
Reach for it whenever you know all six edge lengths but placing coordinates is awkward. Fill the symmetric matrix carefully: entry $(i,j)$ is the squared distance between vertices $i$ and $j$, with $a,b,c$ the three edges meeting at one vertex and $d,e,f$ their respective opposite edges. If $288V^2$ comes out $0$, the four points are coplanar; if negative, no such tetrahedron exists (the edge lengths violate a triangle-type inequality).

## On contests
Most AIME tetrahedra have enough right angles or symmetry that coordinates or the box trick are faster, so treat Cayley–Menger as the universal fallback rather than the first move. It shines on "scalene" tetrahedra given purely by edge lengths, and it's the clean way to prove a configuration is impossible.`,

"isosceles-tetrahedron": String.raw`
## Why it works
Four alternate corners of a box, no two joined by an edge of the box, are joined in pairs by face diagonals, and opposite diagonals lie on parallel faces, so they are equal.

Going the other way, given the three edge lengths $a$, $b$, $c$, look for a box with $p^2 + q^2 = a^2$, $q^2 + r^2 = b^2$, and $p^2 + r^2 = c^2$. Adding and subtracting solves it: $$p^2 = \frac{a^2 + c^2 - b^2}{2},$$ and similarly for $q^2$ and $r^2$. These are positive exactly when every face is an acute triangle, which is always true for an isosceles tetrahedron.

The rest of the box is four corner pyramids, each with three mutually perpendicular edges from the box, so each has volume $\frac16pqr$, and $$V = pqr - 4 \cdot \frac{pqr}{6} = \frac{pqr}{3}.$$

{{figure:corners}}

## How to use it
The trigger is three pairs of equal opposite edges. Find the box from the three sum equations, as in the example, and the volume is immediate.

The four faces are congruent, so the surface area is four times one face, which pairs with [[insphere-radius|the insphere formula]] $r = \frac{3V}{S}$. The center of the box is the center of both the circumscribed and the inscribed spheres, since the symmetries of the box swap the four faces. Such tetrahedra are also called disphenoids.

## On contests
Three problems here, two AIME and one AMC 12, none solved by it alone. The recurring shape gives three pairs of equal opposite edges that are square roots, which fit a box with whole-number sides, and asks for the volume or the insphere radius; others minimize a sum of distances at the center of the box, or use the fact that any acute triangle is the face of one. A tetrahedron given by three matched pairs of edges is always signaling the box.`,

"tetrahedron-centroid": String.raw`## Why it works
The centroid of equal point masses at the four vertices is their average $\frac{A+B+C+D}{4}$. Writing the face centroid $M_A = \frac{B+C+D}{3}$, the point $\frac{A + 3M_A}{4}$ equals $G$, which places $G$ three-quarters of the way from $A$ to $M_A$ — the $3:1$ split. The three bimedians pass through $G$ because the midpoint of a segment joining two edge-midpoints is again the four-vertex average.

## How to use it
For any "balance point," "center of mass," or averaged-vertex question, just average coordinates. The $3:1$ median ratio is the 3D analogue of the triangle centroid's $2:1$; the pattern is that in $n$ dimensions the centroid divides a median $n:1$. The concurrent, mutually bisecting bimedians make the centroid a natural origin for symmetric coordinate setups.

## On contests
Mass-point and averaging arguments transfer directly to 3D. When a problem hands you the four vertices (or asks about the point minimizing summed squared distances, which is exactly $G$), the centroid is a one-line computation.`

});

Object.assign(window.MATH_DETAILS, {

"angle-chasing": String.raw`
## When to use
Any figure with unknown angles: triangles with isosceles parts, parallel lines cut by transversals, circles with chords and tangents, cyclic quadrilaterals. It is also the way to prove that four points are concyclic or that two triangles are similar, by finding equal angles. On the AMC it is often the whole solution; on harder problems it supplies the angles that the Law of Sines or the area formula turns into lengths.

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

"section-formula": String.raw`## Why it works
The point at fraction $\frac{m}{m+n}$ of the way from $A$ to $B$ is $A + \frac{m}{m+n}(B - A)$, which rearranges to the weighted average $\frac{n A + m B}{m+n}$ — more weight on the endpoint you're closer to. The midpoint is the balanced case $m = n$.

## How to use it
Read the ratio carefully: $AP : PB = m : n$ puts the $m$ coefficient on the far point $B$. For external division (the point beyond the segment, as in "extend $AB$ past $B$ so that..."), use a negative sign: $\frac{m B - n A}{m - n}$. This is the coordinate face of [[mass-points|mass points]] — placing mass $n$ at $A$ and $m$ at $B$ balances at $P$ — so any cevian-ratio problem can be finished either way.

## On contests
The workhorse for coordinate solutions to ratio problems, trisection points, and centroid computations. When a problem gives you a ratio along a segment and asks for a coordinate, length, or area, this is a one-line computation. Pairs naturally with the [[shoelace-formula|shoelace formula]] for the area that follows.`,

"vector-dot-product": String.raw`## Why it works
Expanding $|\vec{u} - \vec{v}|^2 = |\vec{u}|^2 + |\vec{v}|^2 - 2\,\vec{u} \cdot \vec{v}$ against the Law of Cosines forces $\vec{u} \cdot \vec{v} = |\vec{u}||\vec{v}|\cos\theta$. So the sign of the dot product is the sign of $\cos\theta$: positive means acute, zero means perpendicular, negative means obtuse.

## How to use it
Three standard reads: the angle between two vectors ($\cos\theta = \frac{\vec{u} \cdot \vec{v}}{|\vec{u}||\vec{v}|}$), a perpendicularity test ($\vec{u} \cdot \vec{v} = 0$), and the length of the projection of $\vec{u}$ onto $\vec{v}$ ($\frac{\vec{u} \cdot \vec{v}}{|\vec{v}|}$). Coordinates make it mechanical: $\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2$ (add $u_3 v_3$ in 3D). To show two lines are perpendicular, dot their direction vectors.

## On contests
The clean way to handle angle and perpendicularity conditions once a figure is on coordinates — often faster than slopes because it dodges the vertical-line special case and extends straight to 3D. On AIME, the dot/cross product pair turns spatial angle and area questions into arithmetic.`,

"cavalieris-principle": String.raw`## Key forms
- $V=\int A(h)\,dh$ — volume depends only on the cross-section area function, so matching $A(h)$ at every height matches the volume
- $V=Bh$ survives shearing — an oblique prism or cylinder has the same volume as the upright one, because no slice changes as you shear it
- sphere against cylinder-minus-two-cones — matching slice areas at every height is the classical route to $\tfrac43\pi r^3$ with no integration

## Why it works
Volume is the integral of cross-sectional area over height. If two solids present the same area $A(h)$ at every height $h$, their volume integrals are identical — the shapes of the slices, and how they're stacked or sheared, are irrelevant.

## How to use it
Use it to transport a volume you don't know onto one you do. An oblique prism or cylinder shears to an upright one slice-for-slice, so it keeps $V = Bh$. A pyramid's volume comes from slicing it against a known pyramid with the same base and height. The famous derivation of the sphere: a hemisphere of radius $R$ has the same slice area at every height as a cylinder of radius $R$ with a cone bored out, giving $V = \frac{2}{3}\pi R^3$ per hemisphere.

## On contests
Mostly a conceptual unlock: it justifies "the slant doesn't matter" so you can replace a leaning solid with an upright one, and it explains why the $\frac{1}{3}$ in a pyramid's volume is shape-independent. When a solid is defined by a moving or tilted cross-section, think slices.`,

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

"pole-polar": String.raw`## Key forms
- the polar of $P$ with respect to a circle of radius $R$ about $O$ is the line of points $Q$ with $\vec{OP}\cdot\vec{OQ}=R^2$; when $P$ lies outside, this line is exactly the chord of contact joining the two tangency points — the pole-polar pairing is symmetric, so a point on one is matched by a line through the other
- the defining relation is symmetric, giving La Hire's theorem: $P$ lies on the polar of $Q$ precisely when $Q$ lies on the polar of $P$ — so "collinear" and "concurrent" become dual statements and proving one proves the other
- a secant from $P$ meeting the circle at $X,Y$ and the polar at $Q$ forms a harmonic range $(X,Y;P,Q)=-1$, which pins an unknown length with no angle chase and survives projection — harmonic ranges are what let an unknown length be pinned by a cross ratio instead of a computation

## Why it works
Fix a circle of radius $R$ about $O$. The polar of $P$ is the line of points $Q$ with $\vec{OP} \cdot \vec{OQ} = R^2$; for $P$ outside, that line is exactly the chord of contact through the two tangency points. The defining relation is symmetric in $P$ and $Q$ — La Hire's theorem: $P \in \operatorname{polar}(Q) \iff Q \in \operatorname{polar}(P)$. Because polarity swaps points with lines while preserving incidence, "collinear" and "concurrent" become dual statements, so proving one proves the other.

## How to use it
The trigger is tangents and secants from a common external point. Then: (1) the chord of contact is a polar you can name; (2) to show three points collinear, show each lies on the polar of one common point (La Hire); (3) a secant from $P$ meeting the circle at $X, Y$ and the polar at $Q$ is a harmonic range $(X, Y; P, Q) = -1$, i.e. $\frac{XP}{YP} = \frac{XQ}{YQ}$, pinning an unknown length with no angle chase. Harmonic ranges stay harmonic under projection, so the relation transports across the whole figure.

## On contests
Olympiad geometry, where a tangents-and-secants configuration that looks like a trig marathon collapses to two lines of projective bookkeeping. Rarely needed below the olympiad level, but decisive when the figure is built from poles, polars, and harmonic conjugates. Pairs naturally with the radical-axis and power-of-a-point ideas.`,

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
Proofs that a point defined by an intersection lies on a given circle or line, that three lines are concurrent, or that three points are collinear, when the honest computation of the point would be long. The sign is a claim that the point satisfies one condition more than its construction needs.

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

"triangle-center-angles": String.raw`## Why it works
Each formula is a short angle chase from that center's defining property. Circumcenter: the inscribed-angle theorem says the arc $BC$ subtends $\angle A$ at the circumference and twice that, $2A$, at the center $O$. Incenter: in $\triangle BIC$ the angles at $B$ and $C$ are the halves $\frac{B}{2}, \frac{C}{2}$, so $\angle BIC = 180^\circ - \frac{B+C}{2} = 180^\circ - \frac{180^\circ - A}{2} = 90^\circ + \frac{A}{2}$. Orthocenter: $\angle BHC$ is the supplement of $\angle A$ because the two altitude feet make $BHC A$ concyclic-adjacent, giving $180^\circ - A$.

## How to use it
Reach for these whenever a problem places $O$, $I$, or $H$ and asks about an angle — they collapse a configuration to arithmetic in the vertex angles. The [[incenter-excenter-lemma|incenter]] one, $\angle BIC = 90^\circ + \frac{A}{2}$, is the most used: it pins the incenter's position and pairs perfectly with the Incenter–Excenter Lemma. The excenter opposite $A$ satisfies the companion $\angle BI_AC = 90^\circ - \frac{A}{2}$. Sign-check with an equilateral triangle ($A = 60^\circ$): $\angle BOC = 120^\circ$, $\angle BIC = 120^\circ$, $\angle BHC = 120^\circ$ — all equal, as symmetry demands.

## On contests
Staples of AMC/AIME configuration problems and a routine first step in olympiad angle chases. Memorize the incenter formula cold; derive the other two on the spot from the inscribed-angle theorem and the altitude-supplement fact if you blank.`

});

Object.assign(window.MATH_DETAILS, {

"apollonius-circle": String.raw`## Why it works
Fix $k = PA/PB$ and put $A, B$ on the $x$-axis. The equation $PA^2 = k^2 PB^2$ is quadratic in $x, y$ with equal $x^2, y^2$ coefficients and no cross term — a circle. Its two intersections with line $AB$ are the points dividing $AB$ in ratio $k$ internally and externally, so those are diametrically opposite, which fixes the center (on $AB$) and radius. At $k = 1$ the squared terms cancel and the locus degenerates to the perpendicular bisector.

## How to use it
Whenever a constraint reads $PA = k \cdot PB$, the point lives on a known circle: locate the internal and external division points of $AB$ in ratio $k$ and use them as a diameter. In a triangle, the three Apollonius circles (one per vertex pair, using the opposite side ratios) pass through the two isodynamic points, and each contains the feet of the internal and external bisectors from that vertex — the link to [[symmedian-lemoine|symmedians]] and isogonal conjugates.

## On contests
AIME locus and "ratio of distances" problems, and olympiad configurations with isogonal conjugates, symmedians, and isodynamic points. Keep it distinct from Apollonius's Theorem (the median-length relation) — same name, unrelated result.`,

"pappus-centroid": String.raw`## Why it works
Slice the revolving region into thin strips parallel to the axis. A strip of area $dA$ at distance $\rho$ sweeps a ring of volume $2\pi\rho\,dA$, so $V = 2\pi\int \rho\,dA = 2\pi\bar\rho A$, where $\bar\rho = \frac{\int \rho\,dA}{A}$ is precisely the centroid's distance $d$ from the axis. The identical argument on a curve of length $L$ gives the surface $S = 2\pi d\,L$. Once you know the centroid, no integration remains.

## How to use it
Turn any solid or surface of revolution into a centroid lookup. For symmetric regions the centroid is free — a disk's is its center — giving the torus formulas $V = 2\pi^2 R r^2$ and $S = 4\pi^2 R r$ in one line. For composite regions, find the centroid as the area-weighted average of the parts. It also runs backward: a measured volume of revolution pins an unknown centroid distance.

## On contests
Torus and solid-of-revolution problems on the AIME and beyond. It replaces a revolution integral with a single centroid, the fast path precisely when a cross-section is spun about an external axis. Pairs with [[cavalieris-principle|Cavalieri's Principle]] for volume comparisons.`

});

Object.assign(window.MATH_DETAILS, {

"projection-formula": String.raw`## Why it works
Drop the altitude from $A$ to $BC$ at foot $H$. In the two right triangles, $BH = c\cos B$ and $HC = b\cos C$, and $a = BH + HC$. The other two identities are the same construction from $B$ and $C$.

## How to use it
It's the fastest linear relation between a side and its two adjacent base angles — no squaring. Adding the three, or eliminating cosines between them, reproduces the Law of Cosines, so reach for projection when you want the cosines to appear linearly rather than quadratically.

The same accounting works on a path rather than a triangle: project every segment of a polyline onto one direction and the projections add to the net displacement in that direction. When every segment happens to make the same angle $\\theta$ with that direction, the sum collapses to (total path length)$\\cdot\\cos\\theta$, so a zigzag with a known total length and a known net displacement gives up its angle immediately.

## On contests
A cheap AMC 12 / AIME identity, handy inside trig-bash and whenever an altitude foot splits a side. Underused because it looks too elementary to matter.`,

"triangle-half-angle-identities": String.raw`## Key forms
- $r = (s-a)\tan\frac{A}{2}$ — the tangent length from $A$ times the half-angle tangent; the fastest bridge between an angle and the inradius
- $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$ — inradius straight from the angles and the circumradius, with no side lengths
- $\sin\frac A2 = \sqrt{\dfrac{(s-b)(s-c)}{bc}}$, $\cos\frac A2 = \sqrt{\dfrac{s(s-a)}{bc}}$ — half-angles from the sides alone, which is the Law of Cosines put through the half-angle formula
- $\cos A + \cos B + \cos C = 1 + \dfrac{r}{R}$ — turns a cosine sum into the $r/R$ ratio, and is the usual route into Euler's inequality $R \ge 2r$

## Why it works
All follow from $a = 2R\sin A$ and the incircle tangent-length picture. Area $= \frac{abc}{4R} = 2R^2\sin A\sin B\sin C$; combining $r = (s-a)\tan\frac A2$ with the half-angle formulas gives $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$; and $\sin\frac A2 = \sqrt{(s-b)(s-c)/bc}$ is the half-angle formula applied to $\cos A = \frac{b^2+c^2-a^2}{2bc}$.

## How to use it
These convert freely between a triangle's sides and its $(R, r, \text{angles})$ data — given $R$ and $r$, or the angles, they hand you area, exradii, and side ratios. The two to memorize are $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$ and $\cos A + \cos B + \cos C = 1 + \frac rR$.

## On contests
AIME triangle problems that give you $R$ and $r$, and olympiad identities. Pair them with the incircle/excircle tangent lengths and the Law of Sines.`,

"mollweides-formula": String.raw`## Why it works
From $a = 2R\sin A$ etc., $\frac{a+b}{c} = \frac{\sin A + \sin B}{\sin C}$; sum-to-product on top and $\sin C = 2\sin\frac C2\cos\frac C2$ with $A + B = \pi - C$ collapse it to $\frac{\cos\frac{A-B}{2}}{\sin\frac C2}$. The $a-b$ version is the companion.

## How to use it
Because each formula uses all three sides and all three angles, they are the standard check on a solved triangle — plug in and both sides must agree, catching any arithmetic slip. Dividing the two Mollweide relations gives the Law of Tangents.

## On contests
Olympiad-tier, mainly a consistency check or a bridge to the Law of Tangents. Good to recognize; seldom the quickest route.`,

"morleys-theorem": String.raw`## Why it works
Intersecting adjacent angle trisectors yields three points; a trigonometric computation — cleanest run backward, starting from an equilateral triangle and reconstructing the original angles — shows they are mutually equidistant. The Morley triangle has side $8R\sin\frac A3\sin\frac B3\sin\frac C3$.

## How to use it
Treat it as a result to recognize, not a computational tool — angle trisection makes it nearly useless for solving. If a configuration literally builds adjacent-trisector intersections, the equilateral conclusion (and the side formula) is the payoff.

## On contests
Famous and beautiful, but essentially never the intended method — a curiosity kept for completeness. Reach for ordinary angle-chasing or trig instead.`,

"gergonne-nagel-points": String.raw`## Why it works
Both are Ceva concurrences. Gergonne: incircle tangent lengths give equal pairs, so the Ceva product for the cevians to the touch points is $1$. Nagel: the $A$-excircle touches $BC$ with $BX' = s-c$, $CX' = s-b$; Ceva again gives concurrence, and the Nagel point $N$, centroid $G$, and [[incenter-excenter-lemma|incenter]] $I$ are collinear with $NG = 2\,GI$ (the Nagel line).

## How to use it
Recognize "cevians to the incircle/excircle contact points" and invoke concurrence instead of re-deriving it. The Nagel line $I$–$G$–$N$ mirrors the [[euler-line-ratio|Euler line]], and the Nagel point is the [[isotomic-conjugate|isotomic conjugate]] of the Gergonne point.

## On contests
Olympiad triangle geometry and the occasional AIME contact-point setup. Companions to the Lemoine, Fermat, and Brocard points — know they exist and concur.`,

"newtons-line": String.raw`## Why it works
In a complete quadrilateral the midpoints of the three diagonals are collinear — an affine fact provable by vectors. For a tangential quadrilateral, equal tangent lengths balance the areas so that the incenter also lands on the line through the two diagonal midpoints (Newton's line).

## How to use it
When a quadrilateral problem features the midpoints of the diagonals, expect the Newton–Gauss collinearity; if the quadrilateral has an inscribed circle, add the incenter to that line. It proves specific three-point collinearities without coordinates.

## On contests
Olympiad quadrilateral configurations — a niche collinearity worth having in the toolbox.`,

"convex-position": String.raw`## Why it works
The Happy Ending theorem is a Ramsey/pigeonhole argument on quadruples. Its base case — any $5$ points in general position contain $4$ in convex position — is a short convex-hull case check: a hull of $5$ or $4$ points gives a convex quadrilateral outright, and a triangular hull with two interior points yields one via the line through the interior pair.

## How to use it
When a problem guarantees "some $k$ points form a convex polygon," compare the count against $\mathrm{ES}(k)$. Organize by the convex hull — extreme points are the polygon's candidates, interior points the leftovers.

## On contests
Olympiad combinatorial geometry. Know $\mathrm{ES}(4) = 5$, $\mathrm{ES}(5) = 9$, and the extremal/hull flavor of the arguments.`,

"sylvester-gallai": String.raw`## Why it works
Among all (point, connecting-line) pairs with positive distance, take the closest. If that line held a third point, two of the three would fall on the same side of the perpendicular foot, giving a strictly closer point–line pair — a contradiction. So the minimal-distance line is ordinary (exactly two points).

## How to use it
It guarantees an "ordinary line" whenever the points aren't all collinear — handy to seed inductions (delete two points on an ordinary line) or to force collinearity structure. Often the technique (minimize a distance) matters more than citing the theorem.

## On contests
Olympiad combinatorial geometry; the minimal-distance extremal argument is a model to imitate. A classic to recognize.`,

"hellys-theorem": String.raw`## Why it works
Induct using Radon's theorem: any $d+2$ points in $\mathbb{R}^d$ partition into two sets whose convex hulls intersect, which lets you merge the "every $d+1$ meet" hypotheses upward until all sets share a point. In the plane $d + 1 = 3$.

## How to use it
To prove a family of convex regions has a common point, check only that every three do — Helly promotes it to all. It is the tool for "one point/line stabs everything" and dual piercing problems. Convexity is essential; without it the conclusion fails.

## On contests
Olympiad combinatorial geometry. Remember the plane version ("every 3 ⟹ all") and that it requires convex sets.`,

"minkowski-lattice": String.raw`## Why it works
Shrink the region by $\frac12$: if the original area exceeds $4$, the half-region has area $> 1$, so its integer translates overlap (pigeonhole on the unit torus). Two overlapping translates differ by a nonzero lattice vector, and central symmetry plus convexity place that vector's endpoint inside the original region.

## How to use it
To force a nonzero lattice point — hence a small integer solution — enclose your constraint in a centrally symmetric convex region of area $> 4$ (volume $> 2^d$ in higher dimensions). It proves [[sum-of-two-squares|Fermat's Two-Square Theorem]] via a suitable ellipse and underlies Dirichlet-style approximation bounds.

## On contests
Olympiad "geometry of numbers." Niche, but the standard move when you must produce a lattice point inside a symmetric convex shape.`

});

// Detail bodies added for important medium+ theorems that had only a short description.
Object.assign(window.MATH_DETAILS, {

"median-to-hypotenuse": String.raw`
## Why it works
The right angle sees the hypotenuse as a diameter of the circle through the three vertices, by [[thales-theorem|Thales' Theorem]], so the midpoint of the hypotenuse is that circle's center and is one radius from every vertex: $$MA = MB = MC = \frac c2.$$

The converse holds too: a median equal to half its side forces a right angle, which is the forward direction of Thales' Theorem read from the midpoint.

## How to use it
The moment a right angle appears, its vertex sits on a circle whose diameter is the opposite side, so the median to the hypotenuse, the distance from the right-angle vertex to the hypotenuse's midpoint, and the circumradius are all $\frac c2$. Legs $6$ and $8$ give a hypotenuse of $10$ and a median of $5$.

Read backwards, it detects right angles: a point whose distance to the midpoint of a segment equals half the segment sees that segment at $90^\circ$. It also combines with the [[perpendicular-bisector-locus|perpendicular bisector]], since the circumcenter lies on the perpendicular bisector of each leg.

## On contests
Four problems here, three of them AIME, one solved by it alone and each of the others with a different partner. It is often the hidden step that turns a messy right-triangle configuration into a clean circle: look for it when a problem gives a right angle and asks for a distance to a midpoint.
`,

"same-base-area-ratio": String.raw`
## Why it works
Area is half the base times the height, so two triangles on the same base compare exactly as their heights do.

The heights of $A$ and $C$ above the line $BD$ are legs of two right triangles that share the angle at $P$, formed by the diagonal $AC$ and the feet of the perpendiculars. Those right triangles are similar, so the heights are in the ratio of their hypotenuses, $AP : PC$. The figure at the top shows the two heights.

## How to use it
Whenever one segment cuts another, a cevian, a diagonal, or two crossing chords, read the division ratio as a ratio of areas of triangles sharing a base, and back. If the diagonals of $ABCD$ meet at $P$ with $AP = 3$ and $PC = 5$, and $[ABD] = 12$, then $[CBD] = 12 \cdot \frac53 = 20$, and the quadrilateral's area is $32$.

Chaining several such ratios around a figure is the area method, and assigning masses so the ratios balance is [[mass-points|mass points]]. Both replace similar-triangle bookkeeping with one-line comparisons.

## On contests
Five problems here, three of them AIME, none by it alone, and each with a different partner, which is typical of a step that sits inside other arguments. It is the quiet engine inside [[rouths-theorem|Routh's Theorem]], [[cevas-theorem|Ceva's Theorem]], and mass-point solutions, and when a figure is full of triangles sharing bases it usually beats coordinates.
`,

"angle-bisector-circumcircle": String.raw`
## Distinguishing clues
An angle bisector does more than split the opposite side: it is extended to the circumcircle, or the arc midpoint of $BC$ appears, or the incenter and circumcircle appear together. A bisector used only for the ratio $\frac{BD}{DC}$ belongs to the Angle Bisector Theorem, and one used as a mirror belongs to [[perp-to-angle-bisector|the perpendicular to an angle bisector]].

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

"isogonal-conjugate": String.raw`## Why it works
Reflecting each [[cevas-theorem|cevian]] over its angle bisector is an involution on the directions through a vertex, and the trigonometric form of Ceva is symmetric under swapping each angle's two parts. So if $AP, BP, CP$ concur, the three reflected cevians satisfy the very same concurrency condition and meet at one point $P^*$. The shared pedal circle follows because the reflections send the six perpendicular feet onto a common circle centered at the midpoint of $PP^*$.

## How to use it
Recognize a pair rather than compute it: if a point is built by reflecting cevians over bisectors, its conjugate is often a familiar center. Swap a hard point for an easy one using $O \leftrightarrow H$, $G \leftrightarrow K$ ([[lemoine-point|symmedian point]]), incenter self-conjugate, and Fermat $\leftrightarrow$ isodynamic. The common pedal circle turns "these six feet are concyclic" into a one-word reason.

## On contests
Olympiad geometry, where naming an isogonal pair collapses a concurrency or collinearity to a known center. The symmedian — the isogonal of the median — is the most frequent special case at AIME level.`,

"pedal-triangle": String.raw`## Why it works
Writing each vertex of the pedal triangle as the projection of $P$ onto a side and expanding gives the area factor $\dfrac{|R^2 - OP^2|}{4R^2}$ directly. When $OP = R$ the factor is $0$: the three feet fall on a line — exactly the Simson line — so Simson is just the pedal triangle degenerating.

## How to use it
Read the position of $P$ off the one area formula. $P$ on the circumcircle ($OP = R$) gives the degenerate Simson line; $P = O$ gives the medial triangle (quarter area); $P = I$ gives the contact triangle; $P = H$ gives the [[orthic-triangle|orthic triangle]]. When a problem drops perpendiculars to all three sides, find $OP$ and let the formula deliver the area.

## On contests
Simson-line problems and "area of the triangle formed by the three feet" questions on AIME/olympiad reduce to this single formula. Spotting that a configuration is a pedal triangle in disguise often replaces a page of coordinates with one substitution.`,

"orthic-triangle": String.raw`## Why it works
Each altitude foot sees the opposite side at a right angle, so pairs of feet are concyclic with the vertices; a short angle chase then yields the orthic angles $\pi - 2A$ and shows each orthic side is antiparallel to the matching side of $ABC$. The perimeter identity is $a\cos A = R\sin 2A$ summed with $\sin 2A + \sin 2B + \sin 2C = 4\sin A\sin B\sin C$, and the area factor $2\cos A\cos B\cos C$ comes from removing the three corner triangles.

## How to use it
Treat $H$ as the [[incenter-excenter-lemma|incenter]] of the orthic triangle: the altitudes of $ABC$ are its angle bisectors, which explains the reflect-$H$ facts and the Fagnano minimal-perimeter property. Use the perimeter $= \dfrac{2[ABC]}{R} = 4R\sin A\sin B\sin C$ and area $= 2\cos A\cos B\cos C\,[ABC]$ directly (the perimeter form is just $[ABC] = 2R^2\sin A\sin B\sin C$ rearranged; see [[trig-area|the trig-area formula]]), and recall the orthic triangle is inscribed in the [[nine-point-circle|nine-point circle]] (radius $\tfrac R2$). Turned inside out, the same configuration is the [[excentral-triangle|excentral triangle]]: $ABC$ is the orthic triangle of its own excentres. It is inscribed in the nine-point circle of radius $\frac R2$, each of its sides is antiparallel to the matching side of $ABC$, and it is the least-perimeter inscribed triangle, which is Fagnano's problem.

## On contests
The least-perimeter inscribed triangle (Fagnano) and the reflect-$H$-onto-the-circumcircle facts are the recurring AIME/olympiad uses. For an obtuse triangle, note that $H$ becomes an excenter of the orthic triangle instead — a frequent trap.`,

"medial-triangle": String.raw`## Why it works
The midpoints halve every side, so each of the four small triangles is similar to $ABC$ with ratio $\tfrac12$ (SAS on the midsegments) — hence quarter area and half perimeter apiece. The medial triangle is the image of $ABC$ under the homothety centered at the centroid $G$ with ratio $-\tfrac12$, which is why $G$ is shared and the orientation flips.

## How to use it
Pass to the medial triangle to shrink a problem by a fixed factor, or read off incoming structure: its circumcircle is the nine-point circle, its [[incenter-excenter-lemma|incenter]] is the [[spieker-point|Spieker point]], and the homothety $(G, -\tfrac12)$ sends centers of $ABC$ to centers of the medial triangle. The four-congruent-triangles picture also proves midsegment and area-quartering claims at a glance.

## On contests
"Connect the midpoints" configurations on AMC/AIME resolve through the quarter-area and homothety facts, and the nine-point-circle link is the bridge into Euler-line problems.`,

"triangle-13-14-15": String.raw`## Key forms
- $s = 21$ and $[ABC] = \sqrt{21 \cdot 8 \cdot 7 \cdot 6} = 84$, the smallest scalene triangle after $3$-$4$-$5$ with whole-number sides and a whole-number area
- the altitude to the side $14$ is $12$ and splits it into $5 + 9$, so the triangle is a $5$-$12$-$13$ and a $9$-$12$-$15$ right triangle glued along that altitude
- $r = \frac{A}{s} = 4$ and $R = \frac{abc}{4A} = \frac{65}{8}$; the exradii are $\frac{21}{2}$, $12$, $14$ opposite the sides $13$, $14$, $15$
- the cosines of the angles opposite $13$ and $15$ are $\frac{3}{5}$ and $\frac{5}{13}$, so both are angles you already know from the small Pythagorean triples

## Why it works
Everything follows from one accident: the foot of the altitude to the side of length $14$ lands at a lattice point. Placing that side from $(0,0)$ to $(14,0)$ and solving $x^2 + y^2 = 13^2$ against $(x-14)^2 + y^2 = 15^2$ gives $x = 5$, $y = 12$ — the two equations differ by a linear one, and here it happens to resolve to integers.

So the apex sits at $(5,12)$ and the triangle is literally two Pythagorean triples sharing a leg. [[herons-formula|Heron]] then has nothing left to do: $s - a$, $s - b$, $s - c$ are $8$, $7$, $6$, and $21 \cdot 8 \cdot 7 \cdot 6 = 7056 = 84^2$ comes out square. Once the area is rational every derived length is too, because $r$, $R$, the altitudes, and the exradii are all ratios built from the sides and the area — $r = \frac{A}{s}$, $R = \frac{abc}{4A}$, $h_a = \frac{2A}{a}$, $r_a = \frac{A}{s-a}$.

The clean cosines are the same fact read through the [[law-of-cosines|Law of Cosines]]: $\cos = \frac{3}{5}$ opposite $13$ and $\frac{5}{13}$ opposite $15$ are exactly the angles of the two right triangles the altitude created. Checking $R$ against [[law-of-sines|the Law of Sines]] confirms it, $\frac{13}{2 \sin A} = \frac{13}{2 \cdot 4/5} = \frac{65}{8}$.

## How to use it
Recognize the triple and stop computing. If a problem hands you $13$, $14$, $15$ it is telling you the area is $84$, and usually it wants $r = 4$ or $R = \frac{65}{8}$ next. Dropping the altitude to the $14$ side converts any question about the interior into two right triangles with known legs, which is almost always faster than coordinates.

Watch for the triple in disguise: a similar copy scaled by $k$ has area $84k^2$, and problems sometimes give two sides and the area, expecting you to recover the third from $84$.

## On contests
This is the default scalene triangle for a problem that needs integer answers, and it appears far more often than chance would explain — on AMC and AIME alike, and especially in questions about the incircle or circumcircle of a triangle given by its three sides. It is the second member of the consecutive-integer family $3$-$4$-$5$, $13$-$14$-$15$, $51$-$52$-$53$, $193$-$194$-$195$, whose middle sides satisfy $x_{n+1} = 4x_n - x_{n-1}$; the areas run $6$, $84$, $1170$, $16296$. Only the first two are small enough to be worth memorizing.`,


});

// Detail bodies added for dense medium-importance cards.
Object.assign(window.MATH_DETAILS, {

"altitude-bisector-angle": String.raw`## Why it works
Measure directions from $A$. The altitude to $BC$ makes angle $90^\circ - B$ with side $AB$; the circumradius $AO$ makes angle $90^\circ - B$ with the OTHER side $AC$ (from the inscribed-angle relation $\angle AOC$ gives $\angle OAC = 90^\circ - B$), so the altitude and $AO$ are mirror images in the $A$-bisector — that is exactly "isogonal." Since the bisector sits at $\tfrac A2 = 90^\circ - \tfrac{B+C}{2}$ from $AB$, its gap to the altitude is $(90^\circ - B) - \left(90^\circ - \tfrac{B+C}{2}\right) = \tfrac{C-B}{2}$.

## How to use it
Use the bisector as an axis of symmetry: the altitude and $AO$ each lie $\tfrac{|B-C|}{2}$ off it, so any one of the three directions gives the other two. This is also the clean reason the orthocenter and circumcenter are isogonal conjugates — reflecting all three altitudes over the corresponding bisectors carries $H$ to $O$.

## On contests
Handy on AIME/olympiad configurations that involve both an altitude and the circumcenter, or that ask directly for the angle between an altitude and a bisector: the value $\tfrac{|B-C|}{2}$ drops out immediately, and the isogonal framing unlocks $O \leftrightarrow H$ arguments.`,

"incenter-area-split": String.raw`## Why it works
The incircle is tangent to all three sides, so the incenter is a distance $r$ from each — and that $r$ is the height of each sub-triangle onto the side it rests on. Hence $[BIC] = \tfrac12 a r$, $[CIA] = \tfrac12 b r$, $[AIB] = \tfrac12 c r$, proportional to $a,b,c$. Adding gives $[ABC] = \tfrac12(a+b+c)r = rs$, the standard area formula, and dividing gives $[BIC] = \frac{a}{a+b+c}[ABC]$.

## How to use it
Read a side-length ratio straight off as an area ratio, or the reverse. Because the three areas are the natural weights, they are exactly the incenter's barycentric coordinates $(a:b:c)$, so $I = \frac{aA+bB+cC}{a+b+c}$ — the quickest way to drop the incenter into a coordinate or vector bash. The same "join the point to the vertices" split works for any interior point, with the three sub-areas as its barycentric weights.

## On contests
AMC/AIME problems asking what fraction of the area a sub-triangle occupies, or needing incenter coordinates, use this directly; it is also the one-line derivation of $[ABC] = rs$ whenever you need $r$.`,

"orthocentric-system": String.raw`## Why it works
The defining relations are symmetric: $AH \perp BC$ also says $A$ lies on the altitude of $\triangle HBC$ from $A$, and running that around all sides shows each of the four points is the orthocenter of the triangle on the other three. Reflecting $H$ over side $BC$ lands on $\odot(ABC)$, so $\odot(HBC)$ is the mirror image of $\odot(ABC)$ across $BC$ — same radius $R$. And all four triangles share one nine-point circle: the midpoints of the six segments joining pairs of $\{A,B,C,H\}$, together with the three altitude feet, are the same nine points for every one of the four triangles.

## How to use it
Treat $H$ as a fourth vertex — any fact about a triangle and its circumcircle transfers to the other three triangles for free (reflect $H$ onto the circumcircle, or swap $H$ with a vertex to reuse a lemma). The four circumcenters $O_{ABC}, O_{HBC}, \dots$ form a second orthocentric system congruent to the first, and the common nine-point center is the midpoint of the whole configuration. Each of the four points is the orthocenter of the triangle on the other three, so every orthocenter property applies four times over in one figure.

## On contests
Olympiad configurations built on a triangle and its orthocenter simplify once you spot the symmetry; the shared nine-point circle also ties these to Euler-line and [[feuerbach-theorem|Feuerbach]] problems.`,

"common-chord-length": String.raw`## Why it works
Both endpoints of the common chord lie on each circle, so the segment is a chord of both, and the line of centers is its perpendicular bisector — meeting it at right angles at its midpoint. Writing the half-chord $h$ two ways, $h^2 = R^2 - d_1^2$ from one circle and $h^2 = r^2 - d_2^2$ from the other with $d_1 + d_2 = d$, and subtracting gives $d_1 = \frac{d^2 + R^2 - r^2}{2d}$ — which is just the location of the radical axis.

## How to use it
Compute $d_1$ from the three lengths, then the chord is $2\sqrt{R^2 - d_1^2}$; you never need the intersection points. The same setup gives the distance between the two intersection points of any two circles, and using $d_2 = d - d_1$ gives a free check, since both circles must return the same half-chord. Real intersection requires $|R-r| \lt d \lt R+r$.

## On contests
A recurring AIME computation — "two circles meet; find their common chord" — and the workhorse behind lens/overlap-area problems, where the chord splits the lens into two circular segments.`,

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

"incircle-excircle-touch": String.raw`## Why it works
Equal tangents from a vertex fix the incircle contact distances: the two tangents from $B$ are equal, forcing the touch point on $BC$ to be $s-b$ from $B$. The $A$-excircle (opposite $A$) touches $BC$ with the roles of $b$ and $c$ swapped, at $s-c$ from $B$. Since $(s-b) + (s-c) = a$, those two points average to $\tfrac a2$ — the midpoint $M$ of $BC$ — so they are reflections of each other in $M$, a distance $(s-b) - (s-c) = |b-c|$ apart.

## How to use it
Place both contact points instantly from the side lengths, and use $M$ as their shared midpoint to relate incircle and excircle configurations. The gap $|b-c|$ measures how far from isosceles the triangle is; it is $0$ exactly when $b = c$, where both circles touch $BC$ at its midpoint.

## On contests
Useful whenever a problem mixes the incircle and an excircle on one side, or asks for the distance between contact points; it also pairs with the reflection facts used in mixtilinear-incircle and $A$-excircle lemmas.`,

"integer-triangles-perimeter": String.raw`## Why it works
Count triples ordered by size, $a\le b\le c$, with $a+b+c=n$ and the single binding constraint $a+b\gt c$ — equivalently $c\lt n/2$, since the other two inequalities are automatic once the sides are sorted. Fix the longest side $c$; then $a+b=n-c$ with $a\le b\le c$, a short run of $(a,b)$ to count. Summing the counts over the allowed $c$ gives a quadratic in $n$, and it collapses to the nearest integer to $n^2/48$ for even $n$ (and $(n+3)^2/48$ for odd $n$) — Alcuin's sequence.

## How to use it
For a specific small $n$, skip the closed form and just sweep: let $c$ run from $\lceil n/3\rceil$ up to $\lfloor (n-1)/2\rfloor$ and count valid $(a,b)$ for each. The rounded formula is the quick check on a full count. Variants adjust the same sweep — require distinct sides ($a\lt b\lt c$), a fixed shape (isosceles, right), or a cap on a side — by changing only the inner count.

## On contests
"How many triangles with integer sides and perimeter $n$" is a recurring MATHCOUNTS/AMC question. The fix-the-longest-side sweep is reliable under time pressure, and the round-to-nearest formula lets you confirm the answer in one line.`,

"equal-chords-arcs": String.raw`## Why it works
All three conditions come from the same congruent triangles at the center. A [[chord-length|chord]] of length $\ell$ at distance $d$ from the center $O$ (radius $R$) satisfies $\ell=2\sqrt{R^2-d^2}$, so $\ell$ and $d$ determine each other; equal chords force equal $d$ and conversely. The isosceles triangles formed by $O$ and a chord's endpoints subtend equal central angles when the chords are equal, and equal central angles cut equal arcs — so "equal chords," "equal arcs," and "equal distance from center" are one fact viewed three ways.

## How to use it
The perpendicular from $O$ to a chord bisects the chord (the two right triangles $O$–foot–endpoint are congruent) and bisects its arc too — the standard route to a chord's or arc's midpoint. From $\ell=2\sqrt{R^2-d^2}$, a larger $\ell$ means a smaller $d$: the longer chord sits closer to the center, and the diameter ($d=0$) is longest. Use the same relation to convert a chord length to its distance from the center, or back, in one step.

## On contests
These appear in "two equal chords" configurations, in midpoint/bisection constructions, and any time you must turn a chord length into its distance from the center (or the reverse) — the $\ell=2\sqrt{R^2-d^2}$ bridge is the workhorse.`

});

Object.assign(window.MATH_DETAILS, {

"regular-dodecagon": String.raw`## Why it works
Build it outward from a regular hexagon of side $s$ (itself six equilateral triangles from its center). Erect a square on each of the hexagon's six edges; at each hexagon vertex the $120^\circ$ interior angle plus the two adjacent squares' $90^\circ$ corners leave a $60^\circ$ gap that one more equilateral triangle fills exactly. The outer boundary is now 12 equal edges meeting at equal $150^\circ$ angles — a regular dodecagon — assembled from 6 squares and $6+6=12$ equilateral triangles, so $A = 6s^2 + 12\cdot\frac{\sqrt{3}}{4}s^2 = 3(2+\sqrt{3})s^2$.

## How to use it
Two clean handles. Given the side, use $A = 3(2+\sqrt{3})s^2$. Given the circumradius, use $A = 3R^2$ — it comes from $\frac12 nR^2\sin\frac{360^\circ}{n}$ with $n=12$ and rearranges into three $R\times R$ squares, so a dodecagon inscribed in a unit circle has area exactly $3$. The $150^\circ$ interior angle is also the reason the square-and-triangle dissection closes up.

## On contests
Dodecagons appear as "regular 12-gon inscribed in a circle" (area $3R^2$ on sight), in area-dissection problems, and wherever $15^\circ$, $75^\circ$, or $150^\circ$ angles turn up. The 6-square-12-triangle picture is the fast visual proof of the side-length area and a favorite MATHCOUNTS / early-AMC fact.`,

"regular-octahedron": String.raw`## Why it works
The horizontal plane through the four equatorial vertices is a square of side $s$ (its diagonals are a pair of opposite octahedron edges). Above and below it sit two congruent square pyramids; each apex lies over the square's center at height $\frac{s}{\sqrt{2}}$ — half a face diagonal — so $V = 2\cdot\frac13 s^2\cdot\frac{s}{\sqrt{2}} = \frac{s^3\sqrt{2}}{3}$. All eight faces are equilateral, giving $SA = 8\cdot\frac{\sqrt{3}}{4}s^2 = 2\sqrt{3}\,s^2$.

## How to use it
Cut the octahedron into its two pyramids and every length, the volume, and both radii fall out of one square and one right triangle. Duality with the cube is the other lever: put the six vertices at $(\pm a,0,0), (0,\pm a,0), (0,0,\pm a)$ (edge $s = a\sqrt{2}$) and coordinate-bash. Inscribing an octahedron in a cube (vertices at the cube's face centers), or a cube in an octahedron, are both one-line consequences.

## On contests
A recurring AMC/AIME solid: the equatorial-square and face-parallel hexagonal cross-sections, volume ratios against an inscribing or inscribed cube or tetrahedron, and "paint or slice the octahedron" problems. Keep two facts ready — $V_{\text{oct}} = 4V_{\text{tet}}$ at equal edge, and that the cube and octahedron are duals so their vertex and face counts swap ($6 \leftrightarrow 8$).`

});

Object.assign(window.MATH_DETAILS, {

"perp-to-angle-bisector": String.raw`
## When to use
A perpendicular from $B$ to the bisector of angle $A$; a bisector together with a sum or difference of sides, such as $AB + BD = AC$; two angle bisectors meeting at a point with distances to compare; and trapezoids or parallelograms where the bisectors of two adjacent angles meet. The sign is a bisector that has no use as a ratio, but would be useful as a mirror.

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

"isotomic-conjugate": String.raw`## Why it works
Reflecting each [[cevas-theorem|cevian]] foot over its side's midpoint is an involution on that side, so by the isotomic form of Ceva's Theorem the reflected cevians concur exactly when the originals do — defining the conjugate $P^*$. In normalized barycentrics it is just $(x:y:z) \mapsto (1/x : 1/y : 1/z)$.

## How to use it
Use the pairing to transfer results for free: the centroid is self-conjugate, and the Gergonne and Nagel points are an isotomic pair, so a fact about one hands you the other. Compute with [[barycentric-coordinates|barycentric]] reciprocals, and pair it with isogonal conjugation when a problem mixes "reflect over the midpoint" and "reflect over the bisector."

## On contests
An advanced/olympiad triangle-center tool; recognizing an isotomic pair often collapses a two-point problem into one, and the reciprocal barycentric form makes it a clean bash.`,

"contact-triangle": String.raw`## Why it works
Equal tangents from each vertex cut the sides into the classic lengths $s-a,\ s-b,\ s-c$, and the three tangency points lie on the incircle — so the incircle is the contact triangle's circumcircle (radius $r$). Each contact-triangle angle is $\frac{\pi}{2}-\frac{A}{2}$, the inscribed angle on the arc between two tangency points, and the Law of Sines in that circle then gives its sides as $2r\cos\frac A2$, $2r\cos\frac B2$, $2r\cos\frac C2$.

## How to use it
Reach for $s-a,\ s-b,\ s-c$ whenever the incircle touches the sides — they linearize almost every incircle-length computation. The cevians to the contact points concur at the Gergonne point, and the area ratio $\frac{r}{2R}$ converts between the contact triangle and $ABC$.

## On contests
Standard at AIME and olympiad level for incircle-tangency lengths and Gergonne-point configurations; the $s-a$ substitution is one of the most reused moves in all of triangle geometry.`,

"excentral-triangle": String.raw`## Why it works
Internal and external bisectors are perpendicular, so the [[incenter-excenter-lemma|incenter]] $I$ is the orthocenter of $I_AI_BI_C$ and $ABC$ is exactly its orthic (altitude-feet) triangle. That perpendicularity also yields the angles $\frac{\pi}{2}-\frac{A}{2}$, the sides $4R\cos\frac{A}{2}$ (so $I_AI_B=4R\cos\frac C2$), and circumradius $2R$. Its area follows as $2Rs=\frac{abc}{2r}=8R^2\cos\frac A2\cos\frac B2\cos\frac C2$.

## How to use it
Flip the usual orthic relationship: treat $ABC$ as the orthic triangle of the excenters to import the full orthocentric toolkit (reflections, the nine-point circle). In particular the circumcircle of $ABC$ is the nine-point circle of the excentral triangle, tying the two figures together. Equivalently $ABC$ is the orthic triangle of this one, so every orthic-triangle fact transfers by renaming.

## On contests
An olympiad configuration for excenter and bisector problems; spotting "$ABC$ is the orthic triangle of its excenters" unlocks every orthocenter fact you already know.`,

"reims-theorem": String.raw`## Why it works
Two circles meet at $P,Q$; a line through $P$ hits them at $A,C$ and a line through $Q$ hits them at $B,D$. Inscribed angles on the shared chords give $\angle BAP = \angle BQP$ and $\angle DCP = \angle DQP$; since $A,P,C$ and $B,Q,D$ are each collinear, those are corresponding angles for $AB$ and $CD$ cut by transversal $AC$, forcing $AB \parallel CD$. Reversing the chase gives the converse.

## How to use it
Treat it as the bridge between "parallel" and "concyclic": when two circles cross and lines through the intersection points cut them, parallel chords and four concyclic points are interchangeable. It pairs naturally with spiral-similarity and radical-axis arguments.

## On contests
A workhorse olympiad angle-chasing lemma; whenever two circles meet at two points, Reim's is the first thing to try for a parallelism or a hidden cyclic quadrilateral.`,

"mixtilinear-incircle": String.raw`## Why it works
The homothety at the tangency point $T$ that carries the mixtilinear incircle to the circumcircle sends its two side-contact points to arc midpoints — which is why $T$, the incenter $I$, and the midpoint of arc $BAC$ are collinear, and why $I$ is the midpoint of the chord the circle cuts on $AB$ and $AC$.

## How to use it
Trigger on "circle tangent to two sides and internally to the circumcircle." The collinearity through $I$ and the arc midpoint pins $T$, and the incenter-as-chord-midpoint fact converts the tangencies into lengths; homothety at $T$ links the incircle and circumcircle.

## On contests
A recurring olympiad configuration (and a few hard prep/AIME problems); the tangency point $T$ and its collinearities are the usual keys to unlocking it.`,

"descartes-sphere-theorem": String.raw`## Why it works
It is the $n=3$ case of the Soddy–Gosset relation $\left(\sum k_i\right)^2 = n\sum k_i^2$: in $n$ dimensions, $n+2$ mutually tangent spheres have curvatures obeying that quadratic. The Descartes Circle Theorem is the $n=2$ instance of the very same identity.

## How to use it
With four mutually tangent spheres known, solve the quadratic for the fifth; its two roots are the small sphere filling the central gap and the large sphere enclosing the rest (negative curvature). A flat plane counts as curvature $0$ and an enclosing sphere as negative, exactly as in 2D.

## On contests
Rare and AIME-hard to olympiad; it shows up in "sphere in the gap of four mutually tangent spheres" problems, structurally identical to the 2D Descartes circle setups.`,

"brianchon-theorem": String.raw`## Why it works
It is the projective dual of Pascal's Theorem: swap "point on the conic" for "tangent line" and "collinear" for "concurrent," and Pascal's collinearity becomes Brianchon's concurrency. Any proof of Pascal dualizes into a proof of Brianchon.

## How to use it
Apply it to a hexagon whose six sides are all tangent to one conic (often an incircle or inscribed circle) to force the three main diagonals to concur. Merging adjacent tangency points degenerates it to tangential pentagons and quadrilaterals — that is where the Gergonne point of a tangential triangle comes from. It is the projective dual of Pascal's Theorem: dualising the inscribed hexagon and its collinear intersections gives the circumscribed hexagon and its concurrent diagonals.

## On contests
An olympiad tool for tangential-polygon concurrency; "everything is tangent to one circle" is the cue to reach for Brianchon instead of grinding [[cevas-theorem|Ceva]].`,

"desargues-theorem": String.raw`## Why it works
Lift to space: two triangles perspective from a point lie in two planes meeting in a line, and each pair of corresponding sides meets on that line — the axis of perspectivity. Projecting the spatial picture back to the plane proves the theorem, and the statement is self-dual, so the converse is automatic.

## How to use it
Trade a concurrency for a collinearity and back: if $AA', BB', CC'$ concur, then $AB\cap A'B'$, $BC\cap B'C'$, $CA\cap C'A'$ are collinear, and conversely. It is the standard route to proving three points collinear once you have three concurrent lines.

## On contests
Core projective-geometry olympiad material; whenever you are handed a center of perspectivity, Desargues produces the collinear axis (and the converse gets you the center).`,

"cross-ratio": String.raw`## Why it works
Under a projection each of the four signed ratios picks up factors that cancel in the quotient, so $(A,B;C,D)$ is unchanged by every perspectivity — the numerical fingerprint of four collinear points up to projective maps. The same number attaches to four concurrent lines and to four concyclic points seen from a fifth.

## How to use it
Compute the cross-ratio in an easy position (or on a circle), then project into the hard configuration where it must match; equating two cross-ratios solves for an unknown length or proves a coincidence. Watch for the value $-1$, the harmonic case.

## On contests
The backbone of projective olympiad problems and of "moving points" / projective-map methods; one invariance argument often replaces pages of similar-triangle chasing.`,

"harmonic-bundle": String.raw`## Why it works
$(A,B;C,D) = -1$ says $C$ and $D$ divide $AB$ internally and externally in the same ratio $\frac{AC}{CB} = \frac{AD}{DB}$; the minus sign is exactly the record that one division is internal and the other external. It is the most symmetric cross-ratio value, fixed when $C$ and $D$ are swapped.

## How to use it
Harmonic bundles sit at fixed spots: two tangents plus a secant from an external point cut the polar harmonically; the internal and external bisectors from a vertex meet the opposite line at harmonic conjugates; a complete quadrilateral's diagonal is cut harmonically. Recognizing $-1$ lets you invoke pole–polar and projection machinery.

## On contests
Everywhere in olympiad projective configurations, especially pole–polar and Apollonius-circle problems; "show this bundle is harmonic" is a standard intermediate goal.`,

"inversion-properties": String.raw`
## When to use
Chains of circles tangent to two given circles, configurations with several circles through one point, the arbelos and its inscribed circles, and identities that look like Ptolemy's Theorem or Casey's Theorem. The tell is a point where many circles meet or touch; inverting there straightens them into lines.

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

"complete-quadrilateral-miquel": String.raw`## Why it works
Four lines in general position give four triangles (three lines at a time); repeated use of the Miquel-point lemma forces their four circumcircles through one common point $M$. Equivalently $M$ is the center of the [[spiral-similarity|spiral similarity]] carrying one pair of opposite sides onto the other.

## How to use it
When four lines (two pairs of opposite sides plus the diagonals) appear, find $M$ as the second intersection of two of the four circumcircles — it is usually the hidden center that makes a spiral-similarity or concyclicity claim fall out. The three diagonal midpoints are collinear on the associated [[newtons-line|Newton–Gauss line]]. Two further facts make the configuration worth recognizing: the four circumcenters together with $M$ lie on one circle, and this is the four-line cousin of the triangle Miquel theorem, where the points are chosen on the sides of a single triangle instead.

## On contests
A staple olympiad configuration; recognizing a complete quadrilateral and naming its [[miquels-theorem|Miquel]] point is frequently the decisive first step.`,

"ngon-vertex-distance-product": String.raw`## Why it works
Place the vertices at $R\zeta^k$ with $\zeta = e^{2\pi i/n}$ and the point at $P = Re^{i\theta}$. Since $\prod_k (z - \zeta^k) = z^n - 1$, the product of the $n$ distances is $R^n\,|z^n - 1| = 2R^n\left|\sin\frac{n\theta}{2}\right|$.

## How to use it
Read the extremes straight off the sine: the product is $0$ when $P$ is a vertex and reaches its maximum $2R^n$ when $P$ is an arc midpoint (there $\frac{n\theta}{2}$ is an odd multiple of $\frac{\pi}{2}$). Keep it separate from the fixed-vertex product, which is always $nR^{n-1}$.

## On contests
An AIME/olympiad roots-of-unity technique for "product of distances from a point on the circle to all the vertices" problems; turning the geometry into $z^n - 1$ is the whole move.`

});

Object.assign(window.MATH_DETAILS, {

"max-rectangle-in-triangle": String.raw`## Why it works
Slide a rectangle up from the base: at a fraction $t$ of the way to the apex the triangle's width has shrunk to $(1-t)b$, so the rectangle's area is $(t h)\,(1-t)b = bh\,t(1-t)$. That is largest at $t=\tfrac12$, giving $\tfrac{bh}{4}=\tfrac12[\triangle]$.

## How to use it
Spot the "largest rectangle inside a triangle" setup and answer half the area at once; for the actual dimensions, put the top edge on the midline (it spans the midsegment), making the width half the base and the height half the altitude. The same $t(1-t)$ maximization handles a rectangle inscribed under any straight slanted boundary.

## On contests
A recurring optimization one-liner on AMC and early AIME problems — knowing the maximum is exactly half the triangle's area (and where the rectangle sits) skips the calculus entirely.`,

"triangle-sin2-sum-ratio": String.raw`## Why it works
Both halves factor, and almost everything cancels. Using $A+B+C=180^\circ$, the numerator collapses to $4\sin A\sin B\sin C$ and the denominator to $4\cos\frac A2\cos\frac B2\cos\frac C2$. Writing $\sin A = 2\sin\frac A2\cos\frac A2$ in the numerator lets every cosine cancel, leaving $8\sin\frac A2\sin\frac B2\sin\frac C2$. That product is the standard $\frac{r}{4R}$, so the ratio is $8\cdot\frac{r}{4R} = \frac{2r}{R}$.

## How to use it
Reach for it when an expression mixes $\sin 2A$ terms with $\sin A$ terms in the same triangle — the quotient is a constant of the triangle, not something you need to expand. It also runs backwards: knowing the ratio pins down $\frac{r}{R}$, and $\frac{r}{R} \le \frac12$ (equality only for the equilateral triangle) turns it into a bound. The two factorizations are worth knowing separately, since each shows up on its own.

## On contests
Rare as a stated problem, common as the last step of one. If a computation leaves you holding $\frac{\sin 2A+\sin 2B+\sin 2C}{\sin A+\sin B+\sin C}$, stop expanding and substitute $\frac{2r}{R}$. Most appearances are AIME-and-up, usually where the answer is meant to come out in terms of $r$ and $R$.`,

"half-angle-tangent-identity": String.raw`## Why it works
The half-angles sum to $90^\circ$, so $\frac{A+B}{2}$ and $\frac C2$ are complementary: $\tan\frac{A+B}{2} = \cot\frac C2$. Expanding the left side with the tangent addition formula and clearing denominators gives exactly the symmetric relation. Nothing about triangles is used beyond the angle sum, so the identity holds for any three angles summing to $180^\circ$.

## How to use it
Its real value is as a constraint. Substituting $\tan\frac A2 = \frac{r}{s-a}$ turns it into $r^2\left[\frac{1}{(s-a)(s-b)} + \frac{1}{(s-b)(s-c)} + \frac{1}{(s-c)(s-a)}\right] = 1$, i.e. $r^2 s = (s-a)(s-b)(s-c)$ — [[herons-formula|Heron's Formula]] in disguise. So it is a way to eliminate the angles from a problem stated in $r$ and $s$, or to supply the third equation when two half-angle tangents are known.

## On contests
Treat it as the half-angle analogue of $\tan A + \tan B + \tan C = \tan A\tan B\tan C$: a symmetric relation to invoke once you see half-angle tangents appearing together. It turns up in AIME-level triangle problems that mix the incircle with trigonometry, and in olympiad substitutions where $x=\tan\frac A2$ parametrizes the triangle.`,

"line-forms": String.raw`
## Why it works
All four forms say the same thing: the slope between any point $(x, y)$ of the line and one known point is constant.

With a known point $(x_1, y_1)$ and slope $m$, the condition $$\frac{y - y_1}{x - x_1} = m$$ with the denominator cleared is point-slope form. Expanding it gives slope-intercept form, collecting terms gives standard form, and dividing standard form by $C$, when $C \ne 0$, gives intercept form. Vertical lines have no slope, and only standard form can write them, as $x = k$.

In standard form the coefficients carry the geometry. For two points of the line, subtracting their equations gives $A\,\Delta x + B\,\Delta y = 0$, so $(A, B)$ is perpendicular to every direction along the line, and $(B, -A)$ points along it.

{{figure:normal}}

## How to use it
Match the form to what you are handed. Given a slope and a point, write point-slope and stop. Given two points, compute the slope first: through $(2, 5)$ and $(6, 13)$, $m = 2$, so $$y - 5 = 2(x - 2), \qquad y = 2x + 1, \qquad 2x - y = -1.$$ Given intercepts $a$ and $b$, write $\frac xa + \frac yb = 1$ directly; the triangle it cuts off with the axes has area $\frac{|ab|}{2}$.

Standard form with integer, coprime coefficients is the one for number theory, since counting the lattice points on a line becomes a linear Diophantine equation. Its normal vector also feeds the [[point-line-distance|point-to-line distance]] and reflection formulas.

## On contests
Four problems here, mostly AMC, two solved by it alone; two others describe the line in [[complex-basics|complex numbers]]. It is bedrock at MATHCOUNTS and AMC 10, where converting between forms is usually the real skill being tested.
`,

"plane-intercept-form": String.raw`
## Why it works
Each intercept satisfies the equation, and three points that are not on one line determine a plane.

Substituting $(a, 0, 0)$ gives $\frac aa + 0 + 0 = 1$, and the same happens at the other two intercepts. The equation is linear, so it describes a plane, and three non-collinear points fix exactly one plane, so this is the plane through the intercepts, shown in the figure at the top. It is the three-dimensional copy of the intercept form of a line, $\frac xa + \frac yb = 1$.

The form fails only for a plane through the origin or parallel to an axis, since then an intercept is $0$ or does not exist.

## How to use it
When a problem names where a plane crosses the axes, write the intercept form straight down instead of solving for $Ax + By + Cz = D$. Clearing denominators gives $$bc\,x + ca\,y + ab\,z = abc,$$ so the normal vector is $(bc, ca, ab)$, which gives the angle between two planes or the [[point-plane-distance|distance from a point]]. From the origin that distance is $\frac{abc}{\sqrt{a^2b^2 + b^2c^2 + c^2a^2}}$.

Going the other way, a plane $Ax + By + Cz = D$ with $D \ne 0$ has intercepts $\frac DA$, $\frac DB$, and $\frac DC$: divide through by $D$.

The tetrahedron cut from the first octant has three perpendicular edges $a$, $b$, $c$ at the origin, so its volume is $\frac{abc}{6}$, which turns many "a plane slices off a corner" questions into one multiplication.

## On contests
Three problems here, all AIME, none solved by it alone, and all three set up [[coordinate-bash|coordinates]] first. The usual shape asks for the plane through three given points on the edges of a cube or a pyramid and then the cross-section it cuts; a harder one needs the plane through several lifted sphere centers. For the area of a corner's cut face, [[de-guas-theorem|De Gua's Theorem]] pairs with it.`,

"harmonic-quadrilateral": String.raw`## Why it works
Let the tangents at $B$ and $C$ meet at $X$, let $AX$ meet the circumcircle again at $D$, and let $E = AD \cap BC$.

Tangent lengths from a common point are equal, so $XB = XC$. The power of $X$ with respect to the circle is $XB^2$, and the line through $X$, $A$, $D$ gives that same power as $XA \cdot XD$. Hence $XB^2 = XA \cdot XD$, which rearranges to $\frac{XB}{XA} = \frac{XD}{XB}$. Triangles $XBA$ and $XDB$ share the angle at $X$ and have their two adjacent sides in that proportion, so they are similar. Replacing $B$ by $C$ and using $XC = XB$ gives $\triangle XCA \sim \triangle XDC$ in exactly the same way.

Read the ratios off the two similarities: $\frac{AB}{BD} = \frac{XA}{XB}$ and $\frac{AC}{CD} = \frac{XA}{XC}$. Since $XB = XC$, the two right-hand sides are equal, so $\frac{AB}{BD} = \frac{AC}{CD}$, that is $AB \cdot CD = AC \cdot BD$. A cyclic quadrilateral satisfying this is called harmonic.

For the side ratio, $E$ lies on $BC$, and triangles $ABE$ and $ACE$ share the apex $A$, so $\frac{BE}{CE} = \frac{[ABE]}{[ACE]} = \frac{AB \cdot AE \sin\angle BAE}{AC \cdot AE \sin\angle CAE}$. The inscribed angles $\angle BAD$ and $\angle CAD$ subtend $BD$ and $CD$, so their sines are in ratio $\frac{BD}{CD} = \frac{AB}{AC}$. Substituting gives $\frac{BE}{CE} = \frac{AB}{AC}\cdot\frac{AB}{AC} = \left(\frac{AB}{AC}\right)^2$, which is the [[symmedian-lemoine|symmedian's]] defining split.

Every step is reversible, so the harmonic condition, the squared side ratio, and "$AD$ is the symmedian" are three names for one situation.

## How to use it
The configuration in five lines, which is all you need at the table:

- the tangents at $B$ and $C$ meet at the pole $X$ of $BC$, and $AX$ is the $A$-symmedian — this is the sighting that appears most often, since a problem will draw the tangents and never say the word symmedian
- $XB = XC$ and $XB^2 = XA\cdot XD$ — equal tangent lengths plus power of a point, which together produce both similar triangles
- $\triangle XBA \sim \triangle XDB$ and $\triangle XCA \sim \triangle XDC$ — the shared angle at $X$ with the ratio $\frac{XB}{XA}=\frac{XD}{XB}$ gives the first, and the identical argument at $C$ gives the second
- $\dfrac{BD}{CD} = \dfrac{AB}{AC}$, equivalently $AB\cdot CD = AC\cdot BD$ — the harmonic condition, and it holds if and only if $AD$ is the symmedian
- $\dfrac{BE}{CE} = \left(\dfrac{AB}{AC}\right)^{2}$ where $E = AD \cap BC$ — the same statement read on the side instead of on the circle

Treat the tangents as the trigger. Whenever a problem draws the tangents to the circumcircle at two vertices and takes a line from the third, that line is a symmedian, and everything above becomes available without further work.

From there, pick whichever of the three forms matches the question. If you need a length on the circle, use $\frac{BD}{CD} = \frac{AB}{AC}$. If you need a length on $BC$, use $\frac{BE}{CE} = \left(\frac{AB}{AC}\right)^2$. If you need $AE$ or $AD$ themselves, use the similar triangles directly, or the power of the point $E$, since $BE \cdot EC = AE \cdot ED$.

Running it backwards is the olympiad use. To prove a given line is a symmedian, it suffices to prove the quadrilateral it cuts is harmonic, and that is often easier than chasing the reflection over the bisector.

## On contests
A recurring AIME configuration has the tangents at $B$ and $C$ meeting at a point, and a line from $A$ through that point crossing the circle again. Recognizing the symmedian gives the ratio structure at once, and even without the name, power of a point plus these similar triangles recovers everything. At olympiad level the harmonic form is the more common one, usually as a step toward a projective or inversive finish.`,

"lemoine-point": String.raw`## Why it works
Each symmedian is the locus of points whose distances to the two sides at its vertex are in the ratio of those sides. The $A$-symmedian gives $\frac{d_c}{d_b} = \frac{c}{b}$, the $B$-symmedian gives $\frac{d_a}{d_c} = \frac{a}{c}$, and the third is then forced. A point on all three therefore has $d_a : d_b : d_c = a : b : c$, and since the three loci are the reflections of the three medians in the three bisectors, they concur exactly because the medians do; concurrency is preserved by isogonal conjugation.

The minimization follows from the pedal triangle. If $P$ has pedal triangle $P_aP_bP_c$, then $a\,d_a + b\,d_b + c\,d_c = 2[ABC]$ is constant, so minimizing $d_a^2 + d_b^2 + d_c^2$ subject to a fixed weighted sum forces the $d_i$ proportional to the weights $a, b, c$ by Cauchy–Schwarz, with equality exactly at $K$.

## How to use it
Everything about $K$ in five lines:

- $K = (a^2 : b^2 : c^2)$ in [[barycentric-coordinates|barycentric coordinates]] — the compact form that encodes every property below
- $d_a : d_b : d_c = a : b : c$ — its distances to the three sides are proportional to those sides, which follows from each symmedian being the locus of a fixed distance ratio
- $K$ minimizes $d_a^2 + d_b^2 + d_c^2$ over the whole plane — the property it is usually defined by, and the reason it turns up in optimisation problems
- $K$ is the centroid of its own pedal triangle — the cleanest proof of that minimization
- $K$ is the isogonal conjugate of the centroid $G$ — another way of saying the symmedians are the reflections of the medians

Reach for the barycentric coordinates first. $(a^2 : b^2 : c^2)$ makes any incidence or ratio question about $K$ a short computation, and it is how the point is usually identified in a configuration that never names it.

The distance property is the one to recognize in disguise. A problem asking for the point minimizing the sum of squared distances to the three sides, or describing a point whose distances to the sides are proportional to the sides, is describing $K$ whether or not it says so.

Remember the conjugate pairing, since $K$ and $G$ swap under isogonal conjugation, as do the incenter with itself and the circumcenter with the orthocenter. A problem that pairs a median fact with a symmedian fact is usually asking you to notice that.

## On contests
Rare, and almost always olympiad rather than AIME. When it appears it is either as the concurrency point in a configuration full of symmedians, or as the answer to a minimization phrased in terms of distances to the sides. In both cases the barycentric coordinates are the shortest route.`,

"spieker-point": String.raw`## Why it works
The medial triangle is the image of $ABC$ under the [[homothety-monge|homothety]] centered at $G$ with ratio $-\frac12$. Homothety carries [[incenter-excenter-lemma|incenter]] to incenter, so the incenter $I$ of $ABC$ maps to the incenter of the medial triangle, which is the Spieker point $S$. The same map scales the inradius by $\frac12$, so the Spieker circle has radius $\frac r2$.

The perimeter-centroid description is the one worth understanding, because it explains why the point is not $G$. Replace each side by a uniform rod of mass equal to its length, placed at the side's midpoint. The center of mass of the three rods is $\frac{a M_a + b M_b + c M_c}{a+b+c}$, and substituting $M_a = \frac{B+C}{2}$ and its partners gives weights proportional to $b+c$, $c+a$, $a+b$, which is the [[barycentric-coordinates|barycentric]] form. Mass distributed along the boundary balances at $S$; mass spread over the area balances at $G$; they are different points for any non-equilateral triangle.

Collinearity on the Nagel line follows from the homothety too: it sends $I$ to $S$ and $N$ to $I$, so $I$, $G$, $S$, and $N$ all lie on one line, with $S$ the midpoint of $IN$ and $IG : GN = 1 : 2$.

## How to use it
Recognize it by either description. A problem about the incircle of the medial triangle, or about balancing the perimeter rather than the region, is about $S$ whether or not it names it. The barycentric form $(b+c : c+a : a+b)$ then answers ratio and collinearity questions directly.

The Nagel line is the usual route into a problem. Knowing $S$ is the midpoint of $IN$ turns a question about the Nagel point into one about the incenter, and the $1 : 2$ split at $G$ mirrors [[euler-line-ratio|the Euler line]]'s, which is what makes the two lines easy to confuse and worth keeping straight: Euler carries $O$, $G$, $H$; Nagel carries $I$, $G$, $S$, $N$.

Cleavers are the other sighting. A cleaver is a segment from a side's midpoint that bisects the perimeter, and all three cleavers pass through $S$, which is the perimeter analogue of the medians meeting at $G$.

## On contests
Uncommon, and when it appears it is usually olympiad-level or a configuration problem that hands you the medial triangle's incircle without naming it. The fact most likely to be useful is the radius $\frac r2$, followed by the midpoint-of-$IN$ relation.`,

"mobius-transformations": String.raw`## Why it works
Split $f(z)=\frac{az+b}{cz+d}$ by long division. When $c\ne0$ it factors as $z\mapsto cz+d$, then $w\mapsto\frac1w$, then $u\mapsto \frac{a}{c}+\frac{bc-ad}{c}\,u$. So every Möbius map is a translation, a rotation-and-scaling, one inversion, and another rotation-and-scaling. Each of those four sends the family of lines-and-circles to itself, once a line is regarded as a circle passing through the point at infinity, so the composition does too. The same decomposition explains conformality, since all four pieces preserve angles.

The condition $ad-bc\ne0$ is what stops the map collapsing: if $ad=bc$ the numerator is a multiple of the denominator and $f$ is constant. Scaling $a,b,c,d$ by a common factor changes nothing, which is why the maps correspond to matrices $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ only up to scale, and why composing maps is multiplying matrices.

## How to use it
The three-point property is the working tool: given any two triples of distinct points there is exactly one Möbius map carrying the first to the second. In practice you send three convenient points to $0$, $1$, and $\infty$, which is precisely the cross-ratio, and the invariance of the cross-ratio is then automatic.

Choose the target to make the problem trivial. Sending a circle to a line straightens a configuration; sending two disjoint circles to concentric ones turns a chain of tangencies into a rotation, which is the standard route into Steiner-chain problems. Fixed points come from solving $f(z)=z$, a quadratic, so a non-identity map has one or two of them, and knowing which tells you whether the map behaves like a rotation, a scaling, or a shear near infinity.

Watch the special cases. $c=0$ gives the affine maps $z\mapsto\alpha z+\beta$, which fix $\infty$ and are the similarity transformations. Inversion in a circle is not itself a Möbius map at all, since it is anti-conformal, but inversion followed by conjugation is; that is the precise sense in which the inversive and Möbius pictures agree.

## On contests
Essentially never needed below olympiad level, and even there it is a structural tool rather than a computational one. It appears when a problem is really about circles and tangency and the intended solution is "normalise the picture": sending a circle to a line, or two circles to concentric ones, and reading the answer off the easy configuration.`,


"reflection-composition": String.raw`## Why it works
Track directions. Reflecting a line at angle $\alpha$ in a mirror at angle $\mu$ sends it to $2\mu - \alpha$, so reflecting in $\ell_1$ and then $\ell_2$ sends $\alpha$ to $2\mu_2 - (2\mu_1 - \alpha) = \alpha + 2(\mu_2 - \mu_1)$. Every direction therefore turns by the same $2\theta$, and the intersection point is fixed by both mirrors, so the composite can only be a rotation about it. Parallel mirrors have no fixed point: a point at signed distance $t$ from the first lands at $t + 2d$, which is a translation.

## How to use it
Use it to collapse a chain of reflections. An even number of reflections is a rotation or a translation and an odd number is a reflection or a glide, so a long alternating process is secretly one rotation applied over and over, and the question becomes the order of that rotation.

Run it backwards as well. Any rotation by $2\theta$ splits into two reflections whose mirrors pass through the center at angle $\theta$, and one of the two mirrors may be chosen freely. That freedom is what lets an awkward rotation be traded for a convenient mirror line.

Mind the order, because composing the other way rotates by $-2\theta$. It is the directed angle from $\ell_1$ to $\ell_2$ that doubles.

## On contests
Iterated-reflection problems on the AIME reduce to finding the order of the resulting rotation, turning a geometry question into a divisibility one. Related: [[reflection-coordinates|reflecting a point over a line]] gives the single-reflection formulas, and [[rotation-90|rotating a point]] handles the quarter-turn special case.`,


"vector-projection": String.raw`## Why it works
Demand that $\vec u$ split as $c\vec v$ plus something perpendicular to $\vec v$. Dotting the split with $\vec v$ kills the perpendicular piece and leaves $\vec u \cdot \vec v = c\,(\vec v \cdot \vec v)$, which is the coefficient in the formula and the only value of $c$ that can work. Since [[vector-dot-product|the dot product]] equals $\lvert \vec u \rvert \lvert \vec v \rvert \cos\theta$, that coefficient times $\lvert \vec v \rvert$ is just $\lvert \vec u \rvert \cos\theta$: the shadow $\vec u$ casts on the direction of $\vec v$.

## How to use it
Two payoffs, and the second is the one usually wanted. First, the component along a direction: a force, a displacement, or a side resolved onto an axis is this formula and nothing else. Second, and more useful on contests, the leftover $\vec u - \operatorname{proj}_{\vec v}\vec u$ is perpendicular to $\vec v$ and is the shortest vector from the line spanned by $\vec v$ to the tip of $\vec u$, so its length is a distance. That is where the point-to-line distance and [[point-plane-distance|the point-to-plane distance]] come from, both of which are this leftover measured against a unit normal.

## On contests
It shows up as the step you did not know had a name. Dropping a foot of a perpendicular in coordinates, resolving a slanted displacement onto a grid direction, or finding where a point lands on a line are all one projection. Watch the sign: the scalar $\vec u \cdot \vec v / \lvert \vec v \rvert$ is negative when the angle is obtuse, which means the foot lies behind the tail of $\vec v$, and a problem asking for a point on a segment rather than on a whole line needs that checked.`,

"rotation-reflection-matrices": String.raw`## Why it works
A linear map is determined by where it sends the two basis vectors, and those images are the columns of its matrix. A rotation by $\theta$ sends $(1,0)$ to $(\cos\theta, \sin\theta)$ and $(0,1)$ to $(-\sin\theta, \cos\theta)$, which is $R_\theta$ read column by column; the reflection matrix comes out the same way from the images of the axes. Because both preserve lengths and angles, their columns are perpendicular unit vectors, so [[determinant-geometric|the determinant]] has absolute value $1$, positive for a rotation and negative for a reflection since a reflection reverses orientation.

## How to use it
Composing becomes multiplying, which is the whole reason to leave synthetic language. $R_\alpha R_\beta = R_{\alpha + \beta}$ recovers [[angle-addition|the angle addition formulas]] as a byproduct, and $F_\beta F_\alpha = R_{2(\beta - \alpha)}$ is exactly the statement that [[reflection-composition|two reflections compose to a rotation]] by twice the angle between the mirrors, now as a one-line computation rather than an angle chase. For a rotation about a center other than the origin, translate the center to the origin, apply $R_\theta$, and translate back. The quarter-turn cases are common enough that [[rotation-90|the coordinate swaps]] are worth knowing without the matrix.

## On contests
AMC 12 and AIME rarely say "matrix", so this is a tool you bring rather than one you are handed. It pays when a problem composes several transformations and asks what the net effect is: multiplying two or three of these is mechanical, while chasing the same composition synthetically invites a sign error. It is also the cleanest way to see why a rotation by $60^\circ$ and a reflection can never be equal, since one has determinant $1$ and the other $-1$.`,


"ellipse-properties": String.raw`## Why it works
Put the foci at $(\pm c, 0)$ and impose $PF_1 + PF_2 = 2a$. Clearing the two radicals leaves $\frac{x^2}{a^2} + \frac{y^2}{a^2 - c^2} = 1$, so writing $b^2 = a^2 - c^2$ produces the standard form and the relation $a^2 = b^2 + c^2$ at the same time. The fastest way to see that relation without algebra is to stand at the end of the minor axis: both focal distances are equal, so each is $a$, and the right triangle with legs $b$ and $c$ has hypotenuse $a$.

## How to use it
Read the problem for which of $a$, $b$, $c$ it hands you and convert immediately, since contests state the condition in whichever of the three languages is least convenient. A constant sum of distances to two fixed points is $2a$ with the foci given. A stated equation gives $a$ and $b$, and $c$ follows. An area gives the product $ab$. The one to watch is orientation: $a$ is the larger denominator, so if the $y^2$ denominator is bigger, the foci sit on the $y$-axis and every formula transposes.

## On contests
The recurring AIME shape is a constant focal sum arriving in disguise. Two tangency conditions give distances such as $R_1 - r$ and $R_2 + r$ from two fixed centers, whose sum does not depend on $r$, and that alone identifies the locus as an ellipse; in other problems each given equation places a point on an ellipse with known foci. Recognizing the sum is the problem, and the algebra afterward is routine. Pair this with [[eccentricity|eccentricity]] when the question compares two ellipses, and with [[conic-reflective-property|the reflective property]] when it asks for a minimum.`,

"hyperbola-properties": String.raw`## Why it works
The same derivation as the ellipse with $\lvert PF_1 - PF_2 \rvert = 2a$ instead of a sum. Now $c > a$, since the difference of two sides of a triangle is less than the third, so $a^2 - c^2$ is negative and the standard form carries a minus sign with $b^2 = c^2 - a^2$. The asymptotes come out of the equation rather than from a limit: replacing the $1$ by $0$ gives $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 0$, which factors as $\left(\frac{x}{a} - \frac{y}{b}\right)\left(\frac{x}{a} + \frac{y}{b}\right) = 0$, a pair of lines through the center. Far from the center the $1$ is negligible against terms growing like $x^2$, so the curve hugs them.

## How to use it
When a problem constrains points on a hyperbola and asks for a bound, the asymptotes usually supply it, because they cap the slopes the curve can reach. Substituting a line $y = mx$ into the equation gives a real intersection only when $\lvert m \rvert \lt  b/a$, and an infimum that is never attained is the standard consequence. The rectangular case deserves separate recognition: $a = b$ makes the asymptotes perpendicular, and a $45^\circ$ rotation turns the curve into $xy = k$, so any problem about the graph of a reciprocal is a hyperbola problem in other coordinates.

## On contests
A recurring AIME shape asks for the infimum of a length over figures inscribed in a hyperbola, such as a rhombus centered at the origin with its diagonals along two perpendicular lines through the center. The answer is a number the curve approaches and never reaches, which is exactly what asymptotes produce, and reading the problem as a hyperbola problem rather than a polygon problem is the whole insight.`,

"parabola-focus-directrix": String.raw`## Why it works
Impose $\operatorname{dist}(P, F) = \operatorname{dist}(P, \ell)$ with $F = (0, p)$ and $\ell: y = -p$. Squaring gives $x^2 + (y-p)^2 = (y+p)^2$, and the $y^2$ and $p^2$ terms cancel on both sides, leaving $x^2 = 4py$. Almost nothing survives the cancellation, which is why the parabola has the simplest equation of the three conics and why $p$ is the only parameter it has. Setting $y = p$ recovers the latus rectum: $x^2 = 4p^2$, so the chord runs from $-2p$ to $2p$ and has length $\lvert 4p \rvert$.

## How to use it
Translate between the two descriptions on sight. A problem giving $y = ax^2$ has focal distance $p = \frac{1}{4a}$ from the vertex, so a wide parabola has a distant focus. A problem giving a focus and a directrix is asking you to write the equation. The equidistance definition itself is often the shortcut: a distance to the focus can be replaced by a vertical distance to the directrix, which turns an optimization over a curve into one over a line. [[vertex-form|The vertex formula]] $x = -\frac{b}{2a}$ is the algebraic companion to this card and locates the vertex before any of this applies.

## On contests
Parabolas reach the AIME as constraint curves rather than as objects to describe. Two parabolas can combine into a circle by taking the right linear combination, and a parabola intersected with its own rotated image is best handled by noticing the symmetry axis of the rotation rather than by substituting. On the AMC the focus-directrix pair is tested directly, and the trap is a parabola opening sideways, where $x$ and $y$ swap roles throughout.`,

"eccentricity": String.raw`## Why it works
Fix a focus $F$ and a line $\ell$, and take all $P$ with $PF = e \cdot \operatorname{dist}(P, \ell)$. Squaring gives a second-degree equation whose $x^2$ and $y^2$ coefficients differ by a factor involving $1 - e^2$, so the sign of $1 - e^2$ alone decides whether the curve closes up, opens once, or opens twice. That is the unified construction: the three conics are one locus with one parameter. For an ellipse or hyperbola, comparing this with the two-focus definition gives $e = c/a$ and puts the directrix at $x = a/e$.

## How to use it
Use it whenever a problem compares two conics rather than describing one. Since $e$ is a ratio of lengths it survives any scaling, so two ellipses are similar exactly when their eccentricities match, and then every corresponding length is in one fixed ratio. Every parabola has $e = 1$, so all parabolas are similar, which surprises people and occasionally answers a question outright. The value also reads as a shape: $e$ near $0$ is nearly circular, $e$ near $1$ nearly a parabola, and large $e$ gives a hyperbola with wide-open branches.

## On contests
Equal eccentricity is the phrase to watch for: two ellipses with the same eccentricity are similar, so an area ratio fixes every linear ratio, in particular the ratio of their $c$ values, which converts a statement about areas into one about focal distances. The rest is bookkeeping. If a problem says "the same eccentricity", it is telling you the two curves are similar and inviting you to work in ratios.`,

"conic-classification": String.raw`## Why it works
Rotating the axes by $\theta$ mixes $x$ and $y$ linearly, and a direct computation shows $B^2 - 4AC$ comes out unchanged; translating changes only $D$, $E$, and $F$. So the quantity is a property of the curve, not of the coordinates chosen to write it, and it may be read off the equation as given. Its sign measures how the second-degree part factors: negative and it does not factor over the reals, which forces a closed curve, zero and it is a perfect square, which is the parabolic boundary case, positive and it splits into two real directions, which become the hyperbola's asymptotes.

## How to use it
Compute $B^2 - 4AC$ before doing anything else, since it tells you what you are looking at and therefore which card to reach for. If $B = 0$ the axes are already aligned, and [[completing-the-square|completing the square]] in each variable finishes the job. If $B \ne 0$ and you need more than the type, rotate by $\cot 2\theta = \frac{A-C}{B}$ to clear it. Always check the degenerate possibilities before trusting the classification, since the same sign covers them: a negative discriminant admits a single point or the empty set, a zero one admits a repeated or parallel line pair, and a positive one admits two crossing lines.

## On contests
This is a recognition tool more than a computation. A combination of two conic equations is again a conic, and choosing the combination that kills the asymmetry can leave a circle, which proves that four intersection points are concyclic. Seeing that the combination is still a conic, and which one, is the step that makes such a problem tractable. Degenerate cases also show up as answer-choice traps whenever a parameter is allowed to vary.`,

"conic-reflective-property": String.raw`## Why it works
Take a point $T$ on an ellipse and move slightly along the tangent. To first order the sum $PF_1 + PF_2$ must not change, since $T$ already sits on the level curve where that sum is $2a$. The rate at which each focal distance changes is the cosine of the angle between the tangent direction and that focal radius, so the two cosines must cancel, which says the tangent makes equal angles with the two radii. That is the reflection law. On a parabola the second focus is at infinity, so the second radius points along the axis and a ray from the focus leaves parallel to it.

## How to use it
The contest form is almost never about light. Read it as a level-curve statement: the ellipses with foci $F_1, F_2$ are the level sets of $PF_1 + PF_2$, so the smallest one meeting a given line touches it, and the point of tangency is where that sum is least. Every other point of the line lies on a larger ellipse, hence gives a larger sum. That reduces the minimization to [[reflect-across-the-line|reflecting one focus across the line]] and taking a straight segment, and [[ellipse-tangent-line|the tangency pattern]] is this idea packaged as a recognizable shape.

## On contests
The classic AIME use is an ellipse tangent to an axis: the point of tangency minimizes the focal sum along that line, so reflecting a focus across it solves the problem in one line. The property also appears stated outright on the AMC, usually as a whispering gallery or a satellite dish, where the answer is simply that rays from one focus arrive at the other or leave parallel. The hyperbola's version, that a ray aimed at the far focus reflects away from the near one, is the rarest of the three.`,


"projected-area-cosine": String.raw`## Why it works
Set up coordinates so the two planes meet along the $x$-axis at angle $\theta$. Projection fixes every $x$ and multiplies every coordinate measured across the line of intersection by $\cos\theta$, so it is a linear map that scales one direction by $1$ and the perpendicular one by $\cos\theta$. A linear map multiplies every area by the absolute value of [[determinant-geometric|its determinant]], which here is $1 \cdot \cos\theta$. That the factor does not depend on the region is the whole content, and it is why the statement holds for a circle, a polygon, and anything else at once.

## How to use it
Use it in the backwards direction almost always. A tilted plane cuts a solid and you are asked for the area of the section; projecting the section straight down onto a face of the solid usually gives a region you can compute with elementary geometry, and dividing by $\cos\theta$ recovers the real area. Getting $\theta$ is the only subtlety: it is the dihedral angle between the cutting plane and the plane you projected onto, most reliably found as the angle between their normal vectors using [[vector-dot-product|the dot product]], not by eye. A circle projects to an ellipse with the same major axis and the minor axis shortened by $\cos\theta$, so the area $\pi ab$ agrees with this rule.

## On contests
This is the card that makes a class of AIME solids tractable without any integration. The slanted section of a cylinder is its own shadow on the base stretched by a constant factor, so its area follows from a [[circular-segment|circular segment]] and one cosine, and a slanted section of a box is found the same way, by projecting onto the bottom face and dividing by the cosine of the angle between the two normals. Two things it is not: a shadow cast by a nearby lamp, which is a central projection and scales by similar triangles instead, and the projection of a single length, which is [[vector-projection|the vector projection]] and carries no area at all.`,


"euler-line-parallel-side": String.raw`## Why it works
Both centers sit above $BC$, so the line joining them is parallel to $BC$ exactly when their heights above it are equal. One of those heights costs nothing, because [[orthocenter-properties|the circumcenter's distance to a side]] is half the distance from the opposite vertex to the orthocenter, so the height of $O$ is $\frac{1}{2}AH$ whatever the triangle. Imposing that $H$ sits at the same height gives $HD = \frac{1}{2}AH$ directly, so the altitude from $A$ is cut in the ratio $2 : 1$ at the orthocenter.

Converting to angles needs only the two standard distances, $AH = 2R\cos A$ and $HD = 2R\cos B\cos C$. Equating $\cos A$ with $2\cos B\cos C$, then writing $\cos A = -\cos(B+C) = \sin B\sin C - \cos B\cos C$ and dividing through by $\cos B\cos C$, leaves $\tan B\tan C = 3$. The same two distances give the general ratio $AH : HD = (\tan B\tan C - 1) : 1$, which is worth carrying on its own: the parallel configuration is just its $2 : 1$ case.

## How to use it
Recognition runs in both directions, and which one you need is usually obvious from the problem. Told that the Euler line is parallel to a side, immediately write $\tan B\tan C = 3$ and treat it as one more equation in the angles; told two angles whose tangents multiply to $3$, you know the configuration without computing either center. The altitude reading is the one to reach for when the problem gives you a length rather than an angle, since it turns the whole configuration into a $2 : 1$ division of a segment you can already measure.

Two cautions. The condition is symmetric in $B$ and $C$ but says nothing about $A$, so it pins down a one-parameter family, not a specific triangle. And $B = C$ collapses it: $\tan^2 B = 3$ forces $B = 60^\circ$ and an equilateral triangle, where $O$ and $H$ coincide and there is no line to be parallel to anything. An isosceles configuration is therefore never the intended reading.

## Key forms
- $\tan B\tan C = 3$ — the angle test, and the quickest way in
- $AH : HD = (\tan B\tan C - 1) : 1$ — the general ratio along the $A$-altitude
- $AH = 2\,HD$ — the parallel case, the orthocenter two thirds of the way down from $A$
- $\cos A = 2\cos B\cos C$ — the same statement before dividing through
- $B = C$ — degenerate: forces equilateral, where the Euler line does not exist

## On contests
This is a configuration to recognize rather than a theorem to quote, and it earns its place because the parallel hypothesis looks like it says nothing computable until you convert it. Once $\tan B\tan C = 3$ is on the page it combines with the [[law-of-sines|Law of Sines]] or with $A + B + C = 180^\circ$ like any other angle relation. The altitude form pairs with the Euler line itself when a problem also involves the centroid, since $G$ is fixed at one third of the way from $O$ to $H$ along the line you have just placed.`,


"perpendicular-bisector-locus": String.raw`
## Why it works
The perpendicular bisector is the mirror line of the segment, so its points are equally far from both ends, and the converse, which is the direction that gets used, holds too.

Let $M$ be the midpoint of $AB$. If $P$ lies on the perpendicular bisector, the right triangles $PMA$ and $PMB$ share the leg $PM$ and have equal legs $MA = MB$, so their hypotenuses agree: $$PA = \sqrt{PM^2 + MA^2} = \sqrt{PM^2 + MB^2} = PB.$$

Conversely, if $PA = PB$, the triangles $PMA$ and $PMB$ have all three sides equal, so the angles at $M$ are equal; since they add to $180^\circ$, each is a right angle, and $P$ is on the perpendicular bisector. The locus is therefore the whole line and nothing else, which is why the converse may be used as freely as the theorem.

In coordinates the same statement is a cancellation. With $A = (a_1, a_2)$ and $B = (b_1, b_2)$, squaring $PA = PB$ gives $$(x - a_1)^2 + (y - a_2)^2 = (x - b_1)^2 + (y - b_2)^2,$$ where the $x^2$ and $y^2$ terms cancel and leave one linear equation. That is [[distance-midpoint|the coordinate recipe]], and it is why an equidistance condition costs a point one degree of freedom rather than trapping it on a curve.

## How to use it
There are three readings, and recognizing which one a problem wants is most of the work.

As a center-finder: any circle through $A$ and $B$ has its center on the perpendicular bisector of $AB$, so the bisectors of two chords meet at the center, and the three side bisectors of a triangle meeting at one point is why every triangle has a circumcenter. [[equal-chords-arcs|The chord version]] is the same fact inside a circle.

{{figure:center}}

As a constraint: "equidistant from $A$ and $B$" is a line, so it meets any other condition in finitely many points. This is the form that hides. A problem says two circles have equal radii, or a point is the same distance from two centers, and the intended move is to draw the bisector.

As a mirror: reflecting across it exchanges $A$ and $B$. A fold that brings $A$ onto another point $T$ has the perpendicular bisector of $AT$ as its crease, since the points of the crease do not move while $A$ lands on $T$. That is how paper-folding problems become geometry.

{{figure:fold}}

When the ratio $PA : PB$ is a constant other than $1$, the locus bends into [[apollonius-circle|a circle]] instead, and the perpendicular bisector is the limiting case of those circles as the ratio approaches $1$.

## On contests
It is used constantly and almost never named, which is why it is worth having a card at all. Ten problems here turn on it, nine of them AIME and none by it alone, and most reach it sideways: two circle centers placed on the bisector of a segment joining two others, or a fold whose crease is the bisector of the segment from a vertex to its landing point.

Once the bisector is drawn, the finish is usually the [[pythagorean-theorem|Pythagorean Theorem]] on the right triangle it creates. The tell is a phrase like "the same distance from" or "folded onto" rather than the words perpendicular bisector.
`,

"cotangent-rule": String.raw`## Why it works
Divide the two standard expressions for the same angle. The Law of Cosines gives $\cos A = \frac{b^2+c^2-a^2}{2bc}$, and the sine area formula $K = \frac12 bc \sin A$ rearranges to $\sin A = \frac{2K}{bc}$. Their quotient is $\frac{b^2+c^2-a^2}{2bc} \cdot \frac{bc}{2K}$, and the $bc$ cancels, leaving $\frac{b^2+c^2-a^2}{4K}$. Nothing deeper is involved, which is precisely the argument for writing it down once instead of rederiving it.

The corollary falls straight out: adding $\cot A$ and $\cot B$ puts $b^2+c^2-a^2$ over $4K$ next to $a^2+c^2-b^2$ over $4K$, and everything cancels except $2c^2$, giving $\frac{c^2}{2K}$. Note which side survives — it is the one opposite neither angle.

## How to use it
Reach for it the moment a cotangent of a triangle angle appears, because it converts the whole expression into side lengths and area, where ordinary algebra works. Sums are the common shape, and the corollary collapses each pair in one step. Its close relative $\cot A \cot B + \cot B \cot C + \cot C \cot A = 1$, which holds in every triangle, sits on [[brocard-angle|the Brocard angle card]] and is worth knowing alongside this one; the two answer different questions, since that one is a relation among the cotangents while this one evaluates each of them.

## On contests
The model use asks for a ratio like $\frac{\cot C}{\cot A + \cot B}$ given a relation among $a^2$, $b^2$, and $c^2$: converting both cotangents turns it into $\frac{a^2+b^2-c^2}{2c^2}$, and the given relation finishes it. Such problems are usually tagged with the Law of Cosines and the sine area formula, because those are what they use, but a reader who knows this card does the conversion in one step instead of three.`,

"rotation-center": String.raw`
## When to use
A figure and its image under a rotation, given by coordinates, as in "a rotation sends triangle $ABC$ to triangle $A'B'C'$; find the center", or by a drawing; and questions about the angle of a rotation, or whether a given motion is a rotation or a translation. It also locates the center of a composition of two rotations.

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
Several quantities vary independently, each moving a point in its own fixed direction, and the question asks about everything reachable: a perimeter, an area, or a shape. A single moving point on a path is a locus problem, and parameters that depend on each other do not give a Minkowski sum.

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


"steiner-line": String.raw`## Why it works
Take $P$ on the circumcircle and drop the perpendicular to $BC$, landing at foot $F$. The reflection of $P$ in $BC$ is the point $2F - P$, so reflecting is exactly the homothety centered at $P$ with ratio $2$ applied to the foot. Do that for all three sides at once and the whole Simson line is carried to the whole line of reflections, which therefore exists and is parallel to it. So the Simson line and this one are not two theorems; they are one theorem read at two scales.

That the Steiner line passes through $H$ takes one more fact you already have: [[orthocenter-properties|the reflection of the orthocenter in a side lies on the circumcircle]]. Reflecting that statement back says the reflection of a circumcircle point in the side is a point on the line through $H$ — and running it for each side puts $H$ on the common line.

## How to use it
Use it when a problem reflects a circumcircle point over the sides, which is a configuration that otherwise looks like three unrelated constructions. The collinearity is the payoff, and the extra information over the Simson line is the point $H$: you get a line through the orthocenter for free, which is often the link a synthetic argument needs.

Watch the degenerate case. As $P$ slides to a vertex the three reflections converge and the line tends to the altitude from that vertex, so a configuration where $P$ is nearly a vertex is numerically unstable and a coordinate check there will mislead.

## On contests
Olympiad material, and rarely the headline result — it appears as the step that turns a reflection condition into a collinearity, or the reverse. The practical value is knowing that the Simson line and the reflection line are the same object, so a problem stated with either can be attacked with facts about the other.`,

"anticomplementary-triangle": String.raw`## Why it works
Every statement follows from one homothety. The map centered at the centroid $G$ with ratio $-2$ sends $A$, $B$, $C$ to the vertices of $A'B'C'$, and the inverse map with ratio $-\frac12$ is exactly the one that produces the medial triangle. A homothety of ratio $-2$ doubles every length and negates direction, so sides are parallel and twice as long, the circumradius doubles, and the area quadruples.

The centers move by the same map, which is what makes them worth memorizing rather than deriving each time. The circumcenter of $A'B'C'$ is the orthocenter of $ABC$; the nine-point center of $A'B'C'$ is the circumcenter of $ABC$; and the orthocenter of $A'B'C'$ is the reflection of $H$ over $O$, the point usually called the de Longchamps point. Each of these is the image under the $-2$ homothety of the corresponding center one level down.

## How to use it
Reach for it when a problem gives you a triangle whose midpoints are the interesting points, since naming the bigger triangle converts a statement about midpoints into a statement about vertices. For example, the circle tangent to the circumcircles of $AHB$, $BHC$, and $CHA$ turns out to be the circumcircle of the anticomplementary triangle, centered at $H$ with radius $2R$.

The other direction is the useful one for centers. A fact about the orthocenter of a triangle is a fact about the circumcenter of its anticomplementary triangle, so an awkward $H$ can sometimes be traded for a comfortable $O$.

## On contests
Olympiad, and the occasional hard AIME geometry problem where a configuration is built on midpoints. It is a relabeling rather than a theorem, which is its strength: it costs nothing to apply and it makes [[euler-line-ratio|the Euler line]] relationships between the two triangles immediate.`,

"ptolemy-second-theorem": String.raw`## Why it works
The quickest route is the same one that proves the first theorem: invert at $A$. Inversion sends $B$, $C$, $D$ to collinear points, and distances transform by $B'C' = \frac{BC \cdot k}{AB \cdot AC}$. Writing the collinearity $B'C' + C'D' = B'D'$ gives Ptolemy's product formula, and comparing the two ratios in which $C'$ divides $B'D'$ gives this one. Both are the same picture, read for a sum or for a ratio.

## How to use it
Use it with the product formula, not instead of it. Together they give $AC \cdot BD$ and $AC / BD$, so multiplying and dividing recovers $AC^2$ and $BD^2$ — both diagonals of a cyclic quadrilateral from the four sides alone, with no angles anywhere. That is the reason to carry this card: the first theorem alone leaves you one equation short.

For the form, do not memorize the letters. Each side of the fraction gathers the two products of sides that meet at the endpoints of the diagonal you are not computing, so the numerator belongs to $AC$ because it is built at $A$ and $C$.

## On contests
Cyclic quadrilateral problems on the AIME that hand you four sides and want a diagonal. The product formula alone answers that only when the other diagonal is already known; this pair answers it outright. On olympiads it shows up inside longer computations, usually as the step that eliminates an unwanted diagonal.`,

"poncelet-closure": String.raw`## Why it works
For the triangle case the relation is forced by [[euler-distance-theorem|Euler's Distance Formula]]: $d^2 = R^2 - 2Rr$ holds in every triangle, so a circumcircle and incircle that belong to the same triangle must satisfy it. The content of the converse is that this necessary condition is also sufficient — given two circles obeying it, a triangle inscribed in one and circumscribed about the other exists.

Poncelet's closure theorem is the part with no elementary proof. Start anywhere on the outer circle, draw a tangent to the inner one, continue around, and if the path happens to close after $n$ steps for one starting point, it closes after $n$ steps for every starting point. The polygon slides continuously around the pair of circles without ever failing to shut, which is why these configurations are sometimes described as having a free parameter that does nothing.

## How to use it
Two directions, both rare but decisive. Told that a bicentric $n$-gon exists, you gain a relation between $R$, $r$, and $d$ for free: $d^2 = R^2 - 2Rr$ for $n = 3$, Fuss's $\frac{1}{(R-d)^2} + \frac{1}{(R+d)^2} = \frac{1}{r^2}$ for $n = 4$. Told two circles satisfy such a relation, you may place the polygon wherever is most convenient, because closure does not depend on where you start.

## On contests
Olympiad, and uncommon even there. It earns its place because the triangle case is not exotic at all — it is Euler's Formula, which is on the AIME — and seeing that $R \ge 2r$ and bicentric closure are the same statement is worth more than the theorem itself.`,


"sawayama-thebault": String.raw`## Why it works
The proof is an inversion at the incenter, or a long chase with the radical axis; neither is short, and the result is worth carrying rather than rederiving. What does make it memorable is where it sits. Let the circle touch the cevian at $E$ and the side at $F$. The claim is that $I$ lies on $EF$, and the reason it is believable is that $EF$ is the chord of contact of a circle squeezed into the same corner the incircle occupies, so the two circles' contact data are tied together by the tangency with the circumcircle.

The mixtilinear case is the specialization worth seeing: push the cevian out until it becomes the side $AB$, and the circle tangent to $AB$, to $BC$ and internally to the circumcircle is [[mixtilinear-incircle|the mixtilinear incircle]], whose own statement — that $I$ is the midpoint of the chord of contact — is the same fact with extra symmetry.

## How to use it
The trigger is a circle wedged between a cevian, a side, and the circumcircle. That is a lot of tangency conditions, and each one is hard to use alone; the lemma converts all of them at once into a single collinearity through the incenter. If a problem then asks about $I$, you already have a line through it.

Read backwards it is a construction: to place the incenter, draw any such circle and take its chord of contact. That is rarely the efficient route, but it is occasionally the only one that avoids trigonometry.

## On contests
Olympiad only, and among the more specialized results in this library. It is here because the configuration is recognizable on sight and almost impossible to make progress on without the lemma, which is the worst combination to meet unprepared.`,

"conway-circle": String.raw`## Why it works
Work out one tangent length and the rest follows. At vertex $A$, both extensions run out to distance $a$ beyond $A$, and the tangent length from $A$ to the incircle is $s - a$; adding $a$ gives $s$ for the distance from $A$ along either side to the new points. So all six points sit at tangent-length $s$ from the incircle along the sidelines, and a point at tangent length $s$ from a circle of radius $r$ is at distance $\sqrt{r^2 + s^2}$ from its center. Every one of the six is that far from $I$, so they are concyclic about $I$ with radius $\sqrt{r^2 + s^2}$.

That is also why the construction is not arbitrary. Extending each side by the length of the side opposite is precisely what makes $(s-a) + a$ come out the same at all three vertices, and any other extension rule breaks the equality.

## How to use it
It is a fact to recognize rather than a tool to apply: if a problem extends the sides of a triangle by the opposite sides, stop and use the circle instead of chasing six points. The radius formula turns the configuration into $r$ and $s$, both of which come straight from [[inradius-area|the inradius formula]] and the perimeter, so the answer is usually two lines away.

## On contests
Reachable from the AMC upward, because everything it needs — semiperimeter, inradius, tangent lengths — is standard. The construction is distinctive enough that recognizing it is most of the work; the arithmetic afterwards is elementary.`,

"japanese-theorem": String.raw`## Why it works
Each incenter is located by [[incenter-excenter-lemma|the arc-midpoint lemma]]: the incenter of $\triangle ABC$ lies on the bisector from $B$ at a position governed by the arc midpoint of $AC$. Placing all four incenters that way and comparing the angles they make shows each pair of adjacent ones subtends a right angle, which is the rectangle.

The quickest way to see why a rectangle rather than a general quadrilateral is the parallelism: two opposite sides of the figure come out parallel to the bisector of one diagonal, the other two parallel to the bisector of the other, and the two bisectors are perpendicular. Since only the concyclicity of $ABCD$ was used, the sides may be as uneven as you like.

## How to use it
Recognition, again — four incenters in a cyclic quadrilateral is a specific enough sight to trigger it. The payoff is that a rectangle gives right angles and equal diagonals for free, so a length or angle question about those incenters collapses.

The theorem extends: triangulating a cyclic polygon from any vertex and summing the inradii of the pieces gives a total independent of which vertex you chose. That is the general Japanese Theorem, and it is the version that occasionally shows up as a surprise invariant.

## On contests
Rare, and almost always as the punchline of a problem built around it rather than as a step inside a longer solution. Worth knowing mainly because the configuration is so specific that meeting it without the theorem is close to hopeless.`,

"pappus-hexagon": String.raw`## Why it works
It is Pascal's Theorem with the conic degenerated. A pair of distinct lines is a conic — the equation factors into two linear factors — so six points, three on each line, are six points of a conic, and Pascal says the three intersections of opposite sides of the hexagon they form are collinear. Reading the hexagon as $A E B F C D$ makes the opposite-side pairs exactly $AE$ with $BD$, $AF$ with $CD$, and $BF$ with $CE$.

The statement uses no lengths, no angles, and no circles, only incidence, so it is genuinely projective: apply any projective transformation and it still holds. That is what makes it a standard tool for setting up a convenient picture, since three points on a line may be sent anywhere convenient.

## How to use it
It answers collinearity questions in configurations made only of lines and their crossings, where metric tools have nothing to grip. If a diagram has two lines carrying three marked points each and asks whether three crossing points line up, this is the theorem, and no computation is required.

Do not confuse it with the other two results carrying the same name. Pappus's Centroid Theorems are about volumes and surfaces of revolution, and the Pappus chain is the circle chain in [[arbelos|the arbelos]]. Three different theorems, one mathematician.

## On contests
Olympiad, in projective-flavoured problems, and it pairs with [[desargues-theorem|Desargues]] as the two incidence results that get used without coordinates. Its other role is conceptual: seeing that it is the degenerate Pascal is the cleanest way to remember both.`,


"picks-theorem-general": String.raw`
## Why it works
Let $\Lambda$ be the lattice generated by $\vec u$ and $\vec v$, and let $T$ be the linear map with $T(1,0) = \vec u$ and $T(0,1) = \vec v$. It scales and shears the square grid's two basis vectors into $\vec u$ and $\vec v$, which makes it an [[affine-transformations|affine transformation]], and that is the whole idea. Then $T$ carries $\mathbb{Z}^2$ onto $\Lambda$ bijectively, so it matches the lattice points of any polygon with the lattice points of its preimage exactly — interior to interior, boundary to boundary. And $T$ multiplies every area by $|\det T| = d = |\vec u \times \vec v|$. Apply [[picks-theorem|the ordinary theorem]] in the preimage, where the area is $I + \frac{B}{2} - 1$, and push forward.

Nothing here was special about the square grid. What Pick's Theorem actually measures is area in units of the fundamental domain, and the familiar statement is the case where that domain happens to be a unit square. That is exactly the kind of quantity an affine map cannot change: it is a ratio of two areas, and an affine map multiplies both by the same factor.

## How to use it
Read off a basis of the lattice, take $d = |\vec u \times \vec v|$, count $I$ and $B$ as usual, and multiply. The whole content is remembering that the count gives you area in fundamental domains, not in square units.

The map also settles which grids are safe. If a problem's points are all the integer combinations of two fixed vectors, Pick applies. If they are only some of them — every other point, or a union of two shifted copies — the set is not a lattice and the theorem is not available. [[picks-hexagonal-grid|The honeycomb]] is the standard trap.

## On contests
Rare in this form, because the AMC and AIME draw their grids square. It matters when a problem sets up a skewed grid, works in the Eisenstein integers, or counts points of $\{a\vec u + b\vec v\}$, and it is the statement that makes [[picks-triangular-lattice|the triangular-grid version]] a consequence rather than a separate fact.
`,

"picks-triangular-lattice": String.raw`
## Why it works
The triangular lattice is generated by $\vec u = (1, 0)$ and $\vec v = \left(\frac12, \frac{\sqrt3}{2}\right)$, so its fundamental rhombus has area $\frac{\sqrt3}{2}$ — exactly two of the small triangles, each of area $\frac{\sqrt3}{4}$. By [[picks-theorem-general|the general form]], $A = \frac{\sqrt3}{2}\left(I + \frac{B}{2} - 1\right)$, and dividing by $\frac{\sqrt3}{4}$ to measure in unit triangles gives $A = 2I + B - 2$.

Check it on the smallest case: one unit triangle has $I = 0$ and $B = 3$, and $2(0) + 3 - 2 = 1$. A side-$2$ triangle has $I = 0$, $B = 6$, area $4$. The hexagon of six triangles around a point has $I = 1$, $B = 6$, area $6$.

## How to use it
Count in triangles, not in $\sqrt3$'s — carry the $\frac{\sqrt3}{4}$ only at the very end, if at all. Counting $B$ is easier here than on a square grid: a side running $k$ steps along a grid direction contributes exactly $k$ boundary points, so $B$ is the perimeter measured in steps.

The usual trap is mixing units. $2I + B - 2$ counts unit triangles; if a problem wants an answer in terms of a side length, multiply by $\frac{\sqrt3}{4}s^2$ at the end.

## On contests
The natural tool whenever a figure is drawn on isometric paper or built out of unit equilateral triangles, which is a recurring MATHCOUNTS and AMC setup. It is also the fast route on any problem whose answer is "how many little triangles", since counting two kinds of dots beats decomposing an awkward region.
`,

"picks-hexagonal-grid": String.raw`
## Why it works
The failure is worth seeing concretely, because "hexagonal lattice" sounds like it should behave. Take the honeycomb with bond length $1$, and look at the two triangles whose vertices are three mutually nearest corners of the same kind. They are congruent — both equilateral of side $\sqrt3$, area $\frac{3\sqrt3}{4}$ — and both have $B = 3$. But the down-pointing one has a corner of the other kind sitting exactly at its center, so $I = 1$, while the up-pointing one has $I = 0$.

Same area, same $B$, different $I$. No formula in $I$ and $B$ alone can produce the area, so no Pick law exists here, and this is not a matter of finding the right constant. The reason is structural: the honeycomb is not closed under subtraction, so it is not a lattice — it is two interleaved triangular lattices, and each one sits at the centers of the other's down-triangles.

## How to use it
Work with the cell centers instead. The centers of a hexagonal tiling do form a triangular lattice, so the triangular-grid form applies to them without modification, and a region made of whole cells of side $s$ has area $\frac{3\sqrt3}{2}s^2$ per cell.

If the corners really are the given points, decompose instead of counting: split the region into whole cells plus leftover triangles and trapezoids. Slower, but correct.

## On contests
You will not be asked to state this. It earns a place because the instinct to apply Pick on a hexagonal picture is strong and the answer it gives is wrong, and because the reason it fails — not a lattice — is the same test that tells you when [[picks-theorem-general|the general form]] does apply.
`,

"picks-with-holes": String.raw`
## Why it works
Cut the region into a single hole-free piece by slicing from the outer boundary to each hole along lattice segments. Each of the $h$ cuts is traversed twice, once in each direction, so every lattice point on a cut is counted twice as a boundary point of the sliced polygon while being counted once — or not at all — in the original. Tracking that bookkeeping across all $h$ cuts, the $-1$ in [[picks-theorem|Pick's Theorem]] becomes $-1 + h$.

The clean statement is $A = I + \frac{B}{2} - \chi$, where $\chi$ is the Euler characteristic of the region: $1$ for a disc, $1 - h$ with $h$ holes. Written that way it is not a patch on Pick but the same theorem, with the constant showing what it always was.

## How to use it
Two counting rules matter more than the formula. Count $B$ over every boundary curve, the outer one and each hole. And count $I$ only at points strictly inside the region — a point sitting on a hole's edge is a boundary point, not an interior one, and treating it as interior is the usual error.

Sanity-check on a $3 \times 3$ square with its center unit square removed: $A = 8$, $B = 12 + 4 = 16$, and all four would-be interior points now lie on the hole, so $I = 0$. Then $0 + 8 + 1 - 1 = 8$.

## On contests
Shows up whenever a lattice figure has something punched out of it — a frame, an annulus, a polygon with a polygonal bite. Often the faster move is still to apply plain Pick to the outer polygon and to each hole separately and subtract, which is worth doing as a check; the hole form is the one to reach for when the boundaries share lattice points and the subtraction gets delicate.
`,

"equiangular-hexagon-area": String.raw`
## Why it works
All six angles are $120^\circ$, so consecutive sides turn by $60^\circ$ and the six side vectors point along only three directions. Summing them to zero gives one condition, which in the labeling $a, b, c, d, e, f$ reads $a - d = e - b = c - f$. That is the only constraint: an equiangular hexagon has three free side lengths, not one, and is usually nowhere near regular.

Now extend sides $b$, $d$, and $f$ until they meet. Because the directions repeat every three sides, the three lines make an equilateral triangle, and what has been added at each corner is itself equilateral, of sides $a$, $c$, and $e$. The triangle's side is $a + b + c$ — the side carrying $b$ is flanked by the corners cut at $a$ and at $c$ — so subtracting gives the formula. The closure condition is exactly what makes $a + b + c$, $c + d + e$, and $e + f + a$ agree, which is why the construction is consistent.

## How to use it
Get the labeling right and the rest is arithmetic: the squares subtracted are the alternating triple $a$, $c$, $e$ that starts with the first side of the sum $a + b + c$. On a regular hexagon of side $1$ it reads $\frac{\sqrt3}{4}(9 - 1 - 1 - 1) = \frac{3\sqrt3}{2}$, which is the check to run whenever you are unsure which three sides to square.

If a problem gives five sides, do not solve a system — use $a - d = e - b = c - f$ to read off the sixth directly.

## On contests
The standard way in is being handed six sides with all angles $120^\circ$ and asked for the area; decomposing by hand into trapezoids works but is slow and error-prone. The same triangle-minus-corners picture is what makes an equiangular hexagon on a triangular grid tractable, where [[picks-triangular-lattice|the triangular-grid Pick]] gives the same number by counting dots.
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
Cevian problems with a given ratio on one side and an unknown ratio on another; a midpoint or trisection point inside a triangle with lines crossing through it; proofs of ratio theorems such as the Angle Bisector Theorem; and trapezoids, where the parallel sides already supply one pair of parallel lines. The sign is a ratio that must move from one line to another with no similar triangles drawn.

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
A problem asks for the parameter that makes two curves meet exactly once, for a line that just touches a circle or a parabola, or for the largest value of a linear expression $ax + by$ over a circle or conic, where the level line $ax + by = c$ touches the curve at the extreme.

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

## Common traps
- Reading "exactly one solution" as tangency when the curves can only meet once anyway, as a line parallel to a parabola's axis does.
- Keeping only one parameter value when the line can touch from both sides.
- Squaring to clear a radical and accepting a tangency the original curves do not have.

## Contest profile
AIME problems disguise the curves as a locus, a condition on complex numbers, or the envelope of a moving segment; the tangency equation is the last step once the curves are named.
`,

"cyclic-quadrilateral": String.raw`
## Distinguishing clues
Sometimes the circle is stated, but more often it is hidden, and finding it is the step that unlocks the problem. A circle is guaranteed by two right angles standing on one segment, as at the feet of two altitudes or at a point seeing a diameter; by two equal angles that see a segment from the same side; by a pair of supplementary opposite angles; and by any isosceles trapezoid or rectangle.

A quadrilateral with an inscribed circle is a different shape with different rules, where opposite sides have equal sums. A parallelogram is cyclic only when it is a rectangle, and a kite only when its two equal angles are right angles.

{{figure:toolkit}}

## Methods and Formulas to Try
Proving the circle comes first; after that every fact below holds at once. Most problems use two of them: an angle fact to locate an angle, and a length fact to finish.

### Methods to try
- [[angle-chasing]]: the equal and supplementary pairs let one unknown angle travel around the circle, and the same chase is how a hidden circle is proved in the first place.
- [[extend-sides-to-meet]]: extending sides $AB$ and $DC$ to meet at $E$ makes triangles $EAD$ and $ECB$ similar, with $EA \cdot EB = ED \cdot EC$.
- [[trig-bash]]: every side and diagonal is a chord, $2R$ times the sine of half its arc, so naming the arcs turns the figure into trigonometry.

### Formulas to try
- [[cyclic-opposite-angles]]: opposite angles are supplementary, the most common test and the first consequence.
- [[cyclic-equal-angles]]: each side is seen at equal angles from the other two vertices, and the diagonals cut off similar triangles.
- [[concyclicity-tests]]: the converses that prove four points lie on a circle.
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
Circles touch each other or a larger circle, sometimes resting on a line or sitting in a corner, and the question asks for an unknown radius, the distance between two points, or where a circle sits. Spheres touching along a common axis reduce to the same picture after a [[cross-section-method|cross-section]].

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
Several circles touch each other, a larger enclosing circle, or straight lines, and the unknowns are radii or positions fixed only by those tangencies. A ring of $n$ equal circles around a center puts their centers on a regular $n$-gon. Four mutually tangent circles bring in a single identity on their curvatures.

Spheres are the same configuration one dimension up, handled by slicing through their centers. A single circle tangent to the two sides of an angle is the simpler corner configuration, with its center on the angle bisector. Two circles with common tangent lines but no tangency between them are a homothety question.

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
A segment is perpendicular to a line and splits a figure into two right triangles that share it: the altitude of a triangle with all three sides known, the perpendicular from two circle centers to their common chord, or the height of a trapezoid with known sides. The shared length is unknown, and so is where its foot lands.

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
A regular figure with one point inside it and lengths measured from that point. The kind of length is the clue. Three distances to the vertices, such as $3$, $4$, and $5$, point to a rotation by the figure's angle, which carries the three distances into one triangle. Distances to the sides of an equilateral triangle always add up to its altitude. Equal angles of $120^\circ$ at the point, or a smallest possible sum of distances to the vertices, mark the Fermat point.

A point inside a general triangle with given distances is a coordinate or trigonometry problem instead, since nothing rotates the triangle onto itself.

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
- [[law-of-cosines]]: the triangle formed after the rotation; when the three distances form a right triangle, as $5$, $12$, $13$ do, adding the $60^\circ$ of the equilateral triangle gives $\angle APB = 150^\circ$, and the Law of Cosines then gives the side.
- [[british-flag-theorem]]: in a square or rectangle, $PA^2 + PC^2 = PB^2 + PD^2$ for opposite corners.

## Common traps
- Rotating by the wrong angle, or about a vertex that does not send one neighbor onto the other.
- Applying Viviani's Theorem to a point outside the triangle, where one distance counts negatively.
- Forgetting that the rotated point and the original form an equilateral triangle, which is where the $60^\circ$ comes from.

## Contest profile
A classic AIME and AMC setup, distances $3$, $4$, $5$ from an interior point or a point with distances to the sides, almost always finished by one rotation and the Law of Cosines.
`,

"right-triangle-altitude": String.raw`
## Distinguishing clues
A right angle with the perpendicular dropped from it to the opposite side, or the same figure in disguise: a point on a semicircle joined to the ends of the diameter, with a perpendicular from the point to the diameter, which is a right angle by Thales' Theorem. The question names segments of the hypotenuse, the altitude, or a geometric mean.

A right triangle with no altitude drawn needs only the Pythagorean Theorem. An altitude in a triangle that is not right still splits it into two right triangles, but they are not similar to the whole.

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
A random point in a triangle, square, or other region, and a question about whether it is closer to one side than to another, or which side it is closest to. Comparing distances to two points instead uses the perpendicular bisector of the segment joining them, the same idea for points.

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
A physical fold: a rectangle with one corner folded onto a side or onto the opposite corner, a triangle folded along a line, or a strip folded over itself. The questions ask for the crease, for where a point lands, or for the overlapping area. Unfolding the surface of a solid to find a shortest path is a different idea that runs the other way.

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
A circle touches two lines that meet at a vertex, as in a corner of a square, the angle of a triangle, or a wedge holding a row of circles. The incircle of a triangle is this configuration three times over, once at each vertex. Circles tangent to two parallel lines are a different case, with all centers on the midline and all radii equal.

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
A construction repeats forever or many times: a square inscribed in a square by joining points on its sides, a circle inscribed in a triangle inscribed in a circle, or a triangle cut by midsegments again and again. The question asks for the total area, total perimeter, or the size of a far level.

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
The construction is described once and then repeated: "continue forever", "this process is repeated", or a picture of ever smaller copies. The questions ask for a total over all levels or for one far level. A figure cut once by parallel lines into similar pieces is a single similarity, not this pattern.

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
Every angle is the same, $120^\circ$ for a hexagon and $135^\circ$ for an octagon, while the side lengths differ. A regular polygon has equal sides too and needs none of this; a polygon with equal sides but unequal angles is a different, less rigid shape.

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
A tetrahedron is given by its six edges, and they pair up as three equal pairs of opposite edges, such as $\sqrt{13}$, $\sqrt{20}$, $5$ each appearing twice, or the tetrahedron is regular. The question asks for its volume, its circumradius, or a distance inside it.

## How
1. Call the box's dimensions $p$, $q$, $r$, and write each pair of opposite edges as the diagonal of one face: $p^2 + q^2$, $q^2 + r^2$, $r^2 + p^2$.
2. Add the three equations to get $p^2 + q^2 + r^2$, then subtract each equation to get $p^2$, $q^2$, $r^2$.
3. The tetrahedron is the box with four corner tetrahedra removed, each of volume $\frac{pqr}{6}$, so its volume is $pqr - 4 \cdot \frac{pqr}{6} = \frac{pqr}{3}$.
4. Its circumsphere is the box's circumsphere, with radius half the space diagonal, $\frac12\sqrt{p^2 + q^2 + r^2}$.

A regular tetrahedron of edge $\sqrt2$ sits in a unit cube, so its volume is $1 - 4 \cdot \frac16 = \frac13$.

## Why it works
Four alternate corners of a box, no two sharing an edge, are joined by six face diagonals, and opposite diagonals of each pair of opposite faces are equal, which gives three equal pairs. Conversely, three equal pairs determine $p^2$, $q^2$, $r^2$ uniquely, and they are positive exactly when every face is an acute triangle, so such a tetrahedron always has a box. Each removed corner piece is a right-corner tetrahedron with legs $p$, $q$, $r$, of volume $\frac{pqr}{6}$.

## Formulas it uses
- [[pythagorean-theorem]]: each edge is the diagonal of a face, $\sqrt{p^2 + q^2}$.
- [[prism-pyramid-volumes]]: each corner piece is a pyramid with volume $\frac13 \cdot \frac{pq}{2} \cdot r$.
- [[space-diagonal]]: the circumsphere's diameter is the box's space diagonal $\sqrt{p^2 + q^2 + r^2}$.

## Common traps
- Matching the edge equations wrongly; each equation pairs two dimensions, and each dimension appears in exactly two equations.
- Forgetting there are four corner pieces to remove.
- Applying it to a tetrahedron whose opposite edges are not equal in pairs.

## Contest profile
An AIME and AMC 12 idea for tetrahedra given by six edges in three equal pairs, and for regular tetrahedra, which sit in cubes.
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
The six edges come in three equal pairs, each pair on opposite edges, often given as square roots, or the four faces are said to be congruent; a regular tetrahedron is the case with all six equal. A tetrahedron with three mutually perpendicular edges at one vertex is a different shape, the corner of a box, with volume $\frac{abc}{6}$.

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
});
