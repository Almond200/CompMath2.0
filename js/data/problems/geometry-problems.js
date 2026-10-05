// Practice questions for Geometry, keyed by formula id.
// Shown only on detail pages; each entry is a list of { q, s } (question, solution).
window.MATH_PROBLEMS = window.MATH_PROBLEMS || {};

Object.assign(window.MATH_PROBLEMS, {

"pythagorean-theorem": [
  {
    q: String.raw`A right triangle has one leg of length $20$ and hypotenuse of length $29$. Find the other leg.`,
    s: String.raw`Let the missing leg be $b$. Then $b^2 = 29^2 - 20^2 = 841 - 400 = 441$, so $b = 21$. This is the primitive triple $(20, 21, 29)$ — recognizing it would have skipped the arithmetic entirely.`
  },
  {
    q: String.raw`A $25$-foot ladder leans against a wall with its base $7$ feet from the wall. How high up the wall does it reach?`,
    s: String.raw`The ladder, wall, and ground form a right triangle with hypotenuse $25$ and one leg $7$. The height is $\sqrt{25^2 - 7^2} = \sqrt{625 - 49} = \sqrt{576} = 24$ feet — the $(7, 24, 25)$ triple.`
  }
],

"special-right-triangles": [
  {
    q: String.raw`An equilateral triangle has altitude $6$. Find its side length and its area.`,
    s: String.raw`The altitude splits the triangle into two 30-60-90 triangles, in which the altitude is the long leg: $h = \frac{s\sqrt{3}}{2}$. So $s = \frac{2h}{\sqrt{3}} = \frac{12}{\sqrt{3}} = 4\sqrt{3}$. The area is $\frac{1}{2} \cdot s \cdot h = \frac{1}{2} \cdot 4\sqrt{3} \cdot 6 = 12\sqrt{3}$.`
  }
],

"triangle-inequality": [
  {
    q: String.raw`Two sides of a triangle have lengths $5$ and $9$. How many integer values are possible for the third side?`,
    s: String.raw`The third side $x$ must satisfy $|9 - 5| < x < 9 + 5$, i.e. $4 < x < 14$. The integers in this open interval are $5, 6, \dots, 13$ — that's $13 - 5 + 1 = 9$ values.`
  }
],

"polygon-angle-sums": [
  {
    q: String.raw`Each interior angle of a regular polygon measures $160^\circ$. How many sides does it have?`,
    s: String.raw`Work with the exterior angle: it is $180^\circ - 160^\circ = 20^\circ$, and the exterior angles of any polygon sum to $360^\circ$. So $n = \frac{360^\circ}{20^\circ} = 18$ sides. (Using the interior-sum formula $\frac{180(n-2)}{n} = 160$ gives the same answer with more algebra.)`
  }
],

"similar-figures-ratios": [
  {
    q: String.raw`A line parallel to the base of a triangle cuts the triangle into two regions of equal area. In what ratio does it divide the altitude, measured from the apex?`,
    s: String.raw`The small triangle above the line is similar to the whole. For it to have half the area, the similarity ratio must satisfy $k^2 = \frac{1}{2}$, so $k = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}$. The line therefore sits $\frac{\sqrt{2}}{2}$ of the way down the altitude, dividing it in ratio $\frac{\sqrt2}{2} : \left(1 - \frac{\sqrt2}{2}\right) = \sqrt{2} : (2 - \sqrt{2}) = (\sqrt{2} + 1) : 1$ from the apex.`
  }
],

"midsegment-theorem": [
  {
    q: String.raw`The triangle formed by joining the midpoints of the sides of $\triangle ABC$ has perimeter $15$. What is the perimeter of $\triangle ABC$?`,
    s: String.raw`Each midsegment is half the length of the side it parallels, so the medial triangle's perimeter is exactly half of the original's. The answer is $2 \cdot 15 = 30$. (Its area would be one quarter of the original — lengths halve, areas quarter.)`
  }
],

"cevian-area-ratio": [
  {
    q: String.raw`In $\triangle ABC$ with area $40$, point $D$ lies on $BC$ with $BD : DC = 3 : 2$. Find the area of $\triangle ABD$.`,
    s: String.raw`Triangles $ABD$ and $ACD$ share the altitude from $A$ to line $BC$, so their areas are in the ratio of their bases: $[ABD] : [ACD] = 3 : 2$. Thus $[ABD] = \frac{3}{5} \cdot 40 = 24$.`
  }
],

"trapezoid-parallelogram-areas": [
  {
    q: String.raw`A rhombus has diagonals of lengths $10$ and $24$. Find its area and its perimeter.`,
    s: String.raw`Area: $\frac{d_1 d_2}{2} = \frac{10 \cdot 24}{2} = 120$. The diagonals of a rhombus bisect each other at right angles, so each side is the hypotenuse of a right triangle with legs $5$ and $12$: side $= 13$, perimeter $= 52$.`
  }
],

"regular-polygon-area": [
  {
    q: String.raw`A regular hexagon has apothem $4$. Find its area.`,
    s: String.raw`For a hexagon the apothem is $\frac{s\sqrt3}{2}$, so $s = \frac{8}{\sqrt3} = \frac{8\sqrt3}{3}$ and the perimeter is $6s = 16\sqrt{3}$. Then $A = \frac{1}{2} a p = \frac{1}{2} \cdot 4 \cdot 16\sqrt3 = 32\sqrt{3}$.`
  }
],

"triangle-area-standard": [
  {
    q: String.raw`The area of a triangle is $90$, and two of its sides are $15$ and $20$. Find the sine of the included angle.`,
    s: String.raw`Use $[\triangle] = \tfrac12 ab\sin C$: $90 = \tfrac12(15)(20)\sin C = 150\sin C$, so $\sin C = \tfrac{3}{5}$. Two triangles fit — the included angle can be acute or obtuse — and neither is right, since $\sin C \ne 1$.`
  }
],

"trig-area": [
  {
    q: String.raw`Two sides of a triangle have lengths $8$ and $5$, and the angle between them is $150^\circ$. Find the area.`,
    s: String.raw`$A = \frac{1}{2}ab\sin C = \frac{1}{2} \cdot 8 \cdot 5 \cdot \sin 150^\circ$. Since $\sin 150^\circ = \sin 30^\circ = \frac{1}{2}$, the area is $\frac{1}{2} \cdot 40 \cdot \frac{1}{2} = 10$. Obtuse included angles work exactly like their supplements.`
  }
],

"inradius-area": [
  {
    q: String.raw`Find the inradius of the triangle with sides $9$, $10$, $17$.`,
    s: String.raw`From the previous computation (or Heron), the area is $36$ and $s = 18$. Since $A = rs$, we get $r = \frac{A}{s} = \frac{36}{18} = 2$.`
  }
],

"circumradius-area": [
  {
    q: String.raw`Find the circumradius of the triangle with sides $9$, $10$, $17$.`,
    s: String.raw`With $A = 36$ from Heron: $R = \frac{abc}{4A} = \frac{9 \cdot 10 \cdot 17}{4 \cdot 36} = \frac{1530}{144} = \frac{85}{8}$. One Heron computation feeds both radii ($r = 2$ from $A = rs$, and this $R$).`
  }
],

"right-triangle-inradius": [
  {
    q: String.raw`A right triangle has inradius $3$ and hypotenuse $25$. Find its area and perimeter.`,
    s: String.raw`For a right triangle $r=\frac{a+b-c}{2}$, so $a+b=2r+c=6+25=31$. Squaring, $a^2+b^2+2ab=961$; since $a^2+b^2=c^2=625$, we get $2ab=336$, so the area is $\tfrac12 ab=84$ and the perimeter is $a+b+c=31+25=56$. (It is the $7$-$24$-$25$ triangle.)`
  }
],

"incircle-tangent-lengths": [
  {
    q: String.raw`In $\triangle ABC$, $AB = 8$, $BC = 10$, $CA = 12$. The incircle touches $BC$ at $D$. Find $BD$ and $DC$.`,
    s: String.raw`The semiperimeter is $s = 15$. The tangent length from $B$ is $s - b$ where $b = CA = 12$: $BD = 15 - 12 = 3$. From $C$: $DC = s - c = 15 - 8 = 7$. Check: $BD + DC = 3 + 7 = 10 = BC$. ✓`
  }
],

"law-of-sines": [
  {
    q: String.raw`In a triangle, $\angle A = 30^\circ$ and the side opposite it has length $7$. Find the circumradius.`,
    s: String.raw`The extended law of sines says $\frac{a}{\sin A} = 2R$. So $2R = \frac{7}{\sin 30^\circ} = \frac{7}{1/2} = 14$, giving $R = 7$. No other information about the triangle is needed — every triangle with a $30^\circ$ angle opposite a side of $7$ has the same circumcircle size.`
  }
],

"law-of-cosines": [
  {
    q: String.raw`A triangle has sides $5$, $6$, $7$. Find the cosine of its largest angle.`,
    s: String.raw`The largest angle is opposite the longest side, $7$. By the law of cosines, $\cos C = \frac{5^2 + 6^2 - 7^2}{2 \cdot 5 \cdot 6} = \frac{25 + 36 - 49}{60} = \frac{12}{60} = \frac{1}{5}$. Since this is positive, the triangle is acute.`
  }
],

"angle-bisector-theorem": [
  {
    q: String.raw`In $\triangle ABC$, $AB = 10$, $AC = 15$, $BC = 20$. The bisector of $\angle A$ meets $BC$ at $D$. Find $BD$ and $DC$.`,
    s: String.raw`The bisector splits $BC$ in the ratio of the adjacent sides: $\frac{BD}{DC} = \frac{AB}{AC} = \frac{10}{15} = \frac{2}{3}$. So $BD = \frac{2}{5} \cdot 20 = 8$ and $DC = \frac{3}{5} \cdot 20 = 12$.`
  }
],

"stewarts-theorem": [
  {
    q: String.raw`In the $13$-$14$-$15$ triangle ($AB = 13$, $AC = 15$, $BC = 14$), point $D$ lies on $BC$ with $BD = 5$. Find $AD$.`,
    s: String.raw`Here $a = 14$, $m = BD = 5$ (adjacent to $c = 13$), $n = DC = 9$ (adjacent to $b = 15$). Stewart: $14(d^2 + 5 \cdot 9) = 15^2 \cdot 5 + 13^2 \cdot 9 = 1125 + 1521 = 2646$. So $d^2 + 45 = 189$, giving $d^2 = 144$ and $AD = 12$. (In fact $D$ is the foot of the altitude: $13^2 - 5^2 = 144$ confirms it.)`
  }
],

"menelaus-theorem": [
  {
    q: String.raw`A line crosses side $BC$ of $\triangle ABC$ at $D$, side $CA$ at $E$, and the extension of $AB$ at $F$. If $\frac{BD}{DC} = 2$ and $\frac{CE}{EA} = \frac{1}{3}$, find $\frac{AF}{FB}$.`,
    s: String.raw`Menelaus (unsigned) gives $\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1$. So $\frac{AF}{FB} \cdot 2 \cdot \frac{1}{3} = 1$, giving $\frac{AF}{FB} = \frac{3}{2}$. The transversal must cross one side externally — here $F$ lies beyond $B$ on line $AB$, consistent with the signed version's $-1$.`
  }
],

"simson-line": [
  {
    q: String.raw`$\triangle ABC$ has a right angle at $C$, and $P$ is the point of the circumcircle diametrically opposite $C$. Identify the Simson line of $P$.`,
    s: String.raw`Since $CP$ is a diameter, $\angle CAP = 90^\circ$, so the foot of the perpendicular from $P$ to line $CA$ is $A$ itself; likewise the foot on line $CB$ is $B$. Two of the three feet are $A$ and $B$, so the Simson line is line $AB$ — and the third foot (on $AB$) automatically lands on it, as the theorem promises.`
  }
],

"circle-basics": [
  {
    q: String.raw`A circular arc has length $6\pi$, and the sector it bounds has area $27\pi$. Find the radius and central angle.`,
    s: String.raw`Arc $r\theta=6\pi$ and sector $\tfrac12 r^2\theta=27\pi$. Dividing the second by the first, $\tfrac{r}{2}=\tfrac{27\pi}{6\pi}=\tfrac92$, so $r=9$; then $\theta=\tfrac{6\pi}{9}=\tfrac{2\pi}{3}$ ($120^\circ$).`
  }
],

"power-of-a-point": [
  {
    q: String.raw`From an external point $P$, a tangent to a circle has length $6$, and a secant through $P$ meets the circle at $A$ then $B$ with $PA = 4$. Find the chord length $AB$.`,
    s: String.raw`Power of the point: $PT^2 = PA \cdot PB$, so $36 = 4 \cdot PB$ and $PB = 9$. Since $A$ is the nearer intersection, $AB = PB - PA = 9 - 4 = 5$.`
  },
  {
    q: String.raw`Two chords intersect inside a circle. One is divided into segments of $5$ and $4$; the other into segments of $2$ and $x$. Find $x$.`,
    s: String.raw`Intersecting chords give equal products: $5 \cdot 4 = 2 \cdot x$, so $x = 10$. Both chords have the same "power" with respect to the intersection point.`
  }
],

"chord-length": [
  {
    q: String.raw`A chord of a circle of radius $10$ lies at distance $6$ from the center. Find its length.`,
    s: String.raw`Half the chord, the center-to-chord distance, and the radius form a right triangle: half-chord $= \sqrt{10^2 - 6^2} = \sqrt{64} = 8$. The chord has length $16$.`
  }
],

"inscribed-angle-theorem": [
  {
    q: String.raw`Points $A$ and $B$ on a circle cut off an arc of $100^\circ$. What angle does $AB$ subtend at a point $C$ on the major arc? What if $AC$ is a diameter?`,
    s: String.raw`An inscribed angle is half its intercepted arc: $\angle ACB = \frac{100^\circ}{2} = 50^\circ$, the same for every position of $C$ on the major arc. If $AC$ is a diameter, then $\angle ABC$ intercepts a semicircle ($180^\circ$), so $\angle ABC = 90^\circ$ — Thales' theorem.`
  }
],

"angle-chord-secant": [
  {
    q: String.raw`Two secants from an external point cut off arcs of $130^\circ$ (far) and $30^\circ$ (near) between them. Find the angle at the external point.`,
    s: String.raw`For a vertex outside the circle, the angle is half the difference of the intercepted arcs: $\frac{130^\circ - 30^\circ}{2} = 50^\circ$.`
  }
],

"tangent-facts": [
  {
    q: String.raw`A point $P$ is $17$ units from the center of a circle of radius $15$. Find the length of a tangent segment from $P$ to the circle.`,
    s: String.raw`The radius to the tangency point is perpendicular to the tangent, forming a right triangle with hypotenuse $OP = 17$ and leg $15$. The tangent length is $\sqrt{17^2 - 15^2} = \sqrt{64} = 8$ — an $(8, 15, 17)$ triple.`
  }
],

"common-tangent-lengths": [
  {
    q: String.raw`Two circles have radii $3$ and $5$, and their centers are $10$ apart. Find the lengths of the common internal and external tangents.`,
    s: String.raw`Internal: $\sqrt{d^2 - (r_1 + r_2)^2} = \sqrt{100 - 64} = 6$. External: $\sqrt{d^2 - (r_1 - r_2)^2} = \sqrt{100 - 4} = \sqrt{96} = 4\sqrt{6}$. Internal tangents are always shorter — they must "cross between" the circles.`
  }
],

"caseys-theorem": [
  {
    q: String.raw`Show that Casey's theorem contains Ptolemy's theorem as a special case.`,
    s: String.raw`Let all four circles shrink to points (radius $0$) on the host circle. The "external tangent length" between two point-circles is simply the distance between the points, so $t_{ij} = P_iP_j$. Casey's relation $t_{12}t_{34} + t_{14}t_{23} = t_{13}t_{24}$ becomes $P_1P_2 \cdot P_3P_4 + P_1P_4 \cdot P_2P_3 = P_1P_3 \cdot P_2P_4$ — exactly Ptolemy for the cyclic quadrilateral $P_1P_2P_3P_4$.`
  }
],

"butterfly-theorem": [
  {
    q: String.raw`$M$ is the midpoint of a chord $PQ$ of length $12$. Chords $AB$ and $CD$ pass through $M$, and lines $AD$, $BC$ meet $PQ$ at $X$ and $Y$. If $MX = 2.5$, find $XY$.`,
    s: String.raw`The Butterfly Theorem says $M$ is the midpoint of $XY$, so $MY = MX = 2.5$ and $XY = 5$. (The chord length $12$ is a red herring — only the midpoint property matters, as long as $X, Y$ land inside the chord.)`
  }
],

"cyclic-opposite-angles": [
  {
    q: String.raw`In cyclic quadrilateral $ABCD$, $\angle A = 3x$ and $\angle C = x + 40^\circ$. Find $\angle A$.`,
    s: String.raw`Opposite angles of a cyclic quadrilateral are supplementary: $3x + x + 40^\circ = 180^\circ$, so $4x = 140^\circ$ and $x = 35^\circ$. Thus $\angle A = 105^\circ$ (and $\angle C = 75^\circ$; they indeed sum to $180^\circ$).`
  }
],

"ptolemys-theorem": [
  {
    q: String.raw`An isosceles trapezoid has parallel sides $6$ and $12$ and legs of length $5$. Find the length of its diagonals.`,
    s: String.raw`Every isosceles trapezoid is cyclic, and its two diagonals are equal — call the length $d$. Ptolemy on $ABCD$ (sides in order $6, 5, 12, 5$): $d \cdot d = 5 \cdot 5 + 6 \cdot 12$, so $d^2 = 25 + 72 = 97$ and $d = \sqrt{97}$. Coordinate check: height $= \sqrt{25 - 9} = 4$, diagonal $= \sqrt{9^2 + 4^2} = \sqrt{97}$. ✓`
  }
],

"ptolemys-inequality": [
  {
    q: String.raw`Let $P$ be any point in the plane of equilateral $\triangle ABC$. Prove $PA \le PB + PC$.`,
    s: String.raw`Apply Ptolemy's inequality to the four points $A, B, P, C$ (in that order): $AB \cdot PC + BP \cdot CA \ge AP \cdot BC$. Since $AB = BC = CA$, dividing by the common side gives $PC + PB \ge PA$. Equality holds exactly when $ABPC$ is cyclic in that order — i.e. $P$ on arc $BC$ of the circumcircle, recovering the Ptolemy-on-equilateral identity.`
  }
],

"bretschneiders-formula": [
  {
    q: String.raw`A convex quadrilateral has sides $3$, $4$, $5$, $6$ (in order) and its two opposite angles $A$ and $C$ sum to $120^\circ$. Find its area.`,
    s: String.raw`Here $s = 9$, so $(s-a)(s-b)(s-c)(s-d) = 6 \cdot 5 \cdot 4 \cdot 3 = 360$, and $abcd\cos^2\left(\frac{120^\circ}{2}\right) = 360 \cdot \cos^2 60^\circ = 360 \cdot \frac{1}{4} = 90$. Bretschneider: $A = \sqrt{360 - 90} = \sqrt{270} = 3\sqrt{30}$. (Were it cyclic, the area would be the larger $\sqrt{360}$.)`
  }
],

"distance-midpoint": [
  {
    q: String.raw`Find the point dividing the segment from $(1, 2)$ to $(7, 11)$ in the ratio $2 : 1$.`,
    s: String.raw`The section formula with $k = 2$ gives $\left(\frac{1 + 2 \cdot 7}{3}, \frac{2 + 2 \cdot 11}{3}\right) = (5, 8)$. Sanity check: $(5,8)$ is twice as far from $(1,2)$ as from $(7,11)$ — differences $(4,6)$ vs. $(2,3)$. ✓`
  }
],

"shoelace-formula": [
  {
    q: String.raw`Find the area of the quadrilateral with vertices $(0,0)$, $(5,0)$, $(6,4)$, $(1,3)$ in order.`,
    s: String.raw`Shoelace terms $x_iy_{i+1} - y_ix_{i+1}$: $(0 \cdot 0 - 0 \cdot 5) = 0$; $(5 \cdot 4 - 0 \cdot 6) = 20$; $(6 \cdot 3 - 4 \cdot 1) = 14$; $(1 \cdot 0 - 3 \cdot 0) = 0$. Sum $= 34$, so the area is $\frac{34}{2} = 17$.`
  }
],

"point-line-distance": [
  {
    q: String.raw`Find the distance between the parallel lines $3x + 4y = 10$ and $3x + 4y = 25$.`,
    s: String.raw`Pick any point on the first line, say $(2, 1)$. Its distance to $3x + 4y - 25 = 0$ is $\frac{|3 \cdot 2 + 4 \cdot 1 - 25|}{\sqrt{3^2 + 4^2}} = \frac{15}{5} = 3$. In general parallel lines $Ax + By = C_1, C_2$ are $\frac{|C_1 - C_2|}{\sqrt{A^2+B^2}}$ apart.`
  }
],

"prism-pyramid-volumes": [
  {
    q: String.raw`A pyramid has a square base of side $6$ and height $10$. Find its volume.`,
    s: String.raw`$V = \frac{1}{3}Bh = \frac{1}{3} \cdot 36 \cdot 10 = 120$. The matching prism (same base and height) would hold $360$ — pointed solids are always exactly a third.`
  }
],

"sphere-formulas": [
  {
    q: String.raw`A cylinder is circumscribed about a sphere of radius $5$ (the sphere touches the curved wall and both bases). Find the ratio of the sphere's volume to the cylinder's, and of their surface areas.`,
    s: String.raw`The cylinder has radius $5$ and height $10$. Volumes: sphere $\tfrac43\pi(125)=\tfrac{500\pi}{3}$, cylinder $\pi(25)(10)=250\pi$, ratio $\tfrac23$. Surface areas: sphere $4\pi(25)=100\pi$, cylinder $2\pi(25)+2\pi(5)(10)=150\pi$, ratio $\tfrac23$. Both ratios are exactly $\tfrac23$ — Archimedes' theorem.`
  }
],

"equilateral-triangle-facts": [
  {
    q: String.raw`An equilateral triangle is inscribed in a circle of radius $4$. Find its side length and area.`,
    s: String.raw`From $R = \frac{s\sqrt3}{3}$: $s = R\sqrt{3} = 4\sqrt{3}$. Area: $\frac{s^2\sqrt3}{4} = \frac{48\sqrt3}{4} = 12\sqrt{3}$. (The inradius would be $\frac{R}{2} = 2$, since $R = 2r$.)`
  }
],

"regular-hexagon-area": [
  {
    q: String.raw`A regular hexagon has area $54\sqrt{3}$. Find its side length and its longest diagonal.`,
    s: String.raw`From $\frac{3s^2\sqrt3}{2} = 54\sqrt3$: $s^2 = 36$, so $s = 6$. The long diagonal spans two side lengths through the center: $2s = 12$.`
  }
],

"reflect-across-the-line": [
  {
    q: String.raw`$A = (0, 4)$ and $B = (10, 2)$. Point $P$ moves along the $x$-axis. Find the minimum of $AP + PB$.`,
    s: String.raw`Reflect $A$ across the $x$-axis to $A' = (0, -4)$. For any $P$ on the axis, $AP = A'P$, so $AP + PB = A'P + PB \ge A'B = \sqrt{10^2 + 6^2} = \sqrt{136} = 2\sqrt{34}$. The minimum is achieved where segment $A'B$ crosses the axis (at $x = \frac{20}{3}$), and equals $2\sqrt{34}$.`
  }
],

"spiral-similarity": [
  {
    q: String.raw`A spiral similarity centered at the origin sends $1$ to $2i$ (as complex numbers). Where does it send $1 + i$?`,
    s: String.raw`The map is $z \mapsto \frac{2i}{1} \cdot z = 2iz$ — a rotation by $90^\circ$ (the argument of $2i$) combined with scaling by $2$ (its modulus). So $1 + i \mapsto 2i(1 + i) = 2i + 2i^2 = -2 + 2i$.`
  }
],

});
